import { useEffect, useMemo, useState } from 'react'
import { Text, View } from 'react-native'
import { Image } from 'expo-image'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { hpBarFillFrame } from '../hpBarFrame'
import {
  HP_BAR_DISPLAY_SCALE,
  HP_BAR_FILL_X,
  HP_BAR_FRAME_H,
  HP_BAR_FRAME_W,
  HP_BAR_SHEET_H,
  HP_BAR_SHEET_W,
  HP_BAR_Y,
  hpBarsSheet,
} from '../hpBarSheet'
import type { CombatHpBarParams } from '../types'

const viewportW = Math.round(HP_BAR_FRAME_W * HP_BAR_DISPLAY_SCALE)
const viewportH = Math.round(HP_BAR_FRAME_H * HP_BAR_DISPLAY_SCALE)

export const CombatHpBar = ({
  hp,
  maxHp,
  variant,
  overlay,
  name,
  level,
}: CombatHpBarParams) => {
  const clampedHp = Math.max(0, hp)
  const targetFrame = useMemo(() => hpBarFillFrame(clampedHp, maxHp), [clampedHp, maxHp])
  const [frame, setFrame] = useState(targetFrame)
  const opacity = useSharedValue(1)

  useEffect(() => {
    setFrame(targetFrame)
    opacity.value = withTiming(0.85, { duration: 80 }, () => {
      opacity.value = withTiming(1, { duration: 200 })
    })
  }, [targetFrame, opacity])

  const animatedWrap = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  const scale = HP_BAR_DISPLAY_SCALE
  const offsetX = -HP_BAR_FILL_X[frame] * scale
  const offsetY = -HP_BAR_Y[variant] * scale

  const bar = (
    <Animated.View style={animatedWrap}>
      <View style={{ width: viewportW, height: viewportH, overflow: 'hidden' }}>
        <Image
          source={hpBarsSheet}
          style={{
            width: HP_BAR_SHEET_W * scale,
            height: HP_BAR_SHEET_H * scale,
            transform: [{ translateX: offsetX }, { translateY: offsetY }],
          }}
          contentFit="fill"
        />
      </View>
    </Animated.View>
  )

  if (overlay) {
    return (
      <View>
        <View className="mb-1 flex-row items-center justify-between gap-2">
          {name ? (
            <Text className="font-mono text-[10px] font-bold uppercase text-white">
              {name}
            </Text>
          ) : null}
          {level != null ? (
            <Text className="font-mono text-[10px] text-white/55">N.{level}</Text>
          ) : null}
        </View>
        {bar}
        <Text className="mt-0.5 text-right font-mono text-[10px] text-white/80">
          {clampedHp}/{maxHp}
        </Text>
      </View>
    )
  }

  return (
    <View className="w-full">
      <View className="mb-1 flex-row items-center justify-between">
        <Text className="font-mono text-[10px] uppercase text-white/55">PV</Text>
        <Text className="font-mono text-[10px] text-white">
          {clampedHp} / {maxHp}
        </Text>
      </View>
      {bar}
    </View>
  )
}
