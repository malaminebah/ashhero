import { View, ScrollView } from 'react-native'
import { useTrackerStore } from '../../store'
import { useStats } from '../../hooks/useStats'
import { DashboardHeader } from './DashboardHeader'
import { DashboardHero } from './DashboardHero'
import { DashboardStatsPair } from './DashboardStatsPair'
import { DashboardJalonsGrid } from './DashboardJalonsGrid'
import { DashboardDailyBonus } from './DashboardDailyBonus'

export const DashboardHome = () => {
  const quitDate = useTrackerStore((s) => s.quitDate)
  const level = useTrackerStore((s) => s.level)
  const xp = useTrackerStore((s) => s.xp)
  const { moneySaved, cigarettesAvoided, dayCount, equivalentAvoidedLabel } = useStats()

  const hoursSinceQuit = quitDate
    ? (Date.now() - quitDate.getTime()) / 3_600_000
    : 0

  return (
    <ScrollView
      className="flex-1 bg-brand-bg"
      contentContainerStyle={{ paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-5 pt-12">
        <DashboardHeader level={level} />
        <DashboardHero dayCount={dayCount} totalXp={xp} />
        <DashboardStatsPair
          moneySaved={moneySaved}
          avoidedCount={cigarettesAvoided}
          avoidedLabel={equivalentAvoidedLabel}
        />
        <DashboardJalonsGrid hoursSinceQuit={hoursSinceQuit} />
        <DashboardDailyBonus />
      </View>
    </ScrollView>
  )
}
