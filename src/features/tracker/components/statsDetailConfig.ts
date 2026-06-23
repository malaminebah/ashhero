import { FLOW } from '@/constants/flowTheme'

export type StatDetailKey =
  | 'money'
  | 'avoided'
  | 'days'
  | 'combats-won'
  | 'combats-lost'
  | 'relapses'

export type StatDetailDef = {
  key: StatDetailKey
  icon: 'savings' | 'cloud' | 'calendar-today' | 'emoji-events' | 'heart-broken' | 'replay'
  iconColor: string
  label: string
  title: string
  backTitle: string
  backBody: string
}

export const STAT_DETAILS: Record<StatDetailKey, StatDetailDef> = {
  money: {
    key: 'money',
    icon: 'savings',
    iconColor: FLOW.gold,
    label: 'Argent économisé',
    title: 'Ta cagnotte santé',
    backTitle: 'Pourquoi ça compte',
    backBody:
      'Chaque euro non dépensé en vape, c’est un budget libéré pour toi. Visualiser l’argent économisé rend ta progression concrète et motivante.',
  },
  avoided: {
    key: 'avoided',
    icon: 'cloud',
    iconColor: FLOW.brand,
    label: 'Produits évités',
    title: 'Moins de nicotine',
    backTitle: 'Impact sur ton corps',
    backBody:
      'Chaque cigarette ou puff évitée, c’est moins de substances inhalées dans tes poumons. C’est la mesure directe de ce que tu ne mets plus dans ton corps.',
  },
  days: {
    key: 'days',
    icon: 'calendar-today',
    iconColor: FLOW.cta,
    label: 'Jours sans vape',
    title: 'Ta série',
    backTitle: 'Chaque jour compte',
    backBody:
      'Les bienfaits santé s’accumulent jour après jour : circulation, poumons, énergie. Ta série mesure le temps où ton corps peut se réparer.',
  },
  'combats-won': {
    key: 'combats-won',
    icon: 'emoji-events',
    iconColor: FLOW.cta,
    label: 'Combats gagnés',
    title: 'Victoires',
    backTitle: 'Résister, c’est gagner',
    backBody:
      'Chaque combat gagné, c’est une envie repoussée. Tu entraînes ta volonté comme un muscle — plus tu gagnes, plus tu sais tenir.',
  },
  'combats-lost': {
    key: 'combats-lost',
    icon: 'heart-broken',
    iconColor: FLOW.muted,
    label: 'Combats perdus',
    title: 'Repli tactique',
    backTitle: 'Pas une condamnation',
    backBody:
      'Perdre un combat, ce n’est pas tout effacer. Analyse ce qui t’a fait craquer et reviens — la rechute fait partie du parcours pour beaucoup.',
  },
  relapses: {
    key: 'relapses',
    icon: 'replay',
    iconColor: FLOW.muted,
    label: 'Rechutes',
    title: 'Repartir',
    backTitle: 'Recommencer compte',
    backBody:
      'Une rechute ne définit pas ton parcours. Ce compteur t’aide à être honnête avec toi-même et à relancer ta date d’arrêt sans culpabilité paralysante.',
  },
}

export const getStatDetail = (key: string): StatDetailDef | undefined =>
  STAT_DETAILS[key as StatDetailKey]
