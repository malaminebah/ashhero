import { View, Text } from 'react-native'

type Props = {
  xpGained: number
  streakDays: number
}

export const VictoryBanner = ({ xpGained, streakDays }: Props) => {
  const message =
    streakDays < 3
      ? 'Bien joué — tiens bon !'
      : streakDays < 7
        ? 'Tu deviens plus fort !'
        : 'Héros certifié 🔥'

  return (
    <View className="mx-4 items-center rounded-md border-2 border-brand-accent bg-brand-accent/15 p-6">
      <Text className="font-mono text-2xl tracking-[0.25rem] text-brand-accent">
        +{xpGained} XP
      </Text>
      <Text className="mt-3 text-center font-mono text-sm leading-5 text-white/80">
        {message}
      </Text>
    </View>
  )
}
