import { loadJson, escHtml, toMyDigits } from './script-loader.js';

const today = new Date();
const numState = {
  name: '',
  day: String(today.getDate()),
  month: String(today.getMonth() + 1),
  year: String(today.getFullYear()),
  targetYear: String(today.getFullYear()),
  targetMonth: String(today.getMonth() + 1),
  tab: 'chart',
  data: null,
  loading: false,
  error: '',
  result: null
};

const PYTHAGOREAN_MAP = {
  A: 1, J: 1, S: 1, B: 2, K: 2, T: 2, C: 3, L: 3, U: 3,
  D: 4, M: 4, V: 4, E: 5, N: 5, W: 5, F: 6, O: 6, X: 6,
  G: 7, P: 7, Y: 7, H: 8, Q: 8, Z: 8, I: 9, R: 9
};

function sumDigits(num) {
  return String(Math.abs(Math.floor(num))).split('').reduce((acc, ch) => acc + Number(ch || 0), 0);
}

function reduceToSingle(num) {
  let n = sumDigits(num);
  while (n > 9) n = sumDigits(n);
  return n;
}

function computeRulingNumber(day, month, year) {
  const digits = `${day}${month}${year}`.replace(/\D/g, '').split('').map(Number);
  let total = digits.reduce((a, b) => a + b, 0);
  if (total === 22) return { key: '22/4', display: '22/4', base: 4 };
  while (total > 11) {
    total = sumDigits(total);
    if (total === 22) return { key: '22/4', display: '22/4', base: 4 };
  }
  if (total === 10) return { key: '10', display: '10', base: 1 };
  if (total === 11) return { key: '11', display: '11', base: 2 };
  return { key: String(total), display: String(total), base: total };
}

function buildGridCounts(digitStr) {
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  for (const ch of String(digitStr || '').replace(/\D/g, '')) {
    const d = Number(ch);
    if (d >= 1 && d <= 9) counts[d]++;
  }
  return counts;
}

function nameToDigits(name) {
  const clean = String(name || '').toUpperCase().replace(/[^A-Z]/g, '');
  let digits = '';
  for (const ch of clean) {
    if (PYTHAGOREAN_MAP[ch]) digits += String(PYTHAGOREAN_MAP[ch]);
  }
  return digits;
}

function computeNumerology(day, month, year, name, targetYear, targetMonth) {
  const d = Number(day), m = Number(month), y = Number(year);
  if (!d || !m || !y || d < 1 || d > 31 || m < 1 || m > 12 || y < 1800 || y > 2200) {
    throw new Error('မွေးနေ့၊ လ၊ နှစ် မှန်ကန်စွာ ထည့်ပါ။');
  }
  const birthDigits = `${d}${m}${y}`;
  const birthCounts = buildGridCounts(birthDigits);
  const ruling = computeRulingNumber(d, m, y);
  const dayNumber = reduceToSingle(d);
  const nameDigits = nameToDigits(name);
  const nameCounts = buildGridCounts(nameDigits);
  const nameTotal = nameDigits ? reduceToSingle(nameDigits.split('').reduce((a, b) => a + Number(b), 0)) : null;

  const ty = Number(targetYear) || today.getFullYear();
  const tm = Number(targetMonth) || (today.getMonth() + 1);
  const personalYear = reduceToSingle(d + m + sumDigits(ty));
  const personalMonth = reduceToSingle(personalYear + tm);

  // Pyramid pinnacle ages (standard David Phillips / Burmese numerology)
  const firstPeakAge = 36 - ruling.base;
  const peaks = [
    { index: 1, age: firstPeakAge, year: y + firstPeakAge, value: reduceToSingle(d + m) },
    { index: 2, age: firstPeakAge + 9, year: y + firstPeakAge + 9, value: reduceToSingle(d + sumDigits(y)) },
    { index: 3, age: firstPeakAge + 18, year: y + firstPeakAge + 18, value: reduceToSingle(reduceToSingle(d + m) + reduceToSingle(d + sumDigits(y))) },
    { index: 4, age: firstPeakAge + 27, year: y + firstPeakAge + 27, value: reduceToSingle(m + sumDigits(y)) }
  ];

  // Isolated numbers (1, 3, 7, 9)
  const isolated = [];
  if (birthCounts[1] > 0 && birthCounts[2] === 0 && birthCounts[4] === 0 && birthCounts[5] === 0) isolated.push('1');
  if (birthCounts[3] > 0 && birthCounts[2] === 0 && birthCounts[5] === 0 && birthCounts[6] === 0) isolated.push('3');
  if (birthCounts[7] > 0 && birthCounts[4] === 0 && birthCounts[5] === 0 && birthCounts[8] === 0) isolated.push('7');
  if (birthCounts[9] > 0 && birthCounts[5] === 0 && birthCounts[6] === 0 && birthCounts[8] === 0) isolated.push('9');

  return {
    day: d, month: m, year: y, name: name.trim(),
    birthCounts, nameCounts, nameDigits, nameTotal,
    ruling, dayNumber, personalYear, personalMonth,
    targetYear: ty, targetMonth: tm, peaks, isolated
  };
}

function render3x3Grid(counts, titleText, english) {
  const layout = [
    [3, 6, 9],
    [2, 5, 8],
    [1, 4, 7]
  ];
  return `
    <div class="num-grid-card">
      <h3>${escHtml(titleText)}</h3>
      <div class="num-grid">
        ${layout.flat().map(n => {
          const count = counts[n] || 0;
          const txt = count ? String(n).repeat(Math.min(count, 6)) : '—';
          return `<div class="num-cell ${count ? 'filled' : 'empty'}"><span>${escHtml(english ? txt : (count ? toMyDigits(txt) : '—'))}</span></div>`;
        }).join('')}
      </div>
    </div>
  `;
}

function renderNumerologyResult(res, book, english) {
  const t = (mm, en) => (english ? en : mm);
  const tabs = [
    ['chart', t('ဇာတာခွင်', 'Charts')],
    ['ruling', t('အုပ်စိုးကိန်း & မွေးရက်', 'Ruling & Day')],
    ['digits', t('ဂဏန်းအဟော', 'Digits')],
    ['arrows', t('မြှားတံ & အလွှာ', 'Arrows & Planes')],
    ['cycle', t('၉ နှစ်စက်ဝန်း', '9-Year Cycle')]
  ];

  let body = '';
  if (numState.tab === 'chart') {
    body = `
      <div class="num-summary-pills">
        <div class="num-pill"><span>${t('အုပ်စိုးကိန်း', 'Ruling Number')}</span><strong>${escHtml(res.ruling.display)}</strong></div>
        <div class="num-pill"><span>${t('မွေးရက်ကိန်း', 'Birth Day')}</span><strong>${escHtml(english ? res.dayNumber : toMyDigits(res.dayNumber))}</strong></div>
        <div class="num-pill"><span>${t('ကိုယ်ပိုင်နှစ်ကိန်း', 'Personal Year')} (${escHtml(res.targetYear)})</span><strong>${escHtml(english ? res.personalYear : toMyDigits(res.personalYear))}</strong></div>
        <div class="num-pill"><span>${t('ကိုယ်ပိုင်လကိန်း', 'Personal Month')}</span><strong>${escHtml(english ? res.personalMonth : toMyDigits(res.personalMonth))}</strong></div>
      </div>
      <div class="num-grids-row">
        ${render3x3Grid(res.birthCounts, t('မွေးနေ့ ဂဏန်းဇာတာခွင်', 'Birth Numerology Grid'), english)}
        ${res.nameDigits ? render3x3Grid(res.nameCounts, `${t('အမည်ဇာတာခွင်', 'Name Grid')} (${res.nameTotal})`, english) : ''}
      </div>
      <section class="ak-card">
        <h3>${t('ပိရမစ် အထွတ်အထိပ်နှစ်များ', 'Pyramid Pinnacle Years')}</h3>
        <div class="ak-peak-grid">
          ${res.peaks.map(pk => `
            <div class="ak-peak-item">
              <small>${t(`အထွတ်အထိပ် ${toMyDigits(pk.index)}`, `Peak ${pk.index}`)}</small>
              <strong>${t(`အသက် ${toMyDigits(pk.age)} နှစ် (${toMyDigits(pk.year)})`, `Age ${pk.age} (${pk.year})`)}</strong>
              <span>${t('ကိန်း', 'Number')}: ${escHtml(english ? pk.value : toMyDigits(pk.value))}</span>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  } else if (numState.tab === 'ruling') {
    const rulingText = book?.rulingReadings?.[res.ruling.key] || book?.rulingReadings?.[String(res.ruling.base)] || '';
    const dayMeaning = book?.numberMeanings?.[String(res.dayNumber)] || '';
    body = `
      <section class="ak-card">
        <h3>${t(`အုပ်စိုးကိန်း ${res.ruling.display} အဟော`, `Ruling Number ${res.ruling.display}`)}</h3>
        <div class="ak-reading-text">${escHtml(rulingText || t('အဟောဒေတာ မတွေ့ပါ။', 'Reading unavailable.')).replace(/\n/g, '<br>')}</div>
      </section>
      <section class="ak-card">
        <h3>${t(`မွေးရက်ကိန်း ${toMyDigits(res.dayNumber)} အဓိပ္ပာယ်`, `Birth Day Number ${res.dayNumber}`)}</h3>
        <div class="ak-reading-text">${escHtml(dayMeaning).replace(/\n/g, '<br>')}</div>
      </section>
    `;
  } else if (numState.tab === 'digits') {
    const digitBlocks = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => {
      const count = res.birthCounts[n];
      const map = book?.digitReadings?.[String(n)] || {};
      const key = count === 0 ? '0' : String(Math.min(count, 5));
      const text = map[key] || book?.numberMeanings?.[String(n)] || '';
      return `
        <article class="ak-card">
          <h3>${t(`ဂဏန်း ${toMyDigits(n)} (${count ? toMyDigits(count) + ' လုံးပါဝင်' : 'မပါဝင်'})`, `Digit ${n} (${count ? count + 'x' : 'Absent'})`)}</h3>
          <div class="ak-reading-text">${escHtml(text).replace(/\n/g, '<br>')}</div>
        </article>
      `;
    }).join('');
    const isoBlocks = res.isolated.map(d => {
      const txt = book?.isolatedReadings?.[d];
      if (!txt) return '';
      return `<article class="ak-card ak-highlight"><h3>${t(`သီးခြားရပ်တည်နေသော ဂဏန်း ${toMyDigits(d)}`, `Isolated Digit ${d}`)}</h3><div class="ak-reading-text">${escHtml(txt).replace(/\n/g, '<br>')}</div></article>`;
    }).join('');
    body = isoBlocks + digitBlocks;
  } else if (numState.tab === 'arrows') {
    const arrows = (book?.arrows || []).map(arrow => {
      const digits = arrow.digits || [];
      const allPresent = digits.every(d => (res.birthCounts[d] || 0) > 0);
      const allAbsent = digits.every(d => (res.birthCounts[d] || 0) === 0);
      if (!allPresent && !allAbsent) return '';
      const heading = allPresent ? arrow.presentTitle : arrow.absentTitle;
      const text = allPresent ? arrow.present : arrow.absent;
      return `
        <article class="ak-card ${allPresent ? 'ak-good' : 'ak-warn'}">
          <div class="ak-badge-row">
            <span class="ak-tag">${digits.join('-')}</span>
            <span class="ak-tag ${allPresent ? 'good' : 'warn'}">${allPresent ? t('ပါဝင်သောမြှားတံ', 'Present Arrow') : t('လစ်ဟာသောမြှားတံ', 'Absent Arrow')}</span>
          </div>
          <h3>${escHtml(heading || '')}</h3>
          <div class="ak-reading-text">${escHtml(text || '').replace(/\n/g, '<br>')}</div>
        </article>
      `;
    }).filter(Boolean).join('') || `<section class="ak-card"><p>${t('အထူးမြှားတံ (အပြည့်ပါဝင်/အပြည့်လစ်ဟာ) မရှိပါ။', 'No complete present or absent arrows found.')}</p></section>`;

    const planes = book?.planes ? `
      <section class="ak-card">
        <h3>${t('အလွှာ ၃ လွှာ (စိတ်၊ နှလုံးသား၊ ရုပ်ပိုင်း)', 'Three Planes (Mind, Soul, Physical)')}</h3>
        <div class="ak-plane-counts">
          <span><strong>${t('စိတ်ပိုင်း (3-6-9)', 'Mind (3-6-9)')}:</strong> ${res.birthCounts[3] + res.birthCounts[6] + res.birthCounts[9]}</span>
          <span><strong>${t('နှလုံးသား (2-5-8)', 'Soul (2-5-8)')}:</strong> ${res.birthCounts[2] + res.birthCounts[5] + res.birthCounts[8]}</span>
          <span><strong>${t('ရုပ်ပိုင်း (1-4-7)', 'Physical (1-4-7)')}:</strong> ${res.birthCounts[1] + res.birthCounts[4] + res.birthCounts[7]}</span>
        </div>
        ${['mind', 'soul', 'physical'].map(k => book.planes[k] ? `<details class="ak-details"><summary>${k === 'mind' ? t('စိတ်ပိုင်းအလွှာ (3-6-9)', 'Mind Plane') : k === 'soul' ? t('နှလုံးသားအလွှာ (2-5-8)', 'Soul Plane') : t('ရုပ်ပိုင်းအလွှာ (1-4-7)', 'Physical Plane')}</summary><div class="ak-reading-text">${escHtml(book.planes[k]).replace(/\n/g, '<br>')}</div></details>` : '').join('')}
      </section>
    ` : '';
    body = arrows + planes;
  } else if (numState.tab === 'cycle') {
    const cycleMeaning = book?.numberMeanings?.[String(res.personalYear)] || '';
    const years = Array.from({ length: 9 }, (_, i) => {
      const yr = res.targetYear - 2 + i;
      const py = reduceToSingle(res.day + res.month + sumDigits(yr));
      return { yr, py, current: yr === res.targetYear };
    });
    body = `
      <section class="ak-card">
        <h3>${t('၉ နှစ်တာ ပြောင်းလဲမှုစက်ဝန်း', '9-Year Personal Cycle')}</h3>
        <div class="ak-cycle-grid">
          ${years.map(item => `
            <div class="ak-cycle-cell ${item.current ? 'active' : ''}">
              <small>${escHtml(english ? item.yr : toMyDigits(item.yr))}</small>
              <strong>${escHtml(english ? item.py : toMyDigits(item.py))}</strong>
            </div>
          `).join('')}
        </div>
      </section>
      <section class="ak-card">
        <h3>${t(`${toMyDigits(res.targetYear)} ခုနှစ် ကိုယ်ပိုင်နှစ်ကိန်း (${toMyDigits(res.personalYear)}) အဓိပ္ပာယ်`, `Personal Year ${res.personalYear} (${res.targetYear})`)}</h3>
        <div class="ak-reading-text">${escHtml(cycleMeaning).replace(/\n/g, '<br>')}</div>
      </section>
    `;
  }

  return `
    <nav class="ak-subtabs">
      ${tabs.map(([id, label]) => `<button type="button" data-num-tab="${id}" class="${numState.tab === id ? 'selected' : ''}">${escHtml(label)}</button>`).join('')}
    </nav>
    <div class="ak-section-stack">${body}</div>
  `;
}

export function renderNumerologyScreen(appHeader, english) {
  const t = (mm, en) => (english ? en : mm);
  return `
    ${appHeader(t('ဂဏန်းဗေဒင်', 'Numerology'), true)}
    <main class="ak-sys-main">
      <form id="num-form" class="ak-form-card">
        <div class="ak-form-row">
          <label class="ak-field full">
            <span>${t('အမည် (အင်္ဂလိပ်စာလုံးဖြင့် — အမည်ဇာတာခွင်အတွက်)', 'Name (English letters for Name Grid)')}</span>
            <input name="name" value="${escHtml(numState.name)}" placeholder="e.g. Aung Aung">
          </label>
        </div>
        <div class="ak-form-row three">
          <label class="ak-field"><span>${t('မွေးရက်', 'Day')}</span><input name="day" type="number" min="1" max="31" value="${escHtml(numState.day)}" required></label>
          <label class="ak-field"><span>${t('မွေးလ', 'Month')}</span><input name="month" type="number" min="1" max="12" value="${escHtml(numState.month)}" required></label>
          <label class="ak-field"><span>${t('မွေးနှစ်', 'Year')}</span><input name="year" type="number" min="1850" max="2150" value="${escHtml(numState.year)}" required></label>
        </div>
        <div class="ak-form-row two">
          <label class="ak-field"><span>${t('တွက်လိုသောနှစ်', 'Target Year')}</span><input name="targetYear" type="number" min="1950" max="2150" value="${escHtml(numState.targetYear)}"></label>
          <label class="ak-field"><span>${t('တွက်လိုသောလ', 'Target Month')}</span><input name="targetMonth" type="number" min="1" max="12" value="${escHtml(numState.targetMonth)}"></label>
        </div>
        ${numState.error ? `<p class="form-error">${escHtml(numState.error)}</p>` : ''}
        <button type="submit" class="calculate-button" ${numState.loading ? 'disabled' : ''}>
          ${numState.loading ? t('တွက်ချက်နေပါသည်…', 'Calculating…') : t('ဂဏန်းဗေဒင်တွက်မည်', 'Calculate Numerology')}
        </button>
      </form>
      ${numState.result ? renderNumerologyResult(numState.result, numState.data, english) : ''}
    </main>
  `;
}

export function bindNumerologyScreen(rerender) {
  document.querySelector('#num-form')?.addEventListener('submit', async e => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    numState.name = String(fd.get('name') || '');
    numState.day = String(fd.get('day') || '');
    numState.month = String(fd.get('month') || '');
    numState.year = String(fd.get('year') || '');
    numState.targetYear = String(fd.get('targetYear') || today.getFullYear());
    numState.targetMonth = String(fd.get('targetMonth') || (today.getMonth() + 1));
    numState.error = '';
    numState.loading = true;
    rerender();
    try {
      if (!numState.data) {
        numState.data = await loadJson('data/numerology_book_readings.json');
      }
      numState.result = computeNumerology(numState.day, numState.month, numState.year, numState.name, numState.targetYear, numState.targetMonth);
    } catch (err) {
      numState.error = err.message || 'Calculation failed';
    } finally {
      numState.loading = false;
      rerender();
    }
  });

  document.querySelectorAll('[data-num-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      numState.tab = btn.dataset.numTab;
      rerender();
    });
  });
}
