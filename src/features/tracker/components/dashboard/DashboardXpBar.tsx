import { View } from 'react-native'
import { FlowText } from '@/components/ui/flow-text'

import type { DashboardXpBarParams } from '../../types'

const XP_PER_SEGMENT = 100

export const DashboardXpBar = ({ totalXp }: DashboardXpBarParams) => {
  const inSegment = totalXp % XP_PER_SEGMENT
  const nextCap = Math.floor(totalXp / XP_PER_SEGMENT) * XP_PER_SEGMENT + XP_PER_SEGMENT
  const pct = Math.min(100, (inSegment / XP_PER_SEGMENT) * 100)

  return (
    <View className="mb-8 w-full">
      <View className="mb-2 flex-row items-center justify-between">
        <FlowText className="text-xs font-bold text-flow-muted">XP</FlowText>
        <FlowText className="text-xs text-flow-text">
          {totalXp} / {nextCap}
        </FlowText>
      </View>
      <View className="h-3 w-full overflow-hidden rounded-full bg-flow-border">
        <View className="h-full rounded-full bg-flow-cta" style={{ width: `${pct}%` }} />
      </View>
    </View>
  )
}
