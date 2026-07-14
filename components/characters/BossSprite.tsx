import Svg, { Circle, Defs, Ellipse, G, Path, RadialGradient, Stop } from 'react-native-svg'

export type BossPose = 'idle' | 'attack' | 'hurt'

export type BossVariant = 'soft' | 'medium' | 'hard'

export type BossSpriteParams = {
  pose: BossPose
  width: number
  height: number
  variant?: BossVariant
}

type BossPalette = {
  gradTop: string
  gradTopBright: string
  gradBottom: string
  bubble: string
  bubbleSoft: string
  blob: string
  arm: string
  eye: string
  line: string
}

/** soft = misty blue, medium = the original purple Envie, hard = ember red. */
const PALETTES: Record<BossVariant, BossPalette> = {
  soft: {
    gradTop: '#93c5fd',
    gradTopBright: '#bfdbfe',
    gradBottom: '#1e40af',
    bubble: '#60a5fa',
    bubbleSoft: '#93c5fd',
    blob: '#1d4ed8',
    arm: '#2563eb',
    eye: '#eff6ff',
    line: '#172554',
  },
  medium: {
    gradTop: '#c084fc',
    gradTopBright: '#d8b4fe',
    gradBottom: '#581c87',
    bubble: '#a855f7',
    bubbleSoft: '#c084fc',
    blob: '#6b21a8',
    arm: '#7e22ce',
    eye: '#f5e7ff',
    line: '#3b0764',
  },
  hard: {
    gradTop: '#f87171',
    gradTopBright: '#fca5a5',
    gradBottom: '#7f1d1d',
    bubble: '#ef4444',
    bubbleSoft: '#fca5a5',
    blob: '#991b1b',
    arm: '#b91c1c',
    eye: '#fef2f2',
    line: '#450a0a',
  },
}

const BODY_IDLE = 'M85 18 C122 18 148 50 142 92 C154 114 136 152 85 152 C34 152 16 114 28 92 C22 50 48 18 85 18 Z'
const BODY_ATTACK = 'M110 18 C147 18 173 50 167 92 C179 114 161 152 110 152 C59 152 41 114 53 92 C47 50 73 18 110 18 Z'

const buildPoses = (
  p: BossPalette,
  variant: BossVariant
): Record<BossPose, { viewBox: string; node: React.ReactElement }> => ({
  idle: {
    viewBox: '0 0 170 170',
    node: (
      <>
        <Defs>
          <RadialGradient id={`bossIdleGrad-${variant}`} cx="0.5" cy="0.38" r="0.75">
            <Stop offset="0" stopColor={p.gradTop} />
            <Stop offset="1" stopColor={p.gradBottom} />
          </RadialGradient>
        </Defs>
        <Circle cx={50} cy={34} r={9} fill={p.bubble} opacity={0.35} />
        <Circle cx={122} cy={26} r={6} fill={p.bubble} opacity={0.45} />
        <Circle cx={140} cy={52} r={5} fill={p.bubbleSoft} opacity={0.35} />
        <Path d={BODY_IDLE} fill={`url(#bossIdleGrad-${variant})`} />
        <Circle cx={42} cy={130} r={12} fill={p.blob} opacity={0.8} />
        <Circle cx={130} cy={134} r={10} fill={p.blob} opacity={0.8} />
        <Path d="M56 66 L82 76 L58 84 Z" fill={p.eye} />
        <Path d="M114 66 L88 76 L112 84 Z" fill={p.eye} />
        <Path
          d="M62 108 L72 100 L82 108 L92 100 L102 108 L108 102"
          stroke={p.line}
          strokeWidth={4}
          fill="none"
          strokeLinecap="round"
        />
      </>
    ),
  },
  attack: {
    viewBox: '0 0 200 170',
    node: (
      <>
        <Defs>
          <RadialGradient id={`bossAttackGrad-${variant}`} cx="0.55" cy="0.38" r="0.75">
            <Stop offset="0" stopColor={p.gradTopBright} />
            <Stop offset="1" stopColor={p.gradBottom} />
          </RadialGradient>
        </Defs>
        <G transform="rotate(-8 100 90)">
          <Path d={BODY_ATTACK} fill={`url(#bossAttackGrad-${variant})`} />
          <Path d="M56 96 C34 88 20 96 6 84 C22 108 40 108 58 116 Z" fill={p.arm} />
          <Circle cx={14} cy={92} r={8} fill={p.bubble} opacity={0.7} />
          <Path d="M80 62 L108 74 L82 84 Z" fill="#fff" />
          <Path d="M140 62 L112 74 L138 84 Z" fill="#fff" />
          <Path
            d="M84 110 L96 98 L108 110 L120 98 L132 110"
            stroke={p.line}
            strokeWidth={5}
            fill="none"
            strokeLinecap="round"
          />
        </G>
      </>
    ),
  },
  hurt: {
    viewBox: '0 0 170 170',
    node: (
      <>
        <Defs>
          <RadialGradient id={`bossHurtGrad-${variant}`} cx="0.5" cy="0.4" r="0.75">
            <Stop offset="0" stopColor={p.bubble} />
            <Stop offset="1" stopColor={p.gradBottom} />
          </RadialGradient>
        </Defs>
        <G transform="scale(1 0.88) translate(0 22)">
          <Path d={BODY_IDLE} fill={`url(#bossHurtGrad-${variant})`} />
          <Path d="M56 64 L68 74 M68 64 L56 74" stroke={p.eye} strokeWidth={5} strokeLinecap="round" />
          <Path d="M102 64 L114 74 M114 64 L102 74" stroke={p.eye} strokeWidth={5} strokeLinecap="round" />
          <Ellipse cx={85} cy={104} rx={12} ry={14} fill={p.line} />
        </G>
        <Circle cx={30} cy={40} r={7} fill={p.bubbleSoft} opacity={0.5} />
        <Circle cx={146} cy={34} r={6} fill={p.bubbleSoft} opacity={0.5} />
      </>
    ),
  },
})

const VARIANT_POSES: Record<BossVariant, ReturnType<typeof buildPoses>> = {
  soft: buildPoses(PALETTES.soft, 'soft'),
  medium: buildPoses(PALETTES.medium, 'medium'),
  hard: buildPoses(PALETTES.hard, 'hard'),
}

export const BossSprite = ({ pose, width, height, variant = 'medium' }: BossSpriteParams) => (
  <Svg width={width} height={height} viewBox={VARIANT_POSES[variant][pose].viewBox}>
    {VARIANT_POSES[variant][pose].node}
  </Svg>
)
