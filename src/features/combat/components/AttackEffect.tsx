import { useEffect } from 'react'
import { Text } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated'

type Props = {
  emoji: string
  visible: boolean
}

export const AttackEffect = ({ emoji, visible }: Props) => {
  const opacity = useSharedValue(0)
  const scale = useSharedValue(0.5)

  useEffect(() => {
    if (visible) {
      opacity.value = withSequence(
        withTiming(1, { duration: 200, easing: Easing.out(Easing.ease) }),
        withTiming(1, { duration: 400 }),
        withTiming(0, { duration: 200, easing: Easing.in(Easing.ease) })
      )
      scale.value = withSequence(
        withTiming(1.2, { duration: 300, easing: Easing.out(Easing.back(1.5)) }),
        withTiming(1.2, { duration: 400 }),
        withTiming(0.8, { duration: 200 })
      )
    } else {
      opacity.value = 0
      scale.value = 0.5
    }
  }, [visible, opacity, scale])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }))

  if (!visible) return null

  return (
    <Animated.View
      style={animatedStyle}
      className="absolute inset-0 items-center justify-center"
      pointerEvents="none"
    >
      <Text className="text-[120px] leading-[120px]">{emoji}</Text>
    </Animated.View>
  )
}
