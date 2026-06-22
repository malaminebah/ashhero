import { useSessionStore } from '@/src/features/auth/sessionStore'
import { useEmailAuthActions } from '@/src/features/auth/hooks/useEmailAuthActions'
import { OnboardingMascot } from '@/src/features/onboarding/components/OnboardingMascot'
import { OnboardingPrimaryButton } from '@/src/features/onboarding/components/OnboardingPrimaryButton'
import { OnboardingSecondaryButton } from '@/src/features/onboarding/components/OnboardingSecondaryButton'
import { useEffect } from 'react'
import { View, Text } from 'react-native'
import { Redirect, useRouter, useSegments } from 'expo-router'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function WelcomeScreen() {
  const router = useRouter()
  const segments = useSegments()
  const uid = useSessionStore((s) => s.uid)
  const hasServerProfile = useSessionStore((s) => s.hasServerProfile)
  const { signOut, pending: signOutPending } = useEmailAuthActions()

  const headerOpacity = useSharedValue(0)
  const charOpacity = useSharedValue(0)
  const ctaOpacity = useSharedValue(0)

  useEffect(() => {
    headerOpacity.value = withDelay(150, withTiming(1, { duration: 450 }))
    charOpacity.value = withDelay(300, withTiming(1, { duration: 500 }))
    ctaOpacity.value = withDelay(550, withTiming(1, { duration: 450 }))
  }, [headerOpacity, charOpacity, ctaOpacity])

  useEffect(() => {
    if (!uid || hasServerProfile !== true) return
    if (segments[0] === '(tabs)') return
    router.replace('/(tabs)' as never)
  }, [uid, hasServerProfile, router, segments])

  const headerStyle = useAnimatedStyle(() => ({ opacity: headerOpacity.value }))
  const charStyle = useAnimatedStyle(() => ({ opacity: charOpacity.value }))
  const ctaStyle = useAnimatedStyle(() => ({ opacity: ctaOpacity.value }))

  if (!uid) {
    return <Redirect href={'/auth/login' as never} />
  }

  if (hasServerProfile === null) {
    return (
      <View className="flex-1 items-center justify-center bg-brand-bg">
        <Text className="text-sm text-white/50">Chargement…</Text>
      </View>
    )
  }

  const onStart = () => {
    router.push('/onboarding/step1' as never)
  }

  const onChangeAccount = async () => {
    const ok = await signOut()
    if (ok) router.replace('/auth/login' as never)
  }

  return (
    <SafeAreaView className="flex-1 bg-brand-bg px-6">
      <View className="flex-1 justify-between py-6">
        <Animated.View style={headerStyle} className="items-center pt-4">
          <Text className="text-3xl font-bold text-brand-accent">ashhero</Text>
        </Animated.View>

        <Animated.View style={charStyle} className="flex-1 items-center justify-center">
          <OnboardingMascot size="lg" />
          <Text className="mt-8 text-center text-xl font-bold leading-7 text-white">
            Contrôle tes envies,{'\n'}contrôle ta vie.
          </Text>
          <Text className="mt-3 text-center text-sm leading-6 text-white/50">
            Chaque heure sans fumer, ton héros devient plus fort.
          </Text>
        </Animated.View>

        <Animated.View style={ctaStyle}>
          <OnboardingPrimaryButton label="Commencer" onPress={onStart} />
          <View className="mt-3">
            <OnboardingSecondaryButton
              label={signOutPending ? '…' : 'Changer de compte'}
              onPress={onChangeAccount}
              disabled={signOutPending}
            />
          </View>
          <Text className="mt-6 text-center text-[11px] leading-4 text-white/30">
            En continuant, tu acceptes nos conditions d&apos;utilisation et notre politique de
            confidentialité.
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  )
}
