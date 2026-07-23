import { useEffect, type ReactNode } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
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

  const tap = Gesture.Tap()
    .maxDuration(250)
    .onEnd(() => {
      flipped.value = withTiming(flipped.value === 0 ? 1 : 0, { duration: 550 })
    })

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
    <SafeAreaView className="flex-1 bg-brand-bg" edges={['top', 'left', 'right']}>
      <StatusBar style="light" />
      <View className="px-6 pt-2">
        <FlowBackButton onPress={onClose} label="Retour" />
        <View className="mb-4 flex-row items-center justify-center gap-1.5">
          <MaterialIcons name="import-export" size={14} color="#8b7aa8" />
          <FlowText className="text-xs text-brand-muted">
            Appuie sur la carte pour la retourner
          </FlowText>
        </View>
      </View>

      <GestureDetector gesture={tap}>
        <View
          accessibilityRole="button"
          accessibilityLabel="Retourner la carte"
          className="mx-6 mb-6 min-h-[420px] flex-1"
        >
          <Animated.View
            style={[StyleSheet.absoluteFillObject, frontStyle]}
            className="overflow-hidden rounded-[20px] border border-[rgba(168,85,247,0.35)] bg-brand-card"
          >
            <ScrollView
              className="flex-1"
              contentContainerStyle={{
                flexGrow: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 24,
                paddingVertical: 40,
              }}
              showsVerticalScrollIndicator={false}
            >
              {front}
            </ScrollView>
          </Animated.View>
          <Animated.View
            style={[StyleSheet.absoluteFillObject, backStyle]}
            className="overflow-hidden rounded-[20px] border border-[rgba(255,255,255,0.07)] bg-brand-card"
          >
            <ScrollView
              className="flex-1"
              contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 32 }}
              showsVerticalScrollIndicator={false}
            >
              {back}
            </ScrollView>
          </Animated.View>
        </View>
      </GestureDetector>
    </SafeAreaView>
  )
}
