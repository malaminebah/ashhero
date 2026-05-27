import { View, Text } from 'react-native'
import type { BattleMessage } from '../battleMessage'

type Props = {
  message: BattleMessage
  showPrompt?: boolean
}

const boxClass =
  'mb-3 min-h-[64px] justify-center rounded-lg border-2 border-brand-success/45 bg-black/50 px-3 py-3'

export const CombatMessageBox = ({ message, showPrompt = true }: Props) => {
  if (message.kind === 'idle') {
    return (
      <View className={boxClass}>
        <Text className="text-center font-mono text-xs leading-5 text-white/75">
          {showPrompt ? 'Que vas-tu faire ?' : '…'}
        </Text>
      </View>
    )
  }

  if (message.kind === 'status') {
    return (
      <View className={boxClass}>
        <Text className="text-center font-mono text-xs leading-5 text-white/80">
          {message.text}
        </Text>
      </View>
    )
  }

  if (message.kind === 'player_hit') {
    return (
      <View className={boxClass}>
        <Text className="text-center font-mono text-xs leading-5 text-white/90">
          Ton coup : {message.actionLabel} ! L&apos;Envie perd {message.damage} PV !
        </Text>
        {showPrompt ? (
          <Text className="mt-2 text-center font-mono text-xs leading-5 text-white/60">
            Que vas-tu faire ?
          </Text>
        ) : null}
      </View>
    )
  }

  return (
    <View className={boxClass}>
      <Text className="text-center font-mono text-xs leading-5 text-white/90">
        L&apos;Envie utilise {message.attackName} ! Tu perds {message.damage} PV !
      </Text>
      {showPrompt ? (
        <Text className="mt-2 text-center font-mono text-xs leading-5 text-white/60">
          Que vas-tu faire ?
        </Text>
      ) : null}
    </View>
  )
}
