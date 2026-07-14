import { View } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { GameCard } from '@/components/ui/game-card'
import { GameLabel } from '@/components/ui/game-label'
import { FlowText } from '@/components/ui/flow-text'
import {
  getMotivation,
  getTrigger,
  getYearsLabel,
} from '@/src/features/onboarding/profileFacts'
import type { OnboardingChoiceIcon } from '@/src/features/onboarding/types'
import { useTrackerStore } from '../../store'

const FactChip = ({
  icon,
  label,
  color,
}: {
  icon: OnboardingChoiceIcon
  label: string
  color: string
}) => (
  <View className="flex-row items-center gap-1.5 rounded-full bg-brand-track px-3 py-2">
    <MaterialCommunityIcons name={icon} size={14} color={color} />
    <FlowText className="text-xs font-bold text-white">{label}</FlowText>
  </View>
)

export const ProfileJourneySection = () => {
  const smokingType = useTrackerStore((s) => s.smokingType)
  const yearsUsing = useTrackerStore((s) => s.yearsUsing)
  const triggers = useTrackerStore((s) => s.triggers)
  const motivations = useTrackerStore((s) => s.motivations)

  const yearsLabel = getYearsLabel(yearsUsing)
  const triggerFacts = triggers.map(getTrigger).filter((t) => t != null)
  const motivationFacts = motivations.map(getMotivation).filter((m) => m != null)

  if (!yearsLabel && triggerFacts.length === 0 && motivationFacts.length === 0) {
    return null
  }

  return (
    <View className="mb-6">
      <GameLabel className="mb-2.5">Ton parcours</GameLabel>
      <GameCard className="gap-4">
        {yearsLabel ? (
          <View>
            <GameLabel className="mb-1.5">
              {smokingType === 'vape' ? 'Vapoteur depuis' : 'Fumeur depuis'}
            </GameLabel>
            <FlowText className="text-[15px] font-bold text-white">{yearsLabel}</FlowText>
          </View>
        ) : null}

        {motivationFacts.length > 0 ? (
          <View>
            <GameLabel className="mb-2">Tes armes</GameLabel>
            <View className="flex-row flex-wrap gap-2">
              {motivationFacts.map((m) => (
                <FactChip key={m.id} icon={m.icon} label={m.label} color="#22c55e" />
              ))}
            </View>
          </View>
        ) : null}

        {triggerFacts.length > 0 ? (
          <View>
            <GameLabel className="mb-2">Les attaques de l&apos;Envie</GameLabel>
            <View className="flex-row flex-wrap gap-2">
              {triggerFacts.map((t) => (
                <FactChip key={t.id} icon={t.icon} label={t.label} color="#a855f7" />
              ))}
            </View>
          </View>
        ) : null}
      </GameCard>
    </View>
  )
}
