import { Pressable, View } from 'react-native'
import { FlowText } from '@/components/ui/flow-text'
import type { PaywallPlanCardParams } from '../types'

export const PaywallPlanCard = ({ plan, selected, onSelect }: PaywallPlanCardParams) => (
  <Pressable
    onPress={onSelect}
    accessibilityRole="radio"
    accessibilityState={{ selected }}
    accessibilityLabel={`${plan.label}, ${plan.priceLabel}${plan.periodLabel}`}
    className={`flex-1 rounded-2xl border px-4 py-4 active:opacity-90 ${
      selected
        ? 'border-2 border-brand-gold bg-[rgba(251,191,36,0.08)]'
        : 'border-[rgba(255,255,255,0.15)] bg-brand-card'
    }`}
  >
    {plan.badge ? (
      <View className="absolute -top-2.5 self-center rounded-full bg-brand-gold px-2 py-0.5">
        <FlowText className="text-[9px] font-black" style={{ color: '#3b2000' }}>
          {plan.badge}
        </FlowText>
      </View>
    ) : null}
    <FlowText className="text-sm font-bold text-white">{plan.label}</FlowText>
    <View className="mt-2 flex-row items-baseline">
      <FlowText className="text-[22px] font-extrabold text-white">{plan.priceLabel}</FlowText>
      <FlowText className="ml-1 text-xs text-brand-muted">{plan.periodLabel}</FlowText>
    </View>
  </Pressable>
)
