import React from 'react'
import { Pressable, Text } from 'react-native'

export const ButtonCraving = ({ onPress }: { onPress?: () => void }) => {
  return (
    <Pressable
      onPress={onPress}
      className="w-full py-4 rounded-xl items-center justify-center border border-brand-red/50 bg-transparent mt-2 active:opacity-90"
    >
      <Text className="text-brand-red/80 text-xs font-mono tracking-[0.2rem] uppercase">
        J&apos;ai rechuté
      </Text>
    </Pressable>
  )
}

