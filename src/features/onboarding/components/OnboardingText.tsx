import { Text, type TextProps } from 'react-native'
import { flowFontFamily } from '@/constants/flowTheme'

export const OnboardingText = ({ style, ...props }: TextProps) => (
  <Text {...props} style={[flowFontFamily, style]} />
)
