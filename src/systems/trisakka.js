import { calculate, normalize, SIGN_MM } from '../kp-core.js';
import { renderKPChart } from '../chart-renderers.js';
import { dashaTimeline } from '../kp-dasha.js';
import { FAVORITE_CITIES } from '../city-catalog.js';
import { planetLabel, degreeLabel } from '../locale.js';
import { loadClassicScript, escHtml, toMyDigits } from './script-loader.js';
import { renderSystemPlansOnly, bindMultiSystemPlans } from './plans-wallet.js';

const TRI_SAVED_KEY = 'astrok.web.trisakka.saved.v1';
const today = new Date();

function loadSavedTri() {
  try {
    const raw = JSON.parse(localStorage.getItem(TRI_SAVED_KEY) || '[]');
    return Array.isArray(raw) ? raw : [];
  } catch { return []; }
}
function persistSavedTri(list) {
  try { localStorage.setItem(TRI_SAVED_KEY, JSON.stringify(list.slice(0, 40))); } catch {}
}

const triState = {
  entryTab: 'calc', // 'calc' | 'plans'
  name: '',
  gender: 'male',
  day: String(today.getDate()),
  month: String(today.getMonth() + 1),
  year: '1995',
  time: '12:00',
  cityIndex: 0,
  tab: 'charts',
  varga: 'D9',
  dashaPath: [], // 4-level drill-down matching TrisakkaDashaTableView.swift
  saved: loadSavedTri(),
  loading: false,
  readingsLoading: false,
  readings: null,
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
  'အဿဝဏီ', 'ဘရဏီ', 'ကြတ္တိကာ', 'ရောဟဏီ', 'မိဂသီ', 'အဒြ', 'ပုဏ္ဏဖုသျှ', 'ဖုသျှ', 'အဿလိသ',
  'မာဃ', 'ပြုဗ္ဗဖလဂုဏီ', 'ဥတ္တရဖလဂုဏီ', 'ဟသတ္တ', 'စိတြ', 'သွာတိ', 'ဝိသာခါ', 'အနုရာဓ', 'ဇေဋ္ဌ',
  'မူလ', 'ပြုဗ္ဗာသဠ်', 'ဥတ္တရာသဠ်', 'သရဝဏ်', 'ဓနသိဒ္ဓ', 'သတ္တဘိဿ', 'ပြုဗ္ဗဘဒြပိုဒ်', 'ဥတ္တရာဘဒြပိုဒ်', 'ရေဝတီ'
];

function vargaSignIndex(longitude, division) {
  const lon = normalize(longitude);
  const sign = Math.floor(lon / 30);
  const deg = lon % 30;
  const odd = sign % 2 === 0;
  switch (division) {
    case 'D2': return deg < 15 ? (odd ? 4 : 3) : (odd ? 3 : 4);
    case 'D3': return (sign + Math.floor(deg / 10) * 4) % 12;
    case 'D4': return (sign + Math.floor(deg / 7.5) * 3) % 12;
    case 'D7': return ((odd ? sign : (sign + 6) % 12) + Math.floor(deg / (30 / 7))) % 12;
    case 'D9': return ([0, 9, 6, 3][sign % 4] + Math.floor(deg / (30 / 9))) % 12;
    case 'D10': return ((odd ? sign : (sign + 8) % 12) + Math.floor(deg / 3)) % 12;
    case 'D12': return (sign + Math.floor(deg / 2.5)) % 12;
    default: return sign;
  }
}

function buildVargaChartData(r, division) {
  const ascSign = vargaSignIndex(r.cusps[0].longitude, division);
  const cusps = Array.from({ length: 12 }, (_, i) => ({
    ...r.cusps[i],
    number: i + 1,
    longitude: ((ascSign + i) % 12) * 30 + 15
  }));
  const planets = r.planets.map(p => ({
    ...p,
    longitude: vargaSignIndex(p.longitude, division) * 30 + 15
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

function computeYogas(r, english) {
  const ascSign = Math.floor(normalize(r.cusps[0].longitude) / 30);
  const signs = r.planets.map(p => Math.floor(normalize(p.longitude) / 30));
  const yogas = [];
  const jupFromMoon = ((signs[4] - signs[1] + 12) % 12) + 1;
  if ([1, 4, 7, 10].includes(jupFromMoon)) {
    yogas.push([english ? 'Gajakesari Yoga' : 'ဂဇကေသရီယုဂ်', english ? 'Jupiter in Kendra from Moon — wisdom, reputation, and lasting prosperity.' : 'ကြာသပတေးသည် စန်းမှ ကိန်းအိမ် (၁၊ ၄၊ ၇၊ ၁၀) တွင် ရပ်တည်၍ ဉာဏ်ပညာ၊ ဂုဏ်သိက္ခာနှင့် ကြွယ်ဝမှုကို ပေးသည်။']);
  }
  if (signs[0] === signs[3]) {
    yogas.push([english ? 'Budhaditya Yoga' : 'ဗုဓာဒိတျယုဂ်', english ? 'Sun and Mercury conjoined — sharp intellect, communication skill, and leadership.' : 'တနင်္ဂနွေနှင့် ဗုဒ္ဓဟူး ပူးယှဉ်၍ ဉာဏ်ထက်မြက်ခြင်း၊ စကားပြောကောင်းခြင်းနှင့် စီမံခန့်ခွဲနိုင်စွမ်း ရှိသည်။']);
  }
  const pmNames = [
    [2, 'ရုစကယုဂ် (Ruchaka Yoga)', 'အင်္ဂါသည် ကိန်းအိမ်တွင် ဥစ်/ကသစ်ရပ်၍ ရဲရင့်မှု၊ ခေါင်းဆောင်မှုနှင့် စွမ်းရည်ထက်မြက်သည်။'],
    [3, 'ဘဒြယုဂ် (Bhadra Yoga)', 'ဗုဒ္ဓဟူးသည် ကိန်းအိမ်တွင် ဥစ်/ကသစ်ရပ်၍ ပညာဉာဏ်၊ စီးပွားရေးနှင့် ဟောပြောစွမ်းရည် ထူးချွန်သည်။'],
    [4, 'ဟံသယုဂ် (Hamsa Yoga)', 'ကြာသပတေးသည် ကိန်းအိမ်တွင် ဥစ်/ကသစ်ရပ်၍ ကိုယ်ကျင့်တရား၊ ပညာနှင့် ချမ်းသာသုခ ပြည့်စုံသည်။'],
    [5, 'မာလဗျယုဂ် (Malavya Yoga)', 'သောကြာသည် ကိန်းအိမ်တွင် ဥစ်/ကသစ်ရပ်၍ စည်းစိမ်၊ အနုပညာနှင့် အိမ်ထောင်ရေးသာယာသည်။'],
    [6, 'သသယုဂ် (Sasa Yoga)', 'စနေသည် ကိန်းအိမ်တွင် ဥစ်/ကသစ်ရပ်၍ ဩဇာအာဏာ၊ ဇွဲလုံ့လနှင့် ရေရှည်အောင်မြင်မှု ရရှိသည်။']
  ];
  for (const [idx, title, desc] of pmNames) {
    const p = r.planets[idx];
    const h = ((signs[idx] - ascSign + 12) % 12) + 1;
    if ([1, 4, 7, 10].includes(h) && (EXALT_SIGN[p.name] === signs[idx] || (OWN_SIGNS[p.name] || []).includes(signs[idx]))) {
      yogas.push([title, desc]);
    }
  }
  return yogas;
}

async function computeFullTrisakkaReadings(r, english) {
  await loadClassicScript('engines/TrisakkaAndroidReadings.js');
  if (typeof window.buildReadings !== 'function') return [];
  const p = r.profile;
  const order = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const planets = order.map(i => ({
    longitude: normalize(r.planets[i].longitude),
    speed: Number(r.planets[i].speed || 0),
    retrograde: Number(r.planets[i].speed || 0) < 0
  }));
  const cusps = r.cusps.map(c => normalize(c.longitude));
  window.input = { planets, cusps, ayanamsa: r.ayanamsa };
  window.en = Boolean(english);
  window.maleNative = triState.gender !== 'female';
  window.readingBirthDay = Number(p.day);
  window.readingBirthMonth = Number(p.month);
  window.readingBirthYear = Number(p.year);
  window.selectedHour = Number(p.hour);
  window.selectedMinute = Number(p.min);
  window.selectedSecond = Number(p.sec || 0);
  window.readingTimeZone = Number(p.tz);
  window.categories = [];
  if (typeof window.astrokTransit !== 'function') {
    window.astrokTransit = () => NaN;
  }
  try { window.buildReadings(); } catch (e) { console.warn('Trisakka readings partial:', e); }
  return Array.isArray(window.categories) ? [...window.categories] : [];
}

function fmtDashaDate(iso) {
  const s = String(iso || '').slice(0, 10);
  const [y, m, d] = s.split('-');
  return y && m && d ? `${d}/${m}/${y}` : s;
}

async function exportTrisakkaEbook(r, english) {
  const readings = triState.readings || await computeFullTrisakkaReadings(r, english).catch(() => []);
  const d9 = buildVargaChartData(r, 'D9');
  const yogas = computeYogas(r, english);
  const ascLon = r.cusps[0].longitude;
  const maha = dashaTimeline(r.planets[1].longitude, r.utc);
  const html = `<!doctype html><html lang="${english ? 'en' : 'my'}"><head><meta charset="utf-8"><title>${escHtml(triState.name || 'Trisakka')} — AstroK Pro Ebook</title>
<style>body{font-family:-apple-system,BlinkMacSystemFont,'Noto Sans Myanmar',sans-serif;max-width:800px;margin:0 auto;padding:28px;color:#1b1b2f;line-height:1.65}
.cover{background:linear-gradient(135deg,#2a2161,#5a42b8);color:#fff;padding:42px 28px;border-radius:18px;text-align:center;margin-bottom:28px}
h1,h2,h3{color:#30267a} .card{border:1px solid #e2e0ef;border-radius:14px;padding:18px;margin-bottom:18px}
table{width:100%;border-collapse:collapse;font-size:13px} th,td{border:1px solid #ddd;padding:7px 8px;text-align:left} th{background:#303f9f;color:#fff}
@media print{.no-print{display:none}}</style></head><body>
<div class="cover"><div style="letter-spacing:2px;font-size:12px;opacity:.85">ASTROK PRO · TRISAKKA EBOOK</div>
<h1 style="color:#fff;margin:12px 0">${escHtml(triState.name || 'တြိစက္ကဇာတာ')}</h1>
<p>${escHtml(triState.day)}/${escHtml(triState.month)}/${escHtml(triState.year)} · ${escHtml(triState.time)} · ${escHtml(r.profile?.cityName || '')}</p></div>
<div class="card"><h2>ရာသီစက် (D1)</h2>${renderKPChart(r, 'East Indian', 'Classic', 1, english)}</div>
<div class="card"><h2>နဝင်းစက် (D9)</h2>${renderKPChart(d9, 'East Indian', 'Lavender', 1, english)}</div>
<div class="card"><h2>ဂြိုဟ်တည်နေရာနှင့် ဂုဏ်အဆင့်</h2><table><thead><tr><th>ဂြိုဟ်</th><th>ရာသီ/အံသာ</th><th>ဘာဝ</th><th>နဝင်း</th><th>နက္ခတ်</th><th>ဂုဏ်အဆင့်</th></tr></thead><tbody>
${r.planets.map(p => {
  const s = Math.floor(normalize(p.longitude) / 30);
  return `<tr><td>${escHtml(planetLabel(p.name, english))}</td><td>${escHtml(degreeLabel(p.longitude, english))}</td><td>${houseOfPlanet(p.longitude, ascLon)}</td><td>${escHtml(SIGN_MM[vargaSignIndex(p.longitude, 'D9')])}</td><td>${escHtml(NAKSHATRA_MM[Math.floor(normalize(p.longitude) / (360 / 27))])}</td><td>${escHtml(planetDignity(p.name, s, english))}</td></tr>`;
}).join('')}</tbody></table></div>
<div class="card"><h2>ဝိံသောတ္တရီ ဒသာ</h2><table><thead><tr><th>မဟာဒသာ</th><th>အစ</th><th>အဆုံး</th></tr></thead><tbody>
${maha.map(p => `<tr><td>${escHtml(planetLabel(p.lord, english))}</td><td>${escHtml(fmtDashaDate(p.start))}</td><td>${escHtml(fmtDashaDate(p.end))}</td></tr>`).join('')}</tbody></table></div>
${yogas.length ? `<div class="card"><h2>ယုဂ်များ</h2>${yogas.map(([t, d]) => `<p><strong>✦ ${escHtml(t)}</strong><br>${escHtml(d)}</p>`).join('')}</div>` : ''}
${readings.map(c => `<div class="card"><h3>${escHtml(c.title || '')}</h3><div>${escHtml(c.content || '').replace(/\n/g, '<br>')}</div></div>`).join('')}
</body></html>`;
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${(triState.name || 'Trisakka').replace(/[^\w\u1000-\u109F-]+/g, '_')}_Trisakka_Ebook.html`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

function getDashaListForPath(r) {
  if (triState.dashaPath.length) {
    const last = triState.dashaPath[triState.dashaPath.length - 1];
    return Array.isArray(last?.children) ? last.children : [];
  }
  return dashaTimeline(r.planets[1].longitude, r.utc);
}

function renderTrisakkaResult(r, english) {
  const t = (mm, en) => (english ? en : mm);
  const d9 = buildVargaChartData(r, 'D9');
  const tabs = [
    ['charts', t('ရာသီ · ဘာဝ · နဝင်း', 'Rashi · Bhava · D9')],
    ['vargas', t('ဝဂ္ဂစက်များ', 'Varga Charts')],
    ['dignity', t('ဂုဏ်အဆင့် & ဗလ', 'Dignity & Bala')],
    ['dasha', t('ဝိံသောတ္တရီဒသာ', 'Dasha')],
    ['readings', t('ယုဂ် & အဟောအပြည့်အစုံ', 'Yogas & Readings')]
  ];

  let body = '';
  if (triState.tab === 'charts') {
    body = `
      <div style="display:flex;justify-content:flex-end">
        <button type="button" id="tri-ebook-export-btn" class="ak-chip selected">📘 ${t('တြိစက္က Ebook ထုတ်မည်', 'Export Trisakka Ebook')}</button>
      </div>
      <section class="ak-card">
        <h3>${t('ရာသီစက် (Rashi Chart — D1)', 'Rashi Chart (D1)')}</h3>
        ${renderKPChart(r, 'East Indian', 'Classic', 1, english)}
      </section>
      <section class="ak-card">
        <h3>${t('ဘာဝစက် (Bhava Chart)', 'Bhava Chart')}</h3>
        ${renderKPChart(r, 'South Indian', 'Emerald', 1, english)}
      </section>
      <section class="ak-card">
        <h3>${t('နဝင်းစက် (Navamsa Chart — D9)', 'Navamsa Chart (D9)')}</h3>
        ${renderKPChart(d9, 'East Indian', 'Lavender', 1, english)}
      </section>
    `;
  } else if (triState.tab === 'vargas') {
    const vargaList = [
      ['D2', 'D2 ဟိုရာ (Hora)'], ['D3', 'D3 တြိင်း (Drekkana)'], ['D4', 'D4 စတုတ္ထံသ (Chaturthamsa)'],
      ['D7', 'D7 သတ္တံသ (Saptamsa)'], ['D9', 'D9 နဝင်း (Navamsa)'], ['D10', 'D10 ဒသံသ (Dasamsa)'], ['D12', 'D12 ဒွါဒသံသ (Dwadasamsa)']
    ];
    const vChart = buildVargaChartData(r, triState.varga);
    body = `
      <section class="ak-card">
        <div class="ak-chip-row" style="margin-top:0;margin-bottom:12px">
          ${vargaList.map(([id, label]) => `<button type="button" class="ak-chip ${triState.varga === id ? 'selected' : ''}" data-tri-varga="${id}">${escHtml(label)}</button>`).join('')}
        </div>
        <h3>${escHtml(vargaList.find(v => v[0] === triState.varga)?.[1] || triState.varga)}</h3>
        ${renderKPChart(vChart, 'East Indian', 'Lavender', 1, english)}
      </section>
    `;
  } else if (triState.tab === 'dignity') {
    const ascLon = r.cusps[0].longitude;
    body = `
      <section class="ak-card">
        <h3>${t('ဂြိုဟ်တည်နေရာ၊ ရာသီဂုဏ်အဆင့် နှင့် ဂြဟဗလ', 'Planetary Dignity & Strength')}</h3>
        <div class="table-scroll">
          <table class="ak-data-table">
            <thead>
              <tr>
                <th>${t('ဂြိုဟ်', 'Planet')}</th><th>${t('ရာသီ / အံသာ', 'Sign / Deg')}</th><th>${t('ဘာဝ', 'House')}</th>
                <th>${t('နဝင်း', 'D9')}</th><th>${t('နက္ခတ်', 'Nakshatra')}</th><th>${t('ဂုဏ်အဆင့်', 'Dignity')}</th>
              </tr>
            </thead>
            <tbody>
              ${r.planets.map(p => {
                const signIdx = Math.floor(normalize(p.longitude) / 30);
                const d9Idx = vargaSignIndex(p.longitude, 'D9');
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
    const levelTitles = english
      ? ['Maha Dasa', 'Buti', 'Andra Dasa', 'Pyantantra Dasa']
      : ['မဟာဒသာ', 'ဘုတ္တိဒသာ', 'အန္တရဒသာ', 'ပြတ္တန္တရဒသာ'];
    const level = triState.dashaPath.length;
    const periods = getDashaListForPath(r);
    const prefix = triState.dashaPath.map(p => planetLabel(p.lord, english)).join(' - ');
    body = `
      <section class="ak-card">
        <h3>${t('ဝိံသောတ္တရီ ဒသာစနစ်', 'Vimshottari Dasha')}</h3>
        <div class="table-scroll">
          <table class="ak-data-table">
            <thead>
              <tr style="background:#303f9f;color:#fff">
                <th style="background:#303f9f;color:#fff">${escHtml(levelTitles[level] || levelTitles[0])}</th>
                <th style="background:#303f9f;color:#fff">${t('ဒသာအစ', 'Start')}</th>
                <th style="background:#303f9f;color:#fff">${t('ဒသာအဆုံး', 'End')}</th>
              </tr>
            </thead>
            <tbody>
              ${periods.map((period, idx) => {
                const active = Date.parse(period.start) <= now && now < Date.parse(period.end);
                const label = prefix ? `${prefix} - ${planetLabel(period.lord, english)}` : planetLabel(period.lord, english);
                return `<tr class="${active ? 'ak-active-row' : ''}" data-tri-dasha-idx="${idx}" style="${level < 3 ? 'cursor:pointer' : ''};${active ? 'color:#d32f2f;font-weight:700' : ''}">
                  <td>${escHtml(label)}</td>
                  <td>${escHtml(fmtDashaDate(period.start))}</td>
                  <td>${escHtml(fmtDashaDate(period.end))}</td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
        ${level > 0 ? `
          <button type="button" id="tri-dasha-back" class="ios-text-link-btn" style="width:100%;padding:14px 0;margin-top:8px">
            &lt;&lt; ${english ? `Back to ${levelTitles[level - 1]}` : `${levelTitles[level - 1]}သို့ ပြန်သွားရန်`}
          </button>
        ` : ''}
      </section>
    `;
  } else {
    const yogas = computeYogas(r, english);
    body = `
      <section class="ak-card">
        <h3>${t('ဇာတာတွင် ပါဝင်သော ယုဂ်များ (Yogas)', 'Detected Yogas')}</h3>
        ${yogas.length ? yogas.map(([title, desc]) => `
          <div style="margin-bottom:10px;padding:10px 12px;background:var(--ak-primary-soft);border-radius:12px">
            <strong style="display:block;color:var(--ak-primary);margin-bottom:3px">✦ ${escHtml(title)}</strong>
            <span style="font-size:13.5px;color:var(--ak-ink)">${escHtml(desc)}</span>
          </div>
        `).join('') : `<p style="margin:0;color:var(--ak-secondary-ink)">${t('အထူးယုဂ် (ဂဇကေသရီ / ဗုဓာဒိတျ / ပဉ္စမဟာပုရိသ) မတွေ့ပါ။', 'No primary classical yogas detected.')}</p>`}
      </section>
      ${triState.readingsLoading ? `<div class="chart-pending">${t('တြိစက္က အဟောစာတမ်းအပြည့်အစုံ တွက်နေပါသည်…', 'Generating full Trisakka readings…')}</div>` : ''}
      ${(triState.readings || []).map(cat => `
        <details class="ak-card ak-accordion">
          <summary><strong>${escHtml(cat.title || '')}</strong>${cat.subtitle ? ` <small style="color:var(--ak-secondary-ink)">· ${escHtml(cat.subtitle)}</small>` : ''}</summary>
          <div class="ak-reading-text">${escHtml(cat.content || '').replace(/\n/g, '<br>')}</div>
        </details>
      `).join('')}
    `;
  }

  return `
    <nav class="ak-subtabs">
      ${tabs.map(([id, label]) => `<button type="button" data-tri-tab="${id}" class="${triState.tab === id ? 'selected' : ''}">${escHtml(label)}</button>`).join('')}
    </nav>
    <div class="ak-section-stack">${body}</div>
  `;
}

export function renderTrisakkaScreen(appHeader, english, wallet) {
  const t = (mm, en) => (english ? en : mm);
  return `
    ${appHeader(t('တြိစက္ကဇာတာ', 'Trisakka Chart'), true)}
    <main class="ak-sys-main">
      <nav class="ak-subtabs" style="margin-bottom:12px">
        <button type="button" data-tri-entry="calc" class="${triState.entryTab === 'calc' ? 'selected' : ''}">${t('တွက်ရန်', 'Calculate')}</button>
        <button type="button" data-tri-entry="plans" class="${triState.entryTab === 'plans' ? 'selected' : ''}">Plans</button>
      </nav>

      ${triState.entryTab === 'plans' ? renderSystemPlansOnly('trisakka', english, wallet) : `
        <form id="tri-form" class="ak-form-card">
          <div class="ak-form-row two">
            <label class="ak-field"><span>${t('ဇာတာရှင်အမည်', 'Name')}</span><input name="name" value="${escHtml(triState.name)}" placeholder="${t('အမည်ထည့်ပါ', 'Enter name')}"></label>
            <label class="ak-field">
              <span>${t('ကျား / မ', 'Gender')}</span>
              <select name="gender">
                <option value="male" ${triState.gender === 'male' ? 'selected' : ''}>${t('ကျား', 'Male')}</option>
                <option value="female" ${triState.gender === 'female' ? 'selected' : ''}>${t('မ', 'Female')}</option>
              </select>
            </label>
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

        ${triState.saved.length ? `
          <details class="ak-card ak-accordion">
            <summary><strong>📂 ${t(`သိမ်းထားသော တြိစက္ကဇာတာများ (${toMyDigits(triState.saved.length)})`, `Saved Trisakka Charts (${triState.saved.length})`)}</strong></summary>
            <div class="ak-section-stack" style="margin-top:8px">
              ${triState.saved.map((item, idx) => `
                <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 0;border-bottom:1px solid var(--ak-divider)">
                  <button type="button" data-open-tri-saved="${idx}" style="flex:1;text-align:left;background:transparent;border:none;cursor:pointer;padding:0">
                    <strong style="display:block;color:var(--ak-ink)">${escHtml(item.name)}</strong>
                    <small style="color:var(--ak-secondary-ink)">${escHtml(item.day)}/${escHtml(item.month)}/${escHtml(item.year)} · ${escHtml(item.time)}</small>
                  </button>
                  <button type="button" class="ak-chip" data-del-tri-saved="${idx}">×</button>
                </div>
              `).join('')}
            </div>
          </details>
        ` : ''}

        ${triState.result ? renderTrisakkaResult(triState.result, english) : ''}
      `}
    </main>
  `;
}

export function bindTrisakkaScreen(rerender, onRefreshWallet, english = false) {
  document.querySelectorAll('[data-tri-entry]').forEach(btn => {
    btn.addEventListener('click', () => {
      triState.entryTab = btn.dataset.triEntry;
      rerender();
    });
  });

  if (triState.entryTab === 'plans') {
    bindMultiSystemPlans(rerender, onRefreshWallet);
    return;
  }

  document.querySelector('#tri-form')?.addEventListener('submit', async e => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    triState.name = String(fd.get('name') || '');
    triState.gender = String(fd.get('gender') || 'male');
    triState.day = String(fd.get('day') || '');
    triState.month = String(fd.get('month') || '');
    triState.year = String(fd.get('year') || '');
    triState.time = String(fd.get('time') || '12:00');
    triState.cityIndex = Number(fd.get('cityIndex') || 0);
    const [hour = '12', min = '0'] = triState.time.split(':');
    const city = FAVORITE_CITIES[triState.cityIndex] || FAVORITE_CITIES[0];

    triState.loading = true;
    triState.error = '';
    triState.readings = null;
    triState.dashaPath = [];
    rerender();
    try {
      triState.result = await calculate({
        name: triState.name || 'Trisakka',
        year: triState.year, month: triState.month, day: triState.day,
        hour, min, sec: '0',
        lat: String(city.lat), lon: String(city.lon), tz: String(city.tz),
        cityName: city.name,
        ayanamsaIndex: 1,
        isHorary: false, isTSPHorary: false
      });
      const entry = { name: triState.name || `${triState.day}/${triState.month}/${triState.year}`, gender: triState.gender, day: triState.day, month: triState.month, year: triState.year, time: triState.time, cityIndex: triState.cityIndex };
      if (!triState.saved.some(x => x.day === entry.day && x.month === entry.month && x.year === entry.year && x.time === entry.time && x.name === entry.name)) {
        triState.saved.unshift(entry);
        persistSavedTri(triState.saved);
      }
    } catch (err) {
      triState.error = err?.message || 'Calculation failed';
    } finally {
      triState.loading = false;
      rerender();
    }
  });

  document.querySelector('#tri-ebook-export-btn')?.addEventListener('click', () => {
    if (triState.result) void exportTrisakkaEbook(triState.result, english);
  });

  document.querySelectorAll('[data-tri-dasha-idx]').forEach(row => {
    row.addEventListener('click', () => {
      if (!triState.result || triState.dashaPath.length >= 3) return;
      const list = getDashaListForPath(triState.result);
      const picked = list[Number(row.dataset.triDashaIdx)];
      if (picked) {
        triState.dashaPath = [...triState.dashaPath, picked];
        rerender();
      }
    });
  });

  document.querySelector('#tri-dasha-back')?.addEventListener('click', () => {
    if (triState.dashaPath.length) {
      triState.dashaPath = triState.dashaPath.slice(0, -1);
      rerender();
    }
  });

  document.querySelectorAll('[data-tri-tab]').forEach(btn => {
    btn.addEventListener('click', async () => {
      triState.tab = btn.dataset.triTab;
      if (triState.tab === 'readings' && triState.result && !triState.readings && !triState.readingsLoading) {
        triState.readingsLoading = true;
        rerender();
        try {
          triState.readings = await computeFullTrisakkaReadings(triState.result, english);
        } catch {
          triState.readings = [];
        } finally {
          triState.readingsLoading = false;
          rerender();
        }
      } else {
        rerender();
      }
    });
  });

  document.querySelectorAll('[data-tri-varga]').forEach(btn => {
    btn.addEventListener('click', () => {
      triState.varga = btn.dataset.triVarga;
      rerender();
    });
  });

  document.querySelectorAll('[data-open-tri-saved]').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = triState.saved[Number(btn.dataset.openTriSaved)];
      if (!item) return;
      Object.assign(triState, { name: item.name, gender: item.gender || 'male', day: item.day, month: item.month, year: item.year, time: item.time, cityIndex: item.cityIndex || 0 });
      rerender();
    });
  });

  document.querySelectorAll('[data-del-tri-saved]').forEach(btn => {
    btn.addEventListener('click', () => {
      triState.saved.splice(Number(btn.dataset.delTriSaved), 1);
      persistSavedTri(triState.saved);
      rerender();
    });
  });
}
