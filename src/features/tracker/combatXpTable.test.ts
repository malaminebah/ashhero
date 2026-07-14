import { describe, expect, it } from 'vitest'
import { SPECIAL_CHARGE_XP } from './utils/levelProgress'
import { COMBAT_XP_BY_ACTION } from './combatXpTable'

describe('COMBAT_XP_BY_ACTION', () => {
  it(`
    Given every combat action
    When its XP reward is read
    Then each action grants XP
  `, () => {
    const rewards = Object.values(COMBAT_XP_BY_ACTION)

    const allGrantXp = rewards.every((xp) => xp > 0)

    expect(allGrantXp).toBe(true)
  })

  it(`
    Given the special attack costs a full charge
    When its reward is compared to the others
    Then special grants the highest XP
  `, () => {
    const { breathe, water, distract, special } = COMBAT_XP_BY_ACTION

    const specialIsHighest = [breathe, water, distract].every((xp) => special > xp)

    expect(specialIsHighest).toBe(true)
  })

  it(`
    Given every action reward
    When it is compared to a special charge
    Then no single action fills a full charge at once
  `, () => {
    const rewards = Object.values(COMBAT_XP_BY_ACTION)

    const noneFillsACharge = rewards.every((xp) => xp < SPECIAL_CHARGE_XP)

    expect(noneFillsACharge).toBe(true)
  })
})
