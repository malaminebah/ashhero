import { PlayerHeroEmoji } from '@/src/features/tracker/components/PlayerHeroEmoji'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useCombatShakeStyle } from '../hooks/useCombatShakeStyle'
import { AttackEffect } from './AttackEffect'
import type { CombatArenaViewParams } from '../types'

const arenaBackground = require('@/assets/combat/arena-bg.png')
const bossSprite = require('@/assets/combat/boss-idle.png')

export const CombatArenaView = ({
  level,
  bossShakeKey,
  playerShakeKey,
  attackEmoji,
}: CombatArenaViewParams) => {
  const bossShake = useCombatShakeStyle(bossShakeKey)
  const playerShake = useCombatShakeStyle(playerShakeKey)

  return (
    <View className="relative h-full min-h-[200px] overflow-hidden rounded-xl border border-white/10">
      <Image
        source={arenaBackground}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        contentPosition="bottom"
        accessibilityIgnoresInvertColors
      />
      <LinearGradient
        colors={['rgba(8,0,15,0.55)', 'transparent', 'rgba(8,0,15,0.25)']}
        locations={[0, 0.35, 1]}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />

      <Animated.View
        style={playerShake}
        className="absolute bottom-8 left-3 z-10"
      >
        <PlayerHeroEmoji level={level} variant="combat" />
      </Animated.View>

      <Animated.View
        style={bossShake}
        className="absolute right-3 top-20 z-10 items-center justify-center"
      >
        <Image
          source={bossSprite}
          style={{ width: 120, height: 120 }}
          contentFit="contain"
          accessibilityLabel="L'Envie"
        />
      </Animated.View>

      <AttackEffect emoji={attackEmoji ?? ''} visible={attackEmoji != null} />
    </View>
  )
}
