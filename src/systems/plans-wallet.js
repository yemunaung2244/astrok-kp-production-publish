import { loadJson, escHtml, fmtKyat } from './script-loader.js';

const plansState = {
  data: null,
  loading: false,
  error: '',
  selectedSystem: 'kp'
};

export function renderMultiSystemPlans(english, wallet) {
  const t = (mm, en) => (english ? en : mm);
  const systems = plansState.data?.systems || [];
  const activeSys = systems.find(s => s.id === plansState.selectedSystem) || systems[0];
  const telegram = plansState.data?.telegram || 'https://t.me/htoomyatastro2635';
  const phone = plansState.data?.phone || '09699031718';

  if (plansState.loading) {
    return `<div class="chart-pending">${t('Plan စာရင်း ဖတ်နေပါသည်…', 'Loading plans…')}</div>`;
  }
  if (!activeSys) return '';

  const termLabels = [t('၁ လ', '1 Month'), t('၁ နှစ်', '1 Year'), t('တစ်သက်တာ', 'Lifetime')];

  return `
    ${wallet ? `
      <section class="ak-card ak-highlight" style="margin-bottom:14px">
        <div class="ak-badge-row" style="justify-content:space-between">
          <strong>${t('ကျပ်ငွေလက်ကျန်', 'Kyat Wallet Balance')}</strong>
          <strong style="color:#5B1B77">${escHtml(fmtKyat(wallet.kyatBalance || 0, english))}</strong>
        </div>
      </section>
    ` : ''}
    <nav class="ak-subtabs" style="margin-bottom:14px">
      ${systems.map(sys => `
        <button type="button" data-plan-sys="${escHtml(sys.id)}" class="${activeSys.id === sys.id ? 'selected' : ''}">
          ${escHtml(english ? sys.titleEn : sys.titleMm)}
        </button>
      `).join('')}
    </nav>
    <div class="ak-section-stack">
      ${(activeSys.plans || []).map(plan => {
        const inc = (english ? plan.included?.en : plan.included?.mm) || [];
        const lck = (english ? plan.locked?.en : plan.locked?.mm) || [];
        const prices = plan.prices || [];
        const oldPrices = plan.oldPrices || [];
        return `
          <section class="ak-card ak-plan-box">
            <div class="ak-badge-row" style="justify-content:space-between">
              <h3 style="margin:0">${escHtml(english ? activeSys.titleEn : activeSys.titleMm)} · ${escHtml(plan.level)}</h3>
              ${prices.length === 0 ? `<span class="ak-tag good">${t('အခမဲ့', 'Free')}</span>` : ''}
            </div>
            ${prices.length ? `
              <div class="ak-price-strip">
                ${prices.map((pr, idx) => `
                  <div class="ak-price-tile">
                    <small>${escHtml(termLabels[idx] || '')}</small>
                    ${oldPrices[idx] ? `<del>${escHtml(fmtKyat(oldPrices[idx], english))}</del>` : ''}
                    <strong>${escHtml(fmtKyat(pr, english))}</strong>
                  </div>
                `).join('')}
              </div>
            ` : ''}
            <ul class="ak-feature-list">
              ${inc.map(item => `<li class="inc">✓ ${escHtml(item)}</li>`).join('')}
              ${lck.map(item => `<li class="lck">× ${escHtml(item)}</li>`).join('')}
            </ul>
            ${prices.length ? `
              <a class="ak-course-cta" href="${escHtml(telegram)}" target="_blank" rel="noopener noreferrer">
                ${t('Telegram မှ Plan ဝယ်ယူရန် ↗', 'Buy Plan on Telegram ↗')}
              </a>
            ` : ''}
          </section>
        `;
      }).join('')}
      <p class="city-hint" style="text-align:center">Telegram: <a href="${escHtml(telegram)}" target="_blank" rel="noopener noreferrer">@htoomyatastro2635</a> · Phone: ${escHtml(phone)}</p>
    </div>
  `;
}

export function bindMultiSystemPlans(rerender) {
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
}
