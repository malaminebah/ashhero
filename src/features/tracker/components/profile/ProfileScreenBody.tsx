import { View, ScrollView, Pressable, Text } from 'react-native'
import { useRouter } from 'expo-router'
import { ButtonCraving, ButtonReset } from '@/src/features/tracker'
import { useTrackerStore } from '@/src/features/tracker/store'
import { useStats } from '@/src/features/tracker/hooks/useStats'
import { ProfileHeader } from './ProfileHeader'
import { ProfileHeroCard } from './ProfileHeroCard'
import { ProfileStatsGrid } from './ProfileStatsGrid'
import { ProfileBadgesGrid } from './ProfileBadgesGrid'
import { ProfileHistorySection } from './ProfileHistorySection'
import type { ProfileBadgeStats } from './badgeRules'

export const ProfileScreenBody = () => {
  const router = useRouter()
  const reset = useTrackerStore((s) => s.reset)
  const smokingType = useTrackerStore((s) => s.smokingType)
  const combatsWon = useTrackerStore((s) => s.combatsWon)
  const combatsLost = useTrackerStore((s) => s.combatsLost)
  const bestStreak = useTrackerStore((s) => s.bestStreak)
  const relapseCount = useTrackerStore((s) => s.relapseCount)
  const xp = useTrackerStore((s) => s.xp)
  const level = useTrackerStore((s) => s.level)

  const { moneySaved, cigarettesAvoided, dayCount } = useStats()
  const avoidedLabel =
    smokingType === 'cigarette' ? 'Cigarettes évitées' : 'Puffs évitées'

  const badgeStats: ProfileBadgeStats = {
    dayCount,
    combatsWon,
    xp,
    level,
    moneySaved,
    smokingType,
  }

  const onRestartFlow = () => {
    reset()
    router.replace('/' as never)
  }

  return (
    <ScrollView className="flex-1 bg-brand-bg" showsVerticalScrollIndicator={false}>
      <View className="px-5 pb-10 pt-12">
        <ProfileHeader />
        <ProfileHeroCard level={level} xp={xp} />
        <ProfileStatsGrid
          dayCount={dayCount}
          moneySaved={moneySaved}
          avoidedCount={cigarettesAvoided}
          avoidedLabel={avoidedLabel}
          combatsWon={combatsWon}
          xp={xp}
          level={level}
        />
        <ProfileBadgesGrid stats={badgeStats} />
        <ProfileHistorySection combatsWon={combatsWon} />

        <View className="mt-2 rounded-xl border border-white/10 bg-white/[0.02] p-3">
          <Text className="font-mono text-[9px] uppercase tracking-wider text-white/35">
            Plus de stats
          </Text>
          <Text className="mt-1 font-mono text-[10px] text-white/50">
            Défaites : {combatsLost} · Meilleure série : {bestStreak ?? 0} j · Rechutes :{' '}
            {relapseCount ?? 0}
          </Text>
        </View>

        <View className="mt-8 gap-3">
          <ButtonCraving />
          <ButtonReset />
        </View>

        <Pressable onPress={onRestartFlow} className="mt-10 items-center py-3 active:opacity-80">
          <Text className="font-mono text-xs text-white/30">Recommencer le parcours (test)</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}
