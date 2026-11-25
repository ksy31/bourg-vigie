// v3.9.2 : enregistrement des classes. Une classe hérite de l'équipement (armes, armure, bottes, bouclier) d'une classe de base (d.b).
// d.own = {spr,fx,atk} : parties visuelles propres à la classe (sprite, effets de sorts, attaques) ; sinon la classe de base est utilisée.
const CLC={},CLO={spr:new Set(),fx:new Set(),atk:new Set()};
function regClass(k,d){CL[k]={n:d.n,p:d.p,die:d.die,g:d.g||1,r:d.r||1,cost:d.cost,t:d.t};CI[k]=d.ci;SPD[k]=d.sp;CLB[k]=d.b;SL[k]=SL[d.b];PN.w[k]=PN.w[d.b];IC.w[k]=IC.w[d.b];if(d.col)CLC[k]=d.col;for(const q in(d.own||{}))CLO[q].add(k)}
