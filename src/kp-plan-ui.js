const features = [
  ['မူလဇာတာ/ဟူးရားဇာတာတွက်ကိန်းများ','Natal and horary chart calculations'],
  ['Chart Design','Chart designs'],
  ['ဂြိုဟ်/ဘာဝ ရာသီ၊ နက္ခတ်၊ ဘုတ္တိ၊ ဝိဘုတ္တိဇယား','Planet and house sign/star/sub/sub-sub tables'],
  ['ဝိသောတ္ထရီဒသာ (ထူလ၊ ဘုတ္တိ၊ အန္တရ၊ သုခုမ)','Vimshottari Dasha: Maha, Bhukti, Antara and Sukshma'],
  ['စိုးမိုးဂြိုဟ်များ','Ruling planets'],['အကျိုးဆောင်များ','Significators'],
  ['ဂြိုဟ်မြင်များ','Planetary aspects'],['ကံလဂ် တည်နေရာနှင့် အချက်အလက်များ','Fortuna position and details'],
  ['မူလဇာတာအဟောများ','Natal readings'],['ဟူးရားဇာတာအဟောများ','Horary readings'],
  ['ဘာဝလှည့်စနစ်','House rotation'],['ဂြိုဟ်သွား','Planetary transits'],
  ['ကံလဂ်အဟော','Fortuna readings'],['အချိန်ရှာစနစ်','Timing search'],
  ['မွေးချိန်မှန်ရှာဖွေခြင်း','Birth-time rectification'],['Ebook File ထုတ်ခြင်း','Ebook export']
];

export function planCards(english, active = 'free') {
  return [['free','Free',8,'၀','0'],['standard','Standard',12,'၃၀၀၀၀','30,000'],['premium','Premium',16,'၅၀၀၀၀','50,000']].map(([id,name,count,mmPrice,enPrice])=>`
    <section class="kp-plan-card ${id}">
      <h2>${name}${active===id?`<span class="current-plan">✓ ${english?'Current plan':'လက်ရှိအသုံးပြုနေသော Plan'}</span>`:''}</h2>
      <ul>${features.map((feature,index)=>`<li class="${index<count?'included':'excluded'}"><span aria-label="${index<count?'Included':'Not included'}">${index<count?'✓':'×'}</span>${feature[english?1:0]}</li>`).join('')}</ul>
      <button type="button" ${id==='free'?'data-entry-tab="entry"':`data-buy-plan="${id}"`}>${english?`${enPrice} Kyat / month`:`${mmPrice} ကျပ်/တစ်လ`}</button>
    </section>`).join('');
}

const navIcons = {
 home:'<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20h14V9.5"/>',
 entry:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>',
 plans:'<rect x="2" y="5" width="20" height="15" rx="3"/><path d="M2 10h20M6 15h5"/>',
 key:'<circle cx="8" cy="9" r="5"/><path d="m12 13 8 8m-4-4 3-3m-6 0 3-3"/>'
};
export function entryNavigation(screen, english) {
  return `<nav class="kp-entry-navigation" aria-label="${english?'AstroK Pro navigation':'AstroK Pro လမ်းညွှန်'}">${[
    ['home','မူလ','Home'],['entry','KP စနစ်','KP'],['plans','Plans','Plans'],['key','Key ထည့်ရန်','Key']
  ].map(([id,mm,en])=>`<button type="button" data-entry-tab="${id}" ${screen===id?'aria-current="page"':''}><span aria-hidden="true"><svg viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${navIcons[id]}</svg></span><b>${english?en:mm}</b></button>`).join('')}</nav>`;
}
