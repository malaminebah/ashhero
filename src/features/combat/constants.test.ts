import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  combatActionLabel,
  DAMAGE_TO_BOSS,
  rollBossRiposteDamage,
} from './constants'

describe('rollBossRiposteDamage', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it(`
    Given Math.random returns 0
    When rollBossRiposteDamage is called
    Then the minimum damage 7 is returned
  `, () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)

    const damage = rollBossRiposteDamage()

    expect(damage).toBe(7)
  })

  it(`
    Given Math.random returns just below 1
    When rollBossRiposteDamage is called
    Then the maximum damage 15 is returned
  `, () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.999999)

    const damage = rollBossRiposteDamage()

    expect(damage).toBe(15)
  })

  it(`
    Given Math.random returns 0.5
    When rollBossRiposteDamage is called
    Then damage 11 is returned
  `, () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5)

    const damage = rollBossRiposteDamage()

    expect(damage).toBe(11)
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
    Given action breathe
    When damage is read from the table
    Then boss damage is 35
  `, () => {
    expect(DAMAGE_TO_BOSS.breathe).toBe(35)
  })

  it(`
    Given action water
    When damage is read from the table
    Then boss damage is 13
  `, () => {
    expect(DAMAGE_TO_BOSS.water).toBe(13)
  })

  it(`
    Given action distract
    When damage is read from the table
    Then boss damage is 17
  `, () => {
    expect(DAMAGE_TO_BOSS.distract).toBe(17)
  })

  it(`
    Given action special
    When damage is read from the table
    Then boss damage is 70
  `, () => {
    expect(DAMAGE_TO_BOSS.special).toBe(70)
  })
})
