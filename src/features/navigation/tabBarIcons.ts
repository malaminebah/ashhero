export const TAB_BAR_ICONS = {
  home: require('@/assets/icons/tabs/home.png'),
  combat: require('@/assets/icons/tabs/combat.png'),
  profile: require('@/assets/icons/tabs/profile.png'),
} as const

export type TabBarIconKey = keyof typeof TAB_BAR_ICONS
