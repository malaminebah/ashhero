import { View, Text } from 'react-native'
import { getPrimaryMood, getSubMoodLabel } from '../moodTaxonomy'
import type { MoodEntry } from '../types'
import type { WeekDayCell } from '../types'

const CHART_HEIGHT = 140

type Props = {
  weekDays: WeekDayCell[]
  entriesByDate: Record<string, MoodEntry>
}

export const MoodWeekChart = ({ weekDays, entriesByDate }: Props) => {
  const filled = weekDays.filter((d) => entriesByDate[d.date]).length

  return (
    <View className="mt-6">
      <Text className="mb-4 text-center font-mono text-xs text-white/55">
        {filled > 0
          ? `${filled} jour${filled > 1 ? 's' : ''} renseigné${filled > 1 ? 's' : ''}`
          : 'Aucune humeur cette semaine'}
      </Text>

      <View
        className="flex-row items-end justify-between border-b border-white/20 px-1"
        style={{ height: CHART_HEIGHT }}
      >
        {weekDays.map((day) => {
          const entry = entriesByDate[day.date]
          const color = entry ? getPrimaryMood(entry.primary).circleColor : undefined

          return (
            <View key={day.date} className="flex-1 items-center justify-end px-0.5">
              {entry && color ? (
                <View
                  className="w-full max-w-[28px] rounded-t-md"
                  style={{
                    height: CHART_HEIGHT - 8,
                    backgroundColor: color,
                  }}
                />
              ) : (
                <View className="h-1 w-full max-w-[28px] rounded-full bg-white/10" />
              )}
              <Text
                className={`mt-2 font-mono text-[9px] ${
                  day.isToday ? 'font-bold text-white' : 'text-white/45'
                }`}
              >
                {day.weekdayLabel.toLowerCase()}
              </Text>
            </View>
          )
        })}
      </View>

      {filled > 0 ? (
        <View className="mt-6 gap-2">
          {weekDays
            .filter((d) => entriesByDate[d.date])
            .map((day) => {
              const entry = entriesByDate[day.date]!
              const primary = getPrimaryMood(entry.primary)
              return (
                <View
                  key={day.date}
                  className="flex-row items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2"
                >
                  <Text className="font-mono text-[10px] text-white/50">{day.weekdayLabel}</Text>
                  <View className="flex-row items-center gap-2">
                    <View
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: primary.circleColor }}
                    />
                    <Text className="font-mono text-xs text-white">
                      {primary.label} · {getSubMoodLabel(entry.primary, entry.sub)}
                    </Text>
                  </View>
                </View>
              )
            })}
        </View>
      ) : null}
    </View>
  )
}
