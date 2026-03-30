import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  getDayCount,
  getLifeRegainedMinutes,
  getMoneySaved,
  type VapePricingInput,
} from './calculations'

/** Fixed "now" for predictable getDayCount / getMoneySaved behaviour. */
const FIXED_NOW = new Date('2026-06-15T12:00:00.000Z')

const vape50ml9eur35ml: VapePricingInput = {
  bottleVolumeMl: 50,
  bottlePriceEuro: 9,
  mlPerWeek: 35,
}

describe('getDayCount', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(FIXED_NOW)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it(`
    Given no quit date
    When getDayCount is called
    Then the result is 0
  `, () => {
    expect(getDayCount(null)).toBe(0)
  })

  it(`
    Given a quit date exactly 48 hours ago
    When getDayCount is called
    Then the result is 2 full days
  `, () => {
    const quitDate = new Date('2026-06-13T12:00:00.000Z')
    expect(getDayCount(quitDate)).toBe(2)
  })

  it(`
    Given a quit date in the future
    When getDayCount is called
    Then the result is 0
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
    Given no quit date
    When money saved is computed (cigarette)
    Then the amount is 0
  `, () => {
    expect(getMoneySaved('cigarette', null, 20, 15, null)).toBe(0)
  })

  it(`
    Given cigarette, 30 days, 20/day, €15 per pack
    When getMoneySaved is called
    Then (30×20/20)×15 = €450
  `, () => {
    expect(getMoneySaved('cigarette', quit30DaysAgo, 20, 15, null)).toBe(450)
  })

  it(`
    Given vape, 30 days, 50 ml bottle at €9, 35 ml/week
    When getMoneySaved is called
    Then (days/7) × (ml/week × €/ml) with €/ml = 9/50
  `, () => {
    // 30/7 * 35 * (9/50) = 27
    expect(
      getMoneySaved('vape', quit30DaysAgo, 10, null, vape50ml9eur35ml)
    ).toBe(27)
  })

  it(`
    Given vape with no bottle data (legacy profile)
    When pricePerPack and quantity are used as fallback
    Then legacy formula days × sessions × price applies
  `, () => {
    expect(
      getMoneySaved('vape', quit30DaysAgo, 10, 0.5, {
        bottleVolumeMl: null,
        bottlePriceEuro: null,
        mlPerWeek: null,
      })
    ).toBe(150)
  })
})

describe('getLifeRegainedMinutes', () => {
  it('applies 11 minutes per cigarette avoided', () => {
    expect(getLifeRegainedMinutes('cigarette', 20)).toBe(220)
  })

  it('applies 3.75 minutes per vape equivalent avoided', () => {
    expect(getLifeRegainedMinutes('vape', 88)).toBe(330)
  })
})
