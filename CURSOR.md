# AshHero — Cursor Agent Rules

> Ce fichier est la source de vérité pour tout agent ou session Cursor travaillant sur AshHero.
> Lis ce fichier en entier avant de toucher au code.

---

## 🎯 Contexte du projet

App React Native **anti-vape gamifiée** style RPG Pixel Art.
Stack : **Expo Router · TypeScript · Zustand · Firebase · NativeWind**

**Design system UI** (couleurs, composants, écrans) → lire **`design-system/MASTER.md`** avant tout travail visuel.

### Où documenter quoi

| Sujet | Fichier |
|--------|---------|
| Règles agent (archi, interdits, checklist) | **`CURSOR.md`** (ce fichier) |
| Spec feature (combat, auth, mood…) | `docs/*.md` |
| Tickets / backlog | `docs/github-issues-backlog.md` |
| Types + params composants d’une feature | `src/features/<feature>/types.ts` |
| Tokens UI (couleurs, composants) | `design-system/MASTER.md` |

Ne pas mettre les specs produit ou les tickets dans `CURSOR.md` — garder ce fichier **court et stable**.

---

## 🏗️ Architecture — Règles absolues

### 1. Firebase — jamais dans les composants

```
✅ OK   : src/services/firebase.ts
✅ OK   : src/services/auth.service.ts
✅ OK   : src/services/user.service.ts
✅ OK   : hooks (useEtapes, useCombat, etc.)
✅ OK   : store actions (relapse → addRelapse)

❌ JAMAIS : import firebase dans un composant .tsx
❌ JAMAIS : appel Firestore direct dans un écran
❌ JAMAIS : appel saveProfile / addCombat dans le JSX
```

Tout appel réseau dans un composant → le déplacer dans un hook dédié sous `features/*/hooks/`.

---

### Commentaires (code)

- **Pas de commentaires** sauf si vraiment nécessaire (invariant non évident, contournement documenté, contrainte externe).
- Le code doit se lire via **noms et structure** — pas de commentaires qui répètent ce que fait le code.
- Si un commentaire est indispensable : **anglais uniquement** (strings UI / copy utilisateur : français, ailleurs dans le code).

---

### TypeScript — types explicites (obligatoire)

- **Interdit** : `type Props = { ... }` générique dans un composant.
- **Obligatoire** : nom **évocateur** par usage — ex. `CombatModalParams`, `CombatArenaViewParams`, `FloatingDamageParams`.
- **Feature** : tout type partagé (FSM, messages, payloads, params de composants) dans **un seul** `features/<feature>/types.ts`. Pas de `battleMessage.ts` ou fichiers types éclatés pour la même feature.
- **Cohérence des champs** : les noms du type = les noms réels des données (`floatDamage.key`, pas `triggerKey` si l'objet expose `key`).
- **Imports** : `import type { ... } from '../types'` (ou `@/src/features/.../types`) — pas de duplication d'un union dans un autre fichier.

```ts
// ❌
type Props = { visible: boolean; onClose: () => void }

// ✅ dans features/combat/types.ts
export type CombatModalParams = { visible: boolean; onClose: () => void }

// ✅ dans CombatModal.tsx
export const CombatModal = ({ visible, onClose }: CombatModalParams) => { ... }
```

---

### 2. Zustand — sélecteurs atomiques obligatoires

```ts
// ❌ INTERDIT — souscription entière
const { initialize } = useTrackerStore()
const { setField } = useOnboardingStore()

// ✅ CORRECT — sélecteur atomique
const initialize = useTrackerStore((s) => s.initialize)
const setField = useOnboardingStore((s) => s.setField)
```

- Une valeur ou action = un sélecteur
- Pour lire le store dans un handler async sans souscription au rendu :

```ts
const handleSubmit = async () => {
  const state = useOnboardingStore.getState()
  // ...
}
```

- Si plusieurs champs liés nécessaires au rendu → utiliser `useShallow` :

```ts
import { useShallow } from 'zustand/react/shallow'
const { xp, level } = useTrackerStore(useShallow((s) => ({ xp: s.xp, level: s.level })))
```

---

### 3. initialState — jamais de fausses valeurs

```ts
// ❌ INTERDIT
smokingType: 'cigarette'   // valeur inventée
quitDate: new Date()       // date inventée

// ✅ CORRECT
smokingType: null
quitDate: null
```

- Scalaires neutres autorisés : `xp: 0`, `combatsWon: 0`, `unlockedEtapes: []`
- `level: 1` autorisé — c'est du game design cohérent avec `floor(xp/100)+1`

---

## 📁 Structure fichiers — respecter strictement

```
src/
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   └── (tabs)/
│       └── index.tsx
├── features/
│   ├── tracker/
│   │   ├── components/
│   │   ├── hooks/
│   │   │   ├── useStats.ts
│   │   │   ├── useEtapes.ts
│   │   │   ├── useNow.ts
│   │   │   ├── useDayCount.ts
│   │   │   └── useCombat.ts
│   │   ├── utils/
│   │   │   └── calculations.ts
│   │   ├── store.ts
│   │   ├── types.ts
│   │   └── index.ts
│   ├── onboarding/
│   │   ├── hooks/
│   │   │   └── useOnboardingSubmit.ts
│   │   ├── store.ts
│   │   ├── types.ts
│   │   └── step1.tsx … step6.tsx
│   ├── mood/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── types.ts
│   └── combat/
│       ├── components/
│       ├── hooks/
│       └── types.ts
└── services/
    ├── firebase.ts
    ├── auth.service.ts
    ├── user.service.ts
    └── index.ts
```

Nouvelle feature → nouveau dossier sous `features/`. Jamais de logique métier dans `app/`.

---

## 🔑 Types

Source de vérité par domaine :

- `src/features/tracker/types.ts` — profil, store, étapes, `CombatAction`
- `src/features/onboarding/types.ts` — onboarding
- `src/features/mood/types.ts` — humeurs, semaine
- `src/features/combat/types.ts` — FSM combat, messages, `*Params` UI

---

## 🔥 Services Firebase disponibles

```ts
// auth
export { signInAnon, getCurrentUid, onAuthReady } from './auth.service'

// firestore
export { saveProfile, getProfile, addRelapse, addCombat, addEtape } from './user.service'
```

Structure Firestore :
```
users/{uid}/
├── profile/data      # TrackerConfig complet
├── etapes/{id}       # { etape: string, unlockedAt: Timestamp }
├── relapses/{id}     # { date: Timestamp, streakBefore: number }
└── combats/{id}      # { date: Timestamp, xpGained: number, action: CombatAction, result: CombatResult }
```

**Auth (V1)** : **deux entrées** — **e-mail + mot de passe** (inscription, connexion, reset) **et** **session anonyme** (`signInAnonymously`) proposés depuis les écrans auth, sans que l’app ne force un seul mode. Lier un e-mail à l’anonyme (même `uid`) reste possible plus tard, selon [docs/firebase-auth-strategy.md](docs/firebase-auth-strategy.md). Google/Apple en V2. Règles Firestore : [docs/firebase-auth-strategy.md](docs/firebase-auth-strategy.md).

**Persistance Auth (React Native)** : `src/services/firebase.ts` utilise `initializeAuth` + `getReactNativePersistence(AsyncStorage)` — sans ça, `getAuth` seul ne restaure pas la session au cold start.

---

## 🎨 Design System

```
Background   : #08000f
Accent       : #a855f7  (Violet Royal)
Texte        : #ffffff
Texte muted  : #a1a1aa
Danger       : #ef4444
Succès       : #22c55e
```

- **NativeWind** pour les styles — `StyleSheet` seulement si obligatoire (ex. `LinearGradient`, Reanimated)
- Style global : Pixel Art, dark, Violet Royal
- Pas de border-radius excessif — garder l'esthétique pixel

---

## ⚔️ Système de combat — XP Table

```ts
const XP_TABLE: Record<CombatAction, number> = {
  breathe: 20,
  water: 15,
  distract: 10,
  special: 40,    // disponible seulement si bestStreak >= 7
}
```

Level formula : `Math.floor(xp / 100) + 1`

Combat **tour par tour** (PV joueur/boss, Respirer = 60 s puis dégâts) : [docs/combat-turn-based-spec.md](docs/combat-turn-based-spec.md).

---

## 🚫 Ce que tu ne fais jamais

- `any` en TypeScript — utilise les types définis dans `types.ts`
- `useTrackerStore()` sans sélecteur
- Import Firebase dans un composant
- Logique métier dans `app/` — ça va dans `features/`
- Nouvelle dépendance sans demander — YAGNI
- Modifier la structure Firestore sans mettre à jour `user.service.ts`
- `StyleSheet.create()` — NativeWind seulement
- Commentaires superflus ; commentaires code restants en anglais

---

## ✅ Checklist avant chaque PR / commit

- [ ] Aucun import `firebase/*` dans les composants
- [ ] Chaque `useTrackerStore()` a un sélecteur atomique
- [ ] Chaque `useOnboardingStore()` a un sélecteur atomique
- [ ] Aucun `null` masqué par une valeur par défaut dans `initialState`
- [ ] TypeScript sans erreur (`npx tsc --noEmit`)
- [ ] Types feature dans `types.ts` ; pas de `type Props` ; noms de champs alignés sur les objets métier
- [ ] NativeWind uniquement pour les styles
