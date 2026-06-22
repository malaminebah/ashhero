import { describe, expect, it } from 'vitest'
import { COMBAT_XP_BY_ACTION } from './combatXpTable'

describe('COMBAT_XP_BY_ACTION', () => {
  it(`
    Given action breathe
    When XP is read from the table
    Then reward is 25
  `, () => {
    expect(COMBAT_XP_BY_ACTION.breathe).toBe(25)
  })

  it(`
    Given action water
    When XP is read from the table
    Then reward is 20
  `, () => {
    expect(COMBAT_XP_BY_ACTION.water).toBe(20)
  })

  it(`
    Given action distract
    When XP is read from the table
    Then reward is 12
  `, () => {
    expect(COMBAT_XP_BY_ACTION.distract).toBe(12)
  })

  it(`
    Given action special
    When XP is read from the table
    Then reward is 40
  `, () => {
    expect(COMBAT_XP_BY_ACTION.special).toBe(40)
  })
})
