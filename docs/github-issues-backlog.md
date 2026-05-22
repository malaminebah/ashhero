# Issues GitHub — brouillons AshHero

**Dépôt cible :** [malaminebah/ashhero](https://github.com/malaminebah/ashhero)

Colle chaque ticket dans **Issues → New issue**, ou utilise [GitHub CLI](https://cli.github.com) avec les exemples en fin de fichier.

**Labels suggérés (à créer une fois dans le dépôt) :** `mvp`, `v2`, `content`, `auth`, `firebase`, `tracker`, `combat`, `ux-copy`, `infra`, `blocked` (adapter à ton board).

---

## MVP — Auth & données

### T-101 — Auth email/mot de passe (inscription + connexion)

**Labels :** `mvp`, `auth`, `firebase`

**Corps :**

**Objectif** : le MVP ne repose pas sur l’auth anonyme seule ; l’utilisateur peut **créer un compte** et **se connecter** avec email + mot de passe (Firebase).

**Périmètre**
- Exposer dans `auth.service.ts` (ou équivalent) : création de compte et connexion email/mot de passe.
- Écrans ou flux Expo Router : inscription, connexion, déconnexion si déjà prévu par l’archi.
- Gestion d’erreurs Firebase visibles côté UI (messages utilisables, pas de crash).

**Hors périmètre** : Google/Apple (V2).

**Critères d’acceptation**
- [ ] Depuis un état non connecté, un utilisateur peut s’inscrire avec email + mot de passe valides et obtenir un `uid` stable.
- [ ] Depuis un autre lancement / appareil (même build), connexion avec les mêmes identifiants recharge le profil Firestore existant (comportement aligné `getProfile` / layout actuel).
- [ ] Aucun import `firebase/*` dans un composant UI — logique dans services + hooks (`CURSOR.md`).

**Définition of Done** : `npx tsc --noEmit` OK ; pas de régression sur la structure Firestore documentée.

---

### T-102 — Réinitialisation du mot de passe (Firebase)

**Labels :** `mvp`, `auth`

**Corps :**

**Objectif** : flux « mot de passe oublié » via `sendPasswordResetEmail` (ou équivalent SDK), avec libellés d’erreur cohérents.

**Critères d’acceptation**
- [ ] Depuis l’écran de connexion (ou lien dédié), l’utilisateur peut demander un email de reset pour une adresse valide.
- [ ] Cas d’erreur (email invalide, trop de requêtes) gérés sans crash.

**Note** : dépend de T-101 (écrans auth en place).

---

### T-103 — Retirer ou réduire la dépendance au seul `signInAnonymously` pour le parcours MVP

**Labels :** `mvp`, `auth`

**Corps :**

**Objectif** : aligner le démarrage de l’app sur le parcours **compte email** (T-101). Si l’anonyme reste en code, documenter dans le ticket de doc produit **où** il sert (ex. dev only) ou le retirer du chemin utilisateur MVP.

**Critères d’acceptation**
- [ ] Le premier écran « compte » du MVP ne se contente pas d’une session anonyme sans offrir inscription/connexion email (sauf décision explicite documentée dans la PR).

---

## MVP — App (features existantes)

Tickets : **T-111**, **T-112**, **T-113** (respiration combat).

### T-111 — Relecture flux onboarding + persistance profil post-auth email

**Labels :** `mvp`, `tracker`

**Corps :**

Vérifier que les étapes onboarding + `saveProfile` / chargement store restent cohérents après bascule auth email (pas de `initialState` trompeur, `CURSOR.md`).

---

### T-112 — Parité combat / tracker avec règles Firestore

**Labels :** `mvp`, `combat`, `firebase`

**Corps :**

Vérifier que les écritures `addCombat`, relapses, étapes respectent les règles `users/{uid}/**` une fois l’utilisateur authentifié par email.

---

### T-113 — Combat : guidage respiration (« attaque respiratoire ») — compteurs inhale / exhale / pause

**Labels :** `mvp`, `combat`, `ux-copy`

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
| T-119 | **To Do** | Copy FR |
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

### T-119 — Combat : remplacer You / Opponent et copy EN → FR

**Labels :** `mvp`, `combat`, `ux-copy`

**Corps :**

**Objectif** : uniformiser tous les textes combat en français (tutoiement), remplacer les libellés génériques « You » / « Opponent ».

**Textes à traiter**

| Actuel | Fichier | Proposition FR |
|--------|---------|----------------|
| `Battle` | `CombatModal.tsx` | `Combat` |
| `Opponent` | `CombatModal.tsx` | `L'Envie` ou `Adversaire` |
| `You` | `CombatModal.tsx` | `Toi` ou `Ton calme` |
| `The Craving's turn…` | `CombatModal.tsx` | `Tour de l'Envie…` |
| `Surrender` | `CombatModal.tsx` | `Abandonner` |
| `Composure` | `CombatPlayerPanel.tsx` | `Ton calme` |
| `The Craving` | `CombatMonster.tsx` | `L'Envie` |
| `Your move:` / `You lose` | `CombatMessageBox.tsx` | `Ton coup :` / `Tu perds` |
| `The Craving uses` / `loses` | `CombatMessageBox.tsx` | `L'Envie utilise` / `perd` |
| Labels actions EN | `constants.ts` | `Respirer`, `Boire`, etc. |
| Banners victoire/défaite EN | `VictoryBanner`, `DefeatBanner` | FR |

**Critères d'acceptation**
- [ ] Plus de « You », « Opponent », « Battle », « Surrender » visibles en combat
- [ ] Ton cohérent (tutoiement, pas moralisateur)
- [ ] Textes centralisés si possible (éviter strings éparpillées)
- [ ] `npx tsc --noEmit` OK

**Fichiers**
- `src/features/combat/components/CombatModal.tsx`
- `src/features/combat/components/CombatMonster.tsx`
- `src/features/combat/components/CombatPlayerPanel.tsx`
- `src/features/combat/components/CombatMessageBox.tsx`
- `src/features/combat/components/VictoryBanner.tsx`
- `src/features/combat/components/DefeatBanner.tsx`
- `src/features/combat/constants.ts` (`ACTION_LABELS`)

**Statut board :** `To Do`  
**Dépend de :** T-114 à T-118 (gameplay visuel stabilisé)

**Définition of Done** : relecture FR ; combat entièrement en français.

---

### T-120 — Combat : passe design finale (polish UI)

**Labels :** `mvp`, `combat`, `ui`, `polish`

**Corps :**

**Objectif** : retouche visuelle globale une fois le combat fonctionnel et la copy FR OK (T-119). **À faire en dernier** après validation playtest T-114→119.

**Périmètre**
- [ ] Espacements finaux boss / joueur (alignement bordures gauche-droite)
- [ ] Tailles sprites, barres PV, typo (mono / tracking)
- [ ] Cohérence couleurs design system (`brand-accent`, `brand-bg2`, emerald joueur)
- [ ] Message box : lisibilité, contraste, padding
- [ ] Boutons actions : états disabled, hiérarchie visuelle
- [ ] Fond arène : gradient ou texture légère si besoin
- [ ] Victoire / défaite : harmoniser avec le reste du modal
- [ ] iPhone SE + grand écran : pas de débordement

**Hors périmètre**
- Nouvelles mécaniques gameplay
- Sprites/particules custom (voir T-121)

**Critères d'acceptation**
- [ ] 3 playtests sans régression UX
- [ ] Aligné `CURSOR.md` (NativeWind, pixel art sombre)
- [ ] Screenshots avant/après dans la PR (optionnel)

**Fichiers** (selon retouches)
- `CombatModal.tsx`, `CombatMonster.tsx`, `CombatPlayerPanel.tsx`
- `CombatMessageBox.tsx`, `ActionButton.tsx`
- `VictoryBanner.tsx`, `DefeatBanner.tsx`

**Statut board :** `To Do` → `In Review` après implémentation → `Done` après validation visuelle PO  
**Bloqué par :** T-119

**Définition of Done** : PO valide le rendu visuel sur device.

---

### T-121 — Combat : sprites / particules d'attaque (optionnel)

**Labels :** `combat`, `content`, `animation`

**Corps :**

**Objectif** : remplacer les emojis d'attaque par sprites ou particules légères (fumée, éclair, eau) si le proto emoji (T-115) ne suffit pas.

**Critères d'acceptation**
- [ ] Asset list validée par le PO (fumée, eau, éclair, etc.)
- [ ] Perf OK sur device milieu de gamme
- [ ] Fallback emoji si asset manquant
- [ ] Mapping actions conservé (breathe, water, distract, special, boss riposte)

**Fichiers**
- `src/features/combat/components/AttackEffect.tsx` (ou remplacement)
- Assets dans `assets/` ou équivalent

**Statut board :** `Backlog` — après T-120  
**Priorité :** P3 (nice to have)

**Définition of Done** : playtest visuel ; pas de régression perf.

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
