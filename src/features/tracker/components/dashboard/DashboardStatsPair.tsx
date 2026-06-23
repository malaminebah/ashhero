import { View, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { FLOW, flowShadow } from '@/constants/flowTheme'
import { flowSurface } from '@/constants/flowSurfaces'
import { FlowText } from '@/components/ui/flow-text'

import type { DashboardStatsPairParams } from '../../types'

const STAT_CARD_H = 168

const MiniTrend = ({ variant }: { variant: 'line' | 'bars' }) => {
  const heights =
    variant === 'line' ? [6, 10, 8, 14, 12, 18] : [8, 14, 10, 16, 12, 20, 15]

  return (
    <View className="mt-auto flex-row items-end gap-1 pt-3">
      {heights.map((h, i) => (
        <View
          key={i}
          className="flex-1 rounded-full bg-flow-brand/30"
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
  const router = useRouter()
  const moneyLabel = moneySaved.toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return (
    <View className="mb-8 flex-row gap-3" style={{ height: STAT_CARD_H }}>
      <Pressable
        onPress={() => router.push('/stat/money' as never)}
        accessibilityRole="button"
        accessibilityLabel="Détail argent économisé"
        className="flex-1 active:opacity-90"
        style={{ height: STAT_CARD_H }}
      >
        <View
          className={`h-full flex-col overflow-hidden p-4 ${flowSurface.card}`}
          style={flowShadow.card}
        >
          <MaterialIcons name="savings" size={22} color={FLOW.gold} />
          <FlowText className="mt-3 text-xs text-flow-muted">Argent économisé</FlowText>
          <FlowText className="mt-1 text-2xl font-bold text-flow-text">{moneyLabel} €</FlowText>
          <FlowText className="mt-0.5 text-xs text-flow-faint">Total économisé</FlowText>
          <MiniTrend variant="line" />
        </View>
      </Pressable>
      <Pressable
        onPress={() => router.push('/stat/avoided' as never)}
        accessibilityRole="button"
        accessibilityLabel={`Détail ${avoidedTitle}`}
        className="flex-1 active:opacity-90"
        style={{ height: STAT_CARD_H }}
      >
        <View
          className={`h-full flex-col overflow-hidden p-4 ${flowSurface.card}`}
          style={flowShadow.card}
        >
          <MaterialIcons name="cloud" size={22} color={FLOW.brand} />
          <FlowText className="mt-3 text-xs text-flow-muted" numberOfLines={2}>
            {avoidedTitle}
          </FlowText>
          <FlowText className="mt-1 text-2xl font-bold text-flow-text">{avoidedCount}</FlowText>
          <FlowText className="mt-0.5 text-xs text-flow-faint" numberOfLines={1}>
            {avoidedSubtitle}
          </FlowText>
          <MiniTrend variant="bars" />
        </View>
      </Pressable>
    </View>
  )
}
