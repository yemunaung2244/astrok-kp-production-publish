import { authClient, apiOrigin, publishableKey } from '../auth.js';

const BOT_HOST = 'https://t.me/';
const BOT_HANDLE = 'AstroKpro_bot';

export function buildTelegramStartUrl(startParam) {
  return `${BOT_HOST}${BOT_HANDLE}?start=${encodeURIComponent(String(startParam || ''))}`;
}

async function callTelegramRpc(rpcName, body = {}) {
  const { data: { session } } = await authClient.auth.getSession();
  if (!session?.access_token) throw new Error('SIGN_IN_REQUIRED');
  const res = await fetch(`${apiOrigin}/rest/v1/rpc/${rpcName}`, {
    method: 'POST',
    headers: {
      apikey: publishableKey,
      Authorization: `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const payload = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(payload?.message || payload?.error || 'TELEGRAM_RPC_FAILED');
  return payload;
}

export async function createTelegramTopUpUrl(amountKyat) {
  const amount = Math.floor(Number(amountKyat));
  if (!Number.isFinite(amount) || amount < 100 || amount > 10000000) {
    throw new Error('INVALID_AMOUNT');
  }
  const data = await callTelegramRpc('create_telegram_app_checkout', { p_offer: `topup:${amount}` });
  const token = String(data?.token || '').trim().toLowerCase();
  if (!token) throw new Error('INVALID_TOKEN');
  return buildTelegramStartUrl(`checkout_${token}`);
}

export async function createTelegramAccountLinkUrl() {
  const data = await callTelegramRpc('create_telegram_link', {});
  const token = String(data?.token || '').trim().toLowerCase();
  if (!token) throw new Error('INVALID_TOKEN');
  return buildTelegramStartUrl(`link_${token}`);
}

export async function checkCanLinkTelegram() {
  try {
    const allowed = await callTelegramRpc('is_post_admin', {});
    return allowed === true;
  } catch {
    return false;
  }
}

export async function redeemAnyAstroKKey(code) {
  const clean = String(code || '').trim();
  if (!clean) throw new Error('INVALID_CODE');
  return callTelegramRpc('redeem_any_key', { p_code: clean });
}
