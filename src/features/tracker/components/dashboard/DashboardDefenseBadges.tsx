import { Image } from 'expo-image'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { View, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { FLOW } from '@/constants/flowTheme'
import { badgeSurface, flowCardShadow, flowSurface } from '@/constants/flowSurfaces'
import { FlowText } from '@/components/ui/flow-text'
import { DEFENSE_BADGES } from './defenseBadgeAssets'
import { isDefenseBadgeUnlocked } from './defenseBadgesConfig'
import type { DashboardDefenseBadgesParams } from '../../types'

const ICON_SIZE = 48

export const DashboardDefenseBadges = ({ dayCount }: DashboardDefenseBadgesParams) => {
  const router = useRouter()
  const unlockedCount = DEFENSE_BADGES.filter((b) =>
    isDefenseBadgeUnlocked(b.minDays, dayCount)
  ).length

  return (
    <View className="mb-6">
      <View className="mb-3 flex-row items-center justify-between">
        <FlowText className="text-sm font-bold text-flow-text">Badges de défense</FlowText>
        <FlowText className="text-xs text-flow-faint">
          {unlockedCount} / {DEFENSE_BADGES.length}
        </FlowText>
      </View>
      <View className="flex-row gap-3">
        {DEFENSE_BADGES.map((badge) => {
          const active = isDefenseBadgeUnlocked(badge.minDays, dayCount)
          return (
            <Pressable
              key={badge.key}
              onPress={() => router.push(`/defense-badge/${badge.key}` as never)}
              accessibilityRole="button"
              accessibilityLabel={`Badge de défense ${badge.label}`}
              className={`${flowSurface.badge} ${badgeSurface(active)}`}
              style={flowCardShadow}
            >
              <FlowText
                className={`text-center text-[10px] font-bold ${
                  active ? 'text-flow-cta' : 'text-flow-faint'
                }`}
                numberOfLines={2}
              >
                {badge.label}
              </FlowText>
              <View className={`relative mt-2 h-12 w-12 ${flowSurface.iconWell}`}>
                <Image
                  source={badge.source}
                  style={{
                    width: ICON_SIZE,
                    height: ICON_SIZE,
                    opacity: active ? 1 : 0.35,
                  }}
                  contentFit="contain"
                />
                {!active ? (
                  <View className="absolute inset-0 items-center justify-center">
                    <MaterialIcons name="lock" size={18} color={FLOW.faint} />
                  </View>
                ) : null}
              </View>
            </Pressable>
          )
        })}
      </View>
    </View>
  )
}
