import { Image } from 'expo-image'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { View, Text, ScrollView } from 'react-native'
import { PROFILE_BADGES } from './badgeRules'
import { profileBadgeSource } from './profileBadgeAssets'
import type { ProfileBadgesGridParams } from '../../types'

const ICON_SIZE = 48

export const ProfileBadgesGrid = ({ stats }: ProfileBadgesGridParams) => {
  const unlockedCount = PROFILE_BADGES.filter((b) => b.isUnlocked(stats)).length

  return (
    <View className="mb-8">
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="font-mono text-[10px] font-bold uppercase tracking-[0.25rem] text-white/80">
          Badges
        </Text>
        <Text className="font-mono text-[10px] text-white/45">
          {unlockedCount} / {PROFILE_BADGES.length}
        </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingRight: 4 }}
      >
        {PROFILE_BADGES.map((badge) => {
          const active = badge.isUnlocked(stats)
          return (
            <View
              key={badge.id}
              className={`w-[88px] items-center rounded-xl border px-2 py-3 ${
                active
                  ? 'border-brand-success/50 bg-brand-success/10'
                  : 'border-white/10 bg-white/[0.02]'
              }`}
            >
              <Text
                className={`text-center font-mono text-[9px] font-bold uppercase tracking-wide ${
                  active ? 'text-brand-success' : 'text-white/35'
                }`}
                numberOfLines={2}
              >
                {badge.name}
              </Text>
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
                    <MaterialIcons name="lock" size={18} color="rgba(255,255,255,0.45)" />
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
