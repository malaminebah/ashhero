import { Pressable, Text } from 'react-native'

import type { OnboardingSecondaryButtonParams } from '../types'

export const OnboardingSecondaryButton = ({
  label,
  onPress,
  disabled,
}: OnboardingSecondaryButtonParams) => (
  <Pressable
    onPress={onPress}
    disabled={disabled}
    className="min-h-[48px] w-full items-center justify-center rounded-full border border-white/12 bg-white/[0.04] active:opacity-85 disabled:opacity-40"
  >
    <Text className="text-sm text-white/70">{label}</Text>
  </Pressable>
)
