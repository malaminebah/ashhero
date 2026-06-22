import { Text, type TextProps, type TextStyle } from 'react-native'
import { flowFontFamily } from '@/constants/flowTheme'

type FlowTextParams = TextProps & { className?: string }

const flowTextStyle: TextStyle = { fontFamily: flowFontFamily.sans }

export const FlowText = ({ className, style, ...props }: FlowTextParams) => (
  <Text
    {...props}
    className={`font-flow ${className ?? ''}`.trim()}
    style={[flowTextStyle, style]}
  />
)
