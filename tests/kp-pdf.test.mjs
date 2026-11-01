import test from 'node:test';
import assert from 'node:assert/strict';
import { pdfFromJpegs, kpEbookPDF, rectificationEbookPDF } from '../src/kp-pdf.js';
import { lordsFor } from '../src/kp-core.js';

test('Ebook PDF writer creates a real Letter-size multipage PDF',async()=>{
  const jpeg=Uint8Array.from([0xff,0xd8,0xff,0xd9]);
  const blob=pdfFromJpegs([jpeg,jpeg,jpeg]);
  assert.equal(blob.type,'application/pdf');
  assert.equal(blob.previewPages.length,3);
  assert.ok(blob.previewPages.every(page=>page instanceof Uint8Array));
  const data=new Uint8Array(await blob.arrayBuffer());
  const decoded=new TextDecoder().decode(data);
  assert.match(decoded,/^%PDF-1\.4/);
  assert.match(decoded,/\/Count 3/);
  assert.equal((decoded.match(/\/MediaBox \[0 0 612 792\]/g)||[]).length,3);
  assert.equal((decoded.match(/\/Subtype \/Image/g)||[]).length,3);
  assert.match(decoded,/startxref\n\d+\n%%EOF$/);
  assert.equal(data[data.length-1],0x46);
});

test('Horary Ebook export renders iOS cover, title, chart and reading pages as PDF',async()=>{
  const oldDocument=globalThis.document;
  const context={
    scale(){},fillRect(){},strokeRect(){},beginPath(){},roundRect(){},fill(){},stroke(){},moveTo(){},lineTo(){},fillText(){},
    measureText(value){return{width:String(value).length*7};},
  };
  const jpeg='data:image/jpeg;base64,/9j/2Q==';
  globalThis.document={fonts:{ready:Promise.resolve()},createElement(){return{width:0,height:0,getContext(){return context;},toDataURL(){return jpeg;}};}};
  const names=['တနင်္ဂနွေ','တနင်္လာ','အင်္ဂါ','ဗုဒ္ဓဟူး','ကြာသပတေး','သောကြာ','စနေ','ရာဟု','ကိတ်'];
  const result={
    profile:{name:'Test',question:'Question',isHorary:true,year:2026,month:11,day:1,hour:10,min:30,sec:0,cityName:'Yangon',tz:6.5},
    planets:names.map((name,index)=>({name,index,longitude:index*35+5,speed:1,lords:lordsFor(index*35+5)})),
    cusps:Array.from({length:12},(_,index)=>({number:index+1,longitude:index*30+12,lords:lordsFor(index*30+12)})),
  };
  try{
    const pdf=await kpEbookPDF(result,{horary:{prediction:'Answer',analysis:'Analysis'}});
    const content=new TextDecoder().decode(await pdf.arrayBuffer());
    assert.match(content,/\/Count 4/);
    assert.equal(pdf.type,'application/pdf');
    assert.equal(pdf.previewPages.length,4);
  }finally{globalThis.document=oldDocument;}
});

test('Individual reading Ebook renders only the selected prediction and analysis',async()=>{
  const original=globalThis.document,drawn=[];
  const ctx={scale(){},fillRect(){},strokeRect(){},beginPath(){},roundRect(){},fill(){},stroke(){},moveTo(){},lineTo(){},fillText(value){drawn.push(String(value));},measureText(value){return{width:String(value).length*7};}};
  globalThis.document={fonts:{ready:Promise.resolve()},createElement(){return{getContext(){return ctx;},toDataURL(){return 'data:image/jpeg;base64,/9j/2Q==';}};}};
  const names=['တနင်္ဂနွေ','တနင်္လာ','အင်္ဂါ','ဗုဒ္ဓဟူး','ကြာသပတေး','သောကြာ','စနေ','ရာဟု','ကိတ်'];
  const result={profile:{name:'Test',isHorary:false,year:2026,month:11,day:1,hour:10,min:30,sec:0,cityName:'Yangon',tz:6.5},planets:names.map((name,index)=>({name,index,longitude:index*35+5,speed:1,lords:lordsFor(index*35+5)})),cusps:Array.from({length:12},(_,index)=>({number:index+1,longitude:index*30+12,lords:lordsFor(index*30+12)}))};
  try{
    const pdf=await kpEbookPDF(result,{readingTitle:'Selected topic',selectedSections:[{title:'Selected topic',body:'ANALYSIS_MARKER\n\nPREDICTION_MARKER'}]});
    assert.equal(pdf.type,'application/pdf');
    assert.ok(drawn.some(value=>value.includes('ANALYSIS_MARKER')));
    assert.ok(drawn.some(value=>value.includes('PREDICTION_MARKER')));
    assert.ok(drawn.some(value=>value.includes('Selected topic')));
    assert.ok(!drawn.some(value=>value.includes('Favourable periods')));
  }finally{globalThis.document=original;}
});


test('Rectification uses iOS page size and retains analysis before conclusion over page breaks',async()=>{
  const original=globalThis.document,drawn=[];
  const ctx={scale(){},fillRect(){},strokeRect(){},beginPath(){},roundRect(){},fill(){},stroke(){},moveTo(){},lineTo(){},fillText(t){drawn.push(t);},measureText(t){return{width:String(t).length*7};}};
  globalThis.document={fonts:{ready:Promise.resolve()},createElement(){return{getContext(){return ctx;},toDataURL(){return 'data:image/jpeg;base64,/9j/2Q==';}};}};
  try{
    const pdf=await rectificationEbookPDF({name:'Native',year:2000,month:1,day:1,hour:12,min:0},{english:true,analysis:Array.from({length:150},(_,i)=>`Evidence ${i}`).join('\n'),prediction:'FINAL CONCLUSION'});
    const data=await pdf.text();assert.match(data,/MediaBox \[0 0 595 842\]/);assert.ok(Number(data.match(/\/Count (\d+)/)[1])>3);
    assert.ok(drawn.indexOf('Evidence 149')<drawn.indexOf('FINAL CONCLUSION'));
    await assert.rejects(()=>rectificationEbookPDF({},{}),/completed rectification/);
  }finally{globalThis.document=original;}
});

test('Long Ebook paragraphs keep every marked sentence when pagination adds pages',async()=>{
  const original=globalThis.document,drawn=[];
  const ctx={scale(){},fillRect(){},strokeRect(){},beginPath(){},roundRect(){},fill(){},stroke(){},moveTo(){},lineTo(){},fillText(value){drawn.push(String(value));},measureText(value){return{width:String(value).length*7};}};
  globalThis.document={fonts:{ready:Promise.resolve()},createElement(){return{getContext(){return ctx;},toDataURL(){return 'data:image/jpeg;base64,/9j/2Q==';}};}};
  const names=['တနင်္ဂနွေ','တနင်္လာ','အင်္ဂါ','ဗုဒ္ဓဟူး','ကြာသပတေး','သောကြာ','စနေ','ရာဟု','ကိတ်'];
  const result={profile:{name:'Test',question:'Question',isHorary:true,year:2026,month:11,day:1,hour:10,min:30,sec:0,cityName:'Yangon',tz:6.5},planets:names.map((name,index)=>({name,index,longitude:index*35+5,speed:1,lords:lordsFor(index*35+5)})),cusps:Array.from({length:12},(_,index)=>({number:index+1,longitude:index*30+12,lords:lordsFor(index*30+12)}))};
  const markers=Array.from({length:80},(_,index)=>`SENTENCE${String(index).padStart(3,'0')}`);
  try{
    const pdf=await kpEbookPDF(result,{horary:{prediction:markers.map(marker=>`${marker}။`).join('\n'),analysis:'ကျန်းမာရေးအခြေအနေ\n### အပြည့်အစုံသုံးသပ်ချက်'}});
    assert.ok(pdf.previewPages.length>4);
    for(const marker of markers)assert.equal(drawn.filter(line=>line.includes(marker)).length,1,marker);
    assert.ok(drawn.includes('ကျန်းမာရေးအခြေအနေ'));
    assert.ok(drawn.includes('အပြည့်အစုံသုံးသပ်ချက်'));
    assert.ok(!drawn.includes('းမာရေးအခြေအနေ'));
  }finally{globalThis.document=original;}
});
