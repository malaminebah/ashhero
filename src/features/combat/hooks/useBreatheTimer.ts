import { useCallback, useEffect, useRef, useState } from 'react'
import {
  advanceBreatheStep,
  BREATHE_CYCLE_COUNT,
  BREATHE_PHASE_SEC,
  breatheTotalTicks,
  gradeBreatheSession,
  gradeTapOffset,
  type BreatheGrade,
  type BreathePhase,
} from '../breatheCycle'

export function useBreatheTimer(
  onComplete: (grade: BreatheGrade) => void,
  enabled: boolean
) {
  const totalTicks = breatheTotalTicks()
  const [tick, setTick] = useState(0)
  const [cycleIndex, setCycleIndex] = useState(1)
  const phaseRef = useRef<BreathePhase>('countdown')
  const cycleRef = useRef(1)
  const [phase, setPhase] = useState<BreathePhase>('countdown')
  const [phaseRemaining, setPhaseRemaining] = useState(BREATHE_PHASE_SEC.countdown)
  const onCompleteRef = useRef(onComplete)
  const completedRef = useRef(false)
  const inhaleStartRef = useRef<number | null>(null)
  const tapOffsetsRef = useRef<(number | null)[]>([])
  onCompleteRef.current = onComplete

  useEffect(() => {
    if (!enabled) return
    completedRef.current = false
    phaseRef.current = 'countdown'
    cycleRef.current = 1
    inhaleStartRef.current = null
    tapOffsetsRef.current = []
    setPhase('countdown')
    setCycleIndex(1)
    setPhaseRemaining(BREATHE_PHASE_SEC.countdown)
    setTick(0)
  }, [enabled])

  /** First tap after each inhale start is scored; extra taps in a cycle are ignored. */
  const registerTap = useCallback(() => {
    const start = inhaleStartRef.current
    const offsets = tapOffsetsRef.current
    if (start == null || offsets.length === 0) return
    const i = offsets.length - 1
    if (offsets[i] == null) offsets[i] = Date.now() - start
  }, [])

  useEffect(() => {
    if (!enabled || completedRef.current || tick >= totalTicks) return

    const t = setTimeout(() => {
      setPhaseRemaining((pRem) => {
        if (pRem > 1) return pRem - 1

        const next = advanceBreatheStep(phaseRef.current, cycleRef.current)
        if (next.completed) {
          completedRef.current = true
          onCompleteRef.current(
            gradeBreatheSession(tapOffsetsRef.current.map(gradeTapOffset))
          )
          return 0
        }

        if (next.phase === 'inhale') {
          inhaleStartRef.current = Date.now()
          tapOffsetsRef.current.push(null)
        }

        phaseRef.current = next.phase
        cycleRef.current = next.cycleIndex
        setPhase(next.phase)
        setCycleIndex(next.cycleIndex)
        return BREATHE_PHASE_SEC[next.phase]
      })
      setTick((n) => n + 1)
    }, 1000)

    return () => clearTimeout(t)
  }, [enabled, tick, totalTicks])

  const progress = totalTicks > 0 ? tick / totalTicks : 0

  return {
    cycleIndex,
    phase,
    phaseRemaining,
    progress,
    cycleCount: BREATHE_CYCLE_COUNT,
    registerTap,
  }
}
