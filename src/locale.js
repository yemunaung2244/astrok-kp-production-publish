import { SIGN_MM, normalize } from './kp-core.js';

export const PLANET_EN = {
  'တနင်္ဂနွေ':'Sun','တနင်္လာ':'Moon','အင်္ဂါ':'Mars','ဗုဒ္ဓဟူး':'Mercury',
  'ကြာသပတေး':'Jupiter','သောကြာ':'Venus','စနေ':'Saturn','ရာဟု':'Rahu','ကိတ်':'Ketu','လဂ်':'Ascendant'
};
export const SIGN_EN = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
export const RELATION_EN = {'ပူးယှဉ်':'Conjunction','မြင်':'Aspect','ရာသီသခင်':'Sign lord'};
export const RULING_EN = {
  'နေ့သခင်':'Day lord','စန်းသခင်':'Moon sign lord','စန်းစီးနက္ခတ်သခင်':'Moon star lord',
  'စန်းစီးဘုတ္တိနက္ခတ်သခင်':'Moon sub lord','လဂ်သခင်':'Ascendant sign lord',
  'လဂ်စီးနက္ခတ်သခင်':'Ascendant star lord','လဂ်စီးဘုတ္တိနက္ခတ်သခင်':'Ascendant sub lord'
};
export const METHOD_EN = {
  'လေးဆင့်အကျိုးဆောင်':'Four-step significators','နဒီ':'Naadi','အဆင့်ငါးဆင့်':'Five-level significators'
};
const ERROR_EN = [
  [/ရက်စွဲ၊ အချိန်၊ Lat\/Long\/TZ/, 'Check the date, time, latitude, longitude and time zone. Placidus requires latitude within ±66°.'],
  [/ရက်စွဲ မမှန်/, 'Invalid date.'],[/ဟူးရားနံပါတ်/, 'Enter a horary number within the selected range.'],
  [/ဟူးရား ၁–၂၄၉ data/, 'Could not load KP 1–249 horary data.'],
  [/ဟူးရားနံပါတ် data/, 'Horary number data was not found.'],
  [/ဟူးရားလဂ်/, 'Could not calculate the horary ascendant precisely.'],
  [/ရှာဖွေမည့်ဂြိုဟ်/, 'Invalid transit body.'],[/ရွေးချယ်ထားသော ရာသီ/, 'The selected sign, star and sub-lord combination is invalid.'],
  [/စတင်ရှာမည့်အချိန်/, 'Invalid search start time.'],[/သတ်မှတ်ထားသော ရှာဖွေကာလ/, 'No entry was found within the search period.'],
  [/ရွေးထားသော ကောဇာဂြိုဟ်/, 'The selected transit body was not found.'],
  [/မြို့စာရင်းကို ဖတ်မရ/, 'Could not load the city catalog.'],
  [/At least two life events/, 'Enter at least two life events on different dates.'],
  [/Life events must occur/, 'Life event dates must be after the birth date.']
];
export const planetLabel=(name,english)=>english?(PLANET_EN[name]||name):name;
export const signLabel=(name,english)=>english?(SIGN_EN[SIGN_MM.indexOf(name)]||name):name;
export const rulingLabel=(name,english)=>english?(RULING_EN[name]||name):name;
export const methodLabel=(name,english)=>english?(METHOD_EN[name]||name):name;
export const relationLabel=(name,english)=>english?(RELATION_EN[name]||name):name;
export function degreeLabel(longitude,english){
  const value=normalize(longitude),index=Math.floor(value/30),within=value-index*30;
  const degrees=Math.floor(within),minutes=Math.round((within-degrees)*60);
  const sign=english?SIGN_EN[index]:SIGN_MM[index];
  return`${sign} ${String(degrees+(minutes===60?1:0)).padStart(2,'0')}° ${String(minutes%60).padStart(2,'0')}′`;
}
export const houseLabel=(number,english)=>english?`House ${number}`:`${number} တန့်`;
export function aspectTargetLabel(text,english){
  if(!english)return text;
  return text.replace(/[၀-၉]/g,d=>String('၀၁၂၃၄၅၆၇၈၉'.indexOf(d)))
    .replace(/(\d+) တန့်/g,(_,n)=>`House ${n}`)
    .replace(/\((ပူးယှဉ်|မြင်|ရာသီသခင်)\)/g,(_,name)=>`(${relationLabel(name,true)})`)
    .replace(/^(တနင်္ဂနွေ|တနင်္လာ|အင်္ဂါ|ဗုဒ္ဓဟူး|ကြာသပတေး|သောကြာ|စနေ|ရာဟု|ကိတ်)/,name=>planetLabel(name,true));
}
export function errorLabel(error,english){const message=String(error?.message||error||'');if(!english){if(message.startsWith('At least two life events'))return'ရက်စွဲမတူသော ဘဝဖြစ်ရပ်အနည်းဆုံးနှစ်ခု ထည့်ပါ။';if(message.startsWith('Life events must occur'))return'ဖြစ်ရပ်ရက်စွဲများသည် မွေးရက်နောက်ပိုင်း ဖြစ်ရပါမည်။';return message;}return ERROR_EN.find(([pattern])=>pattern.test(message))?.[1]||'The calculation could not be completed. Please check the entered data.';}
