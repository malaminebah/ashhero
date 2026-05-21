# AshHero

App mobile **React Native** (anti-vape) **gamifiée** : progression type RPG, thème **pixel art** sombre, accent violet.

Dépôt : [github.com/malaminebah/ashhero](https://github.com/malaminebah/ashhero)

---

## Stack

| Sujet | Choix |
|--------|--------|
| Framework | [Expo](https://expo.dev) + [Expo Router](https://docs.expo.dev/router/introduction/) |
| Langage | TypeScript |
| État global | [Zustand](https://github.com/pmndrs/zustand) (sélecteurs atomiques, voir `CURSOR.md`) |
| Backend | [Firebase](https://firebase.google.com) — Auth + Firestore |
| Styles | [NativeWind](https://www.nativewind.dev/) (pas de `StyleSheet.create` dans les conventions du projet) |

L’architecture (features, services, règles Zustand/Firebase) est décrite dans **[`CURSOR.md`](./CURSOR.md)** : à lire avant toute contribution substantielle.

---

## Documentation utile

| Fichier | Contenu |
|---------|---------|
| [`CURSOR.md`](./CURSOR.md) | Architecture, design system, checklist PR |
| [`docs/firebase-auth-strategy.md`](./docs/firebase-auth-strategy.md) | Auth Firebase, flux, règles Firestore côté doc |
| [`docs/combat-turn-based-spec.md`](./docs/combat-turn-based-spec.md) | Spécification combat tour par tour |
| [`docs/github-issues-backlog.md`](./docs/github-issues-backlog.md) | Brouillons d’**issues GitHub** (MVP, contenu, V2) — à créer sur le board |

---

## Périmètre produit (résumé)

- **MVP** : compte **email + mot de passe** (inscription, connexion, réinitialisation du mot de passe côté Firebase à prévoir dans le flux) ; onboarding, tracker, combats, sync Firestore selon le modèle documenté dans `CURSOR.md`.
- **Hors scope MVP (V2+)** : notifications push, social login (Google/Apple) sauf arbitrage ultérieur, contenus narratifs/UX à cadrer — tickets correspondants en backlog, pas bloquants pour un premier build testable.

Le détail des tickets (titres, critères, labels) est dans [`docs/github-issues-backlog.md`](./docs/github-issues-backlog.md).

---

## Prérequis

- [Node.js](https://nodejs.org) (LTS recommandé)
- Un projet Firebase configuré (Auth + Firestore) — variables d’environnement selon `src/services/firebase.ts` / la doc interne.
- [Expo CLI](https://docs.expo.dev/get-started/installation/) via `npx` (pas d’install globale obligatoire).

---

## Démarrage

```bash
npm install
npx expo start
```

- Simulateur / device : suis les options du terminal (Android, iOS, Expo Go si applicable).
- Vérification TypeScript (alignée `CURSOR.md`) :

```bash
npx tsc --noEmit
```

---

## Issues & board GitHub (backlog)

- Brouillons de tickets : [`docs/github-issues-backlog.md`](./docs/github-issues-backlog.md).
- **Project / board** : la CLI `gh` exige le scope `project` sur le token. Après `gh auth refresh -s project,read:project -h github.com`, lance **`./scripts/github-backlog-project.sh`** pour créer le Project v2, le lier au dépôt [ashhero](https://github.com/malaminebah/ashhero) et y ajouter les issues (par défaut #1–#11).

---

## Licence & contributions

Définition à ajouter (projet personnel / CLA) selon ton choix.
