import { useEffect } from 'react'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import { ARENA_SPRITE_LAYOUT } from '../arenaAssets'
import {
  ATTACK_FX_DISPLAY_SCALE,
  ATTACK_FX_DURATION_MS,
  ATTACK_FX_FRAME_COUNT,
  ATTACK_FX_FRAME_MS,
  ATTACK_FX_FRAME_SIZE,
  ATTACK_FX_ROWS,
  attackFxRow,
  attackSparkSheet,
} from '../attackFxSheet'
import type { AttackEffectParams } from '../types'
import { SheetSprite } from './SheetSprite'

export const AttackEffect = ({ effect }: AttackEffectParams) => {
  const opacity = useSharedValue(0)
  const juiceScale = useSharedValue(0.65)
  const slideX = useSharedValue(0)

  const playerAttacks = effect != null && effect !== 'boss'

  useEffect(() => {
    if (effect == null) {
      opacity.value = 0
      juiceScale.value = 0.65
      slideX.value = 0
      return
    }

    const towardBoss = effect !== 'boss'
    slideX.value = 0
    opacity.value = withSequence(
      withTiming(1, { duration: 100, easing: Easing.out(Easing.ease) }),
      withTiming(1, { duration: ATTACK_FX_DURATION_MS - 220 }),
      withTiming(0, { duration: 120, easing: Easing.in(Easing.ease) })
    )
    juiceScale.value = withTiming(1, {
      duration: 180,
      easing: Easing.out(Easing.back(1.15)),
    })
    slideX.value = withTiming(towardBoss ? 48 : -48, {
      duration: ATTACK_FX_DURATION_MS,
      easing: Easing.out(Easing.cubic),
    })
  }, [effect, juiceScale, opacity, slideX])

  const wrapperStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: slideX.value },
      { scaleX: playerAttacks ? 1 : -1 },
      { scale: juiceScale.value },
    ],
  }))

  if (effect == null) return null

  const anchor = playerAttacks ? ARENA_SPRITE_LAYOUT.fxFromPlayer : ARENA_SPRITE_LAYOUT.fxFromBoss

  return (
    <Animated.View
      style={[wrapperStyle, { position: 'absolute', zIndex: 20, ...anchor }]}
      pointerEvents="none"
    >
      <SheetSprite
        sheet={attackSparkSheet}
        frameSize={ATTACK_FX_FRAME_SIZE}
        sheetH={ATTACK_FX_FRAME_SIZE * ATTACK_FX_ROWS}
        sheetCols={ATTACK_FX_FRAME_COUNT}
        displayScale={ATTACK_FX_DISPLAY_SCALE}
        row={attackFxRow(effect)}
        frames={ATTACK_FX_FRAME_COUNT}
        frameMs={ATTACK_FX_FRAME_MS}
        loop={false}
        animKey={effect}
        accessibilityLabel=""
      />
    </Animated.View>
  )
}
