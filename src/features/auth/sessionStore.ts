import { create } from 'zustand'

type SessionState = {
  uid: string | null
  isAnonymous: boolean
  authReady: boolean
  hasServerProfile: boolean | null
  setFromAuth: (uid: string | null, isAnonymous?: boolean) => void
  setProfileResolved: (hasProfile: boolean) => void
}

export const useSessionStore = create<SessionState>((set) => ({
  uid: null,
  isAnonymous: false,
  authReady: false,
  hasServerProfile: null,
  setFromAuth: (uid, isAnonymous = false) =>
    set((state) => ({
      uid,
      isAnonymous: uid === null ? false : isAnonymous,
      authReady: true,
      hasServerProfile:
        uid === null ? null : state.uid === uid ? state.hasServerProfile : null,
    })),
  setProfileResolved: (hasProfile) => set({ hasServerProfile: hasProfile }),
}))
