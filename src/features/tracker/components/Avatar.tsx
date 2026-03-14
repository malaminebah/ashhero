import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import React from 'react'
import { View, Text } from 'react-native'

type AvatarProps = {
  avatar?: React.ReactNode | null
  level?: string
}

const DefaultAvatar = () => (
  <View className="w-20 h-20 items-center justify-center">
    <MaterialIcons name="person" size={48} color="rgba(255,255,255,0.4)" />
  </View>
)

export const Avatar = ({ avatar = null, level = 'Guerrier' }: AvatarProps) => {
  return (
    <View className="items-center mt-8">
      <View className=' mt-2 pb-3'>
        <Text className='font-light text-gray-500 uppercase '>Quete principale </Text>
        <Text className='font-bold text-gray-500'>La Grande Evasion </Text>
      </View>
     

      
      <View
        className="w-[120px] h-[120px] rounded-full overflow-hidden bg-brand-accent/15 border border-brand-accent/20 items-center justify-center"
        style={{
          shadowColor: '#a855f7',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.3,
          shadowRadius: 20,
          elevation: 8,
        }}
      >
        {avatar ?? <DefaultAvatar />}
      </View>
      <View className="flex-row items-center gap-1.5 mt-3 px-3 py-1 bg-brand-accent/10 border border-brand-accent/20 rounded">
        <Text className="text-[10px] text-brand-accent font-mono tracking-widest uppercase pb-2 pt-1">
          {level}
        </Text>
      </View>
    </View>
  )
}

