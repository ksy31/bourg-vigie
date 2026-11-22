const CR=[],crp=(t,c)=>{CR.push({t,c,at:performance.now()});if(CR.length>8)CR.shift()};
const cap=()=>1+P.h+2*S.inn+S.houses;
const rcost=()=>20+S.hero.length*8;
const PN={w:{G:'Épée',V:'Dague',M:'Bâton',R:'Arc'},a:'Armure',b:'Bottes',s:'Bouclier'};
const IC={w:{G:'⚔️',V:'🗡️',M:'🪄',R:'🏹'},a:'<svg viewBox="0 0 16 16" width="1em" height="1em" style="vertical-align:-.15em" aria-hidden="true"><path d="M4.4 3.4Q8 5.6 11.6 3.4L12.2 8Q12.2 10.6 11 11.8L12.2 14.4H3.8L5 11.8Q3.8 10.6 3.8 8Z" fill="#b4bdc7" stroke="#2f3640" stroke-width=".9" stroke-linejoin="round"/><ellipse cx="3.1" cy="4.4" rx="2.2" ry="1.8" fill="#8c97a3" stroke="#2f3640" stroke-width=".9" stroke-linejoin="round"/><ellipse cx="12.9" cy="4.4" rx="2.2" ry="1.8" fill="#8c97a3" stroke="#2f3640" stroke-width=".9" stroke-linejoin="round"/><path d="M8 5.6V12.2M4.9 8.3Q8 10 11.1 8.3M5 12.3H11" stroke="#eef2f6" stroke-width=".7" fill="none"/></svg>',b:'👢',s:'🛡️'};
const SL={G:['w','a','b','s'],V:['w','a','b'],M:['w','a','b'],R:['w','a','b']};
const pn=(h,k)=>k==='w'?PN.w[h.c]:PN[k];
const ic=(h,k)=>k==='w'?IC.w[h.c]:IC[k];
const eqP=h=>2*h.eq.w+1.2*h.eq.a+h.eq.b+1.2*h.eq.s;
const XP0=4,XPP=1.5,XPR2=.35,xpNeed=l=>Math.round(XP0*Math.pow(l,XPP)*Math.exp(XPR2*Math.max(0,l-20)));
const CB0=30,CB1=45,CBK=.3,BT0=120,BT1=180,PB=1.5,TH0=.92,TH1=.2,RK0=.03,RK1=.04,DFLOOR=.07,FLEE=.2,NM=1.6,WOOD=.45;
const power=h=>(PB+h.lv*2.5+eqP(h)+S.forge*2)*CL[h.c].p*(1+.06*P.p)*(h.buff||1);
function giveGear(h){
 const sl=SL[h.c],k=sl[R(0,sl.length-1)],base=h.en.el?dz(h.z)*1.5:h.en.d,t=Math.max(1,Math.round(base/5));
 if(t>h.eq[k]){h.eq[k]=t;return `équipe ${pn(h,k)} ${t}`}
 const g=t*5;S.g+=g;return `revend ${pn(h,k)} ${t} (+${g} or)`;
}
const gs=h=>SL[h.c].map(k=>h.eq[k]?`${ic(h,k)}${h.eq[k]}`:'').join(' ');
const WP=[[0,.02],[.3,.05],[.5,.2],[.8,.45],[1,.7],[1.5,.85],[2,.92]];
const win=(h,d)=>{const r=power(h)/d;for(let i=1;i<WP.length;i++)if(r<=WP[i][0]){const a=WP[i-1],b=WP[i];return a[1]+(b[1]-a[1])*(r-a[0])/(b[0]-a[0])}return .92};
function log(t,c){logs.unshift({t,c,ts:`[J${S.day} · ${hr()}h]`});logs=logs.slice(0,20);renderLog()}
function renderLog(){$('log').innerHTML=logs.map(l=>`<p class="${l.c||''}">${l.ts?l.ts+' ':''}${fmt(l.t)}</p>`).join('')}
function recruit(){
 if(S.g<rcost())return;
 S.g-=rcost();
 const h={id:S.n++,name:rname(),c:Object.keys(CL)[R(0,3)],eq:{w:0,a:0,b:0,s:0},lv:1,xp:0,gold:0,kills:0,earned:0,hurt:0,bd:S.day,born:S.day-R(18,35)*365,home:null,hs:null,buff:0,bold:Math.random(),col:COL[R(0,COL.length-1)],...base({home:null}),st:'rest',t:1,z:null,last:null,en:null,loot:null};
 h.g=rg(h.name);S.hero.push(h);log(`${h.name} rejoint la ville (${CL[h.c].n}).`,'ok');ui();
}
const lvl=b=>(S[b.k]||0)+((S.cp||{})[b.k]||0);
function build(id){
 const b=BD[id],l=lvl(b),c=b.c(l);
 if(S.w<c.w||S.s<c.s||S.g<c.g)return;
 S.w-=c.w;S.s-=c.s;S.g-=c.g;S.cp=S.cp||{};S.cp[b.k]=(S.cp[b.k]||0)+1;
 S.pl.push({e:id==='H'?'':NE[id],i:S.pl.length,h:null,cn:{id,l,t:0,T:R(900,1800),hp:50}});
 log(`Chantier lancé : ${b.n} niveau ${l+1} (1 à 2 jours, un aventurier y travaille).`,'ok');ui();
}
function pick(h){
 const th=TH0-h.bold*TH1,nm=isNight()?NM:1;
 let c=[],tot=0,md=0,hard=null;
 for(const z of Z)if(win(h,dz(z)*nm)>=th)md=Math.max(md,z.d);
 for(const z of Z){
  if(win(h,dz(z)*nm)<th){if(z.d>md&&(!hard||z.d<hard.d))hard=z;continue}
  let w=1+4*(z.d/md)**3;
  if(z===h.last)w*=.25;
  if((z.n==='Forêt'||z.n==='Marais')&&S.w<40)w*=2;
  if((z.n==='Mine'||z.n==='Montagne')&&S.s<40)w*=2;
  if(z.d>=24&&S.g<80)w*=1.5;
  c.push([z,w]);tot+=w;
 }
 if(!c.length)return Z[0];
 if(hard&&Math.random()<RK0+RK1*h.bold)return hard;
 let r=Math.random()*tot;
 for(const [z,w] of c){r-=w;if(r<=0)return z}
 return c[0][0];
}
function arrive(h){
 const z=h.z;
 if(z.boss)h.en={n:'Roi Démon',d:bossD(),m:3,boss:1};
 else if(h.lv>=5&&Math.random()<.02){h.en={n:'Champion légendaire',d:power(h)*1.2,m:2.2,el:1};log(`Un champion légendaire surgit face à ${h.name} !`,'bad')}
 else{const nt=isNight(),L=nt?z.f:z.e,e=L[R(0,L.length-1)];h.en={n:e[0],d:dz(z)*e[1]*(nt?NM:1),m:e[1],nt}}
 h.st='fight';h.t=z.boss?R(BT0,BT1):Math.round(R(CB0,CB1)*(.9+CBK*h.en.m));log(`⚔️ ${h.name} affronte ${h.en.n} (${z.n || 'Roi'})`);
}
function resolve(h){
 const z=h.z,e=h.en,c=CL[h.c];
 h.last=z;
 const w=win(h,e.d),sv=e.boss?.05:Math.min(.4,(1-c.die)*FLEE*(e.el?2:1)*(1+Math.min(.5,(h.eq.a+h.eq.s)*.06))+(h.bless?.04*S.spa+.02*nl('S'):0)),pd=Math.max(DFLOOR,(1-w)*(1-sv)),pw=Math.min(w,1-pd),rr=Math.random();
 if(rr<pw){
  h.loot={g:0,w:0,s:0,gear:0};
  if(z.n==='Forêt'){h.loot.w=R(3,6);h.loot.g=R(2,6);if(Math.random()<.1)h.loot.s=R(1,2)}
  if(z.n==='Mine'){h.loot.s=R(3,6);h.loot.g=R(6,12)}
  if(z.n==='Ruines'){h.loot.g=R(10,18);h.loot.s=R(1,3);if(Math.random()<.35)h.loot.gear=1}
  if(z.n==='Donjon'){h.loot.g=R(25,45);h.loot.w=3;h.loot.s=3;if(Math.random()<.6)h.loot.gear=1}
  if(z.n==='Marais'){h.loot.w=R(2,5);h.loot.g=R(4,9)}
  if(z.n==='Montagne'){h.loot.s=R(4,8);h.loot.g=R(10,16)}
  if(z.n==='Cimetière'){h.loot.g=R(16,26);h.loot.s=R(2,4);if(Math.random()<.4)h.loot.gear=1}
  if(z.n==='Volcan'){h.loot.g=R(35,60);h.loot.w=4;h.loot.s=4;if(Math.random()<.6)h.loot.gear=1}
  const rl=power(h)/e.d,lk=rl<.8?Math.min(3,.8/rl):1,k=(e.el?2:.7+.3*e.m)*lk,l=h.loot;
  l.g=Math.round(l.g*k*c.g*(e.nt?1.6:1)*(1+.15*P.g+.01*nl('V')))+(e.el?Math.round(e.d):0);l.w=Math.round(l.w*k*c.r*(e.nt?.5:1)*WOOD);l.s=Math.round(l.s*k*c.r*(e.nt?.5:1));
  if((e.el&&Math.random()<.7)||Math.random()<(e.nt?.25:.1))l.gear=1;
  h.xp+=Math.min(xpNeed(h.lv)-1,Math.max(1,Math.round(e.d*Math.min(1.5,e.d/power(h)*1.2))));
  h.kills++;log(`✔ ${h.name} a vaincu ${e.n}.`,'ok');crp(`✔ ${h.name} a vaincu ${e.n}`,'#7ddc7a');h.won=e.n;goBack(h);if(e.boss)victory(h);
 }else if(rr<pw+pd){
  if(h.home){h.home.o=null;h.home.dn=(h.home.dn||0)+1;h.home.p=Math.round(50*Math.max(.5,1-.1*h.home.dn))}if(h.hs)h.hs.o=null;lbAdd({n:h.name,c:h.c,lv:h.lv,d:S.day-h.bd+1,by:e.n,k:h.kills,g:h.earned,eq:{...h.eq}});save();S.marks.push({x:h.x,y:h.y,t:S.t,n:h.name});S.alert={txt:`💀 ${h.name} est mort · ${z.n}`,at:performance.now()};crp(`💀 ${h.name} est mort face à ${e.n}`,'#ff6b5e');
  S.hero=S.hero.filter(x=>x!==h);
  log(`${h.name} (${c.n} niv. ${h.lv}) est tombé·e face à ${e.n}.`,'bad');
  ui();
 }else{
  h.loot=null;h.hurt=1;goBack(h);log(`${h.name} fuit devant ${e.n}, blessé·e.`);crp(`${h.name} fuit devant ${e.n}`,'#fff');
 }
}
function tick(dt){
 S.t+=dt;if(S.t-S.ds>=S.dl){S.ds+=S.dl;S.day++}if(hr()===4&&S.aw!==S.day){S.aw=S.day;S.hero.forEach(h=>{if(h.st==='rest')for(let i=0;i<AUB;i++)npcx('A')})}wxTick();bTick(dt);
 for(const h of S.hero.slice()){
  if(h.st==='rest'){h.t-=dt;if(h.t<=0&&(!isNight()||h.bold>.55)){const bs=needB();if(bs){h.tk={k:'build',b:bs.i};h.tl=[];h.dec=1;h.st='town';h.sub='walk';h.vk=null;continue}const sp=S.spa&&!h.bless?pickB(NE.S):null;if(sp){h.tk={k:'bless',b:sp.i};h.tl=[];h.dec=1;h.st='town';h.sub='walk'}else leave(h,pick(h))}}
  else if(h.st==='town')townTick(h,dt);
  else if(h.st==='go'||h.st==='back'){
   const tg=h.wp&&h.wp.length?h.wp[0]:(h.st==='go'?h.pt:(h.tl&&h.tl.length?door(itB(h.tl[0].b)):base(h)));
   const dx=tg.x-h.x,dy=tg.y-h.y,d=Math.hypot(dx,dy),sp=h.v*dt*spf(h);
   if(d<=sp){h.x=tg.x;h.y=tg.y;if(h.wp&&h.wp.length)h.wp.shift();else if(h.st==='go')arrive(h);else townNext(h)}
   else{h.x+=dx/d*sp;h.y+=dy/d*sp}
  }else if(h.st==='fight'){h.t-=dt;if(h.t<=0){resolve(h);h.buff=0;h.bless=0}}
 }
}
