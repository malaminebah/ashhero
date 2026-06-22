import { describe, expect, it } from 'vitest'
import { DEFAULT_HERO_NAME, displayHeroName, normalizeHeroName } from './heroName'

describe('normalizeHeroName', () => {
  it(`
    Given an empty string
    When normalizeHeroName is called
    Then null is returned
  `, () => {
    const raw = ''

    const name = normalizeHeroName(raw)

    expect(name).toBeNull()
  })

  it(`
    Given a whitespace-only string
    When normalizeHeroName is called
    Then null is returned
  `, () => {
    const raw = '   '

    const name = normalizeHeroName(raw)

    expect(name).toBeNull()
  })

  it(`
    Given a name with surrounding spaces
    When normalizeHeroName is called
    Then the trimmed value is returned
  `, () => {
    const raw = '  Ash  '

    const name = normalizeHeroName(raw)

    expect(name).toBe('Ash')
  })

  it(`
    Given a name longer than 8 characters
    When normalizeHeroName is called
    Then the value is truncated to 8 characters
  `, () => {
    const raw = 'abcdefghijklmnop'

    const name = normalizeHeroName(raw)

    expect(name).toBe('abcdefgh')
  })
})

describe('displayHeroName', () => {
  it(`
    Given a null heroName
    When displayHeroName is called
    Then the default hero name is returned
  `, () => {
    const heroName = null

    const displayed = displayHeroName(heroName)

    expect(displayed).toBe(DEFAULT_HERO_NAME)
  })

  it(`
    Given an empty heroName
    When displayHeroName is called
    Then the default hero name is returned
  `, () => {
    const heroName = ''

    const displayed = displayHeroName(heroName)

    expect(displayed).toBe(DEFAULT_HERO_NAME)
  })

  it(`
    Given a whitespace-only heroName
    When displayHeroName is called
    Then the default hero name is returned
  `, () => {
    const heroName = '   '

    const displayed = displayHeroName(heroName)

    expect(displayed).toBe(DEFAULT_HERO_NAME)
  })

  it(`
    Given a valid hero name with surrounding spaces
    When displayHeroName is called
    Then the trimmed name is returned
  `, () => {
    const heroName = '  Hero  '

    const displayed = displayHeroName(heroName)

    expect(displayed).toBe('Hero')
  })

  it(`
    Given a hero name longer than 8 characters
    When displayHeroName is called
    Then the value is truncated for display
  `, () => {
    const heroName = 'abcdefghijklmnop'

    const displayed = displayHeroName(heroName)

    expect(displayed).toBe('abcdefgh')
  })
})
