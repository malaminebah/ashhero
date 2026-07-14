import Svg, { Circle, Defs, Ellipse, G, Path, RadialGradient, Stop } from 'react-native-svg'

export type BossPose = 'idle' | 'attack' | 'hurt'

export type BossSpriteParams = {
  pose: BossPose
  width: number
  height: number
}

const BODY_IDLE = 'M85 18 C122 18 148 50 142 92 C154 114 136 152 85 152 C34 152 16 114 28 92 C22 50 48 18 85 18 Z'
const BODY_ATTACK = 'M110 18 C147 18 173 50 167 92 C179 114 161 152 110 152 C59 152 41 114 53 92 C47 50 73 18 110 18 Z'

const POSES: Record<BossPose, { viewBox: string; node: React.ReactElement }> = {
  idle: {
    viewBox: '0 0 170 170',
    node: (
      <>
        <Defs>
          <RadialGradient id="bossIdleGrad" cx="0.5" cy="0.38" r="0.75">
            <Stop offset="0" stopColor="#c084fc" />
            <Stop offset="1" stopColor="#581c87" />
          </RadialGradient>
        </Defs>
        <Circle cx={50} cy={34} r={9} fill="#a855f7" opacity={0.35} />
        <Circle cx={122} cy={26} r={6} fill="#a855f7" opacity={0.45} />
        <Circle cx={140} cy={52} r={5} fill="#c084fc" opacity={0.35} />
        <Path d={BODY_IDLE} fill="url(#bossIdleGrad)" />
        <Circle cx={42} cy={130} r={12} fill="#6b21a8" opacity={0.8} />
        <Circle cx={130} cy={134} r={10} fill="#6b21a8" opacity={0.8} />
        <Path d="M56 66 L82 76 L58 84 Z" fill="#f5e7ff" />
        <Path d="M114 66 L88 76 L112 84 Z" fill="#f5e7ff" />
        <Path
          d="M62 108 L72 100 L82 108 L92 100 L102 108 L108 102"
          stroke="#3b0764"
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
          <RadialGradient id="bossAttackGrad" cx="0.55" cy="0.38" r="0.75">
            <Stop offset="0" stopColor="#d8b4fe" />
            <Stop offset="1" stopColor="#581c87" />
          </RadialGradient>
        </Defs>
        <G transform="rotate(-8 100 90)">
          <Path d={BODY_ATTACK} fill="url(#bossAttackGrad)" />
          <Path d="M56 96 C34 88 20 96 6 84 C22 108 40 108 58 116 Z" fill="#7e22ce" />
          <Circle cx={14} cy={92} r={8} fill="#a855f7" opacity={0.7} />
          <Path d="M80 62 L108 74 L82 84 Z" fill="#fff" />
          <Path d="M140 62 L112 74 L138 84 Z" fill="#fff" />
          <Path
            d="M84 110 L96 98 L108 110 L120 98 L132 110"
            stroke="#3b0764"
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
          <RadialGradient id="bossHurtGrad" cx="0.5" cy="0.4" r="0.75">
            <Stop offset="0" stopColor="#a855f7" />
            <Stop offset="1" stopColor="#4c1d95" />
          </RadialGradient>
        </Defs>
        <G transform="scale(1 0.88) translate(0 22)">
          <Path d={BODY_IDLE} fill="url(#bossHurtGrad)" />
          <Path d="M56 64 L68 74 M68 64 L56 74" stroke="#f5e7ff" strokeWidth={5} strokeLinecap="round" />
          <Path d="M102 64 L114 74 M114 64 L102 74" stroke="#f5e7ff" strokeWidth={5} strokeLinecap="round" />
          <Ellipse cx={85} cy={104} rx={12} ry={14} fill="#3b0764" />
        </G>
        <Circle cx={30} cy={40} r={7} fill="#c084fc" opacity={0.5} />
        <Circle cx={146} cy={34} r={6} fill="#c084fc" opacity={0.5} />
      </>
    ),
  },
}

export const BossSprite = ({ pose, width, height }: BossSpriteParams) => (
  <Svg width={width} height={height} viewBox={POSES[pose].viewBox}>
    {POSES[pose].node}
  </Svg>
)
