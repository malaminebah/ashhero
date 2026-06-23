import { useRef } from 'react'
import { View, ScrollView, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { FlowText } from '@/components/ui/flow-text'
import { useSessionStore } from '@/src/features/auth/sessionStore'
import { useOnboardingStore } from '@/src/features/onboarding/store'
import { ButtonCraving } from '../ButtonCraving'
import { ButtonReset } from '../ButtonReset'
import { useTrackerStore } from '@/src/features/tracker/store'
import { deleteProfile, getCurrentUid } from '@/src/services'
import { useStats } from '@/src/features/tracker/hooks/useStats'
import { ProfileHeader } from './ProfileHeader'
import {
  ProfileHeroCard,
  type ProfileHeroCardHandle,
} from './ProfileHeroCard'
import { ProfileProgressPair } from './ProfileProgressPair'
import { ProfileLevelsGrid } from './ProfileLevelsGrid'
import { ProfileStatsGrid } from './ProfileStatsGrid'
import { ProfileBadgesGrid } from './ProfileBadgesGrid'
import { ProfileAvatarsSection } from './ProfileAvatarsSection'
import type { ProfileBadgeStats } from './badgeRules'

export const ProfileScreenBody = () => {
  const router = useRouter()
  const heroRef = useRef<ProfileHeroCardHandle>(null)
  const reset = useTrackerStore((s) => s.reset)
  const smokingType = useTrackerStore((s) => s.smokingType)
  const combatsWon = useTrackerStore((s) => s.combatsWon)
  const combatsLost = useTrackerStore((s) => s.combatsLost)
  const relapseCount = useTrackerStore((s) => s.relapseCount)
  const xp = useTrackerStore((s) => s.xp)
  const level = useTrackerStore((s) => s.level)
  const heroName = useTrackerStore((s) => s.heroName)
  const setHeroName = useTrackerStore((s) => s.setHeroName)

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
    useOnboardingStore.getState().reset()
    useSessionStore.getState().setProfileResolved(false)
    router.replace('/' as never)
  }

  const onResetAll = () => {
    useOnboardingStore.getState().reset()
    useSessionStore.getState().setProfileResolved(false)
    const uid = getCurrentUid()
    if (uid) {
      void deleteProfile(uid).catch((e) => console.warn('[profile] deleteProfile', e))
    }
    router.replace('/' as never)
  }

  return (
    <ScrollView className="flex-1 bg-flow-bg" showsVerticalScrollIndicator={false}>
      <View className="px-6 pb-10 pt-12">
        <ProfileHeader onEditPress={() => heroRef.current?.focusName()} />
        <ProfileHeroCard
          ref={heroRef}
          level={level}
          heroName={heroName}
          onSaveName={setHeroName}
        />
        <ProfileProgressPair level={level} xp={xp} />
        <ProfileLevelsGrid level={level} xp={xp} />
        <ProfileStatsGrid
          dayCount={dayCount}
          moneySaved={moneySaved}
          avoidedCount={cigarettesAvoided}
          avoidedLabel={avoidedLabel}
          combatsWon={combatsWon}
          combatsLost={combatsLost}
          relapseCount={relapseCount ?? 0}
        />
        <ProfileBadgesGrid stats={badgeStats} />
        <ProfileAvatarsSection level={level} />

        <View className="mt-6 gap-3">
          <ButtonCraving />
          <ButtonReset onAfterReset={onResetAll} />
        </View>

        <Pressable onPress={onRestartFlow} className="mt-8 items-center py-3 active:opacity-80">
          <FlowText className="text-xs text-flow-faint">Recommencer le parcours (test)</FlowText>
        </Pressable>
      </View>
    </ScrollView>
  )
}
