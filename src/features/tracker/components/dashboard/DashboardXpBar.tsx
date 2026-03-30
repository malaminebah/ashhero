import { View, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

const XP_PER_SEGMENT = 100

type Props = {
  totalXp: number
}

export const DashboardXpBar = ({ totalXp }: Props) => {
  const inSegment = totalXp % XP_PER_SEGMENT
  const nextCap = Math.floor(totalXp / XP_PER_SEGMENT) * XP_PER_SEGMENT + XP_PER_SEGMENT
  const pct = Math.min(100, (inSegment / XP_PER_SEGMENT) * 100)

  return (
    <View className="mt-5 w-full max-w-[280px]">
      <View className="mb-1.5 flex-row justify-between">
        <Text className="font-mono text-[9px] uppercase tracking-[0.2rem] text-white/45">
          Expérience
        </Text>
        <Text className="font-mono text-[10px] text-white/90">
          {totalXp} / {nextCap} XP
        </Text>
      </View>
      <View className="h-3 w-full overflow-hidden rounded-full border border-brand-accent/40 bg-white/5">
        <LinearGradient
          colors={['#a855f7', '#e879f9', '#c026d3']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{ width: `${pct}%`, height: '100%' }}
        />
      </View>
    </View>
  )
}
