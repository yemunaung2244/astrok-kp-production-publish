// Compatibility layer for the original Android rule methods. No remote code.
var input, en, maleNative, readingBirthDay, readingBirthMonth, readingBirthYear,
    selectedHour, selectedMinute, selectedSecond, readingTimeZone, categories,
    activeForecastAntaraLord=-1, activeForecastAntaraPlanet=-1;
var EN_PLANET_NAMES=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn','Rahu','Ketu'];
var PLANET_SWISS_IDS=[0,1,4,2,5,3,6,10,10];
var DASHA_LORDS=['Ketu','Venus','Sun','Moon','Mars','Rahu','Jupiter','Saturn','Mercury'];
var DASHA_YEARS=[7,20,6,10,7,18,16,19,17];
var SIGN_RULERS=[2,5,3,1,0,3,5,2,4,6,6,4],EXALTATION_SIGNS=[0,1,9,5,3,11,6];
var NATURAL_FRIENDS=[[1,2,4],[0,3],[0,1,4],[0,5],[0,1,2],[3,6],[3,5]];
var SweConst={SE_SUN:0,SE_MOON:1,SE_MARS:4,SE_MERCURY:2,SE_JUPITER:5,SE_VENUS:3,SE_SATURN:6,SE_MEAN_NODE:10};
Array.prototype.add=function(v){this.push(v);return true;};
Array.prototype.get=function(i){return this[i];};
Array.prototype.contains=function(v){return this.indexOf(v)>=0;};
Array.prototype.isEmpty=function(){return this.length===0;};
Array.prototype.addAll=function(v){this.push.apply(this,v);};
String.prototype.isEmpty=function(){return this.length===0;};
String.prototype.equals=function(v){return String(this)===v;};
function StringBuilder(s){this.value=s==null?'':String(s);}
StringBuilder.prototype.append=function(s){this.value+=String(s);return this;};
StringBuilder.prototype.toString=function(){return this.value;};
Object.defineProperty(StringBuilder.prototype,'length',{get:function(){return this.value.length;}});
StringBuilder.prototype.setSpan=function(){};
var SpannableStringBuilder=StringBuilder;
var java={util:{Arrays:{asList:function(){return Array.from(arguments);}}}};
function stringJoin(separator,values){return values.join(separator);}
function floorMod(a,b){return (a%b+b)%b;}
function toRadians(x){return x*Math.PI/180;}
function localizeDigits(s){return en?String(s):String(s).replace(/[0-9]/g,function(c){return '၀၁၂၃၄၅၆၇၈၉'[+c];});}
function displayPlanet(name){var i=EN_PLANET_NAMES.indexOf(name);return en||i<0?name:['၁ နွေ','၂ င်္လာ','၃ င်္ဂါ','၄ ဟူး','၅ တေး','၆ ကြာ','စနေ','ရာဟု','ကိတ်'][i];}
var displayLord=displayPlanet;
function houseLabel(house){return en?(house===1?'Asc':['','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'][house]):house===1?'လဂ်':['','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'][house];}
function appendReadingHeading(target,text){if(target.length)target.append('\n');target.append(text).append('\n\n');}
function appendReadingBullet(target,text){target.append('• ').append(text).append('\n\n');}
function addReadingCategory(title,subtitle,icon,color,content){categories.push({id:categories.length,title:title,subtitle:subtitle,color:color,content:en?content.toString():conversational(content.toString())});}
function Finding(title,analysis,prediction){this.title=title;this.analysis=analysis;this.prediction=prediction;}
function TrisakkaYogaAnalyzer(){this.analyze=yogaFindings;}
function Calendar(ms){this.date=new Date(ms==null?input.now+readingTimeZone*3600000:ms);}
Calendar.YEAR=1;Calendar.MONTH=2;Calendar.DAY_OF_YEAR=6;Calendar.DAY_OF_MONTH=5;Calendar.HOUR_OF_DAY=11;Calendar.MINUTE=12;Calendar.SECOND=13;Calendar.MILLISECOND=14;
Calendar.getInstance=function(){return new Calendar();};
Calendar.prototype.clone=function(){return new Calendar(this.date.getTime());};
Calendar.prototype.before=function(o){return this.date<o.date;};
Calendar.prototype.after=function(o){return this.date>o.date;};
Calendar.prototype.getTimeInMillis=function(){return this.date.getTime();};
Calendar.prototype.get=function(f){var d=this.date;switch(f){case 1:return d.getUTCFullYear();case 2:return d.getUTCMonth();case 5:return d.getUTCDate();case 6:return Math.floor((Date.UTC(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate())-Date.UTC(d.getUTCFullYear(),0,1))/86400000)+1;case 11:return d.getUTCHours();case 12:return d.getUTCMinutes();case 13:return d.getUTCSeconds();case 14:return d.getUTCMilliseconds();}throw Error('Calendar field '+f);};
Calendar.prototype.set=function(f,v){switch(f){case 1:this.date.setUTCFullYear(v);break;case 2:this.date.setUTCMonth(v);break;case 5:case 6:this.date.setUTCDate(v);break;case 11:this.date.setUTCHours(v);break;case 12:this.date.setUTCMinutes(v);break;case 13:this.date.setUTCSeconds(v);break;case 14:this.date.setUTCMilliseconds(v);break;}};
Calendar.prototype.add=function(f,v){if(f===5||f===6){this.date.setUTCDate(this.date.getUTCDate()+v);}else this.set(f,this.get(f)+v);};
function formatCalendarDate(c){return localizeDigits(('0'+c.get(5)).slice(-2)+'/'+('0'+(c.get(2)+1)).slice(-2)+'/'+c.get(1));}
function formatForecastDate(c){return localizeDigits(c.get(5)+"."+(c.get(2)+1)+"."+c.get(1));}
function buildMahaDashaPeriods(day,month,year,moon){var start=Math.floor(normalize(moon)/(360/27))%9;var balance=(1-(normalize(moon)%(360/27))/(360/27))*DASHA_YEARS[start];var d=new Calendar(Date.UTC(year,month-1,day,selectedHour,selectedMinute,selectedSecond));var out=[];for(var i=0;i<9;i++){var lord=(start+i)%9,years=i===0?balance:DASHA_YEARS[lord],begin=d.clone();d.add(6,Math.floor(years*365.2425+0.5));out.push({lordIndex:lord,start:begin,end:d.clone(),activeYears:years});}return out;}
function buildSubPeriods(startLord,activeStart,activeYears,fullYears){var d=activeStart.clone(),elapsed=Math.max(0,fullYears-activeYears),acc=0,out=[];for(var i=0;i<9;i++){var lord=(startLord+i)%9,duration=fullYears*DASHA_YEARS[lord]/120,before=acc;acc+=duration;if(acc>elapsed){var years=before<elapsed?acc-elapsed:duration,begin=d.clone();d.add(6,Math.floor(years*365.2425+0.5));out.push({lordIndex:lord,start:begin,end:d.clone(),activeYears:years});}}return out;}
function TransitHealthWindow(day,maha,bhukti,antara,contacts,vehicle,pressure,financial,caution){this.start=day.clone();this.end=day.clone();this.mahaLord=maha;this.bhuktiLord=bhukti;this.antaraLord=antara;this.maxContacts=contacts;this.vehicle=vehicle;this.pressure=pressure;this.financial=financial;this.highCaution=caution;}
function CriticalHealthWindow(day,maha,bhukti,antara,caution,support,malefic,supportContacts){this.start=day.clone();this.end=day.clone();this.mahaLord=maha;this.bhuktiLord=bhukti;this.antaraLord=antara;this.caution=caution;this.jupiterSupport=support;this.maxMaleficContacts=malefic;this.maxSupportContacts=supportContacts;}
function CategoryTransitWindow(day,maha,bhukti,antara,support,pressure,strong){this.start=day.clone();this.end=day.clone();this.mahaLord=maha;this.bhuktiLord=bhukti;this.antaraLord=antara;this.support=support;this.pressure=pressure;this.strong=strong;}
function GeneralTransitWindow(day,maha,bhukti,antara,type,target,strong){this.start=day.clone();this.end=day.clone();this.mahaLord=maha;this.bhuktiLord=bhukti;this.antaraLord=antara;this.type=type;this.target=target;this.natalStrong=strong;}
function TransitForecastBundle(){for(var key of ['family','education','marriage','foreign','career','business','assets','children','general'])this[key]=[];}
var vargaEngine={navamsaLongitude:function(lon){var p=normalize(lon);return normalize(p*9);}};
var currentVargaHelper={getJulianDay:function(y,m,d,h,min,s,tz){return Date.UTC(y,m-1,d,h,min,s)/86400000+2440587.5-tz/24;},getPlanetLongitude:function(jd,id){return astrokTransit(jd,id);}};
function calculatePlanetLongitudes(helper,jd){var p=PLANET_SWISS_IDS.slice(0,8).map(function(id){return normalize(helper.getPlanetLongitude(jd,id));});p.push(normalize(p[7]+180));return p;}
function runTrisakkaReadings(data){input=data;en=data.english;maleNative=data.male;readingBirthDay=data.day;readingBirthMonth=data.month;readingBirthYear=data.year;selectedHour=data.hour;selectedMinute=data.minute;selectedSecond=data.second;readingTimeZone=data.timezone;categories=[];activeForecastAntaraLord=-1;activeForecastAntaraPlanet=-1;return buildReadings();}
vargaEngine.mapToNavamsa=function(values){return values.map(vargaEngine.navamsaLongitude);};
var androidRules={zodiacSign:zodiacSign,relativeHouse:relativeHouse,signRuler:signRuler,planetAspectsSign:planetAspectsSign,planetsAssociated:planetsAssociated,isKendraRelative:isKendraRelative,isKendraOrTrine:isKendraOrTrine,isGoodYogaHouse:isGoodYogaHouse,planetInHouses:planetInHouses,housesOccupied:housesOccupied,isOwnOrExalted:isOwnOrExalted,isFriendlySign:isFriendlySign,hasKemadrumaCancellation:hasKemadrumaCancellation};
var TextUtils={join:stringJoin,isEmpty:function(s){return s==null||s.length===0;}};
function getDisplayName(){return input.name|| (en?'Native':'ဇာတာရှင်');}

function appendNatalChartReadings(reading,planets,cusps,day,month,year,en) {

        var modalityCounts = Array(3).fill(0);
        var elementCounts = Array(4).fill(0);
        var ascSign = zodiacSign(cusps[1]);
        modalityCounts[ascSign % 3]++;
        elementCounts[ascSign % 4]++;
        for (var i = 0; i < Math.min(9, planets.length); i++) {
            var sign = zodiacSign(planets[i]);
            modalityCounts[sign % 3]++;
            elementCounts[sign % 4]++;
        }

        appendReadingHeading(reading, en ? "Zodiac-based Readings" : "ရာသီဆိုင်ရာအဟောများ");
        var modality = dominantCategory(modalityCounts);
        if (modality < 0) {
            reading.append(en
                    ? "Movable, fixed and dual influences are comparatively balanced. The native can combine initiative, persistence and adaptability according to circumstances."
                    : "စရ၊ ထိရနှင့် ဒွေးဒဟရာသီတို့၏ အင်အားများ မျှတစွာ ပါဝင်နေပါသည်။ ထို့ကြောင့် ဇာတာရှင်သည် အခြေအနေအလိုက် ဦးဆောင်လှုပ်ရှားခြင်း၊ တည်ငြိမ်စွာ လုပ်ကိုင်ခြင်းနှင့် လိုက်လျောညီထွေ ပြောင်းလဲခြင်းတို့ကို ကောင်းစွာ ပေါင်းစပ်အသုံးချနိုင်ပါလိမ့်မည်။");
        } else {
            var mm = [
                    "လဂ်နှင့် ဂြိုဟ်အများစု စရရာသီတွင် တည်ရှိသဖြင့် ဇာတာရှင်သည် ဦးဆောင်နိုင်စွမ်းရှိခြင်း၊ ရည်မှန်းချက်ကြီးမားခြင်းနှင့် စီမံခန့်ခွဲမှု ကောင်းမွန်ခြင်းတို့ ထင်ရှားပါလိမ့်မည်။ လုပ်ငန်းများကို မဆုတ်မနစ် ကြိုးပမ်းနိုင်သော်လည်း အလျင်စလို ဆုံးဖြတ်တတ်သည်ကိုမူ သတိပြုသင့်ပါသည်။",
                    "လဂ်နှင့် ဂြိုဟ်အများစု ထိရရာသီတွင် တည်ရှိသဖြင့် ဇာတာရှင်သည် သည်းခံနိုင်စွမ်းရှိခြင်း၊ တည်ငြိမ်စွဲမြဲခြင်းနှင့် ရည်မှန်းချက်ကို မျက်ခြေမပြတ် လိုက်နိုင်ခြင်းတို့ ထင်ရှားပါလိမ့်မည်။ အစီအစဉ် ကောင်းမွန်သော်လည်း ပြောင်းလဲသင့်သည့်အချိန်တွင် ပတ်ဝန်းကျင်နှင့်အညီ လိုက်လျောညီထွေရှိရန် လိုအပ်ပါသည်။",
                    "လဂ်နှင့် ဂြိုဟ်အများစု ဒွေးဒဟရာသီတွင် တည်ရှိသဖြင့် ဇာတာရှင်သည် အကဲခတ်အကဲဖြတ် နှံ့စပ်ခြင်း၊ အလျော့အတင်း ပြုလုပ်နိုင်ခြင်းနှင့် မည်သည့်အခြေအနေတွင်မဆို လိုက်လျောညီထွေ နေထိုင်နိုင်ခြင်းတို့ ထင်ရှားပါလိမ့်မည်။ ရွေးချယ်စရာများပြားချိန်တွင် ဝေဝါးမသွားစေရန် ရည်မှန်းချက်ကို ပြတ်ပြတ်သားသား သတ်မှတ်ထားသင့်ပါသည်။"
            ];
            var english = [
                    "The Ascendant and most planets occupy movable signs. Initiative, leadership, ambition and strong management ability are therefore emphasised. Persistent action is favoured, while hasty decisions should be moderated.",
                    "The Ascendant and most planets occupy fixed signs. Patience, stability, strategy and sustained focus on long-term goals are emphasised. Flexibility should still be maintained when circumstances genuinely require change.",
                    "The Ascendant and most planets occupy dual signs. Observation, adaptability, negotiation and the ability to manage changing circumstances are emphasised. Clear priorities help prevent indecision when several choices arise."
            ];
            reading.append(en ? english[modality] : mm[modality]);
        }

        reading.append("\n\n");
        var element = dominantCategory(elementCounts);
        if (element < 0) {
            reading.append(en
                    ? "The elemental influences are balanced. Practical judgement, intellect, motivation, and emotional understanding can support one another effectively."
                    : "မီး၊ မြေ၊ လေ၊ ရေ ဓာတ်လေးပါးလုံး၏ အင်အားများ မျှတစွာ ပါဝင်နေပါသည်။ ထို့ကြောင့် လက်တွေ့ကျကျ တွေးခေါ်နိုင်မှု၊ ဉာဏ်ရည်၊ စိတ်အားထက်သန်မှုနှင့် ခံစားနားလည်နိုင်စွမ်းတို့ကို ကောင်းစွာ ပေါင်းစပ်အသုံးချနိုင်ပါလိမ့်မည်။");
        } else {
            var mm = [
                    "မီးဓာတ်အင်အား ပိုမိုထင်ရှားသဖြင့် စိတ်ဓာတ်ပြင်းထန်တက်ကြွခြင်း၊ မိမိယုံကြည်ရာကို ရဲဝံ့စွာ ဆောင်ရွက်ခြင်းနှင့် အခြားသူများကို လှုံ့ဆော်လွှမ်းမိုးနိုင်ခြင်းတို့ ထင်ရှားပါလိမ့်မည်။ စိတ်အရှိန်ကို စနစ်တကျ ထိန်းညှိနိုင်ပါက အောင်မြင်မှုကို ပိုမိုခိုင်မြဲစေနိုင်ပါသည်။",
                    "မြေဓာတ်အင်အား ပိုမိုထင်ရှားသဖြင့် လက်တွေ့ကျကျ စဉ်းစားလုပ်ကိုင်ခြင်း၊ တာဝန်ယူမှုရှိခြင်းနှင့် ရလဒ်ကောင်းများကို အဆင့်ဆင့် စနစ်တကျ တည်ဆောက်နိုင်ခြင်းတို့ အားကောင်းပါလိမ့်မည်။ အခွင့်အလမ်းသစ်များကို လက်ခံစမ်းသပ်ကြည့်ရန်လည်း လိုအပ်ပါသည်။",
                    "လေဓာတ်အင်အား ပိုမိုထင်ရှားသဖြင့် ဉာဏ်ပညာ ထက်မြက်ခြင်း၊ ဆက်သွယ်ပြောဆိုမှု ကောင်းမွန်ခြင်းနှင့် လူမှုဆက်ဆံရေး ကျယ်ပြန့်ခြင်းတို့ ထင်ရှားပါလိမ့်မည်။ အတွေးအမြင်များကို လက်တွေ့အကောင်အထည်ဖော်နိုင်ရန် စနစ်တကျ အားထုတ်ဆောင်ရွက်သင့်ပါသည်။",
                    "ရေဓာတ်အင်အား ပိုမိုထင်ရှားသဖြင့် ခံစားနားလည်နိုင်စွမ်း၊ စာနာစိတ်ရှိမှုနှင့် ပင်ကိုအသိစိတ်တို့ အားကောင်းပါလိမ့်မည်။ ဆုံးဖြတ်ချက်ချရာတွင် မိမိ၏ ခံစားချက်နှင့် လက်တွေ့အချက်အလက်များကို မျှတစွာ ပေါင်းစပ်စဉ်းစားသင့်ပါသည်။"
            ];
            var english = [
                    "Fire signs predominate, emphasizing courage, enthusiasm, initiative, and the ability to inspire others. Disciplined direction of your strong impulses will support lasting success.",
                    "Earth signs predominate, emphasizing practicality, responsibility, and the ability to build tangible results step by step. Staying open to worthwhile new opportunities will also be beneficial.",
                    "Air signs predominate, emphasizing intelligence, communication, and broad social interaction. Consistent execution will help turn your abundant ideas into reality.",
                    "Water signs predominate, emphasizing empathy, intuition, and deep emotional understanding. Decisions are best strengthened by balancing feelings with practical facts."
            ];
            reading.append(en ? english[element] : mm[element]);
        }

        reading.append("\n\n");
        appendGenderPolarityReading(reading, planets, ascSign, en);
    
}
function appendWealthReading(reading,planets,cusps,en) {

        var asc = zodiacSign(cusps[1]);
        var ascLord = signRuler(asc);
        var lord2 = signRuler((asc + 1) % 12);
        var lord6 = signRuler((asc + 5) % 12);
        var lord7 = signRuler((asc + 6) % 12);
        var lord9 = signRuler((asc + 8) % 12);
        var lord10 = signRuler((asc + 9) % 12);
        var lord11 = signRuler((asc + 10) % 12);
        var lord12 = signRuler((asc + 11) % 12);
        var secondLordHouse = relativeHouse(zodiacSign(planets[lord2]), asc);
        var malefics = [0, 2, 6, 7, 8];
        var findings = [];
        var yogas = [];
        var supportSignals = 0;
        var pressureSignals = 0;

        var wealthByHouseMm = [
                "၂ တန့်သခင်သည် လဂ်တွင် တည်ရှိသဖြင့် ကိုယ်ပိုင်ကြိုးစားအားထုတ်မှု၊ ပင်ကိုယ်စွမ်းရည်နှင့် မိမိ၏ ဂုဏ်သိက္ခာကို အခြေပြု၍ ကောင်းမွန်သော ဝင်ငွေလမ်းကြောင်းများ ဖန်တီးနိုင်ပါလိမ့်မည်။",
                "၂ တန့်သခင်သည် မိမိအိမ်ဖြစ်သော ၂ တန့်တွင်ပင် တည်ရှိသဖြင့် ငွေစုဆောင်းနိုင်စွမ်း အလွန်ကောင်းမွန်ခြင်း၊ မိသားစု အမွေအနှစ် ပိုင်ဆိုင်ခြင်းနှင့် စကားပြောစွမ်းရည်တို့ကြောင့် စီးပွားဥစ္စာ တိုးတက်ထွန်းကားပါလိမ့်မည်။",
                "၂ တန့်သခင်သည် ၃ တန့်တွင် တည်ရှိသဖြင့် ဆက်သွယ်ရေးလုပ်ငန်း၊ အရောင်းအဝယ်၊ ခရီးတို သွားလာခြင်း၊ ကိုယ်ပိုင်စွမ်းဆောင်မှုနှင့် ညီအစ်ကိုမောင်နှမများ၏ အဆက်အသွယ်မှတစ်ဆင့် ဝင်ငွေကောင်းများ ရရှိနိုင်ပါလိမ့်မည်။",
                "၂ တန့်သခင်သည် ၄ တန့်တွင် တည်ရှိသဖြင့် အိမ်ခြံမြေ၊ မော်တော်ယာဉ်၊ မိသားစုပိုင် ပစ္စည်းများနှင့် မိခင်ဘက်မှ ကူညီပံ့ပိုးမှုများကြောင့် ငွေကြေးဓန တိုးတက်ခိုင်မာလာပါလိမ့်မည်။",
                "၂ တန့်သခင်သည် ၅ တန့်တွင် တည်ရှိသဖြင့် ပညာဉာဏ်၊ အကြံပေးလုပ်ငန်း၊ ဖန်တီးမှုစွမ်းရည်၊ သင်ကြားရေးနှင့် ရင်းနှီးမြှုပ်နှံမှုများမှတစ်ဆင့် စီးပွားဖြစ်ထွန်းနိုင်ပါသည်။",
                "၂ တန့်သခင်သည် ၆ တန့်တွင် တည်ရှိသဖြင့် ဝန်ဆောင်မှုလုပ်ငန်း၊ အလုပ်သမားခန့်ထားမှု၊ ပွဲစားလုပ်ငန်း၊ ငွေကြေးစီမံမှုနှင့် ပြိုင်ဆိုင်မှုရှိသော လုပ်ငန်းများမှတစ်ဆင့် ဝင်ငွေရရှိနိုင်ပြီး အကြွေးကိစ္စများကို စည်းကမ်းတကျ ကိုင်တွယ်ရန် လိုအပ်ပါသည်။",
                "၂ တန့်သခင်သည် ၇ တန့်တွင် တည်ရှိသဖြင့် အိမ်ထောင်ဖက်၊ စီးပွားဖက်၊ ဖောက်သည်များနှင့် အများပြည်သူဆိုင်ရာ လုပ်ငန်းဆောင်တာများက မိမိ၏ ငွေကြေးတိုးတက်မှုကို အဓိက အားပေးကူညီပါလိမ့်မည်။",
                "၂ တန့်သခင်သည် ၈ တန့်တွင် တည်ရှိသဖြင့် အမွေအနှစ်၊ အာမခံ၊ အခွန်၊ ပူးတွဲပိုင်ဆိုင်မှုနှင့် အခြားသူများ၏ ငွေကြေးကို စီမံခန့်ခွဲရသော လုပ်ငန်းများမှတစ်ဆင့် အကျိုးအမြတ် ရရှိနိုင်သော်လည်း ငွေအဝင်အထွက် ရုတ်တရက် အပြောင်းအလဲ ရှိနိုင်သဖြင့် အရန်ငွေ အမြဲထားသင့်ပါသည်။",
                "၂ တန့်သခင်သည် ၉ တန့်တွင် တည်ရှိသဖြင့် ဖခင် သို့မဟုတ် ဆရာသမားများ၏ အကူအညီ၊ နိုင်ငံခြားအဆက်အသွယ်၊ ခရီးဝေးလုပ်ငန်း၊ ပညာရေး၊ စာပေထုတ်ဝေရေးနှင့် ဥပဒေဆိုင်ရာ လုပ်ငန်းများမှတစ်ဆင့် စီးပွားလာဘ်လာဘ ရရှိပါလိမ့်မည်။",
                "၂ တန့်သခင်သည် ၁၀ တန့်တွင် တည်ရှိသဖြင့် မိမိ၏ အသက်မွေးဝမ်းကျောင်းလုပ်ငန်း၊ ရာထူးတာဝန်၊ အဖွဲ့အစည်းကြီးများနှင့် အစိုးရပိုင်းဆိုင်ရာ ကိစ္စရပ်များက ငွေကြေးအခြေခံကောင်းများကို ခိုင်မာစွာ တည်ဆောက်ပေးပါလိမ့်မည်။",
                "၂ တန့်သခင်သည် ၁၁ တန့်တွင် တည်ရှိသဖြင့် ဝင်ငွေလမ်းကြောင်းမျိုးစုံ ရှိနေခြင်း၊ မိတ်ဆွေသင်္ဂဟ ကွန်ရက်ကောင်းခြင်း၊ အသင်းအဖွဲ့များနှင့် ရည်မှန်းချက် အောင်မြင်မှုများမှတစ်ဆင့် ငွေကြေးဓန အလွန်အမင်း အားကောင်းလာပါလိမ့်မည်။",
                "၂ တန့်သခင်သည် ၁၂ တန့်တွင် တည်ရှိသဖြင့် နိုင်ငံခြားအဆက်အသွယ်၊ ကွယ်ရာမှ လုပ်ဆောင်ရသော လုပ်ငန်းများ၊ ဆေးရုံ၊ အဖွဲ့အစည်းနှင့် အွန်လိုင်းလုပ်ငန်းများမှ ဝင်ငွေရရှိနိုင်သော်လည်း အသုံးစရိတ် များပြားတတ်သဖြင့် ငွေကြေးစာရင်းဇယားကို စနစ်တကျ ထားရှိသင့်ပါသည်။"
        ];
        var wealthByHouseEn = [
                "The 2nd lord occupies the Ascendant, linking income with personal effort, skill and reputation.",
                "The 2nd lord occupies its own house, supporting saving ability, family resources and income through speech or knowledge.",
                "The 2nd lord occupies the 3rd house, linking income with communication, sales, short travel, enterprise and siblings' networks.",
                "The 2nd lord occupies the 4th house, linking wealth with property, vehicles, family assets or support from the mother.",
                "The 2nd lord occupies the 5th house, linking income with education, advice, creativity, teaching and considered investment.",
                "The 2nd lord occupies the 6th house, linking income with service, employment, brokerage, financial administration and competitive work. Debt requires disciplined management.",
                "The 2nd lord occupies the 7th house, linking financial growth with a spouse, business partners, clients and public-facing work.",
                "The 2nd lord occupies the 8th house, linking income with inheritance, insurance, tax, shared assets or management of other people's resources. Cash flow may fluctuate, so reserves are useful.",
                "The 2nd lord occupies the 9th house, linking income with a father or mentor, foreign connections, higher study, publishing, law or long travel.",
                "The 2nd lord occupies the 10th house, making career, public responsibility, large organisations or government-related work central to income.",
                "The 2nd lord occupies the 11th house, strongly supporting multiple income channels, networks, organisations and fulfilled ambitions.",
                "The 2nd lord occupies the 12th house, linking income with foreign, institutional, online or behind-the-scenes work. Expenses may also rise, making transparent records important."
        ];
        findings.add(en ? wealthByHouseEn[secondLordHouse - 1] : wealthByHouseMm[secondLordHouse - 1]);
        if (secondLordHouse == 1 || secondLordHouse == 2 || secondLordHouse == 4
                || secondLordHouse == 5 || secondLordHouse == 7 || secondLordHouse == 9
                || secondLordHouse == 10 || secondLordHouse == 11) supportSignals++;
        else pressureSignals++;

        var ascSecondExchange = signRuler(zodiacSign(planets[ascLord])) == lord2
                && signRuler(zodiacSign(planets[lord2])) == ascLord;
        if (ascSecondExchange) findings.add(en
                ? "The Ascendant lord and 2nd lord exchange signs, creating a direct link between personal ability and wealth. Income opportunities can arise naturally when skills are used consistently."
                : "လဂ်သခင်နှင့် ၂ တန့်သခင်တို့ အိမ်ဖလှယ် (ပရိဝတ္တန) ထားသဖြင့် မိမိ၏ ပင်ကိုယ်အရည်အချင်းနှင့် ငွေကြေးဓနတို့ တိုက်ရိုက် ဆက်စပ်နေပါသည်။ မိမိ၏ ကျွမ်းကျင်မှုများကို စနစ်တကျ မှန်မှန်ကန်ကန် အသုံးချပါက ဝင်ငွေအခွင့်အလမ်းကောင်းများ သဘာဝအတိုင်း လွယ်ကူစွာ ပေါ်ပေါက်လာပါလိမ့်မည်။");
        if (ascSecondExchange) supportSignals++;

        var ascSixExchange = signRuler(zodiacSign(planets[ascLord])) == lord6
                && signRuler(zodiacSign(planets[lord6])) == ascLord;
        var marakaPressure = anyPlanetConjoinsOrAspectsPlanet([lord2, lord7], ascLord, planets)
                || anyPlanetConjoinsOrAspectsPlanet([lord2, lord7], lord6, planets);
        if (ascSixExchange && marakaPressure) findings.add(en
                ? "The Ascendant and 6th lords exchange signs under pressure from the 2nd or 7th lord. Debt, competition, or recurring obligations can slow wealth-building, so conservative borrowing and written agreements are advisable."
                : "လဂ်သခင်နှင့် ၆ တန့်သခင်တို့ အိမ်ဖလှယ်ထားပြီး ၂ တန့် သို့မဟုတ် ၇ တန့်သခင်၏ ဖိအားများ ပါရှိနေသဖြင့် အကြွေးကိစ္စ၊ ပြိုင်ဆိုင်မှုများနှင့် ထပ်ခါတလဲလဲ ဖြစ်ပေါ်တတ်သော တာဝန်ဝတ္တရားများကြောင့် စီးပွားဥစ္စာ စုဆောင်းမှုကို နှေးကွေးစေတတ်ပါသည်။ ထို့ကြောင့် အကြွေးယူခြင်းကို တတ်နိုင်သမျှ လျှော့ချပြီး သဘောတူညီချက်များကို စာချုပ်စာတမ်းဖြင့် ရှင်းရှင်းလင်းလင်း ပြုလုပ်ထားသင့်ပါသည်။");
        if (ascSixExchange && marakaPressure) pressureSignals++;

        var nonDharmaKarmaMaleficAtAsc = false;
        for (let malefic of malefics) {
            if (malefic == lord9 || malefic == lord10 || zodiacSign(planets[malefic]) != asc) continue;
            if (anyPlanetConjoinsOrAspectsPlanet([lord2, lord7], malefic, planets)) {
                nonDharmaKarmaMaleficAtAsc = true;
                break;
            }
        }
        if (nonDharmaKarmaMaleficAtAsc) {
            pressureSignals++;
            findings.add(en
                    ? "A malefic other than the 9th or 10th lord occupies the Ascendant under pressure from the 2nd or 7th lord. Income can be diverted by urgent duties, family costs, or poor timing, so liquidity and written financial limits are important."
                    : "၉ တန့် သို့မဟုတ် ၁၀ တန့်သခင်မဟုတ်သော အဟန့်အတားပေးနိုင်သည့် ပါပဂြိုဟ်တစ်လုံး လဂ်တွင် တည်ရှိပြီး၊ ၂ တန့် သို့မဟုတ် ၇ တန့်သခင်၏ ဖိအားပေးမှုကို ခံနေရပါသည်။ ထို့ကြောင့် အရေးပေါ်တာဝန်များ၊ မိသားစုအသုံးစရိတ်များနှင့် အချိန်အခါမကိုက်ညီသော ဆုံးဖြတ်ချက်များကြောင့် ဝင်ငွေများ ယိုစီးမှုရှိတတ်သဖြင့် အရန်ငွေ (လက်ငင်းငွေတည်း) အဆင်သင့်ရှိနေစေရန်နှင့် အသုံးစရိတ် ကန့်သတ်ချက်များကို စနစ်တကျ သတ်မှတ်ထားသင့်ပါသည်။");
        }

        var ascLordHemmed = anyPlanetOccupiesSign(malefics,
                (zodiacSign(planets[ascLord]) + 11) % 12, planets)
                && anyPlanetOccupiesSign(malefics, (zodiacSign(planets[ascLord]) + 1) % 12, planets);
        var jupiterProtectsAscLord = planetConjoinsOrAspects(4, ascLord, planets);
        if (zodiacSign(planets[6]) == asc && ascLordHemmed) findings.add(en
                ? (jupiterProtectsAscLord
                   ? "Saturn occupies the Ascendant and the Ascendant lord is enclosed by malefics, but Jupiter offers protection. Financial growth may be slow rather than denied, and improves through discipline and long-term planning."
                   : "Saturn occupies the Ascendant while the Ascendant lord is enclosed by malefics. Wealth may build slowly and requires strict budgeting, patience and avoidance of unnecessary financial risk.")
                : (jupiterProtectsAscLord
                   ? "စနေဂြိုဟ်သည် လဂ်တွင် တည်ရှိပြီး လဂ်သခင်သည် ပါပဂြိုဟ်များ၏ နှစ်ဖက်ညှပ်ခြင်း (ပါပကတ္တရီ) ကို ခံနေရသော်လည်း ကြာသပတေးဂြိုဟ်က စောင့်ရှောက်ကူညီပေးထားပါသည်။ ထို့ကြောင့် ငွေကြေးတိုးတက်မှုသည် လုံးဝဆိတ်သုဉ်းမသွားဘဲ နှေးကွေးခြင်းသာဖြစ်ပြီး စည်းကမ်းရှိမှု၊ ရေရှည်စီမံကိန်းချမှုတို့ဖြင့် တဖြည်းဖြည်း ပြန်လည်ကောင်းမွန်လာပါလိမ့်မည်။"
                   : "စနေဂြိုဟ်သည် လဂ်တွင် တည်ရှိပြီး လဂ်သခင်သည် ပါပဂြိုဟ်များ၏ နှစ်ဖက်ညှပ်ခြင်း (ပါပကတ္တရီ) ကို ခံထားရသဖြင့် ငွေကြေးဓန တိုးတက်မှု နှေးကွေးတတ်ပါသည်။ မိမိ၏ အသုံးစရိတ်ကို တိတိကျကျ ထိန်းချုပ်ရန် လိုအပ်ပြီး မလိုအပ်သော စွန့်စားမှုများကို အထူးရှောင်ကြဉ်သင့်ပါသည်။"));
        if (zodiacSign(planets[6]) == asc && ascLordHemmed) pressureSignals++;

        var ascHemmed = anyPlanetOccupiesSign(malefics, (asc + 11) % 12, planets)
                && anyPlanetOccupiesSign(malefics, (asc + 1) % 12, planets);
        var movableAsc = asc == 0 || asc == 3 || asc == 6 || asc == 9;
        var saturnOrKetuAtAsc = zodiacSign(planets[6]) == asc || zodiacSign(planets[8]) == asc;
        if (movableAsc && saturnOrKetuAtAsc && ascHemmed) {
            pressureSignals++;
            findings.add(en
                    ? "A movable Ascendant contains Saturn or Ketu while malefics enclose it. Financial pressure can combine with fatigue or practical restrictions. Avoid overwork, keep insurance and emergency reserves current, and seek professional care for persistent physical symptoms."
                    : "စရလဂ်တွင် စနေဂြိုဟ် သို့မဟုတ် ကိတ်ဂြိုဟ် တည်ရှိပြီး လဂ်သည် ပါပဂြိုဟ်များ၏ နှစ်ဖက်ညှပ်ခြင်း (ပါပကတ္တရီ) ကို ခံထားရပါသည်။ ထို့ကြောင့် ငွေကြေးဖိအားများနှင့်အတူ ကိုယ်စိတ်ပင်ပန်းနွမ်းနယ်မှု သို့မဟုတ် လက်တွေ့ကျသော ကန့်သတ်ချက်များ တစ်ပြိုင်နက်တည်း ကြုံတွေ့ရတတ်ပါသည်။ အလုပ်ကို အလွန်အမင်း မလုပ်ဘဲ အာမခံနှင့် အရေးပေါ်အရန်ငွေများကို စနစ်တကျ ပြင်ဆင်ထားသင့်ပြီး ခန္ဓာကိုယ်တွင် ဝေဒနာတစ်စုံတစ်ရာ ရေရှည်ဖြစ်ပွားပါက ကျွမ်းကျင်သူ (သို့မဟုတ်) ဆရာဝန်နှင့် သေချာစွာ ပြသစစ်ဆေးသင့်ပါသည်။");
        }

        var ascToLord = relativeHouse(zodiacSign(planets[ascLord]), asc);
        var arudhaSign = (zodiacSign(planets[ascLord]) + ascToLord - 1) % 12;
        var arudhaHouse = relativeHouse(arudhaSign, asc);
        if (arudhaHouse == 6 || arudhaHouse == 8 || arudhaHouse == 12) findings.add(en
                ? "The Arudha Ascendant falls in House " + arudhaHouse + ". Public image and visible financial progress may pass through delays or fluctuations, so reputation, records and cash reserves deserve careful management."
                : "ပြင်ပလူမှုပတ်ဝန်းကျင်က မြင်တွေ့ရမည့် မိမိ၏ပုံရိပ်နှင့် ငွေကြေးအောင်မြင်မှုကို ပြသသော အာရူဒလဂ်သည် " + localizeDigits(String(arudhaHouse)) + " တန့် (ဒုဌာနအိမ်) တွင် ကျရောက်နေပါသည်။ ထို့ကြောင့် လူမှုဂုဏ်သတင်းနှင့် မျက်မှောက်ထင်ရှားသော ငွေကြေးတိုးတက်မှုများတွင် အတက်အကျ အပြောင်းအလဲ ရှိတတ်သဖြင့် မိမိ၏ လုပ်ငန်းမှတ်တမ်းများ၊ နာမည်ကောင်းနှင့် အရန်ငွေများကို သေချာစွာ ထိန်းသိမ်းစောင့်ရှောက်သင့်ပါသည်။");
        if (arudhaHouse == 6 || arudhaHouse == 8 || arudhaHouse == 12) pressureSignals++;

        var moonMarsYoga = zodiacSign(planets[1]) == zodiacSign(planets[2])
                || (zodiacSign(planets[1]) == 1 && zodiacSign(planets[2]) == 7)
                || (zodiacSign(planets[1]) == 3 && zodiacSign(planets[2]) == 9);
        if (moonMarsYoga) yogas.add(en
                ? "Chandra Mangala Yoga is present through the Moon-Mars connection. Courage, initiative and active money management can support wealth, provided impulsive spending is controlled."
                : "တနင်္လာ (စန်း) နှင့် အင်္ဂါဂြိုဟ်တို့ ဆက်စပ်တည်ရှိနေသဖြင့် စန္ဒရမင်္ဂလယုဂ် (Chandra Mangala Yoga) ထင်ရှားစွာ ပေါ်ပေါက်နေပါသည်။ ဇာတာရှင်၏ ရဲဝံ့စွန့်စားလိုစိတ်၊ ထက်မြက်သော လုပ်ဆောင်နိုင်စွမ်းနှင့် ငွေကြေးကို တက်တက်ကြွကြွ စီမံခန့်ခွဲနိုင်မှုတို့ကြောင့် စီးပွားဥစ္စာ ဖွံ့ဖြိုးတိုးတက်လာပါလိမ့်မည်။ သို့သော်လည်း စိတ်လိုက်မာန်ပါ အလျင်စလို သုံးစွဲတတ်ခြင်းကိုမူ အထူးသတိပြု ထိန်းချုပ်ရန် လိုအပ်ပါသည်။");
        if (moonMarsYoga) supportSignals++;
        if (zodiacSign(planets[2]) == zodiacSign(planets[4])) yogas.add(en
                ? "Guru Mangala Yoga is present through the Mars-Jupiter conjunction, supporting enterprise, courage, practical judgement and financial expansion."
                : "အင်္ဂါဂြိုဟ်နှင့် ကြာသပတေးဂြိုဟ်တို့ ပူးယှဉ်တည်ရှိနေသဖြင့် ဂုရုမင်္ဂလယုဂ် (Guru Mangala Yoga) ထင်ရှားစွာ ပေါ်ပေါက်နေပါသည်။ ၎င်းသည် လုပ်ငန်းသစ်များ ရဲဝံ့စွာ စတင်နိုင်ခြင်း၊ လက်တွေ့ကျကျ မှန်ကန်စွာ ဆုံးဖြတ်နိုင်ခြင်းနှင့် စီးပွားရေး အရှိန်အဟုန်ဖြင့် ချဲ့ထွင်အောင်မြင်နိုင်ခြင်းတို့ကို အထူးပင် အားပေးကူညီပါလိမ့်မည်။");
        if (zodiacSign(planets[2]) == zodiacSign(planets[4])) supportSignals++;

        var moonSecondCount = 0;
        var moonTwelfthCount = 0;
        var moonSign = zodiacSign(planets[1]);
        for (let planet of [2, 3, 4, 5, 6]) {
            var fromMoon = relativeHouse(zodiacSign(planets[planet]), moonSign);
            if (fromMoon == 2) moonSecondCount++;
            if (fromMoon == 12) moonTwelfthCount++;
        }
        if (moonSecondCount >= 2) {
            supportSignals++;
            yogas.add(en
                    ? "Chandra Phru Yoga is strengthened because at least two planets other than the Sun occupy the 2nd house from the Moon. Self-effort, communication, and accumulated skills can create wealth and recognition."
                    : "တနင်္လာ (စန်း) မှ ၂ တန့်တွင် တနင်္ဂနွေဂြိုဟ်မပါဝင်ဘဲ ဂြိုဟ်နှစ်လုံးနှင့်အထက် တည်ရှိနေသဖြင့် စန္ဒြဖြူယုဂ် (Chandra Phru Yoga) ထင်ရှားစွာ အားကောင်းနေပါသည်။ ဇာတာရှင်၏ ကိုယ်ပိုင်ကြိုးစားအားထုတ်မှု၊ ဆက်သွယ်ပြောဆိုမှု ကောင်းမွန်ခြင်းနှင့် စုဆောင်းထားသော ကျွမ်းကျင်မှုများကြောင့် ငွေကြေးဓနနှင့် လူမှုဂုဏ်သတင်းများ တိုးတက်ထွန်းကားလာပါလိမ့်မည်။");
        }
        if (moonTwelfthCount >= 2) {
            supportSignals++;
            yogas.add(en
                    ? "Anapha Yoga has added strength because at least two planets other than the Sun occupy the 12th house from the Moon. Independent judgement, composure, and careful private planning can support prosperity."
                    : "တနင်္လာ (စန်း) မှ ၁၂ တန့်တွင် တနင်္ဂနွေဂြိုဟ်မပါဝင်ဘဲ ဂြိုဟ်နှစ်လုံးနှင့်အထက် တည်ရှိနေသဖြင့် အနဖာယုဂ် (Anapha Yoga) ၏ အင်အားပိုမို ပြည့်စုံခိုင်မာနေပါသည်။ ဇာတာရှင်၏ ကိုယ်တိုင်လွတ်လပ်စွာ ဆုံးဖြတ်နိုင်စွမ်း၊ စိတ်တည်ငြိမ်ရင့်ကျက်မှုနှင့် နောက်ကွယ်မှ စနစ်တကျ စီမံကိန်းချနိုင်မှုတို့က စီးပွားရေးအောင်မြင်မှုကို အထူးပင် အားပေးကူညီပါလိမ့်မည်။");
        }
        var kemadrumaActive = moonSecondCount == 0 && moonTwelfthCount == 0
                && !hasKemadrumaCancellation(planets, moonSign, [0, 2, 3, 4, 5, 6]);
        if (kemadrumaActive) pressureSignals++;

        var kendraYoga = zodiacSign(planets[3]) == asc && zodiacSign(planets[4]) == asc
                && zodiacSign(planets[5]) == asc;
        if (!kendraYoga) {
            kendraYoga = planetInHouses(3, planets, asc, [1, 4, 7, 10])
                    && planetInHouses(4, planets, asc, [1, 4, 7, 10])
                    && planetInHouses(5, planets, asc, [1, 4, 7, 10]);
        }
        if (kendraYoga) yogas.add(en
                ? "Kendra Yoga is present because Mercury, Jupiter and Venus occupy angular houses. Knowledge, advice, communication and social support can combine to improve prosperity and authority."
                : "ဗုဒ္ဓဟူးဂြိုဟ်၊ ကြာသပတေးဂြိုဟ်နှင့် သောကြာဂြိုဟ်တို့သည် ကိန်းဘာဝ (၁၊ ၄၊ ၇၊ ၁၀ တန့်) များတွင် တည်ရှိနေသဖြင့် ကိန်းယုဂ် (Kendra Yoga) ထင်ရှားစွာ ပေါ်ပေါက်နေပါသည်။ ဇာတာရှင်၏ အသိပညာဉာဏ်၊ အကြံပေးနိုင်စွမ်း၊ ဆက်သွယ်ရေးစွမ်းရည်နှင့် လူမှုပတ်ဝန်းကျင်၏ ပံ့ပိုးကူညီမှုများ ပေါင်းစပ်ကာ စီးပွားဥစ္စာ ဖွံ့ဖြိုးတိုးတက်ခြင်းနှင့် လုပ်ပိုင်ခွင့်အာဏာ ရရှိခြင်းတို့ကို အားပေးကူညီပါလိမ့်မည်။");
        if (kendraYoga) supportSignals++;

        var vasumati = true;
        for (let planet of [1, 3, 4, 5]) {
            var house = relativeHouse(zodiacSign(planets[planet]), asc);
            if (house != 3 && house != 6 && house != 10 && house != 11) vasumati = false;
        }
        if (vasumati) yogas.add(en
                ? "Vasumati Yoga is present because the principal benefics occupy growth houses. Skill, service, career and networks can steadily increase wealth."
                : "သောဘဏဂြိုဟ် (အကောင်းပေးဂြိုဟ်) များသည် တိုးတက်မှုကို ဆောင်ကြဉ်းပေးသော ဥပစယဘာဝ (၃၊ ၆၊ ၁၀၊ ၁၁ တန့်) များတွင် တည်ရှိနေသဖြင့် ဝသုမတီယုဂ် (Vasumati Yoga) ထင်ရှားစွာ ပေါ်ပေါက်နေပါသည်။ ဇာတာရှင်၏ ပင်ကိုယ်ကျွမ်းကျင်မှု၊ ဝန်ဆောင်မှုလုပ်ငန်း၊ အသက်မွေးဝမ်းကျောင်းနှင့် လူမှုကွန်ရက်များမှတစ်ဆင့် စီးပွားဥစ္စာ ဓနများ တဖြည်းဖြည်း တိုးတက်ခိုင်မာလာပါလိမ့်မည်။");
        if (vasumati) supportSignals++;

        var upachayaCount = 0;
        for (var planet = 0; planet < 9; planet++) {
            var house = relativeHouse(zodiacSign(planets[planet]), asc);
            if (house == 3 || house == 6 || house == 10 || house == 11) upachayaCount++;
        }
        if (upachayaCount >= 5) yogas.add(en
                ? "Upachaya Yoga is present because at least five planets occupy growth houses. Results tend to improve with age, experience and sustained effort."
                : "ဂြိုဟ်အနည်းဆုံး ငါးလုံးသည် တိုးတက်မှုကို ဆောင်ကြဉ်းပေးသော ဥပစယဘာဝ (၃၊ ၆၊ ၁၀၊ ၁၁ တန့်) များတွင် တည်ရှိနေသဖြင့် ဥပစယယုဂ် (Upachaya Yoga) ထင်ရှားစွာ အားကောင်းနေပါသည်။ အသက်အရွယ်၊ ရင့်ကျက်သောအတွေ့အကြုံနှင့် မဆုတ်မနစ် ဆက်တိုက်ကြိုးစားအားထုတ်မှုများ တိုးတက်လာသည်နှင့်အမျှ စီးပွားရေးအောင်မြင်မှုသည်လည်း ပိုမိုမြင့်မားလာပါလိမ့်မည်။");
        if (upachayaCount >= 5) supportSignals++;

        var sunVenusSaturnClose = angularSeparation(planets[0], planets[5]) <= 10.0
                && angularSeparation(planets[0], planets[6]) <= 10.0
                && angularSeparation(planets[5], planets[6]) <= 10.0;
        var ascTwelveExchange = signRuler(zodiacSign(planets[ascLord])) == lord12
                && signRuler(zodiacSign(planets[lord12])) == ascLord;
        var lord11House = relativeHouse(zodiacSign(planets[lord11]), asc);
        var daridraPressure = sunVenusSaturnClose || ascTwelveExchange
                || lord11House == 6 || lord11House == 8 || lord11House == 12;
        if (daridraPressure) yogas.add(en
                ? "A Daridra-type financial pressure pattern is present. It does not decide lifelong poverty, but can produce periods of heavy expenses, debt or delayed gains. Conservative planning and transparent work reduce its effect."
                : "ဒါရိဒြယုဂ်ဆန်သော ငွေကြေးဖိအားပေးသည့် အနေအထားမျိုး ကြုံတွေ့နေရပါသည်။ ၎င်းသည် တစ်သက်လုံး ဆင်းရဲမွဲတေသွားမည့် သဘောကို ဆိုလိုခြင်းမဟုတ်ဘဲ အသုံးစရိတ်လွန်ကဲခြင်း၊ အကြွေးဝန်ထုပ်ဝန်ပိုးဖြစ်ခြင်း သို့မဟုတ် ရသင့်ရထိုက်သော အကျိုးအမြတ်များ နှောင့်နှေးတတ်ခြင်းတို့ကိုသာ ဖြစ်ပေါ်စေနိုင်ခြင်း ဖြစ်ပါသည်။ အကြွေးကိစ္စများကို စနစ်တကျ ထိန်းချုပ်ခြင်း၊ ငွေကြေးစာရင်းဇယား ရှင်းလင်းစွာ ထားရှိခြင်းနှင့် တရားဝင်သော လုပ်ငန်းလမ်းကြောင်းများကိုသာ ရွေးချယ်ခြင်းဖြင့် အဆိုးသက်ရောက်မှုများကို သိသိသာသာ လျှော့ချနိုင်ပါလိမ့်မည်။");
        if (daridraPressure) pressureSignals++;

        if (supportSignals > pressureSignals) findings.add(en
                ? "Overall assessment: supportive wealth factors outnumber pressure factors. Financial progress is more likely when the strongest income channels above are used consistently, while budgeting remains disciplined."
                : "ခြုံငုံသုံးသပ်ချက် - ဇာတာတွင် ငွေကြေးဓနတိုးတက်မှုကို အားပေးကူညီသော အချက်များက ဖိအားပေးသည့် အချက်များထက် ပိုမိုများပြားနေပါသည်။ ထို့ကြောင့် အထက်တွင် ဖော်ပြထားသော မိမိအတွက် အားကောင်းဆုံးဖြစ်သည့် ဝင်ငွေလမ်းကြောင်းများကို တစိုက်မတ်မတ် အားထုတ်ဆောင်ရွက်ပြီး အသုံးစရိတ်ကို စည်းကမ်းတကျ ထိန်းချုပ်နိုင်ပါက ငွေကြေးဓန အရှိန်အဟုန်ဖြင့် ပိုမိုတိုးတက်ထွန်းကားလာပါလိမ့်မည်။");
        else if (pressureSignals > supportSignals) findings.add(en
                ? "Overall assessment: financial pressure factors are currently stronger. This does not deny prosperity, but progress depends more heavily on low debt, cash reserves, transparent agreements and patient long-term work."
                : "ခြုံငုံသုံးသပ်ချက် - ဇာတာတွင် ငွေကြေးဆိုင်ရာ ဖိအားပေးသည့် အချက်များက ပိုမိုအားကောင်းနေပါသည်။ ၎င်းသည် စီးပွားဥစ္စာ မချမ်းသာနိုင်ဟု ဆိုလိုခြင်းမဟုတ်ဘဲ ငွေကြေးတိုးတက်မှု အောင်မြင်စေရန်အတွက် အကြွေးကို အတတ်နိုင်ဆုံး လျှော့ချထားခြင်း၊ အရန်ငွေ (လက်ငင်းငွေတည်း) စုဆောင်းထားခြင်း၊ သဘောတူညီချက်များကို စာချုပ်စာတမ်းဖြင့် ရှင်းလင်းစွာ ပြုလုပ်ခြင်းနှင့် စိတ်ရှည်သည်းခံကာ ရေရှည်လုပ်ကိုင်ခြင်းတို့အပေါ် ပိုမိုမူတည်နေပါသည်။");
        else findings.add(en
                    ? "Overall assessment: supportive and pressure factors are balanced. Income can grow, but retention depends on budgeting and periods where Dasha and transit reinforce the same financial factors."
                    : "ခြုံငုံသုံးသပ်ချက် - ဇာတာတွင် ငွေကြေးကောင်းမွန်စေမည့် အချက်များနှင့် ဖိအားပေးသည့် အချက်များမှာ မျှတစွာ တည်ရှိနေပါသည်။ ဝင်ငွေလမ်းကြောင်းများ တိုးတက်လာနိုင်သော်လည်း ငွေကြေးမြဲမြံစေရန် ထိန်းသိမ်းနိုင်မှုသည် အသုံးစရိတ် စီမံခန့်ခွဲမှု စနစ်တကျရှိခြင်းနှင့် လက်ရှိရောက်ရှိနေသော ဒသာ (Dasha) အလှည့်အပြောင်း ကာလများအပေါ်တွင် ပိုမိုမူတည်နေပါသည်။");

        if (daridraPressure || ascSixExchange || nonDharmaKarmaMaleficAtAsc
                || (movableAsc && saturnOrKetuAtAsc && ascHemmed)) {
            var pressureDashaPlanets = Array(9).fill(false);
            pressureDashaPlanets[0] = sunVenusSaturnClose;
            pressureDashaPlanets[5] = sunVenusSaturnClose;
            pressureDashaPlanets[6] = sunVenusSaturnClose || (movableAsc && saturnOrKetuAtAsc && ascHemmed);
            pressureDashaPlanets[8] = movableAsc && saturnOrKetuAtAsc && ascHemmed;
            pressureDashaPlanets[ascLord] = ascTwelveExchange || ascSixExchange;
            pressureDashaPlanets[lord6] = ascSixExchange;
            pressureDashaPlanets[lord11] = lord11House == 6 || lord11House == 8 || lord11House == 12;
            pressureDashaPlanets[lord12] = ascTwelveExchange;
            pressureDashaPlanets[lord2] = nonDharmaKarmaMaleficAtAsc;
            pressureDashaPlanets[lord7] = nonDharmaKarmaMaleficAtAsc;
        }

        var wealthDashaPlanets = Array(9).fill(false);
        wealthDashaPlanets[1] = true;
        wealthDashaPlanets[2] = true;
        wealthDashaPlanets[4] = true;
        wealthDashaPlanets[5] = true;
        wealthDashaPlanets[6] = true;
        wealthDashaPlanets[lord2] = true;
        wealthDashaPlanets[lord11] = true;

        appendReadingHeading(reading, en ? "Wealth and Financial Readings" : "ငွေကြေးနှင့် စီးပွားရေးဆိုင်ရာအဟောများ");
        appendReadingFindings(reading, findings);
        if (!yogas.isEmpty()) {
            appendReadingHeading(reading, en ? "Financial Yogas" : "ငွေကြေးဆိုင်ရာယုဂ်များ");
            appendReadingFindings(reading, yogas);
        }
    
}
function angularSeparation(first,second) {

        var separation = Math.abs(normalize(first) - normalize(second));
        return Math.min(separation, 360.0 - separation);
    
}
function appendAssetOwnershipReading(reading,planets,cusps,en) {

        var asc = zodiacSign(cusps[1]);
        var ascLord = signRuler(asc);
        var lord4 = signRuler((asc + 3) % 12);
        var lord5 = signRuler((asc + 4) % 12);
        var lord7 = signRuler((asc + 6) % 12);
        var lord9 = signRuler((asc + 8) % 12);
        var lord10 = signRuler((asc + 9) % 12);
        var lord11 = signRuler((asc + 10) % 12);
        var sign4 = (asc + 3) % 12;
        var sign5 = (asc + 4) % 12;
        var sign11 = (asc + 10) % 12;
        var vehicleFindings = [];
        var homeFindings = [];
        var vehicleSupport = 0;
        var homeSupport = 0;

        var fourthSupported = assetFactorSupported(lord4, planets, asc,
                [ascLord, lord4, lord5, lord7, lord9, lord10, lord11]);
        var venusSupported = assetFactorSupported(5, planets, asc,
                [ascLord, lord4, lord5, lord7, lord9, lord10, lord11]);
        var marsSupported = assetFactorSupported(2, planets, asc,
                [ascLord, lord4, lord5, lord7, lord9, lord10, lord11]);
        if (fourthSupported && venusSupported) {
            vehicleSupport++;
            vehicleFindings.add(en
                    ? "The 4th house factors and Venus connect with angular, trinal or 11th-house support. This gives a practical foundation for acquiring vehicles when finances and timing are suitable."
                    : "၄ တန့်ဘာဝ၊ ၄ တန့်သခင်နှင့် ယာဉ်ကာရက (ယာဉ်ကိုကိုယ်စားပြုသော) သောကြာဂြိုဟ်တို့သည် ကိန်းဘာဝ၊ တြိကောဏဘာဝ သို့မဟုတ် ၁၁ တန့် (လာဘဘာဝ) တို့နှင့် ကောင်းမွန်စွာ ဆက်စပ်တည်ရှိနေပါသည်။ ထို့ကြောင့် ငွေကြေးဓနနှင့် အချိန်အခါ ကာလကိုက်ညီချိန်တွင် မော်တော်ယာဉ် ပိုင်ဆိုင်နိုင်မည့် အခြေခံကောင်းများ ထင်ရှားစွာ ရှိနေပါသည်။");
        }
        if (fourthSupported && marsSupported) {
            homeSupport++;
            homeFindings.add(en
                    ? "The 4th house factors and Mars receive supportive links. This favours the gradual acquisition, construction or improvement of a home or property."
                    : "၄ တန့်ဘာဝ၊ ၄ တန့်သခင်နှင့် အိမ်ခြံမြေအဆောက်အအုံကို ကိုယ်စားပြုသော အင်္ဂါဂြိုဟ်တို့တွင် အားပေးကူညီသည့် ဆက်စပ်မှုများ ရှိနေပါသည်။ ၎င်းသည် နေအိမ်ပိုင်ဆိုင်ခြင်း၊ အိမ်ဆောက်ခြင်း သို့မဟုတ် အိမ်ခြံမြေပိုင်ဆိုင်မှုများကို တဖြည်းဖြည်း တိုးချဲ့တည်ဆောက်နိုင်ခြင်းတို့အတွက် အခွင့်အလမ်းကောင်းများ ရရှိစေပါလိမ့်မည်။");
        }

        var lordsAtAsc = zodiacSign(planets[lord4]) == asc
                && (zodiacSign(planets[lord9]) == asc || zodiacSign(planets[lord7]) == asc);
        if (lordsAtAsc) {
            vehicleSupport++;
            vehicleFindings.add(en
                    ? "The 4th lord joins the 9th or 7th lord in the Ascendant, linking personal progress, fortune or partnership with vehicle ownership."
                    : "၄ တန့်သခင်သည် ၉ တန့်သခင် (သို့မဟုတ်) ၇ တန့်သခင်နှင့် လဂ်တွင် ပူးယှဉ်တည်ရှိနေသဖြင့် မိမိ၏ကိုယ်ပိုင်တိုးတက်မှု၊ ကံတရား၏ပံ့ပိုးမှု သို့မဟုတ် အိမ်ထောင်ဖက်/စီးပွားဖက်များ၏ အကူအညီကြောင့် မော်တော်ယာဉ် ပိုင်ဆိုင်ခွင့်ရရှိရန် အလားအလာ အလွန်ကောင်းမွန်ပါသည်။");
        }

        var fourthLordVenusInAssetHouse = zodiacSign(planets[lord4]) == zodiacSign(planets[5])
                && (zodiacSign(planets[lord4]) == sign4 || zodiacSign(planets[lord4]) == sign11);
        if (fourthLordVenusInAssetHouse) {
            vehicleSupport++;
            vehicleFindings.add(en
                    ? "The 4th lord and Venus unite in the 4th or 11th house. This supports ownership of a useful, ordinary vehicle and later upgrades when income allows."
                    : "၄ တန့်သခင်နှင့် သောကြာဂြိုဟ်တို့သည် ၄ တန့် သို့မဟုတ် ၁၁ တန့် (လာဘဘာဝ) တွင် ပူးယှဉ်တည်ရှိနေသဖြင့် လက်တွေ့အသုံးဝင်သော မော်တော်ယာဉ်တစ်စီးကို အဆင်ပြေစွာ ပိုင်ဆိုင်နိုင်ပါလိမ့်မည်။ နောင်တွင် ဝင်ငွေစီးကြောင်း ပိုမိုကောင်းမွန်လာသည်နှင့်အမျှ ပိုမိုကောင်းမွန်သော ယာဉ်အမျိုးအစားသို့ အဆင့်မြှင့်တင်နိုင်မည့် အခွင့်အလမ်းလည်း ရှိပါသည်။");
        }
        if (planetsAssociated(lord4, 1, planets)) {
            vehicleSupport++;
            vehicleFindings.add(en
                    ? "The 4th lord connects with the Moon, supporting convenience, mobility and the desire to maintain a vehicle for family needs."
                    : "၄ တန့်သခင်နှင့် တနင်္လာ (စန်း) ဂြိုဟ်တို့ ဆက်စပ်တည်ရှိနေသဖြင့် မိသားစု၏ သွားလာရေး အဆင်ပြေချောမွေ့စေရန်နှင့် လိုအပ်ချက်များကို ဖြည့်ဆည်းရန်အတွက် မော်တော်ယာဉ် ပိုင်ဆိုင်လိုစိတ်နှင့် အခွင့်အလမ်းများ ပိုမိုအားကောင်းလာပါလိမ့်မည်။");
        }
        var venusHouse = relativeHouse(zodiacSign(planets[5]), asc);
        if (lord4 == 5 && (venusHouse == 9 || venusHouse == 10 || venusHouse == 11)) {
            vehicleSupport += 2;
            vehicleFindings.add(en
                    ? "Venus rules the 4th house and occupies the 9th, 10th or 11th house. This is a strong vehicle indicator and can support owning more than one vehicle over time."
                    : "သောကြာဂြိုဟ်သည် ၄ တန့်သခင် (ဘာဝသခင်) ဖြစ်ပြီး ၉ တန့်၊ ၁၀ တန့် သို့မဟုတ် ၁၁ တန့်များတွင် တည်ရှိနေသဖြင့် မော်တော်ယာဉ် ပိုင်ဆိုင်နိုင်ရန်အတွက် အလွန်အားကောင်းသော ပံ့ပိုးမှုဖြစ်ပါသည်။ ရေရှည်တွင် ယာဉ်တစ်စီးထက်ပို၍ ပိုင်ဆိုင်နိုင်မည့် ဇာတာအဆင့်အတန်းမျိုး ဖြစ်ပါသည်။");
        }
        var jupiterSupportsFourth = zodiacSign(planets[4]) == sign4
                || planetAspectsSign(4, zodiacSign(planets[4]), sign4);
        if (jupiterSupportsFourth && venusHouse == 7) {
            vehicleSupport++;
            vehicleFindings.add(en
                    ? "Jupiter supports the 4th house while Venus occupies the 7th. Vehicle ownership can develop through partnership, marriage, clients or public-facing work."
                    : "ကြာသပတေးဂြိုဟ်က ၄ တန့်ဘာဝကို စောင့်ရှောက်အားပေးပြီး သောကြာဂြိုဟ်သည် ၇ တန့် (ကလတ္တရဘာဝ) တွင် တည်ရှိနေသဖြင့် အိမ်ထောင်ဖက်၊ စီးပွားဖက်၊ ဖောက်သည်များ သို့မဟုတ် အများပြည်သူနှင့် ဆက်ဆံရသော လုပ်ငန်းလမ်းကြောင်းများမှတစ်ဆင့် မော်တော်ယာဉ် ပိုင်ဆိုင်နိုင်မည့် အလားအလာများ တိုးတက်လာပါလိမ့်မည်။");
        }

        var lord4House = relativeHouse(zodiacSign(planets[lord4]), asc);
        var lord5House = relativeHouse(zodiacSign(planets[lord5]), asc);
        var lord9House = relativeHouse(zodiacSign(planets[lord9]), asc);
        if (lord4House == 4 && lord5House == 5) vehicleSupport++;
        if (lord5House == 9 && lord9House == 10) vehicleSupport++;
        if (relativeHouse(zodiacSign(planets[ascLord]), asc) == 1 && lord9House == 9) vehicleSupport++;
        if (lord4House == 4 && lord5House == 5) vehicleFindings.add(en
                ? "The 4th and 5th lords occupy their own houses, supporting planned acquisition of vehicles and lasting enjoyment of them."
                : "၄ တန့်သခင်သည် ၄ တန့်တွင်လည်းကောင်း၊ ၅ တန့်သခင်သည် ၅ တန့်တွင်လည်းကောင်း မိမိအိမ်တွင် ပြန်လည်တည်ရှိနေသဖြင့် အစီအစဉ်တကျ စနစ်တကျနှင့် မော်တော်ယာဉ် ဝယ်ယူပိုင်ဆိုင်နိုင်ပြီး ရေရှည်စိတ်ချမ်းမြေ့စွာ အသုံးချနိုင်မည့် အခြေခံကောင်းများ ရှိနေပါသည်။");
        if (lord5House == 9 && lord9House == 10) vehicleFindings.add(en
                ? "The 5th lord occupies the 9th and the 9th lord occupies the 10th, linking planning, fortune and career with vehicle acquisition."
                : "၅ တန့်သခင်သည် ၉ တန့်တွင်လည်းကောင်း၊ ၉ တန့်သခင်သည် ၁၀ တန့်တွင်လည်းကောင်း တည်ရှိနေသဖြင့် မိမိ၏ ကောင်းမွန်သော အတွေးအခေါ်၊ ကံတရား၏ ပံ့ပိုးမှုနှင့် အသက်မွေးဝမ်းကျောင်းလုပ်ငန်း အောင်မြင်မှုတို့မှတစ်ဆင့် မော်တော်ယာဉ် ဝယ်ယူပိုင်ဆိုင်နိုင်မည့် အခွင့်အလမ်းများ တိုးတက်လာပါလိမ့်မည်။");
        if (relativeHouse(zodiacSign(planets[ascLord]), asc) == 1 && lord9House == 9) vehicleFindings.add(en
                ? "The Ascendant and 9th lords occupy their own houses, strengthening self-reliance and fortune for major purchases such as vehicles."
                : "လဂ်သခင်သည် လဂ်တွင်လည်းကောင်း၊ ၉ တန့်သခင်သည် ၉ တန့် (ပုညဘာဝ) တွင်လည်းကောင်း မိမိအိမ်တွင် တည်ရှိနေသဖြင့် ကိုယ်ပိုင်စွမ်းဆောင်နိုင်စွမ်းနှင့် ကံတရား၏ ပံ့ပိုးမှု နှစ်မျိုးစလုံး ပေါင်းစပ်ကာ မော်တော်ယာဉ်ကဲ့သို့သော ပိုင်ဆိုင်မှုအကြီးစားများကို စိတ်ချမ်းသာစွာ ဝယ်ယူနိုင်ရန် အထူးပင် အားပေးကူညီပါလိမ့်မည်။");

        if (zodiacSign(planets[lord4]) == asc && zodiacSign(planets[5]) == sign4) {
            vehicleSupport++;
            vehicleFindings.add(en
                    ? "The 4th lord occupies the Ascendant while Venus occupies the 4th house, strongly linking personal life with vehicle comfort and ownership."
                    : "၄ တန့်သခင်သည် လဂ်တွင် တည်ရှိပြီး သောကြာဂြိုဟ်သည် ၄ တန့် (ဗန္ဓုဘာဝ) တွင် တည်ရှိနေသဖြင့် ဇာတာရှင်၏ ကိုယ်ပိုင်ဘဝ အဆင်ပြေချောမွေ့မှုနှင့် မော်တော်ယာဉ် ပိုင်ဆိုင်နိုင်မှုတို့ တိုက်ရိုက်ဆက်စပ်ကာ အလွန်အားကောင်းနေပါသည်။");
        }
        var cancerMercuryVenus = asc == 3 && zodiacSign(planets[3]) == sign4
                && zodiacSign(planets[5]) == sign4;
        if (cancerMercuryVenus) {
            vehicleSupport++;
            vehicleFindings.add(en
                    ? "For Cancer Ascendant, Mercury and Venus unite in the 4th house. This supports vehicle acquisition, especially during Mercury-Venus linked periods."
                    : "ကရကဋ်လဂ်ရှင်များအတွက် ဗုဒ္ဓဟူးဂြိုဟ်နှင့် သောကြာဂြိုဟ်တို့သည် ၄ တန့်ဘာဝတွင် ပူးယှဉ်တည်ရှိနေသဖြင့် မော်တော်ယာဉ် ဝယ်ယူပိုင်ဆိုင်နိုင်ခြေ အထူးအားကောင်းလှပါသည်။ အထူးသဖြင့် ၎င်းဂြိုဟ်များ၏ ဒသာ (Dasha) ကာလများနှင့် ၄ တန့်သို့ ကောင်းကျိုးပြုသော ကောဇာဂြိုဟ်အပြောင်းအလဲများ တစ်ပြိုင်တည်း ကိုက်ညီချိန်တွင် ပိုမိုထင်ရှားစွာ ဖြစ်ထွန်းတတ်ပါသည်။");
        }

        var exchangePairs = [
                [lord4, ascLord], [lord4, lord5], [lord4, lord9],
                [lord4, lord11], [lord5, lord9], [lord5, lord11]
        ];
        var exchanges = [];
        for (let pair of exchangePairs) {
            if (!planetsExchangeSigns(pair[0], pair[1], planets)) continue;
            vehicleSupport++;
            var pairName = displayPlanet(EN_PLANET_NAMES[pair[0]]) + " / "
                    + displayPlanet(EN_PLANET_NAMES[pair[1]]);
            if (!exchanges.contains(pairName)) exchanges.add(pairName);
        }
        if (!exchanges.isEmpty()) vehicleFindings.add(en
                ? "Vehicle-supporting sign exchanges are present between: " + TextUtils.join(", ", exchanges) + ". These connect property, planning, fortune and gains."
                : "မော်တော်ယာဉ် ပိုင်ဆိုင်မှုကို အားပေးကူညီသည့် အိမ်ဖလှယ်ခြင်း (ပရိဝတ္တန) များကို " + TextUtils.join("၊ ", exchanges)
                  + " တို့တွင် တွေ့ရှိရပါသည်။ ဤအနေအထားသည် အိမ်ခြံမြေ၊ အတွေးအခေါ်အကြံအစည်၊ ကံတရား၏ ပံ့ပိုးမှုနှင့် စီးပွားလာဘ်လာဘ အကျိုးအမြတ်တို့ကို ကောင်းမွန်စွာ ဆက်စပ်ပေးပါလိမ့်မည်။");

        var fourthLordStrong = isPlanetStrongForReading(lord4, planets);
        var fourthLordBeneficSupport = anyPlanetConjoinsOrAspectsPlanet([1, 3, 4, 5], lord4, planets);
        if (fourthLordStrong && fourthLordBeneficSupport) {
            vehicleSupport++;
            homeSupport++;
            var messageEn = "The 4th lord is strong and receives benefic support, reinforcing both vehicle and property ownership when the relevant periods operate.";
            var messageMm = "၄ တန့်သခင်သည် ဇာတာတွင် အားကောင်းပြီး သောဘဏဂြိုဟ် (အကောင်းပေးဂြိုဟ်) များ၏ အကူအညီ ပံ့ပိုးမှုကိုလည်း ရရှိထားပါသည်။ ထို့ကြောင့် သက်ဆိုင်ရာ ဒသာ (Dasha) ကာလများနှင့် ၄ တန့်ဘာဝကို အားပေးသော ကောဇာဂြိုဟ်အပြောင်းအလဲများ ကိုက်ညီချိန်တွင် မော်တော်ယာဉ်နှင့် အိမ်ခြံမြေ ပိုင်ဆိုင်နိုင်မှု နှစ်မျိုးစလုံး ပိုမိုထင်ရှားအောင်မြင်လာတတ်ပါသည်။";
            vehicleFindings.add(en ? messageEn : messageMm);
            homeFindings.add(en ? messageEn : messageMm);
        }

        var atmakaraka = 0;
        var highestSignDegree = -1.0;
        for (var planet = 0; planet <= 6; planet++) {
            var signDegree = normalize(planets[planet]) % 30.0;
            if (signDegree > highestSignDegree) {
                highestSignDegree = signDegree;
                atmakaraka = planet;
            }
        }
        var signEleventhFromNinthLord = (zodiacSign(planets[lord9]) + 10) % 12;
        var rulerEleventhFromNinthLord = signRuler(signEleventhFromNinthLord);
        var navamsaSign = zodiacSign(toNavamsaLongitude(planets[rulerEleventhFromNinthLord]));
        if (signRuler(navamsaSign) == atmakaraka) {
            vehicleSupport++;
            vehicleFindings.add(en
                    ? "The ruler of the 11th sign from the 9th lord occupies a Navamsa ruled by the Atmakaraka. This adds a specialised classical indication for vehicle ownership."
                    : "၉ တန့်သခင်မှ ၁၁ ရာသီမြောက်၏ သခင် (ဘာဝသခင်) သည် အတ္တမကာရက (Atmakaraka) စိုးမိုးသော နဝင်းဗျူဟာတွင် ကျရောက်နေသဖြင့် ဇာတာတွင် မော်တော်ယာဉ် ပိုင်ဆိုင်နိုင်မည့် အထူးကျမ်းဂန်လာ အထောက်အထားတစ်ခု ထင်ရှားစွာ ပေါ်ပေါက်နေပါသည်။");
        }

        if (homeSupport == 0) homeFindings.add(en
                ? "No single strong property combination dominates. Judge home ownership from the 4th lord, Mars, finances and periods where Dasha and transit agree; gradual acquisition remains possible."
                : "နေအိမ်ပိုင်ဆိုင်မှုကို တစ်ချက်တည်းနှင့် ကောက်ချက်ချနိုင်မည့် အနေအထားမျိုး ဇာတာတွင် မထင်ရှားသေးပါ။ ၄ တန့်သခင်၊ အင်္ဂါဂြိုဟ်၊ မိမိ၏ ငွေကြေးစုဆောင်းမှုနှင့် ဒသာ-ကောဇာ ကိုက်ညီသည့် ကာလများကို ခြုံငုံသုံးသပ်ကြည့်ပါက တဖြည်းဖြည်း ချဉ်းကပ်ဝယ်ယူနိုင်မည့် အခွင့်အလမ်းကောင်းများ ရှိနေပါသေးသည်။");
        if (vehicleSupport == 0) vehicleFindings.add(en
                ? "No single strong vehicle combination dominates. Ownership remains possible through budgeting and periods where Dasha and transit support the same vehicle factors."
                : "မော်တော်ယာဉ် ပိုင်ဆိုင်မှုကို တစ်ချက်တည်းနှင့် ကောက်ချက်ချနိုင်မည့် အနေအထားမျိုး ဇာတာတွင် မထင်ရှားသေးပါ။ သို့သော်လည်း ငွေကြေးစနစ်တကျ စီမံထားခြင်းနှင့် သက်ဆိုင်ရာ ဒသာ-ကောဇာဂြိုဟ်များ အားပေးကူညီမည့် ကာလများတွင် ဝယ်ယူနိုင်မည့် အခွင့်အလမ်းများ ရှိနေပါသည်။");

        var vehicleDashaPlanets = Array(9).fill(false);
        vehicleDashaPlanets[1] = true;
        vehicleDashaPlanets[3] = cancerMercuryVenus;
        vehicleDashaPlanets[4] = jupiterSupportsFourth;
        vehicleDashaPlanets[5] = true;
        vehicleDashaPlanets[lord4] = true;
        vehicleDashaPlanets[lord5] = true;
        vehicleDashaPlanets[lord9] = true;
        vehicleDashaPlanets[lord11] = true;

        var homeDashaPlanets = Array(9).fill(false);
        homeDashaPlanets[2] = true;
        homeDashaPlanets[4] = jupiterSupportsFourth;
        homeDashaPlanets[5] = true;
        homeDashaPlanets[lord4] = true;
        homeDashaPlanets[lord9] = true;
        homeDashaPlanets[lord11] = true;
        for (var planet = 0; planet < 9; planet++) {
            var source = zodiacSign(planets[planet]);
            if (source == sign4 || planetAspectsSign(planet, source, sign4)) homeDashaPlanets[planet] = true;
        }

        appendReadingHeading(reading, en ? "Vehicles and Property" : "ယာဉ်၊ ကားနှင့် အိမ်ပိုင်ဆိုင်မှုဆိုင်ရာအဟောများ");
        appendFindingGroup(reading, en ? "Vehicle Ownership" : "ယာဉ်၊ ကားပိုင်ဆိုင်မှု", vehicleFindings, en);
        appendFindingGroup(reading, en ? "Home and Property Ownership" : "အိမ်နှင့် အိမ်ခြံမြေပိုင်ဆိုင်မှု", homeFindings, en);
    
}
function assetFactorSupported(planet,planets,asc,supportiveLords) {

        var house = relativeHouse(zodiacSign(planets[planet]), asc);
        if (house == 1 || house == 4 || house == 5 || house == 7
                || house == 9 || house == 10 || house == 11) return true;
        for (let lord of supportiveLords) {
            if (planet != lord && planetsAssociated(planet, lord, planets)) return true;
        }
        return false;
    
}
function planetsExchangeSigns(first,second,planets) {

        if (first == second) return false;
        return signRuler(zodiacSign(planets[first])) == second
                && signRuler(zodiacSign(planets[second])) == first;
    
}
function appendCareerReading(reading,planets,cusps,en) {

        var asc = zodiacSign(cusps[1]);
        var sign10 = (asc + 9) % 12;
        var ascLord = signRuler(asc);
        var lord2 = signRuler((asc + 1) % 12);
        var lord4 = signRuler((asc + 3) % 12);
        var lord5 = signRuler((asc + 4) % 12);
        var lord6 = signRuler((asc + 5) % 12);
        var lord7 = signRuler((asc + 6) % 12);
        var lord9 = signRuler((asc + 8) % 12);
        var lord10 = signRuler(sign10);
        var lord11 = signRuler((asc + 10) % 12);
        var lord10House = relativeHouse(zodiacSign(planets[lord10]), asc);
        var navamsaLordOfTenthLord = signRuler(zodiacSign(toNavamsaLongitude(planets[lord10])));
        var findings = [];

        findings.add(en
                ? "A horoscope is better at identifying suitable fields and working style than guaranteeing one exact job title. The assessment uses the 10th house, its lord, related planets and the Ascendant; timing is shown only when Dasha and transit agree."
                : "ဇာတာသည် တိကျသေချာသော အလုပ်အကိုင် ရာထူးအမည်တစ်ခုတည်းကိုသာ သတ်မှတ်ဖော်ပြပေးခြင်းထက် မိမိနှင့် အမှန်တကယ် ကိုက်ညီမည့် လုပ်ငန်းကဏ္ဍနှင့် အလုပ်လုပ်ကိုင်ရမည့် ပုံစံဗျူဟာကို ပိုမိုကောင်းမွန်စွာ ညွှန်ပြပေးနိုင်ခြင်း ဖြစ်ပါသည်။ ဤသုံးသပ်ချက်တွင် ၁၀ တန့်ဘာဝ၊ ၁၀ တန့်သခင်၊ ဆက်စပ်ဂြိုဟ်များနှင့် လဂ်တို့ကို အခြေခံ၍ တွက်ချက်ထားပြီး ဖြစ်ထွန်းမည့် အချိန်ကာလကိုမူ ဒသာ (Dasha) နှင့် ကောဇာဂြိုဟ်အပြောင်းအလဲများ တိုက်ဆိုင်ကိုက်ညီမှုရှိမှသာ ဖော်ပြထားပါသည်။");

        var careerScores = Array(9).fill(0);
        for (var planet = 0; planet < 9; planet++) {
            var sign = zodiacSign(planets[planet]);
            if (planet == lord10) careerScores[planet] += 5;
            if (sign == sign10) careerScores[planet] += 4;
            if (planetAspectsSign(planet, sign, sign10)) careerScores[planet] += 3;
            if (planet == navamsaLordOfTenthLord) careerScores[planet] += 2;
            if (planet == ascLord) careerScores[planet] += 2;
            if (sign == asc) careerScores[planet] += 2;
            if (isPlanetStrongForReading(planet, planets)) careerScores[planet] += 1;
        }

        var fieldsMm = [
                "အုပ်ချုပ်ရေး၊ စီမံခန့်ခွဲရေး၊ အစိုးရ/အဖွဲ့အစည်းခေါင်းဆောင်မှုနဲ့ ကိုယ်ပိုင်အမှတ်တံဆိပ်လုပ်ငန်း",
                "အများပြည်သူဝန်ဆောင်မှု၊ အစားအသောက်၊ ဟိုတယ်၊ စောင့်ရှောက်ရေး၊ ရေကြောင်းနဲ့ ကူးသန်းရောင်းဝယ်ရေး",
                "အင်ဂျင်နီယာ၊ စက်မှု/စက်ပြင်၊ ဆောက်လုပ်ရေး၊ ဆေးဘက်၊ ခွဲစိတ်၊ လုံခြုံရေးနဲ့ အရေးပေါ်ဝန်ဆောင်မှု",
                "အရောင်းအဝယ်၊ စာရင်းကိုင်၊ IT၊ ဒေတာ၊ ဆက်သွယ်ရေး၊ စာရေးသားမှု၊ မီဒီယာနဲ့ အကြံပေးဝန်ဆောင်မှု",
                "ပညာရေး၊ ဥပဒေ၊ ဘဏ်/ငွေကြေး၊ စီမံကိန်းအကြံပေး၊ ဘာသာရေးနဲ့ အဖွဲ့အစည်းစီမံခန့်ခွဲမှု",
                "ဒီဇိုင်း၊ အနုပညာ၊ ဖျော်ဖြေရေး၊ အလှအပ၊ ဖက်ရှင်၊ ဟိုတယ်၊ ဇိမ်ခံပစ္စည်းနဲ့ ယာဉ်ဆိုင်ရာလုပ်ငန်း",
                "စက်ရုံ၊ ထုတ်လုပ်ရေး၊ လယ်ယာ၊ ဆောက်လုပ်ရေး၊ ပို့ဆောင်ရေး၊ သိုလှောင်ရေး၊ စည်းမျဉ်းကြီးကြပ်မှုနဲ့ ရေရှည်စနစ်တည်ဆောက်မှု",
                "နိုင်ငံခြားဆက်သွယ်မှု၊ အွန်လိုင်း/ဒစ်ဂျစ်တယ်လုပ်ငန်း၊ နည်းပညာသစ်၊ မားကတ်တင်း၊ လေကြောင်းနဲ့ သမားရိုးကျမဟုတ်တဲ့လုပ်ငန်း",
                "သုတေသန၊ လျှို့ဝှက်စနစ်၊ စိတ်ပညာ၊ ကုသရေး၊ နည်းပညာအထူးပြု၊ အကြံပေးနဲ့ လွတ်လပ်စွာလုပ်ကိုင်ရတဲ့လုပ်ငန်း"
        ];
        var fieldsEn = [
                "administration, management, government, organisational leadership and personal-brand enterprise",
                "public service, food, hospitality, care, maritime work and commerce",
                "engineering, mechanics, industry, construction, medicine, surgery, security and emergency services",
                "commerce, accounting, IT, data, communication, writing, media and consulting",
                "education, law, banking, finance, strategic advice, religion and institutional management",
                "design, arts, entertainment, beauty, fashion, hospitality, luxury goods and vehicles",
                "manufacturing, agriculture, construction, transport, warehousing, compliance and long-term systems",
                "foreign links, online business, emerging technology, marketing, aviation and unconventional fields",
                "research, psychology, healing, specialist technology, advisory and independent work"
        ];
        var ranked = Array(9).fill(false);
        var leadingPlanets = [];
        for (var rank = 0; rank < 3; rank++) {
            var best = -1;
            for (var planet = 0; planet < 9; planet++) {
                if (ranked[planet]) continue;
                if (best < 0 || careerScores[planet] > careerScores[best]) best = planet;
            }
            if (best >= 0 && careerScores[best] > 0) {
                ranked[best] = true;
                leadingPlanets.add(best);
            }
        }
        for (var index = 0; index < leadingPlanets.length; index++) {
            var planet = leadingPlanets[index];
            findings.add(en
                    ? "Career direction " + (index + 1) + " - " + displayPlanet(EN_PLANET_NAMES[planet])
                      + " is prominent, favouring " + fieldsEn[planet] + "."
                    : "သင့်တော်မည့် လုပ်ငန်းကဏ္ဍ " + localizeDigits(String(index + 1)) + " - "
                      + displayPlanet(EN_PLANET_NAMES[planet]) + " သည် ဇာတာတွင် အင်အားထင်ရှားစွာ ရှိနေသဖြင့် " + fieldsMm[planet] + " လုပ်ငန်းများနှင့် အထူးကိုက်ညီ သင့်တော်နိုင်ပါသည်။");
        }

        var modalityMm = [
                "၁၀ တန့်ဘာဝသည် စရရာသီ (Movable Sign) ဖြစ်သဖြင့် လှုပ်ရှားမြန်ဆန်သောလုပ်ငန်းများ၊ စီမံကိန်းအသစ်များ စတင်ခြင်း၊ ဦးဆောင်ဦးရွက်ပြုရခြင်းနှင့် အမြဲမပြတ် ပြောင်းလဲတိုးတက်နေသော ပတ်ဝန်းကျင်မျိုးတွင် ပိုမိုအောင်မြင် အဆင်ပြေနိုင်ပါသည်။",
                "၁၀ တန့်ဘာဝသည် ထိရရာသီ (Fixed Sign) ဖြစ်သဖြင့် တည်ငြိမ်သောအဖွဲ့အစည်းများ၊ ရေရှည်စီမံကိန်းများ၊ ရာသက်ပန် ပိုင်ဆိုင်မှု တည်ဆောက်ရခြင်းနှင့် စိတ်ရှည်သည်းခံမှု အပြည့်အဝလိုသော လုပ်ငန်းမျိုးတွင် ပိုမိုအောင်မြင် အဆင်ပြေနိုင်ပါသည်။",
                "၁၀ တန့်ဘာဝသည် ဒွေးဒဟရာသီ (Dual Sign) ဖြစ်သဖြင့် လုပ်ငန်းနှစ်မျိုး ပေါင်းစပ်လုပ်ကိုင်ခြင်း၊ အကြံပေးလုပ်ငန်းများ၊ ဆက်သွယ်ညှိနှိုင်းရခြင်းနှင့် အခြေအနေအချိန်အခါအလိုက် လိုက်လျောညီထွေ ပြောင်းလဲလုပ်ကိုင်ရသော လုပ်ငန်းမျိုးတွင် ပိုမိုအောင်မြင် အဆင်ပြေနိုင်ပါသည်။"
        ];
        var modalityEn = [
                "The 10th house is movable, favouring fast-moving work, new initiatives, leadership and changing environments.",
                "The 10th house is fixed, favouring stable organisations, long-term projects, asset-building and patient work.",
                "The 10th house is dual, favouring combined roles, advisory work, communication, negotiation and adaptable careers."
        ];
        var elementMm = [
                "မီးဓာတ်သဘော (Fire Element) ဆောင်သဖြင့် ဦးဆောင်မှုကဏ္ဍ၊ ပြတ်သားသော ဆုံးဖြတ်ချက်ချရခြင်းနှင့် ယုံကြည်ချက် ခိုင်မာစွာဖြင့် လုပ်ကိုင်ရသော လုပ်ငန်းများကို အထူးအားပေးကူညီပါသည်။",
                "မြေဓာတ်သဘော (Earth Element) ဆောင်သဖြင့် လက်တွေ့ကျကျ ဆောင်ရွက်ရခြင်း၊ စာရင်းဇယားနှင့် စာချုပ်စာတမ်းများ၊ ရုပ်ဝတ္ထုပစ္စည်းနှင့် ရလဒ်ကောင်းများ တည်ဆောက်ရသော လုပ်ငန်းများကို အထူးအားပေးကူညီပါသည်။",
                "လေဓာတ်သဘော (Air Element) ဆောင်သဖြင့် အတွေးအခေါ် ဉာဏ်ပညာပိုင်း၊ ဆက်သွယ်ပြောဆိုရေး၊ နည်းပညာနှင့် လူမှုကွန်ရက်များကို စနစ်တကျ အသုံးချရသော လုပ်ငန်းများကို အထူးအားပေးကူညီပါသည်။",
                "ရေဓာတ်သဘော (Water Element) ဆောင်သဖြင့် လူသားတို့၏ လိုအပ်ချက်များကို နားလည်ဖြည့်ဆည်းပေးရခြင်း၊ စောင့်ရှောက်မှုပေးခြင်း၊ ဖန်တီးမှုစွမ်းရည်နှင့် စိတ်ခံစားမှု အနုပညာပိုင်း သုံးရသော လုပ်ငန်းများကို အထူးအားပေးကူညီပါသည်။"
        ];
        var elementEn = [
                "Its fire element favours leadership, decisiveness and conviction-driven work.",
                "Its earth element favours practical execution, records, material work and measurable results.",
                "Its air element favours ideas, communication, technology and networks.",
                "Its water element favours care, understanding people, creativity and emotionally intelligent work."
        ];
        findings.add((en ? modalityEn[sign10 % 3] : modalityMm[sign10 % 3]) + " "
                + (en ? elementEn[sign10 % 4] : elementMm[sign10 % 4]));

        var rajaReasons = [];
        var rajaStrength = 0;
        var kendraTrineLink = false;
        for (let kendra of [1, 4, 7, 10]) {
            for (let trine of [1, 5, 9]) {
                var kLord = signRuler((asc + kendra - 1) % 12);
                var tLord = signRuler((asc + trine - 1) % 12);
                if (kLord != tLord && planetsAssociated(kLord, tLord, planets)) kendraTrineLink = true;
            }
        }
        if (kendraTrineLink) {
            rajaStrength++;
            rajaReasons.add(en ? "an angular lord connects with a trinal lord"
                    : "ကိန်းဘာဝသခင်နှင့် တြိကောဏဘာဝသခင်တို့ အပြန်အလှန် ဆက်စပ်တည်ရှိနေခြင်း");
        }
        var firstClassRaja = planetsExchangeSigns(lord9, lord10, planets)
                || (zodiacSign(planets[lord9]) == zodiacSign(planets[lord10])
                && isGoodYogaHouse(relativeHouse(zodiacSign(planets[lord9]), asc)))
                || planetsExchangeSigns(ascLord, lord10, planets)
                || (planetsAssociated(ascLord, lord9, planets)
                && planetsAssociated(lord9, lord10, planets));
        if (firstClassRaja) {
            rajaStrength += 2;
            rajaReasons.add(en ? "the Ascendant, 9th and 10th-house factors form a first-class Raja Yoga link"
                    : "လဂ်သခင်၊ ၉ တန့်သခင်နှင့် ၁၀ တန့်သခင်တို့၏ အချက်အလက်များက ဇာတာတွင် ပထမတန်းစား ရာဇယုဂ် (First-class Raja Yoga) အဖြစ် အားကောင်းစွာ ဆက်စပ်ဖြစ်ထွန်းနေခြင်း");
        }
        var lord9House = relativeHouse(zodiacSign(planets[lord9]), asc);
        var lord5House = relativeHouse(zodiacSign(planets[lord5]), asc);
        var lord2House = relativeHouse(zodiacSign(planets[lord2]), asc);
        if (lord9House == 9 && lord10House == 10) rajaStrength++;
        if (lord10House == 10 && lord5House == 5) rajaStrength++;
        if (lord9House == 9 && lord10House == 1) rajaStrength++;
        if ((lord2House == 2 && lord5House == 5) || (lord2House == 9 && lord5House == 10)) rajaStrength++;

        var lord11House = relativeHouse(zodiacSign(planets[lord11]), asc);
        if (lord2House == 10 && lord11House == 10
                && isPlanetStrongForReading(lord2, planets) && isPlanetStrongForReading(lord11, planets)) {
            rajaStrength++;
            rajaReasons.add(en ? "the strong 2nd and 11th lords reinforce the 10th house"
                    : "ဇာတာတွင် အားကောင်းသော ၂ တန့်သခင် (ဓနသခင်) နှင့် ၁၁ တန့်သခင် (လာဘသခင်) တို့က ၁၀ တန့် (ကမ္မဘာဝ) ကို ဝိုင်းဝန်းအားဖြည့် ပံ့ပိုးထားခြင်း");
        }
        var commonSign = zodiacSign(planets[lord10]);
        var commonHouse = relativeHouse(commonSign, asc);
        if ((commonHouse == 1 || commonHouse == 7 || commonHouse == 10)
                && zodiacSign(planets[ascLord]) == commonSign
                && zodiacSign(planets[lord4]) == commonSign
                && zodiacSign(planets[lord9]) == commonSign) rajaStrength++;
        if (isKendraOrTrine(relativeHouse(zodiacSign(planets[lord6]), asc))
                && isKendraOrTrine(relativeHouse(zodiacSign(planets[lord7]), asc))
                && isKendraOrTrine(lord10House)) rajaStrength++;

        var moonSign = zodiacSign(planets[1]);
        var chandraAdhi = true;
        for (let planet of [3, 4, 5]) {
            var fromMoon = relativeHouse(zodiacSign(planets[planet]), moonSign);
            if (fromMoon != 6 && fromMoon != 7 && fromMoon != 8) chandraAdhi = false;
        }
        if (chandraAdhi) {
            rajaStrength++;
            rajaReasons.add(en ? "Mercury, Jupiter and Venus form Chandra Adhi Yoga"
                    : "ဗုဒ္ဓဟူးဂြိုဟ်၊ ကြာသပတေးဂြိုဟ်နှင့် သောကြာဂြိုဟ်တို့ ပေါင်းစပ်ကာ စန္ဒြအဓိယုဂ် (Chandra Adhi Yoga) ထင်ရှားစွာ ဖြစ်ထွန်းနေခြင်း");
        }
        if (isKendraRelative(zodiacSign(planets[1]), zodiacSign(planets[4]))) {
            rajaStrength++;
            rajaReasons.add(en ? "the Moon and Jupiter form Gaja Kesari Yoga"
                    : "တနင်္လာ (စန်း) နှင့် ကြာသပတေးဂြိုဟ်တို့ ကိန်းဘာဝအချင်းချင်း ဆက်စပ်ပြီး ဂဇကေသရီယုဂ် (Gaja Kesari Yoga) အင်အားပြည့်ဝစွာ ဖြစ်ထွန်းနေခြင်း");
        }
        if (housesOccupied(planets, [0, 1, 2, 3, 4, 5, 6, 7, 8], asc,
                [1, 4, 7, 10])) rajaStrength++;
        if (zodiacSign(planets[0]) == 0 && zodiacSign(planets[1]) == 3
                && zodiacSign(planets[4]) == 3 && zodiacSign(planets[6]) == 6
                && zodiacSign(planets[2]) == 9) rajaStrength += 2;

        var navamsa = mapArrayToNavamsa(planets);
        var neechaBhanga = false;
        for (var planet = 0; planet <= 6; planet++) {
            if (isDebilitatedSign(planet, zodiacSign(planets[planet]))
                    && !debilitationCancellationReasons(planet, planets, navamsa, asc, moonSign, en).isEmpty()) {
                neechaBhanga = true;
                break;
            }
        }
        if (neechaBhanga) {
            rajaStrength++;
            rajaReasons.add(en ? "a debilitation-cancellation Raja Yoga is present"
                    : "နိစ်ဂြိုဟ်၏ အားနည်းချက်ကို ပြန်လည်ချေဖျက်ပေးသော နိစ်ဘင်္ဂရာဇယုဂ် (Neecha Bhanga Raja Yoga) ဇာတာတွင် ပေါ်ပေါက်နေခြင်း");
        }

        var reasonText = rajaReasons.isEmpty() ? "" : (en ? " Key factors: " : " အဓိကအကြောင်းရင်းများမှာ - ")
                                                         + TextUtils.join(en ? ", " : "၊ ", rajaReasons) + (en ? "." : " တို့ ဖြစ်ကြပါသည်။");
        if (rajaStrength >= 4) findings.add(en
                ? "Career recognition is strongly supported. Leadership, promotion and public acknowledgement can become prominent during suitable periods." + reasonText
                : "အသက်မွေးဝမ်းကျောင်းလုပ်ငန်းတွင် အများ၏အသိအမှတ်ပြု ခံရနိုင်ခြေ အထူးအားကောင်းလှပါသည်။ သင့်တော်ကောင်းမွန်သော အချိန်အခါကာလများသို့ ရောက်ရှိချိန်တွင် ခေါင်းဆောင်မှုကဏ္ဍ ရရှိခြင်း၊ ရာထူးအဆင့်အတန်း တိုးတက်ခြင်းနှင့် လူမှုပတ်ဝန်းကျင်တွင် ထင်ရှားကျော်ကြားလာခြင်းတို့ ပိုမိုဖြစ်ထွန်းလာပါလိမ့်မည်။" + reasonText);
        else if (rajaStrength >= 2) findings.add(en
                ? "Career recognition has moderate support. Progress is more likely through consistent skill, responsibility and the right timing than through sudden elevation." + reasonText
                : "အသက်မွေးဝမ်းကျောင်းလုပ်ငန်းတွင် အများ၏အသိအမှတ်ပြု ခံရနိုင်ခြေ အလယ်အလတ်အဆင့် အထောက်အပံ့ ရှိနေပါသည်။ ရုတ်တရက် ရာထူးအဆင့်အတန်း ခုန်ပျံကျော်လွှား တက်လှမ်းရခြင်းမျိုးထက် မိမိ၏ တစိုက်မတ်မတ် ကျွမ်းကျင်မှု၊ တာဝန်ယူမှုနှင့် အချိန်အခါ ကာလကိုက်ညီမှုတို့ကြောင့် တဖြည်းဖြည်း ချောမွေ့စွာ တိုးတက်အောင်မြင်လာပါလိမ့်မည်။" + reasonText);
        else findings.add(en
                    ? "No dominant Raja Yoga pattern controls the career. Success remains possible through specialisation, reliable work and periods where supportive Dasha and transit factors meet."
                    : "အသက်မွေးဝမ်းကျောင်း ကဏ္ဍကို ရုတ်တရက် မြှင့်တင်ပေးမည့် ထင်ရှားသော ရာဇယုဂ်အင်အားမျိုး ဇာတာတွင် မတွေ့ရှိရသေးပါ။ သို့သော်လည်း မိမိ၏ သီးသန့်ကျွမ်းကျင်မှု၊ ယုံကြည်စိတ်ချရသော လုပ်ဆောင်ချက်များနှင့် ကောင်းမွန်သော ဒသာ-ကောဇာဂြိုဟ်များ တိုက်ဆိုင်ကိုက်ညီသည့် ကာလများတွင် အဆင်ပြေအောင်မြင်စွာ တိုးတက်နိုင်မည့် အခွင့်အလမ်းများ ရှိနေပါသည်။");

        var careerDashaPlanets = Array(9).fill(false);
        careerDashaPlanets[ascLord] = true;
        careerDashaPlanets[lord10] = true;
        careerDashaPlanets[navamsaLordOfTenthLord] = true;
        for (let planet of leadingPlanets) careerDashaPlanets[planet] = true;
        for (var planet = 0; planet < 9; planet++) {
            var sign = zodiacSign(planets[planet]);
            if (sign == sign10 || planetAspectsSign(planet, sign, sign10)) careerDashaPlanets[planet] = true;
        }

        appendReadingHeading(reading, en ? "Career" : "အလုပ်အကိုင်");
        appendReadingFindings(reading, findings);
    
}
function appendForeignOpportunityReading(reading,planets,cusps,en) {

        var asc = zodiacSign(cusps[1]);
        var houses = [3, 8, 9, 12];
        var houseLords = Array(houses.length).fill(0);
        var rahuHouseLinks = Array(houses.length).fill(false);
        var rahuLordLinks = Array(houses.length).fill(false);
        var rahuLinkCount = 0;
        for (var index = 0; index < houses.length; index++) {
            var targetSign = (asc + houses[index] - 1) % 12;
            houseLords[index] = signRuler(targetSign);
            rahuHouseLinks[index] = rahuInfluencesSign(zodiacSign(planets[7]), targetSign);
            rahuLordLinks[index] = rahuInfluencesSign(zodiacSign(planets[7]),
                    zodiacSign(planets[houseLords[index]]));
            if (rahuHouseLinks[index]) rahuLinkCount++;
            if (rahuLordLinks[index]) rahuLinkCount++;
        }

        var associatedPairs = 0;
        var associatedPairNames = [];
        for (var first = 0; first < houseLords.length; first++) {
            for (var second = first + 1; second < houseLords.length; second++) {
                if (houseLords[first] == houseLords[second]
                        || !planetsAssociated(houseLords[first], houseLords[second], planets)) continue;
                associatedPairs++;
                var pairName = localizeDigits(String(houses[first])) + "/"
                        + localizeDigits(String(houses[second])) + " တန့်";
                if (!associatedPairNames.contains(pairName)) associatedPairNames.add(pairName);
            }
        }

        var findings = [];
        findings.add(en
                ? "Foreign travel is an opportunity pattern rather than an automatic event. It becomes more practical when the horoscope is supported by applications, qualifications, finance and deliberate action."
                : "နိုင်ငံခြားသို့ သွားရောက်နိုင်သည့် အနေအထားမျိုးသည် အလားအလာရှိသော အခွင့်အလမ်းကိုသာ ညွှန်ပြခြင်းဖြစ်ပြီး အလိုအလျောက် သွားရောက်ရမည်ဟု ဆိုလိုခြင်းမဟုတ်ပါ။ မိမိ၏ ဗီဇာ/ပတ်စ်ပို့ လျှောက်လွှာတင်ခြင်း၊ လိုအပ်သော ပညာအရည်အချင်းနှင့် ဘာသာစကားပိုင်းဆိုင်ရာ ကြိုတင်ပြင်ဆင်ခြင်း၊ ငွေကြေးစနစ်တကျ စီမံခန့်ခွဲခြင်းနှင့် ကိုယ်တိုင်တစိုက်မတ်မတ် ကြိုးစားအားထုတ်မှုများ ရှိမှသာလျှင် ၎င်းအခွင့်အလမ်းများကို လက်တွေ့အကောင်အထည်ဖော် ဖြစ်ထွန်းစေနိုင်ခြင်း ဖြစ်ပါသည်။");

        var meaningsMm = [
                "၃ တန့်ဘာဝ ဆက်စပ်မှုသည် ခရီးတိုများ သွားရောက်ရခြင်းမှစ၍ နိုင်ငံခြားအဆက်အသွယ် ရရှိခြင်း၊ စာချုပ်စာတမ်း စာရွက်စာတမ်းကိစ္စများ အောင်မြင်ခြင်း၊ ဆက်သွယ်ရေး ကဏ္ဍများနှင့် မိမိကိုယ်တိုင် တက်ကြွစွာ လျှောက်ထားမှုများမှတစ်ဆင့် အခွင့်အလမ်းကောင်းများ ပေါ်ပေါက်လာနိုင်သည်ကို ညွှန်ပြနေပါသည်။",
                "၈ တန့်ဘာဝ ဆက်စပ်မှုသည် မမျှော်လင့်ထားသော ဘဝအပြောင်းအလဲများ၊ ဖက်စပ်ငွေကြေး သို့မဟုတ် ပူးတွဲရင်းနှီးမြှုပ်နှံမှုများ၊ သုတေသနလုပ်ငန်းများနှင့် အလုပ်အကိုင် အခြေအနေ အပြောင်းအလဲများကြောင့် နိုင်ငံခြားခရီး လမ်းကြောင်းများ ပေါ်ပေါက်လာနိုင်သည်ကို ညွှန်ပြနေပါသည်။",
                "၉ တန့်ဘာဝ ဆက်စပ်မှုသည် ခရီးဝေးသွားရခြင်း၊ အဆင့်မြင့်ပညာရေး သို့မဟုတ် အထူးသင်တန်းများ တက်ရောက်ရခြင်း၊ ဘာသာရေး၊ ဥပဒေရေးရာများ သို့မဟုတ် ဆရာသမား၊ လူကြီးသူမများ၏ ကူညီပံ့ပိုးမှုများမှတစ်ဆင့် နိုင်ငံခြားအခွင့်အလမ်းများ ရရှိနိုင်သည်ကို ညွှန်ပြနေပါသည်။",
                "၁၂ တန့်ဘာဝ ဆက်စပ်မှုသည် နိုင်ငံရပ်ခြားတွင် ရေရှည်နေထိုင်ခြင်း၊ အခြေချအလုပ်လုပ်ကိုင်ခြင်း၊ နိုင်ငံတကာအဖွဲ့အစည်းကြီးများနှင့် ဆက်စပ်ခြင်း သို့မဟုတ် နောက်ကွယ်မှ ပံ့ပိုးကူညီရသော ဝန်ဆောင်မှုလုပ်ငန်းများနှင့် ဆက်စပ်ကာ ဖြစ်ထွန်းနိုင်သည်ကို ညွှန်ပြနေပါသည်။"
        ];
        var meaningsEn = [
                "The 3rd-house link favours foreign contacts, documents, communication and self-initiated applications, often beginning with shorter journeys.",
                "The 8th-house link can bring a foreign path through sudden change, shared finance, research or a major change of work circumstances.",
                "The 9th-house link favours long-distance travel, higher education, training, law, religion or support from a mentor.",
                "The 12th-house link favours extended foreign residence, overseas work, institutions and behind-the-scenes service."
        ];
        for (var index = 0; index < houses.length; index++) {
            if (rahuHouseLinks[index] || rahuLordLinks[index]) {
                findings.add(en ? meaningsEn[index] : meaningsMm[index]);
            }
        }
        if (!associatedPairNames.isEmpty()) findings.add(en
                ? "The lords of the travel-related houses form " + associatedPairs
                  + " relevant connection(s), strengthening links between movement, change, long-distance opportunity and foreign residence."
                : "နိုင်ငံခြားခရီးသွားလာခြင်းနှင့် သက်ဆိုင်သော ဘာဝသခင်များအကြားတွင် "
                  + TextUtils.join("၊ ", associatedPairNames) + " ဆက်စပ်မှုများကို တွေ့ရှိရပါသည်။ ဤအနေအထားသည် ခရီးသွားလာရခြင်း၊ ဘဝအပြောင်းအလဲ ကြုံတွေ့ရခြင်း၊ ခရီးဝေးအခွင့်အလမ်းများနှင့် နိုင်ငံရပ်ခြား နေထိုင်မှုတို့ အချင်းချင်း ပိုမိုဆက်စပ် အားကောင်းလာစေပါသည်။");

        var rahuCondition = rahuLinkCount > 0;
        var houseLordCondition = associatedPairs > 0;
        if (rahuLinkCount >= 4 && associatedPairs >= 2) findings.add(en
                ? "Overall assessment: foreign opportunity is strong. Several Rahu links and multiple house-lord connections support travel, study, work or residence abroad when practical requirements are met."
                : "ခြုံငုံသုံးသပ်ချက် - ဇာတာတွင် နိုင်ငံခြားအခွင့်အလမ်း အထူးအားကောင်းလှပါသည်။ ရာဟုဂြိုဟ်၏ ဆက်စပ်မှုနှင့် ဘာဝသခင်အချင်းချင်း ဆက်စပ်မှုများပြားနေသဖြင့် လက်တွေ့လိုအပ်သော စာရွက်စာตမ်းများနှင့် အခြေအနေများ ပြည့်စုံအောင် ဆောင်ရွက်နိုင်ပါက ပြည်ပခရီးသွားခြင်း၊ ပညာသင်ကြားခြင်း၊ အလုပ်လုပ်ကိုင်ခြင်း သို့မဟုတ် သွားရောက်အခြေချ နေထိုင်ခြင်း စသည့် အကျိုးရလဒ်များ ထင်ရှားစွာ ပေါ်ပေါက်လာပါလိမ့်မည်။");
        else if (rahuCondition && houseLordCondition) findings.add(en
                ? "Overall assessment: foreign opportunity has moderate support. The path is realistic, but timing, finance, documents and sustained applications are important."
                : "ခြုံငုံသုံးသပ်ချက် - ဇာတာတွင် နိုင်ငံခြားအခွင့်အလမ်း အလယ်အလတ်အဆင့် အထောက်အပံ့ ရှိနေပါသည်။ အခွင့်အလမ်း ပေါ်ပေါက်လာနိုင်သော်လည်း သင့်တော်သော အချိန်အခါ၊ ငွေကြေးစီမံမှု၊ စာရွက်စာတမ်း အဆင်သင့်ဖြစ်မှုနှင့် မဆုတ်မနက် ဆက်တိုက်လျှောက်ထား အားထုတ်မှုတို့ရှိရန် အထူးအရေးကြီးပါသည်။");
        else if (rahuCondition || houseLordCondition) findings.add(en
                ? "Overall assessment: a partial foreign indication is present. Short travel, online foreign work, temporary assignments or study may appear before permanent relocation."
                : "ခြုံငုံသုံးသပ်ချက် - နိုင်ငံခြားနှင့် သက်ဆိုင်သော အချက်အလက်အချို့ ဇာတာတွင် တစ်ပိုင်းတစ်စ ရှိနေပါသည်။ အမြဲတမ်း သွားရောက်ရွှေ့ပြောင်း နေထိုင်ခြင်းမျိုး မတိုင်မီ ခရီးတိုသွားရခြင်း၊ နိုင်ငံခြားနှင့် ဆက်စပ်သောအွန်လိုင်းလုပ်ငန်းများ လုပ်ကိုင်ရခြင်း၊ ယာယီတာဝန်ဖြင့် သွားရောက်ရခြင်း သို့မဟုတ် သင်တန်းတက်ရောက်ရခြင်းမျိုး အရင်ပေါ်ပေါက်လာတတ်ပါသည်။");
        else findings.add(en
                    ? "Overall assessment: no concentrated foreign-travel pattern is currently dominant. Foreign contact remains possible through work or study, but it may require more preparation and repeated effort."
                    : "ခြုံငုံသုံးသပ်ချက် - နိုင်ငံခြားသို့ သွားရောက်နိုင်မည့် အခွင့်အလမ်းများကို အားကောင်းစွာ စုစည်းပေးထားသော အနေအထားမျိုး ဇာတာတွင် မထင်ရှားသေးပါ။ အသက်မွေးဝမ်းကျောင်း သို့မဟုတ် ပညာရေးကဏ္ဍမှတစ်ဆင့် ပြည်ပနှင့် ဆက်သွယ်ရေးလမ်းကြောင်းများ ရရှိနိုင်သော်လည်း ပိုမိုကြိုတင်ပြင်ဆင်ခြင်းနှင့် အကြိမ်ကြိမ် ကြိုးစားအားထုတ်ရန် လိုအပ်ပါလိမ့်မည်။");

        var foreignDashaPlanets = Array(9).fill(false);
        foreignDashaPlanets[7] = true;
        foreignDashaPlanets[8] = true;
        for (let lord of houseLords) foreignDashaPlanets[lord] = true;
        for (var planet = 0; planet < 9; planet++) {
            var planetSign = zodiacSign(planets[planet]);
            for (let house of houses) {
                var targetSign = (asc + house - 1) % 12;
                if (planetSign == targetSign || planetAspectsSign(planet, planetSign, targetSign)) {
                    foreignDashaPlanets[planet] = true;
                }
            }
        }

        appendReadingHeading(reading, en ? "Foreign Travel" : "နိုင်ငံခြားခရီး");
        appendReadingFindings(reading, findings);
    
}
function rahuInfluencesSign(rahuSign,targetSign) {

        var house = relativeHouse(targetSign, rahuSign);
        return house == 1 || house == 5 || house == 7 || house == 9;
    
}
function appendChildrenReading(reading,planets,cusps,day,month,year,en) {

        var asc = zodiacSign(cusps[1]);
        var ascLord = signRuler(asc);
        var lord5 = signRuler((asc + 4) % 12);
        var lord7 = signRuler((asc + 6) % 12);
        var sign5 = (asc + 4) % 12;
        var benefics = [1, 3, 4, 5];
        var malefics = [0, 2, 6, 7, 8];
        var findings = [];

        var fifthBenefic = anyPlanetConjoinsOrAspectsSign(benefics, sign5, planets);
        var fifthMaleficCount = countPlanetsConjoiningOrAspectingSign(malefics, sign5, planets);
        var lord5Strong = isOwnOrExalted(lord5, zodiacSign(planets[lord5]))
                || isFriendlySign(lord5, zodiacSign(planets[lord5]))
                || isMoolatrikona(lord5, zodiacSign(planets[lord5]), normalize(planets[lord5]) % 30.0);
        var lord5House = relativeHouse(zodiacSign(planets[lord5]), asc);
        if (fifthBenefic) findings.add(en
                ? "Benefic planets influence the 5th house, supporting affection, cooperation and emotional fulfilment through children."
                : "၅ တန့်ဘာဝ (ပုတ္တဘာဝ) ကို သောဘဏဂြိုဟ် (အကောင်းပေးဂြိုဟ်) များ အမြင်/အယှဉ် ရှိနေသဖြင့် သားသမီးများထံမှ စစ်မှန်သော ချစ်ခင်မြတ်နိုးမှု၊ ပူးပေါင်းကူညီမှုနှင့် စိတ်ချမ်းမြေ့စရာ ရလဒ်ကောင်းများ ရရှိနိုင်ပါလိမ့်မည်။");
        if (fifthMaleficCount > 0) findings.add(en
                ? "The 5th house receives " + fifthMaleficCount + " malefic influence(s). Parenting can require extra patience, planning and consistent guidance; benefic support reduces the pressure."
                : "၅ တန့်ဘာဝကို ပါပဂြိုဟ် (အဆိုးပေးဂြိုဟ်) " + localizeDigits(String(fifthMaleficCount)) + " လုံး၏ လွှမ်းမိုးမှု ရှိနေသဖြင့် သားသမီးဆိုင်ရာ ကိစ္စရပ်များတွင် ပိုမိုစိတ်ရှည်သည်းခံခြင်း၊ ကြိုတင်စီမံခန့်ခွဲခြင်းနှင့် တည်ငြိမ်သော လမ်းညွှန်ပြသမှုများ ပြုလုပ်ရန် လိုအပ်ပါလိမ့်မည်။ ဇာတာတွင် သောဘဏဂြိုဟ်များ၏ အကူအညီရှိပါက ဖိအားနှင့် အဆိုးသက်ရောက်မှုများကို သိသိသာသာ လျော့ပါးသက်သာစေပါလိမ့်မည်။");
        if (lord5Strong && isGoodYogaHouse(lord5House) && fifthBenefic) findings.add(en
                ? "The 5th lord is strong in a favourable house under benefic influence, supporting capable, recognised or accomplished children who can become a source of pride."
                : "၅ တန့်သခင်သည် ကောင်းမွန်သော ဘာဝရပ်ဝန်းတွင် အားကောင်းစွာ တည်ရှိပြီး သောဘဏဂြိုဟ်များ၏ လွှမ်းမိုးမှုကို ရရှိထားသဖြင့် အရည်အချင်းထက်မြက်ခြင်း၊ အများ၏ အသိအမှတ်ပြုခြင်း ခံရခြင်း သို့မဟုတ် အောင်မြင်ထင်ရှားသော သားသမီး ရတနာများ ထွန်းကားတတ်ပြီး မိသားစုအတွက် ဂုဏ်ယူဝမ်းမြောက်စရာများ ကြုံတွေ့ရပါလိမ့်မည်။");

        var femaleNative = !maleNative;
        if (femaleNative && anyPlanetOccupiesSign(malefics, (asc + 11) % 12, planets)) findings.add(en
                ? "For the selected female chart, malefics occupy the 12th house. Pregnancy and childbirth planning benefit from timely check-ups, adequate rest and dependable practical support."
                : "ရွေးချယ်ထားသော အမျိုးသမီးဇာတာတွင် ၁၂ တန့်ဘာဝ (ဗျယဘာဝ) ၌ ပါပဂြိုဟ်များ တည်ရှိနေသဖြင့် ကိုယ်ဝန်ဆောင်ခြင်းနှင့် မီးဖွားခြင်းဆိုင်ရာ အစီအစဉ်များတွင် အချိန်နှင့်တစ်ပြေးညီ ကျန်းမာရေးစစ်ဆေးမှု ပြုလုပ်ခြင်း၊ လုံလောက်စွာ အနားယူခြင်းနှင့် ယုံကြည်စိတ်ချရသော လက်တွေ့အကူအညီများကို အထူးဂရုပြု အလေးထားသင့်ပါသည်။");
        var keyFactorsWeak = !isPlanetStrongForReading(4, planets)
                && !isPlanetStrongForReading(ascLord, planets)
                && !isPlanetStrongForReading(lord7, planets)
                && !isPlanetStrongForReading(lord5, planets);
        var keyFactorsAfflicted = anyPlanetConjoinsOrAspectsPlanet(malefics, 4, planets)
                && anyPlanetConjoinsOrAspectsPlanet(malefics, lord5, planets);
        if (keyFactorsWeak && keyFactorsAfflicted) findings.add(en
                ? "Jupiter, the Ascendant lord, 7th lord and 5th lord lack strong dignity while key child factors receive malefic influence. Family expansion may require additional time, planning or specialist support."
                : "ကြာသပတေးဂြိုဟ် (ပုတ္တကာရက)၊ လဂ်သခင်၊ ၇ တန့်သခင်နှင့် ၅ တန့်သခင်တို့သည် ဇာတာတွင် အားမာန်ထင်ရှားမှု လျော့နည်းနေပြီး သားသမီးဆိုင်ရာ အချက်အလက်များ၌ ပါပဂြိုဟ် (အဆိုးပေးဂြိုဟ်) များ၏ လွှမ်းမိုးမှု ရှိနေသဖြင့် မိသားစုတိုးချဲ့မှု အစီအစဉ်များအတွက် အချိန်ပိုမိုယူခြင်း၊ ကြိုတင်စနစ်တကျ စီမံခြင်း သို့မဟုတ် သက်ဆိုင်ရာ ကျွမ်းကျင်သူများ၏ အကူအညီ ရယူရန် လိုအပ်ပါလိမ့်မည်။");
        if (zodiacSign(planets[6]) == sign5 && zodiacSign(planets[lord5]) == zodiacSign(planets[7])) findings.add(en
                ? "Saturn occupies the 5th house while the 5th lord joins Rahu. Child-related plans can involve delay, unconventional circumstances or heavier responsibility, making patient preparation important."
                : "စနေဂြိုဟ်သည် ၅ တန့်ဘာဝ (ပုတ္တဘာဝ) တွင် တည်ရှိနေပြီး ၅ တန့်သခင်သည် ရာဟုဂြိုဟ်နှင့် ပူးယှဉ်ကျရောက်နေသဖြင့် သားသမီးဆိုင်ရာ အစီအစဉ်များတွင် အချိန်ကာလ နှောင့်နှေးကြန့်ကြာခြင်း၊ သမားရိုးကျမဟုတ်သော အခြေအနေများနှင့် ကြုံတွေ့ရခြင်း သို့မဟုတ် တာဝန်ဝတ္တရား ပိုမိုကြီးမားလာခြင်းတို့ ဖြစ်တတ်ပါသည်။ ထို့ကြောင့် စိတ်ရှည်သည်းခံစွာ ကြိုတင်ပြင်ဆင်မှု ပြုလုပ်ထားရန် အထူးပင် အရေးကြီးပါသည်။");

        var malePolarity = 0;
        var femalePolarity = 0;
        if (sign5 % 2 == 0) malePolarity++; else femalePolarity++;
        var lord5Sign = zodiacSign(planets[lord5]);
        if (lord5Sign % 2 == 0) malePolarity++; else femalePolarity++;
        if (anyPlanetConjoinsOrAspectsPlanet([0, 2, 4], lord5, planets)) malePolarity++;
        if (anyPlanetConjoinsOrAspectsPlanet([1, 5, 7], lord5, planets)) femalePolarity++;
        if (malePolarity > femalePolarity) findings.add(en
                ? "Traditional sign polarity around the 5th house and its lord leans masculine. This describes symbolic masculine emphasis in child-related matters rather than a medical prediction of a child's sex."
                : "၅ တန့်ဘာဝနှင့် ၅ တန့်သခင်ဆိုင်ရာ ရာသီနှင့် ဂြိုဟ်တို့၏ သဘာဝအရ ဇာတာတွင် ပုရိသ (ယောက်ျား) သဘောတရား ပိုမိုအားကောင်းနေပါသည်။ ဤအချက်သည် သားသမီးဆိုင်ရာ ကိစ္စရပ်များ၌ သင်္ကေတပုံဆောင် ပုရိသအင်အား ပိုမိုသက်ရောက်မှုကိုသာ ညွှန်ပြခြင်းဖြစ်ပြီး ကလေး၏ လိင်အမျိုးအစားကို ဆေးဘက်ဆိုင်ရာအရ တိကျစွာ ခန့်မှန်းခြင်း မဟုတ်ပါ။");
        else if (femalePolarity > malePolarity) findings.add(en
                ? "Traditional sign polarity around the 5th house and its lord leans feminine. This describes symbolic feminine emphasis in child-related matters rather than a medical prediction of a child's sex."
                : "၅ တန့်ဘာဝနှင့် ၅ တန့်သခင်ဆိုင်ရာ ရာသီနှင့် ဂြိုဟ်တို့၏ သဘာဝအရ ဇာတာတွင် ဣတ္ထိ (မိန်းမ) သဘောတရား ပိုမိုအားကောင်းနေပါသည်။ ဤအချက်သည် သားသမီးဆိုင်ရာ ကိစ္စရပ်များ၌ သင်္ကေတပုံဆောင် ဣတ္ထိအင်အား ပိုမိုသက်ရောက်မှုကိုသာ ညွှန်ပြခြင်းဖြစ်ပြီး ကလေး၏ လိင်အမျိုးအစားကို ဆေးဘက်ဆိုင်ရာအရ တိကျစွာ ခန့်မှန်းခြင်း မဟုတ်ပါ။");

        var occupants = 0;
        var lord5Conjunctions = 0;
        for (var planet = 0; planet < Math.min(9, planets.length); planet++) {
            if (zodiacSign(planets[planet]) == sign5) occupants++;
            if (planet != lord5 && zodiacSign(planets[planet]) == lord5Sign) lord5Conjunctions++;
        }
        if (occupants > 0 || lord5Conjunctions > 0) findings.add(en
                ? "The 5th house contains " + occupants + " planet(s), and " + lord5Conjunctions + " planet(s) join its lord. This indicates the concentration of child-related responsibilities and experiences, but is not used as an exact child count."
                : "၅ တန့်ဘာဝ (ပုတ္တဘာဝ) တွင် ဂြိုဟ် " + localizeDigits(String(occupants)) + " လုံး တည်ရှိနေပြီး ၅ တန့်သခင်နှင့် ဂြိုဟ် " + localizeDigits(String(lord5Conjunctions)) + " လုံး ပူးယှဉ်တည်ရှိနေပါသည်။ ဤအချက်သည် သားသမီးဆိုင်ရာ တာဝန်ဝတ္တရားများနှင့် အတွေ့အကြုံများ၏ အင်အားစုစည်းမှုကိုသာ ညွှန်ပြခြင်းဖြစ်ပြီး သားသမီးအရေအတွက်ကို တိကျသေချာစွာ တွက်ချက်ဖော်ပြခြင်း မဟုတ်ပါ။");

        if (findings.isEmpty()) return;
        appendReadingHeading(reading, en ? "Children-related Readings" : "သားသမီးဆိုင်ရာအဟောများ");
        appendReadingFindings(reading, findings);
    
}
function countPlanetsConjoiningOrAspectingSign(candidates,targetSign,planets) {

        var count = 0;
        for (let planet of candidates) {
            var sourceSign = zodiacSign(planets[planet]);
            if (sourceSign == targetSign || planetAspectsSign(planet, sourceSign, targetSign)) count++;
        }
        return count;
    
}
function isPlanetStrongForReading(planet,planets) {

        if (planet < 0 || planet >= 7) return false;
        var sign = zodiacSign(planets[planet]);
        return isOwnOrExalted(planet, sign) || isFriendlySign(planet, sign)
                || isMoolatrikona(planet, sign, normalize(planets[planet]) % 30.0);
    
}
function appendChildDashaWindows(findings,planets,asc,lord5,sign5,day,month,year,en) {

        var eligiblePlanet = Array(9).fill(false);
        eligiblePlanet[4] = true;
        eligiblePlanet[lord5] = true;
        for (var planet = 0; planet < 9; planet++) {
            var sourceSign = zodiacSign(planets[planet]);
            if (sourceSign == sign5 || planetAspectsSign(planet, sourceSign, sign5)) eligiblePlanet[planet] = true;
        }
        var mahaPeriods = buildMahaDashaPeriods(day, month, year, planets[1]);
        var now = Calendar.getInstance();
        var mahaWindows = [];
        var bhuktiWindows = [];
        for (var i = 0; i < mahaPeriods.length; i++) {
            var maha = mahaPeriods[i];
            var mahaPlanet = dashaLordToPlanetIndex(maha.lordIndex);
            if (eligiblePlanet[mahaPlanet] && maha.end.after(now)) {
                mahaWindows.add(displayLord(DASHA_LORDS[maha.lordIndex]) + " "
                        + formatCalendarDate(maha.start) + " - " + formatCalendarDate(maha.end));
            }
            if (i == 0 || maha.end.before(now)) continue;
            var subPeriods = buildSubPeriods(
                    maha.lordIndex, maha.start, maha.activeYears, maha.activeYears);
            for (let sub of subPeriods) {
                var subPlanet = dashaLordToPlanetIndex(sub.lordIndex);
                if (!eligiblePlanet[subPlanet] || sub.end.before(now)) continue;
                bhuktiWindows.add(displayLord(DASHA_LORDS[maha.lordIndex]) + " / "
                        + displayLord(DASHA_LORDS[sub.lordIndex]) + "  "
                        + formatCalendarDate(sub.start) + " - " + formatCalendarDate(sub.end));
                if (bhuktiWindows.length >= 6) break;
            }
            if (bhuktiWindows.length >= 6) break;
        }
        if (!mahaWindows.isEmpty()) findings.add(formatPeriodLines(
                en ? "Child-related Maha Dasa periods" : "သားသမီးဆိုင်ရာ မဟာဒသာကာလများ", mahaWindows));
        if (!bhuktiWindows.isEmpty()) findings.add(formatPeriodLines(
                en ? "Supporting Maha Dasa / Bhukti periods" : "အထောက်အကူပြု မဟာဒသာ/ဘုတ္တိဒသာကာလများ", bhuktiWindows));
    
}
function dashaLordToPlanetIndex(dashaLordIndex) {

        var mapping = [8, 5, 0, 1, 2, 7, 4, 6, 3];
        return mapping[floorMod(dashaLordIndex, mapping.length)];
    
}
function formatPeriodLines(title,periods) {

        var result = new StringBuilder(title).append(" -");
        for (let period of periods) result.append("\n   • ").append(period);
        return result.toString();
    
}
function buildDashaAnalysis(eligiblePlanets,moonLongitude,titleMm,titleEn,maxWindows) {

        if (readingBirthYear <= 0) return "";
        var en = input.english;
        var mahaPeriods = buildMahaDashaPeriods(
                readingBirthDay, readingBirthMonth, readingBirthYear, moonLongitude);
        var now = Calendar.getInstance();
        var windows = [];
        for (var i = 0; i < mahaPeriods.length && windows.length < maxWindows; i++) {
            var maha = mahaPeriods[i];
            if (maha.end.before(now)) continue;
            var mahaPlanet = dashaLordToPlanetIndex(maha.lordIndex);
            if (eligiblePlanets[mahaPlanet]) {
                windows.add(displayLord(DASHA_LORDS[maha.lordIndex]) + " "
                        + (en ? "Maha Dasa" : "မဟာဒသာ") + "  "
                        + formatCalendarDate(maha.start) + " - " + formatCalendarDate(maha.end));
            }
            if (i == 0) continue;
            var subPeriods = buildSubPeriods(
                    maha.lordIndex, maha.start, maha.activeYears, maha.activeYears);
            for (let sub of subPeriods) {
                if (windows.length >= maxWindows) break;
                if (sub.end.before(now)) continue;
                var subPlanet = dashaLordToPlanetIndex(sub.lordIndex);
                if (!eligiblePlanets[mahaPlanet] && !eligiblePlanets[subPlanet]) continue;
                windows.add(displayLord(DASHA_LORDS[maha.lordIndex]) + " / "
                        + displayLord(DASHA_LORDS[sub.lordIndex]) + "  "
                        + formatCalendarDate(sub.start) + " - " + formatCalendarDate(sub.end));
            }
        }
        return windows.isEmpty() ? "" : formatPeriodLines(en ? titleEn : titleMm, windows);
    
}
function addDashaFinding(findings,eligiblePlanets,moonLongitude,titleMm,titleEn) {

        var analysis = buildDashaAnalysis(eligiblePlanets, moonLongitude, titleMm, titleEn, 8);
        if (!analysis.isEmpty()) findings.add(analysis);
    
}
function appendMarriageReading(reading,planets,cusps,en) {

        var asc = zodiacSign(cusps[1]);
        var ascLord = signRuler(asc);
        var lord2 = signRuler((asc + 1) % 12);
        var lord5 = signRuler((asc + 4) % 12);
        var lord6 = signRuler((asc + 5) % 12);
        var lord7 = signRuler((asc + 6) % 12);
        var lord8 = signRuler((asc + 7) % 12);
        var lord12 = signRuler((asc + 11) % 12);
        var sign2 = (asc + 1) % 12;
        var sign4 = (asc + 3) % 12;
        var sign5 = (asc + 4) % 12;
        var sign7 = (asc + 6) % 12;
        var sign8 = (asc + 7) % 12;
        var sign9 = (asc + 8) % 12;
        var sign12 = (asc + 11) % 12;
        var lord7House = relativeHouse(zodiacSign(planets[lord7]), asc);
        var venusHouse = relativeHouse(zodiacSign(planets[5]), asc);
        var benefics = [1, 3, 4, 5];
        var malefics = [0, 2, 6, 7, 8];
        var findings = [];
        var fidelityFindings = [];

        var seventhAfflicted = anyPlanetConjoinsOrAspectsSign(malefics, sign7, planets);
        var seventhProtected = anyPlanetConjoinsOrAspectsSign(benefics, sign7, planets);
        var secondAfflicted = anyPlanetConjoinsOrAspectsSign(malefics, sign2, planets);
        var secondProtected = anyPlanetConjoinsOrAspectsSign(benefics, sign2, planets);
        var lord7Difficult = lord7House == 6 || lord7House == 8 || lord7House == 12;
        var venusDifficult = venusHouse == 6 || venusHouse == 8 || venusHouse == 12;
        if (!lord7Difficult && !venusDifficult && (!secondAfflicted || secondProtected)
                && (!seventhAfflicted || seventhProtected)) findings.add(en
                ? "The 7th lord and Venus avoid difficult houses, while the 2nd and 7th houses retain benefic support. This is a constructive foundation for companionship, household stability and mutual cooperation."
                : "၇ တန့်သခင်နှင့် သောကြာဂြိုဟ်တို့သည် ဒုဌာနဘာဝ (အဆိုးပေးအိမ်) များသို့ ကျရောက်ခြင်းမှ ကင်းလွတ်ပြီး ၂ တန့်နှင့် ၇ တန့်ဘာဝတို့တွင် သောဘဏဂြိုဟ် (အကောင်းပေးဂြိုဟ်) များ၏ အကူအညီ ပံ့ပိုးမှုရှိနေသဖြင့် အဖော်အဖက်အချင်းချင်း နားလည်မှုရှိခြင်း၊ အိမ်ထောင်စု တည်ငြိမ်ခြင်းနှင့် အပြန်အလှန် ပူးပေါင်းဆောင်ရွက်နိုင်ခြင်းတို့အတွက် ကောင်းမွန်သော အခြေခံအုတ်မြစ်များ ဇာတာတွင် တည်ရှိနေပါသည်။");
        var dusthanaInFifthOrNinth = false;
        for (let lord of [lord6, lord8, lord12]) {
            var sign = zodiacSign(planets[lord]);
            if (sign == sign5 || sign == sign9) dusthanaInFifthOrNinth = true;
        }
        var fifthOrNinthAfflicted = anyPlanetConjoinsOrAspectsSign(malefics, sign5, planets)
                || anyPlanetConjoinsOrAspectsSign(malefics, sign9, planets);
        if ((dusthanaInFifthOrNinth || fifthOrNinthAfflicted) && !seventhProtected) findings.add(en
                ? "The 5th or 9th house is connected with difficult-house lords or malefic influence. Romance, shared values or family expectations may complicate partnership, so compatibility should be assessed patiently."
                : "၅ တန့် သို့မဟုတ် ၉ တန့်ဘာဝသည် ဒုဌာနဘာဝသခင်များ သို့မဟုတ် ပါပဂြိုဟ် (အဆိုးပေးဂြိုဟ်) များ၏ လွှမ်းမိုးမှုနှင့် ဆက်စပ်နေသဖြင့် ချစ်ခြင်းမေတ္တာ၊ အချင်းချင်း တန်ဖိုးထားမှု သို့မဟုတ် မိသားစု၏ မျှော်လင့်ချက်များကြောင့် အိမ်ထောင်ရေးကိစ္စရပ်များ ရှုပ်ထွေးမှု ဖြစ်ပေါ်စေနိုင်ပါသည်။ ထို့ကြောင့် အချင်းချင်း ဇာတာလိုက်ဖက်မှုကို စိတ်ရှည်စွာဖြင့် သေချာစွာ သုံးသပ်သင့်ပါသည်။");

        if (zodiacSign(planets[0]) == sign7) findings.add(en
                ? "The Sun occupies the 7th house. A spouse may be strong-willed, proud or status-conscious, and commitment can mature after careful consideration rather than haste."
                : "တနင်္ဂနွေဂြိုဟ်သည် ၇ တန့်ဘာဝ (ပထနီဘာဝ) တွင် တည်ရှိနေသဖြင့် အိမ်ထောင်ဖက်သည် စိတ်ဓာတ်ခိုင်မာပြတ်သားပြီး ဂုဏ်သိက္ခာနှင့် ကိုယ်ပိုင်ရပ်တည်ချက်ကို အထူးအလေးထားတတ်သူ ဖြစ်ပါလိမ့်မည်။ အိမ်ထောင်ရေး ဆုံးဖြတ်ချက်များတွင် အလျင်စလိုပြုလုပ်ခြင်းထက် သေချာစွာ စဉ်းစားတွေးခေါ်ပြီးမှသာ ရင့်ကျက်တည်ငြိမ်သော ဘဝကို တည်ဆောက်နိုင်ပါလိမ့်မည်။");
        if (zodiacSign(planets[1]) == sign7) findings.add(en
                ? "The Moon occupies the 7th house, favouring a caring, responsive and home-oriented spouse, while emotional consistency remains important."
                : "တနင်္လာဂြိုဟ် (စန်း) သည် ၇ တန့်ဘာဝ (ပထနီဘာဝ) တွင် တည်ရှိနေသဖြင့် ကြင်နာဂရုစိုက်တတ်ခြင်း၊ အိမ်မှုကိစ္စနှင့် မိသားစုအပေါ် ခံစားချက်ချင်းစာနာမှုကို အလေးထားခြင်းရှိသော အိမ်ထောင်ဖက်မျိုး ရရှိနိုင်ပါသည်။ သို့သော်လည်း နှစ်ဦးနှစ်ဖက် စိတ်ခံစားမှု တည်ငြိမ်မှုကို အပြန်အလှန် ထိန်းသိမ်းရန် အရေးကြီးပါသည်။");
        if (zodiacSign(planets[2]) == sign7) findings.add(en
                ? "Mars occupies the 7th house, bringing passion, initiative and directness to partnership. Calm conflict resolution is essential to prevent repeated arguments or temporary distance."
                : "အင်္ဂါဂြိုဟ်သည် ၇ တန့်ဘာဝ (ပထနီဘာဝ) တွင် တည်ရှိနေသဖြင့် အိမ်ထောင်ရေးတွင် စိတ်အားထက်သန်မှု၊ တက်ကြွလှုပ်ရှားမှုနှင့် ပြတ်သားမှုတို့ ရှိနေတတ်ပါသည်။ ထပ်ခါတလဲလဲ အငြင်းပွားမှုများနှင့် ခေတ္တစိတ်ဝမ်းကွဲကွာခြင်းမျိုး မဖြစ်ပေါ်စေရန် ပြဿနာများကို အေးချမ်းတည်ငြိမ်စွာ ဖြေရှင်းရန် လိုအပ်ပါသည်။");
        if (zodiacSign(planets[3]) == sign7) findings.add(en
                ? (anyPlanetConjoinsOrAspectsPlanet(malefics, 3, planets)
                   ? "Mercury occupies the 7th house under malefic influence. Communication can become quick or reactive, so facts, promises and expectations should be stated clearly."
                   : "Mercury occupies the 7th house, favouring an intelligent, communicative and adaptable spouse and a relationship strengthened by discussion.")
                : (anyPlanetConjoinsOrAspectsPlanet(malefics, 3, planets)
                   ? "ဗုဒ္ဓဟူးဂြိုဟ်သည် ၇ တန့်ဘာဝတွင် တည်ရှိပြီး ပါပဂြိုဟ်များ၏ လွှမ်းမိုးမှုကို ခံရသဖြင့် ဆက်သွယ်ပြောဆိုရာတွင် စိတ်လိုက်မာန်ပါ လျင်မြန်စွာ တုံ့ပြန်တတ်ပါသည်။ ထို့ကြောင့် အချက်အလက်များ၊ ကတိကဝတ်များနှင့် မျှော်လင့်ချက်များကို ပွင့်လင်းရှင်းလင်းစွာ ပြောဆိုဆွေးနွေးသင့်ပါသည်။"
                   : "ဗုဒ္ဓဟူးဂြိုဟ်သည် ၇ တန့်ဘာဝ (ပထနီဘာဝ) တွင် တည်ရှိနေသဖြင့် အသိဉာဏ်ပညာရှိခြင်း၊ ဆက်သွယ်ပြောဆို ဆွေးနွေးမှု ကောင်းမွန်ခြင်းနှင့် လိုက်လျောညီထွေ နေထိုင်တတ်သောအိမ်ထောင်ဖက်မျိုး ရရှိနိုင်ကာ အပြန်အလှန် တိုင်ပင်ဆွေးနွေးမှုများဖြင့် ဆက်ဆံရေးကို ပိုမိုခိုင်မာစေပါလိမ့်မည်။"));
        if (zodiacSign(planets[4]) == sign7) findings.add(en
                ? "Jupiter occupies the 7th house, supporting a generous, principled and understanding spouse and constructive guidance within marriage."
                : "ကြာသပတေးဂြိုဟ်သည် ၇ တန့်ဘာဝ (ပထနီဘာဝ) တွင် တည်ရှိနေသဖြင့် သဘောထားကြီးခြင်း၊ ကိုယ်ပိုင်မူဝါဒစံနှုန်းရှိခြင်းနှင့် နားလည်ခွင့်လွှတ်ပေးတတ်သော အိမ်ထောင်ဖက်မျိုးကို ရရှိစေနိုင်ပြီး အိမ်ထောင်ရေးဘဝအတွင်း ကောင်းမွန်မှန်ကန်သော လမ်းညွှန်မှုများကို အားပေးကူညီပါလိမ့်မည်။");
        if (zodiacSign(planets[5]) == sign7) findings.add(en
                ? (seventhAfflicted
                   ? "Venus occupies the 7th house under malefic influence. Attraction is strong, but expectations around affection, pleasure and money need clear boundaries to preserve harmony."
                   : "Venus is well placed in the 7th house without notable malefic influence, strongly supporting affection, comfort, shared prosperity and marital happiness.")
                : (seventhAfflicted
                   ? "သောကြာဂြိုဟ်သည် ၇ တန့်ဘာဝ (ပထနီဘာဝ) တွင် တည်ရှိနေသော်လည်း ပါပဂြိုဟ် (အဆိုးပေးဂြိုဟ်) များ၏ လွှမ်းမိုးမှုကို ခံရသဖြင့် အပြန်အလှန် ဆွဲဆောင်မှု အထူးအားကောင်းနိုင်သော်လည်း ချစ်ခင်မြတ်နိုးမှု၊ အပျော်အပါးနှင့် ငွေကြေးဆိုင်ရာ မျှော်လင့်ချက် တွက်ချက်မှုများတွင် ရှင်းလင်းပြတ်သားသော စည်းမျက်နှာထားများ သတ်မှတ်ထားမှသာလျှင် အိမ်ထောင်ရေး သဟဇာတဖြစ်မှုကို ရေရှည်ထိန်းသိမ်းနိုင်ပါလိမ့်မည်။"
                   : "သောကြာဂြိုဟ်သည် ၇ တန့်ဘာဝ (ပထနီဘာဝ) တွင် ကောင်းမွန်စွာ တည်ရှိပြီး ထင်ရှားသော ပါပဂြိုဟ်လွှမ်းမိုးမှုများ ကင်းလွတ်နေသဖြင့် နှစ်ဦးနှစ်ဖက် ချစ်ခင်မြတ်နိုးမှု၊ သုခချမ်းသာ ခံစားရမှု၊ အတူတကွ စီးပွားလာဘ်လာဘ တိုးတက်မှုနှင့် အိမ်ထောင်ရေး သုခပြည့်ဝမှုကို အားကောင်းစွာ ပံ့ပိုးကူညီပါလိမ့်မည်။"));
        if (zodiacSign(planets[6]) == sign7) findings.add(en
                ? "Saturn occupies the 7th house, favouring a mature, responsible or differently situated spouse. Commitment may develop slowly and requires patience, duty and realistic expectations."
                : "စနေဂြိုဟ်သည် ၇ တန့်ဘာဝ (ပထနီဘာဝ) တွင် တည်ရှိနေသဖြင့် စိတ်ဓာတ်ရင့်ကျက်ခြင်း၊ တာဝန်ယူမှု တာဝန်ခံမှုရှိခြင်း သို့မဟုတ် အသက်အရွယ်/လူမှုအဆင့်အတန်း ကွာခြားမှုရှိသော အိမ်ထောင်ဖက်မျိုးကို ရရှိစေနိုင်ပါသည်။ အိမ်ထောင်ရေး ကတိကဝတ်နှင့် သံယောဇဉ်သည် တရွေ့ရွေ့ဖြင့် ဖြည်းဖြည်းချင်း ရင့်ကျက်တည်ငြိမ်လာတတ်ပြီး အပြန်အလှန် သည်းခံမှု၊ တာဝန်သိမှုနှင့် လက်တွေ့ကျသော မျှော်လင့်ချက်များ ထားရှိရန် လိုအပ်ပါလိမ့်မည်။");
        if (zodiacSign(planets[7]) == sign7 || zodiacSign(planets[8]) == sign7) findings.add(en
                ? "Rahu or Ketu occupies the 7th house, bringing an unconventional relationship path, unusual circumstances or major changes in expectations. Transparency and patient decision-making are important."
                : "ရာဟုဂြိုဟ် သို့မဟုတ် ကိတ်ဂြိုဟ်သည် ၇ တန့်ဘာဝ (ပထနီဘာဝ) တွင် တည်ရှိနေသဖြင့် သမားရိုးကျမဟုတ်သော အိမ်ထောင်ရေးလမ်းကြောင်းများ ကြုံတွေ့ရခြင်း၊ ထူးခြားဆန်းပြားသော အခြေအနေများနှင့် ဆုံစည်းရခြင်း သို့မဟုတ် မျှော်လင့်ချက်ဦးတည်ချက်များ အပြောင်းအလဲကြီးမားခြင်းတို့ ရှိတတ်ပါသည်။ ထို့ကြောင့် ပွင့်လင်းမြင်သာမှုရှိခြင်းနှင့် စိတ်ရှည်စွာဖြင့် ဆုံးဖြတ်ချက်ချခြင်းတို့ကို အထူးအလေးထားသင့်ပါသည်။");
        if (relativeHouse(zodiacSign(planets[6]), asc) == 2) findings.add(en
                ? "Saturn occupies the 2nd house, making family formation gradual and responsibility-heavy. Commitment benefits from financial planning and realistic agreements with both families."
                : "စနေဂြိုဟ်သည် ၂ တန့်ဘာဝ (ဓနဘာဝ) တွင် တည်ရှိနေသဖြင့် မိသားစုဘဝ တည်ထောင်မှုအပိုင်းသည် တဖြည်းဖြည်းချင်းသာ တိုးတက်ဖြစ်ထွန်းတတ်ပြီး တာဝန်ဝတ္တရားများ ပိုမိုလေးလံနိုင်ပါသည်။ အိမ်ထောင်ရေး ကတိကဝတ်များ ခိုင်မာစေရန်အတွက် စနစ်တကျ ငွေကြေးစီမံမှု ပြုလုပ်ခြင်းနှင့် နှစ်ဖက်မိသားစုအကြား လက်တွေ့ကျသော သဘောတူညီချက်များ ရှိထားခြင်းက များစွာအကျိုးပြုပါလိမ့်မည်။");
        if (zodiacSign(planets[1]) == sign7 && zodiacSign(planets[6]) == sign7) findings.add(en
                ? "The Moon and Saturn unite in the 7th house, combining emotional need with duty and restraint. Partnership can pass through periods of distance unless warmth and communication are maintained deliberately."
                : "တနင်္လာဂြိုဟ် (စန်း) နှင့် စနေဂြိုဟ်တို့ ၇ တန့်ဘာဝ (ပထနီဘာဝ) တွင် ပူးယှဉ်ကျရောက်နေသဖြင့် စိတ်ခံစားမှုဆိုင်ရာ လိုအပ်ချက်များနှင့် တာဝန်သိမှု/ထိန်းချုပ်မှု သဘောတရားများ ရောပြန်းနေပါသည်။ နှစ်ဦးနှစ်ဖက် နွေးထွေးမှုနှင့် ဆက်သွယ်ပြောဆို ဆွေးနွေးမှုများကို သတိရှိရှိဖြင့် အစဉ်တစိုက် ထိန်းသိမ်းခြင်းမရှိပါက အချို့သော ကာလအပိုင်းအခြားများတွင် စိတ်ဝမ်းကွဲကွာခြင်း သို့မဟုတ် အလှမ်းကွာဝေးခြင်းမျိုး ကြုံတွေ့ရတတ်ပါသည်။");
        var seventhDual = sign7 == 2 || sign7 == 5 || sign7 == 8 || sign7 == 11;
        if (seventhDual && zodiacSign(planets[5]) == sign7 && seventhAfflicted) findings.add(en
                ? "The 7th house is a dual sign with Venus under malefic influence. Expectations or relationship direction may change more than once, making clarity before commitment especially important."
                : "၇ တန့်ဘာဝ (ပထနီဘာဝ) သည် ဒွေးဒဟရာသီ (Dual Sign) ဖြစ်ပြီး သောကြာဂြိုဟ် တည်ရှိကာ ပါပဂြိုဟ်များ၏ လွှမ်းမိုးမှုကို ခံရသဖြင့် ဇာတာတွင် အိမ်ထောင်ရေးဆိုင်ရာ မျှော်လင့်ချက် သို့မဟုတ် ဆက်ဆံရေး၏ ဦးတည်ချက်များ တစ်ကြိမ်ထက်မက ပြောင်းလဲသွားတတ်ပါသည်။ ထို့ကြောင့် ရေရှည်ကတိကဝတ်မပြုမီ မိမိတို့၏ ရည်ရွယ်ချက်များကို ပြတ်သားရှင်းလင်းအောင် ပြုလုပ်ရန် အထူးပင် အရေးကြီးပါသည်။");
        if (planetsAssociated(lord5, lord7, planets) && !seventhProtected) findings.add(en
                ? "The 5th and 7th lords are strongly connected without sufficient benefic protection. Romance can strongly shape marriage decisions, so long-term compatibility should be weighed alongside attraction."
                : "၅ တန့်သခင်နှင့် ၇ တန့်သခင်တို့သည် ဇာတာတွင် အားကောင်းစွာ သမ္ဗန္ဓပြု (ဆက်စပ်) နေပြီး လုံလောက်သော သောဘဏဂြိုဟ် (အကောင်းပေးဂြိုဟ်) များ၏ အကာအကွယ် မရှိသဖြင့် ချစ်ခြင်းမေတ္တာ ခံစားချက်က အိမ်ထောင်ရေး ဆုံးဖြတ်ချက်အပေါ် ပြင်းပြင်းထန်ထန် လွှမ်းမိုးမှု ရှိနေပါလိမ့်မည်။ သို့ဖြစ်၍ ရုတ်တရက် ဆွဲဆောင်မှုအပြင် ရေရှည်လိုက်ဖက်ညီမှု ရှိမရှိကိုပါ မျှတစွာ တွက်ချက်ချင့်ချိန်သင့်ပါသည်။");

        if (zodiacSign(planets[ascLord]) == sign7 && seventhProtected) findings.add(en
                ? "The Ascendant lord occupies the 7th house under benefic influence, supporting a respected spouse, dignified family background and partnership that contributes to personal development."
                : "လဂ်သခင်သည် ၇ တန့်ဘာဝ (ပထနီဘာဝ) တွင် တည်ရှိပြီး သောဘဏဂြိုဟ် (အကောင်းပေးဂြိုဟ်) များ၏ အမြင်အယှဉ် လွှမ်းမိုးမှုကို ရရှိထားသဖြင့် လူမှုပတ်ဝန်းကျင်တွင် ဂုဏ်သရေရှိသောအိမ်ထောင်ဖက်၊ ကောင်းမွန်မြင့်မြတ်သော မိသားစုနောက်ခံ ရရှိခြင်းနှင့် မိမိ၏ ကိုယ်ပိုင်အရည်အချင်း ဘဝတိုးတက်မှုကို အထောက်အကူပြုမည့် ပူးပေါင်းလက်တွဲမှုကို အားပေးကူညီပါလိမ့်မည်။");
        if (lord7House == 2) findings.add(en
                ? "The 7th lord occupies the 2nd house, linking marriage with family growth, accumulated resources and improved financial stability after partnership."
                : "၇ တန့်သခင်သည် ၂ တန့်ဘာဝ (ဓနဘာဝ) တွင် တည်ရှိနေသဖြင့် အိမ်ထောင်ရေးနှင့် မိသားစုဘဝ တိုးပွားလာခြင်း၊ စုဆောင်းမိသော ရုပ်ဝတ္ထုပိုင်ဆိုင်မှုများ ပိုမိုများပြားလာခြင်းနှင့် အိမ်ထောင်ပြုပြီးနောက်ပိုင်း ငွေကြေးကဏ္ဍ ပိုမိုတည်ငြိမ် အားကောင်းလာခြင်းတို့ အပြန်အလှန် ဆက်စပ်ဖြစ်ထွန်းလာပါလိမ့်မည်။");

        var maleficBeforeSeventh = anyPlanetOccupiesSign(malefics, (sign7 + 11) % 12, planets);
        var maleficAfterSeventh = anyPlanetOccupiesSign(malefics, (sign7 + 1) % 12, planets);
        if (maleficBeforeSeventh && maleficAfterSeventh && !seventhProtected) findings.add(en
                ? "The 7th house is enclosed by malefics without clear benefic protection. Partnership can feel pressured by external duties or recurring conflict, making boundaries and mutual support essential."
                : "၇ တန့်ဘာဝ (ပထနီဘာဝ) သည် ဝဲယာညှပ်လျက် ပါပကတ္တရီယုဂ် (ပါပဂြိုဟ်များညှပ်ခြင်း) ဖြစ်ပေါ်နေပြီး ဇာတာတွင် သောဘဏဂြိုဟ် (အကောင်းပေးဂြိုဟ်) များ၏ အကာအကွယ် မထင်ရှားသဖြင့် ပြင်ပတာဝန်ဝတ္တရား ဖိအားများပြားခြင်း သို့မဟုတ် ထပ်တလဲလဲ အငြင်းပွားမှုများကြောင့် အိမ်ထောင်ရေးတွင် စိတ်အနှောင့်အယှက် ဖြစ်ရတတ်ပါသည်။ ထို့ကြောင့် ကိုယ်ပိုင်စည်းမျက်နှာထားများနှင့် အပြန်အလှန် ဖေးမကူညီမှုများကို အထူးဂရုပြု ထားရှိသင့်ပါသည်။");
        if (zodiacSign(planets[0]) == sign7 && zodiacSign(planets[7]) == sign7) findings.add(en
                ? "The Sun and Rahu unite in the 7th house. Relationship choices, social image and shared spending require careful judgement to avoid financial drain or unrealistic expectations."
                : "တနင်္ဂနွေဂြိုဟ်နှင့် ရာဟုဂြိုဟ်တို့ ၇ တန့်ဘာဝ (ပထနီဘာဝ) တွင် ပူးယှဉ်ကျရောက်နေသဖြင့် အိမ်ထောင်ဖက်ရွေးချယ်မှု၊ လူမှုဂုဏ်သိက္ခာနှင့် အိမ်ထောင်ရေးပူးတွဲအသုံးစရိတ် ကိစ္စရပ်များကို သေချာစွာ တွက်ချက်ချင့်ချိန် ဆုံးဖြတ်မှသာလျှင် ငွေကြေးမလိုအပ်ဘဲ ယိုစီးမှုနှင့် မဖြစ်နိုင်သော မျှော်လင့်ချက်လွန်ကဲမှုများကို ရှောင်ရှားနိုင်ပါလိမ့်မည်။");
        var relationshipStressCount = 0;
        for (let malefic of malefics) {
            var source = zodiacSign(planets[malefic]);
            if (source == sign7 || planetAspectsSign(malefic, source, sign7)) relationshipStressCount++;
        }
        if (relationshipStressCount >= 3 && !seventhProtected) findings.add(en
                ? "Three or more malefic influences reach the 7th house without benefic protection. Relationships require deliberate communication, realistic expectations and careful conflict management."
                : "၇ တန့်ဘာဝ (ပထနီဘာဝ) အပေါ် ပါပဂြိုဟ် (အဆိုးပေးဂြိုဟ်) သုံးလုံးနှင့်အထက် ပြင်းထန်စွာ လွှမ်းမိုးနေပြီး သောဘဏဂြိုဟ်များ၏ အကာအကွယ်မရှိသဖြင့် အိမ်ထောင်ရေးတွင် ပွင့်လင်းရှင်းလင်းသော ဆက်သွယ်ပြောဆိုမှုရှိရန်၊ လက်တွေ့ကျသော မျှော်လင့်ချက်များ ထားရှိရန်နှင့် သတိပြုစရာ အငြင်းပွားမှုပြဿနာများကို စနစ်တကျ စီမံဖြေရှင်းရန် အထူးလိုအပ်ပါလိမ့်မည်။");
        if (anyPlanetOccupiesSign(malefics, sign4, planets)
                && anyPlanetOccupiesSign(malefics, sign7, planets)
                && anyPlanetOccupiesSign(malefics, sign12, planets)) findings.add(en
                ? "Malefics occupy the 4th, 7th and 12th houses, showing tension between home, partnership and private needs. Protecting personal space while maintaining shared responsibility is important."
                : "၄ တန့် (ဗန္ဓုဘာဝ)၊ ၇ တန့် (ပထနီဘာဝ) နှင့် ၁၂ တန့် (ဗျယဘာဝ) တို့တွင် ပါပဂြိုဟ် (အဆိုးပေးဂြိုဟ်) များ အသီးသီး ကျရောက်တည်ရှိနေသဖြင့် နေအိမ်တွင်းဘဝ၊ အိမ်ထောင်ရေးသုခနှင့် မိမိ၏ကိုယ်ပိုင် လိုအပ်ချက်များအကြား တင်းမာမှုများ ဖြစ်ပေါ်စေနိုင်ပါသည်။ မိမိ၏ ကိုယ်ပိုင်လွတ်လပ်ခွင့် ဧရိယာကို ထိန်းသိမ်းရင်း ပူးတွဲတာဝန်ဝတ္တရားများကိုလည်း မျှတစွာ ယူရတတ်ပါသည်။");

        var marsMercuryJupiter = zodiacSign(planets[2]) == zodiacSign(planets[3])
                && zodiacSign(planets[3]) == zodiacSign(planets[4]);
        var marsJupiterVenus = zodiacSign(planets[2]) == zodiacSign(planets[4])
                && zodiacSign(planets[4]) == zodiacSign(planets[5]);
        if (marsMercuryJupiter) findings.add(en
                ? "Mars, Mercury and Jupiter are conjunct, favouring partnership with someone of comparable age, pace or intellectual development."
                : "အင်္ဂါဂြိုဟ်၊ ဗုဒ္ဓဟူးဂြိုဟ်နှင့် ကြာသပတေးဂြိုဟ်တို့ ပူးယှဉ်ကျရောက်နေသဖြင့် မိမိနှင့် အသက်အရွယ်၊ လုပ်ဆောင်ချက် လှုပ်ရှားမှု သို့မဟုတ် ဉာဏ်ရည်ဉာဏ်သွေး ဖွံ့ဖြိုးမှု တူညီမျှတသူမျိုးနှင့် အိမ်ထောင်ဖက် တွေ့ဆုံဖန်တီးနိုင်မည့် အခွင့်အလမ်း ရှိပါသည်။");
        if (marsJupiterVenus) findings.add(en
                ? "Mars, Jupiter and Venus are conjunct, favouring attraction toward a mature, experienced or older partner."
                : "အင်္ဂါဂြိုဟ်၊ ကြာသပတေးဂြိုဟ်နှင့် သောကြာဂြိုဟ်တို့ ပူးယှဉ်ကျရောက်နေသဖြင့် စိတ်ဓာတ်ရင့်ကျက်သူ၊ ဘဝအတွေ့အကြုံ များပြားသူ သို့မဟုတ် မိမိထက် အသက်အရွယ် ကြီးရင့်သူမျိုးကို ပိုမိုစိတ်ဝင်စားကာ အိမ်ထောင်ဖက်အဖြစ် ရွေးချယ်တတ်ပါသည်။");

        var lordDistance = Math.abs(normalize(planets[ascLord]) - normalize(planets[lord7]));
        lordDistance = Math.min(lordDistance, 360.0 - lordDistance);
        if (lordDistance <= 10.0) findings.add(en
                ? "The Ascendant lord and 7th lord are closely placed within 10 degrees. Partnership opportunities can arise comparatively early or develop quickly when circumstances permit."
                : "လဂ်သခင်နှင့် ၇ တန့်သခင် (ပထနီသခင်) တို့သည် ၁၀ အံသာအတွင်း နီးကပ်စွာ တည်ရှိနေသဖြင့် ဘဝအခြေအနေ သင့်တော်ကောင်းမွန်ပါက အိမ်ထောင်ရေး အခွင့်အလမ်းများ စောစီးစွာ ပေါ်ပေါက်လာခြင်း သို့မဟုတ် ဆက်ဆံရေး လျင်မြန်ချောမွေ့စွာ တိုးတက်ဖြစ်ထွန်းခြင်းမျိုး ရှိတတ်ပါသည်။");
        var allBeneficsInMarriageHouses = true;
        for (let benefic of benefics) {
            var sign = zodiacSign(planets[benefic]);
            if (sign != asc && sign != sign2 && sign != sign7) {
                allBeneficsInMarriageHouses = false;
                break;
            }
        }
        if (allBeneficsInMarriageHouses) findings.add(en
                ? "All principal benefics occupy the Ascendant, 2nd or 7th houses, supporting comparatively early commitment and strong family participation in partnership."
                : "အဓိက သောဘဏဂြိုဟ် (အကောင်းပေးဂြိုဟ်) အားလုံးသည် လဂ်၊ ၂ တန့်ဘာဝ (ဓနဘာဝ) သို့မဟုတ် ၇ တန့်ဘာဝ (ပထနီဘာဝ) တို့တွင် တည်ရှိနေသဖြင့် အိမ်ထောင်ရေး ကတိကဝတ်များ စောစီးစွာ ဖြစ်ပေါ်လာနိုင်ခြင်းနှင့် မိသားစုဝင်များ၏ ဝိုင်းဝန်းပါဝင် ကူညီပံ့ပိုးမှုများကို ရရှိစေနိုင်ပါသည်။");
        var venusExtreme = isExaltedSign(5, zodiacSign(planets[5]))
                || isDebilitatedSign(5, zodiacSign(planets[5]));
        var jupiterProtectsSeventh = zodiacSign(planets[4]) == sign7
                || planetAspectsSign(4, zodiacSign(planets[4]), sign7);
        var jupiterProtectsVenus = zodiacSign(planets[4]) == zodiacSign(planets[5])
                || planetAspectsSign(4, zodiacSign(planets[4]), zodiacSign(planets[5]));
        if ((venusDifficult || venusExtreme) && !jupiterProtectsVenus && !jupiterProtectsSeventh) {
            fidelityFindings.add(en
                    ? "Venus is placed in a difficult house or at an extreme sign dignity without clear protection from Jupiter. Attraction and emotional expectations can become unusually strong, so transparency, boundaries and deliberate commitment are important for relationship stability. This indicates a tendency to manage, not proof of unfaithfulness."
                    : "ဇာတာတွင် သောကြာဂြိုဟ်သည် ဒုဌာနဘာဝ (အဆိုးပေးအိမ်) ၌ တည်ရှိခြင်း သို့မဟုတ် ဥစ်/နိစ် ဖြစ်ကာ အင်အားလွန်ကဲခြင်းရှိပြီး ကြာသပတေးဂြိုဟ်၏ ကာကွယ်အမြင် သက်ရောက်မှု မထင်ရှားသဖြင့် အပြန်အလှန် ဆွဲဆောင်မှုနှင့် စိတ်ခံစားလိုမှု မျှော်လင့်ချက်များ အားကောင်းလွန်းနေတတ်ပါသည်။ အိမ်ထောင်ရေး ရေရှည်တည်ငြိမ်စေရန် ပွင့်လင်းမြင်သာစွာ ဆွေးနွေးပြောဆိုခြင်း၊ ကိုယ်ပိုင်စည်းမျက်နှာထား ရှင်းလင်းခြင်းနှင့် ကတိကဝတ်ကို သတိရှိရှိဖြင့် ထိန်းသိမ်းရန် အထူးလိုအပ်ပါလိမ့်မည်။ ဤအနေအထားသည် သွေဖည်ဖောက်ပြန်မည်ဟု အတည်ပြုဖော်ပြခြင်း မဟုတ်ဘဲ သတိပြုထိန်းညှိရမည့် စိတ်နေစိတ်ထား သဘာဝတစ်ရပ်ကိုသာ ညွှန်ပြခြင်း ဖြစ်ပါသည်။");
        }
        var seventhRuledByMarsOrSaturn = lord7 == 2 || lord7 == 6;
        var seventhLordWithNodes = zodiacSign(planets[lord7]) == zodiacSign(planets[7])
                || zodiacSign(planets[lord7]) == zodiacSign(planets[8]);
        if (seventhRuledByMarsOrSaturn && zodiacSign(planets[5]) == sign7
                && seventhLordWithNodes && !jupiterProtectsSeventh) {
            fidelityFindings.add(en
                    ? "The 7th house is ruled by Mars or Saturn, Venus occupies it, and its lord joins Rahu or Ketu without Jupiter's protection. Intense attraction, secrecy or unconventional relationship pressures can arise. Clear agreements and avoidance of impulsive choices are especially important."
                    : "၇ တန့်ဘာဝ (ပထနီဘာဝ) သည် အင်္ဂါဂြိုဟ် သို့မဟုတ် စနေဂြိုဟ် စိုးမိုးသော ရာသီဖြစ်ပြီး သောကြာဂြိုဟ်က ၇ တန့်ဘာဝတွင် တည်ရှိနေကာ ၇ တန့်သခင် (ပထနီသခင်) သည် ရာဟုဂြိုဟ် သို့မဟုတ် ကိတ်ဂြိုဟ်နှင့် ပူးယှဉ်ကျရောက်နေပါသည်။ ထို့ပြင် ကြာသပတေးဂြိုဟ်၏ ကာကွယ်အမြင် သက်ရောက်မှုလည်း မရှိသဖြင့် ဇာတာတွင် ဆွဲဆောင်မှု အထူးပြင်းပြခြင်း၊ လျှို့ဝှက်သော ဆက်ဆံရေးမျိုးကို လိုလားခြင်း သို့မဟုတ် သမားရိုးကျမဟုတ်သော ဆက်ဆံရေးဖိအားများ ပေါ်ပေါက်လာတတ်ပါသည်။ အလျင်စလို ဆုံးဖြတ်ချက်ချခြင်းများကို တတ်နိုင်သမျှ ရှောင်ရှားပြီး နှစ်ဦးသဘောတူ ရှင်းလင်းပြတ်သားသော စည်းမျက်နှာထားများကို သတ်မှတ်ထားရန် အထူးပင် အရေးကြီးပါသည်။");
        }

        var moonMarsExchange = zodiacSign(planets[2]) == 3
                && (zodiacSign(planets[1]) == 0 || zodiacSign(planets[1]) == 7);
        var ninthAfflicted = anyPlanetConjoinsOrAspectsSign(malefics, sign9, planets);
        var ninthProtected = anyPlanetConjoinsOrAspectsSign(benefics, sign9, planets);
        if (moonMarsExchange && ninthAfflicted && !ninthProtected) {
            fidelityFindings.add(en
                    ? "Mars occupies Cancer while the Moon occupies Aries or Scorpio, creating a sign exchange, and the 9th house lacks clear benefic protection. Emotional reactions and attraction can become entangled, increasing the risk of complicated relationships. Slower decisions and firm ethical boundaries help stabilise this pattern."
                    : "အင်္ဂါဂြိုဟ်သည် ကရကဋ်ရာသီတွင် တည်ရှိပြီး တနင်္လာဂြိုဟ် (စန်း) သည် မိဿရာသီ သို့မဟုတ် ဗြိစ္ဆာရာသီတွင် တည်ရှိသဖြင့် စန်းနှင့် အင်္ဂါဂြိုဟ်တို့ အပြန်အလှန် အိမ်ဖလှယ်ခြင်း (ပရိဝတ္တနယုဂ်) ဖြစ်ပေါ်နေပါသည်။ ထို့ပြင် ၉ တန့်ဘာဝ (ဓမ္မဘာဝ) အပေါ် ပါပဂြိုဟ် (အဆိုးပေးဂြိုဟ်) များ၏ လွှမ်းမိုးမှုရှိနေပြီး သောဘဏဂြိုဟ် (အကောင်းပေးဂြိုဟ်) များ၏ အကာအကွယ် မထင်ရှားသဖြင့် စိတ်ခံစားမှုနှင့် ဆွဲဆောင်မှုများ ရောထွေးကာ ဆက်ဆံရေး ရှုပ်ထွေးမှုများ ဖြစ်ပွားနိုင်ခြေ ရှိတတ်ပါသည်။ ဆုံးဖြတ်ချက်များကို အချိန်ယူ စဉ်းစားခြင်းနှင့် ကိုယ်ကျင့်တရားဆိုင်ရာ စည်းမျက်နှာထားများကို ခိုင်မာစွာ ထားရှိခြင်းက ဤအနေအထားကို ကောင်းမွန်စွာ ထိန်းညှိတည်ငြိမ်စေပါလိမ့်မည်။");
        }

        var marriageDashaPlanets = Array(9).fill(false);
        marriageDashaPlanets[1] = true;
        marriageDashaPlanets[5] = true;
        marriageDashaPlanets[lord7] = true;
        marriageDashaPlanets[ascLord] = true;
        for (var planet = 0; planet < 9; planet++) {
            var sourceSign = zodiacSign(planets[planet]);
            if (sourceSign == sign7 || planetAspectsSign(planet, sourceSign, sign7)) {
                marriageDashaPlanets[planet] = true;
            }
        }

        if (findings.isEmpty() && fidelityFindings.isEmpty()) return;
        if (!findings.isEmpty()) {
            appendReadingHeading(reading, en ? "Marriage-related Readings" : "အိမ်ထောင်ရေးဆိုင်ရာအဟောများ");
            appendReadingFindings(reading, findings);
        }
        if (!fidelityFindings.isEmpty()) {
            var fidelityDashaPlanets = Array(9).fill(false);
            fidelityDashaPlanets[1] = true;
            fidelityDashaPlanets[2] = true;
            fidelityDashaPlanets[5] = true;
            fidelityDashaPlanets[7] = true;
            fidelityDashaPlanets[8] = true;
            fidelityDashaPlanets[lord7] = true;
            appendReadingHeading(reading, en ? "Relationship Fidelity" : "အိမ်ထောင်ရေးဖောက်ပြန်ခြင်း");
            appendReadingFindings(reading, fidelityFindings);
        }
    
}
function appendEducationReading(reading,planets,cusps,en) {

        var asc = zodiacSign(cusps[1]);
        var lord2 = signRuler((asc + 1) % 12);
        var lord3 = signRuler((asc + 2) % 12);
        var lord4 = signRuler((asc + 3) % 12);
        var lord5 = signRuler((asc + 4) % 12);
        var lord6 = signRuler((asc + 5) % 12);
        var lord9 = signRuler((asc + 8) % 12);
        var lord11 = signRuler((asc + 10) % 12);
        var sign2 = (asc + 1) % 12;
        var sign4 = (asc + 3) % 12;
        var sign5 = (asc + 4) % 12;
        var findings = [];

        var fourthAfflicted = anyPlanetOccupiesSign([0, 2, 6, 7, 8], sign4, planets);
        var fourthProtected = anyPlanetConjoinsOrAspectsSign([1, 3, 4, 5], sign4, planets);
        if (fourthAfflicted && !fourthProtected) findings.add(en
                ? "The 4th house receives concentrated malefic influence without clear benefic support. Education may involve interruptions or changes of environment, so consistent study routines and dependable guidance are important."
                : "၄ တန့်ဘာဝ (ဗန္ဓုဘာဝ) တွင် ပါပဂြိုဟ် (အဆိုးပေးဂြိုဟ်) များ၏ လွှမ်းမိုးမှု စုပြုံကျရောက်နေပြီး သောဘဏဂြိုဟ် (အကောင်းပေးဂြိုဟ်) များ၏ အကာအကွယ် မထင်ရှားသဖြင့် ပညာရေးလမ်းကြောင်းတွင် အခက်အခဲ အနှောင့်အယှက်များ ကြုံတွေ့ရခြင်း သို့မဟုတ် သင်ကြားမှုပတ်ဝန်းကျင် အပြောင်းအလဲဖြစ်ခြင်းတို့ ရှိတတ်ပါသည်။ ထို့ကြောင့် ပုံမှန်စနစ်တကျ လေ့လာသည့် အစီအစဉ်ရှိရန်နှင့် ယုံကြည်စိတ်ချရသော ဆရာသမား၏ လမ်းညွှန်ပြသမှုကို ရယူရန် အထူးပင် လိုအပ်ပါလိမ့်မည်။");
        var educationObstructed = planetsAssociated(lord3, lord4, planets)
                || planetsAssociated(lord6, lord4, planets)
                || planetsAssociated(lord11, lord4, planets)
                || planetsAssociated(lord3, 4, planets)
                || planetsAssociated(lord6, 4, planets)
                || planetsAssociated(lord11, 4, planets);
        if (educationObstructed && !fourthProtected) findings.add(en
                ? "The 4th lord or Jupiter is connected with the 3rd, 6th or 11th lord without sufficient benefic protection. Competing interests, examinations, work duties or changing goals can interrupt formal study; a focused timetable improves continuity."
                : "၄ တန့်သခင် သို့မဟုတ် ကြာသပတေးဂြိုဟ်သည် ၃ တန့်သခင်၊ ၆ တန့်သခင် သို့မဟုတ် ၁၁ တန့်သခင်တစ်ပါးပါးနှင့် ဇာတာတွင် သမ္ဗန္ဓပြု (ဆက်စပ်) နေပြီး လုံလောက်သော သောဘဏဂြိုဟ် (အကောင်းပေးဂြိုဟ်) များ၏ အကာအကွယ် မရှိသဖြင့် စိတ်ဝင်စားမှုနယ်ပယ် များပြားလွန်းခြင်း၊ စာမေးပွဲဆိုင်ရာ ဖိအားများရှိခြင်း၊ အလုပ်တာဝန်ဝတ္တရားများနှင့် ရည်မှန်းချက် အပြောင်းအလဲဖြစ်ခြင်းတို့ကြောင့် ပုံမှန်ပညာသင်ယူမှုကို နှောင့်ယှက်တားဆီးတတ်ပါသည်။ သင်ကြားမှု အချိန်ဇယားကို တိကျပြတ်သားစွာ သတ်မှတ်ထားခြင်းက ပညာရပ်များကို စဉ်ဆက်မပြတ် ဆက်လက်သင်ယူနိုင်မှုကို များစွာကောင်းမွန်စေပါလိမ့်မည်။");
        if (planetsAssociated(lord4, lord5, planets) && planetsAssociated(lord5, lord9, planets)) findings.add(en
                ? "The 4th, 5th and 9th lords are connected, combining thought, intelligence and higher learning. This supports scholarship, broad judgement and the potential to develop specialised expertise."
                : "၄ တန့်သခင် (ဗန္ဓုသခင်)၊ ၅ တန့်သခင် (ပုတြသခင်) နှင့် ၉ တန့်သခင် (ဓမ္မသခင်) တို့ အချင်းချင်း အားကောင်းစွာ သမ္ဗန္ဓပြုနေသဖြင့် စဉ်းစားဆင်ခြင်ဉာဏ်၊ ထက်မြက်သော အသိဉာဏ်နှင့် အဆင့်မြင့် အထက်တန်းပညာရပ်တို့ ပေါင်းစပ်ဖြစ်ထွန်းစေပါသည်။ ဤအနေအထားသည် နှံ့စပ်သော ပညာရှင်တစ်ဦး ဖြစ်လာနိုင်မှု၊ ကျယ်ပြန့်သော အတွေးအခေါ် အမြော်အမြင်ရှိမှုနှင့် အထူးပြုပညာရပ်ကဏ္ဍတစ်ခုတွင် ထူးချွန်ကျွမ်းကျင်နိုင်မည့် အလားအလာများကို များစွာအားပေးပံ့ပိုးပါလိမ့်မည်။");

        var pair45 = planetsAssociated(lord4, lord5, planets)
                && (planetConjoinsOrAspects(4, lord4, planets) || planetConjoinsOrAspects(4, lord5, planets));
        var pair59 = planetsAssociated(lord5, lord9, planets)
                && (planetConjoinsOrAspects(4, lord5, planets) || planetConjoinsOrAspects(4, lord9, planets));
        var pair94 = planetsAssociated(lord9, lord4, planets)
                && (planetConjoinsOrAspects(4, lord9, planets) || planetConjoinsOrAspects(4, lord4, planets));
        var educationLordsOwnHouses = zodiacSign(planets[lord4]) == sign4
                && zodiacSign(planets[lord5]) == sign5
                && zodiacSign(planets[lord9]) == (asc + 8) % 12;
        var jupiterTouchesEducationLords = planetConjoinsOrAspects(4, lord4, planets)
                || planetConjoinsOrAspects(4, lord5, planets)
                || planetConjoinsOrAspects(4, lord9, planets);
        var jupiterTouchesEducationHouses = zodiacSign(planets[4]) == sign4
                || zodiacSign(planets[4]) == sign5
                || zodiacSign(planets[4]) == (asc + 8) % 12
                || planetAspectsSign(4, zodiacSign(planets[4]), sign4)
                || planetAspectsSign(4, zodiacSign(planets[4]), sign5)
                || planetAspectsSign(4, zodiacSign(planets[4]), (asc + 8) % 12);
        var degreeJupiterStrong = isOwnOrExalted(4, zodiacSign(planets[4]))
                || isFriendlySign(4, zodiacSign(planets[4]))
                || isMoolatrikona(4, zodiacSign(planets[4]), normalize(planets[4]) % 30.0);
        var nonLordMaleficInFourth = false;
        for (let malefic of [0, 2, 6, 7, 8]) {
            if (malefic != lord4 && zodiacSign(planets[malefic]) == sign4) {
                nonLordMaleficInFourth = true;
                break;
            }
        }
        var degreeCombination = pair45 || pair59 || pair94
                || (educationLordsOwnHouses && jupiterTouchesEducationLords)
                || (degreeJupiterStrong && (jupiterTouchesEducationLords || jupiterTouchesEducationHouses));
        if (degreeCombination) {
            findings.add(en
                    ? (nonLordMaleficInFourth
                       ? "The education lords and Jupiter form a combination supportive of formal qualifications. A non-ruling malefic in the 4th house can bring interruption or delay, but focused effort still supports completion or notable mastery in a specialised subject."
                       : "The 4th, 5th or 9th lords connect under Jupiter's influence, with no unrelated malefic occupying the 4th house. This is a strong indication for completing a formal arts, science or professional degree; even without a conventional degree, it supports recognised expertise in a chosen field.")
                    : (nonLordMaleficInFourth
                       ? "ပညာရေးဆိုင်ရာ ဘာဝသခင်များနှင့် ကြာသပတေးဂြိုဟ်တို့ ပူးပေါင်းနေသဖြင့် ဘွဲ့ဒီဂရီရရှိရန် အခွင့်အလမ်း ကောင်းမွန်ပါသည်။ သို့သော် ၄ တန့်ဘာဝသခင်မဟုတ်သည့် ပါပဂြိုဟ်တစ်လုံး ၄ တန့်တွင် တည်ရှိနေသောကြောင့် ပညာရေးတွင် အနှောင့်အယှက် သို့မဟုတ် လမ်းကြောင်းပြောင်းလဲမှု တချို့ ကြုံရနိုင်ပါသည်။ သို့သော်လည်း စိတ်စိုက်ကြိုးပမ်းမည်ဆိုပါက ဘွဲ့ရသည်အထိ ပြီးမြောက်နိုင်ပြီး အထူးပြုဘာသာရပ်တစ်ခုတွင် ထူးချွန်ထက်မြက်သူ ဖြစ်လာပါလိမ့်မည်။"
                       : "၄ တန့်၊ ၅ တန့် သို့မဟုတ် ၉ တန့်ဘာဝသခင်များသည် ကြာသပတေးဂြိုဟ်၏ လွှမ်းမိုးမှုအောက်တွင် ဆက်သွယ်မှုရှိနေပြီး ၄ တန့်ဘာဝ၌ အခြားပါပဂြိုဟ်များ နှောင့်ယှက်ခြင်းမရှိပါ။ ထို့ကြောင့် ဝိဇ္ဇာ၊ သိပ္ပံ သို့မဟုတ် အသက်မွေးဝမ်းကျောင်းဆိုင်ရာ ဘွဲ့တစ်ခုခုကို အောင်မြင်စွာ ပြီးမြောက်နိုင်မည့် အားကောင်းသော အနေအထား ဖြစ်ပါသည်။ ပုံမှန်ဘွဲ့လမ်းကြောင်းအတိုင်း မသွားဖြစ်ခဲ့လျှင်ပင် မိမိရွေးချယ်ထားသော နယ်ပယ်တွင် အများကအသိအမှတ်ပြုရသည့် ကျွမ်းကျင်ပညာရှင်တစ်ဦး ဖြစ်လာနိုင်ပါသည်။"));
        }

        var mercuryHouse = relativeHouse(zodiacSign(planets[3]), asc);
        var jupiterHouse = relativeHouse(zodiacSign(planets[4]), asc);
        var venusHouse = relativeHouse(zodiacSign(planets[5]), asc);
        var studyHouseMercury = isEducationSupportHouse(mercuryHouse);
        var studyHouseJupiter = isEducationSupportHouse(jupiterHouse);
        var studyHouseVenus = isEducationSupportHouse(venusHouse);
        var jupiterStrong = isOwnOrExalted(4, zodiacSign(planets[4]))
                || isFriendlySign(4, zodiacSign(planets[4]))
                || isMoolatrikona(4, zodiacSign(planets[4]), normalize(planets[4]) % 30.0);
        if (studyHouseMercury && studyHouseJupiter && studyHouseVenus && jupiterStrong) findings.add(en
                ? "Mercury, Jupiter and Venus occupy education-supporting houses while Jupiter is strong. Literary learning, refined judgement, teaching ability and recognition through knowledge are strongly supported."
                : "ဗုဒ္ဓဟူး၊ ကြာသပတေးနှင့် သောကြာဂြိုဟ်တို့သည် ပညာရေးကို အကျိုးပြုသည့် ဘာဝများတွင် တည်ရှိနေပြီး ကြာသပတေးဂြိုဟ်မှာလည်း အင်အားတောင့်တင်းနေပါသည်။ ထို့ကြောင့် စာပေကျမ်းဂန်လေ့လာမှု၊ မှန်ကန်သော ဆင်ခြင်တုံတရား၊ သူတစ်ပါးကို ပြန်လည်သင်ကြားပြသနိုင်စွမ်းနှင့် မိမိ၏ပညာအရည်အချင်းကြောင့် လူသိများကျော်ကြားခြင်းတို့ကို အထူးပင် အားပေးတိုးတက်စေပါလိမ့်မည်။");
        if (isKendraHouse(jupiterHouse) && isKendraHouse(venusHouse)) {
            var mercurySupports = planetConjoinsOrAspects(3, 4, planets)
                    || planetConjoinsOrAspects(3, 5, planets);
            findings.add(mercurySupports
                    ? (en ? "Jupiter and Venus occupy angular houses under Mercury's influence, supporting deep analysis, broad comprehension and mastery across several subjects."
                       : "ကြာသပတေးနှင့် သောကြာဂြိုဟ်တို့ ကိန်းအိမ် (အဓိကကျသော ဘာဝများ) တွင် တည်ရှိပြီး ဗုဒ္ဓဟူးဂြိုဟ်၏ လွှမ်းမိုးမှုကို ရရှိထားပါသည်။ ထို့ကြောင့် အရာရာကို နက်နက်နဲနဲ တွေးခေါ်သုံးသပ်နိုင်ခြင်း၊ ကျယ်ကျယ်ပြန့်ပြန့် နားလည်သဘောပေါက်ခြင်းနှင့် ပညာရပ်မျိုးစုံကို စွယ်စုံကျွမ်းကျင်နိုင်ခြင်း စသည့် ထူးခြားသော အကျိုးကျေးဇူးများကို ရရှိစေပါလိမ့်မည်။")
                    : (en ? "Jupiter and Venus occupy angular houses, supporting broad learning, sound understanding and refinement in education."
                       : "ကြာသပတေးနှင့် သောကြာဂြိုဟ်တို့ ကိန်းအိမ် (အဓိကကျသော ဘာဝများ) တွင် တည်ရှိနေသဖြင့် ပညာရပ်များကို ဗဟုသုတအဖြစ် ကျယ်ကျယ်ပြန့်ပြန့် သင်ယူနိုင်ခြင်း၊ အမြင်ကျယ်ပြီး နားလည်သဘောပေါက်မှု အားကောင်းခြင်းနှင့် ပညာရေးလမ်းကြောင်းတွင် သေသပ်ချောမွေ့ခြင်းတို့ကို ရရှိစေနိုင်ပါသည်။"));
        }
        if (jupiterHouse == 4 || jupiterHouse == 10) findings.add(en
                ? "Jupiter occupies the 4th or 10th house, favouring legal studies, ethics, administration, counselling and subjects requiring principled judgement."
                : "ကြာသပတေးဂြိုဟ်သည် ၄ တန့် သို့မဟုတ် ၁၀ တန့်ဘာဝတွင် တည်ရှိနေသဖြင့် ဥပဒေပညာ၊ ကျင့်ဝတ်ဆိုင်ရာဘာသာရပ်များ၊ အုပ်ချုပ်ရေး၊ အကြံပေးလမ်းညွှန်မှုပညာနှင့် စံနှုန်းမူဝါဒအပေါ် အခြေခံရသော ဆုံးဖြတ်ချက်ချရသည့် ပညာရပ်များတွင် ထူးချွန်အောင်မြင်နိုင်ပါသည်။");
        if (planetsAssociated(3, 4, planets)) findings.add(en
                ? "Mercury and Jupiter are connected, strengthening intelligence, social awareness, interpretation and the ability to understand people and context."
                : "ဗုဒ္ဓဟူးနှင့် ကြာသပတေးဂြိုဟ်တို့ အချင်းချင်း ဆက်သွယ်မှု ရှိနေသဖြင့် ဉာဏ်ပညာ ထက်မြက်ခြင်း၊ လူမှုရေးအကင်းပါးခြင်း၊ အကြောင်းအရာများကို ကောင်းစွာ အဓိပ္ပာယ်ဖွင့်ဆိုနိုင်ခြင်းနှင့် လူတို့၏ သဘာဝနှင့် ပတ်ဝန်းကျင်အခြေအနေကို လျင်မြန်စွာ နားလည်သဘောပေါက်နိုင်ခြင်း စသည့် အရည်အချင်းများ အထူးကောင်းမွန်နေပါလိမ့်မည်။");

        var lord2House = relativeHouse(zodiacSign(planets[lord2]), asc);
        if (isKendraOrTrine(lord2House) && isKendraOrTrine(jupiterHouse)) findings.add(en
                ? "The 2nd lord and Jupiter occupy angular or trinal houses, supporting a wide range of learnable skills and the ability to retain and apply knowledge."
                : "၂ တန့်သခင်နှင့် ကြာသပတေးတို့ ကိန်း သို့မဟုတ် တြိကောဏဘာဝတွင် တည်ရှိနေသဖြင့် အတတ်ပညာမျိုးစုံကို လွယ်ကူစွာ သင်ယူနိုင်ပြီး သင်ယူထားသည်များကိုလည်း စနစ်တကျ မှတ်သားအသုံးချနိုင်စွမ်း အားကောင်းပါလိမ့်မည်။");
        if (isOwnOrExalted(lord2, zodiacSign(planets[lord2]))
                || isFriendlySign(lord2, zodiacSign(planets[lord2]))) findings.add(en
                ? "The 2nd lord is well placed, supporting articulate speech, memory and effective presentation of learned material."
                : "၂ တန့်သခင်မှာ ဘာဝအနေအထား ကောင်းမွန်သဖြင့် စကားပြောဆိုရာတွင် ရှင်းလင်းပြတ်သားခြင်း၊ မှတ်ဉာဏ်ကောင်းမွန်ခြင်းနှင့် မိမိလေ့လာထားသော အကြောင်းအရာများကို ထိရောက်ပြောင်မြောက်စွာ တင်ပြနိုင်စွမ်း ရှိပါလိမ့်မည်။");
        if (zodiacSign(planets[0]) == sign2 && zodiacSign(planets[2]) == sign2) findings.add(en
                ? "The Sun and Mars unite in the 2nd house, supporting confident argument, debate and forceful verbal presentation."
                : "တနင်္ဂနွေနှင့် အင်္ဂါဂြိုဟ်တို့ ၂ တန့်ဘာဝတွင် ပူးယှဉ်တည်ရှိနေသဖြင့် အချေအတင် ဆွေးနွေးငြင်းခုံနိုင်စွမ်း၊ မိမိကိုယ်ကိုယ် ယုံကြည်မှုရှိရှိ ပြောဆိုနိုင်စွမ်းနှင့် စကားပြောရာတွင် အချက်ကျကျ တင်ပြဆွဲဆောင်နိုင်စွမ်းတို့ သိသာထင်ရှားပါလိမ့်မည်။");
        if (venusHouse == 4) findings.add(en
                ? "Venus occupies the 4th house, favouring music, fine arts, aesthetic studies, design and learning through harmony and feeling."
                : "သောကြာဂြိုဟ်သည် ၄ တန့်ဘာဝတွင် တည်ရှိနေသဖြင့် ဂီတ၊ အနုပညာ၊ အလှအပနှင့် ဒီဇိုင်းပိုင်းဆိုင်ရာ ပညာရပ်များအပြင် စိတ်ခံစားမှုကို အခြေခံသည့် သင်ယူလေ့လာမှုများကို အားပေးတိုးတက်စေပါသည်။");

        var marsHouse = relativeHouse(zodiacSign(planets[2]), asc);
        var sunHouse = relativeHouse(zodiacSign(planets[0]), asc);
        if (marsHouse == 2 && isKendraHouse(mercuryHouse)) findings.add(en
                ? "Mars occupies the 2nd house while Mercury occupies an angular house, supporting mathematics, engineering, technical calculation and applied problem-solving."
                : "အင်္ဂါဂြိုဟ်သည် ၂ တန့်ဘာဝတွင် တည်ရှိပြီး ဗုဒ္ဓဟူးဂြိုဟ်က ကိန်းဘာဝတွင် တည်ရှိနေသဖြင့် သင်္ချာ၊ အင်ဂျင်နီယာ၊ နည်းပညာဆိုင်ရာ တွက်ချက်မှုများနှင့် လက်တွေ့ကျကျ ပြဿနာဖြေရှင်းနိုင်သည့် ပညာရပ်များကို အကျိုးပြုပါသည်။");
        if ((isKendraOrTrine(sunHouse) || sunHouse == 11)
                && (isKendraOrTrine(mercuryHouse) || mercuryHouse == 11)) findings.add(en
                ? "The Sun and Mercury occupy angular, trinal or 11th-house positions, strengthening structured reasoning, mathematics, administration and analytical study."
                : "တနင်္ဂနွေနှင့် ဗုဒ္ဓဟူးဂြိုဟ်တို့သည် ကိန်း၊ တြိကောဏ သို့မဟုတ် ၁၁ တန့်ဘာဝများတွင် တည်ရှိနေသဖြင့် စနစ်တကျ ဆင်ခြင်တွေးခေါ်နိုင်စွမ်း၊ သင်္ချာ၊ အုပ်ချုပ်ရေးနှင့် ခွဲခြမ်းစိတ်ဖြာ လေ့လာရသော ပညာရပ်များတွင် ထူးချွန်ထက်မြက်စေပါလိမ့်မည်။");
        if (zodiacSign(planets[0]) == sign2 && zodiacSign(planets[3]) == sign2) {
            var saturnAspectsSecond = planetAspectsSign(6, zodiacSign(planets[6]), sign2);
            findings.add(saturnAspectsSecond
                    ? (en ? "The Sun and Mercury unite in the 2nd house under Saturn's aspect, supporting astrology together with mathematics, patient calculation and classical technical study."
                       : "တနင်္ဂနွေနှင့် ဗုဒ္ဓဟူးဂြိုဟ်တို့ ၂ တန့်ဘာဝတွင် ပူးယှဉ်တည်ရှိပြီး စနေဂြိုဟ်၏ အမြင်ရရှိထားသဖြင့် ဗေဒင်ပညာရပ်နှင့်အတူ သင်္ချာ၊ စိတ်ရှည်သည်းခံစွာ တွက်ချက်ရသော ပညာရပ်များနှင့် ရှေးရိုးရာနည်းပညာဆိုင်ရာ လေ့လာမှုများကို အားပေးတိုးတက်စေပါသည်။")
                    : (en ? "The Sun and Mercury unite in the 2nd house, favouring astrology, interpretation, calculation and knowledge expressed through speech."
                       : "တနင်္ဂနွေနှင့် ဗုဒ္ဓဟူးဂြိုဟ်တို့ ၂ တန့်ဘာဝတွင် ပူးယှဉ်တည်ရှိနေသဖြင့် ဗေဒင်ပညာ၊ အဓိပ္ပာယ်ဖွင့်ဆိုချက်များ၊ တွက်ချက်မှုပညာရပ်များနှင့် မိမိတတ်သိထားသော ပညာရပ်များကို စကားပြောဆိုမှုမှတစ်ဆင့် ကောင်းစွာ ထုတ်ဖော်ပြသနိုင်စွမ်းရှိပါလိမ့်မည်။"));
        }
        if (jupiterHouse == 2) findings.add(en
                ? "Jupiter occupies the 2nd house, favouring astrology, classical knowledge, teaching, counsel and preservation of traditional learning."
                : "ကြာသပတေးဂြိုဟ်သည် ၂ တန့်ဘာဝတွင် တည်ရှိနေသဖြင့် ဗေဒင်ပညာ၊ ကျမ်းဂန်ပညာ၊ သင်ကြားပို့ချမှု၊ အကြံပေးလမ်းညွှန်မှုနှင့် ရိုးရာအစဉ်အလာပညာရပ်များကို ထိန်းသိမ်းစောင့်ရှောက်သည့် လုပ်ငန်းများတွင် အောင်မြင်ဖြစ်ထွန်းစေပါသည်။");
        var rahuInFifth = zodiacSign(planets[7]) == sign5;
        if (rahuInFifth && (zodiacSign(planets[0]) == sign5 || zodiacSign(planets[3]) == sign5)) findings.add(en
                ? "Rahu joins the Sun or Mercury in the 5th house, supporting interest in astrology, unconventional research, hidden systems, chemistry or specialised technical subjects."
                : "ရာဟုဂြိုဟ်သည် တနင်္ဂနွေ သို့မဟုတ် ဗုဒ္ဓဟူးဂြိုဟ်နှင့်အတူ ၅ တန့်ဘာဝတွင် ပူးယှဉ်တည်ရှိနေသဖြင့် ဗေဒင်ပညာ၊ သမားရိုးကျမဟုတ်သော သုတေသနလုပ်ငန်းများ၊ ဆန်းကြယ်သောစနစ်များ၊ ဓာတုဗေဒ သို့မဟုတ် အထူးပြုနည်းပညာရပ်များကို စိတ်ဝင်စားလိုက်စားတတ်ပါသည်။");
        if (mercuryHouse == 4) findings.add(en
                ? "Mercury occupies the 4th house, favouring astrology, symbolic interpretation, calculation, writing and sustained intellectual study."
                : "ဗုဒ္ဓဟူးဂြိုဟ်သည် ၄ တန့်ဘာဝတွင် တည်ရှိနေသဖြင့် ဗေဒင်ပညာ၊ သင်္ကေတအဓိပ္ပာယ်ဖွင့်ဆိုချက်များ၊ တွက်ချက်မှုပညာရပ်များ၊ စာပေရေးသားခြင်းနှင့် ရေရှည်ဉာဏ်စွမ်းသုံး၍ လေ့လာရသော ပညာရပ်များကို အကျိုးပြုစေပါလိမ့်မည်။");

        var educationDashaPlanets = Array(9).fill(false);
        educationDashaPlanets[3] = true;
        educationDashaPlanets[4] = true;
        educationDashaPlanets[lord4] = true;
        educationDashaPlanets[lord5] = true;
        educationDashaPlanets[lord9] = true;
        for (var planet = 0; planet < 9; planet++) {
            var sourceSign = zodiacSign(planets[planet]);
            if (sourceSign == sign4 || sourceSign == sign5 || sourceSign == (asc + 8) % 12
                    || planetAspectsSign(planet, sourceSign, sign4)
                    || planetAspectsSign(planet, sourceSign, sign5)
                    || planetAspectsSign(planet, sourceSign, (asc + 8) % 12)) {
                educationDashaPlanets[planet] = true;
            }
        }

        if (findings.isEmpty()) return;
        appendReadingHeading(reading, en ? "Education-related Readings" : "ပညာရေးဆိုင်ရာအဟောများ");
        appendReadingFindings(reading, findings);
    
}
function isEducationSupportHouse(house) {

        return house == 1 || house == 2 || house == 4 || house == 5
                || house == 7 || house == 9 || house == 10 || house == 11;
    
}
function appendFamilyAndSocialReading(reading,planets,cusps,en) {

        var asc = zodiacSign(cusps[1]);
        var lord3 = signRuler((asc + 2) % 12);
        var lord4 = signRuler((asc + 3) % 12);
        var lord6 = signRuler((asc + 5) % 12);
        var lord8 = signRuler((asc + 7) % 12);
        var lord9 = signRuler((asc + 8) % 12);
        var lord11 = signRuler((asc + 10) % 12);
        var lord12 = signRuler((asc + 11) % 12);
        var ascLord = signRuler(asc);
        var house3Sign = (asc + 2) % 12;
        var house4Sign = (asc + 3) % 12;
        var house6Sign = (asc + 5) % 12;
        var house9Sign = (asc + 8) % 12;
        var house11Sign = (asc + 10) % 12;
        var house12Sign = (asc + 11) % 12;
        var findings = [];

        var fatherSupport = zodiacSign(planets[lord9]) == zodiacSign(planets[0])
                && zodiacSign(planets[0]) != house9Sign;
        var motherSupport = zodiacSign(planets[lord4]) == zodiacSign(planets[1])
                && zodiacSign(planets[1]) != house4Sign;
        if (fatherSupport) findings.add(en
                ? "The 9th lord joins the Sun outside the 9th house, supporting a lasting paternal influence, guidance and practical help from the father or a father figure."
                : "၉ တန့်သခင်နှင့် တနင်္ဂနွေဂြိုဟ်တို့သည် ၉ တန့်ဘာဝမှလွဲ၍ အခြားဘာဝတစ်ခုတွင် ပူးယှဉ်တည်ရှိနေသဖြင့် ဖခင် (သို့မဟုတ်) ဖခင်ကဲ့သို့သော အကြီးအကဲထံမှ ရေရှည်လမ်းညွှန်ပြသမှုနှင့် လက်တွေ့ကျသော အထောက်အပံ့ကောင်းများကို ရရှိနိုင်ပါသည်။");
        if (motherSupport) findings.add(en
                ? "The 4th lord joins the Moon outside the 4th house, supporting maternal care, emotional grounding and help from the mother or a maternal figure."
                : "၄ တန့်သခင်နှင့် စန်း (လမင်း) တို့သည် ၄ တန့်ဘာဝမှလွဲ၍ အခြားဘာဝတစ်ခုတွင် ပူးယှဉ်တည်ရှိနေသဖြင့် မိခင် (သို့မဟုတ်) မိခင်ကဲ့သို့သော အကြီးအကဲထံမှ နွေးထွေးသော စောင့်ရှောက်မှု၊ စိတ်ပိုင်းဆိုင်ရာ တည်ငြိမ်အေးချမ်းမှုနှင့် အကူအညီကောင်းများကို ရရှိနိုင်ပါသည်။");

        var malefics = [0, 2, 6, 7, 8];
        var benefics = [1, 3, 4, 5];
        var fourthAfflicted = anyPlanetOccupiesSign(malefics, house4Sign, planets);
        var ninthAfflicted = anyPlanetOccupiesSign(malefics, house9Sign, planets);
        var fourthProtected = anyPlanetConjoinsOrAspectsSign(benefics, house4Sign, planets);
        var ninthProtected = anyPlanetConjoinsOrAspectsSign(benefics, house9Sign, planets);
        if (fourthAfflicted && !fourthProtected) findings.add(en
                ? "Malefic concentration in the 4th house without clear benefic support can make the relationship with the mother, home or emotional foundations more demanding. Patience and dependable care improve the bond."
                : "၄ တန့်ဘာဝတွင် ပါပဂြိုဟ်များ လွှမ်းမိုးနေပြီး သောမဂြိုဟ်၏ ကာကွယ်စောင့်ရှောက်မှု အားနည်းနေသဖြင့် မိခင်နှင့် ဆက်ဆံရေး၊ အိမ်တွင်းမိသားစုဘဝ သို့မဟုတ် စိတ်ပိုင်းဆိုင်ရာ လုံခြုံမှုဆိုင်ရာ ကိစ္စရပ်များတွင် ပိုမို၍ တာဝန်ယူ၊ အပင်ပန်းခံရနိုင်ပါသည်။ စိတ်ရှည်သည်းခံမှုနှင့် ယုံကြည်စိတ်ချရသော ဂရုစိုက်မှုများက ဆက်ဆံရေးကို ပိုမိုကောင်းမွန်လာစေပါလိမ့်မည်။");
        if (ninthAfflicted && !ninthProtected) findings.add(en
                ? "Malefic concentration in the 9th house without clear benefic support can bring distance, strict expectations or differing principles in the paternal relationship. Respectful communication is important."
                : "၉ တန့်ဘာဝတွင် ပါပဂြိုဟ်များ လွှမ်းမိုးနေပြီး သောမဂြိုဟ်၏ ကာကွယ်စောင့်ရှောက်မှု အားနည်းနေသဖြင့် ဖခင်ဖြစ်သူနှင့် အလှမ်းဝေးကွာခြင်း၊ တင်းကျပ်သော မျှော်လင့်ချက်များ ရှိနေခြင်း သို့မဟုတ် အယူအဆချင်း မတူညီဘဲ ကွဲလွဲခြင်းမျိုး ဖြစ်ပေါ်နိုင်ပါသည်။ အပြန်အလှန် လေးစားတန်ဖိုးထားသော ဆက်သွယ်ပြောဆိုမှုကို အလေးထားသင့်ပါသည်။");
        if (planetConjoinsOrAspects(2, 0, planets)) findings.add(en
                ? "Mars influences the Sun, indicating a forceful or active paternal environment. Careful handling of conflict and physical risk around the father is useful."
                : "အင်္ဂါဂြိုဟ်သည် တနင်္ဂနွေဂြိုဟ်အပေါ် လွှမ်းမိုးထားသဖြင့် ဖခင်ဖြစ်သူ၏ ပတ်ဝန်းကျင် သို့မဟုတ် ၎င်း၏ စရိုက်မှာ ပြတ်သားတက်ကြွလွန်းနေတတ်ပါသည်။ ထို့ကြောင့် ဖခင်နှင့် ပတ်သက်၍ အငြင်းပွားစရာများနှင့် ကိုယ်ထိလက်ရောက် ဘေးအန္တရာယ်ရှိနိုင်သော အခြေအနေများကို အထူးသတိထား ကိုင်တွယ်ဖြေရှင်းသင့်ပါသည်။");
        if (planetConjoinsOrAspects(2, 1, planets)) findings.add(en
                ? "Mars influences the Moon, showing strong emotion and activity around the maternal relationship. Calm responses help prevent avoidable tension."
                : "အင်္ဂါဂြိုဟ်သည် စန်း (လမင်း) ကို လွှမ်းမိုးထားသဖြင့် မိခင်နှင့် ပတ်သက်သော ကိစ္စရပ်များတွင် စိတ်ခံစားမှု ပြင်းထန်ခြင်းနှင့် လှုပ်ရှားရုန်းကန်ရမှုများ ရှိနိုင်ပါသည်။ မိမိဘက်မှ တည်ငြိမ်အေးချမ်းစွာ တုံ့ပြန်ပြောဆိုခြင်းက မလိုအပ်သော တင်းမာမှုများကို လျော့ပါးသက်သာစေပါလိမ့်မည်။");
        if (relativeHouse(zodiacSign(planets[1]), asc) == 12) findings.add(en
                ? "The Moon occupies the 12th house, supporting benefit through maternal sacrifice, private care, travel or connections away from the birthplace."
                : "စန်း (လမင်း) သည် ၁၂ တန့်ဘာဝတွင် တည်ရှိနေသဖြင့် မိခင်၏ စွန့်လွှတ်စောင့်ရှောက်မှု၊ သီးသန့်အကူအညီများ၊ ခရီးသွားလာမှု သို့မဟုတ် မိမိမွေးရပ်မြေနှင့် ဝေးကွာသော အရပ်ဒေသများနှင့် ဆက်သွယ်ဆောင်ရွက်မှုများမှတစ်ဆင့် အကျိုးကျေးဇူးများ ရရှိနိုင်ပါသည်။");
        if (isExaltedSign(0, zodiacSign(planets[0]))) findings.add(en
                ? "The Sun is exalted, strengthening paternal confidence, status and the ability to provide direction."
                : "တနင်္ဂနွေဂြိုဟ် ဥစ်အင်အား ရရှိထားသဖြင့် ဖခင်၏ ကိုယ်ပိုင်ယုံကြည်မှု၊ လူမှုရေးဂုဏ်သိက္ခာနှင့် မိသားစုအပေါ် ကောင်းမွန်စွာ လမ်းညွှန်ပြသနိုင်စွမ်းတို့ အထူးအားကောင်းနေပါလိမ့်မည်။");
        if (relativeHouse(zodiacSign(planets[lord9]), asc) == 11) findings.add(en
                ? "The 9th lord occupies the 11th house, supporting gains, useful networks and fulfilled hopes through paternal guidance."
                : "၉ တန့်သခင်သည် ၁၁ တန့်ဘာဝတွင် တည်ရှိနေသဖြင့် ဖခင်၏ လမ်းညွှန်ပြသပေးမှုများမှတစ်ဆင့် အကျိုးအမြတ်များ ရရှိခြင်း၊ အသုံးဝင်သော အဆက်အသွယ်ကောင်းများ ရရှိခြင်းနှင့် ရည်မှန်းချက်များ အောင်မြင်ပြည့်ဝခြင်း စသည့် အကျိုးကျေးဇူးများကို ရရှိစေနိုင်ပါသည်။");
        if (zodiacSign(planets[0]) == house12Sign && zodiacSign(planets[lord9]) == house12Sign) findings.add(en
                ? "The Sun and 9th lord unite in the 12th house, linking paternal benefit with travel, foreign places, private institutions or charitable sacrifice."
                : "တနင်္ဂနွေဂြိုဟ်နှင့် ၉ တန့်သခင်တို့သည် ၁၂ တန့်ဘာဝတွင် ပူးယှဉ်တည်ရှိနေသဖြင့် ဖခင်နှင့် ပတ်သက်သော အကျိုးကျေးဇူးများသည် ခရီးသွားလာခြင်း၊ နိုင်ငံရပ်ခြား ကိစ္စရပ်များ၊ သီးသန့်အဖွဲ့အစည်းများ သို့မဟုတ် ပရဟိတနှင့် စွန့်လွှတ်လှူဒါန်းမှု ကိစ္စရပ်များမှတစ်ဆင့် ပေါ်ထွန်းလာတတ်ပါသည်။");
        if (zodiacSign(planets[lord12]) == house12Sign && zodiacSign(planets[4]) == house12Sign) findings.add(en
                ? "The 12th lord and Jupiter unite in the 12th house, supporting paternal benefit through foreign places, spiritual learning, charity or institutions."
                : "၁၂ တန့်သခင်နှင့် ကြာသပတေးဂြိုဟ်တို့သည် ၁၂ တန့်ဘာဝတွင် ပူးယှဉ်တည်ရှိနေသဖြင့် ဖခင်နှင့် ပတ်သက်သော ကံကောင်းခြင်း၊ အကျိုးကျေးဇူးများသည် နိုင်ငံရပ်ခြားကိစ္စများ၊ ဝိညာဉ်ရေးရာနှင့် ဘာသာရေးဆိုင်ရာ လေ့လာမှုများ၊ လှူဒါန်းမှုများ သို့မဟုတ် အဖွဲ့အစည်းကြီးများနှင့် ဆက်စပ်ပြီး ဖြစ်ထွန်းလာနိုင်ပါသည်။");

        var marsHouse = relativeHouse(zodiacSign(planets[2]), asc);
        var thirdLordHouse = relativeHouse(zodiacSign(planets[lord3]), asc);
        if (marsHouse == 12) findings.add(en
                ? "Mars occupies the 12th house, indicating that support for siblings may arise through sacrifice, travel or living at a distance."
                : "အင်္ဂါဂြိုဟ်သည် ၁၂ တန့်ဘာဝတွင် တည်ရှိနေသဖြင့် ညီအစ်ကိုမောင်နှမများနှင့် ပတ်သက်သော အကျိုးကျေးဇူး သို့မဟုတ် ၎င်းတို့ကို ကူညီပံ့ပိုးရမှုများသည် မိမိဘက်မှ စွန့်လွှတ်အနစ်နာခံရခြင်း၊ ခရီးသွားလာရခြင်း သို့မဟုတ် တစ်ဦးနှင့်တစ်ဦး အလှမ်းဝေးကွာစွာ နေထိုင်ရခြင်းတို့နှင့် ဆက်စပ်ပြီး ဖြစ်ပေါ်လာတတ်ပါသည်။");
        if (thirdLordHouse == 6 || thirdLordHouse == 8 || thirdLordHouse == 12) findings.add(en
                ? "The 3rd lord occupies a difficult house, suggesting periods of distance, responsibility or misunderstanding among siblings. Benefic support and steady contact improve cooperation."
                : "၃ တန့်သခင်သည် ဒုဌာနဘာဝ (၆၊ ၈၊ ၁၂ ဘာဝများ) တွင် တည်ရှိနေသဖြင့် ညီအစ်ကိုမောင်နှမများအကြား ဆက်ဆံရေး အလှမ်းဝေးကွာခြင်း၊ တာဝန်ဝတ္တရားများပြားခြင်း သို့မဟုတ် အထင်အမြင်လွဲမှားရတတ်သည့် ကာလများ ကြုံတွေ့ရနိုင်ပါသည်။ သို့သော်လည်း သောမဂြိုဟ်၏ အကူအညီကောင်းများ ရရှိခြင်းနှင့် ပုံမှန်ဆက်သွယ်စကားပြောခြင်းဖြင့် အချင်းချင်း နားလည်မှုနှင့် ပူးပေါင်းဆောင်ရွက်မှုကို ပိုမိုကောင်းမွန်စေပါလိမ့်မည်။");
        if (zodiacSign(planets[2]) == house11Sign
                && planetAspectsSign(6, zodiacSign(planets[6]), house11Sign)) findings.add(en
                ? "Mars occupies the 11th house under Saturn's aspect, bringing demanding responsibilities or periodic tension involving elder siblings and shared goals."
                : "အင်္ဂါဂြိုဟ်သည် ၁၁ တန့်ဘာဝတွင် တည်ရှိပြီး စနေဂြိုဟ်၏ အမြင်ရရှိထားသဖြင့် မိမိထက်ကြီးသော ညီအစ်ကိုမောင်နှမများနှင့် ပူးပေါင်းဆောင်ရွက်ရသည့် ရည်မှန်းချက်များတွင် တာဝန်ဝတ္တရား အလွန်ကြီးမားခြင်း သို့မဟုတ် အခါအားလျော်စွာ စိတ်ဝမ်းကွဲစရာ တင်းမာမှုများ ကြုံရတတ်ပါသည်။");
        if (zodiacSign(planets[4]) == house11Sign) findings.add(en
                ? "Jupiter occupies the 11th house, enlarging the role of elder siblings and networks. Their welfare or expectations may require generous support, while they can also open valuable opportunities."
                : "ကြာသပတေးဂြိုဟ်သည် ၁၁ တန့်ဘာဝတွင် တည်ရှိနေသဖြင့် မိမိထက်ကြီးသော ညီအစ်ကိုမောင်နှမများနှင့် လူမှုကွန်ရက်အသိုင်းအဝိုင်း၏ အခန်းကဏ္ဍမှာ အလွန်အရေးပါလာတတ်ပါသည်။ ၎င်းတို့၏ လိုအပ်ချက်များအတွက် ရက်ရက်ရောရော ကူညီပံ့ပိုးပေးရတတ်သလို တစ်ဖက်တွင်လည်း ၎င်းတို့ထံမှတစ်ဆင့် တန်ဖိုးရှိသော အခွင့်အလမ်းကောင်းများ ပြန်လည်ရရှိနိုင်ပါသည်။");

        var sixthOccupied = false;
        var maleficsInSixth = 0;
        for (var planet = 0; planet < Math.min(9, planets.length); planet++) {
            if (zodiacSign(planets[planet]) == house6Sign) {
                sixthOccupied = true;
                for (let malefic of malefics) if (planet == malefic) maleficsInSixth++;
            }
        }
        if (!sixthOccupied) findings.add(en
                ? "No planet occupies the 6th house, reducing the likelihood of persistent open conflict when other factors remain moderate."
                : "၆ တန့်ဘာဝတွင် မည်သည့်ဂြိုဟ်မျှ တည်ရှိမနေသဖြင့် အခြားဆိုးကျိုးပေးသည့် အင်္ဂါရပ်များ မပြင်းထန်ပါက ရေရှည်ရန်ပြိုင်ရခြင်းနှင့် ပဋိပက္ခဖြစ်ပွားရခြင်းမျိုး နည်းပါးသွားနိုင်ပါသည်။");
        else if (maleficsInSixth > 0) findings.add(en
                ? "Malefic planets occupy the 6th house, strengthening competitive resistance and the ability to confront opponents or repay obligations through disciplined effort."
                : "၆ တန့်ဘာဝတွင် ပါပဂြိုဟ်များ တည်ရှိနေသဖြင့် ပြိုင်ဘက် သို့မဟုတ် အတိုက်အခံများကို ကြံ့ကြံ့ခံရင်ဆိုင်နိုင်စွမ်းရှိပြီး၊ မိမိ၏ စည်းကမ်းရှိရှိ ကြိုးပမ်းအားထုတ်မှုကြောင့် ကြွေးမြီနှင့် တာဝန်ဝတ္တရားများကိုလည်း ကောင်းမွန်စွာ ဖြေရှင်းကျော်လွှားနိုင်ပါလိမ့်မည်။");
        if (relativeHouse(zodiacSign(planets[ascLord]), asc) == 6
                && planetAspectsSign(lord6, zodiacSign(planets[lord6]), zodiacSign(planets[ascLord]))) findings.add(en
                ? "The Ascendant lord occupies the 6th house under the 6th lord's aspect. Clear boundaries, written agreements and timely resolution help manage disputes with relatives or competitors."
                : "လဂ်သခင်သည် ၆ တန့်ဘာဝတွင် တည်ရှိပြီး ၆ တန့်သခင်၏ အမြင်ကို ရရှိထားသဖြင့် ဆွေမျိုးများ သို့မဟုတ် ပြိုင်ဘက်များနှင့် အငြင်းပွားမှုကိစ္စရပ်များ ဖြစ်ပေါ်လာပါက မိမိဘက်က စည်းမျဉ်းစည်းကမ်း ရှင်းလင်းစွာထားရှိခြင်း၊ စာရွက်စာတမ်း သဘောတူညီချက် စနစ်တကျပြုလုပ်ခြင်းနှင့် အချိန်မီပြတ်ပြတ်သားသား ဖြေရှင်းခြင်းတို့ဖြင့် ကြိုတင်ပြင်ဆင် ကိုင်တွယ်သင့်ပါသည်။");
        if (zodiacSign(planets[lord4]) == zodiacSign(planets[lord8])) findings.add(en
                ? "The 4th and 8th lords are conjunct. Property, family assets and official documents should be handled carefully to avoid complicated disputes."
                : "၄ တန့်သခင်နှင့် ၈ တန့်သခင်တို့ ပူးယှဉ်တည်ရှိနေသဖြင့် အိမ်ခြံမြေကိစ္စများ၊ မိသားစုပိုင်ဆိုင်မှုများနှင့် တရားဝင်စာရွက်စာတမ်းများကို ရှုပ်ထွေးသော အငြင်းပွားမှုများ မဖြစ်ပေါ်စေရန်အတွက် အထူးသတိပြု၍ စနစ်တကျ ကိုင်တွယ်ဆောင်ရွက်သင့်ပါသည်။");
        if (areNaturalFriends(lord11, ascLord)) findings.add(en
                ? "The 11th lord and Ascendant lord are natural friends, supporting balanced exchange, dependable friendships and mutually useful networks."
                : "၁၁ တန့်သခင်နှင့် လဂ်သခင်တို့သည် သဘာဝမိတ်ဂြိုဟ်များ ဖြစ်ကြသဖြင့် မိတ်ဆွေအပေါင်းအသင်းများနှင့် အပေးအယူမျှတခြင်း၊ ယုံကြည်အားကိုးရသော ဆက်ဆံရေးများရရှိခြင်းနှင့် အပြန်အလှန် အကျိုးပြုနိုင်မည့် ကွန်ရက်ကောင်းများကို တည်ဆောက်နိုင်ပါလိမ့်မည်။");
        var debtPeriodLords = [];
        for (let lord of [lord6, lord8, lord12]) {
            var name = displayPlanet(EN_PLANET_NAMES[lord]);
            if (!debtPeriodLords.contains(name)) debtPeriodLords.add(name);
            for (var planet = 0; planet < 7; planet++) {
                if (planet != lord && planetsAssociated(lord, planet, planets)) {
                    var associated = displayPlanet(EN_PLANET_NAMES[planet]);
                    if (!debtPeriodLords.contains(associated)) debtPeriodLords.add(associated);
                }
            }
        }
        var debtDashaPlanets = Array(9).fill(false);
        debtDashaPlanets[lord6] = true;
        debtDashaPlanets[lord8] = true;
        debtDashaPlanets[lord12] = true;
        for (var planet = 0; planet < 9; planet++) {
            if (planetsAssociated(lord6, planet, planets)
                    || planetsAssociated(lord8, planet, planets)
                    || planetsAssociated(lord12, planet, planets)) debtDashaPlanets[planet] = true;
        }

        if (findings.isEmpty()) return;
        appendReadingHeading(reading, en ? "Family and Social-life Readings" : "မိသားစုနှင့် လူမှုဘဝဆိုင်ရာအဟောများ");
        appendReadingFindings(reading, findings);
    
}
function anyPlanetOccupiesSign(candidates,sign,planets) {

        for (let planet of candidates) if (zodiacSign(planets[planet]) == sign) return true;
        return false;
    
}
function areNaturalFriends(first,second) {

        var friends = [
                [1, 2, 4], [0, 3], [0, 1, 4], [0, 5], [0, 1, 2], [3, 6], [3, 5]
        ];
        if (first < 0 || second < 0 || first >= friends.length || second >= friends.length) return false;
        var firstAccepts = false;
        var secondAccepts = false;
        for (let friend of friends[first]) if (friend == second) firstAccepts = true;
        for (let friend of friends[second]) if (friend == first) secondAccepts = true;
        return firstAccepts || secondAccepts;
    
}
function appendHealthSafetyProsperityReading(reading,planets,cusps,en) {

        var asc = zodiacSign(cusps[1]);
        var ascLord = signRuler(asc);
        var ascLordSign = zodiacSign(planets[ascLord]);
        var ascLordHouse = relativeHouse(ascLordSign, asc);
        var navamsa = mapArrayToNavamsa(planets);
        var benefics = [1, 3, 4, 5];
        var malefics = [0, 2, 6, 7, 8];
        var strengths = [];
        var cautions = [];
        var safety = [];
        var progress = [];

        var beneficSupportsAsc = anyPlanetConjoinsOrAspectsSign(benefics, asc, planets);
        var maleficAfflictsAsc = anyPlanetConjoinsOrAspectsSign(malefics, asc, planets);
        var ascLordStrong = isOwnOrExalted(ascLord, ascLordSign)
                || isFriendlySign(ascLord, ascLordSign)
                || isMoolatrikona(ascLord, ascLordSign, normalize(planets[ascLord]) % 30.0);
        var ascLordVargottama = ascLordSign == zodiacSign(navamsa[ascLord]);
        var ascVargottama = asc == zodiacSign(toNavamsaLongitude(cusps[1]));
        var moonVargottama = zodiacSign(planets[1]) == zodiacSign(navamsa[1]);

        if (ascLordStrong) strengths.add(en
                ? "The Ascendant lord has useful sign strength, supporting resilience, self-direction and recovery capacity."
                : "လဂ်သခင်ဂြိုဟ်သည် ရာသီအလိုက် အင်အားတောင့်တင်းသဖြင့် ဘဝအခက်အခဲများကို ကြံ့ကြံ့ခံနိုင်စွမ်း၊ မိမိဘဝကို ကိုယ်တိုင်ဦးဆောင်ထိန်းချုပ်နိုင်စွမ်းနှင့် ဆုတ်ယုတ်မှုများမှ လျင်မြန်စွာ ပြန်လည်နာလန်ထူနိုင်စွမ်းတို့ကို အထူးအားပေးကူညီပါသည်။");
        if (beneficSupportsAsc) strengths.add(en
                ? "Benefic influence reaches the Ascendant and moderates several difficult indications."
                : "လဂ်ပေါ်သို့ သောမဂြိုဟ် (အကျိုးပြုဂြိုဟ်) ၏ အမြင် သို့မဟုတ် အယှဉ် (ပူးယှဉ်မှု) ရရှိထားသဖြင့် ဇာတာပါ ခက်ခဲကြမ်းတမ်းသော ဆိုးကျိုးအနေအထားများကို အတိုင်းအတာတစ်ခုအထိ လျော့ပါးသက်သာစေနိုင်ပါသည်။");
        if (ascVargottama || moonVargottama || ascLordVargottama) strengths.add(en
                ? "Vargottama strength involving the Ascendant, Moon or Ascendant lord supports steadiness and favourable development."
                : "လဂ်၊ စန်း (လမင်း) သို့မဟုတ် လဂ်သခင်ဂြိုဟ်တို့တွင် ဝဂ္ဂုတ္တမအင်အား (အလွန်ထူးခြားသော အင်အားတစ်ရပ်) ပါဝင်နေသဖြင့် ဘဝကံဇာတာ တည်ငြိမ်ရင့်ကျက်ခြင်းနှင့် ကောင်းမွန်သော တိုးတက်ပြောင်းလဲမှုများကို အားကောင်းစွာ အထောက်အကူပြုပါလိမ့်မည်။");
        if (ascLordHouse == 1 && ascLordStrong) strengths.add(en
                ? "A strong Ascendant lord in the Ascendant favours vitality, confidence and recognition within one's community."
                : "အင်အားတောင့်တင်းသော လဂ်သခင်ဂြိုဟ်သည် လဂ်ဘာဝတွင် ကိုယ်တိုင်တည်ရှိနေသဖြင့် ကိုယ်ခန္ဓာကျန်းမာကြံ့ခိုင်ခြင်း၊ ကိုယ်ပိုင်ယုံကြည်မှု မြင့်မားခြင်းနှင့် မိမိပတ်ဝန်းကျင် အသိုင်းအဝိုင်းတွင် ထင်ပေါ်ကျော်ကြား အသိအမှတ်ပြုခံရခြင်း စသည့် ကောင်းကျိုးများကို ရရှိစေပါသည်။");

        var lord6 = signRuler((asc + 5) % 12);
        var lord8 = signRuler((asc + 7) % 12);
        var lord12 = signRuler((asc + 11) % 12);
        var dusthanaLords = java.util.Arrays.asList(lord6, lord8, lord12);
        var ascLordWithDusthanaLord = false;
        for (let lord of dusthanaLords) {
            if (lord != ascLord && zodiacSign(planets[lord]) == ascLordSign) ascLordWithDusthanaLord = true;
        }
        if (ascLordWithDusthanaLord) cautions.add(en
                ? "The Ascendant lord joins a 6th, 8th or 12th lord. Regular routines, rest and early professional assessment of persistent symptoms deserve attention."
                : "လဂ်သခင်သည် ၆၊ ၈ သို့မဟုတ် ၁၂ တန့်သခင် (ဒုဌာနဘာဝသခင်များ) နှင့် ပူးယှဉ်နေသဖြင့် နေ့စဉ်ပုံမှန် နေထိုင်စားသောက်မှု၊ လုံလောက်စွာ အနားယူမှုနှင့် ခန္ဓာကိုယ်တွင် ကြာရှည်ဖြစ်ပေါ်နေသော လက္ခဏာများကို စောစီးစွာ ကျွမ်းကျင်သူနှင့် စနစ်တကျ စစ်ဆေးပြသခြင်းတို့အား အလေးထားဆောင်ရွက်သင့်ပါသည်။");
        if ((ascLordHouse == 6 || ascLordHouse == 8 || ascLordHouse == 12) && !beneficSupportsAsc) cautions.add(en
                ? "The Ascendant lord occupies a difficult house without clear benefic support, indicating periods when energy management and preventive care become especially important."
                : "လဂ်သခင်သည် ၆၊ ၈ သို့မဟုတ် ၁၂ တန့်ကဲ့သို့သော ဒုဌာနဘာဝတွင် တည်ရှိနေပြီး သောမဂြိုဟ်၏ ကာကွယ်စောင့်ရှောက်မှု အားနည်းနေသဖြင့် မိမိ၏ စွမ်းအင်နှင့် ကိုယ်ကာယစွမ်းအားကို စနစ်တကျ ခွဲဝေအသုံးပြုခြင်း၊ ကြိုတင်ကာကွယ်စောင့်ရှောက်ခြင်းတို့ကို အထူးဂရုပြုသင့်ပါသည်။");
        if (maleficAfflictsAsc && !beneficSupportsAsc) cautions.add(en
                ? "The Ascendant receives concentrated malefic influence without a clear benefic counterbalance. Avoiding unnecessary risk and maintaining consistent health checks are prudent."
                : "လဂ်ဘာဝအပေါ် ပါပဂြိုဟ်များ၏ လွှမ်းမိုးမှု အားကောင်းနေပြီး သောမဂြိုဟ်၏ ချေဖျက်ပေးနိုင်စွမ်း မထင်ရှားသဖြင့် မလိုအပ်သော စွန့်စားမှုများကို ရှောင်ရှားခြင်းနှင့် ပုံမှန်ကျန်းမာရေးစစ်ဆေးမှုများ ပြုလုပ်ပေးခြင်းဖြင့် ကြိုတင်ကာကွယ်သင့်ပါသည်။");
        if (zodiacSign(planets[2]) == asc
                && (planetAspectsSign(0, zodiacSign(planets[0]), asc)
                || planetAspectsSign(6, zodiacSign(planets[6]), asc))) cautions.add(en
                ? "Mars occupies the Ascendant under Sun or Saturn influence. Extra care is advised during strenuous work, travel and activities carrying injury risk."
                : "အင်္ဂါဂြိုဟ်သည် လဂ်ဘာဝတွင် တည်ရှိပြီး တနင်္ဂနွေ သို့မဟုတ် စနေဂြိုဟ်၏ လွှမ်းမိုးမှုကို ခံထားရသဖြင့် ပင်ပန်းလွန်းသော အလုပ်များလုပ်ကိုင်ခြင်း၊ ခရီးသွားလာခြင်းနှင့် ထိခိုက်ဒဏ်ရာရနိုင်ခြေရှိသော လှုပ်ရှားမှုများတွင် ပိုမို၍ အထူးသတိပြုသင့်ပါသည်။");
        if (zodiacSign(planets[0]) == asc && zodiacSign(planets[6]) == asc) cautions.add(en
                ? "The Sun and Saturn unite in the Ascendant, creating tension between vitality and restraint. Sustainable pacing, recovery time and realistic standards are important for steady progress."
                : "တနင်္ဂနွေနှင့် စနေဂြိုဟ်တို့ လဂ်ဘာဝတွင် ပူးယှဉ်တည်ရှိနေသဖြင့် တက်ကြွလှုပ်ရှားလိုစိတ်နှင့် တားဆီးထိန်းချုပ်မှုတို့ အားပြိုင်နေတတ်ပါသည်။ ရေရှည်ခံနိုင်မည့် လုပ်ဆောင်နှုန်းဖြင့် စနစ်တကျသွားခြင်း၊ လုံလောက်သော အနားယူချိန်ပေးခြင်းနှင့် လက်တွေ့ကျသော စံနှုန်းများ သတ်မှတ်ခြင်းတို့က ဘဝတိုးတက်မှုကို အကောင်းဆုံးဖြစ်စေပါလိမ့်မည်။");
        if (zodiacSign(planets[lord8]) == asc && zodiacSign(planets[8]) == asc) cautions.add(en
                ? "The 8th lord and Ketu unite in the Ascendant. Sudden changes in energy or routine deserve careful observation, and unnecessary physical risk should be avoided."
                : "၈ တန့်သခင်နှင့် ကိတ်ဂြိုဟ်တို့ လဂ်ဘာဝတွင် ပူးယှဉ်တည်ရှိနေသဖြင့် ကိုယ်ခန္ဓာစွမ်းအား ရုတ်တရက် အပြောင်းအလဲဖြစ်ခြင်း သို့မဟုတ် နေ့စဉ်အစီအစဉ်များ ရုတ်ချည်းပြောင်းလဲတတ်ခြင်းတို့ကို သတိပြုစောင့်ကြည့်သင့်ပြီး မလိုအပ်သော ကိုယ်ထိလက်ရောက် စွန့်စားမှုများကို ရှောင်ကြဉ်သင့်ပါသည်။");
        if (zodiacSign(planets[0]) == asc
                && planetAspectsSign(2, zodiacSign(planets[2]), asc)) cautions.add(en
                ? "The Sun occupies the Ascendant under Mars's aspect. Heat, overexertion and impulsive physical action should be managed with moderation."
                : "တနင်္ဂနွေဂြိုဟ်သည် လဂ်ဘာဝတွင် တည်ရှိပြီး အင်္ဂါဂြိုဟ်၏ အမြင်ရရှိထားသဖြင့် ကိုယ်အပူလွန်ကဲခြင်း၊ ကိုယ်လက်လှုပ်ရှားမှု လွန်ကဲခြင်းနှင့် စိတ်လိုက်မာန်ပါ အလျင်စလို လုပ်ဆောင်ခြင်းများကို မျှတအောင် ထိန်းညှိပေးသင့်ပါသည်။");
        if (zodiacSign(planets[7]) == asc && zodiacSign(planets[2]) == asc
                && zodiacSign(planets[6]) == asc) cautions.add(en
                ? "Rahu, Mars and Saturn concentrate in the Ascendant. This is a strong risk-taking and pressure pattern, so safety procedures and preventive care should be treated seriously."
                : "ရာဟု၊ အင်္ဂါနှင့် စနေဂြိုဟ်တို့ လဂ်ဘာဝတွင် အတူတကွ စုဝေးနေသဖြင့် စိတ်ဖိစီးမှုများခြင်းနှင့် ပိုမိုစွန့်စားလိုသော စရိုက်မျိုး ဖြစ်ပေါ်စေနိုင်ပါသည်။ ထို့ကြောင့် လုပ်ငန်းခွင်နှင့် နေ့စဉ်ဘဝတွင် လုံခြုံရေးစည်းမျဉ်းများကို တိတိကျကျ လိုက်နာခြင်းနှင့် ကျန်းမာရေးအတွက် ကြိုတင်ကာကွယ်မှုများ ပြုလုပ်ခြင်းတို့ကို အလေးအနက်ထား ဆောင်ရွက်သင့်ပါသည်။");

        if (zodiacSign(planets[6]) == asc) safety.add(en
                ? "Saturn in the Ascendant is traditionally associated with delay, loss or misplaced trust. Property records, passwords and financial agreements should be checked carefully."
                : "စနေဂြိုဟ် လဂ်ဘာဝတွင် တည်ရှိခြင်းသည် ရှေးရိုးရာအရ လုပ်ငန်းဆောင်တာများ နှောင့်နှေးကြန့်ကြာခြင်း၊ ပစ္စည်းဆုံးရှုံးတတ်ခြင်း သို့မဟုတ် သူတစ်ပါးအပေါ် ယုံကြည်မှုမှားယွင်းတတ်ခြင်းတို့နှင့် ဆက်စပ်မှုရှိသည်ဟု ယူဆကြသဖြင့် ပိုင်ဆိုင်မှုစာရွက်စာတမ်းများ၊ လျှို့ဝှက်နံပါတ်များနှင့် ငွေကြေးဆိုင်ရာ သဘောတူညီချက်များကို သေချာစွာ စစ်ဆေးလုပ်ဆောင်သင့်ပါသည်။");
        if (zodiacSign(planets[7]) == asc && !ascLordStrong) safety.add(en
                ? "Rahu influences the Ascendant while its lord is not strongly placed. Verify promises, contracts and unfamiliar offers before committing resources."
                : "ရာဟုဂြိုဟ်သည် လဂ်ဘာဝအပေါ် လွှမ်းမိုးထားပြီး လဂ်သခင်ဂြိုဟ်မှာလည်း အင်အားမပြည့်ဝသေးသဖြင့် တစ်ပါးသူ၏ ကတိကဝတ်များ၊ ကန်ထရိုက်စာချုပ်များနှင့် မရင်းနှီးသော ကမ်းလှမ်းချက်များကို မိမိ၏ လုပ်အား၊ ငွေကြေး အရင်းအနှီးများ မစိုက်ထုတ်မီ သေချာစွာ စိစစ်အတည်ပြုသင့်ပါသည်။");

        if (planetInHouses(4, planets, asc, [1, 4, 5, 7, 9, 10])
                || planetInHouses(5, planets, asc, [1, 4, 5, 7, 9, 10])) progress.add(en
                ? "Jupiter or Venus occupies a Kendra or Trine, supporting comfort, constructive opportunities and help from others."
                : "ကြာသပတေး သို့မဟုတ် သောကြာဂြိုဟ်သည် ကိန်း သို့မဟုတ် တြိကောဏဘာဝများတွင် တည်ရှိနေသဖြင့် ဘဝတွင် စိတ်အေးချမ်းသာမှုရှိခြင်း၊ အခွင့်အလမ်းကောင်းများ ပေါ်ပေါက်လာခြင်းနှင့် အဝန်းအဝိုင်းကောင်းများထံမှ ကူညီပံ့ပိုးမှုများ ရရှိခြင်းတို့ကို အားပေးဖြစ်ထွန်းစေပါသည်။");
        if (relativeHouse(zodiacSign(planets[6]), asc) == 8 || zodiacSign(planets[6]) == zodiacSign(planets[lord8])) {
            progress.add(en
                    ? "Saturn's connection with the 8th house supports endurance and the ability to survive prolonged challenges when discipline is maintained."
                    : "စနေဂြိုဟ်သည် ၈ တန့်ဘာဝနှင့် ဆက်စပ်မှုရှိနေသဖြင့် မိမိဘက်က စနစ်တကျ စည်းကမ်းရှိရှိနှင့် သည်းခံစိတ်ရှည်မှုကိုသာ ထိန်းသိမ်းထားနိုင်ပါက ကြုံတွေ့ရမည့် ရေရှည်စိန်ခေါ်မှုများကို ကြံ့ကြံ့ခံကာ အောင်မြင်စွာ ကျော်လွှားနိုင်စွမ်း ရှိပါလိမ့်မည်။");
        }
        appendAscendantLordExchangeResults(progress, planets, asc, ascLord, en);

        appendReadingFindings(reading, strengths);
        appendReadingFindings(reading, cautions);
        appendReadingFindings(reading, safety);
        appendReadingFindings(reading, progress);

    
}
function anyPlanetConjoinsOrAspectsSign(candidates,targetSign,planets) {

        for (let planet of candidates) {
            var sourceSign = zodiacSign(planets[planet]);
            if (sourceSign == targetSign || planetAspectsSign(planet, sourceSign, targetSign)) return true;
        }
        return false;
    
}
function appendFindingGroup(reading,title,findings,en) {

        if (findings.isEmpty()) return;
        appendReadingHeading(reading, title);
        for (let finding of findings) appendReadingBullet(reading, finding);
    
}
function appendReadingFindings(reading,findings) {

        for (let finding of findings) appendReadingBullet(reading, finding);
    
}
function appendMentalWellbeingReading(reading,planets,cusps,en) {

        var asc = zodiacSign(cusps[1]);
        var moonSign = zodiacSign(planets[1]);
        var mercurySign = zodiacSign(planets[3]);
        var moonHouse = relativeHouse(moonSign, asc);
        var mercuryHouse = relativeHouse(mercurySign, asc);
        var saturnHouse = relativeHouse(zodiacSign(planets[6]), asc);
        var rahuHouse = relativeHouse(zodiacSign(planets[7]), asc);
        var ketuHouse = relativeHouse(zodiacSign(planets[8]), asc);
        var lord3 = signRuler((asc + 2) % 12);
        var lord10 = signRuler((asc + 9) % 12);
        var findings = [];

        var moonMarsInfluence = planetConjoinsOrAspects(2, 1, planets);
        var moonSaturnInfluence = planetConjoinsOrAspects(6, 1, planets);
        var mercuryMaleficInfluence = anyPlanetConjoinsOrAspectsPlanet([0, 2, 6, 7, 8], 3, planets);
        var moonMaleficInfluence = anyPlanetConjoinsOrAspectsPlanet([0, 2, 6, 7, 8], 1, planets);

        if (moonHouse == 6) findings.add(en
                ? "The Moon occupies the 6th house, supporting analytical intelligence and the ability to solve practical problems. Mental rest is important when responsibilities accumulate."
                : "စန်း (တနင်္လာ) သည် ၆ တန့်ဘာဝတွင် တည်ရှိနေသဖြင့် ခွဲခြမ်းစိတ်ဖြာတွေးခေါ်နိုင်သော ဉာဏ်ရည်နှင့် လက်တွေ့ကျကျ ပြဿနာဖြေရှင်းနိုင်စွမ်းတို့ကို အားပေးတိုးတက်စေပါသည်။ သို့သော် တာဝန်ဝတ္တရားများ လွန်ကဲလာချိန်တွင် စိတ်ပိုင်းဆိုင်ရာ အနားယူမှုကိုလည်း အထူးဂရုပြုပေးသင့်ပါသည်။");
        if (moonHouse == 3) findings.add(en
                ? "The Moon occupies the 3rd house, creating an active and responsive mind. Consistent priorities help reduce frequent changes of interest or intention."
                : "စန်း (တနင်္လာ) သည် ၃ တန့်ဘာဝတွင် တည်ရှိနေသဖြင့် စိတ်ကူးစိတ်သန်း လှုပ်ရှားတက်ကြွပြီး အခြေအနေများကို လျင်မြန်စွာ တုံ့ပြန်ဆောင်ရွက်နိုင်စွမ်း ရှိပါသည်။ စိတ်ဝင်စားမှုနှင့် ရည်ရွယ်ချက်များ မကြာခဏ ပြောင်းလဲတတ်ခြင်းကို လျှော့ချနိုင်ရန်အတွက် မိမိ၏ ဦးစားပေးရည်မှန်းချက်များကို တည်တည်ငြိမ်ငြိမ် ချမှတ်ထားသင့်ပါသည်။");
        if (moonHouse == 1) {
            var elongation = normalize(planets[1] - planets[0]);
            var waxing = elongation > 0.0 && elongation < 180.0;
            findings.add(waxing
                    ? (en ? "A waxing Moon occupies the Ascendant, supporting confidence, social receptivity and constructive emotional expression."
                       : "လဆန်းပက္ခစန်းသည် လဂ်ဘာဝတွင် တည်ရှိနေသဖြင့် မိမိကိုယ်ကိုယ် ယုံကြည်မှုရှိခြင်း၊ လူမှုဆက်ဆံရေးနယ်ပယ်ကို ကောင်းစွာနားလည်သဘောပေါက်ခြင်းနှင့် မိမိ၏ခံစားချက်များကို အပြုသဘောဆောင်စွာ ထုတ်ဖော်ပြသနိုင်ခြင်းတို့ကို အားပေးကူညီပါသည်။")
                    : (en ? "A waning Moon occupies the Ascendant. Energy and confidence may fluctuate, so regular sleep, independent decision-making and supportive relationships are especially useful."
                       : "လဆုတ်ပက္ခစန်းသည် လဂ်ဘာဝတွင် တည်ရှိနေသဖြင့် စိတ်ဓာတ်ခွန်အားနှင့် ကိုယ်ပိုင်ယုံကြည်မှုတို့ အတက်အကျ ရှိနေတတ်ပါသည်။ ထို့ကြောင့် အိပ်စက်ချိန် မှန်ကန်စေရန် ဂရုစိုက်ခြင်း၊ ကိုယ်တိုင်ရဲရဲဝံ့ဝံ့ ဆုံးဖြတ်ချက်ချတတ်ရန် လေ့ကျင့်ခြင်းနှင့် မိမိအား နွေးထွေးစွာ အားပေးကူညီမည့် ဆက်ဆံရေးမျိုးကို တည်ဆောက်ခြင်းတို့က အထူးပင် အကျိုးပြုပါလိမ့်မည်။"));
        }
        if (moonMaleficInfluence && mercuryMaleficInfluence) findings.add(en
                ? "Both the Moon and Mercury receive concentrated malefic influence. The mind may become overstimulated or confidence may fluctuate under pressure; structured routines, calm communication and timely professional support are beneficial."
                : "စန်း (တနင်္လာဂြိုဟ်) နှင့် ဗုဒ္ဓဟူးဂြိုဟ် နှစ်လုံးစလုံးအပေါ် ပါပဂြိုဟ်များ လွှမ်းမိုးနေသဖြင့် စိတ်ဖိစီးမှုများချိန်တွင် အတွေးများ ရှုပ်ထွေးခြင်း၊ အာရုံစူးစိုက်မှုနှင့် ယုံကြည်မှု တည်ငြိမ်မှုမရှိဘဲ အတက်အကျဖြစ်ခြင်းတို့ ကြုံရတတ်ပါသည်။ စနစ်တကျရှိသော နေ့စဉ်အစီအစဉ်များ ချမှတ်ခြင်း၊ အေးချမ်းတည်ငြိမ်စွာ ဆက်သွယ်ပြောဆိုခြင်းနှင့် လိုအပ်ပါက ကျွမ်းကျင်သူ၏ အကြံပြုချက်ကို အချိန်မီ ရယူခြင်းတို့က အကျိုးကျေးဇူး များစွာရှိစေပါလိမ့်မည်။");
        if ((moonHouse == 6 || moonHouse == 8 || moonHouse == 12)) findings.add(en
                ? "The Moon occupies a difficult house, indicating a tendency to carry concerns internally. Emotional boundaries, rest and discussing persistent worries with a trusted person are helpful."
                : "စန်း (တနင်္လာဂြိုဟ်) သည် ဒုဌာနဘာဝ (၆၊ ၈၊ ၁၂ ဘာဝများ) တွင် တည်ရှိနေသဖြင့် မိမိ၏ စိုးရိမ်ပူပန်မှုများကို စိတ်ထဲတွင်သာ ဖိနှိပ်သိုဝှက်ထားတတ်ပါသည်။ မိမိစိတ်အခြေအနေအတွက် စည်းကမ်းချက်များ သတ်မှတ်ထားရှိခြင်း၊ ကောင်းစွာ အနားယူခြင်းနှင့် ရေရှည်ပူပန်နေရသော ကိစ္စရပ်များကို ယုံကြည်စိတ်ချရသူတစ်ဦးဦးနှင့် ဆွေးနွေးတိုင်ပင်ခြင်းတို့က အထူးအသုံးဝင်ပါလိမ့်မည်။");
        if (moonMarsInfluence || moonSaturnInfluence) findings.add(en
                ? "Mars or Saturn influences the Moon, increasing emotional intensity, worry or impatience during demanding periods. Physical activity, measured responses and sufficient recovery time help channel this pattern constructively."
                : "စန်း (တနင်္လာဂြိုဟ်) အပေါ် အင်္ဂါ သို့မဟုတ် စနေဂြိုဟ်၏ လွှမ်းမိုးမှု ရှိနေသဖြင့် ဖိအားပေးခံရချိန် သို့မဟုတ် အကျပ်အတည်းကြုံချိန်များတွင် စိတ်ခံစားမှု ပြင်းထန်ခြင်း၊ စိုးရိမ်ပူပန်လွယ်ခြင်း သို့မဟုတ် စိတ်မရှည်ဖြစ်ခြင်းတို့ ပိုမိုဖြစ်ပေါ်တတ်ပါသည်။ ကိုယ်လက်လှုပ်ရှားမှု ပြုလုပ်ပေးခြင်း၊ ပြန်လည်တုံ့ပြန်ခြင်းမပြုမီ အချိန်အနည်းငယ် ယူခြင်းနှင့် လုံလောက်စွာ အနားယူပေးခြင်းတို့ဖြင့် ၎င်းပြင်းထန်သော စွမ်းအင်များကို အပြုသဘောဆောင်သည့်ဘက်သို့ ဦးတည်ပြောင်းလဲ ထိန်းညှိနိုင်ပါသည်။");
        if (planetConjoinsOrAspects(2, 5, planets)) findings.add(en
                ? "Mars influences Venus, intensifying affection, desire and emotional reactions. Creative activity and clear relationship boundaries help direct this energy constructively."
                : "အင်္ဂါဂြိုဟ်သည် သောကြာဂြိုဟ်ကို လွှမ်းမိုးထားသဖြင့် ချစ်ခင်စုံမက်မှု၊ လိုလားတောင့်တမှုနှင့် ခံစားချက်ပြင်းထန်စွာ တုံ့ပြန်မှုတို့ အားကောင်းနေတတ်ပါသည်။ တီထွင်ဖန်တီးမှုရှိသော လုပ်ဆောင်ချက်များ ပြုလုပ်ခြင်းနှင့် ဆက်ဆံရေးတွင် စည်းမျဉ်းစည်းကမ်း ရှင်းလင်းစွာ ထားရှိခြင်းတို့ဖြင့် ထိုစွမ်းအင်ကို အပြုသဘောဆောင်စွာ အသုံးချနိုင်ပါလိမ့်မည်။");
        if (saturnHouse == 2) findings.add(en
                ? "Saturn occupies the 2nd house, making speech guarded, firm or defensive. Pausing before responding helps prevent resentment from shaping communication."
                : "စနေဂြိုဟ်သည် ၂ တန့်ဘာဝတွင် တည်ရှိနေသဖြင့် စကားပြောဆိုရာ၌ အလွန်သတိကြီးလွန်းခြင်း၊ ပြတ်သားတင်းကျပ်ခြင်း သို့မဟုတ် မိမိကိုယ်ကို ကာကွယ်လိုသော သဘောထားမျိုး ရှိတတ်ပါသည်။ စကားမပြောမီ သို့မဟုတ် မတုံ့ပြန်မီ အချိန်ယူစဉ်းစားခြင်းက မကျေနပ်မှုများကြောင့် လူမှုဆက်ဆံရေး ထိခိုက်ပျက်ပြားခြင်းမျိုး မဖြစ်အောင် ကူညီပေးပါလိမ့်မည်။");
        if (moonHouse == 12 && zodiacSign(planets[1]) == zodiacSign(planets[6])
                && !isOwnOrExalted(1, moonSign)) findings.add(en
                ? "A weakened Moon joins Saturn in the 12th house, indicating a private, burdened or withdrawn emotional pattern. Stable sleep, trusted companionship and regular emotional expression are especially supportive."
                : "အားနည်းသော စန်း (တနင်္လာဂြိုဟ်) သည် ၁၂ တန့်ဘာဝတွင် စနေဂြိုဟ်နှင့် ပူးယှဉ်တည်ရှိနေသဖြင့် မိမိ၏ ခံစားချက်များကို သီးသန့်ဝှက်သိမ်းထားခြင်း၊ စိတ်ပိုင်းဆိုင်ရာ တာဝန်ပိနေခြင်း သို့မဟုတ် အခြားသူများနှင့် ခေတ္တခွာ၍ လူအသိုင်းအဝိုင်းမှ ရှောင်ဖယ်လိုခြင်းမျိုး ဖြစ်ပေါ်တတ်ပါသည်။ အိပ်စက်ချိန် မှန်ကန်စေရန် ဂရုစိုက်ခြင်း၊ မိမိယုံကြည်ရသူများနှင့် အတူရှိပေးခြင်းနှင့် ခံစားချက်များကို ပုံမှန်အတိုင်း ထုတ်ဖော်ပြသခြင်းတို့က အထူးပင် အထောက်အကူပြုပါလိမ့်မည်။");
        if (planetAspectsSign(2, zodiacSign(planets[2]), zodiacSign(planets[6]))
                && planetAspectsSign(6, zodiacSign(planets[6]), zodiacSign(planets[2]))) findings.add(en
                ? "Mars and Saturn mutually aspect one another. Strong drive can conflict with delay, producing inner pressure; progress improves through realistic pacing and disciplined action."
                : "အင်္ဂါဂြိုဟ်နှင့် စနေဂြိုဟ်တို့ အပြန်အလှန် မြင်ယှဉ်နေကြသဖြင့် ကိစ္စရပ်များကို အမြန်လုပ်ဆောင်လိုစိတ်နှင့် ဆွဲဆန့်နှောင့်နှေးမှုတို့ အားပြိုင်ပြီး စိတ်အတွင်းပိုင်းတွင် ဖိအားကြီးမားတတ်ပါသည်။ လက်တွေ့ကျသော အရှိန်အဟုန်ဖြင့် စနစ်တကျ သွားခြင်းနှင့် စည်းကမ်းရှိရှိ လုပ်ဆောင်ခြင်းဖြင့်သာ ဘဝတိုးတက်မှုကို ကောင်းမွန်စွာ ရရှိစေပါလိမ့်မည်။");
        if (mercuryHouse == 3) findings.add(en
                ? "Mercury occupies the 3rd house. The mind notices risk quickly and may over-prepare; confidence grows through repeated practice, writing and clear communication."
                : "ဗုဒ္ဓဟူးဂြိုဟ်သည် ၃ တန့်ဘာဝတွင် တည်ရှိနေသဖြင့် ဘေးအန္တရာယ်နှင့် အမှားအယွင်းများကို လျင်မြန်စွာ ရိပ်မိသတိပြုမိတတ်ပြီး အနာဂတ်အတွက် အလွန်အကျွံ ကြိုတင်စိုးရိမ်ပူပန်နေတတ်ပါသည်။ ထပ်ခါတလဲလဲ အဖန်ဖန် လေ့ကျင့်ပေးခြင်း၊ စာပေရေးသားခြင်းနှင့် မိမိစိတ်ကူးကို ရှင်းလင်းပြတ်သားစွာ ပြောဆိုခြင်းတို့က ကိုယ်ပိုင်ယုံကြည်မှုကို ပိုမိုတိုးတက်မြင့်မားစေပါလိမ့်မည်။");
        if (rahuHouse == 3 || ketuHouse == 3) findings.add(en
                ? "Rahu or Ketu occupies the 3rd house, supporting courage to act independently and confront unfamiliar situations."
                : "ရာဟု သို့မဟုတ် ကိတ်ဂြိုဟ်သည် ၃ တန့်ဘာဝတွင် တည်ရှိနေသဖြင့် ကိုယ်တိုင်ရဲရဲဝံ့ဝံ့ ဆုံးဖြတ်ချက်ချ လုပ်ဆောင်နိုင်သည့် သတ္တိနှင့် မိမိအတွက် မရင်းနှီးဆန်းသစ်သော အခြေအနေဆိုးများကို ရဲရင့်စွာ ရင်ဆိုင်ကျော်လွှားနိုင်စွမ်းရှိစေရန် အားပေးကူညီပါသည်။");
        var thirdSign = (asc + 2) % 12;
        if (zodiacSign(planets[0]) == thirdSign && zodiacSign(planets[2]) == thirdSign
                && zodiacSign(planets[lord3]) == thirdSign) findings.add(en
                ? "The Sun, Mars and 3rd lord unite in the 3rd house, giving notable initiative, courage and determination in difficult tasks."
                : "တနင်္ဂနွေ၊ အင်္ဂါနှင့် ၃ တန့်သခင်တို့သည် ၃ တန့်ဘာဝတွင် အတူတကွ ပူးယှဉ်တည်ရှိနေသဖြင့် ခက်ခဲကြမ်းတမ်းသော အလုပ်များကို ရဲဝံ့စွာ စတင်ရင်ဆိုင်နိုင်သည့် သတ္တိ၊ ဇွဲလုံ့လ ဝီရိယနှင့် ခိုင်မာပြတ်သားသော ဆုံးဖြတ်ချက်ချနိုင်မှုတို့ သိသာထင်ရှားစွာ ပေါ်လွင်နေပါလိမ့်မည်။");
        var lord10House = relativeHouse(zodiacSign(planets[lord10]), asc);
        if (zodiacSign(planets[lord10]) == zodiacSign(planets[4])) findings.add(en
                ? "The 10th lord joins Jupiter, supporting ethical reflection, respect for learning and a principled approach to public responsibilities."
                : "၁၀ တန့်သခင်သည် ကြာသပတေးဂြိုဟ်နှင့် ပူးယှဉ်တည်ရှိနေသဖြင့် အကျင့်သီလနှင့် ကျင့်ဝတ်ပိုင်းဆိုင်ရာ ဆင်ခြင်သုံးသပ်ခြင်း၊ ပညာရပ်များကို တန်ဖိုးထားလေးစားခြင်းနှင့် လူမှုရေး တာဝန်ဝတ္တရားများကို ကိုယ်ပိုင်မူဝါဒ ခိုင်ခိုင်မာမာဖြင့် စနစ်တကျ အကောင်အထည်ဖော် ဆောင်ရွက်နိုင်စွမ်းတို့ကို အားပေးဖြစ်ထွန်းစေပါသည်။");
        if ((lord10House == 6 || lord10House == 12) && zodiacSign(planets[lord10]) != zodiacSign(planets[4])) findings.add(en
                ? "The 10th lord occupies the 6th or 12th house without Jupiter's conjunction. Beliefs about duty and authority may be questioned; independent study helps form a mature personal philosophy."
                : "၁၀ တန့်သခင်သည် ၆ သို့မဟုတ် ၁၂ တန့်ဘာဝတွင် တည်ရှိနေပြီး ကြာသပတေးဂြိုဟ်နှင့်လည်း ပူးယှဉ်ခြင်း မရှိသဖြင့် လူမှုရေးတာဝန်ဝတ္တရားများ၊ အုပ်ချုပ်မှုအာဏာနှင့် ဘဝယုံကြည်ချက်များကို ကိုယ်တိုင် သံသယဖြစ်ကာ မေးခွန်းထုတ်တတ်ပါသည်။ သို့သော်လည်း အရာရာကို ကိုယ်တိုင်ဆင်ခြင်လေ့လာခြင်းအားဖြင့် ရင့်ကျက်ကောင်းမွန်သော ကိုယ်ပိုင်အမြင်နှင့် အတွေးအခေါ်ကို ကောင်းစွာတည်ဆောက်နိုင်ပါလိမ့်မည်။");

        if (findings.isEmpty()) return;
        appendReadingFindings(reading, findings);
    
}
function appendVitalityAndEyeReading(reading,planets,cusps,en) {

        var asc = zodiacSign(cusps[1]);
        var ascLord = signRuler(asc);
        var lord3 = signRuler((asc + 2) % 12);
        var lord8 = signRuler((asc + 7) % 12);
        var ascLordSign = zodiacSign(planets[ascLord]);
        var vitality = [];
        var eyeCare = [];

        var ascLordStrong = isOwnOrExalted(ascLord, ascLordSign)
                || isFriendlySign(ascLord, ascLordSign)
                || isMoolatrikona(ascLord, ascLordSign, normalize(planets[ascLord]) % 30.0);
        var thirdLordStrong = isOwnOrExalted(lord3, zodiacSign(planets[lord3]));
        var eighthLordStrong = isOwnOrExalted(lord8, zodiacSign(planets[lord8]));
        var saturnStrong = isOwnOrExalted(6, zodiacSign(planets[6]));

        if (ascLordStrong) vitality.add(en
                ? "The Ascendant lord has good sign strength, supporting physical resilience and sustained life force."
                : "လဂ်သခင်ဂြိုဟ်သည် ရာသီအလိုက် အင်အားတောင့်တင်းသဖြင့် ကိုယ်ခန္ဓာ၏ ကြံ့ခိုင်ခံနိုင်ရည်နှင့် ရေရှည်တည်တံ့သော ဘဝရှင်သန်မှုအင်အားကို အထူးပင် အထောက်အပံ့ပြုပါသည်။");
        if (thirdLordStrong && eighthLordStrong && saturnStrong) vitality.add(en
                ? "The 3rd lord, 8th lord and Saturn are all strongly placed, giving a notable combination for endurance and recovery from prolonged challenges."
                : "၃ တန့်သခင်၊ ၈ တန့်သခင်နှင့် သက်တမ်းကာရက စနေဂြိုဟ်တို့ အားလုံး အင်အားတောင့်တင်းစွာ တည်ရှိနေကြသဖြင့် ရေရှည်ခံနိုင်ရည်ရှိခြင်းနှင့် ကြာရှည်လှသော စိန်ခေါ်မှုများ၊ အခက်အခဲများမှ လျင်မြန်စွာ ပြန်လည်နာလန်ထူနိုင်စွမ်းရှိခြင်း စသည့် ထူးခြားသော အကျိုးကျေးဇူးများကို ရရှိစေပါလိမ့်မည်။");
        if (zodiacSign(planets[lord8]) == zodiacSign(planets[6])) vitality.add(en
                ? "The 8th lord joins Saturn, traditionally strengthening endurance, patience and survival through difficult periods."
                : "၈ တန့်သခင်နှင့် စနေဂြိုဟ်တို့သည် ဘာဝတစ်ခုတည်းတွင် ပူးယှဉ်တည်ရှိနေသဖြင့် ကြမ်းတမ်းခက်ခဲသော ကာလများကို စိတ်ရှည်သည်းခံပြီး ကြံ့ကြံ့ခံ ကျော်လွှားလွတ်မြောက်နိုင်သည့် ရေရှည်ခံနိုင်ရည်စွမ်းအားကို ပိုမိုတိုးတက်ကောင်းမွန်စေပါလိမ့်မည်။");

        var assessmentPlanets = [1, 3, 4, 5, ascLord];
        var houseGroups = Array(3).fill(0);
        for (let planet of assessmentPlanets) {
            var house = relativeHouse(zodiacSign(planets[planet]), asc);
            if (house == 1 || house == 4 || house == 7 || house == 10) houseGroups[0]++;
            else if (house == 2 || house == 5 || house == 8 || house == 11) houseGroups[1]++;
            else houseGroups[2]++;
        }
        var dominantGroup = dominantCategory(houseGroups);
        if (dominantGroup == 0) vitality.add(en
                ? "Benefics and the Ascendant lord predominantly occupy angular houses, indicating a strong reserve of vitality and support during major life transitions."
                : "သောမဂြိုဟ်များနှင့် လဂ်သခင်တို့သည် ကိန်းဘာဝ (အဓိကကျသော အခြေစိုက်ဘာဝများ) တွင် အများစု တည်ရှိနေကြသဖြင့် ကိုယ်ခန္ဓာ၏ ရှင်သန်မှုအင်အား အရင်းအမြစ် အထူးကောင်းမွန်ပြီး၊ ဘဝ၏ အလှည့်အပြောင်းကြီးများတွင် အကူအညီနှင့် အထောက်အပံ့ကောင်းများ ရရှိနိုင်ပါသည်။");
        else if (dominantGroup == 1) vitality.add(en
                ? "Benefics and the Ascendant lord predominantly occupy succedent houses, indicating moderate but steady reserves that improve through consistent habits."
                : "သောမဂြိုဟ်များနှင့် လဂ်သခင်တို့သည် ပါဏဖရဘာဝ (ကိန်းဘာဝနောက်၌ ကပ်လျက်ရှိသော ဘာဝများ) တွင် အများစု တည်ရှိနေကြသဖြင့် ကိုယ်ခန္ဓာစွမ်းအားမှာ အလယ်အလတ်အဆင့်တွင် တည်ငြိမ်မှုရှိပြီး၊ မိမိ၏ စနစ်ကျသော နေ့စဉ်အလေ့အကျင့်ကောင်းများကြောင့် ပိုမိုခိုင်မာအားကောင်းလာနိုင်ပါသည်။");
        else if (dominantGroup == 2) vitality.add(en
                ? "Benefics and the Ascendant lord predominantly occupy cadent houses. Energy can vary with circumstances, making pacing, rest and regular routines especially valuable."
                : "သောမဂြိုဟ်များနှင့် လဂ်သခင်တို့သည် အာပေါကလိမဘာဝ (ဖိစီးမှုဒဏ်မခံနိုင်သော ဘာဝများ) တွင် အများစု တည်ရှိနေကြသဖြင့် ပတ်ဝန်းကျင်အခြေအနေအလိုက် ကိုယ်ခန္ဓာစွမ်းအား အတက်အကျ ရှိနေတတ်ပါသည်။ ထို့ကြောင့် လုပ်ငန်းခွင်တွင် အရှိန်အဟုန်ကို မျှတစွာညှိနှိုင်းခြင်း၊ လုံလောက်စွာ အနားယူခြင်းနှင့် နေ့စဉ်အစီအစဉ်များ မှန်ကန်စေရန် ဂရုစိုက်ခြင်းတို့က အထူးပင် အကျိုးပြုပါလိမ့်မည်။");

        var sunHouse = relativeHouse(zodiacSign(planets[0]), asc);
        var moonHouse = relativeHouse(zodiacSign(planets[1]), asc);
        var sunAfflicted = planetConjoinsOrAspects(2, 0, planets) || planetConjoinsOrAspects(6, 0, planets);
        var moonAfflicted = planetConjoinsOrAspects(2, 1, planets) || planetConjoinsOrAspects(6, 1, planets);
        if ((sunHouse == 6 || sunHouse == 8 || sunHouse == 12) && sunAfflicted) eyeCare.add(en
                ? "The Sun, associated with the right eye, occupies a difficult house under Mars or Saturn influence. Regular attention to eye strain, lighting and vision checks is favoured."
                : "ညာဘက်မျက်စိကို ကိုယ်စားပြုသော တနင်္ဂနွေဂြိုဟ်သည် ဒုဌာနဘာဝ (၆၊ ၈၊ ၁၂ ဘာဝများ) တွင် တည်ရှိနေပြီး အင်္ဂါ သို့မဟုတ် စနေဂြိုဟ်၏ လွှမ်းမိုးမှုကို ခံထားရသဖြင့် မျက်စိညောင်းညာပင်ပန်းမှု၊ စာဖတ်လုပ်ငန်းခွင်သုံး အလင်းရောင် အသုံးပြုပုံနှင့် အမြင်အာရုံစစ်ဆေးမှုတို့ကို ပုံမှန်ဂရုပြုပေးသင့်ပါသည်။");
        if ((moonHouse == 6 || moonHouse == 8 || moonHouse == 12) && moonAfflicted) eyeCare.add(en
                ? "The Moon, associated with the left eye, occupies a difficult house under Mars or Saturn influence. Avoiding prolonged visual strain and maintaining routine eye care is beneficial."
                : "ဘယ်ဘက်မျက်စိကို ကိုယ်စားပြုသော စန်း (တနင်္လာဂြိုဟ်) သည် ဒုဌာနဘာဝ (၆၊ ၈၊ ၁၂ ဘာဝများ) တွင် တည်ရှိနေပြီး အင်္ဂါ သို့မဟုတ် စနေဂြိုဟ်၏ လွှမ်းမိုးမှုကို ခံထားရသဖြင့် အချိန်ကြာမြင့်စွာ မျက်စိအားစိုက်ရခြင်းကို အတတ်နိုင်ဆုံး လျှော့ချပြီး စနစ်တကျ ပုံမှန်မျက်စိစောင့်ရှောက်မှုများ ပြုလုပ်ပေးသင့်ပါသည်။");
        if (asc == 4 && zodiacSign(planets[0]) == asc && zodiacSign(planets[1]) == asc
                && (anyPlanetConjoinsOrAspectsSign([2, 6], asc, planets))) eyeCare.add(en
                ? "For Leo Ascendant, the Sun and Moon unite in the Ascendant under Mars or Saturn influence. Eye protection and timely vision assessment deserve particular attention."
                : "သိဟ်လဂ်တွင် တနင်္ဂနွေဂြိုဟ်နှင့် စန်း (တနင်္လာဂြိုဟ်) တို့ ပူးယှဉ်တည်ရှိပြီး အင်္ဂါ သို့မဟုတ် စနေဂြိုဟ်၏ လွှမ်းမိုးမှုကို ရရှိထားသဖြင့် မျက်စိကို ထိခိုက်ဒဏ်ရာများမှ ကာကွယ်ခြင်းနှင့် အမြင်အာရုံစစ်ဆေးခြင်းတို့ကို အထူးပင် ဂရုစိုက်ဆောင်ရွက်သင့်ပါသည်။");
        var jupiterProtectsAsc = zodiacSign(planets[4]) == asc
                || planetAspectsSign(4, zodiacSign(planets[4]), asc);
        if (asc == 4 && (zodiacSign(planets[5]) == asc || zodiacSign(planets[6]) == asc)
                && !jupiterProtectsAsc) eyeCare.add(en
                ? "Venus or Saturn occupies Leo Ascendant without Jupiter's clear support. Consistent preventive eye care is advisable."
                : "သိဟ်လဂ်တွင် သောကြာ သို့မဟုတ် စနေဂြိုဟ် တည်ရှိနေပြီး ကြာသပတေးဂြိုဟ်၏ ကာကွယ်စောင့်ရှောက်မှု အားနည်းနေသဖြင့် မျက်စိကျန်းမာရေးကို ထိခိုက်မှုမရှိစေရန် ကြိုတင်ကာကွယ်စောင့်ရှောက်မှုများ ပုံမှန်ပြုလုပ်ပေးသင့်ပါသည်။");

        appendReadingFindings(reading, vitality);
        appendReadingFindings(reading, eyeCare);
    
}
function appendDashaTransitHealthWindows(reading,natalPlanets,cusps,en) {

        if (currentVargaHelper == null || readingBirthYear <= 0 || natalPlanets.length < 9) return;

        var ascSign = zodiacSign(cusps[1]);
        var ascLord = signRuler(ascSign);
        var lord2 = signRuler((ascSign + 1) % 12);
        var lord4 = signRuler((ascSign + 3) % 12);
        var lord8 = signRuler((ascSign + 7) % 12);
        var lord11 = signRuler((ascSign + 10) % 12);
        var tz = readingTimeZone;
        if (isNaN(tz) || tz < -12 || tz > 14) tz = 6.5;

        var mahaPeriods = buildMahaDashaPeriods(
                readingBirthDay, readingBirthMonth, readingBirthYear, natalPlanets[1]);
        var windows = [];
        var day = forecastAnchorDate();
        day.add(Calendar.MONTH, -6);
        var lastDay = forecastAnchorDate();
        lastDay.add(Calendar.YEAR, 1);

        var cachedMaha = null;
        var cachedBhukti = null;
        var cachedBhuktis = [];
        var cachedAntaras = [];
        while (!day.after(lastDay)) {
            if (false) return;
            var maha = findCurrentPeriod(mahaPeriods, day);
            if (maha == null) {
                day.add(Calendar.DAY_OF_YEAR, 1);
                continue;
            }
            if (cachedMaha != maha) {
                cachedMaha = maha;
                var fullYears = DASHA_YEARS[maha.lordIndex];
                cachedBhuktis = buildSubPeriods(maha.lordIndex, maha.start, maha.activeYears, fullYears);
            }
            var bhukti = findCurrentPeriod(cachedBhuktis, day);
            if (bhukti == null) {
                day.add(Calendar.DAY_OF_YEAR, 1);
                continue;
            }
            if (cachedBhukti != bhukti) {
                cachedBhukti = bhukti;
                var fullBhuktiYears = DASHA_YEARS[maha.lordIndex]
                        * DASHA_YEARS[bhukti.lordIndex] / 120.0;
                cachedAntaras = buildSubPeriods(bhukti.lordIndex, bhukti.start,
                        bhukti.activeYears, fullBhuktiYears);
            }
            var antara = findCurrentPeriod(cachedAntaras, day);
            if (antara == null) {
                day.add(Calendar.DAY_OF_YEAR, 1);
                continue;
            }
            activeForecastAntaraLord = antara.lordIndex;
            activeForecastAntaraPlanet = dashaLordToPlanetIndex(antara.lordIndex);

            var jd = currentVargaHelper.getJulianDay(
                    day.get(Calendar.YEAR), day.get(Calendar.MONTH) + 1,
                    day.get(Calendar.DAY_OF_MONTH), 12, 0, 0.0, tz);
            var transitMars = normalize(currentVargaHelper.getPlanetLongitude(jd, SweConst.SE_MARS));
            var transitSaturn = normalize(currentVargaHelper.getPlanetLongitude(jd, SweConst.SE_SATURN));
            var transitRahu = normalize(currentVargaHelper.getPlanetLongitude(jd, SweConst.SE_MEAN_NODE));

            var contactedPlanets = [];
            var baseContacts = 0;
            if (transitTouches(transitMars, cusps[1], 2, 2.5)) baseContacts++;
            var basePlanetTargets = [ascLord, 0, 1, lord8, 2, 6];
            for (let target of basePlanetTargets) {
                if (transitTouches(transitMars, natalPlanets[target], 2, 2.5)) {
                    baseContacts++;
                    contactedPlanets.add(target);
                }
            }
            if (transitTouches(transitMars, cusps[8], 2, 2.5)) baseContacts++;

            var mahaPlanet = dashaLordToPlanetIndex(maha.lordIndex);
            var bhuktiPlanet = dashaLordToPlanetIndex(bhukti.lordIndex);
            var dashaMatches = dashaActivatesTransitRisk(mahaPlanet, contactedPlanets, ascLord, lord8)
                    && dashaActivatesTransitRisk(bhuktiPlanet, contactedPlanets, ascLord, lord8)
                    && dashaActivatesTransitRisk(activeForecastAntaraPlanet,
                    contactedPlanets, ascLord, lord8);
            if (baseContacts == 0 || !dashaMatches) {
                day.add(Calendar.DAY_OF_YEAR, 1);
                continue;
            }

            var vehicle = transitTouches(transitMars, cusps[4], 2, 2.5)
                    || transitTouches(transitMars, natalPlanets[lord4], 2, 2.5);
            var saturnPressure = transitTouchesAnyBase(transitSaturn, natalPlanets, cusps,
                    ascLord, lord8, 6, 3.0);
            var rahuPressure = transitTouchesAnyBase(transitRahu, natalPlanets, cusps,
                    ascLord, lord8, 7, 3.0);
            var financial = (saturnPressure || rahuPressure)
                    && (transitTouches(transitSaturn, cusps[2], 6, 3.0)
                    || transitTouches(transitSaturn, natalPlanets[lord2], 6, 3.0)
                    || transitTouches(transitSaturn, cusps[11], 6, 3.0)
                    || transitTouches(transitSaturn, natalPlanets[lord11], 6, 3.0)
                    || transitTouches(transitRahu, cusps[2], 7, 3.0)
                    || transitTouches(transitRahu, natalPlanets[lord2], 7, 3.0)
                    || transitTouches(transitRahu, cusps[11], 7, 3.0)
                    || transitTouches(transitRahu, natalPlanets[lord11], 7, 3.0));
            var eighthAfflicted = transitTouches(transitMars, cusps[8], 2, 2.5)
                    || transitTouches(transitSaturn, cusps[8], 6, 3.0)
                    || transitTouches(transitRahu, cusps[8], 7, 3.0);
            var transitAscLord = normalize(currentVargaHelper.getPlanetLongitude(
                    jd, PLANET_SWISS_IDS[ascLord]));
            var highCaution = baseContacts >= 4
                    || (isDebilitatedSign(ascLord, zodiacSign(transitAscLord)) && eighthAfflicted);

            addOrExtendTransitWindow(windows, day, maha.lordIndex, bhukti.lordIndex,
                    baseContacts, vehicle, saturnPressure || rahuPressure, financial, highCaution);
            day.add(Calendar.DAY_OF_YEAR, 1);
        }

        appendReadingHeading(reading, en
                ? "Dasha and Transit-aligned Caution Periods"
                : "ဒသာနှင့် ကောဇာကိုက်ညီသော သတိပြုကာလများ");
        if (appendNoAlignedPeriodNotice(reading, windows.isEmpty(), en)) return;
        var groupedWindows = Array(windows.length).fill(false);
        for (var i = 0; i < windows.length; i++) {
            if (groupedWindows[i]) continue;
            var window = windows[i];
            var text = new StringBuilder(en
                    ? "During the following periods, Mars transit and the active Dasha align. Take extra care with injury, conflict, inflammation and procedures."
                    : "အောက်ပါကာလများတွင် အင်္ဂါဂြိုဟ်၏ ကောဇာဂြိုဟ်စီးမှုနှင့် သက်ရောက်နေသော ဒသာတို့ တိုက်ဆိုင်နေပါသည်။ ထို့ကြောင့် ထိခိုက်ဒဏ်ရာရခြင်း၊ ခိုက်ရန်ဖြစ်ပွားခြင်း၊ ကိုယ်ခန္ဓာရောင်ရမ်းနာကျင်ခြင်းနှင့် ခွဲစိတ်ကုသမှုဆိုင်ရာ ကိစ္စရပ်များတွင် ပိုမို၍ အထူးသတိပြု ဆင်ခြင်သင့်ပါသည်။");
            if (window.vehicle) text.append(en
                    ? " Travel, driving and vehicle safety need particular attention."
                    : " ခရီးသွားလာခြင်း၊ ကိုယ်တိုင်ယာဉ်မောင်းနှင်ခြင်းနှင့် သွားလာရေးယာဉ်များ၏ လုံခြုံဘေးကင်းမှုတို့ကို အထူးပင် ဂရုစိုက်သင့်ပါသည်။");
            if (window.pressure) text.append(en
                    ? " Saturn or Rahu adds pressure, so recovery may feel slower than usual."
                    : " စနေ သို့မဟုတ် ရာဟုဂြိုဟ်များပါ ပူးပေါင်းသက်ရောက်နေသဖြင့် စိတ်ဖိစီးမှုများပြားတတ်ပြီး၊ ဖျားနာမှုများဖြစ်ပွားပါက ပြန်လည်ကျန်းမာလာစေရန်အတွက် ပုံမှန်ထက် အချိန်ပိုပေးရတတ်ပါသည်။");
            if (window.financial) text.append(en
                    ? " Keep a reserve for unexpected medical, travel or repair costs."
                    : " မမျှော်လင့်ဘဲ ပေါ်ပေါက်လာတတ်သော ဆေးကုသစရိတ်၊ ခရီးစရိတ် သို့မဟုတ် ပစ္စည်းပြုပြင်စရိတ်များအတွက် ငွေကြေးအရန်အဖြစ် ကြိုတင်ဖယ်ချန်ထားရှိသင့်ပါသည်။");
            if (window.highCaution) text.append(en
                    ? " Persistent or severe symptoms should receive prompt professional medical assessment."
                    : " ဝေဒနာမှာ ပိုမိုပြင်းထန်လာခြင်း သို့မဟုတ် ကြာရှည်စွာ မသက်သာဘဲဖြစ်နေခြင်းမျိုး ကြုံတွေ့ရပါက ဆေးဘက်ဆိုင်ရာ ကျွမ်းကျင်သူများနှင့် အမြန်ဆုံး စစ်ဆေးပြသကုသမှု ခံယူသင့်ပါသည်။");
            var periods = 0;
            for (var match = i; match < windows.length; match++) {
                var candidate = windows[match];
                if (groupedWindows[match] || candidate.vehicle != window.vehicle
                        || candidate.pressure != window.pressure || candidate.financial != window.financial
                        || candidate.highCaution != window.highCaution) continue;
                groupedWindows[match] = true;
                if (periods < 12) {
                    text.append(formatDashaForecastPeriod(candidate.mahaLord,
                            candidate.bhuktiLord, candidate.antaraLord,
                            candidate.start, candidate.end));
                    periods++;
                }
            }
            appendReadingBullet(reading, text.toString());
        }
    
}
function dashaActivatesTransitRisk(planet,contactedPlanets,ascLord,lord8) {

        return contactedPlanets.contains(planet) || planet == ascLord || planet == lord8
                || planet == 2 || planet == 6 || planet == 7;
    
}
function transitTouchesAnyBase(transitLongitude,natalPlanets,cusps,ascLord,lord8,transitPlanet,orb) {

        if (transitTouches(transitLongitude, cusps[1], transitPlanet, orb)
                || transitTouches(transitLongitude, cusps[8], transitPlanet, orb)) return true;
        for (let target of [ascLord, 0, 1, lord8, 2, 6]) {
            if (transitTouches(transitLongitude, natalPlanets[target], transitPlanet, orb)) return true;
        }
        return false;
    
}
function transitTouches(transitLongitude,natalLongitude,transitPlanet,orb) {

        var aspects;
        if (transitPlanet == 2) aspects = [0, 90, 180, 210];
        else if (transitPlanet == 4) aspects = [0, 120, 180, 240];
        else if (transitPlanet == 6) aspects = [0, 60, 180, 270];
        else if (transitPlanet == 7) aspects = [0, 120, 180, 240];
        else aspects = [0, 180];
        var separation = normalize(natalLongitude - transitLongitude);
        for (let aspect of aspects) {
            var difference = Math.abs(separation - aspect);
            difference = Math.min(difference, 360.0 - difference);
            if (difference <= orb) return true;
        }
        return false;
    
}
function addOrExtendTransitWindow(windows,day,mahaLord,bhuktiLord,contacts,vehicle,pressure,financial,highCaution) {

        var last = windows.isEmpty() ? null : windows.get(windows.length - 1);
        var expected = last == null ? null : last.end.clone();
        if (expected != null) expected.add(Calendar.DAY_OF_YEAR, 1);
        if (last != null && expected.get(Calendar.YEAR) == day.get(Calendar.YEAR)
                && expected.get(Calendar.DAY_OF_YEAR) == day.get(Calendar.DAY_OF_YEAR)
                && last.mahaLord == mahaLord && last.bhuktiLord == bhuktiLord
                && last.antaraLord == activeForecastAntaraLord) {
            last.end = day.clone();
            last.maxContacts = Math.max(last.maxContacts, contacts);
            last.vehicle |= vehicle;
            last.pressure |= pressure;
            last.financial |= financial;
            last.highCaution |= highCaution;
            return;
        }
        windows.add(new TransitHealthWindow(day, mahaLord, bhuktiLord,
                activeForecastAntaraLord, contacts,
                vehicle, pressure, financial, highCaution));
    
}
function appendDashaTransitCriticalHealthWindows(reading,natalPlanets,cusps,en) {

        if (currentVargaHelper == null || readingBirthYear <= 0 || natalPlanets.length < 9) return;
        var ascSign = zodiacSign(cusps[1]);
        var ascLord = signRuler(ascSign);
        var healthHouses = [6, 7, 8, 12];
        var healthLords = Array(healthHouses.length).fill(0);
        for (var i = 0; i < healthHouses.length; i++) {
            healthLords[i] = signRuler((ascSign + healthHouses[i] - 1) % 12);
        }
        var tz = readingTimeZone;
        if (isNaN(tz) || tz < -12 || tz > 14) tz = 6.5;

        var mahaPeriods = buildMahaDashaPeriods(
                readingBirthDay, readingBirthMonth, readingBirthYear, natalPlanets[1]);
        var windows = [];
        var day = forecastAnchorDate();
        day.add(Calendar.MONTH, -6);
        var lastDay = forecastAnchorDate();
        lastDay.add(Calendar.YEAR, 1);

        var cachedMaha = null;
        var cachedBhukti = null;
        var cachedBhuktis = [];
        var cachedAntaras = [];
        while (!day.after(lastDay)) {
            if (false) return;
            var maha = findCurrentPeriod(mahaPeriods, day);
            if (maha == null) {
                day.add(Calendar.DAY_OF_YEAR, 1);
                continue;
            }
            if (cachedMaha != maha) {
                cachedMaha = maha;
                cachedBhuktis = buildSubPeriods(maha.lordIndex, maha.start, maha.activeYears,
                        DASHA_YEARS[maha.lordIndex]);
            }
            var bhukti = findCurrentPeriod(cachedBhuktis, day);
            if (bhukti == null) {
                day.add(Calendar.DAY_OF_YEAR, 1);
                continue;
            }
            if (cachedBhukti != bhukti) {
                cachedBhukti = bhukti;
                var fullBhuktiYears = DASHA_YEARS[maha.lordIndex]
                        * DASHA_YEARS[bhukti.lordIndex] / 120.0;
                cachedAntaras = buildSubPeriods(bhukti.lordIndex, bhukti.start,
                        bhukti.activeYears, fullBhuktiYears);
            }
            var antara = findCurrentPeriod(cachedAntaras, day);
            if (antara == null) {
                day.add(Calendar.DAY_OF_YEAR, 1);
                continue;
            }
            activeForecastAntaraLord = antara.lordIndex;
            activeForecastAntaraPlanet = dashaLordToPlanetIndex(antara.lordIndex);

            var jd = currentVargaHelper.getJulianDay(day.get(Calendar.YEAR),
                    day.get(Calendar.MONTH) + 1, day.get(Calendar.DAY_OF_MONTH),
                    12, 0, 0.0, tz);
            var mars = normalize(currentVargaHelper.getPlanetLongitude(jd, SweConst.SE_MARS));
            var saturn = normalize(currentVargaHelper.getPlanetLongitude(jd, SweConst.SE_SATURN));
            var rahu = normalize(currentVargaHelper.getPlanetLongitude(jd, SweConst.SE_MEAN_NODE));
            var jupiter = normalize(currentVargaHelper.getPlanetLongitude(jd, SweConst.SE_JUPITER));

            var maleficContacts = [];
            var marsContacts = countTransitHealthContacts(mars, 2, 2.5, natalPlanets, cusps,
                    ascLord, healthHouses, healthLords, maleficContacts);
            var saturnContacts = countTransitHealthContacts(saturn, 6, 3.0, natalPlanets, cusps,
                    ascLord, healthHouses, healthLords, maleficContacts);
            var rahuContacts = countTransitHealthContacts(rahu, 7, 3.0, natalPlanets, cusps,
                    ascLord, healthHouses, healthLords, maleficContacts);
            var activeMalefics = (marsContacts > 0 ? 1 : 0)
                    + (saturnContacts > 0 ? 1 : 0) + (rahuContacts > 0 ? 1 : 0);
            var totalMaleficContacts = marsContacts + saturnContacts + rahuContacts;

            var jupiterContacts = [];
            var jupiterSupport = countTransitHealthContacts(jupiter, 4, 3.0, natalPlanets, cusps,
                    ascLord, healthHouses, healthLords, jupiterContacts);
            var mahaPlanet = dashaLordToPlanetIndex(maha.lordIndex);
            var bhuktiPlanet = dashaLordToPlanetIndex(bhukti.lordIndex);
            var riskDasha = dashaMatchesHealthContacts(mahaPlanet, bhuktiPlanet,
                    activeForecastAntaraPlanet,
                    maleficContacts, ascLord, true);
            var supportDasha = dashaMatchesHealthContacts(mahaPlanet, bhuktiPlanet,
                    activeForecastAntaraPlanet,
                    jupiterContacts, ascLord, false);

            var caution = activeMalefics >= 2 && totalMaleficContacts >= 3 && riskDasha;
            var recovery = jupiterSupport >= 2 && supportDasha;
            if (caution || recovery) {
                addOrExtendCriticalHealthWindow(windows, day, maha.lordIndex, bhukti.lordIndex,
                        caution, recovery, totalMaleficContacts, jupiterSupport);
            }
            day.add(Calendar.DAY_OF_YEAR, 1);
        }

        appendReadingHeading(reading, en
                ? "Serious Health Caution and Recovery Periods"
                : "ပြင်းထန်သော ကျန်းမာရေးသတိပြုမှုနှင့် ပြန်လည်ကောင်းမွန်ရေးကာလများ");
        if (appendNoAlignedPeriodNotice(reading, windows.isEmpty(), en)) return;
        var groupedWindows = Array(windows.length).fill(false);
        for (var i = 0; i < windows.length; i++) {
            if (groupedWindows[i]) continue;
            var window = windows[i];
            var text = new StringBuilder(combinedForecastLead(en));
            if (window.caution) text.append(en
                    ? "The active Dasha aligns with concentrated Mars, Saturn or Rahu influence on health-sensitive houses and natal points. This is a higher-caution period for illness, exhaustion, accidents or sudden health complications. Reduce avoidable risk and seek prompt medical assessment for persistent or severe symptoms."
                    : "လက်ရှိရောက်ရှိနေသော ဒသာသက်ရောက်မှုနှင့် အင်္ဂါ၊ စနေ၊ ရာဟုဂြိုဟ်တို့၏ ကောဇာစီးမှုများသည် ကျန်းမာရေးနှင့် သက်ဆိုင်သော ဘာဝများ၊ မူလဇာတာပါ ထိလွယ်ရှလွယ်သော ဂြိုဟ်ရပ်တည်ချက်နေရာများကို ဖိအားပေးနေသည့် အချိန်ကာလနှင့် တိုက်ဆိုင်နေပါသည်။ ထို့ကြောင့် ဤကာလအတွင်း နာမကျန်းဖြစ်ခြင်း၊ အားအင်ကုန်ခမ်းနွမ်းလျခြင်း၊ မတော်တဆ ထိခိုက်မှုဖြစ်ပွားခြင်းနှင့် ရုတ်တရက် ကျန်းမာရေးပြဿနာ ပေါ်ပေါက်ခြင်းတို့ကို ပိုမိုအထူးသတိပြုသင့်ပါသည်။ မလိုအပ်ဘဲ ဖြစ်ပေါ်လာနိုင်သည့် အန္တရာယ်များကို ကြိုတင်လျှော့ချထားရန်နှင့် ရောဂါဝေဒနာ လက္ခဏာများ ပြင်းထန်လာခြင်း သို့မဟုတ် ကြာရှည်စွာ မသက်သာခြင်းမျိုး ရှိပါက ဆေးဘက်ဆိုင်ရာ ကျွမ်းကျင်သူများနှင့် အမြန်ဆုံး စစ်ဆေးကုသမှု ခံယူသင့်ပါသည်။");
            if (window.jupiterSupport) text.append(en
                    ? (window.caution ? " Jupiter also provides a protective influence, improving the chance of timely help, diagnosis and recovery when proper care is taken."
                       : "The active Dasha aligns with Jupiter's protective transit. Treatment, professional support, recovery and preventive care are better supported during this period.")
                    : (window.caution ? " သို့သော်လည်း တစ်ချိန်တည်းမှာပင် ကြာသပတေးဂြိုဟ်၏ ကာကွယ်စောင့်ရှောက်မှု လွှမ်းမိုးအားပါ ရှိနေသဖြင့် စနစ်တကျ ကုသမှုခံယူပါက အချိန်မီ အကူအညီရရှိခြင်း၊ ရောဂါရှာဖွေတွေ့ရှိမှု တိကျမှန်ကန်ခြင်းနှင့် လျင်မြန်စွာ ပြန်လည်ကောင်းမွန်လာခြင်းတို့ကို ပိုမိုအားပေးကူညီပါလိမ့်မည်။"
                       : "လက်ရှိရောက်ရှိနေသော ဒသာသက်ရောက်မှုနှင့် ကြာသပတေးဂြိုဟ် ကောဇာစီးမှု၏ ကာကွယ်စောင့်ရှောက်အားတို့ တိုက်ဆိုင်နေပါသည်။ ဤကာလအတွင်း ဆေးကုသမှု ခံယူခြင်း၊ ကျွမ်းကျင်သူများ၏ အကူအညီရယူခြင်း၊ ရောဂါဝေဒနာမှ ပြန်လည်နာလန်ထူလာခြင်းနှင့် ကြိုတင်ကာကွယ် စောင့်ရှောက်မှု ပြုလုပ်ခြင်းတို့ကို ပိုမိုကောင်းမွန်စွာ ထောက်ပံ့အားပေးပါလိမ့်မည်။"));
            var periods = 0;
            for (var match = i; match < windows.length; match++) {
                var candidate = windows[match];
                if (groupedWindows[match] || candidate.caution != window.caution
                        || candidate.jupiterSupport != window.jupiterSupport) continue;
                groupedWindows[match] = true;
                if (periods < 12) {
                    text.append(formatDashaForecastPeriod(candidate.mahaLord,
                            candidate.bhuktiLord, candidate.antaraLord,
                            candidate.start, candidate.end));
                    periods++;
                }
            }
            appendReadingBullet(reading, text.toString());
        }
    
}
function countTransitHealthContacts(transitLongitude,transitPlanet,orb,natalPlanets,cusps,ascLord,healthHouses,healthLords,contactedPlanets) {

        var contacts = 0;
        if (transitTouches(transitLongitude, cusps[1], transitPlanet, orb)) {
            contacts++;
            contactedPlanets.add(ascLord);
        }
        for (let target of [ascLord, 0, 1]) {
            if (transitTouches(transitLongitude, natalPlanets[target], transitPlanet, orb)) {
                contacts++;
                contactedPlanets.add(target);
            }
        }
        for (var i = 0; i < healthHouses.length; i++) {
            var house = healthHouses[i];
            var lord = healthLords[i];
            if (transitTouches(transitLongitude, cusps[house], transitPlanet, orb)) {
                contacts++;
                contactedPlanets.add(lord);
            }
            if (transitTouches(transitLongitude, natalPlanets[lord], transitPlanet, orb)) {
                contacts++;
                contactedPlanets.add(lord);
            }
        }
        return contacts;
    
}
function dashaMatchesHealthContacts(mahaPlanet,bhuktiPlanet,antaraPlanet,contactedPlanets,ascLord,includeMaleficTriggers) {

        return dashaLevelMatchesHealth(mahaPlanet, contactedPlanets, ascLord, includeMaleficTriggers)
                && dashaLevelMatchesHealth(bhuktiPlanet, contactedPlanets, ascLord,
                includeMaleficTriggers)
                && dashaLevelMatchesHealth(antaraPlanet, contactedPlanets, ascLord,
                includeMaleficTriggers);
    
}
function dashaLevelMatchesHealth(planet,contactedPlanets,ascLord,includeMaleficTriggers) {

        return contactedPlanets.contains(planet) || planet == ascLord
                || (includeMaleficTriggers && (planet == 2 || planet == 6 || planet == 7));
    
}
function addOrExtendCriticalHealthWindow(windows,day,mahaLord,bhuktiLord,caution,jupiterSupport,maleficContacts,supportContacts) {

        var last = windows.isEmpty() ? null : windows.get(windows.length - 1);
        var expected = last == null ? null : last.end.clone();
        if (expected != null) expected.add(Calendar.DAY_OF_YEAR, 1);
        if (last != null && expected.get(Calendar.YEAR) == day.get(Calendar.YEAR)
                && expected.get(Calendar.DAY_OF_YEAR) == day.get(Calendar.DAY_OF_YEAR)
                && last.mahaLord == mahaLord && last.bhuktiLord == bhuktiLord
                && last.antaraLord == activeForecastAntaraLord
                && last.caution == caution && last.jupiterSupport == jupiterSupport) {
            last.end = day.clone();
            last.maxMaleficContacts = Math.max(last.maxMaleficContacts, maleficContacts);
            last.maxSupportContacts = Math.max(last.maxSupportContacts, supportContacts);
            return;
        }
        windows.add(new CriticalHealthWindow(day, mahaLord, bhuktiLord,
                activeForecastAntaraLord, caution,
                jupiterSupport, maleficContacts, supportContacts));
    
}
function buildCategoryTransitForecasts(natal,cusps) {

        var result = new TransitForecastBundle();
        if (currentVargaHelper == null || readingBirthYear <= 0 || natal.length < 9) return result;
        var asc = zodiacSign(cusps[1]);
        var ascLord = signRuler(asc);
        var lord2 = signRuler((asc + 1) % 12);
        var lord3 = signRuler((asc + 2) % 12);
        var lord4 = signRuler((asc + 3) % 12);
        var lord5 = signRuler((asc + 4) % 12);
        var lord7 = signRuler((asc + 6) % 12);
        var lord8 = signRuler((asc + 7) % 12);
        var lord9 = signRuler((asc + 8) % 12);
        var lord10 = signRuler((asc + 9) % 12);
        var lord11 = signRuler((asc + 10) % 12);
        var lord12 = signRuler((asc + 11) % 12);
        var tz = readingTimeZone;
        if (isNaN(tz) || tz < -12 || tz > 14) tz = 6.5;
        var mahaPeriods = buildMahaDashaPeriods(
                readingBirthDay, readingBirthMonth, readingBirthYear, natal[1]);
        var day = forecastAnchorDate();
        day.add(Calendar.MONTH, -6);
        var lastDay = forecastAnchorDate();
        lastDay.add(Calendar.YEAR, 1);
        var cachedMaha = null;
        var cachedBhukti = null;
        var cachedBhuktis = [];
        var cachedAntaras = [];

        while (!day.after(lastDay)) {
            if (false) return result;
            var maha = findCurrentPeriod(mahaPeriods, day);
            if (maha == null) {
                day.add(Calendar.DAY_OF_YEAR, 1);
                continue;
            }
            if (cachedMaha != maha) {
                cachedMaha = maha;
                cachedBhuktis = buildSubPeriods(maha.lordIndex, maha.start, maha.activeYears,
                        DASHA_YEARS[maha.lordIndex]);
            }
            var bhukti = findCurrentPeriod(cachedBhuktis, day);
            if (bhukti == null) {
                day.add(Calendar.DAY_OF_YEAR, 1);
                continue;
            }
            if (cachedBhukti != bhukti) {
                cachedBhukti = bhukti;
                var fullBhuktiYears = DASHA_YEARS[maha.lordIndex]
                        * DASHA_YEARS[bhukti.lordIndex] / 120.0;
                cachedAntaras = buildSubPeriods(bhukti.lordIndex, bhukti.start,
                        bhukti.activeYears, fullBhuktiYears);
            }
            var antara = findCurrentPeriod(cachedAntaras, day);
            if (antara == null) {
                day.add(Calendar.DAY_OF_YEAR, 1);
                continue;
            }
            var jd = currentVargaHelper.getJulianDay(day.get(Calendar.YEAR),
                    day.get(Calendar.MONTH) + 1, day.get(Calendar.DAY_OF_MONTH),
                    12, 0, 0.0, tz);
            var transit = calculatePlanetLongitudes(currentVargaHelper, jd);
            var mahaPlanet = dashaLordToPlanetIndex(maha.lordIndex);
            var bhuktiPlanet = dashaLordToPlanetIndex(bhukti.lordIndex);
            activeForecastAntaraLord = antara.lordIndex;
            activeForecastAntaraPlanet = dashaLordToPlanetIndex(antara.lordIndex);

            var jupiterNatalEducation = transitTouches(transit[4], natal[4], 4, 3.0)
                    || transitTouches(transit[4], natal[3], 4, 3.0);
            var jupiterEducationHouse = touchesHouseOrLord(transit[4], 4, 3.0, natal, cusps,
                    [4, 5, 9], [lord4, lord5, lord9]);
            var mercuryEducation = transitTouches(transit[3], natal[4], 3, 2.0)
                    && touchesHouseOrLord(transit[3], 3, 2.0, natal, cusps,
                    [4, 5, 9], [lord4, lord5, lord9]);
            var educationSupport = (jupiterNatalEducation && jupiterEducationHouse)
                    || mercuryEducation;
            var educationDistinction = educationSupport
                    && (touchesHouseOrLord(transit[4], 4, 3.0, natal, cusps,
                    [10], [lord10])
                    || touchesHouseOrLord(transit[3], 3, 2.0, natal, cusps,
                    [10], [lord10]));
            var educationPressure = touchesHouseOrLord(transit[6], 6, 3.0, natal, cusps,
                    [2, 4, 9], [lord2, lord4, lord9])
                    || touchesHouseOrLord(transit[7], 7, 3.0, natal, cusps,
                    [2, 4, 9], [lord2, lord4, lord9]);
            var educationDasha = matchesEitherDasha(mahaPlanet, bhuktiPlanet,
                    3, 4, lord4, lord5, lord9, lord10);
            if (educationDasha && (educationSupport || educationPressure)) {
                addOrExtendCategoryWindow(result.education, day, maha.lordIndex, bhukti.lordIndex,
                        educationSupport, educationPressure, educationDistinction);
            }

            var marriageSupport = touchesHouseOrLord(transit[4], 4, 3.0, natal, cusps,
                    [7], [lord7])
                    || transitTouches(transit[4], natal[5], 4, 3.0);
            if (lord7 == 1 || lord7 == 3 || lord7 == 4 || lord7 == 5) {
                marriageSupport |= touchesHouseOrLord(transit[lord7], lord7, 2.5, natal, cusps,
                        [7], [lord7])
                        || transitTouches(transit[lord7], natal[5], lord7, 2.5);
            }
            var marriagePressure = false;
            for (let malefic of [2, 6, 7]) {
                marriagePressure |= touchesHouseOrLord(transit[malefic], malefic, 3.0, natal, cusps,
                        [7], [lord7])
                        || transitTouches(transit[malefic], natal[5], malefic, 3.0)
                        || transitTouches(transit[malefic], cusps[1], malefic, 3.0)
                        || transitTouches(transit[malefic], natal[ascLord], malefic, 3.0)
                        || transitTouches(transit[malefic], natal[1], malefic, 3.0);
            }
            marriagePressure |= touchesHouseOrLord(transit[6], 6, 3.0, natal, cusps,
                    [4], [lord4]);
            var marriageDasha = matchesEitherDasha(mahaPlanet, bhuktiPlanet,
                    4, 5, lord7, ascLord, 2, 6, 7);
            if (marriageDasha && (marriageSupport || marriagePressure)) {
                addOrExtendCategoryWindow(result.marriage, day, maha.lordIndex, bhukti.lordIndex,
                        marriageSupport, marriagePressure, false);
            }

            var foreignContacts = 0;
            if (transitTouches(transit[7], cusps[1], 7, 3.0)) foreignContacts++;
            for (let target of [ascLord, 7, 1, 0, lord8, lord12]) {
                if (transitTouches(transit[7], natal[target], 7, 3.0)) foreignContacts++;
            }
            if (transitTouches(transit[7], cusps[8], 7, 3.0)) foreignContacts++;
            if (transitTouches(transit[7], cusps[12], 7, 3.0)) foreignContacts++;
            var foreignDasha = matchesEitherDasha(mahaPlanet, bhuktiPlanet,
                    7, ascLord, lord8, lord12, 0, 1);
            if (foreignContacts >= 2 && foreignDasha) {
                addOrExtendCategoryWindow(result.foreign, day, maha.lordIndex, bhukti.lordIndex,
                        true, false, foreignContacts >= 4);
            }

            var careerSupport = touchesHouseOrLord(transit[4], 4, 3.0, natal, cusps,
                    [10], [lord10])
                    || transitTouches(transit[4], natal[0], 4, 3.0)
                    || touchesHouseOrLord(transit[0], 0, 2.0, natal, cusps,
                    [10], [lord10])
                    || touchesHouseOrLord(transit[3], 3, 2.0, natal, cusps,
                    [10], [lord10]);
            var careerPressure = false;
            var careerMalefics = 0;
            for (let malefic of [2, 6, 7]) {
                var hits = touchesHouseOrLord(transit[malefic], malefic, 3.0, natal, cusps,
                        [10], [lord10])
                        || transitTouches(transit[malefic], cusps[1], malefic, 3.0)
                        || transitTouches(transit[malefic], natal[ascLord], malefic, 3.0);
                if (hits) careerMalefics++;
            }
            careerPressure = careerMalefics >= 2
                    || transitConjoins(transit[6], cusps[10], 3.0)
                    || transitConjoins(transit[6], natal[lord10], 3.0);
            var careerDasha = matchesEitherDasha(mahaPlanet, bhuktiPlanet,
                    0, 3, 4, 6, lord10, ascLord, 2, 7);
            if (careerDasha && (careerSupport || careerPressure)) {
                addOrExtendCategoryWindow(result.career, day, maha.lordIndex, bhukti.lordIndex,
                        careerSupport, careerPressure, careerSupport && !careerPressure);
            }

            var businessSupport = transitTouches(transit[4], natal[4], 4, 3.0)
                    || transitTouches(transit[4], natal[5], 4, 3.0);
            var businessPressure = false;
            var businessMalefics = 0;
            for (let malefic of [2, 6, 7]) {
                if (touchesHouseOrLord(transit[malefic], malefic, 3.0, natal, cusps,
                        [2, 4, 11], [lord2, lord4, lord11])) businessMalefics++;
            }
            businessPressure = businessMalefics >= 2;
            var businessDasha = matchesEitherDasha(mahaPlanet, bhuktiPlanet,
                    4, 5, lord2, lord4, lord11, 2, 6, 7);
            if (businessDasha && (businessSupport || businessPressure)) {
                addOrExtendCategoryWindow(result.business, day, maha.lordIndex, bhukti.lordIndex,
                        businessSupport, businessPressure, false);
            }

            var familySupport = touchesHouseOrLord(transit[4], 4, 3.0, natal, cusps,
                    [2, 3, 4, 9], [lord2, lord3, lord4, lord9])
                    || transitTouches(transit[4], natal[0], 4, 3.0)
                    || transitTouches(transit[4], natal[1], 4, 3.0);
            var familyPressureContacts = 0;
            for (let malefic of [2, 6, 7]) {
                if (touchesHouseOrLord(transit[malefic], malefic, 3.0, natal, cusps,
                        [2, 3, 4, 9], [lord2, lord3, lord4, lord9])
                        || transitTouches(transit[malefic], natal[0], malefic, 3.0)
                        || transitTouches(transit[malefic], natal[1], malefic, 3.0)) {
                    familyPressureContacts++;
                }
            }
            var familyPressure = familyPressureContacts >= 1;
            var familyDasha = matchesEitherDasha(mahaPlanet, bhuktiPlanet,
                    0, 1, 4, lord2, lord3, lord4, lord9);
            if (familyDasha && (familySupport || familyPressure)) {
                addOrExtendCategoryWindow(result.family, day, maha.lordIndex, bhukti.lordIndex,
                        familySupport, familyPressure,
                        familySupport && !familyPressure);
            }

            var propertyJupiter = touchesHouseOrLord(transit[4], 4, 3.0, natal, cusps,
                    [4], [lord4])
                    || transitTouches(transit[4], natal[2], 4, 3.0)
                    || transitTouches(transit[4], natal[5], 4, 3.0);
            var propertyVenus = touchesHouseOrLord(transit[5], 5, 2.5, natal, cusps,
                    [4], [lord4]);
            var assetSupport = propertyJupiter || propertyVenus;
            var assetPressureContacts = 0;
            for (let malefic of [2, 6, 7]) {
                if (touchesHouseOrLord(transit[malefic], malefic, 3.0, natal, cusps,
                        [4], [lord4])) assetPressureContacts++;
            }
            var assetPressure = assetPressureContacts >= 1;
            var assetDasha = matchesEitherDasha(mahaPlanet, bhuktiPlanet,
                    2, 4, 5, ascLord, lord4, lord11);
            if (assetDasha && (assetSupport || assetPressure)) {
                addOrExtendCategoryWindow(result.assets, day, maha.lordIndex, bhukti.lordIndex,
                        assetSupport, assetPressure,
                        propertyJupiter && propertyVenus && !assetPressure);
            }

            var sign5 = (asc + 4) % 12;
            var childrenSupport = touchesHouseOrLord(transit[4], 4, 3.0, natal, cusps,
                    [5], [lord5])
                    || transitTouches(transit[4], natal[4], 4, 3.0);
            var childrenPressureContacts = 0;
            for (let malefic of [2, 6, 7]) {
                if (touchesHouseOrLord(transit[malefic], malefic, 3.0, natal, cusps,
                        [5], [lord5])) childrenPressureContacts++;
            }
            var childrenPressure = childrenPressureContacts >= 1;
            var mahaChildren = mahaPlanet == 4 || mahaPlanet == lord5
                    || zodiacSign(natal[mahaPlanet]) == sign5
                    || planetAspectsSign(mahaPlanet, zodiacSign(natal[mahaPlanet]), sign5);
            var bhuktiChildren = bhuktiPlanet == 4 || bhuktiPlanet == lord5
                    || zodiacSign(natal[bhuktiPlanet]) == sign5
                    || planetAspectsSign(bhuktiPlanet, zodiacSign(natal[bhuktiPlanet]), sign5);
            var antaraChildren = activeForecastAntaraPlanet == 4
                    || activeForecastAntaraPlanet == lord5
                    || zodiacSign(natal[activeForecastAntaraPlanet]) == sign5
                    || planetAspectsSign(activeForecastAntaraPlanet,
                    zodiacSign(natal[activeForecastAntaraPlanet]), sign5);
            if (mahaChildren && bhuktiChildren && antaraChildren
                    && (childrenSupport || childrenPressure)) {
                addOrExtendCategoryWindow(result.children, day, maha.lordIndex, bhukti.lordIndex,
                        childrenSupport, childrenPressure,
                        childrenSupport && !childrenPressure);
            }

            for (var planet = 0; planet <= 7; planet++) {
                if (matchesEitherDasha(mahaPlanet, bhuktiPlanet, planet)
                        && transitTouches(transit[planet], natal[planet], planet, 2.5)) {
                    addOrExtendGeneralWindow(result.general, day, maha.lordIndex, bhukti.lordIndex,
                            0, planet, natalPlanetStrong(planet, natal));
                }
            }
            for (let target of [0, 1, 2, 3, 4, 5, 7]) {
                if (matchesEitherDasha(mahaPlanet, bhuktiPlanet, 4, target)
                        && transitTouches(transit[4], natal[target], 4, 3.0)) {
                    addOrExtendGeneralWindow(result.general, day, maha.lordIndex, bhukti.lordIndex,
                            1, target, natalPlanetStrong(target, natal));
                }
            }
            for (let house of [2, 7, 10, 11]) {
                var lord = signRuler((asc + house - 1) % 12);
                if (matchesEitherDasha(mahaPlanet, bhuktiPlanet, 4, lord)
                        && (transitTouches(transit[4], cusps[house], 4, 3.0)
                        || transitTouches(transit[4], natal[lord], 4, 3.0))) {
                    addOrExtendGeneralWindow(result.general, day, maha.lordIndex, bhukti.lordIndex,
                            1, 100 + house, natalPlanetStrong(lord, natal));
                }
            }
            for (let target of [ascLord, 0, 1]) {
                if (matchesEitherDasha(mahaPlanet, bhuktiPlanet, 2, target)
                        && transitTouches(transit[2], natal[target], 2, 2.5)) {
                    addOrExtendGeneralWindow(result.general, day, maha.lordIndex, bhukti.lordIndex,
                            2, target, natalPlanetStrong(2, natal));
                }
            }
            for (let house of [1, 2, 4, 7, 10]) {
                var lord = signRuler((asc + house - 1) % 12);
                if (matchesEitherDasha(mahaPlanet, bhuktiPlanet, 2, lord)
                        && (transitTouches(transit[2], cusps[house], 2, 2.5)
                        || transitTouches(transit[2], natal[lord], 2, 2.5))) {
                    addOrExtendGeneralWindow(result.general, day, maha.lordIndex, bhukti.lordIndex,
                            2, 100 + house, natalPlanetStrong(2, natal));
                }
            }
            for (let house of [2, 4, 7, 10, 11]) {
                var lord = signRuler((asc + house - 1) % 12);
                if (matchesEitherDasha(mahaPlanet, bhuktiPlanet, 6, lord)
                        && touchesHouseOrLord(transit[6], 6, 3.0, natal, cusps,
                        [house], [lord])) {
                    addOrExtendGeneralWindow(result.general, day, maha.lordIndex, bhukti.lordIndex,
                            3, 100 + house, natalPlanetStrong(6, natal));
                }
            }
            var saturnSign = zodiacSign(transit[6]);
            var moonSign = zodiacSign(natal[1]);
            var saturnFromMoon = relativeHouse(saturnSign, moonSign);
            var saturnFromAsc = relativeHouse(saturnSign, asc);
            var saturnOnAsc = transitConjoins(transit[6], cusps[1], 3.0)
                    || transitConjoins(transit[6], natal[ascLord], 3.0);
            var saturnAroundMoon = saturnFromMoon == 12 || saturnFromMoon == 1 || saturnFromMoon == 2;
            var saturnAroundAsc = saturnFromAsc == 12 || saturnFromAsc == 1 || saturnFromAsc == 2;
            if (saturnOnAsc && matchesEitherDasha(mahaPlanet, bhuktiPlanet, 6, ascLord)) {
                addOrExtendGeneralWindow(result.general, day, maha.lordIndex, bhukti.lordIndex,
                        3, 200, asc == moonSign || saturnAroundMoon);
            }
            if (saturnAroundMoon && matchesEitherDasha(mahaPlanet, bhuktiPlanet, 6, 1, ascLord)) {
                addOrExtendGeneralWindow(result.general, day, maha.lordIndex, bhukti.lordIndex,
                        3, 201, asc == moonSign || saturnOnAsc);
            }
            if (saturnAroundAsc && matchesEitherDasha(mahaPlanet, bhuktiPlanet, 6, ascLord)) {
                addOrExtendGeneralWindow(result.general, day, maha.lordIndex, bhukti.lordIndex,
                        3, 202, asc == moonSign || saturnAroundMoon);
            }
            if (transitConjoins(transit[1], natal[1], 2.0) && (saturnAroundMoon || saturnOnAsc)
                    && matchesEitherDasha(mahaPlanet, bhuktiPlanet, 1, 6, ascLord)) {
                addOrExtendGeneralWindow(result.general, day, maha.lordIndex, bhukti.lordIndex,
                        3, 203, saturnOnAsc || (asc == moonSign));
            }
            if (transitTouches(transit[2], natal[3], 2, 2.5)
                    && matchesEitherDasha(mahaPlanet, bhuktiPlanet, 2, 3)) {
                addOrExtendGeneralWindow(result.general, day, maha.lordIndex, bhukti.lordIndex,
                        3, 204, false);
            }
            var mercuryHeavyPressure = transitTouches(transit[6], natal[3], 6, 3.0)
                    || transitTouches(transit[7], natal[3], 7, 3.0);
            if (mercuryHeavyPressure && matchesEitherDasha(mahaPlanet, bhuktiPlanet, 3, 6, 7)) {
                addOrExtendGeneralWindow(result.general, day, maha.lordIndex, bhukti.lordIndex,
                        3, 205, transitTouches(transit[6], natal[3], 6, 3.0)
                        && transitTouches(transit[7], natal[3], 7, 3.0));
            }
            for (let house of [1, 2, 10]) {
                var lord = signRuler((asc + house - 1) % 12);
                if (matchesEitherDasha(mahaPlanet, bhuktiPlanet, 7, lord)
                        && touchesHouseOrLord(transit[7], 7, 3.0, natal, cusps,
                        [house], [lord])) {
                    addOrExtendGeneralWindow(result.general, day, maha.lordIndex, bhukti.lordIndex,
                            4, 100 + house, natalPlanetStrong(7, natal));
                }
            }
            for (let house of [2, 4, 7, 10, 11]) {
                var lord = signRuler((asc + house - 1) % 12);
                var jupiterJoins = touchesHouseOrLord(transit[4], 4, 3.0, natal, cusps,
                        [house], [lord]);
                if (jupiterJoins && matchesEitherDasha(mahaPlanet, bhuktiPlanet, 4, 5, lord)
                        && touchesHouseOrLord(transit[5], 5, 2.5, natal, cusps,
                        [house], [lord])) {
                    addOrExtendGeneralWindow(result.general, day, maha.lordIndex, bhukti.lordIndex,
                            5, 100 + house, natalPlanetStrong(5, natal));
                }
            }
            var mercuryAfflicted = transitConjoins(transit[3], transit[2], 3.0)
                    || transitConjoins(transit[3], transit[6], 3.0)
                    || transitConjoins(transit[3], transit[7], 3.0);
            for (let house of [2, 4, 5, 9, 10, 11]) {
                var lord = signRuler((asc + house - 1) % 12);
                var jupiterJoins = touchesHouseOrLord(transit[4], 4, 3.0, natal, cusps,
                        [house], [lord]);
                if (!mercuryAfflicted && jupiterJoins
                        && matchesEitherDasha(mahaPlanet, bhuktiPlanet, 3, 4, lord)
                        && touchesHouseOrLord(transit[3], 3, 2.0, natal, cusps,
                        [house], [lord])) {
                    addOrExtendGeneralWindow(result.general, day, maha.lordIndex, bhukti.lordIndex,
                            6, 100 + house, natalPlanetStrong(3, natal));
                }
            }
            for (let house of [2, 4, 7, 10, 11]) {
                var lord = signRuler((asc + house - 1) % 12);
                var jupiterJoins = touchesHouseOrLord(transit[4], 4, 3.0, natal, cusps,
                        [house], [lord]);
                if (jupiterJoins && matchesEitherDasha(mahaPlanet, bhuktiPlanet, 1, 4, lord)
                        && touchesHouseOrLord(transit[1], 1, 2.0, natal, cusps,
                        [house], [lord])) {
                    addOrExtendGeneralWindow(result.general, day, maha.lordIndex, bhukti.lordIndex,
                            7, 100 + house, natalPlanetStrong(1, natal));
                }
            }
            for (let house of [2, 10]) {
                var lord = signRuler((asc + house - 1) % 12);
                var sunHits = touchesHouseOrLord(transit[0], 0, 2.0, natal, cusps,
                        [house], [lord]);
                var maleficJoins = touchesHouseOrLord(transit[2], 2, 3.0, natal, cusps,
                        [house], [lord])
                        || touchesHouseOrLord(transit[6], 6, 3.0, natal, cusps,
                        [house], [lord])
                        || touchesHouseOrLord(transit[7], 7, 3.0, natal, cusps,
                        [house], [lord]);
                if (sunHits && matchesEitherDasha(mahaPlanet, bhuktiPlanet, 0, lord)) {
                    addOrExtendGeneralWindow(result.general, day, maha.lordIndex, bhukti.lordIndex,
                            8, 100 + house, !maleficJoins);
                }
            }
            var thanWaungSign = calculateThanWaungSign(transit[7]);
            for (let house of [1, 2, 10]) {
                var lord = signRuler((asc + house - 1) % 12);
                var houseSign = zodiacSign(cusps[house]);
                var lordSign = zodiacSign(natal[lord]);
                if (matchesEitherDasha(mahaPlanet, bhuktiPlanet, 7, lord)
                        && (rahuInfluencesSign(thanWaungSign, houseSign)
                        || rahuInfluencesSign(thanWaungSign, lordSign))) {
                    addOrExtendGeneralWindow(result.general, day, maha.lordIndex, bhukti.lordIndex,
                            9, 100 + house, natalPlanetStrong(7, natal));
                }
            }
            day.add(Calendar.DAY_OF_YEAR, 1);
        }
        return result;
    
}
function touchesHouseOrLord(transit,transitPlanet,orb,natal,cusps,houses,lords) {

        for (var i = 0; i < houses.length; i++) {
            if (transitTouches(transit, cusps[houses[i]], transitPlanet, orb)
                    || transitTouches(transit, natal[lords[i]], transitPlanet, orb)) return true;
        }
        return false;
    
}
function transitConjoins(first,second,orb) {

        var difference = Math.abs(normalize(first) - normalize(second));
        return Math.min(difference, 360.0 - difference) <= orb;
    
}
function matchesEitherDasha(mahaPlanet,bhuktiPlanet,...candidates) {

        var mahaMatches = false;
        var bhuktiMatches = false;
        var antaraMatches = false;
        for (let candidate of candidates) {
            if (mahaPlanet == candidate) mahaMatches = true;
            if (bhuktiPlanet == candidate) bhuktiMatches = true;
            if (activeForecastAntaraPlanet == candidate) antaraMatches = true;
        }
        return mahaMatches && bhuktiMatches && antaraMatches;
    
}
function natalPlanetStrong(planet,natal) {

        var sign = zodiacSign(natal[planet]);
        return isOwnOrExalted(planet, sign) || isFriendlySign(planet, sign)
                || zodiacSign(toNavamsaLongitude(natal[planet])) == sign;
    
}
function calculateThanWaungSign(rahuLongitude) {

        var rahuSign = zodiacSign(rahuLongitude);
        var degreeInSign = normalize(rahuLongitude) % 30.0;
        var reverseOffset = Math.floor((30.0 - degreeInSign - 0.000001) / 2.5);
        reverseOffset = Math.max(0, Math.min(11, reverseOffset));
        return floorMod(rahuSign - reverseOffset, 12);
    
}
function addOrExtendGeneralWindow(windows,day,mahaLord,bhuktiLord,type,target,natalStrong) {

        for (var i = windows.length - 1; i >= 0; i--) {
            var window = windows[i];
            if (window.type != type || window.target != target || window.mahaLord != mahaLord
                    || window.bhuktiLord != bhuktiLord
                    || window.antaraLord != activeForecastAntaraLord
                    || window.natalStrong != natalStrong) continue;
            var expected = window.end.clone();
            expected.add(Calendar.DAY_OF_YEAR, 1);
            if (expected.get(Calendar.YEAR) == day.get(Calendar.YEAR)
                    && expected.get(Calendar.DAY_OF_YEAR) == day.get(Calendar.DAY_OF_YEAR)) {
                window.end = day.clone();
                return;
            }
            break;
        }
        windows.add(new GeneralTransitWindow(day, mahaLord, bhuktiLord,
                activeForecastAntaraLord, type, target, natalStrong));
    
}
function addOrExtendCategoryWindow(windows,day,mahaLord,bhuktiLord,support,pressure,strong) {

        var last = windows.isEmpty() ? null : windows.get(windows.length - 1);
        var expected = last == null ? null : last.end.clone();
        if (expected != null) expected.add(Calendar.DAY_OF_YEAR, 1);
        if (last != null && expected.get(Calendar.YEAR) == day.get(Calendar.YEAR)
                && expected.get(Calendar.DAY_OF_YEAR) == day.get(Calendar.DAY_OF_YEAR)
                && last.mahaLord == mahaLord && last.bhuktiLord == bhuktiLord
                && last.antaraLord == activeForecastAntaraLord
                && last.support == support && last.pressure == pressure && last.strong == strong) {
            last.end = day.clone();
            return;
        }
        windows.add(new CategoryTransitWindow(day, mahaLord, bhuktiLord,
                activeForecastAntaraLord, support, pressure, strong));
    
}
function groupCategoryWindows(windows) {

        var groups = [];
        for (let window of windows) {
            var matching = null;
            for (let group of groups) {
                var sample = group[0];
                if (sample.support == window.support && sample.pressure == window.pressure
                        && sample.strong == window.strong) {
                    matching = group;
                    break;
                }
            }
            if (matching == null) {
                matching = [];
                groups.add(matching);
            }
            matching.add(window);
        }
        return groups;
    
}
function appendCategoryPeriodLines(text,group) {

        var limit = Math.min(12, group.length);
        for (var i = 0; i < limit; i++) {
            var window = group[i];
            text.append(formatDashaForecastPeriod(window.mahaLord, window.bhuktiLord,
                    window.antaraLord,
                    window.start, window.end));
        }
    
}
function combinedForecastLead(en) {

        return en
                ? "During the following periods, Maha Dasa, Bhukti Dasa, Antara Dasa and transit all indicate the same matter. "
                : "အောက်ပါကာလများတွင် မဟာဒသာ၊ ဘုတ္တိဒသာ၊ အန္တရဒသာနှင့် ကောဇာဂြိုဟ်အပြောင်းအလဲ အားလုံးတို့သည် တူညီသောအကျိုးသက်ရောက်မှုကို တစ်ပြိုင်တည်း ထင်ရှားစွာ ဖော်ပြနေပါသည်။ ";
    
}
function appendNoAlignedPeriodNotice(reading,empty,en) {

        if (!empty) return false;
        appendReadingBullet(reading, en
                ? "No Dasha and transit period aligns between six months before today and one year after today, so no unusual event is indicated in this category during this interval."
                : "ယနေ့မတိုင်မီ ၆ လမှ ယနေ့နောက်ပိုင်း ၁ နှစ်အတွင်း ဒသာနှင့် ကောဇာတိုက်ဆိုင်သော အချိန်ကာလများ မပါဝင်သောကြောင့် ဤကာလအပိုင်းအခြားအတွင်း ဤကဏ္ဍနှင့်ပတ်သက်၍ ထူးခြားသောအဖြစ်အပျက်မျိုး မရှိနိုင်ဟု သုံးသပ်ရရှိပါသည်။");
        return true;
    
}
function appendFamilyTransitForecast(reading,windows,en) {

        appendReadingHeading(reading, en ? "Dasha and Transit-aligned Family Periods"
                : "ဒသာနှင့် ကောဇာကိုက်ညီသော မိသားစုကာလများ");
        if (appendNoAlignedPeriodNotice(reading, windows.isEmpty(), en)) return;
        for (let group of groupCategoryWindows(windows)) {
            var w = group[0];
            var text = new StringBuilder(combinedForecastLead(en));
            if (w.support) text.append(en
                    ? "The active Dasha and Jupiter transit jointly support the houses of family, siblings, home and parents. Reconciliation, family cooperation, home stability and help from relatives receive constructive momentum."
                    : "လက်ရှိဒသာသက်ရောက်မှုက မိသားစုဆိုင်ရာဂြိုဟ်ကို ဖော်ဆောင်နေချိန်တွင် ကောဇာကြာသပတေးဂြိုဟ်ကလည်း မိသားစု၊ မောင်နှမ၊ နေအိမ်နှင့် မိဘဆိုင်ရာ ဘာဝများကိုပါ ပူးတွဲအားပေးနေပါသည်။ ထို့ကြောင့် မိသားစုအဆင်ပြေချောမွေ့ခြင်း၊ ပြန်လည်သင့်မြတ်ခြင်း၊ ဆွေမျိုးသားချင်းများ၏ အကူအညီရရှိခြင်းနှင့် အိမ်တွင်းတည်ငြိမ်အေးချမ်းခြင်း စသည့် ကောင်းကျိုးများ တိုးတက်ဖြစ်ထွန်းစေရန် အခွင့်အလမ်းကောင်းများ ရှိနေပါသည်။");
            if (w.pressure) text.append(en
                    ? " Mars, Saturn or Rahu simultaneously pressures the same family factors. Responsibilities, disagreement, parental concern or household expenses may rise, so communicate calmly and keep practical arrangements clear."
                    : " တစ်ပြိုင်တည်းမှာပင် ၎င်းမိသားစုဆိုင်ရာ အချက်အလက်များကို အင်္ဂါ၊ စနေ သို့မဟုတ် ရာဟုဂြိုဟ်တို့ကပါ ဖိအားပေးသက်ရောက်နေပါသည်။ မိသားစုတာဝန်ဝတ္တရားများ လေးလံခြင်း၊ သဘောထားကွဲလွဲခြင်း၊ မိဘနှင့်ပတ်သက်၍ စိုးရိမ်ပူပန်ရခြင်း သို့မဟုတ် အိမ်တွင်းအသုံးစရိတ်များ မြင့်တက်လာခြင်းတို့ ဖြစ်ပေါ်တတ်သဖြင့် စကားပြောဆိုရာတွင် အေးအေးဆေးဆေး တည်ငြိမ်စွာ ဆွေးနွေးသင့်ပြီး လက်တွေ့ကျသော အစီအစဉ်များကို ရှင်းရှင်းလင်းလင်း ချမှတ်လုပ်ဆောင်သင့်ပါသည်။");
            appendCategoryPeriodLines(text, group);
            appendReadingBullet(reading, text.toString());
        }
    
}
function appendAssetTransitForecast(reading,windows,en) {

        appendReadingHeading(reading, en ? "Dasha and Transit-aligned Property and Vehicle Periods"
                : "ဒသာနှင့် ကောဇာကိုက်ညီသော နေအိမ်၊ ယာဉ်ကားကာလများ");
        if (appendNoAlignedPeriodNotice(reading, windows.isEmpty(), en)) return;
        for (let group of groupCategoryWindows(windows)) {
            var w = group[0];
            var text = new StringBuilder(combinedForecastLead(en));
            if (w.support) text.append(en
                    ? (w.strong
                       ? "The property-related Dasha is reinforced by both Jupiter and Venus transits. Buying, building, renovating, moving home or acquiring a vehicle receives especially strong support when finances and documents are ready."
                       : "The property-related Dasha is reinforced by Jupiter or Venus transit. Home, land, vehicle, renovation and relocation plans receive a practical opening.")
                    : (w.strong
                       ? "နေအိမ်နှင့် ယာဉ်ကားဆိုင်ရာ ဒသာသက်ရောက်မှု ရှိနေချိန်တွင် ကောဇာကြာသပတေးနှင့် သောကြာဂြိုဟ်တို့က ၄ တန့်ဘာဝဆိုင်ရာ အချက်အလက်များကို တစ်ပြိုင်တည်း အားပေးကူညီနေပါသည်။ ထို့ကြောင့် ငွေကြေးနှင့် စာရွက်စာတမ်းများ အဆင်သင့်ရှိပါက အိမ်၊ မြေ၊ ယာဉ်ဝယ်ယူခြင်း၊ ဆောက်လုပ်ပြုပြင်ခြင်း သို့မဟုတ် နေရာပြောင်းရွှေ့ခြင်းတို့အတွက် အထူးပင် အားကောင်းသောအခြေအနေများကို ရရှိစေပါလိမ့်မည်။"
                       : "နေအိမ်နှင့် ယာဉ်ကားဆိုင်ရာ ဒသာသက်ရောက်မှု ရှိနေချိန်တွင် ကောဇာကြာသပတေး သို့မဟုတ် သောကြာဂြိုဟ်က ၄ တန့်ဘာဝဆိုင်ရာ အချက်အလက်များကို အားပေးကူညီနေပါသည်။ အိမ်၊ မြေ၊ ယာဉ်ဝယ်ယူရေး၊ ပြုပြင်မွမ်းမံရေးနှင့် နေရာပြောင်းရွှေ့ရေး အစီအစဉ်များကို စတင်အကောင်အထည်ဖော်ရန် အခွင့်အလမ်းကောင်းများ ပေါ်ပေါက်လာပါလိမ့်မည်။"));
            if (w.pressure) text.append(en
                    ? " Mars, Saturn or Rahu also pressures the 4th house or its lord. Inspect vehicles and property carefully, verify ownership documents and avoid rushed borrowing or purchases."
                    : " တစ်ပြိုင်တည်းမှာပင် ၄ တန့်ဘာဝနှင့် ၄ တန့်သခင်ဂြိုဟ်တို့အပေါ် အင်္ဂါ၊ စနေ သို့မဟုတ် ရာဟုဂြိုဟ်တို့၏ ဖိအားပေးမှုများ ရှိနေပါသည်။ ထို့ကြောင့် ယာဉ်ကားနှင့် အိမ်ခြံမြေများ၏ ကြံ့ခိုင်မှုအခြေအနေကို သေချာစွာ စစ်ဆေးသင့်ပြီး၊ ပိုင်ဆိုင်မှု စာရွက်စာတမ်းများကို စနစ်တကျ အတည်ပြုကာ လောလောဆယ်ဆယ် အလျင်စလို ငွေချေးယူ၍ ဝယ်ယူခြင်းမျိုးကို ရှောင်ကြဉ်သင့်ပါသည်။");
            appendCategoryPeriodLines(text, group);
            appendReadingBullet(reading, text.toString());
        }
    
}
function appendChildrenTransitForecast(reading,windows,en) {

        appendReadingHeading(reading, en ? "Dasha and Transit-aligned Children-related Periods"
                : "ဒသာနှင့် ကောဇာကိုက်ညီသော သားသမီးဆိုင်ရာကာလများ");
        if (appendNoAlignedPeriodNotice(reading, windows.isEmpty(), en)) return;
        for (let group of groupCategoryWindows(windows)) {
            var w = group[0];
            var text = new StringBuilder(combinedForecastLead(en));
            if (w.support) text.append(en
                    ? "The Dasha of Jupiter, the 5th lord or a planet connected with the 5th house is reinforced by Jupiter transit. Family expansion, conception planning, childbirth-related preparation and positive developments involving children receive stronger support."
                    : "ကြာသပတေး၊ ၅ တန့်သခင် သို့မဟုတ် ၅ တန့်ဘာဝနှင့် ဆက်စပ်နေသော ဂြိုဟ်ဒသာများ သက်ရောက်နေချိန်တွင် ကောဇာကြာသပတေးဂြိုဟ်ကလည်း ၅ တန့်ဘာဝဆိုင်ရာ အချက်အလက်များကို ပူးတွဲအားပေးနေပါသည်။ ထို့ကြောင့် မိသားစုဝင်အသစ် တိုးချဲ့ရန် စီစဉ်ခြင်း၊ ကိုယ်ဝန်ယူရန် ပြင်ဆင်ခြင်း၊ မီးဖွားခြင်းဆိုင်ရာ ကိစ္စရပ်များနှင့် သားသမီးများနှင့် ပတ်သက်သော ကောင်းမွန်သော တိုးတက်ပြောင်းလဲမှုများ ပေါ်ပေါက်လာစေရန် အထူးအားကောင်းသော အချိန်ကာလ ဖြစ်ပါသည်။");
            if (w.pressure) text.append(en
                    ? " Mars, Saturn or Rahu simultaneously pressures the 5th-house factors. Delay, worry or added responsibility may accompany the opportunity, so medical matters should be handled with qualified professional care and practical planning."
                    : " တစ်ပြိုင်တည်းမှာပင် ၅ တန့်ဘာဝဆိုင်ရာ အချက်အလက်များအပေါ် အင်္ဂါ၊ စနေ သို့မဟုတ် ရာဟုဂြိုဟ်တို့၏ ဖိအားပေးမှုများလည်း ရှိနေပါသည်။ အခွင့်အလမ်းကောင်းများနှင့်အတူ လုပ်ငန်းဆောင်တာများ နှောင့်နှေးကြန့်ကြာခြင်း၊ စိုးရိမ်ပူပန်မှုများခြင်း သို့မဟုတ် တာဝန်ဝတ္တရားများ ပိုမိုလေးလံလာခြင်းတို့ ကြုံရတတ်သဖြင့် ကျန်းမာရေးနှင့် ပတ်သက်သော ကိစ္စရပ်များကို ကျွမ်းကျင်ဆရာဝန်များနှင့် စနစ်တကျ စစ်ဆေးပြသပြီးမှသာ လက်တွေ့ကျကျ စီစဉ်ဆောင်ရွက်သင့်ပါသည်။");
            appendCategoryPeriodLines(text, group);
            appendReadingBullet(reading, text.toString());
        }
    
}
function appendEducationTransitForecast(reading,windows,en) {

        appendReadingHeading(reading, en ? "Dasha and Transit-aligned Education Periods"
                : "ဒသာနှင့် ကောဇာကိုက်ညီသော ပညာရေးကာလများ");
        if (appendNoAlignedPeriodNotice(reading, windows.isEmpty(), en)) return;
        for (let group of groupCategoryWindows(windows)) {
            var w = group[0];
            var text = new StringBuilder(combinedForecastLead(en));
            if (w.support) text.append(en
                    ? (w.strong ? "Jupiter and Mercury support the education houses together with the 10th house. Examinations, interviews and academic recognition receive especially strong support."
                       : "Jupiter or Mercury supports the education houses. Study, examinations and qualification-related work receive useful momentum.")
                    : (w.strong ? "ကြာသပတေးနှင့် ဗုဒ္ဓဟူးဂြိုဟ်တို့က ပညာရေးဆိုင်ရာ ဘာဝများအပြင် ၁၀ တန့်ဘာဝကိုပါ ပူးတွဲအားပေးနေပါသည်။ ထို့ကြောင့် စာမေးပွဲများ ဖြေဆိုခြင်း၊ အင်တာဗျူးများ ရင်ဆိုင်ခြင်းနှင့် ပညာရေးဆိုင်ရာ အဆင့်အတန်းကောင်းများ သို့မဟုတ် ထူးချွန်ဂုဏ်ထူးများ ရရှိနိုင်ခြင်းတို့အတွက် အထူးပင် အားကောင်းတိုးတက်စေမည့် အခွင့်ကောင်း ကာလဖြစ်ပါသည်။"
                       : "ကြာသပတေး သို့မဟုတ် ဗုဒ္ဓဟူးဂြိုဟ်က ပညာရေးဆိုင်ရာ ဘာဝများကို အားပေးကူညီနေပါသည်။ စာပေလေ့လာဆည်းပူးခြင်း၊ စာမေးပွဲဖြေဆိုခြင်းနှင့် ဘွဲ့လက်မှတ် သို့မဟုတ် အရည်အချင်းစစ်လက်မှတ်ဆိုင်ရာ ကိစ္စရပ်များ ကောင်းမွန်စွာ တိုးတက်အောင်မြင်စေရန် အထောက်အပံ့ကောင်းများ ရရှိပါလိမ့်မည်။"));
            if (w.pressure) text.append(en
                    ? " Saturn or Rahu also shows pressure from home, parents, finances or the study environment, so a disciplined schedule and practical support are important."
                    : " သို့သော်လည်း စနေ သို့မဟုတ် ရာဟုဂြိုဟ်တို့၏ ဖိအားပေးမှုများ ရှိနေသဖြင့် မိသားစုဝင်များ၊ မိဘများ၊ ငွေကြေးအခြေအနေ သို့မဟုတ် စာသင်ကြားသည့် ပတ်ဝန်းကျင်ကြောင့် စိတ်နှောင့်ယှက်ဖြစ်ရတတ်ပါသည်။ ထို့ကြောင့် စာပေလေ့လာချိန်ကို စနစ်တကျ သတ်မှတ်ထားရှိရန်နှင့် လိုအပ်သော ကူညီပံ့ပိုးမှုများကို ရယူရန် အထူးအရေးကြီးပါသည်။");
            appendCategoryPeriodLines(text, group);
            appendReadingBullet(reading, text.toString());
        }
    
}
function appendMarriageTransitForecast(reading,windows,en) {

        appendReadingHeading(reading, en ? "Dasha and Transit-aligned Relationship Periods"
                : "ဒသာနှင့် ကောဇာကိုက်ညီသော အချစ်ရေး၊ အိမ်ထောင်ရေးကာလများ");
        if (appendNoAlignedPeriodNotice(reading, windows.isEmpty(), en)) return;
        for (let group of groupCategoryWindows(windows)) {
            var w = group[0];
            var text = new StringBuilder(combinedForecastLead(en));
            if (w.support) text.append(en
                    ? "Jupiter or the benefic 7th lord supports the 7th house and Venus. Meeting a partner, formalising a relationship or restoring warmth is better supported."
                    : "ကြာသပတေး သို့မဟုတ် အကျိုးပြုသော သောမ ၇ တန့်သခင်ဂြိုဟ်က ၇ တန့်ဘာဝနှင့် သောကြာဂြိုဟ်တို့ကို အားပေးကူညီနေပါသည်။ ထို့ကြောင့် ဖူးစာဖက်နှင့် စတင်ဆုံတွေ့ခြင်း၊ ဆက်ဆံရေးကို တရားဝင်တည်ဆောက်ခြင်း၊ လက်ထပ်ထိမ်းမြားရန် စီစဉ်ခြင်း သို့မဟုတ် အိမ်ထောင်ရေးတွင် မေတ္တာတရား ပြန်လည်နွေးထွေးလာစေခြင်း စသည့် ကိစ္စရပ်များကို ပိုမိုအားကောင်းစေပါလိမ့်မည်။");
            if (w.pressure) text.append(en
                    ? " Mars, Saturn or Rahu adds relationship pressure. Avoid impulsive decisions, harsh speech and prolonged silence; discuss practical issues clearly."
                    : " တစ်ပြိုင်တည်းမှာပင် အင်္ဂါ၊ စနေ သို့မဟုတ် ရာဟုဂြိုဟ်တို့၏ ဖိအားပေးမှုများ ရှိနေသဖြင့် အချင်းချင်း သဘောထားကွဲလွဲခြင်း၊ ဆက်ဆံရေးအေးစက်သွားခြင်းနှင့် အထင်လွဲမှားခြင်းတို့ ဖြစ်ပေါ်တတ်ပါသည်။ ထို့ကြောင့် စိတ်လိုက်မာန်ပါ အလျင်စလို ဆုံးဖြတ်ချက်ချခြင်း၊ စကားပြင်းပြင်းထန်ထန် ပြောဆိုခြင်းနှင့် အပြန်အလှန် စကားမပြောဘဲ နေခြင်းတို့ကို အတတ်နိုင်ဆုံး ရှောင်ကြဉ်ပြီး၊ လက်တွေ့ကျသော ပြဿနာများကို ပွင့်လင်းမြင်သာစွာ အေးအေးဆေးဆေး ညှိနှိုင်းဆွေးနွေးသင့်ပါသည်။");
            appendCategoryPeriodLines(text, group);
            appendReadingBullet(reading, text.toString());
        }
    
}
function appendForeignTransitForecast(reading,windows,en) {

        appendReadingHeading(reading, en ? "Dasha and Transit-aligned Foreign Periods"
                : "ဒသာနှင့် ကောဇာကိုက်ညီသော နိုင်ငံခြားကာလများ");
        if (appendNoAlignedPeriodNotice(reading, windows.isEmpty(), en)) return;
        for (let group of groupCategoryWindows(windows)) {
            var w = group[0];
            var text = new StringBuilder(combinedForecastLead(en));
            text.append(en
                    ? (w.strong ? "Rahu makes several simultaneous contacts with the Ascendant, luminaries and the 8th/12th houses. Foreign travel, relocation, overseas study or work has a strong activation, provided the native takes practical action."
                       : "Rahu activates the Ascendant and foreign-travel houses. Applications, travel, overseas study, employment or relocation receive a workable opening when practical steps are taken.")
                    : (w.strong ? "ရာဟုဂြိုဟ်သည် လဂ်၊ နေ၊ စန်း (တနင်္လာဂြိုဟ်) နှင့် ၈၊ ၁၂ တန့်ဘာဝဆိုင်ရာ အချက်အလက်များကို တစ်ပြိုင်တည်း ဆက်သွယ်သက်ရောက်နေပါသည်။ မိမိဘက်မှ လက်တွေ့ကျကျ လျှောက်ထားပြင်ဆင်မှုများ ပြုလုပ်ထားပါက နိုင်ငံခြားသို့ ခရီးထွက်ခြင်း၊ ပြောင်းရွှေ့နေထိုင်ခြင်း၊ ပညာတော်သင်သွားခြင်း သို့မဟုတ် အလုပ်အကိုင် သွားရောက်လုပ်ကိုင်ခြင်းတို့အတွက် အထူးပင် အားကောင်းတိုးတက်စေမည့် အခွင့်ကောင်းကာလ ဖြစ်ပါသည်။"
                       : "ရာဟုဂြိုဟ်သည် လဂ်ဘာဝနှင့် နိုင်ငံခြားခရီးသွားလာရေးဆိုင်ရာ ဘာဝများကို လှုံ့ဆော်ပေးနေပါသည်။ လျှောက်လွှာများ တင်သွင်းခြင်း၊ ခရီးသွားလာခြင်း၊ နိုင်ငံခြားပညာရေး၊ အလုပ်အကိုင် သို့မဟုတ် နေရာပြောင်းရွှေ့ရန်အတွက် လက်တွေ့ကျကျ စတင်လုပ်ဆောင်ပါက အခွင့်အလမ်းကောင်းများ ပေါ်ပေါက်လာနိုင်ပါသည်။"));
            appendCategoryPeriodLines(text, group);
            appendReadingBullet(reading, text.toString());
        }
    
}
function appendCareerTransitForecast(reading,windows,en) {

        appendReadingHeading(reading, en ? "Dasha and Transit-aligned Career Periods"
                : "ဒသာနှင့် ကောဇာကိုက်ညီသော အလုပ်အကိုင်ကာလများ");
        if (appendNoAlignedPeriodNotice(reading, windows.isEmpty(), en)) return;
        for (let group of groupCategoryWindows(windows)) {
            var w = group[0];
            var text = new StringBuilder(combinedForecastLead(en));
            if (w.support) text.append(en
                    ? "The 10th house, its lord or the natal Sun receives constructive transit support. Job applications, promotion discussions, responsibility and professional visibility are favoured."
                    : "၁၀ တန့်ဘာဝ၊ ၁၀ တန့်သခင်ဂြိုဟ် သို့မဟုတ် မူလဇာတာပါ တနင်္ဂနွေဂြိုဟ်တို့အပေါ် ကောင်းမွန်သော ကောဇာဂြိုဟ်စီးမှု အထောက်အပံ့များ ရရှိနေပါသည်။ ထို့ကြောင့် အလုပ်အကိုင်အသစ် လျှောက်ထားခြင်း၊ ရာထူးတိုးတက်ရေးအတွက် ညှိနှိုင်းခြင်း၊ တာဝန်အသစ်များ ရယူခြင်းနှင့် လုပ်ငန်းခွင်အတွင်း ထင်ရှားကျော်ကြား အသိအမှတ်ပြုခံရခြင်းတို့ကို အထူးအားပေးကူညီပါလိမ့်မည်။");
            if (w.pressure) text.append(en
                    ? " Malefic pressure is also present, bringing delay, heavier responsibility or conflict with authority. Avoid resigning or investing impulsively and document important agreements."
                    : " တစ်ပြိုင်တည်းမှာပင် ပါပဂြိုဟ်များ၏ ကောဇာဖိအားပေးမှုများလည်း ရှိနေသဖြင့် လုပ်ငန်းဆောင်တာများ နှောင့်နှေးကြန့်ကြာခြင်း၊ တာဝန်ဝတ္တရားများ ပိုမိုလေးလံလာခြင်း သို့မဟုတ် အထက်လူကြီး၊ အာဏာပိုင်များနှင့် သဘောထားကွဲလွဲခြင်းတို့ ကြုံရတတ်ပါသည်။ ထို့ကြောင့် စိတ်လိုက်မာန်ပါ အလျင်စလို အလုပ်ထွက်ခြင်း၊ ရင်းနှီးမြှုပ်နှံမှု ပြုလုပ်ခြင်းတို့ကို အတတ်နိုင်ဆုံး ရှောင်ကြဉ်သင့်ပြီး၊ အရေးကြီးသော သဘောတူညီချက်များကို စာရွက်စာတမ်းများဖြင့် တိတိကျကျ မှတ်တမ်းတင်ထားရှိသင့်ပါသည်။");
            appendCategoryPeriodLines(text, group);
            appendReadingBullet(reading, text.toString());
        }
    
}
function appendBusinessTransitForecast(reading,windows,en) {

        appendReadingHeading(reading, en ? "Dasha and Transit-aligned Financial Periods"
                : "ဒသာနှင့် ကောဇာကိုက်ညီသော စီးပွားရေး၊ ငွေကြေးကာလများ");
        if (appendNoAlignedPeriodNotice(reading, windows.isEmpty(), en)) return;
        for (let group of groupCategoryWindows(windows)) {
            var w = group[0];
            var text = new StringBuilder(combinedForecastLead(en));
            if (w.support) text.append(en
                    ? "Jupiter supports natal Jupiter or Venus, improving opportunities for income, agreements, customers and asset growth when backed by practical work."
                    : "ကြာသပတေးဂြိုဟ်က မူလဇာတာပါ ကြာသပတေး သို့မဟုတ် သောကြာဂြိုဟ်တို့ကို အားပေးကူညီနေပါသည်။ မိမိဘက်မှ လက်တွေ့ကျကျ တက်ကြွစွာ ကြိုးစားအားထုတ်မှုများနှင့် ပူးတွဲလုပ်ဆောင်ပါက ဝင်ငွေတိုးတက်ခြင်း၊ ကောင်းမွန်သော သဘောတူညီချက်များ ရရှိခြင်း၊ ဖောက်သည်အသစ်များ တိုးပွားခြင်းနှင့် ပိုင်ဆိုင်မှုများ တိုးတက်လာခြင်း စသည့် အခွင့်အလမ်းကောင်းများကို ဖြစ်ထွန်းစေပါလိမ့်မည်။");
            if (w.pressure) text.append(en
                    ? " Mars, Saturn and Rahu place combined pressure on the 2nd, 4th or 11th houses. Control debt, avoid speculative commitments and keep cash reserves for unexpected costs."
                    : " တစ်ပြိုင်တည်းမှာပင် အင်္ဂါ၊ စနေနှင့် ရာဟုဂြိုဟ်တို့က ၂၊ ၄ သို့မဟုတ် ၁၁ တန့်ဘာဝဆိုင်ရာ ငွေကြေးနှင့် ပိုင်ဆိုင်မှုကဏ္ဍများကို ပူးပေါင်း၍ ဖိအားပေးနေပါသည်။ ထို့ကြောင့် ကြွေးမြီများကို အတတ်နိုင်ဆုံး ထိန်းညှိခြင်း၊ မသေချာမရေရာသော စွန့်စားရသည့် ရင်းနှီးမြှုပ်နှံမှုများကို ရှောင်ကြဉ်ခြင်းနှင့် မမျှော်လင့်ဘဲ ပေါ်ပေါက်လာနိုင်သည့် အသုံးစရိတ်များအတွက် ငွေကြေးအရန်အဖြစ် ကြိုတင်ဖယ်ချန်ထားရှိခြင်းတို့ ပြုလုပ်သင့်ပါသည်။");
            appendCategoryPeriodLines(text, group);
            appendReadingBullet(reading, text.toString());
        }
    
}
function appendCombinedDashaTransitReading(reading,windows,en) {

        appendReadingHeading(reading, en ? "Vimshottari Dasha + Transit Analysis"
                : "ဝိသောတ္ထရီဒသာ + ကောဇာဂြိုဟ်စီးဂြိုဟ်နင်း");
        appendReadingBullet(reading, en
                ? "Only periods from six months before today through one year after today in which Maha Dasa, Bhukti Dasa, Antara Dasa and the actual transit all point to the same matter are shown. Dasha and transit are never interpreted separately."
                : "ယနေ့မတိုင်မီ ၆ လမှ ယနေ့နောက်ပိုင်း ၁ နှစ်အတွင်း မဟာဒသာ၊ ဘုတ္တိဒသာ၊ အန္တရဒသာနှင့် လက်တွေ့ကောဇာဂြိုဟ်စီးဂြိုဟ်နင်းတို့၏ အယှဉ်အမြင်များအားလုံးက တူညီသောအကျိုးသက်ရောက်မှုကို တစ်ပြိုင်တည်း ဖော်ပြသောကာလများကိုသာ သီးသန့်ရွေးချယ်ဖော်ပြထားခြင်း ဖြစ်ပါသည်။ ထို့ကြောင့် ဒသာနှင့် ကောဇာတို့ကို သီးခြားစီ ခွဲခြားဟောပြောထားခြင်း မဟုတ်ပါ။");
        appendReadingBullet(reading, en
                ? "Favourable and difficult contacts are not used to erase each other. When they coincide, both the opportunity and the connected pressure are shown as parts of the same chain of events."
                : "အကျိုးပြုသော ကောဇာအထောက်အပံ့များနှင့် ဖိအားပေးသော ကောဇာသက်ရောက်မှုများကို တစ်ခုနှင့်တစ်ခု အပြန်အလှန် ချေဖျက်ပစ်ခြင်းမျိုး မပြုလုပ်ထားပါ။ ၎င်းတို့ တစ်ပြိုင်တည်း တိုက်ဆိုင်နေပါက ရရှိလာနိုင်မည့် အခွင့်အလမ်းကောင်းများနှင့် ပူးတွဲပါလာမည့် စိန်ခေါ်မှုဖိအားများကို ဘဝဖြစ်စဉ်တစ်ခုတည်း၏ အစိတ်အပိုင်းများအဖြစ် နှစ်ဖက်စလုံးကို စနစ်တကျ ဟောပြောတင်ပြထားပါသည်။");
        if (appendNoAlignedPeriodNotice(reading, windows.isEmpty(), en)) return;
        var mmHeadings = ["အမျိုးတူဂြိုဟ်ဆိုင်ရာ ဒသာ-ကောဇာပေါင်းစပ်ကာလ",
                "ကြာသပတေးဆိုင်ရာ ဒသာ-ကောဇာပေါင်းစပ်ကာလ",
                "အင်္ဂါဆိုင်ရာ ဒသာ-ကောဇာပေါင်းစပ်ကာလ", "စနေဆိုင်ရာ ဒသာ-ကောဇာပေါင်းစပ်ကာလ",
                "ရာဟုဆိုင်ရာ ဒသာ-ကောဇာပေါင်းစပ်ကာလ", "သောကြာဆိုင်ရာ ဒသာ-ကောဇာပေါင်းစပ်ကာလ",
                "ဗုဒ္ဓဟူးဆိုင်ရာ ဒသာ-ကောဇာပေါင်းစပ်ကာလ", "တနင်္လာဆိုင်ရာ ဒသာ-ကောဇာပေါင်းစပ်ကာလ",
                "တနင်္ဂနွေဆိုင်ရာ ဒသာ-ကောဇာပေါင်းစပ်ကာလ", "သံဝေါင်းဆိုင်ရာ ဒသာ-ကောဇာပေါင်းစပ်ကာလ"];
        var enHeadings = ["Same-planet Dasha/Transit Periods", "Jupiter-aligned Dasha/Transit Periods",
                "Mars-aligned Dasha/Transit Periods", "Saturn-aligned Dasha/Transit Periods",
                "Rahu-aligned Dasha/Transit Periods", "Venus-aligned Dasha/Transit Periods",
                "Mercury-aligned Dasha/Transit Periods", "Moon-aligned Dasha/Transit Periods",
                "Sun-aligned Dasha/Transit Periods", "Than-Waung-aligned Dasha/Transit Periods"];
        var grouped = Array(windows.length).fill(false);
        for (var type = 0; type < mmHeadings.length; type++) {
            var shown = 0;
            var limit = type == 3 ? 12 : 4;
            for (var index = 0; index < windows.length && shown < limit; index++) {
                var window = windows[index];
                if (grouped[index] || window.type != type) continue;
                if (shown == 0) appendReadingHeading(reading, en ? enHeadings[type] : mmHeadings[type]);
                var text = new StringBuilder(combinedForecastLead(en));
                text.append(generalTransitInterpretation(window, en));
                var periods = 0;
                for (var match = index; match < windows.length; match++) {
                    var candidate = windows[match];
                    if (grouped[match] || candidate.type != window.type
                            || candidate.target != window.target
                            || candidate.natalStrong != window.natalStrong) continue;
                    grouped[match] = true;
                    if (periods < 12) {
                        text.append(formatDashaForecastPeriod(candidate.mahaLord,
                                candidate.bhuktiLord, candidate.antaraLord,
                                candidate.start, candidate.end));
                        periods++;
                    }
                }
                appendReadingBullet(reading, text.toString());
                shown++;
            }
        }
    
}
function generalTransitInterpretation(window,en) {

        if (window.type == 0) {
            var planet = displayPlanet(EN_PLANET_NAMES[window.target]);
            var strength = en ? (window.natalStrong ? " The natal planet is strong, so its constructive side is clearer."
                                    : " The natal planet is weak, so delays or pressure may be more noticeable.")
                    : (window.natalStrong ? " မူလဇာတာပါ ဂြိုဟ်၏ အင်အားတောင့်တင်းမှုကြောင့် ၎င်းဂြိုဟ်က ပေးစွမ်းနိုင်သော အပြုသဘောဆောင်သည့် ကောင်းကျိုးသက်ရောက်မှုများ ပိုမိုထင်ရှားပေါ်လွင်ပါလိမ့်မည်။"
                       : " မူလဇာတာပါ ဂြိုဟ်၏ အင်အားမပြည့်ဝမှုကြောင့် လုပ်ငန်းဆောင်တာများတွင် အဟန့်အတားများ ကြုံတွေ့ရခြင်းနှင့် ဖိအားပေးခံရခြင်းများကို ပိုမိုသိသာစွာ ကြုံတွေ့ရတတ်ပါသည်။");
            var mm = [
                    "ကောဇာတနင်္ဂနွေဂြိုဟ်သည် မူလဇာတာပါ တနင်္ဂနွေဂြိုဟ်အပေါ် သက်ရောက်နေပါသည်။ ဤကာလအတွင်း လုပ်ငန်းခွင်တိုးတက်ရေး၊ စီးပွားရေးလုပ်ငန်းများ၊ အထက်လူကြီးများ၊ ဖခင်ဖြစ်သူ၊ လူမှုရေး ဂုဏ်သိက္ခာနှင့် ကိုယ်ပိုင်ရပ်တည်ချက် မာနဆိုင်ရာ ကိစ္စရပ်များ ထင်ရှားစွာ ပေါ်ပေါက်လာတတ်ပါသည်။",
                    "ကောဇာတနင်္လာဂြိုဟ်သည် မူလဇာတာပါ တနင်္လာဂြိုဟ်အပေါ် သက်ရောက်နေပါသည်။ ဤကာလအတွင်း စိတ်ခံစားမှု ပြောင်းလဲခြင်း၊ ငွေကြေးဝင်ရောက်ခြင်း၊ မိခင်ဖြစ်သူ၏ အခြေအနေနှင့် မိသားစုဝင်များ၏ အေးချမ်းသာယာမှုဆိုင်ရာ ကိစ္စရပ်များ ပိုမိုလှုပ်ရှားသက်ရောက်လာတတ်ပါသည်။",
                    "ကောဇာအင်္ဂါဂြိုဟ်သည် မူလဇာတာပါ အင်္ဂါဂြိုဟ်အပေါ် သက်ရောက်နေပါသည်။ ဤကာလအတွင်း သူတစ်ပါးနှင့် ယှဉ်ပြိုင်ရခြင်း၊ သဘောထားကွဲလွဲကာ ပဋိပက္ခဖြစ်ခြင်း၊ အမှုအခင်းကြုံရခြင်းနှင့် မတော်တဆ ထိခိုက်ဒဏ်ရာရနိုင်ခြင်း စသည့် ကိစ္စရပ်များကို အထူးသတိပြု ဆင်ခြင်သင့်ပါသည်။",
                    "ကောဇာဗုဒ္ဓဟူးဂြိုဟ်သည် မူလဇာတာပါ ဗုဒ္ဓဟူးဂြိုဟ်အပေါ် သက်ရောက်နေပါသည်။ ဤကာလအတွင်း ဆွေးနွေးပြောဆိုမှုများ ပြုလုပ်ခြင်း၊ ကုန်သွယ်အရောင်းအဝယ် ပြုလုပ်ခြင်း၊ စာချုပ်စာတမ်းများ ချုပ်ဆိုခြင်းနှင့် ငွေကြေးအဝင်အထွက် ပိုမိုတက်ကြွစွာ လှုပ်ရှားခြင်းများ ကြုံရတတ်ပါသည်။",
                    "ကောဇာကြာသပတေးဂြိုဟ်သည် မူလဇာတာပါ ကြာသပတေးဂြိုဟ်အပေါ် သက်ရောက်နေပါသည်။ ဤကာလအတွင်း ပညာသင်ကြားရေး၊ အလုပ်အကိုင် တိုးတက်ရေး၊ စီးပွားရေး၊ ငွေကြေးစုဆောင်းမှု၊ အိုးအိမ်တိုးချဲ့ခြင်းနှင့် အချစ်ရေး၊ အိမ်ထောင်ရေးဆိုင်ရာ တိုးတက်မှု အခွင့်အလမ်းကောင်းများ ပေါ်ပေါက်လာတတ်ပါသည်။",
                    "ကောဇာသောကြာဂြိုဟ်သည် မူလဇာတာပါ သောကြာဂြိုဟ်အပေါ် သက်ရောက်နေပါသည်။ ဤကာလအတွင်း ချစ်မေတ္တာရေးရာများ၊ သက်တောင့်သက်သာ နေထိုင်ရခြင်း၊ အသုံးအဆောင် ပစ္စည်းများနှင့် ငွေကြေးရယူနိုင်မှုဆိုင်ရာ ကိစ္စရပ်များ ပိုမိုထင်ရှား အဆင်ပြေလာတတ်ပါသည်။",
                    "ကောဇာစနေဂြိုဟ်သည် မူလဇာတာပါ စနေဂြိုဟ်အပေါ် သက်ရောက်နေပါသည်။ ဤကာလအတွင်း လုပ်ငန်းများ နှောင့်နှေးကြန့်ကြာခြင်း၊ တာဝန်ဝတ္တရားများ ပိုမိုလေးလံခြင်း၊ အလုပ်အစီအစဉ်များတွင် အဟန့်အတားဖြစ်ခြင်းနှင့် ငွေကြေးဆိုင်ရာ ဖိအားများကို စနစ်တကျ စီမံကိုင်တွယ်ဖြေရှင်းသင့်ပါသည်။",
                    "ကောဇာရာဟုဂြိုဟ်သည် မူလဇာတာပါ ရာဟုဂြိုဟ်အပေါ် သက်ရောက်နေပါသည်။ ဤကာလအတွင်း အလုပ်အကိုင်၊ ခရီးသွားလာမှု၊ စီးပွားရေးလုပ်ငန်းများနှင့် နေရာထိုင်ခင်း အပြောင်းအရွှေ့ ကိစ္စရပ်များမှာ တည်ငြိမ်မှုမရှိဘဲ လျင်မြန်စွာ ပြောင်းလဲတိုးတက်တတ်ပါသည်။"
            ];
            var english = [
                    "Transit Sun contacts natal Sun, highlighting work, authority, father, reputation and pride.",
                    "Transit Moon contacts natal Moon, highlighting emotions, income, mother and family comfort.",
                    "Transit Mars contacts natal Mars, increasing competition, conflict, accident and legal-risk themes.",
                    "Transit Mercury contacts natal Mercury, activating communication, trade, contracts and cash flow.",
                    "Transit Jupiter contacts natal Jupiter, activating education, career, prosperity, property and partnership growth.",
                    "Transit Venus contacts natal Venus, highlighting relationships, comfort, assets and finances.",
                    "Transit Saturn contacts natal Saturn, increasing delay, responsibility, work obstruction and financial pressure.",
                    "Transit Rahu contacts natal Rahu, activating uncertain work, travel, business and relocation changes."
            ];
            return (en ? english[window.target] : mm[window.target]) + strength;
        }
        if (window.type == 1) {
            if (window.target >= 100) {
                var house = window.target - 100;
                var effect;
                if (house == 2) effect = en ? "income, savings and family resources"
                        : "ဝင်ငွေရရှိမှု၊ စုဆောင်းငွေနှင့် မိသားစုဝင်ငွေ အခြေအနေများ";
                else if (house == 7) effect = en ? "partnership, marriage and public dealings"
                        : "အချစ်ရေး၊ အိမ်ထောင်ရေးနှင့် ပတ်ဝန်းကျင်လူမှုဆက်ဆံရေးများ";
                else if (house == 10) effect = en ? "career, promotion and reputation"
                        : "အလုပ်အကိုင်တိုးတက်ခြင်း၊ ရာထူးတိုးခြင်းနှင့် ကောင်းမွန်သော ဂုဏ်သတင်းကျော်စောခြင်းများ";
                else effect = en ? "income, gains and fulfilled plans" : "စီးပွားရေးဝင်ငွေ၊ အကျိုးအမြတ်များနှင့် မိမိ၏ ရည်မှန်းချက်များ အောင်မြင်ပြည့်စုံခြင်းများ";
                return en ? "Jupiter supports the " + houseLabel(house) + " house and its lord, favouring " + effect + "."
                        : "ကောဇာကြာသပတေးဂြိုဟ်က " + houseLabel(house) + " ဘာဝနှင့် ၎င်းဘာဝသခင်ဂြိုဟ်တို့ကို အားပေးကူညီနေပါသည်။ ထို့ကြောင့် " + effect + "ဆိုင်ရာ ကိစ္စရပ်များ ကောင်းမွန်စွာ တိုးတက်အောင်မြင်လာတတ်ပါသည်။";
            }
            var mm = [
                    "ကိုယ်ပိုင်ဂုဏ်သိက္ခာ၊ အလုပ်အကိုင်၊ အာဏာစွမ်းသက်နှင့် ဖခင်ဖြစ်သူ၏ ကျန်းမာချမ်းသာမှုများ ကောင်းမွန်တိုးတက်လာတတ်ပါသည်။",
                    "စိတ်ပိုင်းဆိုင်ရာ အေးချမ်းသာယာမှု၊ ငွေကြေးဝင်ရောက်မှု၊ ကောင်းမွန်သော ဘုန်းကံများနှင့် မိခင်ဖြစ်သူ၏ အခြေအနေများ ကောင်းမွန်လာတတ်ပါသည်။",
                    "ရဲစွမ်းသတ္တိရှိခြင်း၊ လုပ်ငန်းဆောင်တာများကို ထိရောက်စွာ ဆောင်ရွက်နိုင်ခြင်း၊ နေအိမ်အိုးအိမ်နှင့် မြေယာပိုင်ဆိုင်မှုဆိုင်ရာ ကိစ္စရပ်များ အားကောင်းလာတတ်ပါသည်။",
                    "ပညာသင်ကြားရေး၊ စကားပြောဆိုဆက်သွယ်ရေး၊ အရောင်းအဝယ် ကုန်သွယ်မှုနှင့် စီးပွားရေးလုပ်ငန်းများ ပိုမိုတိုးတက်အောင်မြင်လာတတ်ပါသည်။",
                    "ဉာဏ်ပညာ ပိုမိုပွင့်လင်းလာခြင်း၊ ဘာသာရေးနှင့် ကုသိုလ်ရေးရာများ ဆောင်ရွက်နိုင်ခြင်း၊ စီးပွားရေးနှင့် ငွေကြေးဓန တိုးတက်မှုကို အားပေးကူညီပါသည်။",
                    "အချစ်ရေးနှင့် အိမ်ထောင်ရေး အဆင်ပြေခြင်း၊ သက်တောင့်သက်သာ နေထိုင်ရခြင်း၊ စည်းစိမ်ဥစ္စာ တိုးပွားခြင်းနှင့် ယာဉ်ကားပိုင်ဆိုင်နိုင်မှု ကိစ္စရပ်များ ကောင်းမွန်လာတတ်ပါသည်။",
                    "", "စိတ်ပိုင်းဆိုင်ရာ တည်ငြိမ်အေးချမ်းခြင်း၊ ကောင်းမွန်သော ခရီးစဉ်များ သွားရခြင်းနှင့် ကောင်းမွန်သော နေရာထိုင်ခင်းများသို့ ပြောင်းရွှေ့ရခြင်းတို့ကို အားပေးကူညီပါသည်။"
            ];
            var english = [
                    "reputation, career, authority and the father's wellbeing", "emotional ease, finances, influence and the mother's wellbeing",
                    "courage, effective action, property and land", "education, communication, trade and business",
                    "wisdom, spiritual activity, prosperity and wealth", "relationships, comfort, assets and vehicles", "",
                    "mental calm, favourable travel and relocation"
            ];
            var lead = en ? "Jupiter contacts natal " + displayPlanet(EN_PLANET_NAMES[window.target]) + ", supporting "
                    : "ကောဇာကြာသပတေးဂြိုဟ်က မူလဇာတာပါ " + displayPlanet(EN_PLANET_NAMES[window.target]) + "ဂြိုဟ်ကို အားပေးကူညီနေပါသည်။ ထို့ကြောင့် ";
            return lead + (en ? english[window.target] + "." : mm[window.target]);
        }
        if (window.type >= 3) {
            var house = window.target >= 100 ? window.target - 100 : 1;
            if (window.type == 3) {
                if (window.target == 200) return en
                        ? (window.natalStrong
                           ? "Saturn closely crosses the Ascendant while also reinforcing Moon-related pressure. Career plans, study, business judgement and personal energy may slow markedly; simplify commitments and avoid major decisions made from fatigue."
                           : "Saturn closely crosses the Ascendant. Career plans, education, business judgement and personal initiative may feel delayed or blocked; use a slower schedule and verify decisions carefully.")
                        : (window.natalStrong
                           ? "ကောဇာစနေဂြိုဟ်သည် လဂ်ဘာဝပေါ်သို့ အနီးကပ် ဖြတ်သန်းစီးနင်းနေပြီး စန်း (တနင်္လာဂြိုဟ်) ဆိုင်ရာ ဖိအားပေးမှုနှင့်လည်း ထပ်တူကျနေပါသည်။ ထို့ကြောင့် လုပ်ငန်းအစီအစဉ်များ၊ ပညာရေး၊ စီးပွားရေးဆိုင်ရာ ဆုံးဖြတ်ချက်များနှင့် ကိုယ်အားစိတ်အား လှုပ်ရှားမှုများ သိသိသာသာ နှေးကွေးသွားတတ်ပါသည်။ ဤကာလအတွင်း တာဝန်ဝတ္တရားများကို တတ်နိုင်သမျှ လျှော့ချထားသင့်ပြီး၊ ပင်ပန်းနွမ်းနယ်နေချိန်တွင် အရေးကြီးသော ဆုံးဖြတ်ချက်များ ချမှတ်ခြင်းကို အတတ်နိုင်ဆုံး ရှောင်ကြဉ်သင့်ပါသည်။"
                           : "ကောဇာစနေဂြိုဟ်သည် လဂ်ဘာဝပေါ်သို့ အနီးကပ် ဖြတ်သန်းစီးနင်းနေပါသည်။ ထို့ကြောင့် လုပ်ငန်းအစီအစဉ်များ၊ ပညာရေး၊ စီးပွားရေးဆိုင်ရာ ဆုံးဖြတ်ချက်များနှင့် ကိုယ်ပိုင်လုပ်ဆောင်နိုင်စွမ်းများ နှောင့်နှေးကြန့်ကြာခြင်း သို့မဟုတ် ပိတ်ဆို့သလိုဖြစ်ခြင်းမျိုး ကြုံရတတ်ပါသည်။ အရာရာကို အရှိန်အနည်းငယ်လျှော့၍ စနစ်တကျ လုပ်ဆောင်သင့်ပြီး ဆုံးဖြတ်ချက်များကိုလည်း သေချာစွာ ထပ်ဖန်တလဲလဲ ပြန်လည်စစ်ဆေးသင့်ပါသည်။");
                if (window.target == 201) return en
                        ? (window.natalStrong
                           ? "Saturn moves through the 12th, 1st or 2nd sign from the natal Moon while Ascendant pressure also overlaps. Emotional heaviness, family or financial responsibility and prolonged delay may be stronger than usual."
                           : "Saturn moves through the 12th, 1st or 2nd sign from the natal Moon. Emotional heaviness, worry, family responsibility and financial delay require patience and a stable routine.")
                        : (window.natalStrong
                           ? "ကောဇာစနေဂြိုဟ်သည် မူလစန်း (တနင်္လာဂြိုဟ်) ရာသီ၏ အရှေ့၊ အနောက်နှင့် စန်းတည်ရာ ရာသီများဖြစ်သော (၁၂၊ ၁၊ ၂ တန့်ဘာဝများ) အတွင်း ဖြတ်သန်းစီးနင်းနေပြီး (စန္ဒဝတ်စနေ သက်ရောက်နေပြီး) လဂ်ဘာဝအပေါ် ဖိအားပေးမှုနှင့်ပါ ထပ်တူကျနေပါသည်။ ထို့ကြောင့် စိတ်ပိုင်းဆိုင်ရာ လေးလံပင်ပန်းခြင်း၊ မိသားစုနှင့် ငွေကြေးဆိုင်ရာ တာဝန်ဝတ္တရားများ လေးလံခြင်းနှင့် ကိစ္စရပ်များ ရေရှည်နှောင့်နှေးကြန့်ကြာခြင်းတို့ ပုံမှန်ထက် ပိုမိုပြင်းထန်စွာ ကြုံတွေ့ရတတ်ပါသည်။"
                           : "ကောဇာစနေဂြိုဟ်သည် မူလစန်း (တနင်္လာဂြိုဟ်) ရာသီ၏ အရှေ့၊ အနောက်နှင့် စန်းတည်ရာ ရာသီများဖြစ်သော (၁၂၊ ၁၊ ၂ တန့်ဘာဝများ) အတွင်း ဖြတ်သန်းစီးနင်းနေပါသည်။ (စန္ဒဝတ်စနေ သက်ရောက်နေသဖြင့်) စိတ်ပိုင်းဆိုင်ရာ လေးလံခြင်း၊ စိုးရိမ်ပူပန်မှုများခြင်း၊ မိသားစုတာဝန်ဝတ္တရား လေးလံခြင်းနှင့် ငွေကြေးစီးဆင်းမှု နှောင့်နှေးခြင်းတို့ ကြုံရတတ်သဖြင့် စိတ်ရှည်သည်းခံမှုရှိရှိဖြင့် နေ့စဉ်လုပ်ဆောင်မှုများကို တည်ငြိမ်အောင် ထိန်းသိမ်းကိုင်တွယ်သင့်ပါသည်။");
                if (window.target == 202) return en
                        ? (window.natalStrong
                           ? "Saturn moves through the 12th, 1st or 2nd sign from the Ascendant and overlaps Moon-related pressure. Personal direction, work, education and finances may all feel constrained at once."
                           : "Saturn moves through the 12th, 1st or 2nd sign from the Ascendant. Personal plans, work, education and financial progress may slow, so protect time and resources.")
                        : (window.natalStrong
                           ? "ကောဇာစနေဂြိုဟ်သည် လဂ်မှ (၁၂၊ ၁၊ ၂ တန့်ဘာဝများ) အတွင်း ဖြတ်သန်းစီးနင်းနေပြီး စန်း (တနင်္လာဂြိုဟ်) ဆိုင်ရာ ဖိအားပေးမှုများနှင့်ပါ ထပ်တူကျနေပါသည်။ ထို့ကြောင့် မိမိ၏ ကိုယ်ပိုင်ရည်ရွယ်ချက်များ၊ အလုပ်အကိုင်၊ ပညာရေးနှင့် ငွေကြေးစီးပွားရေး အခြေအနေအားလုံး တစ်ပြိုင်တည်း ကန့်သတ်ချုပ်ချယ်ခံရသလိုမျိုး ခံစားရတတ်ပါသည်။"
                           : "ကောဇာစနေဂြိုဟ်သည် လဂ်မှ (၁၂၊ ၁၊ ၂ တန့်ဘာဝများ) အတွင်း ဖြတ်သန်းစီးနင်းနေပါသည်။ ထို့ကြောင့် ကိုယ်ပိုင်အစီအစဉ်များ၊ အလုပ်အကိုင်၊ ပညာရေးနှင့် ငွေကြေးတိုးတက်မှုနှုန်းများ နှေးကွေးသွားတတ်သဖြင့် အချိန်နှင့် မိမိ၏ အရင်းအနှီး အင်အားစုများကို စနစ်တကျ ထိန်းသိမ်းအသုံးပြုသင့်ပါသည်။");
                if (window.target == 203) return en
                        ? "The transit Moon returns to the natal Moon during an active Saturn-pressure phase. Mood, worry and impulsive emotional reactions may peak briefly; postpone unnecessary confrontation and rest before deciding."
                        : "ကောဇာတနင်္လာဂြိုဟ်သည် မူလဇာတာပါ စန်း (တနင်္လာဂြိုဟ်) တည်ရာ ရာသီပေါ်သို့ ပြန်လည်စီးနင်းချိန်တွင် စနေဂြိုဟ်၏ ဖိအားပေးမှုနှင့် တိုက်ဆိုင်နေပါသည်။ ဤကာလတိုအတွင်း စိတ်လှုပ်ရှားလွယ်ခြင်း၊ စိုးရိမ်ပူပန်မှုများခြင်းနှင့် စိတ်ခံစားမှုနောက်လိုက်၍ အလျင်စလို တုံ့ပြန်မိခြင်းတို့ ခဏတာ ပိုမိုပြင်းထန်လာတတ်ပါသည်။ ထို့ကြောင့် မလိုအပ်သော ထိပ်တိုက်တွေ့ဆုံ ငြင်းခုံမှုများကို အတတ်နိုင်ဆုံး ရှောင်ကြဉ်ပြီး၊ ကောင်းစွာ အနားယူပြီးမှသာ ဆုံးဖြတ်ချက်များကို ချမှတ်သင့်ပါသည်။";
                if (window.target == 204) return en
                        ? "Mars contacts natal Mercury. Patience and judgement may drop quickly, increasing anger, sharp speech and poorly considered decisions; pause before replying or signing."
                        : "ကောဇာအင်္ဂါဂြိုဟ်သည် မူလဇာတာပါ ဗုဒ္ဓဟူးဂြိုဟ်အပေါ် သက်ရောက်နေပါသည်။ ထို့ကြောင့် စိတ်ရှည်သည်းခံနိုင်စွမ်း လျော့နည်းခြင်း၊ ဒေါသထွက်လွယ်ခြင်း၊ စကားပြင်းပြင်းထန်ထန် ပြောဆိုမိခြင်းနှင့် သေချာစွာ မစဉ်းစားဘဲ အလျင်စလို ဆုံးဖြတ်မိခြင်းတို့ ဖြစ်ပေါ်တတ်ပါသည်။ စကားပြန်လည် မတုံ့ပြန်မီ သို့မဟုတ် စာချုပ်စာတမ်းများတွင် လက်မှတ်မရေးထိုးမီ ခေတ္တရပ်ဆိုင်း၍ သေချာစွာ စဉ်းစားသင့်ပါသည်။";
                if (window.target == 205) return en
                        ? (window.natalStrong
                           ? "Saturn and Rahu both influence natal Mercury. Confusion, pessimism and difficulty separating reliable facts from fear may become pronounced; obtain a second opinion before major decisions."
                           : "Saturn or Rahu influences natal Mercury. Mental pressure, indecision and mistaken judgement are possible; verify information and avoid decisions made under distress.")
                        : (window.natalStrong
                           ? "ကောဇာစနေဂြိုဟ်နှင့် ရာဟုဂြိုဟ်နှစ်လုံးစလုံးက မူလဇာတာပါ ဗုဒ္ဓဟူးဂြိုဟ်အပေါ် ပူးတွဲဖိအားပေးနေပါသည်။ ထို့ကြောင့် စိတ်ဝေခွဲရခက်ခြင်း၊ အဆိုးမြင်စိတ်များခြင်းနှင့် ကြောက်ရွံ့စိုးရိမ်စိတ်များကြောင့် အမှန်နှင့်အမှားကို ကွဲပြားအောင် ဆုံးဖြတ်ရန် ခက်ခဲခြင်းတို့ ပိုမိုပြင်းထန်လာတတ်ပါသည်။ အရေးကြီးသော ဆုံးဖြတ်ချက်ကြီးများ မချမှတ်မီ ယုံကြည်စိတ်ချရသူများထံမှ ဒုတိယအမြင် သို့မဟုတ် အကြံဉာဏ်ကောင်းများကို ရယူသင့်ပါသည်။"
                           : "ကောဇာစနေဂြိုဟ် သို့မဟုတ် ရာဟုဂြိုဟ်က မူလဇာတာပါ ဗုဒ္ဓဟူးဂြိုဟ်အပေါ် ဖိအားပေးနေပါသည်။ ထို့ကြောင့် စိတ်ဖိအားများခြင်း၊ ဝေခွဲမရဘဲ ဆုံးဖြတ်ချက်မချနိုင်ခြင်းနှင့် အခြေအနေများကို အကဲဖြတ်မှားယွင်းခြင်းတို့ ဖြစ်ပေါ်တတ်သဖြင့် ရရှိလာသော အချက်အလက်များကို သေချာစွာ ပြန်လည်စစ်ဆေးသင့်ပြီး၊ စိတ်ညစ်ညူး ပင်ပန်းနေချိန်တွင် အလျင်စလို ဆုံးဖြတ်ချက်မချသင့်ပါ။");
                var effect;
                if (house == 2) effect = en ? "income delays, business slowdown and financial pressure"
                        : "ငွေကြေးရရှိမှု နှောင့်နှေးကြန့်ကြာခြင်း၊ စီးပွားရေးလုပ်ငန်းများ တုံ့ဆိုင်းနှေးကွေးခြင်းနှင့် ငွေကြေးဆိုင်ရာ ဖိအားများခြင်း";
                else if (house == 4) effect = en ? "emotional strain, property, home and vehicle burdens"
                        : "စိတ်ပိုင်းဆိုင်ရာ ဖိစီးပင်ပန်းခြင်း၊ နေအိမ်၊ အိမ်ခြံမြေနှင့် ယာဉ်ကားဆိုင်ရာ ဝန်ထုပ်ဝန်ပိုးများ ရှိလာခြင်း";
                else if (house == 7) effect = en ? "distance or difficulty in marriage and partnerships"
                        : "အချစ်ရေး၊ အိမ်ထောင်ရေးနှင့် လုပ်ဖော်ကိုင်ဖက် ဆက်ဆံရေးများတွင် အေးစက်ခက်ခဲခြင်း";
                else if (house == 10) effect = en ? "career delay, heavier responsibility and reputation pressure"
                        : "အလုပ်အကိုင်လုပ်ငန်းများ နှောင့်နှေးခြင်း၊ တာဝန်ဝတ္တရားများ ပိုမိုလေးလံလာခြင်းနှင့် ဂုဏ်သိက္ခာပိုင်းဆိုင်ရာ ဖိအားများ ကြုံရခြင်း";
                else effect = en ? "delayed gains, reduced support and frustrated expectations"
                            : "ရရှိမည့် အကျိုးအမြတ်များ နှောင့်နှေးခြင်း၊ ကူညီပံ့ပိုးမှုများ လျော့နည်းသွားခြင်းနှင့် မျှော်လင့်ချက်များ ပျက်ပြားရခြင်း";
                return en ? "Saturn influences the " + houseLabel(house) + " house and its lord, indicating " + effect + ". Use patience, documentation and long-term planning."
                        : "ကောဇာစနေဂြိုဟ်က " + houseLabel(house) + " ဘာဝနှင့် ၎င်းဘာဝသခင်ဂြိုဟ်တို့ကို ဖိအားပေးသက်ရောက်နေပါသည်။ ထို့ကြောင့် " + effect + "များ ဖြစ်ပေါ်တတ်သဖြင့် စိတ်ရှည်သည်းခံမှု ထားရှိသင့်ပြီး၊ စာရွက်စာတမ်း အထောက်အထားများနှင့် ရေရှည်အစီအစဉ်များကို စနစ်တကျ ပြင်ဆင်ချမှတ်ထားသင့်ပါသည်။";
            }
            if (window.type == 4 || window.type == 9) {
                var actor = window.type == 9 ? (en ? "Than-Waung" : "သံဝေါင်း") : (en ? "Rahu" : "ရာဟု");
                var effect = house == 1 ? (en ? "personal direction, work and residence may change suddenly"
                                              : "ကိုယ်ပိုင်ရည်ရွယ်ချက်၊ လုပ်ငန်းဆောင်တာနှင့် နေရာထိုင်ခင်းများ ရုတ်တရက် ပြောင်းလဲသွားနိုင်ပါသည်")
                        : house == 2 ? (en ? "finances and business judgement may become unstable"
                                        : "ငွေကြေးအခြေအနေနှင့် စီးပွားရေးဆိုင်ရာ ဆုံးဖြတ်ချက်များ မတည်မငြိမ် ဖြစ်ပေါ်လာနိုင်ပါသည်")
                          : (en ? "career direction, duties or workplace may change"
                             : "အလုပ်အကိုင် လမ်းကြောင်း၊ လုပ်ငန်းတာဝန်များ သို့မဟုတ် လုပ်ငန်းခွင်နေရာများ ပြောင်းလဲသွားနိုင်ပါသည်");
                return en ? actor + " influences the " + houseLabel(house) + " house and its lord; " + effect + ". Verify facts before making major changes."
                        : "ကောဇာ" + actor + "ဂြိုဟ်သည် " + houseLabel(house) + " ဘာဝနှင့် ၎င်းဘာဝသခင်ဂြိုဟ်တို့ကို လှုပ်ရှားသက်ရောက်နေပါသည်။ ထို့ကြောင့် " + effect + "။ အရေးကြီးသော အပြောင်းအလဲများ မပြုလုပ်မီ အချက်အလက်များကို သေချာစွာ စစ်ဆေးသင့်ပါသည်။";
            }
            if (window.type == 5) return en
                    ? "Venus and Jupiter jointly support the " + houseLabel(house) + " house. Relationships, comfort, assets and material opportunities receive stronger support."
                    : "ကောဇာသောကြာဂြိုဟ်နှင့် ကြာသပတေးဂြိုဟ်တို့က " + houseLabel(house) + " ဘာဝကို တစ်ပြိုင်တည်း အားပေးကူညီနေပါသည်။ ထို့ကြောင့် အချစ်ရေး၊ အိမ်ထောင်ရေး၊ သက်တောင့်သက်သာ နေထိုင်ရခြင်း၊ ပိုင်ဆိုင်မှုနှင့် ငွေကြေးအခွင့်အလမ်းများ ပိုမိုကောင်းမွန်လာတတ်ပါသည်။";
            if (window.type == 6) return en
                    ? "Unafflicted Mercury and Jupiter jointly support the " + houseLabel(house) + " house. Learning, communication, negotiation and commerce are favoured."
                    : "ပါပဂြိုဟ်များ၏ ဖိအားမရှိသော ကောဇာဗုဒ္ဓဟူးဂြိုဟ်နှင့် ကြာသပတေးဂြိုဟ်တို့က " + houseLabel(house) + " ဘာဝကို တစ်ပြိုင်တည်း အားပေးကူညီနေပါသည်။ ထို့ကြောင့် ပညာသင်ယူမှု၊ ဆွေးနွေးပြောဆိုမှု၊ ညှိနှိုင်းမှုနှင့် အရောင်းအဝယ် လုပ်ငန်းများအတွက် အထူးပင် ကောင်းမွန်သော ကာလဖြစ်ပါသည်။";
            if (window.type == 7) return en
                    ? "Moon and Jupiter jointly support the " + houseLabel(house) + " house. Emotional ease, finances and family-related matters receive a constructive opening."
                    : "ကောဇာတနင်္လာဂြိုဟ်နှင့် ကြာသပတေးဂြိုဟ်တို့က " + houseLabel(house) + " ဘာဝကို တစ်ပြိုင်တည်း အားပေးကူညီနေပါသည်။ ထို့ကြောင့် စိတ်ပိုင်းဆိုင်ရာ အေးချမ်းသာယာခြင်း၊ ငွေကြေးကိစ္စများ အဆင်ပြေခြင်းနှင့် မိသားစုဆိုင်ရာ ကိစ္စရပ်များ ကောင်းမွန်လာစေရန် အခွင့်အရေးများ ရရှိပါလိမ့်မည်။";
            return en ? (window.natalStrong
                         ? "Sun activates the " + houseLabel(house) + " house without concentrated malefic pressure. Career, authority and initiative can progress through disciplined action."
                         : "Sun activates the " + houseLabel(house) + " house together with malefic pressure. Work, authority and finances may bring stress, so avoid ego-driven decisions.")
                    : (window.natalStrong
                       ? "ကောဇာတနင်္ဂနွေဂြိုဟ်သည် " + houseLabel(house) + " ဘာဝကို လှုပ်ရှားသက်ရောက်နေပြီး ပါပဂြိုဟ်တို့၏ ဖိအားပြင်းထန်မှုမရှိပါ။ စည်းကမ်းတကျရှိရှိ လုပ်ဆောင်ပါက အလုပ်အကိုင်၊ ရာထူးနှင့် ဦးဆောင်မှု ကဏ္ဍများတွင် တိုးတက်နိုင်ပါသည်။"
                       : "ကောဇာတနင်္ဂနွေဂြိုဟ်သည် " + houseLabel(house) + " ဘာဝကို လှုပ်ရှားသက်ရောက်နေချိန်တွင် ပါပဂြိုဟ်တို့၏ ဖိအားပေးမှုများလည်း ရှိနေပါသည်။ အလုပ်အကိုင်၊ ရာထူးနှင့် ငွေကြေးကိစ္စများတွင် စိတ်ဖိအားများ ဖြစ်ပေါ်တတ်သဖြင့် မာနထားခြင်းနှင့် အလျင်စလို ဆုံးဖြတ်ခြင်းမျိုးကို ရှောင်ကြဉ်သင့်ပါသည်။");
        }
        if (window.target >= 100) {
            var house = window.target - 100;
            var mmEffects = ["", "ကိုယ်ခန္ဓာကျန်းမာရေး၊ ဆုံးဖြတ်ချက်နှင့် ထိခိုက်ဒဏ်ရာများ", "ငွေကြေးနှင့် စကားအငြင်းပွားမှုများ", "",
                    "နေအိမ်၊ စိတ်ဖိအားနှင့် ယာဉ်လုံခြုံရေးများ", "", "", "အချစ်ရေး၊ အိမ်ထောင်ရေးနှင့် ပူးပေါင်းဆောင်ရွက်မှုများ", "", "", "လုပ်ငန်းခွင် ပြိုင်ဆိုင်မှုနှင့် အာဏာပိုင်ဆိုင်ရာ ဖိအားများ"];
            return en ? "Mars activates the " + houseLabel(house) + " house and its lord. Avoid impulsive action, conflict and preventable risk in matters of this house."
                    : "ကောဇာအင်္ဂါဂြိုဟ်က " + houseLabel(house) + " ဘာဝနှင့် ၎င်းဘာဝသခင်ဂြိုဟ်တို့ကို ဖိအားပေးသက်ရောက်နေပါသည်။ "
                      + mmEffects[house] + " စသည့် ကိစ္စရပ်များတွင် အလျင်စလို လုပ်ဆောင်ခြင်း၊ ရန်ဖြစ်ခြင်းနှင့် ကြိုတင်ကာကွယ်၍ရသော အန္တရာယ်များကို အတတ်နိုင်ဆုံး ရှောင်ကြဉ်သင့်ပါသည်။";
        }
        var target = displayPlanet(EN_PLANET_NAMES[window.target]);
        return en ? "Mars contacts natal " + target + ". Physical strain, impulsive decisions and conflict require extra control."
                : "ကောဇာအင်္ဂါဂြိုဟ်က မူလဇာတာပါ " + target + "ဂြိုဟ်ကို သက်ရောက်ထိတွေ့နေပါသည်။ ထို့ကြောင့် ကိုယ်လက်အားလွန်သုံးခြင်း၊ အလျင်စလို ဆုံးဖြတ်ခြင်းနှင့် ပဋိပက္ခဖြစ်ခြင်းများကို အထူးသတိပြု ထိန်းချုပ်သင့်ပါသည်။";
    
}
function planetConjoinsOrAspects(source,target,planets) {

        var sourceSign = zodiacSign(planets[source]);
        var targetSign = zodiacSign(planets[target]);
        return sourceSign == targetSign || planetAspectsSign(source, sourceSign, targetSign);
    
}
function anyPlanetConjoinsOrAspectsPlanet(sources,target,planets) {

        for (let source of sources) if (source != target && planetConjoinsOrAspects(source, target, planets)) return true;
        return false;
    
}
function appendAscendantLordExchangeResults(findings,planets,asc,ascLord,en) {

        var mmResults = [
                "", "ပညာဉာဏ်နှင့် ငွေကြေးတိုးတက်မှု", "သတ္တိ၊ ဆက်သွယ်ရေးနှင့် ကျော်ကြားမှု",
                "အိုးအိမ်၊ မြေယာနှင့် ပစ္စည်းတည်ငြိမ်မှု", "ပညာရေး၊ ဖန်တီးနိုင်မှုနှင့် သားသမီးအကျိုး",
                "ပြိုင်ဆိုင်မှုနှင့် ဝန်ဆောင်မှုလုပ်ငန်း", "အိမ်ထောင်ဖက်နှင့် အများဆိုင်ရာလုပ်ငန်း",
                "ကျန်းမာရေးနှင့် ငွေကြေးအပြောင်းအလဲ", "ကံအထောက်အပံ့၊ ခရီးနှင့် မြင့်မြတ်သောရည်ရွယ်ချက်",
                "အလုပ်အကိုင်အောင်မြင်မှုနှင့် လူမှုဂုဏ်သိက္ခာ", "ဝင်ငွေ၊ မိတ်ဆွေကွန်ရက်နှင့် ရည်မှန်းချက်ပြည့်မှု",
                "အသုံးစရိတ်၊ နိုင်ငံရပ်ခြားနှင့် လျှို့ဝှက်အဟန့်အတား"
        ];
        var enResults = [
                "", "education, judgement and wealth", "courage, communication and recognition",
                "property, home and material stability", "education, creativity and children",
                "competition and service-related work", "partnership and public-facing work",
                "health and financial transformation", "fortune, travel and higher purpose",
                "career success and public standing", "income, networks and fulfilled ambitions",
                "expenses, foreign connections and hidden obstacles"
        ];
        for (var house = 2; house <= 12; house++) {
            var houseLord = signRuler((asc + house - 1) % 12);
            if (houseLord == ascLord) continue;
            if (signRuler(zodiacSign(planets[ascLord])) == houseLord
                    && signRuler(zodiacSign(planets[houseLord])) == ascLord) {
                findings.add(en
                        ? "The Ascendant lord exchanges signs with the " + house + "th house lord, emphasising " + enResults[house - 1] + "."
                        : "လဂ်သခင်ဂြိုဟ်နှင့် " + localizeDigits(String(house)) + " ဘာဝသခင်ဂြိုဟ်တို့ အိမ်ဖလှယ်တည်ရှိနေပါသဖြင့် " + mmResults[house - 1] + "ကိစ္စရပ်များ ပိုမိုထင်ရှားပေါ်လွင်လာတတ်ပါသည်။");
            }
        }
    
}
function appendNatalNavamsaReading(reading,planets,cusps,en) {

        appendReadingHeading(reading, en
                ? "Combined Natal and Navamsa Assessment"
                : "မူလဖွားဇာတာနှင့် နဝင်းဇာတာ ပေါင်းစပ်သုံးသပ်ချက်");
        reading.append(en
                ? "The natal chart describes the visible promise of life, while the Navamsa confirms the underlying strength with which that promise can mature. The following assessment compares each planet in both charts.\n\n"
                : "မူလဖွားဇာတာသည် ဘဝတွင် ပေါ်လွင်လာနိုင်သော အခြေအနေကို ဖော်ပြပြီး၊ နဝင်းဇာတာသည် ထိုအခြေအနေကို အကောင်အထည်ဖော်နိုင်မည့် အတွင်းအားကို အတည်ပြုပေးပါသည်။ အောက်ပါသုံးသပ်ချက်တွင် ဂြိုဟ်တစ်လုံးချင်းစီ၏ မူလရာသီနှင့် နဝင်းရာသီတို့ကို ပေါင်းစပ်စစ်ဆေးထားပါသည်။\n\n");

        var navamsa = mapArrayToNavamsa(planets);
        var ascSign = zodiacSign(cusps[1]);
        var moonSign = zodiacSign(planets[1]);
        var foundNotable = false;
        for (var planet = 0; planet < Math.min(9, planets.length); planet++) {
            var natalSign = zodiacSign(planets[planet]);
            var navSign = zodiacSign(navamsa[planet]);
            var vargottama = natalSign == navSign;
            var natalExalted = isExaltedSign(planet, natalSign);
            var natalDebilitated = isDebilitatedSign(planet, natalSign);
            var navExalted = isExaltedSign(planet, navSign);
            var navDebilitated = isDebilitatedSign(planet, navSign);
            var natalOwn = planet < 7 && signRuler(natalSign) == planet;
            var navOwn = planet < 7 && signRuler(navSign) == planet;
            var natalMoola = planet < 7
                    && isMoolatrikona(planet, natalSign, normalize(planets[planet]) % 30.0);
            var navFriendly = planet < 7 && isFriendlySign(planet, navSign);
            var cancellationReasons = natalDebilitated
                    ? debilitationCancellationReasons(planet, planets, navamsa, ascSign, moonSign, en)
                    : [];

            if (!(vargottama || natalExalted || natalDebilitated || navExalted || navDebilitated
                    || natalOwn || navOwn || natalMoola || navFriendly)) continue;
            foundNotable = true;
            var start = reading.length;
            reading.append(displayPlanet(EN_PLANET_NAMES[planet])).append("\n");

            reading.append(en ? "Natal: " : "မူလဇာတာ - ")
                    .append(dignitySummary(planet, natalSign, planets[planet], false, en)).append("\n");
            reading.append(en ? "Navamsa: " : "နဝင်းဇာတာ - ")
                    .append(dignitySummary(planet, navSign, navamsa[planet], true, en)).append("\n");

            if (vargottama) {
                reading.append(en
                        ? "Judgement: Vargottama strength reinforces the planet's natal indications and makes its characteristic results more consistent."
                        : "သုံးသပ်ချက် - မူလရာသီနှင့် နဝင်းရာသီတူညီသော ဝဂ္ဂုတ္တမနဝင်း ရရှိသဖြင့် ဂြိုဟ်၏ ပင်ကိုအင်အား တည်ငြိမ်ပြီး မူလဇာတာပါ အကျိုးသက်ရောက်မှုကို ပိုမိုခိုင်မာစေပါသည်။");
            } else if (natalExalted && navDebilitated) {
                reading.append(en
                        ? "Judgement: Natal exaltation is weakened by debilitation in Navamsa; favourable promise remains, but its full result may require discipline and a period where Dasha and transit support the same planet."
                        : "သုံးသပ်ချက် - မူလဇာတာတွင် ဥစ်အားရသော်လည်း နဝင်းဇာတာတွင် နိစ်မူနေသဖြင့် ဥစ်၏ကောင်းကျိုးအပြည့်အဝကို လွယ်ကူစွာ မပေးနိုင်ပါ။ စနစ်တကျ ကြိုးပမ်းပြီး ထိုဂြိုဟ်ဆိုင်ရာ ဒသာနှင့် ကောဇာကိုက်ညီချိန်တွင် အကျိုးကောင်း ပိုထင်ရှားနိုင်ပါသည်။");
            } else if (natalDebilitated && (navExalted || !cancellationReasons.isEmpty())) {
                reading.append(en
                        ? "Judgement: Natal debilitation is substantially relieved by Navamsa strength or a cancellation condition. Initial difficulty can be transformed into maturity and constructive achievement."
                        : "သုံးသပ်ချက် - မူလဇာတာ၏ နိစ်အားကို နဝင်းအား သို့မဟုတ် နိစ်အားပျက်အခြေအနေက ချေဖျက်ပေးနေပါသည်။ အစပိုင်းအခက်အခဲများမှ အတွေ့အကြုံရရှိပြီး နောက်ပိုင်းတွင် အကျိုးကောင်းနှင့် အောင်မြင်မှုအဖြစ် ပြောင်းလဲဖော်ဆောင်နိုင်ပါသည်။");
            } else if (natalDebilitated) {
                reading.append(en
                        ? "Judgement: The planet requires careful handling because its natal debilitation is not strongly corrected in Navamsa. Its areas of life improve through patience, training and conscious restraint."
                        : "သုံးသပ်ချက် - မူလဇာတာတွင် နိစ်မူပြီး နဝင်းမှ အင်အားပြန်လည်ဖြည့်တင်းမှု မထင်ရှားသဖြင့် ထိုဂြိုဟ်ဆိုင်ရာကိစ္စများကို သတိနှင့် ကိုင်တွယ်သင့်ပါသည်။ သည်းခံခြင်း၊ လေ့ကျင့်သင်ယူခြင်းနှင့် မိမိကိုယ်ကို ထိန်းညှိခြင်းဖြင့် အားနည်းချက်ကို လျော့ပါးစေနိုင်ပါသည်။");
            } else if (navExalted || navOwn || navFriendly) {
                reading.append(en
                        ? "Judgement: Supportive Navamsa dignity strengthens the planet over time and helps its constructive qualities mature with experience."
                        : "သုံးသပ်ချက် - နဝင်းဇာတာ၌ အားကောင်းသော ရာသီဂုဏ် ရရှိသဖြင့် အသက်အရွယ်နှင့် အတွေ့အကြုံ ရလာသည်နှင့်အမျှ ဂြိုဟ်၏ ကောင်းသော အရည်အသွေးများ ပိုမိုပေါ်လွင်နိုင်ပါသည်။");
            } else {
                reading.append(en
                        ? "Judgement: Natal dignity gives the planet useful strength, while its final results should be judged together with Dasa and transit periods."
                        : "သုံးသပ်ချက် - မူလရာသီဂုဏ်အရ အသုံးဝင်သော အင်အားရှိပြီး နောက်ဆုံးအကျိုးပေးမှုကို ဘာဝသခင်ဖြစ်မှု၊ ဒသာနှင့် ဂြိုဟ်စီးဂြိုဟ်နင်းကာလတို့နှင့် ပေါင်းစပ်ဆုံးဖြတ်သင့်ပါသည်။");
            }
            if (!cancellationReasons.isEmpty()) {
                reading.append("\n").append(en ? "Debilitation cancellation: " : "နိစ်အားပျက်အကြောင်း - ")
                        .append(joinText(cancellationReasons, en ? "; " : "၊ "));
            }
            reading.append("\n\n");
        }
        if (!foundNotable) {
            reading.append(en
                    ? "No exceptional dignity contrast was found between the natal and Navamsa charts. Results should therefore be judged mainly through house rulership, aspects, Dasa and transit."
                    : "မူလဖွားဇာတာနှင့် နဝင်းဇာတာအကြား ထူးခြားသော ရာသီဂုဏ်အပြောင်းအလဲ မတွေ့ရပါ။ ထို့ကြောင့် ဘာဝသခင်ဖြစ်မှု၊ ဂြိုဟ်အမြင်၊ ဒသာနှင့် ဂြိုဟ်စီးဂြိုဟ်နင်းတို့ကို အဓိကထား၍ ဆက်လက်ဆုံးဖြတ်သင့်ပါသည်။");
        }
    
}
function dignitySummary(planet,sign,longitude,navamsa,en) {

        var qualities = [];
        if (isExaltedSign(planet, sign)) qualities.add(en ? "Exalted" : "ဥစ်");
        if (isDebilitatedSign(planet, sign)) qualities.add(en ? "Debilitated" : "နိစ်");
        if (planet < 7 && signRuler(sign) == planet) qualities.add(en ? "Own sign" : "ကသစ်");
        if (!navamsa && planet < 7 && isMoolatrikona(planet, sign, normalize(longitude) % 30.0)) {
            qualities.add(en ? "Moolatrikona" : "မူလတြိကောဏ");
        }
        if (planet < 7 && isFriendlySign(planet, sign)) qualities.add(en ? "Friendly sign" : "မိတ်အိမ်");
        if (qualities.isEmpty()) qualities.add(en ? "Ordinary strength" : "သာမန်အား");
        return (en ? EN_RASI_NAMES[sign] : MM_RASI_NAMES[sign]) + " (" + joinText(qualities, en ? ", " : "၊ ") + ")";
    
}
function isExaltedSign(planet,sign) {

        var exaltationSigns = [0, 1, 9, 5, 3, 11, 6, 1, 7];
        return planet >= 0 && planet < exaltationSigns.length && sign == exaltationSigns[planet];
    
}
function isDebilitatedSign(planet,sign) {

        var exaltationSigns = [0, 1, 9, 5, 3, 11, 6, 1, 7];
        return planet >= 0 && planet < exaltationSigns.length
                && sign == (exaltationSigns[planet] + 6) % 12;
    
}
function debilitationCancellationReasons(planet,planets,navamsa,ascSign,moonSign,en) {

        var reasons = [];
        var navSign = zodiacSign(navamsa[planet]);
        if (isExaltedSign(planet, navSign)) reasons.add(en ? "the planet is exalted in Navamsa" : "နဝင်းဇာတာတွင် ဥစ်အားရခြင်း");
        if (zodiacSign(planets[planet]) == navSign) reasons.add(en ? "the planet is Vargottama" : "ဝဂ္ဂုတ္တမနဝင်း ရရှိခြင်း");
        var navLord = signRuler(navSign);
        if (navLord >= 0 && isExaltedSign(navLord, zodiacSign(planets[navLord]))) {
            reasons.add(en ? "its Navamsa lord is exalted in the natal chart" : "နဝင်းသခင်ဂြိုဟ် မူလဇာတာတွင် ဥစ်မူခြင်း");
        }
        if (isKendraHouse(relativeHouse(zodiacSign(planets[planet]), moonSign))) {
            reasons.add(en ? "the debilitated planet occupies a Kendra from the Moon" : "နိစ်ဂြိုဟ်သည် စန်းမှ ကိန်းအိမ်၌တည်ခြင်း");
        }
        var natalSign = zodiacSign(planets[planet]);
        var natalLord = signRuler(natalSign);
        var exaltLord = signRuler((natalSign + 6) % 12);
        if ((natalLord >= 0 && isKendraFromAscOrMoon(planets[natalLord], ascSign, moonSign))
                || (exaltLord >= 0 && isKendraFromAscOrMoon(planets[exaltLord], ascSign, moonSign))) {
            reasons.add(en ? "the sign lord or exaltation-sign lord occupies a Kendra from the Ascendant or Moon"
                    : "နိစ်ရာသီသခင် သို့မဟုတ် ဥစ်ရာသီသခင်သည် လဂ် သို့မဟုတ် စန်းမှ ကိန်းအိမ်၌တည်ခြင်း");
        }
        for (var other = 0; other < Math.min(7, planets.length); other++) {
            if (other == planet || !isExaltedSign(other, zodiacSign(planets[other]))) continue;
            var separation = Math.abs(normalize(planets[planet]) - normalize(planets[other]));
            separation = Math.min(separation, 360.0 - separation);
            if (separation <= 10.0) {
                reasons.add(en ? "it is within 10 degrees of an exalted planet"
                        : "ဥစ်ဂြိုဟ်တစ်လုံးနှင့် ၁၀ အံသာအတွင်း ပူးယှဉ်ခြင်း");
                break;
            }
        }
        return reasons;
    
}
function isKendraHouse(house) {

        return house == 1 || house == 4 || house == 7 || house == 10;
    
}
function isKendraFromAscOrMoon(longitude,ascSign,moonSign) {

        var sign = zodiacSign(longitude);
        return isKendraHouse(relativeHouse(sign, ascSign)) || isKendraHouse(relativeHouse(sign, moonSign));
    
}
function joinText(values,separator) {

        var text = new StringBuilder();
        for (let value of values) {
            if (text.length > 0) text.append(separator);
            text.append(value);
        }
        return text.toString();
    
}
function dominantCategory(counts) {

        var best = 0;
        var tied = false;
        for (var i = 1; i < counts.length; i++) {
            if (counts[i] > counts[best]) {
                best = i;
                tied = false;
            } else if (counts[i] == counts[best]) {
                tied = true;
            }
        }
        return tied ? -1 : best;
    
}
function appendGenderPolarityReading(reading,planets,ascSign,en) {

        var maleNative = input.male;
        var relevantPlanets = maleNative ? [0, 2, 4] : [1, 5, 7];
        var aligned = (ascSign % 2 == (maleNative ? 0 : 1)) ? 1 : 0;
        for (let planet of relevantPlanets) {
            if (planet < planets.length && zodiacSign(planets[planet]) % 2 == (maleNative ? 0 : 1)) aligned++;
        }
        if (aligned >= 3) {
            reading.append(en
                    ? "The Ascendant and the principal planets associated with the selected gender largely occupy signs of matching polarity. This supports clarity of self-expression, steadiness in commitments and confidence in personal roles."
                    : "လဂ်နှင့် ဇာတာရှင်၏ လိင်သဘောကို ကိုယ်စားပြုသော အဓိကဂြိုဟ်များသည် ကိုက်ညီသောရာသီများတွင် အများစုပြုတည်ရှိပါသည်။ မိမိကိုယ်ကို ဖော်ပြရာတွင် ရှင်းလင်းပြတ်သားခြင်း၊ ကတိကဝတ်တည်ငြိမ်ခြင်းနှင့် မိမိတာဝန်ကဏ္ဍအပေါ် ယုံကြည်မှုရှိခြင်းတို့ကို အားပေးပါသည်။");
        } else if (aligned <= 1) {
            reading.append(en
                    ? "Several principal planets occupy signs of opposite polarity. The native may combine conventionally masculine and feminine qualities, bringing versatility and insight into different viewpoints. Emotional consistency and clear boundaries should be consciously maintained."
                    : "အဓိကဂြိုဟ်အချို့သည် ဆန့်ကျင်ဘက်လိင်သဘောရှိသော ရာသီများတွင် တည်ရှိပါသည်။ ထို့ကြောင့် ဇာတာရှင်၌ ရဲရင့်ပြတ်သားမှုနှင့် နူးညံ့သိမ်မွေ့မှုတို့ ပေါင်းစပ်နိုင်ပြီး မတူညီသောရှုထောင့်များကို နားလည်နိုင်စွမ်းရှိပါသည်။ စိတ်သဘောထားတည်ငြိမ်မှုနှင့် ကိုယ်ပိုင်စည်းမျဉ်းများကို ရှင်းလင်းစွာထိန်းသိမ်းသင့်ပါသည်။");
        } else {
            reading.append(en
                    ? "The polarities are mixed and relatively balanced. The native can be firm when action is required and receptive when cooperation is more useful."
                    : "ရာသီလိင်သဘောအင်အားများ ရောနှောမျှတနေပါသည်။ လုပ်ဆောင်ရန်လိုအပ်ချိန်တွင် ပြတ်သားနိုင်ပြီး ပူးပေါင်းဆောင်ရွက်ရန်လိုအပ်ချိန်တွင် နူးညံ့လိုက်လျောနိုင်သော သဘောရှိပါသည်။");
        }
    
}
function appendDetectedYogas(reading,planets,cusps,en) {

        var maleNative = input.male;
        var findings =
                new TrisakkaYogaAnalyzer(en, maleNative, selectedHour).analyze(planets, cusps);
        appendReadingHeading(reading, en ? "Yogas Found in This Horoscope"
                : "ဇာတာရှင် " + getDisplayName() + " ၏ ဇာတာအရ ယုဂ်များကို အောက်ပါအတိုင်း သုံးသပ်တွေ့ရှိရပါသည်။");
        if (findings.isEmpty()) {
            reading.append(en ? "No exceptional Yoga was found."
                    : "ထူးထူးခြားခြားရရှိတဲ့ ယုဂ်များ မတွေ့ရပါ။");
            return;
        }
        for (var i = 0; i < findings.length; i++) {
            var finding = findings[i];
            if (findings.length > 1) reading.append(localizeDigits(String(i + 1))).append("။ ");
            var start = reading.length;
            reading.append(finding.title).append("\n");


            reading.append(en ? "Analysis - " : "သုံးသပ်ချက် - ").append(finding.analysis).append("\n");
            reading.append(en ? "Therefore - " : "ဒါကြောင့် - ").append(finding.prediction);
            if (i < findings.length - 1) reading.append("\n\n");
        }
    
}
function isMoolatrikona(planet,sign,degree) {

        switch (planet) {
            case 0: return sign == 4 && degree < 20.0;
            case 1: return sign == 1 && degree >= 4.0;
            case 2: return sign == 0 && degree < 12.0;
            case 3: return sign == 5 && degree >= 16.0 && degree < 20.0;
            case 4: return sign == 8 && degree < 10.0;
            case 5: return sign == 6 && degree < 15.0;
            case 6: return sign == 10 && degree < 20.0;
            default: return false;
        }
    
}
function forecastAnchorDate() {

        var anchor = Calendar.getInstance();
        anchor.set(Calendar.HOUR_OF_DAY, 12);
        anchor.set(Calendar.MINUTE, 0);
        anchor.set(Calendar.SECOND, 0);
        anchor.set(Calendar.MILLISECOND, 0);
        return anchor;
    
}
function formatDashaForecastPeriod(mahaLord,bhuktiLord,antaraLord,start,end) {

        var en = input.english;
        var title = en
                ? displayLord(DASHA_LORDS[mahaLord]) + " Maha Dasa, "
                + displayLord(DASHA_LORDS[bhuktiLord]) + " Bhukti Dasa, "
                + displayLord(DASHA_LORDS[antaraLord]) + " Antara Dasa Period"
                : displayLord(DASHA_LORDS[mahaLord]) + " ထူလဒသာ၊ "
                + displayLord(DASHA_LORDS[bhuktiLord]) + " ဘုတ္တိဒသာ၊ "
                + displayLord(DASHA_LORDS[antaraLord]) + " အန္တရဒသာကာလ";
        return "\n\n**" + title + "**\n- " + formatForecastDate(start)
                + (en ? " to " : " မှ ") + formatForecastDate(end)
                + (en ? "." : " ကာလအတွင်း။");
    
}
function findCurrentPeriod(periods,now) {

        var time = now.getTimeInMillis();
        for (let period of periods) {
            if (time >= period.start.getTimeInMillis() && time < period.end.getTimeInMillis()) {
                return period;
            }
        }
        return null;
    
}
function appendStandaloneDashaPeriod(target,title,start,end) {

        var headingStart = target.length;
        target.append(title);

        target.append("\n- ").append(formatForecastDate(start))
                .append(input.english ? " to " : " မှ ")
                .append(formatForecastDate(end))
                .append(input.english ? "." : " ကာလအတွင်း။");
    
}
function mapArrayToNavamsa(values) {

        return vargaEngine.mapToNavamsa(values);
    
}
function toNavamsaLongitude(longitude) {

        return vargaEngine.navamsaLongitude(longitude);
    
}
function TrisakkaAstrologyRules() {

    
}
function zodiacSign(longitude) {

        return Math.floor(normalize(longitude) / 30.0);
    
}
function relativeHouse(planetSign,referenceSign) {

        return ((planetSign - referenceSign + 12) % 12) + 1;
    
}
function signRuler(sign) {

        return sign >= 0 && sign < SIGN_RULERS.length ? SIGN_RULERS[sign] : -1;
    
}
function planetAspectsSign(planet,sourceSign,targetSign) {

        var targetHouse = relativeHouse(targetSign, sourceSign);
        for (let aspect of vedicAspectHouses(planet)) {
            if (targetHouse == aspect) return true;
        }
        return false;
    
}
function planetsAssociated(first,second,planets) {

        var firstSign = zodiacSign(planets[first]);
        var secondSign = zodiacSign(planets[second]);
        if (firstSign == secondSign) return true;
        if (signRuler(firstSign) == second && signRuler(secondSign) == first) return true;
        return planetAspectsSign(first, firstSign, secondSign)
                || planetAspectsSign(second, secondSign, firstSign);
    
}
function isKendraRelative(targetSign,referenceSign) {

        var house = relativeHouse(targetSign, referenceSign);
        return house == 1 || house == 4 || house == 7 || house == 10;
    
}
function isKendraOrTrine(house) {

        return house == 1 || house == 4 || house == 5 || house == 7
                || house == 9 || house == 10;
    
}
function isGoodYogaHouse(house) {

        return house == 1 || house == 2 || house == 4 || house == 5 || house == 7
                || house == 9 || house == 10 || house == 11;
    
}
function planetInHouses(planet,planets,asc,houses) {

        var house = relativeHouse(zodiacSign(planets[planet]), asc);
        for (let allowed of houses) {
            if (house == allowed) return true;
        }
        return false;
    
}
function housesOccupied(planets,indexes,asc,houses) {

        for (let house of houses) {
            var occupied = false;
            for (let planet of indexes) {
                if (relativeHouse(zodiacSign(planets[planet]), asc) == house) {
                    occupied = true;
                    break;
                }
            }
            if (!occupied) return false;
        }
        return true;
    
}
function isOwnOrExalted(planet,sign) {

        return planet >= 0 && planet < 7
                && (signRuler(sign) == planet || EXALTATION_SIGNS[planet] == sign);
    
}
function isFriendlySign(planet,sign) {

        var ruler = signRuler(sign);
        if (planet < 0 || planet >= NATURAL_FRIENDS.length) return false;
        for (let friend of NATURAL_FRIENDS[planet]) {
            if (ruler == friend) return true;
        }
        return false;
    
}
function hasKemadrumaCancellation(planets,moonSign,candidates) {

        for (let planet of candidates) {
            var house = relativeHouse(zodiacSign(planets[planet]), moonSign);
            if (house == 1 || house == 4 || house == 7 || house == 10) return true;
        }
        return false;
    
}
function vedicAspectHouses(planetIndex) {

        if (planetIndex == 2) return [4, 7, 8];
        if (planetIndex == 4) return [5, 7, 9];
        if (planetIndex == 6) return [3, 7, 10];
        return [7];
    
}
function normalize(longitude) {

        var result = longitude % 360.0;
        return result < 0 ? result + 360.0 : result;
    
}
function yogaFindings(planets,cusps) { var english=en; var birthHour=selectedHour; var PLANET_NAMES=EN_PLANET_NAMES;
function analyze(planets,cusps) {

        if (planets == null || planets.length < 8 || cusps == null || cusps.length < 2) {
            throw new Error("Complete planet and cusp arrays are required.");
        }
        var en = english;
        var result = [];
        var asc = zodiacSign(cusps[1]);
        var moon = zodiacSign(planets[1]);
        var benefics = [1, 3, 4, 5];

        addBeneficHouseYoga(result, planets, benefics, asc, moon, [6, 7, 8], 2,
                en ? "Adhi Yoga - Leadership and Recognition" : "အဓိယောဂယုဂ် (Adhi Yoga)",
                en ? "The native can rise to senior leadership, administrative or political authority. Noble conduct, public support, influence, prosperity and recognition are favoured."
                        : "ဤယုဂ်ပါရှိသူသည် လုပ်ငန်းခွင်တွင် အမြင့်ဆုံးရာထူး၊ စီအီးအို၊ ညွှန်ကြားရေးမှူး၊ နိုင်ငံရေးနှင့် အုပ်ချုပ်ရေးခေါင်းဆောင်အဆင့်များအထိ တက်လှမ်းနိုင်ပါသည်။ စိတ်ထားမြင့်မြတ်ပြီး အများအကျိုးကို ဆောင်ရွက်တတ်ကာ လူချစ်လူခင်ပေါများမည်။ မိမိနယ်ပယ်တွင် သြဇာလွှမ်းမိုးနိုင်ပြီး ငွေကြေးချမ်းသာကြွယ်ဝကာ ထင်ရှားကျော်ကြားသူတစ်ဦး ဖြစ်လာနိုင်ပါသည်။",
                en);

        addBeneficHouseYoga(result, planets, benefics, asc, moon, [3, 6, 10, 11], 2,
                en ? "Upachaya Yoga - Continuing Growth" : "ဥပစ္စည်းယုဂ် (Upachaya Yoga)",
                en ? "The native can overcome difficulties and improve steadily with age. Finances become stable, while health and longevity receive support."
                        : "ဇာတာရှင်သည် အခက်အခဲများကို ကျော်လွှားနိုင်စွမ်းရှိပြီး အသက်အရွယ်ရလာသည်နှင့်အမျှ ဘဝအခြေအနေ တဖြည်းဖြည်း ပိုမိုတိုးတက်လာနိုင်ပါသည်။ စီးပွားရေးခိုင်မာတောင့်တင်းလာမည်ဖြစ်ပြီး ကျန်းမာရေးကောင်းမွန်ကာ အသက်ရှည်စွာ နေထိုင်ရမည့်ကံ ပါရှိပါသည်။",
                en);

        var lord9 = signRuler((asc + 8) % 12);
        var lord10 = signRuler((asc + 9) % 12);
        if (lord9 != lord10 && zodiacSign(planets[lord9]) == zodiacSign(planets[lord10])) {
            var house = relativeHouse(zodiacSign(planets[lord9]), asc);
            if (isGoodYogaHouse(house)) {
                var analysis = (en ? "The 9th lord " : "၉ တန့်သခင် ") + displayPlanet(PLANET_NAMES[lord9])
                        + (en ? " and the 10th lord " : " နှင့် ၁၀ တန့်သခင် ") + displayPlanet(PLANET_NAMES[lord10])
                        + (en ? " are conjunct in favourable House " + houseLabel(house) + "."
                        : " တို့သည် ကောင်းသော " + houseLabel(house) + " ဘာဝတွင် ပူးယှဉ်နေသောကြောင့် ရာဇယုဂ် ရရှိပါသည်။");
                result.add(new Finding(en ? "Raja Yoga - Authority and Fulfilment" : "ရာဇယုဂ် (Raja Yoga)", analysis,
                        en ? "This powerful Yoga supports leading success in education, business and society, authority, valuable vehicles, property and a strong circle of associates."
                                : "ဘဝတွင် အဘက်ဘက်မှ ပြည့်စုံမည့် အထူးကောင်းမွန်သော ယုဂ်ဖြစ်ပါသည်။ ပညာရေး၊ စီးပွားရေးနှင့် လူမှုရေး နယ်ပယ်အားလုံးတွင် အောင်မြင်မှု ထိပ်တန်းသို့ ရောက်ရှိပါမည်။ လုပ်ပိုင်ခွင့်အာဏာရှိသော နေရာကို ရရှိနိုင်ပြီး တန်ဖိုးကြီးကားများ၊ အိမ်ခြံမြေ ပိုင်ဆိုင်မှုများနှင့် ပြည့်စုံမည်။ မိတ်ဆွေ၊ လုပ်ဖော်ကိုင်ဖက်၊ တပည့်လက်သား အင်အားတောင့်တင်းမည်။"));
            }
        }

        addSankhaYoga(result, planets, asc, en);
        addMoonYogas(result, planets, moon, en);
        addAdditionalYogas(result, planets, asc, moon, en);
        return result;
    
}
function addAdditionalYogas(result,planets,asc,moon,en) {

        addMahaBhagyaYoga(result, planets, asc, moon, en);

        var moonFromJupiter = relativeHouse(moon, zodiacSign(planets[4]));
        if (moonFromJupiter == 1 || moonFromJupiter == 4 || moonFromJupiter == 7 || moonFromJupiter == 10) {
            result.add(new Finding(en ? "Gaja Kesari Yoga" : "ကေသရီယုဂ် (Gaja Kesari Yoga)",
                    en ? "The Moon occupies a Kendra house from Jupiter."
                            : "ကြာသပတေးဂြိုဟ်မှ ရေတွက်လျှင် စန်းသည် " + houseLabel(moonFromJupiter) + " ကိန်းအိမ်တွင် ရပ်တည်နေသဖြင့် ကေသရီယုဂ် ရရှိပါသည်။",
                    en ? "Courage, leadership, eloquence, learning, influence, comfort and lasting recognition are favoured."
                            : "ခြင်္သေ့ကဲ့သို့ ရဲရင့်ပြတ်သားပြီး ခေါင်းဆောင်မှုအရည်အသွေး ပြည့်စုံပါမည်။ အခက်အခဲနှင့် ပြိုင်ဘက်များကို ကျော်လွှားနိုင်ပြီး လူအများရှေ့တွင် ရဲဝံ့စွာ ဟောပြောနိုင်စွမ်း၊ ပညာနှင့် သြဇာလွှမ်းမိုးမှု ရရှိကာ ထင်ရှားကျော်ကြားပါမည်။"));
        } else if (moonFromJupiter == 6 || moonFromJupiter == 8 || moonFromJupiter == 12) {
            result.add(new Finding(en ? "Sakata Yoga" : "သကဋယုဂ် (Sakata Yoga)",
                    en ? "The Moon occupies the 6th, 8th or 12th house from Jupiter."
                            : "ကြာသပတေးဂြိုဟ်မှ ရေတွက်လျှင် စန်းသည် " + houseLabel(moonFromJupiter) + " နေရာတွင် ရပ်တည်နေသဖြင့် သကဋယုဂ် ရရှိပါသည်။",
                    en ? "Fortune may fluctuate, bringing alternating opportunity and sudden difficulty. Persistence enables the native to overcome physical and emotional struggle."
                            : "ဇာတာရှင်၏ ဘဝတွင် ကံကြမ္မာအတက်အကျ များနိုင်ပါသည်။ တစ်ခါတစ်ရံ ကံကောင်းသော်လည်း အခက်အခဲများနှင့် ရုတ်တရက်ရင်ဆိုင်ရနိုင်ပြီး စိတ်ပိုင်းဆိုင်ရာနှင့် ရုပ်ပိုင်းဆိုင်ရာ ပင်ပန်းရုန်းကန်မှုများ ရှိနိုင်ပါသည်။ သို့သော် ဇွဲလုံ့လဖြင့် ကျော်လွှားနိုင်စွမ်းရှိပါသည်။"));
        }

        addSunMoonRatioYoga(result, planets, en);
        addSimpleBeneficYoga(result, planets, asc, moon, [3, 6, 11], 2,
                en ? "Sumata Yoga" : "သုမတယုဂ် (Sumata Yoga)",
                en ? "The native enjoys peaceful family life, stable business and material prosperity."
                        : "ဇာတာရှင်သည် မိသားစုနှင့်အတူ အေးချမ်းစွာနေထိုင်ရခြင်းကို နှစ်သက်ပြီး အိမ်တွင်းရေးသာယာကာ စီးပွားရေးခိုင်မာတောင့်တင်း၍ ပစ္စည်းဥစ္စာ ကြွယ်ဝချမ်းသာပါမည်။", en);
        addSimpleBeneficYoga(result, planets, asc, moon, [10], 1,
                en ? "Amala Yoga" : "အမလာယုဂ် (Amala Yoga)",
                en ? "Wisdom, a clean reputation, prosperity, good children and influential professional or government positions are favoured."
                        : "ဇာတာရှင်သည် ဉာဏ်ပညာနှင့် အသိအမြင်ကျယ်ဝန်းပြီး နာမည်ကောင်းရရှိကာ ငွေကြေးပစ္စည်းပေါများပါမည်။ သားသမီးကောင်းများရရှိပြီး အစိုးရပိုင်း သို့မဟုတ် လုပ်ငန်းခွင်တွင် သြဇာအာဏာရှိသော အဆင့်မြင့်ရာထူးများ ရရှိနိုင်ပါသည်။", en);

        addPurakalaYoga(result, planets, asc, moon, en);
        addMalaYogas(result, planets, asc, en);
        addLakshmiAndGauriYogas(result, planets, asc, moon, en);
        addSaraswatiYoga(result, planets, asc, en);
        addSpiritualYogas(result, planets, asc, en);
        addViranchiYoga(result, planets, asc, en);
        addParivartanaYogas(result, planets, asc, en);
        addLeadershipAndMahapurushaYogas(result, planets, asc, moon, en);
        addIntellectYogas(result, planets, asc, moon, en);
        addSankhyaAndMalikaYogas(result, planets, asc, en);
    
}
function addMahaBhagyaYoga(result,planets,asc,moon,en) {

        var male = maleNative;
        var dayBirth = birthHour >= 6 && birthHour < 18;
        var allOdd = isOddSign(asc) && isOddSign(moon) && isOddSign(zodiacSign(planets[0]));
        var allEven = !isOddSign(asc) && !isOddSign(moon) && !isOddSign(zodiacSign(planets[0]));
        if (!((male && dayBirth && allOdd) || (!male && !dayBirth && allEven))) return;
        result.add(new Finding(en ? "Maha Bhagya Yoga" : "မဟာဘာဂျယုဂ် (Maha Bhagya Yoga)",
                en ? "The Ascendant, Moon and Sun satisfy the required odd/even sign condition for the selected gender and day/night birth."
                        : (male ? "နေ့မွေးယောက်ျား" : "ညမွေးမိန်းမ") + " ဖြစ်ပြီး လဂ်၊ စန်းနှင့် တနင်္ဂနွေတို့သည် သက်ဆိုင်ရာ " + (allOdd ? "မရာသီများ" : "စုံရာသီများ") + " တွင် ရပ်တည်နေသဖြင့် မဟာဘာဂျယုဂ် ရရှိပါသည်။",
                en ? "Exceptional fortune, wealth, high social standing, good reputation, public service, worthy children and longevity are favoured."
                        : "ဇာတာရှင်သည် ဘဝတွင် အလွန်ကံကောင်းပြီး ငွေကြေးချမ်းသာကြွယ်ဝကာ လူနေမှုအဆင့်အတန်း မြင့်မားပါမည်။ နာမည်ကောင်းဖြင့်ကျော်ကြားပြီး အကျင့်စာရိတ္တကောင်းမွန်ကာ အများအကျိုးကို ဆောင်ရွက်ပေးတတ်ပါမည်။ သားသမီးကောင်းများထွန်းကား၍ အသက်ရှည်စွာ နေထိုင်ရပါမည်။"));
    
}
function addSunMoonRatioYoga(result,planets,en) {

        var house = relativeHouse(zodiacSign(planets[1]), zodiacSign(planets[0]));
        var title;
        var prediction;
        if (house == 1 || house == 4 || house == 7 || house == 10) {
            title = en ? "Adhama Yoga" : "အဓမယုဂ် (Adhama Yoga)";
            prediction = en ? "The native may experience about one-third of life's benefits in education, wealth and recognition."
                    : "ဇာတာရှင်သည် ပညာ၊ ဥစ္စာ၊ ကျော်ကြားမှုအစရှိသော ဘဝ၏ကောင်းကျိုးများကို သုံးပုံတစ်ပုံခန့်သာ ခံစားရနိုင်ပါသည်။";
        } else if (house == 2 || house == 5 || house == 8 || house == 11) {
            title = en ? "Sama Yoga" : "သမယုဂ် (Sama Yoga)";
            prediction = en ? "The native may experience life's prosperity at a moderate level."
                    : "ဇာတာရှင်သည် ဘဝ၏ကောင်းကျိုးချမ်းသာများကို အလယ်အလတ်အဆင့်ဖြင့် ခံစားရပါမည်။";
        } else {
            title = en ? "Varistha Yoga" : "ဝရိဌယုဂ် (Varistha Yoga)";
            prediction = en ? "The native is favoured to experience life's benefits and achievements fully."
                    : "ဇာတာရှင်သည် ဘဝ၏ကောင်းကျိုးချမ်းသာများနှင့် အောင်မြင်မှုများကို အပြည့်အဝ ခံစားရပါမည်။";
        }
        result.add(new Finding(title,
                en ? "The Moon occupies House " + houseLabel(house) + " from the Sun."
                        : "တနင်္ဂနွေမှ ရေတွက်လျှင် စန်းသည် " + houseLabel(house) + " နေရာတွင် ရပ်တည်နေသဖြင့် " + title + " ရရှိပါသည်။",
                prediction));
    
}
function addSimpleBeneficYoga(result,planets,asc,moon,houses,minimum,title,prediction,en) {

        var benefics = [1, 3, 4, 5];
        var fromAsc = planetsInRelativeHouses(planets, benefics, asc, houses);
        var fromMoon = planetsInRelativeHouses(planets, benefics, moon, houses);
        var found = fromAsc.length >= fromMoon.length ? fromAsc : fromMoon;
        var reference = found == fromAsc ? asc : moon;
        if (found.length < minimum) return;
        var referenceName = reference == asc ? (en ? "Ascendant" : "လဂ်") : (en ? "Moon" : "စန်း");
        result.add(new Finding(title,
                (en ? "Benefic planets " : "သောမဂြိုဟ်များဖြစ်သော ")
                        + describePlanetPlacements(found, planets, reference, en)
                        + (en ? " occupy the required houses from the " + referenceName + "."
                        : " တို့သည် " + referenceName + " မှ သတ်မှတ်ထားသော ဘာဝများတွင် ရပ်တည်နေသဖြင့် " + title + " ရရှိပါသည်။"),
                prediction));
    
}
function addPurakalaYoga(result,planets,asc,moon,en) {

        var ascLord = signRuler(asc);
        var moonLord = signRuler(moon);
        if (ascLord == moonLord || zodiacSign(planets[ascLord]) != zodiacSign(planets[moonLord])) return;
        var conjunctionHouse = relativeHouse(zodiacSign(planets[ascLord]), asc);
        var suitableHouse = isKendraOrTrine(conjunctionHouse)
                || isFriendlySign(ascLord, zodiacSign(planets[ascLord]));
        var beneficsOnAsc = 0;
        for (let planet of [1, 3, 4, 5]) if (zodiacSign(planets[planet]) == asc) beneficsOnAsc++;
        if (!suitableHouse || beneficsOnAsc != 1) return;
        result.add(new Finding(en ? "Purakala Yoga" : "ပုရကလယုဂ် (Purakala Yoga)",
                en ? "The Ascendant lord and Moon-sign lord are conjunct in a suitable house, while exactly one benefic joins the Ascendant."
                        : "လဂ်သခင်နှင့် စန်းသခင်တို့သည် သင့်လျော်သော ကိန်း၊ တြိဂုဏ်း သို့မဟုတ် မိတ်အိမ်တွင် ပူးယှဉ်ပြီး သောမဂြိုဟ်တစ်လုံးတည်း လဂ်နှင့်ယှဉ်နေသဖြင့် ပုရကလယုဂ် ရရှိပါသည်။",
                en ? "Graceful speech, public attention, wealth, reputation, official favour and elevated social standing are favoured."
                        : "ဇာတာရှင်သည် စကားပြောဆိုရာတွင် ချိုသာပြေပြစ်ပြီး လူအများ၏အာရုံစိုက်မှုကို ရရှိပါမည်။ ငွေကြေးကြွယ်ဝချမ်းသာ၍ နာမည်ကျော်ကြားပြီး အထက်လူကြီးများနှင့် အစိုးရပိုင်းမှ ချီးမြှောက်ခြင်းခံရကာ လူ့အသိုင်းအဝိုင်းတွင် အထက်တန်းကျစွာ ရပ်တည်နိုင်ပါမည်။"));
    
}
function addMalaYogas(result,planets,asc,en) {

        var benefics = [1, 3, 4, 5];
        if (allPlanetsInHouses(planets, benefics, asc, [5, 6, 7])
                && housesOccupied(planets, benefics, asc, [5, 6, 7])) {
            result.add(new Finding(en ? "Subha Mala Yoga" : "သုဘမာလာယုဂ် (Subha Mala Yoga)",
                    en ? "All benefic planets continuously occupy the 5th, 6th and 7th houses."
                            : "သောမဂြိုဟ်အားလုံးသည် ၅၊ ၆၊ ၇ တန့်တို့တွင် စဉ်ဆက်ရပ်တည်နေသဖြင့် သုဘမာလာယုဂ် ရရှိပါသည်။",
                    en ? "Courage, prosperity, worthy children, generosity, public service and reliable support from relatives and friends are favoured."
                            : "ဇာတာရှင်သည် ရဲစွမ်းသတ္တိရှိ၍ ပစ္စည်းဥစ္စာပြည့်စုံပြီး သားသမီးကောင်းများ ရရှိပါမည်။ ရက်ရော၍ သူတစ်ပါးအကျိုးကို ဆောင်ရွက်တတ်ကာ ဆွေမျိုးမိတ်ဆွေများ၏ ကူညီထောက်ပံ့မှုကို အမြဲရရှိပါမည်။"));
        }
        if (allPlanetsInHouses(planets, benefics, asc, [6, 8, 12])) {
            result.add(new Finding(en ? "Asubha Mala Yoga" : "အသုဘမာလာယုဂ် (Asubha Mala Yoga)",
                    en ? "All benefic planets occupy the 6th, 8th or 12th houses."
                            : "သောမဂြိုဟ်အားလုံးသည် ၆၊ ၈၊ ၁၂ တန့်တို့တွင် ရပ်တည်နေသဖြင့် အသုဘမာလာယုဂ် ရရှိပါသည်။",
                    en ? "Life may involve greater struggle, irritability, conflict with the environment and criticism resulting from one's own actions."
                            : "ဇာတာရှင်၏ ဘဝတွင် ပင်ပန်းရုန်းကန်မှုများ ရှိနိုင်ပါသည်။ စိတ်တိုလွယ်၍ ပြဿနာများဖန်တီးမိနိုင်ပြီး ပတ်ဝန်းကျင်နှင့် အဆင်မပြေဖြစ်ကာ မိမိ၏လုပ်ရပ်များကြောင့် အများ၏ ပြစ်တင်ဝေဖန်ခြင်းကို ခံရနိုင်ပါသည်။"));
        }
    
}
function addLakshmiAndGauriYogas(result,planets,asc,moon,en) {

        var ninthLord = signRuler((asc + 8) % 12);
        if (strongInKendraTrine(ninthLord, planets, asc, false)
                && strongInKendraTrine(5, planets, asc, false)) {
            result.add(new Finding(en ? "Lakshmi Yoga" : "လက္ခမိယုဂ် (Lakshmi Yoga)",
                    en ? "The 9th lord and Venus occupy Kendra or Trine houses in own or exaltation signs."
                            : "၉ တန့်သခင်နှင့် သောကြာဂြိုဟ်တို့သည် ကိန်း၊ တြိဂုဏ်းဖြစ်သော ကသစ် သို့မဟုတ် ဥစ်အိမ်များတွင် ရပ်တည်နေသဖြင့် လက္ခမိယုဂ် ရရှိပါသည်။",
                    en ? "Excellent health, authority, magnificent living, luxury possessions, good vehicles, family leadership and public respect are favoured."
                            : "ဇာတာရှင်သည် ကျန်းမာရေးအထူးကောင်းမွန်၍ ဘုန်းတန်ခိုးကြီးမားပါမည်။ ကြီးကျယ်ခမ်းနားသော လူနေမှုဘဝ၊ ဇိမ်ခံပစ္စည်းများနှင့် ယာဉ်ကားကောင်းများကို ပိုင်ဆိုင်ကာ ဆွေမျိုးအသိုင်းအဝိုင်းကို ဦးဆောင်စောင့်ရှောက်နိုင်ပြီး လူအများလေးစားချစ်ခင်သော ခေါင်းဆောင်ဖြစ်ပါမည်။"));
        }
        var moonHouse = relativeHouse(moon, asc);
        if (isKendraOrTrine(moonHouse) && isOwnOrExalted(1, moon)
                && jupiterAspects(zodiacSign(planets[4]), moon)) {
            result.add(new Finding(en ? "Gauri Yoga" : "ဂေါရီယုဂ် (Gauri Yoga)",
                    en ? "The Moon is strong in a Kendra or Trine and receives Jupiter's aspect."
                            : "စန်းသည် ကသစ် သို့မဟုတ် ဥစ်အိမ်မိသော ကိန်း၊ တြိဂုဏ်းဘာဝတွင် ရပ်တည်ပြီး ကြာသပတေးဂြိုဟ်၏အမြင်ကို ရရှိသဖြင့် ဂေါရီယုဂ် ရရှိပါသည်။",
                    en ? "Noble family background, beauty, cheerful disposition, worthy children, victory over rivals and public honour are favoured."
                            : "ဇာတာရှင်သည် အထက်တန်းကျသော မိသားစုမှ ဆင်းသက်လာပြီး ရုပ်ရည်သွင်ပြင် ချောမောလှပပါမည်။ အမြဲရွှင်လန်း၍ သားသမီးကောင်းများရရှိကာ ပြိုင်ဘက်များကို အောင်နိုင်ပြီး အများ၏ချီးကျူးဂုဏ်ပြုမှုကို ရရှိပါမည်။"));
        }
    
}
function addSaraswatiYoga(result,planets,asc,en) {

        var allowed = [1, 2, 4, 5, 7, 9, 10];
        if (!planetInHouses(3, planets, asc, allowed) || !planetInHouses(4, planets, asc, allowed)
                || !planetInHouses(5, planets, asc, allowed)
                || !isOwnExaltedOrFriendly(4, zodiacSign(planets[4]))) return;
        result.add(new Finding(en ? "Saraswati Yoga" : "သူရဿတီယုဂ် (Saraswati Yoga)",
                en ? "Mercury, Jupiter and Venus occupy Kendra, Trine or 2nd houses, while Jupiter is in an own, exalted or friendly sign."
                        : "ဗုဒ္ဓဟူး၊ ကြာသပတေးနှင့် သောကြာဂြိုဟ်တို့သည် ကိန်း၊ တြိဂုဏ်း သို့မဟုတ် ၂ တန့်အိမ်များတွင် ရပ်တည်ပြီး ကြာသပတေးသည် ကသစ်၊ ဥစ် သို့မဟုတ် မိတ်အိမ်တွင် ရပ်တည်နေသဖြင့် သူရဿတီယုဂ် ရရှိပါသည်။",
                en ? "Exceptional intelligence and distinction in literature, art, mathematics, science and technology are favoured, together with marital fortune and recognition from influential people."
                        : "ဇာတာရှင်သည် ဉာဏ်ရည်ဉာဏ်သွေး အလွန်ထက်မြက်ပြီး စာပေ၊ အနုပညာ၊ သင်္ချာ၊ သိပ္ပံနှင့် နည်းပညာနယ်ပယ်များတွင် ထူးချွန်၍ နာမည်ကျော်ကြားပါမည်။ အိမ်ထောင်ရေးကံကောင်းပြီး သြဇာအာဏာရှိသူများ၏ လေးစားအသိအမှတ်ပြုခြင်းကို ခံရပါမည်။"));
    
}
function addSpiritualYogas(result,planets,asc,en) {

        var ascLord = signRuler(asc);
        if (strongInKendraTrine(ascLord, planets, asc, true)
                && strongInKendraTrine(1, planets, asc, true)
                && strongInKendraTrine(0, planets, asc, true)) {
            result.add(new Finding(en ? "Sri Kantha Yoga" : "သီရိကဏ္ဍယုဂ် (Sri Kantha Yoga)",
                    en ? "The Ascendant lord, Moon and Sun are strong in own, exalted or friendly Kendra or Trine positions."
                            : "လဂ်သခင်၊ စန်းနှင့် တနင်္ဂနွေတို့သည် ကသစ်၊ ဥစ် သို့မဟုတ် မိတ်အိမ်ကျသော ကိန်း၊ တြိဂုဏ်းဘာဝများတွင် ရပ်တည်နေသဖြင့် သီရိကဏ္ဍယုဂ် ရရှိပါသည်။",
                    en ? "Deep religious and spiritual inclination, purity of mind, meditation, freedom from jealousy and sustained service to others are favoured."
                            : "ဇာတာရှင်သည် ဘာသာရေးနှင့် ဝိညာဉ်ရေးရာတွင် ကိုင်းရှိုင်းပြီး စိတ်ထားဖြူစင်ကာ တရားဘာဝနာကျင့်ကြံအားထုတ်ခြင်းကို နှစ်သက်ပါမည်။ သူတစ်ပါးအပေါ် မနာလိုဝန်တိုခြင်းမရှိဘဲ အများအကျိုးကို အမြဲကူညီဆောင်ရွက်သော သူတော်ကောင်းဖြစ်ပါမည်။"));
        }

        var ninthLord = signRuler((asc + 8) % 12);
        if (strongInKendraTrine(ninthLord, planets, asc, true)
                && strongInKendraTrine(3, planets, asc, true)
                && strongInKendraTrine(5, planets, asc, true)) {
            result.add(new Finding(en ? "Sri Natha Yoga" : "သီရိနာထယုဂ် (Sri Natha Yoga)",
                    en ? "The 9th lord, Mercury and Venus are strong in Kendra or Trine positions."
                            : "၉ တန့်သခင်၊ ဗုဒ္ဓဟူးနှင့် သောကြာတို့သည် ဥစ်၊ တြိဂုဏ်း၊ ကသစ် သို့မဟုတ် မိတ်အိမ်ကျသော ကိန်း၊ တြိဂုဏ်းဘာဝများတွင် ရပ်တည်နေသဖြင့် သီရိနာထယုဂ် ရရှိပါသည်။",
                    en ? "Religious devotion, respect for elders and teachers, refined speech, meritorious action, worthy children, wealth and public affection are favoured."
                            : "ဇာတာရှင်သည် ဘာသာတရားကို ရိုသေကိုင်းရှိုင်း၍ လူကြီးမိဘနှင့် ဆရာသမားများကို လေးစားပါမည်။ အပြောအဆိုယဉ်ကျေးသိမ်မွေ့ပြီး ကုသိုလ်ကောင်းမှုများပြုလုပ်ကာ သားသမီးကောင်းများနှင့် ပြည့်စုံ၍ ငွေကြေးချမ်းသာပြီး လူအများ၏ချစ်ခင်မြတ်နိုးမှုကို ရရှိပါမည်။ ခန္ဓာကိုယ်တွင် ထူးခြားသော မွေးရာပါအမှတ်အသားများ ပါရှိနိုင်ပါသည်။"));
        }
    
}
function addViranchiYoga(result,planets,asc,en) {

        var fifthLord = signRuler((asc + 4) % 12);
        if (!strongInKendra(fifthLord, planets, asc)
                || !strongInKendra(4, planets, asc)
                || !strongInKendra(6, planets, asc)) return;

        result.add(new Finding(en ? "Viranchi Yoga - Profound Knowledge"
                        : "ဝိရဉ္စိယုဂ် (Viranchi Yoga)",
                en ? "The 5th lord, Jupiter and Saturn occupy Kendra houses while holding own-sign, exaltation, Moolatrikona or friendly-sign strength."
                        : "၅ တန့်သခင် " + displayPlanet(PLANET_NAMES[fifthLord])
                        + "၊ ကြာသပတေးနှင့် စနေဂြိုဟ်တို့သည် ကိန်းအိမ်များတွင် ကသစ်၊ ဥစ်၊ မူလတြိဂုဏ်း သို့မဟုတ် မိတ်ရာသီအင်အားဖြင့် ရပ်တည်နေသဖြင့် ဝိရဉ္စိယုဂ် ရရှိပါသည်။",
                en ? "The native is favoured to master profound subjects such as astrology, psychology and philosophy. Spiritual devotion, refined speech, many students and friends, dignity, domestic happiness, health and longevity are supported."
                        : "ဇာတာရှင်သည် လျှို့ဝှက်နက်နဲသော ဗေဒင်ပညာ၊ စိတ်ပညာနှင့် အတွေးအခေါ်ပညာရပ်များကို အထူးစိတ်ဝင်စား၍ တတ်မြောက်ကျွမ်းကျင်နိုင်ပါသည်။ ဘာသာရေးနှင့် ဝိညာဉ်ရေးရာတို့ကို ယုံကြည်ကိုင်းရှိုင်းပြီး အပြောအဆိုယဉ်ကျေးသိမ်မွေ့ကာ ဆရာတစ်ဆူအဖြစ် တပည့်တပန်းနှင့် မိတ်ဆွေအပေါင်းအသင်း ပေါများပါမည်။ ဂုဏ်သိက္ခာကြီးမား၍ မိသားစုဘဝသာယာချမ်းမြေ့ကာ အသက်ရှည်ကျန်းမာသော ပညာရှင်တစ်ဦး ဖြစ်ပါမည်။"));
    
}
function addParivartanaYogas(result,planets,asc,en) {

        for (var firstHouse = 1; firstHouse <= 12; firstHouse++) {
            for (var secondHouse = firstHouse + 1; secondHouse <= 12; secondHouse++) {
                var firstLord = signRuler((asc + firstHouse - 1) % 12);
                var secondLord = signRuler((asc + secondHouse - 1) % 12);
                if (firstLord == secondLord) continue;

                var firstHouseSign = (asc + firstHouse - 1) % 12;
                var secondHouseSign = (asc + secondHouse - 1) % 12;
                if (zodiacSign(planets[firstLord]) != secondHouseSign
                        || zodiacSign(planets[secondLord]) != firstHouseSign) continue;

                var pair = houseLabel(firstHouse) + " ↔ " + houseLabel(secondHouse);
                var exchange = displayPlanet(PLANET_NAMES[firstLord]) + " ↔ "
                        + displayPlanet(PLANET_NAMES[secondLord]);
                if (isDusthana(firstHouse) || isDusthana(secondHouse)) {
                    result.add(new Finding(en ? "Dainya Parivartana Yoga"
                            : "ဒေဒျယုဂ် (Dainya Parivartana Yoga)",
                            en ? "The lords of Houses " + pair + " exchange their houses: " + exchange + "."
                                    : pair + " ဘာဝသခင်များဖြစ်သော " + exchange
                                      + " တို့သည် အိမ်ဖလှယ်ရပ်တည်ပြီး ၆၊ ၈၊ ၁၂ တန့်ဒုဌာနဘာဝတစ်ခု ပါဝင်နေသဖြင့် ဒေဒျပရိတ္တာနယုဂ် ရရှိပါသည်။",
                            en ? "Emotional fluctuation, blunt speech, friction with associates, obstruction, rivalry and repeated struggle may arise."
                                    : "ဇာတာရှင်သည် စိတ်လှုပ်ရှားလွယ်၍ စိတ်အပြောင်းအလဲ မြန်ဆန်နိုင်ပါသည်။ စကားပြောဆိုရာတွင် ကြမ်းတမ်းမှု ရှိနိုင်ပြီး ပတ်ဝန်းကျင်၊ လုပ်ဖော်ကိုင်ဖက်များနှင့် အဆင်မပြေမှုများ ဖြစ်ပေါ်နိုင်ပါသည်။ လုပ်ငန်းကိစ္စများတွင် အနှောင့်အယှက်နှင့် ပြိုင်ဘက်များကို မကြာခဏ ရင်ဆိုင်ရ၍ အောင်မြင်ရန် ပိုမိုကြိုးပမ်းရနိုင်ပါသည်။"));
                } else if (firstHouse == 3 || secondHouse == 3) {
                    result.add(new Finding(en ? "Khala Parivartana Yoga"
                            : "ခလယုဂ် (Khala Parivartana Yoga)",
                            en ? "The 3rd lord exchanges houses with another non-Dusthana lord: Houses " + pair + ", " + exchange + "."
                                    : "၃ တန့်ဘာဝသခင်နှင့် ၆၊ ၈၊ ၁၂ တန့်ဘာဝမဟုတ်သော " + houseLabel(firstHouse == 3 ? secondHouse : firstHouse)
                                      + " ဘာဝသခင်တို့သည် " + exchange + " အဖြစ် အိမ်ဖလှယ်ရပ်တည်နေသဖြင့် ခလပရိတ္တာနယုဂ် ရရှိပါသည်။",
                            en ? "Life may alternate between favourable and difficult periods, with changes in speech, emotion and financial flow."
                                    : "ဇာတာရှင်၏ ဘဝတွင် အတက်အကျနှင့် အကောင်းအဆိုး ဒွန်တွဲနေတတ်ပါသည်။ အပြောအဆိုနှင့် စိတ်ခံစားချက်တို့တွင် ပြောင်းလဲမှု ရှိနိုင်သကဲ့သို့ စီးပွားရေးတွင်လည်း ငွေဝင်ငွေထွက် မတည်ငြိမ်သော ကာလများကို ကြုံတွေ့ရနိုင်ပါသည်။"));
                } else {
                    result.add(new Finding(en ? "Maha Parivartana Yoga"
                            : "မဟာယုဂ် (Maha Parivartana Yoga)",
                            en ? "Two favourable house lords exchange their houses: Houses " + pair + ", " + exchange + "."
                                    : "၃၊ ၆၊ ၈၊ ၁၂ တန့်ဘာဝမဟုတ်သော " + pair + " ဘာဝသခင်များဖြစ်သည့် " + exchange
                                      + " တို့သည် အပြန်အလှန် အိမ်ဖလှယ်ရပ်တည်နေသဖြင့် မဟာပရိတ္တာနယုဂ် ရရှိပါသည်။",
                            en ? "Great success, valuable vehicles and property, wealth, high administrative or organisational rank, official honours and a fulfilled family life are favoured."
                                    : "ဇာတာရှင်သည် အလွန်ကံကောင်း၍ ဘဝတွင် ကြီးမားသော အောင်မြင်မှုများ ရရှိနိုင်ပါသည်။ တန်ဖိုးကြီးယာဉ်ကား၊ အိမ်ခြံမြေနှင့် စည်းစိမ်ဥစ္စာများကို ပိုင်ဆိုင်ပြီး အစိုးရ၊ အုပ်ချုပ်ရေး သို့မဟုတ် အဖွဲ့အစည်းများတွင် အမြင့်ဆုံးရာထူးများ ရရှိနိုင်ပါသည်။ နိုင်ငံ့ခေါင်းဆောင်များနှင့် အထက်လူကြီးများထံမှ ဘွဲ့ထူးဂုဏ်ထူး၊ ဆုတံဆိပ်များ ချီးမြှင့်ခြင်းခံရနိုင်ပြီး မိသားစုဘဝ ပြည့်စုံသာယာပါလိမ့်မည်။"));
                }
            }
        }
    
}
function strongInKendra(planet,planets,asc) {

        var sign = zodiacSign(planets[planet]);
        var house = relativeHouse(sign, asc);
        var degree = normalize(planets[planet]) % 30.0;
        return (house == 1 || house == 4 || house == 7 || house == 10)
                && (isOwnOrExalted(planet, sign) || isFriendlySign(planet, sign)
                || isMoolatrikona(planet, sign, degree));
    
}
function isDusthana(house) {

        return house == 6 || house == 8 || house == 12;
    
}
function addLeadershipAndMahapurushaYogas(result,planets,asc,moon,en) {

        var lord4 = signRuler((asc + 3) % 12);
        var lord9 = signRuler((asc + 8) % 12);
        var ascLord = signRuler(asc);
        if (isMutualKendra(zodiacSign(planets[lord4]), zodiacSign(planets[lord9]))
                && isOwnExaltedOrFriendly(ascLord, zodiacSign(planets[ascLord]))) {
            result.add(new Finding(en ? "Kahala Yoga" : "ကာဟလယုဂ် (Kahala Yoga)",
                    en ? "The 4th and 9th lords occupy mutual Kendras while the Ascendant lord is strong."
                            : "၄ တန့်ဘာဝသခင်နှင့် ၉ တန့်ဘာဝသခင်တို့သည် အပြန်အလှန် ကိန်းအနေအထားတွင် ရပ်တည်ပြီး လဂ်သခင်သည် ကသစ်၊ ဥစ် သို့မဟုတ် မိတ်ရာသီအင်အားရှိသဖြင့် ကာဟလယုဂ် ရရှိပါသည်။",
                    en ? "Steady progress, compassion, public-minded leadership and lasting respect from colleagues and society are favoured."
                            : "ဇာတာရှင်သည် ဘဝတွင် စဉ်ဆက်မပြတ် တိုးတက်ကြီးပွားနိုင်ပါသည်။ သနားကြင်နာတတ်သော စိတ်ထားနှင့် အများအကျိုးကို လိုလားသော သဘောထားကြောင့် ပတ်ဝန်းကျင်၊ လုပ်ဖော်ကိုင်ဖက်နှင့် အများပြည်သူတို့၏ ရိုသေလေးစားမှုကို ရရှိသည့် လူချစ်လူခင်ပေါများသော ခေါင်းဆောင်တစ်ဦး ဖြစ်လာနိုင်ပါသည်။"));
        }

        var benefics = [1, 3, 4, 5];
        var malefics = [0, 2, 6, 7, 8];
        var beneficKendras = planetsInRelativeHouses(planets, benefics, asc, [1, 4, 7, 10]).length;
        var maleficKendras = planetsInRelativeHouses(planets, malefics, asc, [1, 4, 7, 10]).length;
        if (beneficKendras >= 2 && maleficKendras == 0) {
            result.add(new Finding(en ? "Parvata Yoga" : "ပဗ္ဗတယုဂ် (Parvata Yoga)",
                    en ? "Benefic planets occupy Kendra houses while malefics are absent from those Kendras."
                            : "သောမဂြိုဟ်များသည် ကိန်းဘာဝများတွင် ရပ်တည်ပြီး အဆိုပါ ကိန်းဘာဝများ၌ ပါပဂြိုဟ်မရှိသဖြင့် ပဗ္ဗတယုဂ် ရရှိပါသည်။",
                    en ? "Senior administrative responsibility, strong and stable finances and a peaceful, secure life are favoured."
                            : "ဇာတာရှင်သည် လုပ်ငန်းခွင် သို့မဟုတ် အဖွဲ့အစည်းများတွင် ထိပ်တန်းအုပ်ချုပ်သူ၊ မန်နေဂျာ၊ ဒါရိုက်တာအစရှိသော နေရာများကို ရရှိနိုင်ပါသည်။ ငွေကြေးစီးပွားရေး ခိုင်မာတောင့်တင်းပြီး တည်ငြိမ်အေးချမ်းသော ဘဝကို ပိုင်ဆိုင်နိုင်ပါသည်။"));
        }

        addMahaRajaYoga(result, planets, asc, en);
        addMahapurushaYoga(result, planets, asc, 2, "Ruchaka", "ရုစကယုဂ်",
                en ? "Courage, strength and distinction in sport, military, police, engineering or surgery are favoured, together with victory, health and prosperity."
                        : "ဇာတာရှင်သည် ရဲရင့်ပြတ်သား၍ ခွန်အားကြီးမားပါမည်။ အားကစား၊ စစ်တပ်၊ ရဲ၊ အင်ဂျင်နီယာနှင့် ခွဲစိတ်ဆရာဝန် နယ်ပယ်များတွင် ထူးချွန်အောင်မြင်ပြီး ပြိုင်ဘက်များကို ကျော်လွှားနိုင်ကာ ကျန်းမာသက်ရှည်၍ စည်းစိမ်ချမ်းသာ ပြည့်စုံနိုင်ပါသည်။", en);
        addMahapurushaYoga(result, planets, asc, 3, "Bhadra", "ဘဒြယုဂ်",
                en ? "Sharp intelligence and success in business, accounting, IT and communications are favoured, with education, wealth and longevity."
                        : "ဇာတာရှင်သည် ဉာဏ်ရည်ထက်မြက်၍ စီးပွားရေး၊ စာရင်းအင်း၊ အိုင်တီနှင့် ဆက်သွယ်ရေး နယ်ပယ်များတွင် အောင်မြင်နိုင်ပါသည်။ စိတ်သဘောထား မြင့်မြတ်၍ ကိုယ်ဟန်အချိုးအစား ပြေပြစ်ကာ ပညာရေး၊ ငွေကြေးနှင့် အသက်ရှည်ခြင်းတို့ ပြည့်စုံနိုင်ပါသည်။", en);
        addMahapurushaYoga(result, planets, asc, 4, "Hamsa", "ဟံသယုဂ်",
                en ? "Success in religion, law, education and advisory work is favoured, together with grace, purity, fulfilment and longevity."
                        : "ဇာတာရှင်သည် ဘာသာရေး၊ တရားဥပဒေ၊ ပညာရေးနှင့် အကြံပေး နယ်ပယ်များတွင် အောင်မြင်ကျော်ကြားနိုင်ပါသည်။ ရုပ်ဆင်းသွင်ပြင် ကျက်သရေရှိ၍ စိတ်ထားဖြူစင်ကာ လိုအင်ဆန္ဒများ ပြည့်ဝပြီး အေးချမ်းစွာ အသက်ရှည်နိုင်ပါသည်။", en);
        addMahapurushaYoga(result, planets, asc, 5, "Malavya", "မာလဗျယုဂ်",
                en ? "Success in art, entertainment, beauty and luxury industries is favoured, with attraction, vehicles, property and generosity."
                        : "ဇာတာရှင်သည် အနုပညာ၊ ဖျော်ဖြေရေး၊ အလှအပနှင့် ဇိမ်ခံပစ္စည်း လုပ်ငန်းများတွင် အောင်မြင်နိုင်ပါသည်။ ဆွဲဆောင်မှုရှိသော ရုပ်ရည်နှင့် ယာဉ်ကား၊ အိမ်ခြံမြေတို့ ပြည့်စုံနိုင်ပြီး ရက်ရောစွာ ပေးကမ်းတတ်ပါမည်။ လူမှုရေး အရှုပ်အရှင်းကို သတိပြုသင့်ပါသည်။", en);
        addMahapurushaYoga(result, planets, asc, 6, "Sasa", "သသယုဂ်",
                en ? "Persistence and influence in politics, administration, land and industry are favoured, with shrewd enterprise, courage and longevity."
                        : "ဇာတာရှင်သည် ဇွဲလုံ့လကြီးမား၍ နိုင်ငံရေး၊ အုပ်ချုပ်ရေး၊ မြေယာနှင့် စက်မှုလုပ်ငန်းများတွင် သြဇာလွှမ်းမိုးနိုင်ပါသည်။ လိမ္မာပါးနပ်စွာ စီးပွားရှာနိုင်၍ ရဲစွမ်းသတ္တိနှင့် ပြည့်စုံကာ ကျန်းမာသက်ရှည်နိုင်ပါသည်။", en);
    
}
function addMahaRajaYoga(result,planets,asc,en) {

        var houses = [6, 8, 12];
        for (var i = 0; i < houses.length; i++) {
            for (var j = i + 1; j < houses.length; j++) {
                var first = signRuler((asc + houses[i] - 1) % 12);
                var second = signRuler((asc + houses[j] - 1) % 12);
                if (first == second || !planetsAssociated(first, second, planets)) continue;
                result.add(new Finding(en ? "Maha Raja Yoga" : "မဟာရာဇယုဂ် (Maha Raja Yoga)",
                        en ? "Two Dusthana lords are connected by conjunction, mutual aspect or sign exchange."
                                : houses[i] + " တန့်ဘာဝနှင့် " + houses[j] + " တန့်ဘာဝ ဒုဌာနဘာဝသခင်များဖြစ်သော "
                                  + displayPlanet(PLANET_NAMES[first]) + " နှင့် " + displayPlanet(PLANET_NAMES[second])
                                  + " တို့ အချင်းချင်း ဆက်သွယ်နေသဖြင့် မဟာရာဇယုဂ် ရရှိပါသည်။",
                        en ? "The native can transform adversity into opportunity and may rise as an exceptional political or business leader with fame and prosperity."
                                : "ဇာတာရှင်သည် အခက်အခဲများကို အခွင့်အရေးအဖြစ် ပြောင်းလဲနိုင်ပြီး နိုင်ငံရေး၊ စီးပွားရေး နယ်ပယ်များတွင် ပြိုင်ဘက်ကင်းသော ခေါင်းဆောင်အဖြစ် ထင်ရှားကျော်ကြားကာ ကြီးပွားချမ်းသာနိုင်ပါသည်။"));
                return;
            }
        }
    
}
function addMahapurushaYoga(result,planets,asc,planet,englishName,myanmarName,prediction,en) {

        var sign = zodiacSign(planets[planet]);
        var house = relativeHouse(sign, asc);
        if (!(house == 1 || house == 4 || house == 7 || house == 10) || !isOwnOrExalted(planet, sign)) return;
        result.add(new Finding(en ? englishName + " Yoga" : myanmarName + " (" + englishName + " Yoga)",
                (en ? displayPlanet(PLANET_NAMES[planet]) + " occupies a Kendra in its own or exaltation sign."
                        : displayPlanet(PLANET_NAMES[planet]) + " သည် " + house + " တန့်ဘာဝ ကိန်းအိမ်တွင် ကသစ် သို့မဟုတ် ဥစ်ရာသီအင်အားဖြင့် ရပ်တည်နေသဖြင့် " + myanmarName + " ရရှိပါသည်။"),
                prediction));
    
}
function addIntellectYogas(result,planets,asc,moon,en) {

        if (relativeHouse(zodiacSign(planets[3]), zodiacSign(planets[0])) == 2
                && relativeHouse(moon, zodiacSign(planets[3])) == 11) {
            var jupiterFromMoon = relativeHouse(zodiacSign(planets[4]), moon);
            if (jupiterFromMoon == 5 || jupiterFromMoon == 9) {
                result.add(new Finding(en ? "Bhaskara Yoga" : "ဘာသက္ကရာယုဂ် (Bhaskara Yoga)",
                        en ? "Mercury is 2nd from the Sun, the Moon is 11th from Mercury and Jupiter is in a Trine from the Moon."
                                : "ဗုဒ္ဓဟူးသည် တနင်္ဂနွေမှ ၂ တန့်ဘာဝ၊ စန်းသည် ဗုဒ္ဓဟူးမှ ၁၁ တန့်ဘာဝနှင့် ကြာသပတေးသည် စန်းမှ တြိဂုဏ်းအနေအထားတွင် ရပ်တည်နေသဖြင့် ဘာသက္ကရာယုဂ် ရရှိပါသည်။",
                        en ? "Expertise in technology, mathematics, accounting and management is favoured, together with legal understanding, an influential voice, attractive appearance and leadership."
                                : "ဇာတာရှင်သည် နည်းပညာ၊ သင်္ချာ၊ စာရင်းအင်းနှင့် စီမံခန့်ခွဲမှု ပညာရပ်များတွင် ကျွမ်းကျင်နိုင်ပါသည်။ ဥပဒေနှင့် စည်းကမ်းများကို နားလည်၍ အသံသြဇာ ကောင်းမွန်ကာ ရုပ်ရည်ချောမောသော ခေါင်းဆောင်တစ်ဦး ဖြစ်လာနိုင်ပါသည်။"));
            }
        }

        var lord5 = signRuler((asc + 4) % 12);
        var lord11 = signRuler((asc + 10) % 12);
        var fiveElevenExchange = lord5 != lord11
                && zodiacSign(planets[lord5]) == (asc + 10) % 12
                && zodiacSign(planets[lord11]) == (asc + 4) % 12;
        if (fiveElevenExchange && relativeHouse(moon, asc) == 5) {
            result.add(new Finding(en ? "Indra Yoga" : "ဣန္ဒြယုဂ် (Indra Yoga)",
                    en ? "The 5th and 11th lords exchange houses while the Moon occupies the 5th house."
                            : "၅ တန့်ဘာဝနှင့် ၁၁ တန့်ဘာဝသခင်တို့ အိမ်ဖလှယ်ရပ်တည်ပြီး စန်းသည် ၅ တန့်ဘာဝတွင် ရပ်တည်နေသဖြင့် ဣန္ဒြယုဂ် ရရှိပါသည်။",
                    en ? "Persuasive speech, public relations, political and teaching success, high status, wealth and lasting recognition are favoured."
                            : "ဇာတာရှင်သည် ဆွဲဆောင်မှုရှိသော အပြောအဆိုဖြင့် အများပြည်သူ ဆက်ဆံရေး၊ နိုင်ငံရေးနှင့် ဟောပြောပို့ချမှုများတွင် အောင်မြင်နိုင်ပါသည်။ လူ့အသိုင်းအဝိုင်းတွင် မြင့်မားသော ရာထူးဂုဏ်သိက္ခာ ရရှိပြီး ငွေကြေးချမ်းသာကာ ထင်ရှားကျော်စောနိုင်ပါသည်။"));
        }

        var jupiterInAsc = zodiacSign(planets[4]) == asc;
        var moonKendraFromJupiter = isKendraRelative(moon, zodiacSign(planets[4]));
        var rahuSecondFromMoon = relativeHouse(zodiacSign(planets[7]), moon) == 2;
        var sunMarsThirdFromRahu = relativeHouse(zodiacSign(planets[0]), zodiacSign(planets[7])) == 3
                && relativeHouse(zodiacSign(planets[2]), zodiacSign(planets[7])) == 3;
        if (jupiterInAsc && moonKendraFromJupiter && rahuSecondFromMoon && sunMarsThirdFromRahu) {
            result.add(new Finding(en ? "Buddha Yoga" : "ဗုဒ္ဓယုဂ် (Buddha Yoga)",
                    en ? "Jupiter occupies the Ascendant, the Moon is in a Kendra from Jupiter, Rahu is 2nd from the Moon, and the Sun and Mars are 3rd from Rahu."
                            : "ကြာသပတေးသည် လဂ်ဘာဝတွင် ရပ်တည်ပြီး စန်းသည် ကြာသပတေးမှ ကိန်းဘာဝ၊ ရာဟုသည် စန်းမှ ၂ တန့်ဘာဝ၊ တနင်္ဂနွေနှင့် အင်္ဂါတို့သည် ရာဟုမှ ၃ တန့်ဘာဝတွင် ရပ်တည်နေသဖြင့် ဗုဒ္ဓယုဂ် ရရှိပါသည်။",
                    en ? "Exceptional skill in trade and business, command of classical and modern learning, victory over rivals and distinguished prosperity are favoured."
                            : "ဇာတာရှင်သည် ကူးသန်းရောင်းဝယ်ရေးနှင့် စီးပွားရေး နယ်ပယ်တွင် ကျွမ်းကျင်ပါးနပ်နိုင်ပါသည်။ စာပေကျမ်းဂန်နှင့် ခေတ်ပေါ် ပညာရပ်များကို ကောင်းစွာနားလည်၍ ရန်သူပြိုင်ဘက်များကို ကျော်လွှားကာ ခမ်းနားသော ဘုန်းကံဖြင့် အောင်မြင်ကျော်ကြားနိုင်ပါသည်။"));
        }
    
}
function addSankhyaAndMalikaYogas(result,planets,asc,en) {

        var occupiedSigns = Array(12).fill(false);
        var distinctSigns = 0;
        for (var planet = 0; planet < 7; planet++) {
            var sign = zodiacSign(planets[planet]);
            if (!occupiedSigns[sign]) {
                occupiedSigns[sign] = true;
                distinctSigns++;
            }
        }
        var enNames = ["Gola", "Yuga", "Sula", "Kedara", "Pasa", "Dama", "Vina"];
        var mmNames = ["ဂေါလယုဂ်", "ယုဂယုဂ်", "သူလယုဂ်", "ကေဒါရယုဂ်", "ပါသယုဂ်", "ဒါမယုဂ်", "ဝလ္လကီ/ဝီဏာယုဂ်"];
        var mmEffects = [
                "ဇာတာရှင်သည် ပျင်းရိမှုနှင့် ငွေကြေးအခက်အခဲများကို ရင်ဆိုင်ရနိုင်သဖြင့် ကျန်းမာရေးကို အထူးဂရုစိုက်သင့်ပါသည်။",
                "ဇာတာရှင်တွင် ထူးခြားသောအယူဝါဒများ ရှိနိုင်ပြီး ငွေကြေးရှာဖွေရာတွင် ပိုမိုရုန်းကန်ရနိုင်ပါသည်။",
                "ဇာတာရှင်သည် စိတ်တိုလွယ်၍ မာနကြီးနိုင်ပြီး ပြောဆိုဆက်ဆံရေးတွင် ကြမ်းတမ်းမှုကို ရှောင်ရှားသင့်ပါသည်။",
                "ဇာတာရှင်သည် စိုက်ပျိုးရေးနှင့် အိမ်ခြံမြေ လုပ်ငန်းများမှတစ်ဆင့် ကြီးပွားချမ်းသာနိုင်ပါသည်။",
                "ဇာတာရှင်သည် ငွေကြေးချမ်းသာ၍ ကိုယ်ကျင့်တရား ကောင်းမွန်ကာ ဆွေမျိုးကောင်းများ၏ အထောက်အပံ့ကို ရရှိနိုင်ပါသည်။",
                "ဇာတာရှင်သည် ရက်ရော၍ အများအကျိုး ဆောင်ရွက်သော ခေါင်းဆောင်တစ်ဦး ဖြစ်လာနိုင်ပါသည်။",
                "ဇာတာရှင်သည် အနုပညာ၊ တီးမှုတ်ကခုန်ခြင်းတို့ကို ဝါသနာပါ၍ ပစ္စည်းဥစ္စာ ချမ်းသာနိုင်ပါသည်။"
        ];
        result.add(new Finding(en ? enNames[distinctSigns - 1] + " Sankhya Yoga"
                : mmNames[distinctSigns - 1] + " (သင်္ခယုဂ်)",
                en ? "The seven classical planets occupy " + distinctSigns + " distinct signs."
                        : "ဂြိုဟ်ကြီး ၇ လုံးသည် ရာသီ " + localizeDigits(String(distinctSigns)) + " ခုတွင် ဖြန့်ကျက်ရပ်တည်နေသဖြင့် အဆိုပါ သင်္ခယုဂ် ရရှိပါသည်။",
                en ? "This Sankhya Yoga describes the overall distribution pattern and life tendency of the horoscope."
                        : mmEffects[distinctSigns - 1]));

        var malikaStart = findMalikaStart(planets, asc);
        if (malikaStart > 0) addMalikaFinding(result, malikaStart, en);
    
}
function findMalikaStart(planets,asc) {

        var occupied = Array(13).fill(false);
        var count = 0;
        for (var planet = 0; planet < 7; planet++) {
            var house = relativeHouse(zodiacSign(planets[planet]), asc);
            if (!occupied[house]) {
                occupied[house] = true;
                count++;
            }
        }
        if (count != 7) return -1;
        for (var start = 1; start <= 12; start++) {
            var consecutive = true;
            for (var offset = 0; offset < 7; offset++) {
                var house = ((start + offset - 1) % 12) + 1;
                if (!occupied[house]) {
                    consecutive = false;
                    break;
                }
            }
            if (consecutive) return start;
        }
        return -1;
    
}
function addMalikaFinding(result,start,en) {

        var effects = [
                "အနုပညာနှင့် ဝီဏာယုဂ်ဆိုင်ရာ အကျိုးကောင်းများ ရရှိနိုင်ပါသည်။",
                "ဇာတာရှင်သည် အုပ်ချုပ်သူ သို့မဟုတ် အရာရှိကြီးတစ်ဦး ဖြစ်လာနိုင်ပါသည်။",
                "ဇာတာရှင်သည် ရဲစွမ်းသတ္တိရှိ၍ ချမ်းသာကြွယ်ဝနိုင်ပါသည်။",
                "ဇာတာရှင်သည် အလွန်ရက်ရော၍ အလှူအတန်းပြုလုပ်နိုင်သော ခေါင်းဆောင် ဖြစ်လာနိုင်ပါသည်။",
                "ဇာတာရှင်သည် ဒါနသီလရှိသော အုပ်ချုပ်သူတစ်ဦး ဖြစ်လာနိုင်ပါသည်။",
                "ဇာတာရှင်သည် ရည်မှန်းချက်ကြီးမားသော်လည်း လောဘစိတ်နှင့် ငွေကြေးအတက်အကျကို ထိန်းညှိသင့်ပါသည်။",
                "ဇာတာရှင်သည် အုပ်ချုပ်မှုပိုင်းတွင် အောင်မြင်နိုင်ပါသည်။",
                "ဇာတာရှင်သည် အသက်ရှည်၍ ထူးခြားသူ ဖြစ်နိုင်ပြီး အိမ်ထောင်ဖက်၏ သဘောထားကို အလေးထားရနိုင်ပါသည်။",
                "ဇာတာရှင်သည် ဂုဏ်သတင်းကျော်စော၍ လှူဒါန်းပေးကမ်းမှုကြောင့် သြဇာအာဏာ ကြီးမားနိုင်ပါသည်။",
                "ဇာတာရှင်သည် ကောင်းမှုကုသိုလ်များကြောင့် လူအများ၏ ချီးကျူးပူဇော်မှုကို ခံရနိုင်ပါသည်။",
                "ဇာတာရှင်သည် အမှုကိစ္စများကို ကျွမ်းကျင်ပိုင်နိုင်၍ အချစ်ရေးနှင့် အိမ်ထောင်ရေး ကံကောင်းနိုင်ပါသည်။",
                "ဇာတာရှင်သည် ငွေကြေးသုံးစွဲမှုများနိုင်သော်လည်း နယ်ပယ်အသီးသီးတွင် အသိအမှတ်ပြု ချီးကျူးခံရနိုင်ပါသည်။"
        ];
        var end = ((start + 5) % 12) + 1;
        result.add(new Finding(en ? "Malika Yoga" : "မာလိကာယုဂ် (Malika Yoga)",
                en ? "The seven classical planets occupy seven consecutive houses from House "
                     + houseLabel(start) + " through House " + houseLabel(end) + "."
                        : "ဂြိုဟ်ကြီး ၇ လုံးသည် " + houseLabel(start) + " တန့်ဘာဝမှ " + houseLabel(end)
                          + " တန့်ဘာဝအထိ အိမ် ၇ အိမ် ဆက်တိုက် ရပ်တည်နေသဖြင့် မာလိကာယုဂ် ရရှိပါသည်။",
                en ? "The result follows the starting house of the seven-house planetary chain."
                        : effects[start - 1]));
    
}
function isMutualKendra(firstSign,secondSign) {

        return isKendraRelative(firstSign, secondSign);
    
}
function isKendraRelative(targetSign,referenceSign) {

        return androidRules.isKendraRelative(targetSign, referenceSign);
    
}
function planetsAssociated(first,second,planets) {

        return androidRules.planetsAssociated(first, second, planets);
    
}
function planetAspectsSign(planet,sourceSign,targetSign) {

        return androidRules.planetAspectsSign(planet, sourceSign, targetSign);
    
}
function isOddSign(zeroBasedSign) {

        return zeroBasedSign % 2 == 0;
    
}
function isKendraOrTrine(house) {

        return androidRules.isKendraOrTrine(house);
    
}
function planetInHouses(planet,planets,asc,houses) {

        return androidRules.planetInHouses(planet, planets, asc, houses);
    
}
function allPlanetsInHouses(planets,indexes,asc,houses) {

        for (let planet of indexes) if (!planetInHouses(planet, planets, asc, houses)) return false;
        return true;
    
}
function housesOccupied(planets,indexes,asc,houses) {

        return androidRules.housesOccupied(planets, indexes, asc, houses);
    
}
function strongInKendraTrine(planet,planets,asc,allowFriend) {

        var sign = zodiacSign(planets[planet]);
        var house = relativeHouse(sign, asc);
        return isKendraOrTrine(house) && (isOwnOrExalted(planet, sign)
                || (allowFriend && isFriendlySign(planet, sign)));
    
}
function isOwnOrExalted(planet,sign) {

        return androidRules.isOwnOrExalted(planet, sign);
    
}
function isOwnExaltedOrFriendly(planet,sign) {

        return isOwnOrExalted(planet, sign) || isFriendlySign(planet, sign);
    
}
function isFriendlySign(planet,sign) {

        return androidRules.isFriendlySign(planet, sign);
    
}
function jupiterAspects(jupiterSign,targetSign) {

        var house = relativeHouse(targetSign, jupiterSign);
        return house == 5 || house == 7 || house == 9;
    
}
function addBeneficHouseYoga(output,planets,candidates,asc,moon,houses,minimum,title,prediction,en) {

        var fromAsc = planetsInRelativeHouses(planets, candidates, asc, houses);
        var fromMoon = planetsInRelativeHouses(planets, candidates, moon, houses);
        var found = fromAsc.length >= fromMoon.length ? fromAsc : fromMoon;
        var reference = found == fromAsc ? asc : moon;
        if (found.length < minimum) return;
        var referenceName = reference == asc ? (en ? "Ascendant" : "လဂ်") : (en ? "Moon" : "စန်း");
        var houseList = houses.length == 3 ? (en ? "6th, 7th and 8th" : "၆၊ ၇၊ ၈ တန့်")
                : (en ? "3rd, 6th, 10th and 11th" : "၃၊ ၆၊ ၁၀၊ ၁၁ တန့်");
        var analysis = (en ? "Benefic planets " : "သောမဂြိုဟ်များဖြစ်သော ")
                + describePlanetPlacements(found, planets, reference, en)
                + (en ? " occupy the " + houseList + " houses from the " + referenceName + "."
                : " တို့သည် " + referenceName + " မှ " + houseList + " နေရာများတွင် ရပ်တည်နေသောကြောင့် " + title + " ရရှိပါသည်။");
        output.add(new Finding(title, analysis, prediction));
    
}
function addSankhaYoga(result,planets,asc,en) {

        var kendras = [1, 4, 7, 10];
        var trines = [1, 5, 9];
        for (let kendra of kendras) {
            for (let trine of trines) {
                var kLord = signRuler((asc + kendra - 1) % 12);
                var tLord = signRuler((asc + trine - 1) % 12);
                if (kLord == tLord || zodiacSign(planets[kLord]) != zodiacSign(planets[tLord])) continue;
                var house = relativeHouse(zodiacSign(planets[kLord]), asc);
                if (!isGoodYogaHouse(house)) continue;
                var analysis = (en ? "Kendra lord " : "ကိန်းဘာဝသခင် ") + displayPlanet(PLANET_NAMES[kLord])
                        + (en ? " and Trine lord " : " နှင့် တြိဂုဏ်းဘာဝသခင် ") + displayPlanet(PLANET_NAMES[tLord])
                        + (en ? " are conjunct in House " + houseLabel(house) + "."
                        : " တို့သည် " + houseLabel(house) + " တန့်ဘာဝတွင် ကောင်းစွာပူးယှဉ်နေသောကြောင့် သင်္ခယုဂ် ရရှိပါသည်။");
                result.add(new Finding(en ? "Sankha Yoga - Comfortable Living" : "သင်္ခယုဂ် (Sankha Yoga)", analysis,
                        en ? "The native is favoured to enjoy material comfort, a modern lifestyle, financial ease and a refined, peaceful standard of living."
                                : "လောကီစည်းစိမ်ကို အပြည့်အဝ ခံစားရမည့်သူ ဖြစ်ပါသည်။ ခေတ်မီပြီး သက်တောင့်သက်သာရှိသော လူနေမှုဘဝကို ပိုင်ဆိုင်ရမည်ဖြစ်ပြီး ငွေကြေးပူပင်စရာ မလိုဘဲ အရည်အသွေးမြင့်မားသော ဘဝခံစားမှုမျိုးဖြင့် အေးချမ်းစွာ နေထိုင်ရတတ်ပါသည်။"));
                return;
            }
        }
    
}
function addMoonYogas(result,planets,moon,en) {

        var classicalPlanets = [2, 3, 4, 5, 6];
        var second = planetsInRelativeHouses(planets, classicalPlanets, moon, [2]);
        var twelfth = planetsInRelativeHouses(planets, classicalPlanets, moon, [12]);

        if (!second.isEmpty() && !twelfth.isEmpty()) {
            var analysis = (en ? "Planets occupy both the 2nd and 12th houses from the Moon: "
                    : "စန်း၏ ဘေးနှစ်ဖက်ဖြစ်သော ၂ တန့်နှင့် ၁၂ တန့်ဘာဝများတွင် ")
                    + describePlanetPlacements(mergePlanetLists(second, twelfth), planets, moon, en)
                    + (en ? "." : " တို့ တည်ရှိနေသောကြောင့် ဒုရုဓုရာယုဂ် ရရှိပါသည်။");
            result.add(new Finding(en ? "Dhurudhura Yoga" : "ဒုရုဓုရာယုဂ် (Dhurudhura Yoga)", analysis,
                    en ? "The native may be fortunate from birth or receive inheritance, develop several income streams, gain valuable assets and give generously for public benefit."
                            : "မွေးရာပါ ကံထူးရှင် (သို့မဟုတ်) အမွေအနှစ် ရရှိမည့်သူ ဖြစ်တတ်သည်။ ဝင်ငွေလမ်းကြောင်း များပြားပြီး စီးပွားရေးလုပ်ငန်းများ တိုးတက်အောင်မြင်မည်။ တန်ဖိုးကြီး ရတနာ၊ ပိုင်ဆိုင်မှုများ ရှိတတ်ပြီး အများအကျိုးအတွက် စေတနာထက်သန်စွာ ပေးကမ်းလှူဒါန်းတတ်သူ ဖြစ်သည်။"));
            return;
        }

        if (!second.isEmpty()) {
            result.add(new Finding(en ? "Sunapha Yoga" : "သုနဖာယုဂ် (Sunapha Yoga)",
                    (en ? "Excluding the Sun, " : "တနင်္ဂနွေဂြိုဟ်မှလွဲ၍ ")
                            + describePlanetPlacements(second, planets, moon, en)
                            + (en ? " occupies the 2nd house from the Moon."
                            : " သည် စန်းမှ ၂ တန့်ဘာဝတွင် တည်ရှိနေသောကြောင့် သုနဖာယုဂ် ရရှိပါသည်။"),
                    en ? "Through personal effort and intelligence, the native can gain prosperity, excel in education and rise within distinguished society as a self-made person."
                            : "မိမိ၏ ကိုယ်ပိုင်ကြိုးစားအားထုတ်မှုနှင့် ဉာဏ်ရည်ဉာဏ်သွေးကြောင့် ကြီးပွားချမ်းသာမည်။ ပညာရေးတွင် ထူးချွန်ပြီး အထက်တန်းလွှာ လူမှုအသိုင်းအဝိုင်းတွင် တင့်တယ်စွာ ရပ်တည်နိုင်မည့် ကိုယ့်ထူးကိုယ်ချွန် အောင်မြင်သူ ဖြစ်သည်။"));
        } else if (!twelfth.isEmpty()) {
            result.add(new Finding(en ? "Anapha Yoga" : "အနဖာယုဂ် (Anapha Yoga)",
                    (en ? "Excluding the Sun, " : "တနင်္ဂနွေဂြိုဟ်မှလွဲ၍ ")
                            + describePlanetPlacements(twelfth, planets, moon, en)
                            + (en ? " occupies the 12th house from the Moon."
                            : " သည် စန်းမှ ၁၂ တန့်ဘာဝတွင် တည်ရှိနေသောကြောင့် အနဖာယုဂ် ရရှိပါသည်။"),
                    en ? "Good health, comfort, moral conduct, prosperity, public respect and a good reputation are favoured."
                            : "ကျန်းမာရေး ကောင်းမွန်ပြီး ကိုယ်စိတ်နှစ်ပါး ချမ်းသာစွာ သက်တောင့်သက်သာ နေထိုင်ရတတ်သည်။ ကိုယ်ကျင့်တရား ကောင်းမွန်ပြီး ငွေကြေးကြွယ်ဝကာ အများတကာ လေးစားကြည်ညိုရသော နာမည်ကောင်း ပိုင်ရှင် ဖြစ်မည်။"));
        } else if (!hasKemadrumaCancellation(planets, moon, [0, 2, 3, 4, 5, 6])) {
            result.add(new Finding(en ? "Kemadruma Yoga" : "ကေဒြုမယုဂ် (Kemadruma Yoga)",
                    en ? "No planet occupies either side of the Moon, and no stated Kendra or conjunction cancellation is present."
                            : "စန်း၏ ဘေးနှစ်ဖက်ဖြစ်သော ၂ တန့်နှင့် ၁၂ တန့်ဘာဝများတွင် မည်သည့်ဂြိုဟ်မျှ မရှိသည့်အပြင်၊ ကိန်းအိမ် (Kendra) တည်ရှိမှု သို့မဟုတ် စန်းနှင့်အတူ ဂြိုဟ်ပူးခြင်း စသည့် ယုဂ်ပျက်ပြယ်စေမည့် အနေအထားမျိုးလည်း မရှိသောကြောင့် ကေဒြုမယုဂ် ရရှိပါသည်။",
                    en ? "If fully effective, this Yoga can bring financial hardship, loss of reputation, isolation, declining fortunes and negative thinking. Its cancellation conditions must always be checked carefully."
                            : "ဤယုဂ်သည် အပြည့်အဝ သက်ရောက်ပါက ငွေကြေးကျပ်တည်းခြင်း၊ သိက္ခာကျခြင်း၊ အထီးကျန်ခြင်း၊ ကံဇာတာ ညှိုးမှိန်ခြင်းနှင့် အဆိုးမြင်စိတ်များ ဝင်ရောက်ခြင်းတို့ ကြုံတွေ့ရတတ်သည်။ ချမ်းသာသော မိသားစုမှ မွေးဖွားလာလျှင်ပင် စီးပွားရေး ကျဆင်းမှုများနှင့် ရင်ဆိုင်ရတတ်ပြီး မိမိကိုယ်ကို ထိန်းချုပ်နိုင်စွမ်း အားနည်းတတ်သည်။ (မှတ်ချက် - ယုဂ်ပျက်ပြယ်သည့် အခြေအနေများကို သေချာစွာ စစ်ဆေးရန် လိုအပ်ပါသည်။)"));
        }
    
}
function planetsInRelativeHouses(planets,candidates,referenceSign,houses) {

        var result = [];
        for (let planet of candidates) {
            var house = relativeHouse(zodiacSign(planets[planet]), referenceSign);
            for (let target of houses) {
                if (house == target) {
                    result.add(planet);
                    break;
                }
            }
        }
        return result;
    
}
function relativeHouse(planetSign,referenceSign) {

        return androidRules.relativeHouse(planetSign, referenceSign);
    
}
function isGoodYogaHouse(house) {

        return androidRules.isGoodYogaHouse(house);
    
}
function describePlanetPlacements(indexes,planets,referenceSign,en) {

        var text = new StringBuilder();
        for (let index of indexes) {
            if (text.length > 0) text.append(en ? ", " : "၊ ");
            text.append(displayPlanet(PLANET_NAMES[index])).append(" (")
                    .append(houseLabel(relativeHouse(zodiacSign(planets[index]), referenceSign))).append(")");
        }
        return text.toString();
    
}
function mergePlanetLists(first,second) {

        var merged = first.slice();
        for (let item of second) if (!merged.contains(item)) merged.add(item);
        return merged;
    
}
function hasKemadrumaCancellation(planets,moonSign,candidates) {

        return androidRules.hasKemadrumaCancellation(planets, moonSign, candidates);
    
}
function displayPlanet(name) {

        if (english) return name;
        switch (name) {
            case "Sun": return "၁ နွေ";
            case "Moon": return "၂ င်္လာ";
            case "Mars": return "၃ င်္ဂါ";
            case "Mercury": return "၄ ဟူး";
            case "Jupiter": return "၅ တေး";
            case "Venus": return "၆ ကြာ";
            case "Saturn": return "စနေ";
            case "Rahu": return "ရာဟု";
            case "Ketu": return "ကိတ်";
            default: return name;
        }
    
}
function houseLabel(house) {

        var roman = [
                "", "Asc", "II", "III", "IV", "V", "VI",
                "VII", "VIII", "IX", "X", "XI", "XII"
        ];
        if (house < 1 || house >= roman.length) return String(house);
        if (english) return roman[house];
        return house == 1 ? "လဂ်" : roman[house];
    
}
function localizeDigits(value) {

        if (english || value == null) return value;
        var western = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        var myanmar = ['၀', '၁', '၂', '၃', '၄', '၅', '၆', '၇', '၈', '၉'];
        var result = value;
        for (var i = 0; i < western.length; i++) {
            result = result.replace(western[i], myanmar[i]);
        }
        return result;
    
}
function zodiacSign(longitude) {

        return androidRules.zodiacSign(longitude);
    
}
function normalize(longitude) {

        var result = longitude % 360.0;
        return result < 0 ? result + 360.0 : result;
    
}
function vedicAspectHouses(planetIndex) {

        if (planetIndex == 2) return [4, 7, 8];
        if (planetIndex == 4) return [5, 7, 9];
        if (planetIndex == 6) return [3, 7, 10];
        return [7];
    
}
function signRuler(sign) {

        return androidRules.signRuler(sign);
    
}
function isMoolatrikona(planet,sign,degree) {

        switch (planet) {
            case 0: return sign == 4 && degree < 20.0;
            case 1: return sign == 1 && degree >= 4.0;
            case 2: return sign == 0 && degree < 12.0;
            case 3: return sign == 5 && degree >= 16.0 && degree < 20.0;
            case 4: return sign == 8 && degree < 10.0;
            case 5: return sign == 6 && degree < 15.0;
            case 6: return sign == 10 && degree < 20.0;
            default: return false;
        }
    
}
return analyze(planets,cusps);
}
function buildReadings() { var day=readingBirthDay,month=readingBirthMonth,year=readingBirthYear; var planets=input.planets,cusps=input.cusps;

        var transitForecasts = buildCategoryTransitForecasts(planets, cusps);

        var zodiac = new SpannableStringBuilder();
        appendNatalChartReadings(zodiac, planets, cusps, day, month, year, en);
        addReadingCategory(en ? "Zodiac Profile" : "ရာသီဆိုင်ရာအဟောများ",
                en ? "Temperament, elements and personal style" : "စိတ်နေသဘောထား၊ ဓာတ်နဲ့ ပင်ကိုစရိုက်",
                0, "#7C3AED", zodiac, en);

        var health = new SpannableStringBuilder();
        appendReadingHeading(health, en ? "Health-related Readings" : "ကျန်းမာရေးဆိုင်ရာအဟောများ");
        appendHealthSafetyProsperityReading(health, planets, cusps, en);
        appendMentalWellbeingReading(health, planets, cusps, en);
        appendVitalityAndEyeReading(health, planets, cusps, en);
        appendDashaTransitHealthWindows(health, planets, cusps, en);
        appendDashaTransitCriticalHealthWindows(health, planets, cusps, en);
        addReadingCategory(en ? "Health and Wellbeing" : "ကျန်းမာရေးအဟောများ",
                en ? "Body, mind, safety and vitality" : "ကိုယ်ခန္ဓာ၊ စိတ်၊ လုံခြုံရေးနဲ့ အသက်အား",
                0, "#0F766E", health, en);

        var family = new SpannableStringBuilder();
        appendFamilyAndSocialReading(family, planets, cusps, en);
        appendFamilyTransitForecast(family, transitForecasts.family, en);
        addReadingCategory(en ? "Family and Social Life" : "မိသားစုနှင့်လူမှုဘဝအခြေအနေ",
                en ? "Parents, siblings, relatives and networks" : "မိဘ၊ မောင်နှမ၊ ဆွေမျိုးနဲ့ လူမှုဆက်ဆံရေး",
                0, "#2563EB", family, en);

        var wealth = new SpannableStringBuilder();
        appendWealthReading(wealth, planets, cusps, en);
        appendBusinessTransitForecast(wealth, transitForecasts.business, en);
        addReadingCategory(en ? "Wealth and Business" : "ငွေကြေးနှင့် စီးပွားရေး",
                en ? "Income, business, debt and financial Yogas" : "ဝင်ငွေ၊ လုပ်ငန်း၊ အကြွေးနဲ့ ငွေကြေးယုဂ်",
                0, "#B7791F", wealth, en);

        var assets = new SpannableStringBuilder();
        appendAssetOwnershipReading(assets, planets, cusps, en);
        appendAssetTransitForecast(assets, transitForecasts.assets, en);
        addReadingCategory(en ? "Vehicles and Property" : "နေအိမ်၊ယာဉ်ကားပိုင်ဆိုင်မှုကံ",
                en ? "Vehicles, homes and property ownership" : "ယာဉ်၊ အိမ်နဲ့ အိမ်ခြံမြေပိုင်ဆိုင်မှု",
                0, "#C2410C", assets, en);

        var education = new SpannableStringBuilder();
        appendEducationReading(education, planets, cusps, en);
        appendEducationTransitForecast(education, transitForecasts.education, en);
        addReadingCategory(en ? "Education" : "ပညာရေးအဟောများ",
                en ? "Learning, qualifications and specialist skills" : "သင်ယူမှု၊ ဘွဲ့ပညာနဲ့ အထူးကျွမ်းကျင်မှု",
                0, "#4F46E5", education, en);

        var career = new SpannableStringBuilder();
        appendCareerReading(career, planets, cusps, en);
        appendCareerTransitForecast(career, transitForecasts.career, en);
        addReadingCategory(en ? "Career" : "အလုပ်အကိုင်",
                "",
                0, "#0369A1", career, en);

        var foreign = new SpannableStringBuilder();
        appendForeignOpportunityReading(foreign, planets, cusps, en);
        appendForeignTransitForecast(foreign, transitForecasts.foreign, en);
        addReadingCategory(en ? "Foreign Travel" : "နိုင်ငံခြားခရီး",
                "",
                0, "#0E7490", foreign, en);

        var marriage = new SpannableStringBuilder();
        appendMarriageReading(marriage, planets, cusps, en);
        appendMarriageTransitForecast(marriage, transitForecasts.marriage, en);
        addReadingCategory(en ? "Marriage and Partnership" : "အိမ်ထောင်ရေးအဟောများ",
                en ? "Partnership, commitment and relationship timing" : "အဖော်အဖက်၊ ကတိကဝတ်နဲ့ အချိန်ကာလ",
                0, "#BE185D", marriage, en);

        var children = new SpannableStringBuilder();
        appendChildrenReading(children, planets, cusps, day, month, year, en);
        appendChildrenTransitForecast(children, transitForecasts.children, en);
        addReadingCategory(en ? "Children" : "သားသမီးအဟောများ",
                en ? "Children, family growth and relevant periods" : "သားသမီး၊ မိသားစုတိုးပွားမှုနဲ့ သက်ဆိုင်ရာကာလ",
                0, "#15803D", children, en);

        var yoga = new SpannableStringBuilder();
        appendReadingHeading(yoga, en
                ? "Introduction to the Yogas in Your Horoscope"
                : "သင့်ဇာတာမှ ယုဂ်များအကြောင်း နိဒါန်း");
        yoga.append(en
                ? "Yogas play an exceptionally important role in making an accurate judgement of a horoscope. Before proceeding to detailed interpretation, the influences of the Yogas that may operate in your horoscope can be studied as follows.\n\n"
                : "ဇာတာတစ်စောင်ကို တိကျစွာဟောကိန်းထုတ်ရာတွင် \"ယုဂ်\" များသည် အလွန်အရေးပါသော အခန်းကဏ္ဍမှ ပါဝင်ပါသည်။ အဟောပိုင်းကဏ္ဍသို့ မသွားရောက်မီ သင့်ဇာတာအပေါ် လွှမ်းမိုးနိုင်သော ယုဂ်များ၏ သက်ရောက်မှုများကို အောက်ပါအတိုင်း လေ့လာကြည့်နိုင်ပါသည်။\n\n");
        appendReadingHeading(yoga, en ? "Presence of Beneficial Yogas" : "ယုဂ်ကောင်းများ ပါဝင်ခြင်း");
        appendReadingBullet(yoga, en
                ? "The native may gain education and prosperity and can rise to the level of a national leader or administrator."
                : "ပညာ၊ စီးပွားချမ်းသာပြီး တိုင်းပြည်ခေါင်းဆောင် (သို့မဟုတ်) အုပ်ချုပ်သူအဆင့်အထိ အောင်မြင်နိုင်ပါသည်။");
        appendReadingBullet(yoga, en
                ? "During unfavourable Dasa and transit periods, hardship may occur, but severe damage is often avoided and help tends to appear."
                : "ဒသာနှင့် ဂြိုဟ်စီးဂြိုဟ်နင်း ညံ့ချိန်တွင် ဒုက္ခအခက်အခဲများနှင့် ကြုံရသော်လည်း ဆိုးဆိုးရွားရွားမဖြစ်စေဘဲ ကယ်မမည့်သူ ပေါ်လာတတ်ပါသည်။");
        appendReadingBullet(yoga, en
                ? "During favourable Dasa and transit periods, business, social standing, career and plans may readily reach their peak."
                : "ဒသာနှင့် ဂြိုဟ်စီးဂြိုဟ်နင်း ကောင်းချိန်တွင် စီးပွားရေး၊ လူမှုရေးနှင့် အလုပ်အကိုင် အကြံအစည်များ အထွတ်အထိပ်သို့ အလွယ်တကူ ရောက်ရှိနိုင်ပါသည်။");
        appendReadingHeading(yoga, en ? "Weak or Absent Yogas" : "ယုဂ်အားနည်းခြင်း (သို့မဟုတ်) မပါဝင်ခြင်း");
        appendReadingBullet(yoga, en
                ? "Education and financial development may be weaker, and the native may encounter more difficulties in life."
                : "ပညာ၊ စီးပွားရေးတွင် အားနည်းတတ်ပြီး ဘဝတွင် အခက်အခဲများနှင့် ပိုမိုကြုံတွေ့ရတတ်ပါသည်။");
        appendReadingBullet(yoga, en
                ? "During unfavourable Dasa and transit periods, difficulties and losses may become more serious."
                : "ဒသာနှင့် ဂြိုဟ်စီးဂြိုဟ်နင်း ညံ့ချိန်တွင် အခက်အခဲပိုမိုကြီးမားတတ်ပြီး ဆုံးရှုံးမှုများပြားတတ်ပါသည်။");
        appendReadingBullet(yoga, en
                ? "During favourable periods, financial and social conditions may improve from hardship, bringing greater relief and stability."
                : "ဒသာနှင့် ဂြိုဟ်စီးဂြိုဟ်နင်း ကောင်းချိန်တွင် ဆင်းရဲနွမ်းပါးရာမှ စီးပွားရေး၊ လူမှုရေး အဆင်ပြေလာကာ အသက်ရှူပေါက်ရလာတတ်ပါသည်။");
        appendReadingHeading(yoga, en
                ? "AstroK Trisakka Analysis"
                : "💡 AstroK (တြိစက္က၏ ခွဲခြမ်းစိတ်ဖြာချက်)");
        yoga.append(en
                ? "Classical texts describe nearly one thousand favourable and unfavourable Yogas. AstroK systematically calculates and presents the most practical and precise Yogas applicable to your horoscope."
                : "ကျမ်းဂန်များအရ ယုဂ်အဆိုးအကောင်းပေါင်း တစ်ထောင်ခန့်ရှိသော်လည်း၊ ယခု AstroK App မှ သင့်ဇာတာအတွက် လက်တွေ့အသုံးအဝင်ဆုံးနှင့် အတိကျဆုံးသော ယုဂ်များကို စနစ်တကျ တွက်ချက်ဖော်ပြပေးသွားမည် ဖြစ်ပါသည်။");
        appendDetectedYogas(yoga, planets, cusps, en);
        addReadingCategory(en ? "Important Yogas" : "အရေးကြီးတဲ့ယုဂ်များ",
                en ? "Important favourable and challenging combinations" : "အရေးကြီးတဲ့ အကောင်းပေးနဲ့ ဖိအားပေးယုဂ်များ",
                0, "#9333EA", yoga, en);

        var dasha = new SpannableStringBuilder();
        appendCombinedDashaTransitReading(dasha, transitForecasts.general, en);
        addReadingCategory(en ? "Vimshottari Dasha + Transits"
                        : "ဝိသောတ္ထရီဒသာ + ကောဇာဂြိုဟ်စီးဂြိုဟ်နင်း",
                en ? "Dasha timeline and planet-by-planet transit influences"
                        : "ဒသာကာလနဲ့ ကောဇာဂြိုဟ်စီးဂြိုဟ်နင်းအဟောများ",
                0, "#475569", dasha, en);

        
return categories; }
function conversational(text) { var replacements = [
                ["ဤဇာတာရှင်သည်", "သင်က"],
                ["ဇာတာရှင်သည်", "သင်က"],
                ["ဇာတာရှင်၏", "သင့်"],
                ["ဇာတာရှင်အား", "သင့်ကို"],
                ["ဇာတာရှင်၌", "သင့်မှာ"],
                ["ဇာတာရှင်မှာ", "သင့်မှာ"],
                ["ဇာတာရှင်ကို", "သင့်ကို"],
                ["ထို့ကြောင့်", "ဒါကြောင့်"],
                ["သို့သော်လည်း", "ဒါပေမယ့်"],
                ["သို့သော်", "ဒါပေမယ့်"],
                ["ဤအချက်", "ဒီအချက်"],
                ["ဤယုဂ်", "ဒီယုဂ်"],
                ["ဤအနေအထား", "ဒီအနေအထား"],
                ["အဆိုပါ", "အဲဒီ"],
                ["၎င်းတို့", "အဲဒီအရာတွေ"],
                ["ထိုကာလ", "အဲဒီကာလ"],
                ["ထိုဘာဝ", "အဲဒီဘာဝ"],
                ["ထိုဂြိုဟ်", "အဲဒီဂြိုဟ်"],
                ["ထိုအနေအထား", "အဲဒီအနေအထား"],
                ["မိမိ၏", "ကိုယ့်ရဲ့"],
                ["မိမိကိုယ်ကို", "ကိုယ့်ကိုယ်ကို"],
                ["မိမိ", "ကိုယ့်"],
                ["စသည်တို့", "စတာတွေ"],
                ["ဖြစ်သည်ဟု", "ဖြစ်တယ်လို့"],
                ["ဖြစ်သည်ကို", "ဖြစ်တာကို"],
                ["ဖြစ်မည်ဖြစ်ပြီး", "ဖြစ်မယ်၊ ပြီးတော့"],
                ["ဖြစ်မည်ဖြစ်သဖြင့်", "ဖြစ်လာမှာမို့"],
                ["ဖြစ်မည်", "ဖြစ်မယ်"],
                ["ရရှိမည်", "ရလာမယ်"],
                ["ရမည်", "ရမယ်"],
                ["နိုင်မည်", "နိုင်မယ်"],
                ["လာမည်", "လာမယ်"],
                ["ပါမည်", "ပါမယ်"],
                ["ဖြစ်ပါသည်", "ဖြစ်ပါတယ်"],
                ["ရှိပါသည်", "ရှိပါတယ်"],
                ["ရရှိပါသည်", "ရရှိပါတယ်"],
                ["နိုင်ပါသည်", "နိုင်ပါတယ်"],
                ["တတ်ပါသည်", "တတ်ပါတယ်"],
                ["သင့်ပါသည်", "သင့်ပါတယ်"],
                ["လိုအပ်ပါသည်", "လိုအပ်ပါတယ်"],
                ["ပါဝင်ပါသည်", "ပါဝင်ပါတယ်"],
                ["တည်ပါသည်", "တည်ပါတယ်"],
                ["ပါသည်", "ပါတယ်"],
                ["ဖြစ်တတ်သည်။", "ဖြစ်တတ်တယ်။"],
                ["ရှိတတ်သည်။", "ရှိတတ်တယ်။"],
                ["ရတတ်သည်။", "ရတတ်တယ်။"],
                ["ဖြစ်သည်။", "ဖြစ်တယ်။"],
                ["ရှိသည်။", "ရှိတယ်။"],
                ["ရမည်။", "ရမယ်။"],
                ["မည်။", "မယ်။"],
                ["တတ်သည်။", "တတ်တယ်။"],
                ["နိုင်သည်။", "နိုင်တယ်။"],
                ["သင့်သည်။", "သင့်တယ်။"],
                ["လိုသည်။", "လိုတယ်။"],
                ["နိုင်ခြင်း", "နိုင်တာ"],
                ["ရှိခြင်း", "ရှိတာ"],
                ["ဖြစ်ခြင်း", "ဖြစ်တာ"],
                ["တည်ခြင်း", "တည်တာ"],
                ["ရခြင်း", "ရတာ"],
                ["လုပ်ခြင်း", "လုပ်တာ"],
                ["ပြောဆိုခြင်း", "ပြောဆိုတာ"],
                ["ထိန်းသိမ်းခြင်း", "ထိန်းသိမ်းတာ"],
                ["စစ်ဆေးခြင်း", "စစ်ဆေးတာ"],
                ["အသုံးချခြင်း", "အသုံးချတာ"],
                ["ရှောင်ရှားခြင်း", "ရှောင်တာ"],
                ["ဆောင်ရွက်ခြင်း", "ဆောင်ရွက်တာ"],
                ["ပြုလုပ်ခြင်း", "လုပ်တာ"],
                ["သဖြင့်", "လို့"],
                ["သောကြောင့်", "လို့"],
                ["သော်လည်း", "ပေမယ့်"],
                ["လျှင်", "ရင်"],
                ["ပါက", "ရင်"],
                ["ဟူ၍", "လို့"],
                ["ဟု ", "လို့ "],
                ["ဖြစ်၍", "ဖြစ်လို့"],
                ["ရှိ၍", "ရှိလို့"],
                ["တည်၍", "တည်ပြီး"],
                ["ပြီး၍", "ပြီးတော့"],
                ["၍", "ပြီး"],
                ["မည့်", "မယ့်"],
                ["ရရှိ", "ရ"],
                ["ပြုလုပ်", "လုပ်"],
                ["တို့၏", "တို့ရဲ့"],
                ["ဂြိုဟ်၏", "ဂြိုဟ်ရဲ့"],
                ["ဘာဝ၏", "ဘာဝရဲ့"],
                ["ယုဂ်၏", "ယုဂ်ရဲ့"],
                ["ကာလ၏", "ကာလရဲ့"],
                ["၏ ", "ရဲ့ "],
                ["တွင်", "မှာ"],
                ["၌", "မှာ"],
                ["နှင့်", "နဲ့"],
                ["ဖြင့်", "နဲ့"],
                ["ကြောင့်", "လို့"],
                ["တို့သည် ", "တို့က "],
                ["ဂြိုဟ်သည် ", "ဂြိုဟ်က "],
                ["စန်းသည် ", "စန်းက "],
                ["လဂ်သည် ", "လဂ်က "],
                ["ဘာဝသည် ", "ဘာဝက "],
                ["ယုဂ်သည် ", "ယုဂ်က "],
                ["အချက်သည် ", "အချက်က "],
                ["ကာလသည် ", "ကာလက "],
                ["အနေအထားသည် ", "အနေအထားက "],
                ["သည် ", "က "],
                ["သည်။", "တယ်။"],
                ["သည်၊", "တယ်၊"],
                
                ["အောက်ရင်ာလ", "အောက်ပါကာလ"],
                ["ရာလို့", "ရာဟု"],
                ["ဒါလို့", "ဒါကြောင့်"],
                ["ကာလအမှား", "ကာလအတွင်း"],
                ["အမှား", "အတွင်း"],
                ["စသည့်", "စတဲ့"],
                ["ဤ", "ဒီ"],
                ["သော", "တဲ့"],
                ["သည့်", "တဲ့"],
                ["ခြင်း", "တာ"],
                ["ထားရန်", "ထားဖို့"],
                ["စန်း (လမင်း)", "စန်း (တနင်္လာဂြိုဟ်)"],
                ["သို့တဲ့", "သို့သော"],
                ["တဲ့မ", "သောမ"],
                ["မည်တဲ့", "ဘယ်"],
                ["မျှ", "မှ"],
                ["တဲ့ကြာ", "သောကြာ"],
                ["မှော်လင့်", "မျှော်လင့်"],
                ["တဲ့ဘဏ", "သောမ"],
                ["သာရင်", "သာလျှင်"],
                ["မှတစွာ", "မျှတစွာ"]
        ];; for (var pair of replacements) text=text.split(pair[0]).join(pair[1]); return text; }
