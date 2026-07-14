import { useState } from 'react'
import { Alert, View } from 'react-native'
import { useRouter } from 'expo-router'
import { useOnboardingStore } from './store'
import { useOnboardingSubmit } from './hooks/useOnboardingSubmit'
import { OnboardingCommitCheck } from './components/OnboardingCommitCheck'
import { OnboardingConfetti } from './components/OnboardingConfetti'
import { OnboardingPrimaryButton } from './components/OnboardingPrimaryButton'
import { OnboardingScreen } from './components/OnboardingScreen'
import { OnboardingText } from './components/OnboardingText'

const SPARKLES = [
  { top: 24, left: 36, color: '#7C3AED', round: true },
  { top: 4, left: 130, color: '#F5C518', round: false },
  { top: 40, right: 46, color: '#EF4444', round: true },
  { top: 8, right: 110, color: '#06B6D4', round: false },
  { top: 74, left: 12, color: '#F5C518', round: true },
  { top: 82, right: 16, color: '#7C3AED', round: false },
] as const

const OnboardingPromise = () => {
  const [checkValid, setCheckValid] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [celebrate, setCelebrate] = useState(false)
  const reset = useOnboardingStore((s) => s.reset)
  const router = useRouter()
  const { submit } = useOnboardingSubmit()

  const onCommit = async () => {
    if (!checkValid || submitting) return
    setSubmitting(true)
    setCelebrate(true)
    const ok = await submit()
    setSubmitting(false)
    if (!ok) {
      setCelebrate(false)
      Alert.alert(
        'Enregistrement',
        "Impossible d'enregistrer ton profil. Vérifie la connexion et réessaie."
      )
      return
    }
    reset()
    router.replace('/onboarding/social-proof' as never)
  }

  return (
    <OnboardingScreen
      footer={
        <OnboardingPrimaryButton
          label={submitting ? 'Promesse en cours…' : "Je m'engage"}
          onPress={() => void onCommit()}
          disabled={!checkValid || submitting}
          loading={submitting}
        />
      }
    >
      <View className="relative pt-14">
        {SPARKLES.map((s, i) => (
          <View
            key={i}
            pointerEvents="none"
            className="absolute"
            style={{
              top: s.top,
              left: 'left' in s ? s.left : undefined,
              right: 'right' in s ? s.right : undefined,
              width: 8,
              height: 8,
              borderRadius: s.round ? 4 : 2,
              backgroundColor: s.color,
              transform: [{ rotate: '24deg' }],
            }}
          />
        ))}
        <OnboardingText className="text-center text-[22px] font-bold leading-8 text-flow-text">
          Prêt à investir en toi ?
        </OnboardingText>
        <OnboardingText className="mt-3 text-center text-[15px] leading-6 text-flow-muted">
          Signe ta promesse. Pas pour nous — pour toi.
        </OnboardingText>
      </View>

      <View className="mt-9">
        <OnboardingCommitCheck committed={checkValid} onCommit={() => setCheckValid(true)} />
      </View>

      <OnboardingConfetti active={celebrate} />
    </OnboardingScreen>
  )
}

export default OnboardingPromise
