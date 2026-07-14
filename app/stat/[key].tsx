import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { FlipDetailScreen } from '@/components/ui/flip-detail-screen'
import {
  FlipDetailBackBody,
  FlipDetailBackHeader,
  FlipDetailEyebrow,
  FlipDetailFront,
  FlipDetailHeroValue,
  FlipDetailNotFound,
  FlipDetailStatusChip,
  FlipDetailSubtitle,
  FlipDetailTitle,
  FlipDetailIconWell,
} from '@/components/ui/flip-detail-parts'
import { StatFlipDashboard } from '@/src/features/tracker/components/StatFlipDashboard'
import {
  avoidedPackEquivalent,
  formatLifeRegained,
  formatMoney,
  getAvoidedTiers,
  getMoneyTiers,
  lifeRegainedFromAvoided,
  perDayAverage,
  resolveTierProgress,
} from '@/src/features/tracker/components/statsEquivalents'
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

  const avoidedTiers = resolveTierProgress(cigarettesAvoided, getAvoidedTiers(smokingType))
  const moneyTiers = resolveTierProgress(Math.floor(moneySaved), getMoneyTiers())
  const lifeMinutes = lifeRegainedFromAvoided(smokingType, cigarettesAvoided)

  const frontSubtitle =
    statKey === 'avoided'
      ? avoidedPackEquivalent(smokingType, cigarettesAvoided)
      : statKey === 'money'
        ? moneyTiers.current
          ? `Palier : ${moneyTiers.current.label}`
          : 'Premier palier en approche'
        : null

  const richBack =
    statKey === 'avoided' ? (
      <>
        <FlipDetailBackHeader eyebrow={avoidedLabel} title="À quoi ça correspond ?" />
        <FlipDetailBackBody>
          Chaque unité évitée, c’est de la nicotine en moins. Voici comment ton chiffre se traduit
          en paquets, en temps de vie regagné et en paliers débloqués.
        </FlipDetailBackBody>
        <StatFlipDashboard
          valueLabel={avoidedLabel}
          valueDisplay={String(cigarettesAvoided)}
          tierProgress={avoidedTiers}
          metrics={[
            { label: 'Équivalent', value: avoidedPackEquivalent(smokingType, cigarettesAvoided) },
            { label: 'Vie regagnée', value: formatLifeRegained(lifeMinutes) },
            {
              label: 'Moyenne / jour',
              value:
                dayCount > 0
                  ? `${Math.round(perDayAverage(cigarettesAvoided, dayCount))} / j`
                  : '—',
            },
            { label: 'Jours sans vape', value: String(dayCount) },
          ]}
        />
      </>
    ) : statKey === 'money' ? (
      <>
        <FlipDetailBackHeader eyebrow="Argent économisé" title="Ta cagnotte en vrai" />
        <FlipDetailBackBody>
          L’argent non dépensé en vape, c’est un budget que tu récupères. Suis ton évolution et vois
          à quoi correspond chaque palier — café, resto, sortie…
        </FlipDetailBackBody>
        <StatFlipDashboard
          valueLabel="Total économisé"
          valueDisplay={`${formatMoney(moneySaved)} €`}
          tierProgress={moneyTiers}
          metrics={[
            {
              label: 'Moyenne / jour',
              value:
                dayCount > 0
                  ? `${formatMoney(perDayAverage(moneySaved, dayCount))} €`
                  : '—',
            },
            { label: 'Jours sans vape', value: String(dayCount) },
            {
              label: 'Produits évités',
              value: String(cigarettesAvoided),
            },
            {
              label: 'Palier actuel',
              value: moneyTiers.current?.label ?? 'En route',
            },
          ]}
        />
      </>
    ) : null

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
          {frontSubtitle ? <FlipDetailSubtitle>{frontSubtitle}</FlipDetailSubtitle> : null}
          <FlipDetailStatusChip
            unlocked
            unlockedLabel="Stat en direct"
            lockedLabel=""
          />
        </FlipDetailFront>
      }
      back={
        richBack ?? (
          <>
            <FlipDetailBackHeader eyebrow={labelByKey[statKey]} title={def.backTitle} />
            <FlipDetailBackBody>{def.backBody}</FlipDetailBackBody>
          </>
        )
      }
    />
  )
}
