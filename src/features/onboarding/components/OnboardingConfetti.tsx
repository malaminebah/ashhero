import { useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

const COLORS = ['#EF4444', '#FBBF24', '#7C3AED', '#22C55E', '#3B82F6'] as const

type ConfettiPieceParams = { index: number; active: boolean }

const ConfettiPiece = ({ index, active }: ConfettiPieceParams) => {
  const tx = useSharedValue(0)
  const ty = useSharedValue(0)
  const opacity = useSharedValue(0)
  const angle = (index * 47) % 360
  const dist = 40 + (index % 5) * 14

  useEffect(() => {
    if (!active) {
      tx.value = 0
      ty.value = 0
      opacity.value = 0
      return
    }
    const rad = (angle * Math.PI) / 180
    tx.value = withDelay(index * 30, withTiming(Math.cos(rad) * dist, { duration: 500 }))
    ty.value = withDelay(index * 30, withTiming(Math.sin(rad) * dist, { duration: 500 }))
    opacity.value = withDelay(
      index * 30,
      withSequence(withTiming(1, { duration: 120 }), withTiming(0, { duration: 400 }))
    )
  }, [active, angle, dist, index, opacity, tx, ty])

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: tx.value }, { translateY: ty.value }, { rotate: `${angle}deg` }],
  }))

  return (
    <Animated.View
      style={[
        style,
        {
          position: 'absolute',
          width: index % 2 === 0 ? 8 : 5,
          height: index % 2 === 0 ? 5 : 8,
          backgroundColor: COLORS[index % COLORS.length],
          borderRadius: 1,
        },
      ]}
    />
  )
}

type OnboardingConfettiParams = { active: boolean }

export const OnboardingConfetti = ({ active }: OnboardingConfettiParams) => (
  <View pointerEvents="none" className="absolute inset-0 items-center justify-center">
    {Array.from({ length: 14 }).map((_, i) => (
      <ConfettiPiece key={i} index={i} active={active} />
    ))}
  </View>
)
