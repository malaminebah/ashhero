export const XP_PER_LEVEL = 300

export const MAX_PROFILE_LEVEL = 10

/** Special attack charge stays at 100 XP even though levels require more. */
export const SPECIAL_CHARGE_XP = 100

export function xpForLevel(level: number): number {
  return Math.max(0, level - 1) * XP_PER_LEVEL
}

export function levelFromXp(xp: number): number {
  return Math.floor(xp / XP_PER_LEVEL) + 1
}

export function xpCapForLevel(level: number): number {
  return level * XP_PER_LEVEL
}

export function xpProgressInLevel(xp: number): {
  inSegment: number
  nextCap: number
  pct: number
} {
  const inSegment = xp % XP_PER_LEVEL
  const nextCap = Math.floor(xp / XP_PER_LEVEL) * XP_PER_LEVEL + XP_PER_LEVEL
  const pct = Math.min(100, (inSegment / XP_PER_LEVEL) * 100)
  return { inSegment, nextCap, pct }
}

/** One special charge per 100 XP filled (segment + session). */
export function specialChargesAvailable(
  xpStart: number,
  sessionXp: number,
  specialsUsed: number
): number {
  const progress = (xpStart % SPECIAL_CHARGE_XP) + sessionXp
  return Math.max(0, Math.floor(progress / SPECIAL_CHARGE_XP) - specialsUsed)
}

export function canUseSpecialAttack(
  xpStart: number,
  sessionXp: number,
  specialsUsed: number
): boolean {
  return specialChargesAvailable(xpStart, sessionXp, specialsUsed) > 0
}

/** Combat XP bar toward the next special charge (100 XP). */
export function specialMeterState(
  xpStart: number,
  sessionXp: number,
  specialsUsed: number
): { pct: number; ready: boolean; inSegment: number } {
  const progress = (xpStart % SPECIAL_CHARGE_XP) + sessionXp
  const towardNext = progress - specialsUsed * SPECIAL_CHARGE_XP
  const ready = towardNext >= SPECIAL_CHARGE_XP
  const inSegment = ready
    ? SPECIAL_CHARGE_XP
    : Math.max(0, Math.min(SPECIAL_CHARGE_XP, towardNext))
  const pct = ready ? 100 : (inSegment / SPECIAL_CHARGE_XP) * 100
  return { pct, ready, inSegment }
}

export const PROFILE_LEVEL_STEPS = Array.from({ length: MAX_PROFILE_LEVEL }, (_, i) => {
  const level = i + 1
  return { level, xpRequired: xpForLevel(level) }
})
