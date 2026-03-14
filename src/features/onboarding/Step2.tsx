import React from 'react'
import { View, Pressable, Text } from 'react-native'
import { useRouter } from 'expo-router'
import { useOnboardingStore } from './store'

const Step2 = () => {
  const { setField } = useOnboardingStore()
  const router = useRouter()

  return (
    <View className="flex-1 bg-brand-bg p-6 pt-12">
      <Text className="text-white text-xl font-mono mb-8">
        C’est ta première fois ?
      </Text>
      <Pressable
        onPress={() => {
          setField('isFirstTime', true)
          router.push('/onboarding/step3' as never)
        }}
        className="w-full py-4 rounded-xl items-center justify-center bg-brand-accentDark active:opacity-90 mb-3"
      >
        <Text className="text-white text-sm font-mono tracking-widest uppercase">
          Oui, je suis plein de confiance
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          setField('isFirstTime', false)
          router.push('/onboarding/step3' as never)
        }}
        className="w-full py-4 rounded-xl items-center justify-center border border-brand-accent/50 bg-transparent active:opacity-90"
      >
        <Text className="text-brand-accent text-sm font-mono tracking-widest uppercase">
          Non, pas la première
        </Text>
      </Pressable>
    </View>
  )
}

export default Step2
