import React, { useState } from 'react'
import { View } from 'react-native'
import { useRouter } from 'expo-router'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useOnboardingStore } from './store'
import { OnboardingHeader } from './components/OnboardingHeader'
import { OnboardingPrimaryButton } from './components/OnboardingPrimaryButton'
import { OnboardingScreen } from './components/OnboardingScreen'

const Step5 = () => {
  const [date, setDate] = useState<Date>(() => new Date())
  const setField = useOnboardingStore((s) => s.setField)
  const router = useRouter()

  const onConfirm = () => {
    setField('quitDate', date)
    router.replace('/onboarding/step6' as never)
  }

  return (
    <OnboardingScreen
      footer={<OnboardingPrimaryButton label="Continuer" onPress={onConfirm} />}
    >
      <OnboardingHeader
        step={5}
        title="Date d'arrêt"
        subtitle="À partir de quand on compte tes jours sans vape / sans clope."
      />
      <View className="overflow-hidden rounded-2xl border border-flow-border bg-flow-bg p-2">
        <DateTimePicker
          value={date}
          mode="date"
          onChange={(_, selectedDate) => {
            if (selectedDate) setDate(selectedDate)
          }}
          themeVariant="dark"
        />
      </View>
    </OnboardingScreen>
  )
}

export default Step5
