import { View, Text } from 'react-native'
import { titleSerif } from '@/constants/theme'

export const ProfileHeader = () => (
  <View className="mb-6 items-center">
    <Text
      className="text-center text-3xl font-bold tracking-tight text-brand-accent"
      style={{ fontFamily: titleSerif }}
    >
      PROFIL
    </Text>
    <Text className="mt-2 font-mono text-[10px] uppercase tracking-[0.35rem] text-white/75">
      TON HÉROS
    </Text>
  </View>
)
