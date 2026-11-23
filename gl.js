// Rendu 3D (WebGL) de la carte : terrain, routes, rivières, zones, village, aventuriers.
// Dépend de three.min.js (variable globale THREE). Si WebGL est indisponible, le jeu reste en 2D.
const GLX=typeof THREE==='undefined'?{K:{on:false},frame(){return false},resize(){},boot(){},setOn(){}}:(()=>{
const V3=THREE.Vector3,Q=THREE.Quaternion,E=THREE.Euler,M4=THREE.Matrix4,Col=THREE.Color,PI=Math.PI;
const mt=new M4(),qq=new Q();
class Acc{constructor(){this.g=[]}
 add(geo,color,x,y,z,o){o=o||{};geo.deleteAttribute('uv');
  mt.compose(new V3(x||0,y||0,z||0),qq.setFromEuler(new E(o.rx||0,o.ry||0,o.rz||0)),new V3(o.sx==null?1:o.sx,o.sy==null?1:o.sy,o.sz==null?1:o.sz));
  geo.applyMatrix4(mt);geo.computeVertexNormals();
  const p=geo.attributes.position,n=p.count,a=new Float32Array(n*3),c=new Col(color),sh=o.shade==null?.16:o.shade;
  for(let i=0;i<n;i++){const k=1+sh*Math.max(-1,Math.min(1,(p.getY(i)-(y||0))*3));a[i*3]=c.r*k;a[i*3+1]=c.g*k;a[i*3+2]=c.b*k}
  geo.setAttribute('color',new THREE.BufferAttribute(a,3));this.g.push(geo);return this}
 mesh(parent,ol){const g=THREE.mergeGeometries(this.g,false),m=new THREE.Mesh(g,MAT);m.castShadow=m.receiveShadow=true;parent.add(m);
  if(ol!==0){const og=g.clone(),p=og.attributes.position,n=og.attributes.normal,t=ol||.014;for(let i=0;i<p.count;i++)p.setXYZ(i,p.getX(i)+n.getX(i)*t,p.getY(i)+n.getY(i)*t,p.getZ(i)+n.getZ(i)*t);
   const o=new THREE.Mesh(og,OUT);o.castShadow=false;parent.add(o)}return m}}
const sph=(r,a,b,c,d)=>new THREE.SphereGeometry(r,20,14,a,b,c,d),cap=(r,l)=>new THREE.CapsuleGeometry(r,l,6,14),cyl=(a,b,h,o)=>new THREE.CylinderGeometry(a,b,h,22,1,!!o),cone=(r,h)=>new THREE.ConeGeometry(r,h,20),tor=(r,t,arc)=>new THREE.TorusGeometry(r,t,10,28,arc||PI*2);
const MAT=new THREE.MeshStandardMaterial({vertexColors:true,roughness:.78,metalness:0,side:THREE.DoubleSide});
const OUT=new THREE.MeshBasicMaterial({color:'#1d1428',side:THREE.BackSide});
let _g=null,_st=null;function starTex(){if(_st)return _st;const c=document.createElement('canvas');c.width=c.height=64;const g=c.getContext('2d'),r=28,x=32,y=32;g.fillStyle='#fff';g.beginPath();g.moveTo(x,y-r);g.quadraticCurveTo(x,y,x+r,y);g.quadraticCurveTo(x,y,x,y+r);g.quadraticCurveTo(x,y,x-r,y);g.quadraticCurveTo(x,y,x,y-r);g.fill();return _st=new TH.CanvasTexture(c)}
function glowTex(){if(_g)return _g;const c=document.createElement('canvas');c.width=c.height=64;const g=c.getContext('2d'),q=g.createRadialGradient(32,32,0,32,32,32);q.addColorStop(0,'rgba(255,255,255,1)');q.addColorStop(.3,'rgba(180,240,255,.5)');q.addColorStop(1,'rgba(120,220,255,0)');g.fillStyle=q;g.fillRect(0,0,64,64);return _g=new THREE.CanvasTexture(c)}
const dkc=(c,t)=>{const k=new Col(c);k.multiplyScalar(1-t);return '#'+k.getHexString()};
function buildHero(cls,fem,P){P=P||{};const skin='#ebc58f',hair=P.hair||'#6a4228',eye=P.eye||'#3f78b0';
 const R=new THREE.Group(),body=new THREE.Group();R.add(body);
 const H=.54,sx=fem?.92:1.06;
 const C={G:{c:'#aab6c8',l:'#4b5568',b:'#3a3f4a',a:'#aab6c8'},V:{c:'#4a4458',l:'#37323f',b:'#2a2630',a:'#4a4458'},M:{c:'#6a5cc8',l:'#4b3f9a',b:'#3a2a1e',a:'#6a5cc8'},R:{c:'#9a7040',l:'#6a4a2a',b:'#4a3220',a:'#4f9a50'}}[cls];
 // jambes
 const legs=[];for(const s of[-1,1]){const hip=new THREE.Group();hip.position.set(s*.1,H,0);body.add(hip);
  new Acc().add(cap(.088,.14),C.l,0,-.12,0).mesh(hip);
  const kn=new THREE.Group();kn.position.set(0,-.24,0);hip.add(kn);
  const a=new Acc().add(cap(.08,.13),C.l,0,-.1,0).add(sph(.095),C.b,0,-.23,.03,{sy:.68,sz:1.45});
  if(cls==='G')a.add(cyl(.088,.09,.1),C.c,0,-.13,0);
  if(cls==='R'||cls==='V')a.add(cyl(.09,.098,.12),C.b,0,-.17,0);
  a.mesh(kn);legs.push({hip,kn})}
 const T=new THREE.Group();T.position.set(0,H,0);body.add(T);
 const t=new Acc(),h=new Acc();
 t.add(sph(.19),C.l,0,.02,0,{sx:sx,sy:.72,sz:.88});
 t.add(cap(.2,.2),C.c,0,.27,0,{sx:sx*(fem?.98:1.05),sz:.86});
 // ceinture
 t.add(tor(.2,.03),'#7a4a28',0,.1,0,{rx:PI/2,sx:sx,sy:.86}).add(sph(.045),'#e6bd54',0,.1,.18,{sz:.5});
 // tête
 const hy=.74,hr=.32;
 h.add(sph(hr),skin,0,hy,0,{sx:1.06,sy:.96,sz:1.0,shade:.06});
 h.add(sph(.03),skin,0,hy-.07,.315,{sz:1,shade:0});
 for(const s of[-1,1]){
  h.add(sph(.05),eye,s*.105,hy-.02,.29,{sx:1.05,sy:.9,sz:.45,shade:0});
  h.add(sph(.03),'#14101c',s*.105,hy-.02,.305,{sz:.4,shade:0});
  h.add(sph(.011),'#ffffff',s*.105+.012,hy-.005,.32,{sz:.5,shade:0});h.add(box(.1,.02,.02),dkc(skin,.25),s*.105,hy+.035,.285,{shade:0});
  h.add(cap(.016,.085),dkc(hair,.1),s*.105,hy+.075,.285,{rz:PI/2+s*(fem?.02:.2),shade:0});
  h.add(sph(.045),skin,s*.335,hy-.02,0,{sx:.5,shade:0});
  if(fem)h.add(cap(.006,.045),'#2a1c18',s*.14,hy+.0,.3,{rz:PI/2-s*.5,shade:0})}
 h.add(sph(.03),fem?'#b8585a':'#8a4a42',0,hy-.15,.285,{sx:1.5,sy:.3,sz:.35,shade:0});
 const hairC=hair,long=fem&&cls!=='V';
 const cap2=(r,sy,z)=>h.add(sph(r,0,PI*2,0,PI*.4),hairC,0,hy+.01,z||-.015,{sy:sy||1.05,shade:.12});
 const fringe=()=>{for(const [x,y,z,s] of[[-.17,.22,.2,.085],[-.05,.25,.2,.085],[.08,.25,.2,.085],[.19,.21,.19,.085]])h.add(sph(s),hairC,x,hy+y,z,{sx:1.3,sy:.8,shade:.12})};
 // coiffure / couvre-chef
 if(cls==='G'){
  h.add(sph(.355,0,PI*2,0,PI*.5),C.a,0,hy+.0,-.03,{sy:1.0,shade:.18,rx:-.3});
  h.add(cyl(.358,.358,.05),'#8793a6',0,hy+.05,-.01,{rx:-.3,shade:.1});
  h.add(sph(.045),'#e6bd54',0,hy+.17,.22,{shade:0});
  h.add(cap(.045,.22),'#d0383a',0,hy+.3,-.15,{rx:-.9,shade:.1});
  if(fem){h.add(cap(.07,.3),hairC,0,hy-.1,-.28,{rx:.3,shade:.1})}
  else{h.add(sph(.34,0,PI*2,PI*.55,PI*.35),hairC,0,hy-.01,-.05,{sy:.9,sz:.8,shade:.1})}
 }
 if(cls==='V'){ // capuche ouverte devant
  h.add(sph(.375,PI/2+1.0,PI*2-2.0,0,PI*.85),C.c,0,hy-.01,-.02,{sy:1.02,shade:.12});
  h.add(cone(.2,.28),C.c,0,hy+.1,-.28,{rx:-1.2,shade:.12});
  fringe();t.add(tor(.24,.055),'#c03c3c',0,.5,0,{rx:PI/2,sx:sx*.95,sy:.9});
  t.add(cap(.05,.2),'#c03c3c',.12,.38,.17,{rx:.1,rz:.15});
 }
 if(cls==='M'){
  cap2(.345,1.02,-.02);fringe();
  h.add(cyl(.46,.46,.035),'#4b3f9a',0,hy+.2,-.02,{rx:-.22,shade:.05});
  h.add(cyl(.24,.27,.1),'#5a4cb0',0,hy+.24,-.06,{rx:-.22,shade:.1});
  h.add(cone(.22,.62),'#5a4cb0',0,hy+.56,-.15,{rx:-.4,shade:.18});
  h.add(tor(.25,.025),'#e6bd54',0,hy+.28,-.06,{rx:PI/2-.22,shade:0});
  h.add(sph(.05),'#e6bd54',0,hy+.28,.19,{shade:0});
  if(long)h.add(cap(.14,.3),hairC,0,hy-.25,-.2,{sx:1.15,sz:.7,shade:.1});
  if(!fem)h.add(cone(.14,.34),'#e8e4dc',0,hy-.3,.19,{rx:PI,sx:1.1,sz:.7,shade:.05});
 }
 if(cls==='R'){
  h.add(sph(.375,PI/2+1.0,PI*2-2.0,0,PI*.85),C.a,0,hy-.01,-.02,{sy:1.02,shade:.12});
  h.add(cone(.2,.3),C.a,0,hy+.08,-.27,{rx:-1.2,shade:.12});
  fringe();if(fem)h.add(cap(.06,.3),hairC,-.2,hy-.2,.14,{rz:-.1,shade:.1}).add(cap(.06,.3),hairC,.2,hy-.2,.14,{rz:.1,shade:.1});
  t.add(new THREE.CylinderGeometry(.26,.34,.85,26,1,true,.2*PI,1.6*PI),C.a,0,.06,-.03,{sz:.92,shade:.12});t.add(cyl(.2,.29,.2),'#8a5f34',0,-.04,0,{sz:.9,shade:.1});t.add(tor(.22,.03),'#5a3a22',0,.19,0,{rx:PI/2,sx:sx,sy:.9,shade:0});
 }
 if(cls==='V'&&fem===0&&false){}
 if((cls==='G'||cls==='V')&&long===false){}
 if(cls!=='M'&&cls!=='G'&&cls!=='V'&&cls!=='R'){}
 if(long&&cls!=='M'&&cls!=='G')h.add(cap(.13,.3),hairC,0,hy-.18,-.22,{sx:1.2,sz:.7,shade:.1});
 // tenue
 if(cls==='G'){
  t.add(cap(.215,.18),C.c,0,.3,0,{sx:sx*1.05,sz:.9,shade:.2});
  t.add(tor(.19,.03),'#8793a6',0,.42,0,{rx:PI/2,sx:sx,sy:.9,shade:0});
  t.add(cyl(.09,.12,.3),'#2f56b0',0,-.06,.15,{sx:1.4,sz:.15,shade:0});t.add(sph(.03),'#e6bd54',0,.0,.165,{shade:0});
  for(const s of[-1,1])t.add(sph(.12),C.a,s*(sx*.24+.04),.45,0,{sy:.8,shade:.2}).add(tor(.1,.02),'#e6bd54',s*(sx*.24+.04),.4,0,{rx:PI/2,shade:0});
 }
 if(cls==='V'){t.add(cap(.215,.18),'#3a3544',0,.27,0,{sx:sx*1.06,sz:.9});
  t.add(cyl(.2,.33,.85,true),'#2f2a38',0,.05,-.04,{sz:.9})}
 if(cls==='R'){t.add(cap(.215,.18),'#a87a46',0,.28,0,{sx:sx*1.05,sz:.88});t.add(cyl(.05,.05,.35),'#6a4a2a',-.13,.5,-.2,{rz:.5,rx:.1});
  for(const k of[-1,0,1])t.add(cone(.02,.07),'#e8e4d8',-.27+k*.03,.7,-.22,{rz:.5})}
 if(cls==='M'){
  const pr=[[.02,-.54],[.42,-.52],[.36,-.25],[.27,.1],[.21,.36],[.19,.44]].map(([r,y])=>new THREE.Vector2(r*(fem?1:1.05),y));
  t.add(new THREE.LatheGeometry(pr,26),C.c,0,0,0,{sz:.85,shade:.18});
  t.add(tor(.42,.025),'#e6bd54',0,-.52,0,{rx:PI/2,sz:.85,shade:0});
  t.add(cyl(.2,.2,.07),'#c4506a',0,.1,0,{sz:.85,shade:0}).add(cyl(.06,.1,.5),'#c4506a',0,-.2,.22,{sz:.3,shade:0});
 }
 if(fem&&(cls==='G'||cls==='V'||cls==='R'))t.add(cyl(.2,.33,.2),cls==='G'?'#2f56b0':cls==='V'?'#3a3544':'#6a4a2a',0,-.1,0,{sz:.9,shade:.1});
 if(fem){h.add(cap(.15,.6),hairC,0,hy-.4,-.17,{sx:1.3,sz:.75,shade:.1});for(const s of[-1,1])h.add(cap(.065,.45),hairC,s*.27,hy-.32,.02,{rz:s*.05,shade:.1})}
 t.add(cyl(.075,.085,.22),skin,0,.56,0,{shade:0});t.mesh(T);const HG=new THREE.Group();HG.scale.setScalar(.7);HG.position.set(0,.8-.74*.7,0);T.add(HG);h.mesh(HG,.016);
 // bras
 const arms=[];for(const s of[-1,1]){const sh=new THREE.Group();sh.position.set(s*(sx*.215+.06),.45,0);T.add(sh);
  const slv=cls==='G'?C.c:cls==='M'?C.c:cls==='R'?C.a:C.c,w=cls==='M'?.085:.068;
  new Acc().add(cap(w,.18),slv,0,-.14,0).mesh(sh);
  const el=new THREE.Group();el.position.set(0,-.3,0);sh.add(el);
  const a=new Acc().add(cap(cls==='M'?.1:.062,.16),cls==='M'?C.c:cls==='G'?C.a:'#7a5a36',0,-.13,0).add(sph(.07),skin,0,-.29,.01,{shade:0});
  if(cls==='G')a.add(cyl(.075,.07,.08),'#e6bd54',0,-.22,0,{shade:0});
  if(cls==='G'&&s===1){a.add(cap(.02,.07),'#8a5a2a',0,-.24,0,{rx:PI/2}).add(box(.2,.035,.04),'#e6bd54',0,-.27,0).add(box(.05,.5,.014),'#eef2f8',0,-.55,0,{shade:0}).add(cone(.027,.08),'#eef2f8',0,-.84,0,{rx:PI,sz:.3,shade:0})}
  if(cls==='G'&&s===-1){a.add(cyl(.22,.22,.045),'#2f56b0',-.04,-.1,.2,{rx:PI/2,shade:.05}).add(tor(.22,.025),'#e6bd54',-.04,-.1,.2,{shade:0}).add(sph(.06),'#e6bd54',-.04,-.1,.23,{sz:.5,shade:0})}
  if(cls==='V')a.add(cap(.015,.08),'#4a3020',0,-.26,0).add(cone(.03,.34),'#dfe4ec',0,-.5,0,{rx:PI,sz:.35,shade:0});
  if(cls==='M'&&s===-1)a.add(cap(.022,1.3),'#7a5030',0,0,.04,{shade:0}).add(sph(.05),'#7a5030',0,.68,.04);
  if(cls==='R'&&s===-1){const X=[[.05,.45],[-.03,.25],[-.11,0],[-.15,-.25],[-.11,-.5],[-.03,-.75],[.05,-.95]],cv=new THREE.CatmullRomCurve3(X.map(([x,y])=>new V3(x,y,0)));
   a.add(new THREE.TubeGeometry(cv,40,.024,8),'#8a5a2a',0,0,.2,{shade:0}).add(cyl(.032,.032,.16),'#4a2c18',-.15,-.25,.2,{shade:0}).add(sph(.03),'#e6bd54',.05,.45,.2,{shade:0}).add(sph(.03),'#e6bd54',.05,-.95,.2,{shade:0}).add(new THREE.TubeGeometry(new THREE.LineCurve3(new V3(.05,.45,0),new V3(.05,-.95,0)),2,.005,3),'#ece4cc',0,0,.2,{shade:0})}
  a.mesh(el);arms.push({sh,el})}
 let orb=null;
 if(cls==='M'){orb=new THREE.Mesh(new THREE.SphereGeometry(.075,16,12),new THREE.MeshBasicMaterial({color:'#b8f4ff'}));orb.position.set(0,.76,.04);
  const hl=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTex(),color:'#7fe0ff',blending:THREE.AdditiveBlending,depthWrite:false,transparent:true}));hl.scale.set(.7,.7,1);orb.add(hl);arms[0].el.add(orb)}
 R.userData={legs,arms,T,body,cls,fem,orb,H};return R}
function box(w,h,d){return new THREE.BoxGeometry(w,h,d)}
function heroAnim(h,t,walk){const u=h.userData,s=walk?Math.sin(t*7):0,a=walk?.65:0;
 u.legs[0].hip.rotation.x=s*a;u.legs[1].hip.rotation.x=-s*a;
 u.legs[0].kn.rotation.x=walk?Math.max(0,-s)*.9:0;u.legs[1].kn.rotation.x=walk?Math.max(0,s)*.9:0;
 const ab=walk?.55:.03;u.arms[0].sh.rotation.x=-s*ab;u.arms[1].sh.rotation.x=s*ab;
 u.arms[0].el.rotation.x=walk?-.3-Math.max(0,s)*.4:-.1;u.arms[1].el.rotation.x=walk?-.3-Math.max(0,-s)*.4:-.1;
 u.arms[0].sh.rotation.z=.1;u.arms[1].sh.rotation.z=-.1;
 if(u.cls==='G'){u.arms[1].sh.rotation.x=walk?-.5+s*.4:-.45;u.arms[1].el.rotation.x=-.8}
 if(u.cls==='V'){u.arms[1].sh.rotation.x=walk?-.4+s*.4:-.35;u.arms[1].el.rotation.x=-.9;u.arms[0].sh.rotation.x=walk?-.4-s*.4:-.35;u.arms[0].el.rotation.x=-.9}
 if(u.cls==='M'){u.arms[0].sh.rotation.x=-.15;u.arms[0].el.rotation.x=-.3;u.arms[0].sh.rotation.z=.15}
 if(u.cls==='R'){u.arms[0].sh.rotation.x=-.3;u.arms[0].el.rotation.x=-.3}
 u.T.rotation.y=walk?s*.07:0;u.T.position.y=u.H+(walk?Math.abs(Math.cos(t*7))*.03:Math.sin(t*1.6)*.006);u.T.rotation.z=walk?s*.03:0;
 if(u.orb)u.orb.children[0].scale.setScalar(1+Math.sin(t*3)*.12)}


// ===== Moteur 3D (WebGL) : terrain, routes, rivières, zones, village, héros =====
const TH=THREE,WXd=100*MS,WYd=130*MS,HS=3,ZF=ZS/2;
const K={on:false,ok:false,fail:false,dist:300,az:0,tilt:.95,tx:T.x,tz:T.y-70,pr:1,prMax:1.5,ft:[],lastFol:null};
let ren,scn,cam3,glc,sun,hemi,terr,tex,gcv,worldG,villG,heroG,gKey='',vKey='',pKey='',vtKey='',tRoad=[],fpsT=0,fpsN=0,par=0;
const HM=new Map(),FACE3=new Map(),V3a=new TH.Vector3();
const rg3=a=>()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const smooth=(a,b,x)=>{x=Math.min(1,Math.max(0,(x-a)/(b-a)));return x*x*(3-2*x)};
function H3(x,y){
 const d=Math.hypot(x-T.x,y-T.y),k=smooth(34,64,d);
 let h=(Math.sin(x*.045+1.3)*Math.cos(y*.037)*1.1+Math.sin(x*.1+y*.08)*.4+Math.cos(y*.13-x*.05)*.3)*k;
 for(const z of ZA){const r=ZRD(z.n),q=Math.hypot(x-z.x,y-z.y)/r;if(q>1.6)continue;
  if(z.n==='Montagne')h+=14*Math.exp(-q*q*2.4);
  else if(z.n==='Volcan'){const qa=Math.max(q,.15),a=Math.max(0,1-qa/.82);h+=36*Math.pow(a,1.45)*(.88+.22*rid(x,y))-8*smooth(.15,.08,q)}
  else if(z.n==='Mine')h+=4*Math.exp(-q*q*2)}
 return h}
const ZCOL={'Forêt':'#3d6b38','Mine':'#6e6a62','Montagne':'#8d9298','Ruines':'#8c7a5c','Donjon':'#52405c','Volcan':'#3a2a28','Trône du Roi':'#2c2832'};
// ---------- texture du sol ----------
function paveVillage(g,vd){const {u}=vd,rc=[],m=1,pr=[13,9],SH=['#8a8780','#a6a39b','#b3b0a7','#7c7973','#9c9990'];
 for(const [p,e] of u){const k=NK[e]||'H';rc.push({x:T.x+p[0],y:T.y+p[1],w:2*BHW(k)+(k==='A'?.8:0),d:k==='A'?6.6:5.4})}
 const hit=(a,b,r)=>{const x0=r.x-r.w/2-m,x1=r.x+r.w/2+m,y0=r.y-r.d/2-m,y1=r.y+r.d/2+m,dx=b[0]-a[0],dy=b[1]-a[1];let t0=0,t1=1;for(const [d,q,lo,hi] of [[dx,a[0],x0,x1],[dy,a[1],y0,y1]]){if(Math.abs(d)<1e-9){if(q<lo||q>hi)return false}else{let s1=(lo-q)/d,s2=(hi-q)/d;if(s1>s2){const t=s1;s1=s2;s2=t}t0=Math.max(t0,s1);t1=Math.min(t1,s2);if(t0>t1)return false}}return true};
 const route=(a,b,dp)=>{const h=rc.find(r=>hit(a,b,r));if(!h||dp<=0)return[a,b];let best=null,bc=1e9;for(const sx of[-1,1])for(const sy of[-1,1]){const c=[h.x+sx*(h.w/2+m+.7),h.y+sy*(h.d/2+m+.7)],cost=Math.hypot(c[0]-a[0],c[1]-a[1])+Math.hypot(c[0]-b[0],c[1]-b[1])+(rc.some(r=>hit(a,c,r))||rc.some(r=>hit(c,b,r))?500:0);if(cost<bc){bc=cost;best=c}}return route(a,best,dp-1).concat(route(best,b,dp-1).slice(1))};
 const nrm=a=>((a[0]-T.x)/pr[0])**2+((a[1]-T.y)/pr[1])**2,pe=a=>{const vx=(a[0]-T.x)/pr[0],vy=(a[1]-T.y)/pr[1],l=Math.hypot(vx,vy)||1;return[T.x+vx/l*pr[0]*.85,T.y+vy/l*pr[1]*.85]};
 const pz=f=>{g.beginPath();for(let i=0;i<=60;i++){const t=i/60*6.2832,r=f*(1+.02*Math.sin(4*t+.7)),x=T.x+Math.cos(t)*pr[0]*r,y=T.y+Math.sin(t)*pr[1]*r;i?g.lineTo(x,y):g.moveTo(x,y)}g.closePath()};
 pz(1.05);g.fillStyle='#5f5c57';g.fill();pz(1);g.fillStyle='#77746e';g.fill();g.save();pz(1);g.clip();
 for(let y=T.y-pr[1],j=0;y<T.y+pr[1];y+=.5,j++)for(let x=T.x-pr[0]-.3+(j%2?.33:0);x<T.x+pr[0];x+=.66){g.fillStyle=SH[(R()*SH.length)|0];g.fillRect(x+(R()-.5)*.05,y,.6,.44)}
 g.restore();
 const pv=(pts,w)=>{g.lineCap='round';g.lineJoin='round';g.strokeStyle='#5f5c57';g.lineWidth=w+.55;g.beginPath();pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.stroke();g.strokeStyle='#77746e';g.lineWidth=w;g.stroke();
  for(let i=1;i<pts.length;i++){const a=pts[i-1],b=pts[i],L=Math.hypot(b[0]-a[0],b[1]-a[1]);if(L<.01)continue;const ux=(b[0]-a[0])/L,uy=(b[1]-a[1])/L,ang=Math.atan2(uy,ux);for(let s1=0;s1<L;s1+=.66)for(let o=-w/2+.3;o<w/2-.15;o+=.5){const px=a[0]+ux*s1-uy*o,py=a[1]+uy*s1+ux*o;g.save();g.translate(px,py);g.rotate(ang);g.fillStyle=SH[(R()*SH.length)|0];g.fillRect(-.3,-.22,.6,.44);g.restore()}}};
 for(const r of rc){const s0=[r.x,r.y+r.d/2+1.2];pv([[r.x,r.y+r.d/2-.2],s0],2.2);if(nrm(s0)>.9)pv(route(s0,pe(s0),3),2.2)}
 for(const z of ZA){const p=RD[z.n];if(!p)continue;for(let k=p.sh||0;k<p.length;k++){const q=p[k];if(((q[0]-T.x)/vd.rx)**2+((q[1]-T.y)/vd.ry)**2>=.9){const dx=q[0]-T.x,dy=q[1]-T.y,l=Math.hypot(dx,dy)||1,a=[q[0]+dx/l*1.5,q[1]+dy/l*1.5];pv(route(a,pe(a),3),2.4);break}}}}
function paintGround(){
 const TS=2.5,w=Math.round(WXd*TS),h=Math.round(WYd*TS),c=gcv||(gcv=document.createElement('canvas'));c.width=w;c.height=h;
 const g=c.getContext('2d'),R=rg3(1234);
 const gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,'#86a772');gr.addColorStop(1,'#9bba84');g.fillStyle=gr;g.fillRect(0,0,w,h);
 g.save();g.scale(TS,TS);
 for(let i=0;i<900;i++){const x=R()*WXd,y=R()*WYd,r=14+R()*30,lt=R()<.5,q=g.createRadialGradient(x,y,0,x,y,r);q.addColorStop(0,lt?'rgba(255,255,210,.13)':'rgba(25,55,30,.13)');q.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=q;g.fillRect(x-r,y-r,2*r,2*r)}
 for(let i=0;i<140;i++){const x=R()*WXd,y=R()*WYd,r=40+R()*70,k=R(),q=g.createRadialGradient(x,y,0,x,y,r);q.addColorStop(0,k<.4?'rgba(190,190,100,.16)':k<.75?'rgba(40,110,60,.14)':'rgba(120,150,70,.14)');q.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=q;g.fillRect(x-r,y-r,2*r,2*r)}
 g.lineWidth=.4;for(let i=0;i<14000;i++){const x=R()*WXd,y=R()*WYd;g.strokeStyle=R()<.5?'#6f9360':'#a9c98f';g.beginPath();g.moveTo(x,y);g.lineTo(x+(R()-.5)*1.2,y-1.2-R()*.9);g.stroke()}
 for(let i=0;i<2200;i++){g.fillStyle=['#fff8e1','#ffe082','#f8bbd0','#ce93d8'][Math.floor(R()*4)];g.beginPath();g.arc(R()*WXd,R()*WYd,.35,0,7);g.fill()}
 for(const z of ZA){const r=ZRD(z.n)*1.05,q=g.createRadialGradient(z.x,z.y,r*.2,z.x,z.y,r),col=ZCOL[z.n]||'#555';q.addColorStop(0,col);q.addColorStop(.45,col+'ee');q.addColorStop(.7,col+'aa');q.addColorStop(.88,col+'44');q.addColorStop(1,col+'00');g.fillStyle=q;g.fillRect(z.x-r,z.y-r,2*r,2*r);
  for(let i=0;i<26;i++){const an=R()*6.283,d=r*(.72+R()*.36),br=r*(.1+R()*.14),bx=z.x+Math.cos(an)*d,by=z.y+Math.sin(an)*d,bq=g.createRadialGradient(bx,by,0,bx,by,br);bq.addColorStop(0,col+'66');bq.addColorStop(1,col+'00');g.fillStyle=bq;g.fillRect(bx-br,by-br,2*br,2*br)}
  
  if(z.n==='Volcan'){const q2=g.createRadialGradient(z.x,z.y,0,z.x,z.y,r*.3);q2.addColorStop(0,'#f06a2a');q2.addColorStop(.6,'#8a2a1a');q2.addColorStop(1,'rgba(60,30,25,0)');g.fillStyle=q2;g.fillRect(z.x-r,z.y-r,2*r,2*r)}
  if(z.n==='Mine'||z.n==='Ruines'||z.n==='Montagne'){for(let i=0;i<260;i++){const a=R()*6.283,d=Math.sqrt(R())*r*.9;g.fillStyle=R()<.5?'rgba(40,40,40,.18)':'rgba(230,230,220,.16)';g.beginPath();g.arc(z.x+Math.cos(a)*d,z.y+Math.sin(a)*d,1+R()*2.4,0,7);g.fill()}}}
 g.restore();
 const bk=(lw,col,al)=>{const t=document.createElement('canvas');t.width=w;t.height=h;const q=t.getContext('2d');q.scale(TS,TS);q.lineCap='round';q.lineJoin='round';q.strokeStyle=col;for(const r of RIV){for(let k=1;k<r.length;k++){q.lineWidth=rvW(k/r.length)*1.45+lw;q.beginPath();q.moveTo(r[k-1][0],r[k-1][1]);q.lineTo(r[k][0],r[k][1]);q.stroke()}}g.globalAlpha=al;g.drawImage(t,0,0);g.globalAlpha=1};
 bk(9,'#768454',.32);bk(5.6,'#a8926a',.7);bk(3,'#7a6648',.9);
 g.save();g.scale(TS/sc,TS/sc);try{drawRivers(g)}catch(e){}g.restore();
 g.save();g.scale(TS,TS);const wet=(x,y)=>nearRiver(x,y,.3);
 for(const z of ZA){const pts=RD[z.n];if(!pts)continue;const sh=pts.sh||0;for(let k=sh;k<pts.length;k++){const [x,y]=pts[k];if(wet(x,y))continue;g.fillStyle='#6b5838';g.beginPath();g.arc(x,y,1.85+R()*.45,0,7);g.fill()}}
 for(const z of ZA){const pts=RD[z.n];if(!pts)continue;const sh=pts.sh||0;for(let k=sh;k<pts.length;k++){const [x,y]=pts[k];if(wet(x,y))continue;g.fillStyle='#b99c6b';g.beginPath();g.arc(x,y,1.35+R()*.3,0,7);g.fill();if(k%2===0){g.fillStyle='rgba(224,205,150,.55)';g.beginPath();g.arc(x,y,.55+R()*.25,0,7);g.fill()}}}
 g.restore();
 g.save();g.scale(TS/sc,TS/sc);try{drawBridges(g)}catch(e){}g.restore();
 // village
 const {u,rx,ry}=vdim();g.save();g.scale(TS,TS);
 const rr=t=>1+.035*Math.sin(3*t+1.3)+.03*Math.sin(5*t+.4),blob=f=>{g.beginPath();for(let i=0;i<=72;i++){const t=i/72*6.2832,r=rr(t)*f,x=T.x+Math.cos(t)*rx*r,y=T.y+Math.sin(t)*ry*r;i?g.lineTo(x,y):g.moveTo(x,y)}g.closePath()};
 blob(1.1);g.fillStyle='rgba(120,110,70,.28)';g.fill();blob(1);g.fillStyle='#c9b88c';g.fill();g.save();blob(1);g.clip();
 for(let i=0;i<14;i++){const a=R()*6.283,r=Math.sqrt(R())*.9,q=4+R()*7;g.fillStyle=R()<.5?'rgba(150,125,80,.16)':'rgba(240,225,180,.2)';g.beginPath();g.ellipse(T.x+Math.cos(a)*rx*r,T.y+Math.sin(a)*ry*r,q,q*.6,0,0,7);g.fill()}
 for(let i=0,N=Math.round(rx*ry*.5);i<N;i++){const a=R()*6.283,r=Math.sqrt(R());g.fillStyle=R()<.5?'rgba(110,90,55,.35)':'rgba(235,220,175,.5)';g.fillRect(T.x+Math.cos(a)*rx*r,T.y+Math.sin(a)*ry*r,.22,.16)}
 try{paveVillage(g,vdim())}catch(e){K.err=e}
 g.restore();blob(1);g.strokeStyle='rgba(70,58,35,.5)';g.lineWidth=.2;g.stroke();g.restore();
 {const e=90*TS,col='62,98,54';for(const [x0,y0,x1,y1,rx,ry,rw,rh] of [[0,0,e,0,0,0,e,h],[w,0,w-e,0,w-e,0,e,h],[0,0,0,e,0,0,w,e],[0,h,0,h-e,0,h-e,w,e]]){const q=g.createLinearGradient(x0,y0,x1,y1);q.addColorStop(0,'rgba('+col+',1)');q.addColorStop(1,'rgba('+col+',0)');g.fillStyle=q;g.fillRect(rx,ry,rw,rh)}}paintLava();
 if(!tex){tex=new TH.CanvasTexture(c);tex.colorSpace=TH.SRGBColorSpace;tex.anisotropy=4}else tex.needsUpdate=true}
// ---------- terrain ----------
function buildTerrain(){
 const SX=3,nx=Math.round(WXd/SX),nz=Math.round(WYd/SX),pos=new Float32Array((nx+1)*(nz+1)*3),uv=new Float32Array((nx+1)*(nz+1)*2),idx=[];
 for(let j=0;j<=nz;j++)for(let i=0;i<=nx;i++){const x=i/nx*WXd,y=j/nz*WYd,k=j*(nx+1)+i;pos[k*3]=x;pos[k*3+1]=H3(x,y);pos[k*3+2]=y;uv[k*2]=i/nx;uv[k*2+1]=1-j/nz}
 for(let j=0;j<nz;j++)for(let i=0;i<nx;i++){const a=j*(nx+1)+i,b=a+1,c=a+nx+1,d=c+1;idx.push(a,c,b,b,c,d)}
 const g=new TH.BufferGeometry();g.setAttribute('position',new TH.BufferAttribute(pos,3));g.setAttribute('uv',new TH.BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();
 if(terr){terr.geometry.dispose();terr.geometry=g}else{terr=new TH.Mesh(g,new TH.MeshStandardMaterial({map:tex,roughness:1,metalness:0}));terr.receiveShadow=true;scn.add(terr)}
 terr.material.map=tex;terr.material.emissiveMap=etex;terr.material.emissive.set('#ffffff');terr.material.emissiveIntensity=2.2;terr.material.needsUpdate=true;if(!OUTP){OUTP=new TH.Mesh(new TH.PlaneGeometry(9000,9000).rotateX(-PI/2),new TH.MeshStandardMaterial({color:'#3e6236',roughness:1,metalness:0}));OUTP.position.set(WXd/2,-1.8,WYd/2);scn.add(OUTP)}}
// ---------- décor ----------
function disp(o){o.traverse(c=>{if(c.geometry)c.geometry.dispose()})}
function clearG(g){while(g.children.length){const c=g.children.pop();disp(c)}}
const DM=new TH.MeshStandardMaterial({vertexColors:true,roughness:.85,metalness:0,flatShading:true,side:TH.DoubleSide});
function acc2(){return new Acc()}
function meshOf(a,par){const g=TH.mergeGeometries(a.g,false),m=new TH.Mesh(g,DM);m.castShadow=true;m.receiveShadow=true;par.add(m);return m}
function inst(par,geo,mat,list,shadow){if(!list.length)return;const m=new TH.InstancedMesh(geo,mat,list.length),o=new TH.Object3D(),c=new TH.Color();
 list.forEach((q,i)=>{o.position.set(q.x,q.y,q.z);o.rotation.set(0,q.r||0,0);o.scale.set(q.sx||q.s||1,q.sy||q.s||1,q.sz||q.s||1);o.updateMatrix();m.setMatrixAt(i,o.matrix);c.set(q.c||'#ffffff');m.setColorAt(i,c)});
 m.instanceMatrix.needsUpdate=true;if(m.instanceColor)m.instanceColor.needsUpdate=true;m.castShadow=!!shadow;m.receiveShadow=true;par.add(m)}
const MI=new TH.MeshStandardMaterial({roughness:.85,metalness:0,flatShading:true});
// ---------- textures procédurales et accumulateur texturé (v3.3.2) ----------
const TSZ={stone:3.4,brick:2.6,plaster:4.4,tile:2.4,wood:2.6,cobble:3.2},TXM={};
function paintTex(k){
 const S=128,c=document.createElement('canvas');c.width=c.height=S;const g=c.getContext('2d'),R=rg3(k.length*977+13);
 const gr=v=>{v=Math.max(0,Math.min(255,v|0));return `rgb(${v},${v},${v})`};
 const rc=(x,y,w,h)=>{for(const ox of[0,-S])for(const oy of[0,-S])g.fillRect(x+ox,y+oy,w,h)};
 if(k==='stone'||k==='brick'){const rh=k==='stone'?32:16,bw=k==='stone'?64:32;g.fillStyle=gr(135);g.fillRect(0,0,S,S);
  for(let r=0;r<S/rh;r++){const off=r%2?bw/2:0;for(let i=0;i<S/bw;i++){const x=off+i*bw,y=r*rh;g.fillStyle=gr(205+R()*45);rc(x+1.5,y+1.5,bw-3,rh-3);g.fillStyle='rgba(255,255,255,.16)';rc(x+1.5,y+1.5,bw-3,3);g.fillStyle='rgba(0,0,0,.16)';rc(x+1.5,y+rh-4.5,bw-3,3)}}}
 else if(k==='plaster'){g.fillStyle=gr(238);g.fillRect(0,0,S,S);for(let i=0;i<40;i++){g.fillStyle=`rgba(${R()<.5?'0,0,0':'255,255,255'},${.03+R()*.05})`;g.beginPath();g.arc(R()*S,R()*S,6+R()*14,0,7);g.fill()}}
 else if(k==='tile'){g.fillStyle=gr(150);g.fillRect(0,0,S,S);for(let r=0;r<S/16;r++){const off=r%2?8:0;for(let i=0;i<S/16;i++){const x=off+i*16,y=r*16;g.fillStyle=gr(200+R()*50);rc(x+.5,y,15,15);g.fillStyle='rgba(0,0,0,.28)';rc(x+.5,y+12,15,3)}}}
 else if(k==='wood'){g.fillStyle=gr(120);g.fillRect(0,0,S,S);for(let i=0;i<8;i++){g.fillStyle=gr(200+R()*50);rc(i*16+1,0,14,S);g.fillStyle='rgba(0,0,0,.12)';for(let j=0;j<5;j++)rc(i*16+2+R()*10,R()*S,1,10+R()*30)}}
 else if(k==='cobble'){g.fillStyle=gr(150);g.fillRect(0,0,S,S);for(let i=0;i<70;i++){const x=R()*S,y=R()*S,r=5+R()*5,a=R()*3;g.fillStyle=gr(205+R()*50);for(const ox of[0,-S])for(const oy of[0,-S]){g.beginPath();g.ellipse(x+ox,y+oy,r,r*.8,a,0,7);g.fill()}}}
 for(let i=0;i<500;i++){g.fillStyle=`rgba(${R()<.5?'0,0,0':'255,255,255'},${.04+R()*.07})`;g.fillRect(R()*S,R()*S,1+R()*2,1)}
 const t=new TH.CanvasTexture(c);t.wrapS=t.wrapT=TH.RepeatWrapping;t.colorSpace=TH.SRGBColorSpace;t.anisotropy=4;return t}
function txm(k){if(TXM[k])return TXM[k];let m;
 if(k==='win'||k==='winv')m=new TH.MeshStandardMaterial({color:k==='win'?'#2c3e55':'#2a2048',emissive:k==='win'?'#ffb55a':'#b070ff',emissiveIntensity:0,roughness:.35});
 else if(k==='lava')m=new TH.MeshBasicMaterial({color:'#f2561c'});
 else if(k==='flat')m=new TH.MeshStandardMaterial({vertexColors:true,roughness:.92,flatShading:true,side:TH.DoubleSide});
 else m=new TH.MeshStandardMaterial({map:paintTex(k),vertexColors:true,roughness:.93,side:TH.DoubleSide});
 return TXM[k]=m}
// accumulateur : un seul maillage fusionné par matière ; repère local (x,y,z,échelle) pour les zones
class TA{constructor(){this.m={};this.fr={x:0,y:0,z:0,s:1}}
 frame(x,y,z,s){this.fr={x,y,z,s};return this}
 add(k,geo,color,x,y,z,o){o=o||{};const f=this.fr,s=f.s,g=geo.index?geo.toNonIndexed():geo,ou=g.attributes.uv;
  mt.compose(new V3(f.x+(x||0)*s,f.y+(y||0)*s,f.z+(z||0)*s),qq.setFromEuler(new E(o.rx||0,o.ry||0,o.rz||0)),new V3((o.sx==null?1:o.sx)*s,(o.sy==null?1:o.sy)*s,(o.sz==null?1:o.sz)*s));
  g.applyMatrix4(mt);
  const p=g.attributes.position,nr=g.attributes.normal,n=p.count,ts=TSZ[k]||1,uv=new Float32Array(n*2),cl=new Float32Array(n*3),c=new Col(color).multiplyScalar(TSZ[k]?1.14:1),sh=o.shade==null?.1:o.shade,y0=f.y+(y||0)*s;
  for(let i=0;i<n;i++){const px=p.getX(i),py=p.getY(i),pz=p.getZ(i);let u,v;
   if(o.cyl&&ou){u=ou.getX(i)*o.cyl[0]*6.2832*s/ts;v=ou.getY(i)*o.cyl[1]*s/ts}
   else{const ax=Math.abs(nr.getX(i)),ay=Math.abs(nr.getY(i)),az=Math.abs(nr.getZ(i));if(ay>=ax&&ay>=az){u=px;v=pz}else if(ax>=az){u=pz;v=py}else{u=px;v=py}u/=ts;v/=ts}
   uv[i*2]=u;uv[i*2+1]=v;const q=1+sh*Math.max(-1,Math.min(1,(py-y0)/(s*1.4)));cl[i*3]=c.r*q;cl[i*3+1]=c.g*q;cl[i*3+2]=c.b*q}
  for(const a of Object.keys(g.attributes))if(a!=='position'&&a!=='normal')g.deleteAttribute(a);
  g.setAttribute('uv',new TH.BufferAttribute(uv,2));g.setAttribute('color',new TH.BufferAttribute(cl,3));(this.m[k]=this.m[k]||[]).push(g);return this}
 raw(k,g){g=g.index?g.toNonIndexed():g;if(!g.attributes.uv)g.setAttribute('uv',new TH.BufferAttribute(new Float32Array(g.attributes.position.count*2),2));(this.m[k]=this.m[k]||[]).push(g);return this}
 build(par){for(const k of Object.keys(this.m)){const m=new TH.Mesh(TH.mergeGeometries(this.m[k],false),txm(k));m.castShadow=k!=='lava';m.receiveShadow=true;par.add(m);this.m[k].forEach(g=>g.dispose())}this.m={}}}
// ---------- formes de base ----------
const hs=(x,y,z)=>{const s=Math.sin(x*127.1+y*311.7+z*74.7)*43758.5453;return s-Math.floor(s)};
const cl3=h=>new Col(h),mix=(a,b,t)=>a.clone().lerp(b,Math.max(0,Math.min(1,t)));
function nonIdx(g){const n=g.index?g.toNonIndexed():g;for(const k of Object.keys(n.attributes))if(k!=='position')n.deleteAttribute(k);return n}
function paint(g,fn){g.computeVertexNormals();const p=g.attributes.position,nr=g.attributes.normal,n=p.count,a=new Float32Array(n*3),c=new Col();
 for(let i=0;i<n;i++){c.set(fn(p.getX(i),p.getY(i),p.getZ(i),nr.getX(i),nr.getY(i),nr.getZ(i)));a[i*3]=c.r;a[i*3+1]=c.g;a[i*3+2]=c.b}
 g.setAttribute('color',new TH.BufferAttribute(a,3));g.setAttribute('uv',new TH.BufferAttribute(new Float32Array(n*2),2));return g}
function bump(g,amp,seed,fq){const p=g.attributes.position;for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),z=p.getZ(i),f=1+(hs(x*fq+seed,y*fq,z*fq)-.5)*amp;p.setXYZ(i,x*f,y*f,z*f)}return g}
const cy2=(a,b,h,s)=>new TH.CylinderGeometry(a,b,h,s||14);
function blobG(r,amp,seed,sx,sy,sz,tx,ty,tz,dt){let g=nonIdx(new TH.IcosahedronGeometry(r,dt==null?1:dt));bump(g,amp,seed,1.7);g.scale(sx,sy,sz);g.translate(tx,ty,tz);return g}
const OKA=[cl3('#25552f'),cl3('#5fa044')],OKB=[cl3('#1d4a3a'),cl3('#4a8a52')],OKC=[cl3('#7a3a1c'),cl3('#d98a34')];
function oakG(pal,seed){const P=[],tg=nonIdx(new TH.CylinderGeometry(.2,.36,2.4,6,1,true));tg.translate(0,1.2,0);P.push(paint(tg,(x,y)=>mix(cl3('#4a3220'),cl3('#6b4a2c'),y/2.4)));
 [[0,3.7,0,1.55],[-.95,3.2,.5,1.1],[.9,3.3,-.45,1.15]].forEach(([bx,by,bz,r],i)=>{const g=blobG(r,.42,seed+i*5,1,.86,1,bx,by,bz,i?0:1);P.push(paint(g,(x,y,z,nx,ny,nz)=>mix(pal[0],pal[1],.5+ny*.45+(y-2.3)/5)))});
 return TH.mergeGeometries(P,false)}
function pineG(snow,seed){const P=[],tg=nonIdx(new TH.CylinderGeometry(.16,.28,1.8,6,1,true));tg.translate(0,.9,0);P.push(paint(tg,(x,y)=>mix(cl3('#3e2a1a'),cl3('#5a4028'),y/1.8)));
 for(let i=0;i<4;i++){const g=nonIdx(new TH.ConeGeometry(1.6-i*.32,2.2,7,1,true));bump(g,.16,seed+i,2);g.translate(0,1.7+i*1.15+1.1,0);
  P.push(paint(g,(x,y,z,nx,ny)=>{const t=(y-1.7)/5;if(snow&&i>=1&&ny>.1)return mix(cl3('#dfe7f0'),cl3('#ffffff'),t);return mix(cl3('#1d4a30'),cl3('#3f7d48'),t*.8+ny*.5)}))}
 return TH.mergeGeometries(P,false)}
function rockG(seed){const g=nonIdx(new TH.IcosahedronGeometry(1,1));bump(g,.55,seed,1.3);g.scale(1.1,.78,1);g.translate(0,.4,0);return paint(g,(x,y,z,nx,ny)=>{const v=.62+ny*.22+(hs(x*3,y*3,z*3)-.5)*.2;return new Col(v,v,v*.98)})}
function bushG(seed){const P=[[0,.45,0,.8],[.6,.35,.2,.55]].map(([x,y,z,r],i)=>paint(blobG(r,.3,seed+i,1,.8,1,x,y,z,0),(px,py,pz,nx,ny)=>mix(cl3('#2b5a30'),cl3('#68a74a'),.35+ny*.5)));return TH.mergeGeometries(P,false)}
function peakG(b,h,seed){const g=nonIdx(new TH.ConeGeometry(b,h,9,5,true)),p=g.attributes.position;
 for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),z=p.getZ(i),t=(y+h/2)/h,f=1+(hs(x*.9+seed,y*.7,z*.9)-.5)*.5*(1-t*.5);p.setXYZ(i,x*f,y+(hs(x*1.3,y*.9+seed,z*1.3)-.5)*h*.06*(1-t),z*f)}
 g.translate(0,h/2,0);return paint(g,(x,y,z,nx,ny)=>{const t=y/h,sn=t+ny*.25-.08+(hs(x*2,y*2,z*2)-.5)*.12;if(sn>.62)return mix(cl3('#dfe6ee'),cl3('#ffffff'),(sn-.62)*3);return mix(cl3('#5f5a55'),cl3('#8d949c'),t+ny*.3)})}
function gableG(L,Dp,h){const x=L/2,z=Dp/2,P=[[-x,0,z],[x,0,z],[x,h,0],[-x,h,0],[-x,0,-z],[x,0,-z]],pos=[];for(const i of[0,1,2,0,2,3,5,4,3,5,3,2])pos.push(...P[i]);
 const g=new TH.BufferGeometry();g.setAttribute('position',new TH.Float32BufferAttribute(pos,3));g.computeVertexNormals();return g}
function endG(Dp,h){const z=Dp/2,g=new TH.BufferGeometry();g.setAttribute('position',new TH.Float32BufferAttribute([0,0,-z,0,0,z,0,h,0],3));g.computeVertexNormals();return g}
function pyrG(h){const g=new TH.ConeGeometry(.70711,h,4,1);g.rotateY(PI/4);return g}
// ruban posé sur le terrain (rivières, routes, lave) : P=[[x,z],...]
function ribbon(P,wf,yo,uvs,col){const n=P.length,pos=[],uv=[],idx=[];let len=0;
 for(let k=0;k<n;k++){const a=P[Math.max(0,k-1)],b=P[Math.min(n-1,k+1)];let tx=b[0]-a[0],tz=b[1]-a[1];const L=Math.hypot(tx,tz)||1;tx/=L;tz/=L;const hw=wf(k,n)/2;
  if(k)len+=Math.hypot(P[k][0]-P[k-1][0],P[k][1]-P[k-1][1]);
  for(const s of[-1,1]){const px=P[k][0]-tz*hw*s,pz=P[k][1]+tx*hw*s;pos.push(px,H3(px,pz)+yo,pz);uv.push(len/uvs,s>0?1:0)}}
 for(let k=0;k<n-1;k++){const a=k*2;idx.push(a,a+1,a+2,a+1,a+3,a+2)}
 const g=new TH.BufferGeometry();g.setAttribute('position',new TH.Float32BufferAttribute(pos,3));g.setAttribute('uv',new TH.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();
 const c=new Col(col||'#ffffff'),cc=new Float32Array(n*6);for(let i=0;i<n*2;i++){cc[i*3]=c.r;cc[i*3+1]=c.g;cc[i*3+2]=c.b}g.setAttribute('color',new TH.BufferAttribute(cc,3));return g}
// ---------- éléments communs de bâtiments ----------
function winF(W,x,y,z,s,vk){W.add('wood',box(1.1,1.2,.14),'#4a3322',x,y,z+s*.02,{shade:0});W.add(vk||'win',box(.8,.9,.2),'#fff',x,y,z+s*.07,{shade:0})}
function winS(W,x,y,z,s){W.add('wood',box(.14,1.2,1.1),'#4a3322',x+s*.02,y,z,{shade:0});W.add('win',box(.2,.9,.8),'#fff',x+s*.07,y,z,{shade:0})}
function doorF(W,x,y0,zf,wd,ht){W.add('wood',box(wd+.35,ht+.2,.22),'#4a3322',x,y0+ht/2+.1,zf+.02,{shade:0});W.add('wood',box(wd,ht,.14),'#6b4528',x,y0+ht/2,zf+.1,{shade:0});W.add('stone',box(wd+.9,.22,.8),'#9a9488',x,y0+.11,zf+.4,{shade:0})}
// ---------- château fermé (Donjon, Trône du Roi) ----------
function castleG(W,G,x,z,u,wall,roof,dk){
 const hw=4.8*u,hd=4*u,T=.9*u,H=4.4*u,Tr=1.45*u,Ht=H+3.6*u,gw=2.8*u,hp=1.2*u,ln=hw-gw/2,
  gy=Math.min(G(x-hw,z-hd),G(x+hw,z-hd),G(x-hw,z+hd),G(x+hw,z+hd))-.6,yb=gy+hp-.6,sn='stone',lw=dkc(wall,-.12),dr='#171210';
 W.add(sn,box(2*hw+2.4*u,hp+1.5,2*hd+2.4*u),dkc(wall,.18),x,gy-.75+(hp+1.5)/2,z,{shade:.02});
 W.add('cobble',box(2*hw-T,.14,2*hd-T),dk?'#6a6672':'#b8ae9a',x,yb+.05,z,{shade:0});
 W.add(sn,box(2*hw+T,H,T),wall,x,yb+H/2,z-hd);
 for(const s of[-1,1])W.add(sn,box(T,H,2*hd+T),wall,x+s*hw,yb+H/2,z);
 for(const s of[-1,1])W.add(sn,box(ln,H,T),wall,x+s*(gw/2+ln/2),yb+H/2,z+hd);
 W.add(sn,box(gw+.8*u,1.5*u,T),wall,x,yb+H-.75*u,z+hd);W.add('flat',box(gw*.92,H-1.5*u,.3*u),dr,x,yb+(H-1.5*u)/2,z+hd,{shade:0});
 for(let i=-2;i<=2;i++)W.add('flat',box(.12*u,H-1.5*u,.12*u),'#3a3a40',x+i*gw*.2,yb+(H-1.5*u)/2,z+hd+.3*u,{shade:0});
 const mer=(px,pz,ax)=>W.add(sn,box(ax?.8*u:.5*u,.7*u,ax?.5*u:.8*u),wall,px,yb+H+.35*u,pz,{shade:0});
 for(let q=-hw+Tr;q<=hw-Tr;q+=1.5*u){mer(x+q,z-hd,1);if(Math.abs(q)>gw/2+1.6*u)mer(x+q,z+hd,1)}
 for(let q=-hd+Tr;q<=hd-Tr;q+=1.5*u){mer(x-hw,z+q,0);mer(x+hw,z+q,0)}
 for(const sx of[-1,1])for(const sz of[-1,1]){const tx=x+sx*hw,tz=z+sz*hd;
  W.add(sn,cy2(Tr,Tr*1.08,Ht,16),wall,tx,yb+Ht/2,tz,{cyl:[Tr,Ht],shade:.08});W.add(sn,cy2(Tr*1.22,Tr*1.22,.5*u,16),lw,tx,yb+Ht-.2*u,tz,{cyl:[Tr*1.2,.5*u],shade:0});
  const ch=dk?5.2*u:3.6*u;W.add('tile',new TH.ConeGeometry(Tr*1.42,ch,16),roof,tx,yb+Ht+ch/2-.1*u,tz,{cyl:[Tr*1.4,ch*1.1],shade:.1});
  W.add('flat',box(.22*u,1*u,.12),dr,tx+sx*0,yb+Ht*.6,tz+sz*Tr*.98,{shade:0});if(dk)W.add('flat',new TH.ConeGeometry(.22*u,1.2*u,6),'#2a2434',tx,yb+Ht+ch+.5*u,tz,{shade:0})}
 for(const s of[-1,1]){const gx=x+s*(gw/2+1.1*u);W.add(sn,box(2.2*u,H+2*u,2.2*u),wall,gx,yb+(H+2*u)/2,z+hd+.2*u,{shade:.08});W.add('tile',pyrG(2.2*u),roof,gx,yb+H+2*u+1.1*u,z+hd+.2*u,{sx:2.8*u,sz:2.8*u,shade:.1});W.add('flat',box(.3*u,.9*u,.1),dr,gx,yb+H*.7,z+hd+1.3*u,{shade:0})}
 const kz=z-hd*.3,kw=5.4*u,kd=4*u,kh=H+4.2*u,vk=dk?'winv':'win';
 W.add(sn,box(kw,kh,kd),dkc(wall,-.05),x,yb+kh/2,kz,{shade:.06});W.add('tile',pyrG(3.4*u),roof,x,yb+kh+1.7*u,kz,{sx:kw*1.14,sz:kd*1.2,shade:.1});
 for(const q of[-1,0,1]){winF(W,x+q*kw*.28,yb+kh*.62,kz+kd/2,1,vk);}
 W.add('wood',cy2(.06*u,.06*u,3*u,6),'#4a3a2a',x,yb+kh+3.4*u+1.2*u,kz,{shade:0});const fg=new TH.PlaneGeometry(2.2*u,1.2*u,4,1);W.add('flat',fg,dk?'#6a3aa8':roof,x+1.1*u,yb+kh+3.4*u+2.2*u,kz,{shade:0});
 return yb}
const MV=new TH.MeshStandardMaterial({vertexColors:true,roughness:1,flatShading:true});
let TG=null,WMAT=null,WTEX=null,WPT=null,WGM=null,WGD=null,RQ=[];
function outTorchPts(vd){const r=rg3(4242),P=[];
 for(const z of ZA){const pts=RD[z.n];if(!pts)continue;let acc=0,side=1;for(let k=(pts.sh||0)+1;k<pts.length;k++){const a=pts[k-1],b=pts[k];acc+=Math.hypot(b[0]-a[0],b[1]-a[1]);
  if(((b[0]-T.x)/vd.rx)**2+((b[1]-T.y)/vd.ry)**2<1.3){acc=0;continue}
  if(acc>=60){acc=0;const dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy)||1,x=b[0]-dy/l*2.7*side,y=b[1]+dx/l*2.7*side;side=-side;if(!nearRiver(x,y,4)&&!BRG.some(q=>Math.hypot(q.x-x,q.y-y)<7)&&!ZA.some(q=>Math.hypot(q.x-x,q.y-y)<ZRD(q.n)*.3))P.push([x,y])}}}
 for(const z of ZA){const n=z.n==='Volcan'?4:5,R0=ZRD(z.n),a0=r()*6.28;for(let i=0;i<n;i++){const a=a0+i/n*6.283+(r()-.5)*.7,d=R0*(.42+r()*.4),x=z.x+Math.cos(a)*d,y=z.y+Math.sin(a)*d;if(!nearRiver(x,y,3))P.push([x,y])}}
 return P}
const HU=Array.from({length:8},()=>new TH.Vector4(0,0,0,0)),HAS={value:1},HV=new TH.Vector3();
MV.onBeforeCompile=sh=>{sh.uniforms.uH={value:HU};sh.uniforms.uAs=HAS;
 sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vNd;').replace('#include <project_vertex>','#include <project_vertex>\nvec4 cp_=projectionMatrix*mvPosition;vNd=vec3(cp_.xy/cp_.w,-mvPosition.z);');
 sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 vNd;uniform vec4 uH[8];uniform float uAs;').replace('void main() {','void main() {\n for(int i=0;i<8;i++){vec4 h=uH[i];if(h.w>0.&&vNd.z<h.z-1.2){float d=length((vNd.xy-h.xy)*vec2(uAs,1.));if(d<h.w){float a=smoothstep(.5,1.,d/h.w),b=fract(52.9829189*fract(dot(gl_FragCoord.xy,vec2(.06711056,.00583715))));if(a<b)discard;}}}\n')};
function holeUpd(BM){cam3.updateMatrixWorld();const th=Math.tan(cam3.fov*PI/360);HAS.value=cam3.aspect;let n=0;
 for(const h of S.hero){if(n>=8)break;if(h.st==='town'||h.st==='rest')continue;const [x,z]=hpos(h,BM);HV.set(x,H3(x,z)+HS*.7,z);const dep=-(HV.clone().applyMatrix4(cam3.matrixWorldInverse).z);if(dep<1)continue;HV.project(cam3);if(Math.abs(HV.x)>1.4||Math.abs(HV.y)>1.4)continue;HU[n++].set(HV.x,HV.y,dep,Math.max(.05,(h.st==='fight'?8.5:6.5)/(dep*th)))}
 for(;n<8;n++)HU[n].w=0}
function tgeo(){return TG||(TG={oa:oakG(OKA,3),ob:oakG(OKB,11),oc:oakG(OKC,19),pn:pineG(false,5),ps:pineG(true,9),rk:rockG(4),bu:bushG(6)})}
function waterMat(){if(WMAT)return WMAT;const S=128,c=document.createElement('canvas');c.width=c.height=S;const g=c.getContext('2d'),R=rg3(55);g.fillStyle='rgb(190,226,238)';g.fillRect(0,0,S,S);
 g.lineCap='round';for(let i=0;i<46;i++){const x=R()*S,y=R()*S,l=10+R()*22;g.strokeStyle=`rgba(255,255,255,${.25+R()*.4})`;g.lineWidth=1+R()*1.6;for(const ox of[0,-S]){g.beginPath();g.moveTo(x+ox,y);g.quadraticCurveTo(x+ox+l/2,y+(R()-.5)*4,x+ox+l,y);g.stroke()}}
 WTEX=new TH.CanvasTexture(c);WTEX.wrapS=WTEX.wrapT=TH.RepeatWrapping;WTEX.colorSpace=TH.SRGBColorSpace;
 return WMAT=new TH.MeshStandardMaterial({map:WTEX,color:'#3f98bf',transparent:true,opacity:.84,roughness:.15,metalness:.05,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2})}
function buildWorld(){
 clearG(worldG);const R=rg3(777),W=new TA(),L={oa:[],ob:[],oc:[],pn:[],ps:[],rk:[],bu:[]},vc=(a,b)=>new Col().setScalar(a+R()*b);
 const tree=(x,z,s,kind)=>{const t=kind||(R()<.5?'oa':'ob'),q={x,y:H3(x,z)-.2,z,s,c:vc(.86,.28),r:R()*6};(R()<.04&&(t==='oa'||t==='ob')?L.oc:L[t]).push(q)};
 const rock=(x,y,sx,sy,sz,c)=>L.rk.push({x,y:H3(x,y)-.15,z:y,sx,sy,sz,r:R()*6,c:new Col(c)});
 tRoad=[];for(const z of ZA){const p=RD[z.n];if(p)for(let k=0;k<p.length;k+=3)tRoad.push(p[k])}
 const vd=vdim(),TP=outTorchPts(vd),clear=(x,y,m)=>{if(((x-T.x)/(vd.rx+m))**2+((y-T.y)/(vd.ry+m))**2<1)return false;for(const p of tRoad)if(Math.abs(p[0]-x)<m&&Math.abs(p[1]-y)<m&&Math.hypot(p[0]-x,p[1]-y)<m)return false;if(nearRiver(x,y,m))return false;for(const q of TP)if(Math.hypot(q[0]-x,q[1]-y)<m+1.2)return false;return true};
 const inZone=(x,y)=>{for(const z of ZA)if(Math.hypot(x-z.x,y-z.y)<ZRD(z.n)+3)return true;return false};
 for(let i=0,n=0;i<4000&&n<480;i++){const x=6+R()*(WXd-12),y=6+R()*(WYd-12);if(inZone(x,y)||!clear(x,y,5))continue;tree(x,y,1.1+R()*1.1,R()<.2?'pn':null);n++}
 for(let i=0,n=0;i<1500&&n<240;i++){const x=6+R()*(WXd-12),y=6+R()*(WYd-12);if(inZone(x,y)||!clear(x,y,4))continue;rock(x,y,1+R()*1.6,.8+R()*.9,1+R()*1.6,'#c4c5ba');n++}
 for(let i=0,n=0;i<1500&&n<160;i++){const x=6+R()*(WXd-12),y=6+R()*(WYd-12);if(inZone(x,y)||!clear(x,y,3.5))continue;L.bu.push({x,y:H3(x,y)-.05,z:y,s:.9+R()*.8,c:vc(.8,.35),r:R()*6});n++}
 {const qd=K.ql>=2?1:K.ql===1?.6:.3;
 for(let i=0,n=0;i<3000&&n<90*qd;i++){const x=6+R()*(WXd-12),y=6+R()*(WYd-12);if(inZone(x,y)||!clear(x,y,3))continue;const k=2+Math.floor(R()*3);for(let j=0;j<k;j++){const bx=x+(R()-.5)*5,by=y+(R()-.5)*5;if(clear(bx,by,1.5))L.bu.push({x:bx,y:H3(bx,by)-.05,z:by,s:.55+R()*.6,c:vc(.78,.4),r:R()*6})}n++}
 for(let i=0,n=0;i<3000&&n<130*qd;i++){const x=6+R()*(WXd-12),y=6+R()*(WYd-12);if(inZone(x,y)||!clear(x,y,2))continue;rock(x,y,.5+R()*.8,.4+R()*.5,.5+R()*.8,'#b7b8ad');n++}}
 const edge=(x,y)=>Math.min(x,y,WXd-x,WYd-y),outT=(x,z)=>{const q={x,y:-1.9,z,s:1.7+R()*1.9,c:vc(.86,.28),r:R()*6};(R()<.55?L.pn:R()<.5?L.oa:L.ob).push(q)};
 for(let i=0,n=0;i<14000&&n<520;i++){const x=R()*WXd,y=R()*WYd,e=edge(x,y);if(e>46||R()>.3+.7*(1-e/46))continue;if(inZone(x,y)||!clear(x,y,4))continue;tree(x,y,1.7+R()*1.9,R()<.55?'pn':null);n++}
 for(let i=0,n=0;i<9000&&n<420;i++){const x=-130+R()*(WXd+260),y=-130+R()*(WYd+260);if(x>-4&&x<WXd+4&&y>-4&&y<WYd+4)continue;outT(x,y);n++}
 for(const z of ZA){const r=ZRD(z.n),n=z.n,zx=z.x,zz=z.y,gy=H3(zx,zz);
  const around=(cnt,fn,rr)=>{for(let i=0,c=0;i<cnt*6&&c<cnt;i++){const an=R()*6.283,d=Math.sqrt(R())*r*(rr||.92),x=zx+Math.cos(an)*d,y=zz+Math.sin(an)*d;if(!clear(x,y,2.6))continue;fn(x,y);c++}};
  const fr=s=>{W.frame(zx,gy,zz,s);return(lx,lz)=>(H3(zx+lx*s,zz+lz*s)-gy)/s};
  if(n==='Forêt'){around(1000,(x,y)=>tree(x,y,1.6+R()*1.8,R()<.3?'pn':null),.97);around(70,(x,y)=>rock(x,y,1.2+R()*2,1+R()*.9,1.2+R()*2,'#b4b6aa'),.9);around(200,(x,y)=>L.bu.push({x,y:H3(x,y)-.05,z:y,s:1+R()*.9,c:vc(.8,.35),r:R()*6}),.95)}
  else if(n==='Mine'){around(60,(x,y)=>rock(x,y,2+R()*3,1.8+R()*2.8,2+R()*3,R()<.5?'#a8a49c':'#85817a'),.95);
   const G=fr(ZF),mz=-4,gm=G(0,mz);
   for(let i=0;i<7;i++){const lx=-4.8+i*1.6,lz=mz-1.4-(i%3)*.9,back=i%3===2;rock(zx+lx*ZF,zz+lz*ZF,(back?4.4:3.2)+R()*1.5,(back?7.5:5)+R()*3,(back?4:3)+R()*1.4,i%2?'#9a968e':'#7d7972')}
   W.add('stone',box(6.2,.5,2.2),'#8a857c',0,gm+.25,mz+.2);
   for(const s of[-1,1])W.add('stone',box(1,4,1.5),'#948f86',s*2.35,gm+2.25,mz);
   W.add('stone',box(5.8,1,1.5),'#a39e94',0,gm+4.5,mz);W.add('flat',box(3.6,3.8,1.2),'#0d0a09',0,gm+2.3,mz-.45,{shade:0});
   for(const s of[-1,1])W.add('wood',box(.4,3.6,.4),'#6b4a2a',s*1.5,gm+1.9,mz+.4,{shade:.05});W.add('wood',box(3.6,.4,.5),'#6b4a2a',0,gm+3.75,mz+.4,{shade:.05});
   W.add('wood',box(.14,2.6,.14),'#4a3322',2.9,gm+1.3,mz+1.3,{shade:0});W.add('win',box(.35,.45,.35),'#fff',2.9,gm+2.75,mz+1.3,{shade:0});
   for(const s of[-1,1])W.add('flat',box(.14,.1,9),'#4a4a52',s*.45,gm+.1,mz+5.2,{shade:0});for(let i=0;i<8;i++)W.add('wood',box(1.4,.08,.22),'#5a3d26',0,gm+.05,mz+1.3+i*1.05,{shade:0});
   W.add('wood',box(1.1,.8,1.7),'#7a5232',0,gm+.85,mz+3.6,{shade:.05});for(const sx of[-1,1])for(const sz of[-1,1])W.add('flat',cy2(.33,.33,.14,10),'#2b2b2b',sx*.62,gm+.33,mz+3.6+sz*.6,{rz:PI/2,shade:0});
   [['#d4a93a',-.25,.1],['#8a8f98',.2,-.3],['#c9a24a',.1,.4]].forEach(([c,x,z2])=>W.add('flat',box(.5,.4,.5),c,x,gm+1.4,mz+3.6+z2,{ry:x*3,shade:0}));
   for(const [bx,bz] of[[2.4,2.2],[3,2.9]])W.add('wood',cy2(.45,.5,1,10),'#7a5232',bx,gm+.5,mz+bz,{cyl:[.45,1],shade:.05})}
  else if(n==='Montagne'){for(let i=0;i<7;i++){const an=i/7*6.283+R()*.4,d=i?r*(.3+R()*.5):0,x=zx+Math.cos(an)*d,y=zz+Math.sin(an)*d,h=(i?11+R()*10:22)*ZF,b=(i?6+R()*4:10)*ZF,g=peakG(b,h,i*7+1);g.rotateY(R()*3);g.translate(x,H3(x,y)-1,y);W.frame(0,0,0,1).raw('flat',g)}
   around(70,(x,y)=>tree(x,y,1.1+R()*.9,R()<.45?'ps':'pn'),.95);around(40,(x,y)=>rock(x,y,1.4+R()*2,1.2+R()*1.4,1.4+R()*2,'#9a9ca2'),.9)}
  else if(n==='Ruines'){const K=Math.min(1,r/ZF*.8/13.5),s=ZF*K,G=fr(s);
   const tx={a:'#d4ccbc',b:'#b3ab9c',c:'#8d9f78'},pick=()=>{const q=R();return q<.3?tx.c:q<.6?tx.b:tx.a};
   for(let a=-4;a<=4;a++)for(let b=-2;b<=2;b++){if(R()<.3)continue;const lx=a*2.9,lz=b*2.9;W.add('stone',box(2.8,.28,2.8),pick(),lx,G(lx,lz)+.14,lz,{ry:(R()-.5)*.14,shade:.04})}
   [[-5.6,[9,9,3.8,.9,2.6,9,4.4]],[5.6,[3,9,2,9,.9,4.8,1.8]]].forEach(([lz,Ls])=>Ls.forEach((h,k)=>{const lx=-10.2+k*3.4,full=h>=9,g0=G(lx,lz);full&&(h=6.4);
    W.add('stone',box(1.8,.45,1.8),tx.a,lx,g0+.225,lz);W.add('stone',cy2(.66,.7,h-.45,14),tx.a,lx,g0+.45+(h-.45)/2,lz,{cyl:[.7,h],shade:.06});
    if(full)W.add('stone',box(1.6,.5,1.6),tx.a,lx,g0+h+.25,lz);
    else if(h>1.2){W.add('stone',box(.9,.55,.8),tx.b,lx+(R()-.5)*.4,g0+h+.27,lz,{ry:R()*3});const sd=k%2?1:-1;W.add('stone',cy2(.62,.66,1.5,12),tx.a,lx+sd*(1.6+R()),g0+.66,lz+(R()-.5)*2,{rz:PI/2,ry:R()*3,cyl:[.66,1.5]})}}));
   W.add('stone',box(4.6,.8,1.5),tx.a,-8.5,G(-8.5,-5.6)+6.85+.4,-5.6);
   [[-11,4.2,3.2],[-7.4,2.6,3.6],[1.5,1.4,4],[5.8,3.4,3.2],[9.8,1,3.6],[12.6,3.8,2.4]].forEach(([lx,h,w])=>{const g0=G(lx,-9);W.add('stone',box(w,h,1.1),tx.a,lx,g0+h/2,-9);W.add('flat',box(w,.14,1.2),tx.c,lx,g0+h+.07,-9,{shade:0})});
   [[-5.2,6.6],[-.9,3.4]].forEach(([lx,h])=>W.add('stone',box(1.3,h,1.3),tx.a,lx,G(lx,-9)+h/2,-9));
   [[-4,3,4],[1.5,1.6,3.4],[6,4.6,3.6]].forEach(([lz,h,w])=>W.add('stone',box(1.1,h,w),tx.b,-13,G(-13,lz)+h/2,lz));
   {const u=12.5,v=8.5,g0=G(u,v);W.add('stone',cy2(2.05,2.2,5.2,16),tx.a,u,g0+2.6,v,{cyl:[2.1,5.2],shade:.06});[.9,1.8,.7,1.6,1.1,.6,1.4].forEach((h,k)=>{const a=k*.9;W.add('stone',box(1.5,h,1),tx.a,u+2.1*Math.cos(a),g0+5.2+h/2,v+2.1*Math.sin(a),{ry:-(a+1.5708)})})}
   for(let k=0;k<18;k++){const lx=-13+R()*26,lz=-8+R()*16,w=.5+R()*.9,h=.35+R()*.5;W.add('stone',box(w,h,.5+R()*.8),R()<.4?tx.c:tx.b,lx,G(lx,lz)+h/2,lz,{ry:R()*3,rz:(R()-.5)*.4})}
   around(50,(x,y)=>rock(x,y,1+R()*1.6,.8+R()*1,1+R()*1.6,'#bdb5a3'),.9)}
  else if(n==='Donjon'){const G=fr(ZF);castleG(W,G,0,0,1.2,'#cfc8bb','#c24a3e',false)}
  else if(n==='Trône du Roi'){const G=fr(ZF);castleG(W,G,0,0,.85,'#6e6a7e','#6a52a0',true)}
  else if(n==='Volcan'){around(110,(x,y)=>rock(x,y,1.6+R()*2.6,1.4+R()*2.2,1.6+R()*2.6,R()<.5?'#6f5a52':'#8f6a58'),.95);
   W.frame(0,0,0,1);const cr=r*.1;W.add('lava',cy2(cr,cr*1.05,.5,24),'#fff',zx,H3(zx,zz)+.2,zz,{shade:0});
   for(let i=0;i<6;i++){const an=i/6*6.283+R()*.5,P=[];for(let t=0;t<=14;t++){const q=cr*.95+t/14*(r*.66-cr*.95),a2=an+Math.sin(t*.6+i)*.1;P.push([zx+Math.cos(a2)*q,zz+Math.sin(a2)*q])}W.raw('lava',ribbon(P,(k,m)=>2.2*(1-k/m*.6)+.4,.3,1,'#fff'))}}
 }
 // routes (pavées) : rubans posés sur le terrain
 W.frame(0,0,0,1);
 for(const z of ZA){const pts=RD[z.n];if(!pts)continue;let seg=[];const fl=()=>{if(seg.length>2)W.raw('cobble',ribbon(seg,()=>2.4,.08,3.2,'#cdb384'));seg=[]};
  for(let k=pts.sh||0;k<pts.length;k+=2){const p=pts[k];if(nearRiver(p[0],p[1],.3)||((p[0]-T.x)/vd.rx)**2+((p[1]-T.y)/vd.ry)**2<1.02){fl();continue}seg.push([p[0],p[1]])}fl()}
 {const wq=[];for(const [x,z] of TP){const y0=H3(x,z);W.add('wood',cy2(.07,.1,2.3,6),'#4a3322',x,y0+1.1,z,{shade:0});W.add('wood',box(.34,.12,.34),'#2a1e14',x,y0+2.3,z,{shade:0});W.add('lava',box(.22,.3,.22),'#fff',x,y0+2.55,z,{shade:0});wq.push(x,y0+2.8,z)}
  WGD=null;if(TP.length){if(!WGM)WGM=new TH.MeshBasicMaterial({map:glowTex(),color:'#ff9a40',blending:TH.AdditiveBlending,depthWrite:false,transparent:true,opacity:0,polygonOffset:true,polygonOffsetFactor:-2,fog:false});const m=new TH.InstancedMesh(new TH.PlaneGeometry(1,1).rotateX(-PI/2),WGM,TP.length),o=new TH.Object3D();TP.forEach((q,i)=>{o.position.set(q[0],H3(q[0],q[1])+.15,q[1]);o.scale.set(20,1,20);o.updateMatrix();m.setMatrixAt(i,o.matrix)});m.frustumCulled=false;m.renderOrder=1;worldG.add(m);WGD=m}
  WPT=null;if(wq.length){const gm=new TH.BufferGeometry();gm.setAttribute('position',new TH.Float32BufferAttribute(wq,3));WPT=new TH.Points(gm,new TH.PointsMaterial({map:glowTex(),color:'#ff9a40',size:8,sizeAttenuation:true,blending:TH.AdditiveBlending,depthWrite:false,transparent:true,opacity:0,fog:false}));WPT.frustumCulled=false;WPT.renderOrder=2;worldG.add(WPT)}}
 // ponts
 for(const b0 of BRG){const b=Object.assign({},b0,{l:b0.l*1.4}),dx=Math.cos(b.a),dz=Math.sin(b.a),e1=H3(b.x-dx*b.l/2,b.y-dz*b.l/2),e2=H3(b.x+dx*b.l/2,b.y+dz*b.l/2),y0=Math.max(e1,e2)+.25;
  W.add('wood',box(b.l,.35,3.6),'#a8824f',b.x,y0,b.y,{ry:-b.a,shade:0});
  for(const s of[-1,1]){const px=b.x+Math.sin(b.a)*s*1.8,pz=b.y-Math.cos(b.a)*s*1.8;W.add('wood',box(b.l,.14,.2),'#5a3a22',px,y0+.95,pz,{ry:-b.a,shade:0});
   for(let t=-b.l/2+.5;t<=b.l/2-.4;t+=Math.max(1.6,b.l/5))W.add('wood',box(.26,1.1,.26),'#4a3220',px+dx*t,y0+.5,pz+dz*t,{shade:0})}
  for(const s of[-1,1])W.add('stone',box(1.4,Math.max(1.4,y0-Math.min(e1,e2)+1),4),'#8f8a80',b.x+dx*s*(b.l/2+.2),y0-.2-.5,b.y+dz*s*(b.l/2+.2),{ry:-b.a,shade:.05})}
 // rivières
 if(RIV.length){const wm=waterMat();for(const r of RIV){if(r.length<2)continue;const m=new TH.Mesh(ribbon(r.map(p=>[p[0],p[1]]),(k,n)=>rvW(k/n)*1.45,.17,5,'#ffffff'),wm);m.renderOrder=2;worldG.add(m)}}
 W.build(worldG);
 const G3=tgeo(),CS=200;for(const k of['oa','ob','oc','pn','ps','bu','rk']){const cells={};for(const q of L[k]){const id=Math.floor(q.x/CS)+','+Math.floor(q.z/CS);(cells[id]=cells[id]||[]).push(q)}for(const id in cells)inst(worldG,G3[k],MV,cells[id],k!=='bu'&&k!=='rk')}
 const vz=ZA.find(z=>z.n==='Volcan');if(vz){const sp=new TH.Sprite(new TH.SpriteMaterial({map:glowTex(),color:'#ff7a2a',blending:TH.AdditiveBlending,depthWrite:false,transparent:true}));sp.position.set(vz.x,H3(vz.x,vz.y)+2,vz.y);sp.scale.set(30,30,1);worldG.add(sp)}}
// ---------- village ----------
const WALL={A:'#e6d3a8',V:'#ece2c8',F:'#b9b2a4',T:'#d9b98f',S:'#efeae0',M:'#a8794a',E:'#a8794a',I:'#a9acb6',C:'#d9c9a3',H:'#d9b98f'},ROOF={A:'#9b4a2f',V:'#3f5f8a',F:'#55555e',T:'#7a3d2e',S:'#6c7fb5',M:'#c9a24a',E:'#6b4a2a',I:'#3f4e6b',C:'#7a2f3a',H:'#8b4a3a'};
function stall(W,x,y0,z,w,d,roof){
 W.add('stone',box(w+.3,.3,d+.3),'#8f8a7d',x,y0+.15,z,{shade:.04});
 W.add('wood',box(w*.9,1.1,1.3),'#8a5f3a',x,y0+.85,z+d*.22);
 [['#c0392b',-.25],['#e0b030',0],['#5a8a3a',.25]].forEach(([c,q])=>{W.add('flat',box(.7,.35,.6),c,x+q*w*.9,y0+1.58,z+d*.22,{shade:0})});
 for(const sx of[-1,1])for(const sz of[-1,1])W.add('wood',box(.3,3.3,.3),'#5a3d26',x+sx*w*.45,y0+1.95,z+sz*d*.38,{shade:.04});
 for(let i=0;i<6;i++)W.add('flat',box(w/6*1.02,.12,d*.98),i%2?'#f1e8d0':roof,x-w/2+(i+.5)*w/6,y0+3.45,z,{rx:.14,shade:.02});
 W.add('wood',box(.9,.8,.9),'#7a5232',x-w*.3,y0+.7,z-d*.2);W.add('wood',box(.7,.6,.7),'#8a6238',x-w*.18,y0+.6,z-d*.3,{ry:.5})}
function building(W,k,x,y0,z,w,d,hh,roof,tier,full){
 const D=d/2,st=k==='F'||k==='S'||k==='V'||k==='I',wk=k==='E'?'wood':st?'stone':'plaster',wc=k==='E'?'#a07c4c':(WALL[k]||'#d9b98f'),yb=y0+.6,rh=(BTOP[k]||6.7)*.42+tier*.2;
 W.add('stone',box(w+.5,.8,d+.5),'#8a857a',x,y0+.3,z,{shade:.04});
 W.add(wk,box(w,hh,d),wc,x,yb+hh/2,z,{shade:.08});
 if(!full)return;
 const top=yb+hh,fz=z+D,bz=z-D;
 if(wk==='plaster'){for(const sx of[-1,1])for(const sz of[-1,1])W.add('wood',box(.34,hh,.34),'#5a3d26',x+sx*w/2,yb+hh/2,z+sz*D,{shade:.04});
  for(const q of[fz,bz])W.add('wood',box(w+.1,.3,.22),'#5a3d26',x,top-.15,q,{shade:0});if(hh>4.2)W.add('wood',box(w+.1,.26,.22),'#5a3d26',x,yb+hh*.52,fz,{shade:0})}
 else if(st)for(const sx of[-1,1])for(const sz of[-1,1])W.add('stone',box(.5,hh,.5),'#d9d3c5',x+sx*w/2,yb+hh/2,z+sz*D,{shade:.04});
 W.add('tile',gableG(w+1.1,d+1.1,rh),roof,x,top,z,{shade:.06});RQ.push([k,x+(k==='S'||k==='V'?w*.3:0),top,z,w,D,rh]);
 for(const s of[-1,1])W.add(wk==='stone'?'stone':wk,endG(d,rh),wc,x+s*w/2,top,z,{shade:.06});
 W.add('wood',box(w+1.2,.16,.34),dkc(roof,.35),x,top+rh+.04,z,{shade:0});
 if('HATFIC'.includes(k)){const ch=rh+(k==='F'?2.6:1.5);W.add('stone',box(.95,ch,.95),'#8a847a',x-w*.28,top-.2+ch/2,z-D*.18,{shade:.04});W.add('stone',box(1.2,.2,1.2),'#6f6a62',x-w*.28,top-.2+ch,z-D*.18,{shade:0});SQ.push([x-w*.28,top-.2+ch+.2,z-D*.18]);if(k==='F')W.add('lava',box(.5,.1,.5),'#fff',x-w*.28,top-.2+ch+.12,z-D*.18,{shade:0})}
 if(k==='S'){const tz=fz-.4,th=hh+4;W.add('stone',box(2.6,th,2.6),'#e4dfd2',x,yb+th/2,tz,{shade:.06});W.add('tile',pyrG(3.8),roof,x,yb+th+1.9,tz,{sx:3.4,sz:3.4,shade:.1});
  W.add('flat',box(.14,1,.14),'#d4b04a',x,yb+th+4.3,tz,{shade:0});W.add('flat',box(.6,.14,.14),'#d4b04a',x,yb+th+4.5,tz,{shade:0});
  doorF(W,x,yb,tz+1.3,1.3,2.5);torches(W,x,yb+2.9,tz+1.3,1.25);winF(W,x,yb+th-1.2,tz+1.3,1);
  for(const s of[-1,1]){winS(W,x+s*w/2,yb+hh*.55,z-1.4,s);winS(W,x+s*w/2,yb+hh*.55,z+.9,s)}return}
 if(k==='V'){const tb=top+rh*.3,tw=2.8,th=hh;W.add('stone',box(tw,th,tw),'#e2dac6',x,tb+th/2,z,{shade:.05});W.add('tile',pyrG(2.8),roof,x,tb+th+1.4,z,{sx:3.6,sz:3.6,shade:.1});
  W.add('win',cy2(.8,.8,.15,16),'#fff',x,tb+th*.7,z+tw/2+.05,{rx:PI/2,shade:0});W.add('wood',cy2(.05,.05,2.2,6),'#4a3a2a',x,tb+th+2.9+1,z,{shade:0});W.add('flat',new TH.PlaneGeometry(1.5,.9),'#3f5f8a',x+.75,tb+th+2.9+1.9,z,{shade:0});
  doorF(W,x,yb,fz,2,2.9);torches(W,x,yb+3.5,fz,1.6);for(const q of[-1,1]){winF(W,x+q*w*.3,yb+hh*.32,fz,1)}for(const q of[-1,0,1])winF(W,x+q*w*.3,yb+hh*.76,fz,1)}
 else{doorF(W,x,yb,fz,k==='E'?2.6:1.2,k==='E'?2.3:2.3);if(k!=='H')torches(W,x,yb+2.9,fz,k==='E'?1.75:1.15);
  if(k==='E'){W.add('flat',box(2.4,2.1,.12),'#14100c',x,yb+1.05,fz+.15,{shade:0})}
  else{const lo=hh>4.4?.32:.55;for(const q of[-1,1])winF(W,x+q*w*.3,yb+hh*lo,fz,1);if(hh>4.4)for(const q of[-1,0,1])winF(W,x+q*w*.3,yb+hh*.76,fz,1)}}
 for(const q of[-1,1])winF(W,x+q*w*.25,yb+hh*.55,bz,-1);
 if(k!=='E'&&k!=='V')for(const s of[-1,1])winS(W,x+s*w/2,yb+hh*.55,z,s);
 if(k==='A'||k==='T'){const xs=x+w*.4,ys=yb+hh*.66;W.add('wood',box(.12,.12,1.4),'#3a2a1c',xs,ys,fz+.7,{shade:0});W.add('wood',box(.15,.8,.9),k==='A'?'#7a4a2a':'#5a3a22',xs,ys-.55,fz+1.25,{shade:0});W.add('flat',box(.2,.4,.4),k==='A'?'#e8d9a8':'#d4a93a',xs,ys-.55,fz+1.25,{shade:0});
  for(const [bx,bz2] of(k==='A'?[[-w*.38,.7],[-w*.38+.9,.9]]:[[-w*.38,.7],[-w*.38+.9,.9],[-w*.38+.4,1.7]]))W.add('wood',cy2(.45,.5,1,10),'#7a5232',x+bx,yb+.5,fz+bz2,{cyl:[.45,1],shade:.05});
  if(k==='T'){W.add('wood',box(1.8,.12,.5),'#5a3d26',x-w*.2,yb+.55,fz+.9,{shade:0});for(const s of[-1,1])W.add('wood',box(.12,.5,.4),'#5a3d26',x-w*.2+s*.7,yb+.3,fz+.9,{shade:0})}}
 if(k==='F'){W.add('lava',box(1.5,.9,.1),'#fff',x+w*.3,yb+1.3,fz+.06,{shade:0});W.add('wood',cy2(.35,.4,.7,10),'#5a3d26',x+w*.3,yb+.35,fz+1.6,{shade:0});W.add('flat',box(.9,.35,.5),'#3a3a40',x+w*.3,yb+.85,fz+1.6,{shade:0})}
 if(k==='E'){for(const [hx,hz] of[[-w*.36,.9],[-w*.36+.8,1.3],[-w*.3,1.9]])W.add('flat',box(.9,.6,.9),'#d6b84a',x+hx,yb+.3,fz+hz,{ry:hx,shade:.02});
  W.add('wood',box(2,.4,.6),'#6b4a2a',x+w*.3,yb+.35,fz+1.1,{shade:0});W.add('wood',box(w*.9,.1,.1),'#5a3d26',x,yb+.9,fz+2.2,{shade:0});for(let q=-2;q<=2;q++)W.add('wood',box(.18,1.1,.18),'#5a3d26',x+q*w*.22,yb+.55,fz+2.2,{shade:0})}
 if(k==='I'){W.add('flat',box(1.3,1.7,.08),'#2f4f8a',x+w*.3,yb+hh*.5,fz+.06,{shade:0});W.add('flat',box(.2,1.4,.05),'#e8e8f0',x+w*.3,yb+hh*.5,fz+.1,{shade:0});W.add('flat',box(.9,.2,.05),'#e8e8f0',x+w*.3,yb+hh*.5+.3,fz+.1,{shade:0})}
 if(k==='C'){const tx=x+w/2,tz=z-D*.1,th=hh+2.4;W.add('stone',cy2(1.1,1.2,th,14),'#d9d3c5',tx,yb+th/2,tz,{cyl:[1.15,th],shade:.06});W.add('tile',new TH.ConeGeometry(1.6,3,14),roof,tx,yb+th+1.4,tz,{cyl:[1.6,3.2],shade:.1});
  W.add('flat',box(.9,1.5,.06),'#7a2f3a',x-w*.3,yb+hh*.5,fz+.06,{shade:0});W.add('flat',box(.3,.5,.05),'#d4b04a',x-w*.3,yb+hh*.5+.1,fz+.1,{shade:0})}}
function vprops(W,k,x,z,w,d,i){if(k==='A'||k==='T')return;const a=(i*7+3)%5,px=x-w/2-.9,pz=z+d/2-.5,py=H3(px,pz);W.add('wood',cy2(.45,.5,1,10),'#7a5232',px,py+.5,pz,{cyl:[.45,1],shade:.05});W.add('wood',box(.85,.75,.85),'#9a7448',px+.15,py+.38,pz+.95,{ry:.4+a*.3,shade:.05});if(a%2===0)W.add('wood',box(.6,.55,.6),'#b08850',px+.1,py+1.02,pz+.95,{ry:.9,shade:.05});
 if(k==='H'||k==='E'||k==='C'){const qx=x+w/2+.2,qz=z-d/2-.9,qy=H3(qx,qz);W.add('wood',cy2(.45,.5,1,10),'#6a4a2c',qx,qy+.5,qz,{cyl:[.45,1],shade:.05})}}
const RIT={},RIC={A:'🛏️',F:'🔨',T:'🍺',S:'⛪',E:'🐴',V:'🏛️',I:'🛡️',C:'⚜️',H:'🏠'};
function roofTex(ch){if(RIT[ch])return RIT[ch];const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');const tn=(col)=>{const q=document.createElement('canvas');q.width=q.height=128;const h=q.getContext('2d');h.font='88px serif';h.textAlign='center';h.textBaseline='middle';h.fillText(ch,64,64);h.globalCompositeOperation='source-in';h.fillStyle=col;h.fillRect(0,0,128,128);return q};g.drawImage(tn('#140b06'),3,4);g.drawImage(tn('#f3e2b4'),0,0);return RIT[ch]=new TH.CanvasTexture(c)}
function roofIcons(){for(const [k,x,top,z,w,D,rh] of RQ){const ch=RIC[k]||RIC.H,E=D+.55,L=Math.hypot(E,rh),al=Math.atan2(rh,E),s=Math.min(w*.5,L*.7,3.2),m=new TH.Mesh(new TH.PlaneGeometry(s,s),new TH.MeshLambertMaterial({map:roofTex(ch),transparent:true,opacity:.92,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2}));m.position.set(x,top+rh*.5+Math.cos(al)*.06,z+E*.5+Math.sin(al)*.06);m.rotation.x=-(PI/2-al);villG.add(m)}}
function buildVillageMesh(){
 clearG(villG);TQ=[];SQ=[];GQ=[];RQ=[];const W=new TA(),vd=vdim(),{u}=vd;
 for(const [p,e,it] of u){const k=NK[e]||'H',x=T.x+p[0],z=T.y+p[1],y0=H3(x,z),w=2*BHW(k)+(k==='A'?.8:0),d=k==='A'?6.6:5.4,tier=Math.max(0,tr(k)-(it.rb?1:0));
  const rc=(it.h&&it.h.o!=null&&(S.hero.find(q=>q.id===it.h.o)||{}).col)||'#8b4a3a';
  let f=1;if(it.cn)f=Math.max(0,bstg(it));
  const hh0=(BTOP[k]||6.7)*.5+tier*.45,roof=k==='H'?rc:ROOF[k]||'#8b4a3a';
  if(it.cn&&f<=0)W.add('stone',box(w,.35,d),'#8f8a7d',x,y0+.18,z,{shade:0});
  else{const full=!it.cn||f>=.75;if(k==='M')stall(W,x,y0,z,w,d,roof);else{building(W,k,x,y0,z,w,d,it.cn?hh0*Math.max(.3,f):hh0,roof,tier,full);if(full){lamp(W,x-w/2-1.1,z+d/2+1.4);vprops(W,k,x,z,w,d,it.i)}}}
  if(it.cn||it.rb){const sh=(BTOP[k]||6.7)*.85,hw=w/2+.7;for(const sx of[-1,1])for(const sz of[-1,1])W.add('wood',box(.28,sh,.28),'#9a7a4a',x+sx*hw,y0+sh/2,z+sz*(d/2+.7),{shade:0});
   for(let q=1;q<=3;q++)W.add('wood',box(w+1.6,.2,.28),'#b08850',x,y0+q*sh/3.4,z+d/2+.7,{shade:0})}}
 if(S.pl.length>=4)wellV(W,u);if(S.pl.length>=8)wallV(W,vd,S.pl.length>=12);perimLamps(W,vd);W.build(villG);roofIcons();if(torchG)torchSprites()}
// ---------- héros ----------
function mkHorse(c){const a=new Acc();const hb=c||'#8a5a3a';
 a.add(new TH.CapsuleGeometry(.2,.62,6,12),hb,0,.62,0,{rx:Math.PI/2,sx:1.05,sy:1,shade:.1});
 a.add(new TH.CapsuleGeometry(.09,.3,6,10),hb,0,.88,.46,{rx:.55,shade:.1});
 a.add(new TH.SphereGeometry(.1,12,10),hb,0,1.02,.62,{sz:1.5,shade:.1});
 a.add(new TH.CapsuleGeometry(.07,.2,4,8),dkc(hb,.45),0,.64,-.55,{rx:-.9,shade:0});
 for(const sx of[-1,1])for(const sz of[-1,1])a.add(new TH.CapsuleGeometry(.05,.3,4,8),dkc(hb,.15),sx*.1,.18,sz*.34,{shade:.1});
 const g=new TH.Group();a.mesh(g,.012);return g}
function heroFor(h){let o=HM.get(h.id);const fem=gd(h,h.name)==='♀',hs=!!h.hs,hv=hs?PCOL.hs[(h.id*7)%4]:null;
 if(o&&(o.cls!==h.c||o.fem!==fem||o.hs!==hs)){heroG.remove(o.g);disp(o.g);HM.delete(h.id);o=null}
 if(!o){const m=buildHero(h.c,fem?1:0,{skin:'#ebc58f',hair:PCOL.hr[(h.id*3+1)%6],eye:['#3f78b0','#5a3a22','#3f7a5a','#6a6a78'][h.id%4]}),g=new TH.Group();g.add(m);
  let hor=null;if(hs){hor=mkHorse(hv);g.add(hor);m.position.y=.5;m.position.z=-.05}
  const gl=new TH.Sprite(new TH.SpriteMaterial({map:glowTex(),color:'#ffd37a',blending:TH.AdditiveBlending,depthWrite:false,transparent:true,opacity:0}));const tg=new TH.Group();new Acc().add(cyl(.02,.026,.36),'#5a3a22',0,.1,0,{shade:0}).add(cyl(.03,.02,.06),'#2a1e14',0,.3,0,{shade:0}).mesh(tg,0);const fl=new TH.Sprite(new TH.SpriteMaterial({map:glowTex(),color:'#ff9a2a',blending:TH.AdditiveBlending,depthWrite:false,transparent:true}));fl.scale.set(.2,.26,1);fl.position.y=.36;tg.add(fl);gl.material.color.set('#ffb35a');gl.scale.set(1.5,1.5,1);gl.position.y=.38;tg.add(gl);tg.position.set(0,-.27,.04);tg.rotation.x=-.3;m.userData.arms[1].el.add(tg);tg.visible=false;
  const rg=new TH.Mesh(new TH.RingGeometry(.55,.75,28),new TH.MeshBasicMaterial({color:'#c0392b',transparent:true,opacity:.7,side:TH.DoubleSide,depthWrite:false}));rg.rotation.x=-Math.PI/2;rg.position.y=.03;rg.visible=false;g.add(rg);
  const lt=new TH.Group();new Acc().add(box(.34,.4,.16),'#7a4a24',0,0,0,{shade:0}).add(box(.37,.12,.19),'#a8703a',0,.2,0,{shade:0}).add(box(.08,.1,.02),'#ffd35a',0,.1,.09,{shade:0}).add(cyl(.065,.065,.4),'#6a7a4a',0,.33,0,{rz:PI/2,shade:0}).mesh(lt,0);const lg=new TH.Sprite(new TH.SpriteMaterial({map:glowTex(),color:'#ffe58a',blending:TH.AdditiveBlending,depthWrite:false,transparent:true,opacity:.6}));lg.scale.set(.55,.55,1);lt.add(lg);lt.position.set(0,hs?1.45:.95,-.22);lt.visible=false;g.add(lt);const bs=new TH.Group();for(let i=0;i<3;i++){const st=new TH.Sprite(new TH.SpriteMaterial({map:starTex(),color:'#ffe082',transparent:true,depthTest:false,depthWrite:false}));st.renderOrder=6;st.scale.set(.34,.34,1);bs.add(st)}bs.visible=false;g.add(bs);
  g.scale.setScalar(HS);heroG.add(g);o={g,m,tg,fl,cls:h.c,fem,hs,gl,rg,lt,bs,ry:0,mv:0,ph:Math.random()*6,x:0,z:0,init:0};HM.set(h.id,o)}
 return o}
function hpos(h,BM){const bm=BM.get(h.id);if(bm){const p=bpos(h,bm);return[p[0]/sc,p[1]/sc]}return[h.x+((h.id%3)-1)*1.5,h.y+((h.id%2)-.5)*2]}
function updHeroes(dt,tm){
 const BM=bAssign(),kd=dk(),seen=new Set();
 for(const h of S.hero){const bm=BM.get(h.id);if(hidn(h)&&!bm)continue;seen.add(h.id);const o=heroFor(h),[x,z]=hpos(h,BM),y=H3(x,z);
  if(!o.init){o.x=x;o.z=z;o.init=1}
  const dx=x-o.x,dz=z-o.z,d=Math.hypot(dx,dz);if(d>.004){o.mv=tm;if(d>.01){const ta=Math.atan2(dx,dz);let da=ta-o.ry;da=Math.atan2(Math.sin(da),Math.cos(da));o.ry+=da*Math.min(1,dt*10)}}
  o.x=x;o.z=z;const mv=tm-o.mv<.22&&!bm,fg=h.st==='fight';
  o.g.position.set(x,y,z);if(fg&&h.en&&h.en.nt&&mkind(h.en.n))o.ry=PI/2;o.g.rotation.y=o.ry;o.ph+=dt*(mv?1:.2);
  heroAnim(o.m,o.ph,mv);
  if(fg){const u=o.m.userData;u.arms[1].sh.rotation.x=-1.1+Math.sin(tm*13)*.7;u.arms[1].el.rotation.x=-.5}
  o.rg.visible=fg;if(fg){o.rg.scale.setScalar(1+Math.sin(tm*14)*.12)}
  o.bs.visible=!!h.bless;if(h.bless){for(let i=0;i<3;i++){const a=tm*1.6+i*2.094,s=o.bs.children[i];s.position.set(Math.cos(a)*.8,(hs?1.45:.95)+Math.sin(tm*2+i*2)*.12,Math.sin(a)*.8);s.scale.setScalar(.3+.08*Math.sin(tm*5+i*2))}}o.lt.visible=!!(h.loot&&(h.st==='back'||h.st==='town'));if(o.lt.visible){const sg=o.lt.children[o.lt.children.length-1];if(sg&&sg.material)sg.material.opacity=.5+.3*Math.sin(tm*5+h.id)}
  o.gl.material.opacity=kd*.85;o.gl.visible=kd>0.01;o.tg.visible=kd>.12;if(o.tg.visible){const f=.85+.15*Math.sin(tm*12+h.id*3);o.fl.scale.set(.2*f,.27*f,1);o.gl.scale.setScalar(1.4+.2*f)}
  o.g.visible=true}
 for(const [id,o] of HM)if(!seen.has(id)){if(!S.hero.some(q=>q.id===id)){heroG.remove(o.g);disp(o.g);HM.delete(id)}else o.g.visible=false}
 return BM}
// ---------- ciel / lumière ----------
// ===== v3.3.5 : éclairage de la démo, ciel, lampadaires, volcan, forêts =====
const PL=[[0,'#04081a','#0c1a34','#3a4f86','#1a1f33',.5,1.2,[.78,.86,1.15]],[4,'#050a1e','#0e1c3a','#3a4f86','#1a1f33',.5,1.2,[.8,.88,1.15]],[5,'#2b3f77','#e8905a','#8a8fc0','#3a3040',.6,1.05,[1.12,.95,.82]],[6.5,'#4a7cc4','#b8d0e8','#9fbce8','#6a5a3a',.75,1.05,[1.05,1,.93]],[12,'#3c78d0','#a8cbee','#9fbce8','#6a5a3a',.8,1,[1,1,.97]],[17,'#4a74c0','#e8c89a','#a8b8e0','#6a5a3a',.75,1.05,[1.1,.98,.84]],[20,'#3a3a80','#f07a4a','#b08fa8','#4a3a3a',.6,1.05,[1.15,.9,.78]],[20.7,'#141d44','#3a2f5a','#4a5a90','#252535',.5,1.15,[.9,.88,1.05]],[21.5,'#070c20','#101c38','#3a4f86','#1a1f33',.5,1.2,[.8,.87,1.12]],[24,'#04081a','#0c1a34','#3a4f86','#1a1f33',.5,1.2,[.78,.86,1.15]]];
const CC=a=>new TH.Color(a),SD=new TH.Vector3(),MD=new TH.Vector3();let fill=null,skyM=null,etex=null,ecv=null,GQ=[],GM=null,GD=null;K.bs=.4;K.th=.9;K.tint=[1,1,1];
function palAt(h){let t=0;while(t<PL.length-2&&h>=PL[t+1][0])t++;const e=PL[t],n=PL[t+1],s=smooth(e[0],n[0],h),c=(a,b)=>CC(a).lerp(CC(b),s);return{zen:c(e[1],n[1]),hor:c(e[2],n[2]),hs:c(e[3],n[3]),hg:c(e[4],n[4]),hi:e[5]+(n[5]-e[5])*s,ex:e[6]+(n[6]-e[6])*s,tint:[0,1,2].map(i=>e[7][i]+(n[7][i]-e[7][i])*s)}}
function skyInit(){skyM=new TH.Mesh(new TH.SphereGeometry(2900,24,14),new TH.ShaderMaterial({side:TH.BackSide,depthWrite:false,fog:false,uniforms:{zen:{value:new TH.Color()},hor:{value:new TH.Color()},sunDir:{value:new TH.Vector3(0,1,0)},sunCol:{value:new TH.Color()},moonDir:{value:new TH.Vector3(0,-1,0)},night:{value:0},flash:{value:0}},
 vertexShader:'varying vec3 vP;void main(){vP=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
 fragmentShader:'varying vec3 vP;uniform vec3 zen,hor,sunDir,sunCol,moonDir;uniform float night,flash;float h21(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}void main(){vec3 d=normalize(vP);float hh=clamp(d.y,0.,1.);vec3 c=mix(hor,zen,pow(hh,.5));float sd=max(dot(d,sunDir),0.);c+=sunCol*(pow(sd,300.)*2.2+pow(sd,12.)*.22);float md=max(dot(d,moonDir),0.);c+=vec3(.75,.8,1.)*(smoothstep(.9993,.9997,md)*1.4+pow(md,40.)*.07)*night;vec2 uv=vec2(atan(d.x,d.z),asin(clamp(d.y,-1.,1.)))*55.;float s=h21(floor(uv));c+=vec3(step(.9965,s)*night*smoothstep(.08,.35,d.y));c+=flash*vec3(.5,.55,.8)*.4;gl_FragColor=vec4(c,1.);\n#include <tonemapping_fragment>\n#include <colorspace_fragment>\n}'}));skyM.renderOrder=-10;skyM.frustumCulled=false;scn.add(skyM)}
function updLight(){
 const x=(6+24*(S.t-S.ds)/S.dl)%24,kd=dk(),pl=palAt(x),wm=wxMix(),wvl=wm[0],wfg=wm[2],cl=Math.min(1,wvl*2.4),r=(x-5)/16*PI,a=Math.sin(r),o=((x+3)%24)/8*PI,l=Math.sin(o),c=1-smooth(-.06,.2,a);
 SD.set(Math.cos(r)*85,Math.sin(r)*70,-40).normalize();MD.set(Math.cos(o)*85,Math.sin(o)*70,-40).normalize();
 const dy=a>-.02?SD:MD,gr=(pl.hor.r+pl.hor.g+pl.hor.b)/3,gz=(pl.zen.r+pl.zen.g+pl.zen.b)/3;
 sun.position.set(K.tx+dy.x*240,Math.max(25,dy.y*240),K.tz+dy.z*240);sun.target.position.set(K.tx,0,K.tz);sun.target.updateMatrixWorld();
 if(a>-.02){const E=smooth(0,.45,a);sun.color.setRGB(1,.52+.4*E,.26+.52*E);sun.intensity=2.2*smooth(-.02,.3,a)*(1-.72*cl)}else{sun.color.setRGB(.55,.65,1);sun.intensity=.62*smooth(0,.35,l)*(1-.6*cl)}
 if(fill){fill.position.set(K.tx+20,60,K.tz+120);fill.target.position.set(K.tx,0,K.tz);fill.target.updateMatrixWorld();fill.intensity=.45*(.25+.75*(1-c))*(1-.5*cl)}
 const hz=pl.hor.clone().lerp(new TH.Color(gr*.95,gr,gr*1.06),.7*cl),zn=pl.zen.clone().lerp(new TH.Color(gz*.95,gz,gz*1.05),.75*cl);
 if(skyM){const u=skyM.material.uniforms;u.zen.value.copy(zn);u.hor.value.copy(hz);u.sunDir.value.copy(SD);u.moonDir.value.copy(MD);u.sunCol.value.setRGB(1,.62+.3*smooth(0,.4,a),.35+.45*smooth(0,.4,a)).multiplyScalar(1-.9*cl);u.night.value=c*(1-.85*cl);u.flash.value=WX.fl;skyM.position.copy(cam3.position)}
 scn.background=hz;scn.fog.color.copy(hz);scn.fog.near=700-wfg*560;scn.fog.far=2300-wfg*1600;
 hemi.color.copy(pl.hs);hemi.groundColor.copy(pl.hg);hemi.intensity=pl.hi*(1+.3*cl)+WX.fl*2.6;ren.toneMappingExposure=pl.ex*(1-.1*cl);
 K.bs=.4+.4*c+WX.fl*.6;K.th=.9-.15*c;K.tint=pl.tint.map(v=>v+(1-v)*.35*cl);
 const wg=Math.min(1,kd*1.3)*2.6;txm('win').emissiveIntensity=wg;txm('winv').emissiveIntensity=wg}
// ----- bruit pour la lave et le relief du volcan -----
const rn2=(x,y,s)=>.5+.5*Math.sin(x*s*1.7+Math.sin(y*s*1.3)*2.1)*Math.cos(y*s*1.9-Math.sin(x*s*1.1)*1.7),rid=(x,y)=>1-Math.abs(rn2(x,y,.09)+rn2(x+50,y,.23)-1);
function paintLava(){const vo=ZA.find(z=>z.n==='Volcan'),S2=1.25,w=Math.round(WXd*S2),h=Math.round(WYd*S2);if(!ecv)ecv=document.createElement('canvas');if(ecv.width!==w){ecv.width=w;ecv.height=h}
 const g=ecv.getContext('2d');g.fillStyle='#000';g.fillRect(0,0,w,h);
 if(vo){const r=ZRD('Volcan'),x0=Math.max(0,Math.floor((vo.x-r)*S2)),y0=Math.max(0,Math.floor((vo.y-r)*S2)),x1=Math.min(w,Math.ceil((vo.x+r)*S2)),y1=Math.min(h,Math.ceil((vo.y+r)*S2)),im=g.getImageData(x0,y0,x1-x0,y1-y0),d=im.data;
  for(let py=y0;py<y1;py++)for(let px=x0;px<x1;px++){const wx=px/S2,wy=py/S2,q=Math.hypot(wx-vo.x,wy-vo.y)/r;let it=0;
   if(q<.8&&q>.1){const N=.5*(rn2(wx,wy,.06)+rn2(wx+31,wy+17,.17)),v=Math.abs(N-.5);if(v<.05)it=(1-v/.05)*Math.min(1,(.8-q)/.25)*Math.min(1,(q-.1)/.05)}
   if(q<=.1)it=Math.max(it,1-q/.1*.35);
   if(it>0){const k=((py-y0)*(x1-x0)+(px-x0))*4;d[k]=255*it;d[k+1]=105*it;d[k+2]=18*it;d[k+3]=255}}
  g.putImageData(im,x0,y0)}
 if(!etex){etex=new TH.CanvasTexture(ecv);etex.colorSpace=TH.SRGBColorSpace}else etex.needsUpdate=true}
const VG={ok:0};function vgUpd(tm){const vo=ZA.find(z=>z.n==='Volcan');if(!vo)return;if(!VG.ok){VG.s=new TH.Sprite(new TH.SpriteMaterial({map:glowTex(),color:'#ff7a2a',blending:TH.AdditiveBlending,depthWrite:false,transparent:true,fog:false}));scn.add(VG.s);VG.ok=1}
 VG.s.position.set(vo.x,H3(vo.x,vo.y)+3,vo.y);const f=.85+.15*Math.sin(tm*2.3)+.06*Math.sin(tm*7);VG.s.scale.setScalar(48*f);VG.s.material.opacity=K.dist<700?.8:.35}
// ----- lampadaires (contour du village et entrées des bâtiments) -----
function lamp(W,x,z){const y0=H3(x,z);W.add('wood',cy2(.16,.22,4.6,6),'#2b2420',x,y0+2.3,z,{shade:0});W.add('wood',box(.95,.18,.95),'#2b2420',x,y0+4.7,z,{shade:0});W.add('lava',box(.6,.85,.6),'#fff',x,y0+5.2,z,{shade:0});W.add('wood',box(1,.16,1),'#2b2420',x,y0+5.75,z,{shade:0});TQ.push([x,y0+5.25,z,9]);GQ.push([x,z,9])}
function perimLamps(W,vd){const rx=vd.rx-1.8,ry=vd.ry-1.8,N=Math.max(5,Math.min(10,Math.round(Math.PI*(rx+ry)/26)));
 for(let i=0;i<N;i++){const a=i/N*6.2832+.35,x=T.x+Math.cos(a)*rx,z=T.y+Math.sin(a)*ry;let bad=nearRiver(x,z,2);for(const q of ZA){const p=RD[q.n];if(p)for(let k=0;k<p.length&&!bad;k+=1)if(Math.hypot(p[k][0]-x,p[k][1]-z)<5)bad=true}if(!bad)lamp(W,x,z)}}
let OUTP=null;
// ===== v3.3.3 : météo 3D (pluie qui touche le sol, nuages, brouillard, orage) =====
const RN=900,SPN=140,WX={ok:0,bs:-1,si:0,fl:0,cl:[],sp:[],cyc:new Int32Array(RN),px:new Float32Array(RN),pz:new Float32Array(RN),ph:new Float32Array(RN)},UM=new TH.Object3D();
function wxInit(){const R=rg3(404);for(let i=0;i<RN;i++){WX.px[i]=R()*4000;WX.pz[i]=R()*4000;WX.ph[i]=R()}
 const g=new TH.BufferGeometry();g.setAttribute('position',new TH.BufferAttribute(new Float32Array(RN*6),3));
 WX.rain=new TH.LineSegments(g,new TH.LineBasicMaterial({color:'#c4d6ee',transparent:true,opacity:.55,depthWrite:false,fog:false}));WX.rain.frustumCulled=false;WX.rain.visible=false;scn.add(WX.rain);
 WX.spl=new TH.InstancedMesh(new TH.RingGeometry(.3,.5,10).rotateX(-PI/2),new TH.MeshBasicMaterial({color:'#dbe8f6',transparent:true,opacity:.6,depthWrite:false,side:TH.DoubleSide}),SPN);WX.spl.frustumCulled=false;WX.spl.visible=false;scn.add(WX.spl);
 for(let i=0;i<SPN;i++)WX.sp.push({x:0,y:0,z:0,a:9});
 const c=document.createElement('canvas');c.width=c.height=128;const cg=c.getContext('2d');for(let i=0;i<14;i++){const x=30+R()*68,y=44+R()*40,r=16+R()*22,q=cg.createRadialGradient(x,y,0,x,y,r);q.addColorStop(0,'rgba(255,255,255,.55)');q.addColorStop(1,'rgba(255,255,255,0)');cg.fillStyle=q;cg.fillRect(0,0,128,128)}
 const ct=new TH.CanvasTexture(c);for(let i=0;i<16;i++){const s=new TH.Sprite(new TH.SpriteMaterial({map:ct,color:'#ffffff',transparent:true,depthWrite:false,fog:false,opacity:0}));s.userData={u:R()*2-1,v:R()*2-1,w:R()*.004+.002};s.scale.set(240+R()*200,130+R()*70,1);s.visible=false;scn.add(s);WX.cl.push(s)}
 const bg=new TH.BufferGeometry();bg.setAttribute('position',new TH.BufferAttribute(new Float32Array(3*2*14*3),3));WX.bolt=new TH.LineSegments(bg,new TH.LineBasicMaterial({color:'#eef4ff',fog:false,depthWrite:false}));WX.bolt.frustumCulled=false;WX.bolt.visible=false;scn.add(WX.bolt);
 WX.bg=new TH.Sprite(new TH.SpriteMaterial({map:glowTex(),color:'#ffffff',blending:TH.AdditiveBlending,depthWrite:false,transparent:true,fog:false}));WX.bg.scale.set(60,60,1);WX.bg.visible=false;scn.add(WX.bg)}
function boltGen(x,z){const P=WX.bolt.geometry.attributes.position.array,R=rg3(WX.bs*7+3),gy=H3(x,z);let k=0;
 for(let s=0;s<3;s++){let px=x+(s?(R()-.5)*14:0),pz=z+(s?(R()-.5)*14:0),py=360;const ty=gy;
  for(let i=0;i<14;i++){const ny=py-(py-ty)/(14-i)*(i===13?1:(.7+R()*.6)),nx=i===13?x:px+(R()-.5)*22*(s?1.4:1),nz=i===13?z:pz+(R()-.5)*22*(s?1.4:1);
   P[k++]=px;P[k++]=py;P[k++]=pz;P[k++]=nx;P[k++]=Math.max(ty,ny);P[k++]=nz;px=nx;pz=nz;py=Math.max(ty,ny)}}
 WX.bolt.geometry.attributes.position.needsUpdate=true;WX.bg.position.set(x,gy+3,z)}
function wxUpd(dt,tm){
 if(!WX.ok){wxInit();WX.ok=1}
 const w=wxMix(),vl=w[0],rn=w[1],th=w[3],kd=dk(),hb=Math.min(300,Math.max(70,K.dist*.62)),cx0=K.tx,cz0=K.tz,s2=hb*2,n=Math.round(RN*Math.min(1,rn)*Math.max(.45,K.pf)),on=n>2;
 WX.rain.visible=on;WX.spl.visible=on;
 if(on){const P=WX.rain.geometry.attributes.position.array,len=3.2*Math.max(1,K.dist/170),top=95*Math.max(1,K.dist/260),sp=(th>.5?1.7:1.3)*.9;
  for(let i=0;i<n;i++){const x=cx0-hb+(((WX.px[i]-(cx0-hb))%s2)+s2)%s2,z=cz0-hb+(((WX.pz[i]-(cz0-hb))%s2)+s2)%s2,gy=H3(x,z),f=tm*sp+WX.ph[i],c=Math.floor(f),p=f-c,y=gy+top*(1-p),y0=Math.max(gy,y);
   if(WX.cyc[i]!==c){WX.cyc[i]=c;if(Math.hypot(x-cx0,z-cz0)<hb*.9){const q=WX.sp[WX.si++%SPN];q.x=x;q.y=gy+.1;q.z=z;q.a=0}}
   P[i*6]=x;P[i*6+1]=y0;P[i*6+2]=z;P[i*6+3]=x-len*.18;P[i*6+4]=Math.max(y+len,y0+.2);P[i*6+5]=z}
  WX.rain.geometry.setDrawRange(0,n*2);WX.rain.geometry.attributes.position.needsUpdate=true;
  const zs=Math.max(.7,K.dist/200);for(let i=0;i<SPN;i++){const q=WX.sp[i];q.a+=dt;const r=q.a<.32?(.5+q.a*8)*zs:0;UM.position.set(q.x,q.y,q.z);UM.scale.set(r||.0001,1,r||.0001);UM.updateMatrix();WX.spl.setMatrixAt(i,UM.matrix)}WX.spl.instanceMatrix.needsUpdate=true}
 const fade=Math.max(0,Math.min(1,(380-cam3.position.y)/160));
 WX.cl.forEach((s,i)=>{const d=s.userData;d.u+=dt*d.w;if(d.u>1)d.u-=2;const op=Math.min(.9,(i<4?.3:0)+vl*3)*(1-.8*kd)*fade;s.material.opacity=op;s.visible=op>.01;s.position.set(cx0+d.u*900,340,cz0+d.v*900);s.material.color.set(th>.3?'#69727f':vl>.15?'#b9c1cb':'#ffffff')});
 let fl=0;if(th>.3){const Tt=9,s=Math.floor(tm/Tt),r=jt(s,17);if(r<.8){const d=tm-(s*Tt+r*Tt*.8);if(d>=0&&d<.5){fl=(d<.12?1:d<.2?.25:d<.3?.9:1-(d-.3)/.2)*th;if(WX.bs!==s){WX.bs=s;boltGen(cx0+(jt(s,21)-.5)*hb*1.4,cz0+(jt(s,23)-.5)*hb*1.4)}}}}
 WX.fl=fl;WX.bolt.visible=fl>.2;WX.bg.visible=fl>.2;WX.bg.material.opacity=Math.min(1,fl)}
// ===== torches : porte des bâtiments à PNJ (flammes + halos la nuit) =====
let TQ=[],torchG=null;
function torches(W,x,y,zf,dx){for(const s of[-1,1]){const tx=x+s*dx;W.add('wood',box(.1,.1,.4),'#2a1e14',tx,y-.15,zf+.2,{shade:0});W.add('wood',cy2(.05,.06,.7,6),'#4a3322',tx,y+.15,zf+.4,{shade:0});W.add('lava',box(.2,.28,.2),'#fff',tx,y+.62,zf+.4,{shade:0});TQ.push([tx,y+.75,zf+.4])}GQ.push([x,zf+1.5,8])}
function torchSprites(){while(torchG.children.length){const c=torchG.children.pop();if(c.geometry&&!c.isSprite)c.geometry.dispose()}GD=null;
 TQ.forEach((p,i)=>{const s=new TH.Sprite(new TH.SpriteMaterial({map:glowTex(),color:'#ff9a40',blending:TH.AdditiveBlending,depthWrite:false,transparent:true,opacity:0}));s.position.set(p[0],p[1],p[2]);s.scale.set(5,5,1);s.userData.i=i;s.userData.sz=p[3]||5;torchG.add(s)});
 if(GQ.length){if(!GM)GM=new TH.MeshBasicMaterial({map:glowTex(),color:'#ff9a40',blending:TH.AdditiveBlending,depthWrite:false,transparent:true,opacity:0,polygonOffset:true,polygonOffsetFactor:-2,fog:false});
  const m=new TH.InstancedMesh(new TH.PlaneGeometry(1,1).rotateX(-PI/2),GM,GQ.length),o=new TH.Object3D();GQ.forEach((q,i)=>{o.position.set(q[0],H3(q[0],q[1])+.12,q[1]);o.scale.set(q[2]*2,1,q[2]*2);o.updateMatrix();m.setMatrixAt(i,o.matrix)});m.frustumCulled=false;m.renderOrder=1;torchG.add(m);GD=m}}
function torchUpd(tm){const kd=dk(),on=Math.min(1,kd*1.2);for(const s of torchG.children){if(!s.isSprite)continue;const f=.8+.2*Math.sin(tm*11+s.userData.i*2.3)*Math.sin(tm*7.3+s.userData.i);s.material.opacity=on*f;s.visible=kd>.02;s.scale.setScalar(s.userData.sz*(.9+.12*f))}if(GM){GM.opacity=on*.34;if(GD)GD.visible=kd>.02}if(WPT){WPT.material.opacity=on*(.85+.1*Math.sin(tm*9));WPT.visible=kd>.02}if(WGM){WGM.opacity=on*.5;if(WGD)WGD.visible=kd>.02}}
// ===== puits et enceinte =====
function wellV(W,u){let best=null,bs=-1e9;for(let px=-11;px<=11;px+=1.5)for(let pz=-9;pz<=9;pz+=1.5){const x=T.x+px,z=T.y+pz;let m=1e9;for(const [p,e] of u){const k=NK[e]||'H',bx=T.x+p[0],bz=T.y+p[1],w=2*BHW(k)+(k==='A'?.8:0),d=k==='A'?6.6:5.4,dx=Math.max(Math.abs(x-bx)-w/2,0),dz=Math.max(Math.abs(z-bz)-d/2,0);m=Math.min(m,Math.hypot(dx,dz))}
  const sc=Math.min(m,6)-Math.hypot(px,pz)*.05;if(sc>bs&&!nearRiver(x,z,3)){bs=sc;best=[x,z]}}
 if(!best)return;const [x,z]=best,y0=H3(x,z);
 W.add('stone',cy2(1.45,1.55,1.1,16),'#9a9488',x,y0+.5,z,{cyl:[1.5,1.1],shade:.05});W.add('flat',cy2(1.2,1.2,.1,16),'#2a5a78',x,y0+1.02,z,{shade:0});
 for(const s of[-1,1])W.add('wood',box(.22,2.6,.22),'#5a3d26',x+s*1.35,y0+1.9,z,{shade:.04});
 W.add('wood',cy2(.1,.1,3,8),'#4a3322',x,y0+3,z,{rz:PI/2,shade:0});W.add('tile',gableG(3.6,2.4,1.1),'#8b4a3a',x,y0+3.2,z,{ry:PI/2,shade:.06});
 W.add('wood',cy2(.2,.17,.3,8),'#6b4a2a',x+.6,y0+1.6,z,{shade:0});W.add('wood',cy2(.02,.02,1,4),'#3a2a1a',x+.6,y0+2.3,z,{shade:0})}
function wallV(W,vd,st){const rx=vd.rx,ry=vd.ry,N=Math.ceil(Math.PI*(rx+ry)/(st?3.4:1.25)),gates=[];
 for(const z of ZA){const p=RD[z.n];if(!p)continue;for(let k=p.sh||0;k<p.length;k++){const q=p[k];if(((q[0]-T.x)/rx)**2+((q[1]-T.y)/ry)**2>=.9){gates.push(q);break}}}
 const gc=st?4.8:3.8,ep=a=>[T.x+Math.cos(a)*rx,T.y+Math.sin(a)*ry],tg=a=>Math.atan2(Math.cos(a)*ry,-Math.sin(a)*rx),L=Math.PI*(rx+ry)/N*(st?1.08:1);
 for(let i=0;i<N;i++){const a=i/N*6.2832,[x,z]=ep(a);if(gates.some(g=>Math.hypot(g[0]-x,g[1]-z)<gc)||nearRiver(x,z,2))continue;const y0=H3(x,z),ro=-tg(a);
  if(st){W.add('stone',box(L,4.2,1.2),'#a8a296',x,y0+1.6,z,{ry:ro,shade:.05});if(i%2)W.add('stone',box(L*.55,.7,1.3),'#a8a296',x,y0+4.05,z,{ry:ro,shade:0})}
  else{const h=3.2+hs(i,1,2)*.9;W.add('wood',box(.62,h,.62),'#8a6a42',x,y0+h/2-.4,z,{shade:.06});W.add('wood',new TH.ConeGeometry(.44,.8,5),'#8a6a42',x,y0+h-.4+.4,z,{shade:0});
   if(i%3===0)for(const hy of[1.1,2.3])W.add('wood',box(L*3,.18,.22),'#5a3d26',x+Math.cos(ro)*L,y0+hy,z-Math.sin(ro)*L,{ry:ro,shade:0})}}
 for(const g of gates){const a=Math.atan2((g[1]-T.y)/ry,(g[0]-T.x)/rx),[x,z]=ep(a),ta=tg(a),tx=Math.cos(ta),tz=Math.sin(ta);
  for(const s of[-1,1]){const px=x+tx*s*(gc*.6),pz=z+tz*s*(gc*.6),y0=H3(px,pz);
   W.add(st?'stone':'wood',box(2.8,st?6.6:5.6,2.8),st?'#b4aea2':'#8a6a42',px,y0+(st?2.7:2.2),pz,{shade:.06});W.add('tile',pyrG(2.6),st?'#6a4a8a':'#8b4a3a',px,y0+(st?6:5)+1.3,pz,{sx:3.6,sz:3.6,shade:.1})}}}
// ===== PNJ du village (3D) =====
const NPG=new Map();let npcG=null;
function buildNpc(r,fem,id){const v=NPV[r],c=v.c,hairC=PCOL.hr[(id*3+1)%6],skin='#ebc58f',R=new TH.Group(),body=new TH.Group();R.add(body);const H=.5,sx=fem?.92:1.04;
 for(const s of[-1,1])new Acc().add(cap(.085,.3),'#4a3f35',s*.1,H*.5,0).add(sph(.1),'#2b2118',s*.1,.06,.04,{sy:.7,sz:1.4}).mesh(body,.012);
 const T3=new TH.Group();T3.position.set(0,H,0);body.add(T3);const t=new Acc(),h=new Acc();
 if(fem||r==='S'||r==='C'||r==='V')t.add(new TH.CylinderGeometry(.2,.34,.62,18),c,0,-.12,0,{shade:.12});
 t.add(cap(.2,.3),c,0,.27,0,{sx:sx,sz:.88});t.add(tor(.2,.03),'#5a3a22',0,.1,0,{rx:PI/2,sx:sx,sy:.86});
 if(r==='A'||r==='T')t.add(box(.32,.42,.03),'#f1ece0',0,.1,.19,{shade:0});if(r==='F')t.add(box(.34,.5,.03),'#6b4a2a',0,.12,.2,{shade:0});
 if(r==='S')t.add(box(.05,.17,.02),'#e6bd54',0,.34,.2,{shade:0}).add(box(.13,.04,.02),'#e6bd54',0,.37,.2,{shade:0});
 if(r==='V')t.add(tor(.16,.014),'#e6bd54',0,.45,.04,{rx:PI/2,sy:.9,shade:0});
 if(r==='I')t.add(tor(.035,.01),'#d4b04a',.18,.08,.12,{shade:0}).add(box(.03,.1,.01),'#d4b04a',.18,.0,.12,{shade:0});
 t.add(cyl(.075,.085,.22),skin,0,.56,0,{shade:0});t.mesh(T3);
 const hy=.82;h.add(sph(.18),skin,0,hy,0,{sx:.95}).add(sph(.02),'#3a2a1e',.065,hy+.02,.16,{shade:0}).add(sph(.02),'#3a2a1e',-.065,hy+.02,.16,{shade:0});
 h.add(sph(.19,0,6.2832,0,1.9),hairC,0,hy+.01,-.02,{shade:.1});if(fem)h.add(cap(.13,.5),hairC,0,hy-.38,-.15,{sx:1.3,sz:.75,shade:.1});
 if(r==='T')h.add(sph(.2),'#8a3b3b',0,hy+.12,0,{sy:.4,sx:1.1});
 if(r==='S')h.add(sph(.22,0,6.2832,0,1.7),v.h,0,hy+.01,-.03,{shade:.1});
 if(r==='E')h.add(cyl(.34,.34,.03),v.h,0,hy+.12,0,{shade:0}).add(cyl(.17,.2,.14),v.h,0,hy+.2,0,{shade:0});
 if(r==='V')h.add(cyl(.19,.21,.28),v.h,0,hy+.3,0,{shade:0}).add(cyl(.28,.28,.03),v.h,0,hy+.14,0,{shade:0});
 if(r==='I')h.add(sph(.21,0,6.2832,0,1.7),v.h,0,hy+.02,0,{shade:.1}).add(box(.04,.14,.03),v.h,0,hy-.02,.2,{shade:0});
 if(r==='C')h.add(cyl(.2,.2,.18),v.h,0,hy+.2,0,{shade:0}).add(cyl(.205,.205,.04),'#d4b04a',0,hy+.13,0,{shade:0});
 h.mesh(T3,.012);
 const arms=[];for(const s of[-1,1]){const sh=new TH.Group();sh.position.set(s*(sx*.215+.06),.45,0);T3.add(sh);new Acc().add(cap(.068,.18),c,0,-.14,0).mesh(sh);
  const el=new TH.Group();el.position.set(0,-.3,0);sh.add(el);const a=new Acc().add(cap(.062,.16),c,0,-.13,0).add(sph(.07),skin,0,-.29,.01,{shade:0});
  if(s===1){const x=v.x;if(x==='mug')a.add(cyl(.06,.055,.11),'#c9a24a',0,-.3,.08,{shade:0});if(x==='hammer')a.add(cyl(.02,.02,.46),'#6b4a2a',0,-.3,.05,{rx:PI/2,shade:0}).add(box(.1,.1,.18),'#555a66',0,-.3,.28,{shade:0});
   if(x==='fork')a.add(cyl(.018,.018,1.1),'#6b4a2a',0,-.1,.05,{shade:0}).add(box(.2,.03,.03),'#9a9aa2',0,.42,.05,{shade:0});if(x==='scroll')a.add(cyl(.04,.04,.2),'#f1ece0',0,-.3,.08,{rz:PI/2,shade:0});if(x==='keys')a.add(tor(.05,.012),'#d4b04a',0,-.34,.06,{shade:0})}
  a.mesh(el);let hg=null;if(s===1&&r!=='F'){hg=new TH.Group();new Acc().add(cyl(.02,.02,.46),'#6b4a2a',0,-.3,.05,{rx:PI/2,shade:0}).add(box(.1,.1,.18),'#555a66',0,-.3,.28,{shade:0}).mesh(hg,0);hg.visible=false;el.add(hg)}arms.push({sh,el,hg})}
 R.userData={arms,T:T3,v};return R}
function npcPos(k,it){const kk=NK[it.e]||'H',p=slot(it),w=2*BHW(kk)+(kk==='A'?.8:0),d=kk==='A'?6.6:5.4;return[T.x+p[0]+w/2+1.3,T.y+p[1]+d/2-.4]}
function updNpc(dt,tm){const seen=new Set();
 for(const k in S.npc){const it=S.pl.find(x=>x.e===NE[k]);if(!it||it.cn||!NPV[k])continue;const n=S.npc[k],fem=gd(n,n.n)==='♀',id=hid(n.n);seen.add(k);let o=NPG.get(k);
  if(o&&(o.fem!==fem||o.id!==id)){npcG.remove(o.g);disp(o.g);NPG.delete(k);o=null}
  if(!o){const m=buildNpc(k,fem?1:0,id),g=new TH.Group();g.add(m);g.scale.setScalar(HS);npcG.add(g);o={g,m,fem,id};NPG.set(k,o)}
  const [x,z]=npcPos(k,it),u=o.m.userData,a=npcAct(k);o.g.position.set(x,H3(x,z),z);o.g.rotation.y=Math.sin(tm*.4+id)*.25+.15;
  u.T.scale.y=1+Math.sin(tm*2+id)*.012;u.T.rotation.z=Math.sin(tm*1.3+id)*.015;
  const ar=u.arms[1];if(ar.hg)ar.hg.visible=a===2;if(a>0&&(k==='F'||a===2))ar.sh.rotation.x=-1.1+Math.sin(tm*8)*.55;else if(a>0)ar.sh.rotation.x=-.5+Math.sin(tm*4+id)*.25;else ar.sh.rotation.x=-.12+Math.sin(tm*1.5+id)*.04;ar.el.rotation.x=a>0?-.5:-.15}
 for(const [k,o] of NPG)if(!seen.has(k)){npcG.remove(o.g);disp(o.g);NPG.delete(k)}}
// ===== monstres 3D (silhouettes par famille) =====
const GHM=MAT.clone();GHM.transparent=true;GHM.opacity=.62;GHM.depthWrite=false;
const SZ={wolf:1,fox:.8,boar:1.05,goat:1,bear:1.3,rat:.6,spider:.7,jailer:1.12,goblin:.78,kobold:.72,orc:1.15,bat:.7,harpy:1,eagle:1,condor:1.15,skel:1,spectre:1.05,ghost:1,lich:1.1,dryad:1.05,tree:1.45,wisp:.85,worm:1.1,troll:1.35,golem:1.3,giant:1.7,salam:1,elem:1.2,dragon:1.15,demon:1.35,dking:1.9,shade:1.1,soul:1.05,were:1.1,yeti:1.45,griffon:1.2,garg:1.1,chimera:1.3,basil:1.05,hydra:1.4,knight:1.15,caster:1,champ:1.35};
function monH(c,d,o){const g=new TH.Group(),b=o.bulk||1,sk=o.sk||'#9a8a6a',R=new TH.Group();g.add(R);
 const lg=new Acc();for(const s of[-1,1])lg.add(cap(.09*b,.34),d,s*.1*b,.34,0).add(sph(.1*b),d,s*.1*b,.06,.05,{sy:.7,sz:1.4});lg.mesh(R,.012);
 const T3=new TH.Group();T3.position.set(0,.55,0);R.add(T3);const t=new Acc();t.add(cap(.22*b,.34),c,0,.3,0,{sz:.88}).add(sph(.2*b),dkc(c,.15),0,.02,0,{sy:.7});
 if(o.armor)for(const s of[-1,1])t.add(sph(.11*b),d,s*.27*b,.56,0,{sy:.7});if(o.robe)t.add(new TH.CylinderGeometry(.22*b,.42*b,.74,18),c,0,-.22,0);
 t.mesh(T3,.012);const hh=new Acc(),hy=.88,hr=.18*(o.head||1),ey=o.eye||'#ffd04a';
 hh.add(sph(hr),sk,0,hy,0,{sx:.95}).add(sph(.03),ey,.07,hy+.02,hr*.88,{shade:0}).add(sph(.03),ey,-.07,hy+.02,hr*.88,{shade:0});
 if(o.helm)hh.add(sph(hr*1.1,0,6.2832,0,1.8),d,0,hy+.02,0,{shade:.1});if(o.hood)hh.add(sph(hr*1.22,0,6.2832,0,1.75),dkc(c,.2),0,hy+.02,-.03,{shade:.1});
 if(o.ears)for(const s of[-1,1])hh.add(cone(.05,.22),sk,s*hr*1.05,hy+.02,0,{rz:-s*1.3,shade:0});
 if(o.tusks)for(const s of[-1,1])hh.add(cone(.025,.12),'#f1ece0',s*.07,hy-.1,hr*.8,{rx:.2,shade:0});
 if(o.horns)for(const s of[-1,1])hh.add(cone(.04,.22),'#e8dcc0',s*.12,hy+hr*.9,0,{rz:-s*.5,shade:0});
 if(o.crown==='crown')hh.add(cyl(.17,.17,.08),'#e6bd54',0,hy+hr*.92,0,{shade:0});if(o.crown==='plume')hh.add(cone(.04,.3),'#c0392b',0,hy+hr*1.2,-.05,{rx:-.4,shade:0});if(o.crown==='leaf')hh.add(sph(.2,0,6.2832,0,1.6),'#3f8a3a',0,hy+.04,-.03,{shade:.1});
 hh.mesh(T3,.012);
 const arm=s=>{const sh=new TH.Group();sh.position.set(s*(.27*b+.05),.5,0);T3.add(sh);new Acc().add(cap(.07*b,.34),c,0,-.2,0).add(sph(.08*b),sk,0,-.42,.01,{shade:0}).mesh(sh,.012);return sh},ra=arm(1);arm(-1);
 const w=o.w,wa=new Acc();if(w==='sword')wa.add(box(.05,.8,.015),'#dfe4ec',0,-.85,.06,{shade:0}).add(box(.2,.04,.05),'#6a4a2a',0,-.45,.06,{shade:0});
 if(w==='club')wa.add(cyl(.045,.08,.7),'#6a4a2a',0,-.75,.06,{shade:.05}).add(sph(.12),'#5a3e22',0,-1.05,.06,{shade:.05});
 if(w==='axe')wa.add(cyl(.03,.03,.9),'#6a4a2a',0,-.7,.06,{shade:0}).add(box(.05,.3,.22),'#aab0b8',0,-1.05,.14,{shade:0});
 if(w==='staff')wa.add(cyl(.025,.03,1.5),'#6a4a2a',0,-.6,.06,{shade:0}).add(sph(.08),'#b8f4ff',0,.15,.06,{shade:0});
 if(w)wa.mesh(ra,.01);
 return{g,anim:(t,a)=>{ra.rotation.x=-.9+Math.sin(t*9)*.9;T3.rotation.x=Math.sin(t*3)*.03},wide:b,fly:0}}
function monQ(c,d,o){const g=new TH.Group(),b=o.bulk||1,L=o.len||.7,r=.2*b,a=new Acc();
 a.add(cap(r,L),c,0,.5*b,0,{rx:PI/2,shade:.1}).add(sph(.15*b),c,0,.62*b,L/2+r*.9).add(cone(.075*b,.22*b),d,0,.58*b,L/2+r*.9+.18*b,{rx:PI/2,shade:0});
 for(const s of[-1,1]){a.add(cone(.05*b,.16*b),c,s*.08*b,.8*b,L/2+r*.75,{shade:0});a.add(sph(.025),o.eye||'#ffd04a',s*.07*b,.67*b,L/2+r*1.3,{shade:0})}
 a.add(cap(.05*b,.4*b),c,0,.6*b,-L/2-r*.7,{rx:-.8,shade:0});if(o.tail)a.add(cap(.045*b,.5*b),d,0,.62*b,-L/2-r*1.2,{rx:-1.1,shade:0});
 for(const sx of[-1,1])for(const sz of[-1,1])a.add(cap(.055*b,.28*b),d,sx*.12*b,.22*b,sz*L*.36);
 if(o.horns)for(const s of[-1,1])a.add(cone(.04*b,.3*b),'#e8dcc0',s*.09*b,.82*b,L/2+r*.6,{rz:-s*.5,shade:0});
 if(o.tusks)for(const s of[-1,1])a.add(cone(.03*b,.16*b),'#f1ece0',s*.09*b,.55*b,L/2+r*1.3,{rx:-.5,shade:0});
 if(o.mane)a.add(cap(.17*b,.3),d,0,.74*b,L/2-r*.2,{rx:.5,shade:.05});if(o.crest)for(let i=0;i<5;i++)a.add(cone(.04*b,.14*b),d,0,.72*b,L/2-i*L/4,{shade:0});
 let wings=null;if(o.wings){wings=[];for(const s of[-1,1]){const wg=new TH.Group();wg.position.set(s*.15*b,.72*b,0);g.add(wg);new Acc().add(box(.9*b,.03,.4*b),d,s*.45*b,0,0,{shade:0}).mesh(wg,.01);wings.push(wg)}}
 if(o.fire){const gs=new TH.Sprite(new TH.SpriteMaterial({map:glowTex(),color:'#ff7a2a',blending:TH.AdditiveBlending,depthWrite:false,transparent:true}));gs.scale.set(1.6*b,1.6*b,1);gs.position.set(0,.6*b,L/2+r);g.add(gs)}
 a.mesh(g,.012);return{g,anim:(t,l)=>{g.children[0]&&(g.rotation.x=0);if(wings)wings.forEach((w,i)=>w.rotation.z=(i?1:-1)*(.2+Math.sin(t*10)*.5))},wide:b*(L+.4)*.9,fly:0}}
function monW(c,d,o){const g=new TH.Group(),sp=o.span||1,a=new Acc(),dr=o.dragon;
 a.add(cap(.14*sp*(dr?1.2:1),dr?.6:.3),c,0,0,0,{rx:PI/2-.2,shade:.1}).add(sph(.11*sp*(dr?1.1:1)),c,0,.12*sp,.38*sp*(dr?1.3:1)).add(cone(.04*sp,.16*sp),o.stone?'#5a5a62':'#e6bd54',0,.1*sp,.5*sp*(dr?1.4:1),{rx:PI/2,shade:0});
 for(const s of[-1,1])a.add(sph(.022),'#ff4a3a',s*.05*sp,.16*sp,.46*sp*(dr?1.3:1),{shade:0});
 if(dr){for(let i=0;i<4;i++)a.add(cap(.1*(1-i*.2),.3),c,0,-.08*i-.05,-.4-i*.28,{rx:PI/2+.2,shade:.05});for(const s of[-1,1])a.add(cone(.03,.2),'#e8dcc0',s*.07,.3,.5,{rx:-.5,shade:0});for(let i=0;i<5;i++)a.add(cone(.03,.12),d,0,.2-i*.05,-.1-i*.18,{shade:0})}
 else a.add(cap(.05*sp,.3*sp),d,0,-.05,-.35*sp,{rx:PI/2+.3,shade:0});
 if(o.human)a.add(sph(.1),'#e8c8a0',0,.2,.3,{shade:0});if(o.lion)a.add(cap(.12*sp,.25),'#e8d8b0',0,-.05,-.25,{rx:PI/2,shade:0});
 for(const s of[-1,1])a.add(cap(.025,.18),d,s*.06*sp,-.2*sp,.1,{shade:0});
 a.mesh(g,.012);const ws=[];for(const s of[-1,1]){const wg=new TH.Group();wg.position.set(s*.12*sp,.08*sp,0);g.add(wg);const wa=new Acc().add(box(.9*sp*(dr?1.2:1),.03,.4*sp),d,s*.45*sp*(dr?1.2:1),0,-.05,{shade:0}).add(cap(.015,.9*sp*(dr?1.2:1)),dkc(d,.3),s*.45*sp*(dr?1.2:1),.02,.14*sp,{rz:PI/2,shade:0});wa.mesh(wg,.01);ws.push(wg)}
 return{g,anim:(t)=>{ws.forEach((w,i)=>w.rotation.z=(i?1:-1)*(.25+Math.sin(t*(o.small?18:9))*.6))},wide:sp*1.25,fly:1.4*(o.small?.7:1)}}
function monC(c,d,o){const g=new TH.Group(),a=new Acc(),ty=o.t;
 if(ty==='spider'){a.add(sph(.2),c,0,.3,0,{sy:.8}).add(sph(.13),c,0,.3,.22).add(sph(.28),d,0,.34,-.28,{sy:.9});for(const s of[-1,1])for(let i=0;i<4;i++){const ang=(i-1.5)*.55;a.add(cap(.022,.5),c,s*.35,.22,(i-1.5)*.12,{rz:s*1.0,ry:ang*s,shade:0})}for(const s of[-1,1])a.add(sph(.025),'#ff3a3a',s*.05,.34,.32,{shade:0})}
 else if(ty==='worm'){for(let i=0;i<6;i++)a.add(sph(.22-i*.02),i%2?d:c,0,.22+(i?0:.08),-i*.3,{shade:.08});a.add(tor(.1,.03),'#e8dcc0',0,.3,.18,{shade:0})}
 else{a.add(sph(.28),c,0,.3,0,{sy:.8});for(const [x,r] of[[-.28,.1],[0,.12],[.28,.1]]){a.add(cap(.05,.55),c,x,.7,.12,{rz:-x*.8,rx:.2,shade:.05}).add(sph(.09),c,x*1.5,1.0,.2).add(sph(.02),'#ffdd44',x*1.5+.04,1.03,.28,{shade:0})}for(const x of[-.2,.2])a.add(cap(.06,.18),d,x,.1,.1)}
 a.mesh(g,.012);return{g,anim:(t,l)=>{g.rotation.z=Math.sin(t*4)*.05},wide:ty==='worm'?1.5:1.1,fly:0}}
function monS(c,d,o){const g=new TH.Group(),ty=o.t;let m=null;
 if(ty==='ghost'){const a=new Acc(),pr=[[.02,-.5],[.3,-.4],[.3,-.1],[.24,.2],[.2,.4],[.0,.52]].map(([r,y])=>new TH.Vector2(r,y));a.add(new TH.LatheGeometry(pr,20),c,0,.55,0,{shade:.05}).add(sph(.2),c,0,1.0,0).add(sph(.045),o.dark?'#ff4a3a':'#2a3040',.08,1.04,.17,{shade:0}).add(sph(.045),o.dark?'#ff4a3a':'#2a3040',-.08,1.04,.17,{shade:0});for(const s of[-1,1])a.add(cap(.05,.3),c,s*.3,.75,.1,{rz:s*.5,rx:-.4});m=a.mesh(g,0);m.material=GHM}
 else if(ty==='orb'){const gs=new TH.Sprite(new TH.SpriteMaterial({map:glowTex(),color:d,blending:TH.AdditiveBlending,depthWrite:false,transparent:true}));gs.scale.set(1.8,1.8,1);gs.position.y=.7;g.add(gs);m=new Acc().add(sph(.14),c,0,.7,0,{shade:0}).mesh(g,0);m.material=new TH.MeshBasicMaterial({color:c})}
 else{const a=new Acc();for(const [x,y,z,r] of[[0,.5,0,.34],[.15,.9,0,.26],[-.2,.8,.1,.2],[0,1.2,0,.2]])a.add(sph(r),c,x,y,z,{shade:.05});for(const s of[-1,1])a.add(cap(.09,.35),c,s*.4,.6,0,{rz:s*.4});a.mesh(g,.012);const gs=new TH.Sprite(new TH.SpriteMaterial({map:glowTex(),color:d,blending:TH.AdditiveBlending,depthWrite:false,transparent:true}));gs.scale.set(2.4,2.4,1);gs.position.y=.8;g.add(gs)}
 return{g,anim:(t)=>{g.position.y=0;g.rotation.z=Math.sin(t*2)*.04},wide:1,fly:ty==='elem'?0:.9}}
function monT(){const g=new TH.Group(),a=new Acc();a.add(cyl(.2,.32,1.2),'#5a3e24',0,.6,0,{shade:.05}).add(sph(.5),'#3f7a3a',0,1.5,0,{shade:.1}).add(sph(.38),'#4f8a44',.3,1.3,.1,{shade:.1}).add(sph(.36),'#2f6a32',-.32,1.35,-.05,{shade:.1});
 for(const s of[-1,1])a.add(cap(.07,.6),'#5a3e24',s*.4,.9,.1,{rz:s*.8,shade:0}).add(sph(.05),'#ffdd44',s*.1,1.3,.46,{shade:0});a.mesh(g,.012);return{g,anim:(t)=>{g.rotation.z=Math.sin(t*2)*.03},wide:1.1,fly:0}}
const MON={wolf:['q','#7a7a82','#4f4f58',{len:.8,mane:1}],fox:['q','#c8742a','#e8e0d0',{len:.6,bulk:.8,tail:1}],boar:['q','#5a4030','#3a2a20',{len:.7,bulk:1.15,tusks:1}],goat:['q','#d8d2c4','#a8a090',{horns:1,bulk:.95}],bear:['q','#5a3e2a','#3e2a1c',{bulk:1.5,len:.8}],rat:['q','#6a5a50','#4a3c34',{len:.5,bulk:.6,tail:1}],
 spider:['c','#2a2430','#6a1a2a',{t:'spider'}],worm:['c','#8a6a7a','#5a3a4a',{t:'worm'}],hydra:['c','#3a6a4a','#2a4a34',{t:'hydra'}],basil:['q','#4a7a4a','#2a4a2a',{len:1,bulk:.8,crest:1,eye:'#ffdd44'}],salam:['q','#d0501c','#7a2a10',{len:.9,bulk:.8,fire:1}],chimera:['q','#a0703a','#6a3a1a',{bulk:1.3,len:.9,horns:1,wings:1,mane:1}],were:['q','#6a5a4a','#3a2a1e',{len:.85,bulk:1.25,mane:1,eye:'#ffcc33'}],
 bat:['w','#3a3040','#241c2c',{span:.7,small:1}],harpy:['w','#8a6a50','#6a4a8a',{human:1}],eagle:['w','#7a5a38','#e8e0d0',{span:1}],condor:['w','#2a2a30','#e8e0d0',{span:1.3}],griffon:['w','#c8a060','#e8d8b0',{span:1.4,lion:1}],dragon:['w','#4a8a4a','#2a5a2a',{span:1.8,dragon:1}],garg:['w','#8a8a92','#5a5a62',{span:.9,stone:1}],
 ghost:['s','#e8eef6','#9ab0c8',{t:'ghost'}],spectre:['s','#8aa0b8','#4a6078',{t:'ghost',dark:1}],shade:['s','#2a2438','#120e1c',{t:'ghost',dark:1}],soul:['s','#b8f0ff','#7fe0ff',{t:'orb'}],wisp:['s','#c8ffd8','#7fe0a0',{t:'orb'}],elem:['s','#d86a28','#ffb040',{t:'elem'}],tree:['t'],
 dryad:['h','#4a8a4a','#2a5a2a',{sk:'#8ac08a',robe:1,crown:'leaf'}],bandit:['h','#6a5a40','#3a2f22',{w:'sword',hood:1}],brigand:['h','#7a4a3a','#3a2a22',{w:'club'}],cultist:['h','#5a2a6a','#2a1a3a',{robe:1,hood:1,w:'staff'}],guard:['h','#6a7a9a','#3a4a68',{armor:1,helm:1,w:'sword'}],poacher:['h','#6a7a4a','#3a4a28',{w:'sword',hood:1}],jailer:['h','#5a5a62','#2a2a32',{bulk:1.2,w:'club',helm:1}],
 goblin:['h','#6a9a4a','#4a3a22',{sk:'#7aaa52',ears:1,bulk:.8,w:'sword'}],kobold:['h','#b07a4a','#6a4a2a',{sk:'#c08a50',bulk:.75,ears:1,w:'club'}],orc:['h','#4a7a3a','#4a3a2a',{sk:'#5a8a42',bulk:1.25,tusks:1,w:'axe',armor:1}],troll:['h','#6a7a5a','#4a3a2a',{sk:'#7a8a6a',bulk:1.5,w:'club',head:1.1}],giant:['h','#b08a6a','#6a4a30',{sk:'#d4a67a',bulk:1.6,w:'club'}],
 knight:['h','#9aa4b4','#5a6272',{armor:1,helm:1,w:'sword',bulk:1.1}],champ:['h','#c8a040','#6a5020',{armor:1,helm:1,crown:'plume',w:'sword',bulk:1.2}],caster:['h','#4a3a7a','#2a1a4a',{robe:1,hood:1,w:'staff'}],lich:['h','#3a2a4a','#1a102a',{robe:1,sk:'#e8e4d0',crown:'crown',w:'staff',eye:'#7fe0ff'}],skel:['h','#e8e4d0','#b8b4a0',{sk:'#e8e4d0',w:'sword',bulk:.8,eye:'#ff4a3a'}],golem:['h','#8a8a82','#5a5a54',{bulk:1.6,head:.9,eye:'#ffb040',armor:1}],dking:['h','#3a1a4a','#1a0a2a',{bulk:1.3,armor:1,crown:'crown',w:'sword',eye:'#ff4a3a',horns:1}],demon:['h','#8a2a2a','#4a1a1a',{sk:'#b03a3a',horns:1,eye:'#ffd04a',bulk:1.1,w:'axe'}],yeti:['h','#e8eef4','#b8c4d0',{sk:'#d8e2ec',bulk:1.5}]};
function monBuild(mk,h){const e=h.en,E=MON[mk]||['h','#7a6a5a','#3a2f22',{}],f={h:monH,q:monQ,w:monW,c:monC,s:monS,t:monT}[E[0]],b=E[0]==='t'?monT():f(E[1],E[2],E[3]||{}),nm=e.n.toLowerCase(),
  ql=Math.max(0,Math.min(1,(Math.log((e.d||1)+1)-.7)/3.5)),km=mk==='dragon'?(/^dragonnet/.test(nm)?.8:/^drake/.test(nm)?1:/^wyrm/.test(nm)?1.1:/^wyvern/.test(nm)?.95:1.4):mk==='demon'?(/mineur/.test(nm)?.65:/^archi/.test(nm)?1.35:/succube|incube/.test(nm)?.85:1):mk==='salam'?(/g[ée]ante/.test(nm)?1.35:1):1;
 b.S0=(SZ[mk]||1)*km*(.85+.4*ql)*(.95+.1*jt(hid(e.n)+h.id*7,2));b.g.scale.setScalar(HS*b.S0);b.g.userData.mk=mk;return b}
const MN=new Map();let monG=null;
function updMon(dt,tm,BM){const seen=new Set();
 for(const h of S.hero){if(h.st!=='fight'||!h.en)continue;const mk=mkind(h.en.n);if(!mk)continue;seen.add(h.id);const key=mk+'|'+h.en.n;let o=MN.get(h.id);
  if(o&&o.key!==key){monG.remove(o.g);disp(o.g);MN.delete(h.id);o=null}
  if(!o){const b=monBuild(mk,h);o={g:b.g,b,key,ph:Math.random()*6};monG.add(o.g);MN.set(h.id,o)}
  const [hx,hz]=hpos(h,BM),S0=o.b.S0,off=3.4+2.1*S0*Math.min(1.5,o.b.wide||1)+(h.hs?1.3:0),lg=Math.abs(Math.sin(tm*9))*1.1,x=hx+off-lg;
  o.g.position.set(x,H3(x,hz)+o.b.fly*S0*HS*.45+Math.sin(tm*3+h.id)*.1,hz);o.g.rotation.y=-PI/2;o.b.anim(tm+o.ph,lg)}
 for(const [id,o] of MN)if(!seen.has(id)){monG.remove(o.g);disp(o.g);MN.delete(id)}}
// ===== v3.3.4 : qualité, post-traitement, lucioles, fumée, rotation =====
const PP={ok:0,fail:0,w:0,h:0};let SQ=[];
function qload(){let q='auto';try{q=localStorage.getItem('bvq')||'auto'}catch(e){}if(!['auto','h','m','b'].includes(q))q='auto';K.q=q;K.ql=q==='m'?1:q==='b'?0:2;K.pf=K.ql===2?1:K.ql===1?.6:.3;
 const b=$('qb');if(b){b.onclick=()=>{K.q={auto:'h',h:'m',m:'b',b:'auto'}[K.q];K.ql=K.q==='m'?1:K.q==='b'?0:2;K.capq=0;try{localStorage.setItem('bvq',K.q)}catch(e){}applyQ();qtxt()};qtxt()}
 const d=$('dfps');if(d)d.onclick=()=>{K.fpsOn=!K.fpsOn;d.textContent='Compteur fps (3D) : '+(K.fpsOn?'oui':'non')}}
function qtxt(){const b=$('qb');if(b)b.textContent='⚙️ '+({auto:'Auto',h:'Haute',m:'Moyenne',b:'Basse'})[K.q]}
function applyQ(){K.pf=K.ql===2?1:K.ql===1?.6:.3;if(!K.ok)return;const l=K.ql;K.prMax=Math.min(window.devicePixelRatio||1,l===2?1.5:l===1?1.25:1);K.pr=Math.min(K.pr,K.prMax);ren.setPixelRatio(K.pr);
 const ss=l===2?2048:1024;sun.castShadow=l>0;if(sun.shadow.mapSize.x!==ss){sun.shadow.mapSize.set(ss,ss);if(sun.shadow.map){sun.shadow.map.dispose();sun.shadow.map=null}}resize()}
function qAuto(a){if(K.q!=='auto'||K.ql<1)return;if(a>1/28&&K.pr<=1.001){K.bad=(K.bad||0)+1;if(K.bad>=3){K.ql--;K.bad=0;applyQ()}}else K.bad=0}
function ppInit(){const ex=ren.extensions;if(!(ex.has('EXT_color_buffer_float')||ex.has('EXT_color_buffer_half_float')))throw new Error('no half float');PP.ms=ex.has('EXT_color_buffer_float')?4:0;
 const VS='varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}',sm=(fs,u)=>new TH.ShaderMaterial({uniforms:u,vertexShader:VS,fragmentShader:fs,depthTest:false,depthWrite:false});
 PP.cam=new TH.OrthographicCamera(-1,1,1,-1,0,1);PP.sc=new TH.Scene();PP.q=new TH.Mesh(new TH.PlaneGeometry(2,2));PP.q.frustumCulled=false;PP.sc.add(PP.q);
 PP.mb=sm('uniform sampler2D tD;uniform vec2 px;uniform float th;varying vec2 vUv;void main(){vec3 c=texture2D(tD,vUv+px*vec2(-1.,-1.)).rgb+texture2D(tD,vUv+px*vec2(1.,-1.)).rgb+texture2D(tD,vUv+px*vec2(-1.,1.)).rgb+texture2D(tD,vUv+px*vec2(1.,1.)).rgb;c*=.25;float l=dot(c,vec3(.3,.59,.11));gl_FragColor=vec4(c*smoothstep(th,th+.75,l),1.);}',{tD:{value:null},px:{value:new TH.Vector2()},th:{value:.9}});
 PP.mg=sm('uniform sampler2D tD;uniform vec2 d;varying vec2 vUv;void main(){vec3 c=texture2D(tD,vUv).rgb*.227;c+=(texture2D(tD,vUv+d*1.385).rgb+texture2D(tD,vUv-d*1.385).rgb)*.316;c+=(texture2D(tD,vUv+d*3.23).rgb+texture2D(tD,vUv-d*3.23).rgb)*.07;gl_FragColor=vec4(c,1.);}',{tD:{value:null},d:{value:new TH.Vector2()}});
 PP.mf=sm('uniform sampler2D tD;uniform sampler2D tB;uniform vec2 px;uniform float bs,fl;uniform vec3 tint;varying vec2 vUv;void main(){float r=smoothstep(.2,.5,abs(vUv.y-.5))*4.5;vec3 c=texture2D(tD,vUv).rgb;if(r>.25){vec3 s=c;for(int i=0;i<10;i++){float a=float(i)*2.39996;float rr=sqrt((float(i)+.5)/10.)*r;s+=texture2D(tD,vUv+vec2(cos(a),sin(a))*rr*px).rgb;}c=s/11.;}c+=texture2D(tB,vUv).rgb*bs;c*=tint;c+=fl*vec3(.5,.55,.8)*.25;c*=mix(.6,1.,1.-smoothstep(.35,.95,length((vUv-.5)*vec2(1.,1.15))));gl_FragColor=vec4(c,1.);\n#include <tonemapping_fragment>\n#include <colorspace_fragment>\n}',{tD:{value:null},tB:{value:null},px:{value:new TH.Vector2()},bs:{value:.4},fl:{value:0},tint:{value:new TH.Vector3(1,1,1)}})}
function ppRender(){const v=new TH.Vector2();ren.getDrawingBufferSize(v);const w=v.x|0,h=v.y|0;if(!PP.ok){ppInit();PP.ok=1}
 if(PP.w!==w||PP.h!==h){['rt','b0','b1'].forEach(k=>PP[k]&&PP[k].dispose());PP.rt=new TH.WebGLRenderTarget(w,h,{type:TH.HalfFloatType,samples:PP.ms});const bw=Math.max(8,w>>2),bh=Math.max(8,h>>2);PP.b0=new TH.WebGLRenderTarget(bw,bh,{type:TH.HalfFloatType,depthBuffer:false});PP.b1=new TH.WebGLRenderTarget(bw,bh,{type:TH.HalfFloatType,depthBuffer:false});PP.w=w;PP.h=h}
 ren.setRenderTarget(PP.rt);ren.render(scn,cam3);const go=(m,t)=>{PP.q.material=m;ren.setRenderTarget(t);ren.render(PP.sc,PP.cam)};
 PP.mb.uniforms.th.value=K.th;PP.mb.uniforms.tD.value=PP.rt.texture;PP.mb.uniforms.px.value.set(1/w,1/h);go(PP.mb,PP.b0);
 PP.mg.uniforms.tD.value=PP.b0.texture;PP.mg.uniforms.d.value.set(1/PP.b0.width,0);go(PP.mg,PP.b1);
 PP.mg.uniforms.tD.value=PP.b1.texture;PP.mg.uniforms.d.value.set(0,1/PP.b0.height);go(PP.mg,PP.b0);
 PP.mf.uniforms.bs.value=K.bs;PP.mf.uniforms.fl.value=WX.fl;PP.mf.uniforms.tint.value.set(K.tint[0],K.tint[1],K.tint[2]);PP.mf.uniforms.tD.value=PP.rt.texture;PP.mf.uniforms.tB.value=PP.b0.texture;PP.mf.uniforms.px.value.set(1/w,1/h);go(PP.mf,null)}
// lucioles (autour des forêts, la nuit)
const FFN=64,FF={ok:0};
function ffUpd(tm){if(!FF.ok){const g=new TH.BufferGeometry();g.setAttribute('position',new TH.BufferAttribute(new Float32Array(FFN*3),3));g.setAttribute('color',new TH.BufferAttribute(new Float32Array(FFN*3),3));FF.p=new TH.Points(g,new TH.PointsMaterial({map:glowTex(),size:2.4,sizeAttenuation:true,vertexColors:true,transparent:true,depthWrite:false,blending:TH.AdditiveBlending,fog:false}));FF.p.frustumCulled=false;scn.add(FF.p);FF.ok=1}
 const fz=ZA.filter(z=>z.n==='Forêt'),kd=dk(),rn=wxMix()[1],on=fz.length&&K.pf>.5&&kd>.25&&rn<.35&&K.dist<520;FF.p.visible=!!on;if(!on)return;
 const P=FF.p.geometry.attributes.position.array,C=FF.p.geometry.attributes.color.array,a=Math.min(1,kd*1.3)*(1-rn*2);
 for(let i=0;i<FFN;i++){const f=fz[i%fz.length],bx=f.x+(jt(i,1)-.5)*90,bz=f.y+(jt(i,2)-.5)*90,ph=jt(i,3)*6.28,x=bx+Math.sin(tm*.4+ph)*3.5,z=bz+Math.cos(tm*.35+ph*1.3)*3.5,y=H3(bx,bz)+1.2+jt(i,4)*2.2+Math.sin(tm*.8+ph)*.6,b=Math.pow(Math.max(0,Math.sin(tm*(.8+jt(i,5)*.8)+ph*5)),2)*2.4*a;
  P[i*3]=x;P[i*3+1]=y;P[i*3+2]=z;C[i*3]=b;C[i*3+1]=b*.85;C[i*3+2]=b*.35}
 FF.p.geometry.attributes.position.needsUpdate=true;FF.p.geometry.attributes.color.needsUpdate=true}
// fumée (cheminées et volcan)
const SMN=36,SM={ok:0,s:[]};
function smUpd(tm){if(!SM.ok){const c=document.createElement('canvas');c.width=c.height=64;const g=c.getContext('2d'),q=g.createRadialGradient(32,32,0,32,32,32);q.addColorStop(0,'rgba(255,255,255,.55)');q.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=q;g.fillRect(0,0,64,64);const t=new TH.CanvasTexture(c);
  for(let i=0;i<SMN;i++){const s=new TH.Sprite(new TH.SpriteMaterial({map:t,color:'#bdbdbd',transparent:true,depthWrite:false,opacity:0}));s.visible=false;scn.add(s);SM.s.push(s)}SM.ok=1}
 const nv=Math.round(SMN*K.pf),vo=ZA.find(z=>z.n==='Volcan'),src=SQ.slice(0,24).map(p=>({p,v:0}));if(vo)src.push({p:[vo.x,H3(vo.x,vo.y)+8,vo.y],v:1});
 for(let i=0;i<SMN;i++){const s=SM.s[i];if(i>=nv||!src.length||K.dist>600){s.visible=false;continue}
  const o=src[i%src.length],ph=((tm*(o.v?.07:.16)+jt(i,7))%1),H=o.v?34:9,sc=(o.v?5:1.1)+ph*(o.v?14:3.4);s.visible=true;s.position.set(o.p[0]+ph*(o.v?10:3.5)+Math.sin(tm+i)*.3,o.p[1]+ph*H,o.p[2]+ph*(o.v?4:1.2));s.scale.set(sc,sc,1);
  s.material.opacity=Math.sin(Math.PI*ph)*(o.v?.5:.42)*(1-Math.min(1,wxMix()[1])*.6);s.material.color.set(o.v?'#4a4540':'#c9c9c9').multiplyScalar(1-.55*dk())}}
// ---------- caméra / entrées ----------
function updCam(dt){
 if(fol!=null){const q=S.hero.find(z=>z.id===fol);if(q){const [x,z]=hpos(q,bAssign());if(K.lastFol!==fol){K.dist=Math.min(K.dist,70);K.lastFol=fol}K.tx+=(x-K.tx)*Math.min(1,dt*6);K.tz+=(z-K.tz)*Math.min(1,dt*6)}else fol=null}else K.lastFol=null;
 K.dist=Math.min(950,Math.max(32,K.dist));K.tx=Math.min(WXd,Math.max(0,K.tx));K.tz=Math.min(WYd,Math.max(0,K.tz));
 {const s=Math.min(260,Math.max(70,K.dist*.5)),sc3=sun.shadow.camera;if(Math.abs(sc3.right-s)>4){sc3.left=-s;sc3.right=s;sc3.top=s;sc3.bottom=-s;sc3.updateProjectionMatrix()}}
 camPlace()}
function camPlace(){K.dist=Math.min(950,Math.max(32,K.dist));K.tx=Math.min(WXd,Math.max(0,K.tx));K.tz=Math.min(WYd,Math.max(0,K.tz));const ty=H3(K.tx,K.tz),cp=Math.cos(K.tilt),sp=Math.sin(K.tilt);
 cam3.position.set(K.tx+Math.sin(K.az)*cp*K.dist,ty+sp*K.dist,K.tz+Math.cos(K.az)*cp*K.dist);cam3.lookAt(K.tx,ty,K.tz);cam3.updateMatrixWorld()}
const PT=new Map();let G3={pd:0,pc:null,tp:null};
const RV=new TH.Vector3(),RD3=new TH.Vector3();
function ground(sx,sy){RV.set(sx/W*2-1,-(sy/H)*2+1,.5).unproject(cam3);RD3.copy(RV).sub(cam3.position).normalize();const y=H3(K.tx,K.tz),t=(y-cam3.position.y)/(RD3.y||-1e-6);return[cam3.position.x+RD3.x*t,cam3.position.z+RD3.z*t]}
function dragTo(a,b){const g0=ground(a[0],a[1]),g1=ground(b[0],b[1]);K.tx+=g0[0]-g1[0];K.tz+=g0[1]-g1[1];camPlace()}
function zoomAtPt(px,py,f){const g0=ground(px,py);K.dist=Math.min(950,Math.max(32,K.dist/f));camPlace();const g1=ground(px,py);K.tx+=g0[0]-g1[0];K.tz+=g0[1]-g1[1];camPlace()}
function glTap(x,y){let b=null,bd=1e9;const BM=bAssign();for(const q of S.hero){if(hidn(q)&&!BM.get(q.id))continue;const [hx,hz]=hpos(q,BM);V3a.set(hx,H3(hx,hz)+HS*.7,hz).project(cam3);const sx=(V3a.x*.5+.5)*W,sy=(-V3a.y*.5+.5)*H,d=Math.hypot(sx-x,sy-y);if(d<bd){bd=d;b=q}}
 if(b&&bd<34){fol=b.id;K.dist=Math.min(K.dist,70)}else fol=null}
function bindInput(){
 cv.addEventListener('pointerdown',e=>{if(!K.on)return;e.stopImmediatePropagation();try{cv.setPointerCapture(e.pointerId)}catch(_){}PT.set(e.pointerId,[e.offsetX,e.offsetY]);G3.pd=0;G3.pc=null;G3.pa=null;G3.rg=0;G3.ro=0;G3.tp=e.isPrimary&&PT.size<=1?{x:e.offsetX,y:e.offsetY,t:Date.now(),m:0}:null},true);
 cv.addEventListener('pointermove',e=>{if(!K.on)return;e.stopImmediatePropagation();if(!PT.has(e.pointerId))return;const o=PT.get(e.pointerId),n=[e.offsetX,e.offsetY];PT.set(e.pointerId,n);
  if(G3.tp&&Math.hypot(e.offsetX-G3.tp.x,e.offsetY-G3.tp.y)>8){G3.tp.m=1;fol=null}
  if(PT.size===1){if(G3.tp&&G3.tp.m)fol=null;dragTo(o,n)}
  else if(PT.size===2){const [a,b]=[...PT.values()],d=Math.hypot(a[0]-b[0],a[1]-b[1]),cn=[(a[0]+b[0])/2,(a[1]+b[1])/2];fol=null;if(G3.pd&&G3.pc){zoomAtPt(G3.pc[0],G3.pc[1],d/G3.pd);dragTo(G3.pc,cn)}{const an=Math.atan2(b[1]-a[1],b[0]-a[0]);if(G3.pa!=null){let da=an-G3.pa;if(da>PI)da-=2*PI;if(da<-PI)da+=2*PI;if(!G3.ro){G3.rg=(G3.rg||0)+da;if(Math.abs(G3.rg)>.52){G3.ro=1;da=G3.rg}else da=0}if(G3.ro)K.az+=da}G3.pa=an}G3.pd=d;G3.pc=cn}},true);
 const up=e=>{if(!K.on)return;e.stopImmediatePropagation();PT.delete(e.pointerId);G3.pd=0;G3.pc=null;G3.pa=null;G3.rg=0;G3.ro=0;if(e.type==='pointerup'&&G3.tp&&!G3.tp.m&&Date.now()-G3.tp.t<500)glTap(e.offsetX,e.offsetY);if(!PT.size)G3.tp=null};
 cv.addEventListener('pointerup',up,true);cv.addEventListener('pointercancel',up,true);
 cv.addEventListener('wheel',e=>{if(!K.on)return;e.stopImmediatePropagation();e.preventDefault();zoomAtPt(e.offsetX,e.offsetY,e.deltaY<0?1.15:.87)},{capture:true,passive:false});
 cv.addEventListener('dblclick',e=>{if(!K.on)return;e.stopImmediatePropagation();fol=null;K.dist=300;K.az=0;K.tx=T.x;K.tz=T.y-70;camPlace()},true)}
// ---------- calques 2D (noms, bulles, météo, panneaux) ----------
function pj(x,y,z){V3a.set(x,y,z).project(cam3);return V3a.z>1?null:[(V3a.x*.5+.5)*W,(-V3a.y*.5+.5)*H]}
function overlay(BM){
 cx.save();cx.setTransform(window.devicePixelRatio||1,0,0,window.devicePixelRatio||1,0,0);cx.clearRect(0,0,W,H);cx.textAlign='center';cx.lineJoin='round';
 const fs=12,LB=[],lab=(t,i,p,c,sub)=>{if(p)LB.push({t,i,x:p[0],y:p[1],c,sub})};
 const ZI={'Forêt':'🌲','Mine':'⛏️','Montagne':'🏔️','Ruines':'🏚️','Donjon':'🏰','Volcan':'🌋'};
 for(const z of ZA){const p=pj(z.x,H3(z.x,z.y)+(z.n==='Montagne'?26:z.n==='Volcan'?18:14)*ZF,z.y);if(!p)continue;const t=z.sn||z.n,s=Math.max(.85,Math.min(1.5,260/K.dist));cx.font=`700 ${12*s}px Alegreya,serif`;cx.lineWidth=3;cx.strokeStyle='rgba(20,28,22,.85)';cx.strokeText((z.boss?'👹 ':(ZI[z.n]||'⚔️')+' ')+t,p[0],p[1]);cx.fillStyle='#fff';cx.fillText((z.boss?'👹 ':(ZI[z.n]||'⚔️')+' ')+t,p[0],p[1]);cx.font=`${11*s}px serif`;cx.fillText(z.boss?'👑':'🔥'.repeat(z.vi+1),p[0],p[1]+13*s)}
 for(const h of S.hero){const bm=BM.get(h.id);if(hidn(h)&&!bm)continue;const [x,z]=hpos(h,BM),hh=HS*(h.hs?1.9:1.42);const p=pj(x,H3(x,z)+hh,z);if(!p)continue;
  lab(`${sn(h.name)} · niv. ${h.lv}`,/⁠/.test(h.name),p,'#fff');
  if(h.st==='fight'&&h.en)lab(h.en.n,0,[p[0],p[1]+fs*1.15],'#ffb3a8');
  if(showT&&(h.st==='go'||h.st==='back'||(h.st==='town'&&h.sub==='do')))lab(fm(rem(h)),0,[p[0],p[1]+(h.st==='fight'?fs*2.3:fs*1.15)],'#e6f1ff')}
 if(fol!=null){const q=S.hero.find(z=>z.id===fol);if(q&&hidn(q)&&!BM.get(q.id)){const ib=vdim().u.find(a=>a[1]===NE.A);if(ib){const x=T.x+ib[0][0],z=T.y+ib[0][1]+3.3,p=pj(x,H3(x,z)+3.6,z);if(p){lab(`${sn(q.name)} · niv. ${q.lv}`,/\u2060/.test(q.name),p,'#fff');lab('en repos',0,[p[0],p[1]+fs*1.15],'#b8e0ff')}}}}
 for(const k in S.npc){const it=S.pl.find(x=>x.e===NE[k]);if(!it||it.cn||!NPV[k])continue;const n=S.npc[k],[x,z]=npcPos(k,it),p=pj(x,H3(x,z)+HS*1.45,z);lab(`${sn(n.n)} · niv. ${n.lv}`,/\u2060/.test(n.n),p,'#e6d6ff')}
 for(const it of S.pl){const c=it.cn||it.rb;if(!c)continue;const p=slot(it),x=T.x+p[0],z=T.y+p[1],q=pj(x,H3(x,z)+(BTOP[NK[it.e]||'H']||6.7)+3,z);lab('🔨 '+Math.min(99,Math.floor(c.t/c.T*100))+' %',0,q,'#fff')}
 for(const m of S.marks){const a=S.t-m.t;if(a>240)continue;const p=pj(m.x,H3(m.x,m.y)+1.5,m.y);if(!p)continue;cx.globalAlpha=Math.max(.35,1-a/240);cx.font='20px serif';cx.fillText('💀',p[0],p[1]);if(m.n){cx.font=(/⁠/.test(m.n)?'italic ':'')+`700 ${fs}px Alegreya,serif`;cx.lineWidth=3;cx.strokeStyle='rgba(20,28,22,.85)';cx.strokeText(sn(m.n),p[0],p[1]+14);cx.fillStyle='#fff';cx.fillText(sn(m.n),p[0],p[1]+14)}cx.globalAlpha=1}
 const PL=[];LB.sort((a,b)=>a.y-b.y);for(const l of LB){cx.font=(l.i?'italic ':'')+`700 ${fs}px Alegreya,serif`;l.w=cx.measureText(l.t).width+4;for(let k=0;k<12&&PL.some(p=>Math.abs(p.x-l.x)<(p.w+l.w)/2&&Math.abs(p.y-l.y)<fs*1.05);k++)l.y-=fs*1.05;PL.push(l);cx.lineWidth=2.8;cx.strokeStyle='rgba(20,28,22,.85)';cx.strokeText(l.t,l.x,l.y);cx.fillStyle=l.c||'#fff';cx.fillText(l.t,l.x,l.y)}
 cx.restore();
 {const now=performance.now(),rs=CR.filter(r=>now-r.at<25000).reverse(),f=S.hero.filter(h=>h.st==='fight').slice(0,3),L=[...f.map(h=>({t:`${h.name} ⚔️ ${h.en.n}`,c:'#fff'})),...rs].slice(0,5);
  if(L.length){const fz=sc*2.9,lh=fz*1.4;cx.font=`${fz}px Alegreya,serif`;const mw=Math.max(...L.map(l=>cx.measureText(sn(l.t)).width))+14,pw=Math.min(W-12,Math.max(W*.5,mw));cx.fillStyle='rgba(20,24,26,.8)';cx.beginPath();cx.roundRect(6,6,pw,lh*(L.length+1)+8,8);cx.fill();cx.textAlign='left';cx.fillStyle='#e2b43c';cx.font=`700 ${fz}px Alegreya,serif`;cx.fillText(f.length?'Combats en cours':'Combats',12,6+lh);L.forEach((l,i)=>{cx.fillStyle=l.c;cx.font=(/⁠/.test(l.t)?'italic ':'')+`${fz}px Alegreya,serif`;cx.fillText(sn(l.t),12,6+lh*(i+2))});cx.textAlign='center'}}
 if(S.alert&&performance.now()-S.alert.at<25000){cx.fillStyle='rgba(192,57,43,.95)';cx.beginPath();cx.roundRect(6,H-sc*9-6,W-12,sc*9,8);cx.fill();cx.fillStyle='#fff';cx.font=`700 ${sc*3.6}px Alegreya,serif`;cx.fillText(sn(S.alert.txt),W/2,H-sc*9-6+sc*5.6)}
 if(K.fpsOn){const fz=sc*2.9;cx.font=`700 ${fz}px Alegreya,serif`;cx.textAlign='right';cx.lineWidth=3;cx.strokeStyle='rgba(20,24,26,.9)';const t=`${Math.round(K.fps||0)} fps · ${Math.round(ren.info.render.triangles/1000)}k tri · ${['Basse','Moyenne','Haute'][K.ql]}${K.q==='auto'?' (auto)':''} · ×${K.pr}`;cx.strokeText(t,W-6,H-6);cx.fillStyle='#9fe39f';cx.fillText(t,W-6,H-6)}}
// ---------- init / boucle ----------
function init(){
 if(K.ok||K.fail)return K.ok;
 try{
  glc=document.createElement('canvas');glc.style.cssText='position:absolute;z-index:0;pointer-events:none;border-radius:10px;display:none';cv.style.position='relative';cv.style.zIndex='1';cv.style.background='transparent';cv.parentElement.insertBefore(glc,cv);
  ren=new TH.WebGLRenderer({canvas:glc,antialias:true,powerPreference:'high-performance',preserveDrawingBuffer:/dbg=1/.test(location.search)});
  if(!ren.getContext())throw 0;
  K.prMax=Math.min(window.devicePixelRatio||1,1.5);K.pr=K.prMax;ren.setPixelRatio(K.pr);
  ren.shadowMap.enabled=true;ren.shadowMap.type=TH.PCFSoftShadowMap;ren.shadowMap.autoUpdate=true;ren.toneMapping=TH.ACESFilmicToneMapping;ren.toneMappingExposure=1.05;
  scn=new TH.Scene();scn.fog=new TH.Fog('#93bcdc',700,2300);
  cam3=new TH.PerspectiveCamera(34,W/H,5,3200);
  hemi=new TH.HemisphereLight('#d7e8ff','#6a7a50',1);scn.add(hemi);
  sun=new TH.DirectionalLight('#fff2d6',2.4);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-95,right:95,top:95,bottom:-95,near:1,far:700});sun.shadow.bias=-.0006;sun.shadow.normalBias=.35;scn.add(sun,sun.target);fill=new TH.DirectionalLight('#ffeacc',.7);scn.add(fill,fill.target);skyInit();
  worldG=new TH.Group();villG=new TH.Group();heroG=new TH.Group();scn.add(worldG,villG,heroG);npcG=new TH.Group();monG=new TH.Group();torchG=new TH.Group();scn.add(npcG,monG,torchG);
  bindInput();ren.info.autoReset=false;K.ok=true;applyQ()}catch(e){K.fail=true;K.ok=false;try{if(glc&&glc.parentElement)glc.parentElement.removeChild(glc)}catch(_){}}
 return K.ok}
function resize(){if(!K.ok)return;const r=cv.getBoundingClientRect();if(!r.width)return;glc.style.width=r.width+'px';glc.style.height=(r.width*1.3)+'px';glc.style.left=(cv.offsetLeft+1)+'px';glc.style.top=(cv.offsetTop+1)+'px';ren.setSize(r.width,r.width*1.3,false);cam3.aspect=1/1.3;cam3.updateProjectionMatrix()}
let lt=0;
function frame(){
 if(!K.ok&&!init()){K.on=false;return false}
 const now=performance.now(),dt=Math.min(.1,(now-(lt||now))/1000);lt=now;const tm=now/1000;
 if(!glc.style.width||glc.style.display==='none'){glc.style.display='block';resize()}
 const vd=vdim();VR={rx:vd.rx,ry:vd.ry};
 const gk=W+JSON.stringify(S.zp)+S.zv.join('')+vd.rx.toFixed(1)+vd.ry.toFixed(1)+S.pl.map(i=>i.i+i.e).join(',');
 if(gk!==gKey){gKey=gk;try{paintGround();buildTerrain();buildWorld()}catch(e){K.err=e}}
 const vk=S.pl.map(i=>i.i+i.e+(i.cn?'c'+bstg(i):(i.rb?'r':'t')+tr(NK[i.e]||'H'))+((i.h&&i.h.o!=null&&(S.hero.find(q=>q.id===i.h.o)||{}).col)||'')).join(',');
 if(vk!==vKey){vKey=vk;try{buildVillageMesh()}catch(e){K.err=e}}
 const BM=updHeroes(dt,tm);try{updNpc(dt,tm);updMon(dt,tm,BM);wxUpd(dt,tm);torchUpd(tm);ffUpd(tm);smUpd(tm);vgUpd(tm)}catch(e){K.err=e}updLight();updCam(dt);try{holeUpd(BM)}catch(e){K.err=e}
 if(WTEX)WTEX.offset.x=-(tm*.12)%1;
 par^=1;ren.shadowMap.autoUpdate=false;ren.shadowMap.needsUpdate=!!par;
 ren.info.reset();if(K.ql===2&&!PP.fail){try{ppRender()}catch(e){PP.fail=1;K.err=e;ren.setRenderTarget(null);ren.render(scn,cam3)}}else ren.render(scn,cam3);
 // résolution adaptative
 K.ft.push(dt);if(K.ft.length>50){const a=K.ft.reduce((s,v)=>s+v,0)/K.ft.length;K.ft=[];K.fps=1/a;qAuto(a);
  if(a>1/38&&K.pr>1){K.pr=Math.max(1,K.pr-.25);ren.setPixelRatio(K.pr);resize()}else if(a<1/55&&K.pr<K.prMax){K.pr=Math.min(K.prMax,K.pr+.25);ren.setPixelRatio(K.pr);resize()}}
 overlay(BM);return true}
function setOn(v){K.on=!!v;if(K.on&&!init()){K.on=false}try{localStorage.setItem('bvr',K.on?'3':'2')}catch(e){}if(glc)glc.style.display=K.on?'block':'none';if(!K.on){PT.clear();cx.clearRect(0,0,W,H)}else{gKey=vKey=''}const b=$('r3');if(b)b.textContent=K.on?'🧊 3D':'🖼️ 2D';fit()}
function boot(){qload();let v='2';try{v=localStorage.getItem('bvr')||'2'}catch(e){}K.on=v==='3'&&typeof THREE!=='undefined';const b=$('r3');if(b){b.onclick=()=>setOn(!K.on);b.textContent=K.on?'🧊 3D':'🖼️ 2D'}}
return{K,frame,resize,setOn,boot,H3,pj,hpos,HM,ground,dragTo,zoomAtPt,camPlace,get ok(){return K.ok}}
})();
const _draw2D=draw,_fit2D=fit;
draw=function(){if(GLX.K.on&&GLX.frame())return;_draw2D()};
fit=function(){_fit2D();GLX.resize()};
GLX.boot();
