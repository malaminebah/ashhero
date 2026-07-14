import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  applyBossRegenHp,
  bossRegenHealAmount,
  shouldTriggerBossRegen,
} from './bossRegen'

describe('shouldTriggerBossRegen', () => {
  const plan = { triggerTurn: 2, amount: 14 }

  it(`
    Given no regen plan was rolled for this combat
    When the trigger is checked
    Then the regen does not fire
  `, () => {
    const noPlan = null

    const triggers = shouldTriggerBossRegen(noPlan, false, 2, 40, 78)

    expect(triggers).toBe(false)
  })

  it(`
    Given the regen was already used this combat
    When the trigger is checked
    Then the regen does not fire again
  `, () => {
    const alreadyUsed = true

    const triggers = shouldTriggerBossRegen(plan, alreadyUsed, 2, 40, 78)

    expect(triggers).toBe(false)
  })

  it(`
    Given the current turn is not the planned trigger turn
    When the trigger is checked
    Then the regen does not fire
  `, () => {
    const wrongTurn = 3

    const triggers = shouldTriggerBossRegen(plan, false, wrongTurn, 40, 78)

    expect(triggers).toBe(false)
  })

  it(`
    Given the boss is at full HP on the trigger turn
    When the trigger is checked
    Then the regen does not fire
  `, () => {
    const fullHp = 78

    const triggers = shouldTriggerBossRegen(plan, false, 2, fullHp, 78)

    expect(triggers).toBe(false)
  })

  it(`
    Given a hurt boss on the planned trigger turn
    When the trigger is checked
    Then the regen fires
  `, () => {
    const hurtHp = 40

    const triggers = shouldTriggerBossRegen(plan, false, 2, hurtHp, 78)

    expect(triggers).toBe(true)
  })
})

describe('applyBossRegenHp', () => {
  it(`
    Given a heal that would overflow max HP
    When the regen is applied
    Then HP is capped at max
  `, () => {
    const currentHp = 70

    const healedHp = applyBossRegenHp(currentHp, 18, 78)

    expect(healedHp).toBe(78)
  })

  it(`
    Given enough room below max HP
    When the regen is applied
    Then the full amount is added
  `, () => {
    const currentHp = 40

    const healedHp = applyBossRegenHp(currentHp, 14, 78)

    expect(healedHp).toBe(54)
  })
})

describe('bossRegenHealAmount', () => {
  it(`
    Given a heal capped by max HP
    When the healed amount is computed
    Then only the actual healed points are reported
  `, () => {
    const currentHp = 70

    const healed = bossRegenHealAmount(currentHp, 18, 78)

    expect(healed).toBe(8)
  })

  it(`
    Given a heal with room below max HP
    When the healed amount is computed
    Then the planned amount is reported
  `, () => {
    const currentHp = 40

    const healed = bossRegenHealAmount(currentHp, 14, 78)

    expect(healed).toBe(14)
  })
})

describe('rollBossRegenPlan', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it(`
    Given the combat chance roll fails
    When a regen plan is rolled
    Then no plan is returned
  `, async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.99)
    const { rollBossRegenPlan } = await import('../constants')

    const plan = rollBossRegenPlan()

    expect(plan).toBeNull()
  })

  it(`
    Given the combat chance roll succeeds with minimum rolls
    When a regen plan is rolled
    Then the plan triggers on turn 2 with the minimum amount
  `, async () => {
    vi.spyOn(Math, 'random')
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
    const { rollBossRegenPlan, BOSS_REGEN_MIN_HP } = await import('../constants')

    const plan = rollBossRegenPlan()

    expect(plan).toEqual({ triggerTurn: 2, amount: BOSS_REGEN_MIN_HP })
  })
})
