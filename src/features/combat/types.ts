export type CombatPhase =
  | 'entering'
  | 'player_turn'
  | 'resolving_instant'
  | 'breathe_pending'
  | 'enemy_turn'
  | 'celebrate_victory'
  | 'celebrate_defeat'
  | 'victory'
  | 'defeat'

export type BattleMessage =
  | { kind: 'idle' }
  | { kind: 'status'; text: string }
  | { kind: 'player_hit'; actionLabel: string; damage: number }
  | { kind: 'boss_hit'; attackName: string; damage: number }

export type FloatDamagePayload = {
  target: 'boss' | 'player'
  amount: number
  key: number
}

export type CombatActionVariant = 'breathe' | 'water' | 'distract' | 'special'

export type CombatModalParams = {
  visible: boolean
  onClose: () => void
}

import type { PlayerSoldierAnim } from './soldierSheet'
export type { PlayerSoldierAnim }

import type { BossAnim } from './bossSheet'
export type { BossAnim }

export type CombatArenaViewParams = {
  bossDefeated: boolean
  bossShakeKey: number
  playerShakeKey: number
  playerAnim: PlayerSoldierAnim
  bossAnim: BossAnim
}

export type PlayerSoldierSpriteParams = {
  anim: PlayerSoldierAnim
}

export type BossSpriteParams = {
  anim: BossAnim
  muted?: boolean
}

export type SheetSpriteParams = {
  sheet: number
  frameSize: number
  sheetH: number
  sheetCols: number
  displayScale: number
  row: number
  frames: number
  frameMs: number
  loop: boolean
  animKey: string
  accessibilityLabel: string
  muted?: boolean
}

import type { CombatHpBarVariant } from './hpBarSheet'
export type { CombatHpBarVariant }

export type CombatHpBarParams = {
  hp: number
  maxHp: number
  variant: CombatHpBarVariant
  overlay?: boolean
  name?: string
  level?: number
}

export type CombatMessageBoxParams = {
  message: BattleMessage
  showPrompt?: boolean
  heroName?: string
}

export type FloatingDamageParams = {
  floatDamage: FloatDamagePayload
}

export type CombatActionButtonParams = {
  label: string
  onPress: () => void
  disabled?: boolean
  variant: CombatActionVariant
  badge?: string
  lockHint?: string
  accessibilityLabel?: string
  compact?: boolean
}

export type BreatheTimerParams = {
  onComplete: () => void
}

export type VictoryBannerParams = {
  xpGained: number
  level: number
  onContinue: () => void
}

export type DefeatBannerParams = {
  onRetry: () => void
  onGoHome: () => void
}

export type CombatResultBackdropParams = {
  heroAnim: PlayerSoldierAnim
  showBoss?: boolean
  bossAnim?: BossAnim
  bossMuted?: boolean
}

export type CombatArenaScreenParams = {
  onLaunchCombat: () => void
}
