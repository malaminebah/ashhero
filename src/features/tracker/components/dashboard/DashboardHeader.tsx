import { View, Text, Platform } from 'react-native'

type Props = {
  level: number
}

const titleSerif = Platform.select({
  ios: 'Georgia',
  android: 'serif',
  default: 'serif',
})

export const DashboardHeader = ({ level }: Props) => (
  <View className="mb-6 flex-row items-start justify-between">
    <View className="flex-1 pr-3">
      <Text
        className="text-3xl font-bold tracking-tight text-brand-accent"
        style={{ fontFamily: titleSerif }}
      >
        DASHBOARD
      </Text>
      <Text className="mt-1 font-mono text-[10px] uppercase tracking-[0.35rem] text-white/80">
        TON AVENTURE
      </Text>
    </View>
    <View className="rounded-full border border-brand-gold/60 bg-brand-gold/15 px-4 py-2">
      <Text className="font-mono text-sm font-bold text-brand-gold">
        LVL {level}
      </Text>
    </View>
  </View>
)
