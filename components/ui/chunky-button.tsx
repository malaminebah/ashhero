import { Pressable, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { FlowText } from '@/components/ui/flow-text'
import { GameIcon, type GameIconName } from '@/components/ui/game-icon'

const CHUNKY_DEPTH = 5
const CHUNKY_RADIUS = 18

export type ChunkyPalette = {
  face: string
  edge: string
  text?: string
}

/** Mockup palettes — ck-g / ck-b / ck-gr / ck-o. */
export const CHUNKY_COLORS = {
  green: { face: '#22c55e', edge: '#15803d' },
  blue: { face: '#3b82f6', edge: '#1d4ed8' },
  gray: { face: '#64748b', edge: '#334155' },
  gold: { face: '#fbbf24', edge: '#b45309', text: '#3b2000' },
  violet: { face: '#9333ea', edge: '#581c87' },
} as const satisfies Record<string, ChunkyPalette>

export type ChunkyButtonParams = {
  label: string
  palette: ChunkyPalette
  onPress: () => void
  disabled?: boolean
  icon?: GameIconName
  sublabel?: string
  badge?: string
  height?: number
  fontSize?: number
  letterSpacing?: number
  accessibilityLabel?: string
}

export const ChunkyButton = ({
  label,
  palette,
  onPress,
  disabled = false,
  icon,
  sublabel,
  badge,
  height = 66,
  fontSize = 14,
  letterSpacing = 0.4,
  accessibilityLabel,
}: ChunkyButtonParams) => {
  const pressY = useSharedValue(0)
  const textColor = palette.text ?? '#ffffff'

  const faceAnim = useAnimatedStyle(() => ({
    transform: [{ translateY: pressY.value }],
  }))

  const onPressIn = () => {
    if (disabled) return
    pressY.value = withTiming(CHUNKY_DEPTH - 1, { duration: 65 })
  }

  const onPressOut = () => {
    pressY.value = withTiming(0, { duration: 100 })
  }

  return (
    <View style={{ opacity: disabled ? 0.45 : 1 }}>
      <View
        style={{
          backgroundColor: palette.edge,
          borderRadius: CHUNKY_RADIUS,
          paddingBottom: CHUNKY_DEPTH,
        }}
      >
        <Pressable
          onPress={onPress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          disabled={disabled}
          accessibilityRole="button"
          accessibilityLabel={accessibilityLabel ?? label}
          accessibilityState={{ disabled }}
          hitSlop={4}
        >
          <Animated.View
            style={[
              faceAnim,
              {
                height: height - CHUNKY_DEPTH,
                borderRadius: CHUNKY_RADIUS,
                backgroundColor: palette.face,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 14,
                gap: 3,
              },
            ]}
          >
            {icon ? <GameIcon name={icon} size={20} color={textColor} /> : null}
            <FlowText
              style={{
                color: textColor,
                fontSize,
                fontWeight: '800',
                letterSpacing,
                textAlign: 'center',
              }}
            >
              {label}
            </FlowText>
            {sublabel ? (
              <FlowText
                style={{ color: textColor, fontSize: 10, fontWeight: '800', opacity: 0.9 }}
              >
                {sublabel}
              </FlowText>
            ) : null}
          </Animated.View>
        </Pressable>
      </View>

      {badge ? (
        <View
          style={{
            position: 'absolute',
            top: -8,
            right: -6,
            backgroundColor: '#0f0020',
            borderWidth: 1.5,
            borderColor: 'rgba(255,255,255,0.25)',
            borderRadius: 999,
            paddingHorizontal: 7,
            paddingVertical: 3,
          }}
        >
          <FlowText style={{ color: '#e9d5ff', fontSize: 9, fontWeight: '800' }}>{badge}</FlowText>
        </View>
      ) : null}
    </View>
  )
}
