export const arenaBackground = require('@/assets/combat/arena-bg.png')

/** Sprite anchors inside the arena panel — Pokémon-style: boss top, player bottom, both centered. */
export const ARENA_SPRITE_LAYOUT = {
  player: { bottom: 28 },
  boss: { top: 48 },
} as const

/** Source PNG: 1000×1200 portrait (5:6) — floor anchored bottom for mobile crop. */
export const ARENA_SOURCE_WIDTH = 1000
export const ARENA_SOURCE_HEIGHT = 1200
export const ARENA_PANEL_ASPECT = 5 / 6

/** Top banners (hub + victory/defeat): use more vertical space on portrait. */
export const ARENA_BANNER_MAX_HEIGHT = '58%'

/** Keep floor + magic circle in frame when cropping landscape art on portrait. */
export const ARENA_IMAGE_FOCUS = 'bottom' as const

export const ARENA_GRADIENT_GAME = {
  colors: ['rgba(8,0,15,0.2)', 'transparent', 'rgba(8,0,15,0.3)'] as const,
  locations: [0, 0.45, 1] as const,
}

export const ARENA_GRADIENT_FLOW = {
  colors: ['rgba(255,255,255,0.12)', 'transparent', 'rgba(255,255,255,0.88)'] as const,
  locations: [0, 0.42, 1] as const,
}
