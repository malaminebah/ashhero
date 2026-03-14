import React from 'react'
import { View, Text } from 'react-native'
import type { Etape } from '../types'

type EtapesRowProps = {
  etape: Etape
  done: boolean
  current: boolean
}

export const EtapesRow = ({ etape, done, current }: EtapesRowProps) => {
  const isLocked = !done && !current

  return (
    <View className="flex-row items-center gap-2.5 mb-2">
      <View
        className="w-2 h-2 rounded-sm flex-shrink-0"
        style={{
          backgroundColor: isLocked
            ? 'rgba(255,255,255,0.06)'
            : current
              ? 'rgba(168,85,247,0.4)'
              : '#a855f7',
          shadowColor: done ? '#a855f7' : 'transparent',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: done ? 0.9 : 0,
          shadowRadius: 6,
          elevation: done ? 4 : 0,
        }}
      />
      <Text
        className={`flex-1 font-mono text-xs ${
          isLocked ? 'text-white/20' : 'text-white'
        }`}
        numberOfLines={1}
      >
        {etape.label} — {etape.title}
      </Text>
      {current && (
        <Text className="text-[9px] text-brand-accent font-mono tracking-wider">
          EN COURS
        </Text>
      )}
    </View>
  )
}
