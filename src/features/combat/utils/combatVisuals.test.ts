import { describe, expect, it } from 'vitest'
import { resolveCombatVisuals } from './combatVisuals'

describe('resolveCombatVisuals', () => {
  it('returns idle sprites during player turn', () => {
    expect(resolveCombatVisuals('player_turn', 100, 50, null)).toEqual({
      playerAnim: 'idle',
      bossAnim: 'idle',
    })
  })

  it('maps player attack cue to attack and hurt rows', () => {
    expect(resolveCombatVisuals('resolving_instant', 100, 50, 'water')).toEqual({
      playerAnim: 'attackWater',
      bossAnim: 'hurt',
    })
  })

  it('maps boss riposte cue to hurt and attack rows', () => {
    expect(resolveCombatVisuals('enemy_turn', 50, 50, 'boss')).toEqual({
      playerAnim: 'hurt',
      bossAnim: 'attack',
    })
  })

  it('shows boss attack windup during enemy turn without cue', () => {
    expect(resolveCombatVisuals('enemy_turn', 50, 50, null)).toEqual({
      playerAnim: 'idle',
      bossAnim: 'attack',
    })
  })

  it('shows victory celebration in arena before result screen', () => {
    expect(resolveCombatVisuals('celebrate_victory', 100, 0, null)).toEqual({
      playerAnim: 'victory',
      bossAnim: 'death',
    })
  })

  it('shows death celebration before defeat screen', () => {
    expect(resolveCombatVisuals('celebrate_defeat', 0, 50, null)).toEqual({
      playerAnim: 'death',
      bossAnim: 'attack',
    })
  })

  it('returns death when hp is zero', () => {
    expect(resolveCombatVisuals('player_turn', 0, 50, null)).toEqual({
      playerAnim: 'death',
      bossAnim: 'attack',
    })
  })
})
