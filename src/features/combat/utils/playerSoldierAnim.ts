import type { AttackEffectKey } from '../attackFxSheet'
import type { PlayerSoldierAnim } from '../soldierSheet'
import type { CombatPhase } from '../types'

export function getPlayerSoldierAnim(
  phase: CombatPhase,
  playerHp: number,
  attackEffect: AttackEffectKey | null
): PlayerSoldierAnim {
  if (playerHp <= 0 || phase === 'defeat') return 'death'
  if (attackEffect === 'boss') return 'hurt'
  if (attackEffect != null) {
    return attackEffect === 'special' ? 'attackHeavy' : 'attackLight'
  }
  return 'idle'
}
