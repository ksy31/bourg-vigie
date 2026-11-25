// v3.9.2 : enregistrement des classes. Une classe hérite de l'équipement (armes, armure, bottes, bouclier) d'une classe de base (d.b).
// d.own = {spr,fx,atk} : parties visuelles propres à la classe (sprite, effets de sorts, attaques) ; sinon la classe de base est utilisée.
const CLC={},CLO={spr:new Set(),fx:new Set(),atk:new Set()};
function regClass(k,d){CL[k]={n:d.n,p:d.p,die:d.die,g:d.g||1,r:d.r||1,cost:d.cost,t:d.t};CI[k]=d.ci;SPD[k]=d.sp;CLB[k]=d.b;SL[k]=SL[d.b];PN.w[k]=PN.w[d.b];IC.w[k]=IC.w[d.b];if(d.col)CLC[k]=d.col;for(const q in(d.own||{}))CLO[q].add(k)}
// v3.9.4 : Paladin (équipement du Guerrier)
regClass('Pa',{n:'Paladin',p:1.05,die:.30,cost:28,t:'Le plus résistant.',ci:'✚',b:'G',col:[255,236,170],own:{spr:1,fx:1,atk:1},sp:[['Lumière sacrée',{w:.03},'+3 % de puissance'],['Bénédiction',{d:.125},'−12,5 % de risque de mort'],['Châtiment',{w:.06},'+6 % de puissance'],['Imposition des mains',{d:.2,f:.2},'−20 % de risque de mort, 20 % des fuites deviennent des victoires'],['Jugement dernier',{w:.1,d:.15},'+10 % de puissance, −15 % de risque de mort']]});
// v3.9.5 : Assassin (équipement du Voleur)
regClass('As',{n:'Assassin',p:1.2,die:.75,g:1.15,cost:30,t:'Rapide et mortel, rapporte 15 % d’or en plus.',ci:'✦',b:'V',col:[130,235,130],own:{spr:1,fx:1,atk:1},sp:[['Lame empoisonnée',{w:.03},'+3 % de puissance'],['Pas de l’ombre',{d:.125},'−12,5 % de risque de mort'],['Coup dans le dos',{w:.06},'+6 % de puissance'],['Marque de mort',{g:.125},'+12,5 % d’or'],['Danse des lames',{w:.1,d:.15},'+10 % de puissance, −15 % de risque de mort']]});
