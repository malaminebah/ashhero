import { useEffect } from 'react'
import { View, Text, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import { useTrackerStore } from '@/src/features/tracker/store'

// Simplified pixel-style character (gray blocks)
function CharacterDay0() {
  return (
    <View style={{ width: 96, height: 96, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ alignItems: 'center' }}>
        {/* Head */}
        <View style={{ width: 32, height: 20, backgroundColor: '#a1a1aa', borderRadius: 2 }} />
        <View style={{ flexDirection: 'row', gap: 8, marginTop: -2 }}>
          <View style={{ width: 10, height: 10, backgroundColor: '#71717a', borderRadius: 1 }} />
          <View style={{ width: 10, height: 10, backgroundColor: '#71717a', borderRadius: 1 }} />
        </View>
        {/* Torso */}
        <View style={{ width: 40, height: 8, backgroundColor: '#c0a080', borderRadius: 1, marginTop: 2 }} />
        <View style={{ width: 48, height: 28, backgroundColor: '#52525b', borderRadius: 2, marginTop: 2 }} />
        {/* Legs */}
        <View style={{ flexDirection: 'row', gap: 12, marginTop: 2 }}>
          <View style={{ width: 16, height: 14, backgroundColor: '#52525b', borderRadius: 1 }} />
          <View style={{ width: 16, height: 14, backgroundColor: '#52525b', borderRadius: 1 }} />
        </View>
      </View>
    </View>
  )
}

export default function WelcomeScreen() {
  const router = useRouter()
  const quitDate = useTrackerStore((s) => s.quitDate)

  const headerOpacity = useSharedValue(0)
  const charOpacity = useSharedValue(0)
  const ctaOpacity = useSharedValue(0)

  useEffect(() => {
    headerOpacity.value = withDelay(200, withTiming(1, { duration: 500 }))
    charOpacity.value = withDelay(400, withTiming(1, { duration: 600 }))
    ctaOpacity.value = withDelay(800, withTiming(1, { duration: 500 }))
  }, [headerOpacity, charOpacity, ctaOpacity])

  useEffect(() => {
    if (!quitDate) return
    const t = setTimeout(() => {
      router.replace('/(tabs)' as never)
    }, 100)
    return () => clearTimeout(t)
  }, [quitDate, router])

  const headerStyle = useAnimatedStyle(() => ({ opacity: headerOpacity.value }))
  const charStyle = useAnimatedStyle(() => ({ opacity: charOpacity.value }))
  const ctaStyle = useAnimatedStyle(() => ({ opacity: ctaOpacity.value }))

  const onStart = () => {
    router.push('/onboarding/step1' as never)
  }

  return (
    <View className="flex-1 bg-brand-bg pt-16 pb-12 px-6 justify-between">
      {/* Header */}
      <Animated.View style={[headerStyle, { alignItems: 'center' }]}>
        <Text className="text-[9px] tracking-[5px] text-white/20 uppercase font-mono mb-2">
          ⚔  QUÊTE DE LIBERTÉ  ⚔
        </Text>
        <Text className="text-2xl font-bold text-white tracking-wider">
          ASH<Text className="text-brand-accent">HERO</Text>
        </Text>
      </Animated.View>

      {/* Character area */}
      <Animated.View style={[charStyle, { alignItems: 'center', flex: 1, justifyContent: 'center' }]}>
        {/* Outer ring / halo */}
        <View className="w-[130px] h-[130px] rounded-full border border-brand-accent/20 items-center justify-center">
          {/* Inner ring */}
          <View className="w-[100px] h-[100px] rounded-full border border-brand-accent/10 bg-brand-accent/5 items-center justify-center">
            <CharacterDay0 />
          </View>
        </View>

        <Text className="text-white/50 text-sm font-mono mt-6 tracking-wide">
          Ton guerrier t'attend.
        </Text>
        <Text className="text-white/15 text-[10px] font-mono tracking-widest uppercase mt-1">
          Jour 0 · Niveau 1
        </Text>

        {/* XP bar */}
        <View className="w-40 mt-4">
          <View className="flex-row gap-0.5">
            {Array.from({ length: 16 }).map((_, i) => (
              <View
                key={i}
                className="flex-1 h-1 bg-white/5 rounded-sm"
              />
            ))}
          </View>
          <View className="flex-row justify-between mt-1">
            <Text className="text-[8px] text-white/15 font-mono">0 XP</Text>
            <Text className="text-[8px] text-white/15 font-mono">??? XP</Text>
          </View>
        </View>
      </Animated.View>

      {/* CTA */}
      <Animated.View style={[ctaStyle]}>
        <Text className="text-center text-white/50 text-xs font-mono leading-6 mb-3">
          Chaque heure sans fumer,{'\n'}
          <Text className="text-brand-accent">ton guerrier devient plus fort.</Text>
        </Text>

        <Pressable
          onPress={onStart}
          className="w-full py-4 rounded-2xl items-center justify-center bg-brand-accentDark active:opacity-90"
          style={{
            shadowColor: '#7c3aed',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.45,
            shadowRadius: 32,
            elevation: 8,
          }}
        >
          <Text className="text-white text-xs font-mono tracking-[3px] uppercase">
            ⚔  Commencer l'aventure
          </Text>
        </Pressable>

        <Text className="text-center text-white/15 text-[9px] font-mono mt-4 tracking-widest">
          J'ai déjà un compte
        </Text>
      </Animated.View>
    </View>
  )
}
