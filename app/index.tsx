import { View } from 'react-native'
import { Redirect, useRouter } from 'expo-router'
import { useSessionStore } from '@/src/features/auth/sessionStore'
import { OnboardingBreatheScreen } from '@/src/features/onboarding/components/OnboardingBreatheScreen'
import { OnboardingText } from '@/src/features/onboarding/components/OnboardingText'

export default function EntryGate() {
  const router = useRouter()
  const uid = useSessionStore((s) => s.uid)
  const hasServerProfile = useSessionStore((s) => s.hasServerProfile)

  if (!uid) {
    return <Redirect href={'/auth/login' as never} />
  }

  if (hasServerProfile === null) {
    return (
      <View className="flex-1 items-center justify-center bg-flow-bg">
        <OnboardingText className="text-sm text-flow-muted">Chargement…</OnboardingText>
      </View>
    )
  }

  if (hasServerProfile === true) {
    return <Redirect href={'/(tabs)' as never} />
  }

  return <OnboardingBreatheScreen onDone={() => router.replace('/onboarding/step1' as never)} />
}
