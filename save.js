const SK='bvs';
const TH={m:(()=>{try{return localStorage.getItem('bvth')==='j'?'j':'n'}catch(e){return'n'}})()};
function thApply(){document.documentElement.setAttribute('data-theme',TH.m==='j'?'light':'dark');const b=$('thm');if(b)b.textContent=TH.m==='j'?'☀️':'🌙';const mt=document.querySelector('meta[name="theme-color"]');if(mt)mt.setAttribute('content',TH.m==='j'?'#f1efe9':'#2f5d50')}
function thToggle(){TH.m=TH.m==='j'?'n':'j';try{localStorage.setItem('bvth',TH.m)}catch(e){}thApply()}
const fsEl=()=>document.fullscreenElement||document.webkitFullscreenElement,fsOk=()=>!!(document.documentElement.requestFullscreen||document.documentElement.webkitRequestFullscreen);
function fsApply(){const b=$('fsb');if(!b)return;b.hidden=!fsOk();b.textContent=fsEl()?'🗗':'⛶'}
function fsToggle(){try{if(fsEl()){const x=document.exitFullscreen||document.webkitExitFullscreen;x&&x.call(document)}else{const d=document.documentElement,x=d.requestFullscreen||d.webkitRequestFullscreen,p=x&&x.call(d);if(p&&p.catch)p.catch(()=>{})}}catch(e){}}
function saveG(m){try{S.sat=Date.now();S.logs=logs.slice(0,20);localStorage.setItem(SK,JSON.stringify(S));if(m===true)toast('Sauvegarde réussie ✓')}catch(e){if(m===true)toast('Échec de la sauvegarde')}}
function toast(t){const e=$('toast');e.textContent=t;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('on'),2200)}
function mig(s){const M=3;if(s.zp)s.zp=s.zp.map(p=>[p[0]*M,p[1]*M]);(s.marks||[]).forEach(m=>{m.x*=M;m.y*=M});
 (s.hero||[]).forEach(h=>{if(h.st==='town'||h.st==='rest'){h.x+=T.x-50;h.y+=T.y-102}else{h.x*=M;h.y*=M;if(h.pt){h.pt.x*=M;h.pt.y*=M}if(h.v)h.v*=M}});s.mv=2}
function mig3(s){const f=2.5/3,o={x:150,y:306};if(s.zp)s.zp=s.zp.map(p=>[p[0]*f,p[1]*f]);(s.marks||[]).forEach(m=>{m.x*=f;m.y*=f});
 (s.hero||[]).forEach(h=>{if(h.st==='town'||h.st==='rest'){h.x+=T.x-o.x;h.y+=T.y-o.y}else{h.x*=f;h.y*=f;if(h.pt){h.pt.x*=f;h.pt.y*=f}if(h.v)h.v*=f;h.wp=[];h.gw=[]}});s.mv=3}
function repath(h){if((h.st!=='go'&&h.st!=='back')||!h.z)return;const g=roadWP(h.z);if(!g.length)return;h.gw=g;let bi=0,bd=1e9;g.forEach((p,k)=>{const d=Math.hypot(p.x-h.x,p.y-h.y);if(d<bd){bd=d;bi=k}});h.wp=(h.st==='go'?g.slice(bi):g.slice(0,bi+1).reverse()).map(p=>({x:p.x,y:p.y}))}
function migMap(s){const f=6/2.5,o={x:125,y:255};if(s.zp)s.zp=s.zp.map(p=>[p[0]*f,p[1]*f]);(s.marks||[]).forEach(m=>{m.x*=f;m.y*=f});
 (s.hero||[]).forEach(h=>{if(h.st==='town'||h.st==='rest'){h.x+=T.x-o.x;h.y+=T.y-o.y}else{h.x*=f;h.y*=f;if(h.pt){h.pt.x*=f;h.pt.y*=f}if(h.v)h.v*=f;h.wp=[];h.gw=[]}})}
function mig5(s){const MK='🏪',gone=s.pl.filter(it=>it.e===MK);if(!gone.length&&!(s.npc&&s.npc.M)&&!s.market)return;
 let w=0,st=0,g=0;const add=l=>{w+=40+l*30;st+=20+l*20;g+=50+l*60};
 for(let l=0;l<(s.market||0);l++)add(l);gone.forEach(it=>{if(it.cn)add(it.cn.l)});
 const gi=new Set(gone.map(it=>it.i));s.pl=s.pl.filter(it=>it.e!==MK);
 const map={};s.pl.map(it=>it.i).sort((a,b)=>a-b).forEach((o,r)=>{map[o]=r});s.pl.forEach(it=>{it.i=map[it.i]});
 const f=b=>gi.has(b)?null:map[b];
 s.hero.forEach(h=>{if(h.st!=='town')return;h.vk=null;h.vw=null;
  h.tl=(h.tl||[]).map(x=>Object.assign({},x,{b:f(x.b)})).filter(x=>x.b!=null);
  if(h.tk&&h.tk.b!=null){const nb=f(h.tk.b);if(nb==null){h.tk=null;h.sub='home'}else{h.tk.b=nb;const it=itB(nb);if(it&&(h.sub==='do'||h.sub==='wait')){const p=door(it);h.x=p.x;h.y=p.y}}}});
 s.w+=w;s.s+=st;s.g+=g;delete s.market;delete s.npc.M;if(s.cp)delete s.cp.market;
 (s.logs=s.logs||[]).unshift({t:'Marché supprimé'+(w+st+g?` : ${g} or, ${w} bois, ${st} pierre remboursés`:'')+'.',c:'ok',ts:'[J'+s.day+']'})}
function mig6(s){const KS={E:'stable',F:'forge',T:'tavern',S:'spa'},gone=new Set(),rf={w:0,s:0,g:0},nm=[];
 for(const k in KS){const e=NE[k],b=BD[k],its=s.pl.filter(it=>it.e===e);if(its.length<2)continue;
  its.slice(1).reverse().forEach(it=>{let l;if(it.cn){l=it.cn.l;s.cp[b.k]=Math.max(0,(s.cp[b.k]||0)-1)}else{l=Math.max(0,(s[b.k]||1)-1);s[b.k]=Math.max(0,(s[b.k]||0)-1)}
   const c=b.c(l);rf.w+=c.w;rf.s+=c.s;rf.g+=c.g;gone.add(it.i);nm.push(b.n)})}
 if(!gone.size)return;
 s.pl=s.pl.filter(it=>!gone.has(it.i));
 const map={};s.pl.map(it=>it.i).sort((a,b)=>a-b).forEach((o,r)=>{map[o]=r});s.pl.forEach(it=>{it.i=map[it.i]});
 const f=b=>gone.has(b)?null:map[b];
 s.hero.forEach(h=>{if(h.st!=='town')return;h.vk=null;h.vw=null;
  h.tl=(h.tl||[]).map(x=>Object.assign({},x,{b:f(x.b)})).filter(x=>x.b!=null);
  if(h.tk&&h.tk.b!=null){const nb=f(h.tk.b);if(nb==null){h.tk=null;h.sub='home'}else{h.tk.b=nb;const it=itB(nb);if(it&&(h.sub==='do'||h.sub==='wait')){const p=door(it);h.x=p.x;h.y=p.y}}}});
 s.w+=rf.w;s.s+=rf.s;s.g+=rf.g;
 (s.logs=s.logs||[]).unshift({t:'Doublon(s) supprimé(s) ('+nm.join(', ')+') : '+rf.g+' or, '+rf.w+' bois, '+rf.s+' pierre remboursés.',c:'ok',ts:'[J'+s.day+']'})}
function loadG(){try{const j=localStorage.getItem(SK);if(!j)return;const s=JSON.parse(j);ZSON=false;s.used=s.used||[];s.hero.forEach(h=>s.used.push(h.name));Object.values(s.npc||{}).forEach(x=>s.used.push(x.n));let k=0;s.pl.forEach(it=>{if(it.h)it.h=s.hs[k++]});s.alert=null;s.speed=1;s.cp=s.cp||{};s.chest=s.chest||[];s.armory=s.armory||0;s.guilds=s.guilds||[];s.guildh=s.guildh||0;s.ench=s.ench||0;if(!s.mv)mig(s);if(s.mv<3)mig3(s);const m4=s.mv<5;if(s.mv<5)migMap(s);s.mv=5;s.vn=s.vn||'Vigie';(s.lb||[]).forEach(lbAdd);s.lb=[];save();s.zv=s.zv||[1,1,1,1,1,1];s.zp=s.zp||BASEPOS.map(q=>q.slice());if(!s.npc.V){s.npc.V={n:rn([],s),lv:1,xp:0};s.pl.push({e:NE.V,i:s.pl.length})}s.pl.forEach(it=>{if(it.e==='♨️')it.e=NE.S});{const v=s.pl.find(it=>it.e===NE.V),a=s.pl.find(it=>it.i===0);if(v&&a&&a!==v){a.i=v.i;v.i=0}}S=s;if(s.tp&&s.bp){T.x=s.tp[0];T.y=s.tp[1];BZ.x=s.bp[0];BZ.y=s.bp[1]}else{T.x=T0.x;T.y=T0.y;BZ.x=BZ0.x;BZ.y=BZ0.y}mg(s);mig5(s);mig6(s);(s.hs||[]).forEach(x=>{if(!x.dn)x.p=50});if(s.stable>0&&s.npc.E)restock();buildZ();logs=(s.logs||[]).slice(0,20);s.hero.forEach(h=>{h.home=s.hs.find(x=>x.o===h.id)||null;h.hs=s.horses.find(x=>x.o===h.id)||null;h.z=h.z?ZA.find(x=>x.n===h.z.n)||null:null;h.last=h.last?ZA.find(x=>x.n===h.last.n)||null:null;h.vk=null;h.kills=h.kills||0;h.earned=h.earned||0;if(!h.pt&&h.z)h.pt={x:h.z.x,y:h.z.y};h.tl=(h.tl||[]).filter(x=>x.k!=='heal'&&x.k!=='tavern');h.buff=0;if(h.tk&&(h.tk.k==='heal'||h.tk.k==='tavern')){h.tk=null;if(h.st==='town')h.sub='home'}if(h.st==='town'&&h.tk&&h.tk.k==='build'&&!(s.pl.find(x=>x.i===h.tk.b)||{}).cn){h.tk=null;h.vk=null;h.sub='home'}if(h.st==='rest'){const b=base(h);h.x=b.x;h.y=b.y}if(h.st==='back'&&h.dec===undefined)goBack(h)});if(m4)s.hero.forEach(repath)}catch(e){}}
let wl=null;
async function wake(){try{if(wl)return;wl=await navigator.wakeLock.request('screen');wl.addEventListener('release',()=>{wl=null})}catch(e){}}
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')wake()});
let logs=[];
const $=id=>document.getElementById(id);
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
