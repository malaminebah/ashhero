import { View } from 'react-native'

import type { MoodFlowProgressParams } from '../types'

export const MoodFlowProgress = ({ step }: MoodFlowProgressParams) => (
  <View className="mb-6 h-1 w-full overflow-hidden rounded-full bg-brand-track">
    <View className="h-full bg-brand-success" style={{ width: step === 1 ? '50%' : '100%' }} />
  </View>
)
