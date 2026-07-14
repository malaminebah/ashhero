import { View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { FlowText } from '@/components/ui/flow-text'
import type { PaywallFeatureRowParams } from '../types'

export const PaywallFeatureRow = ({ feature }: PaywallFeatureRowParams) => (
  <View className="mb-3 flex-row items-start gap-3">
    <View className="h-10 w-10 items-center justify-center rounded-2xl bg-brand-track">
      <MaterialIcons name="check" size={20} color="#22c55e" />
    </View>
    <View className="min-w-0 flex-1 pt-0.5">
      <FlowText className="text-[15px] font-bold text-white">{feature.title}</FlowText>
      <FlowText className="mt-0.5 text-[13px] leading-[18px] text-brand-muted">
        {feature.description}
      </FlowText>
    </View>
  </View>
)
