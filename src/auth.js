import { createClient } from '@supabase/supabase-js';

// Use the gateway's canonical origin; cross-origin redirects strip Authorization.
// The hostname prefix stays the same, preserving Supabase's session storage key.
const url = 'https://astrok-api-gateway.hermorales04.chatgpt.site';
const publishableKey = 'sb_publishable_1r6_U_5D7Il7hvy686kTxw_krFY0Jtc';

export const authClient = createClient(url, publishableKey, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
});

export async function emailSignIn(email, password) {
  const { data, error } = await authClient.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function emailSignUp(email, password) {
  const { data, error } = await authClient.auth.signUp({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await authClient.auth.signOut();
  if (error) throw error;
}
