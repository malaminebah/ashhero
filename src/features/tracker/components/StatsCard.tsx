import React from 'react'
import { View, Text } from 'react-native'

type CardProps = {
  icon: React.ReactNode
  value: string | number
  label: string
}

export const StatsCard = ({ icon, value, label }: CardProps) => {
  return (
    <View className="rounded-xl p-3.5 bg-white/[0.03] border border-brand-accent/15">
      <Text className="mb-1.5">
        {typeof icon === 'string' ? (
          <Text className="text-base">{icon}</Text>
        ) : (
          icon
        )}
      </Text>
      <Text className="text-xl font-bold text-white font-mono tracking-tight">
        {value}
      </Text>
      <Text className="text-[9px] tracking-[0.15rem] text-white/20 uppercase font-mono mt-0.5">
        {label}
      </Text>
    </View>
  )
}

