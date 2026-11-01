// The bundled catalog is the same GeoNames and Myanmar township data used by AstroK iOS.
export const FAVORITE_CITIES = [
  {cityName:'Yangon',country:'Myanmar',lat:16.8409,lon:96.1735,tz:6.5,timeZoneId:'Asia/Yangon'},
  {cityName:'Mandalay',country:'Myanmar',lat:21.9588,lon:96.0891,tz:6.5,timeZoneId:'Asia/Yangon'},
  {cityName:'Naypyidaw',country:'Myanmar',lat:19.7633,lon:96.0785,tz:6.5,timeZoneId:'Asia/Yangon'},
  {cityName:'Taunggyi',country:'Myanmar',lat:20.7888,lon:97.0335,tz:6.5,timeZoneId:'Asia/Yangon'},
  {cityName:'Mawlamyine',country:'Myanmar',lat:16.4833,lon:97.6333,tz:6.5,timeZoneId:'Asia/Yangon'}
];

export const displayCity = city => [city.cityName,city.region,city.country].filter(Boolean).join(', ');
const fold = value => String(value||'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase().trim();
const cityKey = city => `${city.cityName}|${city.country}|${city.lat}|${city.lon}`;

export function searchCities(cities,query,limit=80){
  const terms=fold(query).split(/\s+/).filter(Boolean);
  if(!terms.length)return cities.slice(0,30);
  const found=[];
  for(let index=0;index<cities.length;index++){
    const city=cities[index];
    const name=fold(city.cityName),region=fold(city.region),country=fold(city.country),alias=fold(city.searchName),code=fold(city.countryCode);
    const haystack=`${name} ${region} ${country} ${alias} ${code}`;
    if(!terms.every(term=>haystack.includes(term)))continue;
    let rank=name===terms.join(' ')?0:name.startsWith(terms[0])?1:name.includes(terms[0])?2:region.includes(terms[0])?3:country.includes(terms[0])||code===terms[0]?4:5;
    if(index<FAVORITE_CITIES.length)rank-=0.5;
    found.push({city,rank});
    // The source is sorted by population, so cap each quality tier without sorting 70k rows.
    if(found.length>1000){found.sort((a,b)=>a.rank-b.rank);found.length=400;}
  }
  found.sort((a,b)=>a.rank-b.rank);
  return found.slice(0,limit).map(x=>x.city);
}

export function uniqueCities(...groups){
  const seen=new Set(),all=[];
  for(const city of groups.flat()){const key=cityKey(city);if(!seen.has(key)){seen.add(key);all.push(city);}}
  return all;
}

// Resolve the offset for the chart's local date; GeoNames' tz is the fallback.
export function offsetForCity(city,profile){
  if(!city.timeZoneId)return Number(city.tz);
  const year=Number(profile.year),month=Number(profile.month),day=Number(profile.day),hour=Number(profile.hour||0),minute=Number(profile.min||0);
  if(![year,month,day,hour,minute].every(Number.isFinite))return Number(city.tz);
  const localUTC=Date.UTC(year,month-1,day,hour,minute);
  try{
    const formatter=new Intl.DateTimeFormat('en-US',{timeZone:city.timeZoneId,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'});
    const offsetAt=instant=>{const parts=Object.fromEntries(formatter.formatToParts(new Date(instant)).map(x=>[x.type,Number(x.value)]));return(Date.UTC(parts.year,parts.month-1,parts.day,parts.hour,parts.minute,parts.second)-instant)/3600000;};
    const initial=localUTC-Number(city.tz)*3600000;
    const first=offsetAt(initial),second=offsetAt(localUTC-first*3600000);
    return Number.isFinite(second)&&second>=-12&&second<=14?Math.round(second*3600)/3600:Number(city.tz);
  }catch{return Number(city.tz);}
}

let catalogPromise;
export async function loadCityCatalog(){
  catalogPromise??=(async()=>{
    const paths=['myanmar_townships.json','world_cities.json'].map(path=>`${import.meta.env?.BASE_URL || './'}${path}`);
    const results=await Promise.allSettled(paths.map(path=>fetch(path).then(response=>{if(!response.ok)throw new Error(`City data ${response.status}`);return response.json();})));
    if(results.every(x=>x.status==='rejected'))throw new Error('မြို့စာရင်းကို ဖတ်မရပါ။');
    return uniqueCities(FAVORITE_CITIES,...results.map(x=>x.status==='fulfilled'&&Array.isArray(x.value)?x.value:[]));
  })().catch(error=>{catalogPromise=null;throw error;});
  return catalogPromise;
}
