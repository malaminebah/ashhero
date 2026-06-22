import { TextInput } from 'react-native'
import { FLOW } from '@/constants/flowTheme'

import { OnboardingText } from './OnboardingText'

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
    <OnboardingText className="mb-2 text-sm text-flow-muted">{label}</OnboardingText>
    <TextInput
      keyboardType={keyboardType}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={FLOW.faint}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
      autoComplete={autoComplete}
      className="mb-5 min-h-[52px] rounded-2xl border border-flow-border bg-flow-bg px-4 font-flow text-lg text-flow-text"
    />
  </>
)
