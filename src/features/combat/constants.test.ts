import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  BOSS_ATTACK_NAMES,
  BOSS_COUNTER_ACTION,
  BREATHE_RESULT,
  combatActionLabel,
  CRAVING_TIER_ORDER,
  CRAVING_TIERS,
  DAMAGE_TO_BOSS,
  rollBossRiposteDamage,
} from './constants'

describe('rollBossRiposteDamage', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it(`
    Given each craving tier and Math.random returns 0
    When rollBossRiposteDamage is called
    Then the tier minimum is returned
  `, () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)

    const damages = CRAVING_TIER_ORDER.map((tier) => rollBossRiposteDamage(tier))

    expect(damages).toEqual(CRAVING_TIER_ORDER.map((tier) => CRAVING_TIERS[tier].riposteMin))
  })

  it(`
    Given each craving tier and Math.random returns just below 1
    When rollBossRiposteDamage is called
    Then the tier maximum is returned (inclusive bound)
  `, () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.999999)

    const damages = CRAVING_TIER_ORDER.map((tier) => rollBossRiposteDamage(tier))

    expect(damages).toEqual(CRAVING_TIER_ORDER.map((tier) => CRAVING_TIERS[tier].riposteMax))
  })
})

describe('CRAVING_TIERS', () => {
  it(`
    Given the three craving tiers from soft to hard
    When their combat stats are compared
    Then every stat strictly escalates with the craving intensity
  `, () => {
    const [soft, medium, hard] = CRAVING_TIER_ORDER.map((tier) => CRAVING_TIERS[tier])

    const pairs = [
      [soft, medium],
      [medium, hard],
    ] as const

    const hpEscalates = pairs.every(([lower, higher]) => higher.bossHp > lower.bossHp)
    const riposteEscalates = pairs.every(
      ([lower, higher]) =>
        higher.riposteMin > lower.riposteMin && higher.riposteMax > lower.riposteMax
    )
    const sizeEscalates = pairs.every(([lower, higher]) => higher.bossScale > lower.bossScale)
    const rewardEscalates = pairs.every(
      ([lower, higher]) => higher.victoryBonusXp > lower.victoryBonusXp
    )
    expect(hpEscalates).toBe(true)
    expect(riposteEscalates).toBe(true)
    expect(sizeEscalates).toBe(true)
    expect(rewardEscalates).toBe(true)
  })
})

describe('BOSS_COUNTER_ACTION', () => {
  it(`
    Given every telegraphed boss attack
    When its counter is read
    Then a counter action exists and is never the special attack
  `, () => {
    const attacks = BOSS_ATTACK_NAMES

    const counters = attacks.map((name) => BOSS_COUNTER_ACTION[name])

    const allDefined = counters.every((counter) => counter != null)
    const noneIsSpecial = counters.every((counter) => counter !== 'special')
    expect(allDefined).toBe(true)
    expect(noneIsSpecial).toBe(true)
  })
})

describe('combatActionLabel', () => {
  it(`
    Given action breathe
    When combatActionLabel is called
    Then the French label Respirer is returned
  `, () => {
    const action = 'breathe' as const

    const label = combatActionLabel(action)

    expect(label).toBe('Respirer')
  })

  it(`
    Given action water
    When combatActionLabel is called
    Then the French label Boire de l'eau is returned
  `, () => {
    const action = 'water' as const

    const label = combatActionLabel(action)

    expect(label).toBe("Boire de l'eau")
  })

  it(`
    Given action distract
    When combatActionLabel is called
    Then the French label Se distraire is returned
  `, () => {
    const action = 'distract' as const

    const label = combatActionLabel(action)

    expect(label).toBe('Se distraire')
  })

  it(`
    Given action special
    When combatActionLabel is called
    Then the French label Attaque spéciale is returned
  `, () => {
    const action = 'special' as const

    const label = combatActionLabel(action)

    expect(label).toBe('Attaque spéciale')
  })
})

describe('DAMAGE_TO_BOSS', () => {
  it(`
    Given the damage table
    When action damages are compared
    Then every action deals damage and special outdamages all basic actions
  `, () => {
    const { breathe, water, distract, special } = DAMAGE_TO_BOSS

    const allDealDamage = [breathe, water, distract, special].every((damage) => damage > 0)
    const specialIsHighest = [breathe, water, distract].every((damage) => special > damage)

    expect(allDealDamage).toBe(true)
    expect(specialIsHighest).toBe(true)
  })

  it(`
    Given water and breathe are the utility actions
    When their damage is compared to the main attack
    Then both hit lighter than distract
  `, () => {
    const { breathe, water, distract } = DAMAGE_TO_BOSS

    expect(water).toBeLessThan(distract)
    expect(breathe).toBeLessThan(distract)
  })
})

describe('BREATHE_RESULT', () => {
  it(`
    Given breathing grades from perfect to off
    When heal and damage are read
    Then better precision always yields better results
  `, () => {
    const { perfect, good, off } = BREATHE_RESULT

    expect(perfect.heal).toBeGreaterThan(good.heal)
    expect(good.heal).toBeGreaterThan(off.heal)
    expect(perfect.damage).toBeGreaterThanOrEqual(good.damage)
    expect(good.damage).toBeGreaterThanOrEqual(off.damage)
  })
})
