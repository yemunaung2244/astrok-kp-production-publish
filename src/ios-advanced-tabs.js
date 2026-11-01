import { LORDS, YEARS, normalize, SIGN_MM } from './kp-core.js';
import { planetLabel, rulingLabel, methodLabel, aspectTargetLabel } from './locale.js';
import { dashaTimeline } from './kp-dasha.js';
import { rulingItems, planetSignifications, houseSignifications, METHODS, methodSignifications, aspectRows } from './kp-analysis.js';

const escape=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const label=(english,mm,en)=>english?en:mm;
const number=(value,english)=>english?String(value):String(value).replace(/[0-9]/g,digit=>'၀၁၂၃၄၅၆၇၈၉'[Number(digit)]);
const planet=(name,english)=>planetLabel(name,english);
const list=(items,english)=>items?.length?items.map(item=>number(item,english)).join(','):'-';
const date=(value,tz)=>new Intl.DateTimeFormat('en-GB',{day:'2-digit',month:'2-digit',year:'numeric',timeZone:'UTC'}).format(new Date(Date.parse(value)+tz*3600000));
const range=(period,tz)=>`${date(period.start,tz)} – ${date(period.end,tz)}`;
const active=(period,now)=>Date.parse(period.start)<=now&&now<Date.parse(period.end);
const card=(heading,icon,body,extra='')=>`<section class="ios-advanced-card ${extra}"><h2><span class="ios-advanced-icon" aria-hidden="true">${icon}</span>${escape(heading)}</h2><div class="ios-advanced-divider"></div>${body}</section>`;
const table=(headers,rows,widths,extra='')=>`<div class="ios-advanced-table-wrap ${extra}"><table class="ios-advanced-table"><colgroup>${widths.map(width=>`<col style="width:${width}px">`).join('')}</colgroup><thead><tr>${headers.map(value=>`<th>${escape(value)}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(value=>`<td>${escape(value)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const periodYears=period=>Math.max(0,(Date.parse(period.end)-Date.parse(period.start))/(365.2425*86400000));
const yearsLabel=(years,english)=>{const months=Math.max(0,Math.round(years*12)),whole=Math.floor(months/12),rest=months%12;return english?`${whole} years${rest?` ${rest} months`:''}`:whole===0?`${rest} လ`:rest===0?`${whole} နှစ်`:`${whole} နှစ် ${rest} လ`;};

export function renderIOSDashaTab(result,english=false,now=Date.now()){
  const moon=normalize(result.planets[1].longitude),star=Math.floor(moon/(360/27)),lord=star%9;
  const balance=YEARS[lord]*((360/27)-(moon%(360/27)))/(360/27);
  const timeline=dashaTimeline(moon,result.utc),tz=Number(result.profile.tz)||0;
  const summary=card(label(english,'မွေးစဉ် ဒသာအခြေခံ','Birth Dasha Basis'),'⌛',`
    <div class="ios-advanced-pair"><span>${label(english,'မွေးစဉ် နက္ခတ်','Birth Nakshatra')}</span><strong>${label(english,`နက္ခတ် ${number(star+1,false)} · ${LORDS[lord]}`,`Nakshatra ${star+1} · ${planet(LORDS[lord],true)}`)}</strong></div>
    <div class="ios-advanced-pair"><span>${label(english,'မွေးစဉ် ဒသာနှစ်ကြွင်း','Birth Dasha Balance')}</span><strong>${yearsLabel(balance,english)}</strong></div>
    <div class="ios-advanced-pair"><span>${label(english,'တနင်္လာ တည်နေရာ','Moon Position')}</span><strong>${escape(SIGN_MM[Math.floor(moon/30)])} ${Math.floor(moon%30)}° ${String(Math.round((moon%1)*60)).padStart(2,'0')}′</strong></div>`);
  const maha=timeline.find(item=>active(item,now)),bhukti=maha?.children.find(item=>active(item,now)),antara=bhukti?.children.find(item=>active(item,now)),sukshma=antara?.children.find(item=>active(item,now));
  const current=[['မဟာဒသာ','Maha Dasha',maha],['ဘုတ္တိဒသာ','Bhukti Dasha',bhukti],['အန္တရဒသာ','Antara Dasha',antara],['သုခုမဒသာ','Sukshma Dasha',sukshma]].filter(([, ,item])=>item);
  const currentCard=current.length?card(label(english,'လက်ရှိ အသက်ဝင်နေသော ဒသာ','Current Active Dasha'),'◷',current.map(([mm,en,item])=>`<div class="ios-advanced-pair ios-current-dasha-row"><span>${label(english,mm,en)}</span><b>${escape(planet(item.lord,english))}</b><small>${range(item,tz)}</small></div>`).join(''),'ios-current-dasha'):'';
  const branch=(item,level,path=[])=>{
    const name=[...path,item.lord].map(value=>planet(value,english)).join(' – '),isCurrent=active(item,now);
    const levelText=[label(english,'မဟာဒသာ','Maha Dasha'),label(english,'ဘုတ္တိဒသာ','Bhukti Dasha'),label(english,'အန္တရဒသာ','Antara Dasha'),label(english,'သုခုမဒသာ','Sukshma Dasha')][level];
    const heading=level===0?`<strong>${escape(name)}</strong>${item===timeline[0]?`<em>${label(english,'မွေးစဉ်လက်ကျန်','Birth balance')}</em>`:''}`:`<span class="ios-dasha-dot"></span><span class="ios-dasha-level"><small>${levelText}</small><strong>${escape(name)}</strong></span>`;
    const dates=`<span class="ios-dasha-dates">${range(item,tz)}${level===0?`<small>${yearsLabel(periodYears(item),english)}</small>`:''}</span>`;
    return `<details class="ios-dasha-period ios-dasha-level-${level}${isCurrent?' current':''}"><summary>${heading}${dates}${item.children?.length?'<span class="ios-dasha-chevron">⌄</span>':''}</summary>${item.children?.length?`<div class="ios-dasha-children">${item.children.map(child=>branch(child,level+1,[...path,item.lord])).join('')}</div>`:''}</details>`;
  };
  return `<div class="ios-advanced-stack ios-dasha-tab">${summary}${currentCard}<div class="ios-dasha-timeline">${timeline.map(item=>branch(item,0)).join('')}</div></div>`;
}

export function renderIOSRulingTab(result,transit,error='',english=false){
  const rulingCard=(heading,chart,icon)=>card(heading,icon,`<p class="ios-ruling-summary">${escape(`${chart.profile.day}/${chart.profile.month}/${chart.profile.year} ${chart.profile.hour}:${chart.profile.min} · ${chart.profile.cityName||''}`)}</p><div class="ios-advanced-divider"></div>${rulingItems(chart).map(([key,value])=>`<div class="ios-advanced-pair"><span>${escape(rulingLabel(key,english))}</span><strong>${escape(planet(value,english))}</strong></div>`).join('')}`);
  const first=rulingCard(label(english,result.profile.isHorary?'ဟူးရားဇာတာ စိုးမိုးဂြိုဟ်':'မူလဇာတာ စိုးမိုးဂြိုဟ်','Natal Ruling Planets'),result,'♛');
  if(result.profile.isHorary)return `<div class="ios-advanced-stack">${first}</div>`;
  const second=transit?rulingCard(label(english,'ကောဇာဇာတာ စိုးမိုးဂြိုဟ်','Transit Ruling Planets'),transit,'◷'):
    card(label(english,'ကောဇာဇာတာ စိုးမိုးဂြိုဟ်','Transit Ruling Planets'),'◷',`<p class="ios-ruling-summary ${error?'ios-advanced-error':''}">${escape(error||label(english,'လက်ရှိကောဇာစိုးမိုးဂြိုဟ်များ တွက်နေပါသည်…','Calculating transit ruling planets…'))}</p>`);
  return `<div class="ios-advanced-stack">${first}${second}</div>`;
}

export function renderIOSSignificatorTab(result,byHouse=false,english=false){
  const headers=byHouse
    ? english?['House','L1 (Strongest)','L2','L3','L4']:['ဘာဝ','L1(အကြီးဆုံး)','L2(ဒုတိယ)','L3(တတိယ)','L4(စတုတ္ထ)']
    : english?['Planet','L1 (Strongest)','L2','L3','L4','Delegated representatives']:['ဂြိုဟ်','L1(အကြီးဆုံး)','L2(ဒုတိယ)','L3(တတိယ)','L4(စတုတ္ထ)','ကိုယ်စားလှယ်ဂြိုဟ်'];
  const data=byHouse?houseSignifications(result):planetSignifications(result);
  const rows=data.map(row=>byHouse
    ? [number(row.house,english),...row.levels.map(level=>level.length?level.map(item=>planet(item,english)).join(','):'-')]
    : [planet(row.planet.name,english),...row.levels.map(level=>list(level,english)),row.representatives.length?row.representatives.map(item=>`${planet(item.name,english)} (${item.through?label(english,'နက္ခတ်သခင် ရာဟု/ကိတ်မှ ','star lord node '):''}${item.relationship})`).join(english?', ':'၊ '):'-']);
  const heading=label(english,byHouse?'ဘာဝအကျိုးဆောင်ဂြိုဟ်များ':'ဂြိုဟ်အကျိုးဆောင်ဘာဝများ',byHouse?'House Significators':'Planet Significators');
  return `<section class="ios-advanced-significators"><h2><span aria-hidden="true">${byHouse?'▦':'☷'}</span>${heading}</h2>${table(headers,rows,byHouse?[66,132,132,132,132]:[76,112,96,112,112,300],'ios-significator-scroll')}</section>`;
}

export function renderIOSMethodsTab(result,selectedMethod='fourStep',english=false){
  const method=METHODS.find(([key])=>key===selectedMethod)?.[0]||'fourStep';
  const rows=methodSignifications(result,method),headers=rows[0]?.labels||[],widths=[82,...headers.map(()=>132)];
  const heading=(mm,en)=>label(english,mm,en),planetRows=rows.map(row=>[planet(row.planet.name,english),...row.levels.map(level=>list(level,english))]);
  const houseRows=Array.from({length:12},(_,index)=>[number(index+1,english),...headers.map((_,level)=>rows.filter(row=>row.levels[level]?.includes(index+1)).map(row=>planet(row.planet.name,english)).join(english?', ':'၊ ')||'-')]);
  const allMethods=METHODS.map(([key])=>methodSignifications(result,key));
  const consensus=rows.map(row=>{const counts=new Map();for(const methodRows of allMethods){const found=methodRows.find(item=>item.planet.index===row.planet.index);for(const house of new Set(found?.levels.flat()||[]))counts.set(house,(counts.get(house)||0)+1);}return [planet(row.planet.name,english),list([...counts].filter(([,count])=>count>=4).map(([house])=>house).sort((a,b)=>a-b),english)];});
  const houseSupport=Array.from({length:12},(_,index)=>{const house=index+1,methodMatches=allMethods.filter(methodRows=>methodRows.some(row=>row.levels.some(level=>level.includes(house))));const planets=rows.filter(row=>methodMatches.some(methodRows=>methodRows.some(item=>item.planet.index===row.planet.index&&item.levels.some(level=>level.includes(house))))).map(row=>planet(row.planet.name,english));return [number(house,english),`${methodMatches.length}/${METHODS.length}`,planets.join(english?', ':'၊ ')||'-'];});
  const description=method==='fourStep'?heading('KP Four-Step အကျိုးဆောင်စနစ်ကို မူလအတိုင်း အသုံးပြုထားပါတယ်။','The standard KP Four-Step significator chain is used.'):heading('ရွေးထားသော KP အကျိုးဆောင်နည်းစနစ်အလိုက် အဆင့်ဆင့်တွက်ချက်မှုကို ပြသထားပါတယ်။ ရာဟု/ကိတ် ကိုယ်စားပြုအကျိုးဆောင်မှုကို ထည့်တွက်ထားပါတယ်။','The selected significator method is shown level by level, including Rahu/Ketu agency where applicable.');
  const picker=card(heading('အကျိုးဆောင်တွက်နည်းရွေးချယ်ရန်','Significator method'),'☷',`<select id="method-select" aria-label="${heading('နည်းစနစ်','Method')}">${METHODS.map(([key,name])=>`<option value="${key}" ${key===method?'selected':''}>${escape(methodLabel(name,english))}</option>`).join('')}</select><p>${escape(description)}</p>`);
  const block=(title,heads,body,cols)=>`<section class="ios-method-block"><h2>${title}</h2>${table(heads,body,cols)}</section>`;
  return `<div class="ios-advanced-stack ios-methods-tab">${picker}${block(heading('ဂြိုဟ်အကျိုးဆောင်များ','Planet significators'),[heading('ဂြိုဟ်','Planet'),...headers],planetRows,widths)}${block(heading('ဘာဝအကျိုးဆောင်ဂြိုဟ်များ','House significators'),[heading('ဘာဝ','House'),...headers],houseRows,widths)}${block(heading('နည်းစနစ် ၇ မျိုး သဘောတူညီသော အကျိုးဆောင်ဘာဝများ','Seven-method consensus'),[heading('ဂြိုဟ်','Planet'),heading('ထပ်တူကျသောဘာဝများ','Repeated houses')],consensus,[105,280])}<section class="ios-method-block"><h2>${heading('နည်းစနစ် ၇ မျိုးအလိုက် ဘာဝထောက်ခံမှု','House support across methods')}</h2><p>${heading('နည်းစနစ်တစ်မျိုးစီတွင် အနည်းဆုံးဂြိုဟ်တစ်လုံးက အကျိုးဆောင်ထားသော ဘာဝအရေအတွက်ကို ပြထားသည်။','Shows how many methods include each house in at least one planet’s significations.')}</p>${table([heading('ဘာဝ','House'),heading('ထောက်ခံနည်းစနစ်','Methods'),heading('အကျိုးဆောင်ဂြိုဟ်','Planets')],houseSupport,[70,105,230])}</section></div>`;
}

const aspectKinds=[['Trine','#bae0fa','120°','အလွန်ကောင်း','Very favorable'],['Sextile','#c7e6ca','60°','အဆင်ပြေ','Favorable'],['Square','#ffccbd','90°','အတိုက်အခံ','Challenging'],['Opposition','#ffccd1','180°','အားပြိုင်','Polarizing'],['ပူးယှဉ်','#e0bfe8','0°','ပေါင်းစပ်ခြင်း','Combined']];
export function renderIOSAspectTab(result,eastern=true,english=false){
  const block=(byHouse)=>{
    const heading=english?byHouse?eastern?'Planet-to-House Aspects':'Planet-to-Cusp Aspects':'Planet-to-Planet Aspects':byHouse?'ဂြိုဟ်မှ အိမ်များသို့ အမြင်များ':'ဂြိုဟ် အချင်းချင်း အမြင်များ';
    const second=english?byHouse?eastern?'Aspected Houses':'Aspected Cusps':'Aspected Planets':byHouse?'မြင်ရသော အိမ်နံပါတ်များ':'မြင်ရသော ဂြိုဟ်များ';
    const rows=aspectRows(result,eastern,byHouse);
    return `<section class="ios-aspect-block"><h2>${heading}</h2><div class="ios-aspect-grid"><div class="ios-aspect-header"><b>${label(english,'ဂြိုဟ်','Planet')}</b><b>${second}</b></div>${rows.map((row,index)=>`<div class="ios-aspect-row ${index%2===0?'shaded':''}"><strong>${escape(planet(row.planet,english))}</strong><div class="${eastern?'':'ios-aspect-badges'}">${row.targets.length?row.targets.map(target=>{const text=aspectTargetLabel(target,english);const color=aspectKinds.find(([kind])=>target.includes(kind))?.[1]||'#edf0f3';return eastern?escape(text):`<span class="ios-aspect-badge" style="background:${color}">${escape(text)}</span>`;}).join(eastern?', ':''):'-'}</div></div>`).join('')}</div></section>`;
  };
  const legend=eastern?'':`<section class="ios-aspect-legend"><h2>${label(english,'အမြင်အညွှန်းများ (Aspect Legend)','Aspect Legend')}</h2><div>${aspectKinds.map(([kind,color,degrees,mm,en])=>`<span style="background:${color}">${escape(`${kind} (${degrees}) - ${label(english,mm,en)}`)}</span>`).join('')}</div><p>${label(english,'အမြင်အားလုံးအတွက် ၆° orb ကို အသုံးပြုထားပါသည်။','A 6° orb is used for all aspects.')}</p></section>`;
  return `<div class="ios-advanced-stack ios-aspects-tab">${block(false)}${block(true)}${legend}</div>`;
}
