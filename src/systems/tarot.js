import { authClient, apiOrigin, publishableKey } from '../auth.js';
import { escHtml } from './script-loader.js';
import { renderSystemPlansOnly, bindMultiSystemPlans } from './plans-wallet.js';

let bridgeBound = false;
let tarotPlansModalOpen = false;
let tarotRerenderCb = null;

function ensureTarotBridge() {
  if (bridgeBound) return;
  bridgeBound = true;
  window.addEventListener('message', async event => {
    const data = event?.data;
    if (!data || data.type !== 'astrok-tarot-reading') return;
    const target = event.source;
    const { id, payload } = data;
    try {
      const { data: { session } } = await authClient.auth.getSession();
      if (!session?.access_token) {
        target?.postMessage({ type: 'astrok-tarot-result', id, ok: false, message: 'အဟောဖတ်ရန် အကောင့် ပြန်ဝင်ပါ။' }, '*');
        tarotPlansModalOpen = true;
        if (tarotRerenderCb) tarotRerenderCb();
        return;
      }
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 15000);
      const res = await fetch(`${apiOrigin}/functions/v1/tarot-answer`, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          apikey: publishableKey,
          Authorization: `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload || {})
      });
      clearTimeout(timer);
      const body = await res.json().catch(() => ({}));
      const text = body?.answer || body?.reading || body?.text || '';
      if (res.ok && text) {
        target?.postMessage({ type: 'astrok-tarot-result', id, ok: true, message: text }, '*');
      } else if (body?.error === 'TAROT_PLAN_REQUIRED' || res.status === 402 || res.status === 403) {
        target?.postMessage({ type: 'astrok-tarot-result', id, ok: false, message: 'အဟောဖတ်ရန် တားရော့ Premium Plan လိုအပ်ပါသည်။' }, '*');
        tarotPlansModalOpen = true;
        if (tarotRerenderCb) tarotRerenderCb();
      } else {
        target?.postMessage({ type: 'astrok-tarot-result', id, ok: false, message: '' }, '*');
      }
    } catch {
      target?.postMessage({ type: 'astrok-tarot-result', id, ok: false, message: '' }, '*');
    }
  });
}

export function renderTarotScreen(appHeader, english, base, wallet) {
  const t = (mm, en) => (english ? en : mm);
  return `
    ${appHeader(t('တားရော့', 'Tarot'), true)}
    <main class="ak-tarot-wrap">
      <iframe
        id="tarot-iframe"
        src="${escHtml(base)}tarot/index.html"
        title="${t('AstroK Pro တားရော့', 'AstroK Pro Tarot')}"
        class="ak-tarot-frame"
      ></iframe>
    </main>
    ${tarotPlansModalOpen ? `
      <div class="ios-modal-backdrop" id="tarot-plans-backdrop">
        <section class="ios-modal-sheet" role="dialog" aria-modal="true" style="max-height:85vh;overflow:auto">
          <header class="ios-modal-head">
            <strong>${t('တားရော့ Premium', 'Tarot Premium')}</strong>
            <button type="button" id="tarot-plans-close">×</button>
          </header>
          <div style="margin-top:12px">
            ${renderSystemPlansOnly('tarot', english, wallet)}
          </div>
        </section>
      </div>
    ` : ''}
  `;
}

export function bindTarotScreen(rerender, onRefreshWallet) {
  tarotRerenderCb = rerender;
  ensureTarotBridge();
  if (tarotPlansModalOpen) {
    bindMultiSystemPlans(rerender, onRefreshWallet);
    const close = () => {
      tarotPlansModalOpen = false;
      rerender();
      try {
        document.querySelector('#tarot-iframe')?.contentWindow?.resumeTarotReading?.();
      } catch {}
    };
    document.querySelector('#tarot-plans-close')?.addEventListener('click', close);
    document.querySelector('#tarot-plans-backdrop')?.addEventListener('click', e => {
      if (e.target.id === 'tarot-plans-backdrop') close();
    });
  }
}
