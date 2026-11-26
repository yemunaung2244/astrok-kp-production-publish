import { authClient, apiOrigin, publishableKey } from '../auth.js';
import { escHtml } from './script-loader.js';

let bridgeBound = false;

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
        // Guest or offline: let Tarot iframe immediately render its built-in offline engine!
        target?.postMessage({ type: 'astrok-tarot-result', id, ok: false, message: '' }, '*');
        return;
      }
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 12000);
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
      } else {
        target?.postMessage({ type: 'astrok-tarot-result', id, ok: false, message: '' }, '*');
      }
    } catch {
      target?.postMessage({ type: 'astrok-tarot-result', id, ok: false, message: '' }, '*');
    }
  });
}

export function renderTarotScreen(appHeader, english, base) {
  const t = (mm, en) => (english ? en : mm);
  return `
    ${appHeader(t('တားရော့ (Rider-Waite-Smith)', 'Tarot'), true)}
    <main class="ak-tarot-wrap">
      <iframe
        id="tarot-iframe"
        src="${escHtml(base)}tarot/index.html"
        title="${t('AstroK Pro တားရော့', 'AstroK Pro Tarot')}"
        class="ak-tarot-frame"
      ></iframe>
    </main>
  `;
}

export function bindTarotScreen() {
  ensureTarotBridge();
}
