import Svg, { Circle, Path, Rect } from 'react-native-svg'

export type GameIconName =
  | 'lungs'
  | 'drop'
  | 'pad'
  | 'bolt'
  | 'lock'
  | 'shield'
  | 'home'
  | 'swords'
  | 'user'
  | 'coin'
  | 'crown'
  | 'gem'
  | 'flame'
  | 'star'
  | 'calendar'
  | 'hourglass'
  | 'trophy'
  | 'sword'
  | 'helmet'
  | 'medal'
  | 'flag'
  | 'moneybag'

export type GameIconParams = {
  name: GameIconName
  size: number
  color: string
}

const ICONS: Record<GameIconName, (color: string) => React.ReactElement> = {
  lungs: (c) => (
    <>
      <Path
        d="M12 3v7M12 10c-1.5 0-2 1-3.5 1M12 10c1.5 0 2 1 3.5 1"
        stroke={c}
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
      />
      <Path d="M8.5 9C5.5 10 4 13 4 17c0 2.5 1 3.5 2.6 3.5S9.5 19.5 9.5 17v-6.5C9.5 9.6 9.2 8.8 8.5 9Z" fill={c} />
      <Path d="M15.5 9c3 1 4.5 4 4.5 8 0 2.5-1 3.5-2.6 3.5S14.5 19.5 14.5 17v-6.5c0-.9.3-1.7 1-1.5Z" fill={c} />
    </>
  ),
  drop: (c) => (
    <Path d="M12 2.5C12 2.5 5.5 10 5.5 14.5a6.5 6.5 0 0 0 13 0C18.5 10 12 2.5 12 2.5Z" fill={c} />
  ),
  pad: (c) => (
    <>
      <Rect x={2} y={7} width={20} height={11} rx={5.5} fill={c} />
      <Rect x={6} y={10.5} width={6} height={2.4} rx={1.2} fill="#08000f" opacity={0.55} />
      <Rect x={7.8} y={8.7} width={2.4} height={6} rx={1.2} fill="#08000f" opacity={0.55} />
      <Circle cx={16.2} cy={11} r={1.4} fill="#08000f" opacity={0.55} />
      <Circle cx={19} cy={13.5} r={1.4} fill="#08000f" opacity={0.55} />
    </>
  ),
  bolt: (c) => <Path d="M13 2 4.5 13.5H11L9.5 22 19 10h-6.5L13 2Z" fill={c} />,
  lock: (c) => (
    <>
      <Rect x={5} y={10} width={14} height={10} rx={3} fill={c} />
      <Path d="M8 10V7.5a4 4 0 0 1 8 0V10" stroke={c} strokeWidth={2.4} fill="none" />
    </>
  ),
  shield: (c) => (
    <Path d="M12 2 4 5.5V11c0 5.5 3.5 9.5 8 11 4.5-1.5 8-5.5 8-11V5.5L12 2Z" fill={c} />
  ),
  home: (c) => (
    <Path d="M4 11 12 4l8 7v8a1.5 1.5 0 0 1-1.5 1.5H14v-6h-4v6H5.5A1.5 1.5 0 0 1 4 19v-8Z" fill={c} />
  ),
  swords: (c) => (
    <>
      <Path d="M4 4l11 11M20 4 9 15" stroke={c} strokeWidth={2.4} strokeLinecap="round" />
      <Path
        d="M13.5 16.5 16 19M7.5 16.5 5 19M15 15l3 3M9 15l-3 3"
        stroke={c}
        strokeWidth={2.4}
        strokeLinecap="round"
      />
    </>
  ),
  user: (c) => (
    <>
      <Circle cx={12} cy={8} r={4.2} fill={c} />
      <Path d="M4 20.5c1.4-4 4.4-6 8-6s6.6 2 8 6" stroke={c} strokeWidth={3.4} strokeLinecap="round" fill="none" />
    </>
  ),
  coin: (c) => (
    <>
      <Circle cx={12} cy={12} r={9} fill={c} />
      <Circle cx={12} cy={12} r={5.5} fill="none" stroke="#b45309" strokeWidth={1.8} />
    </>
  ),
  crown: (c) => <Path d="M3 8l4.5 3.5L12 5l4.5 6.5L21 8l-1.8 10H4.8L3 8Z" fill={c} />,
  gem: (c) => (
    <>
      <Path d="M7 3h10l4 6-9 12L3 9l4-6Z" fill={c} />
      <Path d="M3 9h18M12 21 8.5 9M12 21 15.5 9" stroke="rgba(0,0,0,.25)" strokeWidth={1.4} />
    </>
  ),
  flame: (c) => (
    <Path
      d="M12 2c1 3.5 4 4.5 5.5 7.5 1.6 3.2.6 8-2.7 10.3A7.3 7.3 0 0 1 4.9 14c0-2.6 1.6-4.2 2.9-5.8.4 1.2 1 2 2 2.6C9.4 7.5 10.6 4.4 12 2Z"
      fill={c}
    />
  ),
  star: (c) => (
    <Path d="M12 2l2.9 6.2 6.6.8-4.9 4.6 1.3 6.6L12 16.9l-5.9 3.3 1.3-6.6L2.5 9l6.6-.8L12 2Z" fill={c} />
  ),
  calendar: (c) => (
    <>
      <Rect x={3} y={5} width={18} height={17} rx={3} fill={c} />
      <Rect x={3} y={9} width={18} height={1.8} fill="rgba(0,0,0,.3)" />
      <Rect x={7} y={2} width={2.4} height={5} rx={1.2} fill={c} />
      <Rect x={14.6} y={2} width={2.4} height={5} rx={1.2} fill={c} />
      <Rect x={7} y={13} width={4} height={3.4} rx={1} fill="rgba(0,0,0,.3)" />
    </>
  ),
  hourglass: (c) => (
    <Path
      d="M6 2h12v3.5c0 2.4-2 4.5-4.2 6.5 2.2 2 4.2 4.1 4.2 6.5V22H6v-3.5c0-2.4 2-4.5 4.2-6.5C8 10 6 7.9 6 5.5V2Zm2.5 2.5v1c0 1.8 1.7 3.4 3.5 5 1.8-1.6 3.5-3.2 3.5-5v-1h-7Z"
      fill={c}
    />
  ),
  trophy: (c) => (
    <>
      <Path
        d="M7 3h10v2h4v2.5A5 5 0 0 1 16.5 12 5.5 5.5 0 0 1 13 15v3h3v3H8v-3h3v-3a5.5 5.5 0 0 1-3.5-3A5 5 0 0 1 3 7.5V5h4V3Zm-2 4.5A3 3 0 0 0 7 10V7H5v.5ZM19 10a3 3 0 0 0 2-2.5V7h-2v3Z"
        fill={c}
      />
    </>
  ),
  sword: (c) => (
    <>
      <Path d="M19.5 3 21 4.5 10 15.5 8.5 14 19.5 3Z" fill={c} />
      <Path
        d="M7 15.5 8.5 17l-2 2 1 1L6 21.5 2.5 18 4 16.5l1 1 2-2Z"
        fill={c}
      />
      <Path d="M6.5 13.5 10.5 17.5" stroke={c} strokeWidth={2.4} strokeLinecap="round" />
    </>
  ),
  helmet: (c) => (
    <>
      <Path d="M12 2a8 8 0 0 1 8 8v9l-3.5-2H15v-6.5a1.5 1.5 0 0 0-3 0V17h-1v-6.5a1.5 1.5 0 0 0-3 0V17H7.5L4 19v-9a8 8 0 0 1 8-8Z" fill={c} />
      <Path d="M12 4.5v4" stroke="rgba(0,0,0,.3)" strokeWidth={2} strokeLinecap="round" />
    </>
  ),
  medal: (c) => (
    <>
      <Path d="M7 2h4l1.5 4L14 2h3l-3.5 8h-3L7 2Z" fill={c} />
      <Circle cx={12} cy={15.5} r={5.5} fill={c} />
      <Path d="M12 12.5l1 2 2.2.3-1.6 1.5.4 2.2-2-1-2 1 .4-2.2-1.6-1.5 2.2-.3 1-2Z" fill="rgba(0,0,0,.3)" />
    </>
  ),
  flag: (c) => (
    <>
      <Rect x={4} y={2} width={2.4} height={20} rx={1.2} fill={c} />
      <Path d="M8 3.5h12l-3 4.5 3 4.5H8v-9Z" fill={c} />
    </>
  ),
  moneybag: (c) => (
    <>
      <Path d="M9 2h6l-1.5 3h-3L9 2Z" fill={c} />
      <Path d="M9.5 6h5c3.5 2.6 5.5 5.8 5.5 9a7 7 0 0 1-7 7h-2a7 7 0 0 1-7-7c0-3.2 2-6.4 5.5-9Z" fill={c} />
      <Path
        d="M12 9.5v1m0 6v1m2-5.5c0-1-1-1.5-2-1.5s-2 .4-2 1.4c0 2 4 1.2 4 3.2 0 1-1 1.4-2 1.4s-2-.5-2-1.5"
        stroke="rgba(0,0,0,.35)"
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
      />
    </>
  ),
}

export const GameIcon = ({ name, size, color }: GameIconParams) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    {ICONS[name](color)}
  </Svg>
)
