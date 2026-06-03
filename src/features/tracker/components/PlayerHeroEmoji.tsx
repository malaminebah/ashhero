import { Text } from 'react-native'
import { getPlayerHeroEmoji } from '../utils/playerHeroEmoji'
import type { PlayerHeroEmojiParams, PlayerHeroVariant } from '../types'

const variantClass: Record<PlayerHeroVariant, string> = {
  dashboard: 'text-7xl leading-[88px]',
  profile: 'text-5xl leading-[56px]',
  combat: 'text-[64px] leading-[72px]',
}

export const PlayerHeroEmoji = ({ level, variant = 'dashboard' }: PlayerHeroEmojiParams) => (
  <Text className={variantClass[variant]}>{getPlayerHeroEmoji(level)}</Text>
)
