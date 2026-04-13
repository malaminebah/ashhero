import { describe, expect, it } from 'vitest'
import { PROFILE_BADGES, type ProfileBadgeStats } from './badgeRules'

const base = (): ProfileBadgeStats => ({
  dayCount: 0,
  combatsWon: 0,
  xp: 0,
  level: 1,
  moneySaved: 0,
  smokingType: null,
})

function badge(id: string) {
  const b = PROFILE_BADGES.find((x) => x.id === id)
  if (!b) throw new Error(`badge ${id}`)
  return b
}

describe('PROFILE_BADGES (unlock rules)', () => {
  it(`
    Given 0 vape-free days and no wins
    When we evaluate "First Day"
    Then the badge stays locked
  `, () => {
    expect(badge('first').isUnlocked(base())).toBe(false)
  })

  it(`
    Given at least 1 vape-free day
    When we evaluate "First Day"
    Then the badge unlocks
  `, () => {
    expect(badge('first').isUnlocked({ ...base(), dayCount: 1 })).toBe(true)
  })

  it(`
    Given exactly 2 combat wins
    When we evaluate "Fighter" (threshold 1) and "Warrior" (threshold 3)
    Then Fighter unlocks, Warrior does not
  `, () => {
    const stats = { ...base(), combatsWon: 2 }
    expect(badge('fighter').isUnlocked(stats)).toBe(true)
    expect(badge('warrior').isUnlocked(stats)).toBe(false)
  })

  it(`
    Given level 5 and enough money saved
    When we evaluate "Master" and "Thrifty"
    Then both unlock
  `, () => {
    const stats = { ...base(), level: 5, moneySaved: 50 }
    expect(badge('master').isUnlocked(stats)).toBe(true)
    expect(badge('thrifty').isUnlocked(stats)).toBe(true)
  })

  it(`
    Given 1999 XP
    When we evaluate "Legend" (threshold 2000)
    Then the badge stays locked
  `, () => {
    expect(badge('legend').isUnlocked({ ...base(), xp: 1999 })).toBe(false)
  })

  it(`
    Given 2000 XP
    When we evaluate "Legend"
    Then the badge unlocks
  `, () => {
    expect(badge('legend').isUnlocked({ ...base(), xp: 2000 })).toBe(true)
  })
})
