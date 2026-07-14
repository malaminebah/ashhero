---
name: ashhero-combat
description: Skill spécialisé pour la feature combat d'AshHero (RPG anti-vape React Native/Expo) — state machine de combat, animations de sprites, HP bar, effets visuels (shake, float damage, transitions de phase), pipeline spritesheet. Déclencher dès qu'on parle de useTurnCombat, CombatHpBar, SheetSprite, ArenaSprites, combatVisuals, animConfig, ou de tout comportement visuel pendant un combat.
---

# AshHero — Skill Combat

## Stack & contraintes globales

- React Native + Expo Router + TypeScript + Zustand + NativeWind
- Firebase uniquement dans `src/services/` — jamais dans les composants
- Zustand : sélecteurs atomiques uniquement (`useStore((s) => s.field)`)
- KISS : diff minimal, pas de refactor hors scope
- Pas de commit/push sans demande explicite
- UI copy en français, code/identifiers en anglais

---

## Fichiers clés — combat

| Fichier | Rôle |
|---------|------|
| `src/features/combat/hooks/useTurnCombat.ts` | State machine principale du combat |
| `src/features/combat/utils/combatVisuals.ts` | Résolution pure des anims selon phase/HP/spriteCue (`resolveCombatVisuals`) |
| `src/features/combat/animConfig.ts` | Rows, frames, frameMs des spritesheets joueur/boss |
| `src/features/combat/types.ts` | Types partagés de la feature (`CombatPhase`, `BattleMessage`, params des composants) |
| `src/features/combat/components/CombatModal.tsx` | Orchestrateur UI du combat |
| `src/features/combat/components/CombatHpBar.tsx` | Barre de vie animée (sprite-frame, pas du CSS width%) |
| `src/features/combat/components/ArenaSprites.tsx` | Rendu sprites de la zone de combat |
| `src/features/combat/components/SheetSprite.tsx` | Composant sprite réutilisable (générique, piloté par `animConfig`) |
| `src/features/combat/components/FloatingDamage.tsx` | Nombre de dégâts flottant |
| `src/features/combat/hooks/useSheetFrameAnim.ts` | Anim de frame sur UI thread (Reanimated, pas de `setInterval`) |
| `src/features/combat/hooks/useCombatShakeStyle.ts` | Style de shake directionnel sur impact |

---

## State machine — phases (`CombatPhase`)

```
entering --(INTRO_DURATION_MS)--> player_turn

player_turn --action instantanée--> resolving_instant
player_turn --breathe--> breathe_pending --fin du timer--> resolving_instant

resolving_instant --bossHp > 0--> enemy_turn (windup) --riposte--> player_turn (tour suivant)
resolving_instant --bossHp = 0--> celebrate_victory --(VICTORY_CELEBRATE_MS)--> victory

enemy_turn (riposte) --playerHp = 0--> celebrate_defeat --(DEFEAT_CELEBRATE_MS)--> defeat

player_turn / breathe_pending --abandon--> defeat (direct, sans phase celebrate)
```

Phases exposées dans `CombatPhase` (`types.ts`).

---

## AnimConfig — valeurs exactes (`animConfig.ts`)

### Player (`SOLDIER_ANIMS`)

| Anim | Row | Frames | FrameMs | Loop |
|------|-----|--------|---------|------|
| idle | 0 | 1 | 200 | true |
| attackBreathe | 1 | 3 | 190 | false |
| attackWater | 2 | 3 | 190 | false |
| attackDistract | 3 | 3 | 190 | false |
| attackSpecial | 4 | 3 | 170 | false |
| hurt | 5 | 3 | 175 | false |
| death | 6 | 3 | 215 | false |
| victory | 7 | 2 | 250 | true |

Durée via `soldierAnimDurationMs(anim)` (ou `playerAttackDurationMs(action)` pour les attaques) = `frames × frameMs`.

### Boss (`BOSS_ANIMS`)

| Anim | Row | Frames | FrameMs | Loop |
|------|-----|--------|---------|------|
| idle | 0 | 3 | 280 | true |
| attack | 1 | 3 | 190 | false |
| hurt | 2 | 3 | 175 | false |
| death | 3 | 3 | 215 | false |

Durée via `bossAnimDurationMs(anim)`.

---

## Timings combat (`useTurnCombat.ts`)

| Constante | Valeur | Rôle |
|-----------|--------|------|
| `INTRO_DURATION_MS` | 1500 | Pause `entering` avant `player_turn` |
| `HIT_PAUSE_BUFFER_MS` | 550 | Pause post-attaque avant le windup boss / le retour à `player_turn` |
| `ENEMY_WINDUP_MS` | 850 | Telegraph boss (anim `attack`) avant que la riposte ne s'applique |
| `ATTACK_MESSAGE_HOLD_MS` | 2000 | Durée d'affichage du message d'attaque dans la message box |
| `VICTORY_CELEBRATE_MS` | 900 | Pause `celebrate_victory` avant `finalizeVictory` |
| `DEFEAT_CELEBRATE_MS` | `soldierAnimDurationMs('death') + 180` | Pause `celebrate_defeat` avant `finalizeDefeat` |
| `FLOAT_DAMAGE_MS` | 1100 | Durée d'affichage du float damage |

---

## CombatSpriteCue

```typescript
type CombatSpriteCue = CombatAction | 'boss' | null
// CombatAction = 'breathe' | 'water' | 'distract' | 'special'
```

- `null` → anims par défaut selon la phase (`idle`/`idle`, ou `hurt` côté boss pendant la fenêtre `resolving_instant`)
- `'boss'` → player `hurt`, boss `attack`
- `CombatAction` → player joue l'anim d'attaque correspondante, boss `hurt`

La résolution complète vit dans `resolveCombatVisuals()` (`combatVisuals.ts`) — ne jamais dupliquer cette logique dans un composant.

---

## HP Bar — pattern réel (`CombatHpBar.tsx`)

Ce n'est **pas** une barre CSS `width%` + `interpolateColor`. C'est un sprite-sheet à frames discrètes :

```typescript
const targetFrame = useMemo(() => hpBarFillFrame(clampedHp, maxHp), [clampedHp, maxHp])
const opacity = useSharedValue(1)

useEffect(() => {
  setFrame(targetFrame)
  opacity.value = withTiming(0.85, { duration: 80 }, () => {
    opacity.value = withTiming(1, { duration: 200 })
  })
}, [targetFrame, opacity])
```

Le rendu translate l'image du sheet (`hpBarsSheet`) selon `HP_BAR_FILL_X[frame]` dans un viewport `overflow:hidden` — même principe que `SheetSprite`, pas une primitive CSS. Le flash d'opacité (1 → 0.85 → 1) sert de feedback sur changement de HP.

---

## Reanimated — patterns établis dans ce repo

```typescript
// Shake directionnel sur impact (useCombatShakeStyle.ts) — 6 étapes décroissantes
offset.value = withSequence(
  withTiming(8 * sign, { duration: 45 }),
  withTiming(-8 * sign, { duration: 45 }),
  withTiming(5 * sign, { duration: 45 }),
  withTiming(-5 * sign, { duration: 45 }),
  withTiming(3 * sign, { duration: 40 }),
  withTiming(0, { duration: 50 })
)

// Float damage (FloatingDamage.tsx) — pas de scale/spring, juste opacité + drift linéaire
opacity.value = withSequence(
  withTiming(1, { duration: 120 }),
  withTiming(1, { duration: 480 }),
  withTiming(0, { duration: 320 })
)
translateY.value = withTiming(-32, { duration: 920 })
translateX.value = withTiming(driftX, { duration: 920 }) // driftX = ±24 selon la cible

// Frame d'anim sprite (useSheetFrameAnim.ts) — progress linéaire 0..frames sur UI thread
progress.value = config.loop
  ? withRepeat(withTiming(config.frames, { duration: config.frames * config.frameMs, easing: Easing.linear }), -1, false)
  : withTiming(config.frames, { duration: config.frames * config.frameMs, easing: Easing.linear })
```

---

## Interdits stricts

- ❌ `setInterval` pour driver des frames — uniquement Reanimated (`withTiming`/`withRepeat`) ou `setTimeout` pour le séquencement de la FSM
- ❌ Nouveau composant sprite si `SheetSprite` suffit
- ❌ Offsets magiques frame par frame — passer par `scripts/normalize-spritesheet.py` ou par `animConfig.ts`
- ❌ Modifier `animConfig.ts` sans mesurer le PNG d'abord
- ❌ Dupliquer la logique de `resolveCombatVisuals` dans un composant
- ❌ Firebase dans les composants combat
- ❌ Refactor hors combat dans une mission scopée combat

---

## Checklist avant chaque modification

1. Lire `CURSOR.md` (architecture, interdits, checklist PR) si pas déjà fait dans la session
2. Identifier les fichiers réellement touchés (cf. tableau ci-dessus) — pas plus
3. Vérifier que `SheetSprite` ne suffit pas avant de créer un composant
4. Si changement spritesheet : mesurer le PNG, mettre à jour `animConfig.ts`, vérifier que `resolveCombatVisuals` et les timers de `useTurnCombat` (spriteCue, `HIT_PAUSE_BUFFER_MS`, etc.) restent cohérents avec les nouvelles durées
5. Tester sur device : idle loop, attaque joueur, hurt boss, windup + riposte boss, victory/defeat
6. `npx tsc --noEmit` + `npm test` avant de considérer la tâche terminée

---

## Pipeline sprites (changement de spritesheet)

1. Valider les dimensions de la grille vs `animConfig.ts`
2. Normaliser avec `scripts/normalize-spritesheet.py` si les frames dérivent
3. Mettre à jour `animConfig.ts` (row/frameMs)
4. Synchroniser `resolveCombatVisuals` et les durées de spriteCue dans `useTurnCombat`
5. Tester sur device : idle, attack, hurt, death

Agent dédié : `@combat-sprites` pour tout travail d'exécution sur les spritesheets (mesure, normalisation, édition directe des fichiers).

Reply in French.
