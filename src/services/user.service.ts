import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
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
  if (__DEV__) {
    console.log('[saveProfile]', { uid, unlockedEtapes: profile.unlockedEtapes })
  }
  await setDoc(doc(db, 'users', uid, 'profile', 'data'), {
    ...profile,
    quitDate: profile.quitDate ? Timestamp.fromDate(profile.quitDate) : null,
  })
  if (__DEV__) {
    console.log('[saveProfile] done')
  }
}

export const deleteProfile = async (uid: string): Promise<void> => {
  await deleteDoc(doc(db, 'users', uid, 'profile', 'data'))
}

const USER_SUBCOLLECTIONS = ['relapses', 'etapes', 'combats', 'moodEntries'] as const

/** Deletes every document under users/{uid} (subcollections + profile). Used for real account deletion (RGPD/store). */
export const purgeUserData = async (uid: string): Promise<void> => {
  await Promise.all(
    USER_SUBCOLLECTIONS.map(async (name) => {
      const snap = await getDocs(collection(db, 'users', uid, name))
      await Promise.all(snap.docs.map((docSnap) => deleteDoc(docSnap.ref)))
    })
  )
  await deleteProfile(uid)
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
    vapeBottleVolumeMl:
      typeof data.vapeBottleVolumeMl === 'number' ? data.vapeBottleVolumeMl : null,
    vapeBottlePriceEuro:
      typeof data.vapeBottlePriceEuro === 'number' ? data.vapeBottlePriceEuro : null,
    vapeMlPerWeek: typeof data.vapeMlPerWeek === 'number' ? data.vapeMlPerWeek : null,
    yearsUsing: typeof data.yearsUsing === 'number' ? data.yearsUsing : null,
    triggers: Array.isArray(data.triggers) ? data.triggers : [],
    motivations: Array.isArray(data.motivations) ? data.motivations : [],
    heroName:
      typeof data.heroName === 'string' && data.heroName.trim().length > 0
        ? data.heroName.trim().slice(0, 32)
        : null,
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
