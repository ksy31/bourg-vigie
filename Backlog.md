# 🏰 Backlog et Feuille de Route - Mon Jeu de Village

Version actuelle du jeu : **v3.0.3 « Chantiers & Bâtisseurs »**

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

## ✨ v3.0.4 « Notifications, Lumières & Cache final » (prochain) : Finitions & Optimisation (2/2)
- [ ] **Notification de combat et message de mort :** remplacer « vs » par l'icône des épées (**⚔️**), afficher le résultat pendant quelques secondes (**écriture verte** si gagné, **écriture rouge** si mort) et **rallonger le message de mort**.
- [ ] **Équilibrage des lumières et cache final du décor :** réduire la luminosité centrale des lampadaires, intensifier la lumière portée par les **aventuriers** la nuit, rendre le **petit rond jaune du butin porté par l'aventurier** lumineux, et mettre en cache le décor statique généré de la carte et du village.

## 👹 v3.0.5 « Bestiaire illustré » : Monstres modélisés
- [ ] **Modélisation graphique des monstres :** dessiner les monstres sur la carte dans le même style détaillé que les aventuriers (silhouettes, postures et détails propres à chaque créature).

## 📱 Guide APK
- [ ] **Transformer l'application en APK :** guide pas à pas avec PWABuilder à partir du lien GitHub Pages. L'APK obtenu est une coquille qui ouvre le jeu, il ne le rend pas natif.

## ⏳ En attente / à étudier plus tard
- [ ] **Multijoueur (en dernier) :** mode coopératif où les villages de deux joueurs se rassemblent. Nécessite un serveur (Firebase ou équivalent), hors périmètre actuel.
- [ ] **Widget / arrière-plan :** impossible en web (le jeu se fige écran éteint). Demanderait une réécriture en Android natif (Kotlin) avec service permanent. Non retenu pour l'instant.

## ❌ Abandonné
- [x] ~~**Équilibrage général :** mis de côté pour le moment.~~
- [x] ~~**Rattrapage hors-ligne :** non souhaité.~~
      
