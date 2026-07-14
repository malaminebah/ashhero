import { View } from 'react-native'
import Svg, { Defs, LinearGradient, Polygon, Stop } from 'react-native-svg'
import { GameIcon, type GameIconName } from '@/components/ui/game-icon'

export type HexBadgeTint = 'gold' | 'green' | 'blue' | 'violet'

/** Mockup hex gradients (frame 17) — top color, bottom color, inner icon color. */
const TINTS: Record<HexBadgeTint, { from: string; to: string; icon: string }> = {
  gold: { from: '#fcd34d', to: '#f59e0b', icon: '#7c4a03' },
  green: { from: '#4ade80', to: '#16a34a', icon: '#052e16' },
  blue: { from: '#93c5fd', to: '#2563eb', icon: '#0b2a6b' },
  violet: { from: '#d8b4fe', to: '#9333ea', icon: '#3b0764' },
}

export type HexBadgeParams = {
  icon: GameIconName
  tint: HexBadgeTint
  /** Hex width — height is width × 58/52 (mockup ratio). */
  size: number
  locked?: boolean
}

export const HexBadge = ({ icon, tint, size, locked = false }: HexBadgeParams) => {
  const height = Math.round((size * 58) / 52)
  const theme = TINTS[tint]
  const gradientId = `hex-${tint}`

  return (
    <View style={{ width: size, height, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={height} viewBox="0 0 52 58" style={{ position: 'absolute' }}>
        <Defs>
          <LinearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={locked ? '#241238' : theme.from} />
            <Stop offset="1" stopColor={locked ? '#1d0b2b' : theme.to} />
          </LinearGradient>
        </Defs>
        <Polygon
          points="26,0 52,14.5 52,43.5 26,58 0,43.5 0,14.5"
          fill={`url(#${gradientId})`}
          stroke={locked ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.25)'}
          strokeWidth={1.5}
        />
      </Svg>
      <GameIcon
        name={locked ? 'lock' : icon}
        size={Math.round(size * 0.42)}
        color={locked ? '#5b4a75' : theme.icon}
      />
    </View>
  )
}
