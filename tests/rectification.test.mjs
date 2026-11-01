import test from 'node:test';
import assert from 'node:assert/strict';
import { lordsFor } from '../src/kp-core.js';
import { RECTIFICATION_EVENTS, rankRectificationCandidate, rectifyBirthTime } from '../src/kp-rectification.js';
const names=['တနင်္ဂနွေ','တနင်္လာ','အင်္ဂါ','ဗုဒ္ဓဟူး','ကြာသပတေး','သောကြာ','စနေ','ရာဟု','ကိတ်'];
const result={profile:{year:'2000',month:'1',day:'1',hour:'12',min:'0',sec:'0',lat:'16.8',lon:'96.1',tz:'6.5'},utc:'2000-01-01T05:30:00.000Z',cusps:Array.from({length:12},(_,i)=>({number:i+1,longitude:i*30,lords:lordsFor(i*30)})),planets:names.map((name,index)=>({name,index,longitude:index*40,house:Math.floor(index*40/30)%12+1,lords:lordsFor(index*40)}))};
test('iOS rectification event types are all represented',()=>assert.equal(RECTIFICATION_EVENTS.length,14));
test('event matches use chart structure and dasha at the event date',()=>{const rank=rankRectificationCandidate(result,[{type:'marriage',date:'2024-04-02'},{type:'firstJob',date:'2020-01-10'}]);assert.equal(rank.matches.length,2);assert.ok(rank.confidence>=0&&rank.confidence<=100);});
test('rectification requires two dated life events',async()=>{await assert.rejects(rectifyBirthTime(result.profile,[{type:'marriage',date:'2024-04-02'}]));});
