import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { PremiumPlanId } from './types'

type PremiumState = {
  isPremium: boolean
  plan: PremiumPlanId | null
}

type PremiumActions = {
  activate: (plan: PremiumPlanId) => void
  deactivate: () => void
}

export const usePremiumStore = create<PremiumState & PremiumActions>()(
  persist(
    (set) => ({
      isPremium: false,
      plan: null,
      activate: (plan) => set({ isPremium: true, plan }),
      deactivate: () => set({ isPremium: false, plan: null }),
    }),
    {
      name: 'ashhero-premium',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
