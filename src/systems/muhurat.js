import { calculate, normalize, SIGN_MM } from '../kp-core.js';
import { FAVORITE_CITIES, loadCityCatalog, searchCities, displayCity } from '../city-catalog.js';
import { escHtml, toMyDigits } from './script-loader.js';
import { renderSystemPlansOnly, bindMultiSystemPlans } from './plans-wallet.js';

const today = new Date();
const pad = n => String(n).padStart(2, '0');

const muhuratState = {
  mode: 'panchang', // 'panchang' | 'plans'
  date: `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`,
  time: `${pad(today.getHours())}:${pad(today.getMinutes())}`,
  city: FAVORITE_CITIES[0],
  allCities: FAVORITE_CITIES,
  cityPickerOpen: false,
  cityQuery: '',
  tab: 0,
  showHelp: false,
  showsAppointment: false,
  loading: false,
  error: '',
  data: null
};

const IOS_TABS = [
  'အနှစ်ချုပ်', 'နေ့စဉ် ပဉ္စင်္ဂ', 'ဟိုရာ', 'ချိုဃဒိယာ', 'ဒိုဃဋီ', 'ရာဟုကာလ',
  'ပဉ္စက', 'ဘဒြာ', 'လဂ်ဇယား',
  'အိမ်ထောင်မင်္ဂလာ', 'အိမ်သစ်တက်မင်္ဂလာ', 'အမည်ပေးမင်္ဂလာ', 'ပညာစသင်မင်္ဂလာ',
  'ကလေး အစာစကျွေးမင်္ဂလာ', 'နားထွင်းမင်္ဂလာ', 'ကလေး ပထမဆုံး ဆံပင်ရိတ်မင်္ဂလာ',
  'ဥပနယနမင်္ဂလာ', 'ယာဉ်ဝယ်ယူမုဟုတ္တ', 'အိမ်ခြံမြေ ဝယ်ယူမုဟုတ္တ',
  'သဗ္ဗတ္ထသိဒ္ဓိယောဂ', 'အမရိတသိဒ္ဓိယောဂ', 'ခွဲမွေးချိန်း'
];

const VARA_MM = ['တနင်္ဂနွေ', 'တနင်္လာ', 'အင်္ဂါ', 'ဗုဒ္ဓဟူး', 'ကြာသပတေး', 'သောကြာ', 'စနေ'];
const VARA_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const NAKSHATRA_MM = [
  'အဿဝနီ', 'ဘရဏီ', 'ကြတ္တိကာ', 'ရောဟိဏီ', 'မိဂသီ', 'အဒြ', 'ပုဏ္ဏဖုသျှ', 'ဖုသျှ', 'အဿလိသ',
  'မာဃ', 'ပြုဗ္ဗဖလဂုဏီ', 'ဥတ္တရဖလဂုဏီ', 'ဟသတ္တ', 'စိတြ', 'သွာတိ', 'ဝိသာခါ', 'အနုရာဓ', 'ဇေဋ္ဌ',
  'မူလ', 'ပြုဗ္ဗာသဠ်', 'ဥတ္တရာသဠ်', 'သရဝဏ်', 'ဓနသိဒ္ဓ', 'သတ္တဘိဿ', 'ပြုဗ္ဗဘဒြပိုဒ်', 'ဥတ္တရာဘဒြပိုဒ်', 'ရေဝတီ'
];
const LUNAR_MONTHS_MM = ['စိတ္တ', 'ဝိသာခ', 'ဇေဋ္ဌ', 'အာသာဠှ', 'သာဝဏ', 'ဘဒ္ဒပဒ', 'အဿယုဇ', 'ကတ္တိက', 'မိဂသိရ', 'ပုဿ', 'မာဃ', 'ဖဂ္ဂုဏ'];
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
const HORA_FIRST = [0, 3, 6, 2, 5, 1, 4];
const CHOG_NAMES = ['ဥဒွေဂ', 'စလ', 'လာဘ', 'အမရိတ', 'ကာလ', 'သုဘ', 'ရောဂ'];
const CHOG_NIGHT_FIRST = [5, 1, 4, 0, 3, 6, 2];
const CHOG_NIGHT_ORDER = [0, 5, 3, 1, 6, 4, 2];
const GOOD_CHOG = new Set(['အမရိတ', 'သုဘ', 'လာဘ', 'စလ']);
const DAY_GHATI = ['ရုဒြ', 'သီတ', 'မိတ္တ', 'စာရမထ', 'သာဝိတြ', 'ဝဲရာဇ', 'ဂန္ဓဗ္ဗ', 'အဘိဇိတ်', 'ရောဟိဏီ', 'ဗလ', 'ဝိဇယ', 'နဲရ္ရိတ', 'ဣန္ဒြ', 'ဝရုဏ', 'ဘဂ'];
const NIGHT_GHATI = ['ရုဒြ', 'ဂန္ဓဗ္ဗ', 'ပက္ခ', 'စာရဏ', 'ဝါယု', 'အဂ္ဂိ', 'ရက္ခသ', 'ဗြဟ္မာ', 'သောမယ', 'ကမလဇ', 'ဂုရု', 'ပေါသ္ဏ', 'ဝဲကုဏ္ဌ', 'သမီရ', 'နိရ္ရိတိ'];
const RAHU_SLOTS = [7, 1, 6, 4, 5, 3, 2];

// Exact iOS DailyPanchangView ceremony rules (tabs 11..18 -> rules 0..7)
const CEREMONY_STARS = [
  [1, 4, 5, 7, 8, 12, 13, 14, 15, 17, 21, 22, 23, 24, 26, 27],
  [1, 6, 7, 8, 13, 14, 15, 17, 22, 27],
  [1, 4, 5, 7, 8, 12, 13, 14, 15, 17, 21, 22, 23, 24, 26, 27],
  [1, 5, 7, 8, 13, 14, 17, 22, 23, 27],
  [1, 5, 7, 8, 13, 14, 15, 18, 22, 23, 24, 27],
  [1, 4, 5, 7, 8, 12, 13, 14, 15, 17, 21, 22, 23, 24, 26, 27],
  [7, 15, 22, 23, 24],
  [4, 5, 7, 8, 12, 17, 21, 26, 27]
];
const CEREMONY_TITHIS = [
  [1, 2, 3, 5, 6, 7, 10, 11, 12, 13],
  [2, 3, 5, 6, 10, 11, 12],
  [2, 3, 5, 7, 10, 13, 15],
  [2, 3, 5, 7, 10, 11, 13],
  [2, 3, 5, 7, 10, 11, 13],
  [2, 3, 5, 6, 7, 10, 11, 12, 13],
  [1, 2, 3, 5, 6, 7, 10, 11, 12, 13, 15],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
];
const CEREMONY_DAYS = [
  [1, 3, 4, 5], [1, 3, 4, 5], [1, 3, 4, 5], [1, 3, 4, 5],
  [1, 3, 4, 5], [1, 3, 4, 5], [0, 1, 3, 4, 5], [4, 5]
];
const SIDDHI_STARS = [[1, 8, 12, 13, 19, 21, 26], [4, 5, 8, 17, 22], [1, 3, 9, 26], [3, 4, 5, 13, 17], [1, 7, 8, 17, 27], [1, 7, 17, 22, 27], [4, 15, 22]];
const AMRIT_STARS = [13, 5, 1, 17, 8, 27, 4];

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

function fmtMinutes(totalMins) {
  const m = ((Math.round(totalMins) % 1440) + 1440) % 1440;
  return `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;
}

function slotWindow(startMin, endMin, slotIndex, totalSlots) {
  const step = (endMin - startMin) / totalSlots;
  return [fmtMinutes(startMin + slotIndex * step), fmtMinutes(startMin + (slotIndex + 1) * step)];
}

function calcSunTimes(dateStr, lat, lon, tz) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const startOfYear = new Date(Date.UTC(y, 0, 0));
  const doy = Math.floor((Date.UTC(y, m - 1, d) - startOfYear) / 86400000);
  const rad = Math.PI / 180;
  const gamma = (2 * Math.PI / 365) * (doy - 1);
  const eqTime = 229.18 * (0.000075 + 0.001868 * Math.cos(gamma) - 0.032077 * Math.sin(gamma) - 0.014615 * Math.cos(2 * gamma) - 0.040849 * Math.sin(2 * gamma));
  const decl = 0.006918 - 0.399912 * Math.cos(gamma) + 0.070257 * Math.sin(gamma) - 0.006758 * Math.cos(2 * gamma) + 0.000907 * Math.sin(2 * gamma);
  const cosHa = (Math.cos(90.833 * rad) / (Math.cos(lat * rad) * Math.cos(decl))) - Math.tan(lat * rad) * Math.tan(decl);
  const ha = Math.acos(Math.max(-1, Math.min(1, cosHa))) / rad;
  const noon = 720 - 4 * lon - eqTime + tz * 60;
  return { rise: noon - 4 * ha, noon, set: noon + 4 * ha };
}

function calcBala(moonLon, isChandra) {
  const total = isChandra ? 12 : 27;
  const current = Math.floor(moonLon / (360 / total));
  const names = isChandra ? SIGN_MM : NAKSHATRA_MM;
  const good = [];
  for (let birth = 0; birth < total; birth++) {
    const dist = ((current - birth + total) % total) + 1;
    const tara = ((dist - 1) % 9) + 1;
    if (isChandra ? [1, 3, 6, 7, 10, 11].includes(dist) : ![3, 5, 7].includes(tara)) {
      good.push(names[birth]);
    }
  }
  return good.join('၊ ');
}

function checkCeremony(tabIdx, star, pada, tithi, weekday, halfTithi, isBhadra) {
  if (isBhadra || halfTithi >= 57) return { ok: false, reason: 'ဘဒြာ သို့မဟုတ် အသေကရဏ ကျရောက်နေသည်' };
  if (tabIdx === 9) { // Marriage
    const quarter = !(([10, 19].includes(star) && pada === 1) || (star === 27 && pada === 4));
    const ok = [1, 3, 4, 5].includes(weekday) && quarter
      && [4, 5, 10, 12, 13, 15, 17, 19, 21, 26, 27].includes(star)
      && [2, 3, 5, 7, 11, 13].includes(tithi);
    return { ok, reason: ok ? 'နက္ခတ်၊ တိထိ၊ ပါဒနှင့် နေ့ရက် ကိုက်ညီပါသည်' : 'အိမ်ထောင်မင်္ဂလာ မုဟုတ္တ စည်းမျဉ်းနှင့် မကိုက်ညီသေးပါ' };
  }
  if (tabIdx === 10) { // Housewarming
    const ok = [1, 4, 5, 12, 17, 21, 26, 27].includes(star) && [2, 3, 5, 7, 10, 11, 12, 13].includes(tithi);
    return { ok, reason: ok ? 'အိမ်သစ်တက်မင်္ဂလာ နက္ခတ်နှင့် တိထိ ကိုက်ညီပါသည်' : 'အိမ်သစ်တက်မင်္ဂလာ စည်းမျဉ်းနှင့် မကိုက်ညီသေးပါ' };
  }
  const rule = tabIdx - 11;
  if (rule >= 0 && rule < CEREMONY_STARS.length) {
    const ok = CEREMONY_STARS[rule].includes(star) && CEREMONY_TITHIS[rule].includes(tithi) && CEREMONY_DAYS[rule].includes(weekday);
    return { ok, reason: ok ? 'နက္ခတ်၊ တိထိနှင့် နေ့ရက် ကိုက်ညီပါသည်' : 'သတ်မှတ် နက္ခတ်/တိထိ/နေ့ရက် နှင့် မကိုက်ညီသေးပါ' };
  }
  return { ok: false, reason: '' };
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
    ayanamsaIndex: 0,
    isHorary: false, isTSPHorary: false
  });

  const sunLon = normalize(res.planets[0].longitude);
  const moonLon = normalize(res.planets[1].longitude);
  const ascSignIdx = Math.floor(normalize(res.cusps[0].longitude) / 30);
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
  const nakNum = nakIndex + 1;
  const pada = Math.floor((moonLon % sector) / (sector / 4)) + 1;
  const yogaIndex = Math.floor(normalize(sunLon + moonLon) / sector);
  const moonSignIndex = Math.floor(moonLon / 30);

  // Hindu Lunar Month (Amanta & Purnimanta)
  const sunSign = Math.floor(sunLon / 30);
  const amantaMonth = LUNAR_MONTHS_MM[sunSign % 12];
  const purnimantaMonth = phase < 180 ? amantaMonth : LUNAR_MONTHS_MM[(sunSign + 1) % 12];

  const totalPada = Math.floor(moonLon / (sector / 4));
  const rem = ((totalPada - 96 + 108) % 27) + 1;
  const sightMm = rem <= 6 ? 'နှစ်ဖက်ကန်း' : rem <= 15 ? 'တစ်ဖက်ကန်း' : 'နှစ်ဖက်မြင်';

  const solar = calcSunTimes(dateStr, Number(city.lat), Number(city.lon), Number(city.tz));
  const sunrise = solar.rise, sunset = solar.set, nextRise = sunrise + 1440;
  const rahuKalam = slotWindow(sunrise, sunset, RAHU_SLOTS[wd], 8);
  const yamaganda = slotWindow(sunrise, sunset, [4, 3, 2, 1, 0, 6, 5][wd], 8);
  const gulika = slotWindow(sunrise, sunset, [6, 5, 4, 3, 2, 1, 0][wd], 8);
  const abhijit = wd === 3 ? null : slotWindow(sunrise, sunset, 7, 15);

  // 7-day Rahu Kaal schedule (matching iOS tab 5)
  const rahuWeek = Array.from({ length: 7 }, (_, off) => {
    const dayIdx = (wd + off) % 7;
    const d2 = new Date(y, m - 1, d + off);
    const ds = `${d2.getFullYear()}-${pad(d2.getMonth() + 1)}-${pad(d2.getDate())}`;
    const s2 = calcSunTimes(ds, Number(city.lat), Number(city.lon), Number(city.tz));
    return { day: VARA_MM[dayIdx], window: slotWindow(s2.rise, s2.set, RAHU_SLOTS[dayIdx], 8) };
  });

  // Day + Night Hora (24 slots), Choghadiya (16 slots), Do-Ghati (30 slots) matching iOS
  const startHora = HORA_FIRST[wd];
  const horas = [
    ...Array.from({ length: 12 }, (_, i) => ({ lord: `${HORA_ORDER_MM[(startHora + i) % 7]} (နေ့)`, window: slotWindow(sunrise, sunset, i, 12) })),
    ...Array.from({ length: 12 }, (_, i) => ({ lord: `${HORA_ORDER_MM[(startHora + 12 + i) % 7]} (ည)`, window: slotWindow(sunset, nextRise, i, 12) }))
  ];
  const nightOff = CHOG_NIGHT_ORDER.indexOf(CHOG_NIGHT_FIRST[wd]);
  const choghadiyas = [
    ...Array.from({ length: 8 }, (_, i) => {
      const name = CHOG_NAMES[(HORA_FIRST[wd] + i) % 7];
      return { name: `${name} (နေ့)`, good: GOOD_CHOG.has(name), window: slotWindow(sunrise, sunset, i, 8) };
    }),
    ...Array.from({ length: 8 }, (_, i) => {
      const name = CHOG_NAMES[CHOG_NIGHT_ORDER[(nightOff + i) % 7]];
      return { name: `${name} (ည)`, good: GOOD_CHOG.has(name), window: slotWindow(sunset, nextRise, i, 8) };
    })
  ];
  const doghatis = [
    ...DAY_GHATI.map((name, i) => ({ name: `${name} (နေ့)`, window: slotWindow(sunrise, sunset, i, 15) })),
    ...NIGHT_GHATI.map((name, i) => ({ name: `${name} (ည)`, window: slotWindow(sunset, nextRise, i, 15) }))
  ];
  const lagnaRows = Array.from({ length: 12 }, (_, i) => ({
    sign: SIGN_MM[(sunSign + i) % 12],
    window: slotWindow(sunrise, nextRise, i, 12)
  }));

  const isPanchaka = moonLon >= 300;
  const isBhadra = halfTithi > 0 && halfTithi < 57 && halfTithi % 7 === 0;
  const isSarvartha = SIDDHI_STARS[wd].includes(nakNum);
  const isAmrit = AMRIT_STARS[wd] === nakNum;

  const rulerIdx = nakIndex % APPOINTMENT_LORDS.length;
  return {
    dateStr, timeStr, wd, city,
    varaMm: VARA_MM[wd], varaEn: VARA_EN[wd],
    pakshaMm, tithiNum, tithiName, halfTithi,
    karanaName, yogaNum: yogaIndex + 1, yogaName: YOGA_MM[yogaIndex],
    nakIndex, nakNum, nakName: NAKSHATRA_MM[nakIndex], pada,
    moonSign: SIGN_MM[moonSignIndex], ascSign: SIGN_MM[ascSignIdx],
    amantaMonth, purnimantaMonth,
    tarabala: calcBala(moonLon, false),
    chandrabala: calcBala(moonLon, true),
    sunRise: fmtMinutes(solar.rise), sunNoon: fmtMinutes(solar.noon), sunSet: fmtMinutes(solar.set),
    sightMm, rahuKalam, yamaganda, gulika, abhijit,
    rahuWeek, horas, choghadiyas, doghatis, lagnaRows,
    isPanchaka, isBhadra, isSarvartha, isAmrit,
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
            <tr><th>${escHtml(r[0])}</th><td>${escHtml(r[1])}</td><td>${escHtml(r[2])}</td></tr>
          ` : `
            <tr>${r[0] ? `<th>${escHtml(r[0])}</th><td>${escHtml(r[1])}</td>` : `<td colspan="2">${escHtml(r[1])}</td>`}</tr>
          `).join('')}
        </tbody>
      </table>
    </section>
  `;
}

export function renderMuhuratScreen(appHeader, english, wallet) {
  const t = (mm, en) => (english ? en : mm);
  const d = muhuratState.data;
  const tab = muhuratState.tab;

  if (muhuratState.mode === 'plans') {
    return `
      ${appHeader(t('မုဟုတ္တ Premium', 'Muhurat Premium'), true)}
      <main class="ak-sys-main">
        <button type="button" id="muh-open-panchang" class="ios-muh-gold-btn" style="width:100%;margin-bottom:14px">
          📅 ${t('မုဟုတ္တ အသုံးပြုရန်', 'Open Muhurat')}
        </button>
        ${renderSystemPlansOnly('muhurat', english, wallet)}
      </main>
    `;
  }

  let resultHtml = '';
  if (d) {
    if (tab <= 1) {
      resultHtml = [
        iosTableCard('ပဉ္စင်္ဂ အခြေခံ', [
          ['တိထိ', `${toMyDigits(d.tithiNum)} (${d.tithiName})`],
          ['ပက္ခ', d.pakshaMm],
          ['ကရဏ', d.karanaName],
          ['ယောဂ အမှတ်', `${toMyDigits(d.yogaNum)} · ${d.yogaName}`],
          ['နေ့', d.varaMm],
          ['လရာသီ / လဂ်', `${d.moonSign} / ${d.ascSign}`]
        ], 'purple'),
        iosTableCard('ဟိန္ဒူ လပြက္ခဒိန်', [
          ['အမာန္တလ', d.amantaMonth],
          ['ပုဏ္ဏိမာန္တလ', d.purnimantaMonth]
        ], 'gold'),
        iosTableCard('နက္ခတ် · KP အယနမ်သ', [
          [`#${toMyDigits(d.nakNum)}`, d.nakName],
          ['ပါဒ', toMyDigits(d.pada)]
        ], 'blue'),
        iosTableCard('နေ ထွက် / မွန်းတည့် / ဝင်ချိန်', [
          ['ထွက်ချိန်', d.sunRise],
          ['မွန်းတည့်ချိန်', d.sunNoon],
          ['ဝင်ချိန်', d.sunSet]
        ], 'gold'),
        iosTableCard('တာရာဗလနှင့် စန္ဒြဗလ', [
          ['တာရာဗလ', d.tarabala],
          ['စန္ဒြဗလ', d.chandrabala]
        ], 'blue'),
        iosTableCard('အခါပေး အချိန်', [
          ...(d.abhijit ? [['အဘိဇိတ်', d.abhijit[0], d.abhijit[1]]] : []),
          ['ရာဟုကာလ', d.rahuKalam[0], d.rahuKalam[1]],
          ['ယမဂဏ္ဍ', d.yamaganda[0], d.yamaganda[1]],
          ['ဂုလိကကာလ', d.gulika[0], d.gulika[1]]
        ], 'teal', true),
        iosTableCard('အကန်း/အမြင် (မုဟုတ္တမူ)', [['', d.sightMm]], 'rose'),
        iosTableCard('အချိန်ရွေးရန် အကြံပြုချက်', [['', 'မုဟုတ္တမူအရ နက္ခတ်တစ်လုံးရဲ့ နောက်ဆုံး ၂၆ လိတ္တာ ၄၀ ဝိလိတ္တာအတွင်း အရေးကြီးကိစ္စ စတင်ခြင်းကို ရှောင်ရန် ဖော်ပြထားပါသည်။']], 'rose')
      ].join('');
    } else if (tab === 2) {
      resultHtml = iosTableCard('ဟိုရာ (နေ့ ၁၂ + ည ၁၂)', d.horas.map(h => [h.lord, h.window[0], h.window[1]]), 'teal', true);
    } else if (tab === 3) {
      resultHtml = iosTableCard('ချိုဃဒိယာ (နေ့ ၈ + ည ၈)', d.choghadiyas.map(c => [`${c.name} ${c.good ? '✓' : '×'}`, c.window[0], c.window[1]]), 'teal', true);
    } else if (tab === 4) {
      resultHtml = iosTableCard('ဒိုဃဋီ (နေ့ ၁၅ + ည ၁၅)', d.doghatis.map(g => [g.name, g.window[0], g.window[1]]), 'teal', true);
    } else if (tab === 5) {
      resultHtml = iosTableCard('ရာဟုကာလ (၇ ရက်စာ)', d.rahuWeek.map(r => [r.day, r.window[0], r.window[1]]), 'teal', true);
    } else if (tab === 6) {
      resultHtml = iosTableCard('ပဉ္စက (Panchaka)', [['အခြေအနေ', d.isPanchaka ? '⚠ ပဉ္စကကျရောက်နေသည် (ကုမ်/မိန် စန်း)' : '✓ ဤအချိန်တွင် ပဉ္စက မရှိပါ']], 'blue');
    } else if (tab === 7) {
      resultHtml = iosTableCard('ဘဒြာ (Bhadra)', [['အခြေအနေ', d.isBhadra ? '⚠ ဘဒြာ (ဝိဋ္ဌိကရဏ) ကျရောက်နေသည်' : '✓ ဤအချိန်တွင် ဘဒြာ မရှိပါ']], 'blue');
    } else if (tab === 8) {
      resultHtml = iosTableCard('လဂ်ဇယား (Lagna Table)', d.lagnaRows.map(l => [l.sign, l.window[0], l.window[1]]), 'blue', true);
    } else if (tab >= 9 && tab <= 18) {
      const check = checkCeremony(tab, d.nakNum, d.pada, d.tithiNum, d.wd, d.halfTithi, d.isBhadra);
      resultHtml = [
        iosTableCard('အခမ်းအနား မုဟုတ္တ', [['', 'အခမ်းအနားအလိုက် နက္ခတ်၊ တိထိ၊ ကရဏနှင့် သတ်မှတ်နေ့များကို စစ်ထားသော ပဏာမအချိန်များ။ အိမ်ထောင်မင်္ဂလာအတွက် ပါဒကိုပါ စစ်ပါသည်။']], 'gold'),
        iosTableCard(IOS_TABS[tab], [
          ['အဖြေ', check.ok ? '✓ သင့်တော်ကောင်းမွန်ပါသည်' : '△ ဤအချိန် မကိုက်ညီပါ — အခြားရက်/အချိန် စစ်ပါ'],
          ['အသေးစိတ်', check.reason],
          ['နက္ခတ် / ပါဒ', `${d.nakName} · ပါဒ ${toMyDigits(d.pada)}`],
          ['တိထိ / နေ့', `${d.pakshaMm} ${toMyDigits(d.tithiNum)} (${d.tithiName}) · ${d.varaMm}`],
          ['အဘိဇိတ်', d.abhijit ? `${d.abhijit[0]} – ${d.abhijit[1]}` : 'ဗုဒ္ဓဟူးနေ့တွင် မယူပါ'],
          ['ရာဟုကာလ (ရှောင်)', `${d.rahuKalam[0]} – ${d.rahuKalam[1]}`]
        ], 'gold')
      ].join('');
    } else if (tab === 19 || tab === 20) {
      const hit = tab === 19 ? d.isSarvartha : d.isAmrit;
      resultHtml = [
        iosTableCard('အထွေထွေ အခါကောင်းများ', [['', 'ဒေသနေထွက်ချိန်မှ စသည့် နေ့နှင့် လနက္ခတ် ကိုက်ညီသောအချိန်များ။']], 'rose'),
        iosTableCard(IOS_TABS[tab], [
          ['အခြေအနေ', hit ? `✓ ${IOS_TABS[tab]} ကျရောက်နေပါသည် (အလွန်ကောင်း)` : '— ရွေးထားသောအချိန်တွင် မကျရောက်ပါ'],
          ['နေ့ / နက္ခတ်', `${d.varaMm} · ${d.nakName}`]
        ], 'rose')
      ].join('');
    } else {
      resultHtml = [
        iosTableCard('ခွဲမွေးချိန်း ပဉ္စင်္ဂ', [['', 'အပေါ်တွင် ဆေးရုံရှိမြို့နှင့် သားဖွားဆရာဝန် သတ်မှတ်ထားသော ရက်၊ အချိန်ကို ရွေးပါ။ ရလဒ်ကို ခွဲစိတ်ချိန် ပြောင်းရန် သို့မဟုတ် လိုအပ်သော ကုသမှုကို နောက်ဆုတ်ရန် အသုံးမပြုပါနှင့်။']], 'rose'),
        `<button type="button" id="muh-show-appt-btn" class="ios-muh-gold-btn" style="width:100%" ${muhuratState.showsAppointment ? 'disabled' : ''}>📅 ရွေးထားသော ချိန်းဆိုချိန်ကို ကြည့်ရန်</button>`,
        ...(muhuratState.showsAppointment ? [
          iosTableCard(`${d.dateStr} · ${d.timeStr}`, [
            ['တိထိ / ပက္ခ', `${d.pakshaMm} ${toMyDigits(d.tithiNum)} (${d.tithiName})`],
            ['ကရဏ / ယောဂ', `${d.karanaName} · ${toMyDigits(d.yogaNum)}`],
            ['နေ့ / လရာသီ', `${d.varaMm} · ${d.moonSign}`],
            ['နက္ခတ် / ပါဒ', `${d.nakName} · ပါဒ ${toMyDigits(d.pada)}`]
          ], 'purple'),
          iosTableCard('ရိုးရာဗေဒင်အရ အားသာချက်များ', [
            ['စန်းနက္ခတ်သခင်', d.appointmentLord],
            ['အားသာနိုင်သည့် သဘောထား', d.appointmentTrait],
            ['', 'ဤဖတ်ချက်သည် စန်းနက္ခတ်သခင်ကို အခြေခံသော ရိုးရာဗေဒင်အမြင်ဖြစ်ပြီး ကလေး၏ အနာဂတ် သို့မဟုတ် ကျန်းမာရေးကို အာမမခံပါ။ ဆရာဝန် သတ်မှတ်ထားသည့် ခွဲစိတ်ချိန်ကို ဤဖတ်ချက်အရ မပြောင်းပါနှင့်။']
          ], 'purple')
        ] : [])
      ].join('');
    }
  }

  return `
    ${appHeader(t('မုဟုတ္တ', 'Muhurat'), true)}
    <main class="ak-sys-main">
      <form id="muhurat-form" class="ios-muh-hero-form">
        <button type="button" id="muh-open-city" class="ios-muh-picker" style="border:none;cursor:pointer;text-align:left;width:100%">
          <span>📍</span>
          <strong style="flex:1;font-size:15px;color:var(--ak-ink)">${escHtml(displayCity(muhuratState.city))}</strong>
          <span>▾</span>
        </button>
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
          <button type="button" id="muh-open-plans" class="ios-muh-sec-btn">Plans</button>
        </div>
        ${muhuratState.error ? `<p class="form-error">${escHtml(muhuratState.error)}</p>` : ''}
      </form>

      ${d ? `
        <nav class="ak-subtabs">
          ${IOS_TABS.map((label, idx) => `<button type="button" data-muhurat-tab="${idx}" class="${muhuratState.tab === idx ? 'selected' : ''}">${escHtml(label)}</button>`).join('')}
        </nav>
        <div class="ak-section-stack">${resultHtml}</div>
      ` : ''}
    </main>

    ${muhuratState.cityPickerOpen ? `
      <div class="ios-modal-backdrop" id="muh-city-backdrop">
        <section class="ios-modal-sheet" role="dialog" aria-modal="true" style="max-height:80vh;display:flex;flex-direction:column">
          <header class="ios-modal-head">
            <strong>${t('မြို့ရွေးချယ်ရန်', 'Choose City')}</strong>
            <button type="button" id="muh-city-close">×</button>
          </header>
          <input id="muh-city-search" class="ak-search-input" style="margin:12px 0" value="${escHtml(muhuratState.cityQuery)}" placeholder="${t('မြို့အမည် ရိုက်ရှာပါ…', 'Search city…')}">
          <div style="overflow:auto;display:flex;flex-direction:column;gap:6px">
            ${searchCities(muhuratState.allCities, muhuratState.cityQuery).slice(0, 30).map((c, idx) => `
              <button type="button" class="ak-chip" data-pick-muh-city="${idx}" style="text-align:left;border-radius:12px;padding:10px 12px">
                <strong>${escHtml(displayCity(c))}</strong> · UTC+${escHtml(c.tz)}
              </button>
            `).join('')}
          </div>
        </section>
      </div>
    ` : ''}

    ${muhuratState.showHelp ? `
      <div class="ios-modal-backdrop" id="muh-help-backdrop">
        <section class="ios-modal-sheet" role="dialog" aria-modal="true">
          <header class="ios-modal-head">
            <strong>${t('အသုံးပြုနည်း', 'How to use')}</strong>
            <button type="button" id="muh-help-close">×</button>
          </header>
          <p class="ak-reading-text" style="margin-top:10px">
            ၁။ မြို့ရွေးပြီး ယနေ့ကို နှိပ်ပါ၊ သို့မဟုတ် ရက်နှင့်အချိန် ရွေးပါ။ အချိန်များသည် ရွေးထားသောမြို့၏ ဒေသစံတော်ချိန် ဖြစ်ပါသည်။<br><br>
            ၂။ နက္ခတ်နှင့် ပါဒသည် ရွေးထားသောအချိန်ရှိ လ၏တည်နေရာ ဖြစ်ပါသည်။<br><br>
            ၃။ အခမ်းအနား ၁၀ မျိုး၊ ဟိုရာ၊ ချိုဃဒိယာ၊ ဒိုဃဋီ၊ ရာဟုကာလ (၇ ရက်)၊ ပဉ္စက၊ ဘဒြာ၊ လဂ်ဇယား၊ သဗ္ဗတ္ထသိဒ္ဓိ/အမရိတသိဒ္ဓိယောဂနှင့် ခွဲမွေးချိန်းတို့ကို Tab အလိုက် စစ်ဆေးနိုင်ပါသည်။
          </p>
        </section>
      </div>
    ` : ''}
  `;
}

export function bindMuhuratScreen(rerender, onRefreshWallet) {
  if (muhuratState.mode === 'plans') {
    bindMultiSystemPlans(rerender, onRefreshWallet);
    document.querySelector('#muh-open-panchang')?.addEventListener('click', () => {
      muhuratState.mode = 'panchang';
      rerender();
    });
    return;
  }

  const runCalc = async () => {
    muhuratState.loading = true;
    muhuratState.error = '';
    muhuratState.showsAppointment = false;
    rerender();
    try {
      muhuratState.data = await computeMuhurat(muhuratState.date, muhuratState.time, muhuratState.city);
    } catch (err) {
      muhuratState.error = err?.message || 'Calculation failed';
    } finally {
      muhuratState.loading = false;
      rerender();
    }
  };

  if (!muhuratState.data && !muhuratState.loading && !muhuratState.error) {
    void runCalc();
  }

  document.querySelector('#muh-open-plans')?.addEventListener('click', () => {
    muhuratState.mode = 'plans';
    rerender();
  });
  document.querySelector('#muh-show-appt-btn')?.addEventListener('click', () => {
    muhuratState.showsAppointment = true;
    rerender();
  });

  document.querySelector('#muh-open-city')?.addEventListener('click', () => {
    muhuratState.cityPickerOpen = true;
    rerender();
    if (muhuratState.allCities.length <= FAVORITE_CITIES.length) {
      loadCityCatalog().then(list => { muhuratState.allCities = list; if (muhuratState.cityPickerOpen) rerender(); }).catch(() => {});
    }
  });
  document.querySelector('#muh-city-close')?.addEventListener('click', () => { muhuratState.cityPickerOpen = false; rerender(); });
  document.querySelector('#muh-city-backdrop')?.addEventListener('click', e => { if (e.target.id === 'muh-city-backdrop') { muhuratState.cityPickerOpen = false; rerender(); } });
  document.querySelector('#muh-city-search')?.addEventListener('input', e => {
    muhuratState.cityQuery = e.target.value;
    rerender();
    const el = document.querySelector('#muh-city-search');
    if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); }
  });
  document.querySelectorAll('[data-pick-muh-city]').forEach(btn => {
    btn.addEventListener('click', () => {
      const list = searchCities(muhuratState.allCities, muhuratState.cityQuery);
      const picked = list[Number(btn.dataset.pickMuhCity)];
      if (picked) {
        muhuratState.city = picked;
        muhuratState.cityPickerOpen = false;
        void runCalc();
      }
    });
  });

  document.querySelector('#muhurat-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    muhuratState.date = String(fd.get('date') || muhuratState.date);
    muhuratState.time = String(fd.get('time') || muhuratState.time);
    void runCalc();
  });

  document.querySelector('#muh-today-btn')?.addEventListener('click', () => {
    const now = new Date();
    muhuratState.date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
    muhuratState.time = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
    void runCalc();
  });

  document.querySelector('#muh-help-btn')?.addEventListener('click', () => { muhuratState.showHelp = true; rerender(); });
  document.querySelector('#muh-help-close')?.addEventListener('click', () => { muhuratState.showHelp = false; rerender(); });
  document.querySelector('#muh-help-backdrop')?.addEventListener('click', e => { if (e.target.id === 'muh-help-backdrop') { muhuratState.showHelp = false; rerender(); } });
  document.querySelectorAll('[data-muhurat-tab]').forEach(btn => btn.addEventListener('click', () => {
    muhuratState.tab = Number(btn.dataset.muhuratTab);
    rerender();
  }));
}
