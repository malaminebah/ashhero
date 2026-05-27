import { View, Text, Pressable, ScrollView, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { titleSerif } from '@/constants/theme'
import { MoodWeekChart } from '@/src/features/mood/components/MoodWeekChart'
import { useMoodWeekHistory } from '@/src/features/mood/hooks/useMoodWeekHistory'

export default function MoodHistoryScreen() {
  const router = useRouter()
  const {
    weekDays,
    weekLabel,
    entriesByDate,
    canGoNext,
    isLoading,
    error,
    goPrevWeek,
    goNextWeek,
  } = useMoodWeekHistory()

  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-4 mt-2 flex-row items-center justify-between">
          <Pressable onPress={() => router.back()} className="active:opacity-70">
            <Text className="font-mono text-sm text-white/55">Retour</Text>
          </Pressable>
          <Text className="font-mono text-xs uppercase tracking-wider text-white/45">
            Semaine
          </Text>
        </View>

        <Text
          className="text-3xl font-bold text-brand-success"
          style={{ fontFamily: titleSerif }}
        >
          Suivi quotidien
        </Text>

        <View className="mt-6 border-b border-brand-success/40 pb-2">
          <Text className="font-mono text-sm font-bold text-brand-success">Émotions</Text>
        </View>

        <View className="mt-6 flex-row items-center justify-between">
          <Pressable
            onPress={goPrevWeek}
            accessibilityRole="button"
            accessibilityLabel="Semaine précédente"
            className="h-10 w-10 items-center justify-center rounded-full border border-white/15 active:opacity-80"
          >
            <MaterialIcons name="chevron-left" size={24} color="#f3e8ff" />
          </Pressable>
          <Text className="font-mono text-sm text-white/80">{weekLabel}</Text>
          <Pressable
            onPress={goNextWeek}
            disabled={!canGoNext}
            accessibilityRole="button"
            accessibilityLabel="Semaine suivante"
            className="h-10 w-10 items-center justify-center rounded-full border border-white/15 active:opacity-80 disabled:opacity-30"
          >
            <MaterialIcons name="chevron-right" size={24} color="#f3e8ff" />
          </Pressable>
        </View>

        {isLoading ? (
          <View className="mt-16 items-center">
            <ActivityIndicator color="#22c55e" />
          </View>
        ) : error ? (
          <Text className="mt-8 text-center font-mono text-sm text-red-300">{error}</Text>
        ) : (
          <MoodWeekChart weekDays={weekDays} entriesByDate={entriesByDate} />
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
