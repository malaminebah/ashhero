import { View } from 'react-native'
import { GameLabel } from '@/components/ui/game-label'
import type { SettingsSectionParams } from '../types'

export const SettingsSection = ({ title, children }: SettingsSectionParams) => (
  <View className="mb-6">
    <GameLabel className="mb-2 px-1">{title}</GameLabel>
    <View className="overflow-hidden rounded-[20px] border border-[rgba(255,255,255,0.07)] bg-brand-card">
      {children}
    </View>
  </View>
)
