const base = () => import.meta.env?.BASE_URL || './';
const jsonCache = new Map();
const scriptCache = new Map();

export async function loadJson(relativePath) {
  if (jsonCache.has(relativePath)) return jsonCache.get(relativePath);
  const promise = fetch(`${base()}${relativePath}`)
    .then(res => {
      if (!res.ok) throw new Error(`Failed to load ${relativePath}`);
      return res.json();
    })
    .catch(err => {
      jsonCache.delete(relativePath);
      throw err;
    });
  jsonCache.set(relativePath, promise);
  return promise;
}

export function loadClassicScript(relativePath) {
  if (scriptCache.has(relativePath)) return scriptCache.get(relativePath);
  const promise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `${base()}${relativePath}`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptCache.delete(relativePath);
      reject(new Error(`Failed to load script ${relativePath}`));
    };
    document.head.appendChild(script);
  });
  scriptCache.set(relativePath, promise);
  return promise;
}

export function escHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

export function toMyDigits(value) {
  return String(value ?? '').replace(/[0-9]/g, d => '၀၁၂၃၄၅၆၇၈၉'[Number(d)]);
}

export function fmtKyat(amount, english = false) {
  const n = Number(amount || 0);
  if (english) return `${n.toLocaleString('en-US')} MMK`;
  return `${toMyDigits(n.toLocaleString('en-US'))} ကျပ်`;
}
