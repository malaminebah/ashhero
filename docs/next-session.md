# Prochaine session — plan d’action

> Généré après revue code (2026-05-21). Objectif : **CI verte**, **alignement spec/code**, **fermer les vrais trous prod** avant nouveau polish.

**Ordre recommandé** : bloc 1 → 2 → 3 → 4. Ne pas reprendre combat visuel tant que 1 et 2 ne sont pas verts.

---

## 1. CI & contrats (bloquant — ~1 h)

### Tests

- [ ] `src/features/combat/constants.test.ts` — aligner riposte boss avec `rollBossRiposteDamage()` (code actuel **7–15** vs test **8–16**) : décider source de vérité (spec T-124 ou code) puis corriger **code ou test**.
- [ ] `src/features/tracker/combatXpTable.test.ts` — aligner sur `COMBAT_XP_BY_ACTION` actuel (`breathe: 25`, `water: 20`, etc.) ou rebalance si la spec CURSOR est la vérité.
- [ ] Vérifier : `npm run test-run` → **0 échec**.

### TypeScript

- [ ] `constants/setupDefaultFont.ts` — `defaultProps` cassé sous React 19 / types RN récents.
  - Option A : wrapper `AppText` / `AppTextInput` avec `fontFamily: PIXEL_FONT`.
  - Option B : config NativeWind / thème navigation uniquement (supprimer le patch global).
- [ ] Vérifier : `npx tsc --noEmit` → **0 erreur**.

### Documentation combat (même PR que les tests)

- [ ] `docs/combat-turn-based-spec.md` — boss **78 PV** (pas 100), dégâts actuels (`DAMAGE_TO_BOSS`), riposte réelle, XP depuis `combatXpTable.ts`.
- [ ] `CURSOR.md` — table XP combat : pointer vers `src/features/tracker/combatXpTable.ts` comme source de vérité (éviter double maintenance).

**Commit suggéré** : `fix(combat): align tests, spec and xp table with implementation`

---

## 2. Prod / données (bloquant store — ~1–2 h)

### Combat — persistance Firestore

- [ ] `src/features/tracker/hooks/useCombat.ts` — `handleVictory` / `handleDefeat` :
  - Persister Firestore **d’abord** (`addCombat`, `persistProfile`), puis mettre à jour le store Zustand.
  - Ou : `try/catch` + message utilisateur + **pas** d’XP locale si échec réseau.
- [ ] Playtest : mode avion / couper réseau → pas d’XP fantôme affichée.

### Mood — écriture atomique (T-138)

- [ ] `src/services/mood.service.ts` — `saveMoodEntry` via `runTransaction` (check + write même jour).
- [ ] Message offline explicite (réseau indisponible vs permission Firestore) — pas seulement « Enregistrement impossible ».
- [ ] Tests `src/features/mood/utils/weekDates.ts` :
  - semaine lun→dim ;
  - `formatLocalDate` / « aujourd’hui » ;
  - jour futur non remplissable.

**Commits suggérés** :

- `fix(tracker): persist combat result before local store update`
- `fix(mood): atomic save and weekDates tests` (+ messages offline)

---

## 3. Mood MVP — tickets ouverts (T-137, T-138)

### T-137 — Panneau « Mon mood » (Profil)

- [ ] Créer `MonMoodPanel.tsx` (semaine courante : primaire + sous-label FR par jour).
- [ ] Intégrer dans `ProfileScreenBody.tsx`.
- [ ] Décision produit : garder `/mood/history` en plus ou fusionner avec le panneau profil.
- [ ] Board GitHub #36 → **to review** quand critères OK.

### T-138 — Edge cases

- [ ] Double soumission (transaction, cf. §2).
- [ ] `isSaving` déjà OK — revérifier après transaction.
- [ ] Tests unitaires `weekDates` (cf. §2).
- [ ] Board GitHub #37 → **to review** quand critères OK.

### Dette mood (amélioration, pas bloquant bêta)

- [ ] Éviter 3 instances de `useWeeklyMood` (dashboard + index + detail) — store partagé ou contexte feature pour un seul refresh / état cohérent au retour arrière.

---

## 4. Hygiène produit & board (rapide — ~30 min)

### UI debug

- [ ] Retirer ou flag dev : bouton « Recommencer le parcours (test) » dans `ProfileScreenBody.tsx`.

### Board GitHub / backlog doc

- [ ] **T-203** (#8) — remettre en **Todo** tant que l’inventaire assets PO n’est pas rempli (tabs/badges faits ≠ ticket fermé).
- [ ] **T-119** (copy FR combat) — rester Todo ; ne pas marquer combat « done » sans lui.
- [ ] **T-139** (#41) — rester Backlog (boss 2 phases non codé).
- [ ] Mettre à jour `docs/github-issues-backlog.md` après chaque ticket fermé (statut + lien issue).

### Lint quick wins (optionnel même PR)

- [ ] `PlayerSoldierSprite.tsx` — import / variable inutilisée.
- [ ] `MoodFlowProgress.tsx` — `Text` import inutilisé.
- [ ] `WeeklyMoodStrip.tsx` — typer `MoodDot` dans `features/mood/types.ts` (convention CURSOR).
- [ ] `npm run lint` — 0 warning sur fichiers touchés.

### CURSOR.md

- [ ] Ajouter `moodEntries` dans la liste des sous-collections Firestore documentées.

---

## 5. Hors scope prochaine session (ne pas démarrer)

- Nouveau polish combat / sprites / T-121 au-delà de la review.
- T-139 boss 2 phases.
- Slice massif d’icônes sans `required-icons.txt` + `git add -f` ciblé.
- Refactor hexagonal / gros refactor onboarding.

---

## Checklist « bêta interne OK »

- [ ] `npm run test-run` vert
- [ ] `npx tsc --noEmit` vert
- [ ] `npm run check` (lint + prettier) vert
- [ ] Rules Firestore déployées : `firebase deploy --only firestore:rules`
- [ ] T-137 + T-138 en **to review** ou Done sur le board
- [ ] Pas de bouton debug profil visible
- [ ] PO informé : T-119 copy combat encore ouvert

---

## Références

| Sujet | Fichiers |
|--------|----------|
| Backlog tickets | `docs/github-issues-backlog.md` |
| Spec combat | `docs/combat-turn-based-spec.md` |
| Règles agent | `CURSOR.md` |
| Regénérer icônes | `scripts/slice-icon-sheet.py`, `assets/32x32.png` |
| Board GitHub | Project #1 « AshHero — Backlog », `gh project view 1 --owner malaminebah --web` |

---

## Commits / push (rappel)

- Petits commits **Conventional Commits** par sujet (cf. skill git-specialist).
- Staging ciblé — pas de `git add .` après `slice-icon-sheet.py`.
- Push seulement quand demandé ou fin de session validée.
