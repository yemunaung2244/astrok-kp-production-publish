import { escHtml } from './script-loader.js';

const storageOrigin = 'https://ntiyedmlflgzqtjppgxu.supabase.co';

export function bookPdfUrl(value, apiOrigin) {
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password ||
      !url.pathname.startsWith('/storage/v1/object/sign/astrok-books/') ||
      ![storageOrigin, apiOrigin].includes(url.origin)) {
    throw new Error('Invalid book URL');
  }
  // Keep the storage signature and route the request through the app's API gateway.
  url.searchParams.delete('download');
  return new URL(url.pathname + url.search, apiOrigin).href;
}

export async function openBookReader(bookTitle, url, english) {
  const t = (mm, en) => english ? en : mm;
  const dialog = document.createElement('dialog');
  dialog.className = 'ios-library-reader';
  dialog.setAttribute('aria-labelledby', 'library-reader-title');
  dialog.innerHTML = `
    <header>
      <h2 id="library-reader-title">${escHtml(bookTitle)}</h2>
      <button type="button" data-close aria-label="${t('ပိတ်ရန်', 'Close')}">×</button>
    </header>
    <nav aria-label="${t('စာမျက်နှာ ရွေးရန်', 'Page controls')}">
      <button type="button" data-prev disabled>${t('ရှေ့စာမျက်နှာ', 'Previous')}</button>
      <output aria-live="polite" data-page>—</output>
      <button type="button" data-next disabled>${t('နောက်စာမျက်နှာ', 'Next')}</button>
    </nav>
    <div class="ios-library-page">
      <p role="status">${t('PDF ဖွင့်နေပါသည်…', 'Opening PDF…')}</p>
      <canvas hidden></canvas>
    </div>
  `;
  const status = dialog.querySelector('[role="status"]');
  const viewport = dialog.querySelector('.ios-library-page');
  const canvas = dialog.querySelector('canvas');
  const previous = dialog.querySelector('[data-prev]');
  const next = dialog.querySelector('[data-next]');
  const label = dialog.querySelector('[data-page]');
  let loadingTask, renderTask, pdf;
  let pageNumber = 1;

  function showError() {
    canvas.hidden = true;
    status.hidden = false;
    status.textContent = t('PDF ဖွင့်၍မရပါ။ ပိတ်ပြီး ပြန်စမ်းပါ။', 'Could not open the PDF. Close and try again.');
  }

  dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    renderTask?.cancel();
    void loadingTask?.destroy().catch(() => {});
    dialog.remove();
  }, { once: true });
  previous.addEventListener('click', () => void draw(pageNumber - 1));
  next.addEventListener('click', () => void draw(pageNumber + 1));
  document.body.append(dialog);
  dialog.showModal();

  async function draw(number) {
    if (!dialog.open || number < 1 || number > pdf.numPages) return;
    previous.disabled = next.disabled = true;
    try {
      const page = await pdf.getPage(number);
      if (!dialog.open) return;
      const normal = page.getViewport({ scale: 1 });
      const fit = Math.min(1.75, (viewport.clientWidth - 24) / normal.width);
      const pixels = Math.min(window.devicePixelRatio || 1, 2,
        Math.sqrt(8_000_000 / (normal.width * normal.height * fit * fit)));
      const dimensions = page.getViewport({ scale: fit * pixels });
      canvas.width = Math.ceil(dimensions.width);
      canvas.height = Math.ceil(dimensions.height);
      canvas.style.width = `${normal.width * fit}px`;
      renderTask = page.render({ canvas, viewport: dimensions });
      await renderTask.promise;
      if (!dialog.open) return;
      page.cleanup();
      pageNumber = number;
      viewport.scrollTop = 0;
      label.textContent = `${number} / ${pdf.numPages}`;
      canvas.setAttribute('aria-label', `${bookTitle} · ${label.textContent}`);
      canvas.hidden = false;
      status.hidden = true;
    } catch {
      if (dialog.open) showError();
    } finally {
      previous.disabled = pageNumber <= 1;
      next.disabled = pageNumber >= pdf.numPages;
    }
  }

  try {
    const [{ getDocument, GlobalWorkerOptions }, { default: workerUrl }] = await Promise.all([
      import('pdfjs-dist/legacy/build/pdf.mjs'),
      import('pdfjs-dist/legacy/build/pdf.worker.min.mjs?url')
    ]);
    if (!dialog.open) return;
    GlobalWorkerOptions.workerSrc = workerUrl;
    const assets = new URL(import.meta.env.DEV ? './node_modules/pdfjs-dist/' : './pdfjs/', location.href);
    loadingTask = getDocument({
      url,
      cMapUrl: new URL('cmaps/', assets).href,
      standardFontDataUrl: new URL('standard_fonts/', assets).href,
      wasmUrl: new URL('wasm/', assets).href,
      iccUrl: new URL('iccs/', assets).href,
      isEvalSupported: false
    });
    pdf = await loadingTask.promise;
    await draw(1);
  } catch {
    if (dialog.open) showError();
  }
}
