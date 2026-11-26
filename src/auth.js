import { createClient } from '@supabase/supabase-js';

// Use the gateway's canonical origin; cross-origin redirects strip Authorization.
// The hostname prefix stays the same, preserving Supabase's session storage key.
export const apiOrigin = 'https://astrok-api-gateway.hermorales04.chatgpt.site';
export const publishableKey = 'sb_publishable_1r6_U_5D7Il7hvy686kTxw_krFY0Jtc';

export const authClient = createClient(apiOrigin, publishableKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
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

export async function signInWithOAuthProvider(provider) {
  const { data, error } = await authClient.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: appRedirectUrl(),
      queryParams: provider === 'google' ? { prompt: 'select_account' } : undefined,
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
