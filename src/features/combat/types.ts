export type CombatPhase =
  | 'entering'
  | 'boss_entering'
  | 'player_turn'
  | 'resolving_instant'
  | 'breathe_pending'
  | 'boss_windup'
  | 'boss_regen'
  | 'enemy_turn'
  | 'celebrate_victory'
  | 'celebrate_defeat'
  | 'victory'
  | 'defeat'

/** Craving intensity picked before combat — drives boss identity and difficulty. */
export type CravingTier = 'soft' | 'medium' | 'hard'

export type CravingTierConfig = {
  label: string
  bossName: string
  bossHp: number
  riposteMin: number
  riposteMax: number
  bossScale: number
  victoryBonusXp: number
  introText: string
}

export type BattleMessage =
  | { kind: 'idle' }
  | { kind: 'status'; text: string }
  | { kind: 'player_hit'; actionLabel: string; damage: number; crit: boolean }
  | { kind: 'player_water'; damage: number; heal: number }
  | { kind: 'player_breathe'; grade: BreatheGrade; damage: number; heal: number }
  | { kind: 'boss_hit'; attackName: string; damage: number }
  | { kind: 'boss_countered'; attackName: string; bonusXp: number }
  | { kind: 'boss_regen' }

export type FloatDamagePayload = {
  target: 'boss' | 'player'
  amount: number
  key: number
  variant?: 'damage' | 'heal'
}

export type BossAttackName =
  | 'Souffle Tentation'
  | "Poussée d'envie"
  | 'Envie de relâcher la pression'
  | 'Odeur de fumer'

export type BossAttackEffect = 'poison' | 'push' | 'fire' | 'smoke'

export type PlayerAttackEffect = 'water' | 'distract' | 'breathe' | 'special' | null

export type CombatEffect =
  | {
      kind: 'boss_hits_player'
      effect: BossAttackEffect
      key: number
    }
  | {
      kind: 'player_hits_boss'
      effect: PlayerAttackEffect
      key: number
    }
  | {
      kind: 'boss_regen'
      key: number
    }
  | null

export type CombatEffectOverlayParams = {
  combatEffect: CombatEffect
}

export type CombatActionVariant = 'breathe' | 'water' | 'distract' | 'special'

export type CombatModalParams = {
  visible: boolean
  tier: CravingTier
  onClose: () => void
}

import type { PlayerSoldierAnim } from './soldierSheet'
export type { PlayerSoldierAnim }

import type { BossAnim } from './bossSheet'
export type { BossAnim }

import type { BreatheGrade, BreathePhase } from './breatheCycle'

import type { StyleProp, ViewStyle } from 'react-native'

export type CombatArenaViewParams = {
  phase: CombatPhase
  bossTier: CravingTier
  bossDefeated: boolean
  bossShakeKey: number
  playerShakeKey: number
  playerAnim: PlayerSoldierAnim
  bossAnim: BossAnim
  combatEffect: CombatEffect
  breatheActive?: boolean
  breathePhase?: BreathePhase
  style?: StyleProp<ViewStyle>
}

export type PlayerSoldierSpriteParams = {
  anim: PlayerSoldierAnim
  /** Multiplies base display scale — arena frame uses smaller sprites. */
  scale?: number
}

export type BossSpriteParams = {
  anim: BossAnim
  muted?: boolean
  scale?: number
}

export type SheetSpriteParams = {
  sheet: number
  sheetW: number
  sheetH: number
  sheetCols: number
  sheetRows: number
  displayScale: number
  row: number
  col?: number
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
  /** Base max HP before defense shield bonus — enables blue shield segment on bar. */
  baseMaxHp?: number
  variant: CombatHpBarVariant
  overlay?: boolean
  name?: string
  level?: number
}

export type CombatXpBarParams = {
  xpStart: number
  sessionXp: number
  specialsUsed: number
  /** Special attack not yet available — shows lock instead of percent. */
  locked?: boolean
  overlay?: boolean
}

export type CombatMessageBoxParams = {
  message: BattleMessage
  showPrompt?: boolean
  heroName?: string
  /** Telegraphed boss attack — shown during player_turn so counters can be planned. */
  nextAttack?: BossAttackName
  overlay?: boolean
}

export type FloatingDamageParams = {
  floatDamage: FloatDamagePayload
  /** Chip background — mockup colors the chip by attack type. */
  fill?: string
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
  overlay?: boolean
}

export type BreatheTimerParams = {
  cycleIndex: number
  cycleCount: number
  phase: BreathePhase
  phaseRemaining: number
  progress: number
  overlay?: boolean
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

export type CombatArenaScreenParams = {
  onLaunchCombat: (tier: CravingTier) => void
}
