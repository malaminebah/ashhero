import { View, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

const XP_PER_SEGMENT = 100

type Props = {
  level: number
  xp: number
}

export const ProfileProgressPair = ({ level, xp }: Props) => {
  const inSegment = xp % XP_PER_SEGMENT
  const nextCap = Math.floor(xp / XP_PER_SEGMENT) * XP_PER_SEGMENT + XP_PER_SEGMENT
  const pct = Math.min(100, (inSegment / XP_PER_SEGMENT) * 100)

  return (
    <View className="mb-8 flex-row gap-3">
      <View className="min-h-[88px] flex-1 flex-row items-center rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3">
        <View className="mr-2 h-8 w-8 rotate-45 items-center justify-center border border-brand-success/60 bg-brand-success/15">
          <View className="-rotate-45">
            <Text className="font-mono text-[10px] font-bold text-brand-success">L</Text>
          </View>
        </View>
        <Text className="font-mono text-xs font-bold uppercase tracking-wide text-white">
          Niveau {level}
        </Text>
      </View>

      <View className="min-h-[88px] flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3">
        <Text className="font-mono text-[10px] font-bold uppercase tracking-wide text-white/80">
          XP {xp} / {nextCap}
        </Text>
        <View className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-white/5">
          <LinearGradient
            colors={['#16a34a', '#22c55e', '#4ade80']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{ width: `${pct}%`, height: '100%' }}
          />
        </View>
      </View>
    </View>
  )
}
