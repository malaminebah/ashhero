import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { FlipDetailScreen } from '@/components/ui/flip-detail-screen'
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
  FlipDetailTitle,
} from '@/components/ui/flip-detail-parts'
import { getJalonByKey } from '@/src/features/tracker/components/dashboard/jalonsConfig'
import { useTrackerStore } from '@/src/features/tracker/store'

export default function JalonDetailScreen() {
  const router = useRouter()
  const { key } = useLocalSearchParams<{ key: string }>()
  const quitDate = useTrackerStore((s) => s.quitDate)
  const jalon = key ? getJalonByKey(key) : undefined

  const hoursSinceQuit = quitDate
    ? (Date.now() - quitDate.getTime()) / 3_600_000
    : 0

  if (!jalon) {
    return (
      <FlipDetailScreen
        onClose={() => router.back()}
        autoFlip={false}
        front={<FlipDetailNotFound label="Jalon introuvable." />}
        back={<FlipDetailNotFound label="Jalon introuvable." />}
      />
    )
  }

  const unlocked = hoursSinceQuit >= jalon.hours
  const daysLeft = Math.ceil(Math.max(0, jalon.hours - hoursSinceQuit) / 24)

  return (
    <FlipDetailScreen
      onClose={() => router.back()}
      front={
        <FlipDetailFront>
          <FlipDetailIconWell locked={!unlocked}>
            <MaterialIcons
              name={unlocked ? 'check-circle' : 'flag'}
              size={44}
              color={unlocked ? '#22c55e' : '#5b4a75'}
            />
          </FlipDetailIconWell>
          <FlipDetailEyebrow>{jalon.label}</FlipDetailEyebrow>
          <FlipDetailTitle>{jalon.title}</FlipDetailTitle>
          <FlipDetailStatusChip
            unlocked={unlocked}
            unlockedLabel="Jalon débloqué"
            lockedLabel={
              daysLeft > 0 ? `Encore ~${daysLeft} jour${daysLeft > 1 ? 's' : ''}` : 'Bientôt'
            }
          />
        </FlipDetailFront>
      }
      back={
        <>
          <FlipDetailBackHeader eyebrow={jalon.label} title={jalon.title} />
          <FlipDetailBackBody>{jalon.summary}</FlipDetailBackBody>
          <FlipDetailInsightCard label="Ta santé" accent="cta">
            <FlipDetailInsightText>{jalon.health}</FlipDetailInsightText>
          </FlipDetailInsightCard>
        </>
      }
    />
  )
}
