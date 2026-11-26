import { authClient, apiOrigin, publishableKey } from '../auth.js';
import { loadJson, escHtml, toMyDigits } from './script-loader.js';
import { createTelegramTopUpUrl, createTelegramAccountLinkUrl, redeemAnyAstroKKey } from './telegram.js';

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
  topUpAmount: '10000',
  topUpBusy: false,
  topUpUrl: '',
  topUpError: '',
  linkBusy: false,
  linkUrl: '',
  linkError: '',
  keyCode: '',
  keyBusy: false,
  keyMsg: '',
  keyOk: false
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
  const kyat = wallet?.kyatBalance ?? 0;
  const hasVault = Boolean(wallet?.bankVault && (wallet?.bankVaultLifetime || (wallet?.bankVaultExpiresAt && Date.parse(wallet.bankVaultExpiresAt) > Date.now())));

  const heroHtml = `
    <section class="ios-topup-hero" style="background-image: linear-gradient(90deg, rgba(0,0,0,0.42), rgba(0,0,0,0.08)), url('${escHtml(base)}ios-assets/KyatTopUpHero.png')">
      <span class="ios-topup-kicker">${t('လက်ကျန် ကျပ်', 'AVAILABLE KYAT')}</span>
      <strong>${hasVault ? 'Premium' : escHtml(Number(kyat).toLocaleString('en-US') + (english ? ' Kyat' : ' ကျပ်'))}</strong>
      <small>${t('ကျပ်မကုန်ခင် · ကျပ်ဝန်ဆောင်မှု အသုံးပြုပါ', 'Kyat balance · use premium services')}</small>
    </section>

    <div class="ios-topup-actions">
      <button type="button" id="open-tg-topup" class="ios-violet-action-btn" style="border:none;cursor:pointer;width:100%">
        <span>💳 ${t('Telegram Bot ဖြင့် ငွေဖြည့်ရန်', 'Top Up via Telegram Bot')}</span>
        <span>›</span>
      </button>
      <button type="button" id="link-tg-account" class="ios-soft-action-btn" ${plansState.linkBusy ? 'disabled' : ''}>
        <span>✈️ ${plansState.linkBusy ? t('Telegram လင့်ခ်ထုတ်နေပါသည်…', 'Generating link…') : t('Telegram Bot နှင့် Account ချိတ်ဆက်ရန်', 'Link Account with Telegram Bot')}</span>
        <span>›</span>
      </button>
      ${plansState.linkUrl ? `<p class="ios-notice-banner info">✓ <a href="${escHtml(plansState.linkUrl)}" target="_blank" rel="noopener noreferrer">${t('Telegram Bot ဖွင့်ပြီး ချိတ်ဆက်မည် ↗', 'Open Telegram Bot to Link ↗')}</a></p>` : ''}
      ${plansState.linkError ? `<p class="ios-notice-banner error">${escHtml(plansState.linkError)}</p>` : ''}
    </div>

    <section class="ak-card">
      <h3>🔑 ${t('Kyat / Plan Key ဖြည့်သွင်းရန်', 'Redeem Kyat or Plan Key')}</h3>
      <form id="universal-key-form" style="display:flex;gap:8px;flex-wrap:wrap">
        <input name="code" value="${escHtml(plansState.keyCode)}" placeholder="ASTROK-..." autocomplete="off" autocapitalize="characters" style="flex:1;min-width:180px;padding:10px 12px;border:1px solid var(--ak-divider);border-radius:12px;background:var(--ak-page)" required>
        <button type="submit" class="ios-price-buy-btn" ${plansState.keyBusy ? 'disabled' : ''}>${plansState.keyBusy ? t('စစ်နေ…', 'Checking…') : t('Key ဖြည့်မည်', 'Redeem')}</button>
      </form>
      ${plansState.keyMsg ? `<p class="ios-notice-banner ${plansState.keyOk ? 'info' : 'error'}" style="margin-top:10px">${escHtml(plansState.keyMsg)}</p>` : ''}
    </section>
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

    ${plansState.topUpOpen ? renderTopUpModal(english) : ''}
    ${plansState.dialogPlan ? renderPlanPriceModal(plansState.dialogPlan, english) : ''}
  `;
}

function renderTopUpModal(english) {
  const t = (mm, en) => (english ? en : mm);
  const presets = [5000, 10000, 20000, 50000, 100000];
  return `
    <div class="ios-modal-backdrop" id="tg-topup-backdrop">
      <section class="ios-modal-sheet" role="dialog" aria-modal="true">
        <header class="ios-modal-head">
          <strong>${t('Telegram Bot ဖြင့် ငွေဖြည့်ရန်', 'Top Up via Telegram Bot')}</strong>
          <button type="button" id="tg-topup-close" aria-label="Close">×</button>
        </header>
        <form id="tg-topup-form" class="ios-auth-form" style="margin-top:14px">
          <div class="ak-chip-row" style="margin-top:0">
            ${presets.map(v => `<button type="button" class="ak-chip ${Number(plansState.topUpAmount) === v ? 'selected' : ''}" data-topup-preset="${v}">${escHtml(fmtPrice(v, english))}</button>`).join('')}
          </div>
          <label class="ios-input-box">
            <span>${t('ငွေပမာဏ (၁၀၀ မှ ၁၀,၀၀၀,၀၀၀ ကျပ်)', 'Amount (100 – 10,000,000 MMK)')}</span>
            <input id="tg-topup-amount" name="amount" type="number" min="100" max="10000000" step="100" value="${escHtml(plansState.topUpAmount)}" required>
          </label>
          <button type="submit" class="ios-primary-rect-btn" ${plansState.topUpBusy ? 'disabled' : ''}>
            ${plansState.topUpBusy ? t('Telegram Bot လင့်ခ်ထုတ်နေပါသည်…', 'Creating Telegram checkout…') : t('Telegram Bot ဖြင့် ငွေဖြည့်မည်', 'Continue to Telegram Bot')}
          </button>
        </form>
        ${plansState.topUpUrl ? `<p class="ios-notice-banner info" style="margin-top:12px">✓ ${t('Checkout လင့်ခ် အဆင်သင့်ဖြစ်ပါပြီ —', 'Checkout ready —')} <a href="${escHtml(plansState.topUpUrl)}" target="_blank" rel="noopener noreferrer"><strong>${t('Telegram Bot ဖွင့်ရန် ↗', 'Open Telegram Bot ↗')}</strong></a></p>` : ''}
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

  document.querySelector('#open-tg-topup')?.addEventListener('click', () => {
    plansState.topUpOpen = true;
    plansState.topUpUrl = '';
    plansState.topUpError = '';
    rerender();
  });
  document.querySelector('#tg-topup-close')?.addEventListener('click', () => { plansState.topUpOpen = false; rerender(); });
  document.querySelector('#tg-topup-backdrop')?.addEventListener('click', e => {
    if (e.target.id === 'tg-topup-backdrop') { plansState.topUpOpen = false; rerender(); }
  });
  document.querySelectorAll('[data-topup-preset]').forEach(btn => {
    btn.addEventListener('click', () => {
      plansState.topUpAmount = btn.dataset.topupPreset;
      rerender();
    });
  });

  document.querySelector('#tg-topup-form')?.addEventListener('submit', async e => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    plansState.topUpAmount = String(fd.get('amount') || '10000');
    plansState.topUpBusy = true;
    plansState.topUpUrl = '';
    plansState.topUpError = '';
    rerender();
    try {
      plansState.topUpUrl = await createTelegramTopUpUrl(plansState.topUpAmount);
    } catch (err) {
      const msg = String(err?.message || '');
      plansState.topUpError = msg === 'SIGN_IN_REQUIRED'
        ? 'ငွေဖြည့်ရန် ပရိုဖိုင်မှ AstroK Pro Account အရင်ဝင်ပါ။'
        : msg === 'INVALID_AMOUNT'
          ? '၁၀၀ မှ ၁၀,၀၀၀,၀၀၀ ကျပ်အတွင်း ထည့်ပေးပါ။'
          : 'Telegram Bot ငွေဖြည့်လင့်ခ် ထုတ်၍မရပါ။ ထပ်စမ်းပါ။';
    } finally {
      plansState.topUpBusy = false;
      rerender();
    }
  });

  document.querySelector('#link-tg-account')?.addEventListener('click', async () => {
    if (plansState.linkBusy) return;
    plansState.linkBusy = true;
    plansState.linkUrl = '';
    plansState.linkError = '';
    rerender();
    try {
      plansState.linkUrl = await createTelegramAccountLinkUrl();
    } catch (err) {
      plansState.linkError = String(err?.message || '') === 'SIGN_IN_REQUIRED'
        ? 'Telegram ချိတ်ဆက်ရန် ပရိုဖိုင်မှ Account အရင်ဝင်ပါ။'
        : 'Telegram ချိတ်ဆက်လင့်ခ် ထုတ်၍မရပါ။ ထပ်စမ်းပါ။';
    } finally {
      plansState.linkBusy = false;
      rerender();
    }
  });

  document.querySelector('#universal-key-form')?.addEventListener('submit', async e => {
    e.preventDefault();
    if (plansState.keyBusy) return;
    const fd = new FormData(e.currentTarget);
    const code = String(fd.get('code') || '').trim().toUpperCase();
    plansState.keyCode = code;
    plansState.keyBusy = true;
    plansState.keyMsg = '';
    rerender();
    try {
      await redeemAnyAstroKKey(code);
      plansState.keyCode = '';
      plansState.keyOk = true;
      plansState.keyMsg = 'Key ဖြည့်သွင်းပြီးပါပြီ။ ကျပ်လက်ကျန် / Plan ကို အပ်ဒိတ်လုပ်ပြီးပါပြီ။';
      if (onRefreshWallet) await onRefreshWallet();
    } catch (err) {
      plansState.keyOk = false;
      plansState.keyMsg = String(err?.message || '') === 'SIGN_IN_REQUIRED'
        ? 'Key ဖြည့်ရန် Account အရင်ဝင်ပါ။'
        : 'Key မမှန်ပါ သို့မဟုတ် အသုံးပြုပြီးသား ဖြစ်နေပါသည်။';
    } finally {
      plansState.keyBusy = false;
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
          plansState.feedback = 'ကျပ်လက်ကျန် မလုံလောက်ပါ။ Telegram Bot မှ ငွေဖြည့်ပြီး ထပ်စမ်းပါ။';
          plansState.feedbackOk = false;
        } else if (String(status).includes('LIFETIME')) {
          plansState.feedback = 'တစ်သက်တာ အသုံးပြုခွင့် ရရှိပြီးသားပါ။';
          plansState.feedbackOk = true;
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
