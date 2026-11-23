# Notes de passation : refonte 3D (WebGL) de Bourg-Vigie

État au 23/11/2026 : version livrée **v3.3.8 « Lisibilité du village & Combats visibles »** (cache `bv-v62`). Prochain point du Backlog : guide APK (PWABuilder). Le mode **2D est le mode par défaut** (la 3D s'active avec 🧊 / 🖼️ dans les Options, clé `bvr`='3').

## Où est quoi
- `gl.js` : tout le moteur 3D (`GLX`). Aventuriers, terrain, `buildWorld` (forêts, bordure de carte, torches hors village), village (`buildVillageMesh`, puits `wellV`, enceinte `wallV`, torches `torches`, lampadaires `lamp`/`perimLamps`), PNJ, monstres, météo 3D (`wxUpd`), lucioles (`ffUpd`), fumée (`smUpd`), lueur du volcan (`vgUpd`), lave émissive du sol (`paintLava`), post-traitement (`ppRender`), qualité (`qload`, `applyQ`, `qAuto`), éclairage de la démo (`PL` palette par heure, `palAt`, `updLight`, ciel `skyInit`), calque 2D (noms, panneaux, compteur fps).
- Ajouts 3.3.6 dans `gl.js` : `paveVillage` (place et allées pavées peintes dans le sol, appelée par `paintGround`), `outTorchPts` (positions des torches hors village, graine fixe 4242) et points lumineux `WPT` (un seul objet `Points`, animé par `torchUpd`), rond de transparence (`holeUpd` + `MV.onBeforeCompile` : tramage écran sur les arbres et rochers devant les aventuriers, 8 aventuriers max), sac à dos `o.lt` (groupe + halo, affiché si `h.loot` en état back/town), étiquette « en repos » dans `overlay` (utilise `fol` de map.js).
- 3.3.7 : étoiles de bénédiction 3D (`o.bs`, texture `starTex`), taches de lumière au sol des torches hors village (`WGM`/`WGD`), bouton `#slp` avec `z-index:3` (le canvas `cv` a `z-index:1` dès que la 3D est initialisée), fonds/nuit 2D en `W*(MS+4)` (le monde fait MS×W, ZMIN=1/MS).
- 3.3.8 : icônes de toit 3D (`RQ` rempli par `building`, `roofIcons`/`roofTex` : plan collé sur la pente sud du toit, incrustation claire + ombre) et 2D (`engr` dans `bld`) ; monstres 3D pour tous les combats (`updMon`) ; marteau des PNJ en travaux (`arms[1].hg`, `npcAct(k)===2`) ; lampadaire de bâtiment à gauche (`lamp(W,x-w/2-1.1,…)`).
- `state.js` : `ZR['Forêt']` = [0,1.7,22,8.5] (forêt agrandie en 3.3.5 ; rayon = ZR[2]×ZS+4).
- `three.min.js`, `map.js` (2D en repli ; garde `vnet/drawNet`). Ordre des scripts : data, state, village, save, combat, ui, three.min, map, monsters, gl, audio, dev, main.
- Options : 🧊/🖼️ (`r3`), ⚙️ Qualité (`qb`, clé `bvq`). Menu Développeur : « Compteur fps (3D) » (`dfps`).

## Démo de référence
- Artifact slug 1201b3bd-c0a6-4422-9b7b-ec4002360b39 (≈ 4379 lignes, surtout Three.js minifié ; le code de la scène est dans les ~100 dernières lignes). Lecture : `read_artifact` avec offset/limit sauvegarde le résultat dans un fichier JSON ; en extraire le texte avec Python puis `grep`.
- Reprise en 3.3.5 : palette jour/nuit (ciel, hémisphère, exposition, étalonnage), soleil chaud (3,1 → réglé à 2,2 chez nous), lumière d'appoint, lune, ciel (disque, étoiles), lave par veines de bruit dans une texture émissive, lampadaires avec halo et tache au sol, cône de volcan raide (36 de haut), forêt dense.

## Décisions de conception
- Qualité : Haute = ombres 2048, post-traitement (flou tilt-shift, éclat, étalonnage, vignettage), particules pleines ; Moyenne = ombres 1024, sans post ; Basse = sans ombres. Auto : part en Haute, baisse si <28 fps à résolution minimale.
- Lampadaires : seulement sur le contour du village et à l'entrée des bâtiments, jamais sur les chemins du village.
- Chemins du village (3.3.6) : place pavée gris (ellipse 13×9) au centre, allées pavées de chaque porte (côté +z du bâtiment) et de chaque entrée de route vers la place, avec contournement des bâtiments. Les routes extérieures en terre (ruban 3D) commencent à la limite du village et se raccordent.
- Torches hors village (3.3.6) : ~tous les 60 unités le long des routes (côtés alternés), 4–5 par zone (4 au volcan) ; les arbres évitent ces positions. Halos regroupés dans un seul `Points`.
- Rond de transparence (3.3.6) : rayon 6,5 unités (8,5 en combat), proportionnel au zoom ; ignore les aventuriers au village ou en repos ; les ombres des arbres restent.
- Carte : bande de forêt dense tout autour (inside 46 unités + 420 arbres dehors), sol extérieur étendu (plan 9000) fondu avec le bord du terrain.
- Contrôles : 1 doigt glisser ; 2 doigts zoom, rotation après ~30° de torsion (seuil `.52` rad dans `G3.rg`) ; double tap recentre.
- Carte : `MS=6`, `ZS=5`. Migration `migMap`, version de sauvegarde 5. Parties existantes : positions de zones inchangées (la forêt agrandie peut déborder un peu sur une zone voisine).

## Pièges techniques
- Tout élément posé au-dessus de la carte doit avoir un `z-index` > 1 (le canvas 2D `cv` est au-dessus de tout ce qui n'en a pas, même après retour en 2D).
- Scripts classiques, `gl.js` en IIFE (`dk` du jeu déjà pris → `dkc`). Le canvas 3D est `position:absolute` : `cv` doit rester `position:relative; z-index:1`.
- `three.min.js` : esbuild (`export * from 'three'; export {mergeGeometries} ...`, `--format=iife --global-name=THREE`).
- Post-traitement : cible demi-flottante (`EXT_color_buffer_float` ou `half_float` requis, sinon rendu direct) ; `ren.info.autoReset=false` + `reset()` à chaque image. Le ciel et le post utilisent `#include <tonemapping_fragment>` / `<colorspace_fragment>`.
- Matériau des arbres `MV` partagé (arbres, rochers) : sa modification `onBeforeCompile` porte le rond de transparence.
- Tests : Chrome sans écran (swiftshader), `?dbg=1`. Un aventurier forcé en état `back` sans route donne des positions NaN (caméra vide) : forcer `fight` avec `h.z`, `h.x`, `h.y`. Les fps ne sont mesurables que sur le Z Fold 3 (compteur dans le menu Développeur). Charge relevée : village + forêts ≈ 250–530 k triangles selon le zoom (≈ 425 k au zoom maximal).
- Réponses courtes, en français, rien d'inventé. Livraison : zip avec seulement les fichiers modifiés + index.html, sw.js, patchnote.md, Backlog.md (+ notes-3d.md). Pas de lien de test.
