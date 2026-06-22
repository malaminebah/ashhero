import { Pressable, Text } from 'react-native'

import type { OnboardingPrimaryButtonParams } from '../types'

export const OnboardingPrimaryButton = ({
  label,
  onPress,
  disabled,
}: OnboardingPrimaryButtonParams) => (
  <Pressable
    onPress={onPress}
    disabled={disabled}
    className="min-h-[52px] w-full items-center justify-center rounded-full bg-brand-success active:opacity-90 disabled:opacity-45"
  >
    <Text className="text-base font-bold text-white">{label}</Text>
  </Pressable>
)
