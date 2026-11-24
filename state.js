function layout(){const out=[],WX=100*MS;ZB.forEach((zb,i)=>{const b=BASEPOS[i],r=ZRD(zb.n),y0=(zt(zb.n)+3)*ZS;let p=null;for(let k=0;k<60&&!p;k++){const a=(Math.random()*2-1)*.25,c=Math.cos(a),s=Math.sin(a),vx=b[0]-T.x,vy=b[1]-T.y,q=[Math.min(WX-r-6,Math.max(r+6,T.x+vx*c-vy*s)),Math.min(456,Math.max(y0,T.y+vx*s+vy*c))];if(out.every((o,j)=>Math.hypot(o[0]-q[0],o[1]-q[1])>r+ZRD(ZB[j].n)+6)&&Math.hypot(q[0]-BZ.x,q[1]-BZ.y)>r+ZRD(BZ.n)+10&&Math.hypot(q[0]-T.x,q[1]-T.y)>r+50)p=q}out.push(p||b.slice())});return out}
const T0={x:300,y:612},BZ0={x:BZ.x,y:BZ.y};let MC=null;
function mapOk(zp){const sv=ZA;try{ZA=[...ZB.map((b,i)=>({n:b.n,x:zp[i][0],y:zp[i][1]})),BZ];const gen=f=>{const pv=[];ZA.forEach((z,i)=>{pv.push(roadOf(z,i,pv,f))});return pv};for(let k=0;k<14;k++){const pv=gen(k);if(!roadsCross(pv)){MC={k:JSON.stringify(zp)+T.x+T.y+BZ.x+BZ.y,pv};return true}}return false}finally{ZA=sv}}
function genMap(){const WX=100*MS,WY=130*MS,ent=[...ZB.map((b,i)=>[b.n,Math.hypot(BASEPOS[i][0]-T0.x,BASEPOS[i][1]-T0.y)]),[BZ.n,Math.hypot(BZ0.x-T0.x,BZ0.y-T0.y)]];
 for(let a=0;a<500;a++){const tx=Math.round(110+Math.random()*380),ty=Math.round(100+Math.random()*600),pl=[];let ok=true;
  for(const [n,d] of ent){const r=ZRD(n),y0=(zt(n)+3)*ZS,y1=WY-(zr(n)[3]+4)*ZS;let p=null;
   for(let k=0;k<40&&!p;k++){const an=Math.random()*6.2832,x=Math.round((tx+d*Math.cos(an))*10)/10,y=Math.round((ty+d*Math.sin(an))*10)/10;if(x<r+6||x>WX-r-6||y<y0||y>y1)continue;if(pl.every(o=>Math.hypot(o.x-x,o.y-y)>r+o.r+8))p={x,y,r}}
   if(!p){ok=false;break}pl.push(p)}
  if(!ok)continue;
  const zp=pl.slice(0,6).map(p=>[p.x,p.y]),b=pl[6];T.x=tx;T.y=ty;BZ.x=b.x;BZ.y=b.y;
  if(typeof roadOf!=='function'||mapOk(zp))return zp}
 T.x=T0.x;T.y=T0.y;BZ.x=BZ0.x;BZ.y=BZ0.y;return BASEPOS.map(q=>q.slice())}
function buildZ(){ZVC=S.zv;ZSON=!!S.zs;Z=ZB.map((b,i)=>{const v=ZV[i][S.zv[i]];return{n:b.n,vi:S.zv[i],sn:v[0],x:S.zp[i][0],y:S.zp[i][1],d:v[1],c:b.c,e:v[2].split(',').map((m,j)=>[m,[.8,1.1,1.5][j]]),f:v[3].split(',').map((m,j)=>[m,[.9,1.2,1.6][j]])}});ZA=[...Z,BZ];const gen=f=>{const pv=[];ZA.forEach((z,i)=>{RD[z.n]=roadOf(z,i,pv,f);pv.push(RD[z.n])});return pv};const ck=JSON.stringify(S.zp)+T.x+T.y+BZ.x+BZ.y;if(MC&&MC.k===ck)ZA.forEach((z,i)=>{RD[z.n]=MC.pv[i]});else{let ok=0;for(let k=0;k<14&&!ok;k++)ok=!roadsCross(gen(k));if(!ok)gen(-1)}MC=null;buildRivers()}
let P={glory:0,runs:0,g:0,p:0,s:0,h:0,lb:[]};
try{Object.assign(P,JSON.parse(localStorage.getItem('bv')||'{}'))}catch(e){}
P.lb=(P.lb||[]).filter(x=>x&&x.eq&&x.k!=null);
const save=()=>{try{localStorage.setItem('bv',JSON.stringify(P))}catch(e){}};
const U={g:{n:'Fortune',t:'+15 % d’or'},p:{n:'Vaillance',t:'+6 % de puissance'},s:{n:'Héritage',t:'+40 or au départ'},h:{n:'Vigueur',t:'−8 % de repos'}};
const BOSS0=300,bossD=()=>BOSS0*(1+.35*P.runs);
const tt=D=>63.6+Math.max(0,D-38)*4.35;
const BD={
 E:{n:'Écurie',t:'chevaux plus rapides',k:'stable',c:l=>({w:35+l*30,s:15+l*15,g:50+l*60})},
 H:{n:'Maison',t:'+1 place, à vendre',k:'houses',c:l=>({w:20+l*15,s:8+l*8,g:0})},
 F:{n:'Forge',t:'+puissance, paliers d’équipement',k:'forge',c:l=>({w:25+l*25,s:25+l*25,g:30+l*40})},
 T:{n:'Taverne',t:'primes sur les monstres',k:'tavern',c:l=>({w:30+l*25,s:10+l*12,g:40+l*50})},
 S:{n:'Sanctuaire',t:'morts −8 %',k:'spa',c:l=>({w:20+l*20,s:30+l*25,g:60+l*70})},
 I:{n:'Armurerie',t:'récupère l’équipement des morts',k:'armory',c:l=>({w:20+l*20,s:30+l*25,g:60+l*70})},
 C:{n:'Maison des Guildes',t:'fonder et rejoindre une guilde',k:'guildh',c:l=>({w:30+l*25,s:30+l*30,g:80+l*80})},
 N:{n:'Enchantement',t:'sorts appris contre des gemmes',k:'ench',c:l=>({w:30+l*25,s:30+l*30,g:80+l*80})},
};
const cs=c=>[c.w&&c.w+' bois',c.s&&c.s+' pierre',c.g&&c.g+' or'].filter(Boolean).join(', ');
const bestChamp=()=>S.hero.filter(h=>h.z!==BZ||h.st==='rest').sort((a,b)=>power(b)-power(a))[0];
const kgBusy=()=>S.hero.some(x=>x.kg||(x.z===BZ&&x.st!=='rest'));
function sendBoss(){if(kgBusy())return;const h=bestChamp();if(!h)return;h.kg=1;h.kb=0;
 if(h.st==='town'&&h.sub==='bld'){h.tk=null;h.vk=null;h.vw=null;h.sub='home'}
 log(`⚔️ ${h.name} se prépare à affronter le Roi Démon…`,'bad');ui()}
function victory(h){sleepOff();
 const gain=1;
 P.glory+=gain;P.runs++;save();S.speed=0;ui();
 $('pvt').textContent=`${h.name} a terrassé le Roi Démon ! +${gain} Gloire`;
 shop();$('pn').textContent='Nouvelle run';$('vn').value=S.vn;$('pc').hidden=true;$('pv').hidden=false;
}
function shop(){
 $('pg').textContent=`Gloire : ${P.glory} · bonus permanents`;
 $('pu').innerHTML=Object.entries(U).map(([k,u])=>`<button data-u="${k}" ${P.glory<P[k]+1?'disabled':''}>${u.n} (niv. ${P[k]})<small>${u.t} · ${P[k]+1} Gloire</small></button>`).join('');
 $('pu').querySelectorAll('button').forEach(b=>b.onclick=()=>{const k=b.dataset.u;if(P.glory>=P[k]+1){P.glory-=P[k]+1;P[k]++;save();shop()}});
}
function newRun(){
 clearInterval(gameOver.t);S=fresh();buildZ();S.vn=($('vn').value.trim()||'Vigie').slice(0,20);logs=[];$('pn').textContent='Nouvelle run';$('pc').hidden=true;$('pv').hidden=true;
  ui();log('Nouvelle partie : recrute tes premiers aventuriers, ils partiront seuls en quête.','ok');
}
const T={x:300,y:612},MS=6,ZS=5,RD={},ZR={'Forêt':[0,1.7,22,8.5],'Mine':[0,4.8,12,2.2],'Montagne':[0,4.2,14,2.2],'Ruines':[0,3.8,13,2.6],'Donjon':[0,5,6,1.3],'Volcan':[0,4.8,11,2],'Trône du Roi':[0,5,5,1.3]},ZT={'Forêt':16,'Mine':6.5,'Montagne':12,'Ruines':8.5,'Donjon':11,'Volcan':15.5,'Trône du Roi':12.5},ZRD=n=>(ZR[n]||ZR['Trône du Roi'])[2]*ZS*zsc(n)+4;
let ZVC=[],ZSON=false;const ZK=[.6,1,1.5];
function zsc(n){if(!ZSON)return 1;const i=ZB.findIndex(b=>b.n===n);return i<0?1:(ZK[ZVC[i]]||1)}
function zr(n){const q=ZR[n]||ZR['Trône du Roi'],k=zsc(n);return[q[0]*k,q[1]*k,q[2]*k,q[3]*k]}
function zt(n){return ZT[n]*zsc(n)}
let NAMES=['KaoTiem', 'Nathalie', 'Lilian', 'Lena', 'Anne', 'Chani', 'Momo', 'NayTiem', 'David', 'Julie', 'Didier', 'Karine', 'Julien-F', 'SanTiem', 'Marie-Laure', 'Karian', 'Marine', 'Cléo', 'Alicia', 'Liam', 'SouTiem', 'Jenny', 'Tommy', 'Willy', 'Meily', 'Claude', 'Cécile', 'Claire', 'Laure', 'KaoTon', 'Ludivine', 'Axel', 'Aurore', 'Ambre', 'SainPou', 'Mike', 'Sébastien', 'KaoPou', 'Carla', 'Loann', 'Enzo', 'Noëlla', 'NayPou', 'Christel', 'Maëlys', 'Thibault', 'FamPou', 'Alexandre', 'Lucas', 'Patrick', 'SouPou', 'Leila', 'Lay', 'Arnaud', 'Léa', 'Khe', 'Carlos', 'Mélinda', 'Nathan', 'Ou', 'MeyTsoy', 'NayTsoy', 'Mathieu', 'Emy', 'Élodie', 'Tristan', 'Fred', 'Pa', 'Raphaëlle', 'Camille', 'Julien', 'Sy', 'Émilie', 'Inès', 'Arthur', 'José', 'Angélique', 'Laurie', 'Eva', 'Lucas-G', 'Maël', 'Clara', 'Naomie', 'Baptiste', 'Chloé', 'Marvin'];
const NAMES0=NAMES.slice();
try{const j=JSON.parse(localStorage.getItem('bvn')||'null');if(Array.isArray(j))NAMES=j.filter(x=>typeof x==='string')}catch(e){}
const SYL=['ka','ro','mi','el','dan','vi','tor','la','ny','sa','bre','gor','ai','lun','mar','thy','ze','fen','ori','ca','dra','lis','mon','tha'];
const fmt=s=>s.replace(/\u2060([^\u2061]*)\u2061/g,'<i>$1</i>'),sn=s=>s.replace(/[\u2060\u2061]/g,'');
function rn(ex,st){const r=rn0(ex,st);if(st)(st.used=st.used||[]).push(r);return r}
function rn0(ex,st){const used=new Set(ex);if(st){st.hero.forEach(q=>used.add(q.name));Object.values(st.npc||{}).forEach(x=>used.add(x.n));(st.used||[]).forEach(x=>used.add(x))}
 const f=NAMES.filter(n=>!used.has(n));if(f.length)return f[Math.floor(Math.random()*f.length)];
 for(let k=0;k<60;k++){let s='';const n=2+Math.floor(Math.random()*2);for(let i=0;i<n;i++)s+=SYL[Math.floor(Math.random()*SYL.length)];s=s[0].toUpperCase()+s.slice(1);const m='\u2060'+s+'\u2061';if(!used.has(m)&&!NAMES.includes(s))return m}
 let q=1,m;do{m='\u2060Anonyme'+q+'\u2061';q++}while(used.has(m));return m}
function ui(){ui0()}
let NG={};try{NG=JSON.parse(localStorage.getItem('bvg')||'{}')||{}}catch(e){}
const gc=v=>v==='M'?'♂':v==='F'?'♀':v;for(const k in NG)NG[k]=gc(NG[k]);
const rg=n=>NG[sn(n)]||(Math.random()<.5?'♂':'♀'),gd=(x,n)=>NG[sn(n)]||gc(x.g)||'♂';
function mg(s){(s.hero||[]).forEach(h=>{h.g=h.g?gc(h.g):rg(h.name)});for(const k in s.npc||{})s.npc[k].g=s.npc[k].g?gc(s.npc[k].g):rg(s.npc[k].n)}
function exportCode(){return btoa(unescape(encodeURIComponent(JSON.stringify({v:1,S:Object.assign({},S,{logs:logs.slice(0,20)}),P,N:NAMES,G:NG}))))}
function importCode(c){const o=JSON.parse(decodeURIComponent(escape(atob(c.trim()))));if(!o||!o.S||!Array.isArray(o.S.hero)||!Array.isArray(o.S.pl))throw 0;localStorage.setItem(SK,JSON.stringify(o.S));if(o.P)localStorage.setItem('bv',JSON.stringify(o.P));if(Array.isArray(o.N))localStorage.setItem('bvn',JSON.stringify(o.N));if(o.G&&typeof o.G==='object')localStorage.setItem('bvg',JSON.stringify(o.G))}
const COL=['#e8262d','#ffd400','#1fbf5b','#1e90ff','#a23fe0','#ff7a00','#00c8d4','#ff2f92'],VCOL={'#e07a5f':COL[0],'#f2cc8f':COL[1],'#81b29a':COL[2],'#8ecae6':COL[3],'#c8a2c8':COL[4],'#f4a261':COL[5],'#a7c957':COL[6],'#ff9fb2':COL[7]};
const fu=o=>{o.used=[o.npc.A.n,o.npc.V.n];return o};
const fresh=()=>{const zv=ZB.map(()=>Math.floor(Math.random()*3));ZVC=zv;ZSON=true;return fu({zs:1,g:48+40*P.s,w:0,s:0,houses:0,forge:0,tavern:0,spa:0,armory:0,chest:[],guildh:0,ench:0,guilds:[],hero:[],cp:{},t:0,day:1,speed:1,n:0,marks:[],alert:null,inn:1,stable:0,hs:[],horses:[],vn:'Vigie',lb:[],mv:5,zv,zp:genMap(),tp:[T.x,T.y],bp:[BZ.x,BZ.y],ds:0,dl:900,pl:[{e:NE.V,i:0},{e:NE.A,i:1}],npc:(()=>{const a=rn([]),b=rn([a]);return{A:{n:a,g:rg(a),lv:1,xp:0},V:{n:b,g:rg(b),lv:1,xp:0}}})()})};
let S=fresh(),showT=false;
const rname=()=>rn([],S);
const rem=h=>{if(h.st==='fight'||h.st==='loot')return h.t;if(h.st==='town')return h.sub==='do'?h.t:0;if(h.st!=='go'&&h.st!=='back')return 0;const tg=h.st==='go'?h.pt:(h.tl&&h.tl.length?door(itB(h.tl[0].b)):base(h));return plen(h,tg)/(h.v*spf(h))};
const fm=s=>{s=Math.ceil(s);return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};
const nl=k=>S.npc[k]?S.npc[k].lv:0;
const hr=()=>Math.floor((6+24*(S.t-S.ds)/S.dl)%24);
const isNight=()=>{const x=hr();return x>=21||x<5};
const dk=()=>{const x=(6+24*(S.t-S.ds)/S.dl)%24;if(x>=21||x<5)return 1;if(x>=20)return x-20;if(x<6)return 6-x;return 0};
// v3.5.0 : intensité des lumières (lampadaires, torches, fenêtres) : allumage progressif 19h-21h, extinction progressive 4h-6h
const dkl=()=>{const x=(6+24*(S.t-S.ds)/S.dl)%24,e=t=>t*t*(3-2*t);if(x>=21||x<5)return 1;if(x>=19)return e((x-19)/2);if(x<6.5)return e((6.5-x)/1.5);return 0};
function gameOver(){sleepOff();S.over=1;S.speed=0;let n=10;const t=()=>{$('pvt').textContent=n>0?'You lose':'Game Over';$('pg').textContent=n>0?`Continue ? ${n}`:'Fin de partie.';$('pn').textContent=n>0?'Continue':'Recommencer'};t();$('pu').innerHTML=`<p style="margin:0">Tu as tenu ${S.day} jours.</p>`;$('vn').value=S.vn;$('pc').hidden=true;$('pv').hidden=false;clearInterval(gameOver.t);gameOver.t=setInterval(()=>{if(--n<=0)clearInterval(gameOver.t);t()},1000)}
const WXI={clear:'☀️',cloud:'☁️',rain:'🌧️',storm:'⛈️',fog:'🌫️'},WXV={clear:[0,0,0,0],cloud:[.14,0,0,0],rain:[.2,.55,0,0],storm:[.36,1,0,1],fog:[.05,0,1,0]},WXP=[['clear',60],['cloud',16],['rain',12],['fog',8],['storm',4]];
function wxPick(){let r=Math.random()*100;for(const [k,w] of WXP){r-=w;if(r<=0)return k}return'clear'}
function wxTick(){const h=S.dl/24;let w=S.wx;if(!w||!WXV[w.c])w=S.wx={c:'clear',x:null,at:S.t+R(4,6)*h};
 if(!w.x&&S.t>=w.at)w.x=wxPick();
 if(w.x&&S.t>=w.at+h){w.c=w.x;w.x=null;w.at=S.t+R(4,6)*h}}
function wxMix(){const w=S.wx;if(!w||!WXV[w.c])return WXV.clear;const a=WXV[w.c];if(!w.x||!WXV[w.x])return a;const k=Math.min(1,Math.max(0,(S.t-w.at)/(S.dl/24))),b=WXV[w.x];return a.map((v,i)=>v+(b[i]-v)*k)}
const wxIcon=()=>{const w=S.wx;if(!w||!WXI[w.c])return WXI.clear;return WXI[w.x&&WXI[w.x]&&(S.t-w.at)/(S.dl/24)>=.5?w.x:w.c]};
const spf=h=>(1+h.eq.b*.05)*(h.hs?Math.min(2.2,1.4+h.hs.sp*.06*(1+.1*S.stable)):1);
function npcx(k){const n=S.npc[k];if(!n)return;n.xp++;if(n.xp>=n.lv*20){n.xp=0;n.lv++;log(`${NT[k]} ${n.n} passe niveau ${n.lv}.`,'ok');if(k!=='A'&&(n.lv===3||n.lv===6))rebuild(k)}}
