import { View, Text } from 'react-native'

type Props = {
  moneySaved: number
  avoidedCount: number
  avoidedLabel: string
}

export const DashboardStatsPair = ({
  moneySaved,
  avoidedCount,
  avoidedLabel,
}: Props) => (
  <View className="mb-8 flex-row gap-3">
    <View className="flex-1 rounded-2xl border border-brand-accent/20 bg-white/[0.04] p-4">
      <Text className="font-mono text-2xl font-bold text-brand-gold">{moneySaved}€</Text>
      <Text className="mt-1 font-mono text-[9px] uppercase tracking-[0.15rem] text-white/60">
        Économisé
      </Text>
    </View>
    <View className="flex-1 rounded-2xl border border-brand-accent/20 bg-white/[0.04] p-4">
      <Text className="font-mono text-2xl font-bold text-brand-accent">{avoidedCount}</Text>
      <Text className="mt-1 font-mono text-[9px] uppercase tracking-[0.15rem] text-white/60">
        {avoidedLabel}
      </Text>
    </View>
  </View>
)
