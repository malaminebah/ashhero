import { View } from 'react-native'
import { FlowText } from '@/components/ui/flow-text'
import { OnboardingPrimaryButton } from '@/src/features/onboarding/components/OnboardingPrimaryButton'
import { OnboardingSecondaryButton } from '@/src/features/onboarding/components/OnboardingSecondaryButton'
import { CombatResultBackdrop } from './CombatResultBackdrop'
import type { DefeatBannerParams } from '../types'

export const DefeatBanner = ({ onRetry, onGoHome }: DefeatBannerParams) => (
  <View className="flex-1 bg-flow-bg">
    <CombatResultBackdrop heroAnim="death" showBoss bossAnim="attack" />

    <View className="flex-1 px-6 pb-8 pt-4">
      <View className="self-center rounded-full border border-red-200 bg-red-50 px-8 py-2">
        <FlowText className="text-sm font-bold text-red-500">Défaite</FlowText>
      </View>

      <FlowText className="mt-5 text-center text-xs leading-5 text-flow-muted">
        L&apos;envie a pris le dessus…
      </FlowText>
      <FlowText className="mt-1 text-center text-base font-bold text-flow-text">
        Ce n&apos;est pas un échec.
      </FlowText>

      <View className="mt-7 w-full rounded-2xl border border-flow-border bg-flow-secondary px-4 py-4">
        <FlowText className="text-center text-[10px] font-bold uppercase tracking-wider text-flow-faint">
          Tu peux toujours revenir
        </FlowText>
        <FlowText className="mt-2 text-center text-xs leading-5 text-flow-muted">
          Chaque combat te rend plus fort.
        </FlowText>
      </View>

      <View className="mt-auto gap-3 pt-8">
        <OnboardingPrimaryButton label="Réessayer" onPress={onRetry} />
        <OnboardingSecondaryButton label="Retour accueil" onPress={onGoHome} />
      </View>
    </View>
  </View>
)
