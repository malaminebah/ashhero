import { Image } from 'expo-image'
import { View } from 'react-native'
import { FlowText } from '@/components/ui/flow-text'
import { OnboardingPrimaryButton } from '@/src/features/onboarding/components/OnboardingPrimaryButton'
import type { CombatArenaScreenParams } from '../types'

const arenaSwordHero = require('@/assets/icons/weapons/r117_c08.png')

export const CombatArenaScreen = ({ onLaunchCombat }: CombatArenaScreenParams) => (
  <View className="flex-1 bg-flow-bg">
    <View className="h-[42%] min-h-[240px] max-h-[360px] w-full overflow-hidden" />

    <View className="flex-1 items-center px-6 pt-2">
      <View className="mb-4 h-20 w-20 items-center justify-center rounded-[28px] bg-flow-mascot">
        <Image source={arenaSwordHero} style={{ width: 48, height: 48 }} contentFit="contain" />
      </View>
      <FlowText className="text-2xl font-bold text-flow-text">Arène</FlowText>
      <FlowText className="mt-4 max-w-[300px] text-center text-[15px] leading-6 text-flow-muted">
        Affronte l&apos;envie, gagne de l&apos;XP et deviens plus fort chaque jour.
      </FlowText>

      <View className="mt-auto mb-10 w-full">
        <OnboardingPrimaryButton label="Lancer un combat" onPress={onLaunchCombat} />
      </View>
    </View>
  </View>
)
