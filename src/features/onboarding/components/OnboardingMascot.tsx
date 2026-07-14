import { View } from 'react-native'
import { HeroSprite, type HeroPose } from '@/components/characters/HeroSprite'

type OnboardingMascotParams = {
  pose?: HeroPose
  size?: 'sm' | 'md' | 'lg'
}

const SIZES = {
  sm: { width: 82, height: 100 },
  md: { width: 115, height: 140 },
  lg: { width: 150, height: 182 },
} as const

export const OnboardingMascot = ({ pose = 'idle', size = 'md' }: OnboardingMascotParams) => {
  const dims = SIZES[size]
  return (
    <View className="items-center justify-center rounded-[28px] bg-flow-mascot p-5">
      <HeroSprite pose={pose} width={dims.width} height={dims.height} />
    </View>
  )
}
