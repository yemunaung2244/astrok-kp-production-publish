import { dashaTimeline } from './kp-dasha.js';
import { planetLabel } from './locale.js';

// Port of KPEducationReadingEngine: natal permission, level, direction and period events.
const SUBJECTS={
  computerEngineering:['computer engineering, electronics or embedded systems','Computer Engineering၊ Electronics ဒါမှမဟုတ် Embedded Systems'],
  it:['IT, software, data, AI or communication technology','IT၊ Software၊ Data၊ AI ဒါမှမဟုတ် Communication Technology'],
  engineering:['mechanical, civil or applied engineering','Mechanical၊ Civil ဒါမှမဟုတ် Applied Engineering'],
  medicine:['medicine, health science, pharmacy or clinical research','ဆေးပညာ၊ ကျန်းမာရေးသိပ္ပံ၊ ဆေးဝါး ဒါမှမဟုတ် Clinical Research'],
  law:['law, public policy or administration','ဥပဒေ၊ Public Policy ဒါမှမဟုတ် အုပ်ချုပ်ရေး'],
  accounting:['accounting, commerce or business analytics','Accounting၊ Commerce ဒါမှမဟုတ် Business Analytics'],
  communication:['languages, writing, communication or media','ဘာသာစကား၊ စာရေးခြင်း၊ Communication ဒါမှမဟုတ် Media'],
  mathematics:['mathematics, statistics or data','သင်္ချာ၊ စာရင်းအင်း ဒါမှမဟုတ် Data'],
  teaching:['teaching, education or higher study','သင်ကြားရေး၊ ပညာရေး ဒါမှမဟုတ် အဆင့်မြင့်ပညာ'],
  finance:['finance, banking or economics','Finance၊ Banking ဒါမှမဟုတ် Economics'],
  architecture:['architecture or structural design','Architecture ဒါမှမဟုတ် Structural Design'],
  creative:['graphic design, media or digital content','Graphic Design၊ Media ဒါမှမဟုတ် Digital Content'],
  research:['research, psychology or deep analytical study','သုတေသန၊ စိတ်ပညာ ဒါမှမဟုတ် နက်နဲတဲ့ခွဲခြမ်းစိတ်ဖြာပညာ'],
  applied:['an applied or specialized discipline matching demonstrated aptitude','လက်တွေ့ထူးချွန်မှုနဲ့ကိုက်ညီတဲ့ အသုံးချပညာ ဒါမှမဟုတ် အထူးပြုဘာသာ']
};
const LEVELS={
  research:['The strongest attainable pattern reaches research, PhD or a deep postgraduate specialization when the matching Dasha and a real opportunity are present.','သက်ဆိုင်ရာဒသာကာလနဲ့ လက်တွေ့အခွင့်အလမ်းရလာရင် သုတေသန၊ PhD ဒါမှမဟုတ် နက်နဲတဲ့ဘွဲ့လွန်အထူးပြုပညာအထိ တက်လှမ်းနိုင်တဲ့အလားအလာရှိပါတယ်။'],
  postgraduate:['The chart most strongly supports postgraduate study, an advanced professional degree or a specialized diploma after university.','တက္ကသိုလ်ဘွဲ့ပြီးနောက် Master၊ ဘွဲ့လွန်သင်တန်း ဒါမှမဟုတ် အထူးပြု Diploma တစ်ခုအထိ ဆက်လက်တက်နိုင်မှုကို အားအကောင်းဆုံးပြထားပါတယ်။'],
  university:['University education and completion of a degree or equivalent professional qualification are most clearly supported.','တက္ကသိုလ်အဆင့်ပညာရေးနဲ့ ဘွဲ့ ဒါမှမဟုတ် အလားတူ Professional qualification တစ်ခု ပြီးမြောက်နိုင်မှုကို အထင်ရှားဆုံးပြထားပါတယ်။'],
  basic:['Completion of basic formal education is clearest; further progress depends on specialization, timing and sustained effort.','ပုံမှန်အခြေခံပညာရေးပြီးမြောက်နိုင်မှုက အထင်ရှားဆုံးဖြစ်ပြီး ပိုမိုဆက်တက်နိုင်မှုက ဘာသာရပ်ရွေးချယ်မှု၊ အချိန်ကာလနဲ့ ဆက်တိုက်ကြိုးစားမှုအပေါ် မူတည်ပါတယ်။'],
  applied:['Applied education, skills, short courses and staged professional certificates are the more realistic route.','လက်တွေ့အသုံးချပညာ၊ Skill training၊ ကာလတိုသင်တန်းနဲ့ အဆင့်လိုက်ယူနိုင်တဲ့ Professional certificate တွေက ပိုလက်တွေ့ကျတဲ့လမ်းကြောင်းဖြစ်ပါတယ်။']
};
const EVENTS={
  research:['Research, a doctorate or an important postgraduate specialization is most likely during this period.','ဒီကာလမှာ သုတေသန၊ ပါရဂူဘွဲ့ ဒါမှမဟုတ် အရေးပါတဲ့ ဘွဲ့လွန်အထူးပြုပညာတစ်ခု ဆက်လုပ်နိုင်ခြေများပါတယ်ခင်ဗျာ။'],
  foreign:['Overseas study or an international program is most likely during this period.','ဒီကာလမှာ နိုင်ငံခြားပညာသင်ခြင်း ဒါမှမဟုတ် နိုင်ငံတကာသင်တန်းတက်ခြင်း ဖြစ်နိုင်ခြေများပါတယ်ခင်ဗျာ။'],
  scholarship:['A scholarship, merit selection or higher-study support is most likely during this period.','ဒီကာလမှာ ပညာသင်ဆု ဒါမှမဟုတ် အရည်အချင်းအလိုက် အထောက်အပံ့ရနိုင်ခြေများပါတယ်ခင်ဗျာ။'],
  exam:['An examination, entrance test or competitive selection is most likely to go well during this period.','ဒီကာလမှာ စာမေးပွဲ၊ ဝင်ခွင့် ဒါမှမဟုတ် ယှဉ်ပြိုင်ရွေးချယ်မှု အောင်မြင်နိုင်ခြေများပါတယ်ခင်ဗျာ။'],
  admission:['University admission, higher-education progress or graduation is most likely during this period.','ဒီကာလမှာ တက္ကသိုလ်ဝင်ခွင့်၊ အဆင့်မြင့်ပညာတိုးတက်မှု ဒါမှမဟုတ် ဘွဲ့ပြီးမြောက်မှု ဖြစ်နိုင်ခြေများပါတယ်ခင်ဗျာ။'],
  continuation:['Steady study, course completion or a return to education is most likely during this period.','ဒီကာလမှာ ပညာရေးဆက်လက်သွားနိုင်ခြင်း၊ သင်တန်းပြီးမြောက်ခြင်း ဒါမှမဟုတ် ပြန်လည်ဆက်သင်ခြင်း ဖြစ်နိုင်ခြေများပါတယ်ခင်ဗျာ။'],
  interruption:['A pause or change of school or subject is possible; it need not be a permanent end to study.','ဒီကာလမှာ ပညာရေးခေတ္တရပ်နားရခြင်း၊ ကျောင်း ဒါမှမဟုတ် ဘာသာရပ်ပြောင်းရခြင်း ဖြစ်နိုင်ပါတယ်ခင်ဗျာ။ ပညာရေးအပြီးတိုင်ဆုံးသွားခြင်းလို့ မဆိုလိုပါဘူး။']
};
const PICK=(pair,en)=>pair[en?0:1];
const strength=(p,h)=>{const i=p?.levels.findIndex(hs=>hs.includes(h))??-1;return i<0?0:Math.max(1,4-i);};
const weighted=(p,hs)=>hs.reduce((n,h)=>n+strength(p,h),0);
const count=(p,hs)=>hs.filter(h=>strength(p,h)>0).length;
const all=(p,hs)=>!!p&&hs.every(h=>strength(p,h)>0);
const allAcross=(ps,hs)=>hs.every(h=>ps.some(p=>strength(p,h)>0));
const subjectDirection=(leading,houses)=>{
  const p=i=>leading.has(i),h=hs=>hs.every(x=>houses.has(x));
  if(p(2)&&p(3)&&p(7)&&h([5,9]))return'computerEngineering';
  if(p(3)&&p(7)&&h([3,5,9])&&(houses.has(10)||houses.has(11)))return'it';
  if(p(2)&&p(6)&&h([4,9]))return'engineering';
  if((p(2)||p(0)||p(4))&&h([4,5,6,9,10,11])&&(houses.has(8)||houses.has(12)))return'medicine';
  if(p(4)&&(p(0)||p(6))&&h([6,9,10,11]))return'law';
  if(p(3)&&h([2,6,10]))return'accounting';
  if(p(3)&&h([3,5,9]))return'communication';
  if(p(3)&&p(6))return'mathematics';
  if(p(4)&&h([2,5,9]))return'teaching';
  if(p(4)&&h([2,11]))return'finance';
  if(p(5)&&p(2)&&p(6))return'architecture';
  if(p(5)&&p(3))return'creative';
  if((p(7)||p(8)||p(4))&&h([5,8,9]))return'research';
  return'applied';
};

function analyze(result,planets){
  const cusps={};
  for(const n of [2,4,5,9,10,11])cusps[n]=planets.find(p=>p.planet.name===result.cusps.find(c=>c.number===n)?.lords.subLord);
  const fourth=cusps[4],ninth=cusps[9];
  const educationCusps=[2,4,5,9,10,11].map(n=>cusps[n]).filter(Boolean);
  const levelCusps=[4,5,9,11,2].map(n=>cusps[n]).filter(Boolean);
  const support=weighted(fourth,[2,4,5,9,11]),obstruction=weighted(fourth,[3,8,12]);
  const permission=support>=obstruction+5&&count(fourth,[4,9,11])>=2?'strong':support>0&&support+2>=obstruction?'conditional':'restricted';
  const promiseStrengths=Array.from({length:13},(_,h)=>strength(fourth,h)*2+[5,9,11,2].reduce((n,c)=>n+strength(cusps[c],h),0));
  const promiseSupport=[2,4,5,9,11].reduce((n,h)=>n+promiseStrengths[h],0),promiseObstruction=[3,8,12].reduce((n,h)=>n+promiseStrengths[h],0);
  const promiseWeak=promiseSupport===0||promiseObstruction>=promiseSupport*2+3;
  const research=all(ninth,[5,8,9,11])||(allAcross(levelCusps,[5,8,9,11])&&count(ninth,[5,8,9,11])>=3&&count(cusps[5],[5,8,9,11])>=2);
  const postgraduate=all(ninth,[5,9,11])&&count(fourth,[4,9,11])>0;
  const university=allAcross(levelCusps,[4,5,9,11])&&count(fourth,[4,9,11])>0&&count(ninth,[9,11])>0;
  const basic=allAcross(levelCusps,[2,4,5,11])&&count(fourth,[2,4,5,11])>=2;
  const level=research?'research':postgraduate?'postgraduate':university?'university':basic?'basic':'applied';
  const planetScore=p=>strength(p,2)+strength(p,4)*4+strength(p,5)*3+strength(p,9)*4+strength(p,10)*2+strength(p,11)*3+[[4,7],[5,5],[9,7],[10,4]].reduce((n,[h,w])=>n+(cusps[h]?.planet.index===p.planet.index?w:0),0);
  const ranked=planets.slice().sort((a,b)=>planetScore(b)-planetScore(a)||a.planet.index-b.planet.index).map(p=>p.planet.index);
  const leading=new Set(ranked.slice(0,4)),houses=new Set(Array.from({length:12},(_,i)=>i+1).filter(h=>allAcross(educationCusps,[h])));
  const career=count(cusps[10],[4,5,9])>0,careerLord=cusps[10]?.planet.index;
  const sharedLord=[4,5,9].some(h=>cusps[h]?.planet.index===careerLord);
  return{cusps,planets,permission,promiseWeak,level,subject:subjectDirection(leading,houses),support,obstruction,
    exam:allAcross(educationCusps,[4,6,11]),scholarship:allAcross(educationCusps,[6,9,11]),
    foreign:allAcross(educationCusps,[4,9,11,12])||allAcross(educationCusps,[3,9,11,12]),
    careerAligned:career||(careerLord!=null&&leading.has(careerLord)&&sharedLord),
    interrupted:all(fourth,[3,8,12])&&count(fourth,[4,9,11])<=1,ranked};
}

function natalPrediction(v,en){
  const opening=PICK({strong:['The native has a strong capacity to continue education and complete a meaningful qualification.','ဇာတာရှင်ဟာ ပညာရေးကို ကောင်းကောင်းဆက်လက်သင်ယူနိုင်ပြီး အဓိပ္ပာယ်ရှိတဲ့ ပညာအရည်အချင်းတစ်ခုကို ပြီးမြောက်အောင် ရယူနိုင်မယ့်သူဖြစ်ပါတယ်ခင်ဗျာ။'],conditional:['The native can continue education and obtain a useful qualification, although a change of school, subject or study pattern may occur first.','ပညာရေးကို ဆက်လက်သင်ယူပြီး အသုံးဝင်တဲ့ အရည်အချင်းတစ်ခု ရယူနိုင်ပါတယ်ခင်ဗျာ။ မိမိနဲ့ကိုက်ညီတဲ့လမ်းကြောင်းမတွေ့မီ ကျောင်း၊ ဘာသာရပ် ဒါမှမဟုတ် သင်ယူပုံ ပြောင်းလဲရနိုင်ပါတယ်။'],restricted:['Formal education may not follow a long conventional route; practical training and skills learned in stages may be more productive.','ပုံမှန်ဘွဲ့အဆင့်ဆင့်ကို အရှည်ကြီးဆက်သွားမယ့်ပုံစံထက် လက်တွေ့အသုံးချပညာနဲ့ အဆင့်လိုက်သင်ယူရတဲ့ ကျွမ်းကျင်မှုတွေဘက်မှာ ပိုအကျိုးဖြစ်ထွန်းနိုင်ပါတယ်ခင်ဗျာ။']}[v.permission],en);
  const continuity=PICK(v.interrupted?['A pause or change of school or subject is possible. A more suitable route can allow study to resume.','ပညာသင်ကာလမှာ ခေတ္တရပ်နားရတာ၊ ကျောင်း ဒါမှမဟုတ် ဘာသာရပ်ပြောင်းရတာမျိုး ဖြစ်နိုင်ပါတယ်ခင်ဗျာ။ ပိုကိုက်ညီတဲ့လမ်းကြောင်းကနေ ပြန်လည်ဆက်သင်နိုင်ပါတယ်။']:['The education path can continue steadily, with important stages likely to be completed despite occasional delay.','ပညာရေးလမ်းကြောင်းက ယေဘုယျအားဖြင့် တည်တည်ငြိမ်ငြိမ် ဆက်သွားနိုင်ပါတယ်ခင်ဗျာ။ နှေးကွေးမှုရှိရင်တောင် အရေးကြီးတဲ့အဆင့်ကို ပြီးမြောက်အောင် ဆက်လုပ်နိုင်ပါလိမ့်မယ်။'],en);
  let final=PICK(v.exam?['Examination and entrance selection have a better chance during a supportive period.','စာမေးပွဲနဲ့ ဝင်ခွင့်ရွေးချယ်မှုမှာ ရလဒ်ကောင်းရနိုင်တဲ့ အခွင့်အလမ်းရှိပါတယ်ခင်ဗျာ။ စနစ်တကျပြင်ဆင်ပါ။']:['Examination results depend more on steady preparation and a suitable period.','စာမေးပွဲရလဒ်က ကြိုတင်ပြင်ဆင်မှုနဲ့ အချိန်ကိုက်ကြိုးစားနိုင်မှုအပေါ် ပိုမူတည်ပါတယ်ခင်ဗျာ။'],en);
  if(v.scholarship)final+=PICK([' Scholarship or merit-based support is also possible.',' ပညာသင်ဆု ဒါမှမဟုတ် အရည်အချင်းအလိုက် ပညာရေးအထောက်အပံ့ ရရှိနိုင်တဲ့အလားအလာလည်း ရှိပါတယ်။'],en);
  if(v.foreign)final+=PICK([' International or overseas study is also indicated when admission, finance and documents align.',' ဝင်ခွင့်၊ ငွေကြေးနဲ့ စာရွက်စာတမ်းကိုက်ညီချိန်မှာ နိုင်ငံခြား ဒါမှမဟုတ် နိုင်ငံတကာဆက်နွယ်ပညာရေးကို ဆက်သွားနိုင်ပါတယ်။'],en);
  if(v.careerAligned)final+=PICK([' The qualification is likely to connect directly with the later career.',' ရရှိလာမယ့်ပညာအရည်အချင်းက နောင်အလုပ်အကိုင်မှာ တိုက်ရိုက်အသုံးဝင်နိုင်ပါတယ်။'],en);
  return en?`Education outlook\n${opening}\n\nAttainable level\n${PICK(LEVELS[v.level],true)}\n\nContinuity of education\n${continuity}\n\nSubject and career direction\nThe most suitable direction is ${PICK(SUBJECTS[v.subject],true)}.\n\nExaminations, scholarship and overseas study\n${final}`
    :`ပညာရေးအခြေအနေ\n${opening}\n\nရနိုင်မယ့်ပညာရေးအဆင့်\n${PICK(LEVELS[v.level],false)}\n\nပညာရေးဆက်လက်သွားမယ့်ပုံစံ\n${continuity}\n\nသင့်တော်တဲ့ဘာသာရပ်နဲ့ အသက်မွေးဝမ်းကျောင်း\nဇာတာရှင်နဲ့ အလိုက်ဖက်ဆုံး ပညာရပ်လမ်းကြောင်းက ${PICK(SUBJECTS[v.subject],false)} ဘက်ဖြစ်ပါတယ်ခင်ဗျာ။\n\nစာမေးပွဲ၊ ပညာသင်ဆုနဲ့ နိုင်ငံခြားပညာရေး\n${final}`;
}
function natalAnalysis(v,en){
  const fourth=v.cusps[4],lord=fourth?planetLabel(fourth.planet.name,en):'-';
  const houses=fourth?[...new Set(fourth.levels.flat())].sort((a,b)=>a-b).join(en?', ':'၊ '):'-';
  const ranked=v.ranked.slice(0,3).map(i=>planetLabel(v.planets.find(p=>p.planet.index===i)?.planet.name||'',en)).join('၊ ');
  return en?`The fourth-cusp Sub Lord is ${lord}. It signifies houses ${houses}. Fourth-cusp education support: ${v.support}; obstruction: ${v.obstruction}. The 2nd, 5th, 9th and 11th cusps confirm the attainable level. Leading education planets: ${ranked}. Exam 4-6-11: ${v.exam?'yes':'no'}; scholarship 6-9-11: ${v.scholarship?'yes':'no'}; foreign education: ${v.foreign?'yes':'no'}.`
    :`၄ တန့်ဘာဝသန္ဓိဘုတ္တိနက္ခတ်သခင်ဂြိုဟ်မှာ ${lord} ဖြစ်ပါတယ်။ အကျိုးဆောင်ဘာဝများမှာ ${houses} ဖြစ်ပါတယ်။ ပညာရေးအားပေးအမှတ် ${v.support}၊ နှောင့်ယှက်အမှတ် ${v.obstruction} ဖြစ်ပြီး ၂၊ ၅၊ ၉၊ ၁၁ တန့်ဘာဝသန္ဓိတွေနဲ့ အတည်ပြုထားပါတယ်။ ပညာရေးအတွက် အဓိကဂြိုဟ်တွေမှာ ${ranked} ဖြစ်ပါတယ်။ ၄၊ ၆၊ ၁၁ စာမေးပွဲ Formula ${v.exam?'ပြည့်':'မပြည့်'}၊ ၆၊ ၉၊ ၁၁ ပညာသင်ဆု Formula ${v.scholarship?'ပြည့်':'မပြည့်'}၊ နိုင်ငံခြားပညာရေး Formula ${v.foreign?'ပြည့်':'မပြည့်'}ပါတယ်။`;
}

function educationEvent(ps){
  const support=ps.reduce((n,p,i)=>n+weighted(p,[2,4,5,6,9,11])*[2,3,4][i],0);
  const pressure=ps.reduce((n,p,i)=>n+weighted(p,[3,8,12])*[2,3,4][i],0);
  if(allAcross(ps,[3,8,12])&&!allAcross(ps,[4,9,11])&&pressure>support)return{event:'interruption',score:pressure-support+18};
  if(!ps.every(p=>count(p,[2,4,5,6,8,9,11,12])>0))return null;
  const formulas=[['research',[5,8,9,11]],['foreign',[4,9,11,12]],['foreign',[3,9,11,12]],['scholarship',[6,9,11]],['exam',[4,6,11]],['admission',[4,9,11]],['continuation',[2,4,5,11]]];
  const match=formulas.find(([,hs])=>allAcross(ps,hs));
  return match?{event:match[0],score:support-Math.max(0,Math.trunc(pressure/2))+match[1].length*5}:null;
}
function periodPrediction(v,result,en){
  const heading=en?'Education-related Periods':'ပညာရေးဆိုင်ရာ အချိန်ကာလများ';
  if(v.promiseWeak)return heading+PICK(['\nA strong date for long formal education is not clear. Practical study, short courses or skills training can still begin when an opportunity is available.','\nပုံမှန်ပညာရေးကို အရှည်ကြီးဆက်သွားဖို့ အထူးအားကောင်းတဲ့ကာလ မထင်ရှားသေးပါဘူးခင်ဗျာ။ လက်တွေ့အသုံးချပညာနဲ့ ကျွမ်းကျင်မှုသင်တန်းတွေကို အခွင့်အရေးရလာချိန်မှာ စတင်နိုင်ပါတယ်။'],en);
  let timeline;try{timeline=dashaTimeline(result.planets[1].longitude,result.utc);}catch{return heading+PICK(['\nThe Dasha timeline could not be calculated.','\nဒသာအချိန်စဉ် တွက်ချက်၍မရပါ။'],en);}
  const byName=new Map(v.planets.map(p=>[p.planet.name,p])),best=new Map();
  const birth=new Date(result.utc),tz=(Number(result.profile.tz)||0)*3600000;
  const calendarDate=t=>new Date(t+tz);
  for(const maha of timeline)for(const bhukti of maha.children)for(const antara of bhukti.children){
    const ps=[maha,bhukti,antara].map(d=>byName.get(d.lord));if(ps.some(p=>!p))continue;
    const candidate=educationEvent(ps);if(!candidate)continue;
    const start=Date.parse(antara.start),end=Date.parse(antara.end),mid=calendarDate(start+(end-start)/2),born=calendarDate(birth.getTime());
    let age=mid.getUTCFullYear()-born.getUTCFullYear();if(mid.getUTCMonth()<born.getUTCMonth()||mid.getUTCMonth()===born.getUTCMonth()&&mid.getUTCDate()<born.getUTCDate())age--;
    const minimum={research:21,foreign:16,scholarship:12}[candidate.event]||5;
    if(age<minimum||age>90)continue;
    const bonus=candidate.event==='research'?(age>=24&&age<=55?8:2):['foreign','exam'].includes(candidate.event)?(age<=40?8:3):['scholarship','admission'].includes(candidate.event)?(age<=35?8:2):(age<=50?8:3);
    const score=candidate.score+bonus,previous=best.get(candidate.event);
    if(!previous||score>previous.score)best.set(candidate.event,{event:candidate.event,start,end,age,score});
  }
  const windows=[...best.values()].sort((a,b)=>a.start-b.start);
  if(!windows.length)return heading+PICK(['\nNo single period is strong enough to name. Educational progress depends more on opportunities actively chosen at the time.','\nတိတိကျကျသတ်မှတ်ပေးနိုင်လောက်အောင် ထင်ရှားတဲ့ကာလ မတွေ့ရသေးပါဘူးခင်ဗျာ။ ပညာရေးတိုးတက်မှုဟာ အဲဒီအချိန်မှာ ကိုယ်တိုင်ရွေးချယ်ဖန်တီးတဲ့ အခွင့်အရေးပေါ် ပိုမူတည်ပါတယ်။'],en);
  const format=t=>{const d=calendarDate(t),s=[d.getUTCDate(),d.getUTCMonth()+1,d.getUTCFullYear()].map((n,i)=>i===2?String(n):String(n).padStart(2,'0')).join('.');return en?s:s.replace(/[0-9]/g,x=>'၀၁၂၃၄၅၆၇၈၉'[Number(x)]);};
  const rows=windows.map(w=>{
    const stage=w.age<18?PICK(['school-age study','အခြေခံကျောင်းပညာရေးအဆင့်'],en):w.age<=30?PICK(['higher or professional education','အဆင့်မြင့် ဒါမှမဟုတ် အသက်မွေးဝမ်းကျောင်းပညာအဆင့်'],en):w.age<=54?PICK(['advanced or continuing education','အထူးပြု ဒါမှမဟုတ် ဆက်လက်လေ့လာမှုအဆင့်'],en):PICK(['returning study or lifelong learning','ပညာပြန်လည်သင်ယူမှုအဆင့်'],en);
    const historical=w.end<Date.now();
    return en?`${format(w.start)} to ${format(Math.max(w.start,w.end-86400000))}. Around age ${w.age}: ${stage}${historical?' in the past':''}. ${PICK(EVENTS[w.event],true)}`
      :`${format(w.start)} မှ ${format(Math.max(w.start,w.end-86400000))} အတွင်း။ အသက် ${w.age} နှစ်ဝန်းကျင် ${stage}${historical?' (အတိတ်ကာလ)':''}။ ${PICK(EVENTS[w.event],false)}`;
  });
  return heading+'\n'+PICK(['The clearest education periods across the native\'s life are:','ဇာတာရှင်ရဲ့ဘဝမှာ ပညာရေးနဲ့ပတ်သက်ပြီး အထင်ရှားဆုံးဖြစ်လာနိုင်တဲ့ကာလတွေကို ဖော်ပြပေးထားပါတယ်ခင်ဗျာ။'],en)+'\n\n'+rows.join('\n\n');
}

export function iosEducationReadings(result,profiles,isEnglish){
  const value=analyze(result,profiles);
  return{
    natal:{prediction:natalPrediction(value,isEnglish),analysis:natalAnalysis(value,isEnglish)},
    periods:{prediction:periodPrediction(value,result,isEnglish),analysis:PICK(['Education periods are calculated from the complete natal timing sequence and age-appropriate event patterns.','ပညာရေးဆိုင်ရာအချိန်ကာလများကို မူလဇာတာ၏ အချိန်စဉ်တစ်ခုလုံးနှင့် အသက်အရွယ်အလိုက် ဖြစ်နိုင်သည့် ပညာရေးဖြစ်ရပ်များကို ပေါင်းစပ်တွက်ချက်ထားပါသည်။'],isEnglish)}
  };
}
