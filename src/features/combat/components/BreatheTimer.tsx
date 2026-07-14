import { useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import Svg, { Circle } from 'react-native-svg'
import { FlowText } from '@/components/ui/flow-text'
import { BREATHE_PHASE_LABEL } from '../breatheCycle'
import type { BreatheTimerParams } from '../types'

const SIZE = 66
const STROKE = 6
const R = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * R

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

/** Mockup circular timer — top-right of the arena during breathing. */
export const BreatheTimer = ({
  cycleIndex,
  cycleCount,
  phase,
  phaseRemaining,
  progress,
}: BreatheTimerParams) => {
  const animatedProgress = useSharedValue(progress)

  useEffect(() => {
    animatedProgress.value = withTiming(progress, {
      duration: 900,
      easing: Easing.out(Easing.cubic),
    })
  }, [animatedProgress, progress])

  const circleProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCUMFERENCE * (1 - animatedProgress.value),
  }))

  return (
    <View style={{ alignItems: 'center' }} pointerEvents="none">
      <View style={{ width: SIZE, height: SIZE }}>
        <Svg width={SIZE} height={SIZE}>
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth={STROKE}
            fill="rgba(8,0,15,0.55)"
          />
          <AnimatedCircle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            stroke="#22c55e"
            strokeWidth={STROKE}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={CIRCUMFERENCE}
            animatedProps={circleProps}
            transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
          />
        </Svg>
        <View
          style={{
            position: 'absolute',
            inset: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FlowText className="text-[15px] font-extrabold text-white">
            {phaseRemaining} s
          </FlowText>
        </View>
      </View>
      <FlowText className="mt-1 text-[11px] font-bold uppercase tracking-[0.6px] text-[#bbf7d0]">
        Cycle {cycleIndex} / {cycleCount}
      </FlowText>
      <FlowText className="text-[11px] font-bold text-white/80">
        {BREATHE_PHASE_LABEL[phase]}
      </FlowText>
    </View>
  )
}
