import { describe, it, expect } from 'vitest'
import { getDayCount, getMoneySaved } from './calculations'

describe('getDayCount', () => {
  it('retourne 0 si quitDate est null', () => {
    expect(getDayCount(null)).toBe(0)
  })

  it('retourne 1 après 24h', () => {
    const hier = new Date(Date.now() - 24 * 60 * 60 * 1000)
    expect(getDayCount(hier)).toBe(1)
  })
})

describe('getMoneySaved', () => {
  it('retourne 0 si quitDate est null', () => {
    expect(getMoneySaved(null, 20, 15)).toBe(0)
  })

  it('calcule correctement après 30 jours', () => {
    const quitDate = new Date(Date.now() - 30 * 86_400_000)
    expect(getMoneySaved(quitDate, 20, 15)).toBeCloseTo(450, 0)
  })
})
