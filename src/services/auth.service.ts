import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from './firebase'

/**
 * Session anonyme Firebase (V1) — à proposer en parallèle de l’e-mail (voir `docs/firebase-auth-strategy.md`).
 */
export const signInAnon = async (): Promise<string> => {
  const { user } = await signInAnonymously(auth)
  return user.uid
}

export const registerWithEmail = async (
  email: string,
  password: string
): Promise<string> => {
  const { user } = await createUserWithEmailAndPassword(
    auth,
    email.trim(),
    password
  )
  return user.uid
}

export const signInWithEmail = async (
  email: string,
  password: string
): Promise<string> => {
  const { user } = await signInWithEmailAndPassword(
    auth,
    email.trim(),
    password
  )
  return user.uid
}

export const sendPasswordReset = async (email: string): Promise<void> => {
  await sendPasswordResetEmail(auth, email.trim())
}

export const signOutUser = async (): Promise<void> => {
  await signOut(auth)
}

export const getCurrentUid = (): string | null => {
  return auth.currentUser?.uid ?? null
}

export const onAuthReady = (callback: (uid: string | null) => void) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user?.uid ?? null)
  })
}
