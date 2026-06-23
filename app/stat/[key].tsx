import { Image } from 'expo-image'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { FlipDetailScreen } from '@/components/ui/flip-detail-screen'
import {
  FlipDetailBackBody,
  FlipDetailBackHeader,
  FlipDetailEyebrow,
  FlipDetailFront,
  FlipDetailHeroValue,
  FlipDetailHighlightValue,
  FlipDetailIconWell,
  FlipDetailInsightCard,
  FlipDetailInsightText,
  FlipDetailNotFound,
  FlipDetailStatusChip,
  FlipDetailTitle,
} from '@/components/ui/flip-detail-parts'
import { getStatDetail, type StatDetailKey } from '@/src/features/tracker/components/statsDetailConfig'
import { useStats } from '@/src/features/tracker/hooks/useStats'
import { useTrackerStore } from '@/src/features/tracker/store'

const STAT_KEYS = new Set<string>([
  'money',
  'avoided',
  'days',
  'combats-won',
  'combats-lost',
  'relapses',
])

function formatMoney(value: number): string {
  return value.toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export default function StatDetailScreen() {
  const router = useRouter()
  const { key } = useLocalSearchParams<{ key: string }>()
  const smokingType = useTrackerStore((s) => s.smokingType)
  const combatsWon = useTrackerStore((s) => s.combatsWon)
  const combatsLost = useTrackerStore((s) => s.combatsLost)
  const relapseCount = useTrackerStore((s) => s.relapseCount)
  const { moneySaved, cigarettesAvoided, dayCount } = useStats()

  const statKey = key && STAT_KEYS.has(key) ? (key as StatDetailKey) : undefined
  const def = statKey ? getStatDetail(statKey) : undefined

  const avoidedLabel =
    smokingType === 'cigarette' ? 'Cigarettes évitées' : 'Puffs évitées'

  const valueByKey: Record<StatDetailKey, string> = {
    money: `${formatMoney(moneySaved)} €`,
    avoided: String(cigarettesAvoided),
    days: String(dayCount),
    'combats-won': String(combatsWon),
    'combats-lost': String(combatsLost),
    relapses: String(relapseCount ?? 0),
  }

  const labelByKey: Record<StatDetailKey, string> = {
    money: 'Argent économisé',
    avoided: avoidedLabel,
    days: 'Jours sans vape',
    'combats-won': 'Combats gagnés',
    'combats-lost': 'Combats perdus',
    relapses: 'Rechutes',
  }

  if (!def || !statKey) {
    return (
      <FlipDetailScreen
        onClose={() => router.back()}
        autoFlip={false}
        front={<FlipDetailNotFound label="Stat introuvable." />}
        back={<FlipDetailNotFound label="Stat introuvable." />}
      />
    )
  }

  return (
    <FlipDetailScreen
      onClose={() => router.back()}
      front={
        <FlipDetailFront>
          <FlipDetailIconWell>
            <MaterialIcons name={def.icon} size={40} color={def.iconColor} />
          </FlipDetailIconWell>
          <FlipDetailEyebrow>{labelByKey[statKey]}</FlipDetailEyebrow>
          <FlipDetailHeroValue>{valueByKey[statKey]}</FlipDetailHeroValue>
          <FlipDetailTitle>{def.title}</FlipDetailTitle>
          <FlipDetailStatusChip
            unlocked
            unlockedLabel="Stat en direct"
            lockedLabel=""
          />
        </FlipDetailFront>
      }
      back={
        <>
          <FlipDetailBackHeader eyebrow={labelByKey[statKey]} title={def.backTitle} />
          <FlipDetailBackBody>{def.backBody}</FlipDetailBackBody>
          <FlipDetailInsightCard label="Valeur actuelle" accent={statKey === 'money' ? 'gold' : 'cta'}>
            <FlipDetailHighlightValue>{valueByKey[statKey]}</FlipDetailHighlightValue>
            <FlipDetailInsightText>
              Mis à jour en temps réel depuis ton profil et ton parcours sans vape.
            </FlipDetailInsightText>
          </FlipDetailInsightCard>
        </>
      }
    />
  )
}
