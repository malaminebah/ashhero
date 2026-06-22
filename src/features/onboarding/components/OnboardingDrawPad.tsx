import { useCallback, useRef, useState } from 'react'
import { PanResponder, Pressable, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { FLOW, flowShadow } from '@/constants/flowTheme'
import { OnboardingText } from './OnboardingText'

type Point = { x: number; y: number }

type OnboardingDrawPadParams = {
  onValidStroke: (valid: boolean) => void
}

const strokeLength = (points: Point[]) => {
  let len = 0
  for (let i = 1; i < points.length; i += 1) {
    const dx = points[i].x - points[i - 1].x
    const dy = points[i].y - points[i - 1].y
    len += Math.hypot(dx, dy)
  }
  return len
}

const isValidCheckmark = (points: Point[]) =>
  points.length >= 18 && strokeLength(points) >= 70

export const OnboardingDrawPad = ({ onValidStroke }: OnboardingDrawPadParams) => {
  const [points, setPoints] = useState<Point[]>([])
  const pointsRef = useRef<Point[]>([])

  const updatePoints = useCallback(
    (next: Point[]) => {
      pointsRef.current = next
      setPoints(next)
      onValidStroke(isValidCheckmark(next))
    },
    [onValidStroke]
  )

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const { locationX, locationY } = evt.nativeEvent
        updatePoints([{ x: locationX, y: locationY }])
      },
      onPanResponderMove: (evt) => {
        const { locationX, locationY } = evt.nativeEvent
        updatePoints([...pointsRef.current, { x: locationX, y: locationY }])
      },
    })
  ).current

  const onClear = () => updatePoints([])

  return (
    <View
      className="relative h-44 w-full overflow-hidden rounded-2xl border border-flow-border bg-flow-bg"
      style={flowShadow.canvas}
    >
      <Pressable
        onPress={onClear}
        hitSlop={12}
        className="absolute left-3 top-3 z-10 h-8 w-8 items-center justify-center rounded-full bg-flow-secondary"
      >
        <MaterialCommunityIcons name="close" size={16} color={FLOW.faint} />
      </Pressable>
      <View className="absolute inset-0" {...pan.panHandlers}>
        {points.map((p, i) => (
          <View
            key={`${p.x}-${p.y}-${i}`}
            className="absolute rounded-full bg-flow-text"
            style={{ left: p.x - 2.5, top: p.y - 2.5, width: 5, height: 5 }}
          />
        ))}
      </View>
      {points.length === 0 ? (
        <OnboardingText
          pointerEvents="none"
          className="absolute inset-0 text-center text-sm text-flow-faint"
          style={{ lineHeight: 176 }}
        >
          Trace une coche ici
        </OnboardingText>
      ) : null}
    </View>
  )
}
