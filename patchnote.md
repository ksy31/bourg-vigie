# Patchnotes — Bourg-Vigie

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
