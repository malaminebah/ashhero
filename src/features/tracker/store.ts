import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TrackerConfig, TrackerActions } from './types'

const initialState: TrackerConfig = {
  smokingType: null,
  quantityPerDay: null,
  pricePerUnit: null,
  quitDate: null,
  isFirstTime: null,
  unlockedEtapes: []
}

export const useTrackerStore = create<TrackerConfig & TrackerActions>()(
  persist(
    (set) => ({
      ...initialState,
      initialize: (data) => set({ ...data }),
      unlockEtape: (label) => set((state) => ({
        unlockedEtapes: [...state.unlockedEtapes, label]
      })),
      reset: () => set(initialState),
    }),
    {
      name: 'tracker-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        quitDate: state.quitDate?.toISOString() ?? null,
        quantityPerDay: state.quantityPerDay,
        pricePerUnit: state.pricePerUnit,
        smokingType: state.smokingType,
        isFirstTime: state.isFirstTime,
        unlockedEtapes: state.unlockedEtapes
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.quitDate && typeof state.quitDate === 'string') {
          state.quitDate = new Date(state.quitDate)
        }
      },
    }
  )
)
