export type CombatPhase =
  | 'entering'
  | 'player_turn'
  | 'resolving_instant'
  | 'breathe_pending'
  | 'enemy_turn'
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

export type CombatArenaViewParams = {
  level: number
  bossShakeKey: number
  playerShakeKey: number
  attackEmoji: string | null
}

export type CombatHpBarParams = {
  hp: number
  maxHp: number
  fillColor: string
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

export type AttackEffectParams = {
  emoji: string
  visible: boolean
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

export type CombatArenaScreenParams = {
  onLaunchCombat: () => void
}

export type CombatMonsterParams = {
  hp: number
  maxHp: number
  shakeKey: number
}

export type CombatPlayerPanelParams = {
  hp: number
  maxHp: number
  shakeKey: number
  label?: string
}
