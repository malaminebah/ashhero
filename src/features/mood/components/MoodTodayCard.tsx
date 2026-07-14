import { View, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { GameCard } from '@/components/ui/game-card'
import { GameLabel } from '@/components/ui/game-label'
import { FlowText } from '@/components/ui/flow-text'
import { MOOD_XP_REWARD } from '../moodTaxonomy'
import { MoodIcon } from './MoodIcon'

import type { MoodTodayCardParams, PrimaryMood } from '../types'

const PREVIEW_MOODS: PrimaryMood[] = ['joy', 'calm', 'sadness']

export const MoodTodayCard = ({ canFillToday, todayLabel, todayMood }: MoodTodayCardParams) => {
  const router = useRouter()

  return (
    <Pressable
      onPress={() => router.push((canFillToday ? '/mood' : '/mood/history') as never)}
      accessibilityRole="button"
      accessibilityLabel="Suivi d'humeur"
      className="mb-3 active:opacity-90"
    >
      <GameCard className="flex-row items-center justify-between px-4 py-3.5">
        <View className="flex-1 pr-3">
          <FlowText className="text-sm font-extrabold text-white">
            Comment tu te sens ?
          </FlowText>
          <GameLabel className="mt-0.5 normal-case tracking-normal">
            {canFillToday
              ? `Humeur du jour · +${MOOD_XP_REWARD} XP`
              : todayLabel ?? 'Terminé'}
          </GameLabel>
        </View>
        {canFillToday ? (
          <View className="flex-row gap-1.5">
            {PREVIEW_MOODS.map((mood) => (
              <MoodIcon key={mood} mood={mood} size={30} />
            ))}
          </View>
        ) : todayMood ? (
          <MoodIcon mood={todayMood} size={36} />
        ) : (
          <View className="h-7 w-7 items-center justify-center rounded-full bg-brand-success">
            <MaterialIcons name="check" size={16} color="#052e16" />
          </View>
        )}
      </GameCard>
    </Pressable>
  )
}
