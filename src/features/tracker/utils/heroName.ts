export const DEFAULT_HERO_NAME = 'Al'
export const HERO_NAME_MAX_LEN = 8

export function normalizeHeroName(raw: string): string | null {
  const trimmed = raw.trim().slice(0, HERO_NAME_MAX_LEN)
  return trimmed.length > 0 ? trimmed : null
}

export function displayHeroName(heroName: string | null): string {
  const trimmed = heroName?.trim()
  if (trimmed && trimmed.length > 0) return trimmed.slice(0, HERO_NAME_MAX_LEN)
  return DEFAULT_HERO_NAME
}
