import { useEffect } from 'react'
import { Pressable, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { OnboardingMascot } from './OnboardingMascot'
import { OnboardingText } from './OnboardingText'

type OnboardingBreatheScreenParams = {
  onDone: () => void
}

export const OnboardingBreatheScreen = ({ onDone }: OnboardingBreatheScreenParams) => {
  useEffect(() => {
    const id = setTimeout(onDone, 3200)
    return () => clearTimeout(id)
  }, [onDone])

  return (
    <Pressable className="flex-1 bg-flow-breathe" onPress={onDone}>
      <SafeAreaView className="flex-1">
        <StatusBar style="dark" />
        <View className="flex-1 items-center justify-center px-8">
          <OnboardingMascot anim="idle" size="lg" />
          <OnboardingText className="mt-10 text-center text-xl font-bold text-flow-text">
            Prends une grande inspiration
          </OnboardingText>
        </View>
      </SafeAreaView>
    </Pressable>
  )
}
