import Svg, { Circle, Ellipse, G, Path, Rect } from 'react-native-svg'

export type HeroPose = 'idle' | 'breathe' | 'attack' | 'hurt' | 'victory' | 'death'

export type HeroSpriteParams = {
  pose: HeroPose
  width: number
  height: number
}

const SKIN = '#FDDCB5'
const SUIT = '#2D3748'
const BOOT = '#1E293B'
const STRIPE = '#68D391'

const Legs = ({ y = 136 }: { y?: number }) => (
  <>
    <Rect x={47} y={y} width={17} height={26} rx={8} fill={BOOT} />
    <Rect x={76} y={y} width={17} height={26} rx={8} fill={BOOT} />
  </>
)

const Body = ({ y = 82 }: { y?: number }) => (
  <>
    <Rect x={38} y={y} width={64} height={58} rx={18} fill={SUIT} />
    <Rect x={63} y={y} width={14} height={58} rx={6} fill={STRIPE} opacity={0.7} />
  </>
)

const Head = ({ cy = 50 }: { cy?: number }) => (
  <>
    <Ellipse cx={70} cy={cy} rx={34} ry={33} fill={SUIT} />
    <Circle cx={70} cy={cy + 2} r={26} fill={SKIN} />
    <Path
      d={`M45 ${cy - 10} Q70 ${cy - 28} 95 ${cy - 10} L95 ${cy - 17} Q70 ${cy - 36} 45 ${cy - 17} Z`}
      fill={SUIT}
    />
  </>
)

const POSES: Record<HeroPose, { viewBox: string; node: React.ReactElement }> = {
  idle: {
    viewBox: '0 0 140 170',
    node: (
      <>
        <Head />
        <Circle cx={61} cy={52} r={3.5} fill={SUIT} />
        <Circle cx={79} cy={52} r={3.5} fill={SUIT} />
        <Path d="M62 63 Q70 69 78 63" stroke={SUIT} strokeWidth={2.5} fill="none" strokeLinecap="round" />
        <Body />
        <Rect x={29} y={88} width={14} height={42} rx={7} fill={SUIT} />
        <Rect x={97} y={88} width={14} height={42} rx={7} fill={SUIT} />
        <Legs />
      </>
    ),
  },
  breathe: {
    viewBox: '0 0 140 170',
    node: (
      <>
        <Head />
        <Path d="M56 52 Q61 56 66 52" stroke={SUIT} strokeWidth={2.5} fill="none" strokeLinecap="round" />
        <Path d="M74 52 Q79 56 84 52" stroke={SUIT} strokeWidth={2.5} fill="none" strokeLinecap="round" />
        <Path d="M64 64 Q70 68 76 64" stroke={SUIT} strokeWidth={2.5} fill="none" strokeLinecap="round" />
        <Body />
        <Rect x={33} y={92} width={14} height={38} rx={7} fill={SUIT} transform="rotate(14 40 92)" />
        <Rect x={93} y={92} width={14} height={38} rx={7} fill={SUIT} transform="rotate(-14 100 92)" />
        <Legs />
      </>
    ),
  },
  attack: {
    viewBox: '0 0 150 170',
    node: (
      <G transform="rotate(6 75 90)">
        <Head />
        <Path d="M55 46 L67 49" stroke={SUIT} strokeWidth={3} strokeLinecap="round" />
        <Path d="M85 49 L97 45" stroke={SUIT} strokeWidth={3} strokeLinecap="round" />
        <Circle cx={62} cy={54} r={3.5} fill={SUIT} />
        <Circle cx={80} cy={54} r={3.5} fill={SUIT} />
        <Path d="M64 64 L78 64" stroke={SUIT} strokeWidth={2.5} strokeLinecap="round" />
        <Body />
        <Rect x={30} y={92} width={14} height={40} rx={7} fill={SUIT} />
        <Rect x={96} y={86} width={46} height={14} rx={7} fill={SUIT} />
        <Circle cx={142} cy={93} r={7} fill={SKIN} />
        <Rect x={45} y={136} width={17} height={26} rx={8} fill={BOOT} />
        <Rect x={80} y={136} width={17} height={26} rx={8} fill={BOOT} transform="rotate(10 88 149)" />
      </G>
    ),
  },
  hurt: {
    viewBox: '0 0 140 170',
    node: (
      <G transform="rotate(-9 70 100)">
        <Head />
        <Path d="M57 48 L65 55 M65 48 L57 55" stroke={SUIT} strokeWidth={2.5} strokeLinecap="round" />
        <Path d="M75 48 L83 55 M83 48 L75 55" stroke={SUIT} strokeWidth={2.5} strokeLinecap="round" />
        <Ellipse cx={70} cy={65} rx={5} ry={6} fill={SUIT} />
        <Body />
        <Rect x={26} y={86} width={14} height={40} rx={7} fill={SUIT} transform="rotate(-22 33 86)" />
        <Rect x={100} y={86} width={14} height={40} rx={7} fill={SUIT} transform="rotate(22 107 86)" />
        <Legs />
      </G>
    ),
  },
  victory: {
    viewBox: '0 0 140 175',
    node: (
      <>
        <Head cy={55} />
        <Path d="M55 55 Q61 50 66 55" stroke={SUIT} strokeWidth={2.5} fill="none" strokeLinecap="round" />
        <Path d="M74 55 Q80 50 85 55" stroke={SUIT} strokeWidth={2.5} fill="none" strokeLinecap="round" />
        <Path d="M60 66 Q70 76 80 66" stroke={SUIT} strokeWidth={3} fill="none" strokeLinecap="round" />
        <Body y={87} />
        <Rect x={24} y={46} width={14} height={46} rx={7} fill={SUIT} transform="rotate(28 31 69)" />
        <Rect x={102} y={46} width={14} height={46} rx={7} fill={SUIT} transform="rotate(-28 109 69)" />
        <Legs y={141} />
      </>
    ),
  },
  death: {
    viewBox: '0 0 160 120',
    node: (
      <G transform="rotate(-76 80 60)" opacity={0.85}>
        <Ellipse cx={80} cy={30} rx={30} ry={29} fill={SUIT} />
        <Circle cx={80} cy={32} r={23} fill={SKIN} />
        <Path d="M69 28 L76 34 M76 28 L69 34" stroke={SUIT} strokeWidth={2.5} strokeLinecap="round" />
        <Path d="M85 28 L92 34 M92 28 L85 34" stroke={SUIT} strokeWidth={2.5} strokeLinecap="round" />
        <Path d="M73 43 Q80 39 87 43" stroke={SUIT} strokeWidth={2.5} fill="none" strokeLinecap="round" />
        <Rect x={52} y={58} width={56} height={50} rx={16} fill={SUIT} />
        <Rect x={74} y={58} width={12} height={50} rx={5} fill={STRIPE} opacity={0.6} />
      </G>
    ),
  },
}

export const HeroSprite = ({ pose, width, height }: HeroSpriteParams) => (
  <Svg width={width} height={height} viewBox={POSES[pose].viewBox}>
    {POSES[pose].node}
  </Svg>
)
