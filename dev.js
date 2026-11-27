function dgl(){const d=$('dgl');d.innerHTML=NAMES.map((n,i)=>`<div class="gr"><span>${n.replace(/[<&]/g,'')}</span><select data-i="${i}"><option value="">—</option><option value="♂"${NG[n]==='♂'?' selected':''}>♂</option><option value="♀"${NG[n]==='♀'?' selected':''}>♀</option></select></div>`).join('');d.querySelectorAll('select').forEach(e=>e.onchange=()=>{const n=NAMES[+e.dataset.i];if(e.value)NG[n]=e.value;else delete NG[n];try{localStorage.setItem('bvg',JSON.stringify(NG))}catch(x){}})}
$('dg').onclick=()=>{$('paf').hidden=$('ppe').hidden=true;$('dv').hidden=false};
{for(const [c,n] of [['G','Guerrier'],['V','Voleur'],['M','Mage'],['R','Rôdeur'],['Pa','Paladin'],['As','Assassin'],['Ne','Nécromancien'],['Ch','Chasseur']])
 for(let f=0;f<2;f++){const k=c+f,ok=PG_PRETS.includes(k),l=document.createElement('label'),t=document.createElement('span'),i=document.createElement('input');l.className='gr';t.textContent=n+(f?' ♀':' ♂')+(ok?'':' (pas encore prêt)');if(!ok)t.style.opacity=.45;i.type='checkbox';i.dataset.k=k;i.disabled=!ok;l.append(t,i);$('dpl').append(l)}
const B=()=>[...$('dpl').querySelectorAll('input:not(:disabled)')],sync=()=>B().forEach(c=>c.checked=PG.sel.includes(c.dataset.k));
sync();$('dperso').onclick=()=>{const p=$('ppe');p.hidden=!p.hidden;$('paf').hidden=true;if(!p.hidden)sync()};
$('dpall').onclick=()=>B().forEach(c=>c.checked=true);$('dpno').onclick=()=>B().forEach(c=>c.checked=false);
$('dpok').onclick=()=>{try{saveG();localStorage.setItem('bvperso',JSON.stringify(B().filter(c=>c.checked).map(c=>c.dataset.k)))}catch(e){toast('Réglage non enregistré');return}location.reload()}}
$('baf').onclick=()=>{$('ppe').hidden=true;$('paf').hidden=!$('paf').hidden};
$('bnm').onclick=()=>{const p=$('pnm');p.hidden=!p.hidden;if(!p.hidden){dgl();$('dn').value=NAMES.join('\n');$('dc').textContent=NAMES.length+' noms'}};
$('bcl').onclick=()=>{$('pcl').hidden=!$('pcl').hidden};$('dcl').onclick=()=>{$('dv').hidden=true};
$('dns').onclick=()=>{NAMES=$('dn').value.split('\n').map(s=>s.trim()).filter((s,i,a)=>s&&a.indexOf(s)===i);try{localStorage.setItem('bvn',JSON.stringify(NAMES))}catch(e){}$('dc').textContent=NAMES.length+' noms';dgl();toast('Liste enregistrée')};
$('dnr').onclick=()=>{NAMES=NAMES0.slice();try{localStorage.removeItem('bvn')}catch(e){}$('dn').value=NAMES.join('\n');$('dc').textContent=NAMES.length+' noms';dgl();toast('Liste par défaut')};
$('dex').onclick=()=>{const c=exportCode();$('dt').value=c;try{navigator.clipboard.writeText(c)}catch(e){}toast('Code exporté')};
$('dim').onclick=()=>{try{importCode($('dt').value);location.reload()}catch(e){toast('Code invalide')}};
$('dlb').onclick=()=>{if(confirm('Effacer le Top 10 ?')){P.lb=[];P.vlb=[];P.vc={};save();ui();toast('Top 10 réinitialisé')}};
$('dfr').onclick=()=>{if(confirm('Tout effacer : partie, gloire, bonus permanents et Top 10 ?')){try{localStorage.removeItem('bv');localStorage.removeItem(SK)}catch(e){}location.reload()}};
$('dr1').onclick=()=>{S.g+=500;S.w+=500;S.s+=500;ui();toast('+500 or, bois, pierre')};
{const L=[['b','Bâtiments'],['q','Maison des Guildes'],['l','Lampes et torches'],['d','Détails (toits, accessoires, ombres, fumée)'],['w','Palissade et remparts'],['c','Chantiers'],['p','Puits'],['m','Personnages et monstres']];
for(const [k,n] of L){const l=document.createElement('label'),t=document.createElement('span'),c=document.createElement('input');l.className='gr';t.textContent=n;c.type='checkbox';c.dataset.k=k;l.append(t,c);$('dbb').append(l)}
const B=()=>[...$('dbb').querySelectorAll('input')],sync=()=>{B().forEach(c=>c.checked=!DBG[c.dataset.k]);$('sfc').checked=isSafe3()};
sync();$('dg').addEventListener('click',sync);$('dball').onclick=()=>B().forEach(c=>c.checked=true);$('dbno').onclick=()=>B().forEach(c=>c.checked=false);
$('dbok').onclick=()=>{try{saveG();const o={};B().forEach(c=>{if(!c.checked)o[c.dataset.k]=true});localStorage.setItem('bvdbg',JSON.stringify(o));localStorage.setItem('bvsafe',$('sfc').checked?'1':'0');localStorage.removeItem('bvx')}catch(e){}location.reload()}}
function isSafe3(){try{return localStorage.getItem('bvsafe')==='1'}catch(e){return false}}
