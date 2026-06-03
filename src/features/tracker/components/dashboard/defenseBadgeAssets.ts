import type { ImageSourcePropType } from 'react-native'
import { DEFENSE_BADGE_RULES, type DefenseBadgeRule } from './defenseBadgesConfig'

const SOURCES: Record<DefenseBadgeRule['asset'], ImageSourcePropType> = {
  week1: require('@/assets/icons/weapons/r117_c08.png'),
  week2: require('@/assets/icons/weapons/r117_c07.png'),
  week3: require('@/assets/icons/weapons/r116_c15.png'),
}

export type DefenseBadgeView = DefenseBadgeRule & { source: ImageSourcePropType }

export const DEFENSE_BADGES: DefenseBadgeView[] = DEFENSE_BADGE_RULES.map((rule) => ({
  ...rule,
  source: SOURCES[rule.asset],
}))
