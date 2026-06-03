export const hpBarsSheet = require('@/assets/combat/hp-bars-sheet.png')

export const HP_BAR_SHEET_W = 336
export const HP_BAR_SHEET_H = 240
export const HP_BAR_FRAME_W = 30
export const HP_BAR_FRAME_H = 9

/** Rounded row: fill frames (full → empty), x positions on the sheet. */
export const HP_BAR_FILL_X = [58, 106, 154, 202, 250, 298] as const

export const HP_BAR_Y: Record<'boss' | 'player', number> = {
  boss: 132,
  player: 180,
}

export const HP_BAR_DISPLAY_SCALE = 3

export type CombatHpBarVariant = 'boss' | 'player'
