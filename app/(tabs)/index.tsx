import { useEffect } from 'react'
import { View, ScrollView, Pressable, Text } from 'react-native'
import {
  DayCounterComponent,
  StatsCardGrid,
  ButtonFight,
  ButtonCraving,
  ButtonReset,
  useEtapes,
} from '@/src/features/tracker'
import { Avatar } from '@/src/features/tracker/components/Avatar'
import { EtapeBarComponent } from '@/src/features/tracker/components/EtapeBarComponent'
import { EtapeList } from '@/src/features/tracker/components/EtapeList'
import { useRouter } from 'expo-router'
import { useTrackerStore } from '@/src/features/tracker/store'

export default function HomeScreen() {
  const router = useRouter()
  const quitDate = useTrackerStore((s) => s.quitDate)
  const reset = useTrackerStore((s) => s.reset)
  const etapes = useEtapes()

useEffect(() => {
  if (quitDate) return
  const t = setTimeout(() => {
    router.replace('/onboarding/step1' as never)
  }, 100)
  return () => clearTimeout(t)
}, [quitDate, router])
  const onRestartFlow = () => {
    reset()
    router.replace('/' as never)
  }

  return (
    <ScrollView className="flex-1 bg-brand-bg">
      <View className="p-5 pt-11">
        <Avatar />
        <DayCounterComponent />
        <EtapeBarComponent currentEtape={etapes.currentEtape} nextEtape={etapes.nextEtape} percentageComplete={etapes.percentageComplete} />
        <StatsCardGrid />
        <EtapeList currentEtape={etapes.currentEtape} nextEtape={etapes.nextEtape} />
        <ButtonReset />
        <ButtonFight />
        <ButtonCraving />
        <Pressable onPress={onRestartFlow} className="mt-8 py-3 items-center">
          <Text className="text-white/30 text-xs font-mono">
            Recommencer le parcours (test)
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}



