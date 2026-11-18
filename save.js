const SK='bvs';
function saveG(m){try{S.sat=Date.now();S.logs=logs.slice(0,20);localStorage.setItem(SK,JSON.stringify(S));if(m===true)toast('Sauvegarde réussie ✓')}catch(e){if(m===true)toast('Échec de la sauvegarde')}}
function toast(t){const e=$('toast');e.textContent=t;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('on'),2200)}
function mig(s){const M=3;if(s.zp)s.zp=s.zp.map(p=>[p[0]*M,p[1]*M]);(s.marks||[]).forEach(m=>{m.x*=M;m.y*=M});
 (s.hero||[]).forEach(h=>{if(h.st==='town'||h.st==='rest'){h.x+=T.x-50;h.y+=T.y-102}else{h.x*=M;h.y*=M;if(h.pt){h.pt.x*=M;h.pt.y*=M}if(h.v)h.v*=M}});s.mv=2}
function mig3(s){const f=2.5/3,o={x:150,y:306};if(s.zp)s.zp=s.zp.map(p=>[p[0]*f,p[1]*f]);(s.marks||[]).forEach(m=>{m.x*=f;m.y*=f});
 (s.hero||[]).forEach(h=>{if(h.st==='town'||h.st==='rest'){h.x+=T.x-o.x;h.y+=T.y-o.y}else{h.x*=f;h.y*=f;if(h.pt){h.pt.x*=f;h.pt.y*=f}if(h.v)h.v*=f;h.wp=[];h.gw=[]}});s.mv=3}
function loadG(){try{const j=localStorage.getItem(SK);if(!j)return;const s=JSON.parse(j);s.used=s.used||[];s.hero.forEach(h=>s.used.push(h.name));Object.values(s.npc||{}).forEach(x=>s.used.push(x.n));let k=0;s.pl.forEach(it=>{if(it.h)it.h=s.hs[k++]});s.alert=null;s.speed=1;if(!s.mv)mig(s);if(s.mv<3)mig3(s);s.vn=s.vn||'Vigie';(s.lb||[]).forEach(lbAdd);s.lb=[];save();s.zv=s.zv||[1,1,1,1,1,1];s.zp=s.zp||BASEPOS.map(q=>q.slice());if(!s.npc.V){s.npc.V={n:rn([],s),lv:1,xp:0};s.pl.push({e:NE.V,i:s.pl.length})}s.pl.forEach(it=>{if(it.e==='♨️')it.e=NE.S});{const v=s.pl.find(it=>it.e===NE.V),a=s.pl.find(it=>it.i===0);if(v&&a&&a!==v){a.i=v.i;v.i=0}}S=s;mg(s);buildZ();logs=(s.logs||[]).slice(0,20);s.hero.forEach(h=>{h.home=s.hs.find(x=>x.o===h.id)||null;h.hs=s.horses.find(x=>x.o===h.id)||null;h.z=h.z?ZA.find(x=>x.n===h.z.n)||null:null;h.last=h.last?ZA.find(x=>x.n===h.last.n)||null:null;h.kills=h.kills||0;h.earned=h.earned||0;if(!h.pt&&h.z)h.pt={x:h.z.x,y:h.z.y};h.tl=(h.tl||[]).filter(x=>x.k!=='heal');if(h.tk&&h.tk.k==='heal'){h.tk=null;if(h.st==='town')h.sub='home'}if(h.st==='rest'){const b=base(h);h.x=b.x;h.y=b.y}if(h.st==='back'&&h.dec===undefined)goBack(h)})}catch(e){}}
let wl=null;
async function wake(){try{if(wl)return;wl=await navigator.wakeLock.request('screen');wl.addEventListener('release',()=>{wl=null})}catch(e){}}
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')wake()});
let logs=[];
const $=id=>document.getElementById(id);
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
