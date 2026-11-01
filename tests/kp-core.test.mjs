import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { lordsFor, horary2193Starts, angleDistance, dashaPeriods, degreeText } from '../src/kp-core.js';

test('KP 1–2193 horary boundaries cover full circle in source order', () => {
  const starts = horary2193Starts();
  assert.equal(starts.length, 2193);
  assert.equal(starts[0], 0);
  assert.ok(starts.every(v => v >= 0 && v < 360));
  assert.ok(starts.every((v, i) => i === 0 || v >= starts[i-1]));
});

test('KP 1–249 source has every number exactly once', () => {
  const rows = JSON.parse(readFileSync(new URL('../public/kp_horary.json', import.meta.url)));
  assert.equal(rows.length, 249);
  assert.deepEqual(rows.map(row => row.number), Array.from({length:249}, (_, i) => i+1));
  assert.equal(rows[55].from_deg, 80);
});

test('lord progression starts at Ketu and changes at nakshatra boundary', () => {
  assert.equal(lordsFor(0).starLord, 'ကိတ်');
  assert.equal(lordsFor(0).subLord, 'ကိတ်');
  assert.equal(lordsFor(360/27).starLord, 'သောကြာ');
  assert.equal(lordsFor(80).signLord, 'ဗုဒ္ဓဟူး');
  assert.ok(angleDistance(359.9, 0.1) < 0.21);
  assert.match(degreeText(80), /မေထုန် 20° 00′/);
});

test('Vimshottari maha periods run forward from birth without gaps', () => {
  const periods = dashaPeriods(0, new Date('2000-01-01T00:00:00Z'));
  assert.equal(periods.length, 9);
  assert.equal(periods[0].lord, 'ကိတ်');
  assert.ok(periods.every((p, i) => i === 0 || p.start === periods[i-1].end));
  assert.ok(Math.abs(periods[0].years - 7) < 1e-9);
});
