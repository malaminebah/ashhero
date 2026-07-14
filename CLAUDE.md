# AshHero — Claude Code

App React Native **anti-vape gamifiée** (RPG pixel art).
Stack : **Expo Router · TypeScript · Zustand · Firebase · NativeWind**

## Before any substantial code change

1. Read **`CURSOR.md`** at repo root (architecture, interdits, checklist PR).
2. For UI work : read **`design-system/MASTER.md`**.
3. Feature specs : `docs/*.md` · backlog : `docs/github-issues-backlog.md`.

## Commands

```bash
npm test              # vitest
npx tsc --noEmit
npx expo start
```

## Architecture (non-negotiable)

- Firebase only in `src/services/` — never in components.
- Zustand : atomic selectors (`useStore((s) => s.field)`), not whole-store destructuring.
- Component param types in `src/features/<feature>/types.ts` with explicit names (`CombatModalParams`, not `Props`).
- Types shared per feature live in one `types.ts` — no scattered type files.

## Coding style

- KISS, minimal diff, no drive-by refactors.
- Code déclaratif : `map`/`filter`/`every` plutôt que boucles `for` — simple et compréhensible à la première lecture.
- Reuse existing patterns before creating abstractions.
- Comments only when non-obvious; English if needed. UI copy in French.
- No commit / push / PR unless explicitly asked.
- Conventional Commits in English (`feat(combat): …`).

## Tests (non-negotiable)

- **Given/When/Then = structure du corps du test** (3 blocs séparés par une ligne vide) : Given = données préparées, When = **une** action dont le résultat est capturé (`const result = …`), Then = assertions sur ce résultat. Pas de `expect(fn(x)).toBe(y)` inline qui fusionne When et Then. Le titre décrit le scénario.
- **Boîte noire** : tester le comportement, jamais l'implémentation. Interdits :
  - tautologie (re-calculer la formule du code dans le test),
  - asserter des constantes de config une à une,
  - `toEqual` sur la shape exacte d'un objet interne (préférer les invariants).
  Litmus test : « si je réécris l'implémentation sans changer le comportement, le test passe-t-il encore ? »
- **Isolation** : aucun état partagé entre tests ; mocks restaurés (`afterEach` + `vi.restoreAllMocks`).
- **Edge cases obligatoires** : bornes (0, max, vide, null), transitions, cas limites réels.
- **Priorité au structurant** (FSM combat, progression XP, calculs tracker, insights mood) — pas de tests triviaux pour la couverture.

## Communication

- Reply in **French** unless asked otherwise.
- Be direct : challenge weak reasoning, no empty praise.

## Where things live

| Area | Path |
|------|------|
| Combat | `src/features/combat/` |
| Tracker | `src/features/tracker/` |
| Auth | `src/features/auth/` + `app/auth/` |
| Onboarding | `src/features/onboarding/` |
| Services | `src/services/` |

## Combat sprites (feature priority)

Use subagent **`combat-sprites`** for animation / sheet / frame work:
```
@combat-sprites vérifie Hero.png et boss-sheet.png, corrige le bleed entre frames
```

Pipeline:
1. Validate grid dimensions match `animConfig.ts`
2. Normalize with `scripts/normalize-spritesheet.py` if frames drift
3. Update `animConfig.ts` row/frameMs — sync `resolveCombatVisuals` + `useTurnCombat` spriteCue durations
4. Test on device: idle loop, player attack, boss hurt, boss attack windup

Key files: `SheetSprite.tsx`, `useSheetFrameAnim.ts`, `ArenaSprites.tsx`, `combatVisuals.ts`, `useTurnCombat.ts`.

### Combat — interdits

- Pas de nouveau composant sprite si `SheetSprite` suffit
- Pas de `setInterval` pour les frames
- Pas d'offsets magiques frame par frame
- Pas de refactor hors combat
- Toujours mesurer le PNG avant de changer `animConfig`
