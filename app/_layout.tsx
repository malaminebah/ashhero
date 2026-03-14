import '../global.css'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'

import { useColorScheme } from '@/hooks/use-color-scheme'
import { useEffect, useState } from 'react'
import { signInAnon, getProfile } from '@/src/services'
import { useTrackerStore } from '@/src/features/tracker/store'
import { Text, View } from 'react-native'

export const unstable_settings = {
  initialRouteName: 'index',
}

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const { initialize } = useTrackerStore()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const init = async () => {
      try {
        const uid = await signInAnon()
        const profile = await getProfile(uid)
        console.log('connecetd', profile)
        if (profile) {
          initialize(profile)
          

          console.log('storehydrated with ✅', profile)
        }
        
      } catch (error) {
        console.log('error', error)
        setError('impossible de ce connecter soucis de connexions')
      }finally{
        setIsLoading(false)

      }
    }
    init()
  }, [initialize])


  if (isLoading === true) {
    return (
      <View className="flex-1 bg-brand-bg items-center justify-center">
        <Text className="text-white font-mono">Loading..</Text>
      </View>
    )
  }
  if (error) {
    return (
      <View className="flex-1 bg-brand-bg items-center justify-center p-6">
        <Text className="text-white font-mono text-center">{error}</Text>
      </View>
    )
  }
 
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="modal"
          options={{ presentation: 'modal', title: 'Modal' }}
        />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  )
}
