# Patchnotes — Bourg-Vigie

## v3.0.9 « Rattrapage du bestiaire »

Version affichée dans les Options : **v3.0.9**

### Ajouté
- **Les 35 monstres restants sont dessinés en combat** (même style et mêmes variantes que 3.0.6 à 3.0.8) :
  - **Ombres et âmes :** Ombre, Ombre rôdeuse, Ombre sylvestre (feuillage) ; Âme en peine (chaîne), Banshee (cheveux, bouche ouverte), Âme de magma.
  - **Spectraux :** Loup, Rat, Meute, Chouette et Wyverne spectraux reprennent le modèle de base, teinté de bleu et semi-transparent (la chouette utilise le modèle d'oiseau).
  - **Garous :** Loup-garou, Rat-garou (plus petit, queue rose).
  - **Yétis :** Yéti, Yéti sombre. **Ailés :** Griffon, Wyverne, Gargouille, Gargouille royale (couronne).
  - **Chimères :** Chimère, des cimes (givre), ardente (souffle de flammes). **Reptiles :** Basilic (crête, regard vert), Hydre (3 têtes), Hydre à sept têtes.
  - **Armures :** Chevalier maudit, Chevalier de la mort (cape), Armure hantée, Garde royal hanté, Gardien momifié (bandelettes).
  - **Mages :** Nécromancien, Prêtre déchu, Sorcière des bois ; **grands :** Ogre lunaire, Titan de cendre (fissures de braise, plus grand).
- **Champion légendaire :** humanoïde en armure toute dorée (plumet, bouclier, épée, aura dorée et étincelles).

### Corrigé
- Aucun correctif dans cette release.

### Modifié
- `monsters.js` uniquement (`mkind` : le filtre « spectral / garou » est remplacé par les vrais modèles ; `monster` : teinte spectrale, tailles et décalage des gros monstres).
- Tous les noms de monstres du jeu ont maintenant un dessin. Gameplay et équilibre inchangés (rendu uniquement). Pas de migration : une sauvegarde 3.0.8 (ou 3.0.7) se charge et se joue (testé avec une sauvegarde 3.0.7).
- Test Node : 20 jours de jeu avec dessin régulier (7 200 images), les 38 cas (tous les noms de zones jour et nuit, Champion, Roi Démon) dessinés un par un, sauvegarde puis rechargement : 0 erreur. Captures de contrôle PC générées pour les 36 nouveaux noms.
- Non vérifié : le rendu et la fluidité sur ton téléphone, l'effet sur la batterie, le rendu de la nuit sur les nouveaux modèles (capture nuit générée mais non relue en détail).
- Cache du service worker passé à `bv-v36`. Version affichée dans les Options : v3.0.9.

## v3.0.8 « Bestiaire illustré (3/3) : Colosses, Dragons & Boss »

Version affichée dans les Options : **v3.0.8**

### Ajouté
- **6 nouveaux modèles dessinés en combat** (même style et mêmes variantes que 3.0.6/3.0.7 : taille et teinte selon la force `e.d`, détails aux seuils, yeux et traits lumineux cyan la nuit) :
  - **Trolls :** Troll (gourdin), Troll des ombres (peau violacée).
  - **Golems et géants :** Golem de roche / de cristal (pointes) / noir / de lave (fissures) / d'obsidienne ; Géant des pierres (rocher), Géant des tempêtes (éclair).
  - **Élémentaires et salamandres :** Salamandre, Salamandre géante, Salamandre noire, Lézard de feu ; Élémentaire de braise / de feu (flammes) / de magma (croûte et lave).
  - **Dragons :** Dragonnet, Wyrm noir (sans ailes), Drake nocturne / infernal, Dragon ancien, Dragon des cendres. Souffle de flammes semi-transparent pour infernal, ancien et cendres.
  - **Démons :** Démon, Démon mineur (petit, trident), Archidémon (grand, quatre cornes), Succube, Incube.
  - **Roi Démon :** modèle unique, nettement plus grand (cornes, couronne, grandes ailes, épée, aura rouge pulsante).

### Corrigé
- Aucun correctif dans cette release.

### Modifié
- `monsters.js` uniquement : `mkind` reconnaît les nouveaux noms ; les gros monstres sont décalés vers la droite pour ne pas recouvrir le héros (`monster`).
- Toujours non dessinés (rattrapage prévu) : Chimère, Griffon, Wyverne, Hydre, Basilic, Titan de cendre, Âme de magma, Chevalier maudit / de la mort, Ogre lunaire, Âme en peine, Banshee, Ombre, Gargouille, Nécromancien, Gardien momifié, noms « spectral » et « -garou », Champion légendaire, etc.
- Gameplay et équilibre inchangés (rendu uniquement). Pas de migration : une sauvegarde 3.0.7 se charge et se joue (testé).
- Test Node : 20 jours de jeu avec dessin régulier (7 200 images), les 36 noms des zones (jour et nuit) plus le Roi Démon dessinés un par un, sauvegarde puis rechargement, chargement d'une sauvegarde 3.0.7 : 0 erreur. Captures de contrôle PC (jour et nuit) vérifiées.
- Non vérifié : le rendu et la fluidité sur ton téléphone, l'effet sur la batterie, et le cadrage du Roi Démon à l'écran (il est grand).
- Cache du service worker passé à `bv-v35`. Version affichée dans les Options : v3.0.8.

## v3.0.7 « Bestiaire illustré (2/3) : Peaux-vertes, Volants & Morts-vivants »

Version affichée dans les Options : **v3.0.7**

### Ajouté
- **5 nouvelles familles de monstres dessinées en combat** (même style et mêmes variantes que la 3.0.6 : taille et teinte selon la force `e.d`, cicatrices, crocs, épaulières ou plastron aux seuils, yeux et traits lumineux la nuit) :
  - **Peaux-vertes :** Gobelin, Gobelin chaman (bâton et coiffe), Kobold (queue, cornes, lance), Orc, Orc maudit (peau bleutée, yeux rouges).
  - **Volants :** Chauve-souris (et géante), Harpie (et des cimes, plumage bleuté), Aigle nocturne, Condor monstrueux. Ils flottent au-dessus du sol avec battement d'ailes et ombre au sol.
  - **Morts-vivants :** Squelette, Squelette archer (arc et flèche), Spectre (teintes ardent / des neiges, couronne pour le royal), Fantôme, Liche mineure, Seigneur liche (cape). Spectres, fantômes et esprits sont semi-transparents.
  - **Plantes et esprits :** Dryade corrompue, Arbre hanté (bras animés, yeux orangés), Esprit des bois.
  - **Ver :** Ver rampant, Ver des profondeurs, Ver colossal (dorsale hérissée selon la force).

### Corrigé
- Aucun correctif dans cette release.

### Modifié
- `monsters.js` uniquement : `mkind` reconnaît les nouveaux noms et le filtre « spectr » devient « spectral » (les « Spectre… » sont dessinés ; Loup spectral, Rat spectral, Chouette spectrale, Meute spectrale, Wyverne spectrale et les « -garou » restent non dessinés).
- Toujours non dessinés (rattrapage prévu à la fin) : Âme en peine, Banshee, Ombre, Gargouille, Griffon, Wyverne, Chimère, Nécromancien, Gardien momifié, etc., Champion légendaire et Roi Démon (3.0.8).
- Gameplay et équilibre inchangés (rendu uniquement). Pas de migration : une sauvegarde 3.0.6 se charge et se joue (testé).
- Test Node : 20 jours de jeu avec dessin régulier des combats (900 images), sauvegarde puis rechargement, chargement d'une sauvegarde 3.0.6 : 0 erreur. Captures de contrôle PC générées (jour et nuit) pour les 25 noms.
- Non vérifié : le rendu et la fluidité sur ton téléphone, l'effet sur la batterie.
- Cache du service worker passé à `bv-v34`. Version affichée dans les Options : v3.0.7.

## v3.0.6 « Bestiaire illustré (1/3) : Faune & Brigands »

Version affichée dans les Options : **v3.0.6**

### Ajouté
- **Monstres dessinés en combat**, à droite du héros (à cheval aussi), face à lui. Le héros se tourne vers eux pendant le combat. Léger balancement, avance et recul au rythme des coups du héros.
- **7 familles dans le style des aventuriers :** quadrupèdes (Loup, Renard, Sanglier, Bouquetin ; Loup noir et Loup des neiges changent de pelage), Ours, Rat géant, Araignée, humanoïdes (Bandit, Brigand, Braconnier avec arc, Geôlier avec trousseau, Cultiste avec bâton, Garde-chiourme casqué).
- **Variantes selon la force du monstre (`e.d`) :** plus il est fort, plus il est grand (environ ×0,85 à ×1,25) et plus sa teinte est sombre ; à partir de certains seuils : cicatrices, épaulières, plastron, crocs, griffes, dorsale hérissée. Teinte et taille légèrement différentes d'un combat à l'autre (calculées sans nouveau champ de sauvegarde).
- **Nuit :** les monstres de nuit ont des yeux et des traits lumineux (cyan), dessinés par-dessus l'obscurité.

### Corrigé
- Aucun correctif dans cette release.

### Modifié
- Non dessinés pour l'instant (inchangés) : tout nom contenant « spectr » ou « garou », Champion légendaire, Roi Démon et les autres créatures (3.0.7 et 3.0.8). Le monstre disparaît dès la fin du combat.
- Nouveau fichier `monsters.js` (chargé après `map.js`) : `mkind` (nom → famille), `monster` (dessin), appelés depuis `draw` dans `map.js`. Le nom du monstre reste affiché sous celui du héros.
- Gameplay et équilibre inchangés (rendu uniquement). Pas de migration : une sauvegarde 3.0.5 se charge et se joue (testé). Test Node : 3 parties de 20 jours avec dessin des combats, sans erreur ; cas nuit + cheval testé.
- Non vérifié : le rendu et la fluidité sur ton téléphone (captures PC seulement), l'effet sur la batterie.
- Cache du service worker passé à `bv-v33` (liste mise à jour avec `monsters.js`). Version affichée dans les Options : v3.0.6.

## v3.0.5 « Correctif cache & mises à jour »

Version affichée dans les Options : **v3.0.5**

### Ajouté
- Aucun ajout de gameplay dans cette release (contient tout le contenu de la v3.0.4).

### Corrigé
- **Version 3.0.4 jamais affichée sur téléphone :** le service worker pouvait stocker d'anciens fichiers (cache HTTP de GitHub Pages) sous le nom `bv-v31`, puis servir ce cache en priorité sans jamais se réinstaller (sw.js identique). Installation désormais forcée sans cache HTTP (`cache:'reload'`), et le jeu est chargé réseau d'abord (le cache ne sert qu'hors ligne). Les prochaines mises à jour s'appliqueront dès le rechargement.

### Modifié
- Cache du service worker passé à `bv-v32` ; le nouveau service worker prend le contrôle immédiatement. Version affichée dans les Options : v3.0.5. Le bestiaire illustré passe en v3.0.6.
- Pas de migration, gameplay inchangé.
- Non vérifié : le comportement réel sur ton téléphone (je n'y ai pas accès).

## v3.0.4 « Notifications, Lumières & Cache final »

Version affichée dans les Options : **v3.0.4**

### Ajouté
- **Résultat des combats :** dans l'encadré en haut à gauche, « vs » devient ⚔️ (« Nom ⚔️ Monstre »). Chaque combat terminé reste 5 s en dessous : vert « ✔ Nom a vaincu Monstre », rouge « 💀 Nom est mort face à Monstre », blanc pour une fuite (ajout de ma part). L'encadré s'adapte à la longueur du texte (5 lignes maximum).
- **Cache des bâtiments du village :** bâtiments, chantiers et accessoires sont dessinés une seule fois puis redessinés seulement quand un bâtiment, son palier, une étape de chantier, une rénovation ou la couleur d'une maison change. Les personnages et PNJ restent animés par-dessus.

### Corrigé
- Aucun correctif dans cette release.

### Modifié
- **Bannière de mort :** affichée 12 s (avant 7 s), texte inchangé.
- **Lumières :** lueur des lampadaires à 60 % de l'ancienne (même rayon) ; lueur des aventuriers la nuit plus forte (90 % au lieu de 55 %), plus large, avec un point central plus gros ; le rond jaune du butin est dessiné après l'obscurité, plus clair, avec une petite lueur (inchangé le jour).
- **Temps de dessin** (test Node, village de 10 bâtiments, 300 images) : 4,9 ms → 3,2 ms par image (environ −35 %). Le sol de la carte et du village était déjà en cache ; il est toujours recalculé à chaque lancement (0,3 à 0,7 s), je ne le garde pas entre deux lancements (trop lourd pour le stockage du navigateur).
- Pas de migration, gameplay inchangé. Une sauvegarde 3.0.3 se charge et se joue (testé).
- Non vérifié : la consommation de batterie et le rendu des lumières sur ton téléphone (le rond jaune du butin est difficile à voir sur ma capture de test).
- Cache du service worker passé à `bv-v31`. Version affichée dans les Options : v3.0.4.

## v3.0.3 « Chantiers & Bâtisseurs »

Version affichée dans les Options : **v3.0.3**

### Ajouté
- **Construction progressive :** chaque nouveau bâtiment (hors Mairie et Auberge de départ) est un chantier de 1 à 2 jours de jeu (durée tirée au hasard). Les ressources sont payées au clic ; les effets (bonus, PNJ, chevaux, maison à vendre) n'arrivent qu'à la fin. Le bâtiment est inutilisable pendant les travaux. Le prix du suivant tient compte des chantiers en cours, et plusieurs chantiers peuvent tourner en parallèle.
- **Bâtisseurs :** un chantier n'avance que si au moins un aventurier est au repos au village (maison ou Auberge). Jusqu'à 3 aventuriers au repos par chantier apparaissent sur place, un marteau à la main ; plus de monde n'accélère pas. Sans personne au repos, le chantier s'arrête.
- **Étapes visuelles :** le bâtiment se monte de bas en haut à 10, 25, 50 et 75 %, avec échafaudage et pile de planches, puis apparaît terminé à 100 %. Un « 🔨 % » à taille fixe s'affiche au-dessus.
- **Rénovation par le PNJ :** quand le PNJ d'un bâtiment passe niveau 3 puis niveau 6 (le moment où l'apparence change, Mairie comprise, pas l'Auberge), tous les bâtiments de ce type sont rénovés pendant 5 à 10 min réelles, gratuitement. Ils sont fermés (échafaudage, PNJ au marteau, « 🔨 % »), gardent l'ancien aspect puis prennent le nouveau. Un aventurier déjà en action finit ; ceux qui marchent ou attendent abandonnent leur tâche ; personne ne choisit ce bâtiment. Mairie fermée : le butin est déposé directement au repos.
- Messages dans la console au début et à la fin d'un chantier ou d'une rénovation.

### Corrigé
- Aucun correctif dans cette release.

### Modifié
- **Construction :** `build()` lance maintenant un chantier ; les effets sont appliqués par `bDone()` (village.js). Constantes : durée `R(900,1800)` dans `build` (combat.js), `BMAX` (bâtisseurs par chantier) et `R(300,600)` (rénovation) dans village.js.
- Les bâtiments déjà construits sont considérés terminés. Une sauvegarde 3.0.2 se charge et se joue (testé) ; nouveau champ `S.cp` (chantiers en cours par type) créé au chargement.
- Testé (Node, 20 jours, 7 bâtiments lancés) : 7 chantiers terminés, 3 rénovations lancées et terminées, rechargement en plein chantier, maisons correctement liées après chargement, chantier à l'arrêt sans aventurier au repos. Capture de contrôle : échafaudages, bâtisseurs et pourcentages.
- Non vérifié : le rendu sur ton téléphone (les emojis 🔨 n'étaient pas affichés dans ma capture de test) et l'équilibre à long terme (les bâtiments arrivent 1 à 2 jours plus tard qu'avant).
- Cache du service worker passé à `bv-v30`. Version affichée dans les Options : v3.0.3.

## v3.0.2 « Rythme des actions & PNJ vivants »

Version affichée dans les Options : **v3.0.2**

### Ajouté
- **Enregistrement à l'Auberge :** un aventurier sans maison passe d'abord 20 à 30 s à l'Auberge (file d'attente comme ailleurs, visible et semi-transparent devant la porte), puis disparaît et commence son repos. Cette durée n'est pas comptée dans le repos. Avec une maison : rien ne change.
- **Animations des PNJ pendant leur action :** Aubergiste (salut du bras), Forgeron (coups de marteau et étincelles), Tavernier (chope levée), Guérisseur (lueur et étincelles autour de la croix), Palefrenier (fourche), Maire (balancement et lueur du médaillon pendant le dépôt du butin). Le Marchand s'anime aussi pendant les dépôts de butin (choix de ma part, à confirmer). Rien ne tourne en Veille (pas de dessin).

### Corrigé
- Aucun correctif dans cette release.

### Modifié
- **Combats plus longs :** 30 à 45 s multipliées par (0,9 + 0,3 × force du monstre), soit environ 34 à 62 s selon le monstre. **Roi Démon : 2 à 3 min** (avant 1 min). Constantes `CB0`, `CB1`, `CBK`, `BT0`, `BT1` dans combat.js.
- **Mairie :** dépôt de butin 30 à 45 s (avant 60 à 90 s), constante `DUR.loot` dans village.js. Auberge : `DUR.inn`.
- **Équilibre** (15 jours, 14 parties, 8 aventuriers renouvelés, ancien → nouveau) : victoires 161 → 184 (environ +14 %), morts 38 → 51, or gagné 940 → 1118 (environ +19 %). La Mairie plus rapide compense plus que les combats longs et l'Auberge ne coûtent. Pour revenir en arrière : remonter `DUR.loot`.
- Pas de migration : une sauvegarde 3.0.1 se charge et se joue (testé). Les combats en cours gardent leur ancienne durée.
- Non vérifié : le rendu des animations sur ton téléphone (aucune capture dédiée, seulement un test de dessin sans erreur).
- Cache du service worker passé à `bv-v29`. Version affichée dans les Options : v3.0.2.

## v3.0.1 « Confort, Suivi & Écran Options »

Version affichée dans les Options : **v3.0.1**

### Ajouté
- **Suivi depuis la liste :** un tap sur un aventurier dans l'onglet Aventuriers ouvre la Carte et le suit (zoom minimum 1,2). Un tap ailleurs arrête le suivi. Pour un aventurier qui se repose à l'Auberge, la caméra se centre sur l'Auberge.

### Corrigé
- **Noms superposés :** étiquettes un peu plus petites (taille toujours fixe à l'écran) et décalées vers le haut quand elles se chevauchent. Le nom du monstre en combat a aussi une taille fixe et passe dans le même système.
- **Liste des aventuriers :** elle n'est plus réécrite à chaque rafraîchissement si rien n'a changé (sinon un tap pouvait être perdu).

### Modifié
- **Écran Options :** la musique est une simple icône 🔊/🔇 en haut (même mémoire `bvm`). Sauvegarder et Nouvelle partie sont en bas, suivis du timer de dernière sauvegarde, puis la roue ⚙️ et le numéro de version en bas à droite, au-dessus de la barre de navigation.
- Pas de migration, gameplay inchangé. Une sauvegarde 3.0.0 se charge et se joue (testé en Node).
- Non vérifié : le placement exact du bas de l'écran Options et le tap sur ton téléphone (la hauteur est calculée avec `100dvh - 200px`, à ajuster dans style.css si ça flotte).
- Cache du service worker passé à `bv-v28`. Version affichée dans les Options : v3.0.1.

## v3.0.0 « Économie d'énergie & Écran noir »

Version affichée dans les Options : **v3.0.0**

### Ajouté
- **Mode Veille (écran noir) :** petite icône 🌑 en haut à droite de la Carte. Elle affiche un voile noir complet ; la simulation continue (sauvegarde auto, musique et écran allumé inclus). Le texte « Touche pour réveiller » s'efface au bout de 3 s. Un tap réveille (ignoré pendant 0,4 s après l'activation).
- **Réveil automatique** à la victoire sur le Roi Démon et au game over (pas pour une simple mort).

### Corrigé
- Aucun correctif dans cette release.

### Modifié
- **Thème sombre AMOLED :** fond noir pur (`#000`), cartes `#0b0f10`, bordures `#2a3236`. Thème clair et carte inchangés.
- **Moins de dessin :** la carte n'est redessinée que sur l'onglet Carte, et plus du tout en Veille. En Veille, l'interface n'est plus rafraîchie non plus ; elle se met à jour au réveil. La simulation, elle, tourne toujours.
- Pas de migration, gameplay et équilibre inchangés (simulation 20 jours : mêmes ordres de grandeur). Une sauvegarde 2.9.9 se charge et se joue (testé).
- Testé (Node) : aucun dessin sur un onglet masqué ni en Veille, simulation qui continue en Veille, réveil à la victoire et au game over.
- Non vérifié : la consommation de batterie réelle, le rendu AMOLED et le tap de réveil sur ton téléphone.
- Cache du service worker passé à `bv-v27`. Version affichée dans les Options : v3.0.0.

## v2.9.9 « Village organique & Évolution visuelle »

Version affichée dans les Options : **v2.9.9**

### Ajouté
- **Chemins internes :** de vrais petits chemins de terre relient la Mairie, chaque bâtiment et chaque route d'entrée du village. Ils contournent les bâtiments et sont recalculés quand on construit.
- **Les aventuriers marchent sur ces chemins** (départ en quête, retour, déplacements entre bâtiments, retour au repos), au lieu de lignes droites.
- **Évolution visuelle selon le niveau du PNJ** (3 paliers : niv. 1-2, 3-5, 6 et plus). Palier 2 : soubassement en pierre et faîtage clair ; Marché : étal garni ; Écurie : botte de foin ; Sanctuaire : croix au sommet du clocher. Palier 3 : en plus, boule dorée sur le toit, lanternes à la porte, jardinières aux fenêtres ; Mairie : horloge ; Marché : fanion doré ; Sanctuaire : croix dorée. L'Auberge et les maisons ne changent pas.
- **Clôtures selon le rang du village :** Hameau (moins de 4 bâtiments) aucune ; Village (moins de 9) barrières en bois ; Bourg (moins de 16) mur de pierre ; Cité muraille haute avec créneaux et tours. Les ouvertures aux routes sont conservées (tours de garde à l'entrée pour la Cité).

### Corrigé
- Aucun correctif dans cette release.

### Modifié
- **Disposition moins régulière :** emplacements écartés de ×1,25 et décalés de façon fixe par bâtiment (environ ±1,2 en largeur, ±1 en hauteur ; la Mairie reste au centre). L'amplitude est limitée pour qu'aucun bâtiment ne se chevauche (vérifié). Le village est donc un peu plus grand.
- **Le puits** évite les chemins.
- **Équilibre** (20 jours, 3 parties, 8 aventuriers renouvelés, ancien → nouveau) : quêtes 212-227 → 196-208 (environ −8 %, trajets internes plus longs), morts 28-38 → 24-42 (inchangé). Le temps de marche dans le village (constante `WALK` dans village.js) est le réglage à ajuster si c'est trop lent.
- Pas de migration de champs ; les trajets en cours se recalculent. Une sauvegarde 2.9.8 se charge et se joue (testé). Les aventuriers en action au village peuvent se replacer légèrement au chargement (les bâtiments ont bougé).
- Non vérifié : le rendu sur ton téléphone et la fluidité (captures PC contrôlées pour les 4 rangs). Calcul du réseau de chemins : quelques ms, une seule fois par construction.
- Cache du service worker passé à `bv-v26`. Version affichée dans les Options : v2.9.9.

## v2.9.8 « Bugs, Équilibrage & Lisibilité »

Version affichée dans les Options : **v2.9.8**

### Ajouté
- **Nom sur les tombes :** le nom du mort s'affiche sous le 💀 sur la carte (italique pour les noms inventés, taille fixe à l'écran, même durée que la croix).
- **Adaptation à la nuit :** le choix de zone (`pick`) tient compte du malus nocturne (constante `NM`) : de nuit, les aventuriers évitent les zones qu'ils ne jugent plus sûres.

### Corrigé
- **Étoile de prestige :** elle affichait la Gloire non dépensée (revenue à 0 dès l'achat d'un bonus). Elle affiche maintenant le nombre de victoires sur le Roi Démon (★1 après la première) et se rafraîchit dès la victoire.

### Modifié
- **Gloire :** 1 point par victoire sur le Roi Démon (avant : 2 + 1 par tranche de 3 aventuriers).
- **Nuit plus dangereuse :** puissance des monstres ×1,6 la nuit (avant ×1,25), constante `NM` dans combat.js.
- **Bois :** butin ×0,6 (avant ×0,75), constante `WOOD`.
- **Difficulté des zones :** 🔥 (1 à 3) à la place des 💀, placé juste sous le nom de la zone. Le Roi Démon garde 👑, aussi sous son nom.
- **Simulations** (20 jours, 4 parties, 8 aventuriers renouvelés, ancien → nouveau) : morts 25-64 → 29-96 (très variable, environ +60 % en moyenne) ; bois gagné environ 616 → 559 par partie (comparaison faussée par les morts plus nombreuses).
- Pas de migration : les anciennes croix de mort sans nom s'affichent sans étiquette. Une sauvegarde 2.9.7 se charge et se joue (testé).
- Non vérifié : le rendu visuel sur ton écran (placement du 🔥 et des noms de tombes), aucune capture générée.
- Cache du service worker passé à `bv-v25`. Version affichée dans les Options : v2.9.8.

## v2.9.7 « Terres sauvages & Rivières »

Version affichée dans les Options : **v2.9.7**

### Ajouté
- **Deux rivières** qui naissent dans la Montagne et serpentent vers le bord de la carte, en contournant le village et les zones. La seconde peut rejoindre la première. Leur tracé dépend de la position des zones, donc différent à chaque partie.
- **Ponts de bois** à chaque endroit où un chemin traverse l'eau (purement visuel : les durées de trajet ne changent pas).
- **Grandes zones naturelles :** Forêt de 150 à 200 arbres, massif de 9 pics avec sapins au pied, Mine avec trois collines et un champ de rochers, Ruines étendues (15 colonnes, murs bas, arches, mousse), Volcan avec deux cônes secondaires, mares de lave et rochers. La taille des arbres, colonnes et bâtiments ne change pas.

### Corrigé
- Aucun correctif dans cette release.

### Modifié
- **Carte plus petite :** ×2,5 au lieu de ×3 (le village garde sa taille). Les durées de trajet sont inchangées (le Volcan reste à environ 5 min).
- **Chemins qui ne se croisent jamais** (hors de l'enceinte du village) : ils sont tracés en courbes, avec repli en lignes droites si aucune solution n'existe. Contrôle sur 300 parties : 0 croisement. Un chemin peut encore passer sur le bord du décor d'une autre zone (visuel seulement).
- **Placement des zones :** il tient compte de leur taille (distance minimale entre zones, marges de la carte).
- Le puits et les routes se recalculent avec la nouvelle carte. Rivières : 2 sur 2 dans 100 % des parties testées (300) ; ponts : de 0 à 10 selon la partie.
- **Migration :** positions des zones, aventuriers, croix de mort et trajets en cours converties au chargement (nouvelle version de sauvegarde). Les aventuriers en route finissent leur trajet en ligne droite. Une sauvegarde 2.9.6 se charge et se joue (testé). Les zones d'une ancienne partie sont plus grandes sur la même disposition : de légers chevauchements sont possibles (une nouvelle partie évite ce cas).
- Non vérifié : fluidité et batterie sur ton téléphone (v2.10.0). Génération du décor en test PC : 0,3 à 0,7 s, une seule fois par partie ou changement de taille d'écran.
- Cache du service worker passé à `bv-v24`. Version affichée dans les Options : v2.9.7.

## v2.9.6 « Lisibilité, Auberge & Veille Nocturne »

Version affichée dans les Options : **v2.9.6**

### Ajouté
- **Étiquettes permanentes :** nom et niveau (« Nom · niv. 5 ») au-dessus de tous les aventuriers et PNJ, sans clic. Taille fixe à l'écran quel que soit le zoom, contour sombre, italique pour les noms inventés. En combat, elles passent au-dessus du nom du monstre.
- **Suivi d'un aventurier :** un tap sur un aventurier centre la caméra sur lui et le suit (zoom minimum 1,2). Le suivi s'arrête en faisant glisser la carte, en tapant ailleurs ou en double-tapant.
- **Grande Auberge :** bâtiment redessiné en hôtel à 3 étages (rangées de fenêtres, cheminée, porte voûtée, enseigne), un peu plus large que les autres.
- **Aventuriers visibles la nuit :** halo et point lumineux jaune au centre de chaque aventurier (pas des PNJ).

### Corrigé
- Aucun correctif dans cette release.

### Modifié
- **Infobulle au tap supprimée** (remplacée par le suivi).
- **Repos à l'Auberge :** l'aventurier sans maison disparaît complètement de la carte (étiquette comprise). En repos dans sa maison, il reste semi-transparent, avec étiquette.
- **Lampadaires :** le point jaune central est supprimé ; il reste le halo doux.
- **Genre ♂ / ♀ :** ces symboles remplacent M / F dans le menu Développeur et dans les données. Les anciennes valeurs sont converties au chargement (sauvegarde de partie, genres enregistrés, import de code).
- Le puits et les décors du village tiennent compte de la taille de l'Auberge (leur position peut légèrement changer).
- Pas de migration de champs hors genres. Une sauvegarde 2.9.5 se charge et se joue (testé).
- Non vérifié : le rendu sur ton écran. En vue d'ensemble, les étiquettes se chevauchent quand plusieurs aventuriers sont au village (captures de contrôle seulement).
- Cache du service worker passé à `bv-v23`. Version affichée dans les Options : v2.9.6.

## v2.9.5 « Survie impitoyable & Roi Démon »

Version affichée dans les Options : **v2.9.5**

### Ajouté
- **Courbe d'XP sans plafond de niveau :** seuil de niveau quasi exponentiel (4 XP au niveau 1, 126 au niveau 10, 358 au niveau 20, puis ×1,4 par niveau : 2 877 au niveau 25, 21 766 au niveau 30). Battre un monstre faible rapporte peu ; un gain d'XP ne peut jamais faire passer plusieurs niveaux d'un coup.
- **Plancher de mortalité à 7 % :** même très supérieur à son adversaire, un aventurier risque la mort à chaque combat (constante `DFLOOR`).

### Corrigé
- Aucun correctif dans cette release.

### Modifié
- **Monde fixe :** la force des monstres ne monte plus avec les jours (`dz` ne dépend plus du jour). Seuls le village et ses PNJ changent les chances de survie.
- **Fuite très rare :** une défaite mène à la mort dans la grande majorité des cas. Chance de fuite blessé (constante `FLEE`) : Guerrier ≈ 12 %, Voleur ≈ 10 %, Rôdeur ≈ 9 %, Mage ≈ 3 %, augmentée par l'armure et le bouclier (jusqu'à +50 %) et par la bénédiction du Sanctuaire. Contre le Roi Démon : 5 %. Il n'y a plus de cas où la défaite est toujours une fuite.
- **Zones recalibrées (sous-zones facile-moyenne-difficile) :** Forêt 2-3-4, Mine 6-8-10, Montagne 13-16-20 (inchangée), Ruines 24-30-38, Donjon 42-52-65, Volcan 68-85-105 (au lieu de 26-33-42 / 53-67-85 / 108-137-174). Une partie en cours prend ces valeurs au chargement.
- **Roi Démon :** puissance de base 300 (`BOSS0`, +35 % par victoire comme avant). Un Guerrier niveau 20 équipé niveau 8 partout a environ 10 % de victoire en combat ; niveau 25 équipé niveau 12, environ 20 %.
- **Aventuriers plus prudents** (nécessaire avec la mortalité actuelle) : seuil de victoire attendu 92 % − 20 % × audace (avant 90 % − 40 %), prise de risque 3 à 7 % des départs (avant 8 à 18 %). Le bonus « manque d'or » vise désormais les Ruines (difficulté ≥ 24).
- **Simulations** (25 jours, 5 parties, 8 aventuriers, ancien → nouveau) : meilleur niveau 38-46 → 4-6 ; quêtes 139-182 → 98-149 ; morts 14-23 → 11-21 ; or gagné 1022-2249 → 530-887 ; game over 1 → 0 à 3 par partie. Le niveau 20 n'est pas atteint en 25 jours : avec 7 % de mort minimale par combat, il faut une chance exceptionnelle.
- Non simulé : une partie complète avec un joueur réel, la victoire sur le Roi Démon sur une longue partie (le 5-10 % global n'est pas mesuré, seulement le taux par combat ci-dessus).
- Pas de migration : aucun champ de sauvegarde modifié. Une sauvegarde 2.9.4 se charge et se joue (testé) ; ses aventuriers gardent leur niveau mais affrontent des zones plus mortelles et montent plus lentement.
- Cache du service worker passé à `bv-v22`. Version affichée dans les Options : v2.9.5.

## v2.9.4 « Montée en puissance »

Version affichée dans les Options : **v2.9.4**

### Ajouté
- **Courbe d'XP jusqu'au niveau 50 :** le seuil de niveau suit désormais l'échelle des monstres (de 3 XP au niveau 1 à environ 170 au niveau 50). Un aventurier qui survit atteint le niveau 50 en 20 à 30 jours de jeu environ ; la sélection naturelle élimine la majorité des autres.

### Corrigé
- Aucun correctif dans cette release.

### Modifié
- **Zones jusqu'au niveau 50 :** les 18 sous-zones montent régulièrement (×1,27 par sous-zone). Forêt 3-4-5 (inchangée), Mine 6-8-10, Montagne 13-16-20, Ruines 26-33-42, Donjon 53-67-85, Volcan 108-137-174. Chaque zone est nettement plus forte que la précédente.
- **Choix de zone :** le bonus « manque d'or » (aventuriers attirés par les zones riches) ne s'applique plus qu'à partir des Ruines (seuil de difficulté 13 → 71, pour garder le même sens).
- **PNJ plus lents :** un PNJ monte d'un niveau tous les `niveau × 20` retours utiles (au lieu de `niveau × 4`). Leur niveau actuel est conservé.
- **Bois :** −25 % sur tous les butins de bois.
- **Équipement trouvé :** inchangé, il suit la force du monstre vaincu.
- **Simulations** (25 jours, 3 parties, 8 aventuriers, ancien → nouveau) : meilleur niveau 2-3 → 50 / 41 / 32 (le niveau 50 est atteint au jour 26 dans une partie) ; quêtes 72 / 67 / 124 → 134 / 110 / 85 ; morts 17 / 14 / 14 → 19 / 17 / 16 ; or gagné 308 / 269 / 742 → 1353 / 1070 / 628 ; bois par quête 2,4 → 1,3. En mode test « aventuriers immortels » : meilleurs niveaux 61 / 49 / 46 au jour 25, médiane autour de 38-45.
- Non simulé : une partie complète avec un joueur réel, et l'équilibre or / bâtiments sur plus de 25 jours.
- Pas de migration : aucun champ de sauvegarde modifié. Une ancienne sauvegarde se charge et se joue normalement (testé).
- Cache du service worker passé à `bv-v21`. Version affichée dans les Options : v2.9.4.

## v2.9.3 « Bon sens & Terres mortelles »

Version affichée dans les Options : **v2.9.3**

### Ajouté
- **Destinations de bon sens :** parmi les zones que l'aventurier juge sûres (filtre de victoire conservé, selon son audace), il préfère les plus difficiles qu'il peut affronter, tout en gardant un peu de variété (besoin de bois ou de pierre, évitement de la dernière zone).
- **Prise de risque :** environ 8 à 18 % des départs (selon l'audace) visent la zone juste au-dessus de ce qu'il juge sûr.
- **Butin de coup de chance :** vaincre un monstre nettement plus fort que soi multiplie le butin (or, bois, pierre) jusqu'à ×3.

### Corrigé
- Aucun correctif dans cette release.

### Modifié
- **Mortalité en cas de défaite :** si l'adversaire est très supérieur (puissance de l'aventurier sous 50 % de la sienne), la mort est de 80 % ; entre 50 et 80 %, de 60 %. L'armure et le bouclier n'y changent rien. Au-delà, la règle précédente s'applique.
- **Débuts plus durs :** la puissance de base d'un aventurier baisse (4 → 1,5), ce qui pèse surtout aux premiers niveaux.
- Pas de migration : aucun champ de sauvegarde modifié.
- **Simulations de combats isolés** (jour 1, 20 000 combats par ligne, ancien → nouveau) : niv. 1 Guerrier en Forêt, mort 3 % → 16 % ; niv. 1 Guerrier en Mine, mort 13 % → 44 % ; niv. 3 Guerrier sans équipement au Volcan, mort 34 % → 73 %, or par victoire 47 → 104. Niveaux 5 et plus bien équipés dans une zone adaptée : inchangés. Au jour 20, les niveaux 1 sont plus touchés (Forêt 24 %, Mine 60 %) à cause de la montée de difficulté par jour.
- Non simulé : une partie complète (économie, quêtes par jour, nombre de morts par jour).
- Cache du service worker passé à `bv-v20`. Version affichée dans les Options : v2.9.3.

## v2.9.2 « Architecture modulaire »

Version affichée dans les Options : **v2.9.2**

### Ajouté
- Aucun ajout de gameplay ni de graphismes dans cette release.

### Corrigé
- Aucun correctif dans cette release.

### Modifié
- **Architecture :** le jeu est découpé en 10 fichiers JavaScript reliés dans `index.html`, dans cet ordre impératif : `data.js`, `state.js`, `village.js`, `save.js`, `combat.js`, `ui.js`, `map.js`, `audio.js`, `dev.js`, `main.js`. Les scripts restent classiques et partagent la même portée globale. Les mises à jour seront plus faciles et moins coûteuses en tokens.
- Gameplay, graphismes et sauvegardes inchangés : aucune migration nécessaire.
- Cache du service worker passé à `bv-v19` (liste complète des fichiers).
- Version affichée dans les Options : v2.9.2.

## v2.9.1 « Correctifs & Interface »

Version affichée dans les Options : **v2.9.1**

### Ajouté
- **Menu Développeur :** bouton « Réinitialiser le Top 10 » (avec confirmation ; gloire et bonus permanents conservés) et bouton « Réinitialisation complète » (avec confirmation : efface la partie, la gloire, les bonus permanents et le Top 10 ; noms, genres et réglage de la musique conservés).

### Corrigé
- **Noms uniques par partie :** un nom déjà tiré durant une run (liste ou inventé) n'est plus réutilisé, même après la mort de l'aventurier. Les anciennes sauvegardes reprennent avec les noms des aventuriers et PNJ présents.

### Modifié
- **Sanctuaire :** l'action dure 30 secondes maximum (15 à 30 s au lieu de 60 à 120 s).
- **Repos :** les aventuriers deviennent semi-transparents quand ils se reposent (Auberge ou maison), comme lors d'un achat.
- **Interface :** le nombre d'aventuriers n'est plus affiché dans la barre du haut ; le bouton musique (🔊/🔇) est déplacé dans les Options.

## v2.9b « Héros & Terres lointaines (2/2) »

### Ajouté
- **Vrais personnages** à la place des pions : silhouettes masculines et féminines (cheveux, peau et tenue variés) avec signes distinctifs par classe : épée et bouclier (Guerrier), dagues et capuche sombre (Voleur), chapeau pointu et bâton (Mage), arc, carquois et capuche verte (Rôdeur). Un cheval est dessiné sous le héros qui en possède un. La taille est calée sur les bâtiments.
- **Animations** : pas et balancement à la marche (les personnages se tournent dans le sens du déplacement), coups d'épée et de dague, flèches, boules magiques et étincelles en combat.
- **PNJ dessinés** : Aubergiste, Forgeron, Tavernier, Guérisseur, Marchand, Palefrenier et Maire ont chacun leur personnage et leur accessoire.
- **Genre des prénoms** : dans le menu Développeur, liste déroulante (— / M / F) pour chaque prénom. « — » donne un genre au hasard. Les noms inventés ont un genre au hasard. Le réglage est inclus dans l'export/import.
- **Routes courbes** : chaque route serpente entre le village et sa zone, et les aventuriers la suivent.

### Corrigé
- Les aventuriers restent dans l'image de la zone : ils se placent sur le terrain dessiné de chaque zone (sous-bois de la Forêt, devant l'entrée de la Mine, etc.) et non plus autour du centre.

### Modifié
- **Zones agrandies** (×2). La Forêt est plus étendue et compte environ 3 fois plus d'arbres. Les routes finissent devant la zone. Nom, pastille et crânes sont repositionnés.
- **Lumières** : halos plus grands (lampadaires, enceinte du village, entrées, aventuriers) et toujours visibles en vue d'ensemble. **Environ 3 fois moins de lampadaires** sur les routes.
- **Trajets un peu plus longs** : les aventuriers suivent les courbes de la route. Simulation sur 4 parties de 12 jours : aller moyen 106 s avant, 114 s maintenant (+8 %), quêtes 114,5 contre 113,8, morts 4,5 contre 3,5, or 1640 contre 1809. Pas de changement d'équilibre notable.
- Les sauvegardes v2.9a sont reprises : les genres sont tirés au hasard (aventuriers et PNJ), et les aventuriers déjà en route finissent leur trajet en ligne droite.
- Version affichée dans les Options : v2.9b.

## v2.9a « Grande carte & Décor du village (1/2) »

### Ajouté
- **Carte ×3 en largeur et en hauteur** (9 fois la surface) : les zones et les chemins sont répartis sur toute la carte, avec le village au centre-bas et la même progression de difficulté.
- **Vue d'ensemble par défaut** : toute la carte est visible d'un coup. Le zoom libre va jusqu'au niveau de détail maximal d'avant. Le double clic ramène à la vue d'ensemble.
- **Refonte du village** : sol en terre battue, pavés devant chaque entrée et grande place pavée devant la Mairie, palissades de bois et petits murets de pierre ouverts aux chemins (piliers aux entrées), puits (quand la place le permet), tonneaux et caisses près des bâtiments, herbe et fleurs autour des bâtiments et le long de l'enceinte. Le décor du village est mis en cache.

### Corrigé
- Aucun correctif dans cette release.

### Modifié
- **Durées de trajet inchangées** : les distances sont ×3 mais la vitesse aussi (le lieu le plus éloigné reste à environ 5 minutes sans monture). Le village garde sa taille, les bâtiments rentrent sans agrandissement.
- Zones, personnages et textes gardent leur taille d'origine : ils paraissent donc plus petits dans la vue d'ensemble.
- Les sauvegardes v2.8b sont converties au chargement (zones, positions des aventuriers, aventuriers en route, croix de mort).
- **Simulations** (4 parties, 8 aventuriers, 12 jours, ancienne contre nouvelle version) : environ 113 contre 115 quêtes, 3,5 contre 4,5 morts, trajet moyen 99 s des deux côtés. Pas de changement d'équilibre notable.
- Version affichée dans les Options : v2.9a.

## v2.8b « Vie du village & Équilibre (2/2) »

### Ajouté
- **Sanctuaire : bénédiction.** Avant chaque départ en quête, l'aventurier passe au sanctuaire (1 à 2 min, avec file d'attente). Béni, il bénéficie de la réduction de mortalité (−8 % par niveau) pour son prochain combat seulement (✨ dans la liste).
- **Deux nouvelles musiques** : une flûte et un violon, avec harpe, basse et nappe de cordes pour plus de profondeur. Elles alternent avec le luth toutes les 10 minutes de lecture (luth, flûte, violon, puis on recommence).
- **Épargne selon le tempérament** : chaque aventurier garde de côté une part du prix de sa prochaine grosse dépense (maison ou cheval), plus ou moins grande selon son audace. L'équipement reste prioritaire tant qu'il est trop faible.

### Corrigé
- Le sanctuaire ne touche plus au temps de repos (introduit par erreur en v2.8a). Les anciennes sauvegardes sont converties.
- Les sous-zones d'une zone ne dépassent plus celles de la zone suivante : par exemple, la Mine 3 était plus dure que la Montagne 1.
- Les mêmes monstres ne reviennent plus d'une sous-zone à l'autre, de jour comme de nuit.

### Modifié
- **Protection des débutants supprimée** : les aventuriers peuvent mourir dès le jour 1.
- **Difficulté des zones** (sous-zones faciles / moyennes / difficiles) : Forêt 3-4-5, Mine 5-7-9, Montagne 9-11-13, Ruines 13-15-17, Donjon 17-20-24, Volcan 24-29-35. Le plus dur d'une zone peut égaler le plus facile de la suivante. Une partie en cours prend ces valeurs au chargement.
- **Simulations** (8 aventuriers, 12 jours) : avec le sanctuaire, environ 25 à 35 % de quêtes en moins, car chaque départ ajoute une visite. En contrepartie, 2 à 4 maisons sur 5 sont achetées contre 0 à 1 avant, et la bourse moyenne passe d'environ 15 à 35 or.
- Version affichée dans les Options : v2.8b.

## v2.8a « Vie du village & Équilibre (1/2) »

### Ajouté
- **Village agrandi** : bâtiments plus espacés et redessinés (toits, portes, fenêtres, cheminées avec fumée, drapeau sur la Mairie, auvent rayé pour le Marché). La **Mairie est au centre**.
- **Éclairage ciblé** : la nuit, lumières sur le périmètre du village et une devant chaque entrée. Le long des chemins, les lampadaires sont décalés à gauche ou à droite du tracé (position fixée au chargement).
- **Déplacements dans le village** : chaque action se fait dans le bon bâtiment (butin à la Mairie, achats à la forge, à la taverne, à l'écurie ou à la maison, soins au sanctuaire), puis retour au repos dans sa maison ou à l'Auberge. Au retour avec butin, la Mairie passe en premier.
- **Durée des actions** : 1 à 2 minutes réelles par action (1 à 1 min 30 pour le dépôt à la Mairie).
- **File d'attente** : si un bâtiment est occupé, les aventuriers attendent leur tour devant l'entrée. Leur état est visible dans l'onglet des aventuriers.

### Corrigé
- Aucun correctif dans cette release.

### Modifié
- **Temps de trajet** : le lieu le plus éloigné prend environ 5 minutes à l'aller sans monture (les bottes l'accélèrent un peu).
- **Cheval** : trajets plus courts de 37 % (cheval 3) à 54 % (cheval 12), au lieu d'un gain faible.
- **Sanctuaire** : un aventurier blessé y passe et n'a plus le repos rallongé.
- Le repos démarre à l'arrivée à la maison ou à l'Auberge. Avec 8 aventuriers, mes simulations montrent environ 15 à 30 % d'or gagné en moins, car le temps passé au village compte ; le rééquilibrage arrive avec la v2.8b.
- La carte est un peu plus haute pour loger le village agrandi.
- Les anciennes sauvegardes sont converties automatiquement (Mairie au centre, aventuriers remis à leur place).
- Version affichée dans les Options : v2.8a.

## v2.7b « Nouveau Monde : décors (2/2) »

### Ajouté
- **Zones illustrées** : plus de ronds de couleur. Forêt (arbres détaillés), Mine (colline et entrée boisée), Montagne (pics enneigés), Ruines (colonnes brisées), Donjon (donjon et tour), Volcan (cratère, lave, fumée) et le Trône du Roi (forteresse sombre).
- **Variantes visibles** : chaque sous-zone change d'aspect selon sa difficulté (plus sombre et plus fournie quand elle est dangereuse).
- **Difficulté en icônes** : 💀 (1 à 3 selon la difficulté) à la place du texte « danger », et une icône de type de zone sur chaque lieu.

### Modifié
- **Mortalité** : les aventuriers de niveau 1 et 2 ne sont plus protégés de la mort, sauf pendant les 2 premiers jours de la partie. Dans mes simulations avec 8 aventuriers, on passe d'environ 1 mort tous les 4 jours à environ 1 mort tous les 2 jours, sans game over précoce.
- Les zones sont plus espacées entre elles pour éviter que leurs noms se chevauchent.
- Version affichée dans les Options : v2.7b.

## v2.7a « Nouveau Monde : décors (1/2) »

### Ajouté
- **Sol vivant** : fond de carte enrichi (touffes d'herbe, petites fleurs, cailloux, reliefs doux), dessiné une seule fois puis mis en cache pour économiser la batterie.
- **Vrais chemins** : routes de terre légèrement courbes, aux bords irréguliers, avec cailloux et herbe en bordure.
- **Ombres portées** sous les bâtiments et les aventuriers.
- La nuit, les lumières suivent désormais les courbes des chemins.

### Corrigé
- Les noms de zones tout en haut de la carte ne sont plus coupés (les zones ne peuvent plus être placées trop haut).

### Modifié
- Version affichée dans les Options : v2.7a.
- La suite du décor (zones illustrées, arbres et rochers) arrive avec la v2.7b.

## v2.6b « Chroniques (2/2) »

### Ajouté
- **Roue crantée ⚙️** discrète en bas à gauche des Options, ouvrant le menu Développeur (d'autres options viendront).
- **Gestion des noms** : liste modifiable (un nom par ligne, ajout, modification, suppression), sauvegardée dans le navigateur, avec retour à la liste par défaut. Aucune mise à jour du jeu nécessaire.
- **Noms inventés** : quand la liste est épuisée, des noms sont générés et affichés en *italique* (console, liste des aventuriers, PNJ, classement). Pas de nombre minimum de noms.
- **Export / import de sauvegarde** : code texte (partie, classement global et liste de noms) à copier ou coller.
- **Outil de test** : +500 or, bois et pierre.

### Modifié
- Version affichée dans les Options : v2.6b.

## v2.6a « Chroniques (1/2) »

### Ajouté
- **Console horodatée** : chaque message commence par `[J12 · 14h]` (jour et heure de jeu).
- **Historique de la console** : les 20 derniers messages sont sauvegardés et réaffichés à la réouverture.
- **Top 10 global** : un seul classement pour toutes les parties, un seul score par nom (le meilleur). Ordre : monstres tués, or gagné, niveau, jours. Les classements des parties précédentes sont repris.

### Modifié
- Le message d'accueil n'apparaît plus qu'au début d'une nouvelle partie.
- Le message de nouvelle partie ne mentionne plus la Gloire.
- Version affichée dans les Options : v2.6a.

## v2.5.1 « Nouveau Monde : ambiance et UI »

### Ajouté
- **Musique médiévale** générée par synthèse (Web Audio, aucun fichier externe) : mélodie de luth en boucle sur 16 mesures, qui démarre au premier tap.
- **Bouton 🔊/🔇** toujours visible en haut à droite (préférence mémorisée). La musique se met en pause quand on quitte l'onglet ou l'application.
- **Infobulle d'aventurier** : un tap sur un aventurier de la carte affiche son nom et son niveau. Elle se ferme au tap ailleurs.

### Corrigé
- La popup de sauvegarde s'affiche sur une seule ligne.
- La progression des PNJ (x/y) n'est plus affichée dans la liste (leur niveau reste visible).

### Modifié
- Version affichée dans les Options : v2.5.1.

## v2.4.1 « Correctif bloquant »

### Corrigé
- **Progression bloquée** : la force des monstres augmentait de 4 % toutes les 90 s de jeu (environ ×4,6 au jour 10), rendant les nouvelles recrues injouables. Elle augmente désormais de 1,5 % par jour de jeu, plafonnée à +75 %.
- **Incohérence des combats** : un aventurier de niveau 5 mourait face à un ours alors qu'un niveau 1 en tuait un. Avec la nouvelle échelle, un niveau 1 garde environ 70 à 90 % de victoire contre les monstres faibles de la zone la plus facile, même au jour 50.

### Modifié
- Les aventuriers choisissent des zones un peu plus prudentes (seuil de victoire attendu relevé).
- Les aventuriers de niveau 1 et 2 ne meurent plus en cas de défaite : ils fuient blessés (repos plus long). Au niveau 3 et plus, la mort reste possible si le monstre est plus fort.
- Le hasard des combats est conservé.
- Version affichée dans les Options : v2.4.1.

## v2.4 « Veille nocturne »

### Corrigé
- **Zoom verrouillé** sur toute l'interface (seule la carte se zoome).
- **Écran toujours allumé** par défaut (option supprimée).

### Ajouté
- **Transition jour/nuit** progressive (crépuscule 20h-21h, aube 4h-5h).
- **Halo lumineux** autour des aventuriers la nuit.
- **Sauvegarde** : popup de confirmation sur sauvegarde manuelle, et timer « dernière sauvegarde il y a X » dans les Options.
- **Game over « You lose, Continue ? »** avec compte à rebours de 10 s.

### Modifié
- **Spa** renommé **Sanctuaire** (icône ⛪, effet de réduction de mortalité inchangé). Les anciennes sauvegardes sont converties.
- Version affichée dans les Options : v2.4.

## v2.3 « Hôtel de ville »

### Ajouté
- **Mairie** : bâtiment présent dès le départ, non améliorable, qui matérialise la caisse du village (sans plafond).
- **Maire** (PNJ, affiché en violet) : monte d'un niveau tous les `niveau × 4` retours d'aventuriers rapportant au moins une ressource (une fuite ne compte pas). Chaque niveau donne +1 % d'or sur les butins.
- Progression des PNJ visible dans la liste (`retours / seuil`).

### Modifié
- Les anciennes sauvegardes reçoivent automatiquement une Mairie et un Maire au chargement.
- Le palier d'évolution du village (Hameau, Village, Bourg, Cité) tient compte de la Mairie.
- Version affichée dans les Options : v2.3.

## v2.0 « Contrées inconnues »

### Ajouté
- 3 sous-zones par zone (difficulté, monstres de jour et de nuit propres), tirées au hasard à chaque nouvelle partie, avec position légèrement aléatoire sur la carte.
- Combats en cours affichés sur la carte, journal de début et de fin de combat, déplacement et zoom de la carte.
- Heure affichée, nuit de 21h à 4h, points lumineux la nuit.
- Point de repos à la maison ou à l'auberge, arrivée aléatoire dans le cercle d'une zone.
- Top 10 de la partie en cours avec monstres tués, or gagné et équipement.
- Game over, nom du village modifiable à chaque nouvelle partie.

### Modifié
- Table de victoire plus tranchée ; plus de mort face à un monstre nettement plus faible (fuite blessé).
- Champions légendaires : environ 2 %, niveau 5 minimum.
- Plus de limite d'aventuriers, logement à l'auberge (repos lent) ou en maison (repos normal).
- Aventuriers : vitesses de jeu supprimées, option temps de trajet sous la carte.
