import type { SmokingType } from '@/src/features/onboarding/types'
import type { GameIconName } from '@/components/ui/game-icon'
import type { HexBadgeTint } from '@/components/ui/hex-badge'

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
  icon: GameIconName
  tint: HexBadgeTint
  /** Unlock condition shown on the badge detail card. */
  requirement: string
  isUnlocked: (s: ProfileBadgeStats) => boolean
}

export const PROFILE_BADGES: ProfileBadgeDef[] = [
  { id: 'jour1', name: 'Jour 1', icon: 'star', tint: 'green', requirement: '1 jour sans vape', isUnlocked: (s) => s.dayCount >= 1 },
  { id: 'jours3', name: '3 jours', icon: 'flame', tint: 'green', requirement: '3 jours sans vape', isUnlocked: (s) => s.dayCount >= 3 },
  { id: 'sem1', name: '1 sem.', icon: 'calendar', tint: 'green', requirement: '7 jours sans vape', isUnlocked: (s) => s.dayCount >= 7 },
  { id: 'sem2', name: '2 sem.', icon: 'hourglass', tint: 'green', requirement: '14 jours sans vape', isUnlocked: (s) => s.dayCount >= 14 },
  { id: 'mois1', name: '1 mois', icon: 'trophy', tint: 'green', requirement: '30 jours sans vape', isUnlocked: (s) => s.dayCount >= 30 },
  { id: 'combat1', name: '1 combat', icon: 'sword', tint: 'violet', requirement: 'Gagner 1 combat', isUnlocked: (s) => s.combatsWon >= 1 },
  { id: 'combat3', name: '3 combats', icon: 'swords', tint: 'violet', requirement: 'Gagner 3 combats', isUnlocked: (s) => s.combatsWon >= 3 },
  { id: 'combat10', name: '10 combats', icon: 'helmet', tint: 'violet', requirement: 'Gagner 10 combats', isUnlocked: (s) => s.combatsWon >= 10 },
  { id: 'niv3', name: 'Niv. 3', icon: 'medal', tint: 'gold', requirement: 'Atteindre le niveau 3', isUnlocked: (s) => s.level >= 3 },
  { id: 'niv5', name: 'Niv. 5', icon: 'flag', tint: 'gold', requirement: 'Atteindre le niveau 5', isUnlocked: (s) => s.level >= 5 },
  { id: 'niv10', name: 'Niv. 10', icon: 'crown', tint: 'gold', requirement: 'Atteindre le niveau 10', isUnlocked: (s) => s.level >= 10 },
  { id: 'xp500', name: '500 XP', icon: 'bolt', tint: 'blue', requirement: 'Cumuler 500 XP', isUnlocked: (s) => s.xp >= 500 },
  { id: 'xp2000', name: '2000 XP', icon: 'gem', tint: 'blue', requirement: 'Cumuler 2000 XP', isUnlocked: (s) => s.xp >= 2000 },
  { id: 'eco50', name: '50 €', icon: 'coin', tint: 'gold', requirement: 'Économiser 50 €', isUnlocked: (s) => s.moneySaved >= 50 },
  { id: 'eco200', name: '200 €', icon: 'moneybag', tint: 'gold', requirement: 'Économiser 200 €', isUnlocked: (s) => s.moneySaved >= 200 },
]
