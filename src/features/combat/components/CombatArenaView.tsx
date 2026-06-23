import type { PropsWithChildren } from 'react'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useCombatShakeStyle } from '../hooks/useCombatShakeStyle'
import { ArenaBackgroundPanel } from './ArenaBackgroundPanel'
import { ArenaSprites } from './ArenaSprites'
import type { CombatArenaViewParams } from '../types'

export const CombatArenaView = ({
  bossDefeated,
  bossShakeKey,
  playerShakeKey,
  playerAnim,
  bossAnim,
  children,
}: PropsWithChildren<CombatArenaViewParams>) => {
  const bossShake = useCombatShakeStyle(bossShakeKey, 'left')
  const playerShake = useCombatShakeStyle(playerShakeKey, 'right')

  return (
    <View className="max-h-full w-full flex-1">
      <ArenaBackgroundPanel
        variant="fill"
        tone="game"
        className="flex-1 rounded-2xl border border-white/10 bg-brand-bg"
      >
        <ArenaSprites
          playerAnim={playerAnim}
          bossAnim={bossAnim}
          showBoss={!bossDefeated}
          playerShakeStyle={playerShake}
          bossShakeStyle={bossShake}
        >
          {children}
        </ArenaSprites>
      </ArenaBackgroundPanel>
    </View>
  )
}
