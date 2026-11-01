import { dashaTimeline } from './kp-dasha.js';
import { planetLabel } from './locale.js';

// Port of KPReadingEngine.androidForeignTravelReading from the iOS app.
const PURPOSES=[
  ['work',[3,6,9,10,11,12],['work or employment','အလုပ်အကိုင်']],
  ['business',[2,3,7,9,10,11,12],['business or partnership','စီးပွားရေး ဒါမှမဟုတ် ပူးပေါင်းလုပ်ငန်း']],
  ['education',[4,5,9,11,12],['education','ပညာရေး']],
  ['family',[2,7,9,11,12],['spouse or family','အိမ်ထောင်ဖက် ဒါမှမဟုတ် မိသားစု']],
  ['leisure',[3,5,9,11,12],['travel or leisure','အပန်းဖြေခရီး']],
  ['medical',[6,8,9,12],['medical treatment','ဆေးကုသမှု']],
  ['religious',[5,9,12],['religious or spiritual purpose','ဘာသာရေး ဒါမှမဟုတ် ဝိညာဉ်ရေး']],
  ['settlement',[3,9,11,12],['relocation or settlement','နေရာပြောင်းရွှေ့နေထိုင်ခြင်း']]
];
const pick=(pair,en)=>pair[en?0:1];
const mm=n=>String(n).replace(/[0-9]/g,d=>'၀၁၂၃၄၅၆၇၈၉'[Number(d)]);
const strength=(p,h)=>{const i=p?.levels.findIndex(houses=>houses.includes(h))??-1;return i<0?0:Math.max(1,4-i);};
const score=(p,hs)=>hs.reduce((n,h)=>n+strength(p,h),0);
const strongest=(p,hs)=>Math.max(0,...hs.map(h=>strength(p,h)));
const swiftRound=n=>Math.sign(n)*Math.floor(Math.abs(n)+0.5);

function dashaAgreement(result,profiles){
  let timeline;try{timeline=dashaTimeline(result.planets[1].longitude,result.utc);}catch{return false;}
  const byName=new Map(profiles.map(p=>[p.planet.name,p]));
  const born=new Date(result.utc),tz=(Number(result.profile.tz)||0)*3600000;
  const birthLocal=new Date(born.getTime()+tz);
  for(const maha of timeline)for(const bhukti of maha.children)for(const antara of bhukti.children){
    const date=new Date(Date.parse(antara.start)+tz);
    let age=date.getUTCFullYear()-birthLocal.getUTCFullYear();
    if(date.getUTCMonth()<birthLocal.getUTCMonth()||date.getUTCMonth()===birthLocal.getUTCMonth()&&date.getUTCDate()<birthLocal.getUTCDate())age--;
    if(age<16||age>85)continue;
    const m=strongest(byName.get(maha.lord),[3,9,12]),b=strongest(byName.get(bhukti.lord),[3,9,12]),a=strongest(byName.get(antara.lord),[3,8,9,11,12]);
    if(m>0&&b>0&&a>0&&m+b>=5)return true;
  }
  return false;
}

export function iosForeignTravelReading(result,profiles,en){
  const cusp=n=>profiles.find(p=>p.planet.name===result.cusps.find(c=>c.number===n)?.lords.subLord);
  const twelfth=cusp(12),ninth=cusp(9),third=cusp(3),ascendant=cusp(1);
  if(!twelfth)return{score:0,analysis:pick(['The twelfth-cusp data is incomplete.','၁၂ တန့်ဘာဝသန္ဓိအချက်အလက် မပြည့်စုံသေးပါ။'],en),prediction:pick(['Recalculate the chart with complete birth data.','မွေးဖွားမှုအချက်အလက်ပြည့်စုံစွာဖြင့် ဇာတာကို ပြန်တွက်ပါ။'],en)};
  const points=(level,max)=>level<=0?0:swiftRound(max*Math.min(level,4)/4);
  const confirmation=(p,max)=>{if(!p)return 0;const values=[3,9,12].map(h=>strength(p,h)),count=values.filter(v=>v>0).length,breadth=count===3?1:count===2?.75:count===1?.4:0;return swiftRound(max*breadth*Math.max(...values)/4);};
  const primary=points(strength(twelfth,12),16)+points(strength(twelfth,9),14)+points(strength(twelfth,3),10);
  const confirmations=confirmation(ninth,10)+confirmation(third,6)+confirmation(ascendant,4);
  const travel=strength(twelfth,12),home=strength(twelfth,4);
  const homeBalance=travel===0?0:home===0||travel>=home+2?15:travel===home?8:travel>home?12:home>=travel+2?0:4;
  const cuspProfiles=[twelfth,ninth,third,ascendant];
  const uniquePlanets=new Set(cuspProfiles.filter(p=>p&&[3,9,12].some(h=>strength(p,h)>0)).map(p=>p.planet.index)).size;
  const repetition=uniquePlanets>=3?10:uniquePlanets===2?7:uniquePlanets===1?4:0;
  let nodeAgency=0;
  cuspProfiles.forEach((p,i)=>{if(p&&[3,9,12].some(h=>strength(p,h)>0)&&(p.planet.index===7||p.planet.index===8||p.representatives.length))nodeAgency+=i===0?5:2;});
  nodeAgency=Math.min(5,nodeAgency);
  const dasha=dashaAgreement(result,profiles)?10:0;
  const total=Math.min(100,Math.max(0,primary+confirmations+homeBalance+repetition+nodeAgency+dasha));
  const rawPurposes=PURPOSES.map(([key,houses,names],i)=>({key,names,order:i,raw:cuspProfiles.reduce((sum,p,j)=>sum+(p?score(p,houses)*[2,1,1,1][j]:0),0)+(key==='settlement'&&travel>home?4:0)}));
  const rawTotal=rawPurposes.reduce((sum,p)=>sum+p.raw,0);
  const purposes=rawPurposes.map(p=>({...p,percent:rawTotal===0?0:swiftRound(p.raw*100/rawTotal)})).sort((a,b)=>b.percent-a.percent||b.raw-a.raw||a.order-b.order);
  const scoreText=en?total>=85?'Very strong promise for foreign travel or settlement.':total>=70?'Strong promise; real conditions and Dasa activation can materialise it.':total>=55?'Foreign travel is possible, but documents, money and circumstances must cooperate.':total>=40?'The promise is weak; short travel or attempts are more likely than settlement.':'Foreign links may exist, but a definite departure is not strongly promised.'
    :total>=85?'နိုင်ငံခြားခရီး ဒါမှမဟုတ် နိုင်ငံခြားမှာ နေရာချနေထိုင်နိုင်တဲ့ မူလကံ အလွန်အားကောင်းပါတယ်။':total>=70?'နိုင်ငံခြားထွက်နိုင်တဲ့ မူလကံအားကောင်းပြီး လက်တွေ့အခြေအနေနဲ့ ဒသာကိုက်ညီရင် အကောင်အထည်ပေါ်နိုင်ပါတယ်။':total>=55?'နိုင်ငံခြားထွက်နိုင်ခြေရှိပေမယ့် စာရွက်စာတမ်း၊ ငွေကြေးနဲ့ လက်တွေ့အခြေအနေတွေ ကိုက်ညီမှ ပိုသေချာပါမယ်။':total>=40?'မူလကံအင်အားနည်းတဲ့အတွက် နေရာချနေထိုင်ခြင်းထက် ခရီးတို ဒါမှမဟုတ် ကြိုးပမ်းမှုအဆင့် ပိုဖြစ်နိုင်ပါတယ်။':'နိုင်ငံခြားဆက်နွယ်မှုရှိနိုင်ပေမယ့် တကယ်ထွက်ခွာရမယ့် မူလကံကို အားကောင်းစွာ မညွှန်ပြသေးပါဘူး။';
  const houseList=p=>{const houses=[...new Set(p.levels.flat())].sort((a,b)=>a-b);return houses.length?houses.map(h=>en?String(h):mm(h)).join(', '):pick(['none','မတွေ့ပါ'],en);};
  const details=[[12,twelfth],[9,ninth],[3,third],[1,ascendant]].filter(([,p])=>p).map(([number,p])=>en
    ?`House ${number} cusp Sub Lord is ${planetLabel(p.planet.name,true)} and signifies houses ${houseList(p)}.`
    :`${mm(number)} တန့်ဘာဝသန္ဓိဘုတ္တိနက္ခတ်သခင်ဂြိုဟ်ဟာ ${p.planet.name} ဖြစ်ပြီး ${houseList(p)} တန့်ဘာဝတွေကို အကျိုးဆောင်ထားပါတယ်။`).join('\n');
  const analysis=en?`Foreign-travel natal score: ${total}/100\n${scoreText}\n\n${details}\n\n100-point evidence breakdown\n- 12th-cusp promise: ${primary}/40\n- 9th, 3rd and Ascendant confirmation: ${confirmations}/20\n- Foreign-versus-home balance: ${homeBalance}/15\n- Repeated significators: ${repetition}/10\n- Rahu/Ketu agency: ${nodeAgency}/5\n- Practical Dasa agreement: ${dasha}/10`
    :`နိုင်ငံခြားခရီး မူလကံအမှတ် - ${mm(total)}/${mm(100)}\n${scoreText}\n\n${details}\n\n၁၀၀ မှတ်စနစ် အထောက်အထားခွဲခြမ်းချက်\n- ၁၂ တန့်အဓိကကတိ - ${mm(primary)}/${mm(40)}\n- ၉ တန့်၊ ၃ တန့်နဲ့ လဂ်အတည်ပြုချက် - ${mm(confirmations)}/${mm(20)}\n- နိုင်ငံခြားထွက်မှုနဲ့ မူလနေရာတည်မြဲမှု နှိုင်းယှဉ်ချက် - ${mm(homeBalance)}/${mm(15)}\n- ထပ်တလဲလဲညွှန်ပြတဲ့ အကျိုးဆောင်ဂြိုဟ်များ - ${mm(repetition)}/${mm(10)}\n- ရာဟု/ကိတ် ကိုယ်စားလှယ်အင်အား - ${mm(nodeAgency)}/${mm(5)}\n- လက်တွေ့ဖြစ်နိုင်တဲ့ ဒသာညီညွတ်မှု - ${mm(dasha)}/${mm(10)}`;
  const outlook=en?total>=85?"Foreign travel outlook\nForeign travel is one of the native's prominent life possibilities. More than one meaningful journey or a long connection with another country can become part of life.":total>=70?'Foreign travel outlook\nThe native has a clear possibility of travelling abroad. A practical opportunity through work, education, business or family can turn this potential into an actual journey.':total>=55?'Foreign travel outlook\nForeign travel is possible, although it is more likely to develop through a specific opportunity than to happen automatically. The first opening may begin with an application, invitation, course or job connection.':'Foreign travel outlook\nA permanent move abroad is not a dominant life pattern. Short journeys, foreign contacts, online international work or occasional travel are more likely than long-term settlement.'
    :total>=85?'နိုင်ငံခြားခရီးမူလကံ\nဇာတာရှင်ဟာ ဘဝမှာ နိုင်ငံခြားခရီးသွားရမယ့်အခွင့်အလမ်း ထင်ထင်ရှားရှားရှိသူဖြစ်ပါတယ်ခင်ဗျာ။ တစ်ကြိမ်တည်းသွားပြီး ပြန်လာရတာမျိုးထက် နိုင်ငံခြားနဲ့ အချိန်ကြာကြာဆက်နွယ်ရခြင်း၊ အကြိမ်ကြိမ်ခရီးသွားရခြင်း ဒါမှမဟုတ် အဝေးနိုင်ငံတစ်ခုမှာ ဘဝရဲ့အရေးပါတဲ့ကာလတစ်ပိုင်းကို ဖြတ်သန်းရခြင်းမျိုး ဖြစ်လာနိုင်ပါတယ်။':total>=70?'နိုင်ငံခြားခရီးမူလကံ\nဇာတာရှင်မှာ နိုင်ငံခြားခရီးသွားနိုင်တဲ့မူလကံ ထင်ရှားပါတယ်ခင်ဗျာ။ အလုပ်အကိုင်၊ ပညာရေး၊ စီးပွားရေး ဒါမှမဟုတ် မိသားစုနဲ့ဆက်စပ်တဲ့ အခွင့်အရေးတစ်ခု ရလာတဲ့အခါ တကယ်နိုင်ငံခြားထွက်ခွာရနိုင်ပါတယ်။ ခရီးအတွက်လိုအပ်တဲ့အခြေအနေတွေ ပြည့်စုံလာတာနဲ့ မိမိနေရပ်နဲ့ဝေးတဲ့နေရာတစ်ခုဆီ သွားရောက်ရမယ့်အလားအလာ ကောင်းပါတယ်။':total>=55?'နိုင်ငံခြားခရီးမူလကံ\nဇာတာရှင်မှာ နိုင်ငံခြားသွားနိုင်တဲ့အခွင့်အလမ်း ရှိပါတယ်ခင်ဗျာ။ ဒါပေမယ့် အလိုအလျောက်ဖြစ်လာတာထက် အလုပ်ခေါ်စာ၊ သင်တန်းအခွင့်အရေး၊ မိသားစုဖိတ်ခေါ်မှု ဒါမှမဟုတ် တိကျတဲ့ကိစ္စတစ်ခုကနေ စတင်ဖြစ်ပေါ်လာနိုင်ပါတယ်။ အစပိုင်းမှာ လျှောက်လွှာတင်ခြင်းနဲ့ အဝေးနိုင်ငံကလူတွေနဲ့ ဆက်သွယ်ရခြင်းမျိုး ဖြစ်လာပြီး နောက်ပိုင်းမှာ တကယ်ခရီးထွက်ရတဲ့အဆင့်ကို ရောက်ရှိနိုင်ပါတယ်။':'နိုင်ငံခြားခရီးမူလကံ\nဇာတာရှင်ရဲ့ဘဝမှာ နိုင်ငံခြားကိုအပြီးတိုင်ပြောင်းရွှေ့နေထိုင်ရမယ့်ပုံစံက သိပ်မထင်ရှားပါဘူးခင်ဗျာ။ ဒါပေမယ့် နိုင်ငံခြားခရီးတိုသွားရခြင်း၊ အဝေးနိုင်ငံကလူတွေနဲ့ အလုပ်လုပ်ရခြင်း၊ အွန်လိုင်းကနေ နိုင်ငံတကာနဲ့ဆက်သွယ်ရခြင်း ဒါမှမဟုတ် လိုအပ်တဲ့ကိစ္စတစ်ခုအတွက် အခါအားလျော်စွာ ခရီးထွက်ရခြင်းမျိုးတော့ ဖြစ်လာနိုင်ပါတယ်။';
  const top=purposes.slice(0,3),name=p=>pick(p.names,en);
  let purpose=en?`Most likely reasons for travel\nThe clearest reason is ${name(top[0])}`:`နိုင်ငံခြားသွားရမယ့် အဓိကအကြောင်းရင်းများ\nအထင်ရှားဆုံးအကြောင်းရင်းက ${name(top[0])}`;
  if(top.length>1)purpose+=en?`. Another meaningful possibility is ${name(top[1])}`:` ဖြစ်ပါတယ်ခင်ဗျာ။ ဒုတိယအနေနဲ့ ${name(top[1])}`;
  if(top.length>2)purpose+=en?`, while ${name(top[2])}`:` နဲ့ ${name(top[2])}`;
  purpose+=en?'. These paths can overlap, so one journey may serve more than one purpose.':' တို့ကလည်း နိုင်ငံခြားသွားရမယ့်အကြောင်းရင်းအဖြစ် ပါဝင်လာနိုင်ပါတယ်။ တစ်ခါတလေ အလုပ်နဲ့ပညာရေး၊ မိသားစုနဲ့နေရာပြောင်းနေထိုင်မှုလို အကြောင်းရင်းနှစ်မျိုး သုံးမျိုး တစ်ပြိုင်နက်တည်း ဆက်စပ်ပြီး ခရီးထွက်ရတာမျိုးလည်း ဖြစ်လာနိုင်ပါတယ်ခင်ဗျာ။';
  const settlement=en?travel>home?'Relocation outlook\nA long stay or settlement abroad is more likely than a brief visit. The native may gradually establish work, study, family life or a new home away from the birthplace.':home>travel?'Relocation outlook\nForeign journeys may occur, but returning home or keeping the original home base is more likely than permanent settlement.':'Relocation outlook\nBoth a long stay and a later return home are possible. The final result will depend on the purpose of travel and the life built after arrival.'
    :travel>home?'နိုင်ငံခြားမှာ နေထိုင်နိုင်မယ့်အခြေအနေ\nဇာတာရှင်ဟာ နိုင်ငံခြားကို ခရီးတိုသွားပြီး ချက်ချင်းပြန်လာတာထက် ကာလရှည်နေထိုင်ရခြင်း ဒါမှမဟုတ် နေရာချနေထိုင်ရခြင်းမျိုး ပိုဖြစ်နိုင်ပါတယ်ခင်ဗျာ။ အဝေးနိုင်ငံမှာ အလုပ်အကိုင်၊ ပညာရေး၊ မိသားစုဘဝ ဒါမှမဟုတ် ကိုယ်ပိုင်နေထိုင်ရာတစ်ခုကို တဖြည်းဖြည်းတည်ဆောက်သွားနိုင်ပြီး နိုင်ငံခြားဘဝဟာ မိမိဘဝရဲ့အရေးပါတဲ့အပိုင်းတစ်ခု ဖြစ်လာနိုင်ပါတယ်။':home>travel?'နိုင်ငံခြားမှာ နေထိုင်နိုင်မယ့်အခြေအနေ\nဇာတာရှင်ဟာ နိုင်ငံခြားခရီးသွားရနိုင်ပေမယ့် အဲဒီနိုင်ငံမှာ အပြီးတိုင်နေရာချတာထက် အလုပ်၊ ပညာရေး ဒါမှမဟုတ် သတ်မှတ်ထားတဲ့တာဝန်တစ်ခု ပြီးမြောက်သွားတဲ့အခါ မူလနေရာကို ပြန်လာနိုင်ခြေ ပိုများပါတယ်ခင်ဗျာ။ နိုင်ငံခြားနဲ့ဆက်နွယ်မှုရှိနေရင်တောင် ကိုယ့်နိုင်ငံ၊ ကိုယ့်မိသားစုနဲ့ မူလအခြေစိုက်ရာကို ဆက်လက်ထိန်းထားတတ်မယ့်ပုံစံ ဖြစ်ပါတယ်။':'နိုင်ငံခြားမှာ နေထိုင်နိုင်မယ့်အခြေအနေ\nဇာတာရှင်ဟာ နိုင်ငံခြားမှာ ကာလရှည်နေထိုင်သွားနိုင်သလို တာဝန်တစ်ခု ပြီးမြောက်သွားတဲ့နောက် မူလနေရာကို ပြန်လာတာမျိုးလည်း ဖြစ်နိုင်ပါတယ်ခင်ဗျာ။ နောက်ဆုံးမှာ အပြီးတိုင်နေမလား၊ ပြန်လာမလားဆိုတာ နိုင်ငံခြားသွားရတဲ့ရည်ရွယ်ချက်နဲ့ အဲဒီနေရာမှာ တည်ဆောက်နိုင်မယ့်အလုပ်အကိုင်၊ မိသားစုဘဝနဲ့ နေထိုင်မှုအခြေအနေပေါ် မူတည်ပါလိမ့်မယ်။';
  return{score:total,analysis,prediction:`${outlook}\n\n${purpose}\n\n${settlement}`};
}
