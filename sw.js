const C='bv-v56',F=['./','index.html','style.css','data.js','state.js','village.js','save.js','combat.js','ui.js','three.min.js','map.js','monsters.js','gl.js','audio.js','dev.js','main.js','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>Promise.all(F.map(u=>fetch(u,{cache:'reload'}).then(r=>{if(!r.ok)throw new Error(u);return c.put(u,r)})))))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
e.respondWith(fetch(r,{cache:'no-cache'}).then(n=>{if(n.ok){const c=n.clone();caches.open(C).then(x=>x.put(r,c))}return n}).catch(()=>caches.match(r)))});
