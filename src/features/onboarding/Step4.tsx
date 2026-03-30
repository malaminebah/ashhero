import React, { useState } from 'react'
import { View, ScrollView, Pressable, TextInput, Text } from 'react-native'
import { useRouter } from 'expo-router'
import { useOnboardingStore } from './store'
import { OnboardingHeader } from './components/OnboardingHeader'
import { OnboardingPrimaryButton } from './components/OnboardingPrimaryButton'

const inputClass =
  'rounded-xl border border-brand-accent/20 bg-white/[0.06] px-4 py-4 font-mono text-lg text-white'

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
      <ScrollView
        className="flex-1 bg-brand-bg px-6 pb-10 pt-4"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}
        keyboardShouldPersistTaps="handled"
      >
        <OnboardingHeader
          step={4}
          title="Ta conso vape"
          subtitle="Flacon de référence (ex. 50 ml à 9 €) et ml consommés par semaine avant l’arrêt."
        />
        <Text className="mb-1 font-mono text-xs text-white/40">Volume du flacon (ml)</Text>
        <TextInput
          keyboardType="decimal-pad"
          value={bottleMl}
          onChangeText={setBottleMl}
          placeholder="50"
          placeholderTextColor="rgba(255,255,255,0.3)"
          className={`mb-4 ${inputClass}`}
        />
        <Text className="mb-1 font-mono text-xs text-white/40">Prix du flacon (€)</Text>
        <TextInput
          keyboardType="decimal-pad"
          value={bottleEuro}
          onChangeText={setBottleEuro}
          placeholder="9"
          placeholderTextColor="rgba(255,255,255,0.3)"
          className={`mb-4 ${inputClass}`}
        />
        <Text className="mb-1 font-mono text-xs text-white/40">Consommation (ml / semaine)</Text>
        <TextInput
          keyboardType="decimal-pad"
          value={mlPerWeek}
          onChangeText={setMlPerWeek}
          placeholder="35"
          placeholderTextColor="rgba(255,255,255,0.3)"
          className={`mb-8 ${inputClass}`}
        />
        <OnboardingPrimaryButton label="Continuer" onPress={onNextVape} />
      </ScrollView>
    )
  }

  return (
    <ScrollView
      className="flex-1 bg-brand-bg px-6 pb-10 pt-4"
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <OnboardingHeader
        step={4}
        title="Budget cigarette"
        subtitle="Prix de ton paquet habituel, en euros."
      />
      <Text className="mb-1 font-mono text-xs text-white/40">Prix du paquet (€)</Text>
      <TextInput
        keyboardType="decimal-pad"
        value={packPrice}
        onChangeText={setPackPrice}
        placeholder="Ex: 10.50"
        placeholderTextColor="rgba(255,255,255,0.3)"
        className={`mb-8 ${inputClass}`}
      />
      <OnboardingPrimaryButton label="Continuer" onPress={onNextCigarette} />
    </ScrollView>
  )
}

export default Step4
