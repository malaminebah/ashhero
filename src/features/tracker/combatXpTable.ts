import type { CombatAction } from './types'

/** XP per combat action — single source for tests and useCombat. */
export const COMBAT_XP_BY_ACTION: Record<CombatAction, number> = {
  breathe: 25,
  water: 20,
  distract: 12,
  special: 40,
}
