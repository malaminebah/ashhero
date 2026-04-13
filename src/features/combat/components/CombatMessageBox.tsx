import { View, Text } from 'react-native'
import type { BattleMessage } from '../battleMessage'

type Props = {
  message: BattleMessage
}

export const CombatMessageBox = ({ message }: Props) => {
  if (message.kind === 'idle') {
    return (
      <View className="mb-4 min-h-[52px] justify-center rounded-lg border-2 border-white/15 bg-black/40 px-3 py-2">
        <Text className="text-center font-mono text-[11px] leading-5 text-white/35">
          Choose your move…
        </Text>
      </View>
    )
  }

  if (message.kind === 'status') {
    return (
      <View className="mb-4 min-h-[52px] justify-center rounded-lg border-2 border-brand-accent/30 bg-brand-accent/10 px-3 py-2">
        <Text className="text-center font-mono text-[11px] leading-5 text-white/90">
          {message.text}
        </Text>
      </View>
    )
  }

  if (message.kind === 'player_hit') {
    return (
      <View className="mb-4 min-h-[52px] justify-center rounded-lg border-2 border-emerald-500/40 bg-emerald-950/40 px-3 py-2">
        <Text className="text-center font-mono text-[11px] leading-5 text-white">
          <Text className="text-emerald-300">Your move: </Text>
          <Text className="font-bold text-white">{message.actionLabel}</Text>
          {' ! '}
          <Text className="text-white/80">
            The Craving loses {message.damage} HP!
          </Text>
        </Text>
      </View>
    )
  }

  return (
    <View className="mb-4 min-h-[52px] justify-center rounded-lg border-2 border-red-500/35 bg-red-950/35 px-3 py-2">
      <Text className="text-center font-mono text-[11px] leading-5 text-white">
        <Text className="text-red-300">The Craving uses </Text>
        <Text className="font-bold text-white">{message.attackName}</Text>
        {' ! '}
        <Text className="text-white/80">You lose {message.damage} HP!</Text>
      </Text>
    </View>
  )
}
