import { describe, expect, it } from 'vitest'
import {
  canUseSpecialAttack,
  levelFromXp,
  MAX_PROFILE_LEVEL,
  SPECIAL_CHARGE_XP,
  specialChargesAvailable,
  specialMeterState,
  XP_PER_LEVEL,
  xpForLevel,
  xpProgressInLevel,
} from './levelProgress'

describe('levelFromXp', () => {
  it(`
    Given zero XP
    When the level is computed
    Then the player starts at level 1
  `, () => {
    const xp = 0

    const level = levelFromXp(xp)

    expect(level).toBe(1)
  })

  it(`
    Given one XP below the first level cap
    When the level is computed
    Then the player is still level 1
  `, () => {
    const xp = XP_PER_LEVEL - 1

    const level = levelFromXp(xp)

    expect(level).toBe(1)
  })

  it(`
    Given exactly one level worth of XP
    When the level is computed
    Then the player reaches level 2
  `, () => {
    const xp = XP_PER_LEVEL

    const level = levelFromXp(xp)

    expect(level).toBe(2)
  })

  it(`
    Given the XP required for the max profile level
    When the level is computed
    Then the max level is reached
  `, () => {
    const xp = xpForLevel(MAX_PROFILE_LEVEL)

    const level = levelFromXp(xp)

    expect(level).toBe(MAX_PROFILE_LEVEL)
  })
})

describe('xpProgressInLevel', () => {
  it(`
    Given zero XP
    When level progress is computed
    Then the segment is empty and the next cap is one level away
  `, () => {
    const xp = 0

    const progress = xpProgressInLevel(xp)

    expect(progress).toEqual({ inSegment: 0, nextCap: XP_PER_LEVEL, pct: 0 })
  })

  it(`
    Given XP halfway through a level
    When level progress is computed
    Then the bar shows 50 percent
  `, () => {
    const xp = XP_PER_LEVEL + XP_PER_LEVEL / 2

    const progress = xpProgressInLevel(xp)

    expect(progress.pct).toBe(50)
  })

  it(`
    Given XP exactly on a level boundary
    When level progress is computed
    Then the new segment starts empty
  `, () => {
    const xp = XP_PER_LEVEL

    const progress = xpProgressInLevel(xp)

    expect(progress.inSegment).toBe(0)
    expect(progress.nextCap).toBe(XP_PER_LEVEL * 2)
  })
})

describe('specialChargesAvailable', () => {
  it(`
    Given 80 XP carried over and 20 XP gained in session
    When charges are computed
    Then one special charge is available
  `, () => {
    const xpStart = 80
    const sessionXp = 20

    const charges = specialChargesAvailable(xpStart, sessionXp, 0)

    expect(charges).toBe(1)
  })

  it(`
    Given the only charge was already spent
    When charges are computed
    Then no charge remains
  `, () => {
    const specialsUsed = 1

    const charges = specialChargesAvailable(80, 20, specialsUsed)

    expect(charges).toBe(0)
  })

  it(`
    Given session XP just below then exactly at the charge cost
    When the special availability is checked
    Then the special unlocks exactly at the threshold
  `, () => {
    const justBelow = SPECIAL_CHARGE_XP - 1
    const exact = SPECIAL_CHARGE_XP

    const lockedBefore = canUseSpecialAttack(0, justBelow, 0)
    const unlockedAt = canUseSpecialAttack(0, exact, 0)

    expect(lockedBefore).toBe(false)
    expect(unlockedAt).toBe(true)
  })

  it(`
    Given a long session earning several charge units
    When charges are computed
    Then multiple charges accumulate minus those spent
  `, () => {
    const sessionXp = SPECIAL_CHARGE_XP * 3
    const specialsUsed = 1

    const charges = specialChargesAvailable(0, sessionXp, specialsUsed)

    expect(charges).toBe(2)
  })
})

describe('specialMeterState', () => {
  it(`
    Given enough XP for a charge
    When the meter is read
    Then the bar is full and ready
  `, () => {
    const xpStart = 80
    const sessionXp = 20

    const meter = specialMeterState(xpStart, sessionXp, 0)

    expect(meter).toEqual({ pct: 100, ready: true, inSegment: SPECIAL_CHARGE_XP })
  })

  it(`
    Given the charge was just spent
    When the meter is read
    Then the bar resets to empty
  `, () => {
    const specialsUsed = 1

    const meter = specialMeterState(80, 20, specialsUsed)

    expect(meter).toEqual({ pct: 0, ready: false, inSegment: 0 })
  })

  it(`
    Given partial progress toward the next charge
    When the meter is read
    Then the bar shows the partial percentage
  `, () => {
    const xpStart = 50
    const sessionXp = 30

    const meter = specialMeterState(xpStart, sessionXp, 0)

    expect(meter).toEqual({ pct: 80, ready: false, inSegment: 80 })
  })
})
