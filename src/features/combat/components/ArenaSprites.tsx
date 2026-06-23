import type { ReactNode } from 'react'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { ARENA_SPRITE_LAYOUT } from '../arenaAssets'
import type { BossAnim } from '../bossSheet'
import type { PlayerSoldierAnim } from '../soldierSheet'
import type { useCombatShakeStyle } from '../hooks/useCombatShakeStyle'
import { BossSprite } from './BossSprite'
import { PlayerSoldierSprite } from './PlayerSoldierSprite'

type ShakeStyle = ReturnType<typeof useCombatShakeStyle>

type ArenaSpritesParams = {
  playerAnim: PlayerSoldierAnim
  bossAnim: BossAnim
  showBoss?: boolean
  bossMuted?: boolean
  playerShakeStyle?: ShakeStyle
  bossShakeStyle?: ShakeStyle
  children?: ReactNode
}

const ROW_STYLE = { position: 'absolute', left: 0, right: 0, zIndex: 10, alignItems: 'center' } as const

export const ArenaSprites = ({
  playerAnim,
  bossAnim,
  showBoss = true,
  bossMuted = false,
  playerShakeStyle,
  bossShakeStyle,
  children,
}: ArenaSpritesParams) => (
  <>
    <Animated.View style={[playerShakeStyle, { ...ROW_STYLE, ...ARENA_SPRITE_LAYOUT.player }]}>
      <PlayerSoldierSprite anim={playerAnim} />
    </Animated.View>

    {showBoss ? (
      <Animated.View style={[bossShakeStyle, { ...ROW_STYLE, ...ARENA_SPRITE_LAYOUT.boss }]}>
        {/* scaleX: -1 on inner View so boss faces the player; shake stays in parent space */}
        <View style={{ transform: [{ scaleX: -1 }] }}>
          <BossSprite anim={bossAnim} muted={bossMuted} />
        </View>
      </Animated.View>
    ) : null}

    {children}
  </>
)
