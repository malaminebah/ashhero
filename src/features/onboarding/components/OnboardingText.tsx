import { Text, type TextProps } from 'react-native'

type OnboardingTextParams = TextProps & { className?: string }

export const OnboardingText = ({ className, style, ...props }: OnboardingTextParams) => (
  <Text {...props} className={`font-flow ${className ?? ''}`.trim()} style={style} />
)
