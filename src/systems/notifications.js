import { authClient, apiOrigin, publishableKey } from '../auth.js';
import { escHtml } from './script-loader.js';

const notifState = {
  items: [],
  loading: false,
  loadedForUser: null,
  error: ''
};

async function fetchNotifications() {
  const { data: { session } } = await authClient.auth.getSession();
  if (!session?.access_token) {
    notifState.items = [];
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
    } catch (err) {
      notifState.error = err?.message || 'Unable to load notifications';
    } finally {
      notifState.loading = false;
      rerender();
    }
  };

  if (!notifState.loading && !notifState.loadedForUser && !notifState.error) {
    void refresh();
  }

  document.querySelector('#notif-refresh-btn')?.addEventListener('click', () => void refresh());
}
