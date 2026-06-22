import { describe, expect, it } from 'vitest'
import { getCheerMessage } from './cheerMessage'

describe('getCheerMessage', () => {
  it(`
    Given dayCount is 0
    When getCheerMessage is called
    Then the adventure prompt is returned
  `, () => {
    expect(getCheerMessage(0)).toBe('Prêt pour l’aventure ?')
  })

  it(`
    Given dayCount is between 1 and 2
    When getCheerMessage is called
    Then the early-streak message is returned
  `, () => {
    expect(getCheerMessage(1)).toBe('Chaque jour compte.')
    expect(getCheerMessage(2)).toBe('Chaque jour compte.')
  })

  it(`
    Given dayCount is between 3 and 6
    When getCheerMessage is called
    Then the encouragement message is returned
  `, () => {
    expect(getCheerMessage(3)).toBe('Continue comme ça !')
    expect(getCheerMessage(6)).toBe('Continue comme ça !')
  })

  it(`
    Given dayCount is between 7 and 13
    When getCheerMessage is called
    Then the weekly streak message is returned
  `, () => {
    expect(getCheerMessage(7)).toBe('Belle série !')
    expect(getCheerMessage(13)).toBe('Belle série !')
  })

  it(`
    Given dayCount is between 14 and 29
    When getCheerMessage is called
    Then the strong streak message is returned
  `, () => {
    expect(getCheerMessage(14)).toBe('Tu assures !')
    expect(getCheerMessage(29)).toBe('Tu assures !')
  })

  it(`
    Given dayCount is between 30 and 59
    When getCheerMessage is called
    Then the one-month message is returned
  `, () => {
    expect(getCheerMessage(30)).toBe('Un mois — incroyable !')
    expect(getCheerMessage(59)).toBe('Un mois — incroyable !')
  })

  it(`
    Given dayCount is 60 or more
    When getCheerMessage is called
    Then the legend message is returned
  `, () => {
    expect(getCheerMessage(60)).toBe('Tu es une légende !')
    expect(getCheerMessage(365)).toBe('Tu es une légende !')
  })
})
