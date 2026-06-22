import { useEffect } from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import { FlowText } from '@/components/ui/flow-text'
import type { FloatingDamageParams } from '../types'

export const FloatingDamage = ({ floatDamage }: FloatingDamageParams) => {
  const { amount, target, key } = floatDamage
  const opacity = useSharedValue(0)
  const translateY = useSharedValue(0)
  const translateX = useSharedValue(0)

  const driftX = target === 'boss' ? 24 : -24

  useEffect(() => {
    opacity.value = 0
    translateY.value = 0
    translateX.value = 0
    opacity.value = withSequence(
      withTiming(1, { duration: 120 }),
      withTiming(1, { duration: 480 }),
      withTiming(0, { duration: 320 })
    )
    translateY.value = withTiming(-32, { duration: 920 })
    translateX.value = withTiming(driftX, { duration: 920 })
  }, [key, driftX, opacity, translateX, translateY])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }))

  const positionClass =
    target === 'boss' ? 'absolute right-8 top-24' : 'absolute bottom-16 left-8'

  return (
    <Animated.View
      style={animatedStyle}
      className={`z-20 ${positionClass}`}
      pointerEvents="none"
    >
      <FlowText className="text-3xl font-bold text-red-500">-{amount}</FlowText>
    </Animated.View>
  )
}
