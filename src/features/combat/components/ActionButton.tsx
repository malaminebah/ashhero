import { ChunkyButton, CHUNKY_COLORS, type ChunkyPalette } from '@/components/ui/chunky-button'
import type { GameIconName } from '@/components/ui/game-icon'
import type { CombatActionButtonParams, CombatActionVariant } from '../types'

const PALETTE: Record<CombatActionVariant, ChunkyPalette> = {
  breathe: CHUNKY_COLORS.green,
  water: CHUNKY_COLORS.blue,
  distract: CHUNKY_COLORS.gray,
  special: CHUNKY_COLORS.gold,
}

const SHORT_LABEL: Record<CombatActionVariant, string> = {
  breathe: 'Respirer',
  water: 'Eau',
  distract: 'Distraire',
  special: 'Spécial',
}

const ICON: Record<CombatActionVariant, GameIconName> = {
  breathe: 'lungs',
  water: 'drop',
  distract: 'pad',
  special: 'bolt',
}

/** Mockup chunky action — 3D face, icon + label, corner badge. */
export const ActionButton = ({
  label,
  onPress,
  disabled = false,
  variant,
  badge,
  lockHint,
  accessibilityLabel,
}: CombatActionButtonParams) => (
  <ChunkyButton
    label={SHORT_LABEL[variant]}
    icon={variant === 'special' && disabled ? 'lock' : ICON[variant]}
    palette={PALETTE[variant]}
    onPress={onPress}
    disabled={disabled}
    badge={badge ?? (disabled && lockHint ? lockHint : undefined)}
    height={66}
    fontSize={14}
    accessibilityLabel={accessibilityLabel ?? label}
  />
)
