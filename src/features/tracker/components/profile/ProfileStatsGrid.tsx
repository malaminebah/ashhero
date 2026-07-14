import { View, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { GameCard } from '@/components/ui/game-card'
import { GameLabel } from '@/components/ui/game-label'
import { FlowText } from '@/components/ui/flow-text'
import type { ProfileStatsGridParams } from '../../types'
import type { StatDetailKey } from '../statsDetailConfig'

type StatCellParams = {
  value: string | number
  label: string
  statKey: StatDetailKey
  valueColor?: string
}

function StatCell({ value, label, statKey, valueColor = '#ffffff' }: StatCellParams) {
  const router = useRouter()

  return (
    <Pressable
      onPress={() => router.push(`/stat/${statKey}` as never)}
      accessibilityRole="button"
      accessibilityLabel={`Stat ${label}`}
      className="flex-1 active:opacity-90"
    >
      <GameCard className="min-h-[84px] items-center justify-center px-1.5 py-3.5">
        <FlowText className="text-center text-2xl font-extrabold" style={{ color: valueColor }}>
          {value}
        </FlowText>
        <GameLabel className="mt-1 text-center normal-case tracking-normal" numberOfLines={2}>
          {label}
        </GameLabel>
      </GameCard>
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
    maximumFractionDigits: 0,
  })

  return (
    <View className="mb-6">
      <GameLabel className="mb-2.5">Tes stats</GameLabel>
      <View className="gap-3">
        <View className="flex-row gap-3">
          <StatCell value={dayCount} label="jours sans vape" statKey="days" valueColor="#22c55e" />
          <StatCell value={combatsWon} label="combats gagnés" statKey="combats-won" />
        </View>
        <View className="flex-row gap-3">
          <StatCell value={combatsLost} label="combats perdus" statKey="combats-lost" valueColor="#ef4444" />
          <StatCell value={relapseCount ?? 0} label="rechutes" statKey="relapses" valueColor="#fbbf24" />
        </View>
        <View className="flex-row gap-3">
          <StatCell value={avoidedCount.toLocaleString('fr-FR')} label={avoidedLabel} statKey="avoided" />
          <StatCell value={`${moneyLabel} €`} label="argent économisé" statKey="money" valueColor="#fbbf24" />
        </View>
      </View>
    </View>
  )
}
