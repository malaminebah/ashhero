import { describe, expect, it } from 'vitest'
import { getPlayerSoldierAnim } from './playerSoldierAnim'

describe('getPlayerSoldierAnim', () => {
  it('idle by default', () => {
    expect(getPlayerSoldierAnim('player_turn', 100, null)).toBe('idle')
  })

  it('attack on player effect', () => {
    expect(getPlayerSoldierAnim('resolving_instant', 100, 'water')).toBe('attackLight')
    expect(getPlayerSoldierAnim('resolving_instant', 100, 'special')).toBe('attackHeavy')
  })

  it('hurt on boss effect', () => {
    expect(getPlayerSoldierAnim('enemy_turn', 50, 'boss')).toBe('hurt')
  })

  it('death when hp zero or defeat', () => {
    expect(getPlayerSoldierAnim('player_turn', 0, null)).toBe('death')
    expect(getPlayerSoldierAnim('defeat', 10, null)).toBe('death')
  })
})
