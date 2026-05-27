import { useCallback, useMemo, useState } from 'react'
import { useFocusEffect } from 'expo-router'
import { useSessionStore } from '@/src/features/auth/sessionStore'
import {
  getMoodEntry,
  listMoodEntries,
  saveMoodEntry,
  MoodAlreadyFilledError,
} from '@/src/services/mood.service'
import type { MoodEntry, PrimaryMood } from '../types'
import { formatLocalDate, getCurrentWeekDays, getISOWeekId } from '../utils/weekDates'

type SaveInput = {
  primary: PrimaryMood
  sub: string
}

export function useWeeklyMood() {
  const uid = useSessionStore((s) => s.uid)
  const weekDays = useMemo(() => getCurrentWeekDays(), [])
  const todayKey = formatLocalDate(new Date())

  const [entriesByDate, setEntriesByDate] = useState<Record<string, MoodEntry>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

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
      setError('Impossible de charger ton humeur.')
    } finally {
      setIsLoading(false)
    }
  }, [uid, weekDays])

  useFocusEffect(
    useCallback(() => {
      void refresh()
    }, [refresh])
  )

  const todayEntry = entriesByDate[todayKey] ?? null
  const canFillToday = todayEntry == null
  const filledCount = Object.keys(entriesByDate).length

  const saveToday = useCallback(
    async ({ primary, sub }: SaveInput) => {
      if (!uid) throw new Error('Non connecté')
      if (!canFillToday) throw new MoodAlreadyFilledError(todayKey)

      setIsSaving(true)
      setError(null)
      try {
        const entry: Omit<MoodEntry, 'createdAt'> = {
          date: todayKey,
          weekId: getISOWeekId(new Date()),
          primary,
          sub,
        }
        await saveMoodEntry(uid, entry)
        const saved = await getMoodEntry(uid, todayKey)
        if (saved) {
          setEntriesByDate((prev) => ({ ...prev, [todayKey]: saved }))
        }
        return saved
      } catch (e) {
        if (e instanceof MoodAlreadyFilledError) {
          setError('Tu as déjà renseigné ton humeur aujourd’hui.')
        } else {
          setError('Enregistrement impossible. Réessaie.')
        }
        throw e
      } finally {
        setIsSaving(false)
      }
    },
    [uid, canFillToday, todayKey]
  )

  return {
    weekDays,
    entriesByDate,
    todayEntry,
    canFillToday,
    filledCount,
    isLoading,
    isSaving,
    error,
    refresh,
    saveToday,
  }
}
