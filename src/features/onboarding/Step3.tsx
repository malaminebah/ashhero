import React, { useState } from 'react'
import { View, Pressable, TextInput, Text } from 'react-native'
import { useRouter } from 'expo-router'
import { useOnboardingStore } from './store'

const Step3 = () => {
  const [quantity, setQuantity] = useState('')
  const { setField } = useOnboardingStore()
  const router = useRouter()

  const onNext = () => {
    const num = parseFloat(quantity.replace(',', '.'))
    if (!Number.isNaN(num) && num > 0) {
      setField('quantityPerDay', num)
      router.push('/onboarding/step4' as never)
    }
  }

  return (
    <View className="flex-1 bg-brand-bg p-6 pt-12">
      <Text className="text-white text-xl font-mono mb-2">
        Combien par jour ?
      </Text>
      <Text className="text-white/50 text-sm font-mono mb-6">
        Nombre de cigarettes ou de sessions vape
      </Text>
      <TextInput
        keyboardType="decimal-pad"
        value={quantity}
        onChangeText={setQuantity}
        placeholder="Ex: 10"
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

export default Step3
