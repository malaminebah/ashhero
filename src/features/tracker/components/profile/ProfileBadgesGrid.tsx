import { View, Text, ScrollView } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { PROFILE_BADGES, type ProfileBadgeStats } from './badgeRules'

type Props = {
  stats: ProfileBadgeStats
}

function HexBadge({ active, icon }: { active: boolean; icon: string }) {
  return (
    <View
      className={`mx-1 h-[52px] w-[52px] items-center justify-center ${
        active ? 'opacity-100' : 'opacity-35'
      }`}
    >
      <View
        className={`h-12 w-12 rotate-45 items-center justify-center border-2 ${
          active ? 'border-brand-success/70 bg-brand-success/15' : 'border-white/15 bg-white/[0.03]'
        }`}
      >
        <Text className="-rotate-45 text-xl">{icon}</Text>
      </View>
      {!active ? (
        <View className="absolute bottom-0 right-0">
          <MaterialIcons name="lock" size={12} color="rgba(255,255,255,0.35)" />
        </View>
      ) : null}
    </View>
  )
}

export const ProfileBadgesGrid = ({ stats }: Props) => {
  const visible = PROFILE_BADGES.slice(0, 4)

  return (
    <View className="mb-8">
      <Text className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.25rem] text-white/80">
        Badges
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 4 }}
      >
        {visible.map((badge) => (
          <HexBadge key={badge.id} active={badge.isUnlocked(stats)} icon={badge.icon} />
        ))}
      </ScrollView>
    </View>
  )
}
