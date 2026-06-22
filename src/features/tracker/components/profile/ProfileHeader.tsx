import { View, Pressable } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { FLOW } from '@/constants/flowTheme'
import { FlowText } from '@/components/ui/flow-text'

import type { ProfileHeaderParams } from '../../types'

export const ProfileHeader = ({ onEditPress }: ProfileHeaderParams) => (
  <View className="relative mb-6 items-center justify-center">
    <FlowText className="text-center text-[22px] font-bold text-flow-text">Mon héros</FlowText>
    {onEditPress ? (
      <Pressable
        onPress={onEditPress}
        accessibilityRole="button"
        accessibilityLabel="Modifier le nom du héros"
        className="absolute right-0 top-0 h-10 w-10 items-center justify-center rounded-full bg-flow-secondary active:opacity-70"
      >
        <MaterialIcons name="edit" size={20} color={FLOW.muted} />
      </Pressable>
    ) : null}
  </View>
)
