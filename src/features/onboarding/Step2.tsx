import React, { useState } from 'react'
import { Pressable, View } from 'react-native'
import { useRouter } from 'expo-router'
import { useOnboardingStore } from './store'
import { OnboardingHeader } from './components/OnboardingHeader'
import { OnboardingPrimaryButton } from './components/OnboardingPrimaryButton'
import { OnboardingScreen } from './components/OnboardingScreen'
import { OnboardingText } from './components/OnboardingText'

type StepperTheme = {
  start: number
  step: number
  min: number
  max: number
  unit: string
}

const THEMES: Record<'cigarette' | 'vape', StepperTheme> = {
  cigarette: { start: 10, step: 1, min: 1, max: 60, unit: 'cigarettes / jour' },
  vape: { start: 100, step: 10, min: 10, max: 600, unit: 'bouffées / jour' },
}

const StepperButton = ({
  label,
  onPress,
  primary,
  accessibilityLabel,
}: {
  label: string
  onPress: () => void
  primary?: boolean
  accessibilityLabel: string
}) => (
  <Pressable
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel={accessibilityLabel}
    className={`h-14 w-14 items-center justify-center rounded-full active:opacity-80 ${
      primary ? 'bg-flow-cta' : 'bg-flow-secondary'
    }`}
  >
    <OnboardingText
      className={`text-[26px] font-extrabold ${primary ? 'text-white' : 'text-[#5B21B6]'}`}
    >
      {label}
    </OnboardingText>
  </Pressable>
)

const Step2 = () => {
  const smokingType = useOnboardingStore((s) => s.smokingType)
  const setField = useOnboardingStore((s) => s.setField)
  const router = useRouter()
  const theme = THEMES[smokingType ?? 'cigarette']
  const [value, setValue] = useState(theme.start)

  const onNext = () => {
    setField('quantityPerDay', value)
    router.push('/onboarding/step3' as never)
  }

  return (
    <OnboardingScreen
      footer={<OnboardingPrimaryButton label="Continuer" onPress={onNext} />}
    >
      <OnboardingHeader
        step={2}
        title="Combien par jour, en moyenne ?"
        subtitle="Sois honnête — c'est ton point de départ, pas un jugement."
      />
      <View className="flex-1 flex-row items-center justify-center gap-7">
        <StepperButton
          label="−"
          accessibilityLabel="Diminuer"
          onPress={() => setValue((v) => Math.max(theme.min, v - theme.step))}
        />
        <View className="items-center">
          <OnboardingText
            className="font-extrabold text-flow-text"
            style={{ fontSize: 72, lineHeight: 76, letterSpacing: -2 }}
          >
            {value}
          </OnboardingText>
          <OnboardingText className="mt-1.5 text-[13px] font-semibold text-flow-faint">
            {theme.unit}
          </OnboardingText>
        </View>
        <StepperButton
          label="+"
          primary
          accessibilityLabel="Augmenter"
          onPress={() => setValue((v) => Math.min(theme.max, v + theme.step))}
        />
      </View>
    </OnboardingScreen>
  )
}

export default Step2
