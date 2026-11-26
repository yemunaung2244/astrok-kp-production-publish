import { authClient, apiOrigin, publishableKey } from '../auth.js';
import { loadJson, escHtml, toMyDigits } from './script-loader.js';
import { renderSystemPlansOnly, bindMultiSystemPlans } from './plans-wallet.js';

const today = new Date();
const MYANMAR_MONTHS = [
  'ဇန်နဝါရီ', 'ဖေဖော်ဝါရီ', 'မတ်', 'ဧပြီ', 'မေ', 'ဇွန်',
  'ဇူလိုင်', 'ဩဂုတ်', 'စက်တင်ဘာ', 'အောက်တိုဘာ', 'နိုဝင်ဘာ', 'ဒီဇင်ဘာ'
];

const numState = {
  entryTab: 'calc', // 'calc' | 'plans'
  name: '',
  day: '',
  month: '',
  year: '',
  targetYear: String(today.getFullYear()),
  resultTab: 0,
  data: null,
  loading: false,
  error: '',
  needsPlan: false,
  needsLogin: false,
  result: null
};

export function hasNumerologyPremium(wallet) {
  if (!wallet) return false;
  const now = Date.now();
  const hasVault = Boolean(
    wallet.bankVault &&
    (wallet.bankVaultLifetime || (wallet.bankVaultExpiresAt && Date.parse(wallet.bankVaultExpiresAt) > now))
  );
  if (hasVault) return true;
  const entitlements = wallet.planEntitlements || [];
  return entitlements.some(e =>
    e.plan === 'premium' &&
    (e.system === 'numerology' || e.system === 'all') &&
    (e.lifetime === true || (e.expiresAt && Date.parse(e.expiresAt) > now))
  );
}

function normalizeDigits(text) {
  const my = '၀၁၂၃၄၅၆၇၈၉';
  return String(text ?? '').trim().replace(/[၀-၉]/g, ch => String(my.indexOf(ch)));
}

function enteredNumber(text) {
  const norm = normalizeDigits(text);
  if (!/^\d+$/.test(norm)) return null;
  return Number(norm);
}

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

function computeNumerology(day, month, year, targetYear, name) {
  const d = enteredNumber(day);
  const m = enteredNumber(month);
  const y = enteredNumber(year);
  if (!d || !m || !y || d < 1 || d > 31 || m < 1 || m > 12 || y < 1 || y > 9999) {
    throw new Error('မွေးရက်၊ လ၊ နှစ်ကို မှန်ကန်စွာ ထည့်ပါ။');
  }
  const ty = enteredNumber(targetYear);
  if (!ty || ty < 1 || ty > 9999) {
    throw new Error('ဟောမည့်နှစ်ကို မှန်ကန်စွာ ထည့်ပါ။');
  }
  const checkDate = new Date(Date.UTC(y, m - 1, d));
  if (
    checkDate.getUTCFullYear() !== y ||
    checkDate.getUTCMonth() + 1 !== m ||
    checkDate.getUTCDate() !== d ||
    checkDate.getTime() > Date.now()
  ) {
    throw new Error('မွေးသက္ကရာဇ်ကို ပြန်စစ်ပါ။');
  }

  const counts = Array(10).fill(0);
  for (const ch of `${m}${d}${y}`) {
    const n = Number(ch);
    if (n >= 0 && n <= 9) counts[n]++;
  }

  const rulingTotal = digitSum(`${m}${d}${y}`);
  const ruling = numberLabel(rulingTotal, true);
  const birthDay = numberLabel(d, false);
  const personalYear = reduceNum(digitSum(String(ty)) + digitSum(String(m)) + digitSum(String(d)));

  const mr = reduceNum(m);
  const dr = reduceNum(digitSum(String(d)));
  const yr = reduceNum(digitSum(String(y)));
  const first = reduceNum(mr + dr);
  const second = reduceNum(dr + yr);
  const pinnacles = [first, second, reduceSpecial(first + second), reduceSpecial(mr + yr)];
  const rulingBase = ruling === '22/4' ? 4 : (Number(ruling) || 0);
  const pinnacleAges = [36, 45, 54, 63].map(a => a - rulingBase);

  const cleanName = String(name || '').trim();
  const nameCounts = Array(10).fill(0);
  let soulTotal = 0;
  let outerTotal = 0;
  for (const ch of cleanName.toUpperCase()) {
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

  return {
    day: d,
    month: m,
    year: y,
    targetYear: ty,
    name: cleanName,
    counts,
    nameCounts,
    ruling,
    birthDay,
    personalYear,
    pinnacles,
    pinnacleAges,
    soul,
    outer,
    fullName,
    fullNameTotal
  };
}

function buildAllReadings(res, book) {
  const readings = [];
  const add = (id, title, paragraphs) => {
    const list = Array.isArray(paragraphs)
      ? paragraphs.map(p => String(p || '').trim()).filter(Boolean)
      : (typeof paragraphs === 'string' && paragraphs.trim() ? [paragraphs.trim()] : []);
    if (list.length) readings.push({ id, title, paragraphs: list });
  };

  // 1. Ruling & Birth Day
  add('ruling', `အုပ်စိုးကိန်း ${toMyDigits(res.ruling)}`, book?.rulingReadings?.[res.ruling]);
  add('birth', `မွေးရက်ကိန်း ${toMyDigits(res.birthDay)}`, book?.birthDayReadings?.[res.birthDay]);

  // 2. Zero & Digits 1..9 (combines numberMeanings + digitReadings[count], includes missing 6)
  if (res.counts[0] > 0) {
    add('zero', 'သုည၏ အဓိပ္ပာယ်', book?.numberMeanings?.['0']);
  }
  for (let n = 1; n <= 9; n++) {
    const count = res.counts[n];
    if (count === 0 && n !== 6) continue;
    const baseMeanings = book?.numberMeanings?.[String(n)] || [];
    const countMeanings = book?.digitReadings?.[String(n)]?.[String(Math.min(count, 5))] || [];
    const combined = [...baseMeanings, ...countMeanings];
    const title = count === 0
      ? 'ဂဏန်း ၆ မရှိခြင်း'
      : `ဂဏန်း ${toMyDigits(n)} — ${toMyDigits(count)} လုံး`;
    add(`digit-${n}`, title, combined);
  }

  // 3. Three Planes (Mind 3-6-9, Soul 2-5-8, Physical 1-4-7)
  const mindCount = res.counts[3] + res.counts[6] + res.counts[9];
  const soulCount = res.counts[2] + res.counts[5] + res.counts[8];
  const physCount = res.counts[1] + res.counts[4] + res.counts[7];
  add('mind', `စိတ်ပိုင်းဆိုင်ရာ • ${toMyDigits(mindCount)} လုံး`, book?.planes?.mind);
  add('soul', `စိတ်ခံစားမှု • ${toMyDigits(soulCount)} လုံး`, book?.planes?.soul);
  add('physical', `ရုပ်ပိုင်းဆိုင်ရာ • ${toMyDigits(physCount)} လုံး`, book?.planes?.physical);

  // 4. Isolated Corner Digits (1, 3, 7, 9)
  const corners = [[1, 2, 4, 5], [3, 2, 5, 6], [7, 4, 5, 8], [9, 5, 6, 8]];
  for (const [corner, ...neighbors] of corners) {
    if (res.counts[corner] > 0 && neighbors.every(n => res.counts[n] === 0)) {
      add(`isolated-${corner}`, `သီးခြား ဂဏန်း ${toMyDigits(corner)}`, book?.isolatedReadings?.[String(corner)]);
    }
  }

  // 5. Personality Arrows (Present & Absent)
  for (const arrow of (book?.arrows || [])) {
    const digits = String(arrow.digits || '').split('').map(Number).filter(n => n >= 1 && n <= 9);
    if (!digits.length) continue;
    if (digits.every(d => res.counts[d] > 0)) {
      add(`arrow-full-${arrow.digits}`, `${arrow.presentTitle} (${toMyDigits(arrow.digits)})`, arrow.present);
    } else if (digits.every(d => res.counts[d] === 0) && arrow.absentTitle) {
      add(`arrow-empty-${arrow.digits}`, `${arrow.absentTitle} (${toMyDigits(arrow.digits)})`, arrow.absent);
    }
  }

  // 6. 9-Year Cycle Personal Year
  const yearKey = String(res.personalYear);
  add(
    'personal-year',
    `${toMyDigits(res.targetYear)} ခုနှစ် • ပုဂ္ဂိုလ်ရေးနှစ် ${toMyDigits(res.personalYear)}`,
    book?.personalYearReadings?.[yearKey] || ['ဒီနှစ်အတွက် သီးသန့်အဟော မရရှိသေးပါ။']
  );

  // 7. All 12 Personal Months
  const monthReadings = book?.personalMonthReadings?.[yearKey];
  if (monthReadings) {
    for (let month = 1; month <= 12; month++) {
      add(`month-${month}`, MYANMAR_MONTHS[month - 1], monthReadings[String(month)]);
    }
  }

  // 8. All 4 Pyramid Pinnacles
  for (let i = 0; i < 4; i++) {
    const number = res.pinnacles[i];
    const age = res.pinnacleAges[i];
    const calYear = res.year + age;
    add(
      `pinnacle-${i}`,
      `အထွတ်အထိပ် ${toMyDigits(i + 1)} • ကိန်း ${toMyDigits(number)} • အသက် ${toMyDigits(age)} (${toMyDigits(calYear)})`,
      book?.pinnacleReadings?.[String(number)]
    );
  }

  // 9. Name Readings (Soul & Outer)
  if (res.fullNameTotal > 0) {
    add('name-soul', `စိတ်ဝိညာဉ်တွန်းအားကိန်း ${toMyDigits(res.soul)}`, book?.nameSoulReadings?.[res.soul]);
    add('name-outer', `ပြင်ပထုတ်ဖော်ချက်ကိန်း ${toMyDigits(res.outer)}`, book?.nameOuterReadings?.[res.outer]);
  }

  return readings;
}

function renderIOSNumeralGrid(counts) {
  const rows = [
    [3, 6, 9],
    [2, 5, 8],
    [1, 4, 7]
  ];
  return `
    <div class="ios-num-grid-wrap">
      ${rows.map(row => `
        <div class="ios-num-grid-row">
          ${row.map(digit => {
            const c = counts[digit] || 0;
            const text = c === 0 ? String(digit) : String(digit).repeat(c);
            const dense = c > 3 ? ' dense' : '';
            return `<div class="ios-num-cell ${c === 0 ? 'empty' : 'filled'}${dense}" aria-label="ဂဏန်း ${digit} ${c} လုံး">${escHtml(text)}</div>`;
          }).join('')}
        </div>
      `).join('')}
    </div>
  `;
}

function renderGoldPill(title, value) {
  return `
    <div class="ios-num-gold-pill">
      <small>${escHtml(title)}</small>
      <strong>${escHtml(toMyDigits(value))}</strong>
    </div>
  `;
}

function renderHeroBanner() {
  const ringDigits = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => {
    const angle = (n * Math.PI * 2) / 9;
    const x = Math.round(42 * Math.cos(angle));
    const y = Math.round(42 * Math.sin(angle));
    return `<span style="transform:translate(${x}px,${y}px)">${n}</span>`;
  }).join('');

  return `
    <section class="ios-num-hero-card">
      <div class="ios-num-orbit" aria-hidden="true">
        <div class="ios-num-ring outer"></div>
        <div class="ios-num-ring inner"></div>
        <div class="ios-num-center">1–9</div>
        ${ringDigits}
      </div>
      <div class="ios-num-hero-copy">
        <h2>ဂဏန်းများထဲက သင့်ဇာတာ</h2>
        <p>မွေးသက္ကရာဇ်၊ အမည်နဲ့ နှစ်အလိုက် သင့်အတွက် အဟောများ</p>
      </div>
    </section>
  `;
}

function renderNumerologyResult(res, book, english) {
  const t = (mm, en) => (english ? en : mm);
  const allReadings = buildAllReadings(res, book);
  const hasName = res.fullNameTotal > 0;
  const readingOffset = hasName ? 2 : 1;
  const titles = [
    t('ဂဏန်းဇာတာ', 'Numerology chart'),
    ...(hasName ? [t('အမည်ဇာတာ', 'Name chart')] : []),
    ...allReadings.map(r => r.title)
  ];
  const activeIdx = Math.min(Math.max(0, numState.resultTab), titles.length - 1);

  let cardHtml = '';
  if (activeIdx === 0) {
    cardHtml = `
      <section class="ios-num-card">
        <h3 class="ios-num-card-title">▦ မွေးသက္ကရာဇ် ဂဏန်းဇယား</h3>
        <p class="ios-num-card-sub">${escHtml(`${toMyDigits(res.day)} / ${toMyDigits(res.month)} / ${toMyDigits(res.year)}`)}</p>
        ${renderIOSNumeralGrid(res.counts)}
        <div class="ios-num-pill-row two">
          ${renderGoldPill('အုပ်စိုးကိန်း', res.ruling)}
          ${renderGoldPill('မွေးရက်ကိန်း', res.birthDay)}
        </div>
      </section>
    `;
  } else if (hasName && activeIdx === 1) {
    cardHtml = `
      <section class="ios-num-card">
        <h3 class="ios-num-card-title">🪪 အမည်ဇယား</h3>
        <p class="ios-num-card-sub">${escHtml(res.name)}</p>
        ${renderIOSNumeralGrid(res.nameCounts)}
        <div class="ios-num-pill-row three">
          ${renderGoldPill('စိတ်ဝိညာဉ်', res.soul)}
          ${renderGoldPill('ပြင်ပ', res.outer)}
          ${renderGoldPill('အမည်ကိန်း', res.fullName)}
        </div>
      </section>
    `;
  } else {
    const reading = allReadings[activeIdx - readingOffset];
    if (reading) {
      cardHtml = `
        <section class="ios-num-card">
          <h3 class="ios-num-reading-title">${escHtml(reading.title)}</h3>
          <div class="ios-num-reading-body">
            ${reading.paragraphs.map(p => `<p>${escHtml(p)}</p>`).join('')}
          </div>
        </section>
      `;
    }
  }

  return `
    <div class="ios-num-result-topbar">
      <button type="button" id="num-new-calc" class="ios-num-back-pill">← ${t('အသစ်ပြန်တွက်ရန်', 'New calculation')}</button>
      <span class="ios-num-count-tag">${toMyDigits(activeIdx + 1)} / ${toMyDigits(titles.length)}</span>
    </div>
    <nav class="ios-num-result-tabs" aria-label="${t('ဟောစာတမ်းများ', 'Readings')}">
      ${titles.map((label, idx) => `
        <button type="button" data-num-rtab="${idx}" class="${activeIdx === idx ? 'selected' : ''}">
          ${escHtml(label)}
        </button>
      `).join('')}
    </nav>
    ${cardHtml}
  `;
}

function renderEntryBottomBar(english) {
  const t = (mm, en) => (english ? en : mm);
  return `
    <nav class="ios-floating-tabbar" aria-label="Numerology Tabs">
      <button type="button" class="ios-tab-btn ${numState.entryTab === 'calc' ? 'selected' : ''}" data-num-entry="calc">
        <span class="ios-tab-icon">▦</span>
        <span class="ios-tab-label">${t('တွက်ရန်', 'Calculate')}</span>
        <span class="ios-tab-pill"></span>
      </button>
      <button type="button" class="ios-tab-btn ${numState.entryTab === 'plans' ? 'selected' : ''}" data-num-entry="plans">
        <span class="ios-tab-icon">💳</span>
        <span class="ios-tab-label">Plans</span>
        <span class="ios-tab-pill"></span>
      </button>
    </nav>
  `;
}

export function renderNumerologyScreen(appHeader, english, wallet) {
  const t = (mm, en) => (english ? en : mm);
  const premium = hasNumerologyPremium(wallet);
  const showingResult = numState.entryTab === 'calc' && numState.result && numState.data;

  const accessBanner = premium
    ? `<div class="ios-num-access-pill active">✓ ${t('Numerology Premium အသုံးပြုနေပါသည် (အကန့်အသတ်မရှိ)', 'Numerology Premium active (unlimited)')}</div>`
    : `<div class="ios-num-access-pill">
        <span>✦ ${t('၁ ကြိမ်တွက်လျှင် ၅၀၀ ကျပ် (သို့) Numerology Premium Plan', '500 Kyat per calculation or Numerology Premium Plan')}</span>
        <button type="button" data-num-entry="plans" class="ios-num-inline-plan-btn">Plans ›</button>
      </div>`;

  return `
    ${appHeader(t('ဂဏန်းဗေဒင်', 'Numerology'), true)}
    <main class="ak-sys-main" style="padding-bottom:${showingResult ? '40px' : '108px'}">
      ${numState.entryTab === 'plans' ? renderSystemPlansOnly('numerology', english, wallet) : showingResult ? renderNumerologyResult(numState.result, numState.data, english) : `
        ${renderHeroBanner()}
        <form id="num-form" class="ios-num-card">
          <h3 class="ios-num-card-title">▦ တွက်ချက်ရန် အချက်အလက်</h3>
          ${accessBanner}
          <div class="ak-form-row three">
            <label class="ios-num-field">
              <span>ရက်</span>
              <input name="day" inputmode="numeric" value="${escHtml(numState.day)}" placeholder="၁၅" required>
            </label>
            <label class="ios-num-field">
              <span>လ</span>
              <input name="month" inputmode="numeric" value="${escHtml(numState.month)}" placeholder="၆" required>
            </label>
            <label class="ios-num-field">
              <span>နှစ်</span>
              <input name="year" inputmode="numeric" value="${escHtml(numState.year)}" placeholder="၁၉၉၀" required>
            </label>
          </div>
          <div class="ios-num-name-year-row">
            <label class="ios-num-field">
              <span>အမည် (English)</span>
              <input name="name" value="${escHtml(numState.name)}" placeholder="အမည်ထည့်ပါ" autocomplete="off">
            </label>
            <label class="ios-num-field year-col">
              <span>ဟောမည့်နှစ်</span>
              <input name="targetYear" inputmode="numeric" value="${escHtml(numState.targetYear)}" placeholder="2026" required>
            </label>
          </div>
          ${numState.error ? `
            <p class="ios-notice-banner error" style="margin:10px 0">${escHtml(numState.error)}</p>
            ${numState.needsPlan ? `<button type="button" data-num-entry="plans" class="ios-soft-action-btn" style="width:100%;margin-bottom:10px"><span>💎 ${t('Numerology Plans ကြည့်ရန်', 'View Numerology Plans')}</span><span>›</span></button>` : ''}
            ${numState.needsLogin ? `<button type="button" data-open-profile-login class="ios-soft-action-btn" style="width:100%;margin-bottom:10px"><span>🔑 ${t('Account ဝင်ရန်', 'Sign In')}</span><span>›</span></button>` : ''}
          ` : ''}
          <button type="submit" class="ios-num-calc-btn" ${numState.loading ? 'disabled' : ''}>
            ✦ ${numState.loading ? t('တွက်ချက်နေပါသည်…', 'Calculating…') : 'ဂဏန်းဇာတာတွက်မည်'}
          </button>
        </form>
      `}
    </main>
    ${showingResult ? '' : renderEntryBottomBar(english)}
  `;
}

export function bindNumerologyScreen(rerender, onRefreshWallet, wallet) {
  document.querySelectorAll('[data-num-entry]').forEach(btn => {
    btn.addEventListener('click', () => {
      numState.entryTab = btn.dataset.numEntry;
      numState.error = '';
      numState.needsPlan = false;
      numState.needsLogin = false;
      rerender();
    });
  });

  document.querySelector('[data-open-profile-login]')?.addEventListener('click', () => {
    window.location.hash = '#profile';
  });

  if (numState.entryTab === 'plans') {
    bindMultiSystemPlans(rerender, onRefreshWallet);
    return;
  }

  document.querySelector('#num-new-calc')?.addEventListener('click', () => {
    numState.result = null;
    numState.resultTab = 0;
    numState.error = '';
    rerender();
  });

  document.querySelectorAll('[data-num-rtab]').forEach(btn => {
    btn.addEventListener('click', () => {
      numState.resultTab = Number(btn.dataset.numRtab) || 0;
      rerender();
      requestAnimationFrame(() => {
        document.querySelector(`[data-num-rtab="${numState.resultTab}"]`)?.scrollIntoView({ inline: 'center', block: 'nearest' });
      });
    });
  });

  document.querySelector('#num-form')?.addEventListener('submit', async e => {
    e.preventDefault();
    if (numState.loading) return;
    const fd = new FormData(e.currentTarget);
    numState.day = String(fd.get('day') || '').trim();
    numState.month = String(fd.get('month') || '').trim();
    numState.year = String(fd.get('year') || '').trim();
    numState.name = String(fd.get('name') || '').trim();
    numState.targetYear = String(fd.get('targetYear') || today.getFullYear()).trim();
    numState.error = '';
    numState.needsPlan = false;
    numState.needsLogin = false;

    let calculated;
    try {
      calculated = computeNumerology(numState.day, numState.month, numState.year, numState.targetYear, numState.name);
    } catch (err) {
      numState.error = err?.message || 'မွေးသက္ကရာဇ်ကို ပြန်စစ်ပါ။';
      rerender();
      return;
    }

    numState.loading = true;
    rerender();
    try {
      const { data: { session } } = await authClient.auth.getSession();
      if (!session?.access_token) {
        numState.needsLogin = true;
        numState.error = 'ကျပ်အသုံးပြုရန် Account ကို အရင်ဝင်ပါ။';
        return;
      }

      // Mirror iOS AppSessionStore.consumeKyat(feature: "numerology_calculation", amount: 500)
      if (!hasNumerologyPremium(wallet)) {
        const balance = Number(wallet?.kyatBalance ?? 0);
        if (balance < 500) {
          numState.needsPlan = true;
          numState.error = 'တွက်ချက်ရန် ၅၀၀ ကျပ် သို့မဟုတ် Numerology Premium Plan လိုအပ်ပါသည်။';
          return;
        }
        const consumeRes = await fetch(`${apiOrigin}/functions/v1/consume-points`, {
          method: 'POST',
          headers: {
            apikey: publishableKey,
            Authorization: `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            feature: 'numerology_calculation',
            amount: 500,
            actionId: crypto.randomUUID()
          })
        });
        if (!consumeRes.ok) {
          const errBody = await consumeRes.json().catch(() => ({}));
          const raw = String(errBody?.error || errBody?.message || '');
          numState.needsPlan = true;
          numState.error = raw.toLowerCase().includes('insufficient')
            ? 'ကျပ်လက်ကျန် မလုံလောက်ပါ။ တွက်ချက်ရန် ၅၀၀ ကျပ် သို့မဟုတ် Numerology Premium Plan လိုအပ်ပါသည်။'
            : 'တွက်ချက်ရန် ၅၀၀ ကျပ် သို့မဟုတ် Numerology Premium Plan လိုအပ်ပါသည်။';
          return;
        }
        if (onRefreshWallet) await onRefreshWallet();
      }

      if (!numState.data) {
        numState.data = await loadJson('data/numerology_book_readings.json');
      }
      numState.result = calculated;
      numState.resultTab = 0;
    } catch (err) {
      numState.error = err?.message || 'ဂဏန်းဗေဒင်အဟောများကို ဖွင့်မရပါ။';
    } finally {
      numState.loading = false;
      rerender();
    }
  });
}
