import type { PropsWithChildren } from 'react'
import { useBossIntroStyle } from '../hooks/useBossIntroStyle'
import { useCombatShakeStyle } from '../hooks/useCombatShakeStyle'
import { ArenaFrame } from './ArenaFrame'
import { ArenaSprites } from './ArenaSprites'
import { CombatEffectOverlay } from './CombatEffectOverlay'
import type { CombatArenaViewParams } from '../types'

/** Framed night arena (mockup) — sprites, hit effects, breathe aura.
 * Boss stays mounted after KO: CartoonBoss death anim dissolves it. */
export const CombatArenaView = ({
  phase,
  bossDefeated: _bossDefeated,
  bossShakeKey,
  playerShakeKey,
  playerAnim,
  bossAnim,
  combatEffect,
  breatheActive = false,
  breathePhase = 'countdown',
  style,
  children,
}: PropsWithChildren<CombatArenaViewParams>) => {
  const bossIntro = useBossIntroStyle(phase)
  const bossShake = useCombatShakeStyle(bossShakeKey, 'left')
  const playerShake = useCombatShakeStyle(playerShakeKey, 'right')

  return (
    <ArenaFrame style={style}>
      <ArenaSprites
        playerAnim={playerAnim}
        bossAnim={bossAnim}
        bossIntroStyle={bossIntro}
        bossShakeStyle={bossShake}
        playerShakeStyle={playerShake}
        breatheActive={breatheActive}
        breathePhase={breathePhase}
      >
        {children}
      </ArenaSprites>
      <CombatEffectOverlay combatEffect={combatEffect} />
    </ArenaFrame>
  )
}
