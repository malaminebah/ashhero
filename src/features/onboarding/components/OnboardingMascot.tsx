import { View } from 'react-native'
import { PlayerSoldierSprite } from '@/src/features/combat/components/PlayerSoldierSprite'
import type { PlayerSoldierAnim } from '@/src/features/combat/soldierSheet'

type OnboardingMascotParams = {
  anim?: PlayerSoldierAnim
  size?: 'sm' | 'md' | 'lg'
}

const SCALE = { sm: 0.55, md: 0.75, lg: 0.95 } as const

export const OnboardingMascot = ({ anim = 'idle', size = 'md' }: OnboardingMascotParams) => (
  <View className="items-center justify-center overflow-hidden rounded-3xl border border-white/8 bg-brand-success/5 px-4 py-3">
    <View style={{ transform: [{ scale: SCALE[size] }] }}>
      <PlayerSoldierSprite anim={anim} />
    </View>
  </View>
)
