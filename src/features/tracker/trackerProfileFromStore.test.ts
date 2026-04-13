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
    Given a full Zustand state (config + actions)
    When we extract the profile
    Then the object only has serializable fields with the same values as the store
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
    Given a store whose quitDate is null
    When we extract the profile
    Then quitDate stays null (no transform in the selector)
  `, () => {
    const profile = trackerProfileFromStore(makeStore({ quitDate: null }))
    expect(profile.quitDate).toBeNull()
  })
})
