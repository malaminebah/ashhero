import { Pressable } from 'react-native'

import type { OnboardingSecondaryButtonParams } from '../types'
import { OnboardingText } from './OnboardingText'

export const OnboardingSecondaryButton = ({
  label,
  onPress,
  disabled,
}: OnboardingSecondaryButtonParams) => (
  <Pressable
    onPress={onPress}
    disabled={disabled}
    accessibilityRole="button"
    className="min-h-[52px] w-full items-center justify-center rounded-full bg-flow-secondary active:opacity-90 disabled:opacity-45"
  >
    <OnboardingText className="text-base font-bold text-flow-cta">{label}</OnboardingText>
  </Pressable>
)
