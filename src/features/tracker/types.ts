import { SmokingType } from "../onboarding/types"

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
}


export type TrackerActions = {
  initialize: (config: TrackerConfig) => void
  unlockEtape: (label: string) => void ,
  reset: () => void
  relapse: (currentDayCount: number) => void
  winCombat: (action: CombatAction, xpGained: number) => void
  loseCombat: () => void
}

export type Etape = {
  hours: number
  label: string
  title: string
  xp: number
}

export type TrackerStore = TrackerConfig & TrackerActions

/** Extrait un `TrackerConfig` pur pour Firestore (sans les actions Zustand). */
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
})
