import { View, ScrollView } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { FLOW } from '@/constants/flowTheme'
import { FlowText } from '@/components/ui/flow-text'
import { DASHBOARD_JALONS } from './jalonsConfig'

import type { DashboardJalonsGridParams } from '../../types'

export const DashboardJalonsGrid = ({ hoursSinceQuit }: DashboardJalonsGridParams) => {
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
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10, paddingRight: 4 }}
      >
        {DASHBOARD_JALONS.map((j) => {
          const active = hoursSinceQuit >= j.hours
          return (
            <View
              key={j.key}
              className={`w-[72px] items-center rounded-2xl border px-2 py-3 ${
                active
                  ? 'border-flow-cta/35 bg-flow-secondary'
                  : 'border-flow-border bg-flow-bg'
              }`}
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
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}
