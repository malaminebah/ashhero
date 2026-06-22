import { View, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { FLOW } from '@/constants/flowTheme'
import { FlowText } from '@/components/ui/flow-text'

export const DashboardDailyBonus = () => {
  const router = useRouter()

  return (
    <Pressable
      onPress={() => router.push('/(tabs)/combat' as never)}
      accessibilityRole="button"
      accessibilityLabel="Bonus du jour — lancer un combat"
      className="flex-row items-center rounded-2xl border border-flow-gold/30 bg-flow-secondary px-4 py-4 active:opacity-90"
    >
      <View className="mr-3 h-11 w-11 items-center justify-center rounded-xl bg-flow-gold/20">
        <MaterialCommunityIcons name="gift-outline" size={24} color={FLOW.gold} />
      </View>
      <View className="flex-1">
        <FlowText className="text-sm font-bold text-flow-text">Bonus du jour</FlowText>
        <FlowText className="mt-1 text-xs leading-4 text-flow-muted">
          Gagne de l&apos;XP en lançant un combat aujourd&apos;hui !
        </FlowText>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={20} color={FLOW.faint} />
    </Pressable>
  )
}
