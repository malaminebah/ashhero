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
  it('exposes 15 badges', () => {
    expect(PROFILE_BADGES).toHaveLength(15)
  })

  it('jour1 unlocks from day 1', () => {
    expect(badge('jour1').isUnlocked(base())).toBe(false)
    expect(badge('jour1').isUnlocked({ ...base(), dayCount: 1 })).toBe(true)
  })

  it('combat1 before combat3', () => {
    const stats = { ...base(), combatsWon: 2 }
    expect(badge('combat1').isUnlocked(stats)).toBe(true)
    expect(badge('combat3').isUnlocked(stats)).toBe(false)
  })

  it('niv5 and eco50', () => {
    const stats = { ...base(), level: 5, moneySaved: 50 }
    expect(badge('niv5').isUnlocked(stats)).toBe(true)
    expect(badge('eco50').isUnlocked(stats)).toBe(true)
  })

  it('xp2000 threshold', () => {
    expect(badge('xp2000').isUnlocked({ ...base(), xp: 1999 })).toBe(false)
    expect(badge('xp2000').isUnlocked({ ...base(), xp: 2000 })).toBe(true)
  })
})
