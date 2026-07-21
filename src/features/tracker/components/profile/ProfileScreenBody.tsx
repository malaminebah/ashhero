import { useRef } from 'react'
import { View, ScrollView, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { FlowText } from '@/components/ui/flow-text'
import { ChunkyButton, CHUNKY_COLORS } from '@/components/ui/chunky-button'
import { floatingTabClearance } from '@/src/features/navigation/floatingTabBar'
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
import { ProfileJourneySection } from './ProfileJourneySection'
import { ProfileLevelsGrid } from './ProfileLevelsGrid'
import { ProfileStatsGrid } from './ProfileStatsGrid'
import { ProfileBadgesGrid } from './ProfileBadgesGrid'
import { ProfileAvatarsSection } from './ProfileAvatarsSection'
import type { ProfileBadgeStats } from './badgeRules'

export const ProfileScreenBody = () => {
  const router = useRouter()
  const insets = useSafeAreaInsets()
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
    <ScrollView
      className="flex-1 bg-brand-bg"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: insets.top + 16,
        paddingBottom: floatingTabClearance(insets.bottom),
      }}
    >
      <View className="px-5 pb-10">
        <ProfileHeader onEditPress={() => heroRef.current?.focusName()} />
        <ProfileHeroCard
          ref={heroRef}
          level={level}
          xp={xp}
          heroName={heroName}
          onSaveName={setHeroName}
        />
        <ProfileStatsGrid
          dayCount={dayCount}
          moneySaved={moneySaved}
          avoidedCount={cigarettesAvoided}
          avoidedLabel={avoidedLabel}
          combatsWon={combatsWon}
          combatsLost={combatsLost}
          relapseCount={relapseCount ?? 0}
        />
        <ProfileJourneySection />
        <ProfileBadgesGrid stats={badgeStats} />
        <ProfileLevelsGrid level={level} xp={xp} />
        <ProfileAvatarsSection level={level} />

        <View className="mt-4">
          <ChunkyButton
            label="Une envie, là ? Combats-la"
            palette={CHUNKY_COLORS.violet}
            height={56}
            fontSize={15}
            onPress={() => router.push('/(tabs)/combat' as never)}
          />
        </View>

        <View className="mt-4 gap-3">
          <ButtonCraving />
          <ButtonReset onAfterReset={onResetAll} />
        </View>

        {__DEV__ ? (
          <Pressable onPress={onRestartFlow} className="mt-8 items-center py-3 active:opacity-80">
            <FlowText className="text-xs text-brand-locked">Recommencer le parcours (test)</FlowText>
          </Pressable>
        ) : null}
      </View>
    </ScrollView>
  )
}
