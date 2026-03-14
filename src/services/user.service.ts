import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  Timestamp,
} from 'firebase/firestore'
import { db } from './firebase'
import { TrackerConfig } from '@/src/features/tracker/types'

export const saveProfile = async (
  uid: string,
  profile: TrackerConfig
): Promise<void> => {
  console.log('[saveProfile]', { uid, unlockedEtapes: profile.unlockedEtapes })
  await setDoc(doc(db, 'users', uid, 'profile', 'data'), {
    ...profile,
    quitDate: profile.quitDate ? Timestamp.fromDate(profile.quitDate) : null,
  })
  console.log('[saveProfile] done')
}

export const getProfile = async (
  uid: string
): Promise<TrackerConfig | null> => {
  const snap = await getDoc(doc(db, 'users', uid, 'profile', 'data'))
  if (!snap.exists()) return null
  const data = snap.data()
  return {
    ...data,

    quitDate: data.quitDate ? data.quitDate.toDate() : null,
  } as TrackerConfig
}

export const addRelapse = async (
  uid: string,
  streakBefore: number
): Promise<void> => {
  await addDoc(collection(db, 'users', uid, 'relapses'), {
    date: Timestamp.now(),
    streakBefore,
  })
}

export const addEtape = async (uid: string, etape: string): Promise<void> => {
  await addDoc(collection(db, 'users', uid, 'etapes'), {
    unlockedAt: Timestamp.now(),
    etape,
  })
}
export const addCombat = async (
  uid: string,
  xpGained: number,
  action: string
): Promise<void> => {
  await addDoc(collection(db, 'users', uid, 'combats'), {
    date: Timestamp.now(),
    xpGained,
    action,
  })
}
