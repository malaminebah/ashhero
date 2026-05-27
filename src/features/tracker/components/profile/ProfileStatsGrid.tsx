import { View, Text } from 'react-native'

type CellProps = {
  value: string | number
  label: string
}

function StatCell({ value, label }: CellProps) {
  return (
    <View className="min-h-[76px] flex-1 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-1.5 py-3">
      <Text className="text-center font-mono text-lg font-bold text-white">{value}</Text>
      <Text className="mt-1.5 text-center font-mono text-[7px] uppercase leading-3 tracking-[0.08rem] text-white/50">
        {label}
      </Text>
    </View>
  )
}

type Props = {
  dayCount: number
  moneySaved: number
  avoidedCount: number
  avoidedLabel: string
  combatsWon: number
  combatsLost: number
  relapseCount: number
}

export const ProfileStatsGrid = ({
  dayCount,
  moneySaved,
  avoidedCount,
  avoidedLabel,
  combatsWon,
  combatsLost,
  relapseCount,
}: Props) => {
  const moneyLabel = moneySaved.toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return (
    <View className="mb-8">
      <Text className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.25rem] text-white/80">
        Tes stats
      </Text>
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
