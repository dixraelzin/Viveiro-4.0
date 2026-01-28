export function drawChart(canvas,data){
  const ctx=canvas.getContext("2d");
  ctx.clearRect(0,0,canvas.width,canvas.height);
  if(data.length<2) return;
  const max=Math.max(...data),min=Math.min(...data);
  data.forEach((v,i)=>{
    const x=i*(canvas.width/(data.length-1));
    const y=canvas.height-(v-min)/(max-min)*canvas.height;
    if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
  });
  ctx.stroke();
}

