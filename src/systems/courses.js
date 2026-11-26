import { loadJson, escHtml, fmtKyat } from './script-loader.js';

const coursesState = {
  courses: null,
  loading: false,
  error: '',
  track: 'မြန်မာ့ရိုးရာ'
};

export function renderCoursesScreen(appHeader, english, wallet) {
  const t = (mm, en) => (english ? en : mm);
  const data = coursesState.courses;
  const tracks = data ? Object.keys(data) : ['မြန်မာ့ရိုးရာ', 'KP နက္ခတ်'];
  const list = data?.[coursesState.track] || [];
  const contactUrl = 'https://t.me/htoomyatastro2635';

  return `
    ${appHeader(t('ဗေဒင်သင်တန်းများ', 'Astrology Courses'), true)}
    <main class="ak-sys-main">
      ${wallet ? `
        <section class="ak-card ak-highlight">
          <strong>${t('သင်တန်းတက်ရောက်ရန်', 'Course Enrollment')}</strong>
          <p style="margin:6px 0 0">${t(`လက်ရှိ AstroK Pro ကျပ်ငွေလက်ကျန်: ${fmtKyat(wallet.kyatBalance || 0, false)} — Telegram မှတစ်ဆင့် တိုက်ရိုက်စာရင်းသွင်းနိုင်ပါသည်။`, `Current Wallet Balance: ${fmtKyat(wallet.kyatBalance || 0, true)} — Enroll directly via Telegram.`)}</p>
        </section>
      ` : ''}
      <nav class="ak-subtabs">
        ${tracks.map(track => `<button type="button" data-course-track="${escHtml(track)}" class="${coursesState.track === track ? 'selected' : ''}">${escHtml(track)}</button>`).join('')}
      </nav>
      ${coursesState.loading ? `<div class="chart-pending">${t('သင်တန်းစာရင်း ဖတ်နေပါသည်…', 'Loading courses…')}</div>` : ''}
      ${coursesState.error ? `<p class="form-error">${escHtml(coursesState.error)}</p>` : ''}
      <div class="ak-section-stack">
        ${list.map(course => `
          <article class="ak-card ak-course-card">
            <div class="ak-badge-row">
              <span class="ak-tag">Level ${escHtml(course.level)}</span>
              <span class="ak-tag good">${escHtml(fmtKyat(course.feeMMK, english))}</span>
            </div>
            <h3>${escHtml(course.title)}</h3>
            <p class="ak-reading-text">${escHtml(course.description)}</p>
            ${course.includes ? `<p class="ak-course-inc">📘 ${escHtml(course.includes)}</p>` : ''}
            <a class="ak-course-cta" href="${contactUrl}" target="_blank" rel="noopener noreferrer">
              ${t('Telegram မှ သင်တန်းအပ်မည် ↗', 'Enroll via Telegram ↗')}
            </a>
          </article>
        `).join('')}
      </div>
    </main>
  `;
}

export function bindCoursesScreen(rerender) {
  if (!coursesState.courses && !coursesState.loading) {
    coursesState.loading = true;
    rerender();
    loadJson('data/courses.json')
      .then(data => { coursesState.courses = data; })
      .catch(err => { coursesState.error = err?.message || 'Could not load courses'; })
      .finally(() => { coursesState.loading = false; rerender(); });
  }

  document.querySelectorAll('[data-course-track]').forEach(btn => {
    btn.addEventListener('click', () => {
      coursesState.track = btn.dataset.courseTrack;
      rerender();
    });
  });
}
