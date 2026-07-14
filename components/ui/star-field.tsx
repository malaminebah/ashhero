import { View } from 'react-native'

const STARS = [
  { x: 28, y: 22, opacity: 1 },
  { x: 70, y: 34, opacity: 1 },
  { x: 120, y: 54, opacity: 0.6 },
  { x: 176, y: 26, opacity: 1 },
  { x: 234, y: 48, opacity: 0.7 },
  { x: 286, y: 32, opacity: 1 },
  { x: 324, y: 60, opacity: 0.5 },
  { x: 208, y: 68, opacity: 0.45 },
] as const

export type StarFieldParams = { opacity?: number }

export const StarField = ({ opacity = 1 }: StarFieldParams) => (
  <View pointerEvents="none" style={{ position: 'absolute', inset: 0, opacity }}>
    {STARS.map((s, i) => (
      <View
        key={i}
        style={{
          position: 'absolute',
          left: s.x,
          top: s.y,
          width: 2,
          height: 2,
          borderRadius: 1,
          backgroundColor: '#fff',
          opacity: s.opacity,
        }}
      />
    ))}
  </View>
)
