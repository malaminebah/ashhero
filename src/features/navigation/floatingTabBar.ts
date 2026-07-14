export const FLOATING_TAB_BAR = {
  height: 64,
  insetX: 20,
  bottomMin: 22,
  scrollPad: 16,
} as const

export function floatingTabClearance(bottomInset: number): number {
  return (
    FLOATING_TAB_BAR.height +
    Math.max(bottomInset, FLOATING_TAB_BAR.bottomMin) +
    FLOATING_TAB_BAR.scrollPad
  )
}

export function floatingTabBarStyle(bottomInset: number) {
  return {
    position: 'absolute' as const,
    left: FLOATING_TAB_BAR.insetX,
    right: FLOATING_TAB_BAR.insetX,
    bottom: Math.max(bottomInset, FLOATING_TAB_BAR.bottomMin),
    height: FLOATING_TAB_BAR.height,
    backgroundColor: '#0f0020',
    borderRadius: 22,
    borderTopWidth: 0,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.09)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.55,
    shadowRadius: 15,
    elevation: 12,
    paddingTop: 8,
    paddingBottom: 10,
  }
}
