import { View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { FlowText } from '@/components/ui/flow-text'
import { GameCard } from '@/components/ui/game-card'
import { GameIcon } from '@/components/ui/game-icon'
import { GameLabel } from '@/components/ui/game-label'
import { useStats } from '@/src/features/tracker/hooks/useStats'
import { MOOD_MAX_SCORE } from '../moodTaxonomy'
import { useMoodInsights } from '../hooks/useMoodInsights'
import type { MoodTrend } from '../utils/moodInsights'

const TREND_VIEW: Record<MoodTrend, { icon: 'trending-up' | 'trending-down' | 'trending-flat'; color: string; label: string }> = {
  up: { icon: 'trending-up', color: '#22c55e', label: 'en hausse' },
  down: { icon: 'trending-down', color: '#ef4444', label: 'en baisse' },
  flat: { icon: 'trending-flat', color: '#8b7aa8', label: 'stable' },
  unknown: { icon: 'trending-flat', color: '#5b4a75', label: '—' },
}

function insightText(
  trend: MoodTrend,
  weekAvg: number | null,
  dayCount: number
): string {
  const avgLabel =
    weekAvg != null ? `${weekAvg.toFixed(1).replace('.', ',')}/${MOOD_MAX_SCORE}` : null

  if (trend === 'up') {
    return `Ton humeur monte — ${dayCount} jour${dayCount > 1 ? 's' : ''} sans vape, et ça se sent. Continue.`
  }
  if (trend === 'down') {
    return 'Semaine plus rude. C\'est normal pendant un arrêt — chaque humeur notée t\'aide à repérer les jours à risque.'
  }
  if (trend === 'flat' && avgLabel) {
    return `Humeur stable à ${avgLabel} cette semaine. La régularité est ta force.`
  }
  return 'Note ton humeur chaque jour : dès 2 semaines de données, tu verras ta tendance.'
}

export const MoodInsightsCards = () => {
  const { streak, streakCapped, weekAvg, trend, trendPct, isLoading } = useMoodInsights()
  const { dayCount } = useStats()

  if (isLoading) return null

  const trendView = TREND_VIEW[trend]
  const streakLabel = streakCapped ? `${streak}+` : String(streak)

  return (
    <View className="mt-5 gap-3">
      <View className="flex-row gap-3">
        <GameCard className="flex-1 items-center px-2 py-3.5">
          <View className="flex-row items-center gap-1.5">
            <GameIcon name="flame" size={18} color={streak > 0 ? '#fbbf24' : '#5b4a75'} />
            <FlowText className="text-2xl font-extrabold text-white">{streakLabel}</FlowText>
          </View>
          <GameLabel className="mt-1">
            {streak > 1 ? 'jours d\'affilée' : streak === 1 ? 'jour noté' : 'commence ta série'}
          </GameLabel>
        </GameCard>

        <GameCard className="flex-1 items-center px-2 py-3.5">
          <View className="flex-row items-center gap-1.5">
            <MaterialIcons name={trendView.icon} size={20} color={trendView.color} />
            <FlowText className="text-2xl font-extrabold" style={{ color: trendView.color }}>
              {trendPct != null ? `${trendPct > 0 ? '+' : ''}${trendPct} %` : '—'}
            </FlowText>
          </View>
          <GameLabel className="mt-1">vs semaine passée</GameLabel>
        </GameCard>
      </View>

      <GameCard className="flex-row items-center gap-3 px-4 py-3.5">
        <View className="h-10 w-10 items-center justify-center rounded-xl bg-brand-track">
          <MaterialIcons name="auto-awesome" size={18} color="#c084fc" />
        </View>
        <FlowText className="flex-1 text-[13px] leading-5 text-white">
          {insightText(trend, weekAvg, dayCount)}
        </FlowText>
      </GameCard>
    </View>
  )
}
