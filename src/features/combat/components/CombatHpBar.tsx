import { useEffect } from 'react'
import { Text, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

type Props = {
  hp: number
  maxHp: number
  fillColor: string
}

export const CombatHpBar = ({ hp, maxHp, fillColor }: Props) => {
  const pct = Math.max(0, Math.min(100, (hp / maxHp) * 100))
  const clampedHp = Math.max(0, hp)
  const hpWidth = useSharedValue(pct)

  useEffect(() => {
    hpWidth.value = withTiming(pct, { duration: 400 })
  }, [pct, hpWidth])

  const barStyle = useAnimatedStyle(() => ({
    width: `${hpWidth.value}%`,
  }))

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
