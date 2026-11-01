import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { planetLabel, degreeLabel, houseLabel, rulingLabel, methodLabel, aspectTargetLabel } from '../src/locale.js';
import { renderKPChart, renderKPOverlayChart } from '../src/chart-renderers.js';

const questions=JSON.parse(readFileSync(new URL('../public/horary_questions.bilingual.json',import.meta.url),'utf8'));
test('every horary question and group has English text',()=>{
  assert.equal(questions.length,259);
  for(const row of questions){
    assert.ok(row.titleMm && row.titleEn && row.groupMm && row.groupEn);
    assert.doesNotMatch(row.titleEn+row.groupEn,/[\u1000-\u109f\uAA60-\uAA7f]/);
  }
});
test('chart analysis terminology localizes into English',()=>{
  assert.equal(planetLabel('တနင်္ဂနွေ',true),'Sun');
  assert.equal(houseLabel(7,true),'House 7');
  assert.equal(rulingLabel('လဂ်သခင်',true),'Ascendant sign lord');
  assert.equal(methodLabel('လေးဆင့်အကျိုးဆောင်',true),'Four-step significators');
  assert.match(degreeLabel(3,true),/^Aries /);
  assert.equal(aspectTargetLabel('အင်္ဂါ (၇ တန့်)',true),'Mars (House 7)');
});
