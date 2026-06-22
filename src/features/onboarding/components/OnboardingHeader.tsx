import { View, Text } from 'react-native'

const TOTAL = 6

import type { OnboardingHeaderParams } from '../types'

export const OnboardingHeader = ({ step, title, subtitle }: OnboardingHeaderParams) => (
  <View className="mb-8 items-center">
    <Text className="text-xs text-white/40">
      Étape {step} sur {TOTAL}
    </Text>
    <Text className="mt-3 text-center text-2xl font-bold leading-8 text-white">{title}</Text>
    {subtitle ? (
      <Text className="mt-3 text-center text-sm leading-6 text-white/55">{subtitle}</Text>
    ) : null}
  </View>
)
