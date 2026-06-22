import { View } from 'react-native'

import type { OnboardingHeaderParams } from '../types'
import { OnboardingText } from './OnboardingText'

const TOTAL = 5

export const OnboardingHeader = ({ step, title, subtitle }: OnboardingHeaderParams) => (
  <View className="mb-8 items-center">
    <OnboardingText className="text-xs text-flow-faint">
      Étape {step} sur {TOTAL}
    </OnboardingText>
    <OnboardingText className="mt-3 text-center text-[22px] font-bold leading-8 text-flow-text">
      {title}
    </OnboardingText>
    {subtitle ? (
      <OnboardingText className="mt-3 text-center text-[15px] leading-6 text-flow-muted">
        {subtitle}
      </OnboardingText>
    ) : null}
  </View>
)
