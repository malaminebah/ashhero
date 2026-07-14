import { View } from 'react-native'
import { FlowText } from '@/components/ui/flow-text'
import { GameCard } from '@/components/ui/game-card'
import { GameLabel } from '@/components/ui/game-label'
import { getPrimaryMood, getSubMoodLabel, MOOD_MAX_SCORE } from '../moodTaxonomy'
import { MoodIcon } from './MoodIcon'
import type { MoodWeekChartParams } from '../types'

const CHART_HEIGHT = 150
const MIN_BAR_RATIO = 0.22
/** Icon capping each bar + its margin — subtracted from the bar budget. */
const BAR_ICON_SPACE = 30

export const MoodWeekChart = ({ weekDays, entriesByDate }: MoodWeekChartParams) => {
  const filled = weekDays.filter((d) => entriesByDate[d.date]).length

  return (
    <View className="mt-5">
      <GameCard style={{ paddingVertical: 20, paddingHorizontal: 14 }}>
        <View
          className="flex-row items-end justify-between"
          style={{ height: CHART_HEIGHT }}
        >
          {weekDays.map((day) => {
            const entry = entriesByDate[day.date]
            const mood = entry ? getPrimaryMood(entry.primary) : null

            return (
              <View key={day.date} className="items-center">
                {entry && mood ? (
                  <View className="items-center">
                    <MoodIcon mood={entry.primary} size={26} />
                    <View
                      className="mt-1 w-[30px] rounded-full"
                      style={{
                        height: Math.round(
                          (CHART_HEIGHT - BAR_ICON_SPACE) *
                            (MIN_BAR_RATIO + (1 - MIN_BAR_RATIO) * (mood.score / MOOD_MAX_SCORE))
                        ),
                        backgroundColor: mood.circleColor,
                      }}
                    />
                  </View>
                ) : (
                  <View
                    className="h-[34px] w-[30px] rounded-full bg-[#2a1a3f]"
                    style={{
                      borderWidth: 1.5,
                      borderStyle: 'dashed',
                      borderColor: '#5b4a75',
                    }}
                  />
                )}
                <GameLabel className={`mt-2 ${day.isToday ? 'text-white' : ''}`}>
                  {day.weekdayLabel}
                </GameLabel>
              </View>
            )
          })}
        </View>
      </GameCard>

      <FlowText className="mt-3 text-center text-xs text-brand-locked">
        {filled > 0
          ? `${filled} jour${filled > 1 ? 's' : ''} renseigné${filled > 1 ? 's' : ''}`
          : 'Aucune humeur cette semaine'}
      </FlowText>

      {filled > 0 ? (
        <View className="mt-4 gap-2">
          {weekDays
            .filter((d) => entriesByDate[d.date])
            .map((day) => {
              const entry = entriesByDate[day.date]!
              const primary = getPrimaryMood(entry.primary)
              return (
                <GameCard
                  key={day.date}
                  className="flex-row items-center justify-between px-3 py-2.5"
                >
                  <GameLabel>{day.weekdayLabel}</GameLabel>
                  <View className="flex-row items-center gap-2">
                    <MoodIcon mood={entry.primary} size={24} />
                    <FlowText className="text-xs font-semibold text-white">
                      {primary.label} · {getSubMoodLabel(entry.primary, entry.sub)}
                    </FlowText>
                  </View>
                </GameCard>
              )
            })}
        </View>
      ) : null}
    </View>
  )
}
