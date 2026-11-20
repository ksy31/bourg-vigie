function mkind(n){n=n.toLowerCase();if(/spectr|garou/.test(n))return null;
 if(/loup/.test(n))return'wolf';if(/renard/.test(n))return'fox';if(/sanglier/.test(n))return'boar';if(/bouquetin/.test(n))return'goat';
 if(/^ours/.test(n))return'bear';if(/^rat/.test(n))return'rat';if(/^araign/.test(n))return'spider';
 if(/braconn/.test(n))return'poacher';if(/brigand/.test(n))return'brigand';if(/bandit/.test(n))return'bandit';if(/ge[oô]l/.test(n))return'jailer';if(/cultiste/.test(n))return'cultist';if(/chiourme/.test(n))return'guard';return null}
const mhx=(c,k)=>{const n=parseInt(c.slice(1),16),f=v=>Math.max(0,Math.min(255,Math.round(v*k)));return'#'+((1<<24)|(f(n>>16)<<16)|(f(n>>8&255)<<8)|f(n&255)).toString(16).slice(1)};
function monster(x,y,h,k,pass){
 const e=h.en,u=sc,t=performance.now()/1000,B=pass==='b',nt=!!e.nt,ql=Math.max(0,Math.min(1,(Math.log(e.d+1)-.7)/3.5)),
  sd=hid(e.n)+h.id*7,sz={wolf:1,fox:.8,boar:1.05,goat:1,bear:1.3,rat:.6,spider:.7,jailer:1.12}[k]||1,
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
