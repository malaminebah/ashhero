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

describe('PROFILE_BADGES (déblocage)', () => {
  it(`
    Given 0 jour sans vape et aucun combat
    When on teste "Premier Jour"
    Then le badge est verrouillé
  `, () => {
    expect(badge('first').isUnlocked(base())).toBe(false)
  })

  it(`
    Given au moins 1 jour sans vape
    When on teste "Premier Jour"
    Then le badge est débloqué
  `, () => {
    expect(badge('first').isUnlocked({ ...base(), dayCount: 1 })).toBe(true)
  })

  it(`
    Given exactement 2 combats gagnés
    When on teste "Combattant" (seuil 1) et "Guerrier" (seuil 3)
    Then Combattant oui, Guerrier non
  `, () => {
    const stats = { ...base(), combatsWon: 2 }
    expect(badge('fighter').isUnlocked(stats)).toBe(true)
    expect(badge('warrior').isUnlocked(stats)).toBe(false)
  })

  it(`
    Given niveau 5 et assez d'argent économisé
    When on teste "Maître" et "Économe"
    Then les deux sont débloqués
  `, () => {
    const stats = { ...base(), level: 5, moneySaved: 50 }
    expect(badge('master').isUnlocked(stats)).toBe(true)
    expect(badge('thrifty').isUnlocked(stats)).toBe(true)
  })

  it(`
    Given 1999 XP
    When on teste "Légende" (seuil 2000)
    Then le badge est verrouillé
  `, () => {
    expect(badge('legend').isUnlocked({ ...base(), xp: 1999 })).toBe(false)
  })

  it(`
    Given 2000 XP
    When on teste "Légende"
    Then le badge est débloqué
  `, () => {
    expect(badge('legend').isUnlocked({ ...base(), xp: 2000 })).toBe(true)
  })
})
