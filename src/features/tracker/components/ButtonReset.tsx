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
      accessibilityRole="button"
      accessibilityLabel="Tout réinitialiser"
      className="mt-2 min-h-[52px] w-full items-center justify-center rounded-full border border-[rgba(255,255,255,0.15)] py-3 active:opacity-90"
    >
      <FlowText className="text-sm font-bold text-brand-muted">Tout réinitialiser</FlowText>
    </Pressable>
  )
}
