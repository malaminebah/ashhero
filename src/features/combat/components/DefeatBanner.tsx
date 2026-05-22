import { View, Text } from 'react-native'

export const DefeatBanner = () => (
  <View className="mx-4 items-center rounded-md border-2 border-red-500/50 bg-red-500/10 p-6">
    <Text className="text-center font-mono text-lg uppercase tracking-[0.2rem] text-red-300">
      Défaite
    </Text>
    <Text className="mt-3 text-center font-mono text-sm leading-5 text-white/70">
      L&apos;envie a pris le dessus. Tu pourras retenter au prochain combat.
    </Text>
  </View>
)
