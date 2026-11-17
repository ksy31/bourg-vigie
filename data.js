const CL={G:{n:'Guerrier',p:1.15,die:.4,g:1,r:1,cost:20,t:'Solide : survit mieux aux défaites.'},V:{n:'Voleur',p:.95,die:.5,g:1.4,r:1,cost:25,t:'Rapporte 40 % d’or en plus.'},M:{n:'Mage',p:1.3,die:.85,g:1,r:1,cost:30,t:'Très puissant, mais fragile.'},R:{n:'Rôdeur',p:1,die:.55,g:1,r:1.5,cost:22,t:'Rapporte 50 % de ressources en plus.'}};
const dz=z=>z.d*(1+Math.min(.75,(S.day-1)*.015));
const NE={A:'🛏️',F:'🔨',T:'🍺',S:'⛪',M:'🏪',E:'🐴',V:'🏛️'};
const NT={A:'Aubergiste',F:'Forgeron',T:'Tavernier',S:'Guérisseur',M:'Marchand',E:'Palefrenier',V:'Maire'};
const CI={G:'■',V:'▲',M:'◆',R:'⬢'};
const lbB=(a,b)=>a.k-b.k||a.g-b.g||a.lv-b.lv||a.d-b.d;
function lbAdd(e){if(!e||e.k==null||!e.eq)return;const j=P.lb.findIndex(x=>x.n===e.n);if(j<0)P.lb.push(e);else if(lbB(e,P.lb[j])>0)P.lb[j]=e;P.lb.sort((a,b)=>lbB(b,a));P.lb=P.lb.slice(0,10)}
const gn=x=>SL[x.c].filter(k=>x.eq[k]).map(k=>`${pn(x,k)} ${x.eq[k]}`).join(', ');
const BZ={n:'Trône du Roi',x:162,y:126,d:0,boss:1,c:'#5c1a1f'};
const ZB=[{n:'Forêt',d:4,c:'#4f7a46'},{n:'Mine',d:8,c:'#7b7f86'},{n:'Montagne',d:11,c:'#8f9bb0'},{n:'Ruines',d:13,c:'#8a6f55'},{n:'Donjon',d:20,c:'#5a3c63'},{n:'Volcan',d:26,c:'#b5452e'}];
const BASEPOS=[[60,228],[240,216],[264,132],[84,120],[210,48],[84,36]];
const ZV=[[['Clairière brumeuse',3,'Renard enragé,Loup,Sanglier','Chouette spectrale,Loup noir,Ombre rôdeuse'],['Forêt profonde',4,'Braconnier,Bandit,Ours','Loup-garou,Dryade corrompue,Ombre sylvestre'],['Bois maudit',5,'Ours brun,Bandit de grand chemin,Esprit des bois','Meute spectrale,Sorcière des bois,Arbre hanté']],
[['Carrière abandonnée',6,'Gobelin,Rat géant,Araignée','Chauve-souris,Gobelin chaman,Ver rampant'],['Mine de fer',8,'Kobold,Araignée géante,Golem de roche','Chauve-souris géante,Ver des profondeurs,Golem noir'],['Mine profonde',10,'Golem de cristal,Troll,Basilic','Spectre de mineur,Troll des ombres,Ver colossal']],
[['Col venteux',13,'Harpie,Bouquetin enragé,Loup des neiges','Aigle nocturne,Banshee,Loup spectral'],['Pic enneigé',16,'Yéti,Harpie des cimes,Griffon','Spectre des neiges,Yéti sombre,Wyverne'],['Cime des géants',20,'Condor monstrueux,Géant des pierres,Chimère des cimes','Ogre lunaire,Wyverne spectrale,Géant des tempêtes']],
[['Ruines oubliées',26,'Squelette,Brigand,Rat spectral','Fantôme,Cultiste,Ombre'],['Cité en ruine',33,'Squelette archer,Spectre,Gargouille','Âme en peine,Prêtre déchu,Armure hantée'],['Cryptes royales',42,'Nécromancien,Gargouille royale,Gardien momifié','Liche mineure,Garde royal hanté,Spectre royal']],
[['Cachots',53,'Geôlier,Orc,Rat-garou','Succube,Spectre de prisonnier,Orc maudit'],['Donjon central',67,'Garde-chiourme,Démon mineur,Dragonnet','Incube,Chevalier maudit,Hydre'],['Citadelle noire',85,'Démon,Wyrm noir,Seigneur liche','Chevalier de la mort,Hydre à sept têtes,Archidémon']],
[['Pentes fumantes',108,'Salamandre,Lézard de feu,Élémentaire de braise','Spectre ardent,Chimère,Salamandre noire'],['Cratère',137,'Salamandre géante,Golem de lave,Élémentaire de feu','Âme de magma,Chimère ardente,Drake nocturne'],['Cœur du volcan',174,'Golem d’obsidienne,Élémentaire de magma,Dragon ancien','Drake infernal,Titan de cendre,Dragon des cendres']]];
let Z=[],ZA=[];
