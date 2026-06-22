import { View } from 'react-native'
import { FlowText } from '@/components/ui/flow-text'
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
    <View className="mb-2">
      <FlowText className="mb-3 text-lg font-bold text-flow-text">Aujourd&apos;hui</FlowText>
      {error ? <FlowText className="mb-3 text-xs text-red-500">{error}</FlowText> : null}
      {!isLoading ? (
        <>
          <MoodTodayCard canFillToday={canFillToday} todayLabel={todayLabel} />
          <WeeklyMoodStrip weekDays={weekDays} entriesByDate={entriesByDate} />
        </>
      ) : null}
    </View>
  )
}
