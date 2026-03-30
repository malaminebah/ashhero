import React from 'react'
import { View, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { useOnboardingStore } from './store'
import { OnboardingHeader } from './components/OnboardingHeader'
import { OnboardingChoiceCard } from './components/OnboardingChoiceCard'

const Step1 = () => {
  const setField = useOnboardingStore((s) => s.setField)
  const router = useRouter()

  return (
    <ScrollView
      className="flex-1 bg-brand-bg px-6 pb-10 pt-4"
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <OnboardingHeader
        step={1}
        title="Ta habitude"
        subtitle="Choisis ce qui correspond le mieux — on adapte les stats derrière."
      />
      <View>
        <OnboardingChoiceCard
          emoji="🚬"
          label="Cigarettes"
          variant="primary"
          onPress={() => {
            setField('smokingType', 'cigarette')
            router.push('/onboarding/step2' as never)
          }}
        />
        <OnboardingChoiceCard
          emoji="💨"
          label="Vapoteuse"
          variant="outline"
          onPress={() => {
            setField('smokingType', 'vape')
            router.push('/onboarding/step2' as never)
          }}
        />
      </View>
    </ScrollView>
  )
}

export default Step1
