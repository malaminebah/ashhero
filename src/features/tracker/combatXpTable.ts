import type { CombatAction } from './types'

/** XP per combat action — single source for tests and useCombat. */
export const COMBAT_XP_BY_ACTION: Record<CombatAction, number> = {
  breathe: 20,
  water: 15,
  distract: 10,
  special: 40,
}
