export type DefenseBadgeRule = {
  key: string
  label: string
  minDays: number
  asset: 'week1' | 'week2' | 'week3'
  title: string
  summary: string
  healthBonusPercent: 10 | 20 | 30
  health: string
}

export const DEFENSE_BADGE_RULES: DefenseBadgeRule[] = [
  {
    key: 'week1',
    label: '1 sem.',
    minDays: 7,
    asset: 'week1',
    title: 'Bouclier novice',
    summary:
      'Une semaine sans vape. Ton personnage commence à encaisser mieux les assauts du boss.',
    healthBonusPercent: 10,
    health:
      'Bonus de santé +10 % : ton héros récupère un peu plus vite après chaque combat et encaisse mieux les premiers coups.',
  },
  {
    key: 'week2',
    label: '2 sem.',
    minDays: 14,
    asset: 'week2',
    title: 'Armure renforcée',
    summary:
      'Deux semaines de défense. Tu tiens la ligne — ton corps et ton héros gagnent en endurance.',
    healthBonusPercent: 20,
    health:
      'Bonus de santé +20 % : plus de marge avant la défaite, et une barre de vie qui tient plus longtemps sous pression.',
  },
  {
    key: 'week3',
    label: '3 sem.',
    minDays: 21,
    asset: 'week3',
    title: 'Forteresse',
    summary:
      'Trois semaines sans rechute. Tu es un mur — le boss a de moins en moins de prise sur toi.',
    healthBonusPercent: 30,
    health:
      'Bonus de santé +30 % : défense maximale des badges. Ton personnage encaisse nettement mieux et garde l’avantage plus longtemps.',
  },
]

export function isDefenseBadgeUnlocked(minDays: number, dayCount: number): boolean {
  return dayCount >= minDays
}

/** Highest health bonus among unlocked defense badges (10 → 20 → 30 %). */
export function getDefenseHealthBonusPercent(dayCount: number): number {
  return DEFENSE_BADGE_RULES.reduce((best, rule) => {
    if (!isDefenseBadgeUnlocked(rule.minDays, dayCount)) return best
    return Math.max(best, rule.healthBonusPercent)
  }, 0)
}

export function playerEffectiveMaxHp(baseMax: number, bonusPercent: number): number {
  if (bonusPercent <= 0) return baseMax
  return Math.round(baseMax * (1 + bonusPercent / 100))
}

export const getDefenseBadgeByKey = (key: string): DefenseBadgeRule | undefined =>
  DEFENSE_BADGE_RULES.find((b) => b.key === key)
