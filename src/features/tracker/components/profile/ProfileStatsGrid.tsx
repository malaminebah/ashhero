import { View, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { flowCardShadow, flowSurface } from '@/constants/flowSurfaces'
import { FlowText } from '@/components/ui/flow-text'
import type { ProfileStatsGridParams } from '../../types'
import type { StatDetailKey } from '../statsDetailConfig'

type StatCellParams = {
  value: string | number
  label: string
  statKey: StatDetailKey
}

function StatCell({ value, label, statKey }: StatCellParams) {
  const router = useRouter()

  return (
    <Pressable
      onPress={() => router.push(`/stat/${statKey}` as never)}
      accessibilityRole="button"
      accessibilityLabel={`Stat ${label}`}
      className="min-h-[76px] flex-1 active:opacity-90"
    >
      <View
        className={`min-h-[76px] flex-1 items-center justify-center px-1.5 py-3 ${flowSurface.card}`}
        style={flowCardShadow}
      >
        <FlowText className="text-center text-lg font-bold text-flow-text">{value}</FlowText>
        <FlowText className="mt-1.5 text-center text-[10px] leading-3 text-flow-muted">
          {label}
        </FlowText>
      </View>
    </Pressable>
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
          <StatCell value={dayCount} label="Jours sans vape" statKey="days" />
          <StatCell value={combatsWon} label="Combats gagnés" statKey="combats-won" />
          <StatCell value={combatsLost} label="Combats perdus" statKey="combats-lost" />
        </View>
        <View className="flex-row gap-2">
          <StatCell value={relapseCount ?? 0} label="Rechutes" statKey="relapses" />
          <StatCell value={avoidedCount} label={avoidedLabel} statKey="avoided" />
          <StatCell value={`${moneyLabel} €`} label="Argent économisé" statKey="money" />
        </View>
      </View>
    </View>
  )
}
