import React from 'react'
import { Redirect, Stack, usePathname } from 'expo-router'
import { View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSessionStore } from '@/src/features/auth/sessionStore'

const STEPS = ['step1', 'step2', 'step3', 'step4', 'step5', 'step6', 'step7', 'step8']

/** Profile is saved on the promise screen — these outro screens must not redirect away. */
const OUTRO_SCREENS = ['promise', 'social-proof']

export default function OnboardingLayout() {
  const pathname = usePathname()
  const uid = useSessionStore((s) => s.uid)
  const authReady = useSessionStore((s) => s.authReady)
  const hasServerProfile = useSessionStore((s) => s.hasServerProfile)
  const currentStep = pathname.split('/').pop() ?? ''
  const stepIndex = STEPS.indexOf(currentStep)
  const isOutro = OUTRO_SCREENS.includes(currentStep)
  const progress = isOutro ? 1 : stepIndex >= 0 ? (stepIndex + 1) / STEPS.length : 0

  if (authReady && !uid) {
    return <Redirect href={'/auth/login' as never} />
  }

  if (authReady && hasServerProfile === true && !isOutro) {
    return <Redirect href={'/(tabs)' as never} />
  }

  return (
    <SafeAreaView className="flex-1 bg-flow-bg" edges={['top']}>
      <StatusBar style="dark" />
      <View className="h-1 w-full bg-flow-border">
        <View
          className="h-1 rounded-full bg-flow-cta"
          style={{ width: `${progress * 100}%` }}
        />
      </View>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#FFFFFF' } }} />
    </SafeAreaView>
  )
}
