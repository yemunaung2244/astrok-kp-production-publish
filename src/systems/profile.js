import {
  authClient,
  emailSignIn,
  emailSignUp,
  signInWithGoogle,
  signInWithOAuthProvider,
  sendPasswordReset,
  updateUserPassword,
  signOut,
  formatAuthError
} from '../auth.js';
import { escHtml } from './script-loader.js';

const profState = {
  mode: 'login', // 'login' | 'signup' | 'recovery'
  email: '',
  showPassword: false,
  busy: false,
  error: '',
  notice: '',
  displayName: ''
};

export function enterPasswordRecoveryMode() {
  profState.mode = 'recovery';
  profState.error = '';
  profState.notice = 'Password အသစ်သတ်မှတ်ပြီး သိမ်းဆည်းပါ။';
}

export function setAuthErrorBanner(message) {
  profState.error = message || '';
  profState.notice = '';
}

const GOOGLE_SVG = `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47a5.54 5.54 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.54-5.17 3.54-8.87Z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.15-4.05 1.15-3.12 0-5.77-2.11-6.72-4.96H1.28v3.09A12 12 0 0 0 12 24Z"/><path fill="#FBBC05" d="M5.28 14.28A7.2 7.2 0 0 1 4.9 12c0-.79.14-1.56.38-2.28V6.63H1.28A12 12 0 0 0 0 12c0 1.94.46 3.77 1.28 5.37l4-3.09Z"/><path fill="#EA4335" d="M12 4.76c1.76 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.28 6.63l4 3.09c.95-2.85 3.6-4.96 6.72-4.96Z"/></svg>`;
const APPLE_SVG = `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M16.36 12.76c-.02-2.15 1.76-3.19 1.84-3.24-1-1.47-2.56-1.67-3.12-1.7-1.32-.14-2.59.78-3.26.78-.68 0-1.72-.76-2.83-.74-1.45.02-2.8.85-3.55 2.15-1.52 2.63-.39 6.53 1.09 8.66.72 1.04 1.58 2.21 2.71 2.17 1.09-.04 1.5-.7 2.82-.7 1.31 0 1.69.7 2.84.68 1.18-.02 1.92-1.06 2.64-2.11.83-1.21 1.17-2.39 1.19-2.45-.03-.01-2.35-.9-2.37-3.5ZM14.2 6.45c.6-.73 1-1.74.89-2.75-.86.03-1.91.57-2.53 1.3-.55.63-1.04 1.66-.91 2.65.96.07 1.95-.49 2.55-1.2Z"/></svg>`;

export function renderProfileScreen({ english, user, base }) {
  const t = (mm, en) => (english ? en : mm);

  if (profState.mode === 'recovery') {
    return `
      <main class="ios-profile-page ios-login-page">
        <div class="ios-login-brand">
          <img src="${escHtml(base)}icons/astrok-pro-mark-192.png" alt="AstroK Pro" class="ios-login-logo">
          <h1>AstroK <span>Pro</span></h1>
          <p class="ios-login-sub">${t('Password အသစ်သတ်မှတ်ရန်', 'Set a new password')}</p>
        </div>
        <section class="ios-login-card">
          ${profState.error ? `<p class="ios-notice-banner error">${escHtml(profState.error)}</p>` : ''}
          ${profState.notice ? `<p class="ios-notice-banner info">${escHtml(profState.notice)}</p>` : ''}
          <form id="ios-recovery-form" class="ios-auth-form">
            <label class="ios-input-box">
              <span>${t('Password အသစ်', 'New password')}</span>
              <input name="newPassword" type="password" minlength="6" required>
            </label>
            <label class="ios-input-box">
              <span>${t('Password အသစ် ထပ်မံထည့်ရန်', 'Confirm new password')}</span>
              <input name="confirmPassword" type="password" minlength="6" required>
            </label>
            <button type="submit" class="ios-primary-pill-btn" ${profState.busy ? 'disabled' : ''}>
              ${profState.busy ? t('သိမ်းဆည်းနေပါသည်…', 'Saving…') : t('Password အသစ် သိမ်းမည်', 'Save new password')}
            </button>
          </form>
          <button type="button" id="prof-cancel-recovery" class="ios-text-link-btn">${t('Login Screen သို့ပြန်မည်', 'Back to Login')}</button>
        </section>
      </main>
    `;
  }

  if (!user) {
    const isSignup = profState.mode === 'signup';
    return `
      <main class="ios-profile-page ios-login-page">
        <div class="ios-login-brand">
          <img src="${escHtml(base)}icons/astrok-pro-mark-192.png" alt="AstroK Pro" class="ios-login-logo">
          <h1>AstroK <span>Pro</span></h1>
          <p class="ios-login-sub">${t('သင့်ရဲ့ ဗေဒင်အဖော်', 'Your Astrology Companion')}</p>
          <span class="ios-ver-pill">${t('ဗားရှင်း 5.0', 'Version 5.0')}</span>
        </div>

        <section class="ios-login-card">
          <h2>${isSignup ? t('Account အသစ်ဖန်တီးရန်', 'Create account') : t('Account ဝင်ရန်', 'Sign in')}</h2>
          <p class="ios-login-desc">${isSignup ? t('AstroK Pro Account အသစ်ဖွင့်ပါ', 'Create a new AstroK Pro account') : t('AstroK Pro Account သို့ ဝင်ရောက်ပါ', 'Sign in to your AstroK Pro account')}</p>

          <div class="ios-seg-tabs">
            <button type="button" data-prof-mode="login" class="${!isSignup ? 'selected' : ''}">${t('ဝင်ရန်', 'Log in')}</button>
            <button type="button" data-prof-mode="signup" class="${isSignup ? 'selected' : ''}">${t('Account ဖွင့်ရန်', 'Sign up')}</button>
          </div>

          ${profState.error ? `<p class="ios-notice-banner error">${escHtml(profState.error)}</p>` : ''}
          ${profState.notice ? `<p class="ios-notice-banner info">${escHtml(profState.notice)}</p>` : ''}

          <form id="ios-profile-auth-form" class="ios-auth-form">
            ${isSignup ? `
              <label class="ios-input-box">
                <span>${t('အမည်', 'Display Name')}</span>
                <input name="displayName" value="${escHtml(profState.displayName)}" placeholder="${t('သင့်အမည်', 'Your name')}" maxlength="80">
              </label>
            ` : ''}
            <label class="ios-input-box">
              <span>${t('အီးမေးလ်', 'Email')}</span>
              <input id="prof-email-input" name="email" type="email" value="${escHtml(profState.email)}" autocomplete="email" placeholder="${t('အီးမေးလ်လိပ်စာ', 'name@example.com')}" required>
            </label>
            <label class="ios-input-box">
              <span>${t('စကားဝှက်', 'Password')}</span>
              <div class="ios-pass-row">
                <input name="password" type="${profState.showPassword ? 'text' : 'password'}" minlength="6" autocomplete="${isSignup ? 'new-password' : 'current-password'}" placeholder="${t('အနည်းဆုံး ၆ လုံး', 'At least 6 characters')}" required>
                <button type="button" id="prof-toggle-pass" class="ios-eye-btn" aria-label="Toggle password">${profState.showPassword ? '🙈' : '👁'}</button>
              </div>
            </label>
            ${isSignup ? `
              <label class="ios-input-box">
                <span>${t('စကားဝှက် ထပ်ရိုက်ရန်', 'Confirm password')}</span>
                <input name="confirm" type="${profState.showPassword ? 'text' : 'password'}" minlength="6" autocomplete="new-password" required>
              </label>
            ` : `
              <div class="ios-forgot-row">
                <button type="button" id="prof-forgot-btn" class="ios-text-link-btn" ${profState.busy ? 'disabled' : ''}>${t('Password မေ့နေပါသလား?', 'Forgot password?')}</button>
              </div>
            `}
            <button type="submit" class="ios-primary-pill-btn" ${profState.busy ? 'disabled' : ''}>
              ${profState.busy ? t('ခဏစောင့်ပါ…', 'Please wait…') : (isSignup ? t('Account ဖန်တီးမည် →', 'Create account →') : t('ဝင်မည် →', 'Sign in →'))}
            </button>
          </form>

          <div class="ios-oauth-divider"><span>${t('သို့မဟုတ်', 'or')}</span></div>

          <div class="ios-oauth-row">
            <button type="button" class="ios-social-btn" data-oauth-provider="apple" ${profState.busy ? 'disabled' : ''}>
              ${APPLE_SVG}<span>Apple</span>
            </button>
            <button type="button" class="ios-social-btn" data-oauth-provider="google" ${profState.busy ? 'disabled' : ''}>
              ${GOOGLE_SVG}<span>Google</span>
            </button>
          </div>
        </section>

        <p class="ios-version-footer">${t('Android နှင့် iOS AstroK Pro Account များနှင့် တူညီစွာ ဝင်ရောက်နိုင်ပါတယ်။', 'Sign in with the same Android or iOS AstroK Pro account.')}</p>
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
          <div class="ios-avatar-circle large">${(() => { const p = typeof localStorage !== 'undefined' ? localStorage.getItem('astrok.web.profile.photo') : ''; return p ? `<img src="${escHtml(p)}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:50%">` : escHtml(initial); })()}</div>
          <span class="ios-camera-badge large" aria-hidden="true">📷</span>
        </div>
        <h2>${escHtml(name)}</h2>
        <div class="ak-badge-row" style="justify-content:center">
          <label class="ak-chip selected" style="cursor:pointer">
            📷 ${t('ပုံရွေးမည် / ပြောင်းမည်', 'Choose photo')}
            <input id="prof-photo-input" type="file" accept="image/*" hidden>
          </label>
          ${typeof localStorage !== 'undefined' && localStorage.getItem('astrok.web.profile.photo') ? `<button type="button" id="prof-photo-remove" class="ak-chip">${t('ပုံဖယ်ရှားမည်', 'Remove')}</button>` : ''}
        </div>
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

      <section class="ios-white-card" style="margin-top:16px">
        <h3 class="ios-card-h3">✦ ${t('AstroK Pro အကြောင်းနှင့် ဆက်သွယ်ရန်', 'About & Contact AstroK Pro')}</h3>
        <p class="ios-muted-note">${t('KP နက္ခတ်၊ ဂဏန်းဗေဒင်၊ တြိစက္က၊ M-Sann၊ မုဟုတ္တ၊ တားရော့၊ ဗေဒင်စာအုပ်နှင့် သင်တန်းများအားလုံးကို တစ်နေရာတည်းတွင် အသုံးပြုနိုင်ပါသည်။', 'Complete astrology suite with KP, Numerology, Trisakka, M-Sann, Muhurat, Tarot, Books, and Courses.')}</p>
        <div class="ak-badge-row">
          <a class="ak-chip" href="https://t.me/sayahtunlinnAstroK718" target="_blank" rel="noopener noreferrer" style="text-decoration:none;color:var(--ak-primary)">📢 Telegram Channel ↗</a>
          <a class="ak-chip" href="https://t.me/htoomyatastro2635" target="_blank" rel="noopener noreferrer" style="text-decoration:none;color:var(--ak-primary)">💬 Support Telegram ↗</a>
          <a class="ak-chip" href="tel:09699031718" style="text-decoration:none;color:var(--ak-ink)">📞 09699031718</a>
        </div>
      </section>

      <p class="ios-version-footer">AstroK Pro · Version 5.0</p>
    </main>
  `;
}

export function bindProfileScreen(rerender, onSignedOut, english = false) {
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

  document.querySelector('#prof-email-input')?.addEventListener('input', e => {
    profState.email = e.target.value;
  });

  document.querySelector('#prof-forgot-btn')?.addEventListener('click', async () => {
    const email = (document.querySelector('#prof-email-input')?.value || profState.email || '').trim();
    if (!email) {
      profState.error = english ? 'Enter your email address first.' : 'Password ပြန်ယူရန် Email လိပ်စာကို အရင်ထည့်ပါ။';
      rerender();
      document.querySelector('#prof-email-input')?.focus();
      return;
    }
    profState.busy = true;
    profState.error = '';
    profState.notice = '';
    rerender();
    try {
      await sendPasswordReset(email);
      profState.notice = english
        ? 'Password reset link sent. Check your email inbox.'
        : 'Password ပြန်လည်သတ်မှတ်ရန် လင့်ခ်ကို သင့် Email သို့ ပို့ပြီးပါပြီ။';
    } catch (err) {
      profState.error = formatAuthError(err, english);
    } finally {
      profState.busy = false;
      rerender();
    }
  });

  document.querySelectorAll('[data-oauth-provider]').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (profState.busy) return;
      const provider = btn.dataset.oauthProvider;
      profState.busy = true;
      profState.error = '';
      profState.notice = english ? `Connecting to ${provider}…` : `${provider === 'google' ? 'Google' : 'Apple'} နှင့် ချိတ်ဆက်နေပါသည်…`;
      rerender();
      try {
        if (provider === 'google') {
          const data = await signInWithGoogle();
          if (data?.session) {
            profState.busy = false;
            profState.notice = '';
            rerender();
          }
        } else {
          await signInWithOAuthProvider(provider);
        }
      } catch (err) {
        profState.busy = false;
        profState.notice = '';
        profState.error = formatAuthError(err, english);
        rerender();
      }
    });
  });

  document.querySelector('#ios-profile-auth-form')?.addEventListener('submit', async e => {
    e.preventDefault();
    if (profState.busy) return;
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get('email') || '').trim();
    const password = String(fd.get('password') || '');
    const displayName = String(fd.get('displayName') || '').trim();
    profState.email = email;
    if (displayName) profState.displayName = displayName;

    if (profState.mode === 'signup' && password !== String(fd.get('confirm') || '')) {
      profState.error = english ? 'Passwords do not match.' : 'စကားဝှက်နှစ်ခု မတူပါ။';
      rerender();
      return;
    }
    profState.busy = true;
    profState.error = '';
    profState.notice = '';
    rerender();
    try {
      const res = profState.mode === 'signup'
        ? await emailSignUp(email, password, displayName)
        : await emailSignIn(email, password);
      if (!res.session) {
        profState.notice = english
          ? 'Account created! Please check your email inbox to confirm your account, then log in.'
          : 'Account ဖန်တီးပြီးပါပြီ။ သင့် Email ထဲသို့ ပို့ထားသော အတည်ပြုလင့်ခ်ကို နှိပ်ပြီး ဝင်ရောက်နိုင်ပါပြီ။';
      } else {
        profState.notice = '';
      }
    } catch (err) {
      profState.error = formatAuthError(err, english);
    } finally {
      profState.busy = false;
      rerender();
    }
  });

  document.querySelector('#ios-recovery-form')?.addEventListener('submit', async e => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const np = String(fd.get('newPassword') || '');
    const cp = String(fd.get('confirmPassword') || '');
    if (np !== cp) {
      profState.error = english ? 'Passwords do not match.' : 'Password အသစ်နှစ်ခု မတူပါ။';
      rerender();
      return;
    }
    profState.busy = true;
    profState.error = '';
    rerender();
    try {
      await updateUserPassword(np);
      profState.mode = 'login';
      profState.notice = english ? 'Password updated.' : 'Password အသစ် ပြောင်းလဲပြီးပါပြီ။';
    } catch (err) {
      profState.error = formatAuthError(err, english);
    } finally {
      profState.busy = false;
      rerender();
    }
  });

  document.querySelector('#prof-cancel-recovery')?.addEventListener('click', () => {
    profState.mode = 'login';
    profState.error = '';
    profState.notice = '';
    rerender();
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
      profState.notice = english ? 'Profile saved.' : 'Profile ကို သိမ်းဆည်းပြီးပါပြီ။';
    } catch (err) {
      profState.error = formatAuthError(err, english);
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
      profState.error = english ? 'Passwords do not match.' : 'Password အသစ်နှစ်ခု မတူပါ။';
      rerender();
      return;
    }
    profState.busy = true;
    profState.error = '';
    profState.notice = '';
    rerender();
    try {
      await updateUserPassword(np);
      profState.notice = english ? 'Password changed.' : 'Password ပြောင်းလဲပြီးပါပြီ။';
    } catch (err) {
      profState.error = formatAuthError(err, english);
    } finally {
      profState.busy = false;
      rerender();
    }
  });

  document.querySelector('#prof-photo-input')?.addEventListener('change', e => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const max = 360;
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        try { localStorage.setItem('astrok.web.profile.photo', dataUrl); } catch {}
        profState.notice = english ? 'Profile photo updated.' : 'Profile ပုံ ပြောင်းလဲပြီးပါပြီ။';
        rerender();
      };
      img.src = String(reader.result || '');
    };
    reader.readAsDataURL(file);
  });

  document.querySelector('#prof-photo-remove')?.addEventListener('click', () => {
    try { localStorage.removeItem('astrok.web.profile.photo'); } catch {}
    profState.notice = english ? 'Profile photo removed.' : 'Profile ပုံ ဖယ်ရှားပြီးပါပြီ။';
    rerender();
  });

  document.querySelector('#ios-profile-signout')?.addEventListener('click', async () => {
    try {
      await signOut();
      profState.displayName = '';
      profState.notice = '';
      profState.error = '';
      onSignedOut();
    } catch (err) {
      profState.error = formatAuthError(err, english);
      rerender();
    }
  });
}
