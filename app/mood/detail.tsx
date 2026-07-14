import { useState } from 'react'
import { View, Pressable, ScrollView } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { FlowBackButton } from '@/components/ui/flow-back-button'
import { FlowText } from '@/components/ui/flow-text'
import { ChunkyButton, CHUNKY_COLORS } from '@/components/ui/chunky-button'
import {
  PRIMARY_MOODS,
  MOOD_XP_REWARD,
  getPrimaryMood,
  getSubMoods,
} from '@/src/features/mood/moodTaxonomy'
import type { PrimaryMood } from '@/src/features/mood/types'
import { MoodFlowProgress } from '@/src/features/mood/components/MoodFlowProgress'
import { MoodIcon } from '@/src/features/mood/components/MoodIcon'
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
      <SafeAreaView className="flex-1 items-center justify-center bg-brand-bg px-6">
        <StatusBar style="light" />
        <FlowText className="text-sm text-brand-muted">Émotion invalide.</FlowText>
        <Pressable onPress={() => router.replace('/mood' as never)} className="mt-4">
          <FlowText className="text-sm font-bold text-brand-accent">Recommencer</FlowText>
        </Pressable>
      </SafeAreaView>
    )
  }

  const mood = getPrimaryMood(primary)
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
    <SafeAreaView className="flex-1 bg-brand-bg">
      <StatusBar style="light" />
      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <FlowBackButton onPress={() => router.back()} />

        <MoodFlowProgress step={2} />

        <FlowText className="text-[22px] font-extrabold text-white" style={{ letterSpacing: -0.4 }}>
          Plus précisément…
        </FlowText>
        <FlowText className="mt-2 text-[15px] leading-6 text-brand-muted">
          Quelle émotion décrit le mieux ce que tu ressens ?
        </FlowText>

        <View className="mt-7 flex-row items-center gap-3 self-center rounded-full bg-brand-card py-1.5 pl-1.5 pr-5">
          <MoodIcon mood={primary} size={40} />
          <FlowText className="text-sm font-extrabold" style={{ color: mood.circleColor }}>
            {mood.label}
          </FlowText>
        </View>

        <View className="mt-7 flex-row flex-wrap gap-2">
          {subs.map((sub) => {
            const active = selectedSub === sub.id
            return (
              <Pressable
                key={sub.id}
                onPress={() => setSelectedSub(sub.id)}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                className="rounded-2xl border px-4 py-3 active:opacity-90"
                style={
                  active
                    ? { borderColor: mood.circleColor, backgroundColor: `${mood.circleColor}26` }
                    : { borderColor: 'rgba(255,255,255,0.1)', backgroundColor: '#150826' }
                }
              >
                <FlowText
                  className="text-xs font-bold"
                  style={{ color: active ? mood.circleColor : '#ffffff' }}
                >
                  {sub.label}
                </FlowText>
              </Pressable>
            )
          })}
        </View>

        {error ? (
          <FlowText className="mt-4 text-sm text-brand-red">{error}</FlowText>
        ) : null}

        <FlowText className="mt-10 text-center text-xs font-bold text-brand-gold">
          +{MOOD_XP_REWARD} XP en notant ton humeur
        </FlowText>

        <View className="mt-3">
          <ChunkyButton
            label={isSaving ? 'Enregistrement…' : 'Enregistrer mon humeur'}
            palette={CHUNKY_COLORS.green}
            height={56}
            fontSize={15}
            onPress={() => void onSave()}
            disabled={!selectedSub || isSaving || !canFillToday}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
