import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getDayCount, getMoneySaved } from './calculations'

/** Date fixe : comportement prévisible pour getDayCount / getMoneySaved. */
const FIXED_NOW = new Date('2026-06-15T12:00:00.000Z')

describe('getDayCount', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(FIXED_NOW)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it(`
    Given aucune date d'arrêt
    When on appelle getDayCount
    Then le résultat est 0
  `, () => {
    expect(getDayCount(null)).toBe(0)
  })

  it(`
    Given une date d'arrêt il y a exactement 48 h
    When on appelle getDayCount
    Then le résultat est 2 jours complets
  `, () => {
    const quitDate = new Date('2026-06-13T12:00:00.000Z')
    expect(getDayCount(quitDate)).toBe(2)
  })

  it(`
    Given une date d'arrêt dans le futur (cas limite)
    When on appelle getDayCount
    Then le résultat est 0 (pas encore un jour entier écoulé "en arrière")
  `, () => {
    const quitDate = new Date('2026-06-16T12:00:00.000Z')
    expect(getDayCount(quitDate)).toBe(0)
  })
})

describe('getMoneySaved', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(FIXED_NOW)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  const quit30DaysAgo = new Date('2026-05-16T12:00:00.000Z')

  it(`
    Given pas de date d'arrêt
    When on calcule l'argent économisé (cigarette)
    Then le montant est 0
  `, () => {
    expect(getMoneySaved('cigarette', null, 20, 15)).toBe(0)
  })

  it(`
    Given cigarette, 30 jours, 20/jour, 15€ le paquet
    When on calcule getMoneySaved
    Then formule paquet/20 : (30×20/20)×15 = 450€
  `, () => {
    expect(getMoneySaved('cigarette', quit30DaysAgo, 20, 15)).toBe(450)
  })

  it(`
    Given vape, 30 jours, 10 puff/jour, 0,50€ unité
    When on calcule getMoneySaved
    Then formule linéaire : arrondi(30 × 10 × 0.5) = 150
  `, () => {
    expect(getMoneySaved('vape', quit30DaysAgo, 10, 0.5)).toBe(150)
  })
})
