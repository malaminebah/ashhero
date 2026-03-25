import React from 'react'
import { Pressable, Text } from 'react-native'
import { useTrackerStore } from '../store'
import { getDayCount } from '../utils/calculations'


export const ButtonCraving = () => {
  const quiteDate = useTrackerStore( s => s.quitDate)
  const relapse = useTrackerStore( s => s.relapse)
  return (
    <Pressable
      onPress={ () => relapse(getDayCount(quiteDate))}
      className="w-full py-4 rounded-xl items-center justify-center border border-brand-red/50 bg-transparent mt-2 active:opacity-90"
    >
      <Text className="text-brand-red/80 text-xs font-mono tracking-[0.2rem] uppercase">
        J&apos;ai rechuté
      </Text>
    </Pressable>
  )
}

