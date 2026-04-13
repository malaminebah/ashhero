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

/** Six badges — unlock rules from store stats only (YAGNI; no Firestore here). */
export const PROFILE_BADGES: ProfileBadgeDef[] = [
  {
    id: 'first',
    name: 'First day',
    icon: '🌱',
    isUnlocked: (s) => s.dayCount >= 1,
  },
  {
    id: 'warrior',
    name: 'Warrior',
    icon: '⚔️',
    isUnlocked: (s) => s.combatsWon >= 3,
  },
  {
    id: 'fighter',
    name: 'Fighter',
    icon: '💪',
    isUnlocked: (s) => s.combatsWon >= 1,
  },
  {
    id: 'master',
    name: 'Master',
    icon: '🛡️',
    isUnlocked: (s) => s.level >= 5,
  },
  {
    id: 'legend',
    name: 'Legend',
    icon: '👑',
    isUnlocked: (s) => s.xp >= 2000,
  },
  {
    id: 'thrifty',
    name: 'Thrifty',
    icon: '💰',
    isUnlocked: (s) => s.moneySaved >= 50,
  },
]
