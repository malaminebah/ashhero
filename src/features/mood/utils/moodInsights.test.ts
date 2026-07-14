import { describe, expect, it } from 'vitest'
import type { MoodEntry, PrimaryMood } from '../types'
import { formatLocalDate } from './weekDates'
import {
  averageScore,
  computeStreak,
  computeTrend,
} from './moodInsights'

const entry = (date: string, primary: PrimaryMood): MoodEntry => ({
  date,
  weekId: '2026-W28',
  primary,
  sub: 'x',
  createdAt: '',
})

const daysAgo = (n: number, from: Date) => {
  const d = new Date(from)
  d.setDate(d.getDate() - n)
  return formatLocalDate(d)
}

const entriesForDaysAgo = (
  offsets: number[],
  from: Date,
  primary: PrimaryMood
): Record<string, MoodEntry> =>
  Object.fromEntries(
    offsets.map((n) => [daysAgo(n, from), entry(daysAgo(n, from), primary)])
  )

describe('computeStreak', () => {
  const today = new Date('2026-07-10T12:00:00')

  it(`
    Given three consecutive filled days ending today
    When the streak is computed
    Then the streak is 3
  `, () => {
    const entries = entriesForDaysAgo([0, 1, 2], today, 'joy')

    const result = computeStreak(entries, today)

    expect(result.streak).toBe(3)
  })

  it(`
    Given today is not filled yet but previous days are
    When the streak is computed
    Then the running streak is preserved
  `, () => {
    const entries = entriesForDaysAgo([1, 2], today, 'calm')

    const result = computeStreak(entries, today)

    expect(result.streak).toBe(2)
  })

  it(`
    Given a one-day gap in the history
    When the streak is computed
    Then the streak stops at the gap
  `, () => {
    const entries = entriesForDaysAgo([0, 1, 3, 4], today, 'joy')

    const result = computeStreak(entries, today)

    expect(result.streak).toBe(2)
  })

  it(`
    Given more filled days than the counting window
    When the streak is computed with a 14-day window
    Then the streak caps at 14 and reports the cap
  `, () => {
    const twentyDays = Array.from({ length: 20 }, (_, n) => n)
    const entries = entriesForDaysAgo(twentyDays, today, 'joy')

    const result = computeStreak(entries, today, 14)

    expect(result.streak).toBe(14)
    expect(result.capped).toBe(true)
  })

  it(`
    Given no mood was ever logged
    When the streak is computed
    Then the streak is 0
  `, () => {
    const noEntries = {}

    const result = computeStreak(noEntries, today)

    expect(result.streak).toBe(0)
  })
})

describe('averageScore', () => {
  const dates = ['2026-07-06', '2026-07-07', '2026-07-08']

  it(`
    Given a window where only some dates are filled
    When the average is computed
    Then only filled dates count
  `, () => {
    const entries = {
      '2026-07-06': entry('2026-07-06', 'joy'), // score 5
      '2026-07-08': entry('2026-07-08', 'anger'), // score 1
    }

    const average = averageScore(dates, entries)

    expect(average).toBe(3)
  })

  it(`
    Given a window with no filled date
    When the average is computed
    Then the result is null
  `, () => {
    const noEntries = {}

    const average = averageScore(dates, noEntries)

    expect(average).toBeNull()
  })
})

describe('computeTrend', () => {
  it(`
    Given a week average above the previous one
    When the trend is computed
    Then the trend is up
  `, () => {
    const thisWeek = 4
    const lastWeek = 3

    const result = computeTrend(thisWeek, lastWeek)

    expect(result.trend).toBe('up')
  })

  it(`
    Given a week average below the previous one
    When the trend is computed
    Then the trend is down
  `, () => {
    const thisWeek = 3
    const lastWeek = 4

    const result = computeTrend(thisWeek, lastWeek)

    expect(result.trend).toBe('down')
  })

  it(`
    Given two equal week averages
    When the trend is computed
    Then the trend is flat
  `, () => {
    const bothWeeks = 4

    const result = computeTrend(bothWeeks, bothWeeks)

    expect(result.trend).toBe('flat')
  })

  it(`
    Given a missing week on either side
    When the trend is computed
    Then the trend is unknown with no percentage
  `, () => {
    const missingLastWeek = computeTrend(4, null)
    const missingThisWeek = computeTrend(null, 3)

    expect(missingLastWeek.trend).toBe('unknown')
    expect(missingThisWeek.trendPct).toBeNull()
  })
})
