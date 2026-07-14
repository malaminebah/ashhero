import { View, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { FlowText } from '@/components/ui/flow-text'

import type { ProfileHeaderParams } from '../../types'

export const ProfileHeader = ({ onEditPress }: ProfileHeaderParams) => {
  const router = useRouter()

  return (
    <View className="relative mb-4 items-center justify-center">
      <FlowText className="text-center text-[22px] font-extrabold text-white">Mon héros</FlowText>
      {onEditPress ? (
        <Pressable
          onPress={onEditPress}
          accessibilityRole="button"
          accessibilityLabel="Modifier le nom du héros"
          className="absolute left-0 h-10 w-10 items-center justify-center rounded-full bg-brand-card active:opacity-70"
        >
          <MaterialIcons name="edit" size={20} color="#8b7aa8" />
        </Pressable>
      ) : null}
      <Pressable
        onPress={() => router.push('/settings' as never)}
        accessibilityRole="button"
        accessibilityLabel="Ouvrir les réglages"
        className="absolute right-0 h-10 w-10 items-center justify-center rounded-full bg-brand-card active:opacity-70"
      >
        <MaterialIcons name="settings" size={20} color="#8b7aa8" />
      </Pressable>
    </View>
  )
}
