import { createClient } from '@supabase/supabase-js';

// Use the gateway's canonical origin; cross-origin redirects strip Authorization.
// The hostname prefix stays the same, preserving Supabase's session storage key.
export const apiOrigin = 'https://astrok-api-gateway.hermorales04.chatgpt.site';
export const publishableKey = 'sb_publishable_1r6_U_5D7Il7hvy686kTxw_krFY0Jtc';
const googleOAuthUrl = `${apiOrigin}/functions/v1/mobile-google-oauth`;
const googleAttemptKey = 'astrok-google-oauth-attempt';
const googleSecretPattern = /^[A-Za-z0-9_-]{43}$/;

export const authClient = createClient(apiOrigin, publishableKey, {
  auth: {
    flowType: 'pkce',
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});

export function appRedirectUrl() {
  if (typeof window === 'undefined') return undefined;
  return `${window.location.origin}${window.location.pathname}`;
}

export function formatAuthError(error, english = false) {
  const raw = String(error?.message || error || '').trim();
  const lower = raw.toLowerCase();
  if (lower.includes('invalid login credentials')) {
    return english ? 'Invalid email or password.' : 'Email သို့မဟုတ် စကားဝှက် မမှန်ပါ။';
  }
  if (lower.includes('email not confirmed')) {
    return english ? 'Please verify your email inbox first, then log in.' : 'Email ထဲပို့ထားသော အတည်ပြုလင့်ခ်ကို အရင်နှိပ်ပြီးမှ ဝင်ပါ။';
  }
  if (lower.includes('user already registered') || lower.includes('already been registered')) {
    return english ? 'This email is already registered. Please log in instead.' : 'ဤ Email ဖြင့် အကောင့်ရှိပြီးသားဖြစ်ပါသည်။ ဝင်ရန် ခလုတ်မှတစ်ဆင့် ဝင်ပါ။';
  }
  if (lower.includes('password should be at least')) {
    return english ? 'Password must be at least 6 characters.' : 'စကားဝှက်သည် အနည်းဆုံး ၆ လုံး ရှိရပါမည်။';
  }
  if (lower.includes('rate limit') || lower.includes('too many requests')) {
    return english ? 'Too many attempts. Please wait a minute and try again.' : 'အကြိမ်ရေများနေပါသည်။ ခဏစောင့်ပြီး ထပ်စမ်းပါ။';
  }
  if (lower.includes('provider is not enabled')) {
    return english ? 'This sign-in provider is not enabled on the server.' : 'ဤ Login စနစ်ကို Server တွင် မဖွင့်ရသေးပါ။';
  }
  return raw || (english ? 'Authentication failed. Please try again.' : 'အကောင့်ဝင်၍မရပါ။ ထပ်မံစမ်းကြည့်ပါ။');
}

export async function emailSignIn(email, password) {
  const { data, error } = await authClient.auth.signInWithPassword({
    email: String(email || '').trim(),
    password: String(password || ''),
  });
  if (error) throw error;
  return data;
}

export async function emailSignUp(email, password, displayName = '') {
  const cleanEmail = String(email || '').trim();
  const cleanName = String(displayName || '').trim();
  const { data, error } = await authClient.auth.signUp({
    email: cleanEmail,
    password: String(password || ''),
    options: {
      emailRedirectTo: appRedirectUrl(),
      data: cleanName ? { full_name: cleanName, name: cleanName } : undefined,
    },
  });
  if (error) throw error;
  // Supabase returns empty identities when email already exists and confirmation is on
  if (data?.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
    throw new Error('User already registered');
  }
  return data;
}

export async function signInWithGoogle() {
  const verifier = base64Url(window.crypto.getRandomValues(new Uint8Array(32)));
  const nonce = base64Url(window.crypto.getRandomValues(new Uint8Array(32)));
  const state = `web.${base64Url(window.crypto.getRandomValues(new Uint8Array(32)))}`;
  const encoder = new TextEncoder();
  const [challengeBytes, nonceHashBytes] = await Promise.all(
    [verifier, nonce].map(value => window.crypto.subtle.digest('SHA-256', encoder.encode(value))),
  );
  const nonceHash = Array.from(new Uint8Array(nonceHashBytes), byte => byte.toString(16).padStart(2, '0')).join('');
  const params = new URLSearchParams({
    state,
    code_challenge: base64Url(new Uint8Array(challengeBytes)),
    nonce: nonceHash,
  });
  window.sessionStorage.setItem(googleAttemptKey, JSON.stringify({ state, verifier, nonce }));
  window.location.assign(`${googleOAuthUrl}/start?${params}`);
}

function base64Url(bytes) {
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function completeGoogleCallback(params) {
  // Strip the authorization code before making any further requests.
  window.history.replaceState({ screen: 'profile' }, '', `${window.location.pathname}#profile`);
  const state = params.get('state');
  const code = params.get('code');
  try {
    const attempt = JSON.parse(window.sessionStorage.getItem(googleAttemptKey) ?? 'null');
    if (state !== attempt?.state || !googleSecretPattern.test(state.slice(4)) ||
        typeof attempt.verifier !== 'string' || !googleSecretPattern.test(attempt.verifier) ||
        typeof attempt.nonce !== 'string' || !googleSecretPattern.test(attempt.nonce)) {
      return { handled: true, error: 'Google sign-in session expired or did not match. Please try again.' };
    }
    window.sessionStorage.removeItem(googleAttemptKey);
    if (params.has('error') || !code) {
      return { handled: true, error: 'Google sign-in could not be completed. Please try again.' };
    }
    const response = await fetch(`${googleOAuthUrl}/exchange`, {
      method: 'POST',
      headers: { apikey: publishableKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, verifier: attempt.verifier, nonce: attempt.nonce }),
      redirect: 'error',
    });
    if (!response.ok) throw new Error('Google code exchange failed');
    const { access_token, refresh_token } = await response.json();
    if (typeof access_token !== 'string' || !access_token ||
        typeof refresh_token !== 'string' || !refresh_token) {
      throw new Error('Google session tokens missing');
    }
    const { data, error } = await authClient.auth.setSession({ access_token, refresh_token });
    if (error || !data?.session) throw new Error('Google session could not be saved');
    window.history.replaceState({ screen: 'home' }, '', `${window.location.pathname}#home`);
    return { handled: true, session: data.session, recovery: false };
  } catch {
    return { handled: true, error: 'Google sign-in could not be completed. Please try again.' };
  }
}

export async function completeAuthCallbackFromUrl() {
  if (typeof window === 'undefined') return { handled: false };
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.get('state')?.startsWith('web.')) return completeGoogleCallback(searchParams);
  const hashRaw = window.location.hash.startsWith('#') ? window.location.hash.slice(1) : '';
  const hashParams = new URLSearchParams(hashRaw.includes('=') ? hashRaw : '');

  const errDesc = searchParams.get('error_description') || hashParams.get('error_description') || searchParams.get('error') || hashParams.get('error');
  if (errDesc) {
    window.history.replaceState({ screen: 'profile' }, '', `${window.location.pathname}#profile`);
    return { handled: true, error: errDesc };
  }

  const code = searchParams.get('code');
  if (code) {
    const { data, error } = await authClient.auth.exchangeCodeForSession(code);
    const isRecovery = searchParams.get('type') === 'recovery';
    const nextScreen = isRecovery ? 'profile' : 'home';
    window.history.replaceState({ screen: nextScreen }, '', `${window.location.pathname}#${nextScreen}`);
    if (error) return { handled: true, error: error.message };
    return { handled: true, session: data?.session || null, recovery: isRecovery };
  }

  const accessToken = hashParams.get('access_token');
  const refreshToken = hashParams.get('refresh_token');
  if (accessToken && refreshToken) {
    const isRecovery = hashParams.get('type') === 'recovery';
    const { data, error } = await authClient.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
    const nextScreen = isRecovery ? 'profile' : 'home';
    window.history.replaceState({ screen: nextScreen }, '', `${window.location.pathname}#${nextScreen}`);
    if (error) return { handled: true, error: error.message };
    return { handled: true, session: data?.session || null, recovery: isRecovery };
  }

  return { handled: false };
}

export async function signInWithOAuthProvider(provider) {
  if (provider === 'google') return signInWithGoogle();
  const { data, error } = await authClient.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: appRedirectUrl(),
    },
  });
  if (error) throw error;
  return data;
}

export async function sendPasswordReset(email) {
  const cleanEmail = String(email || '').trim();
  if (!cleanEmail) throw new Error('Email ထည့်ပေးပါ။');
  const { error } = await authClient.auth.resetPasswordForEmail(cleanEmail, {
    redirectTo: appRedirectUrl(),
  });
  if (error) throw error;
}

export async function updateUserPassword(newPassword) {
  const { error } = await authClient.auth.updateUser({ password: String(newPassword || '') });
  if (error) throw error;
}

export async function signOut() {
  const { error } = await authClient.auth.signOut();
  if (error) throw error;
}
