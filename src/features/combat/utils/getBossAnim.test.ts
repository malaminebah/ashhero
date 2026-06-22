import { describe, expect, it } from 'vitest'
import { getBossAnim } from './getBossAnim'

describe('getBossAnim', () => {
  it('returns idle during player turn', () => {
    expect(getBossAnim('player_turn', 50, null)).toBe('idle')
  })

  it('returns hurt when player attacks', () => {
    expect(getBossAnim('resolving_instant', 50, 'water')).toBe('hurt')
  })

  it('returns attack during enemy turn or boss riposte', () => {
    expect(getBossAnim('enemy_turn', 50, null)).toBe('attack')
    expect(getBossAnim('enemy_turn', 50, 'boss')).toBe('attack')
  })

  it('returns death when boss hp is zero', () => {
    expect(getBossAnim('player_turn', 0, null)).toBe('death')
  })
})
