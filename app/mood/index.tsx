import { useEffect } from 'react'
import { View, Text, Pressable, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { titleSerif } from '@/constants/theme'
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
    <SafeAreaView className="flex-1 bg-brand-bg">
      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          onPress={() => router.back()}
          className="mb-4 mt-2 self-start active:opacity-70"
        >
          <Text className="font-mono text-sm text-white/55">Retour</Text>
        </Pressable>

        <MoodFlowProgress step={1} />

        <Text
          className="text-3xl font-bold text-brand-success"
          style={{ fontFamily: titleSerif }}
        >
          Aujourd&apos;hui…
        </Text>
        <Text className="mt-3 font-mono text-sm leading-5 text-white/65">
          Sélectionne ton émotion dominante :
        </Text>

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
              <Text className="text-center font-mono text-[10px] uppercase tracking-wide text-white/80">
                {mood.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
