import { useEffect, type ReactNode } from 'react'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { flowShadow } from '@/constants/flowTheme'
import { FlowBackButton } from './flow-back-button'
import { FlowText } from './flow-text'

export type FlipDetailScreenParams = {
  onClose: () => void
  front: ReactNode
  back: ReactNode
  autoFlip?: boolean
}

export const FlipDetailScreen = ({
  onClose,
  front,
  back,
  autoFlip = true,
}: FlipDetailScreenParams) => {
  const flipped = useSharedValue(0)

  useEffect(() => {
    if (autoFlip) {
      flipped.value = withDelay(450, withTiming(1, { duration: 650 }))
    }
  }, [autoFlip, flipped])

  const toggle = () => {
    flipped.value = withTiming(flipped.value === 0 ? 1 : 0, { duration: 550 })
  }

  const frontStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipped.value, [0, 1], [0, 180])
    return {
      transform: [{ perspective: 1200 }, { rotateY: `${rotateY}deg` }],
      backfaceVisibility: 'hidden',
    }
  })

  const backStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipped.value, [0, 1], [180, 360])
    return {
      transform: [{ perspective: 1200 }, { rotateY: `${rotateY}deg` }],
      backfaceVisibility: 'hidden',
    }
  })

  return (
    <SafeAreaView className="flex-1 bg-flow-bg px-5 py-3">
      <StatusBar style="dark" />
      <FlowBackButton onPress={onClose} label="Fermer" />
      <FlowText className="mb-3 text-center text-xs text-flow-faint">
        Appuie sur la carte pour la retourner
      </FlowText>
      <Pressable
        onPress={toggle}
        accessibilityRole="button"
        accessibilityLabel="Retourner la carte"
        className="flex-1 active:opacity-95"
      >
        <View className="flex-1">
          <Animated.View
            style={[StyleSheet.absoluteFillObject, flowShadow.card, frontStyle]}
            className="overflow-hidden rounded-3xl border border-flow-border bg-flow-secondary"
          >
            <View className="flex-1 items-center justify-center px-6 py-8">{front}</View>
          </Animated.View>
          <Animated.View
            style={[StyleSheet.absoluteFillObject, flowShadow.card, backStyle]}
            className="overflow-hidden rounded-3xl border border-flow-border bg-flow-bg"
          >
            <ScrollView
              className="flex-1"
              contentContainerStyle={{ padding: 20, paddingBottom: 28 }}
              showsVerticalScrollIndicator={false}
            >
              {back}
            </ScrollView>
          </Animated.View>
        </View>
      </Pressable>
    </SafeAreaView>
  )
}
