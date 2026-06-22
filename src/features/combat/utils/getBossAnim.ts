import type { AttackEffectKey } from '../attackFxSheet'
import type { BossAnim } from '../bossSheet'
import type { CombatPhase } from '../types'

export function getBossAnim(
  phase: CombatPhase,
  bossHp: number,
  attackEffect: AttackEffectKey | null
): BossAnim {
  if (bossHp <= 0 || phase === 'victory') return 'death'
  if (attackEffect === 'boss') return 'attack'
  if (attackEffect != null) return 'hurt'
  if (phase === 'enemy_turn') return 'attack'
  return 'idle'
}
