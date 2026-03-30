import { View, Text } from 'react-native'
import { PROFILE_BADGES, type ProfileBadgeStats } from './badgeRules'

type Props = {
  stats: ProfileBadgeStats
}

function BadgeCard({
  active,
  icon,
  name,
}: {
  active: boolean
  icon: string
  name: string
}) {
  return (
    <View
      className={`min-h-[100px] flex-1 items-center justify-center rounded-xl border-2 p-2 ${
        active
          ? 'border-brand-accent/70 bg-brand-accent/10'
          : 'border-white/10 bg-white/[0.02] opacity-45'
      }`}
      style={
        active
          ? {
              shadowColor: '#a855f7',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.45,
              shadowRadius: 10,
              elevation: 6,
            }
          : undefined
      }
    >
      <Text className={`text-2xl ${active ? '' : 'opacity-60'}`}>{icon}</Text>
      <Text
        className={`mt-2 text-center font-mono text-[9px] uppercase tracking-wide ${
          active ? 'text-brand-gold' : 'text-white/35'
        }`}
      >
        {name}
      </Text>
    </View>
  )
}

export const ProfileBadgesGrid = ({ stats }: Props) => {
  const unlockedCount = PROFILE_BADGES.filter((b) => b.isUnlocked(stats)).length
  const total = PROFILE_BADGES.length

  const row1 = PROFILE_BADGES.slice(0, 3)
  const row2 = PROFILE_BADGES.slice(3, 6)

  return (
    <View className="mb-8">
      <Text className="mb-3 font-mono text-[10px] uppercase tracking-[0.25rem] text-white/70">
        Badges ({unlockedCount}/{total})
      </Text>
      <View className="gap-2">
        <View className="flex-row gap-2">
          {row1.map((badge) => (
            <BadgeCard
              key={badge.id}
              active={badge.isUnlocked(stats)}
              icon={badge.icon}
              name={badge.name}
            />
          ))}
        </View>
        <View className="flex-row gap-2">
          {row2.map((badge) => (
            <BadgeCard
              key={badge.id}
              active={badge.isUnlocked(stats)}
              icon={badge.icon}
              name={badge.name}
            />
          ))}
        </View>
      </View>
    </View>
  )
}
