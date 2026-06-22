import type { AttackEffectKey } from '../attackFxSheet'
import type { PlayerSoldierAnim } from '../soldierSheet'
import type { CombatPhase } from '../types'

const ATTACK_ANIM: Record<Exclude<AttackEffectKey, 'boss'>, PlayerSoldierAnim> = {
  breathe: 'attackBreathe',
  water: 'attackWater',
  distract: 'attackDistract',
  special: 'attackSpecial',
}

export function getPlayerSoldierAnim(
  phase: CombatPhase,
  playerHp: number,
  attackEffect: AttackEffectKey | null
): PlayerSoldierAnim {
  if (playerHp <= 0 || phase === 'defeat') return 'death'
  if (attackEffect === 'boss') return 'hurt'
  if (attackEffect != null) return ATTACK_ANIM[attackEffect]
  return 'idle'
}
