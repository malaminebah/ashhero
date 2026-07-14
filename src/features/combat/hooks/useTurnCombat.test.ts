// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  BREATHE_RESULT,
  CRAVING_TIERS,
  DAMAGE_TO_BOSS,
  COUNTER_BONUS_XP,
  WATER_HEAL,
} from '../constants'
import { COMBAT_XP_BY_ACTION } from '@/src/features/tracker/combatXpTable'
import type { CravingTier } from '../types'
import { useTurnCombat } from './useTurnCombat'

const SOFT_BOSS_HP = CRAVING_TIERS.soft.bossHp

const { handleVictoryMock, handleDefeatMock } = vi.hoisted(() => ({
  handleVictoryMock: vi.fn().mockResolvedValue(undefined),
  handleDefeatMock: vi.fn().mockResolvedValue(undefined),
}))

vi.mock('@/src/features/tracker/hooks/useCombat', () => ({
  useCombat: () => ({ handleVictory: handleVictoryMock, handleDefeat: handleDefeatMock }),
}))

vi.mock('@/src/features/tracker/store', () => ({
  useTrackerStore: { getState: () => ({ xp: 0 }) },
}))

vi.mock('expo-haptics', () => ({
  impactAsync: vi.fn().mockResolvedValue(undefined),
  notificationAsync: vi.fn().mockResolvedValue(undefined),
  ImpactFeedbackStyle: { Light: 'light', Medium: 'medium', Heavy: 'heavy' },
  NotificationFeedbackType: { Success: 'success', Warning: 'warning' },
}))

/**
 * Math.random pinned to 0.99 → no boss regen plan, telegraphed attack is
 * always 'Odeur de fumer' (countered by water), deterministic riposte roll.
 */
const PINNED_RANDOM = 0.99

const mountCombat = (playerMaxHp = 100, tier: CravingTier = 'soft') =>
  renderHook(() => useTurnCombat({ enabled: true, playerMaxHp, tier }))

const advance = (ms: number) => act(async () => vi.advanceTimersByTimeAsync(ms))

/** Intro (entering + boss slide-in) comfortably elapsed. */
const waitIntro = () => advance(2500)

/**
 * One full combat beat (attack anim + windup + riposte + handoffs + celebrate).
 * Split into chunks: timers scheduled inside React state updaters only exist
 * after the next act() flush, so a single long advance would miss them.
 */
const waitFullTurn = async () => {
  await advance(1500)
  await advance(1500)
  await advance(1500)
  await advance(1500)
}

describe('useTurnCombat', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.spyOn(Math, 'random').mockReturnValue(PINNED_RANDOM)
    handleVictoryMock.mockClear()
    handleDefeatMock.mockClear()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it(`
    Given a freshly enabled combat
    When the intro finishes
    Then the player turn starts against a full-HP soft boss with a telegraphed attack
  `, async () => {
    const { result } = mountCombat()

    await waitIntro()

    expect(result.current.phase).toBe('player_turn')
    expect(result.current.bossHp).toBe(SOFT_BOSS_HP)
    expect(result.current.bossMaxHp).toBe(SOFT_BOSS_HP)
    expect(result.current.nextBossAttack).toBe('Odeur de fumer')
    expect(result.current.turnCount).toBe(1)
  })

  it(`
    Given the combat intro is still playing
    When the player tries to act early
    Then the action is ignored and the boss keeps full HP
  `, () => {
    const { result } = mountCombat()

    act(() => result.current.chooseInstantAction('water'))

    expect(result.current.phase).toBe('entering')
    expect(result.current.bossHp).toBe(SOFT_BOSS_HP)
  })

  it(`
    Given the player picks an action that does not counter the telegraphed attack
    When the turn fully resolves
    Then the boss takes the hit, the riposte lands and turn 2 starts
  `, async () => {
    const { result } = mountCombat()
    await waitIntro()

    act(() => result.current.chooseInstantAction('distract'))
    await waitFullTurn()

    expect(result.current.bossHp).toBe(SOFT_BOSS_HP - DAMAGE_TO_BOSS.distract)
    expect(result.current.playerHp).toBeLessThan(result.current.playerMaxHp)
    expect(result.current.phase).toBe('player_turn')
    expect(result.current.turnCount).toBe(2)
  })

  it(`
    Given the player picks the counter of the telegraphed attack
    When the turn fully resolves
    Then the riposte is negated and the counter XP bonus is granted
  `, async () => {
    const { result } = mountCombat()
    await waitIntro()

    act(() => result.current.chooseInstantAction('water'))
    await waitFullTurn()

    expect(result.current.playerHp).toBe(result.current.playerMaxHp)
    expect(result.current.sessionXp).toBe(COMBAT_XP_BY_ACTION.water + COUNTER_BONUS_XP)
    expect(result.current.phase).toBe('player_turn')
  })

  it(`
    Given a hurt player finishing the breathing exercise with a good grade
    When the breathe resolves
    Then the player heals by the good-grade amount and the boss takes the breathe damage
  `, async () => {
    const { result } = mountCombat()
    await waitIntro()
    act(() => result.current.chooseInstantAction('distract'))
    await waitFullTurn()
    const hurtHp = result.current.playerHp
    const bossHpBeforeBreathe = result.current.bossHp

    act(() => result.current.chooseBreathe())
    act(() => result.current.onBreatheComplete('good'))

    expect(result.current.playerHp).toBe(hurtHp + BREATHE_RESULT.good.heal)
    expect(result.current.bossHp).toBe(bossHpBeforeBreathe - BREATHE_RESULT.good.damage)
    expect(result.current.battleMessage).toEqual({
      kind: 'player_breathe',
      grade: 'good',
      damage: BREATHE_RESULT.good.damage,
      heal: BREATHE_RESULT.good.heal,
    })
  })

  it(`
    Given no special charge is available at combat start
    When the player tries the special attack
    Then the action is ignored
  `, async () => {
    const { result } = mountCombat()
    await waitIntro()

    act(() => result.current.chooseInstantAction('special'))

    expect(result.current.canUseSpecial).toBe(false)
    expect(result.current.phase).toBe('player_turn')
    expect(result.current.bossHp).toBe(SOFT_BOSS_HP)
  })

  it(`
    Given repeated distract attacks against the soft boss
    When the sixth hit brings the boss to zero
    Then the combat celebrates then finalizes the victory with the session XP
  `, async () => {
    const { result } = mountCombat()
    await waitIntro()
    const playTurn = async () => {
      act(() => result.current.chooseInstantAction('distract'))
      await waitFullTurn()
    }

    await playTurn()
    await playTurn()
    await playTurn()
    await playTurn()
    await playTurn()
    await playTurn()

    expect(result.current.phase).toBe('victory')
    expect(result.current.bossHp).toBe(0)
    expect(result.current.victoryAction).toBe('distract')
    expect(handleVictoryMock).toHaveBeenCalledWith(
      'distract',
      COMBAT_XP_BY_ACTION.distract * 6
    )
  })

  it(`
    Given the same combat mounted on a soft then a hard craving
    When the intros finish
    Then the hard boss has strictly more HP than the soft one
  `, async () => {
    const soft = mountCombat(100, 'soft')
    const hard = mountCombat(100, 'hard')

    await waitIntro()

    expect(hard.result.current.bossMaxHp).toBeGreaterThan(soft.result.current.bossMaxHp)
  })

  it(`
    Given a medium craving beaten with repeated distract attacks
    When the victory is finalized
    Then the tier victory bonus is added on top of the session XP
  `, async () => {
    const { result } = mountCombat(400, 'medium')
    await waitIntro()
    const playTurn = async () => {
      act(() => result.current.chooseInstantAction('distract'))
      await waitFullTurn()
    }

    const turnsToKill = Math.ceil(CRAVING_TIERS.medium.bossHp / DAMAGE_TO_BOSS.distract)
    for (let i = 0; i < turnsToKill; i += 1) {
      await playTurn()
    }

    expect(result.current.phase).toBe('victory')
    expect(handleVictoryMock).toHaveBeenCalledWith(
      'distract',
      COMBAT_XP_BY_ACTION.distract * turnsToKill + CRAVING_TIERS.medium.victoryBonusXp
    )
  })

  it(`
    Given a player hurt by two ripostes
    When they drink water on their next turn
    Then they recover the water heal, the boss only takes the splash damage and the water message shows
  `, async () => {
    const { result } = mountCombat()
    await waitIntro()
    act(() => result.current.chooseInstantAction('distract'))
    await waitFullTurn()
    act(() => result.current.chooseInstantAction('distract'))
    await waitFullTurn()
    const hurtHp = result.current.playerHp
    const bossHpBefore = result.current.bossHp

    act(() => result.current.chooseInstantAction('water'))

    expect(hurtHp).toBeLessThan(result.current.playerMaxHp - WATER_HEAL)
    expect(result.current.playerHp).toBe(hurtHp + WATER_HEAL)
    expect(result.current.bossHp).toBe(bossHpBefore - DAMAGE_TO_BOSS.water)
    expect(result.current.battleMessage).toEqual({
      kind: 'player_water',
      damage: DAMAGE_TO_BOSS.water,
      heal: WATER_HEAL,
    })
  })

  it(`
    Given the crit roll succeeds on a distract attack
    When the hit resolves
    Then the boss takes more than the base damage and the message is flagged critical
  `, async () => {
    const { result } = mountCombat()
    await waitIntro()
    vi.spyOn(Math, 'random').mockReturnValue(0.01)

    act(() => result.current.chooseInstantAction('distract'))

    expect(result.current.bossHp).toBeLessThan(SOFT_BOSS_HP - DAMAGE_TO_BOSS.distract)
    expect(result.current.battleMessage).toMatchObject({ kind: 'player_hit', crit: true })
  })

  it(`
    Given the crit roll fails on a distract attack
    When the hit resolves
    Then the boss takes exactly the base damage and the message is not critical
  `, async () => {
    const { result } = mountCombat()
    await waitIntro()

    act(() => result.current.chooseInstantAction('distract'))

    expect(result.current.bossHp).toBe(SOFT_BOSS_HP - DAMAGE_TO_BOSS.distract)
    expect(result.current.battleMessage).toMatchObject({ kind: 'player_hit', crit: false })
  })

  it(`
    Given a fragile player whose HP cannot survive one riposte
    When the boss riposte lands
    Then the combat finalizes a defeat by riposte
  `, async () => {
    const fragileMaxHp = 15
    const { result } = mountCombat(fragileMaxHp)
    await waitIntro()

    act(() => result.current.chooseInstantAction('distract'))
    await waitFullTurn()

    expect(result.current.phase).toBe('defeat')
    expect(result.current.playerHp).toBe(0)
    expect(result.current.defeatSource).toBe('riposte')
    expect(handleDefeatMock).toHaveBeenCalledOnce()
  })

  it(`
    Given an ongoing player turn
    When the player abandons the combat
    Then the defeat is finalized with the abandon source
  `, async () => {
    const { result } = mountCombat()
    await waitIntro()

    await act(async () => result.current.abandon())

    expect(result.current.phase).toBe('defeat')
    expect(result.current.defeatSource).toBe('abandon')
    expect(handleDefeatMock).toHaveBeenCalledOnce()
  })
})
