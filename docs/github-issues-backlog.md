# Issues GitHub — brouillons AshHero

**Dépôt cible :** [malaminebah/ashhero](https://github.com/malaminebah/ashhero)

Colle chaque ticket dans **Issues → New issue**, ou utilise [GitHub CLI](https://cli.github.com) avec les exemples en fin de fichier.

**Labels suggérés (à créer une fois dans le dépôt) :** `mvp`, `v2`, `content`, `auth`, `firebase`, `tracker`, `combat`, `ux-copy`, `infra`, `blocked` (adapter à ton board).

---

## Tableau commits → tickets (dernières livraisons)

| Commit | Ticket | Statut board |
|--------|--------|--------------|
| `1c8f44d` feat(auth): email flow, session, firestore rules | **T-101**, **T-102**, **T-103** | **In Review** |
| `b1b4611` feat(firebase): AsyncStorage auth persistence | **T-122** | **In Review** |
| `ce5e7b1` chore(auth): remove inline comments | *(nettoyage, pas de ticket)* | — |
| `024f0f2` feat(combat): rebalance action xp | **T-125** | **In Review** |
| `7d7b8b4` feat(combat): rebalance damage + boss names FR | **T-124** | **In Review** |
| `a4e07f6` feat(combat): visual juice | **T-114** → **T-118** | **In Review** |
| `06ef17d` fix(auth): tabs guard + reset routing | **T-123** | **In Review** |
| `f5e8b20` docs(backlog) | meta | — |

---

## MVP — Auth & données

| Ticket | Statut board | Commit |
|--------|--------------|--------|
| T-101 | **In Review** | `1c8f44d` |
| T-102 | **In Review** | `1c8f44d` |
| T-103 | **In Review** | `1c8f44d` |
| T-122 | **In Review** | `b1b4611` |
| T-123 | **In Review** | `06ef17d` |

### T-101 — Auth email/mot de passe (inscription + connexion)

**Labels :** `mvp`, `auth`, `firebase`  
**Statut board :** `In Review`  
**Commit :** `1c8f44d`

**Corps :**

**Objectif** : le MVP ne repose pas sur l’auth anonyme seule ; l’utilisateur peut **créer un compte** et **se connecter** avec email + mot de passe (Firebase).

**Périmètre**
- Exposer dans `auth.service.ts` (ou équivalent) : création de compte et connexion email/mot de passe.
- Écrans ou flux Expo Router : inscription, connexion, déconnexion si déjà prévu par l’archi.
- Gestion d’erreurs Firebase visibles côté UI (messages utilisables, pas de crash).

**Hors périmètre** : Google/Apple (V2).

**Critères d’acceptation**
- [x] Depuis un état non connecté, un utilisateur peut s’inscrire avec email + mot de passe valides et obtenir un `uid` stable.
- [x] Depuis un autre lancement / appareil (même build), connexion avec les mêmes identifiants recharge le profil Firestore existant (comportement aligné `getProfile` / layout actuel).
- [x] Aucun import `firebase/*` dans un composant UI — logique dans services + hooks (`CURSOR.md`).
- [ ] Validation PO : parcours complet inscription → onboarding → tabs

**Définition of Done** : `npx tsc --noEmit` OK ; pas de régression sur la structure Firestore documentée.

---

### T-102 — Réinitialisation du mot de passe (Firebase)

**Labels :** `mvp`, `auth`  
**Statut board :** `In Review`  
**Commit :** `1c8f44d`

**Corps :**

**Objectif** : flux « mot de passe oublié » via `sendPasswordResetEmail` (ou équivalent SDK), avec libellés d’erreur cohérents.

**Critères d’acceptation**
- [x] Depuis l’écran de connexion (ou lien dédié), l’utilisateur peut demander un email de reset pour une adresse valide.
- [x] Cas d’erreur (email invalide, trop de requêtes) gérés sans crash.
- [ ] Validation PO : email reset reçu et utilisable

**Note** : dépend de T-101 (écrans auth en place).

---

### T-103 — Retirer ou réduire la dépendance au seul `signInAnonymously` pour le parcours MVP

**Labels :** `mvp`, `auth`  
**Statut board :** `In Review`  
**Commit :** `1c8f44d`

**Corps :**

**Objectif** : aligner le démarrage de l’app sur le parcours **compte email** (T-101). Si l’anonyme reste en code, documenter dans le ticket de doc produit **où** il sert (ex. dev only) ou le retirer du chemin utilisateur MVP.

**Critères d’acceptation**
- [x] Le premier écran « compte » du MVP ne se contente pas d’une session anonyme sans offrir inscription/connexion email (sauf décision explicite documentée dans la PR).
- [ ] Validation PO : parcours invité vs email clair pour l’utilisateur

---

### T-122 — Auth : persistance session Firebase avec AsyncStorage (React Native)

**Labels :** `mvp`, `auth`, `firebase`  
**Statut board :** `In Review`  
**Commit :** `b1b4611`

**Corps :**

**Objectif** : conserver la session auth entre les relances de l’app (pas de re-login à chaque ouverture).

**Critères d'acceptation**
- [x] `initializeAuth` avec `getReactNativePersistence(AsyncStorage)`
- [x] Guard double init (`auth/already-initialized`) pour fast refresh
- [x] Types RN dans `firebase-auth-rn.d.ts`
- [ ] Validation PO : fermer app → rouvrir → toujours connecté

**Fichiers**
- `src/services/firebase.ts`
- `src/services/firebase-auth-rn.d.ts`

**Définition of Done** : session persistée sur device ; pas de crash au redémarrage.

---

### T-123 — Auth : garde tabs sans profil + sync reset routing

**Labels :** `mvp`, `auth`, `tracker`  
**Statut board :** `In Review`  
**Commit :** `06ef17d`

**Corps :**

**Objectif** : empêcher l’accès aux tabs sans profil Firestore ; synchroniser reset profil / onboarding / session.

**Critères d'acceptation**
- [x] Redirect vers `/` depuis `app/(tabs)/_layout.tsx` si `hasServerProfile !== true`
- [x] Garde dupliquée retirée de `app/(tabs)/index.tsx`
- [x] `sessionStore.setFromAuth` conserve `hasServerProfile` si même `uid`
- [x] `ProfileScreenBody` : restart reset onboarding + `setProfileResolved(false)`
- [x] `ButtonReset` : callback `onAfterReset` pour routing post-reset
- [ ] Validation PO : reset / restart ramène bien au bon écran

**Fichiers**
- `app/(tabs)/_layout.tsx`, `app/(tabs)/index.tsx`
- `src/features/auth/sessionStore.ts`
- `src/features/tracker/components/ButtonReset.tsx`
- `src/features/tracker/components/profile/ProfileScreenBody.tsx`

**Définition of Done** : pas d’accès dashboard sans profil ; reset cohérent.

---

## MVP — App (features existantes)

| Ticket | Statut board |
|--------|--------------|
| T-111 | **To Do** |
| T-112 | **To Do** |
| T-113 | **To Do** |

### T-111 — Relecture flux onboarding + persistance profil post-auth email

**Labels :** `mvp`, `tracker`, `auth`  
**Statut board :** `To Do`

**Corps :**

**Objectif** : garantir que le parcours onboarding et la persistance du profil restent cohérents après la bascule vers l’auth email (pas de valeurs trompeuses dans le store, pas de profil « fantôme »).

**Périmètre**

- Vérifier chaque step onboarding (`Step1` → `Step6`) : données collectées, reset, navigation.
- Vérifier `useOnboardingSubmit` : `saveProfile`, `initialize` tracker, `setProfileResolved`.
- Vérifier le chargement profil dans `app/_layout.tsx` après connexion / reconnexion (`getProfile`, `hasServerProfile`).
- Vérifier conformité `CURSOR.md` : pas de `initialState` trompeur, sélecteurs Zustand atomiques.

**Hors périmètre** : refonte des steps onboarding ; auth Google/Apple (V2).

**Critères d’acceptation**

- [ ] Inscription email → onboarding complet → profil visible dans les tabs sans reload manuel.
- [ ] Reconnexion avec compte existant → profil Firestore rechargé, pas de retour onboarding si profil présent.
- [ ] Déconnexion / reset profil → retour au bon écran sans état incohérent (`hasServerProfile`, stores reset).
- [ ] `npx tsc --noEmit` OK ; aucun import Firebase dans les composants UI.

**Définition of Done** : 3 parcours testés (nouveau compte, retour utilisateur, reset) ; comportement documenté si edge case assumé.

---

### T-112 — Parité combat / tracker avec règles Firestore

**Labels :** `mvp`, `combat`, `firebase`, `tracker`  
**Statut board :** `To Do`

**Corps :**

**Objectif** : confirmer que toutes les écritures tracker/combat respectent les règles Firestore `users/{uid}/**` pour un utilisateur authentifié par email.

**Périmètre**

- Vérifier `saveProfile`, `getProfile`, `addRelapse`, `addCombat`, `addEtape` dans `user.service.ts`.
- Tester victoire/défaite combat (`useCombat` → Firestore).
- Croiser avec `firestore.rules` versionné à la racine du dépôt.
- Cas erreur réseau / permission denied : message UI ou log, pas de crash silencieux.

**Hors périmètre** : changement de schéma Firestore ; règles admin/console hors repo.

**Critères d’acceptation**

- [ ] Un utilisateur email authentifié peut lire/écrire **uniquement** son document `users/{sonUid}`.
- [ ] Combat gagné/perdu enregistre les données attendues sans erreur rules.
- [ ] Relapse et étapes débloquées passent les rules en conditions réelles (device ou émulateur Firebase).
- [ ] Aucune écriture avec un `uid` null ou mismatch auth.

**Définition of Done** : tests manuels documentés ; rules déployées alignées sur `firestore.rules` du repo.

---

### T-113 — Combat : guidage respiration (« attaque respiratoire ») — compteurs inhale / exhale / pause

**Labels :** `mvp`, `combat`, `ux-copy`  
**Statut board :** `To Do`

**Corps :**

**Objectif** : pendant la séquence combat liée à la respiration (« attaque respirer inspirer/expirer »), l’utilisateur voit **clairement** les durées pour **inspiration**, **expiration** et, si pertinent, **l’intervalle entre la fin d’une expiration et le début de la prochaine inspiration**.

**Périmètre**

- Compteur (ou équivalent UX) qui indique au minimum une **inspiration de ~3 s** — libellés et comportement synchronisés sur le **timer réel** (pas uniquement une phrase statique).
- Pendant l’expiration : afficher explicitement que l’utilisateur doit **expirer** et **combien de temps** (compte à rebours ou durée fixe lisible selon la spec combat actuelle).
- **À clarifier en spec / copy** : le **temps entre la fin de l’expiration et le début de l’inspiration suivante** est **volontaire** et **correct** au regard de la méthode (pause contrôlée vs enchaînement immédiat). Documenter la valeur attendue (ex. 0 s, X s) dans l’issue ou dans `CURSOR.md` une fois arbitré produit / médecine comportementale.

**Hors périmètre** *(à ajuster si besoin)* : son haptique, voix hors-app, autres attaques non-respiration.

**Critères d’acceptation**

- [ ] L’utilisateur voit une durée ou un compte à rebours cohérent pour la phase **inspirer (~3 s)**.
- [ ] Pour la phase **expirer**, l’interface indique **qu’expirer** et **pour combien de temps** (sans ambiguïté avec « retenir son souffle » si ce n’est pas le cas produit).
- [ ] Une mention ou un libellé (ou une note produit reliée au ticket) **clarifie** le **temps entre fin d’expiration et début d’inspiration** ; si cette pause existe, elle est affichée ou expliquée de façon alignée avec le timer.

**Définition of Done** : comportement vérifié sur un passage combat réel ; textes FR relus ; pas de divergence entre affichage et logique timer.

---

## MVP — Combat visuel & juice (session 2026-05-21)

| Ticket | Statut board | Note |
|--------|--------------|------|
| T-114 | **In Review** | Cadre + boss droite / joueur gauche |
| T-115 | **In Review** | `AttackEffect.tsx` |
| T-116 | **In Review** | FSM + emojis |
| T-117 | **In Review** | Drain barres PV |
| T-118 | **In Review** | Haptics — valider sur device |
| T-124 | **In Review** | Rebalance dégâts + noms boss FR (`7d7b8b4`) |
| T-125 | **In Review** | Rebalance XP combat (`024f0f2`) |
| T-119 | **To Do** | Copy FR UI combat |
| T-120 | **To Do** | Polish design final |
| T-121 | **Backlog** | Sprites / particules |

### T-114 — Combat : améliorer cadre vertical (pixel art + espacement)

**Labels :** `mvp`, `combat`, `ui`  
**Statut board :** `In Review`

**Corps :**

**Objectif** : améliorer le cadre combat actuel (vertical) pour un affrontement visuel plus immersif : bordures épaisses pixel art, fond arène, espacer boss/joueur.

**Critères d'acceptation**
- [x] Bordures pixel art épaisses (4px) autour panneaux boss et joueur (couleurs accent cohérentes design system)
- [x] Fond arène sombre derrière panneaux (`bg-[#05000a]`)
- [x] Espacer boss (haut) et joueur (bas) : +20–30px vertical pour meilleure lisibilité
- [x] Boss aligné bordure droite (`items-end`), joueur bordure gauche (`items-start`)
- [ ] Responsive : fonctionne sur petits écrans (≥ iPhone SE) — validation PO
- [x] Shake horizontal (Reanimated) conservé sans régression

**Fichiers touchés**
- `src/features/combat/components/CombatMonster.tsx`
- `src/features/combat/components/CombatPlayerPanel.tsx`
- `src/features/combat/components/CombatModal.tsx` (si ajustement layout)

**Définition of Done** : `npx tsc --noEmit` OK ; test visuel sur simulateur ; pas de lag.

---

### T-115 — Combat : emojis d'attaque animés (fade + scale)

**Labels :** `mvp`, `combat`, `animation`  
**Statut board :** `In Review`

**Corps :**

**Objectif** : afficher un emoji animé (💨💧⚡🎮) au centre de l'écran quand une action est résolue. Fade in + scale, puis fade out.

**Critères d'acceptation**
- [x] Composant `<AttackEffect emoji="💨" visible={boolean} />`
- [x] Animation Reanimated : fade 0→1 (200ms), scale 0.5→1.2 (300ms), hold 400ms, fade out (200ms)
- [x] Positionné centre écran (entre boss et joueur), au-dessus des sprites
- [x] Pas de lag : `useAnimatedStyle` optimisé
- [x] Mapping actions → emojis V1 :
  - `breathe` → 💨
  - `water` → 💧
  - `distract` → 🎮
  - `special` → ⚡
  - Boss riposte → 😈 ou 🔥

**Fichiers**
- Nouveau : `src/features/combat/components/AttackEffect.tsx`
- Modif : `src/features/combat/components/CombatModal.tsx` (intégration)

**Définition of Done** : animation fluide 60 fps ; pas de crash ; emoji visible 900ms total.

---

### T-116 — Combat : connecter emojis aux actions (FSM)

**Labels :** `mvp`, `combat`  
**Statut board :** `In Review`

**Corps :**

**Objectif** : déclencher `<AttackEffect>` dans le hook `useTurnCombat` via un état `currentAttackEmoji`.

**Critères d'acceptation**
- [x] État `currentAttackEmoji: string | null` dans `useTurnCombat`
- [x] Set emoji quand action résolue (player hit, boss riposte)
- [x] Clear emoji après 900ms (durée animation complète)
- [x] Message box + emoji + shake synchronisés (pas de conflit visuel)
- [ ] Testé : chaque action affiche le bon emoji — validation PO playtest

**Fichiers**
- `src/features/combat/hooks/useTurnCombat.ts`
- `src/features/combat/components/CombatModal.tsx`

**Définition of Done** : playtest 3 combats ; tous les emojis apparaissent au bon moment.

---

### T-117 — Combat : drain animé barres PV (withTiming)

**Labels :** `mvp`, `combat`, `polish`  
**Statut board :** `In Review`

**Corps :**

**Objectif** : barre PV qui draine smooth (pas instant) quand HP change.

**Critères d'acceptation**
- [x] `useAnimatedStyle` avec `withTiming(width%, { duration: 400 })`
- [x] Appliquer sur `CombatMonster` et `CombatPlayerPanel`
- [x] Pas de saccade si HP change 2× rapidement (interruption propre)
- [ ] Testé : drain fluide lors de coups multiples rapides — validation PO

**Fichiers**
- `src/features/combat/components/CombatMonster.tsx`
- `src/features/combat/components/CombatPlayerPanel.tsx`

**Définition of Done** : animation 60 fps ; pas de régression visuelle.

---

### T-118 — Combat : vibration sur hit (optionnel)

**Labels :** `mvp`, `combat`, `haptics`  
**Statut board :** `In Review`

**Corps :**

**Objectif** : vibration légère (`Haptics.impactAsync('medium')`) quand joueur ou boss prend des dégâts.

**Critères d'acceptation**
- [x] Importer `expo-haptics`
- [x] Vibration dans `applyDamageToBoss` et `runEnemyTurn`
- [x] Guard si device ne supporte pas (pas de crash)
- [ ] Testé sur device physique (simulateur ne vibre pas)

**Fichiers**
- `src/features/combat/hooks/useTurnCombat.ts`

**Définition of Done** : vibration ressentie sur device physique ; pas de lag combat.

---

### T-124 — Combat : rebalance dégâts et noms d'attaque boss (FR)

**Labels :** `mvp`, `combat`, `balance`  
**Statut board :** `In Review`  
**Commit :** `7d7b8b4`

**Corps :**

**Objectif** : ajuster les dégâts combat (`DAMAGE_TO_BOSS`, riposte boss) et localiser les noms d'attaque du boss en français.

**Critères d'acceptation**
- [x] `DAMAGE_TO_BOSS` rebalance (breathe, water, distract, special)
- [x] `rollBossRiposteDamage` ajusté
- [x] `BOSS_ATTACK_NAMES` en FR (Poussée d'envie, etc.)
- [ ] Validation PO : durée combat ~3–8 tours ; feeling équilibré

**Fichiers**
- `src/features/combat/constants.ts`

**Note** : copy UI combat (Battle, You…) reste **T-119**.

**Définition of Done** : playtest ; chiffres documentés vs spec.

---

### T-125 — Combat : rebalance XP victoire par action

**Labels :** `mvp`, `combat`, `tracker`, `balance`  
**Statut board :** `In Review`  
**Commit :** `024f0f2`

**Corps :**

**Objectif** : ajuster la table XP gagnée en cas de victoire (`COMBAT_XP_BY_ACTION`), distincte des dégâts combat.

**Critères d'acceptation**
- [x] `combatXpTable.ts` mis à jour (breathe, water, distract, special)
- [x] XP ≠ dégâts documenté (deux tables)
- [ ] Validation PO : progression tracker cohérente après combats

**Fichiers**
- `src/features/tracker/combatXpTable.ts`

**Définition of Done** : victoire combat applique le bon XP ; pas de régression `useCombat`.

---

### T-119 — Combat : remplacer You / Opponent et copy EN → FR

**Labels :** `mvp`, `combat`, `ux-copy`  
**Statut board :** `To Do`

**Corps :**

**Objectif** : uniformiser **tous** les textes visibles du modal combat en français (tutoiement), en remplaçant les libellés génériques anglais (« You », « Opponent », « Battle », etc.).

**Périmètre**

- Titres et labels du modal : `CombatModal.tsx` (Battle, Opponent, You, tour ennemi, Surrender, sous-titre tour par tour).
- Panneaux entités : nom boss / joueur si affiché (`CombatMonster`, `CombatPlayerPanel`).
- Message box combat : coups joueur et riposte boss (`CombatMessageBox.tsx`).
- Labels des 4 actions : `constants.ts` (`ACTION_LABELS`) — Respirer, Boire de l’eau, Se distraire, Attaque spéciale.
- Banners fin de combat : victoire et défaite (`VictoryBanner`, `DefeatBanner`).
- Messages statut FSM encore en EN dans `useTurnCombat` (ex. texte phase Respirer) si exposés à l’UI.

**Hors périmètre** : copy auth/onboarding (T-201, T-202) ; noms d’attaque boss déjà FR dans `constants.ts` (T-124).

**Critères d’acceptation**

- [ ] Aucune chaîne EN visible en combat (scan des fichiers `src/features/combat/**`).
- [ ] Tutoiement cohérent, ton bienveillant, pas moralisateur.
- [ ] Propositions FR validées ou arbitrées pour : « Toi » vs « Ton calme », « L’Envie » vs « Adversaire ».
- [ ] Textes regroupés si possible (constantes ou fichier copy combat) — pas de duplication inutile.
- [ ] `npx tsc --noEmit` OK.

**Définition of Done** : relecture FR sur device ; combat entièrement en français ; PO valide le ton.

**Fichiers**
- `src/features/combat/components/CombatModal.tsx`
- `src/features/combat/components/CombatMonster.tsx`
- `src/features/combat/components/CombatPlayerPanel.tsx`
- `src/features/combat/components/CombatMessageBox.tsx`
- `src/features/combat/components/VictoryBanner.tsx`
- `src/features/combat/components/DefeatBanner.tsx`
- `src/features/combat/constants.ts`
- `src/features/combat/hooks/useTurnCombat.ts` (messages UI uniquement)

**Dépend de :** T-114 à T-118 validés (juice visuel stable).

---

### T-120 — Combat : passe design finale (polish UI)

**Labels :** `mvp`, `combat`, `ui`, `polish`  
**Statut board :** `To Do`

**Corps :**

**Objectif** : retouche visuelle globale du combat une fois la copy FR (T-119) et le juice (T-114→118) validés — alignement pixel art, lisibilité, responsive.

**Périmètre**

- Espacements finaux boss (droite) / joueur (gauche) et hiérarchie visuelle entre les deux panneaux.
- Tailles emoji/sprites, barres PV, typo mono / tracking cohérents avec le design system AshHero.
- Message box : contraste, padding, lisibilité sur fond arène sombre.
- Boutons d’action : états normal / disabled / pressed ; hiérarchie (Respirer vs actions instantanées).
- Fond arène : affiner couleur ou gradient subtil si le fond plat `#05000a` ne suffit pas.
- Banners victoire / défaite : harmoniser avec le modal combat.
- Test layout iPhone SE (petit) et grand écran — pas de débordement ni chevauchement avec `AttackEffect`.

**Hors périmètre** : nouvelles mécaniques gameplay ; sprites/particules custom (T-121) ; changement de copy (T-119).

**Critères d’acceptation**

- [ ] 3 playtests complets sans régression UX ni lag animation.
- [ ] Rendu cohérent avec `CURSOR.md` (NativeWind, dark, violet royal, pixel art).
- [ ] Boss et joueur lisibles d’un coup d’œil ; barres PV et chiffres HP clairs.
- [ ] Screenshots avant/après joints à la PR ou au ticket (optionnel mais recommandé).

**Définition of Done** : PO valide le rendu visuel sur device physique ; ticket passé en **Done**.

**Fichiers** (selon retouches)
- `src/features/combat/components/CombatModal.tsx`
- `src/features/combat/components/CombatMonster.tsx`
- `src/features/combat/components/CombatPlayerPanel.tsx`
- `src/features/combat/components/CombatMessageBox.tsx`
- `src/features/combat/components/ActionButton.tsx`
- `src/features/combat/components/VictoryBanner.tsx`
- `src/features/combat/components/DefeatBanner.tsx`

**Bloqué par :** T-119

---

### T-121 — Combat : sprites / particules d'attaque (optionnel)

**Labels :** `combat`, `content`, `animation`  
**Statut board :** `Backlog`

**Corps :**

**Objectif** : remplacer ou compléter les emojis d’attaque (T-115) par des sprites ou particules légères (fumée, éclair, eau) si le proto emoji ne suffit pas au feeling produit.

**Périmètre**

- Liste d’assets validée par le PO : breathe (fumée/air), water (goutte), distract, special (éclair), boss riposte.
- Intégration dans `AttackEffect` ou composant dédié — même durée et timing que l’anim emoji actuelle (~900 ms).
- Fallback emoji si asset manquant ou perf insuffisante.
- Conserver le mapping actions existant (pas de nouvelle mécanique).

**Hors périmètre** : animations personnage full-frame ; SFX ; refonte layout combat.

**Critères d’acceptation**

- [ ] Assets listés et sourcés (pixel art cohérent AshHero).
- [ ] Perf OK sur device milieu de gamme (pas de chute visible FPS pendant combat).
- [ ] Chaque action affiche l’effet attendu ; fallback emoji testé.
- [ ] Pas de régression sur T-116 (déclenchement FSM inchangé côté hook).

**Définition of Done** : playtest visuel ; PO choisit emoji vs sprite par action ; pas de régression perf.

**Fichiers**
- `src/features/combat/components/AttackEffect.tsx` (ou remplacement)
- `assets/` (chemins à définir avec le PO)

**Priorité :** P3 — après T-120

---

## Contenu & copy (fin de pipeline — quand le produit est stable)

### T-201 — Passage copy : écrans auth (FR)

**Labels :** `content`, `ux-copy`

**Corps :**

**Objectif** : textes définitifs (titres, erreurs, aide) pour inscription, connexion, reset — ton produit à valider par toi.

**À fournir par le PO** : glossaire ou exemples de ton (formel / tutoiement).

---

### T-202 — Passage copy : onboarding & tracker (FR)

**Labels :** `content`, `ux-copy`

**Corps :**

Tous les textes des steps onboarding et du dashboard tracker : libellés, encouragements, conformité aux promesses santé (relecture humaine recommandée).

---

### T-203 — Assets pixel art / illustration (liste manquante)

**Labels :** `content`

**Corps :**

**Objectif** : inventaire des assets nécessaires (écrans, combats, icônes) + statut (fait / manquant). **Ne pas inventer** la liste : le PO remplit le tableau dans la description de l’issue après revue des écrans.

---

## V2+ — Backlog (spécification à cadrer)

### T-301 — Notifications push (spéc V2)

**Labels :** `v2`, `infra`

**Corps :**

**Objectif** : définir quels événements déclenchent une notification (rappel combat, étape, etc.) — **hors MVP**.

**À trancher avant dev** : fréquence, opt-in, contenu, OS (iOS/Android), conformité store.

**Critères d’acceptation (quand le spec existe)** : à compléter après atelier produit.

---

### T-302 — Authentification sociale (Google / Apple) — V2

**Labels :** `v2`, `auth`

**Corps :**

Implémentation `linkWithCredential` / flux dédié selon `docs/firebase-auth-strategy.md`. Dépend d’arbitrage produit + config native Expo.

---

### T-303 — Thème « analytics / confidentialité » (V2 ou légale)

**Labels :** `v2`

**Corps :**

Définir si tracking (analytics) et politique de confidentialité / écran paramètres sont requis pour ton objectif de publication — **ne pas supposer** ; issue de cadrage.

---

## Board « backlog » (Project GitHub)

Créer le **même** backlog en Project v2 (colonnes gérables sur github.com) :

1. **Une fois** : étendre le token (sinon `gh project` est refusé) :
   ```bash
   gh auth refresh -s project,read:project -h github.com
   ```
2. Depuis la racine du dépôt :
   ```bash
   ./scripts/github-backlog-project.sh
   ```
   (Crée le projet, le lie à `malaminebah/ashhero`, ajoute les issues #1–#11 par défaut. Variables optionnelles : `PROJECT_TITLE`, `ISSUE_COUNT`, `GITHUB_OWNER`, `REPO_NAME`.)

---

## Exemples GitHub CLI

Après `gh auth login` et `cd` vers le clone du dépôt :

```bash
gh issue create -R malaminebah/ashhero --title "MVP — Auth email/mot de passe (inscription + connexion)" --label mvp,auth,firebase --body-file /dev/stdin <<'EOF'
(Objectif, périmètre, critères : copier le corps T-101 ci-dessus)
EOF
```

Répéter en adaptant le titre et `--body` pour chaque ticket. Crée les labels une fois : `gh label create mvp` etc., ou via l’UI GitHub.
