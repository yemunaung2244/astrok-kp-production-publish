import { planetLabel } from './locale.js';

// Port of KPReadingEngine.make(.children), including Android topic copy used by iOS.
export function iosChildrenReading(result, profiles, isEnglish) {
  const cusp = number => result.cusps.find(c => c.number === number);
  const profile = number => profiles.find(p => p.planet.name === cusp(number)?.lords.subLord);
  const primary = profile(5), confirming = [11, 9].map(profile).filter(Boolean);
  const strength = (p, house) => {
    const level = p?.levels.findIndex(houses => houses.includes(house)) ?? -1;
    return level < 0 ? 0 : Math.max(1, 4 - level);
  };
  const strengths = Array.from({ length: 13 }, (_, house) =>
    strength(primary, house) * 2 + confirming.reduce((total, p) => total + strength(p, house), 0));
  const primaryHouses = [5, 11], supportiveHouses = [1, 2, 9], obstructingHouses = [6, 8, 12];
  const found = houses => houses.filter(house => strengths[house] > 0);
  const total = houses => houses.reduce((sum, house) => sum + strengths[house], 0);
  const primaryScore = total(primaryHouses), supportiveScore = total(supportiveHouses), obstructingScore = total(obstructingHouses);
  const support = primaryScore * 2 + supportiveScore;
  const verdict = primaryScore === 0 ? 'weak' : support >= obstructingScore + 3 ? 'strong' : obstructingScore >= support + 3 ? 'weak' : 'mixed';
  const predictions = {
    strong: ['The 5th and 11th houses give clear support for children and family happiness. The result still depends on health, circumstances and responsible planning.', 'သားသမီးရနိုင်ပြီး မိသားစုဘဝမှာ ဝမ်းမြောက်စရာတွေ ရှိလာနိုင်ပါတယ်ခင်ဗျာ။ လက်တွေ့အခြေအနေနဲ့ ကျန်းမာရေးကိုလည်း ဂရုစိုက်ပြီး စီစဉ်သင့်ပါတယ်။'],
    mixed: ['Children are possible, but delay, worry or changing family circumstances may need patience and practical care.', 'သားသမီးရနိုင်တဲ့အခွင့်အလမ်းရှိပေမယ့် နှောင့်နှေးတာ၊ စိုးရိမ်ရတာ ဒါမှမဟုတ် မိသားစုအခြေအနေပြောင်းတာတွေကြောင့် စိတ်ရှည်ပြီး လက်တွေ့ကျကျ စီမံဖို့လိုပါတယ်။'],
    weak: ['The children promise is weak or obstructed. This alone cannot deny children; health and real-life circumstances should also be considered.', 'သားသမီးအကျိုးဆိုင်ရာ မူလကံအင်အားနည်းနေပါတယ်။ ဒီအချက်တစ်ခုတည်းနဲ့ သားသမီးမရဘူးလို့ မဆုံးဖြတ်ဘဲ ကျန်းမာရေးနဲ့ လက်တွေ့အခြေအနေကိုပါ စစ်ဆေးသင့်ပါတယ်။']
  };
  const prediction = predictions[verdict][isEnglish ? 0 : 1];
  const mm = number => String(number).replace(/[0-9]/g, d => '၀၁၂၃၄၅၆၇၈၉'[Number(d)]);
  const list = houses => houses.length ? houses.map(h => isEnglish ? String(h) : mm(h)).join(', ') : isEnglish ? 'none' : 'မတွေ့ပါ';
  const ordinal = number => number === 1 ? '1st' : number === 2 ? '2nd' : number === 3 ? '3rd' : `${number}th`;
  const label = number => isEnglish ? `${ordinal(number)} cusp` : `${mm(number)} တန့်`;
  const verdictText = isEnglish ? {
    strong: 'strongly promised', mixed: 'promised with mixed support and delay factors', weak: 'not strongly promised by the principal cusps'
  }[verdict] : {
    strong: 'မူလကံဇာတာအားကောင်းပါတယ်', mixed: 'အခွင့်အလမ်းရှိပေမယ့် အားပေးချက်နဲ့ နှောင့်နှေးစေတဲ့အချက်တွေ ရောနေပါတယ်', weak: 'အဓိကဘာဝသန္ဓိတွေအရ မူလကံဇာတာအားနည်းနေပါတယ်'
  }[verdict];
  const supporting = found([...primaryHouses, ...supportiveHouses]);
  const obstructing = found(obstructingHouses);
  const confirmation = isEnglish
    ? `The Sub Lords of ${label(11)} and ${label(9)} provide confirmation.`
    : `${label(11)}နဲ့ ${label(9)}တို့ကို ထပ်မံအတည်ပြုထားပါတယ်။`;
  const summary = isEnglish
    ? `Foundational natal promise\nThe ${label(5)} Sub Lord is the primary judge. ${confirmation} The chart shows that children and family happiness is ${verdictText}. Supporting houses: ${list(supporting)}. Obstructing houses: ${list(obstructing)}.`
    : `မူလကံအခြေအနေ\n${label(5)}ရဲ့ ဘာဝသန္ဓိဘုတ္တိနက္ခတ်သခင်ဂြိုဟ်ကို အဓိကထားပြီး ${confirmation} သားသမီးနဲ့ မိသားစုအကျိုးဆိုင်ရာ ${verdictText}။ အားပေးနေတဲ့ဘာဝတွေက ${list(supporting)} ဖြစ်ပြီး၊ နှောင့်နှေးစေတဲ့ဘာဝတွေက ${list(obstructing)} ဖြစ်ပါတယ်။`;
  const lines = [5, 11, 9].map(number => {
    const c = cusp(number), p = profile(number);
    if (!c || !p) return null;
    const houses = [...new Set(p.levels.flat())].sort((a, b) => a - b);
    const representatives = [...new Set(p.representatives.map(item => isEnglish ? planetLabel(item.name, true) : item.name))];
    let line = isEnglish
      ? `The ${label(number)} Sub Lord is ${planetLabel(c.lords.subLord, true)}, it is placed in the Star of ${planetLabel(p.planet.lords.starLord, true)}, and it signifies houses ${list(houses)}.`
      : `${label(number)}ဘာဝသန္ဓိဘုတ္တိနက္ခတ်သခင်ဂြိုဟ်ဟာ ${c.lords.subLord} ဖြစ်ပြီး ${p.planet.lords.starLord}နက္ခတ်ကို စီးထားကာ ${list(houses)} တန့်ဘာဝတွေကို အကျိုးဆောင်ထားပါတယ်။`;
    if (representatives.length) line += isEnglish
      ? ` Under the Rahu/Ketu agency rule, houses delegated through ${representatives.join(', ')} are included as well.`
      : ` ရာဟု/ကိတ်ကိုယ်စားလှယ်စည်းမျဉ်းအရ ${representatives.join('၊ ')} တို့ရဲ့ဘာဝတွေကိုလည်း ကိုယ်စားလှယ်ဘာဝအဖြစ် ထည့်တွက်ထားပါတယ်။`;
    return line;
  }).filter(Boolean).join('\n');
  return { prediction, analysis: `${summary}\n\n${lines}` };
}
