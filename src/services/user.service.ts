import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './firebase'
import type {
  TrackerConfig,
  CombatAction,
  CombatResult,
} from '@/src/features/tracker/types'

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
    xp: typeof data.xp === 'number' ? data.xp : 0,
    level: typeof data.level === 'number' ? data.level : 1,
    combatsWon: typeof data.combatsWon === 'number' ? data.combatsWon : 0,
    combatsLost: typeof data.combatsLost === 'number' ? data.combatsLost : 0,
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
export type CombatFirestorePayload = {
  action: CombatAction
  xpGained: number
  result: CombatResult
}

export const addCombat = async (
  uid: string,
  payload: CombatFirestorePayload
): Promise<void> => {
  await addDoc(collection(db, 'users', uid, 'combats'), {
    ...payload,
    date: serverTimestamp(),
  })
}
