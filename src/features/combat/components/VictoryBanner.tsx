import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { View } from 'react-native'
import { FLOW } from '@/constants/flowTheme'
import { FlowText } from '@/components/ui/flow-text'
import { OnboardingPrimaryButton } from '@/src/features/onboarding/components/OnboardingPrimaryButton'
import { OnboardingSecondaryButton } from '@/src/features/onboarding/components/OnboardingSecondaryButton'
import { CombatResultBackdrop } from './CombatResultBackdrop'
import type { VictoryBannerParams } from '../types'

const coinReward = (xp: number) => Math.max(10, Math.round(xp * 0.6))

export const VictoryBanner = ({ xpGained, level, onContinue }: VictoryBannerParams) => {
  const coins = coinReward(xpGained)

  return (
    <View className="flex-1 bg-flow-bg">
      <CombatResultBackdrop heroAnim="victory" showBoss bossMuted />

      <View className="flex-1 px-6 pb-8 pt-4">
        <View className="self-center rounded-full border border-flow-cta/30 bg-flow-secondary px-8 py-2">
          <FlowText className="text-sm font-bold text-flow-cta">Victoire !</FlowText>
        </View>

        <FlowText className="mt-5 text-center text-xs leading-5 text-flow-muted">
          L&apos;Envie recule…
        </FlowText>
        <FlowText className="mt-1 text-center text-base font-bold text-flow-text">
          Tu es plus fort !
        </FlowText>

        <View className="mt-7 w-full">
          <FlowText className="mb-3 text-center text-[10px] font-bold uppercase tracking-wider text-flow-cta">
            Récompenses
          </FlowText>
          <View className="rounded-2xl border border-flow-border bg-flow-secondary px-4 py-4">
            <View className="mb-3 flex-row items-center justify-between border-b border-flow-border pb-3">
              <FlowText className="text-[10px] uppercase tracking-wider text-flow-faint">
                Niveau
              </FlowText>
              <FlowText className="text-sm font-bold text-flow-text">{level}</FlowText>
            </View>
            <View className="mb-3 flex-row items-center">
              <View className="mr-3 h-9 w-9 items-center justify-center rounded-full bg-flow-cta/15">
                <FlowText className="text-[10px] font-bold text-flow-cta">XP</FlowText>
              </View>
              <FlowText className="text-sm font-bold text-flow-text">+{xpGained} XP</FlowText>
            </View>
            <View className="flex-row items-center">
              <View className="mr-3 h-9 w-9 items-center justify-center rounded-full bg-flow-gold/20">
                <MaterialIcons name="monetization-on" size={18} color={FLOW.gold} />
              </View>
              <FlowText className="text-sm font-bold text-flow-text">+{coins}</FlowText>
            </View>
          </View>
        </View>

        <View className="mt-auto pt-8">
          <OnboardingPrimaryButton label="Continuer" onPress={onContinue} />
        </View>
      </View>
    </View>
  )
}
