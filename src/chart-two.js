import { normalize, SIGN_MM } from './kp-core.js';
import { SIGN_EN, planetLabel, rulingLabel } from './locale.js';
import { rulingItems } from './kp-analysis.js';
import { renderKPChart } from './chart-renderers.js';

const NAKSHATRAS_MM=[
  'အဿဝနီ','ဘရဏီ','ကြတ္တိကာ','ရောဟိဏီ','မိဂသီ','အဒြ','ပုဏ္ဏဖုသျှ','ဖုသျှ','အဿလိသ',
  'မာဃ','ပြုဗ္ဗဖလဂုဏီ','ဥတ္တရဖလဂုဏီ','ဟသတ္တ','စိတြ','သွာတိ','ဝိသာခါ','အနုရာဓ','ဇေဋ္ဌ',
  'မူလ','ပြုဗ္ဗာသဠ်','ဥတ္တရာသဠ်','သရဝဏ်','ဓနသိဒ္ဓ','သတ္တဘိဿ','ပြုဗ္ဗဘဒြပိုဒ်','ဥတ္တရာဘဒြပိုဒ်','ရေဝတီ',
];
const NAKSHATRAS_EN=[
  'Ashwini','Bharani','Krittika','Rohini','Mrigashira','Ardra','Punarvasu','Pushya','Ashlesha',
  'Magha','Purva Phalguni','Uttara Phalguni','Hasta','Chitra','Swati','Vishakha','Anuradha','Jyeshtha',
  'Mula','Purva Ashadha','Uttara Ashadha','Shravana','Dhanishta','Shatabhisha','Purva Bhadrapada','Uttara Bhadrapada','Revati',
];
const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function nakshatraName(longitude,english=false){
  const index=Math.min(26,Math.floor(normalize(longitude)/(360/27)));
  return (english?NAKSHATRAS_EN:NAKSHATRAS_MM)[index];
}
function table(title,headers,rows,retrogradeRows=[]){
  return `<section class="ios-chart-two-card ios-chart-two-table"><h3>${escape(title)}</h3><table><thead><tr>${headers.map(value=>`<th>${escape(value)}</th>`).join('')}</tr></thead><tbody>${rows.map((row,index)=>`<tr>${row.map((value,column)=>`<td class="${column===0&&retrogradeRows.includes(index)?'retrograde':''}">${escape(value).replaceAll('\n','<br>')}</td>`).join('')}</tr>`).join('')}</tbody></table></section>`;
}
export function renderIOSChartTwo(result,english=false){
  const label=(mm,en)=>english?en:mm;
  const ruling=rulingItems(result).map(([heading,planet])=>`<div class="ios-chart-two-ruling-row"><span>${escape(rulingLabel(heading,english))}</span><strong class="${result.planets.some(p=>p.name===planet&&p.speed<0)?'retrograde':''}">${escape(planetLabel(planet,english))}</strong></div>`).join('');
  const planetRows=result.planets.map(planet=>[
    `${planetLabel(planet.name,english)}\n(${nakshatraName(planet.longitude,english)})`,
    (english?SIGN_EN:SIGN_MM)[Math.floor(normalize(planet.longitude)/30)],
    planetLabel(planet.lords.starLord,english),planetLabel(planet.lords.subLord,english),
  ]);
  const cuspRows=result.cusps.map(cusp=>[
    String(cusp.number),(english?SIGN_EN:SIGN_MM)[Math.floor(normalize(cusp.longitude)/30)],
    planetLabel(cusp.lords.starLord,english),planetLabel(cusp.lords.subLord,english),
  ]);
  return `<div class="ios-chart-two"><h2>${label('ဇာတာအချက်အလက်များ','Chart Information')}</h2><div class="ios-chart-two-graphic">${renderKPChart(result,'East Indian','Classic',1,english)}</div><section class="ios-chart-two-card ios-chart-two-ruling"><h3>${label('စိုးမိုးဂြိုဟ်များ','Ruling Planets')}</h3>${ruling}</section>${table(label('ဂြိုဟ်ဇယား','Planet Table'),english?['Planet','Sign','Star','Sub']:['ဂြိုဟ်','ရာသီ','နက္ခတ်','ဘုတ္တိ'],planetRows,result.planets.flatMap((p,i)=>p.speed<0?[i]:[]))}${table(label('ဘာဝဇယား','Cusp Table'),english?['House','Sign','Star','Sub']:['ဘာဝ','ရာသီ','နက္ခတ်','ဘုတ္တိ'],cuspRows)}</div>`;
}
