import { signInAnonymously, onAuthStateChanged, } from 'firebase/auth'
import { auth } from './firebase'

export const signInAnon = async (): Promise<string> => {
  const { user } = await signInAnonymously(auth)
  return user.uid
}

export const getCurrentUid = (): string | null => {
  return auth.currentUser?.uid ?? null
}

export const onAuthReady = (callback: (uid: string | null) => void) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user?.uid ?? null)
  })
}