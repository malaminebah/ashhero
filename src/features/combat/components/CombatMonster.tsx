import { useEffect } from 'react'
import { Text, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useCombatShakeStyle } from '../hooks/useCombatShakeStyle'

import type { CombatMonsterParams } from '../types'

export const CombatMonster = ({ hp, maxHp, shakeKey }: CombatMonsterParams) => {
  const pct = Math.max(0, Math.min(100, (hp / maxHp) * 100))
  const clampedHp = Math.max(0, hp)
  const shakeStyle = useCombatShakeStyle(shakeKey, 'left')

  const hpWidth = useSharedValue(pct)

  useEffect(() => {
    hpWidth.value = withTiming(pct, { duration: 400 })
  }, [pct, hpWidth])

  const barStyle = useAnimatedStyle(() => ({
    width: `${hpWidth.value}%`,
  }))

  return (
    <Animated.View style={shakeStyle} className="mb-8 w-full items-end pr-4">
      <View className="w-full max-w-[240px] rounded-lg border-4  bg-black p-6 shadow-lg">
        <View className=" flex-row justify-between">
          <Text className="font-mono text-[10px] text-white/50">PV</Text>
          <Text className="text-right font-mono text-[10px] text-white">
            {clampedHp} / {maxHp}
          </Text>
        </View>
        <View className="h-3 w-full overflow-hidden rounded-sm border-2 border-brand-border bg-white/10">
          <Animated.View style={barStyle} className="h-full bg-brand-accent" />
        </View>
        <Text className="text-[80px] text-right leading-[88px]">👾</Text>
      </View>
      <View className="mt-4 w-full max-w-[240px]"></View>
    </Animated.View>
  )
}
