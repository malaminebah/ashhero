import { describe, expect, it } from 'vitest'
import { COMBAT_XP_BY_ACTION } from './combatXpTable'

describe('COMBAT_XP_BY_ACTION', () => {
  it(`
    Given each combat action key
    When we read the XP table
    Then expected XP values match the product contract
  `, () => {
    expect(COMBAT_XP_BY_ACTION.breathe).toBe(20)
    expect(COMBAT_XP_BY_ACTION.water).toBe(15)
    expect(COMBAT_XP_BY_ACTION.distract).toBe(10)
    expect(COMBAT_XP_BY_ACTION.special).toBe(40)
  })
})
