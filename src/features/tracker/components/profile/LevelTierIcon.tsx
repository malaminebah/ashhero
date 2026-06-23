import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { FLOW } from '@/constants/flowTheme'
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
    color={unlocked ? FLOW.cta : FLOW.faint}
  />
)
