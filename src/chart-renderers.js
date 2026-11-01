import { normalize, SIGN_MM } from './kp-core.js';
import { SIGN_EN } from './locale.js';
import { fortuna } from './kp-analysis.js';

export const CHART_STYLES = ['East Indian', 'North Indian', 'South Indian', 'Circular', 'Bengali'];
export const CHART_THEMES = ['Classic', 'Midnight', 'Lavender', 'Emerald'];
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
const SOUTH_CELLS = [[0,0],[1,0],[2,0],[3,0],[3,1],[3,2],[3,3],[2,3],[1,3],[0,3],[0,2],[0,1]];
const EAST_SLOTS = [[.5,.165,.275,.27],[.25,.12,.175,.175],[.085,.22,.15,.21],[.165,.5,.27,.285],[.085,.78,.15,.21],[.25,.88,.175,.175],[.5,.835,.275,.27],[.75,.88,.175,.175],[.915,.78,.15,.21],[.835,.5,.27,.285],[.915,.22,.15,.21],[.75,.12,.175,.175]];
const NORTH_SLOTS = [[.5,.21,.19,.17],[.27,.12,.19,.17],[.13,.28,.19,.17],[.22,.5,.19,.17],[.13,.72,.19,.17],[.27,.88,.19,.17],[.5,.79,.19,.17],[.73,.88,.19,.17],[.87,.72,.19,.17],[.78,.5,.19,.17],[.87,.28,.19,.17],[.73,.12,.19,.17]];
const PALETTES = {
  Classic: { background:'#fffbf4', ink:'#141a2e', line:'rgba(87,69,46,.78)', accent:'#ab3829', planet:'#141a2e' },
  Midnight: { background:'#111a32', ink:'#f7f5ff', line:'#bbc2e8', accent:'#91abff', planet:'#e7efff' },
  Lavender: { background:'#f0edff', ink:'#262141', line:'#6552a0', accent:'#6333c7', planet:'#194b5a' },
  Emerald: { background:'#ebfaf2', ink:'#141a2e', line:'#626978', accent:'#05784f', planet:'#141a2e' }
};
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const signOf = longitude => Math.floor(normalize(longitude) / 30);
const line = (x1,y1,x2,y2) => `<path d="M${x1} ${y1}L${x2} ${y2}"/>`;
const planetSymbol = name => ({'တနင်္ဂနွေ':'၁','တနင်္လာ':'၂','အင်္ဂါ':'၃','ဗုဒ္ဓဟူး':'၄','ကြာသပတေး':'၅','သောကြာ':'၆','စနေ':'၀','ရာဟု':'၈','ကိတ်':'၉'})[name] || name;
const planetText = planet => {const longitude=normalize(planet.longitude)%30,degree=Math.floor(longitude),minute=Math.floor((longitude-degree)*60);return`${planetSymbol(planet.name)} ${String(degree).padStart(2,'0')}°${String(minute).padStart(2,'0')}′${planet.speed<0?'R':''}`;};
const positionText = longitude => {
  const inside=normalize(longitude)%30;
  let degree=Math.floor(inside),minute=Math.round((inside-degree)*60);
  if(minute===60){degree=(degree+1)%30;minute=0;}
  return `${String(degree).padStart(2,'0')}°${String(minute).padStart(2,'0')}′`;
};
const svgStart = (style, theme) => `<svg class="kp-chart kp-${style.toLowerCase().replaceAll(' ','-')}" viewBox="0 0 420 420" role="img" aria-label="${style} KP chart" style="--chart-bg:${theme.background};--chart-ink:${theme.ink};--chart-line:${theme.line};--chart-accent:${theme.accent};--chart-planet:${theme.planet}"><rect width="420" height="420" rx="9" class="chart-background"/>`;
const svgEnd = '</svg>';

export function chartSignEntries(result, sign, displayHouse=1, options={}) {
  const rows=result.planets.filter(p=>signOf(p.longitude)===sign).map((planet,index)=>({
    id:`planet-${planet.index??index}`,longitude:planet.longitude,
    text:`${planetSymbol(planet.name)} ${positionText(planet.longitude)}${planet.speed<0?'R':''}`,
    kind:planet.speed<0?'retro':'planet',
  }));
  const asc=result.cusps.find(c=>c.number===1);
  if(asc&&signOf(asc.longitude)===sign)rows.push({id:'ascendant',longitude:asc.longitude,text:`လ ${positionText(asc.longitude)}`,kind:'asc'});
  if(result.planets.length>=2&&asc){
    const point=fortuna(result).longitude;
    if(signOf(point)===sign)rows.push({id:'fortuna',longitude:point,text:`F ${positionText(point)}`,kind:'fortuna'});
  }
  const cusps=options.houseNumber
    ? result.cusps.filter(c=>c.number===options.houseNumber)
    : options.includeHouses===false?[]:result.cusps.filter(c=>signOf(c.longitude)===sign);
  for(const cusp of cusps.filter(c=>c.number!==1)){
    const displayed=(cusp.number-displayHouse+12)%12;
    rows.push({id:`house-${cusp.number}`,longitude:cusp.longitude,text:`${ROMAN[displayed]} ${positionText(cusp.longitude)}`,kind:'house'});
  }
  return rows.sort((a,b)=>{
    const first=normalize(a.longitude)%30,second=normalize(b.longitude)%30;
    return first===second?a.id.localeCompare(b.id):(sign>=8?second-first:first-second);
  });
}

function slotContent(result, sign, slot, options={}) {
  const [fx,fy,fw,fh] = slot, x=fx*420, y=fy*420;
  const rows=chartSignEntries(result,sign,options.displayHouse||1,options);
  if(options.compact)rows.unshift({id:'sign',text:options.english?SIGN_EN[sign]:SIGN_MM[sign],kind:'sign'});
  if(!rows.length)return '';
  const availableHeight=fh*420-6, availableWidth=fw*420-6;
  const graphemes=text=>typeof Intl.Segmenter==='function'?[...new Intl.Segmenter('my',{granularity:'grapheme'}).segment(text)].length:Array.from(text).length;
  const longest=Math.max(...rows.map(row=>graphemes(row.text)));
  const baseFont=options.compact
    ? rows.length>8?5:rows.length>6?5.8:rows.length>4?6.8:8
    :Math.max(5.2,Math.min(11.5,availableHeight/rows.length*.72,availableWidth/Math.max(longest,2)*1.45));
  const step=Math.min(options.compact?baseFont+1:baseFont,availableHeight/rows.length);
  const firstY=y-(rows.length-1)*step/2;
  return rows.map((row,i)=>`<text x="${x}" y="${firstY+i*step}" class="chart-token ${row.kind}" font-size="${options.compact?(row.kind==='sign'?Math.max(baseFont,6):Math.max(5,baseFont*.85)):baseFont*.9}">${escape(row.text)}</text>`).join('');
}

function eastIndian(result, theme, style, displayHouse, english=false) {
  const marks=[0,140,280,420], lines=[];
  for(const point of marks.slice(1,-1)){lines.push(line(point,0,point,420),line(0,point,420,point));}
  lines.push(line(0,0,140,140),line(420,0,280,140),line(0,420,140,280),line(420,420,280,280));
  const contents=EAST_SLOTS.map((slot,sign)=>slotContent(result,sign,slot,{displayHouse,english})).join('');
  const center='';
  return svgStart(style,theme)+`<path d="M0 0H420V420H0Z" class="chart-grid"/>`+`<g class="chart-grid">${lines.join('')}</g>`+center+contents+svgEnd;
}

function northIndian(result,theme,displayHouse,english=false) {
  const ascSign=signOf(result.cusps[0].longitude);
  const lines=`<path d="M0 0H420V420H0Z M210 0L420 210L210 420L0 210Z M0 0L420 420 M420 0L0 420" class="chart-grid"/>`;
  const contents=NORTH_SLOTS.map((slot,house)=>{
    const natalHouse=(displayHouse+house-1)%12+1;
    return slotContent(result,(ascSign+natalHouse-1)%12,slot,{houseNumber:natalHouse,includeHouses:false,compact:true,english,displayHouse});
  }).join('');
  return svgStart('North Indian',theme)+lines+contents+svgEnd;
}

function southIndian(result,theme,displayHouse,english=false) {
  const lines=[];
  for(let i=1;i<4;i++){lines.push(line(i*105,0,i*105,420),line(0,i*105,420,i*105));}
  const contents=SOUTH_CELLS.map(([column,row],sign)=>slotContent(result,sign,[(column+.5)/4,(row+.5)/4,.24,.24],{displayHouse,compact:true,english})).join('');
  return svgStart('South Indian',theme)+`<path d="M0 0H420V420H0Z" class="chart-grid"/><g class="chart-grid">${lines.join('')}</g><text x="210" y="202" class="chart-center">KP</text><text x="210" y="225" class="chart-caption">South Indian</text>`+contents+svgEnd;
}

function circular(result,theme,displayHouse,english=false) {
  // Match the native iOS wheel: ascendant at nine o'clock, concentric rings,
  // degree ticks, zodiac glyphs/names, house cusps, aspects and planet guides.
  const asc=result.cusps[0].longitude, center=210, outer=170;
  const zodiacInner=outer*.82, degreeInner=outer*.72, houseRadius=outer*.60, aspectRadius=outer*.43;
  const point=(longitude,radius)=>{const angle=(normalize(longitude-asc)+180)*Math.PI/180;return[center+Math.cos(angle)*radius,center+Math.sin(angle)*radius];};
  const zodiac=['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];
  const colors=['#c9453d','#4f964d','#cc9e17','#3069a6'];
  const rings=[outer,outer*.94,zodiacInner,degreeInner,houseRadius,aspectRadius].map(radius=>`<circle cx="210" cy="210" r="${radius}" class="chart-wheel-ring"/>`).join('');
  const ticks=Array.from({length:360},(_,degree)=>{const length=degree%10===0?outer*.06:degree%5===0?outer*.038:outer*.019;const a=point(degree,outer),b=point(degree,outer-length);return`<path d="M${a[0]} ${a[1]}L${b[0]} ${b[1]}" class="chart-wheel-tick"/>`;}).join('');
  const signs=Array.from({length:12},(_,sign)=>{const a=point(sign*30,degreeInner),b=point(sign*30,outer),[gx,gy]=point(sign*30+15,outer*.875),[nx,ny]=point(sign*30+15,outer*1.145);return`${line(...a,...b)}<text x="${gx}" y="${gy}" class="chart-zodiac-glyph" fill="${colors[sign%4]}">${zodiac[sign]}</text><text x="${nx}" y="${ny}" class="chart-zodiac-name">${escape(english?SIGN_EN[sign]:SIGN_MM[sign])}</text>`;}).join('');
  const cusps=result.cusps.map((c,i)=>{const a=point(c.longitude,aspectRadius),b=point(c.longitude,degreeInner),next=result.cusps[(i+1)%12],mid=normalize(c.longitude+normalize(next.longitude-c.longitude)/2),[x,y]=point(mid,houseRadius*.86);return`<path d="M${a[0]} ${a[1]}L${b[0]} ${b[1]}" class="chart-wheel-cusp ${c.number===1?'asc':''}"/><text x="${x}" y="${y}" class="chart-wheel-house">${c.number===1?(english?'Asc':'လ'):(c.number-displayHouse+12)%12+1}</text>`;}).join('');
  const planets=result.planets.slice(0,9);
  const aspects=planets.flatMap((first,i)=>planets.slice(i+1).map(second=>{const gap=Math.min(normalize(first.longitude-second.longitude),normalize(second.longitude-first.longitude));const hard=Math.abs(gap-180)<=6||Math.abs(gap-90)<=5,soft=Math.abs(gap-120)<=6||Math.abs(gap-60)<=4;if(!hard&&!soft)return'';const a=point(first.longitude,aspectRadius),b=point(second.longitude,aspectRadius);return`<path d="M${a[0]} ${a[1]}L${b[0]} ${b[1]}" class="chart-wheel-aspect ${hard?'hard':'soft'}"/>`;})).join('');
  let previous=-1000,collision=0;
  const tokens=[...planets].sort((a,b)=>a.longitude-b.longitude).map((planet,index,all)=>{if(normalize(planet.longitude-previous)<7)collision++;else collision=0;if(index===0&&all.length>1&&normalize(planet.longitude-all[all.length-1].longitude)<7)collision=1;previous=planet.longitude;const radius=Math.max(aspectRadius*1.08,degreeInner*.92-collision*(degreeInner-aspectRadius)*.17),a=point(planet.longitude,radius),b=point(planet.longitude,degreeInner);return`<path d="M${a[0]} ${a[1]}L${b[0]} ${b[1]}" class="chart-wheel-guide"/><text x="${a[0]}" y="${a[1]}" class="chart-wheel-planet${planet.speed<0?' retro':''}">${escape(planetSymbol(planet.name))}${planet.speed<0?'R':''}</text>`;}).join('');
  return svgStart('Circular',theme)+`<circle cx="210" cy="210" r="210" class="chart-wheel-background"/>${rings}${ticks}<g class="chart-wheel-signs">${signs}</g>${cusps}${aspects}${tokens}`+svgEnd;
}

export function renderKPChart(result,style='East Indian',theme='Classic',displayHouse=1,english=false) {
  const selectedStyle=CHART_STYLES.includes(style)?style:CHART_STYLES[0];
  const palette=PALETTES[theme]||PALETTES.Classic;
  if(selectedStyle==='East Indian'||selectedStyle==='Bengali')return eastIndian(result,palette,selectedStyle,displayHouse,english);
  if(selectedStyle==='North Indian')return northIndian(result,palette,displayHouse,english);
  if(selectedStyle==='South Indian')return southIndian(result,palette,displayHouse,english);
  return circular(result,palette,displayHouse,english);
}

export function renderKPOverlayChart(natal,transit,theme='Emerald',displayHouse=1,english=false) {
  const palette=PALETTES[theme]||PALETTES.Emerald;
  const outerSlots=[[.5,.075,.2,.07],[.28,.075,.16,.07],[.09,.205,.12,.105],[.09,.5,.12,.13],[.09,.735,.12,.12],[.28,.925,.16,.07],[.5,.925,.2,.07],[.72,.925,.16,.07],[.91,.735,.12,.12],[.91,.5,.12,.13],[.91,.205,.12,.105],[.72,.075,.16,.07]];
  const innerSlots=[[.5,.267,.168,.149],[.327,.213,.084,.084],[.206,.32,.084,.084],[.267,.5,.149,.168],[.206,.68,.084,.084],[.327,.787,.084,.084],[.5,.733,.168,.149],[.673,.787,.084,.084],[.794,.68,.084,.084],[.733,.5,.149,.168],[.794,.32,.084,.084],[.673,.213,.084,.084]];
  const drawRows=(rows,slot,outer=false)=>{
    if(!rows.length)return '';
    const [fx,fy,fw,fh]=slot,x=fx*420,y=fy*420;
    const normal=(outer?420/41:420/45),scale=rows.length>7?.68:rows.length>5?.76:rows.length>3?.88:1;
    const font=Math.min(Math.max(normal*scale,5.8),outer?10.8:9.8)*(outer?1:.8);
    const step=Math.min(font*1.15,fh*420/rows.length),firstY=y-(rows.length-1)*step/2;
    return rows.map((row,index)=>`<text x="${x}" y="${firstY+index*step}" class="chart-token ${row.kind}${outer?' transit':''}" font-size="${font}">${escape(row.text)}</text>`).join('');
  };
  const inner=innerSlots.map((slot,sign)=>drawRows(chartSignEntries(natal,sign,displayHouse),slot)).join('');
  const outer=outerSlots.map((slot,sign)=>{
    const rows=transit.planets.filter(p=>signOf(p.longitude)===sign)
      .sort((a,b)=>sign>=8?b.longitude-a.longitude:a.longitude-b.longitude)
      .map(p=>({text:`${planetSymbol(p.name)} ${positionText(p.longitude)}${p.speed<0?'R':''}`,kind:p.speed<0?'retro':'planet'}));
    return drawRows(rows,slot,true);
  }).join('');
  const left=63,right=357,top=63,bottom=357,third=98;
  const segments=[
    line(0,0,left,top),line(420,0,right,top),line(0,420,left,bottom),line(420,420,right,bottom),
    line(left+third,0,left+third,top),line(right-third,0,right-third,top),
    line(left+third,bottom,left+third,420),line(right-third,bottom,right-third,420),
    line(0,top+third,left,top+third),line(right,top+third,420,top+third),
    line(0,bottom-third,left,bottom-third),line(right,bottom-third,420,bottom-third),
    line(left+third,top,left+third,bottom),line(right-third,top,right-third,bottom),
    line(left,top+third,right,top+third),line(left,bottom-third,right,bottom-third),
    line(left,top,left+third,top+third),line(right,top,right-third,top+third),
    line(left,bottom,left+third,bottom-third),line(right,bottom,right-third,bottom-third),
  ];
  const geometry=`<path d="M0 0H420V420H0Z M${left} ${top}H${right}V${bottom}H${left}Z" class="chart-grid"/><g class="chart-grid">${segments.join('')}</g>`;
  return svgStart('Overlay',palette)+`<rect x="63" y="63" width="294" height="294" fill="#ebebff"/><rect x="161" y="161" width="98" height="98" fill="#b0abfa"/>${geometry}${inner}${outer}<text x="210" y="205" class="chart-center">KP</text><text x="210" y="225" class="chart-caption">${english?'Natal + Transit':'မူလ + ကောဇာ'}</text>`+svgEnd;
}
