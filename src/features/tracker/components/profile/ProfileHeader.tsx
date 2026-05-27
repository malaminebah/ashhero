import { View, Text, Pressable } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { titleSerif } from '@/constants/theme'

type Props = {
  onEditPress?: () => void
}

export const ProfileHeader = ({ onEditPress }: Props) => (
  <View className="relative mb-6 items-center justify-center">
    <Text
      className="text-center text-2xl font-bold uppercase tracking-[0.08rem] text-white"
      style={{ fontFamily: titleSerif }}
    >
      Mon héros
    </Text>
    {onEditPress ? (
      <Pressable
        onPress={onEditPress}
        accessibilityRole="button"
        accessibilityLabel="Modifier le nom du héros"
        className="absolute right-0 top-0 h-10 w-10 items-center justify-center active:opacity-70"
      >
        <MaterialIcons name="edit" size={20} color="rgba(255,255,255,0.75)" />
      </Pressable>
    ) : null}
  </View>
)
