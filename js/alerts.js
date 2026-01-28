export function fireAlert(vpd){
  if(vpd>=1.6){
    navigator.vibrate?.([300,100,300]);
    alert("🚨 VPD CRÍTICO");
  }
}

