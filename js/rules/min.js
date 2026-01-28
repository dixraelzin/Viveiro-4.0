export function minAdvice(vpd){
  if(vpd>=1.6) return "Ventilar + malla + emergencia";
  if(vpd>=1.2) return "Ventilar alto";
  return "Mantener";
}

