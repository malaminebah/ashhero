import { describe, expect, it } from 'vitest'
import { resolveCombatVisuals } from './combatVisuals'

describe('resolveCombatVisuals', () => {
  it(`
    Given player turn with both fighters alive and no sprite cue
    When visuals are resolved
    Then both sprites idle
  `, () => {
    const phase = 'player_turn' as const

    const visuals = resolveCombatVisuals(phase, 100, 50, null)

    expect(visuals).toEqual({ playerAnim: 'idle', bossAnim: 'idle' })
  })

  it(`
    Given a special attack cue while the boss survives
    When visuals are resolved
    Then the player attacks and the boss is hurt
  `, () => {
    const cue = 'special' as const

    const visuals = resolveCombatVisuals('resolving_instant', 100, 50, cue)

    expect(visuals).toEqual({ playerAnim: 'attackSpecial', bossAnim: 'hurt' })
  })

  it(`
    Given a special attack cue on the killing blow
    When visuals are resolved
    Then the attack anim persists while the boss dies
  `, () => {
    const bossHp = 0

    const visuals = resolveCombatVisuals('resolving_instant', 100, bossHp, 'special')

    expect(visuals).toEqual({ playerAnim: 'attackSpecial', bossAnim: 'death' })
  })

  it(`
    Given a water attack cue
    When visuals are resolved
    Then the player plays the water attack anim
  `, () => {
    const cue = 'water' as const

    const visuals = resolveCombatVisuals('resolving_instant', 100, 50, cue)

    expect(visuals).toEqual({ playerAnim: 'attackWater', bossAnim: 'hurt' })
  })

  it(`
    Given a boss riposte cue
    When visuals are resolved
    Then the player is hurt and the boss attacks
  `, () => {
    const cue = 'boss' as const

    const visuals = resolveCombatVisuals('enemy_turn', 50, 50, cue)

    expect(visuals).toEqual({ playerAnim: 'hurt', bossAnim: 'attack' })
  })

  it(`
    Given a boss regen cue
    When visuals are resolved
    Then both sprites stay idle
  `, () => {
    const cue = 'boss_regen' as const

    const visuals = resolveCombatVisuals('boss_regen', 50, 50, cue)

    expect(visuals).toEqual({ playerAnim: 'idle', bossAnim: 'idle' })
  })

  it(`
    Given the boss windup phase before the riposte
    When visuals are resolved
    Then both sprites stay idle
  `, () => {
    const phase = 'boss_windup' as const

    const visuals = resolveCombatVisuals(phase, 50, 50, null)

    expect(visuals).toEqual({ playerAnim: 'idle', bossAnim: 'idle' })
  })

  it(`
    Given the player attack cue has cleared mid-resolution
    When visuals are resolved
    Then both sprites return to idle
  `, () => {
    const phase = 'resolving_instant' as const

    const visuals = resolveCombatVisuals(phase, 100, 50, null)

    expect(visuals).toEqual({ playerAnim: 'idle', bossAnim: 'idle' })
  })

  it(`
    Given the boss attack cue has cleared during enemy turn
    When visuals are resolved
    Then both sprites return to idle
  `, () => {
    const phase = 'enemy_turn' as const

    const visuals = resolveCombatVisuals(phase, 50, 50, null)

    expect(visuals).toEqual({ playerAnim: 'idle', bossAnim: 'idle' })
  })

  it(`
    Given the victory celebration phase
    When visuals are resolved
    Then the player celebrates over the dead boss
  `, () => {
    const phase = 'celebrate_victory' as const

    const visuals = resolveCombatVisuals(phase, 100, 0, null)

    expect(visuals).toEqual({ playerAnim: 'victory', bossAnim: 'death' })
  })

  it(`
    Given the defeat celebration phase
    When visuals are resolved
    Then the player plays the death anim
  `, () => {
    const phase = 'celebrate_defeat' as const

    const visuals = resolveCombatVisuals(phase, 0, 50, null)

    expect(visuals).toEqual({ playerAnim: 'death', bossAnim: 'idle' })
  })

  it(`
    Given the breathing exercise is pending
    When visuals are resolved
    Then the player plays the breathe anim
  `, () => {
    const phase = 'breathe_pending' as const

    const visuals = resolveCombatVisuals(phase, 100, 50, null)

    expect(visuals).toEqual({ playerAnim: 'attackBreathe', bossAnim: 'idle' })
  })

  it(`
    Given the player HP reaches zero regardless of phase
    When visuals are resolved
    Then the player plays the death anim
  `, () => {
    const playerHp = 0

    const visuals = resolveCombatVisuals('player_turn', playerHp, 50, null)

    expect(visuals).toEqual({ playerAnim: 'death', bossAnim: 'idle' })
  })
})
