# 🏰 Backlog et Feuille de Route - Mon Jeu de Village

Version actuelle du jeu : **v2.7b « Nouveau Monde : décors (2/2) »**

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

## 🎨 v2.8 « Vie du village & Équilibre » (prochain)

### Village, Éclairage & Déplacements complets
- [ ] **Agrandir et réorganiser le village :** agrandir la zone du village, espacer davantage les bâtiments entre eux, redessiner les bâtiments avec plus de détails (toits, portes, cheminées) et placer la **Mairie au centre**.
- [ ] **Éclairage ciblé et naturel :** ne placer les lumières du village qu'aux extrémités (périmètre extérieur) et une seule devant chaque entrée de bâtiment. Le long des chemins, décaler les lampadaires aléatoirement à gauche ou à droite du tracé (position fixée une fois au chargement).
- [ ] **Déplacements et durée des actions dans le village :** chaque action au village (dépôt de butin à la **Mairie**, achat à la forge, achat de maison/cheval, soin au sanctuaire, repos à l'**Auberge**) nécessite un déplacement visuel vers le bâtiment précis. Chaque action sur place prend du temps (environ **1 à 2 minutes** en jeu). Lors d'un retour d'expédition avec récompense, l'aventurier passe d'abord par la **Mairie** avant d'enchaîner ses autres actions.
- [ ] **Révision des temps de trajet (Carte) :** ajuster la durée des déplacements vers les lieux d'aventure pour que le lieu le plus éloigné prenne environ **5 minutes** pour l'aller (sans monture).
- [ ] **Avantage du cheval :** une fois acheté, le cheval doit réduire considérablement le temps de trajet sur la carte.

### Rééquilibrage (Combats, Difficulté & Achats)
- [ ] **Suppression totale de la protection débutants :** retirer complètement la protection des niveaux 1 et 2 dans les 2 premiers jours (les aventuriers peuvent mourir dès le jour 1).
- [ ] **Restaurer l'équilibrage des lieux et sous-zones :** vérifier et corriger l'équilibrage des zones et sous-zones qui semble avoir été cassé lors de la suppression de l'affichage du « danger » en v2.7 (garder l'affichage sans texte de danger, mais rétablir la vraie progression de difficulté entre les lieux et sous-zones).
- [ ] **Logique d'achat et d'épargne des aventuriers :** corriger le comportement d'achat des aventuriers qui dépensent tout leur or dans les objets de la forge (~15 po) et n'achètent jamais ni maison (~50 po) ni cheval. Trouver un équilibre d'épargne/priorité pour que l'équipement reste prioritaire au début, mais qu'ils finissent par économiser et acheter un cheval et une maison.

### Ambiance sonore (Musique)
- [ ] **Rotation de 3 musiques médiévales chill (Web Audio) :** conserver la mélodie actuelle au luth et ajouter **2 nouvelles mélodies** avec d'autres instruments médiévaux (ex. : flûte, harpe ou viole) en mode calme/chill. Faire alterner les 3 styles automatiquement toutes les **10 minutes**.

## 🔋 v2.9 « Longue veille » : Optimisation
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
