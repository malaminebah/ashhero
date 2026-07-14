import { useTrackerStore } from '@/src/features/tracker/store'
import type { TrackerConfig } from '@/src/features/tracker/types'
import { getCurrentUid, saveProfile } from '@/src/services'
import { useSessionStore } from '@/src/features/auth/sessionStore'
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
    yearsUsing: o.yearsUsing,
    triggers: o.triggers,
    motivations: o.motivations,
    unlockedEtapes: [],
    relapseCount: 0,
    bestStreak: 0,
    xp: 0,
    level: 1,
    combatsWon: 0,
    combatsLost: 0,
    heroName: null,
  }
}

export const useOnboardingSubmit = () => {
  const initialize = useTrackerStore((s) => s.initialize)

  const submit = async (): Promise<boolean> => {
    const profile = trackerProfileFromOnboardingState()
    const uid = getCurrentUid()
    if (!uid) {
      console.warn('[onboarding] submit sans uid — session requise.')
      return false
    }
    try {
      await saveProfile(uid, profile)
      initialize(profile)
      useSessionStore.getState().setProfileResolved(true)
      return true
    } catch (e) {
      console.warn('[onboarding] saveProfile', e)
      return false
    }
  }

  return { submit }
}
