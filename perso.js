// v4.3.3 : coiffures. h.coif : 0 = coiffure des planches de base, 1 à 4 = rectangle de tête pris dans perso_g_tetes.png / perso_f_tetes.png
// (cases PG_T.w x PG_T.h, 18 colonnes ; par coiffure : marche, zones, actions, zones). PG_T.f[coif-1][image 0-35] = [x,y] dans la case.
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
const PG_T={"g":{"w":59,"h":60,"f":[[[27,8],[27,7],[27,8],[27,8],[27,7],[27,8],[25,8],[25,7],[25,8],[25,8],[25,7],[25,8],[28,16],[28,18],[27,17],[28,17],[28,17],[29,17],[53,31],[53,32],[53,31],[53,31],[52,29],[52,29],[57,29],[59,29],[52,29],[52,30],[53,31],[53,31],[53,31],[53,31],[53,31],[56,43],[56,44],[48,25]],[[27,8],[27,7],[27,8],[27,8],[27,7],[27,8],[25,8],[25,7],[25,8],[25,8],[25,7],[25,8],[32,17],[32,18],[31,17],[32,17],[32,17],[33,17],[55,31],[55,32],[55,31],[55,31],[54,29],[54,29],[59,29],[61,29],[54,29],[54,30],[55,31],[55,31],[55,31],[55,31],[55,31],[58,43],[58,44],[49,25]],[[27,8],[27,7],[27,8],[27,8],[27,7],[27,8],[25,8],[25,7],[25,8],[25,8],[25,7],[25,8],[32,17],[32,18],[31,17],[32,17],[32,17],[33,17],[55,31],[55,32],[55,31],[55,31],[54,29],[54,29],[59,29],[61,29],[54,29],[54,30],[55,31],[55,31],[55,31],[55,31],[55,31],[58,43],[58,44],[49,25]],[[27,8],[27,7],[27,8],[27,8],[27,7],[27,8],[25,8],[25,7],[25,8],[25,8],[25,7],[25,8],[31,17],[31,18],[30,17],[31,17],[31,17],[32,17],[55,31],[55,32],[55,31],[55,31],[54,29],[54,29],[59,29],[61,29],[54,29],[54,30],[55,31],[55,31],[55,31],[55,31],[55,31],[58,43],[58,44],[49,25]]]},"f":{"w":61,"h":60,"f":[[[30,8],[30,7],[30,8],[30,8],[30,7],[30,8],[31,8],[31,7],[31,8],[31,8],[31,7],[31,8],[29,17],[29,21],[28,18],[29,18],[29,19],[30,19],[54,35],[54,36],[54,35],[54,35],[53,32],[53,32],[58,32],[60,32],[53,32],[53,33],[54,35],[54,35],[54,35],[54,35],[54,35],[57,47],[57,48],[49,27]],[[25,8],[25,7],[25,8],[25,8],[25,7],[25,8],[25,8],[25,7],[25,8],[25,8],[25,7],[25,8],[29,15],[29,19],[28,16],[29,16],[29,17],[30,17],[54,35],[54,36],[54,35],[54,35],[53,32],[53,32],[58,32],[60,32],[53,32],[53,33],[54,35],[54,35],[54,35],[54,35],[54,35],[57,47],[57,48],[49,27]],[[30,8],[30,7],[30,8],[30,8],[30,7],[30,8],[29,8],[29,7],[29,8],[29,8],[29,7],[29,8],[29,16],[29,20],[28,17],[29,17],[29,18],[30,18],[54,35],[54,36],[54,35],[54,35],[53,32],[53,32],[58,32],[60,32],[53,32],[53,33],[54,35],[54,35],[54,35],[54,35],[54,35],[57,47],[57,48],[49,27]],[[32,8],[32,7],[32,8],[32,8],[32,7],[32,8],[31,8],[31,7],[31,8],[31,8],[31,7],[31,8],[29,15],[29,19],[28,16],[29,16],[29,17],[30,17],[54,34],[54,35],[54,34],[54,34],[53,31],[53,31],[58,31],[60,31],[53,31],[53,32],[54,34],[54,34],[54,34],[54,34],[54,34],[57,46],[57,47],[49,26]]]}};
// v4.4.0 : Paladin homme. perso_pa_corps.png : ligne 0 images (ailes comprises), ligne 1 zones, ligne 2 poing de profil.
// perso_pa_tetes.png : 5 coiffures (h.coif 0-4), auréole comprise ; par coiffure : ligne d'images, ligne de zones.
// Épées, boucliers et marteau du Guerrier (positions PG_PA, PG_PAA) ; le Paladin garde ses propres épaulières.
// v4.4.1 : perso_pa_act.png, 18 poses 160x160 (ligne 0 images sans tête, ligne 1 zones, ligne 2 poing devant l'arme).
// PG_PAA : e = arme [orientation,x,y], b = bouclier [orientation,x,y], t = place de la tête (image de profil de perso_pa_tetes.png).
const PG_PAA={"e":[[3,65,90],[3,59,87],[0,16,17],[7,24,22],[4,93,111],[6,92,105],[6,92,105],[6,61,94],[0,19,22],[7,21,17],[8,31,44],[9,20,37],[10,97,95],[11,96,112],[12,67,81],null,null,null],"b":[[0,96,82],[0,94,82],[0,91,82],[0,91,82],[0,110,90],[0,108,89],[0,108,89],[0,94,82],[0,91,82],[0,91,82],null,null,null,null,null,[2,96,88],[3,96,89],[0,96,82]],"t":[[26,16],[24,16],[21,16],[21,16],[40,24],[38,23],[38,23],[24,16],[21,16],[21,16],[21,16],[21,16],[40,24],[38,23],[24,16],[26,31],[26,32],[26,16]]};
// v4.4.3 : actions de la Paladine (perso_pa_f_act.png) ; mêmes places de tête que le Paladin, armes et bouclier décalés.
const PG_PAAF={"e":[[3,66,90],[3,61,87],[0,16,17],[7,24,22],[4,92,111],[6,91,105],[6,91,105],[6,63,94],[0,19,22],[7,21,17],[8,31,44],[9,20,37],[10,96,95],[11,95,112],[12,69,81],null,null,null],"b":[[0,92,82],[0,90,82],[0,87,82],[0,87,82],[0,106,90],[0,104,89],[0,104,89],[0,90,82],[0,87,82],[0,87,82],null,null,null,null,null,[2,92,88],[3,92,89],[0,92,82]]};
function paActSheet(id,eq,coif,fem,col){const{w,n,l}=PG_A,{cw,ch}=PG_PA,P=fem?PG_PAAF:PG_PAA,D=fem?PG.pfx:PG.px,B=PG.img[fem?'pa_f_act':'pa_act'],hair=pgHairOf(id,col),av=pgVar(eq.a,id),bv=pgVar(eq.b,id),rows=[pgVar(eq.w,id),pgVar(eq.s,id)],names=['act_epee','act_bouclier'],cv=pgCv(w*n,w),cx=cv.getContext('2d'),cf=Math.max(0,Math.min(4,coif|0)),
  head=pgPaint(fem?PG.pft:PG.pt,12*cw,cf*2*ch,12*cw,(cf*2+1)*ch,cw,ch,null,null,hair);
 for(let k=0;k<n;k++){const piece=(p,f)=>{if(!f)return;const q=l[p],[u,dx,dy]=f;cx.drawImage(PG.img[names[p]],(u%q.c)*q.w,(rows[p]*q.r+(u/q.c|0))*q.h,q.w,q.h,k*w+dx,dy,q.w,q.h)},[tx,ty]=PG_PAA.t[k];
  piece(1,P.b[k]);cx.drawImage(pgPaint(D,k*w,0,k*w,w,w,w,av,bv,null),k*w,0);cx.drawImage(head,k*w+tx,ty);piece(0,P.e[k]);cx.drawImage(B,k*w,2*w,w,w,k*w,0,w,w)}
 return cv}
const PG_PA={"cw":112,"ch":128,"l":[{"w":53,"h":58,"f":[[0,66,53],[0,66,52],[0,66,53],[0,66,53],[0,66,52],[0,66,53],[1,74,50],[1,74,49],[1,74,50],[1,74,50],[1,74,49],[1,74,50],[2,49,57],[3,56,58],[2,52,56],[4,33,47],[5,18,54],[4,29,47]]},{"w":32,"h":46,"f":[[0,19,78],[0,19,77],[0,19,78],[0,19,78],[0,19,77],[0,19,78],[0,10,70],[0,10,69],[0,10,70],[0,10,70],[0,10,69],[0,10,70],[1,65,68],[1,64,68],[1,64,68],[1,64,69],[1,64,69],[1,64,69]]}]};
// v4.4.2 : Paladine (perso_pa_f_*.png, mêmes lignes que le Paladin ; têtes de la Guerrière + auréole). PG_PAF : armes décalées (silhouette affinée).
const PG_PAF={"cw":112,"ch":128,"l":[{"w":53,"h":58,"f":[[0,63,53],[0,63,52],[0,63,53],[0,63,53],[0,63,52],[0,63,53],[1,69,50],[1,69,49],[1,69,50],[1,69,50],[1,69,49],[1,69,50],[2,48,57],[3,53,58],[2,50,56],[4,34,47],[5,20,54],[4,31,47]]},{"w":32,"h":46,"f":[[0,22,78],[0,22,77],[0,22,78],[0,22,78],[0,22,77],[0,22,78],[0,16,70],[0,16,69],[0,16,70],[0,16,70],[0,16,69],[0,16,70],[1,60,68],[1,59,68],[1,59,68],[1,60,69],[1,59,69],[1,59,69]]}]};
function paSheet(id,eq,coif,fem,col){const{cw,ch,l}=fem?PG_PAF:PG_PA,D=fem?PG.pfd:PG.pd,T=fem?PG.pft:PG.pt,B=PG.img[fem?'pa_f_corps':'pa_corps'],hair=pgHairOf(id,col),av=pgVar(eq.a,id),bv=pgVar(eq.b,id),rows=[pgVar(eq.w,id),pgVar(eq.s,id)],names=['epee','bouclier'],cv=pgCv(cw*PG_SLOT.length,ch),cx=cv.getContext('2d'),done={},cf=Math.max(0,Math.min(4,coif|0));
 const frame=k=>{if(done[k])return done[k];const c=pgCv(cw,ch),x=c.getContext('2d'),view=k/6|0,body=pgPaint(D,k*cw,0,k*cw,ch,cw,ch,av,bv,null),head=pgPaint(T,k*cw,cf*2*ch,k*cw,(cf*2+1)*ch,cw,ch,null,null,hair);
  const piece=n=>{const q=l[n],[u,dx,dy]=q.f[k];x.drawImage(PG.img[names[n]],u*q.w,rows[n]*q.h,q.w,q.h,dx,dy,q.w,q.h)},corps=()=>{x.drawImage(body,0,0);x.drawImage(head,0,0)};
  if(view===0){corps();piece(1);piece(0)}else if(view===1){piece(1);piece(0);corps()}else{piece(1);corps();piece(0);x.drawImage(B,k*cw,2*ch,cw,ch,0,0,cw,ch)}
  return done[k]=c};
 PG_SLOT.forEach((k,i)=>cx.drawImage(frame(k),i*cw,0));return cv}
// cavalier : buste d'attente coupé à la taille, jambes en armure du Guerrier ; la cape et les ailes descendent sur la croupe
function paRideSheet(walk,eq,id,fem){const{cw,ch}=PG_PA,Y=PG_A.w*4,av=pgVar(eq.a,id),bv=pgVar(eq.b,id),cv=pgCv(cw*PG_SLOT.length,ch),cx=cv.getContext('2d');
 // 0 face, 1 profil, 2 dos : emplacement de l'image d'attente, décalage vertical
 const views=[[0,-1],[23,-1],[3,-1]].map(([slot,dy],v)=>{const top=pgCv(cw,ch),t=top.getContext('2d');t.drawImage(walk,slot*cw,0,cw,ch,0,dy,cw,ch);
  const im=t.getImageData(0,0,cw,ch),P=im.data;
  for(let y=93;y<ch;y++)for(let x=0;x<cw;x++){const j=(y*cw+x)*4,r=P[j],g=P[j+1],b=P[j+2],cape=r>g*2.2&&r>b*1.15&&g<60,aile=r>130&&g>130&&b>140&&Math.abs(x-56)>(v===1?4:14)&&(v!==1||x<56);
   const fin=104+Math.round(2.6*Math.sin(x*.52));if(y>fin||!(cape||aile||(v===2&&P[j+3])))P[j+3]=0}
  t.putImageData(im,0,0);
  const ix=v*cw,lg=pgPaint(fem?PG.fa:PG.a,ix,Y,ix,Y+128,cw,ch,av,bv,null),o=pgCv(cw,ch),x=o.getContext('2d');(v===1?[top,lg]:[lg,top]).forEach(c=>x.drawImage(c,0,0));if(fem)paRideFin(x,v,PG_SLOT[slot],dy,eq,id);return o});
 PG_SLOT.forEach((k,i)=>cx.drawImage(views[i>=23?1:[3,4,5,8,19,20,21,22].includes(i)?2:0],i*cw,0));return cv}
// v4.4.3 : retouches de la cavalière : pixels isolés sous la taille effacés, bouclier et épée redessinés entiers (la coupe à la taille les tronquait)
function paRideFin(x,v,k,dy,eq,id){const{cw,ch}=PG_PA,im=x.getImageData(0,0,cw,ch),P=im.data,vu=new Uint8Array(cw*ch);
 for(let s=90*cw;s<cw*ch;s++){if(vu[s]||!P[s*4+3])continue;const g=[s];vu[s]=1;for(let i=0;i<g.length;i++){const n=g[i],a=n%cw,b=n/cw|0;for(let u=-1;u<=1;u++)for(let w=-1;w<=1;w++){const c=a+w,d=b+u,m=d*cw+c;if(c>=0&&c<cw&&d>=0&&d<ch&&!vu[m]&&P[m*4+3]){vu[m]=1;g.push(m)}}}if(g.length<8)for(const n of g)P[n*4+3]=0}
 x.putImageData(im,0,0);
 const piece=n=>{const q=PG_PAF.l[n],[u,dx,y]=q.f[k];x.drawImage(PG.img[n?'bouclier':'epee'],u*q.w,pgVar(n?eq.s:eq.w,id)*q.h,q.w,q.h,dx,y+dy,q.w,q.h)},derriere=f=>{x.globalCompositeOperation='destination-over';f();x.globalCompositeOperation='source-over'};
 if(v===0){piece(1);piece(0)}else if(v===2)derriere(()=>{piece(0);piece(1)});else{derriere(()=>piece(1));piece(0);x.drawImage(PG.img.pa_f_corps,k*cw,2*ch,cw,ch,0,dy,cw,ch)}}
// v4.4.4 : Voleur homme. perso_v_corps.png (cases 112x128) : lignes 2c image et 2c+1 zones (coiffure c 0-4), lignes 10-11 poings et leurs zones.
// perso_v_dague.png : 21 dagues (lignes), lame en bas ; colonnes face, face miroir, dos, dos miroir, profil lointain, profil proche.
// perso_v_epaul.png : thèmes 1-10 (lignes), cases 32x32 : face gauche/droite, dos gauche/droite, profil.
// PG_V : d = dagues par image [colonne,x,y] ; o = décalage des effets ; pt = particules [x,phase] ; sym, part = motifs. Actions (v4.4.5) : voir PG_VA plus bas.
const PG_V={"dw":32,"dh":33,"d":[[[1,21,82],[0,66,82]],[[1,21,81],[0,66,81]],[[1,21,82],[0,66,82]],[[1,21,82],[0,66,82]],[[1,21,81],[0,66,81]],[[1,21,82],[0,66,82]],[[3,19,75],[2,71,75]],[[3,19,74],[2,71,74]],[[3,19,75],[2,71,75]],[[3,19,75],[2,71,75]],[[3,19,74],[2,71,74]],[[3,19,75],[2,71,75]],[[4,54,74],[5,54,79]],[[4,54,74],[5,60,73]],[[4,54,74],[5,56,73]],[[4,54,74],[4,46,77]],[[4,63,68],[4,39,77]],[[4,63,68],[4,41,77]]],"o":[[0,0],[0,-1],[0,0],[0,0],[0,-1],[0,0],[0,0],[0,-1],[0,0],[0,0],[0,-1],[0,0],[-2,2],[-2,2],[-4,2],[-2,1],[-2,1],[-2,1]],"pt":[[[84,5],[24,0],[29,1],[77,2],[22,2],[63,3],[78,4],[75,3],[29,4],[29,1],[83,0],[46,2],[80,1],[23,4],[19,2],[29,5],[28,4],[40,3]],[[29,1],[48,4],[24,3],[74,4],[80,0],[57,1],[21,3],[38,0],[83,4],[82,2],[85,5],[77,4],[23,1],[43,2],[84,5],[78,4],[81,5],[36,2]],[[29,1],[33,4],[30,0],[43,2],[27,0],[66,4],[19,2],[78,3],[83,3],[33,4],[89,1],[42,3],[86,1],[82,0],[89,1],[30,1],[88,3],[37,2]],[[89,3],[82,5],[31,3],[40,2],[87,1],[65,5],[21,5],[25,2],[30,4],[83,5],[82,5],[58,5],[26,3],[41,4],[24,3],[27,0],[25,2],[76,3]],[[27,4],[52,3],[81,0],[39,2],[26,0],[22,0],[20,3],[70,1],[22,5],[33,5],[29,2],[62,2],[86,0],[83,3],[30,5],[33,0],[23,5],[43,1]],[[84,2],[82,2],[27,5],[33,3],[86,1],[65,4],[79,0],[78,5],[78,5],[59,4],[28,0],[38,1],[88,2],[56,3],[79,1],[58,2],[30,3],[25,0]],[[85,5],[59,4],[29,1],[40,5],[30,4],[30,4],[83,1],[43,1],[81,2],[52,3],[84,5],[73,4],[28,5],[51,1],[79,3],[29,0],[24,3],[84,2]],[[28,5],[33,1],[87,5],[25,2],[26,2],[24,0],[83,1],[76,1],[20,1],[79,4],[29,1],[50,3],[24,3],[23,5],[79,2],[78,1],[30,1],[49,2]],[[88,1],[29,3],[87,4],[80,5],[88,5],[22,0],[83,2],[79,0],[27,4],[40,5],[87,1],[84,4],[81,4],[83,1],[87,5],[35,5],[88,5],[77,4]],[[29,1],[72,4],[79,3],[31,0],[24,5],[22,2],[25,4],[26,2],[84,4],[80,4],[89,0],[84,4],[23,5],[72,1],[88,1],[29,5],[84,1],[55,1]]],"sym":[[".....#.....","..#..#..#..","...#.#.#...","....###....",".#...#...#.","###########",".#...#...#.","....###....","...#.#.#...","..#..#..#..",".....#....."],["......###..",".....###...","....###....","...###.....","..#######..",".....###...","....###....","...##......","..##.......","..#........","..........."],[".....#.....","....##.....","....###....","..#.####...","..#####.#..",".######.##.",".###.#####.",".##...####.",".##....###.","..##..###..","...#####..."],[".....#.....","....###....","...##.##...","..##...##..",".##..#..##.","##..###..##",".##..#..##.","..##...##..","...##.##...","....###....",".....#....."],["...#####...","..#######..",".#########.",".#..###..#.",".#..###..#.",".####.####.","..###.###..","...#####...","...#.#.#...","...#.#.#...","..........."],[".....#.....",".##..#..##.",".###.#.###.","..###.###..","....###....",".##..#..##.",".###.#.###.","..###.###..","....###....",".....#.....",".....#....."],[".....#.....",".....#.....","....###....","....###....","###########","..#######..","...#####...","..###.###..","..##...##..",".##.....##.","..........."],[".....#.....","....###....","...#####...","..##.#.##..",".##..#..##.","..##.#.##..","...#####...","....###....",".....#.....","...........","..........."],["#.........#","##.......##",".##.....##.",".#########.",".#########.",".#..###..#.",".##.###.##.","..#######..","...#.#.#...","....###....","..........."],[".....#.....",".#...#...#.","..#.....#..","....###....","...#####...","##.#####.##","...#####...","....###....","..#.....#..",".#...#...#.",".....#....."]],"part":[[".#.","###",".#."],["..#",".#.","###",".#.","#.."],[".#.",".##","###",".#."],[".#.","###","###",".#."],["##","##",".#"],[".##","###","##."],["..#..","..#..","#####","..#..","..#.."],[".#.","###","###",".#."],["#..","##.",".##","..#"],[".#.","###",".#."]]};
// emblème, gemme et particules : pixels posés un à un, cernés si bord
function pgStamp(P,motif,x,y,col,bord,w,h){const cw=w||PG_M.cw,ch=h||PG_M.ch,pts=[],S=new Set();motif.forEach((l,j)=>{for(let i=0;i<l.length;i++)if(l[i]==='#'){pts.push([x+i,y+j]);S.add(x+i+','+(y+j))}});
 const put=(X,Y,c)=>{if(X>=0&&X<cw&&Y>=0&&Y<ch){const n=(Y*cw+X)*4;P[n]=c[0];P[n+1]=c[1];P[n+2]=c[2];P[n+3]=255}};
 if(bord)for(const[X,Y]of pts)for(const[a,b]of[[1,0],[-1,0],[0,1],[0,-1]])if(!S.has(X+a+','+(Y+b)))put(X+a,Y+b,bord);
 for(const[X,Y]of pts)put(X,Y,col)}
const pgLight=(c,t)=>c.map((v,n)=>Math.floor(v+(255-v)*t));
// liseré lumineux au bas et sur les côtés de la cape (zone 2 de la planche D, image en sx,my)
function vHem(P,D,sx,my,cw,ch,g,ys,off,skip){const al=new Uint8Array(cw*ch),Z=D.data,W=D.width,hi=pgLight(g,.55);for(let n=0;n<cw*ch;n++)al[n]=P[n*4+3]>0?1:0;
 const cape=(X,Y)=>{if(X<0||X>=cw||Y<0||Y>=ch)return false;const n=((my+Y)*W+sx+X)*4;return Z[n+3]>127&&Math.round(Z[n]/40)===2};
 for(let y=1;y<ch-1;y++)for(let X=1;X<cw-1;X++){const n=y*cw+X;if(!al[n]||!al[n-1]||!al[n+1]||!al[n-cw]||!al[n+cw]||!cape(X,y))continue;
  const bas=!cape(X,y+3),cote=y>=ys&&(!cape(X-2,y)||!cape(X+2,y));if(!bas&&!cote)continue;if(skip&&skip(X,y))continue;
  const q=(X+off+y)%4===0?hi:g;P[n*4]=q[0];P[n*4+1]=q[1];P[n*4+2]=q[2]}}
// image k (0-17) : corps recoloré, dagues et poings ; armure légendaire : épaulières, liseré de cape, emblème au dos, gemme au col
function vFrame(k,eq,id,coif,hair){const{cw,ch}=PG_M,view=k/6|0,cf=Math.max(0,Math.min(4,coif|0)),av=pgVar(eq.a,id),bv=pgVar(eq.b,id),wv=pgVar(eq.w,id),D=PG.vd,sx=k*cw,[dx,dy]=PG_V.o[k],
  c=pgCv(cw,ch),x=c.getContext('2d'),body=pgPaint(D,sx,cf*2*ch,sx,(cf*2+1)*ch,cw,ch,av,bv,hair,1.5),
  dag=i=>{const[col,px,py]=PG_V.d[k][i];x.drawImage(PG.img.v_dague,col*PG_V.dw,wv*PG_V.dh,PG_V.dw,PG_V.dh,px,py,PG_V.dw,PG_V.dh)},
  fist=()=>x.drawImage(pgPaint(D,sx,10*ch,sx,11*ch,cw,ch,av,bv,hair,1.5),0,0);
 if(view===0){x.drawImage(body,0,0);dag(0);dag(1);fist()}else if(view===1){dag(0);dag(1);x.drawImage(body,0,0)}else{dag(0);x.drawImage(body,0,0);dag(1);fist()}
 if(av<11)return c;
 const th=av-10,g=PG.dep.THP[th-1].g,ep=(j,X,Y)=>x.drawImage(PG.img.v_epaul,j*32,(th-1)*32,32,32,X-24+dx,Y-16+dy,32,32);
 if(view===2)ep(4,62,63);else{ep(view*2,45,62);ep(view*2+1,83,62)}
 const im=x.getImageData(0,0,cw,ch),P=im.data;
 vHem(P,D,sx,(cf*2+1)*ch,cw,ch,g,60+dy,8,view===0?(X,y)=>X>=42+dx&&X<71+dx&&y>=64+dy:null);
 if(view===1)pgStamp(P,PG_V.sym[th-1],51+dx,76+dy,pgLight(g,.25),[40,16,56]);
 else if(view===0)pgStamp(P,['.#.','###','.#.'],55+dx,57+dy,pgLight(g,.3),[40,16,56]);
 x.putImageData(im,0,0);return c}
// aura en pointillés et particules (opaques : le jeu coupe la transparence)
function vAura(c,k,eq,id,act){const av=pgVar(eq.a,id);if(av<11)return c;const cw=c.width,ch=c.height,off=act?0:8,ox=act?24:0,oy=act?130:114,th=av-10,g=PG.dep.THP[th-1].g,x=c.getContext('2d'),im=x.getImageData(0,0,cw,ch),P=im.data,al=new Uint8Array(cw*ch),ph=k%6,hi=pgLight(g,.55);
 for(let n=0;n<cw*ch;n++)al[n]=P[n*4+3]>0?1:0;
 const on=(X,Y)=>X>=0&&X<cw&&Y>=0&&Y<ch&&al[Y*cw+X],R1=[[1,0],[-1,0],[0,1],[0,-1]],R2=[[2,0],[-2,0],[0,2],[0,-2],[1,1],[1,-1],[-1,1],[-1,-1]];
 for(let y=0;y<ch;y++)for(let X=0;X<cw;X++){if(al[y*cw+X])continue;let q=null;if(R1.some(([a,b])=>on(X+a,y+b)))q=g;else if((X+off+y*2+ph)%4===0&&R2.some(([a,b])=>on(X+a,y+b)))q=hi;
  if(q){const n=(y*cw+X)*4;P[n]=q[0];P[n+1]=q[1];P[n+2]=q[2];P[n+3]=255}}
 PG_V.pt[th-1].forEach(([q,y0],n)=>{const px=q+ox,py=oy-((n*11+(ph+y0)*14)%96);for(let y=Math.max(0,py-1);y<Math.min(ch,py+6);y++)for(let X=Math.max(0,px-1);X<px+6;X++)if(P[(y*cw+X)*4+3])return;
  pgStamp(P,PG_V.part[th-1],px,py,pgLight(g,n%3?.2:.7),null,cw,ch)});
 x.putImageData(im,0,0);return c}
function vSheet(id,eq,coif,hair){const{cw,ch}=PG_M,cv=pgCv(cw*PG_SLOT.length,ch),cx=cv.getContext('2d'),done={};
 PG_SLOT.forEach((k,i)=>cx.drawImage(done[k]||(done[k]=vAura(vFrame(k,eq,id,coif,hair),k,eq,id)),i*cw,0));return cv}
// cavalier provisoire : buste d'attente coupé à la taille (la cape continue sur la croupe), jambes en armure du Guerrier, dagues entières
function vRideSheet(eq,id,coif,hair){const{cw,ch}=PG_M,Y=PG_A.w*4,av=pgVar(eq.a,id),bv=pgVar(eq.b,id),cf=Math.max(0,Math.min(4,coif|0)),Z=PG.vd.data,W=PG.vd.width,cv=pgCv(cw*PG_SLOT.length,ch),cx=cv.getContext('2d');
 // 0 face, 1 profil, 2 dos : image d'attente, décalage vertical
 const views=[[2,-1],[12,-1],[8,-1]].map(([k,dy],v)=>{const top=vFrame(k,eq,id,cf,hair),t=top.getContext('2d'),im=t.getImageData(0,0,cw,ch),P=im.data;
  for(let y=93;y<ch;y++)for(let x=0;x<cw;x++){const n=(((cf*2+1)*ch+y)*W+k*cw+x)*4,fin=104+Math.round(2.6*Math.sin(x*.52));if(y>fin||!(Z[n+3]>127&&Math.round(Z[n]/40)===2))P[(y*cw+x)*4+3]=0}
  t.putImageData(im,0,0);
  const wv=pgVar(eq.w,id),dag=i=>{const[col,px,py]=PG_V.d[k][i];t.drawImage(PG.img.v_dague,col*PG_V.dw,wv*PG_V.dh,PG_V.dw,PG_V.dh,px,py,PG_V.dw,PG_V.dh)};
  if(v===0){dag(0);dag(1)}else if(v===2){t.globalCompositeOperation='destination-over';dag(0);dag(1);t.globalCompositeOperation='source-over'}else dag(1);
  const ix=v*cw,lg=pgPaint(PG.a,ix,Y,ix,Y+128,cw,ch,av,bv,null),o=pgCv(cw,ch),x=o.getContext('2d');if(!av){const g=lg.getContext('2d'),L=g.getImageData(0,0,cw,ch),Q=L.data;for(let n=0;n<Q.length;n+=4){Q[n]*=.42;Q[n+1]*=.36;Q[n+2]*=.44}g.putImageData(L,0,0)}(v===1?[top,lg]:[lg,top]).forEach(c=>x.drawImage(c,0,c===top?dy:0));return vAura(o,k,eq,id)});
 PG_SLOT.forEach((k,i)=>cx.drawImage(views[i>=23?1:[3,4,5,8,19,20,21,22].includes(i)?2:0],i*cw,0));return cv}
// v4.4.5 : actions du Voleur. perso_v_act.png (cases 160x160, 11 corps) : lignes 2c image et 2c+1 zones (coiffure c 0-4).
// perso_v_actp.png : poings (ligne 0 images, ligne 1 zones). perso_v_actd.png : dagues tournées, une ligne par variante.
// PG_VA : w,h = case de dague ; k = décalage par colonne ; p = poses [b corps, f poings, dx,dy tête, d dagues [colonne,x,y,derrière],
// h marteau du Guerrier [colonne,x,y,derrière], s dague lancée]. Poses 0-16 comme le Guerrier ; 2 et 17-23 : victoire (dague qui tournoie).
const PG_VA={"w":38,"h":38,"k":[[-19,-9],[-10,-8],[-19,-13],[-25,-14],[-11,-14],[-24,-14],[-11,-14],[-11,-12],[-9,-20],[-9,-9],[-16,-15],[-13,-19],[-14,-16],[-19,-13],[-14,-14],[-13,-19],[-15,-14]],"p":[{"b":0,"f":0,"dx":15,"dy":33,"d":[[0,63,92,0],[1,94,90,0]]},{"b":1,"f":1,"dx":12,"dy":33,"d":[[0,59,92,0],[1,90,91,0]]},{"b":2,"f":2,"dx":18,"dy":20,"d":[[1,82,95,0]],"s":[2,124,87]},{"b":3,"f":3,"dx":6,"dy":33,"d":[[3,40,77,0],[4,93,90,0]]},{"b":4,"f":4,"dx":25,"dy":30,"d":[[5,66,79,1],[6,127,85,0]]},{"b":5,"f":5,"dx":23,"dy":30,"d":[[5,65,79,0],[7,125,85,0]]},{"b":5,"f":5,"dx":23,"dy":30,"d":[[5,65,79,0],[8,125,85,0]]},{"b":6,"f":6,"dx":15,"dy":42,"d":[[0,63,101,0],[9,94,99,0]]},{"b":5,"f":5,"dx":23,"dy":30,"d":[[5,65,79,0],[7,125,85,0]]},{"b":5,"f":5,"dx":23,"dy":30,"d":[[5,65,79,0],[8,125,85,0]]},{"b":7,"f":7,"dx":2,"dy":29,"d":[],"h":[8,28,55,1]},{"b":3,"f":8,"dx":6,"dy":33,"d":[],"h":[9,20,49,1]},{"b":5,"f":9,"dx":23,"dy":30,"d":[],"h":[10,119,62,0]},{"b":8,"f":10,"dx":13,"dy":28,"d":[],"h":[11,107,80,0]},{"b":2,"f":11,"dx":18,"dy":20,"d":[],"h":[12,97,66,0]},{"b":9,"f":12,"dx":15,"dy":44,"d":[[0,63,103,0],[9,95,100,0]]},{"b":10,"f":13,"dx":15,"dy":45,"d":[[0,63,104,0],[9,95,102,0]]},{"b":2,"f":2,"dx":18,"dy":20,"d":[[1,82,95,0]],"s":[10,124,78]},{"b":2,"f":2,"dx":18,"dy":20,"d":[[1,82,95,0]],"s":[11,124,71]},{"b":2,"f":2,"dx":18,"dy":20,"d":[[1,82,95,0]],"s":[12,124,67]},{"b":2,"f":2,"dx":18,"dy":20,"d":[[1,82,95,0]],"s":[13,124,67]},{"b":2,"f":2,"dx":18,"dy":20,"d":[[1,82,95,0]],"s":[14,124,71]},{"b":2,"f":2,"dx":18,"dy":20,"d":[[1,82,95,0]],"s":[15,124,78]},{"b":2,"f":2,"dx":18,"dy":20,"d":[[1,82,95,0]],"s":[16,124,85]}]};
const PG_VSPIN=[2,17,18,19,20,21,22,23];
function vActSheet(eq,id,coif,hair){const A=160,cf=Math.max(0,Math.min(4,coif|0)),av=pgVar(eq.a,id),bv=pgVar(eq.b,id),wv=pgVar(eq.w,id),n=PG_VA.p.length,cv=pgCv(A*n,A),cx=cv.getContext('2d'),B=PG.vac,F=PG.vap,body={},fist={};
 PG_VA.p.forEach((q,k)=>{const c=pgCv(A,A),x=c.getContext('2d'),sx=q.b*A,my=(cf*2+1)*A,
  dag=([col,px,py])=>{const[ox,oy]=PG_VA.k[col];x.drawImage(PG.img.v_actd,col*PG_VA.w,wv*PG_VA.h,PG_VA.w,PG_VA.h,px+ox,py+oy,PG_VA.w,PG_VA.h)},
  ham=()=>{const[u,px,py]=q.h,e=PG_A.l[0];x.drawImage(PG.img.act_epee,(u%e.c)*e.w,(u/e.c|0)*e.h,e.w,e.h,px,py,e.w,e.h)},der=q.d.filter(d=>d[3]),dev=q.d.filter(d=>!d[3]);
  der.forEach(dag);if(q.h&&q.h[3])ham();
  x.drawImage(body[q.b]||(body[q.b]=pgPaint(B,sx,cf*2*A,sx,my,A,A,av,bv,hair,1.5)),0,0);
  dev.forEach(dag);if(q.h&&!q.h[3])ham();
  x.drawImage(fist[q.f]||(fist[q.f]=pgPaint(F,q.f*A,0,q.f*A,A,A,A,av,bv,hair,1.5)),0,0);
  if(q.s)dag(q.s);
  if(av>10){const th=av-10,g=PG.dep.THP[th-1].g;x.drawImage(PG.img.v_epaul,4*32,(th-1)*32,32,32,62+q.dx-16,63+q.dy-16,32,32);
   const im=x.getImageData(0,0,A,A);vHem(im.data,B,sx,my,A,A,g,60+q.dy,0,null);x.putImageData(im,0,0)}
  cx.drawImage(vAura(c,k,eq,id,1),k*A,0)});
 return cv}
// gl.js (portée privée) fournit PG.dep={WPM,PXHR,thFor,THP}
// thèmes dans l'ordre de THP : [métal sombre, métal clair, cape sombre, cape claire] (null : cape démoniaque)
const PG_TH=[[[52,96,142],[232,250,255],[30,70,120],[96,160,214]],[[14,16,44],[104,108,170],[14,16,50],[48,52,116]],[[28,12,8],[142,92,70],[72,22,8],[190,72,18]],[[40,14,72],[214,164,252],[46,12,70],[140,66,190]],[[84,70,56],[246,236,208],[14,50,62],[50,140,156]],[[18,34,18],[142,184,122],[28,50,18],[78,118,44]],[[10,14,40],[100,118,176],[12,18,56],[42,58,128]],[[60,112,150],[240,255,255],[30,118,140],[130,218,230]],[[12,8,16],[118,100,116],null,null],[[96,52,8],[255,236,150],[110,66,18],[214,158,56]]];
// v4.4.1 : bvperso = liste des nouveaux designs cochés (classe + 0 homme / 1 femme) ; ancien réglage '1' = tous les prêts, '0' = aucun
const PG_PRETS=['G0','G1','Pa0','Pa1','V0'];
const PG={sel:(()=>{try{const v=localStorage.getItem('bvperso');if(v==='1')return PG_PRETS.slice();const l=JSON.parse(v||'[]');return Array.isArray(l)?PG_PRETS.filter(k=>l.includes(k)):[]}catch(e){return[]}})(),ready:false,img:{},d:null};
PG.on=PG.sel.length>0;
// fichier d'une image : perso_g_<nom>.png, ou perso_f_<nom>.png pour les 4 planches propres à la Guerrière
const pgFile=k=>'perso_'+(/^(f|pa|v)_/.test(k)?k:'g_'+k)+'.png';
// pied à y=120 dans une case 112x128 ; 112 px du nouveau personnage = 66 px de l'ancien
const PG_FEET=120,PG_AX=56,PG_S=66/112;
// emplacement de PXF -> image source (0-5 face, 6-11 dos, 12-17 profil ; face 2 et dos 8 = pose d'attente)
const PG_SLOT=(()=>{const a=new Array(29).fill(2);[[0,1,2,3,4,5],[6,7,8,9,10,11],[12,13,14,15,16,17]].forEach((l,v)=>l.forEach((k,i)=>{a[[[1,2,15,16,17,18],[4,5,19,20,21,22],[23,24,25,26,27,28]][v][i]]=k}));a[3]=a[8]=8;return a})();
function pgLoad(){if(!PG.on||typeof document==='undefined'||typeof Image==='undefined')return;const N=['corps','epee','bouclier','epaul','act','act_epee','act_bouclier','act_epaul','f_corps','f_epaul','f_act','f_act_epaul','tetes','f_tetes','pa_corps','pa_tetes','pa_act','pa_f_corps','pa_f_tetes','pa_f_act','v_corps','v_dague','v_epaul','v_act','v_actp','v_actd'];let n=0;
 for(const k of N){const im=new Image();im.onload=()=>{PG.img[k]=im;if(++n===N.length){try{const px=m=>{const c=pgCv(m.width,m.height),x=c.getContext('2d');x.drawImage(m,0,0);return x.getImageData(0,0,c.width,c.height)};PG.d=px(PG.img.corps);PG.a=px(PG.img.act);PG.fd=px(PG.img.f_corps);PG.fa=px(PG.img.f_act);PG.tg=px(PG.img.tetes);PG.tf=px(PG.img.f_tetes);PG.pd=px(PG.img.pa_corps);PG.pt=px(PG.img.pa_tetes);PG.px=px(PG.img.pa_act);PG.pfd=px(PG.img.pa_f_corps);PG.pft=px(PG.img.pa_f_tetes);PG.pfx=px(PG.img.pa_f_act);PG.vd=px(PG.img.v_corps);PG.vac=px(PG.img.v_act);PG.vap=px(PG.img.v_actp);PG.ready=true}catch(e){}}};im.src=pgFile(k)}}
const pgCv=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c};
const pgUse=(cls,fem)=>PG.ready&&!!PG.dep&&PG.sel.includes(cls+(fem?1:0));
// variante d'une pièce selon son palier (0-14) ; à partir de 11, thème légendaire du jeu
const pgVar=(t,id)=>{t=Math.max(0,Math.min(14,t|0));return t<11?t:10+PG.dep.thFor(t,id)};
function pgPal(v){if(v>10){const q=PG_TH[v-11];return{lo:q[0],hi:q[1],c0:q[2],c1:q[3]}}const p=PG.dep.WPM[v-1],k=(c,f)=>c.map(a=>Math.floor(a*f));return{lo:k(p.d,.5),hi:p.l,c0:k(p.d,.6),c1:k(p.d,.9)}}
function pgHair(T,L){const R=85;if(L<R){const t=Math.max(0,L/R);return[36+(T[0]-36)*t,16+(T[1]-16)*t,44+(T[2]-44)*t]}const t=Math.min(.85,(L-R)/(255-R)*1.2);return[T[0]+(255-T[0])*t,T[1]+(248-T[1])*t,T[2]+(225-T[2])*t]}
// recolore un bloc d'une planche : image en (sx,sy), zones en (mx,my)
function pgPaint(D,sx,sy,mx,my,w,h,av,bv,hair,gn){const S=D.data,W=D.width,out=new ImageData(w,h),O=out.data,A=av?pgPal(av):null,B=bv?pgPal(bv):null;
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=((sy+y)*W+sx+x)*4,j=(y*w+x)*4,a=S[i+3];if(a<128)continue;let r=S[i],g=S[i+1],b=S[i+2];const m=Math.round(S[((my+y)*W+mx+x)*4]/40),L=.3*r+.59*g+.11*b,q=m===1?A:m===5?B:null;
  if(q){[r,g,b]=q.lo.map((v,n)=>v+(q.hi[n]-v)*Math.min(255,L*(gn||1))/255)}
  else if(m===2&&A){if(A.c0){const t=Math.max(0,Math.min(1,(r-55)/175));[r,g,b]=A.c0.map((v,n)=>v+(A.c1[n]-v)*t)}else{r*=.5;g*=.22;b*=.36}}
  else if(m===3&&hair){[r,g,b]=pgHair(hair,L)}
  O[j]=r;O[j+1]=g;O[j+2]=b;O[j+3]=255}
 const c=pgCv(w,h);c.getContext('2d').putImageData(out,0,0);return c}
// cheveux à la couleur de l'aventurier (col) ; sans couleur : ancienne teinte tirée de l'id
const pgHairOf=(id,col)=>{const H=PG.dep.PXHR,hx=/^#[0-9a-f]{6}$/i.test(col||'')?col:H[(id*5+3)%H.length];return[1,3,5].map(i=>parseInt(hx.slice(i,i+2),16))};
// remplace la tête d'une image (f : 0-17 marche, 18-35 actions) par celle de la coiffure
function pgHead(c,f,coif,av,bv,hair,fem){if(!coif)return c;const T=fem?PG_T.f:PG_T.g,q=T.f[coif-1];if(!q)return c;const[x,y]=q[f],sx=(f%18)*T.w,sy=((coif-1)*2+(f/18|0))*2*T.h,cx=c.getContext('2d');
 cx.clearRect(x,y,T.w,T.h);cx.drawImage(pgPaint(fem?PG.tf:PG.tg,sx,sy,sx,sy+T.h,T.w,T.h,av,bv,hair),x,y);return c}
const pgBody=(k,av,bv,hair,fem,coif)=>{const{cw,ch}=PG_M;return pgHead(pgPaint(fem?PG.fd:PG.d,k*cw,0,k*cw,ch,cw,ch,av,bv,hair),k,coif,av,bv,hair,fem)};
// texture des poses de profil : bouclier, corps, arme, bras, épaulière
function pgActSheet(id,eq,fem,coif,col){const{w,n,l}=fem?PG_FA:PG_A,D=fem?PG.fa:PG.a,hair=pgHairOf(id,col),av=pgVar(eq.a,id),bv=pgVar(eq.b,id),rows=[pgVar(eq.w,id),pgVar(eq.s,id),av],names=['act_epee','act_bouclier',fem?'f_act_epaul':'act_epaul'],cv=pgCv(w*n,w),cx=cv.getContext('2d');
 for(let k=0;k<n;k++){const piece=p=>{const q=l[p],f=q.f[k];if(!f)return;const[u,dx,dy]=f;cx.drawImage(PG.img[names[p]],(u%q.c)*q.w,(rows[p]*q.r+(u/q.c|0))*q.h,q.w,q.h,k*w+dx,dy,q.w,q.h)};
  const body=j=>{const c=pgPaint(D,k*w,j*w,k*w,(j+1)*w,w,w,av,bv,j?null:hair);cx.drawImage(j?c:pgHead(c,18+k,coif,av,bv,hair,fem),k*w,0)};
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
function pgPose(o,h,mv,fg,tm,onHorse){const a=pgPose0(o,h,mv,fg,tm,onHorse);return a===2&&o.m.userData.vo?PG_VSPIN[(tm/.08|0)%8]:a}
function pgPose0(o,h,mv,fg,tm,onHorse){if(onHorse)return null;
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
function pgSheet(id,eq,fem,coif,col){const{cw,ch}=PG_M,{l}=fem?PG_FM:PG_M,hair=pgHairOf(id,col);
 const av=pgVar(eq.a,id),bv=pgVar(eq.b,id),rows=[pgVar(eq.w,id),pgVar(eq.s,id),av],names=['epee','bouclier',fem?'f_epaul':'epaul'],cv=pgCv(cw*PG_SLOT.length,ch),cx=cv.getContext('2d'),done={};
 const frame=k=>{if(done[k])return done[k];const c=pgCv(cw,ch),x=c.getContext('2d'),view=k/6|0,body=pgBody(k,av,bv,hair,fem,coif);
  const piece=n=>{const q=l[n],[u,dx,dy]=q.f[k];x.drawImage(PG.img[names[n]],u*q.w,rows[n]*q.h,q.w,q.h,dx,dy,q.w,q.h)},corps=()=>x.drawImage(body,0,0);
  if(view===0){corps();piece(2);piece(1);piece(0)}else if(view===1){piece(1);piece(0);corps();piece(2)}else{piece(1);corps();piece(0);x.drawImage(PG.img[fem?'f_corps':'corps'],k*cw,2*ch,cw,ch,0,0,cw,ch);piece(2)}
  return done[k]=c};
 PG_SLOT.forEach((k,i)=>cx.drawImage(frame(k),i*cw,0));return cv}
pgLoad();
