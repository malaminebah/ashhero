import React from 'react'
import { View } from 'react-native'
import { StatsCard } from './StatsCard'
import { useStats } from '../hooks/useStats'

export const StatsCardGrid = () => {
  const { moneySaved, cigarettesAvoided, dayCount,lifeRegained } = useStats()

  return (
    <View className="flex-row flex-wrap gap-2">
      <View className="flex-1 min-w-[45%]">
        <StatsCard icon="💰" value={moneySaved} label="Économisés" />
      </View>
      <View className="flex-1 min-w-[45%]">
        <StatsCard icon="🚬" value={cigarettesAvoided} label="Évitées" />
      </View>
      <View className="flex-1 min-w-[45%]">
        <StatsCard icon="❤️" value={lifeRegained} label="Santé" />
      </View>
      <View className="flex-1 min-w-[45%]">
        <StatsCard icon="👑" value={dayCount} label="Jalons" />
      </View>
    </View>
  )
}

