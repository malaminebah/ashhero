import { describe, expect, it } from 'vitest'
import { getCheerMessage } from './cheerMessage'

describe('getCheerMessage', () => {
  it(`
    Given dayCount is 0
    When getCheerMessage is called
    Then the adventure prompt is returned
  `, () => {
    const dayCount = 0

    const message = getCheerMessage(dayCount)

    expect(message).toBe('Prêt pour l’aventure ?')
  })

  it(`
    Given dayCount is at both bounds of the 1-2 range
    When getCheerMessage is called
    Then the early-streak message is returned
  `, () => {
    const bounds = [1, 2]

    const messages = bounds.map(getCheerMessage)

    expect(messages.every((m) => m === 'Chaque jour compte.')).toBe(true)
  })

  it(`
    Given dayCount is at both bounds of the 3-6 range
    When getCheerMessage is called
    Then the encouragement message is returned
  `, () => {
    const bounds = [3, 6]

    const messages = bounds.map(getCheerMessage)

    expect(messages.every((m) => m === 'Continue comme ça !')).toBe(true)
  })

  it(`
    Given dayCount is at both bounds of the 7-13 range
    When getCheerMessage is called
    Then the weekly streak message is returned
  `, () => {
    const bounds = [7, 13]

    const messages = bounds.map(getCheerMessage)

    expect(messages.every((m) => m === 'Belle série !')).toBe(true)
  })

  it(`
    Given dayCount is at both bounds of the 14-29 range
    When getCheerMessage is called
    Then the strong streak message is returned
  `, () => {
    const bounds = [14, 29]

    const messages = bounds.map(getCheerMessage)

    expect(messages.every((m) => m === 'Tu assures !')).toBe(true)
  })

  it(`
    Given dayCount is at both bounds of the 30-59 range
    When getCheerMessage is called
    Then the one-month message is returned
  `, () => {
    const bounds = [30, 59]

    const messages = bounds.map(getCheerMessage)

    expect(messages.every((m) => m === 'Un mois — incroyable !')).toBe(true)
  })

  it(`
    Given dayCount is 60 or far beyond
    When getCheerMessage is called
    Then the legend message is returned
  `, () => {
    const bounds = [60, 365]

    const messages = bounds.map(getCheerMessage)

    expect(messages.every((m) => m === 'Tu es une légende !')).toBe(true)
  })
})
