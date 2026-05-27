import { View, Text, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { getPrimaryMood } from '../moodTaxonomy'
import type { MoodEntry } from '../types'
import type { WeekDayCell } from '../types'

type Props = {
  weekDays: WeekDayCell[]
  entriesByDate: Record<string, MoodEntry>
}

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
          ? 'border-brand-success/50 bg-brand-success/10'
          : 'border-white/10 bg-white/[0.04]'
      } ${isFuture ? 'opacity-35' : 'opacity-60'}`}
    />
  )
}

export const WeeklyMoodStrip = ({ weekDays, entriesByDate }: Props) => {
  const router = useRouter()
  const filledCount = weekDays.filter((d) => entriesByDate[d.date]).length

  return (
    <View className="mb-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <Pressable
        onPress={() => router.push('/mood/history' as never)}
        accessibilityRole="button"
        accessibilityLabel="Voir le graphique de la semaine"
        className="mb-4 flex-row items-center justify-between active:opacity-85"
      >
        <Text className="font-mono text-sm font-bold text-white">Ma semaine</Text>
        <View className="flex-row items-center gap-2">
          <View className="flex-row items-center rounded-full border border-brand-success/35 bg-brand-success/10 px-2.5 py-1">
            <MaterialIcons name="local-fire-department" size={14} color="#22c55e" />
            <Text className="ml-1 font-mono text-xs font-bold text-brand-success">
              {filledCount}
            </Text>
          </View>
          <MaterialIcons name="chevron-right" size={20} color="rgba(255,255,255,0.35)" />
        </View>
      </Pressable>

      <View className="flex-row justify-between">
        {weekDays.map((day) => {
          const entry = entriesByDate[day.date]
          const openFillFlow = day.isToday && !entry && !day.isFuture

          const content = (
            <>
              <Text
                className={`mb-2 font-mono text-[9px] ${
                  day.isToday ? 'font-bold text-white' : 'text-white/45'
                }`}
              >
                {day.weekdayLabel}
              </Text>
              <MoodDot entry={entry} isToday={day.isToday} isFuture={day.isFuture} />
            </>
          )

          if (openFillFlow) {
            return (
              <Pressable
                key={day.date}
                onPress={() => router.push('/mood' as never)}
                accessibilityRole="button"
                accessibilityLabel={`Renseigner humeur ${day.weekdayLabel}`}
                className="items-center active:opacity-80"
              >
                {content}
              </Pressable>
            )
          }

          return (
            <View key={day.date} className="items-center">
              {content}
            </View>
          )
        })}
      </View>
    </View>
  )
}
