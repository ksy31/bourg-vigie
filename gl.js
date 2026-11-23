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
const TH=THREE,WXd=100*MS,WYd=130*MS,HS=3;
const K={on:false,ok:false,fail:false,dist:190,az:0,tilt:.95,tx:T.x,tz:T.y-45,pr:1,prMax:1.5,ft:[],lastFol:null};
let ren,scn,cam3,glc,sun,hemi,terr,tex,gcv,worldG,villG,heroG,gKey='',vKey='',pKey='',vtKey='',tRoad=[],fpsT=0,fpsN=0,par=0;
const HM=new Map(),FACE3=new Map(),V3a=new TH.Vector3();
const rg3=a=>()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const smooth=(a,b,x)=>{x=Math.min(1,Math.max(0,(x-a)/(b-a)));return x*x*(3-2*x)};
function H3(x,y){
 const d=Math.hypot(x-T.x,y-T.y),k=smooth(34,64,d);
 let h=(Math.sin(x*.045+1.3)*Math.cos(y*.037)*1.1+Math.sin(x*.1+y*.08)*.4+Math.cos(y*.13-x*.05)*.3)*k;
 for(const z of ZA){const r=ZRD(z.n),q=Math.hypot(x-z.x,y-z.y)/r;if(q>1.6)continue;
  if(z.n==='Montagne')h+=8*Math.exp(-q*q*2.4);
  else if(z.n==='Volcan')h+=11*Math.exp(-q*q*3)-(q<.2?(.2-q)*22:0);
  else if(z.n==='Mine')h+=2.4*Math.exp(-q*q*2)}
 return h}
const ZCOL={'Forêt':'#3d6b38','Mine':'#6e6a62','Montagne':'#8d9298','Ruines':'#8c7a5c','Donjon':'#52405c','Volcan':'#3a2a28','Trône du Roi':'#2c2832'};
// ---------- texture du sol ----------
function paintGround(){
 const TS=6,w=Math.round(WXd*TS),h=Math.round(WYd*TS),c=gcv||(gcv=document.createElement('canvas'));c.width=w;c.height=h;
 const g=c.getContext('2d'),R=rg3(1234);
 const gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,'#86a772');gr.addColorStop(1,'#9bba84');g.fillStyle=gr;g.fillRect(0,0,w,h);
 g.save();g.scale(TS,TS);
 for(let i=0;i<260;i++){const x=R()*WXd,y=R()*WYd,r=10+R()*22,lt=R()<.5,q=g.createRadialGradient(x,y,0,x,y,r);q.addColorStop(0,lt?'rgba(255,255,210,.13)':'rgba(25,55,30,.13)');q.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=q;g.fillRect(x-r,y-r,2*r,2*r)}
 g.lineWidth=.16;for(let i=0;i<5200;i++){const x=R()*WXd,y=R()*WYd;g.strokeStyle=R()<.5?'#6f9360':'#a9c98f';g.beginPath();g.moveTo(x,y);g.lineTo(x+(R()-.5)*.5,y-.5-R()*.4);g.stroke()}
 for(let i=0;i<500;i++){g.fillStyle=['#fff8e1','#ffe082','#f8bbd0','#ce93d8'][Math.floor(R()*4)];g.beginPath();g.arc(R()*WXd,R()*WYd,.16,0,7);g.fill()}
 for(const z of ZA){const r=ZRD(z.n)*1.05,q=g.createRadialGradient(z.x,z.y,r*.2,z.x,z.y,r),col=ZCOL[z.n]||'#555';q.addColorStop(0,col);q.addColorStop(.7,col+'cc');q.addColorStop(1,col+'00');g.fillStyle=q;g.fillRect(z.x-r,z.y-r,2*r,2*r);
  if(z.n==='Volcan'){const q2=g.createRadialGradient(z.x,z.y,0,z.x,z.y,r*.3);q2.addColorStop(0,'#f06a2a');q2.addColorStop(.6,'#8a2a1a');q2.addColorStop(1,'rgba(60,30,25,0)');g.fillStyle=q2;g.fillRect(z.x-r,z.y-r,2*r,2*r)}
  if(z.n==='Mine'||z.n==='Ruines'||z.n==='Montagne'){for(let i=0;i<60;i++){const a=R()*6.283,d=Math.sqrt(R())*r*.9;g.fillStyle=R()<.5?'rgba(40,40,40,.18)':'rgba(230,230,220,.16)';g.beginPath();g.arc(z.x+Math.cos(a)*d,z.y+Math.sin(a)*d,.5+R()*1.2,0,7);g.fill()}}}
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
 const SX=1.5,nx=Math.round(WXd/SX),nz=Math.round(WYd/SX),pos=new Float32Array((nx+1)*(nz+1)*3),uv=new Float32Array((nx+1)*(nz+1)*2),idx=[];
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
function castle(a,x,z,sc2,wall,roof,seed){
 const y=H3(x,z)-.4,w=9*sc2,d=7.5*sc2,hh=7*sc2,tr=1.7*sc2,th=hh+4.2*sc2;
 a.add(new TH.BoxGeometry(w,hh,d),wall,x,y+hh/2,z,{shade:.08});
 a.add(new TH.BoxGeometry(w+.8*sc2,.9*sc2,d+.8*sc2),dkc(wall,.12),x,y+hh,z,{shade:0});
 for(let i=-3;i<=3;i++){a.add(new TH.BoxGeometry(.9*sc2,.9*sc2,.9*sc2),wall,x+i*w/6.6,y+hh+1.1*sc2,z+d/2+.2*sc2,{shade:0});a.add(new TH.BoxGeometry(.9*sc2,.9*sc2,.9*sc2),wall,x+i*w/6.6,y+hh+1.1*sc2,z-d/2-.2*sc2,{shade:0})}
 for(const sx of[-1,1])for(const sz of[-1,1]){const tx=x+sx*w/2,tz=z+sz*d/2;a.add(new TH.CylinderGeometry(tr,tr*1.08,th,14),wall,tx,y+th/2,tz,{shade:.1});a.add(new TH.ConeGeometry(tr*1.35,3.4*sc2,14),roof,tx,y+th+1.7*sc2,tz,{shade:.12})}
 a.add(new TH.BoxGeometry(2.2*sc2,3.2*sc2,.5*sc2),'#2a2018',x,y+1.6*sc2,z+d/2+.1,{shade:0});
 a.add(new TH.BoxGeometry(w*.5,2.6*sc2,d*.5),wall,x,y+hh+1.3*sc2,z,{shade:.08});a.add(new TH.ConeGeometry(w*.38,3*sc2,4),roof,x,y+hh+4.1*sc2,z,{ry:Math.PI/4,shade:.12});
 for(const q of[-2.6,2.6])a.add(new TH.BoxGeometry(.8*sc2,1.5*sc2,.3),'#2a2018',x+q*sc2,y+hh*.62,z+d/2+.1,{shade:0})}
function buildWorld(){
 clearG(worldG);const R=rg3(777),a=acc2(),ti=[],tc=[],rocks=[];
 const col3=['#2f6a35','#3a7a3c','#2a5c34','#44823f'];
 const tree=(x,z,s)=>ti.push({x,y:H3(x,z)-.2,z,s,c:col3[Math.floor(R()*4)],r:R()*6});
 // points de route échantillonnés (pour éviter de planter dessus)
 tRoad=[];for(const z of ZA){const p=RD[z.n];if(p)for(let k=0;k<p.length;k+=3)tRoad.push(p[k])}
 const vd=vdim(),clear=(x,y,m)=>{if(((x-T.x)/(vd.rx+m))**2+((y-T.y)/(vd.ry+m))**2<1)return false;for(const p of tRoad)if(Math.abs(p[0]-x)<m&&Math.abs(p[1]-y)<m&&Math.hypot(p[0]-x,p[1]-y)<m)return false;if(nearRiver(x,y,m))return false;return true};
 // arbres ambiants
 for(let i=0,n=0;i<900&&n<230;i++){const x=6+R()*(WXd-12),y=6+R()*(WYd-12);let inZ=false;for(const z of ZA)if(Math.hypot(x-z.x,y-z.y)<ZRD(z.n)+3)inZ=true;if(inZ||!clear(x,y,5))continue;tree(x,y,.8+R()*.8);n++}
 for(let i=0,n=0;i<500&&n<70;i++){const x=6+R()*(WXd-12),y=6+R()*(WYd-12);let inZ=false;for(const z of ZA)if(Math.hypot(x-z.x,y-z.y)<ZRD(z.n)+3)inZ=true;if(inZ||!clear(x,y,4))continue;rocks.push({x,y:H3(x,y)+.2,z:y,sx:.5+R()*.9,sy:.4+R()*.5,sz:.5+R()*.9,r:R()*6,c:'#8d8f86'});n++}
 for(const z of ZA){const r=ZRD(z.n),n=z.n,zx=z.x,zz=z.y,rd=(k)=>R()*k;
  const around=(cnt,fn,rr)=>{for(let i=0,c=0;i<cnt*6&&c<cnt;i++){const an=R()*6.283,d=Math.sqrt(R())*r*(rr||.92),x=zx+Math.cos(an)*d,y=zz+Math.sin(an)*d;if(!clear(x,y,2.6))continue;fn(x,y);c++}};
  if(n==='Forêt'){around(170,(x,y)=>tree(x,y,.9+R()*1.1),.95);around(14,(x,y)=>rocks.push({x,y:H3(x,y)+.2,z:y,sx:.6+R(),sy:.5+R()*.4,sz:.6+R(),r:R()*6,c:'#7a7d74'}),.9)}
  else if(n==='Mine'){around(26,(x,y)=>rocks.push({x,y:H3(x,y)+.3,z:y,sx:1+R()*1.6,sy:.9+R()*1.4,sz:1+R()*1.6,r:R()*6,c:R()<.5?'#6f6c66':'#5a5853'}),.95);
   const mx=zx,mz=zz-4,y0=H3(mx,mz);for(const s of[-1,1])a.add(new TH.BoxGeometry(.7,4,.7),'#6b4a2a',mx+s*2.2,y0+2,mz,{shade:.1});a.add(new TH.BoxGeometry(5.4,.8,.9),'#6b4a2a',mx,y0+4,mz,{shade:.1});a.add(new TH.BoxGeometry(4,3.6,.4),'#14100e',mx,y0+1.8,mz-.2,{shade:0});a.add(new TH.ConeGeometry(4,2.6,4),'#4a4640',mx,y0+5.3,mz-.8,{ry:Math.PI/4,shade:.1});a.add(new TH.BoxGeometry(2.4,.5,1.3),'#4a3a2a',mx+5,y0+.5,mz+4,{shade:.1});for(const s of[-1,1])a.add(new TH.CylinderGeometry(.4,.4,.2,10),'#2a2a2a',mx+5+s*.8,y0+.2,mz+4.7,{rx:Math.PI/2,shade:0})}
  else if(n==='Montagne'){for(let i=0;i<7;i++){const an=i/7*6.283+R()*.4,d=i?r*(.35+R()*.45):0,x=zx+Math.cos(an)*d,y=zz+Math.sin(an)*d,h=i?11+R()*10:22,b=i?6+R()*4:10,y0=H3(x,y)-1;
    a.add(new TH.ConeGeometry(b,h,7),'#7d8590',x,y0+h/2,y,{ry:R()*3,shade:.2});a.add(new TH.ConeGeometry(b*.45,h*.38,7),'#eef2f6',x,y0+h*.81,y,{ry:R()*3,shade:.1})}
   around(22,(x,y)=>tree(x,y,.8+R()*.6),.95)}
  else if(n==='Ruines'){for(let i=0;i<11;i++){const an=R()*6.283,d=Math.sqrt(R())*r*.75,x=zx+Math.cos(an)*d,y=zz+Math.sin(an)*d,h=1.6+R()*4.2,y0=H3(x,y);
    if(R()<.55)a.add(new TH.CylinderGeometry(.75,.9,h,10),'#c9bfa9',x,y0+h/2,y,{rz:(R()-.5)*.12,shade:.1});else a.add(new TH.BoxGeometry(2+R()*3.5,1+R()*3,.9),'#b4a88f',x,y0+.9,y,{ry:R()*3,shade:.1})}
   for(let i=0;i<3;i++){const x=zx+(i-1)*4.4,y=zz+2+(i%2)*3,y0=H3(x,y);a.add(new TH.CylinderGeometry(.8,.95,5.2,10),'#cfc5ae',x-1.6,y0+2.6,y,{shade:.1});a.add(new TH.CylinderGeometry(.8,.95,5.2,10),'#cfc5ae',x+1.6,y0+2.6,y,{shade:.1});a.add(new TH.BoxGeometry(4.6,.9,1.3),'#c2b79f',x,y0+5.6,y,{shade:.1})}
   around(18,(x,y)=>rocks.push({x,y:H3(x,y)+.2,z:y,sx:.5+R()*.8,sy:.4+R()*.5,sz:.5+R()*.8,r:R()*6,c:'#9c9482'}),.9)}
  else if(n==='Donjon')castle(a,zx,zz,1.35,'#cfc8bb','#c24a3e')
  else if(n==='Trône du Roi')castle(a,zx,zz,.9,'#3a3842','#5f4c8e')
  else if(n==='Volcan'){around(30,(x,y)=>rocks.push({x,y:H3(x,y)+.3,z:y,sx:.8+R()*1.3,sy:.7+R()*1.1,sz:.8+R()*1.3,r:R()*6,c:R()<.5?'#2f2523':'#4a2f28'}),.95)}
 }
 // ponts
 for(const b of BRG){const y0=Math.max(H3(b.x-Math.cos(b.a)*b.l/2,b.y-Math.sin(b.a)*b.l/2),H3(b.x+Math.cos(b.a)*b.l/2,b.y+Math.sin(b.a)*b.l/2))+.25;
  a.add(new TH.BoxGeometry(b.l,.35,3.6),'#a07a4a',b.x,y0,b.y,{ry:-b.a,shade:0});for(const s of[-1,1])a.add(new TH.BoxGeometry(b.l,.35,.3),'#5a3a22',b.x+Math.sin(b.a)*s*1.8,y0+.5,b.y-Math.cos(b.a)*s*1.8,{ry:-b.a,shade:0})}
 if(a.g.length)meshOf(a,worldG);
 inst(worldG,new TH.CylinderGeometry(.28,.38,1.8,6),MI,ti.map(q=>({x:q.x,y:q.y+.9*q.s,z:q.z,s:q.s,c:'#6b4a2a'})),true);
 inst(worldG,new TH.ConeGeometry(1.7,3.4,7),MI,ti.map(q=>({x:q.x,y:q.y+2.5*q.s,z:q.z,s:q.s,c:q.c,r:q.r})),true);
 inst(worldG,new TH.ConeGeometry(1.25,2.6,7),MI,ti.map(q=>({x:q.x,y:q.y+4.2*q.s,z:q.z,s:q.s,c:q.c,r:q.r})),true);
 inst(worldG,new TH.IcosahedronGeometry(1,0),MI,rocks,true);
 // volcan : lueur
 const vz=ZA.find(z=>z.n==='Volcan');if(vz){const sp=new TH.Sprite(new TH.SpriteMaterial({map:glowTex(),color:'#ff7a2a',blending:TH.AdditiveBlending,depthWrite:false,transparent:true}));sp.position.set(vz.x,H3(vz.x,vz.y)+2,vz.y);sp.scale.set(30,30,1);worldG.add(sp)}}
// ---------- village ----------
const WALL={A:'#e6d3a8',V:'#ece2c8',F:'#b9b2a4',T:'#d9b98f',S:'#efeae0',M:'#a8794a',E:'#a8794a',I:'#a9acb6',C:'#d9c9a3',H:'#d9b98f'},ROOF={A:'#9b4a2f',V:'#3f5f8a',F:'#55555e',T:'#7a3d2e',S:'#6c7fb5',M:'#c9a24a',E:'#6b4a2a',I:'#3f4e6b',C:'#7a2f3a',H:'#8b4a3a'};
function buildVillageMesh(){
 clearG(villG);const a=acc2(),{u}=vdim();
 for(const [p,e,it] of u){const k=NK[e]||'H',x=T.x+p[0],z=T.y+p[1],y0=H3(x,z),w=2*BHW(k)+(k==='A'?.8:0),d=k==='A'?6.6:5.4,tier=Math.max(0,tr(k)-(it.rb?1:0));
  const rc=(it.h&&it.h.o!=null&&(S.hero.find(q=>q.id===it.h.o)||{}).col)||'#8b4a3a';
  let f=1;if(it.cn)f=Math.max(.0,bstg(it));
  const wh=(BTOP[k]||6.7)*.5+tier*.45,wall=WALL[k]||'#d9b98f',roof=k==='H'?rc:ROOF[k]||'#8b4a3a';
  if(it.cn&&f<=0){a.add(new TH.BoxGeometry(w,.35,d),'#8f8a7d',x,y0+.18,z,{shade:0})}
  else{const hh=it.cn?wh*Math.max(.3,f):wh;
   a.add(new TH.BoxGeometry(w,hh,d),wall,x,y0+hh/2,z,{shade:.1});
   if(!it.cn||f>=.75){
    if(k==='M'){for(const s of[-1,1])a.add(new TH.BoxGeometry(.4,hh,.4),'#6b4a2a',x+s*w*.45,y0+hh/2,z+d*.4,{shade:0});a.add(new TH.BoxGeometry(w+.6,.35,d*.8),roof,x,y0+hh+.2,z+.4,{rx:.18,shade:.1})}
    else{const rh=(BTOP[k]||6.7)*.45+tier*.2;a.add(new TH.ConeGeometry(Math.max(w,d)*.74,rh,4),roof,x,y0+hh+rh/2,z,{ry:Math.PI/4,sx:w/Math.max(w,d)*1.02,sz:d/Math.max(w,d)*1.1,shade:.1});
     if(k==='S'){a.add(new TH.BoxGeometry(2.4,hh+3.8,2.4),wall,x+w*.5-1.2,y0+(hh+3.8)/2,z-d*.2,{shade:.1});a.add(new TH.ConeGeometry(2.1,3.4,4),roof,x+w*.5-1.2,y0+hh+5.5,z-d*.2,{ry:Math.PI/4,shade:.1})}
     if(k==='V'){a.add(new TH.BoxGeometry(2.6,hh*.9,2.6),wall,x,y0+hh+rh*.5,z,{shade:.1});a.add(new TH.ConeGeometry(2.3,2.6,4),roof,x,y0+hh+rh*.5+hh*.45+1.3,z,{ry:Math.PI/4,shade:.1})}
     if(k==='F'||k==='T'||k==='H'||k==='A')a.add(new TH.BoxGeometry(.9,rh*.9,.9),'#8a847a',x-w*.28,y0+hh+rh*.55,z-d*.15,{shade:.1})}
    a.add(new TH.BoxGeometry(1.3,2.2,.25),'#4a2f1b',x,y0+1.1,z+d/2+.08,{shade:0});
    for(const s of[-1,1])a.add(new TH.BoxGeometry(1,1,.2),'#3b5a78',x+s*w*.3,y0+hh*.55,z+d/2+.06,{shade:0})}}
  if(it.cn||it.rb){const sh=(BTOP[k]||6.7)*.85,hw=w/2+.7;for(const sx of[-1,1])for(const sz of[-1,1])a.add(new TH.BoxGeometry(.28,sh,.28),'#9a7a4a',x+sx*hw,y0+sh/2,z+sz*(d/2+.7),{shade:0});
   for(let q=1;q<=3;q++)a.add(new TH.BoxGeometry(w+1.6,.2,.28),'#b08850',x,y0+q*sh/3.4,z+d/2+.7,{shade:0})}
 }
 // puits + palissade simplifiée
 if(a.g.length)meshOf(a,villG)}
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
 const ang=(x-6)/12*Math.PI;sun.position.set(K.tx-Math.cos(ang)*90,Math.max(25,Math.sin(ang)*110+12),K.tz+45);
 sun.target.position.set(K.tx,0,K.tz);sun.target.updateMatrixWorld();
 sun.intensity=kd>=1?.55:(.25+1.7*Math.pow(day,.6))*(1-kd*.8);
 sun.color.set(kd>0?'#a9bcff':(day<.4?'#ffcf9a':'#fff2d6'));
 hemi.intensity=.7+.15*(1-kd);hemi.color.set(kd>.5?'#7f94d8':'#d7e8ff')}
// ---------- caméra / entrées ----------
function updCam(dt){
 if(fol!=null){const q=S.hero.find(z=>z.id===fol);if(q){const [x,z]=hpos(q,bAssign());if(K.lastFol!==fol){K.dist=Math.min(K.dist,70);K.lastFol=fol}K.tx+=(x-K.tx)*Math.min(1,dt*6);K.tz+=(z-K.tz)*Math.min(1,dt*6)}else fol=null}else K.lastFol=null;
 K.dist=Math.min(340,Math.max(32,K.dist));K.tx=Math.min(WXd,Math.max(0,K.tx));K.tz=Math.min(WYd,Math.max(0,K.tz));
 const ty=H3(K.tx,K.tz),cp=Math.cos(K.tilt),sp=Math.sin(K.tilt);
 cam3.position.set(K.tx+Math.sin(K.az)*cp*K.dist,ty+sp*K.dist,K.tz+Math.cos(K.az)*cp*K.dist);cam3.lookAt(K.tx,ty,K.tz);cam3.updateMatrixWorld()}
const PT=new Map();let G3={pd:0,pa:0,tp:null};
function mpp(){return 2*K.dist*Math.tan(cam3.fov*Math.PI/360)/Math.max(1,H)}
function glTap(x,y){let b=null,bd=1e9;const BM=bAssign();for(const q of S.hero){if(hidn(q)&&!BM.get(q.id))continue;const [hx,hz]=hpos(q,BM);V3a.set(hx,H3(hx,hz)+HS*.7,hz).project(cam3);const sx=(V3a.x*.5+.5)*W,sy=(-V3a.y*.5+.5)*H,d=Math.hypot(sx-x,sy-y);if(d<bd){bd=d;b=q}}
 if(b&&bd<34){fol=b.id;K.dist=Math.min(K.dist,70)}else fol=null}
function bindInput(){
 const stop=e=>{if(K.on)e.stopImmediatePropagation()};
 cv.addEventListener('pointerdown',e=>{if(!K.on)return;e.stopImmediatePropagation();try{cv.setPointerCapture(e.pointerId)}catch(_){}PT.set(e.pointerId,[e.offsetX,e.offsetY]);G3.pd=0;G3.tp=e.isPrimary&&PT.size<=1?{x:e.offsetX,y:e.offsetY,t:Date.now(),m:0}:null},true);
 cv.addEventListener('pointermove',e=>{if(!K.on)return;e.stopImmediatePropagation();if(!PT.has(e.pointerId))return;const o=PT.get(e.pointerId),n=[e.offsetX,e.offsetY];PT.set(e.pointerId,n);
  if(G3.tp&&Math.hypot(e.offsetX-G3.tp.x,e.offsetY-G3.tp.y)>8){G3.tp.m=1;fol=null}
  if(PT.size===1){const dx=n[0]-o[0],dy=n[1]-o[1],m=mpp(),ca=Math.cos(K.az),sa=Math.sin(K.az),sp=Math.sin(K.tilt);K.tx-=ca*dx*m;K.tz+=sa*dx*m;K.tx+=sa*dy*m/sp;K.tz+=ca*dy*m/sp;fol=null}
  else if(PT.size===2){const [a,b]=[...PT.values()],d=Math.hypot(a[0]-b[0],a[1]-b[1]),an=Math.atan2(b[1]-a[1],b[0]-a[0]);if(G3.pd){K.dist/=d/G3.pd;let da=an-G3.pa;da=Math.atan2(Math.sin(da),Math.cos(da));K.az-=da}G3.pd=d;G3.pa=an}},true);
 const up=e=>{if(!K.on)return;e.stopImmediatePropagation();PT.delete(e.pointerId);G3.pd=0;if(e.type==='pointerup'&&G3.tp&&!G3.tp.m&&Date.now()-G3.tp.t<500)glTap(e.offsetX,e.offsetY);if(!PT.size)G3.tp=null};
 cv.addEventListener('pointerup',up,true);cv.addEventListener('pointercancel',up,true);
 cv.addEventListener('wheel',e=>{if(!K.on)return;e.stopImmediatePropagation();e.preventDefault();K.dist*=e.deltaY<0?.87:1.15},{capture:true,passive:false});
 cv.addEventListener('dblclick',e=>{if(!K.on)return;e.stopImmediatePropagation();fol=null;K.dist=190;K.az=0;K.tx=T.x;K.tz=T.y-45},true)}
// ---------- calques 2D (noms, bulles, météo, panneaux) ----------
function pj(x,y,z){V3a.set(x,y,z).project(cam3);return V3a.z>1?null:[(V3a.x*.5+.5)*W,(-V3a.y*.5+.5)*H]}
function overlay(BM){
 cx.save();cx.setTransform(window.devicePixelRatio||1,0,0,window.devicePixelRatio||1,0,0);cx.clearRect(0,0,W,H);cx.textAlign='center';cx.lineJoin='round';
 const fs=12,LB=[],lab=(t,i,p,c,sub)=>{if(p)LB.push({t,i,x:p[0],y:p[1],c,sub})};
 const ZI={'Forêt':'🌲','Mine':'⛏️','Montagne':'🏔️','Ruines':'🏚️','Donjon':'🏰','Volcan':'🌋'};
 for(const z of ZA){const p=pj(z.x,H3(z.x,z.y)+(z.n==='Montagne'?26:z.n==='Volcan'?18:14),z.y);if(!p)continue;const t=z.sn||z.n,s=Math.max(.8,Math.min(1.5,110/K.dist));cx.font=`700 ${12*s}px Alegreya,serif`;cx.lineWidth=3;cx.strokeStyle='rgba(20,28,22,.85)';cx.strokeText((z.boss?'👹 ':(ZI[z.n]||'⚔️')+' ')+t,p[0],p[1]);cx.fillStyle='#fff';cx.fillText((z.boss?'👹 ':(ZI[z.n]||'⚔️')+' ')+t,p[0],p[1]);cx.font=`${11*s}px serif`;cx.fillText(z.boss?'👑':'🔥'.repeat(z.vi+1),p[0],p[1]+13*s)}
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
  scn=new TH.Scene();scn.fog=new TH.Fog('#93bcdc',260,720);
  cam3=new TH.PerspectiveCamera(34,W/H,3,1200);
  hemi=new TH.HemisphereLight('#d7e8ff','#6a7a50',1);scn.add(hemi);
  sun=new TH.DirectionalLight('#fff2d6',2.4);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-95,right:95,top:95,bottom:-95,near:1,far:320});sun.shadow.bias=-.0006;sun.shadow.normalBias=.35;scn.add(sun,sun.target);
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
 par^=1;ren.shadowMap.autoUpdate=false;ren.shadowMap.needsUpdate=!!par;
 ren.render(scn,cam3);
 // résolution adaptative
 K.ft.push(dt);if(K.ft.length>50){const a=K.ft.reduce((s,v)=>s+v,0)/K.ft.length;K.ft=[];K.fps=1/a;
  if(a>1/38&&K.pr>1){K.pr=Math.max(1,K.pr-.25);ren.setPixelRatio(K.pr);resize()}else if(a<1/55&&K.pr<K.prMax){K.pr=Math.min(K.prMax,K.pr+.25);ren.setPixelRatio(K.pr);resize()}}
 overlay(BM);return true}
function setOn(v){K.on=!!v;if(K.on&&!init()){K.on=false}try{localStorage.setItem('bvr',K.on?'3':'2')}catch(e){}if(glc)glc.style.display=K.on?'block':'none';if(!K.on){PT.clear();cx.clearRect(0,0,W,H)}else{gKey=vKey=''}const b=$('r3');if(b)b.textContent=K.on?'🧊 3D':'🖼️ 2D';fit()}
function boot(){let v='3';try{v=localStorage.getItem('bvr')||'3'}catch(e){}K.on=v!=='2'&&typeof THREE!=='undefined';const b=$('r3');if(b){b.onclick=()=>setOn(!K.on);b.textContent=K.on?'🧊 3D':'🖼️ 2D'}}
return{K,frame,resize,setOn,boot,H3,pj,hpos,HM,get ok(){return K.ok}}
})();
const _draw2D=draw,_fit2D=fit;
draw=function(){if(GLX.K.on&&GLX.frame())return;_draw2D()};
fit=function(){_fit2D();GLX.resize()};
GLX.boot();
