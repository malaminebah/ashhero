// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useCombat } from './useCombat'

const {
  addCombatMock,
  saveProfileMock,
  getCurrentUidMock,
  winCombatMock,
  loseCombatMock,
  getStateMock,
} = vi.hoisted(() => ({
  addCombatMock: vi.fn().mockResolvedValue(undefined),
  saveProfileMock: vi.fn().mockResolvedValue(undefined),
  getCurrentUidMock: vi.fn().mockReturnValue('uid-1'),
  winCombatMock: vi.fn(),
  loseCombatMock: vi.fn(),
  getStateMock: vi.fn(),
}))

vi.mock('@/src/services', () => ({
  addCombat: addCombatMock,
  saveProfile: saveProfileMock,
  getCurrentUid: getCurrentUidMock,
}))

vi.mock('../store', () => ({
  useTrackerStore: Object.assign(
    (selector: (s: { winCombat: typeof winCombatMock; loseCombat: typeof loseCombatMock }) => unknown) =>
      selector({ winCombat: winCombatMock, loseCombat: loseCombatMock }),
    { getState: getStateMock }
  ),
}))

const baseState = {
  smokingType: 'vape' as const,
  quantityPerDay: 10,
  pricePerUnit: 1,
  vapeBottleVolumeMl: null,
  vapeBottlePriceEuro: null,
  vapeMlPerWeek: null,
  quitDate: new Date('2026-01-01'),
  isFirstTime: false,
  yearsUsing: 1,
  triggers: [] as string[],
  motivations: [] as string[],
  unlockedEtapes: [] as string[],
  relapseCount: 0,
  bestStreak: 0,
  xp: 100,
  level: 2,
  combatsWon: 3,
  combatsLost: 1,
  heroName: null,
  initialize: vi.fn(),
  unlockEtape: vi.fn(),
  reset: vi.fn(),
  relapse: vi.fn(),
  winCombat: winCombatMock,
  loseCombat: loseCombatMock,
  addXp: vi.fn(),
  setHeroName: vi.fn(),
}

describe('useCombat', () => {
  beforeEach(() => {
    getStateMock.mockReturnValue(baseState)
    getCurrentUidMock.mockReturnValue('uid-1')
    addCombatMock.mockResolvedValue(undefined)
    saveProfileMock.mockResolvedValue(undefined)
  })

  afterEach(() => {
    vi.restoreAllMocks()
    addCombatMock.mockReset().mockResolvedValue(undefined)
    saveProfileMock.mockReset().mockResolvedValue(undefined)
    winCombatMock.mockReset()
    loseCombatMock.mockReset()
  })

  it(`
    Given a signed-in user and Firestore succeeds
    When handleVictory runs
    Then combat is persisted before local XP is applied
  `, async () => {
    const order: string[] = []
    addCombatMock.mockImplementation(async () => {
      order.push('addCombat')
    })
    saveProfileMock.mockImplementation(async () => {
      order.push('saveProfile')
    })
    winCombatMock.mockImplementation(() => {
      order.push('winCombat')
    })

    const { result } = renderHook(() => useCombat())

    await act(async () => {
      await result.current.handleVictory('distract', 40)
    })

    expect(order).toEqual(['saveProfile', 'addCombat', 'winCombat'])
    expect(saveProfileMock).toHaveBeenCalledWith(
      'uid-1',
      expect.objectContaining({ xp: 140, combatsWon: 4 })
    )
  })

  it(`
    Given Firestore fails after a victory
    When handleVictory runs
    Then local XP is not applied and a persist error is thrown
  `, async () => {
    addCombatMock.mockRejectedValue(new Error('network'))

    const { result } = renderHook(() => useCombat())

    let thrown: unknown
    await act(async () => {
      try {
        await result.current.handleVictory('distract', 40)
      } catch (e) {
        thrown = e
      }
    })

    expect(thrown).toBeInstanceOf(Error)
    expect(winCombatMock).not.toHaveBeenCalled()
  })

  it(`
    Given Firestore fails after a defeat
    When handleDefeat runs
    Then local losses are not applied
  `, async () => {
    saveProfileMock.mockRejectedValue(new Error('offline'))

    const { result } = renderHook(() => useCombat())

    let thrown: unknown
    await act(async () => {
      try {
        await result.current.handleDefeat()
      } catch (e) {
        thrown = e
      }
    })

    expect(thrown).toBeInstanceOf(Error)
    expect(loseCombatMock).not.toHaveBeenCalled()
  })

  it(`
    Given there is no authenticated uid
    When handleVictory runs
    Then local XP is applied without calling Firestore
  `, async () => {
    getCurrentUidMock.mockReturnValue(null)

    const { result } = renderHook(() => useCombat())

    await act(async () => {
      await result.current.handleVictory('water', 20)
    })

    expect(winCombatMock).toHaveBeenCalledWith('water', 20)
    expect(addCombatMock).not.toHaveBeenCalled()
    expect(saveProfileMock).not.toHaveBeenCalled()
  })
})
