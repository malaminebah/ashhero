import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TrackerConfig, TrackerActions, trackerProfileFromStore } from './types'
import { normalizeHeroName } from './utils/heroName'
import { levelFromXp } from './utils/levelProgress'
import { addRelapse, getCurrentUid, saveProfile } from '@/src/services'

const initialState: TrackerConfig = {
  smokingType: null,
  quantityPerDay: null,
  pricePerUnit: null,
  vapeBottleVolumeMl: null,
  vapeBottlePriceEuro: null,
  vapeMlPerWeek: null,
  quitDate: null,
  isFirstTime: null,
  yearsUsing: null,
  triggers: [],
  motivations: [],
  unlockedEtapes: [],
  relapseCount: 0,
  bestStreak: 0,
  xp: 0,
  level: 1,
  combatsWon: 0,
  combatsLost: 0,
  heroName: null,
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
          const newLevel = levelFromXp(newXp)
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
      addXp: (amount) => {
        if (amount <= 0) return
        set((state) => {
          const newXp = state.xp + amount
          return { xp: newXp, level: levelFromXp(newXp) }
        })
        const uid = getCurrentUid()
        if (!uid) {
          console.warn('[tracker] addXp: uid null, Firestore not called')
          return
        }
        void saveProfile(uid, trackerProfileFromStore(get())).catch((err) =>
          console.warn('[tracker] addXp sync', err)
        )
      },
      setHeroName: (name) => {
        const heroName = normalizeHeroName(name)
        if (heroName === get().heroName) return
        set({ heroName })
        const uid = getCurrentUid()
        if (!uid) {
          console.warn('[tracker] setHeroName: uid null, Firestore not called')
          return
        }
        void saveProfile(uid, trackerProfileFromStore(get())).catch((err) =>
          console.warn('[tracker] setHeroName sync', err)
        )
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
        vapeBottleVolumeMl: state.vapeBottleVolumeMl,
        vapeBottlePriceEuro: state.vapeBottlePriceEuro,
        vapeMlPerWeek: state.vapeMlPerWeek,
        smokingType: state.smokingType,
        isFirstTime: state.isFirstTime,
        yearsUsing: state.yearsUsing,
        triggers: state.triggers,
        motivations: state.motivations,
        unlockedEtapes: state.unlockedEtapes,
        relapseCount: state.relapseCount,
        bestStreak: state.bestStreak,
        xp: state.xp,
        level: state.level,
        combatsWon: state.combatsWon,
        combatsLost: state.combatsLost,
        heroName: state.heroName,
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
        if (typeof state.heroName !== 'string') state.heroName = null
        else state.heroName = normalizeHeroName(state.heroName)
        if (typeof state.vapeBottleVolumeMl !== 'number') state.vapeBottleVolumeMl = null
        if (typeof state.vapeBottlePriceEuro !== 'number') state.vapeBottlePriceEuro = null
        if (typeof state.vapeMlPerWeek !== 'number') state.vapeMlPerWeek = null
        if (typeof state.yearsUsing !== 'number') state.yearsUsing = null
        if (!Array.isArray(state.triggers)) state.triggers = []
        if (!Array.isArray(state.motivations)) state.motivations = []
      },
    }
  )
)
