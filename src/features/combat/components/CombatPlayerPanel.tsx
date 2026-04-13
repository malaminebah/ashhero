import { View, Text } from 'react-native'
import Animated from 'react-native-reanimated'
import { useCombatShakeStyle } from '../hooks/useCombatShakeStyle'

type Props = {
  hp: number
  maxHp: number
  /** Increments on each hit taken by the player (triggers shake animation). */
  shakeKey: number
  label?: string
}

export const CombatPlayerPanel = ({
  hp,
  maxHp,
  shakeKey,
  label = 'Composure',
}: Props) => {
  const pct = Math.max(0, Math.min(100, (hp / maxHp) * 100))
  const clampedHp = Math.max(0, hp)
  const shakeStyle = useCombatShakeStyle(shakeKey)

  return (
    <Animated.View style={shakeStyle} className="mb-6 w-full items-center">
      <View className="w-full max-w-[220px] items-center border-4 border-white/25 bg-brand-bg2 p-4">
        <Text className="text-[56px] leading-[64px]">🛡️</Text>
        <Text className="mt-1 font-mono text-[10px] uppercase tracking-[0.3rem] text-white/80">
          {label}
        </Text>
      </View>
      <View className="mt-3 w-full max-w-[220px]">
        <View className="mb-1 flex-row justify-between">
          <Text className="font-mono text-[10px] text-white/50">PV</Text>
          <Text className="font-mono text-[10px] text-white">
            {clampedHp} / {maxHp}
          </Text>
        </View>
        <View className="h-3 w-full overflow-hidden border-2 border-brand-border bg-white/10">
          <View className="h-full bg-emerald-500" style={{ width: `${pct}%` }} />
        </View>
      </View>
    </Animated.View>
  )
}
