import { View, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { GameCard } from '@/components/ui/game-card'
import { GameIcon } from '@/components/ui/game-icon'
import { GameLabel } from '@/components/ui/game-label'
import { FlowText } from '@/components/ui/flow-text'
import { DEFENSE_BADGE_RULES, isDefenseBadgeUnlocked } from './defenseBadgesConfig'
import type { DashboardDefenseBadgesParams } from '../../types'

const ROW_TINT = {
  week1: { color: '#3b82f6', bg: 'rgba(59,130,246,0.15)' },
  week2: { color: '#22c55e', bg: 'rgba(34,197,94,0.15)' },
  week3: { color: '#a855f7', bg: 'rgba(168,85,247,0.15)' },
} as const

export const DashboardDefenseBadges = ({ dayCount }: DashboardDefenseBadgesParams) => {
  const router = useRouter()

  return (
    <View className="mt-5">
      <GameLabel>Tes défenses</GameLabel>
      <View className="mt-2.5 gap-2.5">
        {DEFENSE_BADGE_RULES.map((badge) => {
          const unlocked = isDefenseBadgeUnlocked(badge.minDays, dayCount)
          const tint = ROW_TINT[badge.asset]
          return (
            <Pressable
              key={badge.key}
              onPress={() => router.push(`/defense-badge/${badge.key}` as never)}
              accessibilityRole="button"
              accessibilityLabel={`Badge de défense ${badge.title}`}
              className="active:opacity-90"
              style={{ opacity: unlocked ? 1 : 0.55 }}
            >
              <GameCard className="flex-row items-center justify-between px-4 py-3.5">
                <View className="flex-row items-center gap-3">
                  <View
                    className="h-10 w-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: unlocked ? tint.bg : 'rgba(148,163,184,0.12)' }}
                  >
                    <GameIcon
                      name={unlocked ? 'shield' : 'lock'}
                      size={unlocked ? 20 : 18}
                      color={unlocked ? tint.color : '#8b7aa8'}
                    />
                  </View>
                  <View>
                    <FlowText className="text-sm font-extrabold text-white">
                      {badge.title}
                    </FlowText>
                    <GameLabel className="mt-0.5 normal-case tracking-normal">
                      {unlocked
                        ? badge.label + ' sans vape'
                        : `Se débloque à ${badge.minDays} jours`}
                    </GameLabel>
                  </View>
                </View>
                <FlowText
                  className="text-sm font-bold"
                  style={{ color: unlocked ? tint.color : '#8b7aa8' }}
                >
                  {unlocked ? `+${badge.healthBonusPercent} DÉF` : '?'}
                </FlowText>
              </GameCard>
            </Pressable>
          )
        })}
      </View>
    </View>
  )
}
