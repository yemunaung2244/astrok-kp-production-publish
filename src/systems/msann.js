import { loadClassicScript, escHtml, toMyDigits } from './script-loader.js';

const MSANN_SAVED_KEY = 'astrok.web.msann.saved.v1';
const today = new Date();

const WEEKDAYS = [
  [0, 'တနင်္ဂနွေ', 'Sunday'],
  [1, 'တနင်္လာ', 'Monday'],
  [2, 'အင်္ဂါ', 'Tuesday'],
  [3, 'ဗုဒ္ဓဟူး', 'Wednesday'],
  [4, 'ကြာသပတေး', 'Thursday'],
  [5, 'သောကြာ', 'Friday'],
  [6, 'စနေ', 'Saturday']
];

const KALA_QUESTIONS = [
  [0, 'လာဘ်လာဘ / ငွေကြေး', 'Wealth & Gains'],
  [1, 'အလုပ်အကိုင် / ရာထူး', 'Career & Status'],
  [2, 'အိမ်ထောင်ရေး / မေတ္တာရေး', 'Love & Marriage'],
  [3, 'ကျန်းမာရေး', 'Health'],
  [4, 'ခရီးသွားလာရေး', 'Travel'],
  [5, 'ပညာရေး / စာမေးပွဲ', 'Education & Exams'],
  [6, 'အမှုအခင်း / ပြိုင်ဆိုင်မှု', 'Disputes & Competition']
];

const MM_MONTHS = ['တန်ခူး', 'ကဆုန်', 'နယုန်', 'ဝါဆို', 'ဝါခေါင်', 'တော်သလင်း', 'သီတင်းကျွတ်', 'တန်ဆောင်မုန်း', 'နတ်တော်', 'ပြာသို', 'တပို့တွဲ', 'တပေါင်း'];

function loadSavedMSann() {
  try {
    const raw = JSON.parse(localStorage.getItem(MSANN_SAVED_KEY) || '[]');
    return Array.isArray(raw) ? raw : [];
  } catch { return []; }
}
function persistSavedMSann(list) {
  try { localStorage.setItem(MSANN_SAVED_KEY, JSON.stringify(list.slice(0, 40))); } catch {}
}

const msannState = {
  subtab: 'sann', // 'sann' | 'anga' | 'kala' | 'calendar' | 'saved'
  name: '',
  day: String(today.getDate()),
  month: String(today.getMonth() + 1),
  year: '1995',
  weekday: String(new Date(1995, today.getMonth(), today.getDate()).getDay()),
  refDay: String(today.getDate()),
  refMonth: String(today.getMonth() + 1),
  refYear: String(today.getFullYear()),
  hour: String(today.getHours()),
  minute: String(today.getMinutes()),
  kalaQuestion: 0,
  calYear: String(today.getFullYear()),
  calMonth: String(today.getMonth() + 1),
  saved: loadSavedMSann(),
  loading: false,
  error: '',
  sannOut: null,
  angaOut: null,
  kalaOut: null
};

async function ensureMSannEngine() {
  if (typeof window.msannSann === 'function') return;
  await loadClassicScript('engines/MSannAndroidRules.js');
  if (typeof window.msannSann !== 'function') {
    throw new Error('M-Sann engine failed to initialize');
  }
}

function calcAge(birthY, birthM, birthD, refY, refM, refD) {
  let age = refY - birthY;
  if (refM < birthM || (refM === birthM && refD < birthD)) age--;
  return Math.max(1, age + 1);
}

function myanmarYearFor(gYear, gMonth, gDay) {
  const afterThingyan = gMonth > 4 || (gMonth === 4 && gDay >= 17);
  return afterThingyan ? gYear - 638 : gYear - 639;
}

function thingyanDates(gYear) {
  // Traditional Myanmar Thingyan dates (April 13–17)
  const myYear = gYear - 638;
  return {
    myYear,
    akyo: `ဧပြီ ၁၃၊ ${toMyDigits(gYear)} (အကြိုနေ့)`,
    akya: `ဧပြီ ၁၄၊ ${toMyDigits(gYear)} (အကျနေ့)`,
    akyat: `ဧပြီ ၁၅၊ ${toMyDigits(gYear)} (အကြတ်နေ့)`,
    atat: `ဧပြီ ၁၆၊ ${toMyDigits(gYear)} (အတက်နေ့)`,
    newYear: `ဧပြီ ၁၇၊ ${toMyDigits(gYear)} (မြန်မာနှစ်ဆန်း ၁ ရက် · ${toMyDigits(myYear)} ခုနှစ်)`
  };
}

function renderSannResult(out, english) {
  const t = (mm, en) => (english ? en : mm);
  const houses = [
    ['အဓိပတိ', out.adipiti || out.aa || ''],
    ['ရာဇ', out.raza || out.bb || ''],
    ['သိုက်', out.thike || out.cc || ''],
    ['ထွန်း', out.ahtun || out.dd || ''],
    ['ဘင်္ဂ', out.bin || out.ee || ''],
    ['မရဏ', out.marana || out.ff || ''],
    ['ပုတိ', out.puti || out.gg || '']
  ];
  const readingBlocks = [
    [t('မဟာဘုတ် အကြွင်းအဟော', 'Mahabote Remainder Reading'), out.remainderReading],
    [t('မူလဇာတာအဟော', 'Natal Reading'), out.natalReading],
    [t('ဂဏသုဒ္ဓိဝိမလဆန်း အဟော', 'Gana Suddhi Vimala Sann'), out.vimalaReading],
    [t('သုံးတန်ပေါ်နိစ် ဟောကိန်း', 'Three-Tier Forecast'), out.threeTierReading],
    [t('လောကဓံ ၈ ပါး သက္ခတ်', 'Eight Worldly Conditions (Lokadham)'), out.lokadham],
    [t('အဌလဂ်ခွင် အဟော', 'Ahta Lagna'), out.ahta]
  ].filter(([, val]) => val && String(val).trim());

  return `
    <section class="ak-card">
      <h3>${t('မဟာဘုတ် ၇ ဌာန', 'Mahabote 7 Houses')}</h3>
      <div class="msann-house-grid">
        ${houses.map(([label, val]) => `
          <div class="msann-house-cell">
            <small>${escHtml(label)}</small>
            <strong>${escHtml(val || '—')}</strong>
          </div>
        `).join('')}
      </div>
      ${out.a5 ? `<p class="ak-highlight-line"><strong>${t('သက်ရောက်', 'Current Thet Yauk')}:</strong> ${escHtml(out.a5)}</p>` : ''}
    </section>
    ${readingBlocks.map(([heading, content]) => `
      <details class="ak-card ak-accordion" open>
        <summary><strong>${escHtml(heading)}</strong></summary>
        <div class="ak-reading-text">${escHtml(String(content)).replace(/\n/g, '<br>')}</div>
      </details>
    `).join('')}
  `;
}

function renderAngaResult(out, english) {
  const t = (mm, en) => (english ? en : mm);
  const cols = [
    [t('တိုင် ၁', 'Col 1'), [out.a, out.b, out.c, out.d, out.e, out.f, out.g]],
    [t('တိုင် ၂', 'Col 2'), [out.aa, out.bb, out.cc, out.dd, out.ee, out.ff, out.gg]],
    [t('တိုင် ၃', 'Col 3'), [out.aaa, out.bbb, out.ccc, out.ddd, out.eee, out.fff, out.ggg]],
    [t('တိုင် ၄', 'Col 4'), [out.aa1, out.aa2, out.aa3, out.aa4, out.aa5, out.aa6, out.aa7]],
    [t('တိုင် ၅', 'Col 5'), [out.s1 || out.b1, out.s2 || out.b2, out.s3 || out.b3, out.s4 || out.b4, out.s5 || out.b5, out.s6 || out.b6, out.s7 || out.b7]]
  ];
  return `
    <section class="ak-card">
      <h3>${t('အင်္ဂဝိဇ္ဇာ ၅ တိုင်စနစ်', '5-Column Anga Vissa Chart')}</h3>
      ${out.textview90 ? `<p class="ak-highlight-line">${escHtml(out.textview90)}</p>` : ''}
      <div class="table-scroll">
        <table class="ak-data-table">
          <thead><tr>${cols.map(([label]) => `<th>${escHtml(label)}</th>`).join('')}</tr></thead>
          <tbody>
            ${Array.from({ length: 7 }, (_, row) => `
              <tr>${cols.map(([, vals]) => `<td>${escHtml(vals[row] ?? '—')}</td>`).join('')}</tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderKalaResult(out, english) {
  const t = (mm, en) => (english ? en : mm);
  return `
    <section class="ak-card">
      <h3>${t('မဟာကာလကြီး ဇယားနှင့် အဟော', 'Maha Kala Chart & Reading')}</h3>
      ${out.chart ? `<div class="msann-kala-chart table-scroll">${out.chart}</div>` : ''}
      ${out.reading ? `<div class="ak-reading-text" style="margin-top:12px">${escHtml(out.reading).replace(/\n/g, '<br>')}</div>` : ''}
    </section>
  `;
}

function renderCalendarTab(english) {
  const t = (mm, en) => (english ? en : mm);
  const y = Number(msannState.calYear) || today.getFullYear();
  const m = Number(msannState.calMonth) || (today.getMonth() + 1);
  const daysInMonth = new Date(y, m, 0).getDate();
  const firstWd = new Date(y, m - 1, 1).getDay();
  const th = thingyanDates(y);
  const myY = myanmarYearFor(y, m, 15);
  const approxMmMonth = MM_MONTHS[(m + 8) % 12];
  const cells = [];
  for (let i = 0; i < firstWd; i++) cells.push('<div class="num-cell empty"></div>');
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = y === today.getFullYear() && m === (today.getMonth() + 1) && d === today.getDate();
    cells.push(`<div class="num-cell ${isToday ? 'filled' : ''}" style="font-size:14px;background:${isToday ? 'var(--ak-primary)' : 'var(--ak-page)'};color:${isToday ? '#fff' : 'var(--ak-ink)'}">${english ? d : toMyDigits(d)}</div>`);
  }
  return `
    <section class="ak-card">
      <div class="ak-form-row two">
        <label class="ak-field"><span>${t('ခုနှစ်', 'Year')}</span><input id="msann-cal-year" type="number" min="1900" max="2100" value="${y}"></label>
        <label class="ak-field"><span>${t('လ', 'Month')}</span>
          <select id="msann-cal-month">
            ${Array.from({ length: 12 }, (_, i) => `<option value="${i + 1}" ${m === i + 1 ? 'selected' : ''}>${i + 1}</option>`).join('')}
          </select>
        </label>
      </div>
      <p class="ak-highlight-line" style="margin-bottom:12px"><strong>${t('မြန်မာသက္ကရာဇ်', 'Myanmar Year')}:</strong> ${toMyDigits(myY)} ခုနှစ် · ${escHtml(approxMmMonth)}လပိုင်း</p>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;text-align:center;font-size:11.5px;font-weight:700;color:var(--ak-primary);margin-bottom:6px">
        ${['နွေ','လာ','ဂါ','ဟူး','တေး','ကြာ','နေ'].map(w => `<span>${w}</span>`).join('')}
      </div>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px">${cells.join('')}</div>
    </section>
    <section class="ak-card">
      <h3>${t(`${toMyDigits(y)} ခုနှစ် သင်္ကြန်ပြက္ခဒိန်`, `${y} Thingyan Calendar`)}</h3>
      <div class="ak-reading-text">
        <p>• ${escHtml(th.akyo)}</p>
        <p>• ${escHtml(th.akya)}</p>
        <p>• ${escHtml(th.akyat)}</p>
        <p>• ${escHtml(th.atat)}</p>
        <p><strong>• ${escHtml(th.newYear)}</strong></p>
      </div>
    </section>
  `;
}

function renderSavedTab(english) {
  const t = (mm, en) => (english ? en : mm);
  if (!msannState.saved.length) {
    return `<section class="ak-card"><p style="margin:0;color:var(--ak-secondary-ink)">${t('သိမ်းထားသော M-Sann ဇာတာ မရှိသေးပါ။', 'No saved M-Sann charts yet.')}</p></section>`;
  }
  return msannState.saved.map((item, idx) => `
    <article class="ak-card" style="display:flex;align-items:center;justify-content:space-between;gap:10px">
      <button type="button" data-open-msann-saved="${idx}" style="flex:1;text-align:left;background:transparent;border:none;cursor:pointer;padding:0">
        <strong style="display:block;color:var(--ak-ink);font-size:15px">${escHtml(item.name || t('အမည်မရှိ', 'Untitled'))}</strong>
        <small style="color:var(--ak-secondary-ink)">${escHtml(item.day)}/${escHtml(item.month)}/${escHtml(item.year)} · ${escHtml(WEEKDAYS[Number(item.weekday)]?.[english ? 2 : 1] || '')}</small>
      </button>
      <button type="button" class="ak-chip" data-del-msann-saved="${idx}" aria-label="Delete">×</button>
    </article>
  `).join('');
}

export function renderMSannScreen(appHeader, english) {
  const t = (mm, en) => (english ? en : mm);
  const subtabs = [
    ['sann', t('မဟာဘုတ် & ဆန်း', 'Mahabote & Sann')],
    ['anga', t('အင်္ဂဝိဇ္ဇာ ၅ တိုင်', 'Anga Vissa 5-Col')],
    ['kala', t('မဟာကာလကြီး', 'Maha Kala')],
    ['calendar', t('မြန်မာ/သင်္ကြန်ပြက္ခဒိန်', 'Calendar')],
    ['saved', `${t('သိမ်းထားသောဇာတာ', 'Saved')} (${msannState.saved.length})`]
  ];

  const showForm = ['sann', 'anga', 'kala'].includes(msannState.subtab);
  return `
    ${appHeader(t('M-Sann (မြန်မာ့ရိုးရာ)', 'M-Sann (Myanmar Traditional)'), true)}
    <main class="ak-sys-main">
      <nav class="ak-subtabs">
        ${subtabs.map(([id, label]) => `<button type="button" data-msann-tab="${id}" class="${msannState.subtab === id ? 'selected' : ''}">${escHtml(label)}</button>`).join('')}
      </nav>

      ${showForm ? `
        <form id="msann-form" class="ak-form-card">
          ${msannState.subtab === 'sann' ? `
            <div class="ak-form-row">
              <label class="ak-field full"><span>${t('ဇာတာရှင်အမည် (သိမ်းဆည်းရန်)', 'Name')}</span><input name="name" value="${escHtml(msannState.name)}" placeholder="${t('အမည်ထည့်ပါ', 'Enter name')}"></label>
            </div>
            <div class="ak-form-row three">
              <label class="ak-field"><span>${t('မွေးရက်', 'Birth Day')}</span><input name="day" type="number" min="1" max="31" value="${escHtml(msannState.day)}" required></label>
              <label class="ak-field"><span>${t('မွေးလ', 'Birth Month')}</span><input name="month" type="number" min="1" max="12" value="${escHtml(msannState.month)}" required></label>
              <label class="ak-field"><span>${t('မွေးနှစ်', 'Birth Year')}</span><input name="year" type="number" min="1900" max="2100" value="${escHtml(msannState.year)}" required></label>
            </div>
            <div class="ak-form-row two">
              <label class="ak-field">
                <span>${t('မွေးနေ့ (နေ့နံ)', 'Birth Weekday')}</span>
                <select name="weekday">
                  ${WEEKDAYS.map(([idx, mm, en]) => `<option value="${idx}" ${Number(msannState.weekday) === idx ? 'selected' : ''}>${escHtml(english ? en : mm)}</option>`).join('')}
                </select>
              </label>
              <label class="ak-field">
                <span>${t('တွက်မည့်နှစ်', 'Reference Year')}</span>
                <input name="refYear" type="number" min="1950" max="2100" value="${escHtml(msannState.refYear)}" required>
              </label>
            </div>
          ` : `
            <div class="ak-form-row three">
              <label class="ak-field">
                <span>${t('နေ့နံ', 'Weekday')}</span>
                <select name="weekday">
                  ${WEEKDAYS.map(([idx, mm, en]) => `<option value="${idx}" ${Number(msannState.weekday) === idx ? 'selected' : ''}>${escHtml(english ? en : mm)}</option>`).join('')}
                </select>
              </label>
              <label class="ak-field"><span>${t('နာရီ (0–23)', 'Hour')}</span><input name="hour" type="number" min="0" max="23" value="${escHtml(msannState.hour)}" required></label>
              <label class="ak-field"><span>${t('မိနစ် (0–59)', 'Minute')}</span><input name="minute" type="number" min="0" max="59" value="${escHtml(msannState.minute)}" required></label>
            </div>
            ${msannState.subtab === 'kala' ? `
              <div class="ak-form-row">
                <label class="ak-field full">
                  <span>${t('မေးခွန်းအမျိုးအစား', 'Question Topic')}</span>
                  <select name="kalaQuestion">
                    ${KALA_QUESTIONS.map(([idx, mm, en]) => `<option value="${idx}" ${Number(msannState.kalaQuestion) === idx ? 'selected' : ''}>${escHtml(english ? en : mm)}</option>`).join('')}
                  </select>
                </label>
              </div>
            ` : ''}
          `}
          ${msannState.error ? `<p class="form-error">${escHtml(msannState.error)}</p>` : ''}
          <button type="submit" class="calculate-button" ${msannState.loading ? 'disabled' : ''}>
            ${msannState.loading ? t('တွက်ချက်နေပါသည်…', 'Calculating…') : t('တွက်ချက်မည်', 'Calculate')}
          </button>
        </form>
      ` : ''}

      <div class="ak-section-stack">
        ${msannState.subtab === 'sann' && msannState.sannOut ? renderSannResult(msannState.sannOut, english) : ''}
        ${msannState.subtab === 'anga' && msannState.angaOut ? renderAngaResult(msannState.angaOut, english) : ''}
        ${msannState.subtab === 'kala' && msannState.kalaOut ? renderKalaResult(msannState.kalaOut, english) : ''}
        ${msannState.subtab === 'calendar' ? renderCalendarTab(english) : ''}
        ${msannState.subtab === 'saved' ? renderSavedTab(english) : ''}
      </div>
    </main>
  `;
}

export function bindMSannScreen(rerender) {
  document.querySelectorAll('[data-msann-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      msannState.subtab = btn.dataset.msannTab;
      msannState.error = '';
      rerender();
    });
  });

  document.querySelector('#msann-cal-year')?.addEventListener('change', e => { msannState.calYear = e.target.value; rerender(); });
  document.querySelector('#msann-cal-month')?.addEventListener('change', e => { msannState.calMonth = e.target.value; rerender(); });

  document.querySelectorAll('[data-open-msann-saved]').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = msannState.saved[Number(btn.dataset.openMsannSaved)];
      if (!item) return;
      msannState.name = item.name || '';
      msannState.day = item.day;
      msannState.month = item.month;
      msannState.year = item.year;
      msannState.weekday = item.weekday;
      msannState.subtab = 'sann';
      rerender();
    });
  });

  document.querySelectorAll('[data-del-msann-saved]').forEach(btn => {
    btn.addEventListener('click', () => {
      msannState.saved.splice(Number(btn.dataset.delMsannSaved), 1);
      persistSavedMSann(msannState.saved);
      rerender();
    });
  });

  document.querySelector('#msann-form')?.addEventListener('submit', async e => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.has('name')) msannState.name = String(fd.get('name')).trim();
    if (fd.has('day')) msannState.day = String(fd.get('day'));
    if (fd.has('month')) msannState.month = String(fd.get('month'));
    if (fd.has('year')) msannState.year = String(fd.get('year'));
    if (fd.has('weekday')) msannState.weekday = String(fd.get('weekday'));
    if (fd.has('refYear')) msannState.refYear = String(fd.get('refYear'));
    if (fd.has('hour')) msannState.hour = String(fd.get('hour'));
    if (fd.has('minute')) msannState.minute = String(fd.get('minute'));
    if (fd.has('kalaQuestion')) msannState.kalaQuestion = Number(fd.get('kalaQuestion'));

    msannState.loading = true;
    msannState.error = '';
    rerender();

    try {
      await ensureMSannEngine();
      if (msannState.subtab === 'sann') {
        const y = Number(msannState.year), m = Number(msannState.month), d = Number(msannState.day);
        const wd = Number(msannState.weekday);
        const ry = Number(msannState.refYear), rm = Number(msannState.refMonth), rd = Number(msannState.refDay);
        const age = calcAge(y, m, d, ry, rm, rd);
        msannState.sannOut = window.msannSann([y, m, d, wd], [ry, rm, rd], age, Number(msannState.hour) || 12, Number(msannState.minute) || 0, wd);
        const entry = { name: msannState.name || `${d}/${m}/${y}`, day: msannState.day, month: msannState.month, year: msannState.year, weekday: msannState.weekday };
        if (!msannState.saved.some(x => x.day === entry.day && x.month === entry.month && x.year === entry.year && x.name === entry.name)) {
          msannState.saved.unshift(entry);
          persistSavedMSann(msannState.saved);
        }
      } else if (msannState.subtab === 'anga') {
        msannState.angaOut = window.msannAnga(Number(msannState.weekday), Number(msannState.hour), Number(msannState.minute));
      } else {
        msannState.kalaOut = window.msannKala(Number(msannState.weekday), Number(msannState.hour), Number(msannState.minute), 0, Number(msannState.kalaQuestion));
      }
    } catch (err) {
      msannState.error = err?.message || 'Calculation failed';
    } finally {
      msannState.loading = false;
      rerender();
    }
  });
}
