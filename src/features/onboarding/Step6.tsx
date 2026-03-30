import React from 'react'
import { View, Text } from 'react-native'
import { useRouter } from 'expo-router'
import { useOnboardingStore } from './store'
import { useOnboardingSubmit } from './hooks/useOnboardingSubmit'
import { OnboardingHeader } from './components/OnboardingHeader'
import { OnboardingPrimaryButton } from './components/OnboardingPrimaryButton'

const Step6 = () => {
  const router = useRouter()
  const reset = useOnboardingStore((s) => s.reset)
  const { submit } = useOnboardingSubmit()

  const onStart = async () => {
    await submit()
    reset()
    router.replace('/(tabs)' as never)
  }

  return (
    <View className="flex-1 justify-center bg-brand-bg px-6 pb-12 pt-4">
      <OnboardingHeader
        step={6}
        title="Tu es prêt"
        subtitle="Ton dashboard, tes combats et tes jalons t’attendent. Un pas de plus vers le héros sans fumée."
      />
      <View className="mb-10 items-center rounded-2xl border border-brand-accent/30 bg-brand-accent/10 px-5 py-8">
        <Text className="text-5xl">⚔️</Text>
        <Text className="mt-4 text-center font-mono text-sm leading-5 text-white/70">
          Chaque envie vaincue te fait gagner de l&apos;XP. Bienvenue dans ton aventure.
        </Text>
      </View>
      <OnboardingPrimaryButton label={"Commencer l'aventure"} onPress={onStart} />
    </View>
  )
}

export default Step6
