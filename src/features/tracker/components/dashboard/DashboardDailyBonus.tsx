import { View, Text, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { IconSymbol } from '@/components/ui/icon-symbol'

export const DashboardDailyBonus = () => {
  const router = useRouter()

  return (
    <Pressable
      onPress={() => router.push('/(tabs)/combat' as never)}
      accessibilityRole="button"
      accessibilityLabel="Bonus du jour — lancer un combat"
      className="flex-row items-center rounded-2xl border border-brand-gold/25 bg-brand-gold/10 px-4 py-4 active:opacity-85"
    >
      <View className="mr-3 h-11 w-11 items-center justify-center rounded-xl bg-brand-gold/15">
        <IconSymbol name="gift.fill" size={24} color="#fbbf24" />
      </View>
      <View className="flex-1">
        <Text className="font-mono text-xs font-bold uppercase tracking-wide text-white">
          Bonus du jour
        </Text>
        <Text className="mt-1 font-mono text-[10px] leading-4 text-white/55">
          Gagne de l’XP en lançant un combat aujourd’hui !
        </Text>
      </View>
      <IconSymbol name="chevron.right" size={20} color="rgba(255,255,255,0.45)" />
    </Pressable>
  )
}
