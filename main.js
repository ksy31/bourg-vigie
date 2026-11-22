let last=performance.now(),acc=0,curTab='tv',SLP=false,slT=0;
function sleepOn(){if(SLP)return;SLP=true;slT=Date.now();$('slt').classList.remove('off');$('sl').hidden=false;clearTimeout(sleepOn.t);sleepOn.t=setTimeout(()=>$('slt').classList.add('off'),3000)}
function sleepOff(){if(!SLP)return;SLP=false;$('sl').hidden=true;ui()}
function loop(now){
 const dt=Math.min(.1,(now-last)/1000);last=now;
 if(S.speed>0){
  const steps=S.speed;
  for(let i=0;i<steps;i++)tick(dt);
 }
 acc+=dt;if(acc>.3){acc=0;if(!SLP)ui();if(!S.over&&!S.hero.length&&S.g<rcost())gameOver()}
 if(!SLP&&curTab==='tv')draw();requestAnimationFrame(loop);
}
thApply();$('thm').onclick=thToggle;$('bR').onclick=recruit;for(const id in BD)$('b'+id).onclick=()=>build(id);$('bB').onclick=sendBoss;$('pn').onclick=newRun;$('tt').onchange=()=>{showT=$('tt').checked;ui()};
$('sb').onclick=()=>saveG(true);$('rb').onclick=()=>{$('pvt').textContent='Nouvelle partie';$('pg').textContent='La partie en cours sera effacée. Nom du village :';$('pu').innerHTML='';$('pn').textContent='Commencer';$('vn').value=S.vn;$('pc').hidden=false;$('pv').hidden=false};$('pc').onclick=()=>{$('pc').hidden=true;$('pv').hidden=true};
document.querySelectorAll('#nav button').forEach(b=>b.onclick=()=>{curTab=b.dataset.t;document.querySelectorAll('#nav button').forEach(x=>x.classList.toggle('on',x===b));document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('on',t.id===b.dataset.t));if(b.dataset.t==='tv')fit()});
function folStep(d){const L=S.hero;if(!L.length)return;let i=L.findIndex(x=>x.id===fol);i=i<0?(d>0?0:L.length-1):(i+d+L.length)%L.length;fol=L[i].id;if(cam.z<1.2)cam.z=1.2}
$('fp').onclick=()=>folStep(-1);$('fn').onclick=()=>folStep(1);
$('ros').onclick=e=>{const c=e.target.closest('[data-h]'),h=c&&S.hero.find(x=>x.id===+c.dataset.h);if(!h)return;document.querySelector('#nav button[data-t="tv"]').click();fol=h.id;if(cam.z<1.2)cam.z=1.2;scrollTo(0,0)};
{let fq=0;const fs=()=>{if(fq)return;fq=requestAnimationFrame(()=>{fq=0;fit()})};addEventListener('resize',fs);addEventListener('orientationchange',fs);if(window.visualViewport)visualViewport.addEventListener('resize',fs)}$('slp').onclick=sleepOn;$('sl').onpointerdown=()=>{if(Date.now()-slT>400)sleepOff()};
buildZ();loadG();fit();ui();wake();document.addEventListener('pointerdown',()=>wake());document.addEventListener('touchmove',e=>{if(e.touches.length>1&&!e.target.closest('canvas'))e.preventDefault()},{passive:false});renderLog();if(!S.sat)log('Bienvenue ! Recrute tes premiers aventuriers : ils partiront seuls en quête.');setInterval(saveG,30000);
requestAnimationFrame(loop);
