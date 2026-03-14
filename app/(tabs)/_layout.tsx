import { Tabs } from 'expo-router'
import React, { useState } from 'react'

import { HapticTab } from '@/components/haptic-tab'
import { IconSymbol } from '@/components/ui/icon-symbol'
import { Colors, THEME } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { View } from 'react-native'

export default function TabLayout() {
  const colorScheme = useColorScheme()
 
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
          title: 'Camp',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
       <Tabs.Screen
        name="Combat"
        options={{
          title: 'Combat',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="capsule.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Hero"
        options={{
          title: 'Hero',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="iphone.gen1.landscape" color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
