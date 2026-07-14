import { describe, expect, it } from 'vitest'
import {
  avoidedPackEquivalent,
  getAvoidedTiers,
  getMoneyTiers,
  resolveTierProgress,
} from './statsEquivalents'

describe('resolveTierProgress', () => {
  it(`
    Given 90 cigarettes avoided
    When tier progress is resolved
    Then the current tier is passed at 50 and the next lands at 100 with 80 percent progress
  `, () => {
    const state = resolveTierProgress(90, getAvoidedTiers('cigarette'))

    expect(state.current?.threshold).toBe(50)
    expect(state.next?.threshold).toBe(100)
    expect(state.progressPct).toBe(80)
  })

  it(`
    Given 10 euros saved
    When tier progress is resolved on money tiers
    Then the café tier is reached and the next goal is a book
  `, () => {
    const state = resolveTierProgress(10, getMoneyTiers())

    expect(state.current?.label).toBe('Un café')
    expect(state.next?.label).toBe('Un livre')
  })

  it(`
    Given a value below the first tier
    When tier progress is resolved
    Then no current tier is reached yet
  `, () => {
    const state = resolveTierProgress(0, getMoneyTiers())

    expect(state.current).toBeFalsy()
  })
})

describe('avoidedPackEquivalent', () => {
  it(`
    Given 90 cigarettes avoided
    When the pack equivalent is formatted
    Then the copy mentions 4.5 packs
  `, () => {
    const avoided = 90

    const copy = avoidedPackEquivalent('cigarette', avoided)

    expect(copy).toContain('4.5')
  })
})
