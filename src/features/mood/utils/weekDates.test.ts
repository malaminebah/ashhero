import { describe, expect, it } from 'vitest'
import {
  formatLocalDate,
  formatWeekRangeLabel,
  getCurrentWeekDays,
  getISOWeekId,
  getMondayOfWeek,
  getWeekDateKeys,
  getWeekDaysWithOffset,
  isCurrentOrPastWeek,
} from './weekDates'

describe('formatLocalDate', () => {
  it(`
    Given June 5th 2026
    When formatLocalDate is called
    Then 2026-06-05 is returned
  `, () => {
    const date = new Date(2026, 5, 5)

    const key = formatLocalDate(date)

    expect(key).toBe('2026-06-05')
  })
})

describe('getMondayOfWeek', () => {
  it(`
    Given a Wednesday
    When getMondayOfWeek is called
    Then the date key is 2026-06-15
  `, () => {
    const wednesday = new Date(2026, 5, 17, 15, 30)

    const monday = getMondayOfWeek(wednesday)

    const formatted = formatLocalDate(monday)
    expect(formatted).toBe('2026-06-15')
  })

  it(`
    Given a Wednesday
    When getMondayOfWeek is called
    Then the result is a Monday at midnight
  `, () => {
    const wednesday = new Date(2026, 5, 17, 15, 30)

    const monday = getMondayOfWeek(wednesday)

    expect(monday.getDay()).toBe(1)
    expect(monday.getHours()).toBe(0)
  })

  it(`
    Given a Sunday
    When getMondayOfWeek is called
    Then the previous Monday 2026-06-15 is returned
  `, () => {
    const sunday = new Date(2026, 5, 21)

    const monday = getMondayOfWeek(sunday)

    const formatted = formatLocalDate(monday)
    expect(formatted).toBe('2026-06-15')
  })
})

describe('getCurrentWeekDays', () => {
  it(`
    Given Monday June 15th 2026 as reference
    When getCurrentWeekDays is called
    Then seven day cells are returned
  `, () => {
    const reference = new Date(2026, 5, 15, 12)

    const days = getCurrentWeekDays(reference)

    expect(days).toHaveLength(7)
  })

  it(`
    Given Monday June 15th 2026 as reference
    When getCurrentWeekDays is called
    Then the first cell is today
  `, () => {
    const reference = new Date(2026, 5, 15, 12)

    const days = getCurrentWeekDays(reference)

    expect(days[0]).toMatchObject({
      date: '2026-06-15',
      weekdayLabel: 'Lun.',
      isToday: true,
      isFuture: false,
      isPast: false,
    })
  })

  it(`
    Given Monday June 15th 2026 as reference
    When getCurrentWeekDays is called
    Then the second cell is a future day
  `, () => {
    const reference = new Date(2026, 5, 15, 12)

    const days = getCurrentWeekDays(reference)

    expect(days[1]).toMatchObject({
      date: '2026-06-16',
      isToday: false,
      isFuture: true,
      isPast: false,
    })
  })

  it(`
    Given Monday June 15th 2026 as reference
    When getCurrentWeekDays is called
    Then the last cell is Sunday June 21st
  `, () => {
    const reference = new Date(2026, 5, 15, 12)

    const days = getCurrentWeekDays(reference)

    expect(days[6]?.date).toBe('2026-06-21')
  })
})

describe('getWeekDateKeys', () => {
  it(`
    Given Monday June 15th 2026 as reference
    When getWeekDateKeys is called
    Then the week keys from Mon to Sun are returned
  `, () => {
    const reference = new Date(2026, 5, 15)

    const keys = getWeekDateKeys(reference)

    expect(keys).toEqual([
      '2026-06-15',
      '2026-06-16',
      '2026-06-17',
      '2026-06-18',
      '2026-06-19',
      '2026-06-20',
      '2026-06-21',
    ])
  })
})

describe('getWeekDaysWithOffset', () => {
  it(`
    Given weekOffset -1 from Monday June 15th 2026
    When getWeekDaysWithOffset is called
    Then the week starts on 2026-06-08
  `, () => {
    const reference = new Date(2026, 5, 15)
    const weekOffset = -1

    const days = getWeekDaysWithOffset(weekOffset, reference)

    expect(days[0]?.date).toBe('2026-06-08')
  })

  it(`
    Given weekOffset -1 from Monday June 15th 2026
    When getWeekDaysWithOffset is called
    Then the week ends on 2026-06-14
  `, () => {
    const reference = new Date(2026, 5, 15)
    const weekOffset = -1

    const days = getWeekDaysWithOffset(weekOffset, reference)

    expect(days[6]?.date).toBe('2026-06-14')
  })

  it(`
    Given weekOffset -1 from Monday June 15th 2026
    When getWeekDaysWithOffset is called
    Then every day is marked as past
  `, () => {
    const reference = new Date(2026, 5, 15)
    const weekOffset = -1

    const days = getWeekDaysWithOffset(weekOffset, reference)

    expect(days.every((d) => d.isPast)).toBe(true)
  })

  it(`
    Given weekOffset -1 from Monday June 15th 2026
    When getWeekDaysWithOffset is called
    Then no day is marked as today
  `, () => {
    const reference = new Date(2026, 5, 15)
    const weekOffset = -1

    const days = getWeekDaysWithOffset(weekOffset, reference)

    expect(days.every((d) => !d.isToday)).toBe(true)
  })
})

describe('getISOWeekId', () => {
  it(`
    Given June 15th 2026
    When getISOWeekId is called
    Then 2026-W25 is returned
  `, () => {
    const date = new Date(2026, 5, 15)

    const weekId = getISOWeekId(date)

    expect(weekId).toBe('2026-W25')
  })
})

describe('formatWeekRangeLabel', () => {
  it(`
    Given the current week of June 15th 2026
    When formatWeekRangeLabel is called
    Then the French range label is returned
  `, () => {
    const days = getCurrentWeekDays(new Date(2026, 5, 15))

    const label = formatWeekRangeLabel(days)

    expect(label).toBe('15 juin – 21 juin 2026')
  })

  it(`
    Given an empty week array
    When formatWeekRangeLabel is called
    Then an empty string is returned
  `, () => {
    const days: ReturnType<typeof getCurrentWeekDays> = []

    const label = formatWeekRangeLabel(days)

    expect(label).toBe('')
  })
})

describe('isCurrentOrPastWeek', () => {
  it(`
    Given weekOffset 0
    When isCurrentOrPastWeek is called
    Then true is returned
  `, () => {
    const weekOffset = 0

    const result = isCurrentOrPastWeek(weekOffset)

    expect(result).toBe(true)
  })

  it(`
    Given weekOffset -2
    When isCurrentOrPastWeek is called
    Then true is returned
  `, () => {
    const weekOffset = -2

    const result = isCurrentOrPastWeek(weekOffset)

    expect(result).toBe(true)
  })

  it(`
    Given weekOffset 1
    When isCurrentOrPastWeek is called
    Then false is returned
  `, () => {
    const weekOffset = 1

    const result = isCurrentOrPastWeek(weekOffset)

    expect(result).toBe(false)
  })
})
