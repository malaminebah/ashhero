import { Text } from 'react-native'
import { getPlayerHeroEmoji } from '../utils/playerHeroEmoji'

type Variant = 'dashboard' | 'profile' | 'combat'

type Props = {
  level: number
  variant?: Variant
}

const variantClass: Record<Variant, string> = {
  dashboard: 'text-7xl leading-[88px]',
  profile: 'text-5xl leading-[56px]',
  combat: 'text-[64px] leading-[72px]',
}

export const PlayerHeroEmoji = ({ level, variant = 'dashboard' }: Props) => (
  <Text className={variantClass[variant]}>{getPlayerHeroEmoji(level)}</Text>
)
