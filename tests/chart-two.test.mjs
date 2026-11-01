import test from 'node:test';
import assert from 'node:assert/strict';
import { lordsFor } from '../src/kp-core.js';
import { renderIOSChartTwo } from '../src/chart-two.js';

const names=['တနင်္ဂနွေ','တနင်္လာ','အင်္ဂါ','ဗုဒ္ဓဟူး','ကြာသပတေး','သောကြာ','စနေ','ရာဟု','ကိတ်'];
const result={
  profile:{year:2026,month:11,day:1},
  planets:names.map((name,index)=>({name,index,longitude:index*37+5,speed:index===6?-0.1:1,lords:lordsFor(index*37+5)})),
  cusps:Array.from({length:12},(_,index)=>({number:index+1,longitude:index*30+11,lords:lordsFor(index*30+11)})),
};

test('Chart 2 keeps the fixed iOS East Indian Classic chart and four-column tables',()=>{
  const html=renderIOSChartTwo(result);
  assert.match(html,/ဇာတာအချက်အလက်များ/);
  assert.match(html,/kp-east-indian/);
  assert.match(html,/--chart-bg:#fffbf4/);
  assert.equal((html.match(/<table>/g)||[]).length,2);
  assert.equal((html.match(/<th>/g)||[]).length,8);
  assert.equal((html.match(/ios-chart-two-ruling-row/g)||[]).length,7);
  assert.match(html,/ဂြိုဟ်ဇယား/);
  assert.match(html,/ဘာဝဇယား/);
  assert.match(html,/class="retrograde">စနေ/);
});

test('Chart 2 headings and rows follow language setting',()=>{
  const html=renderIOSChartTwo(result,true);
  assert.match(html,/Chart Information/);
  assert.match(html,/Ruling Planets/);
  assert.match(html,/Planet Table/);
  assert.match(html,/Cusp Table/);
});
