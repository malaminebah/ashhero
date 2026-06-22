import { Pressable, View } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import type { ComponentProps } from 'react'
import { FLOW } from '@/constants/flowTheme'
import { FlowText } from '@/components/ui/flow-text'
import type { CombatActionButtonParams, CombatActionVariant } from '../types'

const variantClass: Record<CombatActionVariant, string> = {
  breathe: 'border-flow-cta/35 bg-flow-secondary',
  water: 'border-sky-200 bg-sky-50',
  distract: 'border-flow-border bg-flow-bg',
  special: 'border-flow-gold/60 bg-flow-secondary',
}

const iconColor: Record<CombatActionVariant, string> = {
  breathe: FLOW.cta,
  water: '#0284C7',
  distract: FLOW.muted,
  special: FLOW.gold,
}

const iconName: Record<
  CombatActionVariant,
  ComponentProps<typeof MaterialCommunityIcons>['name']
> = {
  breathe: 'lungs',
  water: 'water',
  distract: 'gamepad-variant',
  special: 'flash',
}

export const ActionButton = ({
  label,
  onPress,
  disabled = false,
  variant,
  badge,
  lockHint,
  accessibilityLabel,
  compact = false,
}: CombatActionButtonParams) => (
  <Pressable
    onPress={onPress}
    disabled={disabled}
    accessibilityRole="button"
    accessibilityLabel={accessibilityLabel ?? label}
    accessibilityState={{ disabled }}
    className={`w-full flex-row items-center rounded-2xl border px-3 ${
      compact ? 'min-h-[48px] py-2.5' : 'min-h-[52px] py-3'
    } ${variantClass[variant]} ${disabled ? 'opacity-50' : 'active:opacity-85'}`}
  >
    <MaterialCommunityIcons
      name={iconName[variant]}
      size={compact ? 18 : 22}
      color={iconColor[variant]}
    />
    <FlowText
      className={`ml-2 flex-1 font-bold ${
        compact ? 'text-[11px]' : 'text-xs'
      } ${variant === 'special' && !disabled ? 'text-flow-gold' : 'text-flow-text'}`}
    >
      {label}
    </FlowText>
    {badge ? (
      <View className="flex-row items-center gap-1 rounded-full bg-flow-border px-2 py-1">
        <MaterialIcons name="schedule" size={12} color={FLOW.faint} />
        <FlowText className="text-[10px] text-flow-muted">{badge}</FlowText>
      </View>
    ) : null}
    {disabled && lockHint ? (
      <View className="flex-row items-center gap-1 rounded-full bg-flow-border px-2 py-1">
        <MaterialIcons name="lock" size={12} color={FLOW.faint} />
        <FlowText className="text-[9px] text-flow-faint">{lockHint}</FlowText>
      </View>
    ) : null}
  </Pressable>
)
