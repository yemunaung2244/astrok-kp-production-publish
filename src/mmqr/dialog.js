import QRCode from 'qrcode';
import {createSandboxCheckout} from './checkout.js';

export function remainingSeconds(expiresAt,now=Date.now()){
  const expiry=Date.parse(expiresAt);
  return Number.isFinite(expiry)?Math.max(0,Math.ceil((expiry-now)/1000)):0;
}
export function encodePaymentQR(payload){
  // Encode the original payload verbatim, with its quiet zone intact.
  return QRCode.toDataURL(payload,{errorCorrectionLevel:'M',margin:4,scale:10,color:{dark:'#000000',light:'#ffffff'}});
}

// Mount once alongside the host app. open() is an explicit Sandbox-only review
// action; it does not intercept or replace existing production Plan buttons.
export function mountMMQRSandbox({client,storage=localStorage,onLogin=()=>{},english=false}){
  const checkout=createSandboxCheckout({client,storage});
  const host=document.createElement('div'),root=host.attachShadow({mode:'open'});
  const tr=(mm,en)=>english?en:mm;
  root.innerHTML=`<style>
    :host{font-family:inherit;color:#171a35}*{box-sizing:border-box}[hidden]{display:none!important}
    dialog{width:min(440px,calc(100% - 24px));max-height:calc(100dvh - 32px);border:1px solid #d8d0f0;border-radius:28px;padding:0;background:#f9f8ff;color:inherit;box-shadow:0 24px 80px #16133f40;overflow:auto}
    dialog::backdrop{background:#16133199;backdrop-filter:blur(5px)}
    header{padding:24px;background:linear-gradient(135deg,#24216a,#6147b6);color:white;position:relative}
    .badge{display:inline-block;color:#ffdf8b;background:#ffffff18;border:1px solid #ffffff44;border-radius:30px;padding:5px 12px;font-size:12px;letter-spacing:.07em}
    h2{font-size:23px;line-height:1.7;margin:12px 24px 0 0}header p{font-size:13px;margin:6px 0 0;color:#ece7ff;line-height:1.8}
    .close{position:absolute;right:14px;top:14px;width:36px;height:36px;border-radius:50%;border:0;background:#ffffff24;color:white;font-size:26px;cursor:pointer}
    main{padding:22px;text-align:center}.logo{display:block;width:110px;height:54px;object-fit:contain;margin:0 auto 12px}.price{font-size:30px;font-weight:750;letter-spacing:-.03em}.period{font-size:13px;color:#77758b;margin:4px 0 16px}
    .qr{display:block;width:min(100%,290px);height:auto;margin:16px auto;background:#fff;border:1px solid #eeebf4;border-radius:12px}
    .timer{background:#f0eafa;border-radius:12px;padding:10px 14px;display:flex;justify-content:space-between;font-size:14px;font-variant-numeric:tabular-nums}.timer strong{color:#483099}
    .order{font:11px/1.6 monospace;overflow-wrap:anywhere;color:#757389}.status{font-size:14px;line-height:1.9;margin:14px 0;white-space:pre-line}.error{color:#b02845}
    .actions{display:grid;gap:9px;margin-top:16px}button,a.download{font:inherit;font-size:14px;line-height:1.8;padding:12px 16px;border:0;border-radius:13px;cursor:pointer;text-decoration:none}.primary{background:linear-gradient(120deg,#37309e,#7047ca);color:white;box-shadow:0 5px 14px #50429820}.secondary,a.download{background:#eeebf7;color:#42327e}.cancel{background:transparent;color:#8f5361;font-size:13px}.actions button:disabled{opacity:.55;cursor:wait}button:focus-visible,a:focus-visible{outline:3px solid #b99dff;outline-offset:3px}.powered{font-size:11px;color:#77758b;margin:18px 0 0}
  </style><dialog aria-labelledby="mmqr-title">
    <header><span class="badge">MMQR · SANDBOX</span><button type="button" class="close" aria-label="${tr('ပိတ်ရန်','Close')}">×</button><h2 id="mmqr-title">AstroK Pro</h2><p>KP Premium · ${tr('တစ်လအသုံးပြုခွင့်','One month')}</p></header>
    <main><img class="logo" alt="MMQR"><div class="price">${tr('၅၀,၀၀၀ ကျပ်','50,000 MMK')}</div><p class="period">${tr('စမ်းသပ်မှုအတွက်သာ · တကယ့်ငွေမပေးပါနှင့်','Sandbox testing only · No real payment')}</p>
      <section class="payment" hidden><img class="qr" alt="${tr('စမ်းသပ်ငွေပေးချေမှု QR','Sandbox payment QR')}"><div class="timer"><span>${tr('ကျန်ချိန်','Time remaining')}</span><strong>15:00</strong></div><p class="order"></p></section>
      <p class="status" role="status" aria-live="polite"></p>
      <div class="actions"><button type="button" class="primary create">${tr('စမ်းသပ် QR ဖန်တီးမည်','Create test QR')}</button><a class="download" hidden>${tr('QR Download ရယူမည်','Download QR')}</a><button type="button" class="secondary check" hidden>${tr('ငွေချေမှု ပြန်စစ်မည်','Check payment')}</button><button type="button" class="secondary login" hidden>${tr('အကောင့်ဝင်ရန်','Log in')}</button><button type="button" class="cancel" hidden>${tr('ဤ order ကို ပယ်ဖျက်မည်','Cancel this order')}</button><button type="button" class="secondary reset" hidden>${tr('နောက်ထပ် စမ်းသပ်မည်','Start another test')}</button></div>
      <p class="powered">Payment powered by myanmyanpay</p>
    </main></dialog>`;
  const q=selector=>root.querySelector(selector),dialog=q('dialog');
  q('.logo').src=new URL('./assets/MMQR_Logo.png',import.meta.url).href;
  let order=null,working=false,timer=null,poller=null,generation=0;
  function stop(){clearInterval(timer);clearInterval(poller);timer=poller=null;}
  function status(text,error=false){q('.status').textContent=text;q('.status').classList.toggle('error',error);}
  function updateTimer(){const seconds=remainingSeconds(order?.expires_at);q('.timer strong').textContent=`${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;
    q('.download').hidden=!order?.qr_payload||order.status!=='pending'||seconds<=0;
    q('.payment').hidden=!order?.qr_payload||order.status!=='pending'||seconds<=0;
    if(order?.status==='pending'&&seconds<=0)status(tr('QR ပြသချိန်ကုန်ပါပြီ။ Order အခြေအနေကို ပြန်စစ်ပါ သို့မဟုတ် ပယ်ဖျက်ပါ။','QR display window ended. Check or cancel the existing order.'));
  }
  async function show(value){
    order=value;const version=++generation;stop();
    q('.create').hidden=!!order;q('.check').hidden=!order;q('.cancel').hidden=order?.status!=='pending';q('.reset').hidden=!order||order.status==='pending';
    q('.order').textContent=order?`Order · ${order.order_id}`:'';
    q('.payment').hidden=true;q('.download').hidden=true;
    if(!order){status(tr('သင့် AstroK Pro အကောင့်ဖြင့် စမ်းသပ် QR ဖန်တီးနိုင်ပါသည်။','Use your AstroK Pro account to create a test QR.'));return;}
    if(order.status==='pending'){
      status(tr('Developer Dashboard ရှိ Simulator ဖြင့်သာ စမ်းသပ်ပါ။','Simulate payment from the MyanMyanPay Developer Dashboard.'));
      if(order.qr_payload){
        const data=await encodePaymentQR(order.qr_payload);if(version!==generation)return;
        q('.qr').src=data;q('.download').href=data;q('.download').download=`AstroK-MMQR-${order.order_id}.png`;
      }
      updateTimer();timer=setInterval(updateTimer,1000);
      poller=setInterval(()=>{if(dialog.open&&!document.hidden&&!working)void run(()=>checkout.checkStatus());},10000);
    }else status(order.status==='paid'
      ?tr('စမ်းသပ်ငွေချေမှု အောင်မြင်ပါပြီ။ Sandbox မှ Plan အမှန်ကို ဖွင့်မပေးပါ။','Test payment succeeded. Sandbox does not activate a real plan.')
      :tr('ဤစမ်းသပ် order ပြီးဆုံးပါပြီ။','This test order has ended.'));
  }
  async function run(action){
    if(working)return;working=true;q('.login').hidden=true;
    root.querySelectorAll('.actions button').forEach(button=>button.disabled=true);
    try{const value=await action();if(dialog.open)await show(value);}
    catch(error){
      q('.login').hidden=error.message!=='LOGIN_REQUIRED';
      q('.check').hidden=error.message==='LOGIN_REQUIRED';
      status(error.message==='LOGIN_REQUIRED'?tr('AstroK Pro အကောင့်သို့ အရင်ဝင်ပါ။','Log in to your AstroK Pro account first.')
        :tr('လောလောဆယ် မပြီးမြောက်သေးပါ။ မူလ order ကို ပြန်စစ်နိုင်ပါသည်။','The request has not completed. Recheck the original order.'),true);
    }finally{working=false;root.querySelectorAll('.actions button').forEach(button=>button.disabled=false);}
  }
  q('.close').onclick=()=>dialog.close();q('.create').onclick=()=>run(()=>checkout.createOrder());q('.check').onclick=()=>run(()=>checkout.restore());q('.cancel').onclick=()=>run(()=>checkout.cancelOrder());
  q('.reset').onclick=()=>run(async()=>{await checkout.reset();return null;});q('.login').onclick=()=>{dialog.close();onLogin();};dialog.addEventListener('close',()=>{stop();generation++;});
  document.body.append(host);
  return {async open(){if(!dialog.open)dialog.showModal();await run(()=>checkout.restore());},close(){dialog.close();},destroy(){stop();generation++;host.remove();}};
}
