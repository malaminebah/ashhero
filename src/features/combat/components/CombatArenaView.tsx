import type { PropsWithChildren } from 'react'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useCombatShakeStyle } from '../hooks/useCombatShakeStyle'
import { AttackEffect } from './AttackEffect'
import { PlayerSoldierSprite } from './PlayerSoldierSprite'
import type { CombatArenaViewParams } from '../types'

const arenaBackground = require('@/assets/combat/arena-bg.png')
const bossSprite = require('@/assets/combat/boss-idle.png')
const ARENA_ASPECT = 1024 / 682

export const CombatArenaView = ({
  bossDefeated,
  bossShakeKey,
  playerShakeKey,
  attackEffect,
  playerAnim,
  children,
}: PropsWithChildren<CombatArenaViewParams>) => {
  const bossShake = useCombatShakeStyle(bossShakeKey, 'left')
  const playerShake = useCombatShakeStyle(playerShakeKey, 'right')

  return (
    <View className="w-full max-h-full flex-1 items-center justify-center">
      <View
        className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-[#08000f]"
        style={{ aspectRatio: ARENA_ASPECT, maxHeight: '100%' }}
      >
        <Image
          source={arenaBackground}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          contentPosition="center"
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
          className="absolute bottom-6 left-2 z-10 items-center"
        >
          <PlayerSoldierSprite anim={playerAnim} />
        </Animated.View>

        {!bossDefeated ? (
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
        ) : null}

        <AttackEffect effect={attackEffect} />
        {children}
      </View>
    </View>
  )
}
