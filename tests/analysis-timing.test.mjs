import test from 'node:test';
import assert from 'node:assert/strict';
import { lordsFor, normalize } from '../src/kp-core.js';
import { timingTargetStarts, findNextTiming } from '../src/kp-timing.js';
import { rulingItems, planetSignifications, houseSignifications, aspectRows } from '../src/kp-analysis.js';
import { dashaTimeline } from '../src/kp-dasha.js';

const profile={year:2026,month:10,day:24,tz:6.5,lat:16.84,lon:96.17};
const cusps=Array.from({length:12},(_,i)=>({number:i+1,longitude:i*30,lords:lordsFor(i*30)}));
const names=['တနင်္ဂနွေ','တနင်္လာ','အင်္ဂါ','ဗုဒ္ဓဟူး','ကြာသပတေး','သောကြာ','စနေ','ရာဟု','ကိတ်'];
const planets=names.map((name,index)=>({name,index,longitude:index*40,house:Math.floor(index*40/30)%12+1,lords:lordsFor(index*40)}));
const result={profile,cusps,planets,utc:'2026-10-24T00:00:00.000Z'};

test('iOS seven ruling entries and four-level significators cover all planets and houses',()=>{
  assert.equal(rulingItems(result).length,7);
  const planetsRows=planetSignifications(result),houseRows=houseSignifications(result);
  assert.equal(planetsRows.length,9);assert.equal(houseRows.length,12);
  assert.ok(planetsRows.every(x=>x.levels.length===4));
  assert.ok(houseRows.every(x=>x.levels.length===4));
  for(const p of planetsRows)for(let level=0;level<4;level++)for(const house of p.levels[level])assert.ok(houseRows[house-1].levels[level].includes(p.planet.name));
});

test('KP four grades use star-lord occupation, own occupation, star-lord ownership, then own ownership',()=>{
  const chart={...result,planets:planets.map(p=>({...p,lords:{...p.lords}}))};
  chart.planets[0].longitude=180;chart.planets[0].house=7;
  chart.planets[0].lords.starLord=names[2];
  chart.planets[2].longitude=0;chart.planets[2].house=1;
  const sun=planetSignifications(chart)[0];
  assert.deepEqual(sun.levels,[[1],[7],[1,8],[5]]);
  const houses=houseSignifications(chart);
  assert.ok(houses[0].levels[0].includes(names[0]));
  assert.ok(houses[6].levels[1].includes(names[0]));
  assert.ok(!houses[3].levels[2].includes(names[0]),'an aspected house is not L3');
});

test('eastern and western aspects have distinct rules',()=>{
  assert.equal(aspectRows(result,true,false).length,9);
  assert.equal(aspectRows(result,false,true).length,9);
  assert.notDeepEqual(aspectRows(result,true,false),aspectRows(result,false,false));
});

test('dasha includes Maha, Bhukti, Antara and Pratyantara',()=>{
  const rows=dashaTimeline(planets[1].longitude,result.utc);
  assert.equal(rows.length,9);assert.ok(rows[0].children.length>0);
  assert.ok(rows[0].children[0].children.length>0);
  assert.ok(rows[0].children[0].children[0].children.length>0);
});

test('timing finds next selected KP sign/star/sub entry',async()=>{
  const target=timingTargetStarts('အင်္ဂါ','ကိတ်','ကိတ်')[0];
  assert.deepEqual([lordsFor(target+0.00001).signLord,lordsFor(target+0.00001).starLord,lordsFor(target+0.00001).subLord],['အင်္ဂါ','ကိတ်','ကိတ်']);
  const start=new Date('2026-10-24T00:00:00.000Z'),speed=1/86400000;
  const positionAt=async date=>normalize(target-1+(date.getTime()-start.getTime())*speed);
  const found=await findNextTiming({body:'တနင်္လာ',signLord:'အင်္ဂါ',starLord:'ကိတ်',subLord:'ကိတ်',from:start,profile,positionAt});
  assert.ok(Math.abs(found.arrivalDate.getTime()-start.getTime()-86400000)<5000);
});
