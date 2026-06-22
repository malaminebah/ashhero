import { Image } from 'expo-image'
import { View } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { useSheetFrameAnim } from '../hooks/useSheetFrameAnim'
import type { SheetSpriteParams } from '../types'

const AnimatedImage = Animated.createAnimatedComponent(Image)

export const SheetSprite = ({
  sheet,
  frameSize,
  sheetH,
  sheetCols,
  displayScale,
  row,
  frames,
  frameMs,
  loop,
  animKey,
  accessibilityLabel,
  muted = false,
}: SheetSpriteParams) => {
  const frame = useSheetFrameAnim({ frames, frameMs, loop }, animKey)
  const viewport = Math.round(frameSize * displayScale)
  const sheetDisplayW = sheetCols * frameSize * displayScale
  const sheetDisplayH = sheetH * displayScale

  const imageStyle = useAnimatedStyle(() => ({
    width: sheetDisplayW,
    height: sheetDisplayH,
    transform: [
      { translateX: -frame.value * frameSize * displayScale },
      { translateY: -row * frameSize * displayScale },
    ],
  }))

  return (
    <View
      style={{
        width: viewport,
        height: viewport,
        overflow: 'hidden',
        opacity: muted ? 0.35 : 1,
      }}
      accessibilityLabel={accessibilityLabel}
    >
      <AnimatedImage source={sheet} style={imageStyle} contentFit="fill" />
    </View>
  )
}
