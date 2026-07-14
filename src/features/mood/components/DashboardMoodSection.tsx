import { View } from 'react-native'
import { FlowText } from '@/components/ui/flow-text'
import { GameLabel } from '@/components/ui/game-label'
import { useWeeklyMood } from '../hooks/useWeeklyMood'
import { getPrimaryMood, getSubMoodLabel } from '../moodTaxonomy'
import { MoodTodayCard } from './MoodTodayCard'
import { WeeklyMoodStrip } from './WeeklyMoodStrip'

export const DashboardMoodSection = () => {
  const { weekDays, entriesByDate, canFillToday, todayEntry, isLoading, error } =
    useWeeklyMood()

  const todayLabel =
    todayEntry != null
      ? `${getPrimaryMood(todayEntry.primary).label} · ${getSubMoodLabel(todayEntry.primary, todayEntry.sub)}`
      : undefined

  return (
    <View className="mt-5">
      <GameLabel className="mb-2.5">Aujourd&apos;hui</GameLabel>
      {error ? <FlowText className="mb-3 text-xs text-brand-red">{error}</FlowText> : null}
      {!isLoading ? (
        <>
          <MoodTodayCard
            canFillToday={canFillToday}
            todayLabel={todayLabel}
            todayMood={todayEntry?.primary}
          />
          <WeeklyMoodStrip weekDays={weekDays} entriesByDate={entriesByDate} />
        </>
      ) : null}
    </View>
  )
}
