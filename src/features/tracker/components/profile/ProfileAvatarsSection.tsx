import { View, Text } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

const AVATAR_TIERS = [
  { emoji: '🤖', minLevel: 1 },
  { emoji: '🛡️', minLevel: 4 },
  { emoji: '⚔️', minLevel: 7 },
  { emoji: '👑', minLevel: 10 },
] as const

import type { ProfileAvatarsSectionParams } from '../../types'

export const ProfileAvatarsSection = ({ level }: ProfileAvatarsSectionParams) => {
  const currentIndex = AVATAR_TIERS.reduce(
    (acc, tier, i) => (level >= tier.minLevel ? i : acc),
    0
  )

  return (
    <View className="mb-6">
      <Text className="font-mono text-[10px] font-bold uppercase tracking-[0.25rem] text-white/80">
        Avatars (bientôt)
      </Text>
      <Text className="mt-1 font-mono text-[10px] text-white/45">
        Débloque 4 avatars par palier de niveau !
      </Text>
      <View className="mt-3 flex-row gap-2">
        {AVATAR_TIERS.map((tier, index) => {
          const unlocked = level >= tier.minLevel
          const isCurrent = index === currentIndex && unlocked

          return (
            <View
              key={tier.minLevel}
              className={`relative h-[72px] flex-1 items-center justify-center rounded-xl border bg-white/[0.04] ${
                isCurrent ? 'border-brand-success/60' : 'border-white/10'
              }`}
            >
              <Text className={`text-3xl ${unlocked ? '' : 'opacity-40'}`}>{tier.emoji}</Text>
              {!unlocked ? (
                <View className="absolute bottom-1.5 right-1.5">
                  <MaterialIcons name="lock" size={14} color="rgba(255,255,255,0.35)" />
                </View>
              ) : null}
            </View>
          )
        })}
      </View>
    </View>
  )
}
