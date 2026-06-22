export const bossSheet = require('@/assets/combat/boss-sheet.png')

export const BOSS_FRAME_SIZE = 100
export const BOSS_SHEET_W = 300
export const BOSS_SHEET_H = 400
export const BOSS_SHEET_COLS = 3
export const BOSS_SHEET_ROWS = 4

/** Matches prior static boss display (~120px). */
export const BOSS_DISPLAY_SCALE = 1.2

export type BossAnim = 'idle' | 'attack' | 'hurt' | 'death'

export type BossAnimConfig = {
  row: number
  frames: number
  frameMs: number
  loop: boolean
}

/** Rows on boss-sheet.png (100×100 cells). */
export const BOSS_ANIMS: Record<BossAnim, BossAnimConfig> = {
  idle: { row: 0, frames: 3, frameMs: 170, loop: true },
  attack: { row: 1, frames: 3, frameMs: 85, loop: false },
  hurt: { row: 2, frames: 3, frameMs: 95, loop: false },
  death: { row: 3, frames: 2, frameMs: 130, loop: false },
}
