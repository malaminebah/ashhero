import {
  createUserWithEmailAndPassword,
  deleteUser,
  EmailAuthProvider,
  linkWithCredential,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from './firebase'
import { purgeUserData } from './user.service'

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

/**
 * Deletes all Firestore data then the Firebase Auth account itself.
 * Order matters: Firestore is purged first, while still authenticated as `uid`
 * (rules deny writes once the Auth user is gone).
 * If the session is too old, Firebase throws `auth/requires-recent-login` —
 * caller shows a message asking the user to sign out/in and retry, no reauth modal (MVP scope).
 */
export const deleteAccount = async (): Promise<void> => {
  const user = auth.currentUser
  if (!user) throw new Error('no-current-user')
  await purgeUserData(user.uid)
  await deleteUser(user)
}

/** Upgrades the anonymous session to email+password — keeps the same uid (profile preserved). */
export const linkAnonymousWithEmail = async (
  email: string,
  password: string
): Promise<string> => {
  const user = auth.currentUser
  if (!user || !user.isAnonymous) {
    throw new Error('link-requires-anonymous-session')
  }
  const credential = EmailAuthProvider.credential(email.trim(), password)
  const { user: linked } = await linkWithCredential(user, credential)
  return linked.uid
}

export const getCurrentUid = (): string | null => {
  return auth.currentUser?.uid ?? null
}

export const isCurrentUserAnonymous = (): boolean => {
  return auth.currentUser?.isAnonymous ?? false
}

export const onAuthReady = (
  callback: (uid: string | null, isAnonymous: boolean) => void
) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user?.uid ?? null, user?.isAnonymous ?? false)
  })
}
