import { View, ScrollView } from 'react-native'
import { useTrackerStore } from '../../store'
import { useStats } from '../../hooks/useStats'
import { DashboardHeader } from './DashboardHeader'
import { DashboardHero } from './DashboardHero'
import { DashboardXpBar } from './DashboardXpBar'
import { DashboardStatsPair } from './DashboardStatsPair'
import { DashboardJalonsGrid } from './DashboardJalonsGrid'
import { DashboardDailyBonus } from './DashboardDailyBonus'

export const DashboardHome = () => {
  const quitDate = useTrackerStore((s) => s.quitDate)
  const smokingType = useTrackerStore((s) => s.smokingType)
  const level = useTrackerStore((s) => s.level)
  const xp = useTrackerStore((s) => s.xp)
  const { moneySaved, cigarettesAvoided, dayCount } = useStats()

  const hoursSinceQuit = quitDate
    ? (Date.now() - quitDate.getTime()) / 3_600_000
    : 0

  const avoidedTitle =
    smokingType === 'cigarette' ? 'Cigarettes évitées' : 'Puffs évitées'
  const avoidedSubtitle =
    smokingType === 'cigarette' ? 'Cigarettes évitées' : 'Puffs évitées'

  return (
    <ScrollView
      className="flex-1 bg-brand-bg"
      contentContainerStyle={{ paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-5 pt-12">
        <DashboardHeader level={level} />
        <DashboardHero dayCount={dayCount} level={level} />
        <DashboardXpBar totalXp={xp} />
        <DashboardStatsPair
          moneySaved={moneySaved}
          avoidedCount={cigarettesAvoided}
          avoidedTitle={avoidedTitle}
          avoidedSubtitle={avoidedSubtitle}
        />
        <DashboardJalonsGrid hoursSinceQuit={hoursSinceQuit} />
        <DashboardDailyBonus />
      </View>
    </ScrollView>
  )
}
