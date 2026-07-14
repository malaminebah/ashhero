import { ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ChunkyButton, CHUNKY_COLORS } from '@/components/ui/chunky-button'
import { FlowText } from '@/components/ui/flow-text'
import { GameCard } from '@/components/ui/game-card'
import { GameLabel } from '@/components/ui/game-label'
import { floatingTabClearance } from '@/src/features/navigation/floatingTabBar'
import { useTrackerStore } from '@/src/features/tracker/store'
import type { CombatArenaScreenParams } from '../types'
import { ArenaFrame } from './ArenaFrame'
import { ArenaSprites } from './ArenaSprites'

export const CombatArenaScreen = ({ onLaunchCombat }: CombatArenaScreenParams) => {
  const insets = useSafeAreaInsets()
  const combatsWon = useTrackerStore((s) => s.combatsWon)
  const combatsLost = useTrackerStore((s) => s.combatsLost)
  const bestStreak = useTrackerStore((s) => s.bestStreak)

  return (
    <ScrollView
      className="flex-1 bg-brand-bg"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: insets.top + 16,
        paddingHorizontal: 20,
        paddingBottom: floatingTabClearance(insets.bottom),
      }}
    >
      <FlowText className="text-2xl font-extrabold text-white" style={{ letterSpacing: -0.4 }}>
        Affronte l&apos;Envie
      </FlowText>
      <FlowText className="mt-1.5 text-[15px] leading-6 text-brand-muted">
        Transforme chaque envie en victoire.
      </FlowText>

      <ArenaFrame label="ARÈNE DE NUIT" style={{ height: 340, marginTop: 20 }}>
        <ArenaSprites playerAnim="idle" bossAnim="idle" />
      </ArenaFrame>

      <View className="mt-3.5 flex-row gap-2.5">
        <GameCard className="flex-1 items-center px-2 py-3">
          <FlowText className="text-xl font-extrabold text-brand-success">{combatsWon}</FlowText>
          <GameLabel>victoires</GameLabel>
        </GameCard>
        <GameCard className="flex-1 items-center px-2 py-3">
          <FlowText className="text-xl font-extrabold text-brand-red">{combatsLost}</FlowText>
          <GameLabel>défaites</GameLabel>
        </GameCard>
        <GameCard className="flex-1 items-center px-2 py-3">
          <FlowText className="text-xl font-extrabold text-brand-gold">{bestStreak}</FlowText>
          <GameLabel>série</GameLabel>
        </GameCard>
      </View>

      <View className="mt-4">
        <ChunkyButton
          label="COMBATTRE"
          palette={CHUNKY_COLORS.green}
          height={62}
          fontSize={18}
          letterSpacing={2}
          onPress={onLaunchCombat}
          accessibilityLabel="Lancer un combat"
        />
      </View>
    </ScrollView>
  )
}
