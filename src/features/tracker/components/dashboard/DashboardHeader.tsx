import { View, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { FLOW } from '@/constants/flowTheme'
import { flowSurface } from '@/constants/flowSurfaces'
import { FlowText } from '@/components/ui/flow-text'

import type { DashboardHeaderParams } from '../../types'

export const DashboardHeader = ({ level }: DashboardHeaderParams) => {
  const router = useRouter()

  return (
    <View className="mb-6 flex-row items-center justify-between">
      <View className={`${flowSurface.chip} px-3 py-2`}>
        <FlowText className="text-xs font-bold text-flow-cta">Niv. {level}</FlowText>
      </View>
      <Pressable
        onPress={() => router.push('/settings' as never)}
        accessibilityRole="button"
        accessibilityLabel="Réglages"
        className="h-10 w-10 items-center justify-center rounded-full border border-flow-border bg-flow-secondary active:opacity-70"
      >
        <MaterialCommunityIcons name="cog-outline" size={22} color={FLOW.muted} />
      </Pressable>
    </View>
  )
}
