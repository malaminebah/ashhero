import { View, ScrollView, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import { GameLabel } from '@/components/ui/game-label'
import { FlowText } from '@/components/ui/flow-text'
import { DASHBOARD_JALONS } from './jalonsConfig'

import type { DashboardJalonsGridParams } from '../../types'

const NextJalonChip = ({ label, onPress }: { label: string; onPress: () => void }) => {
  const glow = useSharedValue(0.15)

  useEffect(() => {
    glow.value = withRepeat(withTiming(0.45, { duration: 900 }), -1, true)
  }, [glow])

  const glowStyle = useAnimatedStyle(() => ({
    shadowOpacity: glow.value,
  }))

  return (
    <Animated.View
      style={[
        glowStyle,
        { shadowColor: '#fbbf24', shadowOffset: { width: 0, height: 0 }, shadowRadius: 10, elevation: 6 },
      ]}
    >
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`Prochain jalon ${label}`}
        className="items-center rounded-[14px] border-[1.5px] border-brand-gold bg-brand-track px-4 py-2.5 active:opacity-90"
      >
        <FlowText className="text-xs font-extrabold text-brand-gold">{label}</FlowText>
      </Pressable>
    </Animated.View>
  )
}

export const DashboardJalonsGrid = ({ hoursSinceQuit }: DashboardJalonsGridParams) => {
  const router = useRouter()

  return (
    <View className="mt-4">
      <GameLabel>Jalons</GameLabel>
      <ScrollView
        horizontal
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        className="mt-2"
        contentContainerStyle={{ gap: 8, paddingRight: 4, paddingVertical: 4 }}
      >
        {DASHBOARD_JALONS.map((j, i) => {
          const unlocked = hoursSinceQuit >= j.hours
          const isNext =
            !unlocked && (i === 0 || hoursSinceQuit >= DASHBOARD_JALONS[i - 1].hours)
          const goto = () => router.push(`/jalon/${j.key}` as never)

          if (isNext) return <NextJalonChip key={j.key} label={j.label} onPress={goto} />

          return (
            <Pressable
              key={j.key}
              onPress={goto}
              accessibilityRole="button"
              accessibilityLabel={`Jalon ${j.label}`}
              className={`items-center rounded-[14px] border px-4 py-2.5 active:opacity-90 ${
                unlocked
                  ? 'border-brand-success bg-brand-card'
                  : 'border-[rgba(255,255,255,0.1)] bg-brand-card'
              }`}
            >
              <FlowText
                className={`text-xs font-extrabold ${
                  unlocked ? 'text-brand-success' : 'text-brand-locked'
                }`}
              >
                {j.label}
                {unlocked ? ' ✓' : ''}
              </FlowText>
            </Pressable>
          )
        })}
      </ScrollView>
    </View>
  )
}
