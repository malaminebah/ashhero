import { View, Pressable, ScrollView, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { FLOW } from '@/constants/flowTheme'
import { FlowText } from '@/components/ui/flow-text'
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
    <SafeAreaView className="flex-1 bg-flow-bg">
      <StatusBar style="dark" />
      <ScrollView
        className="flex-1 px-6"
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-4 mt-2 flex-row items-center justify-between">
          <Pressable onPress={() => router.back()} className="active:opacity-70">
            <FlowText className="text-sm text-flow-muted">Retour</FlowText>
          </Pressable>
          <FlowText className="text-xs uppercase tracking-wider text-flow-faint">Semaine</FlowText>
        </View>

        <FlowText className="text-[22px] font-bold text-flow-text">Suivi quotidien</FlowText>

        <View className="mt-6 border-b border-flow-border pb-2">
          <FlowText className="text-sm font-bold text-flow-cta">Émotions</FlowText>
        </View>

        <View className="mt-6 flex-row items-center justify-between">
          <Pressable
            onPress={goPrevWeek}
            accessibilityRole="button"
            accessibilityLabel="Semaine précédente"
            className="h-10 w-10 items-center justify-center rounded-full border border-flow-border bg-flow-secondary active:opacity-80"
          >
            <MaterialIcons name="chevron-left" size={24} color={FLOW.muted} />
          </Pressable>
          <FlowText className="text-sm text-flow-text">{weekLabel}</FlowText>
          <Pressable
            onPress={goNextWeek}
            disabled={!canGoNext}
            accessibilityRole="button"
            accessibilityLabel="Semaine suivante"
            className="h-10 w-10 items-center justify-center rounded-full border border-flow-border bg-flow-secondary active:opacity-80 disabled:opacity-30"
          >
            <MaterialIcons name="chevron-right" size={24} color={FLOW.muted} />
          </Pressable>
        </View>

        {isLoading ? (
          <View className="mt-16 items-center">
            <ActivityIndicator color={FLOW.cta} />
          </View>
        ) : error ? (
          <FlowText className="mt-8 text-center text-sm text-red-500">{error}</FlowText>
        ) : (
          <MoodWeekChart weekDays={weekDays} entriesByDate={entriesByDate} />
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
