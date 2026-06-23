import { View } from 'react-native'
import { Image } from 'expo-image'
import { useLocalSearchParams, useRouter } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { FlipDetailScreen } from '@/components/ui/flip-detail-screen'
import { FlowText } from '@/components/ui/flow-text'
import { FLOW } from '@/constants/flowTheme'
import type { ProfileBadgeStats } from '@/src/features/tracker/components/profile/badgeRules'
import {
  getProfileBadgeById,
  getProfileBadgeDetail,
  getProfileBadgeProgressHint,
} from '@/src/features/tracker/components/profile/profileBadgeDetails'
import { profileBadgeSource } from '@/src/features/tracker/components/profile/profileBadgeAssets'
import { useStats } from '@/src/features/tracker/hooks/useStats'
import { useTrackerStore } from '@/src/features/tracker/store'

const ICON_SIZE = 88

export default function ProfileBadgeDetailScreen() {
  const router = useRouter()
  const { id } = useLocalSearchParams<{ id: string }>()
  const smokingType = useTrackerStore((s) => s.smokingType)
  const combatsWon = useTrackerStore((s) => s.combatsWon)
  const xp = useTrackerStore((s) => s.xp)
  const level = useTrackerStore((s) => s.level)
  const { moneySaved, dayCount } = useStats()

  const badge = id ? getProfileBadgeById(id) : undefined
  const detail = id ? getProfileBadgeDetail(id) : undefined

  const stats: ProfileBadgeStats = {
    dayCount,
    combatsWon,
    xp,
    level,
    moneySaved,
    smokingType,
  }

  if (!badge || !detail) {
    return (
      <FlipDetailScreen
        onClose={() => router.back()}
        autoFlip={false}
        front={
          <FlowText className="text-sm text-flow-muted">Badge introuvable.</FlowText>
        }
        back={<FlowText className="text-sm text-flow-muted">Badge introuvable.</FlowText>}
      />
    )
  }

  const unlocked = badge.isUnlocked(stats)
  const progressHint = getProfileBadgeProgressHint(badge.id, stats)

  return (
    <FlipDetailScreen
      onClose={() => router.back()}
      front={
        <>
          <View className="relative mb-5 h-24 w-24 items-center justify-center rounded-2xl border border-flow-border bg-flow-bg">
            <Image
              source={profileBadgeSource(badge.asset)}
              style={{
                width: ICON_SIZE,
                height: ICON_SIZE,
                opacity: unlocked ? 1 : 0.35,
              }}
              contentFit="contain"
            />
            {!unlocked ? (
              <View className="absolute inset-0 items-center justify-center">
                <MaterialIcons name="lock" size={28} color={FLOW.faint} />
              </View>
            ) : null}
          </View>
          <FlowText className="text-xs font-bold text-flow-cta">{badge.name}</FlowText>
          <FlowText className="mt-3 text-center text-[22px] font-bold text-flow-text">
            {detail.title}
          </FlowText>
          <FlowText className="mt-2 text-center text-sm text-flow-muted">{detail.summary}</FlowText>
          <FlowText className="mt-4 text-center text-xs text-flow-faint">
            {unlocked ? 'Badge débloqué' : progressHint}
          </FlowText>
        </>
      }
      back={
        <>
          <FlowText className="text-xs font-bold uppercase tracking-wide text-flow-cta">
            {badge.name}
          </FlowText>
          <FlowText className="mt-3 text-[20px] font-bold text-flow-text">{detail.title}</FlowText>
          <FlowText className="mt-4 text-[15px] leading-6 text-flow-muted">{detail.backBody}</FlowText>
          <View className="mt-8 rounded-2xl border border-flow-border bg-flow-secondary px-4 py-4">
            <FlowText className="text-xs font-bold text-flow-text">Statut</FlowText>
            <FlowText className="mt-2 text-sm leading-5 text-flow-muted">
              {unlocked
                ? 'Tu as mérité ce badge — continue à accumuler les victoires.'
                : progressHint ?? 'Continue ton parcours pour le débloquer.'}
            </FlowText>
          </View>
        </>
      }
    />
  )
}
