import type { BossRegenPlan } from '../constants'

export function shouldTriggerBossRegen(
  plan: BossRegenPlan | null,
  regenUsed: boolean,
  turnCount: number,
  bossHp: number,
  bossMaxHp: number
): boolean {
  if (plan == null || regenUsed) return false
  if (turnCount !== plan.triggerTurn) return false
  if (bossHp >= bossMaxHp) return false
  return true
}

export function applyBossRegenHp(currentHp: number, amount: number, maxHp: number): number {
  return Math.min(maxHp, currentHp + amount)
}

export function bossRegenHealAmount(currentHp: number, amount: number, maxHp: number): number {
  return applyBossRegenHp(currentHp, amount, maxHp) - currentHp
}
