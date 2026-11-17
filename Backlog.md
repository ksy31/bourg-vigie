# 🏰 Backlog et Feuille de Route - Mon Jeu de Village

Version actuelle du jeu : **v2.9.4 « Montée en puissance »**

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

## 👑 v2.9.5 « L'Épreuve du Roi Démon » (prochain) : Sélection naturelle & Soutien du village
- [ ] **Rôle amplificateur du village et combat final :** calibrer l'impact du village (équipement, bénédictions, repos) de sorte que n'importe quel aventurier ait théoriquement sa chance sur une série aléatoire très favorable, mais que les améliorations du village augmentent fortement ses probabilités de survie. Exiger environ le **niveau 50** pour avoir une vraie chance de vaincre le **Roi Démon** (taux de réussite global exigeant : **5 % à 10 %**).

## 🏷️ v2.9.6 « Étiquettes & Symboles » : Lisibilité et UI
- [ ] **Nom et niveau affichés en permanence :** afficher constamment le nom et le niveau au-dessus de tous les personnages (aventuriers et PNJ) sur la carte et au village, sans avoir besoin de cliquer dessus.
- [ ] **Symboles de genre :** remplacer les lettres **M** et **F** par les symboles **♂** et **♀** dans l'interface et le Menu Développeur.

## 🏨 v2.9.7 « Grande Auberge & Veille Nocturne » : Village et lumières
- [ ] **Agrandissement de l'Auberge :** redessiner l'Auberge avec un style hôtel à plusieurs étages, et masquer complètement les aventuriers lorsqu'ils s'y reposent (ils ne doivent plus apparaître à l'extérieur ou en transparence).
- [ ] **Refonte de l'éclairage nocturne :** supprimer le rond jaune au centre des lampadaires, et reporter cet effet lumineux central uniquement sur les **aventuriers** (pas les PNJ) lorsqu'il fait nuit.

## 🏞️ v2.9.8 « Terres sauvages & Rivières » : Carte, chemins et paysages
- [ ] **Ajustement de l'échelle et des chemins :** réduire légèrement la taille globale de la carte tout en agrandissant davantage les zones d'environnement, et faire en sorte que les chemins ne se croisent jamais.
- [ ] **Remplissage cohérent des grandes zones :** étendre naturellement les zones naturelles (forêts denses composées de dizaines voire centaines d'arbres, larges massifs montagneux) tout en conservant une échelle réaliste et proportionnée pour les structures bâties (châteaux, ruines).
- [ ] **Rivières et ponts :** générer une ou plusieurs rivières prenant leur source dans les montagnes et serpentant sur la carte, avec la création automatique de **ponts** à chaque endroit où un chemin traverse l'eau.

## 🔋 v2.10.0 « Longue veille » : Optimisation
- [ ] **Réduction de la consommation de batterie :** mise en cache de la carte (sol, routes, village), rendu limité à environ 20 images/s, rafraîchissement du seul onglet affiché, fond noir pur en mode sombre (écran AMOLED).

## 📱 Guide APK
- [ ] **Transformer l'application en APK :** guide pas à pas avec PWABuilder à partir du lien GitHub Pages. L'APK obtenu est une coquille qui ouvre le jeu, il ne le rend pas natif.

## ⏳ En attente / à étudier plus tard
- [ ] **Multijoueur (en dernier) :** mode coopératif où les villages de deux joueurs se rassemblent. Nécessite un serveur (Firebase ou équivalent), hors périmètre actuel.
- [ ] **Widget / arrière-plan :** impossible en web (le jeu se fige écran éteint). Demanderait une réécriture en Android natif (Kotlin) avec service permanent. Non retenu pour l'instant.

## ❌ Abandonné
- [x] ~~**Équilibrage général :** mis de côté pour le moment.~~
- [x] ~~**Rattrapage hors-ligne :** non souhaité.~~
- [ ] 
