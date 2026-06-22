import React, { useState } from 'react'
import { View } from 'react-native'
import { useRouter } from 'expo-router'
import { useOnboardingStore } from './store'
import { OnboardingHeader } from './components/OnboardingHeader'
import { OnboardingPrimaryButton } from './components/OnboardingPrimaryButton'
import { OnboardingScreen } from './components/OnboardingScreen'
import { OnboardingInput } from './components/OnboardingInput'

const Step3 = () => {
  const [quantity, setQuantity] = useState('')
  const smokingType = useOnboardingStore((s) => s.smokingType)
  const setField = useOnboardingStore((s) => s.setField)
  const router = useRouter()

  const onNext = () => {
    const num = parseFloat(quantity.replace(',', '.'))
    if (!Number.isNaN(num) && num > 0) {
      setField('quantityPerDay', num)
      router.push('/onboarding/step4' as never)
    }
  }

  return (
    <OnboardingScreen
      footer={<OnboardingPrimaryButton label="Continuer" onPress={onNext} />}
    >
      <OnboardingHeader
        step={3}
        title="Rythme quotidien"
        subtitle={
          smokingType === 'vape'
            ? 'Sessions vape par jour (≈ une pause cigarette à chaque fois).'
            : 'Nombre de cigarettes par jour avant ton arrêt.'
        }
      />
      <View className="flex-1">
        <OnboardingInput
          label="Quantité"
          value={quantity}
          onChangeText={setQuantity}
          placeholder="Ex. 10"
          keyboardType="decimal-pad"
        />
      </View>
    </OnboardingScreen>
  )
}

export default Step3
