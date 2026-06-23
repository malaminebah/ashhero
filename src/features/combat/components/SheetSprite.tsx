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
  // Round the cell once and derive everything from it: each cell is an exact
  // integer size, so translate offsets never drift sub-pixel (no frame bleed).
  const cell = Math.round(frameSize * displayScale)
  const viewport = cell
  const rows = Math.round(sheetH / frameSize)
  const sheetDisplayW = sheetCols * cell
  const sheetDisplayH = rows * cell

  const imageStyle = useAnimatedStyle(() => {
    const raw = Math.floor(frame.value)
    const index = loop
      ? ((raw % frames) + frames) % frames
      : Math.min(Math.max(raw, 0), frames - 1)

    return {
      width: sheetDisplayW,
      height: sheetDisplayH,
      transform: [
        { translateX: -index * cell },
        { translateY: -row * cell },
      ],
    }
  })

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
