import { NATAL_CATEGORIES, natalReading, formatReadingPeriod } from './kp-natal-readings.js';
import { rulingItems } from './kp-analysis.js';
import { nakshatraName } from './chart-two.js';
import { SIGN_MM, normalize } from './kp-core.js';
import { SIGN_EN, planetLabel, rulingLabel } from './locale.js';

const WIDTH=612,HEIGHT=792,SCALE=2,MARGIN=42;
const NAVY='#09182e',BLUE='#144780',GOLD='#c99b45',INK='#1a1f29',RED='#be2430';
const ROMAN=['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];
const SYMBOLS={'တနင်္ဂနွေ':'၁','တနင်္လာ':'၂','အင်္ဂါ':'၃','ဗုဒ္ဓဟူး':'၄','ကြာသပတေး':'၅','သောကြာ':'၆','စနေ':'၀','ရာဟု':'၈','ကိတ်':'၉'};
const FONT='"Myanmar Sangam MN","Noto Sans Myanmar",Arial,sans-serif';
const text=(english,mm,en)=>english?en:mm;
const safeDate=profile=>`${String(profile.day).padStart(2,'0')}/${String(profile.month).padStart(2,'0')}/${profile.year} ${String(profile.hour).padStart(2,'0')}:${String(profile.min).padStart(2,'0')}:${String(profile.sec??0).padStart(2,'0')}`;
const title=(horary,english)=>horary?text(english,'KP ဟူးရားဇာတာဟောစာတမ်း','KP HORARY CHART REPORT'):text(english,'KP မူလဇာတာဟောစာတမ်း','KP NATAL CHART REPORT');
const rgb=hex=>[1,3,5].map(index=>parseInt(hex.slice(index,index+2),16));
const darkText=hex=>{const [r,g,b]=rgb(hex);return(r*299+g*587+b*114)/255000>.608;};
function canvasPage(width=WIDTH,height=HEIGHT){const canvas=document.createElement('canvas');canvas.width=width*SCALE;canvas.height=height*SCALE;const ctx=canvas.getContext('2d',{alpha:false});ctx.scale(SCALE,SCALE);ctx.fillStyle='#fff';ctx.fillRect(0,0,width,height);ctx.textBaseline='top';return{canvas,ctx};}
function font(ctx,size,bold=false){ctx.font=`${bold?'700':'400'} ${size}px ${FONT}`;}
function fitted(ctx,value,x,y,width,size,min=8,color=INK,bold=false,align='center'){
  ctx.fillStyle=color;ctx.textAlign=align;let selected=size;font(ctx,selected,bold);
  while(selected>min&&ctx.measureText(value).width>width){selected-=.5;font(ctx,selected,bold);}
  ctx.fillText(value,x,y,Math.max(width,1));return selected;
}
function center(ctx,value,y,size,color=INK,bold=false){return fitted(ctx,value,WIDTH/2,y,WIDTH-120,size,10,color,bold);}
function line(ctx,x1,y1,x2,y2,color='#ddd',width=1){ctx.strokeStyle=color;ctx.lineWidth=width;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();}
function rounded(ctx,x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r);}
function pageFrame(ctx,page,profile,author,english,horary){
  fitted(ctx,`${author} · ${title(horary,english)}`,MARGIN,25,450,8,6,'#777',false,'left');
  fitted(ctx,String(page),570,25,40,8,6,'#777',false,'right');
  line(ctx,MARGIN,51,570,51,'#e0e2e6',.7);line(ctx,MARGIN,755,570,755,'#e0e2e6',.7);
  fitted(ctx,profile.name||'',MARGIN,762,520,8,6,'#777',false,'left');
}
function drawCover(ctx,result,author,color,english){
  const p=result.profile,horary=Boolean(p.isHorary),light=darkText(color),ink=light?NAVY:'#fff',accent=light?NAVY:GOLD;
  ctx.fillStyle=color;ctx.fillRect(0,0,WIDTH,HEIGHT);ctx.strokeStyle=accent;ctx.lineWidth=2;ctx.strokeRect(24,24,564,744);
  ctx.strokeStyle=light?'#09182e38':'#ffffff38';ctx.lineWidth=.8;ctx.strokeRect(32,32,548,728);
  line(ctx,180,124,432,124,accent,1);center(ctx,title(horary,english),225,29,ink,true);
  center(ctx,text(english,`ဟောစာတမ်းပြုစုသူ - ${author}`,`Prepared by ${author}`),336,16,accent,true);
  const y=horary?390:470,h=horary?330:130;
  ctx.fillStyle=light?'#0000000f':'#ffffff17';rounded(ctx,82,y,448,h,14);ctx.fill();
  ctx.strokeStyle=light?'#09182e33':'#ffffff33';ctx.lineWidth=1;rounded(ctx,82,y,448,h,14);ctx.stroke();
  center(ctx,text(english,horary?'ဟူးရားမေးခွန်း':'ဇာတာရှင်',horary?'Horary question':'Native'),y+22,12,light?'#384961':'#d9cde3');
  if(horary){textBox(ctx,p.question||p.name||'',98,446,416,214,22,ink,true);center(ctx,safeDate(p),y+h-44,12,light?'#526070':'#decde5');}
  else{center(ctx,p.name||'',535,22,ink,true);center(ctx,safeDate(p),575,12,light?'#526070':'#decde5');}
}
function drawTitlePage(ctx,result,author,english){const p=result.profile,horary=Boolean(p.isHorary);pageFrame(ctx,2,p,author,english,horary);center(ctx,title(horary,english),275,30,NAVY,true);if(horary)textBox(ctx,p.question||p.name||'',76,365,460,136,23,BLUE,true);else center(ctx,p.name||'',370,23,BLUE,true);center(ctx,safeDate(p),horary?516:420,14,'#555');center(ctx,`${p.cityName||''} · UTC${Number(p.tz)>=0?'+':''}${p.tz}`,horary?558:452,13,'#555');if(horary&&p.horaryNumber)center(ctx,String(p.horaryNumber),620,14,BLUE);}
function wrap(ctx,value,width){
  const lines=[];
  const wordSegmenter=typeof Intl.Segmenter==='function'?new Intl.Segmenter('my',{granularity:'word'}):null;
  const graphemeSegmenter=typeof Intl.Segmenter==='function'?new Intl.Segmenter('my',{granularity:'grapheme'}):null;
  for(const paragraph of String(value).split('\n')){
    const words=wordSegmenter?[...wordSegmenter.segment(paragraph)].map(part=>part.segment):Array.from(paragraph);
    let current='';
    for(const word of words){
      if(ctx.measureText(current+word).width<=width){current+=word;continue;}
      if(current){lines.push(current);current='';}
      if(ctx.measureText(word).width<=width){current=word;continue;}
      const graphemes=graphemeSegmenter?[...graphemeSegmenter.segment(word)].map(part=>part.segment):Array.from(word);
      for(const char of graphemes){
        if(current&&ctx.measureText(current+char).width>width){lines.push(current);current='';}
        current+=char;
      }
    }
    lines.push(current);
  }
  return lines;
}
function textBox(ctx,value,x,y,width,height,size,color,bold=false){
  let lines;do{font(ctx,size,bold);lines=wrap(ctx,String(value),width);if(lines.length*size*1.6<=height)break;size-=.5;}while(size>9);
  lines.forEach((part,index)=>fitted(ctx,part,x+width/2,y+index*size*1.6,width,size,size,color,bold));
}
function chart(ctx,result){
  const x=42,y=112,side=300,cell=100;ctx.strokeStyle='#5c4524';ctx.lineWidth=1.2;ctx.strokeRect(x,y,side,side);
  for(let i=1;i<3;i++){line(ctx,x+i*cell,y,x+i*cell,y+side,'#5c4524',1);line(ctx,x,y+i*cell,x+side,y+i*cell,'#5c4524',1);}
  for(const [a,b,c,d] of [[0,0,100,100],[300,0,200,100],[0,300,100,200],[300,300,200,200]])line(ctx,x+a,y+b,x+c,y+d,'#5c4524',1);
  const positions=[[150,50],[75,28],[26,75],[50,150],[26,225],[75,275],[150,250],[225,275],[274,225],[250,150],[274,75],[225,28]];
  for(let sign=0;sign<12;sign++){
    const rows=[];if(Math.floor(normalize(result.cusps[0].longitude)/30)===sign)rows.push({value:'လ',color:INK});
    for(const planet of result.planets.filter(item=>Math.floor(normalize(item.longitude)/30)===sign)){
      const within=normalize(planet.longitude)%30,degree=Math.floor(within),minute=Math.round((within-degree)*60);
      rows.push({value:`${SYMBOLS[planet.name]||planet.name} ${String(degree).padStart(2,'0')}°${String(minute).padStart(2,'0')}′${planet.speed<0?'R':''}`,color:planet.speed<0?RED:INK});
    }
    const houses=result.cusps.filter(item=>Math.floor(normalize(item.longitude)/30)===sign).map(item=>ROMAN[item.number-1]);if(houses.length)rows.push({value:houses.join(' '),color:INK});
    const [cx,cy]=positions[sign],step=Math.min(9,52/Math.max(rows.length,1)),start=y+cy-(rows.length-1)*step/2;
    for(let index=0;index<rows.length;index++)fitted(ctx,rows[index].value,x+cx,start+index*step,sign%3===0?88:78,7.4,4,rows[index].color,false);
  }
}
function ruling(ctx,result,english){
  const x=365,y=112,w=205;fitted(ctx,text(english,'စိုးမိုးဂြိုဟ်များ','Ruling Planets'),x,y,w,15,9,BLUE,true,'left');
  rulingItems(result).forEach(([heading,name],index)=>{const top=y+38+index*34;fitted(ctx,rulingLabel(heading,english),x,top,w*.68,8.7,6,INK,false,'left');fitted(ctx,planetLabel(name,english),x+w,top,w*.34,8.7,6,result.planets.some(item=>item.name===name&&item.speed<0)?RED:NAVY,true,'right');});
}
function grid(ctx,values,x,y,w,h,firstRatio=1.15,retro=[]){
  const cols=values[0].length,rows=values.length,unit=w/(cols-1+firstRatio),first=unit*firstRatio,header=values[0].some(value=>value.includes('\n'))?h*.38:h/rows,body=(h-header)/(rows-1);
  ctx.strokeStyle='#666';ctx.lineWidth=.55;ctx.strokeRect(x,y,w,h);
  for(let col=1;col<cols;col++)line(ctx,x+first+(col-1)*unit,y,x+first+(col-1)*unit,y+h,'#777',.45);
  for(let row=1;row<rows;row++)line(ctx,x,y+header+(row-1)*body,x+w,y+header+(row-1)*body,'#777',.45);
  values.forEach((items,row)=>items.forEach((value,col)=>{
    const left=col?x+first+(col-1)*unit:x,width=col?unit:first,top=row?y+header+(row-1)*body:y,height=row?body:header;
    let size=cols>11?5.8:6.8,wrapped;
    do{font(ctx,size,row===0||col===0);wrapped=wrap(ctx,String(value),width-4);if(wrapped.length*size*1.1<=height-3)break;size-=.2;}while(size>2.8);
    wrapped.forEach((part,index)=>fitted(ctx,part,left+width/2,top+2+index*size*1.1,width-3,size,Math.min(size,2.8),row===0&&retro.includes(col)?RED:INK,row===0||col===0));
  }));
}
function chartPage(ctx,result,author,english){
  const p=result.profile;pageFrame(ctx,3,p,author,english,Boolean(p.isHorary));center(ctx,text(english,'ဇာတာအချက်အလက်များ','Chart Information'),66,21,NAVY,true);
  chart(ctx,result);ruling(ctx,result,english);
  fitted(ctx,text(english,'ဂြိုဟ်ဇယား','Planet Table'),42,420,528,14,10,BLUE,true,'left');
  const planets=result.planets,planetRows=[
    [text(english,'ဂြိုဟ်','Planet'),...planets.map(item=>`${planetLabel(item.name,english)}\n(${nakshatraName(item.longitude,english)})`)],
    [text(english,'ရာသီ','Sign'),...planets.map(item=>(english?SIGN_EN:SIGN_MM)[Math.floor(normalize(item.longitude)/30)])],
    [text(english,'နက္ခတ်','Star'),...planets.map(item=>planetLabel(item.lords.starLord,english))],
    [text(english,'ဘုတ္တိ','Sub'),...planets.map(item=>planetLabel(item.lords.subLord,english))],
  ];grid(ctx,planetRows,42,448,528,116,1.15,planets.flatMap((item,index)=>item.speed<0?[index+1]:[]));
  fitted(ctx,text(english,'ဘာဝဇယား','Cusp Table'),42,572,528,14,10,BLUE,true,'left');
  const cusps=result.cusps,cuspRows=[
    [text(english,'ဘာဝ','House'),...cusps.map(item=>ROMAN[item.number-1])],
    [text(english,'ရာသီ','Sign'),...cusps.map(item=>(english?SIGN_EN:SIGN_MM)[Math.floor(normalize(item.longitude)/30)])],
    [text(english,'နက္ခတ်','Star'),...cusps.map(item=>planetLabel(item.lords.starLord,english))],
    [text(english,'ဘုတ္တိ','Sub'),...cusps.map(item=>planetLabel(item.lords.subLord,english))],
  ];grid(ctx,cuspRows,42,600,528,116,1.25);
}
function sections(result,english,horary){
  if(result.profile.isHorary){return horary?[{title:text(english,'မေးခွန်း','Question'),body:result.profile.question||result.profile.name},{title:text(english,'အဟော','Prediction'),body:horary.prediction},{title:text(english,'ဇာတာသုံးသပ်ချက်','Chart Analysis'),body:horary.analysis}]:[];}
  const order=['appearance','longevity','health','healthPeriods','accident','wealth','debt','beneficialCareer','careerChange','careerPeriods','natalLottery','lumpSum','property','propertySale','vehicle','education','educationPeriods','marriage','marriagePeriods','children','foreignTravel','foreignTravelPeriods','gemstone','lifeSuccess'];
  const all=NATAL_CATEGORIES.filter(([id])=>id!=='birthRectification').flatMap(([id])=>natalReading(result,id,english).sections||[]);
  return all.filter(item=>item.prediction).sort((a,b)=>order.indexOf(a.id)-order.indexOf(b.id)).map(item=>({title:text(english,item.mm,item.en),body:item.prediction+(item.periods?.length?'\n\n'+text(english,'အကျိုးပေးနိုင်သောအချိန်များ','Favourable periods')+'\n'+item.periods.map(period=>formatReadingPeriod(period,result.profile,english)).join('\n'):'')}));
}
function readingPages(result,author,english,horary,selectedSections=null){
  const pages=[];let pageNumber=3,page,ctx,y=736;
  const next=()=>{if(page)pages.push(dataBytes(page.canvas.toDataURL('image/jpeg',.92)));page=canvasPage();ctx=page.ctx;pageNumber++;pageFrame(ctx,pageNumber,result.profile,author,english,Boolean(result.profile.isHorary));y=70;};
  const draw=(value,size,color,bold=false,space=7,align='left')=>{
    font(ctx,size,bold);
    const lines=wrap(ctx,String(value),WIDTH-2*MARGIN-8);
    const lineHeight=size*1.58,blockHeight=lines.length*lineHeight+space;
    // Keep a paragraph together when it fits on one page. Long paragraphs
    // still flow to the next page line by line without dropping any text.
    if(y+blockHeight>736&&blockHeight<=736-70)next();
    for(const lineText of lines){
      if(y+lineHeight>736)next();
      fitted(ctx,lineText,align==='right'?WIDTH-MARGIN:MARGIN,y,WIDTH-2*MARGIN-8,size,size,color,bold,align);
      y+=lineHeight;
    }
    y+=space;
  };
  const blockHeight=(value,size,bold=false,space=7)=>{font(ctx,size,bold);return wrap(ctx,String(value),WIDTH-2*MARGIN-8).length*size*1.58+space;};
  next();
  for(const section of [...(selectedSections||sections(result,english,horary)),{title:'',body:`${text(english,'စိတ်ချမ်းသာကိုယ်ကျန်းမာကြပါစေ။','Wishing you happiness and good health.')}\n${author}`,closing:true}]){
    const paragraphs=String(section.body).split('\n');
    const opening=paragraphs.filter(part=>part.trim()&&part.trim()!==section.title).slice(0,2);
    const titleHeight=section.title?blockHeight(section.title,21,true,14):0;
    const openingHeight=opening.reduce((height,part,index)=>height+blockHeight(part,index===0&&opening.length>1?15:14,index===0&&opening.length>1,5),0);
    if(y+titleHeight+(openingHeight<=736-70?openingHeight:Math.min(openingHeight,90))>736)next();
    if(section.title)draw(section.title,21,NAVY,true,14);
    if(section.subheading)draw(section.subheading,15,BLUE,true,8);
    for(let index=0;index<paragraphs.length;index++){
      const paragraph=paragraphs[index];
      if(!paragraph.trim()){y+=7;continue;}if(paragraph.trim()===section.title)continue;
      const trimmed=paragraph.trim(),markedHeading=trimmed.startsWith('### ');
      const heading=markedHeading||(!/[။.?]$/.test(trimmed)&&paragraph.length<90&&/အဟော|အခြေအနေ|အလားအလာ|ကာလ|သုံးသပ်ချက်|ပိုင်ဆိုင်မှု|period|outlook|guidance|prediction/i.test(paragraph));
      if(heading){
        const following=paragraphs.slice(index+1).find(part=>part.trim())||'';
        if(y+blockHeight(paragraph,15,true,8)+Math.min(blockHeight(following,14,false,5),180)>736)next();
      }
      draw(markedHeading?trimmed.slice(4):paragraph,heading?15:14,heading?BLUE:INK,heading,heading?8:5,section.closing?'right':'left');
    }
    y+=12;
  }
  if(page)pages.push(dataBytes(page.canvas.toDataURL('image/jpeg',.92)));
  return pages;
}
function bytes(value){return new TextEncoder().encode(value);}
function dataBytes(dataUrl){const raw=atob(dataUrl.split(',')[1]),out=new Uint8Array(raw.length);for(let index=0;index<raw.length;index++)out[index]=raw.charCodeAt(index);return out;}
export function pdfFromJpegs(images,{width=WIDTH,height=HEIGHT}={}){
  const parts=[],offsets=[0];let size=0;const push=value=>{const data=typeof value==='string'?bytes(value):value;parts.push(data);size+=data.length;};
  const object=(id,body)=>{offsets[id]=size;push(`${id} 0 obj\n`);for(const part of body)push(part);push('\nendobj\n');};
  push('%PDF-1.4\n%âãÏÓ\n');const kids=images.map((_,index)=>`${5+index*3} 0 R`).join(' ');
  object(1,[`<< /Type /Catalog /Pages 2 0 R >>`]);object(2,[`<< /Type /Pages /Kids [${kids}] /Count ${images.length} >>`]);
  images.forEach((jpeg,index)=>{
    const imageId=3+index*3,contentId=imageId+1,pageId=imageId+2,stream=`q ${width} 0 0 ${height} 0 0 cm /Im${index} Do Q\n`;
    object(imageId,[`<< /Type /XObject /Subtype /Image /Width ${width*SCALE} /Height ${height*SCALE} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`,jpeg,'\nendstream']);
    object(contentId,[`<< /Length ${bytes(stream).length} >>\nstream\n${stream}endstream`]);
    object(pageId,[`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${width} ${height}] /Resources << /XObject << /Im${index} ${imageId} 0 R >> >> /Contents ${contentId} 0 R >>`]);
  });
  const start=size;push(`xref\n0 ${offsets.length}\n0000000000 65535 f \n`);for(let id=1;id<offsets.length;id++)push(`${String(offsets[id]).padStart(10,'0')} 00000 n \n`);
  push(`trailer\n<< /Size ${offsets.length} /Root 1 0 R >>\nstartxref\n${start}\n%%EOF`);
  const pdf=new Blob(parts,{type:'application/pdf'});
  // The in-app reader uses the same rendered pages as the downloaded PDF.
  // This avoids relying on an embedded browser's PDF plug-in.
  pdf.previewPages=images;
  return pdf;
}
export async function kpEbookPDF(result,{english=false,horary=null,coverColor='#5B1B77',author='ဆရာထွန်းလင်း',selectedSections=null,readingTitle=''}={}){
  if(!result?.profile||!Array.isArray(result.planets)||!Array.isArray(result.cusps))throw new Error('A calculated chart is required.');
  await document.fonts?.ready;
  const selected=/^#[0-9a-f]{6}$/i.test(coverColor)?coverColor:'#5B1B77',pages=[];
  let page=canvasPage();drawCover(page.ctx,result,author,selected,english);if(readingTitle)center(page.ctx,readingTitle,300,18,GOLD,true);pages.push(dataBytes(page.canvas.toDataURL('image/jpeg',.92)));
  page=canvasPage();drawTitlePage(page.ctx,result,author,english);if(readingTitle)center(page.ctx,readingTitle,325,18,BLUE,true);pages.push(dataBytes(page.canvas.toDataURL('image/jpeg',.92)));
  page=canvasPage();chartPage(page.ctx,result,author,english);pages.push(dataBytes(page.canvas.toDataURL('image/jpeg',.92)));
  pages.push(...readingPages(result,author,english,horary,selectedSections));
  return pdfFromJpegs(pages);
}

// The separate iOS rectification exporter uses 595 × 842 pages, analysis first.
export async function rectificationEbookPDF(profile,{analysis,prediction,english=false,coverColor='#5B1B77'}={}){
  if(!analysis||!prediction)throw new Error('A completed rectification reading is required.');
  await document.fonts?.ready;
  const width=595,height=842,pages=[],heading=text(english,'မွေးချိန်မှန်ရှာဖွေသုံးသပ်ချက်များ','Birth Time Rectification Analysis');
  const color=/^#[0-9a-f]{6}$/i.test(coverColor)?coverColor:'#5B1B77';
  let page=canvasPage(width,height),ctx=page.ctx;
  ctx.fillStyle=color;ctx.fillRect(0,0,width,height);ctx.strokeStyle=GOLD;ctx.lineWidth=2;ctx.strokeRect(24,24,width-48,height-48);
  const coverText=darkText(color)?NAVY:'#fff',accent=darkText(color)?'#751f29':GOLD;
  textBox(ctx,text(english,'နက္ခတ်ဗေဒင်ဟောစာတမ်း','Astrology Reading Ebook'),42,190,511,90,24,coverText,true);
  textBox(ctx,heading,42,320,511,64,28,accent,true);
  textBox(ctx,text(english,'KP မူလဇာတာအခြေပြုတွက်ချက်မှု','KP Natal Chart'),42,385,511,60,16,coverText);
  ctx.fillStyle='#fff';rounded(ctx,92,500,411,118,12);ctx.fill();
  textBox(ctx,text(english,'ဇာတာရှင်','Native'),92,530,411,30,14,'#555');textBox(ctx,profile.name||'',92,566,411,48,21,NAVY,true);
  pages.push(dataBytes(page.canvas.toDataURL('image/jpeg',.92)));
  let y=0;
  const next=()=>{if(y)pages.push(dataBytes(page.canvas.toDataURL('image/jpeg',.92)));page=canvasPage(width,height);ctx=page.ctx;ctx.fillStyle=NAVY;ctx.fillRect(0,0,width,68);textBox(ctx,heading,34,20,527,44,18,'#fff',true);line(ctx,42,800,553,800);fitted(ctx,profile.name||'',42,808,511,9,9,'#777',false,'left');y=96;};
  const draw=(value,size,color,bold=false)=>{font(ctx,size,bold);const lines=wrap(ctx,value,511);for(const part of lines){if(y+size+5>776)next();fitted(ctx,part,42,y,511,size,size,color,bold,'left');y+=size+5;}y+=8;};
  next();draw(`${text(english,'ဇာတာရှင်အမည်','Native')}: ${profile.name||''}\n${text(english,'မှတ်တမ်းတင်မွေးချိန်','Recorded birth time')}: ${safeDate(profile)}`,12,'#777');y+=24;
  for(const [label,body] of [[heading,analysis],[text(english,'မွေးချိန်မှန်ရှာဖွေသုံးသပ်ချက်အနှစ်ချုပ်','Rectification Conclusion'),prediction]]){if(y>686)next();draw(label,18,NAVY,true);draw(body,14,INK);y+=22;}
  pages.push(dataBytes(page.canvas.toDataURL('image/jpeg',.92)));return pdfFromJpegs(pages,{width,height});
}
