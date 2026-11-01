import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {lordsFor} from '../src/kp-core.js';
import {horaryReading} from '../src/kp-horary-readings.js';

const questions=JSON.parse(readFileSync(new URL('../public/horary_questions.bilingual.json',import.meta.url),'utf8'));
const names=['တနင်္ဂနွေ','တနင်္လာ','အင်္ဂါ','ဗုဒ္ဓဟူး','ကြာသပတေး','သောကြာ','စနေ','ရာဟု','ကိတ်'];
const cusps=Array.from({length:12},(_,i)=>({number:i+1,longitude:i*30,lords:lordsFor(i*30)}));
const planets=names.map((name,index)=>({name,index,longitude:index*40,house:Math.floor(index*40/30)%12+1,lords:lordsFor(index*40)}));
const chart={profile:{year:2026,month:10,day:25,tz:6.5,lat:16.84,lon:96.17,isHorary:true,question:'အလုပ်ရမလား၊ ဘယ်တော့လဲ?'},cusps,planets,utc:'2026-10-25T00:00:00.000Z'};
const options={now:Date.parse('2200-01-01'),sensitiveAt:async()=>Date.parse('2026-11-02T05:30:00Z')};
test('iOS horary catalog has a unique key and chart rule for every question',()=>{
  assert.equal(questions.length,259);
  assert.equal(new Set(questions.map(q=>q.key)).size,questions.length);
  assert.equal(new Set(questions.map(q=>q.titleMm)).size,questions.length);
  for(const q of questions){assert.ok(q.titleMm&&q.titleEn&&q.groupMm&&q.groupEn,q.key);assert.ok(q.cusp>=0&&q.cusp<=12,q.key);assert.ok(q.kind==='core'||q.kind==='oral_health'||q.support.length,q.key);}
});
test('every iOS horary question renders a prediction and chart analysis',async()=>{
  for(const q of questions){const {prediction,analysis}=await horaryReading(chart,q,false,options);assert.ok(prediction,q.key);assert.ok(analysis,q.key);}
});
test('special iOS completion questions retain exact date and AM/PM answer shape',async()=>{
  for(const key of ['modern_technology_11','modern_home_12']){const q=questions.find(x=>x.key===key),answer=await horaryReading(chart,q,false,options);assert.match(answer.prediction,/02\.11\.2026/);assert.match(answer.prediction,/12:00 PM/);}
});
