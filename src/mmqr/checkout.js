// Inject AstroK's existing Supabase client. This module never reads auth tokens
// from storage and never grants access based on a browser payment result.
export const SANDBOX_PLAN={planId:'premium_monthly_mm',amountMMK:50000};
const TERMINAL=new Set(['paid','failed','expired','refunded']);
const STORAGE_PREFIX='astrok.mmqr.sandbox.v2.';
const validQR=value=>typeof value==='string'&&/^000201[\x20-\x7e]{20,4096}$/.test(value);
const safeError=code=>/^[A-Z][A-Z0-9_]{1,90}$/.test(code||'')?code:'PAYMENT_SERVICE_UNAVAILABLE';

export function createSandboxCheckout({client,storage,uuid=()=>crypto.randomUUID()}) {
  let busy=null;
  async function owner(){
    const {data,error}=await client.auth.getSession();
    if(error||!data?.session?.user?.id)throw Error('LOGIN_REQUIRED');
    return data.session.user.id;
  }
  async function sameOwner(user){if(await owner()!==user)throw Error('ACCOUNT_CHANGED');}
  function read(user){
    let attempt;
    try{attempt=JSON.parse(storage.getItem(STORAGE_PREFIX+user)||'null');}
    catch{throw Error('CHECKOUT_STORAGE_UNAVAILABLE');}
    if(!attempt)return null;
    if(attempt.owner!==user||attempt.planId!==SANDBOX_PLAN.planId||attempt.amountMMK!==SANDBOX_PLAN.amountMMK||typeof attempt.key!=='string')
      throw Error('INVALID_SAVED_CHECKOUT');
    return attempt;
  }
  function save(attempt){
    // Store only this account's order identity/QR; never passwords or tokens.
    try{storage.setItem(STORAGE_PREFIX+attempt.owner,JSON.stringify(attempt));}
    catch{throw Error('CHECKOUT_STORAGE_UNAVAILABLE');}
  }
  function validated(data,existingId){
    const id=data?.order_id||data?.id;
    if(!id||existingId&&existingId!==id||data.amount_mmk!==SANDBOX_PLAN.amountMMK||data.plan_id!==SANDBOX_PLAN.planId||data.environment!=='sandbox')throw Error('ORDER_OR_PRICE_MISMATCH');
    if(!['pending',...TERMINAL].includes(data.status))throw Error('INVALID_ORDER_STATUS');
    if(data.qr_payload!=null&&!validQR(data.qr_payload))throw Error('INVALID_PAYMENT_QR');
    return {order_id:id,status:data.status,amount_mmk:data.amount_mmk,plan_id:data.plan_id,environment:'sandbox',
      qr_payload:data.qr_payload||null,expires_at:data.expires_at||null,premiumActive:false};
  }
  async function invoke(name,body,attempt){
    await sameOwner(attempt.owner);
    let {data,error}=await client.functions.invoke(name,{body});
    await sameOwner(attempt.owner);
    if(error?.context?.clone){
      try{data=await error.context.clone().json();}catch{/* network/non-JSON errors carry no trusted order */}
    }
    if(data?.order_id||data?.id){
      const order=validated(data,attempt.order?.order_id);
      attempt.order=order;
      save(attempt);
    }
    if(error||data?.error)throw Error(safeError(data?.error));
    if(!attempt.order)throw Error('INVALID_ORDER_RESPONSE');
    return {...attempt.order};
  }
  function exclusive(operation){
    if(busy)throw Error('CHECKOUT_BUSY');
    busy=operation().finally(()=>{busy=null;});
    return busy;
  }
  return {
    createOrder(){return exclusive(async()=>{
      const user=await owner();
      const attempt=read(user)||{owner:user,...SANDBOX_PLAN,key:uuid(),order:null};
      // Persist the idempotency key BEFORE any network request. Reloading after
      // an ambiguous timeout resumes the original request, never a fresh charge.
      save(attempt);
      return invoke('mmqr-create-order',{plan_id:attempt.planId,idempotency_key:attempt.key},attempt);
    });},
    restore(){return exclusive(async()=>{
      const user=await owner(),attempt=read(user);
      if(!attempt)return null;
      return attempt.order
        ? invoke('mmqr-order-status',{order_id:attempt.order.order_id},attempt)
        : invoke('mmqr-create-order',{plan_id:attempt.planId,idempotency_key:attempt.key},attempt);
    });},
    checkStatus(){return exclusive(async()=>{
      const attempt=read(await owner());
      if(!attempt?.order)throw Error('NO_PAYMENT_ORDER');
      return invoke('mmqr-order-status',{order_id:attempt.order.order_id},attempt);
    });},
    cancelOrder(){return exclusive(async()=>{
      const attempt=read(await owner());
      if(!attempt?.order)throw Error('NO_PAYMENT_ORDER');
      const result=await invoke('mmqr-cancel-order',{order_id:attempt.order.order_id},attempt);
      if(!TERMINAL.has(result.status))throw Error('CANCELLATION_NOT_CONFIRMED');
      return result;
    });},
    async reset(){
      if(busy)throw Error('CHECKOUT_BUSY');
      const user=await owner(),attempt=read(user);
      if(attempt&&!TERMINAL.has(attempt.order?.status))throw Error('EXISTING_ORDER_REQUIRES_RESOLUTION');
      try{storage.removeItem(STORAGE_PREFIX+user);}catch{throw Error('CHECKOUT_STORAGE_UNAVAILABLE');}
    },
  };
}
