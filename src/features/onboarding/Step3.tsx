import React, { useState } from 'react'
import { View, ScrollView, TextInput, Text } from 'react-native'
import { useRouter } from 'expo-router'
import { useOnboardingStore } from './store'
import { OnboardingHeader } from './components/OnboardingHeader'
import { OnboardingPrimaryButton } from './components/OnboardingPrimaryButton'

const inputClass =
  'rounded-xl border border-brand-accent/20 bg-white/[0.06] px-4 py-4 font-mono text-lg text-white'

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
    <ScrollView
      className="flex-1 bg-brand-bg px-6 pb-10 pt-4"
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
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
      <Text className="mb-1 font-mono text-xs text-white/40">Quantité</Text>
      <TextInput
        keyboardType="decimal-pad"
        value={quantity}
        onChangeText={setQuantity}
        placeholder="Ex: 10"
        placeholderTextColor="rgba(255,255,255,0.3)"
        className={`mb-8 ${inputClass}`}
      />
      <OnboardingPrimaryButton label="Continuer" onPress={onNext} />
    </ScrollView>
  )
}

export default Step3
