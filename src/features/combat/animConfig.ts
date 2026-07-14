import type { CombatAction } from '@/src/features/tracker/types'

export type SoldierAnimConfig = {
  row: number
  col?: number
  frames: number
  frameMs: number
  loop: boolean
}

export type BossAnimConfig = {
  row: number
  col?: number
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

/** Boss slide-in during `boss_entering`. */
export const BOSS_INTRO_MS = 550

/**
 * 3×3 — `assets/combat/sprite_hero.png` (502×502 cells).
 * Row 0: victoire (0,0) | défense/hurt (0,1) | idle (0,2)
 * Row 1: eau (1,0)      | KO/death (1,1)     | spécial (1,2)
 * Row 2: distraire (2,0)| —                  | —
 * Pas de pose dédiée « respirer » → idle + aura verte (BreatheHeroAura).
 */
export const SOLDIER_ANIMS: Record<PlayerSoldierAnim, SoldierAnimConfig> = {
  victory: { row: 0, col: 0, frames: 1, frameMs: 250, loop: true },
  hurt: { row: 0, col: 1, frames: 1, frameMs: 240, loop: false },
  idle: { row: 0, col: 2, frames: 1, frameMs: 200, loop: true },
  attackBreathe: { row: 0, col: 2, frames: 1, frameMs: 550, loop: false },
  attackWater: { row: 1, col: 0, frames: 1, frameMs: 550, loop: false },
  death: { row: 1, col: 1, frames: 1, frameMs: 500, loop: false },
  attackSpecial: { row: 1, col: 2, frames: 1, frameMs: 650, loop: false },
  attackDistract: { row: 2, col: 0, frames: 1, frameMs: 550, loop: false },
}

/** 3×2 — `assets/combat/sprite_boss.png`. */
export const BOSS_ANIMS: Record<BossAnim, BossAnimConfig> = {
  idle: { row: 0, col: 0, frames: 1, frameMs: 280, loop: true },
  // Anticipation (150) + lunge (110) + held impact + spring back — CartoonBoss reads this total.
  attack: { row: 1, col: 0, frames: 1, frameMs: 520, loop: false },
  hurt: { row: 0, col: 2, frames: 1, frameMs: 260, loop: false },
  death: { row: 0, col: 1, frames: 1, frameMs: 560, loop: false },
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
