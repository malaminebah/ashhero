import { View, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { GameCard } from '@/components/ui/game-card'
import { GameIcon } from '@/components/ui/game-icon'
import { GameLabel } from '@/components/ui/game-label'
import { FlowText } from '@/components/ui/flow-text'
import { MoodIcon } from './MoodIcon'
import type { MoodEntry, WeeklyMoodStripParams } from '../types'

function MoodDot({ entry, isToday, isFuture }: {
  entry: MoodEntry | undefined
  isToday: boolean
  isFuture: boolean
}) {
  if (entry) {
    return <MoodIcon mood={entry.primary} size={44} />
  }

  return (
    <View
      className="h-11 w-11 rounded-full bg-brand-track"
      style={{
        opacity: isFuture ? 0.35 : 0.7,
        borderWidth: isToday ? 1.5 : 0,
        borderColor: '#5b4a75',
        borderStyle: 'dashed',
      }}
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
      className="active:opacity-90"
    >
      <GameCard>
        <View className="mb-4 flex-row items-center justify-between">
          <FlowText className="text-sm font-extrabold text-white">Ma semaine</FlowText>
          <View className="flex-row items-center gap-2">
            <View className="flex-row items-center rounded-full bg-brand-track px-2.5 py-1">
              <GameIcon name="flame" size={14} color="#fbbf24" />
              <FlowText className="ml-1 text-xs font-bold text-brand-gold">
                {filledCount}
              </FlowText>
            </View>
            <MaterialIcons name="chevron-right" size={20} color="#8b7aa8" />
          </View>
        </View>

        <View className="flex-row justify-between">
          {weekDays.map((day) => {
            const entry = entriesByDate[day.date]
            return (
              <View key={day.date} className="items-center">
                <GameLabel className={`mb-2 ${day.isToday ? 'text-white' : ''}`}>
                  {day.weekdayLabel}
                </GameLabel>
                <MoodDot entry={entry} isToday={day.isToday} isFuture={day.isFuture} />
              </View>
            )
          })}
        </View>
      </GameCard>
    </Pressable>
  )
}
