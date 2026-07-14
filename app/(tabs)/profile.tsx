import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { ProfileScreenBody } from '@/src/features/tracker/components/profile/ProfileScreenBody'

export default function ProfileScreen() {
  return (
    <View className="flex-1 bg-brand-bg">
      <StatusBar style="light" />
      <ProfileScreenBody />
    </View>
  )
}
