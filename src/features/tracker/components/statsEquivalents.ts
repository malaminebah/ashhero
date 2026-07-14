import type { SmokingType } from '@/src/features/onboarding/types'
import {
  MINUTES_LIFE_PER_CIGARETTE_AVOIDED,
  MINUTES_LIFE_PER_VAPE_EQUIVALENT_AVOIDED,
} from '../utils/calculations'

export type StatTier = {
  threshold: number
  label: string
  equivalent: string
}

const CIGARETTE_AVOIDED_TIERS: StatTier[] = [
  { threshold: 20, label: '1 paquet', equivalent: 'Une boîte entière que tu n’as pas fumée.' },
  { threshold: 50, label: '2,5 paquets', equivalent: 'Plusieurs jours de clopes évités d’un coup.' },
  { threshold: 100, label: '5 paquets', equivalent: 'Environ une semaine de consommation pour un fumeur modéré.' },
  { threshold: 200, label: '10 paquets', equivalent: 'De quoi remplir une étagère — restée vide.' },
  { threshold: 500, label: '25 paquets', equivalent: 'Un mois entier de nicotine en moins dans tes poumons.' },
  { threshold: 1000, label: '50 paquets', equivalent: 'Un gros cartouche de clopes laissé sur le comptoir.' },
]

const VAPE_AVOIDED_TIERS: StatTier[] = [
  { threshold: 50, label: '50 pauses', equivalent: 'Des dizaines de bouffées que tu n’as pas prises.' },
  { threshold: 150, label: '150 pauses', equivalent: 'Plusieurs jours de vape évités au compteur.' },
  { threshold: 300, label: '300 pauses', equivalent: 'Une habitude quotidienne qui s’effrite.' },
  { threshold: 600, label: '600 pauses', equivalent: 'De quoi vider plusieurs pods sans y toucher.' },
  { threshold: 1200, label: '1200 pauses', equivalent: 'Un mois de bouffées en moins pour ton corps.' },
]

const MONEY_TIERS: StatTier[] = [
  { threshold: 10, label: 'Un café', equivalent: 'Un petit plaisir offert par ta volonté.' },
  { threshold: 25, label: 'Un livre', equivalent: 'De quoi t’offrir quelque chose de utile.' },
  { threshold: 50, label: 'Un resto', equivalent: 'Un bon repas au lieu d’une dépense vape.' },
  { threshold: 100, label: 'Une sortie', equivalent: 'Ciné, activity ou cadeau — tu choisis.' },
  { threshold: 200, label: 'Un week-end', equivalent: 'Budget escapade ou gros achat perso.' },
  { threshold: 500, label: 'Gros budget', equivalent: 'Une somme qui change vraiment ton mois.' },
]

export type TierProgress = {
  current: StatTier | null
  next: StatTier | null
  progressPct: number
  reached: StatTier[]
}

export function getAvoidedTiers(smokingType: SmokingType | null): StatTier[] {
  return smokingType === 'vape' ? VAPE_AVOIDED_TIERS : CIGARETTE_AVOIDED_TIERS
}

export function getMoneyTiers(): StatTier[] {
  return MONEY_TIERS
}

export function resolveTierProgress(value: number, tiers: StatTier[]): TierProgress {
  const reached = tiers.filter((t) => value >= t.threshold)
  const current = reached.at(-1) ?? null
  const next = tiers.find((t) => value < t.threshold) ?? null
  const floor = current?.threshold ?? 0
  const ceiling = next?.threshold ?? floor
  const progressPct =
    next == null ? 100 : Math.min(100, Math.max(0, ((value - floor) / (ceiling - floor)) * 100))

  return { current, next, progressPct, reached }
}

export function formatLifeRegained(minutes: number): string {
  if (minutes < 60) return `${Math.round(minutes)} min`
  const h = Math.floor(minutes / 60)
  const m = Math.round(minutes % 60)
  return m > 0 ? `${h} h ${m}` : `${h} h`
}

export function lifeRegainedFromAvoided(
  smokingType: SmokingType | null,
  avoidedCount: number
): number {
  const perUnit =
    smokingType === 'vape'
      ? MINUTES_LIFE_PER_VAPE_EQUIVALENT_AVOIDED
      : MINUTES_LIFE_PER_CIGARETTE_AVOIDED
  return avoidedCount * perUnit
}

export function formatMoney(value: number): string {
  return value.toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function perDayAverage(total: number, dayCount: number): number {
  if (dayCount <= 0) return 0
  return total / dayCount
}

export function avoidedPackEquivalent(
  smokingType: SmokingType | null,
  avoidedCount: number
): string {
  if (smokingType === 'vape') return `${avoidedCount} pauses évitées`
  const packs = avoidedCount / 20
  if (packs < 1) return `Moins d’un paquet (${avoidedCount} clopes)`
  const rounded = Math.round(packs * 10) / 10
  return `≈ ${rounded} paquet${rounded > 1 ? 's' : ''} (${avoidedCount} clopes)`
}
