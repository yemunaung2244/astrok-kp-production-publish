import test from 'node:test';
import assert from 'node:assert/strict';
import { CHART_STYLES, CHART_THEMES, chartSignEntries, renderKPChart, renderKPOverlayChart } from '../src/chart-renderers.js';

const result = {
  cusps: Array.from({ length: 12 }, (_, i) => ({ number: i + 1, longitude: (i * 30 + 15) % 360 })),
  planets: [
    { name: 'တနင်္ဂနွေ', longitude: 17.5, speed: 1 },
    { name: 'စနေ', longitude: 48.25, speed: -0.1 },
    { name: 'ကိတ်', longitude: 227, speed: -0.05 }
  ]
};

test('all iOS chart layouts render the same chart data with distinct geometry', () => {
  const output = CHART_STYLES.map(style => renderKPChart(result, style, 'Classic'));
  assert.equal(new Set(output).size, 5);
  for (const svg of output) {
    assert.match(svg, /<svg[^>]+viewBox="0 0 420 420"/);
    if (svg.includes('kp-circular')) {
      assert.match(svg, /class="chart-wheel-planet"[^>]*>၁<\/text>/);
      assert.match(svg, /class="chart-wheel-planet retro"[^>]*>၉R<\/text>/);
      assert.match(svg, /class="chart-wheel-tick"/);
    } else {
      assert.match(svg, />၁ 17°30′<\/text>/);
      assert.match(svg, />၉ 17°00′R<\/text>/);
      assert.match(svg, /class="chart-token retro"/);
    }
    assert.match(svg, /<\/svg>$/);
  }
  for (const svg of output) assert.doesNotMatch(svg, /☉|☋/);
  assert.match(output[0], /kp-east-indian/);
  assert.match(output[1], /kp-north-indian/);
  assert.match(output[2], /kp-south-indian/);
  assert.match(output[3], /kp-circular/);
  assert.match(output[4], /kp-bengali/);
});

test('all iOS themes keep chart geometry and change colors', () => {
  const output = CHART_THEMES.map(theme => renderKPChart(result, 'East Indian', theme));
  assert.equal(new Set(output).size, 4);
  for (const svg of output) assert.match(svg, />၁ 17°30′<\/text>/);
});

test('natal and transit overlay keeps the two chart layers distinct', () => {
  const transit = { ...result, planets: [{ name: 'တနင်္လာ', longitude: 95, speed: 12 }] };
  const svg = renderKPOverlayChart(result, transit, 'Emerald');
  assert.match(svg, /kp-overlay/);
  assert.match(svg, /chart-token planet transit/);
  assert.match(svg, />၂ 05°00′<\/text>/);
  assert.match(svg, />၁ 17°30′<\/text>/);
});

test('East Indian chart orders positions like iOS and includes ascendant, Fortuna and cusp degrees', () => {
  const chart={
    cusps:[{number:1,longitude:15},{number:2,longitude:21},{number:9,longitude:260}],
    planets:[
      {index:0,name:'တနင်္ဂနွေ',longitude:10,speed:1},
      {index:1,name:'တနင်္လာ',longitude:20,speed:1},
      {index:6,name:'စနေ',longitude:245,speed:-1},
      {index:5,name:'သောကြာ',longitude:265,speed:1},
    ],
  };
  assert.deepEqual(chartSignEntries(chart,0).map(row=>row.text),[
    '၁ 10°00′','လ 15°00′','၂ 20°00′','II 21°00′','F 25°00′',
  ]);
  assert.deepEqual(chartSignEntries(chart,8).map(row=>row.text),[
    '၆ 25°00′','IX 20°00′','၀ 05°00′R',
  ]);
  const north=renderKPChart(chart,'North Indian','Classic');
  const south=renderKPChart(chart,'South Indian','Classic');
  assert.match(north,/class="chart-token sign"/);
  assert.match(south,/class="chart-token sign"/);
  assert.match(north,/လ 15°00′/);
  assert.match(south,/F 25°00′/);
});
