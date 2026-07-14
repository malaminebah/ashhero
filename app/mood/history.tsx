import { View, Pressable, ScrollView, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { FlowText } from '@/components/ui/flow-text'
import { GameLabel } from '@/components/ui/game-label'
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
      <StatusBar style="light" />
      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-4 mt-2 flex-row items-center justify-between">
          <Pressable onPress={() => router.back()} className="active:opacity-70">
            <FlowText className="text-sm text-brand-muted">Retour</FlowText>
          </Pressable>
          <GameLabel>Semaine</GameLabel>
        </View>

        <FlowText className="text-[22px] font-extrabold text-white" style={{ letterSpacing: -0.4 }}>
          Ton humeur cette semaine
        </FlowText>
        <FlowText className="mt-1.5 text-[15px] leading-6 text-brand-muted">
          Les envies baissent quand ton humeur remonte.
        </FlowText>

        <View className="mt-6 flex-row items-center justify-between">
          <Pressable
            onPress={goPrevWeek}
            accessibilityRole="button"
            accessibilityLabel="Semaine précédente"
            className="h-10 w-10 items-center justify-center rounded-full bg-brand-card active:opacity-70"
          >
            <MaterialIcons name="chevron-left" size={24} color="#8b7aa8" />
          </Pressable>
          <FlowText className="text-sm font-bold text-white">{weekLabel}</FlowText>
          <Pressable
            onPress={goNextWeek}
            disabled={!canGoNext}
            accessibilityRole="button"
            accessibilityLabel="Semaine suivante"
            className="h-10 w-10 items-center justify-center rounded-full bg-brand-card active:opacity-70 disabled:opacity-30"
          >
            <MaterialIcons name="chevron-right" size={24} color="#8b7aa8" />
          </Pressable>
        </View>

        {isLoading ? (
          <View className="mt-16 items-center">
            <ActivityIndicator color="#a855f7" />
          </View>
        ) : error ? (
          <FlowText className="mt-8 text-center text-sm text-brand-red">{error}</FlowText>
        ) : (
          <MoodWeekChart weekDays={weekDays} entriesByDate={entriesByDate} />
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
