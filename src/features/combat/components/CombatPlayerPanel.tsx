import { useEffect } from 'react'
import { Text, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { PlayerHeroEmoji } from '@/src/features/tracker/components/PlayerHeroEmoji'
import { useTrackerStore } from '@/src/features/tracker/store'
import { useCombatShakeStyle } from '../hooks/useCombatShakeStyle'

type Props = {
  hp: number
  maxHp: number
  /** Increments on each hit taken by the player (triggers shake animation). */
  shakeKey: number
  label?: string
}

export const CombatPlayerPanel = ({ hp, maxHp, shakeKey }: Props) => {
  const level = useTrackerStore((s) => s.level)
  const pct = Math.max(0, Math.min(100, (hp / maxHp) * 100))
  const clampedHp = Math.max(0, hp)
  const shakeStyle = useCombatShakeStyle(shakeKey)

  const hpWidth = useSharedValue(pct)

  useEffect(() => {
    hpWidth.value = withTiming(pct, { duration: 400 })
  }, [pct, hpWidth])

  const barStyle = useAnimatedStyle(() => ({
    width: `${hpWidth.value}%`,
  }))

  return (
    <Animated.View style={shakeStyle} className="mb-6 w-full items-start pl-4">
      <PlayerHeroEmoji level={level} variant="combat" />
      <View className="mt-3 w-full max-w-[240px]">
        <View className="mb-1 flex-row justify-between">
          <Text className="font-mono text-[10px] text-white/50">PV</Text>
          <Text className="font-mono text-[10px] text-white">
            {clampedHp} / {maxHp}
          </Text>
        </View>
        <View className="h-3 w-full overflow-hidden rounded-sm border-2 border-brand-border bg-white/10">
          <Animated.View style={barStyle} className="h-full bg-emerald-500" />
        </View>
      </View>
    </Animated.View>
  )
}
