import type { CombatAction } from '@/src/features/tracker/types'

export const attackSparkSheet = require('@/assets/combat/fx/attack-spark-sheet.png')

export const ATTACK_FX_COLS = 12
export const ATTACK_FX_ROWS = 9
export const ATTACK_FX_FRAME_SIZE = 64
export const ATTACK_FX_FRAME_COUNT = 12
export const ATTACK_FX_FRAME_MS = 65

export const ATTACK_FX_DURATION_MS = ATTACK_FX_FRAME_COUNT * ATTACK_FX_FRAME_MS
export const ATTACK_FX_DISPLAY_SCALE = 2.2

export type AttackEffectKey = CombatAction | 'boss'

const ROW_BY_EFFECT: Record<AttackEffectKey, number> = {
  breathe: 3,
  water: 2,
  distract: 4,
  special: 1,
  boss: 0,
}

export function attackFxRow(effect: AttackEffectKey): number {
  return ROW_BY_EFFECT[effect]
}
