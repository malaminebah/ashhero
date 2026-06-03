import { Pressable, Text } from 'react-native'

import type { OnboardingPrimaryButtonParams } from '../types'

export const OnboardingPrimaryButton = ({ label, onPress }: OnboardingPrimaryButtonParams) => (
  <Pressable
    onPress={onPress}
    className="w-full items-center justify-center rounded-2xl bg-brand-accent py-4 active:opacity-90"
  >
    <Text className="font-mono text-xs uppercase tracking-[0.2rem] text-white">{label}</Text>
  </Pressable>
)
