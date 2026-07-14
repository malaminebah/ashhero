import type { CombatAction } from '@/src/features/tracker/types'
import type { BossAnim, PlayerSoldierAnim } from '../animConfig'
import { playerAttackAnim } from '../animConfig'
import type { BossAttackEffect, BossAttackName, CombatPhase } from '../types'

/** Drives sprite rows; screen FX in CombatEffectOverlay. */
export type CombatSpriteCue = CombatAction | 'boss' | 'boss_regen' | null

export type CombatVisuals = {
  playerAnim: PlayerSoldierAnim
  bossAnim: BossAnim
}

export const BOSS_ATTACK_EFFECT: Record<BossAttackName, BossAttackEffect> = {
  'Souffle Tentation': 'smoke',
  "Poussée d'envie": 'push',
  'Envie de relâcher la pression': 'fire',
  'Odeur de fumer': 'poison',
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
      bossAnim: bossHp <= 0 ? 'death' : 'idle',
    }
  }

  // Player attack cue takes priority — even if the boss just died (killing blow).
  if (spriteCue != null && spriteCue !== 'boss' && spriteCue !== 'boss_regen') {
    return { playerAnim: playerAttackAnim(spriteCue), bossAnim: bossHp <= 0 ? 'death' : 'hurt' }
  }

  if (bossHp <= 0 || phase === 'victory' || phase === 'celebrate_victory') {
    return { playerAnim: 'victory', bossAnim: 'death' }
  }

  if (spriteCue === 'boss') {
    return { playerAnim: 'hurt', bossAnim: 'attack' }
  }

  if (spriteCue === 'boss_regen') {
    return { playerAnim: 'idle', bossAnim: 'idle' }
  }

  if (phase === 'breathe_pending') {
    return { playerAnim: 'attackBreathe', bossAnim: 'idle' }
  }

  if (phase === 'boss_regen' || phase === 'boss_windup' || phase === 'enemy_turn') {
    return { playerAnim: 'idle', bossAnim: 'idle' }
  }

  if (phase === 'resolving_instant') {
    return { playerAnim: 'idle', bossAnim: 'idle' }
  }

  return { playerAnim: 'idle', bossAnim: 'idle' }
}
