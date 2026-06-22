import React from 'react'
import { Stack, usePathname } from 'expo-router'
import { View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'

const STEPS = ['step1', 'step2', 'step3', 'step4', 'step5']

export default function OnboardingLayout() {
  const pathname = usePathname()
  const currentStep = pathname.split('/').pop()
  const stepIndex = STEPS.indexOf(currentStep ?? '')
  const progress = stepIndex >= 0 ? (stepIndex + 1) / STEPS.length : 0

  return (
    <SafeAreaView className="flex-1 bg-flow-bg" edges={['top']}>
      <StatusBar style="dark" />
      <View className="h-1 w-full bg-flow-border">
        <View
          className="h-1 rounded-full bg-flow-cta"
          style={{ width: `${progress * 100}%` }}
        />
      </View>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#FFFFFF' } }}>
        <Stack.Screen name="step1" />
        <Stack.Screen name="step2" />
        <Stack.Screen name="step3" />
        <Stack.Screen name="step4" />
        <Stack.Screen name="step5" />
      </Stack>
    </SafeAreaView>
  )
}
