import { SmokingType } from "../onboarding/types"

export type TrackerConfig = {
  smokingType: SmokingType | null,
  quantityPerDay: number | null,
  pricePerUnit: number |  null,
  quitDate: Date | null,
  isFirstTime: boolean | null,
  unlockedEtapes: string[] ,
}


export type TrackerActions = {
  initialize: (config: TrackerConfig) => void
  unlockEtape: (label: string) => void ,
  reset: () => void
}

export type Etape = {
  hours: number
  label: string
  title: string
  xp: number
}

export type TrackerStore = TrackerConfig & TrackerActions
