import { useLocalSearchParams, useRouter } from 'expo-router'
import { FlipDetailScreen } from '@/components/ui/flip-detail-screen'
import { HexBadge, type HexBadgeTint } from '@/components/ui/hex-badge'
import {
  FlipDetailBackBody,
  FlipDetailBackHeader,
  FlipDetailEyebrow,
  FlipDetailFront,
  FlipDetailIconWell,
  FlipDetailInsightCard,
  FlipDetailInsightText,
  FlipDetailMetricPill,
  FlipDetailNotFound,
  FlipDetailStatusChip,
  FlipDetailTitle,
} from '@/components/ui/flip-detail-parts'
import {
  getDefenseBadgeByKey,
  isDefenseBadgeUnlocked,
} from '@/src/features/tracker/components/dashboard/defenseBadgesConfig'
import { useStats } from '@/src/features/tracker/hooks/useStats'

const DEFENSE_TINT: Record<string, HexBadgeTint> = {
  week1: 'blue',
  week2: 'green',
  week3: 'violet',
}

export default function DefenseBadgeDetailScreen() {
  const router = useRouter()
  const { key } = useLocalSearchParams<{ key: string }>()
  const { dayCount } = useStats()
  const rule = key ? getDefenseBadgeByKey(key) : undefined

  if (!rule) {
    return (
      <FlipDetailScreen
        onClose={() => router.back()}
        autoFlip={false}
        front={<FlipDetailNotFound label="Badge introuvable." />}
        back={<FlipDetailNotFound label="Badge introuvable." />}
      />
    )
  }

  const unlocked = isDefenseBadgeUnlocked(rule.minDays, dayCount)
  const daysLeft = Math.max(0, rule.minDays - dayCount)

  return (
    <FlipDetailScreen
      onClose={() => router.back()}
      front={
        <FlipDetailFront>
          <FlipDetailIconWell locked={!unlocked}>
            <HexBadge
              icon="shield"
              tint={DEFENSE_TINT[rule.key] ?? 'blue'}
              size={62}
              locked={!unlocked}
            />
          </FlipDetailIconWell>
          <FlipDetailEyebrow>{rule.label}</FlipDetailEyebrow>
          <FlipDetailTitle>{rule.title}</FlipDetailTitle>
          <FlipDetailMetricPill
            value={`+${rule.healthBonusPercent} %`}
            label="Bonus santé"
          />
          <FlipDetailStatusChip
            unlocked={unlocked}
            unlockedLabel="Badge débloqué"
            lockedLabel={
              daysLeft > 0 ? `Encore ${daysLeft} jour${daysLeft > 1 ? 's' : ''}` : 'Bientôt'
            }
          />
        </FlipDetailFront>
      }
      back={
        <>
          <FlipDetailBackHeader
            eyebrow={`${rule.label} · +${rule.healthBonusPercent} %`}
            title={rule.title}
          />
          <FlipDetailBackBody>{rule.summary}</FlipDetailBackBody>
          <FlipDetailInsightCard label="Effet en combat" accent="brand">
            <FlipDetailInsightText>{rule.health}</FlipDetailInsightText>
          </FlipDetailInsightCard>
        </>
      }
    />
  )
}
