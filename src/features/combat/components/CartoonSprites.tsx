import { useEffect } from 'react'
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { BossSprite as BossArt, type BossPose, type BossVariant } from '@/components/characters/BossSprite'
import { HeroSprite as HeroArt, type HeroPose } from '@/components/characters/HeroSprite'
import { bossAnimDurationMs, soldierAnimDurationMs } from '../animConfig'
import type { BossAnim, PlayerSoldierAnim } from '../animConfig'

const HERO_POSE: Record<PlayerSoldierAnim, HeroPose> = {
  idle: 'idle',
  attackBreathe: 'breathe',
  attackWater: 'attack',
  attackDistract: 'attack',
  attackSpecial: 'attack',
  hurt: 'hurt',
  victory: 'victory',
  death: 'death',
}

const BOSS_POSE: Record<BossAnim, BossPose> = {
  idle: 'idle',
  attack: 'attack',
  hurt: 'hurt',
  // No dedicated death art — hurt pose dissolves via opacity/scale.
  death: 'hurt',
}

const sine = Easing.inOut(Easing.sin)

export type CartoonHeroParams = {
  anim: PlayerSoldierAnim
  width: number
  height: number
}

export const CartoonHero = ({ anim, width, height }: CartoonHeroParams) => {
  const bobY = useSharedValue(0)
  const dashX = useSharedValue(0)
  const scale = useSharedValue(1)
  const opacity = useSharedValue(1)

  useEffect(() => {
    for (const v of [bobY, dashX, scale, opacity]) cancelAnimation(v)
    dashX.value = 0
    bobY.value = 0
    opacity.value = 1

    // Pose-swap pop — smooths the discrete SVG pose change.
    scale.value = 0.94
    scale.value = withSpring(1, { damping: 14, stiffness: 260 })

    if (anim === 'idle') {
      bobY.value = withRepeat(
        withSequence(
          withTiming(-3, { duration: 900, easing: sine }),
          withTiming(0, { duration: 900, easing: sine })
        ),
        -1,
        true
      )
      return
    }

    if (anim === 'attackBreathe') {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.04, { duration: 1600, easing: sine }),
          withTiming(1, { duration: 1400, easing: sine })
        ),
        -1,
        true
      )
      return
    }

    if (anim === 'attackSpecial') {
      // Trembling charge → deep recoil → powerful dash → held impact → spring back.
      const total = soldierAnimDurationMs(anim)
      const holdMs = Math.max(0, total - 240 - 100 - 210)
      dashX.value = withSequence(
        withTiming(-6, { duration: 60, easing: sine }),
        withTiming(-12, { duration: 60, easing: sine }),
        withTiming(-8, { duration: 60, easing: sine }),
        withTiming(-14, { duration: 60, easing: sine }),
        withTiming(36, { duration: 100, easing: Easing.out(Easing.quad) }),
        withDelay(holdMs, withSpring(0, { damping: 13, stiffness: 180 }))
      )
      scale.value = withSequence(
        withTiming(1.08, { duration: 240, easing: sine }),
        withTiming(1, { duration: 160, easing: Easing.out(Easing.quad) })
      )
      return
    }

    if (anim === 'attackWater' || anim === 'attackDistract') {
      // Anticipation (recoil) → dash toward the boss → held impact → spring back.
      const total = soldierAnimDurationMs(anim)
      const holdMs = Math.max(0, total - 130 - 90 - 210)
      dashX.value = withSequence(
        withTiming(-8, { duration: 130, easing: sine }),
        withTiming(26, { duration: 90, easing: Easing.out(Easing.quad) }),
        withDelay(holdMs, withSpring(0, { damping: 13, stiffness: 180 }))
      )
      return
    }

    if (anim === 'hurt') {
      dashX.value = withSequence(
        withTiming(-10, { duration: 60, easing: Easing.out(Easing.quad) }),
        withSpring(0, { damping: 9, stiffness: 200 })
      )
      return
    }

    if (anim === 'victory') {
      bobY.value = withRepeat(
        withSequence(
          withTiming(-9, { duration: 260, easing: Easing.out(Easing.quad) }),
          withTiming(0, { duration: 320, easing: Easing.bounce })
        ),
        -1,
        false
      )
      return
    }

    // death — settle on the ground, hold the final pose.
    bobY.value = -8
    bobY.value = withSequence(
      withTiming(4, { duration: 220, easing: Easing.in(Easing.quad) }),
      withSpring(0, { damping: 7, stiffness: 220 })
    )
  }, [anim, bobY, dashX, opacity, scale])

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: dashX.value },
      { translateY: bobY.value },
      { scale: scale.value },
    ],
  }))

  return (
    <Animated.View style={style} accessibilityLabel="Héros">
      <HeroArt pose={HERO_POSE[anim]} width={width} height={height} />
    </Animated.View>
  )
}

export type CartoonBossParams = {
  anim: BossAnim
  width: number
  height: number
  muted?: boolean
  variant?: BossVariant
}

export const CartoonBoss = ({ anim, width, height, muted = false, variant = 'medium' }: CartoonBossParams) => {
  const wobble = useSharedValue(1)
  const dashX = useSharedValue(0)
  const squashY = useSharedValue(1)
  const riseY = useSharedValue(0)
  const opacity = useSharedValue(1)

  useEffect(() => {
    for (const v of [wobble, dashX, squashY, riseY, opacity]) cancelAnimation(v)
    dashX.value = 0
    squashY.value = 1
    riseY.value = 0
    opacity.value = muted ? 0.35 : 1

    if (anim === 'idle') {
      wobble.value = withRepeat(
        withSequence(
          withTiming(1.035, { duration: 1300, easing: sine }),
          withTiming(1, { duration: 1300, easing: sine })
        ),
        -1,
        true
      )
      return
    }

    wobble.value = withTiming(1, { duration: 150 })

    if (anim === 'attack') {
      // Anticipation pull-back right, lunge left at the hero, spring home.
      const total = bossAnimDurationMs('attack')
      const holdMs = Math.max(0, total - 150 - 110 - 220)
      dashX.value = withSequence(
        withTiming(12, { duration: 150, easing: sine }),
        withTiming(-28, { duration: 110, easing: Easing.out(Easing.quad) }),
        withDelay(holdMs, withSpring(0, { damping: 12, stiffness: 170 }))
      )
      return
    }

    if (anim === 'hurt') {
      squashY.value = withSequence(
        withTiming(0.86, { duration: 70, easing: Easing.out(Easing.quad) }),
        withSpring(1, { damping: 8, stiffness: 190 })
      )
      dashX.value = withSequence(
        withTiming(12, { duration: 70, easing: Easing.out(Easing.quad) }),
        withSpring(0, { damping: 10, stiffness: 190 })
      )
      return
    }

    // death — smoke dissolves upward.
    opacity.value = withTiming(0, { duration: 560, easing: Easing.in(Easing.quad) })
    riseY.value = withTiming(-24, { duration: 560, easing: Easing.out(Easing.quad) })
    wobble.value = withTiming(0.72, { duration: 560, easing: Easing.in(Easing.quad) })
  }, [anim, muted, dashX, opacity, riseY, squashY, wobble])

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: dashX.value },
      { translateY: riseY.value },
      { scale: wobble.value },
      { scaleY: squashY.value },
    ],
  }))

  return (
    <Animated.View style={style} accessibilityLabel="L'Envie">
      <BossArt pose={BOSS_POSE[anim]} width={width} height={height} variant={variant} />
    </Animated.View>
  )
}
