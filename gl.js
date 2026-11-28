// Rendu 3D (WebGL) de la carte : terrain, routes, rivières, zones, village, aventuriers.
// Dépend de three.min.js (variable globale THREE). Si WebGL est indisponible, le jeu reste en 2D.
// v4.0.6 : diagnostic 3D (menu Developpeur), true = element non construit. w enceinte, c chantiers, p puits, m personnages et monstres,
// v4.0.7 : b batiments, l lampes et torches, d details, q Maison des Guildes (v = ancien reglage Tout le village)
const DBG=(()=>{try{const o=JSON.parse(localStorage.getItem('bvdbg')||'{}')||{};if(o.v){o.g=o.b=o.l=o.d=true;delete o.v}return o}catch(e){return{}}})();
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
 const KC=c=>P.col?'#'+new Col(c).lerp(new Col(P.col),.82).getHexString():c;if(P.col){C.c=KC(C.c);C.a=KC(C.a)}
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
  h.add(cyl(.46,.46,.035),KC('#4b3f9a'),0,hy+.2,-.02,{rx:-.22,shade:.05});
  h.add(cyl(.24,.27,.1),KC('#5a4cb0'),0,hy+.24,-.06,{rx:-.22,shade:.1});
  h.add(cone(.22,.62),KC('#5a4cb0'),0,hy+.56,-.15,{rx:-.4,shade:.18});
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
 if(cls==='V'){t.add(cap(.215,.18),KC('#3a3544'),0,.27,0,{sx:sx*1.06,sz:.9});
  t.add(cyl(.2,.33,.85,true),KC('#2f2a38'),0,.05,-.04,{sz:.9})}
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
const TH=THREE,WXd=100*MS,WYd=130*MS,HS=3,ZF=ZS/2,PXSZ=1.65;
const K={on:false,ok:false,fail:false,dist:300,az:0,tilt:.6,tx:T.x,tz:T.y-70,pr:1,prMax:1.5,ft:[],lastFol:null};
let ren,scn,cam3,glc,sun,hemi,terr,tex,gcv,worldG,villG,heroG,gKey='',vgKey='',vKey='',pKey='',vtKey='',tRoad=[],fpsT=0,fpsN=0,par=0;
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
// ===== v3.4.6 : détail haute résolution des sols (atlas de 4 textures procédurales + carte de mélange) =====
let spcv=null,spTex=null,dtlTex=null;const TDU={uSp:{value:null},uDt:{value:null}};
function dtlAtlas(){
 if(dtlTex)return dtlTex;
 const S=512,A=document.createElement('canvas');A.width=A.height=S*2;const out=A.getContext('2d');
 const mk=(fn,cx,cy,seed)=>{const c=document.createElement('canvas');c.width=c.height=S;const g=c.getContext('2d'),R=rg3(seed);
  const wr=(x,y,r,f)=>{for(const ox of[-S,0,S])for(const oy of[-S,0,S]){const X=x+ox,Y=y+oy;if(X>-r&&X<S+r&&Y>-r&&Y<S+r)f(X,Y)}};
  const blot=(n,r0,r1,cols,al)=>{for(let i=0;i<n;i++){const x=R()*S,y=R()*S,r=r0+R()*(r1-r0),c=cols[(R()*cols.length)|0];wr(x,y,r,(X,Y)=>{const q=g.createRadialGradient(X,Y,0,X,Y,r);q.addColorStop(0,'rgba('+c+','+al+')');q.addColorStop(1,'rgba('+c+',0)');g.fillStyle=q;g.fillRect(X-r,Y-r,2*r,2*r)})}};
  fn(g,R,wr,S,blot);
  const im=g.getImageData(0,0,S,S),d=im.data,m=[0,0,0];for(let i=0;i<d.length;i+=4){m[0]+=d[i];m[1]+=d[i+1];m[2]+=d[i+2]}
  for(let k=0;k<3;k++)m[k]=m[k]/(S*S)||128;
  for(let i=0;i<d.length;i+=4)for(let k=0;k<3;k++)d[i+k]=Math.max(0,Math.min(255,d[i+k]*128/m[k]));
  g.putImageData(im,0,0);out.drawImage(c,cx*S,cy*S)};
 // herbe : brins, trèfles, plaques de teinte
 mk((g,R,wr,S,blot)=>{g.fillStyle='#7f8870';g.fillRect(0,0,S,S);
  blot(70,30,90,['40,60,30','210,220,150','60,50,30'],.3);blot(160,10,26,['30,50,25','200,215,140'],.22);
  g.lineCap='round';
  for(let i=0;i<5200;i++){const x=R()*S,y=R()*S,l=7+R()*13,a=-1.57+(R()-.5)*1.2,lt=R()<.45;g.strokeStyle=lt?'rgba(185,205,140,.7)':'rgba(40,55,32,.7)';g.lineWidth=.9+R()*1.3;
   wr(x,y,l,(X,Y)=>{g.beginPath();g.moveTo(X,Y);g.quadraticCurveTo(X+Math.cos(a)*l*.3,Y+Math.sin(a)*l*.6,X+Math.cos(a)*l*.55+(R()-.5)*2,Y+Math.sin(a)*l);g.stroke()})}
  for(let i=0;i<150;i++){const x=R()*S,y=R()*S,r=3+R()*3;wr(x,y,r*2.4,(X,Y)=>{for(let k=0;k<3;k++){const a=k*2.094+R();g.fillStyle=R()<.5?'rgba(170,205,120,.75)':'rgba(70,100,50,.7)';g.beginPath();g.ellipse(X+Math.cos(a)*r*.8,Y+Math.sin(a)*r*.8,r,r*.8,0,0,7);g.fill()}})}
  for(let i=0;i<60;i++){const x=R()*S,y=R()*S;wr(x,y,5,(X,Y)=>{g.fillStyle=['rgba(255,250,225,.9)','rgba(255,225,120,.85)','rgba(245,185,205,.8)'][(R()*3)|0];g.beginPath();g.arc(X,Y,1.4+R()*1.3,0,7);g.fill()})}},0,0,101);
 // terre battue : grain, cailloux, fissures
 mk((g,R,wr,S,blot)=>{g.fillStyle='#98876a';g.fillRect(0,0,S,S);
  blot(80,25,80,['120,92,56','226,208,164','95,75,46'],.38);blot(200,8,22,['110,86,52','230,212,170'],.3);
  const P=['#8a7550','#a8926a','#c9b78d','#d6c7a0','#7c6846','#b5a074'];
  for(let i=0;i<9000;i++){g.fillStyle=P[(R()*6)|0];const w=1+R()*2.4;g.fillRect(R()*S,R()*S,w,w*(.6+R()*.6))}
  for(let i=0;i<420;i++){const x=R()*S,y=R()*S,r=2+R()*6,t=R(),rot=R()*3;wr(x,y,r*1.5,(X,Y)=>{g.fillStyle='rgba(55,40,22,.4)';g.beginPath();g.ellipse(X+r*.3,Y+r*.4,r*1.05,r*.72,rot,0,7);g.fill();g.fillStyle=t<.5?'#9a9484':t<.8?'#b8ab8c':'#7d786c';g.beginPath();g.ellipse(X,Y,r,r*.72,rot,0,7);g.fill();g.fillStyle='rgba(255,250,230,.4)';g.beginPath();g.ellipse(X-r*.25,Y-r*.25,r*.45,r*.28,rot,0,7);g.fill()})}
  g.lineCap='round';for(let i=0;i<40;i++){let x=R()*S,y=R()*S;const pts=[[x,y]];for(let k=0;k<6;k++){x+=(R()-.4)*22;y+=(R()-.5)*14;pts.push([x,y])}
   wr(pts[0][0],pts[0][1],60,(X,Y)=>{g.strokeStyle='rgba(60,45,26,.4)';g.lineWidth=1+R();g.beginPath();pts.forEach((p,j)=>{const px=p[0]-pts[0][0]+X,py=p[1]-pts[0][1]+Y;j?g.lineTo(px,py):g.moveTo(px,py)});g.stroke()})}
  for(let i=0;i<500;i++){const x=R()*S,y=R()*S,l=5+R()*9;wr(x,y,l,(X,Y)=>{g.strokeStyle=R()<.5?'rgba(110,125,60,.6)':'rgba(195,175,115,.65)';g.lineWidth=.9;g.beginPath();g.moveTo(X,Y);g.lineTo(X+(R()-.5)*l,Y-l);g.stroke()})}},1,0,202);
 // roche : plaques facettées, fissures, éclats
 mk((g,R,wr,S,blot)=>{g.fillStyle='#74747a';g.fillRect(0,0,S,S);
  const N=8,cs=S/N;
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){const cx=(i+.5+(R()-.5)*.7)*cs,cy=(j+.5+(R()-.5)*.7)*cs,n=6+((R()*3)|0),r0=cs*(.62+R()*.18),l=88+R()*60,hu=R()<.5?220:30,sa=3+R()*8,rot=R()*6;
   const pts=[];for(let k=0;k<n;k++){const a=rot+k/n*6.2832,rr=r0*(.8+R()*.35);pts.push([Math.cos(a)*rr,Math.sin(a)*rr*(.8+R()*.3)])}
   wr(cx,cy,r0*1.4,(X,Y)=>{g.beginPath();pts.forEach((p,k)=>k?g.lineTo(X+p[0],Y+p[1]):g.moveTo(X+p[0],Y+p[1]));g.closePath();g.fillStyle='hsl('+hu+','+sa+'%,'+(l/2.55).toFixed(0)+'%)';g.fill();g.lineJoin='round';g.lineWidth=3;g.strokeStyle='rgba(20,18,22,.7)';g.stroke();
    g.lineWidth=1.4;g.strokeStyle='rgba(255,255,255,.22)';g.beginPath();g.moveTo(X+pts[0][0],Y+pts[0][1]);g.lineTo(X+pts[1][0],Y+pts[1][1]);g.lineTo(X+pts[2%n][0],Y+pts[2%n][1]);g.stroke()})}
  blot(90,10,40,['20,20,24','235,235,240'],.14);
  for(let i=0;i<5000;i++){g.fillStyle=R()<.5?'rgba(255,255,255,.18)':'rgba(10,10,14,.22)';g.fillRect(R()*S,R()*S,1+R()*1.6,1+R()*1.6)}
  g.lineCap='round';for(let i=0;i<30;i++){let x=R()*S,y=R()*S;const pts=[[x,y]];for(let k=0;k<7;k++){x+=(R()-.5)*30;y+=(R()-.5)*30;pts.push([x,y])}
   wr(pts[0][0],pts[0][1],90,(X,Y)=>{g.strokeStyle='rgba(12,10,14,.55)';g.lineWidth=1+R()*1.2;g.beginPath();pts.forEach((p,j)=>{const px=p[0]-pts[0][0]+X,py=p[1]-pts[0][1]+Y;j?g.lineTo(px,py):g.moveTo(px,py)});g.stroke()})}},0,1,303);
 // dalles : grandes pierres plates, joints, usure, mousse
 mk((g,R,wr,S,blot)=>{g.fillStyle='#3a3732';g.fillRect(0,0,S,S);
  const rows=6,rh=S/rows;
  for(let j=0;j<rows;j++){const n=3+((R()*2)|0),cuts=[];let acc=0;for(let k=0;k<n;k++){cuts.push(.6+R()*.8);acc+=cuts[k-0]}const sc=S/acc;let x=R()*S;
   for(let k=0;k<n;k++){const w=cuts[k]*sc,l=34+R()*34,hu=30+R()*20,sa=4+R()*9,y=j*rh;
    wr(x+w/2,y+rh/2,w,(X,Y)=>{const x0=X-w/2+3,y0=Y-rh/2+3,ww=w-6,hh=rh-6,r=9;g.beginPath();g.moveTo(x0+r,y0);g.lineTo(x0+ww-r,y0);g.quadraticCurveTo(x0+ww,y0,x0+ww,y0+r);g.lineTo(x0+ww,y0+hh-r);g.quadraticCurveTo(x0+ww,y0+hh,x0+ww-r,y0+hh);g.lineTo(x0+r,y0+hh);g.quadraticCurveTo(x0,y0+hh,x0,y0+hh-r);g.lineTo(x0,y0+r);g.quadraticCurveTo(x0,y0,x0+r,y0);g.closePath();
     g.fillStyle='hsl('+hu.toFixed(0)+','+sa.toFixed(0)+'%,'+l.toFixed(0)+'%)';g.fill();g.lineWidth=2;g.strokeStyle='rgba(255,248,230,.3)';g.beginPath();g.moveTo(x0+r,y0+1);g.lineTo(x0+ww-r,y0+1);g.moveTo(x0+1,y0+r);g.lineTo(x0+1,y0+hh-r);g.stroke();g.strokeStyle='rgba(20,16,12,.4)';g.beginPath();g.moveTo(x0+r,y0+hh-1);g.lineTo(x0+ww-r,y0+hh-1);g.moveTo(x0+ww-1,y0+r);g.lineTo(x0+ww-1,y0+hh-r);g.stroke();
     for(let q=0;q<4;q++){g.fillStyle=R()<.5?'rgba(40,32,22,.14)':'rgba(255,245,220,.14)';g.beginPath();g.ellipse(x0+R()*ww,y0+R()*hh,ww*(.08+R()*.12),hh*(.08+R()*.12),R()*3,0,7);g.fill()}
     if(R()<.5){g.strokeStyle='rgba(20,16,12,.5)';g.lineWidth=1.2;g.beginPath();let cx=x0+R()*ww,cy=y0+3;g.moveTo(cx,cy);for(let q=0;q<4;q++){cx+=(R()-.5)*14;cy+=hh/4;g.lineTo(cx,Math.min(cy,y0+hh-2))}g.stroke()}});
    x+=w}}
  blot(120,6,18,['80,115,52'],.3);
  for(let i=0;i<4000;i++){g.fillStyle=R()<.5?'rgba(255,255,255,.12)':'rgba(10,8,6,.16)';g.fillRect(R()*S,R()*S,1+R()*1.5,1+R()*1.5)}},1,1,404);
 const t=new TH.CanvasTexture(A);t.colorSpace=TH.NoColorSpace;t.anisotropy=8;dtlTex=t;return t}
function paintSplat(w,h,TS){
 const c=spcv||(spcv=document.createElement('canvas'));c.width=w;c.height=h;const g=c.getContext('2d');
 g.globalCompositeOperation='source-over';g.fillStyle='#000';g.fillRect(0,0,w,h);g.globalCompositeOperation='lighter';g.save();g.scale(TS,TS);
 g.fillStyle='rgb(255,0,0)';
 ZA.forEach((z,zi)=>{const pts=RD[z.n];if(!pts)return;for(let k=pts.sh||0;k<pts.length;k++){const [x,y]=pts[k];g.beginPath();g.arc(x,y,1.7*rwv(k,zi*1.7+.4),0,7);g.fill()}});
 g.lineCap='round';g.lineJoin='round';g.strokeStyle='rgba(255,0,0,.8)';
 for(const r of RIV){for(let k=1;k<r.length;k++){g.lineWidth=rvW(k/r.length)*1.45+5.6;g.beginPath();g.moveTo(r[k-1][0],r[k-1][1]);g.lineTo(r[k][0],r[k][1]);g.stroke()}}
 const ZT={Mine:'0,255,0',Montagne:'0,255,0',Volcan:'0,255,0',Ruines:'0,0,255',Donjon:'0,0,255','Trône du Roi':'0,0,255'};
 for(const z of ZA){const cc=ZT[z.n];if(!cc)continue;const r=ZRD(z.n)*1.05,q=g.createRadialGradient(z.x,z.y,r*.2,z.x,z.y,r);q.addColorStop(0,'rgba('+cc+',1)');q.addColorStop(.6,'rgba('+cc+',.85)');q.addColorStop(1,'rgba('+cc+',0)');g.fillStyle=q;g.fillRect(z.x-r,z.y-r,2*r,2*r)}
 g.restore();g.globalCompositeOperation='source-over';
 if(!spTex){spTex=new TH.CanvasTexture(c);spTex.colorSpace=TH.NoColorSpace;spTex.anisotropy=4}else spTex.needsUpdate=true}
function terrDetail(mat){
 TDU.uSp.value=spTex;TDU.uDt.value=dtlAtlas();
 mat.onBeforeCompile=sh=>{Object.assign(sh.uniforms,TDU);
  sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vWP;').replace('#include <begin_vertex>','#include <begin_vertex>\nvWP=(modelMatrix*vec4(transformed,1.0)).xyz;');
  sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 vWP;uniform sampler2D uSp;uniform sampler2D uDt;\nvec3 dtl(vec2 c,vec2 w,vec2 dx,vec2 dy){vec2 f=fract(w)*.96+.02;return textureGrad(uDt,(vec2(c.x,1.0-c.y)+f)*.5,dx*.48,dy*.48).rgb;}')
   .replace('#include <map_fragment>','#include <map_fragment>\n{vec2 w=vWP.xz/7.0,dx=dFdx(w),dy=dFdy(w);vec4 sp=texture2D(uSp,vMapUv);float wd=smoothstep(.3,.7,sp.r),wr=smoothstep(.25,.75,sp.g),wf=smoothstep(.25,.75,sp.b);float wg=max(0.,1.-wd-wr-wf);vec3 det=dtl(vec2(0.,0.),w,dx,dy)*wg;if(wd>.01)det+=dtl(vec2(1.,0.),w,dx,dy)*wd;if(wr>.01)det+=dtl(vec2(0.,1.),w,dx,dy)*wr;if(wf>.01)det+=dtl(vec2(1.,1.),w,dx,dy)*wf;diffuseColor.rgb*=clamp(det*2.0,.3,1.9);}').replace('#include <normal_fragment_maps>','#include <normal_fragment_maps>\n{float hh=-.2*smoothstep(.15,.85,texture2D(uSp,vMapUv).r);vec3 q1=dFdx(-vViewPosition),q2=dFdy(-vViewPosition),r1=cross(q2,normal),r2=cross(normal,q1);float dt_=dot(q1,r1);vec3 gr=sign(dt_)*(dFdx(hh)*r1+dFdy(hh)*r2);normal=normalize(abs(dt_)*normal-gr);}')};
 mat.customProgramCacheKey=()=>'tdet2'}
function rwv(k,ph){return 1+.24*Math.sin(k*.09+ph)+.14*Math.sin(k*.23+ph*2.1)}
function paintRoads(g,R,wet){
 const zf=ZA.find(q=>q.n==='Forêt'),rf=ZRD('Forêt')*1.05;
 ZA.forEach((z,zi)=>{const pts=RD[z.n];if(!pts)return;const sh=pts.sh||0,ph=zi*1.7+.4,ok=k=>{const p=pts[k];return p&&!wet(p[0],p[1])},nm=k=>{const a=pts[Math.max(sh,k-1)],b=pts[Math.min(pts.length-1,k+1)],dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy)||1;return[-dy/l,dx/l]};
  for(let k=sh;k<pts.length;k++){if(!ok(k))continue;const [x,y]=pts[k];g.fillStyle='#6b5838';g.beginPath();g.arc(x,y,(1.85+R()*.45)*rwv(k,ph),0,7);g.fill()}
  for(let k=sh+1;k<pts.length-1;k++){if(!ok(k)||R()<.4)continue;const [nx,ny]=nm(k),wv=rwv(k,ph),s=R()<.5?-1:1,d=(1.8+R()*.9)*wv,x=pts[k][0],y=pts[k][1];
   g.fillStyle=R()<.5?'rgba(107,88,56,.55)':'rgba(124,104,64,.4)';g.beginPath();g.arc(x+nx*d*s,y+ny*d*s,.22+R()*.35,0,7);g.fill();
   if(R()<.55){const e=(1.1+R()*.6)*wv*s,gx=x+nx*e,gy=y+ny*e;g.strokeStyle=R()<.5?'#6f9360':'#8fb078';g.lineWidth=.14;g.beginPath();g.moveTo(gx,gy);g.lineTo(gx+(R()-.5)*.5,gy-.5-R()*.5);g.stroke()}}
  for(let k=sh;k<pts.length;k++){if(!ok(k))continue;const [x,y]=pts[k],wv=rwv(k,ph);g.fillStyle='#b99c6b';g.beginPath();g.arc(x,y,(1.35+R()*.3)*wv,0,7);g.fill();if(k%2===0){g.fillStyle='rgba(224,205,150,.55)';g.beginPath();g.arc(x,y,(.55+R()*.25)*wv,0,7);g.fill()}}
 })}

// ===== v3.6.8 : piste de terre texturée (haute résolution) =====
let RDT=null;
function roadTex(){
 if(RDT)return RDT;
 const Wd=512,Hd=256,mk=()=>{const c=document.createElement('canvas');c.width=Wd;c.height=Hd;return c},cc=mk(),cb=mk(),g=cc.getContext('2d'),h=cb.getContext('2d'),R=rg3(8128),TAU=6.2832;
 const wr=(fn)=>{for(const ox of[-Wd,0,Wd])fn(ox)};
 const edge=(x,s)=>{const t=x/Wd*TAU;return 9+5*Math.sin(t*3+s)+4*Math.sin(t*7+s*2.1)+2.5*Math.sin(t*17+s*.7)};
 // masque
 g.clearRect(0,0,Wd,Hd);h.fillStyle='#808080';h.fillRect(0,0,Wd,Hd);
 g.save();g.beginPath();for(let x=0;x<=Wd;x+=2)g.lineTo(x,edge(x,0));for(let x=Wd;x>=0;x-=2)g.lineTo(x,Hd-edge(x,3.3));g.closePath();g.clip();
 const gr=g.createLinearGradient(0,0,0,Hd);gr.addColorStop(0,'#6e5636');gr.addColorStop(.12,'#8c7148');gr.addColorStop(.3,'#a88a5c');gr.addColorStop(.5,'#c4a674');gr.addColorStop(.7,'#a88a5c');gr.addColorStop(.88,'#8c7148');gr.addColorStop(1,'#6e5636');g.fillStyle=gr;g.fillRect(0,0,Wd,Hd);
 for(let i=0;i<2600;i++){const x=R()*Wd,y=R()*Hd,r=.8+R()*3.2;g.fillStyle=['rgba(120,92,58,.35)','rgba(205,180,132,.35)','rgba(90,68,42,.3)','rgba(170,142,98,.35)'][(R()*4)|0];wr(ox=>{g.beginPath();g.arc(x+ox,y,r,0,7);g.fill()})}
 // herbe sur la crête
 for(let i=0;i<150;i++){const x=R()*Wd,y=Hd/2+(R()-.5)*16;g.strokeStyle=['#6f9360','#8fb078','#5f8350'][(R()*3)|0];g.lineWidth=1;wr(ox=>{g.beginPath();g.moveTo(x+ox,y);g.lineTo(x+ox+(R()-.5)*4,y-3-R()*5);g.stroke()})}
 // fissures
 g.strokeStyle='rgba(60,44,26,.5)';for(let i=0;i<22;i++){let x=R()*Wd,y=30+R()*(Hd-60);g.lineWidth=.8;g.beginPath();g.moveTo(x,y);for(let k=0;k<5;k++){x+=(R()-.3)*10;y+=(R()-.5)*8;g.lineTo(x,y)}g.stroke()}
 // cailloux
 for(let i=0;i<170;i++){const x=R()*Wd,y=14+R()*(Hd-28),s=2+R()*5.4,a=R()*3,l=128+R()*85,col=`rgb(${l+6},${l},${l-8})`;wr(ox=>{g.fillStyle='rgba(40,30,20,.5)';g.beginPath();g.ellipse(x+ox+1,y+1.4,s,s*.72,a,0,7);g.fill();g.fillStyle=col;g.beginPath();g.ellipse(x+ox,y,s,s*.72,a,0,7);g.fill();g.fillStyle='rgba(255,255,240,.28)';g.beginPath();g.ellipse(x+ox-s*.2,y-s*.25,s*.5,s*.28,a,0,7);g.fill();h.fillStyle='rgb(205,205,205)';h.beginPath();h.ellipse(x+ox,y,s,s*.72,a,0,7);h.fill()})}
 // flaques dans les ornières
 for(const [x,yc] of [[Wd*.22,Hd*.31],[Wd*.7,Hd*.69]]){const r=15+R()*8;wr(ox=>{g.fillStyle='rgba(60,46,30,.6)';g.beginPath();g.ellipse(x+ox,yc,r*1.1,r*.45,0,0,7);g.fill();g.fillStyle='rgba(122,146,158,.85)';g.beginPath();g.ellipse(x+ox,yc,r,r*.36,0,0,7);g.fill();g.fillStyle='rgba(210,224,230,.6)';g.beginPath();g.ellipse(x+ox-r*.2,yc-r*.08,r*.5,r*.12,0,0,7);g.fill();h.fillStyle='rgb(70,70,70)';h.beginPath();h.ellipse(x+ox,yc,r,r*.36,0,0,7);h.fill()})}
 g.restore();
 // bords usés : brins d'herbe et terre qui débordent
 for(let i=0;i<260;i++){const x=R()*Wd,top=R()<.5,y=top?edge(x,0):Hd-edge(x,3.3),d=top?-1:1;g.strokeStyle=R()<.6?'#6f9360':'#8c7148';g.lineWidth=1.1;wr(ox=>{g.beginPath();g.moveTo(x+ox,y);g.lineTo(x+ox+(R()-.5)*6,y+d*(2+R()*5));g.stroke()})}
 const T1=new TH.CanvasTexture(cc),T2=new TH.CanvasTexture(cb);for(const t of[T1,T2]){t.wrapS=TH.RepeatWrapping;t.wrapT=TH.ClampToEdgeWrapping;t.anisotropy=8}T1.colorSpace=TH.SRGBColorSpace;
 return RDT={map:T1,bump:T2,mat:new TH.MeshStandardMaterial({map:T1,bumpMap:T2,bumpScale:2.2,alphaTest:.45,roughness:1,metalness:0,side:TH.DoubleSide,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-3})}}
function roadMesh(P,s0,ph){
 const n=P.length,pos=[],uv=[],idx=[],TL=10;let len=0;
 for(let k=0;k<n;k++){const a=P[Math.max(0,k-1)],b=P[Math.min(n-1,k+1)];let tx=b[0]-a[0],tz=b[1]-a[1];const L=Math.hypot(tx,tz)||1;tx/=L;tz/=L;const hw=Math.max(1.1,3.9*rwv(s0+2*k,ph)/2);
  if(k)len+=Math.hypot(P[k][0]-P[k-1][0],P[k][1]-P[k-1][1]);
  for(const s of[-1,1]){const px=P[k][0]-tz*hw*s,pz=P[k][1]+tx*hw*s;pos.push(px,H3(px,pz)+.1,pz);uv.push(len/TL,s>0?1:0)}}
 for(let k=0;k<n-1;k++){const a=k*2;idx.push(a,a+1,a+2,a+1,a+3,a+2)}
 const g=new TH.BufferGeometry();g.setAttribute('position',new TH.Float32BufferAttribute(pos,3));g.setAttribute('uv',new TH.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();
 const m=new TH.Mesh(g,roadTex().mat);m.receiveShadow=true;worldG.add(m)}
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
 paintRoads(g,R,wet);
 g.restore();
 g.save();g.scale(TS/sc,TS/sc);try{drawBridges(g)}catch(e){}g.restore();
 try{paintSplat(w,h,TS)}catch(e){K.err=e}
 // village
 const {u,rx,ry}=vdim();g.save();g.scale(TS,TS);
 const rr=t=>1+.035*Math.sin(3*t+1.3)+.03*Math.sin(5*t+.4),blob=f=>{g.beginPath();for(let i=0;i<=72;i++){const t=i/72*6.2832,r=rr(t)*f,x=T.x+Math.cos(t)*rx*r,y=T.y+Math.sin(t)*ry*r;i?g.lineTo(x,y):g.moveTo(x,y)}g.closePath()};
 blob(1.1);g.fillStyle='rgba(120,110,70,.28)';g.fill();blob(1);g.fillStyle='#b8a47b';g.fill();
 {const e=90*TS,col='62,98,54';for(const [x0,y0,x1,y1,rx,ry,rw,rh] of [[0,0,e,0,0,0,e,h],[w,0,w-e,0,w-e,0,e,h],[0,0,0,e,0,0,w,e],[0,h,0,h-e,0,h-e,w,e]]){const q=g.createLinearGradient(x0,y0,x1,y1);q.addColorStop(0,'rgba('+col+',1)');q.addColorStop(1,'rgba('+col+',0)');g.fillStyle=q;g.fillRect(rx,ry,rw,rh)}}paintLava();
 if(!tex){tex=new TH.CanvasTexture(c);tex.colorSpace=TH.SRGBColorSpace;tex.anisotropy=4}else tex.needsUpdate=true}
// ===== v3.5.0 : sol du village (terre battue et pavés) en relief, par-dessus le terrain =====
let VGM=null,VGT=null;
// v4.1.0 : sol du village definitif : relief, grande image, dessin demande sur le processeur
function buildVillageGround(){
 const vd=vdim(),{rx,ry}=vd,ex=1.22,w=2*rx*ex,h=2*ry*ex,x0=T.x-w/2,y0=T.y-h/2,PU=Math.min(18,2048/Math.max(w,h));
 const c=document.createElement('canvas');c.width=Math.ceil(w*PU);c.height=Math.ceil(h*PU);
 const g=c.getContext('2d',{willReadFrequently:true});g.setTransform(1,0,0,1,-x0*PU,-y0*PU);const R=rg3(2026);
 const rr=t=>1+.035*Math.sin(3*t+1.3)+.03*Math.sin(5*t+.4),blob=f=>{g.beginPath();for(let i=0;i<=96;i++){const t=i/96*6.2832,r=rr(t)*f,x=(T.x+Math.cos(t)*rx*r)*PU,y=(T.y+Math.sin(t)*ry*r)*PU;i?g.lineTo(x,y):g.moveTo(x,y)}g.closePath()};
 g.save();blob(1);g.clip();vgDirt(g,x0,y0,x0+w,y0+h,PU,R);try{paveVillage(g,vd,R,PU)}catch(e){K.err=e}g.restore();
 blob(1);g.strokeStyle='rgba(60,46,28,.5)';g.lineWidth=.2*PU;g.stroke();
 const t=new TH.CanvasTexture(c);t.colorSpace=TH.SRGBColorSpace;t.anisotropy=8;
 const nx=Math.ceil(w),nz=Math.ceil(h),geo=new TH.PlaneGeometry(w,h,nx,nz);geo.rotateX(-PI/2);
 const p=geo.attributes.position;for(let i=0;i<p.count;i++){const x=p.getX(i)+T.x,z=p.getZ(i)+T.y;p.setXYZ(i,x,H3(x,z)+.005,z)}geo.computeVertexNormals();
 if(!VGM){VGM=new TH.Mesh(geo,new TH.MeshStandardMaterial({map:t,bumpMap:t,bumpScale:2,alphaTest:.5,roughness:1,metalness:0,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-4}));VGM.receiveShadow=true;scn.add(VGM)}
 else{VGM.geometry.dispose();VGM.geometry=geo;VGM.material.map=t;VGM.material.bumpMap=t;VGM.material.needsUpdate=true}
 if(VGT)VGT.dispose();VGT=t}
// ---------- terrain ----------
function buildTerrain(){
 const SX=3,nx=Math.round(WXd/SX),nz=Math.round(WYd/SX),pos=new Float32Array((nx+1)*(nz+1)*3),uv=new Float32Array((nx+1)*(nz+1)*2),idx=[];
 for(let j=0;j<=nz;j++)for(let i=0;i<=nx;i++){const x=i/nx*WXd,y=j/nz*WYd,k=j*(nx+1)+i;pos[k*3]=x;pos[k*3+1]=H3(x,y);pos[k*3+2]=y;uv[k*2]=i/nx;uv[k*2+1]=1-j/nz}
 for(let j=0;j<nz;j++)for(let i=0;i<nx;i++){const a=j*(nx+1)+i,b=a+1,c=a+nx+1,d=c+1;idx.push(a,c,b,b,c,d)}
 const g=new TH.BufferGeometry();g.setAttribute('position',new TH.BufferAttribute(pos,3));g.setAttribute('uv',new TH.BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();
 if(terr){terr.geometry.dispose();terr.geometry=g}else{terr=new TH.Mesh(g,new TH.MeshStandardMaterial({map:tex,roughness:1,metalness:0}));terr.receiveShadow=true;scn.add(terr);try{terrDetail(terr.material)}catch(e){K.err=e}}
 terr.material.map=tex;terr.material.emissiveMap=etex;terr.material.emissive.set('#ffffff');terr.material.emissiveIntensity=2.2;terr.material.needsUpdate=true;if(!OUTP){OUTP=new TH.Mesh(new TH.PlaneGeometry(9000,9000).rotateX(-PI/2),new TH.MeshStandardMaterial({color:'#3e6236',roughness:1,metalness:0}));OUTP.position.set(WXd/2,-1.8,WYd/2);scn.add(OUTP)}}
// ---------- décor ----------
function disp(o){o.traverse(c=>{if(c.geometry)c.geometry.dispose();if(c.material&&c.material.userData&&c.material.userData.px&&c.material.map){c.material.map.dispose();(c.material.userData.alt||[]).forEach(t=>t.dispose());(c.material.userData.geos||[]).forEach(t=>t.dispose())}})}
function clearG(g){while(g.children.length){const c=g.children.pop();disp(c)}}
const DM=new TH.MeshStandardMaterial({vertexColors:true,roughness:.85,metalness:0,flatShading:true,side:TH.DoubleSide});
function acc2(){return new Acc()}
function meshOf(a,par){const g=TH.mergeGeometries(a.g,false),m=new TH.Mesh(g,DM);m.castShadow=true;m.receiveShadow=true;par.add(m);return m}
function inst(par,geo,mat,list,shadow){if(!list.length)return;const m=new TH.InstancedMesh(geo,mat,list.length),o=new TH.Object3D(),c=new TH.Color();
 list.forEach((q,i)=>{o.position.set(q.x,q.y,q.z);o.rotation.set(0,q.r||0,0);o.scale.set(q.sx||q.s||1,q.sy||q.s||1,q.sz||q.s||1);o.updateMatrix();m.setMatrixAt(i,o.matrix);c.set(q.c||'#ffffff');m.setColorAt(i,c);q._m=m;q._i=i});
 m.instanceMatrix.needsUpdate=true;if(m.instanceColor)m.instanceColor.needsUpdate=true;m.castShadow=!!shadow;if(shadow)SHM.push(m);m.receiveShadow=true;par.add(m)}
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
 yaw(a,px,pz){this.yw=a?new TH.Matrix4().makeTranslation(px,0,pz).multiply(new TH.Matrix4().makeRotationY(a)).multiply(new TH.Matrix4().makeTranslation(-px,0,-pz)):null;return this}
 add(k,geo,color,x,y,z,o){o=o||{};const f=this.fr,s=f.s,g=geo.index?geo.toNonIndexed():geo,ou=g.attributes.uv;
  mt.compose(new V3(f.x+(x||0)*s,f.y+(y||0)*s,f.z+(z||0)*s),qq.setFromEuler(new E(o.rx||0,o.ry||0,o.rz||0)),new V3((o.sx==null?1:o.sx)*s,(o.sy==null?1:o.sy)*s,(o.sz==null?1:o.sz)*s));
  g.applyMatrix4(mt);
  const p=g.attributes.position,nr=g.attributes.normal,n=p.count,ts=TSZ[k]||1,uv=new Float32Array(n*2),cl=new Float32Array(n*3),c=new Col(color).multiplyScalar(TSZ[k]?1.14:1),sh=o.shade==null?.1:o.shade,y0=f.y+(y||0)*s;
  for(let i=0;i<n;i++){const px=p.getX(i),py=p.getY(i),pz=p.getZ(i);let u,v;
   if(o.cyl&&ou){u=ou.getX(i)*o.cyl[0]*6.2832*s/ts;v=ou.getY(i)*o.cyl[1]*s/ts}
   else{const ax=Math.abs(nr.getX(i)),ay=Math.abs(nr.getY(i)),az=Math.abs(nr.getZ(i));if(ay>=ax&&ay>=az){u=px;v=pz}else if(ax>=az){u=pz;v=py}else{u=px;v=py}u/=ts;v/=ts}
   uv[i*2]=u;uv[i*2+1]=v;const q=1+sh*Math.max(-1,Math.min(1,(py-y0)/(s*1.4)));cl[i*3]=c.r*q;cl[i*3+1]=c.g*q;cl[i*3+2]=c.b*q}
  if(this.yw)g.applyMatrix4(this.yw);
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
const PKT=[];
function pkAdd(g){const a=Float32Array.from(g.attributes.position.array);let x0=1e9,x1=-1e9,z0=1e9,z1=-1e9;for(let i=0;i<a.length;i+=3){x0=Math.min(x0,a[i]);x1=Math.max(x1,a[i]);z0=Math.min(z0,a[i+2]);z1=Math.max(z1,a[i+2])}PKT.push({a,x0,x1,z0,z1})}
// hauteur du sol ou, s'il est plus haut, du pic sous le point
function HW(x,z){let h=H3(x,z);for(const p of PKT){if(x<p.x0||x>p.x1||z<p.z0||z>p.z1)continue;const a=p.a;for(let i=0;i<a.length;i+=9){const ax=a[i],az=a[i+2],bx=a[i+3],bz=a[i+5],cx_=a[i+6],cz=a[i+8],d=(bz-cz)*(ax-cx_)+(cx_-bx)*(az-cz);if(Math.abs(d)<1e-6)continue;const u=((bz-cz)*(x-cx_)+(cx_-bx)*(z-cz))/d,v=((cz-az)*(x-cx_)+(ax-cx_)*(z-cz))/d;if(u<-1e-4||v<-1e-4||u+v>1.0001)continue;const y=u*a[i+1]+v*a[i+4]+(1-u-v)*a[i+7];if(y>h)h=y}}return h}
// hauteur des personnages à la montagne et au volcan : relevée un peu en pente pour que l'image penchée ne s'y enfonce pas
function HC(x,z){if(!ZA.some(q=>(q.n==='Montagne'||q.n==='Volcan')&&Math.hypot(x-q.x,z-q.y)<ZRD(q.n)*1.3))return H3(x,z);
 let bx=x-cam3.position.x,bz=z-cam3.position.z;const l=Math.hypot(bx,bz)||1;bx/=l;bz/=l;
 return Math.max(HW(x,z),HW(x-bz*1.1,z+bx*1.1)-.4,HW(x+bz*1.1,z-bx*1.1)-.4,HW(x+bx*1.2,z+bz*1.2)-1,HW(x+bx*2.4,z+bz*2.4)-2.2)}
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
const HU=Array.from({length:8},()=>new TH.Vector4(0,0,0,0)),HE=Array.from({length:8},()=>new TH.Vector4(1,0,1,0)),HAS={value:1},HV=new TH.Vector3(),HMO=new TH.Vector3();
const HRS={value:new TH.Vector2(1,1)};
MV.onBeforeCompile=sh=>{sh.uniforms.uH={value:HU};sh.uniforms.uE={value:HE};sh.uniforms.uAs=HAS;sh.uniforms.uRs=HRS;
 sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vNd;').replace('#include <project_vertex>','#include <project_vertex>\nvec4 cp_=projectionMatrix*mvPosition;vNd=vec3(cp_.xy/cp_.w,-mvPosition.z);');
 sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 vNd;uniform vec4 uH[8];uniform vec4 uE[8];uniform float uAs;uniform vec2 uRs;').replace('void main() {','void main() {\n for(int i=0;i<8;i++){vec4 h=uH[i];if(h.w>0.&&vNd.z<h.z-.6){vec2 v_=(gl_FragCoord.xy*uRs*2.-1.-h.xy)*vec2(uAs,1.);vec4 e_=uE[i];float d=length(vec2(dot(v_,e_.xy)/e_.z,v_.y*e_.x-v_.x*e_.y));if(d<h.w){float a=smoothstep(.75,1.,d/h.w),b=fract(52.9829189*fract(dot(gl_FragCoord.xy,vec2(.06711056,.00583715))));if(a<b)discard;}}}\n')};
const HTR=.3,HST=new Map();
// v4.1.6 : en forêt, les arbres autour d'un combat (et de la fouille) s'effacent en HTR secondes. CLR = rayon dégagé autour de l'aventurier et du monstre.
const CLR=5,CLM=new TH.Matrix4(),CLV=new TH.Vector3();let CLT=null,CLF=[];
function clrUpd(BM,dt){const zf=ZA.find(z=>z.n==='Forêt');if(!zf)return;
 if(CLT!==TPOS){CLT=TPOS;const r=ZRD(zf.n)+6;CLF=TPOS.filter(q=>Math.hypot(q.x-zf.x,q.z-zf.y)<r)}
 const C=[];for(const h of S.hero){if((h.st!=='fight'&&h.st!=='loot')||!h.z||h.z.n!=='Forêt')continue;C.push(hpos(h,BM));const mo=MN.get(h.id);if(mo)C.push([mo.g.position.x,mo.g.position.z])}
 const dirty=new Set(),stp=dt/HTR;
 for(const q of CLF){if(!q._m)continue;let t=0;for(const [x,z] of C){const r=CLR+1.3*q.s,dx=q.x-x,dz=q.z-z;if(dx*dx+dz*dz<r*r){t=1;break}}
  const v=q.cl||0;if(v===t)continue;q.cl=t>v?Math.min(1,v+stp):Math.max(0,v-stp);const k=Math.max(.0001,1-q.cl);
  for(const [m,i,key] of[[q._m,q._i,'_b'],[q._sm,q._si,'_sb']]){if(!m)continue;if(!q[key]){q[key]=new TH.Matrix4();m.getMatrixAt(i,q[key])}CLM.copy(q[key]).scale(CLV.set(k,k,k));m.setMatrixAt(i,CLM);dirty.add(m)}}
 for(const m of dirty)m.instanceMatrix.needsUpdate=true}
function holeUpd(BM,dt){cam3.updateMatrixWorld();{const v=K.v2||(K.v2=new TH.Vector2());ren.getDrawingBufferSize(v);HRS.value.set(1/Math.max(1,v.x),1/Math.max(1,v.y))}const th=Math.tan(cam3.fov*PI/360);HAS.value=cam3.aspect;let n=0;
 const stp=dt/HTR,to=(v,t)=>v<t?Math.min(t,v+stp):Math.max(t,v-stp),live=new Set();
 for(const h of S.hero){const hf=h.st==='fight'||h.st==='loot',on=hf||h.st==='wait';let o=HST.get(h.id);if(!o){if(!on)continue;o={k:0,w:hf?1:0,m:0,p:[0,0],mp:new TH.Vector3()};HST.set(h.id,o)}
  live.add(h.id);o.on=on;const [x,z]=hpos(h,BM);o.p[0]=x;o.p[1]=z;if(on)o.w=to(o.w,hf?1:0);const mo=hf&&MN.get(h.id);if(mo){o.mp.set(mo.g.position.x,mo.g.position.y+HS*.5,mo.g.position.z);o.hm=1}o.m=to(o.m,mo?1:0)}
 for(const [id,o] of HST){if(!live.has(id)){o.on=false;o.m=to(o.m,0)}o.k=to(o.k,o.on?1:0);if(!o.on&&o.k<=0)HST.delete(id)}
 for(const on of[true,false])for(const o of HST.values()){if(n>=8)break;if(o.on!==on||o.k<=0)continue;const [x,z]=o.p;HV.set(x,HC(x,z)+HS*.7,z);const dep=-(HV.clone().applyMatrix4(cam3.matrixWorldInverse).z);if(dep<1)continue;HV.project(cam3);if(Math.abs(HV.x)>1.4||Math.abs(HV.y)>1.4)continue;
  const r=Math.max(.05,(7.8+2.2*o.w)/(dep*th));let cx=HV.x,cy=HV.y,dz=dep,ex=1,ey=0,rt=1;
  if(o.hm&&o.m>0){HMO.copy(o.mp);const md=-(HMO.clone().applyMatrix4(cam3.matrixWorldInverse).z);if(md>=1){HMO.project(cam3);const ax=(HMO.x-HV.x)*cam3.aspect,ay=HMO.y-HV.y,L=Math.hypot(ax,ay);if(L>1e-4){ex=ax/L;ey=ay/L;rt=(L*o.m/2+r)/r;cx=HV.x+(HMO.x-HV.x)*o.m/2;cy=HV.y+(HMO.y-HV.y)*o.m/2;dz=dep+(md-dep)*o.m/2}}}
  const q=o.k*o.k*(3-2*o.k);HE[n].set(ex,ey,rt,0);HU[n++].set(cx,cy,dz,r*q)}
 for(;n<8;n++)HU[n].w=0}
// ===== v3.6.1 : arbres 3D texturés en pixel-art =====
const TXN=['oa0','oa1','ob0','ob1','oc0','bi0','wi0','wiS','bu0','bu1','pn','ps','pmF','bkOak','bkBeech','bkBirch','bkPine','bkDead','bkPalm','bkWill','lf'],TXW=512,TXH=384,TXS=64;
let TXT=null,TRM=null;const TXU={t:{value:0},w:{value:.4}};
const PLF={oa0:[[16,38,24],[34,78,40],[58,116,52],[104,160,64],[164,200,88]],ob0:[[14,40,34],[30,74,58],[56,114,76],[104,162,92],[170,204,118]],oc0:[[60,24,12],[128,52,24],[196,98,34],[232,152,52],[250,204,96]],bi0:[[30,62,30],[74,124,56],[118,172,72],[176,212,104],[222,238,150]],wi0:[[28,60,38],[70,116,70],[116,164,92],[166,200,120],[206,226,150]],bu0:[[18,44,26],[40,90,42],[66,128,54],[112,168,72],[170,204,96]],bu1:[[24,52,30],[56,104,52],[90,146,60],[140,184,80],[196,218,110]],pn:[[10,32,24],[20,56,40],[36,92,58],[66,132,76],[112,172,100]]};
const PBK={bkOak:[[34,22,14],[70,48,30],[98,70,42],[128,94,58]],bkBeech:[[60,56,52],[104,98,90],[136,130,120],[166,160,148]],bkBirch:[[30,30,30],[210,210,198],[236,236,226],[250,250,244]],bkPine:[[50,28,20],[96,56,36],[126,76,46],[156,98,58]],bkDead:[[44,40,36],[86,80,72],[116,108,96],[146,136,120]],bkPalm:[[70,52,32],[120,92,58],[156,122,76],[186,150,96]],bkWill:[[38,32,24],[78,66,50],[104,88,66],[132,114,86]]};
function txWr(A,ox,oy,x,y,c,a){const i=((oy+y)*TXW+ox+x)*4;A[i]=c[0];A[i+1]=c[1];A[i+2]=c[2];A[i+3]=a==null?255:a}
function txFill(A,ox,oy,c){for(let y=0;y<TXS;y++)for(let x=0;x<TXS;x++){const i=((oy+y)*TXW+ox+x)*4;if(!A[i+3]){A[i]=c[0];A[i+1]=c[1];A[i+2]=c[2]}}}
function txLeaf(A,ox,oy,pal,seed,n){const S=TXS,R=rg3(seed),m=new Int8Array(S*S).fill(-1),lb=[],lv=new Uint8Array(S*S);
 for(let i=0;i<n;i++){const a=i/n*6.283+R(),d=i?(7+R()*9):0;lb.push([32+Math.cos(a)*d,33+Math.sin(a)*d*.8,(i?10:15)+R()*4,R()*6])}
 for(let y=0;y<S;y++)for(let x=0;x<S;x++){let best=9,bi=-1;for(let i=0;i<n;i++){const b=lb[i],dx=x-b[0],dy=y-b[1],an=Math.atan2(dy,dx),r=b[2]*(1+.13*Math.sin(an*5+b[3])+.07*Math.sin(an*9+b[3]*2)),dd=Math.hypot(dx,dy)/r;if(dd<best){best=dd;bi=i}}
  if(best<1){m[y*S+x]=bi;const b=lb[bi],nx=(x-b[0])/b[2],ny=(y-b[1])/b[2],l=.55-(nx*.45+ny*.6)*.5+(R()-.5)*.2;lv[y*S+x]=l<.3?0:l<.52?1:l<.74?2:3}}
 for(let k=0;k<110;k++){const x=(R()*S)|0,y=(R()*S)|0;if(m[y*S+x]<0)continue;const up=y<36+R()*8-(x<32?4:0),v=Math.max(0,Math.min(3,lv[y*S+x]+(up?1:-1)));for(let j=0;j<5;j++){const px=x+(j%3),py=y+((j/3)|0);if(px<S&&py<S&&m[py*S+px]>=0)lv[py*S+px]=v}}
 for(let k=0;k<5;k++){const x=12+((R()*38)|0),y=12+((R()*38)|0);let ok=true;for(let j=-3;j<=4&&ok;j++)for(let i=-3;i<=4;i++)if(m[(y+j)*S+x+i]<0){ok=false;break}if(ok)for(let j=0;j<2;j++)for(let i=0;i<3;i++)m[(y+j)*S+x+i]=-1}
 for(let y=0;y<S;y++)for(let x=0;x<S;x++){if(m[y*S+x]<0)continue;const e=x<1||y<1||x>S-2||y>S-2||m[y*S+x-1]<0||m[y*S+x+1]<0||m[(y-1)*S+x]<0||m[(y+1)*S+x]<0;txWr(A,ox,oy,x,y,e?pal[0]:pal[1+lv[y*S+x]])}
 txFill(A,ox,oy,pal[2])}
function txStrand(A,ox,oy,pal,seed){const R=rg3(seed),S=TXS;for(let s=0;s<7;s++){const x=4+s*9+((R()*3)|0),len=34+((R()*26)|0);for(let y=0;y<len;y++){const xx=x+Math.round(Math.sin(y*.16+s)*1.5),c=(y%6<2)?pal[3]:y/len>.6?pal[1]:pal[2];txWr(A,ox,oy,xx,y,pal[0]);txWr(A,ox,oy,xx+1,y,c);txWr(A,ox,oy,xx+2,y,pal[y%4<2?1:2])}}txFill(A,ox,oy,pal[2])}
function txPine(A,ox,oy,pal,snow,seed){const S=TXS,R=rg3(seed);for(let x=0;x<S;x++){const tip=1-Math.abs(((x%16)-8)/8),by=38+Math.round(22*tip),sy=22+Math.round(20*tip)+((R()*3)|0);
  for(let y=0;y<=by;y++){let l=.82-.55*(y/by)+(((x+(y>>1))%6<2)?-.22:0)+(R()-.5)*.18-((x%16<2||x%16>14)?.2:0);const q=l<.3?0:l<.5?1:l<.72?2:3;let c=pal[1+q];if(y>=by-1)c=pal[0];
   if(snow&&y<sy&&y<by-1){const s2=(R()-.5)*.2+.5-y/sy*.35;c=s2<.2?[176,194,222]:s2<.4?[214,226,242]:[250,252,255]}
   txWr(A,ox,oy,x,y,c)}}txFill(A,ox,oy,pal[2])}
function txFrond(A,ox,oy,seed){const R=rg3(seed),g=[[30,60,26],[52,110,40],[92,160,56],[148,204,84]],S=TXS;
 for(let x=2;x<62;x++)txWr(A,ox,oy,x,32,[96,70,36]);
 for(let t=0;t<30;t++){const x=3+t*2,len=Math.round(24*Math.sin(Math.PI*(.12+.88*t/30))*(1-t/60));for(const sd of[-1,1])for(let k=1;k<=len;k++){const yy=32+sd*k,xx=x+((k*.35)|0);if(xx<S&&yy>=0&&yy<S){const c=k>len-2?g[0]:k%5<2?g[3]:g[1+(t+k)%3];txWr(A,ox,oy,xx,yy,c);if(xx+1<S)txWr(A,ox,oy,xx+1,yy,k>len-2?g[0]:g[1+(t+k+1)%3])}}}
 txFill(A,ox,oy,g[2])}
function txBark(A,ox,oy,pal,kind,seed){const R=rg3(seed),S=TXS;let x=0;const cs=[];while(x<S){const w=2+((R()*3)|0);cs.push([x,w,1+((R()*3)|0)]);x+=w}
 for(let y=0;y<S;y++)for(let x=0;x<S;x++){let c;
  if(kind==='palm'){const r=y%8;c=r===0?pal[0]:r<3?pal[1]:(x*3+y)%7<1?pal[3]:pal[2]}
  else if(kind==='birch'){c=(x<3||x>60)?pal[1]:pal[2];if(R()<.04)c=pal[3]}
  else if(kind==='smooth'){c=R()<.12?pal[3]:R()<.3?pal[1]:pal[2]}
  else{const k=cs.find(q=>x>=q[0]&&x<q[0]+q[1])||cs[0];c=x===k[0]?pal[0]:pal[k[2]];if(((y+k[0]*7)%19)<2)c=pal[0];else if(R()<.12)c=pal[Math.max(1,k[2]-1)]}
  txWr(A,ox,oy,x,y,c)}
 if(kind==='birch')for(let k=0;k<30;k++){const x=((R()*50)|0)+3,y=(R()*S)|0,w=5+((R()*8)|0);for(let i=0;i<w;i++){txWr(A,ox,oy,x+i,y,pal[0]);if(i%3)txWr(A,ox,oy,x+i,y+1,pal[0])}}}
function txTex(){if(TXT)return TXT;const A=new Uint8Array(TXW*TXH*4);
 TXN.forEach((n,i)=>{const ox=(i%8)*TXS,oy=((i/8)|0)*TXS;
  if(n==='oa0'||n==='oa1')txLeaf(A,ox,oy,PLF.oa0,n==='oa0'?11:23,6);else if(n==='ob0'||n==='ob1')txLeaf(A,ox,oy,PLF.ob0,n==='ob0'?31:47,6);else if(n==='oc0')txLeaf(A,ox,oy,PLF.oc0,59,6);else if(n==='bi0')txLeaf(A,ox,oy,PLF.bi0,71,5);else if(n==='wi0')txLeaf(A,ox,oy,PLF.wi0,83,6);else if(n==='wiS')txStrand(A,ox,oy,PLF.wi0,91);else if(n==='bu0')txLeaf(A,ox,oy,PLF.bu0,101,4);else if(n==='bu1')txLeaf(A,ox,oy,PLF.bu1,113,4);
  else if(n==='pn')txPine(A,ox,oy,PLF.pn,false,127);else if(n==='ps')txPine(A,ox,oy,PLF.pn,true,131);else if(n==='pmF')txFrond(A,ox,oy,139);
  else if(n==='lf'){}else txBark(A,ox,oy,PBK[n],n==='bkPalm'?'palm':n==='bkBirch'?'birch':n==='bkBeech'?'smooth':'v',151+i)});
 const t=new TH.DataTexture(A,TXW,TXH,TH.RGBAFormat);t.magFilter=TH.NearestFilter;t.minFilter=TH.LinearMipmapLinearFilter;t.generateMipmaps=true;t.colorSpace=TH.SRGBColorSpace;t.needsUpdate=true;return TXT=t}
function txMat(){if(TRM)return TRM;const m=new TH.MeshStandardMaterial({map:txTex(),alphaTest:.5,roughness:1,metalness:0,side:TH.DoubleSide});
 m.onBeforeCompile=sh=>{MV.onBeforeCompile(sh);sh.uniforms.uWt=TXU.t;sh.uniforms.uWw=TXU.w;
  sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nuniform float uWt;uniform float uWw;').replace('#include <begin_vertex>','#include <begin_vertex>\n{float ph_=instanceMatrix[3].x*.31+instanceMatrix[3].z*.23,h_=max(position.y-1.4,0.);float s_=sin(uWt*1.6+ph_)*.6+sin(uWt*3.3+ph_*1.7)*.25;transformed.x+=s_*uWw*h_*h_*.012;transformed.z+=cos(uWt*1.2+ph_*1.3)*uWw*h_*h_*.008;}');
  sh.fragmentShader=sh.fragmentShader.replace('#include <normal_fragment_begin>',TH.ShaderChunk.normal_fragment_begin.replace('gl_FrontFacing ? 1.0 : - 1.0','1.0'))};
 return TRM=m}
const txUV=n=>{const i=TXN.indexOf(n),c=i%8,r=(i/8)|0,e=.25;return[(c*TXS+e)/TXW,((c+1)*TXS-e)/TXW,(r*TXS+e)/TXH,((r+1)*TXS-e)/TXH]};
function txMap(g,tile){const u=txUV(tile),uv=g.attributes.uv;for(let i=0;i<uv.count;i++){const x=uv.getX(i),y=uv.getY(i);uv.setXY(i,u[0]+(u[1]-u[0])*x,u[3]+(u[2]-u[3])*y)}return g}
function txCard(w,h,tile,pos,rot,ctr,ord){const g=txMap(new TH.PlaneGeometry(w,h),tile),m=new TH.Matrix4().compose(new TH.Vector3(pos[0],pos[1],pos[2]),new TH.Quaternion().setFromEuler(new TH.Euler(rot[0],rot[1],rot[2],ord||'XYZ')),new TH.Vector3(1,1,1));g.applyMatrix4(m);
 const p=g.attributes.position,n=g.attributes.normal;for(let i=0;i<p.count;i++){const dx=p.getX(i)-ctr[0],dy=p.getY(i)-ctr[1],dz=p.getZ(i)-ctr[2],l=Math.hypot(dx,dy*.8,dz)||1,nx=dx/l,ny=dy/l+.5,nz=dz/l,q=Math.hypot(nx,ny,nz);n.setXYZ(i,nx/q,ny/q,nz/q)}return g.toNonIndexed()}
function txTrunk(r0,r1,h,seg,tile,x,y,z,lean){const g=txMap(new TH.CylinderGeometry(r1,r0,h,seg,3,true),tile),p=g.attributes.position;for(let i=0;i<p.count;i++){const t=(p.getY(i)+h/2)/h;p.setX(i,p.getX(i)+lean*t*t)}g.translate(x,y+h/2,z);return g.toNonIndexed()}
function txLimb(a,b,r0,r1,tile){const d=new TH.Vector3(b[0]-a[0],b[1]-a[1],b[2]-a[2]),L=d.length(),g=txMap(new TH.CylinderGeometry(r1,r0,L,5,1,true),tile);g.applyQuaternion(new TH.Quaternion().setFromUnitVectors(new TH.Vector3(0,1,0),d.normalize()));g.translate((a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2);return g.toNonIndexed()}
function txCluster(P,tiles,c,sz,ctr,R){const a=R()*3.1416,t=tiles[(R()*tiles.length)|0];
 P.push(txCard(sz,sz,t,c,[0,a,0],ctr),txCard(sz,sz,tiles[(R()*tiles.length)|0],c,[0,a+1.571,0],ctr),txCard(sz,sz,t,[c[0],c[1]-sz*.08,c[2]],[-1.571,a*.6,0],ctr),txCard(sz*.9,sz*.9,tiles[(R()*tiles.length)|0],[c[0],c[1]+sz*.14,c[2]],[-1.571,a+.8,0],ctr))}
function txBroad(v,o){const R=rg3(o.sd+v*17),P=[],tl=o.tiles,ct=[0,o.cy,0],sw=o.lean*(v?-1:1);
 P.push(txTrunk(o.r0,o.r1,o.th,7,o.bark,0,0,0,sw));
 const cl=o.cl.map(q=>[q[0]+(R()-.5)*.5,q[1]+(R()-.5)*.4,q[2]+(R()-.5)*.5,q[3]*(.92+R()*.16)]);
 cl.forEach((q,i)=>{if(i<4)P.push(txLimb([sw,o.th*.85,0],[q[0]*.7,q[1]-.4,q[2]*.7],.15,.07,o.bark));txCluster(P,tl,[q[0],q[1],q[2]],q[3],ct,R)});
 return TH.mergeGeometries(P,false)}
function txWillow(){const R=rg3(333),P=[],tl=['wi0'],ct=[0,4,0];P.push(txTrunk(.5,.28,2.8,7,'bkWill',0,0,0,.2));
 [[0,4.2,0,3.8],[-1.4,3.7,.6,2.8],[1.4,3.8,-.5,2.8],[.2,5,.2,2.4]].forEach((q,i)=>{if(i)P.push(txLimb([.2,2.4,0],[q[0]*.7,q[1]-.4,q[2]*.7],.14,.07,'bkWill'));txCluster(P,tl,[q[0],q[1],q[2]],q[3],ct,R)});
 for(let i=0;i<9;i++){const a=i/9*6.283+R()*.5,r=1.6+R()*.9;P.push(txCard(1.7,3.3,'wiS',[Math.cos(a)*r,2.75+R()*.3,Math.sin(a)*r],[0,-a+1.571+(R()-.5)*.5,0],ct))}
 return TH.mergeGeometries(P,false)}
function txPineG(snow,v){const R=rg3(500+v*13),P=[],t=snow?'ps':'pn';P.push(txTrunk(.4,.2,2.4,6,'bkPine',0,0,0,.05*(v?-1:1)));
 for(let i=0;i<5;i++){const r=1.8-i*.33+(R()-.5)*.12,h=2.1,g=txMap(new TH.ConeGeometry(r,h,9,1,true),t);g.rotateY(R()*6);g.translate(0,1.3+i*1.05+h/2,0);P.push(g.toNonIndexed())}
 return TH.mergeGeometries(P,false)}
function txDead(v){const R=rg3(700+v*29),P=[];P.push(txTrunk(.34,.14,3.4,6,'bkDead',0,0,0,.5*(v?-1:1)));
 const lim=(a,b,r)=>P.push(txLimb(a,b,r,r*.45,'bkDead'));let br=[[.3,2.3,0],[.5,3.2,0]];
 for(let i=0;i<5;i++){const a=R()*6.283,s=br[i%2],e=[s[0]+Math.cos(a)*(1+R()*.9),s[1]+.9+R()*1.1,s[2]+Math.sin(a)*(1+R()*.9)];lim(s,e,.1);if(R()<.7){const a2=a+(R()-.5)*1.6;lim(e,[e[0]+Math.cos(a2)*.8,e[1]+.6+R()*.5,e[2]+Math.sin(a2)*.8],.06)}}
 lim([.6,3.3,0],[.9,4.6,.2],.1);return TH.mergeGeometries(P,false)}
function txPalm(){const R=rg3(900),P=[],ct=[0,5,0];let x=0,y=0;for(let i=0;i<6;i++){const nx=x+.1+i*.02,ny=y+.95;P.push(txLimb([x,y,0],[nx,ny,0],.3-i*.02,.28-i*.02,'bkPalm'));x=nx;y=ny}
 for(let i=0;i<8;i++){const a=i/8*6.283+R()*.3;P.push(txCard(3.6,3.6,'pmF',[x+Math.cos(a)*1.5,y+.1,Math.sin(a)*1.5],[-1.38,-a,-.32],ct,'YZX'))}
 return TH.mergeGeometries(P,false)}
function txBush(v){const R=rg3(1200+v*7),P=[],t=['bu'+v],ct=[0,.7,0];[[0,.7,0,1.9],[.7,.55,.3,1.4],[-.6,.5,-.3,1.3]].forEach(q=>txCluster(P,t,[q[0]+(R()-.5)*.2,q[1],q[2]],q[3],ct,R));return TH.mergeGeometries(P,false)}
const TXO={oa:{sd:11,tiles:['oa0','oa1'],bark:'bkOak',r0:.46,r1:.24,th:2.9,lean:.25,cy:4,cl:[[0,4.1,0,3.7],[-1.25,3.5,.5,2.7],[1.2,3.6,-.5,2.7],[.2,5.1,.1,2.5],[-.4,4.2,-1.3,2.5],[.6,4,1.3,2.5]]},
 ob:{sd:29,tiles:['ob0','ob1'],bark:'bkBeech',r0:.4,r1:.2,th:3.2,lean:.15,cy:4.3,cl:[[0,4.5,0,3.5],[-1,3.8,.4,2.6],[1,4,-.4,2.6],[.1,5.5,0,2.4],[-.3,4.6,-1.1,2.4],[.5,4.4,1.1,2.4]]},
 bi:{sd:47,tiles:['bi0'],bark:'bkBirch',r0:.28,r1:.14,th:3.4,lean:.3,cy:4.4,cl:[[0,4.6,0,2.7],[-.7,3.9,.3,2.1],[.7,4,-.3,2.1],[.1,5.7,0,2],[0,4.8,-.9,2]]},
 oc:{sd:59,tiles:['oc0'],bark:'bkOak',r0:.46,r1:.24,th:2.9,lean:.25,cy:4,cl:[[0,4.1,0,3.7],[-1.25,3.5,.5,2.7],[1.2,3.6,-.5,2.7],[.2,5.1,.1,2.5],[-.4,4.2,-1.3,2.5],[.6,4,1.3,2.5]]}};
// ===== v3.6.2 : rochers 3D texturés en pixel-art =====
const RKN=['rgT','rgS','rmT','rmS','rvT','rvS','gt','gt2'],RKW=256,RKH=128;
let RKT=null,RKE=null,RKM=null;
function rkWr(A,ox,oy,x,y,c,a){const i=((oy+y)*RKW+ox+x)*4;A[i]=c[0];A[i+1]=c[1];A[i+2]=c[2];A[i+3]=a==null?255:a}
function rkNoise(S,seed,sc){const R=rg3(seed),G=[],n=Math.ceil(S/sc)+2;for(let i=0;i<n*n;i++)G.push(R());return(x,y)=>{const fx=x/sc,fy=y/sc,ix=Math.floor(fx),iy=Math.floor(fy),tx=fx-ix,ty=fy-iy,a=G[iy*n+ix],b=G[iy*n+ix+1],c=G[(iy+1)*n+ix],d=G[(iy+1)*n+ix+1];return a+(b-a)*tx+(c-a)*ty+(a-b-c+d)*tx*ty}}
function rkTile(A,E,ox,oy,kind,seed){const S=64,R=rg3(seed),n1=rkNoise(S,seed+1,6),n2=rkNoise(S,seed+2,3),n3=rkNoise(S,seed+3,9);
 const gr=[[86,86,84],[114,114,110],[142,142,136],[172,172,164]],mo=[[48,80,42],[76,114,54],[112,150,70]],mn=[[72,66,62],[98,90,82],[128,116,100],[156,142,122]],vo=[[24,20,22],[40,34,36],[58,50,52],[84,74,74]];
 const cracks=[];if(kind==='rgS'||kind==='rgT'||kind==='rvS'||kind==='rvT'){const nc=kind[1]==='v'?7:4;for(let c=0;c<nc;c++){let x=R()*S,y=R()*S,a=R()*6.283;for(let k=0;k<22;k++){cracks.push([x|0,y|0]);a+=(R()-.5)*1.1;x+=Math.cos(a)*1.6;y+=Math.sin(a)*1.6;if(x<0||y<0||x>=S||y>=S)break}}}
 const ck=new Set(cracks.map(q=>q[1]*S+q[0]));
 for(let y=0;y<S;y++)for(let x=0;x<S;x++){let c,em=null;const v=n1(x,y)*.55+n2(x,y)*.3+n3(x,y)*.15+(R()-.5)*.12,q=Math.max(0,Math.min(3,Math.floor(v*4.2-.3)));
  if(kind==='rgS'||kind==='rgT'){c=gr[q];if(ck.has(y*S+x))c=[56,56,58];if(kind==='rgT'){const m=n3(x+20,y+9)*.6+n2(x,y+5)*.4;if(m>.56)c=mo[Math.min(2,Math.floor((m-.56)*8))]}else if(y>46&&n2(x+7,y)>.55)c=mo[(x+y)%3]}
  else if(kind==='rmS'||kind==='rmT'){if(kind==='rmS'){const b=Math.floor((y+Math.sin(x*.18)*2+n3(x,y)*3)/6);c=mn[Math.abs(b*7+((b*b)%3))%4];if((y+Math.floor(Math.sin(x*.18)*2))%6===0)c=mn[0];if(R()<.1)c=mn[Math.min(3,q+1)];if(x%23===5&&R()<.6)c=mn[0]}else c=mn[q]}
  else if(kind==='rvS'||kind==='rvT'){c=vo[q];if(ck.has(y*S+x)){c=[255,130,34];em=[255,110,26]}else{let near=false;for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]])if(ck.has((y+dy)*S+x+dx))near=true;if(near){c=[170,60,24];em=[120,40,12]}}}
  else{c=[0,0,0]}
  rkWr(A,ox,oy,x,y,c);rkWr(E,ox,oy,x,y,em||[0,0,0])}}
function rkGrass(A,E,ox,oy,seed){const R=rg3(seed),g=[[30,64,28],[54,110,42],[96,160,56],[150,204,86]];for(let y=0;y<64;y++)for(let x=0;x<64;x++){rkWr(A,ox,oy,x,y,g[1],0);rkWr(E,ox,oy,x,y,[0,0,0],255)}
 for(let b=0;b<26;b++){const x0=2+b*2.3+R()*1.5,h=22+R()*38,lean=(R()-.5)*16;for(let y=0;y<h;y++){const t=y/h,xx=Math.round(x0+lean*t*t),w=t<.35?3:t<.75?2:1;for(let k=0;k<w;k++)if(xx+k<64)rkWr(A,ox,oy,xx+k,63-y,t>.75?g[3]:k?g[2]:g[1])}}}
function rkTex(){if(RKT)return RKT;const A=new Uint8Array(RKW*RKH*4),E=new Uint8Array(RKW*RKH*4);RKN.forEach((n,i)=>{const ox=(i%4)*64,oy=((i/4)|0)*64;if(n==='gt')rkGrass(A,E,ox,oy,77);else if(n==='gt2')rkFern(A,E,ox,oy,91);else rkTile(A,E,ox,oy,n,200+i*13)});
 for(const[arr,nm]of[[A,'t'],[E,'e']]){}
 const mk=D=>{const t=new TH.DataTexture(D,RKW,RKH,TH.RGBAFormat);t.magFilter=TH.NearestFilter;t.minFilter=TH.LinearMipmapLinearFilter;t.generateMipmaps=true;t.colorSpace=TH.SRGBColorSpace;t.needsUpdate=true;return t};RKE=mk(E);return RKT=mk(A)}
function rkMat(){if(RKM)return RKM;const m=new TH.MeshStandardMaterial({map:rkTex(),emissiveMap:RKE,emissive:new TH.Color('#ffffff'),emissiveIntensity:.2,alphaTest:.5,roughness:1,metalness:0,side:TH.DoubleSide});
 m.onBeforeCompile=sh=>{MV.onBeforeCompile(sh);sh.fragmentShader=sh.fragmentShader.replace('#include <normal_fragment_begin>',TH.ShaderChunk.normal_fragment_begin.replace('gl_FrontFacing ? 1.0 : - 1.0','1.0'))};return RKM=m}
const rkUV=n=>{const i=RKN.indexOf(n),c=i%4,r=(i/4)|0;return[c*64/RKW,r*64/RKH]};
function rkProj(g,top,side){const p=g.attributes.position,uv=g.attributes.uv,nr=g.attributes.normal,tu=rkUV(top),su=rkUV(side),w=64/RKW,h=64/RKH;
 for(let i=0;i<p.count;i+=3){const ny=nr.getY(i),nx=nr.getX(i),nz=nr.getZ(i),T=ny>.5;for(let k=0;k<3;k++){const x=p.getX(i+k),y=p.getY(i+k),z=p.getZ(i+k);let u,v;if(T){u=x/2.6+.5;v=z/2.6+.5}else if(Math.abs(nx)>Math.abs(nz)){u=z/2.6+.5;v=1-y/2.6}else{u=x/2.6+.5;v=1-y/2.6}u=Math.max(.03,Math.min(.97,u));v=Math.max(.03,Math.min(.97,v));const o=T?tu:su;uv.setXY(i+k,o[0]+u*w,o[1]+v*h)}}return g}
function rkShape(kind,seed){const R=rg3(seed);let g;
 if(kind==='mn'){g=new TH.BoxGeometry(1.8,1.6,1.6,3,3,3);const p=g.attributes.position;for(let i=0;i<p.count;i++){const y=p.getY(i),t=(y+.8)/1.6,f=1-.3*t*t,j=hs(p.getX(i)*2.1+seed,y*2.1,p.getZ(i)*2.1);p.setXYZ(i,p.getX(i)*f*(.85+j*.3),y+(j-.5)*.25,p.getZ(i)*f*(.85+hs(j,y,seed)*.3))}g.translate(0,.8,0)}
 else if(kind==='vo'){g=new TH.IcosahedronGeometry(1,0);const p=g.attributes.position;for(let i=0;i<p.count;i++){const f=.88+R()*.26;p.setXYZ(i,p.getX(i)*f,p.getY(i)*f*1.05,p.getZ(i)*f)}g.scale(1.05,1,1);g.translate(0,.75,0)}
 else{g=new TH.IcosahedronGeometry(1,1);const p=g.attributes.position;for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),z=p.getZ(i),f=1+(hs(x*1.3+seed,y*1.3,z*1.3)-.5)*.55;p.setXYZ(i,x*f,y*f,z*f)}g.scale(1.1,.78,1);g.translate(0,.4,0)}
 g=g.toNonIndexed();g.computeVertexNormals();return g}
function rkCard(tile,w,h,pos,ry){const g=new TH.PlaneGeometry(w,h),u=rkUV(tile),uv=g.attributes.uv;for(let i=0;i<4;i++)uv.setXY(i,u[0]+uv.getX(i)*64/RKW,u[1]+(1-uv.getY(i))*64/RKH);g.rotateY(ry);g.translate(pos[0],pos[1],pos[2]);const n=g.attributes.normal;for(let i=0;i<4;i++)n.setXYZ(i,0,1,0);return g.toNonIndexed()}
function rkGeo(kind,v,tufts){const g=rkProj(rkShape(kind,40+v*9+(kind==='vo'?5:0)),kind==='mn'?'rmT':kind==='vo'?'rvT':'rgT',kind==='mn'?'rmS':kind==='vo'?'rvS':'rgS'),P=[g];
 if(tufts){const R=rg3(60+v);for(let i=0;i<4;i++){const a=i/4*6.283+R(),r=.8+R()*.3;P.push(rkCard('gt',.9,.7,[Math.cos(a)*r,.3,Math.sin(a)*r],a),rkCard('gt',.9,.7,[Math.cos(a)*r,.3,Math.sin(a)*r],a+1.571))}}
 return TH.mergeGeometries(P,false)}
function rkPebbles(){const R=rg3(88),P=[];[[0,0,.55],[.8,.2,.38],[-.5,-.6,.3],[.2,.9,.24]].forEach(([x,z,r],i)=>{let g=new TH.IcosahedronGeometry(1,0);const p=g.attributes.position;for(let k=0;k<p.count;k++){const f=.85+R()*.3;p.setXYZ(k,p.getX(k)*f,p.getY(k)*f*.7,p.getZ(k)*f)}g.scale(r,r,r);g.translate(x,r*.45,z);g=g.toNonIndexed();g.computeVertexNormals();P.push(rkProj(g,'rgT','rgS'))});return TH.mergeGeometries(P,false)}
// ===== v3.6.3 : herbe 3D (touffes pixel-art) =====
let GRM_=null,GWC=-1;const GHP=Array.from({length:8},()=>new TH.Vector3(0,0,0));let GQL=-1;
function rkFern(A,E,ox,oy,seed){const R=rg3(seed),g=[[20,52,30],[40,92,46],[74,136,62],[120,176,86]];for(let y=0;y<64;y++)for(let x=0;x<64;x++){rkWr(A,ox,oy,x,y,g[1],0);rkWr(E,ox,oy,x,y,[0,0,0],255)}
 for(let f=0;f<7;f++){const a=-1.25+f*.42+(R()-.5)*.12,L=24+R()*30;for(let t=0;t<L;t+=.7){const x=32+Math.sin(a)*t*.9,y=63-Math.cos(a)*t,hw=Math.round(Math.sin(Math.PI*Math.min(1,t/L*1.2))*3.2*(1-t/L*.4));for(let k=-hw;k<=hw;k++){const xx=Math.round(x+k*Math.cos(a)),yy=Math.round(y+k*Math.sin(a)*.2);if(xx>=0&&xx<64&&yy>=0&&yy<64)rkWr(A,ox,oy,xx,yy,k===0?g[3]:(Math.abs(k)+((t/2)|0))%3===0?g[0]:g[1+(k+3)%3==2?1:0])}}}}
function grTuft(tile,w,h){const P=[];for(let i=0;i<3;i++){const g=new TH.PlaneGeometry(w,h),u=rkUV(tile),uv=g.attributes.uv;for(let k=0;k<4;k++)uv.setXY(k,u[0]+uv.getX(k)*64/RKW,u[1]+(1-uv.getY(k))*64/RKH);g.rotateY(i*1.0472);g.translate(0,h/2,0);const n=g.attributes.normal;for(let k=0;k<4;k++)n.setXYZ(k,0,1,0);P.push(g.toNonIndexed())}return TH.mergeGeometries(P,false)}
function grMat(){if(GRM_)return GRM_;const m=new TH.MeshStandardMaterial({map:rkTex(),alphaTest:.5,roughness:1,metalness:0,side:TH.DoubleSide});
 m.onBeforeCompile=sh=>{MV.onBeforeCompile(sh);sh.uniforms.uWt=TXU.t;sh.uniforms.uWw=TXU.w;sh.uniforms.uHP={value:GHP};
  sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nuniform float uWt;uniform float uWw;uniform vec3 uHP[8];').replace('#include <begin_vertex>','#include <begin_vertex>\n{float ph_=instanceMatrix[3].x*.43+instanceMatrix[3].z*.37,hh_=position.y;float s_=sin(uWt*2.2+ph_)*.6+sin(uWt*4.1+ph_*1.9)*.25;transformed.x+=s_*uWw*hh_*hh_*.3;transformed.z+=cos(uWt*1.7+ph_*1.3)*uWw*hh_*hh_*.2;mat3 im_=mat3(instanceMatrix);float sq_=max(dot(im_[0],im_[0]),1e-4);for(int i=0;i<8;i++){vec3 h_=uHP[i];if(h_.z>0.){vec2 d_=instanceMatrix[3].xz-h_.xy;float l_=length(d_);if(l_<2.8){float k_=1.-l_/2.8;vec2 n_=d_/max(l_,.01);vec3 ld_=transpose(im_)*vec3(n_.x,0.,n_.y)/sq_;transformed.xz+=ld_.xz*k_*hh_*1.2;transformed.y*=1.-k_*.5;}}}}');
  sh.fragmentShader=sh.fragmentShader.replace('#include <normal_fragment_begin>',TH.ShaderChunk.normal_fragment_begin.replace('gl_FrontFacing ? 1.0 : - 1.0','1.0'))};return GRM_=m}
function grassQ(){const f=K.ql>=2?1:K.ql===1?.6:.25;GQL=K.ql;GWC=worldG.children.length;for(const m of worldG.children)if(m.isInstancedMesh&&m.material===GRM_){if(!m.userData.n)m.userData.n=m.count;m.count=Math.ceil(m.userData.n*f)}}
function grassUpd(tm){if(GQL!==K.ql||GWC!==worldG.children.length)grassQ();let n=0;HM.forEach(o=>{if(n<8&&o.g&&o.g.visible)GHP[n++].set(o.x,o.z,1)});for(;n<8;n++)GHP[n].z=0}
function rockUpd(){if(RKM)RKM.emissiveIntensity=.18+.82*dkl()}
function tgeo(){return TG||(TG={oa0:txBroad(0,TXO.oa),oa1:txBroad(1,TXO.oa),ob0:txBroad(0,TXO.ob),ob1:txBroad(1,TXO.ob),oc0:txBroad(0,TXO.oc),bi0:txBroad(0,TXO.bi),wi0:txWillow(),pn0:txPineG(false,0),pn1:txPineG(false,1),ps0:txPineG(true,0),dd0:txDead(0),dd1:txDead(1),pm0:txPalm(),bu0:txBush(0),bu1:txBush(1),gr0:rkGeo('gr',0,false),gr1:rkGeo('gr',1,true),gr2:rkGeo('gr',2,true),mn0:rkGeo('mn',0,false),mn1:rkGeo('mn',1,false),vo0:rkGeo('vo',0,false),vo1:rkGeo('vo',1,false),pb0:rkPebbles(),gt:grTuft('gt',1.8,1.3),gf:grTuft('gt2',1.9,1.4)})}
function windUpd(tm){TXU.t.value=tm;const w=wxMix();TXU.w.value=.3+.7*Math.min(1,w[0]*.5+w[1]*.8+w[3])}
let LFT=0;function leafUpd(tm){if(tm-LFT<.45||FXL.length>40||!TPOS.length)return;LFT=tm;if(wxMix()[1]>.5)return;let q=null,n=0;for(const c of TPOS)if(!c.cl&&c.k&&/^(oa|ob|oc|bi|wi)/.test(c.k)&&Math.abs(c.x-K.tx)<26&&Math.abs(c.z-K.tz)<26&&Math.random()*(++n)<1)q=c;if(!q)return;
 const cl=q.k==='oc'?[232,150,50]:q.k==='bi'?[190,214,100]:[110,170,70],s=fxSp('lf',.55,.4,q.x+(Math.random()-.5)*3*q.s,q.y+(2.6+Math.random()*2.2)*q.s,q.z+(Math.random()-.5)*3*q.s);s.material.depthTest=true;s.material.color.setRGB(cl[0]/255,cl[1]/255,cl[2]/255);
 const x0=s.position.x,y0=s.position.y,z0=s.position.z,ph=Math.random()*6,gy=q.y+.2;fxAdd(s,tm,4.5,(p,s)=>{s.position.set(x0+Math.sin(p*7+ph)*1.2+p*1.5,y0+(gy-y0)*p,z0+Math.cos(p*5+ph)*.6);s.material.rotation=p*9+ph;s.material.opacity=p>.85?(1-p)/.15:1})}
function waterMat(){if(WMAT)return WMAT;const S=128,c=document.createElement('canvas');c.width=c.height=S;const g=c.getContext('2d'),R=rg3(55);g.fillStyle='rgb(190,226,238)';g.fillRect(0,0,S,S);
 g.lineCap='round';for(let i=0;i<46;i++){const x=R()*S,y=R()*S,l=10+R()*22;g.strokeStyle=`rgba(255,255,255,${.25+R()*.4})`;g.lineWidth=1+R()*1.6;for(const ox of[0,-S]){g.beginPath();g.moveTo(x+ox,y);g.quadraticCurveTo(x+ox+l/2,y+(R()-.5)*4,x+ox+l,y);g.stroke()}}
 WTEX=new TH.CanvasTexture(c);WTEX.wrapS=WTEX.wrapT=TH.RepeatWrapping;WTEX.colorSpace=TH.SRGBColorSpace;
 return WMAT=new TH.MeshStandardMaterial({map:WTEX,color:'#3f98bf',transparent:true,opacity:.84,roughness:.15,metalness:.05,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2})}
function buildWorld(){
 PKT.length=0;clearG(worldG);const R=rg3(777),W=new TA(),L={oa0:[],oa1:[],ob0:[],ob1:[],oc0:[],bi0:[],wi0:[],pn0:[],pn1:[],ps0:[],dd0:[],dd1:[],pm0:[],rk:[],gr0:[],gr1:[],gr2:[],mn0:[],mn1:[],vo0:[],vo1:[],pb0:[],gt:[],gf:[],bu:[],bu0:[],bu1:[]},VN={oa:2,ob:2,oc:1,bi:1,wi:1,pn:2,ps:1,dd:2,pm:1},tc=()=>{const b=.86+R()*.28;return new Col(b*(1+(R()-.5)*.1),b,b*(1+(R()-.5)*.14))},vc=(a,b)=>new Col().setScalar(a+R()*b);
 const tree=(x,z,s,kind)=>{let t=kind;if(!t){const r=R();t=nearRiver(x,z,12)&&r<.45?'wi':r<.42?'oa':r<.82?'ob':'bi'}if((t==='oa'||t==='ob')&&R()<.04)t='oc';const q={x,y:H3(x,z)-.2,z,s,sx:s*(.9+R()*.2),sy:s*(.9+R()*.25),sz:s*(.9+R()*.2),c:tc(),r:R()*6,k:t};L[t+(VN[t]>1&&R()<.5?1:0)].push(q);TPOS.push(q)};
 const rkFree=(x,y,m)=>{for(const z of ZA){if(z.n!=='Montagne'&&z.n!=='Volcan')continue;if(Math.hypot(x-z.x,y-z.y)>ZRD(z.n)*1.8)continue;const q=zr(z.n),ox=z.x+q[0]*ZS,oy=z.y+q[1]*ZS,ax=(q[2]-1.2)*ZS,ay=(q[3]-.5)*ZS;
   if(((x-ox)/(ax+m+10))**2+((y-oy)/(ay+m+4))**2<1)return false;const rd=RD[z.n];if(!rd)continue;const e=rd[rd.length-1];
   for(const t of[[ox,oy],[ox-ax,oy],[ox+ax,oy]]){const dx=t[0]-e[0],dy=t[1]-e[1],k=Math.max(0,Math.min(1,((x-e[0])*dx+(y-e[1])*dy)/(dx*dx+dy*dy||1)));if(Math.hypot(x-e[0]-k*dx,y-e[1]-k*dy)<m+3)return false}}
  for(const z of ZA){const rd=RD[z.n];if(rd&&ZA.some(w=>(w.n==='Montagne'||w.n==='Volcan')&&Math.hypot(x-w.x,y-w.y)<ZRD(w.n)*1.8)&&rd.some(p=>Math.hypot(p[0]-x,p[1]-y)<m+3))return false}return true};
 const rock=(x,y,sx,sy,sz,c)=>{const mn=/^(#a8a49c|#85817a|#9a968e|#7d7972|#9a9ca2)$/.test(c),vo=/^(#6f5a52|#8f6a58)$/.test(c),k=vo?'vo'+(R()<.5?1:0):mn?'mn'+(R()<.5?1:0):sx<.9?'pb0':'gr'+((R()*3)|0),q={x,y:H3(x,y)-.15,z:y,sx,sy,sz,r:R()*6,c:new Col(c).lerp(new Col('#ffffff'),.6)};if(!rkFree(x,y,1.15*Math.max(sx,sz)))return;L.rk.push(q);L[k].push(q)};
 SHM=[];TPOS=[];tRoad=[];for(const z of ZA){const p=RD[z.n];if(p)for(let k=0;k<p.length;k+=3)tRoad.push(p[k])}
 const vd=vdim(),TP=outTorchPts(vd),clear=(x,y,m)=>{if(((x-T.x)/(vd.rx+m))**2+((y-T.y)/(vd.ry+m))**2<1)return false;for(const p of tRoad)if(Math.abs(p[0]-x)<m&&Math.abs(p[1]-y)<m&&Math.hypot(p[0]-x,p[1]-y)<m)return false;if(nearRiver(x,y,m))return false;for(const q of TP)if(Math.hypot(q[0]-x,q[1]-y)<m+1.2)return false;return true};
 const inZone=(x,y)=>{for(const z of ZA)if(Math.hypot(x-z.x,y-z.y)<ZRD(z.n)+3)return true;return false};
 for(let i=0,n=0;i<4000&&n<480;i++){const x=6+R()*(WXd-12),y=6+R()*(WYd-12);if(inZone(x,y)||!clear(x,y,5))continue;tree(x,y,1.1+R()*1.1,R()<.2?'pn':null);n++}
 for(let i=0,n=0;i<1500&&n<240;i++){const x=6+R()*(WXd-12),y=6+R()*(WYd-12);if(inZone(x,y)||!clear(x,y,4))continue;rock(x,y,1+R()*1.6,.8+R()*.9,1+R()*1.6,'#c4c5ba');n++}
 for(let i=0,n=0;i<1500&&n<160;i++){const x=6+R()*(WXd-12),y=6+R()*(WYd-12);if(inZone(x,y)||!clear(x,y,3.5))continue;L.bu.push({x,y:H3(x,y)-.05,z:y,s:.9+R()*.8,c:vc(.8,.35),r:R()*6});n++}
 {const qd=K.ql>=2?1:K.ql===1?.6:.3;
 for(let i=0,n=0;i<3000&&n<90*qd;i++){const x=6+R()*(WXd-12),y=6+R()*(WYd-12);if(inZone(x,y)||!clear(x,y,3))continue;const k=2+Math.floor(R()*3);for(let j=0;j<k;j++){const bx=x+(R()-.5)*5,by=y+(R()-.5)*5;if(clear(bx,by,1.5))L.bu.push({x:bx,y:H3(bx,by)-.05,z:by,s:.55+R()*.6,c:vc(.78,.4),r:R()*6})}n++}
 for(let i=0,n=0;i<3000&&n<130*qd;i++){const x=6+R()*(WXd-12),y=6+R()*(WYd-12);if(inZone(x,y)||!clear(x,y,2))continue;rock(x,y,.5+R()*.8,.4+R()*.5,.5+R()*.8,'#b7b8ad');n++}}
 {const RG=new Map();for(const z of ZA){const p=RD[z.n];if(p)for(const q of p){const c=((q[0]/4)|0)+','+((q[1]/4)|0);let a=RG.get(c);if(!a)RG.set(c,a=[]);a.push(q)}}
 const rdist=(x,y)=>{let b=1e9;const cx=(x/4)|0,cy=(y/4)|0;for(let i=-1;i<=1;i++)for(let j=-1;j<=1;j++){const a=RG.get((cx+i)+','+(cy+j));if(a)for(const q of a){const d=Math.hypot(q[0]-x,q[1]-y);if(d<b)b=d}}return b};
 const tuft=(x,y,k,c,s)=>L[k].push({x,y:H3(x,y)-.05,z:y,s,r:R()*6,c}),gz=(x,y)=>{let b=null,bd=1e9;for(const z of ZA){const d=Math.hypot(x-z.x,y-z.y)-ZRD(z.n);if(d<bd){bd=d;b=z.n}}return bd<3?b:null};
 for(let i=0,n=0;i<40000&&n<9000;i++){let x,y;if(R()<.25&&tRoad.length){const p=tRoad[(R()*tRoad.length)|0],a0=R()*6.283,dd=2.2+R()*4;x=p[0]+Math.cos(a0)*dd;y=p[1]+Math.sin(a0)*dd}else{x=6+R()*(WXd-12);y=6+R()*(WYd-12)}
  if(x<4||y<4||x>WXd-4||y>WYd-4||!clear(x,y,1.3))continue;if(rdist(x,y)<2.6&&R()>.06)continue;const zn=gz(x,y);if(zn&&zn!=='Forêt'&&zn!=='Montagne')continue;if(zn==='Montagne'&&R()<.6)continue;
  let rd=1e9;for(const p of tRoad){const d=Math.abs(p[0]-x)+Math.abs(p[1]-y);if(d<rd)rd=d}
  const tint=zn==='Montagne'?new Col(.8,.86,.8):rd<9?new Col(1.12,1.04,.7):new Col(.9+R()*.2,1,.9+R()*.15);
  const k=1+((R()*3)|0);for(let j=0;j<k;j++){const bx=x+(R()-.5)*1.6,by=y+(R()-.5)*1.6;tuft(bx,by,'gt',tint,.8+R()*.7)}n++}
 const zf=ZA.find(z=>z.n==='Forêt');if(zf){const r0=ZRD(zf.n);for(let i=0,c=0,kq=zsc(zf.n)**2;i<6000*kq&&c<1300*kq;i++){const an=R()*6.283,d=Math.sqrt(R())*r0*.97,x=zf.x+Math.cos(an)*d,y=zf.y+Math.sin(an)*d;if(!clear(x,y,1.4))continue;const dk=new Col(.62+R()*.2,.78+R()*.15,.66+R()*.15);tuft(x,y,R()<.6?'gf':'gt',dk,.9+R()*.7);c++}}}
 const edge=(x,y)=>Math.min(x,y,WXd-x,WYd-y),outT=(x,z)=>{const t=R()<.55?'pn':R()<.5?'oa':'ob',q={x,y:-1.9,z,s:1.7+R()*1.9,c:tc(),r:R()*6};L[t+(R()<.5?1:0)].push(q)};
 for(let i=0,n=0;i<14000&&n<520;i++){const x=R()*WXd,y=R()*WYd,e=edge(x,y);if(e>46||R()>.3+.7*(1-e/46))continue;if(inZone(x,y)||!clear(x,y,4))continue;tree(x,y,1.7+R()*1.9,R()<.55?'pn':null);n++}
 for(let i=0,n=0;i<9000&&n<420;i++){const x=-130+R()*(WXd+260),y=-130+R()*(WYd+260);if(x>-4&&x<WXd+4&&y>-4&&y<WYd+4)continue;outT(x,y);n++}
 for(const z of ZA){const r=ZRD(z.n),n=z.n,zx=z.x,zz=z.y,gy=H3(zx,zz);
  const around=(cnt,fn,rr)=>{cnt=Math.max(1,Math.round(cnt*zsc(n)**2));for(let i=0,c=0;i<cnt*6&&c<cnt;i++){const an=R()*6.283,d=Math.sqrt(R())*r*(rr||.92),x=zx+Math.cos(an)*d,y=zz+Math.sin(an)*d;if(!clear(x,y,2.6))continue;fn(x,y);c++}};
  const fr=s=>{W.frame(zx,gy,zz,s);return(lx,lz)=>(H3(zx+lx*s,zz+lz*s)-gy)/s};
  if(n==='Ruines')around(16,(x,y)=>tree(x,y,.9+R()*.6,R()<.8?'dd':'pm'),.95);else if(n==='Donjon')around(18,(x,y)=>tree(x,y,.9+R()*.7,'dd'),.95);else if(n==='Volcan')around(12,(x,y)=>tree(x,y,.8+R()*.6,'dd'),.95);
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
  else if(n==='Montagne'){for(let i=0;i<7;i++){const an=i/7*6.283+R()*.4,d=i?r*(.3+R()*.5):0,x=zx+Math.cos(an)*d,y=zz+Math.sin(an)*d,h=(i?11+R()*10:22)*ZF,b=(i?6+R()*4:10)*ZF,g=peakG(b,h,i*7+1);g.rotateY(R()*3);g.translate(x,H3(x,y)-1,y);pkAdd(g);W.frame(0,0,0,1).raw('flat',g)}
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
 ZA.forEach((z,zi)=>{const pts=RD[z.n];if(!pts)return;const ph=zi*1.7+.4;let seg=[],s0=0;const fl=()=>{if(seg.length>2)roadMesh(seg,s0,ph);seg=[]};
  for(let k=pts.sh||0;k<pts.length;k+=2){const p=pts[k];if(nearRiver(p[0],p[1],.3)||((p[0]-T.x)/vd.rx)**2+((p[1]-T.y)/vd.ry)**2<1.02){fl();continue}if(!seg.length)s0=k;seg.push([p[0],p[1]])}fl()});
 {TPG=TP;const wq=[];for(const [x,z] of TP){const y0=H3(x,z);W.add('wood',cy2(.07,.1,2.3,6),'#4a3322',x,y0+1.1,z,{shade:0});W.add('wood',box(.34,.12,.34),'#2a1e14',x,y0+2.3,z,{shade:0});W.add('lava',box(.22,.3,.22),'#fff',x,y0+2.55,z,{shade:0});wq.push(x,y0+2.8,z)}
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
 const G3=tgeo(),CS=200;L.bu.forEach((q,i)=>L[i&1?'bu1':'bu0'].push(q));for(const k of['oa0','oa1','ob0','ob1','oc0','bi0','wi0','pn0','pn1','ps0','dd0','dd1','pm0','bu0','bu1','gr0','gr1','gr2','mn0','mn1','vo0','vo1','pb0','gt','gf']){const cells={};for(const q of L[k]){const id=Math.floor(q.x/CS)+','+Math.floor(q.z/CS);(cells[id]=cells[id]||[]).push(q)}for(const id in cells)inst(worldG,G3[k],/^(gr|mn|vo|pb)/.test(k)?rkMat():/^g[tf]$/.test(k)?grMat():txMat(),cells[id],!/^(bu|gr|pb|gt|gf)/.test(k))}
 {const sm=csInst(worldG,TPOS.map(q=>[q.x,q.z,2.7*q.s,2.7*q.s]),false,.28);TPOS.forEach((q,i)=>{q._sm=sm;q._si=i})}csInst(worldG,L.rk.map(q=>[q.x,q.z,2.6*q.sx,2.6*q.sz]),false,.4);
 const vz=ZA.find(z=>z.n==='Volcan');if(vz){const sp=new TH.Sprite(new TH.SpriteMaterial({map:glowTex(),color:'#ff7a2a',blending:TH.AdditiveBlending,depthWrite:false,transparent:true}));sp.position.set(vz.x,H3(vz.x,vz.y)+2,vz.y);sp.scale.set(30,30,1);worldG.add(sp)}}
// ---------- village ----------
const WALL={A:'#e6d3a8',V:'#ece2c8',F:'#b9b2a4',T:'#d9b98f',S:'#efeae0',M:'#a8794a',E:'#a8794a',I:'#a9acb6',C:'#d9c9a3',N:'#cdc3e4',H:'#d9b98f'},ROOF={A:'#9b4a2f',V:'#3f5f8a',F:'#55555e',T:'#7a3d2e',S:'#6c7fb5',M:'#c9a24a',E:'#6b4a2a',I:'#3f4e6b',C:'#7a2f3a',N:'#4b3a86',H:'#8b4a3a'};
// ===== v3.4.3 : détails d'architecture et ombres de contact =====
function brace(W,x1,y1,x2,y2,z,dz){const L=Math.hypot(x2-x1,y2-y1);W.add('wood',box(L,.16,.1),'#5a3d26',(x1+x2)/2,(y1+y2)/2,z+dz*.05,{rz:Math.atan2(y2-y1,x2-x1),shade:0})}
function bldDetail(W,k,x,z,w,D,hh,yb,top,rh,roof,wk){
 const dr=dkc(roof,.3),fz=z+D,bz=z-D,pl=wk==='plaster',st=wk==='stone',ang=Math.atan2(rh,D+.55),L=Math.hypot(rh,D+.55);
 for(const s of[-1,1]){W.add('wood',box(w+1.15,.2,.14),dr,x,top-.02,z+s*(D+.57),{shade:0});
  const n=Math.max(4,Math.round(w/1.3));for(let i=0;i<n;i++)W.add('wood',box(.16,.16,.55),'#4a3322',x-w/2+(i+.5)*w/n,top-.14,z+s*(D+.28),{shade:0})}
 for(const sx of[-1,1])for(const s of[-1,1])W.add('wood',box(.2,.26,L),dr,x+sx*(w/2+.55),top+rh/2,z+s*(D+.55)/2,{rx:s*ang,shade:0});
 if(st){W.add('stone',box(w+.3,.24,d2(D)+.3),'#cfc9ba',x,top-.12,z,{shade:0});if(hh>4.4)W.add('stone',box(w+.12,.14,.14),'#cfc9ba',x,yb+hh*.56,fz+.03,{shade:0})}
 if(pl){const tm='#5a3d26';
  for(const sx of[-1,1])for(const q of[-1,1])W.add('wood',box(.14,hh,.16),tm,x+sx*(w/2+.04),yb+hh/2,z+q*D*.55,{shade:0});
  if(hh>4.2)for(const sx of[-1,1])W.add('wood',box(.18,.24,2*D+.1),tm,x+sx*(w/2+.05),yb+hh*.52,z,{shade:0});
  if(w*.15>.85)for(const sx of[-1,1])W.add('wood',box(.14,hh,.12),tm,x+sx*w*.15,yb+hh/2,fz+.04,{shade:0});
  for(const sx of[-1,1]){const a=Math.min(hh*.5,w*.22),x1=x+sx*(w/2-.17);brace(W,x1,yb+.15,x1-sx*a,yb+.15+a,bz,-1);brace(W,x1,yb+hh-.35,x1-sx*a,yb+hh-.35-a,bz,-1)}
  if(k!=='M'){const lo=hh>4.4?.32:.55,sc=ROOF[k]||'#7a3d2e';
   for(const q of[-1,1]){const xw=x+q*w*.3,yw=yb+hh*lo;
    for(const s of[-1,1])W.add('wood',box(.3,1.15,.07),sc,xw+s*.72,yw,fz+.04,{shade:0});
    W.add('wood',box(1.1,.2,.32),'#6b4a2a',xw,yw-.7,fz+.2,{shade:0});W.add('flat',box(1.0,.1,.26),'#4f8a3f',xw,yw-.56,fz+.2,{shade:0});
    ['#e85a7a','#f4d35a','#f2eef8'].forEach((c,i)=>W.add('flat',box(.14,.14,.14),c,xw+(i-1)*.3,yw-.46,fz+.22,{shade:0}))}}}
 if(k!=='E'&&k!=='V'&&k!=='S'){W.add('wood',box(2.1,.12,1.0),dr,x,yb+2.78,fz+.5,{rx:.3,shade:0});for(const s of[-1,1])W.add('wood',box(.1,.5,.1),'#4a3322',x+s*.9,yb+2.5,fz+.15,{rz:s*.4,shade:0})}}
const d2=D=>2*D;
let CSM=null,CST=[null,null],CQ=[],CSG=null;
function csTex(rect){const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');
 if(rect){g.shadowColor='#000';g.shadowBlur=26;g.shadowOffsetX=1000;g.fillStyle='#000';g.fillRect(34-1000,34,60,60)}
 else{const q=g.createRadialGradient(64,64,0,64,64,64);q.addColorStop(0,'rgba(0,0,0,1)');q.addColorStop(.45,'rgba(0,0,0,.55)');q.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=q;g.fillRect(0,0,128,128)}
 return new TH.CanvasTexture(c)}
function csMat(rect,op){if(!CST[rect?1:0])CST[rect?1:0]=csTex(rect);return new TH.MeshBasicMaterial({map:CST[rect?1:0],color:'#000',transparent:true,opacity:op,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-3,polygonOffsetUnits:-3})}
function csInst(par,list,rect,op){if(!list.length)return;const m=new TH.InstancedMesh(new TH.PlaneGeometry(1,1).rotateX(-PI/2),csMat(rect,op),list.length),o=new TH.Object3D();
 list.forEach((q,i)=>{o.position.set(q[0],H3(q[0],q[1])+.14,q[1]);o.scale.set(q[2],1,q[3]);o.rotation.y=q[4]||0;o.updateMatrix();m.setMatrixAt(i,o.matrix)});m.frustumCulled=false;m.renderOrder=1;par.add(m);return m}
function csChar(sz){if(!CSM){CSM=csMat(false,.5);CSG=new TH.PlaneGeometry(1,1).rotateX(-PI/2)}const m=new TH.Mesh(CSG,CSM);m.scale.set(sz,1,sz);m.position.y=.04;m.renderOrder=1;return m}
function stall(W,x,y0,z,w,d,roof){CQ.push([x,z,w+2.4,d+2.4]);
 W.add('stone',box(w+.3,.3,d+.3),'#8f8a7d',x,y0+.15,z,{shade:.04});
 W.add('wood',box(w*.9,1.1,1.3),'#8a5f3a',x,y0+.85,z+d*.22);
 [['#c0392b',-.25],['#e0b030',0],['#5a8a3a',.25]].forEach(([c,q])=>{W.add('flat',box(.7,.35,.6),c,x+q*w*.9,y0+1.58,z+d*.22,{shade:0})});
 for(const sx of[-1,1])for(const sz of[-1,1])W.add('wood',box(.3,3.3,.3),'#5a3d26',x+sx*w*.45,y0+1.95,z+sz*d*.38,{shade:.04});
 for(let i=0;i<6;i++)W.add('flat',box(w/6*1.02,.12,d*.98),i%2?'#f1e8d0':roof,x-w/2+(i+.5)*w/6,y0+3.45,z,{rx:.14,shade:.02});
 W.add('wood',box(.9,.8,.9),'#7a5232',x-w*.3,y0+.7,z-d*.2);W.add('wood',box(.7,.6,.7),'#8a6238',x-w*.18,y0+.6,z-d*.3,{ry:.5})}
function building(W,k,x,y0,z,w,d,hh,roof,tier,full){CQ.push([x,z,w+3.4,d+3.4]);
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
 W.add('wood',box(w+1.2,.16,.34),dkc(roof,.35),x,top+rh+.04,z,{shade:0});bldDetail(W,k,x,z,w,D,hh,yb,top,rh,roof,wk);
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
 if(k==='N'){W.add('stone',cy2(.5,.65,.9,10),'#8a857a',x+w*.3,yb+.45,fz+1.5,{cyl:[.6,.9],shade:.05});W.add('flat',new TH.SphereGeometry(.5,12,8),'#b48cff',x+w*.3,yb+1.4,fz+1.5,{shade:0});W.add('flat',new TH.SphereGeometry(.22,8,6),'#efe0ff',x+w*.3-.12,yb+1.5,fz+1.62,{shade:0});W.add('flat',box(.9,1.5,.06),'#4b3a86',x-w*.3,yb+hh*.5,fz+.06,{shade:0});W.add('flat',box(.3,.5,.05),'#cfa8ff',x-w*.3,yb+hh*.5+.1,fz+.1,{shade:0})}
 if(k==='C'){const tx=x+w/2,tz=z-D*.1,th=hh+2.4;W.add('stone',cy2(1.1,1.2,th,14),'#d9d3c5',tx,yb+th/2,tz,{cyl:[1.15,th],shade:.06});W.add('tile',new TH.ConeGeometry(1.6,3,14),roof,tx,yb+th+1.4,tz,{cyl:[1.6,3.2],shade:.1});
  W.add('flat',box(.9,1.5,.06),'#7a2f3a',x-w*.3,yb+hh*.5,fz+.06,{shade:0});W.add('flat',box(.3,.5,.05),'#d4b04a',x-w*.3,yb+hh*.5+.1,fz+.1,{shade:0})}}
function vprops(W,k,x,z,w,d,i){if(k==='A'||k==='T')return;const a=(i*7+3)%5,px=x-w/2-.9,pz=z+d/2-.5,py=H3(px,pz);W.add('wood',cy2(.45,.5,1,10),'#7a5232',px,py+.5,pz,{cyl:[.45,1],shade:.05});W.add('wood',box(.85,.75,.85),'#9a7448',px+.15,py+.38,pz+.95,{ry:.4+a*.3,shade:.05});if(a%2===0)W.add('wood',box(.6,.55,.6),'#b08850',px+.1,py+1.02,pz+.95,{ry:.9,shade:.05});
 if(k==='H'||k==='E'||k==='C'){const qx=x+w/2+.2,qz=z-d/2-.9,qy=H3(qx,qz);W.add('wood',cy2(.45,.5,1,10),'#6a4a2c',qx,qy+.5,qz,{cyl:[.45,1],shade:.05})}}
const RIT={},RIC={A:'🛏️',F:'🔨',T:'🍺',S:'⛪',E:'🐴',V:'🏛️',I:'🛡️',C:'⚜️',N:'🔮',H:'🏠'};
function roofTex(ch){if(RIT[ch])return RIT[ch];const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');const tn=(col)=>{const q=document.createElement('canvas');q.width=q.height=128;const h=q.getContext('2d');h.font='88px serif';h.textAlign='center';h.textBaseline='middle';h.fillText(ch,64,64);h.globalCompositeOperation='source-in';h.fillStyle=col;h.fillRect(0,0,128,128);return q};g.drawImage(tn('#140b06'),3,4);g.drawImage(tn('#f3e2b4'),0,0);return RIT[ch]=new TH.CanvasTexture(c)}
function roofIcons(){for(const [k,x,top,z,w,D,rh,ya,px,pz] of RQ){const ch=RIC[k]||RIC.H,E=D+.55,L=Math.hypot(E,rh),al=Math.atan2(rh,E),s=Math.min(w*.5,L*.7,3.2),m=new TH.Mesh(new TH.PlaneGeometry(s,s),new TH.MeshLambertMaterial({map:roofTex(ch),transparent:true,opacity:.92,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2}));let X=x,Z=z+E*.5+Math.sin(al)*.06;if(ya){const a_=X-px,b_=Z-pz;X=px+a_*Math.cos(ya)+b_*Math.sin(ya);Z=pz-a_*Math.sin(ya)+b_*Math.cos(ya);m.rotation.order='YXZ';m.rotation.y=ya}m.position.set(X,top+rh*.5+Math.cos(al)*.06,Z);m.rotation.x=-(PI/2-al);villG.add(m)}}
function yq(a,px,pz,n){const c=Math.cos(a),s=Math.sin(a),rot=(q,i,j)=>{const dx=q[i]-px,dz=q[j]-pz;q[i]=px+dx*c+dz*s;q[j]=pz-dx*s+dz*c};
 for(let i=n[0];i<TQ.length;i++)rot(TQ[i],0,2);for(let i=n[1];i<SQ.length;i++)rot(SQ[i],0,2);for(let i=n[2];i<GQ.length;i++)rot(GQ[i],0,1);
 for(let i=n[3];i<CQ.length;i++){rot(CQ[i],0,1);CQ[i][4]=a}for(let i=n[4];i<RQ.length;i++)RQ[i].push(a,px,pz)}
function buildVillageMesh(){
 clearG(villG);TQ=[];SQ=[];GQ=[];RQ=[];CQ=[];const W=new TA(),vd=vdim(),{u}=vd;
 for(const [p,e,it] of u){if((DBG.c&&it.cn)||(DBG.q&&e===NE.C))continue;const k=NK[e]||'H',x=T.x+p[0],z=T.y+p[1],y0=H3(x,z),w=2*BHW(k)+(k==='A'?.8:0),d=k==='A'?6.6:5.4,tier=Math.max(0,tr(k)-(it.rb?1:0));
  const ya=BYAW(it),yp=z,yn=[TQ.length,SQ.length,GQ.length,CQ.length,RQ.length];W.yaw(ya,x,yp);
  const rc=(it.h&&it.h.o!=null&&(S.hero.find(q=>q.id===it.h.o)||{}).col)||'#8b4a3a';
  let f=1;if(it.cn)f=Math.max(0,bstg(it));
  const hh0=(BTOP[k]||6.7)*.5+tier*.45,roof=k==='H'?rc:ROOF[k]||'#8b4a3a';
  if(!DBG.b){if(it.cn&&f<=0)W.add('stone',box(w,.35,d),'#8f8a7d',x,y0+.18,z,{shade:0});
  else{const full=!it.cn||f>=.75;if(k==='M')stall(W,x,y0,z,w,d,roof);else{building(W,k,x,y0,z,w,d,it.cn?hh0*Math.max(.3,f):hh0,roof,tier,full)}}}
  if(!it.cn||f>=.75){if(k!=='M'){lamp(W,x-w/2-1.1,z+d/2+1.4);if(!DBG.d)vprops(W,k,x,z,w,d,it.i)}}
  if((it.cn||it.rb)&&!DBG.c){const sh=(BTOP[k]||6.7)*.85,hw=w/2+.7;for(const sx of[-1,1])for(const sz of[-1,1])W.add('wood',box(.28,sh,.28),'#9a7a4a',x+sx*hw,y0+sh/2,z+sz*(d/2+.7),{shade:0});
   for(let q=1;q<=3;q++)W.add('wood',box(w+1.6,.2,.28),'#b08850',x,y0+q*sh/3.4,z+d/2+.7,{shade:0})}
  W.yaw(0);if(ya)yq(ya,x,yp,yn)}
 if(!DBG.p&&S.pl.length>=4)wellV(W);if(!DBG.w&&S.pl.length>=8)wallV(W,vd,S.pl.length>=12);perimLamps(W,vd);if(DBG.d){RQ=[];CQ=[];SQ=[]}W.build(villG);csInst(villG,CQ,true,.5);roofIcons();if(torchG)torchSprites()}
// ---------- héros ----------
// v4.1.4 : cheval en pixel art (même échelle de pixel que les personnages). Vues : côté (tête à droite), face, dos ; image 0 = arrêt, 1 à 6 = galop
const HRW=96,HRH=72,HRG=70,HRS_=36,HRHIP=53,HRBOB=[0,0,2,3,2,0,-1],HRF=[];for(const v of['s','f','b'])for(let k=0;k<7;k++)HRF.push([v,k]);
function pxCanvas(W,H){const im=new Uint8ClampedArray(W*H*4),OUT=[30,20,38];
 const hex=c=>typeof c==='string'?[1,3,5].map(i=>parseInt(c.substr(i,2),16)):c,mx=(a,b,t)=>a.map((v,i)=>Math.round(v*(1-t)+b[i]*t));
 const set=(x,y,c)=>{if(x<0||y<0||x>=W||y>=H)return;const i=(y*W+x)*4;im[i]=c[0];im[i+1]=c[1];im[i+2]=c[2];im[i+3]=255};
 // forme remplie, ombrée en haut à gauche et en bas à droite, entourée d'un trait sombre
 const shape=(test,col,flat)=>{const c=hex(col),m=new Uint8Array(W*H);for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(test(x+.5,y+.5))m[y*W+x]=1;
  const g=(x,y)=>x>=0&&y>=0&&x<W&&y<H&&m[y*W+x];
  if(!flat)for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(!m[y*W+x]&&(g(x-1,y)||g(x+1,y)||g(x,y-1)||g(x,y+1)))set(x,y,OUT);
  for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(m[y*W+x])set(x,y,flat?c:!g(x-2,y-2)?mx(c,[255,244,214],.28):!g(x+2,y+2)?mx(c,[36,22,84],.36):c)};
 const E=(cx,cy,rx,ry,c,f)=>shape((x,y)=>((x-cx)/rx)**2+((y-cy)/ry)**2<=1,c,f);
 const P=(p,c,f)=>shape((x,y)=>{let r=false;for(let i=0,j=p.length-1;i<p.length;j=i++){const[a,b]=p[i],[d,e]=p[j];if((b>y)!==(e>y)&&x<(d-a)*(y-b)/(e-b)+a)r=!r}return r},c,f);
 const L=(p,w,c,f)=>shape((x,y)=>{for(let i=1;i<p.length;i++){const[a,b]=p[i-1],[d,e]=p[i],dx=d-a,dy=e-b,t=Math.max(0,Math.min(1,((x-a)*dx+(y-b)*dy)/(dx*dx+dy*dy||1)));if(Math.hypot(x-a-t*dx,y-b-t*dy)<=w/2)return true}return false},c,f);
 return{im,E,P,L,set,hex,mx}}
function pxHorse(view,k,coat){const p=pxCanvas(HRW,HRH),{E,P,L,hex,mx}=p,c=hex(coat),far=mx(c,[30,20,38],.34),mane=mx(c,[26,16,20],.58),hoof=[43,33,26],cloth='#8a2f2f',gold='#e2b43c',cx=48,b=-HRBOB[k],ph=k?(k-1)/6*6.2832:null;
 if(view==='s'){
  const leg=(hx,off,col,front)=>{let fx=hx+(front?1:-1),fy=HRG-2,kx=hx+(front?1:-3),ky=60+b/2;if(k){const s=Math.sin(ph+off),lift=Math.max(0,Math.cos(ph+off))*8;fx=hx+s*10;fy=HRG-2-lift;kx=hx+s*5+(front?2:-3)*(lift/8+.4);ky=60+b/2-lift*.45}
   L([[hx,49+b],[kx,ky],[fx,fy]],4.6,col);P([[fx-3,fy-1],[fx+3,fy-1],[fx+3,fy+2],[fx-3,fy+2]],hoof)};
  leg(34,2.5,far,false);leg(62,5.4,far,true);
  L([[28,40+b],[19,43+b],[k?10:17,k?46+b+Math.sin(ph)*3:58],[k?6:18,k?52+b:63]],6,mane);
  E(cx-1,45+b,21,10.5,c);E(32,43+b,10,9.5,c);E(62,45+b,9.5,10,c);
  leg(30,3.6,c,false);leg(65,.4,c,true);
  P([[58,38+b],[70,20+b],[78,19+b],[80,26+b],[72,44+b],[66,52+b]],c);
  P([[72,18+b],[80,17+b],[91,28+b],[91,33+b],[86,35+b],[76,28+b]],c);
  P([[73,19+b],[74,11+b],[78,17+b]],c);P([[86,30+b],[91,29+b],[91,33+b],[86,35+b]],mx(c,[30,20,38],.45),true);
  L([[75,17+b],[68,23+b],[63,32+b],[58,38+b]],5,mane);L([[76,18+b],[83,20+b]],3,mane,true);
  P([[80,22+b],[83,22+b],[83,25+b],[80,25+b]],[30,20,38],true);p.set(80,22+b,[255,255,255]);
  P([[37,36+b],[56,36+b],[57,47+b],[36,47+b]],cloth);L([[37,46+b],[56,46+b]],1.2,gold,true);E(47,35.5+b,8,2.6,'#5a3a1c');
  L([[53,47+b],[53,55+b]],1.4,[43,33,26],true);L([[83,31+b],[70,34+b],[55,34+b]],1,[70,46,26],true);
 }else{
  const back=view==='b',lift=i=>k?Math.max(0,Math.sin(ph+i*3.1416))*7:0;
  const leg=(x,i,col)=>{const l=lift(i);L([[x,50+b],[x+(x<cx?-1:1)*(l?1.5:0),60-l*.6],[x,HRG-2-l]],5,col);P([[x-3,HRG-3-l],[x+3,HRG-3-l],[x+3,HRG-l],[x-3,HRG-l]],hoof)};
  leg(cx-5,1,far);leg(cx+5,0,far);
  if(back){P([[cx-4,36+b],[cx-3,22+b],[cx+3,22+b],[cx+4,36+b]],far);P([[cx-5,24+b],[cx-6,16+b],[cx-1,21+b]],far);P([[cx+5,24+b],[cx+6,16+b],[cx+1,21+b]],far);L([[cx,23+b],[cx,36+b]],3,mane,true)}
  leg(cx-8,0,c);leg(cx+8,1,c);
  E(cx,45+b,11.5,11,c);
  if(back){E(cx-5,43+b,6.5,8,c);E(cx+5,43+b,6.5,8,c);P([[cx-9,35+b],[cx+9,35+b],[cx+11,41+b],[cx-11,41+b]],cloth);L([[cx-10,40+b],[cx+10,40+b]],1.2,gold,true);
   const sw=k?Math.sin(ph)*3:0;L([[cx,38+b],[cx+sw*.4,48+b],[cx+sw,59+b]],6,mane)}
  else{L([[cx-9,40+b],[cx,50+b],[cx+9,40+b]],2.4,cloth,true);E(cx,51+b,1.6,1.6,gold,true);
   P([[cx-6,43+b],[cx-5,32+b],[cx+5,32+b],[cx+6,43+b]],c);
   P([[cx-6,31+b],[cx-8,23+b],[cx-2,29+b]],c);P([[cx+6,31+b],[cx+8,23+b],[cx+2,29+b]],c);
   P([[cx-6,29+b],[cx+6,29+b],[cx+6,37+b],[cx+4,48+b],[cx-4,48+b],[cx-6,37+b]],c);E(cx,47+b,4.6,3.6,mx(c,[30,20,38],.4));
   P([[cx-1,31+b],[cx+1,31+b],[cx+1.5,43+b],[cx-1.5,43+b]],[238,232,220],true);L([[cx,28+b],[cx-2,33+b]],4,mane,true);
   for(const s of[-1,1]){P([[cx+s*4-1.5,34+b],[cx+s*4+1.5,34+b],[cx+s*4+1.5,37+b],[cx+s*4-1.5,37+b]],[30,20,38],true);p.set(cx+s*4-1,34+b,[255,255,255]);p.set(cx+s*2,47+b,[30,20,38])}}
 }
 return p.im}
function pxTex(cv,n){const t=new TH.CanvasTexture(cv);t.magFilter=t.minFilter=TH.NearestFilter;t.generateMipmaps=false;t.colorSpace=TH.SRGBColorSpace;t.repeat.set(1/n,1);return t}
function mkHorse(coat,pg){const z=pg?2:1,cv=document.createElement('canvas');cv.width=HRW*z*HRF.length;cv.height=HRH*z;const cx=cv.getContext('2d');
 HRF.forEach(([v,k],i)=>{const im=pxHorse(v,k,coat||'#8a5a3a');cx.putImageData(new ImageData(pg?pgScale2(im,HRW,HRH):im,HRW*z,HRH*z),i*HRW*z,0)});
 const tex=pxTex(cv,HRF.length),u=PXSZ/PXH,mat=new TH.MeshBasicMaterial({map:tex,alphaTest:.5,side:TH.DoubleSide});mat.userData.px=1;
 const mesh=new TH.Mesh(new TH.PlaneGeometry(HRW*u,HRH*u).translate(0,HRH*u/2-(HRH-HRG)*u,0),mat);mesh.castShadow=true;
 const g=new TH.Group(),rot=new TH.Group(),piv=new TH.Group();piv.add(mesh);rot.add(piv);g.add(rot);g.add(csChar(2.3));g.userData={rot,piv,tex,mat};return g}
// cavalier : mêmes images que l'aventurier, coupées à la taille, avec les jambes pliées le long du cheval
function rideTex(src){const n=PXF.length,cv=document.createElement('canvas');cv.width=src.width;cv.height=src.height;const x=cv.getContext('2d');x.drawImage(src,0,0);
 const d0=src.getContext('2d').getImageData(0,0,PXW,PXH).data,pick=(px,py,def)=>{for(const[dx,dy]of[[0,0],[1,0],[-1,0],[0,1],[0,-1],[2,0],[-2,0]]){const i=((py+dy)*PXW+px+dx)*4;if(d0[i+3]>127&&d0[i]+d0[i+1]+d0[i+2]>110)return[d0[i],d0[i+1],d0[i+2]]}return def},pant=pick(20,58,[80,64,50]),boot=pick(20,66,[60,40,30]);
 PXF.forEach(([v,fr],i)=>{x.clearRect(i*PXW,HRHIP+2,PXW,PXH-HRHIP-2);const p=pxCanvas(PXW,PXH);
  for(const s of v==='s'?[1]:[-1,1]){const knee=v==='s'?[31,58]:[24+s*13,58],foot=v==='s'?[28,66]:[24+s*13,66],hip=v==='s'?[23,54]:[24+s*5,54];
   p.L([hip,knee],5.4,pant);p.L([knee,foot],4.6,pant);p.L([[foot[0],foot[1]-3],[foot[0],foot[1]],[foot[0]+(v==='s'?4:s),foot[1]]],4.4,boot)}
  const t=document.createElement('canvas');t.width=PXW;t.height=PXH;t.getContext('2d').putImageData(new ImageData(p.im,PXW,PXH),0,0);x.drawImage(t,i*PXW,0)});
 return pxTex(cv,n)}
// en selle sauf pendant le combat et la fouille ; RDY : hauteur gagnée en selle (unités du personnage)
const ride=h=>!!h.hs&&h.st!=='fight'&&h.st!=='loot',RDY=()=>(HRS_-(HRG-HRHIP))*PXSZ/PXH;
// place le cheval et le cavalier ; à pied, le cheval attend derrière l'aventurier, à l'opposé du monstre
function horseUpd(o,h,mv,x,y,z){const hr_=o.hor,d=hr_.userData,u=o.m.userData,az=K.az||0,on=ride(h);
 let ang=o.ry,dx=0,dy=0,dz=0;if(!on){const wx=x-HS*1.9,wz=z-HS*.5,c=Math.cos(o.ry),sn=Math.sin(o.ry),lx=(wx-x)/HS,lz=(wz-z)/HS;dx=lx*c-lz*sn;dz=lx*sn+lz*c;dy=(HC(wx,wz)-y)/HS;ang=PI/2}
 hr_.position.set(dx,dy,dz);d.rot.rotation.y=az-o.ry;
 const rel=ang-az,fx=Math.sin(rel),fz=Math.cos(rel),side=Math.abs(fx)>.78,view=side?0:fz<-.35?2:1,k=on&&mv?1+(Math.floor(o.ph*10/(2*PI)*6)%6+6)%6:0;
 d.tex.offset.x=(view*7+k)/HRF.length;const lean=-Math.atan2(cam3.position.y,Math.hypot(cam3.position.x-K.tx,cam3.position.z-K.tz))*.75;d.piv.rotation.x=lean;d.piv.scale.x=side&&fx<0?-1:1;d.mat.color.copy(u.mat.color);
 const want=on?o.rtex:o.act!=null?u.atx:u.tex;if(u.mat.map!==want){u.mat.map=want;u.mat.needsUpdate=true}
 if(on){const f=side?23:view===2?3:0,ff=o.bl?(view===2?8:7):f;o.rtex.offset.x=ff/PXF.length;u.piv.scale.x=side&&fx<0?-1:1;u.piv.scale.y=1;u.piv.rotation.z=0;u.piv.rotation.x=lean;
  // le cavalier suit l'inclinaison du cheval ; devant lui de profil, derrière l'encolure ou la croupe de face et de dos
  const h_=RDY()+HRBOB[k]*PXSZ/PXH,a=-lean,e=(u.pg?view!==1:side)?.04:-.04;u.piv.position.set(0,h_*Math.cos(a)+e*Math.sin(a),-h_*Math.sin(a)+e*Math.cos(a))}
 else u.piv.position.set(0,0,0)}
// ===== v3.4.7 : sprites pixel-art HD-2D des aventuriers (générés sur canevas) =====
// ===== v3.5.7 : armes par paliers (14), matières et formes =====
const WPM=[
 {m:[196,116,64],l:[232,160,104],d:[128,70,40],t:[150,90,50],g:[255,120,80]},
 {m:[186,142,62],l:[226,190,102],d:[120,86,34],t:[200,160,70],g:[255,200,90]},
 {m:[196,204,216],l:[240,246,255],d:[120,130,150],t:[160,168,184],g:[120,180,255]},
 {m:[228,234,244],l:[255,255,255],d:[150,160,180],t:[210,220,236],g:[170,220,255]},
 {m:[86,90,104],l:[150,156,176],d:[40,42,54],t:[110,116,132],g:[255,90,70]},
 {m:[150,220,232],l:[220,255,255],d:[70,140,170],t:[190,240,250],g:[90,240,255]},
 {m:[255,210,74],l:[255,244,170],d:[176,128,24],t:[255,226,120],g:[255,90,110]},
 {m:[52,40,72],l:[140,110,190],d:[24,16,36],t:[90,70,130],g:[190,110,255]},
 {m:[200,52,62],l:[255,140,130],d:[110,20,34],t:[230,90,90],g:[255,220,120]},
 {m:[76,196,130],l:[190,255,220],d:[30,110,76],t:[120,220,160],g:[255,240,150]},
 {m:[170,226,255],l:[240,252,255],d:[90,150,210],t:[210,240,255],g:[255,255,255]},
 {m:[232,224,196],l:[255,252,236],d:[150,136,104],t:[200,190,160],g:[120,230,200]},
 {m:[255,154,58],l:[255,236,150],d:[150,70,20],t:[255,200,80],g:[120,200,255]},
 {m:[246,236,255],l:[255,255,255],d:[150,130,200],t:[255,216,120],g:[255,230,120]}];
const WSW=[['str',24,3,'bar','ball'],['leaf',26,5,'bar','ball'],['str',30,4,'cross','disc'],['str',31,3,'ring','ball'],['str',30,6,'cross','disc'],['leaf',33,5,'wing','gem'],['curve',30,4,'cross','ball'],['jag',31,5,'spike','spike'],['wave',33,4,'cross','ball'],['curve',34,3,'bar','ball'],['crys',32,5,'wing','gem'],['jag',31,5,'bone','skull'],['zig',33,4,'wing','gem'],['str',36,6,'star','gem']];
const WSD=[['str',12,3],['leaf',13,4],['str',14,3],['curve',13,3],['jag',13,4],['leaf',15,4],['wave',14,3],['curve',15,3],['jag',14,4],['str',16,3],['crys',14,4],['jag',14,4],['zig',15,3],['str',17,4]];
const WSS=['knob','fork','crescent','ring','crook','crystal','sun','claw','flame','branch','prism','skull','bolt','star'];
const WSB=[[18,5,'none',2,0],[22,4,'none',2,0],[18,6,'flare',2,0],[19,6,'cap',2,1],[18,7,'horn',3,0],[22,5,'leaf',2,0],[19,6,'cap',2,1],[20,7,'spike',2,0],[20,6,'flare',2,1],[21,5,'curl',2,1],[20,6,'cap',2,1],[20,6,'bone',3,1],[20,6,'zig',2,1],[22,7,'star',2,1]];
const THP=[{m:[150,205,245],l:[235,250,255],d:[60,110,170],t:[200,235,255],g:[140,230,255]},{m:[70,76,120],l:[255,236,110],d:[30,32,64],t:[150,160,210],g:[255,240,90]},{m:[60,36,32],l:[255,150,40],d:[24,12,10],t:[120,70,50],g:[255,110,20]},{m:[160,90,220],l:[235,200,255],d:[80,36,130],t:[200,150,250],g:[255,140,240]},{m:[226,220,196],l:[255,252,232],d:[130,122,96],t:[190,184,150],g:[130,255,190]},{m:[86,140,60],l:[190,240,120],d:[44,76,34],t:[140,190,90],g:[255,150,190]},{m:[28,36,92],l:[150,170,255],d:[12,16,52],t:[255,214,100],g:[255,244,170]},{m:[235,250,255],l:[255,255,255],d:[70,100,150],t:[190,215,240],g:[0,235,255]},{m:[28,22,34],l:[220,30,40],d:[10,8,14],t:[70,24,36],g:[255,50,40]},{m:[255,248,220],l:[255,255,255],d:[210,170,80],t:[255,220,110],g:[255,240,170]}];
const THL=[[1,2],[3,4],[5,6,7],[8,9,10]],THB=['crys','zig','jag','crys','curve','leaf','leaf','str','jag','wave'],THS=['crystal','bolt','flame','prism','skull','branch','star','crystal','claw','sun'];
const thFor=(t,id)=>{t=Math.min(14,t|0);if(t<11)return 0;const L=THL[t-11];return L[(id|0)%L.length]};
const ARD=[{p:0,c:0,e:0,k:0,s:0},{p:1,c:0,e:0,k:0,s:1},{p:1,c:1,e:0,k:1,s:1},{p:5,c:1,e:1,k:1,s:2},{p:2,c:1,e:0,k:2,s:2},{p:3,c:2,e:1,k:2,s:3},{p:4,c:2,e:1,k:2,s:3},{p:2,c:3,e:0,k:2,s:4},{p:5,c:3,e:1,k:3,s:4},{p:3,c:2,e:1,k:3,s:3},{p:1,c:3,e:1,k:3,s:5},{p:2,c:3,e:0,k:3,s:4},{p:5,c:3,e:1,k:3,s:5},{p:3,c:3,e:1,k:4,s:5}];
const BOD=[[5,0,0,0,0,0],[6,1,0,0,0,0],[6,1,1,1,0,0],[7,1,0,2,0,0],[8,1,1,1,0,0],[7,1,0,2,0,0],[8,1,1,2,0,0],[8,0,1,1,0,1],[9,1,1,1,0,1],[8,1,0,2,0,0],[9,1,1,2,0,0],[9,1,1,1,0,1],[8,1,0,2,1,0],[9,1,1,2,1,0]];
const SHD=[[0,0,0,0],[1,1,1,0],[3,1,0,1],[3,1,1,2],[4,1,0,3],[2,1,1,1],[1,1,1,4],[6,0,1,0],[5,1,0,5],[2,1,1,3],[5,1,1,4],[4,0,1,2],[6,1,1,5],[2,1,1,4]];
const PXW=48,PXH=72,PXO=8,PXF=[['f','idle'],['f','w0'],['f','w1'],['b','idle'],['b','w0'],['b','w1'],['f','atk'],['f','bld'],['b','bld'],['f','a1'],['f','a2'],['f','a3'],['f','vc'],['f','ci'],['f','sp'],['f','w2'],['f','w3'],['f','w4'],['f','w5'],['b','w2'],['b','w3'],['b','w4'],['b','w5'],['s','w0'],['s','w1'],['s','w2'],['s','w3'],['s','w4'],['s','w5']],WKF=[1,2,15,16,17,18],WKB=[4,5,19,20,21,22],WKS=[23,24,25,26,27,28];
const NPXF=[['f','idle'],['f','g0'],['f','g1'],['b','idle'],['b','g0'],['b','g1'],['f','r0'],['f','r1'],['f','act'],['b','act']];for(const v of['f','b','s'])for(let k=0;k<6;k++)NPXF.push([v,'w'+k]);
// v4.0.0 : postures [al,ar,PX,PY,PA] (bras gauche/droit, décalage de l'arme, angle) : [attente en combat, pose de sort]
const PZ={G:[[-1,-6,0,-6,.5],[-2,-14,0,-14,.12]],Pa:[[-2,-4,0,-4,.2],[-6,-12,0,-12,0]],V:[[-4,-4,0,-4,.5],[-10,-10,2,-10,-.3]],As:[[-3,-3,0,-3,.3],[-12,-12,2,-12,-.4]],M:[[-2,-8,0,0,0],[-3,-14,0,0,0]],Ne:[[-2,-7,0,0,0],[-12,-12,0,0,0]],R:[[-3,-5,0,-3,0],[-6,-13,0,-6,0]],Ch:[[-2,-5,0,-2,0],[-5,-12,0,-5,0]]};
function pxSprite(cls,fem,view,fr,o){
 let W=o.W||PXW,H=o.H||PXH,OY=o.OY!=null?o.OY:PXO,XO=o.XO||0,im=new Uint8ClampedArray(W*H*4),back=view==='b';
 const hx=c=>{c=c.replace('#','');return[parseInt(c.slice(0,2),16),parseInt(c.slice(2,4),16),parseInt(c.slice(4,6),16)]},rgb=c=>typeof c==='string'?hx(c):c,
  mx=(a,b,t)=>a.map((v,i)=>Math.round(v*(1-t)+b[i]*t)),Li=c=>mx(c,[255,244,214],.3),Da=c=>mx(c,[36,22,84],.38),OUT=[30,20,38],
  TN=(c,t)=>o.col?mx(rgb(c),rgb(o.col),t):rgb(c),SK=[246,202,162],hc=rgb(o.hair),ec=rgb(o.eye);
 const R=(...a)=>['r',...a],E=(...a)=>['e',...a],P=p=>['p',p],L=(p,w)=>['l',p,w||1];
 const ln=(m,x0,y0,x1,y1,w)=>{const n=Math.ceil(Math.max(Math.abs(x1-x0),Math.abs(y1-y0))*2)||1;for(let i=0;i<=n;i++){const px=x0+(x1-x0)*i/n,py=y0+(y1-y0)*i/n,sx=Math.round(px-(w-1)/2),sy=Math.round(py-(w-1)/2);for(let yy=0;yy<w;yy++)for(let xx=0;xx<w;xx++){const X=sx+xx,Y=sy+yy;if(X>=0&&X<W&&Y>=0&&Y<H)m[Y*W+X]=1}}};
 const mask=sh=>{const m=new Uint8Array(W*H);for(const a of sh){const k=a[0];
  if(k==='r'){for(let y=a[2]+OY;y<a[4]+OY;y++)for(let x=a[1]+XO;x<a[3]+XO;x++)if(x>=0&&x<W&&y>=0&&y<H)m[y*W+x]=1}
  else if(k==='e'){const cx=(a[1]+a[3])/2+XO,cy=(a[2]+a[4])/2+OY,rx=(a[3]-a[1])/2,ry=(a[4]-a[2])/2;for(let y=Math.floor(cy-ry);y<=Math.ceil(cy+ry);y++)for(let x=Math.floor(cx-rx);x<=Math.ceil(cx+rx);x++)if(x>=0&&x<W&&y>=0&&y<H&&((x+.5-cx)/rx)**2+((y+.5-cy)/ry)**2<=1)m[y*W+x]=1}
  else if(k==='p'){const p=a[1].map(([x,y])=>[x+XO,y+OY]);let y0=1e9,y1=-1e9,x0=1e9,x1=-1e9;for(const[x,y]of p){y0=Math.min(y0,y);y1=Math.max(y1,y);x0=Math.min(x0,x);x1=Math.max(x1,x)}
   for(let y=Math.floor(y0);y<=y1;y++)for(let x=Math.floor(x0);x<=x1;x++){if(x<0||x>=W||y<0||y>=H)continue;const px=x+.5,py=y+.5;let c=false;for(let i=0,j=p.length-1;i<p.length;j=i++){const[xi,yi]=p[i],[xj,yj]=p[j];if((yi>py)!==(yj>py)&&px<(xj-xi)*(py-yi)/(yj-yi)+xi)c=!c}if(c)m[y*W+x]=1}
   for(let i=0;i<p.length;i++){const q=p[(i+1)%p.length];ln(m,p[i][0],p[i][1],q[0],q[1],1)}}
  else if(k==='l'){const p=a[1],w=a[2];for(let i=0;i<p.length-1;i++)ln(m,p[i][0]+XO,p[i][1]+OY,p[i+1][0]+XO,p[i+1][1]+OY,w)}}return m};
 const put=(m,c)=>{for(let i=0;i<W*H;i++)if(m[i]){im[i*4]=c[0];im[i*4+1]=c[1];im[i*4+2]=c[2];im[i*4+3]=255}};
 const part=(sh,col,tri)=>{const c=rgb(col),m=mask(sh);if(tri===false){put(m,c);return}
  let x0=99,x1=-1,y0=99,y1=-1;for(let i=0;i<W*H;i++)if(m[i]){const x=i%W,y=(i/W)|0;x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y)}if(x1<0)return;
  const k=Math.min(x1-x0+1,y1-y0+1)>=8?2:1,hi=new Uint8Array(W*H),sd=new Uint8Array(W*H),g=(x,y)=>x>=0&&y>=0&&x<W&&y<H?m[y*W+x]:0;
  for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(m[y*W+x]){if(!g(x-k,y-k))hi[y*W+x]=1;else if(!g(x+k,y+k))sd[y*W+x]=1}
  put(m,c);put(hi,Li(c));put(sd,Da(c))};
 const flat=(sh,c)=>part(sh,c,false);
 const face=()=>{part([E(15,11,33,31)],SK);
  for(const[x0,x1]of[[17,22],[26,31]]){flat([R(x0,19,x1,21)],OUT);part([R(x0+1,fem?20:21,x1-1,26)],ec);flat([R(x0+1,22,x1-1,25)],ec);flat([R(x0+1,24,x1-1,26)],Li(ec));flat([R(x0+2,22,x0+3,24)],[30,24,50]);flat([R(x0+1,fem?20:21,x0+2,22)],[255,255,255])}
  if(fem)flat([R(16,19,17,21),R(31,19,32,21)],OUT);
  flat([R(16,26,19,28),R(29,26,32,28)],[244,150,140]);flat([R(23,28,25,29)],fem?[214,86,110]:[170,85,85])};
 const HST=fem?[
  {b:[P([[11,14],[14,9],[34,9],[37,14],[41,52],[7,52]])],k:[P([[10,14],[38,14],[42,56],[6,56]])],f:[P([[13,19],[13,10],[19,6],[29,6],[35,10],[35,19]])],l:[R(11,13,16,46),R(32,13,37,46)],a:[L([[24,6],[21,1],[25,-3]],2)]},
  {b:[P([[32,6],[42,0],[47,12],[46,34],[41,54],[39,34],[39,20],[34,16]])],k:[P([[21,8],[27,8],[31,30],[29,58],[24,62],[19,58],[17,30]])],f:[P([[14,19],[13,10],[18,6],[30,6],[35,10],[34,19],[30,14],[26,18],[22,13],[18,18]])],l:[R(12,13,16,30),R(32,13,36,28)],x:()=>flat([R(33,8,38,11)],[240,90,120])},
  {b:[P([[11,8],[3,12],[1,34],[3,56],[9,42],[12,22]]),P([[37,8],[45,12],[47,34],[45,56],[39,42],[36,22]])],f:[P([[14,19],[13,10],[18,6],[30,6],[35,10],[34,19],[29,14],[24,19],[19,14]])],l:[R(12,13,15,30),R(33,13,36,30)],x:()=>flat([R(9,7,14,12),R(34,7,39,12)],[240,90,120])},
  {b:[P([[11,14],[14,9],[34,9],[37,14],[38,30],[10,30]])],k:[P([[11,14],[37,14],[37,34],[11,34]])],f:[P([[14,19],[13,10],[18,6],[30,6],[35,10],[34,17],[27,12],[20,13],[16,21]])],l:[R(12,13,16,30)],a:[L([[24,6],[27,1],[23,-3]],2)],x:()=>{for(const y of[25,32,39,46,53])part([E(32,y,39,y+8)],hc);flat([R(31,59,39,61)],[240,90,120])},kx:()=>{for(const y of[26,33,40,47,54])part([E(20,y,28,y+8)],hc);flat([R(19,60,29,62)],[240,90,120])}},
  {t:[E(7,1,19,13),E(29,1,41,13)],b:[P([[11,14],[14,9],[34,9],[37,14],[40,46],[8,46]])],k:[P([[10,14],[38,14],[41,50],[7,50]])],f:[P([[14,19],[13,10],[18,6],[30,6],[35,10],[34,19],[29,13],[24,18],[19,13]])],l:[R(12,13,15,44),R(33,13,36,44)]}
 ]:[
  {t:[P([[12,16],[8,6],[15,9],[16,-2],[22,6],[26,-5],[30,6],[36,-2],[36,9],[42,6],[36,17]])],f:[P([[14,19],[13,11],[18,7],[24,5],[30,7],[35,11],[34,19],[31,13],[28,19],[25,12],[22,19],[19,13],[17,19]])],l:[R(12,13,15,24),R(33,13,36,24)]},
  {f:[P([[14,17],[13,10],[18,6],[24,5],[30,6],[35,10],[34,17],[30,12],[27,17],[24,11],[21,17],[18,12]])],l:[P([[12,12],[15,12],[16,34],[12,30]]),P([[36,12],[33,12],[32,34],[36,30]])],a:[L([[24,6],[22,1],[26,-3],[23,-7]],2)]},
  {b:[P([[12,12],[2,9],[11,17]]),P([[12,19],[1,22],[12,25]]),P([[36,12],[46,9],[37,17]]),P([[36,19],[47,22],[36,25]])],t:[P([[14,8],[24,-3],[34,8]])],f:[P([[14,18],[13,11],[19,6],[26,6],[35,11],[34,18],[30,12],[26,16],[22,12],[18,18]])],l:[R(12,13,15,22),R(33,13,36,22)]},
  {f:[P([[12,24],[11,10],[18,5],[27,5],[36,10],[35,16],[29,12],[22,13],[18,18],[16,30],[13,28]])],l:[R(33,13,36,22)]},
  {t:[P([[12,16],[12,6],[17,-2],[27,-6],[39,-3],[41,2],[35,4],[37,10]])],f:[P([[14,18],[14,11],[24,8],[34,11],[34,18],[28,13],[22,14]])],l:[R(12,13,15,22),R(33,13,36,22)]}
 ],HS_=HST[(((o.hs|0)%5)+5)%5];
 const hrB=h=>{part([E(12,6,36,30)],hc);if(HS_.b)part(HS_.b,hc);if(!h&&HS_.t)part(HS_.t,hc)};
 const hrK=h=>{part([E(12,6,36,30)],hc);const k=HS_.k||HS_.b;if(k)part(k,hc);if(!h&&HS_.t)part(HS_.t,hc);if(HS_.kx)HS_.kx()};
 const hrF=m=>{if(HS_.l)part(HS_.l,hc);if(m!==1&&HS_.f)part(HS_.f,hc);if(!m&&HS_.a)flat(HS_.a,hc);if(HS_.x)HS_.x()};
 const legs=(pant,boot,cuff,lf,rf,y0)=>{y0=y0||45;for(const[x0,x1,l]of[[18,23,lf],[25,30,rf]]){part([R(x0,y0,x1,58-l)],pant);part([R(x0-1,56-l,x1+1,62-l)],boot);if(cuff)flat([R(x0-1,56-l,x1+1,57-l)],cuff)}if(BO)wbt(lf,rf)};
 const arm=(side,dy,sl,cuff,hand)=>{const x0=side<0?12:31;part([R(x0,32+dy,x0+5,43+dy)],sl);if(cuff)flat([R(x0,40+dy,x0+5,43+dy)],cuff);if(hand)part([E(x0,42+dy,x0+5,47+dy)],SK)};
 let lf=0,rf=0,al=0,ar=0,PX=0,PY=0,PA=0;const wk=/^w\d$/.test(fr)?+fr[1]:-1,ci=fr==='ci',spz=fr==='sp',sft=(dx,dy)=>{XO+=dx;OY+=dy};
 if(wk>=0){lf=[1,3,1,0,0,0][wk];rf=[0,0,0,1,3,1][wk];al=[1,2,1,-1,-2,-1][wk];ar=-al}
 if((ci||spz)&&PZ[cls]){[al,ar,PX,PY,PA]=PZ[cls][ci?0:1]}
 const atk=fr==='atk',bld=fr==='bld',ax1=fr==='a1',ax2=fr==='a2',ax3=fr==='a3',GD=[232,191,80],WH=[238,234,252],BL=[232,238,248];
 const WK=Math.max(0,Math.min(14,o.wt|0)),WMt=WK?(o.wth?THP[o.wth-1]:WPM[WK-1]):null,hc2=o.col?rgb(o.col):[190,50,60],bhh=WK?WSB[WK-1][0]:18;
 const wtr=(ox,oy,a)=>{const c=Math.cos(a),s=Math.sin(a);return p=>[ox+p[0]*c-p[1]*s,oy+p[0]*s+p[1]*c]};
 const wq=(T,x0,y0,x1,y1,c)=>part([P([[x0,y0],[x1,y0],[x1,y1],[x0,y1]].map(T))],c),wp=(T,pts,c)=>part([P(pts.map(T))],c),wl=(T,pts,w)=>L(pts.map(T),w);
 const wo=(T,cx,cy,r,c)=>{const q=[];for(let i=0;i<8;i++){const a=i/8*6.2832;q.push([cx+Math.cos(a)*r,cy+Math.sin(a)*r])}part([P(q.map(T))],c)};
 const wbl=(sp,ls)=>{const ty=sp[0],len=sp[1]*ls,w=sp[2],N=10,A=[],B=[];for(let i=0;i<=N;i++){const t=i/N;let hw=w/2,of=0;
   if(ty==='leaf')hw=w/2*(.55+.6*Math.sin(Math.PI*t));
   if(ty==='curve')of=3.5*t*t;
   if(ty==='wave')of=Math.sin(t*9.4)*1.3;
   if(ty==='zig')of=(i%2?1:-1)*2*(1-t*.5);
   if(ty==='jag')hw=w/2+(i%2&&i>1&&i<N?1.3:0);
   hw*=ty==='crys'?(t>.6?.4+.6*(1-t)/.4:1):(t>.86?Math.max(.12,(1-t)/.14):1);
   A.push([of-hw,-t*len]);B.push([of+hw,-t*len])}
  const poly=A.concat(B.slice().reverse()),mid=A.map((p,i)=>[(p[0]+B[i][0])/2,p[1]]);return{poly,mid}};
 const wpn=(ox,oy,a,ls,d)=>{const T=wtr(ox,oy,a),sp=(d?WSD:WSW)[WK-1].slice(),cs=WMt;if(o.wth){sp[0]=THB[o.wth-1];if(o.wth===8)sp[1]+=4}const bl=wbl(sp,ls);
  wq(T,-1,0,1,d?4:6,[96,64,40]);for(let i=0;i<(d?1:3);i++)flat([wl(T,[[-1,1+i*2],[1,2+i*2]],1)],hc2);
  const pm=d?'ball':sp[4],py=d?5:7;
  if(pm==='ball')wo(T,0,py,1.8,cs.t);else if(pm==='disc')wq(T,-2.5,py-1,2.5,py+1,cs.t);else if(pm==='gem')wo(T,0,py,2,hc2);else if(pm==='spike')wp(T,[[-1.5,py-1],[1.5,py-1],[0,py+3]],cs.t);else if(pm==='skull'){wo(T,0,py,2.2,cs.m);flat([wl(T,[[-1,py],[-1,py+.5]]),wl(T,[[1,py],[1,py+.5]])],cs.d)}
  if(o.wth===8){part([P(wbl([sp[0],sp[1]+2,sp[2]+4],ls).poly.map(T))],cs.g);flat([wl(T,[[0,-sp[1]*ls-4],[0,-sp[1]*ls-7]])],cs.g)}
  part([P(bl.poly.map(T))],cs.m);flat([wl(T,bl.mid.slice(1,-2))],cs.l);
  const gd=d?'bar':sp[3];
  if(gd==='bar')wq(T,d?-3.5:-5,-1,d?3.5:5,1,cs.t);
  else if(gd==='cross'){wq(T,-6,-1,6,1,cs.t);wq(T,-6.5,-2,-5,2,cs.t);wq(T,5,-2,6.5,2,cs.t);wo(T,0,0,1,cs.g)}
  else if(gd==='ring'){wq(T,-5,-1,5,1,cs.t);flat([wl(T,[[-5,1],[-4,5],[0,6],[4,5],[5,1]])],cs.t)}
  else if(gd==='wing'){wp(T,[[-2,0],[-8,-3],[-9,1],[-5,2],[-2,2]],cs.t);wp(T,[[2,0],[8,-3],[9,1],[5,2],[2,2]],cs.t);wo(T,0,0,1.2,cs.g)}
  else if(gd==='spike'){wq(T,-5,-1,5,1,cs.t);wp(T,[[-5,1],[-6,4],[-3,1]],cs.t);wp(T,[[5,1],[6,4],[3,1]],cs.t)}
  else if(gd==='bone'){wq(T,-5,-1,5,1,cs.m);wo(T,-5.5,0,1.5,cs.m);wo(T,5.5,0,1.5,cs.m)}
  else if(gd==='star'){wq(T,-4,-1,4,1,cs.t);wp(T,[[0,-3],[4,0],[0,3],[-4,0]],cs.t);wo(T,0,0,1.3,cs.g)}
  if(o.wth)thW(T,bl,d)};
 const wst=()=>{const cs=WMt,T=wtr(6.5,14,0),ty=o.wth?THS[o.wth-1]:WSS[WK-1],pole=mx([122,82,48],cs.d,.35);
  part([R(5,14,8,64)],pole);flat([R(4,15,9,17)],cs.t);flat([R(5,18,8,20)],hc2);
  if(ty==='knob'){wq(T,-2.5,-2,2.5,0,cs.t);wo(T,0,-5.5,3.5,cs.g);flat([wl(T,[[-1,-7],[0,-8]])],[255,255,255])}
  else if(ty==='fork'){wp(T,[[-2,0],[-5,-8],[-4,-10],[-1,-4]],cs.t);wp(T,[[2,0],[5,-8],[4,-10],[1,-4]],cs.t);wo(T,0,-8,2.5,cs.g)}
  else if(ty==='crescent'){wp(T,[[-1,0],[-6,-4],[-6,-9],[-2,-12],[1,-12],[-3,-9],[-3,-5],[1,-3]],cs.m);wo(T,1,-7,1.6,cs.g)}
  else if(ty==='ring'){const q=[];for(let i=0;i<=8;i++){const a=i/8*6.2832;q.push([Math.cos(a)*4,-8+Math.sin(a)*4])}flat([wl(T,q,2)],cs.t);wo(T,0,-8,1.5,cs.g)}
  else if(ty==='crook'){flat([wl(T,[[0,0],[0,-8],[3,-12],[6,-9],[5,-6]],2)],cs.t);wo(T,5,-6,1.5,cs.g)}
  else if(ty==='crystal'){wp(T,[[0,-15],[4,-8],[0,0],[-4,-8]],cs.g);flat([wl(T,[[0,-14],[-2,-8]])],[255,255,255])}
  else if(ty==='sun'){wo(T,0,-8,3.5,cs.g);flat([wl(T,[[0,-13],[0,-16]]),wl(T,[[-5,-8],[-8,-8]]),wl(T,[[5,-8],[8,-8]]),wl(T,[[-4,-12],[-6,-14]]),wl(T,[[4,-12],[6,-14]])],cs.t)}
  else if(ty==='claw'){wp(T,[[-1,0],[-5,-6],[-4,-11],[-2,-6]],cs.t);wp(T,[[1,0],[5,-6],[4,-11],[2,-6]],cs.t);wp(T,[[-1,0],[0,-12],[1,0]],cs.t);wo(T,0,-7,2.2,cs.g)}
  else if(ty==='flame'){wp(T,[[0,0],[-4,-4],[-3,-9],[0,-15],[1,-9],[4,-5]],cs.g);flat([P([[0,-2],[-2,-5],[0,-10],[2,-5]].map(T))],cs.l)}
  else if(ty==='branch'){flat([wl(T,[[0,0],[0,-10]],2),wl(T,[[0,-5],[-4,-9]]),wl(T,[[0,-7],[4,-12]])],pole);wo(T,-4,-9,1.7,cs.m);wo(T,4,-12,1.7,cs.m);wo(T,0,-11,1.7,cs.g)}
  else if(ty==='prism'){[[0,cs.g],[-5,cs.l],[-10,cs.m]].forEach(([y,c])=>wp(T,[[0,y-6],[2.5,y-3],[0,y],[-2.5,y-3]],c))}
  else if(ty==='skull'){wo(T,0,-8,3.5,cs.m);wq(T,-2,-5,2,-3,cs.m);wo(T,-1.5,-8.5,.9,cs.d);wo(T,1.5,-8.5,.9,cs.d)}
  else if(ty==='bolt')wp(T,[[0,0],[-3,-5],[0,-6],[-3,-13],[4,-7],[1,-6],[4,-2]],cs.g);
  else if(ty==='star'){const q=[];for(let i=0;i<10;i++){const a=i/10*6.2832-1.5708,r=i%2?2:5;q.push([Math.cos(a)*r,-8+Math.sin(a)*r])}wp(T,q,cs.g);flat([P([[-1,-9],[1,-9],[1,-7],[-1,-7]].map(T))],[255,255,255])}
  if(o.wth)thS(T)};
 const wbw=()=>{const cs=WMt,sp=WSB[WK-1],c=sp[1],tp=o.wth===9?'horn':sp[2],pts=[],lc=mx([138,90,42],cs.m,Math.min(.85,WK*.09)),ID=p=>p;
  for(let i=0;i<=8;i++){const s=i/8;let x=10-c*Math.sin(Math.PI*s),y=36-bhh+2*bhh*s;if(tp==='zig'&&i%2)x+=1.5;if(tp==='flare'||tp==='curl'||tp==='leaf')if(s<.15||s>.85)x+=(tp==='leaf'?-1.5:2.5)*(s<.15?(.15-s)/.15:(s-.85)/.15);pts.push([x,y])}
  part([L(pts,sp[3])],lc);
  const tips=[[10,36-bhh],[10,36+bhh]];
  if(tp==='cap'||tp==='bone')tips.forEach(q=>wo(ID,q[0],q[1],1.5,cs.t));
  if(tp==='spike'||tp==='horn')flat([L([[10,36-bhh],[11,34-bhh]]),L([[10,36+bhh],[11,38+bhh]])],cs.t);
  if(tp==='star')flat([R(9,33-bhh,12,36-bhh),R(10,32-bhh,11,37-bhh)],cs.g);
  const bx=Math.round(10-c);flat([R(bx-1,34,bx+2,38)],hc2);if(sp[4])flat([R(bx,32,bx+1,34)],cs.g);if(o.wth)thB(c)};
 const wic=()=>{const c=o.wc;if(c==='G')wpn(12,40,0,1);else if(c==='V')wpn(12,34,.35,1,1);else if(c==='M')wst();else if(c==='R'){wbw();flat([L([[10,36-bhh],[10,36+bhh]])],[245,245,235])}};
 const AR=Math.max(0,Math.min(14,o.at|0)),BO=Math.max(0,Math.min(14,o.bt|0)),SHT=Math.max(0,Math.min(14,o.sh|0)),ID0=p=>p,cpA=AR?(o.ath?THP[o.ath-1]:WPM[AR-1]):null,cpB=BO?(o.bth?THP[o.bth-1]:WPM[BO-1]):null,cpS=SHT?(o.sth?THP[o.sth-1]:WPM[SHT-1]):null;
 const lthr=b=>AR?mx(b,cpA.m,Math.min(.85,.2+.05*AR)):b;
 const VP=[[17,30],[31,30],[32,47],[16,47]],RP=[[17,30],[31,30],[32,50],[29,48],[26,50],[23,48],[20,50],[16,50]],MPo=[[16,30],[32,30],[36,61],[12,61]];
 const wbd=(poly,x0,y0,x1,y1,base,rb)=>{const cs=cpA,d=ARD[AR-1],cx=(x0+x1)>>1,h=y1-y0,dk=cs.d,tm=cs.t,gg=cs.g;
  part([P(poly)],base);
  if(d.p===1)flat([L([[cx,y0+1],[cx,y1-1]]),L([[x0+2,y0+Math.round(h*.4)],[x1-2,y0+Math.round(h*.4)]])],dk);
  else if(d.p===2){for(let y=y0+2;y<y1-1;y+=3)for(let x=x0+2+(((y-y0)/3|0)%2?0:2);x<x1-2;x+=4)flat([R(x,y,x+2,y+1)],dk)}
  else if(d.p===3)flat([L([[cx,y0+2],[cx-3,y0+6],[cx,y0+10],[cx+3,y0+6],[cx,y0+2]])],gg);
  else if(d.p===4)flat([L([[x0+3,y0],[x0+2,y1-1]]),L([[x1-3,y0],[x1-2,y1-1]])],tm);
  else if(d.p===5){for(let y=y0+3;y<y1-1;y+=4)flat([L([[x0+2,y],[cx,y+2],[x1-2,y]])],dk)}
  if(!back){
   if(d.c===1)part([R(x0+3,y0-2,x1-3,y0+1)],tm);
   else if(d.c===2)part([P([[x0+1,y0],[x0+4,y0-4],[cx,y0],[x1-4,y0-4],[x1-1,y0]])],tm);
   else if(d.c===3)part([P([[x0,y0],[x0+2,y0-4],[x0+4,y0],[x1-4,y0],[x1-2,y0-4],[x1,y0]])],tm);
   if(d.e){wo(ID0,cx,y0+Math.round(h*.4),2.6,tm);wo(ID0,cx,y0+Math.round(h*.4),1.6,hc2)}}
  if(rb&&d.k)flat([R(x0,y1-d.k,x1,y1)],tm);if(o.ath)thA(x0,y0,x1,y1)};
 const gtor=()=>{const cs=cpA;wbd([[16,30],[32,30],[31,44],[17,44]],16,30,32,44,cs.m);if(ARD[AR-1].k>1)part([P([[17,44],[31,44],[33,50],[15,50]])],cs.m)};
 const gpl=()=>{const cs=cpA,s=ARD[AR-1].s;
  if(s<=1)part([E(9,28,20,37),E(28,28,39,37)],cs.m);
  else if(s===2){part([E(9,28,20,37),E(28,28,39,37)],cs.m);part([E(10,32,19,38),E(29,32,38,38)],cs.t)}
  else if(s===3){part([P([[8,31],[12,27],[21,29],[21,37],[10,39]]),P([[40,31],[36,27],[27,29],[27,37],[38,39]])],cs.m)}
  else{part([E(9,28,20,37),E(28,28,39,37)],cs.m);part([P([[11,29],[14,21],[17,29]]),P([[31,29],[34,21],[37,29]])],cs.l);if(s>=5)part([P([[9,32],[2,26],[5,37]]),P([[39,32],[46,26],[43,37]])],cs.t)}
  if(s)flat([R(10,34,19,35),R(29,34,38,35)],cs.t);if(o.ath)thP()};
 const bcf=bm=>bm[0]*.3+bm[1]*.59+bm[2]*.11>135?mx(cpB.d,[0,0,0],.25):mx(cpB.l,[255,255,255],.3);
 const wbf=(x0,x1,l,dir)=>{const cs=cpB,d=BOD[BO-1],h=d[0]+3,y1=62-l,y0=y1-h,bm=mx([70,50,36],cs.m,Math.min(.9,.3+.05*BO));
  if(d[4])part([P([[dir<0?x0-1:x1+1,y0+2],[dir<0?x0-7:x1+7,y0-3],[dir<0?x0-4:x1+4,y0+4]])],cs.l);
  part([R(x0-1,y0,x1+1,y1)],bm);
  if(d[2])flat([R(x0-1,y0+5,x1+1,y0+6)],cs.d);
  if(d[3]===1)part([R(x0-1,y1-2,x1+1,y1)],cs.t);else if(d[3]===2)part([P([[x0-1,y1-2],[x1+1,y1-2],[x1+2,y1],[x0-2,y1]])],cs.t);
  if(d[5])part([P([[x0-1,y1-2],[x0-4,y1],[x0-1,y1]])],cs.d);part([R(x0-(dir<0?2:1),y0-1,x1+(dir<0?1:2),y0+2)],bcf(bm));if(o.bth)thm(o.bth,(x0+x1)>>1,y0-2,x0)};
 const wbt=(lf,rf)=>{wbf(18,23,lf,-1);wbf(25,30,rf,1)};
 const wfm=()=>{const cs=cpB,bm=mx([106,74,42],cs.m,Math.min(.9,.3+.05*BO));part([R(15,61,22,64),R(26,61,33,64)],bm);flat([R(15,62,22,63),R(26,62,33,63)],bcf(bm));flat([R(15,63,22,64),R(26,63,33,64)],cs.t);if(BOD[BO-1][4])part([P([[14,62],[8,57],[12,64]]),P([[34,62],[40,57],[36,64]])],cs.l)};
 const wsh=()=>{const cs=cpS,d=SHD[SHT-1],circ=(cx,cy,rx,ry)=>{const q=[];for(let i=0;i<10;i++){const a=i/10*6.2832;q.push([cx+Math.cos(a)*rx,cy+Math.sin(a)*ry])}return q};
  let pl;if(d[0]===0)pl=circ(8,42,5,6);else if(d[0]===1)pl=circ(8,43,7,9);else if(d[0]===2)pl=[[8,31],[15,35],[14,49],[8,58],[2,49],[1,35]];else if(d[0]===3)pl=[[2,32],[15,32],[15,46],[8,57],[2,46]];else if(d[0]===4)pl=[[2,33],[4,31],[7,33],[9,31],[12,33],[15,31],[15,57],[2,57]];else if(d[0]===5)pl=[[8,31],[15,36],[15,51],[8,57],[1,51],[1,36]];else{pl=[];for(let i=0;i<14;i++){const a=i/14*6.2832;pl.push([8+Math.cos(a)*(i%2?5:8),43+Math.sin(a)*(i%2?6:9)])}}
  let sx=0,sy=0;pl.forEach(p=>{sx+=p[0];sy+=p[1]});const cx=sx/pl.length,cy=sy/pl.length;
  part([P(pl)],cs.m);
  if(d[1]){const q=pl.map(p=>[cx+(p[0]-cx)*.78,cy+(p[1]-cy)*.78]);q.push(q[0]);flat([L(q)],cs.t)}
  if(d[3]===1)flat([L([[cx,cy-6],[cx,cy+6]]),L([[cx-4,cy],[cx+4,cy]])],cs.d);
  else if(d[3]===2)flat([L([[cx,cy-6],[cx,cy+6]],2)],cs.d);
  else if(d[3]===3)flat([L([[cx-5,cy-3],[cx,cy+2],[cx+5,cy-3]],2)],cs.d);
  else if(d[3]===4)flat([L([[cx,cy-5],[cx+3,cy],[cx,cy+5],[cx-3,cy],[cx,cy-5]])],cs.g);
  else if(d[3]===5)flat([L([[cx,cy-7],[cx,cy-3]]),L([[cx,cy+7],[cx,cy+3]]),L([[cx-7,cy],[cx-3,cy]]),L([[cx+7,cy],[cx+3,cy]])],cs.t);
  if(d[2]){wo(ID0,cx,cy,2.6,cs.t);wo(ID0,cx,cy,1.6,hc2)}if(o.sth)[[cx,cy-9],[4,34],[12,34],[cx,cy+10]].forEach((p,k)=>thm(o.sth,p[0],p[1],k))};
 const gic=()=>{const c=o.wc,k=o.gk;if(k==='s')wsh();else if(k==='b')wbf(18,23,0,-1);else if(c==='G'){gtor();gpl()}else if(c==='V')wbd(VP,17,30,31,47,lthr([104,72,48]),1);else if(c==='R')wbd(RP,17,30,31,50,lthr([86,112,60]),1);else if(c==='M')wbd(MPo,12,30,36,61,mx([91,75,200],cpA.m,.2+.03*AR),1)};
 const thm=(th,x,y,v)=>{const q=THP[th-1],X=Math.round(x),Y=Math.round(y);
  if(th===1)flat([R(X,Y-1,X+1,Y+2),R(X-1,Y,X+2,Y+1)],q.l);
  else if(th===2)flat([L([[X,Y-2],[X+2,Y],[X-1,Y+1],[X+1,Y+3]])],q.g);
  else if(th===3){flat([R(X,Y,X+2,Y+2)],q.g);if(v&1)flat([R(X+1,Y-2,X+2,Y-1)],q.l)}
  else if(th===4)flat([R(X,Y-2,X+1,Y+3),R(X-2,Y,X+3,Y+1)],q.l);
  else if(th===5)flat([R(X,Y,X+2,Y+2),L([[X,Y+2],[X-1,Y+5]])],q.g);
  else if(th===6){part([P([[X,Y+1],[X+3,Y-2],[X+4,Y+1],[X+1,Y+3]])],q.m);flat([R(X+2,Y,X+3,Y+1)],q.g)}
  else if(th===7)flat([R(X,Y-2,X+1,Y+3),R(X-2,Y,X+3,Y+1)],q.t);
  else if(th===8)flat([L([[X-3,Y],[X+3,Y]])],q.g);
  else if(th===9){part([P([[X-2,Y+3],[X-3,Y-2],[X-1,Y],[X,Y-6],[X+1,Y-1],[X+3,Y-3],[X+2,Y+3]])],q.m);flat([R(X,Y-3,X+1,Y-1)],q.g)}
  else if(th===10)flat([L([[X,Y-3],[X,Y+3]]),L([[X-3,Y],[X+3,Y]])],q.t)};
 const thW=(T,bl,d)=>{(d?[4,8]:[3,5,7,9]).forEach((i,k)=>{const p=T(bl.mid[i]);thm(o.wth,p[0]+(k%2?2:-2),p[1],k)})},thS=T=>{[[-5,-8],[5,-8],[0,-15],[0,-2]].forEach((q,k)=>{const p=T(q);thm(o.wth,p[0],p[1],k)})},thB=c=>{[[10,36-bhh-3],[10,36+bhh+3],[10-c,36]].forEach((p,k)=>thm(o.wth,p[0],p[1],k))};
 const thA=(x0,y0,x1,y1)=>{if(back)return;const th=o.ath,q=THP[th-1],cx=(x0+x1)>>1,h=y1-y0;[[x0+2,y0+3],[x1-2,y0+3],[cx,y0+(h>>1)],[x0+3,y1-3],[x1-3,y1-3]].forEach((p,k)=>thm(th,p[0],p[1],k));if(th===9)part([P([[x0,y0+2],[x0-1,y0-5],[x0+3,y0]]),P([[x1,y0+2],[x1+1,y0-5],[x1-3,y0]])],q.t)};
 const thP=()=>{[[12,28],[36,28]].forEach((p,k)=>thm(o.ath,p[0],p[1],k+1));if(o.ath===9)part([P([[9,29],[5,19],[13,26]]),P([[39,29],[43,19],[35,26]])],THP[8].t)};
 const G=()=>{const ST=TN('#b4becf',.5),RED=TN('#c0343c',.8),BLs=TN('#2f58bc',.75),BLt=[47,88,188];
  part([P([[13,30],[35,30],[41,60],[7,60]])],RED);if(back)flat([R(22,34,26,58)],Da(RED));
  hrB();
  legs(TN('#8f9ab0',.4),'#3c3c4c','#c8d0e0',lf,rf);
  if(!back){part([R(21,33,27,54)],BLt);flat([R(21,52,27,54)],GD)}
  if(AR&&!back)gtor();else part([P([[16,30],[32,30],[31,44],[17,44]])],back?mx(ST,[0,0,0],.12):ST);
  if(fem)part([P([[15,44],[33,44],[36,54],[12,54]])],BLt),flat([R(13,53,35,54)],GD);
  part([R(16,43,32,46)],'#6a4222');flat([R(22,43,26,46)],GD);
  if(back){part([P([[15,30],[33,30],[36,60],[12,60]])],RED);part([R(16,43,32,46)],'#6a4222')}
  const sl=TN('#8d98ac',.4);arm(-1,al,sl,'#c8d0e0',!back);arm(1,ar,sl,'#c8d0e0',!back);
  if(AR)gpl();else{part([E(9,28,20,37),E(28,28,39,37)],mx(ST,[255,255,255],.15));flat([R(10,34,19,35),R(29,34,38,35)],GD)}
  if(!back){if(SHT)wsh();else{part([P([[3,33],[14,33],[14,48],[8,55],[3,48]])],BLs);flat([R(7,36,10,48),R(4,40,13,43)],GD)}face();
   hrF()}
  else{hrK();part([P([[14,14],[24,4],[34,14],[30,24],[24,20],[18,24]])],Li(hc),false);part([P([[3,33],[14,33],[14,48],[8,55],[3,48]])],'#7a5030')}
  part([R(13,10,35,13)],ST);flat([R(23,9,25,12)],[220,40,60]);
  if(ax1){part([P([[32,33],[38,35],[43,41],[39,44]])],sl);part([E(38,39,44,45)],SK);if(WK)wpn(41.5,43.5,2.99,.6);else{part([P([[41,44],[44,43],[47,60],[43,61]])],BL);part([R(36,43,47,45)],GD)}}
  else if(ax2){part([P([[31,33],[36,34],[39,38],[35,41]])],sl);part([E(35,35,41,41)],SK);if(WK)wpn(38,38,1.5708,.5);else{part([R(41,36,48,39)],BL);part([R(39,32,42,44)],GD)}}
  else if(atk){part([P([[32,32],[37,33],[42,26],[38,23]])],sl);part([E(39,21,44,26)],SK);if(WK)wpn(41.5,23,.2,.78);else{part([P([[40,22],[43,22],[46,0],[42,0]])],BL);part([R(37,21,46,23)],GD)}flat([L([[26,8],[18,20],[16,34],[22,46]],2)],[255,255,255])}
  else if(!bld&&fr!=='vc'){sft(PX,PY);if(WK){wpn(39.5,45,PA,1);part([E(36,43,42,49)],SK)}else{part([R(38,14,41,45)],BL);part([R(36,44,43,46)],GD);part([R(38,46,41,50)],'#6a4222');part([E(36,43,42,49)],SK)}sft(-PX,-PY)}};
 const Pa=()=>{const qa=o.ath?THP[o.ath-1]:null,CP=qa?mx(qa.l,[255,255,255],.2):[246,242,228],CD=qa?qa.m:[212,204,186],HM=qa?mx(qa.m,[255,255,255],.3):[236,238,250],WG=qa?mx(qa.l,[255,255,255],.25):[252,250,242],BLt=[47,88,188],ST=TN('#b4becf',.5),WH=[244,246,252],SKH=Da(HM),
  halo=()=>flat([L([[15,0],[18,-3],[24,-4],[30,-3],[33,0],[30,2],[24,3],[18,2],[15,0]],2)],GD),
  wings=()=>{part([P([[17,34],[7,31],[2,20],[0,5],[5,11],[7,1],[11,11],[14,4],[17,17],[19,25]]),P([[31,34],[41,31],[46,20],[48,5],[43,11],[41,1],[37,11],[34,4],[31,17],[29,25]])],WG);flat([L([[17,30],[5,10]]),L([[18,33],[8,24]]),L([[31,30],[43,10]]),L([[30,33],[40,24]])],CD)},
  helm=()=>{part([P([[12,17],[11,10],[15,4],[24,1],[33,4],[37,10],[36,17],[33,13],[15,13]])],HM);flat([R(12,12,36,14)],GD);
   part([P([[12,12],[4,4],[1,9],[7,11],[3,15],[11,16]]),P([[36,12],[44,4],[47,9],[41,11],[45,15],[37,16]])],WG)};
  halo();if(!back)wings();
  part([P([[13,30],[35,30],[41,60],[7,60]])],CP);if(back)flat([R(22,34,26,58)],Da(CP));
  hrB(1);
  legs(TN('#8f9ab0',.4),'#3c3c4c','#c8d0e0',lf,rf);
  if(!back){part([R(22,44,26,54)],CP);flat([R(22,52,26,54)],GD)}
  if(AR&&!back)gtor();else part([P([[16,30],[32,30],[31,44],[17,44]])],back?mx(ST,[0,0,0],.12):ST);
  if(fem)part([P([[15,44],[33,44],[36,52],[12,52]])],CP),flat([R(13,51,35,52)],GD);
  part([R(16,43,32,46)],'#6a4222');flat([R(22,43,26,46)],GD);
  if(back){part([P([[15,30],[33,30],[36,58],[12,58]])],CP);flat([R(23,34,25,56)],Da(CP));part([R(16,43,32,46)],'#6a4222');wings()}
  const sl=TN('#8d98ac',.4);arm(-1,al,sl,'#c8d0e0',!back);arm(1,ar,sl,'#c8d0e0',!back);
  if(AR)gpl();else{part([E(9,28,20,37),E(28,28,39,37)],mx(ST,[255,255,255],.15));flat([R(10,34,19,35),R(29,34,38,35)],GD)}
  if(!back){if(SHT)wsh();else if(ax3){part([P([[8,24],[28,24],[28,44],[18,56],[8,44]])],WH);flat([R(16,28,20,52),R(10,34,26,38)],BLt);flat([L([[4,28],[1,25]]),L([[3,36],[0,36]]),L([[4,44],[1,47]])],[255,240,190])}
   else{part([P([[3,33],[14,33],[14,48],[8,55],[3,48]])],WH);flat([R(7,36,10,48),R(4,40,13,43)],BLt)}
   if(ax3)flat([L([[4,28],[1,25]]),L([[3,36],[0,36]]),L([[4,44],[1,47]])],[255,240,190]);face();hrF(1);helm();flat([R(23,14,25,23)],SKH)}
  else{hrK(1);part([E(12,4,36,24)],HM);flat([R(12,12,36,14)],GD);part([P([[12,12],[4,4],[1,9],[7,11],[3,15],[11,16]]),P([[36,12],[44,4],[47,9],[41,11],[45,15],[37,16]])],WG);part([P([[3,33],[14,33],[14,48],[8,55],[3,48]])],'#aab4c8')}
  if(ax1){part([P([[32,33],[38,35],[43,41],[39,44]])],sl);part([E(38,39,44,45)],SK);if(WK)wpn(41.5,43.5,2.99,.6);else{part([P([[41,44],[44,43],[47,60],[43,61]])],BL);part([R(36,43,47,45)],GD)}}
  else if(ax2){part([P([[31,33],[36,34],[39,38],[35,41]])],sl);part([E(35,35,41,41)],SK);if(WK)wpn(38,38,1.5708,.5);else{part([R(41,36,48,39)],BL);part([R(39,32,42,44)],GD)}}
  else if(atk){part([P([[32,32],[37,33],[42,26],[38,23]])],sl);part([E(39,21,44,26)],SK);if(WK)wpn(41.5,23,.2,.78);else{part([P([[40,22],[43,22],[46,0],[42,0]])],BL);part([R(37,21,46,23)],GD)}flat([L([[26,8],[18,20],[16,34],[22,46]],2)],[255,240,190])}
  else if(!bld&&fr!=='vc'){sft(PX,PY);if(WK){wpn(39.5,45,PA,1);part([E(36,43,42,49)],SK)}else{part([R(38,14,41,45)],BL);part([R(36,44,43,46)],GD);part([R(38,46,41,50)],'#6a4222');part([E(36,43,42,49)],SK)}sft(-PX,-PY)}};
 const As=()=>{const CL=TN('#24322c',.8),HD=TN('#34463c',.8),GR=[70,176,92],GRd=[40,112,60],KN=[216,222,232],
  band=()=>{flat([R(12,12,36,15)],GR);flat([R(12,14,36,15)],GRd);part([P([[35,12],[46,9],[43,14],[47,19],[36,16]])],GR)},
  scarfE=()=>part([P([[30,28],[40,27],[47,22],[46,31],[42,35],[36,38],[30,34]])],GR);
  part([P([[14,30],[34,30],[37,53],[11,53]])],CL);hrB();
  legs('#26302c','#181e1c','#3a5a44',lf,rf);
  if(AR&&!back)wbd(VP,17,30,31,47,lthr([104,72,48]),1);else part([P([[17,30],[31,30],[32,47],[16,47]])],HD);
  if(back){part([P([[14,30],[34,30],[37,56],[11,56]])],CL);flat([R(23,34,25,54)],Da(CL))}
  else{flat([L([[17,31],[30,43]],2)],[110,72,40]);flat([R(19,33,20,36),R(22,36,23,39),R(25,39,26,42),R(28,42,29,45)],KN)}
  part([R(16,43,32,46)],'#4a4a3a');flat([R(22,43,26,46)],GD);
  if(!back)part([R(17,45,21,50),R(27,45,31,50)],'#3a5a44');
  const sl=TN('#34463c',.6);arm(-1,al,sl,'#3a5a44',!back);arm(1,ar,sl,'#3a5a44',!back);
  part([E(28,27,40,36)],'#4a5560');flat([R(30,33,38,34)],GD);
  scarfE();
  if(ax1){part([P([[32,32],[38,31],[44,33],[41,38]])],sl);part([E(40,31,46,37)],SK);if(WK)wpn(12.5,45,3.4,1,1);else{part([P([[11,45],[14,45],[10,58],[8,58]])],BL);part([R(9,44,15,46)],GD)}}
  else if(ax2){if(WK){wpn(16,50,.7,1,1);wpn(32,50,-.7,1,1)}else{part([P([[14,48],[18,50],[33,33],[30,30]])],BL);part([P([[34,48],[30,50],[15,33],[18,30]])],BL);flat([R(13,47,19,49),R(29,47,35,49)],GD)}}
  else if(atk){if(WK){wpn(16,38,-.67,1,1);wpn(32,38,.67,1,1)}else{part([P([[14,40],[18,36],[8,24],[5,28]])],BL);part([P([[30,36],[34,40],[42,28],[38,24]])],BL)}flat([L([[2,14],[14,24],[26,30]],2),L([[46,14],[34,24],[24,30]],2)],[190,255,200])}
  else if(ax3){if(WK){wpn(14,34,2.2,1,1);wpn(34,34,.9,1,1)}else{part([P([[10,40],[14,42],[22,28],[18,26]])],BL);part([P([[38,40],[34,42],[26,28],[30,26]])],BL)}}
  else if(!bld&&fr!=='vc'){sft(-PX,PY);if(WK)wpn(12.5,45,3.4+PA,1,1);else{part([P([[11,45],[14,45],[10,58],[8,58]])],BL);part([R(9,44,15,46)],GD)}sft(2*PX,0);if(WK)wpn(35.5,45,2.88-PA,1,1);else{part([P([[34,45],[37,45],[40,58],[38,58]])],BL);part([R(33,44,39,46)],GD)}sft(-PX,-PY)}
  if(!back){face();hrF(2);band();part([P([[15,24],[33,24],[31,31],[24,34],[17,31]])],GR);flat([R(15,24,33,25)],GRd);part([P([[15,29],[33,29],[31,34],[17,34]])],GR)}
  else{hrK();band();part([P([[15,29],[33,29],[31,34],[17,34]])],GR)}};
 const Ne=()=>{const RB=TN('#34423e',.9),HB=TN('#222c2a',.9),BN=[232,226,200],BD=Da(BN),GN=[120,240,150],EY=[20,40,28],
  sk=(cx,cy,r,c)=>{part([E(cx-r,cy-r,cx+r,cy+r)],c);part([R(cx-(r>>1),cy+r-1,cx+(r>>1)+1,cy+r+(r>>1)+1)],c);flat([R(cx-r+2,cy-1,cx-1,cy+2),R(cx+1,cy-1,cx+r-1,cy+2)],EY)},
  horns=()=>part([P([[16,7],[11,5],[9,0],[8,-5],[13,-1],[18,3]]),P([[32,7],[37,5],[39,0],[40,-5],[35,-1],[30,3]])],BN),
  spk=()=>part([P([[10,31],[3,23],[14,29]]),P([[38,31],[45,23],[34,29]])],BN);
  if(!bld){if(WK)wst();else part([R(5,14,8,64)],'#8a7a5a')}
  if(atk){flat([E(-4,-6,16,14)],[150,255,190]);flat([E(0,-2,12,10)],[220,255,230]);flat([L([[8,-12],[8,16]]),L([[-6,4],[22,4]]),L([[-2,-6],[18,14]]),L([[18,-6],[-2,14]])],[255,255,255]);flat([E(36,22,44,30),E(30,30,36,36)],[150,255,190])}
  if(!bld&&!WK)flat([R(4,15,9,17)],BN);
  hrB(1);
  if(BO)wfm();else part([R(15,61,22,64),R(26,61,33,64)],'#4a4a3a');
  if(AR){wbd(MPo,12,30,36,61,mx(RB,cpA.m,.2+.03*AR),1);part([R(12,58,36,62)],cpA.t)}else{part([P([[16,30],[32,30],[36,61],[12,61]])],RB);part([R(12,58,36,62)],BD)}
  if(!back){part([R(22,42,26,60)],TN('#1c2624',.9));
   flat([R(23,31,25,42)],BN);for(const y of[32,35,38])flat([L([[18,y],[23,y+1],[30,y]])],BN);sk(24,50,3,BN)}
  part([R(16,42,32,45)],BN);
  if(!back)part([P([[19,29],[29,29],[24,37]])],BD);
  {const la=(ci||spz)?al:0;part([P([[10,31],[16,31],[16,44+la],[7,47+la]])],RB);part([P([[32,31],[38,31],[41,47+ar],[32,44+ar]])],RB)}
  {const la=(ci||spz)?al:0;flat([R(7,44+la,16,46+la),R(32,44+ar,41,46+ar)],BD);part([E(4,43+la,10,48+la)],SK);if(!back)part([E(34,45+ar,40,50+ar)],SK)}
  spk();
  if(!back){part([E(10,3,38,30)],HB);face();hrF(1);part([R(10,10,16,30),R(32,10,38,30)],HB);part([P([[10,14],[14,4],[24,1],[34,4],[38,14],[34,12],[24,9],[14,12]])],HB);flat([R(16,11,32,12)],BD);horns();if(!bld)sk(43,16,4,GN)}
  else{hrK(1);part([E(10,3,38,32)],HB);flat([L([[24,5],[24,30]])],Da(HB));horns();if(!bld)sk(43,16,4,GN)}
  if(ax1){part([P([[33,32],[39,33],[43,37],[40,41]])],RB);part([E(38,36,44,42)],SK);flat([E(39,28,47,36)],[120,240,150]);flat([E(41,30,45,34)],[255,255,255])}
  else if(ax2||ax3){part([P([[33,31],[38,27],[41,17],[37,15]])],RB);part([E(36,10,42,17)],SK);if(ax2){flat([E(33,-1,45,10)],[150,255,190]);flat([L([[39,-6],[39,10]]),L([[33,4],[45,4]])],[255,255,255])}else{flat([E(2,6,11,15)],[150,255,170]);flat([E(4,8,9,13)],[255,255,255]);flat([R(38,2,40,10),R(35,5,43,7)],[190,255,200])}}};
 const M=()=>{const RB=TN('#5b4bc8',.9),HB=TN('#3d30a2',.9),HT=TN('#4a3cb8',.9);
  if(!bld){if(WK)wst();else part([R(5,14,8,64)],'#7a5230')}
  if(atk){flat([E(-4,-6,16,14)],[150,235,255]);flat([E(0,-2,12,10)],[220,250,255]);flat([L([[8,-12],[8,16]]),L([[-6,4],[22,4]]),L([[-2,-6],[18,14]]),L([[18,-6],[-2,14]])],[255,255,255]);flat([E(36,22,44,30),E(30,30,36,36)],[150,235,255])}
  else if(!bld&&!WK){part([E(2,6,11,15)],'#7fe8ff');flat([R(4,8,6,10)],[255,255,255])}
  if(!bld&&!WK)flat([R(4,15,9,17)],GD);
  hrB(1);
  if(BO)wfm();else part([R(15,61,22,64),R(26,61,33,64)],'#6a4a2a');
  if(AR){wbd(MPo,12,30,36,61,mx(RB,cpA.m,.2+.03*AR),1);part([R(12,58,36,62)],cpA.t)}else{part([P([[16,30],[32,30],[36,61],[12,61]])],RB);part([R(12,58,36,62)],WH)}
  if(!back)part([R(22,42,26,60)],TN('#4030a0',.9));
  part([R(16,42,32,45)],GD);
  if(!back){part([P([[19,29],[29,29],[24,37]])],WH);part([R(22,45,25,52)],[196,80,106])}
  {const la=(ci||spz)?al:0;part([P([[10,31],[16,31],[16,44+la],[7,47+la]])],RB);part([P([[32,31],[38,31],[41,47+ar],[32,44+ar]])],RB)}
  {const la=(ci||spz)?al:0;flat([R(7,44+la,16,46+la),R(32,44+ar,41,46+ar)],WH);part([E(4,43+la,10,48+la)],SK);if(!back)part([E(34,45+ar,40,50+ar)],SK)}
  if(!back){face();hrF(1);if(!fem)part([P([[20,29],[28,29],[24,36]])],hc)}
  else hrK(1);
  part([E(6,8,42,20)],HB);part([P([[15,14],[33,14],[29,4],[33,-2],[26,-4],[20,3]])],HT);
  part([R(15,11,33,14)],GD);flat([R(23,5,25,9),R(22,6,26,8)],GD);
  if(ax1){part([P([[33,32],[39,33],[43,37],[40,41]])],RB);part([E(38,36,44,42)],SK);flat([E(39,28,47,36)],[90,200,255]);flat([E(41,30,45,34)],[255,255,255])}
  else if(ax2||ax3){part([P([[33,31],[38,27],[41,17],[37,15]])],RB);part([E(36,10,42,17)],SK);if(ax2){flat([E(33,-1,45,10)],[150,235,255]);flat([L([[39,-6],[39,10]]),L([[33,4],[45,4]])],[255,255,255])}else{flat([E(2,6,11,15)],[150,255,170]);flat([E(4,8,9,13)],[255,255,255]);flat([R(38,2,40,10),R(35,5,43,7)],[190,255,200])}}};
 const V=()=>{const CL=TN('#3a2c5c',.8),HD=TN('#4c3e70',.8),SC=[198,58,84];
  part([P([[14,30],[34,30],[38,54],[10,54]])],CL);part([E(11,5,37,32)],CL);hrB(1);
  legs('#2e2a42','#1e1a2a','#7a5a9a',lf,rf);
  if(AR&&!back)wbd(VP,17,30,31,47,lthr([104,72,48]),1);else part([P([[17,30],[31,30],[32,47],[16,47]])],HD);
  if(back){part([P([[14,30],[34,30],[38,56],[10,56]])],CL);flat([R(23,34,25,54)],Da(CL))}
  else flat([L([[17,31],[30,43]],2)],[110,72,40]);
  part([R(16,43,32,46)],'#6a4a2a');flat([R(22,43,26,46)],GD);
  if(!back)part([R(17,45,21,50),R(27,45,31,50)],'#7a5230');
  const sl=TN('#3a2e58',.6);arm(-1,al,sl,'#7a5230',!back);arm(1,ar,sl,'#7a5230',!back);
  if(!back){part([P([[17,28],[31,28],[29,33],[19,33]])],SC);part([P([[28,31],[32,31],[35,42],[30,39]])],SC)}
  if(ax1){part([P([[32,32],[38,31],[44,33],[41,38]])],sl);part([E(40,31,46,37)],SK);if(WK)wpn(12.5,45,3.4,1,1);else{part([P([[11,45],[14,45],[10,58],[8,58]])],BL);part([R(9,44,15,46)],GD)}}
  else if(ax2){if(WK){wpn(16,50,.7,1,1);wpn(32,50,-.7,1,1)}else{part([P([[14,48],[18,50],[33,33],[30,30]])],BL);part([P([[34,48],[30,50],[15,33],[18,30]])],BL);flat([R(13,47,19,49),R(29,47,35,49)],GD)}}
  else if(atk){if(WK){wpn(16,38,-.67,1,1);wpn(32,38,.67,1,1)}else{part([P([[14,40],[18,36],[8,24],[5,28]])],BL);part([P([[30,36],[34,40],[42,28],[38,24]])],BL)}flat([L([[2,14],[14,24],[26,30]],2),L([[46,14],[34,24],[24,30]],2)],[255,255,255])}
  else if(!bld&&fr!=='vc'){sft(-PX,PY);if(WK)wpn(12.5,45,3.4+PA,1,1);else{part([P([[11,45],[14,45],[10,58],[8,58]])],BL);part([R(9,44,15,46)],GD)}sft(2*PX,0);if(WK)wpn(35.5,45,2.88-PA,1,1);else{part([P([[34,45],[37,45],[40,58],[38,58]])],BL);part([R(33,44,39,46)],GD)}sft(-PX,-PY)}
  if(!back){face();hrF(2);part([P([[16,26],[32,26],[30,31],[18,31]])],SC);
   part([P([[11,18],[11,10],[17,5],[24,3],[31,5],[37,10],[37,18],[33,14],[28,11],[24,13],[20,11],[15,14]])],HD);part([R(11,14,15,30),R(33,14,37,30)],HD)}
  else{hrK(1);part([E(11,4,37,31)],HD);flat([L([[24,6],[24,28]])],Da(HD))}};
 const Rg=()=>{const GR=TN('#3f8a48',.9),TU=TN('#a8743c',.35),HB=TN('#2f6a38',.9);
  part([R(29,22,35,42)],'#6a4222');flat([R(30,18,31,23),R(32,17,33,22),R(34,19,35,23)],[230,230,220]);flat([R(31,18,32,20)],[210,60,60]);
  part([P([[14,30],[34,30],[38,54],[10,54]])],GR);
  hrB(1);
  legs('#6a4a2a','#4a3220','#8a6a3a',lf,rf,48);
  if(AR&&!back)wbd(RP,17,30,31,50,lthr([86,112,60]),1);else part([P([[17,30],[31,30],[32,50],[29,48],[26,50],[23,48],[20,50],[16,50]])],back?GR:TU);
  if(back){part([P([[14,30],[34,30],[38,56],[10,56]])],GR);part([R(26,20,34,44)],'#6a4222');flat([R(27,17,28,22),R(29,16,30,21),R(31,17,32,22),R(33,18,34,23)],[230,230,220])}
  part([R(16,42,32,45)],'#5a3a1a');flat([R(22,42,26,45)],GD);
  if(!back)flat([L([[17,31],[30,43]],2)],[90,58,26]);
  arm(-1,al,TU,HB,!back);arm(1,ar,TU,HB,!back);
  part([P([[15,28],[33,28],[30,34],[18,34]])],GR);
  if(ax1){part([P([[28,32],[34,35],[33,40],[26,39]])],TU);part([E(28,36,34,42)],SK)}
  else if(atk){flat([L([[9,38],[36,38]])],[216,200,160]);flat([R(5,37,10,39)],[220,230,240]);flat([L([[30,38],[10,38-bhh],[10,38+bhh],[30,38]])],[250,250,250])}
  sft(PX,PY);if(!bld){if(WK)wbw();else part([L([[10,18],[5,26],[4,36],[5,46],[10,54]],2)],'#8a5a2a')}
  if(!atk&&!bld)flat([L([[10,36-bhh],[10,36+bhh]])],[245,245,235]);sft(-PX,-PY);
  if(!back){face();hrF(2)}
  else hrK(1);
  part([P([[11,16],[37,16],[33,6],[24,1],[14,6]])],GR);part([R(11,13,37,17)],HB);part([P([[32,8],[45,0],[41,11]])],[208,64,64])};
 const Ch=()=>{const GR=TN('#6a4a30',.9),TU=TN('#a8743c',.35),HB=TN('#4a3220',.9),FU=TN('#8a6a48',.5),FD=TN('#5a4230',.5),FA=[240,236,220],AN=[220,206,170],
  antl=()=>part([P([[16,8],[10,5],[8,-2],[7,-9],[10,-8],[11,-2],[14,3],[18,6]]),P([[32,8],[38,5],[40,-2],[41,-9],[38,-8],[37,-2],[34,3],[30,6]]),P([[10,0],[4,-3],[5,1]]),P([[38,0],[44,-3],[43,1]])],AN),
  cap=()=>{part([E(11,2,37,17)],FU);part([R(11,12,37,17)],FD);flat([R(13,10,15,12),R(18,9,20,11),R(28,9,30,11),R(33,10,35,12)],FD);antl()};
  part([R(29,22,35,42)],'#6a4222');flat([R(30,18,31,23),R(32,17,33,22),R(34,19,35,23)],[230,230,220]);flat([R(31,18,32,20)],[210,60,60]);
  part([P([[14,30],[34,30],[38,54],[10,54]])],GR);
  hrB(1);
  legs('#6a4a2a','#4a3220','#8a6a3a',lf,rf,48);
  if(AR&&!back)wbd(RP,17,30,31,50,lthr([86,112,60]),1);else part([P([[17,30],[31,30],[32,50],[29,48],[26,50],[23,48],[20,50],[16,50]])],back?GR:TU);
  if(back){part([P([[14,30],[34,30],[38,56],[10,56]])],GR);part([R(26,20,34,44)],'#6a4222');flat([R(27,17,28,22),R(29,16,30,21),R(31,17,32,22),R(33,18,34,23)],[230,230,220])}
  part([R(16,42,32,45)],'#5a3a1a');flat([R(22,42,26,45)],GD);
  if(!back)flat([L([[17,31],[30,43]],2)],[90,58,26]);
  arm(-1,al,TU,HB,!back);arm(1,ar,TU,HB,!back);
  part([E(7,27,20,38),E(28,27,41,38)],FU);flat([R(9,36,12,38),R(14,36,17,38),R(31,36,34,38),R(36,36,39,38)],FD);
  part([P([[15,28],[33,28],[30,34],[18,34]])],GR);
  if(!back){flat([L([[20,31],[24,38],[28,31]])],[60,40,30]);flat([P([[22,37],[26,37],[25,44]])],FA)}
  if(ax1){part([P([[28,32],[34,35],[33,40],[26,39]])],TU);part([E(28,36,34,42)],SK)}
  else if(atk){flat([L([[9,38],[36,38]])],[216,200,160]);flat([R(5,37,10,39)],[220,230,240]);flat([L([[30,38],[10,38-bhh],[10,38+bhh],[30,38]])],[250,250,250])}
  sft(PX,PY);if(!bld){if(WK)wbw();else part([L([[10,18],[5,26],[4,36],[5,46],[10,54]],2)],'#8a5a2a')}
  if(!atk&&!bld)flat([L([[10,36-bhh],[10,36+bhh]])],[245,245,235]);sft(-PX,-PY);
  if(!back){face();hrF(2)}
  else hrK(1);
  cap()};
 const GST=/^[gr][01]$/.test(fr),gi=GST?+fr[1]:0,rst=GST&&fr[0]==='r',GE={A:[[[39,42,'key'],[40,38,'key']],[[30,41,'cloth'],[35,41,'cloth']]],F:[[[40,26,'blade'],[38,22,'blade']],[[40,22,'hammer'],[38,44,'hammer']]],T:[[[39,42,'mug'],[41,38,'mug']],[[30,41,'cloth'],[35,41,'cloth']]],S:[[[39,26,'heal'],[40,22,'heal']],[[31,40,'none'],[31,36,'none']]],E:[[[39,42,'rein'],[40,36,'rein']],[[36,46,'brush'],[34,40,'brush']]],V:[[[39,40,'none'],[40,36,'coin']],[[33,38,'scroll'],[33,36,'scroll']]],I:[[[39,42,'keys'],[40,40,'keys']],[[36,44,'keys'],[36,38,'keys']]],C:[[[38,40,'scroll'],[38,40,'unroll']],[[32,40,'quill'],[36,38,'quill']]],N:[[[39,28,'orb'],[40,24,'orb2']],[[34,36,'orb'],[34,33,'orb2']]]};
 const GO=r=>{const[hx,hy,pr]=GE[r][rst?1:0][gi],sl=NPV[r].c;part([P([[31,33],[36,33],[hx+3,hy+2],[hx-2,hy+3]])],sl);if(!back)part([E(hx-3,hy-3,hx+3,hy+3)],SK);
  if(pr==='key'){flat([R(hx-1,hy-9,hx+1,hy-1),R(hx-3,hy-9,hx+2,hy-7)],GD)}
  else if(pr==='mug'){part([R(hx-3,hy-8,hx+3,hy-1)],'#c9a24a');flat([R(hx+3,hy-7,hx+5,hy-3)],'#c9a24a');flat([R(hx-3,hy-9,hx+3,hy-8)],[250,250,240])}
  else if(pr==='cloth')part([R(hx-5,hy-4,hx+5,hy+2)],'#f1ece0');
  else if(pr==='blade'){part([R(hx-1,hy-18,hx+1,hy-1)],[216,221,232]);flat([R(hx-3,hy-2,hx+3,hy)],GD)}
  else if(pr==='hammer'){part([R(hx-1,hy-12,hx+1,hy+1)],'#6b4a2a');part([R(hx-5,hy-16,hx+5,hy-10)],'#555a66')}
  else if(pr==='heal'){flat([R(hx-1,hy-12,hx+1,hy-6),R(hx-4,hy-10,hx+4,hy-8)],[140,255,170]);flat([R(hx-6,hy-14,hx-5,hy-13),R(hx+5,hy-6,hx+6,hy-5)],[255,240,150])}
  else if(pr==='rein')flat([L([[hx,hy],[hx+4,hy+8],[hx+1,hy+14]],1)],[122,74,34]);
  else if(pr==='brush')part([R(hx-4,hy-2,hx+4,hy+3)],'#a8794a');
  else if(pr==='coin')part([E(hx-3,hy-9,hx+3,hy-3)],GD);
  else if(pr==='scroll')part([R(hx-6,hy-5,hx+6,hy)],'#f1ece0');
  else if(pr==='unroll'){part([R(hx-6,hy-5,hx+6,hy+9)],'#f1ece0');flat([R(hx-4,hy-1,hx+4,hy),R(hx-4,hy+3,hx+2,hy+4)],[120,90,60])}
  else if(pr==='keys')flat([R(hx-1,hy,hx+1,hy+9),R(hx-3,hy+8,hx+3,hy+10)],GD);
  else if(pr==='quill')flat([L([[hx,hy-1],[hx+4,hy-10]],1)],[240,236,220]);
  else if(pr==='orb'||pr==='orb2'){const q=pr==='orb2'?5:3.5;part([E(hx-q,hy-q*2-2,hx+q,hy-2)],[190,150,255]);flat([R(hx-1,hy-q*2,hx+1,hy-q*2+2)],[255,255,255])}};
 const NP=r=>{const v=NPV[r],c=v.c,act=fr==='act',rob=fem||r==='S'||r==='C'||r==='V'||r==='N',X=v.x,sl=c;
  hrB(r==='T'||r==='S');
  if(rob){legs('#2b2118','#2b2118',null,lf,rf,54);part([P([[14,30],[34,30],[39,60],[9,60]])],c);if(r==='S')flat([R(9,57,39,60)],[230,189,84])}
  else{legs('#4a3f35','#2b2118','#5a3a22',lf,rf,46);part([P([[15,30],[33,30],[34,50],[14,50]])],c)}
  part([R(15,43,33,46)],'#5a3a22');flat([R(22,43,26,46)],GD);
  if(!back){
   if(r==='A'||r==='T'){part([R(19,34,29,45)],'#f1ece0');part([R(18,45,30,58)],'#f1ece0')}
   if(r==='F')part([P([[18,32],[30,32],[33,58],[15,58]])],'#6b4a2a');
   if(r==='S'){flat([R(23,34,25,43),R(21,36,27,38)],GD)}
    if(r==='N'){flat([R(21,36,27,38),R(23,34,25,40)],[190,150,255])}
   if(r==='V')flat([L([[17,31],[24,41],[31,31]],2)],GD);
   if(r==='I')part([E(15,44,20,50)],'#d4b04a');
   if(r==='C')flat([L([[16,31],[31,45]],2)],GD)}
  else if(r==='F')part([P([[18,32],[30,32],[33,58],[15,58]])],'#6b4a2a');
  arm(-1,al,sl,'#5a3a22',!back);
  if(GST)GO(r);
  else if(act){part([P([[31,34],[36,32],[41,20],[37,18]])],sl);part([E(36,13,42,20)],SK)}
  else{arm(1,ar,sl,'#5a3a22',!back);
   if(X==='mug'){part([R(32,40,38,47)],'#c9a24a');flat([R(38,41,40,45)],'#c9a24a')}
   if(X==='hammer'){part([R(34,32,36,50)],'#6b4a2a');part([R(30,31,41,37)],'#555a66')}
   if(X==='fork'){part([R(35,0,37,62)],'#6b4a2a');part([R(32,-2,40,1)],'#9a9aa2');flat([R(32,-5,33,-2),R(35,-5,37,-2),R(39,-5,40,-2)],'#9a9aa2')}
   if(X==='scroll')part([R(30,41,40,46)],'#f1ece0');
   if(X==='keys')flat([R(34,44,36,53),R(33,52,38,54)],'#d4b04a')}
  if(!back){face();hrF(r==='T'||r==='S'?2:0);
   if(!fem&&(r==='F'||r==='V'))part([P([[19,28],[29,28],[24,40]])],hc)}
  else hrK(r==='T'||r==='S');
  if(r==='T')part([E(12,3,36,16)],'#8a3b3b');
  if(r==='A'&&fem)part([R(13,8,35,12)],'#f1ece0');
  if(r==='S')part([P([[10,22],[10,9],[17,3],[31,3],[38,9],[38,22],[34,14],[14,14]])],v.h);
  if(r==='E'){part([E(4,9,44,18)],v.h);part([E(14,1,34,13)],v.h);flat([R(14,10,34,12)],'#8a5a3a')}
  if(r==='V'){part([R(15,-8,33,8)],v.h);part([R(10,7,38,10)],v.h);flat([R(15,5,33,7)],GD)}
  if(r==='I'){part([E(11,2,37,17)],v.h);flat([R(11,13,37,15)],'#d4b04a')}
  if(r==='C'){part([R(15,-6,33,9)],v.h);flat([R(14,7,34,10)],GD)}};
 const NPF={};for(const r of 'AFTSEVICN')NPF['n'+r]=()=>NP(r);
 const MP=k=>{const ME=MON[k],O=ME[3]||{},bone=k==='skel'||k==='lich',wg=k==='demon'||k==='dking'||k==='garg',bk_=O.bulk||1,hw=Math.max(5,Math.min(13,Math.round(7+5*(bk_-1)))),NC=[143,233,255],neon=!!o.neon,eyc=neon?NC:rgb(O.eye||'#ffd04a'),
  cc=TN(ME[1],.18),cd=TN(ME[2],.18),sk=O.sk?rgb(O.sk):(k==='were'||k==='golem'?rgb(ME[1]):[154,138,106]),L0=24-hw,R0=24+hw,rob=!!O.robe,arm_=!!O.armor,sl=(O.sk&&!arm_&&!rob)?sk:cc,hs=O.head||1,
  hand=sk,wc={sword:'#d8dee8',club:'#6b4a2a',axe:'#6b4a2a',staff:'#7a5230'},WD=o.wp||O.w;
  if(wg){const wcol=k==='garg'?mx(cc,[0,0,0],.15):mx(cd,[0,0,0],.2);part([P([[L0+2,32],[L0-6,14],[L0-16,-2],[L0-12,12],[L0-18,22],[L0-10,26],[L0-12,36],[L0+1,40]]),P([[R0-2,32],[R0+6,14],[R0+16,-2],[R0+12,12],[R0+18,22],[R0+10,26],[R0+12,36],[R0-1,40]])],wcol);flat([L([[L0+1,34],[L0-14,2]]),L([[R0-1,34],[R0+14,2]]),L([[L0,36],[L0-14,22]]),L([[R0,36],[R0+14,22]])],mx(wcol,[255,255,255],.25))}
  if(k==='dking')part([P([[L0-2,30],[R0+2,30],[R0+9,66],[L0-9,66]])],mx(cd,[160,20,40],.5));
  if(O.hood)part([E(11,4,37,34)],cd);
  if(rob){legs(cd,cd,null,0,0,54);part([P([[L0-2,30],[R0+2,30],[R0+6,60],[L0-6,60]])],cc);flat([R(L0-6,57,R0+6,60)],cd)}
  else{legs(cd,bone?cd:'#2b2118',null,0,0,46);part([P([[L0,30],[R0,30],[R0-1,50],[L0+1,50]])],cc)}
  if(bone){flat([L([[L0+2,35],[R0-2,35]]),L([[L0+2,39],[R0-2,39]]),L([[L0+2,43],[R0-2,43]])],cd);if(!back)flat([R(23,32,25,48)],cd)}
  if(arm_)part([E(L0-5,27,L0+5,36),E(R0-5,27,R0+5,36)],cc);
  part([R(L0,43,R0,46)],cd);if(neon)flat([R(L0,44,R0,45)],NC);if(k==='yeti'||k==='were')flat([L([[L0+2,34],[L0+4,38]]),L([[R0-2,34],[R0-4,38]]),L([[24,36],[24,42]])],cd);if(k==='were'&&!back)flat([R(L0-5,48,L0-4,51),R(L0-3,48,L0-2,51),R(R0+1,48,R0+2,51),R(R0+3,48,R0+4,51)],[240,240,230]);if(k==='golem'){flat([L([[L0+2,34],[24,40],[R0-3,47]]),L([[24,46],[27,56]])],o.lava?EMc:cd);if(o.crystal)part([P([[L0-4,27],[L0-6,14],[L0+1,24]]),P([[R0+4,27],[R0+6,14],[R0-1,24]])],[150,225,255])}
  part([R(L0-5,32,L0,44)],sl);part([E(L0-5,42,L0,48)],hand);if(k==='demon')flat([L([[R0-2,50],[R0+8,56],[R0+12,48],[R0+9,44]],2)],sk);
  let hx,hy;
  if(atk){part([P([[R0-1,34],[R0+4,32],[R0+10,20],[R0+5,17]])],sl);part([E(R0+5,18,R0+11,25)],hand);hx=R0+8;hy=21}
  else{part([R(R0,32,R0+5,44)],sl);part([E(R0,42,R0+5,47)],hand);hx=R0+2;hy=45}
  const ln=atk?.7:1;
  if(WD==='sword'){part([R(hx-1,hy-Math.round(26*ln),hx+2,hy+2)],'#d8dee8');part([R(hx-4,hy+1,hx+5,hy+3)],'#7a5a30');if(neon)flat([R(hx,hy-Math.round(26*ln),hx+1,hy)],NC)}
  else if(WD==='club'){part([R(hx-1,hy-14,hx+2,hy+4)],'#6b4a2a');part([E(hx-4,hy-23,hx+5,hy-10)],'#7a5a34');flat([R(hx-3,hy-20,hx-2,hy-18),R(hx+3,hy-17,hx+4,hy-15)],'#c8c8c8')}
  else if(WD==='axe'){part([R(hx-1,hy-Math.round(20*ln),hx+2,hy+5)],'#6b4a2a');part([P([[hx+2,hy-Math.round(20*ln)],[hx+10,hy-Math.round(24*ln)],[hx+10,hy-10],[hx+2,hy-12]])],'#9aa0b0');if(neon)flat([R(hx+9,hy-Math.round(22*ln),hx+10,hy-10)],NC)}
  else if(WD==='staff'){const t=Math.round(32*ln);part([R(hx-1,hy-t,hx+2,hy+14)],'#7a5230');if(neon)flat([E(hx-3,hy-t-6,hx+5,hy-t+2)],NC);else part([E(hx-3,hy-t-6,hx+5,hy-t+2)],mx(cc,[255,255,255],.55))}
  if(WD==='spear'){part([R(hx-1,hy-34,hx+2,hy+12)],'#7a5a34');part([P([[hx-3,hy-32],[hx+4,hy-32],[hx,hy-44]])],'#d8dee8')}
  else if(WD==='scythe'){part([R(hx-1,hy-36,hx+2,hy+14)],'#4a3a2a');part([P([[hx+2,hy-36],[hx+14,hy-34],[hx+22,hy-24],[hx+9,hy-30],[hx+2,hy-27]])],'#c8d2e0')}
  else if(WD==='bow'){flat([L([[hx+3,hy-24],[hx+11,hy-11],[hx+3,hy+2]],2)],[110,74,42]);flat([L([[hx+3,hy-24],[hx+3,hy+2]],1)],[235,235,235])}
  else if(WD==='bigaxe'){part([R(hx-1,hy-28,hx+2,hy+8)],'#4a3a2a');part([P([[hx+2,hy-28],[hx+13,hy-33],[hx+13,hy-13],[hx+2,hy-17]]),P([[hx-1,hy-28],[hx-12,hy-33],[hx-12,hy-13],[hx-1,hy-17]])],'#aab0c0')}
  else if(WD==='bigclub'){part([R(hx-1,hy-16,hx+2,hy+6)],'#4a3220');part([E(hx-6,hy-32,hx+7,hy-12)],'#5a4228');flat([R(hx-8,hy-26,hx-6,hy-24),R(hx+7,hy-24,hx+9,hy-22),R(hx-1,hy-35,hx+1,hy-32)],[210,210,215])}
  else if(WD==='mace'){part([R(hx-1,hy-16,hx+2,hy+4)],'#6b4a2a');part([E(hx-4,hy-25,hx+5,hy-14)],'#c8c8c8')}
  else if(WD==='whip'){part([R(hx-1,hy-6,hx+2,hy+4)],'#4a2a1a');flat([L([[hx,hy-6],[hx+8,hy-16],[hx+15,hy-10],[hx+22,hy-24]],1)],[240,200,120])}
  else if(WD==='fork'){part([R(hx-1,hy-22,hx+2,hy+6)],'#4a3a2a');flat([R(hx-4,hy-28,hx-3,hy-20),R(hx,hy-30,hx+1,hy-22),R(hx+4,hy-28,hx+5,hy-20),R(hx-4,hy-22,hx+6,hy-20)],[200,205,215])}
  else if(WD==='hammer'){part([R(hx-1,hy-26,hx+2,hy+8)],'#5a3a22');part([R(hx-9,hy-38,hx+10,hy-24)],'#8a8a96');flat([R(hx-9,hy-30,hx+10,hy-29)],[170,170,182])}
  if(!back){
   part([E(24-9*hs,21-10*hs,24+9*hs,21+10*hs)],bone?[232,228,208]:sk);if(k==='yeti')part([E(17,15,31,30)],[150,170,190]);
   if(O.ears)part([P([[16,18],[3,11],[15,25]]),P([[32,18],[45,11],[33,25]])],sk);
   if(bone)flat([R(18,18,23,24),R(25,18,30,24)],[20,12,24]);else flat([R(18,19,23,22),R(25,19,30,22)],[26,16,22]);
   flat([R(20,20,22,22),R(27,20,29,22)],eyc);
   if(!bone)flat([L([[18,18],[23,20]]),L([[30,18],[25,20]])],[40,24,24]);
   if(k==='troll')part([E(22,23,26,28)],mx(sk,[0,0,0],.2));
   flat([R(21,27,27,28)],[40,20,20]);if(O.tusks)flat([R(19,25,21,28),R(27,25,29,28)],[240,236,220]);
   if(bone)flat([R(20,27,21,30),R(23,27,24,30),R(26,27,27,30)],[20,12,24]);
   if(O.hood)part([P([[10,22],[10,9],[16,2],[32,2],[38,9],[38,22],[34,30],[30,16],[18,16],[14,30]])],cc);
   if(O.helm){part([P([[13,19],[13,11],[18,5],[30,5],[35,11],[35,19],[31,17],[17,17]])],cc);if(k==='knight'||k==='champ')part([R(23,17,25,27)],cc)}
   if(k==='champ')part([P([[24,6],[28,-2],[38,-4],[33,4]])],[200,50,50]);
   if(O.horns)part([P([[14,12],[8,2],[6,-6],[12,-1],[17,8]]),P([[34,12],[40,2],[42,-6],[36,-1],[31,8]])],[225,215,190]);if(O.crown==='crown'){part([P([[15,10],[15,3],[19,7],[24,0],[29,7],[33,3],[33,10]])],GD);if(k==='dking')flat([R(23,3,25,5)],EMc)}if(O.crown==='leaf')part([P([[14,14],[10,6],[18,8],[20,2],[24,8],[28,2],[30,8],[38,6],[34,14]])],[70,140,60]);if(k==='giant'||k==='yeti')part([P([[13,18],[11,9],[17,3],[24,1],[31,3],[37,9],[35,18],[30,13],[24,16],[18,13]])],cd);
   if(k==='brigand')flat([R(14,13,34,16)],cd);if(k==='dryad')part([R(12,13,16,40),R(32,13,36,40)],cd);
   if(k==='orc')part([R(22,3,26,12)],cd);if(k==='were'){part([R(21,22,32,29)],mx(sk,[255,255,255],.2));flat([R(30,22,32,24)],[26,16,22]);part([P([[15,14],[14,2],[22,10]]),P([[33,14],[34,2],[26,10]])],sk);flat([R(22,28,23,31),R(26,28,27,31)],[245,245,235])}}
  else{
   part([E(14,10,34,31)],(O.hood||O.helm)?cc:bone?[232,228,208]:sk);
   if(O.hood)part([E(11,4,37,34)],cc);
   if(O.helm)part([E(12,5,36,28)],cc);
   if(O.horns)part([P([[14,12],[8,2],[6,-6],[12,-1],[17,8]]),P([[34,12],[40,2],[42,-6],[36,-1],[31,8]])],[225,215,190]);if(O.crown==='crown'){part([P([[15,10],[15,3],[19,7],[24,0],[29,7],[33,3],[33,10]])],GD);if(k==='dking')flat([R(23,3,25,5)],EMc)}if(O.crown==='leaf')part([P([[14,14],[10,6],[18,8],[20,2],[24,8],[28,2],[30,8],[38,6],[34,14]])],[70,140,60]);if(k==='giant'||k==='brigand'||k==='orc'||k==='yeti')part([E(14,6,34,22)],cd);
   if(k==='champ')part([P([[24,6],[28,-2],[38,-4],[33,4]])],[200,50,50]);
   if(O.ears)part([P([[16,18],[3,11],[15,25]]),P([[32,18],[45,11],[33,25]])],sk);if(k==='were')part([P([[15,14],[14,2],[22,10]]),P([[33,14],[34,2],[26,10]])],sk)}
  const A=o.acc||'';if(A){const HR=(c)=>part([P([[14,12],[8,2],[6,-8],[12,-2],[17,8]]),P([[34,12],[40,2],[42,-8],[36,-2],[31,8]])],c);
   if(A==='witch'){part([R(7,8,41,12)],[40,60,44]);part([P([[14,9],[34,9],[27,-6],[31,-14],[23,-8]])],[50,76,54]);flat([R(15,6,33,8)],[200,160,60])}
   if(A==='mitre'){part([P([[15,10],[33,10],[31,-6],[24,-12],[17,-6]])],[236,232,214]);flat([R(23,-6,25,6),R(20,-2,28,0)],[210,60,60])}
   if(A==='necro'){const t_=Math.round(32*ln);part([E(hx-5,hy-t_-10,hx+7,hy-t_+2)],[232,228,208]);flat([R(hx-3,hy-t_-6,hx-1,hy-t_-3),R(hx+3,hy-t_-6,hx+5,hy-t_-3)],[20,12,24])}
   if(A==='cape'){const cp=k==='demon'?[40,50,130]:[110,30,60];flat([R(L0-9,30,L0-3,62),R(R0+3,30,R0+9,62)],cp);if(back)part([P([[L0-4,28],[R0+4,28],[R0+10,64],[L0-10,64]])],cp)}
   if(A==='flame'){part([P([[20,8],[24,-10],[28,8]])],[110,220,230]);part([P([[22,6],[24,-4],[26,6]])],[220,250,255]);part([E(L0-7,25,L0+3,34),E(R0-3,25,R0+7,34)],[110,200,215])}
   if(A==='wrap'){flat([L([[L0,34],[R0,40]],2),L([[L0,42],[R0,36]],2),L([[L0,48],[R0,44]],2)],[226,208,156]);flat([L([[17,16],[31,22]],2),L([[17,22],[31,17]],2)],[226,208,156])}
   if(A==='dhorns')HR([232,225,205]);
   if(A==='thorns')HR([60,60,90]);
   if(A==='spikes'){part([P([[L0-8,28],[L0-15,18],[L0-2,25]]),P([[R0+8,28],[R0+15,18],[R0+2,25]])],[140,140,152])}
   if(A==='obs'){part([P([[L0-4,27],[L0-9,8],[L0+1,24]]),P([[R0+4,27],[R0+9,8],[R0-1,24]]),P([[L0+3,22],[L0+1,12],[L0+7,21]])],[150,70,220]);flat([L([[L0+3,34],[24,42],[R0-3,34]]),L([[24,42],[24,56]])],[190,110,255])}
   if(A==='curl'){part([P([[15,13],[7,10],[3,0],[8,-6],[10,2],[16,8]]),P([[33,13],[41,10],[45,0],[40,-6],[38,2],[32,8]])],[240,180,200])}
   if(A==='cfire'){part([P([[14,10],[16,-8],[20,4],[24,-12],[28,4],[32,-8],[34,10]])],[255,150,40]);flat([R(21,0,27,8)],[255,230,120])}
   if(A==='rocks'){part([E(L0-9,23,L0+3,35),E(R0-3,23,R0+9,35)],[122,122,128]);flat([R(L0-6,27,L0-3,29),R(R0+4,28,R0+7,30)],[90,90,96])}
   if(A==='cyclops'&&!back){part([E(18,15,30,27)],[250,250,240]);flat([R(22,19,26,24)],[160,40,40])}
   if(A==='bolts'){flat([L([[7,4],[12,12],[8,14],[14,24]],2),L([[41,4],[36,12],[40,14],[34,24]],2)],[255,240,120])}
   if(A==='hood'){part([P([[10,22],[10,9],[16,2],[32,2],[38,9],[38,22],[34,30],[30,16],[18,16],[14,30]])],cc)}
   if(A==='lord'){flat([R(L0-9,30,L0-3,64),R(R0+3,30,R0+9,64)],[60,30,100]);if(back)part([P([[L0-4,28],[R0+4,28],[R0+10,66],[L0-10,66]])],[60,30,100]);part([E(hx+3,hy-46,hx+13,hy-36)],[190,120,255]);flat([R(hx+6,hy-43,hx+9,hy-40)],[245,225,255])}}
 };
 const MPF={};for(const k of ['goblin','kobold','orc','bandit','brigand','poacher','cultist','guard','jailer','knight','champ','caster','skel','troll','giant','yeti','were','demon','dking','lich','golem','dryad','garg'])MPF['m'+k]=()=>MP(k);
 const ri=(a,b,c_,d_)=>R(Math.round(a),Math.round(b),Math.round(c_),Math.round(d_)),BKc=[232,176,60],NCc=[143,233,255],EMc=[255,138,48];
 const WG=(sx,sy,wl,col,col2,mode)=>{const U=[[.05,.05],[-.12,-.55],[-.35,-.95],[-.5,-.72],[-.62,-.85],[-.72,-.4],[-.45,.05]],Sw=[[.05,.05],[-.3,-.25],[-.7,-.5],[-.95,-.35],[-.8,-.1],[-.4,.08]],pts=(mode===2?Sw:U).map(([a,b])=>[sx+a*wl,sy+b*wl*(mode===1?-.7:1)]);
  part([P(pts)],col);part([P([pts[0],pts[1],pts[2],pts[3]])],col2)};
 const QT={wolf:{bl:30,bh:13,lg:13,hr:7,sn:8,ear:1,tail:'bush',ruff:1},fox:{bl:24,bh:10,lg:10,hr:6,sn:7,ear:1,tail:'fox',chest:1},boar:{bl:30,bh:17,lg:9,hr:8,sn:9,ear:2,tail:'short',tusk:1,bristle:1},
  goat:{bl:26,bh:12,lg:15,hr:6,sn:6,ear:3,tail:'short',horn:1,beard:1},bear:{bl:40,bh:22,lg:16,hr:10,sn:8,ear:2,tail:'short',hump:1},rat:{bl:20,bh:8,lg:6,hr:5,sn:7,ear:2,tail:'long'},
  salam:{bl:36,bh:9,lg:7,hr:6,sn:7,ear:0,tail:'lizard',spikes:1,fire:1},griffon:{bl:34,bh:16,lg:14,hr:8,sn:6,ear:0,tail:'tuft',wl:36,eagle:1},basil:{bl:34,bh:11,lg:8,hr:7,sn:7,ear:0,tail:'lizard',spikes:1,crest:1},chimera:{bl:36,bh:17,lg:14,hr:8,sn:7,ear:1,tail:'snake',ruff:1,goat2:1},dragon:{bl:48,bh:22,lg:17,hr:10,sn:13,ear:0,tail:'lizard',spikes:1,horn:1,wl:52,neck:14,breath:1}};
 const QD=k=>{const T=QT[k],ME=MON[k],O=ME[3]||{},c=rgb(ME[1]),c2=rgb(ME[2]),{bl,bh,lg,hr,sn}=T,gy=H-2,cx=Math.round(W*.38),by=gy-lg-bh/2,xf=cx+bl/2,xb=cx-bl/2,lw=Math.max(2,Math.round(bh/4)),
  neon=!!o.neon,eyc=neon?NCc:rgb(o.eye2||O.eye||'#ffd04a'),pale=mx(c,[255,255,255],.25),wl=T.wl||(o.wings?30:0),dark=mx(c,[0,0,0],.3),atk_=fr==='atk',mode=atk_?2:fr==='alt'?1:0,hx=xf+hr*.7+(atk_?3:0),hy=by-bh/2-hr*.15-(T.neck||0),
  fl=(x,y,q)=>{flat([E(x-q,y-q*1.6,x+q,y+q*.8)],EMc);flat([E(x-q*.5,y-q*.9,x+q*.5,y+q*.6)],[255,224,90])},hc=T.eagle?c2:c;
  if(wl)WG(xb+bl*.55,by-bh/2+2,wl*.9,dark,mx(c,[0,0,0],.45),mode);
  part([ri(xb+5,by,xb+5+lw,gy),ri(xf-8,by,xf-8+lw,gy)],dark);
  const tl=T.tail;
  if(tl==='bush'||tl==='fox'){const q=tl==='fox'?12:9;part([P([[xb+2,by-bh*.35],[xb-q,by-bh*.1],[xb-q-1,by+bh*.55],[xb+3,by+bh*.25]])],c);if(tl==='fox')part([P([[xb-q+3,by-bh*.05],[xb-q-1,by+bh*.55],[xb-q+4,by+bh*.35]])],[246,244,236])}
  else if(tl==='long')flat([L([[xb+1,by+1],[xb-6,by+3],[xb-12,by-1],[xb-17,by+4]],1)],[216,150,150]);
  else if(tl==='lizard')part([P([[xb+2,by-bh*.4],[xb-16,by+bh*.2],[xb-18,by+bh*.5],[xb+2,by+bh*.4]])],c);
  else if(tl==='tuft'){part([ri(xb-8,by-2,xb+2,by)],c);part([E(xb-13,by-5,xb-6,by+3)],c2)}
  else if(tl==='snake'){flat([L([[xb+2,by],[xb-8,by+6],[xb-14,by-2],[xb-20,by+4]],3)],[70,150,70]);part([E(xb-25,by+1,xb-18,by+8)],[70,150,70]);flat([R(Math.round(xb-23),Math.round(by+3),Math.round(xb-22),Math.round(by+4))],eyc)}
  else part([ri(xb-3,by-bh*.3,xb+2,by-bh*.1+2)],c);
  part([E(xb,by-bh/2,xf,by+bh/2)],c);
  if(T.hump)part([E(xf-16,by-bh/2-6,xf-2,by-bh/2+6)],c);
  if(T.bristle)for(let i=0;i<6;i++){const x=xb+6+i*4;flat([L([[x,by-bh/2+2],[x+1,by-bh/2-3]])],c2)}
  if(T.spikes)for(let i=0;i<7;i++){const x=xb+3+i*4.5;part([P([[x,by-bh/2+1],[x+2,by-bh/2-4],[x+4,by-bh/2+1]])],c2)}
  if(o.acc==='sflame')for(let i=0;i<6;i++){const x=xb+5+i*5;part([P([[x,by-bh/2],[x+2,by-bh/2-9-(i%2)*3],[x+4,by-bh/2]])],[255,170,40])}
  const fx=xf-5,hxl=xb+2;
  part([ri(hxl,by,hxl+lw,gy)],c);flat([ri(hxl,gy-1,hxl+lw+1,gy)],c2);
  if(atk_)part([P([[fx,by],[fx+lw,by],[fx+lw+7,by+lg*.55],[fx+6,by+lg*.55]])],c);else{part([ri(fx,by,fx+lw,gy)],c);flat([ri(fx,gy-1,fx+lw+1,gy)],c2)}
  if(wl)WG(xb+bl*.55+2,by-bh/2+3,wl,c,c2,mode);
  part([P([[xf-7,by-bh/2],[xf+1,by-bh/2-hr*.5],[hx+hr*.3,hy+hr*.2],[xf-1,by+bh*.4]])],c);
  if(T.ruff)part([E(xf-hr*.7,by-bh*.5,xf+hr*.6,by+bh*.7)],pale);
  if(T.chest)flat([E(xf-3,by-1,xf+4,by+bh*.5)],[246,244,236]);
  part([E(hx-hr,hy-hr,hx+hr,hy+hr)],hc);
  if(T.eagle){part([P([[hx+hr-2,hy-2],[hx+hr+9,hy+3],[hx+hr-2,hy+5]])],BKc);if(atk_)flat([ri(hx+hr,hy+3,hx+hr+7,hy+4)],[120,40,40])}
  else{part([ri(hx+1,hy-hr*.3,hx+sn+hr*.6,hy+hr*.6)],pale);flat([ri(hx+sn+hr*.6-2,hy-hr*.3,hx+sn+hr*.6,hy+1)],[26,16,22]);
   if(atk_){part([P([[hx+1,hy+hr*.6],[hx+sn+hr*.5,hy+hr*.6],[hx+sn+hr*.3,hy+hr*.6+5],[hx+2,hy+hr+4]])],[200,70,70]);flat([ri(hx+sn*.5,hy+hr*.5-1,hx+sn*.5+1,hy+hr*.5+1)],[255,255,255])}}
  if(T.crest)for(let i=0;i<4;i++)part([P([[hx-hr+i*3,hy-hr+1],[hx-hr+i*3+2,hy-hr-4],[hx-hr+i*3+4,hy-hr+1]])],c2);
  if(T.goat2){const gx_=xf-11,gy_=by-bh/2-5;part([E(gx_-5,gy_-5,gx_+5,gy_+5)],pale);part([P([[gx_+2,gy_-3],[gx_+9,gy_+2],[gx_+2,gy_+4]])],pale);part([P([[gx_-2,gy_-4],[gx_-6,gy_-12],[gx_,gy_-8]])],[222,212,180]);flat([ri(gx_,gy_-2,gx_+2,gy_)],eyc)}
  if(T.ear===1)part([P([[hx-hr*.7,hy-hr*.6],[hx-hr*.3,hy-hr*2],[hx+hr*.3,hy-hr*.7]])],c);
  else if(T.ear===2)part([E(hx-hr*.8,hy-hr*1.4,hx-hr*.1,hy-hr*.5)],c);
  else if(T.ear===3)part([P([[hx-hr*.5,hy-hr*.4],[hx-hr*1.7,hy-hr*.7],[hx-hr*.5,hy-hr*.1]])],c);
  if(T.horn)part([P([[hx-1,hy-hr*.8],[hx-7,hy-hr*.8-9],[hx-3,hy-hr*.8-10],[hx+3,hy-hr*.8]])],[222,212,180]);
  if(T.beard)part([P([[hx+2,hy+hr*.5],[hx+4,hy+hr*.5+7],[hx+6,hy+hr*.5]])],pale);
  if(T.tusk)part([P([[hx+sn-2,hy+hr*.4],[hx+sn,hy+hr*.4-6],[hx+sn+2,hy+hr*.4]])],[240,236,220]);
  flat([ri(hx+1,hy-hr*.5,hx+3,hy-hr*.5+2)],eyc);
  if(T.fire){if(atk_)for(let i=0;i<4;i++)fl(hx+sn+hr*.6+4+i*5,hy+hr*.4,2+i);fl(xb-17,by+bh*.5,3)}
  if(T.breath&&atk_)for(let i=0;i<5;i++)fl(hx+sn+hr*.6+5+i*6,hy+hr*.4,2+i*1.2);
  if(o.fire&&!T.fire){flat([E(cx-8,by+bh*.15,cx+8,by+bh*.5)],EMc);fl(xb-20,by+4,3)}
  if(neon)flat([L([[xb+3,by-bh/2+1],[xf-3,by-bh/2+1]])],NCc)};
 const WT={eagle:{bl:22,bh:11,wl:34,hr:5},owl:{bl:16,bh:18,wl:26,hr:8,c:[150,130,100],d:[232,226,212]},condor:{bl:26,bh:11,wl:42,hr:5},bat:{bl:9,bh:9,wl:26,hr:4},harpy:{bl:10,bh:16,wl:30,hr:5}};
 const WF=k=>{const T=WT[k],ME=MON[k==='owl'?'eagle':k],c=rgb(T.c||ME[1]),d=rgb(T.d||ME[2]),{bl,bh,wl,hr}=T,cx=Math.round(W*.44),cy=Math.round(H*.58),neon=!!o.neon,eyc=neon?NCc:rgb(o.eye2||'#ffd04a'),mode=atk?2:fr==='alt'?1:0,SKn=[236,196,160];
  let hx=cx+bl/2+1+(atk?2:0),hy=cy-bh*.35;
  WG(cx-2,cy-bh/2+2,wl*.9,mx(c,[0,0,0],.35),mx(c,[0,0,0],.5),mode);
  if(k==='harpy'){hx=cx+1;hy=cy-14;part([R(cx-7,cy-3,cx-3,cy+10)],d);part([E(cx-5,cy-9,cx+5,cy+7)],SKn);part([P([[cx-5,cy+2],[cx+5,cy+2],[cx+4,cy+10],[cx-4,cy+10]])],c);
   part([E(hx-5,hy-5,hx+5,hy+5)],SKn);part([P([[hx-6,hy],[hx-5,hy-7],[hx+3,hy-8],[hx+6,hy-3],[hx+3,hy-4],[hx-3,hy-3]])],d);flat([R(hx+1,hy-1,hx+3,hy+1)],eyc);flat([R(hx+1,hy+3,hx+3,hy+4)],[170,60,70]);
   part([R(cx-3,cy+10,cx-1,cy+16),R(cx+1,cy+10,cx+3,cy+16)],BKc);if(atk)flat([L([[cx+3,cy+14],[cx+10,cy+17]]),L([[cx+1,cy+14],[cx+8,cy+18]])],BKc)}
  else{
   if(k!=='bat')part([P([[cx-bl/2+1,cy-2],[cx-bl/2-11,cy+2],[cx-bl/2-10,cy+8],[cx-bl/2+2,cy+4]])],d);
   part([E(cx-bl/2,cy-bh/2,cx+bl/2,cy+bh/2)],c);
   if(k==='owl')part([E(cx-5,cy-1,cx+5,cy+bh/2-1)],d);
   if(k==='condor')part([E(hx-8,hy+1,hx+1,hy+8)],d);
   part([E(hx-hr,hy-hr,hx+hr,hy+hr)],k==='condor'?[200,150,130]:c);
   if(k==='bat'){part([P([[hx-3,hy-hr],[hx-2,hy-hr-6],[hx+1,hy-hr]]),P([[hx+1,hy-hr],[hx+3,hy-hr-6],[hx+5,hy-hr+1]])],c);flat([R(hx+2,hy+2,hx+3,hy+4),R(hx+4,hy+2,hx+5,hy+4)],[245,245,235]);flat([R(hx,hy-2,hx+2,hy)],eyc)}
   else if(k==='owl'){flat([E(hx-6,hy-5,hx+1,hy+3),E(hx,hy-5,hx+6,hy+3)],d);flat([E(hx-4,hy-3,hx,hy+1),E(hx+1,hy-3,hx+5,hy+1)],eyc);flat([R(hx-1,hy-1,hx,hy)],[20,12,24]);part([P([[hx-1,hy+1],[hx+1,hy+1],[hx,hy+5]])],BKc);part([P([[hx-7,hy-5],[hx-6,hy-11],[hx-3,hy-6]]),P([[hx+3,hy-6],[hx+6,hy-11],[hx+7,hy-5]])],c)}
   else{part([P([[hx+hr-1,hy-2],[hx+hr+7,hy+2],[hx+hr-1,hy+4]])],BKc);flat([R(hx,hy-2,hx+2,hy)],eyc)}
   if(k!=='bat')flat([L([[cx+1,cy+bh/2],[cx+(atk?9:2),cy+bh/2+(atk?5:7)]]),L([[cx-3,cy+bh/2],[cx-2+(atk?7:0),cy+bh/2+(atk?5:7)]])],BKc);
   if(k==='bat'&&o.acc==='batg'){part([P([[hx-5,hy-hr],[hx-7,hy-hr-13],[hx-1,hy-hr]]),P([[hx+1,hy-hr],[hx+4,hy-hr-14],[hx+8,hy-hr+1]])],c);flat([R(hx+2,hy+4,hx+3,hy+8),R(hx+5,hy+4,hx+6,hy+8)],[250,250,240])}
   if(neon)flat([L([[cx-bl/2+2,cy],[cx+bl/2-2,cy]])],NCc)}
  WG(cx+1,cy-bh/2+1,wl,k==='bat'?mx(c,[120,80,150],.45):c,k==='bat'?mx(d,[150,100,180],.4):d,mode)};
 const SP=()=>{const c=rgb(MON.spider[1]),c2=rgb(MON.spider[2]),neon=!!o.neon,eyc=neon?NCc:rgb(o.eye2||'#c82838'),dk_=mx(c,[0,0,0],.3),
   LG=atk?[[[38,27],[24,12],[14,28],[12,44]],[[40,27],[34,8],[28,26],[26,44]],[[43,28],[52,4],[58,14],[60,24]],[[45,29],[62,10],[63,20],[62,28]]]:[[[38,27],[24,12],[14,28],[12,44]],[[40,27],[34,8],[28,26],[26,44]],[[43,28],[50,10],[48,28],[44,44]],[[45,29],[58,16],[60,30],[58,44]]];
  for(const l of LG)flat([L(l.map(([x,y])=>[x+2,y-1]),2)],dk_);
  part([E(8,16,34,38)],c);flat([E(17,24,25,34)],[200,40,40]);part([E(32,20,48,34)],c);part([E(46,22,57,33)],c);
  for(const l of LG)flat([L(l,2)],c);
  flat([R(51,24,53,26),R(54,24,56,26),R(50,28,52,30),R(54,28,56,30)],eyc);flat([R(55,32,56,36),R(51,32,52,36)],[245,245,235]);if(o.acc==='eyes8'){flat([R(52,21,53,22),R(55,21,56,22),R(49,25,50,26),R(57,25,58,26)],eyc);flat([R(55,36,56,41),R(51,36,52,41)],[245,245,235])}
  if(neon)flat([L([[10,27],[32,27]])],NCc)};
 const WM=()=>{const c=rgb(MON.worm[1]),c2=rgb(MON.worm[2]),neon=!!o.neon,eyc=neon?NCc:rgb(o.eye2||'#ffd04a');
  for(let i=0;i<7;i++){const y=72-i*9,ox=atk?Math.round(i*i*.3):0,w=26-i*1.2;part([E(24+ox-w/2,y-6,24+ox+w/2,y+6)],i%2?c:c2)}
  const ox=atk?Math.round(49*.3):0,hy=9;part([E(13+ox,0,35+ox,20)],c);flat([E(17+ox,4,31+ox,16)],[60,10,30]);
  for(let i=0;i<8;i++){const a=i/8*6.283,x=Math.round(24+ox+Math.cos(a)*6.5),y=Math.round(hy+Math.sin(a)*5.5);flat([R(x,y,x+1,y+2)],[245,240,225])}
  flat([R(20+ox,1,22+ox,3),R(26+ox,1,28+ox,3)],eyc);if(o.acc==='maw'){for(let i=0;i<10;i++){const a=i/10*6.283,x=Math.round(24+ox+Math.cos(a)*9),y=Math.round(hy+Math.sin(a)*8);flat([R(x,y,x+1,y+2)],[250,245,230])}part([P([[14+ox,6],[11+ox,-3],[19+ox,2]]),P([[34+ox,6],[37+ox,-3],[29+ox,2]])],c2)}if(neon)flat([L([[24,70],[24+ox,20]])],NCc)};
 const DK_=[20,24,44];
 const GH=k=>{const ME=MON[k],c=rgb(ME[1]),c2=rgb(ME[2]),neon=!!o.neon,eyc=neon?NCc:rgb(o.eye2||(k==='shade'?'#ff5a4a':k==='spectre'?'#9ff0ff':'#ffd04a')),at=fr==='atk',wv=fr==='alt'?2:0;
  if(k==='ghost'){part([P([[9,40],[9,18],[14,8],[34,8],[39,18],[39,40],[42,60-wv],[36,52],[32,60+wv],[27,52],[22,60-wv],[17,52],[12,60+wv],[6,52]])],c);
   if(at)part([P([[10,26],[2,12],[6,10],[14,22]]),P([[38,26],[46,12],[42,10],[34,22]])],c);else part([P([[9,28],[3,38],[7,40],[12,32]]),P([[39,28],[45,38],[41,40],[36,32]])],c2);
   flat([E(15,18,22,28),E(26,18,33,28)],DK_);flat([R(18,22,20,25),R(29,22,31,25)],eyc);flat([E(20,32,28,at?46:40)],DK_)}
  else if(k==='shade'){part([P([[10,62],[8,40],[12,18],[18,6],[30,6],[36,18],[40,40],[38,62],[33,52],[28,62],[24,50],[20,62],[15,52]])],c);flat([E(15,14,33,34)],mx(c,[0,0,0],.6));flat([E(17,20,23,27),E(25,20,31,27)],eyc);
   flat([L([[8,50],[3,58]]),L([[40,50],[45,58]])],c2);if(at)part([P([[36,36],[46,28],[44,36],[46,40]]),P([[12,36],[2,28],[4,36],[2,40]])],c2)}
  else if(k==='soul'){(o.fire?flat:part)([P([[12,12],[8,30],[10,56],[18,40],[30,40],[38,56],[40,30],[36,12],[24,6]])],o.fire?EMc:c2);
   part([P([[16,34],[32,34],[40,62-wv],[34,54],[28,62+wv],[24,54],[18,62-wv],[12,56]])],c);
   if(at)part([P([[16,36],[6,18],[10,16],[19,32]]),P([[32,36],[42,18],[38,16],[29,32]])],c);else part([P([[16,36],[8,48],[12,50],[19,40]]),P([[32,36],[40,48],[36,50],[29,40]])],c);
   part([E(15,12,33,32)],mx(c,[255,255,255],.35));flat([E(18,19,22,25),E(26,19,30,25)],DK_);flat([R(19,21,21,23),R(27,21,29,23)],eyc);flat([E(21,27,27,at?35:31)],DK_)}
  else if(k==='spectre'){part([P([[8,62],[10,34],[14,26],[34,26],[38,34],[40,62],[35,54],[30,62],[24,54],[18,62],[13,54]])],c2);
   part([E(6,26,18,38),E(30,26,42,38)],c);part([P([[14,28],[34,28],[32,46],[16,46]])],c);
   part([P([[14,26],[13,12],[18,4],[30,4],[35,12],[34,26],[30,22],[18,22]])],c);flat([R(17,14,31,18)],DK_);flat([R(19,15,22,17),R(26,15,29,17)],eyc);
   if(o.crown)part([P([[14,6],[14,1],[19,4],[24,0],[29,4],[34,1],[34,6]])],GD);
   if(o.fire)flat([P([[16,6],[18,0],[22,4],[24,0],[28,4],[31,0],[33,6]])],EMc);
   if(at)part([P([[38,30],[46,6],[49,8],[42,32]])],[200,220,240]);else part([R(40,24,43,58)],[200,220,240])}
  else if(k==='wisp'){part([P([[14,38],[24,4],[34,38]])],c2);part([E(12,24,36,48)],c);flat([E(17,29,31,43)],mx(c,[255,255,255],.6));flat([E(18,31,22,36),E(26,31,30,36)],DK_);flat([R(19,33,21,35),R(27,33,29,35)],eyc);flat([R(22,40,26,42)],DK_)}
  else{part([P([[10,62],[6,40],[12,26],[10,10],[18,22],[22,2],[28,20],[34,6],[36,22],[44,12],[44,30],[50,42],[46,62]])],c);
   flat([P([[18,60],[16,40],[22,28],[26,14],[30,28],[36,40],[34,60]])],EMc);flat([E(22,34,32,52)],[255,224,90]);flat([R(21,30,24,34),R(29,30,32,34)],DK_);
   if(at)part([P([[10,34],[0,16],[8,26]]),P([[46,34],[55,16],[48,26]])],c)}};
 const TR=()=>{const bark=[92,66,44],lf=[58,110,52],neon=!!o.neon,eyc=neon?NCc:rgb(o.eye2||'#a8ff90'),at=atk;
  part([P([[16,78],[10,74],[20,70]]),P([[48,78],[54,74],[44,70]])],bark);part([P([[22,78],[18,50],[16,30],[48,30],[46,50],[42,78]])],bark);
  if(at)part([P([[46,38],[58,26],[62,14],[58,14],[54,26],[44,46]])],bark);else part([P([[46,40],[58,44],[62,56],[58,56],[54,48],[46,50]])],bark);
  part([P([[18,40],[6,44],[2,56],[6,56],[10,48],[18,50]])],bark);
  part([E(6,6,38,38),E(22,0,58,34),E(14,14,50,44)],lf);part([E(10,2,30,22)],mx(lf,[255,255,255],.1));
  flat([R(24,40,30,45),R(35,40,41,45)],[26,16,22]);flat([R(26,41,29,44),R(37,41,40,44)],eyc);flat([E(27,48,38,at?62:58)],[26,16,22]);
  if(neon)flat([L([[20,66],[44,66]])],NCc)};
 const HY=()=>{const c=rgb(MON.hydra[1]),c2=rgb(MON.hydra[2]),neon=!!o.neon,eyc=neon?NCc:rgb(o.eye2||'#ffd04a'),n=o.n||3,xs=n===5?[16,32,48,64,80]:[20,48,76],ys=n===5?[22,10,6,12,24]:[18,6,18];
  part([R(28,76,38,86),R(60,76,70,86)],c2);part([E(22,52,78,84)],c);flat([E(32,66,68,84)],mx(c,[255,255,255],.25));
  for(let i=0;i<n;i++){const bx=30+Math.round(i*(40/(n-1))),hx=xs[i]+(atk?6:0),hy=ys[i]+(atk?8:0),mk_=Math.round((bx+hx)/2+(i%2?6:-6));
   part([L([[bx,58],[mk_,Math.round((58+hy)/2)],[hx,hy+4]],5)],c);part([E(hx-8,hy-6,hx+8,hy+6)],c);part([P([[hx+4,hy-2],[hx+15,hy+1],[hx+15,hy+5],[hx+4,hy+6]])],c);
   if(atk)part([P([[hx+4,hy+5],[hx+14,hy+5],[hx+13,hy+11],[hx+3,hy+9]])],[200,70,70]);flat([R(hx+1,hy-3,hx+4,hy)],eyc)}
  if(neon)flat([L([[30,70],[70,70]])],NCc)};
 const WV=()=>{const c=rgb(MON.dragon[1]),c2=rgb(MON.dragon[2]),mode=atk?2:fr==='alt'?1:0,neon=!!o.neon,eyc=neon?NCc:rgb(o.eye2||'#ffd04a');
  WG(44,40,44,mx(c,[0,0,0],.35),mx(c,[0,0,0],.5),mode);
  part([P([[34,52],[10,68],[2,76],[10,82],[36,66]])],c);part([P([[2,76],[0,70],[8,74]])],c2);part([R(40,64,44,84),R(52,64,56,84)],c2);flat([L([[38,84],[46,84]],2),L([[50,84],[58,84]],2)],c2);
  part([E(30,38,62,68)],c);flat([E(40,48,56,66)],mx(c,[255,255,255],.25));if(o.fire)flat([E(41,52,55,64)],EMc);
  part([P([[52,44],[58,28],[70,22],[72,32],[62,48]])],c);const hx=atk?76:72,hy=atk?18:24;
  part([E(hx-9,hy-7,hx+8,hy+7)],c);part([P([[hx+4,hy-2],[hx+16,hy+2],[hx+16,hy+6],[hx+4,hy+7]])],c);
  if(atk)part([P([[hx+4,hy+6],[hx+15,hy+6],[hx+14,hy+12],[hx+3,hy+10]])],[200,70,70]);
  part([P([[hx-4,hy-6],[hx-12,hy-14],[hx-6,hy-5]])],[222,212,180]);flat([R(hx+1,hy-3,hx+4,hy)],eyc);
  WG(48,42,48,c,c2,mode)};
 const WY=()=>{const c=rgb(MON.dragon[1]),c2=rgb(MON.dragon[2]),neon=!!o.neon,eyc=neon?NCc:rgb(o.eye2||'#ffd04a');
  for(let i=15;i>=0;i--){const x=88-i*5.5,y=40+Math.sin(i*.6)*9-(atk&&i<4?(4-i)*2:0),r=Math.max(3,9-i*.38);part([E(x-r,y-r,x+r,y+r)],i%2?c:c2);if(i%3===0)part([P([[x-2,y-r],[x,y-r-4],[x+2,y-r]])],c2)}
  const hx=94,hy=atk?26:34;part([E(hx-8,hy-7,hx+8,hy+7)],c);part([P([[hx+4,hy-3],[hx+15,hy+1],[hx+15,hy+5],[hx+4,hy+6]])],c);
  if(atk)part([P([[hx+4,hy+5],[hx+14,hy+5],[hx+13,hy+11],[hx+3,hy+9]])],[200,70,70]);
  part([P([[hx-4,hy-6],[hx-13,hy-14],[hx-6,hy-5]])],[222,212,180]);flat([R(hx+1,hy-3,hx+4,hy)],eyc);if(neon)flat([L([[10,40],[90,40]])],NCc)};
 const BPF={};for(const k of ['wolf','fox','boar','goat','bear','rat','salam','griffon','basil','chimera','dragon'])BPF['m'+k]=()=>QD(k);BPF.mspider=SP;BPF.mworm=WM;for(const k of ['eagle','owl','condor','bat','harpy'])BPF['m'+k]=()=>WF(k);
 const GACC=k=>{const A=o.acc;if(!A)return;
  if(A==='bansh'){part([P([[12,12],[4,40],[6,64],[14,44]]),P([[36,12],[44,40],[42,64],[34,44]])],[232,232,248]);flat([E(20,27,28,38)],DK_)}
  else if(A==='leaves')part([P([[10,30],[2,25],[8,37]]),P([[38,24],[46,19],[40,32]]),P([[18,8],[15,-1],[25,6]])],[70,150,70]);
  else if(A==='claws'){flat([L([[6,48],[0,62]],2),L([[42,48],[48,62]],2)],[232,232,242]);flat([R(14,25,16,27),R(32,25,34,27)],rgb(o.eye2||'#ff4a3a'))}
  else if(A==='sparks')flat([R(5,20,7,22),R(41,14,43,16),R(9,48,11,50),R(38,40,40,42),R(23,0,25,2),R(44,32,46,34)],[255,240,140])};
 for(const k of ['ghost','shade','soul','spectre','wisp','elem'])BPF['m'+k]=()=>{GH(k);GACC(k)};BPF.mtree=TR;BPF.mhydra=HY;BPF.mwyvern=WV;BPF.mwyrm=WY;
 if(fr==='wicon')wic();else if(fr==='gicon')gic();else ({G,Pa,As,Ne,Ch,M,V,R:Rg,...NPF,...MPF,...BPF})[CLO.spr.has(cls)?cls:eqb(cls)]();
 if(fr==='vc'&&'GMVR'.includes(eqb(cls))){part([P([[33,31],[38,27],[41,17],[37,15]])],TN({G:'#8d98ac',M:'#5b4bc8',V:'#3a2e58',R:'#a8743c'}[eqb(cls)],{G:.4,M:.9,V:.6,R:.35}[eqb(cls)]));part([E(36,10,42,17)],SK);if(eqb(cls)==='G'){if(WK)wpn(39,12,.05,.9);else part([R(38,-8,41,10)],BL)}if(eqb(cls)==='V'){if(WK)wpn(39,12,.05,1,1);else part([P([[37,12],[41,12],[40,-2],[38,0]])],BL)}}
 // v4.0.0 : balancement, accroupi, pas de côté (déformations de l'image avant le contour)
 if(!o.W&&(wk>=0||ci||spz)){const wj=(fy,fx)=>{const q=im.slice();im.fill(0);for(let y=0;y<H;y++){const sy=fy(y);if(sy<0||sy>=H)continue;for(let x=0;x<W;x++){const sx=fx(x,y);if(sx<0||sx>=W)continue;const a=(sy*W+sx)*4,b=y*W*4+x*4;im[b]=q[a];im[b+1]=q[a+1];im[b+2]=q[a+2];im[b+3]=q[a+3]}}},cl=v=>Math.max(0,Math.min(1,v)),P8=PXO,L0=P8+44,L1=P8+62;
  if(wk>=0){const bob=(wk===1||wk===4)?1:0,sw=[1,1,0,-1,-1,0][wk];
   wj(y=>y+bob,(x,y)=>x+Math.round(sw*cl((P8+22-y)/22))-Math.round(sw*cl((y-(P8+44))/18)));
   if(view==='s'){const d=[3,2,-2,-3,-2,2][wk]*((cls==='M'||cls==='Ne'||(cls[0]==='n'&&(fem||'SCVN'.includes(cls[1]))))?.5:1)|0,ad=[-2,-1,1,2,1,-1][wk],sc=(x,v)=>x<24?x-v:x+v;
    wj(y=>y,x=>Math.round(24+(x-24)/.7));
    wj(y=>y,(x,y)=>y>=P8+46?sc(x,d):(y>=P8+30&&y<P8+47)?sc(x,ad):x)}}
  else if(ci){const n=2;wj(y=>y<L0+n?y-n:y<L1?Math.round(L0+(y-L0-n)*(L1-L0)/(L1-L0-n)):y,(x,y)=>x-Math.round(1.6*cl((L0-y)/(L0-P8)))+(y>=P8+56?(x<24?1:-1):0))}
  else if(spz)wj(y=>y,(x,y)=>x+Math.round(1.2*cl((L0-y)/(L0-P8))))}
 // contour sombre
 const out=new Uint8ClampedArray(W*H*4);
 for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=y*W+x;let d=false;for(let dy=-1;dy<=1&&!d;dy++)for(let dx=-1;dx<=1;dx++){const X=x+dx,Y=y+dy;if(X>=0&&Y>=0&&X<W&&Y<H&&im[(Y*W+X)*4+3]){d=true;break}}
  if(im[i*4+3]){out[i*4]=im[i*4];out[i*4+1]=im[i*4+1];out[i*4+2]=im[i*4+2];out[i*4+3]=255}else if(d){out[i*4]=OUT[0];out[i*4+1]=OUT[1];out[i*4+2]=OUT[2];out[i*4+3]=255}}
 return out}
const PXHR=['#b4552c','#e8c050','#cfc6f4','#3a2c3c','#c04a7a','#4a9ad8','#58b868','#e87838','#7a5a3a','#f0e0a0','#8a58c8','#d8d8e8'],PXEC=f=>f?'#e86aa8':'#3a7ad8',PXHS=id=>(Math.abs(id|0)*7+2)%5;
PG.dep={WPM,PXHR,thFor,THP};
const WIC={};
// v4.1.9 : recadre une image sur ses pixels visibles (dague)
function icoTrim(cv){const w=cv.width,h=cv.height,d=cv.getContext('2d').getImageData(0,0,w,h).data;let a=w,b=h,c=-1,e=-1;for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(d[(y*w+x)*4+3]){a=Math.min(a,x);c=Math.max(c,x);b=Math.min(b,y);e=Math.max(e,y)}
 if(c<0)return cv;const o=document.createElement('canvas');o.width=c-a+1;o.height=e-b+1;o.getContext('2d').drawImage(cv,a,b,o.width,o.height,0,0,o.width,o.height);return o}
// v4.1.9 : paire de bottes de profil. o contour, a revers, l reflet, m cuir, d ombre, s semelle
const BOOTP=['oooooo.....','oaaaaao....','oaaaaao....','.olmmdo....','.olmmdo....','.olmmdo....','.olmmdo....','.olmmmoo...','.olmmmmmoo.','.olmmmmmmdo','.odmmmmmddo','.osssssssso','.ooooooooo.'];
function bootIcon(im){const n={};for(let i=0;i<im.length;i+=4)if(im[i+3]){const k=im[i]+','+im[i+1]+','+im[i+2];if(im[i]*.3+im[i+1]*.59+im[i+2]*.11>40)n[k]=(n[k]||0)+1}
 const top=Object.keys(n).sort((a,b)=>n[b]-n[a]).slice(0,5).map(k=>k.split(',').map(Number)),lum=c=>c[0]*.3+c[1]*.59+c[2]*.11,mx=(c,t,v)=>c.map((q,i)=>Math.round(q+(t[i]-q)*v));
 const m=top[0]||[128,86,52],others=top.slice(1).filter(c=>Math.abs(lum(c)-lum(m))>12).sort((a,b)=>lum(b)-lum(a)),a=others[0]||mx(m,[255,220,150],.35),col={o:[34,20,38],a,l:mx(m,[255,255,255],.28),m,d:mx(m,[20,10,30],.28),s:mx(m,[20,10,30],.55)};
 const cv=document.createElement('canvas');cv.width=17;cv.height=16;const g=cv.getContext('2d');
 for(const[ox,oy,sh]of[[6,0,.3],[0,3,0]])BOOTP.forEach((r,y)=>{for(let x=0;x<r.length;x++){const c=col[r[x]];if(!c)continue;g.fillStyle='rgb('+mx(c,[20,10,30],sh)+')';g.fillRect(ox+x,oy+y,1,1)}});return cv}
window.wIcon=(c,t,id)=>{c=eqb(c);t=Math.max(0,Math.min(14,t|0));if(!t)return null;const th=thFor(t,id),k=c+t+'_'+th;if(WIC[k])return WIC[k];try{const C={G:{OY:0,XO:0},V:{OY:0,XO:0},M:{OY:4,XO:6},R:{OY:-12,XO:8}}[c];if(!C)return null;const im=pxSprite(c,0,'f','wicon',{W:24,H:44,OY:C.OY,XO:C.XO,wt:t,wth:th,wc:c,col:null,hair:'#000',eye:'#000'}),cv=document.createElement('canvas');cv.width=24;cv.height=44;cv.getContext('2d').putImageData(new ImageData(im,24,44),0,0);return WIC[k]='<img alt="" src="'+(c==='V'?icoTrim(cv):cv).toDataURL()+'" style="height:2em;width:auto;vertical-align:-.55em;image-rendering:pixelated">'}catch(e){return null}};
const GIC={};
window.gIcon=(c,k,t,id)=>{c=eqb(c);t=Math.max(0,Math.min(14,t|0));if(!t||!'abs'.includes(k))return null;const th=thFor(t,id),key=c+k+t+'_'+th;if(GIC[key])return GIC[key];try{let d;if(k==='a')d={G:[34,32,-7,-19],V:[18,24,-14,-24],R:[18,28,-14,-24],M:[26,38,-11,-25]}[c];else if(k==='b')d=[20,16,-9,-48];else d=[18,30,0,-29];if(!d)return null;
 const o={W:d[0],H:d[1],XO:d[2],OY:d[3],wc:c,gk:k,col:null,hair:'#000',eye:'#000'};if(k==='a'){o.at=t;o.ath=th}else if(k==='b'){o.bt=t;o.bth=th}else{o.sh=t;o.sth=th}
 const im=pxSprite(c,0,'f','gicon',o),cv=document.createElement('canvas');cv.width=d[0];cv.height=d[1];cv.getContext('2d').putImageData(new ImageData(im,d[0],d[1]),0,0);return GIC[key]='<img alt="" src="'+(k==='b'?bootIcon(im):cv).toDataURL()+'" style="height:'+(k==='b'?'1.65em':'2em')+';width:auto;vertical-align:-.55em;image-rendering:pixelated">'}catch(e){return null}};
function buildSprHero(cls,fem,id,col,eq,coif){eq=eq||{};if(pgUse(cls,fem))return buildPgHero(cls,fem,id,eq,coif,col);
 const cv=document.createElement('canvas');cv.width=PXW*PXF.length;cv.height=PXH;const cx=cv.getContext('2d'),o={col:col||null,wth:thFor(eq.w,id),ath:thFor(eq.a,id),bth:thFor(eq.b,id),sth:thFor(eq.s,id),wt:eq.w|0,at:eq.a|0,bt:eq.b|0,sh:eq.s|0,hair:PXHR[(id*5+3)%PXHR.length],eye:PXEC(fem),hs:PXHS(id)};
 PXF.forEach(([v,fr],i)=>cx.putImageData(new ImageData(pxSprite(cls,fem?1:0,v,fr,o),PXW,PXH),i*PXW,0));
 const tex=new TH.CanvasTexture(cv);tex.magFilter=tex.minFilter=TH.NearestFilter;tex.generateMipmaps=false;tex.colorSpace=TH.SRGBColorSpace;tex.repeat.set(1/PXF.length,1);
 const ph=PXSZ,u=ph/PXH,mat=new TH.MeshBasicMaterial({map:tex,alphaTest:.5,side:TH.DoubleSide});mat.userData.px=1;
 const mesh=new TH.Mesh(new TH.PlaneGeometry(ph*PXW/PXH,ph).translate(0,ph/2-2*u,0),mat);mesh.castShadow=true;
 const m=new TH.Group(),G0=()=>new TH.Group(),lg=[0,1].map(()=>({hip:G0(),kn:G0()})),ar=[0,1].map(()=>({sh:G0(),el:G0()})),piv=G0();piv.add(mesh);m.add(piv);
 ar.forEach((a,i)=>{a.sh.add(a.el);m.add(a.sh)});
 const ham=mkPxHammer(),uu=PXSZ/PXH;ham.g.position.set((33.5-24)*uu,PXSZ-2*uu-52.5*uu,.1);piv.add(ham.g);
 m.userData={legs:lg,arms:ar,T:G0(),body:G0(),cls,fem,orb:null,H:0,mesh,piv,tex,mat,ham};return m}
// v4.3.0 : nouveau Guerrier : même structure que buildSprHero, case 112x128, pied au sol
function buildPgHero(cls,fem,id,eq,coif,col){const pa=cls==='Pa',vo=cls==='V',as=cls==='As',mg=cls==='M',{cw,ch}=PG_M,hair=pgHairOf(id,col),cv=mg?mSheet(id,eq,coif,hair):as?vSheet(id,eq,coif,hair,fem,1):vo?vSheet(id,eq,coif,hair,fem):pa?paSheet(id,eq,coif,fem,col):pgSheet(id,eq,fem,coif,col),tex=pxTex(cv,PXF.length),uu=PXSZ/PXH,u=uu*PG_S,mat=new TH.MeshBasicMaterial({map:tex,alphaTest:.5,side:TH.DoubleSide});mat.userData.px=1;
 const mesh=new TH.Mesh(new TH.PlaneGeometry(cw*u,ch*u).translate(0,ch*u/2-(ch-PG_FEET)*u,0),mat);mesh.castShadow=true;
 const m=new TH.Group(),G0=()=>new TH.Group(),lg=[0,1].map(()=>({hip:G0(),kn:G0()})),ar=[0,1].map(()=>({sh:G0(),el:G0()})),piv=G0();piv.add(mesh);m.add(piv);
 ar.forEach((a,i)=>{a.sh.add(a.el);m.add(a.sh)});
 const ham=mkPxHammer();piv.add(ham.g);
 // poses de profil : case plus large, ancrée au même point au sol (x=74, y=136)
 // Paladin : son axe est à x=80 (image de marche centrée dans la case 160)
 // Voleur : 24 poses (an), même ancre que le Paladin (x=80)
 const A=PG_A.w,an=vo?PG_VA.p.length:PG_A.n,atx=mg?tex:pxTex(vo||as?vActSheet(eq,id,coif,hair,fem,as):pa?paActSheet(id,eq,coif,fem,col):pgActSheet(id,eq,fem,coif,col),vo||as?PG_VCOLS:an),geoA=mg?mesh.geometry:new TH.PlaneGeometry(A*u,A*u).translate((A/2-(pa||vo||as?80:74))*u,(A/2-(A-136))*u,0);
 if(vo||as){atx.repeat.y=1/Math.ceil(an/PG_VCOLS);atx.offset.y=1-atx.repeat.y}
 mat.userData.alt=[tex,atx];mat.userData.geos=[mesh.geometry,geoA];
 m.userData={legs:lg,arms:ar,T:G0(),body:G0(),cls,fem,orb:null,H:0,mesh,piv,tex,atx,geoW:mesh.geometry,geoA,mat,ham,pg:1,pa,vo,as,mg,hair,an};return m}
// affiche la pose d'action (o.act) ou revient au sprite de marche ; petit saut de victoire
function pgApply(o,h,tm){const u=o.m.userData,act=o.act;u.mesh.geometry=act!=null?u.geoA:u.geoW;
 if(act!=null){u.mat.map=u.atx;if(u.vo||u.as)u.atx.offset.set(act%PG_VCOLS/PG_VCOLS,1-(1+(act/PG_VCOLS|0))*u.atx.repeat.y);else u.atx.offset.x=act/u.an}else if(u.mat.map===u.atx)u.mat.map=u.tex;
 if(!ride(h)){const win=o.af===12&&h.st!=='fight';if(!win)o.vs=null;else if(o.vs==null)o.vs=tm;const t=win?tm-o.vs:9;u.piv.position.set(0,t<1?Math.abs(Math.sin(t*PI/.5))*16*PXSZ/PXH*PG_S:0,0)}}
function mkPxHammer(){const cv=document.createElement('canvas');cv.width=12;cv.height=16;const x=cv.getContext('2d');
 for(let y=0;y<16;y++)for(let i=0;i<12;i++){let c=null;if(y<5&&i>=1&&i<=10){c=(y===0||y===4||i===1||i===10)?'#1e1426':y===1?'#c8ccd8':y===3?'#5a5f6e':'#8a8fa0'}else if(y>=5&&i>=4&&i<=7){c=(i===4||i===7||y===15)?'#1e1426':i===5?'#8a5a30':'#5a3a1c'}if(c){x.fillStyle=c;x.fillRect(i,y,1,1)}}
 const t=new TH.CanvasTexture(cv);t.magFilter=t.minFilter=TH.NearestFilter;t.generateMipmaps=false;t.colorSpace=TH.SRGBColorSpace;const u=PXSZ/PXH,mt=new TH.MeshBasicMaterial({map:t,alphaTest:.5,side:TH.DoubleSide,fog:false});mt.userData.px=1;
 const g=new TH.Group(),me=new TH.Mesh(new TH.PlaneGeometry(12*u,16*u).translate(0,4*u,0),mt);g.add(me);g.visible=false;g.scale.setScalar(1.4);return{g,mat:mt}}
function buildSprNpc(r,fem,id){const F4=NPXF,
 cv=document.createElement('canvas');cv.width=PXW*F4.length;cv.height=PXH;const cx=cv.getContext('2d'),o={col:null,hair:PXHR[(id*5+3)%PXHR.length],eye:PXEC(fem),hs:PXHS(id)};
 F4.forEach(([v,fr],i)=>cx.putImageData(new ImageData(pxSprite('n'+r,fem?1:0,v,fr,o),PXW,PXH),i*PXW,0));
 const tex=new TH.CanvasTexture(cv);tex.magFilter=tex.minFilter=TH.NearestFilter;tex.generateMipmaps=false;tex.colorSpace=TH.SRGBColorSpace;tex.repeat.set(1/F4.length,1);
 const ph=PXSZ,u=ph/PXH,mat=new TH.MeshBasicMaterial({map:tex,alphaTest:.5,side:TH.DoubleSide});mat.userData.px=1;
 const mesh=new TH.Mesh(new TH.PlaneGeometry(ph*PXW/PXH,ph).translate(0,ph/2-2*u,0),mat);mesh.castShadow=true;
 const m=new TH.Group(),piv=new TH.Group();piv.add(mesh);m.add(piv);const ham=mkPxHammer();ham.g.position.set((39-24)*u,ph-2*u-24.5*u,.1);piv.add(ham.g);
 m.userData={piv,tex,mat,ham};return m}
function mkPxTorch(){const M=['...OO...','..ORRO..','.ORMMRO.','.ORMMRO.','ORMYYMRO','ORMYYMRO','ORMYYMRO','.ORMMRO.','.OWWWWO.','.OWWWWO.'],C={O:'#1e1426',R:'#e0501a',M:'#ff9a2a',Y:'#ffe070',W:'#2a1e14',H:'#7a4a28',h:'#4a2c16'},cv=document.createElement('canvas');cv.width=8;cv.height=20;const x=cv.getContext('2d');
 for(let y=0;y<20;y++){const r=y<10?M[y]:y<19?'..OHhO..':'..OOOO..';for(let i=0;i<8;i++){const c=C[r[i]];if(c){x.fillStyle=c;x.fillRect(i,y,1,1)}}}
 const t=new TH.CanvasTexture(cv);t.magFilter=t.minFilter=TH.NearestFilter;t.generateMipmaps=false;t.colorSpace=TH.SRGBColorSpace;const u=PXSZ/PXH,mt=new TH.MeshBasicMaterial({map:t,alphaTest:.5,side:TH.DoubleSide,fog:false});mt.userData.px=1;return new TH.Mesh(new TH.PlaneGeometry(8*u,20*u),mt)}
const PXFR=[];
function sprUpd(o,h,mv,fg,tm,tb){
 const u=o.m.userData,az=K.az||0;o.m.rotation.y=az-o.ry;
 const rel=o.ry-az,fx=Math.sin(rel),fz=Math.cos(rel),bk=fz<-.35;
 let f=bk?3:0;if(fg||o.af===12||o.af===7){if(o.af>0)f=o.af}else if(mv){const k=Math.floor((((o.ph*7/(2*Math.PI))%1)+1)%1*6);f=Math.abs(fx)>.78?WKS[k]:bk?WKB[k]:WKF[k]}else if(o.bl)f=bk?8:7;
 if(u.pg){o.act=pgPose(o,h,mv,fg,tm,ride(h));if(fg||o.af===12||o.af===7||(!mv&&o.bl))f=bk?3:0}
 u.tex.offset.x=f/PXF.length;u.piv.rotation.x=-Math.atan2(cam3.position.y,Math.hypot(cam3.position.x-K.tx,cam3.position.z-K.tz))*.75;u.piv.scale.x=fx<-.35?-1:1;{const tg=!u.pg&&o.cr&&h.st==='loot'?.72+.03*Math.sin(tm*5+h.id):1;o.cz=o.cz==null?1:o.cz+(tg-o.cz)*.15;u.piv.scale.y=o.cz}u.piv.rotation.z=o.fr?-.22*u.piv.scale.x:0;
 const l=Math.min(1.1,1-.5*dk()+.4*tb);u.mat.color.setRGB(l,l,l*1.06);{const hm=u.ham;hm.g.visible=!!o.bl&&!u.pg;if(o.bl){hm.g.rotation.z=.35+.85*Math.sin(tm*8+h.id);hm.mat.color.setRGB(l,l,l*1.06)}}
 const wx=Math.cos(az)*.55+Math.sin(az)*.15,wz=-Math.sin(az)*.55+Math.cos(az)*.15,c=Math.cos(o.ry),s2=Math.sin(o.ry);
 o.lt.position.x=wx*c-wz*s2;o.lt.position.z=wx*s2+wz*c}
// ===== v3.5.4 : attaques par classe, projectiles pixel-art, poussière de mort =====
const FXT={},FXL=[];let fxG=null;
function fxTex(k){if(FXT[k])return FXT[k];const D={arc:[22,22],streak:[28,7],orb:[11,11],dag:[15,5],arr:[19,5],plus:[7,7],bstar:[9,9],bolt1:[18,60],bolt2:[18,60],dust:[16,14],mote:[5,5],lf:[6,4],ring:[32,32],bub:[32,32],rock:[9,8],coin:[7,7],foot:[7,10],flame:[9,14],shld:[16,20],spike:[32,32]},[w,h]=D[k],cv=document.createElement('canvas');cv.width=w;cv.height=h;const g=cv.getContext('2d'),px=(c,x,y,a,b)=>{g.fillStyle=c;g.fillRect(x,y,a||1,b||1)};
 if(k==='arc'){for(let y=0;y<h;y++)for(let x=0;x<w;x++){const d1=Math.hypot(x+.5-5,y+.5-11),d2=Math.hypot(x+.5+2,y+.5-11);if(d1<=15&&d2>14){const e=15-d1;px(e<1.6||d2-14<1.2?'#ffffff':e<3.4?'#bfeaff':'#6fb8f0',x,y)}}}
 else if(k==='streak'){for(let x=0;x<w;x++){const t=x/(w-1),hw=.5+t*2.5;g.globalAlpha=.25+.75*t;for(let y=0;y<h;y++){const d=Math.abs(y-3);if(d<=hw)px(d<1?'#ffffff':d<2?'#bfeaff':'#6fb8f0',x,y)}}g.globalAlpha=1}
 else if(k==='orb'){for(let y=0;y<h;y++)for(let x=0;x<w;x++){const d=Math.hypot(x-5,y-5);if(d<=5.2)px(d<1.8?'#ffffff':d<3.3?'#8fe9ff':d<4.3?'#3fb8f0':'#1b5f9a',x,y)}}
 else if(k==='dag'){const M=['..og.ooooooo...','ohhgobbbbbbbbo.','ohhgbbbbbbbbbbo','ohhgobbbbbbbbo.','..og.ooooooo...'],C={o:'#1e1426',b:'#dfe6f0',g:'#d8a83a',h:'#6a4a2a'};M.forEach((r,y)=>{for(let x=0;x<r.length;x++)if(C[r[x]])px(C[r[x]],x,y)})}
 else if(k==='arr'){px('#1e1426',3,1,12,1);px('#1e1426',3,3,12,1);px('#8a5a2a',3,2,12,1);px('#1e1426',15,0,2,1);px('#1e1426',15,4,2,1);px('#cfd6e2',15,1,2,3);px('#cfd6e2',17,2,2,1);px('#1e1426',18,1,1,1);px('#1e1426',18,3,1,1);px('#e8e8e8',0,1,3,3);px('#d04a4a',0,0,1,1);px('#d04a4a',0,4,1,1);px('#d04a4a',2,0,1,1);px('#d04a4a',2,4,1,1)}
 else if(k==='bstar'){const M=['....o....','...oyo...','...oyo...','.ooyyyoo.','oyyywyyyo','.ooyyyoo.','...oyo...','...oyo...','....o....'],C={o:'#8a5a10',y:'#ffd24a',w:'#fff6c0'};M.forEach((r,y)=>{for(let x=0;x<9;x++)if(C[r[x]])px(C[r[x]],x,y)})}
 else if(k==='plus'){for(let y=0;y<7;y++)for(let x=0;x<7;x++){const t=(x>=2&&x<=4)||(y>=2&&y<=4);if(!t||((x<2||x>4)&&(y<2||y>4)))continue;px(x===3&&y===3?'#ffffff':(x===3||y===3)?'#8dffb0':'#1c5a34',x,y)}}
 else if(k==='bolt1'||k==='bolt2'){const xs=k==='bolt1'?[9,5,12,6,12,7,11,8,9]:[9,13,6,12,5,11,6,10,9],n=xs.length-1,seg=(c,t)=>{for(let i=0;i<n;i++){const ya=i*h/n,yb=(i+1)*h/n,st=Math.ceil(yb-ya)*2;for(let j=0;j<=st;j++){const u=j/st,x=xs[i]+(xs[i+1]-xs[i])*u,y=ya+(yb-ya)*u;px(c,Math.round(x-(t-1)/2),Math.round(y),t,1)}}};seg('#2a7acf',5);seg('#9fdcff',3);seg('#ffffff',1)}
 else if(k==='lf'){px('#ffffff',1,1,4,2);px('#ffffff',2,0,2,1);px('#ffffff',2,3,2,1);px('#cfcfcf',5,2,1,1)}
 else if(k==='mote'){px('#ffffff',2,0,1,5);px('#ffffff',0,2,5,1);px('#ffffff',1,1,3,3)}
 else if(k==='dust'){const ins=(x,y)=>Math.hypot(x+.5-8,y+.5-8)<=5.5||Math.hypot(x+.5-4.5,y+.5-9)<=4||Math.hypot(x+.5-11.5,y+.5-9)<=4;for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(ins(x,y)){const ed=!ins(x-1,y)||!ins(x+1,y)||!ins(x,y-1)||!ins(x,y+1);px(ed?'#6a5a3e':y<7?'#e6d8b4':y>11?'#a08a62':'#cdb88c',x,y)}}
  if(k==='ring'){for(let y=0;y<32;y++)for(let x=0;x<32;x++){const d=Math.hypot(x+.5-16,y+.5-16);if(d>=13.6&&d<=15.6)px(d<14.6?'#ffffff':'#d8ecff',x,y)}}
 else if(k==='bub'){for(let y=0;y<32;y++)for(let x=0;x<32;x++){const d=Math.hypot(x+.5-16,y+.5-16);if(d<=15.5){g.globalAlpha=d>13.5?1:.22+.18*(d/13.5);px('#ffffff',x,y)}}g.globalAlpha=.85;px('#ffffff',8,7,5,2);px('#ffffff',7,9,2,4);g.globalAlpha=1}
 else if(k==='rock'){const R=[[3,3],[2,5],[1,7],[0,9],[0,9],[1,8],[2,6],[3,4]];R.forEach(([a,n],y)=>px(y<3?'#e6dfd2':y<6?'#c8c0b4':'#8c8478',a,y,n,1));px('#ffffff',3,1,2,1)}
 else if(k==='coin'){for(let y=0;y<7;y++)for(let x=0;x<7;x++){const d=Math.hypot(x-3,y-3);if(d<=3.3)px(d>2.4?'#ffffff':'#fff2b0',x,y)}px('#e0b020',3,2,1,3)}
 else if(k==='foot'){for(let y=0;y<10;y++)for(let x=0;x<7;x++){const sole=Math.hypot((x-3)/2.6,(y-6.4)/3.4)<=1,heel=y>=8&&Math.hypot(x-3,y-8.5)<=1.6;if(sole||heel)px('#ffffff',x,y)}[[1,1],[2,0],[4,0],[5,1]].forEach(([x,y])=>px('#ffffff',x,y,1,1))}
 else if(k==='flame'){for(let y=0;y<14;y++){const hf=y<4?y*.5+.3:y<9?2+(y-4)*.5:Math.max(0,4.4-(y-9)*.8);for(let x=0;x<9;x++){const d=Math.abs(x-4);if(d<=hf)px(d<hf*.4?'#ffffff':d<hf*.75?'#ffe9b0':'#ffb060',x,y)}}}
 else if(k==='shld'){for(let y=0;y<20;y++){const hw=y<12?7:Math.max(0,7-(y-11)*.85);for(let x=0;x<16;x++){const d=Math.abs(x-7.5);if(d<=hw)px(d>hw-1.1||y===0?'#ffffff':'#cfe3ff',x,y)}}px('#ffffff',7,3,2,13);px('#ffffff',3,7,10,2)}
 else if(k==='spike'){for(let y=0;y<32;y++)for(let x=0;x<32;x++){const d=Math.hypot(x+.5-16,y+.5-16);if(d>=11&&d<=13)px('#ffffff',x,y)}for(let i=0;i<12;i++){const a=i*.5236;for(let r=13;r<=16;r++){const w2=r<15?2:1;px('#ffffff',Math.round(16+Math.cos(a)*r)-(w2>1?0:0),Math.round(16+Math.sin(a)*r),w2,w2)}}}
 
 const t=new TH.CanvasTexture(cv);t.magFilter=t.minFilter=TH.NearestFilter;t.generateMipmaps=false;t.colorSpace=TH.SRGBColorSpace;return FXT[k]=t}
function fxSp(k,sx,sy,x,y,z){if(!fxG||!fxG.parent){fxG=new TH.Group();scn.add(fxG)}const s=new TH.Sprite(new TH.SpriteMaterial({map:fxTex(k),transparent:true,depthTest:false,depthWrite:false,fog:false}));s.renderOrder=8;s.scale.set(sx,sy,1);s.position.set(x,y,z);s.visible=false;fxG.add(s);return s}
function fxAdd(s,t0,dur,upd){FXL.push({s,t0,dur,upd})}
function fxUpd(tm){for(let i=FXL.length-1;i>=0;i--){const f=FXL[i],p=(tm-f.t0)/f.dur;if(p>=1){fxG.remove(f.s);f.s.material.dispose();FXL.splice(i,1);continue}f.s.visible=p>=0;if(p>=0)f.upd(p,f.s)}}
function fxAng(x,y,z,dx,dy,dz){V3a.set(x,y,z).project(cam3);const a=V3a.x,b=V3a.y;V3a.set(x+dx,y+dy,z+dz).project(cam3);return Math.atan2((V3a.y-b)*H,(V3a.x-a)*W)}
function fxProj(k,a,b,t0,dur,sz,arc,trail){for(let j=0;j<=(trail||0);j++){const s=fxSp(k,sz[0],sz[1],a[0],a[1],a[2]);s.material.opacity=1-.3*j;if(j)s.scale.multiplyScalar(1-.12*j);
  fxAdd(s,t0+j*.03,dur,(p,s)=>{const x=a[0]+(b[0]-a[0])*p,y=a[1]+(b[1]-a[1])*p+Math.sin(p*PI)*arc,z=a[2]+(b[2]-a[2])*p;s.position.set(x,y,z);s.material.rotation=fxAng(x,y,z,b[0]-a[0],b[1]-a[1]+arc*PI*Math.cos(p*PI),b[2]-a[2])})}}
// ===== v3.7.0 : animations ralenties, coups espacés, 4 attaques par classe (paliers niv. 1/5/10/20) =====
const ASL=1.5,AGP=[1.8,3.6],HLV=[1,5,10,20];
function heroSp(h,sp,tm,x,y,z){const mo=MN.get(h.id),tx=mo?mo.g.position.x-(mo.b.S0||1)*1.2:x+5.5,gy=y+(ride(h)?HS*RDY():0),A=ASL;
 const TT={g_:'#8af5a0',a_:'#ffc86a'}[sp[1].slice(0,2)];if(TT){const n0=FXL.length;heroSp(h,[sp[0],sp[1].slice(2),sp[2]],tm,x,y,z);for(let i=n0;i<FXL.length;i++)FXL[i].s.material.color.set(TT);return}
 switch(sp[1]){
  case 'arc':{const sg=sp[2]?1:0,X=x+1.6+sg*.4,Y=gy+2.6-sg*.5,s=fxSp('arc',3.6,3.6,X,Y,z);fxAdd(s,tm,.3*A,(p,s)=>{s.material.rotation=fxAng(X,Y,z,1,0,0)-.6+sg*2.4;s.material.opacity=1-p*p;const k=.75+.5*p;s.scale.set(3.6*k,3.6*k,1)});break}
  case 'streak':{const dy=sp[2]||0,X=x+2.8,Y=gy+1.9+dy*.5,s=fxSp('streak',5,.9,X,Y,z);fxAdd(s,tm,.24*A,(p,s)=>{s.material.rotation=fxAng(X,Y,z,1,0,0)+dy*.5;s.material.opacity=1-p;s.scale.set(5*(.5+.5*p),.9*(1-.4*p),1)});break}
  case 'slam':{heroSp(h,[sp[0],'arc',0],tm,x,y,z);if(mo)fxDust(mo);break}
  case 'cross':{const s=fxSp('plus',4.2,4.2,tx-.5,gy+2.3,z);s.material.color.set('#ffe08a');fxAdd(s,tm,.5*A,(p,s)=>{s.material.opacity=1-p*p;const k=4.2*(.7+.6*p);s.scale.set(k,k,1)});break}
  case 'pierce':fxProj('arr',[x+1.3,gy+2,z],[tx+5,gy+2,z],tm,.35*A,[3.4,.7],0,3);break;
  case 'orb':fxProj('orb',[x+1.5,gy+2.1,z],[tx,gy+2.1,z],tm,.4*A,[1.1,1.1],.3,3);break;
  case 'bolt':{const s=fxSp('bolt1',2.2,8.4,tx,gy+4.2,z);fxAdd(s,tm,.34*A,(p,s)=>{s.material.map=fxTex(Math.floor(p*12)%2?'bolt2':'bolt1');s.material.opacity=p<.7?1:1-(p-.7)/.3});break}
  case 'beam':{const X0=x+1.6,Y=gy+2.3,L=Math.max(2,tx-X0),mx=(X0+tx)/2,s=fxSp('streak',L,1.4,mx,Y,z),o2=fxSp('orb',2.2,2.2,tx,Y,z),d=.85*A;
   fxAdd(s,tm,d,(p,s)=>{s.material.rotation=fxAng(mx,Y,z,1,0,0);s.material.opacity=p<.12?p/.12:p>.8?(1-p)/.2:1;s.scale.set(L,1.4*(.8+.2*Math.sin(p*40)),1)});
   fxAdd(o2,tm,d,(p,s)=>{s.material.opacity=p<.12?p/.12:p>.8?(1-p)/.2:1;const k=2.2*(.8+.3*Math.sin(p*30));s.scale.set(k,k,1)});break}
  case 'rain':{const i=sp[2],dx=((i*37)%5-2)*.9,dz=((i*53)%5-2)*.7;fxProj('orb',[tx+dx*.4,gy+10,z+dz*.5],[tx+dx*.2,gy+1.4,z+dz*.3],tm,.5*A,[1,1.3],0,2);break}
  case 'heal':for(let i=0;i<7;i++){const a=i*2.4,r=.9+.5*(i%3),s=fxSp('plus',.8,.8,x+Math.cos(a)*r,gy+.4,z+Math.sin(a)*r);fxAdd(s,tm+i*.1*A,.9*A,(p,s)=>{s.position.y=gy+.4+p*3.6;s.material.opacity=Math.min(1,(1-p)*2.2)})}break;
  case 'dag':{const i=sp[2];fxProj('dag',[x+1.5,gy+1.9,z],[tx,gy+2+(i-1)*.5,z+(i-1)*.7],tm,.3*A,[1.5,.55],.2,1);break}
  case 'dagf':{const i=sp[2];fxProj('dag',[x+1.5,gy+2.1,z],[tx,gy+1.6+(i%2)*.6,z+(i-2)*.8],tm,.45*A,[1.5,.55],1.6,1);break}
  case 'arr':{const q=sp[2];if(q>=2)fxProj('arr',[x+1.3,gy+2,z],[tx+(q-4)*.4,gy+1.6,z+(q-4)*.8],tm,.55*A,[1.9,.5],3.2,1);else fxProj('arr',[x+1.3,gy+1.9,z],[tx,gy+2.1,z],tm,(q?.22:.3)*A,q?[2.5,.65]:[1.9,.5],q?.1:.5,q?2:1);break}}}
// 4 attaques par classe ; HLV = niveau minimal de chaque attaque ; durées d, images fr, effets sp, déplacement mv (en secondes avant ralentissement ASL)
const HAT={G:[{d:1.15,fr:[[0,.42,6],[.42,.72,9]],sp:[[.42,'arc']],mv:[.42,.72,.9]},
  {d:1,fr:[[.3,.68,10]],sp:[[.3,'streak']],mv:[.3,.68,1.2]},
  {d:1.5,fr:[[0,.7,6],[.7,1.05,9]],sp:[[.7,'slam']],mv:[.15,.75,.5,1.2]},
  {d:1.7,fr:[[0,.3,10],[.3,.6,9],[.6,.9,6],[.9,1.25,10]],sp:[[.3,'arc',0],[.6,'arc',1],[.9,'arc',0],[1.2,'streak']],mv:[.2,1.3,1.6]}],
 M:[{d:1.2,fr:[[.25,.7,9]],sp:[[.25,'orb']]},
  {d:1.4,fr:[[0,.3,6],[.3,.75,10]],sp:[[.3,'bolt']]},
  {d:1.7,fr:[[0,.3,6],[.3,1.2,10]],sp:[[.3,'beam']]},
  {d:1.9,fr:[[0,.35,11],[.35,1.3,6]],sp:[[.35,'rain',0],[.5,'rain',1],[.65,'rain',2],[.8,'rain',3],[.95,'rain',4]]}],
 V:[{d:1.1,fr:[[0,.3,6],[.3,.65,9]],sp:[[.3,'dag',0],[.38,'dag',1],[.46,'dag',2]]},
  {d:.9,fr:[[.05,.55,10]],sp:[],mv:[.05,.55,-.9,.25]},
  {d:1.4,fr:[[0,.3,9],[.3,.6,6],[.6,.95,10]],sp:[[.3,'streak',1],[.65,'streak',-1]],mv:[.2,.9,1.4]},
  {d:1.8,fr:[[0,.5,6],[.5,1.1,9]],sp:[[.5,'dagf',0],[.58,'dagf',1],[.66,'dagf',2],[.74,'dagf',3],[.82,'dagf',4]]}],
 R:[{d:1,fr:[[0,.2,6],[.2,.55,9]],sp:[[.2,'arr',0]]},
  {d:1.6,fr:[[0,.75,6],[.75,1,9]],sp:[[.75,'arr',1]]},
  {d:1.5,fr:[[0,.2,6],[.2,.4,9],[.4,.55,6],[.55,.75,9],[.75,.9,6],[.9,1.1,9]],sp:[[.2,'arr',0],[.55,'arr',0],[.9,'arr',0]]},
  {d:2,fr:[[0,.8,6],[.8,1.2,9]],sp:[[.8,'arr',2],[.85,'arr',3],[.9,'arr',4],[.95,'arr',5],[1,'arr',6]]}]};
HAT.Pa=[{d:1.15,fr:[[0,.42,6],[.42,.72,9]],sp:[[.42,'arc']],mv:[.42,.72,.9]},
  {d:1,fr:[[.3,.68,10]],sp:[[.3,'streak']],mv:[.3,.68,1.2]},
  {d:1.5,fr:[[0,.5,6],[.5,1.05,11]],sp:[[.5,'slam']],mv:[.15,.55,.5,1.2]},
  {d:1.7,fr:[[0,.3,10],[.3,.6,9],[.6,1.2,6]],sp:[[.3,'arc',0],[.6,'arc',1],[.95,'cross']],mv:[.2,1.1,1.2]}];
HAT.As=[{d:1.4,fr:[[0,.25,9],[.25,.55,6],[.55,.9,10]],sp:[[.25,'streak',1],[.55,'streak',-1]],mv:[.2,.9,1.4]},
  {d:1.1,fr:[[0,.3,6],[.3,.65,9]],sp:[[.3,'dag',0],[.38,'dag',1],[.46,'dag',2]]},
  {d:1.3,fr:[[0,.15,6],[.15,.6,11],[.6,.9,9]],sp:[[.6,'streak',0],[.65,'arc',1]],mv:[.15,.8,5,.9]},
  {d:2,fr:[[0,.3,9],[.3,.5,6],[.5,.7,10],[.7,1.2,9]],sp:[[.3,'streak',1],[.45,'streak',-1],[.6,'dagf',0],[.66,'dagf',1],[.72,'dagf',2],[.78,'dagf',3],[.84,'dagf',4],[.95,'streak',0]]}];
HAT.Ne=[{d:1.2,fr:[[.25,.7,9]],sp:[[.25,'g_orb'],[.4,'g_orb']]},
  {d:1.4,fr:[[0,.3,6],[.3,.75,10]],sp:[[.3,'g_bolt'],[.5,'g_bolt']]},
  {d:1.7,fr:[[0,.3,6],[.3,1.2,10]],sp:[[.3,'g_beam']]},
  {d:1.9,fr:[[0,.35,11],[.35,1.3,6]],sp:[[.35,'g_rain',0],[.5,'g_rain',1],[.65,'g_rain',2],[.8,'g_rain',3],[.95,'g_rain',4]]}];
HAT.Ch=[{d:1.2,fr:[[0,.45,6],[.45,.8,9]],sp:[[.45,'a_arr',0]]},
  {d:1.4,fr:[[0,.25,6],[.25,.45,9],[.45,.65,6],[.65,.9,9]],sp:[[.25,'a_arr',0],[.65,'a_arr',0]]},
  {d:1.7,fr:[[0,.9,6],[.9,1.25,9]],sp:[[.9,'a_pierce']]},
  {d:2,fr:[[0,.8,6],[.8,1.2,9]],sp:[[.8,'a_arr',2],[.85,'a_arr',3],[.9,'a_arr',4],[.95,'a_arr',5],[1,'a_arr',6]]}];
const HAU=lv=>{const r=[];for(let i=0;i<HLV.length;i++)if(lv>=HLV[i])r.push(i);return r};
// v3.7.3 : une animation propre à chacun des 20 sorts (aura de classe + effet distinct des attaques de base)
const SPC={G:[232,191,80],M:[127,232,255],V:[200,90,140],R:[111,208,106]};
function spellFx(h,o,tm,x,y,z){o.cst=tm;const A=ASL,gy=y+(ride(h)?HS*RDY():0),cl=SPC[h.c]||CLC[h.c]||SPC[eqb(h.c)]||[255,255,255],mo=MN.get(h.id),tx=mo?mo.g.position.x-(mo.b.S0||1)*1.2:x+5.5,hy=gy+1.9,key=(CLO.fx.has(h.c)?h.c:eqb(h.c))+(h.sp|0),
 mk=(k,w2,h2,px2,py2,pz2,col,t0,d,u)=>{const s=fxSp(k,w2,h2,px2,py2,pz2);s.material.color.set(col);fxAdd(s,tm+t0*A,d*A,(p,s)=>{s.material.opacity=1;u(p,s)});return s},
 fd=p=>p<.12?p/.12:p>.7?(1-p)/.3:1,
 ring=(px2,py2,col,t0,r0,r1,d)=>mk('ring',1,1,px2,py2,z,col,t0,d,(p,s)=>{const k=r0+(r1-r0)*p;s.scale.set(k,k,1);s.material.opacity=1-p}),
 puff=(px2,py2,pz2,col,t0,sz)=>mk('dust',sz,sz*.87,px2,py2,pz2,col,t0,.8,(p,s)=>{s.scale.set(sz*(1+p),sz*.87*(1+p),1);s.material.opacity=(1-p)*.8});
 for(let i=0;i<10;i++){const a=i*.628,r=.9+.3*(i%3),s=fxSp('mote',.7,.7,x+Math.cos(a)*r,gy+.3,z+Math.sin(a)*r);s.material.color.setRGB(cl[0]/255,cl[1]/255,cl[2]/255);fxAdd(s,tm+i*.05*A,1.1*A,(p,s)=>{s.position.y=gy+.3+p*3.4;s.material.opacity=Math.min(1,(1-p)*2)})}
 switch(key){
 case 'G1':for(let i=0;i<3;i++)ring(x,hy,'#ffd35a',i*.25,1.5,9,.9);break;
 case 'G2':for(let i=0;i<8;i++){const a0=i*.785;mk('rock',1.3,1.15,x,hy,z,'#9a9288',i*.04,1.5,(p,s)=>{const a=a0+p*9,r=2.3-1.2*p;s.position.set(x+Math.cos(a)*r,hy+Math.sin(a*2)*.5,z+Math.sin(a)*r);s.material.opacity=fd(p)})}
  mk('bub',1,1,x,hy,z,'#a9a49a',.5,1,(p,s)=>{const k=3.2+.3*p;s.scale.set(k,k,1);s.material.opacity=.55*fd(p)});break;
 case 'G3':for(let i=0;i<6;i++){const px2=x+2+Math.max(3,tx-x-2)*i/5;mk('rock',1.5,1.3,px2,gy,z,'#8a6a4a',i*.1,.8,(p,s)=>{s.position.y=gy+.4+Math.sin(PI*p)*2.8;s.material.opacity=fd(p)})}
  ring(tx,gy+.4,'#b08a5a',.5,2,11,.9);puff(tx-.8,gy+.8,z,'#b89a6a',.5,3);puff(tx+.8,gy+.8,z+.5,'#b89a6a',.6,3);break;
 case 'G4':mk('shld',4.2,5.2,x+1.6,hy+.2,z,'#cfe3ff',0,1.6,(p,s)=>{const k=p<.15?.5+p/.15*.5:1;s.scale.set(4.2*k,5.2*k,1);s.material.opacity=fd(p)});ring(x+1.6,hy,'#ffd35a',0,2,8,.7);
  for(let i=0;i<6;i++)mk('bstar',.9,.9,x+1.6,hy,z,'#fff2b0',.1,.9,(p,s)=>{const a=i*1.047;s.position.set(x+1.6+Math.cos(a)*2.4*p,hy+Math.sin(a)*2.8*p,z);s.material.opacity=1-p});break;
 case 'G5':for(let i=0;i<14;i++){const a=i*.45;mk('flame',1.4,2.2,x+Math.cos(a)*1.3,gy+.2,z+Math.sin(a)*1.3,'#ff5a2a',i*.06,1.2,(p,s)=>{s.position.y=gy+.8+p*4.2+Math.sin(p*9+i)*.2;s.position.x=x+Math.cos(a)*(1.3+.3*Math.sin(p*7));s.material.opacity=fd(p)})}
  ring(x,hy,'#ff3a2a',0,2,8,.8);ring(x,hy,'#ff9a3a',.3,2,10,.8);break;
 case 'Pa1':mk('streak',10,2.6,tx,gy+5,z,'#fff2b0',0,1,(p,s)=>{s.material.rotation=PI/2;s.scale.set(10,2.6*(1-.4*p)*(.8+.2*Math.sin(p*30)),1);s.material.opacity=fd(p)});ring(tx,gy+.5,'#fff2b0',.15,1,7,.8);break;
 case 'Pa2':for(let i=0;i<14;i++){const a=i*2.4,r=.4+.9*((i*7)%5)/4;mk('bstar',.9,.9,x+Math.cos(a)*r,gy+7,z+Math.sin(a)*r,'#fff2b0',i*.07,1.2,(p,s)=>{s.position.y=gy+7-p*6.5;s.material.opacity=fd(p)})}ring(x,gy+.5,'#ffe08a',.3,1,5,.9);break;
 case 'Pa3':for(let i=0;i<2;i++)mk('bolt1',2.6,9.5,tx-i*.9,gy+4.7,z,'#ffd35a',i*.3,.8,(p,s)=>{s.material.map=fxTex(Math.floor(p*14+i)%2?'bolt2':'bolt1');s.material.opacity=fd(p)});ring(tx,gy+.4,'#ffd35a',.05,1.5,6,.6);ring(tx,gy+.4,'#fff2b0',.35,1.5,6,.6);break;
 case 'Pa4':for(let i=0;i<6;i++){const a=i*1.05,r=.9+.4*(i%2);mk('plus',.9,.9,x+Math.cos(a)*r,gy+.4,z+Math.sin(a)*r,'#9af08a',i*.1,1.1,(p,s)=>{s.position.y=gy+.4+p*3.6;s.material.opacity=Math.min(1,(1-p)*2)})}
  for(const sx of[-1,1])mk('orb',1.5,1.5,x+sx*1.2,hy-.4,z,'#d8ffb0',0,1.2,(p,s)=>{s.material.opacity=fd(p)});ring(x,hy,'#b8f59a',0,1.5,6,1);ring(x,hy,'#ffe08a',.25,1,5,.9);break;
 case 'Pa5':mk('streak',14,4.5,tx,gy+6,z,'#fff6c8',0,1.5,(p,s)=>{s.material.rotation=PI/2;s.scale.set(14,4.5*(.8+.2*Math.sin(p*25)),1);s.material.opacity=fd(p)});
  mk('plus',5,5,tx,gy+6.5,z,'#ffe08a',.3,1.2,(p,s)=>{s.position.y=gy+6.5-p*1.5;const k=5*(.8+.3*Math.sin(p*9));s.scale.set(k,k,1);s.material.opacity=fd(p)});ring(tx,gy+.4,'#fff2b0',.4,2,12,.9);break;
 case 'As1':fxProj('dag',[x+1.5,hy,z],[tx,gy+2,z],tm,.4*A,[1.5,.55],.2,1);for(let i=0;i<3;i++)puff(tx-.9+i*.9,gy+1.2+(i%2)*.6,z+(i-1)*.4,'#7be08a',.4+i*.08,3.2);break;
 case 'As2':for(let i=0;i<6;i++)puff(x+Math.cos(i*1.05)*1.2,gy+1+(i%2)*.8,z+Math.sin(i*1.05)*.8,'#3b2d52',i*.06,3);ring(x,hy,'#5a3a7a',0,1.5,7,.8);break;
 case 'As3':for(let i=0;i<2;i++){const ro=i?-.6:.6;mk('streak',6,1,tx+1.2,gy+2.2,z,'#e8fff0',i*.15,.5,(p,s)=>{s.material.rotation=ro;s.scale.set(6*(.4+.6*p),1*(1-.5*p),1);s.material.opacity=1-p})}puff(tx+1,gy+1.8,z,'#7be08a',.2,3);break;
 case 'As4':ring(tx,gy+2,'#ff3a3a',0,1,5,.9);ring(tx,gy+2,'#ff3a3a',.3,1,4,.9);mk('plus',3,3,tx,gy+2,z,'#ff4a4a',0,1.3,(p,s)=>{s.material.rotation=PI/4+p*.5;s.material.opacity=fd(p)});
  for(let i=0;i<6;i++)mk('coin',.9,.9,tx,gy+2,z,'#ffd35a',.6+i*.05,.9,(p,s)=>{s.position.set(tx+(x-tx)*p+Math.sin(i)*.4,gy+2+Math.sin(p*PI)*2,z);s.material.opacity=1-p*.5});break;
 case 'As5':for(let i=0;i<10;i++){const a0=i*.628;mk('dag',1.5,.55,x,hy,z,'#9af0a8',i*.03,1.3,(p,s)=>{const a=a0+p*12,r=2.4-.8*p;s.position.set(x+Math.cos(a)*r,hy+Math.sin(a*2)*.5,z+Math.sin(a)*r);s.material.rotation=a;s.material.opacity=fd(p)})}ring(x,hy,'#7be08a',0,1.5,6,.9);break;
 case 'Ne1':for(let i=0;i<8;i++)mk('orb',1,1,tx,gy+2,z,'#8af5a0',i*.08,.9,(p,s)=>{s.position.set(tx+(x-tx)*p,gy+2+Math.sin(p*PI)*1.5+Math.sin(i*2+p*9)*.4,z+Math.sin(i)*.5*Math.sin(p*PI));s.material.opacity=fd(p)});
  for(let i=0;i<5;i++)mk('plus',.8,.8,x+(i-2)*.5,gy+.4,z,'#9af08a',.7+i*.06,.9,(p,s)=>{s.position.y=gy+.4+p*3.2;s.material.opacity=Math.min(1,(1-p)*2)});ring(tx,gy+2,'#5aff8a',0,1.5,6,.7);break;
 case 'Ne2':for(let i=0;i<8;i++){const a=i*.785;mk('rock',1.1,1.5,x+Math.cos(a)*2.4,gy,z+Math.sin(a)*1.6,'#e8e2c8',i*.06,1.4,(p,s)=>{s.position.y=gy+.6+Math.sin(p*PI)*1.8;s.material.opacity=fd(p)})}
  for(let i=0;i<4;i++)puff(x+Math.cos(i*1.57)*2.4,gy+.5,z+Math.sin(i*1.57)*1.6,'#c8c2a8',i*.1,2);ring(x,gy+.4,'#5aff8a',.1,1.5,8,.8);break;
 case 'Ne3':ring(tx,gy+2,'#8a3ac8',0,1,6,1);ring(tx,gy+2,'#5a2a88',.3,1,7,1);for(let i=0;i<6;i++){const a0=i*1.05;mk('bstar',.9,.9,tx,gy+2,z,'#b86aff',.1+i*.04,1.1,(p,s)=>{const a=a0+p*7,r=2.4*(1-.5*p);s.position.set(tx+Math.cos(a)*r,gy+2+Math.sin(a)*r*.8,z+Math.sin(a)*.5);s.material.opacity=fd(p)})}break;
 case 'Ne4':for(let i=0;i<8;i++){const dx=(i-3.5)*.7;mk(i%2?'rock':'coin',i%2?1:.9,i%2?1.1:.9,tx+dx,gy,z+(i%3-1)*.5,i%2?'#e8e2c8':'#ffd35a',i*.07,1.1,(p,s)=>{s.position.y=gy+.4+Math.sin(p*PI)*3;s.position.x=tx+dx+(x-tx-dx)*p*.3;s.material.opacity=fd(p)})}
  puff(tx,gy+.6,z,'#8a7a5a',0,3);ring(tx,gy+.4,'#5aff8a',.1,1.5,7,.8);break;
 case 'Ne5':for(let i=0;i<10;i++){const a0=i*.628;mk(i%2?'rock':'flame',i%2?1.1:1.2,i%2?1.1:2,x,hy,z,i%2?'#e8e2c8':'#5aff8a',i*.04,1.4,(p,s)=>{const a=a0+p*10,r=2.6-.8*p;s.position.set(x+Math.cos(a)*r,hy+Math.sin(a*2)*.6,z+Math.sin(a)*r);s.material.opacity=fd(p)})}ring(x,hy,'#5aff8a',0,1.5,7,.9);ring(x,hy,'#e8e2c8',.3,1,5,.8);break;
 case 'Ch1':{const cy=gy+2.2,n0=FXL.length;ring(tx,cy,'#ffc86a',0,6,1.8,.8);for(const r of[0,PI/2])mk('streak',3.2,.22,tx,cy,z,'#ffc86a',.2,.6,(p,s)=>{s.material.rotation=r;s.material.opacity=fd(p)});
  fxProj('arr',[x+1.3,hy,z],[tx,cy,z],tm+.55*A,.25*A,[2.4,.6],0,2);for(let i=n0;i<FXL.length;i++)FXL[i].s.material.color.set('#ffc86a');break}
 case 'Ch2':mk('orb',3,3,x,hy+.6,z,'#ffc86a',0,1.4,(p,s)=>{const k=3*(.6+.6*Math.sin(p*PI));s.scale.set(k,k,1);s.material.opacity=fd(p)});
  mk('streak',6,.35,x+1,hy+.4,z,'#ffe0a0',.2,.9,(p,s)=>{s.position.x=x+1+p*7;s.material.opacity=fd(p)});ring(x,hy,'#ffc86a',0,1.5,6,1);break;
 case 'Ch3':for(let i=0;i<6;i++){const a=i*1.05;mk('spike',2,2.6,tx,gy+.9,z,'#d8c8a0',i*.03,1.2,(p,s)=>{const r=3*(1-Math.min(1,p*3))+.4;s.position.set(tx+Math.cos(a)*r,gy+.9,z+Math.sin(a)*r*.6);s.material.rotation=a+PI/2;s.material.opacity=fd(p)})}puff(tx,gy+.6,z,'#b89a6a',.35,3);ring(tx,gy+.4,'#ffc86a',.3,1.5,6,.8);break;
 case 'Ch4':for(let i=0;i<10;i++){const dx=(i-4.5)*.5;mk('lf',2.3,1.55,tx+dx,gy+6,z+(i%3-1)*.5,i%2?'#d89a3a':'#ffc86a',i*.06,1.3,(p,s)=>{s.position.y=gy+6-p*5.4;s.position.x=tx+dx+Math.sin(p*8+i)*.6;s.material.rotation=p*6+i;s.material.opacity=fd(p)})}
  mk('rock',1.4,1,tx-1.4,gy+.5,z,'#b8503c',.5,1,(p,s)=>{s.material.opacity=fd(p)});ring(tx,gy+.4,'#ffc86a',.3,1.5,6,.9);break;
 case 'Ch5':for(let i=0;i<16;i++){const dx=((i*37)%9-4)*.6,dz=((i*53)%5-2)*.6;mk('arr',2.4,.6,tx+dx,gy+13,z+dz,'#ffd28a',i*.06,.45,(p,s)=>{s.position.set(tx+dx*.8,gy+13-12.4*p,z+dz*.6);s.material.rotation=-PI/2})}ring(tx,gy+.6,'#ffc86a',.85,2,8,.7);break;
 case 'M1':for(let i=0;i<6;i++){const a=i*1.05+.3,r=1.5+.4*(i%2);mk('bolt1',.9,3.2,x+Math.cos(a)*r,hy+Math.sin(a)*.8,z,'#fff2a0',i*.07,.9,(p,s)=>{s.material.map=fxTex(Math.floor(p*14+i)%2?'bolt2':'bolt1');s.material.opacity=fd(p)})}
  mk('bstar',2.6,2.6,x+1.3,hy+1.2,z,'#fff2a0',0,1.1,(p,s)=>{const k=2.6*(.7+.4*Math.sin(p*30));s.scale.set(k,k,1);s.material.opacity=fd(p)});break;
 case 'M2':mk('bub',1,1,x,hy,z,'#6fb8ff',0,1.8,(p,s)=>{const k=4+.25*Math.sin(p*18);s.scale.set(k,k,1);s.material.opacity=.55*fd(p)});ring(x,hy,'#bfe6ff',0,2,8,.7);
  for(let i=0;i<3;i++)mk('bstar',.9,.9,x,hy,z,'#dff2ff',0,1.8,(p,s)=>{const a=i*2.094+p*10;s.position.set(x+Math.cos(a)*2,hy+Math.sin(a)*2,z);s.material.opacity=fd(p)});break;
 case 'M3':heroSp(h,[0,'heal'],tm,x,y,z);break;
 case 'M4':mk('streak',14,2.4,tx,gy+7,z,'#9fe8ff',0,1.2,(p,s)=>{s.material.rotation=PI/2;s.scale.set(14,2.4*(.8+.2*Math.sin(p*40))*(p<.1?p*10:1),1);s.material.opacity=fd(p)});
  mk('orb',1,1,tx,gy+.6,z,'#e6fbff',0,1.2,(p,s)=>{const k=3.2*(.8+.3*Math.sin(p*30));s.scale.set(k,k,1);s.material.opacity=fd(p)});ring(tx,gy+.5,'#9fe8ff',.1,2,9,.9);ring(tx,gy+.5,'#9fe8ff',.5,2,9,.9);break;
 case 'M5':for(let i=0;i<4;i++){const sx=tx+8-i*2,sz=z+(i-1.5)*.9,ex=tx+(i%2)*.9-.4,t0=i*.4;mk('flame',2.6,3.8,sx,gy+15,sz,'#ff7a2a',t0,1.3,(p,s)=>{s.position.set(sx+(ex-sx)*p,gy+15-13.6*p,sz);s.material.rotation=PI-.55});ring(ex,gy+1.2,'#ffb04a',t0+1.25,1.5,7,.8);puff(ex,gy+1.2,sz,'#6a4a3a',t0+1.25,3.4)}break;
 case 'V1':for(let i=0;i<10;i++){const dx=(i-4.5)*.5,t0=i*.06;mk('coin',.9,.9,x+.5,hy,z,'#ffd21f',t0,1.1,(p,s)=>{s.position.set(x+.5+dx*(.4+p*1.6),gy+.4+Math.max(0,4*p*(1-p))*3.6+(1-p)*1.2,z+(i%3-1)*.4);s.scale.set(Math.max(.15,.9*Math.abs(Math.cos(p*14+i))),.9,1);s.material.opacity=fd(p)})}break;
 case 'V2':o.dg=tm;for(let i=0;i<5;i++)mk('streak',4,.5,x+1.4,gy+1+i*.55,z,'#ffffff',i*.04,.7,(p,s)=>{s.position.x=x+1.4-3.4*p;s.scale.set(4*(1-.3*p),.5,1);s.material.opacity=(1-p)*.9});
  for(let i=0;i<6;i++)mk('mote',.6,.6,x,gy+.6+i*.4,z,'#ffffff',i*.05,.7,(p,s)=>{s.position.x=x-1.8*Math.sin(PI*p)-p*.6;s.material.opacity=1-p});break;
 case 'V3':{const cy=gy+2.3;[[.8,0],[-.8,.2]].forEach(([r,t0])=>mk('streak',7,1.1,tx,cy,z,'#ff4a5a',t0,.6,(p,s)=>{s.material.rotation=r;s.scale.set(7*(.4+.6*Math.min(1,p*3)),1.1*(1-.5*p),1);s.material.opacity=1-p*p}));
  mk('bstar',1,1,tx,cy,z,'#ffffff',.3,.5,(p,s)=>{const k=3.4*(1-p*.5);s.scale.set(k,k,1);s.material.opacity=1-p});break}
 case 'V4':for(let i=0;i<8;i++)mk('coin',.9,.9,tx,hy,z,'#ffd21f',i*.1,.8,(p,s)=>{s.position.set(tx+(x+.6-tx)*p,hy+Math.sin(PI*p)*2.4+(i%3-1)*.3*Math.sin(PI*p),z);s.scale.set(Math.max(.15,.9*Math.abs(Math.cos(p*12+i))),.9,1);s.material.opacity=fd(p)});
  mk('bstar',2.4,2.4,x+.6,hy,z,'#ffe07a',.7,.9,(p,s)=>{s.material.opacity=Math.sin(PI*p)});break;
 case 'V5':ring(tx,gy+2,'#7a2fb0',0,9,1.6,.9);for(let i=0;i<6;i++)mk('dust',2.4,2.1,x+(i%3-1)*.8,gy+.7,z+(i%2?.8:-.8),'#3a1a58',i*.05,1,(p,s)=>{s.position.y=gy+.7+p*2.6;s.material.opacity=(1-p)*.8});
  [[.7,.5],[-.7,.65],[0,.8]].forEach(([r,t0])=>mk('streak',6,.9,tx,gy+2.2,z,'#a05ae0',t0,.45,(p,s)=>{s.material.rotation=r;s.scale.set(6*(.4+.6*Math.min(1,p*3)),.9*(1-.4*p),1);s.material.opacity=1-p*p}));
  mk('bub',1,1,tx,gy+2.2,z,'#2a1040',1,.7,(p,s)=>{const k=1+5*p;s.scale.set(k,k,1);s.material.opacity=.7*(1-p)});break;
 case 'R1':{const cy=gy+2.2;ring(tx,cy,'#8dff7a',0,6,1.8,.8);for(const r of[0,PI/2])mk('streak',3.2,.22,tx,cy,z,'#8dff7a',.2,.6,(p,s)=>{s.material.rotation=r;s.material.opacity=fd(p)});
  mk('bstar',1,1,tx,cy,z,'#ffffff',.8,.4,(p,s)=>{const k=3*(1-.4*p);s.scale.set(k,k,1);s.material.opacity=1-p});break}
 case 'R2':for(let i=0;i<7;i++){const px2=x+1.6+Math.max(3,tx-x-2.4)*i/6,sd=i%2?.35:-.35;mk('foot',2.2,3.1,px2,gy+.4,z+sd,'#9dff8a',i*.14,1.9,(p,s)=>{s.material.opacity=fd(p)});mk('mote',1.2,1.2,px2,gy+.8,z+sd,'#d6ffc8',i*.14,1.6,(p,s)=>{s.position.y=gy+.8+p*2.2;s.material.opacity=1-p})}break;
 case 'R3':{const py=gy+.7;mk('spike',1,1,tx,py,z,'#cfd6df',0,1.3,(p,s)=>{const k=p<.35?7-4.8*(p/.35):2.2;s.scale.set(k,k*.6,1);s.material.opacity=fd(p)});
  for(let i=0;i<4;i++)mk('bstar',.8,.8,tx,py,z,'#fff2b0',.45,.5,(p,s)=>{const a=i*1.57+.8;s.position.set(tx+Math.cos(a)*1.8*p,py+Math.sin(a)*1.4*p+.4,z);s.material.opacity=1-p});puff(tx,py+.3,z,'#b8b0a0',.4,3);break}
 case 'R4':for(let i=0;i<14;i++){const a0=i*.45;mk('lf',2.3,1.55,x,gy,z,i%2?'#5fbf4a':'#8ad65a',i*.05,1.7,(p,s)=>{const a=a0+p*7,r=3.2*(1-.45*p);s.position.set(x+Math.cos(a)*r,gy+.5+p*4.2,z+Math.sin(a)*r);s.material.rotation=a*2;s.material.opacity=fd(p)})}
  mk('bub',1,1,x,hy,z,'#5fbf4a',.2,1.6,(p,s)=>{const k=6.4-2.6*p;s.scale.set(k,k,1);s.material.opacity=.5*fd(p)});break;
 case 'R5':for(let i=0;i<12;i++){const dx=((i*37)%7-3)*.7,dz=((i*53)%5-2)*.6;mk('arr',2.4,.6,tx+dx,gy+13,z+dz,'#bfff9a',i*.07,.45,(p,s)=>{s.position.set(tx+dx*.8,gy+13-12.4*p,z+dz*.6);s.material.rotation=-PI/2})}ring(tx,gy+.6,'#8dff7a',.85,2,8,.7);break}}
// v3.7.4 : fouille du corps : une pièce vole du monstre vers l'aventurier
function lootFx(h,tm,x,y,z){const tx=x+5,gy=y+(ride(h)?HS*RDY():0),s=fxSp('coin',1,1,tx,gy+.8,z),m=fxSp('mote',1.2,1.2,tx,gy+.9,z);s.material.color.set('#ffd21f');m.material.color.set('#fff2b0');
 fxAdd(s,tm,1,(p,s)=>{s.position.set(tx+(x+.6-tx)*p,gy+.8+Math.sin(PI*p)*2.4,z);s.scale.set(Math.max(.15,Math.abs(Math.cos(p*10))),1,1);s.material.opacity=1-p*p});
 fxAdd(m,tm,.7,(p,s)=>{s.position.y=gy+.9+p*1.8;s.material.opacity=1-p})}
function thFx(o,h,tm,x,y,z){const ts=o.ths;if(!ts||!ts.length||tm-(o.pt||0)<.3||FXL.length>36)return;o.pt=tm;const c=(o.pc=(o.pc||0)+1),th=ts[c%ts.length],q=THP[th-1],cl=c&2?q.g:q.t,up=th===6?-1.2:th===2?0:1.4,s=fxSp('mote',.5,.5,x+(Math.random()-.5)*2.6,y+(ride(h)?HS*RDY():0)+.6+Math.random()*3.2,z+(Math.random()-.5)*2.6);s.material.color.setRGB(cl[0]/255,cl[1]/255,cl[2]/255);const y0=s.position.y;fxAdd(s,tm,.9,(p,s)=>{s.position.y=y0+up*p;s.material.opacity=1-p})}
function heroFx(o,h,fg,tm,x,y,z){
 if(o.lf&&!fg){if(h.loot)o.vt=tm;else o.ft=tm}o.lf=fg;o.fr=!fg&&!h.loot&&((h.hurt&&h.st==='back')||(o.ft&&tm-o.ft<3));
 if(fg&&h.spc&&!o.cs){o.cs=1;spellFx(h,o,tm,x,y,z)}if(!h.spc)o.cs=0;
 o.cr=0;if(!fg){const lk=h.st==='loot'&&h.lt0,ts=lk?h.lt0-h.t:tm-(o.vt||0);o.af=(o.vt||lk)&&h.loot&&(lk?ts<LTV:ts<1.8)?12:0;
  if(lk&&h.loot&&ts>=LTV){o.af=7;o.cr=1;if(tm-(o.ct||0)>1.3){o.ct=tm;lootFx(h,tm,x,y,z)}}o.at=null;return}
 if(h.pw>0){o.af=13;o.at=null;return}
 const T=HAT[CLO.atk.has(h.c)?h.c:eqb(h.c)];if(!T){o.af=0;return}
 let a=o.at;if(!a||tm-a.t0>=a.ty.d*ASL+a.gp){const c=(o.an=(o.an||0)+1),pk=HAU(h.lv|0);let k=pk[Math.floor(Math.random()*pk.length)];if(pk.length>1&&a&&a.k===k)k=pk[(pk.indexOf(k)+1+Math.floor(Math.random()*(pk.length-1)))%pk.length];const ty=T[k],gp=AGP[0]+Math.random()*(AGP[1]-AGP[0]),en=a?a.t0+a.ty.d*ASL+a.gp:0;a=o.at={ty,k,gp,t0:(a&&tm-en<.3)?en:tm,sp:0}}
 const p=(tm-a.t0)/ASL,ty=a.ty;let af=0;for(const f of ty.fr)if(p>=f[0]&&p<f[1]){af=f[2];o.fs=p-f[0]}o.af=af||13;if(o.cs&&tm-(o.cst||0)<1.2*ASL)o.af=14;
 for(let i=0;i<ty.sp.length;i++)if(!(a.sp&(1<<i))&&p>=ty.sp[i][0]){a.sp|=1<<i;heroSp(h,ty.sp[i],tm,x,y,z)}
 const e=ty.mv;if(e&&p>=e[0]&&p<e[1]){const q=Math.sin(PI*(p-e[0])/(e[1]-e[0]));o.g.position.x+=e[2]*q;if(e[3])o.g.position.y+=e[3]*q}if(o.dg&&tm-o.dg<.8*ASL)o.g.position.x-=1.8*Math.sin(PI*(tm-o.dg)/(.8*ASL))}
function fxDust(o){const g=o.g,sz=Math.max(1,Math.min(3.4,(o.b.S0||1)*(o.b.wide||1)*HS*.32)),tm=performance.now()/1000,bx=g.position.x,bz=g.position.z,by=HC(bx,bz);
 for(let i=0;i<8;i++){const a=i/8*6.283+i*.7,r0=.3*sz,s=fxSp('dust',1,.875,bx+Math.cos(a)*r0,by+.35,bz+Math.sin(a)*r0);fxAdd(s,tm+(i%3)*.05,.9,(p,s)=>{const k=sz*(1.1+p*1.4),rr=r0+p*1.6*sz;s.position.set(bx+Math.cos(a)*rr,by+.35+p*.9,bz+Math.sin(a)*rr);s.scale.set(k,k*.875,1);s.material.opacity=Math.pow(1-p,1.3)})}}
function heroFor(h){let o=HM.get(h.id);const fem=gd(h,h.name)==='♀',hs=!!h.hs,hv=hs?PCOL.hs[(h.id*7)%4]:null;
 if(o&&(!!o.m.userData.pg!==pgUse(h.c,fem)||o.cls!==h.c||o.fem!==fem||o.hs!==hs||o.col!==h.col||o.ek!==h.eq.w+'.'+h.eq.a+'.'+h.eq.b+'.'+h.eq.s)){heroG.remove(o.g);disp(o.g);HM.delete(h.id);o=null}
 if(!o){const m=buildSprHero(h.c,fem,h.id,h.col,h.eq,h.coif),g=new TH.Group();g.add(m);
  let hor=null,rtex=null;if(hs){const U=m.userData;hor=mkHorse(hv,U.pg);g.add(hor);rtex=U.pg?pxTex(U.mg?mRideSheet(h.eq||{},h.id,h.coif,U.hair):U.vo||U.as?vRideSheet(h.eq||{},h.id,h.coif,U.hair,fem,U.as):U.pa?paRideSheet(U.tex.image,h.eq||{},h.id,fem):pgRideSheet(U.tex.image,U.atx.image,h.id,h.eq||{},fem),PXF.length):rideTex(U.tex.image);U.mat.userData.alt=U.pg&&U.atx?[U.tex,U.atx,rtex]:[U.tex,rtex]}
  const gl=new TH.Sprite(new TH.SpriteMaterial({map:glowTex(),color:'#ffd37a',blending:TH.AdditiveBlending,depthWrite:false,transparent:true,opacity:0}));const tg=new TH.Group();tg.add(mkPxTorch());const fl=new TH.Sprite(new TH.SpriteMaterial({map:glowTex(),color:'#ff9a2a',blending:TH.AdditiveBlending,depthWrite:false,transparent:true,opacity:0}));gl.material.color.set('#ffb35a');gl.scale.set(1.5,1.5,1);gl.position.y=.17;tg.add(gl);tg.position.set(11*PXSZ/PXH,20*PXSZ/PXH,.08);m.userData.piv.add(tg);tg.visible=false;
  const lt=new TH.Group();{const bm=new Acc().add(box(.34,.4,.16),'#ffd21f',0,0,0,{shade:0}).add(box(.37,.12,.19),'#ffe65a',0,.2,0,{shade:0}).add(box(.08,.1,.02),'#fffbd0',0,.1,.09,{shade:0}).add(cyl(.065,.065,.4),'#ffc400',0,.33,0,{rz:PI/2,shade:0}).mesh(lt,0);bm.material=new TH.MeshBasicMaterial({vertexColors:true,fog:false});bm.castShadow=false;bm.receiveShadow=false}lt.userData.sp=[];for(let i=0;i<5;i++){const sp=new TH.Sprite(new TH.SpriteMaterial({map:starTex(),color:'#fff1a0',blending:TH.AdditiveBlending,depthWrite:false,depthTest:false,transparent:true,opacity:0}));sp.renderOrder=6;sp.scale.set(.15,.15,1);lt.add(sp);lt.userData.sp.push(sp)}const lc=new TH.Sprite(new TH.SpriteMaterial({map:glowTex(),color:'#fff3a0',blending:TH.AdditiveBlending,depthWrite:false,transparent:true,opacity:.9}));lc.scale.set(.42,.42,1);lt.add(lc);const lg=new TH.Sprite(new TH.SpriteMaterial({map:glowTex(),color:'#ffe033',blending:TH.AdditiveBlending,depthWrite:false,transparent:true,opacity:.8}));lg.scale.set(.75,.75,1);lt.add(lg);lt.scale.setScalar(1.25);lt.position.set(0,hs?1.5:1,-.3);lt.visible=false;g.add(lt);const bs=new TH.Group();for(let i=0;i<3;i++){const st=new TH.Sprite(new TH.SpriteMaterial({map:fxTex('bstar'),color:'#ffffff',transparent:true,depthTest:false,depthWrite:false}));st.renderOrder=6;st.scale.set(.34,.34,1);bs.add(st)}bs.visible=false;g.add(bs);
  const gd=new TH.Mesh(new TH.PlaneGeometry(1,1).rotateX(-PI/2),new TH.MeshBasicMaterial({map:glowTex(),color:'#ff9a40',blending:TH.AdditiveBlending,depthWrite:false,transparent:true,opacity:0,polygonOffset:true,polygonOffsetFactor:-2,fog:false}));gd.scale.set(8,1,8);gd.position.y=.05;gd.renderOrder=1;gd.visible=false;g.add(gd);g.add(csChar(1.5));
  g.scale.setScalar(HS);heroG.add(g);o={g,m,hor,rtex,tg,fl,gd,cls:h.c,col:h.col,ek:h.eq.w+'.'+h.eq.a+'.'+h.eq.b+'.'+h.eq.s,ths:[...new Set([thFor(h.eq.w,h.id),thFor(h.eq.a,h.id),thFor(h.eq.b,h.id),thFor(h.eq.s,h.id)].filter(Boolean))],fem,hs,gl,lt,bs,ry:0,mv:0,ph:Math.random()*6,x:0,z:0,init:0};if(o.ths.length){const q=THP[o.ths[0]-1].g;gd.material.color.setRGB((1+q[0]/255)/2,(.6+q[1]/255)/2,(.25+q[2]/255)/2)}HM.set(h.id,o)}
 return o}
function bpush(x,z){for(const it of S.pl){const d=bdim(NK[it.e]||'H'),b=blocal(it,BYAW(it),x,z),hw=d.hw+.8,hd=d.hd+.8;if(Math.abs(b.r)<hw&&Math.abs(b.f)<hd){let r=b.r,f=b.f;if(hd-Math.abs(f)<=hw-Math.abs(r))f=f<0?-hd:hd;else r=r<0?-hw:hw;x=b.cx+r*b.c+f*b.sn;z=b.cz-r*b.sn+f*b.c}}return[x,z]}
function hpos(h,BM){const bm=BM.get(h.id);if(bm){const p=bpos(h,bm);return[p[0]/sc,p[1]/sc]}if(h.st==='town'&&(h.sub==='wait'||h.sub==='do'))return bpush(h.x,h.y);const vq=((h.x-T.x)/VR.rx)**2+((h.y-T.y)/VR.ry)**2,f=vq<1.1?0:Math.min(1,(vq-1.1)/.3);return bpush(h.x+((h.id%3)-1)*.5*f,h.y+((h.id%2)-.5)*.6*f)}
function updHeroes(dt,tm){
 const BM=bAssign(),kd=dkl(),seen=new Set();
 for(const h of S.hero){const bm=BM.get(h.id);if(hidn(h)&&!bm)continue;seen.add(h.id);const o=heroFor(h),[x,z]=hpos(h,BM),y=HC(x,z);
  if(!o.init){o.x=x;o.z=z;o.init=1}
  const dx=x-o.x,dz=z-o.z,d=Math.hypot(dx,dz);if(d>.004){o.mv=tm;if(d>.01){const ta=Math.atan2(dx,dz);let da=ta-o.ry;da=Math.atan2(Math.sin(da),Math.cos(da));o.ry+=da*Math.min(1,dt*10)}}
  if(h.st==='town'&&(h.sub==='wait'||h.sub==='do')&&d<.02){let da=PI-o.ry;da=Math.atan2(Math.sin(da),Math.cos(da));o.ry+=da*Math.min(1,dt*8)}
  if(bm&&d<.02){const p=slot(bm.it),a0=Math.atan2(T.x+p[0]-x,T.y+p[1]-z)-o.ry,da=Math.atan2(Math.sin(a0),Math.cos(a0));o.ry+=da*Math.min(1,dt*8)}
  o.x=x;o.z=z;const mv=tm-o.mv<.22&&!bm,fg=h.st==='fight';
  o.g.position.set(x,y,z);if(fg&&h.en&&h.en.nt&&mkind(h.en.n))o.ry=PI/2;o.g.rotation.y=o.ry;o.ph+=dt*(mv?(o.fr?(h.hurt?.7:2):1):.2);
  heroAnim(o.m,o.ph,mv);
  if(fg){const u=o.m.userData;u.arms[1].sh.rotation.x=-1.1+Math.sin(tm*13)*.7;u.arms[1].el.rotation.x=-.5}
  o.bs.visible=!!h.bless;if(h.bless){for(let i=0;i<3;i++){const a=tm*1.6+i*2.094,s=o.bs.children[i];s.position.set(Math.cos(a)*.8,(ride(h)?.95+RDY():.95)+Math.sin(tm*2+i*2)*.12,Math.sin(a)*.8);s.scale.setScalar(.55+.1*Math.sin(tm*5+i*2))}}o.lt.visible=!!(h.loot&&(h.st==='back'||h.st==='town'));if(o.lt.visible){const sg=o.lt.children[o.lt.children.length-1];if(sg&&sg.material)sg.material.opacity=.7+.3*Math.sin(tm*5+h.id);const sps=o.lt.userData.sp;if(sps)sps.forEach((q,i)=>{const ph=(tm*.8+i/5)%1;q.position.set(Math.sin(tm*3+i*1.7)*.34,.25+ph*.95,Math.cos(tm*2.3+i)*.2);q.material.opacity=Math.sin(ph*PI)*.8});o.lt.position.y=(ride(h)?1+RDY():1)+Math.sin(tm*4+h.id)*.035}
  const vq=((x-T.x)/VR.rx)**2+((z-T.y)/VR.ry)**2,tf=1-Math.min(1,Math.max(0,(1.25-vq)/.3));
  const fz=ZA.find(q=>q.n==='Forêt'),fr=fz?ZRD(fz.n):1,ff=fz?1-Math.min(1,Math.max(0,(Math.hypot(x-fz.x,z-fz.y)-fr*.85)/(fr*.2))):0,kh=Math.max(kd,ff);
  o.gl.material.opacity=kh*.85*tf;o.gl.visible=kh>0.01&&tf>.01;o.tg.visible=kh>.12&&tf>.02;const gOn=kh>.01&&tf>.01;o.gd.visible=gOn;if(gOn)o.gd.material.opacity=kh*.42*tf*(.9+.1*Math.sin(tm*9+h.id));if(o.tg.visible){const f=.85+.15*Math.sin(tm*12+h.id*3);o.fl.scale.set(.2*f,.27*f,1);o.gl.scale.setScalar((1.4+.2*f)*1.55)}
  o.bl=!!bm;heroFx(o,h,fg,tm,x,y,z);thFx(o,h,tm,x,y,z);sprUpd(o,h,mv,fg,tm,kh*tf);if(o.hor)horseUpd(o,h,mv,x,y,z);if(o.m.userData.pg)pgApply(o,h,tm);o.g.visible=true}
 for(const [id,o] of HM)if(!seen.has(id)){if(!S.hero.some(q=>q.id===id)){if(o.lf&&!o.dy)o.dy=tm;if(o.dy&&tm-o.dy<3){const q=tm-o.dy,u=o.m.userData;u.piv.rotation.z=-PI/2*Math.min(1,q/.45)*(u.piv.scale.x||1);u.piv.position.y=.1*Math.min(1,q/.45);if(q>2.2){u.mat.transparent=true;u.mat.opacity=Math.max(0,1-(q-2.2)/.8)}o.bs.visible=o.lt.visible=o.tg.visible=o.gd.visible=o.gl.visible=false;continue}heroG.remove(o.g);disp(o.g);HM.delete(id)}else o.g.visible=false}
 fxUpd(tm);return BM}
// ---------- ciel / lumière ----------
// ===== v3.3.5 : éclairage de la démo, ciel, lampadaires, volcan, forêts =====
const PL=[[0,'#04081a','#0c1a34','#3a4f86','#1a1f33',.5,1.2,[.78,.86,1.15]],[5,'#050a1e','#0e1c3a','#3a4f86','#1a1f33',.5,1.2,[.8,.88,1.15]],[5.6,'#2b3f77','#e8905a','#8a8fc0','#3a3040',.6,1.05,[1.12,.95,.82]],[6.8,'#4a7cc4','#b8d0e8','#9fbce8','#6a5a3a',.75,1.05,[1.05,1,.93]],[12,'#3c78d0','#a8cbee','#9fbce8','#6a5a3a',.8,1,[1,1,.97]],[17,'#4a74c0','#e8c89a','#a8b8e0','#6a5a3a',.75,1.05,[1.1,.98,.84]],[19.8,'#3a3a80','#f07a4a','#b08fa8','#4a3a3a',.6,1.05,[1.15,.9,.78]],[20.5,'#141d44','#3a2f5a','#4a5a90','#252535',.5,1.15,[.9,.88,1.05]],[21,'#070c20','#101c38','#3a4f86','#1a1f33',.5,1.2,[.8,.87,1.12]],[24,'#04081a','#0c1a34','#3a4f86','#1a1f33',.5,1.2,[.78,.86,1.15]]];
const CC=a=>new TH.Color(a),SD=new TH.Vector3(),MD=new TH.Vector3();let fill=null,skyM=null,etex=null,ecv=null,GQ=[],GM=null,GD=null;K.bs=.4;K.th=.9;K.tint=[1,1,1];
function palAt(h){let t=0;while(t<PL.length-2&&h>=PL[t+1][0])t++;const e=PL[t],n=PL[t+1],s=smooth(e[0],n[0],h),c=(a,b)=>CC(a).lerp(CC(b),s);return{zen:c(e[1],n[1]),hor:c(e[2],n[2]),hs:c(e[3],n[3]),hg:c(e[4],n[4]),hi:e[5]+(n[5]-e[5])*s,ex:e[6]+(n[6]-e[6])*s,tint:[0,1,2].map(i=>e[7][i]+(n[7][i]-e[7][i])*s)}}
function skyInit(){skyM=new TH.Mesh(new TH.SphereGeometry(2900,24,14),new TH.ShaderMaterial({side:TH.BackSide,depthWrite:false,fog:false,uniforms:{zen:{value:new TH.Color()},hor:{value:new TH.Color()},sunDir:{value:new TH.Vector3(0,1,0)},sunCol:{value:new TH.Color()},moonDir:{value:new TH.Vector3(0,-1,0)},night:{value:0},flash:{value:0}},
 vertexShader:'varying vec3 vP;void main(){vP=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
 fragmentShader:'varying vec3 vP;uniform vec3 zen,hor,sunDir,sunCol,moonDir;uniform float night,flash;float h21(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}void main(){vec3 d=normalize(vP);float hh=clamp(d.y,0.,1.);vec3 c=mix(hor,zen,pow(hh,.5));float sd=max(dot(d,sunDir),0.);c+=sunCol*(pow(sd,300.)*2.2+pow(sd,12.)*.22);float md=max(dot(d,moonDir),0.);c+=vec3(.75,.8,1.)*(smoothstep(.9993,.9997,md)*1.4+pow(md,40.)*.07)*night;vec2 uv=vec2(atan(d.x,d.z),asin(clamp(d.y,-1.,1.)))*55.;float s=h21(floor(uv));c+=vec3(step(.9965,s)*night*smoothstep(.08,.35,d.y));c+=flash*vec3(.5,.55,.8)*.4;gl_FragColor=vec4(c,1.);\n#include <tonemapping_fragment>\n#include <colorspace_fragment>\n}'}));skyM.renderOrder=-10;skyM.frustumCulled=false;scn.add(skyM)}
function updLight(){
 const x=(6+24*(S.t-S.ds)/S.dl)%24,kd=dkl(),pl=palAt(x),wm=wxMix(),wvl=wm[0],wfg=wm[2],cl=Math.min(1,wvl*2.4),r=(x-5)/16*PI,a=Math.sin(r),o=((x+3)%24)/8*PI,l=Math.sin(o),c=1-smooth(-.06,.2,a);
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
function lamp(W,x,z){if(DBG.l)return;const y0=H3(x,z);W.add('wood',cy2(.16,.22,4.6,6),'#2b2420',x,y0+2.3,z,{shade:0});W.add('wood',box(.95,.18,.95),'#2b2420',x,y0+4.7,z,{shade:0});W.add('lava',box(.6,.85,.6),'#fff',x,y0+5.2,z,{shade:0});W.add('wood',box(1,.16,1),'#2b2420',x,y0+5.75,z,{shade:0});TQ.push([x,y0+5.25,z,9]);GQ.push([x,z,9])}
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
 let fl=0;if(th>.3){const Tt=9,s=Math.floor(tm/Tt),r=jt(s,17);if(r<.8){const d=tm-(s*Tt+r*Tt*.8);if(d>=0&&d<.5){fl=(d<.12?1:d<.2?.25:d<.3?.9:1-(d-.3)/.2)*th;if(WX.bs!==s){WX.bs=s;if(window.bvThunder)bvThunder(.5+jt(s,31)*2.5);boltGen(cx0+(jt(s,21)-.5)*hb*1.4,cz0+(jt(s,23)-.5)*hb*1.4)}}}}
 WX.fl=fl;WX.bolt.visible=fl>.2;WX.bg.visible=fl>.2;WX.bg.material.opacity=Math.min(1,fl)}
// ===== torches : porte des bâtiments à PNJ (flammes + halos la nuit) =====
let TQ=[],torchG=null;
function torches(W,x,y,zf,dx){if(DBG.l)return;for(const s of[-1,1]){const tx=x+s*dx;W.add('wood',box(.1,.1,.4),'#2a1e14',tx,y-.15,zf+.2,{shade:0});W.add('wood',cy2(.05,.06,.7,6),'#4a3322',tx,y+.15,zf+.4,{shade:0});W.add('lava',box(.2,.28,.2),'#fff',tx,y+.62,zf+.4,{shade:0});TQ.push([tx,y+.75,zf+.4])}GQ.push([x,zf+1.5,8])}
function torchSprites(){while(torchG.children.length){const c=torchG.children.pop();if(c.geometry&&!c.isSprite)c.geometry.dispose()}GD=null;
 TQ.forEach((p,i)=>{const s=new TH.Sprite(new TH.SpriteMaterial({map:glowTex(),color:'#ff9a40',blending:TH.AdditiveBlending,depthWrite:false,transparent:true,opacity:0}));s.position.set(p[0],p[1],p[2]);s.scale.set(5,5,1);s.userData.i=i;s.userData.sz=p[3]||5;torchG.add(s)});
 if(GQ.length){if(!GM)GM=new TH.MeshBasicMaterial({map:glowTex(),color:'#ff9a40',blending:TH.AdditiveBlending,depthWrite:false,transparent:true,opacity:0,polygonOffset:true,polygonOffsetFactor:-2,fog:false});
  const m=new TH.InstancedMesh(new TH.PlaneGeometry(1,1).rotateX(-PI/2),GM,GQ.length),o=new TH.Object3D();GQ.forEach((q,i)=>{o.position.set(q[0],H3(q[0],q[1])+.12,q[1]);o.scale.set(q[2]*2,1,q[2]*2);o.updateMatrix();m.setMatrixAt(i,o.matrix)});m.frustumCulled=false;m.renderOrder=1;torchG.add(m);GD=m}}
function torchUpd(tm){const kd=dkl(),on=Math.min(1,kd*1.2);for(const s of torchG.children){if(!s.isSprite)continue;const f=.8+.2*Math.sin(tm*11+s.userData.i*2.3)*Math.sin(tm*7.3+s.userData.i);s.material.opacity=on*f;s.visible=kd>.02;s.scale.setScalar(s.userData.sz*(.9+.12*f))}if(GM){GM.opacity=on*.34;if(GD)GD.visible=kd>.02}if(WPT){WPT.material.opacity=on*(.85+.1*Math.sin(tm*9));WPT.visible=kd>.02}if(WGM){WGM.opacity=on*.5;if(WGD)WGD.visible=kd>.02}}
// ===== v3.4.2 : vraies ombres dynamiques (lumières ponctuelles) =====
let PLN=7;const PLR=30,PLI=36;let plRot=0,PLS=null,PLX=null,TPOS=[],TPG=[],SHM=[],fcn=0,plOn=false;const PV=new TH.Vector3();
function plInit(){PLN=Math.max(2,Math.min(7,((ren.capabilities&&ren.capabilities.maxTextures)||16)-9));K.plc=PLN;PLS=[];for(let i=0;i<PLN;i++){const l=new TH.PointLight('#ffa050',0,PLR,2);l.castShadow=true;l.shadow.mapSize.set(256,256);l.shadow.camera.near=.5;l.shadow.camera.far=PLR;l.shadow.bias=-.004;l.shadow.normalBias=.12;l.shadow.autoUpdate=false;l.visible=false;scn.add(l);PLS.push({l,k:0,key:'',pend:null,out:false})}
 const g=TH.mergeGeometries([nonIdx(new TH.CylinderGeometry(.22,.3,2.4,5).translate(0,1.2,0)),nonIdx(new TH.IcosahedronGeometry(1.5,0).translate(0,3.5,0))],false);
 PLX=new TH.InstancedMesh(g,new TH.MeshBasicMaterial({colorWrite:false,depthWrite:false}),64);PLX.count=0;PLX.frustumCulled=false;PLX.castShadow=false;scn.add(PLX);sun.shadow.autoUpdate=false}
function plCand(){const C=[];TQ.forEach((q,i)=>C.push({k:'t'+i,x:q[0],y:q[1],z:q[2]}));TPG.forEach((q,i)=>C.push({k:'o'+i,x:q[0],y:H3(q[0],q[1])+2.8,z:q[1]}));
 for(const [k,o] of NPG)if(o.nt&&o.nt.g.visible){o.nt.g.getWorldPosition(PV);C.push({k:'n'+k,x:PV.x,y:PV.y+1.7,z:PV.z})}
 for(const [id,o] of HM)if(o.tg.visible&&o.g.visible){o.tg.getWorldPosition(PV);C.push({k:'h'+id,x:PV.x,y:PV.y+.8,z:PV.z})}return C}
function plPos(c,P){if(c[0]==='h'){const o=HM.get(+c.slice(1));if(o&&o.tg.visible){o.tg.getWorldPosition(PV);P.set(PV.x,PV.y+.8,PV.z)}}}
function plProx(){let n=0;const o=new TH.Object3D(),L=PLS.filter(s=>s.k>.02);if(L.length){const c=TPOS.filter(q=>L.some(s=>(q.x-s.l.position.x)**2+(q.z-s.l.position.z)**2<PLR*PLR)).sort((a,b)=>{const d=q=>Math.min(...L.map(s=>(q.x-s.l.position.x)**2+(q.z-s.l.position.z)**2));return d(a)-d(b)}).slice(0,64);
  c.forEach(q=>{o.position.set(q.x,q.y,q.z);o.scale.setScalar(q.s);o.updateMatrix();PLX.setMatrixAt(n++,o.matrix)})}PLX.count=n;PLX.instanceMatrix.needsUpdate=true}
function plUpd(dt,kd){if(!PLS)return;const on=K.ql===2&&kd>.08&&K.dist<260;
 if(!K.pcd&&K.ql===2){K.pcd=1;PLS.forEach(s=>s.l.visible=true);try{ren.compile(scn,cam3)}catch(e){}PLS.forEach(s=>s.l.visible=plOn)}
 if(on!==plOn){plOn=on;PLS.forEach(s=>{s.l.visible=on;if(!on){s.k=0;s.key='';s.pend=null;s.out=false}});if(!on){PLX.count=0;return}}
 if(!on)return;
 if(fcn%5===0){const act=new Set(PLS.map(s=>s.key)),C=plCand(),fx=K.tx,fz=K.tz,lim=(K.dist*.9+40)**2;C.forEach(c=>{c.d=((c.x-fx)**2+(c.z-fz)**2)*(act.has(c.k)?.45:1)});C.sort((a,b)=>a.d-b.d);
  const R=[];for(const c of C){if(c.d>lim)break;if(R.every(r=>(r.x-c.x)**2+(r.z-c.z)**2>64))R.push(c);if(R.length>=(K.plc||PLN))break}
  const keys=R.map(r=>r.k);PLS.forEach(s=>{s.out=!!s.key&&!keys.includes(s.key)});
  const free=R.filter(r=>!PLS.some(s=>s.key===r.k||(s.pend&&s.pend.k===r.k)));
  PLS.forEach(s=>{if((!s.key||s.out)&&!s.pend&&free.length)s.pend=free.shift()});
  PLS.forEach(s=>{const c=R.find(r=>r.k===s.key);if(c)s.l.position.set(c.x,c.y,c.z)})}
 const I=PLI*Math.min(1,kd*1.2);
 PLS.forEach((s,i)=>{if(s.out||!s.key){s.k=Math.max(0,s.k-dt*5);if(s.k<=.01&&s.pend){s.key=s.pend.k;s.fresh=1;s.l.position.set(s.pend.x,s.pend.y,s.pend.z);s.pend=null;s.out=false;s.k=0}}else s.k=Math.min(1,s.k+dt*5);
  if(s.key)plPos(s.key,s.l.position);s.l.intensity=s.k*I*(.93+.07*Math.sin(fcn*.7+i*2))});
 if(fcn%15===0)plProx()}
// ===== puits et enceinte =====
function wellV(W){const x=T.x-7.6,z=T.y+4.6,y0=H3(x,z);
 W.add('stone',cy2(1.45,1.55,1.1,16),'#9a9488',x,y0+.5,z,{cyl:[1.5,1.1],shade:.05});W.add('flat',cy2(1.2,1.2,.1,16),'#2a5a78',x,y0+1.02,z,{shade:0});
 for(const s of[-1,1])W.add('wood',box(.22,2.6,.22),'#5a3d26',x+s*1.35,y0+1.9,z,{shade:.04});
 W.add('wood',cy2(.1,.1,3,8),'#4a3322',x,y0+3,z,{rz:PI/2,shade:0});W.add('tile',gableG(3.6,2.4,1.1),'#8b4a3a',x,y0+3.2,z,{ry:PI/2,shade:.06});
 W.add('wood',cy2(.2,.17,.3,8),'#6b4a2a',x+.6,y0+1.6,z,{shade:0});W.add('wood',cy2(.02,.02,1,4),'#3a2a1a',x+.6,y0+2.3,z,{shade:0})}
function wallV(W,vd,st){const rx=vd.rx,ry=vd.ry,N=Math.ceil(Math.PI*(rx+ry)/(st?3.4:1.25)),gates=[];
 gates.push(...vgates(rx,ry));
 const gc=VGATE/2+1.4,ep=a=>[T.x+Math.cos(a)*rx,T.y+Math.sin(a)*ry],tg=a=>Math.atan2(Math.cos(a)*ry,-Math.sin(a)*rx),L=Math.PI*(rx+ry)/N*(st?1.08:1),cut=(x,z)=>gates.some(g=>Math.hypot(g[0]-x,g[1]-z)<gc+.3);
 for(let i=0;i<N;i++){const a=i/N*6.2832,[x,z]=ep(a);if(cut(x,z)||nearRiver(x,z,2))continue;const y0=H3(x,z),ro=-tg(a);
  if(st){W.add('stone',box(L,4.2,1.2),'#a8a296',x,y0+1.6,z,{ry:ro,shade:.05});if(i%2)W.add('stone',box(L*.55,.7,1.3),'#a8a296',x,y0+4.05,z,{ry:ro,shade:0})}
  else{const h=3.2+hs(i,1,2)*.9;W.add('wood',box(.62,h,.62),'#8a6a42',x,y0+h/2-.4,z,{shade:.06});W.add('wood',new TH.ConeGeometry(.44,.8,5),'#8a6a42',x,y0+h-.4+.4,z,{shade:0});
   if(i%3===0&&![1,2].some(j=>cut(...ep((i+j)/N*6.2832))))for(const hy of[1.1,2.3])W.add('wood',box(L*3,.18,.22),'#5a3d26',x+Math.cos(ro)*L,y0+hy,z-Math.sin(ro)*L,{ry:ro,shade:0})}}
 for(const g of gates){const a=Math.atan2((g[1]-T.y)/ry,(g[0]-T.x)/rx),[x,z]=ep(a),ta=tg(a),tx=Math.cos(ta),tz=Math.sin(ta);
  for(const s of[-1,1]){const px=x+tx*s*gc,pz=z+tz*s*gc,y0=H3(px,pz);if(gates.some(o=>o!==g&&Math.hypot(o[0]-px,o[1]-pz)<VGATE/2+1))continue;
   W.add(st?'stone':'wood',box(2.8,st?6.6:5.6,2.8),st?'#b4aea2':'#8a6a42',px,y0+(st?2.7:2.2),pz,{shade:.06});W.add('tile',pyrG(2.6),st?'#6a4a8a':'#8b4a3a',px,y0+(st?6:5)+1.3,pz,{sx:3.6,sz:3.6,shade:.1})}}}
// ===== PNJ du village (3D) =====
const NPG=new Map();let npcG=null;
function npcPos(k,it){const kk=NK[it.e]||'H',p=slot(it),d=kk==='A'?6.6:5.4,a=BYAW(it),lx=-2.3,lz=d/2+1.5,c=Math.cos(a),s=Math.sin(a);return[T.x+p[0]+lx*c+lz*s,T.y+p[1]-lx*s+lz*c]}
function updNpc(dt,tm){const seen=new Set(),u1=PXSZ/PXH;
 for(const k in S.npc){const it=S.pl.find(x=>x.e===NE[k]);if(!it||it.cn||!NPV[k])continue;const n=S.npc[k],fem=gd(n,n.n)==='♀',id=hid(n.n);seen.add(k);let o=NPG.get(k);
  if(o&&(o.fem!==fem||o.id!==id)){npcG.remove(o.g);disp(o.g);NPG.delete(k);o=null}
  if(!o){const m=buildSprNpc(k,fem?1:0,id),g=new TH.Group();g.add(m);g.scale.setScalar(HS);
   const tg=new TH.Group();tg.add(mkPxTorch());const fl=new TH.Sprite(new TH.SpriteMaterial({map:glowTex(),color:'#ff9a2a',blending:TH.AdditiveBlending,depthWrite:false,transparent:true}));
   const gl=new TH.Sprite(new TH.SpriteMaterial({map:glowTex(),color:'#ffb35a',blending:TH.AdditiveBlending,depthWrite:false,transparent:true,opacity:0}));gl.scale.set(1.5,1.5,1);gl.position.y=.17;tg.add(gl);tg.position.set(-11*u1,20*u1,.08);tg.visible=false;m.userData.piv.add(tg);
   const gd=new TH.Mesh(new TH.PlaneGeometry(1,1).rotateX(-PI/2),new TH.MeshBasicMaterial({map:glowTex(),color:'#ff9a40',blending:TH.AdditiveBlending,depthWrite:false,transparent:true,opacity:0,polygonOffset:true,polygonOffsetFactor:-2,fog:false}));gd.scale.set(8,1,8);gd.position.y=.05;gd.renderOrder=1;gd.visible=false;g.add(gd);
   g.add(csChar(1.5));npcG.add(g);o={g,m,fem,id,nt:{g:tg,fl,gl,gd},ry:0};NPG.set(k,o)}
  const [x0,z0]=npcPos(k,it),u=o.m.userData,a=npcAct(k),qh=S.hero.find(q=>q.st==='town'&&(q.sub==='do'||q.sub==='wait')&&q.tk&&q.tk.b===it.i),busy=a>0||!!qh;
  // v4.0.1 : ballades autour du bâtiment (retour au poste dès qu'un service ou des travaux commencent)
  const st=o.st||(o.st={dx:0,dz:0,tx:0,tz:0,tn:tm+4+Math.random()*12,ph:0,mv:0,rs:tm+10+Math.random()*15});
  if(busy){st.tx=0;st.tz=0}else if(!st.mv&&tm>st.tn){let tx=(Math.random()*2-1)*1.8,tz=Math.random()*1.5;const q=bpush(x0+tx,z0+tz);if(Math.hypot(q[0]-x0-tx,q[1]-z0-tz)>.01){tx=0;tz=0}st.tx=tx;st.tz=tz;st.tn=tm+10+Math.random()*22}
  const ex=st.tx-st.dx,ez=st.tz-st.dz,ed=Math.hypot(ex,ez);st.mv=ed>.04;if(st.mv){const sp=Math.min(ed,dt*(busy?1.5:.9));st.dx+=ex/ed*sp;st.dz+=ez/ed*sp;st.ph+=dt*7}
  const x=x0+st.dx,z=z0+st.dz;o.g.position.set(x,H3(x,z),z);
  let ty=0;if(st.mv)ty=Math.atan2(ex,ez);else if(a===2)ty=PI;else if(qh)ty=Math.atan2(qh.x-x,qh.y-z)
  {let da=ty-o.ry;da=Math.atan2(Math.sin(da),Math.cos(da));o.ry+=da*Math.min(1,dt*6)}
  const kd=dkl(),n2=o.nt;n2.g.visible=kd>.01;n2.gd.visible=n2.g.visible;if(n2.g.visible){const f=.85+.15*Math.sin(tm*12+id*3);n2.gl.material.opacity=Math.min(1,kd*1.2)*.85;n2.gl.scale.setScalar((1.4+.2*f)*1.55);n2.gd.material.opacity=Math.min(1,kd*1.2)*.4*(.9+.1*f)}
  const az=K.az||0,rel=o.ry-az,bk=Math.cos(rel)<-.35,mx=Math.sin(rel)<-.35?-1:1;o.g.rotation.y=o.ry;o.m.rotation.y=az-o.ry;
  const sdv=Math.abs(Math.sin(rel))>.78;let fi=bk?3:0;
  if(st.mv){const kk=Math.floor((((st.ph/(2*PI))%1)+1)%1*6);fi=sdv?22+kk:bk?16+kk:10+kk}
  else if(a===2)fi=bk?9:8;
  else if(a===1)fi=(bk?4:1)+(Math.floor(tm*2.2+id)&1);
  else if(!bk&&tm>=st.rs){if(tm<st.rs+4.5)fi=6+(Math.floor((tm-st.rs)*1.6)&1);else st.rs=tm+14+Math.random()*16}
  u.tex.offset.x=fi/NPXF.length;u.piv.rotation.x=-Math.atan2(cam3.position.y,Math.hypot(cam3.position.x-K.tx,cam3.position.z-K.tz))*.45;u.piv.scale.set(mx,1+Math.sin(tm*1.8+id)*.022,1);
  const l=Math.min(1.1,1-.5*dk()+.4*kd);u.mat.color.setRGB(l,l,l*1.06);
  const hm=u.ham;hm.g.visible=a===2&&!st.mv;if(hm.g.visible){hm.g.rotation.z=.35+.85*Math.sin(tm*8+id);hm.mat.color.setRGB(l,l,l*1.06)}}
 for(const [k,o] of NPG)if(!seen.has(k)){npcG.remove(o.g);disp(o.g);NPG.delete(k)}}
// ===== monstres 3D (silhouettes par famille) =====
const GHM=MAT.clone();GHM.transparent=true;GHM.opacity=.62;GHM.depthWrite=false;
const SZ={wolf:1,fox:.8,boar:1.05,goat:1,bear:1.3,rat:.6,spider:.7,jailer:1.12,goblin:.78,kobold:.72,orc:1.15,bat:.7,harpy:1,eagle:1,condor:1.15,skel:1,spectre:1.05,ghost:1,lich:1.1,dryad:1.05,tree:1.45,wisp:.85,worm:1.1,troll:1.35,golem:2.3,giant:1.7,salam:1,elem:1.2,dragon:1.7,demon:1.35,dking:1.9,shade:1.1,soul:1.05,were:1.1,yeti:1.45,griffon:1.2,garg:1.1,chimera:1.3,basil:1.05,hydra:1.4,knight:1.15,caster:1,champ:1.35};
const MON={wolf:['q','#7a7a82','#4f4f58',{len:.8,mane:1}],fox:['q','#c8742a','#e8e0d0',{len:.6,bulk:.8,tail:1}],boar:['q','#5a4030','#3a2a20',{len:.7,bulk:1.15,tusks:1}],goat:['q','#d8d2c4','#a8a090',{horns:1,bulk:.95}],bear:['q','#5a3e2a','#3e2a1c',{bulk:1.5,len:.8}],rat:['q','#6a5a50','#4a3c34',{len:.5,bulk:.6,tail:1}],
 spider:['c','#2a2430','#6a1a2a',{t:'spider'}],worm:['c','#8a6a7a','#5a3a4a',{t:'worm'}],hydra:['c','#3a6a4a','#2a4a34',{t:'hydra'}],basil:['q','#4a7a4a','#2a4a2a',{len:1,bulk:.8,crest:1,eye:'#ffdd44'}],salam:['q','#d0501c','#7a2a10',{len:.9,bulk:.8,fire:1}],chimera:['q','#a0703a','#6a3a1a',{bulk:1.3,len:.9,horns:1,wings:1,mane:1}],were:['q','#6a5a4a','#3a2a1e',{len:.85,bulk:1.25,mane:1,eye:'#ffcc33'}],
 bat:['w','#3a3040','#241c2c',{span:.7,small:1}],harpy:['w','#8a6a50','#6a4a8a',{human:1}],eagle:['w','#7a5a38','#e8e0d0',{span:1}],condor:['w','#2a2a30','#e8e0d0',{span:1.3}],griffon:['w','#c8a060','#e8d8b0',{span:1.4,lion:1}],dragon:['w','#4a8a4a','#2a5a2a',{span:1.8,dragon:1}],garg:['w','#8a8a92','#5a5a62',{span:.9,stone:1}],
 ghost:['s','#e8eef6','#9ab0c8',{t:'ghost'}],spectre:['s','#8aa0b8','#4a6078',{t:'ghost',dark:1}],shade:['s','#2a2438','#120e1c',{t:'ghost',dark:1}],soul:['s','#b8f0ff','#7fe0ff',{t:'orb'}],wisp:['s','#c8ffd8','#7fe0a0',{t:'orb'}],elem:['s','#d86a28','#ffb040',{t:'elem'}],tree:['t'],
 dryad:['h','#4a8a4a','#2a5a2a',{sk:'#8ac08a',robe:1,crown:'leaf'}],bandit:['h','#6a5a40','#3a2f22',{w:'sword',hood:1}],brigand:['h','#7a4a3a','#3a2a22',{w:'club'}],cultist:['h','#5a2a6a','#2a1a3a',{robe:1,hood:1,w:'staff'}],guard:['h','#6a7a9a','#3a4a68',{armor:1,helm:1,w:'sword'}],poacher:['h','#6a7a4a','#3a4a28',{w:'sword',hood:1}],jailer:['h','#5a5a62','#2a2a32',{bulk:1.2,w:'club',helm:1}],
 goblin:['h','#6a9a4a','#4a3a22',{sk:'#7aaa52',ears:1,bulk:.8,w:'sword'}],kobold:['h','#b07a4a','#6a4a2a',{sk:'#c08a50',bulk:.75,ears:1,w:'club'}],orc:['h','#4a7a3a','#4a3a2a',{sk:'#5a8a42',bulk:1.25,tusks:1,w:'axe',armor:1}],troll:['h','#6a7a5a','#4a3a2a',{sk:'#7a8a6a',bulk:1.5,w:'club',head:1.1}],giant:['h','#b08a6a','#6a4a30',{sk:'#d4a67a',bulk:1.6,w:'club'}],
 knight:['h','#9aa4b4','#5a6272',{armor:1,helm:1,w:'sword',bulk:1.1}],champ:['h','#c8a040','#6a5020',{armor:1,helm:1,crown:'plume',w:'sword',bulk:1.2}],caster:['h','#4a3a7a','#2a1a4a',{robe:1,hood:1,w:'staff'}],lich:['h','#3a2a4a','#1a102a',{robe:1,sk:'#e8e4d0',crown:'crown',w:'staff',eye:'#7fe0ff'}],skel:['h','#e8e4d0','#b8b4a0',{sk:'#e8e4d0',w:'sword',bulk:.8,eye:'#ff4a3a'}],golem:['h','#8a8a82','#5a5a54',{bulk:1.6,head:.9,eye:'#ffb040',armor:1}],dking:['h','#3a1a4a','#1a0a2a',{bulk:1.3,armor:1,crown:'crown',w:'sword',eye:'#ff4a3a',horns:1}],demon:['h','#8a2a2a','#4a1a1a',{sk:'#b03a3a',horns:1,eye:'#ffd04a',bulk:1.1,w:'axe'}],yeti:['h','#e8eef4','#b8c4d0',{sk:'#d8e2ec',bulk:1.5}]};

const SPRM=new Set(['goblin','kobold','orc','bandit','brigand','poacher','cultist','guard','jailer','knight','champ','caster','skel','troll','giant','yeti','were','demon','dking','lich','golem','dryad','garg']);
const SPRX={demon:{W:72,XO:12},garg:{W:72,XO:12},dking:{W:80,XO:16}};
const SPRB={wolf:[64,48],fox:[56,40],boar:[64,48],goat:[64,52],bear:[80,64],rat:[56,40],salam:[72,44],griffon:[96,72],spider:[64,48],worm:[48,80],eagle:[80,56],owl:[64,56],condor:[96,64],bat:[64,48],harpy:[72,64],
 ghost:[48,64],shade:[48,64],soul:[48,64],spectre:[48,64],wisp:[48,64],elem:[56,64],tree:[64,80],hydra:[96,88],basil:[72,44],chimera:[80,60],dragon:[128,96],wyvern:[96,88],wyrm:[112,64]};
const FLYS=new Set(['eagle','owl','condor','bat','harpy','griffon','garg','ghost','shade','soul','spectre','wisp']),ETH=new Set(['ghost','shade','soul','spectre','wisp','elem']);
const SPR=k=>SPRM.has(k)||!!SPRB[k]||k==='dragon';
function monVar(n,kk){const v={};
 if(/ardent|braise|feu|magma|lave|cendres?|infernal/.test(n)){v.fire=1;if(/cendres?/.test(n))v.t=[95,85,80,.5];else if(/infernal/.test(n))v.t=[210,50,30,.5];else if(/magma|lave/.test(n))v.t=[50,32,28,.45]}
 else if(/spectr/.test(n)&&kk!=='spectre'){v.t=[160,200,255,.6];v.op=.68}
 else if(/neige/.test(n))v.t=[246,248,255,.6];
 else if(/noir|sombre|profondeurs|obsidienne/.test(n))v.t=[24,22,34,.5];
 else if(/nocturne/.test(n))v.t=[45,45,95,.5];
 else if(/brun/.test(n))v.t=[120,80,45,.25];
 else if(/rat-garou/.test(n))v.t=[150,150,165,.35];
 else if(/cristal/.test(n)){v.t=[150,220,255,.5];v.crystal=1}
 else if(/corromp/.test(n))v.t=[60,30,70,.35];
 else if(/de mineur/.test(n))v.t=[150,115,85,.3];
 else if(/prisonnier/.test(n))v.t=[130,130,140,.3];
 else if(/ancien/.test(n))v.t=[170,125,50,.35];
 if(/lave/.test(n))v.lava=1;if(/royal/.test(n))v.crown=1;if(/cimes/.test(n))v.wings=1;if(/sept/.test(n))v.n=5;if(/enrag/.test(n))v.eye='#ff3a30';
 const X=(re,o)=>{if(re.test(n))Object.assign(v,o)};
 if(kk==='shade'){X(/sylvestre/,{t:[40,110,70,.5],acc:'leaves'});X(/r[ôo]deuse/,{t:[110,30,50,.45],eye:'#ff4a3a',acc:'claws'})}
 else if(kk==='bandit')X(/grand chemin/,{t:[150,45,40,.35],wp:'bow'});
 else if(kk==='goblin')X(/chaman/,{t:[140,60,190,.6],eye:'#c07fff'});
 else if(kk==='spider')X(/g[ée]ante/,{t:[90,30,30,.4],eye:'#ff3a30',acc:'eyes8'});
 else if(kk==='bat')X(/g[ée]ante/,{t:[110,60,70,.4],acc:'batg'});
 else if(kk==='worm')X(/colossal/,{t:[110,70,50,.4],acc:'maw'});
 else if(kk==='golem')X(/obsidienne/,{t:[70,30,120,.55],acc:'obs',eye:'#c07fff'});
 else if(kk==='troll')X(/ombres/,{t:[45,45,95,.5],eye:'#ff4a3a',acc:'thorns',wp:'bigclub'});
 else if(kk==='soul')X(/banshee/,{t:[255,170,215,.45],eye:'#ff3a8a',acc:'bansh'});
 else if(kk==='giant'){X(/pierres/,{acc:'rocks'});X(/ogre/,{t:[190,205,255,.4],acc:'cyclops',wp:'bigclub'});X(/temp[êe]tes/,{t:[70,110,175,.45],eye:'#9fe0ff',acc:'bolts',wp:'spear'});X(/titan/,{t:[60,55,58,.65],eye:'#ff8a30',acc:'cfire',wp:'hammer'})}
 else if(kk==='skel')X(/archer/,{t:[150,125,70,.4],wp:'bow'});
 else if(kk==='knight'){X(/hant[ée]e/,{t:[110,200,210,.5],op:.8,eye:'#7fe0ff'});X(/momifi/,{t:[200,175,110,.55]});X(/hant[ée]e/,{acc:'flame'});X(/momifi/,{acc:'wrap',wp:'spear'});X(/maudit/,{t:[60,30,70,.45],eye:'#ff3a30',acc:'cape'});X(/mort/,{t:[24,22,34,.55],eye:'#7fe0ff',acc:'dhorns',wp:'scythe'})}
 else if(kk==='lich'){X(/seigneur/,{t:[70,40,130,.45],eye:'#c07fff',acc:'lord'});X(/mineure/,{acc:'hood'})}
 else if(kk==='orc')X(/maudit/,{t:[60,30,70,.4],eye:'#ff3a30',wp:'bigaxe',acc:'spikes'});
 else if(kk==='demon'){X(/succube/,{t:[215,60,130,.4],acc:'curl',wp:'whip'});X(/incube/,{t:[60,70,170,.4],acc:'cape',wp:'sword'});X(/mineur/,{t:[150,115,85,.3],wp:'fork'});X(/^archi/,{t:[22,10,28,.55],eye:'#ff3a30',acc:'cfire',wp:'bigaxe'})}
 else if(kk==='salam')X(/g[ée]ante/,{t:[235,175,60,.35],acc:'sflame'});
 else if(kk==='elem')X(/feu/,{t:[255,235,80,.6],acc:'sparks'});
 else if(kk==='caster'){X(/sorci/,{t:[70,125,70,.45],eye:'#9fff9f',acc:'witch'});X(/d[ée]chu/,{t:[200,200,215,.45],eye:'#ff3a30',acc:'mitre',wp:'mace'});X(/n[ée]cro/,{acc:'necro'})}
 return v}
function buildSprMon(mk,e,h){const nm=e.n.toLowerCase();let kk=mk;if(/chouette/.test(nm))kk='owl';else if(mk==='dragon')kk=/^wyvern/.test(nm)?'wyvern':/^wyrm/.test(nm)?'wyrm':'dragon';
 const bd=SPRB[kk],xx=SPRX[kk],Wd=bd?bd[0]:xx?xx.W:PXW,Hd=bd?bd[1]:PXH,nf=bd?3:4,fly=FLYS.has(kk),eth=ETH.has(kk),pad=bd?1:2,vr=monVar(nm,kk),op=vr.op||(eth?(kk==='shade'?.85:.72):0),
 FR=bd?[['f','idle'],['f','atk'],['f','alt']]:[['f','idle'],['f','atk'],['b','idle'],['b','atk']],col=bd?null:(h.z&&h.z.c)||null,
 o={col,neon:!!e.nt,hair:'#000000',eye:'#ffd04a',W:Wd,H:Hd,OY:bd?0:undefined,XO:xx?xx.XO:0,...vr,eye2:vr.eye},
 cv=document.createElement('canvas');cv.width=Wd*nf;cv.height=Hd;const cx=cv.getContext('2d'),cg=document.createElement('canvas'),gx=cg.getContext('2d');cg.width=Wd*nf;cg.height=Hd;let hasG=false;
 const isN=(im,q)=>im[q]===143&&im[q+1]===233&&im[q+2]===255,isE=(im,q)=>im[q]===255&&im[q+1]===138&&im[q+2]===48;
 FR.forEach(([v,fr],i)=>{const im=pxSprite('m'+kk,kk==='dryad'?1:0,v,fr,o);
  if(vr.t){const[tr,tg,tb,tk]=vr.t;for(let q=0;q<im.length;q+=4){if(!im[q+3])continue;if(im[q]===30&&im[q+1]===20&&im[q+2]===38)continue;if(isN(im,q)||isE(im,q))continue;im[q]+=(tr-im[q])*tk;im[q+1]+=(tg-im[q+1])*tk;im[q+2]+=(tb-im[q+2])*tk}}
  cx.putImageData(new ImageData(im,Wd,Hd),i*Wd,0);
  const g2=new Uint8ClampedArray(im.length);for(let q=0;q<im.length;q+=4)if(im[q+3]&&(isN(im,q)||isE(im,q))){g2[q]=im[q];g2[q+1]=im[q+1];g2[q+2]=im[q+2];g2[q+3]=255;hasG=true}gx.putImageData(new ImageData(g2,Wd,Hd),i*Wd,0)});
 const mkT=c=>{const t=new TH.CanvasTexture(c);t.magFilter=t.minFilter=TH.NearestFilter;t.generateMipmaps=false;t.colorSpace=TH.SRGBColorSpace;t.repeat.set(1/nf,1);return t};
 const tex=mkT(cv),u=PXSZ/PXH,mat=new TH.MeshBasicMaterial({map:tex,alphaTest:.5,side:TH.DoubleSide,transparent:!!op,opacity:op||1});mat.userData.px=1;
 const geo=new TH.PlaneGeometry(Wd*u,Hd*u).translate(0,Hd*u/2-pad*u,0);
 let tg=null,gm=null;if(hasG){tg=mkT(cg);gm=new TH.MeshBasicMaterial({map:tg,alphaTest:.5,side:TH.DoubleSide,fog:false,depthWrite:false,transparent:true,polygonOffset:true,polygonOffsetFactor:-2});gm.userData.px=1}
 const g=new TH.Group(),pk=bd&&kk==='wolf'&&/^meute/.test(nm),OF=pk?[[0,0],[2.1,.8],[-2.1,.8]]:[[0,0]],U=[],bigK=kk==='dragon'||kk==='dking'||kk==='hydra'||kk==='wyrm'||kk==='wyvern';
 for(const [ox,oz] of OF){const w=new TH.Group(),m=new TH.Group(),piv=new TH.Group(),me=new TH.Mesh(geo,mat);me.castShadow=true;piv.add(me);if(gm){const gs=new TH.Mesh(geo,gm);gs.position.z=.03;piv.add(gs)}m.add(piv);w.add(m);w.position.set(ox,0,oz);g.add(w);U.push({m,piv,w,ox,oz})}
 const b={g,S0:1,fly:fly?.7:0,wide:pk?1.5:bigK?1.4:1,spr:1,dead:0,fade:0,eth,enter:(kk==='dking'&&!!e.boss)||!!e.el||['dragon','hydra','lich','giant'].includes(kk)||(kk==='demon'&&/^archi/i.test(e.n)),t0:performance.now(),pp:1,fi:1,eoy:0};
 // v4.0.2 : entrées propres (dragon : atterrissage, hydre : vapeur, liche et archidémon : portail)
 b.ek=kk==='dragon'?'drop':kk==='hydra'?'mist':(kk==='lich'||(kk==='demon'&&/^archi/i.test(e.n)))?'portal':null;b.ec={drop:'#e8dcc0',mist:'#bfe8f4',portal:kk==='lich'?'#b070ff':'#ff4a30'}[b.ek]||'#ff8a30';
 let au=null,ring=null,pr=null;
 if(kk==='dking'){au=new TH.Sprite(new TH.SpriteMaterial({map:glowTex(),color:'#c01830',blending:TH.AdditiveBlending,depthWrite:false,transparent:true,opacity:.45,fog:false}));au.scale.set(4.2,4.2,1);au.position.set(0,.95,0);g.add(au)}
 if(b.enter){ring=new TH.Group();for(let i=0;i<8;i++){const sp=new TH.Sprite(new TH.SpriteMaterial({map:glowTex(),color:b.ec,blending:TH.AdditiveBlending,depthWrite:false,transparent:true,opacity:0,fog:false}));sp.scale.set(.9,.9,1);ring.add(sp)}g.add(ring)}
 if(b.ek==='portal'){pr=new TH.Mesh(new TH.PlaneGeometry(1,1).rotateX(-PI/2),new TH.MeshBasicMaterial({map:fxTex('ring'),color:b.ec,blending:TH.AdditiveBlending,transparent:true,depthWrite:false,fog:false}));pr.position.y=.06;g.add(pr)}
 b.anim=(t,lg)=>{const az=K.az||0,rel=-PI/2-az,bk=!bd&&Math.cos(rel)<-.35,mx=Math.sin(rel)<-.35?-1:1,d=b.dead,fd=b.fade,at=lg>.55&&d<=0&&fd<=0,
  f=bd?(at?1:(fly&&d<=0&&Math.floor(t*6)%2?2:0)):((bk?2:0)+(at?1:0)),tl=-Math.atan2(cam3.position.y,Math.hypot(cam3.position.x-K.tx,cam3.position.z-K.tz))*.75,
  en=b.enter?Math.min(1,(performance.now()-b.t0)/2200):1;if(en>=1)b.enter=false;
  tex.offset.x=f/nf;if(tg)tg.offset.x=f/nf;
  for(const {m,piv,w,ox,oz} of U){if(pk)w.position.set(ox*Math.sin(az)-oz*Math.cos(az),0,ox*Math.cos(az)+oz*Math.sin(az));m.rotation.y=az+PI/2;let sx=mx,sy=1+(d>0?0:Math.sin(t*2)*.012);
   if(bd){piv.rotation.x=tl*(1-d)-(PI/2-.04)*d;piv.rotation.z=0;piv.position.y=.12*d}
   else if(kk==='golem'){piv.rotation.x=tl;piv.rotation.z=0;sy=1-.7*d;sx=mx*(1+.25*d)}
   else{piv.rotation.x=tl;piv.rotation.z=-PI/2*d}
   if(en<1&&b.ek!=='drop')sy*=Math.max(.02,en*en);sy*=b.pp;piv.scale.set(sx,sy,1)}
  const l=Math.min(1.1,1-.5*dk())*(1-.45*d);mat.color.setRGB(l,l,l*1.06);if(op)mat.opacity=op*(1-.4*d)*(1-fd)*b.fi;
  if(gm){gm.color.setRGB(1,1,1);gm.opacity=(.82+.18*Math.sin(t*4))*(1-.7*d)*(1-fd)*Math.min(1,en*1.5)}
  if(au){au.scale.setScalar(4.2*(1+.07*Math.sin(t*3)));au.material.opacity=(.4+.1*Math.sin(t*3))*(1-d)*en;au.visible=d<1}
  if(ring){ring.visible=en<1;if(ring.visible)ring.children.forEach((sp,i)=>{const a=i/8*6.283+t*1.5,ek=b.ek;let r=1.4*(1-.25*en),y=.2+en*1.3*(((i%3)+1)/3),o2=(1-en)*.9,k=.7+.5*Math.sin(t*9+i);
   if(ek==='drop'){r=1.2+3.2*en;y=.25+.5*en;o2=en>.55?(1-en)/.45*.9:0;k=1.1}
   else if(ek==='mist'){r=1.9*(1-.2*en);y=.3+en*1.6*(((i%3)+1)/3);o2=(1-en)*.75;k=(1.1+.4*Math.sin(t*3+i))*1.8}
   else if(ek==='portal'){r=1.7*(1-.5*en);y=.1+en*2*(((i%3)+1)/3);k=.6+.4*Math.sin(t*9+i)}
   sp.position.set(Math.cos(a)*r,y,Math.sin(a)*r);sp.material.opacity=o2;sp.scale.setScalar(k)})}
  b.eoy=b.ek==='drop'?Math.pow(1-Math.min(1,en/.55),2)*7:0;if(b.eoy)g.position.y+=b.eoy;
  if(pr){pr.visible=en<1;if(pr.visible){pr.scale.setScalar(3.4*(.35+.65*Math.min(1,en*1.5)));pr.rotation.y=t*2.2;pr.material.opacity=Math.min(1,(1-en)*1.6)*.9}}};
 return b}
const KMX=(k,n)=>k==='spider'||k==='bat'?(/g[ée]ante/.test(n)?1.6:1):k==='worm'?(/colossal/.test(n)?1.55:1):k==='giant'?(/titan/.test(n)?1.25:/ogre/.test(n)?.8:/temp[êe]tes/.test(n)?1.12:1):k==='lich'?(/seigneur/.test(n)?1.3:.88):k==='troll'?(/ombres/.test(n)?1.12:1):k==='goblin'?(/chaman/.test(n)?.92:1):k==='bandit'?(/grand chemin/.test(n)?1.08:1):k==='orc'?(/maudit/.test(n)?1.1:1):k==='knight'?(/mort/.test(n)?1.12:/momifi/.test(n)?1.05:1):k==='skel'?(/archer/.test(n)?.95:1):1;
function monBuild(mk,h){const e=h.en,b=buildSprMon(mk,e,h),nm=e.n.toLowerCase(),
  ql=Math.max(0,Math.min(1,(Math.log((e.d||1)+1)-.7)/3.5)),km=mk==='dragon'?(/^dragonnet/.test(nm)?.8:/^drake/.test(nm)?1:/^wyrm/.test(nm)?1.1:/^wyvern/.test(nm)?.95:1.4):mk==='demon'?(/mineur/.test(nm)?.65:/^archi/.test(nm)?1.35:/succube|incube/.test(nm)?.85:1):mk==='salam'?(/g[ée]ante/.test(nm)?1.35:1):KMX(mk,nm);
 if(!(b.fly>0))b.g.add(csChar((b.wide||1)*1.7));
 b.S0=(SZ[mk]||1)*km*(.85+.4*ql)*(.95+.1*jt(hid(e.n)+h.id*7,2));b.g.scale.setScalar(HS*b.S0);b.g.userData.mk=mk;return b}
const MN=new Map(),MCP=[];let monG=null;
function mlg(h,tm){const o=HM.get(h.id),a=o&&o.at;if(!a)return 0;const q=tm-a.t0-a.ty.d*ASL*.8,L=.9*ASL;return q>0&&q<L?Math.sin(PI*q/L)*1.1:0}
// v4.0.2 : apparition sur place selon la famille, recul d'armement avant l'élan
function mwd(h,tm){const o=HM.get(h.id),a=o&&o.at;if(!a)return 0;const q=tm-a.t0-a.ty.d*ASL*.8,W=.35*ASL;return q>-W&&q<=0?Math.sin(PI*(q+W)/W)*.5:0}
function monAppear(o,tm){const b=o.b,g=o.g,bx=g.position.x,bz=g.position.z,by=g.position.y,S=b.S0||1,mk=g.userData.mk;if(b.enter)return;
 const fire=mk==='demon'||mk==='salam'||mk==='elem';
 if(b.eth||b.fly>0||fire){const tx=fire?'flame':'mote';for(let i=0;i<6;i++){const a=i/6*6.28+i*.5,r=.5*S,s=fxSp(tx,fire?.7:.6,fire?1:.6,bx+Math.cos(a)*r,by+.2,bz+Math.sin(a)*r);s.material.color.set(fire?'#ff9a40':b.eth?'#cfe8ff':'#ffffff');fxAdd(s,tm+i*.04,.8,(p,s)=>{s.position.y=by+.2+p*1.6*S;s.material.opacity=1-p})}}
 else fxDust(o)}
function updMon(dt,tm,BM){const seen=new Set();
 for(const h of S.hero){if(h.st!=='fight'||!h.en||h.pw>0)continue;const mk=mkind(h.en.n);if(!mk||!SPR(mk))continue;seen.add(h.id);const key=mk+'|'+h.en.n;let o=MN.get(h.id);
  if(o&&o.key!==key){monG.remove(o.g);disp(o.g);MN.delete(h.id);o=null}
  if(!o){const b=monBuild(mk,h);o={g:b.g,b,key,ph:Math.random()*6,t0:tm,nw:1};monG.add(o.g);MN.set(h.id,o)}
  const [hx,hz]=hpos(h,BM),S0=o.b.S0,off=3.4+2.1*S0*Math.min(1.5,o.b.wide||1),lg=mlg(h,tm),x=hx+off-lg*(1.35+.12*S0)+mwd(h,tm);
  o.g.position.set(x,HC(x,hz)+o.b.fly*S0*HS*.45+Math.sin(tm*3+h.id)*.1,hz);o.g.rotation.y=-PI/2;if(o.nw){o.nw=0;monAppear(o,tm)}
  {const q=Math.min(1,(tm-o.t0)/.4),eb=1+2.7*Math.pow(q-1,3)+1.7*Math.pow(q-1,2);o.b.pp=(o.b.enter||o.b.eth||o.b.fly>0)?1:.55+.45*eb;o.b.fi=o.b.eth?Math.min(1,(tm-o.t0)/.9):1}
  o.b.anim(tm+o.ph,lg)}
 for(const [id,o] of MN)if(!seen.has(id)){MN.delete(id);const hq=S.hero.find(q=>q.id===id);if(o.b.spr&&hq&&hq.loot){o.age=0;MCP.push(o)}else{monG.remove(o.g);disp(o.g)}}
 for(let i=MCP.length-1;i>=0;i--){const o=MCP[i];o.age+=dt;if(o.b.eth){o.b.fade=Math.min(1,o.age/2);o.b.anim(tm+o.ph,0);if(o.age>2){monG.remove(o.g);disp(o.g);MCP.splice(i,1)}continue}if(o.x0==null){o.x0=o.g.position.x;o.dp=0}const t7=Math.min(1,o.age/.8);o.b.dead=t7<.62?t7/.62*1.06:1.06-.06*(t7-.62)/.38;o.g.position.x=o.x0+.9*Math.min(1,o.age/.5);if(!o.dp&&o.age>.4){o.dp=1;fxDust(o)}if(o.b.fly>0){const gy=HC(o.g.position.x,o.g.position.z);o.g.position.y+=(gy-o.g.position.y)*Math.min(1,dt*6)}o.b.anim(tm+o.ph,0);if(o.age>52){monG.remove(o.g);disp(o.g);MCP.splice(i,1)}}}
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
 PP.mf=sm('uniform sampler2D tD;uniform sampler2D tB;uniform vec2 px;uniform float bs,fl;uniform vec3 tint;varying vec2 vUv;void main(){float r=smoothstep(.1,.42,abs(vUv.y-.5))*4.5;vec3 c=texture2D(tD,vUv).rgb;if(r>.25){vec3 s=c;for(int i=0;i<10;i++){float a=float(i)*2.39996;float rr=sqrt((float(i)+.5)/10.)*r;s+=texture2D(tD,vUv+vec2(cos(a),sin(a))*rr*px).rgb;}c=s/11.;}c+=texture2D(tB,vUv).rgb*bs;c*=tint;c+=fl*vec3(.5,.55,.8)*.25;c*=mix(.6,1.,1.-smoothstep(.35,.95,length((vUv-.5)*vec2(1.,1.15))));gl_FragColor=vec4(c,1.);\n#include <tonemapping_fragment>\n#include <colorspace_fragment>\n}',{tD:{value:null},tB:{value:null},px:{value:new TH.Vector2()},bs:{value:.4},fl:{value:0},tint:{value:new TH.Vector3(1,1,1)}})}
function ppRender(){const v=K.v2||(K.v2=new TH.Vector2());ren.getDrawingBufferSize(v);const w=v.x|0,h=v.y|0;if(!PP.ok){ppInit();PP.ok=1}
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
 if(fol!=null){const h=S.hero.find(z=>z.id===fol),q=h||deads().find(z=>z.id===fol);if(q){const [x,z]=h?hpos(h,bAssign()):[q.x,q.y];if(K.lastFol!==fol){K.dist=Math.min(K.dist,70);K.lastFol=fol}K.tx+=(x-K.tx)*Math.min(1,dt*6);K.tz+=(z-K.tz)*Math.min(1,dt*6)}else fol=null}else K.lastFol=null;
 {const w=fol!=null?HW(K.tx,K.tz):H3(K.tx,K.tz);K.ty=K.ty==null?w:K.ty+(w-K.ty)*Math.min(1,dt*6)}
 K.dist=Math.min(950,Math.max(32,K.dist));K.tx=Math.min(WXd,Math.max(0,K.tx));K.tz=Math.min(WYd,Math.max(0,K.tz));
 {const s=Math.min(260,Math.max(70,K.dist*.5)),sc3=sun.shadow.camera;if(Math.abs(sc3.right-s)>4){sc3.left=-s;sc3.right=s;sc3.top=s;sc3.bottom=-s;sc3.updateProjectionMatrix()}}
 camPlace()}
function camPlace(){K.dist=Math.min(950,Math.max(32,K.dist));K.tx=Math.min(WXd,Math.max(0,K.tx));K.tz=Math.min(WYd,Math.max(0,K.tz));const ty=K.ty==null?H3(K.tx,K.tz):K.ty,cp=Math.cos(K.tilt),sp=Math.sin(K.tilt);
 cam3.position.set(K.tx+Math.sin(K.az)*cp*K.dist,ty+sp*K.dist,K.tz+Math.cos(K.az)*cp*K.dist);cam3.lookAt(K.tx,ty,K.tz);cam3.updateMatrixWorld()}
const PT=new Map();let G3={pd:0,pc:null,tp:null};
const RV=new TH.Vector3(),RD3=new TH.Vector3();
function ground(sx,sy){RV.set(sx/W*2-1,-(sy/H)*2+1,.5).unproject(cam3);RD3.copy(RV).sub(cam3.position).normalize();const y=K.ty==null?H3(K.tx,K.tz):K.ty,t=(y-cam3.position.y)/(RD3.y||-1e-6);return[cam3.position.x+RD3.x*t,cam3.position.z+RD3.z*t]}
function dragTo(a,b){const g0=ground(a[0],a[1]),g1=ground(b[0],b[1]);K.tx+=g0[0]-g1[0];K.tz+=g0[1]-g1[1];camPlace()}
function zoomAtPt(px,py,f){const g0=ground(px,py);K.dist=Math.min(950,Math.max(32,K.dist/f));camPlace();const g1=ground(px,py);K.tx+=g0[0]-g1[0];K.tz+=g0[1]-g1[1];camPlace()}
function glTap(x,y){const y_=y;let b=null,bd=1e9;const BM=bAssign();for(const q of S.hero){if(hidn(q)&&!BM.get(q.id))continue;const [hx,hz]=hpos(q,BM);V3a.set(hx,HC(hx,hz)+HS*.7,hz).project(cam3);const sx=(V3a.x*.5+.5)*W,sy=(-V3a.y*.5+.5)*H,d=Math.hypot(sx-x,sy-y);if(d<bd){bd=d;b=q}}
 for(const m of deads()){V3a.set(m.x,HW(m.x,m.y)+1.5,m.y).project(cam3);if(V3a.z>1)continue;const d=Math.hypot((V3a.x*.5+.5)*W-x,(-V3a.y*.5+.5)*H-8-y);if(d<bd){bd=d;b=m}}
 if(b&&bd<34){fol=b.id;K.dist=Math.min(K.dist,70);gpShow(false)}else{fol=null;let bk=false,bm=1;for(const it of S.pl){const k=GPK.find(k=>it.e===NE[k]);if(!k||it.cn)continue;const p=slot(it),bx=T.x+p[0],bz=T.y+p[1],y=HW(bx,bz),pr=h=>{V3a.set(bx,y+h,bz).project(cam3);return[(V3a.x*.5+.5)*W,(-V3a.y*.5+.5)*H,V3a.z]},c=pr(3),t=pr(7),q=Math.hypot(c[0]-x,c[1]-y_)/Math.max(26,Math.hypot(t[0]-c[0],t[1]-c[1])*1.4);if(c[2]<1&&q<bm){bm=q;bk=k}}gpShow(bk)}}
function bindInput(){
 cv.addEventListener('pointerdown',e=>{if(!K.on)return;e.stopImmediatePropagation();try{cv.setPointerCapture(e.pointerId)}catch(_){}PT.set(e.pointerId,[e.offsetX,e.offsetY]);G3.pd=0;G3.pc=null;G3.pa=null;G3.rg=0;G3.ro=0;G3.tp=e.isPrimary&&PT.size<=1?{x:e.offsetX,y:e.offsetY,t:Date.now(),m:0}:null},true);
 cv.addEventListener('pointermove',e=>{if(!K.on)return;e.stopImmediatePropagation();if(!PT.has(e.pointerId))return;const o=PT.get(e.pointerId),n=[e.offsetX,e.offsetY];PT.set(e.pointerId,n);
  if(G3.tp&&Math.hypot(e.offsetX-G3.tp.x,e.offsetY-G3.tp.y)>8){G3.tp.m=1;fol=null}
  if(PT.size===1){if(G3.tp&&G3.tp.m)fol=null;dragTo(o,n)}
  else if(PT.size===2){const [a,b]=[...PT.values()],d=Math.hypot(a[0]-b[0],a[1]-b[1]),cn=[(a[0]+b[0])/2,(a[1]+b[1])/2];if(G3.pd&&G3.pc){if(fol!=null)K.dist=Math.min(950,Math.max(32,K.dist/(d/G3.pd)));else{zoomAtPt(G3.pc[0],G3.pc[1],d/G3.pd);dragTo(G3.pc,cn)}}{const an=Math.atan2(b[1]-a[1],b[0]-a[0]);if(G3.pa!=null){let da=an-G3.pa;if(da>PI)da-=2*PI;if(da<-PI)da+=2*PI;if(!G3.ro){G3.rg=(G3.rg||0)+da;if(Math.abs(G3.rg)>.52){G3.ro=1;da=G3.rg}else da=0}if(G3.ro)K.az+=da}G3.pa=an}G3.pd=d;G3.pc=cn}},true);
 const up=e=>{if(!K.on)return;e.stopImmediatePropagation();PT.delete(e.pointerId);G3.pd=0;G3.pc=null;G3.pa=null;G3.rg=0;G3.ro=0;if(e.type==='pointerup'&&G3.tp&&!G3.tp.m&&Date.now()-G3.tp.t<500)glTap(e.offsetX,e.offsetY);if(!PT.size)G3.tp=null};
 cv.addEventListener('pointerup',up,true);cv.addEventListener('pointercancel',up,true);
 cv.addEventListener('wheel',e=>{if(!K.on)return;e.stopImmediatePropagation();e.preventDefault();if(fol!=null)K.dist=Math.min(950,Math.max(32,K.dist/(e.deltaY<0?1.15:.87)));else zoomAtPt(e.offsetX,e.offsetY,e.deltaY<0?1.15:.87)},{capture:true,passive:false});
 cv.addEventListener('dblclick',e=>{if(!K.on)return;e.stopImmediatePropagation();fol=null;K.dist=88;K.tx=T.x;K.tz=T.y;K.az=0;K.tilt=.6;camPlace()},true)}
// ---------- calques 2D (noms, bulles, météo, panneaux) ----------
function pj(x,y,z){V3a.set(x,y,z).project(cam3);return V3a.z>1?null:[(V3a.x*.5+.5)*W,(-V3a.y*.5+.5)*H]}
function overlay(BM){
 cx.save();cx.setTransform(window.devicePixelRatio||1,0,0,window.devicePixelRatio||1,0,0);cx.clearRect(0,0,W,H);cx.textAlign='center';cx.lineJoin='round';
 const fs=12,LB=[],lab=(t,i,p,c,ex)=>{if(p)LB.push({t,i,x:p[0],y:p[1],c,ex:ex||[]})};
 const ZI={'Forêt':'🌲','Mine':'⛏️','Montagne':'🏔️','Ruines':'🏚️','Donjon':'🏰','Volcan':'🌋'};
 for(const z of ZA){const p=pj(z.x,H3(z.x,z.y)+(z.n==='Montagne'?26:z.n==='Volcan'?18:14)*ZF,z.y);if(!p)continue;const t=z.sn||z.n,s=Math.max(.85,Math.min(1.5,260/K.dist));cx.font=`700 ${12*s}px Alegreya,serif`;cx.lineWidth=3;cx.strokeStyle='rgba(20,28,22,.85)';cx.strokeText((z.boss?'👹 ':(ZI[z.n]||'⚔️')+' ')+t,p[0],p[1]);cx.fillStyle='#fff';cx.fillText((z.boss?'👹 ':(ZI[z.n]||'⚔️')+' ')+t,p[0],p[1]);cx.font=`${11*s}px serif`;cx.fillText(z.boss?'👑':'🔥'.repeat(z.vi+1),p[0],p[1]+13*s)}
 for(const h of S.hero){const bm=BM.get(h.id);if(hidn(h)&&!bm)continue;const [x,z]=hpos(h,BM),hh=HS*(PXSZ*.97+.12+(ride(h)?RDY():0));let p=pj(x,HC(x,z)+hh,z);if(HM.get(h.id)?.m.userData.pa){ // Paladin : le nom suit l'auréole, penchée comme l'image
   const L=Math.atan2(cam3.position.y,Math.hypot(cam3.position.x-K.tx,cam3.position.z-K.tz))*.75,t=HS*PXSZ*(.91+.08*L+(ride(h)?.07:0)),o=t*Math.sin(L);p=pj(x-Math.sin(K.az||0)*o,HC(x,z)+t*Math.cos(L)+HS*((ride(h)?RDY():0)+.12),z-Math.cos(K.az||0)*o)}if(!p)continue;
  const ex=[];if(h.st==='fight'&&h.en)ex.push([h.en.n,'#ffb3a8']);if(showT&&(h.st==='go'||h.st==='back'))ex.push([fm(rem(h)),'#e6f1ff']);
  lab(`${sn(h.name)} · niv. ${h.lv}`,/⁠/.test(h.name),p,h.id===fol?FOLC:'#fff',ex)}
 if(fol!=null){const q=S.hero.find(z=>z.id===fol);if(q&&hidn(q)&&!BM.get(q.id)){const ib=vdim().u.find(a=>a[1]===NE.A);if(ib){const x=T.x+ib[0][0],z=T.y+ib[0][1]+3.3,p=pj(x,H3(x,z)+3.6,z);if(p){lab(`${sn(q.name)} · niv. ${q.lv}`,/\u2060/.test(q.name),p,FOLC,[['en repos','#b8e0ff']])}}}}
 for(const k in S.npc){const it=S.pl.find(x=>x.e===NE[k]);if(!it||it.cn||!NPV[k])continue;const n=S.npc[k],[x,z]=(o=>o?[o.g.position.x,o.g.position.z]:npcPos(k,it))(NPG.get(k)),p=pj(x,H3(x,z)+HS*(PXSZ*.97+.4),z);lab(`${sn(n.n)} · niv. ${n.lv}`,/\u2060/.test(n.n),p,'#e6d6ff')}
 for(const it of S.pl){const c=it.cn||it.rb;if(!c)continue;const p=slot(it),x=T.x+p[0],z=T.y+p[1],q=pj(x,H3(x,z)+(BTOP[NK[it.e]||'H']||6.7)+3,z);lab('🔨 '+Math.min(99,Math.floor(c.t/c.T*100))+' %',0,q,'#fff')}
 for(const m of S.marks){const a=S.t-m.t;if(a>MKT)continue;const p=pj(m.x,HW(m.x,m.y)+1.5,m.y);if(!p)continue;cx.globalAlpha=Math.max(.35,1-a/240);cx.font='20px serif';cx.fillText('💀',p[0],p[1]);if(m.n){cx.font=(/⁠/.test(m.n)?'italic ':'')+`700 ${fs}px Alegreya,serif`;cx.lineWidth=3;cx.strokeStyle='rgba(20,28,22,.85)';cx.strokeText(sn(m.n),p[0],p[1]+14);cx.fillStyle=m.id===fol?FOLC:'#fff';cx.fillText(sn(m.n),p[0],p[1]+14)}cx.globalAlpha=1}
 const PL=[],lh=fs*1.15;LB.sort((a,b)=>a.y-b.y);for(const l of LB){const f1=`700 ${fs}px Alegreya,serif`,fm1=(l.i?'italic ':'')+f1;cx.font=fm1;l.w=cx.measureText(l.t).width+4;cx.font=f1;for(const e of l.ex)l.w=Math.max(l.w,cx.measureText(e[0]).width+4);const bt=q=>q.y+lh*q.ex.length+3;for(let k=0;k<20&&PL.some(p=>Math.abs(p.x-l.x)<(p.w+l.w)/2&&l.y-fs<bt(p)&&p.y-fs<bt(l));k++)l.y-=fs*1.05;PL.push(l);cx.font=fm1;cx.lineWidth=2.8;cx.strokeStyle='rgba(20,28,22,.85)';cx.strokeText(l.t,l.x,l.y);cx.fillStyle=l.c||'#fff';cx.fillText(l.t,l.x,l.y);cx.font=f1;l.ex.forEach((e,j)=>{const y=l.y+lh*(j+1);cx.strokeText(e[0],l.x,y);cx.fillStyle=e[1];cx.fillText(e[0],l.x,y)})}
 cx.restore();
 {const now=performance.now(),rs=CR.filter(r=>now-r.at<25000).reverse(),f=S.hero.filter(h=>h.st==='fight').slice(0,3),L=[...f.map(h=>({t:`${h.name} ⚔️ ${h.en.n}`,c:'#fff'})),...rs].slice(0,5);
  if(L.length){const fz=sc*2.9,lh=fz*1.4;cx.font=`${fz}px Alegreya,serif`;const mw=Math.max(...L.map(l=>cx.measureText(sn(l.t)).width))+14,pw=Math.min(W-12,Math.max(W*.5,mw));cx.fillStyle='rgba(20,24,26,.8)';cx.beginPath();cx.roundRect(6,6,pw,lh*(L.length+1)+8,8);cx.fill();cx.textAlign='left';cx.fillStyle='#e2b43c';cx.font=`700 ${fz}px Alegreya,serif`;cx.fillText(f.length?'Combats en cours':'Combats',12,6+lh);L.forEach((l,i)=>{cx.fillStyle=l.c;cx.font=(/⁠/.test(l.t)?'italic ':'')+`${fz}px Alegreya,serif`;cx.fillText(sn(l.t),12,6+lh*(i+2))});cx.textAlign='center'}}
 if(S.alert&&performance.now()-S.alert.at<25000){cx.fillStyle='rgba(192,57,43,.95)';cx.beginPath();cx.roundRect(6,H-sc*9-6,W-12,sc*9,8);cx.fill();cx.fillStyle='#fff';cx.font=`700 ${sc*3.6}px Alegreya,serif`;cx.fillText(sn(S.alert.txt),W/2,H-sc*9-6+sc*5.6)}
 if(K.fpsOn){const fz=sc*2.9;cx.font=`700 ${fz}px Alegreya,serif`;cx.textAlign='right';cx.lineWidth=3;cx.strokeStyle='rgba(20,24,26,.9)';const t=`${Math.round(K.fps||0)} fps · ${Math.round(ren.info.render.triangles/1000)}k tri · ${['Basse','Moyenne','Haute'][K.ql]}${K.q==='auto'?' (auto)':''} · ×${K.pr}`;cx.strokeText(t,W-6,H-6);cx.fillStyle='#9fe39f';cx.fillText(t,W-6,H-6)}}
// ---------- init / boucle ----------
function isSafe(){try{return localStorage.getItem('bvsafe')==='1'}catch(e){return false}}
function bwShow(v){const e=$('bw');if(!e)return;clearTimeout(bwShow.t);if(v)e.hidden=false;else bwShow.t=setTimeout(()=>{e.hidden=true},350)}
function init(){
 if(K.ok||K.fail)return K.ok;
 try{
  glc=document.createElement('canvas');glc.style.cssText='position:absolute;z-index:0;pointer-events:none;border-radius:10px;display:none';cv.style.position='relative';cv.style.zIndex='1';cv.style.background='transparent';cv.parentElement.insertBefore(glc,cv);
  glc.addEventListener('webglcontextlost',e=>{e.preventDefault();gpuLost()});
  const SF=isSafe();ren=new TH.WebGLRenderer({canvas:glc,antialias:!SF,powerPreference:SF?'default':'high-performance',preserveDrawingBuffer:/dbg=1/.test(location.search)});
  if(!ren.getContext())throw 0;
  K.prMax=Math.min(window.devicePixelRatio||1,1.5);K.pr=K.prMax;ren.setPixelRatio(K.pr);
  ren.shadowMap.enabled=!SF;ren.shadowMap.type=TH.PCFSoftShadowMap;ren.shadowMap.autoUpdate=true;ren.toneMapping=TH.ACESFilmicToneMapping;ren.toneMappingExposure=1.05;
  scn=new TH.Scene();scn.fog=new TH.Fog('#93bcdc',700,2300);
  cam3=new TH.PerspectiveCamera(34,W/H,5,3200);
  hemi=new TH.HemisphereLight('#d7e8ff','#6a7a50',1);scn.add(hemi);
  sun=new TH.DirectionalLight('#fff2d6',2.4);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-95,right:95,top:95,bottom:-95,near:1,far:700});sun.shadow.bias=-.0006;sun.shadow.normalBias=.35;scn.add(sun,sun.target);fill=new TH.DirectionalLight('#ffeacc',.7);scn.add(fill,fill.target);skyInit();
  worldG=new TH.Group();villG=new TH.Group();heroG=new TH.Group();scn.add(worldG,villG,heroG);npcG=new TH.Group();monG=new TH.Group();torchG=new TH.Group();scn.add(npcG,monG,torchG);plInit();
  bindInput();ren.info.autoReset=false;K.ok=true;applyQ()}catch(e){K.fail=true;K.ok=false;if(window.ldHide)ldHide();try{if(glc&&glc.parentElement)glc.parentElement.removeChild(glc)}catch(_){}
  setTimeout(()=>{try{const t='3D indisponible : force l’arrêt de Chrome puis réessaie.';log(t);toast(t,8000)}catch(_){}},1200)}
 return K.ok}
function resize(){if(!K.ok)return;const r=cv.getBoundingClientRect();if(!r.width)return;glc.style.width=r.width+'px';glc.style.height=(r.width*1.3)+'px';glc.style.left=(cv.offsetLeft+1)+'px';glc.style.top=(cv.offsetTop+1)+'px';ren.setSize(r.width,r.width*1.3,false);cam3.aspect=1/1.3;cam3.updateProjectionMatrix()}
let lt=0;
function frame(){
 if(gpuLost.on)return true;
 if(!K.ok&&!init()){K.on=false;window.BRO=false;return false}
 if(ren.getContext().isContextLost()){gpuLost();return true}
 const now=performance.now(),dt=Math.min(.1,(now-(lt||now))/1000);lt=now;const tm=now/1000;
 if(!glc.style.width||glc.style.display==='none'){glc.style.display='block';resize()}
 const vd=vdim();VR={rx:vd.rx,ry:vd.ry};
 if((K.kc=((K.kc|0)+1)%3)===1){const gk=W+JSON.stringify(S.zp)+T.x+','+T.y+BZ.x+','+BZ.y+S.zv.join('')+vd.rx.toFixed(1)+vd.ry.toFixed(1),pk=S.pl.map(i=>i.i+i.e).join(','),vgk=gk+'|'+pk;
 // v4.0.5 : nouveau batiment -> afficher le message, laisser le temps de le peindre, puis calculer
 let go=true;if(K.plk!=null&&pk!==K.plk){if(!K.bwT){K.bwT=performance.now();bwShow(true)}if(performance.now()-K.bwT<120){go=false;K.kc=0}}
 if(go){
 if(gk!==gKey){gKey=gk;if(K.tkey!==T.x+','+T.y){K.tkey=T.x+','+T.y;K.tx=T.x;K.tz=T.y-70;fol=null}try{paintGround();buildTerrain();buildWorld()}catch(e){K.err=e}}
 if(vgk!==vgKey){vgKey=vgk;try{buildVillageGround()}catch(e){K.err=e}}
 const vk=T.x+','+T.y+';'+S.pl.map(i=>i.i+i.e+(i.cn?'c'+bstg(i):(i.rb?'r':'t')+tr(NK[i.e]||'H'))+((i.h&&i.h.o!=null&&(S.hero.find(q=>q.id===i.h.o)||{}).col)||'')).join(',');
 if(vk!==vKey){vKey=vk;try{buildVillageMesh()}catch(e){K.err=e}}
 K.plk=pk;if(K.bwT){K.bwT=0;bwShow(false)}}}
 const BM=DBG.m?new Map():updHeroes(dt,tm);try{if(!DBG.m){updNpc(dt,tm);updMon(dt,tm,BM)}wxUpd(dt,tm);torchUpd(tm);windUpd(tm);rockUpd();grassUpd(tm);leafUpd(tm);ffUpd(tm);smUpd(tm);vgUpd(tm)}catch(e){K.err=e}updLight();updCam(dt);try{plUpd(dt,dkl())}catch(e){K.err=e}try{holeUpd(BM,dt)}catch(e){K.err=e}try{clrUpd(BM,dt)}catch(e){K.err=e}
 if(WTEX)WTEX.offset.x=-(tm*.12)%1;
 fcn++;ren.shadowMap.autoUpdate=false;const sunF=!!(fcn&1);sun.shadow.needsUpdate=sunF;let ptF=false;if(plOn&&!sunF){let s=PLS.find(q=>q.fresh&&q.k>.02);if(!s)for(let q=0;q<PLN;q++){const c=PLS[plRot=(plRot+1)%PLN];if(c.k>.02){s=c;break}}if(s){s.fresh=0;s.l.shadow.needsUpdate=true;ptF=true}}ren.shadowMap.needsUpdate=sunF||ptF;if(ptF){SHM.forEach(m=>{m.castShadow=false});PLX.castShadow=true}
 ren.info.reset();if(K.ql===2&&!PP.fail){try{ppRender()}catch(e){PP.fail=1;K.err=e;ren.setRenderTarget(null);ren.render(scn,cam3)}}else ren.render(scn,cam3);
 if(window.ldHide&&(K.nf=(K.nf||0)+1)>=3)ldHide();
 if(ptF){SHM.forEach(m=>{m.castShadow=true});PLX.castShadow=false}
 // résolution adaptative
 K.ft.push(K.fi>.0167?dt*.016667/K.fi:dt);K.fr=(K.fr||0)+dt;if(K.ft.length>50){const a=K.ft.reduce((s,v)=>s+v,0)/K.ft.length,nn=K.ft.length;K.ft=[];K.fps=nn/K.fr;K.fr=0;qAuto(a);if(plOn&&a>1/30&&K.pr<=1&&K.plc>3)K.plc--;
  if(a>1/38&&K.pr>1){K.pr=Math.max(1,K.pr-.25);ren.setPixelRatio(K.pr);resize()}else if(a<1/55&&K.pr<K.prMax){K.pr=Math.min(K.prMax,K.pr+.25);ren.setPixelRatio(K.pr);resize()}}
 overlay(BM);return true}
function setOn(v){K.on=!!v;if(K.on&&!init()){K.on=false}window.BRO=K.on;try{localStorage.setItem('bvr',K.on?'3':'2')}catch(e){}if(glc)glc.style.display=K.on?'block':'none';if(!K.on){PT.clear();cx.clearRect(0,0,W,H);K.bwT=0;bwShow(false)}else{gKey=vgKey=vKey='';K.plk=null;try{localStorage.removeItem('bvx')}catch(e){}}const b=$('r3');if(b)b.textContent=K.on?'🧊 3D':'🖼️ 2D';fit()}
function boot(){qload();
 const SF=isSafe();if(SF){K.q='b';K.ql=0;K.pf=.3;const q=$('qb');if(q){q.textContent='⚙️ Basse';q.onclick=()=>toast('Qualité bloquée par le mode sans échec')}}
 let v='2';try{v=localStorage.getItem('bvr')||'2'}catch(e){}K.on=v==='3'&&typeof THREE!=='undefined';window.BRO=K.on;const b=$('r3');if(b){b.onclick=()=>setOn(!K.on);b.textContent=K.on?'🧊 3D':'🖼️ 2D'}}
return{K,frame,resize,setOn,boot,H3,pj,hpos,HM,ground,dragTo,zoomAtPt,camPlace,get ok(){return K.ok}}
})();
const _draw2D=draw,_fit2D=fit;
draw=function(){if(GLX.K.on&&GLX.frame())return;_draw2D()};
fit=function(){_fit2D();GLX.resize()};
GLX.boot();
