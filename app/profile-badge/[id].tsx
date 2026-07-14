import { useLocalSearchParams, useRouter } from 'expo-router'
import { FlipDetailScreen } from '@/components/ui/flip-detail-screen'
import { HexBadge } from '@/components/ui/hex-badge'
import {
  FlipDetailBackBody,
  FlipDetailBackHeader,
  FlipDetailEyebrow,
  FlipDetailFront,
  FlipDetailIconWell,
  FlipDetailInsightCard,
  FlipDetailInsightText,
  FlipDetailNotFound,
  FlipDetailStatusChip,
  FlipDetailSubtitle,
  FlipDetailTitle,
} from '@/components/ui/flip-detail-parts'
import type { ProfileBadgeStats } from '@/src/features/tracker/components/profile/badgeRules'
import {
  getProfileBadgeById,
  getProfileBadgeDetail,
  getProfileBadgeProgressHint,
} from '@/src/features/tracker/components/profile/profileBadgeDetails'
import { useStats } from '@/src/features/tracker/hooks/useStats'
import { useTrackerStore } from '@/src/features/tracker/store'

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
        front={<FlipDetailNotFound label="Badge introuvable." />}
        back={<FlipDetailNotFound label="Badge introuvable." />}
      />
    )
  }

  const unlocked = badge.isUnlocked(stats)
  const progressHint = getProfileBadgeProgressHint(badge.id, stats)

  return (
    <FlipDetailScreen
      onClose={() => router.back()}
      front={
        <FlipDetailFront>
          <FlipDetailIconWell locked={!unlocked}>
            <HexBadge icon={badge.icon} tint={badge.tint} size={62} locked={!unlocked} />
          </FlipDetailIconWell>
          <FlipDetailEyebrow>{badge.name}</FlipDetailEyebrow>
          <FlipDetailTitle>{detail.title}</FlipDetailTitle>
          <FlipDetailSubtitle>{detail.summary}</FlipDetailSubtitle>
          <FlipDetailStatusChip
            unlocked={unlocked}
            unlockedLabel="Badge débloqué"
            lockedLabel={progressHint ?? 'En cours'}
          />
        </FlipDetailFront>
      }
      back={
        <>
          <FlipDetailBackHeader eyebrow={badge.name} title={detail.title} />
          <FlipDetailBackBody>{detail.backBody}</FlipDetailBackBody>
          <FlipDetailInsightCard label="Comment l'obtenir" accent="gold">
            <FlipDetailInsightText>
              {badge.requirement}
              {!unlocked && progressHint ? ` — ${progressHint.toLowerCase()}` : ''}
            </FlipDetailInsightText>
          </FlipDetailInsightCard>
          <FlipDetailInsightCard label="Le sais-tu ?" accent="brand">
            <FlipDetailInsightText>{detail.tip}</FlipDetailInsightText>
          </FlipDetailInsightCard>
          <FlipDetailInsightCard label="Statut" accent={unlocked ? 'cta' : 'brand'}>
            <FlipDetailInsightText>
              {unlocked
                ? 'Badge débloqué — continue à accumuler les victoires.'
                : progressHint ?? 'Continue ton parcours pour le débloquer.'}
            </FlipDetailInsightText>
          </FlipDetailInsightCard>
        </>
      }
    />
  )
}
