const cof=()=>{const n=(S.chest||[]).length;return ` · 🛡️ Coffre : ${n} pièce${n>1?'s':''}`};
const gtag=h=>{const g=(S.guilds||[]).find(x=>x.id===h.gu);if(!g)return '';const w=h.gp?S.hero.filter(x=>x.gp===h.gp&&x!==h).map(x=>x.name):[];return ` · ${g.e} ${g.n}${h.id===g.o?' 👑':''}${g.sl?' 💤':''}${w.length?' · en groupe avec '+w.join(', '):''}`};
const gcf=()=>{const g=S.guilds||[],z=g.filter(x=>x.sl).length,c=g.reduce((s,x)=>s+(x.f||0),0);return ` · ⚜️ Guildes : ${g.length}/${gmax()}`+(z?` (${z} en sommeil)`:'')+` · 👥 ${gsz()} max · 💰 Caisses : ${c} or`};
// v4.0.4 : icônes bois et pierre maison (les emoji 🪵 et 🪨 manquent sous Windows 10)
const ICO=(()=>{
 const mk=(w,h,f)=>{const g=[];for(let y=0;y<h;y++){g.push([]);for(let x=0;x<w;x++)g[y].push(null)}f(g,(x,y,c)=>{if(x>=0&&y>=0&&x<w&&y<h)g[y][x]=c});
  const o=g.map(r=>r.slice());for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(!g[y][x]){for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const X=x+dx,Y=y+dy;if(X>=0&&Y>=0&&X<w&&Y<h&&g[Y][X]){o[y][x]='#2e1a14';break}}}return o},
  svg=(g)=>{const h=g.length,w=g[0].length;let s='';for(let y=0;y<h;y++){let x=0;while(x<w){const c=g[y][x];if(!c){x++;continue}let n=1;while(x+n<w&&g[y][x+n]===c)n++;s+=`<rect x="${x}" y="${y}" width="${n}" height="1" fill="${c}"/>`;x+=n}}
   return `<svg viewBox="0 0 ${w} ${h}" width="1.15em" height="1.15em" style="vertical-align:-.2em" shape-rendering="crispEdges" aria-hidden="true">${s}</svg>`};
 const wood=mk(14,12,(g,p)=>{for(const y0 of[0,6]){for(let y=y0;y<y0+5;y++)for(let x=0;x<9;x++)p(x+1,y+1,y===y0?'#c98a4c':y===y0+4?'#7a4a22':'#a86a34');
   for(let y=-3;y<=3;y++)for(let x=-3;x<=3;x++){const d=Math.hypot(x/2.2,(y)/2.7);if(d<=1)p(10+x,y0+3+y,d>.62?'#c08a4a':d>.3?'#ecd09a':'#c08a4a')}}}),
  stone=mk(14,12,(g,p)=>{const cx=6.5,cy=6.2;for(let y=0;y<12;y++)for(let x=0;x<14;x++){const d=Math.hypot((x+.5-cx)/6.2,(y+.5-cy)/4.4);if(d<=1){const t=((x-cx)/6+(y-cy)/4.4);p(x,y,t<-.55?'#d4d8e2':t<-.1?'#b4b9c6':t<.5?'#8f94a2':'#686d7c')}}
   for(const[x,y]of[[7,3],[7,4],[8,5],[8,6],[9,7]])p(x,y,'#555a68');for(const[x,y]of[[3,4],[4,3]])p(x,y,'#f0f2f8')});
 return{w:svg(wood),s:svg(stone)}})();
const sI=(id,s)=>{const e=$(id);if(e._i!==s){e._i=s;e.innerHTML=s}},sT=(id,s)=>{const e=$(id);if(e._t!==s){e._t=s;e.textContent=s}};
const setH=(id,s)=>{const e=$(id);if(e._h!==s){e._h=s;e.innerHTML=fmt(s)}};
let lbTab='a';
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('#lbs button');if(b){lbTab=b.dataset.l;ui()}});
const hx_=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function ui0(){
 sI('g',`<b>${S.g}</b>or`);sI('w',`<b>${S.w}</b>bois`);sI('s',`<b>${S.s}</b>pierre`);sI('rl',`💰 ${S.g} · ${ICO.w} ${S.w} · ${ICO.s} ${S.s}`);
 sT('vt',S.vn);{const a=S.sat?Math.floor((Date.now()-S.sat)/1000):-1;sT('sv',a<0?'Pas encore sauvegardé':'Dernière sauvegarde : il y a '+(a<60?a+' s':Math.floor(a/60)+' min'))}sT('day',`${isNight()?'🌙':'☀️'} Jour ${S.day} · ${hr()}h ${wxIcon()} · ★${P.runs}`);
 sI('bR',`Recruter<small>${rcost()} or · classe aléatoire</small>`);$('bR').disabled=S.g<rcost();
 for(const id in BD){const b=BD[id],c=b.c(lvl(b));sI('b'+id,`${b.n} niv. ${lvl(b)+1}<small>${b.t} · ${cs(c)}</small>`);$('b'+id).disabled=S.w<c.w||S.s<c.s||S.g<c.g||bBusy(id)}
 
 const kc=S.hero.find(x=>x.kg),bh=kc||bestChamp();sI('bB',kc?`Défier le Roi Démon<small>${kc.name} se prépare · ${Math.round(win(kc,bossD())*100)} % de victoire</small>`:bh?`Défier le Roi Démon<small>${bh.name} y va · ${Math.round(win(bh,bossD())*100)} % de victoire</small>`:`Défier le Roi Démon<small>aucun aventurier disponible</small>`);$('bB').disabled=!bh||kgBusy();
 $('lb').hidden=lbTab!=='a';$('lbv').hidden=lbTab!=='v';$('lbt').textContent=lbTab==='a'?'Top 10 global (meilleur score par nom)':'Top 10 des villages (jours survécus)';document.querySelectorAll('#lbs button').forEach(b=>b.classList.toggle('on',b.dataset.l===lbTab));
 setH('lbv',P.vlb.length?P.vlb.map((x,i)=>`<div class="chip">${i+1}. <b>${hx_(x.n)}${(x.nn||1)>1||P.vlb.some(y=>y!==x&&y.n===x.n)?' '+(x.nn||1):''}</b> ${x.w?'🏆 victoire':'💀 défaite'} · ${x.d} j<br><i>⚔ ${x.k} tués · 💰 ${x.g} or gagnés · ☠ ${x.m} aventurier${x.m>1?'s':''} mort${x.m>1?'s':''}<br>🏠 ${x.b} bâtiment${x.b>1?'s':''} · niv. max ${x.bl}${x.bh&&CL[x.bh.c]?` · ⭐ ${hx_(x.bh.n)} ${CI[x.bh.c]} ${CL[x.bh.c].n} niv. ${x.bh.lv}`:''}</i></div>`).join(''):'<p>Aucune partie terminée.</p>');
 setH('lb',P.lb.length?P.lb.map((x,i)=>`<div class="chip">${i+1}. <b>${x.n}</b> ${CI[x.c]} ${CL[x.c].n} niv. ${x.lv}${x.hs?' · 🐎'+x.hs:''}<br><i>⚔ ${x.k} tués · 💰 ${x.g} or gagnés · ${x.d} j · tué par ${x.by}<br>${gn(x)||'sans équip.'}</i></div>`).join(''):'<p>Personne n’est encore mort.</p>');
 const L={rest:'repos',go:'en route',wait:'en position',fight:'combat',loot:'récupère le butin',back:'retour'};
 setH('ros',S.hero.map(h=>`<span class="chip hc" data-h="${h.id}"><b style="color:${h.col}">${CI[h.c]}</b> <b>${h.name}</b> ${CL[h.c].n} niv. ${h.lv} · âge ${S.day-h.bd+1} j<br><i>⚔${h.kills} tués · 💰${h.gold} (${h.earned} gagnés)${h.home?' · 🏠':''}${h.gu?gtag(h):''}${h.gem?' · 💎'+h.gem:''}${h.sp?' · ✨ '+spn(h):''}${h.hs?' · 🐎'+h.hs.sp:''} · ${gs(h)||'sans équip.'}${h.kg?' · ⚔️ champion':''}${h.buff?' · 🍖':''}${h.bless?' · ✨':''} · ${h.st==='town'?TS(h):L[h.st]}${showT&&h.st!=='rest'&&!(h.st==='town'&&h.sub!=='do')?' '+fm(rem(h)):''}</i></span>`).join('')+Object.entries(S.npc).map(([k,n])=>`<span class="chip npc">${k==='I'?NI+' ':k==='C'?NC+' ':''}<b>${n.n}</b> ${NT[k]} niv. ${n.lv}${k==='I'?cof():k==='C'?gcf():''}</span>`).join('')+(S.horses.length?`<span class="chip npc">🐎 À vendre : ${S.horses.filter(x=>x.o==null).map(x=>x.sp+' ('+x.p+' or)').join(' · ')}</span>`:'')+(S.pr&&S.pr.l.length?`<span class="chip npc">🎯 Primes : ${S.pr.l.map(x=>x.n+' ('+x.z+') '+x.g+' or').join(' · ')}</span>`:''));
}
