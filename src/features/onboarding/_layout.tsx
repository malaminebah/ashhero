import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack, usePathname } from 'expo-router'

const STEPS = ['step1', 'step2', 'step3', 'step4', 'step5', 'step6']

export default function OnboardingLayout() {
  const pathname = usePathname()
  const currentStep = pathname.split('/').pop()
  const stepIndex = STEPS.indexOf(currentStep ?? '')
  const progress = (stepIndex + 1) / STEPS.length

  return (
    <SafeAreaView className="flex-1 bg-brand-bg" edges={['top']}>
      <View className="h-1 w-full bg-white/10">
        <View
          className="h-1 rounded-full bg-brand-accent"
          style={{ width: `${progress * 100}%` }}
        />
      </View>
      <View className="flex-1">
      <Stack>
        <Stack.Screen name="step1" options={{ headerShown: false }} />
        <Stack.Screen name="step2" options={{ headerShown: false }} />
        <Stack.Screen name="step3" options={{ headerShown: false }} />
        <Stack.Screen name="step4" options={{ headerShown: false }} />
        <Stack.Screen name="step5" options={{ headerShown: false }} />
        <Stack.Screen name="step6" options={{ headerShown: false }} />
      </Stack>
      </View>
    </SafeAreaView>
  )
}
