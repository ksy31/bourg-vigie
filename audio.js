const MU={mute:(()=>{try{return localStorage.getItem('bvm')==='1'}catch(e){return false}})()};
const MA=[[12,null,10,12,14,null,12,null],[10,null,7,10,12,null,10,null],[8,null,12,null,10,8,null,7],[7,null,10,12,10,null,7,null],[12,null,14,15,14,null,12,null],[10,null,12,null,14,12,10,null],[14,null,12,null,10,7,null,null],[12,null,null,null,7,null,null,null]];
const MB=[[14,null,12,14,15,null,17,null],[14,null,12,10,12,null,14,null],[12,null,15,null,14,12,null,10],[10,null,12,14,12,null,10,null],[15,null,14,12,14,null,15,null],[14,null,12,null,10,12,14,null],[12,null,10,null,7,10,12,null],[12,null,7,null,0,null,null,null]];
const MR=[-12,-14,-16,-14,-12,-19,-17,-12];
function musicStart(){
 if(MU.ctx||MU.mute)return;
 try{
  const C=new (window.AudioContext||window.webkitAudioContext)(),bus=C.createGain(),d=C.createDelay(1),fb=C.createGain(),wet=C.createGain();
  bus.gain.value=.2;d.delayTime.value=.34;fb.gain.value=.3;wet.gain.value=.3;
  bus.connect(C.destination);bus.connect(d);d.connect(fb);fb.connect(d);d.connect(wet);wet.connect(C.destination);
  const nf=s=>293.66*Math.pow(2,s/12),go=(a,t,dd)=>a.forEach(x=>{x.start(t);x.stop(t+dd+.1)});
  const env=(e,t,a,dd,v)=>{e.gain.setValueAtTime(.0001,t);e.gain.linearRampToValueAtTime(v,t+a);e.gain.setValueAtTime(v,t+Math.max(a,dd-.15));e.gain.exponentialRampToValueAtTime(.0001,t+dd)};
  const pluck=(s,t,dur,g)=>{const f=nf(s),o=C.createOscillator(),o2=C.createOscillator(),g2=C.createGain(),e=C.createGain(),lp=C.createBiquadFilter();o.type='triangle';o2.type='sine';o.frequency.value=f;o2.frequency.value=f*2;g2.gain.value=.3;lp.type='lowpass';lp.frequency.value=Math.min(4000,f*5);e.gain.setValueAtTime(.0001,t);e.gain.linearRampToValueAtTime(g,t+.01);e.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(lp);o2.connect(g2);g2.connect(lp);lp.connect(e);e.connect(bus);go([o,o2],t,dur)};
  const nb=C.createBuffer(1,C.sampleRate,C.sampleRate),nd=nb.getChannelData(0);for(let i=0;i<nd.length;i++)nd[i]=Math.random()*2-1;
  const breath=(f,t)=>{const q=C.createBufferSource(),b=C.createBiquadFilter(),e=C.createGain();q.buffer=nb;b.type='bandpass';b.frequency.value=Math.min(6000,f*2);b.Q.value=1.2;q.connect(b);b.connect(e);e.connect(bus);e.gain.setValueAtTime(.0001,t);e.gain.linearRampToValueAtTime(.05,t+.04);e.gain.exponentialRampToValueAtTime(.0001,t+.2);q.start(t);q.stop(t+.25)};
  const flute=(s,t,dd)=>{const f=nf(s),o=C.createOscillator(),o2=C.createOscillator(),l=C.createOscillator(),lg=C.createGain(),g2=C.createGain(),e=C.createGain(),lp=C.createBiquadFilter();o.type='sine';o2.type='triangle';o.frequency.value=f;o2.frequency.value=f*2;g2.gain.value=.06;l.frequency.value=5.2;lg.gain.value=f*.005;l.connect(lg);lg.connect(o.frequency);lp.type='lowpass';lp.frequency.value=3200;o.connect(lp);o2.connect(g2);g2.connect(lp);lp.connect(e);e.connect(bus);env(e,t,.07,dd,.42);go([o,o2,l],t,dd);breath(f,t)};
  const violin=(s,t,dd)=>{const f=nf(s),o=C.createOscillator(),o2=C.createOscillator(),l=C.createOscillator(),lg=C.createGain(),e=C.createGain(),lp=C.createBiquadFilter();o.type='sawtooth';o2.type='sawtooth';o.frequency.value=f;o2.frequency.value=f*1.005;lp.type='lowpass';lp.frequency.value=Math.min(3400,f*4.5);lp.Q.value=.8;l.frequency.value=5.6;lg.gain.setValueAtTime(0,t);lg.gain.linearRampToValueAtTime(f*.009,t+.35);l.connect(lg);lg.connect(o.frequency);lg.connect(o2.frequency);o.connect(lp);o2.connect(lp);lp.connect(e);e.connect(bus);env(e,t,.12,dd,.14);go([o,o2,l],t,dd)};
  const pad=(s,t,dd,v)=>{const f=nf(s),o=C.createOscillator(),o2=C.createOscillator(),e=C.createGain(),lp=C.createBiquadFilter();o.type='sawtooth';o2.type='sawtooth';o.frequency.value=f;o2.frequency.value=f*1.003;lp.type='lowpass';lp.frequency.value=650;o.connect(lp);o2.connect(lp);lp.connect(e);e.connect(bus);env(e,t,.6,dd,v);go([o,o2],t,dd)};
  const N=null,X='r';
  const trk=(k,st,fn,L,Ch)=>({st,bar:(bi,t)=>{
   const m=L[bi],c=Ch[bi];
   for(let e=0;e<8;e++){const s=m[e];if(s==null||s===X)continue;let j=e+1;while(j<8&&m[j]==null)j++;fn(s+k,t+e*st,(j-e)*st+.05)}
   pluck(c[0]-12+k,t,1.8,.4);pluck(c[0]-5+k,t+4*st,1.5,.28);
   const a=[c[0],c[2],c[1]+12,c[0]+12],P=[0,1,2,3,2,1,2,1];for(let e=0;e<8;e++)pluck(a[P[e]]+k,t+e*st,1.1,.15);
   c.forEach(x=>pad(x+k,t,8*st,.05))}});
  const F=[0,4,7],Dm=[-3,0,4],Bb=[-7,-3,0],Cc=[-5,-1,2],Am=[-8,-5,-1];
  const fl=trk(3,.52,flute,[
   [12,N,16,N,19,N,16,N],[16,N,14,N,12,N,9,N],[17,N,14,N,12,N,14,N],[19,N,16,N,14,N,11,N],[12,N,16,N,21,N,19,N],[19,N,16,N,12,N,16,N],[17,N,21,N,19,N,17,N],[19,N,16,N,14,N,X,N],
   [16,N,17,19,21,N,19,N],[21,N,19,17,16,N,12,N],[12,14,16,N,19,N,16,N],[14,N,16,14,12,N,11,N],[9,N,12,16,17,N,16,N],[14,N,17,N,21,N,19,N],[19,N,16,N,14,N,11,N],[12,N,N,N,N,N,X,N]],
   [F,Dm,Bb,Cc,F,Am,Bb,Cc,Dm,Bb,F,Cc,Dm,Bb,Cc,F]);
  const A=[0,3,7],Fv=[-4,0,3],Cv=[3,7,10],G=[-2,2,5],D=[-7,-4,0],E=[-5,-1,2];
  const vi=trk(-5,.48,violin,[
   [12,N,N,N,15,N,19,N],[20,N,N,N,19,N,17,N],[22,N,N,N,19,N,15,N],[14,N,17,N,22,N,17,N],[19,N,N,N,24,N,22,N],[17,N,20,N,24,N,20,N],[23,N,26,N,23,N,19,N],[24,N,N,N,19,N,X,N],
   [19,N,24,N,22,19,17,N],[22,N,17,N,14,N,17,N],[20,N,24,N,20,N,17,N],[19,N,23,N,26,N,23,N],[24,N,19,N,15,N,19,N],[24,N,20,N,17,N,20,N],[23,N,19,N,23,N,26,N],[24,N,N,N,N,N,N,N]],
   [A,Fv,Cv,G,A,D,E,A,A,G,Fv,E,A,D,E,A]);
  const lu={st:.4545,bar:(bi,t)=>{const m=(bi<8?MA:MB)[bi%8];for(let e=0;e<8;e++){if(m[e]!=null)pluck(m[e],t+e*.4545,1.3,.5);if(e===0)pluck(MR[bi%8],t,1.8,.45);if(e===4)pluck(MR[bi%8]+7,t+e*.4545,1.5,.3)}}};
  const TK=[lu,fl,vi];
  MU.ctx=C;MU.t=C.currentTime+.3;MU.t0=MU.t;MU.bi=0;MU.k=-1;
  MU.timer=setInterval(()=>{while(MU.t<C.currentTime+1.2){const k=Math.floor((MU.t-MU.t0)/600)%3;if(k!==MU.k){MU.k=k;MU.bi=0}const q=TK[k];q.bar(MU.bi%16,MU.t);MU.bi++;MU.t+=8*q.st}},250);
  C.resume()
 }catch(e){MU.ctx=null}
}
const muL=()=>{$('mu').textContent=MU.mute?'🔇':'🔊'};
function musicToggle(){MU.mute=!MU.mute;try{localStorage.setItem('bvm',MU.mute?'1':'0')}catch(e){}muL();if(MU.mute){if(MU.ctx)MU.ctx.suspend()}else if(MU.ctx)MU.ctx.resume();else musicStart()}
muL();$('mu').onclick=musicToggle;
document.addEventListener('pointerup',musicStart);
document.addEventListener('visibilitychange',()=>{if(!MU.ctx)return;if(document.hidden||MU.mute)MU.ctx.suspend();else MU.ctx.resume()});
