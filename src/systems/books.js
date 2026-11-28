import { authClient, apiOrigin, publishableKey } from '../auth.js';
import { loadJson, escHtml } from './script-loader.js';
import { bookPdfUrl, openBookReader } from './book-reader.js';

const CATEGORIES = [
  { id: 'all', mm: 'အားလုံး', en: 'All' },
  { id: 'kp', mm: 'KP', en: 'KP' },
  { id: 'course', mm: 'သင်တန်းမူ', en: 'Course Notes' },
  { id: 'reference', mm: 'အခြားကျမ်းများ', en: 'Other Books' }
];

const BOOKS_SVG = `<svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true"><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h2A1.5 1.5 0 0 1 9 5.5v13A1.5 1.5 0 0 1 7.5 20h-2A1.5 1.5 0 0 1 4 18.5v-13zm6.5 0A1.5 1.5 0 0 1 12 4h2a1.5 1.5 0 0 1 1.5 1.5v13A1.5 1.5 0 0 1 14 20h-2a1.5 1.5 0 0 1-1.5-1.5v-13zm6.26.42a1.5 1.5 0 0 1 1.84-1.06l1.93.52a1.5 1.5 0 0 1 1.06 1.84l-3.1 11.58a1.5 1.5 0 0 1-1.84 1.06l-1.93-.52a1.5 1.5 0 0 1-1.06-1.84l3.1-11.58z"/></svg>`;
const DOWNLOAD_SVG = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v8m0 0-3-3m3 3 3-3"/></svg>`;
const READ_SVG = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5a2 2 0 0 1 2-2h5v17H6a2 2 0 0 0-2 2V5zm16 0a2 2 0 0 0-2-2h-5v17h5a2 2 0 0 1 2 2V5z"/></svg>`;
const EXT_SVG = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 5h5v5m0-5-9 9M19 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4"/></svg>`;

const booksState = {
  books: null,
  onlineSources: null,
  coverFiles: {},
  loading: false,
  error: '',
  search: '',
  category: 'all',
  activeBookId: '',
  pendingPurchase: null,
  notice: '',
  noticeNeedsLogin: false
};

function bookCategoryOf(id) {
  const s = String(id || '');
  if (s.startsWith('mahabote-course-level-') || s.startsWith('modern-maha')) return 'course';
  if (s.startsWith('kp-') || s === 'horary-astrology' || s === 'ruling-planets') return 'kp';
  return 'reference';
}

function formatKyatIOS(value, english) {
  const formatted = Number(value || 0).toLocaleString('en-US');
  return `${formatted} ${english ? 'Kyat' : 'ကျပ်'}`;
}

function hasActiveBankVault(access) {
  if (!access?.bankVault) return false;
  if (access.bankVaultLifetime) return true;
  const exp = Date.parse(String(access.bankVaultExpiresAt || ''));
  return Number.isFinite(exp) && exp > Date.now();
}

function coverUrl(coverName) {
  const file = booksState.coverFiles?.[coverName];
  if (!file) return '';
  const base = import.meta.env?.BASE_URL || './';
  return `${base}book-covers/${encodeURIComponent(file)}`;
}

export function renderBooksScreen(appHeader, english, user) {
  const t = (mm, en) => (english ? en : mm);
  const items = booksState.books || [];
  const onlineItems = booksState.onlineSources || [];
  const q = booksState.search.trim().toLowerCase();

  const filteredBooks = items.filter(book => {
    const catOk = booksState.category === 'all' || book.categoryKey === booksState.category;
    if (!catOk) return false;
    if (!q) return true;
    return `${book.title} ${book.titleEn} ${book.description} ${book.descriptionEn}`.toLowerCase().includes(q);
  });

  const filteredOnline = onlineItems.filter(src => {
    const catOk = booksState.category === 'all' || src.category === booksState.category;
    if (!catOk) return false;
    if (!q) return true;
    return `${src.title} ${src.topicMm} ${src.topicEn} ${src.publisher}`.toLowerCase().includes(q);
  });

  return `
    ${appHeader(t('ဗေဒင်စာအုပ်များ', 'Astrology Books'), true)}
    <main class="ak-sys-main ios-books-main">
      <section class="ios-books-intro">
        <div class="ios-books-intro-icon">${BOOKS_SVG}</div>
        <div class="ios-books-intro-copy">
          <h2>${t('AstroK ဗေဒင်စာအုပ်များ', 'AstroK Ebook Library')}</h2>
          <p>${t('စာအုပ်အဖုံးနှင့် အကြောင်းအရာကိုကြည့်ပြီး Download ဆွဲနိုင်သလို PDF ကို AstroK ထဲမှာ တိုက်ရိုက်ဖတ်နိုင်ပါတယ်။', 'Browse the full collection, download books and read PDFs inside AstroK.')}</p>
        </div>
      </section>

      <div class="ios-books-search-wrap">
        <span class="ios-books-search-icon" aria-hidden="true">🔍</span>
        <input id="book-search" class="ios-books-search-input" type="search" value="${escHtml(booksState.search)}" placeholder="${t('စာအုပ်အမည်ရှာရန်', 'Search books')}">
      </div>

      <nav class="ios-books-cats" aria-label="${t('စာအုပ်အမျိုးအစားများ', 'Book categories')}">
        ${CATEGORIES.map(cat => `
          <button type="button" data-book-cat="${cat.id}" class="ios-books-cat-btn ${booksState.category === cat.id ? 'selected' : ''}">
            ${escHtml(english ? cat.en : cat.mm)}
          </button>
        `).join('')}
      </nav>

      ${booksState.error ? `<p class="ios-notice-banner error">${escHtml(booksState.error)}</p>` : ''}

      ${booksState.loading ? `<div class="chart-pending">${t('စာအုပ်စာရင်း ဖတ်နေပါသည်…', 'Loading books catalog…')}</div>` : `
        <div class="ios-books-list">
          ${filteredBooks.map(book => {
            const price = Number(book.priceKyat || 0);
            const busy = booksState.activeBookId === book.id;
            const titleText = english ? (book.titleEn || book.title) : book.title;
            const descText = english ? (book.descriptionEn || book.description) : book.description;
            const metaText = english ? (book.metaEn || book.meta) : book.meta;
            const imgSrc = coverUrl(book.coverName);
            return `
              <article class="ios-book-row">
                <div class="ios-book-row-top">
                  <div class="ios-book-cover-wrap">
                    ${imgSrc
                      ? `<img class="ios-book-cover" src="${escHtml(imgSrc)}" alt="${escHtml(titleText)}" loading="lazy" decoding="async">`
                      : `<div class="ios-book-cover-fallback">${BOOKS_SVG}</div>`}
                  </div>
                  <div class="ios-book-info">
                    <h3>${escHtml(titleText)}</h3>
                    ${descText ? `<p class="ios-book-desc">${escHtml(descText)}</p>` : ''}
                    ${metaText ? `<p class="ios-book-meta">${escHtml(metaText)}</p>` : ''}
                    <p class="ios-book-price ${price === 0 ? 'free' : 'paid'}">
                      ${price === 0 ? t('အခမဲ့', 'Free') : escHtml(formatKyatIOS(price, english))}
                    </p>
                  </div>
                </div>
                <div class="ios-online-btn-row">
                  <button type="button" class="ios-book-action-btn ready" data-book-id="${escHtml(book.id)}" data-book-action="read" ${booksState.activeBookId ? 'disabled' : ''}>
                    ${READ_SVG}<span>${t('ဖတ်မည်', 'Read')}</span>
                  </button>
                  <button type="button" class="ios-book-action-btn" data-book-id="${escHtml(book.id)}" data-book-action="download" ${booksState.activeBookId ? 'disabled' : ''}>
                    ${DOWNLOAD_SVG}<span>${t('Download', 'Download')}</span>
                  </button>
                </div>
                ${busy ? `<p class="ios-book-meta" role="status">${t('ချိတ်ဆက်နေပါသည်…', 'Loading…')}</p>` : ''}
              </article>
            `;
          }).join('')}
        </div>

        ${filteredOnline.length ? `
          <section class="ios-online-books-section">
            <div class="ios-online-books-intro">
              <h2>${t('အွန်လိုင်းအခမဲ့စာတမ်းများ', 'Free online astrology texts')}</h2>
              <p>${t('အခမဲ့ အင်္ဂလိပ် PDF များကို မူရင်းစာကြည့်တိုက်တွင် ဖွင့်နိုင်ပါသည်။', 'Open free English PDFs from their original libraries.')}</p>
            </div>
            <div class="ios-books-list">
              ${filteredOnline.map(src => {
                const isCommons = String(src.id || '').startsWith('commons-');
                const imgSrc = isCommons ? '' : coverUrl(src.coverName);
                const topic = english ? src.topicEn : src.topicMm;
                const detail = english ? src.detailEn : src.detailMm;
                return `
                  <article class="ios-book-row">
                    <div class="ios-book-row-top">
                      <div class="ios-online-cover-wrap">
                        ${imgSrc
                          ? `<img class="ios-online-cover" src="${escHtml(imgSrc)}" alt="${escHtml(src.title)}" loading="lazy" decoding="async">`
                          : `<div class="ios-online-cover-icon">${BOOKS_SVG}</div>`}
                      </div>
                      <div class="ios-book-info">
                        <h3>${escHtml(src.title)}</h3>
                        <p class="ios-book-desc">${escHtml(detail)}</p>
                        <p class="ios-online-meta">${escHtml(`${topic} • English PDF • ${src.publisher}`)}</p>
                      </div>
                    </div>
                    <div class="ios-online-btn-row">
                      <a href="${escHtml(src.url)}" target="_blank" rel="noopener noreferrer" class="ios-book-action-btn" style="text-decoration:none">
                        ${DOWNLOAD_SVG}<span>${t('အခမဲ့ PDF Download ဆွဲရန်', 'Download free PDF')}</span>
                      </a>
                      <a href="${escHtml(src.url)}" target="_blank" rel="noopener noreferrer" class="ios-online-ext-btn" aria-label="${t('မူရင်းရင်းမြစ်ဖွင့်ရန်', 'Open original source')}">
                        ${EXT_SVG}
                      </a>
                    </div>
                  </article>
                `;
              }).join('')}
            </div>
          </section>
        ` : ''}

        <p class="ios-books-footer-note">
          ${t('ဝယ်ယူပြီးသားစာအုပ်များကို Account နှင့် ချိတ်ထားပါသည်။ ဘဏ်တိုက်ဖြင့် ရယူထားသောစာအုပ်များကို သက်တမ်းရှိချိန်တွင် ဖတ်နိုင်ပါသည်။', 'Purchased books stay with your account. Bank Vault books can be read while the plan is active.')}
        </p>
      `}

      ${booksState.pendingPurchase ? `
        <div class="ios-modal-backdrop" id="book-purchase-backdrop">
          <section class="ios-modal-sheet" role="alertdialog" aria-modal="true">
            <header class="ios-modal-head">
              <strong>${booksState.pendingPurchase.action === 'read'
                ? t('စာအုပ်ဖတ်ရန်', 'Read book') : t('စာအုပ် Download ဆွဲရန်', 'Download book')}</strong>
              <button type="button" id="book-purchase-close" aria-label="Close">×</button>
            </header>
            <p class="ios-books-modal-msg">
              ${english
                ? `This book costs ${escHtml(formatKyatIOS(booksState.pendingPurchase.priceKyat, true))}. The account purchase is retained for later downloads.`
                : `ဤစာအုပ်အတွက် ${escHtml(formatKyatIOS(booksState.pendingPurchase.priceKyat, false))} ကျသင့်ပါမယ်ခင်ဗျာ။ ဝယ်ယူခွင့်ကို Account နဲ့ သိမ်းထားပြီး နောက်တစ်ကြိမ် Download ဆွဲရာတွင် ထပ်မနုတ်ပါ။`}
            </p>
            <div class="ios-books-modal-actions">
              <button type="button" id="book-purchase-cancel" class="ios-books-modal-cancel">${t('မလုပ်တော့ပါ', 'Cancel')}</button>
              <button type="button" id="book-purchase-confirm" class="ios-books-modal-confirm">${t('ဆက်လုပ်မည်', 'Continue')}</button>
            </div>
          </section>
        </div>
      ` : ''}

      ${booksState.notice ? `
        <div class="ios-modal-backdrop" id="book-notice-backdrop">
          <section class="ios-modal-sheet" role="alertdialog" aria-modal="true">
            <header class="ios-modal-head">
              <strong>${t('အသိပေးချက်', 'Notice')}</strong>
              <button type="button" id="book-notice-close" aria-label="Close">×</button>
            </header>
            <p class="ios-books-modal-msg">${escHtml(booksState.notice)}</p>
            <div class="ios-books-modal-actions">
              ${booksState.noticeNeedsLogin
                ? `<button type="button" id="book-notice-login" class="ios-books-modal-confirm">${t('Account ဝင်မည်', 'Sign in')}</button>`
                : `<button type="button" id="book-notice-ok" class="ios-books-modal-confirm">OK</button>`}
            </div>
          </section>
        </div>
      ` : ''}
    </main>
  `;
}

function normalizeBooks(coreList, importedRaw) {
  const core = (Array.isArray(coreList) ? coreList : []).map(b => ({
    id: b.id,
    title: b.title || '',
    titleEn: b.titleEn || b.title || '',
    description: b.description || '',
    descriptionEn: b.descriptionEn || b.description || '',
    meta: b.meta || '',
    metaEn: b.metaEn || b.meta || '',
    priceKyat: Number(b.priceKyat || 0),
    coverName: b.coverName || '',
    categoryKey: bookCategoryOf(b.id)
  }));

  const impList = Array.isArray(importedRaw) ? importedRaw : (importedRaw?.books || []);
  const seen = new Set(core.map(b => b.id));
  const imported = impList
    .filter(b => b?.bookId && !seen.has(b.bookId))
    .map(b => {
      const sizeMB = Math.floor(Number(b.bytes || 0) / 1_000_000);
      const pages = Number(b.pages || 0);
      return {
        id: b.bookId,
        title: b.titleMyanmar || b.titleEnglish || b.bookId,
        titleEn: b.titleEnglish || b.titleMyanmar || b.bookId,
        description: 'အခမဲ့ PDF စာအုပ်',
        descriptionEn: 'Free PDF book',
        meta: `PDF • ${pages} မျက်နှာ • ${sizeMB} MB • မြန်မာ`,
        metaEn: `PDF • ${pages} pages • ${sizeMB} MB • Burmese`,
        priceKyat: 0,
        coverName: b.coverName || '',
        categoryKey: bookCategoryOf(b.bookId)
      };
    });

  return [...core, ...imported];
}

export function bindBooksScreen(rerender, openLogin, english = false, onRefreshWallet = null) {
  const t = (mm, en) => (english ? en : mm);

  if (!booksState.books && !booksState.loading) {
    booksState.loading = true;
    rerender();
    Promise.allSettled([
      loadJson('data/core_books.json'),
      loadJson('data/imported_free_catalog.json'),
      loadJson('data/online_astrology_sources.json'),
      loadJson('data/book_covers.json')
    ])
      .then(([coreRes, freeRes, onlineRes, coversRes]) => {
        booksState.books = normalizeBooks(
          coreRes.status === 'fulfilled' ? coreRes.value : [],
          freeRes.status === 'fulfilled' ? freeRes.value : []
        );
        booksState.onlineSources = onlineRes.status === 'fulfilled' && Array.isArray(onlineRes.value) ? onlineRes.value : [];
        booksState.coverFiles = coversRes.status === 'fulfilled' && coversRes.value ? coversRes.value : {};
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

  const openBook = async (book, action, expectedPriceKyat, acquire) => {
    const { data: { session } } = await authClient.auth.getSession();
    if (!session?.access_token || !session?.user?.id) {
      booksState.notice = t('စာအုပ်ရယူရန် Account ပြန်ဝင်ပေးပါ။', 'Sign in to access the book.');
      booksState.noticeNeedsLogin = true;
      rerender();
      return;
    }
    booksState.activeBookId = book.id;
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
        body: JSON.stringify({
          bookId: book.id,
          acquire,
          expectedUser: session.user.id,
          expectedPriceKyat: expectedPriceKyat ?? book.priceKyat
        })
      });
      const body = await res.json().catch(() => ({}));
      const url = body?.downloadUrl || body?.url || body?.signedUrl;
      if (!res.ok || !url) {
        const code = String(body?.error || '');
        if (code.includes('INSUFFICIENT')) {
          throw new Error(t('ကျပ်လက်ကျန် မလုံလောက်ပါ။', 'Insufficient Kyat balance.'));
        }
        if (code === 'BANK_VAULT_EXPIRED') {
          throw new Error(t('ဒီစာအုပ်ကိုဖတ်ရန် ဘဏ်တိုက်သက်တမ်းတိုးပေးပါ။', 'Renew Bank Vault to read this book.'));
        }
        throw new Error(code || t('စာအုပ် Download ဆွဲ၍မရပါ။ ထပ်စမ်းပေးပါ။', 'Download failed. Please try again.'));
      }
      if (onRefreshWallet && acquire) await onRefreshWallet().catch(() => {});
      if (action === 'read') {
        if (!document.querySelector('.ios-books-main')) return;
        void openBookReader(english ? book.titleEn : book.title, bookPdfUrl(url, apiOrigin), english);
      } else {
        window.location.assign(url);
      }
    } catch (err) {
      booksState.notice = err?.message || t('စာအုပ် Download ဆွဲ၍မရပါ။', 'Download failed.');
      booksState.noticeNeedsLogin = false;
    } finally {
      booksState.activeBookId = '';
      rerender();
    }
  };

  document.querySelectorAll('[data-book-action]').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (booksState.activeBookId) return;
      const { bookId, bookAction: action } = btn.dataset;
      const book = (booksState.books || []).find(b => b.id === bookId);
      if (!book) return;

      const { data: { session } } = await authClient.auth.getSession();
      if (!session?.access_token || !session?.user?.id) {
        booksState.notice = t('စာအုပ်ရယူရန် Account ဝင်ပေးပါ။', 'Sign in to access the book.');
        booksState.noticeNeedsLogin = true;
        rerender();
        return;
      }

      booksState.activeBookId = book.id;
      booksState.error = '';
      rerender();
      try {
        const res = await fetch(`${apiOrigin}/rest/v1/rpc/book_access`, {
          method: 'POST',
          headers: {
            apikey: publishableKey,
            Authorization: `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            p_expected_user: session.user.id,
            p_book_id: book.id,
            p_acquire: false
          })
        });
        const access = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(access?.message || t('စာအုပ်အသုံးပြုခွင့် စစ်ဆေး၍မရပါ။', 'Could not check book access.'));
        if (access.bankVaultRequired && !access.owned) {
          booksState.activeBookId = '';
          booksState.notice = t('ဒီစာအုပ်ကိုပြန်ရယူရန် ဘဏ်တိုက်သက်တမ်းတိုးပေးပါ။', 'Renew Bank Vault to restore this book.');
          booksState.noticeNeedsLogin = false;
          rerender();
        } else if (access.owned || Number(access.priceKyat ?? book.priceKyat) === 0 || hasActiveBankVault(access)) {
          await openBook(book, action, Number(access.priceKyat ?? book.priceKyat), !access.owned);
        } else {
          booksState.activeBookId = '';
          booksState.pendingPurchase = { book, action, priceKyat: Number(access.priceKyat ?? book.priceKyat) };
          rerender();
        }
      } catch (err) {
        booksState.activeBookId = '';
        booksState.notice = err?.message || t('စာအုပ်အသုံးပြုခွင့် စစ်ဆေး၍မရပါ။', 'Could not check book access.');
        booksState.noticeNeedsLogin = false;
        rerender();
      }
    });
  });

  const closePurchase = () => { booksState.pendingPurchase = null; rerender(); };
  document.querySelector('#book-purchase-close')?.addEventListener('click', closePurchase);
  document.querySelector('#book-purchase-cancel')?.addEventListener('click', closePurchase);
  document.querySelector('#book-purchase-backdrop')?.addEventListener('click', e => {
    if (e.target.id === 'book-purchase-backdrop') closePurchase();
  });
  document.querySelector('#book-purchase-confirm')?.addEventListener('click', () => {
    const pending = booksState.pendingPurchase;
    if (!pending) return;
    booksState.pendingPurchase = null;
    void openBook(pending.book, pending.action, pending.priceKyat, true);
  });

  const closeNotice = () => { booksState.notice = ''; booksState.noticeNeedsLogin = false; rerender(); };
  document.querySelector('#book-notice-close')?.addEventListener('click', closeNotice);
  document.querySelector('#book-notice-ok')?.addEventListener('click', closeNotice);
  document.querySelector('#book-notice-backdrop')?.addEventListener('click', e => {
    if (e.target.id === 'book-notice-backdrop') closeNotice();
  });
  document.querySelector('#book-notice-login')?.addEventListener('click', () => {
    closeNotice();
    openLogin();
  });
}
