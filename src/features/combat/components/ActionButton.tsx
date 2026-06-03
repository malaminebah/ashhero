import { Pressable, Text, View } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import type { ComponentProps } from 'react'
import type { CombatActionButtonParams, CombatActionVariant } from '../types'

const variantClass: Record<CombatActionVariant, string> = {
  breathe: 'border-brand-success/45 bg-brand-success/10',
  water: 'border-sky-500/40 bg-sky-950/40',
  distract: 'border-white/15 bg-white/[0.04]',
  special: 'border-brand-gold/45 bg-brand-gold/10',
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
    className={`w-full flex-row items-center rounded-lg border px-3 ${
      compact ? 'min-h-[48px] py-2.5' : 'min-h-[52px] rounded-xl px-4 py-3'
    } ${variantClass[variant]} ${disabled ? 'opacity-50' : 'active:opacity-85'}`}
  >
    <MaterialCommunityIcons
      name={iconName[variant]}
      size={compact ? 18 : 22}
      color={variant === 'special' ? '#fbbf24' : '#ecfdf5'}
    />
    <Text
      className={`ml-2 flex-1 font-mono font-bold uppercase tracking-wide ${
        compact ? 'text-[10px]' : 'text-xs'
      } ${
        variant === 'special' && !disabled ? 'text-brand-gold' : 'text-white/90'
      }`}
    >
      {label}
    </Text>
    {badge ? (
      <View className="flex-row items-center gap-1 rounded-md bg-black/30 px-2 py-1">
        <MaterialIcons name="schedule" size={12} color="rgba(255,255,255,0.55)" />
        <Text className="font-mono text-[10px] text-white/60">{badge}</Text>
      </View>
    ) : null}
    {disabled && lockHint ? (
      <View className="flex-row items-center gap-1 rounded-md bg-black/30 px-2 py-1">
        <MaterialIcons name="lock" size={12} color="rgba(255,255,255,0.45)" />
        <Text className="font-mono text-[9px] text-white/50">{lockHint}</Text>
      </View>
    ) : null}
  </Pressable>
)
