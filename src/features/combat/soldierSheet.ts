export const soldierSheet = require('@/assets/combat/sprite_hero.png')

export const SOLDIER_FRAME_W = 502
export const SOLDIER_FRAME_H = 502

export const SOLDIER_SHEET_W = 1506
export const SOLDIER_SHEET_H = 1506
export const SOLDIER_SHEET_COLS = 3
export const SOLDIER_SHEET_ROWS = 3

export const SOLDIER_CELL_W = SOLDIER_SHEET_W / SOLDIER_SHEET_COLS
export const SOLDIER_CELL_H = SOLDIER_SHEET_H / SOLDIER_SHEET_ROWS

/** ~190px on screen. */
export const SOLDIER_DISPLAY_SCALE = 0.38

export type { PlayerSoldierAnim, SoldierAnimConfig } from './animConfig'
export { SOLDIER_ANIMS } from './animConfig'
