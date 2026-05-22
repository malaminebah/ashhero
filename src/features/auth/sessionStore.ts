import { create } from 'zustand'

type SessionState = {
  uid: string | null
  authReady: boolean
  hasServerProfile: boolean | null
  setFromAuth: (uid: string | null) => void
  setProfileResolved: (hasProfile: boolean) => void
}

export const useSessionStore = create<SessionState>((set) => ({
  uid: null,
  authReady: false,
  hasServerProfile: null,
  setFromAuth: (uid) =>
    set((state) => ({
      uid,
      authReady: true,
      hasServerProfile: state.uid === uid ? state.hasServerProfile : null,
    })),
  setProfileResolved: (hasProfile) => set({ hasServerProfile: hasProfile }),
}))
