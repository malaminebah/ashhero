import { View } from 'react-native'
import type { CombatResultBackdropParams } from '../types'
import { ArenaBackgroundPanel } from './ArenaBackgroundPanel'
import { BossSprite } from './BossSprite'
import { PlayerSoldierSprite } from './PlayerSoldierSprite'

export const CombatResultBackdrop = ({
  heroAnim,
  showBoss = true,
  bossMuted = false,
}: CombatResultBackdropParams) => (
  <ArenaBackgroundPanel variant="banner" tone="flow" className="rounded-b-3xl border-b border-flow-border">
    <View className="absolute inset-x-0 bottom-3 z-10 items-center">
      <PlayerSoldierSprite anim={heroAnim} />
    </View>

    {showBoss ? (
      <View className="absolute right-1 top-12 z-10">
        <BossSprite anim={bossMuted ? 'death' : 'idle'} muted={bossMuted} />
      </View>
    ) : null}
  </ArenaBackgroundPanel>
)
