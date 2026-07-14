import { View, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { GameCard } from '@/components/ui/game-card'
import { GameIcon } from '@/components/ui/game-icon'
import { GameLabel } from '@/components/ui/game-label'
import { FlowText } from '@/components/ui/flow-text'

import type { DashboardStatsPairParams } from '../../types'

export const DashboardStatsPair = ({
  moneySaved,
  avoidedCount,
  avoidedTitle,
}: DashboardStatsPairParams) => {
  const router = useRouter()
  const moneyLabel = moneySaved.toLocaleString('fr-FR', {
    maximumFractionDigits: 0,
  })

  return (
    <View className="mt-3 flex-row gap-3">
      <Pressable
        onPress={() => router.push('/stat/money' as never)}
        accessibilityRole="button"
        accessibilityLabel="Détail argent économisé"
        className="flex-1 active:opacity-90"
      >
        <GameCard>
          <GameIcon name="coin" size={18} color="#fbbf24" />
          <FlowText className="mt-2 text-[22px] font-extrabold text-white">
            {moneyLabel} €
          </FlowText>
          <GameLabel className="mt-0.5">économisés</GameLabel>
        </GameCard>
      </Pressable>
      <Pressable
        onPress={() => router.push('/stat/avoided' as never)}
        accessibilityRole="button"
        accessibilityLabel={`Détail ${avoidedTitle}`}
        className="flex-1 active:opacity-90"
      >
        <GameCard>
          <GameIcon name="lungs" size={18} color="#22c55e" />
          <FlowText className="mt-2 text-[22px] font-extrabold text-white">
            {avoidedCount.toLocaleString('fr-FR')}
          </FlowText>
          <GameLabel className="mt-0.5" numberOfLines={1}>
            {avoidedTitle}
          </GameLabel>
        </GameCard>
      </Pressable>
    </View>
  )
}
