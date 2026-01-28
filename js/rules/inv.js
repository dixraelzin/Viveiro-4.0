export function invBand(phase,vpd){
  const t={M1:[0.4,0.9],M2:[0.6,1.1],M3:[0.7,1.3]}[phase];
  if(vpd<t[0]) return "warn";
  if(vpd<=t[1]) return "ok";
  if(vpd<=t[1]+0.3) return "warn";
  return "bad";
}

