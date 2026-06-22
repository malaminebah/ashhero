import React from 'react'
import { View } from 'react-native'
import { useRouter } from 'expo-router'
import { useOnboardingStore } from './store'
import { OnboardingHeader } from './components/OnboardingHeader'
import { OnboardingChoiceCard } from './components/OnboardingChoiceCard'
import { OnboardingScreen } from './components/OnboardingScreen'

const Step2 = () => {
  const setField = useOnboardingStore((s) => s.setField)
  const router = useRouter()

  return (
    <OnboardingScreen>
      <OnboardingHeader
        step={2}
        title="Première fois ?"
        subtitle="Ça nous aide à calibrer ton parcours et tes encouragements."
      />
      <View>
        <OnboardingChoiceCard
          icon="star-four-points-outline"
          label="Oui, je suis plein de confiance"
          variant="primary"
          onPress={() => {
            setField('isFirstTime', true)
            router.push('/onboarding/step3' as never)
          }}
        />
        <OnboardingChoiceCard
          icon="history"
          label="Non, pas la première"
          onPress={() => {
            setField('isFirstTime', false)
            router.push('/onboarding/step3' as never)
          }}
        />
      </View>
    </OnboardingScreen>
  )
}

export default Step2
