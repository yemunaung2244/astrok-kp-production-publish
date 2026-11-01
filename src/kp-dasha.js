import { LORDS, YEARS, normalize } from './kp-core.js';
const DAY=86400000,YEAR=365.2425;
const addYears=(timestamp,years)=>timestamp+Math.round(years*YEAR)*DAY;
function children(parentIndex,fullStart,fullEnd,clipStart,clipEnd,depth){
  if(!depth)return[];
  const rows=[];let cursor=fullStart;
  for(let offset=0;offset<9;offset++){
    const index=(parentIndex+offset)%9,end=cursor+(fullEnd-fullStart)*YEARS[index]/120;
    const start=Math.max(cursor,clipStart),stop=Math.min(end,clipEnd);
    if(start<stop)rows.push({lord:LORDS[index],start:new Date(start).toISOString(),end:new Date(stop).toISOString(),children:children(index,cursor,end,start,stop,depth-1)});
    cursor=end;
  }
  return rows;
}
export function dashaTimeline(moonLongitude,birthUTC){
  const starLength=13.33333333,moon=normalize(moonLongitude),star=Math.floor(moon/starLength),first=star%9;
  const remaining=YEARS[first]*(starLength-moon%starLength)/starLength;
  let cursor=new Date(birthUTC).getTime();const rows=[];
  for(let offset=0;offset<9;offset++){
    const index=(first+offset)%9,years=offset===0?remaining:YEARS[index],end=addYears(cursor,years);
    const fullStart=addYears(cursor,-(YEARS[index]-years));let bhuktiCursor=fullStart;const bhuktis=[];
    for(let child=0;child<9;child++){
      const childIndex=(index+child)%9,bhuktiEnd=addYears(bhuktiCursor,YEARS[index]*YEARS[childIndex]/120);
      const start=Math.max(cursor,bhuktiCursor),stop=Math.min(end,bhuktiEnd);
      if(start<stop)bhuktis.push({lord:LORDS[childIndex],start:new Date(start).toISOString(),end:new Date(stop).toISOString(),children:children(childIndex,bhuktiCursor,bhuktiEnd,start,stop,2)});
      bhuktiCursor=bhuktiEnd;
    }
    rows.push({lord:LORDS[index],start:new Date(cursor).toISOString(),end:new Date(end).toISOString(),children:bhuktis});cursor=end;
  }
  return rows;
}
