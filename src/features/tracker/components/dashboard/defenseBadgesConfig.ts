export type DefenseBadgeRule = {
  key: string
  label: string
  minDays: number
  asset: 'week1' | 'week2' | 'week3'
}

export const DEFENSE_BADGE_RULES: DefenseBadgeRule[] = [
  { key: 'week1', label: '1 sem.', minDays: 7, asset: 'week1' },
  { key: 'week2', label: '2 sem.', minDays: 14, asset: 'week2' },
  { key: 'week3', label: '3 sem.', minDays: 21, asset: 'week3' },
]

export function isDefenseBadgeUnlocked(minDays: number, dayCount: number): boolean {
  return dayCount >= minDays
}
