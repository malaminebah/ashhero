import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { getLevelTierIconName } from '../../utils/levelTierVisual'
import type { LevelTierIconParams } from '../../types'

export const LevelTierIcon = ({
  level,
  size = 24,
  unlocked = true,
}: LevelTierIconParams) => (
  <MaterialCommunityIcons
    name={getLevelTierIconName(level)}
    size={size}
    color={unlocked ? '#fbbf24' : '#5b4a75'}
  />
)
