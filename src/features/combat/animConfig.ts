import type { CombatAction } from '@/src/features/tracker/types'

export type SoldierAnimConfig = {
  row: number
  frames: number
  frameMs: number
  loop: boolean
}

export type BossAnimConfig = {
  row: number
  frames: number
  frameMs: number
  loop: boolean
}

export type PlayerSoldierAnim =
  | 'idle'
  | 'attackBreathe'
  | 'attackWater'
  | 'attackDistract'
  | 'attackSpecial'
  | 'hurt'
  | 'death'
  | 'victory'

export type BossAnim = 'idle' | 'attack' | 'hurt' | 'death'

export const SOLDIER_ANIMS: Record<PlayerSoldierAnim, SoldierAnimConfig> = {
  idle: { row: 0, frames: 3, frameMs: 165, loop: true },
  attackBreathe: { row: 1, frames: 3, frameMs: 85, loop: false },
  attackWater: { row: 2, frames: 3, frameMs: 85, loop: false },
  attackDistract: { row: 3, frames: 3, frameMs: 85, loop: false },
  attackSpecial: { row: 4, frames: 3, frameMs: 75, loop: false },
  hurt: { row: 5, frames: 3, frameMs: 95, loop: false },
  death: { row: 6, frames: 2, frameMs: 130, loop: false },
  victory: { row: 7, frames: 2, frameMs: 150, loop: true },
}

export const BOSS_ANIMS: Record<BossAnim, BossAnimConfig> = {
  idle: { row: 0, frames: 3, frameMs: 170, loop: true },
  attack: { row: 1, frames: 3, frameMs: 85, loop: false },
  hurt: { row: 2, frames: 3, frameMs: 95, loop: false },
  death: { row: 3, frames: 2, frameMs: 130, loop: false },
}

const PLAYER_ATTACK_ANIM: Record<CombatAction, PlayerSoldierAnim> = {
  breathe: 'attackBreathe',
  water: 'attackWater',
  distract: 'attackDistract',
  special: 'attackSpecial',
}

export function playerAttackAnim(action: CombatAction): PlayerSoldierAnim {
  return PLAYER_ATTACK_ANIM[action]
}

export function animDurationMs(cfg: { frames: number; frameMs: number }): number {
  return cfg.frames * cfg.frameMs
}

export function playerAttackDurationMs(action: CombatAction): number {
  return animDurationMs(SOLDIER_ANIMS[playerAttackAnim(action)])
}

export function bossAnimDurationMs(anim: BossAnim): number {
  return animDurationMs(BOSS_ANIMS[anim])
}

export function soldierAnimDurationMs(anim: PlayerSoldierAnim): number {
  return animDurationMs(SOLDIER_ANIMS[anim])
}
