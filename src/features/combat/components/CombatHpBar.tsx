import { useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { FlowText } from '@/components/ui/flow-text'
import type { CombatHpBarParams } from '../types'

const FILL_MS = 300
const TRAIL_DELAY_MS = 260
const TRAIL_MS = 420
const BAR_H = 14
const SEGMENT_EVERY = 20
const SEGMENT_COUNT = 24

const THEME = {
  boss: {
    nameColor: '#e9d5ff',
    gradient: ['#7e22ce', '#a855f7'] as const,
    trail: 'rgba(233,213,255,0.35)',
  },
  player: {
    nameColor: '#bbf7d0',
    gradient: ['#16a34a', '#22c55e'] as const,
    trail: 'rgba(239,68,68,0.4)',
  },
}

const SHIELD_FILL = '#3b82f6'

function hpRatio(hp: number, maxHp: number): number {
  if (maxHp <= 0) return 0
  return Math.max(0, Math.min(1, hp / maxHp))
}

const SegmentPattern = () => (
  <View pointerEvents="none" style={{ position: 'absolute', inset: 0, flexDirection: 'row' }}>
    {Array.from({ length: SEGMENT_COUNT }, (_, i) => (
      <View
        key={i}
        style={{
          position: 'absolute',
          left: (i + 1) * SEGMENT_EVERY,
          top: 0,
          bottom: 0,
          width: 2,
          backgroundColor: 'rgba(0,0,0,0.4)',
        }}
      />
    ))}
  </View>
)

export const CombatHpBar = ({
  hp,
  maxHp,
  baseMaxHp,
  variant,
  name,
  level,
}: CombatHpBarParams) => {
  const clampedHp = Math.max(0, hp)
  const theme = THEME[variant]
  const baseMax = baseMaxHp ?? maxHp
  const shieldRatio = maxHp > baseMax ? (maxHp - baseMax) / maxHp : 0

  const fillRatio = useSharedValue(hpRatio(clampedHp, maxHp))
  const trailRatio = useSharedValue(hpRatio(clampedHp, maxHp))

  useEffect(() => {
    const target = hpRatio(clampedHp, maxHp)
    fillRatio.value = withTiming(target, { duration: FILL_MS })
    trailRatio.value = withDelay(
      TRAIL_DELAY_MS,
      withTiming(target, { duration: TRAIL_MS, easing: Easing.out(Easing.cubic) })
    )
  }, [clampedHp, maxHp, fillRatio, trailRatio])

  const baseRatio = 1 - shieldRatio

  const fillStyle = useAnimatedStyle(() => ({
    width: `${fillRatio.value * 100}%`,
  }))

  const trailStyle = useAnimatedStyle(() => ({
    width: `${trailRatio.value * 100}%`,
  }))

  // Bonus HP above base max renders as a blue shield segment (mockup DÉF).
  const shieldStyle = useAnimatedStyle(() => ({
    left: `${baseRatio * 100}%`,
    width: `${Math.max(0, fillRatio.value - baseRatio) * 100}%`,
  }))

  return (
    <View className="w-full">
      <View className="mb-1.5 flex-row items-center justify-between">
        <FlowText className="text-sm font-bold" style={{ color: theme.nameColor }}>
          {name}
          {level != null ? ` · Nv ${level}` : ''}
        </FlowText>
        <FlowText className="text-[11px] font-bold uppercase tracking-[0.6px] text-brand-muted">
          {variant === 'player' ? 'PV ' : ''}
          {clampedHp} / {maxHp}
        </FlowText>
      </View>

      <View
        style={{
          height: BAR_H,
          borderRadius: BAR_H / 2,
          backgroundColor: '#1d0b2b',
          borderWidth: 1.5,
          borderColor: 'rgba(255,255,255,0.18)',
          overflow: 'hidden',
        }}
      >
        <Animated.View
          style={[
            trailStyle,
            {
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              backgroundColor: theme.trail,
              borderRadius: BAR_H / 2 - 1.5,
            },
          ]}
        />
        <Animated.View
          style={[fillStyle, { height: '100%', overflow: 'hidden', borderRadius: BAR_H / 2 - 1.5 }]}
        >
          <LinearGradient
            colors={[...theme.gradient]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ width: '100%', height: '100%' }}
          />
        </Animated.View>
        {shieldRatio > 0 ? (
          <Animated.View
            style={[
              shieldStyle,
              {
                position: 'absolute',
                top: 0,
                bottom: 0,
                backgroundColor: SHIELD_FILL,
              },
            ]}
          />
        ) : null}
        <SegmentPattern />
      </View>
    </View>
  )
}
