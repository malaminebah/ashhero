import { describe, expect, it } from 'vitest'
import { playerAttackDurationMs, soldierAnimDurationMs } from '../animConfig'

describe('playerAttackDurationMs', () => {
  it(`
    Given every combat action
    When its attack duration is resolved
    Then the duration is strictly positive so the FSM timers never fire instantly
  `, () => {
    const actions = ['breathe', 'water', 'distract', 'special'] as const

    const durations = actions.map((action) => playerAttackDurationMs(action))

    expect(durations.every((duration) => duration > 0)).toBe(true)
  })
})

describe('soldierAnimDurationMs', () => {
  it(`
    Given the death anim used to time the defeat celebration
    When its duration is resolved
    Then the duration is strictly positive
  `, () => {
    const anim = 'death' as const

    const duration = soldierAnimDurationMs(anim)

    expect(duration).toBeGreaterThan(0)
  })
})
