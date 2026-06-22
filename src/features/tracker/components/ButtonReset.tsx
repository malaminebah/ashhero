import { Pressable } from 'react-native'
import { FlowText } from '@/components/ui/flow-text'
import { useTrackerStore } from '../store'

type ButtonResetParams = {
  onAfterReset?: () => void
}

export const ButtonReset = ({ onAfterReset }: ButtonResetParams) => {
  const reset = useTrackerStore((s) => s.reset)

  return (
    <Pressable
      onPress={() => {
        reset()
        onAfterReset?.()
      }}
      className="mt-2 w-full items-center justify-center rounded-full border border-flow-border bg-flow-secondary py-3 active:opacity-90"
    >
      <FlowText className="text-sm font-bold text-flow-muted">Tout réinitialiser</FlowText>
    </Pressable>
  )
}
