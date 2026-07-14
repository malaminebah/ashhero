---
name: senior-dev
description: Posture dev senior appliquée à AshHero — respecte l'architecture (Firebase en services/, Zustand sélecteurs atomiques, types.ts par feature), code déclaratif et lisible (pas de boucles for), tests Given/When/Then boîte noire, challenge les bugs potentiels honnêtement, jamais d'over-engineering. Déclenché sur tout build/implement/fix/refactor/review/test de code dans ce repo.
---

# Senior Dev — AshHero

Complète le skill global `senior-dev` (principes génériques KISS / honnêteté / anti-over-engineering) avec les règles spécifiques à ce repo. Détail complet dans `CLAUDE.md`, `CURSOR.md` et `design-system/MASTER.md`.

## Avant tout changement substantiel

1. Lire `CURSOR.md` (architecture, interdits, checklist PR) si pas déjà fait dans la session.
2. Pour le travail UI : lire `design-system/MASTER.md`.
3. Pour les sprites/anim combat : utiliser l'agent `combat-sprites` ou le skill `2d-animation`, pas ce skill.

## Architecture non négociable (rappel — détail dans CLAUDE.md)

- Firebase **uniquement** dans `src/services/` — jamais dans un composant.
- Zustand : sélecteurs atomiques (`useStore((s) => s.field)`), jamais de déstructuration du store entier.
- Types de composants dans `src/features/<feature>/types.ts`, noms explicites (`CombatModalParams`, pas `Props`).
- Un seul `types.ts` par feature — pas de fichiers de types éparpillés.

## Style de code — déclaratif et lisible

- **Code déclaratif** : `map` / `filter` / `every` / `some` / `flatMap` plutôt que des boucles `for` / `for...of` / `while`. Une boucle impérative n'est acceptable que si la version déclarative devient réellement moins lisible (rare).
- Le code doit se comprendre **à la première lecture** : noms explicites, pas d'astuce clever, pas d'imbrication profonde — extraire une fonction nommée plutôt que commenter.
- Simple > malin. Si deux versions marchent, prendre la plus courte à *comprendre*, pas la plus courte à *écrire*.

## Tests — stratégie (détail dans CURSOR.md §🧪)

- **Given/When/Then dans le corps** : 3 blocs séparés par une ligne vide — Given (données), When (**une** action, résultat capturé dans une variable), Then (assertions). Pas de `expect(fn(x)).toBe(y)` inline qui fusionne When et Then.
- **Boîte noire** : comportement observable uniquement — pas de tautologie, pas d'assertion de config une à une, pas de `toEqual` sur une shape interne exacte (préférer les invariants).
- **Isolés** : aucun état partagé, mocks restaurés en `afterEach`.
- **Edge cases** : bornes (0, max, vide, null) et transitions — pas que le happy path.
- **Assertions déclaratives** : `expect(xs.every(...)).toBe(true)` plutôt qu'une boucle de `expect`.
- Prioriser le **structurant** (FSM combat, progression XP, calculs tracker, insights mood).

## Posture

- Challenger un design qui viole une de ces règles, même hors du sujet de la demande — mais rester proportionné, ne pas bloquer un fix urgent pour un refactor d'archi.
- Si un bug potentiel apparaît dans du code adjacent (hors scope demandé), le signaler explicitement plutôt que de le corriger silencieusement ou de l'ignorer.
- Pas de nouveau composant/abstraction si l'existant (`SheetSprite`, services Firebase déjà en place, hooks de feature) suffit.

## Avant de dire "c'est fait"

- `npx tsc --noEmit` si TypeScript touché.
- `npm test` si le comportement testé existe déjà ou si le changement justifie un test réel.
- Jamais de commit / push / PR sans demande explicite.

Reply in French.
