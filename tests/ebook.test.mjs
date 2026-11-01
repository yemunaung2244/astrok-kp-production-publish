import test from 'node:test';
import assert from 'node:assert/strict';
import { lordsFor } from '../src/kp-core.js';
import { kpEbookHTML } from '../src/kp-ebook.js';

const names=['တနင်္ဂနွေ','တနင်္လာ','အင်္ဂါ','ဗုဒ္ဓဟူး','ကြာသပတေး','သောကြာ','စနေ','ရာဟု','ကိတ်'];
const cusps=Array.from({length:12},(_,i)=>({number:i+1,longitude:i*30,lords:lordsFor(i*30)}));
const planets=names.map((name,index)=>({name,index,longitude:index*40,speed:1,house:Math.floor(index*40/30)%12+1,lords:lordsFor(index*40)}));
const result={profile:{name:'Sample <Chart>',year:2000,month:1,day:1,hour:12,min:30,cityName:'Yangon',tz:6.5,lat:16.84,lon:96.17,isHorary:false},cusps,planets,utc:'2000-01-01T00:00:00.000Z'};

test('full natal Ebook contains chart, data, predictions and analyses as an offline HTML document',()=>{
  const html=kpEbookHTML(result,{includeReadings:true});
  assert.match(html,/<!doctype html>/);
  assert.match(html,/Sample &lt;Chart&gt;/);
  assert.doesNotMatch(html,/Sample <Chart>/);
  assert.match(html,/class="kp-chart/);
  assert.match(html,/ဂြိုဟ်တည်ရာဇယား/);
  assert.match(html,/ဘာဝတည်ရာဇယား/);
  assert.match(html,/ဘဝအောင်မြင်ရေးလမ်းညွှန်/);
  assert.match(html,/ဇာတာသုံးသပ်ချက်/);
  assert.doesNotMatch(html,/class="toolbar"/);
  assert.match(html,/break-after:page/);
});

test('Ebook cover uses the chosen color and author name',()=>{
  const html=kpEbookHTML(result,{coverColor:'#5B1B77',author:'Saya Htun Linn'});
  assert.match(html,/background:#5B1B77/);
  assert.match(html,/Saya Htun Linn/);
});

test('horary Ebook puts the question and prediction before analysis',()=>{
  const horary={...result,profile:{...result.profile,isHorary:true,question:'Will it sell?'}};
  const html=kpEbookHTML(horary,{horary:{prediction:'Yes, in October.',analysis:'House 3 supports the sale.'}});
  assert.ok(html.indexOf('Will it sell?')<html.indexOf('Yes, in October.'));
  assert.ok(html.indexOf('Yes, in October.')<html.indexOf('House 3 supports the sale.'));
});

test('chart-only Ebook omits readings',()=>{
  const html=kpEbookHTML(result,{includeReadings:false});
  assert.match(html,/ဂြိုဟ်တည်ရာဇယား/);
  assert.doesNotMatch(html,/ဘဝအောင်မြင်ရေးလမ်းညွှန်/);
});
