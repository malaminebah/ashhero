import { describe, expect, it } from 'vitest'
import { DEFENSE_BADGE_RULES, isDefenseBadgeUnlocked } from './defenseBadgesConfig'

describe('defense badges', () => {
  it('unlocks at 7, 14, 21 days', () => {
    expect(isDefenseBadgeUnlocked(7, 6)).toBe(false)
    expect(isDefenseBadgeUnlocked(7, 7)).toBe(true)
    expect(isDefenseBadgeUnlocked(14, 13)).toBe(false)
    expect(isDefenseBadgeUnlocked(14, 14)).toBe(true)
    expect(isDefenseBadgeUnlocked(21, 20)).toBe(false)
    expect(isDefenseBadgeUnlocked(21, 21)).toBe(true)
  })

  it('has three weekly tiers', () => {
    expect(DEFENSE_BADGE_RULES.map((b) => b.minDays)).toEqual([7, 14, 21])
  })
})
