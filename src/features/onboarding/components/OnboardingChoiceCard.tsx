import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Pressable, View } from 'react-native'
import { FLOW, flowShadow } from '@/constants/flowTheme'

import type { OnboardingChoiceCardParams } from '../types'
import { OnboardingText } from './OnboardingText'

export const OnboardingChoiceCard = ({
  icon,
  label,
  variant = 'outline',
  onPress,
}: OnboardingChoiceCardParams) => {
  const selected = variant === 'primary'

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={selected ? undefined : flowShadow.card}
      className={`mb-3 w-full flex-row items-center gap-4 rounded-2xl border px-5 py-4 active:opacity-90 ${
        selected
          ? 'border-flow-cta/35 bg-flow-secondary'
          : 'border-flow-border bg-flow-bg'
      }`}
    >
      {icon ? (
        <View
          className={`h-11 w-11 items-center justify-center rounded-xl ${
            selected ? 'bg-flow-secondary' : 'bg-flow-bg'
          }`}
        >
          <MaterialCommunityIcons
            name={icon}
            size={22}
            color={selected ? FLOW.cta : FLOW.muted}
          />
        </View>
      ) : null}
      <OnboardingText className="flex-1 text-base text-flow-text">{label}</OnboardingText>
      <MaterialCommunityIcons name="chevron-right" size={20} color={FLOW.faint} />
    </Pressable>
  )
}
