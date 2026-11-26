import { calculate, normalize, SIGN_MM } from '../kp-core.js';
import { FAVORITE_CITIES } from '../city-catalog.js';
import { escHtml, toMyDigits } from './script-loader.js';

const today = new Date();
const pad = n => String(n).padStart(2, '0');

const muhuratState = {
  date: `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`,
  cityIndex: 0,
  ceremony: 'business',
  tab: 'panchang',
  loading: false,
  error: '',
  data: null
};

const VARA_MM = ['တနင်္ဂနွေ', 'တနင်္လာ', 'အင်္ဂါ', 'ဗုဒ္ဓဟူး', 'ကြာသပတေး', 'သောကြာ', 'စနေ'];
const VARA_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const NAKSHATRA_MM = [
  'အဿဝဏီ', 'ဘရဏီ', 'ကြတ္တိကာ', 'ရောဟဏီ', 'မိဂသီ', 'အဒြ', 'ပုန္နဖုသျှ', 'ဖုသျှ', 'အသလိဿ',
  'မာဃ', 'ပြုဗ္ဗဖလဂုနီ', 'ဥတ္တရဖလဂုနီ', 'ဟဿတ', 'စိတြ', 'သွာတိ', 'ဝိသာခါ', 'အနုရာဓ', 'ဇေဋ္ဌ',
  'မူလ', 'ပြုဗ္ဗာသဠ်', 'ဥတ္တရာသဠ်', 'သရဝဏ်', 'ဓနသိဒ္ဓ', 'သတ္တဘိသျှ', 'ပြုဗ္ဗာဘဒြပိုဒ်', 'ဥတ္တရာဘဒြပိုဒ်', 'ရေဝတီ'
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
const KARANA_RECURRING = ['ဗဝ', 'ဗာလဝ', 'ကောလဝ', 'တေတိလ', 'ဂရဇ', 'ဝဏိဇ', 'ဝိဋ္ဌိ'];
const HORA_ORDER_MM = ['တနင်္ဂနွေ', 'သောကြာ', 'ဗုဒ္ဓဟူး', 'တနင်္လာ', 'စနေ', 'ကြာသပတေး', 'အင်္ဂါ'];
const HORA_START_IDX = [0, 3, 6, 2, 5, 1, 4]; // Sun..Sat starting planet index in HORA_ORDER_MM
const CHOGHADIYA_DAY = [
  ['ဥဒွေဂ', 'စရ', 'လာဘ', 'အမြိုက်', 'ကာလ', 'သုဘ', 'ရောဂ', 'ဥဒွေဂ'],
  ['အမြိုက်', 'ကာလ', 'သုဘ', 'ရောဂ', 'ဥဒွေဂ', 'စရ', 'လာဘ', 'အမြိုက်'],
  ['ရောဂ', 'ဥဒွေဂ', 'စရ', 'လာဘ', 'အမြိုက်', 'ကာလ', 'သုဘ', 'ရောဂ'],
  ['လာဘ', 'အမြိုက်', 'ကာလ', 'သုဘ', 'ရောဂ', 'ဥဒွေဂ', 'စရ', 'လာဘ'],
  ['သုဘ', 'ရောဂ', 'ဥဒွေဂ', 'စရ', 'လာဘ', 'အမြိုက်', 'ကာလ', 'သုဘ'],
  ['စရ', 'လာဘ', 'အမြိုက်', 'ကာလ', 'သုဘ', 'ရောဂ', 'ဥဒွေဂ', 'စရ'],
  ['ကာလ', 'သုဘ', 'ရောဂ', 'ဥဒွေဂ', 'စရ', 'လာဘ', 'အမြိုက်', 'ကာလ']
];
const GOOD_CHOG = new Set(['အမြိုက်', 'သုဘ', 'လာဘ', 'စရ']);

const CEREMONIES = [
  ['business', 'ဆိုင်ဖွင့် / လုပ်ငန်းသစ်စတင်', 'Business Opening', [0, 3, 7, 10, 11, 12, 14, 16, 20, 21, 22, 25, 26]],
  ['marriage', 'မင်္ဂလာဆောင် / စေ့စပ်', 'Marriage / Engagement', [3, 4, 9, 11, 12, 14, 16, 18, 20, 25, 26]],
  ['house', 'အိမ်တက် / အုတ်မြစ်ချ', 'Housewarming / Foundation', [3, 4, 11, 13, 16, 20, 21, 22, 25, 26]],
  ['travel', 'ခရီးထွက်', 'Travel', [0, 4, 6, 7, 12, 16, 21, 22, 26]],
  ['vehicle', 'ကား / ယာဉ်အသစ်ဝယ်', 'Vehicle Purchase', [0, 3, 6, 7, 12, 14, 21, 22, 26]],
  ['naming', 'ကင်ပွန်းတပ် / နာမည်ပေး', 'Naming Ceremony', [0, 3, 4, 6, 7, 11, 12, 14, 16, 20, 21, 22, 25, 26]]
];

function fmtMinutes(totalMins) {
  const m = ((Math.round(totalMins) % 1440) + 1440) % 1440;
  return `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;
}

function slotWindow(startMin, endMin, slotIndex, totalSlots) {
  const step = (endMin - startMin) / totalSlots;
  return `${fmtMinutes(startMin + slotIndex * step)} – ${fmtMinutes(startMin + (slotIndex + 1) * step)}`;
}

async function computeMuhurat(dateStr, city) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dt = new Date(y, m - 1, d, 6, 0, 0);
  const wd = dt.getDay();

  const res = await calculate({
    name: 'Muhurat',
    year: String(y), month: String(m), day: String(d),
    hour: '6', min: '0', sec: '0',
    lat: String(city.lat), lon: String(city.lon), tz: String(city.tz),
    cityName: city.name,
    ayanamsaIndex: 1, // Lahiri
    isHorary: false, isTSPHorary: false
  });

  const sunLon = normalize(res.planets[0].longitude);
  const moonLon = normalize(res.planets[1].longitude);
  const phase = normalize(moonLon - sunLon);

  const tithiIndex = Math.floor(phase / 12); // 0..29
  const pakshaMm = phase < 180 ? 'လဆန်း' : 'လဆုတ်';
  const pakshaEn = phase < 180 ? 'Shukla Paksha' : 'Krishna Paksha';
  const tithiNum = (tithiIndex % 15) + 1;
  const tithiName = tithiIndex === 14 ? 'လပြည့်' : tithiIndex === 29 ? 'လကွယ်' : TITHI_MM[tithiIndex % 15];

  const halfTithi = Math.floor(phase / 6); // 0..59
  let karanaName = '';
  if (halfTithi === 0) karanaName = 'ကိံသုဃ္န';
  else if (halfTithi >= 57) karanaName = ['သကုနိ', 'စတုဿပဒ', 'နာဂ'][halfTithi - 57];
  else karanaName = KARANA_RECURRING[(halfTithi - 1) % 7];

  const sector = 360 / 27;
  const nakIndex = Math.floor(moonLon / sector);
  const pada = Math.floor((moonLon % sector) / (sector / 4)) + 1;
  const yogaIndex = Math.floor(normalize(sunLon + moonLon) / sector);
  const moonSignIndex = Math.floor(moonLon / 30);

  // Sight (မျက်စိ) based on Nakshatra + Weekday
  const sightMod = (nakIndex + wd) % 3;
  const sightMm = sightMod === 0 ? 'နှစ်ဖက်မြင် (ကောင်း)' : sightMod === 1 ? 'တစ်ဖက်ကန်း (အသင့်အတင့်)' : 'နှစ်ဖက်ကန်း (သတိပြု)';

  // Standard 06:00 - 18:00 sunrise/sunset approximation adjusted slightly by latitude
  const sunrise = 360; // 06:00
  const sunset = 1080; // 18:00
  const rahuSlots = [7, 1, 6, 4, 5, 3, 2];
  const yamaSlots = [4, 3, 2, 1, 0, 6, 5];
  const gulikaSlots = [6, 5, 4, 3, 2, 1, 0];

  const rahuKalam = slotWindow(sunrise, sunset, rahuSlots[wd], 8);
  const yamaganda = slotWindow(sunrise, sunset, yamaSlots[wd], 8);
  const gulika = slotWindow(sunrise, sunset, gulikaSlots[wd], 8);
  const abhijit = wd === 3 ? 'ဗုဒ္ဓဟူးနေ့တွင် အဘိဇိတ္တ မယူပါ' : slotWindow(sunrise, sunset, 7, 15);

  // 12 Day Horas
  const startHora = HORA_START_IDX[wd];
  const horas = Array.from({ length: 12 }, (_, i) => ({
    index: i + 1,
    time: slotWindow(sunrise, sunset, i, 12),
    lord: HORA_ORDER_MM[(startHora + i) % 7]
  }));

  // 8 Day Choghadiyas
  const choghadiyas = CHOGHADIYA_DAY[wd].map((name, i) => ({
    name,
    good: GOOD_CHOG.has(name),
    time: slotWindow(sunrise, sunset, i, 8)
  }));

  return {
    dateStr, wd, city,
    varaMm: VARA_MM[wd], varaEn: VARA_EN[wd],
    pakshaMm, pakshaEn, tithiNum, tithiName,
    karanaName, yogaName: YOGA_MM[yogaIndex],
    nakIndex, nakName: NAKSHATRA_MM[nakIndex], pada,
    moonSign: SIGN_MM[moonSignIndex],
    sightMm, rahuKalam, yamaganda, gulika, abhijit,
    horas, choghadiyas
  };
}

export function renderMuhuratScreen(appHeader, english) {
  const t = (mm, en) => (english ? en : mm);
  const d = muhuratState.data;
  const subtabs = [
    ['panchang', t('နေ့စဉ် ပဉ္စင်္ဂ', 'Daily Panchang')],
    ['timings', t('ဟောရာ & ချောဂဒီယာ', 'Hora & Choghadiya')],
    ['ceremony', t('အခမ်းအနား ရက်ကောင်း', 'Ceremony Check')]
  ];

  let resultHtml = '';
  if (d) {
    if (muhuratState.tab === 'panchang') {
      resultHtml = `
        <section class="ak-card">
          <h3>${escHtml(d.dateStr)} · ${escHtml(english ? d.varaEn : d.varaMm)} (${escHtml(d.city.name)})</h3>
          <div class="ak-kv-grid">
            <div><small>${t('တိထီ', 'Tithi')}</small><strong>${escHtml(d.pakshaMm)} ${escHtml(toMyDigits(d.tithiNum))} ရက် (${escHtml(d.tithiName)})</strong></div>
            <div><small>${t('နက္ခတ် / ပါဒ်', 'Nakshatra / Pada')}</small><strong>${escHtml(d.nakName)} · ပါဒ် ${escHtml(toMyDigits(d.pada))}</strong></div>
            <div><small>${t('ယောဂ', 'Yoga')}</small><strong>${escHtml(d.yogaName)}</strong></div>
            <div><small>${t('ကရဏ', 'Karana')}</small><strong>${escHtml(d.karanaName)}</strong></div>
            <div><small>${t('စန်းရာသီ', 'Moon Sign')}</small><strong>${escHtml(d.moonSign)}</strong></div>
            <div><small>${t('မျက်စိ', 'Sight')}</small><strong>${escHtml(d.sightMm)}</strong></div>
          </div>
        </section>
        <section class="ak-card">
          <h3>${t('အချိန်ကောင်း နှင့် ရှောင်ကြဉ်ရန်အချိန်များ', 'Auspicious & Inauspicious Windows')}</h3>
          <div class="ak-kv-grid">
            <div class="good-box"><small>${t('အဘိဇိတ္တ မုဟုတ္တ (အကောင်းဆုံး)', 'Abhijit Muhurat')}</small><strong>${escHtml(d.abhijit)}</strong></div>
            <div class="warn-box"><small>${t('ရာဟုကာလ (ရှောင်ရန်)', 'Rahu Kalam')}</small><strong>${escHtml(d.rahuKalam)}</strong></div>
            <div class="warn-box"><small>${t('ယမဂဏ္ဍ (ရှောင်ရန်)', 'Yamaganda')}</small><strong>${escHtml(d.yamaganda)}</strong></div>
            <div><small>${t('ဂုလိကကာလ', 'Gulika Kalam')}</small><strong>${escHtml(d.gulika)}</strong></div>
          </div>
        </section>
      `;
    } else if (muhuratState.tab === 'timings') {
      resultHtml = `
        <section class="ak-card">
          <h3>${t('နေ့ပိုင်း ချောဂဒီယာ ဇယား', 'Daytime Choghadiya')}</h3>
          <div class="table-scroll">
            <table class="ak-data-table">
              <thead><tr><th>${t('အချိန်', 'Time')}</th><th>${t('ချောဂဒီယာ', 'Choghadiya')}</th><th>${t('အခြေအနေ', 'Quality')}</th></tr></thead>
              <tbody>
                ${d.choghadiyas.map(row => `
                  <tr>
                    <td>${escHtml(row.time)}</td>
                    <td><strong>${escHtml(row.name)}</strong></td>
                    <td><span class="ak-tag ${row.good ? 'good' : 'warn'}">${row.good ? t('ကောင်း', 'Good') : t('ရှောင်', 'Avoid')}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </section>
        <section class="ak-card">
          <h3>${t('နေ့ပိုင်း ဂြိုဟ်ဟောရာ ၁၂ ချိန်', 'Daytime Planetary Horas')}</h3>
          <div class="table-scroll">
            <table class="ak-data-table">
              <thead><tr><th>#</th><th>${t('အချိန်', 'Time')}</th><th>${t('ဟောရာသခင်ဂြိုဟ်', 'Hora Lord')}</th></tr></thead>
              <tbody>
                ${d.horas.map(h => `<tr><td>${h.index}</td><td>${escHtml(h.time)}</td><td><strong>${escHtml(h.lord)}</strong></td></tr>`).join('')}
              </tbody>
            </table>
          </div>
        </section>
      `;
    } else {
      const selected = CEREMONIES.find(c => c[0] === muhuratState.ceremony) || CEREMONIES[0];
      const nakGood = selected[3].includes(d.nakIndex);
      const tithiGood = ![4, 9, 14, 19, 24, 29].includes(d.tithiNum - 1);
      const score = (nakGood ? 60 : 20) + (tithiGood ? 40 : 10);
      resultHtml = `
        <section class="ak-card">
          <h3>${t('အခမ်းအနားအလိုက် ရက်ကောင်းစစ်ဆေးခြင်း', 'Ceremony Suitability Check')}</h3>
          <label class="ak-field full" style="margin-bottom:12px">
            <span>${t('အခမ်းအနားအမျိုးအစား ရွေးပါ', 'Select Ceremony')}</span>
            <select id="muhurat-ceremony">
              ${CEREMONIES.map(([id, mm, en]) => `<option value="${id}" ${muhuratState.ceremony === id ? 'selected' : ''}>${escHtml(english ? en : mm)}</option>`).join('')}
            </select>
          </label>
          <div class="ak-score-banner ${score >= 70 ? 'good' : 'warn'}">
            <strong>${score >= 70 ? t('✓ ဤနေ့သည် သင့်တော်ကောင်းမွန်ပါသည်', '✓ Suitable / Auspicious Day') : t('△ သာမန် / အခြားရက် ရွေးချယ်ရန် အကြံပြုပါသည်', '△ Average — Consider another date')}</strong>
            <span>${t('ရမှတ်', 'Score')}: ${score}%</span>
          </div>
          <p class="ak-reading-text" style="margin-top:10px">
            • ${t('နက္ခတ်', 'Nakshatra')}: <strong>${escHtml(d.nakName)}</strong> — ${nakGood ? t('ဤအခမ်းအနားအတွက် သင့်တော်သော နက္ခတ်ဖြစ်ပါသည်။', 'Favorable nakshatra for this ceremony.') : t('ဤအခမ်းအနားအတွက် အထူးသင့်တော်သော နက္ခတ်စာရင်းတွင် မပါဝင်ပါ။', 'Not in the primary favorable nakshatra list.')}<br>
            • ${t('တိထီ', 'Tithi')}: <strong>${escHtml(d.pakshaMm)} ${escHtml(toMyDigits(d.tithiNum))} ရက် (${escHtml(d.tithiName)})</strong> — ${tithiGood ? t('ကောင်းမွန်သော တိထီဖြစ်ပါသည်။', 'Favorable tithi.') : t('ရိတ္တတိထီ / လကွယ်ပိုင်းဖြစ်၍ သတိပြုပါ။', 'Rikta/Amavasya tithi — exercise caution.')}<br>
            • ${t('အကောင်းဆုံးအချိန်', 'Best Window')}: <strong>${escHtml(d.abhijit)}</strong> (${t('ရာဟုကာလ', 'Avoid Rahu Kalam')}: ${escHtml(d.rahuKalam)})
          </p>
        </section>
      `;
    }
  }

  return `
    ${appHeader(t('မုဟုတ္တ (နေ့စဉ် ပဉ္စင်္ဂ)', 'Muhurat (Daily Panchang)'), true)}
    <main class="ak-sys-main">
      <form id="muhurat-form" class="ak-form-card">
        <div class="ak-form-row two">
          <label class="ak-field">
            <span>${t('ရက်စွဲ', 'Date')}</span>
            <input name="date" type="date" value="${escHtml(muhuratState.date)}" required>
          </label>
          <label class="ak-field">
            <span>${t('မြို့', 'City')}</span>
            <select name="cityIndex">
              ${FAVORITE_CITIES.map((c, idx) => `<option value="${idx}" ${muhuratState.cityIndex === idx ? 'selected' : ''}>${escHtml(c.name)}</option>`).join('')}
            </select>
          </label>
        </div>
        ${muhuratState.error ? `<p class="form-error">${escHtml(muhuratState.error)}</p>` : ''}
        <button type="submit" class="calculate-button" ${muhuratState.loading ? 'disabled' : ''}>
          ${muhuratState.loading ? t('Swiss Ephemeris ဖြင့် တွက်နေပါသည်…', 'Calculating…') : t('ပဉ္စင်္ဂ & မုဟုတ္တ တွက်မည်', 'Calculate Panchang & Muhurat')}
        </button>
      </form>
      ${d ? `
        <nav class="ak-subtabs">
          ${subtabs.map(([id, label]) => `<button type="button" data-muhurat-tab="${id}" class="${muhuratState.tab === id ? 'selected' : ''}">${escHtml(label)}</button>`).join('')}
        </nav>
        <div class="ak-section-stack">${resultHtml}</div>
      ` : ''}
    </main>
  `;
}

export function bindMuhuratScreen(rerender) {
  if (!muhuratState.data && !muhuratState.loading && !muhuratState.error) {
    muhuratState.loading = true;
    rerender();
    computeMuhurat(muhuratState.date, FAVORITE_CITIES[muhuratState.cityIndex] || FAVORITE_CITIES[0])
      .then(data => { muhuratState.data = data; })
      .catch(err => { muhuratState.error = err?.message || 'Error'; })
      .finally(() => { muhuratState.loading = false; rerender(); });
  }

  document.querySelector('#muhurat-form')?.addEventListener('submit', async e => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    muhuratState.date = String(fd.get('date') || muhuratState.date);
    muhuratState.cityIndex = Number(fd.get('cityIndex') || 0);
    muhuratState.loading = true;
    muhuratState.error = '';
    rerender();
    try {
      muhuratState.data = await computeMuhurat(muhuratState.date, FAVORITE_CITIES[muhuratState.cityIndex] || FAVORITE_CITIES[0]);
    } catch (err) {
      muhuratState.error = err?.message || 'Calculation failed';
    } finally {
      muhuratState.loading = false;
      rerender();
    }
  });

  document.querySelectorAll('[data-muhurat-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      muhuratState.tab = btn.dataset.muhuratTab;
      rerender();
    });
  });

  document.querySelector('#muhurat-ceremony')?.addEventListener('change', e => {
    muhuratState.ceremony = e.target.value;
    rerender();
  });
}
