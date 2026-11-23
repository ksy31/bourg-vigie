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
let _g=null;function glowTex(){if(_g)return _g;const c=document.createElement('canvas');c.width=c.height=64;const g=c.getContext('2d'),q=g.createRadialGradient(32,32,0,32,32,32);q.addColorStop(0,'rgba(255,255,255,1)');q.addColorStop(.3,'rgba(180,240,255,.5)');q.addColorStop(1,'rgba(120,220,255,0)');g.fillStyle=q;g.fillRect(0,0,64,64);return _g=new THREE.CanvasTexture(c)}
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
  else if(z.n==='Volcan')h+=20*Math.exp(-q*q*3)-(q<.2?(.2-q)*40:0);
  else if(z.n==='Mine')h+=4*Math.exp(-q*q*2)}
 return h}
const ZCOL={'Forêt':'#3d6b38','Mine':'#6e6a62','Montagne':'#8d9298','Ruines':'#8c7a5c','Donjon':'#52405c','Volcan':'#3a2a28','Trône du Roi':'#2c2832'};
// ---------- texture du sol ----------
function paintGround(){
 const TS=2.5,w=Math.round(WXd*TS),h=Math.round(WYd*TS),c=gcv||(gcv=document.createElement('canvas'));c.width=w;c.height=h;
 const g=c.getContext('2d'),R=rg3(1234);
 const gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,'#86a772');gr.addColorStop(1,'#9bba84');g.fillStyle=gr;g.fillRect(0,0,w,h);
 g.save();g.scale(TS,TS);
 for(let i=0;i<900;i++){const x=R()*WXd,y=R()*WYd,r=14+R()*30,lt=R()<.5,q=g.createRadialGradient(x,y,0,x,y,r);q.addColorStop(0,lt?'rgba(255,255,210,.13)':'rgba(25,55,30,.13)');q.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=q;g.fillRect(x-r,y-r,2*r,2*r)}
 g.lineWidth=.4;for(let i=0;i<14000;i++){const x=R()*WXd,y=R()*WYd;g.strokeStyle=R()<.5?'#6f9360':'#a9c98f';g.beginPath();g.moveTo(x,y);g.lineTo(x+(R()-.5)*1.2,y-1.2-R()*.9);g.stroke()}
 for(let i=0;i<2200;i++){g.fillStyle=['#fff8e1','#ffe082','#f8bbd0','#ce93d8'][Math.floor(R()*4)];g.beginPath();g.arc(R()*WXd,R()*WYd,.35,0,7);g.fill()}
 for(const z of ZA){const r=ZRD(z.n)*1.05,q=g.createRadialGradient(z.x,z.y,r*.2,z.x,z.y,r),col=ZCOL[z.n]||'#555';q.addColorStop(0,col);q.addColorStop(.7,col+'cc');q.addColorStop(1,col+'00');g.fillStyle=q;g.fillRect(z.x-r,z.y-r,2*r,2*r);
  if(z.n==='Volcan'){const q2=g.createRadialGradient(z.x,z.y,0,z.x,z.y,r*.3);q2.addColorStop(0,'#f06a2a');q2.addColorStop(.6,'#8a2a1a');q2.addColorStop(1,'rgba(60,30,25,0)');g.fillStyle=q2;g.fillRect(z.x-r,z.y-r,2*r,2*r)}
  if(z.n==='Mine'||z.n==='Ruines'||z.n==='Montagne'){for(let i=0;i<260;i++){const a=R()*6.283,d=Math.sqrt(R())*r*.9;g.fillStyle=R()<.5?'rgba(40,40,40,.18)':'rgba(230,230,220,.16)';g.beginPath();g.arc(z.x+Math.cos(a)*d,z.y+Math.sin(a)*d,1+R()*2.4,0,7);g.fill()}}}
 g.restore();
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
 try{const net=vnet();if(net)drawNet(g,net,1)}catch(e){}
 g.restore();blob(1);g.strokeStyle='rgba(70,58,35,.5)';g.lineWidth=.2;g.stroke();g.restore();
 if(!tex){tex=new TH.CanvasTexture(c);tex.colorSpace=TH.SRGBColorSpace;tex.anisotropy=4}else tex.needsUpdate=true}
// ---------- terrain ----------
function buildTerrain(){
 const SX=3,nx=Math.round(WXd/SX),nz=Math.round(WYd/SX),pos=new Float32Array((nx+1)*(nz+1)*3),uv=new Float32Array((nx+1)*(nz+1)*2),idx=[];
 for(let j=0;j<=nz;j++)for(let i=0;i<=nx;i++){const x=i/nx*WXd,y=j/nz*WYd,k=j*(nx+1)+i;pos[k*3]=x;pos[k*3+1]=H3(x,y);pos[k*3+2]=y;uv[k*2]=i/nx;uv[k*2+1]=1-j/nz}
 for(let j=0;j<nz;j++)for(let i=0;i<nx;i++){const a=j*(nx+1)+i,b=a+1,c=a+nx+1,d=c+1;idx.push(a,c,b,b,c,d)}
 const g=new TH.BufferGeometry();g.setAttribute('position',new TH.BufferAttribute(pos,3));g.setAttribute('uv',new TH.BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();
 if(terr){terr.geometry.dispose();terr.geometry=g}else{terr=new TH.Mesh(g,new TH.MeshStandardMaterial({map:tex,roughness:1,metalness:0}));terr.receiveShadow=true;scn.add(terr)}
 terr.material.map=tex;terr.material.needsUpdate=true}
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
let TG=null,WMAT=null,WTEX=null;
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
 const vd=vdim(),clear=(x,y,m)=>{if(((x-T.x)/(vd.rx+m))**2+((y-T.y)/(vd.ry+m))**2<1)return false;for(const p of tRoad)if(Math.abs(p[0]-x)<m&&Math.abs(p[1]-y)<m&&Math.hypot(p[0]-x,p[1]-y)<m)return false;if(nearRiver(x,y,m))return false;return true};
 const inZone=(x,y)=>{for(const z of ZA)if(Math.hypot(x-z.x,y-z.y)<ZRD(z.n)+3)return true;return false};
 for(let i=0,n=0;i<4000&&n<480;i++){const x=6+R()*(WXd-12),y=6+R()*(WYd-12);if(inZone(x,y)||!clear(x,y,5))continue;tree(x,y,1.1+R()*1.1,R()<.2?'pn':null);n++}
 for(let i=0,n=0;i<1500&&n<240;i++){const x=6+R()*(WXd-12),y=6+R()*(WYd-12);if(inZone(x,y)||!clear(x,y,4))continue;rock(x,y,1+R()*1.6,.8+R()*.9,1+R()*1.6,'#c4c5ba');n++}
 for(let i=0,n=0;i<1500&&n<160;i++){const x=6+R()*(WXd-12),y=6+R()*(WYd-12);if(inZone(x,y)||!clear(x,y,3.5))continue;L.bu.push({x,y:H3(x,y)-.05,z:y,s:.9+R()*.8,c:vc(.8,.35),r:R()*6});n++}
 for(const z of ZA){const r=ZRD(z.n),n=z.n,zx=z.x,zz=z.y,gy=H3(zx,zz);
  const around=(cnt,fn,rr)=>{for(let i=0,c=0;i<cnt*6&&c<cnt;i++){const an=R()*6.283,d=Math.sqrt(R())*r*(rr||.92),x=zx+Math.cos(an)*d,y=zz+Math.sin(an)*d;if(!clear(x,y,2.6))continue;fn(x,y);c++}};
  const fr=s=>{W.frame(zx,gy,zz,s);return(lx,lz)=>(H3(zx+lx*s,zz+lz*s)-gy)/s};
  if(n==='Forêt'){around(380,(x,y)=>tree(x,y,1.3+R()*1.4,R()<.28?'pn':null),.95);around(40,(x,y)=>rock(x,y,1.2+R()*2,1+R()*.9,1.2+R()*2,'#b4b6aa'),.9);around(90,(x,y)=>L.bu.push({x,y:H3(x,y)-.05,z:y,s:1+R()*.9,c:vc(.8,.35),r:R()*6}),.95)}
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
   W.frame(0,0,0,1);const cr=r*.17;W.add('lava',cy2(cr,cr*1.05,.5,24),'#fff',zx,H3(zx,zz)+.2,zz,{shade:0});
   for(let i=0;i<6;i++){const an=i/6*6.283+R()*.5,P=[];for(let t=0;t<=14;t++){const q=cr*.95+t/14*(r*.66-cr*.95),a2=an+Math.sin(t*.6+i)*.1;P.push([zx+Math.cos(a2)*q,zz+Math.sin(a2)*q])}W.raw('lava',ribbon(P,(k,m)=>2.2*(1-k/m*.6)+.4,.3,1,'#fff'))}}
 }
 // routes (pavées) : rubans posés sur le terrain
 W.frame(0,0,0,1);
 for(const z of ZA){const pts=RD[z.n];if(!pts)continue;let seg=[];const fl=()=>{if(seg.length>2)W.raw('cobble',ribbon(seg,()=>2.4,.08,3.2,'#cdb384'));seg=[]};
  for(let k=pts.sh||0;k<pts.length;k+=2){const p=pts[k];if(nearRiver(p[0],p[1],.3)||((p[0]-T.x)/vd.rx)**2+((p[1]-T.y)/vd.ry)**2<1.02){fl();continue}seg.push([p[0],p[1]])}fl()}
 // ponts
 for(const b of BRG){const dx=Math.cos(b.a),dz=Math.sin(b.a),e1=H3(b.x-dx*b.l/2,b.y-dz*b.l/2),e2=H3(b.x+dx*b.l/2,b.y+dz*b.l/2),y0=Math.max(e1,e2)+.25;
  W.add('wood',box(b.l,.35,3.6),'#a8824f',b.x,y0,b.y,{ry:-b.a,shade:0});
  for(const s of[-1,1]){const px=b.x+Math.sin(b.a)*s*1.8,pz=b.y-Math.cos(b.a)*s*1.8;W.add('wood',box(b.l,.14,.2),'#5a3a22',px,y0+.95,pz,{ry:-b.a,shade:0});
   for(let t=-b.l/2+.5;t<=b.l/2-.4;t+=Math.max(1.6,b.l/5))W.add('wood',box(.26,1.1,.26),'#4a3220',px+dx*t,y0+.5,pz+dz*t,{shade:0})}
  for(const s of[-1,1])W.add('stone',box(1.4,Math.max(1.4,y0-Math.min(e1,e2)+1),4),'#8f8a80',b.x+dx*s*(b.l/2+.2),y0-.2-.5,b.y+dz*s*(b.l/2+.2),{ry:-b.a,shade:.05})}
 // rivières
 if(RIV.length){const wm=waterMat();for(const r of RIV){if(r.length<2)continue;const m=new TH.Mesh(ribbon(r.map(p=>[p[0],p[1]]),(k,n)=>rvW(k/n)*.94,.17,5,'#ffffff'),wm);m.renderOrder=2;worldG.add(m)}}
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
 W.add('tile',gableG(w+1.1,d+1.1,rh),roof,x,top,z,{shade:.06});
 for(const s of[-1,1])W.add(wk==='stone'?'stone':wk,endG(d,rh),wc,x+s*w/2,top,z,{shade:.06});
 W.add('wood',box(w+1.2,.16,.34),dkc(roof,.35),x,top+rh+.04,z,{shade:0});
 if('HATFIC'.includes(k)){const ch=rh+(k==='F'?2.6:1.5);W.add('stone',box(.95,ch,.95),'#8a847a',x-w*.28,top-.2+ch/2,z-D*.18,{shade:.04});W.add('stone',box(1.2,.2,1.2),'#6f6a62',x-w*.28,top-.2+ch,z-D*.18,{shade:0});if(k==='F')W.add('lava',box(.5,.1,.5),'#fff',x-w*.28,top-.2+ch+.12,z-D*.18,{shade:0})}
 if(k==='S'){const tz=fz-.4,th=hh+4;W.add('stone',box(2.6,th,2.6),'#e4dfd2',x,yb+th/2,tz,{shade:.06});W.add('tile',pyrG(3.8),roof,x,yb+th+1.9,tz,{sx:3.4,sz:3.4,shade:.1});
  W.add('flat',box(.14,1,.14),'#d4b04a',x,yb+th+4.3,tz,{shade:0});W.add('flat',box(.6,.14,.14),'#d4b04a',x,yb+th+4.5,tz,{shade:0});
  doorF(W,x,yb,tz+1.3,1.3,2.5);winF(W,x,yb+th-1.2,tz+1.3,1);
  for(const s of[-1,1]){winS(W,x+s*w/2,yb+hh*.55,z-1.4,s);winS(W,x+s*w/2,yb+hh*.55,z+.9,s)}return}
 if(k==='V'){const tb=top+rh*.3,tw=2.8,th=hh;W.add('stone',box(tw,th,tw),'#e2dac6',x,tb+th/2,z,{shade:.05});W.add('tile',pyrG(2.8),roof,x,tb+th+1.4,z,{sx:3.6,sz:3.6,shade:.1});
  W.add('win',cy2(.8,.8,.15,16),'#fff',x,tb+th*.7,z+tw/2+.05,{rx:PI/2,shade:0});W.add('wood',cy2(.05,.05,2.2,6),'#4a3a2a',x,tb+th+2.9+1,z,{shade:0});W.add('flat',new TH.PlaneGeometry(1.5,.9),'#3f5f8a',x+.75,tb+th+2.9+1.9,z,{shade:0});
  doorF(W,x,yb,fz,2,2.9);for(const q of[-1,1]){winF(W,x+q*w*.3,yb+hh*.32,fz,1)}for(const q of[-1,0,1])winF(W,x+q*w*.3,yb+hh*.76,fz,1)}
 else{doorF(W,x,yb,fz,k==='E'?2.6:1.2,k==='E'?2.3:2.3);
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
function buildVillageMesh(){
 clearG(villG);const W=new TA(),{u}=vdim();
 for(const [p,e,it] of u){const k=NK[e]||'H',x=T.x+p[0],z=T.y+p[1],y0=H3(x,z),w=2*BHW(k)+(k==='A'?.8:0),d=k==='A'?6.6:5.4,tier=Math.max(0,tr(k)-(it.rb?1:0));
  const rc=(it.h&&it.h.o!=null&&(S.hero.find(q=>q.id===it.h.o)||{}).col)||'#8b4a3a';
  let f=1;if(it.cn)f=Math.max(0,bstg(it));
  const hh0=(BTOP[k]||6.7)*.5+tier*.45,roof=k==='H'?rc:ROOF[k]||'#8b4a3a';
  if(it.cn&&f<=0)W.add('stone',box(w,.35,d),'#8f8a7d',x,y0+.18,z,{shade:0});
  else{const full=!it.cn||f>=.75;if(k==='M')stall(W,x,y0,z,w,d,roof);else building(W,k,x,y0,z,w,d,it.cn?hh0*Math.max(.3,f):hh0,roof,tier,full)}
  if(it.cn||it.rb){const sh=(BTOP[k]||6.7)*.85,hw=w/2+.7;for(const sx of[-1,1])for(const sz of[-1,1])W.add('wood',box(.28,sh,.28),'#9a7a4a',x+sx*hw,y0+sh/2,z+sz*(d/2+.7),{shade:0});
   for(let q=1;q<=3;q++)W.add('wood',box(w+1.6,.2,.28),'#b08850',x,y0+q*sh/3.4,z+d/2+.7,{shade:0})}}
 W.build(villG)}
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
  const gl=new TH.Sprite(new TH.SpriteMaterial({map:glowTex(),color:'#ffd37a',blending:TH.AdditiveBlending,depthWrite:false,transparent:true,opacity:0}));gl.scale.set(2.6,2.6,1);gl.position.y=.9;g.add(gl);
  const rg=new TH.Mesh(new TH.RingGeometry(.55,.75,28),new TH.MeshBasicMaterial({color:'#c0392b',transparent:true,opacity:.7,side:TH.DoubleSide,depthWrite:false}));rg.rotation.x=-Math.PI/2;rg.position.y=.03;rg.visible=false;g.add(rg);
  const lt=new TH.Mesh(new TH.SphereGeometry(.09,10,8),new TH.MeshBasicMaterial({color:'#ffe066'}));lt.position.set(.4,1.25,0);lt.visible=false;g.add(lt);
  g.scale.setScalar(HS);heroG.add(g);o={g,m,cls:h.c,fem,hs,gl,rg,lt,ry:0,mv:0,ph:Math.random()*6,x:0,z:0,init:0};HM.set(h.id,o)}
 return o}
function hpos(h,BM){const bm=BM.get(h.id);if(bm){const p=bpos(h,bm);return[p[0]/sc,p[1]/sc]}return[h.x+((h.id%3)-1)*1.5,h.y+((h.id%2)-.5)*2]}
function updHeroes(dt,tm){
 const BM=bAssign(),kd=dk(),seen=new Set();
 for(const h of S.hero){const bm=BM.get(h.id);if(hidn(h)&&!bm)continue;seen.add(h.id);const o=heroFor(h),[x,z]=hpos(h,BM),y=H3(x,z);
  if(!o.init){o.x=x;o.z=z;o.init=1}
  const dx=x-o.x,dz=z-o.z,d=Math.hypot(dx,dz);if(d>.004){o.mv=tm;if(d>.01){const ta=Math.atan2(dx,dz);let da=ta-o.ry;da=Math.atan2(Math.sin(da),Math.cos(da));o.ry+=da*Math.min(1,dt*10)}}
  o.x=x;o.z=z;const mv=tm-o.mv<.22&&!bm,fg=h.st==='fight';
  o.g.position.set(x,y,z);o.g.rotation.y=fg?o.ry:o.ry;o.ph+=dt*(mv?1:.2);
  heroAnim(o.m,o.ph,mv);
  if(fg){const u=o.m.userData;u.arms[1].sh.rotation.x=-1.1+Math.sin(tm*13)*.7;u.arms[1].el.rotation.x=-.5}
  o.rg.visible=fg;if(fg){o.rg.scale.setScalar(1+Math.sin(tm*14)*.12)}
  o.lt.visible=!!(h.loot&&(h.st==='back'||h.st==='town'));
  o.gl.material.opacity=kd*.8;o.gl.visible=kd>0.01;
  o.g.visible=true}
 for(const [id,o] of HM)if(!seen.has(id)){if(!S.hero.some(q=>q.id===id)){heroG.remove(o.g);disp(o.g);HM.delete(id)}else o.g.visible=false}
 return BM}
// ---------- ciel / lumière ----------
function updLight(){
 const x=(6+24*(S.t-S.ds)/S.dl)%24,e=Math.sin((x-6)/12*Math.PI),kd=dk(),day=Math.max(0,e);
 const sk=new TH.Color().lerpColors(new TH.Color('#93bcdc'),new TH.Color('#0a1030'),kd);
 if(day<.35&&kd<1){sk.lerp(new TH.Color('#e8a070'),(1-day/.35)*.35*(1-kd))}
 scn.background=sk;scn.fog.color.copy(sk);
 const ang=(x-6)/12*Math.PI;sun.position.set(K.tx-Math.cos(ang)*150,Math.max(40,Math.sin(ang)*190+20),K.tz+75);
 sun.target.position.set(K.tx,0,K.tz);sun.target.updateMatrixWorld();
 sun.intensity=kd>=1?.55:(.25+1.7*Math.pow(day,.6))*(1-kd*.8);
 sun.color.set(kd>0?'#a9bcff':(day<.4?'#ffcf9a':'#fff2d6'));
 hemi.intensity=.7+.15*(1-kd);hemi.color.set(kd>.5?'#7f94d8':'#d7e8ff');const wg=Math.min(1,kd*1.3)*1.7;txm('win').emissiveIntensity=wg;txm('winv').emissiveIntensity=wg}
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
 cv.addEventListener('pointerdown',e=>{if(!K.on)return;e.stopImmediatePropagation();try{cv.setPointerCapture(e.pointerId)}catch(_){}PT.set(e.pointerId,[e.offsetX,e.offsetY]);G3.pd=0;G3.pc=null;G3.tp=e.isPrimary&&PT.size<=1?{x:e.offsetX,y:e.offsetY,t:Date.now(),m:0}:null},true);
 cv.addEventListener('pointermove',e=>{if(!K.on)return;e.stopImmediatePropagation();if(!PT.has(e.pointerId))return;const o=PT.get(e.pointerId),n=[e.offsetX,e.offsetY];PT.set(e.pointerId,n);
  if(G3.tp&&Math.hypot(e.offsetX-G3.tp.x,e.offsetY-G3.tp.y)>8){G3.tp.m=1;fol=null}
  if(PT.size===1){if(G3.tp&&G3.tp.m)fol=null;dragTo(o,n)}
  else if(PT.size===2){const [a,b]=[...PT.values()],d=Math.hypot(a[0]-b[0],a[1]-b[1]),cn=[(a[0]+b[0])/2,(a[1]+b[1])/2];fol=null;if(G3.pd&&G3.pc){zoomAtPt(G3.pc[0],G3.pc[1],d/G3.pd);dragTo(G3.pc,cn)}G3.pd=d;G3.pc=cn}},true);
 const up=e=>{if(!K.on)return;e.stopImmediatePropagation();PT.delete(e.pointerId);G3.pd=0;G3.pc=null;if(e.type==='pointerup'&&G3.tp&&!G3.tp.m&&Date.now()-G3.tp.t<500)glTap(e.offsetX,e.offsetY);if(!PT.size)G3.tp=null};
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
  lab(`${sn(h.name)} · niv. ${h.lv}`,/⁠/.test(h.name),p,'#fff');if(h.bless)lab('✦✦',0,[p[0],p[1]-fs*1.15],'#ffe066');
  if(h.st==='fight'&&h.en)lab(h.en.n,0,[p[0],p[1]+fs*1.15],'#ffb3a8');
  if(showT&&(h.st==='go'||h.st==='back'||(h.st==='town'&&h.sub==='do')))lab(fm(rem(h)),0,[p[0],p[1]+(h.st==='fight'?fs*2.3:fs*1.15)],'#e6f1ff')}
 for(const it of S.pl){const c=it.cn||it.rb;if(!c)continue;const p=slot(it),x=T.x+p[0],z=T.y+p[1],q=pj(x,H3(x,z)+(BTOP[NK[it.e]||'H']||6.7)+3,z);lab('🔨 '+Math.min(99,Math.floor(c.t/c.T*100))+' %',0,q,'#fff')}
 for(const m of S.marks){const a=S.t-m.t;if(a>240)continue;const p=pj(m.x,H3(m.x,m.y)+1.5,m.y);if(!p)continue;cx.globalAlpha=Math.max(.35,1-a/240);cx.font='20px serif';cx.fillText('💀',p[0],p[1]);if(m.n){cx.font=(/⁠/.test(m.n)?'italic ':'')+`700 ${fs}px Alegreya,serif`;cx.lineWidth=3;cx.strokeStyle='rgba(20,28,22,.85)';cx.strokeText(sn(m.n),p[0],p[1]+14);cx.fillStyle='#fff';cx.fillText(sn(m.n),p[0],p[1]+14)}cx.globalAlpha=1}
 const PL=[];LB.sort((a,b)=>a.y-b.y);for(const l of LB){cx.font=(l.i?'italic ':'')+`700 ${fs}px Alegreya,serif`;l.w=cx.measureText(l.t).width+4;for(let k=0;k<12&&PL.some(p=>Math.abs(p.x-l.x)<(p.w+l.w)/2&&Math.abs(p.y-l.y)<fs*1.05);k++)l.y-=fs*1.05;PL.push(l);cx.lineWidth=2.8;cx.strokeStyle='rgba(20,28,22,.85)';cx.strokeText(l.t,l.x,l.y);cx.fillStyle=l.c||'#fff';cx.fillText(l.t,l.x,l.y)}
 cx.restore();
 wxDraw();
 {const now=performance.now(),rs=CR.filter(r=>now-r.at<25000).reverse(),f=S.hero.filter(h=>h.st==='fight').slice(0,3),L=[...f.map(h=>({t:`${h.name} ⚔️ ${h.en.n}`,c:'#fff'})),...rs].slice(0,5);
  if(L.length){const fz=sc*2.9,lh=fz*1.4;cx.font=`${fz}px Alegreya,serif`;const mw=Math.max(...L.map(l=>cx.measureText(sn(l.t)).width))+14,pw=Math.min(W-12,Math.max(W*.5,mw));cx.fillStyle='rgba(20,24,26,.8)';cx.beginPath();cx.roundRect(6,6,pw,lh*(L.length+1)+8,8);cx.fill();cx.textAlign='left';cx.fillStyle='#e2b43c';cx.font=`700 ${fz}px Alegreya,serif`;cx.fillText(f.length?'Combats en cours':'Combats',12,6+lh);L.forEach((l,i)=>{cx.fillStyle=l.c;cx.font=(/⁠/.test(l.t)?'italic ':'')+`${fz}px Alegreya,serif`;cx.fillText(sn(l.t),12,6+lh*(i+2))});cx.textAlign='center'}}
 if(S.alert&&performance.now()-S.alert.at<25000){cx.fillStyle='rgba(192,57,43,.95)';cx.beginPath();cx.roundRect(6,H-sc*9-6,W-12,sc*9,8);cx.fill();cx.fillStyle='#fff';cx.font=`700 ${sc*3.6}px Alegreya,serif`;cx.fillText(sn(S.alert.txt),W/2,H-sc*9-6+sc*5.6)}}
// ---------- init / boucle ----------
function init(){
 if(K.ok||K.fail)return K.ok;
 try{
  glc=document.createElement('canvas');glc.style.cssText='position:absolute;pointer-events:none;border-radius:10px;display:none';cv.parentElement.insertBefore(glc,cv);
  ren=new TH.WebGLRenderer({canvas:glc,antialias:true,powerPreference:'high-performance',preserveDrawingBuffer:/dbg=1/.test(location.search)});
  if(!ren.getContext())throw 0;
  K.prMax=Math.min(window.devicePixelRatio||1,1.5);K.pr=K.prMax;ren.setPixelRatio(K.pr);
  ren.shadowMap.enabled=true;ren.shadowMap.type=TH.PCFSoftShadowMap;ren.shadowMap.autoUpdate=true;ren.toneMapping=TH.ACESFilmicToneMapping;ren.toneMappingExposure=1.05;
  scn=new TH.Scene();scn.fog=new TH.Fog('#93bcdc',700,2300);
  cam3=new TH.PerspectiveCamera(34,W/H,5,3200);
  hemi=new TH.HemisphereLight('#d7e8ff','#6a7a50',1);scn.add(hemi);
  sun=new TH.DirectionalLight('#fff2d6',2.4);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-95,right:95,top:95,bottom:-95,near:1,far:700});sun.shadow.bias=-.0006;sun.shadow.normalBias=.35;scn.add(sun,sun.target);
  worldG=new TH.Group();villG=new TH.Group();heroG=new TH.Group();scn.add(worldG,villG,heroG);
  bindInput();K.ok=true}catch(e){K.fail=true;K.ok=false;try{if(glc&&glc.parentElement)glc.parentElement.removeChild(glc)}catch(_){}}
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
 const BM=updHeroes(dt,tm);updLight();updCam(dt);
 if(WTEX)WTEX.offset.x=-(tm*.12)%1;
 par^=1;ren.shadowMap.autoUpdate=false;ren.shadowMap.needsUpdate=!!par;
 ren.render(scn,cam3);
 // résolution adaptative
 K.ft.push(dt);if(K.ft.length>50){const a=K.ft.reduce((s,v)=>s+v,0)/K.ft.length;K.ft=[];K.fps=1/a;
  if(a>1/38&&K.pr>1){K.pr=Math.max(1,K.pr-.25);ren.setPixelRatio(K.pr);resize()}else if(a<1/55&&K.pr<K.prMax){K.pr=Math.min(K.prMax,K.pr+.25);ren.setPixelRatio(K.pr);resize()}}
 overlay(BM);return true}
function setOn(v){K.on=!!v;if(K.on&&!init()){K.on=false}try{localStorage.setItem('bvr',K.on?'3':'2')}catch(e){}if(glc)glc.style.display=K.on?'block':'none';if(!K.on){PT.clear();cx.clearRect(0,0,W,H)}else{gKey=vKey=''}const b=$('r3');if(b)b.textContent=K.on?'🧊 3D':'🖼️ 2D';fit()}
function boot(){let v='3';try{v=localStorage.getItem('bvr')||'3'}catch(e){}K.on=v!=='2'&&typeof THREE!=='undefined';const b=$('r3');if(b){b.onclick=()=>setOn(!K.on);b.textContent=K.on?'🧊 3D':'🖼️ 2D'}}
return{K,frame,resize,setOn,boot,H3,pj,hpos,HM,ground,dragTo,zoomAtPt,camPlace,get ok(){return K.ok}}
})();
const _draw2D=draw,_fit2D=fit;
draw=function(){if(GLX.K.on&&GLX.frame())return;_draw2D()};
fit=function(){_fit2D();GLX.resize()};
GLX.boot();
