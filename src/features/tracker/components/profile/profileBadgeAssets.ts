import type { ImageSourcePropType } from 'react-native'

export const PROFILE_BADGE_SOURCES = {
  b01: require('@/assets/icons/badges/jour1.png'),
  b02: require('@/assets/icons/badges/jours3.png'),
  b03: require('@/assets/icons/badges/sem1.png'),
  b04: require('@/assets/icons/badges/sem2.png'),
  b05: require('@/assets/icons/badges/mois1.png'),
  b06: require('@/assets/icons/badges/combat1.png'),
  b07: require('@/assets/icons/badges/combat3.png'),
  b08: require('@/assets/icons/badges/combat10.png'),
  b09: require('@/assets/icons/badges/niv3.png'),
  b10: require('@/assets/icons/badges/niv5.png'),
  b11: require('@/assets/icons/badges/niv10.png'),
  b12: require('@/assets/icons/badges/xp500.png'),
  b13: require('@/assets/icons/badges/xp2000.png'),
  b14: require('@/assets/icons/badges/eco50.png'),
  b15: require('@/assets/icons/badges/eco200.png'),
} as const

export type ProfileBadgeAssetKey = keyof typeof PROFILE_BADGE_SOURCES

export function profileBadgeSource(key: ProfileBadgeAssetKey): ImageSourcePropType {
  return PROFILE_BADGE_SOURCES[key]
}
