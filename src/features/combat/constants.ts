import type { CombatAction } from '@/src/features/tracker/types'

export const COMBAT_PLAYER_MAX_HP = 100
export const COMBAT_BOSS_MAX_HP = 100

/** Damage dealt to the boss — same scale as `src/features/tracker/combatXpTable.ts`. */
export const DAMAGE_TO_BOSS: Record<CombatAction, number> = {
  breathe: 20,
  water: 15,
  distract: 10,
  special: 40,
}

/** Boss counter-attack: base 12 ± 4 → integer in [8, 16]. */
export function rollBossRiposteDamage(): number {
  return 8 + Math.floor(Math.random() * 9)
}

export const BOSS_ATTACK_NAMES = [
  'Craving Surge',
  'Stress Spike',
  'Irritant Haze',
] as const

export function randomBossAttackName(): string {
  const i = Math.floor(Math.random() * BOSS_ATTACK_NAMES.length)
  return BOSS_ATTACK_NAMES[i] ?? BOSS_ATTACK_NAMES[0]
}

const ACTION_LABELS: Record<CombatAction, string> = {
  breathe: 'Breathe',
  water: 'Drink water',
  distract: 'Distract',
  special: 'Special move',
}

export function combatActionLabel(action: CombatAction): string {
  return ACTION_LABELS[action]
}
