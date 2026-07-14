import { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import { BREATHE_PHASE_SEC, type BreathePhase } from '../breatheCycle'

// Matches HERO_ARENA_W in ArenaSprites — aura hugs the cartoon hero.
const HERO_W = 116
const AURA_SIZE = Math.round(HERO_W * 1.45)

type BreatheHeroAuraParams = {
  phase: BreathePhase
}

export const BreatheHeroAura = ({ phase }: BreatheHeroAuraParams) => {
  const scale0 = useSharedValue(0.9)
  const scale1 = useSharedValue(0.95)
  const scale2 = useSharedValue(1)
  const opacity0 = useSharedValue(0.45)
  const opacity1 = useSharedValue(0.3)
  const opacity2 = useSharedValue(0.2)

  useEffect(() => {
    const duration = BREATHE_PHASE_SEC[phase] * 1000
    const easing = Easing.inOut(Easing.sin)

    if (phase === 'inhale') {
      scale0.value = withTiming(1.28, { duration, easing })
      scale1.value = withTiming(1.38, { duration, easing })
      scale2.value = withTiming(1.48, { duration, easing })
      opacity0.value = withTiming(0.55, { duration, easing })
      opacity1.value = withTiming(0.38, { duration, easing })
      opacity2.value = withTiming(0.22, { duration, easing })
    } else if (phase === 'exhale') {
      scale0.value = withTiming(0.88, { duration, easing })
      scale1.value = withTiming(0.82, { duration, easing })
      scale2.value = withTiming(0.76, { duration, easing })
      opacity0.value = withTiming(0.35, { duration, easing })
      opacity1.value = withTiming(0.22, { duration, easing })
      opacity2.value = withTiming(0.12, { duration, easing })
    } else if (phase === 'countdown') {
      scale0.value = withTiming(0.92, { duration, easing })
      scale1.value = withTiming(0.88, { duration, easing })
      scale2.value = withTiming(0.84, { duration, easing })
      opacity0.value = withTiming(0.32, { duration, easing })
      opacity1.value = withTiming(0.2, { duration, easing })
      opacity2.value = withTiming(0.1, { duration, easing })
    } else {
      scale0.value = withSequence(
        withTiming(0.98, { duration: duration / 2, easing }),
        withTiming(1.02, { duration: duration / 2, easing })
      )
      scale1.value = withTiming(0.94, { duration, easing })
      scale2.value = withTiming(0.9, { duration, easing })
      opacity0.value = withTiming(0.28, { duration, easing })
      opacity1.value = withTiming(0.18, { duration, easing })
      opacity2.value = withTiming(0.1, { duration, easing })
    }
  }, [phase, opacity0, opacity1, opacity2, scale0, scale1, scale2])

  const ring0 = useAnimatedStyle(() => ({
    transform: [{ scale: scale0.value }],
    opacity: opacity0.value,
  }))
  const ring1 = useAnimatedStyle(() => ({
    transform: [{ scale: scale1.value }],
    opacity: opacity1.value,
  }))
  const ring2 = useAnimatedStyle(() => ({
    transform: [{ scale: scale2.value }],
    opacity: opacity2.value,
  }))

  return (
    <View style={styles.host} pointerEvents="none">
      <Animated.View style={[styles.ring, styles.ringOuter, ring2]} />
      <Animated.View style={[styles.ring, styles.ringMid, ring1]} />
      <Animated.View style={[styles.ring, styles.ringInner, ring0]} />
      <View style={styles.coreGlow} />
    </View>
  )
}

const styles = StyleSheet.create({
  host: {
    position: 'absolute',
    bottom: HERO_W * 0.08,
    left: HERO_W * 0.5 - AURA_SIZE * 0.5,
    width: AURA_SIZE,
    height: AURA_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },
  ring: {
    position: 'absolute',
    width: AURA_SIZE,
    height: AURA_SIZE,
    borderRadius: AURA_SIZE / 2,
    borderWidth: 2.5,
  },
  ringOuter: {
    borderColor: 'rgba(34, 197, 94, 0.35)',
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
  },
  ringMid: {
    borderColor: 'rgba(74, 222, 128, 0.55)',
  },
  ringInner: {
    borderColor: 'rgba(134, 239, 172, 0.75)',
  },
  coreGlow: {
    width: AURA_SIZE * 0.55,
    height: AURA_SIZE * 0.55,
    borderRadius: (AURA_SIZE * 0.55) / 2,
    backgroundColor: 'rgba(34, 197, 94, 0.12)',
  },
})
