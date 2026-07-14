import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  BOSS_ATTACK_NAMES,
  BOSS_COUNTER_ACTION,
  BREATHE_RESULT,
  bossMaxHpForLevel,
  COMBAT_BOSS_BASE_HP,
  combatActionLabel,
  DAMAGE_TO_BOSS,
  rollBossRiposteDamage,
} from './constants'

describe('rollBossRiposteDamage', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it(`
    Given level 1 and Math.random returns 0
    When rollBossRiposteDamage is called
    Then the minimum damage 12 is returned
  `, () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)

    const damage = rollBossRiposteDamage(1)

    expect(damage).toBe(12)
  })

  it(`
    Given level 1 and Math.random returns just below 1
    When rollBossRiposteDamage is called
    Then the maximum damage 20 is returned
  `, () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.999999)

    const damage = rollBossRiposteDamage(1)

    expect(damage).toBe(20)
  })

  it(`
    Given level 6 and Math.random returns 0
    When rollBossRiposteDamage is called
    Then the level tier adds +10 damage
  `, () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)

    const damage = rollBossRiposteDamage(6)

    expect(damage).toBe(22)
  })

  it(`
    Given a level above the scaling cap
    When rollBossRiposteDamage is called
    Then damage stays at the level 6 tier
  `, () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)

    const damage = rollBossRiposteDamage(10)

    expect(damage).toBe(22)
  })
})

describe('bossMaxHpForLevel', () => {
  it(`
    Given level 1
    When bossMaxHpForLevel is called
    Then the base HP is returned
  `, () => {
    const level = 1

    const maxHp = bossMaxHpForLevel(level)

    expect(maxHp).toBe(COMBAT_BOSS_BASE_HP)
  })

  it(`
    Given level 3
    When bossMaxHpForLevel is called
    Then HP grows by 13 per level
  `, () => {
    const level = 3

    const maxHp = bossMaxHpForLevel(level)

    expect(maxHp).toBe(COMBAT_BOSS_BASE_HP + 26)
  })

  it(`
    Given a level above the scaling cap
    When bossMaxHpForLevel is called
    Then HP stays at the level 7 cap
  `, () => {
    const level = 10

    const maxHp = bossMaxHpForLevel(level)

    expect(maxHp).toBe(COMBAT_BOSS_BASE_HP + 13 * 6)
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
    Given breathe is the healing action
    When its damage is compared to the DPS actions
    Then breathe deals the lightest hit
  `, () => {
    const { breathe, water, distract } = DAMAGE_TO_BOSS

    expect(breathe).toBeLessThan(water)
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
