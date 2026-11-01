import { planetLabel } from './locale.js';

// Port of KPReadingEngine.androidOwnershipReading(.property/.vehicle) and its iOS prose.
export function iosOwnershipReading(result, profiles, isEnglish, category='property') {
  const cusp = result.cusps.find(c => c.number === 4);
  const profile = name => profiles.find(p => p.planet.name === name);
  const sub = profile(cusp?.lords.subLord), star = profile(cusp?.lords.starLord), sign = profile(cusp?.lords.signLord);
  if (!cusp || !sub || !star || !sign) return {
    analysis: isEnglish ? 'The fourth-cusp data is incomplete.' : '၄ တန့်ဘာဝသန္ဓိအချက်အလက် မပြည့်စုံသေးပါ။',
    prediction: isEnglish ? 'Recalculate the chart with complete birth data.' : 'မွေးဖွားမှုအချက်အလက်ပြည့်စုံစွာဖြင့် ဇာတာကို ပြန်တွက်ပါ။'
  };
  const strength = (p,house) => { const i=p?.levels.findIndex(houses=>houses.includes(house))??-1;return i<0?0:Math.max(1,4-i); };
  const has = (p,house) => strength(p,house)>0;
  const pattern = (p,houses) => houses.every(h=>has(p,h));
  const anyPattern = houses => profiles.some(p=>pattern(p,houses));
  const weighted = (p,weights) => [2,4,11].reduce((sum,h,i)=>sum+(has(p,h)?weights[i]:0),0);
  const subScore=weighted(sub,[10,15,10]),starScore=weighted(star,[5,10,5]),signScore=weighted(sign,[3,4,3]);
  let cluster=0;
  for (const p of profiles) {
    const second=has(p,2),fourth=has(p,4),eleventh=has(p,11);
    cluster+=second&&fourth&&eleventh?5:fourth&&(second||eleventh)?3:fourth?1:0;
    if (cluster>=20) {cluster=20;break;}
  }
  const mars=profiles.find(p=>p.planet.index===2),venus=profiles.find(p=>p.planet.index===5);
  const marsSupport=has(mars,4)&&(has(mars,2)||has(mars,11));
  const venusSupport=has(venus,4)&&has(venus,11);
  const repeated=profiles.filter(p=>has(p,4)&&(has(p,2)||has(p,11))).length;
  const supportScore=(marsSupport?5:0)+(venusSupport?5:0)+(repeated>=2?5:repeated===1?3:0);
  const pressure=[3,8,12].filter(h=>Math.max(strength(sub,h),strength(star,h),strength(sign,h))>=2);
  const penalty=pressure.length*5;
  const score=Math.min(100,Math.max(0,subScore+starScore+signScore+cluster+supportScore-penalty));
  const ownFunds=anyPattern([2,4,11])||pattern(sub,[2,4,11]);
  const financing=anyPattern([4,6,11])||pattern(sub,[4,6,11]);
  const inheritanceOrShared=anyPattern([4,8,11])||pattern(sub,[4,8,11]);
  const expenditureOrRelocation=anyPattern([4,11,12])||pattern(sub,[4,11,12]);
  const mm=n=>String(n).replace(/[0-9]/g,d=>'၀၁၂၃၄၅၆၇၈၉'[Number(d)]);
  const houseList=(p,en)=>{const houses=[...new Set(p.levels.flat())].sort((a,b)=>a-b);return houses.length?houses.map(h=>en?String(h):mm(h)).join(', '):en?'none':'မတွေ့ပါ';};
  const pressureList=pressure.length?pressure.map(h=>isEnglish?String(h):mm(h)).join(', '):isEnglish?'none':'မတွေ့ပါ';
  let analysis;
  if (isEnglish) {
    analysis=`Primary KP judgement\nThe 4th-cusp Sub Lord is ${planetLabel(cusp.lords.subLord,true)} and signifies houses ${houseList(sub,true)}.`;
    analysis+=`\nThe 4th-cusp Star Lord is ${planetLabel(cusp.lords.starLord,true)} and signifies houses ${houseList(star,true)}.`;
    analysis+=`\nThe 4th-house Sign Lord is ${planetLabel(cusp.lords.signLord,true)} and signifies houses ${houseList(sign,true)}.`;
    analysis+=`\n\n100-point ownership assessment\n- 4th-cusp Sub Lord - ${subScore}/35\n- 4th-cusp Star Lord - ${starScore}/20\n- 4th-house Sign Lord - ${signScore}/10\n- 2-4-11 significator group - ${cluster}/20\n- Supporting factors - ${supportScore}/15\nPressure penalty: -${penalty}.\nFinal ownership score: ${score}/100.`;
    if(pressure.length)analysis+=`\n\nPressure houses\nStrong 3/8/12 links appear through houses ${pressureList}. They modify the route of ownership rather than automatically denying it.`;
    analysis+='\n\nMethod note: this 100-point scale is an AstroK analytical training framework based on KP significators; it is not a fixed official score printed in the classical KP texts.';
  } else {
    analysis=`အဓိက KP သုံးသပ်ချက်\n၄ တန့်ဘာဝသန္ဓိဘုတ္တိနက္ခတ်သခင်ဂြိုဟ်ဟာ ${cusp.lords.subLord} ဖြစ်ပြီး ${houseList(sub,false)} တန့်ဘာဝတွေကို အကျိုးဆောင်ထားပါတယ်။`;
    analysis+=`\n၄ တန့်ဘာဝသန္ဓိကျရောက်ရာ နက္ခတ်သခင်ဂြိုဟ်ဟာ ${cusp.lords.starLord} ဖြစ်ပြီး ${houseList(star,false)} တန့်ဘာဝတွေကို အကျိုးဆောင်ထားပါတယ်။`;
    analysis+=`\n၄ တန့်ဘာဝသခင်ဂြိုဟ်ဟာ ${cusp.lords.signLord} ဖြစ်ပြီး ${houseList(sign,false)} တန့်ဘာဝတွေကို အကျိုးဆောင်ထားပါတယ်။`;
    analysis+=`\n\nပိုင်ဆိုင်မှုအမှတ် ၁၀၀ သုံးသပ်ချက်\n- ၄ တန့် ဘာဝသန္ဓိဘုတ္တိနက္ခတ်သခင် - ${mm(subScore)}/${mm(35)}\n- ၄ တန့် နက္ခတ်သခင် - ${mm(starScore)}/${mm(20)}\n- ၄ တန့် ဘာဝသခင် - ${mm(signScore)}/${mm(10)}\n- ၂-၄-၁၁ အကျိုးဆောင်ဂြိုဟ်အစု - ${mm(cluster)}/${mm(20)}\n- သဘာဝကာရကနဲ့ ထပ်ဆင့်အထောက်အပံ့ - ${mm(supportScore)}/${mm(15)}\n၃-၈-၁၂ ဖိအားအမှတ်နုတ်ခြင်း -${mm(penalty)} မှတ်။\nနောက်ဆုံးပိုင်ဆိုင်မှုအင်အား - ${mm(score)}/${mm(100)}။`;
    if(pressure.length)analysis+=`\n\nအတားအဆီးဘက်မှ သုံးသပ်ချက်\nအဓိကဆုံးဖြတ်သူဂြိုဟ်တွေမှာ ${pressureList} တန့်ဘာဝဖိအားတွေ ပါဝင်နေပါတယ်။ ဒီအချက်တွေက ပိုင်ဆိုင်မှုကို လုံးဝပယ်ဖျက်တာမဟုတ်ဘဲ ရရှိပုံ၊ နှောင့်နှေးမှုနဲ့ ကုန်ကျစရိတ်ကို ပြောင်းလဲစေနိုင်ပါတယ်။`;
    analysis+='\n\nနည်းစနစ်မှတ်ချက်။ ။ ဒီအမှတ် ၁၀၀ စနစ်ဟာ KP အကျိုးဆောင်ဘာဝစည်းမျဉ်းတွေကို အခြေခံပြီး လေ့လာသုံးသပ်ရလွယ်အောင် ဖွဲ့စည်းထားတဲ့ AstroK analytical framework ဖြစ်ပါတယ်။ ရိုးရာ KP ကျမ်းမှာ တရားဝင်သတ်မှတ်ထားတဲ့ ပုံသေအမှတ်စနစ်မဟုတ်ပါဘူး။';
  }
  const homeOutlook=isEnglish ? score>=85?'You have very strong potential to own a home or land. Over time, more than one property may also become possible.':score>=70?'You have good potential to own a home or land and can establish a stable personal residence.':score>=55?'Owning a home is possible, although it is more likely to develop gradually through savings, family assistance or financing.':score>=40?'Home ownership remains possible, but it may take longer and require more than one attempt before becoming established.':'Home ownership potential is limited and may remain dependent on family property, shared ownership or long-term savings.'
    : score>=85?'ဇာတာရှင်ဟာ ကိုယ်ပိုင်နေအိမ် ဒါမှမဟုတ် မြေယာပိုင်ဆိုင်နိုင်မယ့် အလားအလာ အလွန်ကောင်းပါတယ်။ အခြေအနေတိုးတက်လာတာနဲ့အမျှ ပိုင်ဆိုင်မှုတစ်ခုထက်ပိုပြီး ရရှိလာနိုင်ပါတယ်။':score>=70?'ဇာတာရှင်ဟာ ကိုယ်ပိုင်နေအိမ် ဒါမှမဟုတ် မြေယာပိုင်ဆိုင်နိုင်ခြေကောင်းပြီး မိမိအတွက် တည်ငြိမ်တဲ့နေထိုင်ရာတစ်ခုကို တည်ဆောက်နိုင်ပါလိမ့်မယ်။':score>=55?'ကိုယ်ပိုင်နေအိမ်ပိုင်ဆိုင်နိုင်ခြေ ရှိပါတယ်။ ပိုင်ဆိုင်မှုက ရုတ်တရက်ရလာတာမျိုးထက် ကိုယ်ပိုင်စုဆောင်းငွေ၊ မိသားစုအကူအညီ ဒါမှမဟုတ် ငွေကြေးအထောက်အပံ့တစ်ခုခုနဲ့ တဖြည်းဖြည်း အကောင်အထည်ပေါ်လာနိုင်ပါတယ်။':score>=40?'ကိုယ်ပိုင်နေအိမ်ရရှိနိုင်ပေမယ့် အချိန်ပိုယူရနိုင်ပြီး တစ်ကြိမ်တည်းနဲ့ အဆင်ပြေတာမျိုးထက် အကြိမ်ကြိမ်ကြိုးစားပြီးမှ ပိုင်ဆိုင်မှုအဖြစ် တည်ငြိမ်လာနိုင်ပါတယ်။':'ကိုယ်ပိုင်နေအိမ်ရရှိနိုင်မှုက အားနည်းတဲ့ဘက်မှာရှိပြီး မိသားစုပိုင်ဆိုင်မှု၊ ပူးတွဲပိုင်ဆိုင်မှု ဒါမှမဟုတ် ရေရှည်စုဆောင်းမှုကနေ အကောင်အထည်ပေါ်လာနိုင်ပါတယ်။';
  const vehicleOutlook=isEnglish
    ? score>=70&&venusSupport?'You have strong potential to own a personal vehicle and may later upgrade to a more comfortable or valuable vehicle.':score>=55?'You can own a personal vehicle. The first vehicle may be chosen mainly for practical use and affordability.':score>=40?'Vehicle ownership is possible, but it may come gradually through instalments, family assistance or a shared arrangement.':'Personal vehicle ownership potential is limited, so access to a family, work or shared vehicle may appear before sole ownership.'
    : score>=70&&venusSupport?'ဇာတာရှင်ဟာ ကိုယ်ပိုင်ယာဉ်ကားပိုင်ဆိုင်နိုင်မယ့် အလားအလာကောင်းပါတယ်။ နောက်ပိုင်းမှာ ပိုမိုသက်တောင့်သက်သာရှိပြီး တန်ဖိုးပိုမြင့်တဲ့ယာဉ်ကားကို ပြောင်းလဲပိုင်ဆိုင်နိုင်ခြေလည်း ရှိပါတယ်။':score>=55?'ဇာတာရှင်ဟာ ကိုယ်ပိုင်ယာဉ်ကား ရရှိပိုင်ဆိုင်နိုင်ပါတယ်။ ပထမဆုံးပိုင်ဆိုင်ရမယ့်ယာဉ်က လက်တွေ့အသုံးလိုအပ်ချက်နဲ့ မိမိတတ်နိုင်တဲ့တန်ဖိုးအပေါ် အဓိကမူတည်နိုင်ပါတယ်။':score>=40?'ယာဉ်ကားပိုင်ဆိုင်နိုင်ခြေ ရှိပေမယ့် အရစ်ကျစနစ်၊ မိသားစုအကူအညီ ဒါမှမဟုတ် ပူးတွဲအသုံးပြုမှုကနေ တဖြည်းဖြည်း အကောင်အထည်ပေါ်လာနိုင်ပါတယ်။':'ကိုယ်ပိုင်ယာဉ်ကားပိုင်ဆိုင်နိုင်မှုက အားနည်းတဲ့ဘက်မှာရှိပြီး ကိုယ်တိုင်သီးသန့်ပိုင်ဆိုင်မှုမတိုင်ခင် မိသားစု၊ အလုပ် ဒါမှမဟုတ် ပူးတွဲယာဉ်ကို အသုံးပြုရတဲ့ပုံစံ အရင်ပေါ်လာနိုင်ပါတယ်။';
  const route=ownFunds?isEnglish?'Personal savings or family capital is the clearest route to ownership.':'ကိုယ်ပိုင်စုဆောင်းငွေ ဒါမှမဟုတ် မိသားစုအရင်းအနှီးကနေ ပိုင်ဆိုင်မှုရရှိလာနိုင်ခြေ ပိုများပါတယ်။':financing?isEnglish?'A loan or instalment arrangement is the clearest route to ownership.':'ချေးငွေ ဒါမှမဟုတ် အရစ်ကျစနစ်နဲ့ ပိုင်ဆိုင်မှုရရှိလာနိုင်ခြေ ပိုများပါတယ်။':inheritanceOrShared?isEnglish?"Inheritance, a spouse's resources or shared ownership is the clearest route.":'အမွေ၊ အိမ်ထောင်ဖက်ရဲ့အရင်းအနှီး ဒါမှမဟုတ် ပူးတွဲပိုင်ဆိုင်မှုကနေ ရရှိလာနိုင်ခြေ ပိုများပါတယ်။':expenditureOrRelocation?isEnglish?'Ownership is more likely after a major expenditure or a change of residence.':'ငွေကြေးအများအပြားအသုံးပြုပြီးမှ ဒါမှမဟုတ် နေရာပြောင်းရွှေ့ပြီးမှ ပိုင်ဆိုင်မှုရရှိလာနိုင်ခြေ ပိုများပါတယ်။':isEnglish?'Ownership is more likely to develop gradually from a combination of savings and available support.':'ကိုယ်ပိုင်စုဆောင်းမှုနဲ့ ရရှိလာမယ့်အကူအညီတွေ ပေါင်းစပ်ပြီး တဖြည်းဖြည်း ပိုင်ဆိုင်လာနိုင်ပါတယ်။';
  const vehicle=category==='vehicle';
  const prediction=(vehicle?(isEnglish?'Vehicle ownership outlook\n\n':'ယာဉ်ကားပိုင်ဆိုင်မှုအဟော\n\n'):(isEnglish?'Home ownership outlook\n\n':'နေအိမ်ပိုင်ဆိုင်မှုအဟော\n\n'))+(vehicle?vehicleOutlook:homeOutlook)+'\n\n'+(isEnglish?'Likely route to ownership\n\n':'ပိုင်ဆိုင်မှုရရှိလာနိုင်မယ့်ပုံစံ\n\n')+route;
  return {prediction,analysis,score};
}
