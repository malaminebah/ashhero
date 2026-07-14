import { Image } from 'expo-image'
import { View } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { useSheetFrameAnim } from '../hooks/useSheetFrameAnim'
import type { SheetSpriteParams } from '../types'

const AnimatedImage = Animated.createAnimatedComponent(Image)

export const SheetSprite = ({
  sheet,
  sheetW,
  sheetH,
  sheetCols,
  sheetRows,
  displayScale,
  row,
  col = 0,
  frames,
  frameMs,
  loop,
  animKey,
  accessibilityLabel,
  muted = false,
}: SheetSpriteParams) => {
  const progress = useSheetFrameAnim({ frames, frameMs, loop }, animKey)
  const sheetDisplayW = sheetW * displayScale
  const sheetDisplayH = sheetH * displayScale
  const cellW = sheetDisplayW / sheetCols
  const cellH = sheetDisplayH / sheetRows

  const imageStyle = useAnimatedStyle(() => {
    const raw = Math.floor(progress.value)
    const index = loop
      ? ((raw % frames) + frames) % frames
      : Math.min(Math.max(raw, 0), frames - 1)

    return {
      position: 'absolute' as const,
      width: sheetDisplayW,
      height: sheetDisplayH,
      left: -(col + index) * cellW,
      top: -row * cellH,
    }
  })

  return (
    <View
      style={{
        width: cellW,
        height: cellH,
        overflow: 'hidden',
        backgroundColor: 'transparent',
        opacity: muted ? 0.35 : 1,
      }}
      accessibilityLabel={accessibilityLabel}
    >
      <AnimatedImage
        source={sheet}
        style={imageStyle}
        contentFit="fill"
        allowDownscaling={false}
      />
    </View>
  )
}
