import React, { useState } from 'react'
import { View } from 'react-native'
import { useRouter } from 'expo-router'
import { useOnboardingStore } from './store'
import { OnboardingHeader } from './components/OnboardingHeader'
import { OnboardingPrimaryButton } from './components/OnboardingPrimaryButton'
import { OnboardingScreen } from './components/OnboardingScreen'
import { OnboardingInput } from './components/OnboardingInput'

const Step4 = () => {
  const router = useRouter()
  const smokingType = useOnboardingStore((s) => s.smokingType)
  const setField = useOnboardingStore((s) => s.setField)

  const [packPrice, setPackPrice] = useState('')
  const [bottleMl, setBottleMl] = useState('')
  const [bottleEuro, setBottleEuro] = useState('')
  const [mlPerWeek, setMlPerWeek] = useState('')

  const parseNum = (s: string) => parseFloat(s.replace(',', '.'))

  const onNextCigarette = () => {
    const num = parseNum(packPrice)
    if (!Number.isNaN(num) && num >= 0) {
      setField('pricePerUnit', num)
      setField('vapeBottleVolumeMl', null)
      setField('vapeBottlePriceEuro', null)
      setField('vapeMlPerWeek', null)
      router.push('/onboarding/step5' as never)
    }
  }

  const onNextVape = () => {
    const vol = parseNum(bottleMl)
    const price = parseNum(bottleEuro)
    const mlW = parseNum(mlPerWeek)
    if (
      !Number.isNaN(vol) &&
      vol > 0 &&
      !Number.isNaN(price) &&
      price >= 0 &&
      !Number.isNaN(mlW) &&
      mlW >= 0
    ) {
      setField('vapeBottleVolumeMl', vol)
      setField('vapeBottlePriceEuro', price)
      setField('vapeMlPerWeek', mlW)
      setField('pricePerUnit', null)
      router.push('/onboarding/step5' as never)
    }
  }

  if (smokingType === 'vape') {
    return (
      <OnboardingScreen
        footer={<OnboardingPrimaryButton label="Continuer" onPress={onNextVape} />}
      >
        <OnboardingHeader
          step={4}
          title="Ta conso vape"
          subtitle="Flacon de référence (ex. 50 ml à 9 €) et ml consommés par semaine avant l'arrêt."
        />
        <View className="flex-1">
          <OnboardingInput
            label="Volume du flacon (ml)"
            value={bottleMl}
            onChangeText={setBottleMl}
            placeholder="50"
            keyboardType="decimal-pad"
          />
          <OnboardingInput
            label="Prix du flacon (€)"
            value={bottleEuro}
            onChangeText={setBottleEuro}
            placeholder="9"
            keyboardType="decimal-pad"
          />
          <OnboardingInput
            label="Consommation (ml / semaine)"
            value={mlPerWeek}
            onChangeText={setMlPerWeek}
            placeholder="35"
            keyboardType="decimal-pad"
          />
        </View>
      </OnboardingScreen>
    )
  }

  return (
    <OnboardingScreen
      footer={<OnboardingPrimaryButton label="Continuer" onPress={onNextCigarette} />}
    >
      <OnboardingHeader
        step={4}
        title="Budget cigarette"
        subtitle="Prix de ton paquet habituel, en euros."
      />
      <View className="flex-1">
        <OnboardingInput
          label="Prix du paquet (€)"
          value={packPrice}
          onChangeText={setPackPrice}
          placeholder="Ex. 10,50"
          keyboardType="decimal-pad"
        />
      </View>
    </OnboardingScreen>
  )
}

export default Step4
