function leave(h,z){h.z=z;const q=ZR[z.n]||ZR['Trône du Roi'],a=Math.random()*6.283,r=Math.sqrt(Math.random());h.pt={x:z.x+(q[0]+Math.cos(a)*(q[2]-1.2)*r)*ZS,y:z.y+(q[1]+Math.sin(a)*(q[3]-.5)*r)*ZS};h.v=Math.hypot(h.pt.x-h.x,h.pt.y-h.y)/tt(Math.hypot(z.x-T.x,z.y-T.y)/MS);h.gw=roadWP(z);{const en=ventry(z);h.wp=(en?vpath(h,en):[]).concat(h.gw.map(p=>({x:p.x,y:p.y})))}h.st='go'}
const PRM=.8,PRL=.04,PRMIN=2,TVX=2,FGT=2,AUB=3,BL0=.55,BL1=.04,BL2=.03,blP=()=>Math.min(.95,BL0+BL1*S.spa+BL2*nl('S'));
const WALK=1.6,DUR={loot:[30,45],inn:[20,30],horse:[60,120],house:[60,120],forge:[60,120],prime:[25,35],bless:[15,30]};
const TL={loot:'dépôt à la Mairie',horse:'achat d’un cheval',house:'achat d’une maison',forge:'à la forge',prime:'prime à la taverne',bless:'bénédiction au sanctuaire',inn:'enregistrement à l’Auberge',build:'au chantier'};
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
function decide(h){
 const hs=S.hs.find(x=>x.o==null);
 if(!h.home&&hs&&h.gold>=hs.p){const it=S.pl.find(x=>x.h===hs);if(it)return{k:'house',b:it.i}}
 if(!h.hs&&bestHorse(h)){const it=pickB(NE.E);if(it)return{k:'horse',b:it.i}}
 if(S.forge){const f=forgeP(h);if(h.eq[f.k]<f.t&&h.gold-f.p>=keepG(h)){const it=pickB(NE.F);if(it)return{k:'forge',b:it.i}}}
  return null}
function taskOk(h,tk){
 if(tk.k==='horse')return !h.hs&&!!bestHorse(h);
 if(tk.k==='house'){const hs=(itB(tk.b)||{}).h;return !h.home&&!!hs&&hs.o==null&&h.gold>=hs.p}
 if(tk.k==='forge'){if(!S.forge)return false;const f=forgeP(h);return h.eq[f.k]<f.t&&h.gold-f.p>=keepG(h)}
  if(tk.k==='bless')return !!S.spa&&!h.bless;
 return true}
function applyTask(h,tk){
 if(tk.k==='loot'){
  if(!h.loot)return;
  const l=h.loot,pg=Math.round(l.g*.3);h.gold+=pg;h.earned+=l.g;S.g+=l.g-pg;S.w+=l.w;S.s+=l.s;if(l.g+l.w+l.s>0)npcx('V');
  let m=`${h.name} bat ${h.won} : +${l.g} or (${pg} à sa bourse)`+(l.w?`, ${l.w} bois`:'')+(l.s?`, ${l.s} pierre`:'');
  if(l.gear)m+=' · '+giveGear(h);
  log(m+'.');
  while(h.xp>=xpNeed(h.lv)){h.xp-=xpNeed(h.lv);h.lv++;log(`${h.name} passe niveau ${h.lv}.`,'ok')}
  h.loot=null;return}
 if(!taskOk(h,tk))return;
 if(tk.k==='horse'){const x=bestHorse(h),p=hPrice(x);h.gold-=p;S.g+=p;x.o=h.id;h.hs=x;npcx('E');restock();log(`${h.name} achète un cheval ${x.sp} (${p} or).`,'ok')}
 else if(tk.k==='house'){const hs=itB(tk.b).h;h.gold-=hs.p;S.g+=hs.p;hs.o=h.id;h.home=hs;log(`${h.name} achète une maison (${hs.p} or).`,'ok')}
 else if(tk.k==='forge'){const f=forgeP(h);h.gold-=f.p;S.g+=f.p;h.eq[f.k]=f.t;npcx('F');log(`${h.name} achète ${pn(h,f.k)} ${f.t} chez le forgeron (${f.p} or).`)}
 else if(tk.k==='prime'){if(h.prime){const p=h.prime;h.gold+=p.g;h.earned+=p.g;h.prime=null;for(let i=0;i<TVX;i++)npcx('T');log(`🎯 ${h.name} touche la prime sur ${p.n} : +${p.g} or.`,'ok')}}
 else if(tk.k==='bless'){npcx('S');if(Math.random()<blP())h.bless=1;else log(`${h.name} : la bénédiction échoue.`)}
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
 }else if(h.sub==='do'){h.t-=dt;if(h.t<=0){applyTask(h,h.tk);if(h.tk.k==='bless'){h.tk=null;h.sub=null;leave(h,pick(h))}else if(h.tk.k==='inn'){h.tk=null;startRest(h)}else townNext(h)}}
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
