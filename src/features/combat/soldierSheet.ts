export const soldierSheet = require('@/assets/caracter/Hero.png')

export const SOLDIER_FRAME_SIZE = 100
export const SOLDIER_SHEET_W = 300
export const SOLDIER_SHEET_H = 800
export const SOLDIER_SHEET_COLS = 3
export const SOLDIER_SHEET_ROWS = 8

/** ~180px on screen; boss sprite is 120px. */
export const SOLDIER_DISPLAY_SCALE = 1.8

export type PlayerSoldierAnim =
  | 'idle'
  | 'attackBreathe'
  | 'attackWater'
  | 'attackDistract'
  | 'attackSpecial'
  | 'hurt'
  | 'death'
  | 'victory'

export type SoldierAnimConfig = {
  row: number
  frames: number
  frameMs: number
  loop: boolean
}

/** Rows on Hero.png (100×100 cells). */
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
