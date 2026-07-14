import type { CombatAction } from '@/src/features/tracker/types'
import type { BossAttackName } from './types'
import type { BreatheGrade } from './breatheCycle'

export const COMBAT_PLAYER_MAX_HP = 100

export const COMBAT_BOSS_BASE_HP = 78

/** Boss HP scales with player level, capped so late levels stay winnable. */
export function bossMaxHpForLevel(level: number): number {
  return COMBAT_BOSS_BASE_HP + 13 * Math.min(Math.max(level, 1) - 1, 6)
}

/** breathe deals light damage — its real value is the heal (see BREATHE_RESULT). */
export const DAMAGE_TO_BOSS: Record<CombatAction, number> = {
  breathe: 12,
  water: 16,
  distract: 20,
  special: 70,
}

/** Heal to player + damage to boss, by breathing precision grade. */
export const BREATHE_RESULT: Record<BreatheGrade, { heal: number; damage: number }> = {
  perfect: { heal: 24, damage: 16 },
  good: { heal: 16, damage: 12 },
  off: { heal: 8, damage: 8 },
}

/** Riposte scales with player level: lvl 1 → 12–20, lvl 6+ → 22–30. */
export function rollBossRiposteDamage(level: number): number {
  const tier = Math.min(Math.max(level, 1) - 1, 5)
  return 12 + tier * 2 + Math.floor(Math.random() * 9)
}

export const BOSS_ATTACK_NAMES: BossAttackName[] = [
  'Souffle Tentation',
  "Poussée d'envie",
  'Envie de relâcher la pression',
  'Odeur de fumer',
]

/** Playing the counter action during the turn negates the telegraphed attack. */
export const BOSS_COUNTER_ACTION: Record<BossAttackName, CombatAction> = {
  'Souffle Tentation': 'breathe',
  "Poussée d'envie": 'distract',
  'Envie de relâcher la pression': 'breathe',
  'Odeur de fumer': 'water',
}

export const COUNTER_BONUS_XP = 8

export function randomBossAttackName(): BossAttackName {
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
  '3 inspirations — tape l\'écran à chaque « Inspire » pour rester dans le rythme.'

export const COMBAT_SPECIAL_LOCKED_HINT = '100 XP gagnés'

/** ~1 combat sur 3 peut déclencher une régénération unique du boss. */
export const BOSS_REGEN_COMBAT_CHANCE = 0.28

export const BOSS_REGEN_MIN_HP = 10
export const BOSS_REGEN_MAX_HP = 18

export const BOSS_REGEN_MS = 700

export const COMBAT_BOSS_REGEN_MESSAGE = "Oh oh, l'envie est plus coriace !"

export type BossRegenPlan = {
  triggerTurn: number
  amount: number
}

export function rollBossRegenPlan(): BossRegenPlan | null {
  if (Math.random() >= BOSS_REGEN_COMBAT_CHANCE) return null
  const triggerTurn = 2 + Math.floor(Math.random() * 2)
  const span = BOSS_REGEN_MAX_HP - BOSS_REGEN_MIN_HP + 1
  const amount = BOSS_REGEN_MIN_HP + Math.floor(Math.random() * span)
  return { triggerTurn, amount }
}
