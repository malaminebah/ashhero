import { View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { FLOW } from '@/constants/flowTheme'
import { badgeSurface, flowCardShadow, flowSurface } from '@/constants/flowSurfaces'
import { FlowText } from '@/components/ui/flow-text'
import { LevelTierIcon } from './LevelTierIcon'
import type { LevelStepRowParams } from '../../types'

export const LevelStepRow = ({ stepLevel, xpRequired, userLevel }: LevelStepRowParams) => {
  const unlocked = userLevel >= stepLevel
  const isCurrent = userLevel === stepLevel

  return (
    <View
      className={`flex-row items-center gap-3 rounded-2xl border px-4 py-3.5 ${flowSurface.card} ${badgeSurface(unlocked)} ${
        isCurrent ? 'border-flow-cta/40 bg-flow-secondary' : ''
      }`}
      style={[flowCardShadow, isCurrent ? { borderColor: FLOW.cta, borderWidth: 1.5 } : null]}
    >
      <View
        className={`h-11 w-11 items-center justify-center rounded-2xl ${
          unlocked ? flowSurface.iconWell : 'bg-flow-border/40'
        }`}
      >
        <LevelTierIcon level={stepLevel} size={22} unlocked={unlocked} />
      </View>

      <View className="min-w-0 flex-1">
        <View className="flex-row items-center gap-2">
          <FlowText
            className={`text-[15px] font-bold ${unlocked ? 'text-flow-text' : 'text-flow-faint'}`}
          >
            Niveau {stepLevel}
          </FlowText>
          {isCurrent ? (
            <View className="rounded-full bg-flow-cta px-2 py-0.5">
              <FlowText className="text-[10px] font-bold text-white">Actuel</FlowText>
            </View>
          ) : null}
        </View>
        <FlowText className={`mt-0.5 text-xs ${unlocked ? 'text-flow-muted' : 'text-flow-faint'}`}>
          {xpRequired === 0 ? 'Départ — 0 XP' : `${xpRequired} XP requis`}
        </FlowText>
      </View>

      <View className="h-7 w-7 items-center justify-center">
        {unlocked ? (
          <MaterialIcons name="check-circle" size={22} color={FLOW.cta} />
        ) : (
          <MaterialIcons name="lock-outline" size={20} color={FLOW.faint} />
        )}
      </View>
    </View>
  )
}
