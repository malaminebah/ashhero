/** PostScript name must match `useFonts` key in `app/_layout.tsx`. */
export const PIXEL_FONT = 'M5x7' as const

/** @deprecated Prefer `PIXEL_FONT` or `font-mono` (Tailwind → M5x7). */
export const titleSerif = PIXEL_FONT

export const Fonts = {
  pixel: PIXEL_FONT,
  rounded: PIXEL_FONT,
  mono: PIXEL_FONT,
} as const

export const THEME = {
  bg: '#08000f',
  bg2: '#0f0020',
  surface: 'rgba(255,255,255,0.03)',
  border: 'rgba(168,85,247,0.15)',
  accent: '#a855f7',
  accentDark: '#7c3aed',
  accentDeep: '#4c1d95',
  gold: '#fbbf24',
  success: '#22c55e',
  red: '#ef4444',
  text: '#f3e8ff',
  textMuted: 'rgba(243,232,255,0.4)',
  textDim: 'rgba(243,232,255,0.2)',
} as const

export { FLOW, flowFontFamily, flowShadow } from './flowTheme'

/** Expo tab / template components compatibility (tabs, collapsible, etc.) */
export const Colors = {
  light: {
    tint: THEME.accent,
    icon: '#68776d',
    tabIconDefault: '#9ca3af',
    tabIconSelected: THEME.accent,
    text: '#111827',
    background: '#ffffff',
    border: '#e5e7eb',
  },
  dark: {
    tint: THEME.success,
    icon: '#9ca3af',
    tabIconDefault: '#6b7280',
    tabIconSelected: THEME.success,
    text: '#f9fafb',
    background: THEME.bg,
    border: THEME.border,
  },
}
