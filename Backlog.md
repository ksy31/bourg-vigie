# 🏰 Backlog et Feuille de Route - Mon Jeu de Village

Version actuelle du jeu : **v4.4.0 « Le Paladin (1/2) »**

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

## ✅ v3.3.1 « Carte agrandie et contrôles 3D »
- [x] **Carte beaucoup plus grande :** carte ×2,4 et zones ×2,5, village non rétréci et plus aéré (bâtiments espacés de 20 % de plus). Durées de trajet inchangées. Anciennes sauvegardes converties automatiquement.
- [x] **Contrôles 3D comme en 2D :** la carte suit le doigt au glissement, le pincement zoome sous les doigts, rotation de la caméra bloquée pour l'instant.

## ✅ v3.3.2 « Refonte WebGL (2/4) : Biomes et bâtiments au niveau de la démo »
- [x] **Biomes détaillés comme dans la démo :** forêts, mines, montagnes, ruines, donjon, volcan et Trône du Roi avec textures, volumes et lumières de la démo validée. Rivières, routes et ponts en 3D inclus (le jeu n'a pas de lacs).
- [x] **Bâtiments détaillés comme dans la démo :** maisons, auberge, forge, taverne, sanctuaire, écurie, mairie (et intendant, chancelier) avec textures, fenêtres et toits de la démo.

## ✅ v3.3.3 « Refonte WebGL (3/4) : PNJ, monstres, météo et nuit »
- [x] **PNJ du village en 3D** (aubergiste, forgeron, maire, etc.) avec leurs noms.
- [x] **Monstres en 3D dans les combats.**
- [x] **Météo 3D :** pluie, brouillard, nuages et éclairs dans la scène.
- [x] **Nuit :** torches tenues en main, halos chauds (les fenêtres éclairées sont déjà faites en v3.3.2).
- [x] **Village :** enceinte et puits selon la taille du village.

## ✅ v3.3.4 « Refonte WebGL (4/4) : Finitions et optimisation »
- [x] **Flou de profondeur, éclat lumineux, lucioles, fumée.**
- [x] **Optimisation :** résolution adaptative affinée, ombres, mesure des fps sur Z Fold 3.
- [x] **Rotation de la caméra à deux doigts**, si elle ne gêne pas le zoom.

## ✅ v3.4.9 « Réglages sprites et caméra »
- [x] Caméra 3D encore plus basse (43° → 34°).
- [x] Sprites des aventuriers réduits (~17 %) pour correspondre aux bâtiments ; noms placés au-dessus de la tête.
- [x] Torche tenue en pixel-art, fixe (ne suit plus les bras), du côté droit du sprite.
- [x] Étiquettes : « en repos », ennemi et temps restant restent collés sous le nom de l'aventurier, même si d'autres noms sont proches.

## ✅ v3.4.8 « Caméra plus basse »
- [x] **Caméra 3D plus proche du sol :** inclinaison par défaut de 54° à 43° au-dessus de l'horizon.

## ✅ v3.4.7 « Aventuriers en pixel-art HD-2D »
- [x] **Aventuriers en sprites pixel-art (3D) :** sprites chibi dessinés sur canevas (contour sombre, ombrage 3 tons), debout face à la caméra, ombre au sol, images de face, de dos, marche et attaque.
- [x] **Version garçon et fille** pour les 4 classes, **cheveux et yeux de couleur variable** par aventurier, **couleur générale = couleur de l'aventurier**.
- [ ] Reste à faire (hors de cette release) : PNJ et monstres en sprites, personnages 2D.

## ✅ v3.4.6 « Sols détaillés, sac et couleurs »
- [x] **Pavé sur tout le village** (2D et 3D) : cobbles partout, bord usé, place centrale et allées conservées.
- [x] **Même niveau de détail pour les autres sols (3D) :** herbe (brins, trèfles, fleurs), terre des routes et berges (grain, cailloux, fissures), roche (mine, montagne, volcan) et dalles (ruines, donjon, trône), en haute résolution et sans répétition visible de loin.
- [x] **Sac à dos de butin plus visible :** jaune vif non éclairé (toujours lumineux), plus gros, qui flotte légèrement, étincelles qui montent, halo à faible portée.
- [x] **Couleur d'aventurier sur l'armure, la cape et la pièce principale :** armure et casque du Guerrier, robe et chapeau du Mage, capuche, cape et tunique du Voleur, capuche et cape du Rôdeur.

## ✅ v3.4.5 « PNJ, torches et couleurs »
- [x] **PNJ devant la porte, aventuriers face à eux :** chaque PNJ se tient devant la porte de son bâtiment ; les aventuriers s'arrêtent juste devant lui, face à lui, sans décalage aléatoire (file d'attente de part et d'autre), sans traverser le bâtiment.
- [x] **Torche en forêt jour et nuit** (portée inchangée) ; torche déjà éteinte au village (3.4.1).
- [x] **Sac à dos jaune et plus lumineux,** à très faible portée.
- [x] **Couleur de l'aventurier sur le personnage 3D** (écharpe et cape) pour les différencier.
- Déjà livrés avant : yeux néon des monstres (3.4.1), vraies ombres dynamiques (3.4.2, 7 lumières en 3.4.4), architecture des bâtiments et ombres de contact (3.4.3).

## ✅ v3.4.4 « Lumières vivantes & sol du village »
- [x] **Allumage progressif des lumières :** lampadaires, torches et fenêtres s'allument de 19h à 21h (crépuscule) et s'éteignent de 4h à 6h (aube), en 2D et en 3D.
- [x] **7 vraies lumières avec ombres (3D, qualité Haute) :** au lieu de 2, les 7 sources les plus proches de la caméra éclairent et projettent des ombres.
- [x] **Nouveau sol du village (2D et 3D) :** terre battue détaillée (grain, cailloux, herbes sèches, fissures) et pavés individuels (joints, biseaux, mousse, bordure de place) ; en 3D, sol en relief (bump map) qui accroche la lumière des torches.

## ✅ v3.4.3 « Architecture maquette & ombres de contact »
- [x] **Bâtiments enrichis :** débords de toit, colombages, volets, jardinières, auvents, corniches (petits volumes).
- [x] **Ombres de contact douces** sous bâtiments, arbres, rochers, personnages et monstres ; correctif du rendu 3D de jour (3.4.2).

## ✅ v3.4.2 « Ombres dynamiques »
- [x] **Vraies ombres dynamiques** par 2 lumières ponctuelles (torches et lampadaires les plus proches de la caméra, qualité Haute, de nuit) ; arbres proches via silhouettes ; yeux néon déjà faits en 3.4.1.

## ✅ v3.4.1 « Torches des PNJ & yeux néon »
- [x] **Torche près de chaque PNJ du village** (éclairage de nuit) ; **torche des aventuriers éteinte au village**, portée nettement augmentée dehors.
- [x] **Yeux et traits bleu néon des monstres de nuit** rétablis en 3D.

## ✅ v3.4.0 « Génération aléatoire de la carte »
- [x] **Disposition aléatoire des lieux et respect des temps de trajet :** village et zones replacés au hasard à chaque nouvelle partie, mêmes distances donc mêmes durées de trajet, routes courbes d'abord.

## ✅ v3.3.9 « Cycle solaire 3D & Paysages naturels »
- [x] **Cycle horaire exact en 3D** (soleil 5h-21h, ombres mobiles) et **allumage progressif des lumières** de 20h à 21h.
- [x] **Rivières, berges et détails des plaines** (3D) : lit élargi, berges, transitions de sol adoucies, herbe, buissons, rochers, tonneaux et caisses au village.

## ✅ v3.3.8 « Lisibilité du village & Combats visibles »
- [x] **Lampadaires décalés** : celui de droite passe à gauche de l'entrée ; violet des noms de PNJ plus clair.
- [x] **Icônes distinctives gravées sur les toits** (2D et 3D).
- [x] **Monstres en combat** visibles en 3D (de jour comme de nuit) et **marteau** des PNJ en travaux (3D).

## ✅ v3.3.7 « Veille et lumières »
- [x] **Mode veille** : bouton visible et cliquable en 2D et en 3D.
- [x] **Nuit en 2D** : couvre toute la carte au dézoom.
- [x] **Torches hors village** : lumière au sol la nuit.
- [x] **Bénédiction en 3D** : 3 étoiles qui tournent autour du personnage.

## ✅ v3.3.6 « Retours de test »
- [x] **Rond de transparence** dans les arbres autour de chaque aventurier hors du village.
- [x] **Torches** le long des chemins hors village et dans chaque zone.
- [x] **Chemins du village** refaits : place et allées pavées.
- [x] **Rotation à deux doigts** : seuil de 30°.
- [x] **« En repos »** affiché au-dessus de l'auberge quand on suit un aventurier au repos.
- [x] **Sac à dos brillant** pour le butin.

## ✅ v3.3.5 « Rattrapage de la démo »
- [x] **Éclairage :** soleil, lune, ciel et palette de la démo.
- [x] **Lampadaires** sur le contour du village et aux entrées des bâtiments.
- [x] **Volcan** de la démo (cône, cratère, veines de lave).
- [x] **Forêt** agrandie (zone de jeu) et dense.
- [x] **Contour de la carte** en forêt dense.

## 🎨 Chantier « Pixel-art HD-2D » (suite de la v3.4.7)

**Contexte technique (à lire avant de coder)**
- Les aventuriers sont des sprites générés sur canevas : `pxSprite(cls,fem,vue,image,{col,hair,eye})` dans `gl.js` (RGBA 48×72, 3 tons auto, contour sombre), assemblés par `buildSprHero` en planche de 7 images (face, marche ×2, dos, dos marche ×2, attaque), une texture par héros (NearestFilter). `sprUpd` (fin de `updHeroes`) gère face caméra, face/dos, miroir, marche, attaque, luminosité de nuit. `PXSZ` = hauteur des sprites ; torche = `mkPxTorch`. Voir `notes-3d.md`.
- Les PNJ (`buildNpc`, `NPV`) et les monstres (`monsters.js` : `mkind()` renvoie ~45 espèces ; `monW` dans `gl.js`) sont encore des modèles 3D. Le mode 2D (`map.js`) est inchangé.
- Équipement : `h.eq = {w,a,b,s}` (arme, armure, bottes, bouclier ; `SL` dans `combat.js` donne les emplacements par classe, le bouclier est réservé au Guerrier). Niveaux d'équipement et noms via `pn(h,k)` / `ic(h,k)` : vérifier le niveau maximum réel dans `combat.js` avant de dessiner les paliers.
- Règles : attention aux performances mobile (mettre en cache les textures par clé de variante, ne régénérer que si la clé change) ; garder les anciennes sauvegardes compatibles ; chaque sprite doit rester lisible avec la couleur d'aventurier.

## ✅ v3.5.0 « PNJ en sprites »
- [x] **Sprites des PNJ (hommes et femmes)** dans le même style que les aventuriers : un sprite par rôle de `NPV` (tenue et accessoire propres à chaque métier), version masculine et féminine, cheveux et yeux de couleur variable (selon le nom du PNJ), contour sombre, 3 tons.
- [x] **Intégration 3D :** face caméra, ombre au sol, torche pixel-art devant la porte (comme les aventuriers), orientés vers les aventuriers qui viennent les voir, nom au-dessus de la tête, taille cohérente avec les bâtiments.
- [x] **Animations simples :** respiration au repos, geste d'interaction quand un aventurier est devant eux.
- [x] Retirer `buildNpc` une fois les sprites validés.
- [x] **Marteau de construction :** l'aventurier qui construit (et le PNJ qui améliore son bâtiment) se tourne vers le chantier et frappe avec un marteau pixel-art.

## ✅ v3.5.1 « Monstres en sprites (1/3) : base et humanoïdes »
- [x] **Moteur de sprites de monstres :** générateur commun (grands formats possibles, 48×48 à 96×96 selon l'espèce, champ `span`), face/dos, repos, marche, attaque, touché, mort ; contour sombre, 3 tons, variantes de couleur par zone.
- [x] **Humanoïdes :** gobelin, kobold, orc, bandit, brigand, braconnier, cultiste, garde, geôlier, chevalier, champion, lanceur de sorts, squelette, troll, géant.
- [x] **Yeux et traits bleu néon la nuit** conservés sur les sprites (pixels émissifs).
- [x] **Cadavre :** le monstre vaincu s'effondre et reste couché environ 30 s. Pas de marche, pas de flash ni d'animation d'impact (choix).

## ✅ v3.5.2 « Monstres en sprites (2/3) : bêtes »
- [x] Loup (meute), sanglier, ours, renard, rat, chauve-souris, araignée, aigle, chouette, condor, harpie, griffon, chèvre, yéti, loup-garou, ver, salamandre.
- [x] Animations de marche adaptées (quadrupèdes, vol) et d'attaque propres à chaque espèce.
- [x] Choix : bêtes en profil tournées vers l'aventurier, pas de marche (repos, attaque ; battement d'ailes pour les volants), meute spectrale = 3 loups, chouette à part, loup-garou et yéti debout, variantes de couleur par mots du nom.

## ✅ v3.5.3 « Monstres en sprites (3/3) : fantastiques et boss »
- [x] Fantôme, ombre, âme/banshee, spectre, liche, feu follet, élémentaire, golem, gargouille, arbre, dryade, chimère, hydre, basilic, dragon, démon, Roi Démon.
- [x] **Boss et grands monstres :** grands sprites, animation d'entrée, effets lumineux (lave, flammes, aura).
- [x] Retirer l'ancien code 3D des monstres (`monW`) une fois tout validé.
- [x] Choix : entrée animée pour le Roi Démon seulement (surgit du sol, anneau de flammes, aura rouge) ; êtres immatériels dissipés en fondu (~2 s), golem effondré, autres cadavres 30 s ; couche émissive de lave/flammes toujours allumée ; hydre à sept têtes = 5 têtes.

## ✅ v3.5.4 « Animations de combat pixel-art (1/2) : coups et impacts »
- [x] **Attaques par classe :** Guerrier (arc de taille avec fente, coup d'estoc avec trait), Mage (projectile magique, éclair, soin), Voleur (rafale de 3 dagues, esquive), Rôdeur (tir rapide, tir visé), en poses pixel-art et effets pixel-art.
- [ ] ~~**Réactions** (clignotement, recul, étincelles, esquive sur coup, flash critique)~~ : abandonné, aucune animation d'impact voulue pour l'instant.
- [x] **Monstres :** attaque (déjà en place), nuage de poussière à la mort ; pas d'animation de « touché » (choix). Le cadavre reste 30 s.
- [x] Dragons et golems nettement plus grands (`SZ`).
- [x] Correctif : le zoom (pincement, molette) ne coupe plus le suivi d'un aventurier en 3D.

## ✅ v3.5.5 « Animations de combat pixel-art (2/2) : finitions »
- [ ] ~~Lumière sur les gros coups~~ : abandonnée (choix : aucune animation d'impact).
- [x] **Victoire** (bras levé ~1,8 s à la sortie du combat avec butin), **fuite** (course penchée et plus rapide ~3 s), **mort** (chute au sol puis fondu ~3 s), **bénédiction** (étoiles pixel-art).
- [x] **Boss :** l'animation d'entrée (surgit du sol, anneau de flammes) s'applique aussi aux champions légendaires, dragons, hydres, liches, géants et archidémons. Pas de phases (le combat n'en a pas).
- [x] Ancien anneau rouge remplacé par un cercle pixel-art (poussière et étincelles, couleur de la classe).

## ✅ v3.5.6 « Ambiance sonore »
- [x] **5 musiques** (luth, flûte, violon, harpe de nuit, flûte grave mystérieuse), tirage au sort sans répéter la précédente, changement toutes les 7 min ; les 3 anciennes varient d'un passage à l'autre.
- [x] **Ambiances :** pluie, orage (tonnerre lié aux éclairs en 3D), vent, oiseaux le jour, grillons la nuit, cloche à l'aube et au crépuscule.
- [x] **Deux boutons** : 🔊 musique et 🌦️ ambiances (`bvm`, `bva`).

## ✅ v3.5.7 « Équipements visibles (1/3) : système et paliers »
- [x] **Architecture :** l'arme s'affiche sur le sprite en toutes les poses (repos, attaques, victoire) ; le sprite est régénéré uniquement quand le niveau d'arme `h.eq.w` change ; tables `WPM` (14 matières), `WSW`, `WSD`, `WSS`, `WSB` (formes par palier). Armure, bottes et bouclier suivront en 3.5.8.
- [x] **Armes, paliers 1 à 14** pour les 4 classes (épée, dagues, bâton, arc) : cuivre, bronze, acier, argent, fer noir, mithril, or, obsidienne, rubis, jade, cristal, os, orage, céleste, avec des formes différentes (feuille, courbe, ondulée, dentelée, éclair, cristal, têtes de bâton, arcs variés). Niveau 0 : arme actuelle ; au-delà de 14 : palier 14 jusqu'aux armes légendaires (3.5.9).
- [x] **Couleur de l'aventurier : simple rappel** (enroulement de la poignée, gemme du pommeau, ruban du bâton, poignée de l'arc), choix valable pour 3.5.8 et 3.5.9.
- [x] **Affichage :** mini-image pixel-art de l'arme dans la fiche de l'aventurier et dans le journal (butin, forge, Armurerie, récupération). Le coffre de l'Armurerie ne montre qu'un compteur, il n'y a pas de liste de pièces.

## ✅ v3.5.8 « Équipements visibles (2/3) : armures, bottes, boucliers »
- [x] **Armure, bottes et bouclier (Guerrier), 14 paliers** avec des designs différents (formes, motifs, cols, épaulières, jupes, ornements), pas seulement une teinte, dans les matières des armes ; couleur de l'aventurier en simple rappel (gemme d'emblème, ornements).
- [x] **Tenues par classe :** plaques du Guerrier (avec épaulières à 6 styles), robe du Mage, cuir du Voleur et du Rôdeur, chacune évoluant sur 14 paliers. Les bottes se voient pour les 4 classes (ailes aux paliers 13 et 14).
- [x] **Icônes** pixel-art de l'armure, des bottes et du bouclier dans la fiche et le journal.
- [x] Sprite régénéré quand `h.eq` change (arme, armure, bottes ou bouclier).
- Limite : vu de dos, seules les épaulières et la robe du Mage changent (la cape cache le reste).

## ✅ v3.5.9 « Équipements visibles (3/3) : équipements légendaires »
- [x] **10 thèmes légendaires** sur les paliers 11 à 14 (armes, armures, bottes, boucliers) : 11 glace / foudre, 12 lave / cristal, 13 os et âmes / nature / étoile, 14 **laser** (lame émissive, halo, traînée) / **démoniaque** (noir, flammes noires, cornes, yeux rouges) / **lumière** (blanc doré, rayons). Thème choisi selon l'aventurier, identique sur toutes ses pièces du même palier.
- [x] Variantes par classe : lames (Guerrier, Voleur), têtes de bâton (Mage), arcs à cornes (Rôdeur), motifs sur armures, bottes et boucliers.
- [x] Particules animées limitées (une toutes les 0,3 s par héros, 36 au total) et reflet coloré au sol la nuit.
- [x] Icônes de fiche et de journal à l'image du thème. Couleur de l'aventurier toujours en rappel (emblème).
- Limite : fps sur téléphone non mesurés.

## ✅ v3.6.0 « Correctifs : bâtiments, jour 5 h-21 h, bandeau fixe »
- [x] Les aventuriers ne traversent plus les bâtiments du village (décalage latéral supprimé dans le village, sortie forcée des emprises).
- [x] Jour de 5 h à 21 h pour les combats, repos et guildes ; ciel et lumières alignés (nuit noire jusqu'à 5 h, jour complet vers 6 h 30, nuit à 21 h).
- [x] Bandeau du haut (village, jour, heure, météo, ressources) toujours visible quand on fait défiler l'écran.

## ✅ v3.6.1 « Refonte du monde (1/3) : arbres pixel-art »
- [x] Arbres en modèles 3D texturés en pixel-art : chêne, hêtre, chêne d'automne, bouleau, saule, pin, sapin enneigé, arbre mort, palmier ; 2 variantes de forme pour chêne, hêtre, pin et arbre mort, teinte et taille différentes par arbre.
- [x] Buissons refaits dans le même style (2 variantes).
- [x] Balancement au vent (plus fort par temps nuageux, pluvieux ou orageux), ombres projetées, feuilles qui tombent près de la caméra.
- [x] Placement : saules près des rivières, sapins enneigés en Montagne, arbres morts en Ruines, Donjon et Volcan, quelques palmiers en Ruines.

## ✅ v3.6.2 « Refonte du monde (2/3) : rochers pixel-art »
- [x] Rochers en modèles 3D texturés en pixel-art : granit gris moussu (3 formes, touffes d'herbe au pied sur 2), roche de mine et de montagne à strates (2 formes), roche volcanique à fissures orange (2 formes), galets.
- [x] Fissures de la roche volcanique qui brillent davantage la nuit.
- [x] Taille et teinte variables par rocher.

## ✅ v3.6.3 « Refonte du monde (3/3) : herbe en 3D »
- [x] Herbe en touffes pixel-art en cartes croisées (environ 19 000 touffes) : plaines et bords de chemins, sous-bois de la Forêt avec fougères, quelques touffes en Montagne.
- [x] Balancement au vent, herbe qui se couche au passage des aventuriers (8 au plus).
- [x] Teintes variables : plus jaune près des routes, plus sombre en Forêt, grise en Montagne.
- [x] Densité liée au bouton Qualité (100 % / 60 % / 25 % des touffes).

## ✅ v3.8.1 « Monstres : humanoïdes (2/4) »
- [x] Silhouettes dédiées : chevaliers (4), mages (3), Bandit de grand chemin, Orc maudit, Troll des ombres.

## ✅ v3.8.2 « Monstres : démons, géants, morts-vivants (3/4) »
- [x] Silhouettes dédiées : démons (4 + base), géants (4), Squelette archer, liches (2).

## ✅ v3.9.2 « Nouvelles classes : socle »
- [x] `classes.js` (`regClass`, `CLC`, `CLO`) et `eqb` / `CLB` (`data.js`) : équipement hérité d'une classe de base, visuels propres optionnels (`own:{spr,fx,atk}`).
- [x] Recrutement sur toutes les classes (`recruit`), replis sur la classe de base dans `gl.js` (icônes, sprite, attaques `HAT`, sorts `spellFx`, `ringTex`, pose de sort, bloc victoire) et `map.js` (`shp`).

## ✅ v3.9.1 « Village organique »
- [x] Placement moins régulier (`slot` dans `map.js` : décalage ×2,5, ondulation) ; second anneau décalé d'une demi-case.
- [x] Rotation ±20° des bâtiments en 3D autour de la porte (`BYAW`, `bctr`, `bbox` dans `map.js` ; `TA.yaw` et `yq` dans `gl.js`) ; mairie toujours de face ; drapeau `window.BRO` = 3D active.
- [x] Collisions (`brects`, `bpush`) et allées pavées (`paveVillage`) sur la boîte englobante tournée.
- [x] Cercle de transparence : combat et attente seulement, ovale englobant le monstre (`HE`, `uE` dans le shader).

## ✅ v3.9.0 « Optimisation : fps réglables, veille légère, chargement allégé »
- [x] Bouton 🎞️ 30 / 60 / 120 fps dans les Options (défaut 60, clé `bvf`, limiteur dans `loop` de `main.js`).
- [x] Veille et onglets hors carte : boucle à ≈20 Hz.
- [x] Mesures de résolution adaptative mises à l'échelle du plafond (`K.fi`).
- [x] `gl.js` : clés de reconstruction `gk`/`vk` une image sur trois, 2 allocations par image supprimées.
- [x] `ui.js` : écriture du DOM seulement si le texte change (`sI`, `sT`).
- [x] `three.min.js` allégé (754 → 586 Ko) : 63 symboles utilisés, rendu identique au pixel près.
- [x] `sw.js` : cache d'abord pour `three.min.js`, icônes et manifeste ; cache `bv-v107`.
- [x] Correctif 3D : sprite de l'Enchanteur (`'AFTSEVICN'`).
- Non fait (choix) : minification du code de l'application (gain ≈ 11 % brut, 5 % compressé, au prix d'un dépôt illisible).

## ✅ v3.8.7 « KSVillage : logo, installation et chargement »
- [x] Nom KSVillage, nouveau logo pixel-art (la mairie de face à 34° sur le pavé, écriteau « KSVILLAGE », 4 icônes), manifeste revu, bouton Installer dans les Options, police non bloquante.
- [x] Écran « Chargement en cours… » jusqu'à la première image 3D (ou 2D).

## ✅ v3.8.6 « Suivi : mémoire du dernier aventurier »
- [x] ◀ / ▶ : le premier clic revient sur le dernier aventurier suivi (`lastF`, `folStep` dans `main.js`) ; s'il est mort, sur son 💀 tant qu'il est affiché (`fpt`).

## ✅ v3.8.5 « Fouille accroupie »
- [x] Aventurier accroupi pendant la fouille du butin (`o.cr`, `o.cz` dans `gl.js`).

## ✅ v3.8.4 « Top 10 des villages »
- [x] Onglet Villages dans le Top 10 : classement par jours survécus, une entrée par partie terminée (`vlbRec`, `vlbAdd`, `P.vlb`), détails : victoire, tués, or, morts, bâtiments, meilleur aventurier.
- [x] Numéro à côté du nom quand plusieurs villages portent le même nom (ordre de création, `P.vc`).

## ✅ v3.8.3 « Monstres : bêtes, esprits, golems (4/4) »
- [x] Traits dédiés : Araignée, Chauve-souris, Ver, Salamandre, Banshee, Ombres, Élémentaire de feu, Golem d'obsidienne.

## ✅ v3.8.0 « Variantes de monstres (1/4) »
- [x] Les variantes au sprite identique reçoivent teinte, yeux et/ou taille propres (`monVar` et `KMX` dans `gl.js`).

## ✅ v3.7.0 « Combats plus lents et 4 attaques par classe »
- [x] Animations de combat ralenties (×1,5) ; coups beaucoup moins fréquents (pause de 1,8 à 3,6 s, constantes `ASL` et `AGP` dans `gl.js`) ; le monstre riposte une fois par coup.
- [x] 4 attaques de base par classe avec animations différentes, débloquées aux niveaux 1 / 5 / 10 / 20 (`HLV`), tirées au hasard parmi les débloquées, purement visuelles.

## ✅ v3.7.1 « Gemmes et bâtiment d'enchantement (1/2) »
- [x] **Gemmes :** 4 % par victoire (`GDROP`), stockées uniquement dans l'inventaire de l'aventurier, perdues à sa mort.
- [x] **Bâtiment d'enchantement** + **Enchanteur** ; niveau du bâtiment 1 à 5 = niveau de sort accessible.
- [x] **Apprentissage :** coût en gemmes = niveau du sort (`GCOST` = 1 à 5) ; réussite 50 % + 4 %/niveau du bâtiment + 3 %/niveau de l'Enchanteur (`EN0`, `EN1`, `EN2`) ; échec = gemmes perdues.
- [x] 1 sort maximum par aventurier, perdu à la mort ; pour l'instant le sort est un niveau sans effet (`h.sp`).

## ✅ v3.7.4 « Victoire, butin et couleurs »
- [x] Pose de victoire de 5 s, puis fouille du butin sur le corps du monstre (30 à 45 s selon le butin), pièces animées.
- [x] Double tap : réinitialise aussi la rotation de la caméra.
- [x] Couleurs des aventuriers plus vives (migration automatique des héros existants).

## ✅ v3.7.3 « Une animation par sort »
- [x] Une animation 3D propre à chacun des 20 sorts, distincte des attaques de base (nouvelles textures : anneau, bulle, rocher, pièce, empreinte, flamme, bouclier, piège) ; l'Esquive fait reculer le héros.

## ✅ v3.7.2 « 5 sorts par classe (2/2) »
- [x] 5 sorts par classe (table `SPD` dans `data.js`), un par niveau d'enchantement ; effets : puissance, risque de mort, or, ressources, fuites converties en victoires (Soin).
- [x] Lancement automatique une fois par combat, à mi-combat, avec journal et animation 3D (aura + effet propre).
- [x] Nom et effet du sort affichés dans l'onglet Aventuriers.

## ✅ v3.6.9 « Micro-ajustement de la piste »
- [x] Les deux traits noirs (ornières) de la piste sont retirés.

## ✅ v3.6.8 « Nouvelle piste de terre »
- [x] Ancienne texture pavée des routes supprimée, remplacée par une piste de terre en haute résolution : ornières, crête d'herbe, cailloux, flaques, fissures, bords effrités, largeur irrégulière, relief.

## ✅ v3.6.7 « Chemins retravaillés et biomes selon la sous-zone »
- [x] Chemins en terre : largeur irrégulière, bords usés mêlés d'herbe, cailloux, flaques, racines près de la forêt, pavés par plaques seulement, léger creux en relief.
- [x] Taille des biomes selon la sous-zone (×0,6 / ×1 / ×1,5) pour toutes les zones ; durées de trajet inchangées ; parties existantes inchangées.

## ✅ v3.6.6 « Correctifs : meute, nouvelle partie, bandeau, chemins »
- [x] Meute : les 3 loups apparaissent côte à côte (placés selon l'angle de la caméra).
- [x] Nouvelle partie : mairie et auberge s'affichent à la nouvelle position du village.
- [x] Or / bois / pierre : grandes cases dans l'onglet Bâtir, ligne compacte dans le bandeau permanent ailleurs.
- [x] Double tap sur la carte : le village est centré et zoomé (3D et 2D).
- [x] Allées du village supprimées, seul le pavé reste.
- [x] Aventuriers : suivent le chemin de terre de près (décalage latéral réduit, plus de points de passage).
- [x] Herbe 3D : placée autour des chemins, presque aucune sur le chemin.

## ✅ v3.6.5 « Correctifs : rond de transparence et bâtiments »
- [x] Rond de transparence : position calculée à l'écran (`gl_FragCoord`), il fonctionne enfin sur les grandes feuilles proches de la caméra (zoom maximal en forêt).
- [x] Les aventuriers contournent les bâtiments en route (allers et retours) au lieu de les traverser.

## ✅ v3.6.4 « Correctifs : transparence, actualisation, menu Développeur, flou »
- [x] Rond de transparence autour de l'aventurier : appliqué aussi à l'herbe, marge de profondeur réduite et rayon agrandi (environ 20 %).
- [x] L'actualisation de la page en glissant vers le bas est désactivée.
- [x] Menu Développeur : le bandeau fixe ne cache plus la première option.
- [x] Zone de flou (haut et bas de l'écran) agrandie : elle commence plus tôt (0,10 au lieu de 0,20 de l'écran à partir du centre).

## ✅ v3.9.3 « Coiffures et yeux selon le sexe »
- [x] **Garçons :** yeux bleus, cheveux courts. **Filles :** yeux roses, cheveux longs (plus de couleur d'yeux aléatoire : `PXEY`, `ec` dans `pxSprite`).
- [x] **5 coiffures par sexe (style manga / jeu vidéo japonais)**, tirées selon l'`id` du héros (couleur de cheveux aléatoire conservée, `PXHR`). Face et dos, toutes les poses.
- [x] Concerne les 4 classes de base (`G`, `V`, `M`, `R`) et les PNJ qui ont des cheveux (fonction `NP`). Les coiffures sont des paramètres du sprite, utilisables ensuite par les nouvelles classes (casque, capuche, bonnet cachent ou remplacent la coiffure).
- [x] Anciennes sauvegardes : les héros existants reçoivent coiffure et yeux selon leur `id` (migration dans `loadG`, rien n'est perdu).
- [x] Mode 2D : vérifier qu'il n'est pas cassé. Tests : captures de toutes les coiffures (homme/femme, face/dos), sauvegardes.

## ✅ v3.9.4 « Nouvelle classe : Paladin »
- [x] `regClass('Pa',…)` : base équipement **Guerrier** (épée, armure, bottes, bouclier), icône ✚, puissance 1,05, mortalité 0,30, « le plus résistant ».
- [x] 5 sorts : Lumière sacrée `{w:.03}`, Bénédiction `{d:.125}`, Châtiment `{w:.06}`, Imposition des mains `{d:.2,f:.2}`, Jugement dernier `{w:.1,d:.15}`.
- [x] Sprite propre (homme/femme, face/dos, repos/action, marche, construction, victoire), 4 attaques (`HAT`), 5 animations de sort (`spellFx`, clés `Pa1` à `Pa5`), couleur de sort (`CLC`), entrée `own:{spr,fx,atk}`.
- [x] **Silhouette validée** (aperçu v2) : grandes ailes blanches, casque ailé à nasal, auréole dorée, cape blanche, écu blanc à croix bleue.
- [x] **Lisibilité de l'équipement à régler (vu sur l'aperçu, thèmes 1 à 10 au palier 14) :** le tabard, les ailes et la cape blancs cachent l'armure et se mélangent aux thèmes sombres (Démon, Éclair, Obsidienne) ; seuls l'arme, le bouclier et les épaulières restent visibles. À faire : tabard réduit à une bande étroite pour laisser voir le plastron et les bottes ; ailes, cape et casque teintés avec la palette du thème (`THP`) quand l'équipement en a un, blanc doré sinon ; épaulières et bouclier toujours visibles. Contrôler les 10 thèmes aux paliers 1, 7, 11 et 14, de face et de dos.
- [x] Armes et armures : **celles du Guerrier, pas de nouvelles** (choix validé). Tests : simulation (équilibre vs 3.9.3), captures de tous les paliers (1, 7, 14), sauvegardes.

## ✅ v3.9.5 « Nouvelle classe : Assassin »
- [x] `regClass('As',…)` : base **Voleur** (dague, armure, bottes), icône ✦, puissance 1,20, mortalité 0,75, or +15 %.
- [x] 5 sorts : Lame empoisonnée `{w:.03}`, Pas de l'ombre `{d:.125}`, Coup dans le dos `{w:.06}`, Marque de mort `{g:.125}`, Danse des lames `{w:.1,d:.15}`.
- [x] **Silhouette validée :** sans capuche, cheveux en pointes (coiffure du héros cachée en partie), bandeau et masque verts, écharpe verte flottante, épaulière, bandoulière de lames.
- [x] Sprite complet, 4 attaques, 5 animations de sort, couleur ; équipement du Voleur inchangé ; tests.

## ✅ v3.9.6 « Nouvelle classe : Nécromancien »
- [x] `regClass('Ne',…)` : base **Mage** (bâton, armure, bottes), icône ●, puissance 1,15, mortalité 0,70, or +15 % et ressources +15 %.
- [x] 5 sorts : Drain de vie `{w:.03}`, Armée d'os `{d:.125}`, Malédiction `{w:.06}`, Pillage des tombes `{g:.1,r:.1}`, Danse macabre `{w:.1,d:.15}`.
- [x] **Silhouette validée :** capuche à deux cornes d'os, pointes d'os aux épaules, crâne et côtes sur la robe, crâne vert flottant.
- [x] Sprite complet, 4 attaques, 5 animations de sort, couleur ; équipement du Mage inchangé ; tests.

## ✅ v3.9.7 « Nouvelle classe : Chasseur »
- [x] `regClass('Ch',…)` : base **Rôdeur** (arc, armure, bottes), icône ➤, puissance 1,10, mortalité 0,50, ressources +25 %.
- [x] 5 sorts : Tir visé `{w:.03}`, Œil du chasseur `{r:.075}`, Piège à loups `{w:.06}`, Appât `{r:.125}`, Volée mortelle `{w:.125,d:.05}`.
- [x] **Silhouette validée :** bonnet de fourrure à bois de cerf, épaulières de fourrure, croc en pendentif.
- [x] Sprite complet, 4 attaques, 5 animations de sort, couleur ; équipement du Rôdeur inchangé ; tests ; équilibrage final des 8 classes.

### Règles communes aux 4 classes (validées)
- Toutes recrutables dès le départ. Effets de sorts existants seulement (puissance `w`, mortalité `d`, or `g`, ressources `r`, fuite→victoire `f`).
- Le socle est en place depuis la 3.9.2 : `classes.js` (`regClass`, `CLB`, `CLO`, `CLC`). Les couleurs du sprite suivent le palier d'équipement porté.
- Prototype des sprites : fonctions `Pa`, `As`, `Ne`, `Ch` écrites sur le moteur `pxSprite` (paramètres de palette ajoutés à `G`, `V`, `M`, `Rg`) ; elles ne sont dans aucune release, à réécrire proprement dans `gl.js`.
- Non vérifiable ici : fps et batterie sur le Z Fold 3, rendu 2D.

## ✅ v3.9.8 « Équilibrage des 8 classes »
- [x] **Puissance et mortalité rapprochées de la moyenne** pour que chaque classe ait sa chance : puissance entre 1,05 et 1,15, mortalité entre 0,45 et 0,65 (Guerrier 1,12 / 0,50, Voleur 1,05 / 0,55, Mage 1,15 / 0,65, Rôdeur 1,05 / 0,55, Paladin 1,10 / 0,45, Assassin 1,12 / 0,62, Nécromancien 1,10 / 0,60, Chasseur 1,08 / 0,52). Les bonus d'or et de ressources ne changent pas. Les valeurs données plus haut pour les nouvelles classes sont celles de leur sortie.

## ✅ v4.0.x « Refonte des animations »
Grande mise à jour de toutes les animations, en trois étapes : aventuriers, puis PNJ, puis monstres. Chaque étape sera cadrée avec des questions avant le codage.

### v4.0.0 « Animations des aventuriers » ✅
- [x] **Marche :** cycle de 6 images par vue (face, dos, côté), balancement des bras, rebond, cape/cheveux ; la vue de côté est dérivée de la face.
- [x] **Postures de combat (8 classes) :** attente en combat, pose de sort ; attaques existantes conservées.
- [x] Rendu 3D seulement ; textures 13 → 29 images par héros.
- [ ] À surveiller en jeu : fps/batterie, vitesse du cycle, seuil face/côté (`Math.abs(fx)>.78` dans `sprUpd`).

### v4.0.1 « Animations des PNJ » ✅
- [x] **Ballades** autour du bâtiment au repos, retour au poste pendant un service ou des travaux.
- [x] **Marche** 6 images (face, dos, côté) pour les 9 PNJ ; vue de côté dérivée de la face.
- [x] **Geste de service** propre à chaque métier et **petit geste de repos** ; respiration plus visible.
- [x] Rendu 3D seulement ; textures 4 → 28 images par PNJ.
- [ ] À surveiller en jeu : croisements entre PNJ voisins, vitesse de marche, fps/batterie.

### v4.0.2 « Animations des monstres » ✅
- [x] **Apparition sur place** améliorée selon la famille (poussière, lueurs, flammes) avec petit rebond.
- [x] **Élan** plus ample avec recul d'armement ; **chute** améliorée commune (rebond, repoussée, poussière à l'impact).
- [x] **Entrées propres** : dragon (atterrissage), hydre (vapeur), seigneur liche et archidémon (portail).
- [x] Aucune nouvelle image (mouvement et effets seulement), 3D seulement.
- [ ] À surveiller en jeu : lisibilité des effets, taille de l'élan, fps/batterie.

## ✅ v4.0.3 « Attente d'apparition et blessure durable »
- [x] **Attente de 3 à 10 s** en posture de combat (rond transparent actif) avant l'apparition du monstre, puis combat inchangé.
- [x] **Blessure jusqu'au village :** posture blessée conservée pendant tout le retour, vitesse à 60 % (`HSP`), temps restant mis à jour.
- [ ] À surveiller en jeu : durée totale d'une quête (+6,5 s en moyenne par combat), fréquence des fuites.

## ✅ v4.0.4 « Icônes bois et pierre »
- [x] **Icônes maison** (SVG pixel-art) pour le bois et la pierre dans le bandeau, à la place des emoji 🪵 et 🪨 absents de Windows 10 ; 🪄 remplacé par 🔮.

## ✅ v4.0.5 « Patch d'urgence : carte blanche »
- [x] **Récupération** après perte de la puce graphique : sauvegarde, rechargement, repli en 2D à la 2e perte en 10 min.
- [x] **Gel allégé** et message « Construction en cours ».
- [x] **Mode 3D sans échec** (bouton de diagnostic dans les Options).
- [ ] **Cause du plantage 3D sur le Z Fold 3 : non trouvée.** À tester : redémarrage du téléphone, puis 3D sans échec.

## ✅ v4.0.6 « Diagnostic 3D »
- [x] **5 interrupteurs 3D** dans le menu Développeur (enceinte, chantiers, puits, village, personnages et monstres).
- [x] **3D sans échec** déplacée dans le menu Développeur.
- [ ] Résultats à relever sur le Z Fold 3. v4.0.5 : redémarrage et 3D sans échec sans effet, plantage aussi par temps clair.

## ✅ v4.0.7 « Diagnostic 3D détaillé »
- [x] **Cases à cocher** avec « Valider et recharger », « Tout cocher » et « Tout décocher ».
- [x] **« Tout le village » découpé :** sol en relief, bâtiments, Maison des Guildes, lampes et torches, détails.
- [ ] Résultats à relever. v4.0.6 sur Z Fold 3 : 3D correcte avec tout masqué, plantage en réaffichant « Tout le village » (enceinte, chantiers, puits, personnages encore masqués).

## ✅ v4.0.8 « Sol allégé et menus rangés »
- [x] **Sol du village au choix :** Actuel (conservé), Allégé (par défaut), Aucun.
- [x] **Menus :** noms et genres, classement et réinitialisation dans les Options ; « Affichage 3D » replié dans Développeur.
- [x] **Messages :** « force l'arrêt de Chrome ».
- [ ] **Essai du sol allégé sur le Z Fold 3.** Résultat v4.0.7 : le sol en relief déclenche le plantage, tous les autres éléments affichés fonctionnent. Cause exacte inconnue.
- [ ] Le sol actuel (beau) est à garder : à rétablir par défaut si la cause est trouvée.

## ✅ v4.0.9 « Enquête sur le sol »
- [x] **Trois réglages séparés du sol :** relief, grande image, dessin comme avant.
- [x] **Résultats Z Fold 3** (réglages : 1 relief, 2 grande image, 3 dessin comme avant) : 1, 2, 3, 1+2, 1+3 et 2+3 fonctionnent ; **seul 1+2+3 plante**. Hypothèse non prouvée : limite de la partie graphique. 60 fps constants signalés (avant : 30 à 40 en forêt ; lien avec le sol non mesuré).
- [ ] Mis de côté : dernier bâtiment qui dépasse dans la clôture (contour calculé surtout d'après les centres).

## ✅ v4.1.0 « Sol définitif et correctifs »
- [x] **Sol du village :** forcer **1+2** (relief + grande image, dessin demandé sur le processeur). L'option 3 « Dessin comme avant » ne doit plus être disponible ; un ancien réglage enregistré qui la contient (`bvsol`) ne doit plus l'appliquer.
- [x] **Statut « undefined »** dans l'onglet Aventuriers pendant la récupération du butin : corriger.
- [x] **Autres trous :** vérifier tous les états d'un aventurier pour trouver les textes manquants ou « undefined ».
- [x] **Rond de transparence :** le garder pendant que l'aventurier récupère le butin.
- [ ] Essai sur le Z Fold 3 (sol, 3D, rond de transparence).

## ✅ v4.1.1 « Suivi des morts »
- [x] **Cibler un aventurier mort avec les flèches** (déjà demandé auparavant, à corriger). Il peut rester affiché dans l'onglet Aventuriers comme **mort**.
- [x] **Durée :** ciblable et affiché **tant que sa tête de mort est visible sur la carte** (actuellement 240 s dans le code).
- [x] Compatibilité des anciennes sauvegardes.
- [x] **Rond de transparence (ajout) :** transition rapide de 0,3 s.
- [ ] Essai sur le Z Fold 3.

## ✅ v4.1.2 « Un village plus spacieux »
- [x] **Agrandir le contour de la clôture** avec un espace de sécurité : aucun bâtiment dans la clôture, aucune entrée collée à elle. Constat (v4.0.9) : le contour (`vdim`, map.js) est calculé surtout d'après le centre des bâtiments, sans leur taille.
- [x] **Entrées dans les barrières du village :** les agrandir (trop petites).
- [x] **Marge de sécurité autour des bâtiments :** les aventuriers y rentrent encore.
- [x] Vérifier palissade en bois et remparts en pierre, en 2D et en 3D. Le sol du village change de taille avec le contour : revérifier la 3D sur le Z Fold 3.
- [x] **Bâtiments écartés d'environ 15 %** (ajout).
- [ ] Essai sur le Z Fold 3.

## ✅ v4.1.3 « Montagne et volcan »
- [x] **Marcher sur le relief :** à la montagne, le personnage rentre dedans au lieu de marcher dessus. Corriger aussi le volcan.
- [x] Vérifier également les monstres et le butin à ces endroits.
- [x] **Rochers :** passages et zones de combat dégagés.
- [ ] Essai sur le Z Fold 3.

## ✅ v4.1.4 « À cheval »
- [x] **Refaire le cheval en pixel art dans la vue 3D** (même style 2D que les personnages).
- [x] **C'est le cheval qui court**, plus l'aventurier.
- [x] **Posture et combat :** assis en selle ; à pied en combat et pendant le butin.
- [ ] Essai sur le Z Fold 3.

## ✅ v4.1.5 « Console, encadrés et affichage »
- [x] **Console, sous-zone :** afficher le nom de la sous-zone au lieu de celui de la zone (expéditions de guilde et autres messages qui nomment une zone).
- [x] **Console, débuts de combat :** retirer ces messages.
- [x] **Console, primes :** ajouter un message quand une nouvelle prime est disponible.
- [x] **Durées :** n'afficher que les temps de trajet (liste des aventuriers, carte 2D et 3D) ; retirer les temps des actions.
- [x] **Chevaux à vendre :** les placer dans l'encadré du Palefrenier.
- [x] **Primes :** les placer dans l'encadré du Tavernier.
- [x] **Aventurier suivi :** son nom passe en jaune pâle.
- [ ] Essai sur le Z Fold 3.

## ✅ v4.1.6 « Combats lisibles »
- [x] **Cercle de combat :** retirer le cercle sous les aventuriers qui combattent (2D et 3D).
- [x] **Clairières :** placer les combats dans un espace sans arbres, surtout en forêt.
- [x] **Transparence :** vérifier que le cercle de transparence agit sur tous les arbres.
- [ ] Essai sur le Z Fold 3.

## ✅ v4.1.7 « Guildes : inscription et coffre »
- [x] **Inscription :** tout aventurier sans guilde peut en rejoindre une, quel que soit son niveau (dans la limite des places). Fonder une guilde reste réservé au niveau 5.
- [x] **Passage par le bâtiment :** l'inscription se fait uniquement à la Maison des Guildes ; une nouvelle recrue n'entre plus automatiquement dans une guilde.
- [x] **Coffre de guilde :** chaque guilde a son coffre. Un membre qui obtient un objet égal ou moins bon que le sien l'y dépose au lieu de le revendre.
- [x] **Retrait :** à la Maison des Guildes, un membre prend dans le coffre un objet compatible meilleur que le sien.
- [x] **Interface :** afficher le contenu du coffre dans les informations de la guilde.
- [x] **Sauvegardes :** migration des anciennes parties (coffre vide).
- [x] **Équilibre :** comparer l'or avant/après (reventes en moins, part des achats).
- [x] **Dissolution :** le contenu du coffre est revendu et les pièces reviennent au village.
- [x] **Part des achats :** sauf pour les maisons, environ 50 % de l'argent des achats faits au village revient à la caisse (au lieu de 100 %). Le reste représente le gagne-pain des PNJ, dont la gestion n'est pas à implémenter pour l'instant.
- [ ] Essai sur le Z Fold 3.

## ✅ v4.1.8 « Expéditions de guilde »
- [x] **Rendez-vous :** l'expédition est annoncée, les membres s'attendent à la Maison des Guildes ; départ quand tous sont là ou après un délai limite.
- [x] **Trajet groupé :** départ ensemble, au rythme du plus lent.
- [x] **Même destination :** les membres vont au même endroit, légèrement écartés pour que les sprites ne se chevauchent pas.
- [x] **Duels séparés :** même ennemi pour tous, mais chacun affronte le sien, avec son propre résultat (victoire, fuite ou mort) et son butin.
- [x] **Sauvegardes :** compatibilité des expéditions en cours.
- [x] **Équilibre :** comparer or, quêtes par jour et morts avant/après.
- [x] Précisé : délai de 60 s ; bonus de +5 % par autre membre conservé dans chaque duel.
- [ ] Essai sur le Z Fold 3.

## ✅ v4.1.9 « Équipement : icônes et noms »
- [x] **Icônes plus lisibles :** en particulier les bottes niveau 1 (aujourd'hui un simple rectangle marron).
- [x] **Nom de l'objet :** toucher une icône affiche son nom.
- [ ] Essai sur le Z Fold 3.

## ✅ v4.2.0 « Équipement visible sur le sprite »
- [x] **Apparence :** le personnage reflète ses objets, bottes comprises (3D ; 2D inchangée à la demande). Bottes plus visibles avec revers contrasté.
- [ ] Essai sur le Z Fold 3.

## ✅ v4.2.1 « Village en anneaux »
- [x] **Disposition :** place centrale, bâtiments en anneaux irréguliers tournés vers la place ou la rue, pour supprimer l'effet de grille.
- [x] **Ruelles :** chemins courbes ; vérifier les remparts, les portes et les déplacements (aucun passage à travers les bâtiments).
- [x] **Sauvegardes :** replacer les bâtiments des anciennes parties.
- [ ] Essai sur le Z Fold 3.

## ✅ v4.2.2 « Village entièrement pavé »
- [x] **Sol :** tout le village pavé ; ruelles en pavés un peu plus clairs.
- [ ] Essai sur le Z Fold 3.

## ✅ v4.3.0 « Nouveau Guerrier (1/2) »
- [x] **Menu Développeur :** bouton « Personnage », non par défaut, mémorisé, appliqué après rechargement.
- [x] **Guerrier homme (3D) :** marche face, dos, profil ; équipements indépendants ; couleurs de cheveux variées.
- [ ] Essai sur le Z Fold 3 (taille, fluidité).

## ✅ v4.3.1 « Nouveau Guerrier (2/2) »
- [x] **Combat et victoire :** attaques de profil, posture entre deux attaques, sans doubler les effets du jeu.
- [x] **Construction :** de profil, marteau intégré au sprite.
- [x] **Cheval :** jambes découpées dans les sprites, nouveau cavalier, cheval x2 (détail).
- [x] **Fouille accroupie.**
- [ ] Essai sur le Z Fold 3.

## ✅ v4.3.2 « La Guerrière »
- [ ] **Rangement :** images du personnage dans un dossier `img/` (reporté : elles restent à la racine).
- [x] **Guerrière :** silhouette affinée, visage, queue de cheval ; marche, actions et cheval ; 12 couleurs de cheveux ; bouton « Personnage ».
- [x] **Fouille :** jambes corrigées.
- [ ] Essai sur le Z Fold 3.
- [x] Autres coiffures : faites en v4.3.3.

## ✅ v4.3.3 « Les coiffures »
- [x] **Coiffures :** 5 par sexe (Guerrier et Guerrière), au hasard, anciens héros compris ; bouton « Personnage ».
- [x] **Bouche de la Guerrière :** ne prend plus la couleur de la cape.
- [ ] Essai sur le Z Fold 3.

## ✅ v4.4.0 « Le Paladin (1/2) »
- [x] **Paladin homme :** nouveau design (crâne nu de base), apparence et marche face, dos, profil.
- [x] **Coiffures :** les 5 coiffures homme existantes, têtes réutilisées.
- [x] **Ailes et auréole :** visibles dès le départ ; ailes « discrètes » ; auréole dessinée par code, taille validée.
- [x] **Équipement :** épées et boucliers du Guerrier réutilisés (positions recalculées) ; le Paladin garde ses épaulières, recolorées selon le palier.
- [x] **Activation :** bouton « Personnage » du menu Développeur (non par défaut).
- [ ] Essai sur le Z Fold 3.
- Femme : dans une release suivante.
- Sources : face validée, export PixelLab (rotations, marche et attaque East), planche des ailes.

## v4.4.1 « Le Paladin (2/2) » (prochain)
- [ ] **Actions :** combat, victoire, construction, fouille, avec ailes et auréole. Traînée de l'attaque PixelLab à effacer.
- [ ] **Cheval :** Paladin cavalier, avec ailes et auréole.
- [ ] Essai sur le Z Fold 3.

## ⏸️ Mis de côté
- [ ] Écran blanc bref au passage en qualité Haute (v4.0.8, Z Fold 3) : non étudié. Il est revenu à la normale en changeant de qualité. À prioriser s'il revient.

## 📝 Notes de dépannage (Z Fold 3)
- 3D bloquée en blanc après un plantage : **forcer l'arrêt de Chrome** suffit à la débloquer.
- Après un envoi sur GitHub, l'appli peut garder l'ancienne version ou mélanger les fichiers (menu ⚙️ sans effet constaté en restant en 4.0.7) : vérifier la version dans les Options. Ouvrir le lien GitHub Pages a donné accès à la 4.0.8 quand l'appli restait en 4.0.7.
- Ne pas effacer les données du site (perte de la sauvegarde).

## 📱 Guide APK

- [ ] **Transformer l'application en APK :** guide pas à pas avec PWABuilder à partir du lien GitHub Pages. L'APK obtenu est une coquille qui ouvre le jeu, il ne le rend pas natif.

## ⏳ En attente / à étudier plus tard
- [x] **Top 10 des villages :** fait en v3.8.4.
- [x] **Monstres manquants :** fait en v3.8.0 à v3.8.3.
- [ ] **Animation d'entrée propre à chaque monstre de haut niveau** (dragon ancien, seigneur liche, archidémon, hydre à sept têtes, golems…) — *fait en v4.0.2 pour le dragon, l'hydre, la liche et l'archidémon ; reste les golems et les géants*, sur le modèle de celle du Roi Démon (`b.enter` et `ring` dans `buildSprMon`).
- [ ] **Idées de la refonte 2D à adapter à la 3D (ex-v3.3.x) :** torches tenues en main et lumières chaudes, rivières animées et reflets, particules d'ambiance (lucioles, fumée, brume, braises), lumière et secousse de caméra sur les gros coups en combat.
- [ ] **Compétence unique par classe (idée) :** chaque classe aurait un talent propre, pour que les nouvelles classes ne soient pas favorisées. Premier exemple : le **Nécromancien** a très peu de chance de recevoir en allié le monstre qu'il vient de combattre. À définir : nature du talent pour les 7 autres classes (Guerrier, Voleur, Mage, Rôdeur, Paladin, Assassin, Chasseur), mécanisme et probabilité de l'allié, équilibrage.
- [ ] **Multijoueur (en dernier) :** mode coopératif où les villages de deux joueurs se rassemblent. Nécessite un serveur (Firebase ou équivalent), hors périmètre actuel.
- [ ] **Widget / arrière-plan :** impossible en web (le jeu se fige écran éteint). Demanderait une réécriture en Android natif (Kotlin) avec service permanent. Non retenu pour l'instant.

## ❌ Abandonné
- [x] ~~**Équilibrage général :** mis de côté pour le moment.~~
- [x] ~~**Rattrapage hors-ligne :** non souhaité.~~
      
