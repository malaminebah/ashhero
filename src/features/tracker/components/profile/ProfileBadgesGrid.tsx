import { Image } from 'expo-image'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { View, ScrollView, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { FLOW } from '@/constants/flowTheme'
import { FlowText } from '@/components/ui/flow-text'
import { PROFILE_BADGES } from './badgeRules'
import { profileBadgeSource } from './profileBadgeAssets'
import type { ProfileBadgesGridParams } from '../../types'

const ICON_SIZE = 48

export const ProfileBadgesGrid = ({ stats }: ProfileBadgesGridParams) => {
  const router = useRouter()
  const unlockedCount = PROFILE_BADGES.filter((b) => b.isUnlocked(stats)).length

  return (
    <View className="mb-8">
      <View className="mb-3 flex-row items-center justify-between">
        <FlowText className="text-sm font-bold text-flow-text">Badges</FlowText>
        <FlowText className="text-xs text-flow-faint">
          {unlockedCount} / {PROFILE_BADGES.length}
        </FlowText>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingRight: 4 }}
      >
        {PROFILE_BADGES.map((badge) => {
          const active = badge.isUnlocked(stats)
          return (
            <Pressable
              key={badge.id}
              onPress={() => router.push(`/profile-badge/${badge.id}` as never)}
              accessibilityRole="button"
              accessibilityLabel={`Badge ${badge.name}`}
              className={`w-[88px] items-center rounded-2xl border px-2 py-3 active:opacity-90 ${
                active
                  ? 'border-flow-cta/35 bg-flow-secondary'
                  : 'border-flow-border bg-flow-bg'
              }`}
            >
              <FlowText
                className={`text-center text-[10px] font-bold ${
                  active ? 'text-flow-cta' : 'text-flow-faint'
                }`}
                numberOfLines={2}
              >
                {badge.name}
              </FlowText>
              <View className="relative mt-2 h-12 w-12 items-center justify-center">
                <Image
                  source={profileBadgeSource(badge.asset)}
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
      </ScrollView>
    </View>
  )
}
