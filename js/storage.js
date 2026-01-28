const KEY="hist";
export const getHist=()=>JSON.parse(localStorage.getItem(KEY)||"[]");
export const saveRec=r=>{
  const h=getHist();h.unshift(r);
  localStorage.setItem(KEY,JSON.stringify(h));
};

