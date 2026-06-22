import { View } from 'react-native'
import { FlowText } from '@/components/ui/flow-text'
import type { CombatMessageBoxParams } from '../types'

// min-h-[72px] locks the height across all message states (idle+prompt ~68px, player_hit ~64px)
// so the flex-1 arena above doesn't jump when the message changes on attack.
const boxClass =
  'mb-3 min-h-[72px] justify-center rounded-2xl border border-flow-border bg-flow-secondary px-4 py-3'

const Prompt = () => (
  <FlowText className="mt-1 text-right text-xs text-flow-cta">▶</FlowText>
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
        <FlowText className="text-left text-xs leading-5 text-flow-muted">
          {showPrompt ? idlePrompt : '…'}
        </FlowText>
        {showPrompt ? <Prompt /> : null}
      </View>
    )
  }

  if (message.kind === 'status') {
    return (
      <View className={boxClass}>
        <FlowText className="text-left text-xs leading-5 text-flow-text">
          {message.text}
        </FlowText>
        {showPrompt ? <Prompt /> : null}
      </View>
    )
  }

  if (message.kind === 'player_hit') {
    return (
      <View className={boxClass}>
        <FlowText className="text-left text-xs leading-5 text-flow-text">
          Tu utilises {message.actionLabel} !{'\n'}C&apos;est super efficace ! L&apos;Envie subit{' '}
          {message.damage} dégâts !
        </FlowText>
        {showPrompt ? <Prompt /> : null}
      </View>
    )
  }

  return (
    <View className={boxClass}>
      <FlowText className="text-left text-xs leading-5 text-flow-text">
        L&apos;Envie utilise {message.attackName} !{'\n'}C&apos;est super efficace !
      </FlowText>
      {showPrompt ? <Prompt /> : null}
    </View>
  )
}
