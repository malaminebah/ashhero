import { useEffect } from 'react'
import { Pressable, ScrollView, View } from 'react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { FlowBackButton } from '@/components/ui/flow-back-button'
import { FlowText } from '@/components/ui/flow-text'
import { PRIMARY_MOODS } from '@/src/features/mood/moodTaxonomy'
import type { PrimaryMood } from '@/src/features/mood/types'
import { MoodFlowProgress } from '@/src/features/mood/components/MoodFlowProgress'
import { MoodIcon } from '@/src/features/mood/components/MoodIcon'
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
    <SafeAreaView className="flex-1 bg-brand-bg">
      <StatusBar style="light" />
      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <FlowBackButton onPress={() => router.back()} />

        <MoodFlowProgress step={1} />

        <FlowText className="text-[22px] font-extrabold text-white" style={{ letterSpacing: -0.4 }}>
          Et aujourd&apos;hui ?
        </FlowText>
        <FlowText className="mt-2 text-[15px] leading-6 text-brand-muted">
          Sélectionne ton émotion dominante — les envies baissent quand ton humeur remonte.
        </FlowText>

        <View className="mt-8 flex-row flex-wrap justify-between gap-y-6">
          {PRIMARY_MOODS.map((mood, index) => (
            <Animated.View
              key={mood.id}
              entering={FadeInDown.duration(300).delay(index * 60)}
              style={{ width: '30%' }}
            >
              <Pressable
                onPress={() => onSelect(mood.id)}
                accessibilityRole="button"
                accessibilityLabel={mood.label}
                className="items-center active:opacity-85"
              >
                <View className="mb-2">
                  <MoodIcon mood={mood.id} size={64} />
                </View>
                <FlowText className="text-center text-[11px] font-bold uppercase tracking-[0.6px] text-brand-muted">
                  {mood.label}
                </FlowText>
              </Pressable>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
