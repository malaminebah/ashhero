import { describe, expect, it } from 'vitest'
import {
  BREATHE_PHASE_SEC,
  nextBreathePhase,
} from './breatheCycle'

describe('breatheCycle', () => {
  it('cycles inhale → exhale → pause → inhale', () => {
    expect(nextBreathePhase('inhale')).toBe('exhale')
    expect(nextBreathePhase('exhale')).toBe('pause')
    expect(nextBreathePhase('pause')).toBe('inhale')
  })

  it('uses 3s inhale, 3s exhale, 1s pause (T-113)', () => {
    expect(BREATHE_PHASE_SEC.inhale).toBe(3)
    expect(BREATHE_PHASE_SEC.exhale).toBe(3)
    expect(BREATHE_PHASE_SEC.pause).toBe(1)
  })
})
