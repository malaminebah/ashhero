import { View, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { FLOW, flowShadow } from '@/constants/flowTheme'
import { FlowText } from '@/components/ui/flow-text'
import { getPrimaryMood } from '../moodTaxonomy'
import type { MoodEntry, WeeklyMoodStripParams } from '../types'

function MoodDot({ entry, isToday, isFuture }: {
  entry: MoodEntry | undefined
  isToday: boolean
  isFuture: boolean
}) {
  if (entry) {
    const primary = getPrimaryMood(entry.primary)
    return (
      <View
        className="h-11 w-11 items-center justify-center rounded-full border-2"
        style={{
          backgroundColor: `${primary.circleColor}33`,
          borderColor: primary.circleColor,
        }}
      >
        <View
          className="h-7 w-7 rounded-full"
          style={{ backgroundColor: primary.circleColor }}
        />
      </View>
    )
  }

  return (
    <View
      className={`h-11 w-11 rounded-full border-2 ${
        isToday
          ? 'border-flow-cta/35 bg-flow-secondary'
          : 'border-flow-border bg-flow-bg'
      } ${isFuture ? 'opacity-35' : 'opacity-60'}`}
    />
  )
}

export const WeeklyMoodStrip = ({ weekDays, entriesByDate }: WeeklyMoodStripParams) => {
  const router = useRouter()
  const filledCount = weekDays.filter((d) => entriesByDate[d.date]).length

  return (
    <Pressable
      onPress={() => router.push('/mood/history' as never)}
      accessibilityRole="button"
      accessibilityLabel="Voir le graphique de la semaine"
      className="mb-6 rounded-2xl border border-flow-border bg-flow-bg p-4 active:opacity-90"
      style={flowShadow.card}
    >
      <View className="mb-4 flex-row items-center justify-between">
        <FlowText className="text-sm font-bold text-flow-text">Ma semaine</FlowText>
        <View className="flex-row items-center gap-2">
          <View className="flex-row items-center rounded-full border border-flow-cta/25 bg-flow-secondary px-2.5 py-1">
            <MaterialIcons name="local-fire-department" size={14} color={FLOW.cta} />
            <FlowText className="ml-1 text-xs font-bold text-flow-cta">{filledCount}</FlowText>
          </View>
          <MaterialIcons name="chevron-right" size={20} color={FLOW.faint} />
        </View>
      </View>

      <View className="flex-row justify-between">
        {weekDays.map((day) => {
          const entry = entriesByDate[day.date]
          return (
            <View key={day.date} className="items-center">
              <FlowText
                className={`mb-2 text-[10px] ${
                  day.isToday ? 'font-bold text-flow-text' : 'text-flow-faint'
                }`}
              >
                {day.weekdayLabel}
              </FlowText>
              <MoodDot entry={entry} isToday={day.isToday} isFuture={day.isFuture} />
            </View>
          )
        })}
      </View>
    </Pressable>
  )
}
