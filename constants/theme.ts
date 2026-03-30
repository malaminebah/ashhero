import { Platform } from 'react-native'

/**
 * Thème Violet / Royal — Mockup app tracker
 * Utiliser ces tokens pour garder la cohérence visuelle.
 * Les classes Tailwind correspondent à tailwind.config.js
 */

/** Polices pour les composants template (ThemedText, explore, etc.) */
/** Titres type maquette (Dashboard, Profil, onboarding). */
export const titleSerif = Platform.select({
  ios: 'Georgia',
  android: 'serif',
  default: 'serif',
}) as string

export const Fonts = {
  rounded: Platform.select({
    ios: 'System',
    android: 'sans-serif',
    default: 'sans-serif',
  }),
  mono: Platform.select({
    ios: 'Menlo',
    android: 'monospace',
    default: 'monospace',
  }),
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
  red: '#ef4444',
  text: '#f3e8ff',
  textMuted: 'rgba(243,232,255,0.4)',
  textDim: 'rgba(243,232,255,0.2)',
} as const

/** Pour compatibilité avec les composants Expo (tabs, collapsible, etc.) */
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
    tint: THEME.accent,
    icon: '#9ca3af',
    tabIconDefault: '#6b7280',
    tabIconSelected: THEME.accent,
    text: '#f9fafb',
    background: THEME.bg,
    border: THEME.border,
  },
}
