import { View } from 'react-native'
import { FlowText } from '@/components/ui/flow-text'
import { OnboardingPrimaryButton } from '@/src/features/onboarding/components/OnboardingPrimaryButton'
import { ARENA_SPRITE_LAYOUT } from '../arenaAssets'
import type { CombatArenaScreenParams } from '../types'
import { ArenaBackgroundPanel } from './ArenaBackgroundPanel'
import { BossSprite } from './BossSprite'
import { PlayerSoldierSprite } from './PlayerSoldierSprite'

export const CombatArenaScreen = ({ onLaunchCombat }: CombatArenaScreenParams) => (
  <View className="flex-1 bg-flow-bg">
    <ArenaBackgroundPanel variant="banner" tone="flow" className="rounded-b-3xl border-b border-flow-border">
      <View style={{ position: 'absolute', zIndex: 10, ...ARENA_SPRITE_LAYOUT.player }}>
        <PlayerSoldierSprite anim="idle" />
      </View>

      <View style={{ position: 'absolute', zIndex: 10, ...ARENA_SPRITE_LAYOUT.boss }}>
        <BossSprite anim="idle" />
      </View>
    </ArenaBackgroundPanel>

    <View className="flex-1 items-center px-6 pt-8">
      <FlowText className="text-[22px] font-bold text-flow-text">Arène</FlowText>
      <FlowText className="mt-3 max-w-[300px] text-center text-[15px] leading-6 text-flow-muted">
        Affronte l&apos;envie, gagne de l&apos;XP et deviens plus fort chaque jour.
      </FlowText>

      <View className="mt-auto mb-10 w-full">
        <OnboardingPrimaryButton label="Lancer un combat" onPress={onLaunchCombat} />
      </View>
    </View>
  </View>
)
