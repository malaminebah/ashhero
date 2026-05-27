import { Text, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { PlayerHeroEmoji } from '@/src/features/tracker/components/PlayerHeroEmoji'
import { useCombatShakeStyle } from '../hooks/useCombatShakeStyle'
import { AttackEffect } from './AttackEffect'

type Props = {
  level: number
  bossShakeKey: number
  playerShakeKey: number
  attackEmoji: string | null
}

export const CombatArenaView = ({
  level,
  bossShakeKey,
  playerShakeKey,
  attackEmoji,
}: Props) => {
  const bossShake = useCombatShakeStyle(bossShakeKey)
  const playerShake = useCombatShakeStyle(playerShakeKey)

  return (
    <View className="relative mb-4 h-[168px] overflow-hidden rounded-xl border border-white/10 bg-[#0a1008]">
      <View className="absolute inset-x-0 bottom-0 h-16 bg-black/30" />
      <View className="absolute bottom-6 left-8 right-8 h-3 rounded-full bg-white/[0.06]" />

      <Animated.View style={playerShake} className="absolute bottom-8 left-6">
        <PlayerHeroEmoji level={level} variant="combat" />
      </Animated.View>

      <Animated.View style={bossShake} className="absolute bottom-6 right-4">
        <Text className="text-[72px] leading-[80px]">👾</Text>
      </Animated.View>

      <AttackEffect emoji={attackEmoji ?? ''} visible={attackEmoji != null} />
    </View>
  )
}
