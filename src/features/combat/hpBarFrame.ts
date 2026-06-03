export const HP_BAR_COLS = 6

/** Sprite index 0 = full, last = empty. Empty frame only when hp <= 0. */
export function hpBarFillFrame(hp: number, maxHp: number): number {
  const emptyIndex = HP_BAR_COLS - 1
  if (hp <= 0 || maxHp <= 0) return emptyIndex

  const lost = maxHp - hp
  const step = maxHp / HP_BAR_COLS
  const frame = Math.ceil(lost / step)

  if (hp > 0) return Math.min(emptyIndex - 1, frame)
  return emptyIndex
}
