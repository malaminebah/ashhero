import { View, Text } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import type { DashboardStatsPairParams } from '../../types'

const MiniTrend = ({ variant }: { variant: 'line' | 'bars' }) => {
  const heights =
    variant === 'line' ? [6, 10, 8, 14, 12, 18] : [8, 14, 10, 16, 12, 20, 15]

  return (
    <View className="mt-4 flex-row items-end gap-1">
      {heights.map((h, i) => (
        <View
          key={i}
          className="flex-1 rounded-sm bg-brand-success/35"
          style={{ height: h }}
        />
      ))}
    </View>
  )
}

export const DashboardStatsPair = ({
  moneySaved,
  avoidedCount,
  avoidedTitle,
  avoidedSubtitle,
}: DashboardStatsPairParams) => {
  const moneyLabel = moneySaved.toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return (
    <View className="mb-8 flex-row gap-3">
      <View className="flex-1 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <MaterialIcons name="savings" size={22} color="#fbbf24" />
        <Text className="mt-3 font-mono text-[9px] uppercase tracking-[0.12rem] text-white/50">
          Argent économisé
        </Text>
        <Text className="mt-1 font-mono text-2xl font-bold text-white">{moneyLabel} €</Text>
        <Text className="mt-0.5 font-mono text-[9px] text-white/40">Total économisé</Text>
        <MiniTrend variant="line" />
      </View>
      <View className="flex-1 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <MaterialIcons name="cloud" size={22} color="#93c5fd" />
        <Text className="mt-3 font-mono text-[9px] uppercase tracking-[0.12rem] text-white/50">
          {avoidedTitle}
        </Text>
        <Text className="mt-1 font-mono text-2xl font-bold text-white">{avoidedCount}</Text>
        <Text className="mt-0.5 font-mono text-[9px] text-white/40">{avoidedSubtitle}</Text>
        <MiniTrend variant="bars" />
      </View>
    </View>
  )
}
