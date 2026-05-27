import { View, Text } from 'react-native'

type Props = {
  step: 1 | 2
}

export const MoodFlowProgress = ({ step }: Props) => (
  <View className="mb-6 h-1 w-full overflow-hidden rounded-full bg-white/10">
    <View
      className="h-full bg-brand-success"
      style={{ width: step === 1 ? '50%' : '100%' }}
    />
  </View>
)
