import { View, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { FLOW } from '@/constants/flowTheme'
import { flowCardShadow, flowSurface } from '@/constants/flowSurfaces'
import { FlowText } from '@/components/ui/flow-text'

export const DashboardDailyBonus = () => {
  const router = useRouter()

  return (
    <Pressable
      onPress={() => router.push('/(tabs)/combat' as never)}
      accessibilityRole="button"
      accessibilityLabel="Bonus du jour — lancer un combat"
      className={`flex-row items-center border border-flow-gold/25 bg-flow-secondary px-4 py-4 active:opacity-90 ${flowSurface.card}`}
      style={flowCardShadow}
    >
      <View className={`mr-3 h-11 w-11 ${flowSurface.iconWell} bg-flow-gold/15`}>
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
