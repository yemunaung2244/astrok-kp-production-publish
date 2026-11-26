import { authClient, apiOrigin, publishableKey } from '../auth.js';
import { loadJson, escHtml, fmtKyat, toMyDigits } from './script-loader.js';

const booksState = {
  books: null,
  loading: false,
  error: '',
  search: '',
  category: 'all',
  busyId: '',
  downloadUrl: '',
  downloadTitle: ''
};

export function renderBooksScreen(appHeader, english, user) {
  const t = (mm, en) => (english ? en : mm);
  const items = booksState.books || [];
  const categories = ['all', 'free', ...new Set(items.map(b => b.category).filter(Boolean))];
  const q = booksState.search.trim().toLowerCase();
  const filtered = items.filter(b => {
    if (booksState.category === 'free' && Number(b.priceKyat || 0) > 0) return false;
    if (booksState.category !== 'all' && booksState.category !== 'free' && b.category !== booksState.category) return false;
    if (q && !`${b.title || ''} ${b.titleEn || ''} ${b.author || ''} ${b.description || ''} ${b.category || ''}`.toLowerCase().includes(q)) return false;
    return true;
  });

  return `
    ${appHeader(t('ဗေဒင်စာအုပ်များ', 'Astrology Books'), true)}
    <main class="ak-sys-main">
      <div class="ak-form-card">
        <input id="book-search" class="ak-search-input" value="${escHtml(booksState.search)}" placeholder="${t('စာအုပ်အမည် သို့မဟုတ် စာရေးဆရာ ရှာရန်…', 'Search book title or author…')}">
        <div class="ak-chip-row">
          ${categories.slice(0, 8).map(cat => `
            <button type="button" data-book-cat="${escHtml(cat)}" class="ak-chip ${booksState.category === cat ? 'selected' : ''}">
              ${cat === 'all' ? t('အားလုံး', 'All') : cat === 'free' ? t('အခမဲ့', 'Free') : escHtml(cat)}
            </button>
          `).join('')}
        </div>
        ${booksState.downloadUrl ? `<p class="account-notice">✓ ${escHtml(booksState.downloadTitle)} — <a href="${escHtml(booksState.downloadUrl)}" target="_blank" rel="noopener noreferrer">${t('PDF ဖွင့်ရန် ↗', 'Open PDF ↗')}</a></p>` : ''}
        ${booksState.error ? `<p class="form-error">${escHtml(booksState.error)}</p>` : ''}
      </div>

      ${booksState.loading ? `<div class="chart-pending">${t('စာအုပ်စာရင်း ဖတ်နေပါသည်…', 'Loading books catalog…')}</div>` : `
        <p class="list-count">${t(`စာအုပ် ${toMyDigits(filtered.length)} အုပ်`, `${filtered.length} books`)}</p>
        <div class="ak-book-grid">
          ${filtered.slice(0, 120).map(book => {
            const price = Number(book.priceKyat || 0);
            const busy = booksState.busyId === book.id;
            const titleText = english ? (book.titleEn || book.title || book.name || '') : (book.title || book.name || '');
            const descText = english ? (book.descriptionEn || book.description || '') : (book.description || '');
            const metaText = english ? (book.metaEn || book.meta || book.author || '') : (book.meta || book.author || '');
            return `
              <article class="ak-book-card">
                <div class="ak-book-meta">
                  <span class="ak-tag ${price === 0 ? 'good' : ''}">${price === 0 ? t('အခမဲ့', 'Free') : escHtml(fmtKyat(price, english))}</span>
                  ${book.category ? `<span class="ak-tag">${escHtml(book.category)}</span>` : ''}
                </div>
                <h3>${escHtml(titleText)}</h3>
                ${descText ? `<p class="ak-book-author">${escHtml(descText)}</p>` : ''}
                ${metaText ? `<p class="ak-book-author" style="font-size:11.5px;opacity:0.85">${escHtml(metaText)}</p>` : ''}
                <button type="button" class="ak-book-btn" data-download-book="${escHtml(book.id)}" data-book-title="${escHtml(titleText)}" data-book-price="${price}" ${busy ? 'disabled' : ''}>
                  ${busy ? t('ချိတ်ဆက်နေပါသည်…', 'Preparing…') : (user ? t('PDF ရယူမည်', 'Get PDF') : t('ဝင်ပြီး PDF ယူမည်', 'Log in to Get PDF'))}
                </button>
              </article>
            `;
          }).join('')}
        </div>
      `}
    </main>
  `;
}

export function bindBooksScreen(rerender, openLogin) {
  if (!booksState.books && !booksState.loading) {
    booksState.loading = true;
    rerender();
    Promise.allSettled([
      loadJson('data/core_books.json'),
      loadJson('data/imported_free_catalog.json')
    ])
      .then(([coreRes, freeRes]) => {
        const core = coreRes.status === 'fulfilled' && Array.isArray(coreRes.value) ? coreRes.value : [];
        const freeRaw = freeRes.status === 'fulfilled' ? freeRes.value : [];
        const free = Array.isArray(freeRaw) ? freeRaw : (freeRaw?.books || freeRaw?.items || []);
        const seen = new Set(core.map(b => b.id));
        booksState.books = [...core, ...free.filter(b => !seen.has(b.id))];
      })
      .catch(err => { booksState.error = err?.message || 'Could not load books'; })
      .finally(() => { booksState.loading = false; rerender(); });
  }

  document.querySelector('#book-search')?.addEventListener('input', e => {
    booksState.search = e.target.value;
    rerender();
    const el = document.querySelector('#book-search');
    if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); }
  });

  document.querySelectorAll('[data-book-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      booksState.category = btn.dataset.bookCat;
      rerender();
    });
  });

  document.querySelectorAll('[data-download-book]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const { data: { session } } = await authClient.auth.getSession();
      if (!session?.access_token) {
        openLogin();
        return;
      }
      const bookId = btn.dataset.downloadBook;
      const titleText = btn.dataset.bookTitle || bookId;
      const priceKyat = Number(btn.dataset.bookPrice || 0);
      booksState.busyId = bookId;
      booksState.downloadUrl = '';
      booksState.error = '';
      rerender();
      try {
        const res = await fetch(`${apiOrigin}/functions/v1/request-book-download`, {
          method: 'POST',
          headers: {
            apikey: publishableKey,
            Authorization: `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ bookId, acquire: true, expectedPriceKyat: priceKyat })
        });
        const body = await res.json().catch(() => ({}));
        const url = body?.url || body?.signedUrl || body?.downloadUrl;
        if (!res.ok || !url) throw new Error(body?.error || 'Download link unavailable');
        booksState.downloadUrl = url;
        booksState.downloadTitle = titleText;
      } catch (err) {
        booksState.error = err?.message || 'Download failed';
      } finally {
        booksState.busyId = '';
        rerender();
      }
    });
  });
}
