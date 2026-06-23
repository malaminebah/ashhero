import { View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { FlipDetailScreen } from '@/components/ui/flip-detail-screen'
import { FlowText } from '@/components/ui/flow-text'
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
        front={
          <FlowText className="text-sm text-flow-muted">Stat introuvable.</FlowText>
        }
        back={<FlowText className="text-sm text-flow-muted">Stat introuvable.</FlowText>}
      />
    )
  }

  return (
    <FlipDetailScreen
      onClose={() => router.back()}
      front={
        <>
          <MaterialIcons name={def.icon} size={36} color={def.iconColor} />
          <FlowText className="mt-5 text-xs text-flow-muted">{labelByKey[statKey]}</FlowText>
          <FlowText className="mt-2 text-[36px] font-bold text-flow-text">
            {valueByKey[statKey]}
          </FlowText>
          <FlowText className="mt-4 text-center text-[18px] font-bold text-flow-text">
            {def.title}
          </FlowText>
        </>
      }
      back={
        <>
          <FlowText className="text-xs font-bold uppercase tracking-wide text-flow-cta">
            {labelByKey[statKey]}
          </FlowText>
          <FlowText className="mt-3 text-[20px] font-bold text-flow-text">{def.backTitle}</FlowText>
          <FlowText className="mt-4 text-[15px] leading-6 text-flow-muted">{def.backBody}</FlowText>
          <View className="mt-8 rounded-2xl border border-flow-border bg-flow-secondary px-4 py-4">
            <FlowText className="text-xs font-bold text-flow-text">Valeur actuelle</FlowText>
            <FlowText className="mt-2 text-2xl font-bold text-flow-cta">
              {valueByKey[statKey]}
            </FlowText>
          </View>
        </>
      }
    />
  )
}
