import { dashaTimeline } from './kp-dasha.js';
import { lordsFor, transitLongitudeAt } from './kp-core.js';
import { planetSignifications } from './kp-analysis.js';

const strength=(p,h)=>{const index=p?.levels.findIndex(row=>row.includes(h))??-1;return index<0?0:4-index;};
const support=[2,6,10,11],pressure=[5,8,12];
const score=p=>p?support.reduce((n,h)=>n+strength(p,h),0)-pressure.reduce((n,h)=>n+strength(p,h),0):0;
const mm=value=>value.replace(/\d/g,d=>'၀၁၂၃၄၅၆၇၈၉'[Number(d)]);
const dateText=(timestamp,zone,en)=>{const date=new Date(timestamp+zone*3600000),value=`${String(date.getUTCDate()).padStart(2,'0')}.${String(date.getUTCMonth()+1).padStart(2,'0')}.${date.getUTCFullYear()}`;return en?value:mm(value);};

// Mirrors KPNatalReportNarrativeEngine.focusedTiming(.career): a qualifying
// Dasha–Bhukti–Antara interval needs Moon and Jupiter transit confirmation.
export async function iosCareerFocusedTiming(result,en=false,positionAt=transitLongitudeAt){
 const sig=planetSignifications(result),byName=new Map(sig.map(p=>[p.planet.name,p]));
 const tenth=byName.get(result.cusps.find(c=>c.number===10)?.lords.subLord);if(score(tenth)<=0)return null;
 const strengths=Array.from({length:13},(_,h)=>strength(tenth,h)*2+[6,11].reduce((n,c)=>n+strength(byName.get(result.cusps[c-1]?.lords.subLord),h),0));
 const primaryScore=support.reduce((n,h)=>n+strengths[h],0),supportiveScore=0,obstacleScore=pressure.reduce((n,h)=>n+strengths[h],0),totalSupport=primaryScore*2+supportiveScore;
 const verdict=primaryScore===0?'weak':totalSupport>=obstacleScore+3?'strong':obstacleScore>=totalSupport+3?'weak':'mixed',margin=totalSupport-obstacleScore;
 const confidence=verdict==='strong'?Math.min(94,Math.max(70,70+margin*2)):verdict==='mixed'?Math.min(69,Math.max(50,58+margin)):Math.min(49,Math.max(32,44+margin));
 if(confidence<50)return null;
 const timeline=dashaTimeline(result.planets[1].longitude,result.utc),zone=Number(result.profile.tz)||0,dayMs=86400000;
 const now=new Date();
 const local=new Date(now.getTime()+zone*3600000),today=Date.UTC(local.getUTCFullYear(),local.getUTCMonth(),local.getUTCDate());
 const horizon=new Date(today);horizon.setUTCMonth(horizon.getUTCMonth()+24);
 const birth=new Date(Date.parse(result.utc)+zone*3600000),candidates=[];let last=null;
 for(let localDay=today;localDay<horizon.getTime();localDay+=dayMs){
  const age=new Date(localDay).getUTCFullYear()-birth.getUTCFullYear()-((new Date(localDay).getUTCMonth()<birth.getUTCMonth()||new Date(localDay).getUTCMonth()===birth.getUTCMonth()&&new Date(localDay).getUTCDate()<birth.getUTCDate())?1:0);
  if(age<18||age>80)continue;
  const moment=localDay+12*3600000-zone*3600000;
  const maha=timeline.find(x=>Date.parse(x.start)<=moment&&moment<Date.parse(x.end));const bhukti=maha?.children.find(x=>Date.parse(x.start)<=moment&&moment<Date.parse(x.end));const antara=bhukti?.children.find(x=>Date.parse(x.start)<=moment&&moment<Date.parse(x.end));
  if(!maha||!bhukti||!antara)continue;
  const periodScores=[maha,bhukti,antara].map(x=>score(byName.get(x.lord)));
  const periodTotal=periodScores[0]*2+periodScores[1]*3+periodScores[2]*4;
  if(periodScores.filter(x=>x>0).length<2||periodTotal<=8)continue;
  const date=new Date(moment);const moon=lordsFor(await positionAt(date,result.profile,'တနင်္လာ'));const jupiter=lordsFor(await positionAt(date,result.profile,'ကြာသပတေး'));
  const moonScore=Math.max(score(byName.get(moon.starLord)),score(byName.get(moon.subLord))),jupiterScore=Math.max(score(byName.get(jupiter.starLord)),score(byName.get(jupiter.subLord)));
  if(moonScore<=0||jupiterScore<=0)continue;
  const total=periodTotal+moonScore*2+jupiterScore*3;
  if(last&&last.antara.start===antara.start&&last.last+dayMs===localDay){last.last=localDay;if(total>last.score){last.score=total;last.strongest=localDay;}}
  else{last={first:localDay,last:localDay,strongest:localDay,score:total,antara};candidates.push(last);}
 }
 if(!candidates.length)return null;
 const chosen=[];for(const item of candidates.sort((a,b)=>b.score-a.score||a.first-b.first)){if(chosen.some(x=>x.antara.start===item.antara.start))continue;chosen.push(item);if(chosen.length===2)break;}chosen.sort((a,b)=>a.first-b.first);
 const render=language=>{const lead=language?'The periods below are the times when this matter receives stronger support from the natal chart. “Favourable period” is the wider opportunity window. “Strongest dates” are the most promising days within that window.':'အောက်မှာဖော်ပြထားတဲ့ကာလတွေက မူလဇာတာအရ ဒီကိစ္စဖြစ်ပေါ်ဖို့ အားကောင်းတဲ့အချိန်တွေဖြစ်ပါတယ်ခင်ဗျာ။ “အကျိုးပေးကာလ” ဆိုတာ အခွင့်အရေး စတင်ပေါ်ပေါက်လာနိုင်တဲ့ အချိန်အပိုင်းအခြားဖြစ်ပြီး “အထူးအားကောင်းဆုံးရက်ပိုင်း” ဆိုတာ အဲဒီကာလထဲမှာ လက်တွေ့စတင်ကြိုးပမ်းဖို့ အကောင်းဆုံးရက်တွေကို ဆိုလိုပါတယ်။';const meaning=language?'Job applications, promotion efforts, career changes and new work are favoured.':'အလုပ်လျှောက်ခြင်း၊ ရာထူးတိုးတက်ရေးကြိုးပမ်းခြင်း၊ အလုပ်ပြောင်းခြင်းနဲ့ လုပ်ငန်းအသစ်စတင်ခြင်းတို့အတွက် ကောင်းတဲ့ကာလဖြစ်ပါတယ်ခင်ဗျာ။';const paragraphs=chosen.map(x=>{const start=dateText(Date.parse(x.antara.start),zone,language),end=dateText(Date.parse(x.antara.end)-1000,zone,language),first=dateText(x.first-zone*3600000,zone,language),last=dateText(x.last-zone*3600000,zone,language);return language?`Favourable period: ${start} to ${end}.\nStrongest dates: ${first} to ${last}.\nWhat this means: ${meaning}`:`အကျိုးပေးကာလ: ${start} မှ ${end} အထိ။\nအထူးအားကောင်းဆုံးရက်ပိုင်း: ${first} မှ ${last} အထိ။\nအဟော: ${meaning}`;});return`${lead}\n\n${paragraphs.join('\n\n')}`;};
 return en===null?{mm:render(false),en:render(true)}:render(en);
}
