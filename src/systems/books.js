import { authClient, apiOrigin, publishableKey } from '../auth.js';
import { loadJson, escHtml, fmtKyat, toMyDigits } from './script-loader.js';

const booksState = {
  books: null,
  onlineSources: null,
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
  const onlineItems = booksState.onlineSources || [];
  const categories = ['all', 'free', ...new Set(items.map(b => b.category).filter(Boolean))];
  const q = booksState.search.trim().toLowerCase();
  const filtered = items.filter(b => {
    if (booksState.category === 'free' && Number(b.priceKyat || 0) > 0) return false;
    if (booksState.category !== 'all' && booksState.category !== 'free' && b.category !== booksState.category) return false;
    if (q && !`${b.title || ''} ${b.titleEn || ''} ${b.author || ''} ${b.description || ''} ${b.category || ''}`.toLowerCase().includes(q)) return false;
    return true;
  });
  const filteredOnline = onlineItems.filter(s => {
    if (booksState.category !== 'all' && booksState.category !== 'free') {
      const cat = String(booksState.category).toLowerCase();
      if (cat === 'kp' && s.category !== 'kp') return false;
      if (cat !== 'kp' && s.category !== cat) return false;
    }
    if (q && !`${s.title} ${s.topicMm} ${s.topicEn} ${s.publisher}`.toLowerCase().includes(q)) return false;
    return true;
  });

  return `
    ${appHeader(t('ဗေဒင်စာအုပ်များ', 'Astrology Books'), true)}
    <main class="ak-sys-main">
      <div class="ak-form-card">
        <input id="book-search" class="ak-search-input" value="${escHtml(booksState.search)}" placeholder="${t('စာအုပ်အမည်ရှာရန်', 'Search books')}">
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
        <p class="list-count">${t(`AstroK စာအုပ် ${toMyDigits(filtered.length)} အုပ်`, `${filtered.length} AstroK books`)}</p>
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
                  ${busy ? t('ချိတ်ဆက်နေပါသည်…', 'Preparing…') : (user ? t('Download ဆွဲရန်', 'Download') : t('ဝင်ပြီး Download ဆွဲရန်', 'Log in to Download'))}
                </button>
              </article>
            `;
          }).join('')}
        </div>

        ${filteredOnline.length ? `
          <section style="margin-top:22px">
            <h2 class="ios-plans-heading">${t('အွန်လိုင်းအခမဲ့စာတမ်းများ', 'Free online astrology texts')} (${english ? filteredOnline.length : toMyDigits(filteredOnline.length)})</h2>
            <p class="ios-muted-note" style="margin-bottom:12px">
              ${t('မူရင်းစာကြည့်တိုက်မှ အင်္ဂလိပ် PDF များကို အခမဲ့ Download ဆွဲပြီး ဖတ်ရှုနိုင်ပါသည်။ AstroK က ဖိုင်များကို ရောင်းချခြင်း၊ ပြန်လည်ဖြန့်ဝေခြင်း မလုပ်ပါ။', 'Download free English PDFs from their original libraries. AstroK does not sell or mirror these files.')}
            </p>
            <div class="ak-book-grid">
              ${filteredOnline.slice(0, 150).map(src => `
                <article class="ak-book-card">
                  <div class="ak-book-meta">
                    <span class="ak-tag good">${t('အခမဲ့ PDF', 'Free PDF')}</span>
                    <span class="ak-tag">${escHtml(english ? src.topicEn : src.topicMm)}</span>
                  </div>
                  <h3>${escHtml(src.title)}</h3>
                  <p class="ak-book-author">${escHtml(english ? src.detailEn : src.detailMm)}</p>
                  <p class="ak-book-author" style="font-size:11.5px;opacity:0.8">${escHtml(src.publisher)}</p>
                  <a href="${escHtml(src.url)}" target="_blank" rel="noopener noreferrer" class="ak-book-btn" style="text-align:center;text-decoration:none;display:block">
                    ${t('အခမဲ့ PDF ဖွင့်ရန် ↗', 'Open free PDF ↗')}
                  </a>
                </article>
              `).join('')}
            </div>
          </section>
        ` : ''}

        <p class="ios-muted-note" style="margin-top:16px">
          ${t('ဝယ်ယူပြီးသားစာအုပ်များကို Account နှင့် ချိတ်ထားပါသည်။ ဘဏ်တိုက်ဖြင့် ရယူထားသောစာအုပ်များကို သက်တမ်းရှိချိန်တွင် ဖတ်နိုင်ပါသည်။', 'Purchased books stay with your account. Bank Vault books can be read while the plan is active.')}
        </p>
      `}
    </main>
  `;
}

export function bindBooksScreen(rerender, openLogin, english = false) {
  if (!booksState.books && !booksState.loading) {
    booksState.loading = true;
    rerender();
    Promise.allSettled([
      loadJson('data/core_books.json'),
      loadJson('data/imported_free_catalog.json'),
      loadJson('data/online_astrology_sources.json')
    ])
      .then(([coreRes, freeRes, onlineRes]) => {
        const core = coreRes.status === 'fulfilled' && Array.isArray(coreRes.value) ? coreRes.value : [];
        const freeRaw = freeRes.status === 'fulfilled' ? freeRes.value : [];
        const free = Array.isArray(freeRaw) ? freeRaw : (freeRaw?.books || freeRaw?.items || []);
        const seen = new Set(core.map(b => b.id));
        booksState.books = [...core, ...free.filter(b => !seen.has(b.id))];
        booksState.onlineSources = onlineRes.status === 'fulfilled' && Array.isArray(onlineRes.value) ? onlineRes.value : [];
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
      if (priceKyat > 0) {
        const ok = window.confirm(english
          ? `This book costs ${fmtKyat(priceKyat, true)}. Your purchase is retained for later downloads. Continue?`
          : `ဤစာအုပ်အတွက် ${fmtKyat(priceKyat, false)} ကျသင့်ပါမယ်ခင်ဗျာ။ ဝယ်ယူခွင့်ကို Account နဲ့ သိမ်းထားပြီး နောက်တစ်ကြိမ် Download ဆွဲရာတွင် ထပ်မနုတ်ပါ။ ဆက်လုပ်မည်လား။`);
        if (!ok) return;
      }
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
