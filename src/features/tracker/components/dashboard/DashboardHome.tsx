import { ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { floatingTabClearance } from '@/src/features/navigation/floatingTabBar'
import { useTrackerStore } from '../../store'
import { useStats } from '../../hooks/useStats'
import { DashboardHeader } from './DashboardHeader'
import { DashboardHero } from './DashboardHero'
import { DashboardStatsPair } from './DashboardStatsPair'
import { DashboardDefenseBadges } from './DashboardDefenseBadges'
import { DashboardJalonsGrid } from './DashboardJalonsGrid'
import { DashboardDailyBonus } from './DashboardDailyBonus'
import { DashboardCombatCta } from './DashboardCombatCta'
import { DashboardMoodSection } from '@/src/features/mood/components/DashboardMoodSection'

export const DashboardHome = () => {
  const insets = useSafeAreaInsets()
  const quitDate = useTrackerStore((s) => s.quitDate)
  const smokingType = useTrackerStore((s) => s.smokingType)
  const level = useTrackerStore((s) => s.level)
  const xp = useTrackerStore((s) => s.xp)
  const { moneySaved, cigarettesAvoided, dayCount } = useStats()

  const hoursSinceQuit = quitDate
    ? (Date.now() - quitDate.getTime()) / 3_600_000
    : 0

  const avoidedTitle =
    smokingType === 'cigarette' ? 'cigarettes évitées' : 'bouffées évitées'

  return (
    <ScrollView
      className="flex-1 bg-brand-bg"
      contentContainerStyle={{
        paddingTop: insets.top + 12,
        paddingBottom: floatingTabClearance(insets.bottom),
      }}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-5">
        <DashboardHeader level={level} xp={xp} />
        <DashboardHero dayCount={dayCount} level={level} xp={xp} />
        <DashboardStatsPair
          moneySaved={moneySaved}
          avoidedCount={cigarettesAvoided}
          avoidedTitle={avoidedTitle}
          avoidedSubtitle=""
        />
        <DashboardJalonsGrid hoursSinceQuit={hoursSinceQuit} />
        <DashboardMoodSection />
        <DashboardDailyBonus />
        <DashboardDefenseBadges dayCount={dayCount} />
        <DashboardCombatCta />
      </View>
    </ScrollView>
  )
}
