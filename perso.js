// v4.3.2 : Guerrière (perso_f_*.png) ; images à la racine. Elle reprend les images d'épées et de boucliers du Guerrier, positions décalées (PG_FM, PG_FA).
// v4.3.1 : combat, victoire, construction, fouille (perso_g_act*.png, cases 160x160) et cavalier.
// v4.3.0 : nouveau personnage (Guerrier homme, 3D). Planches pré-calculées (perso_g_*.png), composées ici :
// corps (ligne 0 images, ligne 1 zones à recolorer : 40 métal, 80 cape, 120 cheveux, 200 bottes ; ligne 2 poing de profil),
// puis épée, bouclier, épaulières (une ligne par variante : 0 simple, 1-10 paliers, 11-20 thèmes légendaires).
const PG_M={"cw":112,"ch":128,"l":[{"w":53,"h":58,"f":[[0,67,53],[0,67,52],[0,67,53],[0,67,53],[0,67,52],[0,67,53],[1,74,50],[1,74,49],[1,74,50],[1,74,50],[1,74,49],[1,74,50],[2,55,58],[3,59,60],[2,56,57],[4,35,47],[5,20,53],[4,34,47]]},{"w":32,"h":46,"f":[[0,17,79],[0,17,78],[0,17,79],[0,17,79],[0,17,78],[0,17,79],[0,10,70],[0,10,69],[0,10,70],[0,10,70],[0,10,69],[0,10,70],[1,68,68],[1,67,68],[1,67,68],[1,67,69],[1,67,69],[1,67,69]]},{"w":65,"h":30,"f":[[0,26,59],[0,26,58],[0,26,59],[0,26,59],[0,26,58],[0,26,59],[1,24,59],[1,24,58],[1,24,59],[1,24,59],[1,24,58],[1,24,59],[2,51,56],[2,50,56],[2,50,56],[2,50,57],[2,50,57],[2,50,57]]}]};
// poses de profil : 0-1 garde, 2 arme levée, 3-5 coup, 6-7 estoc, 8-9 spécial, 10-14 marteau, 15-16 accroupi, 17 repos (cavalier)
const PG_A={"w":160,"n":18,"l":[{"w":62,"h":60,"c":14,"r":1,"f":[[0,28,61],[1,28,62],[2,44,16],[3,75,80],[4,72,97],[5,69,99],[6,80,86],[6,82,86],[7,49,13],[7,49,14],[8,53,33],[9,51,33],[10,82,72],[11,78,99],[12,51,36],null,null,[13,60,76]]},{"w":19,"h":46,"c":4,"r":1,"f":[[0,103,80],[1,103,81],[0,103,80],[0,103,80],[0,103,80],[0,103,80],[0,108,80],[0,110,80],[0,103,80],[1,103,81],null,null,null,null,null,[2,106,92],[3,106,93],[0,81,84]]},{"w":28,"h":28,"c":15,"r":1,"f":[[0,60,76],[0,60,77],[1,57,74],[2,52,78],[3,53,76],[4,53,75],[5,57,78],[5,59,78],[6,57,74],[6,57,75],[7,57,74],[8,56,73],[9,51,79],[10,53,76],[11,57,75],[12,56,88],[13,57,88],[14,62,79]]}]};
const PG_FM={"cw":112,"ch":128,"l":[{"w":53,"h":58,"f":[[0,64,53],[0,64,52],[0,64,53],[0,64,53],[0,64,52],[0,64,53],[1,69,50],[1,69,49],[1,69,50],[1,69,50],[1,69,49],[1,69,50],[2,53,58],[3,55,60],[2,53,57],[4,34,47],[5,19,53],[4,33,47]]},{"w":32,"h":46,"f":[[0,20,79],[0,20,78],[0,20,79],[0,20,79],[0,20,78],[0,20,79],[0,16,70],[0,16,69],[0,16,70],[0,16,70],[0,16,69],[0,16,70],[1,63,68],[1,62,68],[1,62,68],[1,63,69],[1,63,69],[1,63,69]]},{"w":57,"h":24,"f":[[0,30,59],[0,30,58],[0,30,59],[0,30,59],[0,30,58],[0,30,59],[1,28,59],[1,28,58],[1,28,59],[1,28,59],[1,28,58],[1,28,59],[2,51,56],[2,50,56],[2,50,56],[2,50,57],[2,50,57],[2,50,57]]}]};
const PG_FA={"w":160,"n":18,"l":[{"w":62,"h":60,"c":14,"r":1,"f":[[0,31,61],[1,31,62],[2,44,16],[3,73,80],[4,70,97],[5,67,99],[6,78,86],[6,80,86],[7,49,13],[7,49,14],[8,53,33],[9,51,33],[10,80,72],[11,76,99],[12,51,36],null,null,[13,62,76]]},{"w":19,"h":46,"c":4,"r":1,"f":[[0,101,80],[1,101,81],[0,101,80],[0,101,80],[0,101,80],[0,101,80],[0,106,80],[0,108,80],[0,101,80],[1,101,81],null,null,null,null,null,[2,105,92],[3,105,93],[0,79,84]]},{"w":24,"h":25,"c":15,"r":1,"f":[[0,62,78],[0,62,79],[1,59,76],[2,54,79],[3,55,77],[4,55,76],[5,59,79],[5,61,79],[6,59,76],[6,59,77],[7,58,76],[8,57,75],[9,54,80],[10,55,77],[11,59,77],[12,58,89],[13,59,90],[14,63,81]]}]};
// gl.js (portée privée) fournit PG.dep={WPM,PXHR,thFor}
// thèmes dans l'ordre de THP : [métal sombre, métal clair, cape sombre, cape claire] (null : cape démoniaque)
const PG_TH=[[[52,96,142],[232,250,255],[30,70,120],[96,160,214]],[[14,16,44],[104,108,170],[14,16,50],[48,52,116]],[[28,12,8],[142,92,70],[72,22,8],[190,72,18]],[[40,14,72],[214,164,252],[46,12,70],[140,66,190]],[[84,70,56],[246,236,208],[14,50,62],[50,140,156]],[[18,34,18],[142,184,122],[28,50,18],[78,118,44]],[[10,14,40],[100,118,176],[12,18,56],[42,58,128]],[[60,112,150],[240,255,255],[30,118,140],[130,218,230]],[[12,8,16],[118,100,116],null,null],[[96,52,8],[255,236,150],[110,66,18],[214,158,56]]];
const PG={on:(()=>{try{return localStorage.getItem('bvperso')==='1'}catch(e){return false}})(),ready:false,img:{},d:null};
// fichier d'une image : perso_g_<nom>.png, ou perso_f_<nom>.png pour les 4 planches propres à la Guerrière
const pgFile=k=>'perso_'+(k.startsWith('f_')?k:'g_'+k)+'.png';
// pied à y=120 dans une case 112x128 ; 112 px du nouveau personnage = 66 px de l'ancien
const PG_FEET=120,PG_AX=56,PG_S=66/112;
// emplacement de PXF -> image source (0-5 face, 6-11 dos, 12-17 profil ; face 2 et dos 8 = pose d'attente)
const PG_SLOT=(()=>{const a=new Array(29).fill(2);[[0,1,2,3,4,5],[6,7,8,9,10,11],[12,13,14,15,16,17]].forEach((l,v)=>l.forEach((k,i)=>{a[[[1,2,15,16,17,18],[4,5,19,20,21,22],[23,24,25,26,27,28]][v][i]]=k}));a[3]=a[8]=8;return a})();
function pgLoad(){if(!PG.on||typeof document==='undefined'||typeof Image==='undefined')return;const N=['corps','epee','bouclier','epaul','act','act_epee','act_bouclier','act_epaul','f_corps','f_epaul','f_act','f_act_epaul'];let n=0;
 for(const k of N){const im=new Image();im.onload=()=>{PG.img[k]=im;if(++n===N.length){try{const px=m=>{const c=pgCv(m.width,m.height),x=c.getContext('2d');x.drawImage(m,0,0);return x.getImageData(0,0,c.width,c.height)};PG.d=px(PG.img.corps);PG.a=px(PG.img.act);PG.fd=px(PG.img.f_corps);PG.fa=px(PG.img.f_act);PG.ready=true}catch(e){}}};im.src=pgFile(k)}}
const pgCv=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c};
const pgUse=cls=>PG.ready&&!!PG.dep&&cls==='G';
// variante d'une pièce selon son palier (0-14) ; à partir de 11, thème légendaire du jeu
const pgVar=(t,id)=>{t=Math.max(0,Math.min(14,t|0));return t<11?t:10+PG.dep.thFor(t,id)};
function pgPal(v){if(v>10){const q=PG_TH[v-11];return{lo:q[0],hi:q[1],c0:q[2],c1:q[3]}}const p=PG.dep.WPM[v-1],k=(c,f)=>c.map(a=>Math.floor(a*f));return{lo:k(p.d,.5),hi:p.l,c0:k(p.d,.6),c1:k(p.d,.9)}}
function pgHair(T,L){const R=85;if(L<R){const t=Math.max(0,L/R);return[36+(T[0]-36)*t,16+(T[1]-16)*t,44+(T[2]-44)*t]}const t=Math.min(.85,(L-R)/(255-R)*1.2);return[T[0]+(255-T[0])*t,T[1]+(248-T[1])*t,T[2]+(225-T[2])*t]}
// recolore un bloc d'une planche : image en (sx,sy), zones en (mx,my)
function pgPaint(D,sx,sy,mx,my,w,h,av,bv,hair){const S=D.data,W=D.width,out=new ImageData(w,h),O=out.data,A=av?pgPal(av):null,B=bv?pgPal(bv):null;
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=((sy+y)*W+sx+x)*4,j=(y*w+x)*4,a=S[i+3];if(a<128)continue;let r=S[i],g=S[i+1],b=S[i+2];const m=Math.round(S[((my+y)*W+mx+x)*4]/40),L=.3*r+.59*g+.11*b,q=m===1?A:m===5?B:null;
  if(q){[r,g,b]=q.lo.map((v,n)=>v+(q.hi[n]-v)*L/255)}
  else if(m===2&&A){if(A.c0){const t=Math.max(0,Math.min(1,(r-55)/175));[r,g,b]=A.c0.map((v,n)=>v+(A.c1[n]-v)*t)}else{r*=.5;g*=.22;b*=.36}}
  else if(m===3&&hair){[r,g,b]=pgHair(hair,L)}
  O[j]=r;O[j+1]=g;O[j+2]=b;O[j+3]=255}
 const c=pgCv(w,h);c.getContext('2d').putImageData(out,0,0);return c}
const pgHairOf=id=>{const H=PG.dep.PXHR,hx=H[(id*5+3)%H.length];return[1,3,5].map(i=>parseInt(hx.slice(i,i+2),16))};
const pgBody=(k,av,bv,hair,fem)=>{const{cw,ch}=PG_M;return pgPaint(fem?PG.fd:PG.d,k*cw,0,k*cw,ch,cw,ch,av,bv,hair)};
// texture des poses de profil : bouclier, corps, arme, bras, épaulière
function pgActSheet(id,eq,fem){const{w,n,l}=fem?PG_FA:PG_A,D=fem?PG.fa:PG.a,hair=pgHairOf(id),av=pgVar(eq.a,id),bv=pgVar(eq.b,id),rows=[pgVar(eq.w,id),pgVar(eq.s,id),av],names=['act_epee','act_bouclier',fem?'f_act_epaul':'act_epaul'],cv=pgCv(w*n,w),cx=cv.getContext('2d');
 for(let k=0;k<n;k++){const piece=p=>{const q=l[p],f=q.f[k];if(!f)return;const[u,dx,dy]=f;cx.drawImage(PG.img[names[p]],(u%q.c)*q.w,(rows[p]*q.r+(u/q.c|0))*q.h,q.w,q.h,k*w+dx,dy,q.w,q.h)};
  const body=j=>cx.drawImage(pgPaint(D,k*w,j*w,k*w,(j+1)*w,w,w,av,bv,j?null:hair),k*w,0);
  piece(1);body(0);piece(0);body(2);piece(2)}
 return cv}
// cavalier : buste équipé coupé aux hanches (la cape continue sur la croupe) et jambes en armure pliées
function pgRideSheet(walk,act,id,eq,fem){const{cw,ch}=PG_M,D=fem?PG.fa:PG.a,Y=PG_A.w*4,av=pgVar(eq.a,id),bv=pgVar(eq.b,id),cv=pgCv(cw*PG_SLOT.length,ch),cx=cv.getContext('2d');
 const views=[0,1,2].map(i=>{ // 0 face, 1 profil, 2 dos
  const v=[0,1,2][i],ix=[0,1,2][i]*cw,top=pgCv(cw,ch),t=top.getContext('2d');
  if(v===1)t.drawImage(act,17*PG_A.w,0,PG_A.w,PG_A.w,-21,-17,PG_A.w,PG_A.w);else t.drawImage(walk,(v?3:0)*cw,0,cw,ch,0,v?-4:-2,cw,ch);
  const im=t.getImageData(0,0,cw,ch),P=im.data,S=D.data,W=D.width,K=(x,y)=>y<ch?Math.round(S[((Y+256+y)*W+ix+x)*4]/40):0;
  for(let y=0;y<ch;y++)for(let x=0;x<cw;x++){const j=(y*cw+x)*4,m=K(x,y);if(!m)P[j+3]=0;else if(m===2&&P[j+3]&&!K(x,y+1)){P[j]=30;P[j+1]=8;P[j+2]=34}}
  t.putImageData(im,0,0);
  // jambes : recolorées, éclaircies puis cernées pour se détacher du cheval
  const lg=pgPaint(D,ix,Y,ix,Y+128,cw,ch,av,bv,null),g=lg.getContext('2d'),L=g.getImageData(0,0,cw,ch),Q=L.data,al=new Uint8Array(cw*ch);
  for(let n=0;n<cw*ch;n++){al[n]=Q[n*4+3]>127?1:0;if(al[n])for(let c=0;c<3;c++)Q[n*4+c]=Math.min(255,Q[n*4+c]*1.38+6)}
  for(let y=1;y<ch-1;y++)for(let x=1;x<cw-1;x++){const n=y*cw+x;if(al[n])continue;let d=0;for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)d|=al[n+a*cw+b];if(d){Q[n*4]=24;Q[n*4+1]=10;Q[n*4+2]=30;Q[n*4+3]=255}}
  g.putImageData(L,0,0);
  const o=pgCv(cw,ch),x=o.getContext('2d');(v===1?[top,lg]:[lg,top]).forEach(c=>x.drawImage(c,0,0));return o});
 PG_SLOT.forEach((k,i)=>cx.drawImage(views[i>=23?1:[3,4,5,8,19,20,21,22].includes(i)?2:0],i*cw,0));return cv}
// image d'action à afficher (null : marche ou attente). o.af et o.fs viennent de heroFx
function pgPose(o,h,mv,fg,tm,onHorse){if(onHorse)return null;
 if(fg){const a=o.af,s=o.fs||0;return a===6||a===12?2:a===9?(s<.07?3:s<.17?4:5):a===10?(s<.14?7:6):a===14?8+((tm/.15|0)&1):(tm%.8)<.4?0:1}
 if(o.af===12)return 2;
 if(o.af===7&&o.cr)return tm-(o.ct||0)<.55?16:15;
 if(o.bl&&!mv){let t=(tm+h.id*.13)%.68;const D=[.22,.14,.05,.16,.11];for(let i=0;i<5;i++){if(t<D[i])return 10+i;t-=D[i]}return 14}
 return null}
// agrandit une image x2 en adoucissant les escaliers (cheval détaillé)
function pgScale2(src,w,h){const out=new Uint8ClampedArray(w*h*16),S=new Uint32Array(src.buffer,src.byteOffset,w*h),O=new Uint32Array(out.buffer),at=(x,y)=>S[Math.max(0,Math.min(h-1,y))*w+Math.max(0,Math.min(w-1,x))];
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const E=S[y*w+x],B=at(x,y-1),H=at(x,y+1),D=at(x-1,y),F=at(x+1,y),i=y*4*w+x*2;
  O[i]=D===B&&D!==H&&B!==F?D:E;O[i+1]=B===F&&B!==D&&F!==H?F:E;O[i+2*w]=H===D&&H!==F&&D!==B?H:E;O[i+2*w+1]=F===H&&F!==B&&H!==D?F:E}
 return out}
// texture complète d'un héros : mêmes 29 emplacements que l'ancien sprite (PXF)
function pgSheet(id,eq,fem){const{cw,ch}=PG_M,{l}=fem?PG_FM:PG_M,hair=pgHairOf(id);
 const av=pgVar(eq.a,id),bv=pgVar(eq.b,id),rows=[pgVar(eq.w,id),pgVar(eq.s,id),av],names=['epee','bouclier',fem?'f_epaul':'epaul'],cv=pgCv(cw*PG_SLOT.length,ch),cx=cv.getContext('2d'),done={};
 const frame=k=>{if(done[k])return done[k];const c=pgCv(cw,ch),x=c.getContext('2d'),view=k/6|0,body=pgBody(k,av,bv,hair,fem);
  const piece=n=>{const q=l[n],[u,dx,dy]=q.f[k];x.drawImage(PG.img[names[n]],u*q.w,rows[n]*q.h,q.w,q.h,dx,dy,q.w,q.h)},corps=()=>x.drawImage(body,0,0);
  if(view===0){corps();piece(2);piece(1);piece(0)}else if(view===1){piece(1);piece(0);corps();piece(2)}else{piece(1);corps();piece(0);x.drawImage(PG.img[fem?'f_corps':'corps'],k*cw,2*ch,cw,ch,0,0,cw,ch);piece(2)}
  return done[k]=c};
 PG_SLOT.forEach((k,i)=>cx.drawImage(frame(k),i*cw,0));return cv}
pgLoad();
