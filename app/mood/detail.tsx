import { useState } from 'react'
import { View, Text, Pressable, ScrollView, ActivityIndicator } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { titleSerif } from '@/constants/theme'
import { PRIMARY_MOODS, getSubMoods } from '@/src/features/mood/moodTaxonomy'
import type { PrimaryMood } from '@/src/features/mood/types'
import { MoodFlowProgress } from '@/src/features/mood/components/MoodFlowProgress'
import { useWeeklyMood } from '@/src/features/mood/hooks/useWeeklyMood'

export default function MoodDetailScreen() {
  const router = useRouter()
  const { primary: primaryParam } = useLocalSearchParams<{ primary: string }>()
  const { saveToday, isSaving, canFillToday } = useWeeklyMood()
  const [selectedSub, setSelectedSub] = useState<string | null>(null)

  const primary = primaryParam as PrimaryMood | undefined
  const isValidPrimary =
    primary != null && PRIMARY_MOODS.some((m) => m.id === primary)

  if (!isValidPrimary) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-brand-bg px-5">
        <Text className="font-mono text-sm text-white/60">Émotion invalide.</Text>
        <Pressable onPress={() => router.replace('/mood' as never)} className="mt-4">
          <Text className="font-mono text-sm text-brand-success">Recommencer</Text>
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

        <MoodFlowProgress step={2} />

        <Text
          className="text-3xl font-bold text-brand-success"
          style={{ fontFamily: titleSerif }}
        >
          Plus précisément…
        </Text>
        <Text className="mt-3 font-mono text-sm leading-5 text-white/65">
          Quelle émotion décrit le mieux ce que tu ressens ?
        </Text>

        <View className="mt-8 flex-row flex-wrap gap-2">
          {subs.map((sub) => {
            const active = selectedSub === sub.id
            return (
              <Pressable
                key={sub.id}
                onPress={() => setSelectedSub(sub.id)}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                className={`rounded-xl border px-4 py-3 active:opacity-90 ${
                  active
                    ? 'border-brand-success bg-brand-success'
                    : 'border-white/15 bg-white/[0.06]'
                }`}
              >
                <Text
                  className={`font-mono text-xs font-bold ${
                    active ? 'text-brand-bg' : 'text-white/85'
                  }`}
                >
                  {sub.label}
                </Text>
              </Pressable>
            )
          })}
        </View>

        <Pressable
          onPress={() => void onSave()}
          disabled={!selectedSub || isSaving || !canFillToday}
          className="mt-10 active:opacity-90 disabled:opacity-45"
        >
          <LinearGradient
            colors={['#15803d', '#22c55e', '#16a34a']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{
              borderRadius: 999,
              paddingVertical: 16,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            {isSaving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                Continuer
              </Text>
            )}
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}
