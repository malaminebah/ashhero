import { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient'
import Svg, { Circle, Defs, Path, RadialGradient, Stop } from 'react-native-svg'
import type {
  BossAttackEffect,
  CombatEffectOverlayParams,
  PlayerAttackEffect,
} from '../types'

const FX_MS = 650

/* ---------- shared bits ---------- */

type GlowSide = 'boss' | 'player'

/** Radial glow burst over the hit target (mockup hitglow). */
const HitGlow = ({ side, color }: { side: GlowSide; color: string }) => {
  const opacity = useSharedValue(0)
  const scale = useSharedValue(0.55)

  useEffect(() => {
    opacity.value = withSequence(
      withTiming(0.95, { duration: 110, easing: Easing.out(Easing.quad) }),
      withTiming(0, { duration: FX_MS - 110, easing: Easing.in(Easing.quad) })
    )
    scale.value = withSpring(1.12, { damping: 11, stiffness: 130 })
  }, [opacity, scale])

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }))

  const pos =
    side === 'boss'
      ? { right: '0%' as const, bottom: 16 }
      : { left: '0%' as const, bottom: 12 }

  return (
    <Animated.View
      pointerEvents="none"
      style={[{ position: 'absolute', width: 175, height: 160 }, pos, style]}
    >
      <Svg width={175} height={160}>
        <Defs>
          <RadialGradient id="hitGlow" cx="0.5" cy="0.5" r="0.5">
            <Stop offset="0" stopColor={color} stopOpacity={0.6} />
            <Stop offset="1" stopColor={color} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Circle cx={87.5} cy={80} r={80} fill="url(#hitGlow)" />
      </Svg>
    </Animated.View>
  )
}

/** Splash star burst on the boss (mockup water impact strokes). */
const ImpactBurst = ({ color, accent }: { color: string; accent: string }) => {
  const opacity = useSharedValue(0)
  const scale = useSharedValue(0.35)

  useEffect(() => {
    opacity.value = withSequence(
      withDelay(90, withTiming(1, { duration: 80 })),
      withTiming(0, { duration: FX_MS - 260, easing: Easing.in(Easing.quad) })
    )
    scale.value = withDelay(90, withSpring(1, { damping: 9, stiffness: 200 }))
  }, [opacity, scale])

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }))

  return (
    <Animated.View
      pointerEvents="none"
      style={[{ position: 'absolute', right: '5%', bottom: 62 }, style]}
    >
      <Svg width={140} height={110} viewBox="0 0 140 110">
        <Path
          d="M70 58 C58 40 50 46 40 32 M70 58 C84 42 94 48 104 30 M70 58 C66 36 74 30 70 14 M70 58 C48 62 44 52 26 56 M70 58 C94 64 100 54 118 60"
          stroke={color}
          strokeWidth={5}
          strokeLinecap="round"
          fill="none"
        />
        <Circle cx={34} cy={26} r={5} fill={accent} />
        <Circle cx={110} cy={24} r={5} fill={accent} />
        <Circle cx={70} cy={8} r={4} fill={accent} />
        <Circle cx={20} cy={58} r={4} fill={accent} />
        <Circle cx={124} cy={62} r={4} fill={accent} />
      </Svg>
    </Animated.View>
  )
}

/** Small projectile flying hero → boss in an arc. */
const Projectile = ({
  delay,
  size,
  color,
  round,
}: {
  delay: number
  size: number
  color: string
  round: boolean
}) => {
  const x = useSharedValue(0)
  const y = useSharedValue(0)
  const opacity = useSharedValue(0)

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withSequence(
        withTiming(1, { duration: 40 }),
        withTiming(1, { duration: 160 }),
        withTiming(0, { duration: 60 })
      )
    )
    x.value = withDelay(
      delay,
      withTiming(150, { duration: 260, easing: Easing.out(Easing.quad) })
    )
    y.value = withDelay(
      delay,
      withSequence(
        withTiming(-26, { duration: 130, easing: Easing.out(Easing.quad) }),
        withTiming(6, { duration: 130, easing: Easing.in(Easing.quad) })
      )
    )
  }, [delay, opacity, x, y])

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: x.value }, { translateY: y.value }],
  }))

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          position: 'absolute',
          left: '30%',
          bottom: 130,
          width: size,
          height: size,
          backgroundColor: color,
          borderRadius: round ? size / 2 : size / 3,
          transform: [{ rotate: '45deg' }],
        },
        style,
      ]}
    />
  )
}

/* ---------- player attack FX ---------- */

const PLAYER_FX_THEME: Record<Exclude<PlayerAttackEffect, null>, {
  glow: string
  burst: string
  accent: string
  projectile: string
}> = {
  water: { glow: '#60a5fa', burst: '#60a5fa', accent: '#bfdbfe', projectile: '#93c5fd' },
  distract: { glow: '#fbbf24', burst: '#fcd34d', accent: '#fef3c7', projectile: '#fbbf24' },
  special: { glow: '#a855f7', burst: '#c084fc', accent: '#f3e8ff', projectile: '#c084fc' },
  breathe: { glow: '#22c55e', burst: '#4ade80', accent: '#bbf7d0', projectile: '#86efac' },
}

/** Full-frame violet flash — special attack only. */
const ArenaFlash = () => {
  const opacity = useSharedValue(0)

  useEffect(() => {
    opacity.value = withDelay(
      200,
      withSequence(
        withTiming(0.42, { duration: 70 }),
        withTiming(0.08, { duration: 90 }),
        withTiming(0.3, { duration: 70 }),
        withTiming(0, { duration: 220, easing: Easing.in(Easing.quad) })
      )
    )
  }, [opacity])

  const style = useAnimatedStyle(() => ({ opacity: opacity.value }))

  return (
    <Animated.View
      pointerEvents="none"
      style={[StyleSheet.absoluteFill, { backgroundColor: '#a855f7' }, style]}
    />
  )
}

/** Horizontal energy beam hero → boss — special attack only. */
const SpecialBeam = () => {
  const scaleX = useSharedValue(0)
  const opacity = useSharedValue(0)

  useEffect(() => {
    opacity.value = withDelay(
      240,
      withSequence(
        withTiming(1, { duration: 60 }),
        withTiming(1, { duration: 180 }),
        withTiming(0, { duration: 170, easing: Easing.in(Easing.quad) })
      )
    )
    scaleX.value = withDelay(
      240,
      withTiming(1, { duration: 110, easing: Easing.out(Easing.cubic) })
    )
  }, [opacity, scaleX])

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scaleX: scaleX.value }],
  }))

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          position: 'absolute',
          left: '22%',
          right: '12%',
          bottom: 104,
          height: 22,
          transformOrigin: 'left',
          borderRadius: 11,
          overflow: 'hidden',
          shadowColor: '#c084fc',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.8,
          shadowRadius: 12,
          elevation: 8,
        },
        style,
      ]}
    >
      <ExpoLinearGradient
        colors={['rgba(168,85,247,0.15)', '#c084fc', '#f3e8ff']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={{ flex: 1 }}
      />
    </Animated.View>
  )
}

const SpecialFx = () => {
  const theme = PLAYER_FX_THEME.special
  return (
    <>
      <ArenaFlash />
      <SpecialBeam />
      <Projectile delay={200} size={11} color={theme.projectile} round />
      <Projectile delay={250} size={9} color={theme.accent} round />
      <Projectile delay={300} size={8} color={theme.projectile} round />
      <Projectile delay={350} size={7} color={theme.accent} round />
      <HitGlow side="boss" color={theme.glow} />
      <ImpactBurst color={theme.burst} accent={theme.accent} />
    </>
  )
}

const PlayerHitFx = ({ effect }: { effect: Exclude<PlayerAttackEffect, null> }) => {
  if (effect === 'special') return <SpecialFx />
  const theme = PLAYER_FX_THEME[effect]
  return (
    <>
      <Projectile delay={0} size={10} color={theme.projectile} round={effect !== 'water'} />
      <Projectile delay={60} size={8} color={theme.accent} round />
      <Projectile delay={110} size={7} color={theme.projectile} round={effect !== 'water'} />
      <HitGlow side="boss" color={theme.glow} />
      <ImpactBurst color={theme.burst} accent={theme.accent} />
    </>
  )
}

/* ---------- boss attack FX ---------- */

const BOSS_CONE_COLORS: Record<BossAttackEffect, [string, string]> = {
  smoke: ['rgba(168,85,247,0.9)', 'rgba(249,115,22,0.55)'],
  fire: ['rgba(249,115,22,0.9)', 'rgba(239,68,68,0.6)'],
  poison: ['rgba(34,197,94,0.85)', 'rgba(168,85,247,0.5)'],
  push: ['rgba(255,255,255,0.65)', 'rgba(168,85,247,0.4)'],
}

/** Smoke cone rushing boss → hero (mockup frame 14). */
const SmokeCone = ({ effect }: { effect: BossAttackEffect }) => {
  const [from, to] = BOSS_CONE_COLORS[effect]
  const opacity = useSharedValue(0)
  const push = useSharedValue(46)

  useEffect(() => {
    opacity.value = withSequence(
      withTiming(1, { duration: 130, easing: Easing.out(Easing.quad) }),
      withTiming(0, { duration: FX_MS - 130, easing: Easing.in(Easing.quad) })
    )
    push.value = withTiming(0, { duration: 240, easing: Easing.out(Easing.cubic) })
  }, [opacity, push])

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: push.value }, { rotate: '-8deg' }],
  }))

  return (
    <Animated.View
      pointerEvents="none"
      style={[{ position: 'absolute', left: '14%', bottom: 52 }, style]}
    >
      <Svg width={210} height={120}>
        <Defs>
          <RadialGradient id="cone" cx="0.85" cy="0.5" r="0.9">
            <Stop offset="0" stopColor={from} stopOpacity={0.9} />
            <Stop offset="0.55" stopColor={to} stopOpacity={0.55} />
            <Stop offset="1" stopColor={to} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Path
          d="M205 60 C160 18 70 22 8 44 C4 54 4 66 8 76 C70 98 160 102 205 60 Z"
          fill="url(#cone)"
        />
        <Circle cx={58} cy={30} r={13} fill={from} opacity={0.6} />
        <Circle cx={92} cy={86} r={10} fill={to} opacity={0.55} />
        <Circle cx={30} cy={62} r={8} fill={from} opacity={0.6} />
      </Svg>
    </Animated.View>
  )
}

/** White speed lines flying toward the hero (mockup frame 14). */
const SpeedLine = ({ delay, bottom, width }: { delay: number; bottom: number; width: number }) => {
  const x = useSharedValue(30)
  const opacity = useSharedValue(0)

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withSequence(
        withTiming(0.55, { duration: 60 }),
        withTiming(0, { duration: 260, easing: Easing.in(Easing.quad) })
      )
    )
    x.value = withDelay(delay, withTiming(-70, { duration: 300, easing: Easing.out(Easing.cubic) }))
  }, [delay, opacity, x])

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: x.value }],
  }))

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          position: 'absolute',
          left: '38%',
          bottom,
          width,
          height: 3,
          borderRadius: 2,
          backgroundColor: '#ffffff',
        },
        style,
      ]}
    />
  )
}

const BossHitFx = ({ effect }: { effect: BossAttackEffect }) => (
  <>
    <SmokeCone effect={effect} />
    <SpeedLine delay={40} bottom={158} width={80} />
    <SpeedLine delay={90} bottom={136} width={100} />
    <SpeedLine delay={140} bottom={116} width={64} />
    <HitGlow side="player" color="#ef4444" />
  </>
)

/* ---------- boss regen FX ---------- */

const RegenBubble = ({ delay, offsetPct }: { delay: number; offsetPct: number }) => {
  const y = useSharedValue(0)
  const opacity = useSharedValue(0)

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withSequence(withTiming(0.85, { duration: 90 }), withTiming(0, { duration: 380 }))
    )
    y.value = withDelay(delay, withTiming(-44, { duration: 470, easing: Easing.out(Easing.quad) }))
  }, [delay, opacity, y])

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: y.value }],
  }))

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          position: 'absolute',
          right: `${10 + offsetPct}%`,
          bottom: 120,
          width: 9,
          height: 9,
          borderRadius: 5,
          backgroundColor: '#4ade80',
        },
        style,
      ]}
    />
  )
}

const BossRegenFx = () => (
  <>
    <HitGlow side="boss" color="#22c55e" />
    <RegenBubble delay={0} offsetPct={0} />
    <RegenBubble delay={110} offsetPct={7} />
    <RegenBubble delay={220} offsetPct={3} />
  </>
)

/* ---------- root ---------- */

export const CombatEffectOverlay = ({ combatEffect }: CombatEffectOverlayParams) => {
  if (combatEffect == null) return null

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {combatEffect.kind === 'player_hits_boss' && combatEffect.effect != null ? (
        <PlayerHitFx key={combatEffect.key} effect={combatEffect.effect} />
      ) : combatEffect.kind === 'boss_hits_player' ? (
        <BossHitFx key={combatEffect.key} effect={combatEffect.effect} />
      ) : combatEffect.kind === 'boss_regen' ? (
        <BossRegenFx key={combatEffect.key} />
      ) : null}
    </View>
  )
}
