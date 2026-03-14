import React from 'react'
import { Stack, usePathname } from 'expo-router'
import { View } from 'react-native'

const STEPS = ['step1', 'step2', 'step3', 'step4', 'step5', 'step6']

export default function OnboardingLayout() {
  const pathname = usePathname()
  const currentStep = pathname.split('/').pop()
  const stepIndex = STEPS.indexOf(currentStep ?? '')
  const progress = stepIndex >= 0 ? (stepIndex + 1) / STEPS.length : 0

  return (
    <View style={{ flex: 1 }}>
      <View className="h-1 w-full bg-white/10">
        <View
          className="h-1 bg-purple-500 rounded-full"
          style={{ width: `${progress * 100}%` }}
        />
      </View>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="step1" />
        <Stack.Screen name="step2" />
        <Stack.Screen name="step3" />
        <Stack.Screen name="step4" />
        <Stack.Screen name="step5" />
        <Stack.Screen name="step6" />
      </Stack>
    </View>
  )
}
