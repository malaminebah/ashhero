import { describe, expect, it } from 'vitest'
import {
  advanceBreatheStep,
  BREATHE_CYCLE_COUNT,
  BREATHE_PHASE_SEC,
  BREATHE_TAP_GOOD_MS,
  BREATHE_TAP_PERFECT_MS,
  breatheTotalTicks,
  gradeBreatheSession,
  gradeTapOffset,
  type BreathePhase,
} from './breatheCycle'

describe('advanceBreatheStep', () => {
  it(`
    Given the initial countdown of cycle 1
    When the step advances
    Then the inhale phase starts
  `, () => {
    const phase = 'countdown' as const

    const next = advanceBreatheStep(phase, 1)

    expect(next).toEqual({ phase: 'inhale', cycleIndex: 1, completed: false })
  })

  it(`
    Given a running cycle
    When steps advance from inhale to rest
    Then phases chain inhale → exhale → rest → next cycle countdown
  `, () => {
    const cycle = 1

    const afterInhale = advanceBreatheStep('inhale', cycle)
    const afterExhale = advanceBreatheStep('exhale', cycle)
    const afterRest = advanceBreatheStep('rest', cycle)

    expect(afterInhale).toEqual({ phase: 'exhale', cycleIndex: 1, completed: false })
    expect(afterExhale).toEqual({ phase: 'rest', cycleIndex: 1, completed: false })
    expect(afterRest).toEqual({ phase: 'countdown', cycleIndex: 2, completed: false })
  })

  it(`
    Given the exhale of the last cycle
    When the step advances
    Then the session completes
  `, () => {
    const lastCycle = BREATHE_CYCLE_COUNT

    const next = advanceBreatheStep('exhale', lastCycle)

    expect(next).toEqual({
      phase: 'exhale',
      cycleIndex: BREATHE_CYCLE_COUNT,
      completed: true,
    })
  })
})

describe('breatheTotalTicks', () => {
  it(`
    Given the declared phase sequence of a full session (rest between cycles only)
    When all phase durations are summed
    Then the total equals breatheTotalTicks
  `, () => {
    const coreCycle: BreathePhase[] = ['countdown', 'inhale', 'exhale']
    const isLastCycle = (index: number) => index === BREATHE_CYCLE_COUNT - 1
    const sessionPhases = Array.from({ length: BREATHE_CYCLE_COUNT }, (_, index) =>
      isLastCycle(index) ? coreCycle : [...coreCycle, 'rest' as const]
    ).flat()

    const totalSeconds = sessionPhases
      .map((phase) => BREATHE_PHASE_SEC[phase])
      .reduce((sum, seconds) => sum + seconds, 0)

    expect(totalSeconds).toBe(breatheTotalTicks())
  })
})

describe('gradeTapOffset', () => {
  it(`
    Given taps within the perfect window, including its exact bound
    When the taps are graded
    Then the grade is perfect
  `, () => {
    const offsets = [0, BREATHE_TAP_PERFECT_MS]

    const grades = offsets.map(gradeTapOffset)

    expect(grades).toEqual(['perfect', 'perfect'])
  })

  it(`
    Given taps between the perfect and good bounds
    When the taps are graded
    Then the grade is good
  `, () => {
    const offsets = [BREATHE_TAP_PERFECT_MS + 1, BREATHE_TAP_GOOD_MS]

    const grades = offsets.map(gradeTapOffset)

    expect(grades).toEqual(['good', 'good'])
  })

  it(`
    Given a tap past the good window or no tap at all
    When the taps are graded
    Then the grade is off
  `, () => {
    const lateTap = BREATHE_TAP_GOOD_MS + 1
    const noTap = null

    const lateGrade = gradeTapOffset(lateTap)
    const missingGrade = gradeTapOffset(noTap)

    expect(lateGrade).toBe('off')
    expect(missingGrade).toBe('off')
  })

  it(`
    Given a tap slightly before the inhale start (negative offset)
    When the tap is graded
    Then the absolute offset is used
  `, () => {
    const earlyPerfect = -BREATHE_TAP_PERFECT_MS
    const earlyMiss = -(BREATHE_TAP_GOOD_MS + 1)

    const perfectGrade = gradeTapOffset(earlyPerfect)
    const missGrade = gradeTapOffset(earlyMiss)

    expect(perfectGrade).toBe('perfect')
    expect(missGrade).toBe('off')
  })
})

describe('gradeBreatheSession', () => {
  it(`
    Given three perfect cycles
    When the session is graded
    Then the session is perfect
  `, () => {
    const cycles = ['perfect', 'perfect', 'perfect'] as const

    const grade = gradeBreatheSession([...cycles])

    expect(grade).toBe('perfect')
  })

  it(`
    Given two perfects and one good
    When the session is graded
    Then the session still counts as perfect
  `, () => {
    const cycles = ['perfect', 'perfect', 'good'] as const

    const grade = gradeBreatheSession([...cycles])

    expect(grade).toBe('perfect')
  })

  it(`
    Given one cycle of each grade
    When the session is graded
    Then the session averages to good
  `, () => {
    const cycles = ['perfect', 'good', 'off'] as const

    const grade = gradeBreatheSession([...cycles])

    expect(grade).toBe('good')
  })

  it(`
    Given no successful taps
    When the session is graded
    Then the session is off
  `, () => {
    const cycles = ['off', 'off', 'off'] as const

    const grade = gradeBreatheSession([...cycles])

    expect(grade).toBe('off')
  })

  it(`
    Given an empty session with no cycles
    When the session is graded
    Then the session is off
  `, () => {
    const noCycles: [] = []

    const grade = gradeBreatheSession(noCycles)

    expect(grade).toBe('off')
  })
})
