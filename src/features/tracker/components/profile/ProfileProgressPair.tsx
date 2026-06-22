import { View } from 'react-native'
import { FlowText } from '@/components/ui/flow-text'

import type { ProfileProgressPairParams } from '../../types'

const XP_PER_SEGMENT = 100

export const ProfileProgressPair = ({ level, xp }: ProfileProgressPairParams) => {
  const inSegment = xp % XP_PER_SEGMENT
  const nextCap = Math.floor(xp / XP_PER_SEGMENT) * XP_PER_SEGMENT + XP_PER_SEGMENT
  const pct = Math.min(100, (inSegment / XP_PER_SEGMENT) * 100)

  return (
    <View className="mb-8 flex-row gap-3">
      <View className="min-h-[88px] flex-1 flex-row items-center rounded-2xl border border-flow-border bg-flow-secondary px-3 py-3">
        <FlowText className="text-sm font-bold text-flow-cta">Niveau {level}</FlowText>
      </View>

      <View className="min-h-[88px] flex-1 rounded-2xl border border-flow-border bg-flow-bg px-3 py-3">
        <FlowText className="text-xs font-bold text-flow-muted">
          XP {xp} / {nextCap}
        </FlowText>
        <View className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-flow-border">
          <View className="h-full rounded-full bg-flow-cta" style={{ width: `${pct}%` }} />
        </View>
      </View>
    </View>
  )
}
