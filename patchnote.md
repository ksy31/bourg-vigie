# Patchnotes — Bourg-Vigie

## v3.6.0 « Correctifs : bâtiments, jour 5 h-21 h, bandeau fixe »

Version affichée dans les Options : **v3.6.0**

### Corrigé
- Les aventuriers traversaient les bâtiments du village : le décalage latéral appliqué à leur position est supprimé dans le village et ils sont repoussés hors des emprises des bâtiments.

### Modifié
- **Le jour va de 5 h à 21 h** (avant : 4 h à 21 h) pour les combats, les repos et les guildes. L'aube de 4 h à 5 h compte désormais comme nuit.
- Ciel et lumières alignés : nuit complète avant 5 h, lever progressif jusqu'à 6 h 30, crépuscule terminé à 21 h.
- Le bandeau du haut (village, jour, heure, météo, ressources) reste affiché en haut de l'écran quand on fait défiler.

## v3.5.9 « Équipements visibles (3/3) : équipements légendaires »

Version affichée dans les Options : **v3.5.9**

### Ajouté
- **10 thèmes légendaires** pour les paliers 11 à 14 : glace, foudre (11) ; lave, cristal (12) ; os et âmes, nature vivante, étoile (13) ; **lame de lumière laser**, **série démoniaque** (noir, flammes noires, cornes, lueurs rouges) et **lumière** (14).
- Chaque thème s'applique aux armes, armures, bottes et boucliers des 4 classes (lames, têtes de bâton, arcs à cornes, motifs sur les tenues).
- **Effets animés** : petites particules aux couleurs du thème et reflet coloré au sol la nuit.
- Icônes de la fiche et du journal aux couleurs du thème.

### Modifié
- Le thème dépend de l'aventurier : un même aventurier garde le même thème sur ses pièces du même palier. Palier 10 et moins inchangés. Aucune migration de sauvegarde.

## v3.5.8 « Équipements visibles (2/3) : armures, bottes, boucliers »

Version affichée dans les Options : **v3.5.8**

### Ajouté
- **Armures, bottes et boucliers visibles (mode 3D), 14 paliers**, dans les mêmes matières que les armes. Chaque palier a son dessin : motifs (plaques, écailles, chevrons, losange, rayures), cols (simple, ailé, à pointes), jupes et ourlets, emblème à la couleur de l'aventurier.
- **Une tenue par classe :** plaques et épaulières du Guerrier (rondes, étagées, évasées, à pointes, ailées), robe du Mage, cuir du Voleur et du Rôdeur, toutes évolutives.
- **Bottes** de plus en plus hautes et ornées (revers, sangles, bouts, éperons), avec des ailes aux paliers 13 et 14.
- **Boucliers du Guerrier** : rond, écu, en pointe, tour, hexagonal, en étoile, avec bordure, ombilic à la couleur de l'aventurier et emblème.
- **Mini-images** pixel-art de ces pièces dans la fiche de l'aventurier et dans le journal.

### Modifié
- Le sprite est régénéré quand l'arme, l'armure, les bottes ou le bouclier changent. Palier 0 : tenue habituelle ; au-delà de 14, le palier 14.
- De dos, seules les épaulières et la robe du Mage changent. Mode 2D inchangé, aucune migration de sauvegarde.

## v3.5.7 « Équipements visibles (1/3) : système et paliers »

Version affichée dans les Options : **v3.5.7**

### Ajouté
- **Armes visibles sur les aventuriers (mode 3D), 14 paliers par classe** : épée du Guerrier, dagues du Voleur, bâton du Mage, arc du Rôdeur. Chaque palier a sa matière (cuivre, bronze, acier, argent, fer noir, mithril, or, obsidienne, rubis, jade, cristal, os, orage, céleste) et sa forme (lames droites, en feuille, courbes, ondulées, dentelées, en éclair, en cristal ; têtes de bâton en boule, fourche, croissant, anneau, crosse, cristal, soleil, griffes, flamme, branche, prisme, crâne, éclair, étoile ; arcs plus ou moins courbes, cornes, ailettes, ornements).
- L'arme suit toutes les poses : repos, attaques de classe, victoire.
- **La couleur de l'aventurier reste visible sur l'arme** (enroulement de la poignée, gemme du pommeau, ruban du bâton, poignée de l'arc).
- **Mini-image de l'arme** dans la fiche de l'aventurier et dans le journal (butin, forge, Armurerie, récupération sur un mort).

### Modifié
- Le sprite d'un aventurier est régénéré quand son niveau d'arme change (et seulement dans ce cas).
- Niveau 0 : arme habituelle ; au-delà du palier 14, le palier 14 est conservé. Armure, bottes et bouclier : version 3.5.8. Mode 2D inchangé, aucune migration de sauvegarde.

## v3.5.6 « Ambiance sonore »

Version affichée dans les Options : **v3.5.6**

### Ajouté
- **5 musiques** au lieu de 3 : luth, flûte et violon retravaillés, plus une harpe douce pour la nuit et une flûte grave mystérieuse. Elles passent au hasard, sans jamais répéter la précédente, toutes les 7 minutes environ.
- **Ambiances sonores**, discrètes : pluie (selon l'intensité), orage avec tonnerre (calé sur les éclairs en 3D), vent selon la météo, oiseaux le jour par beau temps, grillons la nuit, cloche lointaine à l'aube et au crépuscule.
- **Deux boutons séparés** : 🔊 musique et 🌦️ ambiances (le choix est mémorisé).

### Modifié
- Les 3 musiques existantes varient d'un passage à l'autre (sections échangées, arpèges et petites ornementations) pour moins se répéter.
- Le bouton musique coupe maintenant seulement la musique. Aucune migration de sauvegarde.

## v3.5.5 « Animations de combat pixel-art (2/2) : finitions »

Version affichée dans les Options : **v3.5.5**

### Ajouté
- **Victoire :** l'aventurier lève le bras (avec son arme pour le Guerrier et le Voleur) pendant environ 1,8 s en sortant d'un combat gagné.
- **Fuite :** il court penché en avant, plus vite, pendant environ 3 s.
- **Mort :** l'aventurier tombe au sol, reste allongé, puis disparaît en fondu (environ 3 s).
- **Bénédiction :** étoiles dorées pixel-art qui tournent autour de l'aventurier.
- **Entrée animée** (surgit du sol, anneau de flammes) aussi pour les champions légendaires, dragons, hydres, liches, géants et archidémons.

### Modifié
- L'ancien anneau rouge de combat devient un cercle pixel-art de poussière et d'étincelles qui tourne, à la couleur de la classe.
- Lumière sur les gros coups abandonnée, comme les animations d'impact. Mode 2D inchangé, aucune migration de sauvegarde.

## v3.5.4 « Animations de combat pixel-art (1/2) : coups et impacts »

Version affichée dans les Options : **v3.5.4**

### Ajouté
- **Attaques variées par classe (mode 3D)**, qui s'enchaînent pendant un combat, avec de nouvelles poses pixel-art :
  - Guerrier : arc de taille (avec un croissant lumineux) et coup d'estoc (trait lumineux), avec une petite avancée vers le monstre.
  - Mage : projectile magique qui vole jusqu'au monstre, éclair qui tombe sur lui, sort de soin (croix vertes qui montent autour du mage).
  - Voleur : rafale de 3 dagues lancées, et esquive (petit saut en arrière).
  - Rôdeur : tir rapide et tir visé (visée plus longue, flèche plus rapide).
- **Monstres :** nuage de poussière pixel-art quand un monstre tombe (les êtres immatériels gardent leur fondu).

### Corrigé
- Le zoom (pincement à deux doigts ou molette) ne fait plus perdre le suivi du personnage en 3D : on peut zoomer et tourner la caméra tout en le suivant ; un glissement à un doigt ou un double tap l'arrête toujours.

### Modifié
- Dragons (dragon, wyverne, wyrm) et golems nettement plus grands (constante `SZ`).
- Aucune animation d'impact (recul, étincelles, flash) : choix conservé. Mode 2D inchangé, aucune migration de sauvegarde.

## v3.5.3 « Monstres en sprites (3/3) : fantastiques et boss »

Version affichée dans les Options : **v3.5.3**

### Ajouté
- **Tous les monstres restants en sprites pixel-art (mode 3D) :** démon (mineur, archidémon, succube, incube), Roi Démon, liche, golem (roche, cristal, lave, obsidienne, noir), gargouille, dryade (humanoïdes) ; fantôme, ombre, âme/banshee, spectre (ardent, royal, des neiges, de mineur, de prisonnier), feu follet, élémentaire ; arbre hanté ; hydre (3 têtes, 5 pour l'hydre à sept têtes) ; basilic ; chimère (ardente, des cimes ailée) ; dragons (dragon classique, wyverne bipède, wyrm serpentin) avec couleurs selon le nom (cendres, infernal, nocturne, noir, ancien, spectral).
- **Grands formats :** toiles jusqu'à 128×96 (dragon), 96×88 (hydre, wyverne), 112×64 (wyrm) ; Roi Démon, démon et gargouille sur toile élargie avec ailes.
- **Effets lumineux :** couche émissive de lave et de flammes (golem de lave, élémentaires, spectre ardent, âme de magma, dragons de feu, chimère ardente), toujours allumée et pulsante, en plus des traits néon de nuit.
- **Roi Démon :** aura rouge sombre pulsante et animation d'entrée (il surgit du sol dans un anneau de flammes, environ 2 s).
- **Fin de combat :** les êtres immatériels (fantôme, ombre, âme, spectre, feu follet, élémentaire) se dissipent en fondu d'environ 2 s ; le golem s'effondre ; les autres restent 30 s.

### Modifié
- **Ancien code 3D des monstres retiré** (`monH`, `monQ`, `monW`, `monC`, `monS`, `monT`, `nEyes`) ; la table `MON` reste (couleurs et options des sprites).
- `pxSprite` accepte un décalage horizontal `XO`. Mode 2D inchangé. Anciennes sauvegardes compatibles, aucune migration.

## v3.5.2 « Monstres en sprites (2/3) : bêtes »

Version affichée dans les Options : **v3.5.2**

### Ajouté
- **Bêtes en sprites pixel-art (mode 3D) :** loup, renard, sanglier, bouquetin, ours, rat, salamandre/lézard de feu (quadrupèdes de profil, tournés vers l'aventurier), araignée, ver, chauve-souris, aigle, chouette, condor, harpie, griffon, plus le yéti et le loup-garou/rat-garou debout (face/dos, comme les humanoïdes).
- **Tailles de toile variables** (de 56×40 à 96×72) avec la même taille de pixel que les aventuriers ; la taille finale suit toujours l'espèce et le niveau.
- **Animations :** repos et attaque propres à chaque espèce (gueule ouverte et patte levée, souffle de la salamandre, pattes avant de l'araignée, ver qui se penche, piqué des oiseaux) ; battement d'ailes en boucle pour les volants. Pas de marche.
- **Variantes selon le nom :** spectral (bleuté translucide), noir/noire/sombre/des profondeurs (assombri), des neiges (clair), brun, rat-garou (gris), yeux rouges pour « enragé ».
- **Meute spectrale :** 3 loups spectraux côte à côte pour un seul combat.
- **Nuit :** yeux et traits bleu néon sur la couche lumineuse, comme les humanoïdes.
- **Cadavre :** 30 s au sol sur le flanc ; les volants tombent d'abord au sol.

### Modifié
- `pxSprite` accepte des dimensions de toile variables. Mode 2D inchangé. Anciennes sauvegardes compatibles, aucune migration.

## v3.5.1 « Monstres en sprites (1/3) : base et humanoïdes »

Version affichée dans les Options : **v3.5.1**

### Ajouté
- **Moteur de sprites de monstres (mode 3D) :** générateur commun `pxSprite('m'+espèce)` piloté par la table `MON` (couleurs, corpulence, arme, armure, casque, capuche, oreilles, défenses). Images de face et de dos, repos, attaque ; contour sombre, 3 tons ; teinte légèrement mélangée à la couleur de la zone.
- **15 humanoïdes en sprites :** gobelin, kobold, orc, bandit, brigand, braconnier, cultiste, garde, geôlier, chevalier, champion, lanceur de sorts, squelette, troll, géant. Les autres monstres restent en 3D jusqu'aux prochaines étapes.
- **Nuit :** yeux et traits (ceinture, lame, orbe) bleu néon émissifs sur une couche lumineuse séparée.
- **Cadavre :** le monstre vaincu s'effondre et reste couché environ 30 s, assombri.

### Modifié
- La taille des sprites part de celle des aventuriers, puis suit la taille de l'espèce, comme avant. Pas d'animation de marche ni d'impact. Mode 2D inchangé. Anciennes sauvegardes compatibles, aucune migration.

## v3.5.0 « PNJ en sprites »

Version affichée dans les Options : **v3.5.0**

### Ajouté
- **PNJ en sprites pixel-art (mode 3D) :** Aubergiste, Forgeron, Tavernier, Guérisseur, Palefrenier, Maire, Intendant et Chancelier, en version homme et femme, avec tenue, chapeau et accessoire propres à chaque métier (chope, marteau, croix, fourche, chaîne, clés, parchemin). Cheveux et yeux de couleur variable selon le nom du PNJ, contour sombre, 3 tons.
- **Intégration :** face caméra (ou de dos), ombre au sol, torche pixel-art la nuit, ils se tournent vers l'aventurier qui vient les voir, respirent au repos et lèvent le bras quand un aventurier est devant eux.
- **Marteau de construction :** l'aventurier qui construit un bâtiment se tourne vers le chantier et frappe avec un marteau pixel-art (nouvelles images sans arme pour les 4 classes) ; le PNJ dont le bâtiment est en amélioration fait de même, de dos face au bâtiment. Le Forgeron tape aussi au marteau quand il sert un client.

### Modifié
- Les PNJ se tiennent maintenant devant le bâtiment, à gauche de la porte (pour ne pas être cachés par l'aventurier ni traverser le mur) ; leur nom est un peu plus haut.
- Ancien modèle 3D des PNJ (`buildNpc`) retiré. Mode 2D inchangé. Anciennes sauvegardes compatibles, aucune migration.

## v3.4.9 « Réglages sprites et caméra »

Version affichée dans les Options : **v3.4.9**

### Corrigé
- **Noms des aventuriers :** placés au-dessus de la tête du sprite (ils tombaient dans la tête).
- **Torche tenue :** elle était déformée par l'animation des bras ; c'est maintenant une torche en pixel-art, fixe, à droite du personnage.
- **Étiquettes :** « en repos » (aventurier à l'auberge), le nom de l'ennemi et le temps restant restent collés sous le nom de l'aventurier, même quand d'autres noms (aubergiste, PNJ) sont proches.

### Modifié
- **Caméra 3D plus basse :** inclinaison de 43° à 34° au-dessus de l'horizon.
- **Sprites des aventuriers réduits d'environ 17 %** pour s'accorder avec les bâtiments.
- Anciennes sauvegardes compatibles, aucune migration.

## v3.4.8 « Caméra plus basse »

Version affichée dans les Options : **v3.4.8**

### Modifié
- **Caméra 3D plus proche du sol :** inclinaison par défaut ramenée de 54° à 43° au-dessus de l'horizon (les sprites des aventuriers s'inclinent avec elle). Anciennes sauvegardes compatibles, aucune migration.

## v3.4.7 « Aventuriers en pixel-art HD-2D »

Version affichée dans les Options : **v3.4.7**

### Ajouté
- **Aventuriers en sprites pixel-art (mode 3D) :** les 4 classes (Guerrier, Mage, Voleur, Rôdeur) sont dessinées sur canevas, sans lissage, avec contour sombre et ombrage en 3 tons. Ils se tiennent debout face à la caméra, avec une vraie ombre au sol.
- **Animations :** images de face et de dos selon la direction, deux images de marche, image d'attaque pendant les combats, miroir quand ils marchent vers la gauche.
- **Version garçon et fille** pour chaque classe (cheveux longs, jupe, cils pour les filles ; barbe du Mage, coupe courte pour les garçons).
- **Cheveux et yeux de couleur variable** (12 teintes de cheveux, 6 d'yeux), propres à chaque aventurier.

### Modifié
- **Couleur d'aventurier :** elle donne maintenant la couleur générale du personnage (armure, cape et bouclier ; robe et chapeau ; capuche, cape et tunique ; cape, chapeau et tunique).
- **Sac à dos de butin :** flotte désormais à côté de l'aventurier pour rester visible quand il marche vers la caméra.
- Le mode 2D, les PNJ et les monstres restent inchangés (prochaines étapes). Anciennes sauvegardes compatibles, aucune migration.

## v3.4.6 « Sols détaillés, sac et couleurs »

Version affichée dans les Options : **v3.4.6**

### Ajouté
- **Pavé dans tout le village (2D et 3D) :** pavés individuels sur toute la surface, bord usé et irrégulier avec la terre, mousse ; la place centrale (bordure de grosses pierres) et les allées alignées restent.
- **Détail haute résolution pour les autres sols (3D) :** quatre textures procédurales (herbe, terre, roche, dalles) mélangées selon le lieu : terre sur les routes et les berges, roche à la mine, la montagne et au volcan, dalles aux ruines, au donjon et au trône, herbe ailleurs. Détail net de près, sans répétition visible de loin.
- **Étincelles dorées** qui montent autour du sac à dos de butin.

### Modifié
- **Sac à dos de butin :** jaune vif, non éclairé (toujours lumineux), plus gros, léger balancement, halo à faible portée.
- **Couleur d'aventurier :** elle teint maintenant l'armure et le casque (Guerrier), la robe et le chapeau (Mage), la capuche, la cape et la tunique (Voleur), la capuche et la cape (Rôdeur). Elle remplace l'écharpe et la cape ajoutées en 3.4.5.
- Le sol des autres lieux reste en 2D comme avant (détail ajouté en 3D uniquement). Anciennes sauvegardes compatibles, aucune migration.

## v3.4.5 « PNJ, torches et couleurs »

Version affichée dans les Options : **v3.4.5**

### Ajouté
- **Couleur de l'aventurier sur son personnage 3D :** écharpe et cape à sa couleur (celle de sa fiche), pour reconnaître chacun d'un coup d'œil (la capuche du Voleur reprend aussi cette couleur).
- **Torche allumée en forêt, de jour comme de nuit** (même portée qu'avant), avec un fondu en entrant et en sortant de la forêt.

### Corrigé
- **Arrêt des aventuriers devant les PNJ :** le point d'arrêt était au centre du bâtiment et un décalage aléatoire les déplaçait encore. Ils s'arrêtent maintenant juste devant le PNJ, face à lui, sans décalage ; les suivants attendent de part et d'autre.

### Modifié
- **PNJ du village :** placés juste devant la porte de leur bâtiment (au lieu du côté), avec leur torche.
- **Sac à dos de butin :** jaune, plus lumineux, halo à très faible portée.
- Pas de changement 2D pour la torche de forêt et la couleur des personnages (3D seulement). Anciennes sauvegardes compatibles, aucune migration.

## v3.4.4 « Lumières vivantes & sol du village »

Version affichée dans les Options : **v3.4.4**

### Ajouté
- **Allumage progressif (2D et 3D) :** lampadaires, torches, torches des aventuriers et des PNJ, fenêtres : allumage de 19h à 21h (crépuscule), extinction de 4h à 6h (aube), avec une courbe douce.
- **7 vraies lumières avec ombres (3D, qualité Haute, de nuit) :** les 7 torches ou lampadaires les plus proches de la caméra sont de vraies lumières ponctuelles avec ombres portées (2 avant). Le nombre est limité automatiquement selon les capacités du téléphone, et baissé si le jeu passe sous 30 images/s.
- **Nouveau sol du village (2D et 3D) :** terre battue détaillée (grain, plaques de teinte, cailloux, brins d'herbe sèche, fissures) et pavés individuels (taille et teinte variées, biseaux, joints sombres, mousse), place avec bordure de grosses pierres, allées pavées alignées. En 3D, le sol du village est une couche en haute résolution avec relief (bump map) : les pavés accrochent la lumière des torches.

### Modifié
- Les nouvelles lumières avec ombres sont rafraîchies à tour de rôle (une par image paire) ; une lumière qui vient de changer de source est rafraîchie en priorité.
- La nuit 2D (voile sombre) et le cycle du soleil 3D gardent leurs horaires (20h-21h / 4h-5h) ; seules les lumières ont la nouvelle rampe.
- Anciennes sauvegardes : aucune donnée modifiée, aucune migration nécessaire.

## v3.4.3 « Architecture maquette & ombres de contact »

Version affichée dans les Options : **v3.4.3**

### Ajouté
- **Bâtiments enrichis (3D) :** bords de toit renforcés (planches d'avant-toit, queues de chevrons, planches de rive sur les pignons), colombages apparents sur les maisons enduites (poteaux, croix de Saint-André au dos, traverse), volets et jardinières fleuries sous les fenêtres de façade, petit auvent au-dessus des portes, corniche et bandeau en pierre sur les bâtiments de pierre.
- **Ombres de contact douces (3D) :** sous chaque bâtiment et étal, chaque arbre et chaque rocher (plans sombres flous regroupés en un seul dessin par catégorie), et une tache mobile sous chaque aventurier, PNJ et monstre au sol.

### Corrigé
- **Rendu 3D de jour (bug de la 3.4.2) :** le planning des ombres sautait la toute première image, ce qui pouvait laisser la 3D vide ou noire au démarrage de jour (erreurs WebGL « shadow sampler »). Corrigé : l'ombre du soleil est calculée dès la première image. **À installer même si tu as déjà publié la 3.4.2.**

### Modifié
- Les détails d'architecture sont de petits volumes (quelques boîtes par bâtiment) plutôt que des textures, pour rester simples et sûrs : coût en triangles négligeable.

## v3.4.2 « Ombres dynamiques »

Version affichée dans les Options : **v3.4.2**

### Ajouté
- **Vraies lumières et ombres de torches (3D, qualité Haute, de nuit) :** deux lumières ponctuelles réelles, placées sur les torches ou lampadaires les plus proches de la caméra (torches des aventuriers, des PNJ, des portes, lampadaires et torches des chemins). Elles éclairent le sol, les murs et les personnages et projettent des ombres portées (personnages, bâtiments, arbres proches).
- Les lumières changent de source en fondu quand la caméra se déplace ; les ombres des torches sont recalculées une image sur deux environ.

### Modifié
- **Coût maîtrisé :** les arbres ne sont pas tous redessinés pour ces ombres : de simples silhouettes d'arbres proches (64 au plus) servent de bloqueurs. Le calcul des ombres du soleil et celui des torches alternent d'une image à l'autre.
- Qualité Moyenne et Basse : pas de lumières à ombres (halos et taches de lumière inchangés). Désactivées aussi de jour et quand la caméra est très éloignée.

## v3.4.1 « Torches des PNJ & yeux néon »

Version affichée dans les Options : **v3.4.1**

### Ajouté
- **Torche à côté de chaque PNJ du village (3D) :** flamme, halo et tache de lumière au sol, allumées la nuit (20h-5h, progressivement) pour éclairer le PNJ.
- **Yeux et traits bleu néon sur les monstres de nuit (3D) :** yeux lumineux et liseré néon (ventre/dos) sur les monstres nocturnes, comme en 2D.
- **Tache de lumière au sol sous la torche des aventuriers** quand ils sont dehors la nuit.

### Modifié
- **Torche des aventuriers :** s'éteint progressivement en entrant dans le village et se rallume en sortant ; dehors, son halo est environ 1,5 fois plus grand et éclaire le sol autour d'eux.
- Les ombres dynamiques (3.4.2) et l'architecture maquette avec ombres de contact (3.4.3) viennent dans les versions suivantes.

## v3.4.0 « Génération aléatoire de la carte »

Version affichée dans les Options : **v3.4.0**

### Ajouté
- **Carte aléatoire à chaque nouvelle partie :** le village peut se trouver n'importe où sur la carte (haut, bas, gauche, droite, centre) et les six zones plus le Trône du Roi sont replacés autour, chacune à un angle libre.
- **Temps de trajet inchangés :** chaque zone garde exactement sa distance au village, donc les mêmes durées de trajet et le même ordre de distance qu'avant.
- **Routes courbes d'abord :** une disposition n'est retenue que si toutes les routes se tracent en courbes sans se croiser ; sinon une autre disposition est tirée.
- **Sauvegarde :** la position du village et du Trône du Roi est enregistrée avec la partie (`tp`, `bp`).

### Modifié
- Rivières, ponts, bande de forêt, caches 2D/3D et caméra 3D (recentrée sur le village) suivent la nouvelle disposition.
- Les parties déjà sauvegardées gardent leur carte actuelle (village en bas) ; la nouvelle carte s'applique à la prochaine partie (après victoire, game over ou « Nouvelle run »).

## v3.3.9 « Cycle solaire 3D & Paysages naturels »

Version affichée dans les Options : **v3.3.9**

### Modifié
- **Cycle horaire 3D aligné sur le jeu :** soleil levé de 5h à 21h (il se déplace, les ombres tournent), lever orangé vers 5h, plein jour jusqu'à environ 19h, coucher orangé de 20h à 21h, nuit de 21h à 4h, aube de 4h à 5h. La lune prend le relais de 21h à 5h.
- **Lumières :** lampadaires, torches et fenêtres s'allument progressivement de 20h à 21h et s'éteignent de 4h à 5h.
- **Rivières (3D) :** lit environ 1,5 fois plus large avec berges de terre et de sable en dégradé ; les ponts sont allongés en conséquence.
- **Biomes (3D) :** transition du sol adoucie autour de chaque zone, avec un bord irrégulier.

### Ajouté
- **Plaines (3D) :** variations de teinte de l'herbe, buissons groupés et petits rochers (moins nombreux en qualité Moyenne et Basse).
- **Village (3D) :** tonneaux et caisses près des bâtiments.

## v3.3.8 « Lisibilité du village & Combats visibles »

Version affichée dans les Options : **v3.3.8**

### Ajouté
- **Icônes gravées sur les toits** (2D et 3D) : chaque bâtiment porte l'icône de son rôle, en incrustation claire sur le toit (lit pour l'auberge, chope pour la taverne, marteau pour la forge, etc. ; maison pour les habitations).
- **Marteau en 3D :** pendant l'amélioration d'un bâtiment, son PNJ tient un marteau et frappe (déjà le cas en 2D).

### Corrigé
- **Monstres en 3D :** ils n'apparaissaient que pour les combats de nuit. Ils s'affichent maintenant face à l'aventurier pendant tout combat, de jour comme de nuit.

### Modifié
- **Lampadaires des bâtiments :** celui qui était à droite du bâtiment passe à gauche, pour ne plus masquer le PNJ (les 2 torches de la porte ne bougent pas).
- **Noms des PNJ :** violet plus clair (2D et 3D).

## v3.3.7 « Veille et lumières »

Version affichée dans les Options : **v3.3.7**

### Ajouté
- **Étoiles de bénédiction en 3D :** 3 étoiles dorées tournent autour de l'aventurier béni (elles remplacent le « ✦✦ » au-dessus du nom).
- **Lumière au sol des torches hors village :** chaque torche des chemins et des zones éclaire maintenant le sol la nuit.

### Corrigé
- **Mode veille :** le bouton 🌑 était recouvert par la carte après l'activation de la 3D (invisible en 2D, sans effet en 3D). Il est de nouveau visible et cliquable dans les deux modes.
- **Nuit en 2D :** au dézoom, la nuit et le fond ne couvraient qu'une partie de la carte (rectangles, jour sur les côtés). Ils couvrent maintenant toute la carte.

## v3.3.6 « Retours de test »

Version affichée dans les Options : **v3.3.6**

### Ajouté
- **Rond de transparence :** en 3D, les arbres (et rochers) qui masquent un aventurier hors du village, en déplacement ou en combat, deviennent transparents sur un rond au bord adouci. Le rond suit le zoom.
- **Torches hors village :** poteaux-torches le long des chemins (environ tous les 60 unités, côtés alternés) et 4 à 5 torches placées au hasard dans chaque zone. Visibles de jour, allumées avec halo la nuit.
- **Sac à dos brillant** sur le dos des aventuriers qui rapportent du butin.
- **« En repos » :** quand la caméra suit un aventurier en repos à l'auberge, son nom s'affiche au-dessus de la porte de l'auberge avec « en repos » en dessous.

### Modifié
- **Chemins du village (3D) :** nouvelle place pavée gris au centre, allées pavées de chaque porte de bâtiment à la place et de chaque entrée du village à la place. Les anciennes boucles sont supprimées. Les routes extérieures en terre se raccordent aux entrées.
- **Rotation à deux doigts :** il faut maintenant environ 30° (au lieu d'environ 13°) avant que la rotation s'enclenche.

## v3.3.5 « Rattrapage de la démo »

Version affichée dans les Options : **v3.3.5**

### Ajouté
- **Éclairage de la démo :** soleil chaud avec ombres marquées (angle selon l'heure), lumière d'appoint, lune bleutée la nuit, palette de couleurs par heure (aube, midi, crépuscule, nuit), ciel dégradé avec disque solaire, lune et étoiles.
- **Étalonnage** (teinte chaude/froide et vignettage) et **éclat lumineux** plus fort la nuit, en qualité Haute.
- **Lampadaires** sur le contour du village et à l'entrée des bâtiments (pas sur les chemins), avec halo et tache de lumière au sol la nuit.
- **Volcan de la démo :** cône plus haut et plus raide, cratère, veines de lave lumineuses sur les pentes, lueur du cratère.
- **Contour de la carte :** bande de forêt dense tout autour et sol étendu au-delà du bord, plus de bord net.

### Modifié
- **Forêt agrandie** (zone de jeu et décor) et beaucoup plus dense, arbres plus grands. Les parties en cours gardent leurs positions de zones.
- Torches de porte : tache de lumière au sol.

## v3.3.4 « Refonte WebGL (4/4) : Finitions et optimisation »

Version affichée dans les Options : **v3.3.4**

### Ajouté
- **Flou de profondeur** (haut et bas de l'écran légèrement flous) et **éclat lumineux** sur fenêtres, torches, lave et éclairs, en qualité Haute.
- **Lucioles** la nuit, uniquement autour des forêts (par temps sec).
- **Fumée** des cheminées du village et du volcan.
- **Qualité 3D** dans les Options (Auto / Haute / Moyenne / Basse) : ombres, flou, éclat, particules et résolution. En Auto, le jeu baisse la qualité tout seul si l'appareil rame.
- **Rotation de la caméra à deux doigts** (le zoom garde la priorité : la rotation ne démarre que si les doigts tournent nettement). Double tap pour recentrer.
- **Compteur fps / triangles** dans le menu Développeur (bouton « Compteur fps (3D) »), pour mesurer sur téléphone.

### Modifié
- **Le mode 2D est de nouveau le mode par défaut** (le bouton 🧊 / 🖼️ des Options bascule en 3D ; le choix déjà enregistré est conservé).
- Résolution adaptative : plafond de résolution selon la qualité.

## v3.3.3 « Refonte WebGL (3/4) : PNJ, monstres, météo et nuit »

Version affichée dans les Options : **v3.3.3**

### Ajouté
- **PNJ en 3D** près de leur bâtiment, avec tenue de métier, animation légère (forgeron qui martèle, etc.) et nom + niveau affichés.
- **Torches murales** de chaque côté de la porte des bâtiments à PNJ, avec halo vacillant la nuit.
- **Monstres en 3D** dans les combats : toutes les familles (loups, araignées, gobelins, squelettes, spectres, dragons, démons, arbres…) et boss, en volumes stylisés de taille variable.
- **Météo 3D :** pluie dont les gouttes tombent et éclaboussent sur la carte, nuages, ciel assombri, brouillard réel, **orage avec éclairs** (foudre et flash de lumière). La météo 2D reste en repli.
- **Torche en main** des aventuriers la nuit, avec halo chaud.
- **Puits** dès 4 bâtiments, **palissade en bois** dès 8, **muraille de pierre** dès 12, avec une porte sur chaque route.

### Modifié
- Le halo des aventuriers est déplacé sur leur torche.

### Corrigé
- Les noms (PNJ, aventuriers, zones) et les panneaux 2D s'affichent de nouveau par-dessus la vue 3D.

## v3.3.2 « Biomes et bâtiments au niveau de la démo »

Version affichée dans les Options : **v3.3.2**

### Ajouté
- **Textures procédurales** (pierre, briques, enduit, tuiles, bois, pavés) générées en code, sans image externe ; une seule texture par matière, tous les objets d'une matière fusionnés en un maillage.
- **Forêts et pins :** chênes en 3 teintes (dont quelques arbres d'automne) aux feuillages bruités et dégradés, pins, pins enneigés en montagne, buissons, rochers.
- **Montagne :** pics rocheux irréguliers à sommet enneigé.
- **Mine :** entrée en pierre et bois avec galerie sombre, rails, wagonnet chargé, tonneaux, lanterne, falaise de rochers.
- **Ruines :** dalles moussues, deux rangées de colonnes (entières ou brisées, tambours au sol), linteau, murs en ruine, tour éventrée, gravats.
- **Donjon et Trône du Roi :** châteaux fermés (murailles, créneaux, 4 tours à toit conique, porte à herse, tours de porte, donjon central, drapeau). Trône du Roi : petit, pierre sombre, toits violets, fenêtres violettes.
- **Volcan :** cratère de lave et coulées lumineuses.
- **Rivières animées** (ruban d'eau qui défile), **routes pavées** et **ponts en bois** avec garde-corps et culées de pierre.
- **Bâtiments du village :** toits à deux pans en tuiles, murs en pierre, enduit à colombages ou planches, cheminées, portes, fenêtres à volets. Maisons (toit à la couleur de l'aventurier), auberge et taverne (enseigne, tonneaux), forge (braises, enclume), sanctuaire (clocher et croix), écurie (foin, enclos), mairie (tour d'horloge, drapeau), intendant (bannière), chancelier (tourelle).
- **Fenêtres allumées la nuit** (et horloge de la mairie).

### Corrigé
- Aucun correctif dans cette version.

### Modifié
- `gl.js` uniquement : décor des zones, village, rivières, routes et ponts réécrits. Arbres, rochers et buissons répartis en cellules de 200 pour que seuls ceux visibles soient dessinés.
- Aucun changement de jeu, d'équilibre ni de sauvegarde (anciennes sauvegardes chargées telles quelles).

## v3.3.1 « Carte agrandie et contrôles 3D »

Version affichée dans les Options : **v3.3.1**

### Ajouté
- **Contrôles 3D comme en 2D :** la carte suit le doigt au glissement (le point touché reste sous le doigt) et le pincement zoome autour des doigts.

### Modifié
- **Carte beaucoup plus grande :** `MS` 2,5 → 6 (carte ×2,4) et `ZS` 2 → 5 (zones ×2,5), positions de base et du Trône du Roi mises à l'échelle (`state.js`, `data.js`). Le village garde sa taille et ses bâtiments, mais ses emplacements sont espacés de 20 % (1,25 → 1,5 dans `slot`, `map.js`) pour être moins dense. Les durées de trajet ne changent pas (elles sont calculées sur la distance divisée par `MS`).
- **Anciennes sauvegardes :** conversion automatique (`migMap` dans `save.js`) des zones, croix de mort et aventuriers ; version de sauvegarde 5.
- **Rotation de la caméra bloquée** pour l'instant (elle gênait le zoom). Elle revient en 3.3.4 si elle ne gêne plus.
- Rivières : zone d'exclusion autour du village agrandie. Décor 3D des zones adapté à leur nouvelle taille.
- Mode 2D : la carte étant plus grande, la texture du sol est calculée à plus faible résolution (plafond de 8 millions de pixels) pour rester légère.
- Les biomes et bâtiments 3D sont encore simples : le niveau de détail de la démo arrive en 3.3.2.
- `sw.js` : cache `bv-v55`. `three.min.js` et `manifest.webmanifest` ne changent pas.
- Équilibre : sur 5 parties de 20 jours par version (4 aventuriers, or illimité), départs en quête 98 en moyenne avant, 113 après (écart entre parties très fort, de 55 à 151) : pas de baisse mesurable. Aucune constante à ajuster.
- Testé (Node, API simulée) : 300 placements de zones sans repli ni chevauchement (écart minimal 6,1), démarrage, 20 jours, sauvegarde et rechargement, chargement d'une sauvegarde de la 3.2.6 (durées restantes quasi identiques), repli 2D, 0 erreur. Testé en navigateur (rendu logiciel) : le point sous le doigt reste sous le doigt au glissement et au pincement (écart 0), captures de la carte et du mode 2D.
- Non vérifié ici : le ressenti tactile réel, les fps et la batterie sur Z Fold 3.

## v3.3.0 « Refonte WebGL (1/3) : Carte, village et héros en 3D »

Version affichée dans les Options : **v3.3.0**

### Ajouté
- **Carte en 3D (WebGL) :** terrain en relief, routes, rivières et ponts construits depuis les vraies données de la partie ; décor 3D pour chaque zone (forêt, mine, montagne, ruines, donjon, volcan) et châteaux pour le Donjon et le Trône du Roi.
- **Village en 3D :** bâtiments, chantiers avec échafaudage, taille selon le niveau des PNJ.
- **Aventuriers en 3D :** 4 classes × 2 genres, avec marche, combat, cheval, bénédiction et butin.
- **Caméra :** 1 doigt pour se déplacer, 2 doigts pour tourner et zoomer, tap sur un aventurier pour le suivre, double tap pour la vue d'ensemble.
- **Option 2D / 3D** dans les Options. Si WebGL est indisponible, le jeu reste en 2D automatiquement.
- Nouveaux fichiers : `three.min.js` (bibliothèque Three.js embarquée) et `gl.js`.

### Modifié
- Aucun changement d'équilibre ni de sauvegarde : le rendu seul change. Le 2D est inchangé.
- Pas encore en 3D (prévu en 3.3.1) : PNJ du village, monstres en combat, météo et nuit détaillées. La météo reste le calque d'écran habituel.
- `sw.js` : cache `bv-v54`, liste de fichiers complétée. `manifest.webmanifest` n'est pas modifié.
- Testé (Node, API simulée) : démarrage, simulation de 20 jours, sauvegarde et rechargement, chargement d'une sauvegarde de la 3.2.6, repli 2D quand WebGL échoue, 0 erreur. Testé en navigateur (rendu logiciel) : captures de la carte, du village, des aventuriers, du jour et de la nuit.
- Non vérifié ici : les fps et la batterie sur Z Fold 3, et le sens de rotation à deux doigts.

## v3.2.6 « Bouton plein écran »

Version affichée dans les Options : **v3.2.6**

### Ajouté
- **Bouton plein écran (⛶) :** dans l'onglet Options, à côté du bouton musique et du bouton thème. Il masque la barre d'état du téléphone (et la barre du navigateur sur PC) ; un second appui revient à l'affichage normal (icône 🗗). Il faut le retoucher à chaque lancement du jeu (le navigateur l'exige). Le bouton est caché si le navigateur ne permet pas le plein écran (par exemple iPhone). La carte se recalcule toute seule (v3.2.5).

### Modifié
- Aucun changement de jeu ni d'équilibre. `manifest.webmanifest` n'est pas modifié.
- Testé (Node, API simulée) : bouton affiché ou caché selon le support, entrée et sortie du plein écran, icône mise à jour par l'événement, refus du navigateur sans erreur, équivalence avec la 3.2.5 sur 2 parties de 20 jours, 0 erreur.
- Non vérifié : le comportement réel sur ton téléphone (barre d'état bien masquée, éventuel message système à l'entrée).
- Fichiers : `index.html`, `style.css`, `save.js`, `main.js`, `sw.js`. Cache du service worker passé à `bv-v53`. Version affichée dans les Options : v3.2.6.

## v3.2.5 « Affichage adaptatif, Thème Jour/Nuit & Halo »

Version affichée dans les Options : **v3.2.5**

### Ajouté
- **Thème Jour/Nuit :** nouveau bouton 🌙/☀️ dans l'onglet Options, à côté du bouton musique. Nuit = thème sombre AMOLED (par défaut, même si le téléphone est en mode clair), Jour = thème clair lisible en extérieur. Réglage mémorisé dans `localStorage` (`bvth`), commun à toutes les parties, absent de la sauvegarde de partie. La couleur de la barre du navigateur suit le thème. La carte garde son propre cycle jour/nuit.
- **Affichage adaptatif :** la carte recalcule sa taille à chaque changement de fenêtre, d'orientation ou de zone visible (dépliage du Z Fold, redimensionnement PC), sans à-coup : la caméra garde le même point de vue.

### Modifié
- **Mise en page en colonne unique plus large :** largeur maximale 720 px (480 avant). La carte est limitée par la hauteur visible de l'écran (le ratio du monde, 1,3, est conservé) : elle ne déborde plus sur écran bas, paysage ou fenêtre PC, et reste centrée. Le bouton veille 🌑 suit le coin de la carte.
- **Halo nocturne :** le point lumineux des aventuriers passe de la tête au torse (le visage est dégagé). Taille et couleur inchangées.
- Équilibre inchangé : 2 parties de 20 jours à graine identique, avec la 3.2.4 : résultats identiques. Sauvegarde 3.2.4 chargée en 3.2.5, 10 jours de jeu : 0 erreur.
- Testé (Node) : tailles de carte pour écran plié (340 px de large utile : carte 340 × 442), déplié, PC et petit écran ; caméra conservée au redimensionnement ; bascule et rechargement du thème ; capture de nuit avant/après (halo sur le torse).
- Non vérifié : le rendu réel sur ton téléphone et sur PC (le thème Jour complet, le comportement exact au dépliage), car je n'ai testé qu'avec des écrans simulés.
- Fichiers : `index.html`, `style.css`, `save.js`, `map.js`, `main.js`, `sw.js`. Cache du service worker passé à `bv-v52`. Version affichée dans les Options : v3.2.5.

## v3.2.4 « Assaut préparé contre le Roi Démon »

Version affichée dans les Options : **v3.2.4**

### Ajouté
- **Champion du Roi Démon :** le bouton « Défier le Roi Démon » choisit le **meilleur aventurier vivant** (puissance la plus élevée), quelle que soit son action en cours. Il ne part plus directement : il doit d'abord se préparer. Une fois choisi, le bouton est grisé et affiche « X se prépare » ; on ne peut ni annuler ni changer de champion. Le champion est signalé « ⚔️ champion » dans la liste des aventuriers.
- **Séquence de préparation :** retour au village (il termine d'abord le combat en cours, dépose son butin à la Mairie), repos complet, puis Armurerie (si une pièce l'intéresse), Forge (il y dépense tout son or, plusieurs achats si besoin, sans garder d'épargne pour la maison ou le cheval), une bénédiction au Sanctuaire (une seule tentative), puis départ en duel. Sans Forge ni Sanctuaire construits, il saute l'étape.
- Le champion part même la nuit. La puissance du Roi Démon ne dépend pas du jour ou de la nuit (inchangé).

### Modifié
- Le champion ne sert pas de compagnon aux expéditions de guilde pendant sa préparation. S'il est déjà en expédition de groupe, il finit ce combat avec son groupe, puis rentre.
- Anciennes sauvegardes : nouveaux champs facultatifs sur l'aventurier (`kg`, `kb`), aucune migration dans `loadG`.
- Équilibre inchangé hors Roi Démon : 3 parties de 20 jours, graines identiques, avec la 3.2.3 : résultats identiques (or, bois, pierre, tués, niveaux).
- Testé (Node) : champion pris en pleine quête ou combat, au repos, au village ; départ de nuit ; sans Forge ni Sanctuaire ; second appui ignoré ; sauvegarde puis rechargement en pleine préparation (il repart au Roi) ; sauvegarde 3.2.3 chargée en 3.2.4 puis 10 jours de jeu ; 0 erreur.
- Non vérifié : l'affichage du bouton et de l'étiquette « ⚔️ champion » sur ton téléphone, et le rendu visuel (aucun changement de dessin).
- Fichiers : `state.js`, `village.js`, `combat.js`, `ui.js`, `index.html`, `sw.js`. Cache du service worker passé à `bv-v51`. Version affichée dans les Options : v3.2.4.

## v3.2.3 « Maison des Guildes (2/2) : Entraide & Groupes »

Version affichée dans les Options : **v3.2.3**

### Ajouté
- **Expéditions de groupe :** quand un membre d'une guilde active part en quête, les compagnons de sa guilde déjà prêts à partir (repos presque terminé, `GRDY` = 30 s, pas en attente de l'Armurerie, pas de nuit sauf audacieux) partent avec lui, sans attente, dans la limite de l'effectif de la guilde. Message « 🐺 Les Loups Noirs (3) part en expédition : Forêt. ». Toutes les zones classiques sont concernées ; le Roi Démon (`sendBoss`) reste toujours solo.
- **Combat de groupe :** le groupe choisit sa zone avec sa puissance totale et arrive ensemble (les premiers arrivés passent à l'état « en position » en attendant les autres), puis combat d'un seul bloc contre un seul ennemi. Puissance du groupe = somme des puissances × (1 + 5 % par compagnon en plus) (`GB`). Victoire : pour tous. Sinon : chaque membre risque la mort avec sa chance habituelle (Sanctuaire compris) ou fuit blessé, individuellement.
- **Butin de groupe :** or, bois et pierre partagés à parts égales ; XP complète pour chaque membre ; une seule pièce d'équipement possible par victoire (tirée au sort parmi les membres) ; prime de monstre au chef.
- **Caisse commune :** chaque membre verse 10 % de l'or gagné en quête (`GTAX`), prélevé sur sa propre bourse (le village garde ses 70 %). La caisse paie l'achat Forge des recrues de la guilde (niveau inférieur à 5), tant qu'elle a de l'or et que la guilde est active ; le message d'achat indique la part payée par la caisse. Les recrues sans guilde n'ont pas cet avantage (l'Armurerie reste ouverte à toutes les recrues).
- **Recrutement de guilde :** un nouvel aventurier rejoint automatiquement la guilde active la plus remplie qui a de la place. Les aventuriers de niveau 5 sans guilde peuvent toujours passer à la Maison (rejoindre, ou fonder s'il reste une place de guilde).
- **XP du Chancelier :** +10 par fondation, +5 par adhésion (visite ou recrue), +3 par départ en groupe (`AXF`, `AXJ`, `AXG`), avec les seuils des autres PNJ (20 × niveau). Aux niveaux 3 et 6 : rénovation de 5 à 10 min, comme les autres PNJ.
- **Affichage :** sur la ligne d'un membre : guilde, 👑 pour le chef, 💤 si elle est en sommeil, « en groupe avec X, Y » pendant l'expédition, état « en position ». Sur la ligne du Chancelier : « ⚜️ Guildes : 2/3 (1 en sommeil) · 👥 4 max · 💰 Caisses : 45 or ».

### Corrigé
- **Effectif des guildes (règle 3.2.2 mal comprise) :** l'effectif maximum d'une guilde dépend du niveau du Chancelier : 2 au niveau 1, +1 par niveau, 6 au maximum (`GSZ0`, `GSZM`). Le niveau de la Maison des Guildes fixe le nombre de guildes : niveau 1 = 1 guilde, +1 par niveau, sans plafond (`gmax`).
- **Sommeil et dissolution (règle 3.2.2 mal comprise) :** une guilde a un chef (le fondateur, de niveau 5 minimum). Quand le chef meurt, un membre de niveau 5 ou plus prend la tête ; s'il n'y en a pas mais qu'il reste des membres, la guilde passe en sommeil. Elle renaît dès qu'un de ses membres atteint le niveau 5. Plus aucun membre : la guilde est dissoute. Le recrutement est fermé pendant le sommeil. Une guilde en sommeil occupe toujours une place de guilde.

### Modifié
- Anciennes sauvegardes : les guildes 3.2.2 (sans chef) reçoivent leur chef (membre de plus haut niveau, s'il est niveau 5 ou plus, sinon sommeil) sans message, et les guildes vides sont dissoutes (avec un message). Les nouveaux champs (`o`, `sl`, `f` des guildes ; `gp`, `gl` des aventuriers ; `gpn` de la partie) sont facultatifs ; aucune migration dans `loadG`.
- La visite à la Maison ne permet plus de « relancer » une guilde en sommeil (la règle de renaissance passe par le niveau 5 d'un membre).
- Équilibre : sans guilde, parties de 20 jours à graine identique identiques à la 3.2.2 (or, bois, pierre, tués, morts). Scénario guilde (4 aventuriers de niveau 6, 6 graines, 15 jours), solo contre guilde : quêtes par jour (toutes personnes confondues) 7,0 contre 6,2 (Chancelier niveau 3, groupes de 4 maximum) et 7,1 (niveau 1, groupes de 2 maximum) ; morts 15,7 contre 13,0 et 16,0 ; or du village 201 contre 266 et 126 ; départs en groupe 10,5 et 7,5, de taille moyenne 2,3 et 2,2 (les compagnons sont rarement prêts en même temps). Résultats très variables d'une graine à l'autre (6 parties seulement). Constantes à ajuster : `GB` (bonus de groupe), `GRDY` (fenêtre de départ commun, plus grande = groupes plus gros), `GTAX` (caisse) ; `AXF`, `AXJ`, `AXG` (XP du Chancelier) ; `GMIN`, `GSZ0`, `GSZM` (village.js).
- Calibrage du Chancelier : sur 15 jours dans le même scénario, environ 86 XP en moyenne, contre 81 (Aubergiste) et 97 (Maire) : même rythme que les PNJ existants.
- Testé (Node) : effectif et nombre de guildes par niveau, fondation (chef et XP), inscription automatique des recrues (guilde pleine, places gagnées par le Chancelier), succession du chef, sommeil, recrutement fermé pendant le sommeil, renaissance au niveau 5, dissolution, compagnons prêts ou non, arrivée synchronisée, combat commun, groupe fort ou écrasé (morts et fuites individuelles, victoire tout ou rien), Roi Démon solo, prélèvement de la caisse, achat Forge payé par la caisse, aide réservée aux recrues de guilde active, sauvegarde puis rechargement en plein groupe, sauvegarde 3.2.2 avec guildes sans chef, dessin avec des aventuriers « en position » et en combat, 0 erreur.
- Non vérifié : le rendu sur ton téléphone ; et la lisibilité de la console pendant un combat de groupe (un message de victoire ou de défaite par membre).
- Fichiers : `village.js`, `combat.js`, `ui.js`, `index.html`, `sw.js`. Cache du service worker passé à `bv-v50`. Version affichée dans les Options : v3.2.3.

## v3.2.2 « Maison des Guildes (1/2) : Bâtiment & Fondation »

Version affichée dans les Options : **v3.2.2**

### Ajouté
- **Maison des Guildes (⚜️) :** nouveau bâtiment unique et améliorable, à construire depuis l'onglet Bâtir. Coût : `30+25×niv` bois, `30+30×niv` pierre, `80+80×niv` or. Chantier avec un aventurier bâtisseur, puis améliorations par fermeture de 1 à 2 jours, comme les autres bâtiments. Dessin : façade claire, toit pourpre, fanion doré sur le toit et grande bannière pourpre sur un mât ; aspect amélioré aux niveaux 3 et 6 du Chancelier.
- **Chancelier :** PNJ de la Maison des Guildes (robe pourpre, chapeau, parchemin 📜), nom et genre tirés comme les autres PNJ. Pas encore de source d'XP (elle arrive en 3.2.3 avec sa montée de niveau). Aux niveaux 3 et 6 : rénovation de 5 à 10 min, comme les autres PNJ.
- **Guildes (`S.guilds`) :** un aventurier de niveau 5 ou plus (`GMIN`, village.js) sans guilde peut en rejoindre ou en fonder une. Il ne va à la Maison que s'il y a un intérêt : une guilde avec de la place (5 membres maximum, `GSZ`) ou une place de guilde libre. Cette visite est décidée après ses autres achats au village (maison, cheval, forge), une seule fois par retour de quête et tant qu'il n'a pas de guilde. Durée sur place : 20 à 30 s avec file d'attente.
- **Nombre de guildes :** niveau 1 de la Maison = 2 guildes, +1 par niveau, 6 au maximum (`GMAXN`).
- **Choix de la guilde :** il rejoint d'abord la guilde active qui a le plus de membres et de la place, sinon une guilde en sommeil (qu'il relance), sinon il en fonde une nouvelle (gratuit pour l'instant).
- **Nom et bannière :** générés automatiquement parmi 10 modèles (nom, emblème, couleur), par exemple « Les Loups Noirs 🐺 ». Messages « 🐺 Nom fonde la guilde « … » », « rejoint la guilde », « relance la guilde ».
- **Guilde en sommeil :** quand le dernier membre meurt, la guilde n'est pas supprimée : elle garde son nom, son emblème et sa place, et attend un aventurier de niveau 5 qui la relance.
- **Affichage :** emblème et nom de la guilde sur la ligne de chaque membre (onglet Aventuriers) ; sur la ligne du Chancelier : « 📜 Nom Chancelier niv. 1 · ⚜️ Guildes : 2/3 (1 en sommeil) ».

### Corrigé
- Rien dans cette version.

### Modifié
- Pas d'effet de gameplay en dehors de la visite à la Maison (déplacement et 20 à 30 s, une seule fois par aventurier, tant qu'il n'est pas en guilde) : les départs en groupe et la caisse commune arrivent en 3.2.3.
- Anciennes sauvegardes : `loadG` (save.js) ajoute `guilds` (vide) et `guildh` (0). Le champ `gu` des aventuriers est absent des anciens (= sans guilde). Les données de guildes sont propres à la partie.
- Équilibre : sans Maison des Guildes, parties de 20 jours à graine identique identiques à la 3.2.1 (or, bois, pierre, tués, morts). Dans 3 parties automatiques de 25 jours, un seul aventurier atteint le niveau 5 (1 guilde fondée au jour 10) : le niveau 5 est donc long à atteindre avec ce joueur automatique. Constantes à ajuster : `GMIN`, `GSZ`, `GMAXN` (village.js).
- Testé (Node) : niveau 4 sans visite, fondation au niveau 5, adhésion à la guilde la plus remplie, guilde pleine (5) puis seconde guilde, plafond atteint sans visite, plafonds niveau 1 / 2 / 5 / 6 (2 / 3 / 6 / 6), guilde en sommeil conservée puis relancée avant toute fondation, Maison fermée sans visite, aventurier déjà en guilde sans visite, pastilles d'affichage, noms uniques, sauvegarde puis rechargement, sauvegarde 3.2.1 (Armurerie et coffre) chargée puis 12 jours avec Maison, 0 erreur.
- Non vérifié : le rendu sur ton téléphone (captures faites sur ordinateur : jour, niveaux 1 et 6 du Chancelier, chantier, nuit).
- Fichiers : `data.js`, `state.js`, `village.js`, `save.js`, `ui.js`, `map.js`, `index.html`, `sw.js`. Cache du service worker passé à `bv-v49`. Version affichée dans les Options : v3.2.2.

## v3.2.1 « Armurerie de Guilde (2/2) : Attribution & PNJ »

Version affichée dans les Options : **v3.2.1**

### Ajouté
- **Équipement des recrues :** un nouvel aventurier passe à l'Armurerie, une seule fois, avant sa première quête (après un éventuel chantier). Il y prend gratuitement des pièces du coffre, séjourne 20 à 30 s avec file d'attente comme dans les autres bâtiments, puis enchaîne comme avant (bénédiction du Sanctuaire si possible, sinon départ en quête). Message « 🛡️ Nom s'équipe à l'Armurerie : Épée 3, Bottes 2. ». Libellé de l'onglet Aventuriers : « à l'Armurerie ».
- **Choix des pièces :** pour chaque emplacement de sa classe (arme de sa classe, armure, bottes, bouclier pour le Guerrier), la pièce la plus forte que le niveau de l'Intendant autorise ; si la meilleure est trop forte, celle juste en dessous, et ainsi de suite ; jamais une pièce moins bonne que celle qu'il porte déjà. Les pièces prises quittent le coffre.
- **Plafond selon le niveau de l'Intendant :** palier maximum distribuable = 3 × niveau de l'Intendant (constante `ACAP`, village.js). Les pièces plus fortes restent dans le coffre en attendant qu'il monte de niveau.
- **Progression de l'Intendant :** 4 XP par pièce récupérée à la mort d'un aventurier (`AXR`) et 8 XP par pièce distribuée à une recrue (`AXD`), avec les seuils des autres PNJ (20 × niveau). Aux niveaux 3 et 6 : aspect amélioré et rénovation de 5 à 10 min (bâtiment fermé), comme les autres PNJ.

### Corrigé
- Rien dans cette version.

### Modifié
- Aventuriers existants et sauvegardes 3.2.0 : seules les recrues créées à partir de cette version passent à l'Armurerie (champ `arm`, absent des anciens aventuriers = pas de visite). Aucune migration nécessaire, le coffre et les niveaux sont conservés.
- Armurerie absente, en chantier ou fermée, ou rien d'utilisable dans le coffre : la recrue part comme avant et le coffre reste intact.
- Équilibre : sans Armurerie, parties de 20 jours à graine identique identiques à la 3.2.0 (or, bois, pierre, tués, morts). Les pièces du coffre sont gratuites : elles remplacent des achats à la Forge pour les recrues, à surveiller.
- Calibrage de l'Intendant (6 parties de 25 jours avec un joueur automatique qui ne construit que l'Armurerie) : niveau 2 au jour 7 et au jour 16 pour 2 parties, 16 XP sur 20 à la fin pour 2 autres, 0 à 4 XP pour les 2 dernières (peu de pièces équipées à la mort). Constantes à ajuster : `AXR`, `AXD`, `ACAP` (village.js) et `ARC0`, `ARC1`, `ARCM` (combat.js).
- Testé (Node) : choix des pièces (plafond, classe, « en dessous », pas meilleur que le sien, Voleur sans bouclier), parcours complet d'une recrue (visite, équipement, départ en quête, une seule visite), Armurerie fermée, coffre vide, ancien aventurier sans champ `arm`, sauvegarde puis rechargement en plein trajet, sauvegarde 3.2.0 avec coffre chargée puis 10 jours de jeu, 0 erreur.
- Non vérifié : le rendu sur ton téléphone (aucun changement de dessin dans cette version, seulement l'animation de l'Intendant quand une recrue s'équipe).
- Fichiers : `village.js`, `combat.js`, `index.html`, `sw.js`. Cache du service worker passé à `bv-v48`. Version affichée dans les Options : v3.2.1.

## v3.2.0 « Armurerie de Guilde (1/2) : Bâtiment & Coffre »

Version affichée dans les Options : **v3.2.0**

### Ajouté
- **Armurerie (🛡️) :** nouveau bâtiment unique et améliorable (comme la Forge ou la Taverne), à construire depuis l'onglet Bâtir. Coût : `20+20×niv` bois, `30+25×niv` pierre, `60+70×niv` or (même ordre que le Sanctuaire). Chantier avec un aventurier bâtisseur, puis améliorations par fermeture de 1 à 2 jours, comme les autres bâtiments. Dessin : façade en pierre, toit bleu acier, écu sur le mur et râtelier de lances ; l'aspect évolue aux niveaux 3 et 6 de l'Intendant (fanion doré, lanternes), comme pour les autres bâtiments.
- **Intendant :** PNJ de l'Armurerie (chapeau, trousseau de clés 🗝️), nom et genre tirés comme les autres PNJ. Il gagne 1 XP par pièce récupérée dans le coffre (20 × niveau XP par niveau) ; aucune autre source d'XP avant la 3.2.1. Aux niveaux 3 et 6, rénovation de 5 à 10 min (bâtiment fermé), comme les autres PNJ.
- **Coffre commun (`S.chest`) :** à la mort d'un aventurier, une seule pièce d'équipement (tirée au hasard parmi celles qu'il porte, palier > 0, avec sa classe et son palier) a une chance d'être récupérée. Chance : 35 % au niveau 1 de l'Armurerie, +10 points par niveau, 90 % maximum (constantes `ARC0`, `ARC1`, `ARCM`, combat.js). Coffre illimité, propre à la partie (rien n'est conservé d'une run à l'autre). Message « 🛡️ L'Armurerie récupère Épée 3 de … » dans la console.
- **Affichage du coffre :** sur la ligne de l'Intendant (onglet Aventuriers) : « 🗝️ Nom Intendant niv. 1 · 🛡️ Coffre : 3 pièces ».

### Corrigé
- Rien dans cette version.

### Modifié
- Sans Armurerie utilisable au moment de la mort (absente, en chantier, fermée pour amélioration ou rénovation), l'équipement est perdu, comme avant.
- Les pièces du coffre ne sont pas encore distribuées (attribution aux recrues en 3.2.1). Aucun effet sur la puissance, l'or ou la mortalité : équilibre inchangé.
- Anciennes sauvegardes : `loadG` (save.js) ajoute `chest` (vide) et `armory` (0). Pas de changement du numéro de version de sauvegarde.
- Testé (Node) : 2 parties de 20 jours à graine identique, ancienne et nouvelle version, sans Armurerie : résultats identiques (or, bois, pierre, tués, morts). 3 parties de 20 jours avec Armurerie : 0 erreur, 0 à 4 pièces au coffre. Chances mesurées sur 4 000 morts simulées par niveau : 35 % (niv. 1), 46 % (niv. 2), 54 % (niv. 3), 75 % (niv. 5), 91 % (niv. 7), 89 % (niv. 12). Cas vérifiés : bâtiment absent, en chantier ou en amélioration (rien récupéré), une seule pièce par mort, héros sans équipement, pas de bouclier récupéré pour une classe sans bouclier, XP de l'Intendant, pastille du coffre, sauvegarde puis rechargement, sauvegarde 3.1.9 chargée puis Armurerie construite.
- Non vérifié : le rendu sur ton téléphone (captures faites sur ordinateur : jour, nuit, chantier, niveaux 1 et 6 de l'Intendant).
- Fichiers : `data.js`, `state.js`, `combat.js`, `ui.js`, `map.js`, `save.js`, `index.html`, `sw.js`. Cache du service worker passé à `bv-v47`. Version affichée dans les Options : v3.2.0.

## v3.1.9 « Correctif Sanctuaire & Top 10 »

Version affichée dans les Options : **v3.1.9**

### Ajouté
- **Cheval dans le Top 10 :** un aventurier mort avec un cheval affiche « 🐎 » et la vitesse (ex. 🐎7) après son niveau. Champ `hs` (vitesse du cheval) ajouté à l'entrée du classement ; les anciennes entrées n'ont pas l'info et n'affichent rien.

### Corrigé
- **Doublon du Sanctuaire (et Forge, Taverne, Écurie) :** améliorer un bâtiment en créait un second, sans PNJ. Désormais l'amélioration ferme le bâtiment existant (échafaudage, « 🔨 % », aspect actuel, comme une rénovation) pendant 1 à 2 jours de jeu (`R(900,1800)` dans `build`, combat.js), sans aventurier bâtisseur nécessaire, puis son niveau monte. Les ressources sont payées au lancement ; le bouton est grisé tant que le bâtiment est en travaux. La Maison reste multiple (un nouveau chantier par achat).
- **Nettoyage des sauvegardes (`mig6`, save.js) :** pour chaque type avec un doublon, les bâtiments en trop (les plus récents) sont supprimés, leur niveau est retiré et leur coût remboursé (message dans la console), comme `mig5`. Numéros de bâtiments recompactés, aventuriers concernés redirigés.

### Modifié
- Les aventuriers qui allaient vers un bâtiment qui passe en travaux abandonnent cette tâche (file d'attente comprise) ; un aventurier déjà en action termine.
- Gameplay et équilibre inchangés en dehors de ce correctif : avant, le niveau supérieur apparaissait dans un second bâtiment ; maintenant le bâtiment est fermé pendant les travaux.
- Testé (Node) : 3 parties de 20 jours avec dessin régulier, 0 erreur, 0 doublon, sauvegarde puis rechargement (aussi en pleine amélioration), sauvegarde 3.1.8 avec Sanctuaire et Forge en double (remboursement 200 or, 90 bois, 105 pierre, niveaux 2 → 1, amélioration ensuite correcte), mort d'un héros monté dans le Top 10.
- Non vérifié : le rendu du bâtiment en travaux et du Top 10 sur ton téléphone (pas de capture).
- Fichiers : `combat.js`, `village.js`, `save.js`, `ui.js`, `index.html`. Cache du service worker passé à `bv-v46`. Version affichée dans les Options : v3.1.9.

## v3.1.8 « Taverne : Primes & Contrats »

Version affichée dans les Options : **v3.1.8**

### Ajouté
- **Primes sur les monstres :** la Taverne propose des contrats « monstre → or ». Le niveau de la Taverne débloque les zones : niveau 1 = Forêt, niveau 2 = + Mine, … niveau 6 = + Volcan (tirage favorisant les zones hautes). Monstres de jour (70 %) ou de nuit (30 %) de la sous-zone de la partie ; ni Roi Démon ni Champion légendaire.
- **Renouvellement :** un nouveau lot tous les 2 jours (au changement de jour) ; les primes non réclamées sont perdues. Nombre de contrats : 1 + 1 par tranche de 3 niveaux de Tavernier, 4 maximum.
- **Montant :** force du monstre × 0,8, +4 % par niveau de Tavernier, 2 or minimum (constantes `PRM`, `PRL`, `PRMIN`, village.js). Niveau 1 : quelques pièces, sans effet sur l'économie.
- **Versement :** la prime est réservée au premier aventurier qui bat le monstre ; il passe 25 à 35 s à la Taverne (file d'attente comme ailleurs, après la Mairie) pour la toucher dans sa bourse, pas dans la caisse du village. Message « 🎯 … touche la prime » dans la console. Sans Taverne disponible (chantier, rénovation), la prime est versée directement.
- **Affichage :** pastille violette « 🎯 Primes : Loup (Forêt) 3 or · … » dans l'onglet Aventuriers.
- **Tavernier :** 2 XP par prime versée (`TVX`).
- Champs de sauvegarde `S.pr` (contrats), `S.pd` (jour du prochain lot), `h.prime` (prime en attente de paiement), créés tout seuls.

### Corrigé
- Aucun correctif dans cette release. (Les notes 3.1.6 et 3.1.7 décrivaient mal mes simulations : c'étaient 3 villages sur 20 tranches de 15 jours consécutives, pas 60 parties neuves. Les comparaisons restent valables, la description est corrigée.)

### Modifié
- **Ancien fonctionnement supprimé :** plus de repas 🍖 (achat, +8 % de puissance) ni de repos −12 % par niveau de Taverne. Les aventuriers ne changent pas leur choix de zone à cause des primes (bonus de chance pure ; une IA qui en tient compte pourrait lire `S.pr` dans `pick`, combat.js).
- **Équilibre** (ancien → nouveau). Parties neuves, 3 × 20 parties de 15 jours : or gagné 303-387 → 250-384, victoires 50-65 → 41-64, morts 11-12 → 11-12 ; 0,8-1,3 prime réclamée par partie (environ 3 or). Village avancé, 2 villages × 20 tranches de 15 jours : or 1328-1338 → 1095-1490, victoires 119-142 → 127-132, morts 18-19 → 16-17 ; 3,4-6,3 primes par tranche (28-66 or, soit 2 à 5 % de l'or) ; niveau de Tavernier 3,0-4,0 → 2,6-3,4. La suppression du repos −12 % ne se voit pas dans le bruit. Pour des primes plus généreuses : `PRM` ; pour un Tavernier plus rapide : `TVX`.
- **Migration (save.js) :** les repas en cours (tâche « taverne », 🍖) sont annulés ; le premier lot de primes est créé au chargement si une Taverne existe. Une sauvegarde 3.1.7 se charge et se joue (testé).
- Testé (Node) : parties de 20 jours avec dessin, sauvegarde puis rechargement, passage de 25 à 35 s à la Taverne vérifié, sauvegarde 3.1.7 avec repas en cours.
- Non vérifié : le rendu de la pastille et la lisibilité de la ligne sur ton téléphone, le ressenti des montants sur de longues parties.
- Fichiers : `village.js`, `combat.js`, `state.js`, `save.js`, `ui.js`, `index.html`. Cache du service worker passé à `bv-v45`. Version affichée dans les Options : v3.1.8.

## v3.1.7 « Forge, Écurie & Maisons »

Version affichée dans les Options : **v3.1.7**

### Ajouté
- **Héritage des maisons :** quand le propriétaire meurt, sa maison revient en vente avec 10 % de réduction par mort, cumulés, plafonnés à −50 % (50 → 45 → 40 → 35 → 30 → 25 or). Champ `dn` (nombre de morts) sur chaque maison, créé tout seul.

### Corrigé
- **Maisons jamais achetées :** le cheval passait avant la maison, et l'objectif d'épargne visait le moins cher des deux. La maison passe maintenant avant le cheval et devient l'objectif d'épargne d'un aventurier sans maison quand une est en vente.

### Modifié
- **Forge :** le palier d'équipement acheté par le niveau du héros (niv. ÷ 2) est plafonné à 2 × niveau de la Forge ; le bonus du Forgeron (+1 palier par 3 niveaux) s'ajoute par-dessus et la réduction de prix est inchangée. Constante `FGT` (village.js). Le bouton Forge indique « paliers d'équipement ».
- **Écurie :** chevaux illimités. Il y en a toujours 3 en vente (stock reconstitué à chaque achat et à la construction, `restock`, village.js). Vitesse d'un nouveau cheval = 2 + niveau du Palefrenier + 0 à 2 (plafond 12). Les chevaux déjà en vente gardent leur vitesse. Le bouton Écurie indique « chevaux plus rapides » (le bonus de l'Écurie sur la vitesse est inchangé).
- **Maisons :** prix fixe de 50 or (avant 50 + 15 par niveau). Le coût de construction de la Maison est inchangé. Chaque Maison construite ajoute toujours une maison en vente.
- **Équilibre** (3 villages simulés, chacun sur 20 tranches consécutives de 15 jours sans repartir de zéro, 8 aventuriers max., bâtiments construits automatiquement, 3.1.6 → 3.1.7) : maisons achetées par partie 0,4-0,6 → 0,5-1,4 (environ ×2), chevaux 3,4-4,1 → 1,6-4,0, achats à la forge 2,4-3,0 → 1,0-2,5, victoires 139-161 → 95-148, or gagné 1596-1894 → 1021-1765, morts 19 → 15-19,5. Un lot sur trois est nettement plus bas (peu d'aventuriers survivants) : c'est surtout du bruit. Pour pousser les achats de maison : la part de butin versée à la bourse (`.3` dans `applyTask`, village.js) ou l'épargne (`keepG`).
- **Migration (save.js) :** les maisons en vente passent à 50 or ; une Écurie existante complète son stock à 3 chevaux. Une sauvegarde 3.1.6 se charge et se joue (testé).
- Testé (Node) : parties de 20 jours avec dessin, sauvegarde puis rechargement, sauvegarde 3.1.6 avec Écurie et maison à 95 or, chaîne d'héritage de 6 morts (45, 40, 35, 30, 25, 25).
- Non vérifié : l'équilibre ressenti sur de longues parties (achats de maison et paliers de Forge plafonnés pour les hauts niveaux), l'affichage des nouveaux textes de boutons sur ton téléphone.
- Fichiers : `village.js`, `combat.js`, `state.js`, `save.js`, `index.html`. Cache du service worker passé à `bv-v44`. Version affichée dans les Options : v3.1.7.

## v3.1.6 « Village : Nettoyage, Auberge & Sanctuaire »

Version affichée dans les Options : **v3.1.6**

### Ajouté
- **Échec de bénédiction :** la bénédiction du Sanctuaire peut échouer (message « la bénédiction échoue » dans la console, pas de ✨). Chance de réussite = 55 % + 4 % par niveau de Sanctuaire + 3 % par niveau de Guérisseur, plafonnée à 95 % (ex. 62 % avec Sanctuaire 1 et Guérisseur 1). Constantes `BL0`, `BL1`, `BL2` (village.js). Le Guérisseur gagne son XP à chaque tentative, réussie ou non.

### Corrigé
- Aucun correctif dans cette release.

### Modifié
- **Marché supprimé :** bâtiment, bouton, PNJ Marchand et bonus d'or (+10 % par niveau) retirés. Il reste le +1 % par niveau de Maire.
- **Aubergiste :** il ne gagne plus d'XP à chaque début de repos. À chaque aube (4h), chaque aventurier au repos (maison ou Auberge) lui rapporte 3 XP (constante `AUB`, village.js). Champ de sauvegarde `S.aw` (dernier jour compté, créé tout seul).
- **Bénédiction réussie plus efficace :** réduction de mortalité en cas de défaite doublée (0,04 par niveau de Sanctuaire au lieu de 0,02, et 0,02 par niveau de Guérisseur au lieu de 0,01). Coût et durée inchangés.
- **Migration (`mig5`, save.js) :** une sauvegarde avec Marché perd le bâtiment (chantier compris) et le Marchand. Les ressources payées sont remboursées (message dans la console) et les emplacements des bâtiments suivants sont renumérotés : le village se réorganise légèrement. Les aventuriers qui allaient vers un bâtiment décalé sont redirigés.
- **Équilibre** (3 villages simulés, chacun sur 20 tranches consécutives de 15 jours sans repartir de zéro, 8 aventuriers max., bâtiments construits automatiquement, ancien → nouveau) : victoires 98-144 → 126-143, or gagné 1234-2362 → 1441-1785, morts 17-18 → 19-20, niveau d'Aubergiste 7,6-11,2 → 10,3-11,2. La dispersion entre lots dépasse l'écart : c'est dans le bruit. Environ 13 bénédictions ratées par partie. Si l'or te semble trop bas sans Marché, relève le bonus de Maire (`.01*nl('V')` dans `resolve`, combat.js).
- `map.js` non modifié : le dessin du Marché et du Marchand n'est plus utilisé (code mort conservé). Fichiers : `data.js`, `state.js`, `village.js`, `combat.js`, `save.js`, `index.html`.
- Testé (Node) : parties de 15 jours, sauvegarde puis rechargement, sauvegarde 3.1.5 avec Marché en chantier, avec Marché terminé et aventurier au chantier : 0 erreur, numéros de bâtiments sans doublon, remboursement exact.
- Non vérifié : le rendu du village réorganisé sur ton téléphone (pas de capture), l'équilibre ressenti de la bénédiction sur de longues parties.
- Cache du service worker passé à `bv-v43`. Version affichée dans les Options : v3.1.6.

## v3.1.5 « Lisibilité, Caméra & Lumières nocturnes »

Version affichée dans les Options : **v3.1.5**

### Ajouté
- **Boutons ◀ ▶ :** à côté de la case « temps de trajet », ils font suivre l'aventurier précédent / suivant (ordre de la liste, en boucle). Sans suivi en cours, ▶ prend le premier et ◀ le dernier. Zoom minimum 1,2 comme au tap. Un aventurier à l'Auberge est suivi via la caméra centrée sur l'Auberge.
- **Étoiles de bénédiction :** 3 petites étoiles dorées tournent autour d'un aventurier béni, jusqu'à son prochain combat (aussi visibles la nuit).

### Corrigé
- Aucun correctif dans cette release.

### Modifié
- **Noms des PNJ en violet** sur la carte (étiquettes uniquement ; la liste l'était déjà).
- **Météo claire :** icône ☀️ (avant ✨).
- **Point jaune nocturne des aventuriers :** rayon réduit d'environ 45 % et opacité à 55 % ; le halo autour d'eux est inchangé.
- **Durées d'affichage (demande ajoutée) :** résultats de combat sous l'encadré 25 s (avant 5 s), bandeau de mort 25 s (avant 12 s). L'encadré reste limité à 5 lignes : avec beaucoup de combats simultanés, les plus anciens résultats sont masqués avant la fin des 25 s.
- Fichiers : `map.js` (`bstars`, `draw`), `state.js` (`WXI`), `index.html`, `style.css`, `main.js` (`folStep`).
- Pas de migration, gameplay et équilibre inchangés (rendu et interface uniquement). Une sauvegarde 3.1.4 se charge et se joue (testé).
- Testé (Node, 20 jours, dessin régulier, sauvegarde puis rechargement, chargement d'une sauvegarde 3.1.4, boutons ◀ ▶ en boucle) : 0 erreur. Captures PC jour et nuit vérifiées (noms violets, étoiles, point nocturne).
- Non vérifié : le rendu sur ton téléphone (largeur de la ligne case + boutons sur écran plié, le texte de la case peut passer sur 2 lignes), la lisibilité des étoiles sur écran réel.
- Cache du service worker passé à `bv-v42`. Version affichée dans les Options : v3.1.5.

## v3.1.4 « Météo dynamique »

Version affichée dans les Options : **v3.1.4**

### Ajouté
- **Météo aléatoire :** dégagé (météo de base, environ 60 % du temps), nuageux, pluie, brouillard, orage (rare). Chaque météo dure 4 à 6 h de jeu (environ 2 min 30 à 3 min 45 réelles) ; le temps peut rester dégagé plusieurs périodes de suite.
- **Transition d'1 h de jeu** entre deux météos (comme l'aube et le crépuscule) : voile, pluie et éclairs montent et descendent progressivement.
- **Effets sur la carte :** nuageux = voile gris ; pluie = traits obliques et voile ; orage = pluie dense, voile plus sombre et éclairs ; brouillard = voile clair. Aucun dessin en mode Veille.
- **Icône dans la barre du haut,** après l'heure : « ☀️ Jour 3 · 14h ⛈️ · ★1 ». Ciel dégagé : ✨ (choix de ma part, pour ne pas doubler le ☀️/🌙) ; nuageux ☁️, pluie 🌧️, orage ⛈️, brouillard 🌫️. Pendant une transition, l'icône change à mi-chemin.

### Corrigé
- Aucun correctif dans cette release.

### Modifié
- Visuel uniquement : combats, trajets et butins inchangés. Fichiers : `state.js` (`wxTick`, `wxMix`, `wxIcon`, constantes `WXV` effets et `WXP` probabilités), `combat.js` (appel dans `tick`), `ui.js` (icône), `map.js` (`wxDraw`).
- Réglages : durée `R(4,6)` dans `wxTick`, poids des météos dans `WXP`, intensité des voiles dans `WXV` (voile, pluie, brouillard, éclair).
- **Sauvegarde :** nouveau champ `S.wx` (météo en cours). Une sauvegarde 3.1.3 n'en a pas : elle démarre en « dégagé » (testé, pas de migration à écrire).
- Testé (Node, 20 jours, 2 parties) : périodes stables de 4,0 à 6,0 h, transitions de 1,00 h, dégagé 61-65 %, sauvegarde puis rechargement identiques, chargement d'une sauvegarde 3.1.3 en cours de chantier. Captures PC des 5 météos, d'un éclair et d'une transition pluie > orage vérifiées.
- Non vérifié : le rendu et la fluidité sur ton téléphone, l'effet sur la batterie (pluie ≈ 170 traits par image au maximum), la lisibilité de la pluie sur écran réel (les traits sont fins).
- Cache du service worker passé à `bv-v41`. Version affichée dans les Options : v3.1.4.

## v3.1.3 « Correctif Chantiers, Icône & Chemins »

Version affichée dans les Options : **v3.1.3**

### Ajouté
- **Bâtisseur dédié :** chaque chantier est confié à **un seul aventurier**. Quand un aventurier finit son repos et qu'un chantier n'a pas de bâtisseur, il y va au lieu de partir en quête : il marche jusqu'au chantier (par les allées), y travaille au marteau jusqu'à la fin, puis rentre se reposer. Il n'est plus « au repos » pendant ce temps (il apparaît dans la liste : « au chantier »).
- **Icône d'armure dessinée** (plastron avec épaulières, SVG intégré) dans la liste des aventuriers, à la place de 🦺.

### Corrigé
- **Téléportation et abandon des chantiers :** plus d'aventuriers au repos affichés sur le chantier, donc plus de départ en quête en plein travail ni de chantier qui s'arrête brutalement.
- **Embranchement des routes :** le contour sombre de la branche ne se superpose plus à la route commune ; tous les contours sont dessinés d'abord, puis les fonds, puis les détails.

### Modifié
- Message de lancement d'un chantier : « un aventurier y travaille ». `BMAX` supprimée ; `bAssign` (village.js) ne désigne plus que les bâtisseurs arrivés sur place.
- Fichiers : `village.js` (`needB`, `bAssign`, `bDone`, `townTick`), `combat.js` (`tick`, `IC.a`), `map.js` (`buildGround`), `save.js` (garde au chargement).
- **Migration :** nouvel état d'aventurier `tk.k='build'` créé en cours de partie, rien à convertir. Une sauvegarde 3.1.2 avec 5 chantiers en cours se charge et se joue (testé). Garde au chargement : un bâtisseur dont le chantier n'existe plus rentre chez lui.
- **Équilibre** (6 parties, 15 jours, 8 aventuriers, 5 chantiers, ancien → nouveau) : quêtes 236 → 227, or 1334 → 1572, morts 53 → 39, chantiers terminés 5 → 5 : dans le bruit de la simulation. Un chantier occupe un aventurier de plus qu'avant pendant 1 à 2 jours ; durée des chantiers inchangée (`R(900,1800)`).
- Testé (Node) : jamais plus d'un bâtisseur par chantier, aucun saut de position, aucun bâtisseur bloqué, rechargement en plein chantier. Captures PC de l'embranchement et de l'icône vérifiées.
- Non vérifié : le rendu sur ton téléphone (taille de l'icône dans la liste, embranchement), la fluidité. Avec peu d'aventuriers et beaucoup de chantiers, presque tous peuvent devenir bâtisseurs (pas de plafond ajouté).
- Cache du service worker passé à `bv-v40`. Version affichée dans les Options : v3.1.3.

## v3.1.2 « Allées du village »

Version affichée dans les Options : **v3.1.2**

### Ajouté
- **Liaisons entre bâtiments voisins :** chaque bâtiment est relié à son voisin le plus proche (18 unités maximum) quand le chemin existant entre eux est un long détour. Cela crée des boucles et des allées entre les bâtiments.
- **Anneau intérieur :** une allée en boucle à l'intérieur de l'enceinte, interrompue aux endroits sans bâtiment ni route proches. Ses tronçons sont reliés au réseau.

### Corrigé
- Aucun correctif dans cette release.

### Modifié
- **Tracé plus naturel :** bruit de coût lissé à basse fréquence (courbes douces au lieu de marches en diagonale) et lissage léger des lignes à l'affichage. Largeur et couleur inchangées.
- `map.js` uniquement (`buildNet`, `drawNet`). Les aventuriers marchent sur ces allées (boucles comprises).
- **Équilibre** (40 parties, 15 jours, 8 aventuriers, ancien → nouveau) : quêtes 18 → 17, or 103 → 97, morts 3,5 → 3,5, dans le bruit de la simulation. Si les trajets au village te semblent trop longs ou trop courts, la constante à ajuster est `WALK` (village.js).
- **Calcul du réseau** (village de 24 bâtiments) : 37 ms → 78 ms, une seule fois à chaque construction.
- Pas de migration : le réseau est recalculé. Une sauvegarde 3.1.1 avec 4 aventuriers en route se charge et se joue (testé). Les aventuriers en action au village peuvent se replacer légèrement.
- Non vérifié : le rendu sur ton téléphone (captures PC d'un village de 9 bâtiments seulement ; village de 16 bâtiments généré sans erreur mais non relu en détail), la fluidité.
- Cache du service worker passé à `bv-v39`. Version affichée dans les Options : v3.1.2.

## v3.1.1 « Routes & Ponts de la carte »

Version affichée dans les Options : **v3.1.1**

### Ajouté
- **Chemins fusionnés :** quand deux zones sont dans la même direction depuis le village (écart d'angle d'environ 35° ou moins), leur chemin partage un tronc commun, puis se sépare à un point de bifurcation (40 à 60 % de la longueur du chemin déjà tracé). Le tronc commun n'est dessiné qu'une fois (cailloux, herbe, lampadaires). Les chemins ne se croisent toujours jamais.

### Corrigé
- **Ponts :** quand un chemin longeait la rivière, le pont n'était posé qu'en un seul point et la route était coupée. Les ponts couvrent maintenant tout le tronçon de chemin dans l'eau (3 points de marge de chaque côté), orientés dans le sens du chemin ; un tronçon long ou courbe est couvert par plusieurs ponts bout à bout. Un seul pont par endroit (pas de doublon sur un tronc commun).

### Modifié
- `map.js` : `mergeAt` (nouveau), `roadOf`, dessin des routes dans `buildGround`, ponts dans `buildRivers`. `state.js` : `fresh()` en version de sauvegarde 4. `save.js` : migration `repath`.
- **Migration :** les chemins sont recalculés à partir des zones, donc leur forme change sur une ancienne partie. Les aventuriers en route reprennent le nouveau tracé au chargement (point le plus proche). Pas de nouveau champ de sauvegarde. Une sauvegarde 3.1.0 avec 4 aventuriers en route se charge et se joue (testé).
- **Tests de génération** (40 cartes, ancien → nouveau) : 0 croisement dans les deux cas ; 4,9 chemins fusionnés par carte ; points de chemin dans l'eau non couverts par un pont : 264 sur 1 464 → 4 sur 2 084 ; ponts par carte : 3,9 → 6,7 (tronçons longs découpés).
- **Équilibre** (40 parties, 15 jours, 8 aventuriers, ancien → nouveau) : quêtes 17 → 18, or 100 → 103, morts 3,5 → 3,5. Inchangé.
- Non vérifié : le rendu sur ton téléphone (capture PC d'une carte seulement), le calcul sur 300 cartes (trop long pour mon environnement, 40 cartes testées), et un chemin qui frôle encore le décor d'une autre zone (visuel).
- Cache du service worker passé à `bv-v38`. Version affichée dans les Options : v3.1.1.

## v3.1.0 « Finitions UI, PNJ & Ressources »

Version affichée dans les Options : **v3.1.0**

### Ajouté
- **Pierre dès la Forêt :** 10 % de chance de gagner 1 à 2 pierres par victoire en Forêt (tirage avant les multiplicateurs : Rôdeur, nuit, coup de chance). Les autres zones sont inchangées.

### Corrigé
- **Bras des PNJ :** pendant les animations d'action, le bras pivote maintenant autour de l'épaule au lieu de se décoller du corps. La chope du Tavernier, le marteau du Forgeron (et des rénovations), la fourche du Palefrenier et le sac du Marchand suivent la main.
- **Écran Options :** les 2 boutons et le timer de sauvegarde sont remontés juste sous l'icône 🔊 ; la roue ⚙️ est empilée au-dessus du numéro de version, en bas à droite.

### Modifié
- **Bois :** butin ×0,45 (avant ×0,6), constante `WOOD` dans combat.js.
- **Équilibre** (80 parties, 15 jours, 8 aventuriers, ancien → nouveau) : bois gagné environ 49 → 33 par partie, pierre 12 → 15 ; quêtes 20 → 18 et or 115 → 106 : dans le bruit de la simulation (même version avec 0 % de pierre : 17 quêtes, 106 or). Morts inchangées (3,7 → 3,4).
- Pas de migration : une sauvegarde 3.0.9 se charge et se joue (testé).
- Non vérifié : le rendu de l'écran Options sur ton téléphone (modifié dans index.html et style.css, pas de capture), la fluidité. Capture PC des bras vérifiée (Aubergiste, Tavernier, Forgeron, Palefrenier).
- Cache du service worker passé à `bv-v37`. Version affichée dans les Options : v3.1.0.

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
