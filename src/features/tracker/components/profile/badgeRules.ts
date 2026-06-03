import type { SmokingType } from '@/src/features/onboarding/types'
import type { ProfileBadgeAssetKey } from './profileBadgeAssets'

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
  asset: ProfileBadgeAssetKey
  isUnlocked: (s: ProfileBadgeStats) => boolean
}

export const PROFILE_BADGES: ProfileBadgeDef[] = [
  { id: 'jour1', name: 'Jour 1', asset: 'b01', isUnlocked: (s) => s.dayCount >= 1 },
  { id: 'jours3', name: '3 jours', asset: 'b02', isUnlocked: (s) => s.dayCount >= 3 },
  { id: 'sem1', name: '1 sem.', asset: 'b03', isUnlocked: (s) => s.dayCount >= 7 },
  { id: 'sem2', name: '2 sem.', asset: 'b04', isUnlocked: (s) => s.dayCount >= 14 },
  { id: 'mois1', name: '1 mois', asset: 'b05', isUnlocked: (s) => s.dayCount >= 30 },
  { id: 'combat1', name: '1 combat', asset: 'b06', isUnlocked: (s) => s.combatsWon >= 1 },
  { id: 'combat3', name: '3 combats', asset: 'b07', isUnlocked: (s) => s.combatsWon >= 3 },
  { id: 'combat10', name: '10 combats', asset: 'b08', isUnlocked: (s) => s.combatsWon >= 10 },
  { id: 'niv3', name: 'Niv. 3', asset: 'b09', isUnlocked: (s) => s.level >= 3 },
  { id: 'niv5', name: 'Niv. 5', asset: 'b10', isUnlocked: (s) => s.level >= 5 },
  { id: 'niv10', name: 'Niv. 10', asset: 'b11', isUnlocked: (s) => s.level >= 10 },
  { id: 'xp500', name: '500 XP', asset: 'b12', isUnlocked: (s) => s.xp >= 500 },
  { id: 'xp2000', name: '2000 XP', asset: 'b13', isUnlocked: (s) => s.xp >= 2000 },
  { id: 'eco50', name: '50 €', asset: 'b14', isUnlocked: (s) => s.moneySaved >= 50 },
  { id: 'eco200', name: '200 €', asset: 'b15', isUnlocked: (s) => s.moneySaved >= 200 },
]
