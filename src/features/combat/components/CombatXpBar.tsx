import { useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { FlowText } from '@/components/ui/flow-text'
import { GameIcon } from '@/components/ui/game-icon'
import { specialMeterState } from '@/src/features/tracker/utils/levelProgress'
import type { CombatXpBarParams } from '../types'

const FILL_MS = 350

/** Mockup "Spécial" meter — gold bar-xp under the player HP bar. */
export const CombatXpBar = ({ xpStart, sessionXp, specialsUsed, locked }: CombatXpBarParams) => {
  const { pct, ready } = specialMeterState(xpStart, sessionXp, specialsUsed)
  const fillPct = useSharedValue(pct)
  const pulse = useSharedValue(1)

  useEffect(() => {
    fillPct.value = withTiming(pct, { duration: FILL_MS })
  }, [pct, fillPct])

  useEffect(() => {
    if (ready) {
      pulse.value = withRepeat(
        withSequence(withTiming(0.6, { duration: 420 }), withTiming(1, { duration: 420 })),
        -1,
        true
      )
    } else {
      pulse.value = withTiming(1, { duration: 200 })
    }
  }, [ready, pulse])

  const fillStyle = useAnimatedStyle(() => ({
    width: `${fillPct.value}%`,
    opacity: pulse.value,
  }))

  return (
    <View className="w-full">
      <View className="mb-1 flex-row items-center justify-between">
        <FlowText className="text-[11px] font-bold uppercase tracking-[0.6px] text-brand-gold">
          Spécial
        </FlowText>
        {locked ? (
          <GameIcon name="lock" size={12} color="#8b7aa8" />
        ) : (
          <FlowText className="text-[11px] font-bold uppercase tracking-[0.6px] text-brand-gold">
            {ready ? 'Prêt !' : `${Math.round(pct)} %`}
          </FlowText>
        )}
      </View>
      <View
        style={{
          height: 9,
          borderRadius: 5,
          backgroundColor: '#1d0b2b',
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.15)',
          overflow: 'hidden',
        }}
      >
        <Animated.View style={[fillStyle, { height: '100%', borderRadius: 4, overflow: 'hidden' }]}>
          <LinearGradient
            colors={['#f59e0b', '#fbbf24']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ width: '100%', height: '100%' }}
          />
        </Animated.View>
      </View>
    </View>
  )
}
