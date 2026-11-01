import test from 'node:test';
import assert from 'node:assert/strict';
import { lordsFor } from '../src/kp-core.js';
import { renderIOSDashaTab, renderIOSRulingTab, renderIOSSignificatorTab, renderIOSMethodsTab, renderIOSAspectTab } from '../src/ios-advanced-tabs.js';

const names=['တနင်္ဂနွေ','တနင်္လာ','အင်္ဂါ','ဗုဒ္ဓဟူး','ကြာသပတေး','သောကြာ','စနေ','ရာဟု','ကိတ်'];
const result={
  utc:'2001-12-26T19:22:19.000Z',
  profile:{year:2001,month:12,day:27,hour:1,min:52,cityName:'Yangon',tz:6.5,isHorary:false},
  planets:names.map((name,index)=>({name,index,longitude:index*37+5,speed:index===6?-0.1:1,house:index+1,lords:lordsFor(index*37+5)})),
  cusps:Array.from({length:12},(_,index)=>({number:index+1,longitude:index*30+11,lords:lordsFor(index*30+11)})),
};

test('Dasha matches iOS section hierarchy and expands all four periods',()=>{
  const html=renderIOSDashaTab(result,false,Date.parse('2026-11-01T00:00:00Z'));
  assert.match(html,/မွေးစဉ် ဒသာအခြေခံ/);
  assert.match(html,/လက်ရှိ အသက်ဝင်နေသော ဒသာ/);
  for(let level=0;level<4;level++)assert.match(html,new RegExp(`ios-dasha-level-${level}`));
  assert.match(html,/သုခုမဒသာ/);
});

test('Ruling and significator tabs preserve iOS cards and fixed table columns',()=>{
  const ruling=renderIOSRulingTab(result,result,'',false);
  assert.equal((ruling.match(/ios-advanced-card/g)||[]).length,2);
  assert.equal((ruling.match(/ios-advanced-pair/g)||[]).length,14);
  const planet=renderIOSSignificatorTab(result,false,false);
  const house=renderIOSSignificatorTab(result,true,false);
  assert.equal((planet.match(/<th>/g)||[]).length,6);
  assert.equal((house.match(/<th>/g)||[]).length,5);
  assert.match(planet,/L1\(အကြီးဆုံး\)/);
});

test('Methods show all four iOS blocks and Western aspects include colored legend',()=>{
  const methods=renderIOSMethodsTab(result,'fourStep',false);
  assert.equal((methods.match(/ios-method-block/g)||[]).length,4);
  assert.equal((methods.match(/ios-advanced-table-wrap/g)||[]).length,4);
  assert.match(methods,/နည်းစနစ် ၇ မျိုး သဘောတူညီသော/);
  const east=renderIOSAspectTab(result,true,false);
  const west=renderIOSAspectTab(result,false,false);
  assert.equal((east.match(/ios-aspect-block/g)||[]).length,2);
  assert.equal((west.match(/ios-aspect-block/g)||[]).length,2);
  assert.doesNotMatch(east,/ios-aspect-legend/);
  assert.match(west,/ios-aspect-legend/);
});
