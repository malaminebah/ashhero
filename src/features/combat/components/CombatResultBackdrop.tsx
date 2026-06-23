import type { CombatResultBackdropParams } from '../types'
import { ArenaBackgroundPanel } from './ArenaBackgroundPanel'
import { ArenaSprites } from './ArenaSprites'

export const CombatResultBackdrop = ({
  heroAnim,
  showBoss = true,
  bossAnim = 'idle',
  bossMuted = false,
}: CombatResultBackdropParams) => (
  <ArenaBackgroundPanel variant="banner" tone="flow" className="rounded-b-3xl border-b border-flow-border">
    <ArenaSprites
      playerAnim={heroAnim}
      bossAnim={bossAnim}
      showBoss={showBoss}
      bossMuted={bossMuted}
    />
  </ArenaBackgroundPanel>
)
