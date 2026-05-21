import { create } from 'zustand'

type SessionState = {
  uid: string | null
  authReady: boolean
  /** null = profil pas encore chargé pour cet uid ; source de vérité = Firestore via _layout */
  hasServerProfile: boolean | null
  setFromAuth: (uid: string | null) => void
  setProfileResolved: (hasProfile: boolean) => void
}

/**
 * Synchronisé par app/_layout via onAuthStateChanged (jamais écrit depuis un .tsx d’écran).
 */
export const useSessionStore = create<SessionState>((set) => ({
  uid: null,
  authReady: false,
  hasServerProfile: null,
  setFromAuth: (uid) => set({ uid, authReady: true, hasServerProfile: null }),
  setProfileResolved: (hasProfile) => set({ hasServerProfile: hasProfile }),
}))
