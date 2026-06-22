import React from 'react'
import { View } from 'react-native'
import { useRouter } from 'expo-router'
import { useOnboardingStore } from './store'
import { OnboardingHeader } from './components/OnboardingHeader'
import { OnboardingChoiceCard } from './components/OnboardingChoiceCard'
import { OnboardingScreen } from './components/OnboardingScreen'
import { OnboardingMascot } from './components/OnboardingMascot'

const Step1 = () => {
  const setField = useOnboardingStore((s) => s.setField)
  const router = useRouter()

  return (
    <OnboardingScreen>
      <View className="mb-6 items-center">
        <OnboardingMascot size="sm" />
      </View>
      <OnboardingHeader
        step={1}
        title="Ta habitude"
        subtitle="Choisis ce qui correspond le mieux — on adapte les stats derrière."
      />
      <View>
        <OnboardingChoiceCard
          icon="smoking-off"
          label="Cigarettes"
          variant="primary"
          onPress={() => {
            setField('smokingType', 'cigarette')
            router.push('/onboarding/step2' as never)
          }}
        />
        <OnboardingChoiceCard
          icon="cloud-outline"
          label="Vapoteuse"
          onPress={() => {
            setField('smokingType', 'vape')
            router.push('/onboarding/step2' as never)
          }}
        />
      </View>
    </OnboardingScreen>
  )
}

export default Step1
