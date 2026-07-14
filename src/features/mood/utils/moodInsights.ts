import { getPrimaryMood } from '../moodTaxonomy'
import type { MoodEntry } from '../types'
import { formatLocalDate } from './weekDates'

/** Insights window — 14 daily reads keeps Firestore cost bounded; streak caps there. */
export const INSIGHTS_WINDOW_DAYS = 14

export type MoodTrend = 'up' | 'down' | 'flat' | 'unknown'

export type MoodInsights = {
  /** Consecutive filled days ending today (or yesterday if today is empty). Capped at window. */
  streak: number
  streakCapped: boolean
  /** Average score (1..5) of current week entries — null if no entry. */
  weekAvg: number | null
  prevWeekAvg: number | null
  trend: MoodTrend
  /** Signed percent difference vs previous week (rounded), only when both weeks have data. */
  trendPct: number | null
}

export function entryScore(entry: MoodEntry): number {
  return getPrimaryMood(entry.primary).score
}

export function averageScore(
  dates: string[],
  entriesByDate: Record<string, MoodEntry>
): number | null {
  const scores = dates
    .map((d) => entriesByDate[d])
    .filter((e): e is MoodEntry => e != null)
    .map(entryScore)
  if (scores.length === 0) return null
  return scores.reduce((sum, s) => sum + s, 0) / scores.length
}

export function computeStreak(
  entriesByDate: Record<string, MoodEntry>,
  reference = new Date(),
  windowDays = INSIGHTS_WINDOW_DAYS
): { streak: number; capped: boolean } {
  const cursor = new Date(reference)
  // Today not filled yet must not break an ongoing streak.
  if (!entriesByDate[formatLocalDate(cursor)]) {
    cursor.setDate(cursor.getDate() - 1)
  }

  let streak = 0
  while (streak < windowDays && entriesByDate[formatLocalDate(cursor)]) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return { streak, capped: streak >= windowDays }
}

export function computeTrend(
  weekAvg: number | null,
  prevWeekAvg: number | null
): { trend: MoodTrend; trendPct: number | null } {
  if (weekAvg == null || prevWeekAvg == null || prevWeekAvg === 0) {
    return { trend: 'unknown', trendPct: null }
  }
  const pct = Math.round(((weekAvg - prevWeekAvg) / prevWeekAvg) * 100)
  if (pct > 3) return { trend: 'up', trendPct: pct }
  if (pct < -3) return { trend: 'down', trendPct: pct }
  return { trend: 'flat', trendPct: pct }
}

export function computeMoodInsights(
  currentWeekDates: string[],
  prevWeekDates: string[],
  entriesByDate: Record<string, MoodEntry>,
  reference = new Date()
): MoodInsights {
  const weekAvg = averageScore(currentWeekDates, entriesByDate)
  const prevWeekAvg = averageScore(prevWeekDates, entriesByDate)
  const { streak, capped } = computeStreak(entriesByDate, reference)
  const { trend, trendPct } = computeTrend(weekAvg, prevWeekAvg)
  return { streak, streakCapped: capped, weekAvg, prevWeekAvg, trend, trendPct }
}
