import { View, Text } from 'react-native'
import type { CombatMessageBoxParams } from '../types'

const boxClass =
  'mb-3 min-h-[64px] justify-center rounded-none border-4 border-white/70 bg-[#08000f] px-3 py-3'

const Prompt = () => (
  <Text className="mt-1 text-right font-mono text-xs text-brand-accent">▶</Text>
)

export const CombatMessageBox = ({
  message,
  showPrompt = true,
  heroName,
}: CombatMessageBoxParams) => {
  const idlePrompt =
    heroName != null && heroName.length > 0
      ? `Que doit faire ${heroName} ?`
      : 'Que vas-tu faire ?'

  if (message.kind === 'idle') {
    return (
      <View className={boxClass}>
        <Text className="text-left font-mono text-xs leading-5 text-white/75">
          {showPrompt ? idlePrompt : '…'}
        </Text>
        {showPrompt ? <Prompt /> : null}
      </View>
    )
  }

  if (message.kind === 'status') {
    return (
      <View className={boxClass}>
        <Text className="text-left font-mono text-xs leading-5 text-white/80">
          {message.text}
        </Text>
        {showPrompt ? <Prompt /> : null}
      </View>
    )
  }

  if (message.kind === 'player_hit') {
    return (
      <View className={boxClass}>
        <Text className="text-left font-mono text-xs leading-5 text-white/90">
          Tu utilises {message.actionLabel} !{'\n'}C&apos;est super efficace ! L&apos;Envie subit{' '}
          {message.damage} dégâts !
        </Text>
        {showPrompt ? <Prompt /> : null}
      </View>
    )
  }

  return (
    <View className={boxClass}>
      <Text className="text-left font-mono text-xs leading-5 text-white/90">
        L&apos;Envie utilise {message.attackName} !{'\n'}C&apos;est super efficace !
      </Text>
      {showPrompt ? <Prompt /> : null}
    </View>
  )
}
