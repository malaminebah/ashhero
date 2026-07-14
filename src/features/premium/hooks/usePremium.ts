import { useRouter } from 'expo-router'
import { useCallback } from 'react'
import { usePremiumStore } from '../store'

export function usePremium() {
  const isPremium = usePremiumStore((s) => s.isPremium)
  const plan = usePremiumStore((s) => s.plan)
  return { isPremium, plan }
}

export function usePaywallNavigation() {
  const router = useRouter()
  const openPaywall = useCallback(() => {
    router.push('/paywall' as never)
  }, [router])
  return { openPaywall }
}
