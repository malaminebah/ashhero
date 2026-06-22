import React from 'react'
import { Alert, Text, View } from 'react-native'
import { useRouter } from 'expo-router'
import { useOnboardingStore } from './store'
import { useOnboardingSubmit } from './hooks/useOnboardingSubmit'
import { OnboardingHeader } from './components/OnboardingHeader'
import { OnboardingPrimaryButton } from './components/OnboardingPrimaryButton'
import { OnboardingScreen } from './components/OnboardingScreen'
import { OnboardingMascot } from './components/OnboardingMascot'

const Step6 = () => {
  const router = useRouter()
  const reset = useOnboardingStore((s) => s.reset)
  const { submit } = useOnboardingSubmit()

  const onStart = async () => {
    const ok = await submit()
    if (!ok) {
      Alert.alert(
        'Enregistrement',
        "Impossible d'enregistrer ton profil. Vérifie la connexion et réessaie."
      )
      return
    }
    reset()
    router.replace('/(tabs)' as never)
  }

  return (
    <OnboardingScreen
      centered
      footer={<OnboardingPrimaryButton label="Commencer l'aventure" onPress={onStart} />}
    >
      <View className="items-center">
        <OnboardingMascot anim="victory" size="md" />
        <View className="mt-8 w-full">
          <OnboardingHeader
            step={6}
            title="Tu es prêt"
            subtitle="Ton dashboard, tes combats et tes jalons t'attendent."
          />
        </View>
        <Text className="text-center text-sm leading-6 text-white/55">
          Chaque envie vaincue te fait gagner de l&apos;XP. Bienvenue dans ton aventure.
        </Text>
      </View>
    </OnboardingScreen>
  )
}

export default Step6
