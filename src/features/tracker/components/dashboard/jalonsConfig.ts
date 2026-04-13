/** Hour thresholds for the milestone grid (aligned with major recovery steps). */
export const DASHBOARD_JALONS = [
  { key: '1d', label: '1 JOUR', hours: 24, icon: '🌱' },
  { key: '1w', label: '1 SEMAINE', hours: 168, icon: '⚔️' },
  { key: '1m', label: '1 MOIS', hours: 672, icon: '🛡️' },
  { key: '3m', label: '3 MOIS', hours: 2160, icon: '👑' },
] as const
