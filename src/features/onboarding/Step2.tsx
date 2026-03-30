import React from 'react'
import { View, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { useOnboardingStore } from './store'
import { OnboardingHeader } from './components/OnboardingHeader'
import { OnboardingChoiceCard } from './components/OnboardingChoiceCard'

const Step2 = () => {
  const setField = useOnboardingStore((s) => s.setField)
  const router = useRouter()

  return (
    <ScrollView
      className="flex-1 bg-brand-bg px-6 pb-10 pt-4"
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <OnboardingHeader
        step={2}
        title="Première fois ?"
        subtitle="Ça nous aide à calibrer ton parcours et tes encouragements."
      />
      <View>
        <OnboardingChoiceCard
          emoji="✨"
          label="Oui, je suis plein de confiance"
          variant="primary"
          onPress={() => {
            setField('isFirstTime', true)
            router.push('/onboarding/step3' as never)
          }}
        />
        <OnboardingChoiceCard
          emoji="⚔️"
          label="Non, pas la première"
          variant="outline"
          onPress={() => {
            setField('isFirstTime', false)
            router.push('/onboarding/step3' as never)
          }}
        />
      </View>
    </ScrollView>
  )
}

export default Step2
