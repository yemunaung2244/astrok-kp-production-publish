const OPERATIONS={'mmqr-create-order':'create-order','mmqr-order-status':'order-status','mmqr-cancel-order':'cancel-order'};

// Use the host's existing auth session. The relay receives no passwords, refresh
// tokens or service credentials; Supabase still verifies the short-lived JWT.
export function createMMQRRelayClient(authClient,{origin,fetchImpl=fetch}){
  const base=new URL(origin);
  if(base.protocol!=='https:'||base.username||base.password||base.search||base.hash)throw Error('INVALID_RELAY_ORIGIN');
  return {auth:authClient.auth,functions:{async invoke(name,{body}){
    if(!Object.hasOwn(OPERATIONS,name))return {error:Error('INVALID_PAYMENT_OPERATION')};
    const {data,error}=await authClient.auth.getSession();
    if(error||!data?.session?.access_token)return {error:Error('LOGIN_REQUIRED')};
    try{
      const response=await fetchImpl(new URL(`/api/mmqr/${OPERATIONS[name]}`,base),{
        method:'POST',headers:{'content-type':'application/json'},
        body:JSON.stringify({accessToken:data.session.access_token,body}),
        credentials:'omit',redirect:'error',cache:'no-store',signal:AbortSignal.timeout(40000),
      });
      const context=response.clone();
      let result;try{result=await response.json();}catch{return {error:Error('PAYMENT_SERVICE_UNAVAILABLE')};}
      return response.ok?{data:result,error:null}:{data:result,error:{context}};
    }catch{return {error:Error('PAYMENT_SERVICE_UNAVAILABLE')};}
  }}};
}
