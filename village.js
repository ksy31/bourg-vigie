function leave(h,z){h.z=z;const q=ZR[z.n]||ZR['Trône du Roi'],a=Math.random()*6.283,r=Math.sqrt(Math.random());h.pt={x:z.x+(q[0]+Math.cos(a)*(q[2]-1.2)*r)*ZS,y:z.y+(q[1]+Math.sin(a)*(q[3]-.5)*r)*ZS};h.v=Math.hypot(h.pt.x-h.x,h.pt.y-h.y)/tt(Math.hypot(z.x-T.x,z.y-T.y)/MS);h.gw=roadWP(z);{const en=ventry(z);h.wp=(en?vpath(h,en):[]).concat(h.gw.map(p=>({x:p.x,y:p.y})))}h.st='go'}
const PRM=.8,PRL=.04,PRMIN=2,TVX=2,FGT=2,AUB=3,BL0=.55,BL1=.04,BL2=.03,blP=()=>Math.min(.95,BL0+BL1*S.spa+BL2*nl('S'));
const WALK=1.6,DUR={loot:[30,45],inn:[20,30],horse:[60,120],house:[60,120],forge:[60,120],prime:[25,35],bless:[15,30],armory:[20,30],guild:[20,30]};
const TL={loot:'dépôt à la Mairie',horse:'achat d’un cheval',house:'achat d’une maison',forge:'à la forge',prime:'prime à la taverne',bless:'bénédiction au sanctuaire',inn:'enregistrement à l’Auberge',build:'au chantier',armory:'à l’Armurerie',guild:'à la Maison des Guildes'};
const TS=h=>h.sub==='wait'?'file : '+TL[h.tk.k]:h.sub==='do'||h.sub==='bld'?TL[h.tk.k]:h.sub==='home'?'rentre':'au village';
const itB=i=>S.pl.find(x=>x.i===i);
const door=it=>{const p=slot(it);return{x:T.x+p[0],y:T.y+p[1]+3.6}};
const busy=i=>S.hero.filter(q=>q.st==='town'&&q.tk&&q.tk.b===i&&(q.sub==='wait'||q.sub==='do')).length;
const pickB=e=>S.pl.filter(x=>x.e===e&&!x.cn&&!x.rb).sort((a,b)=>busy(a.i)-busy(b.i)||a.i-b.i)[0];
const hPrice=x=>Math.round(x.p*Math.max(.5,1-.04*nl('E')));
const bestHorse=h=>S.horses.filter(x=>x.o==null).sort((a,b)=>b.sp-a.sp).find(x=>h.gold>=hPrice(x));
const forgeP=h=>{const k=SL[h.c].reduce((a,b)=>h.eq[b]<h.eq[a]?b:a),t=Math.max(1,Math.min(Math.floor(h.lv/2),FGT*S.forge)+Math.floor(nl('F')/3));return{k,t,p:Math.round(t*14*Math.max(.4,1-.05*nl('F')))}};
const goalP=h=>{const c=[],hs=S.hs.find(x=>x.o==null),hh=S.horses.filter(x=>x.o==null);if(!h.home&&hs)return hs.p;if(!h.hs&&hh.length)c.push(Math.min(...hh.map(hPrice)));return c.length?Math.min(...c):0};
const keepG=h=>{const g=goalP(h);if(!g)return 0;const f=forgeP(h),a=SL[h.c].reduce((q,k)=>q+h.eq[k],0)/SL[h.c].length;return a<.5*f.t?0:Math.round(g*(.5+.5*(1-h.bold)))};
const ACAP=3,AXR=4,AXD=8;
const armPick=h=>{const out=[],cap=ACAP*((S.npc.I||{}).lv||1);for(const k of SL[h.c]){let bi=-1;(S.chest||[]).forEach((x,i)=>{if(x.k!==k||(k==='w'&&x.c!==h.c)||x.t>cap||x.t<=h.eq[k])return;if(bi<0||x.t>S.chest[bi].t)bi=i});if(bi>=0)out.push({k,i:bi})}return out};
const armTask=h=>{const it=pickB(NE.I);return it&&armPick(h).length?{k:'armory',b:it.i}:null};
function goOut(h){const sp=S.spa&&!h.bless?pickB(NE.S):null;if(sp){h.tk={k:'bless',b:sp.i};h.tl=[];h.dec=1;h.st='town';h.sub='walk';h.vk=null}else depart(h)}
const GMIN=5,GSZ0=2,GSZM=6,GB=.05,GRDY=30,GTAX=.1,AXF=10,AXJ=5,AXG=3;
const GN=[['Les Lames Grises','⚔️','#7b8794'],['Les Loups Noirs','🐺','#3a3a4a'],['Les Faucons d’Argent','🦅','#aab4c0'],['Les Ours de Fer','🐻','#8a5a3a'],['Les Renards Rouges','🦊','#c0482f'],['Les Veilleurs de l’Aube','🌙','#5a5fa8'],['La Compagnie de la Flamme','🔥','#d9822b'],['L’Ordre du Chêne','🌲','#3f7a46'],['Les Sentinelles du Nord','❄️','#6fa8c7'],['Les Dragons Ardents','🐉','#8a2f6a']];
const gmax=()=>S.guildh||0,gsz=()=>Math.min(GSZM,GSZ0+((S.npc.C||{lv:1}).lv-1)),gAct=g=>g.o!=null&&!g.sl,gmem=g=>S.hero.filter(h=>h.gu===g.id).length;
const gTarget=()=>(S.guilds||[]).filter(g=>gAct(g)&&gmem(g)<gsz()).sort((a,b)=>gmem(b)-gmem(a))[0]||null;
const guOk=h=>h.lv>=GMIN&&!h.gu&&!!pickB(NE.C)&&(!!gTarget()||(S.guilds||[]).length<gmax());
const recG=h=>h.gu&&h.lv<GMIN?(S.guilds||[]).find(g=>g.id===h.gu&&gAct(g)):null,fpay=(h,p)=>{const g=recG(h);return g?Math.min(Math.max(0,g.f||0),p):0};
function guFix(){const gl=S.guilds;if(!gl||!gl.length)return;for(let i=gl.length-1;i>=0;i--){const g=gl[i],M=S.hero.filter(h=>h.gu===g.id);
 if(!M.length){gl.splice(i,1);log(`${g.e} La guilde « ${g.n} » est dissoute.`,'bad');continue}
 const nw=M.filter(h=>h.lv>=GMIN).sort((a,b)=>b.lv-a.lv)[0];
 if(g.o===undefined){g.o=nw?nw.id:null;g.sl=nw?0:1;if(g.f===undefined)g.f=0;continue}
 if(g.o!=null&&M.some(h=>h.id===g.o)){g.sl=0;continue}
 if(nw){log(`${g.e} ${nw.name} ${g.sl?'ranime':'prend la tête de'} la guilde « ${g.n} ».`,'ok');g.o=nw.id;g.sl=0}
 else if(!g.sl){g.o=null;g.sl=1;log(`💤 La guilde « ${g.n} » est en sommeil : plus de chef de niveau ${GMIN}.`,'bad')}}}
function guRec(h){const g=gTarget();if(!g)return;h.gu=g.id;for(let j=0;j<AXJ;j++)npcx('C');log(`${g.e} ${h.name} rejoint la guilde « ${g.n} ».`,'ok')}
const gMates=h=>{const g=h.gu&&(S.guilds||[]).find(q=>q.id===h.gu);if(!g||!gAct(g))return[];return S.hero.filter(m=>m!==h&&m.gu===g.id&&m.st==='rest'&&m.t<=GRDY&&!m.arm&&(!isNight()||m.bold>.55)).sort((a,b)=>a.t-b.t).slice(0,gsz()-1)};
function depart(h){const G=gMates(h);if(!G.length){leave(h,pick(h));return}
 const P=(power(h)+G.reduce((s,m)=>s+power(m),0))*(1+GB*G.length),z=pick(h,P);
 if(z.boss){leave(h,pick(h));return}
 const id=S.gpn=(S.gpn||0)+1,g=S.guilds.find(q=>q.id===h.gu);h.gp=id;h.gl=1;leave(h,z);
 G.forEach(m=>{m.gp=id;m.gl=0;m.tk=null;m.tl=[];leave(m,z)});
 for(let j=0;j<AXG;j++)npcx('C');log(`${g.e} ${g.n} (${G.length+1}) part en expédition : ${z.n}.`,'ok')}
function garrive(h){arrive(h);for(const m of S.hero)if(m.gp===h.gp&&m!==h){m.en=h.en;m.st='fight';m.t=h.t}}
function gres(h){const G=S.hero.filter(x=>x.gp===h.gp),n=G.length,e=h.en,gP=G.reduce((s,m)=>s+power(m),0)*(1+GB*(n-1)),gw=Math.random()<win(h,e.d,gP);
 GPW=gP;for(const m of G){RRF=gw?-1:-2;resolve(m);m.buff=0;m.bless=0}RRF=null;GPW=undefined;
 const Wn=G.filter(m=>S.hero.includes(m)&&m.loot);
 Wn.forEach(m=>{const l=m.loot;l.g=Math.round(l.g/n);l.w=Math.round(l.w/n);l.s=Math.round(l.s/n)});
 const gr=Wn.filter(m=>m.loot.gear);if(gr.length>1){const k=gr[R(0,gr.length-1)];gr.forEach(m=>{if(m!==k)m.loot.gear=0})}
 G.forEach(m=>{m.gp=0;m.gl=0})}
function decide(h){
 const hs=S.hs.find(x=>x.o==null);
 if(!h.home&&hs&&h.gold>=hs.p){const it=S.pl.find(x=>x.h===hs);if(it)return{k:'house',b:it.i}}
 if(!h.hs&&bestHorse(h)){const it=pickB(NE.E);if(it)return{k:'horse',b:it.i}}
 if(S.forge){const f=forgeP(h);if(h.eq[f.k]<f.t&&h.gold+fpay(h,f.p)-f.p>=keepG(h)){const it=pickB(NE.F);if(it)return{k:'forge',b:it.i}}}
 if(guOk(h)){const it=pickB(NE.C);if(it)return{k:'guild',b:it.i}}
  return null}
function taskOk(h,tk){
 if(tk.k==='horse')return !h.hs&&!!bestHorse(h);
 if(tk.k==='house'){const hs=(itB(tk.b)||{}).h;return !h.home&&!!hs&&hs.o==null&&h.gold>=hs.p}
 if(tk.k==='forge'){if(!S.forge)return false;const f=forgeP(h);return h.eq[f.k]<f.t&&h.gold+fpay(h,f.p)-f.p>=keepG(h)}
  if(tk.k==='bless')return !!S.spa&&!h.bless;
 if(tk.k==='armory')return armPick(h).length>0;
 if(tk.k==='guild')return guOk(h);
 return true}
function applyTask(h,tk){
 if(tk.k==='loot'){
  if(!h.loot)return;
  const l=h.loot,pg0=Math.round(l.g*.3),gg=h.gu?(S.guilds||[]).find(q=>q.id===h.gu):null,tx=gg?Math.min(pg0,Math.round(l.g*GTAX)):0,pg=pg0-tx;if(gg)gg.f=(gg.f||0)+tx;h.gold+=pg;h.earned+=l.g;S.g+=l.g-pg0;S.w+=l.w;S.s+=l.s;if(l.g+l.w+l.s>0)npcx('V');
  let m=`${h.name} bat ${h.won} : +${l.g} or (${pg} à sa bourse${tx?', '+tx+' à la caisse':''})`+(l.w?`, ${l.w} bois`:'')+(l.s?`, ${l.s} pierre`:'');
  if(l.gear)m+=' · '+giveGear(h);
  log(m+'.');
  while(h.xp>=xpNeed(h.lv)){h.xp-=xpNeed(h.lv);h.lv++;log(`${h.name} passe niveau ${h.lv}.`,'ok')}
  h.loot=null;return}
 if(!taskOk(h,tk))return;
 if(tk.k==='horse'){const x=bestHorse(h),p=hPrice(x);h.gold-=p;S.g+=p;x.o=h.id;h.hs=x;npcx('E');restock();log(`${h.name} achète un cheval ${x.sp} (${p} or).`,'ok')}
 else if(tk.k==='house'){const hs=itB(tk.b).h;h.gold-=hs.p;S.g+=hs.p;hs.o=h.id;h.home=hs;log(`${h.name} achète une maison (${hs.p} or).`,'ok')}
 else if(tk.k==='forge'){const f=forgeP(h),fp=fpay(h,f.p);if(fp)recG(h).f-=fp;h.gold-=f.p-fp;S.g+=f.p;h.eq[f.k]=f.t;npcx('F');log(`${h.name} achète ${pn(h,f.k)} ${f.t} chez le forgeron (${f.p} or${fp?', dont '+fp+' payés par la caisse de guilde':''}).`)}
 else if(tk.k==='prime'){if(h.prime){const p=h.prime;h.gold+=p.g;h.earned+=p.g;h.prime=null;for(let i=0;i<TVX;i++)npcx('T');log(`🎯 ${h.name} touche la prime sur ${p.n} : +${p.g} or.`,'ok')}}
 else if(tk.k==='bless'){npcx('S');if(Math.random()<blP())h.bless=1;else log(`${h.name} : la bénédiction échoue.`)}
 else if(tk.k==='armory'){const pk=armPick(h),tx=pk.map(p=>`${pn(h,p.k)} ${S.chest[p.i].t}`);pk.forEach(p=>{h.eq[p.k]=S.chest[p.i].t});
  pk.map(p=>p.i).sort((a,b)=>b-a).forEach(i=>S.chest.splice(i,1));for(let j=0;j<pk.length*AXD;j++)npcx('I');
  log(`🛡️ ${h.name} s’équipe à l’Armurerie : ${tx.join(', ')}.`,'ok')}
 else if(tk.k==='guild'){const g=gTarget();
  if(g){h.gu=g.id;log(`${g.e} ${h.name} rejoint la guilde « ${g.n} ».`,'ok');for(let j=0;j<AXJ;j++)npcx('C')}
  else{const u=GN.filter(x=>!S.guilds.some(q=>q.n===x[0])),b=u[R(0,u.length-1)]||GN[0],id=1+S.guilds.reduce((m,q)=>Math.max(m,q.id),0),ng={id,n:b[0],e:b[1],c:b[2],o:h.id,f:0,sl:0};S.guilds.push(ng);h.gu=id;for(let j=0;j<AXF;j++)npcx('C');log(`${ng.e} ${h.name} fonde la guilde « ${ng.n} ».`,'ok')}}
}
function goBack(h){
 h.st='back';h.dec=0;h.tk=null;h.tl=[];h.wp=(h.gw||[]).slice().reverse().map(p=>({x:p.x,y:p.y}));
 const m=pickB(NE.V);
 if(h.loot&&m)h.tl.push({k:'loot',b:m.i});
 if(h.prime){const tv=pickB(NE.T);if(tv)h.tl.push({k:'prime',b:tv.i});else{h.gold+=h.prime.g;h.earned+=h.prime.g;h.prime=null}}
 {const en=h.z&&h.gw&&h.gw.length&&ventry(h.z);if(en)h.wp=h.wp.concat(vpath(en,h.tl.length?door(itB(h.tl[0].b)):base(h)))}
}
function townNext(h){
 h.st='town';
 if(h.tl.length){h.tk=h.tl.shift();h.sub='walk';return}
 if(!h.dec){h.dec=1;const t=decide(h);if(t){h.tk=t;h.sub='walk';return}}
 h.tk=null;h.sub='home'
}
function startRest(h){
 if(h.loot)applyTask(h,{k:'loot'});if(h.prime){h.gold+=h.prime.g;h.earned+=h.prime.g;h.prime=null}
 h.st='rest';h.sub=null;h.tk=null;
 h.t=Math.round((R(40,70)+(h.en?Math.round(h.en.d):0))*(h.home?1:2.5)*(1-.02*nl('A'))*Math.max(.5,1-.08*P.h)*(h.hurt?1.6:1));h.hurt=0;ui();
}
function townTick(h,dt){
 if(h.sub==='walk'||h.sub==='home'){
  const fin=h.sub==='home'?base(h):door(itB(h.tk.b)),vk=h.sub==='home'?'h':'b'+h.tk.b;if(h.vk!==vk){h.vk=vk;h.vw=vpath(h,fin)}
  const vl=!!(h.vw&&h.vw.length),tg=vl?h.vw[0]:fin,dx=tg.x-h.x,dy=tg.y-h.y,d=Math.hypot(dx,dy),sp=WALK*dt;
  if(d<=sp){h.x=tg.x;h.y=tg.y;
   if(vl)h.vw.shift();
   else if(h.sub==='home'){h.vk=null;const inn=h.home?null:S.pl.find(x=>x.e===NE.A);if(inn){h.tk={k:'inn',b:inn.i};const n=busy(inn.i);h.sub='wait';h.wt=S.t;if(n)h.x+=(n%2?-1:1)*(1.6+1.3*Math.floor((n-1)/2))}else startRest(h)}
   else if(h.tk.k==='build'){h.vk=null;h.sub='bld'}else{h.vk=null;const n=busy(h.tk.b);h.sub='wait';h.wt=S.t;if(n)h.x+=(n%2?-1:1)*(1.6+1.3*Math.floor((n-1)/2))}
  }else{h.x+=dx/d*sp;h.y+=dy/d*sp}
 }else if(h.sub==='wait'){
  const i=h.tk.b;
  if(!S.hero.some(q=>q!==h&&q.st==='town'&&q.sub==='do'&&q.tk.b===i)){
   const w=S.hero.filter(q=>q.st==='town'&&q.sub==='wait'&&q.tk.b===i).sort((a,b)=>a.wt-b.wt||a.id-b.id)[0];
   if(w===h){const D=DUR[h.tk.k]||[60,120],p=door(itB(i));h.sub='do';h.t=taskOk(h,h.tk)?R(D[0],D[1]):0;h.x=p.x;h.y=p.y}
  }
 }else if(h.sub==='do'){h.t-=dt;if(h.t<=0){applyTask(h,h.tk);if(h.tk.k==='armory'){h.tk=null;h.sub=null;goOut(h)}else if(h.tk.k==='bless'){h.tk=null;h.sub=null;depart(h)}else if(h.tk.k==='inn'){h.tk=null;startRest(h)}else townNext(h)}}
}

const needB=()=>S.pl.find(x=>x.cn&&!S.hero.some(q=>q.st==='town'&&q.tk&&q.tk.k==='build'&&q.tk.b===x.i));
function bAssign(){const m=new Map();for(const h of S.hero)if(h.st==='town'&&h.sub==='bld'&&h.tk&&h.tk.k==='build'){const it=itB(h.tk.b);if(it&&it.cn)m.set(h.id,{it,j:0})}return m}
function bTick(dt){if(!S.pl.some(x=>x.cn||x.rb))return;const on=new Set();bAssign().forEach(v=>on.add(v.it));
 for(const it of S.pl.filter(x=>x.cn||x.rb)){if(it.cn){if(on.has(it)){it.cn.t+=dt;if(it.cn.t>=it.cn.T)bDone(it)}}else{it.rb.t+=dt;if(it.rb.t>=it.rb.T)rDone(it)}}}
function newPr(){const k=Math.min(Z.length,S.tavern),n=Math.min(4,1+Math.floor(nl('T')/3)),l=[];
 for(let t=0;t<n*8&&l.length<n;t++){let r=Math.random()*k*(k+1)/2,j=0;while(j<k-1&&(r-=j+1)>0)j++;
  const z=Z[j],nt=Math.random()<.3,L=nt?z.f:z.e,m=L[R(0,L.length-1)];if(l.some(x=>x.n===m[0]))continue;
  l.push({n:m[0],z:z.n,g:Math.max(PRMIN,Math.round(dz(z)*m[1]*(nt?NM:1)*PRM*(1+PRL*nl('T'))))})}
 S.pr={l};S.pd=S.day+2}
function restock(){let n=S.horses.filter(x=>x.o==null).length;while(n<3){const sp=Math.min(12,2+nl('E')+R(0,2));S.horses.push({sp,p:Math.round(sp*9*(.7+Math.random()*.6)),o:null});n++}}
function bDone(it){const c=it.cn,b=BD[c.id];it.cn=null;S.hero.forEach(h=>{if(h.st==='town'&&h.tk&&h.tk.k==='build'&&h.tk.b===it.i){h.tk=null;h.vk=null;h.vw=null;h.sub='home'}});S.cp=S.cp||{};S.cp[b.k]=Math.max(0,(S.cp[b.k]||0)-1);S[b.k]=(S[b.k]||0)+1;
 if(c.id==='H'){const hh={o:null,p:c.hp};S.hs.splice(S.pl.slice(0,S.pl.indexOf(it)).filter(x=>x.h).length,0,hh);it.h=hh}
 if(c.id!=='H'&&!S.npc[c.id]){const n0=rname();S.npc[c.id]={n:n0,g:rg(n0),lv:1,xp:0}}
 if(c.id==='E')restock();
 log(`${b.n} niveau ${c.l+1} terminé : ${b.t}.`,'ok');ui()}
function rebuild(k){let n=0;S.pl.forEach(it=>{if(it.e!==NE[k]||it.cn||it.rb)return;it.rb={t:0,T:R(300,600)};n++;
 S.hero.forEach(h=>{if(h.st==='town'&&h.tk&&h.tk.b===it.i&&h.sub!=='do'){h.vk=null;h.tk=null;townNext(h)}})});
 if(n)log(`${NT[k]} : travaux de rénovation, le bâtiment est fermé.`,'ok')}
function closeB(it){S.hero.forEach(h=>{if(h.st!=='town')return;h.tl=(h.tl||[]).filter(x=>x.b!==it.i);if(h.tk&&h.tk.b===it.i&&h.sub!=='do'){h.vk=null;h.tk=null;townNext(h)}})}
function rDone(it){const u=it.rb.up;it.rb=null;
 if(u){const b=BD[u.id];S.cp=S.cp||{};S.cp[b.k]=Math.max(0,(S.cp[b.k]||0)-1);S[b.k]=(S[b.k]||0)+1;if(u.id==='E')restock();log(`${b.n} niveau ${u.l+1} terminé : ${b.t}.`,'ok')}
 else log(`${NT[NK[it.e]]||'Bâtiment'} : rénovation terminée.`,'ok');ui()}
