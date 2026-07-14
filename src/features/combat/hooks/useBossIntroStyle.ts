import { useEffect } from 'react'
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { BOSS_INTRO_MS } from '../animConfig'
import type { CombatPhase } from '../types'

const BOSS_INTRO_OFFSET_X = 170

/** Boss slides in from the right during the 'boss_entering' phase, then stays in place. */
export function useBossIntroStyle(phase: CombatPhase) {
  const offsetX = useSharedValue(BOSS_INTRO_OFFSET_X)

  useEffect(() => {
    if (phase === 'boss_entering') {
      offsetX.value = withTiming(0, {
        duration: BOSS_INTRO_MS,
        easing: Easing.out(Easing.cubic),
      })
    }
  }, [phase, offsetX])

  return useAnimatedStyle(() => ({
    transform: [{ translateX: offsetX.value }],
  }))
}
