function dgl(){const d=$('dgl');d.innerHTML=NAMES.map((n,i)=>`<div class="gr"><span>${n.replace(/[<&]/g,'')}</span><select data-i="${i}"><option value="">—</option><option value="M"${NG[n]==='M'?' selected':''}>M</option><option value="F"${NG[n]==='F'?' selected':''}>F</option></select></div>`).join('');d.querySelectorAll('select').forEach(e=>e.onchange=()=>{const n=NAMES[+e.dataset.i];if(e.value)NG[n]=e.value;else delete NG[n];try{localStorage.setItem('bvg',JSON.stringify(NG))}catch(x){}})}
$('dg').onclick=()=>{dgl();$('dn').value=NAMES.join('\n');$('dc').textContent=NAMES.length+' noms';$('dv').hidden=false};$('dcl').onclick=()=>{$('dv').hidden=true};
$('dns').onclick=()=>{NAMES=$('dn').value.split('\n').map(s=>s.trim()).filter((s,i,a)=>s&&a.indexOf(s)===i);try{localStorage.setItem('bvn',JSON.stringify(NAMES))}catch(e){}$('dc').textContent=NAMES.length+' noms';dgl();toast('Liste enregistrée')};
$('dnr').onclick=()=>{NAMES=NAMES0.slice();try{localStorage.removeItem('bvn')}catch(e){}$('dn').value=NAMES.join('\n');$('dc').textContent=NAMES.length+' noms';dgl();toast('Liste par défaut')};
$('dex').onclick=()=>{const c=exportCode();$('dt').value=c;try{navigator.clipboard.writeText(c)}catch(e){}toast('Code exporté')};
$('dim').onclick=()=>{try{importCode($('dt').value);location.reload()}catch(e){toast('Code invalide')}};
$('dlb').onclick=()=>{if(confirm('Effacer le Top 10 ?')){P.lb=[];save();ui();toast('Top 10 réinitialisé')}};
$('dfr').onclick=()=>{if(confirm('Tout effacer : partie, gloire, bonus permanents et Top 10 ?')){try{localStorage.removeItem('bv');localStorage.removeItem(SK)}catch(e){}location.reload()}};
$('dr1').onclick=()=>{S.g+=500;S.w+=500;S.s+=500;ui();toast('+500 or, bois, pierre')};
