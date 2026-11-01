import { natalAnalysisNarrative } from './kp-ios-analysis-narrative.js';
import { normalize } from './kp-core.js';
import { planetSignifications } from './kp-analysis.js';
import { dashaTimeline } from './kp-dasha.js';
import { planetLabel, houseLabel, signLabel } from './locale.js';
import { SIGN_MM } from './kp-core.js';
import { iosPrediction, appearanceAnalysis, lifeSuccessAnalysis } from './kp-ios-reading-copy.js';
import { iosLongevityReading, iosHealthReading, iosHealthPeriodReading } from './kp-ios-health-reading.js';
import { iosWealthReading, iosBeneficialCareer, iosCareerChangeReading, iosDebtReading, iosLumpSumReading } from './kp-ios-wealth-reading.js';
import { iosNatalLotteryReading } from './kp-ios-lottery-reading.js';
import { iosOwnershipReading } from './kp-ios-property-reading.js';
import { iosEducationReadings } from './kp-ios-education-reading.js';
import { iosMarriageReadings } from './kp-ios-marriage-reading.js';
import { iosChildrenReading } from './kp-ios-children-reading.js';
import { iosForeignTravelReading } from './kp-ios-foreign-reading.js';
import { iosForeignTravelTimingFallback } from './kp-ios-foreign-timing.js';

// Category order and bundled subjects mirror KPReadingCategory.natal and
// KPReadingsView.combinedNatalReading in the iOS app.
export const NATAL_CATEGORIES = [
  ['appearance','ရုပ်ရည်သွင်ပြင်ခန့်မှန်းချက်များ','Appearance Predictions','◉'],
  ['longevity','သက်တမ်းနှင့် ကျန်းမာရေး','Longevity and Health','✚'],
  ['wealth','အလုပ်အကိုင်နှင့်ဓနဉစ္စာ','Career and Wealth','▣'],
  ['natalLottery','ထီပေါက်ကံ','Natal Lottery Outlook','✦'],
  ['property','နေအိမ်ပိုင်ဆိုင်မှုကံ','Home Ownership','⌂'],
  ['vehicle','ယာဉ်ကားပိုင်ဆိုင်မှုကံ','Vehicle Ownership','◇'],
  ['education','ပညာရေး','Education','▤'],
  ['marriage','အိမ်ထောင်ရေး','Marriage','♡'],
  ['children','သားသမီးနဲ့ မိသားစုအကျိုး','Children and Family Happiness','♧'],
  ['foreignTravel','နိုင်ငံခြားခရီး','Foreign Travel','✈'],
  ['birthRectification','မွေးချိန်မှန်ပြန်ရှာခြင်း','Birth Time Rectification','◷'],
  ['gemstone','ဇာတာရှင်အတွက် ကံကောင်းစေမယ့် ကျောက်မျက်ရတနာ','Gemstone for the Native','◆'],
  ['lifeSuccess','ဘဝအောင်မြင်ရေးလမ်းညွှန်','Life Success Guide','✧']
];
const RULES={
  longevity:{cusp:1,confirm:[8],good:[1,3,8,5,9,11],bad:[2,6,7,12]},
  health:{cusp:6,confirm:[1,8],good:[1,11,3,5,9],bad:[6,8,12]},
  accident:{cusp:8,confirm:[1,6],good:[1,11,3,5,9],bad:[6,8,12]},
  wealth:{cusp:2,confirm:[11,10,6],good:[2,6,10,11,3,9],bad:[5,8,12]},
  career:{cusp:10,confirm:[6,11],good:[2,6,10,11,3,9],bad:[5,8,12]},
  debt:{cusp:2,confirm:[6,8,12],good:[6,8,12],bad:[2,10,11]},
  lumpSum:{cusp:8,confirm:[2,5,11],good:[2,5,8,11],bad:[6,12]},
  natalLottery:{cusp:5,confirm:[2,8,11],good:[2,5,8,11],bad:[6,12]},
  property:{cusp:4,confirm:[2,11],good:[4,11,2,9,10],bad:[6,8,12]},
  propertySale:{cusp:4,confirm:[2,8,12],good:[2,4,8,12],bad:[6,11]},
  vehicle:{cusp:4,confirm:[2,11],good:[4,11,2,9,10],bad:[6,8,12]},
  education:{cusp:4,confirm:[5,9,11,2],good:[2,4,5,9,11],bad:[3,8,12]},
  marriage:{cusp:7,confirm:[2,11],good:[2,7,11,5,8],bad:[1,6,10,12]},
  children:{cusp:5,confirm:[11,9],good:[5,11,1,2,9],bad:[6,8,12]},
  foreignTravel:{cusp:12,confirm:[9,3,1],good:[3,9,12,8,11],bad:[4]},
  gemstone:{cusp:1,confirm:[],good:[1,5,9,11],bad:[6,8,12]},
  lifeSuccess:{cusp:1,confirm:[2,10,11],good:[1,2,5,9,10,11],bad:[6,8,12]}
};
const WORDS={
  appearance:['မိမိကိုယ်ရည်ကိုယ်သွေးကို ထင်ရှားစွာပြနိုင်သူ','Your personal presence is a noticeable strength.'],
  longevity:['အားအင်နဲ့ ကျန်းမာရေးကို ကာလအလိုက် ထိန်းသိမ်းရမယ့် ဇာတာဖြစ်ပါတယ်။','Your vitality changes with the periods, so a steady routine matters.'],
  health:['ကျန်းမာရေးအားနည်းသည့်ကာလတွင် အနားယူမှုနှင့် စောစီးစွာဂရုစိုက်မှုကို ဦးစားပေးပါ။','Pay closer attention to rest and early care during vulnerable periods.'],
  accident:['ထိခိုက်မှု၊ ခွဲစိတ်ကုသရမှုနဲ့ ပတ်သက်တဲ့ သတိပြုရမယ့်ကာလ ရှိနိုင်ပါတယ်။','There may be periods when injury or surgery calls for extra care.'],
  wealth:['ဝင်ငွေနဲ့ အလုပ်အကိုင်အတွက် အလားအလာကောင်းတွေ ရှိပါတယ်။','The chart supports income and professional progress.'],
  career:['အလုပ်အကိုင်တိုးတက်ရေးကို အဓိကထားနိုင်ပါတယ်။','Professional development is a productive focus.'],
  debt:['ငွေကြေးဖိအား သို့မဟုတ် အကြွေးတင်နိုင်သည့်ကာလကို သတိထားပါ။','Watch for periods of debt or financial pressure.'],
  lumpSum:['ငွေအစုလိုက်အပြုံလိုက် ရနိုင်တဲ့အလားအလာရှိပါတယ်။','A one-time financial gain is indicated.'],
  natalLottery:['ထီဆုလို ကံစမ်းငွေရနိုင်တဲ့ အလားအလာကို တွေ့ရပါတယ်။','The chart shows some potential for a prize-based gain.'],
  property:['နေအိမ် သို့မဟုတ် မြေယာပိုင်ဆိုင်မှုအတွက် အခွင့်အလမ်း ရှိပါတယ်။','The chart supports an opportunity to own a home or land.'],
  propertySale:['ပိုင်ဆိုင်မှုရောင်းချခြင်းနှင့် နေရာပြောင်းခြင်းကို စဉ်းစားနိုင်ပါတယ်။','A property sale or relocation may be possible.'],
  vehicle:['ယာဉ်ကားပိုင်ဆိုင်နိုင်သည့် အခွင့်အလမ်းရှိပါတယ်။','The chart supports vehicle ownership.'],
  education:['ပညာရေးမှာ တိုးတက်အောင်မြင်နိုင်တဲ့ အခြေခံကောင်းရှိပါတယ်။','The chart supports educational progress.'],
  marriage:['အိမ်ထောင်ရေးအတွက် အခွင့်အလမ်းရှိပါတယ်။','The chart supports marriage prospects.'],
  children:['သားသမီးနဲ့ မိသားစုအကျိုးအတွက် အလားအလာရှိပါတယ်။','The chart supports children and family life.'],
  foreignTravel:['နိုင်ငံခြားခရီး သို့မဟုတ် နေရာပြောင်းမှုအတွက် အခွင့်အလမ်းရှိပါတယ်။','Foreign travel or relocation is supported.'],
  gemstone:['သင့်တော်မယ့် ကျောက်မျက်ရတနာကို ဇာတာအလိုက် ရွေးနိုင်ပါတယ်။','A gemstone can be selected from the chart.'],
  lifeSuccess:['မိမိအတွက် အားကောင်းတဲ့ကဏ္ဍကို ဦးစားပေးလုပ်ဆောင်ပါ။','Focus on the life areas with the clearest chart support.']
};
const NEGATIVE={
  longevity:['ကျန်းမာရေးကို ပုံမှန်ဂရုစိုက်ရမယ့် အနေအထားတွေ့ရပါတယ်။','The chart calls for consistent attention to health.'],
  wealth:['ဝင်ငွေတိုးတက်မှုမှာ နှောင့်နှေးမှုတွေ့ရနိုင်ပါတယ်။','Income and career progress may take longer.'],
  property:['နေအိမ်ပိုင်ဆိုင်မှုမှာ အချိန်ယူရနိုင်ပါတယ်။','Home ownership may take time.'],
  vehicle:['ယာဉ်ကားပိုင်ဆိုင်မှုမှာ အချိန်ယူရနိုင်ပါတယ်။','Vehicle ownership may take time.'],
  education:['ပညာရေးမှာ ကြားဖြတ်အခက်အခဲ ရှိနိုင်ပါတယ်။','Education may face interruptions.'],
  marriage:['အိမ်ထောင်ရေးကိစ္စ အချိန်ယူပြီးမှ တည်ငြိမ်နိုင်ပါတယ်။','A stable marriage may take time.'],
  children:['သားသမီးကိစ္စမှာ အချိန်ယူရနိုင်ပါတယ်။','The timing for children may be delayed.'],
  foreignTravel:['နိုင်ငံခြားခရီးမှာ နှောင့်နှေးမှုရှိနိုင်ပါတယ်။','Foreign travel may be delayed.']
};
const gemNames={
  'တနင်္ဂနွေ':['ပတ္တမြား','Ruby'],'တနင်္လာ':['ပုလဲ','Pearl'],'အင်္ဂါ':['သန္တာ','Red coral'],
  'ဗုဒ္ဓဟူး':['မြ','Emerald'],'ကြာသပတေး':['ဥဿဖရား','Yellow sapphire'],
  'သောကြာ':['စိန်','Diamond'],'စနေ':['နီလာ','Blue sapphire'],
  'ရာဟု':['ဂိုမက်','Hessonite'],'ကိတ်':['မျက်ကွင်းကျောက်','Cat’s eye']
};
const say=(english,mm,en)=>english?en:mm;
function strength(profile,house){if(!profile)return 0;const index=profile.levels.findIndex(level=>level.includes(house));return index<0?0:4-index;}
function profileForCusp(result,significations,house){const lord=result.cusps[house-1]?.lords.subLord;return significations.find(p=>p.planet.name===lord);}
function scoreProfile(profile,houses){return houses.reduce((sum,house)=>sum+strength(profile,house),0);}
function rankRule(result,significations,key){const rule=RULES[key],primary=profileForCusp(result,significations,rule.cusp),confirm=rule.confirm.map(h=>profileForCusp(result,significations,h)).filter(Boolean);const strengths=Array.from({length:13},(_,house)=>strength(primary,house)*2+confirm.reduce((sum,p)=>sum+strength(p,house),0));const primaryHouses={longevity:[1,3,8],health:[1,11],accident:[1,11],wealth:[2,6,10,11],career:[2,6,10,11],debt:[6,8,12],lumpSum:[2,5,6,8,11],natalLottery:[2,5,6,8,11],property:[4,11],propertySale:[2,4,8,12],vehicle:[4,11],education:[2,4,5,9,11],marriage:[2,7,11],children:[5,11],foreignTravel:[3,9,12],gemstone:[1],lifeSuccess:[1]}[key]||rule.good;const primaryScore=primaryHouses.reduce((sum,h)=>sum+strengths[h],0),supportiveScore=rule.good.filter(h=>!primaryHouses.includes(h)).reduce((sum,h)=>sum+strengths[h],0),support=primaryScore*2+supportiveScore,obstruction=rule.bad.reduce((sum,h)=>sum+strengths[h],0);return{rule,primary,confirm,strengths,support,obstruction,verdict:primaryScore===0?'weak':support>=obstruction+3?'strong':obstruction>=support+3?'weak':'mixed'};}
function periodScore(result,significations,planetName,rule,mode='support'){const profile=significations.find(p=>p.planet.name===planetName);if(!profile)return-100;return mode==='risk'?scoreProfile(profile,rule.bad)*2-scoreProfile(profile,rule.good)*2:scoreProfile(profile,rule.good)*2-scoreProfile(profile,rule.bad)*2;}
function topPeriods(result,significations,key,{limit=2,horizon=10,mode='support'}={}){const rule=RULES[key],now=Date.now(),until=now+horizon*365.2425*86400000;const candidates=[];for(const maha of dashaTimeline(result.planets[1].longitude,result.utc)){if(new Date(maha.end)<now||new Date(maha.start)>until)continue;for(const bhukti of maha.children){if(new Date(bhukti.end)<now||new Date(bhukti.start)>until)continue;for(const antara of bhukti.children){const start=Math.max(now,Date.parse(antara.start)),end=Math.min(until,Date.parse(antara.end));if(start>=end)continue;const lords=[maha.lord,bhukti.lord,antara.lord],score=lords.reduce((sum,lord,i)=>sum+periodScore(result,significations,lord,rule,mode)*(3-i),0);if(score>0)candidates.push({start,end,score,lords});}}}
  candidates.sort((a,b)=>b.score-a.score||a.start-b.start);const chosen=[];for(const candidate of candidates){if(chosen.some(x=>Math.abs(x.start-candidate.start)<30*86400000))continue;chosen.push(candidate);if(chosen.length>=limit)break;}return chosen.sort((a,b)=>a.start-b.start);
}
const fmt=(stamp,profile,english)=>new Intl.DateTimeFormat(english?'en-GB':'en-GB',{timeZone:'UTC',day:'numeric',month:'short',year:'numeric'}).format(new Date(stamp+Number(profile.tz)*3600000));
function periodText(period,profile,english){return`${fmt(period.start,profile,english)} – ${fmt(period.end,profile,english)}`;}
function analysis(result,assessment,english){
  const {rule,primary,confirm,support,obstruction}=assessment;
  const profileLine=(house,profile)=>{
    if(!profile)return '';
    const houses=[...new Set(profile.levels.flat())].sort((a,b)=>a-b);
    return english
      ? `- Cusp ${house}: Sub Lord ${planetLabel(profile.planet.name,true)}; signifies houses ${houses.join(', ')||'—'}.`
      : `- ${house} တန့် - ဘာဝသန္ဓိဘုတ္တိနက္ခတ်သခင်ဂြိုဟ် ${profile.planet.name}၊ အကျိုးဆောင်ဘာဝ ${houses.join('၊ ')||'—'} တန့်။`;
  };
  const lines=[profileLine(rule.cusp,primary),...confirm.map(p=>profileLine(rule.confirm[confirm.indexOf(p)],p))].filter(Boolean).join('\n');
  if(english){
    const supportHouses=rule.good.map(h=>houseLabel(h,true)).join(', ');
    return `KP significators\n${lines}\n\nOverall KP assessment\nThe primary cusp chain is tested against supporting houses ${supportHouses}. This chart has support score ${support} and obstruction score ${obstruction}.`;
  }
  const supportHouses=rule.good.map(h=>`${h} တန့်`).join('၊ ');
  return `KP အကျိုးဆောင်ဂြိုဟ်များ\n${lines}\n\nKP အင်အားသုံးသပ်ချက်\nအဓိကဘာဝသန္ဓိဆက်ကြောင်းကို အားပေးဘာဝ ${supportHouses} နဲ့ တိုက်စစ်ထားပါတယ်။ အားပေးချက် ${support}၊ အဟန့်အတား ${obstruction} ဖြစ်ပါတယ်။`;
}
function section(id,mm,en,prediction,analysisText='',periods=[]){return{id,mm,en,prediction,analysis:analysisText,periods};}
function baseReading(result,sig,key,english,mm,en,{periods=true,negativeKey=key}={}){const a=rankRule(result,sig,key),positive=a.verdict==='strong',weak=a.verdict==='weak',words=positive?WORDS[key]:weak?(NEGATIVE[negativeKey]||WORDS[key]):WORDS[key],intro=words[english?1:0];const modifier=a.verdict==='mixed'?say(english,'သို့သော် အဆင်ပြေဖို့ ကြိုးစားမှုနဲ့ အချိန်ညှိမှုလိုပါမယ်။','Progress is possible, though timing and effort matter.'):'';const windows=periods&&a.verdict!=='weak'?topPeriods(result,sig,key):[];return section(key,mm,en,`${intro}${modifier?` ${modifier}`:''}`,analysis(result,a,english),windows);}
function careerReading(result,sig,english){const a=rankRule(result,sig,'career');const sectors=[
  [['အုပ်ချုပ်ရေး၊ စီမံခန့်ခွဲရေး','administration and management'],[6,10],[0,6]],
  [['ကုန်သွယ်ရေး၊ အရောင်းနှင့် စျေးကွက်','trade, sales and marketing'],[3,7],[3,5]],
  [['ဘဏ္ဍာရေး၊ စာရင်းကိုင်','finance and accounting'],[2,5],[3,4]],
  [['ပညာရေး၊ သင်ကြားရေးနှင့် အကြံပေးလုပ်ငန်း','education and consulting'],[5,9],[4,3]],
  [['နည်းပညာ၊ ဆက်သွယ်ရေးနှင့် အင်ဂျင်နီယာ','technology, communications and engineering'],[3,8],[2,3,7]],
  [['အိမ်ခြံမြေ၊ ဆောက်လုပ်ရေး','property and construction'],[4,8],[2,6]],
  [['ကျန်းမာရေးနှင့် ဝန်ဆောင်မှု','healthcare and care services'],[6,8],[1,2]],
  [['နိုင်ငံခြား၊ ခရီးသွားနှင့် သယ်ယူပို့ဆောင်ရေး','international work, travel and logistics'],[9,12],[3,7]]
];const p2=profileForCusp(result,sig,2),p6=profileForCusp(result,sig,6),p11=profileForCusp(result,sig,11);const scores=sectors.map(([names,houses,planets],index)=>({names,index,score:houses.reduce((sum,h)=>sum+a.strengths[h]*2,0)+[p2,p6,p11].reduce((sum,p)=>sum+houses.reduce((x,h)=>x+strength(p,h),0),0)+(planets.includes(a.primary?.planet.index)?8:0)})).sort((x,y)=>y.score-x.score||x.index-y.index);const first=scores[0].names[english?1:0],second=scores[1].names[english?1:0],salaried=a.strengths[6]>=a.strengths[7];const text=say(english,`ဇာတာရှင်အတွက် ${first} အလုပ်အကိုင်က အကျိုးပေးနိုင်ပါတယ်။ နောက်ထပ်သင့်တော်တာက ${second} ဖြစ်ပါတယ်။ ${salaried?'ဝန်ထမ်းအဖြစ် သို့မဟုတ် စနစ်တကျဖွဲ့စည်းထားတဲ့လုပ်ငန်းမှာ လုပ်တာက ပိုကောင်းပါတယ်။':'ကိုယ်ပိုင်လုပ်ငန်း သို့မဟုတ် ဖောက်သည်နဲ့ တိုက်ရိုက်လုပ်ရတဲ့အလုပ်က ပိုကောင်းပါတယ်။'}`,`The strongest occupational field is ${first}. The next suitable field is ${second}. ${salaried?'A salaried or structured role is the stronger route.':'Independent or client-based work is the stronger route.'}`);return section('career','ဝင်ငွေရနိုင်တဲ့လမ်းကြောင်းများနဲ့ အကျိုးပေးအလုပ်အကိုင်','Income Sources and Beneficial Occupations',text,analysis(result,a,english),topPeriods(result,sig,'career'));}
function debtReading(result,sig,english){const pressure=rankRule(result,sig,'debt');if(pressure.verdict==='weak')return null;const repayment=rankRule(result,sig,'wealth'),risk=topPeriods(result,sig,'debt',{limit:2,horizon:10});if(!risk.length)return null;const pay=repayment.verdict==='weak'?[]:topPeriods(result,sig,'wealth',{limit:2,horizon:10});let text=say(english,'အောက်ပါကာလတွေမှာ ငွေကြေးဖိအားကြောင့် အကြွေးတင်နိုင်တာကို သတိထားပါ။ မည်သည့်အကြောင်းကြောင့်မဆို အကြွေးမထားနိုင်တာက ပိုစိတ်ချမ်းသာစရာဖြစ်ပါတယ်။','Financial pressure may lead to debt in the periods below. Avoiding unnecessary debt would be more comfortable.');if(pay.length)text+=' '+say(english,'သို့သော် ဝင်ငွေနဲ့ အကျိုးအမြတ်ပေါ်မူတည်ပြီး အကြွေးပြန်ဆပ်နိုင်စွမ်းရှိပါတယ်။','However, income and gains support repayment.');return section('debt','အကြွေးနှင့် ငွေကြေးဖိအား','Debt and Financial Pressure',text,analysis(result,pressure,english),risk.map(x=>({...x,kind:'risk'})).concat(pay.map(x=>({...x,kind:'repay'}))).sort((a,b)=>a.start-b.start));}
function gemstoneReading(result,sig,english){const candidates=sig.filter(p=>p.planet.index<7).map(p=>({p,score:scoreProfile(p,[1,5,9,11])*2-scoreProfile(p,[6,8,12])*2+(p.planet.name===result.cusps[0].lords.subLord?4:0)})).sort((a,b)=>b.score-a.score||a.p.planet.index-b.p.planet.index);const chosen=candidates[0];const gem=gemNames[chosen.p.planet.name]?.[english?1:0]||'—';const text=say(english,`ဇာတာရှင်အတွက် ${gem} ကို ရွေးချယ်ပေးပါတယ်။ ဇာတာထဲမှာ အကျိုးပေးတဲ့ အခန်းကဏ္ဍနဲ့ ထိခိုက်မှုအခန်းကဏ္ဍကို နှိုင်းယှဉ်ပြီး ရွေးထားပါတယ်။`,`The chart-based gemstone selection is ${gem}. The choice compares supportive and adverse house links.`);return section('gemstone','ဇာတာရှင်အတွက် ကံကောင်းစေမယ့် ကျောက်မျက်ရတနာ','Gemstone for the Native',text,`${planetLabel(chosen.p.planet.name,english)}: ${chosen.score}`,[]);}
function appearanceReading(result,sig,english){const text=iosPrediction('appearance','mixed',english,'',result);return section('appearance','ရုပ်ရည်သွင်ပြင်ခန့်မှန်းချက်များ','Appearance Predictions',text,appearanceAnalysis(result,english));}
function lotteryReading(result,sig,english){const a=rankRule(result,sig,'natalLottery'),chance=profileForCusp(result,sig,5),money=profileForCusp(result,sig,2),windfall=profileForCusp(result,sig,8),gain=profileForCusp(result,sig,11);const support=scoreProfile(chance,[2,5,6,8,11])*3+scoreProfile(money,[2,5,6,8,11])+scoreProfile(windfall,[2,5,6,8,11])+scoreProfile(gain,[2,5,6,8,11])*2,loss=strength(chance,12)*3+strength(money,12)+strength(windfall,12)+strength(gain,12),promise=strength(chance,5)>0&&strength(chance,11)>0&&(strength(chance,2)>0||strength(money,11)>0)&&support>loss;const windows=promise?topPeriods(result,sig,'natalLottery',{limit:1}):[];const text=promise?say(english,'ထီဆုလို ကံစမ်းငွေရနိုင်တဲ့ အလားအလာရှိပါတယ်။ အောက်ပါကာလမှာ ပိုမိုအားကောင်းပါတယ်။','The chart supports a lottery or prize-based gain, especially in the period below.'):say(english,'ထီဆုလို ကံစမ်းငွေဝင်မှုကို ဇာတာမှာ ထင်ရှားစွာမတွေ့ရသေးပါ။','A clear lottery or prize-based gain is not indicated.');const digits=[0,2,3,4,5,6,7,8,9],scores=Array(10).fill(0),add=(p,weight)=>{if(p&&digits[p.index]!=null)scores[digits[p.index]]+=weight;},byName=name=>result.planets.find(p=>p.name===name);add(chance?.planet,8);add(byName(chance?.planet.lords.starLord),5);add(money?.planet,5);add(windfall?.planet,4);add(gain?.planet,7);add(byName(gain?.planet.lords.starLord),4);const ranked=scores.map((score,digit)=>({score,digit})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score||a.digit-b.digit);const letterGroups=['က၊ ခ၊ ဂ','စ၊ ဆ၊ ဇ','ည၊ ဋ၊ ဌ','တ၊ ထ၊ ဒ','န၊ ပ၊ ဖ','ဗ၊ ဘ၊ မ','ယ၊ ရ၊ လ','ဝ၊ သ၊ ဟ'];const letters=letterGroups[((chance?.planet.index||0)*7+(gain?.planet.index||0)*3+(money?.planet.index||0))%letterGroups.length];const digit=ranked[0]?.digit;const romanLetters=['Ka','Sa','Nya','Ta','Na','Ba','Ya','Wa'];const letterName=romanLetters[letterGroups.indexOf(letters)];const selection=promise&&digit!==undefined?say(english,` ဦးစားပေးနံပါတ် ${'၀၁၂၃၄၅၆၇၈၉'[digit]}၊ အက္ခရာ ${letters.split('၊')[0]} ကို ရွေးပေးပါတယ်။`,` First-choice digit: ${digit}; Myanmar letter: ${letterName}.`):'';return section('natalLottery','ထီပေါက်ကံ','Natal Lottery Outlook',text+selection,analysis(result,a,english),windows);}
function healthPeriodReading(result,sig,english){const a=rankRule(result,sig,'health'),risk=topPeriods(result,sig,'health',{mode:'risk',limit:2}),recovery=topPeriods(result,sig,'health',{limit:2});if(!risk.length&&!recovery.length)return null;const words=[];if(risk.length)words.push(say(english,'ပိုဂရုစိုက်သင့်တဲ့ကာလတွေမှာ အနားယူပြီး ကျန်းမာရေးကို သေချာဂရုစိုက်ပါ။','During the more vulnerable periods, rest and pay close attention to your health.'));if(recovery.length)words.push(say(english,'ကျန်းမာရေးမကောင်းတာမျိုး ကြုံရရင် ပြန်လည်နာလန်ထူနိုင်တဲ့ကာလတွေကိုလည်း တွေ့ရပါတယ်။','If you have been unwell, the chart also shows possible recovery periods.'));return section('healthPeriods','ကျန်းမာရေးဆိုင်ရာ အချိန်ကာလများ','Health-related Periods',words.join(' '),analysis(result,a,english),[...risk.map(x=>({...x,kind:'risk'})),...recovery.map(x=>({...x,kind:'recovery'}))].sort((a,b)=>a.start-b.start));}
function accidentReading(result,sig,english){const a=rankRule(result,sig,'accident'),risk=topPeriods(result,sig,'accident',{mode:'risk',limit:2});const text=risk.length?say(english,'အောက်ပါကာလတွေမှာ သွားလာရေးနဲ့ အလုပ်လုပ်ရာမှာ ထိခိုက်မှုမဖြစ်အောင် ပိုသတိထားပါ။','Take extra care with travel and physical work in the following periods.'):say(english,'လာမယ့်ကာလအတွင်း ထိခိုက်မှုသတိပြုရန် အချိန်ကာလထင်ရှားစွာ မတွေ့ရပါ။','No prominent accident-caution period appears in the upcoming range.');return section('accident','ထိခိုက်မှုသတိပြုရန်','Injury and Accident Caution',text,analysis(result,a,english),risk.map(x=>({...x,kind:'risk'})));}
function rectificationReading(result,english){return section('birthRectification','မွေးချိန်မှန်ပြန်ရှာခြင်း','Birth Time Rectification',english?"Open the birth-time rectification form and enter dated events to calculate a ranked shortlist. No exact time can be inferred from the natal chart alone.":"မွေးချိန်မှန်ရှာခြင်းဖောင်တွင် ဖြစ်ရပ်ရက်စွဲများထည့်ပြီး ကိုက်ညီသောအချိန်များကို အဆင့်လိုက်တွက်စစ်ပါ။ မူလဇာတာတစ်ခုတည်းမှ မွေးချိန်အတိအကျ မသတ်မှတ်နိုင်ပါ။",english?"Birth-time rectification requires at least two independently dated life events. Candidate charts must be recalculated and each event checked against its cusp sub-lord and Maha–Bhukti–Antara timing.":"မွေးချိန်မှန်ရှာရန် ရက်စွဲအတည်ပြုနိုင်သော သီးခြားဘဝဖြစ်ရပ် အနည်းဆုံး ၂ ခုလိုပါသည်။ စမ်းသပ်မွေးချိန်တစ်ခုချင်းစီအတွက် ဇာတာကို ပြန်တွက်ပြီး ဘာဝသန္ဓိဘုတ္တိနက္ခတ်သခင်နှင့် ဖြစ်ရပ်ရက် ဒသာတို့ကို တိုက်စစ်ရပါမည်။");}
export function natalReading(result,category,english=false){if(result.profile.isHorary)throw new Error('Natal readings require a birth chart.');const sig=planetSignifications(result);const sections=[];const add=(x)=>{if(x)sections.push(x);};switch(category){
  case 'appearance':add(appearanceReading(result,sig,english));break;
  case 'longevity':{const life=iosLongevityReading(result,sig,english),health=iosHealthReading(result,sig,english),healthPeriods=iosHealthPeriodReading(result,sig,english);add(section('longevity','သက်တမ်းအဟော','Longevity',life.prediction,life.analysis));add(section('health','ကျန်းမာရေးနှင့် ရောဂါဝေဒနာအဟော','Health and Disease',health.prediction,health.analysis));add(section('healthPeriods','ကျန်းမာရေးဆိုင်ရာ အချိန်ကာလများ','Health-related Periods',healthPeriods.prediction,healthPeriods.analysis));add(accidentReading(result,sig,english));break;}
  case 'wealth':{const wealth=iosWealthReading(result,sig,english),career=iosBeneficialCareer(result,sig,english),change=iosCareerChangeReading(result,sig,english),debt=iosDebtReading(result,sig,english),lump=iosLumpSumReading(result,sig,english);add(section('wealth','ချမ်းသာကြွယ်ဝမှုအဆင့်အတန်း','Wealth and Financial Standing',wealth.prediction,wealth.analysis));add(section('beneficialCareer','ဝင်ငွေရနိုင်တဲ့လမ်းကြောင်းများနဲ့ အကျိုးပေးအလုပ်အကိုင်','Income Sources and Beneficial Occupations',career.prediction,career.analysis));add(section('careerChange','အလုပ်အကိုင်အပြောင်းအလဲနှင့် တိုးတက်မှု','Career Changes and Progress',change.prediction,change.analysis));if(debt)add(section('debt','အကြွေးနှင့် ငွေကြေးဖိအား','Debt and Financial Pressure',debt.prediction,debt.analysis));add(section('lumpSum','ငွေအစုလိုက်အပြုံလိုက်ရနိုင်မယ့်ကံ','Lump-sum Gains',lump.prediction,lump.analysis));const timing=result.careerFocusedTiming?.[english?'en':'mm'];if(timing)add(section('careerPeriods','အလုပ်အကိုင်ကာလများ','Career periods',timing,''));break;}
  case 'natalLottery':{const lottery=iosNatalLotteryReading(result,sig,english);add(section('natalLottery','ထီပေါက်ကံ','Natal Lottery Outlook',lottery.prediction,lottery.analysis));break;}
  case 'property':{const ownership=iosOwnershipReading(result,sig,english);add(section('property','နေအိမ်ပိုင်ဆိုင်မှုကံ','Home Ownership',ownership.prediction,ownership.analysis));add(baseReading(result,sig,'propertySale',english,'ရောင်းချခြင်းနှင့် နေရာပြောင်းခြင်း','Sale and Relocation'));break;}
  case 'vehicle':{const ownership=iosOwnershipReading(result,sig,english,'vehicle');add(section('vehicle','ယာဉ်ကားပိုင်ဆိုင်မှုကံ','Vehicle Ownership',ownership.prediction,ownership.analysis));break;}
  case 'education':{const education=iosEducationReadings(result,sig,english);add(section('education','ပညာရေးအဟော','Education Reading',education.natal.prediction,education.natal.analysis));add(section('educationPeriods','ပညာရေးဆိုင်ရာ အချိန်ကာလများ','Education-related Periods',education.periods.prediction,education.periods.analysis));break;}
  case 'marriage':{const marriage=iosMarriageReadings(result,sig,english);add(section('marriage','အိမ်ထောင်ရေးကံအဟော','Marriage Reading',marriage.natal.prediction,marriage.natal.analysis));add(section('marriagePeriods','အိမ်ထောင်ရေးဆိုင်ရာ အချိန်ကာလများ','Marriage-related Periods',marriage.periods.prediction,marriage.periods.analysis));break;}
  case 'children':{const children=iosChildrenReading(result,sig,english);add(section('children','သားသမီးနဲ့ မိသားစုအကျိုး','Children and Family Happiness',children.prediction,children.analysis));break;}
  case 'foreignTravel':{const travel=iosForeignTravelReading(result,sig,english);const timing=result.foreignTravelTiming?.[english?'en':'mm']||iosForeignTravelTimingFallback(travel.score,english);add(section('foreignTravel','နိုင်ငံခြားခရီးအဟော','Foreign Travel Reading',travel.prediction,travel.analysis));add(section('foreignTravelPeriods','နိုင်ငံခြားခရီးဆိုင်ရာ အချိန်ကာလများ','Foreign Travel-related Periods',timing.prediction,timing.analysis));break;}
  case 'birthRectification':add(rectificationReading(result,english));break;
  case 'gemstone':add(gemstoneReading(result,sig,english));break;
  case 'lifeSuccess':{add(section('lifeSuccess','ဘဝအောင်မြင်ရေးလမ်းညွှန်','Life Success Guide',iosPrediction('lifeSuccess','mixed',english,'',result),lifeSuccessAnalysis(result,english)));break;}
  default:throw new Error('Unknown natal reading category');
}for(const item of sections){if(category==='longevity'&&['longevity','health','healthPeriods'].includes(item.id))continue;if(category==='wealth'||category==='natalLottery'||category==='education'||category==='marriage'||category==='children'||item.id==='property'||item.id==='vehicle'||item.id==='foreignTravel')continue;const key=item.id==='healthPeriods'?'health':item.id;const verdict=RULES[key]?rankRule(result,sig,key).verdict:'mixed';item.prediction=iosPrediction(item.id,verdict,english,item.prediction,result,item);}for(const item of sections){item.analysisNarrative=natalAnalysisNarrative(result,item,english);}return{category,sections};}
export const formatReadingPeriod=periodText;
