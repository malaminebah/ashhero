import type { CombatAction } from '@/src/features/tracker/types'
import type { BossAnim, PlayerSoldierAnim } from '../animConfig'
import { playerAttackAnim } from '../animConfig'
import type { CombatPhase } from '../types'

/** Drives sprite rows only — FX live in the spritesheets, not a separate overlay. */
export type CombatSpriteCue = CombatAction | 'boss' | null

export type CombatVisuals = {
  playerAnim: PlayerSoldierAnim
  bossAnim: BossAnim
}

export function resolveCombatVisuals(
  phase: CombatPhase,
  playerHp: number,
  bossHp: number,
  spriteCue: CombatSpriteCue
): CombatVisuals {
  if (playerHp <= 0 || phase === 'defeat' || phase === 'celebrate_defeat') {
    return {
      playerAnim: 'death',
      bossAnim: bossHp <= 0 ? 'death' : 'attack',
    }
  }

  if (bossHp <= 0 || phase === 'victory' || phase === 'celebrate_victory') {
    return { playerAnim: 'victory', bossAnim: 'death' }
  }

  if (spriteCue === 'boss') {
    return { playerAnim: 'hurt', bossAnim: 'attack' }
  }

  if (spriteCue != null) {
    return { playerAnim: playerAttackAnim(spriteCue), bossAnim: 'hurt' }
  }

  if (phase === 'enemy_turn') {
    return { playerAnim: 'idle', bossAnim: 'attack' }
  }

  return { playerAnim: 'idle', bossAnim: 'idle' }
}
