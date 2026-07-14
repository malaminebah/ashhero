import { useState } from 'react'
import { Pressable, ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BossSprite } from '@/components/characters/BossSprite'
import { ChunkyButton, CHUNKY_COLORS } from '@/components/ui/chunky-button'
import { FlowText } from '@/components/ui/flow-text'
import { GameCard } from '@/components/ui/game-card'
import { GameLabel } from '@/components/ui/game-label'
import { floatingTabClearance } from '@/src/features/navigation/floatingTabBar'
import { useTrackerStore } from '@/src/features/tracker/store'
import { CRAVING_TIER_ORDER, CRAVING_TIERS } from '../constants'
import type { CombatArenaScreenParams, CravingTier } from '../types'
import { ArenaFrame } from './ArenaFrame'
import { ArenaSprites } from './ArenaSprites'

const TIER_COLOR: Record<CravingTier, string> = {
  soft: '#60a5fa',
  medium: '#a855f7',
  hard: '#ef4444',
}

const TIER_SHORT_LABEL: Record<CravingTier, string> = {
  soft: 'Douce',
  medium: 'Moyenne',
  hard: 'Forte',
}

/** Boss preview grows with the tier — the stronger the craving, the bigger the boss. */
const TIER_PREVIEW_SIZE: Record<CravingTier, number> = {
  soft: 40,
  medium: 48,
  hard: 60,
}

export const CombatArenaScreen = ({ onLaunchCombat }: CombatArenaScreenParams) => {
  const insets = useSafeAreaInsets()
  const combatsWon = useTrackerStore((s) => s.combatsWon)
  const combatsLost = useTrackerStore((s) => s.combatsLost)
  const bestStreak = useTrackerStore((s) => s.bestStreak)
  const [tier, setTier] = useState<CravingTier>('soft')

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
        À quel point l&apos;envie est-elle forte, là maintenant ?
      </FlowText>

      <View className="mt-4 flex-row gap-2.5">
        {CRAVING_TIER_ORDER.map((t) => {
          const config = CRAVING_TIERS[t]
          const selected = t === tier
          return (
            <Pressable
              key={t}
              onPress={() => setTier(t)}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              accessibilityLabel={`${config.label} — ${config.bossName}, ${config.bossHp} PV`}
              className="flex-1"
            >
              <GameCard
                className="items-center px-2 pb-2.5 pt-3"
                style={{
                  borderWidth: 2,
                  borderColor: selected ? TIER_COLOR[t] : 'rgba(255,255,255,0.08)',
                  opacity: selected ? 1 : 0.75,
                }}
              >
                <View className="h-[64px] justify-end">
                  <BossSprite
                    pose="idle"
                    variant={t}
                    width={TIER_PREVIEW_SIZE[t]}
                    height={TIER_PREVIEW_SIZE[t]}
                  />
                </View>
                <FlowText
                  className="mt-1.5 text-[13px] font-extrabold"
                  style={{ color: TIER_COLOR[t] }}
                >
                  {TIER_SHORT_LABEL[t]}
                </FlowText>
                <FlowText className="text-[11px] font-bold text-brand-muted">
                  {config.bossName} · {config.bossHp} PV
                </FlowText>
                <FlowText className="text-[11px] font-bold text-brand-gold">
                  {config.victoryBonusXp > 0 ? `+${config.victoryBonusXp} XP` : ' '}
                </FlowText>
              </GameCard>
            </Pressable>
          )
        })}
      </View>

      <ArenaFrame label="ARÈNE DE NUIT" style={{ height: 320, marginTop: 14 }}>
        <ArenaSprites playerAnim="idle" bossAnim="idle" bossTier={tier} />
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
          label={`COMBATTRE ${CRAVING_TIERS[tier].bossName.toUpperCase()}`}
          palette={CHUNKY_COLORS.green}
          height={62}
          fontSize={18}
          letterSpacing={2}
          onPress={() => onLaunchCombat(tier)}
          accessibilityLabel={`Lancer un combat contre ${CRAVING_TIERS[tier].bossName}`}
        />
      </View>
    </ScrollView>
  )
}
