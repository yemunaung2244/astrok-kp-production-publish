import { authClient, apiOrigin, publishableKey } from './auth.js';

let entitlement = null;
if (typeof sessionStorage !== 'undefined') sessionStorage.removeItem('astrok.kp.web.key.v1');

export function hasKPAccess(value = entitlement, now = Date.now()) {
  if (!value?.active) return false;
  if (value.lifetime) return true;
  const expiry = Date.parse(value.expiresAt);
  return Number.isFinite(expiry) && expiry > now;
}

export function clearKPAccess() { entitlement = null; }
export function currentKPPlan() { return hasKPAccess() ? entitlement.plan || 'standard' : 'free'; }

export function kpPlanFromKey(rawCode) {
  const match = /^ASTROK-(STANDARD|PREMIUM)-KP-(MONTH|YEAR|LIFETIME)-[A-Z2-9]{16}$/i.exec(String(rawCode || '').trim());
  return match ? { plan: match[1].toLowerCase(), system: 'kp', term: match[2].toLowerCase() } : null;
}

export function kpPlanAccess(wallet, now = Date.now()) {
  const active = (wallet?.planEntitlements || []).filter(item =>
    (item.plan === 'premium' || (item.plan === 'standard' && item.system === 'kp')))
    .map(item => ({ active: true, plan: item.plan, lifetime: item.lifetime === true, expiresAt: item.expiresAt }))
    .filter(item => hasKPAccess(item, now));
  if (wallet?.bankVault && (wallet.bankVaultLifetime || Date.parse(wallet.bankVaultExpiresAt) > now))
    active.push({ active: true, plan: 'premium', lifetime: wallet.bankVaultLifetime === true, expiresAt: wallet.bankVaultExpiresAt });
  if (wallet?.kpSubscriptionLifetime || (wallet?.kpSubscriptionActive && Date.parse(wallet.kpSubscriptionExpiresAt) > now))
    active.push({ active: true, plan: 'standard', lifetime: wallet.kpSubscriptionLifetime === true, expiresAt: wallet.kpSubscriptionExpiresAt });
  return active.sort((a, b) => Number(b.plan === 'premium') - Number(a.plan === 'premium')
    || Number(b.lifetime) - Number(a.lifetime)
    || (Date.parse(b.expiresAt) || 0) - (Date.parse(a.expiresAt) || 0))[0] || null;
}

export function kpProductLicenseAccess(rows, now = Date.now()) {
  const active = (Array.isArray(rows) ? rows : []).find(row => row.product === 'kp'
    && (row.expiry_date === '9999-12-31' || Date.parse(`${row.expiry_date}T23:59:59Z`) > now));
  return active ? { active: true, plan: 'standard', lifetime: active.expiry_date === '9999-12-31',
    expiresAt: active.expiry_date === '9999-12-31' ? null : `${active.expiry_date}T23:59:59Z` } : null;
}

async function currentToken() {
  const { data: { session } } = await authClient.auth.getSession();
  if (!session?.access_token) throw new Error('LOGIN_REQUIRED');
  return session.access_token;
}

async function kpRpc(name, args = {}) {
  const token = await currentToken();
  const response = await fetch(`${apiOrigin}/rest/v1/rpc/${name}`, {
    method: 'POST',
    headers: { apikey: publishableKey, Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(args),
  });
  if (!response.ok) throw new Error('VERIFY_FAILED');
  return response.json();
}

async function kpFunction(name, args = {}) {
  const token = await currentToken();
  const response = await fetch(`${apiOrigin}/functions/v1/${name}`, {
    method: 'POST',
    headers: { apikey: publishableKey, Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(args),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || 'VERIFY_FAILED');
  return result;
}

export async function verifyKPKey(rawCode) {
  const code = String(rawCode || '').trim().toUpperCase();
  if (!code) throw new Error('INVALID_CODE');
  const plan = kpPlanFromKey(code);
  if (code.startsWith('ASTROK-') && !plan) throw new Error('INVALID_PLAN_SELECTION');
  if (plan) {
    const wallet = await kpFunction('redeem-plan-key', { code, ...plan });
    const access = kpPlanAccess(wallet);
    if (!access) throw new Error('INVALID_OR_EXPIRED_KEY');
    entitlement = access;
    return true;
  }
  throw new Error('INVALID_PLAN_SELECTION');
}

export async function restoreKPAccess() {
  try {
    const { data: { session: startingSession } } = await authClient.auth.getSession();
    if (!startingSession?.user) { entitlement = null; return false; }
    const [planResult, legacyResult, productResult] = await Promise.allSettled([
      kpRpc('ensure_wallet'), kpRpc('get_my_kp_web_access'),
      authClient.from('product_license_entitlements').select('product,expiry_date')
        .eq('user_id', startingSession.user.id).eq('product', 'kp').then(({ data, error }) => {
          if (error) throw error;
          return data;
        }),
    ]);
    const { data: { session: currentSession } } = await authClient.auth.getSession();
    if (currentSession?.user?.id !== startingSession.user.id) { entitlement = null; return false; }
    const plan = planResult.status === 'fulfilled' ? kpPlanAccess(planResult.value) : null;
    const legacy = legacyResult.status === 'fulfilled' && hasKPAccess(legacyResult.value)
      ? legacyResult.value : null;
    const product = productResult.status === 'fulfilled' ? kpProductLicenseAccess(productResult.value) : null;
    entitlement = [plan, legacy, product].filter(Boolean).sort((a, b) =>
      Number(b.plan === 'premium') - Number(a.plan === 'premium') || Number(b.lifetime) - Number(a.lifetime))[0] || null;
    return Boolean(entitlement);
  } catch {
    entitlement = null;
    return false;
  }
}
