import { PlayerHeroEmoji } from '@/src/features/tracker/components/PlayerHeroEmoji'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { LinearGradient } from 'expo-linear-gradient'
import { Pressable, Text, View } from 'react-native'

type Props = {
  xpGained: number
  level: number
  onContinue: () => void
}

const coinReward = (xp: number) => Math.max(10, Math.round(xp * 0.6))

export const VictoryBanner = ({ xpGained, level, onContinue }: Props) => {
  const coins = coinReward(xpGained)

  return (
    <View className="flex-1 items-center justify-center px-2 py-6">
      <View className="mb-5 rounded-lg border-2 border-brand-success bg-brand-success px-10 py-2.5">
        <Text className="font-mono text-base font-bold uppercase tracking-wider text-white">
          Victoire !
        </Text>
      </View>

      <View className="mb-5 w-full items-center">
        <View className="flex-row items-end justify-center gap-3">
          <PlayerHeroEmoji level={level} variant="combat" />
          <Text className="mb-2 text-4xl">🎁</Text>
        </View>
        <Text className="mt-1 text-lg">✨</Text>
      </View>

      <Text className="mt-4 text-center font-mono text-sm text-white/80">
        L&apos;Envie recule…
      </Text>
      <Text className="mt-1 text-center font-mono text-sm font-bold text-white">
        Tu es plus fort !
      </Text>

      <View className="mt-8 w-full items-center">
        <Text className="mb-2 w-full text-center font-mono text-[10px] font-bold uppercase tracking-wider text-brand-success">
          Récompenses
        </Text>
        <View className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4">
          <View className="mb-3 flex-row items-center justify-center">
            <View className="mr-3 h-9 w-9 rotate-45 items-center justify-center border border-brand-success/60 bg-brand-success/15">
              <Text className="-rotate-45 font-mono text-[10px] font-bold text-brand-success">
                XP
              </Text>
            </View>
            <Text className="font-mono text-sm font-bold text-white">+{xpGained} XP</Text>
          </View>
          <View className="flex-row items-center justify-center">
            <View className="mr-3 h-9 w-9 items-center justify-center rounded-full border border-brand-gold/60 bg-brand-gold/15">
              <MaterialIcons name="monetization-on" size={18} color="#fbbf24" />
            </View>
            <Text className="font-mono text-sm font-bold text-white">+{coins}</Text>
          </View>
        </View>
      </View>

      <Pressable
        onPress={onContinue}
        accessibilityRole="button"
        accessibilityLabel="Continuer"
        className="mt-8 w-full active:opacity-90"
      >
        <LinearGradient
          colors={['#15803d', '#22c55e', '#16a34a']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{
            borderRadius: 12,
            paddingVertical: 16,
            alignItems: 'center',
          }}
        >
          <Text className="font-mono text-sm font-bold uppercase tracking-wider text-white">
            Continuer
          </Text>
        </LinearGradient>
      </Pressable>
    </View>
  )
}
