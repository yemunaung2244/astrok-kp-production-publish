import { IOS_TEXT } from './kp-ios-text-catalog.js';
import { dashaTimeline } from './kp-dasha.js';
import { lordsFor } from './kp-core.js';
import { planetLabel } from './locale.js';

const mm=n=>String(n).replace(/\d/g,d=>'၀၁၂၃၄၅၆၇၈၉'[Number(d)]);
const level=(p,h)=>{const i=p?.levels.findIndex(row=>row.includes(h))??-1;return i<0?0:Math.max(1,4-i);};
const strongest=(p,hs)=>Math.max(0,...hs.map(h=>level(p,h)));
const count=(p,hs)=>hs.filter(h=>level(p,h)>0).length;
const cusp=(r,s,n)=>s.find(p=>p.planet.name===r.cusps.find(c=>c.number===n)?.lords.subLord);
const combined=(p,en)=>p?[...new Set(p.levels.flat())].sort((a,b)=>a-b).map(h=>en?String(h):mm(h)).join(', ')|| (en?'none':'မတွေ့ပါ'):(en?'none':'မတွေ့ပါ');
const name=(n,en)=>en?planetLabel(n,true):n;
const template=(s,values)=>s.replace(/\\\((\w+)\)/g,(_,k)=>values[k]??'');

export function incomeChannels(sig){const rules=[['career',[2,6,10,11]],['business',[2,7,10,11]],['investment',[2,5,11]],['property',[2,4,11]],['shared_money',[2,8,11]],['fortune_foreign',[2,9,11]],['online_export',[2,12,11]]];return rules.filter(([,hs])=>sig.some(p=>hs.every(h=>level(p,h)>0))).map(([key])=>key);}
const channelNames={
 career:['ဝန်ထမ်းအလုပ်နဲ့ အသက်မွေးဝမ်းကျောင်း','employment and profession'],business:['စီးပွားရေးနဲ့ မိတ်ဖက်လုပ်ငန်း','business and partnership'],investment:['ရင်းနှီးမြှုပ်နှံမှု','investment and speculation'],property:['အိမ်ခြံမြေ','property and real estate'],shared_money:['အမွေ၊ အာမခံနဲ့ အခြားသူရဲ့ငွေကြေး','inheritance, insurance or shared money'],fortune_foreign:['ကံကောင်းမှုနဲ့ နိုင်ငံခြားအခွင့်အလမ်း','fortune and foreign opportunity'],online_export:['နိုင်ငံခြား၊ Online စနစ်နဲ့ ပို့ကုန်ဝင်ငွေ','foreign, online or export income']
};
export function iosBeneficialCareer(result,sig,en){
 const primary=cusp(result,sig,10),second=cusp(result,sig,2),sixth=cusp(result,sig,6),eleventh=cusp(result,sig,11);
 const missing=en?'The natal chart is incomplete. Please calculate it again.':'မူလဇာတာအချက်အလက် မပြည့်စုံသေးပါ။ ဇာတာကို ပြန်တွက်ပေးပါ။';
 if(!primary||!second||!sixth||!eleventh)return{prediction:missing,analysis:missing};
 const strength=Array.from({length:13},(_,h)=>level(primary,h)*3+Math.max(level(second,h),level(sixth,h),level(eleventh,h)));
 const sectors=[
  ['အုပ်ချုပ်ရေး၊ ရုံးလုပ်ငန်းနဲ့ စီမံခန့်ခွဲရေး','administration and management',[6,10],[0,6]],
  ['ကုန်သွယ်ရေး၊ အရောင်းနဲ့ စျေးကွက်ရှာဖွေရေး','trade, sales and marketing',[3,7],[3,5]],
  ['ဘဏ္ဍာရေး၊ စာရင်းကိုင်နဲ့ ငွေကြေးစီမံခန့်ခွဲရေး','finance and accounting',[2,5],[3,4]],
  ['ပညာရေး၊ သင်ကြားရေးနဲ့ အကြံပေးလုပ်ငန်း','education and consulting',[5,9],[4,3]],
  ['နည်းပညာ၊ ဆက်သွယ်ရေးနဲ့ စက်ပိုင်းဆိုင်ရာလုပ်ငန်း','technology, communications and engineering',[3,8],[2,3,7]],
  ['အိမ်ခြံမြေ၊ ဆောက်လုပ်ရေးနဲ့ အဆောက်အအုံဆိုင်ရာလုပ်ငန်း','property and construction',[4,8],[2,6]],
  ['ကျန်းမာရေး၊ ကုသရေးနဲ့ ဝန်ဆောင်မှုလုပ်ငန်း','healthcare and care services',[6,8],[1,2]],
  ['နိုင်ငံခြားဆက်သွယ်ရေး၊ ခရီးသွားနဲ့ သယ်ယူပို့ဆောင်ရေး','international work, travel and logistics',[9,12],[3,7]]
 ].map(([mmName,enName,hs,ps],order)=>({mmName,enName,hs,ps,order,score:strength[2]+strength[10]+strength[11]+hs.reduce((x,h)=>x+strength[h]*2,0)+ps.reduce((x,p)=>x+(primary.planet.index===p?8:second.planet.index===p?2:0),0)})).sort((a,b)=>b.score-a.score||a.order-b.order);
 const first=sectors[0],runner=sectors[1],salaried=strength[6]>=strength[7];
 const mode=en?(salaried?'A salaried or structured role is the stronger route.':'Independent business or client-based work is the stronger route.'):(salaried?'ဝန်ထမ်းအဖြစ် ဒါမှမဟုတ် စနစ်တကျဖွဲ့စည်းထားတဲ့ လုပ်ငန်းမှာလုပ်တာက ပိုအကျိုးပေးပါမယ်ခင်ဗျာ။':'ကိုယ်ပိုင်လုပ်ငန်း ဒါမှမဟုတ် ဖောက်သည်နဲ့တိုက်ရိုက်လုပ်ရတဲ့ပုံစံက ပိုအကျိုးပေးပါမယ်ခင်ဗျာ။');
 const career=en?`The strongest occupation group in this natal chart is ${first.enName}. The next suitable path is ${runner.enName}. ${mode}`:`ဇာတာရှင်အတွက် အဓိကအကျိုးပေးမယ့် အလုပ်အကိုင်က ${first.mmName} ဖြစ်ပါတယ်ခင်ဗျာ။ ဒုတိယဦးစားပေးလုပ်နိုင်တာက ${runner.mmName} ဖြစ်ပါတယ်။ ${mode}`;
 const analysis=en?`The 10th-cusp sub lord ${name(primary.planet.name,true)} is the main occupational indicator. The 2nd, 6th and 11th cusp sub lords are checked for income, service and gain. The leading field is assessed against houses ${first.hs[0]} and ${first.hs[1]}; its chart support score is ${first.score} versus ${runner.score} for the next field. House 6 versus house 7 is used to distinguish employment from independent work.`:`၁၀ တန့် ဘာဝသန္ဓိဘုတ္တိနက္ခတ်သခင် ${primary.planet.name} ကို အလုပ်အကိုင်အတွက် အဓိကယူပြီး ၂၊ ၆၊ ၁၁ တန့် ဘာဝသန္ဓိဘုတ္တိနက္ခတ်သခင်တွေကို ဝင်ငွေ၊ အလုပ်နဲ့ အကျိုးအမြတ်အတွက် တိုက်စစ်ထားပါတယ်။ ပထမဦးစားပေးလုပ်ငန်းအတွက် ${first.hs[0]}၊ ${first.hs[1]} တန့်ဘာဝကို တိုက်စစ်ရာ အင်အား ${first.score} ရပြီး ဒုတိယလုပ်ငန်းက ${runner.score} ရပါတယ်။ ၆ တန့်နဲ့ ၇ တန့်ကို နှိုင်းယှဉ်ပြီး အလုပ်လုပ်ပုံကို ခွဲထားပါတယ်။`;
 const channels=incomeChannels(sig).map(k=>channelNames[k][en?1:0]);
 const intro=channels.length?(en?`The stronger income routes are ${channels.join(', ')}. Among occupations, the following fields deserve priority.`:`ဇာတာရှင်အတွက် ဝင်ငွေရနိုင်တဲ့လမ်းကြောင်းတွေထဲမှာ ${channels.join('၊ ')} တို့က ပိုအားသာပါတယ်ခင်ဗျာ။ အလုပ်အကိုင်အဖြစ် ရွေးချယ်ရာမှာတော့ အောက်ပါလုပ်ငန်းတွေကို ဦးစားပေးစဉ်းစားနိုင်ပါတယ်။`):(en?'No single income route stands out strongly. Consider the suitable occupations below as practical starting points.':'ဝင်ငွေရနိုင်တဲ့လမ်းကြောင်းတစ်ခုတည်း သိသိသာသာမထင်ရှားသေးပါဘူးခင်ဗျာ။ အောက်ပါအကျိုးပေးအလုပ်အကိုင်တွေကို လက်တွေ့အခြေအနေနဲ့ ကိုက်ညီအောင် ရွေးချယ်နိုင်ပါတယ်။');
 return{prediction:`${intro}\n\n${career}`,analysis};
}

export function iosWealthReading(result,sig,en){
 const c=Object.fromEntries([2,4,5,6,7,9,10,11].map(n=>[n,cusp(result,sig,n)]));
 const mainScore=(p,primary,close,extra)=>{if(!p)return 0;const a=level(p,primary),b=strongest(p,close),e=strongest(p,extra),pressure=strongest(p,[8,12]),wealth=a+b+e;if(a>=3&&b>=2&&e>0&&wealth>pressure+3)return a===4&&b>=3?10:9;if(a>0&&b>0&&wealth>pressure)return a+b>=6?8:7;if(a>0&&pressure>0)return wealth>=pressure+2?6:5;if(a>0||b>0)return pressure>=3?3:4;return pressure>0?(pressure>=3?0:1):2;};
 const supportScore=(p,primary,support)=>{if(!p)return 0;const a=level(p,primary),hits=count(p,support),pressure=strongest(p,[8,12]);if(a>0&&hits>=2&&pressure<3)return 4;if(a>0&&hits>=1&&pressure<4)return 3;if(a>0&&pressure<3)return 2;return a>0||hits>0?1:0;};
 const channels=incomeChannels(sig),asset=channels.includes('property')||channels.includes('shared_money');
 const channelScore=channels.length>=3?(asset?8:6):channels.length===2?4:channels.length===1?2:0;
 const main=mainScore(c[2],2,[11],[6,10])+mainScore(c[6],6,[10,11],[2])+mainScore(c[10],10,[11,2],[6])+mainScore(c[11],11,[2,10],[6]);
 const expansion=supportScore(c[4],4,[2,11])+supportScore(c[5],5,[2,11])+supportScore(c[7],7,[2,10,11])+supportScore(c[9],9,[2,11]);
 const best=h=>Math.max(0,...sig.map(p=>level(p,h))),retentionSupport=best(2)+best(11)+best(4),retentionPressure=best(8)+best(12);
 const retention=retentionSupport>=9&&retentionPressure<=3?8:retentionSupport>=7&&retentionSupport>=retentionPressure+3?7:retentionSupport>=6&&retentionSupport>retentionPressure?6:retentionSupport>=5&&retentionSupport>=retentionPressure?5:retentionSupport>=4&&retentionPressure<=retentionSupport+2?4:retentionSupport>0&&retentionPressure>retentionSupport?3:retentionSupport>0?2:retentionPressure>0?0:1;
 const hits=sig.map(p=>count(p,[2,6,10,11])),strong=hits.filter(x=>x>=3).length,mixed=hits.filter(x=>x===2).length;
 const repeated=strong>=2?8:strong===1&&mixed>=1?6:strong===1?5:mixed>=2?4:mixed===1?2:0;
 const natal=Math.min(80,Math.max(0,main+expansion+channelScore+retention+repeated));
 const now=Date.now(),timeline=dashaTimeline(result.planets[1].longitude,result.utc),maha=timeline.find(x=>Date.parse(x.start)<=now&&now<Date.parse(x.end)),bhukti=maha?.children.find(x=>Date.parse(x.start)<=now&&now<Date.parse(x.end)),antara=bhukti?.children.find(x=>Date.parse(x.start)<=now&&now<Date.parse(x.end));
 const dashaNames=[maha,bhukti,antara].filter(Boolean).map(x=>x.lord),dashaProfiles=dashaNames.map(n=>sig.find(p=>p.planet.name===n));
 const periodScore=(p,cap)=>{if(!p)return 0;const hits=count(p,[2,6,10,11]),pressure=strongest(p,[8,12]),best=strongest(p,[2,6,10,11]);const ratio=hits>=3?(pressure>=3?.75:best>=3?1:.88):hits===2?(pressure>=3?.5:.72):hits===1?(pressure>=3?.2:.42):pressure>0?0:.12;return Math.min(cap,Math.max(0,Math.round(cap*ratio)));};
 const dasha=periodScore(dashaProfiles[0],8)+periodScore(dashaProfiles[1],6)+periodScore(dashaProfiles[2],3);
 const transit=wealthTransitScore(result,sig),period=Math.min(20,dasha+transit);
 const nIndex=natal>=72?0:natal>=64?1:natal>=56?2:natal>=48?3:natal>=40?4:natal>=32?5:natal>=24?6:7;
 const t=IOS_TEXT.wealth,assessment=renderWealthAnalysis({main,expansion,natal,period,transit,dashaNames,c},en);
 const prediction=template(t[en?30:31],{natalEn:t[nIndex],natalMm:t[8+nIndex],retention:t[retention>=7?(en?16:17):retention>=4?(en?18:19):(en?20:21)],activation:t[period>=17?(en?22:23):period>=13?(en?24:25):period>=9?(en?26:27):(en?28:29)]});
 return{prediction,analysis:assessment};
}

function wealthTransitScore(result,sig){const positions=result.wealthTransitLongitudes;if(!positions)return 0;let confirmations=0;for(const index of [4,6,7]){const longitude=positions[index];if(!Number.isFinite(longitude))continue;const lords=lordsFor(longitude),star=sig.find(p=>p.planet.name===lords.starLord),sub=sig.find(p=>p.planet.name===lords.subLord),a=strongest(star,[2,6,10,11]),b=strongest(sub,[2,6,10,11]);if(a<=0||b<=0||a+b<4)continue;const source=Math.floor(longitude/30),aspects=index===4?[5,7,9]:index===6?[3,7,10]:[7];if([2,6,10,11].some(h=>{const target=Math.floor(result.cusps[h-1].longitude/30);return source===target||aspects.includes((target-source+12)%12+1);}))confirmations++;}return Math.min(3,confirmations);}

function renderWealthAnalysis(v,en){
 const lines=hs=>hs.map(h=>{const p=v.c[h];if(!p)return null;return en?`- Cusp ${h}: Sub Lord ${name(p.planet.name,true)}; signifies ${combined(p,true)}.`:`- ${mm(h)} တန့် - ဘာဝသန္ဓိဘုတ္တိနက္ခတ်သခင်ဂြိုဟ် ${p.planet.name}၊ အကျိုးဆောင်ဘာဝ ${combined(p,false)} တန့်။`;}).filter(Boolean).join('\n');
 const main=en?(v.main>=32?'The core income, work and gain houses form a strong financial chain.':v.main>=22?'The core financial houses provide moderate support, so steady progress is more likely than sudden wealth.':'The core financial chain is weak or mixed, so income may require more planning and persistence.'):(v.main>=32?'ဝင်ငွေ၊ အလုပ်နဲ့ အမြတ်ကိုပြတဲ့ အဓိကအကျိုးဆောင််ဘာဝတွေ အားကောင်းကောင်းနဲ့ ချိတ်ဆက်ထားပါတယ်။':v.main>=22?'အဓိကငွေကြေးဓနဥစ္စာဆိုင်ရာ အကျိုးဆောင်ဘာဝတွေက အသင့်အတင့်အားပေးထားလို့ ရုတ်တရက်ချမ်းသာတာမျိုးထက် တဖြည်းဖြည်းနဲ့ ခြေတစ်လှမ်းချင်း၊ လှေကားတစ်ထစ်ချင်း ကြိုးစားရင်း တိုးတက်ကြီးပွားမယ့်ပုံစံဘက်ကို ပိုပြီးအားသာပါတယ်။':'စီးပွားရေးနဲ့ ငွေကြေးကံဇာတာပိုင်းမှာ အဆိုးအကောင်းဒွန်တွဲနေတာကြောင့် ဝင်ငွေမှန်မှန်နဲ့ တည်တည်ငြိမ်ငြိမ်ရရှိဖို့ဆိုရင်စနစ်တကျ စီမံကိန်းချလုပ်ဆောင်တာနဲ့ စိတ်ရှည်သည်းခံမှု ရေရှည်ထားဖိို့ လိုအပ်ပါလိမ့်မယ်။');
 const expansion=en?(v.expansion>=12?' Property, investment and business expansion also receive strong support.':v.expansion>=7?' Property and expansion opportunities are present, but they should be developed gradually.':' Large expansion is less supported, so protecting capital is important.'):(v.expansion>=12?' အိမ်ခြံမြေ၊ ရင်းနှီးမြှုပ်နှံမှုနဲ့ လုပ်ငန်းတိုးချဲ့ဖို့အတွက် ကံဇာတာ အတော်လေး အားကောင်းနေပါတယ်။':v.expansion>=7?' အိမ်ခြံမြေနဲ့ လုပ်ငန်းတိုးချဲ့ဖို့ အခွင့်အလမ်းရှိပေမယ့် အလျင်မလိုဘဲ တဖြည်းဖြည်းချင်း သွားတာ ပိုစိတ်ချရပါလိမ့်မယ်။':' လုပ်ငန်းကို အကြီးအကျယ် တိုးချဲ့ဖို့ မသင့်သေးပါဘူး၊ ရင်းနှီးထားတဲ့ အရင်းအနှီး မနစ်နာအောင် ထိန်းပြီးတည်ငြိမ်အောင်လုပ်ဖို့က ပိုအရေးကြီးပါတယ်။');
 let text=en?`Core financial indicators\n${lines([2,6,10,11])}\n\nProperty and growth support\n${lines([4,5,7,9])}\n\nOverall KP assessment\n${main}${expansion} Natal wealth score: ${v.natal}/80.`:`အဓိကငွေကြေးဘာဝများ\n${lines([2,6,10,11])}\n\nပိုင်ဆိုင်မှုနဲ့ တိုးချဲ့နိုင်မှုအထောက်အပံ့\n${lines([4,5,7,9])}\n\nKP အင်အားသုံးသပ်ချက်\n${main}${expansion} မူလငွေကြေးကံအင်အားက ${mm(v.natal)}/${mm(80)} ဖြစ်ပါတယ်။`;
 if(v.dashaNames.length===3){const activation=en?(v.period>=17?'strongly activates':v.period>=13?'clearly supports':v.period>=9?'moderately supports':'does not yet fully activate'):(v.period>=17?'အားကောင်းစွာ ဖွင့်ပေးနေတယ်':v.period>=13?'သိသိသာသာ အားပေးနေတယ်':v.period>=9?'အသင့်အတင့် အားပေးနေတယ်':'အပြည့်အဝ မဖွင့်ပေးသေးဘူး');text+=en?`\n\nCurrent Dasa and transit\n${name(v.dashaNames[0],true)} Maha Dasa, ${name(v.dashaNames[1],true)} Bhukti Dasa, ${name(v.dashaNames[2],true)} Antara Dasa. This period ${activation} the natal wealth promise (${v.period}/20), with ${v.transit}/3 transit confirmations.`:`\n\nလက်ရှိဒသာနဲ့ ကောဇာ\n${v.dashaNames[0]} ထူလဒသာ၊ ${v.dashaNames[1]} ဘုတ္တိဒသာ၊ ${v.dashaNames[2]} အန္တရဒသာ။ ဒီကာလက မူလငွေကြေးကံကို ${activation}။ လက်ရှိဒသာကာလအင်အား ${mm(v.period)}/${mm(20)} ရှိပြီး ကောဇာအရ ငွေကြေးကံအတည်ပြုချက် ${mm(v.transit)}/${mm(3)} ရှိပါတယ်။`;}
 return text;
}

export function iosDebtReading(result,sig,en){
 const sixth=cusp(result,sig,6),second=cusp(result,sig,2),eleventh=cusp(result,sig,11);
 if(!sixth||!second||!eleventh)return null;
 const score=(p,hs)=>hs.reduce((n,h)=>n+level(p,h),0),pressure=score(sixth,[6,8,12]);
 if(pressure<=0)return null;
 const now=Date.now(),horizon=new Date().setFullYear(new Date().getFullYear()+5),timeline=dashaTimeline(result.planets[1].longitude,result.utc),risk=[];
 const periods=[];for(const maha of timeline){if(Date.parse(maha.end)<=now||Date.parse(maha.start)>=horizon)continue;for(const bhukti of maha.children){if(Date.parse(bhukti.end)<=now||Date.parse(bhukti.start)>=horizon)continue;for(const antara of bhukti.children){if(Date.parse(antara.end)<=now||Date.parse(antara.start)>=horizon)continue;const active=[maha,bhukti,antara].map(x=>sig.find(p=>p.planet.name===x.lord));if(active.some(x=>!x))continue;const danger=active.map(p=>score(p,[6,8,12])),gain=active.map(p=>score(p,[2,11]));periods.push({start:Date.parse(antara.start),end:Date.parse(antara.end),danger,gain});if(danger.filter((x,i)=>x>gain[i]).length>=2&&danger.reduce((a,b)=>a+b,0)>gain.reduce((a,b)=>a+b,0))risk.push(periods.at(-1));}}}
 if(!risk.length)return null;
 const zone=Number(result.profile.tz)||0,fmt=timestamp=>{const date=new Date(timestamp+zone*3600000);return`${String(date.getUTCDate()).padStart(2,'0')}.${String(date.getUTCMonth()+1).padStart(2,'0')}.${date.getUTCFullYear()}`;};
 const range=(p,after)=>`${fmt(Math.max(p.start,after))}${en?' to ':' မှ '}${fmt(Math.min(p.end,horizon)-1000)}${en?'':' အထိ'}`;
 const dates=risk.slice(0,2).map(p=>range(p,now)).join(en?', ':'၊ ');
 let prediction=en?`Periods to watch for debt: ${dates}. Expenses or borrowing can rise during these periods. Whatever the reason, avoiding debt where possible is usually the more peaceful choice.`:`အကြွေးတင်နိုင်လို့ သတိထားသင့်တဲ့ကာလတွေက ${dates} တို့ဖြစ်ပါတယ်ခင်ဗျာ။ ဒီကာလတွေမှာ အသုံးစရိတ်ကြောင့် အကြွေးတင်တာမျိုးဖြစ်တတ်လို့ ပိုသတိထားပေးပါ။ ဘယ်အကြောင်းကိစ္စကြောင့်ပဲဖြစ်ဖြစ် အကြွေးမထားနိုင်တာက စိတ်ချမ်းသာရာ ပိုရပါတယ်ခင်ဗျာ။`;
 const secondSupport=score(second,[2,11]),eleventhSupport=score(eleventh,[2,11]),canRepay=secondSupport>0&&eleventhSupport>0&&secondSupport+eleventhSupport>pressure;
 if(!canRepay){prediction+=en?'\n\nA reliable ability to clear a new debt is not clear enough here. Check actual income and repayments before borrowing.':'\n\nလက်ရှိဇာတာအရ အကြွေးသစ်ကို ပြန်ဆပ်နိုင်စွမ်း သိသိသာသာမပြတ်သားသေးပါဘူးခင်ဗျာ။ အကြွေးမယူခင် လက်တွေ့ဝင်ငွေနဲ့ လစဉ်ပြန်ဆပ်ရမယ့်ငွေကို သေချာချိန်ဆပေးပါ။';}
 else{prediction+=en?'\n\nHowever, income and gains indicate an ability to repay debt.':'\n\nသို့သော် ဇာတာရှင်အနေနဲ့ ဝင်ငွေနဲ့ အကျိုးအမြတ်ပေါ်မူတည်ပြီး အကြွေးကို ပြန်လည်ဆပ်နိုင်စွမ်းရှိပါတယ်ခင်ဗျာ။';const afterRisk=risk[0].end;const repayments=periods.filter(p=>p.end>afterRisk&&p.gain.filter((x,i)=>x>p.danger[i]).length>=2&&p.gain.reduce((a,b)=>a+b,0)>p.danger.reduce((a,b)=>a+b,0)).slice(0,2);if(repayments.length){const dates=repayments.map(p=>range(p,afterRisk)).join(en?', ':'၊ ');prediction+=en?` A more supportive repayment period follows: ${dates}. With actual income and a manageable repayment plan, the debt can be reduced during these periods; there is no need for undue worry.`:` အကြွေးဖိအားကာလနောက်ပိုင်း ပြန်လည်ဆပ်နိုင်ဖို့ အားကောင်းတဲ့ကာလတွေက ${dates} တို့ဖြစ်ပါတယ်ခင်ဗျာ။ ဒီကာလတွေမှာ ဝင်ငွေနဲ့ကိုက်ညီတဲ့အစီအစဉ်နဲ့ အကြွေးကို ပြန်လည်ဆပ်နိုင်တဲ့အခြေအနေရှိလို့ အလွန်အကျွံစိတ်ပူနေစရာ မလိုပါဘူးခင်ဗျာ။`;}
 else prediction+=en?' A distinct repayment date after the debt-pressure period is not clear in the next five years; set the repayment plan by actual income.':' အကြွေးဖိအားကာလနောက်ပိုင်း ပြန်ဆပ်နိုင်မယ့်ရက်ကို လာမယ့် ၅ နှစ်အတွင်း သီးသန့်မတွေ့ရသေးလို့ လက်တွေ့ဝင်ငွေပေါ်မူတည်ပြီး ပြန်ဆပ်မယ့်အစီအစဉ်ကို ချမှတ်ပေးပါ။';}
 return{prediction,analysis:''};
}

export function iosLumpSumReading(result,sig,en){
 const money=cusp(result,sig,2),chance=cusp(result,sig,5),inheritance=cusp(result,sig,8),gain=cusp(result,sig,11);
 const missing=en?'The natal chart is incomplete. Please calculate it again.':'မူလဇာတာအချက်အလက် မပြည့်စုံသေးပါ။ ဇာတာကို ပြန်တွက်ပေးပါ။';
 if(!money||!chance||!inheritance||!gain)return{prediction:missing,analysis:missing};
 const linked=(p,hs)=>hs.reduce((n,h)=>n+level(p,h),0),positive=p=>linked(p,[2,5,8,11]),loss=p=>level(p,6)+level(p,12)*2;
 const inheritanceScore=linked(inheritance,[2,8,11])*3+linked(money,[8,11])+linked(gain,[2,8]);
 const lotteryScore=linked(chance,[2,5,8,11])*3+linked(gain,[5,8])+linked(money,[5,11]);
 const benefitScore=linked(gain,[2,7,8,11])*2+linked(money,[7,8,11])+linked(inheritance,[2,11]);
 const unexpectedScore=linked(inheritance,[2,8,11])*2+linked(gain,[2,8,11])*2;
 const sources=[['inheritance',inheritanceScore],['lottery',lotteryScore],['benefit',benefitScore],['unexpected',unexpectedScore]];
 const source=sources.reduce((best,row)=>row[1]>=best[1]?row:best)[0];
 const support=positive(money)*2+positive(inheritance)*3+positive(gain)*3+positive(chance);
 const lossScore=loss(money)+loss(chance)+loss(inheritance)*2+loss(gain)*2;
 const basic=(level(inheritance,8)>0||level(chance,5)>0)&&level(gain,11)>0&&(level(money,2)>0||level(gain,2)>0),margin=support-lossScore;
 const tier=!basic||margin<=0?0:level(inheritance,8)>=2&&level(gain,11)>=2&&margin>=32?3:margin>=20?2:1;
 const periodScore=n=>{const p=sig.find(x=>x.planet.name===n);if(!p)return-100;let score=level(p,2)*3+level(p,8)*3+level(p,11)*4;if(source==='lottery')score+=level(p,5)*3;if(source==='benefit')score+=level(p,7)*2;return score-loss(p)*2;};
 const now=Date.now(),horizon=new Date().setFullYear(new Date().getFullYear()+10);let best=null;
 if(tier>0)for(const maha of dashaTimeline(result.planets[1].longitude,result.utc)){if(Date.parse(maha.end)<=now||Date.parse(maha.start)>=horizon)continue;const m=periodScore(maha.lord);if(m<=0)continue;for(const bhukti of maha.children){if(Date.parse(bhukti.end)<=now||Date.parse(bhukti.start)>=horizon)continue;const b=periodScore(bhukti.lord);if(b<=0)continue;for(const antara of bhukti.children){if(Date.parse(antara.end)<=now||Date.parse(antara.start)>=horizon)continue;const a=periodScore(antara.lord);if(a<=0)continue;const score=m*4+b*3+a*2,start=Math.max(now,Date.parse(antara.start)),end=Math.min(horizon,Date.parse(antara.end));if(!best||score>best.score||(score===best.score&&start<best.start))best={start,end,score,lords:[maha.lord,bhukti.lord,antara.lord]};}}}
 const sourceNames={inheritance:['အမွေ သို့မဟုတ် မိသားစုပိုင်ဆိုင်မှုမှ ငွေအဖြစ်ရရှိခြင်း','inheritance or family property converted into money'],lottery:['ထီဆု သို့မဟုတ် ကံစမ်းဆုငွေ','lottery or a prize-based windfall'],benefit:['အကျိုးခံစားခွင့်၊ လက်ဆောင်၊ လျော်ကြေး သို့မဟုတ် အိမ်ထောင်ဖက်/မိတ်ဖက်မှ ရရှိငွေ','a benefit, gift, settlement or partner-supported gain'],unexpected:['မမျှော်လင့်ထားသောငွေဝင်မှု သို့မဟုတ် တစ်ကြိမ်တည်းရရှိငွေ','an unexpected gain or one-time payment']};
 const amounts=[['ငွေအစုလိုက်အပြုံလိုက်ရမယ့်ကံ မထင်ရှားသေးခြင်း','no clear lump-sum promise'],['တစ်ကြိမ်တည်း ငွေအနည်းငယ်မှ အလတ်စားရမယ့်အဆင့်','modest one-time gain'],['ငွေပမာဏအသင့်အတင့်များတဲ့အဆင့်','substantial lump sum'],['ငွေပမာဏကြီးမားတဲ့အဆင့်','major lump sum']];
 const zone=Number(result.profile.tz)||0,fmt=stamp=>{const d=new Date(stamp+zone*3600000);return`${d.getUTCDate()}.${d.getUTCMonth()+1}.${d.getUTCFullYear()}`;};
 const timing=best?(en?`The strongest upcoming period is ${fmt(best.start)} to ${fmt(best.end)} (${best.lords.map(n=>name(n,true)).join('–')}).`:`ငွေအစုလိုက်ရနိုင်ခြေ ပိုအားကောင်းတဲ့ကာလက ${fmt(best.start)} မှ ${fmt(best.end)} အတွင်း ဖြစ်ပါတယ်ခင်ဗျာ။`):(en?'No clearly supportive Dasha–Bhukti–Antara interval appears within the next ten years.':'လာမယ့် ၁၀ နှစ်အတွင်း ငွေအစုလိုက်အပြုံလိုက်ရနိုင်မယ့် ထင်ရှားတဲ့ကာလ မတွေ့ရသေးပါဘူးခင်ဗျာ။');
 const lead=en?(tier===0?'The natal chart does not show a clear promise of receiving a large lump sum.':!best?'The chart has lump-sum indicators, but without a qualifying period this is not a confirmed yes.':`The natal chart supports a lump-sum gain. The strongest route is ${sourceNames[source][1]}, and its likely scale is a ${amounts[tier][1]}.`):(tier===0?'မူလဇာတာအရ ငွေအစုလိုက်အပြုံလိုက်ရမယ့်ကံ ထင်ရှားမနေသေးပါဘူးခင်ဗျာ။':!best?'ဇာတာရှင်မှာ ငွေအစုလိုက်ရနိုင်တဲ့ အလားအလာရှိပေမယ့် ဘယ်အချိန်ရမယ်ဆိုတာ မထင်ရှားသေးပါဘူးခင်ဗျာ။':`ဇာတာရှင်မှာ ငွေအစုလိုက်အပြုံလိုက်ရရှိနိုင်တဲ့ကံ ရှိပါတယ်ခင်ဗျာ။ အားအကောင်းဆုံးရရှိနိုင်တဲ့လမ်းကြောင်းက ${sourceNames[source][0]} ဖြစ်ပြီး ရရှိနိုင်တဲ့ပမာဏက ${amounts[tier][0]} ဖြစ်ပါတယ်ခင်ဗျာ။`);
 const prediction=en?`${lead}\n\nStrongest period\n${timing}\n\nEven when a gain is promised, houses 6 and 12 can redirect part of it toward debt, disputes or expenses.`:`${lead}\n\nအင်အားအကောင်းဆုံးကာလ\n${timing}${tier>0?'\n\nငွေရလာတဲ့အခါ အကြွေးဆပ်ရတာ၊ အငြင်းပွားမှုဖြေရှင်းရတာနဲ့ အခြားကုန်ကျစရိတ်တွေကြောင့် လက်ထဲကျန်မယ့်ပမာဏ လျော့နိုင်ပါတယ်ခင်ဗျာ။':''}`;
 const analysis=en?`The 2nd cusp is used for money held, the 8th for inheritance and unearned or unexpected assets, and the 11th for realised gain. The 5th distinguishes lottery and speculation. Their cusp sub-lords are compared against houses 6 and 12 for debt, dispute and loss pressure. Support ${support}, loss ${lossScore}.`:`၂ တန့်ကို လက်ဝယ်ရရှိငွေနဲ့ စုဆောင်းပိုင်ဆိုင်မှုအတွက်၊ ၈ တန့်ကို အမွေ၊ သူတစ်ပါးပိုင်ငွေကြေးနဲ့ မမျှော်လင့်တဲ့ပိုင်ဆိုင်မှုအတွက်၊ ၁၁ တန့်ကို အကျိုးအမြတ်အမှန်တကယ်ရရှိမှုအတွက် စစ်ထားပါတယ်။ ၅ တန့်နဲ့ ထီ၊ ကံစမ်းမှုလမ်းကြောင်းကို ခွဲခြားပြီး ၆ တန့်၊ ၁၂ တန့်ရဲ့ အကြွေး၊ အငြင်းပွားမှုနဲ့ ဆုံးရှုံးမှုဖိအားကို နှိုင်းယှဉ်ရာ အားပေးချက် ${support}၊ ဆုံးရှုံးမှုဖိအား ${lossScore} ရပါတယ်။`;
 return{prediction,analysis};
}

export function iosCareerChangeReading(result,sig,en){
 const tenth=cusp(result,sig,10),sixth=cusp(result,sig,6),eleventh=cusp(result,sig,11),seventh=cusp(result,sig,7);
 if(!tenth)return{prediction:en?'The natal chart is incomplete. Please calculate it again.':'မူလဇာတာအချက်အလက် မပြည့်စုံသေးပါ။ ဇာတာကို ပြန်တွက်ပေးပါ။',analysis:''};
 const primary=[2,6,10,11],supportive=[3,9],obstacles=[...new Set([5,8,12])];
 const strengths=Array.from({length:13},(_,h)=>level(tenth,h)*2+level(sixth,h)+level(eleventh,h));
 const primaryScore=primary.reduce((n,h)=>n+strengths[h],0),supportScore=supportive.reduce((n,h)=>n+strengths[h],0),obstacleScore=obstacles.reduce((n,h)=>n+strengths[h],0),support=primaryScore*2+supportScore;
 const verdict=primaryScore===0?'weak':support>=obstacleScore+3?'strong':obstacleScore>=support+3?'weak':'mixed';
 const predictionText=en?(verdict==='strong'?'Income, service, profession and fulfilment houses are well connected. The chart supports employment, responsibility and steady professional progress.':verdict==='mixed'?'Career growth is available, but changes of role, delays or uneven recognition may occur. Progress comes through specialization, persistence and well-timed decisions.':'The main career houses are weakly connected. Work is still possible, but the native may need to create opportunities, retrain or change direction before finding stability.'):(verdict==='strong'?'အလုပ်အကိုင်ရရှိပြီး တာဝန်ပိုယူရတဲ့နေရာအထိ တိုးတက်နိုင်မယ့် အခွင့်အလမ်းကောင်းရှိပါတယ်ခင်ဗျာ။ ကြိုးစားမှုကို ဆက်ထိန်းနိုင်ရင် ဝင်ငွေလည်း တဖြည်းဖြည်းတိုးနိုင်ပါတယ်။':verdict==='mixed'?'အလုပ်အကိုင်တိုးတက်နိုင်ပေမယ့် ရာထူးတာဝန်ပြောင်းတာ၊ အသိအမှတ်ပြုခံရဖို့ကြန့်ကြာတာ ဒါမှမဟုတ် တိုးတက်မှုမညီတာမျိုး ရှိနိုင်ပါတယ်။ အထူးပြုကျွမ်းကျင်မှုနဲ့ အချိန်ကိုက်ဆုံးဖြတ်မှုက အရေးကြီးပါတယ်။':'အလုပ်အကိုင်တည်ငြိမ်ဖို့ အချိန်ယူရနိုင်ပါတယ်ခင်ဗျာ။ ကျွမ်းကျင်မှုအသစ်သင်ခြင်း၊ အခွင့်အလမ်းအသစ်ရှာခြင်း ဒါမှမဟုတ် လုပ်ငန်းလမ်းကြောင်းပြောင်းခြင်းကနေ တိုးတက်နိုင်ပါတယ်။');
 const progress=primary.reduce((n,h)=>n+level(tenth,h),0),disruption=[5,8,12].reduce((n,h)=>n+level(tenth,h),0),independent=[7,10,11].reduce((n,h)=>n+level(seventh,h),0);
 let extra=en?(progress>disruption?'The employment and gain houses favour a constructive job change or promotion. Compare confirmed income and responsibilities before accepting.':disruption>progress?'The change and loss houses are prominent. A role ending or forced change is possible in unfavourable Dasha periods; keep an alternative income plan ready.':'Career growth and change indicators are balanced. Confirm the next role before resigning from the present one.'):(progress>disruption?'အလုပ်ပြောင်းခြင်း ဒါမှမဟုတ် ရာထူးတိုးခြင်းက ဝင်ငွေနဲ့ တိုးတက်မှုအတွက် အကျိုးရှိနိုင်ပါတယ်ခင်ဗျာ။ အလုပ်သစ်ရဲ့ ဝင်ငွေနဲ့ တာဝန်ကို အတည်ပြုပြီးမှ လက်ခံပါ။':disruption>progress?'အလုပ်ရပ်နားရခြင်း ဒါမှမဟုတ် မိမိမရွေးချယ်ဘဲ အလုပ်ပြောင်းရခြင်းမျိုး ကြုံနိုင်ပါတယ်ခင်ဗျာ။ အဲဒီလိုအပြောင်းအလဲဖြစ်လာရင် အသုံးစရိတ်မထိခိုက်အောင် အစားထိုးဝင်ငွေလမ်းကြောင်းကို ကြိုပြင်ထားပါ။':'အလုပ်တိုးတက်မှုနဲ့ အပြောင်းအလဲဘက် အားချင်းနီးနေပါတယ်ခင်ဗျာ။ လက်ရှိအလုပ်က ထွက်မီ အလုပ်သစ်အတည်ပြုချက်ရအောင် စောင့်ပါ။');
 if(independent>0)extra+=en?' Partnership or self-employment also has support, subject to costs and contracts.':' မိတ်ဖက်လုပ်ငန်း ဒါမှမဟုတ် ကိုယ်ပိုင်လုပ်ငန်းဘက်မှာလည်း အထောက်အပံ့ရှိပေမယ့် ကုန်ကျစရိတ်နဲ့ စာချုပ်ကို စစ်ပြီးမှ စတင်ပါ။';
 const evidence=hs=>hs.filter(h=>strengths[h]>0).sort((a,b)=>strengths[b]-strengths[a]||a-b),supporting=[...evidence(primary),...evidence(supportive)],pressuring=evidence(obstacles);
 const verdictText=en?({strong:'strongly promised',mixed:'promised with mixed support and delay factors',weak:'not strongly promised by the principal cusps'})[verdict]:({strong:'မူလကံဇာတာအားကောင်းပါတယ်',mixed:'အခွင့်အလမ်းရှိပေမယ့် အားပေးချက်နဲ့ နှောင့်နှေးစေတဲ့အချက်တွေ ရောနေပါတယ်',weak:'အဓိကဘာဝသန္ဓိတွေအရ မူလကံဇာတာအားနည်းနေပါတယ်'})[verdict];
 const summary=en?`Foundational natal promise\nThe 10th cusp Sub Lord is the primary judge. The Sub Lords of 6th cusp and 11th cusp provide confirmation. The chart shows that career progress is ${verdictText}. Supporting houses: ${supporting.join(', ')||'none'}. Obstructing houses: ${pressuring.join(', ')||'none'}.`:`မူလကံအခြေအနေ\n၁၀ တန့်ရဲ့ ဘာဝသန္ဓိဘုတ္တိနက္ခတ်သခင်ဂြိုဟ်ကို အဓိကထားပြီး ၆ တန့်နဲ့ ၁၁ တန့်တို့ကို ထပ်မံအတည်ပြုထားပါတယ်။ အလုပ်အကိုင်တိုးတက်မှုဆိုင်ရာ ${verdictText}။ အားပေးနေတဲ့ဘာဝတွေက ${supporting.map(mm).join(', ')||'မတွေ့ပါ'} ဖြစ်ပြီး၊ နှောင့်နှေးစေတဲ့ဘာဝတွေက ${pressuring.map(mm).join(', ')||'မတွေ့ပါ'} ဖြစ်ပါတယ်။`;
 const lines=[10,6,11].map(h=>{const p=cusp(result,sig,h);if(!p)return null;const agency=[...new Set(p.representatives.map(x=>x.name))];const sentence=en?`The ${h}th cusp Sub Lord is ${name(p.planet.name,true)}, it is placed in the Star of ${name(p.planet.lords.starLord,true)}, and it signifies houses ${combined(p,true)}.`:`${mm(h)} တန့်ဘာဝသန္ဓိဘုတ္တိနက္ခတ်သခင်ဂြိုဟ်ဟာ ${p.planet.name} ဖြစ်ပြီး ${p.planet.lords.starLord}နက္ခတ်ကို စီးထားကာ ${combined(p,false)} တန့်ဘာဝတွေကို အကျိုးဆောင်ထားပါတယ်။`;return sentence+(agency.length?(en?` Under the Rahu/Ketu agency rule, houses delegated through ${agency.map(n=>name(n,true)).join(', ')} are included as well.`:` ရာဟု/ကိတ်ကိုယ်စားလှယ်စည်းမျဉ်းအရ ${agency.join('၊ ')} တို့ရဲ့ဘာဝတွေကိုလည်း ကိုယ်စားလှယ်ဘာဝအဖြစ် ထည့်တွက်ထားပါတယ်။`):'');}).filter(Boolean).join('\n');
 return{prediction:`${predictionText}\n\n${extra}`,analysis:`${summary}\n\n${lines}`};
}
