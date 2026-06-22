/**
 * AshHero Flow — design tokens (référence Ahead).
 * Zone claire : auth, welcome, onboarding, futurs écrans « coach ».
 * Implémentation : NativeWind `flow-*` + ce fichier pour ombres / StatusBar.
 */
export const FLOW = {
  bg: '#FFFFFF',
  breathe: '#E5DDF5',
  brand: '#9B87F5',
  cta: '#7C3AED',
  ctaPressed: '#6D28D9',
  ctaLoading: '#C4B5FD',
  mascotTile: '#C8EDD6',
  text: '#171717',
  textSecondary: '#475569',
  muted: '#64748B',
  faint: '#94A3B8',
  border: '#E5E7EB',
  inputBg: '#FAFAFA',
  secondaryBg: '#F3EEFF',
  secondaryText: '#5B21B6',
  progressTrack: '#F1F5F9',
  progressFill: '#7C3AED',
  gold: '#F5C518',
  success: '#10B981',
  danger: '#EF4444',
  canvasShadow: 'rgba(0,0,0,0.08)',
  cardShadow: 'rgba(0,0,0,0.06)',
} as const

export const FLOW_RADIUS = {
  pill: 9999,
  tile: 28,
  card: 16,
  input: 16,
} as const

export const FLOW_SPACING = {
  screenX: 24,
  screenTop: 24,
  screenBottom: 40,
  section: 32,
  block: 24,
} as const

export const FLOW_TYPO = {
  logo: { size: 32, weight: '700' as const },
  h1: { size: 22, lineHeight: 32, weight: '700' as const },
  body: { size: 15, lineHeight: 24, weight: '400' as const },
  caption: { size: 11, lineHeight: 16, weight: '400' as const },
  button: { size: 16, weight: '700' as const },
} as const

/** Interim : System. Cible : Nunito (expo-font). */
export const flowFontFamily = {
  sans: 'System' as const,
  /** @future expo-font — Nunito wght 400–700 */
  body: 'Nunito' as const,
} as const

export const flowShadow = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  canvas: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
  },
} as const

/** @deprecated Alias — préférer FLOW */
export const ONBOARDING = FLOW

/** @deprecated Alias */
export const onboardingSans = flowFontFamily
