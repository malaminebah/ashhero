import React from 'react'
import { View } from 'react-native'
import { useRouter } from 'expo-router'
import { useOnboardingStore } from './store'
import { MOTIVATIONS } from './profileFacts'
import { OnboardingHeader } from './components/OnboardingHeader'
import { OnboardingChoiceCard } from './components/OnboardingChoiceCard'
import { OnboardingPrimaryButton } from './components/OnboardingPrimaryButton'
import { OnboardingScreen } from './components/OnboardingScreen'

const Step6 = () => {
  const motivations = useOnboardingStore((s) => s.motivations)
  const setField = useOnboardingStore((s) => s.setField)
  const router = useRouter()

  const toggle = (id: string) => {
    setField(
      'motivations',
      motivations.includes(id)
        ? motivations.filter((m) => m !== id)
        : [...motivations, id]
    )
  }

  return (
    <OnboardingScreen
      footer={
        <OnboardingPrimaryButton
          label="Continuer"
          onPress={() => router.push('/onboarding/step7' as never)}
          disabled={motivations.length === 0}
        />
      }
    >
      <OnboardingHeader
        step={6}
        title="Tu te bats pour quoi ?"
        subtitle="Tes raisons seront tes armes les jours difficiles."
      />
      <View>
        {MOTIVATIONS.map((m) => (
          <OnboardingChoiceCard
            key={m.id}
            icon={m.icon}
            label={m.label}
            selected={motivations.includes(m.id)}
            onPress={() => toggle(m.id)}
          />
        ))}
      </View>
    </OnboardingScreen>
  )
}

export default Step6
