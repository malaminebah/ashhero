import { View, ScrollView, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { FLOW } from '@/constants/flowTheme'
import { badgeSurface, flowCardShadow, flowSurface } from '@/constants/flowSurfaces'
import { FlowText } from '@/components/ui/flow-text'
import { DASHBOARD_JALONS } from './jalonsConfig'

import type { DashboardJalonsGridParams } from '../../types'

const JALON_ROW_H = 88

export const DashboardJalonsGrid = ({ hoursSinceQuit }: DashboardJalonsGridParams) => {
  const router = useRouter()
  const unlockedCount = DASHBOARD_JALONS.filter((j) => hoursSinceQuit >= j.hours).length

  return (
    <View className="mb-6">
      <View className="mb-3 flex-row items-center justify-between">
        <FlowText className="text-sm font-bold text-flow-text">Tes jalons</FlowText>
        <FlowText className="text-xs text-flow-faint">
          {unlockedCount} / {DASHBOARD_JALONS.length} débloqués
        </FlowText>
      </View>
      <ScrollView
        horizontal
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        style={{ height: JALON_ROW_H, flexGrow: 0 }}
        contentContainerStyle={{ gap: 10, paddingRight: 4, alignItems: 'stretch' }}
      >
        {DASHBOARD_JALONS.map((j) => {
          const active = hoursSinceQuit >= j.hours
          return (
            <Pressable
              key={j.key}
              onPress={() => router.push(`/jalon/${j.key}` as never)}
              accessibilityRole="button"
              accessibilityLabel={`Jalon ${j.label}`}
              className={`${flowSurface.jalon} ${badgeSurface(active)}`}
              style={[flowCardShadow, { height: JALON_ROW_H }]}
            >
              <FlowText
                className={`text-center text-[10px] font-bold ${
                  active ? 'text-flow-cta' : 'text-flow-faint'
                }`}
              >
                {j.label}
              </FlowText>
              <View className="mt-2 h-5 items-center justify-center">
                {active ? (
                  <MaterialIcons name="check-circle" size={18} color={FLOW.cta} />
                ) : (
                  <MaterialIcons name="lock" size={16} color={FLOW.faint} />
                )}
              </View>
            </Pressable>
          )
        })}
      </ScrollView>
    </View>
  )
}
