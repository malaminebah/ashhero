import type { CombatAction } from './types'

/** Table XP par action — source unique pour les tests et useCombat. */
export const COMBAT_XP_BY_ACTION: Record<CombatAction, number> = {
  breathe: 20,
  water: 15,
  distract: 10,
  special: 40,
}
