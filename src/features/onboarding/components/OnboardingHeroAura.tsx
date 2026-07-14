import { useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import { HeroSprite, type HeroPose } from '@/components/characters/HeroSprite'

type AuraTint = 'violet' | 'green'

const TINTS: Record<AuraTint, { outer: string; inner: string; shadow: string }> = {
  violet: {
    outer: 'rgba(124,58,237,0.07)',
    inner: 'rgba(124,58,237,0.10)',
    shadow: '#7C3AED',
  },
  green: {
    outer: 'rgba(34,197,94,0.08)',
    inner: 'rgba(34,197,94,0.12)',
    shadow: '#22c55e',
  },
}

type OnboardingHeroAuraParams = {
  pose: HeroPose
  tint: AuraTint
}

/** Hero in a white circle with slowly breathing concentric rings (mockup frame 2). */
export const OnboardingHeroAura = ({ pose, tint }: OnboardingHeroAuraParams) => {
  const breathe = useSharedValue(1)
  const theme = TINTS[tint]

  useEffect(() => {
    breathe.value = withRepeat(
      withSequence(
        withTiming(1.12, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.sin) })
      ),
      -1,
      true
    )
  }, [breathe])

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ scale: breathe.value }],
  }))

  return (
    <View className="h-[280px] w-[280px] items-center justify-center">
      <Animated.View
        style={[
          ringStyle,
          {
            position: 'absolute',
            width: 280,
            height: 280,
            borderRadius: 140,
            backgroundColor: theme.outer,
          },
        ]}
      />
      <Animated.View
        style={[
          ringStyle,
          {
            position: 'absolute',
            width: 214,
            height: 214,
            borderRadius: 107,
            backgroundColor: theme.inner,
          },
        ]}
      />
      <View
        className="h-40 w-40 items-center justify-center rounded-full bg-white"
        style={{
          shadowColor: theme.shadow,
          shadowOffset: { width: 0, height: 12 },
          shadowOpacity: 0.18,
          shadowRadius: 32,
          elevation: 8,
        }}
      >
        <HeroSprite pose={pose} width={96} height={117} />
      </View>
    </View>
  )
}
