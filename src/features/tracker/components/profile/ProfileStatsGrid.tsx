import { View } from 'react-native'
import { flowShadow } from '@/constants/flowTheme'
import { FlowText } from '@/components/ui/flow-text'
import type { ProfileStatsGridParams } from '../../types'

type CellProps = {
  value: string | number
  label: string
}

function StatCell({ value, label }: CellProps) {
  return (
    <View
      className="min-h-[76px] flex-1 items-center justify-center rounded-2xl border border-flow-border bg-flow-bg px-1.5 py-3"
      style={flowShadow.card}
    >
      <FlowText className="text-center text-lg font-bold text-flow-text">{value}</FlowText>
      <FlowText className="mt-1.5 text-center text-[10px] leading-3 text-flow-muted">
        {label}
      </FlowText>
    </View>
  )
}

export const ProfileStatsGrid = ({
  dayCount,
  moneySaved,
  avoidedCount,
  avoidedLabel,
  combatsWon,
  combatsLost,
  relapseCount,
}: ProfileStatsGridParams) => {
  const moneyLabel = moneySaved.toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return (
    <View className="mb-8">
      <FlowText className="mb-3 text-sm font-bold text-flow-text">Tes stats</FlowText>
      <View className="gap-2">
        <View className="flex-row gap-2">
          <StatCell value={dayCount} label="Jours sans vape" />
          <StatCell value={combatsWon} label="Combats gagnés" />
          <StatCell value={combatsLost} label="Combats perdus" />
        </View>
        <View className="flex-row gap-2">
          <StatCell value={relapseCount ?? 0} label="Rechutes" />
          <StatCell value={avoidedCount} label={avoidedLabel} />
          <StatCell value={`${moneyLabel} €`} label="Argent économisé" />
        </View>
      </View>
    </View>
  )
}
