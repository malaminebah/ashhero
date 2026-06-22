export const BREATHE_INHALE_SEC = 3
export const BREATHE_EXHALE_SEC = 3
/** Pause volontaire entre fin d'expiration et prochaine inspiration (T-113). */
export const BREATHE_PAUSE_SEC = 1

export type BreathePhase = 'inhale' | 'exhale' | 'pause'

export const BREATHE_PHASE_SEC: Record<BreathePhase, number> = {
  inhale: BREATHE_INHALE_SEC,
  exhale: BREATHE_EXHALE_SEC,
  pause: BREATHE_PAUSE_SEC,
}

export const BREATHE_PHASE_LABEL: Record<BreathePhase, string> = {
  inhale: 'Inspire…',
  exhale: 'Expire…',
  pause: 'Pause…',
}

export const nextBreathePhase = (phase: BreathePhase): BreathePhase => {
  if (phase === 'inhale') return 'exhale'
  if (phase === 'exhale') return 'pause'
  return 'inhale'
}
