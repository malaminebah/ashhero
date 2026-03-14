import React, { useState } from 'react'
import { View, Pressable, TextInput, Text } from 'react-native'
import { useRouter } from 'expo-router'
import { useOnboardingStore } from './store'

const Step4 = () => {
  const [price, setPrice] = useState('')
  const { setField } = useOnboardingStore()
  const router = useRouter()

  const onNext = () => {
    const num = parseFloat(price.replace(',', '.'))
    if (!Number.isNaN(num) && num >= 0) {
      setField('pricePerUnit', num)
      router.push('/onboarding/step5' as never)
    }
  }

  return (
    <View className="flex-1 bg-brand-bg p-6 pt-12">
      <Text className="text-white text-xl font-mono mb-2">
        Prix par unité ?
      </Text>
      <Text className="text-white/50 text-sm font-mono mb-6">
        En euros (paquet, flacon…)
      </Text>
      <TextInput
        keyboardType="decimal-pad"
        value={price}
        onChangeText={setPrice}
        placeholder="Ex: 10.50"
        placeholderTextColor="rgba(255,255,255,0.3)"
        className="bg-white/[0.06] border border-brand-accent/20 rounded-xl px-4 py-4 text-white font-mono text-lg mb-6"
      />
      <Pressable
        onPress={onNext}
        className="w-full py-4 rounded-xl items-center justify-center bg-brand-accentDark active:opacity-90"
      >
        <Text className="text-white text-sm font-mono tracking-widest uppercase">
          Continu
        </Text>
      </Pressable>
    </View>
  )
}

export default Step4
