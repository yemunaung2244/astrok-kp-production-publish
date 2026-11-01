import { authClient } from './auth.js';

export function chartKey(chart) {
  return [chart.name, chart.year, chart.month, chart.day, chart.hour, chart.min,
    chart.sec ?? '0', chart.lat, chart.lon, chart.tz, chart.ayanamsaIndex ?? 0,
    Boolean(chart.isHorary), chart.horaryNumber ?? '', chart.horaryNumberSystem ?? 249,
    Boolean(chart.isTSPHorary)].map(String).join('|');
}

export function validChart(chart) {
  return chart && typeof chart === 'object' && !Array.isArray(chart)
    && typeof chart.name === 'string' && chart.name.length <= 500
    && ['year', 'month', 'day', 'hour', 'min', 'lat', 'lon', 'tz'].every(key =>
      chart[key] !== undefined && Number.isFinite(Number(chart[key])));
}

export function mergeKPCharts(local, remote, deleted = []) {
  const blocked = new Set(deleted);
  const charts = new Map();
  for (const chart of [...(Array.isArray(remote) ? remote : []), ...(Array.isArray(local) ? local : [])]) {
    if (validChart(chart) && !blocked.has(chartKey(chart))) charts.set(chartKey(chart), chart);
  }
  return [...charts.values()];
}

export async function fetchSavedKPCharts(userId) {
  const { data, error } = await authClient.from('saved_charts')
    .select('chart_json').eq('user_id', userId).eq('chart_type', 'kp').maybeSingle();
  if (error) throw error;
  return Array.isArray(data?.chart_json) ? data.chart_json : [];
}

export async function writeSavedKPCharts(userId, charts) {
  const { error } = await authClient.from('saved_charts').upsert({
    user_id: userId, chart_type: 'kp', chart_json: charts,
  }, { onConflict: 'user_id,chart_type' });
  if (error) throw error;
}
