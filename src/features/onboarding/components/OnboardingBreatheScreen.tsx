import { useEffect } from 'react'
import { Pressable, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { OnboardingHeroAura } from './OnboardingHeroAura'
import { OnboardingText } from './OnboardingText'

type OnboardingBreatheScreenParams = {
  onDone: () => void
}

/** Mockup frame 2 — lavender interstitial, breathing rings around the hero. */
export const OnboardingBreatheScreen = ({ onDone }: OnboardingBreatheScreenParams) => {
  useEffect(() => {
    const id = setTimeout(onDone, 4200)
    return () => clearTimeout(id)
  }, [onDone])

  return (
    <Pressable className="flex-1 bg-flow-breathe" onPress={onDone}>
      <SafeAreaView className="flex-1">
        <StatusBar style="dark" />
        <View className="flex-1 items-center justify-center px-8">
          <OnboardingHeroAura pose="breathe" tint="violet" />

          <OnboardingText className="mt-11 text-center text-[22px] font-bold leading-8 text-flow-text">
            Prends une grande{'\n'}inspiration
          </OnboardingText>
          <OnboardingText className="mt-3 text-center text-[15px] leading-6 text-flow-muted">
            Inspire 4 s… retiens 4 s… expire 6 s.
          </OnboardingText>
        </View>

        <OnboardingText className="pb-12 text-center text-[13px] font-semibold text-flow-cta">
          Passer
        </OnboardingText>
      </SafeAreaView>
    </Pressable>
  )
}
