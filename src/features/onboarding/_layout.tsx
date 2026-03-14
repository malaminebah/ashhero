import React from 'react'
import { Stack, usePathname} from 'expo-router'
import { View } from 'react-native'


const STEPS= ['step1', 'step2', 'step3', 'step4', 'step5', 'step6']
export default function Onborardinglayout(){
    const pathname = usePathname()

const currentStesp= pathname.split('/').pop()
const stepIndex = STEPS.indexOf(currentStesp ?? '')
const progress = (stepIndex +1 ) / STEPS.length

  return (
    <View>
        <View className="h-1 w-full bg-white/10">
        <View  className="h-1 bg-purple-500 rounded-full" style={{ width: `${progress * 100}%` }}/>
        </View>

    <Stack>
        <Stack.Screen name='step1' options={{ headerShown: false }} />
        <Stack.Screen name="step2" options={{ headerShown: false }} />
        <Stack.Screen name="step3" options={{ headerShown: false }} />
        <Stack.Screen name="step4" options={{ headerShown: false }} />
        <Stack.Screen name="step5" options={{ headerShown: false }} />
        <Stack.Screen name="step6" options={{ headerShown: false }} />


      
    </Stack>
    </View>
  )
}

