// KPAnalysisNarrativeFormatter.swift: same sections and wording as the iOS view.
import { rulingItems, planetSignifications } from './kp-analysis.js';
import { normalize, SIGN_MM } from './kp-core.js';
import { planetLabel, signLabel } from './locale.js';
const unique=x=>[...new Set(x)];
const mm=x=>String(x).replace(/\d/g,d=>'၀၁၂၃၄၅၆၇၈၉'[Number(d)]);
const relevant={appearance:[1,5],longevity:[1,3,6,8,11,12],health:[1,6,8,11,12],healthPeriods:[1,6,8,11,12],accident:[1,6,8,12],wealth:[2,3,4,5,6,7,8,9,10,11,12],beneficialCareer:[2,3,4,5,6,7,8,9,10,11,12],natalLottery:[2,5,6,8,11,12],lumpSum:[2,5,6,7,8,11,12],children:[1,2,5,6,8,9,11,12],property:[4,11,12],vehicle:[2,4,6,8,11,12],education:[2,4,5,9,11],educationPeriods:[2,4,5,9,11],marriage:[1,2,3,5,7,9,11,12],marriagePeriods:[1,2,3,5,7,9,11,12],foreignTravel:[3,9,11,12],foreignTravelPeriods:[3,9,11,12],gemstone:[1,2,11],lifeSuccess:[1],birthRectification:[1,5,9,11]};
const rules={longevity:[1,[8],[1,3,8,5,9,11],[2,6,7,12]],health:[1,[6,8],[1,11,3,5,9],[6,8,12,2,7]],healthPeriods:[1,[8,6],[1,11,3,5,9],[6,8,12,2,7]],accident:[1,[8,6],[1,11,3,5,9],[6,8,12,2,7]],wealth:[2,[11,10,6],[2,6,10,11,3,9],[5,8,12]],natalLottery:[5,[2,8,11],[2,5,6,8,11],[12]],lumpSum:[5,[2,8,11],[2,5,6,8,11],[12]],beneficialCareer:[10,[6,11],[2,6,10,11,3,9],[5,8,12]],children:[5,[11,9],[5,11,1,2,9],[6,8,12]],property:[4,[11,2],[4,11,2,9,10],[6,8,12]],vehicle:[4,[11,2],[4,11,2,9,10],[6,8,12]],education:[4,[5,9,11,2],[2,4,5,9,11],[3,8,12]],marriage:[7,[2,11],[2,7,11,5,8],[1,6,10,12]],foreignTravel:[12,[9,3,1],[3,9,12,8,11],[4]],gemstone:[1,[],[1],[]]};
const aliases={educationPeriods:'education',marriagePeriods:'marriage',foreignTravelPeriods:'foreignTravel'};
export function practicalEvidence(result,id,en){
  const rule=rules[aliases[id]||id];if(!rule)return '';
  const [primary,confirm,support,originalPressure]=rule,pressure=[...originalPressure];
  if(['longevity','health','healthPeriods','accident'].includes(id))pressure.push([11,9,7][Math.floor(normalize(result.cusps[0].longitude)/30)%3]);
  const profiles=planetSignifications(result),found=new Set(),list=xs=>unique(xs).map(x=>en?String(x):mm(x)).join(', ');
  const lines=unique([primary,...confirm]).flatMap(h=>{
    const cusp=result.cusps.find(c=>c.number===h),p=profiles.find(p=>p.planet.name===cusp?.lords.subLord);
    const houses=p?unique(p.levels.flat()).sort((a,b)=>a-b):[];if(!houses.length)return [];
    houses.forEach(x=>found.add(x));
    return [en?`House ${h} cusp Sub Lord ${planetLabel(p.planet.name,true)} is in the star of ${planetLabel(p.planet.lords.starLord,true)} and signifies ${list(houses)}.`:`${mm(h)} တန့်ဘာဝသန္ဓိဘုတ္တိနက္ခတ်သခင်ဂြိုဟ် ${p.planet.name} ဟာ ${p.planet.lords.starLord} နက္ခတ်ကို စီးပြီး ${list(houses)} တန့်ဘာဝတွေကို အကျိုးဆောင်ပါတယ်။`];
  });if(!lines.length)return '';
  const good=support.filter(h=>found.has(h)),bad=unique(pressure).filter(h=>found.has(h));
  const a=en?(good.length?`supporting houses ${list(good)}`:'no designated supporting house'):(good.length?`အားပေးတဲ့ ${list(good)} တန့်ဘာဝတွေ ပါဝင်`:'အဓိကအားပေးဘာဝ မတွေ့ရ');
  const b=en?(bad.length?`obstructing houses ${list(bad)}`:'no designated obstructing house'):(bad.length?`ဖိအားပေးတဲ့ ${list(bad)} တန့်ဘာဝတွေလည်း ပါဝင်`:'အနှောင့်အယှက်ဘာဝ မတွေ့ရ');
  return lines.join('\n')+'\n\n'+(en?`These actual significations show ${a} and ${b}. Their balance, together with the detailed assessment above, is the chart basis for this reading.`:`ဒီအကျိုးဆောင်ဆက်စပ်မှုတွေမှာ ${a}ပြီး ${b}တာကို တွေ့ရပါတယ်။ အထက်မှာ စစ်ဆေးထားတဲ့အင်အားနဲ့ ပေါင်းစပ်ပြီး ဒီအချက်တွေကြောင့် အဟောကို ဆုံးဖြတ်ထားတာ ဖြစ်ပါတယ်ခင်ဗျာ။`);
}
export function natalAnalysisNarrative(result,reading,en=false){
  const p=result.profile,id=reading.id,subject=p.name?.trim()||(en?'the native':'ဇာတာရှင်'),title=en?reading.en:reading.mm;
  const pad=x=>String(x??0).padStart(2,'0'),time=p.time||`${pad(p.hour)}:${pad(p.min)}:${pad(p.sec)}`,birth=`${pad(p.day)}/${pad(p.month)}/${p.year}  ${time}`;
  const location=`${p.cityName||p.city||`${p.lat}, ${p.lon}`} · UTC${Number(p.tz)>=0?'+':''}${p.tz}`;
  const longitude=result.cusps[0]?.longitude,sign=Math.floor(normalize(longitude)/30),v=normalize(longitude)%30,minutes=Math.round(v*60),degree=`${pad(Math.floor(minutes/60)%30)}° ${pad(minutes%60)}′`;
  const asc=longitude==null?'':en?` The Ascendant falls in ${signLabel(SIGN_MM[sign],true)} at ${degree}.`:` လဂ်ဟာ ${signLabel(SIGN_MM[sign],false)}ရာသီ ${mm(degree)} မှာ ကျရောက်ပါတယ်။`;
  const context=en?`This natal chart for ${subject} was calculated for ${birth} at ${location}. The topic under examination is “${title}”.${asc}`:`${subject}ရဲ့ မူလဇာတာကို ${mm(birth)}၊ ${location} မှာ တွက်ထားပါတယ်။ ယခုလေ့လာစစ်ဆေးမယ့်အကြောင်းအရာက “${title}” ဖြစ်ပါတယ်။${asc}`;
  const values=relevant[id],houseText=values?(en?values.join(', '):mm(values.join(', '))):(en?'the relevant':'သက်ဆိုင်ရာ');
  const principle=en?`For this topic, houses ${houseText} and their cusp Sub Lords are examined through the KP significator chain. Significator planets describe what can happen; Dasha periods activate the natal promise, while transit and Ruling Planets narrow the timing.`:`ဒီအကြောင်းအရာကို စစ်ဆေးရာမှာ ${houseText} တန့်ဘာဝတွေနဲ့ သက်ဆိုင်ရာ ဘာဝသန္ဓိဘုတ္တိနက္ခတ်သခင်ဂြိုဟ်တွေကို KP အကျိုးဆောင်အဆင့်ဆင့်အတိုင်း စစ်ဆေးရပါတယ်။ ဇာတ်ဆောင်ဂြိုဟ်တွေက ဖြစ်ပျက်မယ့်အကြောင်းအရာကို ဖော်ပြပြီး ဒသာက မူလကံကို အသက်သွင်းကာ ကောဇာနဲ့ စိုးမိုးဂြိုဟ်တွေက ဖြစ်ပျက်မယ့်အချိန်ကို ပိုမိုတိကျစေပါတယ်။`;
  const labels=['Day Lord','Moon Sign Lord','Moon Star Lord','Moon Sub Lord','Ascendant Sign Lord','Ascendant Star Lord','Ascendant Sub Lord'];
  const rulers=rulingItems(result).map(([label,planet],i)=>`(${en?i+1:mm(i+1)}) ${en?labels[i]:label} — ${planetLabel(planet,en)}`).join('\n');
  const evidence=practicalEvidence(result,id,en),analysis=[reading.analysis?.trim(),evidence].filter(Boolean).join('\n\n');
  return [[en?'Chart Context':'ဇာတာအခြေအနေ',context],[en?'KP Principle':'KP ဥပဒေသ',principle],[en?'Practical Examination':'လက်တွေ့စစ်ဆေးခြင်း',analysis],[en?'Ruling Planets':'စိုးမိုးဂြိုဟ်များ',rulers]].map(([title,body])=>`### ${title}\n\n${body}`).join('\n\n');
}
