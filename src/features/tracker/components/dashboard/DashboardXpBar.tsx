import { View, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

const XP_PER_SEGMENT = 100

import type { DashboardXpBarParams } from '../../types'

export const DashboardXpBar = ({ totalXp }: DashboardXpBarParams) => {
  const inSegment = totalXp % XP_PER_SEGMENT
  const nextCap = Math.floor(totalXp / XP_PER_SEGMENT) * XP_PER_SEGMENT + XP_PER_SEGMENT
  const pct = Math.min(100, (inSegment / XP_PER_SEGMENT) * 100)

  return (
    <View className="mb-8 w-full">
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="font-mono text-[10px] font-bold uppercase tracking-[0.2rem] text-white/80">
          XP
        </Text>
        <View className="flex-row items-center gap-1.5">
          <Text className="font-mono text-xs text-white/90">
            {totalXp} / {nextCap}
          </Text>
          <View className="h-3 w-3 rotate-45 border border-brand-gold/70 bg-brand-gold/25" />
        </View>
      </View>
      <View className="h-3.5 w-full overflow-hidden rounded-full border border-brand-success/35 bg-white/5">
        <LinearGradient
          colors={['#16a34a', '#22c55e', '#4ade80']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{ width: `${pct}%`, height: '100%' }}
        />
      </View>
    </View>
  )
}
