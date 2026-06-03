import type { ImageSourcePropType } from 'react-native'

export const PROFILE_BADGE_SOURCES = {
  b01: require('@/assets/icons/misc/r000_c05.png'),
  b02: require('@/assets/icons/misc/r001_c08.png'),
  b03: require('@/assets/icons/weapons/r117_c08.png'),
  b04: require('@/assets/icons/weapons/r117_c07.png'),
  b05: require('@/assets/icons/weapons/r116_c15.png'),
  b06: require('@/assets/icons/weapons/r100_c08.png'),
  b07: require('@/assets/icons/weapons/r117_c03.png'),
  b08: require('@/assets/icons/weapons/r117_c09.png'),
  b09: require('@/assets/icons/armor/r119_c03.png'),
  b10: require('@/assets/icons/armor/r120_c02.png'),
  b11: require('@/assets/icons/misc/r010_c12.png'),
  b12: require('@/assets/icons/misc/r002_c03.png'),
  b13: require('@/assets/icons/potions/r060_c01.png'),
  b14: require('@/assets/icons/misc/r000_c15.png'),
  b15: require('@/assets/icons/weapons/r096_c05.png'),
} as const

export type ProfileBadgeAssetKey = keyof typeof PROFILE_BADGE_SOURCES

export function profileBadgeSource(key: ProfileBadgeAssetKey): ImageSourcePropType {
  return PROFILE_BADGE_SOURCES[key]
}
