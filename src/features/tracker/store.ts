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
  bestStreak: 0,
  xp: 0,
  level: 1,
  combatsWon: 0,
  combatsLost: 0,
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
      winCombat: (_action, xpGained) =>
        set((state) => {
          const newXp = state.xp + xpGained
          const newLevel = Math.floor(newXp / 100) + 1
          return {
            xp: newXp,
            level: newLevel,
            combatsWon: state.combatsWon + 1,
          }
        }),
      loseCombat: () =>
        set((state) => ({
          combatsLost: state.combatsLost + 1,
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
        unlockedEtapes: state.unlockedEtapes,
        relapseCount: state.relapseCount,
        bestStreak: state.bestStreak,
        xp: state.xp,
        level: state.level,
        combatsWon: state.combatsWon,
        combatsLost: state.combatsLost,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return
        if (state.quitDate && typeof state.quitDate === 'string') {
          state.quitDate = new Date(state.quitDate)
        }
        if (typeof state.xp !== 'number') state.xp = 0
        if (typeof state.level !== 'number') state.level = 1
        if (typeof state.combatsWon !== 'number') state.combatsWon = 0
        if (typeof state.combatsLost !== 'number') state.combatsLost = 0
      },
    }
  )
)
