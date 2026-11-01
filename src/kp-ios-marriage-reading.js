import { dashaTimeline } from './kp-dasha.js';
import { planetLabel } from './locale.js';
import { iosSpouseProfile } from './kp-ios-spouse-reading.js';

const strength=(p,h)=>{const i=p?.levels.findIndex(houses=>houses.includes(h))??-1;return i<0?0:Math.max(1,4-i);};
const score=(p,houses)=>houses.reduce((sum,h)=>sum+strength(p,h),0);
const text=(en,english,myanmar)=>en?english:myanmar;
const mm=n=>String(n).replace(/[0-9]/g,d=>'၀၁၂၃၄၅၆၇၈၉'[Number(d)]);

function marriageAnalysis(result,profiles,en){
  // KPReadingEngine.evaluateNatal and analysisText(.marriage).
  const cusp=h=>result.cusps.find(c=>c.number===h),profile=h=>profiles.find(p=>p.planet.name===cusp(h)?.lords.subLord);
  const primary=profile(7),confirm=[2,11].map(profile).filter(Boolean);
  const strengths=Array.from({length:13},(_,h)=>strength(primary,h)*2+confirm.reduce((n,p)=>n+strength(p,h),0));
  const primaryHouses=[2,7,11],supportiveHouses=[5,8],obstructingHouses=[1,6,10,12];
  const found=hs=>hs.filter(h=>strengths[h]>0),sum=hs=>hs.reduce((n,h)=>n+strengths[h],0);
  const primaryScore=sum(primaryHouses),supportiveScore=sum(supportiveHouses),obstructingScore=sum(obstructingHouses);
  const support=primaryScore*2+supportiveScore;
  const verdict=primaryScore===0?'weak':support>=obstructingScore+3?'strong':obstructingScore>=support+3?'weak':'mixed';
  const list=hs=>hs.length?hs.map(h=>en?String(h):mm(h)).join(', '):en?'none':'မတွေ့ပါ';
  const lines=[7,2,11].map(h=>{
    const c=cusp(h),p=profile(h);if(!c)return null;
    const houses=p?[...new Set(p.levels.flat())].sort((a,b)=>a-b):[];
    const representatives=p?.representatives.map(r=>`${en?planetLabel(r.name,true):r.name} (${en?{'ပူးယှဉ်':'conjunction','မြင်':'aspect','ရာသီသခင်':'sign lord'}[r.relationship]||r.relationship:{'မြင်':'အမြင်'}[r.relationship]||r.relationship})`).join(en?', ':'၊ ');
    const agency=representatives?en?`\nNode agency included: ${representatives}.`:`\nရာဟု/ကိတ် ကိုယ်စားလှယ်သုံးသပ်ချက်မှာ ${representatives} ကိုပါ ထည့်သွင်းတွက်ချက်ထားပါတယ်။`:'';
    return en?`House ${h} CSL: ${planetLabel(c.lords.subLord,true)}; its star lord is ${planetLabel(p?.planet.lords.starLord||c.lords.starLord,true)}. Signified houses: ${list(houses)}.${agency}`
      :`${mm(h)} တန့် ဘာဝသန္ဓိဘုတ္တိနက္ခတ်သခင်မှာ ${c.lords.subLord} ဖြစ်ပြီး ၎င်းရဲ့နက္ခတ်သခင်မှာ ${p?.planet.lords.starLord||c.lords.starLord} ဖြစ်ပါတယ်။ အကျိုးဆောင်ဘာဝများမှာ ${list(houses)} ဖြစ်ပါတယ်။${agency}`;
  }).filter(Boolean).join('\n\n');
  if(en)return `KP natal promise is judged first from the House 7 cuspal sub lord; the remaining cusps provide confirming evidence.\n\n${lines}\n\nSupporting houses found: ${list([...new Set([...found(primaryHouses),...found(supportiveHouses)])])}. Obstructing houses found: ${list(found(obstructingHouses))}. Evidence totals — primary ${primaryScore}, supportive ${supportiveScore}, obstructing ${obstructingScore}. Conclusion: ${{strong:'strong',mixed:'mixed/conditional',weak:'weak'}[verdict]}.`;
  return `KP မူလစည်းမျဉ်းအရ ၇ တန့် ဘာဝသန္ဓိဘုတ္တိနက္ခတ်သခင်ကို အဓိကတရားသူကြီးအဖြစ်ယူပြီး ကျန်ဘာဝသန္ဓိများကို အတည်ပြုချက်အဖြစ် ပေါင်းစပ်ထားပါတယ်။\n\n${lines}\n\nတွေ့ရှိတဲ့အထောက်အကူပြုဘာဝများက ${list([...new Set([...found(primaryHouses),...found(supportiveHouses)])])} ဖြစ်ပြီး အနှောင့်အယှက်ဘာဝများက ${list(found(obstructingHouses))} ဖြစ်ပါတယ်။ အဓိကအင်အား ${primaryScore}၊ အထောက်အကူပြုအင်အား ${supportiveScore}၊ အနှောင့်အယှက်အင်အား ${obstructingScore} ရရှိပါတယ်။ ထို့ကြောင့် အဟောအခြေအနေမှာ ${{strong:'အားကောင်း',mixed:'အင်အားရောယှက်',weak:'အားနည်း'}[verdict]} ဖြစ်ပါတယ်။`;
}

function natal(result,profiles,en){
  const profile=h=>profiles.find(p=>p.planet.name===result.cusps.find(c=>c.number===h)?.lords.subLord);
  const second=profile(2),fifth=profile(5),seventh=profile(7),eleventh=profile(11);
  const selected=[second,fifth,seventh,eleventh].filter(Boolean);
  const promiseScore=score(seventh,[2,7,11]),delayScore=score(seventh,[1,6,10]);
  const seventhCoreCount=[2,7,11].filter(h=>strength(seventh,h)>0).length;
  const confirmed=[2,7,11].every(h=>selected.some(p=>strength(p,h)>0));
  const love=promiseScore>0&&score(seventh,[5])>0&&score(fifth,[7])>0;
  const promise=promiseScore===0?'restricted':confirmed&&seventhCoreCount>=2&&promiseScore>delayScore?'strong':'conditional';
  const harmonySupport=2*score(eleventh,[2,5,7,11])+score(second,[2,7,11])+score(seventh,[2,7,11]);
  const harmonyStrain=2*score(eleventh,[6,8,12])+score(second,[6,8,12])+score(seventh,[6,8,12]);
  const relationshipStrain=score(seventh,[6,8,12])+score(second,[6,8,12])+score(eleventh,[6,8,12]);
  const quality=harmonySupport>0&&harmonySupport>=harmonyStrain+2?'supportive':harmonyStrain>harmonySupport?'challenging':'mixed';
  const delayed=promise!=='restricted'&&delayScore>0,reconciliation=promise!=='restricted'&&harmonySupport>0&&relationshipStrain>0;
  const openings={strong:['Marriage is clearly promised. When the supportive period begins, a serious relationship can proceed to marriage without a major obstruction.','မူလဇာတာအရ အိမ်ထောင်ကျနိုင်တဲ့ကံ ထင်ရှားပါတယ်ခင်ဗျာ။ အကျိုးပေးကာလရောက်လာတဲ့အခါ အလေးအနက်ထားရမယ့် အချစ်ရေးတစ်ခုကနေ အိမ်ထောင်ရေးအထိ အခက်အခဲကြီးမားစွာမရှိဘဲ ရောက်ရှိနိုင်ပါတယ်။'],conditional:['Marriage is promised, although the decision may take time because of work, family responsibilities or hesitation. The opportunity becomes more definite during a supportive period.','မူလဇာတာအရ အိမ်ထောင်ပြုကံရှိပါတယ်ခင်ဗျာ။ ဒါပေမယ့် အလုပ်တာဝန်၊ မိသားစုအခြေအနေ ဒါမှမဟုတ် ကိုယ်တိုင်ဆုံးဖြတ်ချက်ချဖို့ အချိန်ယူရတာကြောင့် အိမ်ထောင်ရေးအနည်းငယ်နောက်ကျနိုင်ပါတယ်။ အကျိုးပေးကာလရောက်လာချိန်မှာ အိမ်ထောင်ရေးအခွင့်အလမ်း ပိုမိုပြတ်သားလာပါမယ်။'],restricted:['The marriage promise is weak. Relationships may arise, but turning one into a stable marriage can be difficult and requires a careful choice of partner and timing.','မူလဇာတာမှာ အိမ်ထောင်ပြုကံအားနည်းပါတယ်ခင်ဗျာ။ အချစ်ရေးအခွင့်အလမ်းတွေ ရှိလာနိုင်ပေမယ့် တည်ငြိမ်တဲ့အိမ်ထောင်ရေးအဖြစ် ရောက်ရှိဖို့ အခက်အခဲများနိုင်တာကြောင့် လက်တွဲဖော်ရွေးချယ်မှုနဲ့ အချိန်ကာလကို သေချာဂရုစိုက်ရပါမယ်။']};
  const qualities={supportive:['Married life is supportive and sustainable. The couple can share responsibilities, solve disagreements and build a stable family together.','အိမ်ထောင်ပြုပြီးနောက် နှစ်ဦးသား တာဝန်မျှဝေပြီး ပြဿနာတွေကို အတူတကွဖြေရှင်းနိုင်ပါမယ်။ မိသားစုဘဝတည်ငြိမ်ပြီး ရေရှည်လက်တွဲနိုင်တဲ့ကံ အားကောင်းပါတယ်ခင်ဗျာ။'],challenging:['Married life can face recurring disagreement, distance, mistrust or financial and family pressure. Clear communication and firm boundaries are needed to keep the relationship stable.','အိမ်ထောင်ပြုပြီးနောက် သဘောထားကွဲလွဲမှု၊ အကွာအဝေး၊ ယုံကြည်မှုအားနည်းခြင်း ဒါမှမဟုတ် ငွေကြေးနဲ့ မိသားစုတာဝန်ဖိအားတွေ ထပ်တလဲလဲကြုံနိုင်ပါတယ်ခင်ဗျာ။ ပြဿနာကို မရှောင်ဘဲ တိုက်ရိုက်ညှိနှိုင်းမှသာ အိမ်ထောင်ရေးတည်ငြိမ်ပါမယ်။'],mixed:['Married life has both harmonious and difficult phases. The relationship remains stable when both partners discuss money, family duties and expectations openly.','အိမ်ထောင်ရေးမှာ နားလည်မှုကောင်းတဲ့ကာလနဲ့ သဘောထားကွဲလွဲတဲ့ကာလ အလှည့်ကျဖြစ်နိုင်ပါတယ်ခင်ဗျာ။ ငွေကြေး၊ မိသားစုတာဝန်နဲ့ နှစ်ဦးသားမျှော်လင့်ချက်တွေကို ကြိုတင်ညှိနှိုင်းထားနိုင်ရင် အိမ်ထောင်ရေးကို တည်ငြိမ်အောင် ထိန်းသိမ်းနိုင်ပါမယ်။']};
  let prediction=text(en,'Marriage promise\n','အိမ်ထောင်ရေးမူလကံ\n')+openings[promise][en?0:1];
  if(promise!=='restricted'){
    if(delayed)prediction+=text(en,'\n\nDelay and obstacles\nMarriage can be delayed by work, family duties, disagreement or uncertainty, but the delay does not remove the marriage promise.','\n\nနှောင့်နှေးနိုင်တဲ့အချက်\nအလုပ်တာဝန်၊ မိသားစုတာဝန်၊ သဘောထားမတိုက်ဆိုင်မှု ဒါမှမဟုတ် ဆုံးဖြတ်ချက်မပြတ်သားမှုကြောင့် အိမ်ထောင်ရေးနောက်ကျနိုင်ပါတယ်ခင်ဗျာ။ ဒါပေမယ့် အိမ်ထောင်ပြုကံပျက်သွားတာမျိုးတော့ မဟုတ်ပါဘူး။');
    prediction+=text(en,'\n\nLove-marriage pattern\n','\n\nအချစ်အခြေပြု အိမ်ထောင်ရေး\n')+text(en,love?'A relationship that begins through mutual affection has a strong chance of developing into marriage.':'A match that includes family agreement or an introduction through the social circle is more suitable than relying only on a private romance.',love?'နှစ်ဦးသဘောတူချစ်ခင်ရာကနေ အိမ်ထောင်ရေးအထိ တိုးတက်သွားနိုင်တဲ့ကံ အားကောင်းပါတယ်ခင်ဗျာ။':'ကိုယ်တိုင်ချစ်ကြိုက်ပြီး လျှို့ဝှက်ဆုံးဖြတ်တာထက် မိသားစုသဘောတူညီမှုပါဝင်ပြီး အသိုင်းအဝိုင်းကတစ်ဆင့် ဆုံတွေ့ရတဲ့ပုံစံက ပိုအဆင်ပြေပါမယ်ခင်ဗျာ။');
    prediction+=text(en,'\n\nContinuing married life\n','\n\nအိမ်ထောင်ပြုပြီးနောက်အခြေအနေ\n')+qualities[quality][en?0:1];
    prediction+=text(en,'\n\nSeparation and reconciliation\n','\n\nခွဲခွာမှုနဲ့ ပြန်လည်ပေါင်းစည်းမှု\n')+text(en,reconciliation?'A serious disagreement or temporary separation can be followed by reconciliation. The relationship recovers when both partners communicate during the next supportive period.':'A repeated separation-and-reunion pattern is not prominent. Difficult periods are more likely to show temporary tension than a lasting separation.',reconciliation?'ပြင်းထန်တဲ့အငြင်းပွားမှု ဒါမှမဟုတ် ယာယီခွဲခွာမှုကြုံရနိုင်ပေမယ့် နောက်ပိုင်းမှာ ပြန်လည်ညှိနှိုင်းပေါင်းစည်းနိုင်တဲ့ကံလည်း ရှိပါတယ်ခင်ဗျာ။ အကျိုးပေးကာလရောက်လာချိန်မှာ နှစ်ဦးသား စကားပြောညှိနှိုင်းနိုင်ရင် ဆက်ဆံရေးပြန်ကောင်းလာပါမယ်။':'ခွဲခွာပြီး ပြန်ပေါင်းရတာမျိုး ထပ်တလဲလဲဖြစ်မယ့်ကံ မထင်ရှားပါဘူးခင်ဗျာ။ အခက်အခဲရှိတဲ့ကာလတွေမှာလည်း ရေရှည်ခွဲခွာခြင်းထက် ယာယီသဘောထားကွဲလွဲမှုမျိုးသာ ပိုဖြစ်နိုင်ပါတယ်။');
    prediction+=iosSpouseProfile(result,profiles,en);
  }
  return{prediction,analysis:marriageAnalysis(result,profiles,en),restricted:promise==='restricted',strain:relationshipStrain,delayed,reconciliation};
}

function marriagePeriods(result,profiles,natalValue,en){
  const heading=text(en,'Marriage-related Periods','အိမ်ထောင်ရေးဆိုင်ရာ အချိန်ကာလများ');
  const analysis=text(en,'Marriage periods are calculated from the complete natal timing sequence and filtered for realistic adult-life ages.','အိမ်ထောင်ရေးဆိုင်ရာအချိန်ကာလများကို မူလဇာတာ၏ အချိန်စဉ်တစ်ခုလုံးမှ တွက်ချက်ပြီး ဇာတာရှင်၏ အသက်အရွယ်အရ လက်တွေ့ဖြစ်နိုင်သည့်ကာလများကိုသာ ရွေးချယ်ထားပါသည်။');
  if(natalValue.restricted)return{analysis,prediction:heading+text(en,'\nThe marriage promise is weak, so there is no period strong enough to present as a definite marriage window.','\nမူလဇာတာမှာ အိမ်ထောင်ပြုကံအားနည်းတာကြောင့် အိမ်ထောင်ကျမယ့်ကာလအဖြစ် တိတိကျကျရွေးချယ်ပေးနိုင်လောက်တဲ့ အားကောင်းသောအချိန် မတွေ့ရပါဘူးခင်ဗျာ။')};
  let timeline;try{timeline=dashaTimeline(result.planets[1].longitude,result.utc);}catch{return{analysis,prediction:heading+text(en,'\nThe timing could not be calculated.','\nအိမ်ထောင်ရေးအချိန်ကာလကို မတွက်ချက်နိုင်သေးပါခင်ဗျာ။')};}
  const now=Date.now(),birth=Date.parse(result.utc),tz=(Number(result.profile.tz)||0)*3600000;
  const at=t=>new Date(t+tz),age=t=>{const d=at(t),b=at(birth);let years=d.getUTCFullYear()-b.getUTCFullYear();if(d.getUTCMonth()<b.getUTCMonth()||d.getUTCMonth()===b.getUTCMonth()&&d.getUTCDate()<b.getUTCDate())years--;return years;};
  const currentAge=age(now),byName=new Map(profiles.map(p=>[p.planet.name,p])),positive=[],cautions=[];
  for(const maha of timeline)for(const bhukti of maha.children)for(const antara of bhukti.children){
    const ps=[maha,bhukti,antara].map(p=>byName.get(p.lord));if(ps.some(p=>!p))continue;
    const support=ps.reduce((n,p,i)=>n+score(p,[2,7,11])*[2,3,4][i],0),pressure=ps.reduce((n,p,i)=>n+score(p,[1,6,8,10,12])*[2,3,4][i],0);
    const allParticipate=ps.every(p=>[2,7,11].some(h=>strength(p,h)>0));
    const allHouses=houses=>houses.every(h=>ps.some(p=>strength(p,h)>0));
    const start=Date.parse(antara.start),end=Date.parse(antara.end),eventAge=age(start+(end-start)/2);
    if(eventAge<18||eventAge>90)continue;
    if(allParticipate&&allHouses([2,7,11]))positive.push({start,end,age:eventAge,score:support-Math.trunc(pressure/3)+24+(eventAge<=24?1:eventAge<=39?8:eventAge<=54?5:eventAge<=70?-2:-8)});
    if(allHouses([6,8,12])||allHouses([1,6,10]))cautions.push({start,end,age:eventAge,score:pressure-Math.trunc(support/3)+20});
  }
  const best=rows=>rows.slice().sort((a,b)=>b.score-a.score||a.start-b.start)[0];
  const future=positive.filter(w=>w.end>=now),marriage=best(future.length?future:positive);
  const afterMarriage=marriage?Math.max(now,marriage.end):now;
  const limit=new Date(afterMarriage);limit.setFullYear(limit.getFullYear()+20);
  const caution=natalValue.strain>0||natalValue.delayed?best(cautions.filter(w=>w.end>afterMarriage&&w.start<=limit.getTime())):null;
  const recoveryLimit=caution?new Date(caution.end):null;if(recoveryLimit)recoveryLimit.setFullYear(recoveryLimit.getFullYear()+10);
  const recovery=caution?positive.filter(w=>w.start>=caution.end&&w.start<=recoveryLimit.getTime()).sort((a,b)=>a.start-b.start)[0]:null;
  const format=t=>{const d=at(t);const date=[String(d.getUTCDate()).padStart(2,'0'),String(d.getUTCMonth()+1).padStart(2,'0'),String(d.getUTCFullYear())].join('.');return en?date:date.replace(/[0-9]/g,x=>'၀၁၂၃၄၅၆၇၈၉'[Number(x)]);};
  const range=w=>`${format(w.start)} – ${format(Math.max(w.start,w.end-86400000))}`;
  let prediction=heading+text(en,'\nThe clearest period for commitment, marriage or an important step in partnership is shown below.','\nဇာတာရှင်ရဲ့ဘဝမှာ အိမ်ထောင်ရေးအတည်ပြုခြင်း၊ လက်ထပ်ခြင်း ဒါမှမဟုတ် လက်တွဲဖော်နဲ့ဆက်ဆံရေး အရေးပါတဲ့အဆင့်ကို ရောက်နိုင်မယ့် ထင်ရှားတဲ့ကာလကို ဖော်ပြထားပါတယ်ခင်ဗျာ။');
  prediction+=en?`\nCurrent age: ${currentAge}.`:`\nဇာတာရှင်ရဲ့ လက်ရှိအသက် ${currentAge} နှစ်ဖြစ်ပါတယ်။`;
  if(marriage){
    const historical=marriage.end<now,laterLife=currentAge>=55||marriage.age>=55;
    const label=historical?text(en,'Strongest past marriage activation','အတိတ်က အိမ်ထောင်ရေးအင်အားအကောင်းဆုံးကာလ'):laterLife?text(en,'Strongest later-life commitment period','နောက်ကျအိမ်ထောင် သို့မဟုတ် အဖော်ပြုဘဝအတွက် အားကောင်းသောကာလ'):text(en,'Strongest marriage period','အိမ်ထောင်ရေးအားအကောင်းဆုံးကာလ');
    prediction+=`\n\n${label}\n${range(marriage)}`+(en?`\nAround age ${marriage.age}.`:`\nအသက် ${marriage.age} နှစ်ဝန်းကျင်မှာ ကျရောက်ပါတယ်။`);
    prediction+=historical?text(en,' This was a past life-course period, not a new future prediction.',' ဒါဟာ အတိတ်ကာလဖြစ်ပြီး အနာဂတ်မှာ အသစ်ဖြစ်မယ်လို့ဟောထားတာ မဟုတ်ပါဘူး။'):laterLife?text(en,' Read this as later marriage, remarriage or renewed commitment according to current relationship status.',' လက်ရှိအိမ်ထောင်ရေးအခြေအနေပေါ်မူတည်ပြီး နောက်ကျအိမ်ထောင်၊ ပြန်လည်အိမ်ထောင်ပြုခြင်း ဒါမှမဟုတ် ကတိကဝတ်ပြန်လည်ခိုင်မာခြင်းအဖြစ် ဖတ်ရပါမယ်။'):text(en,' A serious relationship, engagement or formal marriage may develop.',' အရေးပါတဲ့လက်တွဲဖော်နဲ့ ဆုံတွေ့ခြင်း၊ စေ့စပ်ခြင်း ဒါမှမဟုတ် တရားဝင်လက်ထပ်ခြင်း ဖြစ်လာနိုင်ပါတယ်ခင်ဗျာ။');
  }else prediction+=text(en,'\nNo single adult-life period is clear enough to name confidently.','\nအရွယ်ရောက်ဘဝအတွင်း တိတိကျကျသတ်မှတ်နိုင်လောက်အောင် ထင်ရှားတဲ့ကာလတစ်ခု မတွေ့ရသေးပါဘူးခင်ဗျာ။');
  if(caution){prediction+=text(en,`\n\nRelationship caution period\n${range(caution)}`,`\n\nဆက်ဆံရေးသတိထားသင့်တဲ့ကာလ\n${range(caution)}`);prediction+=text(en,'\nMisunderstanding, distance or added responsibilities can create tension during this period, so important issues should be discussed directly.','\nဒီကာလမှာ နားလည်မှုလွဲခြင်း၊ အကွာအဝေး ဒါမှမဟုတ် တာဝန်ဖိအားကြောင့် အငြင်းပွားနိုင်ပါတယ်ခင်ဗျာ။ အရေးကြီးတဲ့ပြဿနာတွေကို မရှောင်ဘဲ တိုက်ရိုက်ဆွေးနွေးရပါမယ်။');}
  if(natalValue.reconciliation&&recovery){prediction+=text(en,`\n\nPeriod of renewed stability\n${range(recovery)}`,`\n\nအိမ်ထောင်ရေးပြန်လည်တည်ငြိမ်နိုင်မယ့်ကာလ\n${range(recovery)}`);prediction+=text(en,'\nMutual understanding returns during this period, allowing the relationship to become stable again.','\nဒီကာလမှာ နှစ်ဦးသား ပြန်လည်နားလည်လာပြီး ဆက်ဆံရေးကို တည်ငြိမ်တဲ့အခြေအနေဆီ ပြန်လည်တည်ဆောက်နိုင်ပါတယ်ခင်ဗျာ။');}
  return{prediction,analysis};
}

export function iosMarriageReadings(result,profiles,isEnglish){const base=natal(result,profiles,isEnglish);return{natal:base,periods:marriagePeriods(result,profiles,base,isEnglish)};}
