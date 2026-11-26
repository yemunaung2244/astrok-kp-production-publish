import { loadJson, escHtml, toMyDigits } from './script-loader.js';
import { renderSystemPlansOnly, bindMultiSystemPlans } from './plans-wallet.js';

const today = new Date();
const numState = {
  entryTab: 'calc',
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

function digitSum(str) {
  let sum = 0;
  for (const ch of String(str || '')) {
    const code = ch.charCodeAt(0);
    if (code >= 48 && code <= 57) sum += code - 48;
  }
  return sum;
}

function reduceNum(val) {
  let r = val;
  while (r > 9) r = digitSum(String(r));
  return r;
}

function reduceSpecial(val) {
  return (val === 10 || val === 11) ? val : reduceNum(val);
}

function numberLabel(total, ruling) {
  if (total === 22) return '22/4';
  let value = total;
  while (value > 11) value = digitSum(String(value));
  if (value === 11) return '11';
  if (value === 10 || (ruling && value === 1)) return '10';
  return String(value);
}

function paragraphsHtml(value, fallback = '') {
  if (Array.isArray(value)) {
    const items = value.map(s => String(s || '').trim()).filter(Boolean);
    if (items.length) return items.map(p => `<p>${escHtml(p)}</p>`).join('');
  } else if (typeof value === 'string' && value.trim()) {
    return value.split('\n\n').map(p => `<p>${escHtml(p.trim())}</p>`).join('');
  }
  return fallback ? `<p>${escHtml(fallback)}</p>` : '';
}

function computeNumerology(day, month, year, name, targetYear, targetMonth) {
  const d = Number(day), m = Number(month), y = Number(year);
  if (!d || !m || !y || d < 1 || d > 31 || m < 1 || m > 12 || y < 1 || y > 9999) {
    throw new Error('မွေးနေ့၊ လ၊ နှစ် မှန်ကန်စွာ ထည့်ပါ။');
  }
  const counts = Array(10).fill(0);
  for (const ch of `${m}${d}${y}`) {
    const n = Number(ch);
    if (n >= 0 && n <= 9) counts[n]++;
  }

  const rulingTotal = digitSum(`${m}${d}${y}`);
  const ruling = numberLabel(rulingTotal, true);
  const birthDay = numberLabel(d, false);
  const ty = Number(targetYear) || today.getFullYear();
  const tm = Number(targetMonth) || (today.getMonth() + 1);
  const personalYear = reduceNum(digitSum(String(ty)) + digitSum(String(m)) + digitSum(String(d)));
  const personalMonth = reduceNum(personalYear + tm);

  const mr = reduceNum(m);
  const dr = reduceNum(digitSum(String(d)));
  const yr = reduceNum(digitSum(String(y)));
  const first = reduceNum(mr + dr);
  const second = reduceNum(dr + yr);
  const pinnacles = [first, second, reduceSpecial(first + second), reduceSpecial(mr + yr)];
  const rulingBase = ruling === '22/4' ? 4 : (Number(ruling) || 0);
  const pinnacleAges = [36, 45, 54, 63].map(a => a - rulingBase);

  const nameCounts = Array(10).fill(0);
  let soulTotal = 0, outerTotal = 0;
  for (const ch of String(name || '').trim().toUpperCase()) {
    const code = ch.charCodeAt(0);
    if (code >= 65 && code <= 90) {
      const val = ((code - 65) % 9) + 1;
      nameCounts[val]++;
      if ([65, 69, 73, 79, 85].includes(code)) soulTotal += val;
      else outerTotal += val;
    }
  }
  const fullNameTotal = soulTotal + outerTotal;
  const soul = soulTotal > 0 ? numberLabel(soulTotal, false) : '';
  const outer = outerTotal > 0 ? numberLabel(outerTotal, false) : '';
  const fullName = fullNameTotal > 0 ? numberLabel(fullNameTotal, false) : '';

  const isolated = [];
  if (counts[1] > 0 && counts[2] === 0 && counts[4] === 0 && counts[5] === 0) isolated.push('1');
  if (counts[3] > 0 && counts[2] === 0 && counts[5] === 0 && counts[6] === 0) isolated.push('3');
  if (counts[7] > 0 && counts[4] === 0 && counts[5] === 0 && counts[8] === 0) isolated.push('7');
  if (counts[9] > 0 && counts[5] === 0 && counts[6] === 0 && counts[8] === 0) isolated.push('9');

  return {
    day: d, month: m, year: y, targetYear: ty, targetMonth: tm, name: name.trim(),
    counts, nameCounts, ruling, birthDay, personalYear, personalMonth,
    pinnacles, pinnacleAges, soul, outer, fullName, fullNameTotal, isolated
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
    ['ruling', t('အုပ်စိုး & မွေးရက်', 'Ruling & Day')],
    ['digits', t('ဂဏန်းအဟော', 'Digits')],
    ['arrows', t('မြှားတံ & အလွှာ', 'Arrows & Planes')],
    ['cycle', t('၉ နှစ် & ပိရမစ်', 'Cycle & Peaks')],
    ...(res.fullName ? [['name', t('အမည်အဟော', 'Name Reading')]] : [])
  ];

  let body = '';
  if (numState.tab === 'chart') {
    body = `
      <div class="num-summary-pills">
        <div class="num-pill"><span>${t('အုပ်စိုးကိန်း', 'Ruling')}</span><strong>${escHtml(res.ruling)}</strong></div>
        <div class="num-pill"><span>${t('မွေးရက်ကိန်း', 'Birth Day')}</span><strong>${escHtml(res.birthDay)}</strong></div>
        <div class="num-pill"><span>${t('ကိုယ်ပိုင်နှစ်', 'Personal Year')} (${res.targetYear})</span><strong>${escHtml(english ? res.personalYear : toMyDigits(res.personalYear))}</strong></div>
        <div class="num-pill"><span>${t('ကိုယ်ပိုင်လ', 'Personal Month')}</span><strong>${escHtml(english ? res.personalMonth : toMyDigits(res.personalMonth))}</strong></div>
      </div>
      <div class="num-grids-row">
        ${render3x3Grid(res.counts, t('မွေးနေ့ ဂဏန်းဇာတာခွင်', 'Birth Numerology Grid'), english)}
        ${res.fullName ? render3x3Grid(res.nameCounts, `${t('အမည်ဇာတာခွင်', 'Name Grid')} (${res.fullName})`, english) : ''}
      </div>
      <section class="ak-card">
        <h3>${t('ပိရမစ် အထွတ်အထိပ်နှစ်များ', 'Pyramid Pinnacle Years')}</h3>
        <div class="ak-peak-grid">
          ${res.pinnacles.map((val, i) => `
            <div class="ak-peak-item">
              <small>${t(`အထွတ်အထိပ် ${toMyDigits(i + 1)}`, `Peak ${i + 1}`)}</small>
              <strong>${t(`အသက် ${toMyDigits(res.pinnacleAges[i])} နှစ် (${toMyDigits(res.year + res.pinnacleAges[i])})`, `Age ${res.pinnacleAges[i]} (${res.year + res.pinnacleAges[i]})`)}</strong>
              <span>${t('ကိန်း', 'Number')}: ${escHtml(english ? val : toMyDigits(val))}</span>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  } else if (numState.tab === 'ruling') {
    const rulingParas = book?.rulingReadings?.[res.ruling] || book?.rulingReadings?.[String(Number(res.ruling) || 4)];
    const dayParas = book?.birthDayReadings?.[res.birthDay] || book?.numberMeanings?.[res.birthDay];
    body = `
      <section class="ak-card">
        <h3>${t(`အုပ်စိုးကိန်း ${res.ruling} အဟော`, `Ruling Number ${res.ruling}`)}</h3>
        <div class="ak-reading-text">${paragraphsHtml(rulingParas, t('အဟောဒေတာ မတွေ့ပါ။', 'Reading unavailable.'))}</div>
      </section>
      <section class="ak-card">
        <h3>${t(`မွေးရက်ကိန်း ${res.birthDay} အဟော`, `Birth Day Number ${res.birthDay}`)}</h3>
        <div class="ak-reading-text">${paragraphsHtml(dayParas)}</div>
      </section>
    `;
  } else if (numState.tab === 'digits') {
    const isoBlocks = res.isolated.map(d => {
      const txt = book?.isolatedReadings?.[d];
      if (!txt) return '';
      return `<article class="ak-card ak-highlight"><h3>${t(`သီးခြားရပ်တည်နေသော ဂဏန်း ${toMyDigits(d)}`, `Isolated Digit ${d}`)}</h3><div class="ak-reading-text">${paragraphsHtml(txt)}</div></article>`;
    }).join('');
    const digitBlocks = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => {
      const count = res.counts[n];
      const map = book?.digitReadings?.[String(n)] || {};
      const key = count === 0 ? '0' : String(Math.min(count, 5));
      const paras = map[key] || book?.numberMeanings?.[String(n)];
      return `
        <article class="ak-card">
          <h3>${t(`ဂဏန်း ${toMyDigits(n)} (${count ? toMyDigits(count) + ' လုံးပါဝင်' : 'မပါဝင်'})`, `Digit ${n} (${count ? count + 'x' : 'Absent'})`)}</h3>
          <div class="ak-reading-text">${paragraphsHtml(paras)}</div>
        </article>
      `;
    }).join('');
    body = isoBlocks + digitBlocks;
  } else if (numState.tab === 'arrows') {
    const arrows = (book?.arrows || []).map(arrow => {
      const digitList = String(arrow.digits || '').split('').map(Number).filter(n => n >= 1 && n <= 9);
      const allPresent = digitList.length > 0 && digitList.every(d => (res.counts[d] || 0) > 0);
      const allAbsent = digitList.length > 0 && digitList.every(d => (res.counts[d] || 0) === 0);
      if (!allPresent && !allAbsent) return '';
      const heading = allPresent ? arrow.presentTitle : arrow.absentTitle;
      const paras = allPresent ? arrow.present : arrow.absent;
      if (!heading && (!paras || !paras.length)) return '';
      return `
        <article class="ak-card">
          <div class="ak-badge-row">
            <span class="ak-tag">${escHtml(digitList.join('-'))}</span>
            <span class="ak-tag ${allPresent ? 'good' : 'warn'}">${allPresent ? t('ပါဝင်သောမြှားတံ', 'Present Arrow') : t('လစ်ဟာသောမြှားတံ', 'Absent Arrow')}</span>
          </div>
          <h3>${escHtml(heading || '')}</h3>
          <div class="ak-reading-text">${paragraphsHtml(paras)}</div>
        </article>
      `;
    }).filter(Boolean).join('') || `<section class="ak-card"><p>${t('အထူးမြှားတံ (အပြည့်ပါဝင်/အပြည့်လစ်ဟာ) မရှိပါ။', 'No complete present or absent arrows found.')}</p></section>`;

    const planes = book?.planes ? `
      <section class="ak-card">
        <h3>${t('အလွှာ ၃ လွှာ (စိတ်၊ နှလုံးသား၊ ရုပ်ပိုင်း)', 'Three Planes')}</h3>
        ${Object.entries(book.planes).map(([k, val]) => `
          <details class="ak-accordion" style="margin-top:8px">
            <summary><strong>${k === 'mind' ? t('စိတ်ပိုင်းအလွှာ (3-6-9)', 'Mind Plane (3-6-9)') : k === 'soul' ? t('နှလုံးသားအလွှာ (2-5-8)', 'Soul Plane (2-5-8)') : t('ရုပ်ပိုင်းအလွှာ (1-4-7)', 'Physical Plane (1-4-7)')}</strong></summary>
            <div class="ak-reading-text">${paragraphsHtml(val)}</div>
          </details>
        `).join('')}
      </section>
    ` : '';
    body = arrows + planes;
  } else if (numState.tab === 'cycle') {
    const pyParas = book?.personalYearReadings?.[String(res.personalYear)] || book?.numberMeanings?.[String(res.personalYear)];
    const pmParas = book?.personalMonthReadings?.[String(res.personalYear)]?.[String(res.targetMonth)] || book?.numberMeanings?.[String(res.personalMonth)];
    const years = Array.from({ length: 9 }, (_, i) => {
      const yr = res.targetYear - 2 + i;
      const py = reduceNum(digitSum(String(yr)) + digitSum(String(res.month)) + digitSum(String(res.day)));
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
        <h3>${t(`${toMyDigits(res.targetYear)} ခုနှစ် ကိုယ်ပိုင်နှစ်ကိန်း (${toMyDigits(res.personalYear)})`, `Personal Year ${res.personalYear} (${res.targetYear})`)}</h3>
        <div class="ak-reading-text">${paragraphsHtml(pyParas)}</div>
      </section>
      <section class="ak-card">
        <h3>${t(`${toMyDigits(res.targetMonth)} လပိုင်း ဟောစာတမ်း (ကိုယ်ပိုင်လကိန်း ${toMyDigits(res.personalMonth)})`, `Personal Month ${res.personalMonth}`)}</h3>
        <div class="ak-reading-text">${paragraphsHtml(pmParas)}</div>
      </section>
      <section class="ak-card">
        <h3>${t('ပိရမစ် အထွတ်အထိပ် ဟောစာတမ်းများ', 'Pyramid Pinnacle Readings')}</h3>
        ${res.pinnacles.map((val, i) => `
          <details class="ak-accordion" style="margin-top:8px">
            <summary><strong>${t(`အထွတ်အထိပ် ${toMyDigits(i + 1)} · အသက် ${toMyDigits(res.pinnacleAges[i])} နှစ် (ကိန်း ${toMyDigits(val)})`, `Peak ${i + 1} · Age ${res.pinnacleAges[i]} (Number ${val})`)}</strong></summary>
            <div class="ak-reading-text">${paragraphsHtml(book?.pinnacleReadings?.[String(val)])}</div>
          </details>
        `).join('')}
      </section>
    `;
  } else if (numState.tab === 'name' && res.fullName) {
    body = `
      <section class="ak-card">
        <h3>${t(`ဝိညာဉ်ကိန်း / စိတ်တွင်းကိန်း (Soul: ${res.soul})`, `Soul Number (${res.soul})`)}</h3>
        <div class="ak-reading-text">${paragraphsHtml(book?.nameSoulReadings?.[res.soul])}</div>
      </section>
      <section class="ak-card">
        <h3>${t(`ပြင်ပပုံရိပ်ကိန်း (Outer: ${res.outer})`, `Outer Expression (${res.outer})`)}</h3>
        <div class="ak-reading-text">${paragraphsHtml(book?.nameOuterReadings?.[res.outer])}</div>
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

export function renderNumerologyScreen(appHeader, english, wallet) {
  const t = (mm, en) => (english ? en : mm);
  return `
    ${appHeader(t('ဂဏန်းဗေဒင်', 'Numerology'), true)}
    <main class="ak-sys-main">
      <nav class="ak-subtabs" style="margin-bottom:12px">
        <button type="button" data-num-entry="calc" class="${numState.entryTab === 'calc' ? 'selected' : ''}">${t('တွက်ရန်', 'Calculate')}</button>
        <button type="button" data-num-entry="plans" class="${numState.entryTab === 'plans' ? 'selected' : ''}">Plans</button>
      </nav>

      ${numState.entryTab === 'plans' ? renderSystemPlansOnly('numerology', english, wallet) : `
        <section class="ios-num-hero" style="display:flex;align-items:center;gap:14px;padding:18px;border-radius:22px;background:linear-gradient(135deg,#171a40,#5938b8,#7d3dad);border:1px solid rgba(219,158,59,0.65);color:#fff;margin-bottom:14px;box-shadow:0 8px 20px rgba(89,56,184,0.2)">
          <div style="width:72px;height:72px;border-radius:50%;border:1px solid rgba(219,158,59,0.6);display:grid;place-items:center;flex-shrink:0;font-size:28px;font-weight:800;color:#db9e3b">1–9</div>
          <div>
            <h2 style="margin:0 0 6px;font-size:19px;font-weight:800;color:#fff">${t('ဂဏန်းများထဲက သင့်ဇာတာ', 'Your Chart in Numbers')}</h2>
            <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.85)">${t('မွေးသက္ကရာဇ်၊ အမည်နဲ့ နှစ်အလိုက် သင့်အတွက် အဟောများ', 'Readings from your birth date, name, and target year')}</p>
          </div>
        </section>
        <form id="num-form" class="ak-form-card">
          <div class="ak-form-row">
            <label class="ak-field full">
              <span>${t('အမည် (English)', 'Name (English)')}</span>
              <input name="name" value="${escHtml(numState.name)}" placeholder="${t('အမည်ထည့်ပါ', 'Enter name')}">
            </label>
          </div>
          <div class="ak-form-row three">
            <label class="ak-field"><span>${t('ရက်', 'Day')}</span><input name="day" type="number" min="1" max="31" value="${escHtml(numState.day)}" required></label>
            <label class="ak-field"><span>${t('လ', 'Month')}</span><input name="month" type="number" min="1" max="12" value="${escHtml(numState.month)}" required></label>
            <label class="ak-field"><span>${t('နှစ်', 'Year')}</span><input name="year" type="number" min="1850" max="2150" value="${escHtml(numState.year)}" required></label>
          </div>
          <div class="ak-form-row two">
            <label class="ak-field"><span>${t('ဟောမည့်နှစ်', 'Target Year')}</span><input name="targetYear" type="number" min="1950" max="2150" value="${escHtml(numState.targetYear)}"></label>
            <label class="ak-field"><span>${t('ဟောမည့်လ', 'Target Month')}</span><input name="targetMonth" type="number" min="1" max="12" value="${escHtml(numState.targetMonth)}"></label>
          </div>
          ${numState.error ? `<p class="form-error">${escHtml(numState.error)}</p>` : ''}
          <button type="submit" class="calculate-button" ${numState.loading ? 'disabled' : ''}>
            ${numState.loading ? t('တွက်ချက်နေပါသည်…', 'Calculating…') : t('ဂဏန်းဇာတာတွက်မည်', 'Calculate Numerology')}
          </button>
        </form>
        ${numState.result ? renderNumerologyResult(numState.result, numState.data, english) : ''}
      `}
    </main>
  `;
}

export function bindNumerologyScreen(rerender, onRefreshWallet) {
  document.querySelectorAll('[data-num-entry]').forEach(btn => {
    btn.addEventListener('click', () => {
      numState.entryTab = btn.dataset.numEntry;
      rerender();
    });
  });
  if (numState.entryTab === 'plans') {
    bindMultiSystemPlans(rerender, onRefreshWallet);
    return;
  }
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
