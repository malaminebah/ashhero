import { View, Text } from 'react-native'
import { PlayerHeroEmoji } from '../PlayerHeroEmoji'
import { getCheerMessage } from '../../utils/cheerMessage'

import type { DashboardHeroParams } from '../../types'

export const DashboardHero = ({ dayCount, level }: DashboardHeroParams) => (
  <View className="mb-6 items-center">
    <View
      className="mb-5 h-[168px] w-[168px] items-center justify-center rounded-full border-2 border-brand-success/35 bg-brand-bg2"
      style={{
        shadowColor: '#22c55e',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.45,
        shadowRadius: 28,
        elevation: 14,
      }}
    >
      <View className="h-[148px] w-[148px] items-center justify-center rounded-full bg-brand-bg/80">
        <PlayerHeroEmoji level={level} variant="dashboard" />
      </View>
    </View>
    <Text className="font-mono text-6xl font-black tracking-tighter text-white">{dayCount}</Text>
    <Text className="mt-1 font-mono text-[10px] uppercase tracking-[0.35rem] text-white/50">
      Jours sans vape
    </Text>
    <Text className="mt-3 font-mono text-sm text-white/70">{getCheerMessage(dayCount)}</Text>
  </View>
)
