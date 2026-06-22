import { useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import { FlowText } from '@/components/ui/flow-text'
import {
  BREATHE_PAUSE_SEC,
  BREATHE_PHASE_LABEL,
  BREATHE_PHASE_SEC,
  nextBreathePhase,
  type BreathePhase,
} from '../breatheCycle'
import type { BreatheTimerParams } from '../types'

const TOTAL_SECONDS = 60
const SEGMENTS = 12

export const BreatheTimer = ({ onComplete }: BreatheTimerParams) => {
  const [remaining, setRemaining] = useState(TOTAL_SECONDS)
  const phaseRef = useRef<BreathePhase>('inhale')
  const [phase, setPhase] = useState<BreathePhase>('inhale')
  const [phaseRemaining, setPhaseRemaining] = useState(BREATHE_PHASE_SEC.inhale)
  const onCompleteRef = useRef(onComplete)
  const completedRef = useRef(false)
  onCompleteRef.current = onComplete

  useEffect(() => {
    if (remaining <= 0) return
    const t = setTimeout(() => {
      setRemaining((r) => r - 1)
      setPhaseRemaining((pRem) => {
        if (pRem > 1) return pRem - 1
        const next = nextBreathePhase(phaseRef.current)
        phaseRef.current = next
        setPhase(next)
        return BREATHE_PHASE_SEC[next]
      })
    }, 1000)
    return () => clearTimeout(t)
  }, [remaining, phaseRemaining])

  useEffect(() => {
    if (remaining !== 0 || completedRef.current) return
    completedRef.current = true
    onCompleteRef.current()
  }, [remaining])

  const filledSegments = Math.min(
    SEGMENTS,
    Math.floor(((TOTAL_SECONDS - remaining) / TOTAL_SECONDS) * SEGMENTS)
  )

  return (
    <View className="mb-4 items-center rounded-2xl border border-flow-border bg-flow-secondary py-4">
      <View className="h-36 w-36 items-center justify-center rounded-full border-2 border-flow-cta/40 p-2">
        <View className="w-32 flex-row flex-wrap justify-center gap-1">
          {Array.from({ length: SEGMENTS }, (_, i) => (
            <View
              key={i}
              className={`h-3 w-3 rounded-sm ${
                i < filledSegments ? 'bg-flow-cta' : 'bg-flow-border'
              }`}
            />
          ))}
        </View>
      </View>
      <FlowText className="mt-4 text-sm font-bold text-flow-cta">
        {BREATHE_PHASE_LABEL[phase]}
      </FlowText>
      <FlowText className="mt-1 text-3xl font-bold tabular-nums text-flow-text">
        {phaseRemaining}s
      </FlowText>
      {phase === 'pause' ? (
        <FlowText className="mt-2 px-4 text-center text-xs leading-5 text-flow-muted">
          {BREATHE_PAUSE_SEC}s avant la prochaine inspiration.
        </FlowText>
      ) : null}
      <FlowText className="mt-3 text-xs text-flow-faint">Temps restant : {remaining}s</FlowText>
    </View>
  )
}
