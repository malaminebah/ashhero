export type BattleMessage =
  | { kind: 'idle' }
  | { kind: 'status'; text: string }
  | { kind: 'player_hit'; actionLabel: string; damage: number }
  | { kind: 'boss_hit'; attackName: string; damage: number }
