import { useEmailAuthActions } from '@/src/features/auth/hooks/useEmailAuthActions'
import { AuthEntryRedirect } from '@/src/features/auth/components/AuthEntryRedirect'
import { useSessionStore } from '@/src/features/auth/sessionStore'
import { OnboardingHeroAura } from '@/src/features/onboarding/components/OnboardingHeroAura'
import { OnboardingPrimaryButton } from '@/src/features/onboarding/components/OnboardingPrimaryButton'
import { OnboardingSecondaryButton } from '@/src/features/onboarding/components/OnboardingSecondaryButton'
import { OnboardingText } from '@/src/features/onboarding/components/OnboardingText'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function WelcomeScreen() {
  const router = useRouter()
  const { signInAsGuest, pending } = useEmailAuthActions()
  const existingUid = useSessionStore((s) => s.uid)

  const onStart = async () => {
    const uid = existingUid ?? (await signInAsGuest())
    if (uid) router.replace('/breathe' as never)
  }

  return (
    <SafeAreaView className="flex-1 bg-flow-bg px-6">
      <AuthEntryRedirect />
      <StatusBar style="dark" />
      <View className="flex-1 justify-between py-6">
        <View className="flex-1 items-center justify-center">
          <OnboardingText className="text-[28px] font-extrabold text-flow-brand" style={{ letterSpacing: -0.5 }}>
            ashhero
          </OnboardingText>

          <View className="mt-4">
            <OnboardingHeroAura pose="idle" tint="green" />
          </View>

          <OnboardingText className="mt-5 text-center text-2xl font-bold leading-8 text-flow-text">
            Deviens le héros{'\n'}de ton arrêt
          </OnboardingText>
          <OnboardingText className="mt-3 max-w-[290px] text-center text-[15px] leading-6 text-flow-muted">
            Un coach bienveillant et des combats pour vaincre l&apos;envie, un jour à la fois.
          </OnboardingText>
        </View>

        <View className="gap-3">
          <OnboardingPrimaryButton
            label={pending ? '…' : 'Commencer'}
            onPress={onStart}
            disabled={pending}
          />
          <OnboardingSecondaryButton
            label="J'ai déjà un compte"
            onPress={() => router.push('/auth/sign-in' as never)}
            disabled={pending}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
