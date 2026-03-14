import React from 'react'
import { Pressable, Text } from 'react-native'
import { useTrackerStore } from '../store'

type ButtonResetProps = {
  onPress?: () => void
}

export const ButtonReset = () => {
    const {reset} = useTrackerStore()
  return (
    <Pressable
      onPress={reset}
      className="w-full py-3 rounded-xl items-center justify-center border border-brand-red/60 bg-brand-red/10 mt-2 active:opacity-90"
    >
      <Text className="text-brand-red text-xs font-mono tracking-[0.2rem] uppercase">
        Reset all
      </Text>
    </Pressable>
  )
}

