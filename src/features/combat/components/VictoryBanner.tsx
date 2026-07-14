import { useEffect } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { FlowText } from '@/components/ui/flow-text'
import { GameCard } from '@/components/ui/game-card'
import { GameIcon } from '@/components/ui/game-icon'
import { ChunkyButton, CHUNKY_COLORS } from '@/components/ui/chunky-button'
import { ArenaFrame, ArenaPlinth } from './ArenaFrame'
import { CartoonHero } from './CartoonSprites'
import type { VictoryBannerParams } from '../types'

const coinReward = (xp: number) => Math.max(10, Math.round(xp * 0.6))

const CONFETTI = [
  { top: 70, left: 40, color: '#fbbf24', round: true },
  { top: 96, right: 52, color: '#22c55e', round: false },
  { top: 130, left: 84, color: '#c084fc', round: true },
  { top: 88, left: 170, color: '#ef4444', round: false },
  { top: 150, right: 96, color: '#fbbf24', round: false },
  { top: 116, right: 150, color: '#60a5fa', round: true },
] as const

const ConfettiPiece = ({
  top,
  left,
  right,
  color,
  round,
  delay,
}: {
  top: number
  left?: number
  right?: number
  color: string
  round: boolean
  delay: number
}) => {
  const scale = useSharedValue(0)
  const drift = useSharedValue(0)

  useEffect(() => {
    scale.value = withDelay(delay, withSpring(1, { damping: 9, stiffness: 160 }))
    drift.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(-6, { duration: 1100, easing: Easing.inOut(Easing.sin) }),
          withTiming(0, { duration: 1100, easing: Easing.inOut(Easing.sin) })
        ),
        -1,
        true
      )
    )
  }, [delay, drift, scale])

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: drift.value }, { rotate: '24deg' }],
  }))

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        style,
        {
          position: 'absolute',
          top,
          left,
          right,
          width: 8,
          height: 8,
          borderRadius: round ? 4 : 2,
          backgroundColor: color,
        },
      ]}
    />
  )
}

export const VictoryBanner = ({ xpGained, level, onContinue }: VictoryBannerParams) => {
  const coins = coinReward(xpGained)
  const bannerScale = useSharedValue(0.4)

  useEffect(() => {
    bannerScale.value = withDelay(200, withSpring(1, { damping: 10, stiffness: 140 }))
  }, [bannerScale])

  const bannerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bannerScale.value }],
  }))

  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      <View className="flex-1 px-5 pb-4 pt-3" style={{ gap: 16 }}>
        <ArenaFrame style={{ flex: 1, minHeight: 320 }}>
          {CONFETTI.map((c, i) => (
            <ConfettiPiece key={i} {...c} delay={250 + i * 90} />
          ))}
          <ArenaPlinth width={150} style={{ alignSelf: 'center', bottom: 36 }} />
          <View
            style={{
              position: 'absolute',
              bottom: 46,
              left: 0,
              right: 0,
              alignItems: 'center',
            }}
          >
            <CartoonHero anim="victory" width={140} height={175} />
          </View>

          <Animated.View
            style={[bannerStyle, { position: 'absolute', top: 34, alignSelf: 'center' }]}
          >
            <LinearGradient
              colors={['#fcd34d', '#fbbf24']}
              style={{
                paddingHorizontal: 34,
                paddingVertical: 10,
                borderRadius: 999,
                shadowColor: '#fbbf24',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.4,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
              <FlowText
                className="text-[26px] font-black"
                style={{ color: '#3b2000', letterSpacing: 1 }}
              >
                Victoire !
              </FlowText>
            </LinearGradient>
          </Animated.View>
        </ArenaFrame>

        <GameCard
          className="flex-row items-center justify-between px-5 py-4"
          style={{ borderColor: 'rgba(251,191,36,0.35)' }}
        >
          <View className="flex-row items-center gap-2">
            <GameIcon name="gem" size={18} color="#fbbf24" />
            <FlowText className="text-[17px] font-bold text-brand-gold">+{xpGained} XP</FlowText>
          </View>
          <View className="flex-row items-center gap-2">
            <GameIcon name="coin" size={18} color="#fbbf24" />
            <FlowText className="text-[17px] font-bold text-brand-gold">+{coins} or</FlowText>
          </View>
          <FlowText className="text-[13px] font-bold text-brand-success">Nv {level}</FlowText>
        </GameCard>

        <View
          className="min-h-[48px] justify-center rounded-2xl px-4 py-3"
          style={{
            backgroundColor: '#160826',
            borderWidth: 1.5,
            borderColor: 'rgba(168,85,247,0.45)',
          }}
        >
          <FlowText className="text-center text-sm font-bold leading-5 text-white">
            L&apos;Envie bat en retraite. Tu es plus fort qu&apos;elle.
          </FlowText>
        </View>

        <ChunkyButton
          label="Continuer"
          palette={CHUNKY_COLORS.green}
          height={58}
          fontSize={16}
          letterSpacing={1}
          onPress={onContinue}
        />
      </View>
    </SafeAreaView>
  )
}
