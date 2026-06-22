import { StatusBar } from 'expo-status-bar'
import { ProfileScreenBody } from '@/src/features/tracker/components/profile/ProfileScreenBody'

export default function ProfileScreen() {
  return (
    <>
      <StatusBar style="dark" />
      <ProfileScreenBody />
    </>
  )
}
