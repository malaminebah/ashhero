export function getPlayerHeroEmoji(level: number): string {
  if (level >= 10) return '👑'
  if (level >= 7) return '⚔️'
  if (level >= 4) return '🛡️'
  if (level >= 2) return '💪'
  return '🤖'
}
