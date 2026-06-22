import type { PropsWithChildren } from 'react'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { ARENA_SPRITE_LAYOUT } from '../arenaAssets'
import { useCombatShakeStyle } from '../hooks/useCombatShakeStyle'
import { AttackEffect } from './AttackEffect'
import { ArenaBackgroundPanel } from './ArenaBackgroundPanel'
import { BossSprite } from './BossSprite'
import { PlayerSoldierSprite } from './PlayerSoldierSprite'
import type { CombatArenaViewParams } from '../types'

export const CombatArenaView = ({
  bossDefeated,
  bossShakeKey,
  playerShakeKey,
  attackEffect,
  playerAnim,
  bossAnim,
  children,
}: PropsWithChildren<CombatArenaViewParams>) => {
  const bossShake = useCombatShakeStyle(bossShakeKey, 'left')
  const playerShake = useCombatShakeStyle(playerShakeKey, 'right')

  return (
    <View className="max-h-full w-full flex-1 items-center justify-center">
      <ArenaBackgroundPanel
        variant="fill"
        tone="game"
        className="rounded-2xl border border-white/10 bg-brand-bg"
      >
        <Animated.View
          style={[playerShake, { position: 'absolute', zIndex: 10, ...ARENA_SPRITE_LAYOUT.player }]}
          className="items-center"
        >
          <PlayerSoldierSprite anim={playerAnim} />
        </Animated.View>

        {!bossDefeated ? (
          <Animated.View
            style={[bossShake, { position: 'absolute', zIndex: 10, ...ARENA_SPRITE_LAYOUT.boss }]}
            className="items-center justify-center"
          >
            <BossSprite anim={bossAnim} />
          </Animated.View>
        ) : null}

        <AttackEffect effect={attackEffect} />
        {children}
      </ArenaBackgroundPanel>
    </View>
  )
}
