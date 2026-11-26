import { calculate, normalize, SIGN_MM } from '../kp-core.js';
import { FAVORITE_CITIES } from '../city-catalog.js';
import { escHtml, toMyDigits } from './script-loader.js';

const today = new Date();
const pad = n => String(n).padStart(2, '0');

const muhuratState = {
  date: `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`,
  time: `${pad(today.getHours())}:${pad(today.getMinutes())}`,
  cityIndex: 0,
  ceremony: 'business',
  tab: 'panchang',
  showHelp: false,
  loading: false,
  error: '',
  data: null
};

const VARA_MM = ['တနင်္ဂနွေ', 'တနင်္လာ', 'အင်္ဂါ', 'ဗုဒ္ဓဟူး', 'ကြာသပတေး', 'သောကြာ', 'စနေ'];
const VARA_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const NAKSHATRA_MM = [
  'အဿဝဏီ', 'ဘရဏီ', 'ကြတ္တိကာ', 'ရောဟဏီ', 'မိဂသီ', 'အဒြ', 'ပုဏ္ဏဖုသျှ', 'ဖုသျှ', 'အဿလိသ',
  'မာဃ', 'ပြုဗ္ဗဖလဂုဏီ', 'ဥတ္တရဖလဂုဏီ', 'ဟသတ္တ', 'စိတြ', 'သွာတိ', 'ဝိသာခါ', 'အနုရာဓ', 'ဇေဋ္ဌ',
  'မူလ', 'ပြုဗ္ဗာသဠ်', 'ဥတ္တရာသဠ်', 'သရဝဏ်', 'ဓနသိဒ္ဓ', 'သတ္တဘိဿ', 'ပြုဗ္ဗဘဒြပိုဒ်', 'ဥတ္တရာဘဒြပိုဒ်', 'ရေဝတီ'
];
const TITHI_MM = [
  'ပဋိပဒါ', 'ဒုတိယာ', 'တတိယာ', 'စတုတ္ထီ', 'ပဉ္စမီ', 'ဆဋ္ဌီ', 'သတ္တမီ', 'အဋ္ဌမီ',
  'နဝမီ', 'ဒသမီ', 'ဧကာဒသီ', 'ဒွါဒသီ', 'တြယောဒသီ', 'စတုဒ္ဒသီ', 'လပြည့် / လကွယ်'
];
const YOGA_MM = [
  'ဝိသကမ္ဘ', 'ပီတိ', 'အာယုသ္မ', 'သောဘဂျ', 'သောဘန', 'အတိဂဏ္ဍ', 'သုကမ္မ', 'ဓိတိ', 'သူလ',
  'ဂဏ္ဍ', 'ဝုဍ္ဎိ', 'ဓုဝ', 'ဗျာဃာတ', 'ဟဿန', 'ဝဇီရ', 'သိဒ္ဓိ', 'ဗျတိပါတ', 'ဝရိယာန',
  'ပရိဃ', 'သိဝ', 'သိဒ္ဓ', 'သာဓျ', 'သုဘ', 'သုက္က', 'ဗြဟ္မ', 'ဣန္ဒ', 'ဝေဓိတိ'
];
const KARANA_RECURRING = ['ဗဝ', 'ဗာလဝ', 'ကောလဝ', 'တိုင်တိလ', 'ဂရ', 'ဝဏိဇ', 'ဝိဋ္ဌိ'];
const HORA_ORDER_MM = ['တနင်္ဂနွေ', 'သောကြာ', 'ဗုဒ္ဓဟူး', 'တနင်္လာ', 'စနေ', 'ကြာသပတေး', 'အင်္ဂါ'];
const HORA_START_IDX = [0, 3, 6, 2, 5, 1, 4];
const CHOGHADIYA_DAY = [
  ['ဥဒွေဂ', 'စလ', 'လာဘ', 'အမရိတ', 'ကာလ', 'သုဘ', 'ရောဂ', 'ဥဒွေဂ'],
  ['အမရိတ', 'ကာလ', 'သုဘ', 'ရောဂ', 'ဥဒွေဂ', 'စလ', 'လာဘ', 'အမရိတ'],
  ['ရောဂ', 'ဥဒွေဂ', 'စလ', 'လာဘ', 'အမရိတ', 'ကာလ', 'သုဘ', 'ရောဂ'],
  ['လာဘ', 'အမရိတ', 'ကာလ', 'သုဘ', 'ရောဂ', 'ဥဒွေဂ', 'စလ', 'လာဘ'],
  ['သုဘ', 'ရောဂ', 'ဥဒွေဂ', 'စလ', 'လာဘ', 'အမရိတ', 'ကာလ', 'သုဘ'],
  ['စလ', 'လာဘ', 'အမရိတ', 'ကာလ', 'သုဘ', 'ရောဂ', 'ဥဒွေဂ', 'စလ'],
  ['ကာလ', 'သုဘ', 'ရောဂ', 'ဥဒွေဂ', 'စလ', 'လာဘ', 'အမရိတ', 'ကာလ']
];
const GOOD_CHOG = new Set(['အမရိတ', 'သုဘ', 'လာဘ', 'စလ']);

const APPOINTMENT_LORDS = ['ကိတ်', 'သောကြာ', 'တနင်္ဂနွေ', 'တနင်္လာ', 'အင်္ဂါ', 'ရာဟု', 'ကြာသပတေး', 'စနေ', 'ဗုဒ္ဓဟူး'];
const APPOINTMENT_TRAITS = [
  'နက်နက်ရှိုင်းရှိုင်း စူးစမ်းတတ်ခြင်းနှင့် အာရုံစူးစိုက်နိုင်ခြင်း',
  'အနုပညာဖန်တီးတတ်ခြင်းနှင့် လူမှုဆက်ဆံရေး ပြေပြစ်ခြင်း',
  'ဦးဆောင်လိုစိတ်နှင့် တာဝန်ယူတတ်ခြင်း',
  'အခြားသူတို့၏ ခံစားချက်ကို နားလည်ပေးတတ်ခြင်းနှင့် ဂရုစိုက်တတ်ခြင်း',
  'ရဲရင့်စွာ စတင်လုပ်ဆောင်ခြင်းနှင့် အခက်အခဲကို ရင်ဆိုင်တတ်ခြင်း',
  'အသစ်အဆန်းများ စူးစမ်းလိုခြင်းနှင့် သမားရိုးကျမဟုတ်သော နည်းလမ်းများ စဉ်းစားတတ်ခြင်း',
  'ပညာရှာဖွေလိုစိတ်နှင့် သိထားသမျှ မျှဝေလိုစိတ်',
  'စည်းကမ်းရှိခြင်းနှင့် ရေရှည်ဇွဲရှိခြင်း',
  'သင်ယူလွယ်ခြင်းနှင့် အတွေးအမြင်ကို ရှင်းလင်းစွာ ပြောဆိုတတ်ခြင်း'
];

const CEREMONIES = [
  ['business', 'ဆိုင်ဖွင့် / လုပ်ငန်းသစ်စတင်', 'Business Opening', [0, 3, 7, 10, 11, 12, 14, 16, 20, 21, 22, 25, 26]],
  ['marriage', 'အိမ်ထောင်မင်္ဂလာ', 'Marriage', [3, 4, 9, 11, 12, 14, 16, 18, 20, 25, 26]],
  ['house', 'အိမ်သစ်တက်မင်္ဂလာ', 'Housewarming', [0, 3, 4, 11, 16, 20, 25, 26]],
  ['naming', 'အမည်ပေးမင်္ဂလာ', 'Naming Ceremony', [0, 3, 4, 6, 7, 11, 12, 13, 14, 16, 20, 21, 22, 23, 25, 26]],
  ['vehicle', 'ယာဉ်ဝယ်ယူမုဟုတ္တ', 'Vehicle Purchase', [6, 14, 21, 22, 23]],
  ['property', 'အိမ်ခြံမြေ ဝယ်ယူမုဟုတ္တ', 'Property Purchase', [3, 4, 6, 7, 11, 16, 20, 25, 26]]
];

function fmtMinutes(totalMins) {
  const m = ((Math.round(totalMins) % 1440) + 1440) % 1440;
  return `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;
}

function slotWindow(startMin, endMin, slotIndex, totalSlots) {
  const step = (endMin - startMin) / totalSlots;
  return [fmtMinutes(startMin + slotIndex * step), fmtMinutes(startMin + (slotIndex + 1) * step)];
}

async function computeMuhurat(dateStr, timeStr, city) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const [hh = 6, mm = 0] = timeStr.split(':').map(Number);
  const dt = new Date(y, m - 1, d, hh, mm, 0);
  const wd = dt.getDay();

  const res = await calculate({
    name: 'Muhurat',
    year: String(y), month: String(m), day: String(d),
    hour: String(hh), min: String(mm), sec: '0',
    lat: String(city.lat), lon: String(city.lon), tz: String(city.tz),
    cityName: city.name,
    ayanamsaIndex: 0, // KP ayanamsa matching iOS DailyPanchangView
    isHorary: false, isTSPHorary: false
  });

  const sunLon = normalize(res.planets[0].longitude);
  const moonLon = normalize(res.planets[1].longitude);
  const phase = normalize(moonLon - sunLon);

  const tithiIndex = Math.floor(phase / 12);
  const pakshaMm = phase < 180 ? 'လဆန်း' : 'လဆုတ်';
  const tithiNum = (tithiIndex % 15) + 1;
  const tithiName = tithiIndex === 14 ? 'လပြည့်' : tithiIndex === 29 ? 'လကွယ်' : TITHI_MM[tithiIndex % 15];

  const halfTithi = Math.floor(phase / 6);
  let karanaName = '';
  if (halfTithi === 0) karanaName = 'ကိံသုဃ္န';
  else if (halfTithi >= 57) karanaName = ['သကုနိ', 'စတုဿပဒ', 'နာဂ'][halfTithi - 57];
  else karanaName = KARANA_RECURRING[(halfTithi - 1) % 7];

  const sector = 360 / 27;
  const nakIndex = Math.floor(moonLon / sector);
  const pada = Math.floor((moonLon % sector) / (sector / 4)) + 1;
  const yogaIndex = Math.floor(normalize(sunLon + moonLon) / sector);
  const moonSignIndex = Math.floor(moonLon / 30);

  // Exact iOS Classical Muhurta sight rule (from HomeView.swift)
  const totalPada = Math.floor(moonLon / (sector / 4));
  const rem = ((totalPada - 96 + 108) % 27) + 1;
  const sightMm = rem <= 6 ? 'နှစ်ဖက်ကန်း' : rem <= 15 ? 'တစ်ဖက်ကန်း' : 'နှစ်ဖက်မြင်';

  const sunrise = 360, sunset = 1080;
  const rahuKalam = slotWindow(sunrise, sunset, [7, 1, 6, 4, 5, 3, 2][wd], 8);
  const yamaganda = slotWindow(sunrise, sunset, [4, 3, 2, 1, 0, 6, 5][wd], 8);
  const gulika = slotWindow(sunrise, sunset, [6, 5, 4, 3, 2, 1, 0][wd], 8);
  const abhijit = wd === 3 ? null : slotWindow(sunrise, sunset, 7, 15);

  const startHora = HORA_START_IDX[wd];
  const horas = Array.from({ length: 12 }, (_, i) => ({
    lord: HORA_ORDER_MM[(startHora + i) % 7],
    window: slotWindow(sunrise, sunset, i, 12)
  }));
  const choghadiyas = CHOGHADIYA_DAY[wd].map((name, i) => ({
    name, good: GOOD_CHOG.has(name), window: slotWindow(sunrise, sunset, i, 8)
  }));

  const rulerIdx = nakIndex % APPOINTMENT_LORDS.length;
  return {
    dateStr, timeStr, wd, city,
    varaMm: VARA_MM[wd], varaEn: VARA_EN[wd],
    pakshaMm, tithiNum, tithiName,
    karanaName, yogaNum: yogaIndex + 1, yogaName: YOGA_MM[yogaIndex],
    nakIndex, nakName: NAKSHATRA_MM[nakIndex], pada,
    moonSign: SIGN_MM[moonSignIndex],
    sightMm, rahuKalam, yamaganda, gulika, abhijit,
    horas, choghadiyas,
    appointmentLord: APPOINTMENT_LORDS[rulerIdx],
    appointmentTrait: APPOINTMENT_TRAITS[rulerIdx]
  };
}

function iosTableCard(titleText, rows, palette = 'purple', threeCol = false) {
  const palettes = {
    purple: { accent: '#523382', tint: '#F2EBFC' },
    teal: { accent: '#215C70', tint: '#E8F5F5' },
    gold: { accent: '#805214', tint: '#FFF5DE' },
    rose: { accent: '#874063', tint: '#FAEBF2' },
    blue: { accent: '#36548A', tint: '#EBF2FC' }
  };
  const p = palettes[palette] || palettes.purple;
  return `
    <section class="ios-muh-table-card" style="--m-accent:${p.accent};--m-tint:${p.tint}">
      <header>${escHtml(titleText)}</header>
      <table>
        <tbody>
          ${rows.map(r => threeCol ? `
            <tr>
              <th>${escHtml(r[0])}</th>
              <td>${escHtml(r[1])}</td>
              <td>${escHtml(r[2])}</td>
            </tr>
          ` : `
            <tr>
              ${r[0] ? `<th>${escHtml(r[0])}</th><td>${escHtml(r[1])}</td>` : `<td colspan="2">${escHtml(r[1])}</td>`}
            </tr>
          `).join('')}
        </tbody>
      </table>
    </section>
  `;
}

export function renderMuhuratScreen(appHeader, english) {
  const t = (mm, en) => (english ? en : mm);
  const d = muhuratState.data;
  const tabs = [
    ['panchang', t('နေ့စဉ် ပဉ္စင်္ဂ', 'Daily Panchang'), 'purple'],
    ['hora', t('ဟိုရာ', 'Hora'), 'teal'],
    ['chog', t('ချိုဃဒိယာ', 'Choghadiya'), 'teal'],
    ['ceremony', t('အခမ်းအနား မုဟုတ္တ', 'Ceremony'), 'gold'],
    ['cesarean', t('ခွဲမွေးချိန်း', 'Cesarean Timing'), 'rose']
  ];

  let resultHtml = '';
  if (d) {
    if (muhuratState.tab === 'panchang') {
      resultHtml = [
        iosTableCard('ပဉ္စင်္ဂ အခြေခံ', [
          ['တိထိ', `${toMyDigits(d.tithiNum)} (${d.tithiName})`],
          ['ပက္ခ', d.pakshaMm],
          ['ကရဏ', d.karanaName],
          ['ယောဂ', `${toMyDigits(d.yogaNum)} · ${d.yogaName}`],
          ['နေ့', d.varaMm],
          ['လရာသီ', d.moonSign]
        ], 'purple'),
        iosTableCard('နက္ခတ် · KP အယနမ်သ', [
          [`#${toMyDigits(d.nakIndex + 1)}`, d.nakName],
          ['ပါဒ', toMyDigits(d.pada)]
        ], 'blue'),
        iosTableCard('အခါပေး အချိန်', [
          ...(d.abhijit ? [['အဘိဇိတ်', d.abhijit[0], d.abhijit[1]]] : []),
          ['ရာဟုကာလ', d.rahuKalam[0], d.rahuKalam[1]],
          ['ယမဂဏ္ဍ', d.yamaganda[0], d.yamaganda[1]],
          ['ဂုလိကကာလ', d.gulika[0], d.gulika[1]]
        ], 'teal', true),
        iosTableCard('အကန်း/အမြင် (မုဟုတ္တမူ)', [['', d.sightMm]], 'rose')
      ].join('');
    } else if (muhuratState.tab === 'hora') {
      resultHtml = iosTableCard('ဟိုရာ (နေ့ပိုင်း ၁၂ ချိန်)', d.horas.map(h => [h.lord, h.window[0], h.window[1]]), 'teal', true);
    } else if (muhuratState.tab === 'chog') {
      resultHtml = iosTableCard('ချိုဃဒိယာ (နေ့ပိုင်း ၈ ချိန်)', d.choghadiyas.map(c => [`${c.name} ${c.good ? '✓' : '×'}`, c.window[0], c.window[1]]), 'teal', true);
    } else if (muhuratState.tab === 'ceremony') {
      const selected = CEREMONIES.find(c => c[0] === muhuratState.ceremony) || CEREMONIES[0];
      const nakGood = selected[3].includes(d.nakIndex);
      const tithiGood = ![4, 9, 14, 19, 24, 29].includes(d.tithiNum - 1);
      const score = (nakGood ? 60 : 20) + (tithiGood ? 40 : 10);
      resultHtml = `
        <section class="ak-card">
          <label class="ak-field full" style="margin-bottom:10px">
            <span>${t('အခမ်းအနားအမျိုးအစား', 'Ceremony')}</span>
            <select id="muhurat-ceremony">
              ${CEREMONIES.map(([id, mm, en]) => `<option value="${id}" ${muhuratState.ceremony === id ? 'selected' : ''}>${escHtml(english ? en : mm)}</option>`).join('')}
            </select>
          </label>
          <div class="ak-score-banner ${score >= 70 ? 'good' : 'warn'}">
            <strong>${score >= 70 ? t('✓ သင့်တော်ကောင်းမွန်သော ရက်ဖြစ်ပါသည်', '✓ Suitable Day') : t('△ သာမန် — အခြားရက်စစ်ဆေးပါ', '△ Average')}</strong>
            <span>${score}%</span>
          </div>
        </section>
        ${iosTableCard(english ? selected[2] : selected[1], [
          ['နက္ခတ်', `${d.nakName} (${nakGood ? 'သင့်တော်' : 'သာမန်'})`],
          ['တိထီ', `${d.pakshaMm} ${toMyDigits(d.tithiNum)} ရက် (${d.tithiName})`],
          ['အဘိဇိတ်', d.abhijit ? `${d.abhijit[0]} – ${d.abhijit[1]}` : 'ဗုဒ္ဓဟူးနေ့တွင် မယူပါ'],
          ['ရာဟုကာလ (ရှောင်)', `${d.rahuKalam[0]} – ${d.rahuKalam[1]}`]
        ], 'gold')}
      `;
    } else {
      resultHtml = [
        iosTableCard('ခွဲမွေးချိန်း ပဉ္စင်္ဂ', [
          ['ရက်နှင့်အချိန်', `${d.dateStr} · ${d.timeStr}`],
          ['နက္ခတ် / ပါဒ', `${d.nakName} · ပါဒ ${toMyDigits(d.pada)}`],
          ['တိထိ / ပက္ခ', `${d.pakshaMm} ${toMyDigits(d.tithiNum)} (${d.tithiName})`],
          ['လရာသီ', d.moonSign]
        ], 'rose'),
        iosTableCard('ရိုးရာဗေဒင်အရ အားသာချက်များ', [
          ['စန်းနက္ခတ်သခင်', d.appointmentLord],
          ['အားသာနိုင်သည့် သဘောထား', d.appointmentTrait],
          ['', 'ဆရာဝန် သတ်မှတ်ထားသည့် ခွဲစိတ်ချိန်ကို ဤဖတ်ချက်အရ မပြောင်းပါနှင့်။']
        ], 'purple')
      ].join('');
    }
  }

  return `
    ${appHeader(t('မုဟုတ္တ', 'Muhurat'), true)}
    <main class="ak-sys-main">
      <form id="muhurat-form" class="ios-muh-hero-form">
        <label class="ios-muh-picker">
          <span>📍</span>
          <select name="cityIndex">
            ${FAVORITE_CITIES.map((c, idx) => `<option value="${idx}" ${muhuratState.cityIndex === idx ? 'selected' : ''}>${escHtml(c.name)}</option>`).join('')}
          </select>
        </label>
        <div class="ios-muh-dt-label">${t('ရက်နှင့်အချိန်', 'Date and time')}</div>
        <div class="ios-muh-dt-row">
          <input name="date" type="date" value="${escHtml(muhuratState.date)}" required>
          <input name="time" type="time" value="${escHtml(muhuratState.time)}" required>
        </div>
        <div class="ios-muh-btn-row">
          <button type="submit" class="ios-muh-gold-btn" ${muhuratState.loading ? 'disabled' : ''}>
            ${muhuratState.loading ? t('တွက်နေပါသည်…', 'Calculating…') : t('📅 တွက်ချက်မည်', '📅 Calculate')}
          </button>
          <button type="button" id="muh-today-btn" class="ios-muh-sec-btn">${t('ယနေ့', 'Today')}</button>
          <button type="button" id="muh-help-btn" class="ios-muh-sec-btn">${t('အသုံးပြုနည်း', 'Help')}</button>
        </div>
        ${muhuratState.error ? `<p class="form-error">${escHtml(muhuratState.error)}</p>` : ''}
      </form>

      ${d ? `
        <nav class="ak-subtabs">
          ${tabs.map(([id, label]) => `<button type="button" data-muhurat-tab="${id}" class="${muhuratState.tab === id ? 'selected' : ''}">${escHtml(label)}</button>`).join('')}
        </nav>
        <div class="ak-section-stack">${resultHtml}</div>
      ` : ''}
    </main>

    ${muhuratState.showHelp ? `
      <div class="ios-modal-backdrop" id="muh-help-backdrop">
        <section class="ios-modal-sheet" role="dialog" aria-modal="true">
          <header class="ios-modal-head">
            <strong>${t('အသုံးပြုနည်း', 'How to use')}</strong>
            <button type="button" id="muh-help-close">×</button>
          </header>
          <p class="ak-reading-text" style="margin-top:10px">
            ၁။ မြို့ရွေးပြီး ယနေ့ကို နှိပ်ပါ၊ သို့မဟုတ် ရက်နှင့်အချိန် ရွေးပါ။<br><br>
            ၂။ နက္ခတ်နှင့် ပါဒသည် ရွေးထားသောအချိန်ရှိ လ၏တည်နေရာ (KP အယနမ်သ) ဖြစ်ပါသည်။<br><br>
            ၃။ အကန်း/အမြင်နှင့် အကြံပြုချက်သည် မုဟုတ္တမူ ဖြစ်ပါသည်။
          </p>
        </section>
      </div>
    ` : ''}
  `;
}

export function bindMuhuratScreen(rerender) {
  if (!muhuratState.data && !muhuratState.loading && !muhuratState.error) {
    muhuratState.loading = true;
    rerender();
    computeMuhurat(muhuratState.date, muhuratState.time, FAVORITE_CITIES[muhuratState.cityIndex] || FAVORITE_CITIES[0])
      .then(data => { muhuratState.data = data; })
      .catch(err => { muhuratState.error = err?.message || 'Error'; })
      .finally(() => { muhuratState.loading = false; rerender(); });
  }

  document.querySelector('#muhurat-form')?.addEventListener('submit', async e => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    muhuratState.date = String(fd.get('date') || muhuratState.date);
    muhuratState.time = String(fd.get('time') || muhuratState.time);
    muhuratState.cityIndex = Number(fd.get('cityIndex') || 0);
    muhuratState.loading = true;
    muhuratState.error = '';
    rerender();
    try {
      muhuratState.data = await computeMuhurat(muhuratState.date, muhuratState.time, FAVORITE_CITIES[muhuratState.cityIndex] || FAVORITE_CITIES[0]);
    } catch (err) {
      muhuratState.error = err?.message || 'Calculation failed';
    } finally {
      muhuratState.loading = false;
      rerender();
    }
  });

  document.querySelector('#muh-today-btn')?.addEventListener('click', async () => {
    const now = new Date();
    muhuratState.date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
    muhuratState.time = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
    muhuratState.loading = true;
    rerender();
    try {
      muhuratState.data = await computeMuhurat(muhuratState.date, muhuratState.time, FAVORITE_CITIES[muhuratState.cityIndex] || FAVORITE_CITIES[0]);
    } finally {
      muhuratState.loading = false;
      rerender();
    }
  });

  document.querySelector('#muh-help-btn')?.addEventListener('click', () => { muhuratState.showHelp = true; rerender(); });
  document.querySelector('#muh-help-close')?.addEventListener('click', () => { muhuratState.showHelp = false; rerender(); });
  document.querySelector('#muh-help-backdrop')?.addEventListener('click', e => { if (e.target.id === 'muh-help-backdrop') { muhuratState.showHelp = false; rerender(); } });
  document.querySelectorAll('[data-muhurat-tab]').forEach(btn => btn.addEventListener('click', () => { muhuratState.tab = btn.dataset.muhuratTab; rerender(); }));
  document.querySelector('#muhurat-ceremony')?.addEventListener('change', e => { muhuratState.ceremony = e.target.value; rerender(); });
}
