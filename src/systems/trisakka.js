import { calculate, normalize, SIGN_MM } from '../kp-core.js';
import { renderKPChart } from '../chart-renderers.js';
import { dashaTimeline } from '../kp-dasha.js';
import { FAVORITE_CITIES } from '../city-catalog.js';
import { planetLabel, degreeLabel } from '../locale.js';
import { escHtml, toMyDigits } from './script-loader.js';

const today = new Date();
const pad = n => String(n).padStart(2, '0');

const triState = {
  name: '',
  day: String(today.getDate()),
  month: String(today.getMonth() + 1),
  year: '1995',
  time: '12:00',
  cityIndex: 0,
  tab: 'charts',
  loading: false,
  error: '',
  result: null
};

const EXALT_SIGN = { 'တနင်္ဂနွေ': 0, 'တနင်္လာ': 1, 'အင်္ဂါ': 9, 'ဗုဒ္ဓဟူး': 5, 'ကြာသပတေး': 3, 'သောကြာ': 11, 'စနေ': 6, 'ရာဟု': 1, 'ကိတ်': 7 };
const DEBIL_SIGN = { 'တနင်္ဂနွေ': 6, 'တနင်္လာ': 7, 'အင်္ဂါ': 3, 'ဗုဒ္ဓဟူး': 11, 'ကြာသပတေး': 9, 'သောကြာ': 5, 'စနေ': 0, 'ရာဟု': 7, 'ကိတ်': 1 };
const OWN_SIGNS = {
  'တနင်္ဂနွေ': [4], 'တနင်္လာ': [3], 'အင်္ဂါ': [0, 7], 'ဗုဒ္ဓဟူး': [2, 5],
  'ကြာသပတေး': [8, 11], 'သောကြာ': [1, 6], 'စနေ': [9, 10], 'ရာဟု': [10], 'ကိတ်': [7]
};
const NAKSHATRA_MM = [
  'အဿဝဏီ', 'ဘရဏီ', 'ကြတ္တိကာ', 'ရောဟဏီ', 'မိဂသီ', 'အဒြ', 'ပုန္နဖုသျှ', 'ဖုသျှ', 'အသလိဿ',
  'မာဃ', 'ပြုဗ္ဗဖလဂုနီ', 'ဥတ္တရဖလဂုနီ', 'ဟဿတ', 'စိတြ', 'သွာတိ', 'ဝိသာခါ', 'အနုရာဓ', 'ဇေဋ္ဌ',
  'မူလ', 'ပြုဗ္ဗာသဠ်', 'ဥတ္တရာသဠ်', 'သရဝဏ်', 'ဓနသိဒ္ဓ', 'သတ္တဘိသျှ', 'ပြုဗ္ဗာဘဒြပိုဒ်', 'ဥတ္တရာဘဒြပိုဒ်', 'ရေဝတီ'
];

function navamsaSignIndex(longitude) {
  const lon = normalize(longitude);
  const sign = Math.floor(lon / 30);
  const pada = Math.floor((lon % 30) / (30 / 9)); // 0..8
  const startByElement = [0, 9, 6, 3]; // Fire=Aries, Earth=Capricorn, Air=Libra, Water=Cancer
  return (startByElement[sign % 4] + pada) % 12;
}

function buildNavamsaChartData(r) {
  const ascSign = navamsaSignIndex(r.cusps[0].longitude);
  const cusps = Array.from({ length: 12 }, (_, i) => ({
    ...r.cusps[i],
    number: i + 1,
    longitude: ((ascSign + i) % 12) * 30 + 15
  }));
  const planets = r.planets.map(p => ({
    ...p,
    longitude: navamsaSignIndex(p.longitude) * 30 + 15
  }));
  return { ...r, cusps, planets };
}

function planetDignity(name, signIndex, english) {
  if (EXALT_SIGN[name] === signIndex) return english ? 'Exalted' : 'ဥစ် (အမြင့်ဆုံး)';
  if (DEBIL_SIGN[name] === signIndex) return english ? 'Debilitated' : 'နိစ် (အားနည်း)';
  if ((OWN_SIGNS[name] || []).includes(signIndex)) return english ? 'Own Sign' : 'ကသစ် (အိမ်ရှင်)';
  return english ? 'Neutral' : 'သာမန်';
}

function houseOfPlanet(planetLon, ascLon) {
  const ascSign = Math.floor(normalize(ascLon) / 30);
  const pSign = Math.floor(normalize(planetLon) / 30);
  return ((pSign - ascSign + 12) % 12) + 1;
}

function renderTrisakkaResult(r, english) {
  const t = (mm, en) => (english ? en : mm);
  const d9 = buildNavamsaChartData(r);
  const tabs = [
    ['charts', t('ရာသီ · ဘာဝ · နဝင်း', 'Rashi · Bhava · D9')],
    ['dignity', t('ဂြိုဟ်ဂုဏ်အဆင့်', 'Dignity')],
    ['dasha', t('ဝိသောတ္ထရီဒသာ', 'Dasha')],
    ['summary', t('ဇာတာသုံးသပ်ချက်', 'Analysis')]
  ];

  let body = '';
  if (triState.tab === 'charts') {
    body = `
      <section class="ak-card">
        <h3>${t('ရာသီစက် (Rashi Chart — D1)', 'Rashi Chart (D1)')}</h3>
        ${renderKPChart(r, 'East Indian', 'Classic', 1, english)}
      </section>
      <section class="ak-card">
        <h3>${t('နဝင်းစက် (Navamsa Chart — D9)', 'Navamsa Chart (D9)')}</h3>
        ${renderKPChart(d9, 'East Indian', 'Lavender', 1, english)}
      </section>
    `;
  } else if (triState.tab === 'dignity') {
    const ascLon = r.cusps[0].longitude;
    body = `
      <section class="ak-card">
        <h3>${t('ဂြိုဟ်တည်နေရာ နှင့် ရာသီဂုဏ်အဆင့်', 'Planetary Positions & Dignity')}</h3>
        <div class="table-scroll">
          <table class="ak-data-table">
            <thead>
              <tr>
                <th>${t('ဂြိုဟ်', 'Planet')}</th>
                <th>${t('ရာသီ / အံသာ', 'Sign / Deg')}</th>
                <th>${t('ဘာဝ', 'House')}</th>
                <th>${t('နဝင်း', 'D9')}</th>
                <th>${t('နက္ခတ်', 'Nakshatra')}</th>
                <th>${t('ဂုဏ်အဆင့်', 'Dignity')}</th>
              </tr>
            </thead>
            <tbody>
              ${r.planets.map(p => {
                const signIdx = Math.floor(normalize(p.longitude) / 30);
                const d9Idx = navamsaSignIndex(p.longitude);
                const nakIdx = Math.floor(normalize(p.longitude) / (360 / 27));
                const house = houseOfPlanet(p.longitude, ascLon);
                return `
                  <tr>
                    <td><strong>${escHtml(planetLabel(p.name, english))}${p.speed < 0 ? ' (R)' : ''}</strong></td>
                    <td>${escHtml(degreeLabel(p.longitude, english))}</td>
                    <td>${escHtml(english ? house : toMyDigits(house))}</td>
                    <td>${escHtml(SIGN_MM[d9Idx])}</td>
                    <td>${escHtml(NAKSHATRA_MM[nakIdx])}</td>
                    <td>${escHtml(planetDignity(p.name, signIdx, english))}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </section>
    `;
  } else if (triState.tab === 'dasha') {
    const now = Date.now();
    const timeline = dashaTimeline(r.planets[1].longitude, r.utc);
    body = `
      <section class="ak-card">
        <h3>${t('ဝိသောတ္ထရီ ထူလဒသာ စဉ် (Vimshottari Maha Dasha)', 'Vimshottari Maha Dasha')}</h3>
        <div class="table-scroll">
          <table class="ak-data-table">
            <thead><tr><th>${t('ထူလဒသာဂြိုဟ်', 'Maha Dasha')}</th><th>${t('စတင်ရက်', 'Start')}</th><th>${t('ပြီးဆုံးရက်', 'End')}</th></tr></thead>
            <tbody>
              ${timeline.map(period => {
                const active = Date.parse(period.start) <= now && now < Date.parse(period.end);
                return `<tr class="${active ? 'ak-active-row' : ''}">
                  <td><strong>${escHtml(planetLabel(period.lord, english))}</strong> ${active ? `<span class="ak-tag good">${t('လက်ရှိ', 'Now')}</span>` : ''}</td>
                  <td>${escHtml(String(period.start).slice(0, 10))}</td>
                  <td>${escHtml(String(period.end).slice(0, 10))}</td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </section>
    `;
  } else {
    const ascSign = Math.floor(normalize(r.cusps[0].longitude) / 30);
    const moonSign = Math.floor(normalize(r.planets[1].longitude) / 30);
    const sunSign = Math.floor(normalize(r.planets[0].longitude) / 30);
    const strong = r.planets.filter(p => {
      const s = Math.floor(normalize(p.longitude) / 30);
      return EXALT_SIGN[p.name] === s || (OWN_SIGNS[p.name] || []).includes(s);
    });
    const weak = r.planets.filter(p => DEBIL_SIGN[p.name] === Math.floor(normalize(p.longitude) / 30));
    body = `
      <section class="ak-card">
        <h3>${t('တြိစက္က အခြေခံ ဇာတာသုံးသပ်ချက်', 'Trisakka Core Chart Summary')}</h3>
        <div class="ak-kv-grid">
          <div><small>${t('လဂ်ရာသီ', 'Ascendant')}</small><strong>${escHtml(SIGN_MM[ascSign])}</strong></div>
          <div><small>${t('စန်းရာသီ', 'Moon Sign')}</small><strong>${escHtml(SIGN_MM[moonSign])}</strong></div>
          <div><small>${t('နေရာသီ', 'Sun Sign')}</small><strong>${escHtml(SIGN_MM[sunSign])}</strong></div>
          <div><small>${t('အယနံသ (Lahiri)', 'Ayanamsa (Lahiri)')}</small><strong>${r.ayanamsa.toFixed(4)}°</strong></div>
        </div>
        <div class="ak-reading-text" style="margin-top:14px">
          <p><strong>${t('အားကောင်းသော ဂြိုဟ်များ (ဥစ် / ကသစ်)', 'Strong Planets (Exalted / Own Sign)')}:</strong> ${strong.length ? strong.map(p => escHtml(planetLabel(p.name, english))).join(english ? ', ' : '၊ ') : t('မရှိပါ', 'None')}</p>
          <p><strong>${t('အားနည်းသော ဂြိုဟ်များ (နိစ်)', 'Debilitated Planets')}:</strong> ${weak.length ? weak.map(p => escHtml(planetLabel(p.name, english))).join(english ? ', ' : '၊ ') : t('မရှိပါ', 'None')}</p>
        </div>
      </section>
    `;
  }

  return `
    <nav class="ak-subtabs">
      ${tabs.map(([id, label]) => `<button type="button" data-tri-tab="${id}" class="${triState.tab === id ? 'selected' : ''}">${escHtml(label)}</button>`).join('')}
    </nav>
    <div class="ak-section-stack">${body}</div>
  `;
}

export function renderTrisakkaScreen(appHeader, english) {
  const t = (mm, en) => (english ? en : mm);
  return `
    ${appHeader(t('တြိစက္ကဇာတာ', 'Trisakka Chart'), true)}
    <main class="ak-sys-main">
      <form id="tri-form" class="ak-form-card">
        <div class="ak-form-row">
          <label class="ak-field full"><span>${t('ဇာတာရှင်အမည်', 'Name')}</span><input name="name" value="${escHtml(triState.name)}" placeholder="${t('အမည်ထည့်ပါ', 'Enter name')}"></label>
        </div>
        <div class="ak-form-row three">
          <label class="ak-field"><span>${t('ရက်', 'Day')}</span><input name="day" type="number" min="1" max="31" value="${escHtml(triState.day)}" required></label>
          <label class="ak-field"><span>${t('လ', 'Month')}</span><input name="month" type="number" min="1" max="12" value="${escHtml(triState.month)}" required></label>
          <label class="ak-field"><span>${t('နှစ်', 'Year')}</span><input name="year" type="number" min="1850" max="2150" value="${escHtml(triState.year)}" required></label>
        </div>
        <div class="ak-form-row two">
          <label class="ak-field"><span>${t('မွေးချိန်', 'Birth Time')}</span><input name="time" type="time" value="${escHtml(triState.time)}" required></label>
          <label class="ak-field">
            <span>${t('မွေးဖွားရာမြို့', 'City')}</span>
            <select name="cityIndex">
              ${FAVORITE_CITIES.map((c, idx) => `<option value="${idx}" ${triState.cityIndex === idx ? 'selected' : ''}>${escHtml(c.name)}</option>`).join('')}
            </select>
          </label>
        </div>
        ${triState.error ? `<p class="form-error">${escHtml(triState.error)}</p>` : ''}
        <button type="submit" class="calculate-button" ${triState.loading ? 'disabled' : ''}>
          ${triState.loading ? t('တွက်ချက်နေပါသည်…', 'Calculating…') : t('တြိစက္ကဇာတာတွက်မည်', 'Calculate Trisakka Chart')}
        </button>
      </form>
      ${triState.result ? renderTrisakkaResult(triState.result, english) : ''}
    </main>
  `;
}

export function bindTrisakkaScreen(rerender) {
  document.querySelector('#tri-form')?.addEventListener('submit', async e => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    triState.name = String(fd.get('name') || '');
    triState.day = String(fd.get('day') || '');
    triState.month = String(fd.get('month') || '');
    triState.year = String(fd.get('year') || '');
    triState.time = String(fd.get('time') || '12:00');
    triState.cityIndex = Number(fd.get('cityIndex') || 0);
    const [hour = '12', min = '0'] = triState.time.split(':');
    const city = FAVORITE_CITIES[triState.cityIndex] || FAVORITE_CITIES[0];

    triState.loading = true;
    triState.error = '';
    rerender();
    try {
      triState.result = await calculate({
        name: triState.name || 'Trisakka',
        year: triState.year, month: triState.month, day: triState.day,
        hour, min, sec: '0',
        lat: String(city.lat), lon: String(city.lon), tz: String(city.tz),
        cityName: city.name,
        ayanamsaIndex: 1, // Lahiri
        isHorary: false, isTSPHorary: false
      });
    } catch (err) {
      triState.error = err?.message || 'Calculation failed';
    } finally {
      triState.loading = false;
      rerender();
    }
  });

  document.querySelectorAll('[data-tri-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      triState.tab = btn.dataset.triTab;
      rerender();
    });
  });
}
