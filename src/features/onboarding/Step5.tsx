import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useOnboardingStore } from './store'
import { OnboardingHeader } from './components/OnboardingHeader'
import { OnboardingPrimaryButton } from './components/OnboardingPrimaryButton'

const Step5 = () => {
  const [date, setDate] = useState<Date>(() => new Date())
  const setField = useOnboardingStore((s) => s.setField)
  const router = useRouter()

  const onConfirm = () => {
    setField('quitDate', date)
    router.replace('/onboarding/step6' as never)
  }

  return (
    <ScrollView
      className="flex-1 bg-brand-bg px-6 pb-10 pt-4"
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <OnboardingHeader
        step={5}
        title="Date d’arrêt"
        subtitle="À partir de quand on compte tes jours sans vape / sans clope."
      />
      <View className="mb-8 overflow-hidden rounded-2xl border border-brand-accent/25 bg-white/[0.04] p-4">
        <DateTimePicker
          value={date}
          mode="date"
          onChange={(_, selectedDate) => {
            if (selectedDate) setDate(selectedDate)
          }}
          themeVariant="dark"
        />
      </View>
      <OnboardingPrimaryButton label="Continuer" onPress={onConfirm} />
    </ScrollView>
  )
}

export default Step5
