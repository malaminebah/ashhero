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
      className="mt-2 w-full items-center justify-center rounded-full border border-red-300 bg-red-50 py-4 active:opacity-90"
    >
      <FlowText className="text-sm font-bold text-red-500">J&apos;ai rechuté</FlowText>
    </Pressable>
  )
}
