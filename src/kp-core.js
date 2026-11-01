import { SwissEphemeris, Planet, LunarPoint, HouseSystem, SiderealMode, CalculationFlag } from '@swisseph/browser';
const swissWasmUrl = new URL('../node_modules/@swisseph/browser/dist/swisseph.wasm', import.meta.url).href;

export const SIGN_MM = ['မိဿ','ပြိဿ','မေထုန်','ကရကဋ်','သိဟ်','ကန်','တူ','ဗြိစ္ဆာ','ဓနု','မကာရ','ကုမ်','မိန်'];
export const PLANETS = [
  ['တနင်္ဂနွေ', Planet.Sun], ['တနင်္လာ', Planet.Moon], ['အင်္ဂါ', Planet.Mars],
  ['ဗုဒ္ဓဟူး', Planet.Mercury], ['ကြာသပတေး', Planet.Jupiter], ['သောကြာ', Planet.Venus],
  ['စနေ', Planet.Saturn], ['ရာဟု', LunarPoint.MeanNode]
];
export const LORDS = ['ကိတ်','သောကြာ','တနင်္ဂနွေ','တနင်္လာ','အင်္ဂါ','ရာဟု','ကြာသပတေး','စနေ','ဗုဒ္ဓဟူး'];
export const YEARS = [7,20,6,10,7,18,16,19,17];
const SIGN_LORDS = ['အင်္ဂါ','သောကြာ','ဗုဒ္ဓဟူး','တနင်္လာ','တနင်္ဂနွေ','ဗုဒ္ဓဟူး','သောကြာ','အင်္ဂါ','ကြာသပတေး','စနေ','စနေ','ကြာသပတေး'];
const STAR_SIZE = 360 / 27;
const EPSILON = 1 / 3600;
let enginePromise;

export function normalize(value) {
  if (value >= 0 && value < 360) return value;
  const wrapped = value % 360;
  return wrapped < 0 ? wrapped + 360 : wrapped;
}
export function angleDistance(a, b) { const d = Math.abs(normalize(a - b)); return Math.min(d, 360 - d); }
function snap(value, boundary) {
  const n = normalize(value), nearest = Math.round(n / boundary) * boundary;
  return Math.abs(n - nearest) <= EPSILON ? normalize(nearest) : n;
}
export function lordsFor(longitude) {
  const value = snap(longitude, STAR_SIZE);
  const sign = Math.min(Math.floor(snap(longitude, 30) / 30), 11);
  const star = Math.min(Math.floor(value / STAR_SIZE), 26);
  const startIndex = star % 9;
  const position = value - star * STAR_SIZE;
  let subIndex = startIndex, subStart = 0, cumulative = 0;
  for (let offset = 0; offset < 9; offset++) {
    const index = (startIndex + offset) % 9;
    const span = STAR_SIZE * YEARS[index] / 120;
    if (position < cumulative + span - EPSILON) { subIndex = index; subStart = cumulative; break; }
    cumulative += span;
    if (Math.abs(position - cumulative) <= EPSILON && offset < 8) {
      subIndex = (startIndex + offset + 1) % 9; subStart = cumulative; break;
    }
  }
  const subSpan = STAR_SIZE * YEARS[subIndex] / 120;
  const inSub = Math.max(0, position - subStart);
  let subSubIndex = subIndex, subCumulative = 0;
  for (let offset = 0; offset < 9; offset++) {
    const index = (subIndex + offset) % 9;
    subCumulative += subSpan * YEARS[index] / 120;
    if (inSub < subCumulative - EPSILON) { subSubIndex = index; break; }
    if (Math.abs(inSub - subCumulative) <= EPSILON && offset < 8) {
      subSubIndex = (subIndex + offset + 1) % 9; break;
    }
  }
  return { signLord: SIGN_LORDS[sign], starLord: LORDS[startIndex], subLord: LORDS[subIndex], subSubLord: LORDS[subSubIndex], star: star + 1 };
}
export function horary2193Starts() {
  const starts = [];
  for (let star = 0; star < 27; star++) {
    let cursor = star * STAR_SIZE;
    for (let subOffset = 0; subOffset < 9; subOffset++) {
      const subLord = (star % 9 + subOffset) % 9;
      const subLength = STAR_SIZE * YEARS[subLord] / 120;
      for (let subSubOffset = 0; subSubOffset < 9; subSubOffset++) {
        const subSubLord = (subLord + subSubOffset) % 9;
        const end = cursor + subLength * YEARS[subSubLord] / 120;
        starts.push(normalize(cursor));
        for (let boundary = (Math.floor((cursor + 1e-9) / 30) + 1) * 30; boundary < end - 1e-9; boundary += 30) {
          starts.push(normalize(boundary));
        }
        cursor = end;
      }
    }
  }
  if (starts.length !== 2193) throw new Error('KP ၁–၂၁၉၃ အမှတ်စာရင်း မပြည့်စုံပါ။');
  return starts;
}
const starts2193 = horary2193Starts();
let starts249Promise;
async function horaryTarget(system, number) {
  if (system === 2193) return starts2193[number - 1];
  starts249Promise ??= fetch(`${import.meta.env?.BASE_URL || './'}kp_horary.json`).then(r => {
    if (!r.ok) throw new Error('KP ဟူးရား ၁–၂၄၉ data ကို ဖတ်မရပါ။');
    return r.json();
  });
  const rows = await starts249Promise;
  return rows.find(row => row.number === number)?.from_deg;
}
export async function ephemeris() {
  enginePromise ??= (async () => { const swe = new SwissEphemeris(); await swe.init(swissWasmUrl); return swe; })().catch(error => {
    enginePromise = undefined;
    throw error;
  });
  return enginePromise;
}
export async function transitLongitudeAt(date, profile, bodyName) {
  const swe = await ephemeris();
  const jd = swe.dateToJulianDay(date);
  const mode = Number(profile.ayanamsaIndex) === 1 ? SiderealMode.Lahiri : Number(profile.ayanamsaIndex) === 3 ? SiderealMode.Raman : SiderealMode.Krishnamurti;
  swe.setSiderealMode(mode);
  const ayanamsa = swe.getAyanamsa(jd);
  if (bodyName === 'လဂ်') {
    const longitude = swe.calculateHouses(jd, Number(profile.lat), Number(profile.lon), HouseSystem.Placidus).ascendant;
    return normalize(longitude - ayanamsa);
  }
  if (bodyName === 'ကိတ်') {
    const rahu = swe.calculatePosition(jd, LunarPoint.MeanNode, CalculationFlag.MoshierEphemeris | CalculationFlag.Sidereal | CalculationFlag.Speed);
    return normalize(rahu.longitude + 180);
  }
  const planet = PLANETS.find(([name]) => name === bodyName);
  if (!planet) throw new Error('ရွေးထားသော ကောဇာဂြိုဟ် မတွေ့ပါ။');
  const point = swe.calculatePosition(jd, planet[1], CalculationFlag.MoshierEphemeris | CalculationFlag.Sidereal | CalculationFlag.Speed);
  return normalize(point.longitude);
}
function validate(profile) {
  const year = Number(profile.year), month = Number(profile.month), day = Number(profile.day);
  const hour = Number(profile.hour), minute = Number(profile.min), second = Number(profile.sec);
  const lat = Number(profile.lat), lon = Number(profile.lon), tz = Number(profile.tz);
  if (![year, month, day, hour, minute, second, lat, lon, tz].every(Number.isFinite)
    || year < 1600 || year > 2400 || month < 1 || month > 12 || day < 1 || day > 31
    || hour < 0 || hour > 23 || minute < 0 || minute > 59 || second < 0 || second >= 60
    || lat < -66 || lat > 66 || lon < -180 || lon > 180 || tz < -12 || tz > 14) {
    throw new Error('ရက်စွဲ၊ အချိန်၊ Lat/Long/TZ အချက်အလက်ကို ပြန်စစ်ပါ။ Placidus အတွက် Lat ±66° အတွင်းလိုအပ်ပါသည်။');
  }
  const calendarDate = new Date(Date.UTC(year, month - 1, day));
  if (calendarDate.getUTCFullYear() !== year || calendarDate.getUTCMonth() !== month - 1 || calendarDate.getUTCDate() !== day) {
    throw new Error('ရက်စွဲ မမှန်ပါ။');
  }
  if (profile.isHorary) {
    const n = Number(profile.horaryNumber), max = Number(profile.horaryNumberSystem);
    if (!Number.isInteger(n) || n < 1 || n > max || ![249, 2193].includes(max)) throw new Error('ဟူးရားနံပါတ်ကို ရွေးထားသောစနစ်အတွင်း ထည့်ပါ။');
  }
  return { year, month, day, hour, minute, second, lat, lon, tz };
}
function houseOf(longitude, cusps) {
  for (let i = 0; i < 12; i++) {
    const start = cusps[i].longitude, end = cusps[(i + 1) % 12].longitude;
    if (normalize(longitude - start) < normalize(end - start)) return i + 1;
  }
  return 12;
}
function closestLongitudeForAsc(swe, jd, lat, target, ayanamsa) {
  let best = { lon: 0, distance: Infinity };
  for (const [step, radius] of [[1, 180], [0.01, 1], [0.0001, 0.01]]) {
    const center = best.lon;
    for (let delta = -radius; delta <= radius + step / 2; delta += step) {
      const lon = normalize(center + delta + 180) - 180;
      const asc = normalize(swe.calculateHouses(jd, lat, lon, HouseSystem.Placidus).ascendant - ayanamsa);
      const distance = angleDistance(asc, target);
      if (distance < best.distance) best = { lon, distance };
    }
  }
  if (best.distance > 0.02) throw new Error('ဟူးရားလဂ်ကို တိကျစွာ မတွက်နိုင်ပါ။');
  return best.lon;
}
export async function calculate(profile) {
  const p = validate(profile);
  const swe = await ephemeris();
  const utc = new Date(Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second) - p.tz * 3600000);
  const jd = swe.dateToJulianDay(utc);
  const mode = Number(profile.ayanamsaIndex) === 1 ? SiderealMode.Lahiri : Number(profile.ayanamsaIndex) === 3 ? SiderealMode.Raman : SiderealMode.Krishnamurti;
  swe.setSiderealMode(mode);
  const ayanamsa = swe.getAyanamsa(jd);
  const flags = CalculationFlag.MoshierEphemeris | CalculationFlag.Sidereal | CalculationFlag.Speed;
  const planets = PLANETS.map(([name, body], index) => {
    const position = swe.calculatePosition(jd, body, flags);
    const longitude = normalize(position.longitude);
    return { index, name, longitude, speed: position.longitudeSpeed, lords: lordsFor(longitude) };
  });
  const rahu = planets[7];
  const ketuLongitude = normalize(rahu.longitude + 180);
  planets.push({ index: 8, name: 'ကိတ်', longitude: ketuLongitude, speed: rahu.speed, lords: lordsFor(ketuLongitude) });
  let houseLongitude = p.lon;
  let targetAscendant;
  if (profile.isHorary) {
    targetAscendant = await horaryTarget(Number(profile.horaryNumberSystem), Number(profile.horaryNumber));
    if (!Number.isFinite(targetAscendant)) throw new Error('ဟူးရားနံပါတ် data မတွေ့ပါ။');
    houseLongitude = closestLongitudeForAsc(swe, jd, p.lat, targetAscendant, ayanamsa);
  }
  const houses = swe.calculateHouses(jd, p.lat, houseLongitude, HouseSystem.Placidus);
  const cusps = Array.from({ length: 12 }, (_, index) => {
    const longitude = index === 0 && targetAscendant !== undefined
      ? normalize(targetAscendant)
      : normalize(houses.cusps[index + 1] - ayanamsa);
    return { number: index + 1, longitude, lords: lordsFor(longitude) };
  });
  for (const planet of planets) planet.house = houseOf(planet.longitude, cusps);
  return { profile, utc: utc.toISOString(), julianDay: jd, ayanamsa, planets, cusps, dasha: profile.isHorary ? [] : dashaPeriods(planets[1].longitude, utc) };
}
export function dashaPeriods(moonLongitude, birthUTC) {
  const star = Math.floor(normalize(moonLongitude) / STAR_SIZE);
  const first = star % 9;
  const inside = normalize(moonLongitude) - star * STAR_SIZE;
  let cursor = new Date(birthUTC).getTime();
  const periods = [];
  for (let i = 0; i < 9; i++) {
    const index = (first + i) % 9;
    const years = i === 0 ? YEARS[index] * (1 - inside / STAR_SIZE) : YEARS[index];
    const end = cursor + years * 365.2425 * 86400000;
    periods.push({ lord: LORDS[index], start: new Date(cursor).toISOString(), end: new Date(end).toISOString(), years });
    cursor = end;
  }
  return periods;
}
export function degreeText(longitude) {
  const value = normalize(longitude), sign = Math.floor(value / 30), part = value - sign * 30;
  const degrees = Math.floor(part), minutes = Math.round((part - degrees) * 60);
  return `${SIGN_MM[sign]} ${String(degrees + (minutes === 60 ? 1 : 0)).padStart(2, '0')}° ${String(minutes % 60).padStart(2, '0')}′`;
}
