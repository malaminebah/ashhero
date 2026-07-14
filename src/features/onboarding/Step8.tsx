import { useState } from 'react'
import { Pressable, View } from 'react-native'
import { useRouter } from 'expo-router'
import DateTimePicker from '@react-native-community/datetimepicker'
import { flowShadow } from '@/constants/flowTheme'
import { flowSurface } from '@/constants/flowSurfaces'
import { useOnboardingStore } from './store'
import { OnboardingHeader } from './components/OnboardingHeader'
import { OnboardingPrimaryButton } from './components/OnboardingPrimaryButton'
import { OnboardingScreen } from './components/OnboardingScreen'
import { OnboardingText } from './components/OnboardingText'

type DateMode = 'today' | 'past'

const DateChip = ({
  label,
  selected,
  onPress,
}: {
  label: string
  selected: boolean
  onPress: () => void
}) => (
  <Pressable
    onPress={onPress}
    accessibilityRole="button"
    accessibilityState={{ selected }}
    className={`flex-1 items-center justify-center rounded-2xl border-2 px-2 py-3.5 active:opacity-90 ${
      selected ? 'border-flow-cta bg-flow-secondary' : 'border-flow-border bg-flow-bg'
    }`}
  >
    <OnboardingText
      className={`text-sm font-bold ${selected ? 'text-flow-cta' : 'text-flow-text'}`}
    >
      {label}
    </OnboardingText>
  </Pressable>
)

const Step8 = () => {
  const [mode, setMode] = useState<DateMode>('today')
  const [customDate, setCustomDate] = useState<Date>(() => new Date())
  const setField = useOnboardingStore((s) => s.setField)
  const router = useRouter()

  // Future dates break streak/savings math — quit date is now or already behind us.
  const resolveDate = (): Date => {
    if (mode === 'today') return new Date()
    const now = new Date()
    return customDate.getTime() > now.getTime() ? now : customDate
  }

  const onConfirm = () => {
    setField('quitDate', resolveDate())
    router.push('/onboarding/promise' as never)
  }

  return (
    <OnboardingScreen
      footer={
        <OnboardingPrimaryButton
          label={mode === 'past' ? 'Choisir cette date' : 'Continuer'}
          onPress={onConfirm}
        />
      }
    >
      <OnboardingHeader
        step={8}
        title="Quand as-tu arrêté ?"
        subtitle="Aujourd'hui, ou une date passée si ta quête a déjà commencé."
      />
      <View className="flex-row gap-2.5">
        <DateChip label="Aujourd'hui" selected={mode === 'today'} onPress={() => setMode('today')} />
        <DateChip label="J'ai déjà arrêté" selected={mode === 'past'} onPress={() => setMode('past')} />
      </View>
      {mode === 'past' ? (
        <View className={`mt-5 overflow-hidden p-2 ${flowSurface.card}`} style={flowShadow.card}>
          <DateTimePicker
            value={customDate}
            mode="date"
            display="inline"
            maximumDate={new Date()}
            onChange={(_, selectedDate) => {
              if (selectedDate) setCustomDate(selectedDate)
            }}
            themeVariant="light"
          />
        </View>
      ) : null}
    </OnboardingScreen>
  )
}

export default Step8
