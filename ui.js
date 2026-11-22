const setH=(id,s)=>{const e=$(id);if(e._h!==s){e._h=s;e.innerHTML=fmt(s)}};
function ui0(){
 $('g').innerHTML=`<b>${S.g}</b>or`;$('w').innerHTML=`<b>${S.w}</b>bois`;$('s').innerHTML=`<b>${S.s}</b>pierre`;
 $('vt').textContent=S.vn;{const a=S.sat?Math.floor((Date.now()-S.sat)/1000):-1;$('sv').textContent=a<0?'Pas encore sauvegardé':'Dernière sauvegarde : il y a '+(a<60?a+' s':Math.floor(a/60)+' min')}$('day').textContent=`${isNight()?'🌙':'☀️'} Jour ${S.day} · ${hr()}h ${wxIcon()} · ★${P.runs}`;
 $('bR').innerHTML=`Recruter<small>${rcost()} or · classe aléatoire</small>`;$('bR').disabled=S.g<rcost();
 for(const id in BD){const b=BD[id],c=b.c(lvl(b));$('b'+id).innerHTML=`${b.n} niv. ${lvl(b)+1}<small>${b.t} · ${cs(c)}</small>`;$('b'+id).disabled=S.w<c.w||S.s<c.s||S.g<c.g||bBusy(id)}
 
 const bh=bestRest();$('bB').innerHTML=bh?`Défier le Roi Démon<small>${bh.name} y va · ${Math.round(win(bh,bossD())*100)} % de victoire</small>`:`Défier le Roi Démon<small>aucun aventurier disponible</small>`;$('bB').disabled=!bh||S.hero.some(x=>x.z===BZ&&x.st!=='rest');
 setH('lb',P.lb.length?P.lb.map((x,i)=>`<div class="chip">${i+1}. <b>${x.n}</b> ${CI[x.c]} ${CL[x.c].n} niv. ${x.lv}${x.hs?' · 🐎'+x.hs:''}<br><i>⚔ ${x.k} tués · 💰 ${x.g} or gagnés · ${x.d} j · tué par ${x.by}<br>${gn(x)||'sans équip.'}</i></div>`).join(''):'<p>Personne n’est encore mort.</p>');
 const L={rest:'repos',go:'en route',fight:'combat',back:'retour'};
 setH('ros',S.hero.map(h=>`<span class="chip hc" data-h="${h.id}"><b style="color:${h.col}">${CI[h.c]}</b> <b>${h.name}</b> ${CL[h.c].n} niv. ${h.lv} · âge ${S.day-h.bd+1} j<br><i>⚔${h.kills} tués · 💰${h.gold} (${h.earned} gagnés)${h.home?' · 🏠':''}${h.hs?' · 🐎'+h.hs.sp:''} · ${gs(h)||'sans équip.'}${h.buff?' · 🍖':''}${h.bless?' · ✨':''} · ${h.st==='town'?TS(h):L[h.st]}${showT&&h.st!=='rest'&&!(h.st==='town'&&h.sub!=='do')?' '+fm(rem(h)):''}</i></span>`).join('')+Object.entries(S.npc).map(([k,n])=>`<span class="chip npc"><b>${n.n}</b> ${NT[k]} niv. ${n.lv}</span>`).join('')+(S.horses.length?`<span class="chip npc">🐎 À vendre : ${S.horses.filter(x=>x.o==null).map(x=>x.sp+' ('+x.p+' or)').join(' · ')}</span>`:'')+(S.pr&&S.pr.l.length?`<span class="chip npc">🎯 Primes : ${S.pr.l.map(x=>x.n+' ('+x.z+') '+x.g+' or').join(' · ')}</span>`:''));
}
