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

describe('PROFILE_BADGES', () => {
  it(`
    Given the badge catalog
    When ids are collected
    Then every badge id is unique
  `, () => {
    const ids = PROFILE_BADGES.map((b) => b.id)

    expect(new Set(ids).size).toBe(ids.length)
  })

  it(`
    Given a brand-new profile with empty stats
    When every badge rule is evaluated
    Then every rule returns a boolean without crashing
  `, () => {
    const emptyProfile = base()

    const results = PROFILE_BADGES.map((b) => b.isUnlocked(emptyProfile))

    expect(results.every((result) => typeof result === 'boolean')).toBe(true)
  })

  it(`
    Given a profile with zero and then one day without vaping
    When the first-day badge is evaluated
    Then it unlocks exactly from day 1
  `, () => {
    const dayZero = base()
    const dayOne = { ...base(), dayCount: 1 }

    const lockedAtZero = badge('jour1').isUnlocked(dayZero)
    const unlockedAtOne = badge('jour1').isUnlocked(dayOne)

    expect(lockedAtZero).toBe(false)
    expect(unlockedAtOne).toBe(true)
  })

  it(`
    Given two combats won
    When the combat badges are evaluated
    Then the first combat badge unlocks before the third
  `, () => {
    const stats = { ...base(), combatsWon: 2 }

    const firstUnlocked = badge('combat1').isUnlocked(stats)
    const thirdUnlocked = badge('combat3').isUnlocked(stats)

    expect(firstUnlocked).toBe(true)
    expect(thirdUnlocked).toBe(false)
  })

  it(`
    Given a profile at level 5 with 50 euros saved
    When the level and savings badges are evaluated
    Then both unlock
  `, () => {
    const stats = { ...base(), level: 5, moneySaved: 50 }

    const levelUnlocked = badge('niv5').isUnlocked(stats)
    const savingsUnlocked = badge('eco50').isUnlocked(stats)

    expect(levelUnlocked).toBe(true)
    expect(savingsUnlocked).toBe(true)
  })

  it(`
    Given XP just below and exactly on the 2000 XP threshold
    When the XP badge is evaluated
    Then it unlocks exactly at the threshold
  `, () => {
    const justBelow = { ...base(), xp: 1999 }
    const exactThreshold = { ...base(), xp: 2000 }

    const lockedBelow = badge('xp2000').isUnlocked(justBelow)
    const unlockedAt = badge('xp2000').isUnlocked(exactThreshold)

    expect(lockedBelow).toBe(false)
    expect(unlockedAt).toBe(true)
  })
})
