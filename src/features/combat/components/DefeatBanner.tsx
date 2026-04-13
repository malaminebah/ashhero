import { View, Text } from 'react-native'

export const DefeatBanner = () => (
  <View className="mx-4 items-center rounded-md border-2 border-red-500/50 bg-red-500/10 p-6">
    <Text className="text-center font-mono text-lg uppercase tracking-[0.2rem] text-red-300">
      Defeat
    </Text>
    <Text className="mt-3 text-center font-mono text-sm leading-5 text-white/70">
      The craving got the upper hand. You can try again in the next fight.
    </Text>
  </View>
)
