import { Pressable, Text } from 'react-native'

type Props = {
  label: string
  onPress: () => void
  disabled?: boolean
}

export const ActionButton = ({ label, onPress, disabled }: Props) => (
  <Pressable
    onPress={onPress}
    disabled={disabled}
    className={`w-full py-3.5 mb-3 rounded-md border-2 border-brand-accent bg-brand-bg2 items-center justify-center ${
      disabled ? 'opacity-50' : 'active:opacity-90'
    }`}
  >
    <Text className="text-white text-xs font-mono tracking-[0.2rem] uppercase">
      {label}
    </Text>
  </Pressable>
)
