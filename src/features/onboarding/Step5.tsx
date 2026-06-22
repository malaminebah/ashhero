import React, { useState } from 'react'
import { Alert, View } from 'react-native'
import { useRouter } from 'expo-router'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useOnboardingStore } from './store'
import { useOnboardingSubmit } from './hooks/useOnboardingSubmit'
import { OnboardingHeader } from './components/OnboardingHeader'
import { OnboardingPrimaryButton } from './components/OnboardingPrimaryButton'
import { OnboardingScreen } from './components/OnboardingScreen'

const Step5 = () => {
  const [date, setDate] = useState<Date>(() => new Date())
  const [submitting, setSubmitting] = useState(false)
  const setField = useOnboardingStore((s) => s.setField)
  const reset = useOnboardingStore((s) => s.reset)
  const router = useRouter()
  const { submit } = useOnboardingSubmit()

  const onConfirm = async () => {
    setField('quitDate', date)
    setSubmitting(true)
    const ok = await submit()
    setSubmitting(false)
    if (!ok) {
      Alert.alert(
        'Enregistrement',
        "Impossible d'enregistrer ton profil. Vérifie la connexion et réessaie."
      )
      return
    }
    reset()
    router.replace('/(tabs)' as never)
  }

  return (
    <OnboardingScreen
      footer={
        <OnboardingPrimaryButton
          label={submitting ? 'Enregistrement…' : "Commencer l'aventure"}
          onPress={onConfirm}
          disabled={submitting}
          loading={submitting}
        />
      }
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
          themeVariant="light"
        />
      </View>
    </OnboardingScreen>
  )
}

export default Step5
