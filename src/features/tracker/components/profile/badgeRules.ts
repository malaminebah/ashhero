import type { SmokingType } from '@/src/features/onboarding/types'

export type ProfileBadgeStats = {
  dayCount: number
  combatsWon: number
  xp: number
  level: number
  moneySaved: number
  smokingType: SmokingType | null
}

export type ProfileBadgeDef = {
  id: string
  name: string
  icon: string
  isUnlocked: (s: ProfileBadgeStats) => boolean
}

/** 6 badges — déblocage basé sur les stats du store (YAGNI, pas de Firestore ici). */
export const PROFILE_BADGES: ProfileBadgeDef[] = [
  {
    id: 'first',
    name: 'Premier Jour',
    icon: '🌱',
    isUnlocked: (s) => s.dayCount >= 1,
  },
  {
    id: 'warrior',
    name: 'Guerrier',
    icon: '⚔️',
    isUnlocked: (s) => s.combatsWon >= 3,
  },
  {
    id: 'fighter',
    name: 'Combattant',
    icon: '💪',
    isUnlocked: (s) => s.combatsWon >= 1,
  },
  {
    id: 'master',
    name: 'Maître',
    icon: '🛡️',
    isUnlocked: (s) => s.level >= 5,
  },
  {
    id: 'legend',
    name: 'Légende',
    icon: '👑',
    isUnlocked: (s) => s.xp >= 2000,
  },
  {
    id: 'thrifty',
    name: 'Économe',
    icon: '💰',
    isUnlocked: (s) => s.moneySaved >= 50,
  },
]
