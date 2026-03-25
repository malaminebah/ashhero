import { SmokingType } from "../onboarding/types"

export type TrackerConfig = {
  smokingType: SmokingType | null,
  quantityPerDay: number | null,
  pricePerUnit: number |  null,
  quitDate: Date | null,
  isFirstTime: boolean | null,
  unlockedEtapes: string[] ,
  relapseCount: number | null,
  bestStreak: number | null
}


export type TrackerActions = {
  initialize: (config: TrackerConfig) => void
  unlockEtape: (label: string) => void ,
  reset: () => void
  relapse: (currentDayCount: number) => void
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
  quitDate: s.quitDate,
  isFirstTime: s.isFirstTime,
  unlockedEtapes: s.unlockedEtapes,
  relapseCount: s.relapseCount,
  bestStreak: s.bestStreak,
})
