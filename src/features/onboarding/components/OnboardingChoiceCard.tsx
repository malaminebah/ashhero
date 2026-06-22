import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Pressable, Text, View } from 'react-native'

import type { OnboardingChoiceCardParams } from '../types'

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
      className={`mb-3 w-full flex-row items-center gap-4 rounded-2xl border px-5 py-4 active:opacity-90 ${
        selected
          ? 'border-brand-success/50 bg-brand-success/10'
          : 'border-white/10 bg-white/[0.03]'
      }`}
    >
      {icon ? (
        <View
          className={`h-11 w-11 items-center justify-center rounded-xl ${
            selected ? 'bg-brand-success/15' : 'bg-white/[0.05]'
          }`}
        >
          <MaterialCommunityIcons
            name={icon}
            size={22}
            color={selected ? '#22c55e' : 'rgba(255,255,255,0.65)'}
          />
        </View>
      ) : null}
      <Text className={`flex-1 text-base ${selected ? 'text-white' : 'text-white/85'}`}>
        {label}
      </Text>
      <MaterialCommunityIcons name="chevron-right" size={20} color="rgba(255,255,255,0.25)" />
    </Pressable>
  )
}
