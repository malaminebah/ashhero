import { useEffect } from 'react'
import { Pressable, ScrollView, View } from 'react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { FlowBackButton } from '@/components/ui/flow-back-button'
import { FlowText } from '@/components/ui/flow-text'
import { PRIMARY_MOODS } from '@/src/features/mood/moodTaxonomy'
import type { PrimaryMood } from '@/src/features/mood/types'
import { MoodFlowProgress } from '@/src/features/mood/components/MoodFlowProgress'
import { useWeeklyMood } from '@/src/features/mood/hooks/useWeeklyMood'

export default function MoodPrimaryScreen() {
  const router = useRouter()
  const { canFillToday, isLoading } = useWeeklyMood()

  useEffect(() => {
    if (!isLoading && !canFillToday) {
      router.replace('/(tabs)/' as never)
    }
  }, [isLoading, canFillToday, router])

  const onSelect = (id: PrimaryMood) => {
    router.push({ pathname: '/mood/detail', params: { primary: id } } as never)
  }

  return (
    <SafeAreaView className="flex-1 bg-flow-bg">
      <StatusBar style="dark" />
      <ScrollView
        className="flex-1 px-6"
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <FlowBackButton onPress={() => router.back()} />

        <MoodFlowProgress step={1} />

        <FlowText className="text-center text-[22px] font-bold text-flow-text">
          Aujourd&apos;hui…
        </FlowText>
        <FlowText className="mt-3 text-center text-[15px] leading-6 text-flow-muted">
          Sélectionne ton émotion dominante :
        </FlowText>

        <View className="mt-8 flex-row flex-wrap justify-between gap-y-6">
          {PRIMARY_MOODS.map((mood) => (
            <Pressable
              key={mood.id}
              onPress={() => onSelect(mood.id)}
              accessibilityRole="button"
              accessibilityLabel={mood.label}
              className="w-[30%] items-center active:opacity-85"
            >
              <View
                className="mb-2 h-16 w-16 items-center justify-center rounded-full border-2"
                style={{
                  backgroundColor: `${mood.circleColor}22`,
                  borderColor: `${mood.circleColor}88`,
                }}
              >
                <View
                  className="h-10 w-10 rounded-full"
                  style={{ backgroundColor: mood.circleColor }}
                />
              </View>
              <FlowText className="text-center text-[10px] uppercase tracking-wide text-flow-text">
                {mood.label}
              </FlowText>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
