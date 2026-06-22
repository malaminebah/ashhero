import { Redirect } from 'expo-router'
import { useSessionStore } from '../sessionStore'

export const AuthEntryRedirect = () => {
  const uid = useSessionStore((s) => s.uid)
  const authReady = useSessionStore((s) => s.authReady)

  if (authReady && uid) {
    return <Redirect href={'/' as never} />
  }

  return null
}
