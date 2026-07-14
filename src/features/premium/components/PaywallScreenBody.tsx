import { useState } from 'react'
import { Alert, Pressable, ScrollView, View } from 'react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { FlowText } from '@/components/ui/flow-text'
import { GameIcon } from '@/components/ui/game-icon'
import { GameLabel } from '@/components/ui/game-label'
import { ChunkyButton, CHUNKY_COLORS } from '@/components/ui/chunky-button'
import { PAYWALL_COPY, PREMIUM_FEATURES, PREMIUM_PLANS } from '../premiumConfig'
import { usePremiumStore } from '../store'
import type { PaywallScreenBodyParams, PremiumPlanId } from '../types'
import { PaywallFeatureRow } from './PaywallFeatureRow'
import { PaywallPlanCard } from './PaywallPlanCard'

export const PaywallScreenBody = (_params: PaywallScreenBodyParams) => {
  const router = useRouter()
  const isPremium = usePremiumStore((s) => s.isPremium)
  const activePlan = usePremiumStore((s) => s.plan)
  const activate = usePremiumStore((s) => s.activate)
  const [selectedPlan, setSelectedPlan] = useState<PremiumPlanId>(
    activePlan ?? 'annual'
  )
  const [loading, setLoading] = useState(false)

  const onClose = () => router.back()

  const onSubscribe = async () => {
    setLoading(true)
    try {
      // TODO: RevenueCat / StoreKit / Play Billing
      await new Promise((r) => setTimeout(r, 500))
      activate(selectedPlan)
      router.back()
    } catch {
      Alert.alert('Erreur', 'Impossible de finaliser l\'abonnement. Réessaie plus tard.')
    } finally {
      setLoading(false)
    }
  }

  const onRestore = async () => {
    setLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 400))
      Alert.alert(
        'Restauration',
        isPremium
          ? 'Ton abonnement AshHero Pro est déjà actif sur cet appareil.'
          : 'Aucun abonnement actif trouvé pour ce compte.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-brand-bg" edges={['top', 'left', 'right']}>
      <StatusBar style="light" />

      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ paddingBottom: 32, paddingTop: 8 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="rounded-[28px] border border-[rgba(251,191,36,0.35)] bg-brand-card px-5 py-7">
          <Pressable
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Fermer"
            hitSlop={8}
            className="absolute right-4 top-4 z-10 h-8 w-8 items-center justify-center active:opacity-70"
          >
            <MaterialIcons name="close" size={20} color="#8b7aa8" />
          </Pressable>

          <View className="items-center">
            <GameIcon name="crown" size={44} color="#fbbf24" />
            <FlowText className="mt-2.5 text-[22px] font-extrabold text-white">
              AshHero <FlowText className="text-[22px] font-extrabold text-brand-gold">Premium</FlowText>
            </FlowText>
            <FlowText className="mt-1.5 text-center text-[15px] leading-6 text-brand-muted">
              {PAYWALL_COPY.subtitle}
            </FlowText>
          </View>

          <View className="mt-6">
            {PREMIUM_FEATURES.map((feature) => (
              <PaywallFeatureRow key={feature.key} feature={feature} />
            ))}
          </View>

          {isPremium ? (
            <View className="mt-4 items-center rounded-2xl border border-brand-success bg-[rgba(34,197,94,0.08)] px-5 py-5">
              <MaterialIcons name="verified" size={28} color="#22c55e" />
              <FlowText className="mt-3 text-base font-bold text-white">
                {PAYWALL_COPY.ctaActive}
              </FlowText>
              <FlowText className="mt-1 text-sm text-brand-muted">
                {activePlan === 'annual' ? 'Formule annuelle' : 'Formule mensuelle'}
              </FlowText>
            </View>
          ) : (
            <>
              <View className="mt-4 flex-row gap-2.5">
                {PREMIUM_PLANS.map((plan) => (
                  <PaywallPlanCard
                    key={plan.id}
                    plan={plan}
                    selected={selectedPlan === plan.id}
                    onSelect={() => setSelectedPlan(plan.id)}
                  />
                ))}
              </View>

              <View className="mt-5">
                <ChunkyButton
                  label={loading ? 'Traitement…' : 'Débloquer Premium'}
                  palette={CHUNKY_COLORS.gold}
                  height={56}
                  fontSize={15}
                  onPress={() => void onSubscribe()}
                  disabled={loading}
                />
              </View>
            </>
          )}

          <Pressable
            onPress={() => void onRestore()}
            disabled={loading}
            accessibilityRole="button"
            className="mt-4 items-center active:opacity-70 disabled:opacity-40"
          >
            <GameLabel className="normal-case tracking-normal">
              Restaurer mes achats · Résiliable à tout moment
            </GameLabel>
          </Pressable>
        </View>

        {!isPremium ? (
          <Pressable
            onPress={onClose}
            accessibilityRole="button"
            className="mt-4 items-center py-2 active:opacity-70"
          >
            <FlowText className="text-sm text-brand-locked">{PAYWALL_COPY.continueFree}</FlowText>
          </Pressable>
        ) : null}

        <FlowText className="mt-4 text-center text-[11px] leading-[17px] text-brand-locked">
          {PAYWALL_COPY.legal}
        </FlowText>
      </ScrollView>
    </SafeAreaView>
  )
}
