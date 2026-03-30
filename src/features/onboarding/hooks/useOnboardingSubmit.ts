import { useTrackerStore } from '@/src/features/tracker/store'
import type { TrackerConfig } from '@/src/features/tracker/types'
import { getCurrentUid, saveProfile } from '@/src/services'
import { useOnboardingStore } from '../store'

function trackerProfileFromOnboardingState(): TrackerConfig {
  const o = useOnboardingStore.getState()
  return {
    smokingType: o.smokingType,
    quantityPerDay: o.quantityPerDay,
    pricePerUnit: o.pricePerUnit,
    vapeBottleVolumeMl: o.vapeBottleVolumeMl,
    vapeBottlePriceEuro: o.vapeBottlePriceEuro,
    vapeMlPerWeek: o.vapeMlPerWeek,
    quitDate: o.quitDate,
    isFirstTime: o.isFirstTime,
    unlockedEtapes: [],
    relapseCount: 0,
    bestStreak: 0,
    xp: 0,
    level: 1,
    combatsWon: 0,
    combatsLost: 0,
  }
}

export const useOnboardingSubmit = () => {
  const initialize = useTrackerStore((s) => s.initialize)

  const submit = async () => {
    const profile = trackerProfileFromOnboardingState()
    const uid = getCurrentUid()
    if (uid) {
      await saveProfile(uid, profile)
    }
    initialize(profile)
  }

  return { submit }
}
