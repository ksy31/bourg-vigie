const CL={G:{n:'Guerrier',p:1.12,die:.5,g:1,r:1,cost:20,t:'Solide : survit mieux aux défaites.'},V:{n:'Voleur',p:1.05,die:.55,g:1.4,r:1,cost:25,t:'Rapporte 40 % d’or en plus.'},M:{n:'Mage',p:1.15,die:.65,g:1,r:1,cost:30,t:'Très puissant, mais fragile.'},R:{n:'Rôdeur',p:1.05,die:.55,g:1,r:1.5,cost:22,t:'Rapporte 50 % de ressources en plus.'}};
// v3.7.2 : 5 sorts par classe (niveau du sort = niveau du bâtiment d'enchantement). Effets : w puissance, d risque de mort, g or, r ressources, f part des fuites transformée en victoire
const SPD={G:[['Cri de guerre',{w:.03},'+3 % de puissance'],['Peau de pierre',{d:.125},'−12,5 % de risque de mort'],['Frappe sismique',{w:.06},'+6 % de puissance'],['Rempart',{d:.25},'−25 % de risque de mort'],['Fureur du titan',{w:.125},'+12,5 % de puissance']],
 M:[['Éclair',{w:.03},'+3 % de puissance'],['Bouclier arcanique',{d:.125},'−12,5 % de risque de mort'],['Soin',{d:.2,f:.2},'−20 % de risque de mort, 20 % des fuites deviennent des victoires'],['Rayon',{w:.09},'+9 % de puissance'],['Météores',{w:.125,d:.1},'+12,5 % de puissance, −10 % de risque de mort']],
 V:[['Poche percée',{g:.05},'+5 % d’or'],['Esquive',{d:.125},'−12,5 % de risque de mort'],['Coup vicieux',{w:.06},'+6 % de puissance'],['Pillage',{g:.125},'+12,5 % d’or'],['Ombre fatale',{w:.1,d:.15},'+10 % de puissance, −15 % de risque de mort']],
 R:[['Flèche précise',{w:.03},'+3 % de puissance'],['Piste',{r:.075},'+7,5 % de ressources'],['Piège',{w:.06},'+6 % de puissance'],['Camouflage',{d:.2},'−20 % de risque de mort'],['Pluie de flèches',{w:.125},'+12,5 % de puissance']]};
const spn=h=>{const s=h.sp&&(SPD[h.c]||[])[h.sp-1];return s?'« '+s[0]+' » ('+s[2]+')':'sort niv. '+h.sp};
const dz=z=>z.d;
const NE={A:'🛏️',F:'🔨',T:'🍺',S:'⛪',E:'🐴',V:'🏛️',I:'🛡️',C:'⚜️',N:'🔮'};
const NT={A:'Aubergiste',F:'Forgeron',T:'Tavernier',S:'Guérisseur',E:'Palefrenier',V:'Maire',I:'Intendant',C:'Chancelier',N:'Enchanteur'};
const NI='🗝️',NC='📜';
const CI={G:'■',V:'▲',M:'◆',R:'⬢'};
const CLB={},eqb=c=>CLB[c]||c;
const lbB=(a,b)=>a.k-b.k||a.g-b.g||a.lv-b.lv||a.d-b.d;
function vlbAdd(e){if(!e||!e.id)return;const j=P.vlb.findIndex(x=>x.id===e.id);if(j<0)P.vlb.push(e);else P.vlb[j]=e;P.vlb.sort((a,b)=>b.d-a.d||b.k-a.k);P.vlb=P.vlb.slice(0,10)}
function lbAdd(e){if(!e||e.k==null||!e.eq)return;const j=P.lb.findIndex(x=>x.n===e.n);if(j<0)P.lb.push(e);else if(lbB(e,P.lb[j])>0)P.lb[j]=e;P.lb.sort((a,b)=>lbB(b,a));P.lb=P.lb.slice(0,10)}
const gn=x=>SL[x.c].filter(k=>x.eq[k]).map(k=>`${pn(x,k)} ${x.eq[k]}`).join(', ');
const BZ={n:'Trône du Roi',x:324,y:252,d:0,boss:1,c:'#5c1a1f'};
const ZB=[{n:'Forêt',d:4,c:'#4f7a46'},{n:'Mine',d:8,c:'#7b7f86'},{n:'Montagne',d:11,c:'#8f9bb0'},{n:'Ruines',d:13,c:'#8a6f55'},{n:'Donjon',d:20,c:'#5a3c63'},{n:'Volcan',d:26,c:'#b5452e'}];
const BASEPOS=[[120,456],[480,432],[528,264],[168,240],[420,96],[168,72]];
const ZV=[[['Clairière brumeuse',2,'Renard enragé,Loup,Sanglier','Chouette spectrale,Loup noir,Ombre rôdeuse'],['Forêt profonde',3,'Braconnier,Bandit,Ours','Loup-garou,Dryade corrompue,Ombre sylvestre'],['Bois maudit',4,'Ours brun,Bandit de grand chemin,Esprit des bois','Meute spectrale,Sorcière des bois,Arbre hanté']],
[['Carrière abandonnée',6,'Gobelin,Rat géant,Araignée','Chauve-souris,Gobelin chaman,Ver rampant'],['Mine de fer',8,'Kobold,Araignée géante,Golem de roche','Chauve-souris géante,Ver des profondeurs,Golem noir'],['Mine profonde',10,'Golem de cristal,Troll,Basilic','Spectre de mineur,Troll des ombres,Ver colossal']],
[['Col venteux',13,'Harpie,Bouquetin enragé,Loup des neiges','Aigle nocturne,Banshee,Loup spectral'],['Pic enneigé',16,'Yéti,Harpie des cimes,Griffon','Spectre des neiges,Yéti sombre,Wyverne'],['Cime des géants',20,'Condor monstrueux,Géant des pierres,Chimère des cimes','Ogre lunaire,Wyverne spectrale,Géant des tempêtes']],
[['Ruines oubliées',24,'Squelette,Brigand,Rat spectral','Fantôme,Cultiste,Ombre'],['Cité en ruine',30,'Squelette archer,Spectre,Gargouille','Âme en peine,Prêtre déchu,Armure hantée'],['Cryptes royales',38,'Nécromancien,Gargouille royale,Gardien momifié','Liche mineure,Garde royal hanté,Spectre royal']],
[['Cachots',42,'Geôlier,Orc,Rat-garou','Succube,Spectre de prisonnier,Orc maudit'],['Donjon central',52,'Garde-chiourme,Démon mineur,Dragonnet','Incube,Chevalier maudit,Hydre'],['Citadelle noire',65,'Démon,Wyrm noir,Seigneur liche','Chevalier de la mort,Hydre à sept têtes,Archidémon']],
[['Pentes fumantes',68,'Salamandre,Lézard de feu,Élémentaire de braise','Spectre ardent,Chimère,Salamandre noire'],['Cratère',85,'Salamandre géante,Golem de lave,Élémentaire de feu','Âme de magma,Chimère ardente,Drake nocturne'],['Cœur du volcan',105,'Golem d’obsidienne,Élémentaire de magma,Dragon ancien','Drake infernal,Titan de cendre,Dragon des cendres']]];
let Z=[],ZA=[];
// v4.1.5 : nom de sous-zone d'une zone (affichage), couleur du nom de l'aventurier suivi
const zsn=n=>(Z.find(z=>z.n===n)||{}).sn||n,FOLC='#fff0a0';
