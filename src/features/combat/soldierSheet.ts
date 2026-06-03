export const soldierSheet = require('@/assets/caracter/Soldier.png')

export const SOLDIER_FRAME_SIZE = 100
export const SOLDIER_SHEET_W = 900
export const SOLDIER_SHEET_H = 700
export const SOLDIER_SHEET_COLS = 9
export const SOLDIER_SHEET_ROWS = 7

/** ~105px on screen; boss sprite is 120px. */
export const SOLDIER_DISPLAY_SCALE = 1.8

export type PlayerSoldierAnim = 'idle' | 'attackLight' | 'attackHeavy' | 'hurt' | 'death'

export type SoldierAnimConfig = {
  row: number
  frames: number
  frameMs: number
  loop: boolean
}

/** Rows on Soldier.png (100×100 cells). */
export const SOLDIER_ANIMS: Record<PlayerSoldierAnim, SoldierAnimConfig> = {
  idle: { row: 0, frames: 6, frameMs: 140, loop: true },
  attackLight: { row: 2, frames: 6, frameMs: 75, loop: false },
  attackHeavy: { row: 4, frames: 9, frameMs: 75, loop: false },
  hurt: { row: 5, frames: 4, frameMs: 100, loop: false },
  death: { row: 6, frames: 4, frameMs: 140, loop: false },
}
