import { View, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { GameLabel } from '@/components/ui/game-label'
import { FlowText } from '@/components/ui/flow-text'

export const DashboardDailyBonus = () => {
  const router = useRouter()

  return (
    <Pressable
      onPress={() => router.push('/(tabs)/combat' as never)}
      accessibilityRole="button"
      accessibilityLabel="Bonus du jour — lancer un combat"
      className="mt-3 flex-row items-center justify-between rounded-[20px] border border-[rgba(251,191,36,0.35)] bg-brand-card px-4 py-3.5 active:opacity-90"
    >
      <View>
        <FlowText className="text-sm font-extrabold text-brand-gold">
          Bonus du jour · +10 XP
        </FlowText>
        <GameLabel className="mt-0.5 normal-case tracking-normal">
          Gagne un combat aujourd&apos;hui
        </GameLabel>
      </View>
      <View className="rounded-full bg-brand-gold px-3.5 py-2">
        <FlowText className="text-xs font-extrabold" style={{ color: '#3b2000' }}>
          Go !
        </FlowText>
      </View>
    </Pressable>
  )
}
