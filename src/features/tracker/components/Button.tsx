import React from 'react'
import { Pressable, Text } from 'react-native'

export const ButtonFight = ({ onPress }: { onPress?: () => void }) => {
  return (
    <Pressable
      onPress={onPress}
      className="w-full py-4 rounded-xl flex-row items-center justify-center gap-2 bg-brand-accentDark active:opacity-90"
      style={{
        shadowColor: '#7c3aed',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 8,
      }}
    >
      <Text className="text-lg">⚔️</Text>
      <Text className="text-white text-xs font-mono tracking-[0.2rem] uppercase">
        Combattre une envie
      </Text>
    </Pressable>
  )
}

