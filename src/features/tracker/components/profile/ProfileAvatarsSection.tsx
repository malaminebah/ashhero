import { View } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { GameLabel } from '@/components/ui/game-label'
import { FlowText } from '@/components/ui/flow-text'

import type { ProfileAvatarsSectionParams } from '../../types'

const AVATAR_TIERS = [
  { icon: 'robot-outline' as const, minLevel: 1 },
  { icon: 'shield-outline' as const, minLevel: 4 },
  { icon: 'sword-cross' as const, minLevel: 7 },
  { icon: 'crown-outline' as const, minLevel: 10 },
] as const

export const ProfileAvatarsSection = ({ level }: ProfileAvatarsSectionParams) => {
  const currentIndex = AVATAR_TIERS.reduce(
    (acc, tier, i) => (level >= tier.minLevel ? i : acc),
    0
  )

  return (
    <View className="mb-2">
      <GameLabel>Avatars (bientôt)</GameLabel>
      <FlowText className="mt-1 text-xs text-brand-locked">
        Débloque 4 avatars par palier de niveau !
      </FlowText>
      <View className="mt-3 flex-row gap-2">
        {AVATAR_TIERS.map((tier, index) => {
          const unlocked = level >= tier.minLevel
          const isCurrent = index === currentIndex && unlocked

          return (
            <View
              key={tier.minLevel}
              className={`relative h-[72px] flex-1 items-center justify-center rounded-2xl border bg-brand-card ${
                isCurrent ? 'border-brand-accent' : 'border-[rgba(255,255,255,0.07)]'
              }`}
            >
              <MaterialCommunityIcons
                name={tier.icon}
                size={28}
                color={unlocked ? '#a855f7' : '#5b4a75'}
              />
              {!unlocked ? (
                <View className="absolute bottom-1.5 right-1.5">
                  <MaterialIcons name="lock" size={14} color="#5b4a75" />
                </View>
              ) : null}
            </View>
          )
        })}
      </View>
    </View>
  )
}
