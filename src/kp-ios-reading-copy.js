import { IOS_TEXT } from './kp-ios-text-catalog.js';
import { IOS_HEIGHT, IOS_LIFE_EN, IOS_LIFE_MM } from './kp-ios-extra-copy.js';
import { SIGN_MM, normalize } from './kp-core.js';
import { planetLabel } from './locale.js';

// These are literal prediction strings from the iOS KP reading engines.
// The Web's existing chart assessment selects the variant; this module does
// not change the calculation or translate/rewrite any prediction.
const pick = (pair, english) => pair[english ? 0 : 1];
const byVerdict = (verdict, strong, mixed, weak) => verdict === 'strong' ? strong : verdict === 'weak' ? weak : mixed;

// Preserve iOS ordering: ascendant influences first, then sub-lord influences.
function appearanceInfluences(result, cusp, sub) {
  const sign = longitude => Math.floor(normalize(longitude) / 30);
  const houses = index => index === 2 ? [4,7,8] : index === 4 ? [5,7,9] : index === 6 ? [3,7,10] : [7];
  const influences = (target, excluding) => result.planets.flatMap(planet => {
    if (![0,1,2,4,6,7,8].includes(planet.index) || planet.index === excluding) return [];
    const relative = (sign(target) - sign(planet.longitude) + 12) % 12 + 1;
    return relative === 1 ? [{planet, aspect:0}] : houses(planet.index).includes(relative) ? [{planet, aspect:relative}] : [];
  });
  const seen = new Set();
  return [...influences(cusp.longitude), ...influences(sub.longitude, sub.index)].filter(({planet}) => {
    if (seen.has(planet.index)) return false;
    seen.add(planet.index); return true;
  });
}

export function lifeSuccessAnalysis(result, english) {
  const cusp = result.cusps[0], sub = result.planets.find(p => p.name === cusp?.lords.subLord);
  const star = result.planets.find(p => p.name === sub?.lords.starLord);
  if (!cusp || !sub || !star) return english ? 'The Ascendant stellar chain is incomplete.' : 'လဂ်နက္ခတ်ဆက်ကြောင်းအချက်အလက် မပြည့်စုံသေးပါ။';
  const sign = Math.floor(normalize(star.longitude) / 30);
  return english
    ? `The Ascendant cusp Sub Lord is ${planetLabel(cusp.lords.subLord,true)}. It occupies the star of ${planetLabel(sub.lords.starLord,true)}, whose lord is placed in zodiac sign ${sign+1}. The guidance is selected from that stellar-lord sign.`
    : `လဂ်ဘာဝသန္ဓိဘုတ္တိနက္ခတ်သခင်ဂြိုဟ်ဟာ ${cusp.lords.subLord} ဖြစ်ပြီး ${sub.lords.starLord}နက္ခတ်ကို စီးထားပါတယ်။ ${sub.lords.starLord}ဟာ ${SIGN_MM[sign]}ရာသီမှာ ရပ်တည်နေတာကြောင့် ဒီရာသီအတွက် သတ်မှတ်ထားတဲ့ ဘဝအောင်မြင်ရေးလမ်းညွှန်ကို ဟောဆိုထားပါတယ်။`;
}

function appearanceCopy(result, english) {
  const cusp=result.cusps[0], sub=result.planets.find(p=>p.name===cusp?.lords.subLord);
  if(!cusp||!sub)return english?'Recalculate the chart with complete birth data.':'မွေးဖွားမှုအချက်အလက်ပြည့်စုံစွာဖြင့် ဇာတာကို ပြန်တွက်ပါ။';
  const sign=x=>Math.floor(normalize(x)/30);
  const merged=appearanceInfluences(result,cusp,sub).map(item=>item.planet);
  const nodeInfluence=index=>sub.index===index||result.planets.some(p=>p.index===index&&(sign(sub.longitude)-sign(p.longitude)+12)%12+1===7);
  const rahu=nodeInfluence(7),ketu=nodeInfluence(8),s=sign(sub.longitude),base=[2,4,8,10].includes(s)?0:[0,5,6,7].includes(s)?1:2;
  const height=IOS_HEIGHT[(english?0:12)+base*4+(rahu&&ketu?0:ketu?1:rahu?2:3)];
  const body={0:english?'Sun supports a muscular, strong body and thicker body hair.':'တနင်္ဂနွေရဲ့ အမြင်အယှဉ်ကြောင့် ကြွက်သားစနစ်ကောင်းမွန်ပြီး ကြံ့ခိုင်တဲ့ ကိုယ်ခန္ဓာရှိနိုင်ပါတယ်။ ဆံပင်နဲ့ ကိုယ်ခန္ဓာအမွှေးအမျှင်တွေ ထူထဲတဲ့ဘက်လည်း ပါဝင်နိုင်ပါတယ်။',1:english?'Moon can give a rounder or fuller body, a pale appearance, a longer nose and sharp eyes.':'တနင်္လာရဲ့ အမြင်အယှဉ်ကြောင့် ကိုယ်ခန္ဓာလုံးဝန်းပြည့်ဖြိုးနိုင်ပြီး အသားအရေအနည်းငယ်ဖျော့တော့တတ်ပါတယ်။ နှာတံရှည်တာနဲ့ မျက်လုံးစူးရှထက်မြက်တာမျိုးလည်း ပါလာနိုင်ပါတယ်။',2:english?'Mars supports a muscular and physically strong build.':'အင်္ဂါရဲ့အမြင်အယှဉ်ကြောင့် ကြွက်သားကောင်းမွန်ပြီး ကြံ့ခိုင်သန်မာတဲ့ ကိုယ်ခန္ဓာပုံစံရှိနိုင်ပါတယ်။',4:english?'Jupiter tends to make the body broader and larger.':'ကြာသပတေးရဲ့ အမြင်အယှဉ်ကြောင့် ကိုယ်ခန္ဓာထွားကြိုင်းပြီး ခန့်ညားထည်ဝါတဲ့ဘက်ကို ပိုအားသာနိုင်ပါတယ်။',6:english?'Saturn tends to produce a lean body and thicker body hair.':'စနေဂြိုဟ်ရဲ့ အမြင်အယှဉ်ကြောင့် ကိုယ်ခန္ဓာကြုံလှီသွယ်လျနိုင်ပြီး ဆံပင်နဲ့ အမွှေးအမျှင်တွေထူထဲတတ်ပါတယ်။'};
  const extra=merged.filter(p=>![7,8].includes(p.index)).map(p=>body[p.index]).filter(Boolean).join(' '); return extra?`${height} ${extra}`:height;
}

export function appearanceAnalysis(result, english) {
  const cusp=result.cusps[0], sub=result.planets.find(p=>p.name===cusp?.lords.subLord);
  if(!cusp||!sub)return english?'Ascendant data is incomplete.':'လဂ်ဘာဝသန္ဓိအချက်အလက် မပြည့်စုံသေးပါ။';
  const sign=x=>Math.floor(normalize(x)/30);
  const mm=n=>String(n).replace(/\d/g,d=>'၀၁၂၃၄၅၆၇၈၉'[Number(d)]);
  const influences=appearanceInfluences(result,cusp,sub);
  const text=influences.length?influences.map(({planet,aspect})=>{
    const name=planetLabel(planet.name,english);
    if(aspect===0)return english?`${name} is conjunct`:`${name} ပူးယှဉ်`;
    if(aspect===7)return english?`${name} opposition`:`${name} သမသတ်မြင်`;
    return english?`${name} special ${aspect}th-house aspect`:`${name} ${mm(aspect)} တန့်အထူးမြင်`;
  }).join(english?', ':'၊ '):(english?'none':'မတွေ့ပါ');
  return english
    ? `The first-cusp sub lord is ${planetLabel(cusp.lords.subLord,true)}, placed in zodiac sign ${sign(sub.longitude)+1}. Its star lord is ${planetLabel(sub.lords.starLord,true)}. Eastern influences to the sub lord: ${text}.`
    : `လဂ်ဘာဝသန္ဓိဘုတ္တိနက္ခတ်သခင်ဂြိုဟ်ဟာ ${cusp.lords.subLord} ဖြစ်ပြီး ${SIGN_MM[sign(sub.longitude)]}ရာသီမှာ ရပ်တည်နေပါတယ်။ ၎င်းရဲ့နက္ခတ်သခင်မှာ ${sub.lords.starLord} ဖြစ်ပါတယ်။ ဘုတ္တိနက္ခတ်သခင်အပေါ် အမြင်အယှဉ်များမှာ ${text} ဖြစ်ပါတယ်။`;
}

export function iosPrediction(id, verdict, english, current, result, item) {
  const t = IOS_TEXT;
  switch (id) {
    case 'appearance': return appearanceCopy(result,english);
    case 'lifeSuccess': {
      const sub = result.planets.find(p => p.name === result.cusps[0].lords.subLord);
      const star = result.planets.find(p => p.name === sub?.lords.starLord);
      const sign = Math.floor((((star?.longitude ?? 0) % 360) + 360) % 360 / 30);
      return (english ? IOS_LIFE_EN : IOS_LIFE_MM)[sign];
    }
    case 'longevity': return t.longevity[verdict === 'strong' ? (english ? 6 : 9) : verdict === 'weak' ? (english ? 8 : 11) : (english ? 7 : 10)];
    case 'health': return t.health[verdict === 'strong' ? (english ? 11 : 12) : verdict === 'weak' ? (english ? 13 : 14) : (english ? 15 : 16)];
    case 'wealth': return t.wealth[verdict === 'strong' ? (english ? 2 : 10) : verdict === 'weak' ? (english ? 6 : 14) : (english ? 4 : 12)];
    case 'career': case 'careerChange': return t.topics[verdict === 'strong' ? (english ? 0 : 3) : verdict === 'weak' ? (english ? 2 : 5) : (english ? 1 : 4)];
    case 'property': return t.property[verdict === 'strong' ? (english ? 2 : 3) : verdict === 'weak' ? (english ? 8 : 9) : (english ? 4 : 5)];
    case 'vehicle': return t.vehicle[verdict === 'strong' ? (english ? 0 : 1) : verdict === 'weak' ? (english ? 6 : 7) : (english ? 4 : 5)];
    case 'education': return t.education[verdict === 'strong' ? (english ? 68 : 69) : verdict === 'weak' ? (english ? 72 : 73) : (english ? 70 : 71)];
    case 'marriage': return t.marriage[verdict === 'strong' ? (english ? 1 : 17) : verdict === 'weak' ? (english ? 3 : 19) : (english ? 2 : 18)];
    case 'children': return t.topics[verdict === 'strong' ? (english ? 6 : 7) : verdict === 'weak' ? (english ? 10 : 11) : (english ? 8 : 9)];
    case 'foreignTravel': return t.foreign[verdict === 'strong' ? (english ? 0 : 1) : verdict === 'weak' ? (english ? 6 : 7) : (english ? 4 : 5)];
    case 'lumpSum': return t.lump[verdict === 'weak' ? (english ? 25 : 29) : (english ? 26 : 30)];
    case 'healthPeriods': return t.health[english ? 56 : 57];
    case 'propertySale': return pick(verdict === 'strong' ? [
      'The 4th-cusp chain favours selling or changing residence more than straightforward acquisition. Check title documents, price and the practical moving plan.',
      'အိမ်အသစ်ဝယ်ယူမှုထက် လက်ရှိအိမ်ရောင်းချခြင်း ဒါမှမဟုတ် နေရာပြောင်းခြင်းဘက် ပိုအားသာနိုင်ပါတယ်ခင်ဗျာ။ အရောင်းအဝယ်ဈေးနှုန်း၊ ပိုင်ဆိုင်မှုစာရွက်စာတမ်းနဲ့ ပြောင်းရွှေ့မယ့်အစီအစဉ်ကို သေချာစစ်ပါ။'
    ] : [
      'The 4th-cusp chain supports establishing or retaining a home. A sale or relocation should still be considered against the price and practical circumstances.',
      'နေအိမ်ကို ဆက်လက်ပိုင်ဆိုင်ပြီး တည်ငြိမ်စွာနေထိုင်နိုင်မယ့်ဘက် ပိုအားသာပါတယ်ခင်ဗျာ။ ရောင်းချမလား၊ နေရာပြောင်းမလားဆိုတာကိုတော့ ရရှိမယ့်ဈေးနှုန်းနဲ့ လက်တွေ့အခြေအနေပေါ်မူတည်ပြီး ဆုံးဖြတ်ပါ။'
    ], english);
    case 'accident': return pick(byVerdict(verdict,
      ['The chart does not strongly repeat an accident warning. Use ordinary care when travelling, driving or handling sharp tools. Surgery cannot be predicted from this reading alone.', 'မတော်တဆထိခိုက်မှုကို ထူးထူးခြားခြား သတိပေးနေတဲ့အခြေအနေ မတွေ့ရပါဘူးခင်ဗျာ။ ခရီးသွားတာ၊ ကားမောင်းတာနဲ့ ချွန်ထက်တဲ့ပစ္စည်းတွေ ကိုင်တွယ်တာမှာ ပုံမှန်အတိုင်း သတိထားပါ။ ဒီအဟောတစ်ခုတည်းနဲ့ ခွဲစိတ်ကုသရမယ်လို့ မဆုံးဖြတ်နိုင်ပါဘူး။'],
      ['Some periods call for extra care with travel, driving, sharp tools, heat and strenuous work. An injury or operation is possible, but this reading does not establish that either will happen. If treatment is needed, follow medical advice.', 'တချို့အချိန်တွေမှာ ခရီးသွားတာ၊ ကားမောင်းတာ၊ ချွန်ထက်တဲ့ပစ္စည်းတွေ ကိုင်တွယ်တာနဲ့ ကိုယ်အားသုံးအလုပ်တွေမှာ ပိုသတိထားသင့်ပါတယ်ခင်ဗျာ။ ထိခိုက်ဒဏ်ရာရခြင်း ဒါမှမဟုတ် ခွဲစိတ်ကုသမှုလိုလာခြင်း ဖြစ်နိုင်ပေမယ့် မဖြစ်မနေကြုံမယ်လို့ ဆိုလိုတာမဟုတ်ပါဘူး။ ကျန်းမာရေးပြဿနာရှိရင် ဆရာဝန်ရဲ့အကြံပြုချက်ကို လိုက်နာပါ။'],
      ['Be more careful with travel, driving, sharp tools, heat and strenuous work, especially when tired or rushed. This is a caution about possible injury, not a prediction that an accident or operation must occur. A doctor should decide whether surgery is needed.', 'အထူးသဖြင့် ပင်ပန်းနေချိန်၊ အလျင်လိုနေချိန်မှာ ခရီးသွားတာ၊ ကားမောင်းတာ၊ ချွန်ထက်တဲ့ပစ္စည်းနဲ့ မီးအပူကို ကိုင်တွယ်တာ၊ ကိုယ်အားသုံးအလုပ်လုပ်တာတွေမှာ ပိုသတိထားသင့်ပါတယ်ခင်ဗျာ။ ဒါဟာ ထိခိုက်ဒဏ်ရာကို ကြိုတင်ကာကွယ်ဖို့ သတိပေးချက်ဖြစ်ပြီး မတော်တဆမှု သို့မဟုတ် ခွဲစိတ်ကုသမှု မဖြစ်မနေကြုံမယ်လို့ မဆိုလိုပါဘူး။ ခွဲစိတ်ကုသဖို့ လိုမလိုကိုတော့ ဆရာဝန်က ဆုံးဖြတ်ပေးရပါမယ်။']
    ), english);
    case 'birthRectification': return pick([
      'Open the birth-time rectification form and enter dated events to calculate a ranked shortlist. No exact time can be inferred from the natal chart alone.',
      'မွေးချိန်မှန်ရှာခြင်းဖောင်တွင် ဖြစ်ရပ်ရက်စွဲများထည့်ပြီး ကိုက်ညီသောအချိန်များကို အဆင့်လိုက်တွက်စစ်ပါ။ မူလဇာတာတစ်ခုတည်းမှ မွေးချိန်အတိအကျ မသတ်မှတ်နိုင်ပါ။'
    ], english);
    case 'gemstone': {
      const gem = english
        ? current.match(/selection is ([^.]+)\./)?.[1]
        : current.match(/ဇာတာရှင်အတွက် ([^ ]+) ကို/)?.[1];
      return gem ? pick([
        `For this chart, choose ${gem} as the best available comparative gemstone. This fallback is an AstroK chart-comparison choice, not a strict KP cusp qualification.`,
        `ဒီဇာတာအတွက် ရွေးချယ်နိုင်တဲ့ ကျောက်တွေကို နှိုင်းယှဉ်ကြည့်ရာ ${gem}က အသင့်တော်ဆုံးဖြစ်လို့ ရွေးပေးပါတယ်ခင်ဗျာ။ ကျောက်ဝတ်ရုံနဲ့ ကံကြမ္မာပြောင်းလဲမယ်လို့တော့ အာမခံမထားပါဘူး။`
      ], english) : current;
    }
    case 'natalLottery': {
      const promised = english ? current.startsWith('The chart supports') : current.startsWith('ထီဆုလို ကံစမ်းငွေရနိုင်');
      if (!promised) return t.lottery[english ? 40 : 43];
      const intro = item.periods?.length
        ? t.lottery[english ? 42 : 45].replace('\\(tierText)', t.lottery[english ? 33 : 34])
        : t.lottery[english ? 41 : 44];
      const match = english
        ? current.match(/First-choice digit: (\d); Myanmar letter: ([^.]+)\./)
        : current.match(/ဦးစားပေးနံပါတ် ([၀-၉])၊ အက္ခရာ ([^ ]+)/);
      if (!match) return intro;
      const digit = match[1], letter = match[2];
      return intro + t.lottery[english ? 38 : 39]
        .replace('\\(primaryDigit)', digit)
        .replace('\\(primaryLetter)', letter)
        .replace('\\(digits)', digit)
        .replace('\\(letters)', letter);
    }
    case 'debt': {
      const localDate = stamp => {
        const d = new Date(stamp + Number(result.profile.tz) * 3600000);
        return `${String(d.getUTCDate()).padStart(2, '0')}.${String(d.getUTCMonth() + 1).padStart(2, '0')}.${d.getUTCFullYear()}`;
      };
      const dates = periods => periods.map(p => `${localDate(p.start)}${english ? ' to ' : ' မှ '}${localDate(p.end)}${english ? '' : ' အထိ'}`).join(english ? ', ' : '၊ ');
      const risk = item.periods.filter(p => p.kind === 'risk');
      const repay = item.periods.filter(p => p.kind === 'repay');
      if (!risk.length) return '';
      let prediction = pick([
        `Periods to watch for debt: ${dates(risk)}. Expenses or borrowing can rise during these periods. Whatever the reason, avoiding debt where possible is usually the more peaceful choice.`,
        `အကြွေးတင်နိုင်လို့ သတိထားသင့်တဲ့ကာလတွေက ${dates(risk)} တို့ဖြစ်ပါတယ်ခင်ဗျာ။ ဒီကာလတွေမှာ အသုံးစရိတ်ကြောင့် အကြွေးတင်တာမျိုးဖြစ်တတ်လို့ ပိုသတိထားပေးပါ။ ဘယ်အကြောင်းကိစ္စကြောင့်ပဲဖြစ်ဖြစ် အကြွေးမထားနိုင်တာက စိတ်ချမ်းသာရာ ပိုရပါတယ်ခင်ဗျာ။`
      ], english);
      if (repay.length) prediction += pick([
        `\n\nHowever, income and gains indicate an ability to repay debt. A more supportive repayment period follows: ${dates(repay)}. With actual income and a manageable repayment plan, the debt can be reduced during these periods; there is no need for undue worry.`,
        `\n\nသို့သော် ဇာတာရှင်အနေနဲ့ ဝင်ငွေနဲ့ အကျိုးအမြတ်ပေါ်မူတည်ပြီး အကြွေးကို ပြန်လည်ဆပ်နိုင်စွမ်းရှိပါတယ်ခင်ဗျာ။ အကြွေးဖိအားကာလနောက်ပိုင်း ပြန်လည်ဆပ်နိုင်ဖို့ အားကောင်းတဲ့ကာလတွေက ${dates(repay)} တို့ဖြစ်ပါတယ်ခင်ဗျာ။ ဒီကာလတွေမှာ ဝင်ငွေနဲ့ကိုက်ညီတဲ့အစီအစဉ်နဲ့ အကြွေးကို ပြန်လည်ဆပ်နိုင်တဲ့အခြေအနေရှိလို့ အလွန်အကျွံစိတ်ပူနေစရာ မလိုပါဘူးခင်ဗျာ။`
      ], english);
      else prediction += pick([
        '\n\nA reliable ability to clear a new debt is not clear enough here. Check actual income and repayments before borrowing.',
        '\n\nလက်ရှိဇာတာအရ အကြွေးသစ်ကို ပြန်ဆပ်နိုင်စွမ်း သိသိသာသာမပြတ်သားသေးပါဘူးခင်ဗျာ။ အကြွေးမယူခင် လက်တွေ့ဝင်ငွေနဲ့ လစဉ်ပြန်ဆပ်ရမယ့်ငွေကို သေချာချိန်ဆပေးပါ။'
      ], english);
      return prediction;
    }
    default: return current;
  }
}
