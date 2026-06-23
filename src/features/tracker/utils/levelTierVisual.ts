import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import type { ComponentProps } from 'react'

type TierIcon = ComponentProps<typeof MaterialCommunityIcons>['name']

const LEVEL_TIER_ICONS: { minLevel: number; icon: TierIcon }[] = [
  { minLevel: 10, icon: 'crown-outline' },
  { minLevel: 7, icon: 'sword-cross' },
  { minLevel: 4, icon: 'shield-outline' },
  { minLevel: 2, icon: 'arm-flex-outline' },
  { minLevel: 1, icon: 'robot-outline' },
]

export function getLevelTierIconName(level: number): TierIcon {
  for (const tier of LEVEL_TIER_ICONS) {
    if (level >= tier.minLevel) return tier.icon
  }
  return 'robot-outline'
}
