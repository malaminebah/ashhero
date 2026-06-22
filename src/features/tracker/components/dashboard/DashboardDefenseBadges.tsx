import { Image } from 'expo-image'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { View, ScrollView } from 'react-native'
import { FLOW } from '@/constants/flowTheme'
import { FlowText } from '@/components/ui/flow-text'
import { DEFENSE_BADGES } from './defenseBadgeAssets'
import { isDefenseBadgeUnlocked } from './defenseBadgesConfig'
import type { DashboardDefenseBadgesParams } from '../../types'

const ICON_SIZE = 48

export const DashboardDefenseBadges = ({ dayCount }: DashboardDefenseBadgesParams) => {
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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingRight: 4 }}
      >
        {DEFENSE_BADGES.map((badge) => {
          const active = isDefenseBadgeUnlocked(badge.minDays, dayCount)
          return (
            <View
              key={badge.key}
              className={`w-[88px] items-center rounded-2xl border px-2 py-3 ${
                active
                  ? 'border-flow-cta/35 bg-flow-secondary'
                  : 'border-flow-border bg-flow-bg'
              }`}
            >
              <FlowText
                className={`text-center text-[10px] font-bold ${
                  active ? 'text-flow-cta' : 'text-flow-faint'
                }`}
              >
                {badge.label}
              </FlowText>
              <View className="relative mt-2 h-12 w-12 items-center justify-center">
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
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}
