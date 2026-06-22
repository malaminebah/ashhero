import { View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { FLOW, flowShadow } from '@/constants/flowTheme'
import { FlowText } from '@/components/ui/flow-text'

import type { DashboardStatsPairParams } from '../../types'

const MiniTrend = ({ variant }: { variant: 'line' | 'bars' }) => {
  const heights =
    variant === 'line' ? [6, 10, 8, 14, 12, 18] : [8, 14, 10, 16, 12, 20, 15]

  return (
    <View className="mt-4 flex-row items-end gap-1">
      {heights.map((h, i) => (
        <View
          key={i}
          className="flex-1 rounded-sm bg-flow-brand/35"
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
      <View
        className="flex-1 rounded-2xl border border-flow-border bg-flow-bg p-4"
        style={flowShadow.card}
      >
        <MaterialIcons name="savings" size={22} color={FLOW.gold} />
        <FlowText className="mt-3 text-xs text-flow-muted">Argent économisé</FlowText>
        <FlowText className="mt-1 text-2xl font-bold text-flow-text">{moneyLabel} €</FlowText>
        <FlowText className="mt-0.5 text-xs text-flow-faint">Total économisé</FlowText>
        <MiniTrend variant="line" />
      </View>
      <View
        className="flex-1 rounded-2xl border border-flow-border bg-flow-bg p-4"
        style={flowShadow.card}
      >
        <MaterialIcons name="cloud" size={22} color={FLOW.brand} />
        <FlowText className="mt-3 text-xs text-flow-muted">{avoidedTitle}</FlowText>
        <FlowText className="mt-1 text-2xl font-bold text-flow-text">{avoidedCount}</FlowText>
        <FlowText className="mt-0.5 text-xs text-flow-faint">{avoidedSubtitle}</FlowText>
        <MiniTrend variant="bars" />
      </View>
    </View>
  )
}
