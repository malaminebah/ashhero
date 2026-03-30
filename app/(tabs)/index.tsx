import { useEffect } from 'react'
import { View } from 'react-native'
import { useRouter } from 'expo-router'
import { DashboardHome } from '@/src/features/tracker'
import { useTrackerStore } from '@/src/features/tracker/store'

export default function HomeScreen() {
  const router = useRouter()
  const quitDate = useTrackerStore((s) => s.quitDate)

  useEffect(() => {
    if (quitDate) return
    const t = setTimeout(() => {
      router.replace('/onboarding/step1' as never)
    }, 100)
    return () => clearTimeout(t)
  }, [quitDate, router])

  return (
    <View className="flex-1 bg-brand-bg">
      <DashboardHome />
    </View>
  )
}
