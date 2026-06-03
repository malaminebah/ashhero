import { useEffect } from 'react'
import { Text, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import type { CombatHpBarParams } from '../types'

export const CombatHpBar = ({
  hp,
  maxHp,
  fillColor,
  overlay,
  name,
  level,
}: CombatHpBarParams) => {
  const pct = Math.max(0, Math.min(100, (hp / maxHp) * 100))
  const clampedHp = Math.max(0, hp)
  const hpWidth = useSharedValue(pct)

  useEffect(() => {
    hpWidth.value = withTiming(pct, { duration: 400 })
  }, [pct, hpWidth])

  const barStyle = useAnimatedStyle(() => ({
    width: `${hpWidth.value}%`,
  }))

  if (overlay) {
    return (
      <View className="rounded-md border border-white/20 bg-black/55 px-2 py-1.5">
        <View className="mb-1 flex-row items-center justify-between gap-2">
          {name ? (
            <Text className="font-mono text-[9px] font-bold uppercase text-white">
              {name}
            </Text>
          ) : null}
          {level != null ? (
            <Text className="font-mono text-[9px] text-white/55">N.{level}</Text>
          ) : null}
        </View>
        <View className="h-2 w-full min-w-[120px] overflow-hidden rounded-sm border border-white/15 bg-black/60">
          <Animated.View style={[barStyle, { height: '100%', backgroundColor: fillColor }]} />
        </View>
        <Text className="mt-0.5 text-right font-mono text-[9px] text-white/80">
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
      <View className="h-3 w-full overflow-hidden rounded-sm border border-white/15 bg-black/50">
        <Animated.View style={[barStyle, { height: '100%', backgroundColor: fillColor }]} />
      </View>
    </View>
  )
}
