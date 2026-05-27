import { View, Text } from 'react-native'
import { useWeeklyMood } from '../hooks/useWeeklyMood'
import { getPrimaryMood, getSubMoodLabel } from '../moodTaxonomy'
import { MoodTodayCard } from './MoodTodayCard'
import { WeeklyMoodStrip } from './WeeklyMoodStrip'

export const DashboardMoodSection = () => {
  const { weekDays, entriesByDate, canFillToday, todayEntry, isLoading } = useWeeklyMood()

  const todayLabel =
    todayEntry != null
      ? `${getPrimaryMood(todayEntry.primary).label} · ${getSubMoodLabel(todayEntry.primary, todayEntry.sub)}`
      : undefined

  if (isLoading) return null

  return (
    <View className="mb-2">
      <Text className="mb-3 font-mono text-lg font-bold text-white">Aujourd&apos;hui</Text>
      <MoodTodayCard canFillToday={canFillToday} todayLabel={todayLabel} />
      <WeeklyMoodStrip weekDays={weekDays} entriesByDate={entriesByDate} />
    </View>
  )
}
