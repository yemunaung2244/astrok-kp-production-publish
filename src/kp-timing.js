import { LORDS, YEARS, lordsFor, normalize, transitLongitudeAt } from './kp-core.js';

export const TIMING_BODIES = ['လဂ်','တနင်္ဂနွေ','တနင်္လာ','အင်္ဂါ','ဗုဒ္ဓဟူး','ကြာသပတေး','သောကြာ','စနေ','ရာဟု','ကိတ်'];
const SIGN_LORDS = ['အင်္ဂါ','သောကြာ','ဗုဒ္ဓဟူး','တနင်္လာ','တနင်္ဂနွေ','ဗုဒ္ဓဟူး','သောကြာ','အင်္ဂါ','ကြာသပတေး','စနေ','စနေ','ကြာသပတေး'];
const STAR_LENGTH = 360 / 27;
const DAY_MS = 86400000;
const signedDelta = (value,target) => {const delta=normalize(value-target);return delta>180?delta-360:delta;};

export function timingTargetStarts(signLord,starLord,subLord) {
  const targets=[];
  for(let sign=0;sign<12;sign++){
    if(SIGN_LORDS[sign]!==signLord)continue;
    const signStart=sign*30,signEnd=signStart+30;
    for(let star=0;star<27;star++){
      if(LORDS[star%9]!==starLord)continue;
      let cursor=star*STAR_LENGTH;
      for(let offset=0;offset<9;offset++){
        const index=(star%9+offset)%9, span=STAR_LENGTH*YEARS[index]/120;
        if(LORDS[index]===subLord){const target=Math.max(signStart,cursor);if(target<Math.min(signEnd,cursor+span)-1e-10)targets.push(normalize(target));}
        cursor+=span;
      }
    }
  }
  return targets.sort((a,b)=>a-b);
}

export function timingStepDays(body) {
  if(body==='လဂ်')return 15/86400;
  if(body==='တနင်္လာ')return 1/24;
  if(['တနင်္ဂနွေ','ဗုဒ္ဓဟူး','သောကြာ'].includes(body))return .25;
  return .5;
}
export function timingHorizonDays(body) {
  if(body==='လဂ်')return 2;
  if(body==='တနင်္လာ')return 35;
  if(body==='တနင်္ဂနွေ')return 370;
  if(['အင်္ဂါ','ဗုဒ္ဓဟူး','သောကြာ'].includes(body))return 900;
  return 11000;
}

export async function currentTimingLords(body,date,profile,positionAt=transitLongitudeAt) {
  if(!TIMING_BODIES.includes(body))throw new Error('ရှာဖွေမည့်ဂြိုဟ် မမှန်ပါ။');
  const longitude=await positionAt(date,profile,body);
  return lordsFor(longitude);
}

async function refineCrossing(left,right,leftDelta,body,target,profile,positionAt) {
  for(let i=0;i<48;i++){
    const mid=(left+right)/2;
    const delta=signedDelta(await positionAt(new Date(mid),profile,body),target);
    if(Math.abs(delta)<.000001)return mid;
    if(leftDelta*delta<=0)right=mid;
    else {left=mid;leftDelta=delta;}
  }
  return(left+right)/2;
}

async function firstCrossing(body,target,start,profile,positionAt,onProgress,latest=Infinity) {
  const step=timingStepDays(body)*DAY_MS,horizon=Math.min(timingHorizonDays(body)*DAY_MS,latest-start);
  let previousTime=start,previousDelta=signedDelta(await positionAt(new Date(start),profile,body),target);
  let iteration=0;
  for(let offset=step;offset<=horizon;offset+=step){
    const time=start+offset,delta=signedDelta(await positionAt(new Date(time),profile,body),target);
    if(Math.abs(delta)<.002)return time;
    if(Math.abs(previousDelta)<90&&Math.abs(delta)<90&&(previousDelta===0||delta===0||previousDelta*delta<0))return refineCrossing(previousTime,time,previousDelta,body,target,profile,positionAt);
    previousTime=time;previousDelta=delta;
    if(++iteration%250===0){await new Promise(resolve=>setTimeout(resolve,0));onProgress?.(Math.min(1,offset/horizon));}
  }
  return null;
}

export async function findNextTiming({body,signLord,starLord,subLord,from,profile,positionAt=transitLongitudeAt,onProgress}) {
  if(!TIMING_BODIES.includes(body))throw new Error('ရှာဖွေမည့်ဂြိုဟ် မမှန်ပါ။');
  const targets=timingTargetStarts(signLord,starLord,subLord);
  if(!targets.length)throw new Error('ရွေးချယ်ထားသော ရာသီ၊ နက္ခတ်၊ ဘုတ္တိ ပေါင်းစပ်မှု မမှန်ပါ။');
  const start=new Date(from).getTime();
  if(!Number.isFinite(start))throw new Error('စတင်ရှာမည့်အချိန် မမှန်ပါ။');
  let best=null;
  const current=await positionAt(new Date(start),profile,body);
  targets.sort((a,b)=>normalize(a-current)-normalize(b-current));
  for(const [index,target] of targets.entries()){
    const arrival=await firstCrossing(body,target,start,profile,positionAt,onProgress,best?.arrival);
    if(arrival!==null&&(!best||arrival<best.arrival))best={arrival,target};
    onProgress?.((index+1)/targets.length);
  }
  if(!best)throw new Error('သတ်မှတ်ထားသော ရှာဖွေကာလအတွင်း မတွေ့ပါ။');
  return{body,signLord,starLord,subLord,searchStart:new Date(start),arrivalDate:new Date(best.arrival+1000),targetLongitude:best.target};
}
