import type { ImageSourcePropType } from 'react-native'
import { DEFENSE_BADGE_RULES, type DefenseBadgeRule } from './defenseBadgesConfig'

const SOURCES: Record<DefenseBadgeRule['asset'], ImageSourcePropType> = {
  week1: require('@/assets/icons/badges/defense-week1.png'),
  week2: require('@/assets/icons/badges/defense-week2.png'),
  week3: require('@/assets/icons/badges/defense-week3.png'),
}

export type DefenseBadgeView = DefenseBadgeRule & { source: ImageSourcePropType }

export const DEFENSE_BADGES: DefenseBadgeView[] = DEFENSE_BADGE_RULES.map((rule) => ({
  ...rule,
  source: SOURCES[rule.asset],
}))
