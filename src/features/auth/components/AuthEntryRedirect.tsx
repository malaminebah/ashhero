import { Redirect } from 'expo-router'
import { useSessionStore } from '../sessionStore'

/** Auth screens bounce to the app only when a finished profile exists —
 * a guest session without onboarding stays on the welcome screen. */
export const AuthEntryRedirect = () => {
  const uid = useSessionStore((s) => s.uid)
  const authReady = useSessionStore((s) => s.authReady)
  const hasServerProfile = useSessionStore((s) => s.hasServerProfile)

  if (authReady && uid && hasServerProfile === true) {
    return <Redirect href={'/(tabs)' as never} />
  }

  return null
}
