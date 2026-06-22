import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { DashboardHome } from '@/src/features/tracker'

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-flow-bg">
      <StatusBar style="dark" />
      <DashboardHome />
    </View>
  )
}
