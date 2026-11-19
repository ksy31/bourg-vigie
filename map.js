const cv=$('cv'),cx=cv.getContext('2d');
let W=360,H=432,sc=3.6;
function fit(){
 const r=cv.getBoundingClientRect(),dpr=window.devicePixelRatio||1;if(!r.width)return;
 W=r.width;H=W*1.3;cv.style.height=H+'px';cv.width=W*dpr;cv.height=H*dpr;cx.setTransform(dpr,0,0,dpr,0,0);sc=W/100;
}
const SLOTS=(()=>{const a=[];for(let dx=-30;dx<=30;dx+=10)for(const dy of[-19,-9.5,0,9.5,19])if(!(Math.abs(dx)===30&&Math.abs(dy)===19))a.push([dx,dy]);return a.sort((p,q)=>(p[0]/1.6)**2+p[1]**2-((q[0]/1.6)**2+q[1]**2)||p[0]-q[0])})();
const jt=(i,n)=>{const s=Math.sin(i*127.1+n*311.7)*43758.5453;return s-Math.floor(s)};
const slot=it=>{const k=Math.floor(it.i/SLOTS.length),p=SLOTS[it.i%SLOTS.length],q=it.i?1:0;return[p[0]*1.25+k*4+q*(jt(it.i,1)-.5)*2.4,p[1]*1.25+k*4+q*(jt(it.i,2)-.5)*2]};
const tr=k=>{const n=S.npc[k];if(!n||k==='A')return 0;return n.lv>=6?2:n.lv>=3?1:0};
function vdim(){const u=S.pl.map(it=>[slot(it),it.e,it]);let rx=14,ry=11;for(const [p] of u){rx=Math.max(rx,Math.abs(p[0])+9);ry=Math.max(ry,Math.abs(p[1])+8)}const kk=Math.max(0,...u.map(([p])=>Math.hypot(p[0]/rx,p[1]/ry)));if(kk>.9){rx*=kk/.9;ry*=kk/.9}return{u,rx,ry}}
function dij(NX,NY,src,goal,ok,cost){const N=NX*NY,dist=new Float64Array(N).fill(1e9),prv=new Int32Array(N).fill(-1),h=[[0,src]];dist[src]=0;
 const push=e=>{h.push(e);let k=h.length-1;while(k>0){const p=(k-1)>>1;if(h[p][0]<=h[k][0])break;[h[p],h[k]]=[h[k],h[p]];k=p}};
 const pop=()=>{const t=h[0],l=h.pop();if(h.length){h[0]=l;let k=0;for(;;){let a=2*k+1,b=a+1,m=k;if(a<h.length&&h[a][0]<h[m][0])m=a;if(b<h.length&&h[b][0]<h[m][0])m=b;if(m===k)break;[h[m],h[k]]=[h[k],h[m]];k=m}}return t};
 while(h.length){const [d,c]=pop();if(d>dist[c])continue;if(goal(c)){const r=[];for(let q=c;q>=0;q=prv[q])r.push(q);return r.reverse()}
  const ci=c%NX,cj=(c/NX)|0;for(let dj=-1;dj<=1;dj++)for(let di=-1;di<=1;di++){if(!di&&!dj)continue;const a=ci+di,b=cj+dj;if(a<0||b<0||a>=NX||b>=NY)continue;const n=b*NX+a;if(!ok(n))continue;const nd=d+cost(n,di&&dj);if(nd<dist[n]){dist[n]=nd;prv[n]=c;push([nd,n])}}}
 return null}
const VN={k:'',g:null};
function vnet(){const k=S.pl.map(i=>i.i+i.e).join(',')+JSON.stringify(S.zp);if(VN.k===k)return VN.g;VN.k=k;try{VN.g=buildNet()}catch(e){VN.g=null}return VN.g}
function buildNet(){
 const {u,rx,ry}=vdim(),x0=Math.floor(T.x-rx-6),y0=Math.floor(T.y-ry-6),NX=Math.ceil(2*rx+12)+2,NY=Math.ceil(2*ry+12)+2,N=NX*NY,blk=new Uint8Array(N),Rr=rng(7700),nz=new Float32Array(N);
 for(let k=0;k<N;k++)nz[k]=Rr()*.6;
 const nodes=[];
 for(const [p,e,it] of u.slice().sort((a,b)=>a[2].i-b[2].i)){const k=NK[e]||'H',hw=(k==='V'?4.2:k==='E'?3.8:k==='A'?4.4:3.2)+.9,tp=k==='A'?7.4:4.6,bx=T.x+p[0],by=T.y+p[1];
  for(let j=Math.floor(by-tp-y0);j<=Math.ceil(by+2.9-y0);j++)for(let i=Math.floor(bx-hw-x0);i<=Math.ceil(bx+hw-x0);i++){const x=x0+i,y=y0+j;if(x>=bx-hw&&x<=bx+hw&&y>=by-tp&&y<=by+2.9&&i>=0&&j>=0&&i<NX&&j<NY)blk[j*NX+i]=1}
  nodes.push([bx,by+3.6,1])}
 const ent={};
 for(const z of ZA){const d=RD[z.n];if(!d)continue;let q=d[d.length-1];for(const p of d)if(((p[0]-T.x)/rx)**2+((p[1]-T.y)/ry)**2>.94){q=p;break}nodes.push([q[0],q[1],2,z.n])}
 const cell=(x,y)=>{const i=Math.min(NX-1,Math.max(0,Math.round(x-x0)));let j=Math.min(NY-2,Math.max(0,Math.round(y-y0)));while(j<NY-1&&blk[j*NX+i])j++;return j*NX+i};
 const cs=nodes.map(n=>cell(n[0],n[1])),path=new Uint8Array(N),lines=[];path[cs[0]]=1;
 const ord=nodes.map((n,i)=>i).slice(1).sort((a,b)=>nodes[a][2]-nodes[b][2]||Math.hypot(nodes[a][0]-nodes[0][0],nodes[a][1]-nodes[0][1])-Math.hypot(nodes[b][0]-nodes[0][0],nodes[b][1]-nodes[0][1]));
 for(const id of ord){const c=cs[id];if(path[c])continue;
  const r=dij(NX,NY,c,q=>path[q]===1,q=>!blk[q],(q,dg)=>(dg?1.41:1)*(1+nz[q])*(path[q]?.25:1));
  if(!r)continue;r.forEach(q=>{path[q]=1});lines.push(r.map(q=>[x0+q%NX,y0+((q/NX)|0)]));if(nodes[id][2]===2)ent[nodes[id][3]]={x:x0+r[0]%NX,y:y0+((r[0]/NX)|0)}}
 for(const id in nodes)if(nodes[id][2]===2&&!ent[nodes[id][3]])ent[nodes[id][3]]={x:x0+cs[id]%NX,y:y0+((cs[id]/NX)|0)};
 const cl=[],pts=[];for(let q=0;q<N;q++)if(path[q]){cl.push(q);pts.push([x0+q%NX,y0+((q/NX)|0)])}
 return{x0,y0,NX,NY,path,cl,pts,lines,ent,blk}}
function drawNet(g,n,s){g.lineCap='round';g.lineJoin='round';
 for(const L of n.lines){if(L.length<2)continue;const P=L.filter((q,k)=>k%2===0||k===L.length-1);
  for(const [w,c] of [[2.7,'rgba(95,85,65,.6)'],[2.1,'#b09b68'],[.8,'rgba(240,230,196,.55)']]){g.strokeStyle=c;g.lineWidth=w*s*.9;g.beginPath();g.moveTo(P[0][0]*s,P[0][1]*s);
   for(let k=1;k<P.length-1;k++)g.quadraticCurveTo(P[k][0]*s,P[k][1]*s,(P[k][0]+P[k+1][0])/2*s,(P[k][1]+P[k+1][1])/2*s);
   g.lineTo(P[P.length-1][0]*s,P[P.length-1][1]*s);g.stroke()}}
 g.lineCap='butt';g.lineJoin='miter'}
function ventry(z){const n=vnet();return n&&n.ent[z.n]||null}
function vpath(a,b){const n=vnet();if(!n)return[];
 const f=p=>{let bi=-1,bd=1e9;for(let k=0;k<n.pts.length;k++){const d=Math.hypot(n.pts[k][0]-p.x,n.pts[k][1]-p.y);if(d<bd){bd=d;bi=n.cl[k]}}return bi},s=f(a),t=f(b);
 if(s<0||t<0||s===t)return[];
 const r=dij(n.NX,n.NY,s,c=>c===t,c=>n.path[c],(c,dg)=>dg?1.41:1);if(!r)return[];
 const w=[];r.forEach((c,k)=>{if(k%2===1||k===r.length-1)w.push({x:Math.round((n.x0+c%n.NX)*10)/10,y:Math.round((n.y0+((c/n.NX)|0))*10)/10})});return w}
const base=h=>{const it=(h.home&&S.pl.find(x=>x.h===h.home))||S.pl.find(x=>x.e===NE.A)||S.pl[0];return door(it)};
let VR={rx:19,ry:17.5};
const hidn=h=>h.st==='rest'&&!h.home;
const NK=Object.fromEntries(Object.entries(NE).map(([k,v])=>[v,k]));
const BS={A:{w:'#e6d3a8',r:'#9b4a2f',inn:1},V:{w:'#ece2c8',r:'#3f5f8a',big:1},F:{w:'#b9b2a4',r:'#55555e',c:1,dk:1},T:{w:'#d9b98f',r:'#7a3d2e',c:1},S:{w:'#efeae0',r:'#6c7fb5',tw:1},M:{w:'#a8794a',aw:1},E:{w:'#a8794a',r:'#6b4a2a',wide:1},H:{w:'#d9b98f',c:1}};
function bld(x,y,k,rc,e,t){t=t||0;
 const u=sc,o=BS[k]||BS.H,hw=(o.big?4.2:o.wide?3.8:3.2)*u,tp=(o.big?2:1.2)*u,bt=y+2.6*u,rf=o.r||rc||'#8b4a3a',ln='rgba(29,35,38,.65)';
 cx.lineWidth=1;cx.strokeStyle=ln;cx.lineJoin='round';
 if(o.inn){const hw2=4.4*u,top=y-4.2*u,bt2=y+2.6*u,fh=(bt2-top)/3,dw=1.1*u;
  cx.fillStyle='#8a7a68';cx.fillRect(x+2.2*u,top-3.2*u,1.1*u,3.6*u);cx.fillStyle='rgba(235,235,235,.4)';[[2.75,-4.2,.8],[3.2,-5.5,1.1]].forEach(([a,b,r])=>{cx.beginPath();cx.arc(x+a*u,top+b*u,r*u,0,7);cx.fill()});
  cx.fillStyle=o.w;cx.fillRect(x-hw2,top,2*hw2,bt2-top);cx.strokeRect(x-hw2,top,2*hw2,bt2-top);
  cx.strokeStyle='rgba(29,35,38,.35)';cx.beginPath();for(let i=1;i<3;i++){cx.moveTo(x-hw2,top+i*fh);cx.lineTo(x+hw2,top+i*fh)}cx.stroke();cx.strokeStyle=ln;
  cx.fillStyle='#9cc3de';for(let r=0;r<3;r++)for(let c=0;c<4;c++){if(r===2&&(c===1||c===2))continue;const wx=x+(c-1.5)*2.1*u-.5*u,wy=top+r*fh+.65*u;cx.fillRect(wx,wy,u,1.1*u);cx.strokeRect(wx,wy,u,1.1*u)}
  POLY(cx,[[x-hw2-.7*u,top],[x,top-3*u],[x+hw2+.7*u,top]],rf);POLY(cx,[[x,top-3*u],[x+hw2+.7*u,top],[x,top]],'rgba(0,0,0,.18)');
  cx.beginPath();cx.moveTo(x-hw2-.7*u,top);cx.lineTo(x,top-3*u);cx.lineTo(x+hw2+.7*u,top);cx.closePath();cx.stroke();
  cx.fillStyle='#5a3a22';cx.beginPath();cx.moveTo(x-dw,bt2);cx.lineTo(x-dw,bt2-1.5*u);cx.arc(x,bt2-1.5*u,dw,Math.PI,0);cx.lineTo(x+dw,bt2);cx.fill();
  if(e){cx.font=`${u*2.2}px serif`;cx.fillStyle='#000';cx.fillText(e,x,top-.35*u)}
  return}
 if(o.c){cx.fillStyle=o.dk?'#4a4a52':'#8a7a68';cx.fillRect(x+1.5*u,y-4.6*u,1.1*u,3.6*u);cx.fillStyle='rgba(235,235,235,.4)';[[2.05,-5.4,.8],[2.5,-6.7,1.1]].forEach(([a,b,r])=>{cx.beginPath();cx.arc(x+a*u,y+b*u,r*u,0,7);cx.fill()})}
 if(o.tw){cx.fillStyle=o.w;cx.fillRect(x-1.1*u,y-tp-4.4*u,2.2*u,4*u);cx.strokeRect(x-1.1*u,y-tp-4.4*u,2.2*u,4*u);POLY(cx,[[x-1.6*u,y-tp-4.4*u],[x,y-tp-6.4*u],[x+1.6*u,y-tp-4.4*u]],rf)}
 cx.fillStyle=o.w;cx.fillRect(x-hw,y-tp,2*hw,bt-y+tp);cx.strokeRect(x-hw,y-tp,2*hw,bt-y+tp);if(t>=1&&!o.aw){cx.fillStyle='#8f8a7d';cx.fillRect(x-hw,bt-.9*u,2*hw,.9*u);cx.strokeRect(x-hw,bt-.9*u,2*hw,.9*u)}
 if(o.aw){const n=6,w=2*hw/n;
  for(let i=0;i<n;i++){cx.fillStyle=i%2?'#f4efe4':'#c0392b';cx.beginPath();cx.moveTo(x-hw+i*w,y-tp-.4*u);cx.lineTo(x-hw+(i+1)*w,y-tp-.4*u);cx.lineTo(x-hw+(i+1)*w+.25*u,y+.4*u);cx.lineTo(x-hw+i*w-.25*u,y+.4*u);cx.fill()}
  cx.fillStyle='#5a3a22';cx.fillRect(x-hw+.2*u,y+.4*u,.5*u,2.2*u);cx.fillRect(x+hw-.7*u,y+.4*u,.5*u,2.2*u);
  cx.fillStyle='#c9a36b';cx.fillRect(x-hw+.6*u,y+1.7*u,2*hw-1.2*u,.9*u);
  if(t>=1)for(let i=0;i<5;i++){cx.fillStyle=['#c0392b','#e2b43c','#6a8c4a','#e07a5f','#8ecae6'][i];cx.beginPath();cx.arc(x-hw+1.3*u+i*1.2*u,y+1.45*u,.3*u,0,7);cx.fill()}
  if(t>=2){cx.strokeStyle='#3a2a20';cx.beginPath();cx.moveTo(x,y-tp-.4*u);cx.lineTo(x,y-tp-2.6*u);cx.stroke();cx.strokeStyle=ln;POLY(cx,[[x,y-tp-2.6*u],[x+1.8*u,y-tp-2*u],[x,y-tp-1.4*u]],'#e2b43c')}
  cx.font=`${u*2.2}px serif`;cx.fillStyle='#000';cx.fillText(e,x,y+1.5*u);return}
 POLY(cx,[[x-hw-.7*u,y-tp],[x,y-tp-3*u],[x+hw+.7*u,y-tp]],rf);
 POLY(cx,[[x,y-tp-3*u],[x+hw+.7*u,y-tp],[x,y-tp]],'rgba(0,0,0,.18)');
 cx.beginPath();cx.moveTo(x-hw-.7*u,y-tp);cx.lineTo(x,y-tp-3*u);cx.lineTo(x+hw+.7*u,y-tp);cx.closePath();cx.stroke();
 if(t>=1){cx.strokeStyle='rgba(255,255,255,.5)';cx.lineWidth=.3*u;cx.beginPath();cx.moveTo(x-hw-.7*u,y-tp);cx.lineTo(x,y-tp-3*u);cx.lineTo(x+hw+.7*u,y-tp);cx.stroke();cx.lineWidth=1;cx.strokeStyle=ln}
 if(o.big){cx.strokeStyle='#3a2a20';cx.beginPath();cx.moveTo(x,y-tp-3*u);cx.lineTo(x,y-tp-6*u);cx.stroke();cx.strokeStyle=ln;POLY(cx,[[x,y-tp-6*u],[x+2.2*u,y-tp-5.2*u],[x,y-tp-4.4*u]],'#c0392b')}
 const dw=(o.wide?1.5:o.big?1.1:.7)*u;
 cx.fillStyle='#5a3a22';cx.beginPath();cx.moveTo(x-dw,bt);cx.lineTo(x-dw,bt-1.5*u);cx.arc(x,bt-1.5*u,dw,Math.PI,0);cx.lineTo(x+dw,bt);cx.fill();
 if(o.wide){cx.strokeStyle='#3a2a20';cx.beginPath();cx.moveTo(x,bt-1.5*u-dw);cx.lineTo(x,bt);cx.stroke();cx.strokeStyle=ln}
 else{cx.fillStyle='#9cc3de';[-hw+.7*u,hw-1.8*u].forEach(a=>{cx.fillRect(x+a,y-.2*u,1.1*u,1*u);cx.strokeRect(x+a,y-.2*u,1.1*u,1*u)})}
 if(t>=1&&o.wide){cx.fillStyle='#d9b84a';cx.fillRect(x+hw+.2*u,bt-1.2*u,1.5*u,1.2*u);cx.strokeRect(x+hw+.2*u,bt-1.2*u,1.5*u,1.2*u)}
 if(t>=1&&o.tw){cx.strokeStyle=t>=2?'#e2b43c':'#5a3a22';cx.lineWidth=.3*u;cx.beginPath();cx.moveTo(x,y-tp-6.4*u);cx.lineTo(x,y-tp-8.2*u);cx.moveTo(x-.6*u,y-tp-7.4*u);cx.lineTo(x+.6*u,y-tp-7.4*u);cx.stroke();cx.lineWidth=1;cx.strokeStyle=ln}
 if(t>=2){cx.fillStyle='#e2b43c';cx.beginPath();cx.arc(x,y-tp-3*u,.5*u,0,7);cx.fill();cx.stroke();
  if(!o.wide)for(const s of[-1,1]){cx.fillStyle='#ffd066';cx.beginPath();cx.arc(x+s*(dw+.9*u),bt-1.6*u,.35*u,0,7);cx.fill()}
  if(o.big){cx.fillStyle='#f4efe4';cx.beginPath();cx.arc(x,y-tp+1.1*u,.65*u,0,7);cx.fill();cx.stroke();cx.beginPath();cx.moveTo(x,y-tp+1.1*u);cx.lineTo(x,y-tp+.65*u);cx.moveTo(x,y-tp+1.1*u);cx.lineTo(x+.35*u,y-tp+1.1*u);cx.stroke()}
  else if(!o.wide){cx.fillStyle='#c0392b';[-hw+.7*u,hw-1.8*u].forEach(a=>cx.fillRect(x+a-.1*u,y+.8*u,1.3*u,.35*u))}}
 if(e){cx.font=`${u*2.2}px serif`;cx.fillStyle='#000';cx.fillText(e,x,y-tp-.35*u)}
}
function drawTown(){
 const {u,rx,ry}=vdim(),B=S.pl.length-2;
 VR={rx,ry};
 villageGround(u,rx,ry);
 u.sort((a,b)=>a[0][1]-b[0][1]);
 for(const [p,e,it] of u){
  const x=(T.x+p[0])*sc,y=(T.y+p[1])*sc,k=NK[e]||'H',hw=k==='V'?5.2:4.4;cx.fillStyle='rgba(20,30,10,.22)';cx.beginPath();cx.ellipse(x+sc*.9,y+sc*2.4,sc*hw,sc*1.2,0,0,7);cx.fill();
  bld(x,y,k,(it.h&&it.h.o!=null&&(S.hero.find(q=>q.id===it.h.o)||{}).col)||'#8b4a3a',e,tr(k))
 }
 for(const q of VC.pr)prop(q);
 for(const k in S.npc){const it=S.pl.find(x=>x.e===NE[k]);if(!it)continue;const p=slot(it),x=(T.x+p[0]+(k==='V'?5.6:4.8))*sc,y=(T.y+p[1]+1.1)*sc;person(x,y,{g:gd(S.npc[k],S.npc[k].n),id:hid(S.npc[k].n),r:k,f:-1})}
 const st=B<4?'Hameau':B<9?'Village':B<16?'Bourg':'Cité';
 cx.fillStyle='#1d2326';cx.font=`700 ${sc*3.6}px Alegreya,serif`;cx.fillText(st+' de '+S.vn,T.x*sc,Math.min(T.y+ry+4,H*MS/sc-1.5)*sc);
}
const GLOW=(()=>{const c=document.createElement('canvas');c.width=c.height=64;const g=c.getContext('2d'),q=g.createRadialGradient(32,32,0,32,32,32);q.addColorStop(0,'rgba(255,211,122,.85)');q.addColorStop(.35,'rgba(255,211,122,.32)');q.addColorStop(1,'rgba(255,211,122,0)');g.fillStyle=q;g.fillRect(0,0,64,64);return c})();
const PCOL={sk:['#f2cfa8','#e8b88a','#c98f62','#a8683f','#f6d8bd'],hr:['#3b2a1e','#6b4a2b','#c79a4b','#1f1a17','#8a3b24','#d9d0c0'],hs:['#8a5a3a','#6b4a2a','#d8d2c4','#3a2a22']};
const NPV={A:{c:'#b8864b',a:'#f1ece0',x:'mug'},F:{c:'#555a66',a:'#6b4a2a',x:'hammer'},T:{c:'#8a3b3b',a:'#f1ece0',x:'mug'},S:{c:'#efeae0',h:'#6c7fb5',x:'cross'},M:{c:'#6a8c4a',h:'#a8794a',x:'sack'},E:{c:'#8a6a3c',h:'#d9c27a',x:'fork'},V:{c:'#3f5f8a',h:'#2f3b52',x:'chain'}};
const hid=n=>{let s=0;for(const c of sn(n))s=(s*31+c.charCodeAt(0))>>>0;return s};
const FACE=new Map();
function mvOf(id,x,y){let o=FACE.get(id);const now=performance.now();if(!o){o={x,y,f:1,ph:0,mt:-1e9};FACE.set(id,o)}
 const dx=x-o.x,dy=y-o.y,d=Math.hypot(dx,dy);if(d>.004){if(Math.abs(dx)>.002)o.f=dx>0?1:-1;o.ph+=d/sc*2.4;o.mt=now}o.x=x;o.y=y;o.mv=now-o.mt<220;return o}
function person(x,y,o){
 const u=sc,t=performance.now()/1000,fem=o.g==='♀',id=o.id||0,sk=PCOL.sk[id%5],hr=PCOL.hr[(id*3+1)%6],ph=o.ph||0,mv=!!o.mv,sw=mv?Math.sin(ph):0,fg=!!o.fight,k=o.k,np=o.r?NPV[o.r]:null,col=np?np.c:o.col,hs=o.hs;
 let by=mv?-Math.abs(Math.sin(ph))*.12:(np?Math.sin(t*2+id)*.04:0);
 cx.save();cx.translate(x,y);cx.scale(u*(o.f||1),u);cx.lineWidth=.12;cx.strokeStyle='rgba(29,35,38,.75)';cx.lineJoin='round';
 const rc=(a,b,w,h,c,r)=>{cx.fillStyle=c;cx.beginPath();cx.roundRect(a,b,w,h,r==null?.12:r);cx.fill();cx.stroke()},
  ci=(a,b,r,c)=>{cx.fillStyle=c;cx.beginPath();cx.arc(a,b,r,0,7);cx.fill();cx.stroke()},
  ln=(a,b,c,d,co,w)=>{cx.strokeStyle=co;cx.lineWidth=w;cx.beginPath();cx.moveTo(a,b);cx.lineTo(c,d);cx.stroke();cx.strokeStyle='rgba(29,35,38,.75)';cx.lineWidth=.12},
  tri=(p,c)=>{cx.fillStyle=c;cx.beginPath();p.forEach(([a,b],i)=>i?cx.lineTo(a,b):cx.moveTo(a,b));cx.closePath();cx.fill();cx.stroke()};
 cx.fillStyle='rgba(20,30,10,.25)';cx.beginPath();cx.ellipse(0,hs?1.95:1.7,hs?2.5:1,hs?.45:.36,0,0,7);cx.fill();
 if(hs){const hc=PCOL.hs[id%4],lg=(lx,s)=>{const sh=mv?Math.sin(ph+s)*.4:0;rc(lx+sh,1.25,.42,.7,hc,.1);rc(lx+sh-.02,1.75,.46,.2,'#2b211a',.05)};
  lg(-1.25,0);lg(-.65,Math.PI);lg(.65,Math.PI);lg(1.25,0);
  ln(-1.6,.5,-2.3,1.4+(mv?Math.sin(ph)*.2:0),hc,.35);
  cx.fillStyle=hc;cx.beginPath();cx.ellipse(0,.85,1.75,.8,0,0,7);cx.fill();cx.stroke();
  tri([[1.2,.35],[1.8,-.6],[2.3,-.35],[1.75,.65]],hc);cx.fillStyle=hc;cx.beginPath();cx.ellipse(2.5,-.25,.58,.33,.5,0,7);cx.fill();cx.stroke();
  tri([[1.7,-.62],[1.9,-.9],[2.0,-.55]],hc);ci(2.62,-.3,.06,'#111');rc(-.55,.15,1.1,.3,'#8a2f2f',.1);by=-.55+(mv?Math.sin(ph*2)*.06:0)}
 cx.translate(0,by);
 if(fem&&!np)rc(-.85,-1.55,1.7,1.7,hr,.5);
 if(k==='R'){rc(-1.0,-.95,.4,1.35,'#7a5a30',.1);ln(-.9,-.95,-.9,-1.25,'#e8e0c8',.1);ln(-.75,-.95,-.75,-1.3,'#c0392b',.1)}
 if(!hs){const lg=(sx,s)=>{const sh=sw*s*.3,lf=mv?Math.max(0,Math.sin(ph+(s<0?Math.PI:0)))*.25:0;rc(sx+sh,.5,.5,1.15-lf,(fem||np&&np.a)?sk:'#5b4636',.1);rc(sx+sh-.03,1.3-lf,.56,.35,'#2b211a',.08)};lg(-.55,1);lg(.05,-1)}
 else rc(-.15,.3,.55,.95,'#5b4636',.1);
 rc(-.8,-.55,1.6,1.25,col,.3);
 if(fem&&!hs){cx.fillStyle=col;cx.beginPath();cx.moveTo(-.8,.1);cx.lineTo(.8,.1);cx.lineTo(1.1,.95);cx.lineTo(-1.1,.95);cx.closePath();cx.fill();cx.stroke();cx.fillStyle='rgba(0,0,0,.15)';cx.fill()}
 cx.fillStyle='#5a3a22';cx.fillRect(-.8,.28,1.6,.16);
 if(np&&np.a)rc(-.6,-.1,1.2,.85,np.a,.1);
 const arm=(sx,s)=>{const a=sw*s*.35;rc(sx-.2,-.45+a*.4,.4,1.0,col,.18);ci(sx,.62+a*.4,.22,sk)};arm(-1.0,-1);arm(1.0,1);
 ci(0,-1.2,.72,sk);cx.fillStyle='#222';cx.fillRect(-.28,-1.25,.12,.14);cx.fillRect(.16,-1.25,.12,.14);
 const cap=(c,r)=>{cx.fillStyle=c;cx.beginPath();cx.arc(0,-1.25,r,Math.PI*1.02,Math.PI*1.98);cx.closePath();cx.fill();cx.stroke()};
 if(k==='G'){cap('#a7afb9',.8);tri([[-.1,-2.0],[.1,-2.0],[.35,-2.55],[-.35,-2.4]],'#c0392b')}
 else if(k==='V'){cap('#3d3550',.82);rc(-.72,-1.0,1.44,.2,'#3d3550',.05)}
 else if(k==='R'){cap('#4f7a46',.82);tri([[-.7,-1.7],[.2,-2.5],[.7,-1.7]],'#4f7a46')}
 else if(k==='M'){cx.fillStyle='#4a3a8c';cx.beginPath();cx.ellipse(0,-1.75,1.05,.28,0,0,7);cx.fill();cx.stroke();tri([[-.72,-1.75],[.2,-3.25],[.72,-1.75]],'#5a46a8');ci(.15,-2.2,.1,'#ffe082')}
 else if(np){if(np.h){cx.fillStyle=np.h;cx.beginPath();cx.ellipse(0,-1.75,.95,.26,0,0,7);cx.fill();cx.stroke();if(o.r==='V')rc(-.5,-2.9,1.0,1.2,np.h,.1);else rc(-.55,-2.35,1.1,.65,np.h,.18)}else cap(hr,.76)}
 else{cx.fillStyle=hr;cx.beginPath();cx.arc(0,-1.25,.76,Math.PI*1.05,Math.PI*1.95);cx.closePath();cx.fill()}
 const sa=fg?Math.sin(t*9):(mv?sw*.15:0),blade=(a,b,L,ang,co)=>{cx.save();cx.translate(a,b);cx.rotate(ang);rc(-.09,-L,.18,L-.1,co||'#d7dde3',.05);rc(-.28,-.12,.56,.14,'#8a6a2a',.04);cx.restore()};
 if(k==='G'){blade(1.0,.55,1.9,-.35-(fg?.6+sa*.9:sa),'#d7dde3');ci(-1.05,.2,.65,'#7c5a38');ci(-1.05,.2,.2,'#c9a85c')}
 else if(k==='V'){blade(1.0,.55,1.0,-.3-(fg?.5+sa*.8:sa),'#cfd6dc');blade(-1.0,.55,1.0,.3+(fg?.5-sa*.8:-sa),'#cfd6dc')}
 else if(k==='M'){ln(1.15,1.7,1.15,-2.1,'#6b4a2a',.16);const p=fg?.18*Math.sin(t*8):0;ci(1.15,-2.35,.3+p,'#7fe3ff');
  if(fg){const q=(t*1.6)%1;cx.globalAlpha=1-q*.4;ci(1.4+q*3.4,-1.5+q*.4,.26,'#a8ecff');cx.globalAlpha=.3;ci(1.4+q*3.4-.6,-1.5+q*.4,.18,'#a8ecff');cx.globalAlpha=1}}
 else if(k==='R'){cx.strokeStyle='#7a5a30';cx.lineWidth=.14;cx.beginPath();cx.arc(.9,-.1,1.25,-1.0,1.0);cx.stroke();cx.strokeStyle='#e8e0c8';cx.lineWidth=.05;cx.beginPath();cx.moveTo(.9+1.25*Math.cos(-1.0),-.1+1.25*Math.sin(-1.0));cx.lineTo(.9+1.25*Math.cos(1.0),-.1+1.25*Math.sin(1.0));cx.stroke();cx.strokeStyle='rgba(29,35,38,.75)';cx.lineWidth=.12;
  if(fg){const q=(t*1.6)%1,ax=1.4+q*4;ln(ax-.8,-.1,ax,-.1,'#e8e0c8',.1);tri([[ax,-.22],[ax+.3,-.1],[ax,.02]],'#9aa3ad')}}
 else if(np){const x=np.x;
  if(x==='mug'){rc(.85,.1,.5,.6,'#d9b98f',.08);ci(1.42,.4,.16,'#d9b98f');rc(.85,.02,.5,.14,'#f4efe4',.05)}
  else if(x==='hammer'){ln(1.15,1.0,1.15,-.5,'#6b4a2a',.15);rc(.8,-.85,.7,.45,'#888d96',.06)}
  else if(x==='cross'){rc(-.1,-.4,.2,.7,'#c0392b',.03);rc(-.35,-.15,.7,.2,'#c0392b',.03)}
  else if(x==='sack'){ci(1.3,.75,.6,'#b59a6a');rc(1.0,.1,.6,.2,'#8a7448',.05)}
  else if(x==='fork'){ln(1.2,1.6,1.2,-1.8,'#6b4a2a',.14);ln(1.0,-1.8,1.4,-1.8,'#888d96',.12);ln(1.0,-1.8,1.0,-1.3,'#888d96',.1);ln(1.4,-1.8,1.4,-1.3,'#888d96',.1)}
  else if(x==='chain'){cx.strokeStyle='#e2b43c';cx.lineWidth=.14;cx.beginPath();cx.arc(0,-.55,.7,.2,Math.PI-.2);cx.stroke();cx.strokeStyle='rgba(29,35,38,.75)';cx.lineWidth=.12;ci(0,.2,.18,'#e2b43c')}}
 if(fg){const a=Math.abs(Math.sin(t*9));if(k==='G'||k==='V'||hs){cx.strokeStyle=`rgba(255,255,255,${.35+.4*a})`;cx.lineWidth=.22;cx.beginPath();cx.arc(2.5,-.2,1.3,-1.1,1.1);cx.stroke()}
  for(let i=0;i<3;i++){const q=t*7+i*2.1;cx.fillStyle=i%2?'#ffe082':'#fff3c4';cx.beginPath();cx.arc(3.1+Math.cos(q)*.6,-.2+Math.sin(q*1.3)*.7,.11,0,7);cx.fill()}}
 cx.restore()}
const segX=(a,b,c,d)=>{const r=(b[0]-a[0])*(d[1]-c[1])-(b[1]-a[1])*(d[0]-c[0]);if(!r)return false;const t=((c[0]-a[0])*(d[1]-c[1])-(c[1]-a[1])*(d[0]-c[0]))/r,u=((c[0]-a[0])*(b[1]-a[1])-(c[1]-a[1])*(b[0]-a[0]))/r;return t>0&&t<1&&u>0&&u<1};
const zob=zz=>{const w=ZR[zz.n]||ZR['Trône du Roi'],t=ZT[zz.n]||12.5;return{x:zz.x+w[0]*ZS,y:zz.y+(w[1]-t*.25)*ZS,rx:w[2]*ZS*1.15+4,ry:(t*.5+w[3]+2)*ZS}};
function roadOf(z,i,prev,mode){prev=prev||[];
 const q=ZR[z.n]||ZR['Trône du Roi'],ex=z.x+q[0]*ZS,ey=z.y+(q[1]+q[3]*.3)*ZS,dx=ex-T.x,dy=ey-T.y,L=Math.hypot(dx,dy)||1,nx=-dy/L,ny=dx/L;
 const mk=(o1,o2)=>{const P=[[T.x,T.y],[T.x+dx*.33+nx*o1,T.y+dy*.33+ny*o1],[T.x+dx*.66+nx*o2,T.y+dy*.66+ny*o2],[ex,ey]],bz=t=>{const v=1-t;return[v*v*v*P[0][0]+3*v*v*t*P[1][0]+3*v*t*t*P[2][0]+t*t*t*P[3][0],v*v*v*P[0][1]+3*v*v*t*P[1][1]+3*v*t*t*P[2][1]+t*t*t*P[3][1]]};
  const fine=[];for(let k=0;k<=600;k++)fine.push(bz(k/600));
  const out=[fine[0]];let acc=0,nxt=.83;for(let k=1;k<fine.length;k++){const a=fine[k-1],b=fine[k],d=Math.hypot(b[0]-a[0],b[1]-a[1]);acc+=d;while(acc>=nxt){const f=1-(acc-nxt)/(d||1);out.push([a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f]);nxt+=.83}}
  out.push(fine[600]);return out};
 if(mode===-1)return mk(0,0);
 const far=p=>Math.hypot(p[0]-T.x,p[1]-T.y)>32,far2=p=>Math.hypot(p[0]-T.x,p[1]-T.y)>58;
 const score=r=>{let sc2=0;
  for(let a=5;a<r.length;a+=4)if(far(r[a])&&far(r[a-4]))for(const o of prev)for(let b=5;b<o.length;b+=4)if(segX(r[a-4],r[a],o[b-4],o[b]))return -1;
  for(let a=0;a<r.length;a+=3){const p=r[a];if(!far(p))continue;
   for(const zz of ZA){if(zz===z)continue;const o=zob(zz);if(((p[0]-o.x)/(o.rx*.85))**2+((p[1]-o.y)/(o.ry*.85))**2<1)sc2+=3}
   if(far2(p))for(const o of prev)for(let b=0;b<o.length;b+=3)if(far2(o[b])&&Math.hypot(p[0]-o[b][0],p[1]-o[b][1])<5.5)sc2+=1}
  return sc2};
 let best=null,bs=1e9;
 for(let k=0;k<60&&bs>0;k++){const Rr=rng(6100+i*37+k*1009+(mode||0)*7919),s=Rr()<.5?-1:1,m=k<8?1:1.2+k*.03,c=mk(s*(.08+Rr()*.12)*L*m,(k%2?-s:s)*(.04+Rr()*.18)*L*m),v=score(c);if(v>=0&&v<bs){bs=v;best=c}}
 return best||mk(0,0)}
function roadsCross(R){const far=p=>Math.hypot(p[0]-T.x,p[1]-T.y)>32;for(let i=0;i<R.length;i++)for(let j=i+1;j<R.length;j++){const a=R[i],b=R[j];for(let p=1;p<a.length;p++)if(far(a[p])&&far(a[p-1]))for(let q=1;q<b.length;q++)if(segX(a[p-1],a[p],b[q-1],b[q]))return true}return false}
let RIV=[],BRG=[];
const rvW=t=>2.4+2.2*t;
function nearRiver(x,y,m){for(const r of RIV)for(let k=0;k<r.length;k++)if(Math.hypot(x-r[k][0],y-r[k][1])<m+rvW(k/r.length)/2)return true;return false}
function buildRivers(){
 RIV=[];BRG=[];
 const WX=100*MS,WY=130*MS,M=ZA.find(z=>z.n==='Montagne');if(!M)return;
 const obs=ZA.filter(z=>z!==M).map(zob);obs.push({x:T.x,y:T.y,rx:52,ry:44});
 const G=4,NX=Math.ceil(WX/G)+1,NY=Math.ceil(WY/G)+1,blk=new Uint8Array(NX*NY),near=new Uint8Array(NX*NY);
 for(let j=0;j<NY;j++)for(let i=0;i<NX;i++)if(obs.some(o=>((i*G-o.x)/(o.rx*1.06))**2+((j*G-o.y)/(o.ry*1.06))**2<1))blk[j*NX+i]=1;
 const path=(Rr,s0,usedNear,minLen)=>{const noise=new Float32Array(NX*NY);for(let k=0;k<noise.length;k++)noise[k]=Rr()*.9;
  const dist=new Float32Array(NX*NY).fill(1e9),prv=new Int32Array(NX*NY).fill(-1),heap=[[0,s0]];dist[s0]=0;
  const push=e=>{heap.push(e);let k=heap.length-1;while(k>0){const p=(k-1)>>1;if(heap[p][0]<=heap[k][0])break;[heap[p],heap[k]]=[heap[k],heap[p]];k=p}};
  const pop=()=>{const t=heap[0],l=heap.pop();if(heap.length){heap[0]=l;let k=0;for(;;){let a=2*k+1,b=a+1,m=k;if(a<heap.length&&heap[a][0]<heap[m][0])m=a;if(b<heap.length&&heap[b][0]<heap[m][0])m=b;if(m===k)break;[heap[m],heap[k]]=[heap[k],heap[m]];k=m}}return t};
  while(heap.length){const [d,c]=pop();if(d>dist[c])continue;const ci=c%NX,cj=(c/NX)|0;
   for(let dj=-1;dj<=1;dj++)for(let di=-1;di<=1;di++){if(!di&&!dj)continue;const a=ci+di,b=cj+dj;if(a<0||b<0||a>=NX||b>=NY)continue;const n=b*NX+a;if(blk[n]||(usedNear&&near[n]))continue;const nd=d+(di&&dj?1.41:1)*(1+noise[n]);if(nd<dist[n]){dist[n]=nd;prv[n]=c;push([nd,n])}}}
  const ends=[];for(let j=0;j<NY;j++)for(let i=0;i<NX;i++)if((i===0||j===0||i===NX-1||j===NY-1)&&dist[j*NX+i]<1e8&&dist[j*NX+i]>=minLen)ends.push(j*NX+i);
  if(!ends.length)return null;const e=ends[Math.floor(Rr()*ends.length)],cells=[];for(let c=e;c>=0;c=prv[c])cells.push([c%NX*G,((c/NX)|0)*G]);cells.reverse();return cells};
 const smooth=(cells,Rr)=>{let p=cells.slice();for(let it=0;it<2;it++){const q=[p[0]];for(let k=0;k<p.length-1;k++){const a=p[k],b=p[k+1];q.push([a[0]*.75+b[0]*.25,a[1]*.75+b[1]*.25],[a[0]*.25+b[0]*.75,a[1]*.25+b[1]*.75])}q.push(p[p.length-1]);p=q}
  const out=[p[0]];let acc=0;for(let k=1;k<p.length;k++){const a=p[k-1],b=p[k],d=Math.hypot(b[0]-a[0],b[1]-a[1]);acc+=d;if(acc>=2.5){out.push(b);acc=0}}out.push(p[p.length-1]);
  const e=out[out.length-1],pe=out[out.length-2]||e,l=Math.hypot(e[0]-pe[0],e[1]-pe[1])||1;out.push([e[0]+(e[0]-pe[0])/l*8,e[1]+(e[1]-pe[1])/l*8]);
  for(const am of[2.4,1.4,0]){const ph=Rr()*6.28,fq=.16+Rr()*.08,r=out.map((q,k)=>{if(k===0||k>=out.length-2)return q;const a=out[k-1],b=out[k+1],tx=b[0]-a[0],ty=b[1]-a[1],tl=Math.hypot(tx,ty)||1,o=Math.sin(k*fq+ph)*am;return[q[0]-ty/tl*o,q[1]+tx/tl*o]});
   if(r.every(q=>!obs.some(o=>((q[0]-o.x)/o.rx)**2+((q[1]-o.y)/o.ry)**2<1.0)))return r}
  return out};
 const src=[[M.x+4,M.y-3],[M.x-6,M.y+2]];
 for(let ri=0;ri<2;ri++){const Rr=rng(8800+ri*131+((M.x*7+M.y*13)|0)),sx=Math.round(src[ri][0]/G),sy=Math.round(src[ri][1]/G);
  let r=null;
  for(let at=0;at<8&&!r;at++){const cells=path(Rr,sy*NX+sx,0,Math.max(0,(ri?70:90)-at*12));if(!cells)continue;let q=smooth(cells,Rr);
   if(ri&&RIV[0]){const A=RIV[0];let cut=-1,pt=null;
    for(let i=1;i<q.length&&cut<0;i++)for(let j=1;j<A.length;j++)if(segX(q[i-1],q[i],A[j-1],A[j])){cut=i;const a=q[i-1],b=q[i],c=A[j-1],d=A[j],t=((c[0]-a[0])*(d[1]-c[1])-(c[1]-a[1])*(d[0]-c[0]))/((b[0]-a[0])*(d[1]-c[1])-(b[1]-a[1])*(d[0]-c[0]));pt=[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];break}
    if(cut>0){q=q.slice(0,cut);q.push(pt)}}
   if(q.length>=(at<5?12:6))r=q}
  if(r)RIV.push(r)}
 for(const z of ZA){const d=RD[z.n];if(!d)continue;
  for(const r of RIV)for(let a=1;a<d.length;a++){let hit=-1;for(let b=1;b<r.length;b++)if(segX(d[a-1],d[a],r[b-1],r[b])){hit=b;break}
   if(hit<0)continue;const A=d[a-1],B=d[a],C=r[hit-1],D=r[hit],t=((C[0]-A[0])*(D[1]-C[1])-(C[1]-A[1])*(D[0]-C[0]))/((B[0]-A[0])*(D[1]-C[1])-(B[1]-A[1])*(D[0]-C[0])),px=A[0]+(B[0]-A[0])*t,py=A[1]+(B[1]-A[1])*t;
   if(BRG.some(q=>Math.hypot(q.x-px,q.y-py)<9))continue;
   const P0=d[Math.max(0,a-3)],P1=d[Math.min(d.length-1,a+3)],ra=Math.atan2(P1[1]-P0[1],P1[0]-P0[0]),Q0=r[Math.max(0,hit-2)],Q1=r[Math.min(r.length-1,hit+2)],va=Math.atan2(Q1[1]-Q0[1],Q1[0]-Q0[0]),w=rvW(hit/r.length),sn2=Math.max(.45,Math.abs(Math.sin(ra-va)));
   BRG.push({x:px,y:py,a:ra,l:Math.min(16,w/sn2+4)})}}}
function drawRivers(g){for(const r of RIV){const n=r.length,st=(w,c,al)=>{g.strokeStyle=c;g.globalAlpha=al;g.lineCap='round';g.lineJoin='round';for(let k=1;k<n;k++){g.lineWidth=rvW(k/n)*w*sc;g.beginPath();g.moveTo(r[k-1][0]*sc,r[k-1][1]*sc);g.lineTo(r[k][0]*sc,r[k][1]*sc);g.stroke()}g.globalAlpha=1};
  st(1.6,'#cdbd8f',.9);st(1.12,'#3f7fa8',1);st(.6,'#6aa6c9',.65);
  g.strokeStyle='rgba(255,255,255,.55)';g.lineWidth=Math.max(.8,sc*.14);for(let k=4;k<n-1;k+=5){const a=r[k],b=r[k+1],dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy)||1;g.beginPath();g.moveTo(a[0]*sc-dx/l*sc*.6,a[1]*sc-dy/l*sc*.6);g.lineTo(a[0]*sc+dx/l*sc*.6,a[1]*sc+dy/l*sc*.6);g.stroke()}}}
function drawBridges(g){const u=sc;for(const b of BRG){g.save();g.translate(b.x*u,b.y*u);g.rotate(b.a);const L=b.l*u,Wd=3.8*u;
  g.fillStyle='rgba(20,30,10,.3)';g.fillRect(-L/2+.3*u,-Wd/2+.6*u,L,Wd);
  g.fillStyle='#a07a4a';g.fillRect(-L/2,-Wd/2,L,Wd);
  g.strokeStyle='#6b4e30';g.lineWidth=Math.max(.8,u*.16);for(let x=-L/2+u*.7;x<L/2;x+=u*.7){g.beginPath();g.moveTo(x,-Wd/2);g.lineTo(x,Wd/2);g.stroke()}
  g.fillStyle='#5a3a22';g.fillRect(-L/2,-Wd/2-.5*u,L,.55*u);g.fillRect(-L/2,Wd/2-.05*u,L,.55*u);
  for(const x of[-L/2,0,L/2])for(const y of[-Wd/2-.3*u,Wd/2+.3*u]){g.fillStyle='#4a2f1b';g.fillRect(x-.25*u,y-.5*u,.5*u,1*u)}
  g.restore()}}
function roadWP(z){const d=RD[z.n];if(!d)return[];let i=0;while(i<d.length-1&&((d[i][0]-T.x)/VR.rx)**2+((d[i][1]-T.y)/VR.ry)**2<1.15)i++;const w=[];for(let k=i;k<d.length;k+=12)w.push(d[k]);const l=d[d.length-1];if(w[w.length-1]!==l)w.push(l);return w.map(p=>({x:Math.round(p[0]*10)/10,y:Math.round(p[1]*10)/10}))}
const plen=(h,tg)=>{let L=0,x=h.x,y=h.y;for(const w of h.wp||[]){L+=Math.hypot(w.x-x,w.y-y);x=w.x;y=w.y}return L+Math.hypot(tg.x-x,tg.y-y)};
const VC={c:null,k:'',pr:[]};
function cobble(g,x,y,rx,ry,R){const s=sc,C=['#a39e8e','#b3ae9d','#98937f','#aca694'],n=Math.floor(ry/(s*.9));
 g.fillStyle='rgba(95,85,65,.55)';g.beginPath();g.ellipse(x,y,rx,ry,0,0,7);g.fill();
 for(let j=-n;j<=n;j++){const yy=y+j*s*.9,hf=rx*Math.sqrt(Math.max(0,1-((yy-y)/ry)**2));
  for(let xx=x-hf+((j&1)?s*.7:0);xx<x+hf-s*1.2;xx+=s*1.4){g.fillStyle=C[Math.floor(R()*4)];g.beginPath();g.roundRect(xx,yy-s*.38,s*1.2,s*.76,s*.25);g.fill()}}}
function well(g,x,y){const u=sc;
 g.fillStyle='rgba(20,30,10,.25)';g.beginPath();g.ellipse(x+u*.5,y+u*1.5,u*2.4,u*.8,0,0,7);g.fill();
 g.strokeStyle='rgba(29,35,38,.6)';g.lineWidth=1;g.fillStyle='#a8a395';g.fillRect(x-1.7*u,y,3.4*u,1.2*u);g.beginPath();g.ellipse(x,y+1.2*u,1.7*u,.8*u,0,0,Math.PI);g.fill();
 g.fillStyle='#c3beaf';g.beginPath();g.ellipse(x,y,1.7*u,.8*u,0,0,7);g.fill();g.stroke();
 g.fillStyle='#4d7fa3';g.beginPath();g.ellipse(x,y,1.2*u,.55*u,0,0,7);g.fill();
 g.fillStyle='#6b4e30';g.fillRect(x-1.6*u,y-2.6*u,.45*u,2.9*u);g.fillRect(x+1.15*u,y-2.6*u,.45*u,2.9*u);
 g.strokeStyle='#3a2a20';g.beginPath();g.moveTo(x,y-3.2*u);g.lineTo(x,y-.6*u);g.stroke();
 POLY(g,[[x-2.4*u,y-2.4*u],[x,y-4.3*u],[x+2.4*u,y-2.4*u]],'#7a3d2e')}
function prop(q){const u=sc,x=q.x*u,y=q.y*u;cx.fillStyle='rgba(20,30,10,.25)';cx.beginPath();cx.ellipse(x+u*.2,y+u*.5,u*.8,u*.3,0,0,7);cx.fill();cx.lineWidth=1;cx.strokeStyle='rgba(29,35,38,.65)';
 if(q.t==='b'){cx.fillStyle='#8a5a2e';cx.fillRect(x-.55*u,y-1.3*u,1.1*u,1.5*u);cx.strokeRect(x-.55*u,y-1.3*u,1.1*u,1.5*u);cx.fillStyle='#5a3a22';cx.fillRect(x-.55*u,y-.9*u,1.1*u,.15*u);cx.fillRect(x-.55*u,y-.3*u,1.1*u,.15*u);cx.fillStyle='#b98a52';cx.beginPath();cx.ellipse(x,y-1.3*u,.55*u,.22*u,0,0,7);cx.fill();cx.stroke()}
 else{cx.fillStyle='#b08850';cx.fillRect(x-.7*u,y-1.2*u,1.4*u,1.4*u);cx.strokeRect(x-.7*u,y-1.2*u,1.4*u,1.4*u);cx.strokeStyle='#7a5a30';cx.beginPath();cx.moveTo(x-.7*u,y-1.2*u);cx.lineTo(x+.7*u,y+.2*u);cx.moveTo(x+.7*u,y-1.2*u);cx.lineTo(x-.7*u,y+.2*u);cx.stroke()}}
function buildVillage(u,rx,ry,x0,y0,w,h,CS){
 const c=VC.c||(VC.c=document.createElement('canvas'));c.width=Math.ceil(w*CS);c.height=Math.ceil(h*CS);
 const g=c.getContext('2d');g.setTransform(CS,0,0,CS,-x0*CS,-y0*CS);const R=rng(4242),px=T.x*sc,py=T.y*sc,s=sc;
 const rr=t=>1+.035*Math.sin(3*t+1.3)+.03*Math.sin(5*t+.4);
 const blob=f=>{g.beginPath();for(let i=0;i<=72;i++){const t=i/72*6.2832,r=rr(t)*f,x=px+Math.cos(t)*rx*r*s,y=py+Math.sin(t)*ry*r*s;i?g.lineTo(x,y):g.moveTo(x,y)}g.closePath()};
 const cr=ZA.map(z=>{const d=RD[z.n];for(const p of d)if(((p[0]-T.x)/rx)**2+((p[1]-T.y)/ry)**2>.94)return p;return d[d.length-1]});
 const inGap=(x,y,m)=>cr.some(p=>Math.hypot(x-p[0],y-p[1])<m);
 blob(1.1);g.fillStyle='rgba(120,110,70,.28)';g.fill();
 blob(1);g.fillStyle='#c9b88c';g.fill();
 g.save();blob(1);g.clip();
 for(let i=0;i<14;i++){const a=R()*6.283,r=Math.sqrt(R())*.9,q=(4+R()*7)*s;g.fillStyle=R()<.5?'rgba(150,125,80,.16)':'rgba(240,225,180,.2)';g.beginPath();g.ellipse(px+Math.cos(a)*rx*r*s,py+Math.sin(a)*ry*r*s,q,q*.6,0,0,7);g.fill()}
 for(let i=0,N=Math.round(rx*ry*.5);i<N;i++){const a=R()*6.283,r=Math.sqrt(R());g.fillStyle=R()<.5?'rgba(110,90,55,.35)':'rgba(235,220,175,.5)';g.fillRect(px+Math.cos(a)*rx*r*s,py+Math.sin(a)*ry*r*s,s*.22,s*.16)}
 const net=vnet();if(net)drawNet(g,net,s);
 for(const [p,e,it] of u){const m=it.i===0;cobble(g,(T.x+p[0])*s,(T.y+p[1]+3.4+(m?1:0))*s,(m?12:4.6)*s,(m?4.6:1.9)*s,R)}
 g.restore();
 blob(1);g.strokeStyle='rgba(70,58,35,.5)';g.lineWidth=1.2;g.stroke();
 VC.pr=[];
 for(const [p,e,it] of u){const k=NK[e]||'H',hw=k==='V'?4.2:k==='E'?3.8:k==='A'?4.4:3.2,bx=T.x+p[0],by=T.y+p[1],RR=rng(900+it.i),sd=RR()<.5?-1:1;
  for(const q of[-1,1])for(let j=0;j<3;j++){const x=(bx+q*(hw+.6+RR()*1.3))*s,y=(by+.8+RR()*1.8)*s;tuft(g,x,y,s*(.7+RR()*.5),RR()<.5?'#5f8450':'#7fa468');if(RR()<.25){g.fillStyle=['#fff8e1','#ffe082','#f8bbd0'][j];g.beginPath();g.arc(x+s*.4,y-s*.2,s*.25,0,7);g.fill()}}
  if(it.i===0||(k==='H'&&RR()<.6))continue;
  VC.pr.push({x:bx+sd*(hw+.9),y:by+2.2,t:(k==='F'||k==='M'||RR()<.3)?'c':'b'});if(k==='T')VC.pr.push({x:bx-sd*(hw+.9),y:by+2.2,t:'b'})}
 let wl=null,bc=-1;const rects=u.map(([p,e])=>{const x=T.x+p[0],y=T.y+p[1];return[x-5.4,y-(e===NE.A?8.5:6.5),x+5.4,y+5]});
 for(const f of[.62,.72])for(let j=0;j<16;j++){const a=j/16*6.2832+.2,x=T.x+Math.cos(a)*rx*f,y=T.y+Math.sin(a)*ry*f;if(inGap(x,y,9)||(net&&net.pts.some(c=>Math.hypot(c[0]-x,c[1]-y)<3)))continue;
  const d=Math.min(...rects.map(([a1,b1,a2,b2])=>Math.hypot(Math.max(a1-x,0,x-a2),Math.max(b1-y,0,y-b2))));if(d>bc){bc=d;wl=[x,y]}}
 if(wl&&bc>=3)well(g,wl[0]*s,wl[1]*s);
 const pts=[];{let acc=9,pr=null;for(let i=0;i<=720;i++){const a=i/720*6.2832,r=rr(a)*.97,x=T.x+Math.cos(a)*rx*r,y=T.y+Math.sin(a)*ry*r;if(pr)acc+=Math.hypot(x-pr[0],y-pr[1]);if(acc>=1.5){pts.push([x,y]);acc=0}pr=[x,y]}}
 const B2=S.pl.length-2,rk=B2<4?0:B2<9?1:B2<16?2:3,n=pts.length,bs=[];for(let i=0;i<Math.ceil(n/9)+1;i++)bs.push(R()<.3?1:0);const gp=pts.map(q=>inGap(q[0],q[1],6)),it=[];
 for(let k=0;k<n;k++){if(gp[k]||rk===0)continue;const A=pts[k],B=pts[(k+1)%n],pv=gp[(k+n-1)%n],nx=gp[(k+1)%n],st=rk>=2?1:0,x=A[0]*s,y=A[1]*s,x2=B[0]*s,y2=B[1]*s;
  it.push([y,()=>{g.lineWidth=1;g.strokeStyle='rgba(29,35,38,.55)';
   if((pv||nx)&&rk>=3){g.fillStyle='#8f8a7d';g.fillRect(x-1.3*s,y-4.8*s,2.6*s,4.8*s);g.strokeRect(x-1.3*s,y-4.8*s,2.6*s,4.8*s);g.fillStyle='#b3ae9f';for(const q of[-1,0,1])g.fillRect(x+q*.95*s-.3*s,y-5.4*s,.6*s,.6*s);return}
   if(pv||nx){g.fillStyle='#8f8a7d';g.fillRect(x-.6*s,y-3.2*s,1.2*s,3.2*s);g.strokeRect(x-.6*s,y-3.2*s,1.2*s,3.2*s);g.fillStyle='#b3ae9f';g.fillRect(x-.8*s,y-3.6*s,1.6*s,.5*s);return}
   if(st){const H=(rk>=3?2.6:1.5)*s;if(!nx){POLY(g,[[x,y],[x2,y2],[x2,y2-H],[x,y-H]],k%2?'#a9a597':'#98948a');g.beginPath();g.moveTo(x,y-H);g.lineTo(x2,y2-H);g.strokeStyle='#cfcabb';g.stroke()}
    if(rk>=3){g.strokeStyle='rgba(29,35,38,.55)';g.fillStyle='#a9a597';g.fillRect(x-.3*s,y-H-.5*s,.7*s,.5*s);g.strokeRect(x-.3*s,y-H-.5*s,.7*s,.5*s);if(k%7===3){g.fillStyle='#8f8a7d';g.fillRect(x-1.1*s,y-H-1.1*s,2.2*s,H+1.1*s);g.strokeRect(x-1.1*s,y-H-1.1*s,2.2*s,H+1.1*s);g.fillStyle='#b3ae9f';for(const q of[-.8,0,.8])g.fillRect(x+q*s-.3*s,y-H-1.7*s,.6*s,.6*s)}}}
   else{g.fillStyle='#8a6a42';g.beginPath();g.moveTo(x-.28*s,y);g.lineTo(x-.28*s,y-1.8*s);g.lineTo(x,y-2.3*s);g.lineTo(x+.28*s,y-1.8*s);g.lineTo(x+.28*s,y);g.fill();g.fillStyle='rgba(0,0,0,.2)';g.fillRect(x,y-2*s,.28*s,2*s);
    if(!nx){g.strokeStyle='#6b4e30';g.lineWidth=.35*s;g.beginPath();g.moveTo(x,y-.7*s);g.lineTo(x2,y2-.7*s);g.moveTo(x,y-1.4*s);g.lineTo(x2,y2-1.4*s);g.stroke()}}}])}
 it.sort((a,b)=>a[0]-b[0]).forEach(a=>a[1]());
 for(let k=0;k<n;k+=1){const a=pts[k],o=Math.hypot(a[0]-T.x,a[1]-T.y);if(gp[k]||inGap(a[0],a[1],4.5))continue;const dx=(a[0]-T.x)/o,dy=(a[1]-T.y)/o,d=1.2+R()*2;tuft(g,(a[0]+dx*d)*s,(a[1]+dy*d)*s,s*(.8+R()*.5),R()<.5?'#5f8450':'#a9c98f')}
}
function villageGround(u,rx,ry){
 const k=[W,rx.toFixed(1),ry.toFixed(1),u.map(a=>a[2].i+a[1]).join(','),JSON.stringify(S.zp)].join('|'),pad=8,x0=(T.x-rx-pad)*sc,y0=(T.y-ry-pad)*sc,w=(2*rx+2*pad)*sc,h=(2*ry+2*pad)*sc,CS=Math.min(3,2400/Math.max(w,h));
 if(VC.k!==k){VC.k=k;buildVillage(u,rx,ry,x0,y0,w,h,CS)}
 cx.drawImage(VC.c,x0,y0,w,h)}
const rng=a=>()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const GC={c:null,k:''};let ROAD=[],ROADL=[];
function tuft(g,x,y,s,col){g.strokeStyle=col;g.lineWidth=Math.max(.7,s*.18);g.beginPath();g.moveTo(x,y);g.lineTo(x-s*.5,y-s);g.moveTo(x,y);g.lineTo(x+s*.1,y-s*1.2);g.moveTo(x,y);g.lineTo(x+s*.55,y-s*.9);g.stroke()}
function buildGround(){
 const WW=W*MS,WH=H*MS,CS=Math.min(2,4096/Math.max(WW,WH)),c=GC.c||(GC.c=document.createElement('canvas'));c.width=Math.round(WW*CS);c.height=Math.round(WH*CS);
 const g=c.getContext('2d');g.setTransform(CS,0,0,CS,0,0);const R=rng(1234);
 const gr=g.createLinearGradient(0,0,0,WH);gr.addColorStop(0,'#86a772');gr.addColorStop(1,'#9bba84');g.fillStyle=gr;g.fillRect(0,0,WW,WH);
 for(let i=0;i<24*MS*MS;i++){const x=R()*WW,y=R()*WH,r=(14+R()*26)*sc,lt=R()<.5,q=g.createRadialGradient(x,y,0,x,y,r);q.addColorStop(0,lt?'rgba(255,255,210,.12)':'rgba(25,55,30,.12)');q.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=q;g.fillRect(x-r,y-r,2*r,2*r)}
 for(let i=0;i<380*MS*MS;i++)tuft(g,R()*WW,R()*WH,sc*(.7+R()*.7),R()<.5?'#6f9360':'#a9c98f');
 for(let i=0;i<110*MS*MS;i++){const x=R()*WW,y=R()*WH;g.fillStyle=['#fff8e1','#ffe082','#f8bbd0','#ce93d8'][Math.floor(R()*4)];g.beginPath();g.arc(x,y,sc*.28,0,7);g.fill()}
 for(let i=0;i<70*MS*MS;i++){const x=R()*WW,y=R()*WH;g.fillStyle=R()<.5?'#8d8f86':'#a6a79c';g.beginPath();g.ellipse(x,y,sc*(.35+R()*.4),sc*(.22+R()*.2),0,0,7);g.fill()}
 drawRivers(g);ROAD=[];ROADL=[];const RL=rng(777);const wet=(x,y)=>nearRiver(x,y,.3);
 ZA.forEach(z=>{
  const pts=RD[z.n];
  ROAD.push(pts);for(let k=14;k<pts.length-4;k+=22){const a=pts[k-1],b=pts[k+1],tx=b[0]-a[0],ty=b[1]-a[1],l=Math.hypot(tx,ty)||1,sd=RL()<.5?-1:1;ROADL.push([pts[k][0]-ty/l*2.8*sd,pts[k][1]+tx/l*2.8*sd])}
  for(const [x,y] of pts){if(wet(x,y))continue;g.fillStyle='#6b5838';g.beginPath();g.arc(x*sc,y*sc,sc*(1.85+R()*.45),0,7);g.fill()}
  for(const [x,y] of pts){if(wet(x,y))continue;g.fillStyle='#b99c6b';g.beginPath();g.arc(x*sc,y*sc,sc*(1.35+R()*.3),0,7);g.fill()}
  pts.forEach(([x,y],k)=>{if(wet(x,y))return;
   if(k%2===0){g.fillStyle='rgba(224,205,150,.55)';g.beginPath();g.arc(x*sc,y*sc,sc*(.55+R()*.25),0,7);g.fill()}
   if(k%5===0){const s=R()<.5?-1:1;g.fillStyle='#7d786b';g.beginPath();g.ellipse((x+s*(.5+R()*.8))*sc,(y+(R()-.5)*1.6)*sc,sc*.32,sc*.2,0,0,7);g.fill()}
   if(k%4===0){const s=R()<.5?-1:1;tuft(g,(x+s*(2.1+R()*.6))*sc,(y+R()*1.2)*sc,sc*(.8+R()*.5),'#5f8450')}})
 })
 drawBridges(g);ROADL=ROADL.filter(p=>!nearRiver(p[0],p[1],5));
 ZA.forEach((z,i)=>{g.save();g.translate(z.x*sc,z.y*sc);g.scale(ZS,ZS);g.translate(-z.x*sc,-z.y*sc);scene(g,z,z.vi||0,R);g.restore()})
}
const POLY=(g,a,c)=>{g.fillStyle=c;g.beginPath();a.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.closePath();g.fill()};
function tree(g,x,y,s,p){g.fillStyle='rgba(20,30,10,.28)';g.beginPath();g.ellipse(x+s*.25,y+s*.95,s*.95,s*.32,0,0,7);g.fill();
 g.fillStyle='#5b3f26';g.fillRect(x-s*.13,y-s*.1,s*.26,s*.95);
 [[0,.22,.95,p[0]],[-.1,-.2,.8,p[1]],[.05,-.55,.6,p[2]]].forEach(([dx,dy,r,c])=>{g.fillStyle=c;g.beginPath();g.arc(x+dx*s,y+dy*s,r*s*.62,0,7);g.fill()});
 g.fillStyle='rgba(255,255,200,.18)';g.beginPath();g.arc(x-s*.18,y-s*.62,s*.26,0,7);g.fill()}
function rock(g,x,y,s,c,R){const pts=[];for(let i=0;i<7;i++){const a=i/7*6.283,r=s*(.8+R()*.4);pts.push([x+Math.cos(a)*r,y+Math.sin(a)*r*.75])}
 g.fillStyle='rgba(20,30,10,.25)';g.beginPath();g.ellipse(x+s*.2,y+s*.55,s*1.05,s*.35,0,0,7);g.fill();
 POLY(g,pts,c);POLY(g,[pts[5],pts[6],pts[0],[x,y]],'rgba(255,255,255,.22)');g.strokeStyle='rgba(0,0,0,.3)';g.lineWidth=1;g.beginPath();pts.forEach(([a,b],i)=>i?g.lineTo(a,b):g.moveTo(a,b));g.closePath();g.stroke()}
function scene(g,z,vi,R){
 const u=sc,x=z.x*u,y=z.y*u,sh=()=>{g.fillStyle='rgba(20,30,10,.28)';g.beginPath();g.ellipse(x,y+4.2*u,8*u,2.2*u,0,0,7);g.fill()};
 if(z.boss){const q=g.createRadialGradient(x,y,0,x,y,11*u);q.addColorStop(0,'rgba(200,30,30,.5)');q.addColorStop(1,'rgba(200,30,30,0)');g.fillStyle=q;g.fillRect(x-11*u,y-11*u,22*u,22*u);sh();
  g.fillStyle='#1d1418';g.fillRect(x-1.8*u,y-8*u,3.6*u,12*u);g.fillRect(x-6*u,y-3*u,3*u,7*u);g.fillRect(x+3*u,y-3*u,3*u,7*u);
  [-6,-3.4,3,5.6].forEach(a=>POLY(g,[[x+a*u,y-3*u],[x+(a+1.3)*u,y-6.5*u],[x+(a+2.6)*u,y-3*u]],'#2a1b20'));POLY(g,[[x-1.8*u,y-8*u],[x,y-12*u],[x+1.8*u,y-8*u]],'#2a1b20');
  g.fillStyle='#ff3b30';g.fillRect(x-.5*u,y-5.5*u,u,1.3*u);g.fillRect(x-4.7*u,y-.5*u,.8*u,1.1*u);g.fillRect(x+3.9*u,y-.5*u,.8*u,1.1*u);
  g.fillStyle='#0c0709';g.beginPath();g.arc(x,y+2.4*u,1.5*u,Math.PI,0);g.lineTo(x+1.5*u,y+4*u);g.lineTo(x-1.5*u,y+4*u);g.fill()}
 else if(z.n==='Forêt'){const P=[['#4a8a44','#5aa253','#74bb66'],['#33703c','#418649','#56a05d'],['#2d3d45','#3a5257','#566e72']][vi],T=[];
  for(let i=0;i<150+vi*25;i++){const a=R()*6.283,r=Math.sqrt(R())*15.3;T.push([x+Math.cos(a)*r*1.2*u,y+Math.sin(a)*r*.8*u,(2.6+R()*1.1)*.75*u])}
  T.sort((a,b)=>a[1]-b[1]).forEach(([a,b,s])=>tree(g,a,b,s,P))}
 else if(z.n==='Mine'){const c=['#8a8f96','#737881','#585d66'][vi];sh();
  const hill=(ox,k,en)=>{g.save();g.translate(x+ox*u,y+(1-k)*4*u);g.scale(k,k);g.translate(-x,-y);
   POLY(g,[[x-8*u,y+4*u],[x-6*u,y-u],[x-2.5*u,y-4.5*u],[x+2*u,y-5*u],[x+6*u,y-1.5*u],[x+8*u,y+4*u]],c);
   POLY(g,[[x+2*u,y-5*u],[x+6*u,y-1.5*u],[x+8*u,y+4*u],[x+u,y+4*u]],'rgba(0,0,0,.22)');
   if(en){g.fillStyle='#17120e';g.beginPath();g.arc(x,y+1.6*u,2.7*u,Math.PI,0);g.lineTo(x+2.7*u,y+4*u);g.lineTo(x-2.7*u,y+4*u);g.closePath();g.fill();
    g.fillStyle='#7a5530';g.fillRect(x-3.3*u,y-1.2*u,.8*u,5.2*u);g.fillRect(x+2.5*u,y-1.2*u,.8*u,5.2*u);g.fillRect(x-3.5*u,y-1.8*u,7*u,.9*u)}
   g.restore()};
  hill(-12.5,.62,0);hill(12.5,.7,0);hill(-6.5,.5,0);hill(0,1,1);
  for(let i=0;i<18;i++)rock(g,x+(R()-.5)*32*u,y+(4+R()*2.4)*u,(.9+R()*.9)*u,c,R)}
 else if(z.n==='Montagne'){const c=['#98a3b5','#8591a7','#6a7488'][vi];sh();
  [[-14,3.2,4.4],[-10,1,6],[-6,2.6,5],[-1.5,-1.6,8],[3.2,1.4,6.6],[7.2,3,5],[10.8,.6,6.8],[14.2,3.2,4.6],[0,3.6,4]].sort((p,q)=>p[1]-q[1]).forEach(([a,b,s])=>{const px=x+a*u,py=y+b*u;POLY(g,[[px-s*u,py+3*u],[px,py-s*u],[px+.2*u,py+3*u]],c);POLY(g,[[px,py-s*u],[px+s*u,py+3*u],[px+.2*u,py+3*u]],'rgba(20,25,45,.32)');POLY(g,[[px-s*.32*u,py-s*.68*u],[px,py-s*u],[px+s*.3*u,py-s*.7*u],[px+s*.1*u,py-s*.55*u],[px-s*.1*u,py-s*.65*u]],'#f4f8ff')});
  for(let i=0;i<13;i++)tree(g,x+(-15+i*2.5+(R()-.5)*1.4)*u,y+(4.2+R()*1.6)*u,(1.7+R()*.5)*u,['#2f5a45','#3a6f55','#4a8566'])}
 else if(z.n==='Ruines'){const c=['#bdae93','#a3967e','#7f776a'][vi];sh();
  for(let i=0;i<40;i++){g.fillStyle=c;g.fillRect(x+(R()-.5)*28*u,y+(1.5+R()*3.5)*u,(1+R()*1.4)*u,(.7+R()*.8)*u)}
  for(let i=0;i<6;i++){const wx=x+(R()-.5)*26*u,wy=y+(2+R()*2.4)*u,ww=(3+R()*4)*u;g.fillStyle=c;g.fillRect(wx,wy,ww,.9*u);g.fillStyle='rgba(255,255,255,.18)';g.fillRect(wx,wy,ww,.3*u)}
  const pl=[];for(let i=0;i<15;i++)pl.push([(R()-.5)*27,(R()-.5)*4.6,3+R()*4.6,R()<.4?1:0]);
  pl.sort((p,q)=>p[1]-q[1]).forEach(([a,b,hh,br])=>{const px=x+a*u,py=y+b*u,t=py-hh*u+4*u;g.fillStyle=c;g.fillRect(px-.9*u,t,1.8*u,hh*u);g.fillStyle='rgba(255,255,255,.2)';g.fillRect(px-.9*u,t,.6*u,hh*u);if(!br){g.fillStyle=c;g.fillRect(px-1.3*u,t-.6*u,2.6*u,.8*u)}else POLY(g,[[px-.9*u,t],[px-.2*u,t-u],[px+.3*u,t-.2*u],[px+.9*u,t-.9*u],[px+.9*u,t]],c)});
  g.strokeStyle=c;g.lineWidth=1.1*u;for(let i=0;i<4;i++){g.beginPath();g.arc(x+(-12+i*8+(R()-.5)*3)*u,y+1.5*u,2.4*u,Math.PI,Math.PI*1.65);g.stroke()}
  g.fillStyle='rgba(90,140,70,.5)';for(let i=0;i<12;i++){g.beginPath();g.ellipse(x+(R()-.5)*28*u,y+(2+R()*2.4)*u,1.3*u,.5*u,0,0,7);g.fill()}}
 else if(z.n==='Donjon'){const c=['#80746b','#675c58','#4b4147'][vi];sh();
  g.fillStyle=c;g.fillRect(x-3.5*u,y-6*u,6*u,10*u);g.fillRect(x+2.5*u,y-3*u,4*u,7*u);
  for(let i=0;i<4;i++)g.fillRect(x-3.5*u+i*1.6*u,y-7.2*u,u,1.4*u);
  POLY(g,[[x+2.2*u,y-3*u],[x+4.5*u,y-6.5*u],[x+6.8*u,y-3*u]],'#7a2f2f');
  g.fillStyle='rgba(0,0,0,.22)';g.fillRect(x+.5*u,y-6*u,2*u,10*u);
  g.fillStyle='#1a1215';g.beginPath();g.arc(x-.5*u,y+2*u,1.4*u,Math.PI,0);g.lineTo(x+.9*u,y+4*u);g.lineTo(x-1.9*u,y+4*u);g.fill();
  g.fillStyle='#ffd066';g.fillRect(x-1.8*u,y-3.5*u,.8*u,1.3*u);g.fillRect(x+4*u,y-.8*u,.7*u,1.1*u);
  g.strokeStyle='#3a2a20';g.lineWidth=.5*u;g.beginPath();g.moveTo(x-.5*u,y-7.2*u);g.lineTo(x-.5*u,y-10*u);g.stroke();POLY(g,[[x-.5*u,y-10*u],[x+2*u,y-9.2*u],[x-.5*u,y-8.4*u]],'#a02828')}
 else if(z.n==='Volcan'){const c=['#5a4540','#4a3834','#35272a'][vi];sh();
  [-9.8,10].forEach((ox,i)=>{const h=i?5.8:5,X=x+ox*u;POLY(g,[[X-5.4*u,y+4*u],[X-1.5*u,y-h*u+4*u],[X+1.5*u,y-h*u+4*u],[X+5.4*u,y+4*u]],c);POLY(g,[[X+1.5*u,y-h*u+4*u],[X+5.4*u,y+4*u],[X+.3*u,y+4*u]],'rgba(0,0,0,.28)');g.fillStyle='#ff7a22';g.beginPath();g.ellipse(X,y-h*u+4*u,1.5*u,.5*u,0,0,7);g.fill()});
  for(let i=0;i<7;i++){const lx=x+(R()-.5)*26*u,ly=y+(2.8+R()*1.8)*u,lr=(.9+R()*.9)*u;g.fillStyle='#ff7a22';g.beginPath();g.ellipse(lx,ly,lr,lr*.38,0,0,7);g.fill();g.fillStyle='#ffd066';g.beginPath();g.ellipse(lx,ly,lr*.5,lr*.18,0,0,7);g.fill()}
  for(let i=0;i<9;i++)rock(g,x+(R()-.5)*30*u,y+(3.4+R()*2)*u,(.8+R()*.8)*u,c,R)
  POLY(g,[[x-8*u,y+4*u],[x-2.2*u,y-5*u],[x+2.2*u,y-5*u],[x+8*u,y+4*u]],c);POLY(g,[[x+2.2*u,y-5*u],[x+8*u,y+4*u],[x+u,y+4*u]],'rgba(0,0,0,.28)');
  const q=g.createRadialGradient(x,y-5*u,0,x,y-5*u,4.5*u);q.addColorStop(0,'rgba(255,170,60,.95)');q.addColorStop(1,'rgba(255,90,20,0)');g.fillStyle=q;g.fillRect(x-5*u,y-10*u,10*u,10*u);
  g.strokeStyle='#ff7a22';g.lineWidth=.8*u;[[-1,.5],[1,2.6]].forEach(([a,b])=>{g.beginPath();g.moveTo(x+a*u,y-4.6*u);g.lineTo(x+(a*2.2+b)*u,y);g.lineTo(x+(a*3.2+b)*u,y+3.6*u);g.stroke()});
  g.fillStyle='rgba(90,90,95,.38)';[[0,-8,2],[1.5,-10.2,2.4],[-.5,-12,2.8]].forEach(([a,b,r])=>{g.beginPath();g.arc(x+a*u,y+b*u,r*u,0,7);g.fill()})}
}
function shp(c,x,y,r){cx.beginPath();const n={G:4,V:3,M:4,R:6}[c],o={G:Math.PI/4,V:-Math.PI/2,M:0,R:0}[c];for(let i=0;i<n;i++){const a=o+i*2*Math.PI/n,px=x+r*Math.cos(a),py=y+r*Math.sin(a);i?cx.lineTo(px,py):cx.moveTo(px,py)}cx.closePath()}
function draw(){
 if(fol!=null){const q=S.hero.find(z=>z.id===fol);if(q){cam.x=W/2-(q.x*sc+((q.id%3)-1)*sc*1.5)*cam.z;cam.y=H/2-(q.y*sc+((q.id%2)-.5)*sc*2)*cam.z;clampCam()}else fol=null}
 cx.save();cx.translate(cam.x,cam.y);cx.scale(cam.z,cam.z);cx.fillStyle='#8fae7a';cx.fillRect(-W*3,-H*3,W*7,H*7);
 if(W>0){const k=W+JSON.stringify(S.zp)+S.zv.join('');if(GC.k!==k){GC.k=k;buildGround()}cx.drawImage(GC.c,0,0,W*MS,H*MS)}
 cx.textAlign='center';
 const ZI={'Forêt':'🌲','Mine':'⛏️','Montagne':'🏔️','Ruines':'🏚️','Donjon':'🏰','Volcan':'🌋'};
 for(const z of ZA){
  const q=ZR[z.n]||ZR['Trône du Roi'],ly=(z.y-(ZT[z.n]+1.8)*ZS)*sc,t=z.sn||z.n;cx.font=`700 ${sc*3.4}px Alegreya,serif`;cx.lineJoin='round';cx.lineWidth=sc*.9;cx.strokeStyle='rgba(20,28,22,.85)';cx.strokeText(t,z.x*sc,ly);cx.fillStyle='#fff';cx.fillText(t,z.x*sc,ly);const tw=cx.measureText(t).width;
  cx.font=`${sc*3}px serif`;cx.fillText(z.boss?'👑':'🔥'.repeat(z.vi+1),z.x*sc,ly+sc*3.6);
  const bx=z.x*sc-tw/2-sc*3.4,by=ly-sc*1.1;cx.fillStyle='rgba(20,28,22,.72)';cx.beginPath();cx.arc(bx,by,sc*2.7,0,7);cx.fill();cx.fillStyle='#fff';cx.font=`${sc*3}px serif`;cx.fillText(z.boss?'👹':(ZI[z.n]||'⚔️'),bx,by+sc*1)
 }
 drawTown();
 for(const h of [...S.hero].sort((a,b)=>a.y-b.y)){if(hidn(h))continue;
  const x=h.x*sc+((h.id%3)-1)*sc*1.5,y=h.y*sc+((h.id%2)-.5)*sc*2,sl=(h.st==='town'&&h.sub==='do')||h.st==='rest';if(sl)cx.globalAlpha=.5;
  const w=mvOf(h.id,x,y),fg=h.st==='fight',top=h.hs?6.6:5.2;
  if(fg){cx.fillStyle='rgba(192,57,43,.55)';cx.beginPath();cx.arc(x,y+sc*.8,sc*3.6+Math.sin(S.t*14)*2,0,7);cx.fill();}
  person(x,y,{g:gd(h,h.name),k:h.c,col:h.col,id:h.id,f:w.f,ph:w.ph,mv:w.mv&&!sl,fight:fg,hs:h.hs});
  if(showT&&(h.st==='go'||h.st==='back'||(h.st==='town'&&h.sub==='do'))){cx.fillStyle='#1d2326';cx.font=`700 ${sc*2.6}px Alegreya,serif`;cx.fillText(fm(rem(h)),x,y-sc*(top-1))}
  if(h.loot&&(h.st==='back'||h.st==='town')){cx.fillStyle='#e2b43c';cx.beginPath();cx.arc(x+sc*1.8,y-sc*1.8,sc*.9,0,7);cx.fill()}cx.globalAlpha=1;
 }
 {const K=dk();if(K>0){cx.fillStyle=`rgba(3,5,20,${.66*K})`;cx.fillRect(-W*3,-H*3,W*7,H*7);cx.fillStyle='#ffd37a';
  const dot=(x,y,r,Rh,s)=>{cx.globalAlpha=K;const q=Math.max(Rh,9/cam.z);cx.drawImage(GLOW,x-q,y-q,2*q,2*q);cx.fillStyle='#ffd37a';cx.beginPath();if(s){cx.fillStyle='#ffd37a';cx.beginPath();cx.arc(x,y,Math.max(r,1.6/cam.z),0,7);cx.fill()}};
  const inV=(x,y)=>((x-T.x)/VR.rx)**2+((y-T.y)/VR.ry)**2<1.1;
  for(const [x,y] of ROADL)if(!inV(x,y))dot(x*sc,y*sc,sc*.55,sc*5);
  const nn=Math.max(8,Math.round(Math.PI*Math.sqrt(2*(VR.rx**2+VR.ry**2))/11));
  for(let i=0;i<nn;i++){const a=i/nn*6.283+.2;dot((T.x+VR.rx*Math.cos(a))*sc,(T.y+VR.ry*Math.sin(a))*sc,sc*.6,sc*5.5)}
  for(const it of S.pl){const p=slot(it);dot((T.x+p[0]+2)*sc,(T.y+p[1]+3)*sc,sc*.55,sc*4.5)}
  for(const q of S.hero){if(hidn(q))continue;const x=q.x*sc+((q.id%3)-1)*sc*1.5,y=q.y*sc+((q.id%2)-.5)*sc*2,hh=Math.max(sc*11,10/cam.z);cx.globalAlpha=.55*K;cx.drawImage(GLOW,x-hh,y-hh,2*hh,2*hh);cx.globalAlpha=K;cx.fillStyle='#ffd37a';cx.beginPath();cx.arc(x,y-sc*1.2,Math.max(sc*.55,1.6/cam.z),0,7);cx.fill()}
  }}
 for(const m of S.marks){const a=S.t-m.t;if(a>240)continue;cx.globalAlpha=Math.max(.35,1-a/240);cx.font=`${sc*5}px serif`;cx.fillText('💀',m.x*sc,m.y*sc+sc*2);if(m.n){const fs=11/cam.z;cx.font=(/\u2060/.test(m.n)?'italic ':'')+`700 ${fs}px Alegreya,serif`;cx.lineJoin='round';cx.lineWidth=3/cam.z;cx.strokeStyle='rgba(20,28,22,.85)';const tx=sn(m.n),ty=m.y*sc+sc*2+fs*1.1;cx.strokeText(tx,m.x*sc,ty);cx.fillStyle='#fff';cx.fillText(tx,m.x*sc,ty)}cx.globalAlpha=1}
 {cx.globalAlpha=1;cx.textAlign='center';cx.lineJoin='round';const fs=10/cam.z,LB=[],lab=(t,i,x,y)=>LB.push({t,i,x,y});
  for(const k in S.npc){const it=S.pl.find(x=>x.e===NE[k]);if(!it)continue;const p=slot(it),n=S.npc[k];lab(`${sn(n.n)} · niv. ${n.lv}`,/\u2060/.test(n.n),(T.x+p[0]+(k==='V'?5.6:4.8))*sc,(T.y+p[1]+1.1)*sc-sc*4.2-3/cam.z)}
  for(const h of S.hero){if(hidn(h))continue;lab(`${sn(h.name)} · niv. ${h.lv}`,/\u2060/.test(h.name),h.x*sc+((h.id%3)-1)*sc*1.5,h.y*sc+((h.id%2)-.5)*sc*2-sc*(h.hs?6.6:5.2)-3/cam.z);if(h.st==='fight')lab(h.en.n,0,h.x*sc+((h.id%3)-1)*sc*1.5,h.y*sc+((h.id%2)-.5)*sc*2-sc*(h.hs?6.6:5.2)-3/cam.z+fs*1.15)}
  const PL=[];LB.sort((a,b)=>a.y-b.y);for(const l of LB){cx.font=(l.i?'italic ':'')+`700 ${fs}px Alegreya,serif`;l.w=cx.measureText(l.t).width+2/cam.z;for(let k=0;k<12&&PL.some(p=>Math.abs(p.x-l.x)<(p.w+l.w)/2&&Math.abs(p.y-l.y)<fs*1.05);k++)l.y-=fs*1.05;PL.push(l);cx.lineWidth=2.5/cam.z;cx.strokeStyle='rgba(20,28,22,.85)';cx.strokeText(l.t,l.x,l.y);cx.fillStyle='#fff';cx.fillText(l.t,l.x,l.y)}}
 cx.restore();
 {const f=S.hero.filter(h=>h.st==='fight').slice(0,5);if(f.length){const fs=sc*2.9,lh=fs*1.4;cx.fillStyle='rgba(20,24,26,.8)';cx.beginPath();cx.roundRect(6,6,W*.66,lh*(f.length+1)+8,8);cx.fill();cx.textAlign='left';cx.fillStyle='#e2b43c';cx.font=`700 ${fs}px Alegreya,serif`;cx.fillText('Combats en cours',12,6+lh);cx.fillStyle='#fff';cx.font=`${fs}px Alegreya,serif`;f.forEach((h,i)=>{cx.font=(/\u2060/.test(h.name)?'italic ':'')+`${fs}px Alegreya,serif`;cx.fillText(sn(`${h.name} vs ${h.en.n}`),12,6+lh*(i+2))});cx.textAlign='center'}}
 if(S.alert&&performance.now()-S.alert.at<7000){cx.fillStyle='rgba(192,57,43,.95)';cx.beginPath();cx.roundRect(6,H-sc*9-6,W-12,sc*9,8);cx.fill();cx.fillStyle='#fff';cx.font=`700 ${sc*3.6}px Alegreya,serif`;cx.fillText(sn(S.alert.txt),W/2,H-sc*9-6+sc*5.6)}
}
const ZMIN=1/MS,cam={x:0,y:0,z:ZMIN},pt=new Map();let pd=0;
function clampCam(){cam.z=Math.min(3,Math.max(ZMIN,cam.z));const a=W-W*MS*cam.z,b=H-H*MS*cam.z;cam.x=Math.min(Math.max(0,a)+W*.1,Math.max(Math.min(0,a)-W*.1,cam.x));cam.y=Math.min(Math.max(0,b)+H*.1,Math.max(Math.min(0,b)-H*.1,cam.y))}
function zoomAt(px,py,f){const nz=Math.min(3,Math.max(ZMIN,cam.z*f)),k=nz/cam.z;cam.x=px-(px-cam.x)*k;cam.y=py-(py-cam.y)*k;cam.z=nz;clampCam()}
cv.addEventListener('pointerdown',e=>{cv.setPointerCapture(e.pointerId);pt.set(e.pointerId,[e.offsetX,e.offsetY]);pd=0});
cv.addEventListener('pointermove',e=>{if(!pt.has(e.pointerId))return;const o=pt.get(e.pointerId),n=[e.offsetX,e.offsetY];pt.set(e.pointerId,n);if(pt.size===1){cam.x+=n[0]-o[0];cam.y+=n[1]-o[1];clampCam()}else if(pt.size===2){const [a,b]=[...pt.values()],d=Math.hypot(a[0]-b[0],a[1]-b[1]);if(pd)zoomAt((a[0]+b[0])/2,(a[1]+b[1])/2,d/pd);pd=d}});
const pup=e=>{pt.delete(e.pointerId);pd=0};cv.addEventListener('pointerup',pup);cv.addEventListener('pointercancel',pup);
cv.addEventListener('wheel',e=>{e.preventDefault();zoomAt(e.offsetX,e.offsetY,e.deltaY<0?1.15:.87)},{passive:false});
cv.addEventListener('dblclick',()=>{fol=null;cam.x=cam.y=0;cam.z=ZMIN});
let fol=null,tp=null;
function tap(x,y){const mx=(x-cam.x)/cam.z/sc,my=(y-cam.y)/cam.z/sc;let b=null,bd=1e9;for(const q of S.hero){if(hidn(q))continue;const d=Math.hypot(q.x+((q.id%3)-1)*1.5-mx,q.y+((q.id%2)-.5)*2-my);if(d<bd){bd=d;b=q}}if(b&&bd*sc*cam.z<26){fol=b.id;if(cam.z<1.2)cam.z=1.2}else fol=null}
cv.addEventListener('pointerdown',e=>{tp=e.isPrimary&&pt.size<=1?{x:e.offsetX,y:e.offsetY,t:Date.now(),m:0}:null});
cv.addEventListener('pointermove',e=>{if(tp&&Math.hypot(e.offsetX-tp.x,e.offsetY-tp.y)>8){tp.m=1;fol=null}});
cv.addEventListener('pointerup',e=>{if(tp&&!tp.m&&Date.now()-tp.t<500)tap(e.offsetX,e.offsetY);tp=null});
