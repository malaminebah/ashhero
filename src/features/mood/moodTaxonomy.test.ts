import { describe, expect, it } from 'vitest'
import {
  getPrimaryMood,
  getSubMoodLabel,
  getSubMoods,
  PRIMARY_MOODS,
} from './moodTaxonomy'

describe('getPrimaryMood', () => {
  it(`
    Given primary mood id joy
    When getPrimaryMood is called
    Then the Joie definition is returned
  `, () => {
    const id = 'joy' as const

    const mood = getPrimaryMood(id)

    expect(mood).toEqual({
      id: 'joy',
      label: 'Joie',
      circleColor: '#fdba74',
    })
  })

  it(`
    Given an unknown primary mood id
    When getPrimaryMood is called
    Then an error is thrown
  `, () => {
    const id = 'unknown' as 'joy'

    expect(() => getPrimaryMood(id)).toThrow('Unknown primary mood: unknown')
  })
})

describe('getSubMoods', () => {
  it(`
    Given primary mood calm
    When getSubMoods is called
    Then four sub-moods are returned
  `, () => {
    const primary = 'calm' as const

    const subs = getSubMoods(primary)

    expect(subs).toHaveLength(4)
  })

  it(`
    Given primary mood calm
    When getSubMoods is called
    Then serenity is the first sub-mood id
  `, () => {
    const primary = 'calm' as const

    const subs = getSubMoods(primary)

    expect(subs[0]?.id).toBe('serenity')
  })
})

describe('getSubMoodLabel', () => {
  it(`
    Given primary fear and sub anxious
    When getSubMoodLabel is called
    Then the French label Anxieux is returned
  `, () => {
    const primary = 'fear' as const
    const subId = 'anxious'

    const label = getSubMoodLabel(primary, subId)

    expect(label).toBe('Anxieux')
  })

  it(`
    Given an unknown sub id
    When getSubMoodLabel is called
    Then the raw sub id is returned unchanged
  `, () => {
    const primary = 'fear' as const
    const subId = 'missing'

    const label = getSubMoodLabel(primary, subId)

    expect(label).toBe('missing')
  })
})

describe('PRIMARY_MOODS', () => {
  it(`
    Given the mood taxonomy
    When primary moods are counted
    Then six emotions are defined
  `, () => {
    expect(PRIMARY_MOODS).toHaveLength(6)
  })
})
