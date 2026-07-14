import { View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

export type XpBarParams = {
  /** 0..1 */
  progress: number
}

export const XpBar = ({ progress }: XpBarParams) => (
  <View
    className="h-[9px] overflow-hidden rounded-[5px] border border-[rgba(255,255,255,0.15)] bg-brand-track"
    accessibilityRole="progressbar"
  >
    <LinearGradient
      colors={['#f59e0b', '#fbbf24']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{
        width: `${Math.min(100, Math.max(0, progress * 100))}%`,
        height: '100%',
        borderRadius: 5,
      }}
    />
  </View>
)
