import { View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { FlipDetailScreen } from '@/components/ui/flip-detail-screen'
import { FlowText } from '@/components/ui/flow-text'
import { FLOW } from '@/constants/flowTheme'
import { getJalonByKey } from '@/src/features/tracker/components/dashboard/jalonsConfig'
import { useTrackerStore } from '@/src/features/tracker/store'

export default function JalonDetailScreen() {
  const router = useRouter()
  const { key } = useLocalSearchParams<{ key: string }>()
  const quitDate = useTrackerStore((s) => s.quitDate)
  const jalon = key ? getJalonByKey(key) : undefined

  const hoursSinceQuit = quitDate
    ? (Date.now() - quitDate.getTime()) / 3_600_000
    : 0

  if (!jalon) {
    return (
      <FlipDetailScreen
        onClose={() => router.back()}
        autoFlip={false}
        front={
          <FlowText className="text-sm text-flow-muted">Jalon introuvable.</FlowText>
        }
        back={<FlowText className="text-sm text-flow-muted">Jalon introuvable.</FlowText>}
      />
    )
  }

  const unlocked = hoursSinceQuit >= jalon.hours
  const daysLeft = Math.ceil(Math.max(0, jalon.hours - hoursSinceQuit) / 24)

  return (
    <FlipDetailScreen
      onClose={() => router.back()}
      front={
        <>
          <MaterialIcons
            name={unlocked ? 'check-circle' : 'lock'}
            size={48}
            color={unlocked ? FLOW.cta : FLOW.faint}
          />
          <FlowText className="mt-5 text-xs font-bold text-flow-cta">{jalon.label}</FlowText>
          <FlowText className="mt-3 text-center text-[22px] font-bold text-flow-text">
            {jalon.title}
          </FlowText>
          <FlowText className="mt-2 text-center text-xs text-flow-faint">
            {unlocked ? 'Jalon débloqué' : `Encore ~${daysLeft} jour${daysLeft > 1 ? 's' : ''}`}
          </FlowText>
        </>
      }
      back={
        <>
          <FlowText className="text-xs font-bold uppercase tracking-wide text-flow-cta">
            {jalon.label}
          </FlowText>
          <FlowText className="mt-3 text-[20px] font-bold text-flow-text">{jalon.title}</FlowText>
          <FlowText className="mt-4 text-[15px] leading-6 text-flow-text">{jalon.summary}</FlowText>
          <View className="mt-8 rounded-2xl border border-flow-border bg-flow-secondary px-4 py-4">
            <FlowText className="text-xs font-bold uppercase tracking-wide text-flow-cta">
              Ta santé
            </FlowText>
            <FlowText className="mt-3 text-[15px] leading-6 text-flow-muted">
              {jalon.health}
            </FlowText>
          </View>
        </>
      }
    />
  )
}
