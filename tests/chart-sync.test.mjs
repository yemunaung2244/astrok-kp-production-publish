import test from 'node:test';
import assert from 'node:assert/strict';
import { chartKey, mergeKPCharts } from '../src/chart-sync.js';

const chart={name:'Test',year:'2001',month:'12',day:'27',hour:'1',min:'52',sec:'19',lat:'16.8',lon:'96.2',tz:'6.5',ayanamsaIndex:0,isHorary:false,horaryNumber:'',horaryNumberSystem:249,isTSPHorary:false};

test('iOS and Web chart copies merge once by the full chart identity',()=>{
  const remote={...chart,cityName:'Yangon'};
  const local={...chart,cityName:'ရန်ကုန်'};
  assert.deepEqual(mergeKPCharts([local],[remote]),[local]);
});

test('deletion tombstone keeps a remotely saved chart from returning',()=>{
  assert.deepEqual(mergeKPCharts([], [chart], [chartKey(chart)]), []);
});

test('invalid remote chart payload cannot enter the local list',()=>{
  assert.deepEqual(mergeKPCharts([], [{name:'bad'}, chart]), [chart]);
});
