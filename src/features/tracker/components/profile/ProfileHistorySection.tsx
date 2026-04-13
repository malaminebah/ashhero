import { View, Text } from 'react-native'

type Props = {
  combatsWon: number
}

/** Placeholder history UI; day-by-day sync with Firestore can come later. */
export const ProfileHistorySection = ({ combatsWon }: Props) => (
  <View className="mb-6">
    <Text className="mb-3 font-mono text-[10px] uppercase tracking-[0.25rem] text-white/70">
      Historique
    </Text>

    <View className="mb-3 flex-row items-center rounded-xl border border-brand-accent/15 bg-white/[0.04] px-4 py-3">
      <View className="mr-3 h-2 w-2 rounded-full bg-brand-accent" />
      <View className="flex-1">
        <Text className="font-mono text-xs text-white">
          {combatsWon > 0
            ? `Combat gagné (×${combatsWon} au total)`
            : "Aucun combat enregistré pour l'instant"}
        </Text>
        <Text className="mt-0.5 font-mono text-[10px] text-white/40">Progression</Text>
      </View>
      <View className="rounded-full border border-red-500/40 bg-red-500/15 px-2 py-1">
        <Text className="font-mono text-[8px] font-bold uppercase tracking-wider text-red-300">
          Combat
        </Text>
      </View>
    </View>

    <View className="flex-row items-center rounded-xl border border-brand-gold/25 bg-brand-gold/10 px-4 py-3">
      <View className="mr-3 h-2 w-2 rounded-full bg-brand-gold" />
      <View className="flex-1">
        <Text className="font-mono text-xs text-white">Bonus quotidien (+50 XP)</Text>
        <Text className="mt-0.5 font-mono text-[10px] text-white/40">Bientôt disponible</Text>
      </View>
      <View className="rounded-full border border-brand-gold/50 bg-brand-gold/20 px-2 py-1">
        <Text className="font-mono text-[8px] font-bold uppercase tracking-wider text-brand-gold">
          Bonus
        </Text>
      </View>
    </View>
  </View>
)
