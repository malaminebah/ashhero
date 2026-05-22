import type { CombatAction } from '@/src/features/tracker/types'

export const COMBAT_PLAYER_MAX_HP = 100
export const COMBAT_BOSS_MAX_HP = 100

export const DAMAGE_TO_BOSS: Record<CombatAction, number> = {
  breathe: 35,
  water: 15,
  distract: 17,
  special: 70,
}

export function rollBossRiposteDamage(): number {
  return 7 + Math.floor(Math.random() * 9)
}

export const BOSS_ATTACK_NAMES = [
  "Poussée d'envie",
  'Envie de relâcher la pression',
  'Odeur de fumer',
]

export function randomBossAttackName(): string {
  const i = Math.floor(Math.random() * BOSS_ATTACK_NAMES.length)
  return BOSS_ATTACK_NAMES[i] ?? BOSS_ATTACK_NAMES[0]
}

const ACTION_LABELS: Record<CombatAction, string> = {
  breathe: 'Respirer',
  water: "Boire de l'eau",
  distract: 'Se distraire',
  special: 'Attaque spéciale',
}

export function combatActionLabel(action: CombatAction): string {
  return ACTION_LABELS[action]
}

export const COMBAT_BREATHE_STATUS =
  'Reste avec ton souffle jusqu\'à la fin du minuteur.'

export const COMBAT_SPECIAL_LOCKED_HINT = '7 jours de série'
