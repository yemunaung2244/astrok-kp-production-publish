import { angleDistance, lordsFor, normalize } from './kp-core.js';

const owners = [2,5,3,1,0,3,5,2,4,6,6,4];
const sign = longitude => Math.floor(normalize(longitude)/30);
const sorted = values => [...new Set(values.filter(x=>Number.isInteger(x)&&x>=1&&x<=12))].sort((a,b)=>a-b);
const indexOf = (r,name) => r.planets.findIndex(p=>p.name===name);
const easternHouses = index => index===2?[4,7,8]:index===4?[5,7,9]:index===6?[3,7,10]:[7];
const relativeHouse = (source,target) => (sign(target)-sign(source)+12)%12+1;
const aspects = (r,source,target) => easternHouses(source).includes(relativeHouse(r.planets[source].longitude,r.planets[target].longitude));
const owned = (r,index) => r.cusps.filter(c=>owners[sign(c.longitude)]===index).map(c=>c.number);

export function rulingItems(r){
  const p=r.profile,weekday=new Date(Date.UTC(Number(p.year),Number(p.month)-1,Number(p.day))).getUTCDay();
  const moon=r.planets[1].lords,asc=r.cusps[0].lords;
  return [['နေ့သခင်',r.planets[weekday].name],['စန်းသခင်',moon.signLord],['စန်းစီးနက္ခတ်သခင်',moon.starLord],['စန်းစီးဘုတ္တိနက္ခတ်သခင်',moon.subLord],['လဂ်သခင်',asc.signLord],['လဂ်စီးနက္ခတ်သခင်',asc.starLord],['လဂ်စီးဘုတ္တိနက္ခတ်သခင်',asc.subLord]];
}
function direct(r,index){
  const p=r.planets[index],star=r.planets[indexOf(r,p.lords.starLord)];
  return {levels:[[star?.house].filter(Boolean),[p.house].filter(Boolean),star?owned(r,star.index):[],owned(r,index)],representatives:[]};
}
function applyAgency(r,profile,nodeIndex,through){
  const node=r.planets[nodeIndex],candidates=[];
  for(const p of r.planets){if(p.index!==nodeIndex&&sign(p.longitude)===sign(node.longitude)&&angleDistance(p.longitude,node.longitude)<=10)candidates.push([p.index,'ပူးယှဉ်']);}
  for(const p of r.planets){if(p.index!==nodeIndex&&aspects(r,p.index,nodeIndex))candidates.push([p.index,'မြင်']);}
  candidates.push([owners[sign(node.longitude)],'ရာသီသခင်']);
  const seen=new Set();
  for(const [index,relationship] of candidates){if(index>6||seen.has(index))continue;seen.add(index);const delegated=direct(r,index);for(let i=0;i<4;i++)profile.levels[i].push(...delegated.levels[i]);profile.representatives.push({name:r.planets[index].name,relationship,through});}
}
export function planetSignifications(r){return r.planets.map(p=>{
  const profile=direct(r,p.index);
  if(p.index>=7)applyAgency(r,profile,p.index,false);
  // The four KP grades contain occupation and cusp ownership only.  A planet
  // aspecting another, or the houses it aspects, belongs to a separate (weaker)
  // consideration; it must not be inserted into L3.  Node agency applies to the
  // node itself, while a planet in the node's star uses that node's own house
  // at L1 rather than inheriting every house of each node representative.
  profile.levels=profile.levels.map(sorted);return{planet:p,...profile};
});}
export function houseSignifications(r){const rows=planetSignifications(r);return r.cusps.map(c=>({house:c.number,levels:[0,1,2,3].map(i=>rows.filter(row=>row.levels[i].includes(c.number)).map(row=>row.planet.name))}));}
export const METHODS=[['fourStep','လေးဆင့်အကျိုးဆောင်'],['naadi','နဒီ'],['spKhullar','S. P. Khullar'],['kBaskaran','K. Baskaran'],['aDevaraj','A. Devaraj'],['multiStellar','Multi Stellar'],['fiveLevel','အဆင့်ငါးဆင့်']];
export function methodSignifications(r,method){
  const base=planetSignifications(r),all=index=>index<0?[]:sorted(base[index].levels.flat());
  return r.planets.map(p=>{const star=indexOf(r,p.lords.starLord),sub=indexOf(r,p.lords.subLord),subSub=indexOf(r,p.lords.subSubLord),owner=owners[sign(p.longitude)];let labels,levels;
    switch(method){
      case'naadi':labels=['Planet','Star chain','Sign chain','Sub chain'];levels=[[p.house],all(star),all(owner),all(sub)];break;
      case'spKhullar':labels=['Star OCC','Planet OCC','Star OWN','Planet OWN','Sub confirm'];levels=[...base[p.index].levels,all(sub)];break;
      case'kBaskaran':labels=['Sub','Star','Planet','Sub-Sub'];levels=[all(sub),all(star),all(p.index),all(subSub)];break;
      case'multiStellar':labels=['Star','Sub','Sub-Sub','Sign','Planet'];levels=[all(star),all(sub),all(subSub),all(owner),all(p.index)];break;
      case'fiveLevel':labels=['Sign Lord','Star Lord','Sub Lord','Sub-Sub Lord','Planet'];levels=[all(owner),all(star),all(sub),all(subSub),all(p.index)];break;
      default:labels=['L1','L2','L3','L4'];levels=base[p.index].levels;
    }
    return{planet:p,labels,levels:levels.map(sorted)};
  });
}
function westernKind(a,b){const gap=angleDistance(a,b);return[[0,'ပူးယှဉ်'],[60,'Sextile'],[90,'Square'],[120,'Trine'],[180,'Opposition']].find(([angle])=>Math.abs(gap-angle)<=6)?.[1]||null;}
export function aspectRows(r,eastern,byHouse){return r.planets.map(p=>{
  const targets=byHouse?r.cusps:r.planets.filter(q=>q.index!==p.index);
  return{planet:p.name,targets:targets.flatMap(q=>{if(eastern){const targetSign=sign(q.longitude),relative=(targetSign-sign(p.longitude)+12)%12+1;if(!easternHouses(p.index).includes(relative))return[];return[`${byHouse?`${q.number} တန့်`:q.name} (${relative} တန့်)`];}const kind=westernKind(p.longitude,q.longitude);return kind?[`${byHouse?`${q.number} တန့်`:q.name} (${kind})`]:[];})};
});}
export function fortuna(r){const longitude=normalize(r.cusps[0].longitude+r.planets[1].longitude-r.planets[0].longitude);return{longitude,lords:lordsFor(longitude)};}
