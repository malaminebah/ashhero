export const bossSheet = require('@/assets/combat/sprite_boss.png')

/** TexturePacker target cell — current PNG is 1302×1160 (3×2). */
export const BOSS_FRAME_W = 432
export const BOSS_FRAME_H = 578

export const BOSS_SHEET_W = 1302
export const BOSS_SHEET_H = 1160
export const BOSS_SHEET_COLS = 3
export const BOSS_SHEET_ROWS = 2

export const BOSS_CELL_W = BOSS_SHEET_W / BOSS_SHEET_COLS
export const BOSS_CELL_H = BOSS_SHEET_H / BOSS_SHEET_ROWS

/** ~350px tall — boss dominant but clears hero gap. */
export const BOSS_DISPLAY_SCALE = 0.60

export type { BossAnim, BossAnimConfig } from './animConfig'
export { BOSS_ANIMS } from './animConfig'
