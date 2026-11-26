import { authClient, emailSignIn, emailSignUp, signOut } from '../auth.js';
import { escHtml } from './script-loader.js';

const profState = {
  mode: 'login',
  showPassword: false,
  busy: false,
  error: '',
  notice: '',
  displayName: '',
  newPassword: '',
  confirmPassword: ''
};

export function renderProfileScreen({ english, user, base }) {
  const t = (mm, en) => (english ? en : mm);

  if (!user) {
    return `
      <main class="ios-profile-page ios-login-page">
        <div class="ios-login-brand">
          <img src="${escHtml(base)}icons/astrok-pro-mark-192.png" alt="AstroK Pro" class="ios-login-logo">
          <h1>AstroK <span>Pro</span></h1>
          <p class="ios-login-sub">${t('သင့်ရဲ့ ဗေဒင်အဖော်', 'Your Astrology Companion')}</p>
          <span class="ios-ver-pill">${t('ဗားရှင်း 5.0', 'Version 5.0')}</span>
        </div>

        <section class="ios-login-card">
          <h2>${profState.mode === 'login' ? t('Account ဝင်ရန်', 'Sign in') : t('Account ဖွင့်ရန်', 'Create account')}</h2>
          <p class="ios-login-desc">${t('AstroK Pro Account သို့ ဝင်ရောက်ပါ', 'Sign in to your AstroK Pro account')}</p>

          <div class="ios-seg-tabs">
            <button type="button" data-prof-mode="login" class="${profState.mode === 'login' ? 'selected' : ''}">${t('ဝင်ရန်', 'Log in')}</button>
            <button type="button" data-prof-mode="signup" class="${profState.mode === 'signup' ? 'selected' : ''}">${t('အကောင့်ဖွင့်ရန်', 'Sign up')}</button>
          </div>

          ${profState.error ? `<p class="ios-notice-banner error">${escHtml(profState.error)}</p>` : ''}
          ${profState.notice ? `<p class="ios-notice-banner info">${escHtml(profState.notice)}</p>` : ''}

          <form id="ios-profile-auth-form" class="ios-auth-form">
            <label class="ios-input-box">
              <span>${t('အီးမေးလ်', 'Email')}</span>
              <input name="email" type="email" autocomplete="email" placeholder="${t('အီးမေးလ်လိပ်စာ', 'Email address')}" required>
            </label>
            <label class="ios-input-box">
              <span>${t('စကားဝှက်', 'Password')}</span>
              <div class="ios-pass-row">
                <input name="password" type="${profState.showPassword ? 'text' : 'password'}" minlength="6" autocomplete="${profState.mode === 'login' ? 'current-password' : 'new-password'}" placeholder="${t('အနည်းဆုံး ၆ လုံး', 'At least 6 characters')}" required>
                <button type="button" id="prof-toggle-pass" class="ios-eye-btn" aria-label="Toggle password">${profState.showPassword ? '🙈' : '👁'}</button>
              </div>
            </label>
            ${profState.mode === 'signup' ? `
              <label class="ios-input-box">
                <span>${t('စကားဝှက် ထပ်ရိုက်ရန်', 'Confirm password')}</span>
                <input name="confirm" type="${profState.showPassword ? 'text' : 'password'}" minlength="6" autocomplete="new-password" required>
              </label>
            ` : ''}
            <button type="submit" class="ios-primary-pill-btn" ${profState.busy ? 'disabled' : ''}>
              ${profState.busy ? t('လုပ်ဆောင်နေပါသည်…', 'Please wait…') : (profState.mode === 'login' ? t('ဝင်မည် →', 'Sign in →') : t('အကောင့်ဖွင့်မည် →', 'Create account →'))}
            </button>
          </form>
        </section>
      </main>
    `;
  }

  const name = profState.displayName || user.user_metadata?.full_name || user.user_metadata?.name || (user.email || 'A').split('@')[0];
  const initial = name.slice(0, 1).toUpperCase();

  return `
    <header class="ios-nav-bar">
      <span></span>
      <strong>${t('ပရိုဖိုင်', 'Profile')}</strong>
      <span></span>
    </header>
    <main class="ios-profile-page">
      <div class="ios-profile-avatar-section">
        <div class="ios-avatar-wrap large">
          <div class="ios-avatar-circle large">${escHtml(initial)}</div>
          <span class="ios-camera-badge large" aria-hidden="true">📷</span>
        </div>
        <h2>${escHtml(name)}</h2>
      </div>

      <section class="ios-white-card">
        <form id="ios-profile-save-form" class="ios-auth-form">
          <label class="ios-input-box">
            <span>${t('အမည်', 'Display name')}</span>
            <input name="displayName" value="${escHtml(name)}" placeholder="${t('အမည်ထည့်ပါ', 'Enter your name')}" required>
          </label>
          <div class="ios-readonly-box">
            <span>Email</span>
            <div>✉ ${escHtml(user.email || '')}</div>
          </div>
          <button type="submit" class="ios-primary-rect-btn" ${profState.busy ? 'disabled' : ''}>
            ✓ ${t('Profile သိမ်းမည်', 'Save profile')}
          </button>
        </form>
      </section>

      <section class="ios-white-card">
        <h3 class="ios-card-h3">🔒 ${t('Password လုံခြုံရေး', 'Password security')}</h3>
        <p class="ios-muted-note">${t('လုံခြုံရေးအတွက် လက်ရှိ Password ကို ပြန်မဖော်ပြပါ။ ပြောင်းလိုသည့်အခါ Password အသစ်ကို ဒီနေရာမှာထည့်ပါ။', 'For security, your current password cannot be displayed. Enter a new password here when you want to change it.')}</p>
        <form id="ios-password-form" class="ios-auth-form">
          <label class="ios-input-box">
            <span>${t('Password အသစ်', 'New password')}</span>
            <input name="newPassword" type="password" minlength="6" required>
          </label>
          <label class="ios-input-box">
            <span>${t('Password အသစ် ထပ်မံထည့်ရန်', 'Confirm new password')}</span>
            <input name="confirmPassword" type="password" minlength="6" required>
          </label>
          <button type="submit" class="ios-primary-rect-btn" ${profState.busy ? 'disabled' : ''}>
            🔑 ${t('Password ပြောင်းမည်', 'Change password')}
          </button>
        </form>
      </section>

      ${profState.error ? `<p class="ios-notice-banner error">${escHtml(profState.error)}</p>` : ''}
      ${profState.notice ? `<p class="ios-notice-banner info">${escHtml(profState.notice)}</p>` : ''}

      <button type="button" id="ios-profile-signout" class="ios-danger-outline-btn">
        ${t('Account မှထွက်မည်', 'Sign out')}
      </button>

      <p class="ios-version-footer">AstroK Pro · Version 5.0</p>
    </main>
  `;
}

export function bindProfileScreen(rerender, onSignedOut) {
  document.querySelectorAll('[data-prof-mode]').forEach(btn => {
    btn.addEventListener('click', () => {
      profState.mode = btn.dataset.profMode;
      profState.error = '';
      profState.notice = '';
      rerender();
    });
  });

  document.querySelector('#prof-toggle-pass')?.addEventListener('click', () => {
    profState.showPassword = !profState.showPassword;
    rerender();
  });

  document.querySelector('#ios-profile-auth-form')?.addEventListener('submit', async e => {
    e.preventDefault();
    if (profState.busy) return;
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get('email') || '').trim();
    const password = String(fd.get('password') || '');
    if (profState.mode === 'signup' && password !== String(fd.get('confirm') || '')) {
      profState.error = 'စကားဝှက်နှစ်ခု မတူပါ။';
      rerender();
      return;
    }
    profState.busy = true;
    profState.error = '';
    profState.notice = '';
    rerender();
    try {
      const res = profState.mode === 'signup' ? await emailSignUp(email, password) : await emailSignIn(email, password);
      if (!res.session) {
        profState.notice = 'Email မှ အတည်ပြုလင့်ခ်ကို စစ်ဆေးပါ။';
      }
    } catch (err) {
      profState.error = err?.message || 'အကောင့်ဝင်၍မရပါ။';
    } finally {
      profState.busy = false;
      rerender();
    }
  });

  document.querySelector('#ios-profile-save-form')?.addEventListener('submit', async e => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const displayName = String(fd.get('displayName') || '').trim();
    if (!displayName) return;
    profState.busy = true;
    profState.error = '';
    profState.notice = '';
    rerender();
    try {
      const { error } = await authClient.auth.updateUser({ data: { full_name: displayName, name: displayName } });
      if (error) throw error;
      profState.displayName = displayName;
      profState.notice = 'Profile ကို သိမ်းဆည်းပြီးပါပြီ။';
    } catch (err) {
      profState.error = err?.message || 'Profile သိမ်း၍မရပါ။';
    } finally {
      profState.busy = false;
      rerender();
    }
  });

  document.querySelector('#ios-password-form')?.addEventListener('submit', async e => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const np = String(fd.get('newPassword') || '');
    const cp = String(fd.get('confirmPassword') || '');
    if (np !== cp) {
      profState.error = 'Password အသစ်နှစ်ခု မတူပါ။';
      rerender();
      return;
    }
    profState.busy = true;
    profState.error = '';
    profState.notice = '';
    rerender();
    try {
      const { error } = await authClient.auth.updateUser({ password: np });
      if (error) throw error;
      profState.notice = 'Password ပြောင်းလဲပြီးပါပြီ။';
    } catch (err) {
      profState.error = err?.message || 'Password ပြောင်း၍မရပါ။';
    } finally {
      profState.busy = false;
      rerender();
    }
  });

  document.querySelector('#ios-profile-signout')?.addEventListener('click', async () => {
    try {
      await signOut();
      profState.displayName = '';
      profState.notice = '';
      profState.error = '';
      onSignedOut();
    } catch (err) {
      profState.error = err?.message || 'Sign out failed';
      rerender();
    }
  });
}
