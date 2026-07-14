import { Pressable, View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { FlowText } from '@/components/ui/flow-text'
import type { SettingsRowParams } from '../types'

export const SettingsRow = ({
  label,
  subtitle,
  icon,
  onPress,
  destructive = false,
  disabled = false,
  trailing,
  showChevron = true,
}: SettingsRowParams) => {
  const labelClass = destructive ? 'text-brand-red' : 'text-white'
  const iconColor = destructive ? '#ef4444' : '#8b7aa8'

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || !onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: disabled || !onPress }}
      className="min-h-[52px] flex-row items-center px-4 active:bg-[rgba(255,255,255,0.04)] disabled:opacity-40"
    >
      <MaterialIcons name={icon} size={21} color={iconColor} style={{ marginRight: 14 }} />

      <View className="min-w-0 flex-1 justify-center py-3">
        <FlowText className={`text-[15px] font-semibold ${labelClass}`}>{label}</FlowText>
        {subtitle ? (
          <FlowText className="mt-0.5 text-[13px] leading-[18px] text-brand-locked">
            {subtitle}
          </FlowText>
        ) : null}
      </View>

      {trailing ? (
        <View className="ml-2 rounded-full bg-brand-track px-2.5 py-1">
          <FlowText className="text-[11px] font-medium text-brand-muted">{trailing}</FlowText>
        </View>
      ) : null}

      {showChevron && onPress && !trailing ? (
        <MaterialIcons
          name="chevron-right"
          size={20}
          color="#8b7aa8"
          style={{ marginLeft: 4, opacity: 0.7 }}
        />
      ) : null}
    </Pressable>
  )
}
