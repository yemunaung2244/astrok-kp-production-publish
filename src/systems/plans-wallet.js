import { authClient, apiOrigin, publishableKey } from '../auth.js';
import { loadJson, escHtml, toMyDigits } from './script-loader.js';

const plansState = {
  data: null,
  loading: false,
  error: '',
  selectedSystem: 'kp',
  dialogPlan: null, // { system, plan }
  buyingIndex: null,
  feedback: '',
  feedbackOk: false
};

function fmtPrice(price, english) {
  const formatted = Number(price || 0).toLocaleString('en-US');
  return english ? `MMK ${formatted}` : `${toMyDigits(formatted)} ကျပ်`;
}

function isPlanActive(wallet, systemId, level) {
  if (!wallet) return level === 'Free';
  const now = Date.now();
  const hasVault = Boolean(wallet.bankVault && (wallet.bankVaultLifetime || (wallet.bankVaultExpiresAt && Date.parse(wallet.bankVaultExpiresAt) > now)));
  const entitlements = wallet.planEntitlements || [];
  const hasSystemPremium = hasVault || entitlements.some(e =>
    e.plan === 'premium' && (e.system === systemId || e.system === 'all') &&
    (e.lifetime === true || (e.expiresAt && Date.parse(e.expiresAt) > now))
  );
  const hasKPStandard = Boolean(wallet.kpSubscriptionLifetime ||
    (wallet.kpSubscriptionActive && wallet.kpSubscriptionExpiresAt && Date.parse(wallet.kpSubscriptionExpiresAt) > now) ||
    entitlements.some(e => e.system === 'kp' && e.plan === 'standard' && (e.lifetime === true || (e.expiresAt && Date.parse(e.expiresAt) > now))));

  if (level === 'Premium') return hasSystemPremium;
  if (level === 'Standard') return hasKPStandard;
  return systemId === 'kp' ? (!hasSystemPremium && !hasKPStandard) : !hasSystemPremium;
}

export function renderMultiSystemPlans(english, wallet, base = './') {
  const t = (mm, en) => (english ? en : mm);
  const systems = plansState.data?.systems || [];
  const activeSys = systems.find(s => s.id === plansState.selectedSystem) || systems[0];
  const telegram = plansState.data?.telegram || 'https://t.me/htoomyatastro2635';
  const kyat = wallet?.kyatBalance ?? 0;
  const hasVault = Boolean(wallet?.bankVault && (wallet?.bankVaultLifetime || (wallet?.bankVaultExpiresAt && Date.parse(wallet.bankVaultExpiresAt) > Date.now())));

  const heroHtml = `
    <section class="ios-topup-hero" style="background-image: linear-gradient(90deg, rgba(0,0,0,0.42), rgba(0,0,0,0.08)), url('${escHtml(base)}ios-assets/KyatTopUpHero.png')">
      <span class="ios-topup-kicker">${t('လက်ကျန် ကျပ်', 'AVAILABLE KYAT')}</span>
      <strong>${hasVault ? 'Premium' : escHtml(Number(kyat).toLocaleString('en-US') + (english ? ' Kyat' : ' ကျပ်'))}</strong>
      <small>${t('ကျပ်မကုန်ခင် · ကျပ်ဝန်ဆောင်မှု အသုံးပြုပါ', 'Kyat balance · use premium services')}</small>
    </section>

    <div class="ios-topup-actions">
      <a class="ios-violet-action-btn" href="${escHtml(telegram)}" target="_blank" rel="noopener noreferrer">
        <span>💳 ${t('Telegram ဖြင့် ငွေဖြည့်ရန်', 'Top Up via Telegram')}</span>
        <span>›</span>
      </a>
      <button type="button" class="ios-soft-action-btn" data-entry-tab="key">
        <span>🔑 ${t('Plan Key ဖြည့်သွင်းရန်', 'Activate Plan Key')}</span>
        <span>›</span>
      </button>
    </div>
  `;

  if (plansState.loading) {
    return `${heroHtml}<div class="chart-pending">${t('Plan စာရင်း ဖတ်နေပါသည်…', 'Loading plans…')}</div>`;
  }
  if (!activeSys) return heroHtml;

  const visiblePlans = activeSys.id === 'kp'
    ? (activeSys.plans || []).filter(p => p.level !== 'Free')
    : (activeSys.plans || []);

  return `
    ${heroHtml}
    <nav class="ios-plan-sys-tabs" aria-label="${t('စနစ်များ', 'Systems')}">
      ${systems.map(sys => `
        <button type="button" data-plan-sys="${escHtml(sys.id)}" class="${activeSys.id === sys.id ? 'selected' : ''}">
          ${escHtml(english ? sys.titleEn : sys.titleMm)}
        </button>
      `).join('')}
    </nav>

    <h2 class="ios-plans-heading">${escHtml((english ? activeSys.titleEn : activeSys.titleMm) + ' Plans')}</h2>

    <div class="ak-section-stack">
      ${visiblePlans.map(plan => {
        const current = isPlanActive(wallet, activeSys.id, plan.level);
        const inc = (english ? plan.included?.en : plan.included?.mm) || [];
        const lck = (english ? plan.locked?.en : plan.locked?.mm) || [];
        const isFree = plan.level === 'Free';
        return `
          <section class="ios-plan-card ${current ? 'active' : ''}">
            <div class="ios-plan-card-head">
              <h3>${escHtml(plan.level)}</h3>
              ${current ? `<span class="ios-current-badge">✓ ${t('လက်ရှိအသုံးပြုနေသော Plan', 'Current plan')}</span>` : ''}
            </div>
            <ul class="ios-plan-features">
              ${inc.map(item => `<li class="inc"><span>✓</span>${escHtml(item)}</li>`).join('')}
              ${lck.length ? '<li class="div"></li>' : ''}
              ${lck.map(item => `<li class="lck"><span>×</span>${escHtml(item)}</li>`).join('')}
            </ul>
            ${isFree ? `
              <button type="button" class="ios-plan-buy-btn" data-open-system="${activeSys.id === 'trisakka' ? 'trisakka' : 'entry'}">${t('၀ ကျပ် / တစ်လ', '0 Kyat / month')}</button>
            ` : `
              <button type="button" class="ios-plan-buy-btn" data-open-price-dialog="${escHtml(activeSys.id)}:${escHtml(plan.level)}">${t('ဝယ်ယူမည်', 'Buy Now')}</button>
            `}
          </section>
        `;
      }).join('')}
    </div>

    ${plansState.dialogPlan ? renderPlanPriceModal(plansState.dialogPlan, english) : ''}
  `;
}

function renderPlanPriceModal({ system, plan }, english) {
  const t = (mm, en) => (english ? en : mm);
  const terms = english ? ['1 month', '1 year', 'Lifetime'] : ['၁ လ', '၁ နှစ်', 'တစ်သက်တာ'];
  const prices = plan.prices || [];
  const oldPrices = plan.oldPrices || [];
  return `
    <div class="ios-modal-backdrop" id="plan-price-backdrop">
      <section class="ios-modal-sheet" role="dialog" aria-modal="true">
        <header class="ios-modal-head">
          <strong>${escHtml((english ? system.titleEn : system.titleMm) + ' · ' + plan.level)}</strong>
          <button type="button" id="plan-price-close" aria-label="Close">×</button>
        </header>
        <div class="ios-price-list">
          ${prices.map((pr, idx) => `
            <div class="ios-price-row">
              <div>
                <strong>${escHtml(terms[idx] || '')}</strong>
                ${oldPrices[idx] && oldPrices[idx] > pr ? `<del>${escHtml(fmtPrice(oldPrices[idx], english))}</del>` : ''}
                <b>${escHtml(fmtPrice(pr, english))}</b>
              </div>
              <button type="button" class="ios-price-buy-btn" data-confirm-buy="${idx}" ${plansState.buyingIndex !== null ? 'disabled' : ''}>
                ${plansState.buyingIndex === idx ? t('လုပ်ဆောင်နေ…', 'Buying…') : t('ဝယ်ယူမည်', 'Buy Now')}
              </button>
            </div>
          `).join('')}
        </div>
        ${plansState.feedback ? `<p class="ios-notice-banner ${plansState.feedbackOk ? 'info' : 'error'}">${escHtml(plansState.feedback)}</p>` : ''}
      </section>
    </div>
  `;
}

export function bindMultiSystemPlans(rerender, onRefreshWallet) {
  if (!plansState.data && !plansState.loading) {
    plansState.loading = true;
    rerender();
    loadJson('data/subscription_plans.json')
      .then(data => { plansState.data = data; })
      .catch(err => { plansState.error = err?.message || ''; })
      .finally(() => { plansState.loading = false; rerender(); });
  }

  document.querySelectorAll('[data-plan-sys]').forEach(btn => {
    btn.addEventListener('click', () => {
      plansState.selectedSystem = btn.dataset.planSys;
      rerender();
    });
  });

  document.querySelectorAll('[data-open-price-dialog]').forEach(btn => {
    btn.addEventListener('click', () => {
      const [sysId, level] = btn.dataset.openPriceDialog.split(':');
      const system = (plansState.data?.systems || []).find(s => s.id === sysId);
      const plan = system?.plans?.find(p => p.level === level);
      if (system && plan) {
        plansState.dialogPlan = { system, plan };
        plansState.feedback = '';
        plansState.feedbackOk = false;
        rerender();
      }
    });
  });

  document.querySelector('#plan-price-close')?.addEventListener('click', () => {
    plansState.dialogPlan = null;
    rerender();
  });
  document.querySelector('#plan-price-backdrop')?.addEventListener('click', e => {
    if (e.target.id === 'plan-price-backdrop') {
      plansState.dialogPlan = null;
      rerender();
    }
  });

  document.querySelectorAll('[data-confirm-buy]').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!plansState.dialogPlan || plansState.buyingIndex !== null) return;
      const idx = Number(btn.dataset.confirmBuy);
      const termIDs = ['month', 'year', 'lifetime'];
      const { system, plan } = plansState.dialogPlan;
      const price = plan.prices[idx];

      const { data: { session } } = await authClient.auth.getSession();
      if (!session?.access_token) {
        plansState.feedback = 'Plan ဝယ်ယူရန် Account အရင်ဝင်ပါ။';
        plansState.feedbackOk = false;
        rerender();
        return;
      }

      plansState.buyingIndex = idx;
      plansState.feedback = '';
      rerender();
      try {
        const res = await fetch(`${apiOrigin}/rest/v1/rpc/purchase_plan_with_kyat`, {
          method: 'POST',
          headers: {
            apikey: publishableKey,
            Authorization: `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            p_system: system.id,
            p_plan: plan.level.toLowerCase(),
            p_term: termIDs[idx],
            p_expected_price: price
          })
        });
        const body = await res.json().catch(() => ({}));
        const status = typeof body === 'string' ? body : (body?.status || (res.ok ? 'OK' : body?.message || 'ERROR'));
        if (res.ok && (status === 'OK' || body?.kyatBalance !== undefined)) {
          plansState.feedback = 'Plan ဝယ်ယူပြီးပါပြီ။ အသုံးပြုခွင့် ရရှိပါပြီ။';
          plansState.feedbackOk = true;
          if (onRefreshWallet) await onRefreshWallet();
        } else if (String(status).includes('INSUFFICIENT')) {
          plansState.feedback = 'ကျပ်လက်ကျန် မလုံလောက်ပါ။ Telegram မှ ငွေဖြည့်ပြီး ထပ်စမ်းပါ။';
          plansState.feedbackOk = false;
        } else {
          plansState.feedback = 'ဝယ်ယူမှုကို အတည်မပြုနိုင်သေးပါ။ ကျပ်လက်ကျန်စစ်ပြီး ထပ်စမ်းပါ။';
          plansState.feedbackOk = false;
        }
      } catch {
        plansState.feedback = 'အင်တာနက်ချိတ်ဆက်မှု မအောင်မြင်ပါ။ ထပ်စမ်းပါ။';
        plansState.feedbackOk = false;
      } finally {
        plansState.buyingIndex = null;
        rerender();
      }
    });
  });
}
