import {state} from "./state.js";
import {calcVPD,vpdBand} from "./climate.js";
import {minAdvice} from "./rules/min.js";
import {invBand} from "./rules/inv.js";
import {saveRec,getHist} from "./storage.js";
import {fireAlert} from "./alerts.js";
import {drawChart} from "./charts.js";
import {I18N} from "./i18n.js";

const $=id=>document.getElementById(id);

function show(s){
  ["Home","Min","Inv","Hist"].forEach(x=>$("screen"+x).classList.add("hide"));
  $("screen"+s).classList.remove("hide");
}

btnHome.onclick=()=>show("Home");
btnHist.onclick=()=>{
  renderHist();
  show("Hist");
};

goMin.onclick=()=>show("Min");
goInv.onclick=()=>show("Inv");

minCalc.onclick=()=>{
  const vpd=calcVPD(+minT.value,+minRH.value);
  minVPD.textContent=vpd;
  minBadge.className="badge "+vpdBand(vpd);
  minSteps.textContent=minAdvice(vpd);
  saveRec({time:new Date().toISOString(),sector:"Min",VPD:vpd});
  fireAlert(vpd);
};

invCalc.onclick=()=>{
  const vpd=calcVPD(+invT.value,+invRH.value);
  invVPD.textContent=vpd;
  invBadge.className="badge "+invBand(invPhase.value,vpd);
  saveRec({time:new Date().toISOString(),sector:"Inv",VPD:vpd});
  fireAlert(vpd);
};

function renderHist(){
  const h=getHist();
  histBody.innerHTML="";
  h.forEach(r=>{
    histBody.innerHTML+=`<tr><td>${r.time}</td><td>${r.sector}</td><td>${r.VPD}</td><td>${r.note||""}</td></tr>`;
  });
  drawChart(vpdChart,h.map(r=>r.VPD).slice(0,30).reverse());
}

/* I18N */
function applyLang(l){
  document.querySelectorAll("[data-i18n]").forEach(e=>{
    e.textContent=I18N[l][e.dataset.i18n];
  });
  localStorage.setItem("lang",l);
}
langSel.value=state.lang;
applyLang(state.lang);
langSel.onchange=()=>applyLang(langSel.value);

/* PWA */
if("serviceWorker"in navigator){
  navigator.serviceWorker.register("sw.js");
}

