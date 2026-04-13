import { useEffect } from 'react'
import {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

/**
 * Horizontal shake when `shakeKey` increments (damage taken).
 */
export function useCombatShakeStyle(shakeKey: number) {
  const offset = useSharedValue(0)

  useEffect(() => {
    if (shakeKey <= 0) return
    offset.value = 0
    offset.value = withSequence(
      withTiming(-8, { duration: 45 }),
      withTiming(8, { duration: 45 }),
      withTiming(-5, { duration: 45 }),
      withTiming(5, { duration: 45 }),
      withTiming(-3, { duration: 40 }),
      withTiming(0, { duration: 50 })
    )
  }, [shakeKey, offset])

  return useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }))
}
