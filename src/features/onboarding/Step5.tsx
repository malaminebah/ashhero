import React, { useState } from 'react'
import { View, Pressable, Text } from 'react-native'
import { useRouter } from 'expo-router'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useOnboardingStore } from './store'

const Step5 = () => {
  const [date, setDate] = useState<Date>(() => new Date())
  const { setField } = useOnboardingStore()
  const router = useRouter()

  const onConfirm = () => {
    setField('quitDate', date)
    router.replace('/onboarding/step6' as never)
  }

  return (
    <View className="flex-1 bg-brand-bg p-6 pt-12">
      <Text className="text-white text-xl font-mono mb-2">
        Date d’arrêt
      </Text>
      <Text className="text-white/50 text-sm font-mono mb-6">
        À partir de quand tu arrêtes ?
      </Text>
      <View className="mb-6">
        <DateTimePicker
          value={date}
          mode="date"
          onChange={(_, selectedDate) => {
            if (selectedDate) setDate(selectedDate)
          }}
          themeVariant="dark"
        />
      </View>
      <Pressable
        onPress={onConfirm}
        className="w-full py-4 rounded-xl items-center justify-center bg-brand-accentDark active:opacity-90"
      >
        <Text className="text-white text-sm font-mono tracking-widest uppercase">
          Continu
        </Text>
      </Pressable>
    </View>
  )
}

export default Step5
