import { describe, expect, it } from 'vitest'
import { getPlayerSoldierAnim } from './playerSoldierAnim'

describe('getPlayerSoldierAnim', () => {
  it('returns idle during player turn', () => {
    expect(getPlayerSoldierAnim('player_turn', 100, null)).toBe('idle')
  })

  it('maps each player attack to its sprite row', () => {
    expect(getPlayerSoldierAnim('resolving_instant', 100, 'breathe')).toBe('attackBreathe')
    expect(getPlayerSoldierAnim('resolving_instant', 100, 'water')).toBe('attackWater')
    expect(getPlayerSoldierAnim('resolving_instant', 100, 'distract')).toBe('attackDistract')
    expect(getPlayerSoldierAnim('resolving_instant', 100, 'special')).toBe('attackSpecial')
  })

  it('returns hurt when boss counterattacks', () => {
    expect(getPlayerSoldierAnim('enemy_turn', 50, 'boss')).toBe('hurt')
  })

  it('returns death when hp is zero or phase is defeat', () => {
    expect(getPlayerSoldierAnim('player_turn', 0, null)).toBe('death')
    expect(getPlayerSoldierAnim('defeat', 10, null)).toBe('death')
  })
})
