import { View, Text } from 'react-native'

export const DashboardDailyBonus = () => (
  <View className="flex-row items-center rounded-2xl border border-brand-gold/30 bg-brand-gold/10 px-4 py-4">
    <Text className="text-2xl">✨</Text>
    <View className="mx-3 flex-1">
      <Text className="font-mono text-xs font-bold uppercase tracking-wide text-white">
        Bonus quotidien
      </Text>
      <Text className="mt-1 font-mono text-[10px] text-white/50">
        Reviens demain pour +50 XP !
      </Text>
    </View>
    <Text className="font-mono text-lg font-bold text-brand-gold">+50</Text>
  </View>
)
