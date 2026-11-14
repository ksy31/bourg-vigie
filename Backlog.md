# 🏰 Backlog et Feuille de Route - Mon Jeu de Village

## 🚨 Étape 1 : Corrections de bugs et blocages (Priorité absolue)
- [ ] **Verrouiller le zoom :** Empêcher le zoom sur toute l'interface de l'application (CSS/Viewport) et ne garder le zoom actif uniquement sur la carte (map).
- [ ] **Écran toujours allumé :** Activer par défaut le mode "écran toujours allumé" (Wake Lock) et supprimer l'option de l'interface.

## 🎨 Étape 2 : Améliorations rapides, Textes et UI (Facile)
- [ ] **Renommer le "Spa" :** Remplacer le nom "Spa" par un nom cohérent avec l'univers du jeu tout en gardant l'effet de réduction de mortalité.
- [ ] **Transition Jour/Nuit :** Ajouter une transition visuelle douce (fondu CSS/Canvas) lors du passage entre le jour et la nuit.
- [ ] **Halo lumineux la nuit :** Ajouter un effet de halo lumineux autour des personnages lorsqu'il fait nuit.
- [ ] **Indicateurs de sauvegarde :** Afficher une popup de confirmation lors d'une sauvegarde réussie et ajouter un timer indiquant le temps écoulé depuis la dernière sauvegarde.
- [ ] **Game Over style Tekken :** Ajouter une option de fin où la fenetre de gamme over et remplaçait par*"You lose, continue ?"* comme dans Tekken

## 📜 Étape 3 : Console, Données et Panneau Développeur (Moyen)
- [ ] **Horodatage de la console :** Ajouter le jour et la date du jeu en en-tête de chaque message affiché dans la console.
- [ ] **Historique de la console :** Sauvegarder les messages de la console (LocalStorage) pour les réafficher à la réouverture du jeu.
- [ ] **Top 10 persistant :** Conserver les 10 meilleurs aventuriers toutes parties confondues, en ne gardant que le meilleur score si un même nom apparaît plusieurs fois.
- [ ] **Menu Développeur (Roue crantée) :** Ajouter une roue crantée discrète donnant accès à des options développeur.
- [ ] **Gestion dynamique des noms :** Dans ce menu développeur, afficher la liste de tous les noms possibles d'aventuriers et permettre d'en ajouter, modifier ou supprimer sans refaire une mise à jour du jeu.

## 🏗️ Étape 4 : Nouvelles mécaniques de jeu (Avancé)
- [ ] **Nouveau bâtiment "Mairie" :** Créer un bâtiment de base (non améliorable au début) qui récupère et stocke les butins.
- [ ] **PNJ Maire :** Associer un PNJ Maire à la mairie qui gagne des niveaux très lentement et augmente passivement les gains d'or selon son niveau.

## 🔬 Étape 5 : Recherche, Optimisation et Architecture (Pour plus tard)
- [ ] **Équilibrage général :** Ajuster les valeurs du jeu (coûts, gains d'or du maire, vitesse de progression).
- [ ] **Réduction batterie & APK :** Transformer l'application web en APK (via Capacitor ou TWA) et optimiser la boucle de jeu pour réduire la consommation de batterie par rapport à Chrome.
- [ ] **Mode arrière-plan / Widget :** Étudier la faisabilité d'un mode réduit ou widget affichant uniquement la console pendant que le jeu tourne en arrière-plan.
- [ ] **Mode Multijoueur :** Étudier la faisabilité d'un mode coopératif où les villages de deux joueurs se rassemblent pour faire coopérer leurs aventuriers.
- [ ] 
