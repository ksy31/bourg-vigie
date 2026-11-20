function mkind(n){n=n.toLowerCase();if(/spectral|garou/.test(n))return null;
 if(/gobelin/.test(n))return'goblin';if(/kobold/.test(n))return'kobold';if(/^orc( |$)/.test(n))return'orc';
 if(/chauve/.test(n))return'bat';if(/harpie/.test(n))return'harpy';if(/aigle/.test(n))return'eagle';if(/condor/.test(n))return'condor';
 if(/^squelette/.test(n))return'skel';if(/^spectre/.test(n))return'spectre';if(/^fant[oô]me/.test(n))return'ghost';if(/liche/.test(n))return'lich';
 if(/dryade/.test(n))return'dryad';if(/^arbre/.test(n))return'tree';if(/^esprit des bois/.test(n))return'wisp';if(/^ver /.test(n))return'worm';
 if(/loup/.test(n))return'wolf';if(/renard/.test(n))return'fox';if(/sanglier/.test(n))return'boar';if(/bouquetin/.test(n))return'goat';
 if(/^ours/.test(n))return'bear';if(/^rat/.test(n))return'rat';if(/^araign/.test(n))return'spider';
 if(/braconn/.test(n))return'poacher';if(/brigand/.test(n))return'brigand';if(/bandit/.test(n))return'bandit';if(/ge[oô]l/.test(n))return'jailer';if(/cultiste/.test(n))return'cultist';if(/chiourme/.test(n))return'guard';return null}
const mhx=(c,k)=>{const n=parseInt(c.slice(1),16),f=v=>Math.max(0,Math.min(255,Math.round(v*k)));return'#'+((1<<24)|(f(n>>16)<<16)|(f(n>>8&255)<<8)|f(n&255)).toString(16).slice(1)};
function monster(x,y,h,k,pass){
 const e=h.en,u=sc,t=performance.now()/1000,B=pass==='b',nt=!!e.nt,ql=Math.max(0,Math.min(1,(Math.log(e.d+1)-.7)/3.5)),
  sd=hid(e.n)+h.id*7,sz={wolf:1,fox:.8,boar:1.05,goat:1,bear:1.3,rat:.6,spider:.7,jailer:1.12,goblin:.78,kobold:.72,orc:1.15,bat:.7,harpy:1,eagle:1,condor:1.15,skel:1,spectre:1.05,ghost:1,lich:1.1,dryad:1.05,tree:1.45,wisp:.85,worm:1.1}[k]||1,
  S0=sz*(.85+.4*ql)*(.95+.1*jt(sd,2)),dm=(1.1-.3*ql)*(.88+.24*jt(sd,1))*(nt?.8:1),
  a=Math.abs(Math.sin(t*9)),GL='#8fe9ff',nm=e.n.toLowerCase();
 cx.save();cx.translate(x-a*u*.8,y+1.7*u*(1-S0)+Math.sin(t*3+h.id)*u*.04);cx.scale(-u*S0,u*S0);
 cx.lineWidth=.12;cx.strokeStyle='rgba(29,35,38,.75)';cx.lineJoin='round';cx.lineCap='round';
 if(!B)cx.globalAlpha=.55+.45*dk();
 const C=c=>mhx(c,dm),
  rc=(p,r,w,q,c,rd)=>{if(!B)return;cx.fillStyle=C(c);cx.beginPath();cx.roundRect(p,r,w,q,rd==null?.12:rd);cx.fill();cx.stroke()},
  el=(p,r,rx,ry,c,rot)=>{if(!B)return;cx.fillStyle=C(c);cx.beginPath();cx.ellipse(p,r,rx,ry,rot||0,0,7);cx.fill();cx.stroke()},
  dot=(p,r,rr,c)=>el(p,r,rr,rr,c),
  tri=(P,c)=>{if(!B)return;cx.fillStyle=C(c);cx.beginPath();P.forEach(([p,r],i)=>i?cx.lineTo(p,r):cx.moveTo(p,r));cx.closePath();cx.fill();cx.stroke()},
  ln=(p1,r1,p2,r2,c,w)=>{if(!B)return;cx.strokeStyle=C(c);cx.lineWidth=w;cx.beginPath();cx.moveTo(p1,r1);cx.lineTo(p2,r2);cx.stroke();cx.strokeStyle='rgba(29,35,38,.75)';cx.lineWidth=.12},
  gl=(p1,r1,p2,r2,w)=>{if(B||!nt)return;cx.strokeStyle=GL;cx.lineWidth=w||.14;cx.beginPath();cx.moveTo(p1,r1);cx.lineTo(p2,r2);cx.stroke()},
  ge=(p,r,rr)=>{if(B||!nt)return;cx.fillStyle=GL;cx.beginPath();cx.arc(p,r,rr,0,7);cx.fill()};
 if(B){cx.fillStyle='rgba(20,30,10,.25)';cx.beginPath();cx.ellipse(0,1.75,k==='bear'?2.6:2.2,.4,0,0,7);cx.fill()}
 if(k==='wolf'||k==='fox'||k==='boar'||k==='goat'){
  const P={wolf:['#7d8085','#d5d7da'],fox:['#d2742c','#f4ead8'],boar:['#6b4a35','#a98a6a'],goat:['#a89878','#e6dcc4']}[k];
  let c=P[0];if(k==='wolf'&&/neiges/.test(nm))c='#d5dbe3';if(k==='wolf'&&/noir/.test(nm))c='#34353c';
  const lt=P[1],dk2=mhx(c,.72),ry=k==='boar'?1.0:.85;
  rc(-1.2,1.0,.4,.75,dk2);rc(.8,1.0,.4,.75,dk2);
  if(k==='wolf')tri([[-1.6,.2],[-2.8,.9],[-2.6,1.4],[-1.5,.7]],c);
  else if(k==='fox'){el(-2.4,.45,.95,.38,c,.5);el(-3.05,.7,.4,.28,'#f6f1e6',.5)}
  else if(k==='boar')ln(-1.7,.3,-2.2,-.1,dk2,.16);
  else tri([[-1.6,.1],[-2.1,.0],[-1.6,.5]],c);
  el(0,.5,1.75,ry,c);el(.1,.95,1.2,.3,lt);
  rc(-.7,1.0,.45,.75,c);rc(1.25,1.0,.45,.75,c);rc(-.72,1.6,.5,.16,'#2b211a',.05);rc(1.23,1.6,.5,.16,'#2b211a',.05);
  el(1.95,.0,.7,.55,c);
  if(k==='wolf'){el(2.65,.12,.55,.28,lt);tri([[1.7,-.35],[1.8,-1.0],[2.2,-.4]],c);dot(3.15,.05,.1,'#111')}
  else if(k==='fox'){el(2.55,.1,.5,.22,lt);tri([[1.65,-.3],[1.8,-1.2],[2.25,-.4]],c);dot(3.0,.05,.09,'#111')}
  else if(k==='boar'){el(2.55,.2,.5,.42,dk2);tri([[1.7,-.35],[1.85,-.8],[2.1,-.4]],dk2);tri([[2.7,.3],[3.2,-.05],[2.95,.5]],'#f4efe4');dot(3.0,.05,.1,'#111')}
  else{el(2.5,.2,.45,.3,lt);tri([[1.7,-.35],[1.8,-.8],[2.1,-.4]],c);ln(1.9,-.4,1.5,-1.3,'#d8d0b8',.22);ln(1.5,-1.3,1.05,-1.2,'#d8d0b8',.18)}
  dot(2.2,-.1,.09,'#111');
  if(k==='boar')for(let i=0;i<4;i++)tri([[-.6+i*.5,-.35],[-.45+i*.5,-.85],[-.3+i*.5,-.35]],dk2);
  if(ql>.35)ln(.2,.0,.8,.9,'#d9b0a0',.1);
  if(ql>.65){if(k!=='boar')for(let i=0;i<3;i++)tri([[-.5+i*.6,-.3],[-.3+i*.6,-.75],[-.1+i*.6,-.3]],dk2);tri([[2.8,.3],[2.9,.65],[3.0,.3]],'#fff')}
  gl(-1.0,.0,-.6,1.0);gl(-.2,-.1,.2,1.0);gl(.6,0,.9,.9);gl(-1.7,.3,-2.7,.9);ge(2.2,-.1,.17)}
 else if(k==='bear'){
  const c='#6b4a30',lt='#a98562',dk2=mhx(c,.72);
  rc(-1.4,.8,.8,.95,dk2);rc(.9,.8,.8,.95,dk2);
  dot(-2.2,.2,.3,c);el(-.6,-.7,1.1,.7,c);el(-.2,.1,2.1,1.35,c);
  rc(-1.0,.8,.9,.95,c);rc(1.2,.8,.85,.95,c);rc(-1.05,1.6,1.0,.16,'#2b211a',.05);rc(1.15,1.6,.95,.16,'#2b211a',.05);
  if(ql>.4)for(let i=0;i<3;i++)tri([[1.4+i*.3,1.6],[1.5+i*.3,1.9],[1.6+i*.3,1.6]],'#efe7d4');
  el(2.2,-.1,.85,.75,c);dot(1.8,-.85,.3,c);dot(2.6,-.85,.3,c);el(2.85,.1,.55,.4,lt);dot(3.25,-.02,.14,'#111');dot(2.45,-.3,.1,'#111');
  if(ql>.5)tri([[2.9,.4],[3.0,.8],[3.1,.4]],'#fff');
  if(ql>.35){ln(.3,-.6,.9,.3,'#d9b0a0',.1);ln(.6,-.7,1.2,.1,'#d9b0a0',.1)}
  gl(-1.2,-.4,-.7,.8);gl(-.2,-.5,.3,.8);gl(.8,-.4,1.2,.7);ge(2.45,-.3,.19)}
 else if(k==='rat'){
  const c='#7a6f66',pk='#d9a0a0';
  ln(-1.2,1.1,-2.0,.7,pk,.14);ln(-2.0,.7,-2.8,.95,pk,.14);
  el(0,1.0,1.3,.65,c);rc(-.7,1.4,.3,.35,c);rc(.6,1.4,.3,.35,c);
  tri([[1.0,.5],[2.3,1.0],[1.0,1.45]],c);dot(2.3,1.0,.1,'#d98080');dot(1.2,.4,.35,pk);dot(1.65,.85,.09,'#111');
  if(ql>.35){tri([[2.0,1.15],[2.1,1.5],[2.2,1.12]],'#fff');ln(-.3,.5,.2,1.3,'#d9b0a0',.1)}
  gl(-.6,.5,-.3,1.3);gl(.1,.4,.4,1.4);ge(1.65,.85,.16)}
 else if(k==='spider'){
  const c='#3b2e3a',lg='#2a2029';
  for(let i=0;i<8;i++){const fx=-2.0+i*.58,bx=-.4+i*.2,kx=(fx+bx)/2+(fx>bx?.5:-.5),ky=-.5-(i%2)*.4+Math.sin(t*5+i)*.1;ln(bx,.8,kx,ky,lg,.16);ln(kx,ky,fx,1.7,lg,.14)}
  el(-1.0,.55,1.1,.9,c);if(ql>.4)el(-1.0,.5,.4,.55,'#a02828');
  el(.5,.75,.65,.55,c);dot(.85,.6,.09,'#d33');dot(1.0,.78,.07,'#d33');tri([[1.05,1.0],[1.3,1.45],[1.2,.95]],'#cbbfa8');
  if(ql>.65)tri([[.6,.25],[.8,-.2],[1.0,.25]],'#cbbfa8');
  gl(-1.5,.1,-.5,.9);gl(-.9,-.1,.0,.9);gl(.3,.4,.8,1.0);ge(.85,.6,.16);ge(1.0,.78,.12)}
 else if(k==='goblin'||k==='kobold'||k==='orc'){
  const ko=k==='kobold',og=k==='orc',cm=/chaman/.test(nm),md=/maudit/.test(nm),
   sk=ko?'#b0603a':og?(md?'#586a7a':'#5f8a3c'):'#7aa84e',col=ko?'#7a4a30':og?(md?'#3a2e4a':'#5a4a3a'):'#6b4a30',bw=og?1.15:1,
   wr=f=>{if(!B)return;cx.save();cx.translate(1.0,.6);cx.rotate(-.1+a*.9);f();cx.restore()};
  if(ko)ln(-.8,.5,-2.1,1.3+Math.sin(t*4)*.15,sk,.26);
  rc(-.55,.5,.5,1.15,sk,.1);rc(.05,.5,.5,1.15,sk,.1);rc(-.58,1.3,.56,.35,'#2b211a',.08);rc(.02,1.3,.56,.35,'#2b211a',.08);
  rc(-.8*bw,-.55,1.6*bw,1.25,col,.3);rc(-.8*bw,.28,1.6*bw,.16,'#3a2a1a',.02);
  rc(-1.2*bw,-.45,.4*bw,1.0,col,.18);dot(-1.0*bw,.62,.22,sk);rc(.8*bw,-.45,.4*bw,1.0,col,.18);
  if(ql>.35){rc(-1.3*bw,-.75,.75,.4,'#7a7f88',.15);rc(.55*bw,-.75,.75,.4,'#7a7f88',.15)}
  if(ql>.65&&og)rc(-.6,-.2,1.2,.8,'#8a8f98',.12);
  dot(0,-1.2,og?.7:.78,sk);rc(.16,-1.25,.12,.14,md?'#ff5a4a':og?'#d33':'#e8e04a',.02);
  if(!og&&!ko){tri([[-.55,-1.35],[-1.6,-1.85],[-.6,-.85]],sk);tri([[.6,-1.2],[1.15,-.9],[.6,-.8]],sk)}
  if(ko){el(.75,-1.0,.5,.3,sk);tri([[-.3,-1.8],[-.45,-2.6],[.05,-1.85]],'#e6dcc4');tri([[.15,-1.85],[.2,-2.6],[.5,-1.75]],'#e6dcc4')}
  if(og){tri([[.4,-.85],[.5,-1.4],[.7,-.85]],'#f4efe4');ln(-.1,-1.55,.55,-1.4,'#2b211a',.14);if(ql>.5)rc(-.7,-1.95,1.4,.45,'#6b6f78',.3)}
  if(ql>.35)ln(-.35,-1.55,.1,-.95,'#c98a7a',.1);
  if(cm){tri([[-.6,-1.8],[.1,-2.6],[.7,-1.8]],'#3a6a3a');ln(1.25,1.7,1.25,-2.0,'#6b4a2a',.15);dot(1.25,-2.25,.3+.06*a,'#7be37b')}
  else if(ko)wr(()=>{ln(0,.8,0,-2.2,'#6b4a2a',.14);tri([[-.2,-2.2],[0,-2.9],[.2,-2.2]],'#9aa3ad')});
  else if(og)wr(()=>{ln(0,.5,0,-1.8,'#6b4a2a',.22);tri([[0,-1.9],[.9,-1.5],[0,-1.0]],'#888d96')});
  else wr(()=>rc(-.09,-1.0,.18,.95,'#cfd6dc',.05));
  dot(1.0*bw,.62,.22,sk);
  gl(-.55,-.3,-.55,.4);gl(.55,-.3,.55,.4);gl(0,-.4,0,.5);ge(.2,-1.2,.17);if(cm)ge(1.25,-2.25,.4)}
 else if(k==='bat'){
  const w=Math.sin(t*16),gt=/g[ée]ante/.test(nm),c=gt?'#4a3a5a':'#5a4a55',bg=gt?1.45:1;
  cx.scale(bg,bg);cx.translate(0,-1.0-Math.sin(t*4+h.id)*.3);
  tri([[-.1,-.3],[-1.2,-1.5-w*1.1],[-2.3,-.5-w*.5],[-1.7,-.1],[-1.3,.5],[-.7,.2],[-.3,.6]],'#3a2e3e');
  tri([[.2,-.3],[-.8,-1.7-w*1.2],[-2.0,-.8-w*.6],[-1.5,-.2],[-1.1,.4],[-.5,.2],[-.1,.5]],c);
  ln(.1,-.3,-2.0,-.8-w*.6,'#2a2030',.1);
  el(0,0,.75,.55,c);dot(.85,-.15,.42,c);tri([[.65,-.5],[.7,-1.1],[1.0,-.5]],c);tri([[.95,-.45],[1.15,-1.0],[1.3,-.35]],c);
  el(1.2,.0,.25,.18,'#7a5a60');dot(1.1,-.2,.08,'#d33');ln(-.2,.5,-.3,.9,'#2b211a',.1);ln(.2,.5,.3,.9,'#2b211a',.1);
  if(ql>.35){tri([[1.2,.1],[1.28,.4],[1.36,.1]],'#fff');tri([[1.0,.1],[1.08,.35],[1.16,.1]],'#fff')}
  gl(-.9,-.8-w*.6,-1.9,-.8-w*.6);ge(1.1,-.2,.15)}
 else if(k==='harpy'){
  const w=Math.sin(t*9),ci=/cimes/.test(nm),fe=ci?'#6f8aa8':'#8a6a4a',f2=ci?'#8fa8c4':'#a98a62';
  cx.translate(0,-.9-Math.sin(t*3+h.id)*.25);
  tri([[-.3,-.6],[-1.8,-2.4-w*1.4],[-3.0,-1.6-w*1.0],[-2.4,-.3],[-1.6,.4],[-.5,.5]],fe);ln(-.4,-.4,-2.6,-1.4-w*1.0,f2,.12);ln(-.4,-.1,-2.2,-.5,f2,.1);
  ln(-.15,.7,-.3,1.6,'#c9a85c',.2);ln(.35,.7,.45,1.6,'#c9a85c',.2);tri([[-.3,1.6],[.2,1.75],[-.6,1.8]],'#9a8a6a');tri([[.45,1.6],[.95,1.75],[.15,1.8]],'#9a8a6a');
  rc(-.7,-.55,1.4,1.25,f2,.35);ln(.6,-.3,1.6,.3+a*.4,fe,.3);tri([[1.5,.15],[2.0,.35],[1.5,.55]],'#9a8a6a');
  dot(.1,-1.2,.68,'#e6bf9a');tri([[-.7,-1.3],[-.4,-2.2],[.1,-1.8],[.4,-2.4],[.8,-1.6]],fe);rc(.2,-1.25,.12,.14,'#222',.02);
  if(ql>.35){tri([[.45,-.8],[.52,-.5],[.6,-.8]],'#fff');ln(-.3,-1.55,.2,-.95,'#c98a7a',.1)}
  if(ql>.65){rc(.5,.15,.45,.2,'#e2b43c',.04);rc(-.95,.1,.45,.2,'#e2b43c',.04)}
  gl(-1.8,-1.4-w*1.0,-2.8,-1.2-w*1.0);gl(-.4,-.1,-2.2,-.5);ge(.25,-1.2,.17)}
 else if(k==='eagle'||k==='condor'){
  const co=k==='condor',c=co?'#2f2a2a':'#5a5f78',w=Math.sin(t*8);
  cx.translate(0,-1.1-Math.sin(t*3+h.id)*.3);
  tri([[.5,-.4],[-.4,-1.3-w*1.9],[-1.8,-2.1-w*2.2],[-2.9,-1.2-w*1.2],[-2.6,-.2],[-1.0,.4]],co?'#26232a':'#454a60');
  tri([[.4,-.3],[-.6,-1.0-w*1.6],[-2.2,-1.4-w*1.8],[-3.1,-.5-w*.8],[-2.5,.1],[-.9,.5]],c);
  tri([[-1.2,.0],[-2.6,.5],[-2.5,-.4]],c);ln(.2,.7,.1,1.5,'#c9a85c',.18);ln(.7,.7,.8,1.5,'#c9a85c',.18);
  tri([[.1,1.5],[.6,1.7],[-.2,1.75]],'#2b211a');tri([[.8,1.5],[1.3,1.7],[.5,1.75]],'#2b211a');
  el(0,0,1.4,.8,c);el(.1,.3,.9,.4,co?'#3a3434':'#8a8fa8');
  el(1.5,-.45,.55,.5,co?'#c98a7a':c);if(co)el(1.05,-.2,.5,.35,'#efe9dc');
  tri([[1.95,-.55],[2.7,-.2],[1.95,-.05]],'#e2b43c');dot(1.65,-.6,.1,co?'#111':'#e2b43c');
  if(ql>.5)ln(1.3,-.8,1.7,-.5,'#c98a7a',.1);
  gl(-1.2,-.9-w*1.5,-2.5,-1.0-w*1.6);gl(-1.5,.0,-2.5,.2);ge(1.65,-.6,.18)}
 else if(k==='skel'){
  const bn='#e8e2cf',ar=/archer/.test(nm);
  ln(-.3,.6,-.35,1.6,bn,.2);ln(.25,.6,.3,1.6,bn,.2);rc(-.6,1.45,.5,.2,bn,.05);rc(.05,1.45,.5,.2,bn,.05);rc(-.5,.4,1.0,.3,bn,.1);
  rc(-.7,-.55,1.4,1.0,'#2a2522',.2);for(let i=0;i<3;i++)ln(-.55,-.35+i*.3,.55,-.35+i*.3,bn,.14);ln(0,-.55,0,.4,bn,.16);
  ln(-.7,-.4,-1.05,.6,bn,.16);dot(-1.05,.62,.15,bn);ln(.7,-.4,1.0,.6,bn,.16);dot(1.0,.62,.15,bn);
  dot(0,-1.2,.7,bn);rc(.08,-1.35,.22,.26,'#111',.08);rc(-.4,-1.35,.2,.24,'#111',.08);rc(-.2,-.72,.9,.22,bn,.05);
  for(let i=0;i<3;i++)ln(-.05+i*.25,-.72,-.05+i*.25,-.5,'#111',.06);
  if(ql>.5)rc(-.75,-1.95,1.5,.55,'#7a7f88',.3);if(ql>.35)ln(.1,-1.9,.3,-1.6,'#111',.07);
  if(ar){if(B){cx.strokeStyle=C('#7a5a30');cx.lineWidth=.14;cx.beginPath();cx.arc(1.3,.0,1.2,-1.1,1.1);cx.stroke();cx.strokeStyle=C('#e8e0c8');cx.lineWidth=.05;cx.beginPath();cx.moveTo(1.3+1.2*Math.cos(-1.1),1.2*Math.sin(-1.1));cx.lineTo(1.3+1.2*Math.cos(1.1),1.2*Math.sin(1.1));cx.stroke();cx.strokeStyle='rgba(29,35,38,.75)';cx.lineWidth=.12;
   const q=(t*1.6)%1,ax=1.6+q*3.6;ln(ax-.8,0,ax,0,'#e8e0c8',.1);tri([[ax,-.12],[ax+.3,0],[ax,.12]],'#9aa3ad')}}
  else{if(ql>.35)dot(-1.05,.2,.6,'#7c5a38');if(B){cx.save();cx.translate(1.0,.6);cx.rotate(-.1+a*.9);rc(-.09,-1.4,.18,1.4,'#8a8f98',.05);cx.restore()}}
  gl(-.55,-.35,.55,-.35);gl(-.55,-.05,.55,-.05);gl(-.3,.6,-.35,1.6);ge(.2,-1.2,.19);ge(-.3,-1.2,.15)}
 else if(k==='spectre'){
  const ar=/ardent/.test(nm),sw=/neiges/.test(nm),ry=/royal/.test(nm),rb=ar?'#c25a2a':sw?'#a8c4d8':ry?'#5a3a7a':'#5d6577',ey=ar?'#ffc04a':'#9fe8ff',w=Math.sin(t*3+h.id);
  cx.translate(0,-.5+w*.2);if(B)cx.globalAlpha=.7;
  tri([[-1.0,-1.3],[1.0,-1.3],[1.5,1.6+w*.2],[.6,1.1],[0,1.9],[-.7,1.1],[-1.5,1.7-w*.2]],rb);
  tri([[.6,-.4],[2.0,-.1+w*.2],[2.4,.3],[1.9,.5],[.6,.3]],rb);ln(2.2,.1,2.6,.0,rb,.1);ln(2.2,.3,2.6,.45,rb,.1);
  if(ql>.5)tri([[-.6,-.4],[-1.9,.0+w*.2],[-2.3,.4],[-1.8,.6],[-.6,.3]],rb);
  dot(0,-1.45,.85,mhx(rb,.7));rc(.05,-1.6,.65,.6,'#0b0b10',.25);rc(.25,-1.45,.14,.1,ey,.02);rc(.5,-1.45,.14,.1,ey,.02);
  if(ry)tri([[-.6,-2.15],[-.4,-2.75],[-.15,-2.25],[0,-2.85],[.15,-2.25],[.4,-2.75],[.6,-2.15]],'#e2b43c');
  gl(-1.3,1.0,-1.5,1.7);gl(1.3,1.0,1.5,1.6);ge(.32,-1.4,.2);ge(.57,-1.4,.2)}
 else if(k==='ghost'){
  const w=Math.sin(t*3+h.id);cx.translate(0,-.4+w*.25);
  if(B){cx.globalAlpha=.6;cx.fillStyle=C('#e9eef5');cx.beginPath();cx.moveTo(-1.2,1.6);cx.lineTo(-1.2,-.5);cx.arc(0,-.5,1.2,Math.PI,0);cx.lineTo(1.2,1.6);
   cx.quadraticCurveTo(.9,2.1+w*.2,.6,1.6);cx.quadraticCurveTo(.3,1.1,0,1.6);cx.quadraticCurveTo(-.3,2.1-w*.2,-.6,1.6);cx.quadraticCurveTo(-.9,1.1,-1.2,1.6);cx.closePath();cx.fill();cx.stroke()}
  el(1.4,.2+w*.2,.55,.25,'#e9eef5',.3);el(-1.4,.4-w*.2,.5,.25,'#e9eef5',-.3);
  el(.3,-.6,.17,.3,'#1a1a2a');el(-.3,-.6,.17,.3,'#1a1a2a');el(.45,.1,.2,.3,'#1a1a2a');
  if(ql>.5){ln(-.9,-.1,-1.4,-.2,'#8a8f98',.1);dot(-1.5,-.2,.18,'#8a8f98')}
  gl(1.2,-.3,1.2,1.4);gl(-1.2,-.3,-1.2,1.4);ge(.3,-.6,.2);ge(-.3,-.6,.2)}
 else if(k==='lich'){
  const bn='#e8e2cf',mi=/mineure/.test(nm),sg=/seigneur/.test(nm),rb=sg?'#2d1a44':mi?'#3b2a5a':'#4a2a6a';
  if(sg)tri([[-.9,-.7],[-2.2,1.7],[.3,1.7]],'#1a0f2a');
  tri([[-.95,-.5],[.95,-.5],[1.4,1.65],[-1.4,1.65]],rb);rc(-.8,.28,1.6,.16,'#e2b43c',.02);
  rc(-1.2,-.45,.4,1.0,rb,.18);dot(-1.0,.62,.17,bn);rc(.8,-.45,.4,1.0,rb,.18);dot(1.0,.62,.17,bn);
  if(ql>.5){tri([[-1.3,-.6],[-1.7,-1.3],[-.8,-.7]],'#555a60');tri([[1.3,-.6],[1.7,-1.3],[.8,-.7]],'#555a60')}
  dot(0,-1.2,.7,bn);rc(.08,-1.35,.22,.26,'#111',.08);rc(-.4,-1.35,.2,.24,'#111',.08);rc(.12,-1.3,.1,.14,'#7dff9a',.02);
  if(mi)tri([[-.9,-1.0],[0,-2.4],[.9,-1.0]],rb);else tri([[-.6,-1.8],[-.4,-2.4],[-.15,-1.9],[0,-2.5],[.15,-1.9],[.4,-2.4],[.6,-1.8]],'#e2b43c');
  ln(1.25,1.7,1.25,-2.0,'#4a3a2a',.16);dot(1.25,-2.25,.34+.06*a,'#7dff9a');
  gl(-1.2,1.3,-1.3,1.7);gl(1.2,1.3,1.3,1.7);ge(.2,-1.2,.19);ge(1.25,-2.25,.45)}
 else if(k==='dryad'){
  const bk='#8a6a42',lf='#4f8a4a';
  rc(-.55,.5,.5,1.15,bk,.1);rc(.05,.5,.5,1.15,bk,.1);rc(-.58,1.3,.56,.35,'#3a2a1a',.08);rc(.02,1.3,.56,.35,'#3a2a1a',.08);
  rc(-.7,-.55,1.4,1.0,bk,.3);tri([[-.8,-.1],[.8,-.1],[1.2,1.0],[.6,.8],[0,1.1],[-.6,.8],[-1.2,1.0]],'#3f6a3a');
  ln(.7,-.3,1.8,.2+a*.6,bk,.22);ln(1.8,.2+a*.6,2.3,-.2+a*.6,bk,.12);ln(1.8,.2+a*.6,2.3,.5+a*.6,bk,.12);dot(2.3,-.2+a*.6,.15,lf);
  ln(-.7,-.3,-1.2,.7,bk,.22);dot(-1.2,.7,.15,lf);
  dot(0,-1.2,.7,'#b8c98a');dot(-.5,-1.75,.35,lf);dot(.1,-1.95,.4,'#3f6a3a');dot(.6,-1.7,.3,lf);tri([[-.7,-1.3],[-1.1,-.6],[-.5,-.9]],lf);
  rc(.16,-1.25,.12,.14,'#b158e6',.02);dot(-.3,.0,.15,'#9b59b6');ln(-.4,-.4,.2,.3,'#9b59b6',.1);
  if(ql>.35){tri([[-.9,-.6],[-1.2,-1.1],[-.6,-.8]],'#5a3a22');tri([[.9,-.6],[1.2,-1.1],[.6,-.8]],'#5a3a22')}
  gl(-.4,-.4,.2,.3);ge(.2,-1.2,.17);ge(-.3,0,.15)}
 else if(k==='tree'){
  const bk='#5b3f26',sw=a*.5,w=Math.sin(t*2+h.id)*.15;
  tri([[-.8,1.0],[-2.0,1.75],[-.2,1.75]],bk);tri([[.5,1.0],[2.0,1.75],[.1,1.75]],bk);
  rc(-.85,-1.6,1.7,3.3,bk,.4);ln(-.3,-1.2,-.4,1.3,'#3a2616',.1);ln(.4,-1.0,.5,1.2,'#3a2616',.1);
  ln(.7,-.6,2.0,-1.0-sw,bk,.3);ln(2.0,-1.0-sw,2.6,-1.7-sw,bk,.16);ln(2.0,-1.0-sw,2.7,-.6-sw,bk,.16);ln(-.7,-.7,-1.8,-1.4+w,bk,.26);
  dot(-.7,-2.3,.9,'#2f5a3a');dot(.5,-2.5,1.0,'#3a6a45');dot(0,-3.0,.8,'#2a4a30');
  rc(.05,-.7,.3,.4,'#0b0806',.1);rc(.5,-.7,.3,.4,'#0b0806',.1);el(.4,.3,.3,.5,'#0b0806');
  if(ql>.35){dot(-.6,.8,.25,'#5a7a3a');dot(.6,-1.1,.2,'#5a7a3a')}
  if(ql>.65){tri([[.8,-1.3],[1.2,-1.8],[.8,-1.0]],'#3a2616');tri([[-.8,-1.3],[-1.2,-1.8],[-.8,-1.0]],'#3a2616')}
  dot(.2,-.5,.09,'#ff9a3a');dot(.65,-.5,.09,'#ff9a3a');
  gl(-.3,-1.2,-.4,1.3);gl(.4,-1.0,.5,1.2);ge(.2,-.5,.2);ge(.65,-.5,.2)}
 else if(k==='wisp'){
  const w=Math.sin(t*4+h.id);cx.translate(0,-.6+w*.3);if(B)cx.globalAlpha=.75;
  for(let i=0;i<5;i++)ln(-.4+i*.2,.6,-.6+i*.35+Math.sin(t*5+i)*.3,1.7,'#7fcf8a',.22);
  el(0,0,.95,1.1,'#9fe8a0');el(.1,-.1,.55,.7,'#e8ffe0');
  ln(.2,-.9,.1,-1.9,'#6b4a2a',.14);ln(.1,-1.9,-.3,-2.4,'#6b4a2a',.12);ln(.1,-1.9,.5,-2.5,'#6b4a2a',.12);ln(.55,-.8,.9,-1.8,'#6b4a2a',.12);
  el(.3,-.1,.12,.22,'#1a3a20');el(.7,-.05,.1,.2,'#1a3a20');
  if(ql>.35)for(let i=0;i<3;i++){const q=t*2+i*2.1;dot(Math.cos(q)*1.5,Math.sin(q*1.3)*.9,.1,'#d6ffd0')}
  gl(-.6,.8,-.8,1.7);ge(.3,-.1,.17);ge(.7,-.05,.14)}
 else if(k==='worm'){
  const co=/colossal/.test(nm)?'#6a5a7a':/profond/.test(nm)?'#8a6a7a':'#c79a8a',c2=mhx(co,.88),N=8;let px=0,py=0;
  el(-2.8,1.7,.9,.25,'#6b5838');
  for(let i=0;i<N;i++){const f=i/(N-1);px=-2.8+i*.62;py=1.3-Math.pow(f,2.2)*2.6+Math.sin(t*4+i*.8)*.15;
   if(ql>.5&&i>1&&i<N-1)tri([[px-.2,py-.5],[px,py-1.0-ql*.3],[px+.2,py-.5]],c2);
   dot(px,py,.35+.07*i,i%2?co:c2);if(i<N-1)gl(px,py-.3,px+.2,py+.3)}
  dot(px+.1,py,.85,co);el(px+.6,py+.05,.35,.5,'#5a1f2a');
  for(let j=0;j<3;j++)tri([[px+.45,py-.35+j*.35],[px+.95,py-.2+j*.35],[px+.45,py-.05+j*.35]],'#f4efe4');
  dot(px+.1,py-.5,.1,'#111');ge(px+.1,py-.5,.2)}
 else{
  const sk=PCOL.sk[sd%5],col={bandit:'#5a4a3a',brigand:'#7a3d2e',poacher:'#6a7a3a',jailer:'#555a66',cultist:'#4a2a6a',guard:'#6b6f78'}[k],cu=k==='cultist',
   wr=f=>{if(!B)return;cx.save();cx.translate(1.0,.6);cx.rotate(-.1+a*.9);f();cx.restore()};
  if(cu)tri([[-.9,-.5],[.9,-.5],[1.35,1.65],[-1.35,1.65]],col);
  else{rc(-.55,.5,.5,1.15,'#5b4636',.1);rc(.05,.5,.5,1.15,'#5b4636',.1);rc(-.58,1.3,.56,.35,'#2b211a',.08);rc(.02,1.3,.56,.35,'#2b211a',.08)}
  rc(-.8,-.55,1.6,1.25,col,.3);rc(-.8,.28,1.6,.16,'#5a3a22',.02);
  rc(-1.2,-.45,.4,1.0,col,.18);dot(-1.0,.62,.22,sk);rc(.8,-.45,.4,1.0,col,.18);
  if(ql>.35){rc(-1.3,-.75,.75,.4,'#7a7f88',.15);rc(.55,-.75,.75,.4,'#7a7f88',.15)}
  if(ql>.65&&!cu&&k!=='guard')rc(-.6,-.2,1.2,.8,'#8a8f98',.12);
  if(k==='guard')rc(-.6,-.1,1.2,.7,'#8a8f98',.1);
  if(k==='jailer')for(let i=0;i<3;i++)dot(-.6+i*.3,.5,.14,'#e2b43c');
  dot(0,-1.2,.72,sk);rc(.16,-1.25,.12,.14,cu?'#ff5a4a':'#222',.02);
  if(ql>.35)ln(-.35,-1.55,.1,-.95,'#c98a7a',.1);
  if(k==='bandit'){tri([[-.8,-1.1],[0,-2.2],[.8,-1.1]],'#3a2e24');rc(-.5,-1.0,1.0,.3,'#222',.05);wr(()=>rc(-.09,-1.0,.18,.95,'#cfd6dc',.05))}
  else if(k==='brigand'){rc(-.76,-1.6,1.52,.3,'#9b2f2f',.05);tri([[-.7,-1.5],[-1.3,-1.3],[-1.0,-1.0]],'#9b2f2f');wr(()=>{ln(0,.3,0,-1.5,'#6b4a2a',.28);dot(0,-1.6,.34,'#6b4a2a')})}
  else if(k==='poacher'){tri([[-.7,-1.5],[.2,-2.3],[.8,-1.5]],'#4f7a46');ln(.2,-2.2,-.2,-2.7,'#c0392b',.1);
   if(B){cx.strokeStyle=C('#7a5a30');cx.lineWidth=.14;cx.beginPath();cx.arc(1.3,.0,1.2,-1.1,1.1);cx.stroke();cx.strokeStyle=C('#e8e0c8');cx.lineWidth=.05;cx.beginPath();cx.moveTo(1.3+1.2*Math.cos(-1.1),1.2*Math.sin(-1.1));cx.lineTo(1.3+1.2*Math.cos(1.1),1.2*Math.sin(1.1));cx.stroke();cx.strokeStyle='rgba(29,35,38,.75)';cx.lineWidth=.12}}
  else if(k==='jailer'){wr(()=>{ln(0,.3,0,-1.3,'#6b4a2a',.16);dot(0,-1.45,.4,'#888d96')})}
  else if(k==='cultist'){tri([[-.95,-1.0],[0,-2.5],[.95,-1.0]],'#2d1a44');ln(1.2,1.7,1.2,-2.0,'#6b4a2a',.15);dot(1.2,-2.25,.3,'#b58cff')}
  else{rc(-.8,-1.9,1.6,.7,'#9aa3ad',.35);rc(0,-1.5,.12,.5,'#9aa3ad',.02);wr(()=>{ln(0,.3,0,-1.2,'#555a60',.18);dot(0,-1.4,.3,'#888d96')})}
  dot(1.0,.62,.22,sk);
  if(cu){gl(-.9,.8,-1.1,1.6);gl(0,.9,0,1.6);gl(.9,.8,1.1,1.6)}else{gl(-.55,-.3,-.55,.4);gl(.55,-.3,.55,.4);gl(0,-.4,0,.5)}
  ge(.2,-1.2,.17)}
 cx.restore()}
