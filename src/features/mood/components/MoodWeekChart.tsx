import { View } from 'react-native'
import { FlowText } from '@/components/ui/flow-text'
import { getPrimaryMood, getSubMoodLabel } from '../moodTaxonomy'
import type { MoodWeekChartParams } from '../types'

const CHART_HEIGHT = 140

export const MoodWeekChart = ({ weekDays, entriesByDate }: MoodWeekChartParams) => {
  const filled = weekDays.filter((d) => entriesByDate[d.date]).length

  return (
    <View className="mt-6">
      <FlowText className="mb-4 text-center text-xs text-flow-muted">
        {filled > 0
          ? `${filled} jour${filled > 1 ? 's' : ''} renseigné${filled > 1 ? 's' : ''}`
          : 'Aucune humeur cette semaine'}
      </FlowText>

      <View
        className="flex-row items-end justify-between border-b border-flow-border px-1"
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
                <View className="h-1 w-full max-w-[28px] rounded-full bg-flow-border" />
              )}
              <FlowText
                className={`mt-2 text-[9px] ${
                  day.isToday ? 'font-bold text-flow-text' : 'text-flow-faint'
                }`}
              >
                {day.weekdayLabel.toLowerCase()}
              </FlowText>
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
                  className="flex-row items-center justify-between rounded-2xl border border-flow-border bg-flow-secondary px-3 py-2"
                >
                  <FlowText className="text-[10px] text-flow-faint">{day.weekdayLabel}</FlowText>
                  <View className="flex-row items-center gap-2">
                    <View
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: primary.circleColor }}
                    />
                    <FlowText className="text-xs text-flow-text">
                      {primary.label} · {getSubMoodLabel(entry.primary, entry.sub)}
                    </FlowText>
                  </View>
                </View>
              )
            })}
        </View>
      ) : null}
    </View>
  )
}
