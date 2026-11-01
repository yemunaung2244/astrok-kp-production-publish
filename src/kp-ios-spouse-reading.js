// Port of KPSpouseProfileReadingEngine.make from iOS.
const APPEARANCE=[
  ['a firm and balanced build with a dignified face and clear eyes','ကိုယ်ခန္ဓာကျစ်လျစ်ညီညာပြီး မျက်နှာမှာ ဂုဏ်သိက္ခာရှိကာ မျက်လုံးကြည်လင်တဲ့'],
  ['a softer or fuller build, rounded face and gentle eyes','ကိုယ်ခန္ဓာပြည့်ပြည့်၊ မျက်နှာဝိုင်းဝိုင်းနဲ့ မျက်လုံးအေးတဲ့'],
  ['an active, athletic build with firm features and an alert gaze','ကိုယ်ခန္ဓာသန်မာလှုပ်ရှားတက်ကြွပြီး မျက်နှာအနေအထားပြတ်သားတဲ့'],
  ['a youthful, lean build, oval face and quick expression','နုပျိုသွယ်လျပြီး မျက်နှာဘဲဥပုံနဲ့ လျင်မြန်တဲ့အမူအရာရှိတဲ့'],
  ['a well-proportioned to fuller build, open face and expressive eyes','ကိုယ်ခန္ဓာအချိုးကျ သို့မဟုတ် ပြည့်ပြည့်ရှိပြီး မျက်နှာပွင့်လင်းကာ မျက်လုံးအမူအရာကောင်းတဲ့'],
  ['balanced features, an attractive appearance and a pleasant smile','မျက်နှာနဲ့ ကိုယ်ခန္ဓာအချိုးညီပြီး ဆွဲဆောင်မှုရှိကာ အပြုံးချိုတဲ့'],
  ['a lean or bony build, longer face and deeper-set eyes','ကိုယ်ခန္ဓာသွယ်လျ သို့မဟုတ် အရိုးအဆစ်ပေါ်လွင်ပြီး မျက်နှာရှည်ကာ မျက်လုံးနက်တဲ့'],
  ['a distinctive or unconventional appearance that is easily noticed','သာမန်လူတွေနဲ့ မတူဘဲ မြင်တာနဲ့ မှတ်မိလွယ်တဲ့ ထူးခြားသောရုပ်ရည်ရှိတဲ့'],
  ['a compact, restrained appearance with a quiet and observant gaze','ကိုယ်ခန္ဓာသိပ်မထွားဘဲ သပ်ရပ်ငြိမ်သက်ပြီး အကဲခတ်တတ်တဲ့မျက်လုံးရှိတဲ့']
];
const SIGN_APPEARANCE=[
  ['an energetic and decisive bearing','တက်ကြွပြီး ဆုံးဖြတ်ချက်ပြတ်သားတဲ့ ကိုယ်ဟန်ရှိတဲ့'],
  ['a sturdy frame and pleasant broad features','ကိုယ်ထည်ခိုင်မာပြီး မျက်နှာအနည်းငယ်ကျယ်ကာ ကြည့်ကောင်းတဲ့'],
  ['a taller or slender and agile outline','အရပ်အမောင်းမြင့်ဘက် သို့မဟုတ် သွယ်လျပြီး လျင်မြန်သွက်လက်တဲ့'],
  ['soft and rounded features','မျက်နှာနူးညံ့ဝိုင်းဝိုင်းနဲ့ အမူအရာအေးတဲ့'],
  ['a well-built body and broad, confident face','ကိုယ်ခန္ဓာတောင့်တင်းပြီး မျက်နှာကျယ်ကာ ကိုယ့်ကိုယ်ကို ယုံကြည်မှုရှိတဲ့'],
  ['a neat, lean and refined outline','ကိုယ်ခန္ဓာသွယ်လျသပ်ရပ်ပြီး မျက်နှာဘဲဥပုံဘက်နီးတဲ့'],
  ['an upright, symmetrical and pleasing presentation','ကိုယ်ဟန်တည့်မတ်၊ မျက်နှာအချိုးညီပြီး ကြည့်ကောင်းတဲ့'],
  ['strong shoulders and an intense gaze','ပခုံးအနေအထားခိုင်မာပြီး မျက်လုံးအကြည့်အားကောင်းတဲ့'],
  ['a taller, well-proportioned frame and longer face','အရပ်အမောင်းမြင့်ဘက်၊ ကိုယ်ခန္ဓာအချိုးကျပြီး မျက်နှာအနည်းငယ်ရှည်တဲ့'],
  ['a lean, serious and restrained presentation','ကိုယ်ခန္ဓာသွယ်လျပြီး တည်ငြိမ်လေးနက်တဲ့ ရုပ်သွင်ရှိတဲ့'],
  ['a moderate-to-tall frame with an original look','အရပ်အမောင်းအသင့်အတင့်ကနေ မြင့်ဘက်ရှိပြီး ထူးခြားတဲ့ရုပ်သွင်ရှိတဲ့'],
  ['a softer, rounded and compassionate expression','မျက်နှာဝိုင်းဝိုင်းနူးညံ့ပြီး သနားကြင်နာတတ်တဲ့အမူအရာရှိတဲ့']
];
const TEMPERAMENT=[
  ['leadership, self-respect and independent decisions','ဦးဆောင်လိုမှု၊ ကိုယ့်ဂုဏ်သိက္ခာကို အလေးထားမှုနဲ့ ကိုယ်ပိုင်ဆုံးဖြတ်ချက်ချလိုမှု'],
  ['care, emotional closeness and attachment to family','ဂရုစိုက်တတ်မှု၊ စိတ်ခံစားချက်နီးကပ်လိုမှုနဲ့ မိသားစုကို ခင်တွယ်မှု'],
  ['direct action, courage and quick reactions','ပြတ်သားစွာလုပ်ဆောင်မှု၊ ရဲရင့်မှုနဲ့ တုံ့ပြန်မှုမြန်ခြင်း'],
  ['communication, intelligence and adaptability','ပြောဆိုညှိနှိုင်းတတ်မှု၊ ဉာဏ်မြန်မှုနဲ့ အခြေအနေလိုက်ပြောင်းလဲနိုင်မှု'],
  ['learning, counsel, principle and responsibility','ပညာ၊ အကြံဉာဏ်၊ ကိုယ်ကျင့်တရားနဲ့ တာဝန်ယူလိုမှု'],
  ['affection, sociability and appreciation of beauty','ချစ်ခင်ပြသတတ်မှု၊ လူမှုဆက်ဆံရေးနဲ့ အလှအပကို နှစ်သက်မှု'],
  ['steadiness, patience and a strong sense of duty','တည်ငြိမ်မှု၊ သည်းခံမှုနဲ့ တာဝန်သိစိတ်အားကောင်းမှု'],
  ['an unconventional outlook and willingness to cross familiar boundaries','သာမန်နဲ့မတူတဲ့အမြင်နဲ့ ရင်းနှီးပြီးသားနယ်ပယ်ကို ကျော်လွန်လိုမှု'],
  ['privacy, research and deep reflection','သီးသန့်နေလိုမှု၊ သုတေသနဝါသနာနဲ့ နက်နက်ရှိုင်းရှိုင်းစဉ်းစားမှု']
];
const PROFESSIONS=[
  ['government, administration or leadership','အစိုးရ၊ အုပ်ချုပ်ရေးနဲ့ ဦးဆောင်မှုဆိုင်ရာလုပ်ငန်း'],
  ['care, hospitality, food or public-facing service','စောင့်ရှောက်ရေး၊ Hospitality၊ အစားအသောက်နဲ့ လူထုဝန်ဆောင်မှုလုပ်ငန်း'],
  ['engineering, mechanics, security, sport or surgery','အင်ဂျင်နီယာ၊ စက်မှုပိုင်း၊ လုံခြုံရေး၊ အားကစားနဲ့ ခွဲစိတ်ဆေးပညာဆိုင်ရာလုပ်ငန်း'],
  ['business, accounting, communication, data or technology','စီးပွားရေး၊ စာရင်းကိုင်၊ ဆက်သွယ်ရေး၊ Data နဲ့ နည်းပညာလုပ်ငန်း'],
  ['education, law, finance or advisory work','ပညာရေး၊ ဥပဒေ၊ ဘဏ္ဍာရေးနဲ့ အကြံပေးလုပ်ငန်း'],
  ['design, arts, beauty, media or hospitality','Design၊ အနုပညာ၊ အလှအပ၊ Media နဲ့ Hospitality လုပ်ငန်း'],
  ['construction, industry, administration or long-term technical work','ဆောက်လုပ်ရေး၊ စက်မှု၊ အုပ်ချုပ်ရေးနဲ့ ရေရှည်နည်းပညာလုပ်ငန်း'],
  ['foreign, online, aviation or emerging technology','နိုင်ငံခြား၊ Online၊ လေကြောင်းနဲ့ နည်းပညာသစ်လုပ်ငန်း'],
  ['research, diagnostics, software, spiritual or specialist technical work','သုတေသန၊ စစ်ဆေးရှာဖွေရေး၊ Software၊ ဓမ္မရေးရာနဲ့ အထူးပြုနည်းပညာလုပ်ငန်း']
];
const QUALIFIER={strong:['These qualities are more likely to be expressed constructively inside the marriage.','ဒီစရိုက်တွေကို အိမ်ထောင်ရေးအတွင်း အပြုသဘောနဲ့ အသုံးချနိုင်တဲ့ဘက်က ပိုအားကောင်းပါတယ်ခင်ဗျာ။'],strained:['Under pressure, the same qualities can become stubbornness, withdrawal or sharp disagreement.','ဖိအားများတဲ့အခါ ဒီစရိုက်တွေက ခေါင်းမာခြင်း၊ စိတ်ပိတ်ထားခြင်း ဒါမှမဟုတ် ပြင်းထန်စွာ သဘောထားကွဲလွဲခြင်းဘက်ကို ပြောင်းသွားနိုင်ပါတယ်ခင်ဗျာ။'],other:['The spouse can be warm and cooperative at ease, but becomes reserved or firm under pressure.','ပုံမှန်အချိန်မှာ နွေးထွေးပြီး ပူးပေါင်းဆောင်ရွက်တတ်ပေမယ့် ဖိအားများတဲ့အခါ စိတ်ပိတ်ထားခြင်း ဒါမှမဟုတ် ကိုယ့်ဆုံးဖြတ်ချက်ကို ခိုင်ခိုင်မာမာကိုင်ထားခြင်းမျိုး ရှိနိုင်ပါတယ်ခင်ဗျာ။']};
const WEALTH={strong:['The spouse can earn independently, build assets and enter marriage with a sound or steadily improving financial base.','အိမ်ထောင်ဖက်ဟာ သူတစ်ပါးကိုသာ မှီခိုနေရသူမဟုတ်ဘဲ ကိုယ်ပိုင်ဝင်ငွေနဲ့ ပိုင်ဆိုင်မှုကို တည်ဆောက်နိုင်ပြီး ငွေကြေးအခြေခံကောင်း သို့မဟုတ် တဖြည်းဖြည်းတိုးတက်လာမယ့်သူ ဖြစ်ပါတယ်ခင်ဗျာ။'],stable:["The partner's finances are more steady than lavish. Regular work and gradual accumulation are stronger than sudden wealth.",'အိမ်ထောင်ဖက်ရဲ့ ငွေကြေးအခြေအနေဟာ အလွန်အကျွံချမ်းသာတဲ့ပုံစံထက် ပုံမှန်ဝင်ငွေရှိပြီး ဖြည်းဖြည်းချင်းစုဆောင်းတိုးတက်မယ့်ပုံစံ ပိုထင်ရှားပါတယ်ခင်ဗျာ။'],strained:['Financial obligations, debt or unstable income can weigh on the partner. Careful budgeting and clear ownership of shared liabilities are necessary.','အိမ်ထောင်ဖက်ဘက်မှာ အကြွေးတာဝန်၊ အသုံးစရိတ်ဖိအား ဒါမှမဟုတ် ဝင်ငွေမတည်ငြိမ်မှု ရှိနိုင်ပါတယ်ခင်ဗျာ။ လက်ထပ်မယ့်အခါ အကြွေးနဲ့ ငွေကြေးတာဝန်တွေကို ရှင်းရှင်းလင်းလင်း သိထားပြီး စနစ်တကျစီမံဖို့လိုပါတယ်။'],mixed:['The spouse can earn and build assets, although recurring obligations slow the pace of accumulation. Finances improve gradually with disciplined management.','အိမ်ထောင်ဖက်မှာ ဝင်ငွေရှာနိုင်မှုနဲ့ ပိုင်ဆိုင်မှုတည်ဆောက်နိုင်မှု ရှိပါတယ်ခင်ဗျာ။ တစ်ဖက်မှာလည်း အသုံးစရိတ်နဲ့ တာဝန်ယူရမှုရှိနေလို့ ငွေကြေးဟာ ဖြည်းဖြည်းချင်း စုဆောင်းတိုးတက်မယ့်ပုံစံဖြစ်ပါတယ်။']};
const GAIN={strong:['Marriage improves joint assets, savings and material stability. Both partners can build a stronger financial position by managing money together.','လက်ထပ်ပြီးနောက် စုဆောင်းငွေ၊ ပိုင်ဆိုင်မှုနဲ့ လူနေမှုတည်ငြိမ်မှု တိုးတက်လာပါမယ်ခင်ဗျာ။ နှစ်ဦးပူးပေါင်းစီမံနိုင်ရင် အရင်ကထက် ပိုကောင်းတဲ့ ငွေကြေးအခြေအနေကို တည်ဆောက်နိုင်ပါတယ်။'],stable:['Marriage supports gradual financial improvement through combined effort rather than an immediate windfall.','လက်ထပ်လိုက်တာနဲ့ ငွေအစုလိုက်အပြုံလိုက်ရမယ့်ပုံစံမဟုတ်ပေမယ့် နှစ်ဦးပေါင်းဝင်ငွေနဲ့ ကြိုးစားမှုကြောင့် ငွေကြေးအခြေအနေ တဖြည်းဖြည်းကောင်းလာနိုင်ပါတယ်ခင်ဗျာ။'],strained:['Marriage can bring additional expenses or shared liabilities before financial improvement. Keep debt, ownership and recurring expenses explicit.','လက်ထပ်ပြီးနောက် ဝင်ငွေတိုးလာတာထက် အသုံးစရိတ်နဲ့ ပူးတွဲတာဝန်တွေ အရင်တိုးလာနိုင်ပါတယ်ခင်ဗျာ။ အကြွေး၊ ပိုင်ဆိုင်မှုနဲ့ လစဉ်အသုံးစရိတ်ကို နှစ်ဦးကြား ရှင်းလင်းစွာခွဲဝေထားဖို့လိုပါတယ်။'],mixed:['After marriage, income and expenses both increase. Joint planning allows savings and assets to grow steadily over time.','လက်ထပ်ပြီးနောက် ဝင်ငွေနဲ့ အသုံးစရိတ် နှစ်မျိုးစလုံးတိုးလာနိုင်ပါတယ်ခင်ဗျာ။ နှစ်ဦးပူးပေါင်းစီမံနိုင်ရင် စုဆောင်းငွေနဲ့ ပိုင်ဆိုင်မှုဟာ အချိန်ကြာလာတာနဲ့အမျှ တဖြည်းဖြည်းတိုးတက်လာပါမယ်။']};
const DOMESTIC={strong:['The couple can cooperate, share responsibility and maintain a stable long-term marriage.','နှစ်ဦးသား နားလည်ညှိနှိုင်းပြီး တာဝန်မျှဝေနိုင်တာကြောင့် အိမ်ထောင်ရေးကို ရေရှည်တည်ငြိမ်အောင် ထိန်းသိမ်းနိုင်တဲ့ကံ အားကောင်းပါတယ်ခင်ဗျာ။'],stable:['The relationship is fundamentally sustainable. Ordinary disagreements can be settled when communication and financial responsibility remain clear.','အခြေခံအားဖြင့် အိမ်ထောင်ရေးကို ဆက်လက်ထိန်းသိမ်းနိုင်တဲ့ကံရှိပါတယ်ခင်ဗျာ။ ရံဖန်ရံခါ သဘောထားကွဲလွဲမှုရှိနိုင်ပေမယ့် စကားပြောညှိနှိုင်းမှုနဲ့ ငွေကြေးတာဝန်ကို ရှင်းလင်းစွာထားနိုင်ရင် ပြန်လည်အဆင်ပြေနိုင်ပါတယ်။'],strained:['Family pressure, mistrust, distance or recurring obligations can weaken the bond. Discuss problems directly during difficult periods.','မိသားစုဖိအား၊ ယုံကြည်မှုဆိုင်ရာပြဿနာ၊ အကွာအဝေး ဒါမှမဟုတ် ထပ်တလဲလဲပေါ်လာမယ့် တာဝန်တွေကြောင့် အိမ်ထောင်ရေးအားနည်းနိုင်ပါတယ်ခင်ဗျာ။ အခက်အခဲကြုံတဲ့အခါ ပြဿနာကို ရှောင်မနေဘဲ နှစ်ဦးသား တိုက်ရိုက်ညှိနှိုင်းဖို့လိုပါတယ်။'],mixed:['The marriage can continue, with alternating periods of harmony and disagreement. Clear communication keeps temporary tension from becoming a lasting division.','အိမ်ထောင်ရေးကို ဆက်လက်ထိန်းသိမ်းနိုင်ပေမယ့် နားလည်မှုကောင်းတဲ့အချိန်နဲ့ သဘောထားကွဲလွဲတဲ့အချိန် အလှည့်ကျရှိနိုင်ပါတယ်ခင်ဗျာ။ စကားပြောညှိနှိုင်းမှုကောင်းရင် ယာယီပြဿနာတွေက ရေရှည်အကွာအဝေးဖြစ်မသွားပါဘူး။']};
const choose=(item,en)=>item[en?0:1];
const strength=(p,h)=>{const i=p?.levels.findIndex(hs=>hs.includes(h))??-1;return i<0?0:Math.max(1,4-i);};
const score=(p,hs)=>hs.reduce((n,h)=>n+strength(p,h),0);
const classify=(support,pressure)=>support>=pressure+6?'strong':support>pressure?'stable':pressure>support+3?'strained':'mixed';

export function iosSpouseProfile(result,profiles,en){
  const cusp=result.cusps.find(c=>c.number===7);
  const profile=h=>profiles.find(p=>p.planet.name===result.cusps.find(c=>c.number===h)?.lords.subLord);
  const seventh=profile(7);if(!cusp||!seventh)return'';
  const second=profile(2),fourth=profile(4),fifth=profile(5),eighth=profile(8),eleventh=profile(11),twelfth=profile(12);
  const spouseWealthSupport=2*score(eighth,[4,5,8,12])+score(fourth,[4,5,8,12])+score(fifth,[4,5,8,12])+score(twelfth,[4,5,8,12]);
  const spouseWealthPressure=2*score(eighth,[2,6,11])+score(fourth,[2,6,11])+score(fifth,[2,6,11])+score(twelfth,[2,6,11]);
  const nativeGainSupport=2*score(eleventh,[2,8,11])+score(second,[2,8,11])+score(eighth,[2,8,11]);
  const nativeGainPressure=2*score(eleventh,[5,9,12])+score(second,[5,9,12])+score(eighth,[5,9,12]);
  const domesticSupport=score(second,[2,7,11])+score(seventh,[2,7,11])+score(eleventh,[2,7,11]);
  const domesticPressure=score(second,[6,8,12])+score(seventh,[6,8,12])+score(eleventh,[6,8,12]);
  const wealthLevel=classify(spouseWealthSupport,spouseWealthPressure),gainLevel=classify(nativeGainSupport,nativeGainPressure),domesticLevel=classify(domesticSupport,domesticPressure);
  const index=name=>profiles.find(p=>p.planet.name===name)?.planet.index;
  const subPlanet=index(cusp.lords.subLord)??seventh.planet.index,starPlanet=index(seventh.planet.lords.starLord)??subPlanet,signPlanet=index(cusp.lords.signLord)??subPlanet;
  const descriptivePlanet=(subPlanet===7||subPlanet===8)&&seventh.representatives.length?index(seventh.representatives[0].name)??subPlanet:subPlanet;
  const signIndex=Math.floor((profiles.find(p=>p.planet.index===subPlanet)?.planet.longitude??0)/30)%12;
  const appearance=choose(APPEARANCE[descriptivePlanet]||APPEARANCE[0],en)+(en?'; ':'၊ ')+choose(SIGN_APPEARANCE[signIndex]||SIGN_APPEARANCE[0],en);
  const professionPlanets=profiles.map(p=>({planet:p.planet.index,value:3*score(p,[4])+2*score(p,[8,12])+score(p,[5])})).filter(p=>p.value>0).sort((a,b)=>b.value-a.value||a.planet-b.planet).slice(0,2).map(p=>p.planet);
  const profession=professionPlanets.length
    ? en?`The spouse is most suited to ${choose(PROFESSIONS[professionPlanets[0]],true)}${professionPlanets[1]!=null?` together with ${choose(PROFESSIONS[professionPlanets[1]],true)}`:''} and can build a steady career in one of these fields.`
      :`အိမ်ထောင်ဖက်ဟာ ${choose(PROFESSIONS[professionPlanets[0]],false)}${professionPlanets[1]!=null?`နဲ့ ${choose(PROFESSIONS[professionPlanets[1]],false)}`:''}ဘက်မှာ အကျိုးပေးပြီး ဒီနယ်ပယ်တွေထဲက သက်ဆိုင်ရာအလုပ်တစ်ခုနဲ့ အသက်မွေးဝမ်းကျောင်းပြုနိုင်ပါတယ်ခင်ဗျာ။`
    :choose(['The spouse is adaptable and can work across more than one occupational field.','အိမ်ထောင်ဖက်ဟာ လုပ်ငန်းနယ်ပယ်တစ်ခုတည်းမှာပဲ ကန့်သတ်မနေဘဲ အခြေအနေအလိုက် အလုပ်ပြောင်းလဲလုပ်ကိုင်နိုင်သူ ဖြစ်ပါတယ်ခင်ဗျာ။'],en);
  if(en)return `\n\nSpouse's appearance\nThe spouse is likely to have ${appearance}, with a noticeable and well-presented overall appearance.\n\nSpouse's temperament\nThe spouse shows ${choose(TEMPERAMENT[signPlanet],true)} in social life, ${choose(TEMPERAMENT[starPlanet],true)} in personal decisions, and ${choose(TEMPERAMENT[descriptivePlanet],true)} inside the relationship. ${choose(QUALIFIER[domesticLevel]||QUALIFIER.other,true)}\n\nSpouse's education and work\n${profession}\n\nSpouse's finances and assets\n${choose(WEALTH[wealthLevel],true)}\n\nFinancial progress after marriage\n${choose(GAIN[gainLevel],true)}\n\nUnderstanding and family life\n${choose(DOMESTIC[domesticLevel],true)}`;
  return `\n\nအိမ်ထောင်ဖက်၏ ပုံပန်းသဏ္ဌာန်\nအိမ်ထောင်ဖက်ဟာ ${appearance} ရုပ်ရည်သွင်ပြင်ရှိပြီး လူအများကြားမှာ သတိထားမိလွယ်တဲ့ သပ်ရပ်ကြည့်ကောင်းသူ ဖြစ်ပါတယ်ခင်ဗျာ။\n\nအိမ်ထောင်ဖက်၏ စိတ်နေစိတ်ထား\nအိမ်ထောင်ဖက်ဟာ လူမှုဆက်ဆံရေးမှာ ${choose(TEMPERAMENT[signPlanet],false)}၊ ကိုယ်ပိုင်ဆုံးဖြတ်ချက်ချရာမှာ ${choose(TEMPERAMENT[starPlanet],false)}ရှိပြီး အိမ်ထောင်ရေးအတွင်းမှာတော့ ${choose(TEMPERAMENT[descriptivePlanet],false)} ပိုထင်ရှားတဲ့သူ ဖြစ်ပါတယ်ခင်ဗျာ။ ${choose(QUALIFIER[domesticLevel]||QUALIFIER.other,false)}\n\nအိမ်ထောင်ဖက်၏ ပညာနှင့် အလုပ်အကိုင်\n${profession}\n\nအိမ်ထောင်ဖက်၏ ငွေကြေးနှင့် ပိုင်ဆိုင်မှု\n${choose(WEALTH[wealthLevel],false)}\n\nလက်ထပ်ပြီးနောက် ငွေကြေးတိုးတက်မှု\n${choose(GAIN[gainLevel],false)}\n\nလင်မယားနားလည်မှုနှင့် မိသားစုအခြေအနေ\n${choose(DOMESTIC[domesticLevel],false)}`;
}
