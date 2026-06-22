import { useState } from 'react'
import { View, Pressable, ScrollView } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { FlowBackButton } from '@/components/ui/flow-back-button'
import { FlowText } from '@/components/ui/flow-text'
import { OnboardingPrimaryButton } from '@/src/features/onboarding/components/OnboardingPrimaryButton'
import { PRIMARY_MOODS, getSubMoods } from '@/src/features/mood/moodTaxonomy'
import type { PrimaryMood } from '@/src/features/mood/types'
import { MoodFlowProgress } from '@/src/features/mood/components/MoodFlowProgress'
import { useWeeklyMood } from '@/src/features/mood/hooks/useWeeklyMood'

export default function MoodDetailScreen() {
  const router = useRouter()
  const { primary: primaryParam } = useLocalSearchParams<{ primary: string }>()
  const { saveToday, isSaving, canFillToday, error } = useWeeklyMood()
  const [selectedSub, setSelectedSub] = useState<string | null>(null)

  const primary = primaryParam as PrimaryMood | undefined
  const isValidPrimary =
    primary != null && PRIMARY_MOODS.some((m) => m.id === primary)

  if (!isValidPrimary) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-flow-bg px-6">
        <StatusBar style="dark" />
        <FlowText className="text-sm text-flow-muted">Émotion invalide.</FlowText>
        <Pressable onPress={() => router.replace('/mood' as never)} className="mt-4">
          <FlowText className="text-sm font-bold text-flow-cta">Recommencer</FlowText>
        </Pressable>
      </SafeAreaView>
    )
  }

  const subs = getSubMoods(primary)

  const onSave = async () => {
    if (!selectedSub || !canFillToday) return
    try {
      await saveToday({ primary, sub: selectedSub })
      router.replace('/(tabs)/' as never)
    } catch {
      // error state handled in hook
    }
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

        <MoodFlowProgress step={2} />

        <FlowText className="text-center text-[22px] font-bold text-flow-text">
          Plus précisément…
        </FlowText>
        <FlowText className="mt-3 text-center text-[15px] leading-6 text-flow-muted">
          Quelle émotion décrit le mieux ce que tu ressens ?
        </FlowText>

        <View className="mt-8 flex-row flex-wrap gap-2">
          {subs.map((sub) => {
            const active = selectedSub === sub.id
            return (
              <Pressable
                key={sub.id}
                onPress={() => setSelectedSub(sub.id)}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                className={`rounded-2xl border px-4 py-3 active:opacity-90 ${
                  active
                    ? 'border-flow-cta bg-flow-cta'
                    : 'border-flow-border bg-flow-secondary'
                }`}
              >
                <FlowText
                  className={`text-xs font-bold ${
                    active ? 'text-white' : 'text-flow-text'
                  }`}
                >
                  {sub.label}
                </FlowText>
              </Pressable>
            )
          })}
        </View>

        {error ? (
          <FlowText className="mt-4 text-sm text-red-500">{error}</FlowText>
        ) : null}

        <View className="mt-10">
          <OnboardingPrimaryButton
            label={isSaving ? 'Enregistrement…' : 'Continuer'}
            onPress={() => void onSave()}
            disabled={!selectedSub || isSaving || !canFillToday}
            loading={isSaving}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
