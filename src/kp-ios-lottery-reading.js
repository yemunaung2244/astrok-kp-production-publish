import { dashaTimeline } from './kp-dasha.js';
import { planetLabel } from './locale.js';

// Port of KPNatalLotteryReadingEngine.make in the iOS app.
const PLANET_DIGITS = [0, 2, 3, 4, 5, 6, 7, 8, 9];
const MYANMAR_DIGITS = ['၀', '၁', '၂', '၃', '၄', '၅', '၆', '၇', '၈', '၉'];
const LETTER_GROUPS = ['က၊ ခ၊ ဂ', 'စ၊ ဆ၊ ဇ', 'ည၊ ဋ၊ ဌ', 'တ၊ ထ၊ ဒ', 'န၊ ပ၊ ဖ', 'ဗ၊ ဘ၊ မ', 'ယ၊ ရ၊ လ', 'ဝ၊ သ၊ ဟ'];

export function iosNatalLotteryReading(result, profiles, isEnglish) {
  const cusp = number => profiles.find(p => p.planet.name === result.cusps.find(c => c.number === number)?.lords.subLord);
  const chance = cusp(5), money = cusp(2), windfall = cusp(8), gain = cusp(11);
  if (!chance || !money || !windfall || !gain) {
    const message = isEnglish ? 'The natal chart is incomplete. Please calculate it again.' : 'မူလဇာတာအချက်အလက် မပြည့်စုံသေးပါ။ ဇာတာကို ပြန်တွက်ပေးပါ။';
    return { prediction: message, analysis: message };
  }
  const strength = (profile, house) => {
    const index = profile.levels.slice(0, 4).findIndex(houses => houses.includes(house));
    return index < 0 ? 0 : 4 - index;
  };
  const positive = profile => [2, 5, 6, 8, 11].reduce((sum,house) => sum + strength(profile,house), 0);
  const support = positive(chance)*3 + positive(money) + positive(windfall) + positive(gain)*2;
  const loss = strength(chance,12)*3 + strength(money,12) + strength(windfall,12) + strength(gain,12);
  const basic = strength(chance,5)>0 && strength(chance,11)>0 && (strength(chance,2)>0 || strength(money,11)>0);
  const tier = !basic || support<=loss ? 0 : strength(chance,8)>=2 && strength(gain,11)>=2 && support>=loss+24 ? 3 : strength(chance,8)>0 && support>=loss+16 ? 2 : 1;

  const planetIndex = name => result.planets.find(p => p.name === name || planetLabel(p.name,true).toLowerCase() === String(name).toLowerCase())?.index;
  const digitScores = Array(10).fill(0);
  const addDigit = (index, weight) => { if (Number.isInteger(index) && index>=0 && index<PLANET_DIGITS.length) digitScores[PLANET_DIGITS[index]] += weight; };
  addDigit(chance.planet.index,8);
  addDigit(planetIndex(chance.planet.lords.starLord),5);
  addDigit(money.planet.index,5);
  addDigit(windfall.planet.index,4);
  addDigit(gain.planet.index,7);
  addDigit(planetIndex(gain.planet.lords.starLord),4);
  const rankedDigits = digitScores.map((score,digit)=>({score,digit})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score || a.digit-b.digit).map(x=>x.digit);
  const primaryDigit = MYANMAR_DIGITS[rankedDigits[0]];
  const digits = rankedDigits.slice(0,3).map(d=>MYANMAR_DIGITS[d]).join('၊ ');
  const letterSeed = chance.planet.index*7 + gain.planet.index*3 + money.planet.index;
  const letters = LETTER_GROUPS[((letterSeed%LETTER_GROUPS.length)+LETTER_GROUPS.length)%LETTER_GROUPS.length];
  const primaryLetter = letters.split('၊')[0].trim();

  const now = Date.now(), horizonDate = new Date(now);
  horizonDate.setFullYear(horizonDate.getFullYear()+10);
  const horizon = horizonDate.getTime();
  const periodScore = name => {
    const profile = profiles.find(p => p.planet.name === name);
    return profile ? positive(profile)-strength(profile,12)*3 : -100;
  };
  let best;
  if (tier>0) {
    for (const maha of dashaTimeline(result.planets[1].longitude,result.utc)) {
      if (Date.parse(maha.end)<=now || Date.parse(maha.start)>=horizon) continue;
      const mahaScore=periodScore(maha.lord); if (mahaScore<=0) continue;
      for (const bhukti of maha.children) {
        if (Date.parse(bhukti.end)<=now || Date.parse(bhukti.start)>=horizon) continue;
        const bhuktiScore=periodScore(bhukti.lord); if (bhuktiScore<=0) continue;
        for (const antara of bhukti.children) {
          if (Date.parse(antara.end)<=now || Date.parse(antara.start)>=horizon) continue;
          const antaraScore=periodScore(antara.lord); if (antaraScore<=0) continue;
          const score=mahaScore*4+bhuktiScore*3+antaraScore*2;
          const start=Math.max(Date.parse(antara.start),now),end=Math.min(Date.parse(antara.end),horizon);
          if (!best || score>best.score || score===best.score && start<best.start) best={start,end,score,lords:[maha.lord,bhukti.lord,antara.lord]};
        }
      }
    }
  }
  const tz=Number(result.profile.tz)||0;
  const formatDate=stamp=>{const d=new Date(stamp+Math.round(tz*3600000));return `${d.getUTCDate()}.${d.getUTCMonth()+1}.${d.getUTCFullYear()}`;};
  const timing = best ? isEnglish
    ? `The strongest upcoming Dasha window is ${formatDate(best.start)} to ${formatDate(best.end)} (${best.lords.map(n=>planetLabel(n,true)).join('–')}).`
    : `ထီကံပိုအားကောင်းနိုင်တဲ့ကာလက ${formatDate(best.start)} မှ ${formatDate(best.end)} အတွင်း ဖြစ်ပါတယ်ခင်ဗျာ။`
    : isEnglish ? 'No clearly supportive Dasha–Bhukti–Antara interval appears within the next ten years.' : 'လာမယ့် ၁၀ နှစ်အတွင်း ထီကံအတွက် အထူးအားကောင်းတဲ့ကာလ မတွေ့ရသေးပါဘူးခင်ဗျာ။';
  const tierText = isEnglish ? ['no clear prize promise','small-prize indicators','medium-prize indicators','large-prize indicators'][tier] : ['ထီဆုရကံ ထင်ရှားမနေခြင်း','ဆုသေးရနိုင်ခြေ','ဆုလတ်ရနိုင်ခြေ','ဆုကြီးရနိုင်ခြေ'][tier];
  const selection = tier===0 ? '' : isEnglish
    ? `\n\nPrimary lottery number and letter\nFor this chart, the first-choice number is ${primaryDigit} and the first-choice Myanmar letter is ${primaryLetter}. Other chart-linked digits: ${digits}; letter group: ${letters}. These markers do not predict a random draw or guarantee a prize.`
    : `\n\nရွေးချယ်ထားသော ဂဏန်းနှင့် အက္ခရာ\nဇာတာရှင်အတွက် ဦးစားပေးရွေးထားတဲ့ နံပါတ်က ${primaryDigit}၊ အက္ခရာက ${primaryLetter} ဖြစ်ပါတယ်ခင်ဗျာ။ ဆက်စပ်နံပါတ်များက ${digits} ဖြစ်ပြီး အက္ခရာအုပ်စုက ${letters} ဖြစ်ပါတယ်။ ဒီနံပါတ်နဲ့အက္ခရာတွေက ကျပန်းထီရလဒ်ကို အာမခံတာမဟုတ်ပါဘူးခင်ဗျာ။`;
  const opening = isEnglish
    ? tier===0 ? 'The natal chart does not show a clear lottery-prize promise.' : !best ? 'The chart has lottery-gain indicators, but without a qualifying period this is not a confirmed yes.' : `The natal chart shows some lottery-gain indicators; the strongest tier is ${tierText}.`
    : tier===0 ? 'မူလဇာတာအရ ထီဆုရကံ ထင်ရှားမနေပါဘူးခင်ဗျာ။' : !best ? 'ဇာတာရှင်မှာ ထီဆုရနိုင်တဲ့ အလားအလာရှိပေမယ့် အချိန်ကာလ မထင်ရှားသေးလို့ ထီဆုရမယ်လို့ မသတ်မှတ်နိုင်သေးပါဘူးခင်ဗျာ။' : `ဇာတာရှင်မှာ ထီဆုရနိုင်တဲ့ အလားအလာရှိပြီး ${tierText} ပိုအားကောင်းပါတယ်ခင်ဗျာ။`;
  const prediction = opening + (isEnglish?'\n\nTiming\n':'\n\nအချိန်ကာလ\n') + timing + selection;
  const analysis = isEnglish
    ? `The 5th-cusp sub lord ${planetLabel(chance.planet.name,true)} is tested for houses 2, 5, 6 and 11; the 8th cusp adds unexpected-gain evidence, while the 12th shows loss pressure. The 2nd, 8th and 11th cusp sub lords confirm the pattern. Support ${support}, loss ${loss}. Prize tiers and number/letter tokens are interpretive chart labels, not probabilities.`
    : `၅ တန့် ဘာဝသန္ဓိဘုတ္တိနက္ခတ်သခင် ${chance.planet.name} ကို ၂၊ ၅၊ ၆၊ ၁၁ တန့်ဘာဝများနဲ့ စစ်ပြီး ၈ တန့်ရဲ့ မမျှော်လင့်တဲ့ငွေဝင်မှု၊ ၁၂ တန့်ရဲ့ ဆုံးရှုံးမှုဖိအားကို နှိုင်းယှဉ်ထားပါတယ်။ ၂၊ ၈၊ ၁၁ တန့် ဘာဝသန္ဓိဘုတ္တိနက္ခတ်သခင်များနဲ့ ထပ်မံတိုက်စစ်ရာ အားပေးချက် ${support}၊ ဆုံးရှုံးမှုဖိအား ${loss} ရပါတယ်။ ဆုအရွယ်အစားနဲ့ ဂဏန်းအက္ခရာတွေက ဗေဒင်အရ အညွှန်းသာဖြစ်ပြီး ထီပေါက်နိုင်ခြေရာခိုင်နှုန်း မဟုတ်ပါဘူး။`;
  return {prediction,analysis};
}
