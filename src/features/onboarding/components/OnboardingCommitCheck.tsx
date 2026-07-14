import { useEffect } from 'react'
import { Pressable } from 'react-native'
import * as Haptics from 'expo-haptics'
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import Svg, { Path } from 'react-native-svg'
import { FLOW, flowShadow } from '@/constants/flowTheme'
import { OnboardingText } from './OnboardingText'

const CHECK_PATH = 'M14 52 C30 70 38 74 46 62 C58 42 74 20 106 12'
const CHECK_LENGTH = 150

const AnimatedPath = Animated.createAnimatedComponent(Path)

type OnboardingCommitCheckParams = {
  committed: boolean
  onCommit: () => void
}

/** Tap-to-sign — the checkmark draws itself (replaces the buggy hand-drawn pad). */
export const OnboardingCommitCheck = ({ committed, onCommit }: OnboardingCommitCheckParams) => {
  const draw = useSharedValue(0)
  const pop = useSharedValue(1)

  useEffect(() => {
    if (committed) {
      draw.value = withTiming(1, { duration: 550, easing: Easing.out(Easing.cubic) })
      pop.value = withSpring(1.06, { damping: 9, stiffness: 220 })
      pop.value = withSpring(1, { damping: 12, stiffness: 180 })
    } else {
      draw.value = withTiming(0, { duration: 200 })
    }
  }, [committed, draw, pop])

  const pathProps = useAnimatedProps(() => ({
    strokeDashoffset: CHECK_LENGTH * (1 - draw.value),
  }))

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pop.value }],
  }))

  const onPress = () => {
    if (committed) return
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {})
    onCommit()
  }

  return (
    <Animated.View style={cardStyle}>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel="Signer ma promesse"
        accessibilityState={{ selected: committed }}
        className={`h-44 w-full items-center justify-center rounded-3xl bg-flow-bg active:opacity-95 ${
          committed ? 'border-2 border-flow-cta' : 'border-2 border-dashed border-flow-border'
        }`}
        style={flowShadow.canvas}
      >
        <Svg width={120} height={90} viewBox="0 0 120 90">
          <Path
            d={CHECK_PATH}
            stroke={FLOW.border}
            strokeWidth={7}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <AnimatedPath
            d={CHECK_PATH}
            stroke={FLOW.cta}
            strokeWidth={7}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            strokeDasharray={CHECK_LENGTH}
            animatedProps={pathProps}
          />
        </Svg>
        <OnboardingText
          className={`mt-2 text-[13px] font-semibold ${
            committed ? 'text-flow-cta' : 'text-flow-faint'
          }`}
        >
          {committed ? 'Promesse signée' : "Touche pour t'engager"}
        </OnboardingText>
      </Pressable>
    </Animated.View>
  )
}
