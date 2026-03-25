import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TrackerConfig, TrackerActions, trackerProfileFromStore } from './types'
import { addRelapse, getCurrentUid, saveProfile } from '@/src/services'

const initialState: TrackerConfig = {
  smokingType: null,
  quantityPerDay: null,
  pricePerUnit: null,
  quitDate: null,
  isFirstTime: null,
  unlockedEtapes: [],
  relapseCount: 0,
  bestStreak: 0
  
}

export const useTrackerStore = create<TrackerConfig & TrackerActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      initialize: (data) => set({ ...data }),
      unlockEtape: (label) => set((state) => ({
        unlockedEtapes: [...state.unlockedEtapes, label]
      })),
      relapse: (currentDayCount) => {
        set((state) => ({
          relapseCount: (state.relapseCount ?? 0) + 1,
          bestStreak: Math.max(state.bestStreak ?? 0, currentDayCount),
          quitDate: new Date(),
          unlockedEtapes: [],
        }))
        const uid = getCurrentUid()
        if (!uid) {
          console.warn('[tracker] relapse: uid null, Firestore not called')
          return
        }
        void Promise.all([
          addRelapse(uid, currentDayCount),
          saveProfile(uid, trackerProfileFromStore(get())),
        ]).catch((err) => console.warn('[tracker] relapse sync', err))
      },
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
        unlockedEtapes: state.unlockedEtapes,
        relapseCount: state.relapseCount,
        bestStreak: state.bestStreak
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.quitDate && typeof state.quitDate === 'string') {
          state.quitDate = new Date(state.quitDate)
        }
      },
    }
  )
)
