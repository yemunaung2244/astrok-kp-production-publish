import { IOS_TEXT } from './kp-ios-text-catalog.js';
import { planetLabel } from './locale.js';
import { dashaTimeline } from './kp-dasha.js';

const digit = value => String(value).replace(/\d/g, n => '၀၁၂၃၄၅၆၇၈၉'[Number(n)]);
const houses = (profile, english) => profile ? [...new Set(profile.levels.flat())].sort((a,b)=>a-b).map(x=>english?String(x):digit(x)).join(english?', ':'၊ ') || (english?'none':'မတွေ့ပါ') : '-';
const strength = (profile, house) => { const index=profile?.levels.findIndex(level=>level.includes(house))??-1; return index<0?0:Math.max(1,4-index); };
const profile = (result,significations,number) => significations.find(p=>p.planet.name===result.cusps.find(c=>c.number===number)?.lords.subLord);
const render = (template,values) => template
  .replace(/\\\(houses\(profile, isEnglish: (?:true|false)\)\)/g,values.profile??'-')
  .replace(/\\\((\w+)\)/g,(_,key)=>values[key]??'');

// Direct port of KPReadingEngine.androidLongevityReading's house tests and categories.
export function iosLongevityReading(result,sig,english){
  const t=IOS_TEXT.longevity,asc=profile(result,sig,1),eighth=profile(result,sig,8);
  if(!asc||!eighth)return{prediction:t[english?2:3],analysis:t[english?0:1],periods:[]};
  const sum=(p,hs)=>hs.reduce((n,h)=>n+strength(p,h),0);
  const sign=Math.floor(((result.cusps[0].longitude%360)+360)%360/30);
  const badhaka=[0,3,6,9].includes(sign)?11:[1,4,7,10].includes(sign)?9:7;
  const pressure=[...new Set([2,7,badhaka])];
  const life=sum(asc,[1,3,8]),maraka=sum(asc,pressure);
  let illness=sum(asc,[6,12]);if(strength(asc,8)>0&&illness>0)illness+=strength(asc,8);
  const protection=sum(asc,[5,9,11]),eighthLife=sum(eighth,[1,3,8]),eighthPressure=sum(eighth,pressure);
  let category=life>=6&&maraka===0&&illness<=2?2:life<=1&&(maraka>=2||illness>=4)?0:1;
  if(eighthLife>=6&&eighthPressure===0){if(category===0)category=1;else if(category===1&&protection>0)category=2;}
  else if(eighthPressure>=4&&eighthLife<=1){if(category===2)category=1;else if(category===1&&protection===0)category=0;}
  const escape=([asc,eighth].some(p=>[[5,11],[9,11]].some(pair=>pair.every(h=>strength(p,h)>0))));
  if(escape&&category===0)category=1;
  const analysis=english?`Ascendant cusp Sub Lord ${planetLabel(asc.planet.name,true)} signifies houses ${houses(asc,true)}.\nEighth-cusp Sub Lord ${planetLabel(eighth.planet.name,true)} signifies houses ${houses(eighth,true)}.`:`လဂ်ဘာဝသန္ဓိဘုတ္တိနက္ခတ်သခင်ဂြိုဟ် ${asc.planet.name} က ${houses(asc,false)} တန့်ဘာဝတွေကို အကျိုးဆောင်ထားပါတယ်။\n၈ တန့်ဘာဝသန္ဓိဘုတ္တိနက္ခတ်သခင်ဂြိုဟ် ${eighth.planet.name} က ${houses(eighth,false)} တန့်ဘာဝတွေကို အကျိုးဆောင်ထားပါတယ်။`;
  return{prediction:t[english?6+(2-category):9+(2-category)],analysis,periods:[]};
}

// Direct port of KPHealthReadingEngine.natalPrediction and analysis. The literal
// copy comes from that Swift file's extracted string catalog.
export function iosHealthReading(result,sig,english){
  const t=IOS_TEXT.health,asc=profile(result,sig,1),sixth=profile(result,sig,6),eighth=profile(result,sig,8);
  const sign=p=>Math.floor(((p.longitude%360)+360)%360/30);
  const cuspSign=sign(result.cusps.find(c=>c.number===6));
  const starLord=sixth?.planet.lords.starLord??'-';
  const primarySign=sign(result.planets.find(p=>p.name===starLord)??result.cusps.find(c=>c.number===6));
  const line=n=>{const p=n===1?asc:n===6?sixth:eighth;return render(t[english?4:5],{house:n,lord:p?.planet.name??'-',profile:houses(p,english)});};
  const analysis=render(t[english?9:10],{lines:[1,6,8].map(line).join('\n'),subLord:sixth?.planet.name??'-',starLord,cuspTheme:t[(english?106:118)+cuspSign],starTheme:t[(english?106:118)+primarySign]});
  const support=[1,5,11].filter(h=>strength(asc,h)>0).length,strain=[6,8,12].filter(h=>strength(asc,h)>0).length;
  const vitality=t[support>strain?(english?11:12):strain>support?(english?13:14):(english?15:16)];
  const planet=sixth?.planet.index??0;
  let condition=t[(english?78:66)+primarySign];
  if([6,2,4,5].includes(planet))condition+=t[({6:90,2:92,4:94,5:96})[planet]+(english?0:1)];
  let details='';for(const [test,index] of [[strength(sixth,6)>0,18],[strength(sixth,8)>0||strength(eighth,8)>0,20],[strength(sixth,12)>0||strength(eighth,12)>0,22],[strength(sixth,11)>0||strength(asc,11)>0,24]])if(test)details+=t[index+(english?0:1)];
  const careIndex=[5,8].includes(primarySign)?0:[6,7,11].includes(primarySign)?1:[9,10].includes(primarySign)?2:3;
  const prediction=render(t[english?26:27],{vitality,primary:t[(english?106:118)+primarySign],secondary:t[(english?106:118)+cuspSign],planet:t[(english?130:139)+planet],condition,details,care:t[(english?98:102)+careIndex]});
  return{prediction,analysis,periods:[]};
}

export function iosHealthPeriodReading(result,sig,english){
  const t=IOS_TEXT.health,asc=profile(result,sig,1),sixth=profile(result,sig,6),eighth=profile(result,sig,8);
  const cusp=result.cusps.find(c=>c.number===6),star=sixth?.planet.lords.starLord??'-';
  const sign=p=>Math.floor(((p.longitude%360)+360)%360/30);
  const cuspSign=sign(cusp),primarySign=sign(result.planets.find(p=>p.name===star)??cusp);
  const line=render(t[english?4:5],{house:6,lord:sixth?.planet.name??'-',profile:houses(sixth,english)});
  const analysis=render(t[english?9:10],{lines:line,subLord:sixth?.planet.name??'-',starLord:star,cuspTheme:t[(english?106:118)+cuspSign],starTheme:t[(english?106:118)+primarySign]});
  const now=Date.now(),until=new Date().setFullYear(new Date().getFullYear()+1);
  const timeline=dashaTimeline(result.planets[1].longitude,result.utc);
  const active=timeline.find(x=>Date.parse(x.start)<=now&&now<Date.parse(x.end));
  const bhukti=active?.children.find(x=>Date.parse(x.start)<=now&&now<Date.parse(x.end));
  const antara=bhukti?.children.find(x=>Date.parse(x.start)<=now&&now<Date.parse(x.end));
  if(!active||!bhukti||!antara)return{analysis,prediction:t[english?28:29],periods:[]};
  const activeHouses=new Set([active,bhukti,antara].flatMap(x=>sig.find(p=>p.planet.name===x.lord)?.levels.flat()??[]));
  let current=render(t[english?30:31],{primary:t[(english?106:118)+primarySign]});
  for(const [house,index] of [[6,32],[8,34],[12,36],[11,38]])if(activeHouses.has(house))current+=t[index+(english?0:1)];
  if(![6,8,12].some(h=>activeHouses.has(h)))current+=t[english?40:41];
  const risk=[],recovery=[];
  const strongest=(p,hs)=>Math.max(0,...hs.map(h=>strength(p,h)));
  for(const maha of timeline){if(Date.parse(maha.end)<=now||Date.parse(maha.start)>=until)continue;
    for(const b of maha.children){if(Date.parse(b.end)<=now||Date.parse(b.start)>=until)continue;
      const first=sig.find(p=>p.planet.name===maha.lord),second=sig.find(p=>p.planet.name===b.lord);
      if(!first||!second)continue;
      const danger=[6,8,12],help=[1,5,9,11];
      const riskScore=strongest(first,danger)+strongest(second,danger),helpScore=strongest(first,help)+strongest(second,help);
      for(const a of b.children){const start=Math.max(now,Date.parse(a.start)),end=Math.min(until,Date.parse(a.end));if(start>=end)continue;
        const third=sig.find(p=>p.planet.name===a.lord);if(!third)continue;
        if(riskScore>=4&&strongest(first,danger)>0&&strongest(second,danger)>0)risk.push({start,end,score:riskScore+strongest(third,danger),kind:'risk'});
        if(helpScore>=4&&strongest(first,help)>0&&strongest(second,help)>0)recovery.push({start,end,score:helpScore+strongest(third,help),kind:'recovery'});
      }
    }
  }
  const selected=list=>list.sort((a,b)=>b.score-a.score||a.start-b.start).slice(0,3).sort((a,b)=>a.start-b.start);
  const cautions=selected(risk),recoveries=selected(recovery);
  const fmt=date=>new Intl.DateTimeFormat(english?'en-GB':'en-GB',{timeZone:'UTC',day:'2-digit',month:'2-digit',year:'numeric'}).format(new Date(date));
  const dates=list=>list.map(x=>`${fmt(x.start)} – ${fmt(x.end)}`).join('\n');
  const paragraphs=[];
  if(cautions.length)paragraphs.push(`${t[english?51:52]}\n${dates(cautions)}\n${t[english?56:57]}`);
  if(recoveries.length)paragraphs.push(`${t[english?58:59]}\n${dates(recoveries)}\n${t[english?63:64]}`);
  const prediction=paragraphs.length?`${current}\n\n${t[english?49:50]}\n\n${paragraphs.join('\n\n')}`:current;
  return{analysis,prediction,periods:[...cautions,...recoveries].sort((a,b)=>a.start-b.start)};
}
