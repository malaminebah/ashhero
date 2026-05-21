import { useEffect } from 'react'
import { View } from 'react-native'
import { useRouter } from 'expo-router'
import { DashboardHome } from '@/src/features/tracker'
import { useSessionStore } from '@/src/features/auth/sessionStore'

export default function HomeScreen() {
  const router = useRouter()
  const hasServerProfile = useSessionStore((s) => s.hasServerProfile)

  useEffect(() => {
    if (hasServerProfile !== false) return
    router.replace('/' as never)
  }, [hasServerProfile, router])

  return (
    <View className="flex-1 bg-brand-bg">
      <DashboardHome />
    </View>
  )
}
