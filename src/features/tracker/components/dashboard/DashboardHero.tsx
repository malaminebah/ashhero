import { View } from 'react-native'
import { OnboardingMascot } from '@/src/features/onboarding/components/OnboardingMascot'
import { FlowText } from '@/components/ui/flow-text'
import { getCheerMessage } from '../../utils/cheerMessage'

import type { DashboardHeroParams } from '../../types'

export const DashboardHero = ({ dayCount }: DashboardHeroParams) => (
  <View className="mb-6 items-center">
    <OnboardingMascot anim="idle" size="lg" />
    <FlowText className="mt-6 text-5xl font-bold text-flow-text">{dayCount}</FlowText>
    <FlowText className="mt-1 text-sm text-flow-muted">Jours sans vape</FlowText>
    <FlowText className="mt-3 text-center text-[15px] text-flow-muted">
      {getCheerMessage(dayCount)}
    </FlowText>
  </View>
)
