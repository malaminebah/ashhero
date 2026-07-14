export const BREATHE_CYCLE_COUNT = 3
export const BREATHE_COUNTDOWN_SEC = 3
export const BREATHE_INHALE_SEC = 4
export const BREATHE_EXHALE_SEC = 3
export const BREATHE_REST_SEC = 2

export type BreathePhase = 'countdown' | 'inhale' | 'exhale' | 'rest'

export const BREATHE_PHASE_SEC: Record<BreathePhase, number> = {
  countdown: BREATHE_COUNTDOWN_SEC,
  inhale: BREATHE_INHALE_SEC,
  exhale: BREATHE_EXHALE_SEC,
  rest: BREATHE_REST_SEC,
}

export const BREATHE_PHASE_LABEL: Record<BreathePhase, string> = {
  countdown: 'Prépare-toi…',
  inhale: 'Inspire…',
  exhale: 'Expire…',
  rest: 'Pause…',
}

export function breatheTotalTicks(): number {
  const cycle = BREATHE_COUNTDOWN_SEC + BREATHE_INHALE_SEC + BREATHE_EXHALE_SEC
  return (BREATHE_CYCLE_COUNT - 1) * (cycle + BREATHE_REST_SEC) + cycle
}

export type BreatheGrade = 'perfect' | 'good' | 'off'

export const BREATHE_TAP_PERFECT_MS = 600
export const BREATHE_TAP_GOOD_MS = 1200

export const BREATHE_GRADE_LABEL: Record<BreatheGrade, string> = {
  perfect: 'Respiration parfaite !',
  good: 'Bonne respiration !',
  off: 'Rythme manqué…',
}

/** Grade one cycle's tap offset (ms after inhale start; null = no tap). */
export function gradeTapOffset(offsetMs: number | null): BreatheGrade {
  if (offsetMs == null) return 'off'
  const abs = Math.abs(offsetMs)
  if (abs <= BREATHE_TAP_PERFECT_MS) return 'perfect'
  if (abs <= BREATHE_TAP_GOOD_MS) return 'good'
  return 'off'
}

/** Overall session grade — average of per-cycle grades (perfect=2, good=1, off=0). */
export function gradeBreatheSession(grades: BreatheGrade[]): BreatheGrade {
  if (grades.length === 0) return 'off'
  const score =
    grades.reduce((sum, g) => sum + (g === 'perfect' ? 2 : g === 'good' ? 1 : 0), 0) /
    grades.length
  if (score >= 1.5) return 'perfect'
  if (score >= 0.75) return 'good'
  return 'off'
}

export type BreatheStepAdvance = {
  phase: BreathePhase
  cycleIndex: number
  completed: boolean
}

export function advanceBreatheStep(
  phase: BreathePhase,
  cycleIndex: number
): BreatheStepAdvance {
  if (phase === 'countdown') {
    return { phase: 'inhale', cycleIndex, completed: false }
  }
  if (phase === 'inhale') {
    return { phase: 'exhale', cycleIndex, completed: false }
  }
  if (phase === 'exhale') {
    if (cycleIndex >= BREATHE_CYCLE_COUNT) {
      return { phase: 'exhale', cycleIndex, completed: true }
    }
    return { phase: 'rest', cycleIndex, completed: false }
  }
  return { phase: 'countdown', cycleIndex: cycleIndex + 1, completed: false }
}
