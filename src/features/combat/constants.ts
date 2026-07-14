import type { CombatAction } from '@/src/features/tracker/types'
import type { BossAttackName, CravingTier, CravingTierConfig } from './types'
import type { BreatheGrade } from './breatheCycle'

export const COMBAT_PLAYER_MAX_HP = 100

/**
 * Difficulty comes from the craving tier the player picks, not from their level.
 * Stronger craving → bigger boss, more HP, harder ripostes, better victory XP.
 */
export const CRAVING_TIERS: Record<CravingTier, CravingTierConfig> = {
  soft: {
    label: 'Envie douce',
    bossName: 'Brume',
    bossHp: 120,
    riposteMin: 10,
    riposteMax: 16,
    bossScale: 0.85,
    victoryBonusXp: 0,
    introText: 'Brume apparaît dans un nuage léger…',
  },
  medium: {
    label: 'Envie moyenne',
    bossName: 'Fumée',
    bossHp: 160,
    riposteMin: 14,
    riposteMax: 22,
    bossScale: 1,
    victoryBonusXp: 15,
    introText: 'Fumée apparaît, bien décidée à rester !',
  },
  hard: {
    label: 'Envie forte',
    bossName: 'Tempête',
    bossHp: 210,
    riposteMin: 20,
    riposteMax: 30,
    bossScale: 1.25,
    victoryBonusXp: 35,
    introText: 'Tempête déferle sur l’arène !',
  },
}

export const CRAVING_TIER_ORDER: CravingTier[] = ['soft', 'medium', 'hard']

/**
 * Action roles: distract = main damage, water = heal (splash chip damage),
 * breathe = skill move (real values per grade in BREATHE_RESULT), special = nuke.
 */
export const DAMAGE_TO_BOSS: Record<CombatAction, number> = {
  breathe: 2,
  water: 8,
  distract: 22,
  special: 50,
}

/** Water is the recovery move — restores player HP on top of its splash damage. */
export const WATER_HEAL = 22

/** Heal to player + damage to boss, by breathing precision grade. */
export const BREATHE_RESULT: Record<BreatheGrade, { heal: number; damage: number }> = {
  perfect: { heal: 12, damage: 3 },
  good: { heal: 10, damage: 2 },
  off: { heal: 5, damage: 1 },
}

/** Pure attacks (distract/special) can crit — utility moves (water/breathe) cannot. */
export const CRIT_CHANCE = 0.15
export const CRIT_MULTIPLIER = 1.5

export function rollBossRiposteDamage(tier: CravingTier): number {
  const { riposteMin, riposteMax } = CRAVING_TIERS[tier]
  return riposteMin + Math.floor(Math.random() * (riposteMax - riposteMin + 1))
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
  '10 secondes — tape l\'écran sur « Inspire » pour rester dans le rythme.'

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
