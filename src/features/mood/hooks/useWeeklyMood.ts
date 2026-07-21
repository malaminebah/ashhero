import { useCallback, useMemo, useState } from 'react'
import { useFocusEffect } from 'expo-router'
import { getCurrentUid } from '@/src/services'
import {
  getMoodEntry,
  listMoodEntries,
  saveMoodEntry,
  MoodAlreadyFilledError,
} from '@/src/services/mood.service'
import { useTrackerStore } from '@/src/features/tracker/store'
import { MOOD_XP_REWARD } from '../moodTaxonomy'
import type { MoodEntry, PrimaryMood } from '../types'
import { formatLocalDate, getCurrentWeekDays, getISOWeekId } from '../utils/weekDates'

type SaveInput = {
  primary: PrimaryMood
  sub: string
}

export function useWeeklyMood() {
  const weekDays = useMemo(() => getCurrentWeekDays(), [])
  const todayKey = formatLocalDate(new Date())

  const [entriesByDate, setEntriesByDate] = useState<Record<string, MoodEntry>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const refresh = useCallback(async () => {
    const uid = getCurrentUid()
    if (!uid) {
      setEntriesByDate({})
      setIsLoading(false)
      setError('Connecte-toi pour enregistrer ton humeur.')
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
  }, [weekDays])

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
      const uid = getCurrentUid()
      if (!uid) {
        setError('Connecte-toi pour enregistrer ton humeur.')
        throw new Error('Non connecté')
      }
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
        useTrackerStore.getState().addXp(MOOD_XP_REWARD)
        const saved = await getMoodEntry(uid, todayKey)
        if (saved) {
          setEntriesByDate((prev) => ({ ...prev, [todayKey]: saved }))
        }
        return saved
      } catch (e) {
        if (e instanceof MoodAlreadyFilledError) {
          setError('Tu as déjà renseigné ton humeur aujourd\'hui.')
        } else if (e instanceof Error && /unavailable|offline|network/i.test(e.message)) {
          setError('Hors ligne. Réessaie quand tu as du réseau.')
        } else if (e instanceof Error && /permission/i.test(e.message)) {
          setError('Firestore : permission refusée. Déploie les rules.')
        } else {
          setError('Enregistrement impossible. Réessaie.')
        }
        throw e
      } finally {
        setIsSaving(false)
      }
    },
    [canFillToday, todayKey]
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
