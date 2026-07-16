# Issues GitHub — brouillons AshHero

**Dépôt cible :** [malaminebah/ashhero](https://github.com/malaminebah/ashhero)

> **Important — deux endroits distincts**
> - **`docs/github-issues-backlog.md`** (ce fichier) = brouillon / source de vérité texte dans le repo Git.
> - **Issues GitHub + Project board** = tickets visibles sur [github.com/malaminebah/ashhero/issues](https://github.com/malaminebah/ashhero/issues) — **non synchronisés automatiquement** quand ce fichier change.
> - Après édition ici : mettre à jour les issues avec `gh issue edit` / `gh issue create`, ou coller manuellement dans l’UI GitHub.

Colle chaque ticket dans **Issues → New issue**, ou utilise [GitHub CLI](https://cli.github.com) avec les exemples en fin de fichier.

**Labels suggérés (à créer une fois dans le dépôt) :** `mvp`, `v2`, `content`, `auth`, `firebase`, `tracker`, `combat`, `ux-copy`, `infra`, `blocked` (adapter à ton board).

**Labels audit sécurité/store (2026-07-16) — créés sur le dépôt :** `securite` (jaune `#FFD600`), `store` (bleu `#2196F3`), `legal` (violet `#5319E7`).

```bash
gh label create securite --color FFD600 --description "Sécurité (auth, Firestore, données)" -R malaminebah/ashhero
gh label create store --color 2196F3 --description "Bloquant soumission App Store / Play Store" -R malaminebah/ashhero
gh label create legal --color 5319E7 --description "Conformité légale / RGPD" -R malaminebah/ashhero
```

---

## Handoff PO — synthèse board (2026-06-22)

> **Action PO** : valider les critères « Validation PO » / playtest, puis déplacer la colonne Project.  
> Code livré en session dev ; **non commité** tant que PO n’a pas relu.

| Ticket | Colonne **cible** si PO OK | Code | Bloquant PO |
|--------|----------------------------|------|-------------|
| T-101, T-102, T-103, T-122, T-123 | **Done** | ✅ | Parcours auth + reset email + persistance session |
| T-111 | **In Review** → **Done** | ✅ | 3 parcours (nouveau / retour / reset) sur device |
| T-112 | **In Review** → **Done** | ✅ revue code | Exécuter `docs/firestore-smoke-test.md` + rules déployées |
| T-113 | **In Review** → **Done** | ✅ | Playtest respiration combat (3s/3s/1s) |
| T-114 → T-118, T-124, T-125 | **Done** | ✅ | Playtest device (haptics T-118) |
| T-119 | **In Review** | ~✅ | Relecture copy combat FR |
| T-130 → T-136 | **In Review** | ✅ | Playtest mood semaine |
| T-126 → T-129 | **To Do** | ❌ | Epic avatar — placeholder profil |
| T-137, T-138 | **Backlog** / **To Do** | partiel | Panneau profil mood + edge cases |
| T-201, T-202 | **In Review** | partiel | Relecture copy globale |
| T-203 | **To Do** | ❌ | Inventaire assets PO |
| T-140 → T-142 | **In Review** | partiel | Font / badges — validation visuelle |
| **T-304** *(nouveau)* | **To Do** | ❌ | Soumission stores (EAS, bundle ID, légal) |

**Livraisons dev session (non listées dans commits ci-dessous)** : sync session auth, guards onboarding/auth, design Flow (auth, mood, combat shell), T-113 breathe cycle, fix `tsc`, `.env.example`, smoke test Firestore doc.

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
| T-111 | **In Review** |
| T-112 | **In Review** |
| T-113 | **In Review** |

---

## MVP — Avatar joueur (personnalisation)

| Ticket | Statut board | Issue GitHub |
|--------|--------------|--------------|
| T-126 | **To Do** | [#25](https://github.com/malaminebah/ashhero/issues/25) |
| T-127 | **To Do** | [#26](https://github.com/malaminebah/ashhero/issues/26) |
| T-128 | **To Do** | [#27](https://github.com/malaminebah/ashhero/issues/27) |
| T-129 | **To Do** | [#28](https://github.com/malaminebah/ashhero/issues/28) |

**Epic :** choix d’avatar joueur — **4 emojis par palier de niveau**, persisté profil, visible dashboard / profil / combat.

**Ordre d’implémentation :** T-126 → T-127 → T-128 → T-129

### T-126 — Tracker : catalogue avatars — 4 emojis par palier de niveau

**Labels :** `mvp`, `tracker`, `content`  
**Statut board :** `To Do`  
**Issue :** [#25](https://github.com/malaminebah/ashhero/issues/25)

**Objectif** : définir le catalogue d’avatars — 4 emojis par palier — et les utilitaires (`getAvatarTierForLevel`, `getAvatarOptionsForTier`, `resolveHeroEmoji`).

**Paliers proposés** (alignés sur `playerHeroEmoji.ts` actuel) :

| Palier | Niveau min | Défaut actuel |
|--------|------------|---------------|
| 0 | 1 | 🤖 |
| 1 | 2 | 💪 |
| 2 | 4 | 🛡️ |
| 3 | 7 | ⚔️ |
| 4 | 10 | 👑 |

**Critères d’acceptation**
- [ ] 5 paliers × 4 emojis listés et validés PO
- [ ] Utils typés + fallback si choix invalide
- [ ] `npx tsc --noEmit` OK

**Définition of Done** : catalogue centralisé ; T-127 peut consommer `avatarId`.

---

### T-127 — Tracker : persister `heroAvatarId` (Firestore + store)

**Labels :** `mvp`, `tracker`, `firebase`  
**Statut board :** `To Do`  
**Issue :** [#26](https://github.com/malaminebah/ashhero/issues/26)

**Objectif** : persister le choix d’avatar dans le profil (même pattern que `heroName`).

**Critères d’acceptation**
- [ ] Champ `heroAvatarId` dans types, store, `user.service.ts`
- [ ] `setHeroAvatar` valide palier débloqué
- [ ] Save/reload conserve le choix ; reset remet à null

**Dépend de :** T-126

---

### T-128 — Tracker : UI sélecteur d’avatar (écran profil)

**Labels :** `mvp`, `tracker`, `ux-copy`  
**Statut board :** `To Do`  
**Issue :** [#27](https://github.com/malaminebah/ashhero/issues/27)

**Objectif** : grille 4 emojis par palier débloqué sur l’écran profil ; touch ≥ 44px ; copy FR.

**Critères d’acceptation**
- [ ] Paliers débloqués seulement
- [ ] Sélection → store + Firestore (T-127)
- [ ] Accessibilité + design pixel/violet

**Dépend de :** T-126, T-127

---

### T-129 — Tracker : afficher avatar choisi (dashboard, profil, combat)

**Labels :** `mvp`, `tracker`, `combat`  
**Statut board :** `To Do`  
**Issue :** [#28](https://github.com/malaminebah/ashhero/issues/28)

**Objectif** : `PlayerHeroEmoji` lit `heroAvatarId` ; cohérence dashboard / profil / `CombatPlayerPanel`.

**Critères d’acceptation**
- [ ] Même emoji partout pour un profil
- [ ] Changement profil visible combat sans reload
- [ ] Fallback robuste

**Dépend de :** T-126, T-127, T-128

---

### T-111 — Relecture flux onboarding + persistance profil post-auth email

**Labels :** `mvp`, `tracker`, `auth`  
**Statut board :** `In Review`

**Corps :**

**Objectif** : garantir que le parcours onboarding et la persistance du profil restent cohérents après la bascule vers l’auth email (pas de valeurs trompeuses dans le store, pas de profil « fantôme »).

**Périmètre**

- Vérifier chaque step onboarding (`Step1` → `Step5`) : données collectées, reset, navigation.
- Vérifier `useOnboardingSubmit` : `saveProfile`, `initialize` tracker, `setProfileResolved`.
- Vérifier le chargement profil dans `app/_layout.tsx` après connexion / reconnexion (`getProfile`, `hasServerProfile`).
- Vérifier conformité `CURSOR.md` : pas de `initialState` trompeur, sélecteurs Zustand atomiques.

**Hors périmètre** : refonte des steps onboarding ; auth Google/Apple (V2).

**Critères d’acceptation**

- [x] Code : sync `sessionStore` après login/register/signOut (`useEmailAuthActions`)
- [x] Code : guards onboarding (uid, profil existant) + `deleteProfile` au reset
- [ ] **PO** : Inscription email → onboarding complet → profil visible dans les tabs sans reload manuel
- [ ] **PO** : Reconnexion avec compte existant → profil Firestore rechargé, pas de retour onboarding si profil présent
- [ ] **PO** : Déconnexion / reset profil → retour au bon écran sans état incohérent
- [x] `npx tsc --noEmit` OK ; aucun import Firebase dans les composants UI

**Définition of Done** : 3 parcours testés (nouveau compte, retour utilisateur, reset) ; comportement documenté si edge case assumé.

---

### T-112 — Parité combat / tracker avec règles Firestore

**Labels :** `mvp`, `combat`, `firebase`, `tracker`  
**Statut board :** `In Review`

**Corps :**

**Objectif** : confirmer que toutes les écritures tracker/combat respectent les règles Firestore `users/{uid}/**` pour un utilisateur authentifié par email.

**Périmètre**

- Vérifier `saveProfile`, `getProfile`, `addRelapse`, `addCombat`, `addEtape` dans `user.service.ts`.
- Tester victoire/défaite combat (`useCombat` → Firestore).
- Croiser avec `firestore.rules` versionné à la racine du dépôt.
- Cas erreur réseau / permission denied : message UI ou log, pas de crash silencieux.

**Hors périmètre** : changement de schéma Firestore ; règles admin/console hors repo.

**Critères d’acceptation**

- [x] Revue code : écritures passent par services + `getCurrentUid()` (pas d’uid null silencieux sur flux nominal)
- [ ] **PO** : Un utilisateur email authentifié peut lire/écrire **uniquement** son document `users/{sonUid}`
- [ ] **PO** : Combat gagné/perdu enregistre les données attendues sans erreur rules
- [ ] **PO** : Relapse, étapes, mood passent les rules (checklist `docs/firestore-smoke-test.md`)
- [ ] Rules déployées alignées sur `firestore.rules` du repo

**Définition of Done** : tests manuels documentés ; rules déployées alignées sur `firestore.rules` du repo.

---

### T-113 — Combat : guidage respiration (« attaque respiratoire ») — compteurs inhale / exhale / pause

**Labels :** `mvp`, `combat`, `ux-copy`  
**Statut board :** `In Review`

**Corps :**

**Objectif** : pendant la séquence combat liée à la respiration (« attaque respirer inspirer/expirer »), l’utilisateur voit **clairement** les durées pour **inspiration**, **expiration** et, si pertinent, **l’intervalle entre la fin d’une expiration et le début de la prochaine inspiration**.

**Périmètre**

- Compteur (ou équivalent UX) qui indique au minimum une **inspiration de ~3 s** — libellés et comportement synchronisés sur le **timer réel** (pas uniquement une phrase statique).
- Pendant l’expiration : afficher explicitement que l’utilisateur doit **expirer** et **combien de temps** (compte à rebours ou durée fixe lisible selon la spec combat actuelle).
- **Pause post-expiration** : **1 s** volontaire avant la prochaine inspiration (`breatheCycle.ts` — arbitrage produit V1).

**Hors périmètre** *(à ajuster si besoin)* : son haptique, voix hors-app, autres attaques non-respiration.

**Critères d’acceptation**

- [x] Durée / compte à rebours phase **inspirer (3 s)** — `BreatheTimer` + `BREATHE_PHASE_LABEL`
- [x] Phase **expirer (3 s)** avec libellé explicite
- [x] Pause **1 s** affichée entre expiration et inspiration suivante
- [ ] **PO** : Playtest combat réel — affichage aligné ressenti utilisateur
- [x] `npx tsc --noEmit` OK ; tests `breatheCycle.test.ts`

**Définition of Done** : comportement vérifié sur un passage combat réel ; textes FR relus ; pas de divergence entre affichage et logique timer.

**Fichiers**
- `src/features/combat/breatheCycle.ts`
- `src/features/combat/components/BreatheTimer.tsx`

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
| T-120 | **to review** | Polish design final — [#20](https://github.com/malaminebah/ashhero/issues/20) |
| T-121 | **to review** | Sprites / particules — [#21](https://github.com/malaminebah/ashhero/issues/21) |

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
**Statut board :** to review  
**Issue :** [#20](https://github.com/malaminebah/ashhero/issues/20)

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
**Statut board :** to review  
**Issue :** [#21](https://github.com/malaminebah/ashhero/issues/21)

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

| Ticket | Statut board |
|--------|--------------|
| T-201 | **To Do** |
| T-202 | **To Do** |
| T-203 | **To Do** |

### T-201 — Passage copy : écrans auth (FR)

**Labels :** `content`, `ux-copy`  
**Statut board :** `To Do`

**Corps :**

**Objectif** : finaliser tous les textes des écrans auth en français (tutoiement ou ton arbitré par le PO) — titres, boutons, erreurs Firebase, messages d’aide.

**Périmètre**

- Écrans : login, register, forgot-password (`app/auth/**`).
- Messages d’erreur : `authErrors.ts` — cohérence, clarté, pas de jargon technique exposé brut.
- Politique mot de passe : libellés `passwordPolicy.ts` si affichés à l’utilisateur.
- Boutons et liens : inscription, connexion, retour, invité (si conservé).

**Hors périmètre** : copy combat (T-119) ; onboarding (T-202) ; refonte UX des écrans auth.

**Critères d’acceptation**

- [ ] Glossaire ou exemples de ton validés par le PO (tutoiement / registre).
- [ ] Aucune chaîne EN visible sur les écrans auth.
- [ ] Chaque code erreur Firebase fréquent a un message FR compréhensible.
- [ ] Relecture humaine effectuée (orthographe, ton bienveillant).

**Définition of Done** : parcours auth testé en FR sur device ; PO valide le ton.

**Fichiers**
- `app/auth/login.tsx`, `register.tsx`, `forgot-password.tsx`
- `src/features/auth/utils/authErrors.ts`
- `src/features/auth/utils/passwordPolicy.ts`

**Dépend de :** T-101 à T-103 validés (écrans auth en place).

---

### T-202 — Passage copy : onboarding & tracker (FR)

**Labels :** `content`, `ux-copy`, `tracker`  
**Statut board :** `To Do`

**Corps :**

**Objectif** : uniformiser en français tous les textes onboarding et dashboard tracker — libellés, encouragements, stats — avec un ton cohérent et des promesses santé assumées.

**Périmètre**

- Steps onboarding (`Step1` → `Step6`) : questions, boutons, messages de validation.
- Dashboard / home tracker : streak, XP, stats, libellés profil.
- Boutons actions : craving, reset, déconnexion, restart flow (`ProfileScreenBody`, etc.).
- Messages calculés (ex. minutes de vie regagnées) : formulation FR claire.

**Hors périmètre** : copy auth (T-201) ; copy combat modal (T-119) ; contenu médical validé par un pro (relecture PO uniquement).

**Critères d’acceptation**

- [ ] Scan des fichiers `src/features/onboarding/**` et `src/features/tracker/**` : pas de EN résiduel volontaire.
- [ ] Ton aligné avec T-201 (même tutoiement / registre).
- [ ] Encouragements non culpabilisants ; promesses réalistes (pas de « guérison garantie »).
- [ ] Relecture PO sur un parcours onboarding complet + dashboard.

**Définition of Done** : onboarding + tracker entièrement en FR ; PO valide le ton et la clarté.

**Fichiers**
- `src/features/onboarding/**`
- `src/features/tracker/components/**`
- `app/(tabs)/**` (libellés visibles uniquement)

**Dépend de :** T-111 (flux onboarding stable).

---

### T-203 — Assets pixel art / illustration (liste manquante)

**Labels :** `content`  
**Statut board :** to review  
**Issue :** [#8](https://github.com/malaminebah/ashhero/issues/8)

**Corps :**

**Objectif** : produire un inventaire des assets visuels manquants (écrans, combats, icônes, tab bar) avec statut fait / manquant — **sans inventer** la liste : le PO la complète après revue des écrans.

**Périmètre**

- Parcourir chaque écran MVP : welcome, auth, onboarding, tabs, combat, profil.
- Pour chaque asset : nom, usage, format (PNG/SVG), priorité MVP vs V2, statut.
- Identifier les emojis provisoires remplaçables (boss, joueur, effets d’attaque → lien T-121).
- Documenter dans le corps du ticket ou un fichier `docs/assets-inventory.md` (à créer si le PO valide).

**Hors périmètre** : création des assets (ticket séparé par asset ou lot) ; sprites combat (T-121).

**Critères d’acceptation**

- [ ] Tableau rempli par le PO (écran → asset → statut → priorité).
- [ ] Au moins : icônes tabs, sprite boss/joueur, fond arène combat, logo app si prévu.
- [ ] Aucun asset critique MVP marqué « manquant » sans ticket de suivi ou décision explicite.

**Définition of Done** : inventaire relu ; prochaine vague de tickets asset créée à partir de la liste.

**Fichiers**
- `docs/assets-inventory.md` (optionnel, si créé)
- Référence croisée : `assets/`, composants avec emoji placeholder

---

## MVP — Infra store (soumission)

| Ticket | Statut board |
|--------|--------------|
| T-304 | **To Do** (epic) |
| T-314 → T-322 | Voir section [Sécurité & conformité store](#sécurité--conformité-store-audit-2026-07-16) |

### T-304 — Infra : build EAS + identité app + checklist stores (epic)

**Labels :** `mvp`, `infra`, `store`  
**Statut board :** `To Do`

**Objectif** : permettre un build installable TestFlight / Play Internal et préparer la soumission store.

**Décomposé (audit 2026-07-16) en tickets exécutables** : T-314 (bundle ID/EAS), T-315 (suppression compte), T-316 (policy URL), T-317 (retirer debug), T-318 (formulaires stores). Ce ticket reste l'epic parent — le fermer seulement quand les 5 sous-tickets sont Done.

**Hors périmètre** : analytics (T-303), social login (T-302)

**Dépend de :** T-111, T-112 validés PO

---

## Sécurité & conformité store (audit 2026-07-16)

> Suite à l'audit "manque-t-il quelque chose pour être en règles / déployer sur les stores / l'app est-elle sécurisée" (session du 2026-07-16). Détaille et remplace en actions concrètes le périmètre vague de T-303/T-304.

| Ticket | Thème | Label | Statut board |
|--------|-------|-------|--------------|
| T-314 | Bundle ID + EAS | `store` | To Do |
| T-315 | Suppression de compte réelle | `store` | To Do |
| T-316 | Politique de confidentialité — URL publique | `store` | To Do |
| T-317 | Retirer bouton debug avant soumission | `store` | To Do |
| T-318 | Formulaires App Privacy / Data Safety + classification | `store` | To Do |
| T-319 | Règles Firestore : anti-triche / validation schéma | `securite` | Backlog |
| T-320 | Firebase App Check | `securite` | Backlog |
| T-321 | Retirer logs debug avec données utilisateur | `securite` | To Do |
| T-322 | Avertir perte de données compte anonyme | `securite` | Backlog |

### T-314 — Store : bundle ID iOS/Android + `eas.json`

**Labels :** `mvp`, `infra`, `store`  
**Statut board :** `To Do`

**Objectif** : rendre un build store possible (aucun build TestFlight/Play Internal sans ça aujourd'hui).

**Périmètre**
- `app.json` : `ios.bundleIdentifier`, `android.package`, `ios.buildNumber`, `android.versionCode`
- `eas.json` : profils `development` / `preview` / `production`
- Compte EAS lié (`expo.extra.eas.projectId`, `owner`)

**Critères d'acceptation**
- [ ] `eas build --platform ios` et `--platform android` réussissent (profil preview)
- [ ] Bundle ID / package uniques et réservés (App Store Connect / Play Console)

**Fichiers :** `app.json`, `eas.json`

---

### T-315 — Store/RGPD : suppression de compte réelle

**Labels :** `mvp`, `firebase`, `store`  
**Statut board :** `To Do`

**Objectif** : `deleteProfile()` ne supprime que `users/{uid}/profile/data` ; ni les sous-collections (étapes, rechutes, combats, mood) ni le compte Firebase Auth. Le seul bouton qui l'appelle est étiqueté "(test)" — ce n'est pas une suppression de compte utilisateur. Apple (guideline 5.1.1v) exige une vraie suppression accessible dans l'app dès qu'un compte peut être créé.

**Périmètre**
- Nouvelle fonction service : purge de toutes les sous-collections `users/{uid}/**` + `deleteUser(auth.currentUser)`
- Écran réglages : bouton "Supprimer mon compte" avec confirmation explicite (pas le bouton debug actuel)
- Gestion erreur `auth/requires-recent-login` (redemander mot de passe si besoin)

**Critères d'acceptation**
- [ ] Suppression retire profil + toutes sous-collections Firestore + compte Auth
- [ ] Confirmation utilisateur avant suppression (pas d'action accidentelle)
- [ ] `npx tsc --noEmit` OK ; testé sur un compte de test réel

**Fichiers :** `src/services/user.service.ts`, `src/services/auth.service.ts`, écran réglages/profil

**Dépend de :** aucun — bloquant avant soumission

---

### T-316 — Store : politique de confidentialité hébergée (URL publique)

**Labels :** `content`, `legal`, `store`  
**Statut board :** `To Do`

**Objectif** : App Store Connect et Play Console exigent une URL web publique dans le formulaire de soumission. Le contenu existe déjà en in-app (`src/features/settings/legalContent.ts`) mais n'est visible que dans l'app — pas suffisant pour les deux stores.

**Périmètre**
- Publier la politique de confidentialité (et CGU) sur une page web accessible sans l'app (site vitrine, GitHub Pages, etc.)
- Lien vers cette URL depuis l'écran réglages/welcome, en plus de l'écran in-app existant

**Critères d'acceptation**
- [ ] URL publique accessible sans connexion à l'app, renseignée dans les deux consoles stores
- [ ] Contenu identique ou cohérent avec `legalContent.ts`

**Fichiers :** `src/features/settings/legalContent.ts` (référence), page web hors repo app

---

### T-317 — Store : retirer bouton debug avant soumission

**Labels :** `mvp`, `store`  
**Statut board :** `To Do`

**Objectif** : "Recommencer le parcours (test)" est visible en Profil dans le build actuel — reset onboarding de debug, pas destiné aux utilisateurs finaux ni à la review store.

**Périmètre**
- Retirer le bouton du build release, ou le flag derrière `__DEV__` / variable d'env dev-only

**Critères d'acceptation**
- [ ] Bouton absent d'un build `production` (profil EAS)
- [ ] Toujours disponible en dev pour les tests internes si besoin

**Fichiers :** `src/features/tracker/components/profile/ProfileScreenBody.tsx`

---

### T-318 — Store : formulaires App Privacy / Data Safety + classification d'âge

**Labels :** `content`, `store`  
**Statut board :** `To Do`

**Objectif** : remplir les déclarations obligatoires de collecte de données pour chaque store, et répondre correctement à la classification liée au contenu santé/nicotine.

**Périmètre**
- Apple : formulaire "App Privacy" (nutrition label) — données collectées (profil, combats, mood) et finalités
- Google : "Data Safety" form — équivalent
- Questionnaire contenu : mentions à l'usage de substances (nicotine/vapotage) → impact classification d'âge (souvent 12+/PEGI 12 minimum)
- Screenshots stores (iPhone 6.5"/5.5", iPad si `supportsTablet`, Android phone/tablet)

**Critères d'acceptation**
- [ ] Formulaires remplis et cohérents avec les données réellement collectées (Firebase Auth, Firestore)
- [ ] Classification d'âge choisie et justifiée
- [ ] Screenshots prêts pour les deux stores

**Hors périmètre** : implémentation code (tâche 100 % console/produit)

---

### T-319 — Sécurité : règles Firestore sans validation de schéma (anti-triche)

**Labels :** `firebase`, `securite`  
**Statut board :** `Backlog`

**Objectif** : `firestore.rules` isole correctement par `uid` mais n'impose aucune forme de données. Un client authentifié (hors app officielle, ex. outil REST) peut écrire n'importe quoi dans son propre document — HP infinis, XP, niveau, badges arbitraires.

**Périmètre**
- Ajouter des contraintes de validation dans `firestore.rules` (types, bornes) sur les champs critiques de progression (XP, niveau, HP combat, badges)
- Pas de refonte du schéma Firestore

**Critères d'acceptation**
- [ ] Écriture avec valeur hors bornes (ex. XP négatif, niveau > max) refusée par les rules
- [ ] Écritures normales de l'app (services existants) toujours acceptées — pas de régression
- [ ] Testé via `docs/firestore-smoke-test.md` + émulateur si possible

**Fichiers :** `firestore.rules`

**Priorité :** avant tout système de classement/social ; sinon impact limité à la triche solo

---

### T-320 — Sécurité : Firebase App Check

**Labels :** `firebase`, `infra`, `securite`  
**Statut board :** `Backlog`

**Objectif** : rien n'empêche aujourd'hui un script externe d'appeler l'API Firebase du projet (lecture/écriture) en dehors de l'app officielle — risque d'abus et de coût.

**Périmètre**
- Activer Firebase App Check (Play Integrity Android, App Attest/DeviceCheck iOS)
- Intégrer le SDK côté `src/services/firebase.ts`

**Critères d'acceptation**
- [ ] App Check actif en production, requêtes non attestées refusées
- [ ] Build dev/Expo Go toujours fonctionnel (debug token App Check)

**Fichiers :** `src/services/firebase.ts`

**Priorité :** avant un lancement public élargi ; pas bloquant pour une bêta fermée

---

### T-321 — Sécurité : retirer logs debug avec données utilisateur

**Labels :** `firebase`, `securite`  
**Statut board :** `To Do`

**Objectif** : `saveProfile` logge en clair des données utilisateur (`console.log('[saveProfile]', { uid, unlockedEtapes })`) — bruit et exposition inutile en build release.

**Périmètre**
- Retirer ou conditionner (`__DEV__`) les `console.log` avec données utilisateur dans les services

**Critères d'acceptation**
- [ ] Aucun `console.log` de données utilisateur dans un build `production`
- [ ] `npx tsc --noEmit` OK, tests inchangés

**Fichiers :** `src/services/user.service.ts`

---

### T-322 — Sécurité : avertir la perte de données en compte anonyme

**Labels :** `auth`, `securite`  
**Statut board :** `Backlog`

**Objectif** : l'auth anonyme (`docs/firebase-auth-strategy.md`) crée un `uid` dont les données Firestore sont perdues définitivement si l'app est désinstallée ou le cache vidé, sans liaison email. Vérifier qu'un message prévient l'utilisateur.

**Périmètre**
- Vérifier/ajouter un message visible (bannière profil ou onboarding) tant que le compte reste anonyme, incitant à "sécuriser mon compte" (liaison email, cf. stratégie V1+)

**Critères d'acceptation**
- [ ] Utilisateur anonyme voit un message explicite sur le risque de perte de données
- [ ] CTA vers liaison email si déjà implémentée, sinon noté comme dépendance

**Dépend de :** liaison email (`linkWithCredential`) — vérifier état d'implémentation avant de démarrer

---

## V2+ — Backlog (spécification à cadrer)

| Ticket | Statut board |
|--------|--------------|
| T-301 | **Backlog** |
| T-302 | **Backlog** |
| T-303 | **Backlog** |

### T-301 — Notifications push (spéc V2)

**Labels :** `v2`, `infra`  
**Statut board :** `Backlog`

**Corps :**

**Objectif** : cadrer puis spécifier les notifications push AshHero (rappels combat, étapes, streak) — **hors MVP**.

**Périmètre**

- Lister les événements candidats : rappel envie, rappel respiration, milestone streak, etc.
- Arbitrer : fréquence max, opt-in explicite, contenu des messages, heures silencieuses.
- Contraintes iOS/Android : permissions, Expo Notifications ou FCM, conformité App Store / Play Store.
- Rédiger une spec courte (1 page) avant toute implémentation.

**Hors périmètre** : implémentation code ; notifications in-app (toast) ; email marketing.

**Critères d’acceptation**

- [ ] Atelier produit tenu : liste d’événements validée ou rejetée par événement.
- [ ] Spec V2 rédigée (déclencheurs, copy, opt-in, fréquence).
- [ ] Décision go/no-go publication documentée (RGPD, consentement).

**Définition of Done** : spec approuvée par le PO ; ticket d’implémentation V2 créé à partir de T-301.

**Priorité :** après MVP stable.

---

### T-302 — Authentification sociale (Google / Apple) — V2

**Labels :** `v2`, `auth`  
**Statut board :** `Backlog`

**Corps :**

**Objectif** : permettre la connexion via Google et/ou Apple en V2, en cohérence avec `docs/firebase-auth-strategy.md` (`linkWithCredential` ou flux dédié).

**Périmètre**

- Arbitrage produit : Google seul, Apple seul, ou les deux ; lien depuis compte anonyme existant.
- Config native Expo (Google Sign-In, Apple Sign-In, entitlements iOS).
- Implémentation Firebase Auth + gestion erreurs FR (réutiliser patterns T-201).
- Tests : nouveau compte social, retour utilisateur, liaison avec profil Firestore existant.

**Hors périmètre** : MVP email/password (T-101) ; Facebook / autres providers.

**Critères d’acceptation**

- [ ] Spec technique validée (flux, écrans, edge cases compte déjà existant).
- [ ] Connexion Google et/ou Apple fonctionne sur iOS et Android (build dev).
- [ ] Profil Firestore chargé comme pour l’auth email ; pas de régression T-101.

**Définition of Done** : parcours social testé sur device ; doc stratégie auth mise à jour.

**Fichiers** (indicatif post-spec)
- `src/services/auth.service.ts`
- `app/auth/**`
- Config Expo / Firebase console

**Dépend de :** T-101, `docs/firebase-auth-strategy.md`

---

### T-303 — Thème « analytics / confidentialité » (V2 ou légale)

**Labels :** `v2`, `legal`  
**Statut board :** `Backlog`

**Corps :**

**Objectif** : trancher si l’app a besoin d’analytics, d’une politique de confidentialité et d’un écran paramètres (consentement, suppression compte) pour la publication visée.

**Périmètre**

- Inventorier les données collectées aujourd’hui : Firebase Auth, Firestore, logs Expo, crash reports.
- Décider : analytics oui/non (Firebase Analytics, autre) ; quelles métriques ; opt-in requis ou non.
- Rédiger ou faire rédiger : politique de confidentialité, mentions légales si app FR/EU.
- Écran paramètres minimal : lien politique, contact, suppression compte (si requis RGPD).

**Hors périmètre** : implémentation analytics avant décision PO ; conseil juridique formel (recommander relecture pro si publication store).

**Critères d’acceptation**

- [ ] Tableau « donnée → finalité → base légale → durée » rempli par le PO.
- [ ] Décision analytics documentée (go/no-go + outil choisi si go).
- [ ] Si publication store : checklist confidentialité cochée (policy URL, consentement si tracking).

**Définition of Done** : décisions écrites ; tickets d’implémentation créés uniquement si go explicite.

**Priorité :** avant soumission App Store / Play Store si tracking ou données sensibles.

---

## MVP — Mood de la semaine (T-130 → T-138)

| Ticket | Statut board | Issue GitHub |
|--------|--------------|--------------|
| T-130 | **to review** | [#29](https://github.com/malaminebah/ashhero/issues/29) |
| T-131 | **to review** | [#30](https://github.com/malaminebah/ashhero/issues/30) |
| T-132 | **to review** | [#31](https://github.com/malaminebah/ashhero/issues/31) |
| T-133 | **to review** | [#32](https://github.com/malaminebah/ashhero/issues/32) |
| T-134 | **to review** | [#33](https://github.com/malaminebah/ashhero/issues/33) |
| T-135 | **to review** | [#34](https://github.com/malaminebah/ashhero/issues/34) |
| T-136 | **to review** | [#35](https://github.com/malaminebah/ashhero/issues/35) |
| T-137 | **Backlog** | [#36](https://github.com/malaminebah/ashhero/issues/36) |
| T-138 | **Backlog** | [#37](https://github.com/malaminebah/ashhero/issues/37) |

### T-130 — Mood : taxonomie émotions (6 primaires × 4 secondaires)

**Labels :** `mvp`, `content`, `tracker`  
**Statut board :** to review  
**Issue :** [#29](https://github.com/malaminebah/ashhero/issues/29)

**Objectif** : définir la source de vérité des humeurs (labels FR, clés TS) pour le flow et Firestore.

**Périmètre**
- Fichier `src/features/mood/moodTaxonomy.ts` + `types.ts`
- 6 primaires : calme, joie, tristesse, colère, peur, dégoût
- 4 sous-émotions par primaire (clés stables + label affiché)

**Hors périmètre** : édition admin des émotions ; vue mensuelle.

**Critères d'acceptation**
- [ ] Export typé `PrimaryMood`, `SubMood`, helpers `getSubMoods(primary)`
- [ ] Labels UI en français
- [ ] `npx tsc --noEmit` OK

---

### T-131 — Mood : schéma Firestore + service + rules

**Labels :** `mvp`, `firebase`, `tracker`  
**Statut board :** to review  
**Issue :** [#30](https://github.com/malaminebah/ashhero/issues/30)

**Objectif** : persister une entrée d'humeur par jour et par utilisateur.

**Périmètre**
- Collection `users/{uid}/moodEntries/{date}` — docId = `YYYY-MM-DD` (fuseau local)
- Champs : `date`, `weekId` (ISO `YYYY-Www`), `primary`, `sub`, `createdAt`
- `src/services/mood.service.ts` : `saveMoodEntry`, `getMoodEntry`, `listMoodEntriesForWeek`
- Règles Firestore : read/write owner only

**Critères d'acceptation**
- [ ] Double écriture même `date` → refus ou merge explicite documenté (v1 : refus)
- [ ] Aucun import firebase dans composants UI
- [ ] Rules déployables (`firestore.rules`)

---

### T-132 — Mood : hook `useWeeklyMood`

**Labels :** `mvp`, `tracker`, `firebase`  
**Statut board :** to review  
**Issue :** [#31](https://github.com/malaminebah/ashhero/issues/31)  
**Dépend de :** T-130, T-131

**Objectif** : API React pour la semaine courante (lun→dim).

**Périmètre**
- `src/features/mood/hooks/useWeeklyMood.ts`
- Retourne : `weekDays`, `entriesByDate`, `canFillToday`, `todayEntry`, `saveEntry`, `isLoading`, `error`
- Semaine ISO ; « aujourd'hui » = device local

**Critères d'acceptation**
- [ ] `canFillToday === false` si entrée existe pour la date du jour
- [ ] Jours futurs non remplissables
- [ ] v1 : jours passés non remplis non rétroactifs

---

### T-133 — Mood : composant `WeeklyMoodStrip` (Accueil)

**Labels :** `mvp`, `tracker`, `ux-copy`  
**Statut board :** to review  
**Issue :** [#32](https://github.com/malaminebah/ashhero/issues/32)  
**Dépend de :** T-132

**Objectif** : strip pressable Lun→Dim sur l'écran Accueil.

**Périmètre**
- `WeeklyMoodStrip.tsx` — 7 cellules, design system (`design-system/MASTER.md`)
- États : vide / rempli (check vert) / aujourd'hui / disabled
- Tap jour éligible → navigation flow mood

**Critères d'acceptation**
- [ ] Intégré dans `DashboardHome`
- [ ] min 48px zone tactile ; accessibilité labels
- [ ] NativeWind only

---

### T-134 — Mood : navigation flow (Expo Router)

**Labels :** `mvp`, `tracker`  
**Statut board :** to review  
**Issue :** [#33](https://github.com/malaminebah/ashhero/issues/33)  
**Dépend de :** T-130

**Objectif** : stack `app/mood/` — 2 étapes + retour Accueil.

**Périmètre**
- `app/mood/_layout.tsx`, `primary.tsx` (6 émotions), `detail.tsx` (4 sous-émotions + save)
- Passage param `primary` entre écrans (typed routes si possible)

**Critères d'acceptation**
- [ ] Back natif fonctionnel
- [ ] Pas de firebase dans les écrans — hook/service uniquement

---

### T-135 — Mood : écran émotion primaire

**Labels :** `mvp`, `tracker`, `ux-copy`  
**Statut board :** to review  
**Issue :** [#34](https://github.com/malaminebah/ashhero/issues/34)  
**Dépend de :** T-134, T-130

**Objectif** : grille 6 cartes (calme, joie, tristesse, colère, peur, dégoût).

**Critères d'acceptation**
- [ ] Une sélection → navigate vers détail avec primaire choisi
- [ ] Style cohérent AshHero (dark, mono, bordures subtiles)

---

### T-136 — Mood : écran sous-émotion + enregistrement

**Labels :** `mvp`, `tracker`, `firebase`  
**Statut board :** to review  
**Issue :** [#35](https://github.com/malaminebah/ashhero/issues/35)  
**Dépend de :** T-132, T-134, T-135

**Objectif** : afficher 4 sous-émotions filtrées ; sauver et retour Accueil.

**Critères d'acceptation**
- [ ] Save via `useWeeklyMood` → Firestore
- [ ] Feedback succès ; strip Accueil à jour au retour
- [ ] Si déjà rempli aujourd'hui → message ou redirect (pas d'écrasement silencieux)

---

### T-137 — Mood : panneau « Mon mood » (Profil)

**Labels :** `mvp`, `tracker`, `ux-copy`  
**Statut board :** Backlog  
**Issue :** [#36](https://github.com/malaminebah/ashhero/issues/36)  
**Dépend de :** T-132

**Objectif** : historique semaine courante sur Profil.

**Périmètre**
- `MonMoodPanel.tsx` — liste ou strip étendu avec primaire + sous-label FR par jour

**Critères d'acceptation**
- [ ] Intégré dans `ProfileScreenBody`
- [ ] Semaine courante uniquement (v1)

**Hors périmètre v1** : vue mensuelle, graphiques.

---

### T-138 — Mood : edge cases (offline, double tap, fuseau)

**Labels :** `mvp`, `tracker`  
**Statut board :** Backlog  
**Issue :** [#37](https://github.com/malaminebah/ashhero/issues/37)  
**Dépend de :** T-131, T-136

**Objectif** : robustesse UX et données.

**Périmètre**
- Double soumission / loading state sur save
- Message clair si offline (pas de crash)
- Tests unitaires sur helpers date/semaine ISO si extraits

**Critères d'acceptation**
- [ ] Pas de double entrée même jour
- [ ] Comportement documenté si réseau indisponible

---

### T-140 — Theme : police pixel M5x7 globale

**Labels :** `mvp`, `ui`  
**Statut board :** to review  
**Issue :** [#38](https://github.com/malaminebah/ashhero/issues/38)

**Objectif** : charger M5x7 via Expo et l’appliquer par défaut (Text, Tailwind).

---

### T-141 — Tracker : badges défense Accueil (pixel)

**Labels :** `mvp`, `tracker`  
**Statut board :** to review  
**Issue :** [#39](https://github.com/malaminebah/ashhero/issues/39)

**Objectif** : rangée « Badges de défense » (7 / 14 / 21 j) sur le dashboard.

---

### T-142 — Tracker : badges profil en icônes RPG

**Labels :** `mvp`, `tracker`  
**Statut board :** to review  
**Issue :** [#40](https://github.com/malaminebah/ashhero/issues/40)

**Objectif** : badges profil en slices du sheet RPG (plus d’emojis).

---

### T-139 — Combat : boss en 2 phases

**Labels :** `v2`, `combat`  
**Statut board :** Backlog  
**Issue :** [#41](https://github.com/malaminebah/ashhero/issues/41)  
**Dépend de :** T-138

**Objectif** : intensifier le combat en donnant au boss une seconde phase plus agressive.

**Périmètre**
- À 50 % PV (`bossHp <= bossMaxHp / 2`), le boss change de nom et d'emoji.
- Riposte renforcée : +4 dégâts ajoutés à la plage de base.
- Transition signalée via le `CombatMessageBox` (ex. « L'Envie s'intensifie ! »).

**Hors périmètre** : nouvelles attaques typées, animations dédiées, 3ᵉ phase.

**Critères d'acceptation**
- [ ] Le boss change visuellement (nom + emoji) au passage sous 50 % PV
- [ ] La riposte inflige +4 dégâts en phase 2
- [ ] Une seule transition par combat (pas de bascule répétée)

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
