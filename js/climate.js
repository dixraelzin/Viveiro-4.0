export function calcVPD(T,RH){
  const svp=0.6108*Math.exp((17.27*T)/(T+237.3));
  return +(svp*(1-RH/100)).toFixed(2);
}
export function vpdBand(v){
  if(v<=0.6) return "warn";
  if(v<=1.2) return "ok";
  if(v<=1.6) return "warn";
  return "bad";
}

