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
  }, [shakeKey, hitFrom, offset])

  return useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }))
}
