import type { WeekDayCell } from '../types'

const WEEKDAY_LABELS = ['Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.', 'Dim.'] as const

export function formatLocalDate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function getISOWeekId(date: Date): string {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  const week = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, '0')}`
}

export function getMondayOfWeek(reference = new Date()): Date {
  const d = new Date(reference.getFullYear(), reference.getMonth(), reference.getDate())
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  d.setHours(0, 0, 0, 0)
  return d
}

export function getCurrentWeekDays(reference = new Date()): WeekDayCell[] {
  const monday = getMondayOfWeek(reference)
  const todayKey = formatLocalDate(reference)

  return WEEKDAY_LABELS.map((weekdayLabel, index) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + index)
    const date = formatLocalDate(d)
    const isToday = date === todayKey
    const isFuture = date > todayKey
    const isPast = date < todayKey
    return { date, weekdayLabel, isToday, isFuture, isPast }
  })
}

export function getWeekDateKeys(reference = new Date()): string[] {
  return getCurrentWeekDays(reference).map((d) => d.date)
}

export function getWeekDaysWithOffset(weekOffset = 0, reference = new Date()): WeekDayCell[] {
  const monday = getMondayOfWeek(reference)
  monday.setDate(monday.getDate() + weekOffset * 7)
  const todayKey = formatLocalDate(reference)

  return WEEKDAY_LABELS.map((weekdayLabel, index) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + index)
    const date = formatLocalDate(d)
    const isToday = date === todayKey
    const isFuture = date > todayKey
    const isPast = date < todayKey
    return { date, weekdayLabel, isToday, isFuture, isPast }
  })
}

export function formatWeekRangeLabel(weekDays: WeekDayCell[]): string {
  if (weekDays.length === 0) return ''
  const start = parseLocalDate(weekDays[0].date)
  const end = parseLocalDate(weekDays[weekDays.length - 1].date)
  const fmt = (d: Date) =>
    d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
  const year = end.getFullYear()
  return `${fmt(start)} – ${fmt(end)} ${year}`
}

function parseLocalDate(dateKey: string): Date {
  const [y, m, d] = dateKey.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function isCurrentOrPastWeek(weekOffset: number, reference = new Date()): boolean {
  return weekOffset <= 0
}
