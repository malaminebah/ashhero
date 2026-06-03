import { View, Text, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

type Props = {
  canFillToday: boolean
  todayLabel?: string
}

export const MoodTodayCard = ({ canFillToday, todayLabel }: Props) => {
  const router = useRouter()

  return (
    <Pressable
      onPress={() =>
        router.push((canFillToday ? '/mood' : '/mood/history') as never)
      }
      accessibilityRole="button"
      accessibilityLabel="Suivi d'humeur"
      className="mb-4 flex-row items-center rounded-2xl border border-white/10 bg-white/[0.04] p-4 active:opacity-85"
    >
      <View className="relative mr-4 h-14 w-14 items-center justify-center rounded-2xl bg-brand-bg2">
        <MaterialCommunityIcons name="weather-partly-cloudy" size={28} color="#7dd3fc" />
        {!canFillToday ? (
          <View className="absolute -right-1 -top-1 h-5 w-5 items-center justify-center rounded-full bg-brand-success">
            <MaterialIcons name="check" size={12} color="#fff" />
          </View>
        ) : (
          <View className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-rose-400/90" />
        )}
      </View>
      <View className="flex-1">
        <Text className="font-mono text-sm font-bold text-white">Suivi d&apos;humeur</Text>
        <Text className="mt-1 font-mono text-xs text-white/50">
          {canFillToday ? 'Renseigne ton humeur du jour' : todayLabel ?? 'Terminé'}
        </Text>
      </View>
      {canFillToday ? (
        <MaterialIcons name="chevron-right" size={22} color="rgba(255,255,255,0.35)" />
      ) : (
        <MaterialIcons name="bar-chart" size={20} color="rgba(255,255,255,0.35)" />
      )}
    </Pressable>
  )
}
