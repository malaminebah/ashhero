import { View, Text } from 'react-native'

type Props = {
  xpGained: number
  streakDays: number
}

export const VictoryBanner = ({ xpGained, streakDays }: Props) => {
  const message =
    streakDays < 3
      ? 'Nice — keep holding the line!'
      : streakDays < 7
        ? 'You are getting stronger!'
        : 'Certified hero 🔥'

  return (
    <View className="mx-4 p-6 rounded-md border-2 border-brand-accent bg-brand-accent/15 items-center">
      <Text className="text-brand-accent text-2xl font-mono tracking-[0.25rem]">
        +{xpGained} XP
      </Text>
      <Text className="text-white text-sm font-mono mt-3 text-center leading-5">
        {message}
      </Text>
    </View>
  )
}
