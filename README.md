# AstroK KP Web

AstroK KP စနစ်၏ website ဗားရှင်း။ KP မူလဇာတာ၊ ဟူးရား ၁–၂၄၉ / ၁–၂၁၉၃၊ Placidus ဘာဝ၊ KP New/Lahiri/Raman အယနံသ၊ ဂြိုဟ်/ဘာဝသခင်ဇယားနှင့် မူလဇာတာဒသာအခြေခံကာလများ ပါဝင်သည်။ iOS ပုံစံအတိုင်း Data ထည့်ခြင်း၊ မေးခွန်းရှာခြင်း၊ ဇာတာရလဒ် Tab များနှင့် အဟောစာရင်း Screen များကို သွားလာနိုင်သည်။ Guest ဇာတာများကို browser တွင် သိမ်းပြီး Account ဝင်ထားသော ဇာတာများကို Supabase နှင့် sync လုပ်သည်။

AstroK Pro App တွင် သုံးသော Supabase account တစ်ခုတည်းဖြင့် Web ကို ဝင်သောအခါ KP `saved_charts` ကို server မှ ပြန်ယူပြီး Web တွင် သိမ်း/ဖျက်သည့် ဇာတာများကို account နှင့် sync လုပ်သည်။ Account-bound KP Standard/Premium Plan, KP subscription, Bank Vault နှင့် ယခင် KP product license များကို server မှသာ စစ်ဆေးပြီး ပြန်ဖွင့်သည်။ App တွင် login မဝင်ဘဲ device တစ်ခုထဲမှာပဲ သိမ်းထားသော ဇာတာများနှင့် အခြား user ID သို့ ဝယ်ထားသော Plan များကို Web account အသစ်တစ်ခုဆီ အလိုအလျောက် မရွှေ့နိုင်ပါ။

ဇာတာပုံစံအဖြစ် East Indian, North Indian, South Indian, Circular, Bengali ကို ရွေးနိုင်သည်။ Classic, Midnight, Lavender, Emerald အရောင်စနစ်များ ပါဝင်ပြီး ရွေးချယ်မှုကို browser တွင် မှတ်ထားသည်။ ဇာတာထဲတွင် ဂြိုဟ်အမှတ်များကို ၁၊ ၂၊ ၃၊ ၄၊ ၅၊ ၆၊ ၀၊ ၈၊ ၉ ဂဏန်းများဖြင့်ပြပြီး ဘေးမှာ အံသာနှင့် မိနစ်ကို ဖော်ပြသည်။ ဝကြဂြိုဟ်ကို အနီရောင်ဖြင့် ခွဲပြသည်။ iOS ဇာတာရလဒ် Screen ပုံစံအတိုင်း မူလဇာတာ၊ ရွေးထားသောအချိန်၏ ကောဇာဇာတာနှင့် မူလ+ကောဇာပုံတို့ကို ပြနိုင်သည်။

Browser ထဲတွက်ချက်မှုအတွက် `@swisseph/browser` (AGPL-3.0) ကို အသုံးပြုသည်။ Dependency နှင့် licence ကို upstream [source](https://github.com/swisseph-js/swisseph) တွင် ကြည့်နိုင်သည်။ အခြေခံ Moshier ephemeris ကို အသုံးပြုသောကြောင့် native app မှ Swiss file ရရှိသည့်အခြေအနေနှင့် ဂဏန်းအနည်းငယ် ကွာနိုင်သည်။

Development: `npm install && npm run build`; static output `dist/`.
