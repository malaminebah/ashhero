import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'
import type { MoodEntry } from '@/src/features/mood/types'

export class MoodAlreadyFilledError extends Error {
  constructor(date: string) {
    super(`Mood entry already exists for ${date}`)
    this.name = 'MoodAlreadyFilledError'
  }
}

export async function getMoodEntry(
  uid: string,
  date: string
): Promise<MoodEntry | null> {
  const snap = await getDoc(doc(db, 'users', uid, 'moodEntries', date))
  if (!snap.exists()) return null
  const data = snap.data()
  return {
    date: data.date as string,
    weekId: data.weekId as string,
    primary: data.primary as MoodEntry['primary'],
    sub: data.sub as string,
    createdAt:
      typeof data.createdAt?.toDate === 'function'
        ? data.createdAt.toDate().toISOString()
        : String(data.createdAt ?? ''),
  }
}

export async function listMoodEntries(
  uid: string,
  dates: string[]
): Promise<Record<string, MoodEntry>> {
  const entries: Record<string, MoodEntry> = {}
  await Promise.all(
    dates.map(async (date) => {
      const entry = await getMoodEntry(uid, date)
      if (entry) entries[date] = entry
    })
  )
  return entries
}

export async function saveMoodEntry(
  uid: string,
  entry: Omit<MoodEntry, 'createdAt'>
): Promise<void> {
  const ref = doc(db, 'users', uid, 'moodEntries', entry.date)
  const existing = await getDoc(ref)
  if (existing.exists()) throw new MoodAlreadyFilledError(entry.date)

  await setDoc(ref, {
    ...entry,
    createdAt: serverTimestamp(),
  })
}
