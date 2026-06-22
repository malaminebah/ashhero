import { Pressable } from 'react-native'
import { FlowText } from './flow-text'

type FlowBackButtonParams = {
  onPress: () => void
  label?: string
}

export const FlowBackButton = ({ onPress, label = 'Retour' }: FlowBackButtonParams) => (
  <Pressable
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel={label}
    className="mb-4 mt-2 self-start active:opacity-70"
  >
    <FlowText className="text-sm text-flow-muted">{label}</FlowText>
  </Pressable>
)
