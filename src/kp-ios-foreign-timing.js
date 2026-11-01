import { calculate, lordsFor, normalize } from './kp-core.js';
import { dashaTimeline } from './kp-dasha.js';

// Port of KPForeignTravelTimingEngine.forecast; compute transit charts only on eligible DBA days.
const strength=(p,h)=>{const level=p?.levels.findIndex(houses=>houses.includes(h))??-1;return level<0?0:Math.max(1,4-level);};
const strongest=(p,houses)=>Math.max(0,...houses.map(h=>strength(p,h)));
const supportHouses=[3,9,12],transitSupport=[3,8,9,11,12];
const pick=(pair,en)=>pair[en?0:1];
const noTiming=['Foreign Travel-related Periods','နိုင်ငံခြားခရီးဆိုင်ရာ အချိန်ကာလများ'];
const heading=en=>pick(noTiming,en);
const analysis=en=>pick(['Travel periods are calculated from the complete natal timing sequence and practical departure indicators.','နိုင်ငံခြားခရီးဆိုင်ရာအချိန်ကာလများကို မူလဇာတာ၏ အချိန်စဉ်တစ်ခုလုံးနှင့် လက်တွေ့ထွက်ခွာမှု ဖြစ်နိုင်သည့်အခြေအနေများ ပေါင်းစပ်တွက်ချက်ထားပါသည်။'],en);
const resultOf=(en,body)=>({prediction:heading(en)+body,analysis:analysis(en)});
const both=body=>({en:resultOf(true,body[0]),mm:resultOf(false,body[1])});
const addMonth=(date,delta)=>{const d=new Date(date);d.setUTCMonth(d.getUTCMonth()+delta);return d;};
const addYear=(date,delta)=>{const d=new Date(date);d.setUTCFullYear(d.getUTCFullYear()+delta);return d;};
const dayKey=t=>Math.floor(t/86400000);

function trigger(longitude,planetIndex,targetSigns,profiles){
  const lords=lordsFor(normalize(longitude)),star=profiles.get(lords.starLord),sub=profiles.get(lords.subLord);
  const starStrength=strongest(star,supportHouses),subStrength=strongest(sub,supportHouses);
  if(starStrength===0||subStrength===0||starStrength+subStrength<4)return false;
  const sign=Math.floor(normalize(longitude)/30);
  const aspects=planetIndex===2?[4,7,8]:planetIndex===4?[5,7,9]:planetIndex===6?[3,7,10]:[7];
  return targetSigns.some(target=>target===sign||aspects.includes((target-sign+12)%12+1));
}
function rulingAlignment(day,transit,profiles,dasha){
  const dayLords=['တနင်္ဂနွေ','တနင်္လာ','အင်္ဂါ','ဗုဒ္ဓဟူး','ကြာသပတေး','သောကြာ','စနေ'];
  const moon=lordsFor(transit.planets[1].longitude),asc=lordsFor(transit.cusps[0].longitude);
  const rulers=new Set([dayLords[day.getUTCDay()],moon.signLord,moon.starLord,moon.subLord,asc.signLord,asc.starLord,asc.subLord]);
  const qualified=new Set([...rulers].filter(name=>strongest(profiles.get(name),supportHouses)>=2));
  let matches=0,score=0;
  dasha.forEach((p,i)=>{if(qualified.has(p.planet.name)){matches++;score+=[2,3,4][i]+strongest(p,supportHouses);}});
  return matches>=2?score:0;
}
function formatDate(day,en){
  const date=[String(day.getUTCDate()).padStart(2,'0'),String(day.getUTCMonth()+1).padStart(2,'0'),String(day.getUTCFullYear())].join('.');
  return en?date:date.replace(/[0-9]/g,d=>'၀၁၂၃၄၅၆၇၈၉'[Number(d)]);
}
function report(windows,en){
  if(!windows.length)return resultOf(en,pick(['\nNo unusually strong departure period appears in the six-month lookback and one-year forecast interval.','\nယနေ့မတိုင်မီ ၆ လမှ နောက် ၁ နှစ်အတွင်း နိုင်ငံခြားခရီးထွက်ဖို့ အထူးအားကောင်းတဲ့ကာလ မတွေ့ရသေးပါဘူးခင်ဗျာ။'],en));
  let body=pick(['\nThe following are the clearest periods for departure, travel approval or an important overseas development.','\nအောက်ပါကာလတွေမှာ နိုင်ငံခြားထွက်ခွာရခြင်း၊ ခရီးသွားခွင့်ရခြင်း၊ ဗီဇာနဲ့စာရွက်စာတမ်းကိစ္စ အောင်မြင်ခြင်း ဒါမှမဟုတ် နိုင်ငံခြားနဲ့ဆက်စပ်တဲ့ အရေးပါတဲ့တိုးတက်မှုတစ်ခု ဖြစ်လာနိုင်ပါတယ်ခင်ဗျာ။'],en);
  for(const item of windows){
    const start=new Date(item.peak.getTime()-3*86400000),end=new Date(item.peak.getTime()+3*86400000),range=`${formatDate(start,en)} ${en?'to':'မှ'} ${formatDate(end,en)}`;
    body+=en?`\n\n${range} (strongest around ${formatDate(item.peak,true)}).\nThis period can support a confirmed journey, travel permission, relocation arrangements or progress in an overseas matter.`
      :`\n\n${range} ကာလအတွင်း (${formatDate(item.peak,false)} ဝန်းကျင်မှာ အင်အားအကောင်းဆုံးဖြစ်ပါတယ်)။\nဒီကာလမှာ နိုင်ငံခြားခရီးအတည်ပြုခြင်း၊ ခရီးသွားခွင့်ရခြင်း၊ နေရာပြောင်းရွှေ့ဖို့ စီစဉ်ခြင်း ဒါမှမဟုတ် နိုင်ငံခြားနဲ့ဆက်စပ်တဲ့အလုပ်တစ်ခု တကယ်တိုးတက်လာခြင်းမျိုး ဖြစ်နိုင်ပါတယ်ခင်ဗျာ။`;
  }
  return resultOf(en,body);
}

export async function iosForeignTravelTiming(result,profiles,calculateAt=calculate,now=Date.now()){
  const profile=result.profile,lat=Number(profile.lat),lon=Number(profile.lon),tz=Number(profile.tz);
  let timeline;try{timeline=dashaTimeline(result.planets[1].longitude,result.utc);}catch{return both(['\nThe chart or timeline is incomplete.','\nနိုင်ငံခြားခရီးအချိန်ကို တွက်ရန် အချက်အလက် မပြည့်စုံသေးပါခင်ဗျာ။']);}
  if(!Number.isFinite(lat)||!Number.isFinite(lon)||!Number.isFinite(tz))return both(['\nThe chart or timeline is incomplete.','\nနိုင်ငံခြားခရီးအချိန်ကို တွက်ရန် အချက်အလက် မပြည့်စုံသေးပါခင်ဗျာ။']);
  const byName=new Map(profiles.map(p=>[p.planet.name,p]));
  const cusp=house=>byName.get(result.cusps.find(c=>c.number===house)?.lords.subLord);
  const weighted=[[cusp(12),2],[cusp(9),1],[cusp(3),1],[cusp(1),1]];
  const natalScore=houses=>weighted.reduce((total,[p,weight])=>total+(p?houses.reduce((n,h)=>n+strength(p,h)*weight,0):0),0);
  const primaryScore=natalScore(supportHouses),supportScore=natalScore([8,11]),obstructionScore=natalScore([4]);
  if(primaryScore===0||obstructionScore>=primaryScore*2+supportScore+3)return both(['\nA departure period strong enough to name confidently is not clear in the current forecast interval.','\nလက်ရှိတွက်ချက်ထားတဲ့အချိန်အပိုင်းအခြားအတွင်း နိုင်ငံခြားထွက်ခွာမယ့်ကာလလို့ ယုံကြည်စိတ်ချစွာ သတ်မှတ်ပေးနိုင်လောက်အောင် ထင်ရှားတဲ့အချိန် မတွေ့ရသေးပါဘူးခင်ဗျာ။']);
  const localNow=new Date(now+tz*3600000),today=new Date(Date.UTC(localNow.getUTCFullYear(),localNow.getUTCMonth(),localNow.getUTCDate()));
  const first=addMonth(today,-6),last=addYear(today,1),targets=result.cusps.filter(c=>supportHouses.includes(c.number)).map(c=>Math.floor(normalize(c.longitude)/30));
  const windows=[];let eligibleDays=0,successfulCalculations=0;
  for(let day=new Date(first);day<=last;day=new Date(day.getTime()+86400000)){
    const instant=day.getTime()-tz*3600000;
    const maha=timeline.find(p=>Date.parse(p.start)<=instant&&instant<Date.parse(p.end));
    const bhukti=maha?.children.find(p=>Date.parse(p.start)<=instant&&instant<Date.parse(p.end));
    const antara=bhukti?.children.find(p=>Date.parse(p.start)<=instant&&instant<Date.parse(p.end));
    if(!antara)continue;
    const m=byName.get(maha.lord),b=byName.get(bhukti.lord),a=byName.get(antara.lord);
    if(!m||!b||!a)continue;
    const ms=strongest(m,supportHouses),bs=strongest(b,supportHouses),ascore=strongest(a,transitSupport);
    if(ms===0||bs===0||ms+bs<4||ascore===0)continue;
    eligibleDays++;
    let transit;try{transit=await calculateAt({...profile,name:'ကောဇာ',year:day.getUTCFullYear(),month:day.getUTCMonth()+1,day:day.getUTCDate(),hour:12,min:0,sec:0,isHorary:false,isTSPHorary:false});}catch{continue;}
    successfulCalculations++;
    const transitMatches=[4,7,6].filter(index=>trigger(transit.planets[index].longitude,index,targets,byName)).length;
    if(!transitMatches)continue;
    const sun=trigger(transit.planets[0].longitude,0,targets,byName),moon=trigger(transit.planets[1].longitude,1,targets,byName);
    if(!sun&&!moon)continue;
    const rulers=rulingAlignment(day,transit,byName,[m,b,a]);if(!rulers)continue;
    const score=ms*3+bs*4+ascore*2+transitMatches*3+rulers+(sun?1:0)+(moon?1:0),names=[maha.lord,bhukti.lord,antara.lord];
    const lastWindow=windows.at(-1);
    if(lastWindow&&names.every((name,i)=>name===lastWindow.dasha[i])&&dayKey(day-lastWindow.end)<=7){lastWindow.end=new Date(day);if(score>lastWindow.score){lastWindow.score=score;lastWindow.peak=new Date(day);}}
    else windows.push({start:new Date(day),end:new Date(day),peak:new Date(day),score,dasha:names});
  }
  if(eligibleDays>0&&successfulCalculations===0)return both(['\nTransit positions could not be calculated for the eligible Dasha days. Please try again.','\nနိုင်ငံခြားခရီးအချိန်ကို အခုမတွက်နိုင်သေးပါခင်ဗျာ။ ထပ်မံစမ်းကြည့်ပါ။']);
  const selected=[];
  for(const item of windows.slice().sort((a,b)=>b.score-a.score)){
    if(selected.some(existing=>Math.abs(dayKey(existing.peak-item.peak))<45))continue;
    selected.push(item);if(selected.length===3)break;
  }
  selected.sort((a,b)=>a.peak-b.peak);
  return{en:report(selected,true),mm:report(selected,false)};
}

export function iosForeignTravelTimingFallback(score,en){
  if(score<55)return resultOf(en,pick(['\nA definite departure period is not clear enough to name confidently. Short trips, applications or foreign contacts may still develop when practical opportunities arise.','\nတကယ်နိုင်ငံခြားထွက်ခွာမယ့်အချိန်လို့ ယုံကြည်စိတ်ချစွာ သတ်မှတ်ပေးနိုင်လောက်အောင် ထင်ရှားတဲ့ကာလတစ်ခု မတွေ့ရသေးပါဘူးခင်ဗျာ။ ဒါပေမယ့် လက်တွေ့အခွင့်အရေးပေါ်လာတဲ့အချိန်မှာ ခရီးတိုသွားရခြင်း၊ နိုင်ငံခြားအတွက် လျှောက်လွှာတင်ခြင်း ဒါမှမဟုတ် အဝေးနိုင်ငံနဲ့ဆက်စပ်တဲ့ အလုပ်ကိစ္စတွေ ဖြစ်လာနိုင်ပါတယ်။'],en));
  return resultOf(en,pick(['\nCalculating the Dasha, transits and ruling planets for travel periods…','\nနိုင်ငံခြားခရီးအချိန်ကာလအတွက် ဒသာ၊ ကောဇာနှင့် စိုးမိုးဂြိုဟ်များကို တွက်ချက်နေပါသည်…'],en));
}
