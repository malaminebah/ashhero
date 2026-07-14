import { Tabs, useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { FloatingTabButton } from '@/components/floating-tab-button'
import { GameIcon } from '@/components/ui/game-icon'
import { useSessionStore } from '@/src/features/auth/sessionStore'
import { floatingTabBarStyle } from '@/src/features/navigation/floatingTabBar'

const ACTIVE = '#22c55e'
const INACTIVE = '#8b7aa8'

export default function TabLayout() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const hasServerProfile = useSessionStore((s) => s.hasServerProfile)

  useEffect(() => {
    if (hasServerProfile === true) return
    router.replace('/' as never)
  }, [hasServerProfile, router])

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: ACTIVE,
        tabBarInactiveTintColor: INACTIVE,
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontSize: 10, fontWeight: '700', marginTop: 3 },
        tabBarButton: FloatingTabButton,
        tabBarStyle: floatingTabBarStyle(insets.bottom),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color }) => <GameIcon name="home" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="combat"
        options={{
          title: 'Combat',
          tabBarIcon: ({ color }) => <GameIcon name="swords" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => <GameIcon name="user" size={20} color={color} />,
        }}
      />
    </Tabs>
  )
}
