import { View, Text } from 'react-native'
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
      <Text className="mb-3 font-mono text-lg font-bold text-white">Aujourd&apos;hui</Text>
      {error ? (
        <Text className="mb-3 font-mono text-xs text-red-300">{error}</Text>
      ) : null}
      {!isLoading ? (
        <>
          <MoodTodayCard canFillToday={canFillToday} todayLabel={todayLabel} />
          <WeeklyMoodStrip weekDays={weekDays} entriesByDate={entriesByDate} />
        </>
      ) : null}
    </View>
  )
}
