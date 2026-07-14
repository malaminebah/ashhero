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
    const quitDate = null

    const days = getDayCount(quitDate)

    expect(days).toBe(0)
  })

  it(`
    Given a quit date exactly 48 hours ago
    When getDayCount is called
    Then the result is 2 full days
  `, () => {
    const quitDate = new Date('2026-06-13T12:00:00.000Z')

    const days = getDayCount(quitDate)

    expect(days).toBe(2)
  })

  it(`
    Given a quit date in the future
    When getDayCount is called
    Then the result is 0
  `, () => {
    const quitDate = new Date('2026-06-16T12:00:00.000Z')

    const days = getDayCount(quitDate)

    expect(days).toBe(0)
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
    const quitDate = null

    const saved = getMoneySaved('cigarette', quitDate, 20, 15, null)

    expect(saved).toBe(0)
  })

  it(`
    Given cigarette, 30 days, 20/day, €15 per pack
    When getMoneySaved is called
    Then (30×20/20)×15 = €450
  `, () => {
    const perDay = 20
    const pricePerPack = 15

    const saved = getMoneySaved('cigarette', quit30DaysAgo, perDay, pricePerPack, null)

    expect(saved).toBe(450)
  })

  it(`
    Given vape, 30 days, 50 ml bottle at €9, 35 ml/week
    When getMoneySaved is called
    Then (days/7) × (ml/week × €/ml) with €/ml = 9/50
  `, () => {
    const pricing = vape50ml9eur35ml

    // 30/7 * 35 * (9/50) = 27
    const saved = getMoneySaved('vape', quit30DaysAgo, 10, null, pricing)

    expect(saved).toBe(27)
  })

  it(`
    Given vape with no bottle data (legacy profile)
    When pricePerPack and quantity are used as fallback
    Then legacy formula days × sessions × price applies
  `, () => {
    const legacyPricing = { bottleVolumeMl: null, bottlePriceEuro: null, mlPerWeek: null }

    const saved = getMoneySaved('vape', quit30DaysAgo, 10, 0.5, legacyPricing)

    expect(saved).toBe(150)
  })
})

describe('getLifeRegainedMinutes', () => {
  it(`
    Given 20 cigarettes avoided
    When life regained is computed
    Then 11 minutes per cigarette gives 220 minutes
  `, () => {
    const avoided = 20

    const minutes = getLifeRegainedMinutes('cigarette', avoided)

    expect(minutes).toBe(220)
  })

  it(`
    Given 88 vape equivalents avoided
    When life regained is computed
    Then 3.75 minutes per unit gives 330 minutes
  `, () => {
    const avoided = 88

    const minutes = getLifeRegainedMinutes('vape', avoided)

    expect(minutes).toBe(330)
  })
})
