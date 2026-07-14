import type { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated from 'react-native-reanimated'
import type { BossAnim, PlayerSoldierAnim } from '../animConfig'
import type { useBossIntroStyle } from '../hooks/useBossIntroStyle'
import type { useCombatShakeStyle } from '../hooks/useCombatShakeStyle'
import { ArenaPlinth } from './ArenaFrame'
import { BreatheHeroAura } from './BreatheHeroAura'
import { CartoonBoss, CartoonHero } from './CartoonSprites'
import { CRAVING_TIERS } from '../constants'
import type { BreathePhase } from '../breatheCycle'
import type { CravingTier } from '../types'

type ShakeStyle = ReturnType<typeof useCombatShakeStyle>
type IntroStyle = ReturnType<typeof useBossIntroStyle>

/** Mockup sizes — frames 12-15 (hero 116×141, boss 130×130). */
export const HERO_ARENA_W = 116
export const HERO_ARENA_H = 141
export const BOSS_ARENA_W = 130
export const BOSS_ARENA_H = 130

type ArenaSpritesParams = {
  playerAnim: PlayerSoldierAnim
  bossAnim: BossAnim
  bossTier?: CravingTier
  showBoss?: boolean
  bossMuted?: boolean
  playerShakeStyle?: ShakeStyle
  bossIntroStyle?: IntroStyle
  bossShakeStyle?: ShakeStyle
  breatheActive?: boolean
  breathePhase?: BreathePhase
  children?: ReactNode
}

export const ArenaSprites = ({
  playerAnim,
  bossAnim,
  bossTier = 'medium',
  showBoss = true,
  bossMuted = false,
  playerShakeStyle,
  bossIntroStyle,
  bossShakeStyle,
  breatheActive = false,
  breathePhase = 'countdown',
  children,
}: ArenaSpritesParams) => (
  <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
    <ArenaPlinth width={122} style={{ left: '7%', bottom: 24 }} />
    {showBoss ? <ArenaPlinth width={134} style={{ right: '5%', bottom: 28 }} /> : null}

    <Animated.View
      style={[
        playerShakeStyle,
        { position: 'absolute', zIndex: 30, left: '6%', bottom: 34 },
      ]}
    >
      {breatheActive ? <BreatheHeroAura phase={breathePhase} /> : null}
      <CartoonHero anim={playerAnim} width={HERO_ARENA_W} height={HERO_ARENA_H} />
    </Animated.View>

    {showBoss ? (
      <Animated.View
        style={[
          bossIntroStyle,
          { position: 'absolute', zIndex: 10, right: '4%', bottom: 40 },
        ]}
      >
        <Animated.View style={bossShakeStyle}>
          <CartoonBoss
            anim={bossAnim}
            muted={bossMuted}
            variant={bossTier}
            width={BOSS_ARENA_W * CRAVING_TIERS[bossTier].bossScale}
            height={BOSS_ARENA_H * CRAVING_TIERS[bossTier].bossScale}
          />
        </Animated.View>
      </Animated.View>
    ) : null}

    {children}
  </View>
)
