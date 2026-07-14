import { View, type ViewProps } from 'react-native'

export type GameCardParams = ViewProps & { className?: string }

export const GameCard = ({ className = '', ...rest }: GameCardParams) => (
  <View
    className={`rounded-[20px] border border-[rgba(255,255,255,0.07)] bg-brand-card p-4 ${className}`}
    {...rest}
  />
)
