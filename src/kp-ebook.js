import { renderKPChart } from './chart-renderers.js';
import { NATAL_CATEGORIES, natalReading, formatReadingPeriod } from './kp-natal-readings.js';

const escape = value => String(value ?? '').replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[character]);

const styles = `<style>
  @page { size:A4; margin:17mm 15mm; }
  * { box-sizing:border-box; }
  body { color:#15203d; background:#fff; font-family:-apple-system,BlinkMacSystemFont,"Myanmar Sangam MN","Noto Sans Myanmar",Arial,sans-serif; line-height:1.65; margin:0 auto; max-width:860px; padding:28px; }
  header { text-align:center; border-bottom:3px solid #334aa3; padding:28px 0 24px; margin-bottom:22px; }
  h1 { font-size:28px; margin:0; color:#263f99; }
  h2 { font-size:20px; color:#263f99; border-bottom:1px solid #cbd4ef; padding-bottom:6px; margin-top:30px; }
  h3 { font-size:16px; color:#263f99; margin:20px 0 8px; }
  p { margin:5px 0 12px; white-space:pre-wrap; }
  .meta { color:#59617a; } .cover { min-height:230px; display:grid; place-content:center; text-align:center; }
  .cover strong { font-size:30px; color:inherit; } .cover span { font-size:18px; }
  .chart { max-width:570px; margin:16px auto 24px; } .kp-chart { width:100%; height:auto; }
  .chart-background,.chart-wheel-background { fill:var(--chart-bg); } .chart-grid,.chart-wheel-ring,.chart-wheel-cusp,.chart-wheel-guide,.chart-wheel-tick { fill:none; stroke:var(--chart-line); stroke-width:1.25; }
  .chart-token,.chart-wheel-house,.chart-wheel-signs,.chart-wheel-planet,.chart-center,.chart-caption { fill:var(--chart-ink); text-anchor:middle; dominant-baseline:middle; }
  .chart-token.retro,.chart-wheel-planet.retro { fill:#d44348; } .chart-token.asc,.chart-wheel-cusp.asc { fill:var(--chart-accent); }
  .chart-wheel-aspect { fill:none; stroke:#8096ba; stroke-width:.7; }
  table { width:100%; border-collapse:collapse; margin:10px 0 20px; font-size:12px; }
  th,td { border:1px solid #bdc6d7; padding:7px; text-align:left; vertical-align:top; }
  th { background:#e9eefb; }
  .chapter { break-before:page; } .reading { break-inside:avoid-page; margin:18px 0; }
  .prediction { border-left:4px solid #334aa3; background:#f2f5fc; padding:10px 14px; }
  .analysis { color:#39425e; } .periods { color:#344fac; }
  @media print { body { padding:0; max-width:none; } }
</style>`;

const chartData = (result, english) => {
  const headings = english
    ? ['Planet', 'Position', 'Sign lord', 'Star lord', 'Sub lord', 'Sub-sub lord']
    : ['ဂြိုဟ်', 'တည်နေရာ', 'ရာသီသခင်', 'နက္ခတ်သခင်', 'ဘုတ္တိသခင်', 'ဝိဘုတ္တိသခင်'];
  const table = (heading, rows) => `<h2>${heading}</h2><table><thead><tr>${headings.map(x => `<th>${x}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(value => `<td>${escape(value)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  const position = longitude => `${Math.floor(longitude / 30) + 1} · ${((longitude % 30) + 30) % 30}`.replace(/(\.\d{4})\d+/, '$1') + '°';
  const row = (name, longitude, lords) => [name, position(longitude), lords.signLord, lords.starLord, lords.subLord, lords.subSubLord];
  return table(english ? 'Planet positions' : 'ဂြိုဟ်တည်ရာဇယား', result.planets.map(x => row(x.name, x.longitude, x.lords)))
    + table(english ? 'House cusps' : 'ဘာဝတည်ရာဇယား', result.cusps.map(x => row(`${x.number} ${english ? 'House' : 'တန့်'}`, x.longitude, x.lords)));
};

function natalChapters(result, english) {
  return NATAL_CATEGORIES.filter(([id]) => id !== 'birthRectification').map(([id, mm, en]) => {
    let reading;
    try { reading = natalReading(result, id, english); } catch { return ''; }
    if (!reading?.sections?.length) return '';
    return `<section class="chapter"><h2>${escape(english ? en : mm)}</h2>${reading.sections.map(section => `
      <article class="reading"><h3>${escape(english ? section.en : section.mm)}</h3>
      <div class="prediction"><strong>${english ? 'Prediction' : 'အဟော'}</strong><p>${escape(section.prediction)}</p>
      ${section.periods?.length ? `<div class="periods">${section.periods.map(period => `<p>${escape(formatReadingPeriod(period, result.profile, english))}</p>`).join('')}</div>` : ''}</div>
      ${section.analysis ? `<div class="analysis"><h3>${english ? 'Chart analysis' : 'ဇာတာသုံးသပ်ချက်'}</h3><p>${escape(section.analysisNarrative || section.analysis)}</p></div>` : ''}</article>`).join('')}</section>`;
  }).join('');
}

export function kpEbookHTML(result, { english = false, style = 'East Indian', theme = 'Emerald', house = 1, horary = null, includeReadings = true, coverColor = '#5B1B77', author = '' } = {}) {
  if (!result?.profile || !Array.isArray(result.planets) || !Array.isArray(result.cusps)) throw new Error('A calculated chart is required.');
  const profile = result.profile;
  const subtitle = profile.isHorary ? (english ? 'KP Horary Report' : 'KP ဟူးရားဟောစာတမ်း') : (english ? 'KP Natal Report' : 'KP မူလဇာတာဟောစာတမ်း');
  const selectedCover = /^#[0-9a-f]{6}$/i.test(coverColor) ? coverColor : '#5B1B77';
  const cover = `<section class="cover" style="background:${selectedCover};color:#fff;min-height:100vh;padding:9%;border:3px double #d8a947;break-after:page"><div style="height:1px;width:44%;background:#d8a947;margin:0 auto 15vh"></div><strong>${subtitle}</strong><span style="color:#d8a947;margin-top:7vh">${escape(author)}</span><div style="margin-top:12vh;padding:16px;background:#ffffff1a;border:1px solid #ffffff33;border-radius:10px"><small>${english?'Native':'ဇာတာရှင်'}</small><h1 style="color:#fff;border:0;margin:10px 0">${escape(profile.name)}</h1><small>${escape(`${profile.day}/${profile.month}/${profile.year} · ${profile.hour}:${profile.min}`)}</small></div></section>`;
  const graphic = `<section class="chapter"><h2>${english ? 'Chart' : 'ဇာတာ'}</h2><div class="chart">${renderKPChart(result, style, theme, house, english)}</div>${chartData(result, english)}</section>`;
  const chapters = !includeReadings ? '' : profile.isHorary
    ? horary ? `<section class="chapter"><h2>${escape(profile.question || profile.name)}</h2><div class="prediction"><h3>${english ? 'Prediction' : 'အဟော'}</h3><p>${escape(horary.prediction)}</p></div><div class="analysis"><h3>${english ? 'Chart analysis' : 'ဇာတာသုံးသပ်ချက်'}</h3><p>${escape(horary.analysis)}</p></div></section>` : ''
    : natalChapters(result, english);
  return `<!doctype html><html lang="${english ? 'en' : 'my'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(profile.name)} — AstroK Pro</title>${styles}<style>body{max-width:100%;padding:0;background:#f4f4f8}.cover{max-width:860px;margin:auto}.chapter{max-width:860px;margin:16px auto;background:#fff;padding:28px;min-height:95vh}@media print{body{background:#fff}.cover,.chapter{max-width:none;margin:0}.cover{min-height:100vh;-webkit-print-color-adjust:exact;print-color-adjust:exact}}</style></head><body>${cover}${graphic}${chapters}</body></html>`;
}
