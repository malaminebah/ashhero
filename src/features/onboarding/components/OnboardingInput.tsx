import { Text, TextInput } from 'react-native'

type OnboardingInputParams = {
  label: string
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  keyboardType?: 'default' | 'decimal-pad' | 'email-address'
  secureTextEntry?: boolean
  autoCapitalize?: 'none' | 'sentences'
  autoComplete?: 'email' | 'password' | 'off'
}

export const OnboardingInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  secureTextEntry,
  autoCapitalize,
  autoComplete,
}: OnboardingInputParams) => (
  <>
    <Text className="mb-2 text-sm text-white/55">{label}</Text>
    <TextInput
      keyboardType={keyboardType}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="rgba(255,255,255,0.28)"
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
      autoComplete={autoComplete}
      className="mb-5 min-h-[52px] rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-lg text-white"
    />
  </>
)
