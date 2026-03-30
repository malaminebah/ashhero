import { View, Text } from 'react-native'

type CellProps = {
  value: string | number
  label: string
  valueClass: string
}

function StatCell({ value, label, valueClass }: CellProps) {
  return (
    <View className="min-h-[92px] flex-1 items-center justify-center rounded-xl border border-brand-accent/20 bg-white/[0.04] px-2 py-3">
      <Text className={`text-center font-mono text-xl font-bold ${valueClass}`}>{value}</Text>
      <Text className="mt-1.5 text-center font-mono text-[8px] uppercase leading-3 tracking-[0.1rem] text-white/55">
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
  lifeRegainedMinutes: number
  lifeRegainedLabel: string
  combatsWon: number
  xp: number
  level: number
}

export const ProfileStatsGrid = ({
  dayCount,
  moneySaved,
  avoidedCount,
  avoidedLabel,
  lifeRegainedMinutes,
  lifeRegainedLabel,
  combatsWon,
  xp,
  level,
}: Props) => (
  <View className="mb-8">
    <Text className="mb-3 font-mono text-[10px] uppercase tracking-[0.25rem] text-white/70">
      Statistiques
    </Text>
    <View className="gap-2">
      <View className="flex-row gap-2">
        <StatCell value={dayCount} label="Jours sans vape" valueClass="text-brand-accent" />
        <StatCell value={`${moneySaved}€`} label="Argent économisé" valueClass="text-brand-gold" />
        <StatCell value={avoidedCount} label={avoidedLabel} valueClass="text-white" />
      </View>
      <View className="flex-row gap-2">
        <StatCell
          value={`${Math.round(lifeRegainedMinutes)} min`}
          label={lifeRegainedLabel}
          valueClass="text-rose-300"
        />
        <StatCell value={combatsWon} label="Combats gagnés" valueClass="text-green-400" />
      </View>
      <View className="flex-row gap-2">
        <StatCell value={xp} label="XP total" valueClass="text-sky-400" />
        <StatCell value={level} label="Niveau actuel" valueClass="text-yellow-400" />
      </View>
    </View>
  </View>
)
