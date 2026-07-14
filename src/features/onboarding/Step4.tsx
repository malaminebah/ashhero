import React from 'react'
import { View } from 'react-native'
import { useRouter } from 'expo-router'
import { useOnboardingStore } from './store'
import { YEARS_OPTIONS } from './profileFacts'
import { OnboardingHeader } from './components/OnboardingHeader'
import { OnboardingChoiceCard } from './components/OnboardingChoiceCard'
import { OnboardingScreen } from './components/OnboardingScreen'

const Step4 = () => {
  const setField = useOnboardingStore((s) => s.setField)
  const smokingType = useOnboardingStore((s) => s.smokingType)
  const router = useRouter()

  const onSelect = (value: number) => {
    setField('yearsUsing', value)
    router.push('/onboarding/step5' as never)
  }

  return (
    <OnboardingScreen>
      <OnboardingHeader
        step={4}
        title={
          smokingType === 'vape'
            ? 'Tu vapotes depuis…'
            : 'Tu fumes depuis…'
        }
        subtitle="Plus on connaît ton historique, mieux on calibre ton parcours."
      />
      <View>
        {YEARS_OPTIONS.map((opt) => (
          <OnboardingChoiceCard
            key={opt.value}
            icon="calendar-clock"
            label={opt.label}
            onPress={() => onSelect(opt.value)}
          />
        ))}
      </View>
    </OnboardingScreen>
  )
}

export default Step4
