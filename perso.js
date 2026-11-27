// v4.3.0 : nouveau personnage (Guerrier homme, 3D). Planches pré-calculées (perso_g_*.png), composées ici :
// corps (ligne 0 images, ligne 1 zones à recolorer : 40 métal, 80 cape, 120 cheveux, 200 bottes ; ligne 2 poing de profil),
// puis épée, bouclier, épaulières (une ligne par variante : 0 simple, 1-10 paliers, 11-20 thèmes légendaires).
const PG_M={"cw":112,"ch":128,"l":[{"w":53,"h":58,"f":[[0,67,53],[0,67,52],[0,67,53],[0,67,53],[0,67,52],[0,67,53],[1,74,50],[1,74,49],[1,74,50],[1,74,50],[1,74,49],[1,74,50],[2,55,58],[3,59,60],[2,56,57],[4,35,47],[5,20,53],[4,34,47]]},{"w":32,"h":46,"f":[[0,17,79],[0,17,78],[0,17,79],[0,17,79],[0,17,78],[0,17,79],[0,10,70],[0,10,69],[0,10,70],[0,10,70],[0,10,69],[0,10,70],[1,68,68],[1,67,68],[1,67,68],[1,67,69],[1,67,69],[1,67,69]]},{"w":65,"h":30,"f":[[0,26,59],[0,26,58],[0,26,59],[0,26,59],[0,26,58],[0,26,59],[1,24,59],[1,24,58],[1,24,59],[1,24,59],[1,24,58],[1,24,59],[2,51,56],[2,50,56],[2,50,56],[2,50,57],[2,50,57],[2,50,57]]}]};
// gl.js (portée privée) fournit PG.dep={WPM,PXHR,thFor}
// thèmes dans l'ordre de THP : [métal sombre, métal clair, cape sombre, cape claire] (null : cape démoniaque)
const PG_TH=[[[52,96,142],[232,250,255],[30,70,120],[96,160,214]],[[14,16,44],[104,108,170],[14,16,50],[48,52,116]],[[28,12,8],[142,92,70],[72,22,8],[190,72,18]],[[40,14,72],[214,164,252],[46,12,70],[140,66,190]],[[84,70,56],[246,236,208],[14,50,62],[50,140,156]],[[18,34,18],[142,184,122],[28,50,18],[78,118,44]],[[10,14,40],[100,118,176],[12,18,56],[42,58,128]],[[60,112,150],[240,255,255],[30,118,140],[130,218,230]],[[12,8,16],[118,100,116],null,null],[[96,52,8],[255,236,150],[110,66,18],[214,158,56]]];
const PG={on:(()=>{try{return localStorage.getItem('bvperso')==='1'}catch(e){return false}})(),ready:false,img:{},d:null};
// pied à y=120 dans une case 112x128 ; 112 px du nouveau personnage = 66 px de l'ancien
const PG_FEET=120,PG_AX=56,PG_S=66/112;
// emplacement de PXF -> image source (0-5 face, 6-11 dos, 12-17 profil ; face 2 et dos 8 = pose d'attente)
const PG_SLOT=(()=>{const a=new Array(29).fill(2);[[0,1,2,3,4,5],[6,7,8,9,10,11],[12,13,14,15,16,17]].forEach((l,v)=>l.forEach((k,i)=>{a[[[1,2,15,16,17,18],[4,5,19,20,21,22],[23,24,25,26,27,28]][v][i]]=k}));a[3]=a[8]=8;return a})();
function pgLoad(){if(!PG.on||typeof document==='undefined'||typeof Image==='undefined')return;const N=['corps','epee','bouclier','epaul'];let n=0;
 for(const k of N){const im=new Image();im.onload=()=>{PG.img[k]=im;if(++n===N.length){try{const c=pgCv(PG.img.corps.width,PG.img.corps.height),x=c.getContext('2d');x.drawImage(PG.img.corps,0,0);PG.d=x.getImageData(0,0,c.width,c.height);PG.ready=true}catch(e){}}};im.src='perso_g_'+k+'.png'}}
const pgCv=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c};
const pgUse=(cls,fem)=>PG.ready&&!!PG.dep&&cls==='G'&&!fem;
// variante d'une pièce selon son palier (0-14) ; à partir de 11, thème légendaire du jeu
const pgVar=(t,id)=>{t=Math.max(0,Math.min(14,t|0));return t<11?t:10+PG.dep.thFor(t,id)};
function pgPal(v){if(v>10){const q=PG_TH[v-11];return{lo:q[0],hi:q[1],c0:q[2],c1:q[3]}}const p=PG.dep.WPM[v-1],k=(c,f)=>c.map(a=>Math.floor(a*f));return{lo:k(p.d,.5),hi:p.l,c0:k(p.d,.6),c1:k(p.d,.9)}}
function pgHair(T,L){const R=85;if(L<R){const t=Math.max(0,L/R);return[36+(T[0]-36)*t,16+(T[1]-16)*t,44+(T[2]-44)*t]}const t=Math.min(.85,(L-R)/(255-R)*1.2);return[T[0]+(255-T[0])*t,T[1]+(248-T[1])*t,T[2]+(225-T[2])*t]}
// recolore une image du corps (k) : armure (métal + cape), bottes (palier propre) et cheveux
function pgBody(k,av,bv,hair){const{cw,ch}=PG_M,S=PG.d.data,W=PG.d.width,out=new ImageData(cw,ch),O=out.data,A=av?pgPal(av):null,B=bv?pgPal(bv):null;
 for(let y=0;y<ch;y++)for(let x=0;x<cw;x++){const i=(y*W+k*cw+x)*4,j=(y*cw+x)*4,a=S[i+3];if(a<128)continue;let r=S[i],g=S[i+1],b=S[i+2];const m=Math.round(S[((y+ch)*W+k*cw+x)*4]/40),L=.3*r+.59*g+.11*b,q=m===1?A:m===5?B:null;
  if(q){[r,g,b]=q.lo.map((v,n)=>v+(q.hi[n]-v)*L/255)}
  else if(m===2&&A){if(A.c0){const t=Math.max(0,Math.min(1,(r-55)/175));[r,g,b]=A.c0.map((v,n)=>v+(A.c1[n]-v)*t)}else{r*=.5;g*=.22;b*=.36}}
  else if(m===3&&hair){[r,g,b]=pgHair(hair,L)}
  O[j]=r;O[j+1]=g;O[j+2]=b;O[j+3]=255}
 const c=pgCv(cw,ch);c.getContext('2d').putImageData(out,0,0);return c}
// texture complète d'un héros : mêmes 29 emplacements que l'ancien sprite (PXF)
function pgSheet(id,eq){const{cw,ch,l}=PG_M,H=PG.dep.PXHR,hx=H[(id*5+3)%H.length],hair=[1,3,5].map(i=>parseInt(hx.slice(i,i+2),16));
 const av=pgVar(eq.a,id),bv=pgVar(eq.b,id),rows=[pgVar(eq.w,id),pgVar(eq.s,id),av],names=['epee','bouclier','epaul'],cv=pgCv(cw*PG_SLOT.length,ch),cx=cv.getContext('2d'),done={};
 const frame=k=>{if(done[k])return done[k];const c=pgCv(cw,ch),x=c.getContext('2d'),view=k/6|0,body=pgBody(k,av,bv,hair);
  const piece=n=>{const q=l[n],[u,dx,dy]=q.f[k];x.drawImage(PG.img[names[n]],u*q.w,rows[n]*q.h,q.w,q.h,dx,dy,q.w,q.h)},corps=()=>x.drawImage(body,0,0);
  if(view===0){corps();piece(2);piece(1);piece(0)}else if(view===1){piece(1);piece(0);corps();piece(2)}else{piece(1);corps();piece(0);x.drawImage(PG.img.corps,k*cw,2*ch,cw,ch,0,0,cw,ch);piece(2)}
  return done[k]=c};
 PG_SLOT.forEach((k,i)=>cx.drawImage(frame(k),i*cw,0));return cv}
pgLoad();
