import { View, Text } from 'react-native'
import { DashboardXpBar } from './DashboardXpBar'

type Props = {
  dayCount: number
  totalXp: number
}

export const DashboardHero = ({ dayCount, totalXp }: Props) => (
  <View className="mb-8 items-center">
    <View
      className="mb-4 h-[140px] w-[140px] items-center justify-center rounded-2xl border-2 border-brand-accent/50 bg-brand-bg2"
      style={{
        shadowColor: '#a855f7',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.55,
        shadowRadius: 24,
        elevation: 16,
      }}
    >
      <Text className="text-7xl" style={{ lineHeight: 88 }}>
        🤖
      </Text>
    </View>
    <Text className="font-mono text-6xl font-black tracking-tighter text-brand-accent">
      {dayCount}
    </Text>
    <Text className="mt-1 font-mono text-[10px] uppercase tracking-[0.35rem] text-white/50">
      JOURS SANS VAPE
    </Text>
    <DashboardXpBar totalXp={totalXp} />
  </View>
)
