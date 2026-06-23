import { View, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { FLOW, flowShadow } from '@/constants/flowTheme'
import { flowSurface } from '@/constants/flowSurfaces'
import { FlowText } from '@/components/ui/flow-text'

import type { MoodTodayCardParams } from '../types'

export const MoodTodayCard = ({ canFillToday, todayLabel }: MoodTodayCardParams) => {
  const router = useRouter()

  return (
    <Pressable
      onPress={() =>
        router.push((canFillToday ? '/mood' : '/mood/history') as never)
      }
      accessibilityRole="button"
      accessibilityLabel="Suivi d'humeur"
      className={`mb-4 flex-row items-center p-4 active:opacity-90 ${flowSurface.card}`}
      style={flowShadow.card}
    >
      <View className={`relative mr-4 h-14 w-14 ${flowSurface.iconWell}`}>
        <MaterialCommunityIcons name="weather-partly-cloudy" size={28} color={FLOW.brand} />
        {!canFillToday ? (
          <View className="absolute -right-1 -top-1 h-5 w-5 items-center justify-center rounded-full bg-flow-cta">
            <MaterialIcons name="check" size={12} color="#fff" />
          </View>
        ) : (
          <View className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-rose-400" />
        )}
      </View>
      <View className="flex-1">
        <FlowText className="text-sm font-bold text-flow-text">Suivi d&apos;humeur</FlowText>
        <FlowText className="mt-1 text-xs text-flow-muted">
          {canFillToday ? 'Renseigne ton humeur du jour' : todayLabel ?? 'Terminé'}
        </FlowText>
      </View>
      {canFillToday ? (
        <MaterialIcons name="chevron-right" size={22} color={FLOW.faint} />
      ) : (
        <MaterialIcons name="bar-chart" size={20} color={FLOW.faint} />
      )}
    </Pressable>
  )
}
