import { FLOW, flowShadow } from './flowTheme'

/** Shared NativeWind classes — elevation over outlines (Ahead / iOS). */
export const flowSurface = {
  card: 'rounded-2xl bg-flow-bg',
  cardActive: 'rounded-2xl bg-flow-secondary',
  cardHighlight: 'rounded-2xl bg-flow-gold/10',
  tile: 'overflow-hidden rounded-[28px] bg-flow-mascot',
  badge: 'w-[88px] items-center rounded-2xl bg-flow-bg px-2 py-3 active:opacity-90',
  jalon: 'w-[72px] items-center rounded-2xl bg-flow-bg px-2 py-3 active:opacity-90',
  iconWell: 'items-center justify-center rounded-2xl bg-flow-secondary',
  chip: 'flex-row items-center rounded-full bg-flow-secondary px-2.5 py-1',
  iconBtn: 'h-10 w-10 items-center justify-center rounded-full bg-flow-secondary active:opacity-70',
  input: 'rounded-2xl bg-flow-secondary/35 px-4',
  pill: 'rounded-full bg-flow-secondary px-2.5 py-1',
} as const

export const flowCardShadow = flowShadow.card
export const flowCanvasShadow = flowShadow.canvas

/** Selected / current item — tinted elevation, no outline. */
export const flowActiveShadow = {
  shadowColor: FLOW.cta,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.14,
  shadowRadius: 10,
  elevation: 3,
} as const

export const badgeSurface = (active: boolean) =>
  active ? flowSurface.cardActive : flowSurface.card
