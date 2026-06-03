import { View, Text, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { IconSymbol } from '@/components/ui/icon-symbol'

import type { DashboardHeaderParams } from '../../types'

export const DashboardHeader = ({ level }: DashboardHeaderParams) => {
  const router = useRouter()

  return (
    <View className="mb-6 flex-row items-center justify-between">
      <View className="flex-row items-center rounded-lg border border-brand-success/45 bg-brand-success/10 px-3 py-2">
        <Text className="font-mono text-[10px] font-bold text-brand-success">XP</Text>
        <Text className="ml-2 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
          Niveau {level}
        </Text>
      </View>
      <Pressable
        onPress={() => router.push('/settings' as never)}
        accessibilityRole="button"
        accessibilityLabel="Réglages"
        className="h-10 w-10 items-center justify-center rounded-full active:opacity-70"
      >
        <IconSymbol name="gearshape.fill" size={24} color="#f3e8ff" />
      </Pressable>
    </View>
  )
}
