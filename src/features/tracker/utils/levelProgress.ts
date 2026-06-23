export const XP_PER_LEVEL = 100

export const MAX_PROFILE_LEVEL = 10

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

export const PROFILE_LEVEL_STEPS = Array.from({ length: MAX_PROFILE_LEVEL }, (_, i) => {
  const level = i + 1
  return { level, xpRequired: xpForLevel(level) }
})
