import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Image } from 'expo-image'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import {
  ATTACK_FX_DISPLAY_SCALE,
  ATTACK_FX_FRAME_COUNT,
  ATTACK_FX_FRAME_MS,
  ATTACK_FX_FRAME_SIZE,
  attackFxRow,
  attackSparkSheet,
} from '../attackFxSheet'
import type { AttackEffectParams } from '../types'

const sheetW = ATTACK_FX_FRAME_SIZE * ATTACK_FX_FRAME_COUNT
const sheetH = ATTACK_FX_FRAME_SIZE * 9
const viewport = Math.round(ATTACK_FX_FRAME_SIZE * ATTACK_FX_DISPLAY_SCALE)

export const AttackEffect = ({ effect }: AttackEffectParams) => {
  const [frame, setFrame] = useState(0)
  const opacity = useSharedValue(0)
  const scale = useSharedValue(0.6)
  const slideX = useSharedValue(0)

  const playerAttacks = effect != null && effect !== 'boss'

  useEffect(() => {
    if (effect == null) {
      setFrame(0)
      opacity.value = 0
      scale.value = 0.6
      slideX.value = 0
      return
    }

    const towardBoss = effect !== 'boss'
    setFrame(0)
    slideX.value = towardBoss ? -28 : 28
    opacity.value = withSequence(
      withTiming(1, { duration: 120, easing: Easing.out(Easing.ease) }),
      withTiming(1, { duration: ATTACK_FX_FRAME_COUNT * ATTACK_FX_FRAME_MS - 240 }),
      withTiming(0, { duration: 160, easing: Easing.in(Easing.ease) })
    )
    scale.value = withTiming(1, { duration: 200, easing: Easing.out(Easing.back(1.2)) })
    slideX.value = withTiming(towardBoss ? 36 : -36, {
      duration: ATTACK_FX_FRAME_COUNT * ATTACK_FX_FRAME_MS,
      easing: Easing.out(Easing.quad),
    })

    let index = 0
    const id = setInterval(() => {
      index += 1
      if (index >= ATTACK_FX_FRAME_COUNT) {
        clearInterval(id)
        return
      }
      setFrame(index)
    }, ATTACK_FX_FRAME_MS)

    return () => clearInterval(id)
  }, [effect, opacity, scale, slideX])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: slideX.value },
      { scaleX: playerAttacks ? 1 : -1 },
      { scale: scale.value },
    ],
  }))

  if (effect == null) return null

  const row = attackFxRow(effect)
  const displayScale = ATTACK_FX_DISPLAY_SCALE
  const offsetX = -frame * ATTACK_FX_FRAME_SIZE * displayScale
  const offsetY = -row * ATTACK_FX_FRAME_SIZE * displayScale
  const positionClass = playerAttacks
    ? 'absolute right-6 top-16'
    : 'absolute bottom-14 left-6'

  return (
    <Animated.View
      style={animatedStyle}
      className={`z-20 items-center justify-center ${positionClass}`}
      pointerEvents="none"
    >
      <View style={{ width: viewport, height: viewport, overflow: 'hidden' }}>
        <Image
          source={attackSparkSheet}
          style={{
            width: sheetW * displayScale,
            height: sheetH * displayScale,
            transform: [{ translateX: offsetX }, { translateY: offsetY }],
          }}
          contentFit="fill"
        />
      </View>
    </Animated.View>
  )
}
