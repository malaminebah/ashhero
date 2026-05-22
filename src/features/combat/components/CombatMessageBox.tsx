import { View, Text } from 'react-native'
import type { BattleMessage } from '../battleMessage'

type Props = {
  message: BattleMessage
}

const boxClass =
  'mb-4 min-h-[64px] justify-center rounded-md border-2 px-3 py-2'

export const CombatMessageBox = ({ message }: Props) => {
  if (message.kind === 'idle') {
    return (
      <View className={`${boxClass} border-white/15 bg-black/40`}>
        <Text className="text-center font-mono text-xs leading-5 text-white/60">
          Choisis ton action…
        </Text>
      </View>
    )
  }

  if (message.kind === 'status') {
    return (
      <View className={`${boxClass} border-brand-accent/30 bg-brand-accent/10`}>
        <Text className="text-center font-mono text-xs leading-5 text-white/80">
          {message.text}
        </Text>
      </View>
    )
  }

  if (message.kind === 'player_hit') {
    return (
      <View className={`${boxClass} border-emerald-500/40 bg-emerald-950/40`}>
        <Text className="text-center font-mono text-xs leading-5 text-white/90">
          <Text className="text-emerald-300">Ton coup : </Text>
          <Text className="font-bold text-white">{message.actionLabel}</Text>
          {' ! '}
          <Text className="text-white/80">
            L&apos;Envie perd {message.damage} PV !
          </Text>
        </Text>
      </View>
    )
  }

  return (
    <View className={`${boxClass} border-red-500/35 bg-red-950/35`}>
      <Text className="text-center font-mono text-xs leading-5 text-white/90">
        <Text className="text-red-300">L&apos;Envie utilise </Text>
        <Text className="font-bold text-white">{message.attackName}</Text>
        {' ! '}
        <Text className="text-white/80">Tu perds {message.damage} PV !</Text>
      </Text>
    </View>
  )
}
