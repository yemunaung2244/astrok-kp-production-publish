import test from 'node:test';
import assert from 'node:assert/strict';
import { lordsFor } from '../src/kp-core.js';
import { NATAL_CATEGORIES, natalReading } from '../src/kp-natal-readings.js';
import { IOS_TEXT } from '../src/kp-ios-text-catalog.js';
import { iosCareerFocusedTiming } from '../src/kp-ios-career-timing.js';
import { iosForeignTravelReading } from '../src/kp-ios-foreign-reading.js';
import { iosForeignTravelTiming, iosForeignTravelTimingFallback } from '../src/kp-ios-foreign-timing.js';
import { planetSignifications } from '../src/kp-analysis.js';

const names=['တနင်္ဂနွေ','တနင်္လာ','အင်္ဂါ','ဗုဒ္ဓဟူး','ကြာသပတေး','သောကြာ','စနေ','ရာဟု','ကိတ်'];
const cusps=Array.from({length:12},(_,i)=>({number:i+1,longitude:i*30,lords:lordsFor(i*30)}));
const planets=names.map((name,index)=>({name,index,longitude:index*40,house:Math.floor(index*40/30)%12+1,lords:lordsFor(index*40)}));
const result={profile:{year:2000,month:1,day:1,tz:6.5,lat:16.84,lon:96.17,isHorary:false},cusps,planets,utc:'2000-01-01T00:00:00.000Z'};
test('all iOS natal categories return chart-specific sections in both languages',()=>{
  assert.equal(NATAL_CATEGORIES.length,13);
  for(const [id] of NATAL_CATEGORIES){
    const mm=natalReading(result,id,false),en=natalReading(result,id,true);
    assert.ok(mm.sections.length>0,id);
    assert.equal(mm.sections.length,en.sections.length,id);
    for(const section of en.sections){assert.ok(section.prediction,`${id}/${section.id}`);assert.ok(section.en);if(id!=='natalLottery')assert.doesNotMatch(section.prediction,/[\u1000-\u109f\uAA60-\uAA7f]/,`${id}/${section.id}`);}
  }
});
test('lottery reading keeps iOS verdict, timing, chart tokens and analysis together',()=>{
  const mm=natalReading(result,'natalLottery',false).sections[0];
  const en=natalReading(result,'natalLottery',true).sections[0];
  assert.match(mm.prediction,/^ဇာတာရှင်မှာ ထီဆုရနိုင်တဲ့ အလားအလာရှိပြီး/);
  assert.match(mm.prediction,/အချိန်ကာလ\nထီကံပိုအားကောင်းနိုင်တဲ့ကာလက/);
  assert.match(mm.prediction,/ရွေးချယ်ထားသော ဂဏန်းနှင့် အက္ခရာ/);
  assert.match(mm.analysis,/၅ တန့် ဘာဝသန္ဓိဘုတ္တိနက္ခတ်သခင်/);
  assert.match(mm.analysis,/အားပေးချက် \d+၊ ဆုံးရှုံးမှုဖိအား \d+/);
  assert.match(en.prediction,/Primary lottery number and letter/);
  assert.match(en.analysis,/The 5th-cusp sub lord/);
});
test('vehicle ownership uses the iOS ownership score and vehicle wording',()=>{
  const mm=natalReading(result,'vehicle',false).sections[0];
  const en=natalReading(result,'vehicle',true).sections[0];
  assert.match(mm.prediction,/^ယာဉ်ကားပိုင်ဆိုင်မှုအဟော\n\n/);
  assert.match(mm.prediction,/ပိုင်ဆိုင်မှုရရှိလာနိုင်မယ့်ပုံစံ\n\n/);
  assert.match(mm.analysis,/ပိုင်ဆိုင်မှုအမှတ် ၁၀၀ သုံးသပ်ချက်/);
  assert.match(en.prediction,/^Vehicle ownership outlook\n\n/);
  assert.match(en.analysis,/Final ownership score: \d+\/100/);
});
test('education reading uses iOS level, subject and period analyses',()=>{
  const mm=natalReading(result,'education',false).sections;
  const en=natalReading(result,'education',true).sections;
  assert.deepEqual(mm.map(s=>s.id),['education','educationPeriods']);
  assert.match(mm[0].prediction,/^ပညာရေးအခြေအနေ\n/);
  assert.match(mm[0].prediction,/ရနိုင်မယ့်ပညာရေးအဆင့်/);
  assert.match(mm[0].prediction,/သင့်တော်တဲ့ဘာသာရပ်နဲ့ အသက်မွေးဝမ်းကျောင်း/);
  assert.match(mm[0].analysis,/၄၊ ၆၊ ၁၁ စာမေးပွဲ Formula/);
  assert.match(mm[1].analysis,/မူလဇာတာ၏ အချိန်စဉ်တစ်ခုလုံး/);
  assert.match(en[0].prediction,/^Education outlook\n/);
  assert.match(en[0].analysis,/The fourth-cusp Sub Lord is/);
  assert.match(en[1].prediction,/^Education-related Periods\n/);
});
test('marriage reading includes iOS promise, spouse profile and period analysis',()=>{
  const mm=natalReading(result,'marriage',false).sections;
  const en=natalReading(result,'marriage',true).sections;
  assert.deepEqual(mm.map(s=>s.id),['marriage','marriagePeriods']);
  assert.match(mm[0].prediction,/^အိမ်ထောင်ရေးမူလကံ\n/);
  assert.match(mm[0].prediction,/အိမ်ထောင်ဖက်၏ ပုံပန်းသဏ္ဌာန်/);
  assert.match(mm[0].prediction,/အိမ်ထောင်ဖက်၏ ပညာနှင့် အလုပ်အကိုင်/);
  assert.match(mm[0].analysis,/KP မူလစည်းမျဉ်းအရ ၇ တန့်/);
  assert.match(en[0].prediction,/^Marriage promise\n/);
  assert.match(en[0].analysis,/House 7 CSL:/);
  assert.match(mm[1].analysis,/မူလဇာတာ၏ အချိန်စဉ်တစ်ခုလုံး/);
  assert.match(en[1].prediction,/^Marriage-related Periods\n/);
});
test('children and family reading uses iOS natal verdict and cusp evidence',()=>{
  const mm=natalReading(result,'children',false).sections[0];
  const en=natalReading(result,'children',true).sections[0];
  assert.match(mm.prediction,/သားသမီး/);
  assert.match(mm.analysis,/^မူလကံအခြေအနေ\n၅ တန့်/);
  assert.match(mm.analysis,/၁၁ တန့်နဲ့ ၉ တန့်တို့ကို ထပ်မံအတည်ပြုထားပါတယ်/);
  assert.match(mm.analysis,/၅ တန့်ဘာဝသန္ဓိဘုတ္တိနက္ခတ်သခင်ဂြိုဟ်/);
  assert.match(en.analysis,/^Foundational natal promise\nThe 5th cusp Sub Lord/);
  assert.match(en.analysis,/The 11th cusp Sub Lord is/);
});
test('foreign travel reading uses iOS score, purpose and settlement analyses',()=>{
  const mm=natalReading(result,'foreignTravel',false).sections;
  const en=natalReading(result,'foreignTravel',true).sections;
  assert.deepEqual(mm.map(section=>section.id),['foreignTravel','foreignTravelPeriods']);
  assert.match(mm[0].prediction,/^နိုင်ငံခြားခရီးမူလကံ\n/);
  assert.match(mm[0].prediction,/နိုင်ငံခြားသွားရမယ့် အဓိကအကြောင်းရင်းများ/);
  assert.match(mm[0].prediction,/နိုင်ငံခြားမှာ နေထိုင်နိုင်မယ့်အခြေအနေ/);
  assert.match(mm[0].analysis,/နိုင်ငံခြားခရီး မူလကံအမှတ် - [၀-၉]+\/၁၀၀/);
  assert.match(en[0].analysis,/100-point evidence breakdown/);
  assert.match(en[1].analysis,/complete natal timing sequence/);
});
test('foreign travel timing preserves the iOS low-promise rule and accepts calculated transits',async()=>{
  const profiles=planetSignifications(result);
  const score=iosForeignTravelReading(result,profiles,false).score;
  assert.match(iosForeignTravelTimingFallback(40,false).prediction,/တကယ်နိုင်ငံခြားထွက်ခွာမယ့်အချိန်/);
  assert.match(iosForeignTravelTimingFallback(70,true).prediction,/Calculating the Dasha/);
  const forecast=await iosForeignTravelTiming(result,profiles,async()=>result,Date.UTC(2026,9,26));
  assert.match(forecast.mm.prediction,/^နိုင်ငံခြားခရီးဆိုင်ရာ အချိန်ကာလများ\n/);
  assert.match(forecast.en.prediction,/^Foreign Travel-related Periods\n/);
  assert.ok(score>=0&&score<=100);
});
test('horary charts cannot produce natal readings',()=>{
  assert.throws(()=>natalReading({...result,profile:{...result.profile,isHorary:true}},'wealth'));
});
test('Web natal predictions reuse iOS source wording',()=>{
  const property=natalReading(result,'property',false).sections[0];
  assert.match(property.prediction,/^နေအိမ်ပိုင်ဆိုင်မှုအဟော\n\n/);
  assert.match(property.prediction,/ပိုင်ဆိုင်မှုရရှိလာနိုင်မယ့်ပုံစံ\n\n/);
  assert.match(property.analysis,/^အဓိက KP သုံးသပ်ချက်\n/);
  assert.match(property.analysis,/ပိုင်ဆိုင်မှုအမှတ် ၁၀၀ သုံးသပ်ချက်/);
  const english=natalReading(result,'marriage',true).sections[0];
  assert.match(english.prediction,/^Marriage promise\n/);
  const health=natalReading(result,'longevity',false).sections.find(x=>x.id==='health');
  assert.ok(health.prediction.startsWith('ကျန်းမာရေးအခြေအနေ\n\n'));
  assert.ok(health.prediction.includes('ဖြစ်နိုင်တဲ့ ရောဂါဝေဒနာများ'));
  assert.ok(health.analysis.startsWith('KP ဘာဝသန္ဓိသုံးသပ်ချက်'));
  assert.doesNotMatch(health.analysis,/အကျိုးဆောင်ဘာဝ[^။\n]*\)/);
  assert.ok(IOS_TEXT.longevity.includes(natalReading(result,'longevity',false).sections[0].prediction));
  for(const [id] of NATAL_CATEGORIES){
    for(const {prediction} of natalReading(result,id,false).sections){
      assert.doesNotMatch(prediction,/\\\(/,`${id} contains an unresolved iOS template`);
    }
  }
});
test('wealth sections use iOS financial, career and lump-sum workflows',()=>{
  const mm=natalReading(result,'wealth',false).sections;
  const en=natalReading(result,'wealth',true).sections;
  assert.deepEqual(mm.map(x=>x.id),en.map(x=>x.id));
  assert.deepEqual(mm.filter(x=>x.id!=='debt').map(x=>x.id),['wealth','beneficialCareer','careerChange','lumpSum']);
  const wealth=mm.find(x=>x.id==='wealth');
  assert.match(wealth.prediction,/^ချမ်းသာကြွယ်ဝမှုအဆင့်အတန်း\n\n/);
  assert.match(wealth.prediction,/စုဆောင်းငွေနှင့် ပိုင်ဆိုင်မှု/);
  assert.match(wealth.analysis,/အဓိကငွေကြေးဘာဝများ/);
  assert.match(wealth.analysis,/မူလငွေကြေးကံအင်အားက [၀-၉]+\/၈၀/);
  assert.match(mm.find(x=>x.id==='beneficialCareer').analysis,/၁၀ တန့် ဘာဝသန္ဓိဘုတ္တိနက္ခတ်သခင်/);
  assert.match(mm.find(x=>x.id==='careerChange').prediction,/အလုပ်/);
  assert.match(mm.find(x=>x.id==='lumpSum').analysis,/၂ တန့်ကို/);
  for(const row of [...mm,...en])assert.doesNotMatch(row.prediction+row.analysis,/\\\(/);
});
test('career timing combines Dasha and Moon/Jupiter transit days in both languages',async()=>{
  const timing=await iosCareerFocusedTiming(result,null,async()=>90);
  assert.ok(timing?.mm);
  assert.ok(timing?.en);
  assert.match(timing.mm,/အကျိုးပေးကာလ:/);
  assert.match(timing.mm,/အထူးအားကောင်းဆုံးရက်ပိုင်း:/);
  assert.match(timing.en,/Favourable period:/);
});

test('life guide analysis follows the ascendant stellar chain used by its prediction',()=>{
  const reading=natalReading(result,'lifeSuccess',true).sections[0];
  assert.match(reading.analysis,/The Ascendant cusp Sub Lord is/);
  assert.match(reading.analysis,/guidance is selected from that stellar-lord sign/);
  assert.equal(reading.periods.length,0);
});

test('appearance distinguishes opposition and special aspects from conjunction',()=>{
  const chart=structuredClone(result);
  chart.cusps[0].longitude=0;
  chart.cusps[0].lords.subLord=names[3];
  chart.planets[3].longitude=0;
  chart.planets[2].longitude=270;
  chart.planets[4].longitude=180;
  const reading=natalReading(chart,'appearance',true).sections[0];
  assert.match(reading.analysis,/Mars special 4th-house aspect/);
  assert.match(reading.analysis,/Jupiter opposition/);
  assert.doesNotMatch(reading.analysis,/Mars is conjunct|Jupiter is conjunct/);
});
