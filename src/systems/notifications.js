import { authClient, apiOrigin, publishableKey } from '../auth.js';
import { escHtml } from './script-loader.js';

const notifState = {
  items: [],
  loading: false,
  loadedForUser: null,
  unreadCount: 0,
  error: ''
};

const READ_AT_KEY = uid => `astrok.notifications.readAt.${uid}`;

function computeUnread(items, userId) {
  if (!userId || !Array.isArray(items) || !items.length) return 0;
  let lastRead = 0;
  try { lastRead = Number(localStorage.getItem(READ_AT_KEY(userId)) || 0); } catch {}
  return items.filter(item => {
    const ts = Number(item.created_at) > 1e12 ? Number(item.created_at)
      : (Number(item.created_at) > 1e9 ? Number(item.created_at) * 1000 : Date.parse(item.created_at));
    return Number.isFinite(ts) && ts > lastRead;
  }).length;
}

export function getUnreadNotificationCount() {
  return notifState.unreadCount || 0;
}

export function markNotificationsRead(userId) {
  if (!userId) return;
  try { localStorage.setItem(READ_AT_KEY(userId), String(Date.now())); } catch {}
  notifState.unreadCount = 0;
}

export async function refreshUnreadNotifications(userId) {
  if (!userId) { notifState.unreadCount = 0; return 0; }
  try {
    await fetchNotifications();
    return notifState.unreadCount;
  } catch {
    return notifState.unreadCount;
  }
}

async function fetchNotifications() {
  const { data: { session } } = await authClient.auth.getSession();
  if (!session?.access_token) {
    notifState.items = [];
    notifState.unreadCount = 0;
    notifState.error = 'အသိပေးချက်များ ကြည့်ရန် Account ဝင်ပါ။';
    return;
  }
  const res = await fetch(
    `${apiOrigin}/rest/v1/astrok_notifications?published=eq.true&select=id,title,body,created_at,renewal_offer&order=created_at.desc&limit=100`,
    {
      method: 'GET',
      headers: {
        apikey: publishableKey,
        Authorization: `Bearer ${session.access_token}`
      }
    }
  );
  if (!res.ok) throw new Error('အသိပေးချက်များ ဖတ်၍မရပါ။');
  const rows = await res.json();
  notifState.items = Array.isArray(rows) ? rows : [];
  notifState.loadedForUser = session.user?.id || 'loaded';
  notifState.unreadCount = computeUnread(notifState.items, session.user?.id);
  notifState.error = '';
}

function fmtNotifDate(ts, english) {
  if (!ts) return '';
  const ms = Number(ts) > 1e12 ? Number(ts) : (Number(ts) > 1e9 ? Number(ts) * 1000 : Date.parse(ts));
  if (!Number.isFinite(ms)) return '';
  return new Intl.DateTimeFormat(english ? 'en-US' : 'my-MM', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(ms));
}

export function renderNotificationsScreen(appHeader, english) {
  const t = (mm, en) => (english ? en : mm);
  return `
    ${appHeader(t('အသိပေးချက်များ', 'Notifications'), true)}
    <main class="ak-sys-main">
      <div style="display:flex;justify-content:flex-end;margin-bottom:10px">
        <button type="button" id="notif-refresh-btn" class="ak-chip">↻ ${t('ပြန်ဖတ်ရန်', 'Refresh')}</button>
      </div>
      ${notifState.loading ? `<div class="chart-pending">${t('အသိပေးချက်များ ဖတ်နေပါသည်…', 'Loading notifications…')}</div>` : ''}
      ${notifState.error ? `<section class="ak-card"><p style="margin:0;color:var(--ak-secondary-ink)">${escHtml(notifState.error)}</p></section>` : ''}
      ${!notifState.loading && !notifState.error && notifState.items.length === 0 ? `
        <section class="ak-card"><p style="margin:0;color:var(--ak-secondary-ink)">${t('အသိပေးချက်အသစ် မရှိသေးပါ။', 'No notifications yet.')}</p></section>
      ` : ''}
      <div class="ak-section-stack">
        ${notifState.items.map(item => `
          <article class="ak-card">
            <h3 style="color:var(--ak-primary);margin-bottom:6px">${escHtml(item.title || 'AstroK Pro')}</h3>
            ${item.body ? `<p class="ak-reading-text" style="margin:0 0 10px">${escHtml(item.body).replace(/\n/g, '<br>')}</p>` : ''}
            ${item.renewal_offer ? `<button type="button" class="ios-price-buy-btn" data-entry-tab="plans" style="margin-bottom:8px">${t('သက်တမ်းတိုးရန်', 'Renew Plan')}</button>` : ''}
            <small style="display:block;color:var(--ak-secondary-ink);font-size:12px">${escHtml(fmtNotifDate(item.created_at, english))}</small>
          </article>
        `).join('')}
      </div>
    </main>
  `;
}

export function bindNotificationsScreen(rerender) {
  const refresh = async () => {
    notifState.loading = true;
    notifState.error = '';
    rerender();
    try {
      await fetchNotifications();
      const { data: { session } } = await authClient.auth.getSession();
      if (session?.user?.id) markNotificationsRead(session.user.id);
    } catch (err) {
      notifState.error = err?.message || 'Unable to load notifications';
    } finally {
      notifState.loading = false;
      rerender();
    }
  };

  if (!notifState.loading && !notifState.loadedForUser && !notifState.error) {
    void refresh();
  } else {
    authClient.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.id) markNotificationsRead(session.user.id);
    }).catch(() => {});
  }

  document.querySelector('#notif-refresh-btn')?.addEventListener('click', () => void refresh());
}
