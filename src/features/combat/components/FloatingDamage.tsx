import { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import { FlowText } from '@/components/ui/flow-text'
import type { FloatingDamageParams } from '../types'

const FLOAT_MS = 750

/** Mockup damage chip — solid pill colored by attack, floats up inside the arena. */
export const FloatingDamage = ({ floatDamage, fill }: FloatingDamageParams) => {
  const { amount, target, key, variant = 'damage' } = floatDamage
  const isHeal = variant === 'heal'
  const chipFill = isHeal ? '#22c55e' : fill ?? (target === 'boss' ? '#3b82f6' : '#ef4444')
  const driftX = target === 'boss' ? 14 : -14

  const opacity = useSharedValue(0)
  const translateY = useSharedValue(10)
  const translateX = useSharedValue(0)
  const scale = useSharedValue(0.6)

  useEffect(() => {
    opacity.value = 0
    translateY.value = 10
    translateX.value = 0
    scale.value = 0.6
    opacity.value = withSequence(
      withTiming(1, { duration: 90, easing: Easing.out(Easing.quad) }),
      withTiming(1, { duration: 420, easing: Easing.linear }),
      withTiming(0, { duration: 240, easing: Easing.in(Easing.quad) })
    )
    scale.value = withSequence(
      withTiming(1.15, { duration: 140, easing: Easing.out(Easing.back(2)) }),
      withTiming(1, { duration: 160 })
    )
    translateY.value = withTiming(-46, {
      duration: FLOAT_MS,
      easing: Easing.out(Easing.cubic),
    })
    translateX.value = withTiming(driftX, {
      duration: FLOAT_MS,
      easing: Easing.out(Easing.cubic),
    })
  }, [key, driftX, opacity, scale, translateX, translateY])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }))

  const posStyle =
    target === 'boss'
      ? { top: 40, right: '13%' as const }
      : { top: 46, left: '11%' as const }

  return (
    <Animated.View style={[styles.root, posStyle, animatedStyle]} pointerEvents="none">
      <View style={[styles.chip, { backgroundColor: chipFill }]}>
        <FlowText style={styles.amount}>
          {isHeal ? '+' : '−'}
          {amount}
        </FlowText>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    zIndex: 20,
  },
  chip: {
    borderRadius: 999,
    paddingHorizontal: 11,
    paddingVertical: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
  },
  amount: {
    fontSize: 17,
    fontWeight: '900',
    color: '#FFFFFF',
    fontVariant: ['tabular-nums'],
  },
})
