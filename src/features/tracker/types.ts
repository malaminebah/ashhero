import { SmokingType } from '../onboarding/types'
import type { ProfileBadgeStats } from './components/profile/badgeRules'

export type CombatAction = 'breathe' | 'water' | 'distract' | 'special'

export type CombatResult = 'victory' | 'defeat'

export type CombatState = {
  isActive: boolean
  selectedAction: CombatAction | null
  result: CombatResult | null
}

export type TrackerConfig = {
  smokingType: SmokingType | null,
  quantityPerDay: number | null,
  pricePerUnit: number |  null,
  vapeBottleVolumeMl: number | null,
  vapeBottlePriceEuro: number | null,
  vapeMlPerWeek: number | null,
  quitDate: Date | null,
  isFirstTime: boolean | null,
  unlockedEtapes: string[] ,
  relapseCount: number | null,
  bestStreak: number | null,
  xp: number,
  level: number,
  combatsWon: number,
  combatsLost: number,
  heroName: string | null,
}


export type TrackerActions = {
  initialize: (config: TrackerConfig) => void
  unlockEtape: (label: string) => void ,
  reset: () => void
  relapse: (currentDayCount: number) => void
  winCombat: (action: CombatAction, xpGained: number) => void
  loseCombat: () => void
  setHeroName: (name: string) => void
}

export type Etape = {
  hours: number
  label: string
  title: string
  xp: number
}

export type TrackerStore = TrackerConfig & TrackerActions

/** Maps store state to a plain `TrackerConfig` for Firestore (strips Zustand actions). */
export type PlayerHeroVariant = 'dashboard' | 'profile' | 'combat'

export type PlayerHeroEmojiParams = {
  level: number
  variant?: PlayerHeroVariant
}

export type DashboardHeaderParams = { level: number }
export type DashboardHeroParams = { dayCount: number; level: number }
export type DashboardXpBarParams = { totalXp: number }
export type DashboardStatsPairParams = {
  moneySaved: number
  avoidedCount: number
  avoidedTitle: string
  avoidedSubtitle: string
}
export type DashboardJalonsGridParams = { hoursSinceQuit: number }
export type DashboardDefenseBadgesParams = { dayCount: number }

export type EtapeBarParams = {
  currentEtape: Etape | null
  nextEtape: Etape | null
  percentageComplete: number
}

export type EtapeListParams = {
  currentEtape: Etape | null
  nextEtape: Etape | null
}

export type ProfileHeroCardHandle = { focusName: () => void }

export type ProfileHeroCardParams = {
  level: number
  heroName: string | null
  onSaveName: (name: string) => void
}

export type ProfileHeaderParams = { onEditPress?: () => void }
export type ProfileProgressPairParams = { level: number; xp: number }
export type ProfileLevelsGridParams = { level: number; xp: number }
export type LevelTierIconParams = { level: number; size?: number; unlocked?: boolean }
export type LevelStepRowParams = {
  stepLevel: number
  xpRequired: number
  userLevel: number
}
export type ProfileAvatarsSectionParams = { level: number }
export type ProfileHistorySectionParams = { combatsWon: number }

export type ProfileStatsGridParams = {
  dayCount: number
  moneySaved: number
  avoidedCount: number
  avoidedLabel: string
  combatsWon: number
  combatsLost: number
  relapseCount: number
}

export type ProfileBadgesGridParams = {
  stats: ProfileBadgeStats
}

export const trackerProfileFromStore = (s: TrackerStore): TrackerConfig => ({
  smokingType: s.smokingType,
  quantityPerDay: s.quantityPerDay,
  pricePerUnit: s.pricePerUnit,
  vapeBottleVolumeMl: s.vapeBottleVolumeMl,
  vapeBottlePriceEuro: s.vapeBottlePriceEuro,
  vapeMlPerWeek: s.vapeMlPerWeek,
  quitDate: s.quitDate,
  isFirstTime: s.isFirstTime,
  unlockedEtapes: s.unlockedEtapes,
  relapseCount: s.relapseCount,
  bestStreak: s.bestStreak,
  xp: s.xp,
  level: s.level,
  combatsWon: s.combatsWon,
  combatsLost: s.combatsLost,
  heroName: s.heroName,
})
