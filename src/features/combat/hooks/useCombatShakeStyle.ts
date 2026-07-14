import { useEffect } from 'react'
import {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

export type CombatShakeFrom = 'left' | 'right'

/**
 * Shake toward the attack direction (`hitFrom` = side the hit comes from).
 */
export function useCombatShakeStyle(shakeKey: number, hitFrom: CombatShakeFrom) {
  const offset = useSharedValue(0)
  const opacity = useSharedValue(1)

  useEffect(() => {
    if (shakeKey <= 0) return
    const sign = hitFrom === 'left' ? 1 : -1
    offset.value = 0
    offset.value = withSequence(
      withTiming(8 * sign, { duration: 45 }),
      withTiming(-8 * sign, { duration: 45 }),
      withTiming(5 * sign, { duration: 45 }),
      withTiming(-5 * sign, { duration: 45 }),
      withTiming(3 * sign, { duration: 40 }),
      withTiming(0, { duration: 50 })
    )
    opacity.value = 1
    opacity.value = withSequence(
      withTiming(0.4, { duration: 75 }),
      withTiming(1, { duration: 75 })
    )
  }, [shakeKey, hitFrom, offset, opacity])

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: offset.value }],
  }))
}
