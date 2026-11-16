let last=performance.now(),acc=0;
function loop(now){
 const dt=Math.min(.1,(now-last)/1000);last=now;
 if(S.speed>0){
  const steps=S.speed;
  for(let i=0;i<steps;i++)tick(dt);
 }
 acc+=dt;if(acc>.3){acc=0;ui();if(!S.over&&!S.hero.length&&S.g<rcost())gameOver()}
 draw();requestAnimationFrame(loop);
}
$('bR').onclick=recruit;for(const id in BD)$('b'+id).onclick=()=>build(id);$('bB').onclick=sendBoss;$('pn').onclick=newRun;$('tt').onchange=()=>{showT=$('tt').checked;ui()};
$('sb').onclick=()=>saveG(true);$('rb').onclick=()=>{$('pvt').textContent='Nouvelle partie';$('pg').textContent='La partie en cours sera effacée. Nom du village :';$('pu').innerHTML='';$('pn').textContent='Commencer';$('vn').value=S.vn;$('pc').hidden=false;$('pv').hidden=false};$('pc').onclick=()=>{$('pc').hidden=true;$('pv').hidden=true};
document.querySelectorAll('#nav button').forEach(b=>b.onclick=()=>{document.querySelectorAll('#nav button').forEach(x=>x.classList.toggle('on',x===b));document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('on',t.id===b.dataset.t));if(b.dataset.t==='tv')fit()});
addEventListener('resize',fit);
buildZ();loadG();fit();ui();wake();document.addEventListener('pointerdown',()=>wake());document.addEventListener('touchmove',e=>{if(e.touches.length>1&&!e.target.closest('canvas'))e.preventDefault()},{passive:false});renderLog();if(!S.sat)log('Bienvenue ! Recrute tes premiers aventuriers : ils partiront seuls en quête.');setInterval(saveG,30000);
requestAnimationFrame(loop);
