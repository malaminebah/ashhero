import { View } from 'react-native'
import { Image } from 'expo-image'
import { useLocalSearchParams, useRouter } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { FlipDetailScreen } from '@/components/ui/flip-detail-screen'
import { FlowText } from '@/components/ui/flow-text'
import { FLOW } from '@/constants/flowTheme'
import { DEFENSE_BADGES } from '@/src/features/tracker/components/dashboard/defenseBadgeAssets'
import {
  getDefenseBadgeByKey,
  isDefenseBadgeUnlocked,
} from '@/src/features/tracker/components/dashboard/defenseBadgesConfig'
import { useStats } from '@/src/features/tracker/hooks/useStats'

const ICON_SIZE = 88

export default function DefenseBadgeDetailScreen() {
  const router = useRouter()
  const { key } = useLocalSearchParams<{ key: string }>()
  const { dayCount } = useStats()
  const rule = key ? getDefenseBadgeByKey(key) : undefined
  const badge = rule ? DEFENSE_BADGES.find((b) => b.key === rule.key) : undefined

  if (!rule || !badge) {
    return (
      <FlipDetailScreen
        onClose={() => router.back()}
        autoFlip={false}
        front={
          <FlowText className="text-sm text-flow-muted">Badge introuvable.</FlowText>
        }
        back={<FlowText className="text-sm text-flow-muted">Badge introuvable.</FlowText>}
      />
    )
  }

  const unlocked = isDefenseBadgeUnlocked(rule.minDays, dayCount)
  const daysLeft = Math.max(0, rule.minDays - dayCount)

  return (
    <FlipDetailScreen
      onClose={() => router.back()}
      front={
        <>
          <View className="relative mb-5 h-24 w-24 items-center justify-center rounded-2xl border border-flow-border bg-flow-bg">
            <Image
              source={badge.source}
              style={{
                width: ICON_SIZE,
                height: ICON_SIZE,
                opacity: unlocked ? 1 : 0.35,
              }}
              contentFit="contain"
            />
            {!unlocked ? (
              <View className="absolute inset-0 items-center justify-center">
                <MaterialIcons name="lock" size={28} color={FLOW.faint} />
              </View>
            ) : null}
          </View>
          <FlowText className="text-xs font-bold text-flow-cta">{rule.label}</FlowText>
          <FlowText className="mt-3 text-center text-[22px] font-bold text-flow-text">
            {rule.title}
          </FlowText>
          <View className="mt-4 items-center rounded-2xl border border-flow-cta/25 bg-flow-bg px-5 py-2">
            <FlowText className="text-xl font-bold text-flow-cta">
              +{rule.healthBonusPercent} %
            </FlowText>
            <FlowText className="text-[10px] text-flow-muted">Bonus santé</FlowText>
          </View>
          <FlowText className="mt-4 text-center text-xs text-flow-faint">
            {unlocked
              ? 'Badge débloqué'
              : `Encore ${daysLeft} jour${daysLeft > 1 ? 's' : ''}`}
          </FlowText>
        </>
      }
      back={
        <>
          <FlowText className="text-xs font-bold uppercase tracking-wide text-flow-cta">
            {rule.label} · +{rule.healthBonusPercent} %
          </FlowText>
          <FlowText className="mt-3 text-[20px] font-bold text-flow-text">{rule.title}</FlowText>
          <FlowText className="mt-4 text-[15px] leading-6 text-flow-text">{rule.summary}</FlowText>
          <View className="mt-8 rounded-2xl border border-flow-border bg-flow-secondary px-4 py-4">
            <FlowText className="text-xs font-bold uppercase tracking-wide text-flow-cta">
              Effet en combat
            </FlowText>
            <FlowText className="mt-3 text-[15px] leading-6 text-flow-muted">
              {rule.health}
            </FlowText>
          </View>
        </>
      }
    />
  )
}
