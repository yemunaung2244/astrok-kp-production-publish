import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {REPORT_TEXT} from '../src/kp-ios-horary-text.js';
import {natalAnalysisNarrative} from '../src/kp-ios-analysis-narrative.js';
import {lordsFor} from '../src/kp-core.js';
test('every bilingual horary template is identical to the current iOS source',()=>{
 const source=readFileSync(new URL('../../ios/AstroKProIOS/AstroKProIOS/Calculation/KPHoraryReportText.swift',import.meta.url),'utf8');
 const rows=[...source.matchAll(/case "([^"\n]+)": text = en \? ("(?:[^"\\]|\\.)*") : ("(?:[^"\\]|\\.)*")/g)];
 assert.equal(rows.length,Object.keys(REPORT_TEXT).length);
 for(const [,key,en,mm]of rows)assert.deepEqual(REPORT_TEXT[key],[JSON.parse(mm),JSON.parse(en)],key);
});
test('natal view retains practical analysis under the four iOS section headings',()=>{
 const names=['တနင်္ဂနွေ','တနင်္လာ','အင်္ဂါ','ဗုဒ္ဓဟူး','ကြာသပတေး','သောကြာ','စနေ','ရာဟု','ကိတ်'];
 const result={profile:{name:'Test',year:2000,month:1,day:2,hour:3,min:4,sec:5,tz:6.5,cityName:'Yangon'},cusps:Array.from({length:12},(_,i)=>({number:i+1,longitude:i*30,lords:lordsFor(i*30)})),planets:names.map((name,index)=>({name,index,house:index+1,longitude:index*30,lords:lordsFor(index*30)}))};
 const reading={id:'appearance',en:'Appearance Predictions',mm:'ရုပ်ရည်သွင်ပြင်',analysis:'Original practical examination'};
 for(const en of [false,true]){
  const text=natalAnalysisNarrative(result,reading,en);
  assert.equal((text.match(/^### /gm)||[]).length,4);
  assert.equal((text.match(/Original practical examination/g)||[]).length,1);
  assert.ok(text.includes(en?'KP Principle':'KP ဥပဒေသ'));
  assert.ok(text.includes(en?'Ruling Planets':'စိုးမိုးဂြိုဟ်များ'));
  assert.doesNotMatch(text,/undefined|NaN/);
 }
});
