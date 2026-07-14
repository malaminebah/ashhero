import { View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { FlowText } from '@/components/ui/flow-text'
import { LevelTierIcon } from './LevelTierIcon'
import type { LevelStepRowParams } from '../../types'

export const LevelStepRow = ({ stepLevel, xpRequired, userLevel }: LevelStepRowParams) => {
  const unlocked = userLevel >= stepLevel
  const isCurrent = userLevel === stepLevel

  return (
    <View
      className={`flex-row items-center gap-3 rounded-[20px] border bg-brand-card px-4 py-3.5 ${
        isCurrent
          ? 'border-brand-gold'
          : unlocked
            ? 'border-brand-success'
            : 'border-[rgba(255,255,255,0.07)]'
      }`}
    >
      <View className="h-11 w-11 items-center justify-center rounded-2xl bg-brand-track">
        <LevelTierIcon level={stepLevel} size={22} unlocked={unlocked} />
      </View>

      <View className="min-w-0 flex-1">
        <View className="flex-row items-center gap-2">
          <FlowText
            className={`text-[15px] font-bold ${unlocked ? 'text-white' : 'text-brand-locked'}`}
          >
            Niveau {stepLevel}
          </FlowText>
          {isCurrent ? (
            <View className="rounded-full bg-brand-gold px-2 py-0.5">
              <FlowText className="text-[10px] font-extrabold" style={{ color: '#3b2000' }}>
                Actuel
              </FlowText>
            </View>
          ) : null}
        </View>
        <FlowText
          className={`mt-0.5 text-xs ${unlocked ? 'text-brand-muted' : 'text-brand-locked'}`}
        >
          {xpRequired === 0 ? 'Départ — 0 XP' : `${xpRequired} XP requis`}
        </FlowText>
      </View>

      <View className="h-7 w-7 items-center justify-center">
        {unlocked ? (
          <MaterialIcons name="check-circle" size={22} color="#22c55e" />
        ) : (
          <MaterialIcons name="lock-outline" size={20} color="#5b4a75" />
        )}
      </View>
    </View>
  )
}
