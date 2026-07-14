import { View, ScrollView, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { GameLabel } from '@/components/ui/game-label'
import { HexBadge } from '@/components/ui/hex-badge'
import { FlowText } from '@/components/ui/flow-text'
import { PROFILE_BADGES } from './badgeRules'
import type { ProfileBadgesGridParams } from '../../types'

export const ProfileBadgesGrid = ({ stats }: ProfileBadgesGridParams) => {
  const router = useRouter()
  const unlockedCount = PROFILE_BADGES.filter((b) => b.isUnlocked(stats)).length

  return (
    <View className="mb-6">
      <View className="mb-2.5 flex-row items-center justify-between">
        <GameLabel>Badges</GameLabel>
        <GameLabel className="text-brand-gold">
          {unlockedCount} / {PROFILE_BADGES.length}
        </GameLabel>
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
              className={`w-[88px] items-center rounded-2xl border bg-brand-card px-2 py-3 active:opacity-90 ${
                active ? 'border-brand-gold' : 'border-[rgba(255,255,255,0.1)]'
              }`}
            >
              <FlowText
                className={`text-center text-[10px] font-bold ${
                  active ? 'text-brand-gold' : 'text-brand-locked'
                }`}
                numberOfLines={2}
              >
                {badge.name}
              </FlowText>
              <View className="mt-2">
                <HexBadge icon={badge.icon} tint={badge.tint} size={48} locked={!active} />
              </View>
            </Pressable>
          )
        })}
      </ScrollView>
    </View>
  )
}
