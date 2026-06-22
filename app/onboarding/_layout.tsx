import React from 'react'
import { Stack, usePathname } from 'expo-router'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const STEPS = ['step1', 'step2', 'step3', 'step4', 'step5', 'step6']

export default function OnboardingLayout() {
  const pathname = usePathname()
  const currentStep = pathname.split('/').pop()
  const stepIndex = STEPS.indexOf(currentStep ?? '')
  const progress = stepIndex >= 0 ? (stepIndex + 1) / STEPS.length : 0

  return (
    <SafeAreaView className="flex-1 bg-brand-bg" edges={['top']}>
      <View className="h-1 w-full bg-white/6">
        <View
          className="h-1 rounded-full bg-brand-success"
          style={{ width: `${progress * 100}%` }}
        />
      </View>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#08000f' } }}>
        <Stack.Screen name="step1" />
        <Stack.Screen name="step2" />
        <Stack.Screen name="step3" />
        <Stack.Screen name="step4" />
        <Stack.Screen name="step5" />
        <Stack.Screen name="step6" />
      </Stack>
    </SafeAreaView>
  )
}
