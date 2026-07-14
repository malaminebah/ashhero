import { useCallback, useMemo, useState } from 'react'
import { useFocusEffect } from 'expo-router'
import { getCurrentUid } from '@/src/services'
import { listMoodEntries } from '@/src/services/mood.service'
import type { MoodEntry } from '../types'
import { getWeekDaysWithOffset } from '../utils/weekDates'
import { computeMoodInsights, type MoodInsights } from '../utils/moodInsights'

const EMPTY: MoodInsights = {
  streak: 0,
  streakCapped: false,
  weekAvg: null,
  prevWeekAvg: null,
  trend: 'unknown',
  trendPct: null,
}

/** Loads current + previous week entries and derives streak / averages / trend. */
export function useMoodInsights() {
  const [entriesByDate, setEntriesByDate] = useState<Record<string, MoodEntry>>({})
  const [isLoading, setIsLoading] = useState(true)

  const currentWeekDates = useMemo(
    () => getWeekDaysWithOffset(0).map((d) => d.date),
    []
  )
  const prevWeekDates = useMemo(
    () => getWeekDaysWithOffset(-1).map((d) => d.date),
    []
  )

  const refresh = useCallback(async () => {
    const uid = getCurrentUid()
    if (!uid) {
      setEntriesByDate({})
      setIsLoading(false)
      return
    }
    setIsLoading(true)
    try {
      const entries = await listMoodEntries(uid, [...prevWeekDates, ...currentWeekDates])
      setEntriesByDate(entries)
    } catch {
      // Insights are decorative — history screen surfaces load errors already.
    } finally {
      setIsLoading(false)
    }
  }, [currentWeekDates, prevWeekDates])

  useFocusEffect(
    useCallback(() => {
      void refresh()
    }, [refresh])
  )

  const insights = useMemo(
    () =>
      isLoading
        ? EMPTY
        : computeMoodInsights(currentWeekDates, prevWeekDates, entriesByDate),
    [isLoading, currentWeekDates, prevWeekDates, entriesByDate]
  )

  return { ...insights, isLoading }
}
