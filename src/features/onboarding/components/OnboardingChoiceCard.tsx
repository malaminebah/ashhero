import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Pressable, View } from 'react-native'
import { FLOW, flowShadow } from '@/constants/flowTheme'
import { flowActiveShadow, flowSurface } from '@/constants/flowSurfaces'

import type { OnboardingChoiceCardParams } from '../types'
import { OnboardingText } from './OnboardingText'

export const OnboardingChoiceCard = ({
  icon,
  label,
  variant = 'outline',
  selected,
  onPress,
}: OnboardingChoiceCardParams) => {
  const isOn = selected ?? variant === 'primary'
  const isToggle = selected !== undefined

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={isToggle ? { selected: isOn } : undefined}
      style={isOn ? flowActiveShadow : flowShadow.card}
      className={`mb-3 w-full flex-row items-center gap-4 px-5 py-4 active:opacity-90 ${
        isOn ? flowSurface.cardActive : flowSurface.card
      }`}
    >
      {icon ? (
        <View className={`h-11 w-11 ${flowSurface.iconWell} ${isOn ? '' : 'bg-flow-bg'}`}>
          <MaterialCommunityIcons
            name={icon}
            size={22}
            color={isOn ? FLOW.cta : FLOW.muted}
          />
        </View>
      ) : null}
      <OnboardingText className="flex-1 text-base font-bold text-flow-text">{label}</OnboardingText>
      {isToggle ? (
        <MaterialCommunityIcons
          name={isOn ? 'check-circle' : 'circle-outline'}
          size={22}
          color={isOn ? FLOW.cta : FLOW.border}
        />
      ) : (
        <MaterialCommunityIcons name="chevron-right" size={20} color={FLOW.faint} />
      )}
    </Pressable>
  )
}
