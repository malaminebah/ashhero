import { TextInput } from 'react-native'
import { FLOW, flowShadow } from '@/constants/flowTheme'
import { flowSurface } from '@/constants/flowSurfaces'

import { OnboardingText } from './OnboardingText'

type OnboardingInputParams = {
  label: string
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  keyboardType?: 'default' | 'decimal-pad' | 'email-address'
  secureTextEntry?: boolean
  autoCapitalize?: 'none' | 'sentences'
  autoComplete?: 'email' | 'password' | 'new-password' | 'off'
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
      className={`mb-5 min-h-[52px] font-flow text-lg text-flow-text ${flowSurface.input}`}
      style={flowShadow.card}
    />
  </>
)
