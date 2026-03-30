import { View, Text, Platform } from 'react-native'

const nameSerif = Platform.select({
  ios: 'Georgia',
  android: 'serif',
  default: 'serif',
})

type Props = {
  level: number
  xp: number
}

export const ProfileHeroCard = ({ level, xp }: Props) => (
  <View
    className="mb-8 rounded-2xl border border-brand-accent/35 bg-brand-bg2/80 p-4"
    style={{
      shadowColor: '#a855f7',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.35,
      shadowRadius: 16,
      elevation: 10,
    }}
  >
    <View className="flex-row items-center gap-4">
      <View
        className="h-[88px] w-[88px] items-center justify-center rounded-xl border-2 border-brand-accent/45 bg-brand-bg"
        style={{
          shadowColor: '#a855f7',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.4,
          shadowRadius: 12,
          elevation: 8,
        }}
      >
        <Text className="text-5xl" style={{ lineHeight: 56 }}>
          🤖
        </Text>
      </View>
      <View className="flex-1">
        <Text
          className="text-lg font-bold leading-6 text-white"
          style={{ fontFamily: nameSerif }}
        >
          GUERRIER SANS FUMÉE
        </Text>
        <View className="mt-3 flex-row flex-wrap gap-2">
          <View className="rounded-full border border-brand-accent/50 bg-brand-accent/20 px-3 py-1">
            <Text className="font-mono text-[10px] font-bold uppercase tracking-wider text-brand-accent">
              Niveau {level}
            </Text>
          </View>
          <View className="rounded-full border border-brand-gold/50 bg-brand-gold/15 px-3 py-1">
            <Text className="font-mono text-[10px] font-bold text-brand-gold">{xp} XP</Text>
          </View>
        </View>
      </View>
    </View>
  </View>
)
