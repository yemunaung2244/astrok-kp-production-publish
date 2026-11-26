import { loadJson, escHtml, fmtKyat } from './script-loader.js';
import { buildTelegramStartUrl } from './telegram.js';

const coursesState = {
  courses: null,
  loading: false,
  error: '',
  tab: 0, // 0 = Myanmar Traditional, 1 = KP Astrology
  selectedCourse: null
};

function courseAccent(level, isKP) {
  if (isKP) return '#4254AB';
  if (level <= 3) return '#7861CC';
  if (level <= 5) return '#5280C9';
  return '#B58A3D';
}

export function renderCoursesScreen(appHeader, english) {
  const t = (mm, en) => (english ? en : mm);
  const data = coursesState.courses;
  const isKP = coursesState.tab === 1;
  const trackKey = isKP ? 'KP နက္ခတ်' : 'မြန်မာ့ရိုးရာ';
  const list = data?.[trackKey] || [];
  const contactUrl = buildTelegramStartUrl(isKP ? 'course_kp' : 'course_myanmar');

  return `
    ${appHeader(t('သင်တန်း', 'Courses'), true)}
    <div class="ios-underline-tabs">
      <button type="button" data-course-tab="0" class="${!isKP ? 'selected' : ''}">${t('မြန်မာ့ရိုးရာ', 'Myanmar Traditional')}</button>
      <button type="button" data-course-tab="1" class="${isKP ? 'selected' : ''}">${t('KP နက္ခတ်', 'KP Astrology')}</button>
    </div>
    <main class="ak-sys-main" style="padding-top:18px">
      <h2 class="ios-plans-heading" style="margin-top:0">
        ${isKP ? t('KP နက္ခတ်ဗေဒင်ပညာသင်တန်းများ', 'KP Astrology Courses') : t('မြန်မာ့ရိုးရာဗေဒင်ပညာသင်တန်းများ', 'Myanmar Traditional Astrology Courses')}
      </h2>
      ${coursesState.loading ? `<div class="chart-pending">${t('သင်တန်းစာရင်း ဖတ်နေပါသည်…', 'Loading courses…')}</div>` : ''}
      ${coursesState.error ? `<p class="form-error">${escHtml(coursesState.error)}</p>` : ''}
      <div class="ak-section-stack">
        ${list.map((course, idx) => {
          const accent = courseAccent(course.level, isKP);
          return `
            <button type="button" class="ios-course-row" data-open-course="${idx}" style="--course-accent:${accent}">
              <span class="ios-course-num">${String(course.level).padStart(2, '0')}</span>
              <span class="ios-course-meta">
                <strong>${escHtml(course.title)}</strong>
                <small>Level ${escHtml(course.level)}${english ? '' : ' အဆင့်'}</small>
                ${isKP ? `<b>${escHtml(fmtKyat(course.feeMMK, english))}</b>` : ''}
              </span>
              <span class="ios-course-chev" aria-hidden="true">›</span>
            </button>
          `;
        }).join('')}
      </div>
    </main>
    ${coursesState.selectedCourse ? `
      <div class="ios-modal-backdrop" id="course-modal-backdrop">
        <section class="ios-modal-sheet" role="dialog" aria-modal="true">
          <header class="ios-modal-head">
            <strong>${escHtml(coursesState.selectedCourse.title)} · Level ${escHtml(coursesState.selectedCourse.level)}</strong>
            <button type="button" id="course-modal-close" aria-label="Close">×</button>
          </header>
          <p class="ak-reading-text" style="margin:12px 0">${escHtml(coursesState.selectedCourse.description)}</p>
          ${coursesState.selectedCourse.includes ? `<p class="ak-course-inc">📘 ${escHtml(coursesState.selectedCourse.includes)}</p>` : ''}
          <a class="ios-primary-rect-btn" style="display:flex;justify-content:center;align-items:center;text-decoration:none" href="${contactUrl}" target="_blank" rel="noopener noreferrer">
            ${t('သင်တန်းတက်မယ် ↗', 'Join the course ↗')}
          </a>
        </section>
      </div>
    ` : ''}
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

  document.querySelectorAll('[data-course-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      coursesState.tab = Number(btn.dataset.courseTab);
      coursesState.selectedCourse = null;
      rerender();
    });
  });

  document.querySelectorAll('[data-open-course]').forEach(btn => {
    btn.addEventListener('click', () => {
      const isKP = coursesState.tab === 1;
      const list = coursesState.courses?.[isKP ? 'KP နက္ခတ်' : 'မြန်မာ့ရိုးရာ'] || [];
      coursesState.selectedCourse = list[Number(btn.dataset.openCourse)] || null;
      rerender();
    });
  });

  document.querySelector('#course-modal-close')?.addEventListener('click', () => {
    coursesState.selectedCourse = null;
    rerender();
  });
  document.querySelector('#course-modal-backdrop')?.addEventListener('click', e => {
    if (e.target.id === 'course-modal-backdrop') {
      coursesState.selectedCourse = null;
      rerender();
    }
  });
}
