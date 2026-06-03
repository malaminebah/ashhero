import { Tabs, useRouter } from 'expo-router'
import React, { useEffect } from 'react'

import { HapticTab } from '@/components/haptic-tab'
import { TabBarPixelIcon } from '@/components/ui/tab-bar-pixel-icon'
import { Colors, THEME } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { useSessionStore } from '@/src/features/auth/sessionStore'
import { TAB_BAR_ICONS } from '@/src/features/navigation/tabBarIcons'

export default function TabLayout() {
  const colorScheme = useColorScheme()
  const router = useRouter()
  const hasServerProfile = useSessionStore((s) => s.hasServerProfile)

  useEffect(() => {
    if (hasServerProfile === true) return
    router.replace('/' as never)
  }, [hasServerProfile, router])

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: THEME.bg2,
          borderTopColor: THEME.border,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: { fontFamily: 'M5x7', fontSize: 10 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'ACCUEIL',
          tabBarIcon: ({ focused }) => (
            <TabBarPixelIcon source={TAB_BAR_ICONS.home} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="combat"
        options={{
          title: 'COMBAT',
          tabBarIcon: ({ focused }) => (
            <TabBarPixelIcon source={TAB_BAR_ICONS.combat} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'PROFIL',
          tabBarIcon: ({ focused }) => (
            <TabBarPixelIcon source={TAB_BAR_ICONS.profile} focused={focused} />
          ),
        }}
      />
    </Tabs>
  )
}
