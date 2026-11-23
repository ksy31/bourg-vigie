# 🏰 Backlog et Feuille de Route - Mon Jeu de Village

Version actuelle du jeu : **v3.3.0 « Refonte WebGL (1/3) : Carte, village et héros en 3D »**

## ✅ Déjà intégré

### v2.3 « Hôtel de ville »
- [x] **Mairie :** bâtiment de départ, non améliorable, qui matérialise la caisse du village (sans plafond).
- [x] **PNJ Maire :** monte d'un niveau tous les `niveau × 4` retours d'aventuriers avec au moins une ressource (une fuite ne compte pas). +1 % d'or par niveau.

### v2.4 « Veille nocturne »
- [x] **Verrouiller le zoom :** zoom bloqué sur toute l'interface, actif uniquement sur la carte.
- [x] **Écran toujours allumé :** activé par défaut, option supprimée.
- [x] **Renommer le Spa :** devient **Sanctuaire** (effet de réduction de mortalité inchangé).
- [x] **Transition Jour/Nuit :** fondu progressif (crépuscule 20h-21h, aube 4h-5h).
- [x] **Halo lumineux la nuit :** halo autour des aventuriers.
- [x] **Indicateurs de sauvegarde :** popup de confirmation (sauvegarde manuelle) et timer « dernière sauvegarde il y a X ».
- [x] **Game Over style Tekken :** « You lose, Continue ? » avec compte à rebours de 10 s.

### v2.4.1 « Correctif bloquant »
- [x] **Cohérence des combats et niveau des monstres :** montée de la difficulté ramenée à +1,5 % par jour (plafond +75 %), zones choisies plus prudemment, niveaux 1 et 2 protégés de la mort (fuite blessé), hasard conservé.

### v2.5.1 « Nouveau Monde : ambiance et UI »
- [x] **Musique médiévale fantasy (Web Audio) :** synthétiseur intégré, mélodie de luth en boucle, démarrage au premier tap, bouton 🔊/🔇 toujours visible, pause automatique quand on quitte l'onglet.
- [x] **Popup de sauvegarde sur une ligne.**
- [x] **Masquer la progression des PNJ :** le niveau reste affiché, la progression x/y est retirée.
- [x] **Infobulle personnage sur la carte :** tap sur un aventurier = nom et niveau, fermeture au tap ailleurs.

### v2.6a « Chroniques (1/2) »
- [x] **Horodatage de la console :** `[J12 · 14h] message`.
- [x] **Historique de la console :** 20 dernières lignes sauvegardées ; message d'accueil uniquement au début d'une nouvelle partie.
- [x] **Top 10 global :** un classement pour toutes les parties, un seul score par nom (monstres tués, or gagné, niveau, jours).

### v2.6b « Chroniques (2/2) »
- [x] **Menu Développeur (roue crantée) :** gestion des noms, export/import de sauvegarde, ajout de ressources de test (d'autres options seront ajoutées plus tard).
- [x] **Gestion dynamique des noms :** liste modifiable sans mise à jour ; noms inventés en *italique* quand la liste est épuisée.

### v2.7 (a/b) : Refonte graphique de la carte & décors (finir l'effet "Paint")
- [x] **Sol et nature vivante (ombres des arbres : voir v2.7b) :** enrichir le fond de carte avec des détails fixes (touffes d'herbe, petites fleurs, cailloux, relief doux) et ajouter des **ombres portées** sous tous les éléments (bâtiments, arbres, personnages). Mettre en cache le décor statique pour économiser la batterie.
- [x] **Zones illustrées (sans texte de danger) :** supprimer l'affichage textuel/numérique de la notion de « danger » et remplacer les ronds de couleur par de vrais décors dessinés correspondant au lieu (ex. : bosquet de **vrais arbres** détaillés pour la forêt, rochers en relief pour la montagne, pierres brisées pour les ruines, etc.) accompagnés d'une icône claire.
- [x] **Vrais chemins texturés :** remplacer les simples traits par des chemins de terre ou de pavés détaillés (bords irréguliers, petits cailloux, herbe en bordure).
- [x] **Rééquilibrage de la difficulté (v2.7b) :** jeu devenu trop simple, les aventuriers ne mouraient plus. Protection des niveaux 1 et 2 retirée (sauf les 2 premiers jours).

### v2.8a « Vie du village & Équilibre (1/2) »
- [x] **Agrandir et réorganiser le village :** agrandir la zone du village, espacer davantage les bâtiments entre eux, redessiner les bâtiments avec plus de détails (toits, portes, cheminées) et placer la **Mairie au centre**.
- [x] **Éclairage ciblé et naturel :** ne placer les lumières du village qu'aux extrémités (périmètre extérieur) et une seule devant chaque entrée de bâtiment. Le long des chemins, décaler les lampadaires aléatoirement à gauche ou à droite du tracé (position fixée une fois au chargement).
- [x] **Déplacements et durée des actions dans le village :** chaque action au village (dépôt de butin à la **Mairie**, achat à la forge, achat de maison/cheval, soin au sanctuaire, repos à l'**Auberge**) nécessite un déplacement visuel vers le bâtiment précis. Chaque action sur place prend du temps (environ **1 à 2 minutes** en jeu). Lors d'un retour d'expédition avec récompense, l'aventurier passe d'abord par la **Mairie** avant d'enchaîner ses autres actions.
- [x] **Révision des temps de trajet (Carte) :** ajuster la durée des déplacements vers les lieux d'aventure pour que le lieu le plus éloigné prenne environ **5 minutes** pour l'aller (sans monture).
- [x] **Avantage du cheval :** une fois acheté, le cheval doit réduire considérablement le temps de trajet sur la carte.

### v2.8b « Vie du village & Équilibre (2/2) »
- [x] **Suppression totale de la protection débutants :** retirer complètement la protection des niveaux 1 et 2 dans les 2 premiers jours (les aventuriers peuvent mourir dès le jour 1).
- [x] **Restaurer l'équilibrage des lieux et sous-zones :** vérifier et corriger l'équilibrage des zones et sous-zones qui semble avoir été cassé lors de la suppression de l'affichage du « danger » en v2.7 (garder l'affichage sans texte de danger, mais rétablir la vraie progression de difficulté entre les lieux et sous-zones).
- [x] **Logique d'achat et d'épargne des aventuriers :** corriger le comportement d'achat des aventuriers qui dépensent tout leur or dans les objets de la forge (~15 po) et n'achètent jamais ni maison (~50 po) ni cheval. Trouver un équilibre d'épargne/priorité pour que l'équipement reste prioritaire au début, mais qu'ils finissent par économiser et acheter un cheval et une maison.
- [x] **Rotation de 3 musiques médiévales chill (Web Audio) :** conserver la mélodie actuelle au luth et ajouter **2 nouvelles mélodies** avec d'autres instruments médiévaux (ex. : flûte, harpe ou viole) en mode calme/chill. Faire alterner les 3 styles automatiquement toutes les **10 minutes**.

### v2.9a « Grande carte & Décor du village (1/2) »
- [x] **Agrandir la carte (×3) :** carte ×3 en largeur et en hauteur, vue par défaut dézoomée pour tout voir, zoom libre conservé. Durées de trajet inchangées.
- [x] **Refonte graphique de la zone du village :** terre battue et pavés, places, palissades et murets ouverts aux chemins, puits, caisses/tonneaux, herbe autour des bâtiments.

### v2.9b « Héros & Terres lointaines (2/2) »
- [x] **Genre des prénoms (Menu Développeur) :** liste déroulante (— / M / F) par prénom ; noms inventés et héros existants au hasard.
- [x] **Vrais personnages avec signes distinctifs :** silhouettes M/F, signes par classe, cheval visible, taille calée sur les bâtiments.
- [x] **Animations de marche et de combat :** pas, coups d'épée/dagues, flèches, boules magiques, étincelles.
- [x] **PNJ dessinés :** un personnage et un accessoire par PNJ.
- [x] **Routes courbes :** les aventuriers suivent les courbes (trajets un peu plus longs).
- [x] **Lumières :** halos agrandis, environ 3 fois moins de lampadaires sur les routes.
- [x] **Zones agrandies (×2) :** les aventuriers restent dans l'image de la zone ; Forêt plus étendue.

### v2.9.1 « Correctifs & Interface » : Bugs, Village & UI 
- [x] **Unicité des noms par partie (Bug) :** interdire qu'un nom (de la liste ou inventé en *italique*) déjà tiré durant une run puisse être réutilisé plus tard dans la même partie (même après la mort de l'aventurier).
- [x] **Rythme et visuel au village :** réduire la durée d'action du **Sanctuaire** à **30 secondes** maximum, et appliquer le même effet de **semi-transparence** aux aventuriers lorsqu'ils se reposent (à l'Auberge **ou dans leur maison**) que lorsqu'ils effectuent un achat.
- [x] **Nettoyage de l'interface et Menu Développeur :** retirer l'affichage du nombre d'aventuriers dans la barre du haut, déplacer le bouton muet (`🔊`/`🔇`) dans les **Options**, et ajouter un bouton dans le **Menu Développeur** pour réinitialiser le classement Top 10.
- [x] **Menu Développeur :** bouton « Réinitialisation complète » ajouté à ta demande (efface partie, gloire, bonus et Top 10).

### v2.9.2 « Architecture modulaire » : Découpage des fichiers
- [x] **Séparation en 10 fichiers distincts :** le fichier monolithique est découpé en 10 fichiers logiques reliés dans `index.html` (`data.js`, `state.js`, `village.js`, `save.js`, `combat.js`, `ui.js`, `map.js`, `audio.js`, `dev.js`, `main.js`), sans modification de gameplay ni de graphismes, afin de faciliter les mises à jour et d'économiser les tokens.

### v2.9.3 « Bon sens & Terres mortelles » : IA et danger
- [x] **Libre arbitre cohérent des destinations :** remplacer le choix purement aléatoire des destinations par un choix basé sur le bon sens (les aventuriers privilégient les zones adaptées à leur niveau et équipement, tout en gardant une légère prise de risque vers une zone un peu plus dure).
- [x] **Dangerosité réelle et débuts impitoyables :** rétablir la vraie dangerosité des zones avancées (un niveau 3 au Volcan ou un niveau 1 en zone 2 a de très fortes chances de mourir, sauf énorme coup de chance qui rapporte alors gros). Rendre les premiers niveaux particulièrement durs et impitoyables.

### v2.9.4 « Montée en puissance » : Progression XP, Zones & Butins
- [x] **Rythme de progression des survivants :** calibrer le gain d'XP pour qu'un aventurier qui survit puisse atteindre le **niveau 50 en 20 à 30 jours en jeu** environ, la sélection naturelle (malchance ou excès d'audace) éliminant la majorité des candidats en chemin.
- [x] **Échelonnement strict des zones jusqu'au niveau 50 :** redimensionner les paliers de niveau de toutes les zones pour que chaque zone soit nettement plus forte que la précédente (en comparant leurs sous-zones moyennes / n°2), jusqu'à atteindre environ le **niveau 50 dans la dernière zone**.
- [x] **Ralentir la montée des PNJ :** réduire fortement la vitesse de progression des PNJ (Maire, Forgeron, etc.) afin qu'ils progressent sur plusieurs dizaines d'aventuriers et n'atteignent pas leur niveau maximum trop tôt.
- [x] **Réduire les gains de bois :** diminuer légèrement la quantité de bois obtenue dans les butins afin d'équilibrer la progression des constructions du village.

### v2.9.5 « Survie impitoyable & Roi Démon » : XP exponentielle, Mortalité & Boss final
- [x] **Courbe d'XP quasi exponentielle (sans plafond de niveau) :** supprimer toute limite dure de niveau et baser la progression uniquement sur l'XP gagnée selon la puissance des monstres vaincus. Battre des monstres faibles rapporte peu et fait stagner, tandis que vaincre des monstres dangereux récompense la prise de risque (sans jamais sauter plusieurs niveaux d'un coup au niveau 1). La courbe ralentit fortement autour du **niveau 20** pour faire de chaque niveau suivant un exploit rare.
- [x] **Monde fixe, fuite rare et mortalité assumée :** supprimer la montée en difficulté des monstres au fil des jours (un aventurier du Jour 1 et du Jour 50 affrontent exactement les mêmes dangers ; seul le développement du village et de ses PNJ augmente les chances de survie). Rendre la fuite très rare (victoire ou mort dans la majorité des cas) et maintenir un risque réel de mourir même à haut niveau — **enchaîner un grand nombre de Game Over est totalement normal et voulu** dans cette boucle de sélection naturelle.
- [x] **Échelonnement des 6 zones et Roi Démon :** calibrer les 6 zones de la plus accessible à la **Zone 6** (antichambre ultime préparant au combat final). Calibrer le **Roi Démon** autour d'un vétéran bien équipé (environ **niveau 20+**) avec un taux de réussite global exigeant (**5 % à 10 %**).

### v2.9.6 « Lisibilité, Auberge & Veille Nocturne » : UI, Village et lumières
- [x] **Étiquettes permanentes et symboles de genre :** afficher constamment le nom et le niveau au-dessus de tous les personnages (aventuriers et PNJ) sans clic, et remplacer les lettres **M** et **F** par les symboles **♂** et **♀** dans l'interface et le Menu Développeur.
- [x] **Grande Auberge et repos masqué :** redessiner l'Auberge avec un style hôtel à plusieurs étages, et masquer complètement les aventuriers lorsqu'ils s'y reposent (ni à l'extérieur ni en transparence).
- [x] **Refonte de l'éclairage nocturne :** supprimer le rond jaune au centre des lampadaires et reporter cet effet lumineux central uniquement sur les **aventuriers** (pas les PNJ) lorsqu'il fait nuit.
- [x] **Demandes ajoutées :** infobulle au tap supprimée, un tap sur un aventurier le suit ; genres convertis en ♂ / ♀ dans les données (migration automatique).

### v2.9.7 « Terres sauvages & Rivières » : Carte, chemins et paysages
- [x] **Ajustement de l'échelle et des chemins :** réduire légèrement la taille globale de la carte tout en agrandissant davantage les zones d'environnement, et faire en sorte que les chemins ne se croisent jamais.
- [x] **Remplissage cohérent des grandes zones :** étendre naturellement les zones naturelles (forêts denses composées de dizaines voire centaines d'arbres, larges massifs montagneux) tout en conservant une échelle réaliste et proportionnée pour les structures bâties (châteaux, ruines).
- [x] **Rivières et ponts :** générer une ou plusieurs rivières prenant leur source dans les montagnes et serpentant sur la carte, avec la création automatique de **ponts** à chaque endroit où un chemin traverse l'eau.
- [x] **Précisions validées :** carte ×2,5, Ruines agrandies aussi, 2 rivières (la seconde peut rejoindre la première), ponts purement visuels.

## 🏆 v2.9.8 « Bugs, Équilibrage & Lisibilité » : Correctifs essentiels
- [x] **Correction de la Gloire et de l'étoile de prestige :** limiter le gain à **1 seul point de Gloire** maximum par victoire sur le Roi Démon (1 amélioration débloquée par run) et corriger la mise à jour visuelle de l'étoile de prestige.
- [x] **Danger nocturne accru et baisse du drop de bois :** renforcer nettement la puissance des monstres la nuit pour que s'aventurer de nuit soit un vrai risque mortel, et réduire encore un peu la quantité de **bois** obtenue dans les butins.
- [x] **Symbole de difficulté des zones et nom sur les tombes :** remplacer les crânes de difficulté des zones par un autre symbole (ex. : flammes **🔥** ou étoiles **★**) placé **juste sous le nom de la zone**, et afficher le **nom de l'aventurier mort** à côté du crâne sur la carte.

## 🏘️ v2.9.9 « Village organique & Évolution visuelle » : Architecture du village
- [x] **Disposition naturelle et chemins internes (les aventuriers y marchent) :** espacer davantage les bâtiments sans les aligner en grille stricte, et tracer de vrais petits chemins reliant les bâtiments entre eux.
- [x] **Évolution visuelle (selon le niveau du PNJ) et frontières du village :** créer une vraie différence graphique visible sur chaque bâtiment au fil de ses améliorations, et adapter les clôtures du village à son rang (aucune rambarde en hameau, barrières en bois en village, fortifications plus solides ensuite).

## 🔋 v3.0.0 « Économie d'énergie & Écran noir » : Optimisation (1/2)
- [x] **Économie d'énergie intelligente (sans brider la fluidité) :** conserver un rendu fluide quand la carte est affichée, suspendre le dessin sur les onglets masqués, passer l'interface sombre en noir pur (**AMOLED**) et ajouter un **bouton « Mode Veille (Écran noir) »** qui affiche un voile noir complet pour économiser la batterie tout en laissant tourner la simulation (un tap pour réveiller l'écran).

## 🧭 v3.0.1 « Confort, Suivi & Écran Options » : Ergonomie & UI
- [x] **Suivi caméra et taille fixe des noms :** cliquer sur un nom dans l'onglet Aventuriers ouvre la Carte en suivi caméra sur lui ; garder une taille de texte fixe pour les noms et niveaux quel que soit le zoom.
- [x] **Réorganisation de l'écran Options :** ajouter une option dédiée pour **désactiver la musique**, placer les **2 boutons** en bas, suivis du timer de **dernière sauvegarde**, et tout en bas à droite la **roue crantée** suivie du **numéro de version**.

## ⚔️ v3.0.2 « Rythme des actions & PNJ vivants » : Gameplay & Animations
- [x] **Durée des combats et actions au village :** allonger légèrement la durée des combats selon la difficulté du monstre, réduire légèrement le temps d'action à la **Mairie**, et ajouter **20 à 30 secondes** à l'**Auberge** (enregistrement et attribution de chambre par l'aubergiste).
- [x] **Animations d'action des PNJ :** ajouter une animation visuelle sur chaque PNJ lorsqu'il agit (accueil, commerce, soin, construction).

## 🏗️ v3.0.3 « Chantiers & Bâtisseurs » : Constructions vivantes
- [x] **Construction progressive des nouveaux bâtiments :** hors des 2 bâtiments de départ, chaque nouvelle construction dure **1 à 2 jours** en jeu avec étapes visuelles (**10 %, 25 %, 50 %, 75 %, 100 %**), réalisée par les **aventuriers au repos** au village.
- [x] **Travaux d'amélioration par les PNJ :** toute évolution d'un bâtiment existant passe par une phase de reconstruction durant laquelle les **interactions sont coupées**, effectuée directement par le **PNJ du bâtiment**.

## ✨ v3.0.4 « Notifications, Lumières & Cache final » : Finitions & Optimisation (2/2)
- [x] **Notification de combat et message de mort :** remplacer « vs » par l'icône des épées (**⚔️**), afficher le résultat pendant quelques secondes (**écriture verte** si gagné, **écriture rouge** si mort) et **rallonger le message de mort**.
- [x] **Équilibrage des lumières et cache final du décor :** réduire la luminosité centrale des lampadaires, intensifier la lumière portée par les **aventuriers** la nuit, rendre le **petit rond jaune du butin porté par l'aventurier** lumineux, et mettre en cache le décor statique généré de la carte et du village.
      
## 🛠️ v3.0.5 « Correctif cache & mises à jour » : Service worker
- [x] **Mises à jour qui s'appliquent vraiment :** la v3.0.4 restait invisible sur téléphone (ancienne version 3.0.3 affichée). Service worker corrigé : installation sans cache HTTP, réseau d'abord (cache en secours hors ligne).

## ✅ v3.0.6 « Bestiaire illustré (1/3) : Faune & Brigands »
- [x] **Système de variantes et faune commune (5 modèles) :** variation automatique de couleur et d'échelle par monstre + modélisation détaillée dans le style des aventuriers pour les **quadrupèdes** (loup, renard, sanglier, bouquetin), **ours**, **rat**, **araignée** et **humanoïdes** (bandit, brigand, braconnier, geôlier, cultiste, garde-chiourme). Monstre dessiné à droite du héros, détails et taille selon la force du monstre, traits lumineux la nuit.

## ✅ v3.0.7 « Bestiaire illustré (2/3) : Peaux-vertes, Volants & Morts-vivants »
- [x] **Créatures des terres sauvages et ruines (5 modèles) :** modélisation graphique des **peaux-vertes** (gobelin, kobold, orc), **volants** (chauve-souris, harpie, aigle, condor), **morts-vivants** (squelette, spectre, fantôme, liche), **plantes et esprits** (dryade, arbre) et **ver**.

## ✅ v3.0.8 « Bestiaire illustré (3/3) : Colosses, Dragons & Boss »
- [x] **Créatures majeures et Roi Démon (6 modèles) :** modélisation graphique des **trolls**, **golems et géants**, **élémentaires et salamandres**, **dragons/drakes/wyrms**, **démons** et modèle unique dédié au **Roi Démon**.


## ✅ v3.0.9 « Rattrapage du bestiaire »
- [x] **Monstres encore non dessinés :** loups-garous, rats-garous, noms « spectral », Âme en peine, Banshee, Ombre, Gargouille, Griffon, Wyverne, Chimère, Hydre, Basilic, Nécromancien, Gardien momifié, Titan de cendre, Âme de magma, Chevalier maudit / de la mort, Ogre lunaire, Champion légendaire, etc.

## ✅ v3.1.0 « Finitions UI, PNJ & Ressources »
- [x] **Correction de l'animation des PNJ :** le bras pivote autour de l'épaule et les objets tenus suivent la main.
- [x] **Disposition de l'écran Options :** boutons et timer sous l'icône 🔊, roue crantée au-dessus du numéro de version en bas à droite.
- [x] **Rééquilibrage bois et pierre :** bois ×0,45 ; 10 % de chance de 1 à 2 pierres par victoire en Forêt.

## ✅ v3.1.1 « Routes & Ponts de la carte »
- [x] **Chemins fusionnés et correction des ponts :** les chemins de zones voisines partagent un tronc commun puis se séparent sans jamais se croiser ; les ponts couvrent tout le tronçon de chemin dans l'eau (cas du chemin qui longe la rivière).

## ✅ v3.1.2 « Allées du village »
- [x] **Refonte des chemins internes du village :** liaisons entre bâtiments voisins (boucles), anneau intérieur interrompu, tracé plus doux.

## ✅ v3.1.3 « Correctif Chantiers, Icône & Chemins »
- [x] **Affectation unique aux chantiers (hors repos) :** assigner **un seul aventurier** à la construction d'un bâtiment en tant qu'action dédiée (qui ne compte pas comme du repos à l'Auberge), afin d'éviter la téléportation des aventuriers au repos et l'abandon brutal du chantier.
- [x] **Icône d'armure et jonction des chemins :** remplacer l'icône de l'armure (actuellement proche d'une veste de chantier) par une armure médiévale, et supprimer l'effet de superposition visuel à l'embranchement des routes.

## ✅ v3.1.4 « Météo dynamique »
- [x] **Météo aléatoire et indicateur :** ajouter une météo dynamique et aléatoire (effets visuels sur la carte) avec une icône visible dans la barre du haut à côté de l'heure.

## ✅ v3.1.5 « Lisibilité, Caméra & Lumières nocturnes »
- [x] **Noms des PNJ en violet, météo claire et halo nocturne :** afficher les noms des PNJ en violet, garder un **soleil** comme icône pour la météo claire, et réduire la taille ainsi que l'opacité du rond jaune nocturne sur la tête des aventuriers afin qu'ils restent bien visibles la nuit.
- [x] **Suivi caméra rapide et étoiles de bénédiction :** ajouter 2 boutons près de la carte pour verrouiller le suivi sur **l'aventurier suivant** ou **précédent**, et afficher de petites **étoiles autour de l'aventurier** ayant reçu une bénédiction.
- [x] **Demande ajoutée :** encadré des combats et bandeau de mort affichés 25 s (avant 5 s et 12 s).

## ✅ v3.1.6 « Village : Nettoyage, Auberge & Sanctuaire »
- [x] **Suppression du Marché et ajustement de l'Auberge :** retirer le bâtiment et le PNJ du Marché (doublon avec la Mairie) ; garder l'Auberge non améliorable tout en faisant progresser l'Aubergiste via les nuits passées (rythme calibré sur l'équilibrage actuel).
- [x] **Standardisation du Sanctuaire :** aligner la montée en niveau de la Prêtresse sur les autres PNJ via les soins et bénédictions accordés (rythme calibré sur l'équilibrage actuel), en augmentant l'efficacité des soins et le **taux de réussite de la bénédiction** (sans coût ni changement de durée).

## ✅ v3.1.7 « Forge, Écurie & Maisons »
- [x] **Forge et Écurie :** lier le déblocage des paliers d'équipement à l'amélioration de la Forge (avec bonus de qualité et réduction du prix selon le niveau du Forgeron) ; proposer des chevaux illimités à l'Écurie dont le niveau correspond au niveau du Palefrenier (progression des PNJ calibrée sur le rythme actuel).
- [x] **Maisons et héritage :** ajouter une nouvelle maison constructible par amélioration, ajuster la priorité d'épargne des aventuriers pour qu'ils achètent enfin une maison, et permettre l'héritage à prix réduit en cas de décès du propriétaire dans la même partie.

## ✅ v3.1.8 « Taverne : Primes & Contrats »
- [x] **Contrats de primes renouvelés tous les 2 jours :** remplacer le fonctionnement de la Taverne par des primes aléatoires sur certains monstres (1 lot renouvelé tous les 2 jours), versant un bonus d'or directement à l'aventurier vainqueur, avec affichage de la prime en cours dans la liste des aventuriers et hausse du nombre de contrats et des primes selon le niveau du Tavernier (calibré sur le rythme actuel).

## ✅ v3.1.9 « Correctif Sanctuaire & Top 10 »
- [x] **Empêcher le dédoublement du Sanctuaire :** corriger le bug lors de l'amélioration du Sanctuaire qui crée un second bâtiment sans Prêtresse au lieu de faire évoluer le Sanctuaire existant (et nettoyer le doublon sur les sauvegardes affectées).
- [x] **Affichage du cheval dans le Top 10 :** afficher l'icône/indication du cheval sur les aventuriers qui en possèdent un dans le classement Top 10.

## ✅ v3.2.0 « Armurerie de Guilde (1/2) : Bâtiment & Coffre »
- [x] **Ajout du bâtiment et récupération au décès :** intégrer l'Armurerie de Guilde (dessin, améliorations et Intendant) et enregistrer l'équipement récupéré à la mort d'un aventurier dans le coffre commun de la partie (sans effet inter-runs).

## ✅ v3.2.1 « Armurerie de Guilde (2/2) : Attribution & PNJ »
- [x] **Équipement des suivants et progression de l'Intendant :** faire passer les nouveaux aventuriers à l'Armurerie pour s'équiper gratuitement depuis le coffre et activer la montée de niveau de l'Intendant (calibrée sur le rythme actuel).

## ✅ v3.2.2 « Maison des Guildes (1/2) : Bâtiment & Fondation »
- [x] **Ajout du lieu et création des compagnies :** intégrer la Maison des Guildes (dessin, améliorations et Chancelier) et permettre aux aventuriers expérimentés de fonder ou rejoindre une guilde (nom et bannière).

## ✅ v3.2.3 « Maison des Guildes (2/2) : Entraide & Groupes »
- [x] **Expéditions groupées et caisse commune :** activer les départs en groupe dans les zones classiques (Roi Démon toujours en solo), le partage d'or interne pour équiper les recrues et la montée de niveau du Chancelier (calibrée sur le rythme actuel).

## ✅ v3.2.4 « Assaut préparé contre le Roi Démon »
- [x] **Sélection du meilleur champion et préparation complète :** modifier le bouton d'envoi au Roi Démon pour sélectionner automatiquement le **meilleur aventurier vivant** (quelle que soit son action en cours) et lui faire effectuer une séquence de préparation au village (retour, repos, soin/bénédiction au Sanctuaire, équipement à la Forge si besoin) avant de partir affronter le Roi Démon en duel.

## ✅ v3.2.5 « Affichage adaptatif, Thème Jour/Nuit & Halo »
- [x] **Affichage dynamique multi-écrans (Z Fold 3 plié/déplié) :** adapter automatiquement la mise en page de l'interface et la vue de la carte à toutes les largeurs et ratios d'écran en temps réel, sans blocage ni débordement sur écran étroit (Z Fold 3 plié) et avec recalcul fluide au dépliage.
- [x] **Mode Jour / Mode Nuit dans les Options :** ajouter un sélecteur de thème permettant de basculer entre le thème sombre AMOLED actuel (Nuit) et un thème clair (Jour) lisible en extérieur.
- [x] **Position provisoire du halo nocturne :** déplacer le point/halo lumineux nocturne de la tête vers le torse des aventuriers pour dégager leur visage (en attendant la torche tenue en main).

## ✅ v3.2.6 « Bouton plein écran »
- [x] **Bouton plein écran :** bouton ⛶ dans les Options, à côté de 🔊 et 🌙, pour masquer la barre d'état (à retoucher à chaque lancement ; masqué si le navigateur ne le permet pas).

## ✅ v3.3.0 « Refonte WebGL (1/3) : Carte, village et héros en 3D »
- [x] **Moteur 3D WebGL (Three.js embarqué) :** `three.min.js` + `gl.js` (chargé après `map.js`), sans image externe. Le rendu 2D reste en repli automatique si WebGL est indisponible.
- [x] **Option 2D / 3D :** bouton 🧊 3D / 🖼️ 2D dans les Options (clé locale `bvr`, aucune modification de la sauvegarde).
- [x] **Terrain en relief, zones, routes, rivières et ponts :** construits depuis les vraies données du jeu (positions des zones, routes, rivières) ; décor 3D par zone (forêt, mine, montagne, ruines, donjon, volcan, Trône du Roi).
- [x] **Village en 3D :** un bâtiment par construction du village, chantiers avec échafaudage et hauteur progressive, taille selon le niveau du PNJ.
- [x] **Aventuriers en 3D :** 4 classes × 2 genres, marche, combat, cheval, bénédiction et butin ; noms, temps de trajet, 💀 et panneaux de combat conservés.
- [x] **Caméra :** 1 doigt = se déplacer, 2 doigts = tourner et zoomer, tap sur un aventurier = le suivre, ◀ ▶ inchangés, double tap = vue d'ensemble.
- [x] **Jour/nuit et météo :** lumière et ciel suivent l'heure du jeu ; la météo reste le calque d'écran existant.
- [x] **Veille :** aucun rendu 3D en mode veille (inchangé).

## 🎨 v3.3.1 « Refonte WebGL (2/3) : PNJ, monstres, météo et nuit » (prochain)
- [ ] **PNJ du village en 3D** (aubergiste, forgeron, maire, etc.) avec leurs noms.
- [ ] **Monstres en 3D dans les combats.**
- [ ] **Météo 3D :** pluie, brouillard, nuages et éclairs dans la scène.
- [ ] **Nuit :** fenêtres éclairées, torches tenues en main, halos chauds.
- [ ] **Village :** enceinte et puits selon la taille du village.

## 🎨 v3.3.2 « Refonte WebGL (3/3) : Finitions et optimisation »
- [ ] **Flou de profondeur, éclat lumineux, lucioles, fumée.**
- [ ] **Optimisation :** résolution adaptative affinée, ombres, mesure des fps sur Z Fold 3.

## 📱 Guide APK (prochain)
- [ ] **Transformer l'application en APK :** guide pas à pas avec PWABuilder à partir du lien GitHub Pages. L'APK obtenu est une coquille qui ouvre le jeu, il ne le rend pas natif.

## ⏳ En attente / à étudier plus tard
- [ ] **Idées de la refonte 2D à adapter à la 3D (ex-v3.3.x) :** torches tenues en main et lumières chaudes, rivières animées et reflets, particules d'ambiance (lucioles, fumée, brume, braises), lumière et secousse de caméra sur les gros coups en combat.
- [ ] **Multijoueur (en dernier) :** mode coopératif où les villages de deux joueurs se rassemblent. Nécessite un serveur (Firebase ou équivalent), hors périmètre actuel.
- [ ] **Widget / arrière-plan :** impossible en web (le jeu se fige écran éteint). Demanderait une réécriture en Android natif (Kotlin) avec service permanent. Non retenu pour l'instant.

## ❌ Abandonné
- [x] ~~**Équilibrage général :** mis de côté pour le moment.~~
- [x] ~~**Rattrapage hors-ligne :** non souhaité.~~
      
