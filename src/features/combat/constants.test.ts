import { describe, expect, it } from 'vitest'
import { rollBossRiposteDamage } from './constants'

describe('rollBossRiposteDamage', () => {
  it('returns integer in [8, 16] inclusive', () => {
    for (let i = 0; i < 200; i++) {
      const v = rollBossRiposteDamage()
      expect(v).toBeGreaterThanOrEqual(8)
      expect(v).toBeLessThanOrEqual(16)
      expect(Number.isInteger(v)).toBe(true)
    }
  })
})
