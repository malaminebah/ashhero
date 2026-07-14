import { describe, expect, it } from 'vitest'
import {
  DEFENSE_BADGE_RULES,
  getDefenseHealthBonusPercent,
  isDefenseBadgeUnlocked,
  playerEffectiveMaxHp,
} from './defenseBadgesConfig'

describe('isDefenseBadgeUnlocked', () => {
  it(`
    Given a day count one below each badge threshold
    When the unlock is checked
    Then every badge stays locked
  `, () => {
    const rules = DEFENSE_BADGE_RULES

    const unlockedEarly = rules.map((rule) =>
      isDefenseBadgeUnlocked(rule.minDays, rule.minDays - 1)
    )

    expect(unlockedEarly.every((unlocked) => unlocked === false)).toBe(true)
  })

  it(`
    Given a day count exactly on each badge threshold
    When the unlock is checked
    Then every badge unlocks
  `, () => {
    const rules = DEFENSE_BADGE_RULES

    const unlockedOnTime = rules.map((rule) =>
      isDefenseBadgeUnlocked(rule.minDays, rule.minDays)
    )

    expect(unlockedOnTime.every((unlocked) => unlocked === true)).toBe(true)
  })
})

describe('getDefenseHealthBonusPercent', () => {
  it(`
    Given a day count below the first badge
    When the health bonus is computed
    Then no bonus applies
  `, () => {
    const daysBeforeFirstBadge = [0, 6]

    const bonuses = daysBeforeFirstBadge.map(getDefenseHealthBonusPercent)

    expect(bonuses).toEqual([0, 0])
  })

  it(`
    Given day counts crossing successive badge tiers
    When the health bonus is computed
    Then the bonus strictly increases with each unlocked tier
  `, () => {
    const tierDays = DEFENSE_BADGE_RULES.map((rule) => rule.minDays)

    const bonuses = tierDays.map(getDefenseHealthBonusPercent)

    const strictlyIncreasing = bonuses.every(
      (bonus, i) => bonus > (i === 0 ? 0 : bonuses[i - 1]!)
    )
    expect(strictlyIncreasing).toBe(true)
  })
})

describe('playerEffectiveMaxHp', () => {
  it(`
    Given no shield bonus
    When the effective max HP is computed
    Then the base HP is unchanged
  `, () => {
    const noBonus = 0

    const maxHp = playerEffectiveMaxHp(100, noBonus)

    expect(maxHp).toBe(100)
  })

  it(`
    Given a percentage shield bonus
    When the effective max HP is computed
    Then the base HP grows by that percentage
  `, () => {
    const bonuses = [10, 30]

    const maxHps = bonuses.map((bonus) => playerEffectiveMaxHp(100, bonus))

    expect(maxHps).toEqual([110, 130])
  })
})
