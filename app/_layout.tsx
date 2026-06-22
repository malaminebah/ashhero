import '../global.css'
import '@/constants/setupDefaultFont'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'

import { useColorScheme } from '@/hooks/use-color-scheme'
import { useEffect, useRef, useState } from 'react'

SplashScreen.preventAutoHideAsync()
import { getProfile, onAuthReady } from '@/src/services'
import { useOnboardingStore } from '@/src/features/onboarding/store'
import { useTrackerStore } from '@/src/features/tracker/store'
import { useSessionStore } from '@/src/features/auth/sessionStore'
import { OnboardingPrimaryButton } from '@/src/features/onboarding/components/OnboardingPrimaryButton'
import { OnboardingText } from '@/src/features/onboarding/components/OnboardingText'
import { View } from 'react-native'

export const unstable_settings = {
  initialRouteName: 'index',
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    M5x7: require('@/assets/fonts/m5x7.ttf'),
  })

  const colorScheme = useColorScheme()
  const initialize = useTrackerStore((s) => s.initialize)
  const resetTracker = useTrackerStore((s) => s.reset)
  const setFromAuth = useSessionStore((s) => s.setFromAuth)
  const setProfileResolved = useSessionStore((s) => s.setProfileResolved)
  const uid = useSessionStore((s) => s.uid)
  const authReady = useSessionStore((s) => s.authReady)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [profileRetryNonce, setProfileRetryNonce] = useState(0)
  const [trackerHydrated, setTrackerHydrated] = useState(() =>
    useTrackerStore.persist.hasHydrated()
  )
  const prevUidRef = useRef<string | null>(null)

  useEffect(() => {
    if (fontsLoaded) void SplashScreen.hideAsync()
  }, [fontsLoaded])

  useEffect(() => {
    return onAuthReady((userUid) => {
      setFromAuth(userUid)
      setIsLoading(false)
    })
  }, [setFromAuth])

  useEffect(() => {
    if (useTrackerStore.persist.hasHydrated()) setTrackerHydrated(true)
    return useTrackerStore.persist.onFinishHydration(() => {
      setTrackerHydrated(true)
    })
  }, [])

  useEffect(() => {
    if (!authReady) return

    if (!uid) {
      if (prevUidRef.current !== null) {
        resetTracker()
        useOnboardingStore.getState().reset()
      }
      prevUidRef.current = null
      return
    }

    if (!trackerHydrated) return

    if (prevUidRef.current !== null && prevUidRef.current !== uid) {
      resetTracker()
      useOnboardingStore.getState().reset()
    }
    prevUidRef.current = uid

    let cancelled = false
    const runUid = uid

    void (async () => {
      try {
        setError(null)
        const profile = await getProfile(runUid)
        if (cancelled) return
        if (useSessionStore.getState().uid !== runUid) return
        if (profile) {
          initialize(profile)
          setProfileResolved(true)
        } else {
          resetTracker()
          useOnboardingStore.getState().reset()
          setProfileResolved(false)
        }
      } catch (e) {
        if (cancelled) return
        if (useSessionStore.getState().uid !== runUid) return
        console.warn('[root layout] getProfile', e)
        setError('Impossible de charger le profil. Vérifie ta connexion.')
      }
    })()

    return () => {
      cancelled = true
    }
  }, [
    authReady,
    uid,
    trackerHydrated,
    initialize,
    resetTracker,
    profileRetryNonce,
    setProfileResolved,
  ])

  if (!fontsLoaded) return null

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-flow-bg">
        <OnboardingText className="text-sm text-flow-muted">Chargement…</OnboardingText>
      </View>
    )
  }
  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-flow-bg p-6">
        <OnboardingText className="mb-6 text-center text-[15px] leading-6 text-flow-muted">
          {error}
        </OnboardingText>
        <View className="w-full max-w-xs">
          <OnboardingPrimaryButton
            label="Réessayer"
            onPress={() => {
              setError(null)
              setProfileRetryNonce((n) => n + 1)
            }}
          />
        </View>
      </View>
    )
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="modal"
          options={{ presentation: 'modal', title: 'Modal' }}
        />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ headerShown: false }} />
        <Stack.Screen name="mood" options={{ headerShown: false }} />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  )
}
