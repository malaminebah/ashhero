import React from 'react'
import { useDayCount } from '../hooks/useDayCount'
import { Text, View } from 'react-native'

export const DayCounterComponent = () => {
  const dayCount = useDayCount()

  return (
    <View className="items-center mb-6">
      <Text className="text-7xl font-black tracking-tighter text-white font-mono">
        {dayCount}
      </Text>
      <Text className="text-xs tracking-[0.3rem] text-brand-accent/50 uppercase font-mono mt-1">
        jours de combat
      </Text>
    </View>
  )
}

