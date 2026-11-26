import { escHtml, fmtKyat } from './script-loader.js';

export const HOME_SYSTEMS = [
  {
    id: 'entry',
    icon: '✦',
    color: '#5B1B77',
    bg: 'linear-gradient(135deg, #5B1B77 0%, #391663 100%)',
    titleMm: 'KP စနစ်',
    titleEn: 'KP Astrology',
    subMm: 'မူလဇာတာ · ဟူးရား · ကောဇာ · Ebook',
    subEn: 'Natal · Horary · Transit · Ebook',
    badgeMm: 'အပြည့်အစုံ',
    badgeEn: 'Full'
  },
  {
    id: 'numerology',
    icon: '🔢',
    color: '#1b6d58',
    bg: 'linear-gradient(135deg, #1b6d58 0%, #0f4c3c 100%)',
    titleMm: 'ဂဏန်းဗေဒင်',
    titleEn: 'Numerology',
    subMm: 'ဂဏန်းဇာတာ · အမည် · ၉ နှစ်စက်ဝန်း',
    subEn: 'Birth & Name Charts · 9-Year Cycle'
  },
  {
    id: 'trisakka',
    icon: '☸',
    color: '#8f2d1d',
    bg: 'linear-gradient(135deg, #a63421 0%, #6b1d12 100%)',
    titleMm: 'တြိစက္ကဇာတာ',
    titleEn: 'Trisakka Chart',
    subMm: 'ရာသီ · ဘာဝ · နဝင်း · ဒသာ · အဟော',
    subEn: 'Rashi · Bhava · Navamsa · Readings'
  },
  {
    id: 'msann',
    icon: '🏛',
    color: '#8a5a10',
    bg: 'linear-gradient(135deg, #9d6812 0%, #664208 100%)',
    titleMm: 'M-Sann',
    titleEn: 'Myanmar Traditional',
    subMm: 'မဟာဘုတ် · အင်္ဂဝိဇ္ဇာ · ဆန်း · မဟာကာလ',
    subEn: 'Mahabote · Anga Vissa · Sann · Kala'
  },
  {
    id: 'muhurat',
    icon: '☀',
    color: '#0e5b82',
    bg: 'linear-gradient(135deg, #1271a1 0%, #0a415e 100%)',
    titleMm: 'မုဟုတ္တ',
    titleEn: 'Muhurat',
    subMm: 'ပဉ္စင်္ဂ · ဟောရာ · ချောဂဒီယာ · ရက်ကောင်း',
    subEn: 'Panchang · Hora · Choghadiya · Timing'
  },
  {
    id: 'tarot',
    icon: '☾',
    color: '#4a2f8f',
    bg: 'linear-gradient(135deg, #5c3db0 0%, #2e1d5e 100%)',
    titleMm: 'တားရော့',
    titleEn: 'Tarot',
    subMm: '၁/၃/၁၂ ကတ် · မေးခွန်း · ယတြာကတ်',
    subEn: '1/3/12 Cards · Ask Anything · Yatra'
  },
  {
    id: 'books',
    icon: '📚',
    color: '#2c4c7e',
    bg: 'linear-gradient(135deg, #345c99 0%, #1d365c 100%)',
    titleMm: 'ဗေဒင်စာအုပ်များ',
    titleEn: 'Astrology Books',
    subMm: 'Ebook စာကြည့်တိုက် · အခမဲ့နှင့် စာအုပ်များ',
    subEn: 'Ebook Library · Free & Pro Books'
  },
  {
    id: 'courses',
    icon: '🎓',
    color: '#7c2455',
    bg: 'linear-gradient(135deg, #942b66 0%, #5a163d 100%)',
    titleMm: 'သင်တန်း',
    titleEn: 'Courses',
    subMm: 'မြန်မာ့ရိုးရာ Lv 1–8 · KP Lv 1–4',
    subEn: 'Myanmar Lv 1–8 · KP Lv 1–4'
  }
];

export function renderHomeScreen({ english, user, wallet, base }) {
  const t = (mm, en) => (english ? en : mm);
  const kyat = wallet?.kyatBalance ?? null;
  const activePlans = (wallet?.planEntitlements || []).filter(item =>
    item.lifetime === true || (item.expiresAt && Date.parse(item.expiresAt) > Date.now())
  );

  return `
    <header class="ios-header home-top-header">
      <div class="home-brand-left">
        <img class="header-brand-mark" src="${escHtml(base)}icons/astrok-pro-mark-192.png" alt="AstroK Pro">
        <div>
          <strong>AstroK Pro</strong>
          <small>${t('သင့်ရဲ့ ဗေဒင်အဖော်', 'Your Astrology Companion')}</small>
        </div>
      </div>
      <div class="home-header-actions">
        <label class="language-toggle compact">
          <b>${english ? 'EN' : 'MM'}</b>
          <input id="home-language" type="checkbox" ${english ? 'checked' : ''}>
          <i></i>
        </label>
        <button type="button" class="account-header-button" id="account-button" aria-label="${t('အကောင့်', 'Account')}">
          ${user ? escHtml((user.email || 'A').slice(0, 1).toUpperCase()) : t('ဝင်ရန်', 'Log in')}
        </button>
      </div>
    </header>

    <main class="ak-home-main">
      <section class="ak-hero-card">
        <div class="ak-hero-text">
          <span class="ak-hero-kicker">ASTROK PRO WEB APP</span>
          <h1>${t('ဗေဒင်ပညာရပ်အားလုံး တစ်နေရာတည်းမှာ', 'All Astrology Systems in One Place')}</h1>
          <p>${t('KP နက္ခတ်၊ ဂဏန်းဗေဒင်၊ တြိစက္က၊ M-Sann၊ မုဟုတ္တ၊ တားရော့၊ စာအုပ်နှင့် သင်တန်းများကို Browser မှ တိုက်ရိုက်အသုံးပြုနိုင်ပါပြီ။', 'Use KP Astrology, Numerology, Trisakka, M-Sann, Muhurat, Tarot, Books, and Courses right in your browser.')}</p>
        </div>
        <div class="ak-hero-meta">
          ${user ? `
            <div class="ak-wallet-pill">
              <span>${t('ကျပ်ငွေလက်ကျန်', 'Kyat Balance')}</span>
              <strong>${kyat !== null ? escHtml(fmtKyat(kyat, english)) : '…'}</strong>
            </div>
            <div class="ak-wallet-pill subtle">
              <span>${t('လက်ရှိ Plan', 'Active Plans')}</span>
              <strong>${activePlans.length ? escHtml(activePlans.map(p => `${p.system.toUpperCase()} ${p.plan}`).slice(0, 2).join(', ')) : t('Free', 'Free')}</strong>
            </div>
          ` : `
            <button type="button" class="ak-hero-login-btn" id="home-hero-login">
              ${t('AstroK Pro အကောင့်ဝင်ရန်', 'Sign in to AstroK Pro')} →
            </button>
          `}
        </div>
      </section>

      <section class="ak-grid-section" aria-label="${t('ဗေဒင်စနစ်များ', 'Astrology Systems')}">
        <div class="ak-system-grid">
          ${HOME_SYSTEMS.map(sys => `
            <button type="button" class="ak-system-card" data-open-system="${sys.id}">
              <span class="ak-system-icon" style="background:${sys.bg}">${sys.icon}</span>
              <span class="ak-system-info">
                <strong>${escHtml(english ? sys.titleEn : sys.titleMm)}</strong>
                <small>${escHtml(english ? sys.subEn : sys.subMm)}</small>
              </span>
              <span class="ak-system-arrow" aria-hidden="true">›</span>
            </button>
          `).join('')}
        </div>
      </section>

      <section class="ak-quick-links">
        <button type="button" class="ak-quick-btn" data-entry-tab="plans">
          <span>💎</span>
          <div>
            <strong>${t('Plan များနှင့် စျေးနှုန်း', 'Plans & Pricing')}</strong>
            <small>${t('စနစ် ၆ မျိုးအတွက် Standard / Premium Plan များ', 'Standard & Premium plans for all 6 systems')}</small>
          </div>
        </button>
        <button type="button" class="ak-quick-btn" data-entry-tab="key">
          <span>🔑</span>
          <div>
            <strong>${t('Plan Key ထည့်သွင်းရန်', 'Activate Plan Key')}</strong>
            <small>${t('ဝယ်ယူထားသော Key ကို အကောင့်နှင့် ချိတ်ရန်', 'Link your purchased key to your account')}</small>
          </div>
        </button>
      </section>
    </main>
  `;
}
