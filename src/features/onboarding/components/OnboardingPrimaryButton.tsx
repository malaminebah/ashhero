import { Pressable } from 'react-native'

import type { OnboardingPrimaryButtonParams } from '../types'
import { OnboardingText } from './OnboardingText'

export const OnboardingPrimaryButton = ({
  label,
  onPress,
  disabled,
  loading,
}: OnboardingPrimaryButtonParams) => (
  <Pressable
    onPress={onPress}
    disabled={disabled || loading}
    accessibilityRole="button"
    className={`min-h-[52px] w-full items-center justify-center rounded-full active:opacity-90 disabled:opacity-45 ${
      loading ? 'bg-flow-cta-loading' : 'bg-flow-cta'
    }`}
  >
    <OnboardingText className="text-base font-bold text-white">{label}</OnboardingText>
  </Pressable>
)
