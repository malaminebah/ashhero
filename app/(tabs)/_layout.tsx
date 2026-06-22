import { Tabs, useRouter } from 'expo-router'
import React, { useEffect } from 'react'

import { HapticTab } from '@/components/haptic-tab'
import { TabBarPixelIcon } from '@/components/ui/tab-bar-pixel-icon'
import { FLOW, flowFontFamily } from '@/constants/flowTheme'
import { useSessionStore } from '@/src/features/auth/sessionStore'
import { TAB_BAR_ICONS } from '@/src/features/navigation/tabBarIcons'

export default function TabLayout() {
  const router = useRouter()
  const hasServerProfile = useSessionStore((s) => s.hasServerProfile)

  useEffect(() => {
    if (hasServerProfile === true) return
    router.replace('/' as never)
  }, [hasServerProfile, router])

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: FLOW.cta,
        tabBarInactiveTintColor: FLOW.faint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: FLOW.bg,
          borderTopColor: FLOW.border,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: { fontFamily: flowFontFamily.sans, fontSize: 11 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ focused }) => (
            <TabBarPixelIcon source={TAB_BAR_ICONS.home} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="combat"
        options={{
          title: 'Combat',
          tabBarIcon: ({ focused }) => (
            <TabBarPixelIcon source={TAB_BAR_ICONS.combat} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ focused }) => (
            <TabBarPixelIcon source={TAB_BAR_ICONS.profile} focused={focused} />
          ),
        }}
      />
    </Tabs>
  )
}
