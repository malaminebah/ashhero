import { describe, expect, it } from 'vitest'
import { playerAttackDurationMs } from '../animConfig'

describe('playerAttackDurationMs', () => {
  it('matches frames × frameMs from soldier anim config', () => {
    expect(playerAttackDurationMs('water')).toBe(3 * 85)
    expect(playerAttackDurationMs('special')).toBe(3 * 75)
  })
})
