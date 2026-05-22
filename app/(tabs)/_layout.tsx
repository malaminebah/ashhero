import { Tabs, useRouter } from 'expo-router'
import React, { useEffect } from 'react'

import { HapticTab } from '@/components/haptic-tab'
import { IconSymbol } from '@/components/ui/icon-symbol'
import { Colors, THEME } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { useSessionStore } from '@/src/features/auth/sessionStore'

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
        tabBarLabelStyle: { fontFamily: 'monospace', fontSize: 10 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'HOME',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="combat"
        options={{
          title: 'COMBAT',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="shield.lefthalf.filled" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'PROFIL',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="person.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
