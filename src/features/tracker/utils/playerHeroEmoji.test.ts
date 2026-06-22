import { describe, expect, it } from 'vitest'
import { getPlayerHeroEmoji } from './playerHeroEmoji'

describe('getPlayerHeroEmoji', () => {
  it(`
    Given level is 1
    When getPlayerHeroEmoji is called
    Then the starter emoji is returned
  `, () => {
    const level = 1

    const emoji = getPlayerHeroEmoji(level)

    expect(emoji).toBe('🤖')
  })

  it(`
    Given level is 2
    When getPlayerHeroEmoji is called
    Then the strength emoji is returned
  `, () => {
    const level = 2

    const emoji = getPlayerHeroEmoji(level)

    expect(emoji).toBe('💪')
  })

  it(`
    Given level is 3
    When getPlayerHeroEmoji is called
    Then the strength emoji is returned
  `, () => {
    const level = 3

    const emoji = getPlayerHeroEmoji(level)

    expect(emoji).toBe('💪')
  })

  it(`
    Given level is 4
    When getPlayerHeroEmoji is called
    Then the shield emoji is returned
  `, () => {
    const level = 4

    const emoji = getPlayerHeroEmoji(level)

    expect(emoji).toBe('🛡️')
  })

  it(`
    Given level is 6
    When getPlayerHeroEmoji is called
    Then the shield emoji is returned
  `, () => {
    const level = 6

    const emoji = getPlayerHeroEmoji(level)

    expect(emoji).toBe('🛡️')
  })

  it(`
    Given level is 7
    When getPlayerHeroEmoji is called
    Then the sword emoji is returned
  `, () => {
    const level = 7

    const emoji = getPlayerHeroEmoji(level)

    expect(emoji).toBe('⚔️')
  })

  it(`
    Given level is 9
    When getPlayerHeroEmoji is called
    Then the sword emoji is returned
  `, () => {
    const level = 9

    const emoji = getPlayerHeroEmoji(level)

    expect(emoji).toBe('⚔️')
  })

  it(`
    Given level is 10
    When getPlayerHeroEmoji is called
    Then the crown emoji is returned
  `, () => {
    const level = 10

    const emoji = getPlayerHeroEmoji(level)

    expect(emoji).toBe('👑')
  })

  it(`
    Given level is 99
    When getPlayerHeroEmoji is called
    Then the crown emoji is returned
  `, () => {
    const level = 99

    const emoji = getPlayerHeroEmoji(level)

    expect(emoji).toBe('👑')
  })
})
