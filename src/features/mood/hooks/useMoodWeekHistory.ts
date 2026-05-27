import { useCallback, useMemo, useState } from 'react'
import { useFocusEffect } from 'expo-router'
import { useSessionStore } from '@/src/features/auth/sessionStore'
import { listMoodEntries } from '@/src/services/mood.service'
import type { MoodEntry } from '../types'
import {
  formatWeekRangeLabel,
  getWeekDaysWithOffset,
} from '../utils/weekDates'

export function useMoodWeekHistory(initialOffset = 0) {
  const uid = useSessionStore((s) => s.uid)
  const [weekOffset, setWeekOffset] = useState(initialOffset)
  const [entriesByDate, setEntriesByDate] = useState<Record<string, MoodEntry>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const weekDays = useMemo(() => getWeekDaysWithOffset(weekOffset), [weekOffset])
  const weekLabel = useMemo(() => formatWeekRangeLabel(weekDays), [weekDays])
  const canGoNext = weekOffset < 0

  const refresh = useCallback(async () => {
    if (!uid) {
      setEntriesByDate({})
      setIsLoading(false)
      return
    }
    setIsLoading(true)
    setError(null)
    try {
      const dates = weekDays.map((d) => d.date)
      const entries = await listMoodEntries(uid, dates)
      setEntriesByDate(entries)
    } catch {
      setError('Impossible de charger l’historique.')
    } finally {
      setIsLoading(false)
    }
  }, [uid, weekDays])

  useFocusEffect(
    useCallback(() => {
      void refresh()
    }, [refresh])
  )

  const goPrevWeek = useCallback(() => {
    setWeekOffset((o) => o - 1)
  }, [])

  const goNextWeek = useCallback(() => {
    if (!canGoNext) return
    setWeekOffset((o) => o + 1)
  }, [canGoNext])

  return {
    weekDays,
    weekLabel,
    entriesByDate,
    weekOffset,
    canGoNext,
    isLoading,
    error,
    goPrevWeek,
    goNextWeek,
    refresh,
  }
}
