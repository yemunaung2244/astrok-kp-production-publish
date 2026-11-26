import { authClient, apiOrigin, publishableKey } from '../auth.js';
import { loadJson, escHtml, toMyDigits } from './script-loader.js';
import { createTelegramTopUpUrl, createTelegramTrialUrl, fetchMobileTrialStatus } from './telegram.js';

const DEVICE_TRIAL_KEY = 'astrok_device_trial_claimed_v1';

function isDeviceTrialClaimed() {
  try {
    return localStorage.getItem(DEVICE_TRIAL_KEY) === '1';
  } catch {
    return false;
  }
}

function markDeviceTrialClaimed() {
  try {
    localStorage.setItem(DEVICE_TRIAL_KEY, '1');
  } catch {}
}

const plansState = {
  data: null,
  loading: false,
  error: '',
  selectedSystem: 'kp',
  dialogPlan: null,
  buyingIndex: null,
  feedback: '',
  feedbackOk: false,
  topUpOpen: false,
  topUpAmount: '',
  topUpBusy: false,
  topUpError: '',
  trialBusy: false,
  trialMsg: '',
  trialOk: false,
  trialCheckedUserId: '',
  trialAwaitingReturn: false
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

export function hasSystemPremiumAccess(wallet, systemId) {
  return isPlanActive(wallet, systemId, 'Premium');
}

export function renderMultiSystemPlans(english, wallet, { hideTopActions = false } = {}) {
  const t = (mm, en) => (english ? en : mm);
  const systems = plansState.data?.systems || [];
  const activeSys = systems.find(s => s.id === plansState.selectedSystem) || systems[0];

  const topActions = hideTopActions ? '' : `
    <div class="ios-topup-actions">
      <button type="button" data-open-tg-topup class="ios-violet-action-btn" style="border:none;cursor:pointer;width:100%">
        <span>💳 ${t('ငွေဖြည့်ရန်', 'Top Up')}</span>
        <span>›</span>
      </button>
      <button type="button" id="claim-trial-btn" class="ios-soft-action-btn" ${plansState.trialBusy ? 'disabled' : ''}>
        <span>🎁 ${plansState.trialBusy ? t('Telegram Bot သို့ ချိတ်ဆက်နေပါသည်…', 'Opening Telegram Bot…') : t('၁ နာရီအစမ်းသုံးရယူရန်', 'Claim 1-Hour Trial')}</span>
        <span>›</span>
      </button>
      ${plansState.trialMsg ? `<p class="ios-notice-banner ${plansState.trialOk ? 'info' : 'error'}">${escHtml(plansState.trialMsg)}</p>` : ''}
    </div>
  `;

  if (plansState.loading) {
    return `${topActions}<div class="chart-pending">${t('Plan စာရင်း ဖတ်နေပါသည်…', 'Loading plans…')}</div>`;
  }
  if (!activeSys) return topActions;

  const visiblePlans = activeSys.id === 'kp'
    ? (activeSys.plans || []).filter(p => p.level !== 'Free')
    : (activeSys.plans || []);

  return `
    ${topActions}
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

    ${plansState.topUpOpen ? renderTopUpModal(english) : ''}
    ${plansState.dialogPlan ? renderPlanPriceModal(plansState.dialogPlan, english) : ''}
  `;
}

export function renderSystemPlansOnly(systemId, english, wallet) {
  const t = (mm, en) => (english ? en : mm);
  if (plansState.loading) {
    return `<div class="chart-pending">${t('Plan စာရင်း ဖတ်နေပါသည်…', 'Loading plans…')}</div>`;
  }
  const systems = plansState.data?.systems || [];
  const activeSys = systems.find(s => s.id === systemId);
  if (!activeSys) return '';
  const visiblePlans = activeSys.id === 'kp'
    ? (activeSys.plans || []).filter(p => p.level !== 'Free')
    : (activeSys.plans || []);

  return `
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
              <button type="button" class="ios-plan-buy-btn" disabled>${t('၀ ကျပ် / တစ်လ', '0 Kyat / month')}</button>
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

export function renderKyatTopUpScreen(appHeader, english, wallet, base) {
  const t = (mm, en) => (english ? en : mm);
  const kyat = wallet?.kyatBalance ?? 0;
  const now = Date.now();
  const hasVault = Boolean(wallet?.bankVault && (wallet?.bankVaultLifetime || (wallet?.bankVaultExpiresAt && Date.parse(wallet.bankVaultExpiresAt) > now)));
  const hasKP = Boolean(wallet?.kpSubscriptionLifetime || (wallet?.kpSubscriptionActive && wallet?.kpSubscriptionExpiresAt && Date.parse(wallet.kpSubscriptionExpiresAt) > now));
  const kpLabel = wallet?.kpSubscriptionLifetime
    ? t('Standard · KP တစ်သက်တာ', 'Standard · KP Lifetime')
    : t('Standard · KP အသုံးပြုနေသည်', 'Standard · KP active');

  return `
    ${appHeader(t('ငွေဖြည့်ရန်', 'Top Up'), true)}
    <main class="ak-sys-main">
      <section class="ios-wallet-hero" style="background-image:linear-gradient(90deg,rgba(0,0,0,0.42),rgba(0,0,0,0.08)),url('${escHtml(base)}ios-assets/KyatTopUpHero.png');background-size:cover;background-position:center;border-radius:24px;padding:26px 22px;color:#fff;margin-bottom:14px">
        <div style="font-size:13px;font-weight:600;opacity:0.9">${t('လက်ကျန် ကျပ်', 'AVAILABLE KYAT')}</div>
        <div style="font-size:34px;font-weight:800;margin:8px 0">${hasVault ? 'Premium' : escHtml(fmtPrice(kyat, english))}</div>
        ${!hasVault && hasKP ? `<div style="font-size:13px;font-weight:600;margin-bottom:6px">✦ ${escHtml(kpLabel)}</div>` : ''}
        <div style="font-size:12.5px;opacity:0.86">${t('ကျပ်မကုန်ခင် · ကျပ်ဝန်ဆောင်မှု အသုံးပြုပါ', 'Kyat balance · use premium services')}</div>
      </section>

      <div class="ios-topup-actions" style="margin-bottom:16px">
        <button type="button" data-open-tg-topup class="ios-violet-action-btn" style="border:none;cursor:pointer;width:100%">
          <span>✈ ${t('Telegram ဖြင့် ငွေဖြည့်ရန်', 'Top up with Telegram')}</span>
          <span>›</span>
        </button>
      </div>

      ${renderMultiSystemPlans(english, wallet, { hideTopActions: true })}

      <h2 class="ios-plans-heading" style="margin-top:20px">${t('အခြားဝန်ဆောင်မှုများ', 'Other services')}</h2>
      <div class="ak-section-stack">
        <button type="button" id="wallet-reward-btn" class="ak-card" style="display:flex;align-items:center;gap:14px;width:100%;text-align:left;cursor:pointer">
          <span style="width:48px;height:48px;border-radius:14px;background:var(--ak-primary-soft);color:var(--ak-primary);display:grid;place-items:center;font-size:20px;flex-shrink:0">▶</span>
          <span style="flex:1">
            <strong style="display:block;font-size:16px;color:var(--ak-ink)">${t('ကျပ်ရယူရန်', 'Earn Kyat')}</strong>
            <small style="color:var(--ak-secondary-ink)">${t('Reward Video ကြည့်ပြီး ကျပ်ရယူပါ', 'Watch a reward video to earn Kyat')}</small>
          </span>
          <span style="color:var(--ak-secondary-ink);font-size:20px">›</span>
        </button>

        <button type="button" id="wallet-reset-btn" class="ak-card" style="display:flex;align-items:center;gap:14px;width:100%;text-align:left;cursor:pointer;border:1px solid rgba(220,38,38,0.55)">
          <span style="width:48px;height:48px;border-radius:14px;border:1px solid rgba(220,38,38,0.55);color:#dc2626;display:grid;place-items:center;font-size:20px;flex-shrink:0">🗑</span>
          <span style="flex:1">
            <strong style="display:block;font-size:16px;color:#dc2626">${t('ကျပ်လက်ကျန်ဖျက်မည်', 'Clear Kyat wallet')}</strong>
            <small style="color:var(--ak-secondary-ink)">${t('ကျပ်လက်ကျန်အားလုံးကို 0 ပြန်ထားမည်', 'Set the entire Kyat balance to zero')}</small>
          </span>
          <span style="color:#dc2626;font-size:20px">›</span>
        </button>
      </div>
    </main>
  `;
}

export function bindKyatTopUpScreen(rerender, onRefreshWallet, english = false) {
  bindMultiSystemPlans(rerender, onRefreshWallet);

  document.querySelector('#wallet-reward-btn')?.addEventListener('click', () => {
    window.alert(english
      ? 'Reward video support is being prepared. Kyat will only be credited after a verified video completion.'
      : 'Reward Video စနစ်ကို ပြင်ဆင်နေပါတယ်။ Video အဆုံးထိကြည့်ပြီး အတည်ပြုနိုင်မှသာ ကျပ်ထည့်ပေးပါမယ်။');
  });

  document.querySelector('#wallet-reset-btn')?.addEventListener('click', async () => {
    const first = window.confirm(english
      ? 'Clear the Kyat wallet? This permanently sets the Kyat balance to zero and cannot be undone.'
      : 'ကျပ်လက်ကျန်အားလုံးကို 0 ပြန်ထားပါမည်။ ပြန်လည်ရယူ၍မရပါ။ ဆက်လုပ်မည်လား။');
    if (!first) return;
    const second = window.confirm(english
      ? 'Final confirmation: permanently clear this account’s Kyat balance?'
      : 'နောက်ဆုံးအတည်ပြုချက် — ဤ Account ရှိ ကျပ်လက်ကျန်ကို အပြီးဖျက်လိုမှသာ ဆက်လုပ်ပါ။');
    if (!second) return;
    try {
      const { data: { session } } = await authClient.auth.getSession();
      if (!session?.access_token) {
        window.alert(english ? 'Sign in first.' : 'Account အရင်ဝင်ပေးပါ။');
        return;
      }
      const res = await fetch(`${apiOrigin}/rest/v1/rpc/reset_kyat`, {
        method: 'POST',
        headers: {
          apikey: publishableKey,
          Authorization: `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      });
      if (!res.ok) throw new Error('RESET_FAILED');
      if (onRefreshWallet) await onRefreshWallet();
      window.alert(english ? 'Kyat balance cleared.' : 'ကျပ်လက်ကျန်ကို 0 ပြန်ထားပြီးပါပြီ။');
      rerender();
    } catch {
      window.alert(english ? 'Could not clear Kyat balance.' : 'ကျပ်လက်ကျန် ဖျက်၍မရပါ။ ထပ်စမ်းပေးပါ။');
    }
  });
}

function renderTopUpModal(english) {
  const t = (mm, en) => (english ? en : mm);
  return `
    <div class="ios-modal-backdrop" id="tg-topup-backdrop">
      <section class="ios-modal-sheet" role="dialog" aria-modal="true">
        <header class="ios-modal-head">
          <strong>${t('ငွေပမာဏရိုက်ထည့်ရန်', 'Enter Amount')}</strong>
          <button type="button" id="tg-topup-close" aria-label="Close">×</button>
        </header>
        <form id="tg-topup-form" class="ios-auth-form" style="margin-top:14px">
          <label class="ios-input-box">
            <span>${t('ငွေပမာဏ (ကျပ်)', 'Amount (Kyat)')}</span>
            <input id="tg-topup-amount" name="amount" type="number" min="100" max="10000000" value="${escHtml(plansState.topUpAmount)}" placeholder="10000" required>
          </label>
          <button type="submit" class="ios-primary-rect-btn" ${plansState.topUpBusy ? 'disabled' : ''}>
            ${plansState.topUpBusy ? t('Telegram Bot သို့ ချိတ်ဆက်နေပါသည်…', 'Connecting to Telegram Bot…') : t('ဝယ်ယူမည်', 'Buy Now')}
          </button>
        </form>
        ${plansState.topUpError ? `<p class="ios-notice-banner error" style="margin-top:12px">${escHtml(plansState.topUpError)}</p>` : ''}
      </section>
    </div>
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

  document.querySelectorAll('[data-open-tg-topup]').forEach(btn => {
    btn.addEventListener('click', () => {
      plansState.topUpOpen = true;
      plansState.topUpError = '';
      rerender();
    });
  });
  document.querySelector('#tg-topup-close')?.addEventListener('click', () => { plansState.topUpOpen = false; rerender(); });
  document.querySelector('#tg-topup-backdrop')?.addEventListener('click', e => {
    if (e.target.id === 'tg-topup-backdrop') { plansState.topUpOpen = false; rerender(); }
  });

  document.querySelector('#tg-topup-form')?.addEventListener('submit', async e => {
    e.preventDefault();
    if (plansState.topUpBusy) return;
    const fd = new FormData(e.currentTarget);
    plansState.topUpAmount = String(fd.get('amount') || '');
    plansState.topUpBusy = true;
    plansState.topUpError = '';
    // Open tab synchronously within user gesture to prevent mobile/Safari popup blocking
    const tgWindow = window.open('', '_blank');
    rerender();
    try {
      const url = await createTelegramTopUpUrl(plansState.topUpAmount);
      plansState.topUpOpen = false;
      plansState.topUpBusy = false;
      rerender();
      if (tgWindow && !tgWindow.closed) {
        tgWindow.location.href = url;
      } else {
        window.location.href = url;
      }
    } catch (err) {
      try { tgWindow?.close(); } catch {}
      const msg = String(err?.message || '');
      plansState.topUpError = msg === 'SIGN_IN_REQUIRED'
        ? 'ဝယ်ယူရန် AstroK account ဝင်ထားရပါမည်။'
        : msg === 'INVALID_AMOUNT'
          ? '၁၀၀ မှ ၁၀,၀၀၀,၀၀၀ ကျပ်အတွင်း ထည့်ပေးပါ။'
          : 'ဝယ်ယူမှု ဖွင့်လို့မရပါ။ ထပ်စမ်းပါ။';
      plansState.topUpBusy = false;
      rerender();
    }
  });

  // Sync server trial status into device-level lock so switching accounts on the same phone cannot re-claim.
  authClient.auth.getSession().then(async ({ data: { session } }) => {
    const uid = session?.user?.id || '';
    if (!uid || plansState.trialCheckedUserId === uid) return;
    plansState.trialCheckedUserId = uid;
    try {
      const st = await fetchMobileTrialStatus();
      if (st?.expires_epoch != null) markDeviceTrialClaimed();
    } catch {}
  }).catch(() => {});

  document.querySelector('#claim-trial-btn')?.addEventListener('click', async () => {
    if (plansState.trialBusy) return;
    if (isDeviceTrialClaimed()) {
      plansState.trialOk = false;
      plansState.trialMsg = 'ဤဖုန်းတွင် အစမ်းသုံးခွင့် ရယူပြီးသားဖြစ်ပါသည်။ ဖုန်းတစ်လုံးလျှင် တစ်ကြိမ်သာ ရယူခွင့်ရှိပါသည်။';
      rerender();
      return;
    }
    // Open tab synchronously within user gesture to prevent mobile/Safari popup blocking
    const tgWindow = window.open('', '_blank');
    const { data: { session } } = await authClient.auth.getSession();
    if (!session?.access_token || !session?.user?.id) {
      try { tgWindow?.close(); } catch {}
      plansState.trialOk = false;
      plansState.trialMsg = '၁ နာရီအစမ်းသုံးရယူရန် Account အရင်ဝင်ပါ။';
      rerender();
      return;
    }
    plansState.trialBusy = true;
    plansState.trialMsg = '';
    rerender();
    try {
      const st = await fetchMobileTrialStatus().catch(() => null);
      if (st?.expires_epoch != null) {
        markDeviceTrialClaimed();
        try { tgWindow?.close(); } catch {}
        plansState.trialOk = false;
        plansState.trialMsg = 'ဤဖုန်းတွင် အစမ်းသုံးခွင့် ရယူပြီးသားဖြစ်ပါသည်။ ဖုန်းတစ်လုံးလျှင် တစ်ကြိမ်သာ ရယူခွင့်ရှိပါသည်။';
        return;
      }
      const url = await createTelegramTrialUrl();
      plansState.trialOk = true;
      plansState.trialMsg = 'Telegram Bot တွင် Start နှိပ်၍ ၁ နာရီအစမ်းသုံးခွင့်ကို အတည်ပြုပါ။ ဖုန်းတစ်လုံးလျှင် တစ်ကြိမ်သာ ရယူနိုင်ပါသည်။';
      if (tgWindow && !tgWindow.closed) {
        tgWindow.location.href = url;
      } else {
        window.location.href = url;
      }
      if (!plansState.trialAwaitingReturn) {
        plansState.trialAwaitingReturn = true;
        const checkOnReturn = async () => {
          if (document.visibilityState === 'hidden') return;
          window.removeEventListener('focus', checkOnReturn);
          document.removeEventListener('visibilitychange', checkOnReturn);
          plansState.trialAwaitingReturn = false;
          try {
            const after = await fetchMobileTrialStatus();
            if (after?.expires_epoch != null) {
              markDeviceTrialClaimed();
              if (onRefreshWallet) await onRefreshWallet();
              plansState.trialOk = true;
              plansState.trialMsg = '၁ နာရီအစမ်းသုံးခွင့် ဖွင့်ပြီးပါပြီ။ Premium စနစ်များကို အသုံးပြုနိုင်ပါပြီ။';
              rerender();
            }
          } catch {}
        };
        window.addEventListener('focus', checkOnReturn);
        document.addEventListener('visibilitychange', checkOnReturn);
      }
    } catch {
      try { tgWindow?.close(); } catch {}
      plansState.trialOk = false;
      plansState.trialMsg = 'Telegram Bot နှင့် ချိတ်ဆက်၍မရပါ။ ထပ်စမ်းပေးပါ။';
    } finally {
      plansState.trialBusy = false;
      rerender();
    }
  });

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

  document.querySelector('#plan-price-close')?.addEventListener('click', () => { plansState.dialogPlan = null; rerender(); });
  document.querySelector('#plan-price-backdrop')?.addEventListener('click', e => {
    if (e.target.id === 'plan-price-backdrop') { plansState.dialogPlan = null; rerender(); }
  });

  document.querySelectorAll('[data-confirm-buy]').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!plansState.dialogPlan || plansState.buyingIndex !== null) return;
      const idx = Number(btn.dataset.confirmBuy);
      const termIDs = ['month', 'year', 'lifetime'];
      const { system, plan } = plansState.dialogPlan;
      const price = plan.prices[idx];

      const { data: { session } } = await authClient.auth.getSession();
      if (!session?.access_token || !session?.user?.id) {
        plansState.feedback = 'Plan ဝယ်ယူရန် Account ဝင်ပါ။';
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
            p_expected_user: session.user.id,
            p_system: system.id,
            p_plan: plan.level.toLowerCase(),
            p_term: termIDs[idx],
            p_expected_price: price,
            p_request_id: crypto.randomUUID()
          })
        });
        const body = await res.json().catch(() => ({}));
        const status = typeof body === 'string' ? body : (body?.status || (res.ok ? 'OK' : body?.message || 'ERROR'));
        if (res.ok && (status === 'OK' || body?.wallet)) {
          plansState.feedback = 'Plan ဝယ်ယူပြီးပါပြီ။ အသုံးပြုခွင့် ရရှိပါပြီ။';
          plansState.feedbackOk = true;
          if (onRefreshWallet) await onRefreshWallet();
        } else if (String(status).includes('INSUFFICIENT')) {
          plansState.feedback = 'ကျပ်လက်ကျန် မလုံလောက်ပါ။';
          plansState.feedbackOk = false;
        } else if (String(status).includes('LIFETIME')) {
          plansState.feedback = 'တစ်သက်တာ အသုံးပြုခွင့် ရရှိပြီးသားပါ။';
          plansState.feedbackOk = true;
        } else {
          plansState.feedback = 'ဝယ်ယူမှုကို အတည်မပြုနိုင်သေးပါ။ ထပ်နှိပ်စမ်းပါ။';
          plansState.feedbackOk = false;
        }
      } catch {
        plansState.feedback = 'ဝယ်ယူမှုကို အတည်မပြုနိုင်သေးပါ။ ထပ်နှိပ်စမ်းပါ။';
        plansState.feedbackOk = false;
      } finally {
        plansState.buyingIndex = null;
        rerender();
      }
    });
  });
}
