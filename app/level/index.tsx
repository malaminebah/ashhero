import { ScrollView, View } from 'react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { FlowBackButton } from '@/components/ui/flow-back-button'
import { FlowText } from '@/components/ui/flow-text'
import { GameCard } from '@/components/ui/game-card'
import { GameIcon } from '@/components/ui/game-icon'
import { GameLabel } from '@/components/ui/game-label'
import { XpBar } from '@/components/ui/xp-bar'
import { LevelStepRow } from '@/src/features/tracker/components/profile/LevelStepRow'
import { LevelTierIcon } from '@/src/features/tracker/components/profile/LevelTierIcon'
import { useTrackerStore } from '@/src/features/tracker/store'
import {
  MAX_PROFILE_LEVEL,
  PROFILE_LEVEL_STEPS,
  XP_PER_LEVEL,
  xpProgressInLevel,
} from '@/src/features/tracker/utils/levelProgress'

export default function LevelProgressScreen() {
  const router = useRouter()
  const xp = useTrackerStore((s) => s.xp)
  const level = useTrackerStore((s) => s.level)
  const { nextCap, pct } = xpProgressInLevel(xp)
  const xpToNext = Math.max(0, nextCap - xp)
  const unlockedCount = PROFILE_LEVEL_STEPS.filter((step) => level >= step.level).length

  return (
    <SafeAreaView className="flex-1 bg-brand-bg" edges={['top', 'left', 'right']}>
      <StatusBar style="light" />
      <View className="px-5 pt-2">
        <FlowBackButton onPress={() => router.back()} label="Profil" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
      >
        <FlowText className="text-[22px] font-extrabold leading-8 text-white" style={{ letterSpacing: -0.4 }}>
          Progression
        </FlowText>
        <FlowText className="mt-1 text-[15px] leading-6 text-brand-muted">
          Monte en niveau en gagnant des combats
        </FlowText>

        <GameCard className="mt-6 p-5" style={{ borderColor: 'rgba(251,191,36,0.35)' }}>
          <View className="flex-row items-center gap-4">
            <View className="h-[72px] w-[72px] items-center justify-center rounded-2xl bg-brand-track">
              <LevelTierIcon level={level} size={36} unlocked />
            </View>
            <View className="flex-1">
              <GameLabel>Ton niveau</GameLabel>
              <FlowText className="mt-1 text-[32px] font-extrabold leading-9 text-white">
                Niveau {level}
              </FlowText>
            </View>
            <View className="rounded-full bg-brand-track px-3 py-1.5">
              <FlowText className="text-xs font-bold text-brand-gold">
                {unlockedCount}/{MAX_PROFILE_LEVEL}
              </FlowText>
            </View>
          </View>

          <View className="mt-6">
            <View className="flex-row items-baseline justify-between">
              <GameLabel>XP</GameLabel>
              <FlowText className="text-sm font-bold text-brand-gold">
                {xp} <FlowText className="text-sm font-normal text-brand-muted">/ {nextCap}</FlowText>
              </FlowText>
            </View>
            <View className="mt-2.5">
              <XpBar progress={pct / 100} />
            </View>
            <FlowText className="mt-2.5 text-xs leading-4 text-brand-locked">
              {xpToNext > 0
                ? `Encore ${xpToNext} XP pour atteindre le niveau ${level + 1}`
                : level >= MAX_PROFILE_LEVEL
                  ? 'Tu as atteint le palier max affiché — bravo !'
                  : 'Palier suivant débloqué — continue sur ta lancée !'}
            </FlowText>
          </View>
        </GameCard>

        <GameCard className="mt-4 flex-row items-center gap-3 px-4 py-3.5">
          <View className="h-10 w-10 items-center justify-center rounded-xl bg-brand-track">
            <GameIcon name="bolt" size={20} color="#fbbf24" />
          </View>
          <View className="flex-1">
            <FlowText className="text-sm font-bold text-white">
              {XP_PER_LEVEL} XP par niveau
            </FlowText>
            <FlowText className="mt-0.5 text-xs leading-4 text-brand-muted">
              Chaque victoire en combat te rapproche du palier suivant
            </FlowText>
          </View>
        </GameCard>

        <View className="mb-4 mt-8 flex-row items-end justify-between">
          <GameLabel>Tous les paliers</GameLabel>
          <FlowText className="text-xs text-brand-locked">{unlockedCount} débloqués</FlowText>
        </View>

        <View className="gap-2.5">
          {PROFILE_LEVEL_STEPS.map((step) => (
            <LevelStepRow
              key={step.level}
              stepLevel={step.level}
              xpRequired={step.xpRequired}
              userLevel={level}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
