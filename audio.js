const MU={mute:(()=>{try{return localStorage.getItem('bvm')==='1'}catch(e){return false}})()};
MU.am=(()=>{try{return localStorage.getItem('bva')==='1'}catch(e){return false}})();
const MA=[[12,null,10,12,14,null,12,null],[10,null,7,10,12,null,10,null],[8,null,12,null,10,8,null,7],[7,null,10,12,10,null,7,null],[12,null,14,15,14,null,12,null],[10,null,12,null,14,12,10,null],[14,null,12,null,10,7,null,null],[12,null,null,null,7,null,null,null]];
const MB=[[14,null,12,14,15,null,17,null],[14,null,12,10,12,null,14,null],[12,null,15,null,14,12,null,10],[10,null,12,14,12,null,10,null],[15,null,14,12,14,null,15,null],[14,null,12,null,10,12,14,null],[12,null,10,null,7,10,12,null],[12,null,7,null,0,null,null,null]];
const MR=[-12,-14,-16,-14,-12,-19,-17,-12];
function musicStart(){
 if(MU.ctx||(MU.mute&&MU.am))return;
 try{
  const C=new (window.AudioContext||window.webkitAudioContext)(),bus=C.createGain(),d=C.createDelay(1),fb=C.createGain(),wet=C.createGain();
  bus.gain.value=.2;d.delayTime.value=.34;fb.gain.value=.3;wet.gain.value=.3;
  const mg=C.createGain();mg.gain.value=MU.mute?0:1;mg.connect(C.destination);MU.mg=mg;bus.connect(mg);bus.connect(d);d.connect(fb);fb.connect(d);d.connect(wet);wet.connect(mg);
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
   const m=L[bi],c=Ch[bi],lp=Math.floor(MU.bi/16);
   for(let e=0;e<8;e++){const s=m[e];if(s==null||s===X)continue;let j=e+1;while(j<8&&m[j]==null)j++;if(lp%2&&(bi*8+e)%11===3)continue;fn(s+k,t+e*st,(j-e)*st+.05);if(lp%2&&(bi+e)%5===0)pluck(s+k+12,t+e*st+st*.5,.9,.07)}
   pluck(c[0]-12+k,t,1.8,.4);pluck(c[0]-5+k,t+4*st,1.5,.28);
   const a=[c[0],c[2],c[1]+12,c[0]+12],P=lp%2?[0,2,1,3,1,2,3,1]:[0,1,2,3,2,1,2,1];for(let e=0;e<8;e++)pluck(a[P[e]]+k,t+e*st,1.1,.15);
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
  const lu={st:.4545,bar:(bi,t)=>{const lp=Math.floor(MU.bi/16),m=((bi<8)!==(lp%2===1)?MA:MB)[bi%8];for(let e=0;e<8;e++){if(m[e]!=null)pluck(m[e],t+e*.4545,1.3,.5);if(e===0)pluck(MR[bi%8],t,1.8,.45);if(e===4)pluck(MR[bi%8]+7,t+e*.4545,1.5,.3)}}};
  const lcg=sd=>()=>(sd=(sd*1664525+1013904223)>>>0)/4294967296;
  const gen=(k,st,fn,prog,SC,i0,seed,dens,bv)=>{const R=lcg(seed),mel=[];let ix=i0;
   for(let b=0;b<16;b++){const ch=prog[b],row=[];for(let e=0;e<8;e++){if(e%2||(e&&R()>dens)){row.push(null);continue}
    if(e===0){let bd=1e9,bi=ix;SC.forEach((s,i)=>{const ok=ch.some(c=>((s-c)%12+12)%12===0);if(ok&&Math.abs(i-ix)<bd){bd=Math.abs(i-ix);bi=i}});ix=bi}
    else ix=Math.max(0,Math.min(SC.length-1,ix+[-2,-1,-1,0,1,1,2][Math.floor(R()*7)]));
    row.push(SC[ix])}mel.push(row)}
   mel[15]=[SC[i0],null,null,null,null,null,null,null];
   return{st,bar:(bi,t)=>{const m=mel[bi],c=prog[bi],lp=Math.floor(MU.bi/16);
    for(let e=0;e<8;e++){const s=m[e];if(s==null)continue;let j=e+1;while(j<8&&m[j]==null)j++;if(lp%2&&(bi+e)%7===3)continue;fn(s+k,t+e*st,(j-e)*st+.05)}
    pluck(c[0]-12+k,t,2.2,.34);pluck(c[0]-5+k,t+4*st,1.6,.22);
    const a=[c[0],c[1],c[2],c[0]+12,c[2],c[1]],P=lp%2?[0,2,4,3,5,1,2,3]:[0,1,2,3,2,1,3,2];for(let e=0;e<8;e++)pluck(a[P[e]%6]+k+bv,t+e*st,1.2,.11);
    c.forEach(x=>pad(x+k,t,8*st,.05))}}};
  const hD=[0,3,7],hB=[-4,0,3],hG=[-7,-4,0],hA=[-5,-1,2],hF=[-9,-5,-2],hC=[-2,2,5],hE=[1,5,8],hK=[-2,1,5];
  const NM=[0,2,3,5,7,8,10,12,14,15,17,19,20,22,24],NP=[0,1,3,5,7,8,10,12,13,15,17,19,20,22];
  const harp=(s,t,dd)=>pluck(s,t,Math.min(dd,2.2),.42);
  const ha=gen(0,.62,harp,[hD,hB,hF,hC,hD,hB,hG,hA,hD,hG,hB,hF,hG,hB,hA,hD],NM,5,4711,.6,0);
  const my=gen(-12,.6,flute,[hD,hE,hK,hB,hD,hE,hB,hA,hG,hE,hK,hB,hE,hK,hA,hD],NP,6,90210,.45,12);
  const TK=[lu,fl,vi,ha,my];
  // ===== ambiances : pluie, orage, vent, oiseaux, grillons, cloche =====
  const ag=C.createGain();ag.gain.value=MU.am?0:1;ag.connect(C.destination);MU.ag=ag;
  const mkN=(white)=>{const b=C.createBuffer(1,C.sampleRate*2,C.sampleRate),n=b.getChannelData(0);let b0=0,b1=0,b2=0;for(let i=0;i<n.length;i++){const w=Math.random()*2-1;if(white)n[i]=w*.5;else{b0=.99765*b0+w*.099;b1=.963*b1+w*.2965;b2=.57*b2+w*1.0526;n[i]=(b0+b1+b2+w*.1848)*.11}}return b};
  const NB=mkN(false),NW=mkN(true);
  const loopN=(buf,f1,f2)=>{const s=C.createBufferSource();s.buffer=buf;s.loop=true;const hp=C.createBiquadFilter(),lp=C.createBiquadFilter(),g=C.createGain();hp.type='highpass';hp.frequency.value=f1;lp.type='lowpass';lp.frequency.value=f2;g.gain.value=0;s.connect(hp);hp.connect(lp);lp.connect(g);g.connect(ag);s.start();return{g,hp,lp}};
  const rainA=loopN(NB,500,6500),rainB=loopN(NW,3000,9000),windN=loopN(NB,100,800);
  const chirp=(t,f0,f1,d,v,p)=>{const o=C.createOscillator(),e=C.createGain(),pn=C.createStereoPanner?C.createStereoPanner():null;o.type='sine';o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(f1,t+d);e.gain.setValueAtTime(.0001,t);e.gain.linearRampToValueAtTime(v,t+d*.2);e.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(e);if(pn){pn.pan.value=p;e.connect(pn);pn.connect(ag)}else e.connect(ag);o.start(t);o.stop(t+d+.05)};
  const bird=()=>{const t=C.currentTime+.05,p=Math.random()*1.6-.8,b=2200+Math.random()*1800,n=2+Math.floor(Math.random()*4);for(let i=0;i<n;i++)chirp(t+i*.11,b*(1+.1*(i%2)),b*(1.25+.1*Math.random()),.09,.03,p)};
  const cricket=()=>{const t=C.currentTime+.05,p=Math.random()*1.6-.8,f=4200+Math.random()*500;for(let i=0;i<3;i++)chirp(t+i*.08,f,f*1.02,.05,.012,p)};
  const thunder=(dl,v)=>{const t=C.currentTime+dl,s=C.createBufferSource(),lp=C.createBiquadFilter(),e=C.createGain();s.buffer=NB;s.loop=true;lp.type='lowpass';lp.frequency.setValueAtTime(420,t);lp.frequency.exponentialRampToValueAtTime(90,t+4);e.gain.setValueAtTime(.0001,t);e.gain.linearRampToValueAtTime(v,t+.25);e.gain.setTargetAtTime(v*.5,t+.3,.6);e.gain.setTargetAtTime(.0001,t+1.5,1.2);s.connect(lp);lp.connect(e);e.connect(ag);s.start(t);s.stop(t+6)};
  window.bvThunder=dl=>{MU.lt=Date.now();if(C.state==='running')thunder(dl,.5)};
  const bell=(t0,v)=>{[[1,1],[2.76,.5],[5.4,.3],[8.93,.15]].forEach(([r,q])=>{const o=C.createOscillator(),e=C.createGain();o.type='sine';o.frequency.value=392*r;e.gain.setValueAtTime(.0001,t0);e.gain.linearRampToValueAtTime(v*q,t0+.01);e.gain.exponentialRampToValueAtTime(.0001,t0+(r<3?5:2.5));o.connect(e);e.connect(ag);o.start(t0);o.stop(t0+5.2)})};
  let lastH=-1,nextT=0;
  MU.at=setInterval(()=>{if(C.state!=='running')return;try{
   const w=wxMix(),vl=w[0],rn=w[1],fg=w[2],th=w[3],h=hr(),night=h>=20.5||h<5,day=h>=6&&h<19,tn=C.currentTime;
   rainA.g.gain.setTargetAtTime(rn*.22,tn,1.5);rainB.g.gain.setTargetAtTime(rn*rn*.1,tn,1.5);
   windN.g.gain.setTargetAtTime((.012+.05*vl+.07*th+.03*fg)*(1+.4*Math.sin(tn*.3)),tn,2);windN.lp.frequency.setTargetAtTime(450+700*(vl+th)+300*Math.random(),tn,2);
   if(th>.3&&Date.now()-(MU.lt||0)>30000&&tn>nextT){thunder(Math.random()*1.5,.5);nextT=tn+10+Math.random()*20}
   if(day&&rn<.1&&th<.1&&fg<.5&&Math.random()<.12)bird();
   if(night&&rn<.1&&th<.1&&Math.random()<.4)cricket();
   const hi=Math.floor(h);if(lastH>=0&&hi!==lastH&&(hi===6||hi===18)){bell(tn+.1,.05);bell(tn+3.3,.045)}lastH=hi}catch(e){}},1000);
  MU.ctx=C;MU.t=C.currentTime+.3;MU.t0=MU.t;MU.bi=0;MU.k=-1;
  MU.timer=setInterval(()=>{while(MU.t<C.currentTime+1.2){if(MU.k<0||MU.t-MU.t0>=420){let n;do{n=Math.floor(Math.random()*TK.length)}while(n===MU.k);MU.k=n;MU.bi=0;MU.t0=MU.t}const q=TK[MU.k];q.bar(MU.bi%16,MU.t);MU.bi++;MU.t+=8*q.st}},250);
  C.resume()
 }catch(e){MU.ctx=null}
}
const muL=()=>{$('mu').textContent=MU.mute?'🔇':'🔊'},amL=()=>{$('am').textContent=MU.am?'🔕':'🌦️'};
function audSync(){if(!MU.ctx){if(!(MU.mute&&MU.am))musicStart();return}const n=MU.ctx.currentTime;MU.mg.gain.setTargetAtTime(MU.mute?0:1,n,.3);MU.ag.gain.setTargetAtTime(MU.am?0:1,n,.3);if(MU.mute&&MU.am)MU.ctx.suspend();else MU.ctx.resume()}
function musicToggle(){MU.mute=!MU.mute;try{localStorage.setItem('bvm',MU.mute?'1':'0')}catch(e){}muL();audSync()}
function ambToggle(){MU.am=!MU.am;try{localStorage.setItem('bva',MU.am?'1':'0')}catch(e){}amL();audSync()}
muL();amL();$('mu').onclick=musicToggle;$('am').onclick=ambToggle;
document.addEventListener('pointerup',musicStart);
document.addEventListener('visibilitychange',()=>{if(!MU.ctx)return;if(document.hidden||(MU.mute&&MU.am))MU.ctx.suspend();else MU.ctx.resume()});
