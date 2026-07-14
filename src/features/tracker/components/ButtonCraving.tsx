import { Pressable } from 'react-native'
import { FlowText } from '@/components/ui/flow-text'
import { useTrackerStore } from '../store'
import { getDayCount } from '../utils/calculations'

export const ButtonCraving = () => {
  const quiteDate = useTrackerStore((s) => s.quitDate)
  const relapse = useTrackerStore((s) => s.relapse)

  return (
    <Pressable
      onPress={() => relapse(getDayCount(quiteDate))}
      accessibilityRole="button"
      accessibilityLabel="J'ai rechuté"
      className="mt-2 min-h-[52px] w-full items-center justify-center rounded-full border border-[rgba(239,68,68,0.5)] bg-[rgba(239,68,68,0.1)] py-4 active:opacity-90"
    >
      <FlowText className="text-sm font-bold text-brand-red">J&apos;ai rechuté</FlowText>
    </Pressable>
  )
}
