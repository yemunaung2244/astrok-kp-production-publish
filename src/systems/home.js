import { escHtml, toMyDigits } from './script-loader.js';

export const HOME_SYSTEMS = [
  { id: 'entry', img: 'KPGoldCardV2.jpg', titleMm: 'KP စနစ်', titleEn: 'KP System', bottomPad: 6 },
  { id: 'numerology', img: 'NumerologyGoldCardV2.jpg', titleMm: 'ဂဏန်းဗေဒင်', titleEn: 'Numerology', bottomPad: 6 },
  { id: 'trisakka', img: 'TrisakkaGoldCard.jpg', titleMm: 'တြိစက္ကဇာတာ', titleEn: 'Trisakka Chart', bottomPad: 12 },
  { id: 'msann', img: 'MSannGoldCard.jpg', titleMm: 'M-Sann', titleEn: 'M-Sann', bottomPad: 12 },
  { id: 'muhurat', img: 'PanchangGoldCard.jpg', titleMm: 'မုဟုတ္တ', titleEn: 'Muhurat', bottomPad: 12 },
  { id: 'tarot', img: 'TarotGoldCard.jpg', titleMm: 'တားရော့', titleEn: 'Tarot', bottomPad: 12 },
  { id: 'books', img: 'BooksGoldCard.jpg', titleMm: 'ဗေဒင်စာအုပ်များ', titleEn: 'Astrology Books', bottomPad: 12 },
  { id: 'courses', img: 'CoursesGoldCard.jpg', titleMm: 'သင်တန်း', titleEn: 'Courses', bottomPad: 12 }
];

function compactKyat(value, english) {
  const n = Number(value || 0);
  const formatted = n.toLocaleString('en-US');
  return english ? `MMK ${formatted}` : `${formatted} ကျပ်`;
}

export function renderIOSFloatingTabBar(screen, english) {
  const t = (mm, en) => (english ? en : mm);
  const tabs = [
    {
      id: 'home',
      label: t('မူလ', 'Home'),
      icon: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>'
    },
    {
      id: 'plans',
      label: t('ငွေဖြည့်ရန်', 'Top Up'),
      icon: '<rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20M6 15h4"/>'
    },
    {
      id: 'profile',
      label: t('ပရိုဖိုင်', 'Profile'),
      icon: '<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5"/>'
    }
  ];
  return `
    <nav class="ios-floating-tabbar" aria-label="${t('မူလလမ်းညွှန်', 'Main navigation')}">
      ${tabs.map(tab => {
        const selected = screen === tab.id || (tab.id === 'plans' && screen === 'key');
        return `
          <button type="button" class="ios-tab-btn ${selected ? 'selected' : ''}" data-entry-tab="${tab.id}" ${selected ? 'aria-current="page"' : ''}>
            <span class="ios-tab-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="${selected ? '2.2' : '1.8'}" stroke-linecap="round" stroke-linejoin="round">${tab.icon}</svg>
            </span>
            <span class="ios-tab-label">${escHtml(tab.label)}</span>
            <i class="ios-tab-pill"></i>
          </button>
        `;
      }).join('')}
    </nav>
  `;
}

export function renderHomeScreen({ english, user, wallet, base }) {
  const t = (mm, en) => (english ? en : mm);
  const kyat = wallet?.kyatBalance ?? 0;
  const hasVault = Boolean(wallet?.bankVault && (wallet?.bankVaultLifetime || (wallet?.bankVaultExpiresAt && Date.parse(wallet.bankVaultExpiresAt) > Date.now())));
  const displayName = (user?.user_metadata?.full_name || user?.user_metadata?.name || (user?.email ? user.email.split('@')[0] : '') || 'AstroK Pro').trim();
  const initial = displayName.slice(0, 1).toUpperCase();

  return `
    <div class="ios-home-bg" style="--dawn-bg: url('${escHtml(base)}ios-assets/HomeDawnBackground.jpg')">
      <main class="ios-home-scroll">
        <div class="ios-home-top-controls">
          <div class="ios-lang-capsule" role="group" aria-label="Language">
            <button type="button" class="ios-lang-btn ${!english ? 'selected' : ''}" data-set-lang="my">
              <span>🇲🇲</span><b>မြန်မာ</b>
            </button>
            <button type="button" class="ios-lang-btn ${english ? 'selected' : ''}" data-set-lang="en">
              <span>🇬🇧</span><b>English</b>
            </button>
          </div>

          <div class="ios-top-right-pills">
            <button type="button" class="ios-kyat-capsule" data-entry-tab="plans">
              <span class="ios-kyat-icon" aria-hidden="true">💵</span>
              <strong>${escHtml(compactKyat(kyat, english))}</strong>
            </button>
            <button type="button" class="ios-bell-circle" data-entry-tab="notifications" aria-label="${t('အသိပေးချက်များ', 'Notifications')}" title="${t('အသိပေးချက်များ', 'Notifications')}">
              <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true"><path d="M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22Zm7-6v-5a7 7 0 0 0-5.5-6.84V3.5a1.5 1.5 0 0 0-3 0v.66A7 7 0 0 0 5 11v5l-2 2v1h18v-1l-2-2Z"/></svg>
            </button>
          </div>
        </div>

        <section class="ios-profile-hero" data-entry-tab="profile" role="button" tabindex="0">
          <div class="ios-avatar-wrap">
            <div class="ios-avatar-circle">${(() => { const photo = typeof localStorage !== 'undefined' ? localStorage.getItem('astrok.web.profile.photo') : ''; return photo ? `<img src="${escHtml(photo)}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:50%">` : escHtml(initial); })()}</div>
            <span class="ios-camera-badge" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M9 3 7.17 5H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3.17L15 3H9Zm3 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-2.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/></svg>
            </span>
          </div>
          <div class="ios-hero-info">
            <span class="ios-sparkle-mark">✦</span>
            <h2>${escHtml(displayName)}</h2>
            <p>${t('KP နက္ခတ်ဗေဒင်', 'KP Astrology')}</p>
            <div class="ios-hero-badges">
              <span class="ios-ver-pill">Version 5.0</span>
              ${hasVault ? `<span class="ios-vault-pill">${t('ဘဏ်တိုက်', 'Bank Vault')}</span>` : ''}
            </div>
          </div>
        </section>

        <h1 class="ios-section-heading">${t('ဗေဒင်စနစ်များ', 'Astrology Systems')}</h1>

        <div class="ios-gold-grid">
          ${HOME_SYSTEMS.map(sys => `
            <button type="button" class="ios-gold-card" data-open-system="${sys.id}">
              <img src="${escHtml(base)}ios-assets/${escHtml(sys.img)}" alt="${escHtml(english ? sys.titleEn : sys.titleMm)}" loading="eager">
              <span class="ios-gold-label" style="padding-bottom:${sys.bottomPad}px">${escHtml(english ? sys.titleEn : sys.titleMm)}</span>
            </button>
          `).join('')}
        </div>
      </main>
    </div>
  `;
}
