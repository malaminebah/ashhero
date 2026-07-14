import { describe, expect, it } from 'vitest'
import {
  getPrimaryMood,
  getSubMoodLabel,
  getSubMoods,
  MOOD_MAX_SCORE,
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

    expect(mood.id).toBe('joy')
    expect(mood.label).toBe('Joie')
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
    When primary mood ids are collected
    Then every id is unique
  `, () => {
    const ids = PRIMARY_MOODS.map((m) => m.id)

    expect(new Set(ids).size).toBe(ids.length)
  })

  it(`
    Given every primary mood definition
    When its display fields are read
    Then each mood has a label, an icon and a score within bounds
  `, () => {
    const moods = PRIMARY_MOODS

    const allDisplayable = moods.every(
      (mood) =>
        mood.label.length > 0 &&
        mood.icon.length > 0 &&
        mood.score >= 1 &&
        mood.score <= MOOD_MAX_SCORE
    )

    expect(allDisplayable).toBe(true)
  })

  it(`
    Given every primary mood
    When its sub-moods are resolved
    Then each mood offers at least one sub-mood
  `, () => {
    const moods = PRIMARY_MOODS

    const subMoodCounts = moods.map((mood) => getSubMoods(mood.id).length)

    expect(subMoodCounts.every((count) => count > 0)).toBe(true)
  })
})
