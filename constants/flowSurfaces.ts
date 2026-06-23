import { flowShadow } from './flowTheme'

/** Shared NativeWind classes — one radius/border language across Flow UI. */
export const flowSurface = {
  card: 'rounded-2xl border border-flow-border bg-flow-bg',
  cardActive: 'rounded-2xl border border-flow-cta/30 bg-flow-secondary',
  tile: 'overflow-hidden rounded-[28px] border border-black/5 bg-flow-mascot',
  badge: 'w-[88px] items-center rounded-2xl border px-2 py-3 active:opacity-90',
  jalon: 'w-[72px] items-center rounded-2xl border px-2 py-3 active:opacity-90',
  iconWell: 'items-center justify-center rounded-2xl bg-flow-secondary',
  chip: 'flex-row items-center rounded-full border border-flow-cta/20 bg-flow-secondary',
} as const

export const flowCardShadow = flowShadow.card

export const badgeSurface = (active: boolean) =>
  active ? flowSurface.cardActive : flowSurface.card
