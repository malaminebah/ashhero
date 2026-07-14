import { View } from 'react-native'
import { Redirect } from 'expo-router'
import { useSessionStore } from '@/src/features/auth/sessionStore'
import { OnboardingText } from '@/src/features/onboarding/components/OnboardingText'

export default function EntryGate() {
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

  // Session exists but onboarding never finished — back to the welcome screen.
  return <Redirect href={'/auth/login' as never} />
}
