import { Pressable, Text } from 'react-native'

type Variant = 'primary' | 'secondary' | 'special'

type Props = {
  label: string
  onPress: () => void
  disabled?: boolean
  variant?: Variant
  hint?: string
  accessibilityLabel?: string
}

const variantClass: Record<Variant, string> = {
  primary: 'border-2 border-brand-accent bg-brand-bg2',
  secondary: 'border-2 border-brand-border bg-brand-bg2',
  special: 'border-2 border-brand-gold bg-brand-bg2',
}

export const ActionButton = ({
  label,
  onPress,
  disabled = false,
  variant = 'secondary',
  hint,
  accessibilityLabel,
}: Props) => (
  <Pressable
    onPress={onPress}
    disabled={disabled}
    accessibilityRole="button"
    accessibilityLabel={accessibilityLabel ?? label}
    accessibilityState={{ disabled }}
    android_ripple={{ color: 'rgba(168, 85, 247, 0.12)' }}
    className={`min-h-[48px] w-full items-center justify-center rounded-md px-4 py-3 ${
      variantClass[variant]
    } ${disabled ? 'opacity-50' : ''}`}
    style={({ pressed }) =>
      pressed && !disabled ? { opacity: 0.88, transform: [{ scale: 0.99 }] } : undefined
    }
  >
    <Text
      className={`font-mono text-xs uppercase tracking-[0.15rem] ${
        variant === 'special' && !disabled ? 'text-brand-gold' : 'text-white/90'
      }`}
    >
      {label}
    </Text>
    {hint ? (
      <Text className="mt-1 font-mono text-[10px] text-white/55">{hint}</Text>
    ) : null}
  </Pressable>
)
