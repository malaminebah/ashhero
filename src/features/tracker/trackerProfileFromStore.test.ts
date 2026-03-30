import { describe, expect, it, vi } from 'vitest'
import { trackerProfileFromStore, type TrackerStore } from './types'

const noop = vi.fn()

function makeStore(overrides: Partial<TrackerStore> = {}): TrackerStore {
  return {
    smokingType: 'vape',
    quantityPerDay: 12,
    pricePerUnit: 1,
    vapeBottleVolumeMl: null,
    vapeBottlePriceEuro: null,
    vapeMlPerWeek: null,
    quitDate: new Date('2026-01-01'),
    isFirstTime: false,
    unlockedEtapes: ['24hours'],
    relapseCount: 0,
    bestStreak: 3,
    xp: 250,
    level: 3,
    combatsWon: 5,
    combatsLost: 1,
    initialize: noop,
    unlockEtape: noop,
    reset: noop,
    relapse: noop,
    winCombat: noop,
    loseCombat: noop,
    ...overrides,
  }
}

describe('trackerProfileFromStore', () => {
  it(`
    Given un état Zustand complet (config + actions)
    When on extrait le profil
    Then l'objet ne contient que les champs sérialisables et les mêmes valeurs que le store
  `, () => {
    const store = makeStore()
    const profile = trackerProfileFromStore(store)

    expect(profile).toEqual({
      smokingType: 'vape',
      quantityPerDay: 12,
      pricePerUnit: 1,
      vapeBottleVolumeMl: null,
      vapeBottlePriceEuro: null,
      vapeMlPerWeek: null,
      quitDate: store.quitDate,
      isFirstTime: false,
      unlockedEtapes: ['24hours'],
      relapseCount: 0,
      bestStreak: 3,
      xp: 250,
      level: 3,
      combatsWon: 5,
      combatsLost: 1,
    })
    expect(profile).not.toHaveProperty('initialize')
    expect(profile).not.toHaveProperty('winCombat')
  })

  it(`
    Given un store dont quitDate est null
    When on extrait le profil
    Then quitDate reste null (pas de transformation côté sélecteur)
  `, () => {
    const profile = trackerProfileFromStore(makeStore({ quitDate: null }))
    expect(profile.quitDate).toBeNull()
  })
})
