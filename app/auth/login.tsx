import { useEmailAuthActions } from '@/src/features/auth/hooks/useEmailAuthActions'
import { AuthEntryRedirect } from '@/src/features/auth/components/AuthEntryRedirect'
import { OnboardingPrimaryButton } from '@/src/features/onboarding/components/OnboardingPrimaryButton'
import { OnboardingSecondaryButton } from '@/src/features/onboarding/components/OnboardingSecondaryButton'
import { OnboardingText } from '@/src/features/onboarding/components/OnboardingText'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const welcomeHero = require('@/assets/images/welcome-hero.png')

export default function WelcomeScreen() {
  const router = useRouter()
  const { signInAsGuest, pending } = useEmailAuthActions()

  const onStart = async () => {
    const uid = await signInAsGuest()
    if (uid) router.replace('/' as never)
  }

  return (
    <SafeAreaView className="flex-1 bg-flow-bg px-6">
      <AuthEntryRedirect />
      <StatusBar style="dark" />
      <View className="flex-1 justify-between py-6">
        <View className="flex-1 items-center justify-center">
          <Image
            source={welcomeHero}
            style={{ width: '100%', height: 300 }}
            contentFit="contain"
            accessibilityLabel="Héros AshHero qui s'envole"
          />

          <OnboardingText className="mt-8 text-[30px] font-bold text-flow-brand">
            ashhero
          </OnboardingText>
          <OnboardingText className="mt-3 text-center text-[22px] font-bold leading-7 text-flow-text">
            Contrôle tes envies,{'\n'}contrôle ta vie.
          </OnboardingText>
        </View>

        <View>
          <OnboardingPrimaryButton
            label={pending ? '…' : 'Commencer'}
            onPress={onStart}
            disabled={pending}
          />
          <View className="mt-3">
            <OnboardingSecondaryButton
              label="J'ai déjà un compte"
              onPress={() => router.push('/auth/sign-in' as never)}
              disabled={pending}
            />
          </View>
          <OnboardingText className="mt-6 text-center text-[11px] leading-4 text-flow-faint">
            En continuant, tu acceptes nos conditions d&apos;utilisation et notre politique de
            confidentialité.
          </OnboardingText>
        </View>
      </View>
    </SafeAreaView>
  )
}
