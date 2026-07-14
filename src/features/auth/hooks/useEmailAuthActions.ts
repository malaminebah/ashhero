import { useCallback, useState } from 'react'
import {
  linkAnonymousWithEmail,
  registerWithEmail,
  sendPasswordReset,
  signInAnon,
  signInWithEmail,
  signOutUser,
} from '@/src/services'
import { useSessionStore } from '../sessionStore'
import { authErrorToUserMessage, type AuthErrorContext } from '../utils/authErrors'

type Status = { error: string | null; pending: boolean }

export const useEmailAuthActions = () => {
  const [state, setState] = useState<Status>({ error: null, pending: false })

  const clearError = useCallback(() => {
    setState((s) => ({ ...s, error: null }))
  }, [])

  const wrap = useCallback(
    async <T,>(
      fn: () => Promise<T>,
      errorContext: AuthErrorContext = 'signIn',
      anonymous = false
    ): Promise<T | undefined> => {
      setState({ error: null, pending: true })
      try {
        const result = await fn()
        if (typeof result === 'string') {
          useSessionStore.getState().setFromAuth(result, anonymous)
        }
        setState({ error: null, pending: false })
        return result
      } catch (e) {
        setState({ error: authErrorToUserMessage(e, errorContext), pending: false })
        return undefined
      }
    },
    []
  )

  const signIn = useCallback(
    (email: string, password: string) =>
      wrap(() => signInWithEmail(email, password)),
    [wrap]
  )

  const signInAsGuest = useCallback(
    () => wrap(() => signInAnon(), 'signIn', true),
    [wrap]
  )

  const register = useCallback(
    (email: string, password: string) =>
      wrap(() => registerWithEmail(email, password)),
    [wrap]
  )

  const linkAccount = useCallback(
    (email: string, password: string) =>
      wrap(() => linkAnonymousWithEmail(email, password)),
    [wrap]
  )

  const sendReset = useCallback(
    (email: string) =>
      wrap(
        async () => {
          await sendPasswordReset(email)
          return true
        },
        'passwordReset'
      ),
    [wrap]
  )

  const signOut = useCallback(
    () =>
      wrap(async () => {
        await signOutUser()
        useSessionStore.getState().setFromAuth(null)
        return true
      }),
    [wrap]
  )

  return {
    error: state.error,
    pending: state.pending,
    clearError,
    signIn,
    signInAsGuest,
    register,
    linkAccount,
    sendReset,
    signOut,
  }
}
